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
      className={`inline-flex items-center group shrink-0 select-none ${className}`}
      aria-label="The Waffle House Menu & Prices Home"
    >
      {/* High-Resolution Artisan Emblem Logo */}
      <div className="h-10 sm:h-11 md:h-12 w-auto max-w-[200px] sm:max-w-[240px] md:max-w-[270px] shrink-0 flex items-center transition-transform duration-200 group-hover:scale-[1.02]">
        <img
          src={waffleLogoIcon}
          alt="The Waffle House Menu"
          width={440}
          height={155}
          className={`h-full w-auto object-contain ${
            light ? "brightness-105 contrast-105 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" : "drop-shadow-xs"
          }`}
          loading="eager"
          decoding="async"
        />
      </div>
    </Link>
  );
}
