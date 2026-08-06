import fs from 'fs';
import path from 'path';
import pkg from 'pg';
const { Pool } = pkg;

const connectionString = process.env.POSTGRES_URL || 'postgresql://neondb_owner:npg_8OK3yaDtzins@ep-frosty-sea-zabzp3tr-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require';

async function initNeonDb() {
  console.log('Connecting to Neon PostgreSQL...');
  const pool = new Pool({ connectionString });

  try {
    const client = await pool.connect();
    console.log('Connected successfully to Neon Postgres!');

    const schemaPath = path.resolve('api/db/schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Applying database schema to Neon Postgres...');
    await client.query(sql);
    console.log('Schema applied successfully!');

    // Check tables
    const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('\nTables verified in Neon database:');
    res.rows.forEach(row => console.log('  ✓ ' + row.table_name));

    client.release();
    await pool.end();
    console.log('\nNeon initialization complete!');
  } catch (err) {
    console.error('Error initializing Neon DB:', err);
    process.exit(1);
  }
}

initNeonDb();
