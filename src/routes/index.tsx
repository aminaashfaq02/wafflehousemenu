import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Search,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileText,
  Download,
  MapPin,
  ShieldCheck,
  RefreshCw,
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Utensils,
  BookOpen,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Centralized Menu Data & Dynamic Totals (Single Source of Truth)
import { CENTRAL_MENU_CATEGORIES, TOTAL_MENU_CATEGORIES, TOTAL_MENU_ITEMS } from "@/data/centralMenuData";
import { blogPosts } from "@/data/blogPosts";
import { locationsData } from "@/data/locations";

// Hero slides
import hero1 from "@/assets/hero-1-waffle.jpg";
import hero2 from "@/assets/hero-2-breakfast.jpg";
import hero3 from "@/assets/hero-3-hashbrowns.jpg";
import hero4 from "@/assets/hero-4-coffee.jpg";
import hero5 from "@/assets/hero-5-diner.jpg";
import hero6 from "@/assets/hero-6-kitchen.jpg";

// Section images
import nutritionChef from "@/assets/nutrition-chef.jpg";
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
import lowcalEggsImg from "@/assets/nutrition-lowcal-eggs.jpg";
import pecanWaffleImg from "@/assets/waffle-peanut-butter.jpg";
import chocolateWaffleImg from "@/assets/waffle-chocolate-chip.jpg";

import { SubscriberSection } from "@/components/SubscriberSection";

const SITE = "https://wafflehousemenu.com";

const homepageFaqs = [
  {
    q: "What is on the Waffle House menu?",
    a: "The Waffle House menu features classic American diner favorites including sweet cream waffles, farm-fresh egg breakfasts, scattered hashbrowns, Toddle House omelets, Texas melts, 100% Angus burgers, dinner steaks, sides, and bottomless coffee.",
  },
  {
    q: "How many menu categories are listed?",
    a: `Our reference guide organizes the menu into ${TOTAL_MENU_CATEGORIES} distinct categories covering breakfast plates, lunch, dinner, sides, and beverages.`,
  },
  {
    q: "How many menu items are listed?",
    a: `There are currently ${TOTAL_MENU_ITEMS} verified menu items organized with estimated prices, calorie counts, and nutrition details across all categories.`,
  },
  {
    q: "Does Waffle House serve breakfast all day?",
    a: "Yes. Waffle House serves its complete menu — including all waffles, egg plates, and hashbrowns — 24 hours a day, 7 days a week, 365 days a year.",
  },
  {
    q: "Where can I find Waffle House menu prices?",
    a: "You can find estimated menu prices on our main Menu page, price tables, and individual category reference pages. Prices may vary slightly by restaurant location.",
  },
  {
    q: "Where can I find nutrition information?",
    a: "Complete nutritional information, including calories, protein, fat, carbohydrates, and allergen warnings, is available on our dedicated Waffle House Nutrition page.",
  },
  {
    q: "Where can I find Waffle House locations?",
    a: "You can search over 2,100 restaurant locations across 25 states using our interactive Waffle House Locations directory.",
  },
  {
    q: "Where can I find the menu PDF?",
    a: "A printable PDF reference is accessible from our Menu PDF section and downloadable directly on this website for convenient offline viewing.",
  },
];

interface FeaturedRecipeItem {
  name: string;
  category: string;
  price: string;
  calories: number;
  description: string;
  image: string;
  link: string;
}

