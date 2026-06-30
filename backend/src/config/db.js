import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";

const { Pool } = pkg;

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.query("SELECT NOW()")
  .then(r => console.log("DB OK:", r.rows))
  .catch(e => console.error("DB FAIL:", e));

console.log("HOST:", pool.options.host);
console.log("PORT:", pool.options.port);
console.log("DATABASE:", pool.options.database);

export default pool;