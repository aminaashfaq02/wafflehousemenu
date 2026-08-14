import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Search, Clock, ChevronLeft, ChevronRight, FileText, Download, MapPin, ShieldCheck, RefreshCw, Layers, CheckCircle2, AlertCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Centralized Menu Data & Dynamic Totals (Single Source of Truth)
import { CENTRAL_MENU_CATEGORIES, TOTAL_MENU_CATEGORIES, TOTAL_MENU_ITEMS } from "@/data/centralMenuData";

// Hero slides
import hero1 from "@/assets/hero-1-waffle.jpg";
import hero2 from "@/assets/hero-2-breakfast.jpg";
import hero3 from "@/assets/hero-3-hashbrowns.jpg";
import hero4 from "@/assets/hero-4-coffee.jpg";
import hero5 from "@/assets/hero-5-diner.jpg";
import hero6 from "@/assets/hero-6-kitchen.jpg";

// Section images
import nutritionChef from "@/assets/nutrition-chef.jpg";
import contactChef from "@/assets/contact-chef.jpg";
import popularDrinks from "@/assets/popular-drinks.jpg";
import contactHeroDiner from "@/assets/contact-hero-diner.jpg";

// Menu item images
import wafflesImg from "@/assets/hero-waffles.jpg";
import allStarImg from "@/assets/all-star-breakfast.jpg";
import hashbrownsImg from "@/assets/hashbrowns.jpg";
import burgerImg from "@/assets/burger.jpg";
import pattyMeltImg from "@/assets/patty-melt.jpg";
import chickenSandwichImg from "@/assets/chicken-sandwich.jpg";
import tboneImg from "@/assets/tbone-steak.jpg";
import icedCoffeeImg from "@/assets/iced-coffee.jpg";
import lowcalEggsImg from "@/assets/nutrition-lowcal-eggs.jpg";
import lowcalFruitImg from "@/assets/nutrition-lowcal-fruit.jpg";
import pecanWaffleImg from "@/assets/waffle-peanut-butter.jpg";
import chocolateWaffleImg from "@/assets/waffle-chocolate-chip.jpg";

import { SubscriberSection } from "@/components/SubscriberSection";
import { articles } from "@/data/articles";
import { FaqSection } from "@/components/FaqSection";

/* ------------------------------------------------------------------ */
/* TYPES                                                                */
/* ------------------------------------------------------------------ */

interface FeaturedRecipeItem {
  name: string;
  category: string;
  price: string;
  calories: number;
  description: string;
  image: string;
  link: string;
}

/* ------------------------------------------------------------------ */
/* DATA                                                                 */
/* ------------------------------------------------------------------ */

// Featured Menu Items (6–10 items labeled "Featured Menu Items")
const featuredMenuItems: FeaturedRecipeItem[] = [
  {
    name: "All-Star Special™",
    category: "All-Star Special™",
    price: "$13.85",
    calories: 1050,
    description: "Two eggs, hashbrowns or grits, toast, choice of bacon, sausage or ham, and a Classic Waffle.",
    image: allStarImg,
    link: "/menu/all-star-special",
  },
  {
    name: "Classic Sweet Cream Waffle",
    category: "Waffles",
    price: "$4.55",
    calories: 410,
    description: "Golden, crisp sweet cream buttermilk waffle baked fresh to order on a flat-top iron.",
    image: wafflesImg,
    link: "/menu/waffles",
  },
  {
    name: "Pecan Waffle",
    category: "Waffles",
    price: "$5.75",
    calories: 560,
    description: "Signature sweet cream waffle baked with toasted pecans inside the batter.",
    image: pecanWaffleImg,
    link: "/menu/waffles",
  },
  {
    name: "Chocolate Chip Waffle",
    category: "Waffles",
    price: "$5.25",
    calories: 520,
    description: "Warm buttermilk waffle melted with semi-sweet chocolate chips throughout.",
    image: chocolateWaffleImg,
    link: "/menu/waffles",
  },
  {
    name: "2 Eggs Scrambled Breakfast",
    category: "Egg Breakfasts",
    price: "$6.85",
    calories: 410,
    description: "Two farm-fresh eggs cooked your way, served with hashbrowns and warm toast.",
    image: lowcalEggsImg,
    link: "/menu/breakfast",
  },
  {
    name: "T-Bone Steak & Eggs",
    category: "Classic Dinners",
    price: "$16.50",
    calories: 1230,
    description: "USDA Choice T-Bone steak cooked to order, served with two eggs, hashbrowns & toast.",
    image: tboneImg,
    link: "/menu/classic-dinners",
  },
  {
    name: "Hashbrowns Scattered, Smothered & Covered",
    category: "Hashbrowns & Toppings",
    price: "$5.25",
    calories: 520,
    description: "Golden shredded potatoes griddled crisp, smothered with sautéed onions and melted cheese.",
    image: hashbrownsImg,
    link: "/menu/hashbrowns",
  },
  {
    name: "Texas Angus Patty Melt",
    category: "Breakfast Sandwiches & Melts",
    price: "$8.95",
    calories: 730,
    description: "Grilled Angus beef patty with caramelized onions and melted American cheese on Texas toast.",
    image: pattyMeltImg,
    link: "/menu/breakfast-sandwiches",
  },
];

