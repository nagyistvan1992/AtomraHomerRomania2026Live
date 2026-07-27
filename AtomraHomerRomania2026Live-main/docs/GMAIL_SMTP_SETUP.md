# 📧 Gmail SMTP Setup Guide for Atomra Home România

## **Complete Email System Configuration**

This guide provides step-by-step instructions to set up Gmail SMTP for sending order confirmation emails to customers and admin notifications.

---

## **1. Gmail Account Preparation**

### **Step 1: Enable 2-Factor Authentication**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click **2-Step Verification**
3. Follow the setup process to enable 2FA
4. **Important:** 2FA is required for app passwords

### **Step 2: Generate App Password**
1. In Google Account Security, click **App passwords**
2. Select **Mail** as the app type
3. Generate a new 16-character app password
4. **Save this password securely** - you'll need it for configuration

---

## **2. Supabase Configuration**

### **Environment Variables Setup**
In your Supabase project dashboard:

1. Navigate to **Settings** → **Environment Variables**
2. Add these variables:

```env
GMAIL_USERNAME=your-email@gmail.com
GMAIL_APP_PASSWORD=abcd-efgh-ijkl-mnop
```

**⚠️ Critical:** Use the 16-character app password, NOT your regular Gmail password!

---

## **3. Email System Features**

### **Customer Confirmation Email**
✅ Professional HTML design with Atomra branding  
✅ Complete order details and itemized list  
✅ Payment method indication (COD vs Card)  
✅ Next steps and delivery timeline  
✅ Contact information for support  
✅ Romanian language localization  

### **Admin Notification Email**
🚨 Urgent new order alert styling  
📋 Complete customer information  
📦 Detailed order breakdown  
🚀 Action steps for order fulfillment  
📞 Clickable phone and email links  
⏰ Timestamp and order tracking  

---

## **4. Email Templates Preview**

### **Customer Email Structure:**
```
✅ Comandă Confirmată!
Atomra Home România

Dragă [Customer Name],
Mulțumim pentru comanda ta!

📋 Detalii Comandă
• Numărul comenzii: #ATM20250127001
• Data comenzii: 27 ianuarie 2025
• Metoda de plată: 💰 Plată la livrare

🛍️ Produse Comandate
[Itemized product list]

💰 TOTAL: 149 Lei

📦 Ce urmează?
• SMS de confirmare în următoarele ore
• Pregătire pentru expediere în 1-2 zile
• Cod de tracking pentru urmărire
```

### **Admin Email Structure:**
```
🚨 COMANDĂ NOUĂ PRIMITĂ!
Atomra Home România - Admin Panel

⚡ ACȚIUNE NECESARĂ: Comandă nouă pentru procesare!

📋 Detalii Comandă
👤 Informații Client
🛍️ Produse Comandate
💰 TOTAL COMANDĂ: 149 Lei

🚀 Următorii pași:
1. Confirmă comanda în sistem
2. Contactează clientul
3. Pregătește produsele
4. Programează livrarea
```

---

## **5. Testing the Email System**

### **Test Order Process:**
1. Place a test order on the website
2. Complete checkout with valid email
3. Check both customer and admin inboxes
4. Verify email formatting and content

### **Verification Checklist:**
- [ ] Customer receives confirmation email
- [ ] Admin receives notification email
- [ ] All order details are accurate
- [ ] Payment method is correctly displayed
- [ ] Romanian text displays properly
- [ ] Links and contact info work

---

## **6. Production Deployment**

### **Supabase Edge Function Deployment:**
The email function is automatically deployed with your Supabase project. No manual deployment needed.

### **Environment Variables:**
Ensure these are set in your Supabase project:
- `GMAIL_USERNAME` - Your Gmail address
- `GMAIL_APP_PASSWORD` - 16-character app password

---

## **7. Security & Best Practices**

### **Security Features:**
🔒 Environment variables for credentials  
🛡️ CORS headers for secure requests  
⚠️ Error handling prevents order failures  
📝 Comprehensive logging for debugging  

### **Best Practices:**
- Never commit credentials to code
- Use app passwords, not regular passwords
- Monitor email delivery rates
- Set up email bounce handling
- Consider rate limiting for high volume

---

## **8. Troubleshooting**

### **Common Issues:**

**❌ Authentication Failed**
- Verify app password is correct
- Ensure 2FA is enabled on Gmail account
- Check environment variables in Supabase

**❌ Emails Not Sending**
- Check Supabase function logs
- Verify Gmail SMTP settings
- Test with a simple email first

**❌ Emails in Spam**
- Add sender to safe senders list
- Check email content for spam triggers
- Consider using a dedicated sending domain

**❌ Function Timeout**
- Check network connectivity
- Verify SMTP server availability
- Review function execution logs

---

## **9. Advanced Configuration**

### **Custom Email Templates:**
Modify the HTML templates in `supabase/functions/send-order-emails/index.ts`

### **Additional Recipients:**
Add more admin emails by modifying the recipient list

### **Email Analytics:**
Consider integrating with services like:
- Google Analytics for email tracking
- Mailgun for delivery analytics
- SendGrid for advanced metrics

---

## **10. Support & Maintenance**

### **Monitoring:**
- Check Supabase function logs regularly
- Monitor email delivery success rates
- Set up alerts for failed email sends

### **Updates:**
- Keep email templates updated with branding
- Review and update contact information
- Test email system after any changes

---

**📞 Need Help?**
If you encounter issues with the email setup, check the Supabase function logs first, then verify your Gmail app password configuration.

**🎯 Success Indicator:**
When properly configured, you should see successful email logs in the Supabase function console and receive actual emails in both customer and admin inboxes.