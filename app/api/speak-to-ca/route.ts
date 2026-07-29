import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { speakToCaSchema } from "@/lib/validation";
import { insertLead } from "@/lib/db";
import { rateLimit, hashIp } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const limited = rateLimit(`ca:${ip}`, 5, 60_000);
    if (!limited.allowed) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = speakToCaSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message || "Invalid submission." },
        { status: 400 }
      );
    }

    if (parsed.data.website) {
      return NextResponse.json({ ok: true });
    }

    const id = nanoid();
    insertLead(id, {
      type: "speak_to_ca",
      name: parsed.data.name,
      email: parsed.data.email || "not-provided@lead.local",
      phone: parsed.data.phone,
      source: req.headers.get("referer") || undefined,
      userAgent: req.headers.get("user-agent") || undefined,
      ipHash: hashIp(ip),
    });

    if (siteConfig.leadWebhookUrl) {
      fetch(siteConfig.leadWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "speak_to_ca", id, ...parsed.data }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("speak-to-ca error", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
