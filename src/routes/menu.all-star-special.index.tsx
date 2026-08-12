import { createFileRoute } from "@tanstack/react-router";

import allStarData from "@/data/all-star-special.json";
import { CategoryMasterView, type MasterItem } from "@/components/category-master-view";

// Section imagery
import introImg from "@/assets/allstar-intro.jpg";
import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/tbone-steak.jpg";
import videoImg4 from "@/assets/breakfast-nutrition-prep.jpg";

// Recipe images
import scrambledEggsImg from "@/assets/allstar_scrambled_eggs_1786276403171.jpg";
import classicWaffleImg from "@/assets/allstar_classic_waffle_1786276483458.jpg";
import whiteToastImg from "@/assets/allstar-about.jpg";
import wheatToastImg from "@/assets/cat-all-star.jpg";
import raisinToastImg from "@/assets/allstar_raisin_toast_1786276572169.jpg";
import grilledBiscuitImg from "@/assets/allstar_grilled_biscuit_1786276721841.jpg";
import texasToastImg from "@/assets/allstar_texas_toast_1786276835840.jpg";
import gritsImg from "@/assets/allstar_grits_bowl_1786276992209.jpg";
import regularHashbrownsImg from "@/assets/allstar_regular_hashbrowns_1786277145262.jpg";
import slicedTomatoesImg from "@/assets/allstar_sliced_tomatoes_1786277265527.jpg";
import baconImg from "@/assets/allstar_bacon_strips_1786277417235.jpg";
import sausageImg from "@/assets/allstar_sausage_patties_1786277724125.jpg";
import chickenSausageImg from "@/assets/allstar_chicken_sausage_1786277983771.jpg";
import cityHamImg from "@/assets/allstar_city_ham_1786278124084.jpg";
import countryHamImg from "@/assets/allstar_country_ham_1786278308124.jpg";

const imageMap: Record<string, string> = {
  "allstar_scrambled_eggs_1786276403171.jpg": scrambledEggsImg,
  "allstar_classic_waffle_1786276483458.jpg": classicWaffleImg,
  "allstar-about.jpg": whiteToastImg,
  "cat-all-star.jpg": wheatToastImg,
  "allstar_raisin_toast_1786276572169.jpg": raisinToastImg,
  "allstar_grilled_biscuit_1786276721841.jpg": grilledBiscuitImg,
  "allstar_texas_toast_1786276835840.jpg": texasToastImg,
  "allstar_grits_bowl_1786276992209.jpg": gritsImg,
  "allstar_regular_hashbrowns_1786277145262.jpg": regularHashbrownsImg,
  "allstar_sliced_tomatoes_1786277265527.jpg": slicedTomatoesImg,
  "allstar_bacon_strips_1786277417235.jpg": baconImg,
  "allstar_sausage_patties_1786277724125.jpg": sausageImg,
  "allstar_chicken_sausage_1786277983771.jpg": chickenSausageImg,
  "allstar_city_ham_1786278124084.jpg": cityHamImg,
  "allstar_country_ham_1786278308124.jpg": countryHamImg,
};

interface AllStarRawItem {
  slug: string;
  name: string;
  price: number;
  calories: number;
  rating: number;
  description: string;
  image: string;
}

const rawItems = allStarData.items as AllStarRawItem[];

export const allStarMasterItems: MasterItem[] = rawItems.map((i) => ({
  slug: i.slug,
  name: i.name,
  price: i.price,
  calories: i.calories,
  rating: i.rating,
  image: imageMap[i.image] ?? introImg,
  href: `/menu/all-star-special/${i.slug}`,
}));

