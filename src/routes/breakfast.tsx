import { createFileRoute, Link } from "@tanstack/react-router";
import { Utensils, Egg, Coffee, Sparkles } from "lucide-react";

const breakfastPillars = [
  {
    name: "All-Star Special™",
    description: "The classic Waffle House breakfast combo bundling two eggs, toast, hashbrowns or grits, side meat, and a sweet cream waffle.",
    link: "/menu/all-star-special",
  },
  {
    name: "Sweet Cream Waffles",
    description: "Cooked to order on cast-iron bakers. Varieties include Classic, Chocolate Chip, Peanut Butter, and toasted Georgia Pecan.",
    link: "/menu/waffles",
  },
  {
    name: "Egg Breakfasts & Steaks",
    description: "From simple two-egg plates to USDA Choice T-Bone steaks and pork chops served with scrambled eggs, toast, and hashbrowns.",
    link: "/menu/breakfast",
  },
  {
    name: "Toddle House Omelets",
    description: "Fluffy two-egg omelets loaded with ingredients like hickory-smoked ham, melted cheese, cheesesteak, and Fiesta vegetables.",
    link: "/menu/omelets",
  },
  {
    name: "Hashbrown Bowls",
    description: "Hearty bowls layered with double griddled hashbrowns, scrambled eggs, melted cheese, and chopped bacon or sausage.",
    link: "/menu/hashbrown-bowls",
  },
  {
    name: "Grilled Biscuits & Gravy",
    description: "Freshly griddled buttermilk biscuits served plain, with sausage gravy, or packed with sausage, egg, and cheese.",
    link: "/menu/biscuits",
  },
];

const faqs = [
  {
    q: "Is breakfast served all day at Waffle House?",
    a: "Yes. Waffle House serves its entire breakfast menu 24 hours a day, 7 days a week, 365 days a year. You can order any waffle, egg plate, or omelet at any time of the day or night.",
  },
  {
    q: "What is included in the Waffle House All-Star Special?",
    a: "The All-Star Special™ includes two farm-fresh eggs cooked your way, warm toast (Texas or regular) with jelly, scattered hashbrowns or a grits bowl, a choice of breakfast meat (three slices of bacon, two sausage patties, or city ham), and a Classic Sweet Cream Waffle.",
  },
  {
    q: "How many eggs are in Waffle House omelets?",
    a: "Waffle House Toddle House® Omelets are prepared with two farm-fresh eggs, whisked and cooked fluffy on the griddle, then folded with your choice of cheeses, meats, and vegetables.",
  },
];

export const Route = createFileRoute("/breakfast")({
  head: () => {
    const title = "Waffle House Breakfast Menu 2026 — Combos, Eggs & Waffles";
    const description = "Explore the complete Waffle House Breakfast menu. Learn about the iconic All-Star Special™, Toddle House omelets, griddled hashbrown bowls, biscuits and sides.";
    const url = "https://wafflehousemenu.com/breakfast";

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
                    { "@type": "ListItem", position: 2, name: "Breakfast Guide", item: url },
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
  component: BreakfastPage,
});

function BreakfastPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-[#0B0C0E] border-b-2 border-primary py-14 px-4">
        <div className="container-editorial max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/50">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li className="text-white/30">/</li>
              <li className="text-white/80">Breakfast Menu</li>
            </ol>
          </nav>
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">
            Diner Menu Guide
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            Waffle House Breakfast Guide
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
            Explore the iconic breakfast menu that made Waffle House famous. From sweet cream waffles to custom griddled egg breakfasts, served <strong>24/7/365</strong>.
          </p>
        </div>
      </section>

      <div className="container-editorial max-w-4xl px-4 py-12 space-y-12">

        {/* Breakfast Stats Bar */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-5 text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
              <Egg className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Farm-Fresh Eggs</h3>
            <p className="text-sm text-ink-soft">Cooked Your Way Daily</p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
              <Coffee className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Bottomless Coffee</h3>
            <p className="text-sm text-ink-soft">Signature Diner Blend</p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Custom Toppings</h3>
            <p className="text-sm text-ink-soft">Hashbrowns scattered your way</p>
          </div>
        </div>

        {/* Pillars List */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Breakfast Menu Categories
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {breakfastPillars.map((p) => (
              <div
                key={p.name}
                className="rounded-2xl border border-border bg-surface p-5 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {p.name}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="pt-2">
                  <Link
                    to={p.link as any}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    View Items &amp; Prices →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Customization Note */}
        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
          <h3 className="font-display text-lg font-bold text-amber-900 mb-2">
            💡 Customizing Your Breakfast
          </h3>
          <p className="text-sm text-amber-800 leading-relaxed mb-2">
            The hallmark of the Waffle House breakfast is customization. You can choose how your eggs are prepared (scrambled, fried, sunny-side up, over-easy), select your toast type (Texas toast, wheat, raisin), and specify how your hashbrowns are griddled (plain, or with any of the eight signature toppings).
          </p>
          <Link to="/hashbrowns" className="text-xs font-bold text-primary hover:underline">
            Read the Hashbrown Ordering Guide →
          </Link>
        </div>

        {/* FAQs */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Breakfast FAQ
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
            Related Menu Guides
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Waffles Menu", href: "/menu/waffles" },
              { label: "Hashbrowns Menu", href: "/menu/hashbrowns" },
              { label: "Egg Plates Menu", href: "/menu/breakfast" },
              { label: "Omelets Menu", href: "/menu/omelets" },
              { label: "Nutrition & Calories", href: "/nutrition" },
              { label: "Allergen Guide", href: "/allergens" },
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

        <p className="text-xs text-ink-soft text-center">
          Prices, items and availability may vary slightly by franchise location. Waffle House is a registered trademark of Waffle House, Inc. Independent reference guide.
        </p>

      </div>
    </main>
  );
}
