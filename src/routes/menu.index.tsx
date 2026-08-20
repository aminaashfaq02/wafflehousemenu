import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Clock,
  DollarSign,
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
  Filter,
  CheckCircle2,
} from "lucide-react";
import { categories, menu, type CategoryId, type MenuItem } from "@/data/menu";
import { CENTRAL_MENU_CATEGORIES, TOTAL_MENU_CATEGORIES, TOTAL_MENU_ITEMS } from "@/data/centralMenuData";
import { blogPosts } from "@/data/blogPosts";
import { SubscriberSection } from "@/components/SubscriberSection";

const SITE = "https://wafflehousemenu.com";

const menuFaqs = [
  {
    q: "What is included on the Waffle House menu?",
    a: "The Waffle House menu includes classic American diner dishes across 13 categories: sweet cream waffles, egg breakfasts, Toddle House® omelets, hashbrown bowls, Texas melts, grilled biscuits, Angus burgers, classic sandwiches, dinner platters, hashbrowns & 8 custom toppings, sides, pies, and beverages.",
  },
  {
    q: "How many menu categories and dishes are listed here?",
    a: `Our independent reference compiles ${TOTAL_MENU_CATEGORIES} primary menu categories and ${TOTAL_MENU_ITEMS}+ verified dishes, variations, and beverages with published prices and nutrition.`,
  },
  {
    q: "How much does a meal cost at Waffle House on average?",
    a: "Individual waffles and breakfast sandwiches range between $3.50 and $7.50. Combination platters like the All-Star Special™ or USDA Choice T-Bone dinner range from $9.95 to $16.50.",
  },
  {
    q: "Does Waffle House have a printable menu PDF?",
    a: "Yes! You can download the complete, official 11-page printable Waffle House nutrition and menu reference PDF directly using the download buttons on this page.",
  },
  {
    q: "Are Waffle House nutritional values and calorie counts published?",
    a: "Yes, calories and nutrition facts are published on menus and fully detailed in our Nutrition Guide, covering calories, fat, carbohydrates, sodium, protein, and kitchen allergen cross-contact disclosures.",
  },
  {
    q: "Are all menu items served 24 hours a day?",
    a: "Yes. Every Waffle House diner serves the complete menu 24 hours a day, 7 days a week, 365 days a year. You can order waffles, steaks, melts, or hashbrowns at any time of day or night.",
  },
];

type MenuFilter = "all" | "under5" | "under10" | "under500cal" | "vegetarian" | "highprotein";

