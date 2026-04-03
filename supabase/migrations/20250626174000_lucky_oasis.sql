-- Create the admin user with the specified credentials
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Check if user already exists
  SELECT id INTO new_user_id FROM auth.users WHERE email = 'atomrahomeromania@gmail.com';
  
  -- If user doesn't exist, create it
  IF new_user_id IS NULL THEN
    -- Insert into auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'atomrahomeromania@gmail.com',
      crypt('Istvan1992', gen_salt('bf')),
      now(),
      NULL,
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Atomra Admin"}',
      now(),
      now(),
      '',
      '',
      '',
      ''
    )
    RETURNING id INTO new_user_id;
    
    -- Add user to admin_users table
    INSERT INTO admin_users (user_id, role)
    VALUES (new_user_id, 'admin');
    
    -- Add user to users table for profile data
    INSERT INTO users (id, email, first_name, last_name)
    VALUES (new_user_id, 'atomrahomeromania@gmail.com', 'Atomra', 'Admin');
    
    RAISE NOTICE 'Created new admin user with ID: %', new_user_id;
  ELSE
    -- Update existing user's password
    UPDATE auth.users
    SET encrypted_password = crypt('Istvan1992', gen_salt('bf')),
        email_confirmed_at = now(),
        updated_at = now()
    WHERE id = new_user_id;
    
    -- Ensure user is in admin_users table
    INSERT INTO admin_users (user_id, role)
    VALUES (new_user_id, 'admin')
    ON CONFLICT (user_id) DO NOTHING;
    
    -- Ensure user is in users table
    INSERT INTO users (id, email, first_name, last_name)
    VALUES (new_user_id, 'atomrahomeromania@gmail.com', 'Atomra', 'Admin')
    ON CONFLICT (id) DO UPDATE SET
      first_name = 'Atomra',
      last_name = 'Admin',
      updated_at = now();
    
    RAISE NOTICE 'Updated existing admin user with ID: %', new_user_id;
  END IF;
END
$$;

-- Grant admin role additional permissions
DO $$
BEGIN
  -- Ensure admin_users has proper RLS policies
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'admin_users' 
    AND policyname = 'Only admins can manage admin users'
  ) THEN
    DROP POLICY "Only admins can manage admin users" ON admin_users;
  END IF;
  
  CREATE POLICY "Only admins can manage admin users"
    ON admin_users
    FOR ALL
    TO authenticated
    USING (user_id IN (
      SELECT admin_users.user_id 
      FROM admin_users 
      WHERE admin_users.user_id = auth.uid()
    ))
    WITH CHECK (user_id IN (
      SELECT admin_users.user_id 
      FROM admin_users 
      WHERE admin_users.user_id = auth.uid()
    ));
END
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM admin_users 
    WHERE user_id = auth.uid()
  );
$$;

-- Create function to get admin role
CREATE OR REPLACE FUNCTION admin_role()
RETURNS text
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT role
  FROM admin_users
  WHERE user_id = auth.uid();
$$;