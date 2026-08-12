import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Search, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
import blueberryWaffleImg from "@/assets/waffle-blueberry.jpg";
import strawberryWaffleImg from "@/assets/waffle-strawberry.jpg";
import waffleDoubleImg from "@/assets/waffle-double.jpg";
import breakfastHeroImg from "@/assets/breakfast-hero.jpg";
import menuHighlightBreakfastImg from "@/assets/menu-highlight-breakfast.jpg";
import menuHighlightComboImg from "@/assets/menu-highlight-combo.jpg";

// Category thumbnails (13 official Waffle House categories)
import catAllStar from "@/assets/cat-all-star.jpg";
import catWaffles from "@/assets/cat-waffles.jpg";
import catEggBreakfasts from "@/assets/cat-egg-breakfasts.jpg";
import catOmelets from "@/assets/cat-omelets.jpg";
import catBreakfastBowl from "@/assets/cat-breakfast-bowl.jpg";
import catTexasMelt from "@/assets/cat-texas-melt.jpg";
import catBiscuits from "@/assets/cat-biscuits.jpg";
import catAngusBurger from "@/assets/cat-angus-burger.jpg";
import catSandwiches from "@/assets/cat-sandwiches.jpg";
import catClassicDinners from "@/assets/cat-classic-dinners.jpg";
import catHashbrowns from "@/assets/cat-hashbrowns.jpg";
import catSides from "@/assets/cat-sides.jpg";
import catBeverages from "@/assets/cat-beverages.jpg";

import { SubscriberSection } from "@/components/SubscriberSection";
import { articles } from "@/data/articles";

/* ------------------------------------------------------------------ */
/* TYPES                                                                */
/* ------------------------------------------------------------------ */

interface RecipeItem {
  name: string;
  category: string;
  price: string;
  calories: number;
  image: string;
  link: string;
}

type MealFilter = "breakfast" | "lunch" | "dinner";

/* ------------------------------------------------------------------ */
/* DATA                                                                 */
/* ------------------------------------------------------------------ */

// Official 13 Waffle House menu categories (exactly as on the restaurant menu)
const allCategories = [
  { name: "All-Star Special™", image: catAllStar, href: "/menu/all-star-special" },
  { name: "Waffles", image: catWaffles, href: "/menu/waffles" },
  { name: "Egg Breakfasts", image: catEggBreakfasts, href: "/menu/breakfast" },
  { name: "Toddle House© Omelets", image: catOmelets, href: "/menu/omelets" },
  { name: "Hashbrown Bowls", image: catBreakfastBowl, href: "/menu/hashbrown-bowls" },
  { name: "Breakfast Sandwiches & Melts", image: catTexasMelt, href: "/menu/breakfast-sandwiches" },
  { name: "Grilled Biscuits", image: catBiscuits, href: "/menu/biscuits" },
  { name: "Angus Burgers", image: catAngusBurger, href: "/menu/burgers" },
  { name: "Sandwiches", image: catSandwiches, href: "/menu/sandwiches" },
  { name: "Classic Dinners", image: catClassicDinners, href: "/menu/classic-dinners" },
  { name: "Hashbrowns & Toppings", image: catHashbrowns, href: "/menu/hashbrowns" },
  { name: "Breakfast Sides", image: catSides, href: "/menu/sides" },
  { name: "Beverages & Pies", image: catBeverages, href: "/menu/beverages" },
];

// 10 real Waffle House breakfast recipe items for the carousel
const breakfastCarouselItems: RecipeItem[] = [
  {
    name: "All-Star Special™",
    category: "Breakfast Combo",
    price: "$13.85",
    calories: 1050,
    image: allStarImg,
    link: "/menu/all-star-special",
  },
  {
    name: "Classic Waffle",
    category: "Waffles",
    price: "$4.55",
    calories: 410,
    image: wafflesImg,
    link: "/menu/waffles",
  },
  {
    name: "Pecan Waffle",
    category: "Waffles",
    price: "$5.75",
    calories: 560,
    image: pecanWaffleImg,
    link: "/menu/waffles",
  },
  {
    name: "Chocolate Chip Waffle",
    category: "Waffles",
    price: "$5.25",
    calories: 520,
    image: chocolateWaffleImg,
    link: "/menu/waffles",
  },
  {
    name: "2 Eggs Scrambled Breakfast",
    category: "Egg Breakfasts",
    price: "$6.85",
    calories: 410,
    image: lowcalEggsImg,
    link: "/menu/breakfast",
  },
  {
    name: "Cheese 'N Eggs Breakfast",
    category: "Egg Breakfasts",
    price: "$7.95",
    calories: 560,
    image: menuHighlightBreakfastImg,
    link: "/menu/breakfast",
  },
  {
    name: "T-Bone Steak & Eggs",
    category: "Classic Dinners",
    price: "$16.50",
    calories: 1230,
    image: tboneImg,
    link: "/menu",
  },
  {
    name: "Hashbrowns All The Way",
    category: "Hashbrowns & Toppings",
    price: "$6.50",
    calories: 780,
    image: hashbrownsImg,
    link: "/menu",
  },
  {
    name: "Blueberry Waffle",
    category: "Waffles",
    price: "$5.75",
    calories: 560,
    image: blueberryWaffleImg,
    link: "/menu/waffles",
  },
  {
    name: "Waffle Breakfast Combo",
    category: "Breakfast Combo",
    price: "$8.95",
    calories: 870,
    image: menuHighlightComboImg,
    link: "/menu",
  },
];

