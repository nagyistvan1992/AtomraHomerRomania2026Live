/*
  # Fix infinite recursion in admin_users RLS policy

  1. Problem
    - The current RLS policy on admin_users table creates infinite recursion
    - Policy tries to check admin status by querying the same table it's protecting

  2. Solution
    - Drop the problematic policies
    - Create simpler, non-recursive policies
    - Allow users to read their own admin status
    - Use service role for admin management operations

  3. Security
    - Users can only see their own admin record
    - Admin operations should use service role key
*/

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Only admins can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Only admins can manage admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can read their own admin status" ON admin_users;

-- Create new, simple policies that don't cause recursion
CREATE POLICY "Users can read their own admin status"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- For admin management operations, use service role key in your application
-- This policy allows service role to manage all admin users
CREATE POLICY "Service role can manage admin users"
  ON admin_users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);