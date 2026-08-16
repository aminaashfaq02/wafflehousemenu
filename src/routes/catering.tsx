import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  HelpCircle,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
  Users,
  Utensils,
} from "lucide-react";
import { useState } from "react";
import hero5 from "@/assets/hero-5-diner.jpg";
import hero6 from "@/assets/hero-6-kitchen.jpg";
import contactHeroDiner from "@/assets/contact-hero-diner.jpg";
import { SubscriberSection } from "@/components/SubscriberSection";

const SITE = "https://wafflehousemenu.com";

const cateringFaqs = [
  {
    q: "Does Waffle House offer catering for large groups and events?",
    a: "Yes! Many Waffle House locations provide bulk carryout catering for office breakfasts, family gatherings, tailgates, and sports teams. In select geographic markets, Waffle House also operates mobile Food Trucks available for private events and weddings.",
  },
  {
    q: "How far in advance should I place a large group order?",
    a: "For large takeout orders (15+ meals), it is recommended to contact your local restaurant manager at least 24 to 48 hours in advance so the kitchen team can prepare fresh ingredients and schedule grill capacity.",
  },
  {
    q: "What food options are popular for Waffle House group catering?",
    a: "Popular group choices include bulk scrambled eggs, large pans of hashbrowns with customized toppings, bacon and sausage platters, stacks of fresh biscuits, and individual classic golden waffles with warm syrup.",
  },
  {
    q: "Are there official Waffle House Food Trucks for events?",
    a: "Yes. Waffle House operates official catering Food Trucks in select regions (primarily across the Southeast). Food truck reservations require advance booking, a deposit, and minimum guest or spend requirements.",
  },
  {
    q: "How do I request catering or a large group order?",
    a: "To request a large group order, call your local Waffle House restaurant directly and speak with the store manager. For mobile food truck inquiries, check the official Waffle House catering portal.",
  },
  {
    q: "Does Waffle House provide plates, utensils, and condiments with catering?",
    a: "Yes. Large carryout and group orders typically include disposable plates, cutlery, napkins, butter, jelly, and syrup packets upon request.",
  },
];

