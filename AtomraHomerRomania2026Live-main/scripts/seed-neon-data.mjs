import pkg from 'pg';
const { Pool } = pkg;

import { catalogCategories, catalogProducts } from '../src/data/catalog.ts';

const connectionString = process.env.POSTGRES_URL || 'postgresql://neondb_owner:npg_8OK3yaDtzins@ep-frosty-sea-zabzp3tr-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require';

async function seedNeon() {
  console.log('Seeding catalog data to Neon Postgres...');
  const pool = new Pool({ connectionString });
  const client = await pool.connect();

  try {
    // 1. Seed categories
    console.log('Seeding categories...');
    for (const cat of catalogCategories) {
      await client.query(
        `INSERT INTO categories (name, slug, description, image, display_order)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (slug) DO UPDATE 
         SET name = EXCLUDED.name, description = EXCLUDED.description, image = EXCLUDED.image, display_order = EXCLUDED.display_order`,
        [cat.name, cat.slug, cat.description, cat.image, cat.sort_order]
      );
    }
    console.log('✓ Categories seeded successfully.');

    // 2. Fetch category UUIDs
    const catRes = await client.query('SELECT id, slug FROM categories');
    const categoryMap = new Map();
    catRes.rows.forEach(r => categoryMap.set(r.slug, r.id));

    // 3. Seed products
    console.log('Seeding products...');
    for (const p of catalogProducts) {
      const catId = categoryMap.get(p.category_slug) || null;
      await client.query(
        `INSERT INTO products (name, slug, description, price, category_id, images, stock, is_featured)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (slug) DO UPDATE
         SET name = EXCLUDED.name, description = EXCLUDED.description, price = EXCLUDED.price, 
             category_id = EXCLUDED.category_id, images = EXCLUDED.images, stock = EXCLUDED.stock`,
        [p.name, p.slug, p.description, p.price, catId, p.images, p.in_stock ? 50 : 0, true]
      );
    }
    console.log('✓ Products seeded successfully.');

    const prodCount = await client.query('SELECT COUNT(*) FROM products');
    const catCount = await client.query('SELECT COUNT(*) FROM categories');

    console.log(`\nNeon Database Status:`);
    console.log(`  Categories in Neon: ${catCount.rows[0].count}`);
    console.log(`  Products in Neon: ${prodCount.rows[0].count}`);

    client.release();
    await pool.end();
  } catch (err) {
    console.error('Error seeding Neon DB:', err);
    process.exit(1);
  }
}

seedNeon();
