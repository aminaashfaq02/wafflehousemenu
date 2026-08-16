import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, FileText, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/editors")({
  head: () => {
    const title = "Editorial Standards & Sourcing — Waffle House Menu Guide";
    const description = "Learn about our editorial standards, data verification processes, and editorial team guidelines for publishing factual menu prices and nutrition statistics.";
    const url = "https://wafflehousemenu.com/editors";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index,follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": url,
            url: url,
            name: title,
            description: description,
            inLanguage: "en-US",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://wafflehousemenu.com" },
                { "@type": "ListItem", position: 2, name: "Editorial Standards", item: url },
              ],
            },
          }),
        },
      ],
    };
  },
  component: EditorsPage,
});

function EditorsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-[#0B0C0E] border-b-2 border-primary py-14 px-4">
        <div className="container-editorial max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/50">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li className="text-white/30">/</li>
              <li className="text-white/80">Editorial Standards</li>
            </ol>
          </nav>
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">
            Publishing Integrity
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            Editorial Standards &amp; Sourcing
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
            We are committed to delivering highly accurate, verified, and transparent Waffle House menu data, pricing references, and visitor guides.
          </p>
        </div>
      </section>

      <div className="container-editorial max-w-4xl px-4 py-12 space-y-10">

        {/* 3 Pillars */}
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-5 space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground text-sm">Factual Accuracy First</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Every calorie count, price estimation, and store location is verified against primary corporate documents or on-site inspections.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground text-sm">Primary Sourcing</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              We rely strictly on official Waffle House publications, PDFs, locator systems, and firsthand reports. No secondary blogs.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 space-y-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground text-sm">Clear Disclaimers</h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              We openly declare our independent publisher status so that visitors can easily distinguish this guide from corporate entities.
            </p>
          </div>
        </div>

        {/* Factual Guidelines */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Our Data Verification Process
          </h2>
          <div className="space-y-3 text-sm text-ink-soft leading-relaxed">
            <p>
              To maintain the integrity of our dataset, our team follows a strict 3-step verification protocol:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-foreground font-medium pl-2">
              <li>
                <span className="text-ink-soft font-normal">
                  <strong>Initial Extraction:</strong> Menus, prices, and locations are compiled from official company documents.
                </span>
              </li>
              <li>
                <span className="text-ink-soft font-normal">
                  <strong>Cross-Verification:</strong> Calorie and macronutrient statistics are verified directly using the official Waffle House Nutritional Information PDF.
                </span>
              </li>
              <li>
                <span className="text-ink-soft font-normal">
                  <strong>Periodic Auditing:</strong> Every data record stores a <code>last_verified</code> and <code>verification_status</code> marker. Reviews are conducted quarterly.
                </span>
              </li>
            </ol>
          </div>
        </section>

        {/* Independence Notice */}
        <section className="rounded-2xl bg-surface border border-border p-6 space-y-3">
          <h3 className="font-display text-lg font-bold text-foreground">
            Independent Reference Publisher Status
          </h3>
          <p className="text-sm text-ink-soft leading-relaxed">
            This website is an independent informational guide and is not owned, operated, or endorsed by Waffle House, Inc. All registered trademarks, brand names, and logos (such as "Waffle House", "All-Star Special", "Toddle House Omelets") are the sole property of Waffle House, Inc.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold">
            <Link to="/about" className="text-primary hover:underline">About Us →</Link>
            <Link to="/contact" className="text-primary hover:underline">Contact Us →</Link>
            <Link to="/disclaimer" className="text-primary hover:underline">Legal Disclaimer →</Link>
          </div>
        </section>

      </div>
    </main>
  );
}
