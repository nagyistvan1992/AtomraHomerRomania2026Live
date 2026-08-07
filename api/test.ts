export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');

  try {
    const { neon } = await import('@neondatabase/serverless');
    const sql = neon('postgresql://neondb_owner:npg_1yQmpo6enEPA@ep-green-brook-zajitt3k-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require');
    const result = await sql`SELECT 1 as val`;
    return res.status(200).json({ status: 'ok', neonResult: result });
  } catch (err: any) {
    return res.status(500).json({ status: 'error', error: err.message, stack: err.stack });
  }
}
