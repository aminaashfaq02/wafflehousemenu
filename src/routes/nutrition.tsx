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
  ChevronRight,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { menu, categories, type CategoryId } from "@/data/menu";
import { CENTRAL_MENU_CATEGORIES } from "@/data/centralMenuData";
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
import chickenImg from "@/assets/chicken-sandwich.jpg";
import catWaffle from "@/assets/hero-waffles.jpg";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/nutrition")({
  head: () => {
    const url = `${SITE}/nutrition`;
    const title = "Waffle House Nutrition & Calories | Menu Nutrition Guide";
    const description =
      "Explore Waffle House nutrition and calorie information, with available details for menu items including calories, protein, carbohydrates, fat and sodium.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Nutrition", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Waffle House Nutrition & Calories | Menu Nutrition Guide",
            url,
            description: "A comprehensive guide to Waffle House nutrition facts, calorie counts, macros, and food allergens.",
          }),
        },
      ],
    };
  },
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
    desc: "Important for muscle and satiety. Eggs, steak, and chicken are high-protein options.",
  },
  {
    icon: Wheat,
    title: "Carbohydrates",
    desc: "Waffles, hashbrowns, and bread items are the primary carbohydrate sources on the menu.",
  },
  {
    icon: Droplet,
    title: "Fat",
    desc: "Fat content varies by item, preparation method, and added butter or oils.",
  },
  {
    icon: Info,
    title: "Sodium",
    desc: "Sodium details are helpful to check, particularly for cured meats and seasoned sides.",
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
    q: "How many calories are in Waffle House menu items?",
    a: "Individual items range from around 5 calories for black coffee to over 1,100 for the loaded All-Star Special. Most plates fall between 400 and 900 calories.",
  },
  {
    q: "Where can I find Waffle House nutrition information?",
    a: "Official nutrition details are published by Waffle House, Inc. Our guide compiles available values, such as calories, protein, carbs, fat, and sodium, into searchable tables for easy reference.",
  },
  {
    q: "Does Waffle House provide calorie information?",
    a: "Yes, Waffle House provides calorie counts on their menus and in official nutritional disclosures for standard menu items.",
  },
  {
    q: "Can nutrition information vary by menu item?",
    a: "Yes, calories and nutrition values vary considerably depending on choices like egg preparation (scrambled vs. poached), meat options, and toppings.",
  },
  {
    q: "How can I compare calories between menu items?",
    a: "You can use our interactive nutrition cards or the search tool above to filter items by category and compare calories side-by-side.",
  },
  {
    q: "Is nutrition information the same at every location?",
    a: "Recipes are standardized, but because individual plates are cooked to order, portions, butter usage, and toppings can vary slightly by location.",
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
    <div className="bg-white">
      {/* 1. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="bg-surface py-3 border-b border-border font-sans">
        <div className="container-editorial flex items-center gap-2 text-xs font-medium text-ink-soft">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="text-foreground">Nutrition</span>
        </div>
      </nav>

      {/* 2. HERO */}
      <section className="relative overflow-hidden border-b border-border bg-[#0e1013] text-white font-sans">
        <img
          src={nutritionHero}
          alt="Balanced American breakfast plate with eggs, berries and whole grain toast"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />
        <div className="container-editorial relative py-20 md:py-28">
          <span className="chip bg-primary/95 text-primary-foreground">Nutrition Guide</span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl text-white">
            Waffle House Nutrition &amp; Calories
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            Explore available nutrition and calorie information for Waffle House menu items. Browse nutritional details by menu category and use the information as a reference when comparing different menu options.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#pdf-table" className="btn-primary font-semibold">
              Official PDF Table <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href="#database" className="btn-ghost border-white/30 text-white hover:bg-white/10 font-semibold">
              Interactive Cards
            </a>
            <Link to="/menu" className="btn-ghost border-white/30 text-white hover:bg-white/10 font-semibold">
              Explore Menu
            </Link>
          </div>
        </div>
      </section>

      {/* 3. NUTRITION QUICK FACTS */}
      <section className="border-b border-border bg-background font-sans">
        <div className="container-editorial grid gap-12 py-20 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <span className="chip">Overview</span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl text-foreground">
              Understanding Menu Nutrition
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft">
              Nutrition information helps you plan meals that fit your day — whether you're tracking calories, prioritizing protein or watching sodium. Here's what to look for on every menu item page.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {overviewCards.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-border bg-surface p-5 transition-shadow hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-foreground transition-colors group-hover:bg-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-6">
            <div className="overflow-hidden rounded-3xl bg-muted h-full min-h-[300px]">
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

      {/* 4. NUTRITION BY MENU CATEGORY */}
      <section className="border-b border-border bg-surface font-sans">
        <div className="container-editorial py-20">
          <div className="mx-auto max-w-2xl text-center space-y-3">
            <span className="chip">Categories</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Waffle House Nutrition by Menu Category
            </h2>
            <p className="text-base text-ink-soft">
              Browse available nutrition information by menu category to compare calories and other nutritional details across the menu.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CENTRAL_MENU_CATEGORIES.map((c) => (
              <Link
                key={c.id}
                to={c.href as any}
                className="group block rounded-2xl border border-border bg-white p-5 shadow-xs transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">{c.name}</h3>
                <p className="mt-1 text-xs text-ink-soft leading-relaxed line-clamp-2">{c.shortDescription}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary hover:underline">
                  View nutrition <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NUTRITION SEARCH / FILTER */}
      <section id="database" className="border-b border-border bg-background font-sans">
        <div className="container-editorial py-20">
          <span className="chip">Database</span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl text-foreground">
            Search Waffle House Nutrition Information
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Search any menu item and filter by category. Every card links to a full ingredient and allergen breakdown.
          </p>

          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
            <label className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" aria-hidden />
              <span className="sr-only">Search menu items</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a menu item..."
                className="h-12 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:bg-background"
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
                  className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-shadow hover:shadow-md"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs uppercase tracking-widest text-ink-soft">
                      {m.category}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold text-foreground">{m.name}</h3>
                    <dl className="mt-4 grid grid-cols-4 gap-2 text-center">
                      <div>
                        <dt className="text-[10px] uppercase tracking-widest text-ink-soft font-semibold">Cal</dt>
                        <dd className="mt-0.5 font-display text-sm font-semibold">
                          {m.nutrition.calories}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-widest text-ink-soft font-semibold">Protein</dt>
                        <dd className="mt-0.5 font-display text-sm font-semibold">
                          {m.nutrition.proteinG}g
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-widest text-ink-soft font-semibold">Carbs</dt>
                        <dd className="mt-0.5 font-display text-sm font-semibold">
                          {m.nutrition.carbsG}g
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[10px] uppercase tracking-widest text-ink-soft font-semibold">Fat</dt>
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

      {/* 6. OFFICIAL PDF NUTRITION TABLE */}
      <section id="pdf-table" className="border-b border-border bg-surface scroll-mt-6 font-sans">
        <div className="container-editorial py-16 md:py-20">
          <PdfNutritionTable />
        </div>
      </section>

      {/* 7. NUTRITIONAL DETAIL HIGHLIGHTS (Calories, Protein, Allergens) */}
      <section className="bg-white py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-4xl mx-auto space-y-12">
          {/* Calories detail */}
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">Waffle House Calories</h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              Calories can vary considerably between menu items and combinations. Use the available calorie information as a reference when comparing menu choices. Skipping extra butter, sausage gravy, or heavy syrups can help reduce overall calories on custom plates.
            </p>
            <div>
              <Link to="/menu" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                View Waffle House Menu <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <hr className="border-border/60" />

          {/* Protein detail */}
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">Protein Information</h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              Protein is essential for muscle health and satiety. Our guide lists protein content for each menu item to help you compare. Dishes like the T-Bone Steak &amp; Eggs, sirloin breakfasts, and grilled chicken breast plates offer high protein density, while waffles and hashbrowns provide moderate amounts.
            </p>
          </div>

          <hr className="border-border/60" />

          {/* Allergen detail */}
          <div className="space-y-3">
            <h2 className="font-display text-2xl font-bold text-foreground">Waffle House Allergen Information</h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              Allergen information can change by item, preparation method and location. Check current ingredient and allergen information with the restaurant before ordering if you have a food allergy. Waffle House kitchens handle eggs, dairy, wheat, soy, peanuts, and pecans on shared cooking surfaces, which may present cross-contact risks.
            </p>
          </div>
        </div>
      </section>

      {/* 8. BETTER CHOICES UNDER 500 CALORIES */}
      <section className="border-b border-border bg-surface font-sans">
        <div className="container-editorial py-20">
          <span className="chip">Smart Choices</span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold sm:text-4xl text-foreground">
            Better Choices Under 500 Calories
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Simple picks that keep a plate light without sacrificing flavor or satisfaction.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {lowCalPicks.map((p) => (
              <article
                key={p.name}
                className="group overflow-hidden rounded-3xl border border-border bg-background transition-shadow hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-foreground">{p.name}</h3>
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

      {/* 9. FITNESS FRIENDLY PROTEIN */}
      <section className="border-b border-border bg-background font-sans">
        <div className="container-editorial py-20">
          <span className="chip">Fitness Friendly</span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl text-foreground">
            High Protein Menu Options
          </h2>
          <p className="mt-3 max-w-xl text-ink-soft font-sans">
            Every plate here delivers <span className="font-semibold text-foreground">30g or more</span> of protein per serving.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {highProtein.map((m) => (
              <Link
                key={m.slug}
                to="/menu/$category/$slug"
                params={{ category: m.category, slug: m.slug }}
                className="group flex overflow-hidden rounded-3xl border border-border bg-surface transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-square w-32 shrink-0 overflow-hidden bg-muted sm:w-40">
                  <img
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground">
                    {m.nutrition.proteinG}g protein
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center p-5">
                  <span className="text-xs uppercase tracking-widest text-ink-soft">
                    {m.category}
                  </span>
                  <h3 className="mt-1 font-display text-lg font-bold leading-tight text-foreground">{m.name}</h3>
                  <p className="mt-2 text-xs text-ink-soft">
                    {m.nutrition.calories} cal · {m.nutrition.fatG}g fat
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm text-ink-soft leading-relaxed">{m.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. ALLERGEN DETAIL LIST */}
      <section className="border-b border-border bg-surface font-sans">
        <div className="container-editorial py-20">
          <span className="chip">Allergens</span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl text-foreground">
            Ingredients &amp; Allergen Information
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            The most common allergens across the Waffle House menu. Each item detail page lists its specific allergens.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {allergenGuide.map(({ icon: Icon, name, notes }) => (
              <div
                key={name}
                className="rounded-2xl border border-border bg-background p-5 shadow-xs"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-foreground">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-foreground">{name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{notes}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-start gap-4 rounded-2xl border border-primary/40 bg-primary/10 p-6">
            <ShieldAlert className="mt-0.5 h-6 w-6 shrink-0 text-foreground" aria-hidden />
            <div>
              <p className="font-display text-base font-bold text-foreground">
                Always check ingredients before ordering if you have food allergies.
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Recipes and cross-contact risks can vary by location and shift. Confirm any allergen concerns directly with your server before ordering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. DETAILED NUTRITION TIPS & ARTICLES */}
      <section className="border-b border-border bg-background font-sans">
        <div className="container-editorial py-20">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <div>
              <span className="chip">Guides</span>
              <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl text-foreground">
                Nutrition Tips &amp; Food Guides
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
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-shadow hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={t.image}
                    alt={t.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-bold leading-snug text-foreground">{t.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{t.desc}</p>
                  <Link
                    to="/blog"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary hover:underline"
                  >
                    Read Guide <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 12. INTERNAL LINKS INTEGRATION */}
      <section className="bg-surface py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial max-w-4xl mx-auto space-y-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-3">
              <h2 className="font-display text-2xl font-bold text-foreground">Explore the Full Waffle House Menu</h2>
              <p className="text-sm leading-relaxed text-ink-soft">
                Use the main menu guide to browse all 74 menu items across 13 categories, then return here to compare available nutrition information.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold pt-2">
                <Link to="/menu" className="text-primary hover:underline">Waffle House Menu</Link>
                <span className="text-border">|</span>
                <Link to="/menu" hash="prices-heading" className="text-primary hover:underline">Waffle House Menu Prices</Link>
                <span className="text-border">|</span>
                <a href="/waffle-house-menu-nutritionals.pdf" download className="text-primary hover:underline">Menu PDF</a>
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="font-display text-2xl font-bold text-foreground">Planning a Visit?</h2>
              <p className="text-sm leading-relaxed text-ink-soft">
                Nutrition information is useful when planning what to order at a nearby restaurant. Browse states and cities to find your nearest location.
              </p>
              <div className="pt-2">
                <Link to="/locations" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                  Find Waffle House Locations <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. FAQ */}
      <section className="border-b border-border bg-surface font-sans">
        <div className="container-editorial grid gap-12 py-20 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="chip">FAQ</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground">
              Nutrition Questions
            </h2>
            <p className="mt-3 text-ink-soft">
              Straight answers to the questions readers ask most about our nutrition guide.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-background p-4 text-sm text-ink-soft">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-foreground" aria-hidden />
              <p>
                Independent editorial estimates. Not medical advice — consult a professional for personal nutrition guidance.
              </p>
            </div>
          </div>
          <div className="md:col-span-8">
            <Accordion type="single" collapsible className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`q${i}`} className="border-none px-5">
                  <AccordionTrigger className="py-5 text-left font-display text-base font-bold hover:no-underline text-foreground">
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

      {/* 14. MEDICAL DISCLAIMER & LAST UPDATED */}
      <section className="bg-background font-sans">
        <div className="container-editorial py-12 space-y-6">
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-5 text-sm text-ink-soft">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-foreground" aria-hidden />
            <div>
              <h3 className="font-bold text-foreground">Medical Disclaimer</h3>
              <p className="mt-1 leading-relaxed">
                Nutrition information is provided for general informational purposes. Values may vary by menu item, preparation and location. If you have a medical condition, food allergy or specific dietary requirement, confirm current information with the restaurant or an appropriate qualified professional before ordering.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-ink-soft">
            <span>Last updated: August 2026</span>
            <Link to="/about" className="text-primary hover:underline font-semibold">
              How We Update Nutrition Information →
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <SubscriberSection bgImage={newsletterBg} idPrefix="nutrition-sub" />
    </div>
  );
}
