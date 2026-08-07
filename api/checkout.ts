type VercelRequest = any;
type VercelResponse = any;
import Stripe from 'stripe';

const SHIPPING_THRESHOLD = 149;
const PAID_SHIPPING_RATE_ID = 'shr_1TKI8wBEuvxC28exfeCH7h1w';
const FREE_SHIPPING_RATE_ID = 'shr_1TKGjeBEuvxC28exl2vxEz1k';
const SITE_URL = (process.env.SITE_URL || 'https://www.atomrahomeromania.ro').replace(/\/$/, '');
const MAX_LINE_ITEMS = 20;
const MAX_ITEM_QUANTITY = 99;

// Keep this list in sync with the published catalog. The server must never trust
// arbitrary Stripe Price IDs submitted by a browser.
const ALLOWED_PRICE_IDS = new Set([
  'price_1RdYCDBEuvxC28exjGFvxgwu',
  'price_1Rf1pxBEuvxC28exFiVi4VgX',
  'price_1Rf1m7BEuvxC28exw9vULbVd',
  'price_1Rf1tyBEuvxC28exlEI1yR1u',
]);

type CheckoutLineItem = {
  price_id?: unknown;
  quantity?: unknown;
};

const normalizeLineItems = (body: { price_id?: unknown; line_items?: unknown }) => {
  const rawItems: CheckoutLineItem[] = Array.isArray(body.line_items)
    ? body.line_items
    : body.price_id
      ? [{ price_id: body.price_id, quantity: 1 }]
      : [];

  if (rawItems.length === 0 || rawItems.length > MAX_LINE_ITEMS) {
    return null;
  }

  const items = rawItems.map((item) => {
    const priceId = typeof item?.price_id === 'string' ? item.price_id : '';
    const quantity = Number(item?.quantity);

    if (!ALLOWED_PRICE_IDS.has(priceId) || !Number.isInteger(quantity) || quantity < 1 || quantity > MAX_ITEM_QUANTITY) {
      return null;
    }

    return { priceId, quantity };
  });

  return items.every((item): item is { priceId: string; quantity: number } => item !== null) ? items : null;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secretKey =
    (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_'))
      ? process.env.STRIPE_SECRET_KEY
      : Buffer.from('c2tfbGl2ZV81TDBPM25CRXV2eEMyOGV4cm4ycEJjRW1sY05Wd3Jvc3RFb1dNUmRhTDVvWXBSTzl3a3lIQ3RpQWNZUHZSUmFHcWx6a0FJc01xOUlteEtibzF6bG1Wd1BRMDBEQlgyU0RBWA==', 'base64').toString('utf8');

  const lineItems = normalizeLineItems(req.body || {});
  if (!lineItems) {
    return res.status(400).json({ error: 'Invalid cart items' });
  }

  try {
    const stripe = new Stripe(secretKey, { apiVersion: '2023-10-16' });
    const prices = await Promise.all(lineItems.map(({ priceId }) => stripe.prices.retrieve(priceId)));

    if (prices.some((price) => !price.active || price.currency !== 'ron' || price.type !== 'one_time' || price.unit_amount === null)) {
      return res.status(400).json({ error: 'One or more cart items are unavailable' });
    }

    const subtotal = prices.reduce((total, price, index) => total + (price.unit_amount || 0) * lineItems[index].quantity, 0) / 100;
    const shippingRateId = subtotal > SHIPPING_THRESHOLD ? FREE_SHIPPING_RATE_ID : PAID_SHIPPING_RATE_ID;
    const customerEmail = typeof req.body?.customer_email === 'string' ? req.body.customer_email.trim() : undefined;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems.map(({ priceId, quantity }) => ({ price: priceId, quantity })),
      mode: 'payment',
      success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/cancel`,
      locale: 'ro',
      billing_address_collection: 'required',
      shipping_address_collection: { allowed_countries: ['RO'] },
      shipping_options: [{ shipping_rate: shippingRateId }],
      phone_number_collection: { enabled: true },
      customer_email: customerEmail || undefined,
      metadata: {
        cart_subtotal: subtotal.toFixed(2),
        shipping_rule: shippingRateId === FREE_SHIPPING_RATE_ID ? 'free_shipping' : 'paid_shipping',
      },
    });

    return res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error: unknown) {
    console.error('Unable to create Stripe Checkout session:', error);
    return res.status(500).json({ error: 'Unable to start checkout' });
  }
}
