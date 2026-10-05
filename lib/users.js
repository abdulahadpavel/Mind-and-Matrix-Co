import "server-only";
import { query } from "@/lib/db";
import { normalizeEmail } from "@/lib/auth";
import { checkPasswordStrength, hashPassword, verifyPassword } from "@/lib/passwords.mjs";

export async function listUsers() {
  const { rows } = await query(
    "SELECT id, email, name, role, created_at, last_login_at FROM admin_users ORDER BY created_at"
  );
  return rows;
}

export async function createUser({ email, name, role, password }) {
  email = normalizeEmail(email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address." };
  if (!["owner", "admin"].includes(role)) return { error: "Choose a role." };
  const weak = checkPasswordStrength(password);
  if (weak) return { error: weak };
  const { rowCount } = await query(
    `INSERT INTO admin_users (email, name, role, password_hash) VALUES ($1, $2, $3, $4)
     ON CONFLICT (email) DO NOTHING`,
    [email, String(name || "").trim().slice(0, 100), role, await hashPassword(password)]
  );
  if (!rowCount) return { error: "An admin with that email already exists." };
  return { ok: true };
}

export async function deleteUser(id, actor) {
  if (id === actor.id) return { error: "You can't remove your own account." };
  const { rows } = await query(
    `DELETE FROM admin_users WHERE id = $1
       AND (role <> 'owner' OR (SELECT count(*) FROM admin_users WHERE role = 'owner') > 1)
     RETURNING id`,
    [id]
  );
  if (!rows[0]) return { error: "That user can't be removed (the last owner must stay)." };
  return { ok: true };
}

export async function setPassword(userId, password) {
  const weak = checkPasswordStrength(password);
  if (weak) return { error: weak };
  await query("UPDATE admin_users SET password_hash = $2 WHERE id = $1", [userId, await hashPassword(password)]);
  return { ok: true };
}

export async function changeOwnPassword(userId, current, next) {
  const { rows } = await query("SELECT password_hash FROM admin_users WHERE id = $1", [userId]);
  if (!rows[0] || !(await verifyPassword(String(current || ""), rows[0].password_hash))) {
    return { error: "Your current password is incorrect." };
  }
  return setPassword(userId, next);
}

export async function updateProfile(userId, name) {
  await query("UPDATE admin_users SET name = $2 WHERE id = $1", [userId, String(name || "").trim().slice(0, 100)]);
  return { ok: true };
}
