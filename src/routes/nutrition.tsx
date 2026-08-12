import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Search,
  Flame,
  Beef,
  Wheat,
  Droplet,
  Info,
  AlertTriangle,
  
  Egg,
  Milk,
  Nut,
  Bean,
  ShieldAlert,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { menu, categories, type CategoryId } from "@/data/menu";
import { PdfNutritionTable } from "@/components/PdfNutritionTable";
import { SubscriberSection } from "@/components/SubscriberSection";
import nutritionHero from "@/assets/nutrition-hero.jpg";
import nutritionOverview from "@/assets/nutrition-overview.jpg";
import tipBalanced from "@/assets/nutrition-tip-balanced.jpg";
import tipProtein from "@/assets/nutrition-tip-protein.jpg";
import tipLabel from "@/assets/nutrition-tip-label.jpg";
import newsletterBg from "@/assets/hero-5-diner.jpg";
import tipCalories from "@/assets/nutrition-tip-calories.jpg";
import lowcalFruit from "@/assets/nutrition-lowcal-fruit.jpg";
import lowcalEggs from "@/assets/nutrition-lowcal-eggs.jpg";
import catBreakfast from "@/assets/all-star-breakfast.jpg";
import catWaffle from "@/assets/hero-waffles.jpg";
import catProtein from "@/assets/tbone-steak.jpg";
import catHealthy from "@/assets/popular-healthy.jpg";
import catDrinks from "@/assets/iced-coffee.jpg";
import chickenImg from "@/assets/chicken-sandwich.jpg";

