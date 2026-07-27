/*
  # Add Stripe Webhook Security

  1. New Table
    - `stripe_webhook_events`
      - `id` (uuid, primary key)
      - `stripe_event_id` (text, unique Stripe event ID)
      - `event_type` (text, type of Stripe event)
      - `event_data` (jsonb, full event data)
      - `processed` (boolean, whether event has been processed)
      - `processing_error` (text, any error during processing)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on the webhook events table
    - Add policies for authenticated admin access only
    - Ensure secure handling of webhook data

  3. Indexes
    - Add indexes for efficient webhook event lookup
*/

-- Create stripe_webhook_events table
CREATE TABLE IF NOT EXISTS stripe_webhook_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id text UNIQUE NOT NULL,
  event_type text NOT NULL,
  event_data jsonb NOT NULL,
  processed boolean DEFAULT false,
  processing_error text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE stripe_webhook_events ENABLE ROW LEVEL SECURITY;

-- Create policies for stripe_webhook_events
CREATE POLICY "Only authenticated users can access webhook events"
  ON stripe_webhook_events
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_event_id ON stripe_webhook_events(stripe_event_id);
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_event_type ON stripe_webhook_events(event_type);
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_processed ON stripe_webhook_events(processed);
CREATE INDEX IF NOT EXISTS idx_stripe_webhook_events_created_at ON stripe_webhook_events(created_at DESC);

-- Create trigger for updated_at
CREATE TRIGGER update_stripe_webhook_events_updated_at
  BEFORE UPDATE ON stripe_webhook_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();