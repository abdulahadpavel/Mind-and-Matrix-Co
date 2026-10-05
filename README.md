# Mind and Matrix Co. — Next.js site

The Mind and Matrix website rebuilt in Next.js (App Router, JavaScript), with an admin panel that stores every form submission.

## Run locally

```bash
npm install
npm run dev
```

- Website: http://localhost:3000
- Admin panel: http://localhost:3000/admin (password is `ADMIN_PASSWORD` in `.env.local`)

Node 22 was installed to `~/.local/node`. If `npm` is "not found", run this first (or add it to `~/.zshrc`):

```bash
export PATH="$HOME/.local/node/bin:$PATH"
```

## Where things are

| Path | What it is |
| --- | --- |
| `app/(site)/` | Public pages: `/`, `/dental`, `/about`, `/contact` |
| `app/globals.css` | Original site stylesheet (unchanged except the font variable) |
| `components/LeadForm.js` | The lead form used on Home, Dental and Contact |
| `components/SiteHeader.js`, `SiteFooter.js` | Shared header / footer |
| `app/api/submissions/route.js` | Receives form posts (validation, honeypot, rate limit) |
| `app/admin/` | Admin login + dashboard |
| `lib/submissions.js` | Storage — Vercel Blob when deployed, `data/submissions.json` locally |
| `public/img/` | Logos and photos |

## Admin panel

- Lists every submission with search and filters (form, status)
- Click a row to see all details, including UTM / click-ID tracking
- Set a status (new, contacted, qualified, won, lost, spam) and add internal notes
- Export everything as CSV, or delete a submission

To change the password, edit `ADMIN_PASSWORD` in `.env.local` and restart `npm run dev`.

## Live site (Vercel)

- Site: https://mind-and-matrix.vercel.app — admin: https://mind-and-matrix.vercel.app/admin
- On Vercel, submissions are saved as private files in the Vercel Blob store `mind-and-matrix-submissions` (one file per submission).
  Locally (`npm run dev`) they go to `data/submissions.json` instead, so local tests never reach the live data.
- Redeploy after changes: `vercel deploy --prod`
- Change the live admin password: `vercel env add ADMIN_PASSWORD production --force`, then redeploy.

`scripts/convert-html.mjs` is the one-off script that generated the page JSX from the original HTML. Running it again (`npm run convert`) overwrites the page files.