// 10 healthy / low-calorie Waffle House items
const healthyCarouselItems: RecipeItem[] = [
  {
    name: "Grilled Chicken Salad",
    category: "Salads",
    price: "$7.95",
    calories: 175,
    image: lowcalFruitImg,
    link: "/menu",
  },
  {
    name: "2 Eggs (Scrambled)",
    category: "Egg Breakfasts",
    price: "$4.55",
    calories: 200,
    image: lowcalEggsImg,
    link: "/menu/breakfast",
  },
  {
    name: "Bottomless Coffee",
    category: "Beverages",
    price: "$2.95",
    calories: 5,
    image: icedCoffeeImg,
    link: "/menu",
  },
  {
    name: "Grilled Chicken Sandwich",
    category: "Sandwiches",
    price: "$8.45",
    calories: 490,
    image: chickenSandwichImg,
    link: "/menu",
  },
  {
    name: "Sirloin Steak & Eggs",
    category: "Classic Dinners",
    price: "$12.95",
    calories: 660,
    image: tboneImg,
    link: "/menu",
  },
  {
    name: "Plain Hashbrowns",
    category: "Hashbrowns",
    price: "$3.65",
    calories: 350,
    image: hashbrownsImg,
    link: "/menu",
  },
  {
    name: "Classic Waffle",
    category: "Waffles",
    price: "$4.55",
    calories: 410,
    image: wafflesImg,
    link: "/menu/waffles",
  },
  {
    name: "Ham & Cheese Omelet",
    category: "Omelets",
    price: "$8.95",
    calories: 560,
    image: menuHighlightBreakfastImg,
    link: "/menu",
  },
  {
    name: "Cheese 'N Eggs",
    category: "Egg Breakfasts",
    price: "$7.95",
    calories: 560,
    image: lowcalEggsImg,
    link: "/menu/breakfast",
  },
  {
    name: "Large Chocolate Milk",
    category: "Beverages",
    price: "$3.45",
    calories: 440,
    image: icedCoffeeImg,
    link: "/menu",
  },
];

// 10 budget-friendly items under $10
const budgetCarouselItems: RecipeItem[] = [
  {
    name: "Classic Waffle",
    category: "Waffles",
    price: "$4.55",
    calories: 410,
    image: wafflesImg,
    link: "/menu/waffles",
  },
  {
    name: "2 Eggs Scrambled Breakfast",
    category: "Egg Breakfasts",
    price: "$6.85",
    calories: 410,
    image: lowcalEggsImg,
    link: "/menu/breakfast",
  },
  {
    name: "Bottomless Coffee",
    category: "Beverages",
    price: "$2.95",
    calories: 5,
    image: icedCoffeeImg,
    link: "/menu",
  },
  {
    name: "Plain Hashbrowns",
    category: "Hashbrowns",
    price: "$3.65",
    calories: 350,
    image: hashbrownsImg,
    link: "/menu",
  },
  {
    name: "Pecan Waffle",
    category: "Waffles",
    price: "$5.75",
    calories: 560,
    image: pecanWaffleImg,
    link: "/menu/waffles",
  },
  {
    name: "Cheese 'N Eggs Breakfast",
    category: "Egg Breakfasts",
    price: "$7.95",
    calories: 560,
    image: menuHighlightBreakfastImg,
    link: "/menu/breakfast",
  },
  {
    name: "Bacon Egg & Cheese Biscuit",
    category: "Grilled Biscuits",
    price: "$5.95",
    calories: 610,
    image: breakfastHeroImg,
    link: "/menu",
  },
  {
    name: "Angus Hamburger Deluxe",
    category: "Angus Burgers",
    price: "$7.95",
    calories: 560,
    image: burgerImg,
    link: "/menu",
  },
  {
    name: "Patty Melt",
    category: "Sandwiches",
    price: "$8.95",
    calories: 730,
    image: pattyMeltImg,
    link: "/menu",
  },
  {
    name: "Hashbrowns All The Way",
    category: "Hashbrowns",
    price: "$6.50",
    calories: 780,
    image: hashbrownsImg,
    link: "/menu",
  },
];

// 10 seasonal / featured items
const seasonalCarouselItems: RecipeItem[] = [
  {
    name: "All-Star Special™",
    category: "Breakfast Combo",
    price: "$13.85",
    calories: 1050,
    image: allStarImg,
    link: "/menu/all-star-special",
  },
  {
    name: "T-Bone Steak & Eggs",
    category: "Classic Dinners",
    price: "$16.50",
    calories: 1230,
    image: tboneImg,
    link: "/menu",
  },
  {
    name: "Strawberry Waffle",
    category: "Waffles",
    price: "$5.75",
    calories: 520,
    image: strawberryWaffleImg,
    link: "/menu/waffles",
  },
  {
    name: "Texas Cheesesteak™ Melt",
    category: "Breakfast Sandwiches & Melts",
    price: "$8.95",
    calories: 650,
    image: pattyMeltImg,
    link: "/menu",
  },
  {
    name: "Angus Cheeseburger Deluxe",
    category: "Angus Burgers",
    price: "$8.45",
    calories: 620,
    image: burgerImg,
    link: "/menu",
  },
  {
    name: "Double Waffle",
    category: "Waffles",
    price: "$7.95",
    calories: 820,
    image: waffleDoubleImg,
    link: "/menu/waffles",
  },
  {
    name: "Fiesta Omelet",
    category: "Toddle House© Omelets",
    price: "$9.45",
    calories: 590,
    image: menuHighlightBreakfastImg,
    link: "/menu",
  },
  {
    name: "Sausage Egg & Cheese Bowl",
    category: "Hashbrown Bowls",
    price: "$9.45",
    calories: 920,
    image: hashbrownsImg,
    link: "/menu",
  },
  {
    name: "Grilled Chicken Sandwich Deluxe",
    category: "Sandwiches",
    price: "$8.45",
    calories: 490,
    image: chickenSandwichImg,
    link: "/menu",
  },
  {
    name: "Southern Pecan Pie",
    category: "Beverages & Pies",
    price: "$4.25",
    calories: 520,
    image: icedCoffeeImg,
    link: "/menu",
  },
];

