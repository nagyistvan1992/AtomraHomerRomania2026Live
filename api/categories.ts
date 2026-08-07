type VercelRequest = any;
type VercelResponse = any;
import { query } from './db/index';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'GET') {
      const { slug } = req.query;
      if (slug) {
        const result = await query('SELECT * FROM categories WHERE slug = $1 LIMIT 1', [slug]);
        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Category not found' });
        }
        return res.status(200).json(result.rows[0]);
      } else {
        const result = await query('SELECT * FROM categories ORDER BY display_order ASC, created_at DESC');
        return res.status(200).json(result.rows);
      }
    }

    if (req.method === 'POST') {
      const { name, slug, description, image, display_order } = req.body;
      const result = await query(
        `INSERT INTO categories (name, slug, description, image, display_order)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [name, slug, description, image, display_order || 0]
      );
      return res.status(201).json(result.rows[0]);
    }

    if (req.method === 'PUT') {
      const { id, name, slug, description, image, display_order } = req.body;
      const result = await query(
        `UPDATE categories SET name = $1, slug = $2, description = $3, image = $4, display_order = $5
         WHERE id = $6 RETURNING *`,
        [name, slug, description, image, display_order, id]
      );
      return res.status(200).json(result.rows[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await query('DELETE FROM categories WHERE id = $1', [id]);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error: any) {
    console.error('Categories API Error:', error);
    return res.status(500).json({ error: error.message || 'Database error' });
  }
}
