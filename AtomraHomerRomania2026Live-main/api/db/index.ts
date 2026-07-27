import { pool } from '@neondatabase/serverless';
import { Pool } from 'pg';

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

// Use Neon serverless driver if connection string is provided, or standard PG Pool as fallback
let queryFn: (text: string, params?: any[]) => Promise<any>;

if (connectionString && (connectionString.includes('neon.tech') || connectionString.includes('vercel-storage.com'))) {
  const neonPool = new pool({ connectionString });
  queryFn = async (text: string, params?: any[]) => {
    return await neonPool.query(text, params);
  };
} else if (connectionString) {
  const pgPool = new Pool({ connectionString });
  queryFn = async (text: string, params?: any[]) => {
    return await pgPool.query(text, params);
  };
} else {
  // In-memory / Mock DB fallback when database is not yet provisioned on Vercel
  queryFn = async (text: string, params?: any[]) => {
    console.warn('[DB WARNING] POSTGRES_URL not configured. Operating with local fallback.');
    return { rows: [], rowCount: 0 };
  };
}

export async function query(text: string, params?: any[]) {
  try {
    return await queryFn(text, params);
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}
