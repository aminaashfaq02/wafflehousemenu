import { createFileRoute } from "@tanstack/react-router";

import hashbrownsData from "@/data/hashbrowns.json";
import { CategoryMasterView, type MasterItem } from "@/components/category-master-view";

// Section imagery
import introImg from "@/assets/cat-hashbrowns.jpg";
import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/tbone-steak.jpg";
import videoImg4 from "@/assets/breakfast-nutrition-prep.jpg";

// Recipe images
import regularHashbrowns from "@/assets/Crispy_shredded_potato_hashbrowns_2K_202608101306.jpeg";
import largeHashbrowns from "@/assets/Plate_of_potato_hashbrowns_2K_202608101310.jpeg";
import tripleHashbrowns from "@/assets/Shredded_potato_hashbrowns_on_plate_202608101305.jpeg";
import smotheredCovered from "@/assets/Hashbrowns_with_cheese_and_onions_202608101311.jpeg";
import loadedHashbrowns from "@/assets/Loaded_hashbrowns_with_toppings_2K_202608101313.jpeg";

const imageMap: Record<string, string> = {
  "cat-hashbrowns.jpg": introImg,
  "Crispy_shredded_potato_hashbrowns_2K_202608101306.jpeg": regularHashbrowns,
  "Plate_of_potato_hashbrowns_2K_202608101310.jpeg": largeHashbrowns,
  "Shredded_potato_hashbrowns_on_plate_202608101305.jpeg": tripleHashbrowns,
  "Hashbrowns_with_cheese_and_onions_202608101311.jpeg": smotheredCovered,
  "Loaded_hashbrowns_with_toppings_2K_202608101313.jpeg": loadedHashbrowns,
};

interface HashbrownRawItem {
  slug: string;
  name: string;
  price: number;
  calories: number;
  rating: number;
  description: string;
  image: string;
}

const rawItems = hashbrownsData.items as HashbrownRawItem[];

export const hashbrownMasterItems: MasterItem[] = rawItems.map((i) => ({
  slug: i.slug,
  name: i.name,
  price: i.price,
  calories: i.calories,
  rating: i.rating,
  image: imageMap[i.image] ?? introImg,
  href: `/menu/hashbrowns/${i.slug}`,
}));

export const hashbrownFaqs = [
  {
    question: "What does Scattered, Smothered & Covered mean at Waffle House?",
    answer: "'Scattered' means spread out across the flat-top grill until crisp. 'Smothered' adds sautéed yellow onions, and 'Covered' tops it with melted American cheese.",
  },
  {
    question: "What is Hashbrowns All-The-Way?",
    answer: "'All-The-Way' includes all 8 signature menu toppings: onions, cheese, ham, tomatoes, jalapeños, mushrooms, Bert's Chili™, and sausage gravy.",
  },
  {
    question: "How many sizes of Hashbrowns can I order?",
    answer: "Waffle House offers three sizes: Regular (single), Large (double portion), and Triple (triple portion).",
  },
  {
    question: "Can I customize custom toppings on any order?",
    answer: "Yes! You can add any combination of individual toppings to your plain, large, or triple hashbrown order for $0.70 each.",
  },
];

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/menu/hashbrowns/")({
  head: () => {
    const url = `${SITE}/menu/hashbrowns`;
    const title = "Waffle House Hashbrowns Menu | Smothered, Covered & All Toppings 2026";
    const description =
      "Every Waffle House hashbrown order — Plain, Smothered, Covered, Chunked, Diced, Peppered, Capped, Topped with Bert's Chili and All The Way — with 2026 prices and calorie counts.";
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
        { rel: "next", href: `${SITE}/menu/hashbrowns/page/2` },
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
              { "@type": "ListItem", position: 3, name: "Hashbrowns & All Toppings", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Waffle House Hashbrowns & All Toppings Menu",
            url,
            inLanguage: "en-US",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Waffle House Hashbrown recipes",
            numberOfItems: hashbrownMasterItems.length,
            itemListElement: hashbrownMasterItems.map((v, i) => ({
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
      categoryId="hashbrowns"
      introImg={introImg}
      introImgAlt="Waffle House crispy shredded hashbrowns on flat-top griddle"
      breadcrumbLabel="Hashbrowns & Toppings"
      h1="The Waffle House Hashbrowns & All Toppings Menu, Cover to Cover."
      featuredName={hashbrownMasterItems[0]?.name ?? "Regular Hashbrowns (Plain)"}
      intro={
        <>
          <p>
            Shredded real potatoes scattered on a flat-top grill and seared until golden crisp.
            Customize with classic diner toppings: Smothered, Covered, Chunked, Diced, Peppered, Capped, Topped, and Country.
          </p>
          <p className="mt-4">
            Below: every official Hashbrown order and topping on the menu with verified 2026 U.S. prices and calorie counts (Page 1 of 2).
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "10 Most Popular Hashbrown Recipes",
        intro:
          "Explore top-rated Waffle House hashbrown orders and loaded topping combos, ranked by reader popularity.",
        items: hashbrownMasterItems.slice(0, 10),
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "Loaded Hashbrowns & Diner Toppings",
        intro:
          "Crispy griddled potatoes scattered, smothered in onions, covered in cheese, and fully loaded.",
        items: hashbrownMasterItems.slice(3, 13),
      }}
      videos={{
        heading: "Hashbrowns & Toppings at Waffle House, Behind the Grill",
        intro:
          "Watch how Waffle House cooks crispy hashbrowns, sautés onions, and smothers toppings in these feature videos.",
        items: [
          {
            id: "1",
            title: "Waffle House Hashbrowns Lingo & Toppings Explained",
            duration: "4:15",
            youtubeId: "_h0AHCSBX-c",
            videoUrl: "https://www.youtube.com/watch?v=_h0AHCSBX-c",
            image: videoImg1,
          },
          {
            id: "2",
            title: "How to Order Hashbrowns All The Way at Waffle House",
            duration: "5:30",
            youtubeId: "4I9bYSE-d-o",
            videoUrl: "https://www.youtube.com/watch?v=4I9bYSE-d-o",
            image: videoImg2,
          },
          {
            id: "3",
            title: "Crispy Waffle House Hashbrowns at Home",
            duration: "6:12",
            youtubeId: "xcImp-rkcE0",
            videoUrl: "https://www.youtube.com/watch?v=xcImp-rkcE0",
            image: videoImg3,
          },
          {
            id: "4",
            title: "Smothered & Covered Waffle House Hashbrowns Recipe",
            duration: "7:45",
            youtubeId: "3rVJPfAEhi4",
            videoUrl: "https://www.youtube.com/watch?v=3rVJPfAEhi4",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: "Waffle House Hashbrowns & All Toppings Menu",
        intro:
          "The complete lineup of 13 official Waffle House hashbrown orders and toppings with verified 2026 prices and calorie counts (Page 1 of 2).",
        items: hashbrownMasterItems,
      }}
      faqs={hashbrownFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix="hashbrowns"
      activePage={1}
    />
  ),
});
