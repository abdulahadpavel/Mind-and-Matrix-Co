// One-off converter: turns the original static HTML pages into Next.js JSX.
// Usage: npm run convert   (reads ../*.html, writes app/** and components/**)
import fs from 'node:fs';
import path from 'node:path';
import { parse, NodeType } from 'node-html-parser';
import prettier from 'prettier';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.resolve(ROOT, '..');

const ATTR_MAP = {
  class: 'className', for: 'htmlFor', tabindex: 'tabIndex', autocomplete: 'autoComplete',
  novalidate: 'noValidate', readonly: 'readOnly', maxlength: 'maxLength', minlength: 'minLength',
  crossorigin: 'crossOrigin', srcset: 'srcSet', colspan: 'colSpan', rowspan: 'rowSpan',
  datetime: 'dateTime', frameborder: 'frameBorder', allowfullscreen: 'allowFullScreen',
  playsinline: 'playsInline', autoplay: 'autoPlay', inputmode: 'inputMode', viewbox: 'viewBox',
  'xlink:href': 'xlinkHref', 'xml:space': 'xmlSpace',
};
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr']);
const NO_WS = new Set(['table', 'thead', 'tbody', 'tfoot', 'tr', 'select', 'colgroup']);
const PAGES = { 'index.html': '/', 'dental.html': '/dental', 'about.html': '/about', 'contact.html': '/contact' };

const INLINE = new Set(['a', 'b', 'strong', 'em', 'i', 'span', 'small', 'img', 'code', 'abbr', 'br', 'sup', 'sub']);
const isInline = (n) => n.nodeType === NodeType.TEXT_NODE ? !!n.rawText.trim() : INLINE.has(n.rawTagName.toLowerCase());

