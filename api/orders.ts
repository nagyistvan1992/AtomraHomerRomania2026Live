import { sendOrderEmailNotification } from './emails';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const body = req.body || {};
  const ordNum = body.order_number || `ORD-${Date.now()}`;
  const totalVal = body.total !== undefined ? body.total : (body.total_amount || 0);

  let dbRow: any = null;

  try {
    const connStr =
      process.env.POSTGRES_URL ||
      process.env.DATABASE_URL ||
      'postgresql://neondb_owner:npg_1yQmpo6enEPA@ep-green-brook-zajitt3k.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require';
    const cleanConnStr = connStr.replace(/channel_binding=require&?/, '');

    if (req.method === 'POST') {
      const shippingAddr = body.shipping_address || {
        line1: body.customer_address || '',
        city: body.customer_city || '',
        postal_code: body.customer_postal_code || '',
        country: 'RO'
      };

      const response = await fetch('https://ep-green-brook-zajitt3k.c-2.eu-west-2.aws.neon.tech/sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Neon-Connection-String': cleanConnStr
        },
        body: JSON.stringify({
          query: `INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, shipping_address, total, subtotal, shipping_cost, status, items, stripe_session_id)
                  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                  RETURNING *`,
          params: [
            ordNum,
            body.customer_name || 'Client',
            body.customer_email || '',
            body.customer_phone || '',
            JSON.stringify(shippingAddr),
            totalVal,
            body.subtotal || totalVal,
            body.shipping_cost || 0,
            body.status || 'pending',
            JSON.stringify(body.items || []),
            body.stripe_session_id || ''
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.rows && data.rows.length > 0) {
          dbRow = data.rows[0];
        }
      }

      // Dispatch automatic order confirmation email
      if (body.customer_email) {
        try {
          const emailItems = Array.isArray(body.items) ? body.items.map((it: any) => ({
            name: it.name || it.product_name || 'Produs Atomra',
            quantity: it.quantity || 1,
            price: typeof it.price === 'number' ? `${it.price} Lei` : (it.price || '0 Lei')
          })) : [];

          const shippingAddrStr = typeof shippingAddr === 'object'
            ? `${shippingAddr.line1 || ''}, ${shippingAddr.city || ''} ${shippingAddr.postal_code || ''}`.trim()
            : String(shippingAddr);

          await sendOrderEmailNotification({
            orderId: ordNum,
            customerName: body.customer_name || 'Client',
            customerEmail: body.customer_email,
            customerPhone: body.customer_phone || '',
            customerAddress: shippingAddrStr || 'Adresă furnizată la livrare',
            items: emailItems,
            total: totalVal,
            paymentMethod: body.payment_method || 'Plată la livrare (Ramburs)'
          });
        } catch (emailErr) {
          console.error('Order email notification error:', emailErr);
        }
      }
    } else if (req.method === 'GET') {
      const { id, order_number } = req.query || {};
      let queryText = 'SELECT * FROM orders ORDER BY created_at DESC';
      let queryParams: any[] = [];

      if (id) {
        queryText = 'SELECT * FROM orders WHERE id = $1 LIMIT 1';
        queryParams = [id];
      } else if (order_number) {
        queryText = 'SELECT * FROM orders WHERE order_number = $1 LIMIT 1';
        queryParams = [order_number];
      }

      const response = await fetch('https://ep-green-brook-zajitt3k.c-2.eu-west-2.aws.neon.tech/sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Neon-Connection-String': cleanConnStr
        },
        body: JSON.stringify({ query: queryText, params: queryParams })
      });

      if (response.ok) {
        const data = await response.json();
        const rows = data.rows || [];
        if (id || order_number) {
          if (rows.length > 0) return res.status(200).json(rows[0]);
          if (order_number) {
            return res.status(200).json({
              id: `ord-${Date.now()}`,
              order_number,
              total_amount: 0,
              status: 'pending',
              customer_email: '',
              created_at: new Date().toISOString()
            });
          }
          return res.status(404).json({ error: 'Order not found' });
        }
        return res.status(200).json(rows);
      }
    }
  } catch (err) {
    console.warn('Neon DB async execution warning:', err);
  }

  return res.status(201).json({
    id: dbRow?.id || `ord-${Date.now()}`,
    order_number: dbRow?.order_number || ordNum,
    customer_name: dbRow?.customer_name || body.customer_name || 'Client',
    customer_email: dbRow?.customer_email || body.customer_email || '',
    customer_phone: dbRow?.customer_phone || body.customer_phone || '',
    shipping_address: dbRow?.shipping_address || body.shipping_address || {},
    total: dbRow?.total ? Number(dbRow.total) : totalVal,
    total_amount: dbRow?.total ? Number(dbRow.total) : Number(totalVal),
    subtotal: dbRow?.subtotal ? Number(dbRow.subtotal) : (body.subtotal || totalVal),
    shipping_cost: dbRow?.shipping_cost ? Number(dbRow.shipping_cost) : (body.shipping_cost || 0),
    status: dbRow?.status || body.status || 'pending',
    items: dbRow?.items || body.items || [],
    payment_method: body.stripe_session_id ? 'card' : 'cod',
    created_at: dbRow?.created_at || new Date().toISOString()
  });
}
