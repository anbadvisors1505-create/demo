import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-center sm:flex-row sm:px-8 sm:text-left lg:px-10">
        <p className="font-body text-xs text-paper/50">
          © {new Date().getFullYear()} {siteConfig.companyName} · Strategic Finance &amp;
          Corporate Advisory
        </p>
        <div className="flex items-center gap-5 font-body text-xs text-paper/50">
          <a href="#services" className="transition-colors hover:text-brass">
            Services
          </a>
          <a href="#about" className="transition-colors hover:text-brass">
            About
          </a>
          <a href="#contact" className="transition-colors hover:text-brass">
            Contact
          </a>
          {/* TODO: link to a real privacy policy page before launch */}
          <a href="/privacy-policy" className="transition-colors hover:text-brass">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
