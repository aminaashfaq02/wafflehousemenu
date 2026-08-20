import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Search,
  Clock,
  FileText,
  Download,
  MapPin,
  ShieldCheck,
  RefreshCw,
  Layers,
  CheckCircle2,
  Sparkles,
  Utensils,
  BookOpen,
  Coffee,
  HeartHandshake,
  ChevronRight,
  HelpCircle,
  ExternalLink,
  Flame,
  Award,
} from "lucide-react";
import { useEffect, useState } from "react";

// Centralized Menu Data & Dynamic Totals
import { CENTRAL_MENU_CATEGORIES, TOTAL_MENU_CATEGORIES, TOTAL_MENU_ITEMS } from "@/data/centralMenuData";
import { getAllBlogPosts } from "@/data/blogStore";
import { locationsData } from "@/data/locations";

// Hero slides
import hero1 from "@/assets/hero-1-waffle.jpg";
import hero2 from "@/assets/hero-2-breakfast.jpg";
import hero3 from "@/assets/hero-3-hashbrowns.jpg";
import hero4 from "@/assets/hero-4-coffee.jpg";
import hero5 from "@/assets/hero-5-diner.jpg";
import hero6 from "@/assets/hero-6-kitchen.jpg";

// Menu item & Dish images
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
import icedCoffeeImg from "@/assets/iced-coffee.jpg";

import { SubscriberSection } from "@/components/SubscriberSection";

const SITE = "https://wafflehousemenu.com";

