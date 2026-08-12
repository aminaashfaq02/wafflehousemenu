import beveragesData from "./beverages.json";
import { type MasterItem } from "@/components/category-master-view";

import introImg from "@/assets/cat-beverages.jpg";
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
