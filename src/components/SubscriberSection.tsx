import newsletterBg from "@/assets/hero-5-diner.jpg";

interface SubscriberSectionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  bgImage?: string;
  idPrefix?: string;
}

export function SubscriberSection({
  eyebrow = "Newsletter",
  title = "Stay Updated with the Latest Waffle House Menu Changes",
  subtitle = "Subscribe for updates on menu changes, breakfast guides, new articles and nutrition information.",
  bgImage = newsletterBg,
  idPrefix = "newsletter",
}: SubscriberSectionProps) {
  return (
    <section className="relative overflow-hidden border-t border-border/60 bg-slate-900">
      {/* Background Diner Image */}
      <img
        src={bgImage}
        alt="Waffle House Diner"
        width={1920}
        height={600}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />

      {/* Subscriber Card Container */}
      <div className="container-editorial relative z-10 flex min-h-[260px] md:min-h-[300px] items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-xl rounded-2xl border border-white/20 bg-slate-950/85 p-6 sm:p-8 text-center shadow-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-display text-xl font-semibold text-white sm:text-2xl md:text-3xl">
            {title}
          </h2>
          <p className="mt-2.5 text-sm leading-relaxed text-white/80">
            {subtitle}
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            aria-label="Subscribe to newsletter"
            className="mx-auto mt-5 flex max-w-md flex-col gap-2.5 sm:flex-row"
          >
            <label htmlFor={`${idPrefix}-email`} className="sr-only">
              Email address
            </label>
            <input
              id={`${idPrefix}-email`}
              type="email"
              required
              placeholder="your@email.com"
              className="h-11 flex-1 rounded-full border border-white/30 bg-white/95 px-4 text-sm text-foreground placeholder:text-ink-soft focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="btn-primary h-11 shrink-0 px-6 text-sm font-semibold">
              Subscribe
            </button>
          </form>
          <p className="mt-3 text-xs text-white/60">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
