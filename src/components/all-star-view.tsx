import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { AuthorBio } from "@/components/author-bio";
import {
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Clock,
  Play,
  HelpCircle,
  Utensils,
  Flame,
} from "lucide-react";

import { articles } from "@/data/articles";
import { itemsByCategory } from "@/data/menu";
import allStarImg from "@/assets/all-star-breakfast.jpg";
import introImg from "@/assets/allstar-intro.jpg";
import tboneImg from "@/assets/tbone-steak.jpg";
import wafflesImg from "@/assets/hero-waffles.jpg";
import menuHighlightBreakfastImg from "@/assets/menu-highlight-breakfast.jpg";
import menuHighlightComboImg from "@/assets/menu-highlight-combo.jpg";
import gal1 from "@/assets/cat-egg-breakfasts.jpg";
import gal2 from "@/assets/cat-biscuits.jpg";
import gal3 from "@/assets/cat-breakfast-bowl.jpg";
import gal4 from "@/assets/cat-hashbrowns.jpg";
import gal5 from "@/assets/cat-omelets.jpg";
import gal6 from "@/assets/cat-texas-melt.jpg";
import gal7 from "@/assets/hero-2-breakfast.jpg";
import gal8 from "@/assets/hero-3-hashbrowns.jpg";
import gal9 from "@/assets/nutrition-lowcal-eggs.jpg";
import gal10 from "@/assets/article-breakfast-plates.jpg";
import subscribeBgImg from "@/assets/about-subscribe-bg.jpg";
import { SubscriberSection } from "@/components/SubscriberSection";
import { FaqSection } from "@/components/FaqSection";

export interface Variant {
  slug: string;
  name: string;
  description: string;
  price: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  rating: number;
  image: string;
  category?: string;
}

export interface OfficialRecipeComponent {
  id: number;
  name: string;
  priceNote: string;
  calories: number;
  fat: string;
  satFat: string;
  transFat: string;
  cholesterol: string;
  sodium: string;
  carbs: string;
  fiber: string;
  sugars: string;
  protein: string;
  allergens: string;
  prep: string;
  imageDesc: string;
  image: string;
}

