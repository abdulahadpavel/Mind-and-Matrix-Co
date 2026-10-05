import { requireOwner } from "@/lib/auth";
import { listUsers } from "@/lib/users";
import { MIN_PASSWORD_LENGTH } from "@/lib/passwords.mjs";
import { formatDateTime, timeAgo } from "@/lib/format";
import { createUserAction, deleteUserAction, resetUserPasswordAction } from "../../actions";
import ActionForm from "../../_components/ActionForm";
import SubmitButton from "../../_components/SubmitButton";

export const metadata = { title: "Admin users" };

export default async function UsersPage() {
  const me = await requireOwner();
  const users = await listUsers();

  return (
    <>
      <header className="adm-page-head">
        <div>
          <h1>Admin users</h1>
          <p>People who can sign in to this panel. Owners can also manage users and delete submissions forever.</p>
        </div>
      </header>

      <section className="adm-card adm-table-wrap">
        <table className="adm-table adm-table-static">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="adm-hide-sm">Last sign-in</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <b>{u.name || "—"}</b>
                  {u.id === me.id && <span className="adm-you">You</span>}
                </td>
                <td>{u.email}</td>
                <td>{u.role === "owner" ? "Owner" : "Admin"}</td>
                <td className="adm-hide-sm adm-muted" title={u.last_login_at ? formatDateTime(u.last_login_at) : ""}>
                  {u.last_login_at ? timeAgo(u.last_login_at) : "Never"}
                </td>
                <td className="adm-row-actions">
                  {u.id !== me.id && (
                    <>
                      <details className="adm-pop">
                        <summary className="adm-btn adm-btn-sm">Reset password</summary>
                        <ActionForm action={resetUserPasswordAction} successMessage="Password changed and user signed out.">
                          <input type="hidden" name="id" value={u.id} />
                          <input type="password" name="password" minLength={MIN_PASSWORD_LENGTH} required placeholder="New password" autoComplete="new-password" aria-label={`New password for ${u.email}`} />
                          <SubmitButton className="adm-btn adm-btn-primary adm-btn-sm">Save</SubmitButton>
                        </ActionForm>
                      </details>
                      <form action={deleteUserAction}>
                        <input type="hidden" name="id" value={u.id} />
                        <SubmitButton className="adm-btn adm-btn-sm adm-btn-danger-soft" pendingText="Removing…" confirm={`Remove ${u.email}? They will no longer be able to sign in.`}>
                          Remove
                        </SubmitButton>
                      </form>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="adm-card adm-card-pad adm-narrow">
        <h2>Add an admin</h2>
        <ActionForm action={createUserAction} className="adm-form" successMessage="Admin added. Share the password with them securely.">
          <div className="adm-form-row">
            <label>
              Name
              <input name="name" required maxLength={100} />
            </label>
            <label>
              Email
              <input name="email" type="email" required autoComplete="off" />
            </label>
          </div>
          <div className="adm-form-row">
            <label>
              Password
              <input name="password" type="password" minLength={MIN_PASSWORD_LENGTH} required autoComplete="new-password" />
              <small>At least {MIN_PASSWORD_LENGTH} characters. They can change it under My account.</small>
            </label>
            <label>
              Role
              <select name="role" defaultValue="admin">
                <option value="admin">Admin — manage submissions</option>
                <option value="owner">Owner — also manage users &amp; delete forever</option>
              </select>
            </label>
          </div>
          <SubmitButton className="adm-btn adm-btn-primary" pendingText="Adding…">Add admin</SubmitButton>
        </ActionForm>
      </section>
    </>
  );
}
