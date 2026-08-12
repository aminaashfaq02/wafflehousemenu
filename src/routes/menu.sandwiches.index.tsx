import { createFileRoute } from "@tanstack/react-router";

import sandwichesData from "@/data/sandwiches.json";
import { CategoryMasterView, type MasterItem } from "@/components/category-master-view";

// Section imagery
import introImg from "@/assets/cat-sandwiches.jpg";
import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/tbone-steak.jpg";
import videoImg4 from "@/assets/breakfast-nutrition-prep.jpg";

// Recipe images
import grilledChickenSandwich from "@/assets/Grilled_chicken_sandwich_on_plate_202608101346.jpeg";
import texasChickenMelt from "@/assets/Texas_grilled_chicken_melt_2K_202608101237.jpeg";
import eggCheeseSandwich from "@/assets/Egg_and_cheese_sandwich_on_202608101210.jpeg";
import grilledHamSandwich from "@/assets/Grilled_ham_sandwich_on_plate_202608101230.jpeg";
import bltSandwichHalf from "@/assets/BLT_sandwich_cut_in_half_202608101351.jpeg";
import texasBltSandwich from "@/assets/Texas_toast_BLT_sandwich_2K_202608101353.jpeg";
import angusPattyMelt from "@/assets/Angus_patty_melt_on_toast.jpeg";
import texasSausageMelt from "@/assets/Texas_sausage_melt_on_plate_202608101243.jpeg";

const imageMap: Record<string, string> = {
  "cat-sandwiches.jpg": introImg,
  "Grilled_chicken_sandwich_on_plate_202608101346.jpeg": grilledChickenSandwich,
  "Texas_grilled_chicken_melt_2K_202608101237.jpeg": texasChickenMelt,
  "Egg_and_cheese_sandwich_on_202608101210.jpeg": eggCheeseSandwich,
  "Grilled_ham_sandwich_on_plate_202608101230.jpeg": grilledHamSandwich,
  "BLT_sandwich_cut_in_half_202608101351.jpeg": bltSandwichHalf,
  "Texas_toast_BLT_sandwich_2K_202608101353.jpeg": texasBltSandwich,
  "Angus_patty_melt_on_toast.jpeg": angusPattyMelt,
  "Texas_sausage_melt_on_plate_202608101243.jpeg": texasSausageMelt,
};

