/*
  # Add Email Debug Features and Fallback Mechanism

  1. Updates
    - Add additional error logging for email sending
    - Create a fallback mechanism for email delivery
    - Store email attempts in a new table for debugging
    - Improve error messages for better troubleshooting

  2. New Table
    - `email_logs`
      - `id` (uuid, primary key)
      - `recipient` (text, email recipient)
      - `subject` (text, email subject)
      - `status` (text, success/error status)
      - `error_message` (text, detailed error if any)
      - `attempt_count` (integer, number of delivery attempts)
      - `created_at` (timestamp)
*/

-- Create email_logs table for debugging
CREATE TABLE IF NOT EXISTS email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text REFERENCES orders(order_number),
  recipient text NOT NULL,
  subject text NOT NULL,
  status text NOT NULL CHECK (status IN ('success', 'error', 'retry')),
  error_message text,
  attempt_count integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

-- Add index for better lookup performance
CREATE INDEX IF NOT EXISTS idx_email_logs_order_id ON email_logs(order_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_created_at ON email_logs(created_at);

-- Add RLS policies
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read email logs"
  ON email_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- Function to record email attempts
CREATE OR REPLACE FUNCTION record_email_attempt(
  p_order_id text,
  p_recipient text,
  p_subject text,
  p_status text,
  p_error_message text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
AS $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO email_logs (order_id, recipient, subject, status, error_message)
  VALUES (p_order_id, p_recipient, p_subject, p_status, p_error_message)
  RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$;

-- Add a column to orders table to track if emails were sent
ALTER TABLE orders ADD COLUMN IF NOT EXISTS emails_sent boolean DEFAULT false;