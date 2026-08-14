import { createFileRoute } from "@tanstack/react-router";

import omeletsData from "@/data/omelets.json";
import { CategoryMasterView, type MasterItem } from "@/components/category-master-view";

// Section imagery
import introImg from "@/assets/cat-omelets.jpg";
import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/tbone-steak.jpg";
import videoImg4 from "@/assets/breakfast-nutrition-prep.jpg";

// Recipe images
import cheeseOmelet from "@/assets/Cheese_omelet_with_toast_and_202608101203.jpeg";
import hamCheeseOmelet from "@/assets/Omelet_with_ham_and_cheese_202608101205.jpeg";
import fiestaOmelet from "@/assets/Fiesta_omelet_served_with_toast_202608101206.jpeg";
import cheesesteakOmelet from "@/assets/Cheesesteak_omelet_with_toast_an._202608101205.jpeg";

const imageMap: Record<string, string> = {
  "cat-omelets.jpg": introImg,
  "Cheese_omelet_with_toast_and_202608101203.jpeg": cheeseOmelet,
  "Omelet_with_ham_and_cheese_202608101205.jpeg": hamCheeseOmelet,
  "Fiesta_omelet_served_with_toast_202608101206.jpeg": fiestaOmelet,
  "Cheesesteak_omelet_with_toast_an._202608101205.jpeg": cheesesteakOmelet,
};

interface OmeletRawItem {
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
let fiveOmelets: MasterItem[];

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
  rawItems = omeletsData.items as OmeletRawItem[];
  
  items = rawItems.map((i) => ({
    slug: i.slug,
    name: i.name,
    price: i.price,
    calories: i.calories,
    rating: i.rating,
    image: imageMap[i.image] ?? introImg,
    href: `/menu/omelets/${i.slug}`,
  }));
  
