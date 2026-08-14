import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, HelpCircle, ArrowRight, Utensils, DollarSign, HeartHandshake, MapPin, Info } from "lucide-react";
import { useState } from "react";

const SITE = "https://wafflehousemenu.com";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategoryGroup {
  id: string;
  title: string;
  description: string;
  icon: any;
  items: FaqItem[];
}

const faqGroups: FaqCategoryGroup[] = [
  {
    id: "menu",
    title: "Menu & Categories",
    description: "Questions regarding dishes, categories, and printable PDF documents.",
    icon: Utensils,
    items: [
      {
        q: "What menu information is available on this website?",
        a: "Our website provides a comprehensive directory of 74 Waffle House menu items across 13 categories, complete with estimated prices, calorie counts, ingredient details, and descriptions.",
      },
      {
        q: "How are Waffle House menu categories organized?",
        a: "Menu items are grouped into 13 canonical categories: Waffles, Breakfast Favorites, Egg Breakfasts, Toddle House Omelets, Hashbrowns & Toppings, Breakfast Sandwiches & Melts, Texas Melts, 100% Angus Burgers, Classic Dinners, Lunch & Dinner Sandwiches, Sides & Additions, Pies & Desserts, and Beverages.",
      },
      {
        q: "Where can I find individual menu items?",
        a: "You can explore individual menu items by navigating through our central Menu page or selecting specific categories to view detailed item descriptions, pricing, and nutrition.",
      },
      {
        q: "Where can I find the Waffle House menu PDF?",
        a: "A printable PDF reference is available for direct download on our Menu page and Nutrition page for easy offline viewing.",
      },
    ],
  },
  {
    id: "prices",
    title: "Menu Prices",
    description: "Information about pricing estimates and regional variations.",
    icon: DollarSign,
    items: [
      {
        q: "Can Waffle House prices vary by location?",
        a: "Yes. Because Waffle House operates both corporate and franchise locations across 25 states, prices can differ between restaurants to reflect local operating costs and regional distribution expenses.",
      },
      {
        q: "How often can menu prices change?",
        a: "Restaurant pricing can be updated periodically by restaurant operators in response to commodity prices and economic factors. Displayed prices reflect verified counter averages.",
      },
      {
        q: "Where can I find current menu price information?",
        a: "Estimated prices are listed alongside every item on our main Menu page and individual category pages. We recommend confirming final pricing directly with your local restaurant.",
      },
    ],
  },
  {
    id: "nutrition",
    title: "Nutrition & Calories",
    description: "Questions about calorie counts, macronutrients, and food allergens.",
    icon: HeartHandshake,
    items: [
      {
        q: "Where can I find Waffle House nutrition information?",
        a: "You can view full nutritional metrics — including calories, protein, carbohydrates, fat, and sodium — on our dedicated Nutrition page.",
      },
      {
        q: "Does the website provide calorie information?",
        a: "Yes. Calorie counts are displayed across our entire menu catalog, nutrition tables, and individual item detail pages.",
      },
      {
        q: "Can nutrition information change?",
        a: "Yes. Ingredient formulations, portion sizes, preparation techniques, and custom orders can all alter nutritional values. Our figures reflect standard baseline recipes.",
      },
    ],
  },
  {
    id: "locations",
    title: "Locations & Hours",
    description: "Finding nearby restaurants, checking hours, and state coverage.",
    icon: MapPin,
    items: [
      {
        q: "How can I find a Waffle House near me?",
        a: "You can use our interactive search tool on the Locations page to search by city, state, or ZIP code, or browse our state-by-state restaurant directory.",
      },
      {
        q: "Can I search by state or city?",
        a: "Yes. Our directory covers over 2,100 diner locations organized across 25 U.S. states and hundreds of cities.",
      },
      {
        q: "Can restaurant information change?",
        a: "Store hours, contact numbers, and service options (such as dine-in or takeout) can occasionally change. We recommend calling your local restaurant to confirm details.",
      },
    ],
  },
  {
    id: "website",
    title: "Website & Methodology",
    description: "About our mission, disclosures, and how to contact us.",
    icon: Info,
    items: [
      {
        q: "Is this website affiliated with Waffle House?",
        a: "No. This website is an independent informational guide and is not affiliated with, sponsored by, or operated by Waffle House, Inc.",
      },
      {
        q: "What is the purpose of this website?",
        a: "Our purpose is to provide restaurant diners with a clean, structured, and easily searchable digital reference for Waffle House menu items, prices, nutrition facts, and locations.",
      },
      {
        q: "How can I report incorrect information?",
        a: "If you notice an outdated price, incorrect address, or broken link, you can submit a note via our Contact page for prompt editorial review.",
      },
      {
        q: "Where can I learn how information is organized?",
        a: "You can read our comprehensive Methodology page to learn more about our research standards, sourcing, and content organization principles.",
      },
    ],
  },
];

