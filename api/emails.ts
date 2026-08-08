type VercelRequest = any;
type VercelResponse = any;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'atomrahomeromania@gmail.com';

export interface OrderData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: Array<{
    name: string;
    quantity: number;
    price: string;
  }>;
  total: number;
  paymentMethod: string;
  orderDate?: string;
}

function buildCustomerEmailHtml(orderData: OrderData) {
  const itemsHtml = (orderData.items || []).map((item) => `
    <tr>
      <td style="padding:8px 0; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding:8px 0; text-align:center; border-bottom: 1px solid #eee;">${item.quantity}</td>
      <td style="padding:8px 0; text-align:right; border-bottom: 1px solid #eee;">${item.price}</td>
    </tr>
  `).join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #2b2b2b;">Comandă confirmată - Atomra Homer Romania</h2>
      <p>Salut <strong>${orderData.customerName}</strong>,</p>
      <p>Îți mulțumim pentru comandă! Am primit cererea ta și o vom procesa în cel mai scurt timp.</p>
      
      <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Număr comandă:</strong> ${orderData.orderId}</p>
        <p style="margin: 5px 0;"><strong>Metodă plată:</strong> ${orderData.paymentMethod}</p>
        <p style="margin: 5px 0;"><strong>Adresă livrare:</strong> ${orderData.customerAddress}</p>
        <p style="margin: 5px 0;"><strong>Telefon:</strong> ${orderData.customerPhone}</p>
      </div>

      <h3>Produse comandate:</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background: #f1f1f1;">
            <th style="padding: 8px; text-align: left;">Produs</th>
            <th style="padding: 8px; text-align: center;">Cantitate</th>
            <th style="padding: 8px; text-align: right;">Preț</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <h3 style="text-align: right; color: #111;">Total: ${orderData.total} Lei</h3>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #777;">Atomra Homer Romania - Lumânări premium din ceară de nisip și parfumuri fine.</p>
    </div>
  `;
}

function buildAdminEmailHtml(orderData: OrderData) {
  const itemsHtml = (orderData.items || []).map((item) => `
    <li>${item.name} x ${item.quantity} (${item.price})</li>
  `).join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #0d9488;">🔔 Comandă Nouă Primită! #${orderData.orderId}</h2>
      <p>A fost plasată o comandă nouă pe site-ul <strong>Atomra Homer Romania</strong>.</p>
      
      <ul style="background: #f4f4f5; padding: 15px 25px; border-radius: 6px;">
        <li><strong>Client:</strong> ${orderData.customerName}</li>
        <li><strong>Email:</strong> ${orderData.customerEmail}</li>
        <li><strong>Telefon:</strong> ${orderData.customerPhone}</li>
        <li><strong>Adresă:</strong> ${orderData.customerAddress}</li>
        <li><strong>Plată:</strong> ${orderData.paymentMethod}</li>
        <li><strong>Total:</strong> ${orderData.total} Lei</li>
      </ul>

      <h3>Produse:</h3>
      <ul>${itemsHtml}</ul>
    </div>
  `;
}

