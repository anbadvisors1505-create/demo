# GTA&SEO.md — SEO, GTM & GA4 setup guide

This file covers two things: (1) how to make this site rank well across
Google, Bing and DuckDuckGo, and (2) how to connect Google Tag Manager (GTM)
and Google Analytics 4 (GA4).

---

## Part 1 — SEO

### What's already built in

- **Metadata** (`app/layout.tsx`): title template, meta description,
  keywords, canonical URL, Open Graph + Twitter card tags, robots directives.
- **Structured data**: a `ProfessionalService` JSON-LD block describing the
  firm, its services, and contact details — this is what lets Google show
  rich results (knowledge panel eligibility, sitelinks, etc.).
- **`sitemap.xml`** — auto-generated at `app/sitemap.ts`, served at
  `/sitemap.xml`.
- **`robots.txt`** — auto-generated at `app/robots.ts`, served at
  `/robots.txt`, with explicit `allow` rules for `Googlebot`, `Bingbot`, and
  `DuckDuckBot`.
- **Semantic HTML**: proper heading hierarchy (`h1` in the hero, `h2` per
  section, `h3` per card), landmark elements (`<header>`, `<main>`,
  `<footer>`), and labelled form fields for accessibility (which is also an
  SEO/ranking signal).
- **Performance**: `next/font` self-hosts and preloads fonts (no
  render-blocking third-party font requests), images use Next's
  AVIF/WebP-first pipeline, and animations respect
  `prefers-reduced-motion`.
- **Mobile responsiveness**: tested across phone/tablet/desktop breakpoints
  — this is a hard requirement for Google's mobile-first indexing.

### What you need to do

1. **Google Search Console**
   - Go to https://search.google.com/search-console → Add property → enter
     your domain.
   - Verify using the **HTML tag** method: copy the `content="..."` value
     into `metadata.verification.google` in `app/layout.tsx`, then
     redeploy, then click "Verify".
   - Under **Sitemaps**, submit `https://www.anbadvisors.in/sitemap.xml`.
   - Use **URL Inspection** to request indexing for the homepage once live.

