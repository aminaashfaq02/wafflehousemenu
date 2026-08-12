import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";

interface Props {
  size?: "lg" | "md";
  autoFocus?: boolean;
  defaultValue?: string;
  placeholder?: string;
}

export function MenuSearch({
  size = "lg",
  autoFocus,
  defaultValue = "",
  placeholder = "Search waffles, burgers, hashbrowns…",
}: Props) {
  const [value, setValue] = useState(defaultValue);
  const navigate = useNavigate();

  const isLg = size === "lg";

  return (
    <form
      role="search"
      aria-label="Search the menu"
      onSubmit={(e) => {
        e.preventDefault();
        const q = value.trim();
        navigate({ to: "/menu", search: q ? { q } : {} });
      }}
      className={`relative w-full ${isLg ? "" : "max-w-md"}`}
    >
      <label htmlFor={isLg ? "hero-search" : "nav-search"} className="sr-only">
        Search the Waffle House menu
      </label>
      <Search
        aria-hidden
        className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft ${
          isLg ? "h-5 w-5" : "h-4 w-4"
        }`}
      />
      <input
        id={isLg ? "hero-search" : "nav-search"}
        type="search"
        inputMode="search"
        autoComplete="off"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-full border border-border bg-surface pl-12 pr-28 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.15)] placeholder:text-ink-soft focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 ${
          isLg ? "h-14 text-base" : "h-11 text-sm"
        }`}
      />
      <button
        type="submit"
        className={`btn-primary absolute right-1.5 top-1/2 -translate-y-1/2 ${
          isLg ? "h-11" : "h-8 px-4 text-xs"
        }`}
      >
        Search
      </button>
    </form>
  );
}