const homepageFaqs = [
  {
    q: "What are Waffle House's typical hours of operation?",
    a: "Every Waffle House restaurant is open 24 hours a day, 7 days a week, 365 days a year. All menu items, including full breakfasts, sweet cream waffles, melts, and steaks, are available at all times.",
  },
  {
    q: "How much does a meal cost at Waffle House on average?",
    a: "Most single breakfast items and waffles cost between $4.50 and $7.50. Full combination platters like the All-Star Special™ or T-Bone Dinner range from $9.95 to $16.50.",
  },
  {
    q: "How many menu items and categories are listed on this guide?",
    a: `Our independent reference compiles ${TOTAL_MENU_CATEGORIES} distinct menu categories and ${TOTAL_MENU_ITEMS}+ individual verified dishes, sides, and beverage variations.`,
  },
  {
    q: "Does Waffle House publish nutritional values and calorie counts?",
    a: "Yes. Complete calorie counts, macronutrients, and allergen disclosures are documented in our Nutrition guide and compiled in the downloadable 11-page Waffle House Nutrition PDF.",
  },
  {
    q: "How many Waffle House locations are there in the United States?",
    a: "There are over 1,900+ Waffle House diners across 25 U.S. states, with the highest concentrations in Georgia, North Carolina, Florida, South Carolina, and Alabama.",
  },
  {
    q: "Where can I download the printable Waffle House menu PDF?",
    a: "You can download the full, official 11-page printable Waffle House nutritional and menu reference PDF directly via the download buttons located on this page.",
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
    name: "Texas Angus Patty Melt",
    category: "Texas Melts",
    price: "$9.95",
    calories: 790,
    description: "Grilled Angus beef patty with caramelized onions and melted American cheese on Texas toast.",
    image: pattyMeltImg,
    link: "/menu/texas-melts",
  },
  {
    name: "Hashbrowns Scattered, Smothered & Covered",
    category: "Hashbrowns",
    price: "$5.25",
    calories: 520,
    description: "Golden shredded potatoes griddled crisp with sautéed onions and melted American cheese.",
    image: hashbrownsImg,
    link: "/menu/hashbrowns",
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
];

const topCitiesData = [
  { rank: 1, city: "Atlanta", state: "Georgia", count: 35, stateSlug: "georgia" },
  { rank: 2, city: "Charlotte", state: "North Carolina", count: 22, stateSlug: "north-carolina" },
  { rank: 3, city: "Dallas / Fort Worth", state: "Texas", count: 19, stateSlug: "texas" },
  { rank: 4, city: "Nashville", state: "Tennessee", count: 18, stateSlug: "tennessee" },
  { rank: 5, city: "Orlando", state: "Florida", count: 16, stateSlug: "florida" },
  { rank: 6, city: "Birmingham", state: "Alabama", count: 15, stateSlug: "alabama" },
  { rank: 7, city: "Columbus", state: "Ohio", count: 14, stateSlug: "ohio" },
  { rank: 8, city: "Memphis", state: "Tennessee", count: 12, stateSlug: "tennessee" },
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
      { title: "Waffle House Menu & Prices 2026 | Complete Diner Guide" },
      {
        name: "description",
        content: `Explore the full Waffle House menu with current prices, calorie counts, nutrition facts, 1,900+ restaurant locations across 25 states, and printable PDF guide.`,
      },
      { property: "og:title", content: "Waffle House Menu & Prices 2026 | Complete Diner Guide" },
      {
        property: "og:description",
        content: `Explore the full Waffle House menu with current prices, calorie counts, nutrition facts, 1,900+ restaurant locations across 25 states, and printable PDF guide.`,
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
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const tabRecipes = [
    {
      tabLabel: "Breakfast Favorites",
      items: [
        { name: "All-Star Special™", price: "$10.95", cal: "1,180 cal", image: allStarImg, link: "/menu/all-star-special" },
        { name: "Classic Sweet Cream Waffle", price: "$4.55", cal: "410 cal", image: wafflesImg, link: "/menu/waffles" },
        { name: "Cheese 'N Eggs Plate", price: "$6.85", cal: "410 cal", image: lowcalEggsImg, link: "/menu/breakfast" },
        { name: "Sausage, Egg & Cheese Bowl", price: "$9.20", cal: "920 cal", image: hashbrownsImg, link: "/menu/hashbrown-bowls" },
      ]
    },
    {
      tabLabel: "Diner Classics",
      items: [
        { name: "Texas Angus Patty Melt", price: "$9.95", cal: "790 cal", image: pattyMeltImg, link: "/menu/texas-melts" },
        { name: "Double Angus Cheeseburger", price: "$8.90", cal: "890 cal", image: burgerImg, link: "/menu/burgers" },
        { name: "T-Bone Steak Dinner", price: "$16.50", cal: "1,230 cal", image: tboneImg, link: "/menu/classic-dinners" },
        { name: "Hashbrowns All-The-Way", price: "$6.25", cal: "570 cal", image: hashbrownsImg, link: "/menu/hashbrowns" },
      ]
    },
    {
      tabLabel: "Sweet Treats & Drinks",
      items: [
        { name: "Pecan Sweet Cream Waffle", price: "$5.50", cal: "560 cal", image: pecanWaffleImg, link: "/menu/waffles" },
        { name: "Chocolate Chip Waffle", price: "$5.25", cal: "520 cal", image: chocolateWaffleImg, link: "/menu/waffles" },
        { name: "Southern Pecan Pie Slice", price: "$4.25", cal: "520 cal", image: icedCoffeeImg, link: "/menu/sides" },
        { name: "Alice's Bottomless Coffee", price: "$2.75", cal: "5 cal", image: icedCoffeeImg, link: "/menu/beverages" },
      ]
    }
  ];

  useEffect(() => {
    const t = setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const posts = getAllBlogPosts();
  const featuredPost = posts[0];
  const sidePosts = posts.slice(1, 5);

  return (
    <main className="bg-white text-foreground font-sans">
      {/* ============================================================ */}
      {/* 1. HERO SECTION (PRESERVED AS REQUESTED)                     */}
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/75" />
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
              Explore the complete Waffle House menu with {TOTAL_MENU_CATEGORIES} categories and {TOTAL_MENU_ITEMS} verified menu items, covering 125+ recipes. View all items on our <Link to="/menu" className="text-primary hover:underline font-semibold">all menu page</Link> or download the official <a href="/waffle-house-menu-nutritionals.pdf" download className="text-primary hover:underline font-semibold">nutrition PDF reference</a>. We also list reference prices, allergen information, restaurant locations and helpful diner guides.
            </p>

            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-amber-300 pt-1">
              <span>{TOTAL_MENU_CATEGORIES} Menu Categories</span>
              <span>•</span>
              <span>{TOTAL_MENU_ITEMS} Verified Items</span>
              <span>•</span>
              <span>125+ Recipes</span>
              <span>•</span>
              <span>24/7 Hours</span>
              <span>•</span>
              <span>1,900+ Locations</span>
            </div>

            {/* Hero Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link to="/menu" className="btn-primary">
                Explore Menu <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/nutrition"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Nutrition Information
              </Link>
              <a
                href="/waffle-house-menu-nutritionals.pdf"
                download
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                <Download className="h-4 w-4 text-primary" /> Download Menu PDF
              </a>
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
      {/* 2. MENU REFERENCE SUMMARY BAR (FACTS OVERVIEW)               */}
      {/* ============================================================ */}
      <section aria-label="Menu Reference Summary" className="bg-[#0B0C0E] border-b border-white/10 py-8 text-white font-sans">
        <div className="container-editorial">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <Link
              to="/menu"
              className="group rounded-2xl bg-white/[0.04] border border-white/10 p-5 transition-all hover:bg-white/[0.08] hover:border-primary/50"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Total Menu Items</span>
              <p className="font-display text-2xl sm:text-3xl font-black text-white mt-1 group-hover:text-primary transition-colors">
                125+ Dishes →
              </p>
              <p className="text-xs text-white/60 mt-1">Across 13 core categories</p>
            </Link>

            <Link
              to="/deals"
              className="group rounded-2xl bg-white/[0.04] border border-white/10 p-5 transition-all hover:bg-white/[0.08] hover:border-primary/50"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Price Band</span>
              <p className="font-display text-2xl sm:text-3xl font-black text-white mt-1 group-hover:text-primary transition-colors">
                $2.50 – $16.50 →
              </p>
              <p className="text-xs text-white/60 mt-1">Value sides to T-Bone platters</p>
            </Link>

            <Link
              to="/locations"
              className="group rounded-2xl bg-white/[0.04] border border-white/10 p-5 transition-all hover:bg-white/[0.08] hover:border-primary/50"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Active Diners</span>
              <p className="font-display text-2xl sm:text-3xl font-black text-white mt-1 group-hover:text-primary transition-colors">
                1,900+ Outlets →
              </p>
              <p className="text-xs text-white/60 mt-1">Across 25 southern &amp; midwest states</p>
            </Link>

            <Link
              to="/menu/waffles"
              className="group rounded-2xl bg-white/[0.04] border border-white/10 p-5 transition-all hover:bg-white/[0.08] hover:border-primary/50"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Sweet Cream Batters</span>
              <p className="font-display text-2xl sm:text-3xl font-black text-white mt-1 group-hover:text-primary transition-colors">
                5 Waffles →
              </p>
              <p className="text-xs text-white/60 mt-1">Classic, Pecan, Choc Chip &amp; more</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. MENU CATEGORIES (SQUARE IMAGES, 5 PER LINE ON DESKTOP)   */}
      {/* ============================================================ */}
      <section aria-labelledby="categories-heading" className="bg-white py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="chip">Browse by Category</span>
              <h2 id="categories-heading" className="font-display text-3xl font-bold sm:text-4xl text-foreground mt-2">
                Explore the Waffle House Menu
              </h2>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline shrink-0"
            >
              All {TOTAL_MENU_CATEGORIES} categories →
            </Link>
          </div>

          {/* 5 columns on desktop grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {CENTRAL_MENU_CATEGORIES.map((c) => (
              <Link
                key={c.id}
                to={c.href as any}
                className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Square Food Image */}
                <div className="aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-xs transition-shadow group-hover:shadow-md group-hover:border-primary">
                  <img
                    src={c.image}
                    alt={`Waffle House ${c.name}`}
                    loading="lazy"
                    width={400}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {/* Underneath: Category Name Only */}
                <h3 className="mt-2.5 font-display text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug px-1">
                  {c.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. POPULAR GUIDES, EDITORIAL & CATEGORY RECIPES TABLE        */}
      {/* ============================================================ */}
      <section aria-labelledby="guides-analysis-heading" className="bg-surface py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="chip">Guides &amp; Analysis</span>
              <h2 id="guides-analysis-heading" className="font-display text-3xl font-bold sm:text-4xl text-foreground mt-2">
                Popular Guides &amp; Price Analysis
              </h2>
              <p className="text-sm text-ink-soft mt-1 max-w-xl">
                Independent price breakdowns, waffle flavor rankings, secret menu hacks, and diner insights updated continuously.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold text-primary">
              <Link to="/blog" className="hover:underline">View all guides →</Link>
              <Link to="/updates" className="hover:underline">Site updates →</Link>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 items-start">
            {/* Left Side: Article Section with Square Responsive Images */}
            <div className="lg:col-span-6 space-y-6">
              {featuredPost && (
                <article className="rounded-2xl border border-border bg-white p-6 shadow-xs transition-all hover:shadow-md">
                  <div className="flex flex-col sm:flex-row gap-5 items-start">
                    <div className="w-full sm:w-36 h-36 aspect-square rounded-xl overflow-hidden bg-muted shrink-0 border border-border">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                          {featuredPost.category}
                        </span>
                        <span className="text-[11px] text-ink-soft">{featuredPost.readMinutes} min read</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground hover:text-primary transition-colors leading-snug">
                        <Link to="/blog/$slug" params={{ slug: featuredPost.slug }}>
                          {featuredPost.title}
                        </Link>
                      </h3>
                      <p className="text-xs text-ink-soft leading-relaxed line-clamp-2">
                        {featuredPost.summary}
                      </p>
                      <div className="pt-2">
                        <Link
                          to="/blog/$slug"
                          params={{ slug: featuredPost.slug }}
                          className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                        >
                          Read full guide →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {/* Secondary Articles with Square Thumbnails */}
              <div className="space-y-4">
                {sidePosts.map((post) => (
                  <article
                    key={post.slug}
                    className="flex items-center gap-4 rounded-xl border border-border bg-white p-3.5 shadow-2xs hover:border-primary transition-colors"
                  >
                    <div className="h-16 w-16 aspect-square rounded-lg overflow-hidden bg-muted shrink-0 border border-border">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        width={120}
                        height={120}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-primary uppercase">
                        <span>{post.category}</span>
                        <span className="text-ink-soft">• {post.readMinutes} min</span>
                      </div>
                      <h4 className="font-display text-sm font-bold text-foreground truncate hover:text-primary transition-colors mt-0.5">
                        <Link to="/blog/$slug" params={{ slug: post.slug }}>
                          {post.title}
                        </Link>
                      </h4>
                      <p className="text-[11px] text-ink-soft truncate mt-0.5">
                        {post.summary}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Right Side: Category-Wise Recipes Count Table */}
            <div className="lg:col-span-6 space-y-4">
              <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-xs">
                <div className="bg-primary px-6 py-3.5 flex items-center justify-between border-b border-black/10">
                  <h3 className="font-display text-sm font-bold text-black uppercase tracking-wider">
                    Category-Wise Recipes &amp; Variations
                  </h3>
                  <span className="text-[11px] font-bold text-black/80">125+ Items</span>
                </div>
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-black/[0.04]">
                    {[
                      { cat: "Breakfast All-Star Special™ (Combos & Options)", count: "~15 items / variations" },
                      { cat: "Waffles (Classic, Pecan, Choc Chip, Peanut Butter, Blueberry)", count: "5 items" },
                      { cat: "Egg Breakfasts & Steak Platters (2-Egg, Cheese 'n Eggs, T-Bone, Sirloin)", count: "9 items" },
                      { cat: "Toddle House® Omelets (Cheese, Ham, Cheesesteak, Fiesta, Custom)", count: "5 items" },
                      { cat: "Breakfast Sandwiches & Melts (Egg, Sausage, Bacon, Ham options)", count: "19 items" },
                      { cat: "Texas Melts (Lunch/Dinner: Chicken, Cheesesteak, Patty Melt)", count: "4 items" },
                      { cat: "Biscuits (Plain, Gravy, Chicken, Sausage, Bacon, Ham)", count: "11 items" },
                      { cat: "Hashbrowns & Toppings (Regular, Large, Triple + 8 classic toppings)", count: "13 items" },
                      { cat: "Hashbrown & Grits Bowls (Sausage, Bacon, Ham, Chicken, Cheesesteak)", count: "10 items" },
                      { cat: "100% Angus Beef Burgers & Dinner Platters (Hamburgers, Dinners)", count: "11 items" },
                      { cat: "Classic Sandwiches (Grilled Cheese, BLT, Chicken Sandwich)", count: "7 items" },
                      { cat: "Sides, Pies & Desserts (Pecan/Chocolate Pie, Chili, Bacon/Sausage sides)", count: "14 items" },
                      { cat: "Beverages (Coffee, Dark Roast, Sweet Tea, Juices, Sodas, Milk)", count: "21 items" },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-muted/30 transition-colors">
                        <td className="px-5 py-2.5 text-left font-medium text-foreground">{row.cat}</td>
                        <td className="px-5 py-2.5 text-right font-display font-bold text-amber-700">{row.count}</td>
                      </tr>
                    ))}
                    <tr className="bg-primary/5 font-semibold">
                      <td className="px-5 py-3 text-left text-foreground">Main Unique Food Dishes</td>
                      <td className="px-5 py-3 text-right text-foreground font-display">~70 to 80 core recipes</td>
                    </tr>
                    <tr className="bg-primary/10 font-bold border-t border-black/10">
                      <td className="px-5 py-3 text-left text-foreground">Complete Menu (with Sides &amp; Drinks)</td>
                      <td className="px-5 py-3 text-right text-primary-foreground bg-primary font-display font-bold">~125 total recipes/items</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. EXPLORE POPULAR DISHES (PINCH OF YUM 3-BUTTON ATTACHED)   */}
      {/* ============================================================ */}
      <section className="bg-white py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial">
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
            <span className="chip">Recipe Gallery</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Explore Popular Dishes
            </h2>
            <p className="text-sm text-ink-soft">
              Widely ordered diner favorites prepared fresh to order across all 1,900+ locations.
            </p>
          </div>

          {/* 3 Buttons Attached & Centered above cards */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-2xl overflow-hidden border-2 border-primary bg-white shadow-sm p-1 gap-1">
              {tabRecipes.map((tab, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`rounded-xl px-4 sm:px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      isActive
                        ? "bg-primary text-black shadow-xs font-black"
                        : "bg-transparent text-foreground/80 hover:bg-muted"
                    }`}
                  >
                    {tab.tabLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4 Cards Grid with Square Food Photos */}
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
            {tabRecipes[activeTab].items.map((item, idx) => (
              <Link
                key={idx}
                to={item.link as any}
                className="group flex flex-col rounded-2xl border border-border bg-white p-3 shadow-xs hover:border-primary hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    loading="lazy"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="mt-3 flex-1 flex flex-col justify-between">
                  <h3 className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <div className="mt-2 flex items-center justify-between text-xs font-bold pt-2 border-t border-border/50">
                    <span className="text-primary font-black">{item.price}</span>
                    <span className="text-ink-soft text-[11px]">{item.cal}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. THE READING ROOM (CURATED GUIDES & REFERENCES)            */}
      {/* ============================================================ */}
      <section aria-labelledby="reading-room-heading" className="bg-surface py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="chip">The Reading Room</span>
              <h2 id="reading-room-heading" className="font-display text-3xl font-bold sm:text-4xl text-foreground mt-2">
                Guides, Deep-Dives and References
              </h2>
            </div>
            <Link to="/faq" className="text-sm font-bold text-primary hover:underline">
              All FAQs →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { tag: "Diet Guide", title: "Vegetarian at Waffle House", desc: "Every meat-free waffle, egg plate, and customized hashbrowns combo.", href: "/dietary" },
              { tag: "Diet Guide", title: "Gluten-Free & Allergens", desc: "Which dishes are safe when navigating wheat, dairy, eggs, or nut allergies.", href: "/allergens" },
              { tag: "Diet Guide", title: "Low-Calorie Under 500 Cal", desc: "Lighter breakfast bowls and plain grits ranked by real published calories.", href: "/dietary" },
              { tag: "Diet Guide", title: "High-Protein Breakfasts", desc: "Steak and eggs, chicken platters, and 3-egg omelet macros compared.", href: "/dietary" },
              { tag: "Reference", title: "Official Nutrition Guide", desc: "Calories, fat, sodium, and protein for all verified menu items.", href: "/nutrition" },
              { tag: "Editorial", title: "How This Guide Is Built", desc: "Data verification sources, diner visits, and price update cadence.", href: "/methodology" },
              { tag: "Plan a Visit", title: "Catering & Party Trays", desc: "Hashbrown bar setups, party pan pricing, and food truck booking.", href: "/catering" },
              { tag: "Plan a Visit", title: "Gift Cards & Balance Check", desc: "How to check balances, CARD Act consumer rules, and tipping guidelines.", href: "/gift-cards" },
            ].map((card, i) => (
              <Link
                key={i}
                to={card.href as any}
                className="group rounded-2xl border border-border bg-white p-5 shadow-2xs hover:border-primary hover:shadow-sm transition-all"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  {card.tag}
                </span>
                <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors mt-1 leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs text-ink-soft mt-2 leading-relaxed">
                  {card.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-primary mt-4 group-hover:underline">
                  Read guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. WAFFLE HOUSE LOCATIONS & CITY DIRECTORY                   */}
      {/* ============================================================ */}
      <section aria-labelledby="locations-heading" className="bg-white py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="chip">Locations Hub</span>
              <h2 id="locations-heading" className="font-display text-3xl font-bold sm:text-4xl text-foreground mt-2">
                Find a Waffle House Restaurant
              </h2>
              <p className="text-sm text-ink-soft mt-1">
                Over 1,900+ diners operating 24 hours a day across 25 U.S. states.
              </p>
            </div>
            <Link to="/locations" className="text-sm font-bold text-primary hover:underline">
              All 25 States Directory →
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 items-start">
            {/* Left: Top States Grid */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { state: "Georgia", count: "430+ diners", slug: "georgia" },
                  { state: "North Carolina", count: "180+ diners", slug: "north-carolina" },
                  { state: "South Carolina", count: "170+ diners", slug: "south-carolina" },
                  { state: "Florida", count: "165+ diners", slug: "florida" },
                  { state: "Alabama", count: "150+ diners", slug: "alabama" },
                  { state: "Tennessee", count: "130+ diners", slug: "tennessee" },
                  { state: "Texas", count: "120+ diners", slug: "texas" },
                  { state: "Ohio", count: "80+ diners", slug: "ohio" },
                  { state: "Virginia", count: "65+ diners", slug: "virginia" },
                ].map((st) => (
                  <Link
                    key={st.slug}
                    to="/locations/$state"
                    params={{ state: st.slug }}
                    className="group rounded-xl border border-border bg-surface p-3.5 hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <h4 className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {st.state}
                    </h4>
                    <p className="text-[11px] text-ink-soft mt-0.5">{st.count}</p>
                  </Link>
                ))}
              </div>

              {/* 24/7 FEMA Index Feature Box */}
              <div className="rounded-2xl border border-primary/40 bg-primary/5 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800">
                    <ShieldCheck className="h-4 w-4 text-primary" /> Always Open 24/7/365
                  </span>
                  <h4 className="font-display text-base font-bold text-foreground">
                    The FEMA Waffle House Index
                  </h4>
                  <p className="text-xs text-ink-soft leading-relaxed max-w-md">
                    Emergency management officials monitor Waffle House operations to measure storm recovery and community resilience.
                  </p>
                </div>
                <Link to="/locations" className="btn-primary py-2 px-4 text-xs font-bold shrink-0">
                  Find Nearest Diner →
                </Link>
              </div>
            </div>

            {/* Right: Top Cities Table */}
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-xs">
                <div className="bg-[#0B0C0E] text-white px-5 py-3 flex items-center justify-between">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-amber-400">
                    Top Cities by Restaurant Count
                  </h3>
                  <Link to="/locations" className="text-[10px] text-white/70 hover:text-white">
                    View all 600+ cities →
                  </Link>
                </div>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-surface border-b border-border text-ink-soft font-bold text-[10px] uppercase">
                      <th className="px-4 py-2 text-left">#</th>
                      <th className="px-4 py-2 text-left">City</th>
                      <th className="px-4 py-2 text-left">State</th>
                      <th className="px-4 py-2 text-right">Diners</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04]">
                    {topCitiesData.map((row) => (
                      <tr key={row.rank} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-2 font-bold text-ink-soft">{row.rank}</td>
                        <td className="px-4 py-2 font-bold text-foreground">{row.city}</td>
                        <td className="px-4 py-2 text-primary font-medium">
                          <Link to="/locations/$state" params={{ state: row.stateSlug }} className="hover:underline">
                            {row.state}
                          </Link>
                        </td>
                        <td className="px-4 py-2 text-right font-display font-bold text-foreground">
                          {row.count}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. OPENING HOURS (24/7/365 ROUND-THE-CLOCK SCHEDULE)        */}
      {/* ============================================================ */}
      <section aria-label="Operating Hours" className="bg-surface py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial max-w-4xl space-y-6">
          <div>
            <span className="chip">Operating Schedule</span>
            <h2 className="font-display text-2xl font-bold sm:text-3xl text-foreground mt-2">
              Round-the-Clock Diner Hours: 24/7/365
            </h2>
            <p className="text-sm text-ink-soft mt-1">
              Waffle House locations maintain open kitchen flat-top cooking 24 hours a day with zero closure windows.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { time: "Morning", hours: "6:00 AM – 12:00 PM", status: "Full Breakfast & Waffles" },
              { time: "Afternoon", hours: "12:00 PM – 6:00 PM", status: "Lunch Favorites & Melts" },
              { time: "Evening", hours: "6:00 PM – 12:00 AM", status: "Dinners, Steaks & Chops" },
              { time: "Overnight", hours: "12:00 AM – 6:00 AM", status: "Late-Night Short Order" },
            ].map((slot, i) => (
              <div key={i} className="rounded-2xl border border-border bg-white p-4 text-center shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{slot.time}</span>
                <p className="font-display text-sm font-bold text-foreground mt-1">{slot.hours}</p>
                <span className="inline-block mt-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 text-[10px] font-bold">
                  Open · {slot.status}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-ink-soft">
              Planning your visit? Weekend breakfast rush peaks between 8:30 AM and 11:30 AM.
            </p>
            <Link to="/locations" className="text-xs font-bold text-primary hover:underline shrink-0">
              Confirm your restaurant's hours →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. PRINTABLE MENU PDF DOWNLOAD SECTION                       */}
      {/* ============================================================ */}
      <section className="bg-[#0B0C0E] border-b border-white/10 text-white font-sans">
        <div className="container-editorial py-12 md:py-16">
          <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-[#18191B] to-[#0B0C0E] border border-white/10 p-8 md:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left max-w-lg">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 ring-1 ring-inset ring-amber-500/20">
                <FileText className="h-3.5 w-3.5" /> Printable 11-Page Reference Document
              </span>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Download Waffle House Menu PDF
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-white/75">
                Download the complete 11-page Waffle House menu and nutritional panel with all calories, fat, sodium, carbs, protein, and kitchen allergens.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <a
                href="/waffle-house-menu-nutritionals.pdf"
                download="waffle-house-menu-nutritionals.pdf"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-xs sm:text-sm font-bold text-black transition-all hover:bg-[#E2B000]"
              >
                <Download className="h-4 w-4" /> Download Menu PDF (37 KB)
              </a>
              <Link
                to="/menu"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white/10 px-6 text-xs sm:text-sm font-semibold text-white border border-white/20 transition-all hover:bg-white/20"
              >
                Browse Full Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. FAQ ACCORDION (QUICK ANSWERS)                            */}
      {/* ============================================================ */}
      <section aria-labelledby="home-faq-heading" className="bg-white py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl">
          <div className="text-center mb-10 space-y-2">
            <span className="chip">Quick Answers</span>
            <h2 id="home-faq-heading" className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Frequently Asked, Briefly Answered
            </h2>
          </div>
          <div className="space-y-3">
            {homepageFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-border rounded-2xl overflow-hidden bg-white shadow-2xs">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="flex w-full items-center justify-between p-5 sm:p-6 text-left font-sans"
                  >
                    <span className="font-display text-base font-bold text-foreground">{faq.q}</span>
                    <span className="text-primary font-black text-xl">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-ink-soft leading-relaxed border-t border-border/40 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link to="/faq" className="text-xs font-bold text-primary hover:underline">
              Read the full FAQ directory →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. SUBSCRIBER NEWSLETTER BOX                                */}
      {/* ============================================================ */}
      <SubscriberSection idPrefix="home-sub" />
    </main>
  );
}
