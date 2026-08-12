import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, LayoutGrid, ArrowRight } from "lucide-react";
import { categories } from "@/data/menu";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Waffle House Menu Categories Guide 2026 | All 13 Categories" },
      {
        name: "description",
        content:
          "Browse all 13 official Waffle House menu categories — Waffles, All-Star Special, Hashbrowns, Omelets, Angus Burgers, Melts, Biscuits, Beverages, and Desserts.",
      },
      { property: "og:title", content: "Waffle House Menu Categories Guide 2026" },
      {
        property: "og:description",
        content:
          "Browse all 13 official Waffle House menu categories with current prices and calorie counts.",
      },
      { property: "og:url", content: `${SITE}/categories` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/categories` }],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="border-b border-border bg-[#F7F7F5]">
        <div className="container-editorial py-12 md:py-16">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-1 rounded-sm bg-primary px-3 py-1.5 text-foreground hover:bg-primary/90"
            >
              Home <ChevronRight className="h-3 w-3" aria-hidden />
            </Link>
            <span className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-foreground">
              Categories
            </span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
              <LayoutGrid className="h-7 w-7 text-amber-700" aria-hidden />
            </div>
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                Menu Categories Guide
              </h1>
              <p className="mt-2 text-base text-ink-soft max-w-2xl">
                Explore all 13 official Waffle House menu sections, complete with verified 2026 prices, calories, and ordering advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of Categories */}
      <section className="container-editorial py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to="/menu/$category"
              params={{ category: cat.id }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-muted">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {cat.name}
                </h2>
                <p className="mt-2 text-sm text-ink-soft line-clamp-2 flex-1">
                  {cat.blurb}
                </p>
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-foreground group-hover:text-primary">
                  <span>Explore Category</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Category Recipe Summary Table */}
        <div className="mt-16 border-t border-border pt-12">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Complete Menu Category &amp; Recipe Count Master Table
          </h2>
          <p className="mt-2 text-sm text-ink-soft">
            Full inventory of all official Waffle House menu categories with total recipe counts and average pricing.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-primary text-black font-bold uppercase tracking-wider text-xs">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left">Menu Category Name</th>
                    <th scope="col" className="px-6 py-4 text-center">Total Recipes</th>
                    <th scope="col" className="px-6 py-4 text-left">Price Range</th>
                    <th scope="col" className="px-6 py-4 text-left">Signature Recipe</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {[
                    { name: "BREAKFAST ALL-STAR SPECIAL™", count: "15 Recipes", price: "Combo / $10.95–$13.85", dish: "All-Star Special Waffle Combo" },
                    { name: "Waffles", count: "10 Recipes", price: "$5.20 – $9.95", dish: "Classic Sweet Cream Waffle" },
                    { name: "Egg Breakfasts", count: "24 Recipes", price: "$6.85 – $12.95", dish: "2 Eggs Scrambled Breakfast" },
                    { name: "Toddle House© Omelets", count: "10 Recipes", price: "$8.95 – $11.45", dish: "Ham & Cheese Omelet" },
                    { name: "Hashbrowns & Bowls", count: "13 Recipes", price: "$3.65 – $9.95", dish: "Smothered & Covered Hashbrowns" },
                    { name: "Hashbrown Bowls", count: "10 Recipes", price: "$9.25 – $9.95", dish: "Sausage Egg & Cheese Bowl" },
                    { name: "Grilled Biscuits", count: "11 Recipes", price: "$5.95 – $7.45", dish: "Bacon Egg & Cheese Biscuit" },
                    { name: "Breakfast Sandwiches", count: "19 Recipes", price: "$5.95 – $8.95", dish: "Texas Sausage Egg & Cheese Melt" },
                    { name: "Texas Melts", count: "10 Recipes", price: "$8.95 – $9.95", dish: "Texas Cheesesteak™ Melt" },
                    { name: "Angus Burgers", count: "11 Recipes", price: "$7.95 – $9.45", dish: "Angus 1/4 LB Cheeseburger Deluxe" },
                    { name: "Sandwiches & Melts", count: "10 Recipes", price: "$7.95 – $8.95", dish: "Grilled Chicken Sandwich Deluxe" },
                    { name: "Classic Dinners", count: "6 Recipes", price: "$12.95 – $16.50", dish: "T-Bone Steak & Eggs" },
                    { name: "Sides & Extras", count: "14 Recipes", price: "$2.40 – $4.95", dish: "Hickory-Smoked Bacon Strips" },
                    { name: "Beverages & Pies", count: "21 Recipes", price: "$2.45 – $4.45", dish: "Bottomless Coffee & Southern Pecan Pie" },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-foreground">{row.name}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
                          {row.count}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-ink-soft font-semibold">{row.price}</td>
                      <td className="px-6 py-4 font-medium text-foreground">{row.dish}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
