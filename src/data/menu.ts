import hashbrownsImg from "@/assets/hashbrowns.jpg";
import burgerImg from "@/assets/burger.jpg";
import allStarImg from "@/assets/all-star-breakfast.jpg";
import tboneImg from "@/assets/tbone-steak.jpg";
import icedCoffeeImg from "@/assets/iced-coffee.jpg";
import chickenSandwichImg from "@/assets/chicken-sandwich.jpg";
import pattyMeltImg from "@/assets/patty-melt.jpg";
import wafflesImg from "@/assets/hero-waffles.jpg";
import lowcalEggsImg from "@/assets/nutrition-lowcal-eggs.jpg";
import lowcalFruitImg from "@/assets/nutrition-lowcal-fruit.jpg";

export type Allergen =
  | "gluten"
  | "dairy"
  | "egg"
  | "soy"
  | "peanut"
  | "tree-nut"
  | "fish"
  | "shellfish";

export interface NutritionFacts {
  calories: number;
  fatG: number;
  saturatedFatG: number;
  carbsG: number;
  sugarG: number;
  proteinG: number;
  sodiumMg: number;
}

export interface MenuItem {
  slug: string;
  name: string;
  category: CategoryId;
  price: number;
  image: string;
  tagline: string;
  description: string;
  ingredients: string[];
  nutrition: NutritionFacts;
  allergens: Allergen[];
  customizations: string[];
  popular?: boolean;
  featured?: boolean;
  updatedAt: string;
}

export type CategoryId =
  | "all-star-special"
  | "waffles"
  | "breakfast"
  | "omelets"
  | "hashbrowns"
  | "biscuits"
  | "burgers"
  | "sandwiches"
  | "dinners"
  | "sides"
  | "drinks";

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
  image: string;
}

export const categories: Category[] = [
  {
    id: "all-star-special",
    name: "All-Star Special™",
    blurb: "The ultimate Waffle House combo — eggs, waffle, hashbrowns & meat.",
    image: allStarImg,
  },
  {
    id: "waffles",
    name: "Waffles",
    blurb: "Golden, crisp buttermilk waffles cooked to order.",
    image: wafflesImg,
  },
  {
    id: "breakfast",
    name: "Egg Breakfasts",
    blurb: "Farm-fresh eggs cooked your way with hashbrowns & toast.",
    image: lowcalEggsImg,
  },
  {
    id: "omelets",
    name: "Toddle House© Omelets",
    blurb: "Fluffy 2-egg omelets loaded with cheese, ham & vegetables.",
    image: allStarImg,
  },
  {
    id: "hashbrowns",
    name: "Hashbrowns & Bowls",
    blurb: "Smothered, covered, chunked — shredded potatoes done right.",
    image: hashbrownsImg,
  },
  {
    id: "biscuits",
    name: "Grilled Biscuits",
    blurb: "Warm grilled biscuits with sausage, bacon or country ham.",
    image: hashbrownsImg,
  },
  {
    id: "burgers",
    name: "Angus Burgers",
    blurb: "100% Angus beef griddled patties with melting cheese.",
    image: burgerImg,
  },
  {
    id: "sandwiches",
    name: "Sandwiches & Melts",
    blurb: "Texas melts, grilled chicken and classic BLTs.",
    image: pattyMeltImg,
  },
  {
    id: "dinners",
    name: "Classic Dinners",
    blurb: "T-bone steaks, sirloin, pork chops and chicken dinners.",
    image: tboneImg,
  },
  {
    id: "sides",
    name: "Sides & Extras",
    blurb: "Hickory bacon, sausage, grits, Bert's Chili & tomatoes.",
    image: hashbrownsImg,
  },
  {
    id: "drinks",
    name: "Beverages & Pies",
    blurb: "Bottomless coffee, juices, milkshakes and pecan pie.",
    image: icedCoffeeImg,
  },
];

const today = "2026-07-16";

