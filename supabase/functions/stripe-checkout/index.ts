import { createClient } from 'npm:@supabase/supabase-js@2.39.0';
import Stripe from 'npm:stripe@14.18.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SHIPPING_THRESHOLD = 149
const PAID_SHIPPING_RATE_ID = 'shr_1Rf1hEBEuvxC28ex0O5aqEqE'
const FREE_SHIPPING_RATE_ID = 'shr_1TKGjeBEuvxC28exl2vxEz1k'

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { price_id, line_items, success_url, cancel_url, mode, customer_email, cart_subtotal } = await req.json()

    const normalizedLineItems = Array.isArray(line_items) && line_items.length > 0
      ? line_items
      : price_id
        ? [{ price_id, quantity: 1 }]
        : []

    // Validate required parameters
    if (!normalizedLineItems.length) {
      throw new Error('At least one Stripe line item is required')
    }

    // Get Stripe secret key from environment variables
    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
    
    if (!STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured')
    }

    // Initialize Stripe
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });

    // Get user information from the authorization header
    const authHeader = req.headers.get('Authorization')
    let userId = null
    let userEmail = null

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '')
      
      // Get user information from Supabase
      const supabaseUrl = Deno.env.get('SUPABASE_URL')
      const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
      
      if (supabaseUrl && supabaseServiceKey) {
        const supabase = createClient(supabaseUrl, supabaseServiceKey)
        const { data: { user }, error } = await supabase.auth.getUser(token)
        
        if (!error && user) {
          userId = user.id
          userEmail = user.email
        }
      }
    }

    // Use customer email from frontend if provided, otherwise fall back to auth email
    const emailToUse = customer_email || userEmail

    // Create or retrieve customer
    let customerId;
    
    if (emailToUse) {
      // Check if customer already exists
      const customers = await stripe.customers.list({
        email: emailToUse,
        limit: 1
      })
      
      if (customers.data.length > 0) {
        customerId = customers.data[0].id
      } else {
        // Create a new customer
        const customer = await stripe.customers.create({
          email: emailToUse,
          metadata: {
            userId: userId
          }
        })
        
        customerId = customer.id
        
        // Store customer in Supabase if we have user ID
        if (userId) {
          const supabaseUrl = Deno.env.get('SUPABASE_URL')
          const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
          
          if (supabaseUrl && supabaseServiceKey) {
            const supabase = createClient(supabaseUrl, supabaseServiceKey)
            
            await supabase.from('stripe_customers').insert({
              user_id: userId,
              customer_id: customerId
            })
          }
        }
      }
    }

    const subtotal = Number(cart_subtotal ?? 0)
    const shippingRateId = subtotal > SHIPPING_THRESHOLD
      ? FREE_SHIPPING_RATE_ID
      : PAID_SHIPPING_RATE_ID

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: normalizedLineItems.map((item) => ({
        price: item.price_id,
        quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
      })),
      mode: mode || 'payment',
      success_url: success_url || `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url || `${req.headers.get('origin')}/cancel`,
      customer: customerId,
      locale: 'ro',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['RO'],
      },
      shipping_options: [{ shipping_rate: shippingRateId }],
      phone_number_collection: { enabled: true },
      customer_email: !customerId ? emailToUse : undefined,
      metadata: {
        cart_subtotal: Number.isFinite(subtotal) ? subtotal.toFixed(2) : '0.00',
        shipping_rule: shippingRateId === FREE_SHIPPING_RATE_ID ? 'free_shipping' : 'paid_shipping',
      },
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        url: session.url,
        sessionId: session.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error creating checkout session:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || 'Failed to create checkout session',
        details: {
          type: error.type || 'unknown',
          code: error.code || 'unknown_error'
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
