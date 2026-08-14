import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, MapPin, Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import { locationsData } from "@/data/locations";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/locations/")({
  head: () => {
    const url = `${SITE}/locations`;
    const title = "Waffle House Locations by State & City | Restaurant Guide";
    const description =
      "Find Waffle House locations near you with our directory of 2,100+ stores across 25 states. View addresses, phone numbers, opening hours and menu pricing references.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
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
              { "@type": "ListItem", position: 2, name: "Locations", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Waffle House Locations Directory",
            url,
            inLanguage: "en-US",
            description: "Directory of Waffle House restaurant locations across the United States.",
          }),
        },
      ],
    };
  },
  component: LocationsDirectoryHome,
});

function LocationsDirectoryHome() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStates = locationsData.filter((state) =>
    state.stateName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen">
      {/* 1. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="bg-surface py-3 border-b border-border font-sans">
        <div className="container-editorial flex items-center gap-2 text-xs font-medium text-ink-soft">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="text-foreground">Locations</span>
        </div>
      </nav>

      {/* 2. HERO / INTRO SECTION WITH TRUST SIGNALS */}
      <section className="bg-white border-b border-border font-sans">
        <div className="container-editorial py-12 md:py-16">
          <div className="max-w-3xl space-y-4">
            <span className="chip">Directory</span>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
              Waffle House Locations
            </h1>
            <p className="text-sm font-semibold text-ink-soft">
              Location information updated August 2026
            </p>
            <p className="text-base text-ink-soft leading-relaxed">
              Find your nearest Waffle House location. Browse our comprehensive directory of 2,100+ stores across 25 states. View verified addresses, phone numbers, opening hours, and cross-reference with our{" "}
              <Link to="/menu" className="text-primary hover:underline font-semibold">
                menu prices
              </Link>{" "}
              and{" "}
              <Link to="/nutrition" className="text-primary hover:underline font-semibold">
                nutrition guide
              </Link>{" "}
              before you order, or check our latest{" "}
              <Link to="/blog" className="text-primary hover:underline font-semibold">
                breakfast guides
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* 3. LOCATION QUICK FACTS */}
      <section className="bg-surface border-b border-border font-sans">
        <div className="container-editorial py-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center bg-white p-6 rounded-2xl border border-black/5 shadow-xs">
            <div>
              <span className="block text-3xl font-bold font-sans text-primary">2,100+</span>
              <span className="block text-xs font-semibold text-ink-soft uppercase tracking-wider mt-1">Total Locations</span>
            </div>
            <div className="border-l border-black/5">
              <span className="block text-3xl font-bold font-sans text-primary">25</span>
              <span className="block text-xs font-semibold text-ink-soft uppercase tracking-wider mt-1">States Covered</span>
            </div>
            <div className="border-l border-black/5">
              <span className="block text-3xl font-bold font-sans text-primary">24/7/365</span>
              <span className="block text-xs font-semibold text-ink-soft uppercase tracking-wider mt-1">Hours Open</span>
            </div>
            <div className="border-l border-black/5">
              <span className="block text-lg font-bold font-sans text-foreground">American Diner</span>
              <span className="block text-xs text-ink-soft mt-0.5">Primary Menu</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LOCATION SEARCH */}
      <section className="bg-white border-b border-border font-sans">
        <div className="container-editorial py-12">
          <div className="max-w-xl mx-auto text-center space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">Find a Waffle House Location</h2>
            <p className="text-sm text-ink-soft">Search by state, city or location name.</p>
            <div className="relative mt-4">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by state, city or location..."
                className="w-full rounded-full border border-border bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOCATIONS BY STATE / STATE DIRECTORY */}
      <section className="bg-surface py-12 md:py-16 font-sans">
        <div className="container-editorial">
          <h2 className="font-display text-2xl font-bold text-foreground border-b border-border pb-3">
            Waffle House Locations by State
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredStates.map((s) => (
              <Link
                key={s.stateSlug}
                to="/locations/$state"
                params={{ state: s.stateSlug }}
                className="group flex items-center justify-between rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
              >
                <div>
                  <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {s.stateName}
                  </h3>
                  <p className="mt-1 text-xs text-ink-soft font-medium">
                    {s.cities.length} Cities / {s.branchCount} Stores
                  </p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700 group-hover:bg-primary group-hover:text-black transition-colors">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
          {filteredStates.length === 0 && (
            <p className="mt-6 text-sm text-ink-soft italic">No states match your search criteria.</p>
          )}
        </div>
      </section>

      {/* 6. LOCATIONS FAQ */}
      <section className="bg-white border-b border-border font-sans">
        <div className="container-editorial py-16 md:py-24">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="font-display text-3xl font-bold text-foreground text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border border-border rounded-xl p-6 bg-surface/30">
                <h3 className="font-semibold text-lg text-foreground">Are Waffle House locations open 24/7?</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Yes, almost all Waffle House locations are open 24 hours a day, 7 days a week, 365 days a year, including all major holidays like Thanksgiving and Christmas.
                </p>
              </div>
              <div className="border border-border rounded-xl p-6 bg-surface/30">
                <h3 className="font-semibold text-lg text-foreground">How many Waffle House locations are there?</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  There are over 2,100 Waffle House locations across the United States.
                </p>
              </div>
              <div className="border border-border rounded-xl p-6 bg-surface/30">
                <h3 className="font-semibold text-lg text-foreground">What states have Waffle House locations?</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Waffle House operates in 25 states, primarily in the South, Southeast, and Midwest regions. Georgia has the highest concentration of Waffle House stores.
                </p>
              </div>
              <div className="border border-border rounded-xl p-6 bg-surface/30">
                <h3 className="font-semibold text-lg text-foreground">Can I order delivery or takeout from Waffle House?</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Yes, most Waffle House locations support takeout orders, and many are partnered with delivery services like DoorDash, Uber Eats, and Grubhub.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RELATED GUIDES */}
      <section className="bg-surface border-b border-border font-sans">
        <div className="container-editorial py-16 md:py-24">
          <h2 className="font-display text-2xl font-bold text-foreground text-center">Waffle House Guides &amp; Resources</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div className="bg-white rounded-2xl p-6 border border-border shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-foreground">Complete Menu &amp; Prices</h3>
                <p className="mt-2 text-sm text-ink-soft">View prices, calories, and categories for all 74 items.</p>
              </div>
              <Link to="/menu" className="mt-4 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                View Menu →
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-foreground">Nutrition &amp; Calories</h3>
                <p className="mt-2 text-sm text-ink-soft">Full calorie, sodium, fat, and allergen reference guides.</p>
              </div>
              <Link to="/nutrition" className="mt-4 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                View Nutrition →
              </Link>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-foreground">Best Breakfast Items</h3>
                <p className="mt-2 text-sm text-ink-soft">Check out our editor rankings for the best diner breakfast options.</p>
              </div>
              <Link to="/blog/$slug" params={{ slug: "best-breakfast-items" }} className="mt-4 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                Read Guide →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. METHODOLOGY SECTION */}
      <section aria-labelledby="loc-methodology-heading" className="border-b border-border bg-white font-sans">
        <div className="container-editorial py-16 md:py-20 text-center max-w-3xl mx-auto">
          <span className="chip">Methodology</span>
          <h2 id="loc-methodology-heading" className="mt-4 font-display text-3xl font-bold text-foreground">
            How We Verify Locations
          </h2>
          <p className="mt-4 text-base text-ink-soft leading-relaxed">
            Our store directory is updated using publicly available location indexes, customer reports, and local listings. We review and verify store details regularly to provide accurate coordinates and contact info.
          </p>
          <div className="mt-6">
            <Link
              to="/methodology"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Read Our Methodology <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. INDEPENDENT DISCLOSURE */}
      <section className="border-b border-border bg-surface font-sans">
        <div className="container-editorial py-12 md:py-16">
          <div className="mx-auto max-w-4xl rounded-2xl border border-black/5 bg-white p-6 shadow-xs text-center">
            <p className="text-sm leading-relaxed text-ink-soft">
              This is an independent informational guide and is not affiliated with, endorsed by or sponsored by Waffle House, Inc. Store hours, phone numbers and availability may vary by location and change over time.
            </p>
            <div className="mt-4">
              <Link to="/disclaimer" className="text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
