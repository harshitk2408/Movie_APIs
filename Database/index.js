import pkg from 'pg';
const { Pool } = pkg;
import 'dotenv/config'
const pool = new Pool({
    host: 'localhost',
    port: '5432',
    database: process.env.database,
    user: process.env.user,
    password:process.env.password
    })
const db={query:(text, params) => pool.query(text, params)};
export default db;