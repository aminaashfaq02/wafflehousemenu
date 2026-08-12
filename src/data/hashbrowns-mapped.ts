import hashbrownsData from "./hashbrowns.json";
import { type MasterItem } from "@/components/category-master-view";

import introImg from "@/assets/cat-hashbrowns.jpg";
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