const heroSlides = [
  { src: hero1, alt: "A golden Belgian waffle with butter and warm maple syrup on a diner plate" },
  { src: hero2, alt: "Two sunny-side up eggs, crispy bacon, hashbrowns and a biscuit on a diner counter" },
  { src: hero3, alt: "Golden crispy hashbrowns steaming on a hot flat-top griddle" },
  { src: hero4, alt: "A steaming mug of coffee on a classic American diner counter at dawn" },
  { src: hero5, alt: "Waffle House restaurant exterior in Georgia" },
  { src: hero6, alt: "A short-order cook cracking eggs onto a hot flat-top griddle" },
];

const nutritionRows = [
  { label: "Calories", value: "560 kcal" },
  { label: "Total Fat", value: "30 g" },
  { label: "Saturated Fat", value: "10 g" },
  { label: "Protein", value: "24 g" },
  { label: "Total Carbohydrates", value: "45 g" },
  { label: "Sodium", value: "1,080 mg" },
  { label: "Serving Size", value: "1 plate" },
];

// Required FAQ questions as specified in Prompt #21
const homeFaqs = [
  {
    q: "What is on the Waffle House menu?",
    a: "The Waffle House menu features classic 24-hour diner staples including golden buttermilk waffles, 2-egg breakfast plates, Toddle House® omelets, hashbrown bowls, Texas toast melts, grilled biscuits, USDA Choice Angus burgers, classic steak dinners, breakfast sides, desserts, and beverages.",
  },
  {
    q: "How many menu categories does Waffle House have?",
    a: `Waffle House features ${TOTAL_MENU_CATEGORIES} main menu categories, covering ${TOTAL_MENU_ITEMS} verified menu items ranging from waffles and egg breakfasts to burgers, dinners, sides, and drinks.`,
  },
  {
    q: "How much does the Waffle House menu cost?",
    a: "Menu items range from approximately $2.40 for sides and beverages to $16.50 for premium T-Bone steak dinner platters. The flagship All-Star Special™ combo is priced around $13.85 at most U.S. locations.",
  },
  {
    q: "Does Waffle House serve breakfast all day?",
    a: "Yes — Waffle House serves its entire menu, including waffles, eggs, hashbrowns, and breakfast plates, 24 hours a day, 7 days a week, 365 days a year at all locations.",
  },
  {
    q: "Where can I find Waffle House nutrition information?",
    a: "You can compare verified calories, fat, protein, carbs, and sodium across all menu items on our dedicated Waffle House Nutrition Guide page or download the complete Waffle House Menu PDF resource.",
  },
  {
    q: "Do Waffle House menu prices vary by location?",
    a: "Yes — prices can vary by region, state, and store location. The prices published on this independent guide represent verified U.S. counter averages updated regularly.",
  },
  {
    q: "How can I find a Waffle House location?",
    a: "You can browse our U.S. State Directory on this site to find Waffle House locations, store addresses, operating hours, amenities, and state-by-state restaurant directories.",
  },
];

const stateList = [
  { name: "Alabama", slug: "alabama", count: 154 },
  { name: "Arizona", slug: "arizona", count: 15 },
  { name: "Arkansas", slug: "arkansas", count: 48 },
  { name: "Florida", slug: "florida", count: 165 },
  { name: "Georgia", slug: "georgia", count: 435 },
  { name: "North Carolina", slug: "north-carolina", count: 182 },
  { name: "South Carolina", slug: "south-carolina", count: 147 },
  { name: "Tennessee", slug: "tennessee", count: 132 },
  { name: "Texas", slug: "texas", count: 110 },
  { name: "Virginia", slug: "virginia", count: 68 },
];

/* ------------------------------------------------------------------ */
/* ROUTE DEFINITION                                                     */
/* ------------------------------------------------------------------ */

const SITE_URL = "https://wafflehousemenu.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Waffle House Menu & Prices 2026 | Nutrition, Calories & Locations" },
      {
        name: "description",
        content: `Explore the Waffle House menu by category, with ${TOTAL_MENU_ITEMS} menu items across ${TOTAL_MENU_CATEGORIES} categories. Find current menu information, prices, calories, nutrition details and locations guide. Updated August 2026.`,
      },
      { property: "og:title", content: "Waffle House Menu & Prices 2026 | Nutrition, Calories & Locations" },
      { property: "og:url", content: `${SITE_URL}/` },
      {
        property: "og:description",
        content: `Explore the Waffle House menu by category, with ${TOTAL_MENU_ITEMS} menu items across ${TOTAL_MENU_CATEGORIES} categories. Find current menu information, prices, calories, nutrition details and locations guide.`,
      },
      { name: "twitter:title", content: "Waffle House Menu & Prices 2026 | Nutrition, Calories & Locations" },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/` },
      { rel: "preload", as: "image", href: hero1, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              "url": SITE_URL,
              "name": "Waffle House Menu Guide",
              "description": "Independent menu, pricing, nutrition, and location reference guide for Waffle House."
            },
            {
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              "name": "Waffle House Menu Guide",
              "url": SITE_URL,
              "logo": `${SITE_URL}/favicon.ico`,
              "description": "Independent reader reference for Waffle House: menu, prices, nutrition, and locations."
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${SITE_URL}/#breadcrumb`,
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": SITE_URL
                }
              ]
            },
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/#faq`,
              "mainEntity": homeFaqs.map((faq) => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.a
                }
              }))
            }
          ]
        }),
      },
    ],
  }),
  component: Home,
});

