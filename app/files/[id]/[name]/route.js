import { getUpload, ALLOWED_TYPES } from "@/lib/uploads";
import { isUuid } from "@/lib/submissions";

// Serves files uploaded in the admin panel. A file never changes once uploaded, so browsers and
// Vercel's CDN can cache it for a year.
export async function GET(_request, { params }) {
  const { id } = await params;
  if (!isUuid(id)) return new Response("Not found", { status: 404 });
  const file = await getUpload(id);
  if (!file) return new Response("Not found", { status: 404 });

  const inline = ALLOWED_TYPES[file.mime]?.inline;
  const disposition = `${inline ? "inline" : "attachment"}; filename="${file.name.replace(/"/g, "")}"`;
  return new Response(file.data, {
    headers: {
      "Content-Type": file.mime,
      "Content-Length": String(file.size),
      "Content-Disposition": disposition,
      "Cache-Control": "public, max-age=31536000, s-maxage=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; img-src 'self'; media-src 'self'; style-src 'unsafe-inline'; sandbox",
    },
  });
}