export const Route = createFileRoute("/menu/")({
  head: () => ({
    meta: [
      { title: "Waffle House Menu with Prices 2026 | Full Diner Directory" },
      {
        name: "description",
        content: `Explore the complete Waffle House menu with current prices, calorie counts, photos, 13 categories, 125+ dishes, allergen guides, and printable PDF reference.`,
      },
      { property: "og:title", content: "Waffle House Menu with Prices 2026 | Full Diner Directory" },
      {
        property: "og:description",
        content: `Explore the complete Waffle House menu with current prices, calorie counts, photos, 13 categories, 125+ dishes, allergen guides, and printable PDF reference.`,
      },
      { property: "og:url", content: `${SITE}/menu/` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/menu/` }],
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
  component: MenuIndexPage,
});

const categoryDescriptions: Record<string, string> = {
  "all-star-special": "The signature breakfast combination that made Waffle House famous. Combines two fresh eggs cooked to order, hashbrowns or grits, hot toast or biscuit, choice of breakfast meat, and a sweet cream waffle.",
  "waffles": "Crisp on the outside, light and fluffy on the inside. Baked fresh to order on scorching heavy iron plates with authentic sweet cream buttermilk batter and served with warm syrup and whipped butter.",
  "breakfast": "Farm-fresh USDA Grade A eggs scrambled, fried, or poached to your exact preference. Served with griddled hashbrowns, hot grits, and choice of white, wheat, or raisin toast.",
  "omelets": "Whipped at high speed in commercial spindle mixers to incorporate micro-air bubbles for supreme fluffiness. Folded around melted cheeses, hickory smoked ham, or cheesesteak.",
  "hashbrown-bowls": "Hearty meal bowls built upon a double portion of crispy scattered hashbrowns, smothered with melted cheese, eggs, and seasoned meats.",
  "breakfast-sandwiches": "Freshly cracked eggs, hickory smoked bacon, sausage patties, and melted cheese griddled between buttered Texas toast, buns, or sliced bread.",
  "biscuits": "Warm Southern-style buttermilk biscuits grilled golden with butter. Available plain, stuffed with sausage or fried chicken, or ladled with thick sausage country gravy.",
  "burgers": "100% pure Angus beef patties seared on a 400°F griddle to lock in natural juices. Served on toasted buns with crisp lettuce, tomato, pickles, and grilled onions.",
  "sandwiches": "Classic diner sandwich favorites including Texas bacon lovers BLTs, grilled cheeses, and marinated chicken breasts grilled tender.",
  "classic-dinners": "Hearty dinner platters featuring USDA Choice T-Bone steaks, Sirloin steaks, and grilled pork chops. Served with a garden salad, hashbrowns, and Texas toast.",
  "hashbrowns": "100% shredded Idaho Russet potatoes scattered on the flat top and griddled crisp. Available in Regular, Large, or Triple, customized with any of the 8 famous toppings.",
  "sides": "Diner sides including crispy bacon strips, sausage patties, city ham, country ham, bowls of grits, Bert's chili, and whole Southern pecan pies.",
  "beverages": "Alice's bottomless freshly brewed Royal Cup coffee, iced coffees, Minute Maid orange juice, Southern sweet iced tea, and ice-cold soft drinks."
};

function MenuIndexPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<MenuFilter>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Group all menu items by category
  const categoryGroups = useMemo(() => {
    return categories.map((cat) => {
      let items = menu.filter((m) => m.category === cat.id);

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        items = items.filter(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.description.toLowerCase().includes(q) ||
            m.tagline.toLowerCase().includes(q)
        );
      }

      if (activeFilter === "under5") {
        items = items.filter((m) => m.price < 5.0);
      } else if (activeFilter === "under10") {
        items = items.filter((m) => m.price < 10.0);
      } else if (activeFilter === "under500cal") {
        items = items.filter((m) => m.nutrition.calories > 0 && m.nutrition.calories < 500);
      } else if (activeFilter === "vegetarian") {
        items = items.filter((m) => !m.allergens.includes("fish") && !m.name.toLowerCase().includes("bacon") && !m.name.toLowerCase().includes("sausage") && !m.name.toLowerCase().includes("steak") && !m.name.toLowerCase().includes("chicken") && !m.name.toLowerCase().includes("ham"));
      } else if (activeFilter === "highprotein") {
        items = items.filter((m) => m.nutrition.proteinG >= 20);
      }

      return {
        category: cat,
        items,
        totalItems: menu.filter((m) => m.category === cat.id).length,
      };
    });
  }, [searchTerm, activeFilter]);

  const totalFilteredCount = useMemo(() => {
    return categoryGroups.reduce((acc, g) => acc + g.items.length, 0);
  }, [categoryGroups]);

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <main className="bg-white text-foreground font-sans">
      {/* ── BREADCRUMB ── */}
      <nav aria-label="Breadcrumb" className="bg-surface py-3 border-b border-border font-sans">
        <div className="container-editorial flex items-center gap-2 text-xs font-medium text-ink-soft">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="text-foreground font-semibold">Menu</span>
        </div>
      </nav>

      {/* ── HEADER / EDITORIAL SUMMARY ── */}
      <section className="bg-white py-10 md:py-14 border-b border-border">
        <div className="container-editorial max-w-5xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Full Menu · 2026 Diner Guide
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight">
              The Complete Waffle House Menu with Prices
            </h1>
          </div>

          {/* Author & Verification Byline */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-ink-soft pt-1 border-t border-border/60 pt-3">
            <span>By <Link to="/about" className="text-foreground font-semibold hover:underline">Marcus Goodwin</Link>, Diner Editor</span>
            <span>·</span>
            <span>Reviewed 19 August 2026</span>
            <span>·</span>
            <span>Menu checked 18 August 2026</span>
            <span>·</span>
            <Link to="/methodology" className="text-primary font-semibold hover:underline">How this is sourced</Link>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-ink-soft max-w-3xl">
            {TOTAL_MENU_ITEMS}+ verified dishes across {TOTAL_MENU_CATEGORIES} categories, with published prices, calorie counts, allergen disclosures, and griddle options. Browse by section, use instant search and filters below, or{" "}
            <a href="/waffle-house-menu-nutritionals.pdf" download className="text-primary font-bold hover:underline">
              download the full menu as a PDF
            </a>.
          </p>

          {/* 3 Summary Fact Badges */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg pt-2">
            <div className="rounded-2xl border border-border bg-surface p-4 text-center shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-soft block">Items</span>
              <p className="font-display text-2xl sm:text-3xl font-black text-primary mt-0.5">{TOTAL_MENU_ITEMS}+</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 text-center shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-soft block">Categories</span>
              <p className="font-display text-2xl sm:text-3xl font-black text-foreground mt-0.5">{TOTAL_MENU_CATEGORIES}</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 text-center shadow-2xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-soft block">Locations</span>
              <p className="font-display text-2xl sm:text-3xl font-black text-foreground mt-0.5">1,900+</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH & QUICK FILTER PILLS ── */}
      <section className="bg-surface py-6 border-b border-border sticky top-0 z-30 backdrop-blur-md bg-surface/95">
        <div className="container-editorial max-w-5xl space-y-4">
          {/* Instant Search Bar */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search 125+ menu items, waffles, hashbrowns, melts, omelets…"
              className="h-11 w-full rounded-2xl border border-border bg-white pl-11 pr-10 text-xs sm:text-sm text-foreground placeholder:text-ink-soft/70 shadow-2xs focus:border-primary focus:outline-none"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-ink-soft hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setActiveFilter("all")}
              className={`rounded-full px-4 py-1.5 font-bold transition-all shrink-0 ${
                activeFilter === "all"
                  ? "bg-primary text-black shadow-xs font-black"
                  : "bg-white border border-border text-foreground hover:border-primary"
              }`}
            >
              All Dishes ({totalFilteredCount})
            </button>
            <button
              onClick={() => setActiveFilter("under5")}
              className={`rounded-full px-4 py-1.5 font-bold transition-all shrink-0 ${
                activeFilter === "under5"
                  ? "bg-primary text-black shadow-xs font-black"
                  : "bg-white border border-border text-foreground hover:border-primary"
              }`}
            >
              Under $5
            </button>
            <button
              onClick={() => setActiveFilter("under10")}
              className={`rounded-full px-4 py-1.5 font-bold transition-all shrink-0 ${
                activeFilter === "under10"
                  ? "bg-primary text-black shadow-xs font-black"
                  : "bg-white border border-border text-foreground hover:border-primary"
              }`}
            >
              Under $10
            </button>
            <button
              onClick={() => setActiveFilter("under500cal")}
              className={`rounded-full px-4 py-1.5 font-bold transition-all shrink-0 ${
                activeFilter === "under500cal"
                  ? "bg-primary text-black shadow-xs font-black"
                  : "bg-white border border-border text-foreground hover:border-primary"
              }`}
            >
              Under 500 Cal
            </button>
            <button
              onClick={() => setActiveFilter("vegetarian")}
              className={`rounded-full px-4 py-1.5 font-bold transition-all shrink-0 ${
                activeFilter === "vegetarian"
                  ? "bg-primary text-black shadow-xs font-black"
                  : "bg-white border border-border text-foreground hover:border-primary"
              }`}
            >
              Vegetarian
            </button>
            <button
              onClick={() => setActiveFilter("highprotein")}
              className={`rounded-full px-4 py-1.5 font-bold transition-all shrink-0 ${
                activeFilter === "highprotein"
                  ? "bg-primary text-black shadow-xs font-black"
                  : "bg-white border border-border text-foreground hover:border-primary"
              }`}
            >
              High Protein (20g+)
            </button>
          </div>
        </div>
      </section>

      {/* ── CATEGORY QUICK JUMP DIRECTORY ── */}
      <section className="bg-white py-8 border-b border-border font-sans">
        <div className="container-editorial max-w-5xl">
          <div className="mb-4">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              Categories
            </span>
            <h2 className="font-display text-xl font-bold text-foreground mt-0.5">
              {TOTAL_MENU_CATEGORIES} Active Sections
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => {
              const count = menu.filter((m) => m.category === c.id).length;
              return (
                <button
                  key={c.id}
                  onClick={() => scrollToCategory(`cat-${c.id}`)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-foreground transition hover:border-primary hover:bg-primary/10 hover:text-primary"
                >
                  <span>{c.name}</span>
                  <span className="text-[10px] text-ink-soft">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FULL MENU: 13 CATEGORY BLOCKS WITH DETAILED ITEMS ── */}
      <section className="py-12 md:py-16 space-y-16">
        <div className="container-editorial max-w-5xl space-y-16">
          {categoryGroups.map(({ category, items, totalItems }) => {
            if (items.length === 0) return null;
            const desc = categoryDescriptions[category.id] || category.blurb;
            const catHref = CENTRAL_MENU_CATEGORIES.find((c) => c.id === category.id)?.href || `/menu/${category.id}`;

            return (
              <section
                key={category.id}
                id={`cat-${category.id}`}
                className="scroll-mt-28 space-y-6 pt-6 border-t border-border/70 first:border-0 first:pt-0"
              >
                {/* Category Header Bar */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                  <div className="space-y-1 max-w-2xl">
                    <span className="inline-block rounded-full bg-primary/15 text-primary-foreground font-bold px-2.5 py-0.5 text-[11px] uppercase tracking-wider">
                      {items.length} items
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                      {category.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
                      {desc}
                    </p>
                  </div>
                  <Link
                    to={catHref as any}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline shrink-0"
                  >
                    Open category →
                  </Link>
                </div>

                {/* Items Grid for this Category */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((dish) => (
                    <Link
                      key={dish.slug}
                      to="/menu/$category/$slug"
                      params={{ category: dish.category, slug: dish.slug }}
                      className="group flex flex-col justify-between rounded-2xl border border-border bg-white p-4 shadow-2xs hover:border-primary hover:shadow-md transition-all duration-200"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                            {dish.name}
                          </h3>
                          <span className="font-display text-sm font-black text-primary shrink-0">
                            ${dish.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-ink-soft leading-relaxed line-clamp-2">
                          {dish.description}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/40 text-[11px]">
                        <span className="inline-flex items-center gap-1 font-bold text-ink-soft">
                          <Clock className="h-3 w-3 text-primary" /> {dish.nutrition.calories} cal
                        </span>
                        <span className="text-[10px] font-bold text-primary group-hover:underline">
                          View details →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      {/* ── PRINTABLE MENU PDF BANNER ── */}
      <section className="bg-[#0B0C0E] border-y border-white/10 text-white font-sans">
        <div className="container-editorial py-12 md:py-16">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-[#18191B] to-[#0B0C0E] border border-white/10 p-8 md:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left max-w-lg">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 ring-1 ring-inset ring-amber-500/20">
                <FileText className="h-3.5 w-3.5" /> Printable 11-Page Reference Document
              </span>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Download Waffle House Menu PDF
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-white/75">
                Download the full printable 11-page Waffle House menu and nutritional panel covering all categories, macros, calories, and allergen disclosures.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="/waffle-house-menu-nutritionals.pdf"
                download="waffle-house-menu-nutritionals.pdf"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-xs sm:text-sm font-bold text-black transition-all hover:bg-[#E2B000]"
              >
                <Download className="h-4 w-4" /> Download Menu PDF (37 KB)
              </a>
              <Link
                to="/nutrition"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white/10 px-6 text-xs sm:text-sm font-semibold text-white border border-white/20 transition-all hover:bg-white/20"
              >
                View Full Nutrition
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section aria-labelledby="menu-faq-heading" className="bg-white py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl">
          <div className="text-center mb-10 space-y-2">
            <span className="chip">Menu FAQs</span>
            <h2 id="menu-faq-heading" className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {menuFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-border rounded-2xl overflow-hidden bg-white shadow-2xs">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between p-5 sm:p-6 text-left font-sans"
                  >
                    <span className="font-display text-base font-bold text-foreground">{faq.q}</span>
                    <span className="text-primary font-black text-xl">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-ink-soft leading-relaxed border-t border-border/40 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER BOX ── */}
      <SubscriberSection idPrefix="menu-sub" />
    </main>
  );
}
