import { Pool as NeonPool } from '@neondatabase/serverless';
import pkg from 'pg';
const { Pool: PgPool } = pkg;

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL_NON_POOLING;

let queryFn: (text: string, params?: any[]) => Promise<any>;

if (connectionString && (connectionString.includes('neon.tech') || connectionString.includes('vercel-storage.com'))) {
  const neonPool = new NeonPool({ connectionString });
  queryFn = async (text: string, params?: any[]) => {
    return await neonPool.query(text, params);
  };
} else if (connectionString) {
  const pgPool = new PgPool({ connectionString });
  queryFn = async (text: string, params?: any[]) => {
    return await pgPool.query(text, params);
  };
} else {
  // Fallback when database environment variables are not yet configured on Vercel
  queryFn = async () => {
    console.warn('[DB WARNING] POSTGRES_URL / DATABASE_URL not configured. Operating with memory fallback.');
    return { rows: [], rowCount: 0 };
  };
}

export async function query(text: string, params?: any[]) {
  try {
    return await queryFn(text, params);
  } catch (error) {
    console.error('Database query error:', error);
    return { rows: [], rowCount: 0, error };
  }
}

