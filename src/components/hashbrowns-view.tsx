import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AuthorBio } from "@/components/author-bio";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Play,
  HelpCircle,
} from "lucide-react";

import data from "@/data/hashbrowns.json";

// Photography imports
import introImg from "@/assets/cat-hashbrowns.jpg";
import img1 from "@/assets/hashbrowns.jpg";
import img2 from "@/assets/article-hashbrowns.jpg";
import img3 from "@/assets/hero-3-hashbrowns.jpg";
import img4 from "@/assets/nutrition-lowcal-fruit.jpg";
import img5 from "@/assets/popular-healthy.jpg";
import img6 from "@/assets/menu-highlight-combo.jpg";
import img7 from "@/assets/menu-highlight-breakfast.jpg";
import img8 from "@/assets/all-star-breakfast.jpg";
import img9 from "@/assets/hero-2-breakfast.jpg";
import img10 from "@/assets/breakfast-hero.jpg";
import img11 from "@/assets/article-breakfast-plates.jpg";
import img12 from "@/assets/breakfast-nutrition-prep.jpg";
import subscribeBgImg from "@/assets/about-subscribe-bg.jpg";
import videoBg1 from "@/assets/article-hashbrowns.jpg";
import videoBg2 from "@/assets/hashbrowns.jpg";
import videoBg3 from "@/assets/hero-3-hashbrowns.jpg";
import videoBg4 from "@/assets/cat-hashbrowns.jpg";
import { SubscriberSection } from "@/components/SubscriberSection";

interface RawItem {
  slug: string;
  name: string;
  price: number;
  calories: number;
  rating: number;
  description: string;
}

export interface HashbrownItem extends RawItem {
  image: string;
}

const IMAGES = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12
];

export const hashbrownItems: HashbrownItem[] = (data.items as RawItem[]).map((it, i) => ({
  ...it,
  image: IMAGES[i % IMAGES.length],
}));

export const featuredName = data.items[0]?.name ?? "Regular Hashbrowns (Plain)";
export const categoryIntro = "Shredded real potatoes scattered on a flat-top grill and seared until golden crisp.";

const popularPicks = [...hashbrownItems].sort((a, b) => b.rating - a.rating).slice(0, 6);
const lighterPicks = [...hashbrownItems].sort((a, b) => a.calories - b.calories).slice(0, 6);

// Exact YouTube videos provided by the user
const videos = [
  { id: "1", title: "Hashbrowns All-The-Way — The Full Build", duration: "4:30", youtubeId: "oI6JqXpRM3I", image: videoBg1 },
  { id: "2", title: "Smothered & Covered: What's the Difference?", duration: "3:12", youtubeId: "hWUTc9XvsaE", image: videoBg2 },
  { id: "3", title: "Decoding Every Waffle House Hashbrown Topping", duration: "5:15", youtubeId: "G_nKQj4sZUg", image: videoBg3 },
  { id: "4", title: "Diner Secrets: Crispy Shredded Hashbrowns", duration: "4:05", youtubeId: "hWUTc9XvsaE", image: videoBg4 },
];

const faqs = [
  {
    q: "What does 'Smothered & Covered' mean at Waffle House?",
    a: "'Smothered' means topped with sweet sautéed onions cooked on the flat-top. 'Covered' means covered under melted slices of yellow American cheese.",
  },
  {
    q: "What does 'All The Way' mean on Waffle House hashbrowns?",
    a: "'All The Way' includes every available menu topping: sautéed onions (Smothered), melted American cheese (Covered), hickory ham (Chunked), tomatoes (Diced), jalapeños (Peppered), mushrooms (Capped), Bert's Chili™ (Topped), and sausage gravy (Country).",
  },
  {
    q: "What portion sizes are available for Waffle House hashbrowns?",
    a: "You can order Regular (single portion), Large (double portion), or Triple (triple portion) hashbrowns as a base before adding custom toppings.",
  },
  {
    q: "How many calories are in Waffle House Hashbrowns?",
    a: "Plain Regular Hashbrowns are 190 kcal. Adding onions & cheese brings it to ~285 kcal. Large plain is 380 kcal, and fully loaded All-The-Way starts around 300 to 780 kcal depending on portion size.",
  },
  {
    q: "Are Hashbrowns & Toppings served 24/7?",
    a: "Yes! Shredded potatoes are seared fresh to order 24 hours a day, 7 days a week at all Waffle House locations.",
  },
];

