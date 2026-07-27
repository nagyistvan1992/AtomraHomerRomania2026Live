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
    const { session_id } = await req.json();

    if (!session_id) {
      throw new Error('Session ID is required');
    }

    // Get Stripe secret key from environment variables
    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
    
    if (!STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }

    // Initialize Stripe
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });

    console.log(`Retrieving session details for session ID: ${session_id}`);

    // Retrieve the checkout session
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['customer', 'payment_intent', 'line_items']
    });

    // Get order details from Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    let orderDetails = null;
    
    if (supabaseUrl && supabaseServiceKey && session.payment_intent) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      // Find order by payment intent ID
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('stripe_payment_intent_id', typeof session.payment_intent === 'string' ? 
             session.payment_intent : session.payment_intent.id)
        .limit(1);
      
      if (!error && data && data.length > 0) {
        orderDetails = data[0];
        console.log(`Found order: ${orderDetails.order_number}`);
      } else {
        console.log('No order found for this session');
      }
    }

    // Return session details along with order information
    return new Response(
      JSON.stringify({
        success: true,
        session_id: session.id,
        payment_status: session.payment_status,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: session.customer_details?.email,
        customer_name: session.customer_details?.name,
        order_number: orderDetails?.order_number || null,
        order_status: orderDetails?.order_status || null,
        order_id: orderDetails?.id || null
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error retrieving session details:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to retrieve session details'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
