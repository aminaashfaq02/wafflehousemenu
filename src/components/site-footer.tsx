import { Link } from "@tanstack/react-router";
import { Mail, Facebook, Instagram, Youtube, FileText, ChevronRight } from "lucide-react";
import { SiteLogo } from "@/components/site-logo";
import { CENTRAL_MENU_CATEGORIES } from "@/data/centralMenuData";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Menu & Prices", to: "/menu" },
  { label: "Nutrition & Calories", to: "/nutrition" },
  { label: "Restaurant Locations", to: "/locations" },
  { label: "Menu Guides & Articles", to: "/blog" },
  { label: "Delivery & Takeout", to: "/delivery" },
  { label: "Catering Information", to: "/catering" },
  { label: "Happy Hour & Specials", to: "/happy-hour" },
  { label: "About This Guide", to: "/about" },
  { label: "Contact & Support", to: "/contact" },
];

const trustLinks = [
  { label: "Editorial Methodology", href: "/methodology" },
  { label: "Frequently Asked Questions", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Editorial Policy", href: "/editorial-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "HTML Sitemap", href: "/sitemap" },
];

function FooterLink({
  href,
  to,
  children,
}: {
  href?: string;
  to?: string;
  children: React.ReactNode;
}) {
  if (to) {
    return (
      <Link
        to={to as any}
        className="group relative inline-flex text-xs text-white/70 transition-colors hover:text-amber-400"
      >
        <span className="relative">
          {children}
          <span
            aria-hidden
            className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-amber-400 transition-transform duration-300 group-hover:scale-x-100"
          />
        </span>
      </Link>
    );
  }

  return (
    <a
      href={href ?? "#"}
      className="group relative inline-flex text-xs text-white/70 transition-colors hover:text-amber-400"
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-amber-400 transition-transform duration-300 group-hover:scale-x-100"
        />
      </span>
    </a>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-amber-400 hover:bg-amber-500 hover:text-black"
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0c0e] text-white border-t border-white/10 font-sans">
      {/* Accent gold top bar */}
      <div aria-hidden className="h-1 w-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500" />

      <div className="container-editorial grid gap-10 py-16 md:grid-cols-12 md:gap-8">
        {/* Column 1 — Brand & Editorial Info */}
        <div className="md:col-span-4 space-y-4">
          <SiteLogo light={true} />

          <p className="max-w-sm text-xs leading-relaxed text-white/70">
            An independent informational reference guide dedicated to organizing Waffle House menu prices, calorie counts, nutrition breakdowns, and restaurant location directories.
          </p>

          <div className="pt-1">
            <a
              href="/waffle-house-menu-nutritionals.pdf"
              download
              className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-semibold"
            >
              <FileText className="h-3.5 w-3.5" /> Download Printable Menu PDF
            </a>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <SocialIcon href="https://facebook.com" label="Facebook">
              <Facebook className="h-3.5 w-3.5" aria-hidden />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" label="Instagram">
              <Instagram className="h-3.5 w-3.5" aria-hidden />
            </SocialIcon>
            <SocialIcon href="https://youtube.com" label="YouTube">
              <Youtube className="h-3.5 w-3.5" aria-hidden />
            </SocialIcon>
          </div>
        </div>

        {/* Column 2 — Main Navigation */}
        <nav className="md:col-span-2" aria-label="Main Navigation">
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            Explore
          </h3>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <FooterLink to={l.to}>{l.label}</FooterLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 3 — 13 Menu Categories */}
        <nav className="md:col-span-3" aria-label="Menu Categories">
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            Menu Categories
          </h3>
          <ul className="mt-4 grid grid-cols-1 gap-1.5">
            {CENTRAL_MENU_CATEGORIES.slice(0, 8).map((c) => (
              <li key={c.id}>
                <FooterLink href={c.href}>{c.name}</FooterLink>
              </li>
            ))}
            <li>
              <FooterLink to="/menu">View All 13 Categories →</FooterLink>
            </li>
          </ul>
        </nav>

        {/* Column 4 — Resources & Legal */}
        <nav className="md:col-span-3" aria-label="Trust & Information">
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            Information &amp; Trust
          </h3>
          <ul className="mt-4 space-y-2">
            {trustLinks.map((l) => (
              <li key={l.label}>
                <FooterLink href={l.href}>{l.label}</FooterLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom Bar & Disclaimer */}
      <div className="border-t border-white/10 bg-[#07080a] py-6 text-xs text-white/50">
        <div className="container-editorial flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p>
            © {year} Waffle House Menu Guide. Independent informational publication. Not affiliated with Waffle House, Inc.
          </p>
          <div className="flex flex-wrap gap-4 text-white/60">
            <Link to="/privacy-policy" className="hover:text-amber-400">Privacy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-amber-400">Terms</Link>
            <span>•</span>
            <Link to="/disclaimer" className="hover:text-amber-400">Disclaimer</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-amber-400">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
