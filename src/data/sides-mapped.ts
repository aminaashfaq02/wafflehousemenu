import sidesData from "./sides.json";
import { type MasterItem } from "@/components/category-master-view";

import introImg from "@/assets/cat-sides.jpg";
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
