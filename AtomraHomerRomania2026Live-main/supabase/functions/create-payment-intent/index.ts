import { createClient } from 'npm:@supabase/supabase-js@2.39.0';
import Stripe from 'npm:stripe@14.18.0';

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Define interface for request payload
interface PaymentIntentRequest {
  amount: number;
  currency: string;
  paymentMethodId: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  items: Array<{
    id: number;
    name: string;
    price: string;
    quantity: number;
    image: string;
    category: string;
  }>;
}

interface PaymentIntentError {
  message?: string;
  type?: string;
  code?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse request body
    const requestData: PaymentIntentRequest = await req.json();
    const { amount, currency, paymentMethodId, customerInfo, items } = requestData;
    
    // Validate required fields
    if (!amount || !currency || !paymentMethodId || !customerInfo || !items) {
      throw new Error('Missing required fields');
    }

    // Get Stripe secret key from environment variables
    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
    
    if (!STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured')
    }

    console.log(`Processing payment intent for ${customerInfo.email}, amount: ${amount/100} ${currency}`);

    // Initialize Stripe
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });

    // Create a customer if needed
    let customerId;
    
    if (!customerInfo.email) {
      throw new Error('Customer email is required');
    }
    
    // Check if customer already exists
    const customerEmail = customerInfo.email;
    const customers = await stripe.customers.list({
      email: customerEmail,
      limit: 1
    });
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      
      console.log(`Found existing Stripe customer: ${customerId}`);
      
      // Update customer information
      await stripe.customers.update(customerId, {
        name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        phone: customerInfo.phone,
        address: {
          line1: customerInfo.address,
          city: customerInfo.city,
          postal_code: customerInfo.postalCode,
          country: 'RO',
        },
      });
    } else {
      // Create a new customer
      console.log(`Creating new Stripe customer for ${customerEmail}`);
      
      const customer = await stripe.customers.create({
        email: customerEmail,
        name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        phone: customerInfo.phone,
        address: {
          line1: customerInfo.address,
          city: customerInfo.city,
          postal_code: customerInfo.postalCode,
          country: 'RO',
        },
      });
      
      customerId = customer.id;
    }

    console.log(`Creating payment intent for customer ${customerId}`);
    // Create payment intent
    const description = `Order from ${customerInfo.firstName} ${customerInfo.lastName} - ${new Date().toISOString()}`;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: currency || 'ron',
      customer: customerId,
      payment_method: paymentMethodId,
      confirm: true,
      description,
      metadata: {
        customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        items_count: items.length.toString()
      }
    });
    
    console.log(`Payment intent created: ${paymentIntent.id}, status: ${paymentIntent.status}`);

    // Generate order number
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ATM${year}${month}${day}${random}`;
    
    console.log(`Generated order number: ${orderNumber}`);

    // Store order in database using Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (supabaseUrl && supabaseServiceKey) {
      try {
        console.log(`Storing order in Supabase`);
        
        const supabase = createClient(supabaseUrl, supabaseServiceKey);
        
        // Insert order into database
        const { error: orderError } = await supabase
          .from('orders')
          .insert({
            order_number: orderNumber,
            customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            customer_email: customerInfo.email,
            customer_phone: customerInfo.phone,
            customer_address: customerInfo.address,
            customer_city: customerInfo.city,
            customer_postal_code: customerInfo.postalCode,
            items: items,
            subtotal: (amount - (amount >= 14900 ? 0 : 2500)) / 100, // Convert from cents and subtract shipping
            shipping_cost: amount >= 14900 ? 0 : 25, // 149 Lei = 14900 cents
            total_amount: amount / 100, // Convert from cents
            payment_method: 'card',
            payment_status: paymentIntent.status === 'succeeded' ? 'paid' : 'pending',
            order_status: paymentIntent.status === 'succeeded' ? 'processing' : 'pending',
            stripe_payment_intent_id: paymentIntent.id
          });

        if (orderError) {
          console.error('Error storing order:', orderError);
        } else {
          console.log(`Order stored successfully in Supabase`);
        }
        
        // Try to send order confirmation emails
        try {
          await supabase.functions.invoke('send-order-emails', {
            body: {
              orderData: {
                orderId: orderNumber,
                orderNumber: orderNumber,
                customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
                customerEmail: customerInfo.email,
                customerPhone: customerInfo.phone,
                customerAddress: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.postalCode}`,
                items: items,
                total: amount / 100,
                paymentMethod: 'card',
                orderDate: new Date().toISOString()
              }
            }
          });
          
          console.log(`Order confirmation emails sent successfully`);
        } catch (emailError) {
          console.error('Error sending order emails:', emailError);
          // Continue with payment processing even if email fails
        }
      } catch (orderError) {
        console.error('Error storing order:', orderError);
        // Continue with payment processing even if order storage fails
      }
    }

    console.log(`Payment processing completed successfully`);
    return new Response(
      JSON.stringify({ 
        success: true, 
        client_secret: paymentIntent.client_secret,
        payment_intent_id: paymentIntent.id,
        order_number: orderNumber
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    const paymentError = (error ?? {}) as PaymentIntentError;
    console.error('Error creating payment intent:', paymentError);
    
    // Determine appropriate error message and status code
    let errorMessage = paymentError.message || 'Payment processing failed';
    let statusCode = 400;

    // Handle specific Stripe errors
    if (paymentError.type === 'StripeCardError') {
      errorMessage = `Card error: ${paymentError.message}`;
    } else if (paymentError.type === 'StripeInvalidRequestError') {
      errorMessage = `Invalid request: ${paymentError.message}`;
    } else if (paymentError.type === 'StripeAPIError') {
      errorMessage = 'Our payment system is currently unavailable. Please try again later.';
      statusCode = 503;
    } else if (paymentError.code === 'card_declined') {
      errorMessage = 'Your card was declined. Please try another payment method.';
    }

    console.error('Payment processing error details:', {
      message: errorMessage,
      code: paymentError.code || 'unknown_error',
      type: paymentError.type || 'unknown_type'
    });

    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage,
        code: paymentError.code || 'unknown_error',
        type: paymentError.type || 'unknown_type'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: statusCode,
      },
    )
  }
})
