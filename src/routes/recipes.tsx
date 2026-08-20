import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, ChefHat, Sparkles, Star, Flame, Utensils, ArrowRight, Heart, Share2, BookOpen, Layers } from "lucide-react";
import { useState } from "react";

import wafflesImg from "@/assets/hero-waffles.jpg";
import allStarImg from "@/assets/all-star-breakfast.jpg";
import hashbrownsImg from "@/assets/hashbrowns.jpg";
import pattyMeltImg from "@/assets/patty-melt.jpg";
import pecanWaffleImg from "@/assets/waffle-peanut-butter.jpg";
import chocolateWaffleImg from "@/assets/waffle-chocolate-chip.jpg";
import lowcalEggsImg from "@/assets/nutrition-lowcal-eggs.jpg";
import tboneImg from "@/assets/tbone-steak.jpg";

export const Route = createFileRoute("/recipes")({
  head: () => ({
    meta: [
      { title: "Waffle House Copycat Recipes & Diner Cooking Guides (2026)" },
      {
        name: "description",
        content: "Learn how to make authentic Waffle House copycat recipes at home: sweet cream waffles, scattered hashbrowns, Toddle House omelets, and Texas melts.",
      },
    ],
  }),
  component: RecipesPage,
});

interface RecipeItem {
  id: string;
  title: string;
  category: string;
  rating: number;
  reviews: number;
  prepTime: string;
  cookTime: string;
  calories: number;
  image: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  dinerSecret: string;
  link: string;
}

