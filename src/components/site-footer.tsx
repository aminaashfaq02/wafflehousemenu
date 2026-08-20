import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { SiteLogo } from "@/components/site-logo";

const menuLinks = [
  { label: "Full menu", to: "/menu" },
  { label: "Nutrition", to: "/nutrition" },
  { label: "Allergen filter", to: "/allergens" },
  { label: "Dietary guides", to: "/dietary" },
  { label: "Breakfast & Waffles", to: "/breakfast" },
  { label: "Catering", to: "/catering" },
  { label: "Copycat Recipes", to: "/recipes" },
];

const visitLinks = [
  { label: "All locations", to: "/locations" },
  { label: "Reservations", to: "/reservations" },
  { label: "Delivery & takeout", to: "/delivery" },
  { label: "Gift cards", to: "/gift-cards" },
  { label: "Deals & happy hour", to: "/deals" },
  { label: "24/7 Hours & services", to: "/hours" },
];

const legalLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" },
  { label: "Editorial Policy", to: "/editorial-policy" },
  { label: "Cookie Policy", to: "/cookie-policy" },
];

const aboutLinks = [
  { label: "About", to: "/about" },
  { label: "Methodology", to: "/methodology" },
  { label: "Blog", to: "/blog" },
  { label: "Updates", to: "/updates" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0C0E] text-white border-t border-white/10 font-sans text-sm">
      {/* Accent gold top bar */}
      <div aria-hidden className="h-1 w-full bg-gradient-to-r from-amber-500 via-primary to-amber-500" />

      <div className="container-editorial py-12 md:py-16 space-y-10">
        {/* Brand Summary & Meta Stats Line */}
        <div className="border-b border-white/10 pb-8 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <SiteLogo light={true} />
            <a
              href="/waffle-house-menu-nutritionals.pdf"
              download
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-bold"
            >
              <FileText className="h-3.5 w-3.5" />
              Download Printable Menu PDF
            </a>
          </div>

          <p className="text-xs sm:text-[13px] leading-relaxed text-white/80 max-w-3xl">
            An independent directory of Waffle House menu items, current prices, nutrition facts, allergen guides, and restaurant locations across the United States.
          </p>

          <p className="text-xs text-primary font-semibold">
            125+ menu items · 1,900+ locations · 25 states · menu last reviewed 19 August 2026.
          </p>
        </div>

        {/* 4 Clean Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Menu & nutrition */}
          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
              Menu &amp; nutrition
            </h3>
            <ul className="space-y-2 text-xs">
              {menuLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to as any}
                    className="text-white/70 hover:text-primary transition-colors inline-block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Plan a visit */}
          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
              Plan a visit
            </h3>
            <ul className="space-y-2 text-xs">
              {visitLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to as any}
                    className="text-white/70 hover:text-primary transition-colors inline-block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
              Legal
            </h3>
            <ul className="space-y-2 text-xs">
              {legalLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to as any}
                    className="text-white/70 hover:text-primary transition-colors inline-block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: About this site */}
          <div className="space-y-3">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.18em] text-white">
              About this site
            </h3>
            <ul className="space-y-2 text-xs">
              {aboutLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to as any}
                    className="text-white/70 hover:text-primary transition-colors inline-block"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-[11px] sm:text-xs leading-relaxed text-white/50">
            Independent reference. Not affiliated with, endorsed by or sponsored by Waffle House, Inc. Menu, price and hours details reflect the dates published above and may vary by store.
          </p>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Quick Links */}
      <div className="border-t border-white/10 bg-[#070809] py-5 text-xs text-white/50">
        <div className="container-editorial flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-white/60">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms</Link>
            <span>·</span>
            <Link to="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
            <span>·</span>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <p>© {year} Waffle House Menu USA</p>
        </div>
      </div>
    </footer>
  );
}
