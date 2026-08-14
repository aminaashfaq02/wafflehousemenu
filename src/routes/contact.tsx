import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Mail,
  Clock,
  Globe2,
  HelpCircle,
  ChevronRight,
  Send,
  ArrowRight,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import contactHero from "@/assets/contact-hero-diner.jpg";
import contactFormImg from "@/assets/contact-form-kitchen.jpg";
import catBreakfast from "@/assets/contact-cat-breakfast.jpg";
import catLunch from "@/assets/contact-cat-lunch.jpg";
import catDinner from "@/assets/contact-cat-dinner.jpg";
import catWaffles from "@/assets/contact-cat-waffles.jpg";
import catNutrition from "@/assets/contact-cat-nutrition.jpg";
import newsletterBg from "@/assets/contact-newsletter-bg.jpg";
import { SubscriberSection } from "@/components/SubscriberSection";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/contact")({
  head: () => {
    const url = `${SITE}/contact`;
    const title = "Contact Us | Waffle House Menu & Information Guide";
    const description =
      "Contact our independent Waffle House menu and information guide to report corrections, suggest updates or ask questions about menu, nutrition and location information.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Contact", item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Us",
            url,
            description: "Contact form and guidelines to report corrections, submit pricing updates, and ask questions.",
          }),
        },
      ],
    };
  },
  component: ContactPage,
});

