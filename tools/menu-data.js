// Shared menu data: loads tools/data/menu.json and adds nutrition totals computed from the component values in
// tools/data/components.json, so every page shows the same numbers for the same item.
const fs = require('fs');
const path = require('path');

const DATA = path.join(__dirname, 'data');
const components = JSON.parse(fs.readFileSync(path.join(DATA, 'components.json'), 'utf8'));
const menu = JSON.parse(fs.readFileSync(path.join(DATA, 'menu.json'), 'utf8'));
// Prices and observed ranges live in prices.json (the single source for prices); menu.json holds composition.
const prices = JSON.parse(fs.readFileSync(path.join(DATA, 'prices.json'), 'utf8'));
function priceOf(name) {
  if (!(name in prices.items)) throw new Error('No price entry for ' + name);
  const [price, range] = prices.items[name];
  return { price, range };
}

const ALLERGEN_ORDER = ['Milk', 'Egg', 'Wheat', 'Soy', 'Peanut', 'Tree Nuts'];

function nutrition(recipe) {
  const t = { cal: 0, protein: 0, carbs: 0, fat: 0, sodium: 0, allergens: new Set() };
  for (const [id, qty] of recipe) {
    const c = components[id];
    if (!c) throw new Error('Unknown component ' + id);
    for (const k of ['cal', 'protein', 'carbs', 'fat', 'sodium']) t[k] += c[k] * qty;
    c.allergens.forEach((a) => t.allergens.add(a));
  }
  return { ...t, allergens: ALLERGEN_ORDER.filter((a) => t.allergens.has(a)) };
}

const slug = (s) => s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const categories = menu.categories.map((cat) => ({
  ...cat,
  items: cat.items.map((it) => ({ ...it, slug: slug(it.name), category: cat.id, ...nutrition(it.recipe), ...priceOf(it.name) })),
  toppings: (cat.toppings || []).map((tp) => ({ ...tp, ...nutrition([[tp.id, 1]]), price: prices.toppingPrice })),
}));
const items = categories.flatMap((c) => c.items);
const byName = Object.fromEntries(items.map((i) => [i.name, i]));

const money = (p) => (p == null ? 'Varies' : '$' + p.toFixed(2));

module.exports = { categories, items, byName, components, updated: menu.updated, money, slug, toppingPrice: prices.toppingPrice };
