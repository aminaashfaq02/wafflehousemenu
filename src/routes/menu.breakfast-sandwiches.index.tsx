import { createFileRoute } from "@tanstack/react-router";


import { CategoryMasterView, type MasterItem } from "@/components/category-master-view";

// Section imagery
import introImg from "@/assets/cat-sandwiches.jpg";
import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/tbone-steak.jpg";
import videoImg4 from "@/assets/breakfast-nutrition-prep.jpg";

// Recipe images
import texasBaconEggMelt from "@/assets/Texas_Bacon_Egg_Cheese_Melt_202608101229.jpeg";
import texasSausageMelt from "@/assets/Texas_sausage_melt_on_plate_202608101243.jpeg";
import texasHamEggMelt from "@/assets/Texas_ham_egg_and_cheese_202608101235.jpeg";
import baconEggCheeseBiscuit from "@/assets/Bacon_egg_cheese_biscuit_sandwich_202608101255.jpeg";
import biscuitSausageGravy from "@/assets/Breakfast_biscuit_with_sausage_a._202608101254.jpeg";
import chickenSausageBiscuit from "@/assets/Chicken_sausage_biscuit_with_egg_202608101308.jpeg";

const imageMap: Record<string, string> = {
  "cat-sandwiches.jpg": introImg,
  "Texas_Bacon_Egg_Cheese_Melt_202608101229.jpeg": texasBaconEggMelt,
  "Texas_sausage_melt_on_plate_202608101243.jpeg": texasSausageMelt,
  "Texas_ham_egg_and_cheese_202608101235.jpeg": texasHamEggMelt,
  "Bacon_egg_cheese_biscuit_sandwich_202608101255.jpeg": baconEggCheeseBiscuit,
  "Breakfast_biscuit_with_sausage_a._202608101254.jpeg": biscuitSausageGravy,
  "Chicken_sausage_biscuit_with_egg_202608101308.jpeg": chickenSausageBiscuit,
};

import { sandwichMasterItems, sandwichFaqs } from "@/data/breakfast-sandwiches-mapped";


const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/menu/breakfast-sandwiches/")({
  head: () => {
    const url = `${SITE}/menu/breakfast-sandwiches`;
    const title = "Waffle House Breakfast Sandwiches & Melts Menu | Prices & Calories 2026";
    const description =
      "Every Waffle House Breakfast Sandwich & Melt — Egg & Cheese, Texas Melts, Sausage, Bacon, Chicken Sausage, Ham — with 2026 prices and calorie counts.";
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
        { rel: "next", href: `${SITE}/menu/breakfast-sandwiches/page/2` },
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
              { "@type": "ListItem", position: 3, name: "Breakfast Sandwiches & Melts", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Waffle House Breakfast Sandwiches & Melts Menu",
            url,
            inLanguage: "en-US",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Waffle House Breakfast Sandwich recipes",
            numberOfItems: sandwichMasterItems.length,
            itemListElement: sandwichMasterItems.map((v, i) => ({
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
      categoryId="breakfast-sandwiches"
      introImg={introImg}
      introImgAlt="Waffle House Texas Bacon Egg & Cheese Melt on grilled Texas toast"
      breadcrumbLabel="Breakfast Sandwiches & Melts"
      h1="The Waffle House Breakfast Sandwiches & Melts Menu, Cover to Cover."
      featuredName={sandwichMasterItems[0]?.name ?? "Egg Sandwich"}
      intro={
        <>
          <p>
            Handhelds off the Waffle House flat-top — Grade A eggs, melted American cheese,
            and your choice of hickory bacon, pork sausage, chicken sausage, city ham or grilled steak.
          </p>
          <p className="mt-4">
            Below: every official Breakfast Sandwich & Melt on the menu with verified 2026 U.S. prices
            and calorie counts.
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "10 Most Popular Sandwiches & Melts",
        intro:
          "Explore the top-rated Waffle House breakfast handhelds, ranked by reader popularity.",
        items: sandwichMasterItems.slice(0, 10),
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "Texas Melts & Classic Toast Handhelds",
        intro:
          "Crisp toasted sandwiches and gooey Texas toast melts made fresh on the flat-top.",
        items: sandwichMasterItems.slice(9, 19),
      }}
      videos={{
        heading: "Breakfast Sandwiches & Melts at Waffle House, Behind the Grill",
        intro:
          "Watch how Waffle House cooks eggs, grills meats, and builds melted Texas toast handhelds in these feature videos.",
        items: [
          {
            id: "1",
            title: "Waffle House Texas Bacon Egg Cheese Melt Recipe",
            duration: "4:15",
            youtubeId: "oKS3ZY6ud_I",
            videoUrl: "https://www.youtube.com/watch?v=oKS3ZY6ud_I",
            image: videoImg1,
          },
          {
            id: "2",
            title: "Copycat Waffle House Sausage Egg & Cheese Sandwich",
            duration: "5:30",
            youtubeId: "Jy_tg7Ktqes",
            videoUrl: "https://www.youtube.com/watch?v=Jy_tg7Ktqes",
            image: videoImg2,
          },
          {
            id: "3",
            title: "How to Make Waffle House Melts at Home",
            duration: "6:12",
            youtubeId: "FsMEaCtT3TI",
            videoUrl: "https://www.youtube.com/watch?v=FsMEaCtT3TI",
            image: videoImg3,
          },
          {
            id: "4",
            title: "Waffle House Breakfast Sandwiches Review",
            duration: "7:45",
            youtubeId: "RFPjg24hdSY",
            videoUrl: "https://www.youtube.com/watch?v=RFPjg24hdSY",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: "Waffle House Breakfast Sandwiches & Melts Menu",
        intro:
          "The complete lineup of 19 Waffle House breakfast sandwiches and melts with verified 2026 prices and calorie counts (Page 1 of 2).",
        items: sandwichMasterItems,
      }}
      faqs={sandwichFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix="breakfast-sandwiches"
      activePage={1}
    />
  ),
});
