import { createFileRoute } from "@tanstack/react-router";

import bowlsData from "@/data/hashbrown-bowls.json";
import { CategoryMasterView, type MasterItem } from "@/components/category-master-view";

// Section imagery
import introImg from "@/assets/cat-breakfast-bowl.jpg";
import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/tbone-steak.jpg";
import videoImg4 from "@/assets/breakfast-nutrition-prep.jpg";

// Recipe images
import sausageBowl from "@/assets/Bowl_of_hashbrowns_and_eggs_202608101324.jpeg";
import baconBowl from "@/assets/Hashbrown_bowl_with_eggs_and_202608101318.jpeg";
import hamBowl from "@/assets/Hashbrown_bowl_with_eggs_and_202608101322.jpeg";
import cheesesteakBowl from "@/assets/Bowl_with_hashbrowns_and_beef_202608101325.jpeg";

const imageMap: Record<string, string> = {
  "cat-breakfast-bowl.jpg": introImg,
  "Bowl_of_hashbrowns_and_eggs_202608101324.jpeg": sausageBowl,
  "Hashbrown_bowl_with_eggs_and_202608101318.jpeg": baconBowl,
  "Hashbrown_bowl_with_eggs_and_202608101322.jpeg": hamBowl,
  "Bowl_with_hashbrowns_and_beef_202608101325.jpeg": cheesesteakBowl,
};

interface BowlRawItem {
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
let tenOfficialBowls: MasterItem[];

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
  rawItems = bowlsData.items as BowlRawItem[];
  
  items = rawItems.map((i) => ({
    slug: i.slug,
    name: i.name,
    price: i.price,
    calories: i.calories,
    rating: i.rating,
    image: imageMap[i.image] ?? introImg,
    href: `/menu/hashbrown-bowls/${i.slug}`,
  }));
  
