import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  HeartHandshake,
  Search,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  FileText,
  MapPin,
  Clock,
  Award,
} from "lucide-react";
import { useState } from "react";
import aboutHero from "@/assets/about-hero-griddle.jpg";
import { SubscriberSection } from "@/components/SubscriberSection";
import subscribeBg from "@/assets/about-subscribe-bg.jpg";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/about")({
  head: () => {
    const url = `${SITE}/about`;
    const title = "About Waffle House & This Independent Menu Guide";
    const description =
      "Learn about the history of Waffle House since 1955 and how this independent menu reference guide organizes menu prices, calories, nutrition and location data.";
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
              { "@type": "ListItem", position: 2, name: "About", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About This Waffle House Menu Guide",
            url,
            description: "Information about our independent Waffle House menu and nutrition reference guide.",
          }),
        },
      ],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Is this the official Waffle House website?",
      a: "No. This is an independent informational reference guide covering Waffle House menu items, prices, and nutrition. We are not affiliated with, endorsed by, or operated by Waffle House, Inc.",
    },
    {
      q: "When was Waffle House founded?",
      a: "The first Waffle House opened on Labor Day in 1955 in Avondale Estates, Georgia, founded by neighbors Joe Rogers Sr. and Tom Forkner.",
    },
    {
      q: "What is the Waffle House Index?",
      a: "The Waffle House Index is an informal disaster-readiness metric used by FEMA officials to gauge the severity of storms and power outages based on whether local Waffle House locations remain open or operate on limited menus.",
    },
    {
      q: "Where does your menu information come from?",
      a: "Our menu details and calorie values are organized from publicly available restaurant resources, menu boards, and FDA-compliant nutrition documents.",
    },
    {
      q: "How can I submit a menu correction or update?",
      a: "If you notice an updated price, a new item, or an inaccurate location detail, please submit a note via our contact page for our editorial review.",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* 1. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="bg-surface py-3 border-b border-border font-sans">
        <div className="container-editorial flex items-center gap-2 text-xs font-medium text-ink-soft">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="text-foreground">About</span>
        </div>
      </nav>

      {/* 2. HERO / INTRODUCTION SECTION */}
      <section className="relative isolate overflow-hidden font-sans">
        <img
          src={aboutHero}
          alt="Fresh golden waffles cooking on a hot waffle iron in an American diner kitchen"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/80" aria-hidden />
        <div className="container-editorial relative py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
              About Guide &amp; History
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
              About Waffle House &amp; This Menu Guide
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              Discover the history and dining tradition of Waffle House since 1955, and learn how this independent menu reference guide organizes dishes, pricing estimates, calories, and restaurant locations for diners nationwide.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/menu" className="btn-primary">
                Explore Menu <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/nutrition"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Nutrition Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 1: ABOUT WAFFLE HOUSE (FACTUAL HISTORICAL OVERVIEW)   */}
      {/* ============================================================ */}
      <section className="bg-white py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-4xl space-y-12">
          <div>
            <span className="chip">Restaurant History</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl text-foreground">
              The Story of Waffle House (1955–Present)
            </h2>
            <p className="mt-3 text-base text-ink-soft leading-relaxed">
              Founded on Labor Day in 1955 in Avondale Estates, Georgia, Waffle House was created by two neighbors — Joe Rogers Sr. and Tom Forkner — who wanted to combine fast-food speed with 24-hour sit-down diner hospitality.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary font-bold text-lg">1955</span>
                <h3 className="font-display text-lg font-bold text-foreground">Founding &amp; Vision</h3>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">
                The founders envisioned a restaurant focused on people and friendly service. The name was chosen because waffles were the most profitable item on the 16-item opening menu, establishing an American breakfast icon.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary font-bold text-lg">24/7</span>
                <h3 className="font-display text-lg font-bold text-foreground">Open Every Hour</h3>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">
                Known for its open-kitchen flat-top grills, yellow block-letter sign, and 24/7/365 schedule, Waffle House grew across the South and Midwest into over 2,100 diner locations in 25 states.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary font-bold text-lg">Index</span>
                <h3 className="font-display text-lg font-bold text-foreground">The Waffle House Index</h3>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">
                Due to the chain's renowned disaster resilience, the Federal Emergency Management Agency (FEMA) informally references the "Waffle House Index" (Green, Yellow, Red) to evaluate local community recovery post-storm.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary font-bold text-lg">Call</span>
                <h3 className="font-display text-lg font-bold text-foreground">Diner Jargon &amp; Tradition</h3>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">
                From "scattered, smothered, covered, and chunked" hashbrowns to the famous acoustic jukebox records, Waffle House maintains an enduring cultural footprint in American culinary history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2: ABOUT THIS WEBSITE (INDEPENDENT REFERENCE RESOURCE) */}
      {/* ============================================================ */}
      <section className="bg-surface py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-4xl space-y-12">
          <div>
            <span className="chip">Independent Publication</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl text-foreground">
              About This Reference Website
            </h2>
            <p className="mt-3 text-base text-ink-soft leading-relaxed">
              This website was built as an independent informational reference platform to organize the Waffle House menu, estimated prices, nutritional facts, and restaurant location directories into an accessible, structured guide.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-3">
              <Search className="h-6 w-6 text-primary" />
              <h3 className="font-display text-base font-bold text-foreground">74 Menu Items</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Organized across 13 core categories including sweet cream waffles, hashbrowns, and Toddle House omelets.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-3">
              <Sparkles className="h-6 w-6 text-primary" />
              <h3 className="font-display text-base font-bold text-foreground">Pricing Estimates</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Reference prices compiled for planning, cross-referenced with local diner counter menus.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-3">
              <HeartHandshake className="h-6 w-6 text-primary" />
              <h3 className="font-display text-base font-bold text-foreground">Nutrition &amp; Calories</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Full calorie counts, macro tables, and allergen warnings based on official public records.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-3">
              <MapPin className="h-6 w-6 text-primary" />
              <h3 className="font-display text-base font-bold text-foreground">2,100+ Locations</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Directory of restaurant locations with street addresses, phone numbers, and state guides.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-3">
              <BookOpen className="h-6 w-6 text-primary" />
              <h3 className="font-display text-base font-bold text-foreground">Menu Guides</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Practical ordering guides, price breakdowns, and breakfast nutrition analyses.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 shadow-xs space-y-3">
              <FileText className="h-6 w-6 text-primary" />
              <h3 className="font-display text-base font-bold text-foreground">Printable PDF</h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Downloadable reference PDF covering full diner nutrition and menu categories.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-8 text-center space-y-4 shadow-xs">
            <ShieldCheck className="h-8 w-8 text-primary mx-auto" />
            <h3 className="font-display text-xl font-bold text-foreground">Independent Disclosure</h3>
            <p className="text-sm text-ink-soft max-w-2xl mx-auto leading-relaxed">
              We are an independent informational publication. We are not affiliated with, endorsed by, or operated by Waffle House, Inc. All trademarks and brand names belong to their respective owners.
            </p>
            <div className="pt-2">
              <Link to="/methodology" className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                Read Our Methodology →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUND AN ERROR / CORRECTIONS */}
      <section className="bg-white py-16 md:py-20 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl text-center space-y-4">
          <span className="chip">Corrections</span>
          <h2 className="font-display text-3xl font-bold text-foreground">Help Us Keep Data Accurate</h2>
          <p className="text-base text-ink-soft leading-relaxed">
            Menu prices and availability can change. If you notice a pricing difference or an outdated address, please submit a correction for our editorial team to review.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full border border-primary bg-white px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Submit a Correction <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section aria-labelledby="about-faq-heading" className="bg-surface py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl">
          <h2 id="about-faq-heading" className="font-display text-3xl font-bold text-foreground text-center">
            About This Website — FAQ
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq, i) => {
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

      {/* 5. SUBSCRIBE */}
      <SubscriberSection bgImage={subscribeBg} idPrefix="about-sub" />
    </div>
  );
}
