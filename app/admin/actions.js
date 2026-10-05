"use server";

// Every action re-checks the session: Server Actions can be called directly, not only from our UI.
import { redirect } from "next/navigation";
import { refresh } from "next/cache";
import { endSessions, login, logout, requireAdmin, requireOwner } from "@/lib/auth";
import {
  addNote,
  deleteForever,
  isUuid,
  moveToTrash,
  restoreFromTrash,
  setStatus,
} from "@/lib/submissions";
import { changeOwnPassword, createUser, deleteUser, setPassword, updateProfile } from "@/lib/users";

const ids = (formData) => formData.getAll("ids").map(String).filter(isUuid);

// Only follow same-site relative paths after login.
const safeNext = (v) => (typeof v === "string" && /^\/admin(\/|$|\?)/.test(v) ? v : "/admin");

// ---------- Auth ----------

export async function loginAction(_prev, formData) {
  const result = await login(formData.get("email"), formData.get("password"));
  if (result.error) return { error: result.error, email: String(formData.get("email") || "") };
  redirect(safeNext(formData.get("next")));
}

export async function logoutAction() {
  await logout();
  redirect("/admin/login");
}

// ---------- Submissions ----------

export async function setStatusAction(formData) {
  const admin = await requireAdmin();
  await setStatus(ids(formData), String(formData.get("status")), admin);
  refresh();
}

export async function addNoteAction(_prev, formData) {
  const admin = await requireAdmin();
  const [id] = ids(formData);
  const body = String(formData.get("body") || "");
  if (!body.trim()) return { error: "Write a note first." };
  await addNote(id, body, admin);
  refresh();
  return { ok: true, at: Date.now() };
}

export async function trashAction(formData) {
  const admin = await requireAdmin();
  await moveToTrash(ids(formData), admin);
  const back = formData.get("redirect");
  if (back) redirect(safeNext(String(back)));
  refresh();
}

export async function restoreAction(formData) {
  const admin = await requireAdmin();
  await restoreFromTrash(ids(formData), admin);
  refresh();
}

export async function deleteForeverAction(formData) {
  const admin = await requireOwner();
  await deleteForever(ids(formData), admin);
  const back = formData.get("redirect");
  if (back) redirect(safeNext(String(back)));
  refresh();
}

// ---------- Users (owner only) ----------

export async function createUserAction(_prev, formData) {
  await requireOwner();
  const result = await createUser({
    email: formData.get("email"),
    name: formData.get("name"),
    role: formData.get("role"),
    password: formData.get("password"),
  });
  if (result.error) return result;
  refresh();
  return { ok: true, at: Date.now() };
}

export async function deleteUserAction(formData) {
  const admin = await requireOwner();
  const id = String(formData.get("id"));
  if (isUuid(id)) await deleteUser(id, admin);
  refresh();
}

export async function resetUserPasswordAction(_prev, formData) {
  const admin = await requireOwner();
  const id = String(formData.get("id"));
  if (!isUuid(id)) return { error: "Unknown user." };
  const result = await setPassword(id, formData.get("password"));
  if (result.error) return result;
  // Sign the user out everywhere so the old password can't keep a session alive.
  if (id !== admin.id) await endSessions(id);
  return { ok: true, at: Date.now() };
}

// ---------- Own account ----------

export async function updateProfileAction(_prev, formData) {
  const admin = await requireAdmin();
  await updateProfile(admin.id, formData.get("name"));
  refresh();
  return { ok: true, at: Date.now() };
}

export async function changePasswordAction(_prev, formData) {
  const admin = await requireAdmin();
  if (formData.get("password") !== formData.get("confirm")) return { error: "The new passwords don't match." };
  const result = await changeOwnPassword(admin.id, formData.get("current"), formData.get("password"));
  if (result.error) return result;
  await endSessions(admin.id, { keepCurrent: true });
  return { ok: true, at: Date.now() };
}

export async function endOtherSessionsAction() {
  const admin = await requireAdmin();
  await endSessions(admin.id, { keepCurrent: true });
  refresh();
}
