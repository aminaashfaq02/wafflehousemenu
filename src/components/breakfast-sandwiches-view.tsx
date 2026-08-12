import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Play,
  HelpCircle,
} from "lucide-react";

import data from "@/data/breakfast-sandwiches.json";

// Unique authentic photography for sandwiches & melts
import introImg from "@/assets/cat-sandwiches.jpg";
import img1 from "@/assets/chicken-sandwich.jpg";
import img2 from "@/assets/patty-melt.jpg";
import img3 from "@/assets/cat-texas-melt.jpg";
import img4 from "@/assets/cat-angus-burger.jpg";
import img5 from "@/assets/burger.jpg";
import img6 from "@/assets/menu-highlight-breakfast.jpg";
import img7 from "@/assets/all-star-breakfast.jpg";
import img8 from "@/assets/hero-2-breakfast.jpg";
import img9 from "@/assets/breakfast-hero.jpg";
import img10 from "@/assets/article-breakfast-plates.jpg";
import img11 from "@/assets/cat-biscuits.jpg";
import img12 from "@/assets/menu-highlight-combo.jpg";
import img13 from "@/assets/menu-highlight-value.jpg";
import img14 from "@/assets/nutrition-lowcal-eggs.jpg";
import img15 from "@/assets/tbone-steak.jpg";
import subscribeBgImg from "@/assets/about-subscribe-bg.jpg";
import videoBg1 from "@/assets/breakfast-table-cooking.jpg";
import videoBg2 from "@/assets/hero-6-kitchen.jpg";
import videoBg3 from "@/assets/nutrition-chef.jpg";
import videoBg4 from "@/assets/menu-cta-diner.jpg";
import { SubscriberSection } from "@/components/SubscriberSection";

interface RawItem {
  slug: string;
  name: string;
  price: number;
  calories: number;
  rating: number;
  description: string;
}

export interface SandwichItem extends RawItem {
  image: string;
}

const IMAGES = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15
];

export const sandwichItems: SandwichItem[] = (data.items as RawItem[]).map((it, i) => ({
  ...it,
  image: IMAGES[i % IMAGES.length],
}));

export const featuredName = data.items[0]?.name ?? "Egg Sandwich";
export const categoryIntro = "Handhelds off the Waffle House flat-top — Grade A eggs, melted American cheese, and your choice of meats.";

const popularPicks = [...sandwichItems].sort((a, b) => b.rating - a.rating).slice(0, 6);
const lighterPicks = [...sandwichItems].sort((a, b) => a.calories - b.calories).slice(0, 6);

// Real food video YouTube links
const videos = [
  { id: "1", title: "Building the Bacon, Egg & Cheese Sandwich", duration: "3:48", youtubeId: "iu-LBY6h6bU", image: videoBg1 },
  { id: "2", title: "Grilling Texas Toast Melts on the Flat-Top", duration: "4:22", youtubeId: "K4TOrB7at0Y", image: videoBg2 },
  { id: "3", title: "Sausage, Egg & Cheese Stack — Line Cook Prep", duration: "5:11", youtubeId: "9v3zqRq8_2E", image: videoBg3 },
  { id: "4", title: "How to Order Waffle House Melts & Sandwiches", duration: "3:34", youtubeId: "7d16CpWp-ok", image: videoBg4 },
];

const faqs = [
  {
    q: "What bread options are available for Waffle House Breakfast Sandwiches?",
    a: "You can order any breakfast sandwich on your choice of white, wheat, or Texas toast, or a grilled buttermilk biscuit.",
  },
  {
    q: "What makes Texas Melts different from classic sandwiches?",
    a: "Texas Melts are served on extra-thick, buttered Texas toast pressed on the flat-top grill until golden brown and crispy, with double melted American cheese.",
  },
  {
    q: "What meat choices are available for breakfast handhelds?",
    a: "Options include hickory-smoked bacon, pork sausage, chicken sausage, city ham, country ham, grilled chicken breast, and sliced cheesesteak beef.",
  },
  {
    q: "How many calories are in Waffle House Breakfast Sandwiches & Melts?",
    a: "Classic Egg Sandwiches start at 220 kcal. Bacon, Egg & Cheese sandwiches average 408 kcal, while thick Texas Melts range from 445 to 820 kcal.",
  },
  {
    q: "Are Breakfast Sandwiches & Melts served 24/7?",
    a: "Yes! Every breakfast sandwich, melt, and biscuit is cooked fresh to order 24 hours a day, 7 days a week.",
  },
];

