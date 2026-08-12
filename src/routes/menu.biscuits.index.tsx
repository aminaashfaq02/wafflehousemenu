import { createFileRoute } from "@tanstack/react-router";

import biscuitsData from "@/data/biscuits.json";
import { CategoryMasterView, type MasterItem } from "@/components/category-master-view";

// Section imagery
import introImg from "@/assets/cat-biscuits.jpg";
import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/tbone-steak.jpg";
import videoImg4 from "@/assets/breakfast-nutrition-prep.jpg";

// Recipe images
import grilledBiscuit from "@/assets/Grilled_buttermilk_biscuit_on_plate_202608101242.jpeg";
import biscuitSausageGravy from "@/assets/Breakfast_biscuit_with_sausage_a._202608101254.jpeg";
import chickenSausageBiscuit from "@/assets/Chicken_sausage_biscuit_with_egg_202608101308.jpeg";
import baconBiscuit from "@/assets/Pork_bacon_in_biscuit_2K_202608101247.jpeg";
import hamBiscuit from "@/assets/Buttermilk_biscuits_with_ham_served_202608101251.jpeg";
import baconEggCheeseBiscuit from "@/assets/Bacon_egg_cheese_biscuit_sandwich_202608101255.jpeg";

const imageMap: Record<string, string> = {
  "cat-biscuits.jpg": introImg,
  "Grilled_buttermilk_biscuit_on_plate_202608101242.jpeg": grilledBiscuit,
  "Breakfast_biscuit_with_sausage_a._202608101254.jpeg": biscuitSausageGravy,
  "Chicken_sausage_biscuit_with_egg_202608101308.jpeg": chickenSausageBiscuit,
  "Pork_bacon_in_biscuit_2K_202608101247.jpeg": baconBiscuit,
  "Buttermilk_biscuits_with_ham_served_202608101251.jpeg": hamBiscuit,
  "Bacon_egg_cheese_biscuit_sandwich_202608101255.jpeg": baconEggCheeseBiscuit,
};

