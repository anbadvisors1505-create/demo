import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

/**
 * Direct GA4 (gtag.js) loader — use this if you want GA4 running
 * WITHOUT Google Tag Manager. If you're using GTM (recommended),
 * add GA4 as a tag inside the GTM container instead and leave this
 * component disabled (it auto-disables while NEXT_PUBLIC_GA4_ID is
 * still the placeholder). See GTA&SEO.md → "GTM vs direct GA4".
 */
export function GoogleAnalytics() {
  const { ga4Id, gtmId } = siteConfig;
  const gtmActive = gtmId && gtmId !== "GTM-XXXXXXX";
  const ga4Placeholder = !ga4Id || ga4Id === "G-XXXXXXXXXX";

  // Avoid double-counting: if GTM is active, GA4 should be configured
  // as a tag inside GTM, not loaded twice here.
  if (gtmActive || ga4Placeholder) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ga4Id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
