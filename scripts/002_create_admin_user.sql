-- Create specific admin user with provided credentials
-- This script creates the admin user directly in the database

-- First, we need to create the auth user in Supabase auth.users table
-- Note: In production, this would be handled through Supabase Auth API
-- For development, we'll create a placeholder that can be updated when the user signs up

-- Insert into admin_users table (this will be linked to auth user after signup)
INSERT INTO public.admin_users (
  id,
  username,
  role,
  created_at,
  updated_at
) VALUES (
  -- This will be updated with actual auth user ID after signup
  gen_random_uuid(),
  'mubeennasir117',
  'admin',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;

-- Create a function to automatically add admin privileges when the specific user signs up
CREATE OR REPLACE FUNCTION public.handle_admin_user_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the new user has the admin email
  IF NEW.email = 'mubeennasir117@gmail.com' THEN
    -- Insert into admin_users table
    INSERT INTO public.admin_users (id, username, role, created_at, updated_at)
    VALUES (
      NEW.id,
      'mubeennasir117',
      'admin',
      NOW(),
      NOW()
    ) ON CONFLICT (id) DO UPDATE SET
      username = EXCLUDED.username,
      role = EXCLUDED.role,
      updated_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically handle admin user creation
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_admin_user_signup();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.admin_users TO authenticated;
