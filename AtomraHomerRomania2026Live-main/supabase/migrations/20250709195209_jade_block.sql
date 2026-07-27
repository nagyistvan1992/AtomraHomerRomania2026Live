/*
  # Email Debugging and Notification System Setup

  1. Changes
    - Add logging table for email delivery attempts
    - Track successful and failed emails
    - Add additional error information for troubleshooting
    - Add helper functions for error reporting

  2. Features
    - Comprehensive email delivery tracking
    - Detailed error reporting
    - Status tracking for all communication attempts
    - Integration with existing order system
*/

-- Create email_logs table if it doesn't exist
CREATE TABLE IF NOT EXISTS email_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id text REFERENCES orders(order_number),
  recipient text NOT NULL,
  subject text NOT NULL, 
  status text NOT NULL CHECK (status IN ('success', 'error', 'retry')),
  error_message text,
  smtp_response text,
  attempt_count integer DEFAULT 1,
  delivery_time timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_email_logs_order_id ON email_logs(order_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_recipient ON email_logs(recipient);
CREATE INDEX IF NOT EXISTS idx_email_logs_created_at ON email_logs(created_at);

-- Enable RLS on the email_logs table
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users to view logs
CREATE POLICY "Authenticated users can view email logs"
  ON email_logs
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy for service role to manage logs
CREATE POLICY "Service role can manage email logs"
  ON email_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Function to record email attempts
CREATE OR REPLACE FUNCTION record_email_attempt(
  p_order_id text,
  p_recipient text,
  p_subject text,
  p_status text,
  p_error_message text DEFAULT NULL,
  p_smtp_response text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
AS $$
DECLARE
  v_id uuid;
  v_attempt_count integer;
BEGIN
  -- Check if we already have a log for this order and recipient
  SELECT id, attempt_count 
  INTO v_id, v_attempt_count
  FROM email_logs
  WHERE order_id = p_order_id AND recipient = p_recipient
  ORDER BY created_at DESC
  LIMIT 1;
  
  IF v_id IS NOT NULL THEN
    -- Update existing record
    UPDATE email_logs
    SET 
      status = p_status,
      error_message = p_error_message,
      smtp_response = p_smtp_response,
      attempt_count = v_attempt_count + 1,
      delivery_time = CASE WHEN p_status = 'success' THEN now() ELSE NULL END
    WHERE id = v_id
    RETURNING id INTO v_id;
  ELSE
    -- Create new record
    INSERT INTO email_logs (
      order_id, recipient, subject, status, 
      error_message, smtp_response, 
      delivery_time
    )
    VALUES (
      p_order_id, p_recipient, p_subject, p_status, 
      p_error_message, p_smtp_response,
      CASE WHEN p_status = 'success' THEN now() ELSE NULL END
    )
    RETURNING id INTO v_id;
  END IF;
  
  RETURN v_id;
END;
$$;

-- Add column to orders table to track email status if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'emails_sent'
  ) THEN
    ALTER TABLE orders ADD COLUMN emails_sent boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'orders' AND column_name = 'email_error'
  ) THEN
    ALTER TABLE orders ADD COLUMN email_error text;
  END IF;
END $$;

-- Update order status based on email delivery
CREATE OR REPLACE FUNCTION update_order_email_status(
  p_order_id text,
  p_emails_sent boolean,
  p_email_error text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE orders
  SET 
    emails_sent = p_emails_sent,
    email_error = p_email_error
  WHERE order_number = p_order_id;
END;
$$;