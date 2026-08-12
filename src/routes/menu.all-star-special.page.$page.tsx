import { createFileRoute } from "@tanstack/react-router";

import introImg from "@/assets/allstar-intro.jpg";
import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/tbone-steak.jpg";
import videoImg4 from "@/assets/breakfast-nutrition-prep.jpg";

import { CategoryMasterView } from "@/components/category-master-view";
import { allStarMasterItems, allStarFaqs } from "@/data/all-star-special-mapped";

const SITE = "https://wafflehousemenu.com";

export const Route = createFileRoute("/menu/all-star-special/page/$page")({
  head: ({ params }) => {
    const pageNum = parseInt(params.page || "2", 10);
    const url = `${SITE}/menu/all-star-special/page/${pageNum}`;
    const title = `Waffle House All-Star Special™ Menu — Page ${pageNum} | Prices & Calories 2026`;
    const description = `Waffle House All-Star Special™ breakfast builds — Page ${pageNum} of 2. Verified 2026 prices and calorie counts.`;
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
        { rel: "prev", href: pageNum === 2 ? `${SITE}/menu/all-star-special` : `${SITE}/menu/all-star-special/page/${pageNum - 1}` },
      ],
    };
  },
  component: AllStarPageNumbered,
});

function AllStarPageNumbered() {
  const { page } = Route.useParams();
  const pageNum = parseInt(page || "2", 10);

  return (
    <CategoryMasterView
      categoryId="all-star-special"
      introImg={introImg}
      introImgAlt="Waffle House All-Star Special signature breakfast platter"
      breadcrumbLabel="All-Star Special"
      h1={`Waffle House Breakfast All-Star Special™ Menu — Page ${pageNum}`}
      featuredName={allStarMasterItems[0]?.name ?? "2 Eggs - Scrambled"}
      intro={
        <>
          <p>
            Explore our complete line of custom egg cooking styles, side options, breads, and premium breakfast meats. Page {pageNum} of official menu options with 2026 U.S. prices and calorie counts.
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: "10 Most Popular All-Star Plate Choices",
        intro:
          "Explore top-rated All-Star Special combo elements and toppings, ranked by reader popularity.",
        items: allStarMasterItems.slice(0, 10),
      }}
      lighter={{
        eyebrow: "Specialty Selection",
        heading: "Fresh Signature Combo Ingredients",
        intro:
          "Fluffy scrambled eggs, sweet cream waffles, toasted slices, crispy hashbrowns, and savory breakfast meats.",
        items: allStarMasterItems.slice(5, 15),
      }}
      videos={{
        heading: "All-Star Special™ at Waffle House, Behind the Counter",
        intro:
          "Watch how Waffle House grills eggs, toasts bread, and pours waffles for the iconic All-Star plate in these feature videos.",
        items: [
          {
            id: "1",
            title: "Waffle House All-Star Special Masterclass",
            duration: "4:15",
            youtubeId: "qKyvOZCRrWE",
            videoUrl: "https://www.youtube.com/watch?v=qKyvOZCRrWE",
            image: videoImg1,
          },
          {
            id: "2",
            title: "Ordering the Ultimate All-Star Breakfast Combo",
            duration: "5:30",
            youtubeId: "ONI9rOeJJlo",
            videoUrl: "https://www.youtube.com/watch?v=ONI9rOeJJlo",
            image: videoImg2,
          },
          {
            id: "3",
            title: "Waffle House Line Cook All-Star Plate Cooking",
            duration: "6:12",
            youtubeId: "UcyYVw_7StQ",
            videoUrl: "https://www.youtube.com/watch?v=UcyYVw_7StQ",
            image: videoImg3,
          },
          {
            id: "4",
            title: "All-Star Special Taste Test & Feast Review",
            duration: "7:45",
            youtubeId: "5JT_LTqgzCE",
            videoUrl: "https://www.youtube.com/watch?v=5JT_LTqgzCE",
            image: videoImg4,
          },
        ],
      }}
      allRecipes={{
        heading: `Waffle House Breakfast All-Star Special™ Menu — Page ${pageNum}`,
        intro: `Official Waffle House All-Star Special™ elements and options with verified 2026 prices and calorie counts (Page ${pageNum}).`,
        items: allStarMasterItems,
      }}
      faqs={allStarFaqs}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix={`allstar-p${pageNum}`}
      activePage={pageNum}
    />
  );
}
