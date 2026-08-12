import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck, FileText, RefreshCw, Mail, ArrowRight } from "lucide-react";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/methodology")({
  head: () => {
    const title = "Editorial Methodology & Data Sourcing — Waffle House Menu Guide";
    const description =
      "Learn how we research, compile, fact-check, and update Waffle House menu prices, calorie counts, and allergen data.";
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
    <article className="min-h-screen bg-background pb-20">
      {/* Hero Header */}
      <header className="border-b border-border bg-surface py-12 sm:py-16">
        <div className="container-editorial max-w-4xl">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-ink-soft">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="px-2">/</span>
            <span aria-current="page">Editorial Methodology</span>
          </nav>
          <div className="mt-4 flex items-center gap-2">
            <span className="chip">EEAT & Trust Standard</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Fact-Checked July 2026
            </span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Editorial Methodology & Data Sourcing
          </h1>
          <p className="mt-4 text-lg text-ink-soft">
            How we research, verify, compile, and maintain accurate Waffle House menu prices, nutrition information, and allergen records.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-editorial max-w-4xl py-12">
        <div className="space-y-12">
          {/* Section 1: Overview */}
          <section aria-labelledby="overview-heading" className="space-y-4">
            <h2 id="overview-heading" className="font-display text-2xl font-semibold text-foreground">
              1. Our Data Standard & Independence
            </h2>
            <p className="leading-relaxed text-foreground/80">
              <strong>Waffle House Menu Guide</strong> operates as an independent editorial research publication. We are not affiliated with, endorsed by, or sponsored by Waffle House, Inc.
            </p>
            <p className="leading-relaxed text-foreground/80">
              Our mission is to provide restaurant diners, health-conscious consumers, and researchers with clean, structured, and accurate menu references — including prices, calorie counts, macronutrient breakdowns, and allergen warnings.
            </p>
          </section>

          <div className="rule-editorial" />

          {/* Section 2: 3-Pillar Sourcing */}
          <section aria-labelledby="sourcing-heading" className="space-y-6">
            <h2 id="sourcing-heading" className="font-display text-2xl font-semibold text-foreground">
              2. How We Source Our Information
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-surface p-5">
                <FileText className="h-8 w-8 text-primary" aria-hidden />
                <h3 className="mt-3 font-display text-lg font-semibold">Official PDF Records</h3>
                <p className="mt-2 text-sm text-ink-soft">
                  We cross-reference official Waffle House Nutrition & Allergen documentation (v20.2) published under FDA Menu Labeling compliance laws.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5">
                <CheckCircle2 className="h-8 w-8 text-primary" aria-hidden />
                <h3 className="mt-3 font-display text-lg font-semibold">Counter Verification</h3>
                <p className="mt-2 text-sm text-ink-soft">
                  Our editorial staff verifies live prices directly at Waffle House diners across multiple U.S. states to establish accurate regional price averages.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5">
                <RefreshCw className="h-8 w-8 text-primary" aria-hidden />
                <h3 className="mt-3 font-display text-lg font-semibold">Monthly Audits</h3>
                <p className="mt-2 text-sm text-ink-soft">
                  All menu data, calorie figures, ingredients, and allergen tags undergo a comprehensive monthly editorial review cycle.
                </p>
              </div>
            </div>
          </section>

          <div className="rule-editorial" />

          {/* Section 3: Nutritional Accuracy */}
          <section aria-labelledby="nutrition-heading" className="space-y-4">
            <h2 id="nutrition-heading" className="font-display text-2xl font-semibold text-foreground">
              3. Calorie & Nutritional Guidelines
            </h2>
            <p className="leading-relaxed text-foreground/80">
              In accordance with FDA guidelines, general nutrition advice recommends 2,000 calories a day, though individual calorie needs vary.
            </p>
            <ul className="list-disc space-y-2 pl-6 text-foreground/80">
              <li>
                <strong>Base Servings:</strong> Calorie calculations reflect standardized portion sizes as prepared according to master recipe specifications.
              </li>
              <li>
                <strong>Customizations:</strong> Adding toppings (e.g., cheese +50 cal, bacon +140 cal, smothering onions +15 cal) alters total calories and sodium levels.
              </li>
              <li>
                <strong>Allergens:</strong> Allergen tags identify 8 major food allergens (Milk, Eggs, Wheat, Soy, Peanuts, Tree Nuts, Fish, Shellfish) listed in official company disclosure records.
              </li>
            </ul>
          </section>

          <div className="rule-editorial" />

          {/* Section 4: Corrections Policy */}
          <section aria-labelledby="corrections-heading" className="rounded-3xl border border-primary/20 bg-primary/5 p-6 sm:p-8 space-y-4">
            <h2 id="corrections-heading" className="font-display text-2xl font-semibold text-foreground flex items-center gap-2">
              <Mail className="h-6 w-6 text-primary" aria-hidden />
              4. Corrections & Data Updates
            </h2>
            <p className="leading-relaxed text-foreground/80">
              Because Waffle House restaurants are independently franchised, prices may vary by state or region. If you notice a price discrepancy or menu update at your local restaurant, please let us know so we can update our records.
            </p>
            <div className="pt-2">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Submit a Data Correction <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </article>
  );
}
