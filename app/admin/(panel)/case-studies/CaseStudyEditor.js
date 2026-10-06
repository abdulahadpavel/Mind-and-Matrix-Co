"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { deleteCaseStudyAction, saveCaseStudyAction } from "../../actions";
import SubmitButton from "../../_components/SubmitButton";
import { renderMarkdown } from "@/components/Markdown";
import { slugify } from "@/lib/slug";

const MAX_METRICS = 4;
const MAX_UPLOAD = 4 * 1024 * 1024;
const RESIZABLE = ["image/jpeg", "image/png", "image/webp"];

const EMPTY = {
  id: "",
  slug: "",
  title: "",
  client: "",
  industry: "",
  tags: [],
  summary: "",
  metrics: [],
  cover_url: "",
  cover_alt: "",
  body: "## Overview\n\n\n## The Challenge\n\n- \n\n## The Solution\n\n\n## Results\n\n- **Metric:** value\n\n## Outcome\n\n",
  seo_title: "",
  seo_description: "",
  status: "draft",
  featured: true,
  sort_order: 0,
};

// Large photos are shrunk in the browser before upload so they load fast and fit the 4 MB limit.
async function shrinkImage(file) {
  if (!RESIZABLE.includes(file.type) || file.size < 1.5 * 1024 * 1024) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.85));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.[^.]*$/, "") + ".webp", { type: "image/webp" });
  } catch {
    return file;
  }
}

async function uploadFile(file) {
  const ready = await shrinkImage(file);
  if (ready.size > MAX_UPLOAD) throw new Error(`${file.name} is over 4 MB. Please use a smaller file.`);
  const fd = new FormData();
  fd.append("file", ready);
  const res = await fetch("/api/admin/uploads", { method: "POST", body: fd });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.file) throw new Error(json.error || "The upload failed. Please try again.");
  return json.file;
}

const formatSize = (n) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);
const isImage = (mime) => String(mime).startsWith("image/");
const altFromName = (name) => name.replace(/\.[^.]*$/, "").replace(/[-_]+/g, " ").trim();

