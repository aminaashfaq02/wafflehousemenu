import { useState } from "react";
import { List, ChevronDown, ChevronUp } from "lucide-react";

export interface TocItem {
  id: string;
  title: string;
  level?: number;
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of Contents"
      className="my-8 rounded-2xl border border-border bg-[#F7F7F5] p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <List className="h-4 w-4 text-amber-600" aria-hidden />
          <h3 className="font-display text-base font-semibold text-foreground">
            Table of Contents
          </h3>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Collapse Table of Contents" : "Expand Table of Contents"}
          className="rounded-lg p-1 text-ink-soft hover:bg-muted hover:text-foreground transition-colors"
        >
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
      </div>

      {isOpen && (
        <ol className="mt-4 space-y-2 border-t border-border/70 pt-3 text-sm">
          {items.map((item, idx) => (
            <li
              key={item.id || idx}
              style={{ paddingLeft: `${((item.level || 2) - 2) * 1}rem` }}
            >
              <a
                href={`#${item.id}`}
                className="group flex items-start gap-2 text-ink-soft hover:text-primary transition-colors py-0.5"
              >
                <span className="text-xs font-mono text-amber-600/80 group-hover:text-primary font-semibold">
                  {idx + 1}.
                </span>
                <span className="leading-snug">{item.title}</span>
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
