/*
  # Create Order Management System

  1. New Tables
    - `orders`
      - `id` (uuid, primary key)
      - `order_number` (text, unique order identifier)
      - `customer_name` (text, full customer name)
      - `customer_email` (text, customer email)
      - `customer_phone` (text, customer phone)
      - `customer_address` (text, full delivery address)
      - `customer_city` (text, delivery city)
      - `customer_postal_code` (text, postal code)
      - `items` (jsonb, array of ordered items)
      - `subtotal` (decimal, order subtotal)
      - `shipping_cost` (decimal, shipping cost)
      - `total_amount` (decimal, total order amount)
      - `payment_method` (text, 'cod' or 'card')
      - `payment_status` (text, payment status)
      - `order_status` (text, order fulfillment status)
      - `notes` (text, additional notes)
      - `stripe_payment_intent_id` (text, for card payments)
      - `tracking_number` (text, shipping tracking)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on orders table
    - Add policies for authenticated admin access
    - Add policies for customers to view their own orders

  3. Indexes
    - Add indexes for common queries (order_number, email, status, etc.)
*/

-- Create orders table if it doesn't exist
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number text UNIQUE NOT NULL,
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  customer_address text NOT NULL,
  customer_city text NOT NULL,
  customer_postal_code text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal decimal(10,2) NOT NULL DEFAULT 0,
  shipping_cost decimal(10,2) NOT NULL DEFAULT 0,
  total_amount decimal(10,2) NOT NULL DEFAULT 0,
  payment_method text NOT NULL CHECK (payment_method IN ('cod', 'card')),
  payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  order_status text NOT NULL DEFAULT 'pending' CHECK (order_status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  notes text,
  stripe_payment_intent_id text,
  tracking_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS if not already enabled
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'orders' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policies for orders
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'orders' 
    AND policyname = 'Authenticated users can manage all orders'
  ) THEN
    CREATE POLICY "Authenticated users can manage all orders"
      ON orders
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'orders' 
    AND policyname = 'Customers can view their own orders'
  ) THEN
    CREATE POLICY "Customers can view their own orders"
      ON orders
      FOR SELECT
      TO public
      USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email');
  END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_payment_method ON orders(payment_method);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_order_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_payment_intent ON orders(stripe_payment_intent_id);

-- Create trigger for updated_at
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_orders_updated_at'
  ) THEN
    CREATE TRIGGER update_orders_updated_at
      BEFORE UPDATE ON orders
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;