import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

/**
 * Google Tag Manager — head script.
 * Place <GTMHeadScript /> as high as possible inside <head>.
 * Replace NEXT_PUBLIC_GTM_ID in .env with your real container ID (GTM-XXXXXXX).
 * Setup walkthrough: GTA&SEO.md → "Connecting GTM".
 */
export function GTMHeadScript() {
  const { gtmId } = siteConfig;
  if (!gtmId || gtmId === "GTM-XXXXXXX") return null;

  return (
    <Script id="gtm-head" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `}
    </Script>
  );
}

/**
 * Google Tag Manager — noscript fallback.
 * Place <GTMBodyNoScript /> immediately after the opening <body> tag.
 */
export function GTMBodyNoScript() {
  const { gtmId } = siteConfig;
  if (!gtmId || gtmId === "GTM-XXXXXXX") return null;

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
