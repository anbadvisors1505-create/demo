# GUIDE.md — ANB Advisors LLP website

Everything you need to configure, run, and deploy this site to production.
For SEO + GTM/GA4 setup specifically, see **GTA&SEO.md**.

---

## 1. What this project is

A Next.js 14 (App Router) marketing site for ANB Advisors LLP, a strategic
finance & corporate advisory firm, with:

- A 3D-depth loading screen (Framer Motion) with the "ANB" monogram and an
  early "Speak to a CA — Free" call-to-action.
- Depth-based scroll animation and motion throughout (hero parallax,
  scroll-triggered reveals, hover micro-interactions) using **Framer Motion**.
- Every section from your content brief: Hero, Capabilities, Services (15),
  Engagement process, Industries, About, Contact.
- Two lead-capture flows wired to a real backend + database:
  - **Book Consultation** (modal + form)
  - **Speak to a CA — Free** (modal + form, also reachable from the loading
    screen and a floating button)
  - A full **Contact** form on the page itself.
- GTM + GA4 placeholders (see GTA&SEO.md).
- SEO: metadata, Open Graph/Twitter cards, JSON-LD (`ProfessionalService`),
  `sitemap.xml`, `robots.txt` (Google, Bing, DuckDuckGo allowed explicitly).
- Fully responsive, from small phones to ultrawide desktops.

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion ·
better-sqlite3 (default DB) · Zod (validation).

---

## 2. Local setup

```bash
cd anb-advisors
npm install
cp .env.example .env.local     # then edit values inside
npm run dev
```

Open http://localhost:3000.

> **Note:** `next/font/google` fetches font files from Google Fonts at build
> time, so your build machine needs outbound internet access to
> `fonts.googleapis.com` / `fonts.gstatic.com` (true for Vercel, Netlify, and
> virtually all CI/CD and VPS providers). If you're building somewhere with a
> locked-down network, either allow those two domains or self-host the fonts
> (swap the `next/font/google` imports in `app/layout.tsx` for
> `next/font/local` and drop `.woff2` files in `/public/fonts`).

### Viewing submitted leads (development)

Leads submitted through any of the 3 forms are written to a local SQLite
file at `data/anb-advisors.db`. Inspect it with any SQLite browser, or:

```bash
sqlite3 data/anb-advisors.db "select * from leads order by created_at desc;"
```

---

## 3. Placeholder checklist

Everything below is a placeholder. Search for `TODO` across the repo to find
every spot, or work through this list.

### Content / config — `lib/site-config.ts`
| Field | Where | What to do |
|---|---|---|
| `url` | site-config.ts / `.env` `NEXT_PUBLIC_SITE_URL` | Your real production domain |
| `email` | `.env` `NEXT_PUBLIC_CONTACT_EMAIL` | Real inbox |
| `phoneDisplay` / `phoneHref` | `.env` | Real phone number (E.164 format for `phoneHref`, e.g. `+9198XXXXXXXX`) |
| `whatsappNumber` | `.env` | Real WhatsApp business number |
| `address` | site-config.ts | Real registered office address |
| `social.linkedin` / `.twitter` / `.instagram` | `.env` | Real profile URLs |
| `gtmId` / `ga4Id` | `.env` | Your GTM container / GA4 measurement ID — see GTA&SEO.md |
| `calendlyUrl` | `.env` (optional) | Only if you'd rather use Calendly/Cal.com instead of the built-in modal |
| `leadWebhookUrl` | `.env` (optional) | Slack/CRM/Zapier/n8n webhook to get notified instantly on new leads |

### Images — `/public`
| File | Needed for |
|---|---|
| `favicon.svg` | Provided as a placeholder brass "ANB" monogram — replace with your real mark |
| `apple-touch-icon.png` (180×180) | iOS home-screen icon — **add this file** |
| `og-image.jpg` (1200×630) | Social share preview — **add this file** |
| `logo.png` | Referenced in JSON-LD structured data — **add this file** |

### Legal
- `app/privacy-policy/page.tsx` currently contains **placeholder legal
  copy**. Have this reviewed/written by qualified legal counsel before
  launch, especially the data-collection and GA4/GTM disclosures.
- The registered office address in the footer/contact/JSON-LD is a
  placeholder (`TODO: Office address...`).

### Verification codes — `app/layout.tsx` → `metadata.verification`
- `google`: paste your Google Search Console HTML-tag verification code.
- `other["msvalidate.01"]`: paste your Bing Webmaster Tools code.

---

## 4. How the booking/lead forms work (backend + database)

```
Browser form  →  POST /api/book-consultation | /api/speak-to-ca | /api/contact
                     ↓
              Zod validation (lib/validation.ts)
                     ↓
              Honeypot + rate-limit check (lib/rate-limit.ts)
                     ↓
              Insert into SQLite `leads` table (lib/db.ts)
                     ↓
              Optional: forward to LEAD_WEBHOOK_URL (Slack/CRM/etc.)
                     ↓
              JSON response → success/error UI state in the modal/form
```

