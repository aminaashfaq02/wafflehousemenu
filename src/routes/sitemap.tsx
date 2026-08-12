import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Map, Utensils, BookOpen, FileText, User } from "lucide-react";
import { categories, menu } from "@/data/menu";
import { blogPosts } from "@/data/blogPosts";
import { locationsData } from "@/data/locations";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "HTML Sitemap — Waffle House Menu Guide" },
      {
        name: "description",
        content:
          "Complete index of all pages, categories, blog articles, and menu items on Waffle House Menu Guide.",
      },
      { property: "og:title", content: "HTML Sitemap — Waffle House Menu Guide" },
      { property: "og:url", content: `${SITE}/sitemap` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/sitemap` }],
  }),
  component: HtmlSitemapPage,
});

function HtmlSitemapPage() {
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
              HTML Sitemap
            </span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
              <Map className="h-7 w-7 text-amber-700" aria-hidden />
            </div>
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                HTML Website Sitemap
              </h1>
              <p className="mt-1 text-sm text-ink-soft">
                Full index of all pages, guides, and menu sections on Waffle House Menu Guide.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-editorial py-12 md:py-16 space-y-12">
        {/* Main Pages */}
        <div>
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-foreground border-b border-border pb-3">
            <FileText className="h-5 w-5 text-amber-600" />
            Main Pages &amp; Overview
          </h2>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {[
              { to: "/" as const, label: "Home Page" },
              { to: "/menu" as const, label: "Full Menu Index" },
              { to: "/categories" as const, label: "Menu Categories Guide" },
              { to: "/blog" as const, label: "Diner Journal & Blog" },
              { to: "/author" as const, label: "Author Profile (Sarah Jenkins)" },
              { to: "/nutrition" as const, label: "Nutrition & Calorie Guide" },
              { to: "/faq" as const, label: "Frequently Asked Questions" },
              { to: "/about" as const, label: "About Our Project" },
              { to: "/contact" as const, label: "Contact Us" },
              { to: "/search" as const, label: "Search Engine" },
            ].map((p) => (
              <li key={p.to}>
                <Link
                  to={p.to}
                  className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-amber-600" /> {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Menu Categories */}
        <div>
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-foreground border-b border-border pb-3">
            <Utensils className="h-5 w-5 text-amber-600" />
            Menu Categories ({categories.length})
          </h2>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link
                  to="/menu/$category"
                  params={{ category: c.id }}
                  className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-amber-600" /> {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Blog Articles */}
        <div>
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-foreground border-b border-border pb-3">
            <BookOpen className="h-5 w-5 text-amber-600" />
            Blog Articles &amp; Guides ({blogPosts.length})
          </h2>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {blogPosts.map((b) => (
              <li key={b.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: b.slug }}
                  className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-amber-600" /> {b.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Menu Recipes */}
        <div>
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-foreground border-b border-border pb-3">
            <Utensils className="h-5 w-5 text-amber-600" />
            Individual Menu Item Recipes ({menu.length})
          </h2>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs text-ink-soft">
            {menu.map((m) => (
              <li key={`${m.category}-${m.slug}`}>
                <Link
                  to="/menu/$category/$slug"
                  params={{ category: m.category, slug: m.slug }}
                  className="hover:text-primary transition-colors"
                >
                  • {m.name} (${m.price.toFixed(2)})
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Waffle House Store Directory Locations */}
        <div>
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-foreground border-b border-border pb-3">
            <Map className="h-5 w-5 text-amber-600" />
            Waffle House Locations Directory
          </h2>
          <div className="mt-4 space-y-6">
            <div className="flex flex-wrap gap-3">
              <Link
                to="/locations"
                className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-surface px-4 py-2 text-sm font-semibold hover:border-primary transition-colors"
              >
                Locations Index Home Page
              </Link>
            </div>
            {locationsData.map((state) => (
              <div key={state.stateSlug} className="space-y-2">
                <h3 className="font-display text-base font-bold text-foreground">
                  <Link
                    to="/locations/$state"
                    params={{ state: state.stateSlug }}
                    className="hover:text-primary transition-colors"
                  >
                    {state.stateName} Stores Directory ({state.branchCount} locations)
                  </Link>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-ink-soft">
                  {state.cities.flatMap(c => c.stores).map((store) => (
                    <li key={store.slug}>
                      <Link
                        to="/locations/$state/$city"
                        params={{ state: state.stateSlug, city: store.slug }}
                        className="hover:text-primary transition-colors inline-flex items-center gap-1"
                      >
                        • {store.name} ({store.city}, {state.stateCode})
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Legal & Trust Pages */}
        <div>
          <h2 className="flex items-center gap-2 font-display text-2xl font-semibold text-foreground border-b border-border pb-3">
            <User className="h-5 w-5 text-amber-600" />
            Legal, Policies &amp; Trust
          </h2>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            {[
              { href: "/methodology", label: "Editorial Methodology & Data Sourcing" },
              { href: "/privacy-policy", label: "Privacy Policy" },
              { href: "/disclaimer", label: "Disclaimer" },
              { href: "/terms", label: "Terms & Conditions" },
              { href: "/editorial-policy", label: "Editorial Policy" },
              { href: "/cookie-policy", label: "Cookie Policy" },
              { href: "/sitemap.xml", label: "XML Sitemap (Raw)" },
            ].map((p) => (
              <li key={p.href}>
                <a
                  href={p.href}
                  className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-primary transition-colors"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-amber-600" /> {p.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
