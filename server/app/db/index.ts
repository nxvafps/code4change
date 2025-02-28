import { Pool } from "pg";
import { config } from "dotenv";
import path from "path";

const ENV = process.env.NODE_ENV || "development";

config({
  path: path.resolve(__dirname, `../.env.${ENV}`),
});

if (!process.env.PGDATABASE) {
  throw new Error("PGDATABASE not set");
}

const pool = new Pool();
export default pool;
