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
  Utensils,
} from "lucide-react";
import { useState } from "react";
import aboutHero from "@/assets/about-hero-griddle.jpg";
import { SubscriberSection } from "@/components/SubscriberSection";
import subscribeBg from "@/assets/about-subscribe-bg.jpg";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/about")({
  head: () => {
    const url = `${SITE}/about`;
    const title = "About This Waffle House Menu & Information Website";
    const description =
      "Learn about this independent Waffle House menu information website, including its menu, nutrition, locations, guides, restaurant information and approach to organizing useful content.";
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
            name: "About Waffle House Menu",
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
      q: "What is this Waffle House menu website?",
      a: "This website is an independent digital reference resource created to organize Waffle House menu items, estimated pricing, nutritional details, restaurant locations, and diner ordering guides in an accessible format.",
    },
    {
      q: "Is this website affiliated with Waffle House?",
      a: "No. This website is independently published and is not affiliated with, endorsed by, or operated by Waffle House, Inc. All trademarks belong to their respective owners.",
    },
    {
      q: "Where can I find the Waffle House menu?",
      a: "You can explore all 13 categories and 74 dishes with estimated prices on our main Menu page.",
    },
    {
      q: "Where can I find nutrition information?",
      a: "Complete nutritional information, including calories, macros, and allergen warnings, is available on our dedicated Nutrition page.",
    },
    {
      q: "Where can I find restaurant locations?",
      a: "You can search over 2,100 diner locations across 25 states using our Locations directory.",
    },
    {
      q: "Can menu prices vary by location?",
      a: "Yes. Individual franchise locations may set slightly different prices based on regional food and operating costs. Displayed figures are informational counter averages.",
    },
    {
      q: "How is website information updated?",
      a: "We regularly review and cross-reference publicly available diner menus, official documentation, and visitor feedback to maintain accurate data.",
    },
  ];

  return (
    <main className="bg-background min-h-screen font-sans text-foreground">
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
          <div className="max-w-3xl space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
              About Guide
            </span>
            <h1 className="font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
              About Waffle House Menu
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              Welcome to our independent Waffle House information guide. Here you can explore menu items, estimated prices, calorie and nutrition breakdowns, restaurant location directories, and practical ordering guides designed for diners across the United States.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/menu" className="btn-primary">
                Explore Menu &amp; Prices <ArrowRight className="h-4 w-4" />
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

      {/* 3. WEBSITE PURPOSE */}
      <section className="bg-white py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-4xl space-y-6">
          <span className="chip">Our Mission</span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
            About This Website
          </h2>
          <p className="text-base text-ink-soft leading-relaxed">
            This website is an independent informational resource created to organize useful Waffle House-related information in an easy-to-browse format. Our mission is to provide diners, travelers, and food enthusiasts with a clean, structured reference covering all 13 menu categories, pricing estimates, full nutritional tables, 2,100+ restaurant locations, and helpful diner guides.
          </p>
        </div>
      </section>

      {/* 4. THE STORY OF WAFFLE HOUSE */}
      <section className="bg-surface py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-4xl space-y-10">
          <div>
            <span className="chip">Diner History</span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl text-foreground">
              The Story of Waffle House
            </h2>
            <p className="mt-3 text-base text-ink-soft leading-relaxed">
              Founded on Labor Day in 1955 in Avondale Estates, Georgia, Waffle House was created by two neighbors — Joe Rogers Sr. and Tom Forkner — who wanted to combine fast-food speed with 24-hour sit-down diner hospitality.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary font-bold text-lg">1955</span>
                <h3 className="font-display text-lg font-bold text-foreground">Avondale Estates Origins</h3>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">
                The founders envisioned a restaurant focused on people and friendly service. The name was chosen because waffles were the most profitable item on the original 16-item menu, establishing an enduring American breakfast icon.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary font-bold text-lg">24/7</span>
                <h3 className="font-display text-lg font-bold text-foreground">Always-Open Diner Tradition</h3>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">
                Known for open-kitchen flat-top grills, yellow block-letter sign, and 24/7/365 schedule, Waffle House grew across the South and Midwest into over 2,100 diner locations in 25 states.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary font-bold text-lg">FEMA</span>
                <h3 className="font-display text-lg font-bold text-foreground">The Waffle House Index</h3>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">
                Due to the chain's renowned disaster resilience, the Federal Emergency Management Agency (FEMA) informally references the "Waffle House Index" (Green, Yellow, Red) to evaluate local community recovery post-storm.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-white p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary font-bold text-lg">Call</span>
                <h3 className="font-display text-lg font-bold text-foreground">Diner Jargon &amp; Jukeboxes</h3>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">
                From "scattered, smothered, covered, and chunked" hashbrowns to the famous acoustic jukebox records, Waffle House maintains an iconic cultural footprint in American culinary history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT YOU'LL FIND ON THIS WEBSITE */}
      <section className="bg-white py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial">
          <div className="max-w-3xl space-y-3 mb-12">
            <span className="chip">Coverage</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              What You'll Find on This Website
            </h2>
            <p className="text-base text-ink-soft leading-relaxed">
              Explore the core informational sections across our independent reference platform.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Menu */}
            <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <Utensils className="h-6 w-6 text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground">Waffle House Menu &amp; Prices</h3>
                <p className="text-xs text-ink-soft leading-relaxed">
                  Browse 74 menu items across 13 menu categories with pricing estimates and recipe details.
                </p>
              </div>
              <Link to="/menu" className="mt-6 text-xs font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                View Menu Hub <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Card 2: Nutrition */}
            <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <HeartHandshake className="h-6 w-6 text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground">Waffle House Nutrition &amp; Calories</h3>
                <p className="text-xs text-ink-soft leading-relaxed">
                  Explore complete calorie counts, macronutrient breakdowns, and allergen disclosures.
                </p>
              </div>
              <Link to="/nutrition" className="mt-6 text-xs font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                View Nutrition <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Card 3: Locations */}
            <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <MapPin className="h-6 w-6 text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground">Waffle House Locations</h3>
                <p className="text-xs text-ink-soft leading-relaxed">
                  Directory of 2,100+ restaurant locations across 25 states with addresses and phone numbers.
                </p>
              </div>
              <Link to="/locations" className="mt-6 text-xs font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                Find Locations <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Card 4: Guides */}
            <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <BookOpen className="h-6 w-6 text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground">Waffle House Menu Guides &amp; Articles</h3>
                <p className="text-xs text-ink-soft leading-relaxed">
                  Practical editorial guides covering price comparisons, nutrition facts, and ordering advice.
                </p>
              </div>
              <Link to="/blog" className="mt-6 text-xs font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                Read Guides <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Card 5: PDF */}
            <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <FileText className="h-6 w-6 text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground">Menu PDF Reference</h3>
                <p className="text-xs text-ink-soft leading-relaxed">
                  Convenient printable document covering full diner nutrition and menu categories.
                </p>
              </div>
              <a href="/waffle-house-menu-nutritionals.pdf" download className="mt-6 text-xs font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                Download PDF <ArrowRight className="h-3 w-3" />
              </a>
            </div>

            {/* Card 6: Methodology */}
            <div className="rounded-2xl border border-border bg-surface p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <ClipboardCheck className="h-6 w-6 text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground">How We Update Information</h3>
                <p className="text-xs text-ink-soft leading-relaxed">
                  Learn about our research standards, data sources, and information review processes.
                </p>
              </div>
              <Link to="/methodology" className="mt-6 text-xs font-bold uppercase tracking-wider text-primary hover:underline inline-flex items-center gap-1">
                Read Methodology <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW WE ORGANIZE INFORMATION */}
      <section className="bg-surface py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-4xl space-y-6">
          <span className="chip">Architecture</span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
            How We Organize Waffle House Information
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-ink-soft">
            <p>
              Our website is structured into connected thematic hubs. Visitors can begin with the primary{" "}
              <Link to="/menu" className="text-primary font-semibold hover:underline">Waffle House Menu</Link>, explore individual dishes within the{" "}
              <Link to="/menu" className="text-primary font-semibold hover:underline">13 menu categories</Link>, cross-reference nutrient counts on the{" "}
              <Link to="/nutrition" className="text-primary font-semibold hover:underline">Nutrition Guide</Link>, browse nearby restaurants in the{" "}
              <Link to="/locations" className="text-primary font-semibold hover:underline">Locations Directory</Link>, and dive into detailed ordering analysis in our{" "}
              <Link to="/blog" className="text-primary font-semibold hover:underline">Menu Guides</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* 7. KEEPING INFORMATION USEFUL & ACCURATE */}
      <section className="bg-white py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-4xl space-y-6">
          <span className="chip">Accuracy</span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
            Keeping Information Useful and Accurate
          </h2>
          <p className="text-base text-ink-soft leading-relaxed">
            Menu items, pricing estimates, restaurant hours, and nutritional details can change over time. We review active pages when reliable public source documentation becomes available. If you notice a pricing difference or an outdated store listing, please submit a note via our{" "}
            <Link to="/contact" className="text-primary font-semibold hover:underline">Contact Page</Link>{" "}
            for editorial review.
          </p>
        </div>
      </section>

      {/* 8. AN INDEPENDENT INFORMATION RESOURCE */}
      <section className="bg-surface py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl text-center space-y-4">
          <ShieldCheck className="h-8 w-8 text-primary mx-auto" />
          <h2 className="font-display text-2xl font-bold text-foreground">
            An Independent Waffle House Information Resource
          </h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            This website is an independent informational resource and is not affiliated with, sponsored by, or operated by Waffle House, Inc. All trademarks and brand names belong to their respective owners.
          </p>
        </div>
      </section>

      {/* 9. ABOUT FAQ */}
      <section aria-labelledby="about-faq-heading" className="bg-white py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl">
          <h2 id="about-faq-heading" className="font-display text-3xl font-bold text-foreground text-center mb-10">
            About This Waffle House Menu Website — FAQ
          </h2>
          <div className="space-y-3">
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

      {/* NEWSLETTER */}
      <SubscriberSection bgImage={subscribeBg} idPrefix="about-sub" />
    </main>
  );
}
