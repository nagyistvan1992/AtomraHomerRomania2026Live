export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const body = req.body || {};
  const ordNum = body.order_number || `ORD-${Date.now()}`;
  const totalVal = body.total !== undefined ? body.total : (body.total_amount || 0);

  return res.status(201).json({
    id: `ord-${Date.now()}`,
    order_number: ordNum,
    customer_name: body.customer_name || 'Client',
    customer_email: body.customer_email || '',
    customer_phone: body.customer_phone || '',
    shipping_address: body.shipping_address || {},
    total: totalVal,
    total_amount: Number(totalVal),
    subtotal: body.subtotal || totalVal,
    shipping_cost: body.shipping_cost || 0,
    status: body.status || 'pending',
    items: body.items || [],
    payment_method: 'cod',
    created_at: new Date().toISOString()
  });
}
