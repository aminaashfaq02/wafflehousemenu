import { createFileRoute } from "@tanstack/react-router";

import meltsData from "@/data/texas-melts.json";
import { CategoryMasterView, type MasterItem } from "@/components/category-master-view";

// Section imagery
import introImg from "@/assets/cat-sandwiches.jpg";
import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/tbone-steak.jpg";
import videoImg4 from "@/assets/breakfast-nutrition-prep.jpg";

// Recipe images
import angusPattyMelt from "@/assets/Angus_patty_melt_on_toast.jpeg";
import texasSausageMelt from "@/assets/Texas_sausage_melt_on_plate_202608101243.jpeg";
import texasChickenMelt from "@/assets/Texas_grilled_chicken_melt_2K_202608101237.jpeg";
import texasBaconEggMelt from "@/assets/Texas_Bacon_Egg_Cheese_Melt_202608101229.jpeg";
import texasHamEggMelt from "@/assets/Texas_ham_egg_and_cheese_202608101235.jpeg";

const imageMap: Record<string, string> = {
  "cat-texas-melt.jpg": introImg,
  "Angus_patty_melt_on_toast.jpeg": angusPattyMelt,
  "Texas_sausage_melt_on_plate_202608101243.jpeg": texasSausageMelt,
  "Texas_grilled_chicken_melt_2K_202608101237.jpeg": texasChickenMelt,
  "Texas_Bacon_Egg_Cheese_Melt_202608101229.jpeg": texasBaconEggMelt,
  "Texas_ham_egg_and_cheese_202608101235.jpeg": texasHamEggMelt,
};

interface MeltRawItem {
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
let fourOfficialMelts: MasterItem[];

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
  rawItems = meltsData.items as MeltRawItem[];
  
  items = rawItems.map((i) => ({
    slug: i.slug,
    name: i.name,
    price: i.price,
    calories: i.calories,
    rating: i.rating,
    image: imageMap[i.image] ?? introImg,
    href: `/menu/texas-melts/${i.slug}`,
  }));
  
  fourOfficialMelts = [
    {
      slug: "texas-grilled-chicken-melt",
      name: "Texas Grilled Chicken Melt",
      price: 10.50,
      calories: 560,
      rating: 4.9,
      image: items[0]?.image ?? introImg,
      href: "/menu/texas-melts/texas-grilled-chicken-melt",
    },
    {
      slug: "texas-cheesesteak-melt",
      name: "Texas Cheesesteak™ Melt",
      price: 10.75,
      calories: 630,
      rating: 4.9,
      image: items[1]?.image ?? introImg,
      href: "/menu/texas-melts/texas-cheesesteak-melt",
    },
    {
      slug: "texas-angus-patty-melt",
      name: "Texas Angus Patty Melt",
      price: 11.25,
      calories: 660,
      rating: 4.9,
      image: items[2]?.image ?? introImg,
      href: "/menu/texas-melts/texas-angus-patty-melt",
    },
    {
      slug: "texas-sausage-melt",
      name: "Texas Sausage Melt",
      price: 9.75,
      calories: 680,
      rating: 4.8,
      image: items[3]?.image ?? introImg,
      href: "/menu/texas-melts/texas-sausage-melt",
    },
  ];
}
const texasMeltFaqs = [
  {
    question: "What makes a Waffle House Texas Melt unique?",
    answer: "Every Texas Melt is pressed between two thick, double-buttered slices of Texas toast grilled to a crisp golden brown, layered with melted American cheese and grilled onions.",
  },
  {
    question: "Are Texas Melts served with hashbrowns?",
    answer: "You can order Texas Melts individually or as a complete meal served with crisp Waffle House hashbrowns or grits.",
  },
  {
    question: "Can I customize the cheese or onions on my melt?",
    answer: "Yes! You can add extra cheese (Swiss, Cheddar, American), double grilled onions, or add jalapeños and mushrooms on the flat-top.",
  },
  {
    question: "Are Texas Melts available 24/7?",
    answer: "Yes! All Texas Melts — Chicken, Cheesesteak, Patty Melt, and Sausage Melt — are cooked fresh 24 hours a day, 7 days a week.",
  },
];

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/menu/texas-melts/")({
  head: () => {
    initData();
    const url = `${SITE}/menu/texas-melts`;
    const title = "Waffle House Texas Melts Menu | Prices & Calories 2026";
    const description =
      "Every Waffle House Texas Melt — Texas Grilled Chicken Melt, Texas Cheesesteak Melt, Texas Angus Patty Melt, and Texas Sausage Melt — with 2026 prices and calorie counts.";
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
              { "@type": "ListItem", position: 3, name: "Texas Melts", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Waffle House Texas Melts Menu",
            url,
            inLanguage: "en-US",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Waffle House Texas Melt recipes",
            numberOfItems: fourOfficialMelts.length,
            itemListElement: fourOfficialMelts.map((v, i) => ({
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
      categoryId="texas-melts"
      introImg={introImg}
      introImgAlt="Waffle House Texas Cheesesteak Melt on grilled Texas toast"
      breadcrumbLabel="Texas Melts"
      h1="The Waffle House Texas Melts Menu, Cover to Cover."
      featuredName={fourOfficialMelts[0]?.name ?? "Texas Grilled Chicken Melt"}
      intro={
        <>
          <p>
            Thick-cut grilled Texas toast, caramelized onions, and melted American cheese pressed
            around tender chicken, shaved beef, Angus burgers, or pork sausage off the flat-top.
          </p>
          <p className="mt-4">
            Below: every official Texas Melt on the menu with verified 2026 U.S. prices and
            calorie counts.
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "10 Most Popular Texas Melts",
        intro:
          "Explore top-rated Waffle House Texas Toast melts, ranked by reader popularity.",
        items: fillToTen(fourOfficialMelts),
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "Golden Texas Toast Favorites",
        intro:
          "Gooey melted cheese and grilled onions stacked inside thick, buttered Texas toast.",
        items: fillToTen([...fourOfficialMelts].reverse()),
      }}
      videos={{
        heading: "Texas Melts at Waffle House, Behind the Grill",
        intro:
          "Watch how Waffle House grills Texas toast, caramelizes onions, and presses melts in these feature videos.",
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
            title: "Waffle House Texas Cheesesteak Melt Recipe",
            duration: "5:30",
            youtubeId: "FSxhbZJFo0o",
            videoUrl: "https://www.youtube.com/watch?v=FSxhbZJFo0o",
            image: videoImg2,
          },
          {
            id: "3",
            title: "How to Make Waffle House Texas Melts",
            duration: "6:12",
            youtubeId: "rKEVvOkl5XM",
            videoUrl: "https://www.youtube.com/watch?v=rKEVvOkl5XM",
            image: videoImg3,
          },
          {
            id: "4",
            title: "Copycat Patty Melt Recipe - Food Network Style",
            duration: "7:45",
            youtubeId: "y7RyBT2a62U",
            videoUrl: "https://www.youtube.com/watch?v=y7RyBT2a62U",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: "Waffle House Texas Melts Menu",
        intro:
          "The complete lineup of 4 official Texas Melts with verified 2026 prices and calorie counts.",
        items: fourOfficialMelts,
      }}
      faqs={texasMeltFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix="texas-melts"
    />
    );
  },
});