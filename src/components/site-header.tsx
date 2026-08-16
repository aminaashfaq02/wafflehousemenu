import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X, FileText, ChevronRight, MapPin, Sparkles, BookOpen, HeartHandshake, Info, Truck, Utensils, Percent } from "lucide-react";
import { CENTRAL_MENU_CATEGORIES } from "@/data/centralMenuData";
import { SiteLogo } from "@/components/site-logo";

interface Props {
  /** When true, header starts transparent over a dark hero and turns solid on scroll. */
  overHero?: boolean;
}

export function SiteHeader({ overHero = false }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [q, setQ] = useState("");
  const menuTimer = useRef<number | null>(null);
  const blogTimer = useRef<number | null>(null);
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
    if (blogTimer.current) window.clearTimeout(blogTimer.current);
    setBlogOpen(false);
    setMenuOpen(true);
  };
  const closeMega = () => {
    if (menuTimer.current) window.clearTimeout(menuTimer.current);
    menuTimer.current = window.setTimeout(() => setMenuOpen(false), 120);
  };

  const openBlog = () => {
    if (blogTimer.current) window.clearTimeout(blogTimer.current);
    if (menuTimer.current) window.clearTimeout(menuTimer.current);
    setMenuOpen(false);
    setBlogOpen(true);
  };
  const closeBlog = () => {
    if (blogTimer.current) window.clearTimeout(blogTimer.current);
    blogTimer.current = window.setTimeout(() => setBlogOpen(false), 120);
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
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-primary bg-[#0B0C0E]/95 backdrop-blur-md shadow-lg transition-all duration-300 font-sans">
      <div className="container-editorial flex h-[72px] items-center gap-4 xl:gap-6">
        <SiteLogo light={true} />

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1 text-xs xl:text-sm">
            <li>
              <Link
                to="/"
                activeOptions={{ exact: true }}
                className="rounded-full px-2.5 xl:px-3.5 py-2 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
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
                className="inline-flex items-center gap-1 rounded-full px-2.5 xl:px-3.5 py-2 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
              >
                Menu
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </Link>
            </li>

            <li>
              <Link
                to="/nutrition"
                className="rounded-full px-2.5 xl:px-3.5 py-2 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
              >
                Nutrition
              </Link>
            </li>

            <li>
              <Link
                to="/locations"
                className="rounded-full px-2.5 xl:px-3.5 py-2 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
              >
                Locations
              </Link>
            </li>

            {/* Blog with Dropdown */}
            <li className="relative" onMouseEnter={openBlog} onMouseLeave={closeBlog}>
              <Link
                to="/blog"
                onFocus={openBlog}
                onBlur={closeBlog}
                aria-expanded={blogOpen}
                aria-haspopup="true"
                className="inline-flex items-center gap-1 rounded-full px-2.5 xl:px-3.5 py-2 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
              >
                Blog
                <ChevronDown
                  className={`h-3 w-3 transition-transform ${blogOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </Link>
            </li>

            <li>
              <Link
                to="/delivery"
                className="rounded-full px-2.5 xl:px-3.5 py-2 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
              >
                Delivery
              </Link>
            </li>

            <li>
              <Link
                to="/catering"
                className="rounded-full px-2.5 xl:px-3.5 py-2 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
              >
                Catering
              </Link>
            </li>

            <li>
              <Link
                to="/happy-hour"
                className="rounded-full px-2.5 xl:px-3.5 py-2 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
              >
                Happy Hour
              </Link>
            </li>

            <li>
              <Link
                to="/about"
                className="rounded-full px-2.5 xl:px-3.5 py-2 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="rounded-full px-2.5 xl:px-3.5 py-2 font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
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
          className="ml-auto hidden xl:block"
        >
          <div className="relative flex h-10 w-[240px] items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all focus-within:border-primary">
            <Search
              className="pointer-events-none absolute left-3.5 h-3.5 w-3.5 text-white/70"
              aria-hidden
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search menu, prices…"
              className="h-full w-full bg-transparent pl-9 pr-16 text-xs text-white placeholder:text-white/60 focus:outline-none"
            />
            <button
              type="submit"
              className="btn-primary absolute right-1 top-1/2 h-8 -translate-y-1/2 px-2.5 text-[11px] font-semibold"
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

      {/* Menu Mega dropdown (desktop) */}
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
                  <p className="font-display text-sm font-bold leading-tight group-hover:text-primary transition-colors text-foreground">
                    {c.name}
                  </p>
                  <p className="text-[11px] text-ink-soft mt-0.5">{c.itemCount} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Mega dropdown (desktop) */}
      <div
        onMouseEnter={openBlog}
        onMouseLeave={closeBlog}
        className={[
          "absolute inset-x-0 top-full hidden overflow-hidden border-b border-border bg-white shadow-2xl transition-all duration-200 ease-out lg:block",
          blogOpen
            ? "pointer-events-auto opacity-100 translate-y-0 visible"
            : "pointer-events-none opacity-0 -translate-y-2 invisible",
        ].join(" ")}
      >
        <div className="container-editorial grid grid-cols-12 gap-8 py-8">
          <div className="col-span-4 border-r border-border pr-6 space-y-3">
            <span className="chip">Editorial Hub</span>
            <h3 className="font-display text-2xl font-bold leading-tight text-foreground">
              Waffle House Guides &amp; Articles
            </h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Explore in-depth articles covering menu prices, waffles, hashbrown modifiers, budget meals, bottomless beverages, and restaurant culture.
            </p>
            <div className="pt-2">
              <Link
                to="/blog"
                onClick={() => setBlogOpen(false)}
                className="btn-primary py-2 px-4 text-xs font-semibold"
              >
                See All Guides &amp; Articles →
              </Link>
            </div>
          </div>
          <div className="col-span-8 grid grid-cols-2 gap-4">
            <Link
              to="/blog/$slug"
              params={{ slug: "best-breakfast-items" }}
              onClick={() => setBlogOpen(false)}
              className="p-4 rounded-xl border border-border bg-surface hover:border-primary transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Breakfast Guide</span>
              <h4 className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors mt-1">
                7 Best Waffle House Breakfast Plates
              </h4>
              <p className="text-xs text-ink-soft line-clamp-2 mt-1">
                From the All-Star Special to T-Bone &amp; Eggs, ranked by value and calories.
              </p>
            </Link>

            <Link
              to="/blog/$slug"
              params={{ slug: "waffles-guide" }}
              onClick={() => setBlogOpen(false)}
              className="p-4 rounded-xl border border-border bg-surface hover:border-primary transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Waffles Guide</span>
              <h4 className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors mt-1">
                A Complete Guide to the House Waffle
              </h4>
              <p className="text-xs text-ink-soft line-clamp-2 mt-1">
                Pecan, chocolate chip, peanut butter, and custom waffle topping hacks.
              </p>
            </Link>

            <Link
              to="/blog/$slug"
              params={{ slug: "hashbrowns-decoded" }}
              onClick={() => setBlogOpen(false)}
              className="p-4 rounded-xl border border-border bg-surface hover:border-primary transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Hashbrowns</span>
              <h4 className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors mt-1">
                Hashbrowns Decoded: Smothered &amp; Covered
              </h4>
              <p className="text-xs text-ink-soft line-clamp-2 mt-1">
                All 8 official hashbrown modifiers explained with prices and calories.
              </p>
            </Link>

            <Link
              to="/blog/$slug"
              params={{ slug: "budget-meals-under-ten" }}
              onClick={() => setBlogOpen(false)}
              className="p-4 rounded-xl border border-border bg-surface hover:border-primary transition-all group"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Value Meals</span>
              <h4 className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors mt-1">
                6 Filling Meals Under $10
              </h4>
              <p className="text-xs text-ink-soft line-clamp-2 mt-1">
                Beat inflation with complete diner plates that satisfy for under ten dollars.
              </p>
            </Link>
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
                  <Link to="/nutrition" onClick={() => setOpen(false)} className="text-ink-soft hover:text-foreground">
                    Nutrition Table
                  </Link>
                </div>
              </div>

              {/* Group 2: Services & Ordering */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Services &amp; Ordering</span>
                </div>
                <ul className="mt-2 grid grid-cols-3 gap-1.5 text-xs">
                  <li>
                    <Link to="/delivery" onClick={() => setOpen(false)} className="block rounded-lg border border-border p-2.5 text-center hover:border-primary hover:text-primary">
                      <Truck className="h-4 w-4 mx-auto mb-1 text-primary" />
                      <span className="font-semibold block">Delivery</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/catering" onClick={() => setOpen(false)} className="block rounded-lg border border-border p-2.5 text-center hover:border-primary hover:text-primary">
                      <Utensils className="h-4 w-4 mx-auto mb-1 text-primary" />
                      <span className="font-semibold block">Catering</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/happy-hour" onClick={() => setOpen(false)} className="block rounded-lg border border-border p-2.5 text-center hover:border-primary hover:text-primary">
                      <Percent className="h-4 w-4 mx-auto mb-1 text-primary" />
                      <span className="font-semibold block">Happy Hour</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Group 3: Locations & Nutrition */}
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Locations &amp; Nutrition</span>
                </div>
                <ul className="mt-2 space-y-1 text-xs">
                  <li>
                    <Link to="/locations" onClick={() => setOpen(false)} className="block px-2.5 py-1.5 font-medium hover:text-primary">
                      📍 2,100+ Restaurant Locations Directory
                    </Link>
                  </li>
                  <li>
                    <Link to="/nutrition" onClick={() => setOpen(false)} className="block px-2.5 py-1.5 font-medium hover:text-primary">
                      🥗 Complete Nutrition &amp; Calorie Guide
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
                    <Link to="/blog/$slug" params={{ slug: "best-breakfast-items" }} onClick={() => setOpen(false)} className="block px-2.5 py-1.5 font-medium hover:text-primary">
                      📖 7 Best Breakfast Plates Ranked
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog/$slug" params={{ slug: "hashbrowns-decoded" }} onClick={() => setOpen(false)} className="block px-2.5 py-1.5 font-medium hover:text-primary">
                      📖 Hashbrown Modifiers Decoded
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
