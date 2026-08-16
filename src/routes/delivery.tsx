import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Car,
  Clock,
  HelpCircle,
  Info,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Utensils,
  ChevronRight,
  FileText,
} from "lucide-react";
import { useState } from "react";
import hero5 from "@/assets/hero-5-diner.jpg";
import hero6 from "@/assets/hero-6-kitchen.jpg";
import contactHeroDiner from "@/assets/contact-hero-diner.jpg";
import { SubscriberSection } from "@/components/SubscriberSection";

const SITE = "https://wafflehousemenu.com";

const deliveryFaqs = [
  {
    q: "Does Waffle House deliver?",
    a: "Waffle House does not operate an in-house fleet of delivery drivers. However, many individual Waffle House locations partner with third-party delivery platforms such as DoorDash, Uber Eats, and Postmates, depending on local restaurant participation.",
  },
  {
    q: "Can I order Waffle House online for pickup or takeout?",
    a: "Yes. Many Waffle House locations offer online ordering for pickup through third-party ordering portals or direct call-in orders. You can call your local restaurant directly to place a to-go order.",
  },
  {
    q: "Are menu prices the same for delivery as in-store?",
    a: "Third-party delivery platforms often charge slightly higher menu prices plus delivery fees, service fees, and driver tips. Dining in or ordering carryout directly from your local restaurant is typically the most economical option.",
  },
  {
    q: "What menu items travel best for delivery and takeout?",
    a: "Texas melts, hashbrown bowls, burgers, grilled sandwiches, and sausage biscuits travel exceptionally well. Waffles and crispy hashbrowns are best enjoyed immediately or reheated briefly in a toaster or oven.",
  },
  {
    q: "Is Waffle House delivery available 24 hours a day?",
    a: "While most Waffle House restaurants are open 24 hours for dine-in, third-party delivery availability depends on active delivery drivers in your area and individual restaurant order settings.",
  },
  {
    q: "How can I confirm if my local Waffle House offers takeout or delivery?",
    a: "Use our Locations directory to find your nearest Waffle House restaurant, view its address and direct phone number, and call the counter directly to verify current ordering options.",
  },
];

