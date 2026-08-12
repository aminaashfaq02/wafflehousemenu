import breakfastPlatesImg from "@/assets/article-breakfast-plates.jpg";
import waffleGuideImg from "@/assets/article-waffle-guide.jpg";
import hashbrownsArticleImg from "@/assets/article-hashbrowns.jpg";
import budgetMealsImg from "@/assets/article-budget-meals.jpg";
import lateNightCoffeeImg from "@/assets/article-late-night-coffee.jpg";

export interface Article {
  slug: string;
  title: string;
  summary: string;
  image: string;
  readMinutes: number;
  updatedAt: string;
  tag: string;
}

export const articles: Article[] = [
  {
    slug: "best-breakfast-items",
    title: "The 7 Best Breakfast Plates to Order Right Now",
    summary:
      "From the All-Star to the T-Bone & Eggs, the breakfast lineup that actually earns its spot on the menu — ranked by value, portion and craft.",
    image: breakfastPlatesImg,
    readMinutes: 6,
    updatedAt: "2026-07-12",
    tag: "Breakfast",
  },
  {
    slug: "waffles-guide",
    title: "A Complete Guide to the House Waffle",
    summary:
      "Why the classic waffle is still the best thing on the menu — and how to order it with pecans, chocolate chips or a scoop of peanut butter.",
    image: waffleGuideImg,
    readMinutes: 5,
    updatedAt: "2026-07-10",
    tag: "Waffles",
  },
  {
    slug: "hashbrowns-decoded",
    title: "Hashbrowns Decoded: Smothered, Covered, Chunked",
    summary:
      "The complete plain-English guide to every hashbrown modifier, what it actually adds, and which combination locals order most.",
    image: hashbrownsArticleImg,
    readMinutes: 4,
    updatedAt: "2026-07-08",
    tag: "Sides",
  },
  {
    slug: "budget-meals-under-ten",
    title: "6 Filling Meals Under $10 in 2026",
    summary:
      "Prices are up everywhere, but a few dishes still deliver a real plate for under a ten-dollar bill. Here's the current shortlist.",
    image: budgetMealsImg,
    readMinutes: 5,
    updatedAt: "2026-07-05",
    tag: "Value",
  },
  {
    slug: "coffee-and-late-night",
    title: "Late-Night Coffee, Sweet Tea and the 24/7 Table",
    summary:
      "A love letter to the bottomless mug — where the coffee sits on the menu, how it's brewed, and the drinks worth ordering after midnight.",
    image: lateNightCoffeeImg,
    readMinutes: 4,
    updatedAt: "2026-07-03",
    tag: "Drinks",
  },
];
