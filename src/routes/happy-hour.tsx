import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Clock,
  Coffee,
  HelpCircle,
  Info,
  MapPin,
  Percent,
  ShieldCheck,
  Sparkles,
  Utensils,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import hero4 from "@/assets/hero-4-coffee.jpg";
import hero5 from "@/assets/hero-5-diner.jpg";
import popularDrinks from "@/assets/popular-drinks.jpg";
import { SubscriberSection } from "@/components/SubscriberSection";

const SITE = "https://wafflehousemenu.com";

const happyHourFaqs = [
  {
    q: "Does Waffle House have an official Happy Hour?",
    a: "No. Waffle House does not offer a standardized nationwide 'Happy Hour' discount program. Instead, Waffle House maintains consistent, affordable pricing and full menu availability 24 hours a day, 7 days a week, 365 days a year.",
  },
  {
    q: "Do any individual Waffle House locations offer local specials?",
    a: "Some independent franchise operators or college campus locations may run periodic regional promotions or beverage specials. However, these are store-specific and not corporate-wide policies.",
  },
  {
    q: "Are coffee and iced tea refills free at Waffle House?",
    a: "Yes! Classic blend coffee, dark roast coffee, and Alice's Famous Iced Tea™ (sweet or unsweet) include unlimited free refills for dine-in customers around the clock.",
  },
  {
    q: "How does Waffle House maintain affordable everyday prices?",
    a: "Waffle House keeps food costs low through direct supply chain relationships, a focused menu of classic diner staples, and high-efficiency open-kitchen preparation without relying on temporary coupon gimmicks.",
  },
  {
    q: "Where can I find the lowest price meals on the menu?",
    a: "Menu items such as the 2 Egg Breakfast, Grilled Cheese, Sausage Biscuit, and regular Hashbrowns provide filling meals for under $7 to $9. Explore our complete Menu & Prices guide for itemized pricing.",
  },
  {
    q: "Does Waffle House serve alcoholic beverages?",
    a: "Standard Waffle House locations do not serve alcoholic beverages (with rare exceptions at specialized concession or airport installations, if any). The beverage program focuses on bottomless coffee, Southern sweet tea, fruit juices, sodas, and milkshakes.",
  },
];

