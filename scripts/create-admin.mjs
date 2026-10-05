// Creates an admin user, or resets the password of an existing one.
// Usage: npm run admin:create -- --email you@example.com --name "Your Name" --password "a long password" [--role owner|admin]
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import pg from "pg";
import { pgConnectionString } from "../db/url.mjs";
import { checkPasswordStrength, hashPassword } from "../lib/passwords.mjs";

const ROOT = path.resolve(import.meta.dirname, "..");
if (fs.existsSync(path.join(ROOT, ".env.local"))) process.loadEnvFile(path.join(ROOT, ".env.local"));

const { values } = parseArgs({
  options: { email: { type: "string" }, name: { type: "string", default: "" }, password: { type: "string" }, role: { type: "string", default: "owner" } },
});
const email = String(values.email || "").trim().toLowerCase();
if (!email || !values.password) {
  console.error('Usage: npm run admin:create -- --email you@example.com --name "Your Name" --password "..." [--role owner|admin]');
  process.exit(1);
}
const weak = checkPasswordStrength(values.password);
if (weak) {
  console.error(weak);
  process.exit(1);
}
if (!["owner", "admin"].includes(values.role)) {
  console.error("--role must be owner or admin");
  process.exit(1);
}

const client = new pg.Client({ connectionString: pgConnectionString(process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL) });
await client.connect();
const { rows } = await client.query(
  `INSERT INTO admin_users (email, name, role, password_hash) VALUES ($1, $2, $3, $4)
   ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash,
     name = COALESCE(NULLIF(EXCLUDED.name, ''), admin_users.name), role = EXCLUDED.role
   RETURNING (xmax = 0) AS created`,
  [email, values.name.trim(), values.role, await hashPassword(values.password)]
);
await client.end();
console.log(rows[0].created ? `Created ${values.role} ${email}` : `Updated ${email} (password reset, role ${values.role})`);
