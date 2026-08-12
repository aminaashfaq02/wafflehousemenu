import { createFileRoute, notFound } from "@tanstack/react-router";
import introImg from "@/assets/cat-sandwiches.jpg";
import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/tbone-steak.jpg";
import videoImg4 from "@/assets/breakfast-nutrition-prep.jpg";

import {
  CategoryMasterView,
} from "@/components/category-master-view";
import {
  sandwichMasterItems,
  sandwichFaqs,
} from "./menu.breakfast-sandwiches.index";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/menu/breakfast-sandwiches/page/$page")({
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
    const url = `${SITE}/menu/breakfast-sandwiches/page/${page}`;
    const totalPages = Math.ceil(sandwichMasterItems.length / 12);
    const title = `Waffle House Breakfast Sandwiches & Melts Menu — Page ${page} of ${totalPages}`;
    const description = `Every Waffle House Breakfast Sandwich & Melt — Bacon Egg & Cheese, Sausage, Ham, Texas Melts (Page ${page} of ${totalPages}).`;
    const image = `${SITE}${introImg}`;

    const prev = page - 1;
    const next = page + 1;
    const links: { rel: string; href: string }[] = [{ rel: "canonical", href: url }];
    links.push({
      rel: "prev",
      href: prev === 1 ? `${SITE}/menu/breakfast-sandwiches` : `${SITE}/menu/breakfast-sandwiches/page/${prev}`,
    });
    if (next <= totalPages) {
      links.push({ rel: "next", href: `${SITE}/menu/breakfast-sandwiches/page/${next}` });
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
              { "@type": "ListItem", position: 3, name: "Breakfast Sandwiches & Melts", item: `${SITE}/menu/breakfast-sandwiches` },
              { "@type": "ListItem", position: 4, name: `Page ${page}`, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: PaginatedSandwichesPage,
});

function PaginatedSandwichesPage() {
  const { page } = Route.useLoaderData();

  return (
    <CategoryMasterView
      categoryId="breakfast-sandwiches"
      introImg={introImg}
      introImgAlt="Waffle House Texas Bacon Egg & Cheese Melt on grilled Texas toast"
      breadcrumbLabel="Breakfast Sandwiches & Melts"
      h1="The Waffle House Breakfast Sandwiches & Melts Menu, Cover to Cover."
      featuredName={sandwichMasterItems[0]?.name ?? "Egg Sandwich"}
      intro={
        <>
          <p>
            Handhelds off the Waffle House flat-top — Grade A eggs, melted American cheese,
            and your choice of hickory bacon, pork sausage, chicken sausage, city ham or grilled steak.
          </p>
          <p className="mt-4">
            Below: remaining breakfast sandwiches and melts on page {page} with 2026 U.S. prices
            and calorie counts.
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "10 Most Popular Sandwiches & Melts",
        intro:
          "Explore the top-rated Waffle House breakfast handhelds, ranked by reader popularity.",
        items: sandwichMasterItems.slice(0, 10),
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "Texas Melts & Classic Toast Handhelds",
        intro:
          "Crisp toasted sandwiches and gooey Texas toast melts made fresh on the flat-top.",
        items: sandwichMasterItems.slice(9, 19),
      }}
      videos={{
        heading: "Breakfast Sandwiches & Melts at Waffle House, Behind the Grill",
        intro:
          "Watch how Waffle House cooks eggs, grills meats, and builds melted Texas toast handhelds in these feature videos.",
        items: [
          {
            id: "1",
            title: "Waffle House Texas Bacon Egg Cheese Melt Recipe",
            duration: "4:15",
            youtubeId: "oKS3ZY6ud_I",
            videoUrl: "https://www.youtube.com/watch?v=oKS3ZY6ud_I",
            image: videoImg1,
          },
          {
            id: "2",
            title: "Copycat Waffle House Sausage Egg & Cheese Sandwich",
            duration: "5:30",
            youtubeId: "Jy_tg7Ktqes",
            videoUrl: "https://www.youtube.com/watch?v=Jy_tg7Ktqes",
            image: videoImg2,
          },
          {
            id: "3",
            title: "How to Make Waffle House Melts at Home",
            duration: "6:12",
            youtubeId: "FsMEaCtT3TI",
            videoUrl: "https://www.youtube.com/watch?v=FsMEaCtT3TI",
            image: videoImg3,
          },
          {
            id: "4",
            title: "Waffle House Breakfast Sandwiches Review",
            duration: "7:45",
            youtubeId: "RFPjg24hdSY",
            videoUrl: "https://www.youtube.com/watch?v=RFPjg24hdSY",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: `Waffle House Breakfast Sandwiches & Melts Menu — Page ${page}`,
        intro:
          `Exploring the remaining 7 breakfast sandwiches and melts on page ${page} with verified 2026 prices and calorie counts.`,
        items: sandwichMasterItems,
      }}
      faqs={sandwichFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix="breakfast-sandwiches"
      activePage={page}
    />
  );
}