interface SandwichRawItem {
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
let sevenOfficialSandwiches: MasterItem[];

function initData() {
  if (items) return;
  rawItems = sandwichesData.items as SandwichRawItem[];
  
  items = rawItems.map((i) => ({
    slug: i.slug,
    name: i.name,
    price: i.price,
    calories: i.calories,
    rating: i.rating,
    image: imageMap[i.image] ?? introImg,
    href: `/menu/sandwiches/${i.slug}`,
  }));
  
  sevenOfficialSandwiches = [
    {
      slug: "grilled-chicken-sandwich-deluxe",
      name: "Grilled Chicken Sandwich Deluxe",
      price: 9.25,
      calories: 380,
      rating: 4.7,
      image: items[0]?.image ?? introImg,
      href: "/menu/sandwiches/grilled-chicken-sandwich-deluxe",
    },
    {
      slug: "grilled-chicken-bacon-cheese-sandwich-deluxe",
      name: "Grilled Chicken Bacon Cheese Sandwich Deluxe",
      price: 10.50,
      calories: 420,
      rating: 4.9,
      image: items[1]?.image ?? introImg,
      href: "/menu/sandwiches/grilled-chicken-bacon-cheese-sandwich-deluxe",
    },
    {
      slug: "grilled-cheese-sandwich",
      name: "Grilled Cheese Sandwich",
      price: 6.50,
      calories: 275,
      rating: 4.6,
      image: items[2]?.image ?? introImg,
      href: "/menu/sandwiches/grilled-cheese-sandwich",
    },
    {
      slug: "waffle-sandwich-ham-and-cheese-on-wheat",
      name: "Waffle Sandwich (Ham & Cheese on Wheat)",
      price: 8.75,
      calories: 270,
      rating: 4.7,
      image: items[3]?.image ?? introImg,
      href: "/menu/sandwiches/waffle-sandwich-ham-and-cheese-on-wheat",
    },
    {
      slug: "ham-and-cheese-sandwich-lettuce-tomato",
      name: "Ham & Cheese Sandwich (Lettuce & Tomato)",
      price: 8.75,
      calories: 400,
      rating: 4.7,
      image: items[4]?.image ?? introImg,
      href: "/menu/sandwiches/ham-and-cheese-sandwich-lettuce-tomato",
    },
    {
      slug: "blt-sandwich",
      name: "BLT Sandwich",
      price: 8.50,
      calories: 350,
      rating: 4.8,
      image: items[5]?.image ?? introImg,
      href: "/menu/sandwiches/blt-sandwich",
    },
    {
      slug: "texas-bacon-lovers-blt-sandwich",
      name: "Texas Bacon Lover's BLT Sandwich",
      price: 10.25,
      calories: 520,
      rating: 4.9,
      image: items[6]?.image ?? introImg,
      href: "/menu/sandwiches/texas-bacon-lovers-blt-sandwich",
    },
  ];
}
const sandwichFaqs = [
  {
    question: "What bread options are available for Waffle House Sandwiches?",
    answer: "You can choose between toasted white bread, whole wheat bread, raisin toast, or thick, buttery grilled Texas toast.",
  },
  {
    question: "How is the Waffle House Grilled Cheese made?",
    answer: "Two slices of white or wheat bread are stuffed with American cheese slices and butter-griddled face-down on the flat-top until golden brown and melted through.",
  },
  {
    question: "How many strips of bacon are in the Texas Bacon Lover's BLT?",
    answer: "The Texas Bacon Lover's BLT comes loaded with 5 full strips of crispy hickory-smoked bacon, fresh lettuce, ripe tomato, and mayo on Texas toast.",
  },
  {
    question: "Are classic lunch and dinner sandwiches served 24/7?",
    answer: "Yes! All Waffle House classic sandwiches, BLTs, and grilled chicken handhelds are cooked fresh 24 hours a day, 7 days a week.",
  },
];

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/menu/sandwiches/")({
  head: () => {
    initData();
    const url = `${SITE}/menu/sandwiches`;
    const title = "Waffle House Classic Lunch & Dinner Sandwiches Menu | Prices & Calories 2026";
    const description =
      "Every Waffle House Classic Lunch & Dinner Sandwich — Grilled Chicken Deluxe, Grilled Chicken Bacon Cheese, Grilled Cheese, Ham & Cheese, BLT, and Texas Bacon Lover's BLT — with 2026 prices and calorie counts.";
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
              { "@type": "ListItem", position: 3, name: "Classic Lunch & Dinner Sandwiches", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Waffle House Classic Lunch & Dinner Sandwiches Menu",
            url,
            inLanguage: "en-US",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Waffle House Classic Lunch & Dinner Sandwich recipes",
            numberOfItems: sevenOfficialSandwiches.length,
            itemListElement: sevenOfficialSandwiches.map((v, i) => ({
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
      categoryId="sandwiches"
      introImg={introImg}
      introImgAlt="Waffle House Classic Grilled Cheese and BLT Sandwiches"
      breadcrumbLabel="Classic Sandwiches"
      h1="The Waffle House Classic Sandwiches Menu, Cover to Cover."
      featuredName={sevenOfficialSandwiches[0]?.name ?? "Grilled Chicken Sandwich Deluxe"}
      intro={
        <>
          <p>
            Real diner sandwiches grilled fresh to order on the flat-top — juicy grilled chicken breast,
            crispy bacon BLTs, grilled ham & cheese, and buttered grilled cheese.
          </p>
          <p className="mt-4">
            Below: every official Classic Lunch & Dinner Sandwich on the menu with verified 2026 U.S. prices
            and calorie counts.
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "10 Most Popular Classic Sandwiches",
        intro:
          "Explore top-rated Waffle House lunch and dinner sandwiches, ranked by reader popularity.",
        items: items,
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "Flat-Top Griddled Handhelds",
        intro:
          "Golden toasted sandwiches stuffed with chicken, bacon, ham, and melted cheese.",
        items: items,
      }}
      videos={{
        heading: "Classic Sandwiches at Waffle House, Behind the Grill",
        intro:
          "Watch how Waffle House grills sandwiches and builds BLTs in these feature videos.",
        items: [
          {
            id: "1",
            title: "How to Make Waffle House Grilled Cheese Sandwich",
            duration: "4:15",
            youtubeId: "0UUcDlVzfys",
            videoUrl: "https://www.youtube.com/watch?v=0UUcDlVzfys",
            image: videoImg1,
          },
          {
            id: "2",
            title: "Copycat Waffle House BLT & Texas BLT Sandwich",
            duration: "5:30",
            youtubeId: "J0SxUE8LVwM",
            videoUrl: "https://www.youtube.com/watch?v=J0SxUE8LVwM",
            image: videoImg2,
          },
          {
            id: "3",
            title: "Waffle House Grilled Chicken Deluxe Sandwich",
            duration: "6:12",
            youtubeId: "I2nN6Me3vbU",
            videoUrl: "https://www.youtube.com/watch?v=I2nN6Me3vbU",
            image: videoImg3,
          },
          {
            id: "4",
            title: "Waffle House Classic Sandwiches Review",
            duration: "7:45",
            youtubeId: "Ggxpo7ocflA",
            videoUrl: "https://www.youtube.com/watch?v=Ggxpo7ocflA",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: "Waffle House Classic Lunch & Dinner Sandwiches Menu",
        intro:
          "The complete lineup of 7 official Waffle House classic sandwiches with verified 2026 prices and calorie counts.",
        items: sevenOfficialSandwiches,
      }}
      faqs={sandwichFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix="sandwiches"
    />
    );
  },
});