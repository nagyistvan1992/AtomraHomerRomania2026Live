const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface OrderData {
  orderId: string
  orderNumber: string
  customerName: string
  customerEmail: string
  orderStatus: string
  trackingNumber?: string
  items: Array<{
    name: string
    quantity: number
    price: string
  }>
  total: number
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { orderData }: { orderData: OrderData } = await req.json()

    // Validate required order data
    if (!orderData || !orderData.orderId || !orderData.customerEmail || !orderData.orderStatus) {
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

    console.log('=== EMAIL SYSTEM STATUS ===')
    console.log('Gmail Username:', GMAIL_USERNAME || 'NOT SET')
    console.log('Gmail Password:', GMAIL_APP_PASSWORD ? 'CONFIGURED' : 'NOT SET')
    console.log('Order ID:', orderData.orderId)
    console.log('Order Status:', orderData.orderStatus)
    console.log('Customer Email:', orderData.customerEmail)

    // Check if Gmail credentials are configured
    if (!GMAIL_USERNAME || !GMAIL_APP_PASSWORD) {
      console.error('❌ Gmail credentials not configured')
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Email service not configured',
          message: 'Gmail SMTP credentials are not set up. Please configure GMAIL_USERNAME and GMAIL_APP_PASSWORD in Supabase environment variables.'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 503, // Service Unavailable
        },
      )
    }

    // Get status-specific content
    const getStatusContent = (status: string) => {
      switch(status) {
        case 'shipped':
          return {
            subject: `📦 Comanda #${orderData.orderNumber} a fost expediată`,
            title: 'Comanda Ta a Fost Expediată!',
            message: 'Comanda ta a fost expediată și este în drum spre tine.',
            details: `
              <p>Comanda ta a fost predată curierului și este în drum spre tine.</p>
              ${orderData.trackingNumber ? `<p>Număr de tracking: <strong>${orderData.trackingNumber}</strong></p>` : ''}
              <p>Vei primi un SMS de la curier cu detalii despre livrare.</p>
            `,
            color: '#3b82f6' // blue
          }
        case 'delivered':
          return {
            subject: `✅ Comanda #${orderData.orderNumber} a fost livrată`,
            title: 'Comanda Ta a Fost Livrată!',
            message: 'Comanda ta a fost livrată cu succes.',
            details: `
              <p>Sperăm că ești mulțumit de produsele primite.</p>
              <p>Dacă ai întrebări sau nelămuriri, nu ezita să ne contactezi.</p>
            `,
            color: '#10b981' // green
          }
        case 'processing':
          return {
            subject: `🔄 Comanda #${orderData.orderNumber} este în procesare`,
            title: 'Comanda Ta Este în Procesare',
            message: 'Comanda ta este în curs de procesare.',
            details: `
              <p>Echipa noastră pregătește produsele tale cu grijă.</p>
              <p>Vei primi un email când comanda va fi expediată.</p>
            `,
            color: '#8b5cf6' // purple
          }
        case 'confirmed':
          return {
            subject: `✅ Comanda #${orderData.orderNumber} a fost confirmată`,
            title: 'Comanda Ta a Fost Confirmată',
            message: 'Comanda ta a fost confirmată și va fi procesată în curând.',
            details: `
              <p>Mulțumim pentru comanda ta!</p>
              <p>Echipa noastră va începe procesarea comenzii tale în cel mai scurt timp.</p>
            `,
            color: '#f59e0b' // amber
          }
        case 'cancelled':
          return {
            subject: `❌ Comanda #${orderData.orderNumber} a fost anulată`,
            title: 'Comanda Ta a Fost Anulată',
            message: 'Comanda ta a fost anulată.',
            details: `
              <p>Dacă ai întrebări despre anularea comenzii, te rugăm să ne contactezi.</p>
            `,
            color: '#ef4444' // red
          }
        default:
          return {
            subject: `🔔 Actualizare pentru comanda #${orderData.orderNumber}`,
            title: 'Actualizare Comandă',
            message: `Statusul comenzii tale a fost actualizat la: ${orderData.orderStatus}`,
            details: `
              <p>Dacă ai întrebări, te rugăm să ne contactezi.</p>
            `,
            color: '#6b7280' // gray
          }
      }
    }

    const statusContent = getStatusContent(orderData.orderStatus)

    // Customer status update email HTML
    const customerEmailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; background-color: #f8fafc; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background: linear-gradient(135deg, ${statusContent.color} 0%, ${statusContent.color}dd 100%); color: white; padding: 40px 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 300; letter-spacing: 0.5px; }
            .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; font-weight: 300; }
            .content { padding: 40px 30px; }
            .greeting { font-size: 18px; color: #1e293b; margin-bottom: 20px; font-weight: 300; }
            .order-details { background: #f1f5f9; padding: 25px; border-radius: 12px; margin: 25px 0; border-left: 4px solid ${statusContent.color}; }
            .order-details h2 { margin: 0 0 15px 0; color: #1e293b; font-size: 20px; font-weight: 400; }
            .detail-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
            .detail-label { font-weight: 500; color: #475569; }
            .detail-value { color: #1e293b; }
            .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: 500; font-size: 14px; background: ${statusContent.color}20; color: ${statusContent.color}; }
            .items-list { background: #ffffff; padding: 25px; border-radius: 12px; margin: 25px 0; border: 1px solid #e2e8f0; }
            .items-list h2 { margin: 0 0 20px 0; color: #1e293b; font-size: 20px; font-weight: 400; }
            .item { background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 12px; border-left: 3px solid #3b82f6; }
            .item:last-child { margin-bottom: 0; }
            .item-name { font-weight: 500; color: #1e293b; margin-bottom: 5px; }
            .item-details { font-size: 14px; color: #64748b; }
            .total { font-size: 28px; font-weight: 300; color: #1e293b; text-align: center; background: ${statusContent.color}10; padding: 20px; border-radius: 12px; margin: 25px 0; border: 2px solid ${statusContent.color}; }
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
                <h1>${statusContent.title}</h1>
                <p>Atomra Home România</p>
            </div>
            
            <div class="content">
                <p class="greeting">Dragă ${orderData.customerName},</p>
                <p>${statusContent.message}</p>

                <div class="order-details">
                    <h2>📋 Detalii Comandă</h2>
                    <div class="detail-row">
                        <span class="detail-label">Numărul comenzii:</span>
                        <span class="detail-value"><strong>#${orderData.orderNumber}</strong></span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Status comandă:</span>
                        <span class="status-badge">${orderData.orderStatus.charAt(0).toUpperCase() + orderData.orderStatus.slice(1)}</span>
                    </div>
                    ${orderData.trackingNumber ? `
                    <div class="detail-row">
                        <span class="detail-label">Număr de tracking:</span>
                        <span class="detail-value">${orderData.trackingNumber}</span>
                    </div>
                    ` : ''}
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
                    <h3>📦 Informații Suplimentare</h3>
                    <div>${statusContent.details}</div>
                </div>
            </div>

            <div class="footer">
                <p><strong>Mulțumim că ai ales Atomra Home România!</strong></p>
                <div class="contact-info">
                    <p>📧 atomrahomeromania@gmail.com</p>
                    <p>🌐 atomra-home-romania.com</p>
                    <p>Pentru întrebări, nu ezita să ne contactezi!</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `

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
            throw new Error(`EHLO failed: ${response}`)
          }

          // STARTTLS
          response = await sendCommand('STARTTLS\r\n')
          if (!response.startsWith('220')) {
            throw new Error(`STARTTLS failed: ${response}`)
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
            throw new Error(`TLS EHLO failed: ${response}`)
          }

          // AUTH LOGIN
          response = await sendTlsCommand('AUTH LOGIN\r\n')
          if (!response.startsWith('334')) {
            throw new Error(`AUTH LOGIN failed: ${response}`)
          }

          // Send username (base64 encoded)
          const encodedUsername = btoa(username)
          response = await sendTlsCommand(`${encodedUsername}\r\n`)
          if (!response.startsWith('334')) {
            throw new Error(`Username authentication failed: ${response}`)
          }

          // Send password (base64 encoded)
          const encodedPassword = btoa(password)
          response = await sendTlsCommand(`${encodedPassword}\r\n`)
          if (!response.startsWith('235')) {
            throw new Error(`Password authentication failed: ${response}`)
          }

          // MAIL FROM
          response = await sendTlsCommand(`MAIL FROM:<${username}>\r\n`)
          if (!response.startsWith('250')) {
            throw new Error(`MAIL FROM failed: ${response}`)
          }

          // RCPT TO
          response = await sendTlsCommand(`RCPT TO:<${to}>\r\n`)
          if (!response.startsWith('250')) {
            throw new Error(`RCPT TO failed: ${response}`)
          }

          // DATA
          response = await sendTlsCommand('DATA\r\n')
          if (!response.startsWith('354')) {
            throw new Error(`DATA command failed: ${response}`)
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
            throw new Error(`Email sending failed: ${response}`)
          }

          // QUIT
          await sendTlsCommand('QUIT\r\n')
          
          tlsConn.close()
          
          console.log('✅ Email sent successfully via direct SMTP')
          return {
            success: true,
            messageId: `smtp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
            to: to,
            subject: subject,
            method: 'Direct SMTP'
          }

        } catch (smtpError) {
          conn.close()
          throw smtpError
        }

      } catch (error) {
        console.error('Direct SMTP failed:', error)
        throw new Error(`SMTP sending failed: ${error.message}`)
      }
    }

    try {
      console.log('🚀 Attempting to send order status email via direct SMTP...')

      // Send customer status update email
      const customerResult = await sendEmail(
        orderData.customerEmail,
        statusContent.subject,
        customerEmailHtml,
        `Atomra Home România <${GMAIL_USERNAME}>`,
        GMAIL_USERNAME,
        GMAIL_APP_PASSWORD
      )

      console.log('✅ Customer status email sent successfully:', customerResult)

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Order status email sent successfully',
          customerEmail: {
            to: orderData.customerEmail,
            messageId: customerResult.messageId,
            timestamp: customerResult.timestamp,
            method: customerResult.method
          }
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )

    } catch (emailError) {
      console.error('❌ Failed to send status email:', emailError)
      
      return new Response(
        JSON.stringify({ 
          success: false,
          error: 'Email sending failed',
          message: emailError.message || 'Unknown email error occurred'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        },
      )
    }

  } catch (error) {
    console.error('❌ Error processing order status email request:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'Request processing failed',
        message: error.message || 'Unknown error occurred'
      }),
      {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})