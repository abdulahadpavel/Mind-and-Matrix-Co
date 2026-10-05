// pg treats sslmode=require as verify-full today but will weaken it in v9 — pin the strict mode explicitly.
export function pgConnectionString(url) {
  const u = new URL(url);
  const mode = u.searchParams.get("sslmode");
  if (!mode || ["prefer", "require", "verify-ca"].includes(mode)) u.searchParams.set("sslmode", "verify-full");
  u.searchParams.delete("channel_binding");
  return u.toString();
}
