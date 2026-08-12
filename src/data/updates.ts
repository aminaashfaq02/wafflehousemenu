export interface MenuUpdate {
  slug: string;
  title: string;
  summary: string;
  updatedAt: string;
  tag: "Prices" | "New item" | "Nutrition" | "Seasonal";
}

export const menuUpdates: MenuUpdate[] = [
  {
    slug: "july-2026-price-review",
    title: "July 2026 price review across all 6 categories",
    summary:
      "We re-verified prices at 24 locations. Waffles and hashbrowns held steady; a handful of breakfast plates ticked up by 25–40¢.",
    updatedAt: "2026-07-14",
    tag: "Prices",
  },
  {
    slug: "all-star-nutrition-refresh",
    title: "All-Star Special nutrition panel refreshed",
    summary:
      "Updated calories, fat and sodium after a recent portion review. The new numbers are now live on the item page.",
    updatedAt: "2026-07-10",
    tag: "Nutrition",
  },
  {
    slug: "peanut-butter-waffle-added",
    title: "Peanut Butter Chip Waffle added to the guide",
    summary:
      "A quietly popular off-menu option gets a full write-up, with price, calories and how locals actually order it.",
    updatedAt: "2026-07-06",
    tag: "New item",
  },
  {
    slug: "hashbrowns-modifiers-expanded",
    title: "Hashbrown modifiers: every 'the way' explained",
    summary:
      "Smothered, covered, chunked, diced, peppered, capped, topped, country — the full modifier glossary is now on the hashbrowns page.",
    updatedAt: "2026-07-02",
    tag: "Seasonal",
  },
];
