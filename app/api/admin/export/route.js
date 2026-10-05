import { getCurrentAdmin } from "@/lib/auth";
import { exportSubmissions } from "@/lib/submissions";

const COLUMNS = [
  ["created_at", "Received"],
  ["status", "Status"],
  ["name", "Name"],
  ["email", "Email"],
  ["company", "Company"],
  ["phone", "Phone"],
  ["website", "Website"],
  ["partner_type", "Partner type"],
  ["ad_spend", "Ad spend"],
  ["services_text", "Services"],
  ["message", "Message"],
  ["notes", "Notes"],
  ["form_source", "Form"],
  ["page_url", "Page URL"],
  ["referrer", "Referrer"],
  ["utm_source", "UTM source"],
  ["utm_medium", "UTM medium"],
  ["utm_campaign", "UTM campaign"],
  ["gclid", "GCLID"],
  ["fbclid", "FBCLID"],
  ["ip", "IP"],
  ["user_agent", "Browser"],
  ["id", "ID"],
];

function cell(v) {
  let s = v == null ? "" : v instanceof Date ? v.toISOString() : String(v);
  // Stop spreadsheet apps from treating values as formulas (phone numbers are left alone).
  if (/^[=+\-@\t\r]/.test(s) && !/^[+\-]?[\d\s().-]+$/.test(s)) s = "'" + s;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function GET(request) {
  if (!(await getCurrentAdmin())) return new Response("Unauthorized", { status: 401 });
  const sp = Object.fromEntries(new URL(request.url).searchParams);
  const rows = await exportSubmissions({ ...sp, trash: sp.trash === "1" });
  const csv = [
    COLUMNS.map(([, label]) => label).join(","),
    ...rows.map((r) => COLUMNS.map(([key]) => cell(r[key])).join(",")),
  ].join("\r\n");
  const date = new Date().toISOString().slice(0, 10);
  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="submissions-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
