import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Play,
  HelpCircle,
} from "lucide-react";

import data from "@/data/sides.json";

// Photography imports — 14 unique images, one per recipe card
import introImg from "@/assets/cat-sides.jpg";
import img1  from "@/assets/all-star-breakfast.jpg";
import img2  from "@/assets/breakfast-intro.jpg";
import img3  from "@/assets/nutrition-chef.jpg";
import img4  from "@/assets/tbone-steak.jpg";
import img5  from "@/assets/nutrition-lowcal-fruit.jpg";
import img6  from "@/assets/nutrition-overview.jpg";
import img7  from "@/assets/breakfast-table-cooking.jpg";
import img8  from "@/assets/menu-highlight-breakfast.jpg";
import img9  from "@/assets/breakfast-hero.jpg";
import img10 from "@/assets/article-budget-meals.jpg";
import img11 from "@/assets/cat-pies.jpg";
import img12 from "@/assets/waffles-gallery-1.jpg";
import img13 from "@/assets/contact-cat-dinner.jpg";
import img14 from "@/assets/menu-highlight-combo.jpg";
import subscribeBgImg from "@/assets/about-subscribe-bg.jpg";
import videoBg1 from "@/assets/all-star-breakfast.jpg";
import videoBg2 from "@/assets/cat-pies.jpg";
import videoBg3 from "@/assets/breakfast-table-cooking.jpg";
import videoBg4 from "@/assets/nutrition-overview.jpg";
import { SubscriberSection } from "@/components/SubscriberSection";

interface RawItem {
  slug: string;
  name: string;
  price: number;
  calories: number;
  rating: number;
  description: string;
}

export interface SideItem extends RawItem {
  image: string;
}

// 14 unique images — one per card (no duplicates)
const IMAGES = [
  img1, img2, img3, img4, img5, img6, img7,
  img8, img9, img10, img11, img12, img13, img14,
];

export const sideItems: SideItem[] = (data.items as RawItem[]).map((it, i) => ({
  ...it,
  image: IMAGES[i % IMAGES.length],
}));

export const featuredName = data.items[0]?.name ?? "Side Bacon";
export const categoryIntro = "Every Waffle House Side, Pie & Dessert — from crispy hickory-smoked bacon strips and creamy stone-ground grits to house-made Southern Pecan Pie and Triple Chocolate Pie.";

const popularPicks = [...sideItems].sort((a, b) => b.rating - a.rating).slice(0, 6);
const lighterPicks = [...sideItems].sort((a, b) => a.calories - b.calories).slice(0, 6);

// Exact YouTube links provided by the user
const videos = [
  { id: "1", title: "Waffle House Bacon & Sausage on the Flat-Top", duration: "3:45", youtubeId: "meUhK61ZFR4", image: videoBg1 },
  { id: "2", title: "Southern Pecan Pie & Triple Chocolate Pie at Waffle House", duration: "0:59", youtubeId: "2uyouhnGFtA", image: videoBg2 },
  { id: "3", title: "Stone-Ground Grits — How Waffle House Makes Them", duration: "4:10", youtubeId: "6KiZ_u_CkzU", image: videoBg3 },
  { id: "4", title: "Bert's Chili™ & Sides Behind the Counter", duration: "3:55", youtubeId: "ggbJr1EjCoI", image: videoBg4 },
];