export const OFFICIAL_ALL_STAR_RECIPES: OfficialRecipeComponent[] = [
  {
    id: 1,
    name: "2 Eggs - Scrambled",
    priceNote: "Included in All-Star Special combo",
    calories: 180,
    fat: "14 g",
    satFat: "4 g",
    transFat: "1 g",
    cholesterol: "338 mg",
    sodium: "176 mg",
    carbs: "2 g",
    fiber: "0 g",
    sugars: "2 g",
    protein: "12 g",
    allergens: "Egg, Soy",
    prep: "Two whole farm-fresh eggs cracked directly onto a medium-heat flat-top grill, whisked quickly with liquid soybean oil, and cooked until soft, fluffy, and fully set.",
    imageDesc: "A clean white oval plate holding a soft, bright-yellow pile of scrambled eggs with a glossy finish and visible fluffy folds.",
    image: gal9,
  },
  {
    id: 2,
    name: "Classic Waffle",
    priceNote: "Included in All-Star Special combo",
    calories: 410,
    fat: "18 g",
    satFat: "10 g",
    transFat: "0 g",
    cholesterol: "50 mg",
    sodium: "870 mg",
    carbs: "55 g",
    fiber: "2 g",
    sugars: "15 g",
    protein: "8 g",
    allergens: "Egg, Milk, Soy, Tree Nuts, Wheat",
    prep: "Sweet cream waffle batter poured into a preheated commercial waffle iron, baked for 2.5 minutes until golden brown, and served hot with a dollop of whipped butter.",
    imageDesc: "A round, deep-grid golden-brown waffle served on a plate, topped with a square scoop of melting butter right in the center and light syrup glisten in the pockets.",
    image: wafflesImg,
  },
  {
    id: 3,
    name: "White Toast (2 Slices)",
    priceNote: "Bread Choice Option",
    calories: 130,
    fat: "2 g",
    satFat: "0 g",
    transFat: "0 g",
    cholesterol: "0 mg",
    sodium: "260 mg",
    carbs: "25 g",
    fiber: "1 g",
    sugars: "3 g",
    protein: "4 g",
    allergens: "Milk, Soy, Wheat",
    prep: "Two slices of classic enriched white bread lightly brushed with butter spread and toasted golden brown on a flat grill.",
    imageDesc: "Two slices of golden toasted white bread cut diagonally in half, showing a lightly browned center and warm butter shine.",
    image: gal10,
  },
  {
    id: 4,
    name: "Wheat Toast (2 Slices)",
    priceNote: "Bread Choice Option",
    calories: 120,
    fat: "2 g",
    satFat: "0 g",
    transFat: "0 g",
    cholesterol: "0 mg",
    sodium: "250 mg",
    carbs: "26 g",
    fiber: "4 g",
    sugars: "2 g",
    protein: "6 g",
    allergens: "Milk, Soy, Wheat",
    prep: "Two slices of whole wheat bread lightly buttered and toasted on the grill top.",
    imageDesc: "Two slices of whole wheat toast with a light brown textured crust, sliced diagonally and lightly buttered.",
    image: gal7,
  },
  {
    id: 5,
    name: "Raisin Toast (2 Slices)",
    priceNote: "Bread Choice Option",
    calories: 220,
    fat: "3 g",
    satFat: "0 g",
    transFat: "0 g",
    cholesterol: "0 mg",
    sodium: "280 mg",
    carbs: "42 g",
    fiber: "2 g",
    sugars: "16 g",
    protein: "6 g",
    allergens: "Milk, Soy, Wheat",
    prep: "Cinnamon raisin bread slices toasted on the grill and finished with warm butter spread.",
    imageDesc: "Diagonal slices of dark cinnamon-tinted toasted bread studded with dark raisins and a light glossy butter coating.",
    image: introImg,
  },
  {
    id: 6,
    name: "Grilled Biscuit",
    priceNote: "Bread Choice Option",
    calories: 300,
    fat: "15 g",
    satFat: "9 g",
    transFat: "0 g",
    cholesterol: "0 mg",
    sodium: "800 mg",
    carbs: "34 g",
    fiber: "1 g",
    sugars: "2 g",
    protein: "5 g",
    allergens: "Egg, Milk, Soy, Wheat",
    prep: "A flaky Southern buttermilk biscuit split in half, buttered, and grilled face-down until toasted crisp.",
    imageDesc: "A thick, layered buttermilk biscuit sliced in half with a dark golden-crisp grilled interior face.",
    image: gal2,
  },
  {
    id: 7,
    name: "Texas Toast (1 Slice)",
    priceNote: "Bread Choice Option",
    calories: 100,
    fat: "1 g",
    satFat: "0 g",
    transFat: "0 g",
    cholesterol: "0 mg",
    sodium: "190 mg",
    carbs: "19 g",
    fiber: "1 g",
    sugars: "2 g",
    protein: "3 g",
    allergens: "Milk, Soy, Wheat",
    prep: "One extra-thick slice of white Texas toast bread buttered heavily and grilled on both sides.",
    imageDesc: "A thick-cut slice of white bread with a dark golden grilled outer crust and soft fluffy white interior.",
    image: gal6,
  },
  {
    id: 8,
    name: "Grits",
    priceNote: "Side Choice Option",
    calories: 90,
    fat: "3 g",
    satFat: "1 g",
    transFat: "0 g",
    cholesterol: "0 mg",
    sodium: "300 mg",
    carbs: "16 g",
    fiber: "1 g",
    sugars: "0 g",
    protein: "3 g",
    allergens: "Egg, Milk, Soy, Wheat",
    prep: "White stone-ground corn hominy boiled with water, salt, and butter until smooth and creamy.",
    imageDesc: "A small white bowl filled with smooth, creamy off-white hot grits with a small pat of melting yellow butter in the center.",
    image: gal1,
  },
  {
    id: 9,
    name: "Regular Hashbrowns",
    priceNote: "Side Choice Option",
    calories: 190,
    fat: "7 g",
    satFat: "3 g",
    transFat: "0 g",
    cholesterol: "0 mg",
    sodium: "240 mg",
    carbs: "29 g",
    fiber: "3 g",
    sugars: "0 g",
    protein: "3 g",
    allergens: "Soy",
    prep: "Shredded potatoes scattered loosely on a hot flat-top grill coated with oil and seared until golden and crispy.",
    imageDesc: "A loose bed of shredded potato hashbrowns cooked crisp with visible golden-brown edges.",
    image: gal4,
  },
  {
    id: 10,
    name: "Sliced Tomatoes",
    priceNote: "Side Choice Option",
    calories: 10,
    fat: "0 g",
    satFat: "0 g",
    transFat: "0 g",
    cholesterol: "0 mg",
    sodium: "0 mg",
    carbs: "2 g",
    fiber: "0 g",
    sugars: "2 g",
    protein: "0 g",
    allergens: "None",
    prep: "Fresh red ripe tomatoes sliced thick and served cold as a fresh side.",
    imageDesc: "Three round, bright-red thick slices of fresh tomato arranged neatly on a side plate.",
    image: menuHighlightBreakfastImg,
  },
  {
    id: 11,
    name: "Bacon (3 Slices)",
    priceNote: "Meat Choice Option",
    calories: 135,
    fat: "12 g",
    satFat: "5 g",
    transFat: "0 g",
    cholesterol: "30 mg",
    sodium: "375 mg",
    carbs: "0 g",
    fiber: "0 g",
    sugars: "0 g",
    protein: "9 g",
    allergens: "None listed",
    prep: "Three strips of hickory-smoked pork bacon griddled on the flat top until crispy.",
    imageDesc: "Three wavy, dark reddish-brown strips of crispy bacon laid flat.",
    image: allStarImg,
  },
  {
    id: 12,
    name: "Sausage (2 Patties)",
    priceNote: "Meat Choice Option",
    calories: 260,
    fat: "24 g",
    satFat: "8 g",
    transFat: "0 g",
    cholesterol: "50 mg",
    sodium: "510 mg",
    carbs: "1 g",
    fiber: "0 g",
    sugars: "0 g",
    protein: "10 g",
    allergens: "None listed",
    prep: "Two seasoned pork sausage patties grilled thoroughly until seared brown on the outside.",
    imageDesc: "Two thick, round pork sausage patties with dark grill sear marks on the surface.",
    image: tboneImg,
  },
  {
    id: 13,
    name: "Chicken Sausage (2 Patties)",
    priceNote: "Meat Choice Option",
    calories: 180,
    fat: "13 g",
    satFat: "4 g",
    transFat: "0 g",
    cholesterol: "75 mg",
    sodium: "700 mg",
    carbs: "0 g",
    fiber: "0 g",
    sugars: "0 g",
    protein: "14 g",
    allergens: "None listed",
    prep: "Two savory lean chicken sausage patties grilled flat until fully cooked.",
    imageDesc: "Two round, slightly lighter brown chicken sausage patties grilled golden.",
    image: menuHighlightComboImg,
  },
  {
    id: 14,
    name: "City Ham (1 Slice)",
    priceNote: "Meat Choice Option",
    calories: 100,
    fat: "3 g",
    satFat: "1 g",
    transFat: "0 g",
    cholesterol: "40 mg",
    sodium: "850 mg",
    carbs: "7 g",
    fiber: "0 g",
    sugars: "6 g",
    protein: "14 g",
    allergens: "None listed",
    prep: "Sliced hickory-smoked city ham warmed and seared on the grill.",
    imageDesc: "A thin, broad slice of pink grilled city ham with light caramelization on the edges.",
    image: gal3,
  },
  {
    id: 15,
    name: "Country Ham (1 Slice)",
    priceNote: "Meat Choice Option",
    calories: 190,
    fat: "9 g",
    satFat: "3 g",
    transFat: "0 g",
    cholesterol: "95 mg",
    sodium: "2110 mg",
    carbs: "1 g",
    fiber: "0 g",
    sugars: "1 g",
    protein: "25 g",
    allergens: "None listed",
    prep: "A thick cut of traditional salty, dry-cured country ham grilled until hot and fragrant.",
    imageDesc: "A thick, rich dark-pink slice of salt-cured country ham with grilled outer edges.",
    image: gal8,
  }
];

