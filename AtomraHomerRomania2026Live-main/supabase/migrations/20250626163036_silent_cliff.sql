-- Update Pachet Splendore product with working images
UPDATE products 
SET 
  images = '[
    "/Untitled (8).webp",
    "/20241027_114934.webp",
    "/20241027_115048.webp", 
    "/20241027_115201.webp"
  ]'::jsonb,
  updated_at = now()
WHERE slug = 'pachet-splendore-250g';

-- Update Pachet Essenza product with working images
UPDATE products 
SET 
  images = '[
    "/abc3462f-4169-41e2-bec4-63572c2990a5.webp",
    "/20241027_114350.webp",
    "/20241027_114455.webp",
    "/20241027_114631.webp"
  ]'::jsonb,
  updated_at = now()
WHERE slug = 'pachet-essenza-150g';

-- Create admin_users table if it doesn't exist
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) NOT NULL UNIQUE,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS if not already enabled
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'admin_users' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policy only if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'admin_users' 
    AND policyname = 'Only admins can view admin users'
  ) THEN
    CREATE POLICY "Only admins can view admin users"
      ON admin_users
      FOR SELECT
      TO authenticated
      USING (user_id IN (
        SELECT user_id FROM admin_users
      ));
  END IF;
END $$;

-- Create trigger only if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_admin_users_updated_at'
  ) THEN
    CREATE TRIGGER update_admin_users_updated_at
      BEFORE UPDATE ON admin_users
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Create the admin user with the specified credentials
DO $$
DECLARE
  new_user_id uuid;
BEGIN
  -- Check if user already exists
  SELECT id INTO new_user_id FROM auth.users WHERE email = 'nagy@atomra-home-romania.com';
  
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
      'nagy@atomra-home-romania.com',
      crypt('Istvan1992', gen_salt('bf')),
      now(),
      NULL,
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Nagy Istvan"}',
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
  ELSE
    -- Update existing user's password
    UPDATE auth.users
    SET encrypted_password = crypt('Istvan1992', gen_salt('bf')),
        updated_at = now()
    WHERE id = new_user_id;
    
    -- Ensure user is in admin_users table
    INSERT INTO admin_users (user_id, role)
    VALUES (new_user_id, 'admin')
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
END
$$;