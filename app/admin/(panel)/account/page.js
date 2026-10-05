import { listSessions, requireAdmin } from "@/lib/auth";
import { MIN_PASSWORD_LENGTH } from "@/lib/passwords.mjs";
import { formatDateTime } from "@/lib/format";
import { changePasswordAction, endOtherSessionsAction, updateProfileAction } from "../../actions";
import ActionForm from "../../_components/ActionForm";
import SubmitButton from "../../_components/SubmitButton";

export const metadata = { title: "My account" };

function device(ua) {
  if (!ua) return "Unknown device";
  const browser = /Edg\//.test(ua) ? "Edge" : /Chrome\//.test(ua) ? "Chrome" : /Firefox\//.test(ua) ? "Firefox" : /Safari\//.test(ua) ? "Safari" : "Browser";
  const os = /iPhone|iPad/.test(ua) ? "iOS" : /Android/.test(ua) ? "Android" : /Mac OS X/.test(ua) ? "macOS" : /Windows/.test(ua) ? "Windows" : /Linux/.test(ua) ? "Linux" : "";
  return os ? `${browser} on ${os}` : browser;
}

export default async function AccountPage() {
  const admin = await requireAdmin();
  const sessions = await listSessions(admin.id);

  return (
    <>
      <header className="adm-page-head">
        <div>
          <h1>My account</h1>
          <p>{admin.email} · {admin.role === "owner" ? "Owner" : "Admin"}</p>
        </div>
      </header>

      <div className="adm-grid-2">
        <section className="adm-card adm-card-pad">
          <h2>Profile</h2>
          <ActionForm action={updateProfileAction} className="adm-form" resetOnSuccess={false} successMessage="Saved.">
            <label>
              Display name
              <input name="name" defaultValue={admin.name} maxLength={100} required />
              <small>Shown on notes and in the history of each submission.</small>
            </label>
            <SubmitButton className="adm-btn adm-btn-primary">Save</SubmitButton>
          </ActionForm>
        </section>

        <section className="adm-card adm-card-pad">
          <h2>Change password</h2>
          <ActionForm action={changePasswordAction} className="adm-form" successMessage="Password changed. Other devices were signed out.">
            <input type="email" name="username" value={admin.email} autoComplete="username" readOnly hidden />
            <label>
              Current password
              <input name="current" type="password" required autoComplete="current-password" />
            </label>
            <label>
              New password
              <input name="password" type="password" minLength={MIN_PASSWORD_LENGTH} required autoComplete="new-password" />
              <small>At least {MIN_PASSWORD_LENGTH} characters.</small>
            </label>
            <label>
              Repeat new password
              <input name="confirm" type="password" minLength={MIN_PASSWORD_LENGTH} required autoComplete="new-password" />
            </label>
            <SubmitButton className="adm-btn adm-btn-primary">Change password</SubmitButton>
          </ActionForm>
        </section>

        <section className="adm-card adm-card-pad adm-span-2">
          <div className="adm-card-head">
            <h2>Signed-in devices</h2>
            {sessions.length > 1 && (
              <form action={endOtherSessionsAction}>
                <SubmitButton className="adm-btn adm-btn-sm" pendingText="Signing out…">Sign out other devices</SubmitButton>
              </form>
            )}
          </div>
          <ul className="adm-list adm-sessions">
            {sessions.map((s, i) => (
              <li key={i}>
                <div>
                  <b>{device(s.user_agent)}{s.current && <span className="adm-you">This device</span>}</b>
                  <small>Signed in {formatDateTime(s.created_at)} · IP {s.ip}</small>
                </div>
                <small className="adm-muted">Expires {formatDateTime(s.expires_at)}</small>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