export const menu: MenuItem[] = [
  // 1. All-Star Special
  {
    slug: "all-star-special",
    name: "All-Star Special™",
    category: "all-star-special",
    price: 10.95,
    image: allStarImg,
    tagline: "The whole diner on one plate.",
    description:
      "Two eggs any style, a golden waffle, hashbrowns, a choice of bacon or sausage, and buttered toast or a biscuit.",
    ingredients: [
      "Two large eggs",
      "Buttermilk waffle",
      "Shredded potato hashbrowns",
      "Hickory-smoked bacon or pork sausage",
      "Toast or biscuit",
    ],
    nutrition: {
      calories: 1180,
      fatG: 62,
      saturatedFatG: 22,
      carbsG: 96,
      sugarG: 20,
      proteinG: 42,
      sodiumMg: 2100,
    },
    allergens: ["gluten", "dairy", "egg"],
    customizations: ["Scrambled with cheese", "Sub grits", "Add ham"],
    popular: true,
    featured: true,
    updatedAt: today,
  },

  // 2. Classic Waffle
  {
    slug: "classic-waffle",
    name: "Classic Waffle",
    category: "waffles",
    price: 4.55,
    image: wafflesImg,
    tagline: "The house original since 1955.",
    description:
      "A single, golden buttermilk waffle — crisp at the edges, tender at the center — poured, pressed and served with real butter and warm syrup.",
    ingredients: ["Buttermilk waffle batter", "Real dairy butter", "Warm table syrup"],
    nutrition: {
      calories: 410,
      fatG: 18,
      saturatedFatG: 10,
      carbsG: 55,
      sugarG: 15,
      proteinG: 8,
      sodiumMg: 870,
    },
    allergens: ["gluten", "dairy", "egg", "tree-nut", "soy"],
    customizations: ["Add pecans", "Chocolate chips", "Peanut butter chips"],
    popular: true,
    featured: true,
    updatedAt: today,
  },

  // 3. Pecan Waffle
  {
    slug: "pecan-waffle",
    name: "Pecan Waffle",
    category: "waffles",
    price: 5.75,
    image: wafflesImg,
    tagline: "Toasted pecans baked right into every square.",
    description:
      "Our classic waffle finished with a handful of toasted Georgia pecans baked right into the batter for a nutty, buttery crunch.",
    ingredients: ["Buttermilk waffle batter", "Toasted pecans", "Real dairy butter", "Warm table syrup"],
    nutrition: {
      calories: 560,
      fatG: 33,
      saturatedFatG: 11.5,
      carbsG: 58,
      sugarG: 16,
      proteinG: 10,
      sodiumMg: 870,
    },
    allergens: ["gluten", "dairy", "egg", "tree-nut"],
    customizations: ["Extra pecans", "Whipped cream", "Chocolate chips"],
    popular: true,
    updatedAt: today,
  },

  // 4. Chocolate Chip Waffle
  {
    slug: "chocolate-chip-waffle",
    name: "Chocolate Chip Waffle",
    category: "waffles",
    price: 5.25,
    image: wafflesImg,
    tagline: "Melted chocolate morsels in every bite.",
    description:
      "Warm buttermilk waffle studded with rich chocolate chips that melt right into the warm squares.",
    ingredients: ["Buttermilk waffle batter", "Chocolate chips", "Real dairy butter"],
    nutrition: {
      calories: 520,
      fatG: 24,
      saturatedFatG: 13.5,
      carbsG: 71,
      sugarG: 28,
      proteinG: 9,
      sodiumMg: 870,
    },
    allergens: ["gluten", "dairy", "egg", "soy"],
    customizations: ["Extra chocolate chips", "Add bacon on side"],
    popular: true,
    updatedAt: today,
  },

  // 5. 2 Eggs Scrambled Breakfast
  {
    slug: "2-eggs-scrambled",
    name: "2 Eggs Scrambled Breakfast",
    category: "breakfast",
    price: 6.85,
    image: lowcalEggsImg,
    tagline: "High protein, clean breakfast base.",
    description:
      "Two farm-fresh eggs scrambled fluffy, served with toast and your choice of hashbrowns or grits.",
    ingredients: ["Two eggs", "Toast", "Hashbrowns or grits"],
    nutrition: {
      calories: 410,
      fatG: 21,
      saturatedFatG: 6.5,
      carbsG: 31,
      sugarG: 2,
      proteinG: 15,
      sodiumMg: 610,
    },
    allergens: ["egg", "gluten", "dairy"],
    customizations: ["Add cheese", "Sub sliced tomatoes"],
    popular: true,
    featured: true,
    updatedAt: today,
  },

  // 6. Cheese 'N Eggs
  {
    slug: "cheese-n-eggs",
    name: "Cheese 'N Eggs Breakfast",
    category: "breakfast",
    price: 7.95,
    image: lowcalEggsImg,
    tagline: "Two scrambled eggs folded with melted American cheese.",
    description:
      "Two fluffy scrambled eggs melted with rich American cheese, served alongside toast and crispy hashbrowns.",
    ingredients: ["Two eggs", "American cheese", "Toast", "Hashbrowns"],
    nutrition: {
      calories: 560,
      fatG: 29,
      saturatedFatG: 11.5,
      carbsG: 31,
      sugarG: 2,
      proteinG: 21,
      sodiumMg: 1110,
    },
    allergens: ["egg", "dairy", "gluten", "soy"],
    customizations: ["Raisin toast", "Grits instead of hashbrowns"],
    popular: true,
    updatedAt: today,
  },

  // 7. T-Bone Steak & Eggs
  {
    slug: "t-bone-and-eggs",
    name: "T-Bone Steak & Eggs",
    category: "dinners",
    price: 16.5,
    image: tboneImg,
    tagline: "Griddled T-bone, two eggs, your sides.",
    description:
      "A hand-cut T-bone seared on the flat-top with butter, served with two eggs any style, hashbrowns and toast.",
    ingredients: ["T-bone steak", "Two large eggs", "Hashbrowns", "Toast"],
    nutrition: {
      calories: 1230,
      fatG: 73,
      saturatedFatG: 23,
      carbsG: 3,
      sugarG: 3,
      proteinG: 139,
      sodiumMg: 1835,
    },
    allergens: ["gluten", "dairy", "egg"],
    customizations: ["Add grits", "Add cheese", "Sub biscuit"],
    popular: true,
    featured: true,
    updatedAt: today,
  },

  // 8. Sirloin Steak & Eggs
  {
    slug: "sirloin-steak-eggs",
    name: "Sirloin Steak & Eggs",
    category: "dinners",
    price: 12.95,
    image: tboneImg,
    tagline: "Tender sirloin steak with eggs and hashbrowns.",
    description:
      "USDA Choice sirloin steak griddled to perfection with two eggs scrambled, crispy hashbrowns and buttered toast.",
    ingredients: ["USDA Choice Sirloin", "Two eggs", "Hashbrowns", "Toast"],
    nutrition: {
      calories: 660,
      fatG: 46,
      saturatedFatG: 16,
      carbsG: 4,
      sugarG: 3,
      proteinG: 59,
      sodiumMg: 615,
    },
    allergens: ["egg", "gluten", "soy"],
    customizations: ["Medium rare", "Well done", "Sub biscuit"],
    featured: true,
    updatedAt: today,
  },

  // 9. Sausage Egg & Cheese Hashbrown Bowl
  {
    slug: "sausage-egg-cheese-bowl",
    name: "Sausage Egg & Cheese Hashbrown Bowl",
    category: "hashbrowns",
    price: 9.45,
    image: hashbrownsImg,
    tagline: "Large hashbrowns layered with sausage, eggs & cheese.",
    description:
      "A hearty bowl of crispy large hashbrowns topped with melted American cheese, savory pork sausage and two scrambled eggs.",
    ingredients: ["Large hashbrowns", "Pork sausage", "Two eggs", "American cheese"],
    nutrition: {
      calories: 920,
      fatG: 70,
      saturatedFatG: 25,
      carbsG: 63,
      sugarG: 4,
      proteinG: 32,
      sodiumMg: 1620,
    },
    allergens: ["egg", "dairy", "soy"],
    customizations: ["Add jalapeños", "Add mushrooms", "Sub bacon"],
    popular: true,
    featured: true,
    updatedAt: today,
  },

  // 10. Bacon Egg & Cheese Hashbrown Bowl
  {
    slug: "bacon-egg-cheese-bowl",
    name: "Bacon Egg & Cheese Hashbrown Bowl",
    category: "hashbrowns",
    price: 9.25,
    image: hashbrownsImg,
    tagline: "Crispy hashbrowns, bacon strips, eggs and cheese.",
    description:
      "Large hashbrowns layered with hickory-smoked bacon, two scrambled eggs and two slices of melted American cheese.",
    ingredients: ["Large hashbrowns", "Hickory bacon", "Two eggs", "American cheese"],
    nutrition: {
      calories: 800,
      fatG: 58,
      saturatedFatG: 21,
      carbsG: 62,
      sugarG: 4,
      proteinG: 30,
      sodiumMg: 1630,
    },
    allergens: ["egg", "dairy", "soy"],
    customizations: ["Smothered onions", "Chunked ham"],
    popular: true,
    updatedAt: today,
  },

  // 11. Ham & Cheese Omelet
  {
    slug: "ham-and-cheese-omelet",
    name: "Ham & Cheese Omelet",
    category: "omelets",
    price: 8.95,
    image: allStarImg,
    tagline: "Fluffy 2-egg omelet packed with city ham and cheese.",
    description:
      "Toddle House© classic 2-egg omelet folded with diced city ham and melted American cheese, served with toast and hashbrowns.",
    ingredients: ["Two eggs", "City ham", "American cheese", "Toast", "Hashbrowns"],
    nutrition: {
      calories: 560,
      fatG: 47.5,
      saturatedFatG: 17,
      carbsG: 5,
      sugarG: 4,
      proteinG: 26,
      sodiumMg: 1120,
    },
    allergens: ["egg", "dairy", "soy"],
    customizations: ["Add onions", "Add mushrooms", "Sub grits"],
    popular: true,
    updatedAt: today,
  },

  // 12. Fiesta Omelet
  {
    slug: "fiesta-omelet",
    name: "Fiesta Omelet",
    category: "omelets",
    price: 9.45,
    image: allStarImg,
    tagline: "Jalapeños, tomatoes, onions & cheese folded in eggs.",
    description:
      "A zesty 2-egg omelet with diced tomatoes, jalapeños, sautéed onions and melted cheese, served with hashbrowns and toast.",
    ingredients: ["Two eggs", "Tomatoes", "Jalapeños", "Onions", "Cheese"],
    nutrition: {
      calories: 590,
      fatG: 47.5,
      saturatedFatG: 17,
      carbsG: 12,
      sugarG: 6,
      proteinG: 26,
      sodiumMg: 1510,
    },
    allergens: ["egg", "dairy", "soy"],
    customizations: ["Add ham", "Sub raisin toast"],
    featured: true,
    updatedAt: today,
  },

  // 13. Bacon Egg & Cheese Biscuit
  {
    slug: "bacon-egg-cheese-biscuit",
    name: "Bacon Egg & Cheese Biscuit",
    category: "biscuits",
    price: 5.95,
    image: hashbrownsImg,
    tagline: "Grilled buttermilk biscuit with bacon, egg & cheese.",
    description:
      "Freshly grilled buttermilk biscuit stacked with crispy bacon, a scrambled egg and melted American cheese.",
    ingredients: ["Grilled biscuit", "Bacon", "Scrambled egg", "American cheese"],
    nutrition: {
      calories: 610,
      fatG: 44,
      saturatedFatG: 21.5,
      carbsG: 35,
      sugarG: 2,
      proteinG: 19,
      sodiumMg: 1560,
    },
    allergens: ["gluten", "dairy", "egg", "soy"],
    customizations: ["Extra cheese", "Sub sausage"],
    popular: true,
    updatedAt: today,
  },

  // 14. Sausage Egg & Cheese Biscuit
  {
    slug: "sausage-egg-cheese-biscuit",
    name: "Sausage Egg & Cheese Biscuit",
    category: "biscuits",
    price: 5.95,
    image: hashbrownsImg,
    tagline: "Pork sausage patty with egg & cheese on grilled biscuit.",
    description:
      "Savory pork sausage patty, fluffy scrambled egg and melted American cheese inside a warm grilled buttermilk biscuit.",
    ingredients: ["Grilled biscuit", "Sausage patty", "Egg", "Cheese"],
    nutrition: {
      calories: 650,
      fatG: 48,
      saturatedFatG: 22,
      carbsG: 35,
      sugarG: 2,
      proteinG: 19,
      sodiumMg: 1470,
    },
    allergens: ["gluten", "dairy", "egg", "soy"],
    customizations: ["Add gravy", "Sub bacon"],
    popular: true,
    updatedAt: today,
  },

  // 15. Texas Cheesesteak Melt
  {
    slug: "texas-cheesesteak-melt",
    name: "Texas Cheesesteak™ Melt",
    category: "sandwiches",
    price: 8.95,
    image: pattyMeltImg,
    tagline: "Thinly sliced steak, grilled onions & melted cheese on Texas toast.",
    description:
      "Thinly sliced steak grilled with onions and melted American cheese pressed between thick buttered Texas toast slices.",
    ingredients: ["Thin-sliced steak", "Grilled onions", "American cheese", "Texas toast"],
    nutrition: {
      calories: 650,
      fatG: 40,
      saturatedFatG: 17,
      carbsG: 42,
      sugarG: 6,
      proteinG: 28,
      sodiumMg: 1400,
    },
    allergens: ["gluten", "dairy", "soy"],
    customizations: ["Add bacon", "Sub Swiss cheese"],
    popular: true,
    featured: true,
    updatedAt: today,
  },

  // 16. Texas Angus Patty Melt
  {
    slug: "texas-angus-patty-melt",
    name: "Texas Angus Patty Melt",
    category: "sandwiches",
    price: 8.95,
    image: pattyMeltImg,
    tagline: "Angus beef patty, caramelized onions & melted cheese.",
    description:
      "Fresh Angus beef patty seared on the griddle with sweet caramelized onions and American cheese on buttered Texas toast.",
    ingredients: ["Angus beef patty", "Caramelized onions", "American cheese", "Texas toast"],
    nutrition: {
      calories: 730,
      fatG: 50,
      saturatedFatG: 21,
      carbsG: 42,
      sugarG: 6,
      proteinG: 26,
      sodiumMg: 1160,
    },
    allergens: ["gluten", "dairy", "soy"],
    customizations: ["Double patty", "Add bacon", "Jalapeños"],
    popular: true,
    featured: true,
    updatedAt: today,
  },

  // 17. Angus 1/4 LB Hamburger Deluxe
  {
    slug: "angus-hamburger-deluxe",
    name: "Angus 1/4 LB Hamburger Deluxe",
    category: "burgers",
    price: 7.95,
    image: burgerImg,
    tagline: "100% Angus beef with lettuce, tomato & pickles.",
    description:
      "A quarter-pound fresh Angus beef patty grilled to a savory crust, served with crisp lettuce, tomato, pickles and onions on a toasted bun.",
    ingredients: ["100% Angus beef", "Lettuce", "Tomato", "Pickles", "Onion", "Toasted bun"],
    nutrition: {
      calories: 560,
      fatG: 41,
      saturatedFatG: 16,
      carbsG: 27,
      sugarG: 4,
      proteinG: 19,
      sodiumMg: 540,
    },
    allergens: ["gluten", "soy", "dairy"],
    customizations: ["Add cheese", "Add bacon", "Double patty"],
    featured: true,
    updatedAt: today,
  },

  // 18. Angus 1/4 LB Cheeseburger Deluxe
  {
    slug: "angus-cheeseburger-deluxe",
    name: "Angus 1/4 LB Cheeseburger Deluxe",
    category: "burgers",
    price: 8.45,
    image: burgerImg,
    tagline: "Fresh Angus patty smashed with melted cheese & toppings.",
    description:
      "Quarter-pound Angus patty smashed hot on the griddle with melted American cheese, lettuce, tomato and pickles.",
    ingredients: ["Angus beef", "American cheese", "Lettuce", "Tomato", "Pickles", "Bun"],
    nutrition: {
      calories: 620,
      fatG: 45,
      saturatedFatG: 18.5,
      carbsG: 29,
      sugarG: 5,
      proteinG: 22,
      sodiumMg: 795,
    },
    allergens: ["gluten", "dairy", "soy"],
    customizations: ["Extra cheese", "Add bacon"],
    popular: true,
    updatedAt: today,
  },

  // 19. Grilled Chicken Sandwich Deluxe
  {
    slug: "grilled-chicken-deluxe",
    name: "Grilled Chicken Sandwich Deluxe",
    category: "sandwiches",
    price: 8.45,
    image: chickenSandwichImg,
    tagline: "Flat-top grilled chicken breast with fresh toppings.",
    description:
      "Tender marinated chicken breast seared on the flat-top, stacked with lettuce, tomato and pickles on a toasted bun.",
    ingredients: ["Marinated chicken breast", "Lettuce", "Tomato", "Pickles", "Bun"],
    nutrition: {
      calories: 490,
      fatG: 26.5,
      saturatedFatG: 9.5,
      carbsG: 30,
      sugarG: 5,
      proteinG: 33,
      sodiumMg: 1420,
    },
    allergens: ["gluten", "dairy", "soy"],
    customizations: ["Add bacon", "Add cheese"],
    featured: true,
    updatedAt: today,
  },

  // 20. Regular Slice Southern Pecan Pie
  {
    slug: "southern-pecan-pie",
    name: "Southern Pecan Pie",
    category: "drinks",
    price: 4.25,
    image: icedCoffeeImg,
    tagline: "Rich, buttery Southern pecan filling in flaky crust.",
    description:
      "A classic slice of sweet, buttery pecan pie baked in a tender flaky crust, loaded with crunchy pecans.",
    ingredients: ["Pecans", "Butter", "Sugar", "Flaky pastry crust"],
    nutrition: {
      calories: 520,
      fatG: 27,
      saturatedFatG: 14,
      carbsG: 65,
      sugarG: 45,
      proteinG: 4,
      sodiumMg: 280,
    },
    allergens: ["gluten", "dairy", "egg", "tree-nut", "soy"],
    customizations: ["Warm slice", "Add vanilla ice cream"],
    popular: true,
    updatedAt: today,
  },

  // 21. Triple Chocolate Pie
  {
    slug: "triple-chocolate-pie",
    name: "Triple Chocolate Pie",
    category: "drinks",
    price: 4.45,
    image: icedCoffeeImg,
    tagline: "Decadent chocolate silk filling topped with chocolate curls.",
    description:
      "Silky smooth chocolate cream filling inside a chocolate cookie crust, topped with whipped cream and dark chocolate curls.",
    ingredients: ["Chocolate cream", "Cookie crust", "Whipped cream", "Chocolate curls"],
    nutrition: {
      calories: 880,
      fatG: 42,
      saturatedFatG: 14,
      carbsG: 120,
      sugarG: 69,
      proteinG: 8,
      sodiumMg: 660,
    },
    allergens: ["gluten", "dairy", "soy"],
    customizations: ["Extra whipped cream"],
    popular: true,
    updatedAt: today,
  },

  // 22. Grilled Chicken Salad
  {
    slug: "grilled-chicken-salad",
    name: "Grilled Chicken Salad",
    category: "breakfast",
    price: 7.95,
    image: lowcalFruitImg,
    tagline: "Fresh greens topped with warm grilled chicken breast.",
    description:
      "Crisp lettuce, diced tomatoes and cucumbers topped with freshly seared grilled chicken breast.",
    ingredients: ["Grilled chicken breast", "Lettuce", "Tomatoes", "Cucumbers"],
    nutrition: {
      calories: 175,
      fatG: 2.5,
      saturatedFatG: 0.5,
      carbsG: 8,
      sugarG: 5,
      proteinG: 31,
      sodiumMg: 950,
    },
    allergens: [],
    customizations: ["Italian dressing", "Ranch dressing", "Add cheese"],
    featured: true,
    updatedAt: today,
  },

  // 23. Bottomless Coffee
  {
    slug: "bottomless-coffee",
    name: "Bottomless Coffee",
    category: "drinks",
    price: 2.95,
    image: icedCoffeeImg,
    tagline: "100% Arabica roast. Always refilled.",
    description:
      "Freshly brewed house-roast coffee served hot with unlimited free refills at your counter seat.",
    ingredients: ["100% Arabica coffee", "Filtered water"],
    nutrition: {
      calories: 5,
      fatG: 0,
      saturatedFatG: 0,
      carbsG: 1,
      sugarG: 0,
      proteinG: 0,
      sodiumMg: 5,
    },
    allergens: [],
    customizations: ["Cream", "Sugar", "Decaf"],
    popular: true,
    updatedAt: today,
  },

  // 24. Large Chocolate Milk
  {
    slug: "large-chocolate-milk",
    name: "Large Chocolate Milk",
    category: "drinks",
    price: 3.45,
    image: icedCoffeeImg,
    tagline: "Cold, creamy chocolate whole milk.",
    description:
      "Rich and creamy whole milk blended with sweet chocolate syrup, served cold in a highball glass.",
    ingredients: ["Whole milk", "Chocolate syrup"],
    nutrition: {
      calories: 440,
      fatG: 16,
      saturatedFatG: 10,
      carbsG: 58,
      sugarG: 54,
      proteinG: 16,
      sodiumMg: 360,
    },
    allergens: ["dairy"],
    customizations: ["Sub regular milk"],
    popular: true,
    updatedAt: today,
  },
];

