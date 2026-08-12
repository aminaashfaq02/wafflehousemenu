import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Clock, Calendar, ArrowRight, BookOpen, PlusCircle } from "lucide-react";
import { getAllBlogPosts } from "@/data/blogStore";
import type { BlogPost } from "@/data/blogPosts";
import { Sidebar } from "@/components/Sidebar";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Waffle House Diner Journal & Recipe Blog | 2026 Guides" },
      {
        name: "description",
        content:
          "Explore expert culinary reviews, menu price breakdowns, nutrition analysis, diner hacks, and secret recipes for Waffle House food.",
      },
      { property: "og:title", content: "Waffle House Diner Journal & Recipe Blog | 2026 Guides" },
      {
        property: "og:description",
        content:
          "Expert culinary guides, menu breakdowns, nutrition tips, and diner hacks for Waffle House.",
      },
      { property: "og:url", content: `${SITE}/blog` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/blog` }],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>("All");

  useEffect(() => {
    setPosts(getAllBlogPosts());
  }, []);

  const categories = ["All", "Breakfast", "Waffles", "Sides", "Value", "Drinks"];

  const filteredPosts =
    selectedTag === "All"
      ? posts
      : posts.filter((p) => p.category.toLowerCase() === selectedTag.toLowerCase());

  const featuredPost = posts[0];

  return (
    <div className="bg-white">
      {/* Hero Header */}
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
              Diner Blog &amp; Journal
            </span>
          </nav>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
                <BookOpen className="h-7 w-7 text-amber-700" aria-hidden />
              </div>
              <div>
                <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                  The Diner Journal
                </h1>
                <p className="mt-2 text-base text-ink-soft max-w-2xl">
                  In-depth menu analysis, nutrition breakdowns, price trends, and culinary guides from our diner experts.
                </p>
              </div>
            </div>
            <Link
              to="/admin/create-post"
              className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary/10 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-black transition-colors"
            >
              <PlusCircle className="h-4 w-4" /> Admin Publisher &amp; SEO Suite
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container-editorial py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Articles List (Left - 8 Cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Featured Article Card */}
            {featuredPost && selectedTag === "All" && (
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-white shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-12">
                  <div className="md:col-span-6 aspect-[4/3] md:aspect-auto overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
                        Featured Post
                      </span>
                      <h2 className="mt-3 font-display text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        <Link to="/blog/$slug" params={{ slug: featuredPost.slug }}>
                          {featuredPost.title}
                        </Link>
                      </h2>
                      <p className="mt-3 text-sm text-ink-soft line-clamp-3">
                        {featuredPost.summary}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-ink-soft">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> {featuredPost.lastUpdated}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-foreground">
                        <Clock className="h-3.5 w-3.5 text-primary" /> {featuredPost.readMinutes} min read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-soft mr-2">
                Filter by topic:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedTag(cat)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                    selectedTag === cat
                      ? "bg-primary text-black"
                      : "bg-surface text-ink-soft hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md"
                >
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="block aspect-[16/10] w-full overflow-hidden bg-muted"
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="rounded-md bg-amber-50 px-2.5 py-0.5 font-bold uppercase tracking-wider text-amber-700 border border-amber-200">
                        {post.category}
                      </span>
                      <span className="text-ink-soft flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {post.readMinutes} min
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
                      <Link to="/blog/$slug" params={{ slug: post.slug }}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft line-clamp-2 flex-1">
                      {post.summary}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between">
                      <span className="text-xs text-ink-soft">By {post.author.name}</span>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:text-primary"
                      >
                        Read Article <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar (Right - 4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