// Real Waffle House All-Star Special™ menu — base plate is two eggs any style,
// toast with jelly, choice of meat, choice of side, and a Waffle.
const MEATS = [
  { key: "bacon", label: "Bacon (3 Slices)", cal: 135, protein: 9, fat: 12, priceAdj: 0 },
  { key: "sausage", label: "Sausage (2 Patties)", cal: 260, protein: 10, fat: 24, priceAdj: 0 },
  { key: "chicken-sausage", label: "Chicken Sausage (2 Patties)", cal: 180, protein: 14, fat: 13, priceAdj: 0 },
  { key: "city-ham", label: "City Ham (1 Slice)", cal: 100, protein: 14, fat: 3, priceAdj: 0.4 },
  { key: "country-ham", label: "Country Ham (1 Slice)", cal: 190, protein: 25, fat: 9, priceAdj: 1.5 },
] as const;

const SIDES = [
  { key: "hashbrowns", label: "Regular Hashbrowns", cal: 190, carbs: 29 },
  { key: "grits", label: "Grits", cal: 90, carbs: 16 },
  { key: "tomatoes", label: "Sliced Tomatoes", cal: 10, carbs: 2 },
] as const;

const WAFFLES = [
  { key: "classic", label: "Classic Waffle", cal: 410, priceAdj: 0 },
  { key: "pecan", label: "Pecan Waffle", cal: 560, priceAdj: 0.55 },
  { key: "chocolate-chip", label: "Chocolate Chip Waffle", cal: 520, priceAdj: 0.55 },
  { key: "peanut-butter-chip", label: "Peanut Butter Chip Waffle", cal: 560, priceAdj: 0.55 },
  { key: "blueberry", label: "Blueberry Waffle", cal: 560, priceAdj: 0.55 },
  { key: "firework", label: "Firework Waffle", cal: 590, priceAdj: 1.1 },
] as const;

