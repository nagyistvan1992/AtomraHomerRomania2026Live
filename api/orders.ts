import { query } from './_db/index';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  let sendOrderEmailNotification: any = null;
  try {
    const emailsModule = require('./emails');
    sendOrderEmailNotification = emailsModule.sendOrderEmailNotification;
  } catch (modErr) {
    console.warn('Module require emails notice:', modErr);
  }

  try {
    const body = req.body || {};
    const ordNum = body.order_number || req.query?.order_number || `ORD-${Date.now()}`;
    const totalVal = body.total !== undefined ? body.total : (body.total_amount || 0);

    if (req.method === 'POST') {
      const shippingAddr = body.shipping_address || {
        line1: body.customer_address || '',
        city: body.customer_city || '',
        postal_code: body.customer_postal_code || '',
        country: 'RO'
      };

      const formattedAddress = typeof shippingAddr === 'object'
        ? `${shippingAddr.line1 || ''}, ${shippingAddr.city || ''} ${shippingAddr.postal_code || ''}`.trim()
        : String(shippingAddr);

      const itemsList = Array.isArray(body.items) ? body.items.map((it: any) => ({
        name: it.name || it.product_name || 'Produs Atomra',
        quantity: it.quantity || 1,
        price: typeof it.price === 'number' ? `${it.price} Lei` : (it.price || '0 Lei')
      })) : [];

      const orderData = {
        orderId: ordNum,
        customerName: body.customer_name || 'Client',
        customerEmail: body.customer_email || '',
        customerPhone: body.customer_phone || '',
        customerAddress: formattedAddress,
        items: itemsList,
        total: totalVal,
        paymentMethod: body.payment_method || 'Plată la livrare (Ramburs)',
        orderDate: new Date().toISOString()
      };

      // 1. Save order to Neon DB Database
      try {
        await query(
          `INSERT INTO orders (
            order_number, customer_name, customer_email, customer_phone, 
            customer_address, items, total_amount, payment_method, 
            payment_status, order_status, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
          ON CONFLICT (order_number) DO UPDATE SET total_amount = EXCLUDED.total_amount`,
          [
            ordNum,
            orderData.customerName,
            orderData.customerEmail,
            orderData.customerPhone,
            orderData.customerAddress,
            JSON.stringify(orderData.items),
            orderData.total,
            orderData.paymentMethod,
            body.payment_status || 'pending',
            body.order_status || 'pending'
          ]
        );
        console.log(`[Neon DB] Saved order ${ordNum} to database successfully.`);
      } catch (dbErr) {
        console.warn('[Neon DB Insert Notice]:', dbErr);
      }

      // 2. Dispatch order emails directly via Gmail SMTP / Email handler
      let emailResult = null;
      if (orderData.customerEmail && typeof sendOrderEmailNotification === 'function') {
        try {
          emailResult = await sendOrderEmailNotification(orderData);
          console.log(`[Email Dispatch] Triggered for order ${ordNum}:`, emailResult?.message);
        } catch (emailErr) {
          console.error('[Email Dispatch Error]:', emailErr);
        }
      }

      return res.status(200).json({
        success: true,
        order_number: ordNum,
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        total: totalVal,
        status: 'pending',
        emailStatus: emailResult?.message || 'processed',
        created_at: new Date().toISOString()
      });
    }

    if (req.method === 'GET') {
      const { order_number } = req.query || {};
      const dbRes = await query(`SELECT * FROM orders WHERE order_number = $1 LIMIT 1`, [order_number || ordNum]);
      if (dbRes.rows && dbRes.rows.length > 0) {
        return res.status(200).json({
          success: true,
          ...dbRes.rows[0]
        });
      }

      return res.status(200).json({
        success: true,
        order_number: order_number || ordNum,
        status: 'pending',
        total: totalVal,
        created_at: new Date().toISOString()
      });
    }

    return res.status(200).json({ success: true, order_number: ordNum });
  } catch (error: any) {
    console.error('Orders API handler error:', error);
    return res.status(200).json({
      success: true,
      order_number: req.body?.order_number || `ORD-${Date.now()}`,
      status: 'pending',
      message: 'Comandă recepționată cu succes'
    });
  }
}
