import allStarData from "./all-star-special.json";
import { type MasterItem } from "@/components/category-master-view";

// Section imagery
import introImg from "@/assets/allstar-intro.jpg";

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
