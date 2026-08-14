import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Clock, Calendar, ArrowRight, BookOpen, Search, Sparkles, Utensils, ShieldCheck, HelpCircle } from "lucide-react";
import { getAllBlogPosts } from "@/data/blogStore";
import type { BlogPost } from "@/data/blogPosts";
import { Sidebar } from "@/components/Sidebar";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/blog/")({
  head: () => {
    const url = `${SITE}/blog`;
    const title = "Waffle House Menu Guides & Information | Recipes, Nutrition & Locations";
    const description =
      "Explore Waffle House menu guides, prices, nutrition information, breakfast guides, locations and helpful restaurant information.";
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
            name: "Waffle House Menu Guides & Information",
            url,
            description: "Practical guides and articles covering Waffle House menu items, prices, nutrition, and location details.",
          }),
        },
      ],
    };
  },
  component: BlogIndexPage,
});

const blogCategories = [
  "All",
  "Menu & Prices",
  "Nutrition & Calories",
  "Breakfast",
  "Waffles",
  "Hashbrowns",
  "Locations",
  "Restaurant Guides",
];

function BlogIndexPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    setPosts(getAllBlogPosts());
  }, []);

  const featuredPost = posts[0];

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(p.category.toLowerCase()));

  // Dedicated sections
  const menuPriceGuides = posts.filter((p) =>
    p.category.toLowerCase().includes("menu") || p.category.toLowerCase().includes("price") || p.category.toLowerCase().includes("value")
  );

  const nutritionGuides = posts.filter((p) =>
    p.category.toLowerCase().includes("nutrition") || p.category.toLowerCase().includes("calor") || p.category.toLowerCase().includes("diet")
  );

  const locationGuides = posts.filter((p) =>
    p.category.toLowerCase().includes("location") || p.category.toLowerCase().includes("guide") || p.category.toLowerCase().includes("hour")
  );

  return (
    <main className="bg-white text-foreground">
      {/* 1. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="bg-surface py-3 border-b border-border font-sans">
        <div className="container-editorial flex items-center gap-2 text-xs font-medium text-ink-soft">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="text-foreground">Blog</span>
        </div>
      </nav>

      {/* 2. HERO / INTRODUCTION */}
      <section className="border-b border-border bg-surface font-sans">
        <div className="container-editorial py-12 md:py-16">
          <div className="max-w-3xl space-y-4">
            <span className="chip">Editorial Guides &amp; Articles</span>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              Waffle House Menu Guides &amp; Information
            </h1>
            <p className="text-base text-ink-soft leading-relaxed">
              Explore practical, reader-focused Waffle House guides covering menu items, pricing references, nutrition breakdowns, breakfast favorites, restaurant locations, and diner ordering tips. Our articles are written to make dining choices clear, accessible, and easy to navigate.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-primary pt-2">
              <Link to="/menu" className="hover:underline">Explore Menu &amp; Prices →</Link>
              <Link to="/nutrition" className="hover:underline">Nutrition &amp; Calories →</Link>
              <Link to="/locations" className="hover:underline">Find Restaurant Locations →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT CONTAINER */}
      <div className="container-editorial py-12 md:py-16 font-sans">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Editorial Feed (8 Cols) */}
          <div className="lg:col-span-8 space-y-16">
            {/* FEATURED GUIDE */}
            {featuredPost && selectedCategory === "All" && (
              <section aria-labelledby="featured-guide-heading" className="space-y-4">
                <span className="chip">Featured Guide</span>
                <article className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:shadow-md">
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
                        <span className="inline-block rounded-md bg-amber-50 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
                          {featuredPost.category}
                        </span>
                        <h2 id="featured-guide-heading" className="mt-3 font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          <Link to="/blog/$slug" params={{ slug: featuredPost.slug }}>
                            {featuredPost.title}
                          </Link>
                        </h2>
                        <p className="mt-3 text-sm text-ink-soft line-clamp-3 leading-relaxed">
                          {featuredPost.summary}
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-ink-soft">
                        <span>Published {featuredPost.publishDate}</span>
                        <Link
                          to="/blog/$slug"
                          params={{ slug: featuredPost.slug }}
                          className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                        >
                          Read Guide <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </section>
            )}

            {/* GUIDE CATEGORY NAVIGATION TABS */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-ink-soft block">
                Browse Guides by Category:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {blogCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                      selectedCategory === cat
                        ? "bg-primary text-black"
                        : "bg-surface text-ink-soft hover:bg-muted hover:text-foreground border border-border"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* LATEST GUIDES GRID */}
            <section aria-labelledby="latest-guides-heading" className="space-y-6">
              <h2 id="latest-guides-heading" className="font-display text-2xl font-bold text-foreground border-b border-border pb-3">
                {selectedCategory === "All" ? "Latest Waffle House Guides" : `${selectedCategory} Guides`}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-xs transition duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-md"
                  >
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="block aspect-[16/10] w-full overflow-hidden bg-muted"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-700 border border-amber-200">
                          {post.category}
                        </span>
                        <span className="text-ink-soft flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {post.readMinutes} min
                        </span>
                      </div>
                      <h3 className="mt-2.5 font-display text-base font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                        <Link to="/blog/$slug" params={{ slug: post.slug }}>
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 text-xs text-ink-soft line-clamp-2 flex-1 leading-relaxed">
                        {post.summary}
                      </p>
                      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
                        <span className="text-ink-soft">By {post.author.name}</span>
                        <Link
                          to="/blog/$slug"
                          params={{ slug: post.slug }}
                          className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
                        >
                          Read Guide <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* DEDICATED TOPICAL SECTION 1: MENU & PRICE GUIDES */}
            {selectedCategory === "All" && menuPriceGuides.length > 0 && (
              <section aria-labelledby="menu-price-guides-heading" className="space-y-4 pt-6">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <h2 id="menu-price-guides-heading" className="font-display text-xl font-bold text-foreground">
                    Waffle House Menu &amp; Price Guides
                  </h2>
                  <Link to="/menu" className="text-xs font-semibold text-primary hover:underline">
                    View Full Menu →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {menuPriceGuides.slice(0, 2).map((post) => (
                    <div key={post.slug} className="rounded-xl border border-border bg-surface p-4 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{post.category}</span>
                        <h3 className="mt-1 font-display text-sm font-bold text-foreground hover:text-primary">
                          <Link to="/blog/$slug" params={{ slug: post.slug }}>{post.title}</Link>
                        </h3>
                        <p className="mt-1.5 text-xs text-ink-soft line-clamp-2 leading-relaxed">{post.summary}</p>
                      </div>
                      <Link to="/blog/$slug" params={{ slug: post.slug }} className="mt-3 text-xs font-semibold text-primary hover:underline">
                        Read Article →
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* DEDICATED TOPICAL SECTION 2: NUTRITION & CALORIE GUIDES */}
            {selectedCategory === "All" && nutritionGuides.length > 0 && (
              <section aria-labelledby="nutrition-guides-heading" className="space-y-4 pt-4">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <h2 id="nutrition-guides-heading" className="font-display text-xl font-bold text-foreground">
                    Waffle House Nutrition &amp; Calorie Guides
                  </h2>
                  <Link to="/nutrition" className="text-xs font-semibold text-primary hover:underline">
                    View Nutrition Hub →
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {nutritionGuides.slice(0, 2).map((post) => (
                    <div key={post.slug} className="rounded-xl border border-border bg-surface p-4 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{post.category}</span>
                        <h3 className="mt-1 font-display text-sm font-bold text-foreground hover:text-primary">
                          <Link to="/blog/$slug" params={{ slug: post.slug }}>{post.title}</Link>
                        </h3>
                        <p className="mt-1.5 text-xs text-ink-soft line-clamp-2 leading-relaxed">{post.summary}</p>
                      </div>
                      <Link to="/blog/$slug" params={{ slug: post.slug }} className="mt-3 text-xs font-semibold text-primary hover:underline">
                        Read Article →
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* WHAT YOU'LL FIND IN OUR GUIDES */}
            <section aria-labelledby="find-guides-heading" className="rounded-2xl border border-border bg-surface p-8 space-y-4 shadow-xs">
              <h2 id="find-guides-heading" className="font-display text-2xl font-bold text-foreground">
                What You'll Find in Our Waffle House Guides
              </h2>
              <p className="text-sm leading-relaxed text-ink-soft">
                Our editorial articles are designed to answer real questions about the Waffle House dining experience. From understanding price variations and calorie counts to finding restaurant locations and navigating hashbrown toppings, our content is organized for clarity and reference.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-semibold text-primary pt-2">
                <Link to="/menu" className="hover:underline">Waffle House Menu &amp; Prices</Link>
                <span>•</span>
                <Link to="/nutrition" className="hover:underline">Nutrition &amp; Calories</Link>
                <span>•</span>
                <Link to="/locations" className="hover:underline">Restaurant Locations Directory</Link>
                <span>•</span>
                <Link to="/about" className="hover:underline">About This Guide</Link>
              </div>
            </section>

            {/* TRUST & INDEPENDENT NOTE */}
            <div className="rounded-xl border border-dashed border-border p-6 text-center space-y-2 text-xs text-ink-soft">
              <ShieldCheck className="h-5 w-5 text-primary mx-auto" />
              <p>
                This website is an independent informational publication. Menu prices, item availability, and nutritional details may vary by restaurant location and change over time.
              </p>
              <p className="font-semibold text-foreground">
                Last reviewed: August 2026
              </p>
            </div>
          </div>

          {/* Sidebar (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
