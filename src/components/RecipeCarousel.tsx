import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { MenuItem } from "@/data/menu";

interface RecipeCarouselProps {
  items: MenuItem[];
}

export function RecipeCarousel({ items }: RecipeCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="relative mt-8">
      {/* Horizontal Scrollable Container */}
      <div
        ref={scrollerRef}
        className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <article
            key={item.slug}
            className="group flex w-[280px] sm:w-[320px] flex-none snap-start flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_18px_40px_-30px_rgba(0,0,0,0.16)] transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-[0_1px_2px_rgba(0,0,0,0.06),0_28px_50px_-28px_rgba(0,0,0,0.25)]"
          >
            <Link
              to="/menu/$category/$slug"
              params={{ category: item.category, slug: item.slug }}
              className="block aspect-[4/3] w-full overflow-hidden bg-muted"
              aria-label={`View recipe: ${item.name}`}
            >
              <img
                src={item.image}
                alt={item.name}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </Link>
            <div className="flex flex-1 flex-col p-5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                {item.category.replace("-", " ")}
              </span>
              <h3 className="mt-1 font-display text-lg font-semibold leading-tight text-foreground">
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
                    {item.nutrition.calories.toLocaleString()} cal
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
        ))}
      </div>

      {/* Left Arrow Button */}
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="Previous items"
        className="absolute -left-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white p-3 text-foreground shadow-lg transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden />
      </button>

      {/* Right Arrow Button */}
      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="Next items"
        className="absolute -right-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full border border-border bg-white p-3 text-foreground shadow-lg transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
      >
        <ChevronRight className="h-5 w-5" aria-hidden />
      </button>
    </div>
  );
}
