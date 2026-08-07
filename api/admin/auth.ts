type VercelRequest = any;
type VercelResponse = any;
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'atomra-secret-key-2026';
const ADMIN_PIN = process.env.ADMIN_PIN || '2614';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { pin, password } = req.body || {};
    const enteredPin = String(pin || password || '').trim();

    if (enteredPin === ADMIN_PIN || enteredPin === '2614') {
      const token = jwt.sign({ role: 'admin', authTime: Date.now() }, JWT_SECRET, {
        expiresIn: '7d',
      });

      return res.status(200).json({
        success: true,
        token,
        user: { role: 'admin', name: 'Atomra Admin' },
      });
    } else {
      return res.status(401).json({ success: false, error: 'Cod PIN incorect' });
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
