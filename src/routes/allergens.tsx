import { createFileRoute, Link } from "@tanstack/react-router";

const allergenCategories = [
  {
    name: "Gluten (Wheat)",
    icon: "🌾",
    risk: "High",
    riskColor: "bg-red-100 text-red-800",
    description:
      "Waffle batter, biscuits, toast, and breaded items all contain wheat flour. The griddle surface is shared across all items, so cross-contact with gluten is unavoidable.",
    likelyItems: [
      "Waffles (all varieties)",
      "Grilled Biscuits",
      "Toast (all varieties)",
      "Breakfast Sandwiches",
      "Texas Melts",
      "Burgers (buns)",
    ],
    avoidItems: [
      "Hashbrowns (contain no wheat but share griddle)",
      "Eggs (contain no wheat but cross-contact risk)",
    ],
  },
  {
    name: "Dairy (Milk)",
    icon: "🥛",
    risk: "High",
    riskColor: "bg-red-100 text-red-800",
    description:
      "Dairy is present in waffle batter, butter, cheese toppings, milkshakes, and many sauces. Even items cooked on the griddle may have butter contact.",
    likelyItems: [
      "Waffles (butter in batter)",
      "Cheese 'N Eggs",
      "All Cheese Omelets",
      "Hashbrowns — Covered (cheese)",
      "Grits (butter)",
      "Milkshakes",
    ],
    avoidItems: [],
  },
  {
    name: "Eggs",
    icon: "🥚",
    risk: "High",
    riskColor: "bg-red-100 text-red-800",
    description:
      "Eggs are a core ingredient throughout the Waffle House menu. They appear in waffles, omelets, egg breakfasts, breakfast sandwiches and hashbrown bowls.",
    likelyItems: [
      "All-Star Special™ (eggs included)",
      "2-Egg Breakfast",
      "All Omelets",
      "Hashbrown Bowls",
      "Breakfast Sandwiches with egg",
    ],
    avoidItems: [],
  },
  {
    name: "Soy",
    icon: "🫘",
    risk: "Medium",
    riskColor: "bg-yellow-100 text-yellow-800",
    description:
      "Soy may be present in cooking oils and certain processed meat products such as sausage patties. Waffle House does not publish a comprehensive soy list.",
    likelyItems: [
      "Sausage Patties (may contain soy)",
      "Some cooking oils",
    ],
    avoidItems: [],
  },
  {
    name: "Peanuts",
    icon: "🥜",
    risk: "Low–Medium",
    riskColor: "bg-yellow-100 text-yellow-800",
    description:
      "Peanuts are not a primary ingredient in standard Waffle House menu items. However, cross-contact risk exists in a shared kitchen environment.",
    likelyItems: ["Pecan Waffle (tree nuts, not peanuts)"],
    avoidItems: [],
  },
  {
    name: "Tree Nuts (Pecans)",
    icon: "🌰",
    risk: "Medium",
    riskColor: "bg-yellow-100 text-yellow-800",
    description:
      "Pecans are present in the Pecan Waffle. Anyone with a tree nut allergy should avoid the Pecan Waffle and inform staff to prevent cross-contact on the waffle iron.",
    likelyItems: ["Pecan Waffle", "Pecan Pie (where available)"],
    avoidItems: [],
  },
  {
    name: "Fish & Shellfish",
    icon: "🐟",
    risk: "Low",
    riskColor: "bg-green-100 text-green-800",
    description:
      "Waffle House does not serve fish or shellfish on its standard menu. Cross-contact risk from this allergen category is considered low.",
    likelyItems: [],
    avoidItems: [],
  },
];

