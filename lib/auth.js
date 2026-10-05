import "server-only";
import crypto from "node:crypto";
import { cache } from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { query } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/passwords.mjs";

export const SESSION_COOKIE = "mm_admin_session";
const SESSION_DAYS = 7;
const MAX_FAILS_PER_IP = 10;
const MAX_FAILS_PER_EMAIL = 5;

const sha256 = (s) => crypto.createHash("sha256").update(s).digest("hex");
export const normalizeEmail = (e) => String(e || "").trim().toLowerCase();

export async function clientInfo() {
  const h = await headers();
  return {
    ip: (h.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown",
    userAgent: (h.get("user-agent") || "").slice(0, 300),
  };
}

// Used so a login for an unknown email takes as long as a wrong password.
let dummyHash;

export async function login(rawEmail, password) {
  const email = normalizeEmail(rawEmail);
  const { ip, userAgent } = await clientInfo();

  const {
    rows: [fails],
  } = await query(
    `SELECT count(*) FILTER (WHERE ip = $1)::int AS by_ip,
            count(*) FILTER (WHERE email = $2)::int AS by_email
       FROM login_attempts
      WHERE created_at > now() - interval '15 minutes' AND (ip = $1 OR email = $2)`,
    [ip, email]
  );
  if (fails.by_ip >= MAX_FAILS_PER_IP || fails.by_email >= MAX_FAILS_PER_EMAIL) {
    return { error: "Too many failed attempts. Please wait 15 minutes and try again." };
  }

  const { rows } = await query("SELECT id, password_hash FROM admin_users WHERE email = $1", [email]);
  let ok = false;
  if (rows[0]) {
    ok = await verifyPassword(String(password || ""), rows[0].password_hash);
  } else {
    dummyHash ??= await hashPassword(crypto.randomUUID());
    await verifyPassword(String(password || ""), dummyHash);
  }
  if (!ok) {
    await query("INSERT INTO login_attempts (email, ip) VALUES ($1, $2)", [email, ip]);
    return { error: "Wrong email or password." };
  }

  const token = crypto.randomBytes(32).toString("base64url");
  await query(
    `INSERT INTO admin_sessions (token_hash, user_id, expires_at, ip, user_agent)
     VALUES ($1, $2, now() + make_interval(days => $3), $4, $5)`,
    [sha256(token), rows[0].id, SESSION_DAYS, ip, userAgent]
  );
  await query("UPDATE admin_users SET last_login_at = now() WHERE id = $1", [rows[0].id]);
  await query("DELETE FROM login_attempts WHERE email = $1 OR created_at < now() - interval '1 day'", [email]);
  await query("DELETE FROM admin_sessions WHERE expires_at < now()");

  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
  return { ok: true };
}

async function currentTokenHash() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return token ? sha256(token) : null;
}

// The signed-in admin for this request, or null. Cached per request.
export const getCurrentAdmin = cache(async () => {
  const hash = await currentTokenHash();
  if (!hash) return null;
  const { rows } = await query(
    `SELECT u.id, u.email, u.name, u.role
       FROM admin_sessions s JOIN admin_users u ON u.id = s.user_id
      WHERE s.token_hash = $1 AND s.expires_at > now()`,
    [hash]
  );
  return rows[0] || null;
});

// Call at the top of every admin page and server action.
export async function requireAdmin() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function requireOwner() {
  const admin = await requireAdmin();
  if (admin.role !== "owner") redirect("/admin");
  return admin;
}

export async function logout() {
  const hash = await currentTokenHash();
  if (hash) await query("DELETE FROM admin_sessions WHERE token_hash = $1", [hash]);
  (await cookies()).delete(SESSION_COOKIE);
}

// Signs a user out on every device, optionally keeping the current session.
export async function endSessions(userId, { keepCurrent = false } = {}) {
  const hash = keepCurrent ? await currentTokenHash() : null;
  await query("DELETE FROM admin_sessions WHERE user_id = $1 AND token_hash IS DISTINCT FROM $2", [userId, hash]);
}

export async function listSessions(userId) {
  const hash = await currentTokenHash();
  const { rows } = await query(
    `SELECT created_at, expires_at, ip, user_agent, token_hash = $2 AS current
       FROM admin_sessions WHERE user_id = $1 AND expires_at > now() ORDER BY created_at DESC`,
    [userId, hash]
  );
  return rows;
}
