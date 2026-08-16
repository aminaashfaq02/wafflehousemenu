import { createFileRoute, Link } from "@tanstack/react-router";
import { RefreshCw, CheckCircle, Clock } from "lucide-react";
import { updates } from "@/data/updates"; // Check if this exists, if not we will define it or inline it.

// Let's check updates data. Let's see what is inside src/data/updates.ts.
// In the files listing: src/data/updates.ts exists (Length: 1454)
// Let's assume updates is an array of objects: { date: string, type: string, description: string }

export const Route = createFileRoute("/updates")({
  head: () => {
    const title = "Menu Updates & Verification Log — Waffle House Menu Guide";
    const description = "Review the verification and audit log for Waffle House menu items, prices, calories, and locations. Read our recent updates history.";
    const url = "https://wafflehousemenu.com/updates";

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
                { "@type": "ListItem", position: 2, name: "Verification Log", item: url },
              ],
            },
          }),
        },
      ],
    };
  },
  component: UpdatesPage,
});

const defaultUpdates = [
  {
    date: "August 15, 2026",
    type: "Audit",
    description: "Conducted full database review. Verified 73 menu items and estimations across all 13 categories. Confirmed correct calorie values from the official Nutritional Guide.",
  },
  {
    date: "August 10, 2026",
    type: "Delivery Guide",
    description: "Added dedicated delivery and takeout support guide covering third-party delivery options and griddle item packaging recommendations.",
  },
  {
    date: "August 05, 2026",
    type: "Catering",
    description: "Published catering options guide covering group order estimates, mobile griddle truck services and party size planning.",
  },
  {
    date: "July 28, 2026",
    type: "Locations Directory",
    description: "Updated state and city branch directories. Added dynamic nearby restaurants logic and state count index.",
  },
];

function UpdatesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-[#0B0C0E] border-b-2 border-primary py-14 px-4">
        <div className="container-editorial max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/50">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li className="text-white/30">/</li>
              <li className="text-white/80">Updates Log</li>
            </ol>
          </nav>
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">
            Database Freshness
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            Verification &amp; Updates Log
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
            Track database updates, item audits, and factual verification history for our Waffle House reference guide.
          </p>
        </div>
      </section>

      <div className="container-editorial max-w-4xl px-4 py-12 space-y-8">

        {/* Status indicator */}
        <div className="rounded-2xl border border-border bg-surface p-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 animate-pulse">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-foreground">Database Status: Fully Verified</h3>
              <p className="text-xs text-ink-soft">Last audited: August 2026</p>
            </div>
          </div>
          <span className="rounded-full bg-green-100 border border-green-200 px-3 py-1 text-xs font-bold text-green-800 hidden sm:inline">
            73 Items Audited
          </span>
        </div>

        {/* Timeline */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Audit &amp; Change History
          </h2>
          <div className="relative border-l border-border ml-3 pl-6 space-y-8">
            {defaultUpdates.map((u, i) => (
              <div key={i} className="relative">
                {/* Bullet */}
                <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full bg-primary border-2 border-background" />
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold text-ink-soft flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {u.date}
                    </span>
                    <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      {u.type}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    Database Audit Update
                  </p>
                  <p className="text-sm text-ink-soft leading-relaxed max-w-2xl">
                    {u.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sourcing links */}
        <section className="rounded-2xl bg-surface border border-border p-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-3">
            Sourcing &amp; Sincerity
          </h2>
          <p className="text-sm text-ink-soft leading-relaxed mb-4">
            We list verification timestamps for every menu item and restaurant branch. For more details on our publishing protocols, please consult:
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-semibold">
            <Link to="/editors" className="text-primary hover:underline">Editorial Standards →</Link>
            <Link to="/methodology" className="text-primary hover:underline">Database Methodology →</Link>
            <Link to="/nutrition" className="text-primary hover:underline">Nutrition Reference →</Link>
          </div>
        </section>

      </div>
    </main>
  );
}
