import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollToTop } from "@/components/ScrollToTop";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-xl text-center">
        <p className="chip mx-auto">404 · Off the menu</p>
        <h1 className="mt-5 font-display text-5xl font-semibold sm:text-6xl">
          That plate isn't <span className="text-primary">on the menu.</span>
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          The page you're looking for may have been renamed or removed. Try a quick search, or
          jump to one of the sections below.
        </p>

        <form
          role="search"
          action="/search"
          className="mx-auto mt-8 flex max-w-md items-center gap-2"
        >
          <label htmlFor="nf-search" className="sr-only">Search the menu</label>
          <input
            id="nf-search"
            name="q"
            type="search"
            placeholder="Search waffles, burgers, hashbrowns…"
            className="h-12 flex-1 rounded-full border border-border bg-surface px-5 text-sm placeholder:text-ink-soft focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button type="submit" className="btn-primary h-12">Search</button>
        </form>

        <div className="mt-8 flex flex-wrap justify-center gap-2 text-sm">
          {[
            { to: "/", label: "Home" },
            { to: "/menu", label: "Full menu" },
            { to: "/nutrition", label: "Nutrition" },
            { to: "/faq", label: "FAQ" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full border border-border bg-surface px-4 py-2 font-medium hover:border-primary hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Something hiccuped on our end. Try again, or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn-primary"
          >
            Try again
          </button>
          <a href="/" className="btn-ghost">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Waffle House Menu 2026 — Prices, Calories & Nutrition" },
      {
        name: "description",
        content:
          "The complete Waffle House menu with U.S. prices, calories, ingredients and nutrition — waffles, breakfast, burgers, hashbrowns and drinks. Updated July 2026.",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "Waffle House Menu Guide" },
      { name: "theme-color", content: "#FFBF00" },
      { name: "application-name", content: "Waffle House Menu" },
      { name: "geo.region", content: "US" },
      { name: "geo.placename", content: "United States" },
      { name: "language", content: "English" },
      { name: "rating", content: "General" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "Waffle House Menu Guide" },
      { property: "og:title", content: "Waffle House Menu 2026 — Prices, Calories & Nutrition" },
      { property: "og:description", content: "The complete Waffle House menu with U.S. prices, calories, ingredients and nutrition — waffles, breakfast, burgers, hashbrowns and drinks. Updated July 2026." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://wafflehousemenu.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@wafflehousemenu" },
      { name: "twitter:creator", content: "@wafflehousemenu" },
      { name: "twitter:title", content: "Waffle House Menu 2026 — Prices, Calories & Nutrition" },
      { name: "twitter:description", content: "The complete Waffle House menu with U.S. prices, calories, ingredients and nutrition — waffles, breakfast, burgers, hashbrowns and drinks. Updated July 2026." },
      { property: "og:image", content: "https://wafflehousemenu.com/og-default.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Waffle House Menu Guide — 2026 Prices & Calories" },
      { name: "twitter:image", content: "https://wafflehousemenu.com/og-default.jpg" },
    ],

    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://www.google-analytics.com" },
      { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
      { rel: "dns-prefetch", href: "https://pagead2.googlesyndication.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Waffle House Menu Guide",
          alternateName: "WH Menu Guide",
          url: "https://wafflehousemenu.com",
          logo: {
            "@type": "ImageObject",
            url: "https://wafflehousemenu.com/favicon.ico",
            width: 512,
            height: 512,
          },
          description:
            "Independent editorial guide to the Waffle House menu with current prices, calories, and nutrition. Updated 2026.",
          contactPoint: [
            {
              "@type": "ContactPoint",
              email: "hello@wafflejournal.co",
              contactType: "customer service",
              areaServed: "US",
              availableLanguage: "English",
            },
          ],
          sameAs: [
            "https://www.facebook.com/wafflehousemenu",
            "https://twitter.com/wafflehousemenu",
            "https://www.pinterest.com/wafflehousemenu",
          ],
          foundingDate: "2024",
          areaServed: "US",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Waffle House Menu Guide",
          url: "https://wafflehousemenu.com",
          description: "The complete Waffle House menu with U.S. prices, calories, and nutrition.",
          inLanguage: "en-US",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: "https://wafflehousemenu.com/search?q={search_term_string}",
            },
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();
  const pathname = router.state.location.pathname;
  const overHero = pathname === "/";
  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:shadow-lg"
      >
        Skip to content
      </a>
      <div className="flex min-h-dvh flex-col">
        <SiteHeader overHero={overHero} />
        <main id="main" className={overHero ? "flex-1" : "flex-1 pt-[72px]"}>
          <Outlet />
        </main>
        <SiteFooter />
        <ScrollToTop />
      </div>
    </QueryClientProvider>
  );
}