const featuredMenuItems: FeaturedRecipeItem[] = [
  {
    name: "All-Star Special™",
    category: "All-Star Special™",
    price: "$10.95",
    calories: 1180,
    description: "Two eggs cooked your way, hashbrowns or grits, toast, choice of bacon, sausage or ham, and a Classic Sweet Cream Waffle.",
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
    price: "$5.50",
    calories: 560,
    description: "Signature sweet cream waffle baked with toasted Georgia pecans inside the batter.",
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
    description: "Two farm-fresh eggs cooked your way, served with hashbrowns and warm buttered toast.",
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
    description: "Golden shredded potatoes griddled crisp, smothered with sautéed onions and melted American cheese.",
    image: hashbrownsImg,
    link: "/menu/hashbrowns",
  },
  {
    name: "Texas Angus Patty Melt",
    category: "Breakfast Sandwiches & Melts",
    price: "$9.95",
    calories: 790,
    description: "Grilled Angus beef patty with caramelized onions and melted American cheese on Texas toast.",
    image: pattyMeltImg,
    link: "/menu/breakfast-sandwiches",
  },
];

const heroSlides = [
  { src: hero1, alt: "Golden Belgian waffle with butter and warm maple syrup on a diner plate" },
  { src: hero2, alt: "Two sunny-side up eggs, crispy bacon, hashbrowns and a biscuit on a diner counter" },
  { src: hero3, alt: "Golden crispy hashbrowns steaming on a hot flat-top griddle" },
  { src: hero4, alt: "Steaming mug of coffee on a classic American diner counter" },
  { src: hero5, alt: "Waffle House restaurant exterior with iconic yellow sign" },
  { src: hero6, alt: "Short-order cook preparing breakfast plates on a flat-top grill" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Waffle House Menu & Prices 2026 | Complete Menu Guide" },
      {
        name: "description",
        content: `Explore the Waffle House menu with ${TOTAL_MENU_CATEGORIES} categories and ${TOTAL_MENU_ITEMS} verified menu items, plus prices, nutrition information, restaurant locations, menu guides and a printable menu reference.`,
      },
      { property: "og:title", content: "Waffle House Menu & Prices 2026 | Complete Menu Guide" },
      {
        property: "og:description",
        content: `Explore the Waffle House menu with ${TOTAL_MENU_CATEGORIES} categories and ${TOTAL_MENU_ITEMS} verified menu items, plus prices, nutrition information, restaurant locations, menu guides and a printable menu reference.`,
      },
      { property: "og:url", content: `${SITE}/` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Waffle House Menu Guide",
          url: `${SITE}/`,
          description: "Independent Waffle House menu reference guide covering prices, nutrition, calories, locations, and dining guides.",
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Waffle House Menu Categories",
          numberOfItems: TOTAL_MENU_CATEGORIES,
          itemListElement: CENTRAL_MENU_CATEGORIES.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            url: `${SITE}${c.href}`,
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homepageFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.a,
            },
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [slide, setSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="bg-white text-foreground">
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="relative min-h-[640px] md:min-h-[720px] flex items-center overflow-hidden bg-black text-white font-sans">
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === slide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={s.src}
              alt={s.alt}
              className="h-full w-full object-cover"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/75" />
          </div>
        ))}

        <div className="container-editorial relative z-10 py-24 md:py-32">
          <div className="max-w-3xl space-y-6">
            <span className="inline-block rounded-full bg-primary px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
              Independent Reference Guide
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
              Waffle House Menu &amp; Prices
            </h1>
            <p className="text-lg leading-relaxed text-white/85 max-w-2xl">
              Explore the Waffle House menu with category information, menu prices, nutrition details, restaurant locations and helpful guides in one easy-to-browse resource.
            </p>

            <div className="flex items-center gap-2 text-sm font-semibold text-amber-300 pt-1">
              <span>{TOTAL_MENU_CATEGORIES} Menu Categories</span>
              <span>•</span>
              <span>{TOTAL_MENU_ITEMS} Menu Items</span>
              <span>•</span>
              <span>24/7 Hours</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link to="/menu" className="btn-primary">
                View Full Menu <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="/waffle-house-menu-nutritionals.pdf"
                download
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <FileText className="h-4 w-4" /> View Menu PDF
              </a>
              <Link
                to="/nutrition"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-4 text-xs font-semibold text-white/90 hover:text-white hover:bg-white/10"
              >
                Nutrition Guide
              </Link>
              <Link
                to="/locations"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/20 px-4 text-xs font-semibold text-white/90 hover:text-white hover:bg-white/10"
              >
                Find Locations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. QUICK MENU FACTS                                          */}
      {/* ============================================================ */}
      <section aria-labelledby="glance-heading" className="bg-surface py-12 border-b border-border font-sans">
        <div className="container-editorial">
          <div className="max-w-2xl mb-8">
            <span className="chip">At a Glance</span>
            <h2 id="glance-heading" className="mt-2 font-display text-2xl font-bold sm:text-3xl text-foreground">
              Waffle House Menu at a Glance
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-2xl border border-border bg-white p-5 text-center shadow-xs">
              <span className="font-display text-3xl font-bold text-primary">{TOTAL_MENU_CATEGORIES}</span>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-foreground">Menu Categories</p>
              <p className="mt-1 text-xs text-ink-soft">Full diner directory</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 text-center shadow-xs">
              <span className="font-display text-3xl font-bold text-primary">{TOTAL_MENU_ITEMS}</span>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-foreground">Menu Items</p>
              <p className="mt-1 text-xs text-ink-soft">Dishes and sides</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 text-center shadow-xs">
              <span className="font-display text-3xl font-bold text-primary">Prices</span>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-foreground">Pricing Reference</p>
              <p className="mt-1 text-xs text-ink-soft">Counter averages</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 text-center shadow-xs">
              <span className="font-display text-3xl font-bold text-primary">Nutrition</span>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-foreground">Calories &amp; Macros</p>
              <p className="mt-1 text-xs text-ink-soft">Allergen information</p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-5 text-center shadow-xs">
              <span className="font-display text-3xl font-bold text-primary">PDF</span>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-foreground">Menu Reference</p>
              <p className="mt-1 text-xs text-ink-soft">Printable document</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. MENU CATEGORIES (EXPLORE THE WAFFLE HOUSE MENU)           */}
      {/* ============================================================ */}
      <section aria-labelledby="categories-heading" className="bg-white py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial">
          <div className="max-w-3xl space-y-3 mb-12">
            <span className="chip">Directory</span>
            <h2 id="categories-heading" className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Explore the Waffle House Menu
            </h2>
            <p className="text-base text-ink-soft leading-relaxed">
              Browse all 13 Waffle House menu categories, with {TOTAL_MENU_ITEMS} menu items organized for quick reference. Select a category to view dishes, estimated prices, and available nutrition details.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CENTRAL_MENU_CATEGORIES.map((c) => (
              <article
                key={c.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={c.image}
                    alt={`Waffle House ${c.name}`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute bottom-3 right-3 rounded-md bg-black/75 px-2 py-0.5 text-xs font-bold text-white backdrop-blur-xs">
                    {c.itemCount} Items
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-xs text-ink-soft line-clamp-2 leading-relaxed flex-1">
                    {c.shortDescription}
                  </p>
                  <Link
                    to={c.href as any}
                    className="mt-5 inline-flex w-fit items-center gap-1.5 border border-primary bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-primary transition hover:bg-primary hover:text-primary-foreground"
                  >
                    View Category <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. MENU PDF SECTION                                          */}
      {/* ============================================================ */}
      <section className="bg-[#0B0C0E] border-b border-white/10 text-white font-sans">
        <div className="container-editorial py-12 md:py-16">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-[#18191B] to-[#0B0C0E] border border-white/10 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 ring-1 ring-inset ring-amber-500/20">
                <FileText className="h-3.5 w-3.5" /> Printable Document
              </span>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Waffle House Menu PDF
              </h2>
              <p className="text-sm leading-relaxed text-white/75">
                Looking for a convenient printable menu reference? Explore the Waffle House menu PDF alongside the full HTML menu and category information on this website.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="/waffle-house-menu-nutritionals.pdf"
                download
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-black transition-all hover:bg-[#E2B000]"
              >
                <Download className="h-4 w-4" /> Download Menu PDF
              </a>
              <Link
                to="/menu"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white/10 px-6 text-sm font-semibold text-white border border-white/20 transition-all hover:bg-white/20"
              >
                View Full Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. FEATURED MENU ITEMS                                       */}
      {/* ============================================================ */}
      <section aria-labelledby="featured-heading" className="bg-white py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial">
          <div className="max-w-2xl mb-12">
            <span className="chip">Featured Dishes</span>
            <h2 id="featured-heading" className="mt-3 font-display text-3xl font-bold sm:text-4xl text-foreground">
              Featured Waffle House Menu Items
            </h2>
            <p className="mt-3 text-base text-ink-soft leading-relaxed">
              Explore a curated selection of dishes from across the Waffle House menu.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredMenuItems.map((item) => (
              <article
                key={item.name}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={`Waffle House ${item.name}`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{item.category}</span>
                  <h3 className="mt-1 font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    <Link to={item.link as any}>{item.name}</Link>
                  </h3>
                  <p className="mt-2 text-xs text-ink-soft line-clamp-2 leading-relaxed flex-1">{item.description}</p>
                  <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-semibold">
                    <span className="text-primary font-bold">{item.price}</span>
                    <span className="text-ink-soft">{item.calories} cal</span>
                  </div>
                  <Link
                    to={item.link as any}
                    className="mt-4 inline-flex items-center justify-center gap-1 border border-primary bg-white py-2 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    View Details <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. MENU PRICES INFORMATION                                   */}
      {/* ============================================================ */}
      <section className="bg-surface py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial max-w-4xl space-y-6 text-center">
          <span className="chip">Price Reference</span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
            Waffle House Menu Prices
          </h2>
          <p className="text-base text-ink-soft leading-relaxed max-w-2xl mx-auto">
            Menu prices can vary by restaurant location and may change over time. The prices displayed on this website should be treated as an informational reference. We encourage diners to confirm current local pricing directly with their restaurant.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link to="/menu" className="btn-primary">
              Explore Full Price Table <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-white px-5 text-sm font-semibold text-foreground hover:border-primary"
            >
              How Prices Are Sourced
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. NUTRITION & CALORIES                                      */}
      {/* ============================================================ */}
      <section className="bg-white py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-4xl space-y-6 text-center">
          <span className="chip">Nutrition Facts</span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
            Waffle House Nutrition &amp; Calories
          </h2>
          <p className="text-base text-ink-soft leading-relaxed max-w-2xl mx-auto">
            Explore complete calorie counts, macronutrient breakdowns, and kitchen allergen disclosures to help you compare menu choices and plan balanced meals.
          </p>
          <div className="pt-2">
            <Link
              to="/nutrition"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-xs hover:bg-[#E2B000]"
            >
              View Waffle House Nutrition <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. FEATURED GUIDES / BLOG                                    */}
      {/* ============================================================ */}
      <section className="bg-surface py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial">
          <div className="max-w-2xl mb-10">
            <span className="chip">Guides &amp; Articles</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl text-foreground">
              Waffle House Menu Guides
            </h2>
            <p className="mt-2 text-base text-ink-soft">
              Explore helpful guides covering menu prices, nutrition, breakfast choices, menu categories, locations and other Waffle House information.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 6).map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-xs transition hover:-translate-y-1 hover:shadow-md"
              >
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="block aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    width={800}
                    height={500}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary">{post.category}</span>
                  <h3 className="mt-2 font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    <Link to="/blog/$slug" params={{ slug: post.slug }}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-xs text-ink-soft line-clamp-2 flex-1 leading-relaxed">{post.summary}</p>
                  <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-ink-soft">
                    <span>{post.readMinutes} min read</span>
                    <Link to="/blog/$slug" params={{ slug: post.slug }} className="font-semibold text-primary hover:underline">
                      Read Guide →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              Browse All Menu Guides <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. RESTAURANT LOCATIONS & ATMOSPHERE                         */}
      {/* ============================================================ */}
      <section className="bg-white py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="chip">Restaurant Directory</span>
              <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground leading-tight">
                Find a Waffle House Near You
              </h2>
              <p className="text-base text-ink-soft leading-relaxed">
                With over 2,100 diner locations across 25 U.S. states, Waffle House is an American icon open 24 hours a day. Browse our comprehensive state and city directory for verified addresses, operating hours, phone numbers, and local menu availability.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {locationsData.slice(0, 6).map((s) => (
                  <Link
                    key={s.stateSlug}
                    to="/locations/$state"
                    params={{ state: s.stateSlug }}
                    className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-foreground hover:border-primary hover:text-primary"
                  >
                    {s.stateName}
                  </Link>
                ))}
              </div>
              <div className="pt-2">
                <Link to="/locations" className="btn-primary">
                  Find Waffle House Locations <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-2xl border border-border">
                <img
                  src={hero5}
                  alt="Waffle House restaurant exterior with iconic yellow sign"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="overflow-hidden rounded-2xl border border-border">
                <img
                  src={hero6}
                  alt="Short-order cook preparing breakfast on a flat-top griddle in an open diner kitchen"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. WAFFLE HOUSE HISTORY                                     */}
      {/* ============================================================ */}
      <section className="bg-surface py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-4xl space-y-8">
          <div>
            <span className="chip">History &amp; Heritage</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl text-foreground">
              About Waffle House
            </h2>
            <p className="mt-3 text-base text-ink-soft leading-relaxed">
              Founded on Labor Day in 1955 in Avondale Estates, Georgia, by Joe Rogers Sr. and Tom Forkner, Waffle House established a unique dining model combining short-order cooking speed with around-the-clock diner hospitality.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-2">
              <h3 className="font-display text-base font-bold text-foreground">1955 Founding</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Started as a 16-item neighborhood diner named after its most popular and profitable item: sweet cream waffles.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-2">
              <h3 className="font-display text-base font-bold text-foreground">24/7/365 Service</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Pioneered the always-open diner concept with open-kitchen flat-top grills and custom jukebox records.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-2">
              <h3 className="font-display text-base font-bold text-foreground">Waffle House Index</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Referenced informally by emergency management agencies as a metric for storm resilience and community recovery.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Link to="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              Read More About Waffle House History →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. FAQ                                                      */}
      {/* ============================================================ */}
      <section aria-labelledby="home-faq-heading" className="bg-white py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl">
          <div className="text-center mb-10 space-y-3">
            <span className="chip">FAQ</span>
            <h2 id="home-faq-heading" className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Waffle House Menu — Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {homepageFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-border rounded-2xl overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="flex w-full items-center justify-between p-6 text-left font-sans"
                  >
                    <span className="font-display text-base font-bold text-foreground">{faq.q}</span>
                    <span className="text-primary font-bold text-lg">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-ink-soft leading-relaxed border-t border-border/40 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 12. WEBSITE TRUST / INFORMATION                              */}
      {/* ============================================================ */}
      <section className="bg-surface py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl text-center space-y-4">
          <span className="chip">Independent Publication</span>
          <h2 className="font-display text-2xl font-bold sm:text-3xl text-foreground">
            About This Waffle House Menu Guide
          </h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            This website is an independent informational guide created to organize menu, pricing, nutrition, and location data into an easy-to-browse reference. We are not affiliated with, endorsed by, or sponsored by Waffle House, Inc.
          </p>
          <div className="pt-2 flex justify-center gap-6 text-xs font-bold uppercase tracking-wider text-primary">
            <Link to="/about" className="hover:underline">About This Website →</Link>
            <Link to="/methodology" className="hover:underline">How We Update Information →</Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <SubscriberSection idPrefix="home-sub" />
    </main>
  );
}