export const allStarFaqs = [
  {
    question: "What comes with the Waffle House All-Star Special™?",
    answer: "The All-Star Special™ is a complete combo plate including two fresh eggs cooked to order, buttered toast with jelly, your choice of grits or regular hashbrowns (or sliced tomatoes), your choice of bacon, sausage or city/country ham, and a classic golden-brown sweet cream waffle.",
  },
  {
    question: "Can I customize the waffle in my All-Star Special™ combo?",
    answer: "Yes! You can upgrade from the Classic Waffle to Pecan, Chocolate Chip, Peanut Butter Chip, or Blueberry waffles for a small upcharge.",
  },
  {
    question: "How many calories are in a standard All-Star Special™ breakfast?",
    answer: "A standard All-Star Special™ with scrambled eggs, white toast, bacon, hashbrowns and a classic waffle contains approximately 1,045 calories.",
  },
  {
    question: "Is the All-Star Special™ served all day and night?",
    answer: "Yes! The All-Star Special™ is Waffle House's most famous signature combo and is cooked fresh to order 24 hours a day, 7 days a week.",
  },
];

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/menu/all-star-special/")({
  head: () => {
    const url = `${SITE}/menu/all-star-special`;
    const title = "Waffle House All-Star Special™ Menu | Prices & Calories 2026";
    const description =
      "Explore the Waffle House All-Star Special™ breakfast menu — every custom choice of eggs, waffle toppings, breakfast meats, hashbrown sides, and toast with 2026 prices.";
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
      links: [
        { rel: "canonical", href: url },
        { rel: "next", href: `${SITE}/menu/all-star-special/page/2` },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Menu", item: `${SITE}/menu` },
              { "@type": "ListItem", position: 3, name: "All-Star Special", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Waffle House All-Star Special™ Menu",
            url,
            inLanguage: "en-US",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Waffle House All-Star Special recipes",
            numberOfItems: allStarMasterItems.length,
            itemListElement: allStarMasterItems.map((v, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: v.name,
            })),
          }),
        },
      ],
    };
  },
  component: () => (
    <CategoryMasterView
      categoryId="all-star-special"
      introImg={introImg}
      introImgAlt="Waffle House All-Star Special signature breakfast platter"
      breadcrumbLabel="All-Star Special"
      h1="The Waffle House Breakfast All-Star Special™ Menu, Cover to Cover."
      featuredName={allStarMasterItems[0]?.name ?? "2 Eggs - Scrambled"}
      intro={
        <>
          <p>
            The ultimate Waffle House breakfast platter cooked fresh to order — two farm-fresh eggs, toasted bread,
            a side of hashbrowns or grits, bacon, sausage or ham, and a classic sweet cream waffle.
          </p>
          <p className="mt-4">
            Below: every custom choice and ingredient on the All-Star Special™ menu with verified 2026 U.S. prices and calorie counts (Page 1 of 2).
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "10 Most Popular All-Star Plate Choices",
        intro:
          "Explore top-rated All-Star Special combo elements and toppings, ranked by reader popularity.",
        items: allStarMasterItems.slice(0, 10),
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "Fresh Signature Combo Ingredients",
        intro:
          "Fluffy scrambled eggs, sweet cream waffles, toasted slices, crispy hashbrowns, and savory breakfast meats.",
        items: allStarMasterItems.slice(5, 15),
      }}
      videos={{
        heading: "All-Star Special™ at Waffle House, Behind the Counter",
        intro:
          "Watch how Waffle House grills eggs, toasts bread, and pours waffles for the iconic All-Star plate in these feature videos.",
        items: [
          {
            id: "1",
            title: "Waffle House All-Star Special Masterclass",
            duration: "4:15",
            youtubeId: "qKyvOZCRrWE",
            videoUrl: "https://www.youtube.com/watch?v=qKyvOZCRrWE",
            image: videoImg1,
          },
          {
            id: "2",
            title: "Ordering the Ultimate All-Star Breakfast Combo",
            duration: "5:30",
            youtubeId: "ONI9rOeJJlo",
            videoUrl: "https://www.youtube.com/watch?v=ONI9rOeJJlo",
            image: videoImg2,
          },
          {
            id: "3",
            title: "Waffle House Line Cook All-Star Plate Cooking",
            duration: "6:12",
            youtubeId: "UcyYVw_7StQ",
            videoUrl: "https://www.youtube.com/watch?v=UcyYVw_7StQ",
            image: videoImg3,
          },
          {
            id: "4",
            title: "All-Star Special Taste Test & Feast Review",
            duration: "7:45",
            youtubeId: "5JT_LTqgzCE",
            videoUrl: "https://www.youtube.com/watch?v=5JT_LTqgzCE",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: "Waffle House Breakfast All-Star Special™ Menu",
        intro:
          "The complete lineup of 15 official All-Star Special™ elements and options with verified 2026 prices and calorie counts (Page 1 of 2).",
        items: allStarMasterItems,
      }}
      faqs={allStarFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix="all-star"
      activePage={1}
    />
  ),
});
