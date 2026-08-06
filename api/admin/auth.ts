import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'atomra-secret-key-2026';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'atomra2026admin';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { password, email } = req.body || {};

    if (password === ADMIN_PASSWORD) {
      const token = jwt.sign({ email: email || 'admin@atomra.ro', role: 'admin' }, JWT_SECRET, {
        expiresIn: '7d',
      });

      return res.status(200).json({
        success: true,
        token,
        user: { email: email || 'admin@atomra.ro', role: 'admin' },
      });
    } else {
      return res.status(401).json({ success: false, error: 'Parola incorectă' });
    }
  }

  if (req.method === 'GET') {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ authenticated: false });

    const token = authHeader.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return res.status(200).json({ authenticated: true, user: decoded });
    } catch {
      return res.status(401).json({ authenticated: false });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
