import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { categories } from "@/data/menu";
import { SiteLogo } from "@/components/site-logo";

interface Props {
  /** When true, header starts transparent over a dark hero and turns solid on scroll. */
  overHero?: boolean;
}

const primaryNav = [
  { to: "/" as const, label: "Home", exact: true },
  { to: "/categories" as const, label: "Categories" },
  { to: "/locations" as const, label: "Locations" },
  { to: "/blog" as const, label: "Blog" },
  { to: "/nutrition" as const, label: "Nutrition" },
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

  const solid = scrolled || open || menuOpen;

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
    navigate({ to: "/search", search: { q: v } });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-primary bg-[#0B0C0E]/95 backdrop-blur-md shadow-lg transition-all duration-300">
      <div className="container-editorial flex h-[72px] items-center gap-6">
        <SiteLogo light={true} />

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

            {primaryNav.slice(1).map((n) => (
              <li key={n.label}>
                <Link
                  to={n.to}
                  activeOptions={{ exact: n.exact ?? false }}
                  className="rounded-full px-3.5 py-2 text-sm font-semibold text-white/90 transition-colors hover:bg-white/10 hover:text-primary"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Inline search input (desktop) */}
        <form
          role="search"
          aria-label="Search the menu"
          onSubmit={submit}
          className="ml-auto hidden lg:block"
        >
          <div className="relative flex h-11 w-[300px] items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all focus-within:border-primary xl:w-[360px]">
            <Search
              className="pointer-events-none absolute left-4 h-4 w-4 text-white/70"
              aria-hidden
            />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search waffles, All-Star, hashbrowns…"
              className="h-full w-full bg-transparent pl-11 pr-24 text-sm text-white placeholder:text-white/60 focus:outline-none"
            />
            <button
              type="submit"
              className="btn-primary absolute right-1 top-1/2 h-9 -translate-y-1/2 px-4 text-xs font-semibold"
            >
              Search
            </button>
          </div>
        </form>

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
          "absolute inset-x-0 top-full hidden overflow-hidden border-b border-border bg-white transition-all duration-200 ease-out lg:block",
          menuOpen
            ? "pointer-events-auto opacity-100 translate-y-0 visible"
            : "pointer-events-none opacity-0 -translate-y-2 invisible",
        ].join(" ")}
      >
        <div className="container-editorial grid grid-cols-12 gap-8 py-10">
          <div className="col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
              The Menu
            </p>
            <h3 className="mt-3 font-display text-2xl font-semibold leading-tight">
              Every plate, organized the way you order.
            </h3>
            <p className="mt-3 text-sm text-ink-soft">
              Verified U.S. prices, calorie counts and ingredient notes for every category.
            </p>
            <Link
              to="/menu"
              onClick={() => setMenuOpen(false)}
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary"
            >
              See the full menu →
            </Link>
          </div>
          <div className="col-span-9 grid grid-cols-3 gap-4">
            {categories.map((c) => (
              <Link
                key={c.id}
                to="/menu/$category"
                params={{ category: c.id }}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-muted"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                  <img
                    src={c.image}
                    alt=""
                    loading="lazy"
                    width={160}
                    height={160}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-base font-semibold leading-tight group-hover:text-primary">
                    {c.name}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-ink-soft">{c.blurb}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav aria-label="Mobile" className="border-t border-border bg-white lg:hidden">
          <div className="container-editorial py-3">
            <form role="search" onSubmit={submit} className="relative mb-3">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
              />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search the menu…"
                className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25"
              />
            </form>
            <ul className="flex flex-col">
              {primaryNav.map((n) => (
                <li key={n.label}>
                  <Link
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <div className="px-3 pt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
                  Menu categories
                </div>
                <ul className="mt-1 grid grid-cols-2 gap-1">
                  {categories.map((c) => (
                    <li key={c.id}>
                      <Link
                        to="/menu/$category"
                        params={{ category: c.id }}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-muted"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </header>
  );
}
