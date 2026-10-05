import { isAdmin } from "@/lib/auth";
import { FIELDS, listSubmissions } from "@/lib/submissions";

const COLUMNS = ["createdAt", "status", ...Object.keys(FIELDS), "notes", "ip", "userAgent", "id"];

function cell(v) {
  let s = v == null ? "" : String(v);
  // Stop spreadsheet apps from treating values as formulas.
  if (/^[=+\-@\t\r]/.test(s) && !/^[+\-]?[\d\s().-]+$/.test(s)) s = "'" + s;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET() {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });
  const items = await listSubmissions();
  const csv = [COLUMNS.join(","), ...items.map((i) => COLUMNS.map((c) => cell(i[c])).join(","))].join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="submissions-${date}.csv"`,
    },
  });
}