const faqs = [
  {
    q: "What sides are available at Waffle House?",
    a: "Waffle House serves 10 classic sides: Side Bacon, Side Sausage, Side City Ham, Side Country Ham, Side Sliced Tomatoes, Side Grits Bowl, Side Cheese Grits, Side Toast, Side Biscuit, and Side Bert's Chili™.",
  },
  {
    q: "What desserts does Waffle House have?",
    a: "Waffle House offers two signature house-made pies: Southern Pecan Pie and Triple Chocolate Pie. Both are available in a regular slice ($4.50, ~490–510 kcal) or a smaller slice ($2.50, ~245–255 kcal).",
  },
  {
    q: "How many calories are in Waffle House grits?",
    a: "A Side Grits Bowl is 50–90 kcal with butter. Side Cheese Grits are approximately 140 kcal. Both are among the lowest-calorie hot sides on the menu.",
  },
  {
    q: "What is the lightest side at Waffle House?",
    a: "Side Sliced Tomatoes are the lightest at just 10 kcal. After that, Side City Ham (60–100 kcal) and Side Grits Bowl (50–90 kcal) are the next lightest options.",
  },
  {
    q: "Is Bert's Chili™ available all day at Waffle House?",
    a: "Yes! Bert's Chili™ is served 24/7 and is most popularly ordered as a hashbrown topping (Chili style). You can also order it as a side bowl for $3.75.",
  },
  {
    q: "How are Waffle House pies made?",
    a: "Waffle House pies are baked fresh daily. The Southern Pecan Pie features a caramel filling with whole toasted pecans in a flaky pastry crust. The Triple Chocolate Pie has three layers: dark, milk, and white chocolate filling in a chocolate cookie crust.",
  },
];

const PAGE_SIZE = 12;

export function SidesPageView({ initialPage = 1 }: { initialPage?: number }) {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.max(1, Math.ceil(sideItems.length / PAGE_SIZE));
  const currentItems = sideItems.slice(
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
                    alt="Waffle House Sides, Pies & Desserts — bacon strips, grits bowl, and pecan pie slice"
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
                  Sides, Pies &amp; Desserts
                </span>
              </nav>

              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                Sides, Pies &amp; Desserts Menu
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
            heading="Most-Loved Sides & Desserts"
            intro="The highest-rated sides, pies and desserts our editors and readers keep coming back to."
            items={popularPicks}
            bg="bg-white"
          />
          <RecipeCarousel
            eyebrow="Lighter Choices"
            heading="Lower-Calorie Side Options"
            intro="The lightest sides at Waffle House — real food, real flavour, under 200 calories."
            items={lighterPicks}
            bg="bg-[#F7F7F7]"
          />
          <VideosSection />
          <FaqSection />
        </>
      )}

      {/* ALL RECIPES GRID & PAGINATION */}
      <section id="all-recipes" className="bg-white">
        <div className="container-editorial py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              All Recipes {totalPages > 1 ? `(Page ${currentPage} of ${totalPages})` : ""}
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {isFirst
                ? "Every Side, Pie & Dessert on the Menu"
                : `Sides, Pies & Desserts — Page ${currentPage}`}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              All 14 official Waffle House Sides, Pies & Desserts — with verified U.S. prices and calorie counts (12 items per page).
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentItems.map((v) => (
              <SideCard key={v.slug} v={v} />
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
      <SubscriberSection bgImage={subscribeBgImg} idPrefix={`sides-${currentPage}`} />
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
            Sides, Pies &amp; Desserts FAQs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Common questions about Waffle House sides, desserts, calorie counts, and what makes the pies special.
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
function SideCard({ v }: { v: SideItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-30px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_28px_50px_-28px_rgba(0,0,0,0.25)]">
      <Link
        to="/menu/$category"
        params={{ category: "sides" }}
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
            params={{ category: "sides" }}
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
          params={{ category: "sides" }}
          className="btn-primary mt-5 h-10 w-full justify-center text-sm"
        >
          View Recipe <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

/* ─── CAROUSEL ─────────────────────────────────────────────────── */
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
  items: SideItem[];
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
                <SideCard v={v} />
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

/* ─── VIDEOS SECTION ───────────────────────────────────────────── */
function VideosSection() {
  return (
    <section className="bg-white border-t border-black/5">
      <div className="container-editorial py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Watch &amp; Learn
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Sides, Pies &amp; Desserts Videos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Short clips on how Waffle House grills bacon, makes stone-ground grits, bakes pecan pie, and serves Bert's Chili™ fresh.
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
