import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Clock,
  MapPin,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  Utensils,
  BookOpen,
  Coffee,
  Users,
  CheckCircle2,
  Phone,
  Calendar,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { SubscriberSection } from "@/components/SubscriberSection";
import hero5 from "@/assets/hero-5-diner.jpg";
import hero6 from "@/assets/hero-6-kitchen.jpg";
import contactHeroDiner from "@/assets/contact-hero-diner.jpg";

const SITE = "https://wafflehousemenu.com";

const reservationFaqs = [
  {
    q: "Does Waffle House take reservations?",
    a: "No. Waffle House has operated exclusively on a strict first-come, first-served walk-in basis since 1955. Diners can seat themselves at any open counter stool or wait briefly for an open booth.",
  },
  {
    q: "How long is the typical wait time at Waffle House?",
    a: "Because short-order cooks prepare meals rapidly in 5 to 10 minutes, table turnover is exceptionally fast. Even during peak weekend breakfast rushes (8:30 AM to 11:30 AM), wait times rarely exceed 10 to 15 minutes.",
  },
  {
    q: "Can I call ahead for a large group or tour bus?",
    a: "While Waffle House does not hold or reserve tables, calling your local restaurant 15 to 30 minutes in advance of a large group (6 or more people) allows the grill operator and servers to prepare ingredients and coordinate adjacent booth seating.",
  },
  {
    q: "Are there private dining rooms at Waffle House?",
    a: "No. Every Waffle House features the iconic open diner layout with counter seating directly in front of the sizzling flat-top griddle and perimeter booths.",
  },
  {
    q: "Can I book Waffle House through OpenTable, Resy, or Yelp?",
    a: "No. Waffle House is not listed on third-party reservation systems like OpenTable or Resy. All dine-in seating is handled in person at the restaurant.",
  },
  {
    q: "Is counter seating faster than waiting for a booth?",
    a: "Yes! If you are dining solo or with a partner, sitting at the counter stools provides immediate seating and gives you front-row entertainment watching short-order cooks work the griddle.",
  },
];

export const Route = createFileRoute("/reservations")({
  head: () => ({
    meta: [
      { title: "Waffle House Reservations & Seating Guide 2026 | Walk-In Policy" },
      {
        name: "description",
        content: "Learn how Waffle House seating and walk-in policies work: first-come first-served rules, peak hours, counter vs booth seating, and large party tips across 1,900+ diners.",
      },
      { property: "og:title", content: "Waffle House Reservations & Seating Guide 2026 | Walk-In Policy" },
      {
        property: "og:description",
        content: "Learn how Waffle House seating and walk-in policies work: first-come first-served rules, peak hours, counter vs booth seating, and large party tips across 1,900+ diners.",
      },
      { property: "og:url", content: `${SITE}/reservations` },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: `${SITE}/reservations` }],
  }),
  component: ReservationsPage,
});

function ReservationsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const topStates = [
    { name: "Georgia", count: "430+ diners", slug: "georgia" },
    { name: "North Carolina", count: "180+ diners", slug: "north-carolina" },
    { name: "South Carolina", count: "170+ diners", slug: "south-carolina" },
    { name: "Florida", count: "165+ diners", slug: "florida" },
    { name: "Alabama", count: "150+ diners", slug: "alabama" },
    { name: "Tennessee", count: "130+ diners", slug: "tennessee" },
    { name: "Texas", count: "120+ diners", slug: "texas" },
    { name: "Ohio", count: "80+ diners", slug: "ohio" },
    { name: "Virginia", count: "65+ diners", slug: "virginia" },
    { name: "Indiana", count: "55+ diners", slug: "indiana" },
    { name: "Kentucky", count: "50+ diners", slug: "kentucky" },
    { name: "Mississippi", count: "45+ diners", slug: "mississippi" },
  ];

  return (
    <main className="bg-white text-foreground font-sans">
      {/* ── BREADCRUMB ── */}
      <nav aria-label="Breadcrumb" className="bg-surface py-3 border-b border-border font-sans">
        <div className="container-editorial flex items-center gap-2 text-xs font-medium text-ink-soft">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="text-foreground font-semibold">Reservations &amp; Seating</span>
        </div>
      </nav>

      {/* ── HERO BANNER ── */}
      <section className="bg-white py-10 md:py-14 border-b border-border">
        <div className="container-editorial max-w-4xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Diner Seating Guide · 2026 Edition
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight">
              Waffle House Reservations &amp; Table Seating
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-ink-soft border-t border-border/60 pt-3">
            <span>By <Link to="/about" className="text-foreground font-semibold hover:underline">Marcus Goodwin</Link>, Diner Editor</span>
            <span>·</span>
            <span>Reviewed 19 August 2026</span>
            <span>·</span>
            <Link to="/methodology" className="text-primary font-semibold hover:underline">How this is sourced</Link>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-ink-soft">
            Waffle House is world-famous for its open kitchen, stainless steel counters, and welcoming atmosphere. This guide explains how seating works across all 1,900+ restaurants, peak rush hour tips, booth policies, and how to plan visits for groups.
          </p>

          {/* Hero Featured Visual */}
          <div className="relative h-48 sm:h-64 w-full rounded-2xl overflow-hidden shadow-xs border border-border">
            <img src={contactHeroDiner} alt="Waffle House Diner Interior Seating" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
              <span className="text-xs font-bold text-white bg-black/60 backdrop-blur-xs px-3 py-1 rounded-full">
                Classic First-Come First-Served Seating · 24/7 Service
              </span>
            </div>
          </div>

          {/* Key Facts Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="rounded-2xl border border-border bg-surface p-4 text-center">
              <span className="text-[10px] font-bold uppercase text-ink-soft">Policy</span>
              <p className="font-display text-base font-bold text-foreground mt-0.5">100% Walk-In</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 text-center">
              <span className="text-[10px] font-bold uppercase text-ink-soft">Avg Wait</span>
              <p className="font-display text-base font-bold text-emerald-700 mt-0.5">5 – 12 mins</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 text-center">
              <span className="text-[10px] font-bold uppercase text-ink-soft">Diners</span>
              <p className="font-display text-base font-bold text-primary mt-0.5">1,900+ Outlets</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface p-4 text-center">
              <span className="text-[10px] font-bold uppercase text-ink-soft">Schedule</span>
              <p className="font-display text-base font-bold text-foreground mt-0.5">24/7/365 Open</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ANSWER BOX ── */}
      <section className="py-10 bg-surface border-b border-border">
        <div className="container-editorial max-w-4xl">
          <div className="rounded-3xl border-2 border-primary/40 bg-white p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-amber-800">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="font-display text-lg font-bold text-foreground">
                Quick Answer / Seating TL;DR
              </h2>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-ink-soft">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>No Reservations Required:</strong> Waffle House operates on a 100% first-come, first-served seating policy. You do not need an account, app, or reservation to walk in.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Fast Turnaround:</strong> Because food is cooked fresh on the open flat top in minutes, tables turn over in 15 to 20 minutes, making wait times very short even on busy weekend mornings.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Counter Seating:</strong> Swivel counter stools provide immediate solo or couple seating with an unobstructed view of the cooks and jukebox.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL CONTENT ── */}
      <section className="py-12 md:py-16">
        <div className="container-editorial max-w-4xl space-y-12">
          {/* Section 1: The Waffle House Seating Experience */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              How Seating Works at Waffle House
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              When you walk through the doors of any Waffle House diner, you will immediately notice the compact, welcoming layout. There is no host stand or reservation podium. Instead, guests are encouraged to take any open counter stool or slide into an available booth.
            </p>
            <p className="text-sm leading-relaxed text-ink-soft">
              If all booths are currently occupied, simply inform the friendly server or wait near the doorway. The staff will acknowledge you, clear the next available booth with lightning speed, and welcome you to your table.
            </p>
          </div>

          {/* Section 2: Best Times to Visit */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              When Is Waffle House Busiest?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-amber-300 bg-amber-50/50 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">
                  Peak Rush Windows
                </span>
                <h3 className="font-display text-base font-bold text-foreground">
                  Weekend Mornings &amp; Late Night
                </h3>
                <p className="text-xs text-ink-soft leading-relaxed">
                  Saturday and Sunday mornings between <strong>8:30 AM and 11:30 AM</strong> experience peak breakfast traffic. Friday and Saturday nights between <strong>1:00 AM and 3:30 AM</strong> are also high-energy diner rushes.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-emerald-300 bg-emerald-50/50 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 block">
                  Quietest Windows
                </span>
                <h3 className="font-display text-base font-bold text-foreground">
                  Midday &amp; Early Evenings
                </h3>
                <p className="text-xs text-ink-soft leading-relaxed">
                  Weekday afternoons (<strong>1:30 PM to 5:00 PM</strong>) and early evenings offer immediate booth seating, calm atmospheres, and the same complete 24-hour menu.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Large Groups & Road Trips */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Dining with Large Groups (6+ People)
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              Waffle House booths are cozy and comfortably accommodate 4 adults (or 2 adults and 3 children). If you are traveling with a sports team, church group, or extended family:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-ink-soft list-disc pl-5">
              <li><strong>Call the Diner 15–20 Mins Ahead:</strong> Find your restaurant's direct phone number in our <Link to="/locations" className="text-primary font-bold hover:underline">Locations Directory</Link> and let the staff know your arrival time.</li>
              <li><strong>Split Into Adjacent Booths:</strong> Servers will gladly reserve neighboring booths side-by-side so your entire group stays together.</li>
              <li><strong>Line Up at the Counter:</strong> For quick road trip stops, a row of counter stools gets everyone served and eating within minutes.</li>
            </ul>
          </div>

          {/* Section 4: State Directory */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl font-bold text-foreground">
              Find Your Nearest 24-Hour Waffle House
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {topStates.map((st) => (
                <Link
                  key={st.slug}
                  to="/locations/$state"
                  params={{ state: st.slug }}
                  className="group rounded-xl border border-border bg-surface p-3.5 hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <h3 className="font-display text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {st.name}
                  </h3>
                  <p className="text-[11px] text-ink-soft mt-0.5">{st.count}</p>
                </Link>
              ))}
            </div>
            <div className="pt-2 text-center">
              <Link to="/locations" className="btn-primary py-2.5 px-6 text-xs font-bold inline-flex items-center gap-1.5">
                Browse All 25 States &amp; 600+ Cities →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section aria-labelledby="res-faq-heading" className="bg-surface py-16 border-t border-border font-sans">
        <div className="container-editorial max-w-3xl">
          <div className="text-center mb-10 space-y-2">
            <span className="chip">Seating FAQs</span>
            <h2 id="res-faq-heading" className="font-display text-3xl font-bold sm:text-4xl text-foreground">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-3">
            {reservationFaqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-border rounded-2xl overflow-hidden bg-white shadow-2xs">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between p-5 text-left font-sans"
                  >
                    <span className="font-display text-sm sm:text-base font-bold text-foreground">{faq.q}</span>
                    <span className="text-primary font-black text-xl">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-ink-soft leading-relaxed border-t border-border/40 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SUBSCRIBER BOX ── */}
      <SubscriberSection idPrefix="res-sub" />
    </main>
  );
}