const camel =(s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

function styleToObject(css) {
  const parts = css.split(';').map((d) => d.trim()).filter(Boolean).map((d) => {
    const i = d.indexOf(':');
    const prop = d.slice(0, i).trim();
    const key = prop.startsWith('--') ? JSON.stringify(prop) : camel(prop);
    return `${key}: ${JSON.stringify(d.slice(i + 1).trim())}`;
  });
  return `{{ ${parts.join(', ')} }}`;
}

function mapHref(href) {
  const [file, hash] = href.split('#');
  if (file in PAGES) return PAGES[file] + (hash ? `#${hash}` : '');
  return null;
}

const escText = (t) => t.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
const escAttr = (v) => v.replace(/"/g, '&quot;');

function convert(node, ctx, parentTag = '') {
  if (node.nodeType === NodeType.COMMENT_NODE) return '';
  if (node.nodeType === NodeType.TEXT_NODE) {
    const sibs = node.parentNode ? node.parentNode.childNodes : [];
    const i = sibs.indexOf(node);
    const prev = sibs[i - 1];
    const next = sibs[i + 1];
    let t = node.rawText;
    if (!t.trim()) {
      // Whitespace between siblings only renders when both sides are inline content.
      if (NO_WS.has(parentTag) || !prev || !next) return '';
      if (/\n/.test(t) && !(isInline(prev) && isInline(next))) return '';
      return ' ';
    }
    t = t.replace(/\s+/g, ' ');
    if (!prev) t = t.trimStart();
    if (!next) t = t.trimEnd();
    return escText(t);
  }
  let tag = node.rawTagName;
  const lower = tag.toLowerCase();
  const a = node.rawAttributes;

  if (ctx.hooks) {
    const out = ctx.hooks(node, a);
    if (out != null) return out;
  }

  const props = [];
  let isLink = false;
  if (lower === 'a' && a.href) {
    const mapped = mapHref(a.href);
    if (mapped) { isLink = true; a.href = mapped; ctx.usesLink = true; }
  }
  for (const [name, value] of Object.entries(a)) {
    const n = name.toLowerCase();
    let key = ATTR_MAP[n] || (/^(data|aria)-/.test(n) ? n : n.includes('-') ? camel(n) : name);
    if (n === 'style') { props.push(`style=${styleToObject(value)}`); continue; }
    if ((n === 'src' || n === 'href') && /^\.?\/?assets\/img\//.test(value)) {
      props.push(`${key}="${escAttr(value.replace(/^\.?\/?assets\/img\//, '/img/'))}"`);
      continue;
    }
    if (n === 'selected') { ctx.selected = true; continue; }
    if (value === '' && ['required', 'hidden', 'disabled', 'checked', 'open', 'novalidate', 'multiple', 'crossorigin'].includes(n)) {
      props.push(key);
      continue;
    }
    props.push(`${key}="${escAttr(value)}"`);
  }
  if (isLink) tag = 'Link';
  const open = `<${tag}${props.length ? ' ' + props.join(' ') : ''}`;
  if (VOID.has(lower)) return `${open} />`;
  const kids = node.childNodes.map((c) => convert(c, ctx, lower)).join('');
  if (!kids) return `${open} />`;
  return `${open}>${kids}</${tag}>`;
}

// ---------- page-specific hooks ----------

function leadFormProps(card) {
  const form = card.querySelector('form');
  const p = {
    id: card.getAttribute('id'),
    title: card.querySelector('h3').text.trim(),
    subtitle: card.querySelector('.form-sub').text.trim(),
    source: form.querySelector('input[name=form_source]').getAttribute('value'),
    submitLabel: form.querySelector('button[type=submit]').text.trim(),
  };
  if (form.querySelector('textarea')) p.variant = 'full';
  return p;
}

function hooksFor(ctx) {
  return (node, a) => {
    const cls = (a.class || '').split(/\s+/);
    if (cls.includes('form-card') && node.querySelector('form.lead-form')) {
      ctx.usesLeadForm = true;
      const props = Object.entries(leadFormProps(node))
        .map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(' ');
      return `<LeadForm ${props} />`;
    }
    if ('data-tabs' in a) {
      ctx.usesTabs = true;
      ctx.tabsNode = node;
      return '<DentalTabs />';
    }
    return null;
  };
}

function tabsHooks(node, a) {
  if (a.role === 'tab') {
    const id = a['aria-controls'];
    delete a['aria-selected']; delete a.tabindex;
    const rest = Object.entries(a).map(([k, v]) => `${ATTR_MAP[k] || k}="${escAttr(v)}"`).join(' ');
    return `<button ${rest} {...tabProps(${JSON.stringify(id)})}>${escText(node.innerHTML)}</button>`;
  }
  if (a.role === 'tabpanel') {
    const id = a.id;
    delete a.hidden;
    a['data-panel'] = id;
  }
  return null;
}

async function fmt(code) {
  return prettier.format(code, { parser: 'babel', printWidth: 110, singleQuote: false });
}

async function write(rel, code) {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, await fmt(code));
  console.log('wrote', rel);
}

function imports(ctx) {
  const lines = [];
  if (ctx.usesLink) lines.push('import Link from "next/link";');
  if (ctx.usesLeadForm) lines.push('import LeadForm from "@/components/LeadForm";');
  if (ctx.usesTabs) lines.push('import DentalTabs from "@/components/DentalTabs";');
  return lines.join('\n');
}

const TITLES = {
  'dental.html': 'Dental Marketing',
  'about.html': 'About Us',
  'contact.html': 'Contact',
};

for (const [file, route] of Object.entries(PAGES)) {
  const doc = parse(fs.readFileSync(path.join(SRC, file), 'utf8'), { comment: false });
  const main = doc.querySelector('main');
  const ctx = {};
  ctx.hooks = hooksFor(ctx);
  const body = main.childNodes.map((c) => convert(c, ctx, 'main')).join('').trim();
  const dir = route === '/' ? 'app/(site)' : `app/(site)${route}`;
  const meta = TITLES[file] ? `export const metadata = { title: ${JSON.stringify(TITLES[file])} };\n\n` : '';
  const name = route === '/' ? 'HomePage' : camel('-' + route.slice(1)).replace(/^./, (c) => c.toUpperCase()) + 'Page';
  await write(`${dir}/page.js`, `${imports(ctx)}\n\n${meta}export default function ${name}() {\n return (<main id="main">${body}</main>);\n}\n`);

  if (ctx.tabsNode) {
    const tctx = { hooks: tabsHooks };
    const inner = ctx.tabsNode.childNodes.map((c) => convert(c, tctx, 'div')).join('').trim()
      .replace(/data-panel="([^"]+)"/g, (_, id) => `hidden={active !== ${JSON.stringify(id)}}`);
    const ids = [...ctx.tabsNode.querySelectorAll('[role=tab]')].map((t) => t.getAttribute('aria-controls'));
    await write('components/DentalTabs.js', `"use client";

import { useRef, useState } from "react";

const TABS = ${JSON.stringify(ids)};

export default function DentalTabs() {
  const [active, setActive] = useState(TABS[0]);
  const wrap = useRef(null);

  function onKeyDown(e, id) {
    const i = TABS.indexOf(id);
    let next = null;
    if (e.key === "ArrowRight") next = TABS[(i + 1) % TABS.length];
    if (e.key === "ArrowLeft") next = TABS[(i - 1 + TABS.length) % TABS.length];
    if (!next) return;
    e.preventDefault();
    setActive(next);
    wrap.current?.querySelector(\`[aria-controls="\${next}"]\`)?.focus();
  }

  const tabProps = (id) => ({
    "aria-selected": active === id ? "true" : "false",
    tabIndex: active === id ? 0 : -1,
    onClick: () => setActive(id),
    onKeyDown: (e) => onKeyDown(e, id),
  });

  return (<div data-tabs ref={wrap}>${inner}</div>);
}
`);
  }
}

// Shared footer (identical on every page)
{
  const doc = parse(fs.readFileSync(path.join(SRC, 'index.html'), 'utf8'), { comment: false });
  const ctx = {};
  const footer = convert(doc.querySelector('footer'), ctx, 'body')
    .replace(/&copy; \d{4}/, '&copy; {new Date().getFullYear()}');
  await write('components/SiteFooter.js', `import Link from "next/link";\n\nexport default function SiteFooter() {\n return (${footer});\n}\n`);
  const wa = convert(doc.querySelector('.wa-float'), {}, 'body');
  await write('components/WhatsAppButton.js', `export default function WhatsAppButton() {\n return (${wa});\n}\n`);
}
