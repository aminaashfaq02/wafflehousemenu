import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  HeartHandshake,
  Leaf,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tag,
  UtensilsCrossed,
  MapPin,
  TrendingUp,
  Building2,
  Flame,
} from "lucide-react";
import aboutHero from "@/assets/about-hero-griddle.jpg";
import storyImg from "@/assets/about-story-diner.jpg";
import missionImg from "@/assets/nutrition-chef.jpg";
import subscribeBg from "@/assets/about-subscribe-bg.jpg";
import { SubscriberSection } from "@/components/SubscriberSection";
import featMenuImg from "@/assets/article-breakfast-plates.jpg";
import featPricesImg from "@/assets/article-budget-meals.jpg";
import featNutritionImg from "@/assets/contact-chef.jpg";
import featArticlesImg from "@/assets/article-waffle-guide.jpg";
import { categories, menu } from "@/data/menu";
import { articles } from "@/data/articles";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Waffle House Menu — Prices, Nutrition & Guides" },
      {
        name: "description",
        content:
          "Waffle House Menu is an independent U.S. blog helping visitors explore menu items, prices, nutrition information and helpful guides — clearly and confidently.",
      },
      { property: "og:title", content: "About — Waffle House Menu" },
      {
        property: "og:description",
        content:
          "An independent U.S. blog covering the Waffle House menu: items, prices, nutrition and guides.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const features = [
  {
    title: "Latest Menu",
    desc: "Browse every current item across breakfast, waffles, burgers, sandwiches, hashbrowns and drinks.",
    image: featMenuImg,
    icon: UtensilsCrossed,
  },
  {
    title: "Updated Prices",
    desc: "Verified U.S. average prices, reviewed every month so you always know what to expect.",
    image: featPricesImg,
    icon: Tag,
  },
  {
    title: "Nutrition Information",
    desc: "Calories, macros, sodium and allergens — plainly listed on every menu item page.",
    image: featNutritionImg,
    icon: Leaf,
  },
  {
    title: "Helpful Articles",
    desc: "Ordering tips, best-of lists and simple guides written like a food magazine.",
    image: featArticlesImg,
    icon: BookOpen,
  },
];

const timeline = [
  {
    year: "1955",
    title: "The very first location",
    desc: "The original Waffle House opens in Avondale Estates, Georgia — founded by Joe Rogers Sr. and Tom Forkner.",
    icon: MapPin,
  },
  {
    year: "1960s–1980s",
    title: "Southeastern expansion",
    desc: "The concept spreads steadily across the southeastern United States, one small-town diner at a time.",
    icon: TrendingUp,
  },
  {
    year: "1990s–2000s",
    title: "Continued growth",
    desc: "Hundreds of new restaurants open, and 24/7 breakfast service becomes an American road-trip staple.",
    icon: Building2,
  },
  {
    year: "Today",
    title: "An American icon",
    desc: "Thousands of locations across multiple U.S. states — instantly recognizable for waffles, hashbrowns and endless coffee.",
    icon: Flame,
  },
];

const trust = [
  { title: "Regular Content Updates", desc: "Menu, prices and articles are refreshed on a set schedule.", icon: Sparkles },
  { title: "Organized Menu Information", desc: "Categories, items and facts are structured for quick answers.", icon: ShieldCheck },
  { title: "Mobile-Friendly Experience", desc: "Every page is fast and readable on any device.", icon: Smartphone },
  { title: "Helpful Guides", desc: "Plain-English writing with no jargon or filler.", icon: BookOpen },
];

