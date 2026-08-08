type VercelRequest = any;
type VercelResponse = any;
import { query } from './_db/index';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const result = await query(`
        SELECT customer_email as email, customer_name as name, customer_phone as phone,
               COUNT(id) as total_orders, SUM(total) as total_spent, MAX(created_at) as last_order_date
        FROM orders
        GROUP BY customer_email, customer_name, customer_phone
        ORDER BY last_order_date DESC
      `);
      return res.status(200).json(result.rows);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Customers API Error:', error);
    return res.status(500).json({ error: error.message || 'Database error' });
  }
}
