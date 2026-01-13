const { Pool } = require("pg");
const { postgres } = require("./env");

const pool = new Pool({
  host: postgres.host,
  port: postgres.port,
  database: postgres.database,
  user: postgres.user,
  password: postgres.password,
});

async function connectPostgres() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ PostgreSQL connected");
  } catch (err) {
    console.error("❌ PostgreSQL connection failed", err);
    process.exit(1);
  }
}

module.exports = connectPostgres;
module.exports.pool = pool;
