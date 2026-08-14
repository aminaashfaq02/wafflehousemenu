import { createFileRoute } from "@tanstack/react-router";

import burgersData from "@/data/burgers.json";
import { CategoryMasterView, type MasterItem } from "@/components/category-master-view";

// Section imagery
import introImg from "@/assets/cat-angus-burger.jpg";
import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/tbone-steak.jpg";
import videoImg4 from "@/assets/breakfast-nutrition-prep.jpg";

// Recipe images
import classicBurger from "@/assets/Classic_burger_on_white_plate_202608101338.jpeg";
import beefBurger from "@/assets/Beef_burger_on_grilled_bun_202608101340.jpeg";
import grilledChicken from "@/assets/Grilled_chicken_sandwich_on_plate_202608101346.jpeg";
import countryHam from "@/assets/Grilled_country_ham_slice_2K_202608101140.jpeg";
import porkChops from "@/assets/Grilled_pork_chops_with_eggs_202608101201.jpeg";
import sirloinSteak from "@/assets/Sirloin_steak_with_grits_and_202608101346.jpeg";

const imageMap: Record<string, string> = {
  "cat-angus-burger.jpg": introImg,
  "Classic_burger_on_white_plate_202608101338.jpeg": classicBurger,
  "Beef_burger_on_grilled_bun_202608101340.jpeg": beefBurger,
  "Grilled_chicken_sandwich_on_plate_202608101346.jpeg": grilledChicken,
  "Grilled_country_ham_slice_2K_202608101140.jpeg": countryHam,
  "Grilled_pork_chops_with_eggs_202608101201.jpeg": porkChops,
  "Sirloin_steak_with_grits_and_202608101346.jpeg": sirloinSteak,
};

interface BurgerRawItem {
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
let elevenOfficialBurgers: MasterItem[];

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
  rawItems = burgersData.items as BurgerRawItem[];
  
  items = rawItems.map((i) => ({
    slug: i.slug,
    name: i.name,
    price: i.price,
    calories: i.calories,
    rating: i.rating,
    image: imageMap[i.image] ?? introImg,
    href: `/menu/burgers/${i.slug}`,
  }));
  
