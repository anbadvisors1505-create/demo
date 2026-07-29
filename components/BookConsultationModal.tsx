"use client";

import { FormEvent, useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

export default function BookConsultationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    trackEvent("book_consultation_submit", { location: "modal" });

    try {
      const res = await fetch("/api/book-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      trackEvent("book_consultation_success", { location: "modal" });
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      trackEvent("form_error", { form: "book_consultation", message: String(err) });
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => setStatus("idle"), 300);
  }

  return (
    <Modal open={open} onClose={handleClose} labelledBy="book-consultation-title">
      <div className="p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-brass-dark">
              Schedule
            </p>
            <h2 id="book-consultation-title" className="mt-1 font-display text-2xl text-ink">
              Book a Consultation
            </h2>
            <p className="mt-2 max-w-sm text-sm text-graphite/70">
              Tell us a little about your business — we&apos;ll confirm a slot within one
              business day.
            </p>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close dialog"
            className="rounded-full p-1.5 text-graphite/50 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            ✕
          </button>
        </div>

        {status === "success" ? (
          <div className="rounded-xl border border-teal/30 bg-teal/5 p-6 text-center">
            <p className="font-display text-lg text-teal-dark">Request received.</p>
            <p className="mt-2 text-sm text-graphite/70">
              A member of the desk will reach out within one business day to confirm your slot.
            </p>
            <Button variant="outline" className="mt-5" onClick={handleClose} type="button">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot field — hidden from real users, catches bots */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <Field label="Name" name="name" required autoComplete="name" />
            <Field label="Email" name="email" type="email" required autoComplete="email" />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
            <Field label="Company (optional)" name="company" autoComplete="organization" />

            <div>
              <label htmlFor="bc-message" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-graphite/60">
                What do you need help with?
              </label>
              <textarea
                id="bc-message"
                name="message"
                rows={3}
                className="w-full rounded-lg border border-ink/10 bg-white/60 px-3.5 py-2.5 text-sm text-ink placeholder:text-graphite/40 focus:border-brass focus:outline-none"
                placeholder="A short line about your business and what's on your plate."
              />
            </div>

            {status === "error" && (
              <p role="alert" className="text-sm text-red-700">
                {errorMsg}
              </p>
            )}

            <Button type="submit" disabled={status === "submitting"} className="w-full">
              {status === "submitting" ? "Submitting…" : "Submit request"}
            </Button>

            <p className="text-center text-[11px] text-graphite/50">
              By submitting, you agree to be contacted by ANB Advisors LLP regarding your enquiry.
            </p>
          </form>
        )}
      </div>
    </Modal>
  );
}

function Field({
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
      <label htmlFor={`bc-${name}`} className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-graphite/60">
        {label}
      </label>
      <input
        id={`bc-${name}`}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-ink/10 bg-white/60 px-3.5 py-2.5 text-sm text-ink placeholder:text-graphite/40 focus:border-brass focus:outline-none"
      />
    </div>
  );
}
