import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.companyName}.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
      <p className="font-mono text-xs uppercase tracking-widest2 text-brass-dark">Legal</p>
      <h1 className="mt-3 font-display text-3xl text-ink">Privacy Policy</h1>
      <p className="mt-4 text-sm text-graphite/60">
        Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}
      </p>

      <div className="mt-10 max-w-none space-y-6 leading-relaxed text-graphite/80">
        <p>
          <strong className="text-ink">This is placeholder legal copy.</strong> Replace this
          page with a Privacy Policy reviewed by qualified legal counsel before this site goes
          live. It should describe, at minimum: what personal data {siteConfig.companyName}{" "}
          collects (e.g. name, email, phone, and messages submitted through the Book
          Consultation, Speak to a CA Free, and Contact forms), how that data is stored and
          for how long, who it is shared with (e.g. any CRM, email, or webhook integrations
          you connect), how Google Analytics (GA4) and Google Tag Manager are used to collect
          anonymised usage data, and how a visitor can request access to, correction of, or
          deletion of their data.
        </p>
        <div>
          <h2 className="font-display text-xl text-ink">Information we collect</h2>
          <p className="mt-2">
            Name, email address, phone number, company name, and any message content submitted
            through our forms. We also collect standard analytics data (pages visited, device
            type, approximate location) via Google Analytics.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-ink">How we use it</h2>
          <p className="mt-2">
            To respond to consultation requests, provide the services requested, and improve
            this website. We do not sell personal data.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl text-ink">Contact</h2>
          <p className="mt-2">
            Questions about this policy can be sent to{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-brass-dark underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
