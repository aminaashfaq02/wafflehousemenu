import { createFileRoute } from "@tanstack/react-router";

import sidesData from "@/data/sides.json";
import { CategoryMasterView, type MasterItem } from "@/components/category-master-view";

// Section imagery
import introImg from "@/assets/cat-sides.jpg";
import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/tbone-steak.jpg";
import videoImg4 from "@/assets/breakfast-nutrition-prep.jpg";

// Recipe images
import baconStrips from "@/assets/Pork_bacon_strips_on_plate_202608101134.jpeg";
import sausagePatties from "@/assets/Grilled_pork_sausage_patties_on_202608101136.jpeg";
import chickenSausage from "@/assets/Grilled_chicken_sausage_patties_._202608101137.jpeg";
import cityHam from "@/assets/Hickory-smoked_city_ham_on_plate_202608101139.jpeg";
import countryHam from "@/assets/Grilled_country_ham_slice_2K_202608101140.jpeg";
import slicedTomatoes from "@/assets/Sliced_tomatoes_on_plate_2K_202608101133.jpeg";
import gritsBowl from "@/assets/Creamy_grits_bowl_with_toppings_202608101333.jpeg";
import butteredToast from "@/assets/Two_slices_of_buttered_toast_202608101033.jpeg";
import grilledBiscuit from "@/assets/Grilled_buttermilk_biscuit_on_plate_202608101242.jpeg";
import raisinToast from "@/assets/Cinnamon_raisin_toast_slices_2K_202608101038.jpeg";
import texasToast from "@/assets/Grilled_Texas_toast_slice_2K_202608101042.jpeg";
import pecanPie from "@/assets/Pecan_pie_on_dessert_plate_202608101354.jpeg";

const imageMap: Record<string, string> = {
  "cat-sides.jpg": introImg,
  "Pork_bacon_strips_on_plate_202608101134.jpeg": baconStrips,
  "Grilled_pork_sausage_patties_on_202608101136.jpeg": sausagePatties,
  "Grilled_chicken_sausage_patties_._202608101137.jpeg": chickenSausage,
  "Hickory-smoked_city_ham_on_plate_202608101139.jpeg": cityHam,
  "Grilled_country_ham_slice_2K_202608101140.jpeg": countryHam,
  "Sliced_tomatoes_on_plate_2K_202608101133.jpeg": slicedTomatoes,
  "Creamy_grits_bowl_with_toppings_202608101333.jpeg": gritsBowl,
  "Two_slices_of_buttered_toast_202608101033.jpeg": butteredToast,
  "Grilled_buttermilk_biscuit_on_plate_202608101242.jpeg": grilledBiscuit,
  "Cinnamon_raisin_toast_slices_2K_202608101038.jpeg": raisinToast,
  "Grilled_Texas_toast_slice_2K_202608101042.jpeg": texasToast,
  "Pecan_pie_on_dessert_plate_202608101354.jpeg": pecanPie,
};

interface SideRawItem {
  slug: string;
  name: string;
  price: number;
  calories: number;
  rating: number;
  description: string;
  image: string;
}

const rawItems = sidesData.items as SideRawItem[];

export const sideMasterItems: MasterItem[] = rawItems.map((i) => ({
  slug: i.slug,
  name: i.name,
  price: i.price,
  calories: i.calories,
  rating: i.rating,
  image: imageMap[i.image] ?? introImg,
  href: `/menu/sides/${i.slug}`,
}));