  fiveOmelets = [
    {
      slug: "cheese-omelet",
      name: "Cheese Omelet Breakfast",
      price: 7.95,
      calories: 280,
      rating: 4.8,
      image: items[0]?.image ?? introImg,
      href: "/menu/omelets/cheese-omelet",
    },
    {
      slug: "ham-cheese-omelet",
      name: "Ham & Cheese Omelet Breakfast",
      price: 10.75,
      calories: 350,
      rating: 4.9,
      image: items[1]?.image ?? introImg,
      href: "/menu/omelets/ham-cheese-omelet",
    },
    {
      slug: "cheesesteak-omelet",
      name: "Cheesesteak Omelet Breakfast",
      price: 11.50,
      calories: 410,
      rating: 4.9,
      image: items[2]?.image ?? introImg,
      href: "/menu/omelets/cheesesteak-omelet",
    },
    {
      slug: "fiesta-omelet",
      name: "Fiesta Omelet Breakfast",
      price: 10.75,
      calories: 380,
      rating: 4.8,
      image: items[3]?.image ?? introImg,
      href: "/menu/omelets/fiesta-omelet",
    },
    {
      slug: "build-your-own-omelet",
      name: "Build Your Own Omelet Breakfast",
      price: 8.95,
      calories: 180,
      rating: 4.7,
      image: items[0]?.image ?? introImg,
      href: "/menu/omelets/build-your-own-omelet",
    },
  ];
}
const omeletFaqs = [
  {
    question: "How are Toddle House® Omelets cooked at Waffle House?",
    answer: "Two Grade A eggs are whipped fluffy and poured onto the flat-top griddle, folded with melted American cheese and custom fillings like ham, cheesesteak beef, or jalapeños.",
  },
  {
    question: "What sides come with a Toddle House® Omelet?",
    answer: "Every Toddle House® Omelet comes with your choice of buttered toast or grilled biscuit, and a side of hashbrowns, grits, or sliced fresh tomatoes.",
  },
  {
    question: "Can I customize my own omelet at Waffle House?",
    answer: "Yes! The Build Your Own Omelet lets you start with a plain two-egg base and add your choice of meats (bacon, sausage, chicken, ham, cheesesteak) and veggies (onions, tomatoes, jalapeños, mushrooms, cheese).",
  },
  {
    question: "How many calories are in a Cheese Omelet?",
    answer: "A base Cheese Omelet has 280 calories. Served as a complete meal with toast and hashbrowns or grits, total calories range from 500 to 820 kcal.",
  },
  {
    question: "Are Toddle House® Omelets served 24/7?",
    answer: "Yes! All Toddle House® Omelets are cooked fresh to order 24 hours a day, 7 days a week.",
  },
];

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/menu/omelets/")({
  head: () => {
    initData();
    const url = `${SITE}/menu/omelets`;
    const title = "Waffle House Toddle House® Omelets Menu | Prices & Calories 2026";
    const description =
      "Every Waffle House Toddle House® Omelet — Cheese Omelet, Ham & Cheese, Cheesesteak, Fiesta, and Build Your Own — with verified U.S. prices and calorie counts.";
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
              { "@type": "ListItem", position: 3, name: "Toddle House® Omelets", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Waffle House Toddle House® Omelets Menu",
            url,
            inLanguage: "en-US",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Waffle House Toddle House® Omelet recipes",
            numberOfItems: fiveOmelets.length,
            itemListElement: fiveOmelets.map((v, i) => ({
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
      categoryId="omelets"
      introImg={introImg}
      introImgAlt="Waffle House Toddle House® Cheese Omelet with toast and hashbrowns"
      breadcrumbLabel="Toddle House® Omelets"
      h1="The Waffle House Toddle House® Omelets Menu, Cover to Cover."
      featuredName={fiveOmelets[0]?.name ?? "Cheese Omelet Breakfast"}
      intro={
        <>
          <p>
            The Toddle House® Omelets line is Waffle House's signature two-egg omelet menu —
            light, fluffy and folded to order on the flat-top with melted American cheese.
          </p>
          <p className="mt-4">
            Below: every Toddle House® Omelet on the menu with verified 2026 U.S. prices and
            calorie counts.
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "10 Most Popular Omelet Recipes",
        intro:
          "Explore the top-rated Toddle House® omelets, ranked by reader popularity.",
        items: fillToTen(fiveOmelets),
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "Fluffy Two-Egg Omelet Combos",
        intro:
          "Delicious folded omelets packed with ham, cheesesteak beef, jalapeños, and melted cheese.",
        items: fillToTen([...fiveOmelets].reverse()),
      }}
      videos={{
        heading: "Toddle House® Omelets at Waffle House, Behind the Grill",
        intro:
          "Watch how Waffle House whips, cooks, and folds Toddle House® Omelets in these feature videos.",
        items: [
          {
            id: "1",
            title: "How Waffle House Makes Toddle House® Cheese Omelets",
            duration: "4:15",
            youtubeId: "E2nHfbzHDmY",
            videoUrl: "https://www.youtube.com/watch?v=E2nHfbzHDmY",
            image: videoImg1,
          },
          {
            id: "2",
            title: "Waffle House Ham & Cheese Omelet Recipe",
            duration: "5:30",
            youtubeId: "xPFXc7n6b2I",
            videoUrl: "https://www.youtube.com/watch?v=xPFXc7n6b2I",
            image: videoImg2,
          },
          {
            id: "3",
            title: "Copycat Waffle House Cheesesteak Omelet",
            duration: "6:12",
            youtubeId: "7ENUMFsngss",
            videoUrl: "https://www.youtube.com/watch?v=7ENUMFsngss",
            image: videoImg3,
          },
          {
            id: "4",
            title: "Waffle House Fiesta Omelet Taste Test",
            duration: "7:45",
            youtubeId: "y7RyBT2a62U",
            videoUrl: "https://www.youtube.com/watch?v=y7RyBT2a62U",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: "Waffle House Toddle House® Omelets Menu",
        intro:
          "The complete lineup of 5 official Toddle House® Omelets with verified 2026 prices and calorie counts.",
        items: fiveOmelets,
      }}
      faqs={omeletFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix="omelets"
    />
    );
  },
});