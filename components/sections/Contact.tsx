"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig, areasOfInterest } from "@/lib/site-config";
import { SectionIntro } from "@/components/sections/Capabilities";
import { useModals } from "@/components/ModalProvider";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { openBookConsultation } = useModals();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    trackEvent("contact_form_submit");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Something went wrong.");

      setStatus("success");
      trackEvent("contact_form_success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      trackEvent("form_error", { form: "contact", message: String(err) });
    }
  }

  return (
    <section id="contact" className="relative bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionIntro
              light
              eyebrow="Contact"
              title="Talk to the desk"
              description="Tell us what's on your plate. We'll route it to the right person on the team."
            />

            <div className="mt-10 space-y-4 font-body text-sm">
              <a
                href={`mailto:${siteConfig.email}`}
                onClick={() => trackEvent("cta_click", { location: "contact", label: "email" })}
                className="flex items-center gap-3 text-paper/80 transition-colors hover:text-brass"
              >
                <span aria-hidden>✉️</span> {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phoneHref}`}
                onClick={() => trackEvent("phone_click", { location: "contact" })}
                className="flex items-center gap-3 text-paper/80 transition-colors hover:text-brass"
              >
                <span aria-hidden>📞</span> {siteConfig.phoneDisplay}
              </a>
              <a
                href={siteConfig.url}
                onClick={() => trackEvent("nav_click", { target: "website_url" })}
                className="flex items-center gap-3 text-paper/80 transition-colors hover:text-brass"
              >
                <span aria-hidden>🌐</span> {siteConfig.url.replace("https://", "")}
              </a>
            </div>

            <Button variant="outline" className="mt-9 border-paper/25 text-paper hover:border-brass hover:bg-paper/5 hover:text-paper" onClick={openBookConsultation}>
              Schedule Consultation
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-paper/10 bg-paper/[0.04] p-6 sm:p-8"
          >
            {status === "success" ? (
              <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                <p className="font-display text-xl text-brass">Message sent.</p>
                <p className="mt-2 text-sm text-paper/60">
                  Thanks for reaching out — we&apos;ll be in touch shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField label="Name" name="name" required autoComplete="name" />
                  <TextField label="Email" name="email" type="email" required autoComplete="email" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <TextField label="Phone" name="phone" type="tel" autoComplete="tel" />
                  <div>
                    <label htmlFor="ct-area" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper/50">
                      Area of interest
                    </label>
                    <select
                      id="ct-area"
                      name="areaOfInterest"
                      defaultValue=""
                      className="w-full rounded-lg border border-paper/15 bg-paper/[0.06] px-3.5 py-2.5 text-sm text-paper focus:border-brass focus:outline-none"
                    >
                      <option value="" disabled className="bg-ink">
                        Select one
                      </option>
                      {areasOfInterest.map((area) => (
                        <option key={area} value={area} className="bg-ink">
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="ct-message" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper/50">
                    Message
                  </label>
                  <textarea
                    id="ct-message"
                    name="message"
                    required
                    rows={4}
                    className="w-full rounded-lg border border-paper/15 bg-paper/[0.06] px-3.5 py-2.5 text-sm text-paper placeholder:text-paper/30 focus:border-brass focus:outline-none"
                    placeholder="Tell us what's on your plate."
                  />
                </div>

                {status === "error" && (
                  <p role="alert" className="text-sm text-red-300">
                    {errorMsg}
                  </p>
                )}

                <Button type="submit" disabled={status === "submitting"} className="w-full">
                  {status === "submitting" ? "Sending…" : "Send message"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TextField({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={`ct-${name}`} className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-paper/50">
        {label}
      </label>
      <input
        id={`ct-${name}`}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-paper/15 bg-paper/[0.06] px-3.5 py-2.5 text-sm text-paper placeholder:text-paper/30 focus:border-brass focus:outline-none"
      />
    </div>
  );
}
