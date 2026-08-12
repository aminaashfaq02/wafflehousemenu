import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { categories, itemsByCategory, type CategoryId, type MenuItem } from "@/data/menu";
import { CategoryMasterView, type MasterItem } from "@/components/category-master-view";
import { AllStarPageView } from "@/components/all-star-view";

import subscribeBgImg from "@/assets/breakfast-subscribe-bg.jpg";
import videoImg1 from "@/assets/menu-highlight-breakfast.jpg";
import videoImg2 from "@/assets/breakfast-table-cooking.jpg";
import videoImg3 from "@/assets/hero-waffles.jpg";
import videoImg4 from "@/assets/menu-cta-diner.jpg";

const SITE = "https://wafflehousemenu.com";

function toMasterItem(it: MenuItem): MasterItem {
  return {
    slug: it.slug,
    name: it.name,
    price: it.price,
    calories: it.nutrition.calories,
    image: it.image,
    href: `/menu/${it.category}/${it.slug}`,
  };
}

export const Route = createFileRoute("/menu/$category/")({
  loader: ({ params }) => {
    const cat = categories.find((c) => c.id === params.category);
    if (!cat) throw notFound();
    const items = itemsByCategory(cat.id as CategoryId);
    return { category: cat, items };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found" }, { name: "robots", content: "noindex" }] };
    }
    const { category, items } = loaderData;
    const url = `${SITE}/menu/${category.id}`;
    const title = `${category.name} Menu — Waffle House Prices & Calories 2026`;
    const description = `${category.blurb} Explore every ${category.name.toLowerCase()} item on the Waffle House menu with U.S. prices and calorie counts.`;
    const image = `${SITE}${category.image}`;
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
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
              { "@type": "ListItem", position: 2, name: "Menu", item: `${SITE}/menu` },
              { "@type": "ListItem", position: 3, name: category.name, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `Waffle House ${category.name} Menu`,
            url,
            inLanguage: "en-US",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: `Waffle House ${category.name} recipes`,
            numberOfItems: items.length,
            itemListElement: items.map((it, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: it.name,
            })),
          }),
        },
      ],
    };
  },
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="container-editorial py-24 text-center">
      <h1 className="font-display text-3xl font-semibold">Category not found</h1>
      <Link to="/menu" className="btn-primary mt-6">Back to menu</Link>
    </div>
  ),
});

function CategoryPage() {
  const { category, items } = Route.useLoaderData();
  if (category.id === "all-star-special") {
    return <AllStarPageView page={1} />;
  }
  const masterItems: MasterItem[] = items.map(toMasterItem);
  const popularItems =
    masterItems.length > 0
      ? [...masterItems].sort((a, b) => (b.price ?? 0) - (a.price ?? 0)).slice(0, 8)
      : masterItems;
  const lighterItems =
    masterItems.length > 0
      ? [...masterItems].sort((a, b) => (a.calories ?? 0) - (b.calories ?? 0)).slice(0, 8)
      : masterItems;

  return (
    <CategoryMasterView
      categoryId={category.id}
      introImg={category.image}
      introImgAlt={`${category.name} at Waffle House`}
      breadcrumbLabel={category.name}
      h1={`The Waffle House ${category.name} Menu, Cover to Cover.`}
      featuredName={masterItems[0]?.name ?? category.name}
      intro={
        <>
          <p>{category.blurb}</p>
          <p className="mt-4">
            Below: every {category.name.toLowerCase()} item on the Waffle House
            menu with 2026 U.S. prices, calorie counts and honest editor notes.
          </p>
        </>
      }
      popular={{
        eyebrow: "Reader Favorites",
        heading: `The ${category.name} Readers Order Most`,
        intro: `The ${category.name.toLowerCase()} plates our readers come back for again and again.`,
        items: popularItems,
      }}
      lighter={{
        eyebrow: "Lighter Choices",
        heading: `Lower-Calorie ${category.name} Picks`,
        intro: `The lightest ways to enjoy ${category.name.toLowerCase()} at Waffle House — sorted by calories.`,
        items: lighterItems,
      }}
      videos={{
        heading: `${category.name} at Waffle House, Behind the Grill`,
        intro:
          "Short videos on how the classics are cooked, ordered and served — worth a few minutes before your next visit.",
        items: [
          { id: "1", title: "How the All-Star Special™ Comes Together", duration: "4:12", youtubeId: "iu-LBY6h6bU", image: videoImg1 },
          { id: "2", title: "Ordering Like a Regular", duration: "3:28", youtubeId: "K4TOrB7at0Y", image: videoImg2 },
          { id: "3", title: "Waffle House Waffles, Explained", duration: "5:07", youtubeId: "9v3zqRq8_2E", image: videoImg3 },
          { id: "4", title: "Inside a 24/7 Waffle House Kitchen", duration: "6:41", youtubeId: "7d16CpWp-ok", image: videoImg4 },
        ],
      }}
      allRecipes={{
        heading: `Every ${category.name} Item on the Menu`,
        intro: `The complete Waffle House ${category.name.toLowerCase()} lineup — with 2026 prices and calories.`,
        items: masterItems,
      }}
      subscribeBgImg={subscribeBgImg}
      subscribeIdSuffix={`cat-${category.id}`}
    />
  );
}