export const sideFaqs = [
  {
    question: "What side options are available at Waffle House?",
    answer: "Options include hickory-smoked bacon, pork sausage patties, city ham, country ham, sliced tomatoes, creamy grits, cheese grits, toast, buttermilk biscuits, Bert's Chili™, and fresh pie slices.",
  },
  {
    question: "Are Waffle House pies baked fresh daily?",
    answer: "Yes! Southern Pecan Pie and Triple Chocolate Pie are available by the slice (regular or small portion) 24/7.",
  },
  {
    question: "How many calories are in a Side of Cheese Grits?",
    answer: "A bowl of warm, creamy Cheese Grits contains 140 calories.",
  },
  {
    question: "Are side items served all day?",
    answer: "Yes! All Southern sides, meats, grits, and pies are served 24 hours a day, 7 days a week.",
  },
];

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/menu/sides/")({
  head: () => {
    const url = `${SITE}/menu/sides`;
    const title = "Waffle House Sides, Pies & Desserts Menu | Prices & Calories 2026";
    const description =
      "Every Waffle House Side, Pie & Dessert — Bacon, Sausage, City Ham, Country Ham, Grits, Toast, Biscuit, Bert's Chili™, Southern Pecan Pie, and Triple Chocolate Pie — with 2026 prices and calorie counts.";
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
        { rel: "next", href: `${SITE}/menu/sides/page/2` },
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
              { "@type": "ListItem", position: 3, name: "Sides, Pies & Desserts", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Waffle House Sides, Pies & Desserts Menu",
            url,
            inLanguage: "en-US",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Waffle House Side & Dessert recipes",
            numberOfItems: sideMasterItems.length,
            itemListElement: sideMasterItems.map((v, i) => ({
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
      categoryId="sides"
      introImg={introImg}
      introImgAlt="Waffle House Southern Pecan Pie slice and side dishes"
      breadcrumbLabel="Sides, Pies & Desserts"
      h1="The Waffle House Sides, Pies & Desserts Menu, Cover to Cover."
      featuredName={sideMasterItems[0]?.name ?? "Side Bacon"}
      intro={
        <>
          <p>
            Classic Southern diner sides and house-made pies — from crispy hickory bacon and stone-ground
            cheese grits to classic Southern Pecan Pie and Triple Chocolate Pie slices.
          </p>
          <p className="mt-4">
            Below: every official Side, Pie & Dessert on the menu with verified 2026 U.S. prices and calorie counts (Page 1 of 2).
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "10 Most Popular Southern Sides & Desserts",
        intro:
          "Explore top-rated Waffle House sides, grits bowls, and pie slices, ranked by reader popularity.",
        items: sideMasterItems.slice(0, 10),
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "House-Made Southern Diner Treats",
        intro:
          "Crispy griddled meats, stone-ground grits, biscuits, chili, and sweet bakery pies.",
        items: sideMasterItems.slice(4, 14),
      }}
      videos={{
        heading: "Sides, Pies & Desserts at Waffle House, Behind the Grill",
        intro:
          "Watch how Waffle House cooks sides and serves Southern pies in these feature videos.",
        items: [
          {
            id: "1",
            title: "Waffle House Southern Pecan Pie & Desserts",
            duration: "4:15",
            youtubeId: "Tm9VDrikQok",
            videoUrl: "https://www.youtube.com/watch?v=Tm9VDrikQok",
            image: videoImg1,
          },
          {
            id: "2",
            title: "Waffle House Side Meats & Chili Review",
            duration: "5:30",
            youtubeId: "-XhtVWy7zfo",
            videoUrl: "https://www.youtube.com/watch?v=-XhtVWy7zfo",
            image: videoImg2,
          },
          {
            id: "3",
            title: "How to Make Waffle House Creamy Cheese Grits",
            duration: "6:12",
            youtubeId: "sgciLKPlJyI",
            videoUrl: "https://www.youtube.com/watch?v=sgciLKPlJyI",
            image: videoImg3,
          },
          {
            id: "4",
            title: "Waffle House Triple Chocolate Pie Taste Test",
            duration: "7:45",
            youtubeId: "B8714mF6_Hk",
            videoUrl: "https://www.youtube.com/watch?v=B8714mF6_Hk",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: "Waffle House Sides, Pies & Desserts Menu",
        intro:
          "The complete lineup of 14 official Waffle House sides, pies, and desserts with verified 2026 prices and calorie counts (Page 1 of 2).",
        items: sideMasterItems,
      }}
      faqs={sideFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix="sides"
      activePage={1}
    />
  ),
});
