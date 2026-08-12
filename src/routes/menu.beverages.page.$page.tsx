import { createFileRoute } from "@tanstack/react-router";

import introImg from "@/assets/cat-beverages.jpg";
import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/tbone-steak.jpg";
import videoImg4 from "@/assets/breakfast-nutrition-prep.jpg";

import { CategoryMasterView } from "@/components/category-master-view";
import { beverageMasterItems, beverageFaqs } from "@/data/beverages-mapped";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/menu/beverages/page/$page")({
  head: ({ params }) => {
    const pageNum = parseInt(params.page || "2", 10);
    const url = `${SITE}/menu/beverages/page/${pageNum}`;
    const title = `Waffle House Beverages Menu — Page ${pageNum} | Prices & Calories 2026`;
    const description = `Waffle House Hot & Cold Drink Menu recipes — Page ${pageNum} of 2. Verified 2026 prices and calorie counts.`;
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
        { rel: "prev", href: pageNum === 2 ? `${SITE}/menu/beverages` : `${SITE}/menu/beverages/page/${pageNum - 1}` },
      ],
    };
  },
  component: BeveragesPageNumbered,
});

function BeveragesPageNumbered() {
  const { page } = Route.useParams();
  const pageNum = parseInt(page || "2", 10);

  return (
    <CategoryMasterView
      categoryId="beverages"
      introImg={introImg}
      introImgAlt="Waffle House signature coffee mug and iced beverages"
      breadcrumbLabel="Beverages (Hot & Cold Drinks)"
      h1={`Waffle House Beverages Menu — Page ${pageNum}`}
      featuredName={beverageMasterItems[0]?.name ?? "Classic Blend Coffee"}
      intro={
        <>
          <p>
            Explore our complete line of hot coffees, Southern teas, fountain sodas, juices, and cold milk options. Page {pageNum} of official menu drinks with 2026 U.S. prices and calorie counts.
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "10 Most Popular Hot & Cold Drinks",
        intro:
          "Explore top-rated Waffle House beverages, ranked by reader popularity.",
        items: beverageMasterItems.slice(0, 10),
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "Fresh Brews & Fountain Drinks",
        intro:
          "Bottomless diner coffee, Alice's Iced Tea™, fruit juices, and cold chocolate milk.",
        items: beverageMasterItems.slice(10, 20),
      }}
      videos={{
        heading: "Beverages at Waffle House, Behind the Counter",
        intro:
          "Watch how Waffle House brews signature coffee and prepares iced tea in these feature videos.",
        items: [
          {
            id: "1",
            title: "Waffle House Signature Coffee & Brews",
            duration: "4:15",
            youtubeId: "bxPwC8qSHtA",
            videoUrl: "https://www.youtube.com/watch?v=bxPwC8qSHtA",
            image: videoImg1,
          },
          {
            id: "2",
            title: "Alice's Iced Tea & Teamonade Recipe",
            duration: "5:30",
            youtubeId: "cGtAyuLk1N4",
            videoUrl: "https://www.youtube.com/watch?v=cGtAyuLk1N4",
            image: videoImg2,
          },
          {
            id: "3",
            title: "Waffle House Fountain Drinks & Juices",
            duration: "6:12",
            youtubeId: "tpeUqre_KuQ",
            videoUrl: "https://www.youtube.com/watch?v=tpeUqre_KuQ",
            image: videoImg3,
          },
          {
            id: "4",
            title: "Waffle House Coffee & Beverage Menu Overview",
            duration: "7:45",
            youtubeId: "A-X9FML_Vno",
            videoUrl: "https://www.youtube.com/watch?v=A-X9FML_Vno",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: `Waffle House Beverages (Hot & Cold Drinks) Menu — Page ${pageNum}`,
        intro: `Official Waffle House hot and cold drinks with verified 2026 prices and calorie counts (Page ${pageNum}).`,
        items: beverageMasterItems,
      }}
      faqs={beverageFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix={`beverages-p${pageNum}`}
      activePage={pageNum}
    />
  );
}
