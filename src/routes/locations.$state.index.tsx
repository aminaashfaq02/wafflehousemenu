import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ChevronRight, MapPin } from "lucide-react";
import { locationsData } from "@/data/locations";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/locations/$state/")({
  loader: ({ params }) => {
    const state = locationsData.find((s) => s.stateSlug === params.state);
    if (!state) throw notFound();
    return { state };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "State Not Found" }, { name: "robots", content: "noindex" }] };
    }
    const { state } = loaderData;
    const url = `${SITE}/locations/${state.stateSlug}`;
    const title = `Waffle House Locations in ${state.stateName} | Address & Hours`;
    const description = `Find Waffle House restaurant stores in ${state.stateName}. View a complete list of cities, street addresses, phone numbers, and operational hours.`;
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
              { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE}/locations` },
              { "@type": "ListItem", position: 3, name: state.stateName, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `Waffle House Locations in ${state.stateName}`,
            url,
            inLanguage: "en-US",
            description: `Listing all Waffle House restaurant locations across cities in ${state.stateName}.`,
          }),
        },
      ],
    };
  },
  component: StateCityDirectory,
});

function StateCityDirectory() {
  const { state } = Route.useLoaderData();

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
            <Link
              to="/locations"
              className="inline-flex items-center gap-1 rounded-sm bg-primary px-3 py-1.5 text-foreground hover:bg-primary/90"
            >
              Locations <ChevronRight className="h-3 w-3" aria-hidden />
            </Link>
            <span className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-foreground">
              {state.stateName}
            </span>
          </nav>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 ring-1 ring-primary/20">
              <MapPin className="h-7 w-7 text-amber-700" aria-hidden />
            </div>
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Waffle House Locations in {state.stateName}
              </h1>
              <p className="mt-1 text-sm text-ink-soft">
                Explore our state directory of {state.branchCount} stores across {state.cities.length} cities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATE DIRECTORY GRID */}
      <section className="container-editorial py-12 md:py-16 space-y-12">
        {state.cities.map((city) => (
          <div key={city.citySlug} className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-foreground border-b border-border pb-2">
              {city.cityName} ({city.stores.length} {city.stores.length === 1 ? "Location" : "Locations"})
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {city.stores.map((store) => (
                <div
                  key={store.slug}
                  className="flex flex-col justify-between rounded-2xl border border-black/[0.06] bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
                >
                  <div>
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {store.name}
                    </h3>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                      {store.address}, {store.city}, {store.state} {store.zipCode}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-primary">
                      Phone: <a href={`tel:${store.phone.replace(/\D/g, "")}`} className="hover:underline">{store.phone}</a>
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-bold text-green-700 ring-1 ring-green-600/10">
                        Open 24/7
                      </span>
                      {store.amenities.parking && (
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 ring-1 ring-blue-600/10">
                          Free Parking
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 border-t border-border/80 pt-4">
                    <Link
                      to="/locations/$state/$city"
                      params={{ state: state.stateSlug, city: store.slug }}
                      className="btn-primary w-full justify-center text-xs font-bold"
                    >
                      View Details &amp; Directions
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {state.cities.length === 0 && (
          <p className="text-sm text-ink-soft italic">No active restaurant branches found in this state.</p>
        )}
      </section>
    </div>
  );
}