/* ------------------------------------------------------------------ */
/* 2. HERO SLIDESHOW SECTION                                            */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      aria-label="Waffle House Menu Guide Hero"
      className="relative -mt-[72px] flex min-h-[54svh] items-center overflow-hidden md:min-h-[62svh]"
    >
      <div className="absolute inset-0 -z-10">
        {heroSlides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={i === 0 ? s.alt : ""}
            aria-hidden={i !== index}
            fetchPriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
            width={1920}
            height={1280}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/90" />
      </div>

      <div className="container-editorial relative w-full pb-16 pt-28 text-center text-white md:pb-20 md:pt-32">
        {/* Subtle Editorial Label */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-black/40 px-3.5 py-1 backdrop-blur-md">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
            Waffle House Menu Guide
          </span>
          <span className="text-xs text-white/40">|</span>
          <span className="text-xs font-semibold text-white/80">
            Updated August 2026
          </span>
        </div>

        {/* Primary H1 */}
        <h1 id="hero-title" className="mx-auto mt-4 max-w-4xl font-sans text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl">
          Waffle House Menu &amp; Prices
        </h1>

        {/* Factual Editorial Introductory Paragraph with Internal Links */}
        <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg font-sans">
          Explore the{" "}
          <Link to="/menu" className="underline decoration-primary hover:text-primary transition-colors font-medium">
            Waffle House menu
          </Link>{" "}
          with {TOTAL_MENU_ITEMS} menu items across {TOTAL_MENU_CATEGORIES} categories, including classic breakfast favorites, waffles, hashbrowns, burgers, sandwiches, dinners, sides, pies and beverages. Browse{" "}
          <Link to="/menu" className="underline decoration-primary hover:text-primary transition-colors font-medium">
            menu prices
          </Link>
          ,{" "}
          <Link to="/nutrition" className="underline decoration-primary hover:text-primary transition-colors font-medium">
            calories and nutrition information
          </Link>
          , or explore{" "}
          <Link to="/locations" className="underline decoration-primary hover:text-primary transition-colors font-medium">
            Waffle House locations
          </Link>{" "}
          and helpful{" "}
          <Link to="/blog" className="underline decoration-primary hover:text-primary transition-colors font-medium">
            menu guides
          </Link>
          .
        </p>

        {/* Hero CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link to="/menu" className="btn-primary h-12 px-6 text-base font-semibold">
            View Full Menu <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <a
            href="/waffle-house-menu-nutritionals.pdf"
            download
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            <Download className="h-4 w-4 text-primary" aria-hidden /> Download Menu PDF
          </a>
          <Link
            to="/nutrition"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-black/30 px-6 text-base font-semibold text-white/90 backdrop-blur-md transition-colors hover:bg-black/50"
          >
            View Nutrition
          </Link>
        </div>

        {/* Factual Information Strip */}
        <div className="mt-8 grid grid-cols-2 gap-4 max-w-xl mx-auto sm:grid-cols-4 border-t border-white/10 pt-6 text-center">
          <div>
            <span className="block text-2xl font-bold font-sans text-white">{TOTAL_MENU_ITEMS}</span>
            <span className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mt-0.5">Menu Items</span>
          </div>
          <div className="border-l border-white/10">
            <span className="block text-2xl font-bold font-sans text-white">{TOTAL_MENU_CATEGORIES}</span>
            <span className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mt-0.5">Categories</span>
          </div>
          <div className="border-l border-white/10">
            <span className="block text-2xl font-bold font-sans text-white">Verified</span>
            <span className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mt-0.5">Nutrition</span>
          </div>
          <div className="border-l border-white/10">
            <span className="block text-2xl font-bold font-sans text-white">U.S.</span>
            <span className="block text-[10px] font-bold text-white/60 uppercase tracking-wider mt-0.5">Locations</span>
          </div>
        </div>

        {/* Subtle Location Path Link */}
        <div className="mt-5">
          <Link to="/locations" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
            Find a Waffle House Location <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        {/* Hero Micro-Navigation */}
        <div className="mt-4 text-xs text-white/70">
          <span className="font-semibold text-white/50 mr-1.5">Explore:</span>
          <Link to="/menu" className="hover:text-primary transition-colors">Menu</Link>
          <span className="mx-2 text-white/30">·</span>
          <Link to="/nutrition" className="hover:text-primary transition-colors">Nutrition</Link>
          <span className="mx-2 text-white/30">·</span>
          <Link to="/locations" className="hover:text-primary transition-colors">Locations</Link>
          <span className="mx-2 text-white/30">·</span>
          <a href="/waffle-house-menu-nutritionals.pdf" download className="hover:text-primary transition-colors">Menu PDF</a>
          <span className="mx-2 text-white/30">·</span>
          <Link to="/blog" className="hover:text-primary transition-colors">Guides</Link>
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. KEY MENU FACTS BAR                                                */
/* ------------------------------------------------------------------ */

function KeyMenuFacts() {
  return (
    <div className="relative z-20 -mt-6 sm:-mt-8">
      <div className="container-editorial">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 rounded-2xl border border-black/10 bg-white p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] sm:grid-cols-4 sm:gap-4 text-center">
          <div className="p-2">
            <span className="font-display text-2xl sm:text-3xl font-bold text-foreground block">
              {TOTAL_MENU_ITEMS}
            </span>
            <span className="text-xs font-semibold text-ink-soft uppercase tracking-wider mt-0.5 block">
              Menu Items
            </span>
          </div>
          <div className="p-2 border-l border-black/5">
            <span className="font-display text-2xl sm:text-3xl font-bold text-foreground block">
              {TOTAL_MENU_CATEGORIES}
            </span>
            <span className="text-xs font-semibold text-ink-soft uppercase tracking-wider mt-0.5 block">
              Menu Categories
            </span>
          </div>
          <div className="p-2 border-l border-black/5">
            <span className="font-display text-2xl sm:text-3xl font-bold text-primary block">
              U.S.
            </span>
            <span className="text-xs font-semibold text-ink-soft uppercase tracking-wider mt-0.5 block">
              Restaurant Locations
            </span>
          </div>
          <div className="p-2 border-l border-black/5">
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-bold text-green-700 ring-1 ring-green-600/10">
              Updated August 2026
            </span>
            <span className="text-xs font-semibold text-ink-soft uppercase tracking-wider mt-1 block">
              Verified Data
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. DOWNLOADABLE MENU / PDF SECTION                                   */
/* ------------------------------------------------------------------ */

function PdfMenuSection() {
  return (
    <section aria-labelledby="pdf-heading" className="bg-[#0B0C0E] border-t border-white/10 mt-12">
      <div className="container-editorial py-12 md:py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-[#18191B] to-[#0B0C0E] border border-white/10 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 ring-1 ring-inset ring-amber-500/20">
              <FileText className="h-3.5 w-3.5" aria-hidden /> Informational Menu Resource
            </div>
            <h2 id="pdf-heading" className="font-display text-2xl font-bold text-white sm:text-3xl">
              Waffle House Menu PDF
            </h2>
            <p className="text-sm leading-relaxed text-white/75">
              View or download a convenient PDF version of the Waffle House menu for quick reference. Covers all {TOTAL_MENU_CATEGORIES} categories and {TOTAL_MENU_ITEMS} menu items with verified prices, calorie counts, and nutrition details.
            </p>
            <p className="text-xs text-white/45 italic pt-1">
              Independent informational PDF resource. Sourced from public nutrition disclosures and counter checks as of August 2026.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
            <Link
              to="/nutrition"
              hash="pdf-table"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white/10 px-6 text-sm font-semibold text-white border border-white/20 transition-all hover:bg-white/20"
            >
              <FileText className="h-4 w-4 text-primary" aria-hidden /> View Menu PDF
            </Link>
            <a
              href="/waffle-house-menu-nutritionals.pdf"
              download
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-black transition-all hover:bg-[#E2B000]"
            >
              <Download className="h-4 w-4" aria-hidden /> Download Menu PDF
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5 & 6. MENU AT A GLANCE & SEARCH SECTION                             */
/* ------------------------------------------------------------------ */

function MenuAtAGlanceAndSearch() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  return (
    <section aria-labelledby="glance-heading" className="border-t border-border/60 bg-surface py-12 md:py-16">
      <div className="container-editorial max-w-4xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Overview</p>
          <h2 id="glance-heading" className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Waffle House Menu at a Glance
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-soft sm:text-lg">
            The menu features classic breakfast plates, waffles, eggs, hashbrowns and other griddled favorites, along with burgers, sandwiches, dinners, sides, pies and beverages.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 shadow-xs text-xs font-bold text-foreground">
            <Layers className="h-3.5 w-3.5 text-primary" aria-hidden />
            <span>{TOTAL_MENU_CATEGORIES} Categories</span>
            <span className="text-ink-soft">·</span>
            <span>{TOTAL_MENU_ITEMS} Items</span>
          </div>
        </div>

        {/* Search Section (#17) */}
        <div className="mt-10 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="font-display text-xl font-bold text-foreground text-center">
            Search the Waffle House Menu
          </h2>
          <p className="mt-1 text-xs text-center text-ink-soft">
            Find a menu item, category, price or nutrition detail.
          </p>
          <form
            role="search"
            aria-label="Search the Waffle House menu"
            onSubmit={(e) => {
              e.preventDefault();
              const v = q.trim();
              navigate({ to: "/menu", search: v ? { q: v } : {} });
            }}
            className="mt-5 flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft"
              />
              <label htmlFor="homepage-menu-search" className="sr-only">
                Search waffles, eggs, hashbrowns, burgers...
              </label>
              <input
                id="homepage-menu-search"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search waffles, eggs, hashbrowns, burgers..."
                className="h-12 w-full rounded-xl border border-border bg-surface pl-12 pr-4 text-sm text-foreground placeholder:text-ink-soft focus:border-primary focus:outline-none"
              />
            </div>
            <button type="submit" className="btn-primary h-12 rounded-xl px-6 text-sm font-semibold">
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7. EXPLORE THE WAFFLE HOUSE MENU — APPROVED CATEGORY CARDS           */
/* ------------------------------------------------------------------ */

function CategoryGridSection() {
  return (
    <section id="menu-categories" aria-labelledby="cats-heading" className="scroll-mt-24 border-t border-border/60 bg-background">
      <div className="container-editorial pb-16 pt-16 md:pb-20 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">All Categories</p>
          <h2
            id="cats-heading"
            className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Explore the Waffle House Menu
          </h2>
          <p className="mt-3 text-base text-ink-soft sm:text-lg">
            Browse all {TOTAL_MENU_CATEGORIES} Waffle House menu categories, with {TOTAL_MENU_ITEMS} menu items organized for quick and easy reference. Select a category to view its menu items, prices and available nutrition information.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800 ring-1 ring-amber-500/20">
            <span>{TOTAL_MENU_CATEGORIES} Menu Categories</span>
            <span>·</span>
            <span>{TOTAL_MENU_ITEMS} Menu Items</span>
          </div>
        </div>

        {/* APPROVED CATEGORY CARD GRID - UNCHANGED VISUAL DESIGN */}
        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-x-6 md:gap-y-10">
          {CENTRAL_MENU_CATEGORIES.map((c) => (
            <li key={c.name}>
              <Link
                to={c.href as any}
                aria-label={`Explore ${c.name} menu`}
                className="group block"
              >
                <div className="aspect-square w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-transparent transition-all duration-300 ease-out group-hover:shadow-xl group-hover:ring-primary relative">
                  <img
                    src={c.image}
                    alt={`${c.name} — Waffle House menu category`}
                    loading="lazy"
                    decoding="async"
                    width={900}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/75 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                    {c.itemCount} Items
                  </span>
                </div>
                <div className="mt-3 text-center">
                  <span className="block font-display text-sm font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-base">
                    {c.name}
                  </span>
                  <p className="mt-1 line-clamp-2 text-xs text-ink-soft hidden sm:block">
                    {c.shortDescription}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:underline">
                    View Menu <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 8. FEATURED MENU ITEMS CAROUSEL                                      */
/* ------------------------------------------------------------------ */

function FeaturedItemsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section aria-labelledby="featured-items-heading" className="border-t border-border/60 bg-surface py-14 md:py-16">
      <div className="container-editorial">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Editorial Selections</p>
          <h2 id="featured-items-heading" className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Popular Waffle House Menu Items
          </h2>
          <p className="mt-3 text-base text-ink-soft sm:text-lg">
            Explore a selection of familiar menu favorites from across the Waffle House menu.
          </p>
          <span className="mt-2 inline-block rounded-md bg-black/5 px-2.5 py-0.5 text-[11px] font-bold text-ink-soft">
            Featured Menu Items
          </span>
        </div>

        <div className="relative mt-10">
          <div
            ref={scrollerRef}
            className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {featuredMenuItems.map((item) => (
              <article
                key={item.name}
                className="group flex w-[280px] flex-none snap-start flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <Link
                  to={item.link as any}
                  className="block aspect-[4/3] w-full overflow-hidden bg-muted"
                  aria-label={`View menu item: ${item.name}`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-ink-soft">
                    {item.category}
                  </span>
                  <h3 className="mt-1 font-display text-base font-bold leading-tight text-foreground">
                    <Link to={item.link as any} className="hover:text-primary">
                      {item.name}
                    </Link>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs text-ink-soft leading-relaxed">
                    {item.description}
                  </p>
                  <dl className="mt-4 flex items-center justify-between text-xs font-semibold text-foreground border-t border-black/5 pt-3">
                    <div>
                      <dt className="inline text-ink-soft">Price: </dt>
                      <dd className="inline font-bold">{item.price}</dd>
                    </div>
                    <div>
                      <dt className="inline text-ink-soft">Calories: </dt>
                      <dd className="inline font-bold">{item.calories} cal</dd>
                    </div>
                  </dl>
                  <Link
                    to={item.link as any}
                    className="btn-primary mt-4 h-9 w-full justify-center text-xs font-semibold"
                  >
                    View Menu Item <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="absolute -left-3 top-[calc(50%-2rem)] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-md transition-all hover:border-primary hover:bg-primary hover:text-black"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="absolute -right-3 top-[calc(50%-2rem)] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-md transition-all hover:border-primary hover:bg-primary hover:text-black"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 9. MENU PRICES SECTION                                               */
/* ------------------------------------------------------------------ */

function MenuPricesSection() {
  return (
    <section aria-labelledby="prices-heading" className="border-t border-border/60 bg-background py-14 md:py-16">
      <div className="container-editorial max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Verified Pricing</p>
        <h2 id="prices-heading" className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Waffle House Menu Prices
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink-soft sm:text-lg">
          Browse menu prices across breakfast plates, waffles, hashbrowns, sandwiches, burgers, dinners, sides and beverages.
        </p>

        <div className="mt-8 rounded-2xl border border-black/10 bg-surface p-6 sm:p-8 text-left shadow-xs">
          <div className="flex items-start gap-3 text-amber-800 bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs sm:text-sm leading-relaxed">
            <AlertCircle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" aria-hidden />
            <div>
              <strong>Note on Menu Pricing:</strong> Menu prices and availability may vary by location and can change over time. Figures shown on this reference guide reflect verified U.S. counter averages.
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link to="/menu" className="btn-primary h-12 px-8 text-base font-semibold">
              View Full Menu &amp; Prices <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 10. NUTRITION & CALORIES SECTION                                     */
/* ------------------------------------------------------------------ */

function NutritionSection() {
  return (
    <section aria-labelledby="nutrition-heading" className="border-t border-border/60 bg-[#0F0F0F]">
      <div className="container-editorial py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Nutrition Data</p>
          <h2
            id="nutrition-heading"
            className="mt-3 font-display text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Waffle House Nutrition &amp; Calories
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            Compare calories and available nutrition information across menu items, including protein, carbohydrates, fat and sodium where available.
          </p>
        </div>

        {/* Quick Nutrition Guide Table */}
        <div className="mt-12 grid items-stretch gap-6 md:grid-cols-5 md:gap-8 max-w-5xl mx-auto">
          <div className="md:col-span-3 overflow-hidden rounded-2xl border border-white/10 bg-[#181818]">
            <div className="bg-[#222] px-6 py-3 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Quick Nutrition Guide</span>
              <span className="text-[10px] text-white/50">Average Per Plate</span>
            </div>
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="bg-primary/20 text-white">
                  <th scope="col" className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-primary">
                    Nutrient Field
                  </th>
                  <th scope="col" className="px-6 py-3.5 text-right text-[11px] font-bold uppercase tracking-widest text-primary">
                    Verified Average
                  </th>
                </tr>
              </thead>
              <tbody>
                {nutritionRows.map((r, i) => (
                  <tr
                    key={r.label}
                    className={
                      (i % 2 === 0 ? "bg-[#1E1E1E] " : "bg-[#181818] ") +
                      (i !== nutritionRows.length - 1 ? "border-b border-white/[0.06]" : "")
                    }
                  >
                    <th scope="row" className="px-6 py-3.5 text-left font-medium text-white/80">
                      {r.label}
                    </th>
                    <td className="px-6 py-3.5 text-right font-display font-bold text-primary">
                      {r.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:col-span-2 overflow-hidden rounded-2xl border border-white/10">
            <img
              src={nutritionChef}
              alt="A short-order chef plating a fresh Waffle House breakfast at the kitchen pass"
              loading="lazy"
              decoding="async"
              width={1408}
              height={1600}
              className="h-full min-h-[280px] w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/nutrition"
            className="btn-primary h-12 px-8 text-base font-semibold"
          >
            View Nutrition Information <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <a
            href="#dietary-guides"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 text-base font-semibold text-white hover:bg-white/20 transition-colors"
          >
            Browse Dietary Guides
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 11. DIETARY & MENU GUIDES SECTION                                    */
/* ------------------------------------------------------------------ */

function DietarySection() {
  const guides = [
    { title: "Lower-Calorie Options", desc: "Breakfast plates and side options under 500 calories including scrambled eggs, plain hashbrowns, and fruit.", href: "/nutrition" },
    { title: "High-Protein Options", desc: "Protein-rich meals featuring USDA Choice steaks, pork chops, grilled chicken, and egg platters.", href: "/nutrition" },
    { title: "Vegetarian Options", desc: "Meat-free menu items such as Classic Waffles, cheese omelets, hashbrowns, and buttered toast.", href: "/nutrition" },
    { title: "Allergen Information", desc: "Detailed breakdown of menu items containing gluten, dairy, egg, soy, peanut, and tree nuts.", href: "/nutrition" },
    { title: "Gluten-Free Information", desc: "Guide to gluten-free options like plain eggs, bacon, ham, steaks, and plain hashbrowns.", href: "/nutrition" },
  ];

  return (
    <section id="dietary-guides" aria-labelledby="dietary-heading" className="border-t border-border/60 bg-surface py-14 md:py-16">
      <div className="container-editorial max-w-5xl">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Dietary Information</p>
          <h2 id="dietary-heading" className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Dietary &amp; Menu Guides
          </h2>
          <p className="mt-3 text-base text-ink-soft sm:text-lg">
            Explore verified dietary categories to help choose menu options tailored to your nutritional needs.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {guides.map((g) => (
            <div key={g.title} className="rounded-2xl border border-black/10 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="h-1.5 w-10 rounded-full bg-primary mb-4" />
                <h3 className="font-display text-lg font-bold text-foreground">{g.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">{g.desc}</p>
              </div>
              <Link to={g.href as any} className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                Explore Guide <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed max-w-4xl mx-auto text-center">
          <strong>Allergen Disclaimer:</strong> We publish responsibly verified nutrition data. However, because food is prepared in shared commercial kitchens, cross-contact with allergens (such as wheat, eggs, soy, milk, and nuts) can occur. Always inform store staff of severe allergies before ordering.
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 12 & 13. RESTAURANT LOCATIONS & STATE DIRECTORY SECTION             */
/* ------------------------------------------------------------------ */

function RestaurantLocationsSection() {
  return (
    <section aria-labelledby="locations-heading" className="border-t border-border/60 bg-background py-16 md:py-20">
      <div className="container-editorial max-w-5xl">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Restaurant Reference</p>
          <h2 id="locations-heading" className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Waffle House Locations
          </h2>
          <p className="mt-3 text-base text-ink-soft sm:text-lg">
            Find Waffle House restaurants across the United States and browse location information by state and city.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/locations" className="btn-primary h-12 px-6 text-sm font-semibold">
              <MapPin className="h-4 w-4" aria-hidden /> Find a Waffle House Location
            </Link>
            <Link to="/locations" className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-white px-6 text-sm font-semibold text-foreground hover:bg-muted transition-colors">
              Browse All States
            </Link>
          </div>
        </div>

        {/* Location Images (#12) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="overflow-hidden rounded-2xl border border-black/10 shadow-sm bg-muted group">
            <img
              src={hero5}
              alt="Waffle House restaurant exterior in Georgia"
              loading="lazy"
              decoding="async"
              width={1200}
              height={800}
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="p-4 bg-white">
              <span className="text-xs font-bold text-foreground block">Waffle House Restaurant Exterior</span>
              <span className="text-xs text-ink-soft">24-hour diner locations serving fresh breakfast across the U.S.</span>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-black/10 shadow-sm bg-muted group">
            <img
              src={contactHeroDiner}
              alt="Waffle House diner dining room counter and kitchen"
              loading="lazy"
              decoding="async"
              width={1200}
              height={800}
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="p-4 bg-white">
              <span className="text-xs font-bold text-foreground block">Waffle House Diner Interior</span>
              <span className="text-xs text-ink-soft">Open kitchen counter seating and booth dining experience.</span>
            </div>
          </div>
        </div>

        {/* State Directory (#13) */}
        <div className="mt-14">
          <h3 className="font-display text-2xl font-bold text-foreground text-center">
            Waffle House Locations by State
          </h3>
          <p className="mt-2 text-xs text-ink-soft text-center">
            Browse verified store directories, operating hours, addresses, and map directions by state.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {stateList.map((s) => (
              <Link
                key={s.slug}
                to="/locations/$state"
                params={{ state: s.slug }}
                className="group flex flex-col justify-between rounded-xl border border-black/10 bg-white p-4 text-center shadow-2xs transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-sm"
              >
                <span className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {s.name}
                </span>
                <span className="mt-1 inline-flex items-center justify-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                  {s.count} Stores
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 14. ARTICLES / GUIDES SECTION                                        */
/* ------------------------------------------------------------------ */

function ArticlesSection() {
  return (
    <section aria-labelledby="articles-heading" className="border-t border-border/60 bg-surface py-14 md:py-16">
      <div className="container-editorial">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Helpful Articles</p>
          <h2 id="articles-heading" className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Waffle House Menu Guides
          </h2>
          <p className="mt-3 text-base text-ink-soft sm:text-lg">
            Read helpful guides covering menu prices, breakfast favorites, nutrition, calories, ordering information and other common menu questions.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.slice(0, 3).map((a) => (
            <article key={a.slug} className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md">
              <Link to="/menu" className="block aspect-[16/10] w-full overflow-hidden bg-muted">
                <img
                  src={a.image}
                  alt={a.title}
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={375}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{a.tag}</span>
                <h3 className="mt-1.5 font-display text-base font-bold leading-snug">
                  <Link to="/menu" className="hover:text-primary">{a.title}</Link>
                </h3>
                <p className="mt-2 line-clamp-2 text-xs text-ink-soft leading-relaxed">{a.summary}</p>
                <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3 text-[11px] text-ink-soft">
                  <span>Updated Aug 2026</span>
                  <Link to="/menu" className="font-bold text-foreground hover:text-primary inline-flex items-center gap-1">
                    Read Guide <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 15. FAQ SECTION                                                      */
/* ------------------------------------------------------------------ */

function HomeFaqSection() {
  return (
    <FaqSection
      eyebrow="Common Questions"
      heading="Waffle House Menu Questions"
      intro="Find clear, factual answers to common questions about Waffle House menu items, prices, calories, operating hours, and store locations."
      items={homeFaqs}
      bgClassName="bg-background border-t border-border/60"
    />
  );
}

/* ------------------------------------------------------------------ */
/* 16 & 17. ABOUT & METHODOLOGY SECTION                                 */
/* ------------------------------------------------------------------ */

function AboutAndMethodologySection() {
  return (
    <section aria-labelledby="about-heading" className="border-t border-border/60 bg-surface py-16 md:py-20">
      <div className="container-editorial max-w-4xl">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">About &amp; Editorial Process</p>
          <h2 id="about-heading" className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            About Waffle House
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Waffle House is an iconic American diner chain founded in 1955 in Avondale Estates, Georgia. Operating 24 hours a day, 365 days a year, Waffle House is known for its open-kitchen short-order dining, signature sweet cream waffles, farm-fresh egg breakfasts, and fully customized hashbrowns.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-black/10 bg-white p-8 md:p-10 shadow-xs">
          <h3 className="font-display text-2xl font-bold text-foreground text-center">
            How We Update This Waffle House Menu Guide
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft text-center max-w-2xl mx-auto">
            This independent guide organizes menu, pricing, nutrition and location information into an easy-to-browse reference. Information is reviewed and updated when reliable sources provide new or corrected details.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-black/5 bg-surface p-5">
              <ShieldCheck className="h-6 w-6 text-primary mb-2" aria-hidden />
              <h4 className="font-display font-bold text-sm text-foreground">Verified Information</h4>
              <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                Menu descriptions and calorie counts are reconciled against published nutrition data sheets and counter menus.
              </p>
            </div>
            <div className="rounded-xl border border-black/5 bg-surface p-5">
              <RefreshCw className="h-6 w-6 text-primary mb-2" aria-hidden />
              <h4 className="font-display font-bold text-sm text-foreground">Regular Updates</h4>
              <p className="mt-1 text-xs text-ink-soft leading-relaxed">
                Our editorial team periodically reviews menu listings to update pricing and nutritional details.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/methodology" className="btn-primary h-11 px-6 text-sm font-semibold">
              Read Our Methodology
            </Link>
            <Link to="/contact" className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-white px-6 text-sm font-semibold text-foreground hover:bg-muted transition-colors">
              Report a Correction
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 18. INDEPENDENT DISCLOSURE SECTION                                   */
/* ------------------------------------------------------------------ */

function IndependentDisclosureSection() {
  return (
    <section aria-label="Independent Site Disclosure" className="border-t border-border/60 bg-[#0B0C0E] py-8 text-white/70">
      <div className="container-editorial max-w-4xl text-center text-xs leading-relaxed">
        <p className="max-w-3xl mx-auto">
          This is an independent informational website and is not affiliated with, endorsed by or sponsored by Waffle House, Inc. Menu items, prices, nutrition information and availability may vary by location and change over time.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-primary">
          <Link to="/disclaimer" className="hover:underline">Disclaimer</Link>
          <Link to="/editorial-policy" className="hover:underline">Editorial Policy</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN HOMEPAGE COMPONENT                                              */
/* ------------------------------------------------------------------ */

function Home() {
  return (
    <>
      {/* 1. Header / Navigation (in root layout) */}
      
      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Key Menu Facts */}
      <KeyMenuFacts />

      {/* 4. Menu PDF / Quick Menu Resource */}
      <PdfMenuSection />

      {/* 5 & 6. Waffle House Menu at a Glance & Search */}
      <MenuAtAGlanceAndSearch />

      {/* 7. Explore the Waffle House Menu — KEEP CURRENT CATEGORY DESIGN */}
      <CategoryGridSection />

      {/* 8. Featured Menu Items */}
      <FeaturedItemsCarousel />

      {/* 9. Waffle House Menu Prices */}
      <MenuPricesSection />

      {/* 10. Waffle House Nutrition & Calories */}
      <NutritionSection />

      {/* 11. Dietary & Menu Guides */}
      <DietarySection />

      {/* 12 & 13. Waffle House Locations + Restaurant Images + States */}
      <RestaurantLocationsSection />

      {/* 14. Waffle House Menu Guides / Blog */}
      <ArticlesSection />

      {/* 15. FAQ */}
      <HomeFaqSection />

      {/* 16 & 17. About This Menu Guide & Methodology */}
      <AboutAndMethodologySection />

      {/* 18. Independent Disclosure */}
      <IndependentDisclosureSection />

      {/* Unified Subscriber Section */}
      <SubscriberSection idPrefix="home-sub" />
    </>
  );
}