Every submission is tracked as a GTM dataLayer event too (see GTA&SEO.md).

### Swapping the database for production

SQLite (via `better-sqlite3`) writes to the local filesystem. This is great
for a single VPS/Docker deployment with a persistent disk, but **serverless
hosts (Vercel, Netlify Functions, etc.) have an ephemeral, read-only
filesystem** — anything written to SQLite there will disappear. Before going
live on a serverless host, swap the database:

1. Provision a hosted DB — easiest options:
   - **Postgres**: [Neon](https://neon.tech), [Supabase](https://supabase.com), or Vercel Postgres.
   - **MySQL**: PlanetScale.
2. Open `lib/db.ts`. The rest of the app only calls `insertLead()` and
   `listLeads()` — reimplement just those two functions against your new
   database client (e.g. `pg`, `@supabase/supabase-js`, or Prisma) and
   nothing else in the codebase needs to change.
3. Add your new connection string as an env var (e.g. `DATABASE_URL`) in
   your hosting provider's dashboard.

If you're deploying to a VPS/Docker with a persistent volume, the default
SQLite setup works as-is in production — just make sure the `data/`
directory is on a persistent disk/volume, not an ephemeral container layer.

### Wiring notifications

Set `LEAD_WEBHOOK_URL` to get a webhook POST (JSON) on every new lead —
point it at a Slack incoming webhook, a Zapier/n8n/Make workflow, or your
CRM's inbound webhook endpoint. Each API route already calls this
best-effort (it never blocks or fails the user's form submission).

For email notifications instead of/alongside a webhook, the cleanest path
is a transactional email API (Resend, Postmark, SendGrid) called from
inside the three `route.ts` files right after `insertLead(...)`.

---

## 5. Production hardening (before you go live)

- **Rate limiting**: `lib/rate-limit.ts` is in-memory, which is fine for a
  single server instance. If you deploy multiple instances/regions, swap it
  for a shared store (Upstash Redis is the easiest fit for serverless).
- **CAPTCHA**: the honeypot field (`website`) stops basic bots. For
  determined spam, add Google reCAPTCHA v3 or Cloudflare Turnstile to the
  three forms.
- **Env vars**: never commit `.env.local`. Set the real values in your
  hosting provider's environment variable settings.
- **HTTPS**: enforced automatically on Vercel/Netlify; if self-hosting,
  terminate TLS at a reverse proxy (Caddy/Nginx) or load balancer.

---

## 6. Deployment

### Option A — Vercel (recommended, fastest)

1. Push this project to a GitHub/GitLab/Bitbucket repo.
2. Go to [vercel.com/new](https://vercel.com/new) → import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Add every variable from `.env.example` under **Settings → Environment
   Variables** (Production + Preview).
5. **Important**: if you keep the default SQLite database, leads written in
   production will not persist (see §4). Swap to a hosted DB first, or
   accept that this deployment target is for demo/staging only.
6. Deploy. Add your custom domain under **Settings → Domains** and follow
   Vercel's DNS instructions (A/CNAME records with your domain registrar).

### Option B — VPS / Docker (keeps local SQLite persistence)

```bash
# On the server
git clone <your-repo-url> anb-advisors
cd anb-advisors
npm ci
npm run build
# Use a process manager so it restarts on crash/reboot:
npm install -g pm2
pm2 start npm --name "anb-advisors" -- start
pm2 save && pm2 startup
```

Put Nginx or Caddy in front for TLS + your domain:

```
# Caddy example (Caddyfile) — automatic HTTPS via Let's Encrypt
www.anbadvisors.com {
  reverse_proxy localhost:3000
}
```

Make sure the `data/` folder lives on a persistent volume/disk (not wiped
on redeploy) if you keep SQLite.

### Option C — Netlify

Same as Vercel: connect the repo, framework preset **Next.js**, set the same
environment variables, and again swap the database before relying on it in
production (Netlify Functions are also ephemeral).

---

## 7. Post-launch checklist

- [ ] Replace every placeholder in §3.
- [ ] Swap SQLite for a hosted DB if deploying serverless (§4).
- [ ] Set up GTM + GA4 (see **GTA&SEO.md**).
- [ ] Verify the site in Google Search Console and Bing Webmaster Tools,
      and submit `/sitemap.xml` in both.
- [ ] Test all 3 forms end-to-end in production (Book Consultation, Speak
      to a CA Free, Contact) and confirm leads land in your database/webhook.
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev) and
      [Lighthouse](https://developer.chrome.com/docs/lighthouse) against the
      live URL.
- [ ] Confirm the Privacy Policy has been reviewed by counsel.
