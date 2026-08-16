import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, AlertCircle, ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "Does Waffle House accept printable coupons?",
    a: "Waffle House rarely issues printed coupons. Be cautious of websites claiming to have Waffle House promo codes or coupon PDF downloads; these are typically unverified and not accepted at diner registers.",
  },
  {
    q: "How do I get a free waffle at Waffle House?",
    a: "The most reliable way to receive a free waffle coupon is by signing up for the official Waffle House Regulars Club on wafflehouse.com. Club members receive a welcome coupon for a free waffle, as well as birthday coupons and seasonal promotional offers.",
  },
  {
    q: "What is the best value meal at Waffle House?",
    a: "The All-Star Special™ is widely considered the best value meal. It packages a classic sweet cream waffle, two eggs cooked to order, toast with jelly, a choice of hashbrowns or grits, and a side of bacon, sausage, or ham. Buying these items individually costs significantly more.",
  },
  {
    q: "Does Waffle House offer a military or senior discount?",
    a: "Waffle House does not have a corporate-wide military or senior citizen discount policy. However, because locations are operated by individual franchise owners and managers, some locations may offer local discounts. Please ask your server or check with the local manager.",
  },
];

export const Route = createFileRoute("/deals")({
  head: () => {
    const title = "Waffle House Deals & Promotions 2026 — Coupons & Value Guide";
    const description = "Complete Waffle House deals guide. Learn how to save at Waffle House using the Regulars Club, everyday value bundles like the All-Star Special™, and avoid fake coupon scams.";
    const url = "https://wafflehousemenu.com/deals";

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
                { "@type": "ListItem", position: 2, name: "Deals & Promotions", item: url },
              ],
            },
          }),
        },
      ],
    };
  },
  component: DealsPage,
});

function DealsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-[#0B0C0E] border-b-2 border-primary py-14 px-4">
        <div className="container-editorial max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/50">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li className="text-white/30">/</li>
              <li className="text-white/80">Deals &amp; Promotions</li>
            </ol>
          </nav>
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">
            Value Guide
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            Waffle House Deals &amp; Value Pricing
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
            Waffle House focuses on providing <strong>everyday low pricing</strong> rather than short-term discount campaigns. Learn how to locate genuine promotions, use the Regulars Club, and get the best value from your order.
          </p>
        </div>
      </section>

      <div className="container-editorial max-w-4xl px-4 py-12 space-y-12">

        {/* Regulars Club Spotlight */}
        <section className="rounded-2xl border-2 border-primary bg-surface p-6 shadow-md relative overflow-hidden">
          <div className="absolute right-4 top-4 text-primary opacity-10">
            <Sparkles className="h-24 w-24" />
          </div>
          <div className="relative z-10 space-y-4">
            <span className="inline-block rounded-full bg-primary/20 text-primary border border-primary/30 px-3 py-1 text-xs font-bold uppercase tracking-wide">
              Official Club
            </span>
            <h2 className="font-display text-2xl font-bold text-foreground">
              Join the Waffle House Regulars Club™
            </h2>
            <p className="text-sm text-ink-soft leading-relaxed max-w-2xl">
              The most reliable way to receive coupons is by signing up for the official Waffle House Regulars Club. When you register your email address, you will receive a welcome email containing a coupon for a <strong>Free Classic Waffle</strong>, redeemable at any participating location.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://www.wafflehouse.com/regulars-club/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-1.5 text-xs"
              >
                Join Waffle House Club <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <span className="text-xs text-ink-soft">
                *External link to official Waffle House registration page.
              </span>
            </div>
          </div>
        </section>

        {/* Value Menu Strategy */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            How to Get the Best Value
          </h2>
          <p className="text-sm text-ink-soft leading-relaxed">
            If you want to maximize your value at Waffle House, order bundled combos rather than individual side plates.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-4 bg-background">
              <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                ⭐ Order the All-Star Special™
              </h3>
              <p className="text-xs text-ink-soft mt-1 leading-relaxed">
                The All-Star Special™ is Waffle House's signature combo. It bundles eggs, toast, hashbrowns or grits, side meat, and a waffle for an estimated price of $10.95. Ordering these items ala carte would cost approximately $14.50, saving you nearly 25%.
              </p>
            </div>
            <div className="rounded-xl border border-border p-4 bg-background">
              <h3 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                ☕ Bottomless Beverages
              </h3>
              <p className="text-xs text-ink-soft mt-1 leading-relaxed">
                Waffle House offers bottomless refills on its classic Alice's Iced Tea™ and Signature Blend Coffee. If you plan to spend time in the diner, ordering a bottomless beverage is highly cost-effective.
              </p>
            </div>
          </div>
        </section>

        {/* Scam warning card */}
        <section className="rounded-2xl border border-border bg-surface p-5 flex items-start gap-4">
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-sm">Beware of Coupon Scams</h3>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">
              Many third-party sites advertise fake coupon codes, printable PDF sheets, or online discounts. Waffle House restaurants do not use scanner-based digital promo codes and will not accept printable coupons generated by third-party websites. Only use coupons sent directly from the official Waffle House email club.
            </p>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Deals FAQ
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
            Related Guides
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Waffle House Menu", href: "/menu" },
              { label: "Hours & Guide", href: "/hours" },
              { label: "Nutrition & Calories", href: "/nutrition" },
              { label: "Happy Hour Guide", href: "/happy-hour" },
              { label: "Delivery Information", href: "/delivery" },
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

        <p className="text-xs text-ink-soft text-center">
          Prices and menu values are estimated reference data and may vary by franchise location. Waffle House is a registered trademark of Waffle House, Inc. This website is an independent reference guide and is not affiliated with Waffle House, Inc.
        </p>

      </div>
    </main>
  );
}
