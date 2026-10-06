// A small, safe Markdown renderer for case study content.
// It builds React elements directly (no raw HTML), so nothing typed in the admin can inject scripts.
// Supported: ## / ### headings, paragraphs, - and 1. lists, > quotes, ---, **bold**, *italic*,
// [links](url), ![images](url) and [Download](file-url) links.
import { Fragment } from "react";

const SAFE_URL = /^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i;
const safeUrl = (u) => (SAFE_URL.test(u) ? u : null);

const headingId = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Matches, in priority order: image, link, bold, italic (*x* or _x_).
const INLINE = /!\[([^\]]*)\]\(([^)\s]+)\)|\[([^\]]+)\]\(([^)\s]+)\)|\*\*(.+?)\*\*|\*([^*\s][^*]*?)\*|(?<![\w])_([^_\s][^_]*?)_(?![\w])/g;

function inline(text, keyPrefix = "") {
  const out = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(INLINE)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${keyPrefix}${i++}`;
    if (m[2] !== undefined) {
      const src = safeUrl(m[2]);
      if (src) out.push(<img key={key} src={src} alt={m[1]} loading="lazy" className="md-inline-img" />);
    } else if (m[4] !== undefined) {
      const href = safeUrl(m[4]);
      const external = /^https?:\/\//i.test(m[4]);
      const isFile = /^\/files\//.test(m[4]);
      out.push(
        href ? (
          <a
            key={key}
            href={href}
            {...(external || isFile ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={isFile ? "md-file" : undefined}
          >
            {inline(m[3], key + "-")}
          </a>
        ) : (
          <Fragment key={key}>{m[3]}</Fragment>
        )
      );
    } else if (m[5] !== undefined) {
      out.push(<strong key={key}>{inline(m[5], key + "-")}</strong>);
    } else {
      out.push(<em key={key}>{inline(m[6] ?? m[7], key + "-")}</em>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const UL = /^\s*[-*•]\s+(.*)$/;
const OL = /^\s*\d+[.)]\s+(.*)$/;
const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)\s]+)\)\s*$/;

export function renderMarkdown(source) {
  const lines = String(source || "").replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  let para = [];
  let k = 0;

  const flush = () => {
    if (para.length) {
      blocks.push(<p key={k++}>{inline(para.join(" "), `p${k}-`)}</p>);
      para = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const t = line.trim();
    if (!t) {
      flush();
      continue;
    }

    const h = t.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      flush();
      const level = Math.max(2, h[1].length); // the page already has the only <h1>
      const Tag = `h${level}`;
      blocks.push(
        <Tag key={k++} id={headingId(h[2])}>
          {inline(h[2], `h${k}-`)}
        </Tag>
      );
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(t)) {
      flush();
      blocks.push(<hr key={k++} />);
      continue;
    }

    const img = t.match(IMAGE_LINE);
    if (img) {
      flush();
      const src = safeUrl(img[2]);
      if (src) {
        blocks.push(
          <figure key={k++} className="md-figure">
            <img src={src} alt={img[1]} loading="lazy" />
            {img[1] && <figcaption>{img[1]}</figcaption>}
          </figure>
        );
      }
      continue;
    }

    if (t.startsWith(">")) {
      flush();
      const quote = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quote.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      i--;
      blocks.push(<blockquote key={k++}>{inline(quote.join(" "), `q${k}-`)}</blockquote>);
      continue;
    }

    const listRe = UL.test(line) ? UL : OL.test(line) ? OL : null;
    if (listRe) {
      flush();
      const items = [];
      while (i < lines.length && listRe.test(lines[i])) {
        items.push(lines[i].match(listRe)[1]);
        i++;
      }
      i--;
      const Tag = listRe === UL ? "ul" : "ol";
      blocks.push(
        <Tag key={k++}>
          {items.map((it, j) => (
            <li key={j}>{inline(it, `l${k}-${j}-`)}</li>
          ))}
        </Tag>
      );
      continue;
    }

    para.push(t);
  }
  flush();
  return blocks;
}

export default function Markdown({ source, className = "md" }) {
  return <div className={className}>{renderMarkdown(source)}</div>;
}
