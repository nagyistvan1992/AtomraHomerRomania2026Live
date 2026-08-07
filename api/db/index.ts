import { neon } from '@neondatabase/serverless';

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  'postgresql://neondb_owner:npg_1yQmpo6enEPA@ep-green-brook-zajitt3k-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require';

const cleanConnStr = connectionString.replace(/channel_binding=require&?/, '');

let sqlClient: any = null;

function getSql() {
  if (!sqlClient) {
    sqlClient = neon(cleanConnStr);
  }
  return sqlClient;
}

export async function query(text: string, params: any[] = []) {
  try {
    const sql = getSql();
    const rows = await sql.query(text, params);
    return { rows: Array.isArray(rows) ? rows : [], rowCount: Array.isArray(rows) ? rows.length : 0 };
  } catch (error: any) {
    console.error('Database query exception caught gracefully:', error?.message || error);
    return { rows: [], rowCount: 0, error };
  }
}