export const Route = createFileRoute("/delivery")({
  head: () => {
    const url = `${SITE}/delivery`;
    const title = "Waffle House Delivery & Ordering Information | Carryout Guide";
    const description =
      "Learn how Waffle House delivery, pickup and to-go ordering works. Find third-party delivery availability, takeout ordering tips, prices, and restaurant locations.";
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
              { "@type": "ListItem", position: 2, name: "Delivery", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Waffle House Delivery & Ordering Information",
            url,
            description,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: deliveryFaqs.map((faq) => ({
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
  component: DeliveryPage,
});

function DeliveryPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white text-foreground font-sans">
      {/* Breadcrumb Header */}
      <div className="border-b border-border bg-surface py-3">
        <div className="container-editorial">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-ink-soft">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-foreground">Delivery</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white py-16 md:py-24">
        <div className="absolute inset-0 -z-10 opacity-30">
          <img src={hero5} alt="Waffle House Diner" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="container-editorial relative z-10">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block rounded-full bg-primary px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
              Ordering &amp; Takeout Guide
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
              Waffle House Delivery
            </h1>
            <p className="text-lg leading-relaxed text-white/85 max-w-2xl">
              Understand how delivery, takeout, and to-go ordering work across Waffle House restaurants, including third-party delivery options, call-in ordering tips, and location availability.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/locations" className="btn-primary">
                Find a Restaurant Near You <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/menu"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Browse Menu &amp; Prices
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1. How Ordering Works */}
      <section aria-labelledby="how-works-heading" className="py-16 md:py-20 border-b border-border bg-white">
        <div className="container-editorial max-w-4xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="chip">Ordering Process</span>
            <h2 id="how-works-heading" className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              How Waffle House Ordering Works
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed">
              While Waffle House is famous as a sit-down diner experience, customers have multiple ways to enjoy meals off-premises.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">1. Third-Party Delivery</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Many locations are available on delivery apps including DoorDash and Uber Eats. Enter your address in the respective app to see if a nearby store is participating.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">2. Call-In Carryout</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Call your local restaurant directly by phone to place a customized to-go order. Pick up your hot meal directly from the counter when it is ready.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-xs space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Utensils className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">3. Counter Walk-In</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Walk into any open Waffle House 24/7, place your to-go order with the grill operator or server, and watch your food cooked fresh before your eyes in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Delivery Availability & Truthful Notice */}
      <section className="py-16 md:py-20 border-b border-border bg-surface">
        <div className="container-editorial max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="chip">Important Availability Notice</span>
              <h2 className="font-display text-2xl font-bold sm:text-3xl text-foreground">
                Delivery Availability Varies by Location
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                Waffle House operates primarily as a brick-and-mortar diner emphasizing fresh, immediate counter-service cooking. Because each restaurant is operated independently or by designated franchise groups, third-party delivery availability is not universal across all 2,100+ stores.
              </p>
              <p className="text-sm text-ink-soft leading-relaxed">
                Additionally, third-party delivery apps manage their own service radii, driver availability, and delivery fees. If delivery is not available in your area, placing a phone order for pickup is always a reliable option.
              </p>
              <div className="pt-2">
                <Link to="/locations" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                  Browse Location Directory <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 overflow-hidden rounded-2xl border border-border shadow-xs">
              <img
                src={hero6}
                alt="Waffle House open kitchen cooking fresh orders"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Takeout & Travel Friendly Menu Suggestions */}
      <section className="py-16 md:py-20 border-b border-border bg-white">
        <div className="container-editorial max-w-4xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="chip">Menu Recommendations</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Best Waffle House Items for Takeout
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed">
              Certain griddled items hold their heat and texture particularly well during transit.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Texas Angus Patty Melt", reason: "Thick Texas toast and melted cheese stay warm and delicious." },
              { name: "Hashbrown Bowls", reason: "Layered bowls with eggs, cheese, and meats retain heat exceptionally well." },
              { name: "Grilled Biscuits", reason: "Warm Southern buttermilk biscuits packed with bacon, sausage, or ham." },
              { name: "All-Star Special™", reason: "A complete breakfast packed securely with syrup and condiments on the side." },
            ].map((item) => (
              <div key={item.name} className="rounded-2xl border border-border bg-surface p-5 shadow-xs space-y-2">
                <h3 className="font-display text-base font-bold text-foreground">{item.name}</h3>
                <p className="text-xs text-ink-soft leading-relaxed">{item.reason}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/menu" className="btn-primary">
              View Complete Menu &amp; Prices <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section aria-labelledby="delivery-faq-heading" className="py-16 md:py-20 border-b border-border bg-surface">
        <div className="container-editorial max-w-3xl">
          <div className="text-center mb-10 space-y-3">
            <span className="chip">FAQ</span>
            <h2 id="delivery-faq-heading" className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Waffle House Delivery &amp; Takeout FAQs
            </h2>
            <p className="text-sm text-ink-soft">
              Clear answers regarding ordering, pickup, and delivery availability.
            </p>
          </div>

          <div className="space-y-3">
            {deliveryFaqs.map((faq, i) => {
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

      {/* 5. Trust & Disclaimer Section */}
      <section className="py-12 border-b border-border bg-white text-center">
        <div className="container-editorial max-w-3xl space-y-3">
          <span className="chip">Editorial Information</span>
          <p className="text-xs text-ink-soft leading-relaxed">
            This is an independent informational guide. We do not provide ordering fulfillment or accept payments directly. Delivery availability and third-party partnerships are subject to change by individual restaurant operators.
          </p>
          <div className="flex justify-center gap-4 text-xs font-bold uppercase tracking-wider text-primary pt-1">
            <Link to="/locations" className="hover:underline">Find Local Store</Link>
            <span>•</span>
            <Link to="/contact" className="hover:underline">Contact Guide</Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <SubscriberSection idPrefix="delivery-sub" />
    </div>
  );
}
