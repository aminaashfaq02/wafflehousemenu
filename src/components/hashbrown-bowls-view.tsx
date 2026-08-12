import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, ChevronLeft, Play } from "lucide-react";

import data from "@/data/hashbrown-bowls.json";

// Unique authentic photography — one per recipe card, plus supporting imagery.
import introImg from "@/assets/cat-breakfast-bowl.jpg";
import img1 from "@/assets/article-hashbrowns.jpg";
import img2 from "@/assets/hashbrowns.jpg";
import img3 from "@/assets/hero-3-hashbrowns.jpg";
import img4 from "@/assets/cat-hashbrowns.jpg";
import img5 from "@/assets/cat-lunch-bowl.jpg";
import img6 from "@/assets/cat-all-star.jpg";
import img7 from "@/assets/cat-texas-melt.jpg";
import img8 from "@/assets/cat-classic-dinners.jpg";
import img9 from "@/assets/cat-angus-burger.jpg";
import img10 from "@/assets/cat-sandwiches.jpg";
import subscribeBgImg from "@/assets/about-subscribe-bg.jpg";
import videoBg1 from "@/assets/menu-highlight-combo.jpg";
import videoBg2 from "@/assets/breakfast-table-cooking.jpg";
import videoBg3 from "@/assets/hero-6-kitchen.jpg";
import videoBg4 from "@/assets/nutrition-chef.jpg";

interface RawItem {
  slug: string;
  name: string;
  price: number;
  calories: number;
  rating: number;
  meal?: "breakfast" | "lunch-dinner";
  description: string;
}

export interface BowlItem extends RawItem {
  image: string;
}

const IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

export const bowlItems: BowlItem[] = (data.items as unknown as RawItem[]).map((it, i) => ({
  ...it,
  image: IMAGES[i % IMAGES.length],
}));

export const featuredName = data.items[0]?.name ?? "Sausage Egg & Cheese Hashbrown Bowl";
export const categoryIntro = "Waffle House Hashbrown Bowls stack flat-top-crisped shredded potatoes with eggs, cheese and choice of meat.";

const breakfastBowls = bowlItems.filter((v) => v.meal === "breakfast");
const lunchDinnerBowls = bowlItems.filter((v) => v.meal === "lunch-dinner");
const popularPicks = [...bowlItems].sort((a, b) => b.rating - a.rating).slice(0, 6);
const lighterPicks = [...bowlItems].sort((a, b) => a.calories - b.calories).slice(0, 6);

const videos = [
  { id: "1", title: "How Waffle House Crisps Hashbrowns on the Flat-Top", duration: "3:24", youtubeId: "iu-LBY6h6bU", image: videoBg1 },
  { id: "2", title: "Building the Bacon, Egg & Cheese Hashbrown Bowl", duration: "4:12", youtubeId: "K4TOrB7at0Y", image: videoBg2 },
  { id: "3", title: "Cheesesteak Melt Bowl — Line Cook Notes", duration: "4:55", youtubeId: "9v3zqRq8_2E", image: videoBg3 },
  { id: "4", title: "Texas Melt Bowls Explained", duration: "5:08", youtubeId: "7d16CpWp-ok", image: videoBg4 },
];

export function HashbrownBowlsPageView() {
  return (
    <div>
      {/* SECTION 1 — PAGE INTRODUCTION */}
      <section className="bg-[#F3F3F1]">
        <div className="container-editorial grid items-center gap-10 py-14 md:grid-cols-12 md:gap-12 md:py-20">
          <div className="order-1 md:col-span-4">
            <div className="mx-auto max-w-[260px] text-center">
              <div className="mx-auto aspect-square w-full overflow-hidden rounded-2xl bg-muted shadow-[0_18px_40px_-24px_rgba(0,0,0,0.28)] ring-1 ring-black/5">
                <img
                  src={introImg}
                  alt="Waffle House Bacon, Egg & Cheese Hashbrown Bowl — crispy hashbrowns loaded with eggs, bacon and melted cheese"
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
                Hashbrown Bowls
              </span>
            </nav>

            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Waffle House Hashbrown Bowls Menu
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              {categoryIntro}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — POPULAR */}
      <RecipeCarousel
        eyebrow="Reader Favorites"
        heading="Most-Loved Hashbrown Bowls"
        intro="The highest-rated Hashbrown Bowls our editors and readers keep coming back to."
        items={popularPicks}
        bg="bg-white"
      />

      {/* SECTION 3 — LIGHTER */}
      <RecipeCarousel
        eyebrow="Lighter Choices"
        heading="Lower-Calorie Hashbrown Bowls"
        intro="The lightest ways to order — sorted from the lowest verified calorie counts."
        items={lighterPicks}
        bg="bg-[#F7F7F7]"
      />

      {/* SECTION 4 — VIDEOS */}
      <VideosSection />

      {/* SECTION 5 — RECIPE GRID */}
      <section id="all-recipes" className="bg-white">
        <div className="container-editorial py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              Breakfast Hashbrown Bowls
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Every Breakfast Hashbrown Bowl
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Golden hashbrowns layered with scrambled eggs, cheese and your
              choice of meat — served all day with verified July 2026 prices.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {breakfastBowls.map((v) => (
              <BowlCard key={v.slug} v={v} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — LUNCH & DINNER */}
      <section className="bg-[#F7F7F7]">
        <div className="container-editorial py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              Lunch &amp; Dinner Hashbrown Bowls
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Melt-Style Hashbrown Bowls
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Cheesesteak, Texas Melt and Chicken Melt bowls — every real
              lunch and dinner Hashbrown Bowl on the menu.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {lunchDinnerBowls.map((v) => (
              <BowlCard key={v.slug} v={v} />
            ))}
          </div>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section className="relative w-full overflow-hidden">
        <img
          src={subscribeBgImg}
          alt="Waffle House diner interior at night"
          width={1920}
          height={600}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative flex min-h-[200px] items-center justify-center px-4 py-10 sm:min-h-[220px]">
          <div className="w-full max-w-xl rounded-2xl border border-white/25 bg-white/10 p-6 text-center shadow-2xl backdrop-blur-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              Newsletter
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold text-white sm:text-2xl">
              Stay Updated with the Latest Waffle House Menu Changes
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              Subscribe for updates on menu changes, breakfast guides, new
              articles and nutrition information.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mx-auto mt-4 flex max-w-md flex-col gap-2 sm:flex-row"
            >
              <label htmlFor="bowl-email" className="sr-only">Email address</label>
              <input
                id="bowl-email"
                type="email"
                required
                placeholder="your@email.com"
                className="h-11 flex-1 rounded-full border border-white/30 bg-white/95 px-4 text-sm text-foreground placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button type="submit" className="btn-primary h-11 px-6 text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="h-14 bg-white md:h-16" aria-hidden />
    </div>
  );
}

function BowlCard({ v }: { v: BowlItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-30px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_28px_50px_-28px_rgba(0,0,0,0.25)]">
      <Link
        to="/menu/$category"
        params={{ category: "hashbrown-bowls" }}
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
            params={{ category: "hashbrown-bowls" }}
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
              {v.calories.toLocaleString()}
            </dd>
          </div>
        </dl>
        <Link
          to="/menu/$category"
          params={{ category: "hashbrown-bowls" }}
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
  items: BowlItem[];
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
                <BowlCard v={v} />
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
    <section className="bg-white">
      <div className="container-editorial py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Watch &amp; Learn
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Hashbrown Bowl Videos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Short editorial clips on how Waffle House crisps hashbrowns and
            builds every signature bowl.
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
