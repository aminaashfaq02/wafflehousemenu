import { Link } from "@tanstack/react-router";
import { Mail, Facebook, Instagram, Youtube, FileText, ChevronRight, MapPin, Clock, ShieldCheck } from "lucide-react";
import { SiteLogo } from "@/components/site-logo";
import { CENTRAL_MENU_CATEGORIES } from "@/data/centralMenuData";

const menuLinks = [
  { label: "Full Menu & Prices", href: "/menu" },
  { label: "Nutrition & Calories", href: "/nutrition" },
  { label: "Allergen Information", href: "/allergens" },
  { label: "Dietary Options Guide", href: "/dietary" },
  { label: "Breakfast Menu Guide", href: "/breakfast" },
  { label: "Copycat Diner Recipes", href: "/recipes" },
  { label: "Deals & Promotions", href: "/deals" },
  { label: "13 Menu Categories", href: "/categories" },
];

const visitLinks = [
  { label: "1,900+ Restaurant Locations", href: "/locations" },
  { label: "Reservations & Seating", href: "/reservations" },
  { label: "Delivery & Takeout Guide", href: "/delivery" },
  { label: "Gift Cards & Balance Check", href: "/gift-cards" },
  { label: "Catering & Group Platters", href: "/catering" },
  { label: "24/7 Diner Operating Hours", href: "/hours" },
  { label: "FEMA Waffle House Index", href: "/locations#waffle-house-index" },
];

const trustLinks = [
  { label: "About This Project", href: "/about" },
  { label: "Editorial Methodology", href: "/methodology" },
  { label: "Editorial Standards & Team", href: "/editors" },
  { label: "Database Verification Log", href: "/updates" },
  { label: "Diner Journal & Blog", href: "/blog" },
  { label: "Frequently Asked Questions", href: "/faq" },
  { label: "Contact & Corrections", href: "/contact" },
  { label: "HTML Sitemap", href: "/sitemap" },
];

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={href as any}
      className="group relative inline-flex text-xs text-white/70 transition-colors hover:text-primary py-0.5"
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
        />
      </span>
    </Link>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#08090B] text-white border-t border-white/10 font-sans">
      {/* Accent gold top bar */}
      <div aria-hidden className="h-1 w-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500" />

      <div className="container-editorial py-16 lg:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Column 1 — Brand & Editorial Info */}
          <div className="lg:col-span-4 space-y-4">
            <SiteLogo light={true} />

            <p className="max-w-sm text-xs leading-relaxed text-white/70">
              An independent, comprehensive reference guide dedicated to organizing Waffle House menu prices, verified nutrition facts, calorie counts, diner recipes, and 1,900+ restaurant location directories across 25 U.S. states.
            </p>

            <div className="pt-1">
              <a
                href="/waffle-house-menu-nutritionals.pdf"
                download
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 px-3.5 py-2 text-xs text-primary font-bold transition-colors border border-white/10"
              >
                <FileText className="h-4 w-4 text-primary" />
                <span>Download Printable Menu PDF</span>
              </a>
            </div>

            <div className="pt-2 text-[11px] text-white/50 space-y-1">
              <p>📍 1,900+ Diners · 25 US States · 24/7 Service</p>
              <p>🍴 13 Menu Categories · 125+ Verified Items</p>
            </div>
          </div>

          {/* Column 2 — Menu & Dining */}
          <nav className="lg:col-span-3 space-y-3" aria-label="Menu & Nutrition Navigation">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Menu &amp; Nutrition
            </h3>
            <ul className="space-y-1.5 pt-1">
              {menuLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — Plan a Visit */}
          <nav className="lg:col-span-2 space-y-3" aria-label="Visit Planning Navigation">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Plan a Visit
            </h3>
            <ul className="space-y-1.5 pt-1">
              {visitLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4 — Resources & Trust */}
          <nav className="lg:col-span-3 space-y-3" aria-label="Trust & Editorial Information">
            <h3 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-primary">
              Editorial &amp; Trust
            </h3>
            <ul className="space-y-1.5 pt-1">
              {trustLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </div>

      {/* Bottom Bar & Legal Disclaimer */}
      <div className="border-t border-white/10 bg-[#050607] py-6 text-xs text-white/50">
        <div className="container-editorial flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] max-w-xl text-white/50">
            © {year} Waffle House Menu Guide. An independent informational consumer reference. Not affiliated with, endorsed by, or sponsored by Waffle House, Inc. All trademarks and brand names are property of their respective owners.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-white/60">
            <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <span>·</span>
            <Link to="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
            <span>·</span>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