const recipesList: RecipeItem[] = [
  {
    id: "sweet-cream-waffle",
    title: "Classic Sweet Cream Waffle (Secret Batter Recipe)",
    category: "Waffles",
    rating: 4.9,
    reviews: 342,
    prepTime: "10 mins",
    cookTime: "4 mins",
    calories: 410,
    image: wafflesImg,
    description: "The unmistakable golden crisp exterior and fluffy sweet-cream interior that made Waffle House famous since 1955.",
    ingredients: [
      "2 cups all-purpose flour",
      "1 tsp salt & 1 tsp baking soda",
      "1/4 cup granulated sugar",
      "2 large farm-fresh eggs",
      "1 1/2 cups half-and-half (or whole milk + heavy cream)",
      "1/2 cup buttermilk",
      "4 tbsp melted unsalted butter",
      "1 tsp pure vanilla extract"
    ],
    instructions: [
      "Whisk dry ingredients (flour, sugar, baking soda, salt) in a medium mixing bowl.",
      "In a separate bowl, whisk together eggs, half-and-half, buttermilk, melted butter, and vanilla.",
      "Gently combine wet and dry ingredients until just mixed; let the batter rest for 10 minutes at room temperature.",
      "Preheat your Belgian waffle iron to high heat (~400°F). Lightly coat with butter oil.",
      "Pour 1/2 cup batter and bake for 3.5 to 4 minutes until deep golden brown. Serve with salted butter and warm syrup."
    ],
    dinerSecret: "Waffle House uses a high-protein sweet-cream batter and lets it rest to develop flavor before pouring onto heavy 400°F cast-iron plates.",
    link: "/menu/waffles/classic-waffle"
  },
  {
    id: "hashbrowns-all-the-way",
    title: "Scattered, Smothered & Covered Hashbrowns",
    category: "Hashbrowns",
    rating: 5.0,
    reviews: 480,
    prepTime: "15 mins",
    cookTime: "8 mins",
    calories: 520,
    image: hashbrownsImg,
    description: "Crispy shredded Idaho russet potatoes scattered wide on a scorching flat top, smothered in sweet sautéed onions and covered in melted American cheese.",
    ingredients: [
      "2 large Russet potatoes, peeled and shredded coarsely",
      "3 tbsp salted butter or diner griddle oil",
      "1/2 yellow sweet onion, finely diced (Smothered)",
      "2 slices real American cheese (Covered)",
      "1/2 tsp kosher salt & 1/4 tsp black pepper"
    ],
    instructions: [
      "Soak shredded potatoes in ice water for 10 minutes, then squeeze completely dry in a clean kitchen towel (critical for crispiness).",
      "Heat a cast-iron skillet or griddle to 375°F with 2 tbsp oil.",
      "Scatter shredded potatoes in an even, thin circular layer. Do not press down or touch for 4 minutes until the bottom forms a golden crust.",
      "Scatter diced onions around the perimeter to caramelize.",
      "Flip the potato patty, top immediately with sautéed onions and 2 slices of American cheese, and cover with a metal dome for 2 minutes to melt."
    ],
    dinerSecret: "Extracting 100% of the surface starch and moisture with ice-water rinsing is the single secret to diner-style crunch.",
    link: "/menu/hashbrowns/hashbrowns-all-the-way"
  },
  {
    id: "texas-angus-patty-melt",
    title: "Texas Angus Patty Melt with Grilled Sweet Onions",
    category: "Melts",
    rating: 4.9,
    reviews: 295,
    prepTime: "10 mins",
    cookTime: "6 mins",
    calories: 790,
    image: pattyMeltImg,
    description: "A seasoned 100% Angus beef patty griddled between two thick slices of buttered Texas toast with melted double cheese and sweet onions.",
    ingredients: [
      "1/3 lb fresh 100% ground Angus chuck (80/20 blend)",
      "2 thick slices Texas toast (or thick white bread)",
      "2 slices American cheese",
      "1/2 cup caramelized sweet onions",
      "2 tbsp salted butter",
      "1/4 tsp garlic powder, salt and cracked pepper"
    ],
    instructions: [
      "Season beef patty generously and sear on a 375°F flat griddle for 3 minutes per side until crusty.",
      "Butter both outer sides of the Texas toast.",
      "Assemble on the griddle: Toast slice, 1 slice cheese, burger patty, caramelized onions, 2nd cheese slice, and top toast slice.",
      "Grill for 2 minutes on each side until the bread is golden crisp and cheese is fully melted."
    ],
    dinerSecret: "Putting cheese on BOTH sides of the meat locks in the juices and cements the Texas toast securely.",
    link: "/menu/texas-melts/texas-angus-patty-melt"
  },
  {
    id: "toddle-house-omelet",
    title: "Fluffy Toddle House® 2-Egg Cheese Omelet",
    category: "Omelets",
    rating: 4.8,
    reviews: 215,
    prepTime: "5 mins",
    cookTime: "3 mins",
    calories: 500,
    image: lowcalEggsImg,
    description: "Whipped at high speed in an industrial malt mixer to incorporate micro-air bubbles, creating the fluffiest diner omelet imaginable.",
    ingredients: [
      "2 large USDA Grade A fresh eggs",
      "1 tbsp water (not milk!)",
      "1 tbsp clarified butter or oil",
      "2 slices American cheese",
      "Pinch of salt and white pepper"
    ],
    instructions: [
      "Whisk eggs with 1 tbsp water in a high-speed blender or with an electric frother for 45 seconds until super frothy and pale yellow.",
      "Pour into a hot greased 8-inch non-stick skillet over medium-high heat.",
      "Lift edges with a spatula to let uncooked egg run underneath for 60 seconds.",
      "Layer American cheese down the center, fold one third over, and roll out onto a warm plate."
    ],
    dinerSecret: "Waffle House uses milkshake spindle mixers to whip the eggs for maximum volume and steam expansion.",
    link: "/menu/omelets/cheese-omelet"
  },
  {
    id: "pecan-waffle",
    title: "Toasted Georgia Pecan Sweet Cream Waffle",
    category: "Waffles",
    rating: 4.9,
    reviews: 185,
    prepTime: "10 mins",
    cookTime: "4 mins",
    calories: 560,
    image: pecanWaffleImg,
    description: "Fresh Georgia pecan pieces lightly toasted and folded directly into sweet cream batter before baking.",
    ingredients: [
      "1 batch Sweet Cream Waffle Batter",
      "1/2 cup chopped Georgia pecans (lightly roasted in a dry pan)",
      "2 tbsp pure maple syrup",
      "Salted whipped butter"
    ],
    instructions: [
      "Toast raw pecan halves in a dry skillet for 3 minutes until aromatic, then chop coarsely.",
      "Sprinkle half the pecans directly onto the hot waffle iron grid before pouring batter.",
      "Pour batter and sprinkle remaining pecans on top, then close the iron lid immediately.",
      "Bake until steam ceases (approx. 3.5 minutes) for nutty crunch in every bite."
    ],
    dinerSecret: "Toasting the nuts prior to adding them to the iron releases natural oils that infuse the entire waffle crust.",
    link: "/menu/waffles/pecan-waffle"
  },
  {
    id: "t-bone-steak-eggs",
    title: "USDA Choice T-Bone Steak & Sunny Eggs Combo",
    category: "Dinners",
    rating: 4.7,
    reviews: 140,
    prepTime: "5 mins",
    cookTime: "7 mins",
    calories: 1230,
    image: tboneImg,
    description: "The legendary late-night breakfast feast: a 10-ounce bone-in T-Bone seared on a 400°F flat top with sunny-side up farm eggs.",
    ingredients: [
      "1 10-oz USDA Choice T-Bone Steak (room temperature)",
      "2 fresh eggs",
      "1 tbsp seasoned diner salt (paprika, garlic, onion, pepper)",
      "1 tbsp butter oil for griddle"
    ],
    instructions: [
      "Pat the T-Bone dry with paper towels and season aggressively on both sides.",
      "Place on a smoking hot flat griddle and sear undisturbed for 3.5 minutes.",
      "Flip steak and baste with butter; cook another 3 minutes for medium rare.",
      "Crack two eggs alongside the steak in butter for 2 minutes until whites are set and yolks remain runny."
    ],
    dinerSecret: "Seasoning the meat at room temperature 15 minutes before hitting the griddle creates a savory caramelized crust.",
    link: "/menu/classic-dinners/t-bone-steak-dinner"
  }
];

function RecipesPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeItem | null>(null);

  const categories = ["All", "Waffles", "Hashbrowns", "Melts", "Omelets", "Dinners"];

  const filtered = activeCategory === "All"
    ? recipesList
    : recipesList.filter((r) => r.category === activeCategory);

  return (
    <main className="bg-white text-foreground font-sans min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#0B0C0E] border-b border-white/10 text-white py-16 md:py-20">
        <div className="container-editorial">
          <div className="max-w-3xl space-y-4">
            <span className="chip text-primary bg-primary/10 border border-primary/20">
              Culinary Kitchen Guide
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight">
              Waffle House Copycat Recipes &amp; Diner Hacks
            </h1>
            <p className="text-base text-white/80 leading-relaxed">
              Unlock the secrets of authentic 24-hour diner cooking at home. From sweet-cream waffle batters to perfectly crisped scattered hashbrowns and blender-whipped omelets, recreate your favorite menu classics step by step.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter Dock */}
      <section className="bg-surface border-b border-border py-4 sticky top-0 z-20 backdrop-blur-md bg-surface/90">
        <div className="container-editorial flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                  activeCategory === c
                    ? "bg-primary text-black shadow-xs font-black"
                    : "bg-white border border-border text-foreground hover:border-primary"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <span className="text-xs text-ink-soft hidden sm:block">
            Showing {filtered.length} authentic recipes
          </span>
        </div>
      </section>

      {/* Recipe Cards Grid */}
      <section className="py-16 md:py-20">
        <div className="container-editorial">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((recipe) => (
              <article
                key={recipe.id}
                className="group flex flex-col rounded-2xl border border-border bg-white overflow-hidden shadow-xs hover:shadow-xl hover:border-primary transition-all duration-300"
              >
                {/* Square Food Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-muted">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={500}
                    height={500}
                  />
                  <span className="absolute top-3 left-3 rounded-md bg-black/75 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-xs">
                    {recipe.category}
                  </span>
                  <span className="absolute bottom-3 right-3 rounded-full bg-primary text-black px-2.5 py-0.5 text-xs font-black shadow-sm">
                    ★ {recipe.rating} ({recipe.reviews})
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {recipe.title}
                    </h3>
                    <p className="text-xs text-ink-soft leading-relaxed line-clamp-2">
                      {recipe.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-border/50 text-center text-xs">
                    <div>
                      <span className="text-[10px] text-ink-soft uppercase font-bold block">Prep</span>
                      <span className="font-bold text-foreground">{recipe.prepTime}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-ink-soft uppercase font-bold block">Cook</span>
                      <span className="font-bold text-foreground">{recipe.cookTime}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-ink-soft uppercase font-bold block">Energy</span>
                      <span className="font-bold text-primary font-black">{recipe.calories} cal</span>
                    </div>
                  </div>

                  {/* Secret Hint Callout */}
                  <div className="rounded-xl bg-amber-500/5 border border-amber-500/20 p-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1 mb-1">
                      <Sparkles className="h-3 w-3 text-primary" /> Diner Secret:
                    </span>
                    <p className="text-[11px] text-amber-950/80 leading-relaxed italic">
                      "{recipe.dinerSecret}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Link
                      to={recipe.link as any}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                    >
                      View Menu Nutrition →
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSelectedRecipe(recipe)}
                      className="btn-primary py-2 px-3.5 text-xs font-bold"
                    >
                      Read Recipe
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-border">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                  {selectedRecipe.category} Copycat
                </span>
                <h2 className="font-display text-2xl font-bold text-foreground mt-1">
                  {selectedRecipe.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedRecipe(null)}
                className="rounded-full bg-muted p-2 text-ink-soft hover:text-black transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                <Utensils className="h-4 w-4 text-primary" /> Ingredients:
              </h3>
              <ul className="grid sm:grid-cols-2 gap-2 text-xs text-ink-soft">
                {selectedRecipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2 bg-surface p-2 rounded-lg border border-border/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
                <ChefHat className="h-4 w-4 text-primary" /> Preparation Steps:
              </h3>
              <ol className="space-y-2 text-xs text-ink-soft">
                {selectedRecipe.instructions.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="h-5 w-5 rounded-full bg-primary/20 text-black font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
              <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" /> The Waffle House Secret:
              </h4>
              <p className="text-xs text-amber-900/85 leading-relaxed">
                {selectedRecipe.dinerSecret}
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedRecipe(null)}
                className="btn-primary py-2 px-5 text-xs font-bold"
              >
                Close Recipe
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