export const Route = createFileRoute("/nutrition")({
  head: () => ({
    meta: [
      { title: "Waffle House Nutrition Guide — Calories, Protein & Allergens (2026)" },
      {
        name: "description",
        content:
          "A premium nutrition guide to the Waffle House menu: calories, protein, carbs, fat, sodium, allergens, low-calorie picks and high-protein meals. Updated July 2026.",
      },
      { property: "og:title", content: "Waffle House Nutrition Guide — 2026" },
      {
        property: "og:description",
        content:
          "Calories, macros, allergens and healthier menu picks — an independent editorial nutrition guide.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/nutrition" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/nutrition" }],
  }),
  component: NutritionPage,
});

const overviewCards = [
  {
    icon: Flame,
    title: "Calories",
    desc: "Total energy per serving — a starting point for planning your day.",
  },
  {
    icon: Beef,
    title: "Protein",
    desc: "Keeps you full and supports muscle. Eggs, steak and chicken lead the menu.",
  },
  {
    icon: Wheat,
    title: "Carbs",
    desc: "Waffles, toast and hashbrowns provide quick fuel — balance with protein.",
  },
  {
    icon: Droplet,
    title: "Fat & Sodium",
    desc: "Watch saturated fat and sodium on smothered plates and melts.",
  },
];

const nutritionCategories: {
  title: string;
  desc: string;
  image: string;
  to: "/menu/$category" | "/nutrition";
  params?: { category: CategoryId };
}[] = [
  {
    title: "Breakfast Nutrition",
    desc: "Eggs, bacon, grits and biscuits — macros and calories.",
    image: catBreakfast,
    to: "/menu/$category",
    params: { category: "breakfast" },
  },
  {
    title: "Waffle Nutrition",
    desc: "Classic, pecan and specialty waffles broken down.",
    image: catWaffle,
    to: "/menu/$category",
    params: { category: "waffles" },
  },
  {
    title: "Protein Meals",
    desc: "T-bone, chicken and hearty plates over 30g protein.",
    image: catProtein,
    to: "/nutrition",
  },
  {
    title: "Healthy Choices",
    desc: "Lighter plates under 500 calories, no compromise on flavor.",
    image: catHealthy,
    to: "/nutrition",
  },
  {
    title: "Drinks & Beverages",
    desc: "Coffee, tea and shakes — sugar and calorie details.",
    image: catDrinks,
    to: "/menu/$category",
    params: { category: "drinks" },
  },
];

const lowCalPicks = [
  {
    name: "Scrambled Eggs (2)",
    calories: 180,
    protein: 12,
    why: "High protein, low carb — a clean base for any breakfast plate.",
    image: lowcalEggs,
  },
  {
    name: "Fresh Fruit Bowl",
    calories: 120,
    protein: 2,
    why: "Naturally sweet, high in fiber and vitamin C.",
    image: lowcalFruit,
  },
  {
    name: "Grilled Chicken (plain)",
    calories: 320,
    protein: 38,
    why: "Lean protein, minimal fat — swap the bun for lettuce to cut carbs.",
    image: chickenImg,
  },
  {
    name: "Classic Waffle (half)",
    calories: 230,
    protein: 4,
    why: "Half a waffle plus eggs keeps a plate under 500 calories.",
    image: catWaffle,
  },
];

const allergenGuide = [
  { icon: Egg, name: "Eggs", notes: "In waffles, breakfasts and many sauces." },
  { icon: Milk, name: "Milk / Dairy", notes: "Cheese, butter, cream and shakes." },
  { icon: Wheat, name: "Wheat / Gluten", notes: "Waffles, biscuits, toast, buns." },
  { icon: Bean, name: "Soy", notes: "Some oils and sauces contain soy." },
  { icon: Nut, name: "Tree Nuts", notes: "Pecan waffles and select desserts." },
];

const tips = [
  {
    title: "How to Choose a Balanced Breakfast",
    desc: "Aim for one protein, one whole grain and one fruit for lasting energy.",
    image: tipBalanced,
  },
  {
    title: "Best High-Protein Breakfast Ideas",
    desc: "Simple swaps to push any plate past 30 grams of protein.",
    image: tipProtein,
  },
  {
    title: "Understanding Restaurant Nutrition Labels",
    desc: "What serving sizes, % daily values and sodium really mean.",
    image: tipLabel,
  },
  {
    title: "How Many Calories Should You Eat?",
    desc: "A plain-English primer on daily energy needs by age and activity.",
    image: tipCalories,
  },
];

const faqs = [
  {
    q: "How many calories are in Waffle House meals?",
    a: "Individual items range from around 5 calories for black coffee to over 1,100 for the loaded All-Star Special. Most plates fall between 400 and 900 calories.",
  },
  {
    q: "Which menu items are healthiest?",
    a: "Scrambled eggs, plain hashbrowns, grilled chicken and fresh fruit are the lightest picks. Skip the smothered add-ons and syrup for the leanest plate.",
  },
  {
    q: "Does Waffle House provide nutrition information?",
    a: "Nutrition is available on request at restaurants and on their official site. The figures on this page are independent editorial estimates — always confirm with your local restaurant.",
  },
  {
    q: "Which meals have the most protein?",
    a: "The T-bone Steak & Eggs (68g) and All-Star Special (42g) lead the menu, followed by burgers and grilled chicken plates.",
  },
  {
    q: "Are nutrition details different by location?",
    a: "Recipes are standardized, but portioning and add-ons vary by cook and franchise, so real-world values may differ slightly from published estimates.",
  },
  {
    q: "How accurate are nutrition estimates?",
    a: "Our figures are based on standard ingredient databases and typical serving sizes. Treat them as guidance, not medical advice.",
  },
];

function NutritionPage() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<CategoryId | "all">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu.filter((m) => {
      const catOk = activeCat === "all" || m.category === activeCat;
      const qOk = !q || m.name.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [query, activeCat]);

  const highProtein = useMemo(
    () => [...menu].filter((m) => m.nutrition.proteinG >= 30).sort((a, b) => b.nutrition.proteinG - a.nutrition.proteinG),
    [],
  );

  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden border-b border-border bg-[#0e1013] text-white">
        <img
          src={nutritionHero}
          alt="Balanced American breakfast plate with eggs, berries and whole grain toast"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="container-editorial relative py-20 md:py-28">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-white/70">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="px-2">/</span>
            <span aria-current="page" className="text-white">Nutrition</span>
          </nav>
          <span className="chip mt-6 bg-primary/90 text-primary-foreground">Nutrition Guide</span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
            Know What You're Eating
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            Explore calories, nutrition facts, ingredients and healthier menu choices with detailed,
            independently researched food guides.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#pdf-table" className="btn-primary">
              Official PDF Table <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href="#database" className="btn-ghost border-white/30 text-white hover:bg-white/10">
              Interactive Cards
            </a>
            <Link to="/menu" className="btn-ghost border-white/30 text-white hover:bg-white/10">
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* 2. NUTRITION OVERVIEW */}
      <section className="border-b border-border bg-background">
        <div className="container-editorial grid gap-12 py-20 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <span className="chip">Overview</span>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              Understanding Menu Nutrition
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              Nutrition information helps you plan meals that fit your day — whether you're
              tracking calories, prioritizing protein or watching sodium. Here's what to look for
              on every menu item page.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {overviewCards.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-[0_20px_40px_-30px_rgba(0,0,0,0.2)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-foreground transition-colors group-hover:bg-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-6">
            <div className="overflow-hidden rounded-3xl bg-muted">
              <img
                src={nutritionOverview}
                alt="Fresh eggs, spinach and tomatoes on a marble kitchen counter"
                loading="lazy"
                width={1200}
                height={1400}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR NUTRITION CATEGORIES */}
      <section className="border-b border-border bg-surface">
        <div className="container-editorial py-20">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="chip">Categories</span>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                Popular Nutrition Categories
              </h2>
              <p className="mt-3 max-w-xl text-ink-soft">
                Jump straight to the corner of the menu you care about most.
              </p>
            </div>
          </div>
          <div className="mt-10 -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-5 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
            {nutritionCategories.map((c) => (
              <Link
                key={c.title}
                to={c.to}
                params={c.params as never}
                className="group block w-[78%] shrink-0 snap-start md:w-auto"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={c.image}
                    alt={c.title}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{c.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-foreground transition-colors group-hover:text-primary">
                  Explore <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NUTRITION DATABASE */}
      <section id="database" className="border-b border-border bg-background">
        <div className="container-editorial py-20">
          <span className="chip">Database</span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Waffle House Nutrition Facts
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Search any menu item and filter by category. Every card links to a full ingredient and
            allergen breakdown.
          </p>

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
            <label className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" aria-hidden />
              <span className="sr-only">Search menu items</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search waffles, eggs, burgers…"
                className="h-12 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-sm outline-none transition focus:border-foreground focus:bg-background"
              />
            </label>
            <div className="-mx-5 flex snap-x gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0">
              <button
                onClick={() => setActiveCat("all")}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition ${
                  activeCat === "all"
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-surface text-foreground hover:bg-muted"
                }`}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCat(c.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-widest transition ${
                    activeCat === c.id
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-surface text-foreground hover:bg-muted"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="mt-10 rounded-2xl border border-border bg-surface p-8 text-center text-ink-soft">
              No items match your search. Try a different name or category.
            </p>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((m) => (
                <Link
                  key={m.slug}
                  to="/menu/$category/$slug"
                  params={{ category: m.category, slug: m.slug }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-shadow hover:shadow-[0_20px_40px_-30px_rgba(0,0,0,0.25)]"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs uppercase tracking-widest text-ink-soft">
                      {m.category}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-semibold">{m.name}</h3>
                    <dl className="mt-4 grid grid-cols-4 gap-2 text-center">
                      <div>
                        <dt className="text-[10px] uppercase tracking-widest text-ink-soft">Cal</dt>
                        <dd className="mt-0.5 font-display text-sm font-semibold">
                          {m.nutrition.calories}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-widest text-ink-soft">Protein</dt>
                        <dd className="mt-0.5 font-display text-sm font-semibold">
                          {m.nutrition.proteinG}g
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-widest text-ink-soft">Carbs</dt>
                        <dd className="mt-0.5 font-display text-sm font-semibold">
                          {m.nutrition.carbsG}g
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-widest text-ink-soft">Fat</dt>
                        <dd className="mt-0.5 font-display text-sm font-semibold">
                          {m.nutrition.fatG}g
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-4 text-xs text-ink-soft">
                      Sodium <span className="font-semibold text-foreground">{m.nutrition.sodiumMg}mg</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* OFFICIAL PDF NUTRITION TABLE SECTION */}
      <section id="pdf-table" className="border-b border-border bg-surface scroll-mt-6">
        <div className="container-editorial py-16 md:py-20">
          <PdfNutritionTable />
        </div>
      </section>

      {/* 5. LOW CALORIE CHOICES */}
      <section className="border-b border-border bg-surface">
        <div className="container-editorial py-20">
          <span className="chip">Smart Choices</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            Better Choices Under 500 Calories
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Simple picks that keep a plate light without sacrificing flavor or satisfaction.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {lowCalPicks.map((p) => (
              <article
                key={p.name}
                className="group overflow-hidden rounded-3xl border border-border bg-background transition-shadow hover:shadow-[0_20px_40px_-30px_rgba(0,0,0,0.2)]"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                  <div className="mt-3 flex gap-4 text-xs text-ink-soft">
                    <span>
                      <span className="font-semibold text-foreground">{p.calories}</span> cal
                    </span>
                    <span>
                      <span className="font-semibold text-foreground">{p.protein}g</span> protein
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.why}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HIGH PROTEIN MEALS */}
      <section className="border-b border-border bg-background">
        <div className="container-editorial py-20">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <span className="chip">Fitness Friendly</span>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                High Protein Menu Options
              </h2>
              <p className="mt-3 max-w-xl text-ink-soft">
                Every plate here delivers <span className="font-semibold text-foreground">30g or more</span> of
                protein per serving.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highProtein.map((m) => (
              <Link
                key={m.slug}
                to="/menu/$category/$slug"
                params={{ category: m.category, slug: m.slug }}
                className="group flex overflow-hidden rounded-3xl border border-border bg-surface transition-shadow hover:shadow-[0_20px_40px_-30px_rgba(0,0,0,0.25)]"
              >
                <div className="relative aspect-square w-32 shrink-0 overflow-hidden bg-muted sm:w-40">
                  <img
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground">
                    {m.nutrition.proteinG}g protein
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center p-5">
                  <span className="text-xs uppercase tracking-widest text-ink-soft">
                    {m.category}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-semibold leading-tight">{m.name}</h3>
                  <p className="mt-2 text-xs text-ink-soft">
                    {m.nutrition.calories} cal · {m.nutrition.fatG}g fat
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{m.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INGREDIENT & ALLERGEN GUIDE */}
      <section className="border-b border-border bg-surface">
        <div className="container-editorial py-20">
          <span className="chip">Allergens</span>
          <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
            Ingredients & Allergen Information
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            The most common allergens across the Waffle House menu. Each item detail page lists its
            specific allergens.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {allergenGuide.map(({ icon: Icon, name, notes }) => (
              <div
                key={name}
                className="rounded-2xl border border-border bg-background p-5 transition-shadow hover:shadow-[0_20px_40px_-30px_rgba(0,0,0,0.15)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-foreground">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{notes}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-start gap-4 rounded-2xl border border-primary/40 bg-primary/10 p-6">
            <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-foreground" aria-hidden />
            <div>
              <p className="font-display text-base font-semibold">
                Always check ingredients before ordering if you have food allergies.
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Recipes and cross-contact risks can vary by location and shift. Confirm any allergen
                concerns directly with your server before ordering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. NUTRITION TIPS & GUIDES */}
      <section className="border-b border-border bg-background">
        <div className="container-editorial py-20">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <span className="chip">Guides</span>
              <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
                Nutrition Tips & Food Guides
              </h2>
              <p className="mt-3 max-w-xl text-ink-soft">
                Editorial guides written to help you decode restaurant menus and eat with intent.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {tips.map((t) => (
              <article
                key={t.title}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-shadow hover:shadow-[0_20px_40px_-30px_rgba(0,0,0,0.2)]"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={t.image}
                    alt={t.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-semibold leading-snug">{t.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{t.desc}</p>
                  <Link
                    to="/menu"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-foreground transition-colors group-hover:text-primary"
                  >
                    Read More <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="border-b border-border bg-surface">
        <div className="container-editorial grid gap-12 py-20 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="chip">FAQ</span>
            <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
              Nutrition Questions
            </h2>
            <p className="mt-3 text-ink-soft">
              Straight answers to the questions readers ask most about our nutrition guide.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-background p-4 text-sm text-ink-soft">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-foreground" aria-hidden />
              <p>
                Independent editorial estimates. Not medical advice — consult a professional for
                personal nutrition guidance.
              </p>
            </div>
          </div>
          <div className="md:col-span-8">
            <Accordion type="single" collapsible className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`q${i}`} className="border-none px-5">
                  <AccordionTrigger className="py-5 text-left font-display text-base font-semibold hover:no-underline">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-ink-soft">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Disclaimer strip before footer */}
      <section className="bg-background">
        <div className="container-editorial py-10">
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5 text-sm text-ink-soft">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-foreground" aria-hidden />
            <p>
              Waffle House Menu is an independent editorial guide and is not affiliated with,
              endorsed by, or sponsored by Waffle House, Inc. Nutrition values are estimates
              based on standard ingredients and typical serving sizes — actual values may vary by
              location.
            </p>
          </div>
        </div>
      </section>

      {/* ============ COMPACT NEWSLETTER ============ */}
      <SubscriberSection idPrefix="nutrition-sub" />
    </>
  );
}
