import catAllStar from "@/assets/cat-all-star.jpg";
import catWaffles from "@/assets/cat-waffles.jpg";
import catEggBreakfasts from "@/assets/cat-egg-breakfasts.jpg";
import catOmelets from "@/assets/cat-omelets.jpg";
import catBreakfastBowl from "@/assets/cat-breakfast-bowl.jpg";
import catTexasMelt from "@/assets/cat-texas-melt.jpg";
import catBiscuits from "@/assets/cat-biscuits.jpg";
import catAngusBurger from "@/assets/cat-angus-burger.jpg";
import catSandwiches from "@/assets/cat-sandwiches.jpg";
import catClassicDinners from "@/assets/cat-classic-dinners.jpg";
import catHashbrowns from "@/assets/cat-hashbrowns.jpg";
import catSides from "@/assets/cat-sides.jpg";
import catBeverages from "@/assets/cat-beverages.jpg";

export interface CentralCategory {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
  href: string;
  itemCount: number;
}

export const CENTRAL_MENU_CATEGORIES: CentralCategory[] = [
  {
    id: "all-star-special",
    name: "All-Star Special™",
    shortDescription: "Explore All-Star Special™ options, plate items, choices and customization details.",
    image: catAllStar,
    href: "/menu/all-star-special",
    itemCount: 6,
  },
  {
    id: "waffles",
    name: "Waffles",
    shortDescription: "Explore waffle options, sweet cream batters, menu details and available toppings.",
    image: catWaffles,
    href: "/menu/waffles",
    itemCount: 6,
  },
  {
    id: "breakfast",
    name: "Egg Breakfasts",
    shortDescription: "Explore farm-fresh egg plates, steak and chops combos, toast and side pairings.",
    image: catEggBreakfasts,
    href: "/menu/breakfast",
    itemCount: 7,
  },
  {
    id: "omelets",
    name: "Toddle House© Omelets",
    shortDescription: "Explore fluffy 2-egg Toddle House® omelets loaded with cheese, ham, steak and veggies.",
    image: catOmelets,
    href: "/menu/omelets",
    itemCount: 4,
  },
  {
    id: "hashbrown-bowls",
    name: "Hashbrown Bowls",
    shortDescription: "Explore griddled hashbrown bowls layered with eggs, melted cheese, sausage and bacon.",
    image: catBreakfastBowl,
    href: "/menu/hashbrown-bowls",
    itemCount: 4,
  },
  {
    id: "breakfast-sandwiches",
    name: "Breakfast Sandwiches & Melts",
    shortDescription: "Explore Texas toast melts, sausage biscuit handhelds and breakfast sandwich details.",
    image: catTexasMelt,
    href: "/menu/breakfast-sandwiches",
    itemCount: 6,
  },
  {
    id: "biscuits",
    name: "Grilled Biscuits",
    shortDescription: "Explore grilled buttermilk biscuits, sausage gravy plates and country ham biscuit handhelds.",
    image: catBiscuits,
    href: "/menu/biscuits",
    itemCount: 6,
  },
  {
    id: "burgers",
    name: "Angus Burgers",
    shortDescription: "Explore 100% USDA Choice Angus beef hamburgers, cheeseburgers and deluxe platters.",
    image: catAngusBurger,
    href: "/menu/burgers",
    itemCount: 5,
  },
  {
    id: "sandwiches",
    name: "Sandwiches",
    shortDescription: "Explore classic diner sandwiches including grilled chicken, ham & cheese and BLTs.",
    image: catSandwiches,
    href: "/menu/sandwiches",
    itemCount: 6,
  },
  {
    id: "classic-dinners",
    name: "Classic Dinners",
    shortDescription: "Explore dinner platters featuring T-Bone steaks, pork chops and grilled chicken breasts.",
    image: catClassicDinners,
    href: "/menu/classic-dinners",
    itemCount: 6,
  },
  {
    id: "hashbrowns",
    name: "Hashbrowns & Toppings",
    shortDescription: "Explore scattered, smothered, covered and peppered shredded potato hashbrown options.",
    image: catHashbrowns,
    href: "/menu/hashbrowns",
    itemCount: 6,
  },
  {
    id: "sides",
    name: "Breakfast Sides",
    shortDescription: "Explore side orders including bacon strips, sausage patties, grits bowls and toast.",
    image: catSides,
    href: "/menu/sides",
    itemCount: 6,
  },
  {
    id: "beverages",
    name: "Beverages & Pies",
    shortDescription: "Explore bottomless coffee, iced tea, juices, milkshakes and Southern pecan pies.",
    image: catBeverages,
    href: "/menu/beverages",
    itemCount: 6,
  },
];

// Single source of truth dynamically derived from central menu database
export const TOTAL_MENU_CATEGORIES = CENTRAL_MENU_CATEGORIES.length; // 13
export const TOTAL_MENU_ITEMS = CENTRAL_MENU_CATEGORIES.reduce((sum, cat) => sum + cat.itemCount, 0); // 74