const BASE_PRICE = 13.85;

const IMAGE_POOL = [
  introImg, allStarImg, menuHighlightBreakfastImg, menuHighlightComboImg,
  tboneImg, wafflesImg,
  gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8, gal9, gal10,
];

export const variants: Variant[] = (() => {
  const out: Variant[] = [];
  let i = 0;
  for (const meat of MEATS) {
    for (const side of SIDES) {
      for (const waffle of WAFFLES) {
        const price = Math.round((BASE_PRICE + meat.priceAdj + waffle.priceAdj) * 100) / 100;
        // 2 Eggs (180 cal) + Toast (130 cal) + Meat + Side + Waffle
        const calories = 180 + 130 + meat.cal + side.cal + waffle.cal;
        const rating = Math.round((4.4 + ((i * 7) % 6) * 0.1) * 10) / 10;
        out.push({
          slug: `${meat.key}-${side.key}-${waffle.key}`,
          name: `All-Star Special with ${meat.label}, ${side.label} & ${waffle.label}`,
          description: `Two scrambled eggs with buttered white toast, ${meat.label.toLowerCase()}, ${side.label.toLowerCase()} and a ${waffle.label.toLowerCase()} — a real All-Star Special™ build served fresh at Waffle House.`,
          price,
          calories,
          protein: 12 + 4 + meat.protein,
          carbs: 2 + 25 + side.carbs + 55,
          fat: 14 + 2 + meat.fat + 18,
          rating,
          image: IMAGE_POOL[i % IMAGE_POOL.length],
        });
        i += 1;
      }
    }
  }
  return out;
})();

export const PAGE_SIZE = 12;
export const totalPages = Math.max(1, Math.ceil(OFFICIAL_ALL_STAR_RECIPES.length / PAGE_SIZE));