// 10 recently verified items
const recentCarouselItems: RecipeItem[] = [
  {
    name: "Bacon Egg & Cheese Hashbrown Bowl",
    category: "Hashbrown Bowls",
    price: "$9.25",
    calories: 800,
    image: hashbrownsImg,
    link: "/menu",
  },
  {
    name: "Sausage Egg & Cheese Biscuit",
    category: "Grilled Biscuits",
    price: "$5.95",
    calories: 650,
    image: breakfastHeroImg,
    link: "/menu",
  },
  {
    name: "Texas Angus Patty Melt",
    category: "Breakfast Sandwiches & Melts",
    price: "$8.95",
    calories: 730,
    image: pattyMeltImg,
    link: "/menu",
  },
  {
    name: "Chocolate Chip Waffle",
    category: "Waffles",
    price: "$5.25",
    calories: 520,
    image: chocolateWaffleImg,
    link: "/menu/waffles",
  },
  {
    name: "Peanut Butter Chip Waffle",
    category: "Waffles",
    price: "$5.75",
    calories: 560,
    image: pecanWaffleImg,
    link: "/menu/waffles",
  },
  {
    name: "Ham & Cheese Omelet",
    category: "Toddle House© Omelets",
    price: "$8.95",
    calories: 560,
    image: menuHighlightBreakfastImg,
    link: "/menu",
  },
  {
    name: "Angus Hamburger Deluxe",
    category: "Angus Burgers",
    price: "$7.95",
    calories: 560,
    image: burgerImg,
    link: "/menu",
  },
  {
    name: "Sirloin Steak & Eggs",
    category: "Classic Dinners",
    price: "$12.95",
    calories: 660,
    image: tboneImg,
    link: "/menu",
  },
  {
    name: "Grilled Chicken Sandwich",
    category: "Sandwiches",
    price: "$8.45",
    calories: 490,
    image: chickenSandwichImg,
    link: "/menu",
  },
  {
    name: "Triple Chocolate Pie",
    category: "Beverages & Pies",
    price: "$4.45",
    calories: 880,
    image: icedCoffeeImg,
    link: "/menu",
  },
];

const heroSlides = [
  { src: hero1, alt: "A golden Belgian waffle with butter and warm maple syrup on a diner plate" },
  { src: hero2, alt: "Two sunny-side up eggs, crispy bacon, hashbrowns and a biscuit on a diner counter" },
  { src: hero3, alt: "Golden crispy hashbrowns steaming on a hot flat-top griddle" },
  { src: hero4, alt: "A steaming mug of coffee on a classic American diner counter at dawn" },
  { src: hero5, alt: "Interior of a classic American diner with chrome stools and red booths" },
  { src: hero6, alt: "A short-order cook cracking eggs onto a hot flat-top griddle" },
];

const mealImages: Record<MealFilter, { label: string; image: string }[]> = {
  breakfast: [
    { label: "Waffles", image: wafflesImg },
    { label: "Eggs & Bacon", image: lowcalEggsImg },
    { label: "Hashbrowns", image: hashbrownsImg },
    { label: "Morning Coffee", image: hero4 },
  ],
  lunch: [
    { label: "Angus Burgers", image: burgerImg },
    { label: "Sandwiches", image: chickenSandwichImg },
    { label: "Patty Melts", image: pattyMeltImg },
    { label: "Hashbrowns", image: hashbrownsImg },
  ],
  dinner: [
    { label: "T-Bone & Steaks", image: tboneImg },
    { label: "Burgers", image: burgerImg },
    { label: "Milkshakes", image: icedCoffeeImg },
    { label: "Late-Night Drinks", image: popularDrinks },
  ],
};

// Nutrition averages (from PDF data — real Waffle House figures)
const nutritionRows = [
  { label: "Calories", value: "560 kcal" },
  { label: "Total Fat", value: "30 g" },
  { label: "Saturated Fat", value: "10 g" },
  { label: "Protein", value: "24 g" },
  { label: "Total Carbohydrates", value: "45 g" },
  { label: "Sodium", value: "1,080 mg" },
  { label: "Serving Size", value: "1 plate" },
];

// FAQ real content from Waffle House menu
const homeFaqs = [
  {
    q: "What time is breakfast served at Waffle House?",
    a: "Waffle House serves its full breakfast menu — waffles, eggs, hashbrowns, biscuits and steaks — 24 hours a day, 7 days a week, 365 days a year. Breakfast never stops.",
  },
  {
    q: "How much does the All-Star Special™ cost?",
    a: "The All-Star Special™ starts at $13.85 at most U.S. locations as of July 2026. It includes two eggs any style, your choice of meat (bacon, sausage or city ham), hashbrowns or grits, and a Classic Waffle. Upgrading to a Pecan, Chocolate Chip or Blueberry Waffle adds $0.55–$1.10.",
  },
  {
    q: "Can I customize my hashbrowns?",
    a: "Yes — Waffle House hashbrowns are fully customizable. Order them Smothered (grilled onions), Covered (melted cheese), Chunked (hickory ham), Diced (tomatoes), Peppered (jalapeños), Capped (grilled mushrooms), Topped (Bert's Chili) or Country (sausage gravy). \"All the Way\" means every topping.",
  },
  {
    q: "Are prices the same at every Waffle House location?",
    a: "No. Each Waffle House is independently franchised, so prices can vary by region and state. The figures on this site represent verified U.S. averages checked at the counter in July 2026.",
  },
  {
    q: "Which Waffle House items are gluten-free?",
    a: "Plain scrambled eggs, bacon, pork sausage, hickory ham, sirloin steak, T-bone steak, and plain hashbrowns are gluten-free. Classic Waffles, grilled biscuits, Texas toast, and buns all contain wheat gluten.",
  },
  {
    q: "Is this the official Waffle House website?",
    a: "No — Waffle House Menu Guide is an independent editorial site. We are not affiliated with, endorsed by, or sponsored by Waffle House, Inc. All menu data is sourced from publicly available nutrition information and verified at the counter.",
  },
];

/* ------------------------------------------------------------------ */
/* ROUTE                                                                */
/* ------------------------------------------------------------------ */

