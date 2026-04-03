/*
  # Set Admin Credentials

  1. Changes
    - Create a new user with the specified credentials
    - Add the user to the admin_users table
    - Set up proper authentication and authorization

  2. Credentials
    - Username: Nagy
    - Password: Istvan1992
    - Role: admin
*/

-- First, create the admin user in auth.users
-- Note: In a real Supabase project, this would be done through the Auth API
-- For this migration, we'll insert directly into the auth tables

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