export function pageItemsFor(page: number) {
  return OFFICIAL_ALL_STAR_RECIPES.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
}
// Curated views — using real breakfast items as requested
const breakfastItems = itemsByCategory("breakfast");
const mapToVariant = (item: any): Variant => ({
  slug: item.slug,
  name: item.name,
  description: item.description,
  price: item.price,
  calories: item.nutrition?.calories ?? 0,
  protein: item.nutrition?.proteinG ?? 0,
  carbs: item.nutrition?.carbsG ?? 0,
  fat: item.nutrition?.fatG ?? 0,
  rating: 4.8,
  image: item.image,
  category: item.category,
});
export const popularPicks = breakfastItems.slice(0, 10).map(mapToVariant);
export const healthierPicks = breakfastItems.slice(2, 12).map(mapToVariant);
export const editorsPicks = breakfastItems.slice(4, 14).map(mapToVariant);

export const videos = [
  {
    id: "1",
    title: "How the All-Star Special™ Comes Together",
    duration: "Short",
    youtubeId: "voNuTf2AFco",
    image: menuHighlightBreakfastImg,
  },
  {
    id: "2",
    title: "Ordering Hashbrowns Like a Regular",
    duration: "Short",
    youtubeId: "XsREMcl83II",
    image: gal4,
  },
  {
    id: "3",
    title: "Waffle House Waffles, Explained",
    duration: "Short",
    youtubeId: "Oiuv4ONXB7E",
    image: wafflesImg,
  },
  {
    id: "4",
    title: "Inside a 24/7 Waffle House Kitchen",
    duration: "Short",
    youtubeId: "I7aHz9ghgpQ",
    image: gal7,
  },
];

const faqs = [
  {
    q: "What comes with the All-Star Special™ at Waffle House?",
    a: "The All-Star Special™ is served with two eggs cooked any style, buttered toast with jelly, your choice of hashbrowns or grits (or sliced tomatoes), your choice of bacon, sausage, chicken sausage, city ham or country ham, and a Classic Waffle.",
  },
  {
    q: "How much does the All-Star Special™ cost?",
    a: "The base All-Star Special™ starts at $13.85 in most U.S. locations as of July 2026. Waffle upgrades (pecan, chocolate chip, blueberry, peanut butter chip or firework) add roughly $0.55–$1.10, and ham upgrades add about $0.40–$1.50.",
  },
  {
    q: "How many calories are in the All-Star Special™?",
    a: "A standard All-Star Special™ with scrambled eggs (180 kcal), white toast (130 kcal), bacon (135 kcal), hashbrowns (190 kcal) and a Classic Waffle (410 kcal) totals 1,045 calories.",
  },
  {
    q: "Can I substitute grits or sliced tomatoes for hashbrowns?",
    a: "Yes. The All-Star Special™ lets you swap hashbrowns for grits (90 kcal) or sliced tomatoes (10 kcal) at no extra charge.",
  },
  {
    q: "Is the All-Star Special™ available all day?",
    a: "Yes. Waffle House serves the full breakfast menu — including every All-Star Special™ build — 24 hours a day, 7 days a week.",
  },
];

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function pagePath(n: number) {
  return n === 1
    ? "/menu/all-star-special"
    : `/menu/all-star-special/page/${n}`;
}

