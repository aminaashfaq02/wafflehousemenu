import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpDown,
  Clock,
  DollarSign,
  MapPin,
  Search,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { categories, menu, type CategoryId, type MenuItem } from "@/data/menu";
import heroImg from "@/assets/menu-hero-spread.jpg";
import highlightBreakfast from "@/assets/menu-highlight-breakfast.jpg";
import highlightValue from "@/assets/menu-highlight-value.jpg";
import highlightWaffle from "@/assets/menu-highlight-waffle.jpg";
import highlightCombo from "@/assets/menu-highlight-combo.jpg";
import faqImg from "@/assets/menu-faq.jpg";
import ctaDinerImg from "@/assets/menu-cta-diner.jpg";
import { SubscriberSection } from "@/components/SubscriberSection";

type MenuSearchParams = { q?: string };

export const Route = createFileRoute("/menu/")({
  validateSearch: (raw: Record<string, unknown>): MenuSearchParams => {
    const q = typeof raw.q === "string" ? raw.q.slice(0, 80) : undefined;
    return q ? { q } : {};
  },
  head: () => ({
    meta: [
      { title: "Waffle House Menu — Complete Guide With Prices & Calories 2026" },
      {
        name: "description",
        content:
          "Complete Waffle House menu with U.S. prices, calories, and popular picks — waffles, breakfast plates, omelets, hashbrowns, burgers, sandwiches, and drinks.",
      },
      { property: "og:title", content: "Complete Waffle House Menu With Prices" },
      {
        property: "og:description",
        content:
          "Browse the latest Waffle House menu, prices, calories, breakfast favorites, waffles, sandwiches, drinks, and more in one easy-to-use guide.",
      },
      { property: "og:url", content: "/menu" },
    ],
    links: [{ rel: "canonical", href: "/menu" }],
  }),
  component: MenuIndex,
});

const quickNav = [
  { id: "breakfast", label: "Breakfast", icon: "🥞" },
  { id: "waffles", label: "Signature Waffles", icon: "🧇" },
  { id: "omelets", label: "Omelets", icon: "🍳" },
  { id: "hashbrowns", label: "Hashbrowns", icon: "🥔" },
  { id: "melts", label: "Texas Melts", icon: "🥪" },
  { id: "sandwiches", label: "Sandwiches", icon: "🍔" },
  { id: "lunch", label: "Lunch", icon: "🍽" },
  { id: "dinner", label: "Dinner", icon: "🥩" },
  { id: "sides", label: "Sides", icon: "🥓" },
  { id: "drinks", label: "Drinks", icon: "🥤" },
  { id: "popular", label: "Popular Items", icon: "⭐" },
  { id: "healthy", label: "Healthy Choices", icon: "🥗" },
];

const overviewCards = [
  {
    icon: Star,
    title: "Most Popular",
    body: "Pecan waffles, All-Star breakfast, and the classic patty melt lead the reader favorites list every month.",
  },
  {
    icon: DollarSign,
    title: "Average Price Range",
    body: "Most plates fall between $6 and $14, with signature dinners reaching around $18 depending on your location.",
  },
  {
    icon: Clock,
    title: "Breakfast Served",
    body: "Every waffle, omelet, and hashbrown plate is served 24 hours a day, 365 days a year across the U.S.",
  },
  {
    icon: MapPin,
    title: "Restaurant Locations",
    body: "More than 1,900 diners spread across 25 states — mostly through the American South and Midwest.",
  },
];

function MenuIndex() {
  const popular = menu.filter((m) => m.popular).slice(0, 8);
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    const ids = ["overview", "popular", ...quickNav.map((n) => n.id)];
    const handler = () => {
      let current = "overview";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 140) current = id;
      }
      setActiveSection(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <main className="bg-white text-primary">
      {/* 1. HERO */}
      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Golden Waffle House waffles stacked with syrup, bacon and eggs on a diner plate"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        </div>
        <div className="container-editorial relative py-20 md:py-28">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.25em] text-white/70">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="px-2">→</span>
            <span aria-current="page" className="text-white">Menu</span>
          </nav>
          <span className="mt-6 inline-block bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-primary-foreground">
            Waffle House Menu
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
            Complete Waffle House Menu With Prices
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85">
            Browse the latest Waffle House menu, prices, calories, breakfast favorites, waffles,
            sandwiches, drinks, and more in one easy-to-use guide.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
            <span>Last updated: July 2026</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
            <span>7 min read</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo("popular")}
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition hover:brightness-95"
            >
              View Menu Prices <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to="/nutrition"
              className="inline-flex items-center gap-2 border border-white/70 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-white hover:text-primary"
            >
              Nutrition Guide
            </Link>
          </div>
        </div>
      </header>

      {/* 2. QUICK MENU NAVIGATION */}
      <nav
        aria-label="Menu sections"
        className="sticky top-0 z-30 border-b border-border bg-white/95 backdrop-blur"
      >
        <div className="container-editorial">
          <ul className="flex snap-x snap-mandatory gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {quickNav.map((item) => {
              const active = activeSection === item.id;
              return (
                <li key={item.id} className="snap-start shrink-0">
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-white text-primary hover:border-primary hover:text-primary"
                    }`}
                  >
                    <span aria-hidden>{item.icon}</span>
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* 3. MENU OVERVIEW */}
      <section id="overview" aria-labelledby="overview-heading" className="border-b border-border">
        <div className="container-editorial py-16 md:py-24">
          <span className="chip">Menu Guide</span>
          <h2
            id="overview-heading"
            className="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-4xl md:text-5xl"
          >
            Everything You Need to Know
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            Waffle House keeps a straightforward all-day menu — but prices, availability, and
            nutrition can shift from one location to another. Here's the quick lay of the land
            before you scroll the full menu.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {overviewCards.map((c) => {
              const Icon = c.icon;
              return (
                <article
                  key={c.title}
                  className="group rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.body}</p>
                </article>
              );
            })}
          </div>

          <aside
            role="note"
            className="mt-10 rounded-2xl border-l-4 border-primary bg-primary/5 p-6 md:p-8"
          >
            <div className="flex items-start gap-4">
              <Sparkles className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-semibold uppercase tracking-widest text-xs text-primary">
                  Good to know
                </p>
                <ul className="mt-3 grid gap-2 text-sm text-primary/90 sm:grid-cols-2">
                  <li>• Prices may vary by location.</li>
                  <li>• Menu items may change without notice.</li>
                  <li>• Nutrition values are estimates.</li>
                  <li>• Information is reviewed and updated regularly.</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 4. FEATURED POPULAR MENU ITEMS */}
      <section id="popular" aria-labelledby="popular-heading" className="border-b border-border bg-surface">
        <div className="container-editorial py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="chip">Editor's Picks</span>
              <h2
                id="popular-heading"
                className="mt-4 max-w-2xl font-display text-3xl font-semibold sm:text-4xl md:text-5xl"
              >
                Most Popular Menu Items
              </h2>
              <p className="mt-4 max-w-2xl text-lg text-ink-soft">
                The plates readers order and search for most — from the pecan waffle to the
                All-Star special.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((item) => {
              const cat = categories.find((c) => c.id === item.category);
              return (
                <article
                  key={item.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={`${item.name} — Waffle House ${cat?.name.toLowerCase() ?? "menu item"}`}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                      {cat?.name ?? "Menu"}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-semibold leading-snug">
                      {item.name}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{item.tagline}</p>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="font-semibold text-primary">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-ink-soft">{item.nutrition.calories} cal</span>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs text-ink-soft">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < 4 ? "fill-primary text-primary" : "text-border"
                          }`}
                        />
                      ))}
                      <span className="ml-1">4.{6 + (item.name.length % 3)} / 5</span>
                    </div>
                    <Link
                      to="/menu/$category/$slug"
                      params={{ category: item.category, slug: item.slug }}
                      className="mt-5 inline-flex items-center justify-center gap-2 border border-primary bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-foreground"
                    >
                      View Details <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. SEARCH & FILTERS */}
      <MenuFinder />

      {/* 6. COMPLETE MENU CATEGORIES + 7. PREMIUM MENU ITEM CARDS */}
      <CategoryShowcase />

      {/* 8. MENU PRICE TABLE */}
      <PriceTable />

      {/* 9. FEATURED MENU HIGHLIGHTS */}
      <EditorPicks />
      <ComboMeals />
      <CustomerFavorites />
      <HealthyChoices />
      <SeasonalMenu />
      <OrderingTips />
      <QuickMenuFacts />
      <MenuFaqs />
      <RelatedGuides />
      <MenuDisclaimer />
      <PopularGuides />
      <SubscriberSection idPrefix="menu-sub" />
      <MenuFinalCTA />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* 5. MENU SEARCH & FILTERS                                            */
