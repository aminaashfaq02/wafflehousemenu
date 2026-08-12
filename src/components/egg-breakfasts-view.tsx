import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Play,
  HelpCircle,
  Utensils,
  Flame,
} from "lucide-react";

import data from "@/data/egg-breakfasts.json";

// Photography imports
import introImg from "@/assets/cat-egg-breakfasts.jpg";
import img1 from "@/assets/nutrition-lowcal-eggs.jpg";
import img2 from "@/assets/all-star-breakfast.jpg";
import img3 from "@/assets/hero-2-breakfast.jpg";
import img4 from "@/assets/menu-highlight-breakfast.jpg";
import img5 from "@/assets/breakfast-hero.jpg";
import img6 from "@/assets/tbone-steak.jpg";
import img7 from "@/assets/breakfast-table-cooking.jpg";
import img8 from "@/assets/article-breakfast-plates.jpg";
import img9 from "@/assets/article-hashbrowns.jpg";
import subscribeBgImg from "@/assets/about-subscribe-bg.jpg";
import videoBg1 from "@/assets/menu-highlight-combo.jpg";
import videoBg2 from "@/assets/breakfast-intro.jpg";
import videoBg3 from "@/assets/hero-6-kitchen.jpg";
import videoBg4 from "@/assets/nutrition-chef.jpg";
import { SubscriberSection } from "@/components/SubscriberSection";

export interface OfficialEggRecipe {
  id: number;
  name: string;
  priceNote: string;
  price: string;
  calories: number;
  prep: string;
  imageDesc: string;
}

export const officialEggRecipes: OfficialEggRecipe[] = ((data as any).officialRecipes ?? []) as OfficialEggRecipe[];

interface RawItem {
  slug: string;
  name: string;
  price: number;
  calories: number;
  rating: number;
  description: string;
  image?: string;
}

export interface EggItem extends RawItem {
  image: string;
}

const IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

export const eggItems: EggItem[] = (data.items as RawItem[]).map((it, i) => ({
  ...it,
  image: IMAGES[i % IMAGES.length],
}));

export const featuredName = (data as any).featured?.name ?? "All-Star Special®";
export const categoryIntro = (data as any).category?.intro ?? "Waffle House Egg Breakfasts";

const popularPicks = [...eggItems].sort((a, b) => b.rating - a.rating).slice(0, 8);
const lighterPicks = [...eggItems].sort((a, b) => a.calories - b.calories).slice(0, 8);

const videos = [
  { id: "1", title: "How Waffle House Cooks Two Eggs Any Style", duration: "3:42", youtubeId: "iu-LBY6h6bU", image: videoBg1 },
  { id: "2", title: "Bacon, Sausage or Ham — Choosing Your Meat", duration: "4:18", youtubeId: "K4TOrB7at0Y", image: videoBg2 },
  { id: "3", title: "Hashbrowns vs. Grits: A Southern Debate", duration: "5:02", youtubeId: "9v3zqRq8_2E", image: videoBg3 },
  { id: "4", title: "Inside a 24/7 Waffle House Breakfast Line", duration: "6:24", youtubeId: "7d16CpWp-ok", image: videoBg4 },
];

const faqs = [
  {
    q: "How are eggs prepared at Waffle House?",
    a: "Two Grade A farm-fresh eggs are cracked directly onto the flat-top griddle and cooked fresh to your order — scrambled, fried, over-easy, over-medium, or poached.",
  },
  {
    q: "What comes with an Egg Breakfast or Steak & Eggs meal?",
    a: "Every Egg Breakfast plate includes two eggs cooked your way, buttered toast with jelly (white, wheat, raisin, Texas toast, or grilled biscuit), and your choice of hashbrowns, grits, or sliced tomatoes.",
  },
  {
    q: "What steak cuts are available for Steak & Eggs?",
    a: "Waffle House serves USDA Choice T-Bone Steaks, Delmonico Steaks, and Sirloin Steaks, grilled on the flat top to your preferred temperature.",
  },
  {
    q: "How many calories are in a standard 2 Egg Breakfast?",
    a: "A 2 Egg Breakfast combo with toast and hashbrowns or grits averages 670 calories. Pairing with lean chicken or tomatoes reduces calories to under 550 kcal.",
  },
  {
    q: "Are Egg Breakfasts and Steaks served all day?",
    a: "Yes! Waffle House serves its entire breakfast and steak menu 24 hours a day, 7 days a week.",
  },
];

