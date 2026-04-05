# Supabase Connection Checklist

This project expects an existing Supabase project that already contains:

- `products`
- `product_categories`
- `orders`
- the email-related SQL objects from `supabase/migrations`
- the Edge Functions inside `supabase/functions`

## 1. Frontend environment variables

Create a local `.env` file based on `.env.example` and fill in:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

These values are used by:

- the local frontend app
- the GitHub Pages build workflow
- Netlify frontend deploys, if you switch to Netlify later

Only `VITE_*` values belong in frontend environment files.
Do not place server-side secrets here.

## 2. GitHub Actions secrets

In GitHub repository settings, add these Actions secrets:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`

The Pages workflow reads these during build.

If you deploy on Netlify instead of GitHub Pages, use the exact same three
frontend variables in Netlify environment variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`

## 3. Supabase project secrets for Edge Functions

Set these in your Supabase project because the server-side functions use them:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `GMAIL_USERNAME`
- `GMAIL_APP_PASSWORD`

Optional, only if you use the alternate notification flow:

- `RESEND_API_KEY`

These values must stay server-side only and should be configured in the
Supabase project secrets for Edge Functions, not in the frontend `.env`.

## 4. Deploy schema and functions to your Supabase project

If your current Supabase project does not already contain the same schema and functions as this repo, deploy:

- SQL migrations from `supabase/migrations`
- Edge Functions from `supabase/functions`

## 5. Verify the connection

After setting the variables:

1. Run the app locally
2. Confirm products load from Supabase
3. Confirm checkout writes into `orders`
4. Confirm order emails are sent from the configured Edge Functions