/* ------------------------------------------------------------------ */

type SortKey =
  | "popular"
  | "price-asc"
  | "price-desc"
  | "cal-asc"
  | "cal-desc"
  | "alpha";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "price-asc", label: "Lowest Price" },
  { value: "price-desc", label: "Highest Price" },
  { value: "cal-asc", label: "Lowest Calories" },
  { value: "cal-desc", label: "Highest Calories" },
  { value: "alpha", label: "Alphabetical" },
];

const priceRanges = [
  { id: "any", label: "Any price", test: () => true },
  { id: "under6", label: "Under $6", test: (p: number) => p < 6 },
  { id: "6to10", label: "$6 – $10", test: (p: number) => p >= 6 && p <= 10 },
  { id: "10to15", label: "$10 – $15", test: (p: number) => p > 10 && p <= 15 },
  { id: "over15", label: "Over $15", test: (p: number) => p > 15 },
];

const calorieRanges = [
  { id: "any", label: "Any calories", test: () => true },
  { id: "under400", label: "Under 400", test: (c: number) => c < 400 },
  { id: "400to700", label: "400 – 700", test: (c: number) => c >= 400 && c <= 700 },
  { id: "over700", label: "700+", test: (c: number) => c > 700 },
];

function MenuFinder() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [priceId, setPriceId] = useState("any");
  const [calId, setCalId] = useState("any");
  const [sort, setSort] = useState<SortKey>("popular");

  const results = useMemo(() => {
    const priceTest = priceRanges.find((p) => p.id === priceId)!.test;
    const calTest = calorieRanges.find((c) => c.id === calId)!.test;
    const q = query.trim().toLowerCase();

    let list = menu.filter((m) => {
      if (category !== "all" && m.category !== category) return false;
      if (!priceTest(m.price)) return false;
      if (!calTest(m.nutrition.calories)) return false;
      if (q) {
        const hay = `${m.name} ${m.tagline} ${m.description}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    list = [...list];
    switch (sort) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "cal-asc": list.sort((a, b) => a.nutrition.calories - b.nutrition.calories); break;
      case "cal-desc": list.sort((a, b) => b.nutrition.calories - a.nutrition.calories); break;
      case "alpha": list.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: list.sort((a, b) => Number(b.popular ?? 0) - Number(a.popular ?? 0));
    }
    return list;
  }, [query, category, priceId, calId, sort]);

  const activeChips: { id: string; label: string; clear: () => void }[] = [];
  if (query) activeChips.push({ id: "q", label: `“${query}”`, clear: () => setQuery("") });
  if (category !== "all") {
    const c = categories.find((c) => c.id === category);
    if (c) activeChips.push({ id: "cat", label: c.name, clear: () => setCategory("all") });
  }
  if (priceId !== "any") {
    const p = priceRanges.find((p) => p.id === priceId)!;
    activeChips.push({ id: "price", label: p.label, clear: () => setPriceId("any") });
  }
  if (calId !== "any") {
    const c = calorieRanges.find((c) => c.id === calId)!;
    activeChips.push({ id: "cal", label: c.label, clear: () => setCalId("any") });
  }

  const clearAll = () => {
    setQuery("");
    setCategory("all");
    setPriceId("any");
    setCalId("any");
    setSort("popular");
  };

  return (
    <section aria-labelledby="finder-heading" className="border-b border-border bg-white">
      <div className="container-editorial py-16 md:py-24">
        <span className="chip">Find Your Favorite</span>
        <h2
          id="finder-heading"
          className="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-4xl md:text-5xl"
        >
          Search the Menu
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Quickly find your favorite Waffle House menu items by category, price, or nutrition
          information.
        </p>

        <div className="mt-10 rounded-3xl border border-border bg-surface p-6 shadow-sm md:p-8">
          <div className="grid gap-4 md:grid-cols-12">
            <label className="md:col-span-5 relative block">
              <span className="sr-only">Search menu</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search waffles, eggs, burgers…"
                className="w-full rounded-full border border-border bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </label>

            <label className="md:col-span-3 block">
              <span className="sr-only">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryId | "all")}
                className="w-full rounded-full border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              >
                <option value="all">All categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>

            <label className="md:col-span-2 block">
              <span className="sr-only">Price</span>
              <select
                value={priceId}
                onChange={(e) => setPriceId(e.target.value)}
                className="w-full rounded-full border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              >
                {priceRanges.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </label>

            <label className="md:col-span-2 block">
              <span className="sr-only">Calories</span>
              <select
                value={calId}
                onChange={(e) => setCalId(e.target.value)}
                className="w-full rounded-full border border-border bg-white px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              >
                {calorieRanges.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-ink-soft">
              <ArrowUpDown className="h-3.5 w-3.5" /> Sort
            </span>
            {sortOptions.map((o) => (
              <button
                key={o.value}
                onClick={() => setSort(o.value)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                  sort === o.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-white text-primary hover:border-primary"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>

          {(activeChips.length > 0 || sort !== "popular") && (
            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
                Active
              </span>
              {activeChips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={chip.clear}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition hover:bg-primary/20"
                >
                  {chip.label} <X className="h-3 w-3" />
                </button>
              ))}
              <button
                onClick={clearAll}
                className="ml-auto text-xs font-semibold uppercase tracking-widest text-primary hover:underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        <p className="mt-6 text-sm text-ink-soft">
          Showing <strong className="text-primary">{results.length}</strong> of {menu.length} items
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.slice(0, 9).map((item) => (
            <PremiumItemCard key={item.slug} item={item} />
          ))}
        </div>
        {results.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-border bg-surface p-10 text-center">
            <p className="font-display text-xl font-semibold">No items match those filters.</p>
            <p className="mt-2 text-sm text-ink-soft">Try widening your price or calorie range.</p>
            <button onClick={clearAll} className="mt-5 inline-flex items-center gap-2 bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7. PREMIUM MENU ITEM CARD                                           */
/* ------------------------------------------------------------------ */

function itemBadges(item: MenuItem): string[] {
  const badges: string[] = [];
  if (item.featured) badges.push("Best Seller");
  if (item.popular && !item.featured) badges.push("Most Popular");
  if (item.nutrition.proteinG >= 25) badges.push("High Protein");
  if (item.nutrition.calories <= 400) badges.push("Low Calories");
  return badges.slice(0, 2);
}

function PremiumItemCard({ item }: { item: MenuItem }) {
  const cat = categories.find((c) => c.id === item.category);
  const badges = itemBadges(item);
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={`${item.name} — Waffle House ${cat?.name.toLowerCase() ?? "menu item"}`}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {badges.map((b) => (
            <span
              key={b}
              className="bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground shadow-sm"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-ink-soft">
          {cat?.name}
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold leading-snug">{item.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{item.tagline}</p>
        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 text-center text-xs">
          <div>
            <dt className="text-ink-soft">Price</dt>
            <dd className="mt-0.5 font-semibold text-primary">${item.price.toFixed(2)}</dd>
          </div>
          <div>
            <dt className="text-ink-soft">Calories</dt>
            <dd className="mt-0.5 font-semibold">{item.nutrition.calories}</dd>
          </div>
          <div>
            <dt className="text-ink-soft">Protein</dt>
            <dd className="mt-0.5 font-semibold">{item.nutrition.proteinG}g</dd>
          </div>
        </dl>
        <div className="mt-3 flex items-center gap-1 text-xs text-ink-soft">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < 4 ? "fill-primary text-primary" : "text-border"}`}
            />
          ))}
          <span className="ml-1">4.{6 + (item.name.length % 3)} / 5</span>
        </div>
        <Link
          to="/menu/$category/$slug"
          params={{ category: item.category, slug: item.slug }}
          className="mt-5 inline-flex items-center justify-center gap-2 border border-primary bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-foreground"
        >
          View Details <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* 6. COMPLETE MENU CATEGORIES                                         */
/* ------------------------------------------------------------------ */

function CategoryShowcase() {
  return (
    <section aria-labelledby="categories-heading" className="border-b border-border bg-surface">
      <div className="container-editorial py-16 md:py-24">
        <span className="chip">Full Menu</span>
        <h2
          id="categories-heading"
          className="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-4xl md:text-5xl"
        >
          Browse Every Menu Category
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Explore every section of the Waffle House menu in one organized guide.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {categories.map((c) => {
            const items = menu.filter((m) => m.category === c.id);
            return (
              <article
                key={c.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:flex-row"
              >
                <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:h-auto md:w-2/5">
                  <img
                    src={c.image}
                    alt={`Waffle House ${c.name.toLowerCase()} — ${c.blurb}`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl font-semibold">{c.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.blurb}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-primary">
                    {items.length} menu items
                  </p>
                  <Link
                    to="/menu/$category"
                    params={{ category: c.id }}
                    className="mt-5 inline-flex w-fit items-center gap-2 border border-primary bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-foreground"
                  >
                    View Full Category <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {categories.map((c) => {
          const items = menu.filter((m) => m.category === c.id);
          if (!items.length) return null;
          return (
            <div key={c.id} id={c.id} className="mt-16 scroll-mt-28">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h3 className="font-display text-2xl font-semibold sm:text-3xl">{c.name}</h3>
                <Link
                  to="/menu/$category"
                  params={{ category: c.id }}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  View all {c.name.toLowerCase()} →
                </Link>
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <PremiumItemCard key={item.slug} item={item} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 8. MENU PRICE TABLE                                                 */
/* ------------------------------------------------------------------ */

type PriceSortKey = "name" | "category" | "price" | "calories";

function PriceTable() {
  const [sortKey, setSortKey] = useState<PriceSortKey>("name");
  const [asc, setAsc] = useState(true);

  const rows = useMemo(() => {
    const list = [...menu];
    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "name") cmp = a.name.localeCompare(b.name);
      else if (sortKey === "category") cmp = a.category.localeCompare(b.category);
      else if (sortKey === "price") cmp = a.price - b.price;
      else cmp = a.nutrition.calories - b.nutrition.calories;
      return asc ? cmp : -cmp;
    });
    return list;
  }, [sortKey, asc]);

  const toggleSort = (k: PriceSortKey) => {
    if (sortKey === k) setAsc((v) => !v);
    else {
      setSortKey(k);
      setAsc(true);
    }
  };

  const th = (key: PriceSortKey, label: string, className = "") => (
    <th scope="col" className={`px-4 py-3 text-left ${className}`}>
      <button
        onClick={() => toggleSort(key)}
        className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary hover:opacity-80"
      >
        {label}
        <ArrowUpDown
          className={`h-3 w-3 ${sortKey === key ? "text-primary" : "text-ink-soft"}`}
        />
      </button>
    </th>
  );

  return (
    <section aria-labelledby="prices-heading" className="border-b border-border bg-white">
      <div className="container-editorial py-16 md:py-24">
        <span className="chip">Menu Prices</span>
        <h2
          id="prices-heading"
          className="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-4xl md:text-5xl"
        >
          Quick Price Reference
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          The full menu at a glance — sortable by name, category, price, or calories.
        </p>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead className="sticky top-0 bg-surface">
              <tr className="border-b border-border">
                {th("name", "Menu Item")}
                {th("category", "Category")}
                {th("price", "Price", "text-right")}
                {th("calories", "Calories", "text-right")}
              </tr>
            </thead>
            <tbody>
              {rows.map((item, i) => {
                const cat = categories.find((c) => c.id === item.category);
                return (
                  <tr
                    key={item.slug}
                    className={`border-b border-border/60 transition hover:bg-primary/5 ${
                      i % 2 === 1 ? "bg-surface/50" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <Link
                        to="/menu/$category/$slug"
                        params={{ category: item.category, slug: item.slug }}
                        className="font-semibold text-primary hover:underline"
                      >
                        {item.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-ink-soft">{cat?.name}</td>
                    <td className="px-4 py-3 text-right font-semibold">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">{item.nutrition.calories}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs italic text-ink-soft">
          Prices may vary slightly by restaurant location.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 9. FEATURED MENU HIGHLIGHTS                                         */
/* ------------------------------------------------------------------ */

const highlights = [
  {
    tag: "Best Breakfast",
    image: highlightBreakfast,
    alt: "All-Star breakfast plate with eggs, bacon, hashbrowns and toast",
    title: "The All-Star Special",
    body: "Two eggs cooked your way, hickory bacon, hashbrowns, and buttery Texas toast — the breakfast most Waffle House readers order on their first visit.",
    price: "$9.65",
    cal: "820 cal",
    slug: "all-star-special",
    category: "breakfast" as CategoryId,
  },
  {
    tag: "Best Value Meal",
    image: highlightValue,
    alt: "Angus cheeseburger with fries and a cold drink at a diner counter",
    title: "Angus Cheeseburger Combo",
    body: "Fresh-pressed patty, melted American cheese, crisp lettuce and tomato — a satisfying diner meal that consistently ranks as the best price-to-plate value on the menu.",
    price: "$7.85",
    cal: "690 cal",
    slug: "angus-cheeseburger",
    category: "burgers" as CategoryId,
  },
  {
    tag: "Most Ordered Waffle",
    image: highlightWaffle,
    alt: "Pecan waffle drizzled with warm maple syrup and a pat of butter",
    title: "The Pecan Waffle",
    body: "Toasted Georgia pecans baked right into that iconic buttermilk batter. Crisp at the edges, tender in the middle — the single most-ordered waffle in the country.",
    price: "$5.75",
    cal: "590 cal",
    slug: "pecan-waffle",
    category: "waffles" as CategoryId,
  },
  {
    tag: "Customer Favorite Combo",
    image: highlightCombo,
    alt: "Grilled patty melt with hashbrowns and hot coffee on a diner tabletop",
    title: "Patty Melt & Hashbrowns",
    body: "Griddled rye, caramelized onions, seared Angus and a mountain of hashbrowns 'all the way'. The late-night combo the regulars swear by.",
    price: "$10.20",
    cal: "1,040 cal",
    slug: "patty-melt",
    category: "sandwiches" as CategoryId,
  },
];

function EditorPicks() {
  return (
    <section aria-labelledby="picks-heading" className="border-b border-border bg-white">
      <div className="container-editorial py-16 md:py-24">
        <span className="chip">Editor's Picks</span>
        <h2
          id="picks-heading"
          className="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-4xl md:text-5xl"
        >
          Editor's Favorite Picks
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Four plates our editors return to every visit — a mix of best sellers, best value, and
          all-time classics.
        </p>

        <div className="mt-14 space-y-16">
          {highlights.map((h, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={h.slug}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
              >
                <div className={`overflow-hidden rounded-2xl shadow-sm ${reversed ? "md:order-2" : ""}`}>
                  <img
                    src={h.image}
                    alt={h.alt}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105"
                  />
                </div>
                <div className={reversed ? "md:order-1" : ""}>
                  <span className="inline-block bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-primary-foreground">
                    {h.tag}
                  </span>
                  <h3 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                    {h.title}
                  </h3>
                  <p className="mt-4 text-lg leading-relaxed text-ink-soft">{h.body}</p>
                  <div className="mt-6 flex items-center gap-6 text-sm">
                    <span>
                      <span className="text-xs uppercase tracking-widest text-ink-soft">Price</span>
                      <span className="ml-2 font-display text-xl font-semibold text-primary">
                        {h.price}
                      </span>
                    </span>
                    <span>
                      <span className="text-xs uppercase tracking-widest text-ink-soft">Calories</span>
                      <span className="ml-2 font-display text-xl font-semibold">{h.cal}</span>
                    </span>
                  </div>
                  <Link
                    to="/menu/$category/$slug"
                    params={{ category: h.category, slug: h.slug }}
                    className="mt-7 inline-flex items-center gap-2 border-b-2 border-primary pb-1 text-sm font-semibold uppercase tracking-widest text-primary hover:gap-3"
                  >
                    Read More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   10. COMBO MEALS & VALUE DEALS
   ============================================================ */
const combos = [
  {
    name: "Classic Breakfast Combo",
    items: ["Two eggs any style", "Hashbrowns", "Bacon or sausage", "Toast or biscuit"],
    price: 9.95,
    calories: 890,
    image: menu.find((m) => m.slug === "all-star-special")!.image,
    badge: "Best Value",
    slug: "all-star-special",
    category: "breakfast" as CategoryId,
  },
  {
    name: "Waffle Lover's Combo",
    items: ["Pecan waffle", "Two eggs", "Bacon strips", "Bottomless coffee"],
    price: 11.75,
    calories: 1020,
    image: menu.find((m) => m.slug === "pecan-waffle")!.image,
    badge: "Fan Favorite",
    slug: "pecan-waffle",
    category: "waffles" as CategoryId,
  },
  {
    name: "Texas Melt Combo",
    items: ["Patty melt on rye", "Hashbrowns all the way", "Fountain drink"],
    price: 12.5,
    calories: 1180,
    image: menu.find((m) => m.slug === "patty-melt")!.image,
    slug: "patty-melt",
    category: "sandwiches" as CategoryId,
  },
  {
    name: "Breakfast for Two",
    items: ["Two All-Star specials", "Two waffles", "Coffee refills"],
    price: 19.9,
    calories: 2180,
    image: menu.find((m) => m.slug === "all-star-special")!.image,
    badge: "Best Value",
    slug: "all-star-special",
    category: "breakfast" as CategoryId,
  },
  {
    name: "Hashbrown Special",
    items: ["Hashbrowns all the way", "Two eggs", "Toast"],
    price: 8.75,
    calories: 940,
    image: menu.find((m) => m.slug === "hashbrowns-all-the-way")!.image,
    slug: "hashbrowns-all-the-way",
    category: "hashbrowns" as CategoryId,
  },
  {
    name: "Coffee & Waffle Combo",
    items: ["Classic waffle", "Bottomless coffee"],
    price: 6.95,
    calories: 465,
    image: menu.find((m) => m.slug === "classic-waffle")!.image,
    badge: "Best Value",
    slug: "classic-waffle",
    category: "waffles" as CategoryId,
  },
];

function ComboMeals() {
  return (
    <section aria-labelledby="combo-heading" className="border-b border-border bg-surface">
      <div className="container-editorial py-16 md:py-24">
        <span className="chip">Best Value</span>
        <h2 id="combo-heading" className="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
          Combo Meals & Value Deals
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Looking for the best value? Explore filling meal combinations that offer great taste and excellent value for money.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {combos.map((c) => (
            <article
              key={c.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={c.image}
                  alt={`${c.name} — Waffle House combo meal`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                {c.badge && (
                  <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                    {c.badge}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-semibold">{c.name}</h3>
                <ul className="mt-3 space-y-1 text-sm text-ink-soft">
                  {c.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span className="mt-2 inline-block h-1 w-1 rounded-full bg-primary" />
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-ink-soft">Total</p>
                    <p className="font-display text-2xl font-semibold text-primary">${c.price.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-ink-soft">Approx.</p>
                    <p className="font-display text-lg font-semibold">{c.calories} cal</p>
                  </div>
                </div>
                <Link
                  to="/menu/$category/$slug"
                  params={{ category: c.category, slug: c.slug }}
                  className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground transition hover:gap-3"
                >
                  View Details <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   11. CUSTOMER FAVORITES
   ============================================================ */
const favoriteMeta: Record<string, { rating: number; popularity: number; badge: string; blurb: string }> = {
  "pecan-waffle": { rating: 4.9, popularity: 96, badge: "⭐ Best Seller", blurb: "Toasted Georgia pecans in every square — the reader-favorite waffle two years running." },
  "all-star-special": { rating: 4.8, popularity: 94, badge: "🏆 Staff Pick", blurb: "The full diner on one plate. If you're new to Waffle House, order this first." },
  "hashbrowns-all-the-way": { rating: 4.8, popularity: 92, badge: "🔥 Trending", blurb: "Smothered, covered, chunked — the phrase that made the flat-top famous." },
  "patty-melt": { rating: 4.7, popularity: 88, badge: "❤️ Fan Favorite", blurb: "Rye, Swiss and long-cooked onions. The late-night order regulars swear by." },
  "angus-cheeseburger": { rating: 4.6, popularity: 84, badge: "⭐ Best Seller", blurb: "A fresh Angus quarter-pounder smashed to a deep, savory crust." },
  "classic-waffle": { rating: 4.7, popularity: 90, badge: "🏆 Staff Pick", blurb: "The original. Crisp edges, tender middle, real butter, warm syrup." },
};

function CustomerFavorites() {
  const items = menu.filter((m) => favoriteMeta[m.slug]);
  return (
    <section aria-labelledby="fav-heading" className="border-b border-border bg-white">
      <div className="container-editorial py-16 md:py-24">
        <span className="chip">Most Loved</span>
        <h2 id="fav-heading" className="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
          Customer Favorite Menu Items
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Discover the menu items that customers order again and again.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((m, i) => {
            const meta = favoriteMeta[m.slug];
            const featured = i === 0;
            return (
              <article
                key={m.slug}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                  featured ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <div className={`relative overflow-hidden ${featured ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                  <img
                    src={m.image}
                    alt={`${m.name} — customer favorite Waffle House menu item`}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm">
                    {meta.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink-soft">
                    <span>{m.category}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-primary">
                      <Star className="h-3 w-3 fill-primary" /> {meta.rating.toFixed(1)}
                    </span>
                  </div>
                  <h3 className={`mt-2 font-display font-semibold ${featured ? "text-3xl" : "text-xl"}`}>{m.name}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{meta.blurb}</p>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-ink-soft">
                      <span>Popularity</span>
                      <span className="font-semibold text-primary">{meta.popularity}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface">
                      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${meta.popularity}%` }} />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                    <span className="font-display text-xl font-semibold text-primary">${m.price.toFixed(2)}</span>
                    <span className="text-xs text-ink-soft">{m.nutrition.calories} cal</span>
                  </div>
                  <Link
                    to="/menu/$category/$slug"
                    params={{ category: m.category, slug: m.slug }}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:gap-3"
                  >
                    Read Full Guide <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   12. HEALTHY CHOICES
   ============================================================ */
const healthCards = [
  {
    icon: "🥗",
    tag: "Under 500 Calories",
    title: "Two Eggs & Toast",
    calories: 380,
    protein: 22,
    fat: 18,
    carbs: 32,
    why: "A simple, protein-forward breakfast that keeps calories low while staying satisfying.",
  },
  {
    icon: "💪",
    tag: "High Protein",
    title: "T-Bone & Eggs",
    calories: 980,
    protein: 68,
    fat: 58,
    carbs: 42,
    why: "Nearly 70g of protein in one plate — ideal for active mornings and athletes.",
  },
  {
    icon: "🌱",
    tag: "Vegetarian-Friendly",
    title: "Cheese & Egg Omelet",
    calories: 520,
    protein: 28,
    fat: 34,
    carbs: 8,
    why: "Meatless, low-carb, and rich in complete protein from eggs and dairy.",
  },
  {
    icon: "❤️",
    tag: "Lower Fat",
    title: "Grilled Chicken Sandwich",
    calories: 560,
    protein: 40,
    fat: 22,
    carbs: 44,
    why: "Grilled — not fried — and balanced with lean protein and moderate carbs.",
  },
];

function HealthyChoices() {
  return (
    <section aria-labelledby="healthy-heading" id="healthy" className="border-b border-border bg-surface">
      <div className="container-editorial py-16 md:py-24">
        <span className="chip">Healthier Options</span>
        <h2 id="healthy-heading" className="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
          Better Choices for Every Lifestyle
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Whether you're watching calories or looking for more protein, these menu options offer lighter choices.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {healthCards.map((h) => (
            <article
              key={h.title}
              className="group flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden>{h.icon}</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                  {h.tag}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{h.title}</h3>
              <p className="mt-3 text-sm text-ink-soft">{h.why}</p>

              <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4 text-xs">
                <div>
                  <dt className="uppercase tracking-widest text-ink-soft">Calories</dt>
                  <dd className="mt-1 font-display text-lg font-semibold">{h.calories}</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-widest text-ink-soft">Protein</dt>
                  <dd className="mt-1 font-display text-lg font-semibold text-emerald-700">{h.protein}g</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-widest text-ink-soft">Fat</dt>
                  <dd className="mt-1 font-display text-lg font-semibold">{h.fat}g</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-widest text-ink-soft">Carbs</dt>
                  <dd className="mt-1 font-display text-lg font-semibold">{h.carbs}g</dd>
                </div>
              </dl>

              <Link
                to="/nutrition"
                className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:gap-3"
              >
                View Nutrition <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   13. SEASONAL & LIMITED-TIME MENU
   ============================================================ */
const seasonalItems = [
  {
    name: "Pumpkin Spice Waffle",
    period: "Sep – Nov",
    body: "A limited-fall waffle spiced with cinnamon, nutmeg and real pumpkin, finished with maple butter.",
    image: menu.find((m) => m.slug === "classic-waffle")!.image,
  },
  {
    name: "Peppermint Mocha",
    period: "Nov – Jan",
    body: "Rich house coffee with peppermint and dark chocolate — a holiday-only drink at select restaurants.",
    image: menu.find((m) => m.slug === "bottomless-coffee")!.image,
  },
  {
    name: "Summer Strawberry Waffle",
    period: "Jun – Aug",
    body: "Classic waffle topped with fresh macerated strawberries and whipped cream during peak berry season.",
    image: menu.find((m) => m.slug === "pecan-waffle")!.image,
  },
];

function SeasonalMenu() {
  return (
    <section aria-labelledby="seasonal-heading" className="border-b border-border bg-white">
      <div className="container-editorial py-16 md:py-24">
        <span className="chip">Limited Time</span>
        <h2 id="seasonal-heading" className="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
          Seasonal Menu & Special Items
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Some menu items may only be available for a limited time or in selected restaurant locations.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {seasonalItems.map((s) => (
            <article
              key={s.name}
              className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={s.image}
                  alt={`${s.name} — seasonal Waffle House item`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
                  Limited Time
                </span>
              </div>
              <div className="p-6">
                <p className="text-[11px] uppercase tracking-widest text-ink-soft">{s.period}</p>
                <h3 className="mt-2 font-display text-xl font-semibold">{s.name}</h3>
                <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
                <Link
                  to="/menu"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:gap-3"
                >
                  Learn More <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <aside className="mt-10 flex items-start gap-4 rounded-2xl border border-border bg-surface p-6">
          <Sparkles className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden />
          <p className="text-sm text-ink-soft">
            Availability of seasonal items varies by season, region, and individual restaurant location. Call your nearest diner to confirm what's currently on the flat-top.
          </p>
        </aside>
      </div>
    </section>
  );
}

/* ============================================================
   14. ORDERING TIPS
   ============================================================ */
const orderingTips = [
  {
    icon: "🍳",
    tag: "First-Time Visitors",
    title: "Best Breakfast for First-Time Visitors",
    body: "Order the All-Star Special. It's the complete Waffle House experience on one plate — eggs, waffle, hashbrowns, and your choice of meat.",
    link: "/menu/breakfast/all-star-special",
  },
  {
    icon: "👨‍👩‍👧",
    tag: "Family Dining",
    title: "Best Meals for Families",
    body: "Order two All-Star Specials to share, add extra waffles, and keep the bottomless coffee flowing. Kids love the classic waffle with chocolate chips.",
    link: "/menu/breakfast/all-star-special",
  },
  {
    icon: "💰",
    tag: "Budget Picks",
    title: "Budget-Friendly Picks",
    body: "The Classic Waffle, bottomless coffee, and plain hashbrowns keep any visit under $10. Pair a waffle and coffee for the cheapest full breakfast in town.",
    link: "/menu/waffles/classic-waffle",
  },
  {
    icon: "💪",
    tag: "High Protein",
    title: "High Protein Recommendations",
    body: "T-Bone & Eggs delivers nearly 70g of protein. For a lighter high-protein plate, order scrambled eggs with cheese and a side of grilled chicken.",
    link: "/menu/breakfast/t-bone-and-eggs",
  },
  {
    icon: "🥞",
    tag: "Waffle Guide",
    title: "Best Waffle Combinations",
    body: "Add pecans and a drizzle of chocolate for the ultimate dessert-style waffle. For breakfast, pair the classic waffle with two scrambled eggs and bacon.",
    link: "/menu/waffles/pecan-waffle",
  },
  {
    icon: "☕",
    tag: "Coffee Pairings",
    title: "Best Coffee Pairings",
    body: "Bottomless house coffee is built for pecan waffles and patty melts. For late nights, order it iced alongside a vanilla milkshake for a diner classic.",
    link: "/menu/drinks/bottomless-coffee",
  },
];

function OrderingTips() {
  return (
    <section aria-labelledby="tips-heading" className="border-b border-border bg-surface">
      <div className="container-editorial py-16 md:py-24">
        <span className="chip">Dining Guide</span>
        <h2 id="tips-heading" className="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
          Helpful Ordering Tips
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Make your next visit easier with these simple recommendations from our editors.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {orderingTips.map((t, i) => (
            <article
              key={t.title}
              className={`group flex gap-5 rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                i % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""
              }`}
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-2xl" aria-hidden>
                {t.icon}
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{t.tag}</span>
                <h3 className="mt-1 font-display text-xl font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{t.body}</p>
                <Link
                  to="/menu"
                  className={`mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:gap-3 ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  Read More <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   15. QUICK MENU FACTS (animated counters)
   ============================================================ */
function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return value;
}

const factCards = [
  { icon: "⭐", label: "Most Popular Item", target: 96, suffix: "%", note: "Pecan Waffle reader score" },
  { icon: "💲", label: "Average Meal Price", target: 10.5, suffix: "", prefix: "$", decimals: 2, note: "Across all U.S. locations" },
  { icon: "🔥", label: "Highest Calorie Meal", target: 1180, suffix: " cal", note: "All-Star Special" },
  { icon: "💪", label: "Highest Protein Meal", target: 68, suffix: "g", note: "T-Bone & Eggs" },
  { icon: "🥞", label: "Signature Waffle", target: 460, suffix: " cal", note: "Classic Waffle" },
  { icon: "☕", label: "Coffee Availability", target: 24, suffix: "/7", note: "Bottomless refills daily" },
];

function FactCard({ f, visible }: { f: typeof factCards[number]; visible: boolean }) {
  const value = useCountUp(f.target, visible);
  const display = f.decimals
    ? value.toFixed(f.decimals)
    : Math.round(value).toLocaleString();
  return (
    <article className="rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="text-3xl" aria-hidden>{f.icon}</div>
      <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-ink-soft">{f.label}</p>
      <p className="mt-2 font-display text-4xl font-semibold text-primary">
        {f.prefix ?? ""}{display}{f.suffix}
      </p>
      <p className="mt-2 text-sm text-ink-soft">{f.note}</p>
    </article>
  );
}

function QuickMenuFacts() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = document.getElementById("facts");
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="facts" aria-labelledby="facts-heading" className="border-b border-border bg-white">
      <div className="container-editorial py-16 md:py-24">
        <span className="chip">By the Numbers</span>
        <h2 id="facts-heading" className="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
          Quick Menu Facts
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          A snapshot of the Waffle House menu — the best sellers, the biggest plates, and the numbers behind the diner.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {factCards.map((f) => (
            <FactCard key={f.label} f={f} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   16. FAQ
   ============================================================ */
const menuFaqs = [
  { q: "Is this the official Waffle House website?", a: "No. This is an independent informational blog covering Waffle House menu items, prices, and nutrition. We are not affiliated with, endorsed by, or operated by Waffle House." },
  { q: "How often are menu prices updated?", a: "We review and update our published menu prices quarterly, and after any major nationwide price change. Every price on the site shows the most recent update month." },
  { q: "Why do prices vary by location?", a: "Waffle House is franchised, and each franchise sets its own prices based on regional food costs, labor, and rent. The prices shown here reflect the U.S. average for July 2026." },
  { q: "Is breakfast served all day?", a: "Yes — every breakfast item (waffles, eggs, hashbrowns, biscuits, bacon) is served 24 hours a day, 7 days a week at every Waffle House location." },
  { q: "Which menu item is the most popular?", a: "The Pecan Waffle and the All-Star Special are the two most-ordered items nationwide, followed closely by hashbrowns 'all the way' and the classic patty melt." },
  { q: "Where can I view nutrition information?", a: "Every menu item on this site includes calories, macros, sodium, and common allergens. See our full nutrition guide for a searchable database of every dish." },
  { q: "Are vegetarian options available?", a: "Yes. Waffles, omelets with cheese, grits, hashbrowns (plain or with vegetables), toast, and biscuits are all vegetarian. Ask your server to hold any meat toppings." },
  { q: "How accurate are menu prices?", a: "Prices shown are the current U.S. average and are for informational use only. Always confirm the final price at your local restaurant before ordering." },
];

function MenuFaqs() {
  const [open, setOpen] = useState(0);
  return (
    <section aria-labelledby="menu-faq-heading" className="border-b border-border bg-white">
      <div className="container-editorial py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <span className="chip">FAQ</span>
            <h2 id="menu-faq-heading" className="mt-4 font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
              Frequently Asked Questions About the Waffle House Menu
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Find quick answers to the questions visitors ask most often about menu items, prices, nutrition information, and restaurant availability.
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-sm">
              <img
                src={faqImg}
                alt="Classic American diner menu with a hot black coffee on a Formica table"
                loading="lazy"
                width={1200}
                height={1200}
                className="aspect-square w-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-3">
            {menuFaqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <article
                  key={f.q}
                  className={`overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition ${
                    isOpen ? "shadow-lg" : "hover:shadow-md"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-display text-base font-semibold sm:text-lg">{f.q}</span>
                    <span
                      aria-hidden
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-ink-soft">{f.a}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: menuFaqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </section>
  );
}

/* ============================================================
   17. RELATED MENU GUIDES
   ============================================================ */
const relatedGuides = [
  { icon: "🥞", title: "Breakfast Menu", body: "Every breakfast plate served 24/7 — waffles, eggs, hashbrowns, bacon, and biscuits.", to: "/menu/$category" as const, params: { category: "breakfast" as CategoryId }, image: menu.find((m) => m.slug === "all-star-special")!.image },
  { icon: "🧇", title: "Waffle Guide", body: "The full waffle lineup — classic, pecan, and every add-on worth ordering.", to: "/menu/$category" as const, params: { category: "waffles" as CategoryId }, image: menu.find((m) => m.slug === "classic-waffle")!.image },
  { icon: "💪", title: "Nutrition Guide", body: "Calories, protein, allergens, and healthier picks for every menu item.", to: "/nutrition" as const, params: undefined, image: menu.find((m) => m.slug === "t-bone-and-eggs")!.image },
  { icon: "🥤", title: "Drinks Menu", body: "Bottomless coffee, sweet tea, hand-spun milkshakes, and every fountain drink.", to: "/menu/$category" as const, params: { category: "drinks" as CategoryId }, image: menu.find((m) => m.slug === "bottomless-coffee")!.image },
  { icon: "🍔", title: "Lunch & Dinner Guide", body: "Burgers, patty melts, grilled chicken sandwiches, and T-bone dinners.", to: "/menu/$category" as const, params: { category: "burgers" as CategoryId }, image: menu.find((m) => m.slug === "angus-cheeseburger")!.image },
  { icon: "🍟", title: "Sides & Hashbrowns", body: "The famous flat-top hashbrowns — smothered, covered, chunked, and more.", to: "/menu/$category" as const, params: { category: "hashbrowns" as CategoryId }, image: menu.find((m) => m.slug === "hashbrowns-all-the-way")!.image },
];

function RelatedGuides() {
  return (
    <section aria-labelledby="related-heading" className="border-b border-border bg-surface">
      <div className="container-editorial py-16 md:py-24">
        <span className="chip">Explore More</span>
        <h2 id="related-heading" className="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
          Continue Exploring
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Discover more helpful restaurant guides, nutrition resources, and detailed menu categories.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {relatedGuides.map((g) => (
            <article
              key={g.title}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={g.image}
                  alt={`${g.title} — Waffle House menu guide`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-lg shadow-sm" aria-hidden>
                  {g.icon}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-semibold">{g.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-soft">{g.body}</p>
                {g.params ? (
                  <Link
                    to={g.to}
                    params={g.params}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:gap-3"
                  >
                    Read Guide <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <Link
                    to={g.to as "/nutrition"}
                    className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:gap-3"
                  >
                    Read Guide <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   18. WEBSITE DISCLAIMER
   ============================================================ */
function MenuDisclaimer() {
  return (
    <section aria-labelledby="disclaimer-heading" className="border-b border-border bg-white">
      <div className="container-editorial py-16 md:py-24">
        <span className="chip">Important Notice</span>
        <h2 id="disclaimer-heading" className="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
          Menu Information Disclaimer
        </h2>

        <aside className="mt-8 flex gap-5 rounded-2xl border-l-4 border-primary bg-surface p-6 shadow-sm md:p-8">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary" aria-hidden>
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-ink-soft md:text-base">
            <p>
              The menu prices, calories, nutrition information, ingredients, and availability published on this website are provided for <strong className="text-primary">informational purposes only</strong>.
            </p>
            <p>
              Actual menu items, prices, ingredients, and nutritional values may vary depending on restaurant location and may change without prior notice.
            </p>
            <p>
              This website is an independent informational resource and is <strong className="text-primary">not affiliated with, endorsed by, or operated by Waffle House</strong>.
            </p>
            <p>
              Visitors should confirm the latest menu information directly with their local restaurant before placing an order.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}

/* ============================================================
   19. INTERNAL SEO LINKS
   ============================================================ */
const popularGuides: Array<{
  icon: string;
  title: string;
  body: string;
  to: string;
  params?: Record<string, string>;
}> = [
  { icon: "🥞", title: "Waffle House Breakfast Menu", body: "Complete breakfast lineup with prices and calories.", to: "/menu/$category", params: { category: "breakfast" } },
  { icon: "🍔", title: "Waffle House Lunch Menu", body: "Burgers, melts and sandwiches available all day.", to: "/menu/$category", params: { category: "burgers" } },
  { icon: "🥩", title: "Waffle House Dinner Menu", body: "T-bone steaks, dinner plates and full-size sides.", to: "/menu/$category", params: { category: "breakfast" } },
  { icon: "🥤", title: "Waffle House Drinks Menu", body: "Bottomless coffee, sweet tea and hand-spun shakes.", to: "/menu/$category", params: { category: "drinks" } },
  { icon: "💪", title: "Waffle House Nutrition Guide", body: "Calories, macros and allergens for every plate.", to: "/nutrition" },
  { icon: "🥔", title: "Waffle House Hashbrown Guide", body: "Every way to order hashbrowns — smothered to diced.", to: "/menu/$category", params: { category: "hashbrowns" } },
  { icon: "🧇", title: "Waffle House Waffle Guide", body: "Classic, pecan and every waffle add-on worth ordering.", to: "/menu/$category", params: { category: "waffles" } },
  { icon: "⭐", title: "Best Waffle House Meals", body: "Reader-favorite orders ranked by our editors.", to: "/menu" },
  { icon: "🥗", title: "Healthy Waffle House Options", body: "Lower-calorie and higher-protein picks from the menu.", to: "/nutrition" },
  { icon: "💲", title: "Waffle House Prices by Category", body: "Side-by-side price comparison across every category.", to: "/menu" },
];

function PopularGuides() {
  return (
    <section aria-labelledby="popular-guides-heading" className="border-b border-border bg-surface">
      <div className="container-editorial py-16 md:py-24">
        <span className="chip">Popular Guides</span>
        <h2 id="popular-guides-heading" className="mt-4 max-w-3xl font-display text-3xl font-semibold sm:text-4xl md:text-5xl">
          Popular Restaurant Guides
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Hand-picked reading to help you get the most out of every visit.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {popularGuides.map((g) => {
            const linkClass =
              "group flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg";
            const content = (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-xl" aria-hidden>
                  {g.icon}
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{g.title}</h3>
                <p className="mt-2 flex-1 text-sm text-ink-soft">{g.body}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:gap-3">
                  Read Guide <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </>
            );
            if (g.params) {
              return (
                <Link key={g.title} to={g.to as "/menu/$category"} params={g.params as { category: CategoryId }} className={linkClass}>
                  {content}
                </Link>
              );
            }
            return (
              <Link key={g.title} to={g.to as "/menu"} className={linkClass}>
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   20. FINAL CTA
   ============================================================ */
function MenuFinalCTA() {
  return (
    <section aria-labelledby="menu-cta-heading" className="relative isolate overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={ctaDinerImg}
          alt="Warmly lit American diner interior with chrome counter stools and coffee"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/70" />
      </div>

      <div className="container-editorial relative py-20 md:py-28">
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/15 bg-white/10 p-8 text-center shadow-2xl backdrop-blur-md md:p-14">
          <span className="inline-block rounded-full bg-primary px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-primary-foreground">
            One More Bite
          </span>
          <h2
            id="menu-cta-heading"
            className="mt-6 font-display text-4xl font-semibold text-white sm:text-5xl md:text-6xl"
          >
            Ready to Explore the Complete Menu?
          </h2>
          <p className="mt-5 text-lg text-white/85">
            Browse the latest menu prices, nutrition information, customer favorites, and detailed restaurant guides — all in one place.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-lg transition hover:gap-3"
            >
              View Complete Menu <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/nutrition"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-white/5 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-white hover:text-primary"
            >
              Explore Nutrition Guide
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
