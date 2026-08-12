import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ChevronRight, Phone, MapPin, Clock, Compass, ExternalLink, ShieldCheck } from "lucide-react";
import { getStoreBySlug, locationsData } from "@/data/locations";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/locations/$state/$city")({
  loader: ({ params }) => {
    const state = locationsData.find((s) => s.stateSlug === params.state);
    if (!state) throw notFound();
    const store = getStoreBySlug(params.state, params.city);
    if (!store) throw notFound();
    return { state, store };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Store Not Found" }, { name: "robots", content: "noindex" }] };
    }
    const { state, store } = loaderData;
    const url = `${SITE}/locations/${state.stateSlug}/${store.slug}`;
    const title = `${store.name} | Address, Hours & Phone`;
    const description = `Visit the Waffle House at ${store.address} in ${store.city}, ${state.stateCode}. Get operational hours, phone number, embedded map directions, amenities and delivery links.`;
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
              { "@type": "ListItem", position: 3, name: state.stateName, item: `${SITE}/locations/${state.stateSlug}` },
              { "@type": "ListItem", position: 4, name: store.name, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FoodEstablishment",
            "@id": url,
            name: store.name,
            image: "https://wafflehousemenu.com/favicon.ico",
            telephone: store.phone,
            priceRange: "$",
            servesCuisine: "American, Diner, Breakfast",
            address: {
              "@type": "PostalAddress",
              streetAddress: store.address,
              addressLocality: store.city,
              addressRegion: state.stateCode,
              postalCode: store.zipCode,
              addressCountry: "US",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: store.lat,
              longitude: store.lng,
            },
            url: url,
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                opens: "00:00",
                closes: "23:59"
              }
            ],
            hasMenu: `${SITE}/menu`
          }),
        },
      ],
    };
  },
  component: IndividualStorePage,
});

