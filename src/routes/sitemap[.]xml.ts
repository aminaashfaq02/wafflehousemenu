import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { blogPosts } from "@/data/blogPosts";
import { menu } from "@/data/menu";
import { CENTRAL_MENU_CATEGORIES } from "@/data/centralMenuData";
import { locationsData } from "@/data/locations";

const BASE_URL = "https://wafflehousemenu.com";
const TODAY = new Date().toISOString().split("T")[0];

function loc(path: string, priority: string, changefreq: string, lastmod?: string) {
  return [
    `  <url>`,
    `    <loc>${BASE_URL}${path}</loc>`,
    `    <lastmod>${lastmod ?? TODAY}</lastmod>`,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    `  </url>`,
  ].join("\n");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPages = [
          loc("/", "1.0", "daily"),
          loc("/menu/", "0.9", "weekly"),
          loc("/categories", "0.8", "weekly"),
          loc("/locations", "0.9", "weekly"),
          loc("/blog", "0.8", "weekly"),
          loc("/nutrition", "0.8", "weekly"),
          loc("/reservations", "0.8", "weekly"),
          loc("/recipes", "0.8", "weekly"),
          loc("/gift-cards", "0.8", "weekly"),
          loc("/faq", "0.7", "monthly"),
          loc("/delivery", "0.7", "weekly"),
          loc("/catering", "0.7", "weekly"),
          loc("/happy-hour", "0.7", "weekly"),
          loc("/allergens", "0.8", "weekly"),
          loc("/dietary", "0.8", "weekly"),
          loc("/hours", "0.8", "weekly"),
          loc("/deals", "0.8", "weekly"),
          loc("/menu-data", "0.7", "weekly"),
          loc("/breakfast", "0.8", "weekly"),
          loc("/waffles", "0.8", "weekly"),
          loc("/hashbrowns", "0.8", "weekly"),
          loc("/editors", "0.6", "monthly"),
          loc("/updates", "0.6", "monthly"),
          loc("/about", "0.6", "monthly"),
          loc("/contact", "0.6", "monthly"),
          loc("/author", "0.6", "monthly"),
          loc("/sitemap", "0.4", "monthly"),
          loc("/methodology", "0.6", "monthly"),
          loc("/privacy-policy", "0.3", "yearly"),
          loc("/disclaimer", "0.3", "yearly"),
          loc("/terms", "0.3", "yearly"),
          loc("/editorial-policy", "0.3", "yearly"),
          loc("/cookie-policy", "0.3", "yearly"),
        ];

        // 13 Central Menu Categories
        const categoryPages = CENTRAL_MENU_CATEGORIES.map((c) =>
          loc(c.href, "0.8", "weekly")
        );

        // Blog Posts
        const blogPostPages = blogPosts.map((b) =>
          loc(`/blog/${b.slug}`, "0.7", "monthly", b.lastUpdated ?? TODAY)
        );

        // Menu Items
        const menuItemPages = menu.map((m) =>
          loc(`/menu/${m.category}/${m.slug}`, "0.6", "monthly", m.updatedAt ?? TODAY)
        );

        // Location State Directories
        const locationStatePages = locationsData.map((state) =>
          loc(`/locations/${state.stateSlug}`, "0.8", "weekly")
        );

        // Location Store Pages
        const locationStorePages = locationsData.flatMap((state) =>
          state.cities.flatMap((city) =>
            city.stores.map((store) =>
              loc(`/locations/${state.stateSlug}/${store.slug}`, "0.7", "weekly")
            )
          )
        );

        const allUrls = [
          ...staticPages,
          ...categoryPages,
          ...blogPostPages,
          ...menuItemPages,
          ...locationStatePages,
          ...locationStorePages,
        ];

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
          `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
          ...allUrls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
            "X-Robots-Tag": "noindex",
          },
        });
      },
    },
  },
});
