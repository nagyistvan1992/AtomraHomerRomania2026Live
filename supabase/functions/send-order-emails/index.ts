const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface OrderData {
  orderId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  items: Array<{
    name: string
    quantity: number
    price: string
  }>
  total: number
  paymentMethod: string
  orderDate: string
}

// Direct SMTP email sending using Deno's native capabilities
async function sendEmail(to: string, subject: string, htmlContent: string, from: string, username: string, password: string) {
  try {
    console.log('🚀 Connecting to Gmail SMTP server...')
    
    // Connect to Gmail SMTP server
    const conn = await Deno.connect({
      hostname: 'smtp.gmail.com',
      port: 587,
    })

    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    // Helper function to read SMTP response
    async function readResponse(): Promise<string> {
      const buffer = new Uint8Array(1024)
      const bytesRead = await conn.read(buffer)
      if (bytesRead) {
        const response = decoder.decode(buffer.subarray(0, bytesRead))
        console.log('SMTP Response:', response.trim())
        return response.trim()
      }
      return ''
    }

    // Helper function to send SMTP command
    async function sendCommand(command: string): Promise<string> {
      console.log('SMTP Command:', command.trim())
      await conn.write(encoder.encode(command))
      return await readResponse()
    }

    try {
      // Initial connection
      await readResponse()

      // EHLO
      let response = await sendCommand('EHLO localhost\r\n')
      if (!response.startsWith('250')) {
        throw new Error(`EHLO failed: ${response || 'No response'}`)
      }

      // STARTTLS
      response = await sendCommand('STARTTLS\r\n')
      if (!response.startsWith('220')) {
        throw new Error(`STARTTLS failed: ${response || 'No response'}`)
      }

      // Upgrade to TLS connection
      const tlsConn = await Deno.startTls(conn, { hostname: 'smtp.gmail.com' })
      
      // Re-create encoder/decoder for TLS connection
      const tlsEncoder = new TextEncoder()
      const tlsDecoder = new TextDecoder()

      async function readTlsResponse(): Promise<string> {
        const buffer = new Uint8Array(1024)
        const bytesRead = await tlsConn.read(buffer)
        if (bytesRead) {
          const response = tlsDecoder.decode(buffer.subarray(0, bytesRead))
          console.log('TLS SMTP Response:', response.trim())
          return response.trim()
        }
        return ''
      }

      async function sendTlsCommand(command: string): Promise<string> {
        console.log('TLS SMTP Command:', command.trim())
        await tlsConn.write(tlsEncoder.encode(command))
        return await readTlsResponse()
      }

      // EHLO again after TLS
      response = await sendTlsCommand('EHLO localhost\r\n')
      if (!response.startsWith('250')) {
        throw new Error(`TLS EHLO failed: ${response || 'No response'}`)
      }

      // AUTH LOGIN
      response = await sendTlsCommand('AUTH LOGIN\r\n')
      if (!response.startsWith('334')) {
        throw new Error(`AUTH LOGIN failed: ${response || 'No response'}`)
      }

      // Send username (base64 encoded)
      const encodedUsername = btoa(username)
      response = await sendTlsCommand(`${encodedUsername}\r\n`)
      if (!response.startsWith('334')) {
        throw new Error(`Username authentication failed: ${response || 'No response'} for username: ${username.substring(0, 3)}...`)
      }

      // Send password (base64 encoded)
      const encodedPassword = btoa(password)
      response = await sendTlsCommand(`${encodedPassword}\r\n`)
      if (!response.startsWith('235')) {
        console.error('Password authentication failed with response:', response || 'No response')
        throw new Error('Authentication failed - please check your Gmail credentials and ensure 2FA is enabled with an app password')
        throw new Error('Authentication failed - please check your Gmail credentials and ensure 2FA is enabled with an app password')
      }

      // MAIL FROM
      response = await sendTlsCommand(`MAIL FROM:<${username}>\r\n`)
      if (!response.startsWith('250')) {
        throw new Error(`MAIL FROM failed: ${response || 'No response'}`)
      }

      // RCPT TO
      response = await sendTlsCommand(`RCPT TO:<${to}>\r\n`)
      if (!response.startsWith('250')) {
        throw new Error(`RCPT TO failed: ${response || 'No response'} for recipient: ${to}`)
      }

      // DATA
      response = await sendTlsCommand('DATA\r\n')
      if (!response.startsWith('354')) {
        throw new Error(`DATA command failed: ${response || 'No response'}`)
      }

      // Email headers and content (properly encoded for UTF-8)
      const emailContent = [
        `From: ${from}`,
        `To: ${to}`,
        `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
        `MIME-Version: 1.0`,
        `Content-Type: text/html; charset=UTF-8`,
        `Content-Transfer-Encoding: quoted-printable`,
        ``,
        htmlContent,
        ``,
        `.`
      ].join('\r\n')

      response = await sendTlsCommand(`${emailContent}\r\n`)
      if (!response.startsWith('250')) {
        console.error('Email content sending failed with response:', response)
        console.error('Email content sending failed with response:', response)
        throw new Error(`Email content sending failed: ${response || 'No response'}`)
        console.error('Email sending failed with response:', response)
      } else {
        throw new Error(`Email content sending failed: ${response || 'No response'}`)
      } else {
        console.log('Email content successfully sent!')
      }

      // QUIT
      await sendTlsCommand('QUIT\r\n')
      
      tlsConn.close()
      
      console.log('✅ Email sent successfully via direct SMTP to:', to)
      console.log(`📧 Email delivery complete to: ${to}`)
      console.log(`📧 Email delivery complete to: ${to}`)
      return {
        success: true,
        messageId: `smtp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        recipient: to,
        recipient: to,
        to: to,
        subject: subject,
        method: 'Direct SMTP'
      }

    } catch (smtpError) {
      console.error('SMTP Error during communication:', smtpError)
      try { conn.close() } catch(e) { console.error('Error closing connection:', e) }
      throw new Error(`SMTP Error: ${smtpError.message}`)
      throw new Error(`SMTP Error: ${smtpError.message}`)
    }

  } catch (error) {
    console.error('Direct SMTP failed with error:', error)
    console.error('Direct SMTP failed with error:', error)
    console.error('Error details:', error.stack || 'No stack trace')
    throw new Error(`SMTP sending failed: ${error.message || 'Unknown SMTP error'}`)
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { orderData }: { orderData: OrderData } = await req.json()

    console.log('🔍 Received order data:', JSON.stringify(orderData, null, 2))
    
    // Validate required order data with detailed logging
    
    // Validate required order data with detailed logging
    if (!orderData || !orderData.orderId || !orderData.customerEmail) {
      console.error('❌ Missing required order data', {
        hasOrderData: !!orderData,
        hasOrderId: !!orderData?.orderId,
        hasCustomerEmail: !!orderData?.customerEmail
      })
      console.error('❌ Missing required order data', {
        hasOrderData: !!orderData,
        hasOrderId: !!orderData?.orderId,
        hasCustomerEmail: !!orderData?.customerEmail
      })
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Invalid order data',
          message: 'Missing required order information'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        },
      )
    }

    // Email configuration
    const GMAIL_USERNAME = Deno.env.get('GMAIL_USERNAME')
    const GMAIL_APP_PASSWORD = Deno.env.get('GMAIL_APP_PASSWORD')
    const ADMIN_EMAIL = 'atomrahomeromania@gmail.com'

    console.log('=== EMAIL SYSTEM STATUS ===')
    console.log('Gmail Username:', GMAIL_USERNAME || 'NOT SET')
    console.log('Gmail Password:', GMAIL_APP_PASSWORD ? 'CONFIGURED' : 'NOT SET')
    console.log('Admin Email:', ADMIN_EMAIL)
    console.log('Order ID:', orderData.orderId)
    console.log('Customer Email:', orderData.customerEmail)

    // Check if Gmail credentials are configured
    if (!GMAIL_USERNAME || !GMAIL_APP_PASSWORD) {
      console.error('❌ Gmail credentials not configured')
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email service not configured',
          message: 'Gmail SMTP credentials are not set up. Please configure GMAIL_USERNAME and GMAIL_APP_PASSWORD in Supabase environment variables.',
          debug: {
            hasUsername: !!GMAIL_USERNAME,
            hasPassword: !!GMAIL_APP_PASSWORD,
            orderId: orderData.orderId
          }
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 503, // Service Unavailable
        },
      )
    }

    // Initialize Supabase client for logging
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Supabase URL or Service Role Key not configured for email logging');
      // Proceed without logging if credentials are missing, but log the issue
    }

    const supabaseForLogging = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

    // Helper function to record email attempt
    const recordEmailAttempt = async (recipient: string, subject: string, status: string, errorMessage?: string, smtpResponse?: string) => {
      if (supabaseForLogging) {
        try {
          const { error } = await supabaseForLogging.rpc('record_email_attempt', {
            p_order_id: orderData.orderId,
            p_recipient: recipient,
            p_subject: subject,
            p_status: status,
            p_error_message: errorMessage,
            p_smtp_response: smtpResponse
          });
          if (error) console.error('Error recording email attempt:', error);
        } catch (e) {
          console.error('Error calling record_email_attempt RPC:', e);
        }
      }
    };

    // Helper function to update order email status
    const updateOrderEmailStatus = async (emailsSent: boolean, emailError?: string) => {
      if (supabaseForLogging) {
        try {
          const { error } = await supabaseForLogging.rpc('update_order_email_status', {
            p_order_id: orderData.orderId,
            p_emails_sent: emailsSent,
            p_email_error: emailError
          });
          if (error) console.error('Error updating order email status:', error);
        } catch (e) {
          console.error('Error calling update_order_email_status RPC:', e);
        }
      }
    };

    let customerEmailSuccess = false;
    let adminEmailSuccess = false;
    let overallEmailError: string | undefined;
    // Customer confirmation email HTML
    const customerEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 0.5px; }
            .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; font-weight: 300; }
            .content { padding: 40px 30px; }
            .greeting { font-size: 18px; color: #1e293b; margin-bottom: 20px; font-weight: 300; }
            .order-details { background: #f1f5f9; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 4px solid #10b981; }
            .order-details h2 { margin: 0 0 15px 0; color: #1e293b; font-size: 20px; font-weight: 400; }
            .detail-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
            .detail-label { font-weight: 500; color: #475569; }
            .detail-value { color: #1e293b; }
            .payment-method { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: 500; font-size: 14px; }
            .cod { background: #dcfce7; color: #166534; }
            .card { background: #dbeafe; color: #1e40af; }
            .items-list { background: #ffffff; padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #e2e8f0; }
            .items-list h2 { margin: 0 0 20px 0; color: #1e293b; font-size: 20px; font-weight: 400; }
            .item { background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 12px; border-left: 3px solid #3b82f6; }
            .item:last-child { margin-bottom: 0; }
            .item-name { font-weight: 500; color: #1e293b; margin-bottom: 5px; }
            .item-details { font-size: 14px; color: #64748b; }
            .total { font-size: 28px; font-weight: 300; color: #1e293b; text-align: center; background: #ecfdf5; padding: 20px; border-radius: 12px; margin: 25px 0; border: 2px solid #10b981; }
            .next-steps { background: #e0f2fe; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 4px solid #0ea5e9; }
            .next-steps h3 { margin: 0 0 15px 0; color: #0c4a6e; font-size: 18px; font-weight: 500; }
            .next-steps ul { margin: 0; padding-left: 20px; }
            .next-steps li { margin-bottom: 8px; color: #0c4a6e; }
            .footer { text-align: center; padding: 30px; background: #f8fafc; color: #64748b; font-size: 14px; }
            .footer strong { color: #1e293b; }
            .contact-info { margin-top: 15px; }
            .contact-info p { margin: 5px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>✅ Comandă Confirmată!</h1>
                <p>Atomra Home România</p>
            </div>
            
            <div class="content">
                <p class="greeting">Dragă ${orderData.customerName},</p>
                <p>Mulțumim pentru comanda ta! Am primit cu succes comanda și o vom procesa în cel mai scurt timp.</p>

                <div class="order-details">
                    <h2>📋 Detalii Comandă</h2>
                    <div class="detail-row">
                        <span class="detail-label">Numărul comenzii:</span>
                        <span class="detail-value"><strong>#${orderData.orderId}</strong></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Data comenzii:</span>
                        <span class="detail-value">${new Date(orderData.orderDate).toLocaleString('ro-RO')}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Metoda de plată:</span>
                        <span class="detail-value">
                            <span class="payment-method ${orderData.paymentMethod === 'cod' ? 'cod' : 'card'}">
                                ${orderData.paymentMethod === 'cod' ? '💰 Plată la livrare (Ramburs)' : '💳 Plată cu cardul'}
                            </span>
                        </span>
                    </div>
                </div>

                <div class="items-list">
                    <h2>🛍️ Produse Comandate</h2>
                    ${orderData.items.map(item => `
                        <div class="item">
                            <div class="item-name">${item.name}</div>
                            <div class="item-details">Cantitate: ${item.quantity} | Preț: ${item.price}</div>
                        </div>
                    `).join('')}
                </div>

                <div class="total">
                    💰 TOTAL: ${orderData.total} Lei
                </div>

                <div class="next-steps">
                    <h3>📦 Ce urmează?</h3>
                    <ul>
                        <li>Vei primi un SMS de confirmare în următoarele ore</li>
                        <li>Comanda va fi pregătită pentru expediere în 1-2 zile lucrătoare</li>
                        <li>Vei primi codul de tracking pentru urmărirea coletului</li>
                        ${orderData.paymentMethod === 'cod' ? '<li>Plata se va face la primirea coletului</li>' : '<li>Plata a fost procesată cu succes</li>'}
                    </ul>
                </div>
            </div>

            <div class="footer">
                <p><strong>Mulțumim că ai ales Atomra Home România!</strong></p>
                <div class="contact-info">
                    <p>📧 ${GMAIL_USERNAME}</p>
                    <p>🌐 atomra-home-romania.com</p>
                    <p>Pentru întrebări, nu ezita să ne contactezi!</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `

    // Admin notification email HTML
    const adminEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%); color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 400; }
            .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
            .content { padding: 40px 30px; }
            .urgent { background: #fef3c7; border: 2px solid #f59e0b; padding: 20px; border-radius: 12px; margin: 25px 0; text-align: center; }
            .urgent strong { color: #92400e; font-size: 16px; }
            .order-details { background: #f1f5f9; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 4px solid #dc2626; }
            .customer-info { background: #f1f5f9; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 4px solid #3b82f6; }
            .section-title { margin: 0 0 15px 0; color: #1e293b; font-size: 20px; font-weight: 500; }
            .detail-row { margin-bottom: 10px; }
            .detail-label { font-weight: 500; color: #475569; }
            .detail-value { color: #1e293b; margin-left: 10px; }
            .items-list { background: #ffffff; padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #e2e8f0; }
            .item { background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 12px; }
            .item:last-child { margin-bottom: 0; }
            .total { font-size: 28px; font-weight: 400; color: #1e293b; text-align: center; background: #fef3c7; padding: 20px; border-radius: 12px; margin: 25px 0; border: 2px solid #f59e0b; }
            .action-steps { background: #e0f2fe; padding: 25px; border-radius: 12px; margin: 25px 0; }
            .action-steps h3 { margin: 0 0 15px 0; color: #0c4a6e; font-size: 18px; font-weight: 500; }
            .action-steps ol { margin: 0; padding-left: 20px; }
            .action-steps li { margin-bottom: 8px; color: #0c4a6e; }
            .footer { text-align: center; padding: 30px; background: #f8fafc; color: #64748b; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🚨 COMANDĂ NOUĂ PRIMITĂ!</h1>
                <p>Atomra Home România - Admin Panel</p>
            </div>
            
            <div class="content">
                <div class="urgent">
                    <strong>⚡ ACȚIUNE NECESARĂ:</strong> O comandă nouă a fost plasată și necesită procesare imediată!
                </div>

                <div class="order-details">
                    <h2 class="section-title">📋 Detalii Comandă</h2>
                    <div class="detail-row">
                        <span class="detail-label">Numărul comenzii:</span>
                        <span class="detail-value"><strong>#${orderData.orderId}</strong></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Data și ora:</span>
                        <span class="detail-value">${new Date(orderData.orderDate).toLocaleString('ro-RO')}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Metoda de plată:</span>
                        <span class="detail-value">${orderData.paymentMethod === 'cod' ? '💰 Plată la livrare (Ramburs)' : '💳 Plată cu cardul'}</span>
                    </div>
                </div>

                <div class="customer-info">
                    <h2 class="section-title">👤 Informații Client</h2>
                    <div class="detail-row">
                        <span class="detail-label">Nume:</span>
                        <span class="detail-value">${orderData.customerName}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value"><a href="mailto:${orderData.customerEmail}">${orderData.customerEmail}</a></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Telefon:</span>
                        <span class="detail-value"><a href="tel:${orderData.customerPhone}">${orderData.customerPhone}</a></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Adresa de livrare:</span>
                        <span class="detail-value">${orderData.customerAddress}</span>
                    </div>
                </div>

                <div class="items-list">
                    <h2 class="section-title">🛍️ Produse Comandate</h2>
                    ${orderData.items.map(item => `
                        <div class="item">
                            <strong>${item.name}</strong><br>
                            Cantitate: ${item.quantity} | Preț: ${item.price}
                        </div>
                    `).join('')}
                </div>

                <div class="total">
                    💰 TOTAL COMANDĂ: ${orderData.total} Lei
                </div>

                <div class="action-steps">
                    <h3>🚀 Următorii pași:</h3>
                    <ol>
                        <li>Confirmă comanda în sistemul de management</li>
                        <li>Contactează clientul pentru confirmare (dacă este necesar)</li>
                        <li>Pregătește produsele pentru expediere</li>
                        <li>Programează livrarea</li>
                        <li>Trimite codul de tracking clientului</li>
                    </ol>
                </div>
            </div>

            <div class="footer">
                <p>📧 Email generat automat de sistemul Atomra Home România</p>
                <p>🕐 ${new Date().toLocaleString('ro-RO')}</p>
            </div>
        </div>
    </body>
    </html>
    `

    try {
      console.log('🚀 Attempting to send emails via direct SMTP...')

      // Send customer confirmation email
      try {
        const customerResult = await sendEmail(
          orderData.customerEmail,
          `✅ Comanda #${orderData.orderId} confirmată - ${orderData.total} Lei`,
          customerEmailHtml,
          `Atomra Home România <${GMAIL_USERNAME}>`,
          GMAIL_USERNAME,
          GMAIL_APP_PASSWORD
        );
        console.log('✅ Customer email sent successfully:', customerResult);
        await recordEmailAttempt(orderData.customerEmail, customerResult.subject, 'success', undefined, JSON.stringify(customerResult));
        customerEmailSuccess = true;
      } catch (custEmailError: any) {
        console.error('❌ Failed to send customer email:', custEmailError);
        await recordEmailAttempt(orderData.customerEmail, `✅ Comanda #${orderData.orderId} confirmată`, 'error', custEmailError.message, custEmailError.stack);
        overallEmailError = custEmailError.message;
      }

      // Send admin notification email
      try {
        const adminResult = await sendEmail(
          ADMIN_EMAIL,
          `🚨 COMANDĂ NOUĂ #${orderData.orderId} - ${orderData.total} Lei`,
          adminEmailHtml,
          `Sistem Atomra <${GMAIL_USERNAME}>`,
          GMAIL_USERNAME,
          GMAIL_APP_PASSWORD
        );
        console.log('✅ Admin email sent successfully:', adminResult);
        await recordEmailAttempt(ADMIN_EMAIL, adminResult.subject, 'success', undefined, JSON.stringify(adminResult));
        adminEmailSuccess = true;
      } catch (admEmailError: any) {
        console.error('❌ Failed to send admin email:', admEmailError);
        await recordEmailAttempt(ADMIN_EMAIL, `🚨 COMANDĂ NOUĂ #${orderData.orderId}`, 'error', admEmailError.message, admEmailError.stack);
        if (!overallEmailError) overallEmailError = admEmailError.message; // Capture first error
      }
      
      // Update order email status in the orders table
      await updateOrderEmailStatus(customerEmailSuccess && adminEmailSuccess, overallEmailError);

      return new Response(
        JSON.stringify({
          success: customerEmailSuccess && adminEmailSuccess,
          message: customerEmailSuccess && adminEmailSuccess ? 'Order emails sent successfully' : 'Some emails failed to send',
          customerEmailStatus: customerEmailSuccess ? 'sent' : 'failed',
          adminEmailStatus: adminEmailSuccess ? 'sent' : 'failed',
          error: overallEmailError,
          debug: {
            gmailConfigured: !!(GMAIL_USERNAME && GMAIL_APP_PASSWORD),
            orderId: orderData.orderId,
            customerName: orderData.customerName,
            paymentMethod: orderData.paymentMethod,
            total: orderData.total,
            timestamp: new Date().toISOString(),
            mode: 'DIRECT_SMTP'
          }
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: (customerEmailSuccess && adminEmailSuccess) ? 200 : 500, // Return 500 if any email failed
        },
      )

    } catch (emailError) {
      console.error('❌ Failed to send emails:', emailError)
      await updateOrderEmailStatus(false, emailError.message); // Update order status with overall failure
      
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Email sending failed',
          message: emailError.message || 'Unknown email error occurred',
          debug: {
            orderId: orderData.orderId,
            hasCredentials: !!(GMAIL_USERNAME && GMAIL_APP_PASSWORD),
            errorType: emailError.name || 'Unknown',
            timestamp: new Date().toISOString(),
            mode: 'DIRECT_SMTP_FAILED'
          }
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        },
      )
    }

  } catch (error) {
    console.error('❌ Error processing order emails request:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'Request processing failed',
        message: error.message || 'Unknown error occurred',
        debug: {
          errorType: error.name || 'Unknown',
          timestamp: new Date().toISOString(),
          mode: 'REQUEST_FAILED'
        }
      }),
      {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})