function IndividualStorePage() {
  const { state, store } = Route.useLoaderData();

  return (
    <div className="bg-white">
      {/* BREADCRUMB HEADER */}
      <section className="border-b border-border bg-[#F7F7F5]">
        <div className="container-editorial py-12 md:py-16">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]"
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
            <Link
              to="/locations/$state"
              params={{ state: state.stateSlug }}
              className="inline-flex items-center gap-1 rounded-sm bg-primary px-3 py-1.5 text-foreground hover:bg-primary/90"
            >
              {state.stateName} <ChevronRight className="h-3 w-3" aria-hidden />
            </Link>
            <span className="inline-flex items-center rounded-sm bg-primary px-3 py-1.5 text-foreground">
              Branch Details
            </span>
          </nav>

          <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-primary">
                Waffle House Branch #{store.slug.slice(-4) || "Store"}
              </span>
              <h1 className="mt-1.5 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {store.name}
              </h1>
              <p className="mt-2 text-sm text-ink-soft flex items-center gap-1.5">
                <MapPin className="h-4 w-4 shrink-0 text-amber-700" />
                {store.address}, {store.city}, {state.stateCode} {store.zipCode}
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={`tel:${store.phone.replace(/\D/g, "")}`}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-black/10 bg-white px-5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:border-primary hover:text-primary"
              >
                <Phone className="h-4 w-4" /> Call Store
              </a>
              <a
                href={store.mapDirectionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary h-11 px-5 text-sm"
              >
                <Compass className="h-4 w-4" /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STORE CONTENT AND MAP */}
      <section className="container-editorial py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          
          {/* LEFT COLUMN: Hours & Details */}
          <div className="lg:col-span-7 space-y-10">
            {/* Hours Table */}
            <div>
              <h2 className="flex items-center gap-2 font-display text-xl font-bold text-foreground border-b border-border pb-3">
                <Clock className="h-5 w-5 text-amber-600" />
                Operating Hours
              </h2>
              <div className="mt-4 overflow-hidden rounded-2xl border border-black/[0.06] bg-surface shadow-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-primary text-black font-semibold text-[11px] uppercase tracking-wider">
                      <th scope="col" className="px-6 py-3 text-left">Day</th>
                      <th scope="col" className="px-6 py-3 text-right">Hours</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04]">
                    {[
                      { day: "Monday", hours: "Open 24 Hours" },
                      { day: "Tuesday", hours: "Open 24 Hours" },
                      { day: "Wednesday", hours: "Open 24 Hours" },
                      { day: "Thursday", hours: "Open 24 Hours" },
                      { day: "Friday", hours: "Open 24 Hours" },
                      { day: "Saturday", hours: "Open 24 Hours" },
                      { day: "Sunday", hours: "Open 24 Hours" },
                    ].map((row) => (
                      <tr key={row.day} className="hover:bg-muted/40">
                        <td className="px-6 py-3.5 text-left font-medium text-foreground">{row.day}</td>
                        <td className="px-6 py-3.5 text-right font-display font-semibold text-green-700">{row.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs text-ink-soft leading-relaxed flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-green-600 shrink-0" />
                This store is open 24 hours a day, 7 days a week, 365 days a year, including all major holidays.
              </p>
            </div>

            {/* Delivery Integrations */}
            <div>
              <h2 className="font-display text-xl font-bold text-foreground border-b border-border pb-3">
                Order Delivery &amp; Takeout
              </h2>
              <p className="mt-3 text-sm text-ink-soft">
                Skip the wait and order delivery or pickup directly from this location via our verified partner apps:
              </p>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {store.doordashUrl && (
                  <a
                    href={store.doordashUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-black/[0.08] bg-surface p-4 shadow-sm transition-all hover:border-red-600 hover:shadow-md"
                  >
                    <span className="text-sm font-bold text-red-600">DoorDash</span>
                    <ExternalLink className="h-4 w-4 text-ink-soft" />
                  </a>
                )}
                {store.ubereatsUrl && (
                  <a
                    href={store.ubereatsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-black/[0.08] bg-surface p-4 shadow-sm transition-all hover:border-black hover:shadow-md"
                  >
                    <span className="text-sm font-bold text-foreground">UberEats</span>
                    <ExternalLink className="h-4 w-4 text-ink-soft" />
                  </a>
                )}
                {store.grubhubUrl && (
                  <a
                    href={store.grubhubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between rounded-xl border border-black/[0.08] bg-surface p-4 shadow-sm transition-all hover:border-orange-500 hover:shadow-md"
                  >
                    <span className="text-sm font-bold text-orange-500">Grubhub</span>
                    <ExternalLink className="h-4 w-4 text-ink-soft" />
                  </a>
                )}
              </div>
            </div>

            {/* Amenities Grid */}
            <div>
              <h2 className="font-display text-xl font-bold text-foreground border-b border-border pb-3">
                Store Amenities
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { label: "24-Hour Dining", val: store.amenities.dining24h },
                  { label: "Takeout Support", val: store.amenities.takeout },
                  { label: "Delivery Support", val: store.amenities.delivery },
                  { label: "Wheelchair Access", val: store.amenities.wheelchair },
                  { label: "Counter Seating", val: store.amenities.counterSeating },
                  { label: "Parking On Site", val: store.amenities.parking },
                ].map((a) => (
                  <div
                    key={a.label}
                    className={`flex items-center gap-2 rounded-xl border p-4 shadow-xs text-xs font-semibold ${
                      a.val
                        ? "border-green-600/20 bg-green-50 text-green-700 ring-1 ring-green-600/10"
                        : "border-black/5 bg-surface text-ink-soft"
                    }`}
                  >
                    <div className={`h-2.5 w-2.5 rounded-full ${a.val ? "bg-green-600" : "bg-black/25"}`} />
                    {a.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Embedded Map */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-display text-xl font-bold text-foreground border-b border-border pb-3 lg:border-none lg:pb-0">
              Location Map
            </h2>
            <div className="overflow-hidden rounded-2xl border border-black/[0.08] shadow-md aspect-square lg:aspect-auto lg:h-[480px]">
              <iframe
                title={`Map showing ${store.name}`}
                src={store.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="rounded-2xl border border-black/[0.06] bg-[#F7F7F5] p-5 text-xs text-ink-soft leading-relaxed">
              <h3 className="font-display text-sm font-bold text-foreground mb-1.5">How to get here:</h3>
              <p>
                This branch is located on {store.address}. Conveniently accessible from major intersections and highway routes. 
                Use the "Get Directions" button above to open GPS guidance in Google Maps on your smartphone or vehicle display.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
