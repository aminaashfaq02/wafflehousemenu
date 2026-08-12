import { Link } from "@tanstack/react-router";
import waffleLogoImg from "@/assets/hero-waffles.jpg";

export function SiteLogo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3.5 group shrink-0" aria-label="Waffle House Menu — home">
      {/* Circular Badge Logo with Curved Text & Food Center */}
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:scale-105">
        {/* SVG Curved Text Circle */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow">
          <path
            id="textPathCircle"
            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            fill="none"
          />
          <text className={`text-[9px] font-bold tracking-[0.24em] uppercase ${light ? "fill-amber-400" : "fill-amber-600"}`}>
            <textPath href="#textPathCircle" startOffset="0%">
              WAFFLE HOUSE MENU • RECIPES •
            </textPath>
          </text>
        </svg>

        {/* Center Circular Food Image Frame */}
        <div
          className={`h-8 w-8 overflow-hidden rounded-full border-2 shadow-md transition-shadow ${
            light
              ? "border-amber-400 shadow-amber-400/30 ring-2 ring-black/40"
              : "border-amber-500 shadow-amber-500/20 ring-2 ring-amber-500/30"
          }`}
        >
          <img
            src={waffleLogoImg}
            alt="Waffle House Food Emblem"
            width={64}
            height={64}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Brand Title */}
      <div className="flex flex-col">
        <span
          className={`font-display text-lg font-bold tracking-tight leading-none transition-colors ${
            light ? "text-white" : "text-foreground"
          }`}
        >
          Waffle House<span className="text-amber-500">.</span>
        </span>
        <span
          className={`text-[9.5px] font-bold uppercase tracking-[0.22em] transition-colors mt-0.5 ${
            light ? "text-amber-300" : "text-amber-600"
          }`}
        >
          Official Culinary Guide
        </span>
      </div>
    </Link>
  );
}