2. **Bing Webmaster Tools** (this also covers most of DuckDuckGo — DuckDuckGo
   sources a large share of its organic results from Bing's index)
   - Go to https://www.bing.com/webmasters → Add your site.
   - Fastest path: use the **"Import from Google Search Console"** option
     (one click, once GSC is verified) — otherwise verify with the same
     HTML-tag method, pasting the code into
     `metadata.verification.other["msvalidate.01"]` in `app/layout.tsx`.
   - Submit the same sitemap URL.

3. **DuckDuckGo directly**
   - DuckDuckGo doesn't have a separate submission console the way
     Google/Bing do. It crawls the web itself (DuckDuckBot, already allowed
     in `robots.txt`) and also blends in Bing results — so a verified Bing
     Webmaster Tools listing plus a crawlable, well-linked site is the main
     lever here. You can check DuckDuckGo's live view of your site any time
     by searching `site:anbadvisors.in` on duckduckgo.com.

4. **Business/local listings** — for a professional services firm, also
   claim/verify:
   - Google Business Profile (https://business.google.com)
   - Bing Places for Business

5. **Content & backlinks** (ongoing, not one-time)
   - Publish articles/insights relevant to your services (e.g. "IPO
     readiness checklist for Indian startups", "Cross-border structuring
     for foreign investors") — thin marketing sites with no fresh content
     tend to plateau in rankings. Consider adding a `/insights` or `/blog`
     route later.
   - Get listed on legitimate directories (ICAI-affiliated directories,
     industry bodies, Crunchbase-style investor directories) for backlinks.
   - Keep NAP (Name, Address, Phone) consistent everywhere it appears
     online — inconsistent details hurt local SEO.

6. **Before/after launch, test with:**
   - https://search.google.com/test/rich-results — validates the JSON-LD.
   - https://pagespeed.web.dev — Core Web Vitals.
   - https://www.bing.com/webmasters/url-inspection — Bing's equivalent of
     URL Inspection.

---

## Part 2 — Connecting GTM and GA4

### How this project is wired

- `components/GoogleTagManager.tsx` — injects the GTM head script + body
  `<noscript>` fallback, but **only when `NEXT_PUBLIC_GTM_ID` is set** to a
  real container ID (it silently no-ops on the placeholder `GTM-XXXXXXX`, so
  nothing loads until you configure it).
- `components/GoogleAnalytics.tsx` — an optional **direct** GA4 loader
  (`gtag.js`), for teams that want GA4 without going through GTM. It
  auto-disables if GTM is active, to avoid double-counting.
- `lib/analytics.ts` — a `trackEvent()` helper that pushes structured
  events into `window.dataLayer`. Already wired into every important
  interaction (see event map below).

### Recommended setup: GTM (with GA4 configured *inside* GTM)

This is the standard, most flexible setup — one container, many tags.

1. **Create a GTM container**
   - Go to https://tagmanager.google.com → Create Account → Container
     (type: Web).
   - Copy the container ID (looks like `GTM-XXXXXXX`).

2. **Add it to this project**
   - Set `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` in `.env.local` (dev) and in your
     hosting provider's environment variables (production).
   - Redeploy. Open the site and check DevTools → Network for a request to
     `googletagmanager.com/gtm.js` to confirm it loaded.

3. **Add a GA4 Configuration tag inside GTM**
   - In GTM: **Tags → New → Tag Configuration → Google Analytics: GA4
     Configuration**.
   - Paste your GA4 **Measurement ID** (from https://analytics.google.com →
     Admin → Data Streams → your web stream → `G-XXXXXXXXXX`).
   - Trigger: **All Pages**.
   - Save, then click **Preview** in GTM, browse your site, and confirm the
     tag fires and GA4 DebugView (Admin → DebugView in GA4) shows events.

4. **Add GA4 Event tags for the events this site already sends**

   | dataLayer event | Fired when | Suggested GA4 event name |
   |---|---|---|
   | `book_consultation_submit` | Book Consultation form submitted | `generate_lead` |
   | `book_consultation_success` | Book Consultation succeeded | `book_consultation_success` |
   | `speak_to_ca_click` | "Speak to a CA Free" clicked anywhere | `cta_click` |
   | `speak_to_ca_submit` | Speak to a CA form submitted | `generate_lead` |
   | `speak_to_ca_success` | Speak to a CA succeeded | `speak_to_ca_success` |
   | `contact_form_submit` | Contact form submitted | `generate_lead` |
   | `contact_form_success` | Contact form succeeded | `contact_form_success` |
   | `form_error` | Any form validation/server error | `form_error` |
   | `cta_click` | Book Consultation / hero CTA clicks | `cta_click` |
   | `nav_click` | Header nav / logo / footer link clicks | — (optional, for engagement analysis) |
   | `phone_click` | Phone number clicked | `phone_click` |
   | `whatsapp_click` | WhatsApp link clicked (if you wire one up) | `whatsapp_click` |
   | `loading_screen_complete` | 3D loading screen finishes | — (optional, perf/UX analysis) |

   For each row: **Trigger** = Custom Event with the exact `dataLayer` event
   name in the left column; **Tag** = GA4 Event tag pointing at your GA4
   Configuration tag, with the Event Name in the right column. Add
   `event_timestamp` and any other pushed keys as Data Layer Variables if
   you want them as GA4 event parameters.

5. **Mark key conversions in GA4**
   - Admin → Events → toggle **Mark as conversion** for
     `generate_lead` (and any of `book_consultation_success` /
     `speak_to_ca_success` / `contact_form_success` you want tracked
     separately).

6. **Publish** the GTM container (top-right **Submit** button) once you've
   verified everything in Preview mode.

### Alternative: direct GA4 without GTM

If you'd rather skip GTM entirely:
- Leave `NEXT_PUBLIC_GTM_ID` as the placeholder (`GTM-XXXXXXX`) so the GTM
  component stays disabled.
- Set `NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX` — `components/GoogleAnalytics.tsx`
  will then load `gtag.js` directly.
- Note: with this path, the rich `dataLayer` events pushed by
  `lib/analytics.ts` won't automatically become GA4 events — you'd need to
  either also call `gtag('event', ...)` directly, or (recommended) just use
  GTM as described above, since it's built to consume exactly this
  `dataLayer` shape.

### Privacy / consent note

If you serve visitors in the EU/UK or anywhere else with cookie-consent
requirements, add a consent banner (e.g. via GTM's built-in Consent Mode)
before these tags fire for those users, and update the Privacy Policy
placeholder in `app/privacy-policy/page.tsx` accordingly.
