import { createFileRoute, Link } from "@tanstack/react-router";
import { CENTRAL_MENU_CATEGORIES, TOTAL_MENU_CATEGORIES, TOTAL_MENU_ITEMS } from "@/data/centralMenuData";
import { Database, Layers, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/menu-data")({
  head: () => {
    const title = "Waffle House Menu Data — Database Statistics & Category Counts";
    const description = `Explore structured Waffle House menu data statistics. Review our central database featuring ${TOTAL_MENU_CATEGORIES} categories and ${TOTAL_MENU_ITEMS} verified menu items.`;
    const url = "https://wafflehousemenu.com/menu-data";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": url,
            url: url,
            name: title,
            description: description,
            inLanguage: "en-US",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://wafflehousemenu.com" },
                { "@type": "ListItem", position: 2, name: "Menu Data Statistics", item: url },
              ],
            },
          }),
        },
      ],
    };
  },
  component: MenuDataPage,
});

function MenuDataPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-[#0B0C0E] border-b-2 border-primary py-14 px-4">
        <div className="container-editorial max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/50">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li className="text-white/30">/</li>
              <li className="text-white/80">Menu Data</li>
            </ol>
          </nav>
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">
            Database Statistics
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            Waffle House Menu Database
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
            We compile and maintain a structured menu database of Waffle House offerings. Review key stats, category splits, and structural data counts verified from official sources.
          </p>
        </div>
      </section>

      <div className="container-editorial max-w-4xl px-4 py-12 space-y-12">

        {/* Database Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-6 flex items-start gap-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <span className="font-display text-3xl font-extrabold text-foreground">{TOTAL_MENU_CATEGORIES}</span>
              <h3 className="font-bold text-sm text-foreground mt-1">Verified Categories</h3>
              <p className="text-xs text-ink-soft mt-0.5">Primary menu classifications</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 flex items-start gap-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <span className="font-display text-3xl font-extrabold text-foreground">{TOTAL_MENU_ITEMS}</span>
              <h3 className="font-bold text-sm text-foreground mt-1">Verified Menu Items</h3>
              <p className="text-xs text-ink-soft mt-0.5">Unique recipes and food variations</p>
            </div>
          </div>
        </div>

        {/* Categories Data Table */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Menu Category Distribution
          </h2>
          <p className="text-sm text-ink-soft leading-relaxed">
            Below is a summary of the categories indexed in our database, including item counts and direct links to their detailed lists:
          </p>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="text-left px-4 py-3 font-bold text-foreground">Category Name</th>
                  <th className="px-4 py-3 text-center font-bold text-foreground">Item Count</th>
                  <th className="text-left px-4 py-3 font-bold text-foreground hidden md:table-cell">Short Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {CENTRAL_MENU_CATEGORIES.map((c) => (
                  <tr key={c.id} className="hover:bg-surface/50 transition-colors">
                    <td className="px-4 py-3">
                      <Link
                        to={c.href as any}
                        className="font-semibold text-primary hover:underline"
                      >
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-foreground">
                      {c.itemCount}
                    </td>
                    <td className="px-4 py-3 text-ink-soft text-xs hidden md:table-cell">
                      {c.shortDescription}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Database Verification Methodology */}
        <section className="rounded-2xl border border-border bg-surface p-6 space-y-3">
          <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-1.5">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Verification Standards
          </h3>
          <p className="text-sm text-ink-soft leading-relaxed">
            Every item in our database is verified individually against the official Waffle House nutritional menu guidelines and local restaurant menus. We check prices, calories, macronutrient weights, and allergen warnings before publishing.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs">
            <Link to="/methodology" className="font-bold text-primary hover:underline">
              Read our Methodology →
            </Link>
            <Link to="/editorial-policy" className="font-bold text-primary hover:underline">
              Read our Editorial Policy →
            </Link>
          </div>
        </section>

        {/* Related Links */}
        <section className="rounded-2xl bg-surface border border-border p-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Related Data Pages
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Waffle House Menu", href: "/menu" },
              { label: "Nutrition & Calories", href: "/nutrition" },
              { label: "Allergen Guide", href: "/allergens" },
              { label: "Dietary Choices", href: "/dietary" },
              { label: "Methodology", href: "/methodology" },
              { label: "Locations Directory", href: "/locations" },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href as any}
                className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </section>

        <p className="text-xs text-ink-soft text-center">
          Database updated: August 2026. This database is an independent reference guide built on publicly accessible data and is not endorsed or owned by Waffle House, Inc.
        </p>

      </div>
    </main>
  );
}