  tenOfficialBowls = [
    {
      slug: "sausage-egg-cheese-hashbrown-bowl",
      name: "Sausage Egg & Cheese Hashbrown Bowl",
      price: 10.30,
      calories: 860,
      rating: 4.9,
      image: items[0]?.image ?? introImg,
      href: "/menu/hashbrown-bowls/sausage-egg-cheese-hashbrown-bowl",
    },
    {
      slug: "chicken-sausage-egg-cheese-hashbrown-bowl",
      name: "Chicken Sausage Egg & Cheese Hashbrown Bowl",
      price: 10.30,
      calories: 840,
      rating: 4.8,
      image: items[1]?.image ?? introImg,
      href: "/menu/hashbrown-bowls/chicken-sausage-egg-cheese-hashbrown-bowl",
    },
    {
      slug: "bacon-egg-cheese-hashbrown-bowl",
      name: "Bacon Egg & Cheese Hashbrown Bowl",
      price: 10.30,
      calories: 735,
      rating: 4.9,
      image: items[2]?.image ?? introImg,
      href: "/menu/hashbrown-bowls/bacon-egg-cheese-hashbrown-bowl",
    },
    {
      slug: "ham-egg-cheese-hashbrown-bowl",
      name: "Ham Egg & Cheese Hashbrown Bowl",
      price: 10.30,
      calories: 725,
      rating: 4.8,
      image: items[3]?.image ?? introImg,
      href: "/menu/hashbrown-bowls/ham-egg-cheese-hashbrown-bowl",
    },
    {
      slug: "cheesesteak-melt-hashbrown-bowl",
      name: "Cheesesteak Melt Hashbrown Bowl",
      price: 11.85,
      calories: 742,
      rating: 4.9,
      image: items[0]?.image ?? introImg,
      href: "/menu/hashbrown-bowls/cheesesteak-melt-hashbrown-bowl",
    },
    {
      slug: "chicken-melt-hashbrown-bowl",
      name: "Chicken Melt Hashbrown Bowl",
      price: 11.85,
      calories: 682,
      rating: 4.8,
      image: items[1]?.image ?? introImg,
      href: "/menu/hashbrown-bowls/chicken-melt-hashbrown-bowl",
    },
    {
      slug: "sausage-egg-cheese-grits-bowl",
      name: "Sausage Egg & Cheese Grits Bowl",
      price: 10.30,
      calories: 685,
      rating: 4.8,
      image: items[2]?.image ?? introImg,
      href: "/menu/hashbrown-bowls/sausage-egg-cheese-grits-bowl",
    },
    {
      slug: "bacon-egg-cheese-grits-bowl",
      name: "Bacon Egg & Cheese Grits Bowl",
      price: 10.30,
      calories: 560,
      rating: 4.8,
      image: items[3]?.image ?? introImg,
      href: "/menu/hashbrown-bowls/bacon-egg-cheese-grits-bowl",
    },
    {
      slug: "ham-egg-cheese-grits-bowl",
      name: "Ham Egg & Cheese Grits Bowl",
      price: 10.30,
      calories: 550,
      rating: 4.7,
      image: items[0]?.image ?? introImg,
      href: "/menu/hashbrown-bowls/ham-egg-cheese-grits-bowl",
    },
    {
      slug: "build-your-own-custom-bowl",
      name: "Build-Your-Own Custom Bowl",
      price: 10.30,
      calories: 750,
      rating: 4.9,
      image: items[1]?.image ?? introImg,
      href: "/menu/hashbrown-bowls/build-your-own-custom-bowl",
    },
  ];
}
const bowlFaqs = [
  {
    question: "What is the difference between a Hashbrown Bowl and a Grits Bowl?",
    answer: "A Hashbrown Bowl starts with a base of large crispy griddled hashbrowns, while a Grits Bowl starts with hot, creamy stone-ground hominy grits. Both are topped with scrambled eggs, melted American cheese, and your choice of grilled meats.",
  },
  {
    question: "Can I customize the toppings on a Hashbrown or Grits Bowl?",
    answer: "Yes! You can add extra cheese, grilled onions (Smothered), jalapeños (Peppered), mushrooms (Capped), or Bert's Chili (Topped) to any bowl.",
  },
  {
    question: "Are Hashbrown Bowls served for both Breakfast & Lunch?",
    answer: "Yes! All Waffle House Hashbrown Bowls and Grits Bowls are prepared fresh to order 24 hours a day, 7 days a week.",
  },
  {
    question: "How many eggs are included in a Breakfast Hashbrown Bowl?",
    answer: "Every Breakfast Hashbrown & Grits Bowl comes with two fresh Grade A eggs scrambled right on the flat-top grill.",
  },
];

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/menu/hashbrown-bowls/")({
  head: () => {
    initData();
    const url = `${SITE}/menu/hashbrown-bowls`;
    const title = "Waffle House Hashbrown & Grits Bowls Menu | Prices & Calories 2026";
    const description =
      "Every Waffle House Hashbrown & Grits Bowl — Sausage Egg & Cheese, Bacon, Ham, Chicken Sausage, Cheesesteak Melt, and Chicken Melt Bowls — with 2026 prices and calorie counts.";
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
              { "@type": "ListItem", position: 3, name: "Hashbrown & Grits Bowls", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Waffle House Hashbrown & Grits Bowls Menu",
            url,
            inLanguage: "en-US",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Waffle House Hashbrown & Grits Bowl recipes",
            numberOfItems: tenOfficialBowls.length,
            itemListElement: tenOfficialBowls.map((v, i) => ({
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
      categoryId="hashbrown-bowls"
      introImg={introImg}
      introImgAlt="Waffle House Sausage Egg & Cheese Hashbrown Bowl"
      breadcrumbLabel="Hashbrown & Grits Bowls"
      h1="The Waffle House Hashbrown & Grits Bowls Menu, Cover to Cover."
      featuredName={tenOfficialBowls[0]?.name ?? "Sausage Egg & Cheese Hashbrown Bowl"}
      intro={
        <>
          <p>
            Crispy griddled hashbrowns or creamy Southern grits layered with scrambled eggs,
            melted American cheese, and your choice of sausage, bacon, ham, chicken, or cheesesteak.
          </p>
          <p className="mt-4">
            Below: every official Hashbrown Bowl and Grits Bowl on the menu with verified 2026 U.S. prices
            and calorie counts.
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "10 Most Popular Hashbrown & Grits Bowls",
        intro:
          "Explore top-rated Waffle House breakfast & lunch bowls, ranked by reader popularity.",
        items: fillToTen(tenOfficialBowls),
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "Loaded Diner Bowls",
        intro:
          "Hearty hashbrown and grits bowls stacked with meats, eggs, and melted cheese.",
        items: fillToTen([...tenOfficialBowls].reverse()),
      }}
      videos={{
        heading: "Breakfast & Lunch Bowls at Waffle House, Behind the Grill",
        intro:
          "Watch how Waffle House builds hashbrown and grits bowls on the line in these feature videos.",
        items: [
          {
            id: "1",
            title: "Waffle House Sausage Egg & Cheese Hashbrown Bowl Recipe",
            duration: "4:15",
            youtubeId: "hkGSIr759Bg",
            videoUrl: "https://www.youtube.com/watch?v=hkGSIr759Bg",
            image: videoImg1,
          },
          {
            id: "2",
            title: "Copycat Waffle House Cheesesteak Melt Bowl",
            duration: "5:30",
            youtubeId: "VMObBMT_3JY",
            videoUrl: "https://www.youtube.com/watch?v=VMObBMT_3JY",
            image: videoImg2,
          },
          {
            id: "3",
            title: "Making Waffle House Grits Bowls at Home",
            duration: "6:12",
            youtubeId: "Xtdt9p38vB8",
            videoUrl: "https://www.youtube.com/watch?v=Xtdt9p38vB8",
            image: videoImg3,
          },
          {
            id: "4",
            title: "Waffle House Hashbrown Bowl Taste Test & Review",
            duration: "7:45",
            youtubeId: "m9ShKS9Tusk",
            videoUrl: "https://www.youtube.com/watch?v=m9ShKS9Tusk",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: "Waffle House Hashbrown & Grits Bowls Menu",
        intro:
          "The complete lineup of 10 official Hashbrown Bowls and Grits Bowls with verified 2026 prices and calorie counts.",
        items: tenOfficialBowls,
      }}
      faqs={bowlFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix="hashbrown-bowls"
    />
    );
  },
});