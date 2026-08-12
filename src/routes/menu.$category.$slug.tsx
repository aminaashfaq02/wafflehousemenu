import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import type { MenuItem } from "@/data/menu";
import { categories, getItem, relatedItems } from "@/data/menu";
import { MenuCard } from "@/components/menu-card";
import { Clock, Flame, Leaf } from "lucide-react";

export const Route = createFileRoute("/menu/$category/$slug")({
  loader: ({ params }) => {
    const item = getItem(params.slug);
    if (!item || item.category !== params.category) throw notFound();
    return {
      item,
      related: relatedItems(item.slug, 3),
      category: categories.find((c) => c.id === item.category)!,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Item not found" }, { name: "robots", content: "noindex" }] };
    }
    const { item } = loaderData;
    const BASE = "https://wafflehousemenu.com";
    const url = `/menu/${item.category}/${item.slug}`;
    const absUrl = `${BASE}${url}`;
    const title = `${item.name} — Waffle House Menu, Price & Calories`;
    const description = `${item.tagline} Price $${item.price.toFixed(2)}, ${item.nutrition.calories} calories. Full ingredients and nutrition.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: absUrl },
        { property: "og:locale", content: "en_US" },
        { property: "og:image", content: item.image },
        { property: "og:image:alt", content: `${item.name} — Waffle House` },
        { property: "twitter:image", content: item.image },
      ],
      links: [{ rel: "canonical", href: absUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MenuItem",
            name: item.name,
            description: item.description,
            image: item.image,
            url: absUrl,
            inLanguage: "en-US",
            offers: {
              "@type": "Offer",
              price: item.price.toFixed(2),
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              url: absUrl,
            },
            nutrition: {
              "@type": "NutritionInformation",
              calories: `${item.nutrition.calories} cal`,
              fatContent: `${item.nutrition.fatG} g`,
              proteinContent: `${item.nutrition.proteinG} g`,
              carbohydrateContent: `${item.nutrition.carbsG} g`,
              sodiumContent: `${item.nutrition.sodiumMg} mg`,
              sugarContent: `${item.nutrition.sugarG} g`,
            },
            suitableForDiet: item.allergens.length ? undefined : "https://schema.org/GlutenFreeDiet",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://wafflehousemenu.com/" },
              { "@type": "ListItem", position: 2, name: "Menu", item: "https://wafflehousemenu.com/menu" },
              { "@type": "ListItem", position: 3, name: loaderData.category.name, item: `https://wafflehousemenu.com/menu/${item.category}` },
              { "@type": "ListItem", position: 4, name: item.name, item: absUrl },
            ],
          }),
        },
      ],
    };
  },
  component: ItemPage,
  notFoundComponent: () => (
    <div className="container-editorial py-24 text-center">
      <h1 className="font-display text-3xl font-semibold">Menu item not found</h1>
      <Link to="/menu" className="btn-primary mt-6">Back to menu</Link>
    </div>
  ),
});

function NutritionRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-3 last:border-b-0">
      <dt className="text-sm text-ink-soft">{label}</dt>
      <dd className="font-display text-base font-semibold">{value}</dd>
    </div>
  );
}