export const Route = createFileRoute("/catering")({
  head: () => {
    const url = `${SITE}/catering`;
    const title = "Waffle House Catering Information & Guide | Group Orders";
    const description =
      "Explore Waffle House catering and group ordering information. Find food options for events, breakfast bars, food truck details, planning tips, and local restaurant contact guidance.";
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
              { "@type": "ListItem", position: 2, name: "Catering", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Waffle House Catering Information & Guide",
            url,
            description,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: cateringFaqs.map((faq) => ({
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
  component: CateringPage,
});

function CateringPage() {
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
            <span className="font-semibold text-foreground">Catering</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-black text-white py-16 md:py-24">
        <div className="absolute inset-0 -z-10 opacity-30">
          <img src={contactHeroDiner} alt="Waffle House Diner" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="container-editorial relative z-10">
          <div className="max-w-3xl space-y-5">
            <span className="inline-block rounded-full bg-primary px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
              Group &amp; Event Planning
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white leading-tight">
              Waffle House Catering
            </h1>
            <p className="text-lg leading-relaxed text-white/85 max-w-2xl">
              Discover how to organize Waffle House meals for office breakfasts, private gatherings, tailgates, and special events — from large bulk takeout orders to official food truck catering.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/locations" className="btn-primary">
                Find Local Store to Call <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/menu"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Explore Menu Items
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Catering Options Overview */}
      <section aria-labelledby="catering-options-heading" className="py-16 md:py-20 border-b border-border bg-white">
        <div className="container-editorial max-w-4xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="chip">Service Formats</span>
            <h2 id="catering-options-heading" className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Waffle House Catering Formats
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed">
              Explore the primary ways to bring fresh Waffle House diner food to your next event.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-8 shadow-xs space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Utensils className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">Bulk Store Takeout Orders</h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                Coordinate directly with your local restaurant manager to prepare large platters of eggs, hashbrowns, breakfast meats, biscuits, and waffles boxed for pickup. Ideal for meetings, team events, and family parties.
              </p>
              <ul className="space-y-1.5 text-xs text-ink-soft pt-2">
                <li className="flex items-center gap-2 font-medium">✓ Available at most locations nationwide</li>
                <li className="flex items-center gap-2 font-medium">✓ 24–48 hours advance notice recommended</li>
                <li className="flex items-center gap-2 font-medium">✓ Packaged warm with condiments and cutlery</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-8 shadow-xs space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">Official Mobile Food Trucks</h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                In select Southeastern markets, official Waffle House Food Trucks can be booked for weddings, corporate festivals, and late-night party service, cooking fresh waffles on-site.
              </p>
              <ul className="space-y-1.5 text-xs text-ink-soft pt-2">
                <li className="flex items-center gap-2 font-medium">✓ Full on-site griddle cooking experience</li>
                <li className="flex items-center gap-2 font-medium">✓ Subject to regional booking availability</li>
                <li className="flex items-center gap-2 font-medium">✓ Deposit and event minimums apply</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Menu Ideas for Groups */}
      <section className="py-16 md:py-20 border-b border-border bg-surface">
        <div className="container-editorial max-w-4xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="chip">Menu Selection</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Popular Food Options for Groups
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed">
              When planning a group breakfast or diner meal, consider building a crowd-pleasing spread.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">The Classic Bar</span>
              <h3 className="font-display text-lg font-bold text-foreground">Waffle &amp; Egg Spread</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Individual sweet cream waffles paired with large trays of scrambled eggs, crispy bacon strips, and savory sausage patties.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Signature Sides</span>
              <h3 className="font-display text-lg font-bold text-foreground">Custom Hashbrown Trays</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Bulk portions of golden scattered hashbrowns with melted cheese (Covered), grilled onions (Smothered), and diced ham (Chunked).
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">Handhelds</span>
              <h3 className="font-display text-lg font-bold text-foreground">Biscuit &amp; Melt Platters</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                An assortment of warm buttermilk breakfast biscuits and Texas sausage melts cut and ready for quick grab-and-go service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Planning Tips & Advance Coordination */}
      <section className="py-16 md:py-20 border-b border-border bg-white">
        <div className="container-editorial max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="chip">Coordination Guide</span>
              <h2 className="font-display text-2xl font-bold sm:text-3xl text-foreground">
                How to Plan Your Group Order
              </h2>
              <p className="text-sm text-ink-soft leading-relaxed">
                Because Waffle House cooklines are organized for high-speed short-order dining, placing a phone call to the store manager well ahead of peak rush hours ensures your food is prepared fresh and packaged precisely on schedule.
              </p>
              <div className="space-y-2 text-xs text-ink-soft pt-1">
                <p><strong>Step 1:</strong> Determine your group size and dietary preferences (e.g., vegetarian omelets, allergen needs).</p>
                <p><strong>Step 2:</strong> Look up your closest restaurant in our <Link to="/locations" className="text-primary font-semibold hover:underline">Locations directory</Link>.</p>
                <p><strong>Step 3:</strong> Call during a non-peak hour (such as 2:00 PM – 4:00 PM) to confirm item availability, pickup time, and pricing.</p>
              </div>
              <div className="pt-2">
                <Link to="/contact" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                  Contact Our Editorial Guide <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 overflow-hidden rounded-2xl border border-border shadow-xs">
              <img
                src={hero5}
                alt="Waffle House diner exterior"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section aria-labelledby="catering-faq-heading" className="py-16 md:py-20 border-b border-border bg-surface">
        <div className="container-editorial max-w-3xl">
          <div className="text-center mb-10 space-y-3">
            <span className="chip">FAQ</span>
            <h2 id="catering-faq-heading" className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Waffle House Catering FAQs
            </h2>
            <p className="text-sm text-ink-soft">
              Factual answers regarding group ordering, bulk pickups, and food trucks.
            </p>
          </div>

          <div className="space-y-3">
            {cateringFaqs.map((faq, i) => {
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
          <span className="chip">Independent Resource</span>
          <p className="text-xs text-ink-soft leading-relaxed">
            This guide is an independent reference. We do not process catering invoices or take reservations on behalf of Waffle House, Inc. Please contact your local restaurant or official channels directly for commercial agreements.
          </p>
          <div className="flex justify-center gap-4 text-xs font-bold uppercase tracking-wider text-primary pt-1">
            <Link to="/menu" className="hover:underline">Browse Menu</Link>
            <span>•</span>
            <Link to="/locations" className="hover:underline">Find Local Phone Numbers</Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <SubscriberSection idPrefix="catering-sub" />
    </div>
  );
}