export function getItem(slug: string) {
  return menu.find((m) => m.slug === slug);
}

export function itemsByCategory(id: CategoryId) {
  return menu.filter((m) => m.category === id);
}

export function relatedItems(slug: string, limit = 3) {
  const item = getItem(slug);
  if (!item) return [];
  return menu.filter((m) => m.category === item.category && m.slug !== slug).slice(0, limit);
}

export const faqs = [
  {
    q: "What time is breakfast served at Waffle House?",
    a: "Every menu item — waffles, eggs, hashbrowns, biscuits, and steaks — is served 24 hours a day, 7 days a week. Breakfast never stops.",
  },
  {
    q: "Are menu prices uniform across all locations?",
    a: "Prices are set by individual franchises and can vary slightly by state and location. Our guide reflects verified U.S. average prices.",
  },
  {
    q: "Are gluten-free items available?",
    a: "Scrambled eggs, bacon, pork sausage, steaks, city ham, and plain hashbrowns are gluten-free. Waffles, biscuits, and toast contain wheat.",
  },
  {
    q: "Where can I view official nutrition details?",
    a: "Every plate on our site features verified calories, protein, carbs, fat, sodium, and allergen breakdowns directly from official Waffle House guidelines.",
  },
  {
    q: "Can I customize my hashbrowns?",
    a: "Yes! Order them regular, large, or triple, and choose your favorite toppings: Smothered (onions), Covered (cheese), Chunked (ham), Diced (tomatoes), Peppered (jalapeños), Capped (mushrooms), Topped (chili), or Country (sausage gravy).",
  },
];
