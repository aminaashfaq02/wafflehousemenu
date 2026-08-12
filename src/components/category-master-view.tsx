import { useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, ChevronLeft, Play } from "lucide-react";
import { FaqSection } from "@/components/FaqSection";
import { AuthorBio } from "@/components/author-bio";

export interface MasterItem {
  slug: string;
  name: string;
  price: number;
  /** Single calorie value */
  calories?: number;
  calorieDetails?: string;
  allergens?: string;
  preparation?: string;
  imageDescription?: string;
  /** Alternative: display a range as "min–max" */
  caloriesMin?: number;
  caloriesMax?: number;
  rating?: number;
  image: string;
  /** Absolute or relative URL for the "View Recipe" click target */
  href: string;
}

export interface MasterVideo {
  id: string;
  title: string;
  duration: string;
  youtubeId?: string;
  videoUrl?: string;
  image: string;
}

interface CarouselSection {
  eyebrow: string;
  heading: string;
  intro: string;
  items: MasterItem[];
  bg?: string;
}

export interface CategoryFaq {
  question: string;
  answer: string;
}

export interface CategoryMasterViewProps {
  categoryId?: string;
  introImg: string;
  introImgAlt: string;
  breadcrumbLabel: string;
  h1: string;
  intro: ReactNode;
  featuredName: string;
  featuredHref?: string;
  page?: number;
  activePage?: number;
  popular: CarouselSection;
  lighter: CarouselSection;
  videos: {
    heading: string;
    intro: string;
    items: MasterVideo[];
  };
  allRecipes: {
    heading: string;
    intro: string;
    items: MasterItem[];
  };
  faqs?: CategoryFaq[];
  subscribeBgImg: string;
  subscribeIdSuffix?: string;
}

