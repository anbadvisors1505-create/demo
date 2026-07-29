import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
// @ts-ignore
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { GTMHeadScript, GTMBodyNoScript } from "@/components/GoogleTagManager";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E1512",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.companyName} | Strategic Finance & Corporate Advisory`,
    template: `%s | ${siteConfig.companyName}`,
  },
  description: siteConfig.description,
  keywords: [
    "strategic finance advisory",
    "corporate advisory firm",
    "virtual CFO services India",
    "M&A advisory",
    "business valuation services",
    "IPO readiness advisory",
    "cross-border investment structuring",
    "financial due diligence",
    "GST and tax compliance advisory",
    "CA consultation free",
  ],
  authors: [{ name: siteConfig.companyName, url: siteConfig.url }],
  creator: siteConfig.companyName,
  publisher: siteConfig.companyName,
  applicationName: siteConfig.companyName,
  category: "Finance",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.companyName,
    title: `${siteConfig.companyName} | Strategic Finance & Corporate Advisory`,
    description: siteConfig.description,
    images: [
      {
        // TODO: replace with a real 1200x630 social share image at this path
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.companyName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.companyName} | Strategic Finance & Corporate Advisory`,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
    // TODO: replace with the real X/Twitter @handle
    site: "@anbadvisors",
  },
  verification: {
    // TODO: paste verification codes from each search console
    google: "google-site-verification-code",
    other: {
      "msvalidate.01": ["bing-site-verification-code"],
    },
  },
};

function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.companyName,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}/og-image.jpg`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phoneHref,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.line1,
      addressLocality: siteConfig.address.line2,
      addressCountry: siteConfig.address.country,
    },
    areaServed: "Worldwide",
    priceRange: "$$",
    sameAs: [siteConfig.social.linkedin, siteConfig.social.X].filter(Boolean),
    founder: {
      "@type": "Organization",
      name: siteConfig.companyName,
    },
    foundingDate: "2026",
    serviceType: [
      "Virtual CFO Services",
      "Mergers & Acquisitions Advisory",
      "Business Valuation",
      "Financial Due Diligence",
      "IPO Advisory",
      "Cross-Border Investment Structuring",
      "GST & Tax Compliance",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <head>
        <GTMHeadScript />
        <OrganizationJsonLd />
      </head>
      <body className="bg-paper text-graphite antialiased">
        <GTMBodyNoScript />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
