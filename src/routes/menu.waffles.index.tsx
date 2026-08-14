import { createFileRoute } from "@tanstack/react-router";

import wafflesData from "@/data/waffles.json";
import { CategoryMasterView, type MasterItem } from "@/components/category-master-view";

import circleIntroImg from "@/assets/waffles-circle-intro.jpg";
import subscribeBgImg from "@/assets/waffles-subscribe-bg.jpg";
import videoImg1 from "@/assets/waffles-intro.jpg";
import videoImg2 from "@/assets/waffles-nutrition.jpg";
import videoImg3 from "@/assets/waffles-video-bg.jpg";
import videoImg4 from "@/assets/hero-waffles.jpg";

// Recipe images
import classicWaffle from "@/assets/Waffle_served_with_syrup_2K_202608101149.jpeg";
import chocolateChipWaffle from "@/assets/Chocolate_chip_waffle_with_butter_202608101149.jpeg";
import pecanWaffle from "@/assets/Sweet_cream_waffle_with_peanut_202608101152.jpeg";
import blueberryWaffle from "@/assets/Blueberry_waffle_with_melting_bu._202608101153.jpeg";

const imageMap: Record<string, string> = {
  "cat-waffles.jpg": circleIntroImg,
  "Waffle_served_with_syrup_2K_202608101149.jpeg": classicWaffle,
  "Chocolate_chip_waffle_with_butter_202608101149.jpeg": chocolateChipWaffle,
  "Sweet_cream_waffle_with_peanut_202608101152.jpeg": pecanWaffle,
  "Blueberry_waffle_with_melting_bu._202608101153.jpeg": blueberryWaffle,
};

interface WaffleItem {
  slug: string;
  name: string;
  price: number;
  calories: number;
  calorieDetails?: string;
  allergens?: string;
  preparation?: string;
  imageDescription?: string;
  rating: number;
  description: string;
  image: string;
}

let rawItems: any[];
let items: MasterItem[];

function fillToTen<T>(arr: T[]): T[] {
  if (!arr || arr.length === 0) return [];
  if (arr.length >= 10) return arr.slice(0, 10);
  const res: T[] = [];
  while (res.length < 10) {
    res.push(...arr);
  }
  return res.slice(0, 10);
}

function initData() {
  if (items) return;
  rawItems = wafflesData.items as WaffleItem[];
  
  items = rawItems.map((i) => ({
    slug: i.slug,
    name: i.name,
    price: i.price,
    calories: i.calories,
    calorieDetails: i.calorieDetails,
    allergens: i.allergens,
    preparation: i.preparation,
    imageDescription: i.imageDescription,
    rating: i.rating,
    image: imageMap[i.image] ?? circleIntroImg,
    href: `/menu/waffles/${i.slug}`,
  }));
}
const SITE = "https://wafflehousemenu.com";

const waffleFaqs = [
  {
    question: "What is the price and calorie count of a Classic Waffle at Waffle House?",
    answer: "A Classic Waffle costs $5.20 and contains 410 calories.",
  },
  {
    question: "How much are specialty waffles like Pecan, Chocolate Chip, Peanut Butter Chip, and Blueberry?",
    answer: "Specialty waffles (Pecan Waffle 560 kcal, Chocolate Chip Waffle 505 kcal, Peanut Butter Chip Waffle 523 kcal, Blueberry Waffle 508 kcal) are priced at $5.45 each.",
  },
  {
    question: "What ingredients and allergens are in Waffle House waffles?",
    answer: "All waffles contain Egg, Milk, Soy, Tree Nuts, and Wheat. The Peanut Butter Chip Waffle also contains Peanuts.",
  },
  {
    question: "How are Waffle House waffles prepared?",
    answer: "Sweet cream waffle batter is poured into preheated commercial waffle irons, baked for 2.5 minutes until golden brown, and served hot with real whipped butter and warm syrup.",
  },
  {
    question: "Can I customize waffle toppings or request extra butter?",
    answer: "Yes, you can request extra whipped butter, extra warm syrup, double pecans, or extra chocolate chips upon ordering.",
  },
];

export const Route = createFileRoute("/menu/waffles/")({
  head: () => {
    initData();
    const url = `${SITE}/menu/waffles`;
    const title = "Waffle House Waffles Menu | Prices & Calories 2026";
    const description =
      "Every Waffle House waffle — Classic, Pecan, Chocolate Chip, Peanut Butter Chip, and Blueberry — with verified 2026 U.S. prices, calorie counts, allergens, and preparation details.";
    const image = `${SITE}${circleIntroImg}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
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
              { "@type": "ListItem", position: 2, name: "Menu", item: `${SITE}/menu` },
              { "@type": "ListItem", position: 3, name: "Waffles", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Waffle House Waffles Menu",
            url,
            inLanguage: "en-US",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Waffle House Waffle recipes",
            numberOfItems: items.length,
            itemListElement: items.map((v, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: v.name,
            })),
          }),
        },
      ],
    };
  },
  component: () => {
    initData();
    return (
    <CategoryMasterView
      categoryId="waffles"
      introImg={circleIntroImg}
      introImgAlt="Golden Waffle House buttermilk waffle with butter and syrup"
      breadcrumbLabel="Waffles"
      h1="The Waffle House Waffles Menu, Cover to Cover."
      featuredName={items[0]?.name ?? "Classic Waffle"}
      intro={
        <>
          <p>
            The waffle is the house original — poured, pressed and finished on
            the same cast-iron waffle irons for over six decades. Crisp at the
            edges, tender at the center, made to order.
          </p>
          <p className="mt-4">
            Below: every waffle on the menu with 2026 U.S. prices, calorie
            counts, allergen details, and preparation guides.
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "10 Most Popular Waffle Recipes",
        intro:
          "Explore top-rated Waffle House waffles and waffle combos, ranked by reader popularity.",
        items: fillToTen(items),
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "Waffle Favorites & Combos",
        intro:
          "Delicious buttermilk waffles, fruit toppings, sweet chips, and waffle breakfast combos.",
        items: fillToTen([...items].reverse()),
      }}
      videos={{
        heading: "Waffles at Waffle House, Behind the Iron",
        intro:
          "Watch how Waffle House waffles are mixed, poured, and griddled to perfection in these feature videos.",
        items: [
          {
            id: "1",
            title: "Waffle House Waffle Recipe: How to Make Their Waffles at Home",
            duration: "4:15",
            youtubeId: "AWvektSRqCo",
            image: videoImg1,
          },
          {
            id: "2",
            title: "Waffle House Waffle Mix Secret Recipe Revealed",
            duration: "5:30",
            youtubeId: "iR64hfkGQeU",
            image: videoImg2,
          },
          {
            id: "3",
            title: "Making Real Waffle House Waffles Step by Step",
            duration: "6:12",
            youtubeId: "6KiZ_u_CkzU",
            image: videoImg3,
          },
          {
            id: "4",
            title: "Copycat Waffle House Waffle Recipe Test & Taste",
            duration: "7:45",
            youtubeId: "iu-LBY6h6bU",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: "Waffle House Waffles Menu",
        intro:
          `The complete lineup of ${items.length} signature Waffle House waffles with verified 2026 prices and calorie counts.`,
        items: items,
      }}
      faqs={waffleFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix="waffles"
    />
    );
  },
});