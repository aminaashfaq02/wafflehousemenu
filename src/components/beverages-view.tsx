import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
} from "lucide-react";

import data from "@/data/beverages.json";

// ── Photography — 21 unique slots (7 images, no adjacent duplicates) ────────
import introImg from "@/assets/cat-beverages.jpg";
import imgCoffee1 from "@/assets/popular-coffee.jpg";
import imgCoffee2 from "@/assets/article-late-night-coffee.jpg";
import imgCoffee3 from "@/assets/hero-4-coffee.jpg";
import imgTea from "@/assets/iced-coffee.jpg";
import imgDrinks1 from "@/assets/popular-drinks.jpg";
import imgDrinks2 from "@/assets/popular-healthy.jpg";
import imgFruit from "@/assets/nutrition-lowcal-fruit.jpg";
import imgOJ from "@/assets/contact-cat-nutrition.jpg";
import imgMilk from "@/assets/breakfast-table-cooking.jpg";
import imgSoda from "@/assets/menu-highlight-value.jpg";
import subscribeBgImg from "@/assets/waffles-subscribe-bg.jpg";

import { SubscriberSection } from "@/components/SubscriberSection";

interface RawItem {
  slug: string;
  name: string;
  price: number;
  calories: number;
  rating: number;
  description: string;
}

export interface BeverageItem extends RawItem {
  image: string;
}

// 21 items — hand-picked image per slot (no two adjacent cards share an image)
const SLOT_IMAGES = [
  imgCoffee1,  // 1  Classic Blend Coffee
  imgCoffee2,  // 2  Dark Roast Coffee
  imgCoffee3,  // 3  Decaf Coffee
  imgTea,      // 4  Hot Tea
  imgDrinks1,  // 5  Alice's Iced Tea Sweet
  imgDrinks2,  // 6  Alice's Iced Tea Unsweet
  imgFruit,    // 7  Alice's Teamonade
  imgOJ,       // 8  Simply Lemonade
  imgMilk,     // 9  Simply Orange Juice
  imgSoda,     // 10 Simply Apple Juice
  imgCoffee1,  // 11 Honest Kids Apple Juice
  imgTea,      // 12 Coca-Cola
  // ── Page 2 ──────────────────
  imgDrinks1,  // 13 Diet Coke
  imgCoffee2,  // 14 Sprite
  imgDrinks2,  // 15 Pibb Xtra
  imgSoda,     // 16 Barq's Root Beer
  imgFruit,    // 17 Hi-C Fruit Punch
  imgMilk,     // 18 Regular Milk 2%
  imgOJ,       // 19 Large Milk 2%
  imgCoffee3,  // 20 Regular Chocolate Milk
  imgTea,      // 21 Large Chocolate Milk
];

export const beverageItems: BeverageItem[] = (data.items as RawItem[]).map(
  (it, i) => ({ ...it, image: SLOT_IMAGES[i] ?? imgCoffee1 })
);

export const featuredName = data.items[0]?.name ?? "Classic Blend Coffee";
export const categoryIntro = "Every Waffle House Beverage — from the iconic bottomless coffee mug and Alice's Iced Tea™ to fountain sodas, fresh juices, and cold milk.";

const PAGE_SIZE = 12;

