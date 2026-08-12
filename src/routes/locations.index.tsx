import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { locationsData } from "@/data/locations";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/locations/")({
  head: () => {
    const url = `${SITE}/locations`;
    const title = "Waffle House Locations Near Me | Store Directory 2026";
    const description =
      "Find Waffle House locations near you. Browse our directory of 2,100+ 24-hour restaurant stores by state and city with addresses, phone numbers, hours, and directions.";
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
    <div className="bg-white">
      {/* HEADER SECTION */}
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
              Locations
            </span>
          </nav>
          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 ring-1 ring-primary/20">
                <MapPin className="h-7 w-7 text-amber-700" aria-hidden />
              </div>
              <div>
                <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Waffle House Locations Directory
                </h1>
                <p className="mt-1 text-sm text-ink-soft">
                  Browse our verified directory of Waffle House stores by state and city.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH AND STATES GRID */}
      <section className="container-editorial py-12 md:py-16 space-y-10">
        {/* Search bar */}
        <div className="max-w-md">
          <div className="relative flex h-12 items-center rounded-xl border border-black/[0.08] bg-surface pl-11 shadow-sm transition-all focus-within:border-primary">
            <Search className="pointer-events-none absolute left-4 h-4 w-4 text-ink-soft" aria-hidden />
            <input
              type="text"
              placeholder="Search by state name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-full w-full bg-transparent pr-4 text-sm text-foreground focus:outline-none placeholder:text-ink-soft"
            />
          </div>
        </div>

        {/* States listing */}
        <div>
          <h2 className="font-display text-xl font-bold text-foreground border-b border-border pb-3">
            Browse Locations by State ({filteredStates.length} States)
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredStates.map((s) => (
              <Link
                key={s.stateSlug}
                to="/locations/$state"
                params={{ state: s.stateSlug }}
                className="group flex items-center justify-between rounded-2xl border border-black/[0.06] bg-surface p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
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

        {/* Informational SEO Guide block */}
        <article className="prose max-w-4xl border-t border-border/80 pt-10 text-sm leading-relaxed text-ink-soft space-y-4">
          <h2 className="font-display text-lg font-bold text-foreground">Waffle House Open 24/7/365 Nationwide</h2>
          <p>
            Waffle House is a cultural icon of the American South and beyond, serving customers 24 hours a day,
            7 days a week, 365 days a year. Established in 1955 in Avondale Estates, Georgia, Waffle House has grown
            to over 2,100 restaurants across 25 U.S. states.
          </p>
          <p>
            Whether you are stopping by for a late-night plate of hashbrowns "scattered, smothered, and covered"
            or ordering a classic All-Star Special combo for breakfast, our directory lists every physical restaurant store
            with verified phone numbers, street addresses, amenities, and easy driving directions.
          </p>
        </article>
      </section>
    </div>
  );
}