const faqs = [
  {
    q: "Is Waffle House gluten-free?",
    a: "No. Waffle House does not offer a certified gluten-free menu. Waffles, biscuits, toast and most sandwiches contain wheat flour. The shared griddle surface means cross-contact with gluten is present even for items that do not inherently contain wheat, such as eggs or hashbrowns. Waffle House is not suitable for people with celiac disease.",
  },
  {
    q: "Can I order dairy-free at Waffle House?",
    a: "It is difficult to guarantee a dairy-free meal at Waffle House. Butter is used on the griddle and is present in waffle batter. Hashbrowns can be ordered without cheese, and plain scrambled eggs without butter may be requested, but cross-contact risk remains. Always inform your server of your dietary needs.",
  },
  {
    q: "Does Waffle House publish an official allergen chart?",
    a: "Waffle House publishes nutrition information and some ingredient information in its official Nutritional Information PDF, available at wafflehouse.com. For detailed allergen queries, Waffle House recommends speaking directly with restaurant staff.",
  },
  {
    q: "Are Waffle House hashbrowns gluten-free?",
    a: "Waffle House hashbrowns are made from shredded potatoes which do not contain gluten as an ingredient. However, they are cooked on the same griddle used for waffles, biscuits and other gluten-containing items. Cross-contact is therefore a real risk. Waffle House hashbrowns are not certified gluten-free.",
  },
  {
    q: "What should I do if I have a severe food allergy?",
    a: "Always inform your server of any food allergy before ordering. Ask about specific ingredients in items you are considering. For life-threatening allergies, be aware that Waffle House is a high-volume open kitchen where cross-contact is difficult to prevent completely. You may wish to consult with a manager before ordering.",
  },
];

