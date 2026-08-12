import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Play,
  HelpCircle,
  Egg,
  Flame,
} from "lucide-react";

import data from "@/data/omelets.json";

// Photography imports
import introImg from "@/assets/cat-omelets.jpg";
import img1 from "@/assets/menu-highlight-breakfast.jpg";
import img2 from "@/assets/all-star-breakfast.jpg";
import img3 from "@/assets/hero-2-breakfast.jpg";
import img4 from "@/assets/breakfast-hero.jpg";
import img5 from "@/assets/breakfast-intro.jpg";
import img6 from "@/assets/article-breakfast-plates.jpg";
import subscribeBgImg from "@/assets/about-subscribe-bg.jpg";
import videoBg1 from "@/assets/menu-highlight-combo.jpg";
import videoBg2 from "@/assets/breakfast-table-cooking.jpg";
import videoBg3 from "@/assets/hero-6-kitchen.jpg";
import videoBg4 from "@/assets/nutrition-chef.jpg";
import { SubscriberSection } from "@/components/SubscriberSection";

export interface OfficialOmeletRecipe {
  id: number;
  name: string;
  priceNote: string;
  price: string;
  calories: number;
  prep: string;
  imageDesc: string;
}

export const officialOmeletRecipes: OfficialOmeletRecipe[] = ((data as unknown as { officialRecipes?: OfficialOmeletRecipe[] }).officialRecipes ?? []) as OfficialOmeletRecipe[];

interface RawItem {
  slug: string;
  name: string;
  price: number;
  calories: number;
  rating: number;
  description: string;
}

export interface OmeletItem extends RawItem {
  image: string;
}

const IMAGES = [img1, img2, img3, img4, img5, img6];

export const omeletItems: OmeletItem[] = (data.items as RawItem[]).map((it, i) => ({
  ...it,
  image: IMAGES[i % IMAGES.length],
}));

export const featuredName = data.items[0]?.name ?? "Cheese Omelet Breakfast";
export const categoryIntro = "The Toddle House® Omelets line is Waffle House's signature two-egg omelet menu — light, fluffy and folded to order on the flat-top.";

const popularPicks = [...omeletItems].sort((a, b) => b.rating - a.rating).slice(0, 6);
const lighterPicks = [...omeletItems].sort((a, b) => a.calories - b.calories).slice(0, 6);

// Real food video YouTube links
const videos = [
  { id: "1", title: "How Waffle House Cooks & Folds Cheese Omelets", duration: "3:12", youtubeId: "iu-LBY6h6bU", image: videoBg1 },
  { id: "2", title: "Making the Ham & Cheese Omelet on the Grill", duration: "4:05", youtubeId: "K4TOrB7at0Y", image: videoBg2 },
  { id: "3", title: "Cheesesteak & Fiesta Omelet Grill Masterclass", duration: "4:48", youtubeId: "9v3zqRq8_2E", image: videoBg3 },
  { id: "4", title: "Line Cook Guide: Fluffy 2-Egg Omelets Every Time", duration: "5:36", youtubeId: "7d16CpWp-ok", image: videoBg4 },
];

const faqs = [
  {
    q: "What makes Toddle House® Omelets so fluffy?",
    a: "Waffle House line cooks whip two fresh Grade A eggs at high speed before pouring them onto a medium-heat flat-top grill, folding in fillings while the eggs are perfectly set and soft.",
  },
  {
    q: "What comes included with a Toddle House® Omelet Breakfast?",
    a: "Every Toddle House® Omelet breakfast plate comes with your choice of toast (white, wheat, raisin, Texas toast, or grilled biscuit) and a side of hashbrowns, grits, or sliced fresh tomatoes.",
  },
  {
    q: "Can I customize my Toddle House® Omelet?",
    a: "Yes! With the 'Build Your Own Omelet' option, you can add melted American cheese, bacon, sausage, grilled chicken, ham, cheesesteak beef, onions, tomatoes, mushrooms, and jalapeños.",
  },
  {
    q: "How many calories are in Waffle House Omelets?",
    a: "A base 2-egg plain omelet is 180 kcal. Cheese Omelets start at 280 kcal (base) or ~500 kcal for the full meal combo. Full steak or ham combos range from 560 to 950 kcal.",
  },
  {
    q: "Are Toddle House® Omelets served 24/7?",
    a: "Yes, all Toddle House® Omelets are served hot and fresh 24 hours a day, 7 days a week at every Waffle House location.",
  },
];

export function OmeletsPageView({ initialPage = 1 }: { initialPage?: number }) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const PAGE_SIZE = 6;
  const totalPages = Math.max(1, Math.ceil(omeletItems.length / PAGE_SIZE));
  const currentItems = omeletItems.slice(
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
                    alt="Waffle House Toddle House Omelet — fluffy two-egg omelet with cheese"
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
                  Toddle House® Omelets
                </span>
              </nav>

              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Toddle House® Omelets Menu
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
                {categoryIntro}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* PAGE 1 ONLY: Official Recipes, Carousels, Videos, FAQs */}
      {isFirst && (
        <>
          <OfficialComponentsSection />
          <RecipeCarousel
            eyebrow="Reader Favorites"
            heading="Most-Loved Toddle House® Omelets"
            intro="The highest-rated omelets our editors and readers keep coming back to."
            items={popularPicks}
            bg="bg-white"
          />
          <RecipeCarousel
            eyebrow="Lighter Choices"
            heading="Lower-Calorie Omelets"
            intro="The lightest ways to order a Toddle House® omelet — sorted from the lowest verified calorie counts."
            items={lighterPicks}
            bg="bg-[#F7F7F7]"
          />
          <VideosSection />
          <FaqSection />
        </>
      )}

      {/* ALL RECIPES GRID & PAGINATION (Rendered cleanly on Page 1 & Page 2) */}
      <section id="all-recipes" className="bg-white">
        <div className="container-editorial py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              All Recipes {totalPages > 1 ? `(Page ${currentPage} of ${totalPages})` : ""}
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {isFirst ? "Every Toddle House® Omelet on the Menu" : `Toddle House® Omelet Recipes — Page ${currentPage}`}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Every real Waffle House Toddle House® Omelet — with verified U.S. prices and calorie counts.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {currentItems.map((v) => (
              <OmeletCard key={v.slug} v={v} />
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
      <SubscriberSection bgImage={subscribeBgImg} idPrefix={`omelet-${currentPage}`} />

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
            5 Official Toddle House® Omelet Recipes
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Explore the 5 official Toddle House® Omelet recipes served across Waffle House locations — with exact prices, base & meal calorie counts, and preparation details.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {officialOmeletRecipes.map((item) => (
            <div
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all hover:border-primary hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-1 rounded-md bg-primary/15 px-2.5 py-1 text-xs font-bold text-foreground">
                  <Egg className="h-3.5 w-3.5" /> Recipe {item.id}
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
            Toddle House® Omelets FAQs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Answers to common questions about Waffle House omelet options, calories, sides, and customizations.
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

function OmeletCard({ v }: { v: OmeletItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-30px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_28px_50px_-28px_rgba(0,0,0,0.25)]">
      <Link
        to="/menu/$category"
        params={{ category: "omelets" }}
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
            params={{ category: "omelets" }}
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
          params={{ category: "omelets" }}
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
  items: OmeletItem[];
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
                <OmeletCard v={v} />
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
            Toddle House® Omelet Videos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Short editorial clips on how Waffle House folds fluffy two-egg omelets and builds every signature filling.
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
