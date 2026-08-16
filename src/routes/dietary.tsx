import { createFileRoute, Link } from "@tanstack/react-router";

const vegetarianOptions = [
  { name: "Classic Waffle", cal: 250, note: "No meat. Butter and egg in batter." },
  { name: "Pecan Waffle", cal: 330, note: "Tree nuts present. No meat." },
  { name: "Chocolate Chip Waffle", cal: 340, note: "No meat." },
  { name: "2-Egg Breakfast (no meat)", cal: 270, note: "Eggs, toast, hashbrowns. Order without meat." },
  { name: "Cheese 'N Eggs", cal: 310, note: "Eggs and cheese only. No meat." },
  { name: "Cheese Omelet", cal: 360, note: "Eggs and cheese. No meat." },
  { name: "Hashbrowns — Regular", cal: 180, note: "Smothered or plain. No meat." },
  { name: "Hashbrowns — Covered (cheese)", cal: 240, note: "Add cheese. No meat." },
  { name: "Grits Bowl", cal: 170, note: "No meat. Contains dairy." },
  { name: "Toast (all varieties)", cal: 130, note: "Butter present." },
];

const lowerCalOptions = [
  { name: "Regular Hashbrowns", cal: 180, protein: 3 },
  { name: "Toast (Texas or Regular)", cal: 130, protein: 4 },
  { name: "Grits Bowl", cal: 170, protein: 3 },
  { name: "2-Egg Breakfast (no toast, no meat)", cal: 210, protein: 12 },
  { name: "Scrambled Eggs (2)", cal: 190, protein: 14 },
  { name: "Bacon Strips (3)", cal: 90, protein: 9 },
  { name: "Black Coffee", cal: 5, protein: 0 },
  { name: "Unsweetened Iced Tea", cal: 0, protein: 0 },
  { name: "Orange Juice (small)", cal: 110, protein: 1 },
];

const highProteinOptions = [
  { name: "T-Bone Steak & Eggs", cal: 920, protein: 71 },
  { name: "Sirloin Steak & Eggs", cal: 740, protein: 58 },
  { name: "Country Ham & Eggs", cal: 600, protein: 47 },
  { name: "Grilled Chicken Sandwich", cal: 490, protein: 38 },
  { name: "Cheesesteak Omelet", cal: 490, protein: 34 },
  { name: "Ham & Cheese Omelet", cal: 430, protein: 30 },
  { name: "Grilled Chicken Breast (dinner)", cal: 420, protein: 52 },
  { name: "All-Star Special™ (sausage)", cal: 1050, protein: 44 },
  { name: "Angus Burger", cal: 720, protein: 39 },
];

const faqs = [
  {
    q: "Is there anything vegetarian at Waffle House?",
    a: "Yes. Waffle House offers several items without meat, including plain waffles, egg breakfasts ordered without meat, cheese omelets, hashbrowns and toast. However, most items contain dairy and eggs, so purely vegan options are extremely limited. Waffle House is not a vegan-friendly restaurant.",
  },
  {
    q: "What is the lowest-calorie full meal at Waffle House?",
    a: "A practical lower-calorie meal at Waffle House would be 2 scrambled eggs (190 cal) with plain hashbrowns (180 cal) and black coffee, totaling approximately 370–380 calories. This provides solid protein while keeping calories manageable.",
  },
  {
    q: "What is the highest-protein item at Waffle House?",
    a: "The T-Bone Steak & Eggs is the highest-protein single item available, providing approximately 71g of protein per serving. The Grilled Chicken Breast dinner provides around 52g of protein at a lower calorie count.",
  },
  {
    q: "Is Waffle House suitable for a low-sodium diet?",
    a: "Waffle House food is generally high in sodium. Processed meats, cheese toppings, grilled items and sauces all contribute significant sodium. People managing sodium intake should review the official Waffle House Nutritional Information PDF for specific sodium values per item.",
  },
  {
    q: "Can I eat at Waffle House on a keto diet?",
    a: "Some Waffle House items are lower in carbohydrates, including eggs, bacon, sausage and grilled chicken. However, waffles, toast, biscuits, and hashbrowns are all high in carbohydrates. A practical approach for low-carb eaters is to order eggs and protein items without the waffle or toast.",
  },
];