export function HashbrownsPageView({ page = 1 }: { page?: number }) {
  const currentPage = page;
  const PAGE_SIZE = 12; // 12 items per page as explicitly requested!
  const totalPages = Math.max(1, Math.ceil(hashbrownItems.length / PAGE_SIZE));
  const currentItems = hashbrownItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const isFirst = currentPage === 1;

  const getPageUrl = (n: number) => {
    if (n === 1) return "/menu/hashbrowns";
    return `/menu/hashbrowns/page/${n}`;
  };

  return (
    <div>
      {/* PAGE 1 ONLY: HERO SECTION */}
      {isFirst ? (
        <section className="bg-[#F3F3F1]">
          <div className="container-editorial grid items-center gap-10 py-14 md:grid-cols-12 md:gap-12 md:py-20">
            <div className="order-1 md:col-span-4">
              <div className="mx-auto max-w-[260px] text-center">
                <div className="mx-auto aspect-square w-full overflow-hidden rounded-2xl bg-muted shadow-[0_18px_40px_-24px_rgba(0,0,0,0.28)] ring-1 ring-black/5">
                  <img
                    src={introImg}
                    alt="Waffle House Hashbrowns Smothered & Covered — crispy shredded potatoes with onions and melted cheese"
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
                  Hashbrowns &amp; All Toppings
                </span>
              </nav>

              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Hashbrowns &amp; All Toppings Menu
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
                {categoryIntro}
              </p>
            </div>
          </div>
        </section>
      ) : (
        /* PAGE 2+ DEDICATED CLEAN HEADER (NO EXTRA TEXT) */
        <section className="bg-[#F3F3F1] py-10 md:py-12 border-b border-border/60">
          <div className="container-editorial">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em]"
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
              <span className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-foreground">
                Hashbrowns &amp; Toppings — Page {currentPage} of {totalPages}
              </span>
            </nav>

            <h1 className="mt-5 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
              Hashbrowns &amp; Toppings — Page {currentPage} of {totalPages}
            </h1>
          </div>
        </section>
      )}

      {/* PAGE 1 ONLY: Carousels, Videos, FAQs */}
      {isFirst && (
        <>
          <RecipeCarousel
            eyebrow="Reader Favorites"
            heading="Most-Loved Hashbrown Orders"
            intro="The highest-rated hashbrown configurations our editors and readers keep coming back to."
            items={popularPicks}
            bg="bg-white"
          />
          <RecipeCarousel
            eyebrow="Lighter Choices"
            heading="Lower-Calorie Hashbrown Options"
            intro="The lightest hashbrown orders — sorted from lowest verified calorie counts."
            items={lighterPicks}
            bg="bg-[#F7F7F7]"
          />
          <VideosSection />
          <FaqSection />
        </>
      )}

      {/* ALL RECIPES GRID & PAGINATION */}
      <section id="all-recipes" className="bg-white">
        <div className="container-editorial py-12 md:py-16">
          {isFirst && (
            <div className="mx-auto max-w-2xl text-center mb-12">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                All Recipes
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Every Hashbrown &amp; Topping on the Menu
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                Every real Waffle House Hashbrown configuration &amp; custom topping — with verified U.S. prices and calorie counts (12 per page).
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {currentItems.map((v) => (
              <HashbrownCard key={v.slug} v={v} />
            ))}
          </div>

          {/* PAGINATION CONTROLS (SEPARATE PAGE ROUTE URLS) */}
          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-12 flex flex-wrap items-center justify-center gap-2"
            >
              {currentPage > 1 ? (
                <Link
                  to={getPageUrl(currentPage - 1)}
                  className="inline-flex h-10 items-center gap-1 rounded-lg border border-border bg-white px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden /> Previous
                </Link>
              ) : (
                <span className="inline-flex h-10 items-center gap-1 rounded-lg border border-border bg-white px-4 text-sm font-semibold text-foreground opacity-40">
                  <ChevronLeft className="h-4 w-4" aria-hidden /> Previous
                </span>
              )}

              {Array.from({ length: totalPages }).map((_, i) => {
                const n = i + 1;
                const active = n === currentPage;
                return (
                  <Link
                    key={n}
                    to={getPageUrl(n)}
                    className={`inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-4 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-primary text-black"
                        : "bg-white text-foreground border border-border hover:bg-primary/10"
                    }`}
                  >
                    {n}
                  </Link>
                );
              })}

              {currentPage < totalPages ? (
                <Link
                  to={getPageUrl(currentPage + 1)}
                  className="inline-flex h-10 items-center gap-1 rounded-lg border border-border bg-white px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  Next <ChevronRight className="h-4 w-4" aria-hidden />
                </Link>
              ) : (
                <span className="inline-flex h-10 items-center gap-1 rounded-lg border border-border bg-white px-4 text-sm font-semibold text-foreground opacity-40">
                  Next <ChevronRight className="h-4 w-4" aria-hidden />
                </span>
              )}
            </nav>
          )}
        </div>
      </section>

      {/* FOOTER & SUBSCRIBER SECTION */}
      {isFirst && (
        <SubscriberSection bgImage={subscribeBgImg} idPrefix={`hashbrowns-${currentPage}`} />
      )}

      {/* AUTHOR BIO */}
      {isFirst && <AuthorBio />}

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
            Hashbrowns &amp; Toppings FAQs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Answers to common questions about Waffle House hashbrown modifiers, portions, calories, and ordering jargon.
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

function HashbrownCard({ v }: { v: HashbrownItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md">
      <Link
        to="/menu/$category/$slug"
        params={{ category: "hashbrowns", slug: v.slug }}
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
            to="/menu/$category/$slug"
            params={{ category: "hashbrowns", slug: v.slug }}
            className="hover:text-primary transition-colors"
          >
            {v.name}
          </Link>
        </h3>
        <dl className="mt-3 space-y-1 text-sm text-ink-soft">
          <div>
            <dt className="inline">Price: </dt>
            <dd className="inline font-semibold text-foreground">
              {typeof v.price === "number" ? `$${v.price.toFixed(2)}` : v.price}
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
          to="/menu/$category/$slug"
          params={{ category: "hashbrowns", slug: v.slug }}
          className="btn-primary mt-auto flex h-10 w-full items-center justify-center text-sm font-semibold"
        >
          View Recipe <ArrowRight className="h-4 w-4 ml-1" aria-hidden />
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
  items: HashbrownItem[];
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
                <HashbrownCard v={v} />
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
            Hashbrowns &amp; All Toppings Videos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Short editorial clips decoding the Waffle House hashbrown modifier system — what Smothered, Covered and All-The-Way actually mean on the plate.
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