const faqs = [
  {
    q: "Does Waffle House offer free coffee refills?",
    a: "Yes! Waffle House serves bottomless coffee — your mug is refilled as many times as you like at no extra charge. Classic Blend and Dark Roast are both available.",
  },
  {
    q: "What is Alice's Iced Tea™ at Waffle House?",
    a: "Alice's Iced Tea™ is Waffle House's house-brewed signature Southern iced tea, available sweet (70 kcal) or unsweet (0 kcal). Alice's Teamonade™ mixes it 50/50 with lemonade.",
  },
  {
    q: "What fountain sodas does Waffle House serve?",
    a: "Waffle House serves Coca-Cola® products: Coca-Cola, Diet Coke, Sprite, Pibb Xtra, Barq's Root Beer, and Hi-C Fruit Punch — all $2.90 with free refills.",
  },
  {
    q: "Does Waffle House serve orange juice?",
    a: "Yes — Simply Orange Juice ($3.10, 160 kcal), Simply Apple Juice ($2.90, 160 kcal), and Honest Kids Apple Juice ($2.90, 35 kcal) are all available.",
  },
  {
    q: "Does Waffle House serve milk?",
    a: "Yes! Waffle House serves Regular Milk 2% ($2.65, 130 kcal), Large Milk 2% ($3.25, 250 kcal), Regular Chocolate Milk ($2.65, 230 kcal), and Large Chocolate Milk ($3.50, 440 kcal).",
  },
  {
    q: "What is the lowest-calorie drink at Waffle House?",
    a: "Alice's Iced Tea™ Unsweet and Diet Coke® are both 0 kcal. Classic Blend Coffee, Dark Roast, Decaf Coffee, and Hot Tea are all just 5 kcal.",
  },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT COMPONENT
═══════════════════════════════════════════════════════════════ */
export function BeveragesPageView({ initialPage = 1 }: { initialPage?: number }) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.max(1, Math.ceil(beverageItems.length / PAGE_SIZE));
  const currentItems = beverageItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const setPage = (n: number) => {
    setCurrentPage(n);
    const el = document.getElementById("all-recipes");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isFirst = currentPage === 1;

  return (
    <div>
      {/* ── PAGE 1 ONLY: HERO ─────────────────────────────────── */}
      {isFirst && (
        <section className="bg-[#F3F3F1]">
          <div className="container-editorial grid items-center gap-10 py-14 md:grid-cols-12 md:gap-12 md:py-20">
            {/* Featured image */}
            <div className="order-1 md:col-span-4">
              <div className="mx-auto max-w-[260px] text-center">
                <div className="mx-auto aspect-square w-full overflow-hidden rounded-2xl bg-muted shadow-[0_18px_40px_-24px_rgba(0,0,0,0.28)] ring-1 ring-black/5">
                  <img
                    src={introImg}
                    alt="Waffle House Beverages — Classic hot coffee mug, iced tea, sodas and fresh juice"
                    width={520}
                    height={520}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-soft">
                  Featured Drink
                </p>
                <a
                  href="#all-recipes"
                  className="mt-1 inline-block font-display text-base font-semibold tracking-tight text-foreground hover:text-primary"
                >
                  {featuredName}
                </a>
              </div>
            </div>

            {/* Heading + intro */}
            <div className="order-2 md:col-span-8">
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]"
              >
                <Link
                  to="/"
                  className="inline-flex items-center gap-1 rounded-sm bg-primary px-3 py-1.5 text-foreground hover:bg-primary/90"
                >
                  Waffle House <ChevronRight className="h-3 w-3" aria-hidden />
                </Link>
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-1 rounded-sm bg-primary px-3 py-1.5 text-foreground hover:bg-primary/90"
                >
                  Menu <ChevronRight className="h-3 w-3" aria-hidden />
                </Link>
                <span
                  aria-current="page"
                  className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-foreground"
                >
                  Beverages
                </span>
              </nav>

              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Beverages (Hot &amp; Cold Drinks) Menu
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
                {categoryIntro}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── PAGE 1 ONLY: FAQs ─────────────────────────────────── */}
      {isFirst && <FaqSection />}

      {/* ── ALL RECIPES GRID + PAGINATION (both pages) ────────── */}
      <section id="all-recipes" className="bg-white">
        <div className="container-editorial py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              All Drinks{totalPages > 1 ? ` (Page ${currentPage} of ${totalPages})` : ""}
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {isFirst
                ? "Every Beverage on the Menu"
                : `Beverages — Page ${currentPage}`}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              All 21 official Waffle House hot &amp; cold drinks — with verified 2026 U.S. prices and calorie counts (12 per page).
            </p>
          </div>

          {/* Recipe grid */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentItems.map((v) => (
              <BeverageCard key={v.slug} v={v} />
            ))}
          </div>

          {/* Pagination controls */}
          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-12 flex flex-wrap items-center justify-center gap-2"
            >
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-border bg-white px-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden /> Previous
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1;
                const active = n === currentPage;
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-primary text-black"
                        : "bg-white text-foreground border border-border hover:bg-primary/10"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setPage(currentPage + 1)}
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-border bg-white px-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
              >
                Next <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </nav>
          )}
        </div>
      </section>

      {/* Footer */}
      <SubscriberSection bgImage={subscribeBgImg} idPrefix={`beverages-${currentPage}`} />
      <div className="h-14 bg-white md:h-16" aria-hidden />
    </div>
  );
}

/* ─── FAQ SECTION ──────────────────────────────────────────────── */
function FaqSection() {
  return (
    <section className="bg-[#F4F4F2] border-t border-black/5 py-16 md:py-20">
      <div className="container-editorial">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Frequently Asked Questions
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Beverages FAQs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Common questions about Waffle House hot &amp; cold drinks, refills, sodas, juices, and calorie counts.
          </p>
        </div>
        <div className="mt-12 mx-auto max-w-4xl space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all hover:border-primary/50"
            >
              <h3 className="flex items-center gap-3 font-display text-lg font-semibold text-foreground">
                <HelpCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                {faq.q}
              </h3>
              <p className="mt-3 pl-8 text-base leading-relaxed text-ink-soft">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── RECIPE CARD ──────────────────────────────────────────────── */
function BeverageCard({ v }: { v: BeverageItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-30px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_28px_50px_-28px_rgba(0,0,0,0.25)]">
      <Link
        to="/menu/$category"
        params={{ category: "beverages" }}
        className="block aspect-[4/3] w-full overflow-hidden bg-muted"
        aria-label={`View: ${v.name}`}
      >
        <img
          src={v.image}
          alt={v.name}
          width={1200}
          height={900}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold leading-tight text-foreground">
          <Link
            to="/menu/$category"
            params={{ category: "beverages" }}
            className="hover:text-primary"
          >
            {v.name}
          </Link>
        </h3>
        <dl className="mt-3 space-y-1 text-sm text-ink-soft">
          <div>
            <dt className="inline">Price: </dt>
            <dd className="inline font-semibold text-foreground">
              ${v.price.toFixed(2)}
            </dd>
          </div>
          <div>
            <dt className="inline">Calories: </dt>
            <dd className="inline font-semibold text-foreground">
              {v.calories.toLocaleString()} kcal
            </dd>
          </div>
        </dl>
        <Link
          to="/menu/$category"
          params={{ category: "beverages" }}
          className="btn-primary mt-5 h-10 w-full justify-center text-sm"
        >
          View Recipe <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
