import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Calendar, AlertTriangle, Coffee } from "lucide-react";

const faqs = [
  {
    q: "Is Waffle House open on Christmas Day?",
    a: "Yes. All Waffle House locations are open 24 hours a day, 7 days a week, 365 days a year. This includes Christmas Day, Christmas Eve, Thanksgiving, New Year's Day, and all other major federal and state holidays.",
  },
  {
    q: "Why is Waffle House always open?",
    a: "Waffle House has maintained its 24/7/365 operational model since opening its first diner in Avondale Estates, Georgia, in 1955. The brand is built on around-the-clock availability, serving as a reliable neighborhood gathering place at any hour of the day or night.",
  },
  {
    q: "What is the Waffle House Index?",
    a: "The Waffle House Index is an informal metric used by the Federal Emergency Management Agency (FEMA) to assess the impact of severe weather (such as hurricanes or storms) on a local area. Because Waffle House locations are highly resilient and rarely close, their operational status helps gauge disaster severity.",
  },
  {
    q: "Does Waffle House have a breakfast hours limit?",
    a: "No. Waffle House serves its complete menu — including all-star combos, omelets, waffles, hashbrowns, burgers, and dinners — 24 hours a day, 7 days a week. You can order breakfast, lunch, or dinner at any time.",
  },
  {
    q: "Does Waffle House close for cleaning?",
    a: "No. Waffle House diners do not close for cleaning. Staff members clean stations and griddles in shifts continuously throughout the day and night while the diner remains open to customers.",
  },
];

