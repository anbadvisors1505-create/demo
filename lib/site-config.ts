/**
 * ============================================================
 *  SITE CONFIG — single source of truth for placeholders
 *  Replace the values below (or the matching .env vars) before
 *  going live. See GUIDE.md → "Placeholder checklist".
 * ============================================================
 */

export const siteConfig = {
  companyName: "ANB Advisors LLP",
  shortName: "ANB",
  tagline: "Strategic finance, built for the next decision — not the last one.",
  description:
    "ANB Advisors LLP is a strategic finance and corporate advisory firm offering Virtual CFO services, M&A advisory, valuation, IPO readiness and cross-border structuring for founders, SMEs, HNIs and international investors.",

  // TODO: replace with the live production domain (no trailing slash)
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.anbadvisors.in",

  // TODO: replace with real contact details
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@anbadvisors.in",
  phoneDisplay: process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY || "+91 8334073848",
  phoneHref: process.env.NEXT_PUBLIC_CONTACT_PHONE_E164 || "+918334073848",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918334073848",

  address: {
    line1: "TODO: Office address line 1",
    line2: "TODO: Office address line 2, City, State, PIN",
    country: "India",
  },

  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/anb-advisors",
    X: process.env.NEXT_PUBLIC_TWITTER_URL || "https://x.com/anbadvisors",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  },

  // Analytics / tag placeholders — see GTA&SEO.md for setup instructions
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "GTM-MHSQC43W",
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "G-XXXXXXXXXX",

  // Optional: external booking calendar (Calendly / Cal.com). Leave blank to
  // use the built-in "Book a Consultation" modal + database instead.
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "",

  // Optional: forward form submissions to a webhook (Slack, CRM, Zapier, n8n…)
  leadWebhookUrl: process.env.LEAD_WEBHOOK_URL || "",

  stats: [
    { label: "Advisory since", value: "2026" },
    { label: "Transactions structured", value: "1+" },
    { label: "Cross-border mandates", value: "1 countries" },
    { label: "First consultation", value: "No charge" },
  ],

  aboutStats: [
    { label: "Transactions advised", value: "12+" },
    { label: "Countries covered", value: "1" },
    { label: "Years in practice", value: "1" },
    { label: "Active retainers", value: "1+" },
  ],
} as const;

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const capabilities = [
  {
    index: "01",
    title: "Corporate Finance",
    description:
      "M&A advisory, business valuation, financial due diligence and IPO advisory.",
  },
  {
    index: "02",
    title: "Strategic Finance",
    description:
      "Virtual CFO services, financial modeling and MIS reporting systems.",
  },
  {
    index: "03",
    title: "International Advisory",
    description:
      "Foreign investment advisory and cross-border investment structuring.",
  },
  {
    index: "04",
    title: "Tax & Compliance",
    description:
      "GST compliance, income tax advisory, accounting and regulatory support.",
  },
];

export const services = [
  {
    title: "Virtual CFO Services",
    description:
      "Strategic financial planning, budgeting, forecasting and investor reporting.",
  },
  {
    title: "Mergers & Acquisitions Advisory",
    description: "Deal structuring, transaction advisory and acquisition support.",
  },
  {
    title: "Business Valuation",
    description:
      "Independent valuation for fundraising, M&A and shareholder transactions.",
  },
  {
    title: "Financial Due Diligence",
    description: "Financial analysis for investors and acquisition transactions.",
  },
  {
    title: "IPO Advisory",
    description:
      "IPO readiness assessment and coordination with investment bankers.",
  },
  {
    title: "Financial Modeling",
    description: "Advanced financial models for startups and project financing.",
  },
  {
    title: "IND AS Implementation",
    description:
      "Transition support and financial reporting alignment with IND AS.",
  },
  {
    title: "Foreign Investment Advisory",
    description: "Advisory for foreign investors investing in India.",
  },
  {
    title: "Cross-Border Investment Structuring",
    description:
      "Structuring investments for international investors and global companies.",
  },
  {
    title: "HNI Advisory",
    description: "Financial structuring and investment guidance for high-net-worth individuals.",
  },
  {
    title: "GST & Tax Compliance",
    description: "GST registration, return filing and tax advisory.",
  },
  {
    title: "Income Tax Advisory",
    description: "Income tax return filing and tax planning support.",
  },
  {
    title: "Accounting & Bookkeeping",
    description: "Professional bookkeeping and preparation of financial statements.",
  },
  {
    title: "Bank Liaisoning",
    description: "Loan documentation, financing discussions and bank support.",
  },
  {
    title: "Project Reports for Bank Loans",
    description:
      "Preparation of detailed project reports and financial projections.",
  },
];

export const engagementStages = [
  {
    index: "01",
    title: "Discovery",
    description: "Understanding your business and financial objectives.",
  },
  {
    index: "02",
    title: "Financial Assessment",
    description: "Detailed analysis of financial statements and risks.",
  },
  {
    index: "03",
    title: "Strategic Plan",
    description: "Designing financial strategy and growth roadmap.",
  },
  {
    index: "04",
    title: "Implementation",
    description: "Execution support including advisory and compliance.",
  },
];

export const industries = [
  "Startups",
  "Real Estate",
  "E-commerce",
  "Technology",
  "Manufacturing",
  "Financial Services",
  "Service Sector Businesses",
  "International Businesses",
];

export const areasOfInterest = [
  "Virtual CFO Services",
  "M&A Advisory",
  "Business Valuation",
  "IPO Advisory",
  "Cross-Border Structuring",
  "Tax & Compliance",
  "Other",
] as const;
