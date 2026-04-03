/*
  # Add points column to users table

  1. Changes
    - Add `points` column to `users` table
      - `points` (integer, default 0) - stores user loyalty points

  2. Security
    - No changes to existing RLS policies needed
    - Points column will inherit existing user access controls
*/

-- Add points column to users table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'points'
  ) THEN
    ALTER TABLE users ADD COLUMN points integer DEFAULT 0;
  END IF;
END $$;