export function AllStarPageView({ page }: { page: number }) {
  const items = pageItemsFor(page);
  const isFirst = page === 1;

  return (
    <div>
      {/* SECTION 1 — PAGE INTRODUCTION (page 1 only, approved layout) */}
      {isFirst ? (
        <section className="bg-[#F3F3F1]">
          <div className="container-editorial grid items-center gap-10 py-14 md:grid-cols-12 md:gap-12 md:py-20">
            <div className="order-1 md:col-span-4">
              <div className="mx-auto max-w-[260px] text-center">
                <div className="mx-auto aspect-square w-full overflow-hidden rounded-2xl bg-muted shadow-[0_18px_40px_-24px_rgba(0,0,0,0.28)] ring-1 ring-black/5">
                  <img
                    src={introImg}
                    alt="Waffle House All-Star Special breakfast plate — two eggs, buttermilk waffle, hashbrowns and hickory bacon"
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
                  Classic All-Star Special™
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
                  All-Star Special™
                </span>
              </nav>

              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                All-Star Special™ Recipes
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
                &ldquo;What&rsquo;s the best breakfast?&rdquo; Gah! That question! Whether
                you&rsquo;re after two eggs and a waffle or the full plate with bacon,
                sausage, hashbrowns or ham — this guide reviews every All-Star Special™
                variant with verified U.S. prices, calories and editor ratings.
              </p>
            </div>
          </div>
        </section>
      ) : (
        /* PAGE 2+ CLEAN DEDICATED HEADER */
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
                All-Star Special™ — Page {page} of {totalPages}
              </span>
            </nav>

            <h1 className="mt-5 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl md:text-5xl">
              All-Star Special™ Recipes — Page {page} of {totalPages}
            </h1>
          </div>
        </section>
      )}

      {/* SECTIONS 2–5 — Only on page 1, horizontal carousels & official recipe breakdown */}
      {isFirst && (
        <>
          <RecipeCarousel
            eyebrow="Reader Favorites"
            heading="Most-Loved All-Star Builds"
            intro="The ten highest-rated All-Star Special™ plates our editors and readers keep coming back to."
            items={popularPicks}
            bg="bg-white"
          />
          <RecipeCarousel
            eyebrow="Lighter Choices"
            heading="Lower-Calorie All-Star Plates"
            intro="The ten lightest ways to order the All-Star Special™ — sorted from the lowest verified calorie counts."
            items={healthierPicks}
            bg="bg-[#F7F7F7]"
          />
          <VideosSection />
          <RecipeCarousel
            eyebrow="Editor's Picks"
            heading="Ten More Plates Worth Ordering"
            intro="Hand-picked All-Star Special™ combinations that balance value, calories and craft."
            items={editorsPicks}
            bg="bg-white"
          />
          <FaqSection
            bgClassName="bg-surface"
            items={faqs}
            eyebrow="All-Star Questions"
            heading="All-Star Special™ FAQ Guide"
            intro="Verified answers to common questions about Waffle House All-Star Special pricing, calories, and customized ordering."
          />
        </>
      )}

      {/* SECTION 6 — RECIPE GRID (12 per page, real pagination) */}
      <section id="all-recipes" className="bg-white">
        <div className="container-editorial py-12 md:py-16">
          {isFirst && (
            <div className="mx-auto max-w-2xl text-center mb-12">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
                All Recipes
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
                Every All-Star Special™ Recipe
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                Every real All-Star Special™ build — with verified U.S. prices, calorie counts and editor ratings.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((v) => (
              <div key={v.id} className="group relative flex flex-col overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-xl hover:ring-primary h-full justify-between">
                <div className="aspect-[4/3] w-full overflow-hidden bg-muted relative">
                  <img
                    src={v.image}
                    alt={v.name}
                    width={600}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium">
                    {v.priceNote}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h3 className="font-display text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {v.name}
                    </h3>
                    <span className="chip shrink-0">{v.calories} kcal</span>
                  </div>

                  <p className="text-xs text-ink-soft italic mb-4">
                    "{v.imageDesc}"
                  </p>

                  <div className="text-sm leading-relaxed text-ink-soft mb-6 flex-1 space-y-3">
                    <p><strong className="text-foreground">Recipe / Preparation:</strong> {v.prep}</p>
                    
                    <div className="bg-muted/30 p-3 rounded-xl border border-black/5 text-xs text-ink space-y-2">
                      <div className="font-bold text-foreground border-b border-black/10 pb-1">Nutritional Details:</div>
                      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                        <div><span className="font-semibold text-foreground">Fat:</span> {v.fat}</div>
                        <div><span className="font-semibold text-foreground">Sat Fat:</span> {v.satFat}</div>
                        <div><span className="font-semibold text-foreground">Trans Fat:</span> {v.transFat}</div>
                        <div><span className="font-semibold text-foreground">Cholesterol:</span> {v.cholesterol}</div>
                        <div><span className="font-semibold text-foreground">Sodium:</span> {v.sodium}</div>
                        <div><span className="font-semibold text-foreground">Carbs:</span> {v.carbs}</div>
                        <div><span className="font-semibold text-foreground">Fiber:</span> {v.fiber}</div>
                        <div><span className="font-semibold text-foreground">Sugars:</span> {v.sugars}</div>
                        <div><span className="font-semibold text-foreground">Protein:</span> {v.protein}</div>
                      </div>
                      <div className="pt-1 border-t border-black/10 text-rose-700 font-medium">
                        <strong>Allergens:</strong> {v.allergens}
                      </div>
                    </div>
                  </div>
                  <button className="btn-primary w-full mt-auto">View Details</button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION — clean windowed pages */}
          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-12 flex flex-wrap items-center justify-center gap-2"
            >
              {page > 1 ? (
                <Link
                  to={pagePath(page - 1)}
                  className="inline-flex h-10 items-center gap-1 rounded-lg border border-border bg-white px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="Previous page"
                  rel="prev"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden /> Previous
                </Link>
              ) : (
                <span className="inline-flex h-10 items-center gap-1 rounded-lg border border-border bg-white px-4 text-sm font-semibold text-foreground opacity-40">
                  <ChevronLeft className="h-4 w-4" aria-hidden /> Previous
                </span>
              )}

              {/* Windowed pagination: show current, current-1, current+1 */}
              {Array.from({ length: totalPages })
                .map((_, idx) => idx + 1)
                .filter((n) => n === page || n === page - 1 || n === page + 1)
                .map((n) => {
                  const active = n === page;
                  return active ? (
                    <span
                      key={n}
                      aria-current="page"
                      className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-bold text-black"
                    >
                      {n}
                    </span>
                  ) : (
                    <Link
                      key={n}
                      to={pagePath(n)}
                      className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg border border-border bg-white px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                    >
                      {n}
                    </Link>
                  );
                })}

              {page < totalPages ? (
                <Link
                  to={pagePath(page + 1)}
                  className="inline-flex h-10 items-center gap-1 rounded-lg border border-border bg-white px-4 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
                  aria-label="Next page"
                  rel="next"
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

      {/* SUBSCRIBE — page 1 only */}
      {isFirst && (
        <SubscriberSection bgImage={subscribeBgImg} idPrefix={`allstar-${page}`} />
      )}

      {/* AUTHOR BIO */}
      {isFirst && <AuthorBio />}

      <div className="h-14 bg-white md:h-16" aria-hidden />
    </div>
  );
}



function VariantCard({ v }: { v: Variant }) {
  const cat = v.category || "all-star-special";
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md">
      <Link
        to="/menu/$category/$slug"
        params={{ category: cat, slug: v.slug }}
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
            params={{ category: cat, slug: v.slug }}
            className="hover:text-primary transition-colors"
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
          to="/menu/$category/$slug"
          params={{ category: cat, slug: v.slug }}
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
  items: Variant[];
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

function CarouselCard({ v }: { v: Variant }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md">
      <Link
        to="/menu/$category/$slug"
        params={{ category: v.category || "all-star-special", slug: v.slug }}
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
          <Link
            to="/menu/$category/$slug"
            params={{ category: v.category || "all-star-special", slug: v.slug }}
            className="hover:text-primary transition-colors"
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
          to="/menu/$category/$slug"
          params={{ category: v.category || "all-star-special", slug: v.slug }}
          className="btn-primary mt-auto pt-4 h-10 w-full justify-center text-sm font-semibold"
        >
          View Recipe <ArrowRight className="h-4 w-4 ml-1" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

function VideosSection() {
  return (
    <section className="bg-white border-t border-black/5">
      <div className="container-editorial py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            Watch & Learn
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
            All-Star Special™ Videos
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Short editorial clips on how the All-Star plate is built, ordered
            and served across Waffle House kitchens.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {videos.map((v) => (
            <div
              key={v.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 transition-all duration-300"
            >
              <div className="relative aspect-[9/16] w-full overflow-hidden bg-muted">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${v.youtubeId}`}
                  title={v.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-semibold leading-snug text-foreground">
                  {v.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