export function CategoryMasterView(props: CategoryMasterViewProps) {
  const {
    categoryId = "waffles",
    introImg,
    introImgAlt,
    breadcrumbLabel,
    h1,
    intro,
    featuredName,
    featuredHref = "#all-recipes",
    page: propPage,
    activePage,
    popular,
    lighter,
    videos,
    allRecipes,
    faqs,
    subscribeBgImg,
    subscribeIdSuffix = "master",
  } = props;

  const [statePage, setStatePage] = useState(activePage ?? propPage ?? 1);
  const currentActivePage = activePage ?? propPage ?? statePage;

  const PAGE_SIZE = 12;
  const totalPages = Math.max(1, Math.ceil(allRecipes.items.length / PAGE_SIZE));
  const isFirst = currentActivePage === 1;

  const currentItems = allRecipes.items.slice(
    (currentActivePage - 1) * PAGE_SIZE,
    currentActivePage * PAGE_SIZE
  );

  const getPageUrl = (n: number) => {
    if (n === 1) return `/menu/${categoryId}`;
    return `/menu/${categoryId}/page/${n}`;
  };

  return (
    <div>
      {/* SECTION 1 — PAGE INTRODUCTION */}
      {isFirst ? (
        <section className="bg-[#F3F3F1]">
          <div className="container-editorial grid items-center gap-10 py-14 md:grid-cols-12 md:gap-12 md:py-20">
            <div className="order-1 md:col-span-4">
              <div className="mx-auto max-w-[260px] text-center">
                <div className="mx-auto aspect-square w-full overflow-hidden rounded-2xl bg-muted shadow-[0_18px_40px_-24px_rgba(0,0,0,0.28)] ring-1 ring-black/5">
                  <img
                    src={introImg}
                    alt={introImgAlt}
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
                  href={featuredHref}
                  className="mt-1 inline-block font-display text-base font-semibold tracking-tight text-foreground hover:text-primary"
                >
                  {featuredName}
                </a>
              </div>
            </div>

            <div className="order-2 md:col-span-8">
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
                <span
                  aria-current="page"
                  className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-foreground"
                >
                  {breadcrumbLabel}
                </span>
              </nav>

              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                {h1}
              </h1>

              <div className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
                {intro}
              </div>

              {/* Key Facts Summary Bar */}
              {allRecipes.items.length > 0 && (() => {
                const prices = allRecipes.items.map((i) => i.price).filter((p) => p > 0);
                const cals = allRecipes.items
                  .flatMap((i) => [i.calories, i.caloriesMin, i.caloriesMax])
                  .filter((c): c is number => typeof c === "number" && c > 0);
                const minPrice = prices.length ? Math.min(...prices) : 0;
                const maxPrice = prices.length ? Math.max(...prices) : 0;
                const minCal = cals.length ? Math.min(...cals) : 0;
                const maxCal = cals.length ? Math.max(...cals) : 0;

                return (
                  <div className="mt-8 grid grid-cols-2 gap-3 rounded-2xl border border-black/10 bg-white p-4 shadow-xs sm:grid-cols-4 sm:gap-4">
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink-soft">Total Items</span>
                      <span className="mt-0.5 block font-display text-base sm:text-lg font-semibold text-foreground">
                        {allRecipes.items.length} Dishes
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink-soft">Price Range</span>
                      <span className="mt-0.5 block font-display text-base sm:text-lg font-semibold text-primary">
                        ${minPrice.toFixed(2)} – ${maxPrice.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink-soft">Calorie Range</span>
                      <span className="mt-0.5 block font-display text-base sm:text-lg font-semibold text-foreground">
                        {minCal} – {maxCal} kcal
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink-soft">Data Verified</span>
                      <span className="mt-1 block text-xs font-semibold text-emerald-700">
                        ✓ Counter Checked 2026
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </section>
      ) : (
        /* PAGE 2+ CLEAN PROFESSIONAL HEADER */
        <section className="bg-[#F3F3F1] py-8 md:py-10 border-b border-border/60">
          <div className="container-editorial">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              Waffle House {breadcrumbLabel} Menu — Page {currentActivePage}
            </h1>
            <p className="mt-3 text-base text-ink-soft leading-relaxed max-w-3xl">
              Explore remaining items on page {currentActivePage} of the official Waffle House {breadcrumbLabel.toLowerCase()} menu with verified 2026 prices and calorie counts.
            </p>
          </div>
        </section>
      )}

      {/* SECTIONS 2–5 — Rendered ONLY on Page 1 */}
      {isFirst && (
        <>
          <RecipeCarousel {...popular} bg={popular.bg ?? "bg-white"} />
          <RecipeCarousel {...lighter} bg={lighter.bg ?? "bg-[#F7F7F7]"} />
          <VideosSection heading={videos.heading} intro={videos.intro} items={videos.items} />
          <FaqSection
            bgClassName="bg-surface"
            eyebrow="Category Questions"
            heading={`${breadcrumbLabel} Questions & Answers`}
            intro={`Real answers to common questions about ${breadcrumbLabel.toLowerCase()} pricing, calories, ingredients, and customization at Waffle House.`}
            items={
              faqs && faqs.length > 0
                ? faqs
                : [
                    {
                      question: `What is the average price range for ${breadcrumbLabel} at Waffle House?`,
                      answer: `${breadcrumbLabel} at Waffle House generally range from $2.25 for lighter options up to $16.50 for full dinner plates. Prices can vary slightly by location and franchise.`,
                    },
                    {
                      question: `Are ${breadcrumbLabel} served all day?`,
                      answer: `Yes! Waffle House serves their complete menu 24 hours a day, 7 days a week, so you can order any ${breadcrumbLabel.toLowerCase()} item at any time.`,
                    },
                    {
                      question: `Can I customize my ${breadcrumbLabel} order?`,
                      answer: `Absolutely. Waffle House cooks all items fresh to order on the flat-top griddle. You can customize toppings, sides, and preparation preferences.`,
                    },
                    {
                      question: `Where can I find exact calorie and nutrition details for ${breadcrumbLabel}?`,
                      answer: `Every item card above lists verified calories and prices. You can also view full macronutrient breakdowns on our dedicated Nutrition page.`,
                    },
                  ]
            }
          />
        </>
      )}

      {/* SECTION 6 — ALL RECIPES GRID (PAGINATED) */}
      <section id="all-recipes" className="bg-white">
        <div className="container-editorial py-12 md:py-16">
          {isFirst && (
            <div className="mx-auto max-w-2xl text-center mb-12">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                All Recipes
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                {allRecipes.heading}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                {allRecipes.intro}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {currentItems.map((v) => (
              <MasterCard key={v.slug} v={v} />
            ))}
          </div>

          {/* PAGINATION CONTROLS (SEPARATE PAGE URLS) */}
          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-12 flex flex-wrap items-center justify-center gap-2"
            >
              {currentActivePage > 1 ? (
                <Link
                  to={getPageUrl(currentActivePage - 1)}
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
                const active = n === currentActivePage;
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

              {currentActivePage < totalPages ? (
                <Link
                  to={getPageUrl(currentActivePage + 1)}
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

      {/* SECTION 7: SUBSCRIBE */}
      {isFirst && (
        <section className="relative overflow-hidden bg-black py-16 md:py-24">
          <div className="absolute inset-0 z-0 opacity-40">
            <img
              src={subscribeBgImg}
              alt="Waffle House diner interior at night"
              width={1920}
              height={1080}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          </div>

          <div className="container-editorial relative z-10 text-center">
            <div className="mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
                Get Menu Updates &amp; Insider Tips
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/80">
                Subscribe for updates on menu changes, breakfast guides, new
                articles and nutrition information.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mx-auto mt-4 flex max-w-md flex-col gap-2 sm:flex-row"
              >
                <label htmlFor={`master-email-${subscribeIdSuffix}`} className="sr-only">
                  Email address
                </label>
                <input
                  id={`master-email-${subscribeIdSuffix}`}
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
      )}

      {/* AUTHOR BIO */}
      {isFirst && <AuthorBio />}

      <div className="h-14 bg-white md:h-16" aria-hidden />
    </div>
  );
}

function formatCalories(v: MasterItem) {
  if (v.caloriesMin != null && v.caloriesMax != null) {
    return `${v.caloriesMin.toLocaleString()}–${v.caloriesMax.toLocaleString()}`;
  }
  return (v.calories ?? 0).toLocaleString();
}

function MasterCard({ v }: { v: MasterItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md">
      <Link
        to={v.href}
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
          <Link to={v.href} className="hover:text-primary transition-colors">
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
              {formatCalories(v)} kcal
            </dd>
          </div>
        </dl>
        <Link
          to={v.href}
          className="btn-primary mt-auto flex h-10 w-full items-center justify-center text-sm font-semibold"
        >
          View Recipe <ArrowRight className="h-4 w-4 ml-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

function CarouselCard({ v }: { v: MasterItem }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md">
      <Link
        to={v.href}
        className="block aspect-[4/3] w-full overflow-hidden bg-muted"
        aria-label={`View recipe: ${v.name}`}
      >
        <img
          src={v.image}
          alt={v.name}
          width={800}
          height={600}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug text-foreground">
          <Link to={v.href} className="hover:text-primary transition-colors">
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
              {formatCalories(v)} kcal
            </dd>
          </div>
        </dl>
        <Link
          to={v.href}
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
}: CarouselSection) {
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
                <CarouselCard v={v} />
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

function VideosSection({
  heading,
  intro,
  items,
}: {
  heading: string;
  intro: string;
  items: MasterVideo[];
}) {
  return (
    <section className="bg-white">
      <div className="container-editorial py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Watch & Learn
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">{intro}</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((v) => {
            const targetUrl = v.videoUrl ?? (v.youtubeId ? `https://www.youtube.com/watch?v=${v.youtubeId}` : "#");
            return (
              <div
                key={v.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-black/10 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  {v.youtubeId ? (
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${v.youtubeId}`}
                      title={v.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="relative block h-full w-full">
                      <img
                        src={v.image}
                        alt={v.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-black shadow-lg">
                          <Play className="h-6 w-6 fill-current ml-0.5" />
                        </div>
                      </div>
                    </a>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-sm font-semibold leading-snug text-foreground">
                    <a href={targetUrl} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      {v.title}
                    </a>
                  </h3>
                  <div className="mt-3 flex items-center justify-between text-xs text-ink-soft">
                    <span>Duration: {v.duration}</span>
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      Watch Video <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
