import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  Search,
  X,
  FileText,
  Truck,
  Utensils,
  Percent,
  Calendar,
  Phone,
  Tag,
} from "lucide-react";
import { CENTRAL_MENU_CATEGORIES } from "@/data/centralMenuData";
import { SiteLogo } from "@/components/site-logo";
import { blogPosts } from "@/data/blogPosts";

interface Props {
  overHero?: boolean;
}

const nutritionLinks = [
  { label: "Nutrition & Calories", href: "/nutrition" },
  { label: "Calorie Counter Guide", href: "/nutrition#calorie-guide" },
  { label: "Full Nutrition Chart", href: "/nutrition#chart" },
  { label: "Allergen Guide", href: "/allergens" },
  { label: "Dietary Options", href: "/dietary" },
  { label: "Download Nutrition PDF", href: "/waffle-house-menu-nutritionals.pdf", download: true },
];

const keyStates = [
  { name: "Georgia", slug: "georgia" },
  { name: "Florida", slug: "florida" },
  { name: "North Carolina", slug: "north-carolina" },
  { name: "South Carolina", slug: "south-carolina" },
  { name: "Alabama", slug: "alabama" },
  { name: "Tennessee", slug: "tennessee" },
  { name: "Texas", slug: "texas" },
  { name: "Virginia", slug: "virginia" },
  { name: "Ohio", slug: "ohio" },
  { name: "Mississippi", slug: "mississippi" },
  { name: "Kentucky", slug: "kentucky" },
  { name: "Louisiana", slug: "louisiana" },
];

const moreLinks = [
  { label: "Delivery & Takeout", href: "/delivery", icon: Truck },
  { label: "Catering & Group Orders", href: "/catering", icon: Utensils },
  { label: "Happy Hour & Value Guide", href: "/happy-hour", icon: Percent },
  { label: "Hours & Visit Guide", href: "/hours", icon: null },
  { label: "Deals & Promotions", href: "/deals", icon: null },
  { label: "FAQ", href: "/faq", icon: null },
  { label: "About", href: "/about", icon: null },
  { label: "Contact", href: "/contact", icon: null },
  { label: "Methodology", href: "/methodology", icon: null },
];

