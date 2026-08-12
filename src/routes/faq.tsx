import { createFileRoute, Link } from "@tanstack/react-router";
import { faqs } from "@/data/menu";
import { FaqSection } from "@/components/FaqSection";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Waffle House Menu FAQ 2026 — Hours, Prices, Calories & Allergens" },
      { name: "description", content: "Comprehensive answers to common questions about the Waffle House menu, prices, 24/7 hours, allergen safety, and nutrition." },
      { property: "og:title", content: "Waffle House Menu FAQ" },
      { property: "og:description", content: "Common questions about the Waffle House menu, hours, and prices." },
      { property: "og:url", content: `${SITE}/faq` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/faq` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <article className="bg-white min-h-screen">
      <header className="border-b border-border bg-[#F7F7F5] py-12 md:py-16">
        <div className="container-editorial">
          <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-ink-soft">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="px-2">/</span>
            <span aria-current="page">FAQ</span>
          </nav>
          <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-ink-soft">
            The questions our readers ask most about Waffle House pricing, calories, menu options, and dining policies.
          </p>
        </div>
      </header>

      <FaqSection
        eyebrow="Help Center &amp; Guide"
        heading="Everything You Need to Know"
        intro="Verified answers compiled from official nutrition records and counter checks."
        items={faqs}
        bgClassName="bg-white"
      />
    </article>
  );
}
