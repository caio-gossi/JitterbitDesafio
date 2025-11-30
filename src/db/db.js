import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

// Start postgreSQL connection pool
export const pool = new Pool({
    user: String(process.env.DB_USER),
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: String(process.env.DB_PASSWORD),
    port: Number(process.env.DB_PORT)
});