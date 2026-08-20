import { Link } from "@tanstack/react-router";
import waffleHouseLogo from "@/assets/waffle-house-logo.svg";

interface SiteLogoProps {
  light?: boolean;
  className?: string;
}

export function SiteLogo({ className = "" }: SiteLogoProps) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center shrink-0 select-none ${className}`}
      aria-label="Waffle House"
    >
      <img
        src={waffleHouseLogo}
        alt="Waffle House"
        width={130}
        height={42}
        className="h-8 sm:h-9 md:h-10 w-auto max-w-[130px] sm:max-w-[140px] object-contain"
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}