  elevenOfficialBurgers = [
    {
      slug: "original-angus-hamburger",
      name: "Original Angus Hamburger (2-oz)",
      price: 5.90,
      calories: 315,
      rating: 4.7,
      image: items[0]?.image ?? introImg,
      href: "/menu/burgers/original-angus-hamburger",
    },
    {
      slug: "quarter-pound-angus-hamburger-deluxe",
      name: "Quarter Pound Angus Hamburger Deluxe (4-oz)",
      price: 8.50,
      calories: 455,
      rating: 4.8,
      image: items[1]?.image ?? introImg,
      href: "/menu/burgers/quarter-pound-angus-hamburger-deluxe",
    },
    {
      slug: "quarter-pound-angus-cheeseburger-deluxe",
      name: "Quarter Pound Angus Cheeseburger Deluxe",
      price: 8.50,
      calories: 420,
      rating: 4.9,
      image: items[2]?.image ?? introImg,
      href: "/menu/burgers/quarter-pound-angus-cheeseburger-deluxe",
    },
    {
      slug: "double-angus-quarter-pound-cheeseburger-deluxe",
      name: "Double Angus 1/4 LB Cheeseburger Deluxe",
      price: 10.50,
      calories: 690,
      rating: 4.9,
      image: items[3]?.image ?? introImg,
      href: "/menu/burgers/double-angus-quarter-pound-cheeseburger-deluxe",
    },
    {
      slug: "chicken-dinner-platter",
      name: "Chicken Dinner Platter",
      price: 12.10,
      calories: 415,
      rating: 4.8,
      image: items[4]?.image ?? introImg,
      href: "/menu/burgers/chicken-dinner-platter",
    },
    {
      slug: "meat-lovers-chicken-dinner-platter",
      name: "Meat Lovers Chicken Dinner Platter",
      price: 14.10,
      calories: 520,
      rating: 4.8,
      image: items[5]?.image ?? introImg,
      href: "/menu/burgers/meat-lovers-chicken-dinner-platter",
    },
    {
      slug: "country-ham-dinner-platter",
      name: "Country Ham Dinner Platter",
      price: 13.15,
      calories: 600,
      rating: 4.7,
      image: items[6]?.image ?? introImg,
      href: "/menu/burgers/country-ham-dinner-platter",
    },
    {
      slug: "pork-chop-dinner-platter",
      name: "Pork Chop Dinner Platter",
      price: 13.50,
      calories: 765,
      rating: 4.8,
      image: items[7]?.image ?? introImg,
      href: "/menu/burgers/pork-chop-dinner-platter",
    },
    {
      slug: "meat-lovers-pork-chop-dinner-platter",
      name: "Meat Lovers Pork Chop Dinner Platter",
      price: 15.50,
      calories: 890,
      rating: 4.9,
      image: items[8]?.image ?? introImg,
      href: "/menu/burgers/meat-lovers-pork-chop-dinner-platter",
    },
    {
      slug: "t-bone-steak-dinner-platter",
      name: "T-Bone Steak Dinner Platter",
      price: 15.90,
      calories: 610,
      rating: 4.9,
      image: items[9]?.image ?? introImg,
      href: "/menu/burgers/t-bone-steak-dinner-platter",
    },
    {
      slug: "sirloin-delmonico-steak-dinner-platter",
      name: "Sirloin / Delmonico Steak Dinner Platter",
      price: 12.60,
      calories: 555,
      rating: 4.8,
      image: items[10]?.image ?? introImg,
      href: "/menu/burgers/sirloin-delmonico-steak-dinner-platter",
    },
  ];
}
const burgerFaqs = [
  {
    question: "Are Waffle House burgers made with 100% Angus beef?",
    answer: "Yes! All Waffle House hamburgers and cheeseburgers are made with fresh, 100% USDA Angus beef seared hot on the flat-top grill.",
  },
  {
    question: "What comes with a Waffle House Dinner Platter?",
    answer: "Every Dinner Platter comes with your choice of grill-toasted bread (white, wheat, or Texas toast) and your choice of two dinner sides like hashbrowns, grits, or sliced fresh tomatoes.",
  },
  {
    question: "What does Deluxe mean on a Waffle House burger?",
    answer: "'Deluxe' means your burger is served with fresh crisp lettuce, sliced ripe tomato, onions, and pickles on a toasted bun.",
  },
  {
    question: "Are burgers and dinner platters available 24/7?",
    answer: "Yes! All 100% Angus beef burgers and classic dinner platters are served 24 hours a day, 7 days a week.",
  },
];

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/menu/burgers/")({
  head: () => {
    initData();
    const url = `${SITE}/menu/burgers`;
    const title = "Waffle House 100% Angus Beef Burgers & Dinners Menu | Prices & Calories 2026";
    const description =
      "Every Waffle House 100% Angus Beef Burger & Dinner Platter — Original Hamburger, Cheeseburger Deluxe, Double 1/4 LB, T-Bone Steak, Chicken, Country Ham, and Pork Chop Dinners — with 2026 prices and calorie counts.";
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
              { "@type": "ListItem", position: 3, name: "100% Angus Burgers & Dinners", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Waffle House 100% Angus Beef Burgers & Dinners Menu",
            url,
            inLanguage: "en-US",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Waffle House Angus Burger & Dinner recipes",
            numberOfItems: elevenOfficialBurgers.length,
            itemListElement: elevenOfficialBurgers.map((v, i) => ({
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
      categoryId="burgers"
      introImg={introImg}
      introImgAlt="Waffle House 100% Angus beef cheeseburger deluxe with lettuce and tomato"
      breadcrumbLabel="100% Angus Burgers & Dinners"
      h1="The Waffle House 100% Angus Beef Burgers & Dinners Menu, Cover to Cover."
      featuredName={elevenOfficialBurgers[0]?.name ?? "Original Angus Hamburger (2-oz)"}
      intro={
        <>
          <p>
            Fresh 100% USDA Angus beef burgers and hearty dinner platters cooked flat-top style with
            buttered toast and your choice of two dinner sides.
          </p>
          <p className="mt-4">
            Below: every official Angus Burger and Dinner Platter on the menu with verified 2026 U.S. prices
            and calorie counts.
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "10 Most Popular Burgers & Dinners",
        intro:
          "Explore top-rated Waffle House Angus burgers and dinner platters, ranked by reader popularity.",
        items: fillToTen(elevenOfficialBurgers),
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "Fresh Flat-Top Grill Platters",
        intro:
          "Seared Angus burgers, T-Bone steaks, grilled chicken, country ham, and pork chops.",
        items: fillToTen([...elevenOfficialBurgers].reverse()),
      }}
      videos={{
        heading: "100% Angus Burgers & Dinners at Waffle House, Behind the Grill",
        intro:
          "Watch how Waffle House sears Angus beef patties and grills dinner platters in these feature videos.",
        items: [
          {
            id: "1",
            title: "Waffle House Angus Burgers & Dinner Platters",
            duration: "4:15",
            youtubeId: "LtWP08imxG0",
            videoUrl: "https://www.youtube.com/watch?v=LtWP08imxG0",
            image: videoImg1,
          },
          {
            id: "2",
            title: "Waffle House Double Cheeseburger Deluxe Recipe",
            duration: "5:30",
            youtubeId: "69we9o7Asqc",
            videoUrl: "https://www.youtube.com/watch?v=69we9o7Asqc",
            image: videoImg2,
          },
          {
            id: "3",
            title: "How Waffle House Grills T-Bone Steak Dinners",
            duration: "6:12",
            youtubeId: "7ENUMFsngss",
            videoUrl: "https://www.youtube.com/watch?v=7ENUMFsngss",
            image: videoImg3,
          },
          {
            id: "4",
            title: "Waffle House Pork Chop Dinner Platter Review",
            duration: "7:45",
            youtubeId: "y7RyBT2a62U",
            videoUrl: "https://www.youtube.com/watch?v=y7RyBT2a62U",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: "Waffle House 100% Angus Beef Burgers & Dinners Menu",
        intro:
          "The complete lineup of 11 official Angus burgers and dinner platters with verified 2026 prices and calorie counts.",
        items: elevenOfficialBurgers,
      }}
      faqs={burgerFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix="burgers"
    />
    );
  },
});