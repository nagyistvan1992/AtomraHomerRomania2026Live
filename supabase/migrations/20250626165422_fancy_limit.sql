/*
  # Setup Admin User System

  1. Database Setup
    - Ensure admin_users table exists with proper structure
    - Add RLS policies for admin access
    - Create function to check admin status

  2. Security
    - Enable RLS on admin_users table
    - Add policies for admin user management
    - Create helper function for admin checks

  3. Instructions
    - This migration prepares the database for admin users
    - Manual user creation still required in Supabase Auth dashboard
*/

-- Ensure admin_users table exists with proper structure
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create unique index on user_id if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'admin_users' 
    AND indexname = 'admin_users_user_id_key'
  ) THEN
    CREATE UNIQUE INDEX admin_users_user_id_key ON admin_users(user_id);
  END IF;
END $$;

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Only admins can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Only admins can manage admin users" ON admin_users;

-- Create RLS policies
CREATE POLICY "Only admins can view admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (
    user_id IN (
      SELECT admin_users.user_id 
      FROM admin_users 
      WHERE admin_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Only admins can manage admin users"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (
    user_id IN (
      SELECT admin_users.user_id 
      FROM admin_users 
      WHERE admin_users.user_id = auth.uid()
    )
  )
  WITH CHECK (
    user_id IN (
      SELECT admin_users.user_id 
      FROM admin_users 
      WHERE admin_users.user_id = auth.uid()
    )
  );

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM admin_users 
    WHERE user_id = user_uuid
  );
$$;

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();