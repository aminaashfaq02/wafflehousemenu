import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { getAllBlogPosts } from "@/data/blogStore";
import type { BlogPost } from "@/data/blogPosts";
import { Sidebar } from "@/components/Sidebar";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/blog/")({
  head: () => {
    const url = `${SITE}/blog`;
    const title = "Waffle House Menu Guides & Restaurant Articles";
    const description =
      "Read helpful Waffle House menu guides covering prices, calories, nutrition, menu categories, locations and common restaurant questions.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Blog", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Waffle House Menu Guides & Restaurant Articles",
            url,
            description: "Practical guides and articles covering Waffle House menu items, prices, nutrition, and location details.",
          }),
        },
      ],
    };
  },
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
      {/* 1. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="bg-surface py-3 border-b border-border font-sans">
        <div className="container-editorial flex items-center gap-2 text-xs font-medium text-ink-soft">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="text-foreground font-sans">Blog</span>
        </div>
      </nav>

      {/* 2. HERO / HEADER */}
      <section className="border-b border-border bg-[#F7F7F5] font-sans">
        <div className="container-editorial py-12 md:py-16">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 shrink-0">
              <BookOpen className="h-7 w-7 text-amber-700" aria-hidden />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
                Waffle House Menu Guides &amp; Articles
              </h1>
              <p className="mt-2 text-base text-ink-soft max-w-2xl leading-relaxed">
                Explore practical Waffle House menu guides covering prices, nutrition, calories, popular menu categories, restaurant locations and common questions. Our articles are designed to make menu information easier to understand and navigate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT AREA */}
      <section className="container-editorial py-12 md:py-16 font-sans">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Articles List (Left - 8 Cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Featured Article Card */}
            {featuredPost && selectedTag === "All" && (
              <div className="group relative overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-12">
                  <div className="md:col-span-6 aspect-[4/3] md:aspect-auto overflow-hidden bg-muted">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-800">
                        Featured Guide
                      </span>
                      <h2 className="mt-3 font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        <Link to="/blog/$slug" params={{ slug: featuredPost.slug }}>
                          {featuredPost.title}
                        </Link>
                      </h2>
                      <p className="mt-3 text-sm text-ink-soft line-clamp-3 leading-relaxed">
                        {featuredPost.summary}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-ink-soft">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> Published {featuredPost.publishDate}
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
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                      <Link to="/blog/$slug" params={{ slug: post.slug }}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft line-clamp-2 flex-1 leading-relaxed">
                      {post.summary}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between">
                      <span className="text-xs text-ink-soft">By {post.author.name}</span>
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:text-primary"
                      >
                        Read Guide <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* 4. BLOG PAGE INFORMATION SECTION */}
            <div className="rounded-2xl border border-border bg-surface p-8 space-y-4 shadow-xs mt-12">
              <h2 className="font-display text-2xl font-bold text-foreground">
                Waffle House Menu Information &amp; Guides
              </h2>
              <p className="text-sm leading-relaxed text-ink-soft">
                Our guides organize menu, pricing, nutrition and location information into practical articles designed to help visitors find answers quickly. You can explore the central directories directly:
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-semibold pt-2">
                <Link to="/menu" className="text-primary hover:underline">Waffle House Menu</Link>
                <span className="text-border">|</span>
                <Link to="/nutrition" className="text-primary hover:underline">Waffle House Nutrition</Link>
                <span className="text-border">|</span>
                <Link to="/locations" className="text-primary hover:underline">Waffle House Locations</Link>
                <span className="text-border">|</span>
                <Link to="/about" className="text-primary hover:underline">About This Guide</Link>
              </div>
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
