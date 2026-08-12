import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { MenuItem } from "@/data/menu";

export function MenuCard({ item, priority = false }: { item: MenuItem; priority?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-30px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_28px_50px_-28px_rgba(0,0,0,0.25)]">
      <Link
        to="/menu/$category/$slug"
        params={{ category: item.category, slug: item.slug }}
        className="block aspect-[4/3] w-full overflow-hidden bg-muted"
        aria-label={`View recipe: ${item.name}`}
      >
        <img
          src={item.image}
          alt={item.name}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          width={1200}
          height={900}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        {/* Dynamic Dietary Badges */}
        <div className="mb-2 flex flex-wrap gap-1.5">
          {!item.allergens.includes("gluten") && (
            <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
              Gluten-Free
            </span>
          )}
          {item.nutrition.proteinG >= 25 && (
            <span className="rounded-md bg-sky-500/10 px-2 py-0.5 text-[11px] font-semibold text-sky-700">
              High Protein ({item.nutrition.proteinG}g)
            </span>
          )}
          {item.nutrition.calories <= 500 && (
            <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
              Under 500 Cal
            </span>
          )}
        </div>
        <h3 className="font-display text-lg font-semibold leading-tight text-foreground">
          <Link
            to="/menu/$category/$slug"
            params={{ category: item.category, slug: item.slug }}
            className="hover:text-primary"
          >
            {item.name}
          </Link>
        </h3>
        <dl className="mt-3 space-y-1 text-sm text-ink-soft">
          <div>
            <dt className="inline">Price: </dt>
            <dd className="inline font-semibold text-foreground">
              ${item.price.toFixed(2)}
            </dd>
          </div>
          <div>
            <dt className="inline">Calories: </dt>
            <dd className="inline font-semibold text-foreground">
              {item.nutrition.calories.toLocaleString()}
            </dd>
          </div>
        </dl>
        <Link
          to="/menu/$category/$slug"
          params={{ category: item.category, slug: item.slug }}
          className="btn-primary mt-5 h-10 w-full justify-center text-sm"
        >
          View Recipe <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
