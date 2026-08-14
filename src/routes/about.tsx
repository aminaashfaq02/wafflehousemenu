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
} from "lucide-react";
import { useState } from "react";
import aboutHero from "@/assets/about-hero-griddle.jpg";
import { SubscriberSection } from "@/components/SubscriberSection";
import subscribeBg from "@/assets/about-subscribe-bg.jpg";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/about")({
  head: () => {
    const url = `${SITE}/about`;
    const title = "About This Waffle House Menu Guide | Our Editorial Approach";
    const description =
      "Learn about this independent Waffle House menu guide, how menu and nutrition information is organized, and how we work to keep restaurant information useful and up to date.";
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
      a: "No. This is an independent informational guide covering Waffle House menu items, prices, and nutrition. We are not affiliated with, endorsed by, or operated by Waffle House, Inc.",
    },
    {
      q: "Where does the menu information come from?",
      a: "Our menu details are organized from publicly available restaurant resources, menu boards, and printed menus, cross-checked for consistency.",
    },
    {
      q: "Can Waffle House prices vary by location?",
      a: "Yes. Waffle House restaurants are franchised, and individual locations set their pricing based on regional food costs, labor, and overhead.",
    },
    {
      q: "How often is the information updated?",
      a: "We review and update menu details, pricing estimates, and location directories regularly when reliable new source details become available.",
    },
    {
      q: "How can I report an incorrect menu detail?",
      a: "If you find a typo, outdated price, or inaccurate location detail, please visit our contact page and submit a correction form for review.",
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70" aria-hidden />
        <div className="container-editorial relative py-20 md:py-28">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
              About Guide
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
              About This Waffle House Menu Guide
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
              This website is an independent informational guide created to make Waffle House menu, pricing, nutrition and restaurant information easier to browse. Our goal is to organize useful information into clear menu categories, guides and location resources so visitors can find what they need quickly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/menu" className="btn-primary">
                Explore Menu <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/blog"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Menu Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT YOU'LL FIND ON THIS WEBSITE */}
      <section className="bg-surface py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial">
          <div className="mx-auto max-w-2xl text-center space-y-3">
            <span className="chip">Features</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              What You'll Find on This Website
            </h2>
            <p className="text-base text-ink-soft">
              Explore the core sections of our independent information platform.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Menu */}
            <article className="group flex flex-col justify-between rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Search className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">Waffle House Menu</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  Browse 74 menu items across 13 menu categories.
                </p>
              </div>
              <Link
                to="/menu"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
              >
                View Menu <ArrowRight className="h-3 w-3" />
              </Link>
            </article>

            {/* Card 2: Prices */}
            <article className="group flex flex-col justify-between rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">Menu Prices</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  Review available menu pricing information and understand that prices may vary by location.
                </p>
              </div>
              <Link
                to="/menu"
                hash="prices-heading"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
              >
                View Prices <ArrowRight className="h-3 w-3" />
              </Link>
            </article>

            {/* Card 3: Nutrition */}
            <article className="group flex flex-col justify-between rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <HeartHandshake className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">Nutrition &amp; Calories</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  Explore available calorie and nutrition information.
                </p>
              </div>
              <Link
                to="/nutrition"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
              >
                View Nutrition <ArrowRight className="h-3 w-3" />
              </Link>
            </article>

            {/* Card 4: Locations */}
            <article className="group flex flex-col justify-between rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">Restaurant Locations</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  Browse location information by state and city.
                </p>
              </div>
              <Link
                to="/locations"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
              >
                View Locations <ArrowRight className="h-3 w-3" />
              </Link>
            </article>

            {/* Card 5: Guides */}
            <article className="group flex flex-col justify-between rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">Menu Guides</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  Read practical guides about menu items, prices, nutrition and restaurant information.
                </p>
              </div>
              <Link
                to="/blog"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
              >
                Read Guides <ArrowRight className="h-3 w-3" />
              </Link>
            </article>

            {/* Card 6: PDF */}
            <article className="group flex flex-col justify-between rounded-2xl border border-border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">Menu PDF</h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  Use a convenient printable menu reference.
                </p>
              </div>
              <a
                href="/waffle-house-menu-nutritionals.pdf"
                download
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
              >
                Download PDF <ArrowRight className="h-3 w-3" />
              </a>
            </article>
          </div>
        </div>
      </section>

      {/* 4. OUR EDITORIAL APPROACH */}
      <section className="bg-white py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl">
          <span className="chip">Standards</span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl text-foreground">
            Our Editorial Approach
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
            <p>
              We focus on making restaurant information easier to understand and navigate. Menu items are organized by category, while related pages provide additional context about prices, nutrition, locations and common menu questions.
            </p>
            <p>
              Information is reviewed and updated when reliable sources provide new or corrected details.
            </p>
          </div>
        </div>
      </section>

      {/* 5. HOW WE RESEARCH MENU INFORMATION */}
      <section className="bg-surface py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial">
          <div className="mx-auto max-w-2xl text-center space-y-3">
            <span className="chip">Research</span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              How We Research Menu Information
            </h2>
            <p className="text-base text-ink-soft">
              Transparent sources and research process behind our guides.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-display text-base font-bold text-foreground">Menu Information</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                Menu details are organized from reliable publicly available restaurant information and reviewed for consistency across the website.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-display text-base font-bold text-foreground">Pricing</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                Prices are presented as reference information and may vary by restaurant location.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-display text-base font-bold text-foreground">Nutrition</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                Nutrition information is included when reliable information is available.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
              <h3 className="font-display text-base font-bold text-foreground">Locations</h3>
              <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                Restaurant location information is organized by state and city using reliable location data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HOW WE KEEP INFORMATION UPDATED */}
      <section className="bg-white py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl">
          <span className="chip">Updates</span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl text-foreground">
            How We Keep Information Updated
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
            <p>
              Menu information, pricing averages, restaurant locations, hours, and nutrition data can change over time. We regularly review active pages when reliable sources publish new details.
            </p>
            <p className="text-sm font-semibold text-primary font-sans">
              Last reviewed: August 2026
            </p>
          </div>
        </div>
      </section>

      {/* 7. WAFFLE HOUSE MENU COVERAGE */}
      <section className="bg-surface py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl text-center space-y-6">
          <span className="chip">Menu Coverage</span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">
            Waffle House Menu Coverage
          </h2>
          <p className="text-base text-ink-soft leading-relaxed">
            The current website organizes 74 menu items across 13 menu categories. The menu hub provides a central starting point, while individual category pages make it easier to explore specific parts of the menu.
          </p>
          <div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-sm hover:bg-[#E2B000]"
            >
              Explore the Waffle House Menu <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. INDEPENDENT WEBSITE DISCLOSURE */}
      <section className="bg-white py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl">
          <div className="rounded-2xl border border-black/5 bg-surface p-8 text-center space-y-4 shadow-sm">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground">Independent Website</h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              This website is an independent informational resource and is not affiliated with, endorsed by or sponsored by Waffle House, Inc. Waffle House and related trademarks belong to their respective owner. Menu items, prices, nutrition information, restaurant hours and availability may vary by location and change over time.
            </p>
          </div>
        </div>
      </section>

      {/* 9. FOUND AN ERROR? */}
      <section className="bg-surface py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl text-center space-y-4">
          <span className="chip">Corrections</span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl text-foreground">Found an Error?</h2>
          <p className="text-base text-ink-soft leading-relaxed">
            Menu information can change, and occasional corrections may be necessary. If you notice an incorrect menu detail, price, nutrition value or location detail, please contact us with the relevant information so it can be reviewed.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 rounded-full border border-primary bg-white px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground transition-all animate-none"
            >
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section aria-labelledby="about-faq-heading" className="bg-white py-16 md:py-24 border-b border-border font-sans">
        <div className="container-editorial max-w-3xl">
          <h2 id="about-faq-heading" className="font-display text-3xl font-bold text-foreground text-center">
            About This Website — FAQ
          </h2>
          <div className="mt-10 space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-border rounded-2xl overflow-hidden bg-white shadow-sm">
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

      {/* 11. SUBSCRIBE */}
      <SubscriberSection bgImage={subscribeBg} idPrefix="about-sub" />

      {/* 12. EXPLORE MORE */}
      <section className="bg-surface py-16 md:py-24 font-sans">
        <div className="container-editorial text-center space-y-6">
          <h2 className="font-display text-2xl font-bold text-foreground">Explore More</h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-semibold">
            <Link to="/menu" className="text-primary hover:underline">Waffle House Menu</Link>
            <span className="text-border">|</span>
            <Link to="/nutrition" className="text-primary hover:underline">Waffle House Nutrition</Link>
            <span className="text-border">|</span>
            <Link to="/locations" className="text-primary hover:underline">Waffle House Locations</Link>
            <span className="text-border">|</span>
            <Link to="/blog" className="text-primary hover:underline">Waffle House Menu Guides</Link>
            <span className="text-border">|</span>
            <a href="/waffle-house-menu-nutritionals.pdf" download className="text-primary hover:underline">Menu PDF</a>
            <span className="text-border">|</span>
            <Link to="/contact" className="text-primary hover:underline">Contact Us</Link>
          </div>
          <div className="mt-8 flex justify-center gap-6 text-xs text-ink-soft">
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline">Terms of Use</Link>
            <Link to="/disclaimer" className="hover:underline">Disclaimer</Link>
            <Link to="/editorial-policy" className="hover:underline">Editorial Policy</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
