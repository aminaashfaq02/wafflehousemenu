import { createFileRoute } from "@tanstack/react-router";

import beveragesData from "@/data/beverages.json";
import { CategoryMasterView, type MasterItem } from "@/components/category-master-view";

// Section imagery
import introImg from "@/assets/cat-beverages.jpg";
import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/tbone-steak.jpg";
import videoImg4 from "@/assets/breakfast-nutrition-prep.jpg";

// Recipe images
import coffeeSaucer from "@/assets/Steaming_coffee_on_diner_saucer_202608101413.jpeg";
import coffeeSaucerDark from "@/assets/Steaming_coffee_on_diner_saucer_202608101414.jpeg";
import glassOrangeJuice from "@/assets/Glass_filled_with_orange_juice_202608101414.jpeg";
import pecanPie from "@/assets/Pecan_pie_on_dessert_plate_202608101354.jpeg";
import popularDrinks from "@/assets/popular-drinks.jpg";

const imageMap: Record<string, string> = {
  "cat-beverages.jpg": introImg,
  "Steaming_coffee_on_diner_saucer_202608101413.jpeg": coffeeSaucer,
  "Steaming_coffee_on_diner_saucer_202608101414.jpeg": coffeeSaucerDark,
  "Glass_filled_with_orange_juice_202608101414.jpeg": glassOrangeJuice,
  "Pecan_pie_on_dessert_plate_202608101354.jpeg": pecanPie,
  "popular-drinks.jpg": popularDrinks,
};

interface BeverageRawItem {
  slug: string;
  name: string;
  price: number;
  calories: number;
  rating: number;
  description: string;
  image: string;
}

const rawItems = beveragesData.items as BeverageRawItem[];

export const beverageMasterItems: MasterItem[] = rawItems.map((i) => ({
  slug: i.slug,
  name: i.name,
  price: i.price,
  calories: i.calories,
  rating: i.rating,
  image: imageMap[i.image] ?? introImg,
  href: `/menu/beverages/${i.slug}`,
}));

export const beverageFaqs = [
  {
    question: "Is Waffle House coffee bottomless?",
    answer: "Yes! When you order Classic Blend, Dark Roast, or Decaf Coffee, your server provides unlimited free refills during your diner stay.",
  },
  {
    question: "What is Alice's Teamonade™?",
    answer: "Alice's Teamonade™ is a signature 50/50 blend of Waffle House sweet iced tea and lemonade served cold over ice.",
  },
  {
    question: "What soda options are available at Waffle House?",
    answer: "Fountain sodas include Coca-Cola®, Diet Coke®, Sprite®, Pibb Xtra®, Barq's® Root Beer, and Hi-C® Fruit Punch.",
  },
  {
    question: "Are hot and cold drinks served 24/7?",
    answer: "Yes! Coffee, sweet tea, juices, sodas, and milk are served 24 hours a day, 7 days a week.",
  },
];

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/menu/beverages/")({
  head: () => {
    const url = `${SITE}/menu/beverages`;
    const title = "Waffle House Beverages Menu | Coffee, Tea, Juices & Sodas 2026";
    const description =
      "Every Waffle House Hot & Cold Drink — Classic Coffee, Alice's Iced Tea™, Teamonade™, Simply Juices, Coca-Cola® fountain sodas, and Chocolate Milk — with verified 2026 prices and calorie counts.";
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
        { rel: "next", href: `${SITE}/menu/beverages/page/2` },
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
              { "@type": "ListItem", position: 3, name: "Beverages (Hot & Cold Drinks)", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Waffle House Beverages Menu",
            url,
            inLanguage: "en-US",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Waffle House Beverage recipes",
            numberOfItems: beverageMasterItems.length,
            itemListElement: beverageMasterItems.map((v, i) => ({
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
      categoryId="beverages"
      introImg={introImg}
      introImgAlt="Waffle House signature coffee mug and iced beverages"
      breadcrumbLabel="Beverages (Hot & Cold Drinks)"
      h1="The Waffle House Beverages Menu, Cover to Cover."
      featuredName={beverageMasterItems[0]?.name ?? "Classic Blend Coffee"}
      intro={
        <>
          <p>
            Hot coffee, Southern sweet tea, fresh juices, fountain sodas, and cold milk — brewed fresh
            and served ice-cold or piping hot 24/7.
          </p>
          <p className="mt-4">
            Below: every official Hot & Cold Drink on the menu with verified 2026 U.S. prices and calorie counts (Page 1 of 2).
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "10 Most Popular Hot & Cold Drinks",
        intro:
          "Explore top-rated Waffle House beverages, ranked by reader popularity.",
        items: beverageMasterItems.slice(0, 10),
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "Fresh Brews & Fountain Drinks",
        intro:
          "Bottomless diner coffee, Alice's Iced Tea™, fruit juices, and cold chocolate milk.",
        items: beverageMasterItems.slice(10, 20),
      }}
      videos={{
        heading: "Beverages at Waffle House, Behind the Counter",
        intro:
          "Watch how Waffle House brews signature coffee and prepares iced tea in these feature videos.",
        items: [
          {
            id: "1",
            title: "Waffle House Signature Coffee & Brews",
            duration: "4:15",
            youtubeId: "bxPwC8qSHtA",
            videoUrl: "https://www.youtube.com/watch?v=bxPwC8qSHtA",
            image: videoImg1,
          },
          {
            id: "2",
            title: "Alice's Iced Tea & Teamonade Recipe",
            duration: "5:30",
            youtubeId: "cGtAyuLk1N4",
            videoUrl: "https://www.youtube.com/watch?v=cGtAyuLk1N4",
            image: videoImg2,
          },
          {
            id: "3",
            title: "Waffle House Fountain Drinks & Juices",
            duration: "6:12",
            youtubeId: "tpeUqre_KuQ",
            videoUrl: "https://www.youtube.com/watch?v=tpeUqre_KuQ",
            image: videoImg3,
          },
          {
            id: "4",
            title: "Waffle House Coffee & Beverage Menu Overview",
            duration: "7:45",
            youtubeId: "A-X9FML_Vno",
            videoUrl: "https://www.youtube.com/watch?v=A-X9FML_Vno",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: "Waffle House Beverages (Hot & Cold Drinks) Menu",
        intro:
          "The complete lineup of 21 official Waffle House hot and cold drinks with verified 2026 prices and calorie counts (Page 1 of 2).",
        items: beverageMasterItems,
      }}
      faqs={beverageFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix="beverages"
      activePage={1}
    />
  ),
});
