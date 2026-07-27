import { createClient } from 'npm:@supabase/supabase-js@2.39.0';
import Stripe from 'npm:stripe@14.18.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get Stripe secret key and webhook secret from environment variables
    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')
    const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    
    if (!STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured')
    }

    // Initialize Stripe
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
      httpClient: Deno.createHttpClient({
        caCerts: [],
      }),
    });

    // Get the signature from the header
    const signature = req.headers.get('stripe-signature')
    
    if (!signature || !STRIPE_WEBHOOK_SECRET) {
      throw new Error('Stripe signature or webhook secret is missing')
    }

    // Get the raw request body
    const body = await req.text()

    // Verify the webhook signature
    let event
    try {
      event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
    } catch (err) {
      console.error(`Webhook signature verification failed:`, err)
      return new Response(
        JSON.stringify({ success: false, error: 'Webhook signature verification failed' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration is missing')
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Store the event in the database for audit and debugging
    await supabase
      .from('stripe_webhook_events')
      .insert({
        stripe_event_id: event.id,
        event_type: event.type,
        event_data: event.data.object,
        processed: false
      })

    // Process the event based on its type
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        
        // Update order status if payment was successful
        if (session.payment_status === 'paid') {
          // Find order by payment intent ID
          const { data: orders, error: orderError } = await supabase
            .from('orders')
            .select('*')
            .eq('stripe_payment_intent_id', session.payment_intent)
            .limit(1)
          
          if (!orderError && orders && orders.length > 0) {
            // Update order status
            await supabase
              .from('orders')
              .update({
                payment_status: 'paid',
                order_status: 'processing'
              })
              .eq('id', orders[0].id)
          }
          
          // Store in stripe_orders table
          if (session.customer) {
            await supabase
              .from('stripe_orders')
              .insert({
                checkout_session_id: session.id,
                payment_intent_id: session.payment_intent,
                customer_id: session.customer,
                amount_subtotal: session.amount_subtotal,
                amount_total: session.amount_total,
                currency: session.currency,
                payment_status: session.payment_status,
                status: 'completed'
              })
          }
        }
        break
      }
      
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object
        
        // Update order status
        const { data: orders, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('stripe_payment_intent_id', paymentIntent.id)
          .limit(1)
        
        if (!orderError && orders && orders.length > 0) {
          // Update order status
          await supabase
            .from('orders')
            .update({
              payment_status: 'paid',
              order_status: 'processing'
            })
            .eq('id', orders[0].id)
        }
        break
      }
      
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object
        
        // Update order status
        const { data: orders, error: orderError } = await supabase
          .from('orders')
          .select('*')
          .eq('stripe_payment_intent_id', paymentIntent.id)
          .limit(1)
        
        if (!orderError && orders && orders.length > 0) {
          // Update order status
          await supabase
            .from('orders')
            .update({
              payment_status: 'failed',
              order_status: 'cancelled'
            })
            .eq('id', orders[0].id)
        }
        break
      }
      
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object
        
        // Update subscription in database
        if (subscription.customer) {
          const { data: existingSubscription, error: subError } = await supabase
            .from('stripe_subscriptions')
            .select('*')
            .eq('customer_id', subscription.customer)
            .limit(1)
          
          if (!subError) {
            if (existingSubscription && existingSubscription.length > 0) {
              // Update existing subscription
              await supabase
                .from('stripe_subscriptions')
                .update({
                  subscription_id: subscription.id,
                  price_id: subscription.items.data[0]?.price.id,
                  current_period_start: subscription.current_period_start,
                  current_period_end: subscription.current_period_end,
                  cancel_at_period_end: subscription.cancel_at_period_end,
                  status: subscription.status
                })
                .eq('customer_id', subscription.customer)
            } else {
              // Create new subscription record
              await supabase
                .from('stripe_subscriptions')
                .insert({
                  customer_id: subscription.customer,
                  subscription_id: subscription.id,
                  price_id: subscription.items.data[0]?.price.id,
                  current_period_start: subscription.current_period_start,
                  current_period_end: subscription.current_period_end,
                  cancel_at_period_end: subscription.cancel_at_period_end,
                  status: subscription.status
                })
            }
          }
        }
        break
      }
    }

    // Mark the event as processed
    await supabase
      .from('stripe_webhook_events')
      .update({ processed: true })
      .eq('stripe_event_id', event.id)

    return new Response(
      JSON.stringify({ success: true, received: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error processing webhook:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to process webhook'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
