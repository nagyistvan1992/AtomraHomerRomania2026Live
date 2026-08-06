import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from './db/index';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const { id } = req.query;
      if (id) {
        const result = await query('SELECT * FROM orders WHERE id = $1 LIMIT 1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Order not found' });
        return res.status(200).json(result.rows[0]);
      } else {
        const result = await query('SELECT * FROM orders ORDER BY created_at DESC');
        return res.status(200).json(result.rows);
      }
    }

    if (req.method === 'POST') {
      const { order_number, customer_name, customer_email, customer_phone, shipping_address, total, subtotal, shipping_cost, status, items, payment_intent, stripe_session_id } = req.body;
      const result = await query(
        `INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, shipping_address, total, subtotal, shipping_cost, status, items, payment_intent, stripe_session_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         RETURNING *`,
        [
          order_number || `ORD-${Date.now()}`,
          customer_name,
          customer_email,
          customer_phone || '',
          JSON.stringify(shipping_address || {}),
          total,
          subtotal || total,
          shipping_cost || 0,
          status || 'pending',
          JSON.stringify(items || []),
          payment_intent || '',
          stripe_session_id || ''
        ]
      );
      return res.status(201).json(result.rows[0]);
    }

    if (req.method === 'PUT') {
      const { id, status } = req.body;
      const result = await query('UPDATE orders SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
      return res.status(200).json(result.rows[0]);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Orders API Error:', error);
    return res.status(500).json({ error: error.message || 'Database error' });
  }
}
