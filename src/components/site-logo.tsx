import { Link } from "@tanstack/react-router";
import waffleLogoIcon from "@/assets/waffle-house-logo.svg";

interface SiteLogoProps {
  light?: boolean;
  className?: string;
}

export function SiteLogo({ light = false, className = "" }: SiteLogoProps) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2.5 sm:gap-3 group shrink-0 select-none ${className}`}
      aria-label="Waffle House — Menu & Prices Home"
    >
      {/* Authentic Waffle House Signboard Badge Icon */}
      <div className="flex h-8 w-11 sm:h-9 sm:w-13 md:h-10 md:w-14 shrink-0 items-center justify-center rounded-lg overflow-hidden transition-transform duration-200 group-hover:scale-105">
        <img
          src={waffleLogoIcon}
          alt="Waffle House"
          width={56}
          height={40}
          className="h-full w-full object-contain"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Stylish Typography Branding (Completely Static) */}
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-display text-[15px] sm:text-base md:text-lg font-black tracking-tight uppercase transition-colors ${
            light ? "text-white group-hover:text-primary" : "text-foreground group-hover:text-primary"
          }`}
        >
          Waffle House<span className="text-primary font-bold">.</span>
        </span>
        <span
          className={`text-[8.5px] sm:text-[9.5px] font-bold uppercase tracking-[0.22em] mt-0.5 ${
            light ? "text-amber-400/90" : "text-amber-700"
          }`}
        >
          Menu &amp; Prices
        </span>
      </div>
    </Link>
  );
}
