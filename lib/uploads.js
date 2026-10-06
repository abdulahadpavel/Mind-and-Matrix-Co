import "server-only";
import { query } from "@/lib/db";

// Vercel functions accept request bodies up to 4.5 MB, so uploads are capped just under that.
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

// Types we accept and how they are served. SVG and HTML are refused: they could run scripts on this site.
export const ALLOWED_TYPES = {
  "image/jpeg": { ext: "jpg", inline: true },
  "image/png": { ext: "png", inline: true },
  "image/webp": { ext: "webp", inline: true },
  "image/gif": { ext: "gif", inline: true },
  "image/avif": { ext: "avif", inline: true },
  "application/pdf": { ext: "pdf", inline: true },
  "text/csv": { ext: "csv", inline: false },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { ext: "docx", inline: false },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { ext: "xlsx", inline: false },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": { ext: "pptx", inline: false },
  "application/zip": { ext: "zip", inline: false },
  "video/mp4": { ext: "mp4", inline: true },
};

// Checks the first bytes so a renamed file can't pretend to be an image.
function sniffMatches(mime, buf) {
  const hex = buf.subarray(0, 12).toString("hex");
  switch (mime) {
    case "image/jpeg":
      return hex.startsWith("ffd8ff");
    case "image/png":
      return hex.startsWith("89504e470d0a1a0a");
    case "image/gif":
      return hex.startsWith("47494638");
    case "image/webp":
      return hex.startsWith("52494646") && buf.subarray(8, 12).toString("latin1") === "WEBP";
    case "image/avif":
      return buf.subarray(4, 12).toString("latin1").startsWith("ftypavi");
    case "application/pdf":
      return hex.startsWith("25504446");
    default:
      return true;
  }
}

export function safeFileName(name, mime) {
  const ext = ALLOWED_TYPES[mime]?.ext || "bin";
  const base = String(name || "file")
    .replace(/\.[^.]*$/, "")
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return `${base || "file"}.${ext}`;
}

export const fileUrl = (id, name) => `/files/${id}/${encodeURIComponent(name)}`;

// Returns { file } or { error }.
export async function saveUpload(file, actor) {
  if (!file || typeof file.arrayBuffer !== "function") return { error: "Choose a file to upload." };
  const mime = String(file.type || "").toLowerCase();
  if (!ALLOWED_TYPES[mime]) {
    return { error: "That file type isn't supported. Use JPG, PNG, WebP, GIF, PDF, MP4, CSV, Word, Excel, PowerPoint or ZIP." };
  }
  if (file.size > MAX_UPLOAD_BYTES) return { error: "That file is over 4 MB. Please use a smaller file." };
  const buf = Buffer.from(await file.arrayBuffer());
  if (!buf.length) return { error: "That file is empty." };
  if (!sniffMatches(mime, buf)) return { error: "That file doesn't look like the type it claims to be." };

  const name = safeFileName(file.name, mime);
  const { rows } = await query(
    "INSERT INTO uploads (name, mime, size, data, uploaded_by) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [name, mime, buf.length, buf, actor?.id || null]
  );
  const id = rows[0].id;
  return { file: { id, name, mime, size: buf.length, url: fileUrl(id, name) } };
}

export async function getUpload(id) {
  const { rows } = await query("SELECT name, mime, size, data FROM uploads WHERE id = $1", [id]);
  return rows[0] || null;
}

export async function listRecentUploads(limit = 40) {
  const { rows } = await query(
    "SELECT id, name, mime, size, created_at FROM uploads ORDER BY created_at DESC LIMIT $1",
    [limit]
  );
  return rows.map((r) => ({ ...r, url: fileUrl(r.id, r.name) }));
}
