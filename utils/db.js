import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const connectionPool = new pg.Pool({
  host: process.env.SUPABASE_HOST,
  user: process.env.SUPABASE_USER,
  database: process.env.SUPABASE_DATABASE_NAME,
  password: process.env.SUPABASE_PASSWORD,
  port: process.env.SUPABASE_PORT,
});

export default connectionPool;