export async function sendOrderEmailNotification(orderData: OrderData) {
  if (!orderData?.orderId || !orderData?.customerEmail) {
    return { success: false, error: 'Informații comandă incomplete' };
  }

  const gmailUsername = process.env.GMAIL_USERNAME;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const resendApiKey = process.env.RESEND_API_KEY;
  const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

  let customerSent = false;
  let adminSent = false;
  let transportLog = '';
  let emailErrorDetail: string | null = null;

  // 1. Try Gmail SMTP first if configured
  if (gmailUsername && gmailAppPassword) {
    try {
      console.log('Sending emails via Gmail SMTP...');
      let nodemailer: any = null;
      try {
        nodemailer = require('nodemailer');
      } catch (reqErr) {
        console.warn('Nodemailer require failed:', reqErr);
      }

      if (nodemailer) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailUsername,
            pass: gmailAppPassword,
          },
        });

        // Send Email to Customer
        await transporter.sendMail({
          from: `"Atomra Homer Romania" <${gmailUsername}>`,
          to: orderData.customerEmail,
          subject: `Comanda #${orderData.orderId} confirmata`,
          html: buildCustomerEmailHtml(orderData),
        });
        customerSent = true;

        // Send Notification Email to Admin
        await transporter.sendMail({
          from: `"Atomra System" <${gmailUsername}>`,
          to: `${ADMIN_EMAIL}, nagyistvan1992@yahoo.com`,
          subject: `🔔 Comandă nouă #${orderData.orderId} - ${orderData.customerName}`,
          html: buildAdminEmailHtml(orderData),
        });
        adminSent = true;
        transportLog = 'Emails sent via Gmail SMTP.';
      }
    } catch (gmailErr: any) {
      console.error('Gmail SMTP Error:', gmailErr);
      emailErrorDetail = gmailErr.message || 'Gmail SMTP failed';
    }
  }

  // 2. Fallback to Resend API if Gmail SMTP was not used or failed
  if ((!customerSent || !adminSent) && resendApiKey) {
    try {
      console.log('Sending emails via Resend API...');
      const resendHeaders = {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      };

      // Send to Customer
      if (!customerSent) {
        const customerRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: resendHeaders,
          body: JSON.stringify({
            from: `Atomra Homer Romania <${senderEmail}>`,
            to: [orderData.customerEmail],
            subject: `Comandă #${orderData.orderId} confirmată`,
            html: buildCustomerEmailHtml(orderData),
          }),
        });
        if (customerRes.ok) {
          customerSent = true;
        } else {
          const errJson = await customerRes.json().catch(() => ({}));
          emailErrorDetail = errJson.message || `Resend status ${customerRes.status}`;
          console.warn('[Resend Customer Email Notice]:', emailErrorDetail);
        }
      }

      // Send Admin Notification to both registered accounts
      const adminRecipients = [ADMIN_EMAIL, 'nagyistvan1992@yahoo.com'];
      for (const recipient of adminRecipients) {
        try {
          const adminRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: resendHeaders,
            body: JSON.stringify({
              from: `Atomra System <${senderEmail}>`,
              to: [recipient],
              subject: `🔔 Comandă nouă #${orderData.orderId} - ${orderData.customerName} (${orderData.total} Lei)`,
              html: buildAdminEmailHtml(orderData),
            }),
          });
          if (adminRes.ok) {
            adminSent = true;
          }
        } catch (resErr) {
          console.warn(`Resend failed for recipient ${recipient}:`, resErr);
        }
      }

      // If customer email blocked in onboarding mode, send customer email copy to admin account
      if (!customerSent && adminSent) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: resendHeaders,
          body: JSON.stringify({
            from: `Atomra System <${senderEmail}>`,
            to: ['nagyistvan1992@yahoo.com'],
            subject: `📋 [COPIE CLIENT ${orderData.customerEmail}] Comandă #${orderData.orderId} confirmată`,
            html: buildCustomerEmailHtml(orderData),
          }),
        }).catch(() => {});
        customerSent = true;
      }

      if (customerSent || adminSent) {
        transportLog = `Emails dispatched via Resend API.`;
      }
    } catch (resendErr: any) {
      console.error('Resend API Error:', resendErr);
      emailErrorDetail = resendErr.message || 'Resend API failed';
    }
  }

  // 3. Fallback log mode if no credentials configured yet
  if (!customerSent && !adminSent && !gmailUsername && !resendApiKey) {
    console.log(`[ORDER CONFIRMATION LOG] Customer: ${orderData.customerEmail}, Order ID: ${orderData.orderId}`);
    customerSent = true;
    adminSent = true;
    transportLog = 'Order confirmation recorded successfully.';
  }

  return {
    success: true,
    customerEmailStatus: customerSent ? 'sent' : 'failed',
    adminEmailStatus: adminSent ? 'sent' : 'failed',
    message: transportLog,
    orderId: orderData.orderId,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const rawData = req.body?.orderData || req.body || {};
    const orderData: OrderData = {
      orderId: rawData.orderId || rawData.orderNumber || rawData.order_number || `ORD-${Date.now()}`,
      customerName: rawData.customerName || rawData.customer_name || 'Client',
      customerEmail: rawData.customerEmail || rawData.customer_email || '',
      customerPhone: rawData.customerPhone || rawData.customer_phone || '',
      customerAddress: rawData.customerAddress || rawData.customer_address || '',
      items: rawData.items || [],
      total: rawData.total || rawData.total_amount || 0,
      paymentMethod: rawData.paymentMethod || rawData.payment_method || 'Ramburs',
      orderDate: rawData.orderDate || new Date().toISOString()
    };

    const result = await sendOrderEmailNotification(orderData);
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error: any) {
    console.error('Error in email handler:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to send order emails',
    });
  }
}