const SITE_URL = "https://wafflehousemenu.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Waffle House Menu 2026 — Prices, Calories & Nutrition" },
      {
        name: "description",
        content:
          "The complete Waffle House menu with current U.S. prices, calorie counts and honest tasting notes — waffles, breakfast plates, burgers and more. Updated July 2026.",
      },
      { property: "og:title", content: "Waffle House Menu 2026 — Prices, Calories & Nutrition" },
      { property: "og:url", content: `${SITE_URL}/` },
      {
        property: "og:description",
        content: "Verified U.S. prices, calories and nutrition for every Waffle House plate. Editorial guide updated monthly.",
      },
      { name: "twitter:title", content: "Waffle House Menu 2026 — Prices, Calories & Nutrition" },
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
              "@type": "Organization",
              "@id": `${SITE_URL}/#organization`,
              "name": "Waffle House Menu Guide",
              "url": SITE_URL,
              "logo": `${SITE_URL}/favicon.ico`,
              "description": "Independent reader's reference for Waffle House: menu, prices, nutrition, and locations."
            },
            {
              "@type": "Restaurant",
              "@id": `${SITE_URL}/#restaurant`,
              "name": "Waffle House Menu Guide",
              "servesCuisine": "American, Diner, Breakfast",
              "priceRange": "$",
              "hasMenu": {
                "@type": "Menu",
                "name": "Main Breakfast & Dining Menu",
                "hasMenuSection": allCategories.map((cat, index) => ({
                  "@type": "MenuSection",
                  "position": index + 1,
                  "name": cat.name,
                  "url": `${SITE_URL}${cat.href}`
                }))
              }
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
/* RECIPE CAROUSEL — same card design as All-Star Special page         */
/* ------------------------------------------------------------------ */

function RecipeCarousel({ items }: { items: RecipeItem[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <div className="relative mt-10">
      {/* Scrollable row */}
      <div
        ref={scrollerRef}
        className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <article
            key={item.name + item.price}
            className="group flex w-[280px] flex-none snap-start flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-30px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_28px_50px_-28px_rgba(0,0,0,0.25)]"
          >
            <Link
              to={item.link as any}
              className="block aspect-[4/3] w-full overflow-hidden bg-muted"
              aria-label={`View recipe: ${item.name}`}
            >
              <img
                src={item.image}
                alt={item.name}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                {item.category}
              </span>
              <h3 className="mt-1.5 font-display text-base font-semibold leading-tight text-foreground sm:text-lg">
                <Link to={item.link as any} className="hover:text-primary">
                  {item.name}
                </Link>
              </h3>
              <dl className="mt-3 space-y-1 text-sm text-ink-soft">
                <div>
                  <dt className="inline">Price: </dt>
                  <dd className="inline font-semibold text-foreground">{item.price}</dd>
                </div>
                <div>
                  <dt className="inline">Calories: </dt>
                  <dd className="inline font-semibold text-foreground">{item.calories.toLocaleString()} cal</dd>
                </div>
              </dl>
              <Link
                to={item.link as any}
                className="btn-primary mt-5 h-10 w-full justify-center text-sm"
              >
                View Recipe <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="Scroll left"
        className="absolute -left-3 top-[calc(50%-2rem)] z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-lg transition-all hover:border-primary hover:bg-primary hover:text-black"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>

      {/* Right Arrow */}
      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="Scroll right"
        className="absolute -right-3 top-[calc(50%-2rem)] z-10 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-foreground shadow-lg transition-all hover:border-primary hover:bg-primary hover:text-black"
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HERO SLIDESHOW                                                       */
/* ------------------------------------------------------------------ */

function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      aria-label="Waffle House menu hero"
      className="relative -mt-[72px] flex min-h-[54svh] items-center overflow-hidden md:min-h-[60svh]"
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
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/80" />
      </div>

      <div className="container-editorial relative w-full pb-20 pt-28 text-center text-white md:pb-24 md:pt-32">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
          The Waffle House Menu Guide · Updated July 2026
        </p>
        <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          Every plate on the menu,
          <br className="hidden sm:block" />{" "}
          <span className="text-[color:var(--primary)]">tasted and priced.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          An independent editorial guide to America&rsquo;s 24-hour diner — verified U.S. prices,
          honest tasting notes and full nutrition for every waffle, breakfast plate, burger and
          hashbrown on the Waffle House menu.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/menu" className="btn-primary h-12 px-6 text-base">
            Read the Menu <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link
            to="/nutrition"
            className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            Nutrition Information
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FLOATING SEARCH                                                      */
/* ------------------------------------------------------------------ */

function FloatingSearch() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  return (
    <div className="relative z-20 -mt-8 sm:-mt-10">
      <div className="container-editorial">
        <form
          role="search"
          aria-label="Search the menu"
          onSubmit={(e) => {
            e.preventDefault();
            const v = q.trim();
            navigate({ to: "/menu", search: v ? { q: v } : {} });
          }}
          className="mx-auto flex max-w-3xl items-center gap-2 rounded-xl border border-black/[0.06] bg-white p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] sm:gap-3"
        >
          <div className="relative flex-1">
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft sm:left-5"
            />
            <label htmlFor="floating-search" className="sr-only">
              Search the Waffle House menu
            </label>
            <input
              id="floating-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search waffles, All-Star, hashbrowns…"
              className="h-12 w-full rounded-lg bg-transparent pl-12 pr-3 text-sm text-foreground placeholder:text-ink-soft focus:outline-none sm:h-14 sm:pl-14 sm:text-base"
            />
          </div>
          <button type="submit" className="btn-primary h-12 rounded-lg px-5 text-sm sm:h-14 sm:px-8 sm:text-base">
            Search
          </button>
        </form>

        {/* Stats summary bar */}
        <div className="mx-auto mt-6 grid max-w-3xl grid-cols-2 gap-3 rounded-2xl border border-black/10 bg-[#F9F9F8] p-4 shadow-sm sm:grid-cols-4 sm:gap-4 text-center">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft">Total Items</span>
            <span className="mt-0.5 block font-display text-sm sm:text-base font-bold text-foreground">
              130+ Dishes
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft">US Locations</span>
            <span className="mt-0.5 block font-display text-sm sm:text-base font-bold text-foreground">
              2,100+ Stores
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft">Price Range</span>
            <span className="mt-0.5 block font-display text-sm sm:text-base font-bold text-primary">
              $2.40 – $16.50
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-ink-soft">Last Updated</span>
            <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-700 ring-1 ring-green-600/10">
              August 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* SECTION HEADER                                                       */
/* ------------------------------------------------------------------ */

function SectionHeader({ eyebrow, title, lede }: { eyebrow?: string; title: string; lede?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
      )}
      <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">
        {title}
      </h2>
      {lede && <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">{lede}</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* NUTRITION SECTION                                                    */
/* ------------------------------------------------------------------ */

function NutritionHighlight() {
  return (
    <section aria-labelledby="nutrition-heading" className="border-t border-border/60 bg-[#0F0F0F]">
      <div className="container-editorial py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">Nutrition</p>
          <h2
            id="nutrition-heading"
            className="mt-3 font-display text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Nutrition Information
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/60 sm:text-lg">
            Verified calorie, protein, carb, fat and sodium averages across the Waffle House
            menu — a quick reference to compare plates before you order.
          </p>
        </div>

        {/* Table + Image side by side */}
        <div className="mt-12 grid items-stretch gap-6 md:grid-cols-5 md:gap-8">
          {/* Left: dark professional table */}
          <div className="md:col-span-3 overflow-hidden rounded-2xl border border-white/10 bg-[#181818]">
            <table className="w-full text-sm sm:text-base">
              <thead>
                <tr className="bg-primary">
                  <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-widest text-black">
                    Nutrient
                  </th>
                  <th scope="col" className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-widest text-black">
                    Average / Plate
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
                    <th scope="row" className="px-6 py-4 text-left font-medium text-white/80">
                      {r.label}
                    </th>
                    <td className="px-6 py-4 text-right font-display font-semibold text-primary">
                      {r.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right: chef image — equal height */}
          <div className="md:col-span-2 overflow-hidden rounded-2xl border border-white/10">
            <img
              src={nutritionChef}
              alt="A short-order chef plating a fresh Waffle House breakfast at the kitchen pass"
              loading="lazy"
              decoding="async"
              width={1408}
              height={1600}
              className="h-full min-h-[300px] w-full object-cover"
            />
          </div>
        </div>

        {/* CTA below table */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/nutrition"
            hash="pdf-table"
            className="group inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-10 text-base font-semibold text-black shadow-[0_15px_35px_-10px_rgba(245,196,0,0.55)] transition-all duration-200 ease-out hover:-translate-y-[3px] hover:bg-[#E2B000] hover:shadow-[0_22px_50px_-12px_rgba(226,176,0,0.7)] sm:min-w-[320px] sm:text-lg"
          >
            View Full Nutrition Table
            <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* ARTICLES LAYOUT                                                      */
/* ------------------------------------------------------------------ */

function ArticlesLayout() {
  // Waffle House real category list for the sidebar
  const categoryRows = [
    { name: "All-Star Special™", items: 6 },
    { name: "Waffles", items: 7 },
    { name: "Egg Breakfasts", items: 9 },
    { name: "Toddle House© Omelets", items: 4 },
    { name: "Hashbrown Bowls", items: 8 },
    { name: "Breakfast Sandwiches & Melts", items: 6 },
    { name: "Grilled Biscuits", items: 5 },
    { name: "Angus Burgers", items: 6 },
    { name: "Sandwiches", items: 5 },
    { name: "Classic Dinners", items: 6 },
    { name: "Hashbrowns & Toppings", items: 8 },
    { name: "Breakfast Sides", items: 7 },
    { name: "Beverages & Pies", items: 6 },
  ];

  return (
    <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-10 lg:gap-12">
      {/* LEFT (70%) — article list, limited to 3 articles */}
      <div className="lg:col-span-7">
        <ul className="divide-y divide-border/60">
          {articles.slice(0, 3).map((a) => (
            <li key={a.slug} className="py-6 first:pt-0 last:pb-0">
              <article className="group grid grid-cols-[112px_1fr] gap-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                <Link to="/menu" className="block overflow-hidden rounded-xl bg-muted" aria-label={a.title}>
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={300}
                    className="aspect-[4/3] h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  />
                </Link>
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">{a.tag}</span>
                  <h3 className="mt-1.5 font-display text-base font-semibold leading-snug sm:text-lg">
                    <Link to="/menu" className="hover:text-primary">{a.title}</Link>
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                    {a.summary}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-ink-soft">
                    <time dateTime={a.updatedAt}>
                      Updated{" "}
                      {new Date(a.updatedAt).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                      })}
                    </time>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" aria-hidden />
                      {a.readMinutes} min read
                    </span>
                  </div>
                  <Link
                    to="/menu"
                    className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground px-4 py-2 text-xs font-semibold text-background transition-colors hover:bg-primary hover:text-black"
                  >
                    Read More <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* RIGHT (30%) — real Waffle House category count table */}
      <aside className="lg:col-span-3">
        <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-[#F5F5F5] shadow-[0_15px_40px_-25px_rgba(0,0,0,0.2)] lg:sticky lg:top-24">
          <div className="bg-primary px-5 py-3.5 sm:px-6">
            <p className="text-xs font-bold uppercase tracking-widest text-black">Waffle House Categories</p>
          </div>
          <table className="w-full text-sm">
            <thead className="sr-only">
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Items</th>
              </tr>
            </thead>
            <tbody>
              {categoryRows.map((r, i) => (
                <tr
                  key={r.name}
                  className={
                    "border-b border-black/[0.05] last:border-0 " +
                    (i % 2 === 1 ? "bg-white" : "bg-[#F5F5F5]")
                  }
                >
                  <th scope="row" className="px-5 py-2.5 text-left font-medium text-foreground sm:px-6">
                    {r.name}
                  </th>
                  <td className="px-5 py-2.5 text-right font-display font-semibold text-foreground sm:px-6">
                    {r.items}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* POPULAR SEARCH FILTERS                                               */
/* ------------------------------------------------------------------ */

function PopularSearchFilters() {
  const [active, setActive] = useState<MealFilter>("breakfast");
  const filters: { id: MealFilter; label: string }[] = [
    { id: "breakfast", label: "Breakfast" },
    { id: "lunch", label: "Lunch" },
    { id: "dinner", label: "Dinner" },
  ];
  const items = mealImages[active];
  const links = {
    breakfast: ["/menu/waffles", "/menu/breakfast", "/menu", "/menu"],
    lunch: ["/menu", "/menu", "/menu", "/menu"],
    dinner: ["/menu", "/menu", "/menu", "/menu"],
  };

  return (
    <div className="mx-auto mt-10 max-w-5xl">
      <div className="px-2">
        <div
          role="tablist"
          aria-label="Popular search categories"
          className="mx-auto grid w-full max-w-3xl grid-cols-3 overflow-hidden rounded-t-2xl border-2 border-b-0 border-primary shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)]"
        >
          {filters.map((f, i) => {
            const isActive = f.id === active;
            return (
              <button
                key={f.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActive(f.id)}
                className={`relative h-14 whitespace-nowrap text-sm font-semibold tracking-wide transition-colors duration-200 sm:h-16 sm:text-base ${
                  i > 0 ? "border-l-2 border-primary" : ""
                } ${isActive ? "bg-white text-black" : "bg-primary text-black hover:bg-[#E2B000]"}`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-b-2xl border-2 border-t-0 border-primary bg-white p-4 sm:p-6">
        <ul
          key={active}
          className="grid animate-in fade-in duration-500 grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
        >
          {items.map((c, idx) => (
            <li key={`${active}-${c.label}`}>
              <Link
                to={links[active][idx] as any}
                className="group relative block overflow-hidden rounded-xl bg-muted shadow-[0_10px_30px_-18px_rgba(0,0,0,0.25)] transition-shadow duration-300 hover:shadow-[0_20px_45px_-20px_rgba(0,0,0,0.4)]"
              >
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={c.image}
                    alt={`${c.label} menu`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 block p-4 font-display text-sm font-semibold text-white sm:text-base">
                  {c.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */

import { FaqSection } from "@/components/FaqSection";

function HomeFaq() {
  return (
    <FaqSection
      eyebrow="Reader questions"
      heading="Waffle House Menu FAQ"
      intro="Straightforward answers to the questions our readers ask most — covering the full menu, prices, customizations, hours, and nutrition."
      items={homeFaqs}
      bgClassName="bg-surface"
    />
  );
}

/* ------------------------------------------------------------------ */
/* EDITORIAL TRUST SECTION                                              */
/* ------------------------------------------------------------------ */

function EditorialTrust() {
  return (
    <section aria-labelledby="trust-heading" className="border-t border-border/60 bg-surface">
      <div className="container-editorial py-14 md:py-16">
        <SectionHeader
          eyebrow="Who writes this guide"
          title="Written and tested by our editors."
          lede="An independent team that eats at Waffle House on our own dime, verifies every price at the counter and cross-checks nutrition against the official brand data."
        />

        <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Author card */}
          <div className="lg:col-span-2 flex flex-col items-center rounded-3xl bg-white p-8 text-center ring-1 ring-black/[0.06] shadow-[0_20px_50px_-30px_rgba(0,0,0,0.18)]">
            <img
              src={contactChef}
              alt="Editorial team — Waffle House Menu Guide"
              loading="lazy"
              decoding="async"
              width={800}
              height={800}
              className="aspect-square w-36 rounded-2xl object-cover shadow-[0_10px_30px_-15px_rgba(0,0,0,0.25)]"
            />
            <p className="mt-5 font-display text-xl font-semibold">The Menu Editors</p>
            <p className="mt-1 text-sm text-ink-soft">Waffle House Menu Guide</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Our team visits Waffle House restaurants across 6 states each month to verify prices,
              taste dishes and reconcile calorie counts against official nutrition sheets.
            </p>
          </div>

          {/* Trust points */}
          <div className="lg:col-span-3 grid gap-4 sm:grid-cols-2">
            {[
              { title: "Prices verified at the counter", body: "Every price is checked in person at a physical Waffle House location — not copied from third-party apps or delivery services." },
              { title: "Nutrition cross-checked", body: "Calorie, protein, carb, fat and sodium figures are reconciled against Waffle House's official published nutrition PDF before publication." },
              { title: "No sponsored content", body: "We accept no advertising from Waffle House, Inc. or its franchisees. Every recommendation is based solely on our own editorial judgement." },
              { title: "Updated monthly", body: "Our editors revisit the menu in the first week of every month. Each page displays a Last Updated date so you know exactly how fresh the data is." },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border/60 bg-white p-6 shadow-[0_6px_20px_-12px_rgba(0,0,0,0.14)]"
              >
                <div className="mb-3 h-1 w-8 rounded-full bg-primary" />
                <h3 className="font-display text-base font-semibold text-foreground">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface FilterItem {
  name: string;
  category: string;
  price: string;
  calories: number;
  image: string;
  link: string;
  veg: boolean;
  lowcal: boolean;
  protein: boolean;
  gf: boolean;
}

const allFilterItems: FilterItem[] = [
  { name: "All-Star Special™", category: "Breakfast Combo", price: "$13.85", calories: 1050, image: allStarImg, link: "/menu/all-star-special", veg: false, lowcal: false, protein: true, gf: false },
  { name: "Classic Waffle", category: "Waffles", price: "$4.55", calories: 410, image: wafflesImg, link: "/menu/waffles", veg: true, lowcal: true, protein: false, gf: false },
  { name: "Pecan Waffle", category: "Waffles", price: "$5.75", calories: 560, image: pecanWaffleImg, link: "/menu/waffles", veg: true, lowcal: false, protein: false, gf: false },
  { name: "Chocolate Chip Waffle", category: "Waffles", price: "$5.25", calories: 520, image: chocolateWaffleImg, link: "/menu/waffles", veg: true, lowcal: false, protein: false, gf: false },
  { name: "2 Eggs Scrambled Breakfast", category: "Egg Breakfasts", price: "$6.85", calories: 410, image: lowcalEggsImg, link: "/menu/breakfast", veg: false, lowcal: true, protein: true, gf: true },
  { name: "T-Bone Steak & Eggs", category: "Classic Dinners", price: "$16.50", calories: 1230, image: tboneImg, link: "/menu", veg: false, lowcal: false, protein: true, gf: true },
  { name: "Plain Hashbrowns", category: "Hashbrowns", price: "$3.65", calories: 350, image: hashbrownsImg, link: "/menu", veg: true, lowcal: true, protein: false, gf: true },
  { name: "Grilled Chicken Salad", category: "Salads", price: "$7.95", calories: 175, image: lowcalFruitImg, link: "/menu", veg: false, lowcal: true, protein: true, gf: true },
  { name: "Bottomless Coffee", category: "Beverages", price: "$2.95", calories: 5, image: icedCoffeeImg, link: "/menu", veg: true, lowcal: true, protein: false, gf: true },
];

function DietaryCalorieFilters() {
  const [activeFilter, setActiveFilter] = useState<"all" | "veg" | "lowcal" | "protein" | "gf">("all");

  const filterPills: { id: "all" | "veg" | "lowcal" | "protein" | "gf"; label: string }[] = [
    { id: "all", label: "All Items" },
    { id: "veg", label: "Vegetarian" },
    { id: "lowcal", label: "Under 500 Calories" },
    { id: "protein", label: "High Protein" },
    { id: "gf", label: "Gluten-Free" },
  ];

  const items = allFilterItems.filter((item) => {
    if (activeFilter === "all") return true;
    return item[activeFilter];
  });

  return (
    <div className="mx-auto mt-10 max-w-5xl">
      <div className="flex flex-wrap items-center justify-center gap-2 px-4">
        {filterPills.map((pill) => {
          const isActive = pill.id === activeFilter;
          return (
            <button
              key={pill.id}
              onClick={() => setActiveFilter(pill.id)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                isActive
                  ? "bg-primary text-black ring-2 ring-primary/45"
                  : "bg-surface border border-black/10 text-foreground hover:bg-muted"
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-black/10 bg-white p-4 sm:p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.name}
              className="flex flex-col justify-between rounded-xl border border-black/[0.06] bg-surface p-5 shadow-xs hover:shadow-md transition-all duration-300"
            >
              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-ink-soft">
                    {item.category}
                  </span>
                  <h3 className="mt-1 font-display text-base font-bold text-foreground">
                    {item.name}
                  </h3>
                </div>
                <span className="chip shrink-0 text-xs font-bold bg-[#FDF9E2] text-amber-900 border border-primary/20">
                  {item.calories} kcal
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3">
                <span className="font-display font-bold text-sm text-foreground">{item.price}</span>
                <Link
                  to={item.link as any}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  View Details <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LocationsMatrix() {
  const topStates = [
    { name: "Georgia", count: 435, slug: "georgia" },
    { name: "North Carolina", count: 182, slug: "north-carolina" },
    { name: "Florida", count: 165, slug: "florida" },
    { name: "Alabama", count: 154, slug: "alabama" },
    { name: "South Carolina", count: 147, slug: "south-carolina" },
    { name: "Texas", count: 110, slug: "texas" },
  ];

  return (
    <div className="mx-auto mt-10 max-w-5xl">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {topStates.map((s) => (
          <Link
            key={s.slug}
            to="/locations/$state"
            params={{ state: s.slug }}
            className="group flex flex-col justify-between rounded-xl border border-black/[0.06] bg-white p-4 text-center shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
          >
            <span className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors">
              {s.name}
            </span>
            <span className="mt-1 inline-flex items-center justify-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
              {s.count} Stores
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          to="/locations"
          className="btn-primary h-12 px-8 text-sm"
        >
          Explore Full Locations Directory <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function PdfDownloadBanner() {
  return (
    <section className="bg-[#0B0C0E] border-t border-white/10">
      <div className="container-editorial py-12 md:py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-[#18191B] to-[#0B0C0E] border border-white/10 p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left max-w-xl">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-500 ring-1 ring-inset ring-amber-500/20">
              Official PDF Menu
            </span>
            <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              Download Waffle House Menu PDF &amp; Print
            </h2>
            <p className="text-sm leading-relaxed text-white/70">
              Want a printable copy of the Waffle House menu? Download the complete, official menu guide with full calories, pricing, and allergen breakdowns in high-resolution PDF format.
            </p>
          </div>
          <a
            href="/waffle-house-menu-nutritionals.pdf"
            download
            className="group shrink-0 inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-8 text-base font-semibold text-black shadow-md transition-all hover:bg-[#E2B000] hover:shadow-lg sm:min-w-[240px]"
          >
            Download PDF Menu
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* HOME PAGE                                                            */
/* ------------------------------------------------------------------ */

function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <HeroSlideshow />

      {/* ============ FLOATING SEARCH ============ */}
      <FloatingSearch />

      {/* ============ 13 MENU CATEGORIES ============ */}
      <section id="menu-categories" aria-labelledby="cats-heading" className="scroll-mt-24">
        <div className="container-editorial pb-14 pt-16 md:pb-20 md:pt-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Our Menu</p>
            <h2
              id="cats-heading"
              className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
            >
              Explore Every Waffle House Menu Category
            </h2>
            <p className="mt-4 text-base text-ink-soft sm:text-lg">
              Browse all 13 official Waffle House menu categories — from the iconic All-Star Special™
              to grilled biscuits, Angus burgers and Southern pecan pie.
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-5 md:gap-x-6 md:gap-y-10">
            {allCategories.map((c) => (
              <li key={c.name}>
                <Link
                  to={c.href as any}
                  aria-label={`Explore ${c.name} menu`}
                  className="group block"
                >
                  <div className="aspect-square w-full overflow-hidden rounded-2xl bg-muted ring-1 ring-transparent transition-all duration-300 ease-out group-hover:shadow-xl group-hover:ring-primary">
                    <img
                      src={c.image}
                      alt={`${c.name} — Waffle House menu category`}
                      loading="lazy"
                      decoding="async"
                      width={900}
                      height={900}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                  <span className="mt-4 block text-center font-display text-sm font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-base">
                    {c.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ============ BREAKFAST FAVORITES CAROUSEL ============ */}
      <section aria-labelledby="breakfast-heading" className="border-t border-border/60 bg-background">
        <div className="container-editorial py-14 md:py-16">
          <SectionHeader
            eyebrow="Served all day"
            title="Breakfast favorites."
            lede="Waffles, eggs and hickory bacon — the plates that made this menu famous."
          />
          <h2 id="breakfast-heading" className="sr-only">Breakfast favorites</h2>
          <RecipeCarousel items={breakfastCarouselItems} />
        </div>
      </section>

      {/* ============ DIETARY FILTERS ============ */}
      <section aria-labelledby="dietary-filters-heading" className="border-t border-border/60 bg-surface">
        <div className="container-editorial py-14 md:py-16">
          <SectionHeader
            eyebrow="Interactive tool"
            title="Dietary &amp; Calorie Menu Finder"
            lede="Filter Waffle House recipes instantly by dietary choices or calorie limits."
          />
          <h2 id="dietary-filters-heading" className="sr-only">Dietary &amp; Calorie Menu Finder</h2>
          <DietaryCalorieFilters />
        </div>
      </section>

      {/* ============ NUTRITION HIGHLIGHT ============ */}
      <NutritionHighlight />

      {/* ============ HEALTHY MENU CHOICES CAROUSEL ============ */}
      <section aria-labelledby="healthy-heading" className="border-t border-border/60 bg-background">
        <div className="container-editorial py-14 md:py-16">
          <SectionHeader
            eyebrow="Lower calorie"
            title="Healthy menu choices."
            lede="Lower-calorie plates and drinks — light options that still feel like a real meal."
          />
          <h2 id="healthy-heading" className="sr-only">Healthy menu choices</h2>
          <RecipeCarousel items={healthyCarouselItems} />
        </div>
      </section>

      {/* ============ BUDGET-FRIENDLY MEALS CAROUSEL ============ */}
      <section aria-labelledby="budget-heading" className="border-t border-border/60 bg-surface">
        <div className="container-editorial py-14 md:py-16">
          <SectionHeader
            eyebrow="Great value"
            title="Budget-friendly meals."
            lede="Real plates under ten dollars — value that still holds up in 2026."
          />
          <h2 id="budget-heading" className="sr-only">Budget-friendly meals</h2>
          <RecipeCarousel items={budgetCarouselItems} />
        </div>
      </section>

      {/* ============ SEASONAL MENU HIGHLIGHTS CAROUSEL ============ */}
      <section aria-labelledby="seasonal-heading" className="border-t border-border/60 bg-background">
        <div className="container-editorial py-14 md:py-16">
          <SectionHeader
            eyebrow="This season"
            title="Seasonal menu highlights."
            lede="What our editors are ordering right now — plates worth going out of your way for."
          />
          <h2 id="seasonal-heading" className="sr-only">Seasonal menu highlights</h2>
          <RecipeCarousel items={seasonalCarouselItems} />
        </div>
      </section>

      {/* ============ RECENTLY UPDATED MENU ITEMS CAROUSEL ============ */}
      <section aria-labelledby="recent-heading" className="border-t border-border/60 bg-surface">
        <div className="container-editorial py-14 md:py-16">
          <SectionHeader
            eyebrow="Freshly reviewed"
            title="Recently updated menu items."
            lede="Newly verified prices, calorie counts and tasting notes from the past month."
          />
          <h2 id="recent-heading" className="sr-only">Recently updated menu items</h2>
          <RecipeCarousel items={recentCarouselItems} />
        </div>
      </section>

      {/* ============ LOCATIONS MATRIX ============ */}
      <section aria-labelledby="locations-matrix-heading" className="border-t border-border/60 bg-background">
        <div className="container-editorial py-14 md:py-16">
          <SectionHeader
            eyebrow="Find a store"
            title="Waffle House State Directory"
            lede="Find your nearest 24-hour Waffle House. Browse restaurants across our top active states."
          />
          <h2 id="locations-matrix-heading" className="sr-only">Waffle House State Directory</h2>
          <LocationsMatrix />
        </div>
      </section>

      {/* ============ EDITORIAL ARTICLES ============ */}
      <section aria-labelledby="articles-heading" className="border-t border-border/60 bg-background">
        <div className="container-editorial py-14 md:py-16">
          <SectionHeader
            eyebrow="Blog"
            title="Latest Articles"
            lede="Long-form writing about the menu — what to order, what to skip, and how to spend under ten dollars without shrinking your plate."
          />
          <h2 id="articles-heading" className="sr-only">Latest Articles</h2>
          <ArticlesLayout />
        </div>
      </section>

      {/* ============ POPULAR SEARCH FILTERS ============ */}
      <section aria-labelledby="popular-heading" className="border-t border-border/60 bg-surface">
        <div className="container-editorial py-14 md:py-16">
          <SectionHeader
            eyebrow="Quick browse"
            title="Popular menu picks by time of day."
            lede="Filter Waffle House staples by breakfast, lunch or dinner to find customer favorites fast."
          />
          <h2 id="popular-heading" className="sr-only">Popular menu picks</h2>
          <PopularSearchFilters />
        </div>
      </section>

      {/* ============ EDITORIAL TRUST ============ */}
      <EditorialTrust />

      {/* ============ FAQ ============ */}
      <HomeFaq />

      {/* ============ PDF MENU CALLOUT ============ */}
      <PdfDownloadBanner />

      {/* ============ UNIFIED SUBSCRIBER SECTION ============ */}
      <SubscriberSection idPrefix="home-sub" />
    </>
  );
}
