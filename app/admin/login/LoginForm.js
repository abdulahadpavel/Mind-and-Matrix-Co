"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const password = new FormData(e.currentTarget).get("password");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.replace("/admin");
      router.refresh();
      return;
    }
    const json = await res.json().catch(() => ({}));
    setError(json.error || "Login failed.");
    setBusy(false);
  }

  return (
    <main className="adm-login">
      <form className="adm-login-card" onSubmit={onSubmit}>
        <img src="/img/logo-horizontal.svg" alt="Mind and Matrix Co." width="200" height="32" />
        <h1>Admin panel</h1>
        <p>Sign in to view form submissions.</p>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
        {error && <div className="adm-error">{error}</div>}
        <button className="adm-btn adm-btn-primary" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