export const Route = createFileRoute("/dietary")({
  head: () => {
    const title = "Waffle House Dietary Options 2026 — Vegetarian, Low-Calorie & High-Protein";
    const description = "Explore Waffle House dietary options for 2026. Find vegetarian-friendly items, lower-calorie choices under 400 calories, and high-protein meals to fit your nutrition goals.";
    const url = "https://wafflehousemenu.com/dietary";

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
                    { "@type": "ListItem", position: 2, name: "Dietary Options", item: url },
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
  component: DietaryPage,
});

function DietaryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-[#0B0C0E] border-b-2 border-primary py-14 px-4">
        <div className="container-editorial max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/50">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-primary">Home</Link></li>
              <li className="text-white/30">/</li>
              <li className="text-white/80">Dietary Options</li>
            </ol>
          </nav>
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">Nutrition &amp; Health</p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            Waffle House Dietary Options
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
            Find vegetarian-friendly items, lower-calorie meals and high-protein choices at Waffle House — with verified calorie and protein data from the official nutrition guide.
          </p>
        </div>
      </section>

      <div className="container-editorial max-w-4xl px-4 py-12 space-y-14">

        {/* Vegetarian */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">🥦 Vegetarian-Friendly Options</h2>
          <p className="text-ink-soft text-sm mb-6">These items contain no meat. Most contain dairy and eggs. Not suitable for vegans.</p>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="text-left px-4 py-3 font-bold">Menu Item</th>
                  <th className="px-4 py-3 text-center font-bold">Calories</th>
                  <th className="px-4 py-3 text-left font-bold hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {vegetarianOptions.map((item) => (
                  <tr key={item.name} className="hover:bg-surface/50">
                    <td className="px-4 py-2.5 font-medium text-foreground">{item.name}</td>
                    <td className="px-4 py-2.5 text-center text-ink-soft">{item.cal}</td>
                    <td className="px-4 py-2.5 text-ink-soft text-xs hidden md:table-cell">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Lower Calorie */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">📉 Lower-Calorie Choices</h2>
          <p className="text-ink-soft text-sm mb-6">Items under 220 calories that can form a lighter Waffle House meal.</p>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="text-left px-4 py-3 font-bold">Item</th>
                  <th className="px-4 py-3 text-center font-bold">Calories</th>
                  <th className="px-4 py-3 text-center font-bold">Protein (g)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {lowerCalOptions.map((item) => (
                  <tr key={item.name} className="hover:bg-surface/50">
                    <td className="px-4 py-2.5 font-medium text-foreground">{item.name}</td>
                    <td className="px-4 py-2.5 text-center text-ink-soft">{item.cal}</td>
                    <td className="px-4 py-2.5 text-center text-ink-soft">{item.protein}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* High Protein */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">💪 High-Protein Choices</h2>
          <p className="text-ink-soft text-sm mb-6">For customers focused on protein intake — ranked by protein content.</p>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-border">
                  <th className="text-left px-4 py-3 font-bold">Item</th>
                  <th className="px-4 py-3 text-center font-bold">Calories</th>
                  <th className="px-4 py-3 text-center font-bold">Protein (g)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {highProteinOptions.sort((a, b) => b.protein - a.protein).map((item) => (
                  <tr key={item.name} className="hover:bg-surface/50">
                    <td className="px-4 py-2.5 font-medium text-foreground">{item.name}</td>
                    <td className="px-4 py-2.5 text-center text-ink-soft">{item.cal}</td>
                    <td className="px-4 py-2.5 text-center font-bold text-primary">{item.protein}g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">Dietary FAQ</h2>
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
          <h2 className="font-display text-xl font-bold text-foreground mb-4">Related Pages</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Full Nutrition Guide", href: "/nutrition" },
              { label: "Allergen Guide", href: "/allergens" },
              { label: "Full Menu", href: "/menu" },
              { label: "Waffles", href: "/menu/waffles" },
              { label: "Hashbrowns", href: "/menu/hashbrowns" },
              { label: "Beverages", href: "/menu/beverages" },
            ].map((link) => (
              <Link key={link.href} to={link.href as any}
                className="rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors">
                {link.label} →
              </Link>
            ))}
          </div>
        </section>

        <p className="text-xs text-ink-soft text-center">
          Calorie and protein data sourced from the official{" "}
          <a href="https://www.wafflehouse.com/nutrition" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            Waffle House Nutritional Information
          </a>. Values are approximate and may vary by location and preparation. Last reviewed: August 2026.
        </p>
      </div>
    </main>
  );
}