function AboutPage() {
  const latestArticles = [...articles]
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
    .slice(0, 4);

  const menuTable = categories.map((c) => {
    const menuCount = menu.filter((m) => m.category === c.id).length;
    const recipeCount = articles.filter(
      (a) => a.tag.toLowerCase() === c.name.toLowerCase(),
    ).length;
    return {
      name: c.name,
      menuCount,
      recipeCount: recipeCount || Math.max(1, Math.round(menuCount / 2)),
    };
  });

  return (
    <div className="bg-background">
      {/* 1 — HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={aboutHero}
          alt="Fresh golden waffles cooking on a hot waffle iron in an American diner kitchen"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70" aria-hidden />
        <div className="container-editorial relative py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
              About Us
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl">
              Helping You Explore the Waffle House Menu with Confidence
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              Waffle House Menu is an independent U.S. blog. We help visitors discover
              menu items, prices, nutrition information and honest guides — carefully
              researched and easy to trust.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/menu" className="btn-primary">
                Explore Menu <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/menu"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Latest Articles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2 — STORY */}
      <section className="container-editorial py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="chip">Our Story</span>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl md:text-[2.75rem]">
              The Story Behind Waffle House
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-soft md:text-lg">
              <p>
                The very first Waffle House opened in <strong className="text-foreground">1955</strong> in
                Avondale Estates, Georgia, founded by <strong className="text-foreground">Joe Rogers Sr.</strong>{" "}
                and <strong className="text-foreground">Tom Forkner</strong>. Their goal was simple: pair
                fast, made-to-order breakfast with the warm feeling of a neighborhood diner
                where anyone could sit down at any hour.
              </p>
              <p>
                Over the decades, Waffle House became famous for breakfast served all day —
                buttery waffles pressed to order, hashbrowns "scattered, smothered and
                covered," hickory-smoked bacon, T-bone steaks, patty melts, and bottomless
                coffee that never seems to stop pouring.
              </p>
              <p>
                From that first Georgia diner, the chain grew into{" "}
                <strong className="text-foreground">thousands of restaurants across multiple U.S. states</strong>,
                becoming a fixture of American road trips, late-night highways and small-town
                main streets.
              </p>
              <p className="text-sm italic text-ink-soft">
                Waffle House Menu is an independent informational guide. We are not affiliated
                with Waffle House, Inc.
              </p>
            </div>
          </div>
          <div className="relative order-first md:order-last">
            <div className="overflow-hidden rounded-3xl border border-border shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
              <img
                src={storyImg}
                alt="Interior of a classic American diner with checkerboard floor and chrome stools"
                width={1600}
                height={1200}
                loading="lazy"
                className="h-full w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3 — TIMELINE */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-editorial">
          <div className="mx-auto max-w-2xl text-center">
            <span className="chip">Timeline</span>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl md:text-[2.75rem]">
              Waffle House Through the Years
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              A brief look at how one Georgia diner became a piece of American food culture.
            </p>
          </div>

          <div className="relative mt-14">
            <div
              className="pointer-events-none absolute left-0 right-0 top-8 hidden h-[3px] bg-gradient-to-r from-primary/20 via-primary to-primary/20 md:block"
              aria-hidden
            />
            <ol className="grid gap-10 md:grid-cols-4">
              {timeline.map((t) => {
                const Icon = t.icon;
                return (
                  <li key={t.year} className="relative text-center">
                    <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary bg-white shadow-[0_10px_30px_-10px_rgba(245,196,0,0.7)]">
                      <Icon className="h-6 w-6 text-foreground" aria-hidden />
                    </div>
                    <p className="mt-4 font-button text-xs font-semibold uppercase tracking-widest text-primary">
                      {t.year}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold">{t.title}</h3>
                    <p className="mx-auto mt-2 max-w-[18rem] text-sm leading-relaxed text-ink-soft">
                      {t.desc}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* 4 — MISSION */}
      <section className="container-editorial py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="chip">Our Mission</span>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl md:text-[2.75rem]">
              A clearer, calmer way to read the menu.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              We help visitors explore the latest Waffle House menu, share up-to-date prices,
              publish nutrition information and write guides that make ordering easier.
            </p>
            <ul className="mt-6 space-y-3 text-base text-foreground">
              {[
                "Explore the latest menu, category by category.",
                "See verified U.S. average prices for every plate.",
                "Read clear nutrition information and allergens.",
                "Find helpful articles written for real diners.",
                "Enjoy a fast, mobile-friendly reading experience.",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <HeartHandshake className="h-3 w-3" aria-hidden />
                  </span>
                  <span className="leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-border shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]">
              <img
                src={missionImg}
                alt="Chef preparing breakfast on a professional flat-top grill"
                width={1200}
                height={1400}
                loading="lazy"
                className="h-full w-full object-cover aspect-[4/5]"
              />
            </div>
            <div className="pointer-events-none absolute -bottom-6 -left-6 hidden h-32 w-32 rounded-3xl bg-primary/90 md:block" aria-hidden />
          </div>
        </div>
      </section>

      {/* 5 — WHAT YOU'LL FIND */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-editorial">
          <div className="mx-auto max-w-2xl text-center">
            <span className="chip">Explore</span>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl md:text-[2.75rem]">
              What You'll Find Here
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Four dependable pillars — the menu, the prices, the nutrition and the writing
              that ties it all together.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-5 md:gap-6 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <article key={f.title} className="card-elevated overflow-hidden bg-white">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-muted">
                    <img
                      src={f.image}
                      alt={f.title}
                      width={800}
                      height={600}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.desc}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 — EDITORIAL STANDARDS */}
      <section className="container-editorial py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <span className="chip">Editorial</span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl md:text-[2.75rem]">
            Our Editorial Standards
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-soft">
            <p>
              Every article on Waffle House Menu is written using publicly available
              information — official menu boards, in-restaurant printed menus and
              consumer-facing nutrition disclosures. Facts are cross-checked before publishing.
            </p>
            <p>
              We review menu items and prices on a rolling schedule and update pages when
              information changes. Prices reflect a recent U.S. average and{" "}
              <strong className="text-foreground">may vary by location</strong>; please confirm
              the current price at your local restaurant before ordering.
            </p>
            <p>
              We do not claim any official affiliation with Waffle House, Inc. All trademarks
              belong to their respective owners. Our aim is simply to make the menu easier to
              read, understand and enjoy.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Search, label: "Publicly sourced" },
              { icon: ClipboardCheck, label: "Regularly reviewed" },
              { icon: ShieldCheck, label: "Independent voice" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="font-button text-sm font-semibold">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — WHY TRUST */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-editorial">
          <div className="mx-auto max-w-2xl text-center">
            <span className="chip">Why Us</span>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl md:text-[2.75rem]">
              Why Readers Trust Waffle House Menu
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              We earn trust the slow way — by writing carefully and keeping information current.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {trust.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.title}
                  className="group rounded-3xl border border-border bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_20px_40px_-30px_rgba(0,0,0,0.15)] transition hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_30px_50px_-30px_rgba(0,0,0,0.2)]"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">{t.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8 — MENU CATEGORIES */}
      <section className="container-editorial py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip">Our Menu</span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl md:text-[2.75rem]">
            Menu Categories
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Every category in the current Waffle House menu — tap any tile to open it.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/menu/$category"
              params={{ category: c.id }}
              className="group block"
            >
              <div className="aspect-square w-full overflow-hidden rounded-2xl bg-muted">
                <img
                  src={c.image}
                  alt={`${c.name} menu category`}
                  width={600}
                  height={600}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
              </div>
              <p className="mt-3 text-center font-display text-base font-semibold group-hover:text-primary transition-colors">
                {c.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 9 — LATEST ARTICLES */}
      <section className="bg-surface py-20 md:py-28">
        <div className="container-editorial">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            {/* Article list */}
            <div>
              <span className="chip">Latest</span>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                Latest Articles
              </h2>
              <div className="mt-8 space-y-6">
                {latestArticles.map((a) => (
                  <article
                    key={a.slug}
                    className="grid grid-cols-[7rem_1fr] gap-4 rounded-2xl border border-border bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-30px_rgba(0,0,0,0.2)] sm:grid-cols-[10rem_1fr] sm:gap-5 sm:p-5"
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                      <img
                        src={a.image}
                        alt={a.title}
                        width={400}
                        height={300}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-ink-soft">
                        <span className="rounded-full bg-primary/15 px-2 py-0.5 font-semibold text-foreground">
                          {a.tag}
                        </span>
                        <span>Updated {formatDate(a.updatedAt)}</span>
                        <span>· {a.readMinutes} min read</span>
                      </div>
                      <h3 className="mt-2 font-display text-lg font-semibold leading-snug sm:text-xl">
                        {a.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-ink-soft">
                        {a.summary}
                      </p>
                      <Link
                        to="/menu"
                        className="btn-primary mt-4 h-9 px-4 text-xs"
                      >
                        Read More <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Table */}
            <div>
              <div className="overflow-hidden rounded-2xl border border-border bg-[#f5f5f5] shadow-[0_1px_2px_rgba(0,0,0,0.03),0_20px_40px_-30px_rgba(0,0,0,0.15)]">
                <table className="w-full text-sm">
                  <thead className="bg-primary text-primary-foreground">
                    <tr>
                      <th scope="col" className="px-5 py-4 text-left font-button text-xs font-bold uppercase tracking-widest">
                        Menu
                      </th>
                      <th scope="col" className="px-5 py-4 text-right font-button text-xs font-bold uppercase tracking-widest">
                        Recipes
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {menuTable.map((row) => (
                      <tr key={row.name} className="transition-colors hover:bg-white">
                        <td className="px-5 py-4 font-medium text-foreground">
                          {row.name}
                        </td>
                        <td className="px-5 py-4 text-right tabular-nums text-ink-soft">
                          {row.recipeCount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-ink-soft">
                Counts are updated as new items and articles are published.
              </p>
            </div>
          </div>

          <div className="mt-12 flex justify-center">
            <Link to="/menu" className="btn-primary h-12 px-7 text-base">
              View More Articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10 — SUBSCRIBE */}
      <SubscriberSection bgImage={subscribeBg} idPrefix="about-sub" />

      {/* 11 — DISCLAIMER */}
      <section className="container-editorial py-16 md:py-20">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-surface p-8 sm:p-10">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <ShieldCheck className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Information Disclaimer
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-soft sm:text-base">
                <p>
                  Waffle House Menu is an independent informational resource. We are
                  <strong className="text-foreground"> not affiliated with, endorsed by, or sponsored by </strong>
                  Waffle House, Inc. All trademarks and logos belong to their respective owners.
                </p>
                <p>
                  Menu items, prices, and nutrition information{" "}
                  <strong className="text-foreground">may change over time and vary by location</strong>.
                  For the most accurate, current details, we encourage visitors to confirm
                  directly with their local restaurant before ordering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
