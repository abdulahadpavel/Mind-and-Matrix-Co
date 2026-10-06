"use server";

// Every action re-checks the session: Server Actions can be called directly, not only from our UI.
import { redirect } from "next/navigation";
import { refresh, revalidatePath } from "next/cache";
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
import { resolveBookingUrl, setSetting } from "@/lib/settings";
import {
  createCaseStudy,
  deleteCaseStudy,
  parseCaseStudyForm,
  slugTaken,
  updateCaseStudy,
} from "@/lib/caseStudies";

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

// ---------- Settings (owner only) ----------

export async function saveBookingAction(_prev, formData) {
  const admin = await requireOwner();
  const link = String(formData.get("booking_link") || "").trim().slice(0, 2000);
  const result = await resolveBookingUrl(link);
  if (result.error) return { error: result.error };
  await setSetting("booking_link", link, admin);
  await setSetting("booking_url", result.url, admin);
  refresh();
  return { ok: true, at: Date.now(), message: result.url ? "Saved. The calendar now opens after every form submission." : "Saved. The calendar is turned off." };
}

// ---------- Case studies ----------

// Clears the cached public pages that show case studies so edits appear right away.
function revalidateCaseStudyPages(...slugs) {
  revalidatePath("/");
  revalidatePath("/case-studies");
  revalidatePath("/case-studies/[slug]", "page");
  revalidatePath("/sitemap.xml");
  for (const slug of slugs) if (slug) revalidatePath(`/case-studies/${slug}`);
}

export async function saveCaseStudyAction(_prev, formData) {
  const admin = await requireAdmin();
  const rawId = String(formData.get("id") || "");
  const id = isUuid(rawId) ? rawId : null;

  const { data, error } = parseCaseStudyForm(formData);
  if (error) return { error };
  if (await slugTaken(data.slug, id)) {
    return { error: `Another case study already uses the link /case-studies/${data.slug}. Choose a different URL slug.` };
  }

  if (id) {
    const row = await updateCaseStudy(id, data, admin);
    if (!row) return { error: "This case study no longer exists. It may have been deleted." };
    revalidateCaseStudyPages(row.slug, row.old_slug);
    refresh();
    return { ok: true, at: Date.now(), id: row.id, slug: row.slug, status: data.status };
  }

  const row = await createCaseStudy(data, admin);
  revalidateCaseStudyPages(row.slug);
  return { ok: true, at: Date.now(), id: row.id, slug: row.slug, status: data.status, created: true };
}

export async function deleteCaseStudyAction(formData) {
  await requireOwner();
  const id = String(formData.get("id") || "");
  if (isUuid(id)) {
    const row = await deleteCaseStudy(id);
    if (row) revalidateCaseStudyPages(row.slug);
  }
  redirect("/admin/case-studies");
}
