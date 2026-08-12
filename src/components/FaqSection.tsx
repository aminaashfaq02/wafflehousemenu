import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FaqItem {
  q?: string;
  a?: string;
  question?: string;
  answer?: string;
}

export interface FaqSectionProps {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  items: FaqItem[];
  bgClassName?: string;
}

export function FaqSection({
  eyebrow = "Got Questions?",
  heading = "Frequently Asked Questions",
  intro = "Everything you need to know about Waffle House prices, calories, menu options, and dining policies.",
  items,
  bgClassName = "bg-[#F7F7F5]",
}: FaqSectionProps) {
  // Track open items (default first open)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className={`border-t border-b border-border/60 ${bgClassName}`}>
      <div className="container-editorial py-16 md:py-20">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary">
              {eyebrow}
            </span>
          )}
          <h2 className="mt-2.5 font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {heading}
          </h2>
          {intro && (
            <p className="mt-3.5 text-base leading-relaxed text-ink-soft sm:text-lg">
              {intro}
            </p>
          )}
        </div>

        {/* Accordion List */}
        <div className="mx-auto mt-10 max-w-3xl space-y-4">
          {items.map((item, idx) => {
            const question = item.question || item.q || "";
            const answer = item.answer || item.a || "";
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                  isOpen
                    ? "border-primary bg-white shadow-md ring-1 ring-primary/20"
                    : "border-black/10 bg-white shadow-2xs hover:border-primary/50 hover:shadow-xs"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-4 p-5 text-left transition-colors sm:p-6 cursor-pointer"
                >
                  <span className="font-display text-base font-semibold leading-snug text-foreground sm:text-lg">
                    {question}
                  </span>
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-primary/20 text-primary" : "bg-surface text-ink-soft"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-border/50 px-5 pb-6 pt-4 sm:px-6">
                    <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                      {answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
