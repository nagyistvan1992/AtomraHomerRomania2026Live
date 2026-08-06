import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const sessionId = (req.query.session_id || req.body?.session_id) as string;

  if (!sessionId) {
    return res.status(400).json({ error: 'Missing session_id parameter' });
  }

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  if (!STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY not configured' });
  }

  try {
    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer', 'shipping_cost.shipping_rate'],
    });

    const lineItems = session.line_items?.data.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      amount_subtotal: item.amount_subtotal / 100,
      amount_total: item.amount_total / 100,
      currency: item.currency,
    })) || [];

    const orderDetails = {
      orderId: session.id,
      amount_total: (session.amount_total || 0) / 100,
      subtotal: (session.amount_subtotal || 0) / 100,
      shipping_cost: (session.shipping_cost?.amount_total || 0) / 100,
      currency: session.currency,
      customer_email: session.customer_details?.email,
      customer_name: session.customer_details?.name,
      customer_phone: session.customer_details?.phone,
      shipping_address: session.shipping_details?.address,
      lineItems,
      payment_status: session.payment_status,
      created_at: new Date(session.created * 1000).toISOString(),
    };

    return res.status(200).json(orderDetails);
  } catch (error: any) {
    console.error('Error fetching session details:', error);
    return res.status(500).json({ error: error.message || 'Failed to fetch session details' });
  }
}
