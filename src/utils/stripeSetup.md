# Stripe Integration Setup Guide

## Setup Instructions

### 1. Get Your Stripe Keys
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Go to your Stripe Dashboard
3. Navigate to **Developers** -> **API Keys**
4. Copy your publishable key from the Stripe dashboard
5. Copy your secret key from the Stripe dashboard

### 2. Update Stripe Configuration
Add only your frontend-safe Stripe key to the `.env` file:

```env
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

Do not place `STRIPE_SECRET_KEY` in the frontend `.env` file.

### 3. Supabase Edge Function Setup
The `create-payment-intent` edge function is already set up in this project. To deploy it:

1. Go to your Supabase dashboard
2. Navigate to **Edge Functions**
3. Click **New Function**
4. Name it `create-payment-intent`
5. Upload the function code
6. Add your Stripe secret key as an environment variable:
   - Name: `STRIPE_SECRET_KEY`
   - Value: Your Stripe secret key
7. Add the rest of the required server-side secrets in Supabase:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `GMAIL_USERNAME`
   - `GMAIL_APP_PASSWORD`

### 4. Testing the Integration

Use Stripe's test card numbers:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

For all test cards:
- Any future expiration date
- Any 3-digit CVC
- Any postal code

### 5. Going Live

When you're ready to accept real payments:
1. Complete Stripe account verification
2. Switch to live keys in your environment variables
3. Test with a small real transaction
4. Monitor your Stripe dashboard for successful payments

## Security Best Practices

1. Never expose your Stripe secret key in client-side code
2. Always process payments server-side using Supabase Edge Functions
3. Validate all payment data before processing
4. Use HTTPS for all payment pages
5. Implement proper error handling for payment failures

## Features Included

- Secure card element with Stripe Elements
- Cash on delivery option
- Responsive design for all devices
- Order confirmation and email notifications
- Customer information collection
- Automatic shipping calculation
- Loyalty points integration
- Multi-language support

## Support

For Stripe-specific issues:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com)

For implementation questions, contact your developer team.
