const HARDCODED_NEON_URL =
  'postgresql://neondb_owner:npg_1yQmpo6enEPA@ep-green-brook-zajitt3k-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require';

function getValidConnectionString(): string {
  const envUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL_NON_POOLING;
  if (envUrl && (envUrl.startsWith('postgres://') || envUrl.startsWith('postgresql://'))) {
    return envUrl.replace(/channel_binding=require&?/, '');
  }
  return HARDCODED_NEON_URL;
}

let neonClient: any = null;

async function getNeonClient() {
  if (!neonClient) {
    const { neon } = await import('@neondatabase/serverless');
    const connStr = getValidConnectionString();
    neonClient = neon(connStr);
  }
  return neonClient;
}

export async function query(text: string, params: any[] = []): Promise<{ rows: any[]; rowCount: number; error?: any }> {
  try {
    const sql = await getNeonClient();
    const rows = await sql.query(text, params);
    return { rows: Array.isArray(rows) ? rows : [], rowCount: Array.isArray(rows) ? rows.length : 0 };
  } catch (error: any) {
    console.error('Neon HTTP query exception caught gracefully:', error?.message || error);
    try {
      const { neon } = await import('@neondatabase/serverless');
      const fallbackSql = neon(HARDCODED_NEON_URL);
      const rows = await fallbackSql.query(text, params);
      return { rows: Array.isArray(rows) ? rows : [], rowCount: Array.isArray(rows) ? rows.length : 0 };
    } catch (fallbackErr: any) {
      console.error('Fallback Neon query also failed:', fallbackErr?.message || fallbackErr);
      return { rows: [], rowCount: 0, error: fallbackErr };
    }
  }
}
