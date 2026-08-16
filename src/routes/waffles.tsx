import { createFileRoute, Link } from "@tanstack/react-router";
import { Coffee, Layers, Utensils, Info } from "lucide-react";

const waffleOptions = [
  {
    name: "Classic Sweet Cream Waffle",
    calories: 410,
    price: "$4.55",
    description: "The signature single sweet cream buttermilk waffle baked fresh to order on a heavy cast-iron baker.",
  },
  {
    name: "Double Waffle",
    calories: 820,
    price: "$6.85",
    description: "Two hot, golden-brown sweet cream buttermilk waffles served stacked on a single plate.",
  },
  {
    name: "Pecan Waffle",
    calories: 560,
    price: "$5.50",
    description: "The classic sweet cream waffle baked with toasted Georgia pecan pieces mixed directly into the batter.",
  },
  {
    name: "Chocolate Chip Waffle",
    calories: 520,
    price: "$5.25",
    description: "Signature sweet cream waffle baked with rich semi-sweet chocolate chips melted throughout.",
  },
  {
    name: "Peanut Butter Waffle",
    calories: 610,
    price: "$5.25",
    description: "Classic buttermilk waffle baked with creamy peanut butter chips melted inside the pockets.",
  },
];

const faqs = [
  {
    q: "What is Waffle House waffle batter made of?",
    a: "Waffle House waffles are made using a signature sweet cream buttermilk batter. Key ingredients include wheat flour, buttermilk, eggs, sugar, shortening, and flavoring. The exact recipe remains a proprietary brand secret.",
  },
  {
    q: "How many calories are in a Waffle House waffle?",
    a: "A plain Classic Sweet Cream Waffle contains approximately 410 calories. Adding toppings increases the count: the Chocolate Chip waffle has 520 calories, the Pecan waffle has 560 calories, and the Peanut Butter waffle has 610 calories.",
  },
  {
    q: "Are Waffle House waffles gluten-free?",
    a: "No. Waffle House waffle batter is made with standard wheat flour containing gluten. Additionally, they are baked on shared waffle irons where wheat flour is present, meaning there is no gluten-free waffle option.",
  },
];

export const Route = createFileRoute("/waffles")({
  head: () => {
    const title = "Waffle House Waffles Guide 2026 — Prices, Calories & Menu Options";
    const description = "Complete guide to Waffle House waffles. Review prices, calorie counts, allergen facts and waffle varieties including Classic, Pecan, and Chocolate Chip.";
    const url = "https://wafflehousemenu.com/waffles";

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
            "@graph": [
              {
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
                    { "@type": "ListItem", position: 2, name: "Waffles Guide", item: url },
                  ],
                },
              },
              {
                "@type": "FAQPage",
                mainEntity: faqs.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              },
            ],
          }),
        },
      ],
    };
  },
  component: WafflesPage,
});

function WafflesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-[#0B0C0E] border-b-2 border-primary py-14 px-4">
        <div className="container-editorial max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/50">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li className="text-white/30">/</li>
              <li className="text-white/80">Waffles</li>
            </ol>
          </nav>
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">
            Signature Menu Guide
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            Waffle House Waffles Reference Guide
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
            Discover the details behind Waffle House's legendary sweet cream buttermilk waffles. Review estimated prices, verified calorie counts, allergens, and customization choices.
          </p>
        </div>
      </section>

      <div className="container-editorial max-w-4xl px-4 py-12 space-y-12">

        {/* Quick Facts */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-5 text-center">
            <span className="font-display text-2xl font-extrabold text-primary">410</span>
            <p className="text-xs font-bold uppercase tracking-wider mt-1 text-foreground">Base Calories</p>
            <p className="text-[11px] text-ink-soft mt-0.5">Classic Sweet Cream Waffle</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 text-center">
            <span className="font-display text-2xl font-extrabold text-primary">5 Varieties</span>
            <p className="text-xs font-bold uppercase tracking-wider mt-1 text-foreground">Waffle Options</p>
            <p className="text-[11px] text-ink-soft mt-0.5">Toppings baked inside</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-5 text-center">
            <span className="font-display text-2xl font-extrabold text-primary">1955</span>
            <p className="text-xs font-bold uppercase tracking-wider mt-1 text-foreground">Established</p>
            <p className="text-[11px] text-ink-soft mt-0.5">Cooked on cast-iron since day 1</p>
          </div>
        </div>

        {/* Waffle Varieties List */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Waffle Menu Varieties
          </h2>
          <div className="space-y-4">
            {waffleOptions.map((w) => (
              <div
                key={w.name}
                className="rounded-2xl border border-border bg-surface p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {w.name}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed max-w-xl">
                    {w.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="bg-background border border-border px-3 py-1 rounded-full text-xs font-bold text-ink-soft">
                    {w.calories} kcal
                  </span>
                  <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold">
                    {w.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Allergen & Dietary Warning */}
        <section className="rounded-2xl border border-border bg-surface p-5 flex gap-3">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-800 shrink-0">
            <Info className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-foreground">Allergen Notice: Waffle Batter</h4>
            <p className="text-xs text-ink-soft leading-relaxed mt-1">
              All Waffle House waffles contain <strong>gluten (wheat), dairy (milk), and eggs</strong> as direct ingredients in the sweet cream batter. Pecan waffles contain tree nuts. Waffles are baked on shared cast-iron bakers, posing cross-contact risk.
            </p>
            <Link to="/allergens" className="text-xs font-bold text-primary hover:underline mt-2 inline-block">
              View Waffle House Allergen Guide →
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Waffles FAQ
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="font-bold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Links */}
        <section className="rounded-2xl bg-surface border border-border p-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Related Links
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Waffles Menu Page", href: "/menu/waffles" },
              { label: "Breakfast Guide", href: "/breakfast" },
              { label: "Hashbrowns Guide", href: "/hashbrowns" },
              { label: "Nutrition & Calories", href: "/nutrition" },
              { label: "Allergen Guide", href: "/allergens" },
              { label: "Deals & Promotions", href: "/deals" },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href as any}
                className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
