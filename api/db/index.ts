import pg from 'pg';
const Pool = pg.Pool || (pg as any).default?.Pool || pg;

const connectionString =
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  'postgresql://neondb_owner:npg_1yQmpo6enEPA@ep-green-brook-zajitt3k-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require';

const cleanConnStr = connectionString.replace(/channel_binding=require&?/, '');

let poolInstance: any = null;

function getPool() {
  if (!poolInstance) {
    poolInstance = new Pool({
      connectionString: cleanConnStr,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  return poolInstance;
}

export async function query(text: string, params?: any[]) {
  try {
    const p = getPool();
    return await p.query(text, params);
  } catch (error: any) {
    console.error('Database query exception caught gracefully:', error?.message || error);
    return { rows: [], rowCount: 0, error };
  }
}

