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
  FileText,
  Download,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  Utensils,
  BookOpen,
} from "lucide-react";
import { categories, menu, type CategoryId, type MenuItem } from "@/data/menu";
import { CENTRAL_MENU_CATEGORIES, TOTAL_MENU_CATEGORIES, TOTAL_MENU_ITEMS } from "@/data/centralMenuData";
import { blogPosts } from "@/data/blogPosts";
import heroImg from "@/assets/menu-hero-spread.jpg";
import highlightBreakfast from "@/assets/menu-highlight-breakfast.jpg";
import highlightValue from "@/assets/menu-highlight-value.jpg";
import highlightWaffle from "@/assets/menu-highlight-waffle.jpg";
import highlightCombo from "@/assets/menu-highlight-combo.jpg";
import { SubscriberSection } from "@/components/SubscriberSection";

const SITE = "https://wafflehousemenu.com";

const menuFaqs = [
  {
    q: "What is on the Waffle House menu?",
    a: "Waffle House offers classic American diner dishes including sweet cream waffles, farm-fresh eggs, hashbrowns, Toddle House omelets, biscuits, and Texas melts, alongside 100% Angus burgers, dinner steaks, sides, pies, and bottomless coffee.",
  },
  {
    q: "How many menu categories are there?",
    a: "The menu is organized into 13 primary categories covering breakfast favorites, lunch and dinner options, sides, and beverages.",
  },
  {
    q: "How many menu items are listed?",
    a: `Our reference guide organizes ${TOTAL_MENU_ITEMS} standard menu items across all ${TOTAL_MENU_CATEGORIES} categories based on current restaurant menus.`,
  },
  {
    q: "Does Waffle House serve breakfast all day?",
    a: "Yes. Waffle House serves its entire menu — including all breakfast waffles, egg plates, and hashbrowns — 24 hours a day, 7 days a week.",
  },
  {
    q: "Do Waffle House menu prices vary by location?",
    a: "Yes. Individual restaurant prices vary based on local franchise operating costs, location, and regional pricing updates.",
  },
  {
    q: "Where can I find Waffle House nutrition information?",
    a: "You can browse complete calorie counts, macros, and allergen details on our dedicated Waffle House Nutrition page.",
  },
  {
    q: "Where can I find the Waffle House menu PDF?",
    a: "A printable PDF reference is available for viewing and download directly from the menu PDF section on this page and the nutrition guide.",
  },
];

type MenuSearchParams = { q?: string };

