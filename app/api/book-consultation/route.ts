// import { NextRequest, NextResponse } from "next/server";
// import { nanoid } from "nanoid";
// import { bookConsultationSchema } from "@/lib/validation";
// import { insertLead } from "@/lib/db";
// import { rateLimit, hashIp } from "@/lib/rate-limit";
// import { siteConfig } from "@/lib/site-config";

// export const runtime = "nodejs";

// export async function POST(req: NextRequest) {
//   try {
//     const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
//     const limited = rateLimit(`book:${ip}`, 5, 60_000);
//     if (!limited.allowed) {
//       return NextResponse.json(
//         { ok: false, error: "Too many requests. Please try again in a minute." },
//         { status: 429 }
//       );
//     }

//     const body = await req.json();
//     const parsed = bookConsultationSchema.safeParse(body);

//     if (!parsed.success) {
//       return NextResponse.json(
//         { ok: false, error: parsed.error.issues[0]?.message || "Invalid submission." },
//         { status: 400 }
//       );
//     }

//     // Honeypot tripped — silently pretend success so bots move on.
//     if (parsed.data.website) {
//       return NextResponse.json({ ok: true });
//     }

//     const id = nanoid();
//     insertLead(id, {
//       type: "book_consultation",
//       name: parsed.data.name,
//       email: parsed.data.email,
//       phone: parsed.data.phone || undefined,
//       company: parsed.data.company || undefined,
//       message: parsed.data.message || undefined,
//       source: req.headers.get("referer") || undefined,
//       userAgent: req.headers.get("user-agent") || undefined,
//       ipHash: hashIp(ip),
//     });

//     // Optional: forward to a webhook (Slack/CRM/Zapier/n8n). Configure
//     // LEAD_WEBHOOK_URL in .env — see GUIDE.md → "Wiring notifications".
//     if (siteConfig.leadWebhookUrl) {
//       fetch(siteConfig.leadWebhookUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           type: "book_consultation",
//           id,
//           ...parsed.data,
//         }),
//       }).catch(() => {
//         /* best-effort — never block the user response on webhook delivery */
//       });
//     }

//     return NextResponse.json({ ok: true, id });
//   } catch (err) {
//     console.error("book-consultation error", err);
//     return NextResponse.json(
//       { ok: false, error: "Something went wrong. Please try again." },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { bookConsultationSchema } from "@/lib/validation";
import { insertLead } from "@/lib/db";
import { rateLimit, hashIp } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";
// Force Next.js to treat this route as purely dynamic.
// This prevents Next.js from evaluating the database logic during 'next build'.
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const limited = rateLimit(`book:${ip}`, 5, 60_000);
    if (!limited.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = bookConsultationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message || "Invalid submission." },
        { status: 400 }
      );
    }

    // Honeypot tripped — silently pretend success so bots move on.
    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const id = nanoid();
    insertLead(id, {
      type: "book_consultation",
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || undefined,
      company: parsed.data.company || undefined,
      message: parsed.data.message || undefined,
      source: req.headers.get("referer") || undefined,
      userAgent: req.headers.get("user-agent") || undefined,
      ipHash: hashIp(ip),
    });

    // Optional: forward to a webhook (Slack/CRM/Zapier/n8n). Configure
    // LEAD_WEBHOOK_URL in .env — see GUIDE.md → "Wiring notifications".
    if (siteConfig.leadWebhookUrl) {
      // Added await to ensure the runtime container stays alive long enough to send the fetch,
      // but wrapped inside a try/catch to maintain your "best-effort / never block user" logic.
      try {
        await fetch(siteConfig.leadWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "book_consultation",
            id,
            ...parsed.data,
          }),
        });
      } catch (webhookError) {
        /* best-effort — never block the user response on webhook delivery */
      }
    }

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("book-consultation error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
