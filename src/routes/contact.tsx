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
  AlertCircle,
  FileWarning,
  MessageSquare,
  Handshake,
  Wrench,
  MessagesSquare,
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

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Waffle House Menu" },
      {
        name: "description",
        content:
          "Contact the Waffle House Menu editors. Report outdated prices, share feedback, ask questions or send partnership inquiries — we reply within two business days.",
      },
      { property: "og:title", content: "Contact Us — Waffle House Menu" },
      {
        property: "og:description",
        content:
          "Reach the Waffle House Menu editorial team for corrections, feedback and questions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
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
    text: "We typically reply within 1–2 business days, Monday through Friday.",
  },
  {
    icon: Globe2,
    title: "Website Information",
    text: "An independent U.S. blog covering menu items, prices and nutrition.",
  },
  {
    icon: HelpCircle,
    title: "General Questions",
    text: "Have a question about a dish or article? Send it over and we’ll help.",
  },
];

const reasons = [
  {
    icon: FileWarning,
    title: "Report incorrect prices",
    text: "Spotted an outdated price in your city? Send us the location and dish.",
  },
  {
    icon: AlertCircle,
    title: "Outdated nutrition info",
    text: "Help us keep calorie, macro and allergen data accurate for readers.",
  },
  {
    icon: MessageSquare,
    title: "Website feedback",
    text: "Tell us what’s working, what isn’t, and what you’d like to see next.",
  },
  {
    icon: Handshake,
    title: "Partnership requests",
    text: "Editorial collaborations, guest features and press inquiries welcome.",
  },
  {
    icon: Wrench,
    title: "Technical issues",
    text: "Broken links, layout bugs or accessibility problems — please report them.",
  },
  {
    icon: MessagesSquare,
    title: "General questions",
    text: "Anything else you’d like to ask about the menu, articles or the site.",
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
    if (!form.subject.trim() || form.subject.trim().length < 3) e.subject = "Please add a short subject.";
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
    // Placeholder — email sending will be wired in Part 2.
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setForm({ name: "", email: "", subject: "", message: "" });
    toast.success("Thanks — your message has been received. We’ll reply within 1–2 business days.");
  };

  const field =
    "w-full h-12 rounded-xl border border-border bg-white px-4 text-[15px] text-ink placeholder:text-ink-soft/70 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30";

  return (
    <main>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
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
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/70">
            <ol className="flex items-center gap-2">
              <li>
                <Link to="/" className="hover:text-white">Home</Link>
              </li>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              <li className="text-white">Contact</li>
            </ol>
          </nav>
          <p className="chip !bg-primary !text-primary-foreground">Contact Us</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
            We’d Love to Hear From You
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Have a question, found outdated menu information, or want to share feedback?
            We’re always happy to hear from our readers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact-form" className="btn-primary h-12 px-6 text-base">
              <Send className="h-4 w-4" aria-hidden /> Send a Message
            </a>
            <Link to="/menu" className="btn-ghost h-12 px-6 text-base !border-white/30 !text-white hover:!bg-white/10">
              Explore Menu <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT FORM + IMAGE */}
      <section id="contact-form" className="container-editorial py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 items-stretch">
          {/* Form card */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_1px_2px_rgb(0_0_0_/0.03),0_20px_50px_-30px_rgb(0_0_0_/0.18)] sm:p-8 md:p-10">
            <p className="chip">Send a Message</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Drop us a note
            </h2>
            <p className="mt-3 text-ink-soft">
              Fill in the form and our editors will get back to you shortly.
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
                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={field}
                  placeholder="Price correction for Atlanta location"
                  maxLength={120}
                />
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
                className="btn-primary h-12 w-full px-6 text-base disabled:opacity-70"
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

      {/* CONTACT INFORMATION */}
      <section className="container-editorial pb-20 md:pb-24">
        <div className="max-w-2xl">
          <p className="chip">Get in touch</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
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
              className="rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_rgb(0_0_0_/0.15)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-ink">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BEFORE YOU CONTACT US */}
      <section className="bg-[#fafafa] border-y border-border py-20 md:py-24">
        <div className="container-editorial">
          <div className="max-w-2xl">
            <p className="chip">Help Center</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Before You Contact Us
            </h2>
            <p className="mt-3 text-ink-soft">
              A quick look at the kinds of messages we’re best equipped to answer.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {reasons.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group rounded-2xl border border-border bg-white p-6 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_20px_40px_-24px_rgb(0_0_0_/0.15)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-ink transition group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FaqSection />

      {/* EXPLORE POPULAR CATEGORIES */}
      <section className="container-editorial py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="chip">Explore</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
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
                  to={c.to as "/menu"}
                  params={c.params as never}
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
                      <p className="mt-1 font-display text-lg font-semibold">{c.label}</p>
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
  { label: "Dinner", tag: "Comfort plates", image: catDinner, alt: "Comfort food dinner plate", to: "/menu" },
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
    <section className="container-editorial py-20 md:py-24 border-t border-border">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <p className="chip">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
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
                  className="rounded-2xl border border-border bg-white shadow-[0_1px_2px_rgb(0_0_0_/0.03),0_16px_40px_-30px_rgb(0_0_0_/0.15)] transition hover:border-primary/40"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                  >
                    <span className="font-display text-base font-semibold sm:text-lg">
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
                      <p className="px-5 pb-5 text-sm leading-relaxed text-ink-soft md:px-6 md:pb-6">
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
