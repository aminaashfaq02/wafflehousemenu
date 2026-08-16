import breakfastPlatesImg from "@/assets/article-breakfast-plates.jpg";
import waffleGuideImg from "@/assets/article-waffle-guide.jpg";
import hashbrownsArticleImg from "@/assets/article-hashbrowns.jpg";
import budgetMealsImg from "@/assets/article-budget-meals.jpg";
import lateNightCoffeeImg from "@/assets/article-late-night-coffee.jpg";
import { defaultAuthor, type AuthorProfile } from "@/components/AuthorBox";
import { type TocItem } from "@/components/TableOfContents";

export { defaultAuthor };

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  summary: string;
  quickAnswer?: string;
  image: string;
  author: AuthorProfile;
  publishDate: string;
  lastUpdated: string;
  readMinutes: number;
  category: string;
  toc: TocItem[];
  faqs: { question: string; answer: string }[];
  relatedMenuSlugs?: string[];
  relatedCategories?: string[];
  sections: {
    id: string;
    h2: string;
    content: string; // Markdown or HTML text
    table?: {
      headers: string[];
      rows: string[][];
    };
    bulletPoints?: string[];
    subSections?: {
      id: string;
      h3: string;
      content: string;
    }[];
  }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "best-breakfast-items",
    title: "The 7 Best Waffle House Breakfast Plates to Order in 2026",
    seoTitle: "7 Best Waffle House Breakfast Plates (Ranked by Value & Flavor)",
    metaDescription: "Discover the 7 best Waffle House breakfast plates in 2026. Ranked by price, calories, portion size, and taste — from the All-Star Special to T-Bone & Eggs.",
    summary: "From the iconic All-Star Special™ to the hearty T-Bone & Eggs, we rank the top 7 breakfast plates based on price, calorie value, and flavor.",
    quickAnswer: "The #1 overall best breakfast plate at Waffle House is the All-Star Special™ ($11.75, 1,050 kcal), offering unmatched value with 2 eggs, toast, hashbrowns, choice of bacon/sausage/ham, and a freshly baked waffle.",
    image: breakfastPlatesImg,
    author: defaultAuthor,
    publishDate: "2026-01-15",
    lastUpdated: "2026-08-01",
    readMinutes: 6,
    category: "Breakfast",
    relatedCategories: ["all-star-special", "breakfast", "egg-breakfasts"],
    toc: [
      { id: "overview", title: "Overview of Top Breakfast Options", level: 2 },
      { id: "ranking-criteria", title: "How We Evaluated the Menu", level: 2 },
      { id: "top-7-list", title: "The 7 Best Breakfast Plates Ranked", level: 2 },
      { id: "all-star-special", title: "1. The All-Star Special™ (Best Overall)", level: 3 },
      { id: "tbone-eggs", title: "2. T-Bone & Eggs Breakfast", level: 3 },
      { id: "cheese-n-eggs", title: "3. Cheese 'N Eggs Plate", level: 3 },
      { id: "cheesesteak-omelet", title: "4. Cheesesteak Omelet Breakfast", level: 3 },
      { id: "comparison-table", title: "Nutritional & Price Comparison Table", level: 2 },
      { id: "faqs", title: "Frequently Asked Questions", level: 2 },
      { id: "conclusion", title: "Final Verdict", level: 2 },
    ],
    faqs: [
      {
        question: "What comes with the All-Star Special at Waffle House?",
        answer: "The All-Star Special includes two fresh eggs cooked to order, toast with jelly, crispy hashbrowns (or grits), your choice of bacon, sausage, or city ham, and a fresh classic golden waffle.",
      },
      {
        question: "Can you customize breakfast plates at Waffle House?",
        answer: "Yes! Waffle House is famous for customized ordering. You can substitute hashbrowns for grits, choose white, wheat, raisin, or Texas toast, and order eggs scrambled, fried, or over-easy.",
      },
      {
        question: "Is breakfast served all day at Waffle House?",
        answer: "Yes, Waffle House serves its entire breakfast menu 24 hours a day, 7 days a week, 365 days a year.",
      },
    ],
    sections: [
      {
        id: "overview",
        h2: "Overview of Top Breakfast Options",
        content: "Waffle House has been America's favorite 24/7 diner since 1955. With dozens of breakfast choices on the yellow board, deciding what to order can be overwhelming. In this definitive guide, our culinary team breaks down the absolute best breakfast plates available in 2026.",
      },
      {
        id: "ranking-criteria",
        h2: "How We Evaluated the Menu",
        content: "To determine the top 7 breakfast plates, we evaluated each plate across four core diner metrics:",
        bulletPoints: [
          "Price-to-Value Ratio: Total food quantity and satisfaction per dollar spent.",
          "Nutritional Balance: Calorie count, protein density, and ingredient quality.",
          "Consistency: Uniform preparation across different locations nationwide.",
          "Diner Heritage: Fan-favorite status and signature Waffle House taste."
        ]
      },
      {
        id: "top-7-list",
        h2: "The 7 Best Breakfast Plates Ranked",
        content: "Here is our countdown of the top breakfast plates you can order today.",
        subSections: [
          {
            id: "all-star-special",
            h3: "1. The All-Star Special™ (Best Overall Value)",
            content: "Priced at $11.75 with approximately 1,050 kcal, the All-Star Special™ remains the undisputed champion of the menu. It gives you a complete multi-course breakfast including a fresh waffle, eggs, meat, toast, and hashbrowns."
          },
          {
            id: "tbone-eggs",
            h3: "2. T-Bone & Eggs Breakfast",
            content: "For steak lovers, the 10oz T-Bone Steak paired with two eggs, toast, and hashbrowns ($12.60 - $15.90, 800 - 1,100 kcal) delivers high-protein diner luxury at an accessible price point."
          },
          {
            id: "cheese-n-eggs",
            h3: "3. Cheese 'N Eggs Plate",
            content: "Two eggs scrambled together with melted American cheese slices ($7.75, 670 kcal), served with toast and hashbrowns. Fluffy, gooey, and deeply satisfying."
          },
          {
            id: "cheesesteak-omelet",
            h3: "4. Cheesesteak Omelet Breakfast",
            content: "Thinly shaved cheesesteak beef and melted American cheese folded into a fluffy two-egg omelet ($11.50, 820 kcal full meal)."
          }
        ]
      },
      {
        id: "comparison-table",
        h2: "Nutritional & Price Comparison Table",
        content: "Compare prices, calorie counts, and protein content across the top breakfast plates:",
        table: {
          headers: ["Breakfast Plate", "Price (2026)", "Calories", "Protein", "Best Feature"],
          rows: [
            ["All-Star Special™", "$11.75", "1,050 kcal", "42g", "Includes classic waffle"],
            ["T-Bone & Eggs", "$14.25", "880 kcal", "65g", "High protein 10oz steak"],
            ["Cheese 'N Eggs", "$7.75", "670 kcal", "28g", "Melted American cheese"],
            ["Ham & Cheese Omelet", "$10.75", "740 kcal", "38g", "Savory smoked ham"],
            ["Sirloin & Eggs", "$12.50", "790 kcal", "54g", "Lean USDA choice sirloin"]
          ]
        }
      },
      {
        id: "category-recipe-breakdown",
        h2: "Complete Waffle House Menu Category & Recipe Count Guide (2026)",
        content: "Below is the official verified breakdown of all 14 Waffle House menu categories, showing the exact total count of recipes available in each category along with average price ranges and signature dishes:",
        table: {
          headers: ["Menu Category Name", "Total Recipes", "Price Range", "Signature Recipe"],
          rows: [
            ["BREAKFAST ALL-STAR SPECIAL™", "15 Recipes", "Included in Combo / $10.95–$13.85", "All-Star Special Waffle Combo"],
            ["Waffles", "10 Recipes", "$5.20 – $9.95", "Classic Sweet Cream Waffle"],
            ["Egg Breakfasts", "24 Recipes", "$6.85 – $12.95", "2 Eggs Scrambled Breakfast"],
            ["Toddle House© Omelets", "10 Recipes", "$8.95 – $11.45", "Ham & Cheese Omelet"],
            ["Hashbrowns & Bowls", "13 Recipes", "$3.65 – $9.95", "Smothered & Covered Hashbrowns"],
            ["Hashbrown Bowls", "10 Recipes", "$9.25 – $9.95", "Sausage Egg & Cheese Bowl"],
            ["Grilled Biscuits", "11 Recipes", "$5.95 – $7.45", "Bacon Egg & Cheese Biscuit"],
            ["Breakfast Sandwiches", "19 Recipes", "$5.95 – $8.95", "Texas Sausage Egg & Cheese Melt"],
            ["Texas Melts", "10 Recipes", "$8.95 – $9.95", "Texas Cheesesteak™ Melt"],
            ["Angus Burgers", "11 Recipes", "$7.95 – $9.45", "Angus 1/4 LB Cheeseburger Deluxe"],
            ["Sandwiches & Melts", "10 Recipes", "$7.95 – $8.95", "Grilled Chicken Sandwich Deluxe"],
            ["Classic Dinners", "6 Recipes", "$12.95 – $16.50", "T-Bone Steak & Eggs"],
            ["Sides & Extras", "14 Recipes", "$2.40 – $4.95", "Hickory-Smoked Bacon Strips"],
            ["Beverages & Pies", "21 Recipes", "$2.45 – $4.45", "Bottomless Coffee & Southern Pecan Pie"]
          ]
        }
      },
      {
        id: "conclusion",
        h2: "Final Verdict",
        content: "Whether you're visiting for an early morning shift meal or a 2 AM post-concert feast, the All-Star Special™ is the undisputed best plate on the Waffle House menu. Pair it with double hashbrowns 'scattered, smothered & covered' for the ultimate diner experience!"
      }
    ]
  },
  {
    slug: "waffles-guide",
    title: "A Complete Guide to the House Waffle: Ordering Like a Pro",
    seoTitle: "Waffle House Waffles Guide 2026 — Flavors, Calories & Prices",
    metaDescription: "Everything you need to know about Waffle House waffles in 2026. Classic sweet cream, Pecan, Chocolate Chip, Peanut Butter, and Double Waffles decoded.",
    summary: "The definitive guide to Waffle House sweet cream waffles — how they're made, custom toppings, calorie counts, and secret menu hacks.",
    quickAnswer: "Waffle House waffles are made with a signature sweet cream batter cooked on 400°F cast irons. Options include Classic ($4.75), Pecan ($5.50), Chocolate Chip ($5.25), and Peanut Butter ($5.25).",
    image: waffleGuideImg,
    author: defaultAuthor,
    publishDate: "2026-01-20",
    lastUpdated: "2026-08-02",
    readMinutes: 5,
    category: "Waffles",
    relatedCategories: ["waffles", "all-star-special"],
    toc: [
      { id: "intro", title: "The Secret Behind the Golden Waffle", level: 2 },
      { id: "waffle-varieties", title: "Waffle House Waffle Varieties & Prices", level: 2 },
      { id: "toppings-guide", title: "Custom Toppings & Combinations", level: 2 },
      { id: "waffle-nutrition", title: "Nutrition & Calorie Breakdown", level: 2 },
      { id: "faqs", title: "Waffle FAQs", level: 2 },
    ],
    faqs: [
      {
        question: "How many calories are in a Waffle House waffle?",
        answer: "A plain Classic Golden Waffle has 410 kcal. Adding Pecans brings it to 560 kcal, Chocolate Chips to 520 kcal, and Peanut Butter to 550 kcal.",
      },
      {
        question: "Are Waffle House waffles gluten-free?",
        answer: "No, standard Waffle House waffles contain wheat flour and milk allergen ingredients.",
      },
    ],
    sections: [
      {
        id: "intro",
        h2: "The Secret Behind the Golden Waffle",
        content: "Waffle House bakes millions of waffles every year. Their secret lies in real sweet cream, egg yolks, and heavy cast-iron irons heated precisely to 400°F, creating a light crispy exterior and soft fluffy interior.",
      },
      {
        id: "waffle-varieties",
        h2: "Waffle House Waffle Varieties & Prices",
        content: "Here is the complete lineup of waffle options available at all locations:",
        table: {
          headers: ["Waffle Type", "Price", "Calories", "Key Ingredient"],
          rows: [
            ["Classic Golden Waffle", "$4.75", "410 kcal", "Sweet cream batter"],
            ["Pecan Waffle", "$5.50", "560 kcal", "Real roasted pecans"],
            ["Chocolate Chip Waffle", "$5.25", "520 kcal", "Melted chocolate chips"],
            ["Peanut Butter Waffle", "$5.25", "550 kcal", "Creamy peanut butter chips"],
            ["Double Waffle", "$6.95", "820 kcal", "Two full-size golden waffles"]
          ]
        }
      },
      {
        id: "toppings-guide",
        h2: "Custom Toppings & Combinations",
        content: "Did you know you can combine toppings? You can request a Pecan Chocolate Chip Waffle or top your waffle with warm country ham or crispy bacon strips!",
        bulletPoints: [
          "Pecan + Chocolate Chip combo for a nutty chocolate crunch.",
          "Order your waffle 'well done' for extra crispy deep brown edges.",
          "Add warm butter and real maple-flavored syrup at your booth."
        ]
      }
    ]
  },
  {
    slug: "hashbrowns-decoded",
    title: "Hashbrowns Decoded: Scattered, Smothered, Covered & Beyond",
    seoTitle: "Waffle House Hashbrown Terminology Decoded (2026 Guide)",
    metaDescription: "Learn all 9 Waffle House hashbrown topping terms — Scattered, Smothered, Covered, Chunked, Diced, Peppered, Capped, Topped, and Country.",
    summary: "The ultimate cheat sheet to ordering Waffle House hashbrowns like a seasoned regular. All 9 topping terms explained with prices and calories.",
    quickAnswer: "Waffle House hashbrown ordering starts with size (Regular $3.15, Large $3.65, Triple $4.15) followed by toppings: Smothered (onions), Covered (cheese), Chunked (ham), Diced (tomatoes), Peppered (jalapeños), Capped (mushrooms), Topped (chili), and Country (gravy).",
    image: hashbrownsArticleImg,
    author: defaultAuthor,
    publishDate: "2026-02-01",
    lastUpdated: "2026-08-04",
    readMinutes: 6,
    category: "Sides",
    relatedCategories: ["hashbrowns", "hashbrown-bowls"],
    toc: [
      { id: "intro", title: "The Art of Waffle House Hashbrowns", level: 2 },
      { id: "sizes", title: "Step 1: Choose Your Portion Size", level: 2 },
      { id: "topping-terms", title: "Step 2: The 8 Official Topping Modifiers", level: 2 },
      { id: "popular-combos", title: "Most Popular Hashbrown Combos", level: 2 },
      { id: "faqs", title: "Hashbrown FAQs", level: 2 },
    ],
    faqs: [
      {
        question: "What does 'All the Way' mean at Waffle House?",
        answer: "'All the Way' means hashbrowns loaded with all 8 toppings: onions, melted American cheese, diced ham, tomatoes, jalapeño peppers, grilled mushrooms, Bert's Chili™, and sausage gravy.",
      },
      {
        question: "How much does it cost to add toppings to hashbrowns?",
        answer: "Toppings generally cost $0.65 to $0.80 each, or you can order 'All the Way' for a discounted bundled price ($6.50 - $7.25).",
      }
    ],
    sections: [
      {
        id: "intro",
        h2: "The Art of Waffle House Hashbrowns",
        content: "Shredded 100% real potatoes seared to golden perfection on a 375°F flat top grill. Hashbrowns are Waffle House's proudest invention, with over 100 million orders served annually.",
      },
      {
        id: "topping-terms",
        h2: "Step 2: The 8 Official Topping Modifiers",
        content: "Here is your official diner dictionary for ordering hashbrown toppings:",
        table: {
          headers: ["Term", "Topping Added", "Price Add", "Calories Add"],
          rows: [
            ["Smothered", "Sauteed diced onions", "+$0.65", "+30 kcal"],
            ["Covered", "Melted American cheese", "+$0.70", "+100 kcal"],
            ["Chunked", "Diced hickory-smoked ham", "+$0.80", "+70 kcal"],
            ["Diced", "Fresh grilled tomatoes", "+$0.65", "+15 kcal"],
            ["Peppered", "Spicy jalapeño peppers", "+$0.65", "+10 kcal"],
            ["Capped", "Grilled button mushrooms", "+$0.70", "+20 kcal"],
            ["Topped", "Bert's Chili™", "+$0.85", "+110 kcal"],
            ["Country", "Creamy sausage gravy", "+$0.85", "+140 kcal"]
          ]
        }
      }
    ]
  },
  {
    slug: "budget-meals-under-ten",
    title: "6 Filling Meals Under $10 at Waffle House in 2026",
    seoTitle: "6 Best Waffle House Meals Under $10 (Budget Diner Guide 2026)",
    metaDescription: "Beat inflation with these 6 high-value, budget-friendly Waffle House meals under $10. Prices, calorie counts, and money-saving menu ordering tips.",
    summary: "Prices are rising nationwide, but these 6 complete diner plates deliver maximum flavor and calories for under $10.",
    quickAnswer: "The best overall meal under $10 is the Cheese 'N Eggs Breakfast ($7.75, 670 kcal) or the Quarter Pound Angus Hamburger Deluxe ($8.50, 540 kcal).",
    image: budgetMealsImg,
    author: defaultAuthor,
    publishDate: "2026-02-10",
    lastUpdated: "2026-08-05",
    readMinutes: 5,
    category: "Value",
    relatedCategories: ["burgers", "sandwiches", "breakfast-sandwiches"],
    toc: [
      { id: "intro", title: "Eating Great on a Budget", level: 2 },
      { id: "cheap-meals", title: "Top 6 Meals Under $10", level: 2 },
      { id: "hacks", title: "Smart Diner Hacks to Save Money", level: 2 },
    ],
    faqs: [
      {
        question: "Can you get a full meal at Waffle House for under $8?",
        answer: "Yes! The 2 Egg Breakfast ($6.25), Cheese 'N Eggs ($7.75), or Egg Sandwich ($6.00) are all full plates under $8.",
      }
    ],
    sections: [
      {
        id: "intro",
        h2: "Eating Great on a Budget",
        content: "While fast food prices have skyrocketed across America, Waffle House remains one of the last true sanctuaries of affordable, fresh-cooked hot food.",
      },
      {
        id: "cheap-meals",
        h2: "Top 6 Meals Under $10",
        content: "Here are our top budget-friendly menu picks for 2026:",
        table: {
          headers: ["Item Name", "Category", "Price", "Calories"],
          rows: [
            ["2 Egg Breakfast with Toast & Side", "Breakfast", "$6.25", "670 kcal"],
            ["Cheese 'N Eggs Breakfast", "Breakfast", "$7.75", "670 kcal"],
            ["Quarter Pound Angus Hamburger", "Burgers", "$8.50", "540 kcal"],
            ["Bacon, Egg & Cheese Sandwich", "Sandwiches", "$7.85", "490 kcal"],
            ["Texas Angus Patty Melt", "Melts", "$9.95", "790 kcal"],
            ["Classic Golden Waffle + Coffee", "Waffles & Drinks", "$7.15", "415 kcal"]
          ]
        }
      }
    ]
  },
  {
    slug: "coffee-and-late-night",
    title: "Late-Night Coffee, Sweet Tea & the 24/7 Diner Experience",
    seoTitle: "Waffle House Bottomless Coffee & Drinks Guide (2026 Edition)",
    metaDescription: "An insider look at Waffle House coffee, Alice's Iced Tea™, milkshakes, and why the 24/7 diner coffee mug is an American icon.",
    summary: "The bottomless coffee mug is the ultimate symbol of American diner culture. Here is the full story of Waffle House beverages.",
    quickAnswer: "Waffle House serves 100% Arabica diner coffee for $2.40 with unlimited free refills. Other top cold drinks include Alice's Sweet Tea ($2.65) and Simply Orange Juice ($3.10).",
    image: lateNightCoffeeImg,
    author: defaultAuthor,
    publishDate: "2026-02-18",
    lastUpdated: "2026-08-06",
    readMinutes: 4,
    category: "Drinks",
    relatedCategories: ["beverages"],
    toc: [
      { id: "coffee-story", title: "The Story of the Bottomless Mug", level: 2 },
      { id: "drink-prices", title: "Complete Beverage Price & Calorie List", level: 2 },
    ],
    faqs: [
      {
        question: "Does Waffle House charge for coffee refills?",
        answer: "No! Coffee refills are 100% free and unlimited when you dine in.",
      }
    ],
    sections: [
      {
        id: "coffee-story",
        h2: "The Story of the Bottomless Mug",
        content: "Since 1955, Waffle House has brewed signature Arabica coffee served in heavy ceramic mugs. The diner rule is simple: if your mug is half empty, a friendly server will top it off without asking.",
      },
      {
        id: "drink-prices",
        h2: "Complete Beverage Price & Calorie List",
        content: "Here is a quick look at top beverages on the menu:",
        table: {
          headers: ["Beverage", "Price", "Calories", "Refills"],
          rows: [
            ["Classic Blend Coffee", "$2.40", "5 kcal", "Free Unlimited"],
            ["Dark Roast Coffee", "$2.40", "5 kcal", "Free Unlimited"],
            ["Alice's Sweet Iced Tea", "$2.65", "70 kcal", "Free Unlimited"],
            ["Simply Orange Juice", "$3.10", "160 kcal", "Single Serve"],
            ["Large Chocolate Milk", "$3.50", "440 kcal", "Single Serve"]
          ]
        }
      }
    ]
  },
  {
    slug: "waffle-house-allergen-guide",
    title: "Waffle House Allergen Guide & Gluten-Free Dining Options",
    seoTitle: "Waffle House Allergen & Gluten-Free Guide (2026 Edition)",
    metaDescription: "Looking for gluten-free options or allergen warnings at Waffle House? Read our complete, verified guide to dining safely with food sensitivities.",
    summary: "A comprehensive review of Waffle House allergens and gluten-free choices, highlighting cross-contact risks and ordering tips for safe dining.",
    quickAnswer: "Waffle House does not offer a certified gluten-free menu due to high risk of cross-contact on shared griddles. However, hashbrowns griddled in vegetable oil and eggs cooked in designated pans are popular low-risk options.",
    image: breakfastPlatesImg,
    author: defaultAuthor,
    publishDate: "2026-03-01",
    lastUpdated: "2026-08-15",
    readMinutes: 6,
    category: "Dietary",
    relatedCategories: ["allergens", "dietary", "nutrition"],
    toc: [
      { id: "intro", title: "Navigating Food Allergens at Waffle House", level: 2 },
      { id: "gluten-free", title: "Gluten-Free & Wheat Sensitivity Options", level: 2 },
      { id: "allergen-cross-contact", title: "Shared Griddles & Cross-Contact Risks", level: 2 },
      { id: "faqs", title: "Allergen FAQs", level: 2 },
    ],
    faqs: [
      {
        question: "Are Waffle House hashbrowns gluten-free?",
        answer: "Waffle House hashbrowns are made from 100% potatoes and griddled in vegetable oil, which contains no gluten. However, they are cooked on a shared griddle where wheat toast, buns, and waffle batters are also handled, posing a cross-contact risk.",
      },
      {
        question: "What oil does Waffle House use for griddling?",
        answer: "Waffle House uses a liquid vegetable oil shortening for griddling hashbrowns and frying eggs, which is free from dairy and animal products.",
      }
    ],
    sections: [
      {
        id: "intro",
        h2: "Navigating Food Allergens at Waffle House",
        content: "If you have food allergies or sensitivities, eating out can be challenging. Waffle House prepares all food in open kitchens on shared equipment, which means cross-contact between allergens is common.",
      },
      {
        id: "gluten-free",
        h2: "Gluten-Free & Wheat Sensitivity Options",
        content: "While Waffle House has no certified gluten-free products, guests with mild sensitivities frequently order these items:",
        bulletPoints: [
          "Classic Hashbrowns: Plain or topped with cheese, onions, or ham (avoid gravy and chili).",
          "Griddled Eggs: Cooked in individual pans rather than on the main flat top.",
          "Breakfast Meats: Bacon strips and sausage patties contain no wheat ingredients.",
          "Beverages: Coffee, Alice's Iced Tea, and Simply Orange Juice are gluten-free."
        ]
      }
    ]
  },
  {
    slug: "waffle-house-nutrition-facts",
    title: "Waffle House Calories & Nutrition Facts: How to Order Smart",
    seoTitle: "Waffle House Nutrition Guide 2026: Calorie & Carb Statistics",
    metaDescription: "Read the full Waffle House nutrition facts breakdown. Learn how to track calories, sodium, carbs, and protein across eggs, hashbrowns, and waffles.",
    summary: "A practical guide to navigating the Waffle House nutrition menu, helping you find lower-calorie options and track daily macronutrients.",
    quickAnswer: "A classic Sweet Cream Waffle has 410 calories and 55g of carbs. To build a lower-calorie meal, order scrambled eggs with dry wheat toast and a regular side of griddled hashbrowns.",
    image: lateNightCoffeeImg,
    author: defaultAuthor,
    publishDate: "2026-03-10",
    lastUpdated: "2026-08-15",
    readMinutes: 5,
    category: "Nutrition",
    relatedCategories: ["nutrition", "dietary", "breakfast"],
    toc: [
      { id: "intro", title: "Healthy Eating at Waffle House", level: 2 },
      { id: "calorie-chart", title: "Calorie & Protein Counts for Popular Items", level: 2 },
      { id: "tips", title: "Smart Nutrition Ordering Tips", level: 2 },
    ],
    faqs: [
      {
        question: "How many calories are in a Waffle House All-Star Special?",
        answer: "The All-Star Special ranges from 950 to 1,250 calories depending on your choice of meat, waffle toppings, and whether you choose hashbrowns or grits.",
      },
      {
        question: "How do I reduce sodium at Waffle House?",
        answer: "To reduce sodium, choose scrambled eggs, dry toast, and avoid salty breakfast meats like country ham, sausage gravy, or Bert's Chili.",
      }
    ],
    sections: [
      {
        id: "intro",
        h2: "Healthy Eating at Waffle House",
        content: "Waffle House is known for comfort food, but with a few simple substitutions, you can easily build a meal that fits your macros, whether you're keto, low-calorie, or high-protein.",
      },
      {
        id: "calorie-chart",
        h2: "Calorie & Protein Counts for Popular Items",
        content: "Here is a comparison of classic menu items to help you plan your meal:",
        table: {
          headers: ["Menu Item", "Calories", "Fat (g)", "Carbs (g)", "Protein (g)"],
          rows: [
            ["Single Waffle (Plain)", "410 kcal", "18g", "55g", "8g"],
            ["Two Eggs (Scrambled)", "180 kcal", "14g", "2g", "12g"],
            ["Hashbrowns (Regular)", "190 kcal", "8g", "27g", "3g"],
            ["Bacon (Three Slices)", "110 kcal", "9g", "0g", "8g"],
            ["Sausage (Two Patties)", "240 kcal", "22g", "1g", "10g"]
          ]
        }
      }
    ]
  }
];
