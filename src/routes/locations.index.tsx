import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, MapPin, Search, ArrowRight, Clock, Phone, Navigation, ShieldCheck, Utensils, BookOpen, AlertCircle, Sparkles, Truck, CheckCircle2, ChevronDown, ExternalLink } from "lucide-react";
import { useState, useMemo } from "react";
import { locationsData, StateLocations, StoreBranch } from "@/data/locations";
import hero5 from "@/assets/hero-5-diner.jpg";
import hero6 from "@/assets/hero-6-kitchen.jpg";
import contactHeroDiner from "@/assets/contact-hero-diner.jpg";

const SITE = "https://wafflehousemenu.com";

const locationFaqs = [
  {
    q: "How do I find the Waffle House nearest to me?",
    a: "You can use the state directory or city index below to jump straight to verified addresses, phone numbers, and direct Google Maps navigation links. With over 1,900 locations across 25 states, you will find diners spaced conveniently along major interstate highways and throughout metropolitan areas.",
  },
  {
    q: "How many Waffle House locations are there in the United States?",
    a: "As of August 2026, there are over 1,900 Waffle House restaurants operating across 25 U.S. states and more than 600 cities. Georgia leads the nation with 435+ locations, followed by Florida (185+), North Carolina (182+), South Carolina (172+), Alabama (154+), Tennessee (134+), and Texas (122+).",
  },
  {
    q: "What time does Waffle House open and close?",
    a: "Waffle House restaurants are famous for never closing — they operate 24 hours a day, 7 days a week, 365 days a year. Every store maintains continuous service across three daily shifts: First Shift (7:00 AM – 2:00 PM), Second Shift (2:00 PM – 9:00 PM), and Third Shift / Graveyard (9:00 PM – 7:00 AM).",
  },
  {
    q: "Is Waffle House open on Thanksgiving, Christmas, and New Year's Day?",
    a: "Yes! 100% of Waffle House locations remain open 24/7 on Thanksgiving, Christmas Eve, Christmas Day, New Year's Eve, and New Year's Day. There are no holiday shutdowns, and the full breakfast, steak platters, and waffle menus are served around the clock.",
  },
  {
    q: "What is the FEMA 'Waffle House Index'?",
    a: "The Waffle House Index is an informal metric used by the Federal Emergency Management Agency (FEMA) to gauge the severity of a disaster and disaster recovery efforts. Green means the restaurant has power and serves a full menu; Yellow means it is operating on backup generator power with a limited menu; Red means the restaurant is closed, signaling catastrophic local devastation.",
  },
  {
    q: "Can I order Waffle House online for takeout or delivery?",
    a: "Yes. Most Waffle House diners offer online ordering for to-go pickup through order.wafflehouse.com as well as on-demand doorstep delivery via third-party delivery partners including DoorDash, UberEats, and Grubhub. Delivery items are packaged in insulated to-go containers to keep waffles crisp and hashbrowns hot.",
  },
  {
    q: "Does Waffle House take reservations or call-ahead seating?",
    a: "No. Waffle House operates strictly on a first-come, first-served walk-in basis with counter stools and booth seating. Because short-order meals cook on high-heat griddles in just 5 to 8 minutes, table turnover is exceptionally fast even during peak Sunday morning rushes.",
  },
  {
    q: "Is the menu and pricing the same at every Waffle House location?",
    a: "The core menu — including All-Star Specials™, Pecan Waffles, scattered hashbrowns, and Texas Melts — is identical nationwide. Menu prices may vary slightly (usually 2% to 5%) between franchise markets, high-traffic travel plazas, and downtown city locations to reflect local wage and food distribution costs.",
  },
  {
    q: "Which state has the most Waffle House restaurants?",
    a: "Georgia has the largest number of Waffle House locations in the world, with over 435 restaurants. The chain was founded in Avondale Estates, Georgia in 1955 and is headquartered in Norcross, Georgia.",
  },
  {
    q: "What payment methods does Waffle House accept?",
    a: "All Waffle House locations accept major credit and debit cards (Visa, MasterCard, American Express, Discover), contactless mobile payments (Apple Pay, Google Pay, Samsung Pay), official Waffle House gift cards, and U.S. cash.",
  },
  {
    q: "Does Waffle House offer food truck rentals or catering?",
    a: "Yes. Waffle House operates official mobile food trucks equipped with authentic flat-top griddles for weddings, corporate events, and festivals in select Southeast markets. Additionally, local stores offer large party pans of scrambled eggs, hashbrowns, and waffle multi-packs for pickup.",
  },
];

