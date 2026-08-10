const HARDCODED_NEON_URL =
  'postgresql://authenticator:npg_TFRx9K3pUSnY@ep-bold-voice-za0tvd1y-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require';

function getValidConnectionString(): string {
  try {
    const envUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL_NON_POOLING;
    if (envUrl && typeof envUrl === 'string' && (envUrl.startsWith('postgres://') || envUrl.startsWith('postgresql://'))) {
      return envUrl.trim().replace(/channel_binding=require&?/, '');
    }
  } catch {}
  return HARDCODED_NEON_URL;
}

function getHostFromConnStr(connStr: string): string {
  try {
    const sanitized = connStr.replace('postgresql://', 'http://').replace('postgres://', 'http://');
    const parsed = new URL(sanitized);
    if (parsed.hostname) return parsed.hostname;
  } catch {}
  return 'ep-bold-voice-za0tvd1y-pooler.c-2.eu-west-2.aws.neon.tech';
}

export async function query(text: string, params: any[] = []): Promise<{ rows: any[]; rowCount: number; error?: any }> {
  try {
    const connStr = getValidConnectionString();
    const host = getHostFromConnStr(connStr);

    const response = await fetch(`https://${host}/sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Neon-Connection-String': connStr
      },
      body: JSON.stringify({ query: text, params })
    });

    if (!response.ok) {
      const errText = await response.text().catch(() => 'DB HTTP error');
      console.warn('Neon HTTP SQL Notice:', response.status, errText);
      return { rows: [], rowCount: 0, error: new Error(errText) };
    }

    const data = await response.json().catch(() => ({}));
    const rows = Array.isArray(data) ? data : (data.rows || []);
    return { rows, rowCount: rows.length };
  } catch (error: any) {
    console.warn('Database query exception caught gracefully:', error?.message || error);
    return { rows: [], rowCount: 0, error };
  }
}