export function EggBreakfastsPageView({ initialPage = 1 }: { initialPage?: number }) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const PAGE_SIZE = 6;
  const totalPages = Math.max(1, Math.ceil(eggItems.length / PAGE_SIZE));
  const currentItems = eggItems.slice(
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
      {/* SECTION 1 — PAGE INTRODUCTION */}
      {isFirst && (
        <section className="bg-[#F3F3F1]">
          <div className="container-editorial grid items-center gap-10 py-14 md:grid-cols-12 md:gap-12 md:py-20">
            <div className="order-1 md:col-span-4">
              <div className="mx-auto max-w-[260px] text-center">
                <div className="mx-auto aspect-square w-full overflow-hidden rounded-2xl bg-muted shadow-[0_18px_40px_-24px_rgba(0,0,0,0.28)] ring-1 ring-black/5">
                  <img
                    src={introImg}
                    alt="Waffle House Two Egg Breakfast — two eggs, buttered toast, hashbrowns"
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
                  Egg Breakfasts & Steaks
                </span>
              </nav>

              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Egg Breakfasts & Steaks Recipes
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
                {categoryIntro}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTIONS 2–5 — Only on page 1: Official recipe breakdown, carousels, videos, faqs */}
      {isFirst && (
        <>
          <OfficialComponentsSection />
          <RecipeCarousel
            eyebrow="Reader Favorites"
            heading="Most-Loved Egg & Steak Plates"
            intro="The highest-rated Egg Breakfast & Steak plates our editors and readers keep coming back to."
            items={popularPicks}
            bg="bg-white"
          />
          <RecipeCarousel
            eyebrow="Lighter Choices"
            heading="Lower-Calorie Egg Breakfasts"
            intro="The lightest ways to order two eggs at Waffle House — sorted from the lowest verified calorie counts."
            items={lighterPicks}
            bg="bg-[#F7F7F7]"
          />
          <VideosSection />
          <FaqSection />
        </>
      )}

      {/* SECTION 6 — RECIPE GRID (PAGINATED) */}
      <section id="all-recipes" className="bg-white">
        <div className="container-editorial py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              All Recipes {totalPages > 1 ? `(Page ${currentPage} of ${totalPages})` : ""}
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {isFirst ? "Every Egg Breakfast & Steak on the Menu" : `Egg Breakfasts & Steaks — Page ${currentPage}`}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Every real Waffle House Egg Breakfast & Steak plate — with verified U.S. prices and calorie counts.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((v) => (
              <EggCard key={v.slug} v={v} />
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

      {/* SUBSCRIBE — page 1 only */}
      {isFirst && (
        <SubscriberSection bgImage={subscribeBgImg} idPrefix={`egg-${currentPage}`} />
      )}

      <div className="h-14 bg-white md:h-16" aria-hidden />
    </div>
  );
}

function OfficialComponentsSection() {
  return (
    <section className="bg-[#F7F7F5] border-y border-black/5 py-16 md:py-20">
      <div className="container-editorial">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Official Menu Specifications
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            9 Official Egg Breakfasts & Steaks Recipes
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Explore the 9 authentic Egg Breakfast & Steak recipes served across Waffle House locations — complete with verified calorie counts and preparation methods.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {officialEggRecipes.map((item) => (
            <div
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all hover:border-primary hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-1 rounded-md bg-primary/15 px-2.5 py-1 text-xs font-bold text-foreground">
                  <Utensils className="h-3.5 w-3.5" /> Recipe {item.id}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
                  <Flame className="h-3.5 w-3.5 text-amber-600" /> {item.calories} kcal
                </span>
              </div>

              <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                {item.name}
              </h3>
              <div className="mt-1 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-primary">
                <span>{item.priceNote}</span>
                <span className="text-foreground">{item.price}</span>
              </div>

              <div className="mt-4 space-y-3 text-sm text-ink-soft border-t border-black/5 pt-3">
                <div>
                  <span className="font-semibold text-foreground">Recipe / Preparation: </span>
                  {item.prep}
                </div>
                <div>
                  <span className="font-semibold text-foreground">Visual Finish: </span>
                  {item.imageDesc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
            Egg Breakfasts & Steaks FAQs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Real answers to common questions about Waffle House eggs, USDA choice steaks, pork chops, calories, and customization.
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

function EggCard({ v }: { v: EggItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-30px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_28px_50px_-28px_rgba(0,0,0,0.25)]">
      <Link
        to="/menu/$category"
        params={{ category: "egg-breakfasts" }}
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
            params={{ category: "egg-breakfasts" }}
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
          params={{ category: "egg-breakfasts" }}
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
  items: EggItem[];
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
                <EggCard v={v} />
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
            Egg Breakfast &amp; Steak Videos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Short editorial clips on how Waffle House cooks eggs, grills steaks and builds the classic breakfast plate.
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
