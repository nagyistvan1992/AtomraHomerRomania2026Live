# Gmail SMTP Email Setup Guide

## 📧 **Gmail SMTP Configuration for Order Confirmations**

This guide will help you set up Gmail SMTP to send order confirmation emails to customers and admin notifications.

### 1. **Enable Gmail App Passwords**

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Navigate to **Security** → **2-Step Verification**
3. Enable 2-Step Verification if not already enabled
4. Go to **Security** → **App passwords**
5. Generate a new app password for "Mail"
6. Copy the 16-character app password (save it securely)

### 2. **Configure Supabase Environment Variables**

In your Supabase project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

```
GMAIL_USERNAME=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
```

**Important:** Use the app password, NOT your regular Gmail password!

### 3. **Email Templates**

The system sends two types of emails:

#### **Customer Confirmation Email**
- Professional order confirmation
- Order details and items
- Payment method information
- Next steps and tracking info
- Company contact information

#### **Admin Notification Email**
- Urgent new order alert
- Complete customer information
- Order details for processing
- Action steps for fulfillment

### 4. **Email Features**

✅ **Professional HTML Templates** - Beautiful, responsive email design
✅ **Romanian Language Support** - Localized content for Romanian customers
✅ **Order Details** - Complete order information and items
✅ **Payment Method Display** - Clear indication of COD vs Card payment
✅ **Customer Information** - Full delivery details for admin
✅ **Action Steps** - Clear next steps for both customer and admin
✅ **Branding** - Consistent with Atomra Home România brand
✅ **Error Handling** - Graceful fallback if email fails

### 5. **Testing the Email System**

1. Place a test order through the website
2. Complete the checkout process
3. Check both customer and admin email addresses
4. Verify email delivery and formatting

### 6. **Email Addresses**

- **Customer emails:** Sent to the email provided during checkout
- **Admin notifications:** Sent to `atomrahomeromania@gmail.com`

### 7. **Security Features**

- Secure SMTP connection to Gmail
- Environment variables for credentials
- Error handling to prevent order failures
- Graceful degradation if email service is unavailable

### 8. **Troubleshooting**

**If emails are not sending:**

1. Verify Gmail app password is correct
2. Check Supabase environment variables
3. Ensure 2-Step Verification is enabled on Gmail
4. Check Supabase function logs for errors

**Common Issues:**

- **Authentication failed:** Check app password
- **Connection timeout:** Verify Gmail SMTP settings
- **Emails in spam:** Add sender to safe list

### 9. **Email Content Customization**

The email templates include:

- **Order confirmation** with professional styling
- **Payment method indicators** (COD vs Card)
- **Next steps** for customer expectations
- **Admin action items** for order processing
- **Company branding** and contact information

### 10. **Production Considerations**

- Monitor email delivery rates
- Set up email bounce handling
- Consider email analytics
- Implement email preferences for customers
- Add unsubscribe functionality if needed

---

**Note:** The email system is designed to be fault-tolerant. If email sending fails, the order will still be processed successfully, ensuring customers don't lose their purchases due to email issues.