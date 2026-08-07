import { Pool as NeonPool } from '@neondatabase/serverless';
import pkg from 'pg';
const { Pool: PgPool } = pkg;

export async function query(text: string, params?: any[]) {
  const connectionString =
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL_NON_POOLING;

  if (!connectionString) {
    console.warn('[DB WARNING] No Postgres connection string configured in environment variables.');
    return { rows: [], rowCount: 0 };
  }

  try {
    if (connectionString.includes('neon.tech') || connectionString.includes('vercel-storage.com')) {
      const neonPool = new NeonPool({ connectionString });
      const res = await neonPool.query(text, params);
      await neonPool.end().catch(() => {});
      return res;
    } else {
      const pgPool = new PgPool({ connectionString });
      const res = await pgPool.query(text, params);
      await pgPool.end().catch(() => {});
      return res;
    }
  } catch (error: any) {
    console.error('Database query exception caught gracefully:', error?.message || error);
    return { rows: [], rowCount: 0, error };
  }
}

