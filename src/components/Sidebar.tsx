import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, Flame, Clock, BookOpen, ArrowRight, Tag } from "lucide-react";
import { categories } from "@/data/menu";
import { articles } from "@/data/articles";

export function Sidebar({ currentSlug }: { currentSlug?: string }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate({ to: "/search", search: { q: query.trim() } });
    }
  };

  const filteredArticles = articles.filter((a) => a.slug !== currentSlug);
  const popularArticles = [...filteredArticles].slice(0, 4);
  const latestArticles = [...filteredArticles].reverse().slice(0, 4);

  return (
    <aside className="space-y-8">
      {/* Search Widget */}
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h3 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
          <Search className="h-4 w-4 text-amber-500" aria-hidden />
          Search Blog &amp; Menu
        </h3>
        <form onSubmit={handleSearch} className="mt-4 relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes, posts, calories..."
            className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 pr-10 text-sm placeholder:text-ink-soft focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            aria-label="Submit Search"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-primary p-1.5 text-black hover:bg-primary/90 transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Popular Articles Widget */}
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h3 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
          <Flame className="h-4 w-4 text-amber-500" aria-hidden />
          Popular Articles
        </h3>
        <div className="mt-4 space-y-4 divide-y divide-border/60">
          {popularArticles.map((art) => (
            <article key={art.slug} className="pt-3 first:pt-0 group">
              <Link
                to="/blog/$slug"
                params={{ slug: art.slug }}
                className="flex items-start gap-3"
              >
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-muted border border-border">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                    {art.tag}
                  </span>
                  <h4 className="font-display text-xs font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {art.title}
                  </h4>
                  <span className="mt-1 flex items-center gap-1 text-[11px] text-ink-soft">
                    <Clock className="h-3 w-3" /> {art.readMinutes} min read
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Categories Widget */}
      <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
        <h3 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
          <Tag className="h-4 w-4 text-amber-500" aria-hidden />
          Menu Categories
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to="/menu/$category"
              params={{ category: cat.id }}
              className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground hover:border-primary hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Posts Widget */}
      <div className="rounded-2xl border border-border bg-[#FAF9F6] p-6 shadow-sm">
        <h3 className="flex items-center gap-2 font-display text-base font-semibold text-foreground">
          <BookOpen className="h-4 w-4 text-amber-500" aria-hidden />
          Latest Guides
        </h3>
        <ul className="mt-3 space-y-2 text-xs">
          {latestArticles.map((art) => (
            <li key={art.slug} className="border-b border-border/50 pb-2 last:border-0 last:pb-0">
              <Link
                to="/blog/$slug"
                params={{ slug: art.slug }}
                className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
              >
                • {art.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
