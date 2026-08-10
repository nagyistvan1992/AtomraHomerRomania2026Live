const HARDCODED_NEON_URL =
  'postgresql://authenticator:npg_TFRx9K3pUSnY@ep-bold-voice-za0tvd1y-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require';

function getValidConnectionString(): string {
  const envUrl = process.env.POSTGRES_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL_NON_POOLING;
  if (envUrl && (envUrl.startsWith('postgres://') || envUrl.startsWith('postgresql://'))) {
    return envUrl.replace(/channel_binding=require&?/, '');
  }
  return HARDCODED_NEON_URL;
}

export async function query(text: string, params: any[] = []): Promise<{ rows: any[]; rowCount: number; error?: any }> {
  const connStr = getValidConnectionString();
  const match = connStr.match(/postgresql:\/\/([^:]+):([^@]+)@([^\/]+)\/(.+)/);
  const host = match ? match[3].split('?')[0] : 'ep-bold-voice-za0tvd1y-pooler.c-2.eu-west-2.aws.neon.tech';

  try {
    const response = await fetch(`https://${host}/sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Neon-Connection-String': connStr
      },
      body: JSON.stringify({ query: text, params })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Neon HTTP SQL Error:', response.status, errText);
      return { rows: [], rowCount: 0, error: new Error(errText) };
    }

    const data = await response.json();
    const rows = Array.isArray(data) ? data : (data.rows || []);
    return { rows, rowCount: rows.length };
  } catch (error: any) {
    console.error('Database query exception caught gracefully:', error?.message || error);
    return { rows: [], rowCount: 0, error };
  }
}