export function BreakfastSandwichesPageView({ initialPage = 1 }: { initialPage?: number }) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const PAGE_SIZE = 12; // 12 items per page as explicitly requested!
  const totalPages = Math.max(1, Math.ceil(sandwichItems.length / PAGE_SIZE));
  const currentItems = sandwichItems.slice(
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
      {/* PAGE 1 ONLY: HERO SECTION */}
      {isFirst && (
        <section className="bg-[#F3F3F1]">
          <div className="container-editorial grid items-center gap-10 py-14 md:grid-cols-12 md:gap-12 md:py-20">
            <div className="order-1 md:col-span-4">
              <div className="mx-auto max-w-[260px] text-center">
                <div className="mx-auto aspect-square w-full overflow-hidden rounded-2xl bg-muted shadow-[0_18px_40px_-24px_rgba(0,0,0,0.28)] ring-1 ring-black/5">
                  <img
                    src={introImg}
                    alt="Waffle House Bacon, Egg & Cheese Sandwich — crispy bacon, egg and melted American cheese on grilled toast"
                    width={520}
                    height={520}
                    loading="eager"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-soft">
                  Featured Recipe
                </p>
                <a
                  href="#all-recipes"
                  className="mt-1 inline-block font-display text-base font-semibold tracking-tight text-foreground hover:text-primary"
                >
                  {featuredName}
                </a>
              </div>
            </div>

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
                  Breakfast Sandwiches & Melts
                </span>
              </nav>

              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Breakfast Sandwiches & Melts Menu
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
                {categoryIntro}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* PAGE 1 ONLY: Carousels, Videos, FAQs */}
      {isFirst && (
        <>
          <RecipeCarousel
            eyebrow="Reader Favorites"
            heading="Most-Loved Breakfast Handhelds"
            intro="The highest-rated sandwiches and melts our editors and readers keep coming back to."
            items={popularPicks}
            bg="bg-white"
          />
          <RecipeCarousel
            eyebrow="Lighter Choices"
            heading="Lower-Calorie Sandwich Picks"
            intro="The lightest ways to order breakfast handhelds — sorted from lowest verified calorie counts."
            items={lighterPicks}
            bg="bg-[#F7F7F7]"
          />
          <VideosSection />
          <FaqSection />
        </>
      )}

      {/* ALL RECIPES GRID & PAGINATION (Rendered cleanly on Page 1, Page 2, Page 3) */}
      <section id="all-recipes" className="bg-white">
        <div className="container-editorial py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              All Recipes {totalPages > 1 ? `(Page ${currentPage} of ${totalPages})` : ""}
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {isFirst ? "Every Breakfast Sandwich & Melt on the Menu" : `Breakfast Sandwiches & Melts — Page ${currentPage}`}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Every real Waffle House Breakfast Sandwich & Melt — with verified U.S. prices and calorie counts (12 recipes per page).
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentItems.map((v) => (
              <SandwichCard key={v.slug} v={v} />
            ))}
          </div>

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-12 flex flex-wrap items-center justify-center gap-2"
            >
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-border bg-white px-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-40 disabled:pointer-events-none"
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
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-border bg-white px-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary disabled:opacity-40 disabled:pointer-events-none"
              >
                Next <ChevronRight className="h-4 w-4" aria-hidden />
              </button>
            </nav>
          )}
        </div>
      </section>

      {/* FOOTER & SUBSCRIBER SECTION */}
      <SubscriberSection bgImage={subscribeBgImg} idPrefix={`sandwich-${currentPage}`} />

      <div className="h-14 bg-white md:h-16" aria-hidden />
    </div>
  );
}

function FaqSection() {
  return (
    <section className="bg-[#F4F4F2] border-t border-black/5 py-16 md:py-20">
      <div className="container-editorial">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Frequently Asked Questions
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Breakfast Sandwiches & Melts FAQs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Answers to common questions about Waffle House breakfast sandwiches, Texas melts, calories, and bread options.
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

function SandwichCard({ v }: { v: SandwichItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-30px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_28px_50px_-28px_rgba(0,0,0,0.25)]">
      <Link
        to="/menu/$category"
        params={{ category: "sandwiches" }}
        className="block aspect-[4/3] w-full overflow-hidden bg-muted"
        aria-label={`View recipe: ${v.name}`}
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
            params={{ category: "sandwiches" }}
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
          params={{ category: "sandwiches" }}
          className="btn-primary mt-5 h-10 w-full justify-center text-sm"
        >
          View Recipe <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

function RecipeCarousel({
  eyebrow,
  heading,
  intro,
  items,
  bg,
}: {
  eyebrow: string;
  heading: string;
  intro: string;
  items: SandwichItem[];
  bg: string;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };
  return (
    <section className={bg}>
      <div className="container-editorial py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            {eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">{intro}</p>
        </div>

        <div className="relative mt-12">
          <div
            ref={scrollerRef}
            className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((v) => (
              <div
                key={`${eyebrow}-${v.slug}`}
                className="w-[calc((100%-1.5rem)/2)] flex-none snap-start sm:w-[calc((100%-3rem)/3)] lg:w-[calc((100%-6rem)/5)]"
              >
                <SandwichCard v={v} />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label={`Previous ${heading}`}
            className="absolute -left-2 top-[38%] hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white p-3 text-foreground shadow-md transition-all hover:border-primary hover:text-primary md:inline-flex"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label={`Next ${heading}`}
            className="absolute -right-2 top-[38%] hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white p-3 text-foreground shadow-md transition-all hover:border-primary hover:text-primary md:inline-flex"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}

function VideosSection() {
  return (
    <section className="bg-white border-t border-black/5">
      <div className="container-editorial py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Watch &amp; Learn
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Breakfast Sandwich &amp; Melt Videos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Short editorial clips on how Waffle House grills the toast and builds every signature breakfast handheld.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((v) => (
            <a
              key={v.id}
              href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:ring-primary"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={v.image}
                  alt={v.title}
                  width={800}
                  height={450}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/35">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-foreground shadow-lg transition-transform group-hover:scale-110">
                    <Play className="h-6 w-6 fill-current" aria-hidden />
                  </span>
                </div>
                <span className="absolute bottom-2 right-2 rounded bg-black/75 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                  {v.duration}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
                  {v.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
