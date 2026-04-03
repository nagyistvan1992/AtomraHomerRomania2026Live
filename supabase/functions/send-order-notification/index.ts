const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface OrderNotificationData {
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

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { orderData }: { orderData: OrderNotificationData } = await req.json()

    // Email configuration
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const ADMIN_EMAIL = 'atomrahomeromania@gmail.com'

    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured')
      
      // Return success but log the issue - this prevents the frontend from failing
      // while still allowing the order to be processed
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Order processed successfully (email notification skipped - configuration needed)',
          warning: 'Email notification not sent - RESEND_API_KEY not configured'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

    // Format order items for email
    const itemsList = orderData.items.map(item => 
      `• ${item.name} - Cantitate: ${item.quantity} - Preț: ${item.price}`
    ).join('\n')

    // Create email content
    const emailSubject = `🔔 Comandă Nouă #${orderData.orderId} - ${orderData.total} Lei`
    
    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #1e293b, #334155); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }
            .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
            .customer-info { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6; }
            .items-list { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .total { font-size: 24px; font-weight: bold; color: #1e293b; text-align: center; background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .payment-method { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; }
            .cod { background: #dcfce7; color: #166534; }
            .card { background: #dbeafe; color: #1e40af; }
            .urgent { background: #fef3c7; border: 2px solid #f59e0b; padding: 15px; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎉 COMANDĂ NOUĂ PRIMITĂ!</h1>
                <p>Atomra Home România</p>
            </div>
            
            <div class="content">
                <div class="urgent">
                    <strong>⚡ ACȚIUNE NECESARĂ:</strong> O comandă nouă a fost plasată și necesită procesare!
                </div>

                <div class="order-details">
                    <h2>📋 Detalii Comandă</h2>
                    <p><strong>Numărul comenzii:</strong> #${orderData.orderId}</p>
                    <p><strong>Data și ora:</strong> ${new Date(orderData.orderDate).toLocaleString('ro-RO')}</p>
                    <p><strong>Metoda de plată:</strong> 
                        <span class="payment-method ${orderData.paymentMethod === 'cod' ? 'cod' : 'card'}">
                            ${orderData.paymentMethod === 'cod' ? '💰 Plată la livrare (Ramburs)' : '💳 Plată cu cardul'}
                        </span>
                    </p>
                </div>

                <div class="customer-info">
                    <h2>👤 Informații Client</h2>
                    <p><strong>Nume:</strong> ${orderData.customerName}</p>
                    <p><strong>Email:</strong> <a href="mailto:${orderData.customerEmail}">${orderData.customerEmail}</a></p>
                    <p><strong>Telefon:</strong> <a href="tel:${orderData.customerPhone}">${orderData.customerPhone}</a></p>
                    <p><strong>Adresa de livrare:</strong><br>${orderData.customerAddress}</p>
                </div>

                <div class="items-list">
                    <h2>🛍️ Produse Comandate</h2>
                    <div style="font-family: monospace; background: #f1f5f9; padding: 15px; border-radius: 5px;">
                        ${orderData.items.map(item => `
                            <div style="margin-bottom: 10px; padding: 10px; background: white; border-radius: 5px;">
                                <strong>${item.name}</strong><br>
                                Cantitate: ${item.quantity} | Preț: ${item.price}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="total">
                    💰 TOTAL COMANDĂ: ${orderData.total} Lei
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <p><strong>🚀 Următorii pași:</strong></p>
                    <ol style="text-align: left; display: inline-block;">
                        <li>Confirmă comanda în sistemul de management</li>
                        <li>Pregătește produsele pentru expediere</li>
                        <li>Contactează clientul pentru confirmare (dacă este necesar)</li>
                        <li>Programează livrarea</li>
                    </ol>
                </div>

                <div class="footer">
                    <p>📧 Email generat automat de sistemul Atomra Home România</p>
                    <p>🕐 ${new Date().toLocaleString('ro-RO')}</p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `

    const emailText = `
🔔 COMANDĂ NOUĂ PRIMITĂ - Atomra Home România

📋 DETALII COMANDĂ:
• Numărul comenzii: #${orderData.orderId}
• Data și ora: ${new Date(orderData.orderDate).toLocaleString('ro-RO')}
• Metoda de plată: ${orderData.paymentMethod === 'cod' ? 'Plată la livrare (Ramburs)' : 'Plată cu cardul'}

👤 INFORMAȚII CLIENT:
• Nume: ${orderData.customerName}
• Email: ${orderData.customerEmail}
• Telefon: ${orderData.customerPhone}
• Adresa: ${orderData.customerAddress}

🛍️ PRODUSE COMANDATE:
${itemsList}

💰 TOTAL COMANDĂ: ${orderData.total} Lei

🚀 URMĂTORII PAȘI:
1. Confirmă comanda în sistemul de management
2. Pregătește produsele pentru expediere
3. Contactează clientul pentru confirmare (dacă este necesar)
4. Programează livrarea

📧 Email generat automat de sistemul Atomra Home România
🕐 ${new Date().toLocaleString('ro-RO')}
    `

    // Send email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Atomra Home România <noreply@atomra-home-romania.com>',
        to: [ADMIN_EMAIL],
        subject: emailSubject,
        html: emailHtml,
        text: emailText,
      }),
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text()
      console.error('Failed to send email:', errorData)
      
      // Return success but with warning - don't fail the entire order process
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Order processed successfully (email notification failed)',
          warning: `Email notification failed: ${errorData}`
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

    const emailResult = await emailResponse.json()

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Order notification sent successfully',
        emailId: emailResult.id 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error processing order notification:', error)
    
    // Return success with warning instead of failing - this prevents the order from failing
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Order processed successfully (notification service unavailable)',
        warning: `Notification service error: ${error.message}`
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  }
})