function ItemPage() {
  const data = Route.useLoaderData() as { item: MenuItem; related: MenuItem[]; category: { id: string; name: string; blurb: string; image: string } };
  const { item, related, category } = data;
  const n = item.nutrition;
  return (
    <article>
      <section className="border-b border-border bg-surface">
        <div className="container-editorial grid gap-10 py-12 md:grid-cols-2 md:py-20">
          <div className="overflow-hidden rounded-3xl border border-border">
            <img
              src={item.image}
              alt={`${item.name} — ${item.tagline}`}
              width={1200}
              height={900}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-ink-soft">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="px-2">/</span>
              <Link to="/menu" className="hover:text-primary">Menu</Link>
              <span className="px-2">/</span>
              <Link to="/menu/$category" params={{ category: item.category }} className="hover:text-primary">
                {category.name}
              </Link>
              <span className="px-2">/</span>
              <span aria-current="page">{item.name}</span>
            </nav>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="chip">{category.name}</span>
              {item.popular && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Flame className="h-3.5 w-3.5" aria-hidden /> Popular
                </span>
              )}
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {item.name}
            </h1>
            <p className="mt-3 text-lg text-ink-soft">{item.tagline}</p>
            <p className="mt-6 text-base leading-relaxed text-foreground">{item.description}</p>

            <dl className="mt-8 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-background p-5">
              <div>
                <dt className="text-xs uppercase tracking-widest text-ink-soft">Price</dt>
                <dd className="mt-1 font-display text-2xl font-semibold text-primary">${item.price.toFixed(2)}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-ink-soft">Calories</dt>
                <dd className="mt-1 font-display text-2xl font-semibold">{n.calories}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-widest text-ink-soft">Protein</dt>
                <dd className="mt-1 font-display text-2xl font-semibold">{n.proteinG}g</dd>
              </div>
            </dl>

            <p className="mt-4 text-xs text-ink-soft">
              <Clock className="mr-1 inline h-3.5 w-3.5" aria-hidden />
              Last updated {item.updatedAt}
            </p>
          </div>
        </div>
      </section>

      <div className="container-editorial grid gap-10 py-14 md:grid-cols-3 md:py-20">
        <div className="md:col-span-2">
          <section aria-labelledby="ing-heading">
            <h2 id="ing-heading" className="font-display text-2xl font-semibold">Ingredients</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {item.ingredients.map((i) => (
                <li key={i} className="flex items-center gap-2 text-foreground">
                  <Leaf className="h-4 w-4 text-success" aria-hidden />
                  {i}
                </li>
              ))}
            </ul>
          </section>

          <div className="rule-editorial my-10" />

          <section aria-labelledby="cust-heading">
            <h2 id="cust-heading" className="font-display text-2xl font-semibold">Make it yours</h2>
            <p className="mt-2 text-ink-soft">Popular customizations at Waffle House:</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.customizations.map((c) => (
                <li key={c} className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm">
                  {c}
                </li>
              ))}
            </ul>
          </section>

          <div className="rule-editorial my-10" />

          <section aria-labelledby="alg-heading">
            <h2 id="alg-heading" className="font-display text-2xl font-semibold">Allergens</h2>
            {item.allergens.length ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {item.allergens.map((a) => (
                  <li key={a} className="rounded-full bg-warning/10 px-3 py-1.5 text-sm font-medium capitalize text-warning">
                    {a}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-ink-soft">No major allergens listed.</p>
            )}
          </section>
        </div>

        <aside aria-labelledby="nut-heading" className="md:col-span-1">
          <div className="sticky top-24 rounded-3xl border border-border bg-surface p-6">
            <h2 id="nut-heading" className="font-display text-xl font-semibold">Nutrition facts</h2>
            <p className="mt-1 text-xs text-ink-soft">Per serving. Estimates.</p>
            <dl className="mt-4">
              <NutritionRow label="Calories" value={`${n.calories}`} />
              <NutritionRow label="Total fat" value={`${n.fatG} g`} />
              <NutritionRow label="Saturated fat" value={`${n.saturatedFatG} g`} />
              <NutritionRow label="Carbohydrates" value={`${n.carbsG} g`} />
              <NutritionRow label="Sugars" value={`${n.sugarG} g`} />
              <NutritionRow label="Protein" value={`${n.proteinG} g`} />
              <NutritionRow label="Sodium" value={`${n.sodiumMg} mg`} />
            </dl>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="rel-heading" className="border-t border-border bg-surface">
          <div className="container-editorial py-14 md:py-20">
            <h2 id="rel-heading" className="font-display text-3xl font-semibold">You might also like</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <MenuCard key={r.slug} item={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