const allFaqsFlat = faqGroups.flatMap((g) => g.items);

export const Route = createFileRoute("/faq")({
  head: () => {
    const url = `${SITE}/faq`;
    const title = "Waffle House Menu & Information FAQ";
    const description =
      "Find answers about Waffle House menu information, prices, nutrition, locations, menu guides and this independent information website.";
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
              { "@type": "ListItem", position: 2, name: "FAQ", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: allFaqsFlat.map((faq) => ({
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
  component: FaqPage,
});

function FaqPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="min-h-screen bg-background pb-20 font-sans text-foreground">
      {/* 1. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="bg-surface py-3 border-b border-border font-sans">
        <div className="container-editorial flex items-center gap-2 text-xs font-medium text-ink-soft">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="text-foreground">FAQ</span>
        </div>
      </nav>

      {/* 2. HERO / INTRODUCTION */}
      <header className="border-b border-border bg-surface py-12 sm:py-16 font-sans">
        <div className="container-editorial max-w-4xl space-y-4">
          <span className="chip">Knowledge Base</span>
          <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl text-foreground">
            Waffle House Menu &amp; Information FAQ
          </h1>
          <p className="text-base text-ink-soft leading-relaxed max-w-3xl">
            Find clear, factual answers to frequently asked questions about the Waffle House menu, prices, nutrition, restaurant locations, and this independent reference publication.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-primary">
            <Link to="/menu" className="hover:underline">Explore Menu →</Link>
            <Link to="/nutrition" className="hover:underline">Nutrition Guide →</Link>
            <Link to="/locations" className="hover:underline">Locations Directory →</Link>
            <Link to="/about" className="hover:underline">About This Site →</Link>
            <Link to="/methodology" className="hover:underline">Methodology →</Link>
          </div>
        </div>
      </header>

      {/* 3. FAQ CATEGORIES */}
      <div className="container-editorial max-w-4xl py-12 space-y-16 font-sans">
        {faqGroups.map((group) => {
          const Icon = group.icon;
          return (
            <section key={group.id} aria-labelledby={`${group.id}-heading`} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 id={`${group.id}-heading`} className="font-display text-2xl font-bold text-foreground">
                    {group.title}
                  </h2>
                  <p className="text-xs text-ink-soft mt-0.5">{group.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                {group.items.map((item, idx) => {
                  const key = `${group.id}-${idx}`;
                  const isOpen = !!openItems[key];
                  return (
                    <div key={key} className="border border-border rounded-2xl overflow-hidden bg-white shadow-xs">
                      <button
                        onClick={() => toggleItem(key)}
                        className="flex w-full items-center justify-between p-5 text-left font-sans transition hover:bg-surface/50"
                      >
                        <span className="font-display text-base font-bold text-foreground pr-4">
                          {item.q}
                        </span>
                        <span className="text-primary font-bold text-lg shrink-0">
                          {isOpen ? "−" : "+"}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-sm text-ink-soft leading-relaxed border-t border-border/40 pt-4">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* 4. NEED MORE HELP SECTION */}
        <section aria-labelledby="more-help-heading" className="rounded-2xl border border-border bg-surface p-8 text-center space-y-4 shadow-xs">
          <HelpCircle className="h-8 w-8 text-primary mx-auto" />
          <h2 id="more-help-heading" className="font-display text-2xl font-bold text-foreground">
            Still Have Questions?
          </h2>
          <p className="text-sm text-ink-soft max-w-xl mx-auto leading-relaxed">
            Can't find the answer you're looking for? Reach out to our editorial team or explore our detailed methodology guide.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Contact Our Team <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/methodology" className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-white px-5 text-sm font-semibold text-foreground hover:border-primary">
              Read Methodology
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
