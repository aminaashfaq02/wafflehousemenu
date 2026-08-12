import { createFileRoute } from "@tanstack/react-router";

import introImg from "@/assets/cat-sides.jpg";
import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/tbone-steak.jpg";
import videoImg4 from "@/assets/breakfast-nutrition-prep.jpg";

import { CategoryMasterView } from "@/components/category-master-view";
import { sideMasterItems, sideFaqs } from "@/data/sides-mapped";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/menu/sides/page/$page")({
  head: ({ params }) => {
    const pageNum = parseInt(params.page || "2", 10);
    const url = `${SITE}/menu/sides/page/${pageNum}`;
    const title = `Waffle House Sides, Pies & Desserts Menu — Page ${pageNum} | Prices & Calories 2026`;
    const description = `Waffle House Sides, Pies & Desserts Menu recipes — Page ${pageNum} of 2. Verified 2026 prices and calorie counts.`;
    const image = `${SITE}${introImg}`;
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
      links: [
        { rel: "canonical", href: url },
        { rel: "prev", href: pageNum === 2 ? `${SITE}/menu/sides` : `${SITE}/menu/sides/page/${pageNum - 1}` },
      ],
    };
  },
  component: SidesPageNumbered,
});

function SidesPageNumbered() {
  const { page } = Route.useParams();
  const pageNum = parseInt(page || "2", 10);

  return (
    <CategoryMasterView
      categoryId="sides"
      introImg={introImg}
      introImgAlt="Waffle House Southern Pecan Pie slice and side dishes"
      breadcrumbLabel="Sides, Pies & Desserts"
      h1={`Waffle House Sides, Pies & Desserts Menu — Page ${pageNum}`}
      featuredName={sideMasterItems[0]?.name ?? "Side Bacon"}
      intro={
        <>
          <p>
            Explore our complete line of Southern diner sides and bakery desserts. Page {pageNum} of official menu options with 2026 U.S. prices and calorie counts.
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "10 Most Popular Southern Sides & Desserts",
        intro:
          "Explore top-rated Waffle House sides, grits bowls, and pie slices, ranked by reader popularity.",
        items: sideMasterItems.slice(0, 10),
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "House-Made Southern Diner Treats",
        intro:
          "Crispy griddled meats, stone-ground grits, biscuits, chili, and sweet bakery pies.",
        items: sideMasterItems.slice(4, 14),
      }}
      videos={{
        heading: "Sides, Pies & Desserts at Waffle House, Behind the Grill",
        intro:
          "Watch how Waffle House cooks sides and serves Southern pies in these feature videos.",
        items: [
          {
            id: "1",
            title: "Waffle House Southern Pecan Pie & Desserts",
            duration: "4:15",
            youtubeId: "Tm9VDrikQok",
            videoUrl: "https://www.youtube.com/watch?v=Tm9VDrikQok",
            image: videoImg1,
          },
          {
            id: "2",
            title: "Waffle House Side Meats & Chili Review",
            duration: "5:30",
            youtubeId: "-XhtVWy7zfo",
            videoUrl: "https://www.youtube.com/watch?v=-XhtVWy7zfo",
            image: videoImg2,
          },
          {
            id: "3",
            title: "How to Make Waffle House Creamy Cheese Grits",
            duration: "6:12",
            youtubeId: "sgciLKPlJyI",
            videoUrl: "https://www.youtube.com/watch?v=sgciLKPlJyI",
            image: videoImg3,
          },
          {
            id: "4",
            title: "Waffle House Triple Chocolate Pie Taste Test",
            duration: "7:45",
            youtubeId: "B8714mF6_Hk",
            videoUrl: "https://www.youtube.com/watch?v=B8714mF6_Hk",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: `Waffle House Sides, Pies & Desserts Menu — Page ${pageNum}`,
        intro: `Official Waffle House sides, pies, and desserts with verified 2026 prices and calorie counts (Page ${pageNum}).`,
        items: sideMasterItems,
      }}
      faqs={sideFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix={`sides-p${pageNum}`}
      activePage={pageNum}
    />
  );
}
