"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";
import SubmitButton from "../_components/SubmitButton";

export default function LoginForm({ next }) {
  const [state, action] = useActionState(loginAction, null);

  return (
    <main className="adm-login">
      <form className="adm-login-card" action={action}>
        <img src="/img/logo-horizontal.svg" alt="Mind and Matrix Co." width="200" height="32" />
        <h1>Admin sign in</h1>
        <p>Manage the leads sent from the website.</p>
        <input type="hidden" name="next" value={next} />
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="username" required autoFocus defaultValue={state?.email || ""} />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required />
        {state?.error && <p className="adm-alert adm-alert-err" role="alert">{state.error}</p>}
        <SubmitButton className="adm-btn adm-btn-primary adm-btn-lg" pendingText="Signing in…">
          Sign in
        </SubmitButton>
      </form>
    </main>
  );
}
