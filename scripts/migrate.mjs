// Applies db/migrations/*.sql in order, once each. Runs before every build (see package.json).
// Usage: npm run db:migrate
import fs from "node:fs";
import path from "node:path";
import pg from "pg";
import { pgConnectionString } from "../db/url.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
if (fs.existsSync(path.join(ROOT, ".env.local"))) process.loadEnvFile(path.join(ROOT, ".env.local"));

// Migrations use the direct (unpooled) connection, as Neon recommends.
const url = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set — cannot run migrations.");
  process.exit(1);
}

const client = new pg.Client({ connectionString: pgConnectionString(url) });
await client.connect();
try {
  await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
    name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`);
  // Only one migrator at a time (e.g. two deploys building at once).
  await client.query("SELECT pg_advisory_lock(727274)");
  const done = new Set((await client.query("SELECT name FROM schema_migrations")).rows.map((r) => r.name));
  const dir = path.join(ROOT, "db/migrations");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".sql")).sort();
  let applied = 0;
  for (const file of files) {
    if (done.has(file)) continue;
    await client.query("BEGIN");
    try {
      await client.query(fs.readFileSync(path.join(dir, file), "utf8"));
      await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [file]);
      await client.query("COMMIT");
      console.log("applied", file);
      applied++;
    } catch (err) {
      await client.query("ROLLBACK");
      throw new Error(`Migration ${file} failed: ${err.message}`);
    }
  }
  console.log(applied ? `${applied} migration(s) applied.` : "Database is up to date.");
} finally {
  await client.end();
}
