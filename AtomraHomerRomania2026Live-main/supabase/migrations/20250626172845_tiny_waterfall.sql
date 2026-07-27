/*
  # Set Up Admin Credentials

  1. New Admin User
    - Create admin user with email: atomrahomeromania@gmail.com
    - Set password: Istvan1992
    - Add to admin_users table with admin role
    - Ensure email is confirmed for immediate login

  2. Security
    - Properly hash password using Supabase's crypt function
    - Create proper user metadata
    - Set up all necessary permissions
*/

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