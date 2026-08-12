import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronRight, Search as SearchIcon, BookOpen, Utensils, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import { menu } from "@/data/menu";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      q: typeof search.q === "string" ? search.q : "",
    };
  },
  head: () => ({
    meta: [
      { title: `Search Results | Waffle House Menu` },
      { name: "description", content: "Search Waffle House menu items, prices, calorie counts, and blog posts." },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/search` }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q: initialQ } = Route.useSearch();
  const [query, setQuery] = useState(initialQ);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate({ to: "/search", search: { q: query.trim() } });
    }
  };

  const searchTerm = (initialQ || query).toLowerCase().trim();

  // Search in Menu Items
  const matchedMenuItems = searchTerm
    ? menu.filter(
        (m) =>
          m.name.toLowerCase().includes(searchTerm) ||
          m.description.toLowerCase().includes(searchTerm) ||
          m.category.toLowerCase().includes(searchTerm)
      )
    : [];

  // Search in Blog Posts
  const matchedBlogPosts = searchTerm
    ? blogPosts.filter(
        (b) =>
          b.title.toLowerCase().includes(searchTerm) ||
          b.summary.toLowerCase().includes(searchTerm) ||
          b.category.toLowerCase().includes(searchTerm)
      )
    : [];

  return (
    <div className="bg-white min-h-[70vh]">
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
            <span className="inline-flex items-current rounded-sm bg-primary px-3 py-1.5 text-foreground">
              Search
            </span>
          </nav>

          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Search Menu &amp; Articles
          </h1>

          {/* Search Bar Input */}
          <form onSubmit={handleSearchSubmit} className="mt-6 flex max-w-2xl items-center gap-2">
            <div className="relative flex-1">
              <SearchIcon aria-hidden className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search waffles, bacon, hashbrowns, calories, prices..."
                className="h-14 w-full rounded-2xl border border-border bg-white pl-12 pr-4 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm"
              />
            </div>
            <button type="submit" className="btn-primary h-14 px-8 text-base">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Search Results Content */}
      <section className="container-editorial py-12 md:py-16">
        {searchTerm ? (
          <div className="space-y-12">
            <p className="text-sm font-medium text-ink-soft">
              Found <strong className="text-foreground">{matchedMenuItems.length} menu items</strong> and{" "}
              <strong className="text-foreground">{matchedBlogPosts.length} articles</strong> matching &quot;
              <span className="text-primary font-semibold">{searchTerm}</span>&quot;
            </p>

            {/* Menu Items Results */}
            {matchedMenuItems.length > 0 && (
              <div>
                <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-foreground mb-6">
                  <Utensils className="h-5 w-5 text-amber-500" />
                  Matching Menu Items ({matchedMenuItems.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchedMenuItems.map((item) => (
                    <div
                      key={`${item.category}-${item.slug}`}
                      className="rounded-2xl border border-border bg-white p-5 shadow-sm hover:border-primary transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {item.category}
                        </span>
                        <h3 className="mt-2 font-display text-lg font-semibold text-foreground">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-ink-soft line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                        <span className="font-semibold text-foreground">${item.price.toFixed(2)} • {item.nutrition.calories} kcal</span>
                        <Link
                          to="/menu/$category/$slug"
                          params={{ category: item.category, slug: item.slug }}
                          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                        >
                          View Recipe <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Blog Posts Results */}
            {matchedBlogPosts.length > 0 && (
              <div>
                <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-foreground mb-6">
                  <BookOpen className="h-5 w-5 text-amber-500" />
                  Matching Articles &amp; Guides ({matchedBlogPosts.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchedBlogPosts.map((post) => (
                    <article
                      key={post.slug}
                      className="group rounded-2xl border border-border bg-white p-5 shadow-sm hover:border-primary transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {post.category}
                        </span>
                        <h3 className="mt-2 font-display text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                          <Link to="/blog/$slug" params={{ slug: post.slug }}>
                            {post.title}
                          </Link>
                        </h3>
                        <p className="mt-1 text-xs text-ink-soft line-clamp-2">
                          {post.summary}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-ink-soft">
                        <span>Updated {post.lastUpdated}</span>
                        <Link
                          to="/blog/$slug"
                          params={{ slug: post.slug }}
                          className="font-semibold text-foreground hover:text-primary flex items-center gap-1"
                        >
                          Read Guide <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {matchedMenuItems.length === 0 && matchedBlogPosts.length === 0 && (
              <div className="text-center py-12 rounded-2xl border border-border bg-[#FAF9F6]">
                <p className="font-display text-xl font-semibold text-foreground">No matches found</p>
                <p className="mt-2 text-sm text-ink-soft">
                  We couldn&apos;t find anything for &quot;{searchTerm}&quot;. Try searching for waffles, coffee, hashbrowns, or eggs.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-base text-ink-soft">Type a keyword above to search recipes, menu items, prices, calories, and blog articles.</p>
          </div>
        )}
      </section>
    </div>
  );
}