export const Route = createFileRoute("/hours")({
  head: () => {
    const title = "Waffle House Hours 2026 — Is Waffle House Open 24/7?";
    const description = "Complete Waffle House hours guide. Yes, Waffle House is open 24 hours a day, 7 days a week, 365 days a year, including all major holidays. Find visit tips here.";
    const url = "https://wafflehousemenu.com/hours";

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
                    { "@type": "ListItem", position: 2, name: "Hours & Guide", item: url },
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
  component: HoursPage,
});

function HoursPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="bg-[#0B0C0E] border-b-2 border-primary py-14 px-4">
        <div className="container-editorial max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/50">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li className="text-white/30">/</li>
              <li className="text-white/80">Hours</li>
            </ol>
          </nav>
          <p className="text-primary font-bold uppercase tracking-widest text-xs mb-3">
            Visitor Information
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
            Waffle House Hours of Operation
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
            Waffle House locations are famously open <strong>24 hours a day, 7 days a week, 365 days a year</strong>. Learn about holiday schedules, diner peak times, and the resilient history of Waffle House service.
          </p>
        </div>
      </section>

      <div className="container-editorial max-w-4xl px-4 py-12 space-y-12">

        {/* Key Facts Summary */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-5 text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
              <Clock className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Standard Hours</h3>
            <p className="text-sm text-ink-soft">Open 24 Hours Daily</p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
              <Calendar className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Holidays</h3>
            <p className="text-sm text-ink-soft">365 Days a Year</p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5 text-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
              <Coffee className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground mb-1">Full Menu Hours</h3>
            <p className="text-sm text-ink-soft">Served All Day &amp; Night</p>
          </div>
        </div>

        {/* Holiday Schedule Card */}
        <section className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            📅 Holiday Schedule 2026
          </h2>
          <p className="text-sm text-ink-soft leading-relaxed mb-4">
            Unlike many local diners and major chains, Waffle House does not adjust its operating hours for national or state holidays. Standard diner hours remain active on the following:
          </p>
          <ul className="grid gap-2.5 sm:grid-cols-2 text-sm text-foreground">
            <li className="flex items-center gap-2">🟢 Christmas Day: <strong>Open 24/7</strong></li>
            <li className="flex items-center gap-2">🟢 Thanksgiving Day: <strong>Open 24/7</strong></li>
            <li className="flex items-center gap-2">🟢 New Year's Day: <strong>Open 24/7</strong></li>
            <li className="flex items-center gap-2">🟢 Christmas Eve: <strong>Open 24/7</strong></li>
            <li className="flex items-center gap-2">🟢 Thanksgiving Eve: <strong>Open 24/7</strong></li>
            <li className="flex items-center gap-2">🟢 Independence Day (July 4): <strong>Open 24/7</strong></li>
            <li className="flex items-center gap-2">🟢 Memorial Day &amp; Labor Day: <strong>Open 24/7</strong></li>
            <li className="flex items-center gap-2">🟢 Easter Sunday: <strong>Open 24/7</strong></li>
          </ul>
        </section>

        {/* FEMA Waffle House Index Info */}
        <section className="rounded-2xl border-2 border-amber-400/40 bg-amber-50/50 p-6">
          <h2 className="font-display text-xl font-bold text-amber-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            The Waffle House Index Explained
          </h2>
          <p className="text-sm text-amber-800 leading-relaxed mb-3">
            The Federal Emergency Management Agency (FEMA) uses the <strong>Waffle House Index</strong> to help monitor disaster recovery efforts. Because Waffle House maintains robust emergency backup plans (such as running on limited menus, generator power, and mobile teams), it is typically the last establishment to close and the first to reopen.
          </p>
          <div className="grid gap-3 sm:grid-cols-3 text-xs font-semibold text-center mt-4">
            <div className="bg-green-100 text-green-950 p-2.5 rounded-lg">
              🟢 Green: Full Menu, power on, diner fully open
            </div>
            <div className="bg-yellow-100 text-yellow-950 p-2.5 rounded-lg">
              🟡 Yellow: Limited Menu, generator power, open
            </div>
            <div className="bg-red-100 text-red-950 p-2.5 rounded-lg">
              🔴 Red: Restaurant closed (severe damage/hazard)
            </div>
          </div>
        </section>

        {/* Visit Planning Tips */}
        <section className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-foreground">
            Visit Planning Tips &amp; Peak Hours
          </h2>
          <div className="space-y-3">
            <div className="rounded-xl border border-border p-4 bg-background">
              <h3 className="font-bold text-foreground text-sm">Peak Morning Hours</h3>
              <p className="text-xs text-ink-soft mt-1 leading-relaxed">
                Saturdays and Sundays between 8:00 AM and 11:30 AM are typically the busiest times of the week at most locations. You may experience a short wait for counter or booth seating during these hours.
              </p>
            </div>
            <div className="rounded-xl border border-border p-4 bg-background">
              <h3 className="font-bold text-foreground text-sm">Late-Night / Post-Event Rush</h3>
              <p className="text-xs text-ink-soft mt-1 leading-relaxed">
                Fridays and Saturdays between 12:00 AM and 3:00 AM experience a secondary peak due to late-night diner crowds. Service remains high-speed, but tables fill quickly.
              </p>
            </div>
            <div className="rounded-xl border border-border p-4 bg-background">
              <h3 className="font-bold text-foreground text-sm">Mid-Week Diner Atmosphere</h3>
              <p className="text-xs text-ink-soft mt-1 leading-relaxed">
                Tuesdays through Thursdays offer the quietest dining environment, ideal for relaxed visits, enjoying bottomless coffee, or catching up on work.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Frequently Asked Questions (FAQ)
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
            Related Directories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Find Diner Locations", href: "/locations" },
              { label: "Waffle House Menu", href: "/menu" },
              { label: "Allergen Information", href: "/allergens" },
              { label: "Dietary Choices", href: "/dietary" },
              { label: "Delivery Options", href: "/delivery" },
              { label: "Catering Info", href: "/catering" },
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
          Information based on official Waffle House guidelines. Individual restaurant status may temporarily change during major weather emergencies or local regulations. Please check our{" "}
          <Link to="/locations" className="text-primary hover:underline">
            Locations Directory
            </Link>{" "}
          or visit the official locator to verify a specific store branch.
        </p>

      </div>
    </main>
  );
}
