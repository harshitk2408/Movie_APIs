import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config'
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL ,
  })
const db={query:(text, params) => pool.query(text, params)};
export default db;