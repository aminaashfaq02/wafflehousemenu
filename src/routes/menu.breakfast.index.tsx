import { createFileRoute } from "@tanstack/react-router";

import breakfastData from "@/data/breakfast.json";
import { CategoryMasterView, type MasterItem } from "@/components/category-master-view";

// Section imagery
import introImg from "@/assets/cat-egg-breakfasts.jpg";
import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/tbone-steak.jpg";
import videoImg4 from "@/assets/breakfast-nutrition-prep.jpg";

// Recipe images
import hero2Img from "@/assets/hero-2-breakfast.jpg";
import allStarImg from "@/assets/all-star-breakfast.jpg";
import tboneImg from "@/assets/tbone-steak.jpg";
import menuHighlightBreakfastImg from "@/assets/menu-highlight-breakfast.jpg";
import articleBreakfastImg from "@/assets/article-breakfast-plates.jpg";
import nutritionLowcalEggsImg from "@/assets/nutrition-lowcal-eggs.jpg";
import menuHighlightComboImg from "@/assets/menu-highlight-combo.jpg";
import articleHashbrownsImg from "@/assets/article-hashbrowns.jpg";
import hashbrownsImg from "@/assets/hashbrowns.jpg";

const imageMap: Record<string, string> = {
  "hero-2-breakfast.jpg": hero2Img,
  "all-star-breakfast.jpg": allStarImg,
  "tbone-steak.jpg": tboneImg,
  "menu-highlight-breakfast.jpg": menuHighlightBreakfastImg,
  "article-breakfast-plates.jpg": articleBreakfastImg,
  "nutrition-lowcal-eggs.jpg": nutritionLowcalEggsImg,
  "menu-highlight-combo.jpg": menuHighlightComboImg,
  "article-hashbrowns.jpg": articleHashbrownsImg,
  "hashbrowns.jpg": hashbrownsImg,
};

interface BreakfastItem {
  slug: string;
  name: string;
  price: number;
  calories: number;
  rating: number;
  description: string;
  image: string;
}


let rawItems: any[];
let items: MasterItem[];

function initData() {
  if (items) return;
  rawItems = breakfastData.items as BreakfastItem[];
  
  items = rawItems.map((i) => ({
    slug: i.slug,
    name: i.name,
    price: i.price,
    calories: i.calories,
    rating: i.rating,
    image: imageMap[i.image] ?? hero2Img,
    href: `/menu/breakfast/${i.slug}`,
  }));
}
const eggFaqs = [
  {
    question: "How are eggs prepared at Waffle House?",
    answer: "Two Grade A farm-fresh eggs are cracked directly onto the flat-top griddle and cooked fresh to your order — scrambled, fried, over-easy, over-medium, or poached.",
  },
  {
    question: "What comes with an Egg Breakfast or Steak & Eggs meal?",
    answer: "Every Egg Breakfast plate includes two eggs cooked your way, buttered toast with jelly (white, wheat, raisin, Texas toast, or grilled biscuit), and your choice of hashbrowns, grits, or sliced tomatoes.",
  },
  {
    question: "What steak cuts are available for Steak & Eggs?",
    answer: "Waffle House serves USDA Choice T-Bone Steaks, Delmonico Steaks, and Sirloin Steaks, grilled on the flat top to your preferred temperature.",
  },
  {
    question: "How many calories are in a standard 2 Egg Breakfast?",
    answer: "A 2 Egg Breakfast combo with toast and hashbrowns or grits averages 670 calories. Pairing with lean chicken or tomatoes reduces calories to under 550 kcal.",
  },
  {
    question: "Are Egg Breakfasts and Steaks served all day?",
    answer: "Yes! Waffle House serves its entire breakfast and steak menu 24 hours a day, 7 days a week.",
  },
];

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/menu/breakfast/")({
  head: () => {
    initData();
    const url = `${SITE}/menu/breakfast`;
    const title = "Waffle House Egg Breakfasts & Steaks Menu | Prices & Calories 2026";
    const description =
      "Every Waffle House Egg Breakfast & Steak plate — 2 Egg Breakfast, Cheese 'N Eggs, T-Bone & Eggs, Steak & Eggs, Country Ham, Chicken & Pork Chops — with verified U.S. prices and calorie counts.";
    const image = `${SITE}${introImg}`;
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
              { "@type": "ListItem", position: 3, name: "Egg Breakfasts & Steaks", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Waffle House Egg Breakfasts & Steaks Menu",
            url,
            inLanguage: "en-US",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Waffle House Egg Breakfasts & Steaks recipes",
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
      categoryId="breakfast"
      introImg={introImg}
      introImgAlt="Waffle House Two Egg Breakfast plate with eggs, toast, and hashbrowns"
      breadcrumbLabel="Egg Breakfasts & Steaks"
      h1="The Waffle House Egg Breakfasts & Steaks Menu, Cover to Cover."
      featuredName={items[0]?.name ?? "2 Egg Breakfast"}
      intro={
        <>
          <p>
            Two Grade A farm-fresh eggs cooked to order, paired with buttered toast
            and your choice of hashbrowns, grits, or sliced tomatoes. Served with USDA Choice
            steaks, chops, chicken breasts, and cured ham.
          </p>
          <p className="mt-4">
            Below: every Egg Breakfast & Steak plate on the menu with verified 2026 U.S. prices
            and calorie counts.
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "Most Popular Egg & Steak Plates",
        intro:
          "Explore the top-rated Waffle House egg breakfasts, steaks, and meat combos.",
        items: items,
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "Steak, Chicken & Pork Combos",
        intro:
          "Hearty breakfast platters with USDA choice steaks, grilled chicken filets, and center-cut pork chops.",
        items: items,
      }}
      videos={{
        heading: "Egg Breakfasts & Steaks at Waffle House, Behind the Grill",
        intro:
          "Watch how Waffle House cooks eggs, grills steaks, and prepares breakfast platters in these feature videos.",
        items: [
          {
            id: "1",
            title: "How to Make Waffle House Eggs at Home",
            duration: "4:15",
            youtubeId: "iu-LBY6h6bU",
            videoUrl: "https://www.youtube.com/watch?v=iu-LBY6h6bU",
            image: videoImg1,
          },
          {
            id: "2",
            title: "Waffle House Wagyu. Steak, Eggs and Hash Browns, the perfect breakfast.",
            duration: "5:30",
            youtubeId: "HOENc4d9JTQ",
            videoUrl: "https://www.youtube.com/watch?v=HOENc4d9JTQ",
            image: videoImg2,
          },
          {
            id: "3",
            title: "Waffle House Egg Breakfasts & Steaks Recipe",
            duration: "6:12",
            youtubeId: "phLn93jNbe8",
            videoUrl: "https://www.youtube.com/watch?v=phLn93jNbe8",
            image: videoImg3,
          },
          {
            id: "4",
            title: "How Waffle House Cooks Eggs & Steaks",
            duration: "7:45",
            youtubeId: "AWvektSRqCo",
            videoUrl: "https://www.youtube.com/watch?v=AWvektSRqCo",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: "Waffle House Egg Breakfasts & Steaks Menu",
        intro:
          "The complete lineup of 9 Waffle House egg breakfasts and steaks with verified 2026 prices and calorie counts.",
        items: items,
      }}
      faqs={eggFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix="breakfast"
    />
    );
  },
});