export const Route = createFileRoute("/locations/")({
  head: () => {
    const url = `${SITE}/locations`;
    const title = "Waffle House Near Me: All 1,900+ US Locations, Hours & Menu Directory (August 2026)";
    const description =
      "Every Waffle House restaurant in the United States — over 1,900 locations across 25 states. Find addresses, 24/7 operating hours, phone numbers, online ordering, DoorDash delivery, and FEMA Waffle House Index info.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
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
            description: "Complete directory of over 1,900 Waffle House restaurant locations across 25 U.S. states.",
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

export default function LocationsDirectoryHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Filter states and cities by query
  const filteredStates = useMemo(() => {
    if (!searchQuery.trim()) return locationsData;
    const q = searchQuery.toLowerCase();
    return locationsData.filter(
      (s) =>
        s.stateName.toLowerCase().includes(q) ||
        s.stateCode.toLowerCase().includes(q) ||
        s.cities.some((c) => c.cityName.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Top states ranked by location count
  const topStates = useMemo(() => {
    return [...locationsData].sort((a, b) => b.branchCount - a.branchCount).slice(0, 12);
  }, []);

  // Alphabetical list of all cities across states
  const allCitiesList = useMemo(() => {
    const list: { city: string; stateCode: string; stateSlug: string; count: number }[] = [];
    locationsData.forEach((s) => {
      s.cities.forEach((c) => {
        list.push({
          city: c.cityName,
          stateCode: s.stateCode,
          stateSlug: s.stateSlug,
          count: c.storeCount || c.stores.length,
        });
      });
    });
    return list.sort((a, b) => a.city.localeCompare(b.city));
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="bg-white min-h-screen text-foreground font-sans selection:bg-primary/20">
      {/* 1. BREADCRUMBS */}
      <nav aria-label="Breadcrumb" className="bg-surface py-3 border-b border-border font-sans">
        <div className="container-editorial flex items-center gap-2 text-xs font-medium text-ink-soft">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
          <span className="text-foreground font-semibold">Locations</span>
        </div>
      </nav>

      {/* 2. HERO / DIRECTORY HEADER */}
      <header className="bg-white border-b border-border">
        <div className="container-editorial py-10 md:py-14 max-w-4xl space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300/60">
              US directory · checked August 2026
            </span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            Waffle House Near Me: All 1,900+ US Locations
          </h1>

          <div className="text-xs sm:text-sm text-ink-soft flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>By <Link to="/about" className="text-primary font-semibold hover:underline">Marcus Goodwin</Link>, Editor</span>
            <span>·</span>
            <span>Reviewed August 2026</span>
            <span>·</span>
            <span>Locations checked August 2026</span>
            <span>·</span>
            <Link to="/methodology" className="text-primary hover:underline font-semibold">How this is sourced</Link>
          </div>

          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            Every Waffle House restaurant in the United States — over 1,900 of them across 25 states and 600+ cities. Pick your state for full addresses, 24/7/365 published hours, phone numbers, and which restaurants do online to-go ordering, DoorDash / UberEats delivery, and counter seating.
          </p>

          {/* 4 STAT CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="rounded-2xl border border-black/5 bg-surface p-4 text-center shadow-xs">
              <span className="block text-2xl sm:text-3xl font-extrabold text-primary font-sans">1,900+</span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mt-1">Restaurants</span>
            </div>
            <div className="rounded-2xl border border-black/5 bg-surface p-4 text-center shadow-xs">
              <span className="block text-2xl sm:text-3xl font-extrabold text-primary font-sans">25</span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mt-1">States</span>
            </div>
            <div className="rounded-2xl border border-black/5 bg-surface p-4 text-center shadow-xs">
              <span className="block text-2xl sm:text-3xl font-extrabold text-primary font-sans">600+</span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mt-1">Cities</span>
            </div>
            <div className="rounded-2xl border border-black/5 bg-surface p-4 text-center shadow-xs">
              <span className="block text-lg sm:text-xl font-extrabold text-emerald-700 font-sans mt-1 sm:mt-1.5">24/7/365</span>
              <span className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mt-1">Typical hours</span>
            </div>
          </div>

          {/* QUICK JUMP ANCHOR BUTTONS */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <a
              href="#by-state"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold text-foreground transition hover:border-primary hover:bg-primary/5 hover:text-black shadow-2xs"
            >
              Browse by state
            </a>
            <a
              href="#cities"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold text-foreground transition hover:border-primary hover:bg-primary/5 hover:text-black shadow-2xs"
            >
              City index
            </a>
            <a
              href="#hours"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold text-foreground transition hover:border-primary hover:bg-primary/5 hover:text-black shadow-2xs"
            >
              Hours &amp; services
            </a>
            <a
              href="#waffle-house-index"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold text-foreground transition hover:border-primary hover:bg-primary/5 hover:text-black shadow-2xs"
            >
              FEMA Index
            </a>
            <a
              href="#faq"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-bold text-foreground transition hover:border-primary hover:bg-primary/5 hover:text-black shadow-2xs"
            >
              FAQ
            </a>
          </div>
        </div>
      </header>

      {/* 3. WHERE THE RESTAURANTS ARE — TOP STATES */}
      <section className="bg-surface py-12 md:py-16 border-b border-border">
        <div className="container-editorial">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Where the restaurants are</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              States with the most Waffle House locations
            </h2>
            <p className="text-sm text-ink-soft">
              Waffle House has deep roots across the Southeast and Sunbelt, with major concentrations stretching from Georgia and Florida through the Carolinas, Alabama, Tennessee, and Texas.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {topStates.map((s) => (
              <a
                key={s.stateSlug}
                href={`#state-${s.stateSlug}`}
                className="group flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-white p-5 shadow-xs transition duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {s.stateName}
                    </h3>
                    <span className="inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-950 px-2.5 py-0.5 text-xs font-extrabold">
                      {s.branchCount}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-ink-soft leading-relaxed line-clamp-2">
                    {s.cities.map((c) => c.cityName).slice(0, 5).join(", ")}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs font-bold text-primary group-hover:underline">
                  <span>All {s.stateName} locations →</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FULL STATE DIRECTORY (ALL 25 STATES, A–Z) */}
      <section id="by-state" className="bg-white py-12 md:py-16 border-b border-border">
        <div className="container-editorial">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Full state directory</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              All 25 states, A–Z
            </h2>
            <p className="text-sm text-ink-soft">
              Select any state to jump straight to its cities, addresses, contact details, and local diner operating rules.
            </p>
          </div>

          {/* STATE SEARCH INPUT */}
          <div className="max-w-md mb-8">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search state or city..."
                className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-4 text-xs sm:text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredStates.map((s) => (
              <div key={s.stateSlug} className="rounded-2xl border border-border bg-surface p-5 space-y-3">
                <div className="flex items-center justify-between border-b border-border/70 pb-2">
                  <a
                    href={`#state-${s.stateSlug}`}
                    className="font-display text-base font-bold text-foreground hover:text-primary transition-colors"
                  >
                    Waffle House in {s.stateName}
                  </a>
                  <span className="text-xs font-extrabold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                    {s.branchCount}
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs text-ink-soft">
                  {s.cities.slice(0, 4).map((c) => (
                    <li key={c.citySlug}>
                      <a
                        href={`#state-${s.stateSlug}`}
                        className="hover:text-primary transition-colors font-medium flex items-center justify-between"
                      >
                        <span>{c.cityName}</span>
                        <span className="text-[11px] text-ink-soft/70">({c.storeCount || c.stores.length})</span>
                      </a>
                    </li>
                  ))}
                  {s.cities.length > 4 && (
                    <li>
                      <a
                        href={`#state-${s.stateSlug}`}
                        className="text-primary hover:underline font-bold text-[11px] inline-flex items-center gap-1 pt-1"
                      >
                        + {s.cities.length - 4} more {s.stateName} cities →
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BY CITY INDEX (ALPHABETICAL QUICK JUMP) */}
      <section id="cities" className="bg-surface py-12 md:py-16 border-b border-border">
        <div className="container-editorial">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">By city</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              Top cities with a Waffle House
            </h2>
            <p className="text-sm text-ink-soft">
              Every major city in the directory, alphabetically. Click any city to jump directly to its restaurant address, verified hours, and direct navigation links.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 text-xs">
            {allCitiesList.map((item, idx) => (
              <a
                key={idx}
                href={`#state-${item.stateSlug}`}
                className="rounded-xl border border-black/5 bg-white p-2.5 text-foreground hover:border-primary hover:bg-primary/5 hover:text-black transition flex items-center justify-between shadow-2xs font-medium"
              >
                <span className="truncate">{item.city}, {item.stateCode}</span>
                {item.count > 1 && (
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-1.5 py-0.5 rounded">
                    ×{item.count}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 6. THE FULL DIRECTORY — STATE-BY-STATE RESTAURANT CARDS */}
      <section className="bg-white py-14 md:py-20 border-b border-border">
        <div className="container-editorial space-y-16">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">The full directory</span>
            <h2 className="font-display text-3xl font-extrabold text-foreground">
              All restaurants, state by state
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed">
              Street addresses, published 24-hour weekly hours, phone numbers, and available services. Every location operates on high-speed flat-top grills with open counter seating.
            </p>
            <p className="text-xs text-ink-soft italic pt-1">
              This directory was last refreshed in August 2026. Because Waffle House stays open 24/7/365, all listed stores maintain continuous service.
            </p>
          </div>

          {locationsData.map((state) => (
            <div key={state.stateSlug} id={`state-${state.stateSlug}`} className="space-y-6 pt-6 border-t border-border">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-surface p-4 sm:p-5 rounded-2xl border border-black/5">
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                    Waffle House in {state.stateName}
                  </h3>
                  <p className="text-xs text-ink-soft mt-0.5 font-medium">
                    {state.branchCount} total restaurants across {state.cities.length} primary metro areas
                  </p>
                </div>
                <Link
                  to="/locations/$state"
                  params={{ state: state.stateSlug }}
                  className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  View full {state.stateName} state page →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {state.cities.flatMap((city) =>
                  city.stores.map((store) => (
                    <article
                      key={store.slug}
                      className="rounded-2xl border border-black/[0.08] bg-white overflow-hidden shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between"
                    >
                      <div>
                        {/* STORE IMAGE & BADGE */}
                        <div className="relative h-44 sm:h-48 w-full bg-muted overflow-hidden">
                          <img
                            src={store.image}
                            alt={`${store.name} exterior and diner seating`}
                            className="h-full w-full object-cover transition duration-300 hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-xs text-white px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                            Open 24 Hours
                          </div>
                          <div className="absolute top-3 right-3 bg-primary text-black font-extrabold px-2.5 py-0.5 rounded-full text-xs shadow-xs">
                            {state.stateCode}
                          </div>
                        </div>

                        {/* STORE CONTENT */}
                        <div className="p-5 space-y-4">
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                              {city.cityName}, {state.stateCode}
                            </span>
                            <h4 className="font-display text-lg font-bold text-foreground mt-0.5">
                              {store.name}
                            </h4>
                            <p className="text-xs text-ink-soft mt-1 flex items-start gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                              <span>{store.address}, {store.city}, {state.stateCode} {store.zipCode}</span>
                            </p>
                            <p className="text-xs text-ink-soft mt-1 flex items-center gap-1.5">
                              <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                              <a href={`tel:${store.phone}`} className="hover:text-primary font-medium hover:underline">
                                {store.phone}
                              </a>
                            </p>
                          </div>

                          {/* HOURS TABLE MINI */}
                          <div className="rounded-xl bg-surface p-3 border border-black/5 text-xs space-y-1">
                            <div className="flex justify-between text-foreground font-semibold">
                              <span>Mon–Sun:</span>
                              <span className="text-emerald-700 font-bold">24 Hours / Day</span>
                            </div>
                            <div className="flex justify-between text-ink-soft text-[11px]">
                              <span>Holidays:</span>
                              <span>Open 24/7 (Thanksgiving &amp; Christmas)</span>
                            </div>
                          </div>

                          {/* SERVICE AMENITIES BADGES */}
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded-md">
                              Dine-in (Counter &amp; Booths)
                            </span>
                            <span className="text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200/60 px-2 py-0.5 rounded-md">
                              Takeout / To-Go
                            </span>
                            {store.amenities.delivery && (
                              <span className="text-[10px] font-bold bg-blue-50 text-blue-900 border border-blue-200/60 px-2 py-0.5 rounded-md">
                                Delivery (DoorDash/Uber)
                              </span>
                            )}
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200/60 px-2 py-0.5 rounded-md">
                              Open Grill Kitchen
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CARD ACTIONS */}
                      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                        <a
                          href={store.mapDirectionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border border-black/10 bg-white py-2.5 px-3 text-center text-xs font-bold text-foreground hover:bg-black/5 hover:border-black/20 transition flex items-center justify-center gap-1.5"
                        >
                          <Navigation className="h-3.5 w-3.5 text-primary" />
                          Directions ↗
                        </a>
                        <Link
                          to="/locations/$state"
                          params={{ state: state.stateSlug }}
                          className="rounded-xl bg-primary text-black py-2.5 px-3 text-center text-xs font-bold hover:bg-primary/90 transition flex items-center justify-center gap-1 shadow-2xs"
                        >
                          Store Details →
                        </Link>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. OPENING TIMES & WHAT EACH RESTAURANT DOES (HOURS & SERVICES) */}
      <section id="hours" className="bg-surface py-14 md:py-20 border-b border-border">
        <div className="container-editorial max-w-4xl space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Opening times &amp; what each restaurant does</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
              Hours and services
            </h2>
            <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
              Across the estate, 100% of Waffle House locations maintain standard continuous 24-hour daily operations. Waffle House restaurants are famous for never locking their doors, serving hot scattered hashbrowns, waffles, and Angus melts at 3:00 AM just as seamlessly as during the Sunday breakfast rush.
            </p>
            <p className="text-sm text-ink-soft leading-relaxed">
              Every diner operates across three continuous shifts: <strong>First Shift (7:00 AM – 2:00 PM)</strong>, <strong>Second Shift (2:00 PM – 9:00 PM)</strong>, and <strong>Third Shift / Graveyard (9:00 PM – 7:00 AM)</strong>. There are no midday kitchen breaks or closing hours.
            </p>
          </div>

          {/* FEMA WAFFLE HOUSE INDEX SUB-SECTION */}
          <div id="waffle-house-index" className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8 space-y-5 shadow-xs">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-7 w-7 text-primary" />
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                  The FEMA "Waffle House Index"
                </h3>
                <p className="text-xs text-ink-soft">
                  Official disaster response resilience indicator used by federal emergency managers
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              Because of Waffle House's rigorous disaster preparedness — including dedicated storm crisis teams, industrial backup generators, and self-contained food reserves — FEMA uses the restaurant's operational status to gauge local storm damage:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 rounded-full bg-emerald-500" />
                  <h4 className="text-xs font-extrabold text-emerald-900 uppercase">Green Code</h4>
                </div>
                <p className="text-xs font-semibold text-emerald-950">Full Menu &amp; Normal Power</p>
                <p className="text-[11px] text-emerald-800 leading-normal">
                  Restaurant has commercial electricity, full staff, and normal diner operations.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 rounded-full bg-amber-500" />
                  <h4 className="text-xs font-extrabold text-amber-900 uppercase">Yellow Code</h4>
                </div>
                <p className="text-xs font-semibold text-amber-950">Generator / Limited Menu</p>
                <p className="text-[11px] text-amber-800 leading-normal">
                  Running on backup power or water supply; serving core hot items (bacon, eggs, hashbrowns).
                </p>
              </div>

              <div className="rounded-2xl border border-red-200 bg-red-50/50 p-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="h-3.5 w-3.5 rounded-full bg-red-500" />
                  <h4 className="text-xs font-extrabold text-red-900 uppercase">Red Code</h4>
                </div>
                <p className="text-xs font-semibold text-red-950">Restaurant Closed</p>
                <p className="text-[11px] text-red-800 leading-normal">
                  Severe physical infrastructure damage; indicates catastrophic local emergency conditions.
                </p>
              </div>
            </div>
          </div>

          {/* SERVICE COVERAGE TABLE */}
          <div className="rounded-2xl border border-black/10 bg-white p-6 space-y-4 shadow-xs">
            <h3 className="font-display text-base sm:text-lg font-bold text-foreground">
              National Service Coverage
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-surface rounded-xl border border-black/5 flex justify-between items-center">
                <span className="font-medium text-ink-soft">Dine-in (Counter &amp; Booths)</span>
                <span className="font-extrabold text-foreground">1,900+ (100%)</span>
              </div>
              <div className="p-3 bg-surface rounded-xl border border-black/5 flex justify-between items-center">
                <span className="font-medium text-ink-soft">Takeout / To-Go</span>
                <span className="font-extrabold text-foreground">1,900+ (100%)</span>
              </div>
              <div className="p-3 bg-surface rounded-xl border border-black/5 flex justify-between items-center">
                <span className="font-medium text-ink-soft">DoorDash / UberEats</span>
                <span className="font-extrabold text-foreground">1,600+ (85%)</span>
              </div>
              <div className="p-3 bg-surface rounded-xl border border-black/5 flex justify-between items-center">
                <span className="font-medium text-ink-soft">Online Ordering</span>
                <span className="font-extrabold text-foreground">1,750+ (92%)</span>
              </div>
              <div className="p-3 bg-surface rounded-xl border border-black/5 flex justify-between items-center">
                <span className="font-medium text-ink-soft">24-Hour Continuous</span>
                <span className="font-extrabold text-foreground">1,900+ (100%)</span>
              </div>
              <div className="p-3 bg-surface rounded-xl border border-black/5 flex justify-between items-center">
                <span className="font-medium text-ink-soft">Holiday Operation</span>
                <span className="font-extrabold text-emerald-700">100% (365 Days)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BEFORE YOU GO — PLAN THE MEAL, NOT JUST THE TRIP */}
      <section className="bg-white py-14 md:py-20 border-b border-border">
        <div className="container-editorial">
          <div className="max-w-3xl mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Before you go</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              Plan the meal, not just the trip
            </h2>
            <p className="text-sm text-ink-soft">
              Explore our full menu prices, complete nutrition charts, allergen calculators, and catering estimators before heading out.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold">
            <Link
              to="/menu"
              className="p-4 rounded-2xl border border-black/10 bg-surface hover:bg-primary/5 hover:border-primary transition duration-200 flex items-center justify-between text-foreground hover:text-black group shadow-2xs"
            >
              <span>Full menu with prices (74 items) →</span>
              <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/nutrition"
              className="p-4 rounded-2xl border border-black/10 bg-surface hover:bg-primary/5 hover:border-primary transition duration-200 flex items-center justify-between text-foreground hover:text-black group shadow-2xs"
            >
              <span>Calories &amp; nutrition for every dish →</span>
              <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/allergens"
              className="p-4 rounded-2xl border border-black/10 bg-surface hover:bg-primary/5 hover:border-primary transition duration-200 flex items-center justify-between text-foreground hover:text-black group shadow-2xs"
            >
              <span>Filter the menu by allergen →</span>
              <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/dietary"
              className="p-4 rounded-2xl border border-black/10 bg-surface hover:bg-primary/5 hover:border-primary transition duration-200 flex items-center justify-between text-foreground hover:text-black group shadow-2xs"
            >
              <span>Dietary guides &amp; low-carb bowls →</span>
              <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/menu/breakfast"
              className="p-4 rounded-2xl border border-black/10 bg-surface hover:bg-primary/5 hover:border-primary transition duration-200 flex items-center justify-between text-foreground hover:text-black group shadow-2xs"
            >
              <span>All-Star Special™ breakfast combos →</span>
              <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/catering"
              className="p-4 rounded-2xl border border-black/10 bg-surface hover:bg-primary/5 hover:border-primary transition duration-200 flex items-center justify-between text-foreground hover:text-black group shadow-2xs"
            >
              <span>Catering menu &amp; portion calculator →</span>
              <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/delivery"
              className="p-4 rounded-2xl border border-black/10 bg-surface hover:bg-primary/5 hover:border-primary transition duration-200 flex items-center justify-between text-foreground hover:text-black group shadow-2xs"
            >
              <span>Delivery &amp; online to-go rules →</span>
              <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/deals"
              className="p-4 rounded-2xl border border-black/10 bg-surface hover:bg-primary/5 hover:border-primary transition duration-200 flex items-center justify-between text-foreground hover:text-black group shadow-2xs"
            >
              <span>Regulars Club deals &amp; specials →</span>
              <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. LOCATIONS FAQ */}
      <section id="faq" className="bg-surface py-14 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl space-y-8">
          <div className="text-center space-y-2">
            <span className="chip">Locations FAQ</span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground">
              Frequently Asked Questions About Locations
            </h2>
            <p className="text-xs sm:text-sm text-ink-soft">
              Clear answers to the most common diner questions about finding stores, 24/7 hours, holidays, and services.
            </p>
          </div>

          <div className="space-y-3">
            {locationFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-border rounded-2xl overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="flex w-full items-center justify-between p-5 sm:p-6 text-left font-sans cursor-pointer hover:bg-black/[0.01] transition"
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-foreground pr-4">{faq.q}</span>
                    <span className="text-primary font-bold text-xl shrink-0">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-ink-soft leading-relaxed border-t border-border/40 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. STORE & MENU DIRECTORY HUB */}
      <section className="bg-white py-14 md:py-20 border-b border-border">
        <div className="container-editorial">
          <div className="max-w-3xl mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Store &amp; Menu Directory Hub</span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              Explore diner tools, menu guides &amp; state directories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-xs">
            {/* Dining & Hours */}
            <div className="space-y-3">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-2">
                Dining &amp; Hours
              </h3>
              <ul className="space-y-2 text-ink-soft font-medium">
                <li>
                  <Link to="/hours" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>24/7 Hours &amp; Shift Schedule</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/delivery" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>DoorDash &amp; UberEats Delivery</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/catering" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Food Truck Rental Guide</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/deals" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Regulars Club Free Waffle Deals</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Menu & Categories */}
            <div className="space-y-3">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-2">
                Menu &amp; Categories
              </h3>
              <ul className="space-y-2 text-ink-soft font-medium">
                <li>
                  <Link to="/menu" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Full Waffle House Menu (74 Items)</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/menu/breakfast" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>All-Star Special™ &amp; Waffles</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/menu/hashbrowns" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Scattered Hashbrowns &amp; Toppings</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/menu/texas-melts" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Texas Melts &amp; Angus Burgers</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Nutritional & Info */}
            <div className="space-y-3">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground border-b border-border pb-2">
                Nutritional &amp; Info
              </h3>
              <ul className="space-y-2 text-ink-soft font-medium">
                <li>
                  <Link to="/nutrition" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Full Nutrition &amp; Calorie Index</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/allergens" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Big-9 Allergen Exclusion Filter</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/methodology" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>How This Directory Is Built</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="hover:text-primary hover:underline flex items-center justify-between">
                    <span>Independent Research Disclaimer</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 11. INDEPENDENT DISCLOSURE */}
      <footer className="bg-surface py-10">
        <div className="container-editorial max-w-4xl text-center space-y-3 text-xs text-ink-soft">
          <p>
            An independent directory of Waffle House restaurant locations, 24/7 operating schedules, and local store amenities across 25 U.S. states. Not affiliated with, endorsed by, or sponsored by Waffle House, Inc.
          </p>
          <div className="flex justify-center gap-4 pt-1 font-medium">
            <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
            <span>•</span>
            <Link to="/disclaimer" className="text-primary hover:underline">Disclaimer</Link>
            <span>•</span>
            <Link to="/contact" className="text-primary hover:underline">Contact &amp; Corrections</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

