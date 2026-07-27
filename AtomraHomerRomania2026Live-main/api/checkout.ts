import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const SHIPPING_THRESHOLD = 149;
const PAID_SHIPPING_RATE_ID = 'shr_1TKI8wBEuvxC28exfeCH7h1w';
const FREE_SHIPPING_RATE_ID = 'shr_1TKGjeBEuvxC28exl2vxEz1k';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { price_id, line_items, success_url, cancel_url, mode, customer_email, cart_subtotal } = req.body;

    const normalizedLineItems = Array.isArray(line_items) && line_items.length > 0
      ? line_items
      : price_id
        ? [{ price_id, quantity: 1 }]
        : [];

    if (!normalizedLineItems.length) {
      return res.status(400).json({ success: false, error: 'At least one Stripe line item is required' });
    }

    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
    if (!STRIPE_SECRET_KEY) {
      return res.status(500).json({ success: false, error: 'STRIPE_SECRET_KEY is not configured on Vercel' });
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
    });

    let customerId: string | undefined;

    if (customer_email) {
      const customers = await stripe.customers.list({ email: customer_email, limit: 1 });
      if (customers.data.length > 0) {
        customerId = customers.data[0].id;
      } else {
        const customer = await stripe.customers.create({ email: customer_email });
        customerId = customer.id;
      }
    }

    const subtotal = Number(cart_subtotal ?? 0);
    const shippingRateId = subtotal > SHIPPING_THRESHOLD
      ? FREE_SHIPPING_RATE_ID
      : PAID_SHIPPING_RATE_ID;

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: normalizedLineItems.map((item: any) => ({
        price: item.price_id,
        quantity: Number(item.quantity) > 0 ? Number(item.quantity) : 1,
      })),
      mode: mode || 'payment',
      success_url: success_url || `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url || `${origin}/cancel`,
      customer: customerId,
      locale: 'ro',
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['RO'],
      },
      shipping_options: [{ shipping_rate: shippingRateId }],
      phone_number_collection: { enabled: true },
      customer_email: !customerId ? customer_email : undefined,
      metadata: {
        cart_subtotal: Number.isFinite(subtotal) ? subtotal.toFixed(2) : '0.00',
        shipping_rule: shippingRateId === FREE_SHIPPING_RATE_ID ? 'free_shipping' : 'paid_shipping',
      },
    });

    return res.status(200).json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error('Error creating Vercel Stripe checkout session:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to create checkout session',
    });
  }
}
