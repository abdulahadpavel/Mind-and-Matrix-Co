"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteForeverAction, restoreAction, setStatusAction, trashAction } from "../actions";
import SubmitButton from "./SubmitButton";
import StatusPill from "./StatusPill";

// rows: plain objects with pre-formatted dates (formatted on the server in the admin time zone).
export default function SubmissionsTable({ rows, statuses, trash = false, canPurge = false }) {
  const router = useRouter();
  const [selected, setSelected] = useState(() => new Set());
  const allChecked = rows.length > 0 && rows.every((r) => selected.has(r.id));

  const toggle = (id) =>
    setSelected((s) => {
      const next = new Set(s);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const toggleAll = () => setSelected(allChecked ? new Set() : new Set(rows.map((r) => r.id)));

  // Selected ids are sent with each bulk action; clear the selection once it has run.
  const withIds = (action) => async (formData) => {
    selected.forEach((id) => formData.append("ids", id));
    await action(formData);
    setSelected(new Set());
  };

  const open = (e, id) => {
    if (e.target.closest("a, button, input, label, select")) return;
    router.push(`/admin/submissions/${id}`);
  };

  return (
    <>
      {selected.size > 0 && (
        <div className="adm-bulk" role="region" aria-label="Bulk actions">
          <b>{selected.size} selected</b>
          {trash ? (
            <>
              <form action={withIds(restoreAction)}>
                <SubmitButton pendingText="Restoring…">Restore</SubmitButton>
              </form>
              {canPurge && (
                <form action={withIds(deleteForeverAction)}>
                  <SubmitButton
                    className="adm-btn adm-btn-danger"
                    pendingText="Deleting…"
                    confirm={`Permanently delete ${selected.size} submission(s)? This cannot be undone.`}
                  >
                    Delete forever
                  </SubmitButton>
                </form>
              )}
            </>
          ) : (
            <>
              <form action={withIds(setStatusAction)} className="adm-inline-form">
                <select name="status" defaultValue="contacted" aria-label="New status">
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
                <SubmitButton pendingText="Updating…">Set status</SubmitButton>
              </form>
              <form action={withIds(trashAction)}>
                <SubmitButton className="adm-btn adm-btn-danger-soft" pendingText="Moving…">
                  Move to trash
                </SubmitButton>
              </form>
            </>
          )}
          <button className="adm-btn adm-btn-plain" onClick={() => setSelected(new Set())}>
            Clear
          </button>
        </div>
      )}

      <div className="adm-card adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th className="adm-check">
                <input type="checkbox" checked={allChecked} onChange={toggleAll} aria-label="Select all on this page" />
              </th>
              <th>{trash ? "Deleted" : "Received"}</th>
              <th>Name</th>
              <th>Company</th>
              <th className="adm-hide-sm">Email</th>
              <th className="adm-hide-md">Form</th>
              <th className="adm-hide-md">Ad spend</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} onClick={(e) => open(e, r.id)} className={selected.has(r.id) ? "is-selected" : ""}>
                <td className="adm-check">
                  <input
                    type="checkbox"
                    checked={selected.has(r.id)}
                    onChange={() => toggle(r.id)}
                    aria-label={`Select ${r.name}`}
                  />
                </td>
                <td className="adm-nowrap adm-muted" title={r.receivedFull}>
                  {trash ? r.deleted : r.received}
                </td>
                <td>
                  <Link href={`/admin/submissions/${r.id}`} className="adm-row-link">
                    {r.name}
                  </Link>
                  {r.noteCount > 0 && (
                    <span className="adm-note-count" title={`${r.noteCount} note(s)`}>
                      {r.noteCount}
                    </span>
                  )}
                </td>
                <td>{r.company}</td>
                <td className="adm-hide-sm">{r.email}</td>
                <td className="adm-nowrap adm-hide-md">{r.source}</td>
                <td className="adm-nowrap adm-hide-md">{r.adSpend || "—"}</td>
                <td>
                  <StatusPill status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
