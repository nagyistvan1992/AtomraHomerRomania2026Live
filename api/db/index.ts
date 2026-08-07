import { Pool as NeonPool } from '@neondatabase/serverless';
import pkg from 'pg';
const { Pool: PgPool } = pkg;

export async function query(text: string, params?: any[]) {
  const connectionString =
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL_NON_POOLING ||
    'postgresql://neondb_owner:npg_1yQmpo6enEPA@ep-green-brook-zajitt3k-pooler.c-2.eu-west-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require';

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