export const Route = createFileRoute("/happy-hour")({
  head: () => {
    const url = `${SITE}/happy-hour`;
    const title = "Waffle House Happy Hour & Promotions Guide | Everyday Value";
    const description =
      "Explore the truth about Waffle House Happy Hour, discounts, and promotions. Learn why Waffle House offers consistent 24/7 diner pricing, unlimited beverage refills, and everyday menu value.";
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
              { "@type": "ListItem", position: 2, name: "Happy Hour", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Waffle House Happy Hour & Promotions Guide",
            url,
            description,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: happyHourFaqs.map((faq) => ({
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
  component: HappyHourPage,
});

function HappyHourPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white text-foreground font-sans">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-surface py-3">
        <div className="container-editorial">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ink-soft">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-foreground">Happy Hour</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white py-16 md:py-24">
        <div className="absolute inset-0 -z-10 opacity-30">
          <img src={hero4} alt="Waffle House Coffee and Diner Mug" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="container-editorial relative z-10">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block rounded-full bg-primary px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
              Promotions &amp; Value Guide
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
              Waffle House Happy Hour
            </h1>
            <p className="text-lg leading-relaxed text-white/85 max-w-2xl">
              An honest, factual breakdown of Waffle House promotion policies, 24/7 everyday value pricing, bottomless beverage programs, and how to get the most value from your visit.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/menu" className="btn-primary">
                View Everyday Menu &amp; Prices <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/locations"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Find Local Store
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Truth About Happy Hour */}
      <section aria-labelledby="truth-heading" className="py-16 md:py-20 border-b border-border bg-white">
        <div className="container-editorial max-w-4xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="chip">Pricing Philosophy</span>
            <h2 id="truth-heading" className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Understanding Waffle House Pricing
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed">
              Why Waffle House chooses straightforward 24-hour pricing over limited-time discount windows.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">24/7 Same Menu Prices</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Whether you dine at 7:00 AM on a Tuesday or 2:00 AM on Sunday, menu prices remain consistent without late-night surge pricing or peak-hour markups.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Coffee className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">Bottomless Beverages</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Every cup of classic 100% Arabica diner coffee and fresh-brewed sweet tea includes unlimited free refills throughout your dine-in stay.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Percent className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">No Coupon Tricks</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Rather than inflating standard prices to fund coupon discounts, the yellow sign promises authentic, affordable diner food cooked fresh to order every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Everyday Value Highlights */}
      <section className="py-16 md:py-20 border-b border-border bg-surface">
        <div className="container-editorial max-w-4xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="chip">Best Value Picks</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Top Value Meals on the Waffle House Menu
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed">
              If you are looking to maximize portion size and satisfaction for your dollar, these staples deliver exceptional value.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "All-Star Special™", desc: "Two eggs, hashbrowns, toast, meat, and a waffle. The most complete combo meal on the menu." },
              { title: "2 Eggs & Toast", desc: "Farm-fresh eggs with griddled hashbrowns and warm buttered toast for a quick, low-cost plate." },
              { title: "Texas Angus Patty Melt", desc: "A quarter-pound of 100% Angus beef with grilled onions and melted cheese on Texas toast." },
              { title: "Bottomless Coffee", desc: "Hot, freshly brewed diner coffee with unlimited table refills for just a few dollars." },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-white p-5 shadow-xs space-y-2">
                <h3 className="font-display text-base font-bold text-foreground">{v.title}</h3>
                <p className="text-xs text-ink-soft leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/menu" className="btn-primary">
              Explore Full 74-Item Menu <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Location-Specific Promotion Details */}
      <section className="py-16 md:py-20 border-b border-border bg-white">
        <div className="container-editorial max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="chip">Regional Specials</span>
              <h2 className="font-display text-2xl font-bold sm:text-3xl text-foreground">
                How to Check for Local Promotions
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                While corporate Waffle House rarely issues discount vouchers or timed Happy Hour promotions, occasional promotional merchandise, seasonal beverage flavors, or university-sponsored specials may be active at specific locations.
              </p>
              <p className="text-sm text-ink-soft leading-relaxed">
                To confirm pricing or current local offerings, check directly with your neighborhood restaurant using our state-by-state store directory.
              </p>
              <div className="pt-2">
                <Link to="/locations" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                  Find Nearest Waffle House <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 overflow-hidden rounded-2xl border border-border shadow-xs">
              <img
                src={hero5}
                alt="Waffle House restaurant illuminated at night"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section aria-labelledby="hh-faq-heading" className="py-16 md:py-20 border-b border-border bg-surface">
        <div className="container-editorial max-w-3xl">
          <div className="text-center mb-10 space-y-3">
            <span className="chip">FAQ</span>
            <h2 id="hh-faq-heading" className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Waffle House Promotions &amp; Happy Hour FAQs
            </h2>
            <p className="text-sm text-ink-soft">
              Clear, transparent answers regarding restaurant discounts and special pricing.
            </p>
          </div>

          <div className="space-y-3">
            {happyHourFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-border rounded-2xl overflow-hidden bg-white shadow-xs">
                  <button
                    onClick={() => toggleFaq(i)}
                    className="flex w-full items-center justify-between p-6 text-left"
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

      {/* Trust Notice */}
      <section className="py-12 border-b border-border bg-white text-center">
        <div className="container-editorial max-w-3xl space-y-3">
          <span className="chip">Editorial Integrity</span>
          <p className="text-xs text-ink-soft leading-relaxed">
            This informational page is published to provide accurate information to diners and avoid misleading third-party discount claims. We are an independent publication.
          </p>
          <div className="flex justify-center gap-4 text-xs font-bold uppercase tracking-wider text-primary pt-1">
            <Link to="/about" className="hover:underline">About This Guide</Link>
            <span>•</span>
            <Link to="/methodology" className="hover:underline">Pricing Methodology</Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <SubscriberSection idPrefix="hh-sub" />
    </div>
  );
}
