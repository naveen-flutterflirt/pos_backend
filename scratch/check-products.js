const { Pool } = require('@neondatabase/serverless');

const dbUrl = "postgresql://neondb_owner:npg_NTvQJLBIan24@ep-nameless-shape-azx2wtg0-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const pool = new Pool({ connectionString: dbUrl });

async function checkProducts() {
  try {
    const res = await pool.query('SELECT * FROM "Product" LIMIT 5');
    console.log(JSON.stringify(res.rows, null, 2));
  } catch (err) {
    console.error("Error fetching products:", err);
  } finally {
    await pool.end();
  }
}

checkProducts();
