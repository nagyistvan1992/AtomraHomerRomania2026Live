import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';
import { query } from './db/index';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function buffer(readable: any) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

  if (!STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY is missing' });
  }

  const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

  try {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let event: Stripe.Event;

    if (WEBHOOK_SECRET && sig) {
      event = stripe.webhooks.constructEvent(buf, sig, WEBHOOK_SECRET);
    } else {
      event = JSON.parse(buf.toString()) as Stripe.Event;
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;
      const customerName = session.customer_details?.name || 'Client';
      const customerEmail = session.customer_details?.email || '';
      const customerPhone = session.customer_details?.phone || '';
      const shippingAddress = JSON.stringify(session.shipping_details?.address || {});
      const total = (session.amount_total || 0) / 100;
      const subtotal = (session.amount_subtotal || 0) / 100;
      const shippingCost = (session.shipping_cost?.amount_total || 0) / 100;
      const items = JSON.stringify(session.line_items || []);
      const stripeSessionId = session.id;

      await query(
        `INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, shipping_address, total, subtotal, shipping_cost, status, items, stripe_session_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'paid', $9, $10)
         ON CONFLICT (order_number) DO NOTHING`,
        [orderNumber, customerName, customerEmail, customerPhone, shippingAddress, total, subtotal, shippingCost, items, stripeSessionId]
      );
    }

    return res.status(200).json({ received: true });
  } catch (err: any) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
}
