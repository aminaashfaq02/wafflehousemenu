import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X, FileText, ChevronRight, MapPin, Sparkles, BookOpen, HeartHandshake, Info } from "lucide-react";
import { CENTRAL_MENU_CATEGORIES } from "@/data/centralMenuData";
import { SiteLogo } from "@/components/site-logo";

interface Props {
  /** When true, header starts transparent over a dark hero and turns solid on scroll. */
  overHero?: boolean;
}

const primaryNav = [
  { to: "/" as const, label: "Home", exact: true },
  { to: "/menu" as const, label: "Menu" },
  { to: "/nutrition" as const, label: "Nutrition" },
  { to: "/locations" as const, label: "Locations" },
  { to: "/blog" as const, label: "Blog" },
  { to: "/about" as const, label: "About" },
  { to: "/contact" as const, label: "Contact" },
];

export function SiteHeader({ overHero = false }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [q, setQ] = useState("");
  const menuTimer = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!overHero) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  const openMega = () => {
    if (menuTimer.current) window.clearTimeout(menuTimer.current);
    setMenuOpen(true);
  };
  const closeMega = () => {
    if (menuTimer.current) window.clearTimeout(menuTimer.current);
    menuTimer.current = window.setTimeout(() => setMenuOpen(false), 120);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = q.trim();
    if (v) {
      setOpen(false);
      navigate({ to: "/search", search: { q: v } });
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-primary bg-[#0B0C0E]/95 backdrop-blur-md shadow-lg transition-all duration-300">
      <div className="container-editorial flex h-[72px] items-center gap-6">
        <SiteLogo light={true} />

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            <li>
              <Link
                to="/"
                activeOptions={{ exact: true }}
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
              >
                Home
              </Link>
            </li>

            {/* Menu with Mega Dropdown */}
            <li className="relative" onMouseEnter={openMega} onMouseLeave={closeMega}>
              <Link
                to="/menu"
                onFocus={openMega}
                onBlur={closeMega}
                aria-expanded={menuOpen}
                aria-haspopup="true"
                className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
              >
                Menu
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </Link>
            </li>

            <li>
              <Link
                to="/nutrition"
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
              >
                Nutrition
              </Link>
            </li>

            <li>
              <Link
                to="/locations"
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
              >
                Locations
              </Link>
            </li>

            <li>
              <Link
                to="/blog"
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
              >
                Blog
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="rounded-full px-3.5 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Inline search input (desktop) */}
        <form
          role="search"
          aria-label="Search the menu"
          onSubmit={submit}
          className="ml-auto hidden lg:block"
        >
          <div className="relative flex h-11 w-[280px] items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all focus-within:border-primary xl:w-[320px]">
            <Search
              className="pointer-events-none absolute left-4 h-4 w-4 text-white/70"
              aria-hidden
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search waffles, prices…"
              className="h-full w-full bg-transparent pl-11 pr-20 text-sm text-white placeholder:text-white/60 focus:outline-none"
            />
            <button
              type="submit"
              className="btn-primary absolute right-1 top-1/2 h-9 -translate-y-1/2 px-3 text-xs font-semibold"
            >
              Search
            </button>
          </div>
        </form>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mega dropdown (desktop) */}
      <div
        onMouseEnter={openMega}
        onMouseLeave={closeMega}
        className={[
          "absolute inset-x-0 top-full hidden overflow-hidden border-b border-border bg-white shadow-2xl transition-all duration-200 ease-out lg:block",
          menuOpen
            ? "pointer-events-auto opacity-100 translate-y-0 visible"
            : "pointer-events-none opacity-0 -translate-y-2 invisible",
        ].join(" ")}
      >
        <div className="container-editorial grid grid-cols-12 gap-8 py-8">
          <div className="col-span-3 border-r border-border pr-6 space-y-4">
            <span className="chip">Menu Directory</span>
            <h3 className="font-display text-2xl font-bold leading-tight text-foreground">
              Waffle House Menu &amp; Prices
            </h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Explore 74 menu items across 13 categories with estimated prices, calories, and nutrition details.
            </p>
            <div className="pt-2 space-y-2">
              <Link
                to="/menu"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
              >
                Browse Full Menu Hub →
              </Link>
              <a
                href="/waffle-house-menu-nutritionals.pdf"
                download
                className="flex items-center gap-2 text-xs font-semibold text-ink-soft hover:text-primary"
              >
                <FileText className="h-3.5 w-3.5 text-primary" /> Download Menu PDF
              </a>
            </div>
          </div>
          <div className="col-span-9 grid grid-cols-3 gap-3">
            {CENTRAL_MENU_CATEGORIES.map((c) => (
              <Link
                key={c.id}
                to={c.href as any}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-surface border border-transparent hover:border-border"
              >
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <img
                    src={c.image}
                    alt=""
                    loading="lazy"
                    width={100}
                    height={100}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold leading-tight group-hover:text-primary transition-colors">
                    {c.name}
                  </p>
                  <p className="text-[11px] text-ink-soft mt-0.5">{c.itemCount} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Structured Information Architecture) */}
      {open && (
        <nav aria-label="Mobile Navigation" className="border-t border-border bg-white text-foreground lg:hidden max-h-[85vh] overflow-y-auto font-sans shadow-2xl">
          <div className="container-editorial py-4 space-y-6">
            {/* Search Input */}
            <form role="search" onSubmit={submit} className="relative">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
              />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search menu, calories, guides…"
                className="h-11 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
              />
            </form>

            {/* Main Information Groups */}
            <div className="space-y-5">
              {/* Group 1: Menu & Prices */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Menu &amp; Prices</span>
                  <Link to="/menu" onClick={() => setOpen(false)} className="text-xs font-semibold text-foreground hover:text-primary">
                    View All →
                  </Link>
                </div>
                <ul className="mt-2 grid grid-cols-2 gap-1.5 text-xs">
                  {CENTRAL_MENU_CATEGORIES.map((c) => (
                    <li key={c.id}>
                      <Link
                        to={c.href as any}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-2.5 py-2 font-medium text-foreground hover:bg-surface hover:text-primary"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 pt-2 border-t border-dashed border-border/40 flex items-center justify-between text-xs px-2.5">
                  <a href="/waffle-house-menu-nutritionals.pdf" download className="text-primary font-semibold hover:underline flex items-center gap-1">
                    <FileText className="h-3 w-3" /> Menu PDF Reference
                  </a>
                  <Link to="/menu" hash="prices-heading" onClick={() => setOpen(false)} className="text-ink-soft hover:text-foreground">
                    Price Reference
                  </Link>
                </div>
              </div>

              {/* Group 2: Nutrition & Health */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Nutrition</span>
                  <Link to="/nutrition" onClick={() => setOpen(false)} className="text-xs font-semibold text-foreground hover:text-primary">
                    Nutrition Hub →
                  </Link>
                </div>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>
                    <Link to="/nutrition" onClick={() => setOpen(false)} className="block px-2.5 py-1.5 font-medium hover:text-primary">
                      Calories &amp; Macro Table
                    </Link>
                  </li>
                  <li>
                    <Link to="/nutrition" hash="allergens" onClick={() => setOpen(false)} className="block px-2.5 py-1.5 font-medium hover:text-primary">
                      Allergen &amp; Kitchen Disclosures
                    </Link>
                  </li>
                  <li>
                    <Link to="/nutrition" hash="protein" onClick={() => setOpen(false)} className="block px-2.5 py-1.5 font-medium hover:text-primary">
                      High-Protein Breakfast Selections
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Group 3: Locations & Plan a Visit */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Locations &amp; Plan a Visit</span>
                  <Link to="/locations" onClick={() => setOpen(false)} className="text-xs font-semibold text-foreground hover:text-primary">
                    Find Stores →
                  </Link>
                </div>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>
                    <Link to="/locations" onClick={() => setOpen(false)} className="block px-2.5 py-1.5 font-medium hover:text-primary">
                      2,100+ Restaurant Locations Directory
                    </Link>
                  </li>
                  <li>
                    <Link to="/locations" onClick={() => setOpen(false)} className="block px-2.5 py-1.5 font-medium hover:text-primary">
                      Hours, Addresses &amp; Phone Numbers
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Group 4: Blog & Guides */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Blog &amp; Guides</span>
                  <Link to="/blog" onClick={() => setOpen(false)} className="text-xs font-semibold text-foreground hover:text-primary">
                    All Guides →
                  </Link>
                </div>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>
                    <Link to="/blog" search={{ category: "Menu & Prices" }} onClick={() => setOpen(false)} className="block px-2.5 py-1.5 font-medium hover:text-primary">
                      Menu &amp; Price Guides
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" search={{ category: "Nutrition & Calories" }} onClick={() => setOpen(false)} className="block px-2.5 py-1.5 font-medium hover:text-primary">
                      Nutrition &amp; Calorie Explainers
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Group 5: More Information & Trust */}
              <div className="pt-2 border-t border-border">
                <span className="text-[11px] font-bold uppercase tracking-wider text-ink-soft block mb-2">More Information</span>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <Link to="/about" onClick={() => setOpen(false)} className="block px-2.5 py-1 text-ink-soft hover:text-foreground">About Guide</Link>
                  <Link to="/methodology" onClick={() => setOpen(false)} className="block px-2.5 py-1 text-ink-soft hover:text-foreground">Methodology</Link>
                  <Link to="/faq" onClick={() => setOpen(false)} className="block px-2.5 py-1 text-ink-soft hover:text-foreground">FAQ</Link>
                  <Link to="/contact" onClick={() => setOpen(false)} className="block px-2.5 py-1 text-ink-soft hover:text-foreground">Contact</Link>
                  <Link to="/privacy-policy" onClick={() => setOpen(false)} className="block px-2.5 py-1 text-ink-soft hover:text-foreground">Privacy</Link>
                  <Link to="/terms" onClick={() => setOpen(false)} className="block px-2.5 py-1 text-ink-soft hover:text-foreground">Terms</Link>
                  <Link to="/disclaimer" onClick={() => setOpen(false)} className="block px-2.5 py-1 text-ink-soft hover:text-foreground">Disclaimer</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