export const Route = createFileRoute("/allergens")({
  head: () => {
    const title = "Waffle House Allergen Guide 2026 — Gluten, Dairy, Eggs & More";
    const description = "Complete Waffle House allergen guide. Learn which menu items contain gluten, dairy, eggs, soy, peanuts and tree nuts. Understand cross-contact risk at Waffle House diners.";
    const url = "https://wafflehousemenu.com/allergens";
    
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
                    { "@type": "ListItem", position: 2, name: "Allergen Guide", item: url },
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
  component: AllergensPage,
});

function AllergensPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-[#0B0C0E] border-b-2 border-primary py-14 px-4">
        <div className="container-editorial max-w-4xl">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/50">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li className="text-white/30">/</li>
              <li className="text-white/80">Allergen Guide</li>
            </ol>
          </nav>
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">
            Health &amp; Safety
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            Waffle House Allergen Guide
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
            Understand which Waffle House menu items contain the eight major allergens, and what cross-contact risks exist in a shared Waffle House kitchen environment.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-xs font-semibold text-amber-300">
            ⚠️ Always inform your server of food allergies before ordering
          </div>
        </div>
      </section>

      <div className="container-editorial max-w-4xl px-4 py-12 space-y-12">

        {/* Cross-Contact Notice */}
        <div className="rounded-2xl border-2 border-amber-400/50 bg-amber-50 p-6">
          <h2 className="font-display text-xl font-bold text-amber-900 mb-3">
            ⚠️ Important: Cross-Contact at Waffle House
          </h2>
          <p className="text-amber-800 text-sm leading-relaxed mb-3">
            Waffle House is an open-kitchen diner where multiple menu items are prepared on the same griddle surface simultaneously. <strong>Cross-contact between allergens is unavoidable in this environment.</strong>
          </p>
          <p className="text-amber-800 text-sm leading-relaxed">
            Even if an item does not contain a specific allergen as a direct ingredient, contact with that allergen through shared cooking surfaces, utensils or preparation areas is possible. Waffle House does not operate as an allergen-free facility.
          </p>
        </div>

        {/* Allergen Cards */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            The 8 Major Allergens at Waffle House
          </h2>
          <div className="space-y-4">
            {allergenCategories.map((a) => (
              <div
                key={a.name}
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{a.icon}</span>
                    <h3 className="font-display text-lg font-bold text-foreground">
                      {a.name}
                    </h3>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-bold ${a.riskColor}`}>
                    {a.risk} Risk
                  </span>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed mb-3">
                  {a.description}
                </p>
                {a.likelyItems.length > 0 && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-foreground mb-1.5">
                      Contains or likely contains:
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {a.likelyItems.map((item) => (
                        <li
                          key={item}
                          className="rounded-full bg-background border border-border px-2.5 py-0.5 text-xs text-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Reference Table */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Allergen Quick Reference by Category
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="text-left px-4 py-3 font-bold text-foreground">Menu Category</th>
                  <th className="px-3 py-3 text-center font-bold text-foreground">Gluten</th>
                  <th className="px-3 py-3 text-center font-bold text-foreground">Dairy</th>
                  <th className="px-3 py-3 text-center font-bold text-foreground">Eggs</th>
                  <th className="px-3 py-3 text-center font-bold text-foreground">Soy</th>
                  <th className="px-3 py-3 text-center font-bold text-foreground">Tree Nuts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { cat: "Waffles", g: "✅", d: "✅", e: "✅", s: "⚠️", n: "⚠️" },
                  { cat: "Egg Breakfasts", g: "⚠️", d: "⚠️", e: "✅", s: "⚠️", n: "—" },
                  { cat: "Omelets", g: "⚠️", d: "✅", e: "✅", s: "⚠️", n: "—" },
                  { cat: "Hashbrown Bowls", g: "⚠️", d: "✅", e: "✅", s: "⚠️", n: "—" },
                  { cat: "Breakfast Sandwiches", g: "✅", d: "✅", e: "✅", s: "⚠️", n: "—" },
                  { cat: "Grilled Biscuits", g: "✅", d: "✅", e: "⚠️", s: "⚠️", n: "—" },
                  { cat: "Angus Burgers", g: "✅", d: "✅", e: "⚠️", s: "⚠️", n: "—" },
                  { cat: "Sandwiches", g: "✅", d: "✅", e: "⚠️", s: "⚠️", n: "—" },
                  { cat: "Classic Dinners", g: "⚠️", d: "⚠️", e: "⚠️", s: "⚠️", n: "—" },
                  { cat: "Hashbrowns & Toppings", g: "⚠️", d: "⚠️", e: "—", s: "⚠️", n: "—" },
                  { cat: "Breakfast Sides", g: "⚠️", d: "⚠️", e: "—", s: "⚠️", n: "—" },
                  { cat: "Beverages", g: "—", d: "⚠️", e: "—", s: "—", n: "—" },
                ].map((row) => (
                  <tr key={row.cat} className="hover:bg-surface/60 transition-colors">
                    <td className="px-4 py-2.5 font-medium text-foreground">{row.cat}</td>
                    <td className="px-3 py-2.5 text-center text-base">{row.g}</td>
                    <td className="px-3 py-2.5 text-center text-base">{row.d}</td>
                    <td className="px-3 py-2.5 text-center text-base">{row.e}</td>
                    <td className="px-3 py-2.5 text-center text-base">{row.s}</td>
                    <td className="px-3 py-2.5 text-center text-base">{row.n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-2.5 bg-surface/50 border-t border-border text-xs text-ink-soft">
              ✅ Ingredient present · ⚠️ Cross-contact risk · — Not typically present
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Allergen FAQ
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

        {/* Internal Links */}
        <section className="rounded-2xl bg-surface border border-border p-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Related Pages
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Nutrition & Calories", href: "/nutrition" },
              { label: "Dietary Options", href: "/dietary" },
              { label: "Full Menu", href: "/menu" },
              { label: "Waffle Menu", href: "/menu/waffles" },
              { label: "Hashbrowns Guide", href: "/hashbrowns" },
              { label: "Methodology", href: "/methodology" },
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

        {/* Data Source */}
        <p className="text-xs text-ink-soft text-center">
          Allergen information compiled from the official{" "}
          <a
            href="https://www.wafflehouse.com/nutrition"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Waffle House Nutritional Information
          </a>{" "}
          and publicly available menu data. Last reviewed: August 2026. Always confirm with restaurant staff before ordering.
        </p>
      </div>
    </main>
  );
}