interface BiscuitRawItem {
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
let elevenOfficialBiscuits: MasterItem[];

function initData() {
  if (items) return;
  rawItems = biscuitsData.items as BiscuitRawItem[];
  
  items = rawItems.map((i) => ({
    slug: i.slug,
    name: i.name,
    price: i.price,
    calories: i.calories,
    rating: i.rating,
    image: imageMap[i.image] ?? introImg,
    href: `/menu/biscuits/${i.slug}`,
  }));
  
  elevenOfficialBiscuits = [
    {
      slug: "grilled-biscuit",
      name: "Grilled Biscuit",
      price: 2.50,
      calories: 300,
      rating: 4.7,
      image: items[0]?.image ?? introImg,
      href: "/menu/biscuits/grilled-biscuit",
    },
    {
      slug: "biscuit-and-sausage-gravy",
      name: "Biscuit & Sausage Gravy",
      price: 4.75,
      calories: 450,
      rating: 4.9,
      image: items[1]?.image ?? introImg,
      href: "/menu/biscuits/biscuit-and-sausage-gravy",
    },
    {
      slug: "chicken-biscuit",
      name: "Chicken Biscuit",
      price: 5.25,
      calories: 475,
      rating: 4.8,
      image: items[2]?.image ?? introImg,
      href: "/menu/biscuits/chicken-biscuit",
    },
    {
      slug: "sausage-biscuit",
      name: "Sausage Biscuit",
      price: 4.30,
      calories: 430,
      rating: 4.8,
      image: items[3]?.image ?? introImg,
      href: "/menu/biscuits/sausage-biscuit",
    },
    {
      slug: "chicken-sausage-biscuit",
      name: "Chicken Sausage Biscuit",
      price: 3.90,
      calories: 390,
      rating: 4.7,
      image: items[4]?.image ?? introImg,
      href: "/menu/biscuits/chicken-sausage-biscuit",
    },
    {
      slug: "bacon-biscuit",
      name: "Bacon Biscuit",
      price: 3.90,
      calories: 390,
      rating: 4.8,
      image: items[5]?.image ?? introImg,
      href: "/menu/biscuits/bacon-biscuit",
    },
    {
      slug: "city-ham-biscuit",
      name: "City Ham Biscuit (1)",
      price: 4.00,
      calories: 400,
      rating: 4.7,
      image: items[6]?.image ?? introImg,
      href: "/menu/biscuits/city-ham-biscuit",
    },
    {
      slug: "country-ham-biscuits",
      name: "Country Ham Biscuits (2)",
      price: 6.65,
      calories: 640,
      rating: 4.9,
      image: items[7]?.image ?? introImg,
      href: "/menu/biscuits/country-ham-biscuits",
    },
    {
      slug: "sausage-egg-and-cheese-biscuit",
      name: "Sausage, Egg & Cheese Biscuit",
      price: 6.25,
      calories: 625,
      rating: 4.9,
      image: items[8]?.image ?? introImg,
      href: "/menu/biscuits/sausage-egg-and-cheese-biscuit",
    },
    {
      slug: "bacon-egg-and-cheese-biscuit",
      name: "Bacon, Egg & Cheese Biscuit",
      price: 6.00,
      calories: 585,
      rating: 4.9,
      image: items[9]?.image ?? introImg,
      href: "/menu/biscuits/bacon-egg-and-cheese-biscuit",
    },
    {
      slug: "chicken-sausage-egg-and-cheese-biscuit",
      name: "Chicken Sausage, Egg & Cheese Biscuit",
      price: 5.30,
      calories: 530,
      rating: 4.8,
      image: items[10]?.image ?? introImg,
      href: "/menu/biscuits/chicken-sausage-egg-and-cheese-biscuit",
    },
  ];
}
const biscuitFaqs = [
  {
    question: "How are Waffle House biscuits prepared?",
    answer: "Waffle House buttermilk biscuits are baked fresh, buttered, and grilled face-down on the flat-top griddle until crisp and golden brown.",
  },
  {
    question: "What is in Waffle House Sausage Gravy?",
    answer: "Our Southern sausage gravy is a rich, creamy white pepper gravy packed with savory pork sausage crumbles, ladled hot over freshly split grilled biscuits.",
  },
  {
    question: "Can I get an egg and cheese added to any biscuit?",
    answer: "Yes! You can add a Grade A fried egg and melted American cheese to any biscuit sandwich on the flat-top.",
  },
  {
    question: "Are biscuits served 24/7 at Waffle House?",
    answer: "Yes! All biscuit handhelds and biscuits & gravy plates are served 24 hours a day, 7 days a week.",
  },
];

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/menu/biscuits/")({
  head: () => {
    initData();
    const url = `${SITE}/menu/biscuits`;
    const title = "Waffle House Biscuits Menu | Prices & Calories 2026";
    const description =
      "Every Waffle House Biscuit — Grilled Biscuit, Biscuit & Sausage Gravy, Chicken Biscuit, Sausage, Bacon, City Ham, Country Ham, and Egg & Cheese Biscuits — with 2026 prices and calorie counts.";
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
              { "@type": "ListItem", position: 3, name: "Biscuits & Gravy", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Waffle House Biscuits & Gravy Menu",
            url,
            inLanguage: "en-US",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Waffle House Biscuit recipes",
            numberOfItems: elevenOfficialBiscuits.length,
            itemListElement: elevenOfficialBiscuits.map((v, i) => ({
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
      categoryId="biscuits"
      introImg={introImg}
      introImgAlt="Waffle House Southern buttermilk biscuit split and grilled on the flat-top"
      breadcrumbLabel="Biscuits & Gravy"
      h1="The Waffle House Biscuits Menu, Cover to Cover."
      featuredName={elevenOfficialBiscuits[0]?.name ?? "Grilled Biscuit"}
      intro={
        <>
          <p>
            Waffle House buttermilk biscuits are baked fresh, buttered, and grilled face-down on the
            flat-top until crisp and golden brown.
          </p>
          <p className="mt-4">
            Below: every official Biscuit handheld and Biscuits & Gravy plate on the menu with verified 2026 U.S. prices and calorie counts.
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "10 Most Popular Biscuit Recipes",
        intro:
          "Explore the top-rated Waffle House biscuit sandwiches and gravy plates, ranked by reader popularity.",
        items: items,
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "Southern Buttermilk Biscuits & Combos",
        intro:
          "Golden grilled biscuits stuffed with bacon, sausage, chicken, ham, egg, and melted cheese.",
        items: items,
      }}
      videos={{
        heading: "Biscuits & Gravy at Waffle House, Behind the Grill",
        intro:
          "Watch how Waffle House bakes, grills, and covers buttermilk biscuits with sausage gravy in these feature videos.",
        items: [
          {
            id: "1",
            title: "How Waffle House Grills Biscuits",
            duration: "4:15",
            youtubeId: "wl_7AdlZfTg",
            videoUrl: "https://www.youtube.com/watch?v=wl_7AdlZfTg",
            image: videoImg1,
          },
          {
            id: "2",
            title: "Waffle House Biscuit & Gravy Recipe",
            duration: "5:30",
            youtubeId: "DijPv1JOi9g",
            videoUrl: "https://www.youtube.com/watch?v=DijPv1JOi9g",
            image: videoImg2,
          },
          {
            id: "3",
            title: "Copycat Waffle House Chicken Biscuit",
            duration: "6:12",
            youtubeId: "awE_8ZG6DCw",
            videoUrl: "https://www.youtube.com/watch?v=awE_8ZG6DCw",
            image: videoImg3,
          },
          {
            id: "4",
            title: "Waffle House Sausage Egg & Cheese Biscuit Review",
            duration: "7:45",
            youtubeId: "mnhC18_5HM0",
            videoUrl: "https://www.youtube.com/watch?v=mnhC18_5HM0",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: "Waffle House Biscuits & Gravy Menu",
        intro:
          "The complete lineup of 11 official Waffle House biscuits and gravy recipes with verified 2026 prices and calorie counts.",
        items: elevenOfficialBiscuits,
      }}
      faqs={biscuitFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix="biscuits"
    />
    );
  },
});