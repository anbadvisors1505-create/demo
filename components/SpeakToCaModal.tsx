"use client";

import { FormEvent, useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

export default function SpeakToCaModal({
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
    trackEvent("speak_to_ca_submit", { location: "modal" });

    try {
      const res = await fetch("/api/speak-to-ca", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      trackEvent("speak_to_ca_success", { location: "modal" });
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      trackEvent("form_error", { form: "speak_to_ca", message: String(err) });
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => setStatus("idle"), 300);
  }

  return (
    <Modal open={open} onClose={handleClose} labelledBy="speak-ca-title">
      <div className="p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-widest2 text-brass-dark">
              No charge
            </p>
            <h2 id="speak-ca-title" className="mt-1 font-display text-2xl text-ink">
              Speak to a CA — Free
            </h2>
            <p className="mt-2 max-w-sm text-sm text-graphite/70">
              Leave your number. A qualified chartered accountant from our desk will call you
              back — no charge for the first conversation.
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
            <p className="font-display text-lg text-teal-dark">Thanks — noted.</p>
            <p className="mt-2 text-sm text-graphite/70">
              A CA from our desk will call you back shortly.
            </p>
            <Button variant="outline" className="mt-5" onClick={handleClose} type="button">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div>
              <label htmlFor="ca-name" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-graphite/60">
                Name
              </label>
              <input
                id="ca-name"
                name="name"
                required
                autoComplete="name"
                className="w-full rounded-lg border border-ink/10 bg-white/60 px-3.5 py-2.5 text-sm text-ink placeholder:text-graphite/40 focus:border-brass focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="ca-phone" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-graphite/60">
                Phone
              </label>
              <input
                id="ca-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                className="w-full rounded-lg border border-ink/10 bg-white/60 px-3.5 py-2.5 text-sm text-ink placeholder:text-graphite/40 focus:border-brass focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="ca-email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-graphite/60">
                Email (optional)
              </label>
              <input
                id="ca-email"
                name="email"
                type="email"
                autoComplete="email"
                className="w-full rounded-lg border border-ink/10 bg-white/60 px-3.5 py-2.5 text-sm text-ink placeholder:text-graphite/40 focus:border-brass focus:outline-none"
              />
            </div>

            {status === "error" && (
              <p role="alert" className="text-sm text-red-700">
                {errorMsg}
              </p>
            )}

            <Button type="submit" disabled={status === "submitting"} className="w-full">
              {status === "submitting" ? "Sending…" : "Request a call back"}
            </Button>
          </form>
        )}
      </div>
    </Modal>
  );
}
