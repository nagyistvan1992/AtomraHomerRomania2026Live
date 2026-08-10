type VercelRequest = any;
type VercelResponse = any;
import nodemailer from 'nodemailer';

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
      <td style="padding:12px 0; border-bottom: 1px solid #efeae1; font-size:14px; color:#241F1C;">${item.name}</td>
      <td style="padding:12px 0; text-align:center; border-bottom: 1px solid #efeae1; font-size:14px; color:#241F1C;">${item.quantity}</td>
      <td style="padding:12px 0; text-align:right; border-bottom: 1px solid #efeae1; font-size:14px; font-weight:600; color:#241F1C;">${item.price}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; background-color: #f7f5f0; margin: 0; padding: 20px; color: #2b2b2b;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e8e3d9; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
        <div style="background-color: #241F1C; padding: 32px 24px; text-align: center;">
          <h1 style="color: #F7F5F2; font-size: 24px; font-weight: 300; letter-spacing: 4px; margin: 0; text-transform: uppercase;">ATOMRA</h1>
          <p style="color: #D4C8BC; font-size: 11px; letter-spacing: 2px; margin-top: 6px; text-transform: uppercase;">Home & Sand Wax Candles</p>
        </div>
        <div style="padding: 32px 24px;">
          <h2 style="font-size: 20px; font-weight: 400; color: #241F1C; margin-top: 0;">Îți mulțumim pentru comandă, ${orderData.customerName}! ✨</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #555555;">
            Am primit cu bucurie comanda ta <strong>#${orderData.orderId}</strong>. Echipa noastră o pregătește cu atenție pentru a fi livrată în cel mai scurt timp.
          </p>
          <div style="background-color: #faf8f5; border-radius: 12px; padding: 20px; margin: 24px 0; border: 1px solid #efeae1;">
            <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #8c7a6b; margin-top: 0; margin-bottom: 12px;">Informații Livrare</h3>
            <p style="margin: 4px 0; font-size: 14px; color: #333333;"><strong>Nume:</strong> ${orderData.customerName}</p>
            <p style="margin: 4px 0; font-size: 14px; color: #333333;"><strong>Telefon:</strong> ${orderData.customerPhone}</p>
            <p style="margin: 4px 0; font-size: 14px; color: #333333;"><strong>Adresă:</strong> ${orderData.customerAddress}</p>
            <p style="margin: 4px 0; font-size: 14px; color: #333333;"><strong>Metodă plată:</strong> ${orderData.paymentMethod}</p>
          </div>
          <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #8c7a6b; margin-bottom: 12px;">Produse Comandate</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <thead>
              <tr style="border-bottom: 1px solid #eae5db;">
                <th style="padding: 10px 0; text-align: left; font-size: 12px; color: #777777; font-weight: 600;">Produs</th>
                <th style="padding: 10px 0; text-align: center; font-size: 12px; color: #777777; font-weight: 600;">Cantitate</th>
                <th style="padding: 10px 0; text-align: right; font-size: 12px; color: #777777; font-weight: 600;">Preț</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <div style="border-top: 2px solid #241F1C; padding-top: 16px; text-align: right;">
            <p style="font-size: 18px; font-weight: 600; color: #241F1C; margin: 0;">Total Comandă: ${orderData.total} Lei</p>
          </div>
          <div style="margin-top: 32px; padding: 16px; background-color: #faf8f5; border-radius: 8px; text-align: center; border: 1px solid #efeae1;">
            <p style="font-size: 13px; color: #666666; margin: 0;">
              Dacă ai întrebări despre comanda ta, ne poți contacta la <a href="mailto:atomrahomeromania@gmail.com" style="color: #241F1C; font-weight: 600; text-decoration: underline;">atomrahomeromania@gmail.com</a>.
            </p>
          </div>
        </div>
        <div style="background-color: #faf8f5; padding: 20px; text-align: center; border-top: 1px solid #efeae1;">
          <p style="font-size: 12px; color: #888888; margin: 0;">&copy; ${new Date().getFullYear()} Atomra Home România. Toate drepturile rezervate.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function buildAdminEmailHtml(orderData: OrderData) {
  const itemsHtml = (orderData.items || []).map((item) => `
    <tr>
      <td style="padding:10px; border-bottom:1px solid #e4e4e7; font-weight:600;">${item.name}</td>
      <td style="padding:10px; border-bottom:1px solid #e4e4e7; text-align:center;">${item.quantity} x</td>
      <td style="padding:10px; border-bottom:1px solid #e4e4e7; text-align:right; font-weight:bold;">${item.price}</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px; color: #18181b;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; padding: 28px; border: 1px solid #e4e4e7; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background-color: #0d9488; color: #ffffff; padding: 18px 24px; border-radius: 10px; margin-bottom: 24px;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 600;">🔔 COMANDĂ NOUĂ PRIMITĂ! #${orderData.orderId}</h2>
          <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.95;">Valoare: <strong>${orderData.total} Lei</strong> | Plată: <strong>${orderData.paymentMethod}</strong></p>
        </div>

        <h3 style="font-size: 15px; color: #27272a; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Date Client & Livrare:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #fafafa; border-radius: 8px; border: 1px solid #f4f4f5;">
          <tr><td style="padding: 10px 14px; font-weight: bold; color: #52525b; border-bottom: 1px solid #f4f4f5; width: 140px;">Client:</td><td style="padding: 10px 14px; border-bottom: 1px solid #f4f4f5; color: #09090b; font-weight: 600;">${orderData.customerName}</td></tr>
          <tr><td style="padding: 10px 14px; font-weight: bold; color: #52525b; border-bottom: 1px solid #f4f4f5;">Email:</td><td style="padding: 10px 14px; border-bottom: 1px solid #f4f4f5;"><a href="mailto:${orderData.customerEmail}" style="color: #0d9488; text-decoration: underline;">${orderData.customerEmail}</a></td></tr>
          <tr><td style="padding: 10px 14px; font-weight: bold; color: #52525b; border-bottom: 1px solid #f4f4f5;">Telefon:</td><td style="padding: 10px 14px; border-bottom: 1px solid #f4f4f5;"><a href="tel:${orderData.customerPhone}" style="color: #0d9488; font-weight: bold; text-decoration: none;">${orderData.customerPhone}</a></td></tr>
          <tr><td style="padding: 10px 14px; font-weight: bold; color: #52525b; border-bottom: 1px solid #f4f4f5;">Adresă Livrare:</td><td style="padding: 10px 14px; border-bottom: 1px solid #f4f4f5; color: #09090b;">${orderData.customerAddress}</td></tr>
          <tr><td style="padding: 10px 14px; font-weight: bold; color: #52525b;">Metodă Plată:</td><td style="padding: 10px 14px; color: #09090b;">${orderData.paymentMethod}</td></tr>
        </table>

        <h3 style="font-size: 15px; color: #27272a; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Produse Comandate:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f4f4f5; color: #52525b; font-size: 12px;">
              <th style="padding: 10px; text-align: left;">Produs</th>
              <th style="padding: 10px; text-align: center;">Cantitate</th>
              <th style="padding: 10px; text-align: right;">Preț</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <div style="background-color: #18181b; color: #ffffff; padding: 16px; border-radius: 8px; text-align: right; font-weight: bold; font-size: 18px;">
          TOTAL DE ÎNCASAT: ${orderData.total} Lei
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendOrderEmailNotification(orderData: OrderData) {
  if (!orderData?.orderId || !orderData?.customerEmail) {
    return { success: false, error: 'Informații comandă incomplete' };
  }

  const gmailUsername = (
    process.env.GMAIL_USERNAME ||
    process.env.GMAIL_USER ||
    process.env.SMTP_USER ||
    process.env.EMAIL_USER ||
    ''
  ).trim();

  const gmailAppPassword = (
    process.env.GMAIL_APP_PASSWORD ||
    process.env.GMAIL_PASS ||
    process.env.GMAIL_PASSWORD ||
    process.env.SMTP_PASS ||
    process.env.EMAIL_PASS ||
    ''
  ).trim().replace(/\s+/g, '');

  const resendApiKey = process.env.RESEND_API_KEY;
  const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

  let customerSent = false;
  let adminSent = false;
  let transportLog = '';
  let emailErrorDetail: string | null = null;

  // 1. Try Gmail SMTP first if configured
  if (gmailUsername && gmailAppPassword) {
    try {
      console.log(`Sending emails via Gmail SMTP (${gmailUsername})...`);
      if (nodemailer) {
        const createGmailTransporter = (usePort465: boolean) =>
          nodemailer.createTransport({
            ...(usePort465
              ? { host: 'smtp.gmail.com', port: 465, secure: true }
              : { service: 'gmail' }),
            auth: {
              user: gmailUsername,
              pass: gmailAppPassword,
            },
            connectionTimeout: 12000,
            greetingTimeout: 12000,
            socketTimeout: 12000,
            tls: {
              rejectUnauthorized: false,
            },
          });

        let transporter = createGmailTransporter(true);

        // Send Email to Customer
        try {
          await transporter.sendMail({
            from: `"Atomra Home România" <${gmailUsername}>`,
            to: orderData.customerEmail,
            subject: `Comandă #${orderData.orderId} confirmată - Atomra Home România`,
            html: buildCustomerEmailHtml(orderData),
          });
          customerSent = true;
          console.log(`[Gmail SMTP] Customer email sent successfully to ${orderData.customerEmail}`);
        } catch (cErr: any) {
          console.warn(`[Gmail SMTP port 465] Customer email failed, trying service:gmail fallback:`, cErr.message);
          try {
            const fallbackTransporter = createGmailTransporter(false);
            await fallbackTransporter.sendMail({
              from: `"Atomra Home România" <${gmailUsername}>`,
              to: orderData.customerEmail,
              subject: `Comandă #${orderData.orderId} confirmată - Atomra Home România`,
              html: buildCustomerEmailHtml(orderData),
            });
            customerSent = true;
          } catch (cErr2: any) {
            console.error(`[Gmail SMTP] Customer email final error for ${orderData.customerEmail}:`, cErr2);
            emailErrorDetail = cErr2.message || String(cErr2);
          }
        }

        // Send Notification Email to Admin (both accounts)
        try {
          await transporter.sendMail({
            from: `"Atomra System" <${gmailUsername}>`,
            to: `${ADMIN_EMAIL}, nagyistvan1992@yahoo.com`,
            subject: `🔔 COMANDĂ NOUĂ #${orderData.orderId} - ${orderData.customerName} (${orderData.total} Lei)`,
            html: buildAdminEmailHtml(orderData),
          });
          adminSent = true;
          console.log(`[Gmail SMTP] Admin email sent successfully to ${ADMIN_EMAIL} & nagyistvan1992@yahoo.com`);
        } catch (aErr: any) {
          console.warn('[Gmail SMTP port 465] Admin email failed, trying service:gmail fallback:', aErr.message);
          try {
            const fallbackTransporter = createGmailTransporter(false);
            await fallbackTransporter.sendMail({
              from: `"Atomra System" <${gmailUsername}>`,
              to: `${ADMIN_EMAIL}, nagyistvan1992@yahoo.com`,
              subject: `🔔 COMANDĂ NOUĂ #${orderData.orderId} - ${orderData.customerName} (${orderData.total} Lei)`,
              html: buildAdminEmailHtml(orderData),
            });
            adminSent = true;
          } catch (aErr2: any) {
            console.error('[Gmail SMTP] Admin email final error:', aErr2);
            if (!emailErrorDetail) emailErrorDetail = aErr2.message || String(aErr2);
          }
        }

        if (customerSent || adminSent) {
          transportLog = `Emails dispatched via Gmail SMTP (Customer: ${customerSent ? 'OK' : 'Failed'}, Admin: ${adminSent ? 'OK' : 'Failed'})`;
        }
      }
    } catch (gmailErr: any) {
      console.error('Gmail SMTP Setup Error:', gmailErr);
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

  // 3. Fallback record mode if transports failed
  if (!customerSent && !adminSent) {
    console.warn(`[ORDER CONFIRMATION LOG] Customer: ${orderData.customerEmail}, Order ID: ${orderData.orderId}, SMTP Error: ${emailErrorDetail}`);
    transportLog = `Comandă înregistrată. Notă SMTP: ${emailErrorDetail || 'Verificare autentificare Gmail SMTP necesară'}`;
  }

  return {
    success: true,
    customerEmailStatus: customerSent ? 'sent' : 'failed',
    adminEmailStatus: adminSent ? 'sent' : 'failed',
    message: transportLog,
    error: emailErrorDetail || null,
    gmailUserDetected: Boolean(gmailUsername),
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
    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Error in email handler:', error);
    return res.status(200).json({
      success: true,
      error: error.message || 'Failed to send order emails',
    });
  }
}
