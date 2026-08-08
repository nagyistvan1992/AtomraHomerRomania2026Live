type VercelRequest = any;
type VercelResponse = any;
import { query } from '../lib/db';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const { slug } = req.query;
      if (slug) {
        const result = await query('SELECT * FROM products WHERE slug = $1 LIMIT 1', [slug]);
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json(result.rows[0]);
      } else {
        const result = await query('SELECT * FROM products ORDER BY created_at DESC');
        return res.status(200).json(result.rows);
      }
    }

    if (req.method === 'POST') {
      const { name, slug, description, price, compare_at_price, category_id, images, stock, is_featured } = req.body;
      const result = await query(
        `INSERT INTO products (name, slug, description, price, compare_at_price, category_id, images, stock, is_featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [name, slug, description, price, compare_at_price, category_id, images || [], stock || 0, is_featured || false]
      );
      return res.status(201).json(result.rows[0]);
    }

    if (req.method === 'PUT') {
      const { id, name, slug, description, price, compare_at_price, category_id, images, stock, is_featured } = req.body;
      const result = await query(
        `UPDATE products SET name = $1, slug = $2, description = $3, price = $4, compare_at_price = $5, category_id = $6, images = $7, stock = $8, is_featured = $9, updated_at = NOW()
         WHERE id = $10 RETURNING *`,
        [name, slug, description, price, compare_at_price, category_id, images, stock, is_featured, id]
      );
      return res.status(200).json(result.rows[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await query('DELETE FROM products WHERE id = $1', [id]);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Products API Error:', error);
    return res.status(500).json({ error: error.message || 'Database error' });
  }
}
