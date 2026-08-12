import { Link } from "@tanstack/react-router";
import { Mail, Facebook, Instagram, Youtube } from "lucide-react";
import { SiteLogo } from "@/components/site-logo";

const quickLinks: { label: string; to: "/" | "/about" | "/menu" | "/nutrition" | "/contact" }[] = [
  { label: "Home", to: "/" },
  { label: "Full Menu", to: "/menu" },
  { label: "Nutrition & Calories", to: "/nutrition" },
  { label: "About Our Project", to: "/about" },
  { label: "Contact Us", to: "/contact" },
];

const popularCategories: { label: string; href: string }[] = [
  { label: "All-Star Special™", href: "/menu/all-star-special" },
  { label: "Waffles", href: "/menu/waffles" },
  { label: "Egg Breakfasts", href: "/menu/breakfast" },
  { label: "Toddle House® Omelets", href: "/menu/omelets" },
  { label: "Hashbrown Bowls", href: "/menu/hashbrown-bowls" },
  { label: "Breakfast Sandwiches", href: "/menu/breakfast-sandwiches" },
  { label: "Angus Burgers", href: "/menu/burgers" },
  { label: "Classic Dinners", href: "/menu/classic-dinners" },
];

const resourceLinks = [
  { label: "Editorial Methodology", href: "/methodology" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Editorial Policy", href: "/editorial-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "HTML Sitemap", href: "/sitemap" },
  { label: "Contact & Support", href: "/contact" },
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
  const target = href ?? to ?? "#";
  return (
    <a
      href={target}
      className="group relative inline-flex text-sm text-white/70 transition-colors hover:text-amber-400"
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
      className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-amber-400 hover:bg-amber-500 hover:text-black"
    >
      {children}
    </a>
  );
}

function PinterestIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0C5.4 0 0 5.4 0 12c0 5 3 9.3 7.4 11.1-.1-.9-.2-2.4 0-3.4.2-.9 1.5-5.8 1.5-5.8s-.4-.8-.4-1.9c0-1.8 1-3.2 2.4-3.2 1.1 0 1.7.8 1.7 1.8 0 1.1-.7 2.8-1 4.3-.3 1.3.6 2.4 2 2.4 2.3 0 4.1-2.5 4.1-6 0-3.1-2.3-5.3-5.5-5.3-3.7 0-5.9 2.8-5.9 5.7 0 1.1.4 2.3 1 3 .1.1.1.2.1.4-.1.4-.3 1.3-.4 1.5-.1.2-.2.3-.5.2-1.6-.8-2.6-3.1-2.6-5 0-4 2.9-7.7 8.4-7.7 4.4 0 7.9 3.2 7.9 7.4 0 4.4-2.8 7.9-6.6 7.9-1.3 0-2.5-.7-2.9-1.5l-.8 3c-.3 1.1-1 2.4-1.5 3.3 1.2.4 2.4.5 3.6.5 6.6 0 12-5.4 12-12S18.6 0 12 0z" />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0c0e] text-white border-t border-white/10">
      {/* Accent gold top bar */}
      <div aria-hidden className="h-1 w-full bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500" />

      <div className="container-editorial grid gap-12 py-16 md:grid-cols-12 md:gap-10">
        {/* Column 1 — Brand with New Food Logo */}
        <div className="md:col-span-4">
          <SiteLogo light={true} />

          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            An independent, high-quality food journal & recipe companion dedicated
            to exploring menu prices, nutrition information, calorie breakdowns, and
            dining guides for food lovers.
          </p>

          <a
            href="mailto:hello@wafflejournal.co"
            className="mt-5 inline-flex items-center gap-2 text-sm text-amber-400/90 transition-colors hover:text-amber-300 font-medium"
          >
            <Mail className="h-4 w-4" aria-hidden />
            hello@wafflejournal.co
          </a>

          <div className="mt-6 flex items-center gap-2.5">
            <SocialIcon href="https://facebook.com" label="Facebook">
              <Facebook className="h-4 w-4" aria-hidden />
            </SocialIcon>
            <SocialIcon href="https://pinterest.com" label="Pinterest">
              <PinterestIcon />
            </SocialIcon>
            <SocialIcon href="https://instagram.com" label="Instagram">
              <Instagram className="h-4 w-4" aria-hidden />
            </SocialIcon>
            <SocialIcon href="https://youtube.com" label="YouTube">
              <Youtube className="h-4 w-4" aria-hidden />
            </SocialIcon>
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <nav className="md:col-span-2" aria-label="Quick links">
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            Navigation
          </h3>
          <ul className="mt-5 space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.label}>
                <FooterLink to={l.to}>{l.label}</FooterLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Column 3 — Popular Categories (No Emojis) */}
        <nav className="md:col-span-3" aria-label="Popular categories">
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            Menu Categories
          </h3>
          <ul className="mt-5 space-y-2.5">
            {popularCategories.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  className="group relative inline-flex items-center text-sm text-white/70 transition-colors hover:text-amber-400"
                >
                  <span className="relative">
                    {c.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-amber-400 transition-transform duration-300 group-hover:scale-x-100"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="md:col-span-3" aria-label="Resources">
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.22em] text-amber-400">
            Information &amp; Legal
          </h3>
          <ul className="mt-5 space-y-2.5">
            {resourceLinks.map((l) => (
              <li key={l.label}>
                <FooterLink href={l.href}>{l.label}</FooterLink>
              </li>
            ))}
            <li>
              <a
                href="/sitemap.xml"
                className="group relative inline-flex text-sm text-white/70 transition-colors hover:text-amber-400"
              >
                <span className="relative">
                  XML Sitemap
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-amber-400 transition-transform duration-300 group-hover:scale-x-100"
                  />
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-white/10 bg-black/40">
        <div className="container-editorial flex flex-col items-start justify-between gap-3 py-6 text-xs leading-relaxed text-white/50 md:flex-row md:items-center">
          <p>© {year} Waffle House Menu — Independent Food & Culinary Review Journal.</p>
          <p className="max-w-xl md:text-right text-white/40">
            Disclaimer: An independent informational site. Not affiliated with or endorsed by Waffle House, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
