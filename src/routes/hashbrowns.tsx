import { createFileRoute, Link } from "@tanstack/react-router";
import { Info } from "lucide-react";

const hashbrownSizes = [
  { name: "Regular", calories: 180, price: "$3.10" },
  { name: "Large", calories: 360, price: "$3.60" },
  { name: "Triple", calories: 540, price: "$4.10" },
];

const hashbrownToppings = [
  { name: "Smothered", ingredient: "Sautéed Onions", calories: 15, price: "+$0.65" },
  { name: "Covered", ingredient: "Melted American Cheese", calories: 60, price: "+$0.65" },
  { name: "Chunked", ingredient: "Grilled Hickory Smoked Ham", calories: 70, price: "+$0.65" },
  { name: "Diced", ingredient: "Grilled Tomatoes", calories: 10, price: "+$0.65" },
  { name: "Peppered", ingredient: "Spicy Jalapeño Peppers", calories: 15, price: "+$0.65" },
  { name: "Capped", ingredient: "Grilled Button Mushrooms", calories: 15, price: "+$0.65" },
  { name: "Topped", ingredient: "Bert's Chili™", calories: 60, price: "+$0.65" },
  { name: "Country", ingredient: "Sausage Gravy", calories: 110, price: "+$0.65" },
];

const faqs = [
  {
    q: "What does 'scattered, smothered & covered' mean?",
    a: "This is the classic Waffle House ordering lingo. 'Scattered' refers to spreading the shredded potatoes across the flat-top griddle so they cook crispy. 'Smothered' adds sautéed onions, and 'Covered' adds melted slices of American cheese.",
  },
  {
    q: "What is 'All the Way' hashbrowns?",
    a: "Ordering hashbrowns 'All the Way' means you receive all eight signature toppings (onions, cheese, ham, tomatoes, jalapeños, mushrooms, chili, and sausage gravy) layered over your choice of size (regular, large, or triple).",
  },
  {
    q: "Are Waffle House hashbrowns real potatoes?",
    a: "Yes. Waffle House hashbrowns are made from real, premium quality shredded potatoes. They are dehydrated for storage and rehydrated on-site before being cooked crisp on the diner griddles.",
  },
];

export const Route = createFileRoute("/hashbrowns")({
  head: () => {
    const title = "Waffle House Hashbrowns Guide 2026 — Ordering Lingo & Toppings";
    const description = "Explore the complete Waffle House hashbrown ordering guide. Review sizes, estimated prices, calorie counts, and the 8 signature toppings like Smothered & Covered.";
    const url = "https://wafflehousemenu.com/hashbrowns";

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
                    { "@type": "ListItem", position: 2, name: "Hashbrowns Guide", item: url },
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
  component: HashbrownsPage,
});

function HashbrownsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-[#0B0C0E] border-b-2 border-primary py-14 px-4">
        <div className="container-editorial max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/50">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li className="text-white/30">/</li>
              <li className="text-white/80">Hashbrowns</li>
            </ol>
          </nav>
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">
            Diner Ordering Guide
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            Waffle House Hashbrowns Guide
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
            Master the Waffle House hashbrown ordering lingo. Explore sizes, verified calorie counts, estimated prices, and the eight classic griddle toppings.
          </p>
        </div>
      </section>

      <div className="container-editorial max-w-4xl px-4 py-12 space-y-12">

        {/* Sizes Card */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            1. Choose Your Hashbrown Size
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {hashbrownSizes.map((s) => (
              <div
                key={s.name}
                className="rounded-2xl border border-border bg-surface p-5 text-center"
              >
                <h3 className="font-display text-lg font-bold text-foreground">{s.name}</h3>
                <p className="text-xs text-ink-soft mt-1">Base Portion</p>
                <div className="flex justify-center gap-2 items-center mt-3 text-xs">
                  <span className="bg-background border border-border px-2.5 py-0.5 rounded-full text-ink-soft">
                    {s.calories} kcal
                  </span>
                  <span className="bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full font-bold">
                    {s.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The 8 Toppings Table */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            2. Customize with the 8 Toppings
          </h2>
          <p className="text-sm text-ink-soft leading-relaxed">
            Mix and match toppings to customize your griddle plate. Each topping adds an estimated <strong>+$0.65</strong> to the base price:
          </p>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="text-left px-4 py-3 font-bold text-foreground">Ordering Term</th>
                  <th className="text-left px-4 py-3 font-bold text-foreground">Ingredient Added</th>
                  <th className="px-4 py-3 text-center font-bold text-foreground">Calories</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {hashbrownToppings.map((t) => (
                  <tr key={t.name} className="hover:bg-surface/50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-foreground">
                      "{t.name}"
                    </td>
                    <td className="px-4 py-3 text-ink-soft">
                      {t.ingredient}
                    </td>
                    <td className="px-4 py-3 text-center text-ink-soft font-medium">
                      +{t.calories} kcal
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Griddle cooking surface warning */}
        <section className="rounded-2xl border border-border bg-surface p-5 flex gap-3">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-800 shrink-0">
            <Info className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-foreground">Griddle Cross-Contact Note</h4>
            <p className="text-xs text-ink-soft leading-relaxed mt-1">
              Hashbrowns do not contain gluten as an ingredient, but they are griddled on shared surfaces where buns, Texas toast, and other wheat products are prepared. If you have severe celiac disease or gluten allergies, cross-contact risk is present.
            </p>
            <Link to="/allergens" className="text-xs font-bold text-primary hover:underline mt-2 inline-block">
              View Allergen Details →
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Hashbrowns FAQ
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
              { label: "Hashbrowns Menu", href: "/menu/hashbrowns" },
              { label: "Breakfast Guide", href: "/breakfast" },
              { label: "Waffles Guide", href: "/waffles" },
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
