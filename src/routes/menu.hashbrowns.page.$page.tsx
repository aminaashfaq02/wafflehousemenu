import { createFileRoute, notFound } from "@tanstack/react-router";
import introImg from "@/assets/cat-hashbrowns.jpg";
import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/tbone-steak.jpg";
import videoImg4 from "@/assets/breakfast-nutrition-prep.jpg";

import {
  CategoryMasterView,
} from "@/components/category-master-view";
import { hashbrownMasterItems, hashbrownFaqs } from "@/data/hashbrowns-mapped";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/menu/hashbrowns/page/$page")({
  beforeLoad: ({ params }) => {
    const pageNum = Number(params.page);
    if (!Number.isInteger(pageNum) || pageNum < 2) throw notFound();
    return { page: pageNum };
  },
  loader: ({ params }) => ({ page: Number(params.page) }),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Page not found" }, { name: "robots", content: "noindex" }] };
    }
    const { page } = loaderData;
    const url = `${SITE}/menu/hashbrowns/page/${page}`;
    const totalPages = Math.ceil(hashbrownMasterItems.length / 12);
    const title = `Waffle House Hashbrowns & All Toppings Menu — Page ${page}`;
    const description = `Every Waffle House hashbrown order — Plain, Smothered, Covered, Chunked, Diced, Peppered, Capped, Topped with Bert's Chili (Page ${page}).`;
    const image = `${SITE}${introImg}`;

    const prev = page - 1;
    const next = page + 1;
    const links: { rel: string; href: string }[] = [{ rel: "canonical", href: url }];
    links.push({
      rel: "prev",
      href: prev === 1 ? `${SITE}/menu/hashbrowns` : `${SITE}/menu/hashbrowns/page/${prev}`,
    });
    if (next <= totalPages) {
      links.push({ rel: "next", href: `${SITE}/menu/hashbrowns/page/${next}` });
    }

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ],
      links,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Menu", item: `${SITE}/menu` },
              { "@type": "ListItem", position: 3, name: "Hashbrowns & All Toppings", item: `${SITE}/menu/hashbrowns` },
              { "@type": "ListItem", position: 4, name: `Page ${page}`, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: PaginatedHashbrownsPage,
});

function PaginatedHashbrownsPage() {
  const { page } = Route.useLoaderData();

  return (
    <CategoryMasterView
      categoryId="hashbrowns"
      introImg={introImg}
      introImgAlt="Waffle House crispy shredded hashbrowns on flat-top griddle"
      breadcrumbLabel="Hashbrowns & Toppings"
      h1="The Waffle House Hashbrowns & All Toppings Menu, Cover to Cover."
      featuredName={hashbrownMasterItems[0]?.name ?? "Regular Hashbrowns (Plain)"}
      intro={
        <>
          <p>
            Shredded real potatoes scattered on a flat-top grill and seared until golden crisp.
            Customize with classic diner toppings: Smothered, Covered, Chunked, Diced, Peppered, Capped, Topped, and Country.
          </p>
          <p className="mt-4">
            Below: remaining hashbrown toppings on page {page} with verified 2026 U.S. prices and calorie counts.
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "10 Most Popular Hashbrown Recipes",
        intro:
          "Explore top-rated Waffle House hashbrown orders and loaded topping combos, ranked by reader popularity.",
        items: hashbrownMasterItems.slice(0, 10),
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "Loaded Hashbrowns & Diner Toppings",
        intro:
          "Crispy griddled potatoes scattered, smothered in onions, covered in cheese, and fully loaded.",
        items: hashbrownMasterItems.slice(3, 13),
      }}
      videos={{
        heading: "Hashbrowns & Toppings at Waffle House, Behind the Grill",
        intro:
          "Watch how Waffle House cooks crispy hashbrowns, sautés onions, and smothers toppings in these feature videos.",
        items: [
          {
            id: "1",
            title: "Waffle House Hashbrowns Lingo & Toppings Explained",
            duration: "4:15",
            youtubeId: "_h0AHCSBX-c",
            videoUrl: "https://www.youtube.com/watch?v=_h0AHCSBX-c",
            image: videoImg1,
          },
          {
            id: "2",
            title: "How to Order Hashbrowns All The Way at Waffle House",
            duration: "5:30",
            youtubeId: "4I9bYSE-d-o",
            videoUrl: "https://www.youtube.com/watch?v=4I9bYSE-d-o",
            image: videoImg2,
          },
          {
            id: "3",
            title: "Crispy Waffle House Hashbrowns at Home",
            duration: "6:12",
            youtubeId: "xcImp-rkcE0",
            videoUrl: "https://www.youtube.com/watch?v=xcImp-rkcE0",
            image: videoImg3,
          },
          {
            id: "4",
            title: "Smothered & Covered Waffle House Hashbrowns Recipe",
            duration: "7:45",
            youtubeId: "3rVJPfAEhi4",
            videoUrl: "https://www.youtube.com/watch?v=3rVJPfAEhi4",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: `Waffle House Hashbrowns & All Toppings Menu — Page ${page}`,
        intro:
          `Exploring the remaining hashbrown topping options on page ${page} with verified 2026 prices and calorie counts.`,
        items: hashbrownMasterItems,
      }}
      faqs={hashbrownFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix="hashbrowns"
      activePage={page}
    />
  );
}
