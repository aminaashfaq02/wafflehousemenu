import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, MapPin, Search, ArrowRight, Clock, Phone, Navigation, ShieldCheck, Utensils, BookOpen, AlertCircle } from "lucide-react";
import { useState } from "react";
import { locationsData } from "@/data/locations";
import hero5 from "@/assets/hero-5-diner.jpg";
import hero6 from "@/assets/hero-6-kitchen.jpg";
import contactHeroDiner from "@/assets/contact-hero-diner.jpg";

const SITE = "https://wafflehousemenu.com";

const locationFaqs = [
  {
    q: "How can I find a Waffle House near me?",
    a: "You can use the search bar above to look up locations by city, state, or ZIP code, or select your state from our directory to browse local restaurants.",
  },
  {
    q: "How can I search for a Waffle House by state?",
    a: "Select any of the 25 states listed in our directory to view all available cities and verified restaurant locations in that state.",
  },
  {
    q: "Can Waffle House menu prices vary by location?",
    a: "Yes. Individual franchise operators may adjust pricing based on regional operating expenses and local supply costs. Displayed prices are informational references.",
  },
  {
    q: "How can I check a restaurant's hours?",
    a: "Most Waffle House restaurants operate 24 hours a day, 7 days a week, 365 days a year. Specific holiday schedules or temporary adjustments can be confirmed via the listed store phone number.",
  },
  {
    q: "Where can I find Waffle House menu information?",
    a: "You can explore all 13 categories, 74 menu items, and estimated prices on our main Waffle House Menu page.",
  },
  {
    q: "Do all Waffle House locations offer the same menu?",
    a: "The core menu — including classic waffles, egg breakfasts, and scattered hashbrowns — is standard nationwide, though regional availability of select items may vary.",
  },
];

export const Route = createFileRoute("/locations/")({
  head: () => {
    const url = `${SITE}/locations`;
    const title = "Waffle House Locations | Find a Restaurant Near You";
    const description =
      "Find Waffle House restaurant locations by state, city and ZIP code, with available addresses, hours, contact details and helpful information for planning a visit.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
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
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: locationFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        },
      ],
    };
  },
  component: LocationsDirectoryHome,
});

function LocationsDirectoryHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredStates = locationsData.filter((state) =>
    state.stateName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="bg-white min-h-screen text-foreground font-sans">
      {/* 1. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="bg-surface py-3 border-b border-border font-sans">
        <div className="container-editorial flex items-center gap-2 text-xs font-medium text-ink-soft">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="text-foreground">Locations</span>
        </div>
      </nav>

      {/* 2. HERO / INTRO SECTION */}
      <section className="bg-white border-b border-border font-sans">
        <div className="container-editorial py-12 md:py-16">
          <div className="max-w-3xl space-y-4">
            <span className="chip">Restaurant Directory</span>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl text-foreground">
              Waffle House Locations
            </h1>
            <p className="text-base text-ink-soft leading-relaxed">
              Explore Waffle House diner locations across 25 U.S. states. Use our interactive directory to find local store addresses, verified operating hours, phone numbers, and cross-reference with our{" "}
              <Link to="/menu" className="text-primary hover:underline font-semibold">
                menu prices
              </Link>{" "}
              and{" "}
              <Link to="/nutrition" className="text-primary hover:underline font-semibold">
                nutrition guide
              </Link>{" "}
              before your visit.
            </p>
            <p className="text-xs font-semibold text-ink-soft">
              Directory information updated: August 2026
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
              <span className="block text-xs font-semibold text-ink-soft uppercase tracking-wider mt-1">Operating Hours</span>
            </div>
            <div className="border-l border-black/5">
              <span className="block text-lg font-bold font-sans text-foreground">American Diner</span>
              <span className="block text-xs text-ink-soft mt-0.5">Classic Menu</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LOCATION SEARCH */}
      <section aria-labelledby="loc-search-heading" className="bg-white border-b border-border font-sans">
        <div className="container-editorial py-12">
          <div className="max-w-xl mx-auto text-center space-y-4">
            <h2 id="loc-search-heading" className="font-display text-2xl font-bold text-foreground">
              Find a Waffle House Near You
            </h2>
            <p className="text-sm text-ink-soft">
              Search by city, state, or ZIP code to find your nearest restaurant.
            </p>
            <div className="relative mt-4">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by city, state, or ZIP code"
                className="w-full rounded-full border border-border bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. BROWSE BY STATE */}
      <section aria-labelledby="states-heading" className="bg-surface py-12 md:py-16 font-sans">
        <div className="container-editorial">
          <div className="max-w-3xl mb-8 space-y-2">
            <h2 id="states-heading" className="font-display text-2xl font-bold text-foreground border-b border-border pb-3">
              Browse Waffle House Locations by State
            </h2>
            <p className="text-sm text-ink-soft">
              Select your state to view available cities and verified restaurant locations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredStates.map((s) => (
              <Link
                key={s.stateSlug}
                to="/locations/$state"
                params={{ state: s.stateSlug }}
                className="group flex items-center justify-between rounded-2xl border border-black/[0.06] bg-white p-5 shadow-xs transition duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
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
            <p className="mt-6 text-sm text-ink-soft italic text-center">No states match your search criteria.</p>
          )}
        </div>
      </section>

      {/* 6. RESTAURANT IMAGES & ATMOSPHERE */}
      <section aria-labelledby="gallery-heading" className="bg-white py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial">
          <div className="max-w-2xl mb-8 space-y-2">
            <span className="chip">Atmosphere &amp; Kitchen</span>
            <h2 id="gallery-heading" className="font-display text-3xl font-bold text-foreground">
              Waffle House Restaurants
            </h2>
            <p className="text-sm text-ink-soft">
              Every Waffle House features its iconic yellow block-letter sign, counter seating, and open-view flat-top griddles.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="overflow-hidden rounded-2xl border border-border bg-muted">
              <img
                src={hero5}
                alt="Waffle House restaurant exterior with iconic yellow sign"
                className="h-64 w-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="p-4 bg-white border-t border-border/60">
                <p className="text-xs font-semibold text-foreground">Classic Diner Exterior</p>
                <p className="text-[11px] text-ink-soft mt-0.5">Iconic 24-hour yellow roadside signage</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-muted">
              <img
                src={hero6}
                alt="Short-order cook preparing breakfast on an open-kitchen flat-top griddle"
                className="h-64 w-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="p-4 bg-white border-t border-border/60">
                <p className="text-xs font-semibold text-foreground">Open Flat-Top Grills</p>
                <p className="text-[11px] text-ink-soft mt-0.5">Short-order cooks preparing orders in plain view</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-muted">
              <img
                src={contactHeroDiner}
                alt="Waffle House dining area with counter stools and booth seating"
                className="h-64 w-full object-cover transition duration-500 hover:scale-105"
                loading="lazy"
              />
              <div className="p-4 bg-white border-t border-border/60">
                <p className="text-xs font-semibold text-foreground">Counter &amp; Booth Seating</p>
                <p className="text-[11px] text-ink-soft mt-0.5">Friendly neighborhood hospitality</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. LOCATION + MENU & HOURS CONNECTION */}
      <section className="bg-surface py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial max-w-4xl space-y-12">
          <div className="grid gap-8 sm:grid-cols-2">
            {/* Menu Connection */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-3">
              <Utensils className="h-6 w-6 text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground">
                Waffle House Menu at Your Local Restaurant
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                While the iconic staples — such as All-Star Specials, Pecan Waffles, and Scattered Hashbrowns — are available nationwide, individual item availability and prices can vary slightly by location.
              </p>
              <div className="pt-2">
                <Link to="/menu" className="text-xs font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                  Explore Full Menu &amp; Prices →
                </Link>
              </div>
            </div>

            {/* Hours Information */}
            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-3">
              <Clock className="h-6 w-6 text-primary" />
              <h2 className="font-display text-xl font-bold text-foreground">
                Waffle House Restaurant Hours
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                The majority of Waffle House locations are open 24 hours a day, 7 days a week, 365 days a year, including all major holidays. You can verify specific store operating hours through our state directory.
              </p>
              <div className="pt-2">
                <Link to="/nutrition" className="text-xs font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                  View Nutrition Information →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ABOUT WAFFLE HOUSE LOCATIONS */}
      <section className="bg-white py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl space-y-4 text-center">
          <span className="chip">Geographic Reach</span>
          <h2 className="font-display text-2xl font-bold sm:text-3xl text-foreground">
            About Waffle House Locations
          </h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            Waffle House restaurants are distributed across 25 U.S. states with heavy concentrations in Georgia, Florida, North Carolina, and South Carolina. Known for community reliability during severe weather, the chain's operational resilience is tracked by FEMA under the informal "Waffle House Index."
          </p>
          <div className="pt-2">
            <Link to="/about" className="text-xs font-bold uppercase tracking-wider text-primary hover:underline">
              Read Restaurant History →
            </Link>
          </div>
        </div>
      </section>

      {/* 9. LOCATIONS FAQ */}
      <section aria-labelledby="loc-faq-heading" className="bg-surface py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl">
          <h2 id="loc-faq-heading" className="font-display text-3xl font-bold text-foreground text-center mb-10">
            Waffle House Locations — Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {locationFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-border rounded-2xl overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="flex w-full items-center justify-between p-6 text-left font-sans"
                  >
                    <span className="font-display text-base font-bold text-foreground">{faq.q}</span>
                    <span className="text-primary font-bold text-lg">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm text-ink-soft leading-relaxed border-t border-border/40 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. INDEPENDENT DISCLOSURE */}
      <section className="bg-white py-10 font-sans">
        <div className="container-editorial max-w-4xl text-center space-y-3 text-xs text-ink-soft">
          <p>
            This is an independent informational guide and is not affiliated with, endorsed by or sponsored by Waffle House, Inc. Store hours, phone numbers and availability may vary by location and change over time.
          </p>
          <div className="flex justify-center gap-4 pt-1">
            <Link to="/disclaimer" className="text-primary hover:underline font-semibold">Disclaimer</Link>
            <span>•</span>
            <Link to="/methodology" className="text-primary hover:underline font-semibold">How We Verify Data</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
