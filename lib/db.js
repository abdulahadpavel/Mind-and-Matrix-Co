import "server-only";
import pg from "pg";
import { attachDatabasePool } from "@vercel/functions";
import { pgConnectionString } from "@/db/url.mjs";

function createPool() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set (see .env.local / Vercel env vars)");
  const pool = new pg.Pool({
    connectionString: pgConnectionString(process.env.DATABASE_URL),
    max: 5,
    idleTimeoutMillis: 5000,
  });
  // Lets Vercel close idle connections cleanly before a function is suspended.
  attachDatabasePool(pool);
  return pool;
}

// Reuse one pool per server instance (also across hot reloads in dev).
const pool = (globalThis.__mmPool ??= createPool());

export function query(text, params) {
  return pool.query(text, params);
}

export async function transaction(fn) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