export function SiteHeader({ overHero = false }: Props) {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const [q, setQ] = useState("");
  const [dateDesktop, setDateDesktop] = useState("");
  const [dateMobile, setDateMobile] = useState("");
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date();
    setDateDesktop(
      today.toLocaleDateString("en-US", {
        weekday: "short",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    );
    setDateMobile(
      today.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    );
  }, []);

  const openDd = (name: string) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setActiveDropdown(name);
  };
  const closeDd = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setActiveDropdown(null), 150);
  };
  const toggleMobile = (key: string) =>
    setMobileExpanded((p) => ({ ...p, [key]: !p[key] }));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const v = q.trim();
    if (v) {
      setOpen(false);
      navigate({ to: "/search", search: { q: v } });
    }
  };

  const topBlogs = blogPosts.slice(0, 8);

  return (
    <header className="fixed inset-x-0 top-0 z-50 font-sans">

      {/* ═══════════════════════════════════════════
          TOP INFO BAR
          Desktop: Center Centered Date Line, full desktop
          Mobile/Tablet: Nicely arranged Date + Deals + About + Contact + PDF
          ═══════════════════════════════════════════ */}
      <div className="bg-[#050607] border-b border-white/10 py-1.5 px-4 relative">
        <div className="container-editorial flex items-center justify-between text-[11px] relative min-h-[22px]">
          
          {/* Centered Date Line on Desktop */}
          <div className="hidden lg:flex absolute inset-x-0 top-1/2 -translate-y-1/2 items-center justify-center pointer-events-none">
            <div className="flex items-center gap-1.5 font-semibold text-white/90">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              <span>{dateDesktop || "Waffle House Menu Guide"}</span>
              <span className="text-amber-400 font-bold ml-1">· 24/7 Open</span>
            </div>
          </div>

          {/* Left Side: PDF link on desktop, Date on mobile/tablet */}
          <div className="flex items-center gap-2">
            <a
              href="/waffle-house-menu-nutritionals.pdf"
              download
              className="hidden lg:flex items-center gap-1.5 text-white/60 hover:text-primary transition-colors font-medium"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Download Nutrition PDF</span>
            </a>
            
            {/* Mobile/Tablet Date Display */}
            <div className="flex lg:hidden items-center gap-1.5 text-white/85 font-semibold">
              <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
              <span>{dateMobile || "Menu Guide"}</span>
              <span className="text-amber-400 font-bold hidden sm:inline">· 24/7 Open</span>
            </div>
          </div>

          {/* Right Side: Desktop Quick Navigation Links & Mobile Action Buttons */}
          <div className="flex items-center gap-2.5 relative z-10">
            {/* Desktop Quick Nav Links (Dot-separated style like reference) */}
            <div className="hidden lg:flex items-center gap-2 text-white/70 text-[11px] font-medium mr-1">
              <Link to="/about" className="hover:text-primary transition-colors">About</Link>
              <span className="text-white/30">·</span>
              <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <span className="text-white/30">·</span>
              <Link to="/updates" className="hover:text-primary transition-colors">Updates</Link>
              <span className="text-white/30">·</span>
              <Link to="/deals" className="hover:text-primary transition-colors">Deals</Link>
              <span className="text-white/30">·</span>
              <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </div>

            {/* Mobile / Tablet Action Buttons */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                to="/deals"
                className="flex items-center gap-1 rounded-full bg-primary hover:bg-amber-400 px-2.5 py-0.5 font-bold text-black transition-colors"
              >
                <Tag className="h-2.5 w-2.5" />
                <span>Deals</span>
              </Link>
              <Link
                to="/about"
                className="text-white/80 hover:text-primary transition-colors font-bold px-1 py-0.5 text-[10px]"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-1 rounded-full border border-white/30 bg-white/10 hover:bg-white/20 px-2.5 py-0.5 font-bold text-white transition-colors"
              >
                <Phone className="h-2.5 w-2.5" />
                Contact
              </Link>
              <a
                href="/waffle-house-menu-nutritionals.pdf"
                download
                className="flex items-center gap-1 text-white/55 hover:text-primary transition-colors text-[10px] ml-1"
              >
                <FileText className="h-3 w-3" />
                PDF
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MAIN NAV BAR
          ═══════════════════════════════════════════ */}
      <div className="border-b-2 border-primary bg-[#0B0C0E]/95 backdrop-blur-md shadow-lg">
        <div className="container-editorial flex h-[62px] items-center gap-3">

          {/* Logo */}
          <SiteLogo light />

          {/* ── DESKTOP NAV ── */}
          <nav aria-label="Primary" className="hidden lg:block ml-2">
            <ul className="flex items-center gap-0.5 text-[13px] font-semibold">

              {/* Home */}
              <li>
                <Link
                  to="/"
                  activeOptions={{ exact: true }}
                  className="rounded-full px-2.5 py-1.5 text-white/85 hover:bg-white/10 hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>

              {/* ── MENU ── */}
              <li
                className="relative"
                onMouseEnter={() => openDd("menu")}
                onMouseLeave={closeDd}
              >
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-white/85 hover:bg-white/10 hover:text-primary transition-colors"
                >
                  Menu
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === "menu" ? "rotate-180 text-primary" : ""}`} />
                </Link>
                {activeDropdown === "menu" && (
                  <div
                    onMouseEnter={() => openDd("menu")}
                    onMouseLeave={closeDd}
                    className="absolute left-0 top-full pt-1 z-50 w-[270px]"
                  >
                    <div className="rounded-2xl border border-border bg-white shadow-2xl overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2.5 bg-amber-50 border-b border-border/50">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">13 Categories</span>
                        <Link to="/menu" onClick={() => setActiveDropdown(null)} className="text-[11px] font-bold text-primary hover:underline">Full Menu →</Link>
                      </div>
                      <ul className="py-1">
                        {CENTRAL_MENU_CATEGORIES.map((c) => (
                          <li key={c.id}>
                            <Link
                              to={c.href as any}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-4 py-[7px] text-[13px] font-medium text-foreground hover:bg-amber-50 hover:text-amber-700 transition-colors"
                            >
                              {c.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>

              {/* ── NUTRITION ── */}
              <li
                className="relative"
                onMouseEnter={() => openDd("nutrition")}
                onMouseLeave={closeDd}
              >
                <Link
                  to="/nutrition"
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-white/85 hover:bg-white/10 hover:text-primary transition-colors"
                >
                  Nutrition
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === "nutrition" ? "rotate-180 text-primary" : ""}`} />
                </Link>
                {activeDropdown === "nutrition" && (
                  <div
                    onMouseEnter={() => openDd("nutrition")}
                    onMouseLeave={closeDd}
                    className="absolute left-0 top-full pt-1 z-50 w-[250px]"
                  >
                    <div className="rounded-2xl border border-border bg-white shadow-2xl overflow-hidden">
                      <div className="px-4 py-2.5 bg-amber-50 border-b border-border/50">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Nutrition &amp; Health Info</span>
                      </div>
                      <ul className="py-1">
                        {nutritionLinks.map((nl) => (
                          <li key={nl.href}>
                            {nl.download ? (
                              <a
                                href={nl.href}
                                download
                                onClick={() => setActiveDropdown(null)}
                                className="block px-4 py-[7px] text-[13px] font-medium text-primary hover:bg-amber-50 hover:text-amber-700 transition-colors"
                              >
                                {nl.label}
                              </a>
                            ) : (
                              <Link
                                to={nl.href as any}
                                onClick={() => setActiveDropdown(null)}
                                className="block px-4 py-[7px] text-[13px] font-medium text-foreground hover:bg-amber-50 hover:text-amber-700 transition-colors"
                              >
                                {nl.label}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>

              {/* ── BREAKFAST (Direct Link) ── */}
              <li>
                <Link
                  to="/breakfast"
                  className="rounded-full px-2.5 py-1.5 text-white/85 hover:bg-white/10 hover:text-primary transition-colors"
                >
                  Breakfast
                </Link>
              </li>

              {/* ── CATERING (Direct Link) ── */}
              <li>
                <Link
                  to="/catering"
                  className="rounded-full px-2.5 py-1.5 text-white/85 hover:bg-white/10 hover:text-primary transition-colors"
                >
                  Catering
                </Link>
              </li>

              {/* ── LOCATIONS ── */}
              <li
                className="relative"
                onMouseEnter={() => openDd("locations")}
                onMouseLeave={closeDd}
              >
                <Link
                  to="/locations"
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-white/85 hover:bg-white/10 hover:text-primary transition-colors"
                >
                  Locations
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === "locations" ? "rotate-180 text-primary" : ""}`} />
                </Link>
                {activeDropdown === "locations" && (
                  <div
                    onMouseEnter={() => openDd("locations")}
                    onMouseLeave={closeDd}
                    className="absolute left-0 top-full pt-1 z-50 w-[280px]"
                  >
                    <div className="rounded-2xl border border-border bg-white shadow-2xl overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2.5 bg-amber-50 border-b border-border/50">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">2,100+ Locations · 25 States</span>
                        <Link to="/locations" onClick={() => setActiveDropdown(null)} className="text-[11px] font-bold text-primary hover:underline">All →</Link>
                      </div>
                      <ul className="py-1 grid grid-cols-2">
                        {keyStates.map((st) => (
                          <li key={st.slug}>
                            <Link
                              to={`/locations/${st.slug}` as any}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-4 py-[7px] text-[13px] font-medium text-foreground hover:bg-amber-50 hover:text-amber-700 transition-colors"
                            >
                              {st.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <div className="px-4 py-2 border-t border-border/40">
                        <Link to="/locations" onClick={() => setActiveDropdown(null)} className="text-[11px] font-bold text-primary hover:underline">
                          Browse All 25 States →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </li>

              {/* ── DEALS ── */}
              <li>
                <Link
                  to="/deals"
                  className="rounded-full px-2.5 py-1.5 text-white/85 hover:bg-white/10 hover:text-primary transition-colors"
                >
                  Deals
                </Link>
              </li>

              {/* ── BLOG ── */}
              <li
                className="relative"
                onMouseEnter={() => openDd("blog")}
                onMouseLeave={closeDd}
              >
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-white/85 hover:bg-white/10 hover:text-primary transition-colors"
                >
                  Blog
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === "blog" ? "rotate-180 text-primary" : ""}`} />
                </Link>
                {activeDropdown === "blog" && (
                  <div
                    onMouseEnter={() => openDd("blog")}
                    onMouseLeave={closeDd}
                    className="absolute left-0 top-full pt-1 z-50 w-[300px]"
                  >
                    <div className="rounded-2xl border border-border bg-white shadow-2xl overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2.5 bg-amber-50 border-b border-border/50">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Guides &amp; Articles</span>
                        <Link to="/blog" onClick={() => setActiveDropdown(null)} className="text-[11px] font-bold text-primary hover:underline">All →</Link>
                      </div>
                      <ul className="py-1">
                        {topBlogs.map((p) => (
                          <li key={p.slug}>
                            <Link
                              to="/blog/$slug"
                              params={{ slug: p.slug }}
                              onClick={() => setActiveDropdown(null)}
                              className="block px-4 py-[7px] text-[13px] font-medium text-foreground hover:bg-amber-50 hover:text-amber-700 transition-colors leading-snug"
                            >
                              {p.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>

              {/* ── MORE ── */}
              <li
                className="relative"
                onMouseEnter={() => openDd("more")}
                onMouseLeave={closeDd}
              >
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-white/85 hover:bg-white/10 hover:text-primary transition-colors"
                >
                  More
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === "more" ? "rotate-180 text-primary" : ""}`} />
                </button>
                {activeDropdown === "more" && (
                  <div
                    onMouseEnter={() => openDd("more")}
                    onMouseLeave={closeDd}
                    className="absolute right-0 top-full pt-1 z-50 w-[240px]"
                  >
                    <div className="rounded-2xl border border-border bg-white shadow-2xl overflow-hidden">
                      <div className="px-4 py-2.5 bg-amber-50 border-b border-border/50">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Services &amp; Pages</span>
                      </div>
                      <ul className="py-1">
                        {moreLinks.map((ml) => (
                          <li key={ml.href}>
                            <Link
                              to={ml.href as any}
                              onClick={() => setActiveDropdown(null)}
                              className="flex items-center gap-2 px-4 py-[7px] text-[13px] font-medium text-foreground hover:bg-amber-50 hover:text-amber-700 transition-colors"
                            >
                              {ml.icon && <ml.icon className="h-4 w-4 text-primary shrink-0" />}
                              {ml.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </nav>

          {/* ── DESKTOP SEARCH (always visible) ── */}
          <form
            role="search"
            aria-label="Search the menu"
            onSubmit={handleSearch}
            className="ml-auto hidden lg:flex"
          >
            <div className="relative flex h-9 w-[210px] xl:w-[240px] items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md transition-all focus-within:border-primary focus-within:bg-white/15">
              <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-white/60" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search menu, prices…"
                className="h-full w-full bg-transparent pl-8 pr-14 text-[12px] text-white placeholder:text-white/45 focus:outline-none"
              />
              <button
                type="submit"
                className="btn-primary absolute right-1 top-1/2 h-7 -translate-y-1/2 rounded-full px-3 text-[11px] font-bold"
              >
                Go
              </button>
            </div>
          </form>

          {/* ── MOBILE HAMBURGER ── */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-auto grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 text-white hover:bg-white/10 lg:hidden transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          MOBILE DRAWER
          ═══════════════════════════════════════════ */}
      {open && (
        <nav
          aria-label="Mobile Navigation"
          className="border-t border-border bg-white text-foreground lg:hidden max-h-[86vh] overflow-y-auto shadow-2xl"
        >
          <div className="px-4 py-4 space-y-3">

            {/* Date + Contact pill row */}
            <div className="flex items-center justify-between gap-2 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
                <Calendar className="h-3.5 w-3.5 text-primary shrink-0" />
                <span>{dateMobile || "Today"}</span>
                <span className="text-amber-600 font-bold">· 24/7 Open</span>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Deals — mobile top */}
                <Link
                  to="/deals"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1 rounded-full bg-primary hover:bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-black transition-colors"
                >
                  <Tag className="h-2.5 w-2.5" />
                  Deals
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-1 rounded-full border border-foreground/30 bg-foreground/10 hover:bg-foreground/20 px-2 py-0.5 text-[10px] font-bold text-foreground transition-colors"
                >
                  <Phone className="h-2.5 w-2.5" />
                  Contact
                </Link>
              </div>
            </div>

            {/* Mobile Search */}
            <form role="search" onSubmit={handleSearch} className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search menu, calories, prices…"
                className="h-10 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm focus:border-primary focus:outline-none"
              />
            </form>

            {/* ── 1. Menu ── */}
            <div className="rounded-xl border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => toggleMobile("menu")}
                className="flex w-full items-center justify-between px-4 py-3 text-left font-bold text-sm bg-surface hover:bg-amber-50 transition-colors"
              >
                <span>🍴 Menu</span>
                <ChevronDown className={`h-4 w-4 text-primary transition-transform ${mobileExpanded["menu"] ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded["menu"] && (
                <div className="border-t border-border bg-white">
                  <Link to="/menu" onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-xs font-bold text-primary bg-amber-50 border-b border-border/50 hover:underline">
                    Browse Full Menu →
                  </Link>
                  {CENTRAL_MENU_CATEGORIES.map((c) => (
                    <Link
                      key={c.id}
                      to={c.href as any}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-foreground border-b border-border/25 last:border-0 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ── 2. Nutrition ── */}
            <div className="rounded-xl border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => toggleMobile("nutrition")}
                className="flex w-full items-center justify-between px-4 py-3 text-left font-bold text-sm bg-surface hover:bg-amber-50 transition-colors"
              >
                <span>🥗 Nutrition</span>
                <ChevronDown className={`h-4 w-4 text-primary transition-transform ${mobileExpanded["nutrition"] ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded["nutrition"] && (
                <div className="border-t border-border bg-white">
                  {nutritionLinks.map((nl) =>
                    nl.download ? (
                      <a
                        key={nl.href}
                        href={nl.href}
                        download
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm font-medium text-primary border-b border-border/25 last:border-0 hover:bg-amber-50 transition-colors"
                      >
                        {nl.label}
                      </a>
                    ) : (
                      <Link
                        key={nl.href}
                        to={nl.href as any}
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm font-medium text-foreground border-b border-border/25 last:border-0 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                      >
                        {nl.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Direct Quick Pills Row for Mobile */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link
                to="/breakfast"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface py-2 px-3 text-xs font-bold text-foreground hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                🍳 Breakfast
              </Link>
              <Link
                to="/catering"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-surface py-2 px-3 text-xs font-bold text-foreground hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                🚚 Catering
              </Link>
            </div>

            {/* ── 3. Locations ── */}
            <div className="rounded-xl border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => toggleMobile("locations")}
                className="flex w-full items-center justify-between px-4 py-3 text-left font-bold text-sm bg-surface hover:bg-amber-50 transition-colors"
              >
                <span>📍 Locations</span>
                <ChevronDown className={`h-4 w-4 text-primary transition-transform ${mobileExpanded["locations"] ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded["locations"] && (
                <div className="border-t border-border bg-white">
                  <Link to="/locations" onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-xs font-bold text-primary bg-amber-50 border-b border-border/50 hover:underline">
                    All 1,900+ Locations (25 States) →
                  </Link>
                  {keyStates.map((st) => (
                    <Link
                      key={st.slug}
                      to={`/locations/${st.slug}` as any}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-foreground border-b border-border/25 last:border-0 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    >
                      {st.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ── 4. Blog ── */}
            <div className="rounded-xl border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => toggleMobile("blog")}
                className="flex w-full items-center justify-between px-4 py-3 text-left font-bold text-sm bg-surface hover:bg-amber-50 transition-colors"
              >
                <span>📖 Blog &amp; Guides</span>
                <ChevronDown className={`h-4 w-4 text-primary transition-transform ${mobileExpanded["blog"] ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded["blog"] && (
                <div className="border-t border-border bg-white">
                  <Link to="/blog" onClick={() => setOpen(false)}
                    className="block px-4 py-2.5 text-xs font-bold text-primary bg-amber-50 border-b border-border/50 hover:underline">
                    All Articles →
                  </Link>
                  {topBlogs.map((p) => (
                    <Link
                      key={p.slug}
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-foreground border-b border-border/25 last:border-0 hover:bg-amber-50 hover:text-amber-700 transition-colors leading-snug"
                    >
                      {p.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ── 5. More ── */}
            <div className="rounded-xl border border-border overflow-hidden">
              <button
                type="button"
                onClick={() => toggleMobile("more")}
                className="flex w-full items-center justify-between px-4 py-3 text-left font-bold text-sm bg-surface hover:bg-amber-50 transition-colors"
              >
                <span>⋯ More</span>
                <ChevronDown className={`h-4 w-4 text-primary transition-transform ${mobileExpanded["more"] ? "rotate-180" : ""}`} />
              </button>
              {mobileExpanded["more"] && (
                <div className="border-t border-border bg-white divide-y divide-border/25">
                  {moreLinks.map((ml) => (
                    <Link
                      key={ml.href}
                      to={ml.href as any}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-foreground hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    >
                      {ml.icon && <ml.icon className="h-4 w-4 text-primary shrink-0" />}
                      {ml.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>
        </nav>
      )}
    </header>
  );
}
