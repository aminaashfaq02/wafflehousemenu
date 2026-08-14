import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck, FileText, RefreshCw, Mail, ArrowRight, ChevronRight, HelpCircle, Utensils, MapPin, HeartHandshake } from "lucide-react";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/methodology")({
  head: () => {
    const title = "Waffle House Menu Information Methodology | How We Update Content";
    const description =
      "Learn how this independent Waffle House information website organizes menu, prices, nutrition, locations and guide content and handles updates and corrections.";
    const url = `${SITE}/methodology`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
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
              { "@type": "ListItem", position: 2, name: "Methodology", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: title,
            url,
            description,
            inLanguage: "en-US",
          }),
        },
      ],
    };
  },
  component: MethodologyPage,
});

function MethodologyPage() {
  return (
    <main className="min-h-screen bg-background pb-20 font-sans text-foreground">
      {/* 1. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="bg-surface py-3 border-b border-border font-sans">
        <div className="container-editorial flex items-center gap-2 text-xs font-medium text-ink-soft">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="text-foreground">Methodology</span>
        </div>
      </nav>

      {/* 2. HERO / INTRODUCTION */}
      <header className="border-b border-border bg-surface py-12 sm:py-16 font-sans">
        <div className="container-editorial max-w-4xl space-y-4">
          <span className="chip">Editorial Standards</span>
          <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl text-foreground">
            How We Organize and Update Waffle House Information
          </h1>
          <p className="text-base text-ink-soft leading-relaxed max-w-3xl">
            This methodology document explains how our editorial team researches, structures, reviews, and updates Waffle House menu data, estimated prices, nutrition values, restaurant locations, and diner guides. We believe in transparency about our information sources, organizational processes, and the boundaries of what this independent guide does and does not claim.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-primary">
            <Link to="/menu" className="hover:underline">Explore Menu →</Link>
            <Link to="/nutrition" className="hover:underline">Nutrition Guide →</Link>
            <Link to="/locations" className="hover:underline">Locations Directory →</Link>
            <Link to="/about" className="hover:underline">About This Site →</Link>
          </div>
        </div>
      </header>

      {/* 3. MAIN CONTENT SECTIONS */}
      <div className="container-editorial max-w-4xl py-12 space-y-12 font-sans">
        {/* Section: Information Sources */}
        <section aria-labelledby="sources-heading" className="space-y-4">
          <h2 id="sources-heading" className="font-display text-2xl font-bold text-foreground">
            How We Gather Information
          </h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            Our data is gathered through multi-source research combining public diner menus, counter pricing observations across multiple states, verified nutritional disclosures published under FDA menu labeling standards, and direct customer feedback.
          </p>
          <div className="grid gap-4 sm:grid-cols-3 pt-2">
            <div className="rounded-xl border border-border bg-surface p-4">
              <FileText className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold text-sm text-foreground">Public Nutrition Records</h3>
              <p className="text-xs text-ink-soft mt-1">Cross-referenced against published diner nutritional and allergen guidelines.</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <CheckCircle2 className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold text-sm text-foreground">Counter Observations</h3>
              <p className="text-xs text-ink-soft mt-1">Compiled from sample diner menus to determine representative price averages.</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-4">
              <RefreshCw className="h-5 w-5 text-primary mb-2" />
              <h3 className="font-bold text-sm text-foreground">Editorial Reviews</h3>
              <p className="text-xs text-ink-soft mt-1">Regularly reviewed and refined when updated source documentation is available.</p>
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* Section: Menu Organization */}
        <section aria-labelledby="menu-org-heading" className="space-y-4">
          <h2 id="menu-org-heading" className="font-display text-2xl font-bold text-foreground">
            How Menu Information Is Organized
          </h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            Our menu database is organized into 13 canonical categories covering 74 distinct dishes and sides. Each category features an overview page linking to individual dish pages with ingredients, descriptions, calories, and prices. A printable PDF version is also provided for offline reference.
          </p>
          <div>
            <Link to="/menu" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
              Browse Complete Menu Hub <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        <hr className="border-border" />

        {/* Section: Prices */}
        <section aria-labelledby="prices-heading" className="space-y-4">
          <h2 id="prices-heading" className="font-display text-2xl font-bold text-foreground">
            Understanding Menu Prices
          </h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            Waffle House operates both corporate-owned and franchised restaurants across 25 states. Individual franchise owners have the autonomy to adjust menu prices based on local labor costs, rent, and ingredient supply chains. As a result, prices shown on this website represent estimated counter averages and should be confirmed directly with your local diner.
          </p>
        </section>

        <hr className="border-border" />

        {/* Section: Nutrition */}
        <section aria-labelledby="nutrition-heading" className="space-y-4">
          <h2 id="nutrition-heading" className="font-display text-2xl font-bold text-foreground">
            How Nutrition Information Is Presented
          </h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            Nutritional metrics — including total calories, protein, carbohydrates, total fat, and sodium — are compiled from standardized serving portions. Customizations (such as topping hashbrowns or ordering extra butter) will change total values. This information is intended for general reference and does not constitute medical or clinical dietary advice.
          </p>
          <div>
            <Link to="/nutrition" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
              View Nutrition Table <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        <hr className="border-border" />

        {/* Section: Locations */}
        <section aria-labelledby="locations-heading" className="space-y-4">
          <h2 id="locations-heading" className="font-display text-2xl font-bold text-foreground">
            How Location Information Is Organized
          </h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            Our location directory organizes over 2,100 diner locations hierarchically by state and city. Store entries list street addresses, operating hours, phone numbers, and direct mapping links where available.
          </p>
          <div>
            <Link to="/locations" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
              Browse Locations Directory <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        <hr className="border-border" />

        {/* Section: Content Updates */}
        <section aria-labelledby="updates-heading" className="space-y-4">
          <h2 id="updates-heading" className="font-display text-2xl font-bold text-foreground">
            How We Keep Information Current
          </h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            We conduct periodic editorial audits to review active menu categories, check for discontinued items, and update price averages when new sample menus are verified. We do not claim instant real-time synchronization, but rather deliberate, human-curated accuracy.
          </p>
        </section>

        <hr className="border-border" />

        {/* Section: Reporting Corrections */}
        <section aria-labelledby="corrections-heading" className="space-y-4">
          <h2 id="corrections-heading" className="font-display text-2xl font-bold text-foreground">
            Reporting an Error or Outdated Information
          </h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            We welcome feedback from diners, employees, and community members. If you spot a pricing difference, an outdated store address, or a broken link, please let us know so our editorial team can investigate and update our records.
          </p>
          <div>
            <Link to="/contact" className="btn-primary">
              Submit a Correction <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <hr className="border-border" />

        {/* Section: Independent Resource */}
        <section aria-labelledby="independent-heading" className="space-y-4">
          <h2 id="independent-heading" className="font-display text-2xl font-bold text-foreground">
            An Independent Information Resource
          </h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            This website is an independent digital publication created for informational and educational purposes. We are not owned by, affiliated with, endorsed by, or sponsored by Waffle House, Inc. All registered trademarks, logos, and service marks remain the property of their respective holders.
          </p>
        </section>

        <hr className="border-border" />

        {/* Section: Helpful Content Approach */}
        <section aria-labelledby="helpful-content-heading" className="space-y-4">
          <h2 id="helpful-content-heading" className="font-display text-2xl font-bold text-foreground">
            Our Approach to Helpful Content
          </h2>
          <p className="text-sm leading-relaxed text-ink-soft">
            Every guide, table, and article on this website is created to answer real reader questions. We prioritize clear typography, responsive layouts, factual explanations, and natural navigation over promotional filler or keyword manipulation.
          </p>
        </section>
      </div>
    </main>
  );
}