export const Route = createFileRoute("/menu/")({
  validateSearch: (raw: Record<string, unknown>): MenuSearchParams => {
    const q = typeof raw.q === "string" ? raw.q.slice(0, 80) : undefined;
    return q ? { q } : {};
  },
  head: () => ({
    meta: [
      { title: "Waffle House Menu & Prices 2026 | Complete Menu Guide" },
      {
        name: "description",
        content: `Explore the Waffle House menu with ${TOTAL_MENU_ITEMS} items across ${TOTAL_MENU_CATEGORIES} categories, including waffles, breakfast favorites, hashbrowns, burgers, sandwiches, dinners, sides, pies and beverages.`,
      },
      { property: "og:title", content: "Waffle House Menu & Prices 2026 | Complete Menu Guide" },
      {
        property: "og:description",
        content: `Explore the Waffle House menu with ${TOTAL_MENU_ITEMS} items across ${TOTAL_MENU_CATEGORIES} categories, including waffles, breakfast favorites, hashbrowns, burgers, sandwiches, dinners, sides, pies and beverages.`,
      },
      { property: "og:url", content: `${SITE}/menu` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/menu` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
            { "@type": "ListItem", position: 2, name: "Menu", item: `${SITE}/menu` },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Waffle House Menu & Prices 2026 | Complete Menu Guide",
          description: `Explore the Waffle House menu with ${TOTAL_MENU_ITEMS} items across ${TOTAL_MENU_CATEGORIES} categories, including waffles, breakfast favorites, hashbrowns, burgers, sandwiches, dinners, sides, pies and beverages.`,
          url: `${SITE}/menu`,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Waffle House Menu Categories",
          numberOfItems: TOTAL_MENU_CATEGORIES,
          itemListElement: CENTRAL_MENU_CATEGORIES.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            url: `${SITE}${c.href}`,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: menuFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }),
      },
    ],
  }),
  component: MenuIndex,
});

const quickNav = [
  { id: "all-star-special", label: "All-Star Special", icon: "🥞" },
  { id: "waffles", label: "Waffles", icon: "🧇" },
  { id: "breakfast", label: "Egg Breakfasts", icon: "🍳" },
  { id: "omelets", label: "Omelets", icon: "🧀" },
  { id: "hashbrown-bowls", label: "Hashbrown Bowls", icon: "🥣" },
  { id: "breakfast-sandwiches", label: "Sandwiches & Melts", icon: "🥪" },
  { id: "biscuits", label: "Grilled Biscuits", icon: "🥯" },
  { id: "burgers", label: "Angus Burgers", icon: "🍔" },
  { id: "sandwiches", label: "Sandwiches", icon: "🥪" },
  { id: "classic-dinners", label: "Dinners", icon: "🥩" },
  { id: "hashbrowns", label: "Hashbrowns", icon: "🥔" },
  { id: "sides", label: "Sides", icon: "🥓" },
  { id: "beverages", label: "Beverages & Pies", icon: "🥤" },
];

function MenuIndex() {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const ids = ["overview", "menu-categories", ...quickNav.map((n) => n.id)];
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

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="bg-white text-foreground">
      {/* 1. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="bg-surface py-3 border-b border-border font-sans">
        <div className="container-editorial flex items-center gap-2 text-xs font-medium text-ink-soft">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="text-foreground">Menu</span>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative overflow-hidden border-b border-border font-sans">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Golden Waffle House waffles stacked with syrup, bacon and eggs on a diner plate"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80" />
        </div>
        <div className="container-editorial relative py-20 md:py-28 text-white">
          <span className="inline-block rounded-full bg-primary px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
            Waffle House Menu Guide
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            Waffle House Menu &amp; Prices
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/85 leading-relaxed">
            Explore the Waffle House menu by category, with menu items, pricing information and available nutrition details organized for easy browsing.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-amber-300">
            <span>{TOTAL_MENU_CATEGORIES} Menu Categories</span>
            <span>•</span>
            <span>{TOTAL_MENU_ITEMS} Menu Items</span>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("menu-categories")}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-[#E2B000]"
            >
              Browse the Menu <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to="/nutrition"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur transition hover:bg-white/20"
            >
              View Nutrition
            </Link>
            <Link
              to="/locations"
              className="inline-flex items-center gap-1.5 px-3 py-3 text-xs font-semibold text-white/80 hover:text-white underline"
            >
              Find Waffle House Locations →
            </Link>
          </div>
        </div>
      </header>

      {/* 3. QUICK MENU FACTS */}
      <section aria-labelledby="glance-heading" className="bg-surface py-12 border-b border-border font-sans">
        <div className="container-editorial">
          <div className="mx-auto max-w-2xl text-center mb-8">
            <span className="chip">At a Glance</span>
            <h2 id="glance-heading" className="font-display text-2xl font-bold sm:text-3xl text-foreground">
              Waffle House Menu at a Glance
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-2xl border border-border bg-white p-5 text-center shadow-xs">
              <span className="font-display text-3xl font-bold text-primary">{TOTAL_MENU_CATEGORIES}</span>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-foreground">Menu Categories</p>
              <p className="mt-1 text-xs text-ink-soft">Full menu directory</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 text-center shadow-xs">
              <span className="font-display text-3xl font-bold text-primary">{TOTAL_MENU_ITEMS}</span>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-foreground">Menu Items</p>
              <p className="mt-1 text-xs text-ink-soft">Dishes and sides</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 text-center shadow-xs">
              <span className="font-display text-3xl font-bold text-primary">Prices</span>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-foreground">Pricing Reference</p>
              <p className="mt-1 text-xs text-ink-soft">Estimated menu prices</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 text-center shadow-xs">
              <span className="font-display text-3xl font-bold text-primary">Nutrition</span>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-foreground">Calories &amp; Macros</p>
              <p className="mt-1 text-xs text-ink-soft">Allergen information</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 text-center shadow-xs">
              <span className="font-display text-3xl font-bold text-primary">PDF</span>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-foreground">Menu Reference</p>
              <p className="mt-1 text-xs text-ink-soft">Printable document</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MENU PDF SECTION */}
      <section aria-labelledby="pdf-heading" className="bg-[#0B0C0E] border-b border-white/10 text-white font-sans">
        <div className="container-editorial py-12 md:py-16">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-[#18191B] to-[#0B0C0E] border border-white/10 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left max-w-xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 ring-1 ring-inset ring-amber-500/20">
                <FileText className="h-3.5 w-3.5" aria-hidden /> Informational Menu Resource
              </div>
              <h2 id="pdf-heading" className="font-display text-2xl font-bold text-white sm:text-3xl">
                Waffle House Menu PDF
              </h2>
              <p className="text-sm leading-relaxed text-white/75">
                Looking for a printable menu reference? View the Waffle House menu PDF for a convenient overview of available menu categories and items.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <Link
                to="/nutrition"
                hash="pdf-table"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white/10 px-6 text-sm font-semibold text-white border border-white/20 transition-all hover:bg-white/20"
              >
                View Menu PDF
              </Link>
              <a
                href="/waffle-house-menu-nutritionals.pdf"
                download
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-black transition-all hover:bg-[#E2B000]"
              >
                <Download className="h-4 w-4" /> Download Menu PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SEARCH & FILTERS */}
      <MenuFinder />

      {/* 6. BROWSE ALL 13 CATEGORIES */}
      <CategoryShowcase />

      {/* 7. FEATURED MENU ITEMS */}
      <FeaturedMenuItems />

      {/* 8. MENU PRICE TABLE */}
      <PriceTable />

      {/* 9. CALORIES & NUTRITION */}
      <section className="bg-surface py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-4xl mx-auto text-center space-y-6">
          <span className="chip">Nutrition Facts</span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
            Waffle House Calories &amp; Nutrition
          </h2>
          <p className="text-base text-ink-soft leading-relaxed max-w-2xl mx-auto">
            Explore available calorie and nutrition information for menu items, including calories and other nutritional details where reliable information is available.
          </p>
          <div>
            <Link
              to="/nutrition"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-xs hover:bg-[#E2B000]"
            >
              View Waffle House Nutrition <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. EXPLORE THE MENU BY FOOD TYPE */}
      <section className="bg-white py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial">
          <div className="max-w-2xl mb-8">
            <span className="chip">Fast Navigation</span>
            <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl text-foreground">
              Explore the Menu
            </h2>
            <p className="mt-2 text-sm text-ink-soft">
              Direct access to all 13 canonical menu sections.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {CENTRAL_MENU_CATEGORIES.map((c) => (
              <Link
                key={c.id}
                to={c.href as any}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground transition hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 11. FIND A LOCATION */}
      <section className="bg-surface py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl text-center space-y-4">
          <span className="chip">Locations</span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
            Find a Waffle House Location
          </h2>
          <p className="text-base text-ink-soft leading-relaxed">
            Menu availability, prices and restaurant details can vary by location. Browse the location directory to find restaurant information by state and city.
          </p>
          <div className="pt-2">
            <Link
              to="/locations"
              className="inline-flex items-center gap-2 rounded-full border border-primary bg-white px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Browse Waffle House Locations <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 12. RELATED MENU GUIDES */}
      <section className="bg-white py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial">
          <div className="max-w-2xl mb-10">
            <span className="chip">Guides</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl text-foreground">
              Waffle House Menu Guides
            </h2>
            <p className="mt-2 text-base text-ink-soft">
              Practical guides and restaurant articles to help you navigate dishes and choices.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-xs transition hover:-translate-y-1 hover:shadow-md"
              >
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="block aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    width={800}
                    height={500}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">{post.category}</span>
                  <h3 className="mt-2 font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    <Link to="/blog/$slug" params={{ slug: post.slug }}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs text-ink-soft line-clamp-2 flex-1 leading-relaxed">{post.summary}</p>
                  <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-ink-soft">
                    <span>{post.readMinutes} min read</span>
                    <Link to="/blog/$slug" params={{ slug: post.slug }} className="font-semibold text-primary hover:underline">
                      Read Guide →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section aria-labelledby="menu-faq-heading" className="bg-surface py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl">
          <div className="text-center mb-10 space-y-3">
            <span className="chip">FAQ</span>
            <h2 id="menu-faq-heading" className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Waffle House Menu — Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {menuFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-border rounded-2xl overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="flex w-full items-center justify-between p-6 text-left"
                  >
                    <span className="font-display text-base font-bold text-foreground">{faq.q}</span>
                    <span className="text-primary font-bold text-lg">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-ink-soft leading-relaxed border-t border-border/40 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 14. HOW WE UPDATE MENU INFORMATION */}
      <section className="bg-white py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl space-y-4 text-center">
          <span className="chip">Editorial Process</span>
          <h2 className="font-display text-2xl font-bold sm:text-3xl text-foreground">
            How We Update Menu Information
          </h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            Menu information on this website is organized from reliable publicly available information and reviewed for consistency across menu categories, pricing references and related pages. Menu availability and prices may vary by location and can change over time.
          </p>
          <div className="pt-2">
            <Link to="/about" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
              About This Menu Guide <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* 15. INDEPENDENT DISCLOSURE & LAST REVIEWED */}
      <section className="bg-surface py-10 font-sans">
        <div className="container-editorial max-w-4xl text-center space-y-3 text-xs text-ink-soft">
          <p>
            This is an independent informational website and is not affiliated with, endorsed by or sponsored by Waffle House, Inc. Menu items, prices, nutrition information and availability may vary by location and change over time.
          </p>
          <p className="font-semibold text-foreground">
            Menu information last reviewed: August 2026
          </p>
        </div>
      </section>

      {/* NEWSLETTER */}
      <SubscriberSection idPrefix="menu-sub" />
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* SEARCH & FILTER COMPONENT                                           */
/* ------------------------------------------------------------------ */

type SortKey = "popular" | "price-asc" | "price-desc" | "cal-asc" | "cal-desc" | "alpha";

const priceRanges = [
  { id: "any", label: "Any price", test: () => true },
  { id: "under-5", label: "Under $5", test: (p: number) => p < 5 },
  { id: "5-10", label: "$5 – $10", test: (p: number) => p >= 5 && p <= 10 },
  { id: "over-10", label: "$10+", test: (p: number) => p > 10 },
];

const calorieRanges = [
  { id: "any", label: "Any calories", test: () => true },
  { id: "under-400", label: "Under 400 cal", test: (c: number) => c < 400 },
  { id: "400-800", label: "400 – 800 cal", test: (c: number) => c >= 400 && c <= 800 },
  { id: "over-800", label: "800+ cal", test: (c: number) => c > 800 },
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

  return (
    <section aria-labelledby="finder-heading" className="border-b border-border bg-white font-sans">
      <div className="container-editorial py-16 md:py-24">
        <span className="chip">Menu Search</span>
        <h2
          id="finder-heading"
          className="mt-4 max-w-3xl font-display text-3xl font-bold sm:text-4xl md:text-5xl"
        >
          Search the Waffle House Menu
        </h2>
        <p className="mt-3 text-base text-ink-soft">
          Looking for a specific menu item? Search by name or browse by category.
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
                placeholder="Search waffles, eggs, hashbrowns, burgers..."
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

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-soft">
                Showing {results.length} menu items
              </p>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.slice(0, 6).map((item) => (
                <PremiumItemCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* BROWSE ALL 13 CATEGORIES                                           */
/* ------------------------------------------------------------------ */

function CategoryShowcase() {
  return (
    <section id="menu-categories" aria-labelledby="categories-heading" className="border-b border-border bg-surface font-sans">
      <div className="container-editorial py-16 md:py-24">
        <div className="max-w-3xl space-y-3">
          <span className="chip">Full Menu Categories</span>
          <h2
            id="categories-heading"
            className="font-display text-3xl font-bold sm:text-4xl md:text-5xl text-foreground"
          >
            Browse the Waffle House Menu by Category
          </h2>
          <p className="text-base text-ink-soft">
            Explore all 13 menu categories and find the dishes, sides, drinks and desserts included in each section.
          </p>
        </div>

        {/* Categories Grid (13 categories) */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CENTRAL_MENU_CATEGORIES.map((c) => (
            <article
              key={c.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={c.image}
                  alt={`Waffle House ${c.name.toLowerCase()} category`}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute bottom-3 right-3 rounded-md bg-black/75 px-2 py-0.5 text-xs font-bold text-white backdrop-blur-xs">
                  {c.itemCount} Items
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft flex-1">{c.shortDescription}</p>
                <Link
                  to={c.href as any}
                  className="mt-5 inline-flex w-fit items-center gap-2 border border-primary bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-primary transition hover:bg-primary hover:text-primary-foreground"
                >
                  View Category <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FEATURED MENU ITEMS                                                 */
/* ------------------------------------------------------------------ */

const featuredHighlights = [
  {
    tag: "Breakfast Selection",
    image: highlightBreakfast,
    alt: "All-Star breakfast plate with eggs, bacon, hashbrowns and toast",
    title: "All-Star Special™",
    body: "Two eggs cooked your way, hickory bacon, hashbrowns, and buttery Texas toast with a classic golden waffle.",
    price: "$10.95",
    cal: "1,180 cal",
    slug: "all-star-special",
    category: "all-star-special" as CategoryId,
  },
  {
    tag: "Waffle Selection",
    image: highlightWaffle,
    alt: "Pecan waffle drizzled with warm maple syrup and a pat of butter",
    title: "Pecan Waffle",
    body: "Toasted Georgia pecans baked right into that iconic sweet cream buttermilk batter. Crisp at the edges, tender in the middle.",
    price: "$5.50",
    cal: "560 cal",
    slug: "pecan-waffle",
    category: "waffles" as CategoryId,
  },
  {
    tag: "Angus Beef Selection",
    image: highlightValue,
    alt: "Angus cheeseburger with fries and a cold drink at a diner counter",
    title: "Quarter Pound Angus Hamburger",
    body: "Fresh-pressed USDA Choice Angus beef patty, melted American cheese, crisp lettuce, and sliced tomato on a toasted bun.",
    price: "$8.50",
    cal: "540 cal",
    slug: "quarter-pound-angus-hamburger",
    category: "burgers" as CategoryId,
  },
  {
    tag: "Sandwich Selection",
    image: highlightCombo,
    alt: "Grilled patty melt with hashbrowns and hot coffee on a diner tabletop",
    title: "Texas Angus Patty Melt",
    body: "Griddled thick Texas toast, caramelized sauteed onions, and seared Angus beef with melted slices of Swiss and American cheese.",
    price: "$9.95",
    cal: "790 cal",
    slug: "texas-angus-patty-melt",
    category: "sandwiches" as CategoryId,
  },
];

function FeaturedMenuItems() {
  return (
    <section aria-labelledby="featured-heading" className="border-b border-border bg-white font-sans">
      <div className="container-editorial py-16 md:py-24">
        <div className="max-w-2xl mb-12">
          <span className="chip">Featured Dishes</span>
          <h2
            id="featured-heading"
            className="mt-3 font-display text-3xl font-bold sm:text-4xl md:text-5xl text-foreground"
          >
            Featured Waffle House Menu Items
          </h2>
          <p className="mt-3 text-base text-ink-soft leading-relaxed">
            Explore a selection of menu items from across the Waffle House menu.
          </p>
        </div>

        <div className="space-y-16">
          {featuredHighlights.map((h, i) => {
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
                  <h3 className="mt-4 font-display text-3xl font-bold sm:text-4xl text-foreground">
                    {h.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-ink-soft">{h.body}</p>
                  <div className="mt-6 flex items-center gap-6 text-sm">
                    <span>
                      <span className="text-xs uppercase tracking-widest text-ink-soft font-semibold">Price</span>
                      <span className="ml-2 font-display text-xl font-bold text-primary">
                        {h.price}
                      </span>
                    </span>
                    <span>
                      <span className="text-xs uppercase tracking-widest text-ink-soft font-semibold">Calories</span>
                      <span className="ml-2 font-display text-xl font-bold text-foreground">{h.cal}</span>
                    </span>
                  </div>
                  <Link
                    to="/menu/$category/$slug"
                    params={{ category: h.category, slug: h.slug }}
                    className="mt-7 inline-flex items-center gap-2 border-b-2 border-primary pb-1 text-sm font-semibold uppercase tracking-widest text-primary hover:gap-3"
                  >
                    View Details <ArrowRight className="h-4 w-4" />
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

/* ------------------------------------------------------------------ */
/* PRICE TABLE                                                         */
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
        className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
      >
        {label}
        <ArrowUpDown
          className={`h-3 w-3 ${sortKey === key ? "text-primary" : "text-ink-soft"}`}
        />
      </button>
    </th>
  );

  return (
    <section aria-labelledby="prices-heading" className="border-b border-border bg-white font-sans">
      <div className="container-editorial py-16 md:py-24">
        <span className="chip">Price Reference</span>
        <h2
          id="prices-heading"
          className="mt-4 max-w-3xl font-display text-3xl font-bold sm:text-4xl md:text-5xl text-foreground"
        >
          Waffle House Menu Prices
        </h2>
        <p className="mt-3 text-base text-ink-soft max-w-2xl leading-relaxed">
          Menu prices can vary by restaurant location and may change over time. The prices shown on this website are provided as a reference and should be confirmed with the restaurant for the most current local pricing.
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
                        className="font-semibold text-foreground hover:text-primary hover:underline"
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
          Prices are estimates and may vary slightly by restaurant location.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* PREMIUM ITEM CARD HELPER                                            */
/* ------------------------------------------------------------------ */

function PremiumItemCard({ item }: { item: MenuItem }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={`Waffle House ${item.name}`}
          loading="lazy"
          width={800}
          height={600}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 rounded-md bg-black/75 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-xs">
          ${item.price.toFixed(2)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-bold uppercase tracking-widest text-ink-soft">
          {item.category}
        </span>
        <h4 className="mt-1 font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
          {item.name}
        </h4>
        <p className="mt-2 text-xs leading-relaxed text-ink-soft line-clamp-2 flex-1">
          {item.description}
        </p>
        <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-ink-soft">
          <span>{item.nutrition.calories} cal</span>
          <span>{item.nutrition.proteinG}g protein</span>
        </div>
        <Link
          to="/menu/$category/$slug"
          params={{ category: item.category, slug: item.slug }}
          className="mt-4 inline-flex items-center justify-center gap-1.5 border border-primary bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground transition-all"
        >
          View Details <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </article>
  );
}
