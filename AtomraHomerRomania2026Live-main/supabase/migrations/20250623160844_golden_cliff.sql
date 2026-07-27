/*
  # Create Orders Management System

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

  4. Functions
    - Auto-update timestamp function
    - Order number generation function
*/

-- Create orders table
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

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policies for orders
CREATE POLICY "Authenticated users can manage all orders"
  ON orders
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Customers can view their own orders"
  ON orders
  FOR SELECT
  TO public
  USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_payment_method ON orders(payment_method);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_order_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_payment_intent ON orders(stripe_payment_intent_id);

-- Create trigger for updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS text AS $$
DECLARE
  new_order_number text;
  counter integer := 1;
BEGIN
  LOOP
    -- Generate order number: ATM + YYYYMMDD + sequential number
    new_order_number := 'ATM' || to_char(now(), 'YYYYMMDD') || lpad(counter::text, 4, '0');
    
    -- Check if this order number already exists
    IF NOT EXISTS (SELECT 1 FROM orders WHERE order_number = new_order_number) THEN
      RETURN new_order_number;
    END IF;
    
    counter := counter + 1;
    
    -- Safety check to prevent infinite loop
    IF counter > 9999 THEN
      -- If we've exhausted daily numbers, add timestamp
      new_order_number := 'ATM' || to_char(now(), 'YYYYMMDDHH24MISS');
      RETURN new_order_number;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Insert some sample orders for testing
INSERT INTO orders (
  order_number,
  customer_name,
  customer_email,
  customer_phone,
  customer_address,
  customer_city,
  customer_postal_code,
  items,
  subtotal,
  shipping_cost,
  total_amount,
  payment_method,
  payment_status,
  order_status,
  notes
) VALUES 
(
  generate_order_number(),
  'Maria Popescu',
  'maria.popescu@email.com',
  '+40721234567',
  'Strada Florilor nr. 15, bl. A2, sc. 1, ap. 5',
  'București',
  '010101',
  '[
    {
      "id": 1,
      "name": "Ceara de nisip \"Granule Box\" 750g + 10 fitile",
      "quantity": 1,
      "price": "98.00 Lei",
      "category": "Home Collection"
    }
  ]'::jsonb,
  98.00,
  0.00,
  98.00,
  'cod',
  'pending',
  'confirmed',
  'Client a solicitat livrare între 14:00-18:00'
),
(
  generate_order_number(),
  'Alexandru Ionescu',
  'alex.ionescu@email.com',
  '+40731234567',
  'Bulevardul Unirii nr. 45, et. 3',
  'Cluj-Napoca',
  '400001',
  '[
    {
      "id": 2,
      "name": "Lumanare Perlata Pachet Essenza |150g+3fitile",
      "quantity": 2,
      "price": "39.00 Lei",
      "category": "Home Collection"
    },
    {
      "id": 3,
      "name": "Lumanare Perlata Pachet Splendore | 250g+5fitile",
      "quantity": 1,
      "price": "59.00 Lei",
      "category": "Home Collection"
    }
  ]'::jsonb,
  137.00,
  25.00,
  162.00,
  'card',
  'paid',
  'processing',
  'Plată procesată cu succes prin Stripe'
),
(
  generate_order_number(),
  'Elena Marinescu',
  'elena.marinescu@email.com',
  '+40741234567',
  'Strada Mihai Viteazu nr. 23',
  'Timișoara',
  '300001',
  '[
    {
      "id": 4,
      "name": "Ceara de nisip 4.5 kg + 60fitile cadou",
      "quantity": 1,
      "price": "380.00 Lei",
      "category": "Events Collection"
    }
  ]'::jsonb,
  380.00,
  0.00,
  380.00,
  'cod',
  'pending',
  'pending',
  'Comandă pentru eveniment - nuntă pe 15 iulie'
);