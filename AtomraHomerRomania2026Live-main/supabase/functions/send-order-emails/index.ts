import { createClient } from 'npm:@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface OrderData {
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
  orderDate: string;
}

interface EmailResult {
  method: string;
  recipient: string;
  subject: string;
  timestamp: string;
}

const ADMIN_EMAIL = 'atomrahomeromania@gmail.com';

async function safeAdminSideEffect(label: string, operation: () => Promise<void>) {
  try {
    await operation();
  } catch (error) {
    console.error(`[send-order-emails] ${label} failed`, error);
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function readSmtpResponse(conn: Deno.Conn, decoder: TextDecoder) {
  const buffer = new Uint8Array(4096);
  const bytesRead = await conn.read(buffer);
  if (!bytesRead) {
    return '';
  }

  return decoder.decode(buffer.subarray(0, bytesRead)).trim();
}

async function sendSmtpCommand(
  conn: Deno.Conn,
  encoder: TextEncoder,
  decoder: TextDecoder,
  command: string,
) {
  await conn.write(encoder.encode(command));
  return await readSmtpResponse(conn, decoder);
}

async function sendEmail(
  to: string,
  subject: string,
  htmlContent: string,
  from: string,
  username: string,
  password: string,
): Promise<EmailResult> {
  const conn = await Deno.connect({
    hostname: 'smtp.gmail.com',
    port: 587,
  });

  try {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const greeting = await readSmtpResponse(conn, decoder);
    if (!greeting.startsWith('220')) {
      throw new Error(`SMTP greeting failed: ${greeting || 'No response'}`);
    }

    let response = await sendSmtpCommand(conn, encoder, decoder, 'EHLO localhost\r\n');
    if (!response.startsWith('250')) {
      throw new Error(`EHLO failed: ${response || 'No response'}`);
    }

    response = await sendSmtpCommand(conn, encoder, decoder, 'STARTTLS\r\n');
    if (!response.startsWith('220')) {
      throw new Error(`STARTTLS failed: ${response || 'No response'}`);
    }

    const tlsConn = await Deno.startTls(conn, { hostname: 'smtp.gmail.com' });

    try {
      const tlsEncoder = new TextEncoder();
      const tlsDecoder = new TextDecoder();

      response = await sendSmtpCommand(tlsConn, tlsEncoder, tlsDecoder, 'EHLO localhost\r\n');
      if (!response.startsWith('250')) {
        throw new Error(`TLS EHLO failed: ${response || 'No response'}`);
      }

      response = await sendSmtpCommand(tlsConn, tlsEncoder, tlsDecoder, 'AUTH LOGIN\r\n');
      if (!response.startsWith('334')) {
        throw new Error(`AUTH LOGIN failed: ${response || 'No response'}`);
      }

      response = await sendSmtpCommand(tlsConn, tlsEncoder, tlsDecoder, `${btoa(username)}\r\n`);
      if (!response.startsWith('334')) {
        throw new Error(`Username authentication failed: ${response || 'No response'}`);
      }

      response = await sendSmtpCommand(tlsConn, tlsEncoder, tlsDecoder, `${btoa(password)}\r\n`);
      if (!response.startsWith('235')) {
        throw new Error('Authentication failed. Verify GMAIL_USERNAME and GMAIL_APP_PASSWORD.');
      }

      response = await sendSmtpCommand(tlsConn, tlsEncoder, tlsDecoder, `MAIL FROM:<${username}>\r\n`);
      if (!response.startsWith('250')) {
        throw new Error(`MAIL FROM failed: ${response || 'No response'}`);
      }

      response = await sendSmtpCommand(tlsConn, tlsEncoder, tlsDecoder, `RCPT TO:<${to}>\r\n`);
      if (!response.startsWith('250')) {
        throw new Error(`RCPT TO failed: ${response || 'No response'}`);
      }

      response = await sendSmtpCommand(tlsConn, tlsEncoder, tlsDecoder, 'DATA\r\n');
      if (!response.startsWith('354')) {
        throw new Error(`DATA failed: ${response || 'No response'}`);
      }

      const emailContent = [
        `From: ${from}`,
        `To: ${to}`,
        `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
        '',
        htmlContent,
        '',
        '.',
      ].join('\r\n');

      response = await sendSmtpCommand(tlsConn, tlsEncoder, tlsDecoder, `${emailContent}\r\n`);
      if (!response.startsWith('250')) {
        throw new Error(`Email content sending failed: ${response || 'No response'}`);
      }

      await sendSmtpCommand(tlsConn, tlsEncoder, tlsDecoder, 'QUIT\r\n');

      return {
        method: 'smtp',
        recipient: to,
        subject,
        timestamp: new Date().toISOString(),
      };
    } finally {
      tlsConn.close();
    }
  } catch (error) {
    try {
      conn.close();
    } catch {
      // Ignore close errors while surfacing the original failure.
    }

    throw error;
  }
}

function buildCustomerEmailHtml(orderData: OrderData, supportEmail: string) {
  const itemsHtml = orderData.items.map((item) => `
    <tr>
      <td style="padding:8px 0;">${escapeHtml(item.name)}</td>
      <td style="padding:8px 0; text-align:center;">${item.quantity}</td>
      <td style="padding:8px 0; text-align:right;">${escapeHtml(item.price)}</td>
    </tr>
  `).join('');

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#1e293b;">
      <h1 style="font-weight:600;">Comanda confirmata</h1>
      <p>Salut ${escapeHtml(orderData.customerName)},</p>
      <p>Am primit comanda ta si o vom procesa cat mai curand.</p>
      <p><strong>Numar comanda:</strong> ${escapeHtml(orderData.orderId)}</p>
      <p><strong>Metoda plata:</strong> ${escapeHtml(orderData.paymentMethod)}</p>
      <p><strong>Adresa livrare:</strong> ${escapeHtml(orderData.customerAddress)}</p>
      <table style="width:100%;border-collapse:collapse;margin:24px 0;">
        <thead>
          <tr>
            <th style="text-align:left;border-bottom:1px solid #cbd5e1;padding-bottom:8px;">Produs</th>
            <th style="text-align:center;border-bottom:1px solid #cbd5e1;padding-bottom:8px;">Cant.</th>
            <th style="text-align:right;border-bottom:1px solid #cbd5e1;padding-bottom:8px;">Pret</th>
          </tr>
        </thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      <p><strong>Total:</strong> ${orderData.total} Lei</p>
      <p>Daca ai intrebari, ne poti scrie la ${escapeHtml(supportEmail)}.</p>
    </div>
  `;
}

function buildAdminEmailHtml(orderData: OrderData) {
  const itemsHtml = orderData.items.map((item) => `
    <li>${escapeHtml(item.name)} x ${item.quantity} - ${escapeHtml(item.price)}</li>
  `).join('');

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#1e293b;">
      <h1 style="font-weight:600;">Comanda noua</h1>
      <p><strong>Numar comanda:</strong> ${escapeHtml(orderData.orderId)}</p>
      <p><strong>Client:</strong> ${escapeHtml(orderData.customerName)}</p>
      <p><strong>Email:</strong> ${escapeHtml(orderData.customerEmail)}</p>
      <p><strong>Telefon:</strong> ${escapeHtml(orderData.customerPhone)}</p>
      <p><strong>Adresa:</strong> ${escapeHtml(orderData.customerAddress)}</p>
      <p><strong>Plata:</strong> ${escapeHtml(orderData.paymentMethod)}</p>
      <p><strong>Total:</strong> ${orderData.total} Lei</p>
      <ul>${itemsHtml}</ul>
    </div>
  `;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { orderData }: { orderData: OrderData } = await req.json();

    if (!orderData?.orderId || !orderData?.customerEmail) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid order data',
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        },
      );
    }

    const gmailUsername = Deno.env.get('GMAIL_USERNAME');
    const gmailAppPassword = Deno.env.get('GMAIL_APP_PASSWORD');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!gmailUsername || !gmailAppPassword) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Email service not configured',
          debug: {
            hasUsername: Boolean(gmailUsername),
            hasPassword: Boolean(gmailAppPassword),
          },
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 503,
        },
      );
    }

    const supabaseAdmin = supabaseUrl && supabaseServiceRoleKey
      ? createClient(supabaseUrl, supabaseServiceRoleKey)
      : null;

    const recordEmailAttempt = async (
      recipient: string,
      subject: string,
      status: 'success' | 'error',
      errorMessage?: string,
      smtpResponse?: string,
    ) => {
      if (!supabaseAdmin) {
        return;
      }

      await supabaseAdmin.rpc('record_email_attempt', {
        p_order_id: orderData.orderId,
        p_recipient: recipient,
        p_subject: subject,
        p_status: status,
        p_error_message: errorMessage ?? null,
        p_smtp_response: smtpResponse ?? null,
      });
    };

    const updateOrderEmailStatus = async (emailsSent: boolean, emailError?: string) => {
      if (!supabaseAdmin) {
        return;
      }

      await supabaseAdmin.rpc('update_order_email_status', {
        p_order_id: orderData.orderId,
        p_emails_sent: emailsSent,
        p_email_error: emailError ?? null,
      });
    };

    const customerSubject = `Comanda #${orderData.orderId} confirmata`;
    const adminSubject = `Comanda noua #${orderData.orderId}`;

    let customerEmailSuccess = false;
    let adminEmailSuccess = false;
    let overallEmailError: string | undefined;

    try {
      const customerResult = await sendEmail(
        orderData.customerEmail,
        customerSubject,
        buildCustomerEmailHtml(orderData, gmailUsername),
        `Atomra Home Romania <${gmailUsername}>`,
        gmailUsername,
        gmailAppPassword,
      );

      customerEmailSuccess = true;
      await safeAdminSideEffect('record customer email success', async () => {
        await recordEmailAttempt(
          orderData.customerEmail,
          customerSubject,
          'success',
          undefined,
          JSON.stringify(customerResult),
        );
      });
    } catch (error) {
      overallEmailError = error instanceof Error ? error.message : 'Unknown customer email error';
      await safeAdminSideEffect('record customer email error', async () => {
        await recordEmailAttempt(orderData.customerEmail, customerSubject, 'error', overallEmailError);
      });
    }

    try {
      const adminResult = await sendEmail(
        ADMIN_EMAIL,
        adminSubject,
        buildAdminEmailHtml(orderData),
        `Atomra Home Romania <${gmailUsername}>`,
        gmailUsername,
        gmailAppPassword,
      );

      adminEmailSuccess = true;
      await safeAdminSideEffect('record admin email success', async () => {
        await recordEmailAttempt(
          ADMIN_EMAIL,
          adminSubject,
          'success',
          undefined,
          JSON.stringify(adminResult),
        );
      });
    } catch (error) {
      const adminError = error instanceof Error ? error.message : 'Unknown admin email error';
      overallEmailError = overallEmailError ?? adminError;
      await safeAdminSideEffect('record admin email error', async () => {
        await recordEmailAttempt(ADMIN_EMAIL, adminSubject, 'error', adminError);
      });
    }

    await safeAdminSideEffect('update order email status', async () => {
      await updateOrderEmailStatus(customerEmailSuccess && adminEmailSuccess, overallEmailError);
    });

    return new Response(
      JSON.stringify({
        success: customerEmailSuccess && adminEmailSuccess,
        customerEmailStatus: customerEmailSuccess ? 'sent' : 'failed',
        adminEmailStatus: adminEmailSuccess ? 'sent' : 'failed',
        error: overallEmailError ?? null,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: customerEmailSuccess && adminEmailSuccess ? 200 : 500,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown request error',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});
