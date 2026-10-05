import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { del, get, list, put } from "@vercel/blob";

// Storage backends:
//  - On Vercel (BLOB_READ_WRITE_TOKEN is set): one private Vercel Blob per submission.
//  - Locally: a JSON file at data/submissions.json (or DATA_DIR).
const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export const STATUSES = ["new", "contacted", "qualified", "won", "lost", "spam"];

// Fields accepted from the public forms, with a max length for each.
export const FIELDS = {
  name: 200,
  email: 200,
  company: 200,
  phone: 60,
  website: 300,
  partner_type: 100,
  ad_spend: 60,
  services: 600,
  message: 5000,
  form_source: 60,
  page_url: 1000,
  referrer: 1000,
  utm_source: 200,
  utm_medium: 200,
  utm_campaign: 200,
  gclid: 300,
  fbclid: 300,
};

const byNewest = (a, b) => b.createdAt.localeCompare(a.createdAt);

// ---------- Vercel Blob backend ----------

const PREFIX = "submissions/";
const blobPath = (id) => `${PREFIX}${id}.json`;
const validId = (id) => /^[0-9a-f-]{36}$/.test(id);

async function blobRead(pathname) {
  const res = await get(pathname, { access: "private", useCache: false });
  if (!res || res.statusCode !== 200) return null;
  return JSON.parse(await new Response(res.stream).text());
}

function blobWrite(item) {
  return put(blobPath(item.id), JSON.stringify(item), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

const blobStore = {
  async list() {
    const paths = [];
    let cursor;
    do {
      const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
      paths.push(...page.blobs.map((b) => b.pathname));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    const items = [];
    // Read in small batches to stay well inside rate limits.
    for (let i = 0; i < paths.length; i += 20) {
      items.push(...(await Promise.all(paths.slice(i, i + 20).map(blobRead))));
    }
    return items.filter(Boolean);
  },
  async add(item) {
    await blobWrite(item);
  },
  async update(id, patch) {
    if (!validId(id)) return null;
    const item = await blobRead(blobPath(id));
    if (!item) return null;
    Object.assign(item, patch, { updatedAt: new Date().toISOString() });
    await blobWrite(item);
    return item;
  },
  async remove(id) {
    if (!validId(id) || !(await blobRead(blobPath(id)))) return false;
    await del(blobPath(id));
    return true;
  },
};

// ---------- JSON file backend (local development) ----------

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "submissions.json");
let queue = Promise.resolve();

// Serialize every read-modify-write so concurrent requests never clobber each other.
function locked(fn) {
  const run = queue.then(fn, fn);
  queue = run.catch(() => {});
  return run;
}

async function readAll() {
  try {
    return JSON.parse(await fs.readFile(FILE, "utf8"));
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeAll(items) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(items, null, 2));
  await fs.rename(tmp, FILE);
}

const fileStore = {
  list: readAll,
  add: (item) =>
    locked(async () => {
      const items = await readAll();
      items.push(item);
      await writeAll(items);
    }),
  update: (id, patch) =>
    locked(async () => {
      const items = await readAll();
      const item = items.find((i) => i.id === id);
      if (!item) return null;
      Object.assign(item, patch, { updatedAt: new Date().toISOString() });
      await writeAll(items);
      return item;
    }),
  remove: (id) =>
    locked(async () => {
      const items = await readAll();
      const next = items.filter((i) => i.id !== id);
      if (next.length === items.length) return false;
      await writeAll(next);
      return true;
    }),
};

const store = useBlob ? blobStore : fileStore;

// ---------- Public API ----------

export async function listSubmissions() {
  return (await store.list()).sort(byNewest);
}

export async function addSubmission(fields, meta = {}) {
  const item = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
    notes: "",
    ...fields,
    ip: meta.ip || "",
    userAgent: meta.userAgent || "",
  };
  await store.add(item);
  return item;
}

export function updateSubmission(id, patch) {
  const clean = {};
  if (patch.status !== undefined) clean.status = patch.status;
  if (patch.notes !== undefined) clean.notes = patch.notes;
  return store.update(id, clean);
}

export function deleteSubmission(id) {
  return store.remove(id);
}
