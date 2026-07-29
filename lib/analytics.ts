/**
 * ============================================================
 *  ANALYTICS HELPERS — GTM / GA4 event tracking
 * ------------------------------------------------------------
 *  All tracking is routed through the GTM dataLayer so a single
 *  GTM container can fan events out to GA4, Ads, LinkedIn, etc.
 *  See GTA&SEO.md → "Event tracking map" for the full list of
 *  events this file fires and how to wire them in GTM/GA4.
 * ============================================================
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

type AnalyticsEvent =
  | "cta_click"
  | "book_consultation_open"
  | "book_consultation_submit"
  | "book_consultation_success"
  | "speak_to_ca_click"
  | "speak_to_ca_submit"
  | "speak_to_ca_success"
  | "contact_form_submit"
  | "contact_form_success"
  | "form_error"
  | "nav_click"
  | "whatsapp_click"
  | "phone_click"
  | "loading_screen_complete";

export function trackEvent(
  event: AnalyticsEvent,
  params: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...params,
    event_timestamp: new Date().toISOString(),
  });
}
