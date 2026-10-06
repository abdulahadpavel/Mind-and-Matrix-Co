# Mind and Matrix Co. — Next.js site

The Mind and Matrix website in Next.js (App Router, JavaScript), with an admin panel that saves every form submission in a Postgres database (Neon).

- Live site: https://mind-and-matrix.vercel.app
- Admin panel: https://mind-and-matrix.vercel.app/admin — sign in with your admin email and password

## Run locally

```bash
export PATH="$HOME/.local/node/bin:$PATH"   # Node was installed here
npm install
npm run dev
```

Website: http://localhost:3000 · Admin: http://localhost:3000/admin

`.env.local` holds `DATABASE_URL` / `DATABASE_URL_UNPOOLED`. Locally the app uses the **same database as the live site**, so anything you submit or change locally is real data.

## Admin panel

| Page | What you can do |
| --- | --- |
| Dashboard | New/7-day/30-day/won counts, leads per day, leads by form, pipeline, latest leads, recent activity |
| Submissions | Search, filter by status/form/date, sort, select rows for bulk status changes or trash, export CSV (respects filters) |
| Case studies | Write, edit, publish or hide case studies; upload a cover image, images and files (PDF, Word, Excel…) into the content; choose which show on the home page. Saving updates the live site right away |
| Submission page | All details and tracking (UTMs, click IDs), status, notes from your team, full change history, email/call/WhatsApp buttons |
| Trash | Deleted leads keep all their data here; restore any time. Only owners can delete forever |
| Admin users (owners) | Add admins, reset their password (signs them out), remove them |
| My account | Change your name and password, see and sign out other devices |

Roles: **Owner** can do everything; **Admin** can manage submissions but not users, and can't delete forever.

Forgot the password, or need a new owner? Run:

```bash
npm run admin:create -- --email you@example.com --name "Your Name" --password "at least 10 characters" --role owner
```

(For an existing email this resets the password.)

## How data is protected

- Postgres on Neon, connected through Vercel (Storage tab → `mind-and-matrix-db`). Neon keeps a history you can restore from (the window depends on your Neon plan).
- Deleting moves a lead to Trash; nothing is removed unless an owner chooses "Delete forever".
- Every change (status, note, trash, restore, delete) is recorded in an activity log with who did it and when.
- Passwords are stored as scrypt hashes; sessions are stored in the database and can be revoked.
- Failed sign-ins are rate-limited per IP and per email; the public form is limited to 8 submissions per IP per 10 minutes and has a honeypot for bots.

## Code map

| Path | What it is |
| --- | --- |
| `app/(site)/` | Public pages: `/`, `/white-label`, `/case-studies`, `/case-studies/<slug>`, `/dental`, `/about`, `/contact` |
| `components/LeadForm.js` | The lead form used on Home, Dental and Contact |
| `app/api/submissions/route.js` | Receives form posts |
| `app/admin/` | Admin panel (`(panel)/` pages, `actions.js` server actions, `_components/`) |
| `app/admin/(panel)/case-studies/` | Case study list and editor |
| `lib/caseStudies.js`, `components/Markdown.js` | Case study queries and the safe content renderer |
| `lib/uploads.js`, `app/api/admin/uploads/`, `app/files/` | File uploads (stored in Postgres, max 4 MB each) and serving them at `/files/<id>/<name>` |
| `lib/db.js` | Postgres connection pool |
| `lib/submissions.js`, `lib/users.js`, `lib/auth.js` | Database queries, users, sign-in and sessions |
| `db/migrations/*.sql` | Database schema; applied automatically before every build (`npm run db:migrate`) |
| `scripts/create-admin.mjs` | Create an admin / reset a password |

## Deploy

```bash
vercel deploy --prod
```

The build runs the database migrations first, then builds the site.
