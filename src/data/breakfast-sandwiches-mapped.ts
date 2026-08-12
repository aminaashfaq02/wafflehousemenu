import sandwichesData from "./breakfast-sandwiches.json";
import { type MasterItem } from "@/components/category-master-view";

import introImg from "@/assets/cat-sandwiches.jpg";
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

interface SandwichRawItem {
  slug: string;
  name: string;
  price: number;
  calories: number;
  rating: number;
  description: string;
  image: string;
}

const rawItems = sandwichesData.items as SandwichRawItem[];

export const sandwichMasterItems: MasterItem[] = rawItems.map((i) => ({
  slug: i.slug,
  name: i.name,
  price: i.price,
  calories: i.calories,
  rating: i.rating,
  image: imageMap[i.image] ?? introImg,
  href: `/menu/breakfast-sandwiches/${i.slug}`,
}));

export const sandwichFaqs = [
  {
    question: "What bread choices are available for Waffle House Breakfast Sandwiches?",
    answer: "You can choose between toasted warm bread, wheat bread, raisin toast, or thick, buttery grilled Texas toast.",
  },
  {
    question: "Are Waffle House melts served all day?",
    answer: "Yes! All Waffle House breakfast sandwiches, Texas melts, and handhelds are cooked fresh to order 24 hours a day, 7 days a week.",
  },
  {
    question: "What meats can I choose for my breakfast sandwich?",
    answer: "Options include hickory-smoked bacon, savory pork sausage patties, lean chicken sausage patties, grilled city ham, and USDA choice grilled steak.",
  },
  {
    question: "How many calories are in a Texas Bacon, Egg & Cheese Melt?",
    answer: "A Texas Bacon, Egg & Cheese Melt ranges from 525 to 730 calories depending on cheese and butter options.",
  },
  {
    question: "Can I add extra cheese or double meat to my sandwich?",
    answer: "Yes! You can customize any sandwich on the flat-top with double cheese, extra eggs, or double sausage/bacon.",
  },
];