export default function CaseStudyEditor({ caseStudy, canDelete, justCreated = false }) {
  const cs = caseStudy || EMPTY;
  const isNew = !caseStudy;
  const router = useRouter();
  const formRef = useRef(null);
  const bodyRef = useRef(null);
  const [pending, startTransition] = useTransition();

  const [title, setTitle] = useState(cs.title);
  const [slug, setSlug] = useState(cs.slug);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [body, setBody] = useState(cs.body);
  const [coverUrl, setCoverUrl] = useState(cs.cover_url);
  const [status, setStatus] = useState(cs.status);
  const [tab, setTab] = useState("write");
  const [dirty, setDirty] = useState(false);
  const [result, setResult] = useState(justCreated ? { ok: true, status: caseStudy?.status } : null);
  const [uploads, setUploads] = useState([]);
  const [uploading, setUploading] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [savedSlug, setSavedSlug] = useState(isNew ? "" : cs.slug);
  const [savedStatus, setSavedStatus] = useState(isNew ? "" : cs.status);

  const metrics = Array.from({ length: MAX_METRICS }, (_, i) => cs.metrics?.[i] || { value: "", label: "" });

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  // Ctrl/Cmd + S saves.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setResult(null);
    startTransition(async () => {
      const r = await saveCaseStudyAction(null, fd);
      setResult(r);
      if (!r?.ok) return;
      setDirty(false);
      setSlug(r.slug);
      setSavedSlug(r.slug);
      setSavedStatus(r.status);
      if (r.created) router.replace(`/admin/case-studies/${r.id}?created=1`);
    });
  }

  // ----- Content toolbar -----

  function edit(fn) {
    const ta = bodyRef.current;
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e, value } = ta;
    const { text, cursorStart, cursorEnd } = fn(value.slice(0, s), value.slice(s, e), value.slice(e));
    setBody(text);
    setDirty(true);
    setTab("write");
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(cursorStart, cursorEnd);
    });
  }

  const wrap = (before, after, placeholder) =>
    edit((pre, sel, post) => {
      const inner = sel || placeholder;
      return {
        text: pre + before + inner + after + post,
        cursorStart: pre.length + before.length,
        cursorEnd: pre.length + before.length + inner.length,
      };
    });

  // Starts each selected line (or a new line) with a prefix such as "## " or "- ".
  const linePrefix = (prefix, placeholder) =>
    edit((pre, sel, post) => {
      const needsBreak = pre && !pre.endsWith("\n");
      const lines = (sel || placeholder).split("\n").map((l) => prefix + l.replace(/^(#{1,4}\s+|[-*]\s+|\d+[.)]\s+)/, ""));
      const block = (needsBreak ? "\n\n" : "") + lines.join("\n");
      return {
        text: pre + block + (post.startsWith("\n") ? "" : "\n") + post,
        cursorStart: pre.length + (needsBreak ? 2 : 0) + prefix.length,
        cursorEnd: pre.length + block.length,
      };
    });

  const insertBlock = (snippet) =>
    edit((pre, sel, post) => {
      const before = pre && !pre.endsWith("\n\n") ? (pre.endsWith("\n") ? "\n" : "\n\n") : "";
      const text = pre + sel + before + snippet + "\n\n" + post;
      const end = (pre + sel + before + snippet).length;
      return { text, cursorStart: end, cursorEnd: end };
    });

  function addLink() {
    const url = window.prompt("Link address (https://…)", "https://");
    if (!url || url === "https://") return;
    wrap("[", `](${url.trim()})`, "link text");
  }

  const insertUpload = (f) =>
    isImage(f.mime) ? insertBlock(`![${altFromName(f.name)}](${f.url})`) : insertBlock(`[Download ${f.name}](${f.url})`);

  async function handleFiles(fileList, { into = "content" } = {}) {
    const files = [...(fileList || [])];
    if (!files.length) return;
    setUploadError("");
    for (const file of files) {
      setUploading(file.name);
      try {
        const f = await uploadFile(file);
        setUploads((u) => [f, ...u]);
        if (into === "cover") {
          setCoverUrl(f.url);
          setDirty(true);
        } else {
          insertUpload(f);
        }
      } catch (err) {
        setUploadError(err.message);
      }
    }
    setUploading("");
  }

  const viewUrl = savedSlug && savedStatus === "published" ? `/case-studies/${savedSlug}` : "";

  return (
    <>
      <header className="adm-page-head">
        <div>
          <Link className="adm-link" href="/admin/case-studies">← All case studies</Link>
          <h1>{isNew ? "New case study" : "Edit case study"}</h1>
          <p>
            {isNew
              ? "Fill in the details and save. Keep it as a draft until it’s ready, then set it to Published."
              : savedStatus === "published"
                ? "This case study is live. Saving updates the website right away."
                : "This is a draft. Only admins can see it until you set it to Published."}
          </p>
        </div>
        {viewUrl && (
          <a className="adm-btn" href={viewUrl} target="_blank" rel="noopener">
            View on website ↗
          </a>
        )}
      </header>

      <form ref={formRef} className="adm-cs-form" onSubmit={onSubmit} onChange={() => setDirty(true)} noValidate>
        <input type="hidden" name="id" value={cs.id} />

        <div className="adm-cs-grid">
          <div className="adm-cs-main">
            <section className="adm-card adm-card-pad adm-form">
              <h2>Basics</h2>
              <label>
                Title *
                <input
                  name="title"
                  required
                  maxLength={200}
                  value={title}
                  placeholder="e.g. ฿1.84 Million Revenue Through Full-Funnel Google PPC"
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!slugTouched) setSlug(slugify(e.target.value));
                  }}
                />
              </label>
              <label>
                Page link
                <span className="adm-cs-slug">
                  <span>/case-studies/</span>
                  <input
                    name="slug"
                    maxLength={80}
                    value={slug}
                    placeholder="samui-fishing-club-resort"
                    onChange={(e) => {
                      setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                      setSlugTouched(true);
                    }}
                    onBlur={() => setSlug((v) => slugify(v || title))}
                  />
                </span>
                <small>
                  Changing this on a live case study breaks links already shared or used in ads.
                </small>
              </label>
              <div className="adm-form-row">
                <label>
                  Client name
                  <input name="client" maxLength={200} defaultValue={cs.client} placeholder="Samui Fishing Club & Resort" />
                </label>
                <label>
                  Industry
                  <input name="industry" maxLength={100} defaultValue={cs.industry} placeholder="Travel & Hospitality" />
                </label>
              </div>
              <label>
                Services / channels
                <input
                  name="tags"
                  maxLength={400}
                  defaultValue={(cs.tags || []).join(", ")}
                  placeholder="Google Ads, YouTube Ads, Performance Max"
                />
                <small>Separate with commas. Shown as tags on the page.</small>
              </label>
              <label>
                Short summary
                <textarea
                  name="summary"
                  rows={3}
                  maxLength={600}
                  defaultValue={cs.summary}
                  placeholder="One or two sentences with the headline result. Shown under the title."
                />
              </label>
            </section>

            <section className="adm-card adm-card-pad adm-form">
              <h2>Headline results</h2>
              <p className="adm-muted adm-cs-hint">
                Up to 4 big numbers shown at the top of the page and on the case study card. The first ones matter most.
              </p>
              <div className="adm-cs-metrics">
                {metrics.map((m, i) => (
                  <div className="adm-cs-metric" key={i}>
                    <span className="adm-cs-metric-n">{i + 1}</span>
                    <input
                      name={`metric_value_${i}`}
                      maxLength={40}
                      defaultValue={m.value}
                      placeholder={["฿1.84M", "21.2x", "367", "14.5%"][i]}
                      aria-label={`Result ${i + 1} number`}
                    />
                    <input
                      name={`metric_label_${i}`}
                      maxLength={60}
                      defaultValue={m.label}
                      placeholder={["Revenue generated", "ROAS", "Total bookings", "CTR"][i]}
                      aria-label={`Result ${i + 1} label`}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section className="adm-card adm-card-pad">
              <div className="adm-card-head">
                <h2>Content</h2>
                <div className="adm-cs-tabs" role="tablist">
                  <button type="button" role="tab" aria-selected={tab === "write"} onClick={() => setTab("write")}>
                    Write
                  </button>
                  <button type="button" role="tab" aria-selected={tab === "preview"} onClick={() => setTab("preview")}>
                    Preview
                  </button>
                </div>
              </div>

              <div className="adm-cs-toolbar" aria-label="Formatting">
                <button type="button" onClick={() => linePrefix("## ", "Section heading")} title="Section heading">H2</button>
                <button type="button" onClick={() => linePrefix("### ", "Sub-heading")} title="Sub-heading">H3</button>
                <button type="button" onClick={() => wrap("**", "**", "bold text")} title="Bold"><b>B</b></button>
                <button type="button" onClick={() => wrap("*", "*", "italic text")} title="Italic"><i>I</i></button>
                <button type="button" onClick={() => linePrefix("- ", "List item")} title="Bullet list">• List</button>
                <button type="button" onClick={() => linePrefix("1. ", "Step")} title="Numbered list">1. List</button>
                <button type="button" onClick={() => linePrefix("> ", "Quote")} title="Quote">“ Quote</button>
                <button type="button" onClick={addLink} title="Link">Link</button>
                <label className="adm-cs-upload-btn" title="Upload an image into the content">
                  Image…
                  <input type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" multiple hidden onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }} />
                </label>
                <label className="adm-cs-upload-btn" title="Attach a PDF or other file as a download link">
                  Attach file…
                  <input type="file" multiple hidden onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }} />
                </label>
              </div>

              <textarea
                ref={bodyRef}
                name="body"
                className="adm-cs-body"
                rows={26}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  if (e.dataTransfer.files?.length) {
                    e.preventDefault();
                    handleFiles(e.dataTransfer.files);
                  }
                }}
                hidden={tab !== "write"}
                spellCheck
              />
              {tab === "preview" && <div className="adm-cs-preview md cs-md">{renderMarkdown(body)}</div>}

              {uploading && <p className="adm-alert adm-alert-ok" role="status">Uploading {uploading}…</p>}
              {uploadError && <p className="adm-alert adm-alert-err" role="alert">{uploadError}</p>}

              <details className="adm-cs-help">
                <summary>Formatting help</summary>
                <ul>
                  <li><code>## Heading</code> and <code>### Sub-heading</code> start a section.</li>
                  <li><code>- item</code> makes a bullet list, <code>1. item</code> a numbered list.</li>
                  <li><code>**bold**</code>, <code>*italic*</code>, <code>[link text](https://…)</code>.</li>
                  <li>Leave an empty line between paragraphs.</li>
                  <li>Drag files onto the text box, or use Image… / Attach file… to upload and insert them where the cursor is.</li>
                </ul>
              </details>

              {uploads.length > 0 && (
                <div className="adm-cs-files">
                  <h3>Uploaded in this session</h3>
                  <ul>
                    {uploads.map((f) => (
                      <li key={f.id}>
                        {isImage(f.mime) ? <img src={f.url} alt="" /> : <span className="adm-cs-fileicon" aria-hidden="true">📄</span>}
                        <span className="adm-cs-filename">
                          {f.name} <small>{formatSize(f.size)}</small>
                        </span>
                        <button type="button" className="adm-btn adm-btn-sm" onClick={() => insertUpload(f)}>Insert</button>
                        {isImage(f.mime) && (
                          <button type="button" className="adm-btn adm-btn-sm" onClick={() => { setCoverUrl(f.url); setDirty(true); }}>
                            Use as cover
                          </button>
                        )}
                        <button type="button" className="adm-btn adm-btn-sm adm-btn-plain" onClick={() => navigator.clipboard?.writeText(location.origin + f.url)}>
                          Copy link
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          </div>

          <div className="adm-cs-side">
            <section className="adm-card adm-card-pad adm-form">
              <h2>Publishing</h2>
              <label>
                Status
                <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="draft">Draft — hidden from the website</option>
                  <option value="published">Published — live on the website</option>
                </select>
              </label>
              <label className="adm-cs-check">
                <input type="checkbox" name="featured" defaultChecked={cs.featured} />
                <span>Show on the home page</span>
              </label>
              <label>
                Order
                <input type="number" name="sort_order" defaultValue={cs.sort_order} min={-9999} max={9999} />
                <small>Newest case studies show first. This number only orders ones added at the same time (lower first).</small>
              </label>
            </section>

            <section className="adm-card adm-card-pad adm-form">
              <h2>Cover image</h2>
              <div className="adm-cs-cover">
                {coverUrl ? <img src={coverUrl} alt="" /> : <span>No cover image yet</span>}
              </div>
              <div className="adm-cs-cover-actions">
                <label className="adm-btn adm-btn-sm">
                  {coverUrl ? "Replace image…" : "Upload image…"}
                  <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" hidden onChange={(e) => { handleFiles(e.target.files, { into: "cover" }); e.target.value = ""; }} />
                </label>
                {coverUrl && (
                  <button type="button" className="adm-btn adm-btn-sm adm-btn-plain" onClick={() => { setCoverUrl(""); setDirty(true); }}>
                    Remove
                  </button>
                )}
              </div>
              <input type="hidden" name="cover_url" value={coverUrl} />
              <label>
                Image description
                <input name="cover_alt" maxLength={300} defaultValue={cs.cover_alt} placeholder="What the photo shows" />
                <small>Helps Google and screen readers. A landscape photo works best.</small>
              </label>
            </section>

            <section className="adm-card adm-card-pad adm-form">
              <h2>Search &amp; sharing</h2>
              <label>
                Page title for Google
                <input name="seo_title" maxLength={200} defaultValue={cs.seo_title} placeholder="Leave empty to use the title" />
              </label>
              <label>
                Description for Google
                <textarea
                  name="seo_description"
                  rows={3}
                  maxLength={400}
                  defaultValue={cs.seo_description}
                  placeholder="Leave empty to use the short summary"
                />
                <small>Also shown when the link is shared on Facebook, LinkedIn or WhatsApp.</small>
              </label>
            </section>
          </div>
        </div>

        <div className="adm-cs-savebar">
          <div className="adm-cs-savebar-msg" role="status" aria-live="polite">
            {result?.error ? (
              <span className="adm-cs-err">{result.error}</span>
            ) : result?.ok ? (
              <span className="adm-cs-ok">
                Saved{result.status === "published" ? " — live on the website" : " as a draft"}.
              </span>
            ) : dirty ? (
              <span className="adm-muted">Unsaved changes</span>
            ) : (
              <span className="adm-muted">Tip: press Ctrl/⌘ + S to save</span>
            )}
          </div>
          <button type="submit" className="adm-btn adm-btn-primary adm-btn-lg" disabled={pending || !!uploading}>
            {pending ? "Saving…" : status === "published" ? "Save & publish" : "Save draft"}
          </button>
        </div>
      </form>

      {canDelete && cs.id && (
        <form action={deleteCaseStudyAction} className="adm-cs-delete">
          <input type="hidden" name="id" value={cs.id} />
          <SubmitButton
            className="adm-btn adm-btn-danger-soft adm-btn-sm"
            pendingText="Deleting…"
            confirm="Delete this case study for good? Its page will stop working. To hide it instead, set it to Draft."
          >
            Delete case study
          </SubmitButton>
        </form>
      )}
    </>
  );
}