const infoCards = [
  {
    icon: Mail,
    title: "Email Support",
    text: "hello@wafflehousemenu.com — the fastest way to reach our editorial team.",
  },
  {
    icon: Clock,
    title: "Average Response",
    text: "We review submitted feedback when possible.",
  },
  {
    icon: Globe2,
    title: "Website Information",
    text: "An independent informational website and is not affiliated with, endorsed by or sponsored by Waffle House, Inc.",
  },
  {
    icon: HelpCircle,
    title: "General Questions",
    text: "Have a question about a dish or article? Send it over and we’ll help.",
  },
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Enter a valid email address.";
    if (!form.subject.trim()) e.subject = "Please select a subject.";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setForm({ name: "", email: "", subject: "", message: "" });
    toast.success("Thanks — your message has been received. We review feedback when possible.");
  };

  const field =
    "w-full h-12 rounded-xl border border-border bg-white px-4 text-[15px] text-ink placeholder:text-ink-soft/70 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

  return (
    <main className="min-h-screen bg-white">
      {/* 1. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="bg-surface py-3 border-b border-border font-sans">
        <div className="container-editorial flex items-center gap-2 text-xs font-medium text-ink-soft">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" aria-hidden />
          <span className="text-foreground">Contact</span>
        </div>
      </nav>

      {/* 2. HERO */}
      <section className="relative isolate overflow-hidden font-sans">
        <div className="absolute inset-0 -z-10">
          <img
            src={contactHero}
            alt="American diner interior with warm morning light"
            className="h-full w-full object-cover"
            width={1600}
            height={900}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />
        </div>
        <div className="container-editorial py-20 md:py-28 text-white">
          <p className="chip !bg-primary !text-primary-foreground">Contact Us</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
            Contact Us
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Have a question, correction or suggestion about the information on this website? Contact us using the form below. We welcome feedback about menu details, pricing information, nutrition data and restaurant locations so that pages can be reviewed and improved when necessary.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact-form" className="btn-primary h-12 px-6 text-base font-semibold">
              <Send className="h-4 w-4" aria-hidden /> Send a Message
            </a>
            <Link to="/menu" className="btn-ghost h-12 px-6 text-base font-semibold !border-white/30 !text-white hover:!bg-white/10">
              Explore Menu <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM + IMAGE */}
      <section id="contact-form" className="container-editorial py-16 md:py-24 font-sans">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 items-stretch">
          {/* Form card */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8 md:p-10">
            <p className="chip">Send a Message</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
              Drop us a note
            </h2>
            <p className="mt-3 text-ink-soft">
              Fill in the form and our editors will review your feedback.
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Full Name</label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={field}
                  placeholder="Jane Doe"
                  maxLength={80}
                />
                {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email Address</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={field}
                  placeholder="you@example.com"
                  maxLength={120}
                />
                {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">Subject</label>
                <select
                  id="subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={`${field} py-0`}
                >
                  <option value="">Select a subject...</option>
                  <option value="Menu Information">Menu Information</option>
                  <option value="Price Correction">Price Correction</option>
                  <option value="Nutrition Information">Nutrition Information</option>
                  <option value="Location Information">Location Information</option>
                  <option value="Website Feedback">Website Feedback</option>
                  <option value="Other">Other</option>
                </select>
                {errors.subject && <p className="mt-1.5 text-xs text-destructive">{errors.subject}</p>}
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${field} h-auto py-3 resize-y`}
                  placeholder="Share the details here…"
                  maxLength={2000}
                />
                {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary h-12 w-full px-6 text-base font-semibold disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {submitting ? "Sending…" : (<>Send Message <Send className="h-4 w-4" aria-hidden /></>)}
              </button>
            </form>
          </div>

          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-muted min-h-[420px]">
            <img
              src={contactFormImg}
              alt="Professional chef plating a fresh waffle in a bright American diner kitchen"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              width={1200}
              height={1400}
            />
          </div>
        </div>
      </section>

      {/* 4. REPORT A CORRECTION & QUICK LINKS */}
      <section className="bg-surface border-y border-border py-16 md:py-20 font-sans">
        <div className="container-editorial max-w-4xl mx-auto space-y-12">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">Report a Correction</h2>
              <p className="text-sm leading-relaxed text-ink-soft">
                If you notice an incorrect menu item, price, nutrition value, restaurant detail or other factual information, please include the relevant page and explain what appears to be incorrect. Submitted information can then be reviewed before any update is made.
              </p>
              <div>
                <Link to="/menu" className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                  View Menu <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-display text-2xl font-bold text-foreground">Website Inquiries</h2>
              <p className="text-sm leading-relaxed text-ink-soft">
                We review submitted feedback when possible. Please note that we cannot answer questions regarding individual orders, franchise policies, or job applications.
              </p>
            </div>
          </div>

          <hr className="border-border/60" />

          {/* Quick links */}
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="bg-white rounded-2xl p-6 border border-border shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-foreground">Looking for a Restaurant?</h3>
                <p className="mt-2 text-xs text-ink-soft leading-relaxed">If you are trying to find a Waffle House restaurant, visit our location directory.</p>
              </div>
              <Link to="/locations" className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                Find Waffle House Locations <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-border shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-foreground">Looking for Menu Information?</h3>
                <p className="mt-2 text-xs text-ink-soft leading-relaxed">Browse the complete menu with 74 items across 13 categories.</p>
              </div>
              <Link to="/menu" className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                View Waffle House Menu <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-border shadow-xs flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-foreground">Looking for Nutrition?</h3>
                <p className="mt-2 text-xs text-ink-soft leading-relaxed">Looking for calorie breakdown, ingredients, or allergens?</p>
              </div>
              <Link to="/nutrition" className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary hover:underline">
                View Waffle House Nutrition <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Independent Website Disclosure */}
          <div className="rounded-xl border border-black/5 bg-white p-5 text-center shadow-xs">
            <p className="text-xs leading-relaxed text-ink-soft">
              This is an independent informational website and is not affiliated with, endorsed by or sponsored by Waffle House, Inc.
            </p>
          </div>
        </div>
      </section>

      {/* 5. CONTACT INFORMATION */}
      <section className="container-editorial py-16 md:py-24 font-sans">
        <div className="max-w-2xl">
          <span className="chip">Details</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
            Contact Information
          </h2>
          <p className="mt-3 text-ink-soft">
            Prefer another way to reach us? Here are the essentials.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {infoCards.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-ink">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ */}
      <FaqSection />

      {/* 7. EXPLORE POPULAR CATEGORIES */}
      <section className="container-editorial py-16 md:py-24 font-sans">
        <div className="max-w-2xl">
          <span className="chip">Explore</span>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
            Explore Popular Categories
          </h2>
          <p className="mt-3 text-ink-soft">
            Discover popular menu guides, meals, and nutrition information.
          </p>
        </div>

        <div className="mt-10 -mx-4 md:mx-0">
          <ul className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:grid md:grid-cols-5 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
            {popularCategories.map((c) => (
              <li
                key={c.label}
                className="snap-start shrink-0 w-[70%] sm:w-[45%] md:w-auto"
              >
                <Link
                  to={c.to as any}
                  params={c.params as any}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={c.image}
                      alt={c.alt}
                      loading="lazy"
                      width={900}
                      height={1100}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/80">{c.tag}</p>
                      <p className="mt-1 font-display text-lg font-bold">{c.label}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NEWSLETTER */}
      <NewsletterSection />
    </main>
  );
}

const popularCategories: {
  label: string;
  tag: string;
  image: string;
  alt: string;
  to: string;
  params?: Record<string, string>;
}[] = [
  { label: "Breakfast", tag: "Morning classics", image: catBreakfast, alt: "Classic American breakfast plate", to: "/menu/$category", params: { category: "breakfast" } },
  { label: "Lunch", tag: "Midday meals", image: catLunch, alt: "Restaurant lunch meal", to: "/menu" },
  { label: "Dinner", tag: "Comfort plates", image: catDinner, alt: "Comfort food diner plate", to: "/menu" },
  { label: "Waffles", tag: "House specialty", image: catWaffles, alt: "Fresh waffles with toppings", to: "/menu/$category", params: { category: "waffles" } },
  { label: "Nutrition", tag: "Calories & macros", image: catNutrition, alt: "Healthy food ingredients", to: "/nutrition" },
];

const faqs: { q: string; a: string }[] = [
  {
    q: "Is this the official Waffle House website?",
    a: "No. This is an independent informational website created to provide menu details, prices, nutrition information, and helpful guides for visitors.",
  },
  {
    q: "How do you update menu prices?",
    a: "We regularly review available menu information and update details when changes are reported or verified by our editorial team.",
  },
  {
    q: "Can I report incorrect information?",
    a: "Yes. Visitors can contact us anytime to report outdated prices, incorrect nutrition details, or missing information — we appreciate the help.",
  },
  {
    q: "Do prices vary by location?",
    a: "Yes. Restaurant prices may differ depending on location, availability, and regional changes. Always confirm with your local restaurant.",
  },
  {
    q: "How quickly do you reply?",
    a: "We usually respond within one to two business days, depending on the type of inquiry and current volume.",
  },
  {
    q: "Can I suggest content ideas?",
    a: "Absolutely. We welcome feedback and suggestions that help improve our website and better serve our readers.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="container-editorial py-16 md:py-24 border-t border-border font-sans">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <p className="chip">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-ink-soft">
            Find answers to common questions about our menu information, website updates,
            and visitor support.
          </p>
        </div>
        <div className="md:col-span-8">
          <ul className="space-y-3">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li
                  key={f.q}
                  className="rounded-2xl border border-border bg-white shadow-xs transition hover:border-primary/40"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                  >
                    <span className="font-display text-base font-bold text-foreground">
                      {f.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border bg-white transition-transform ${isOpen ? "rotate-45 bg-primary text-primary-foreground border-primary" : ""}`}
                      aria-hidden
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-ink-soft md:px-6 md:pb-6 font-sans">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function NewsletterSection() {
  return <SubscriberSection bgImage={newsletterBg} idPrefix="contact-sub" />;
}
