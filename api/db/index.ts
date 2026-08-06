import { Pool as NeonPool } from '@neondatabase/serverless';
import pkg from 'pg';
const { Pool: PgPool } = pkg;

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

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
  // Fallback when database is not yet provisioned
  queryFn = async () => {
    console.warn('[DB WARNING] POSTGRES_URL not configured. Operating with empty fallback.');
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
