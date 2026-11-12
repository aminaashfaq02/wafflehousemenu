// Sets month + year titles on the data-driven pages (handover note 3.6: "Keyword November 2026").
// The month comes from the data's compiled date (menu.json "updated"), not from today's date, so a
// title never claims a month the prices were not compiled in. Refresh the data and rebuild, and the
// month moves with it. Each title is length-checked against "September", the longest month name.
// Article titles live in tools/content/*.js and use the same monthYear() helper.
// Usage: node tools/build-titles.js
const fs = require('fs');
const path = require('path');
const { byName: B, items, categories, money, monthYear } = require('./menu-data');

const ROOT = path.join(__dirname, '..');
const MY = monthYear();
const highProtein = items.filter((i) => i.protein >= 20).length;
const lowCal = items.filter((i) => i.cal < 600).length;

const TITLES = {
  'index.html': (m) => `Waffle House Menu Prices ${m}: All-Star ${money(B['All-Star Special with Bacon'].price)}`,
  'menu.html': (m) => `Waffle House Menu with Prices ${m}: Waffles ${money(B['Classic Waffle'].price)}`,
  'prices-by-state.html': (m) => `Waffle House Prices by State ${m}: All-Star ${money(B['All-Star Special with Bacon'].price)}`,
  'menu/pdf/index.html': (m) => `Waffle House Menu PDF ${m}: Printable With Prices`,
  'nutrition.html': (m) => `Waffle House Nutrition Facts & Calories ${m}`,
  'waffle-house-calories-allergies/index.html': (m) => `Waffle House Allergen Chart & Calories ${m}`,
  'waffle-house-dietary-guide/index.html': (m) => `Waffle House Dietary Guide ${m}: Low-Carb Options`,
  'diet/high-protein/index.html': (m) => `Waffle House High-Protein Menu ${m}: ${highProtein} Dishes`,
  'diet/low-calorie/index.html': (m) => `Waffle House Low-Calorie Menu ${m}: ${lowCal} Dishes`,
  'coupons.html': (m) => `Waffle House Coupons & Deals ${m}: Ways to Save`,
};

// Meta descriptions for the price pages (note 3.2): two real prices, the month and the year, about 150
// characters. Budgeted against "September" like the titles, with a 160-character ceiling.
const AS = B['All-Star Special with Bacon'], EGG = B['Two Egg Breakfast'], WAF = B['Classic Waffle'], COF = B.Coffee;
const priced = items.filter((i) => i.price != null).sort((a, b) => a.price - b.price);
const DESCS = {
  'index.html': (m) => `Waffle House menu prices for ${m}: All-Star Special ${money(AS.price)}, Two Egg Breakfast ${money(EGG.price)}. Typical prices and calories for all ${items.length} items.`,
  'menu.html': (m) => `Full Waffle House menu with prices, ${m}: classic waffle ${money(WAF.price)}, All-Star Special ${money(AS.price)}. Calories for all ${items.length} items across ${categories.length} categories.`,
  'prices-by-state.html': (m) => `Typical Waffle House prices, ${m}: All-Star Special ${money(AS.price)} (${money(AS.range[0])} to ${money(AS.range[1])} seen), coffee ${money(COF.price)}. Why prices vary by state and city.`,
  'menu/pdf/index.html': (m) => `Printable Waffle House menu, ${m}: ${items.length} items with calories and typical prices, from ${money(priced[0].price)} to ${money(priced[priced.length - 1].price)}. Print on Letter or A4.`,
  'coupons.html': (m) => `Waffle House coupons and deals, ${m}: no working promo codes, the free Regulars Club, and value plates like the Two Egg Breakfast at ${money(EGG.price)}.`,
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const unesc = (s) => s.replace(/&quot;/g, '"').replace(/&amp;/g, '&');
const longest = (fn) => fn(MY.replace(/^\S+/, 'September'));

for (const [file, fn] of Object.entries(DESCS)) {
  const worst = longest(fn);
  if (worst.length > 160) throw new Error(`${file}: description is ${worst.length} chars in September: ${worst}`);
  const desc = fn(MY);
  const p = path.join(ROOT, file);
  let h = fs.readFileSync(p, 'utf8');
  const old = unesc((h.match(/<meta\s+name="description"\s+content="([^"]*)"/) || [])[1] || '');
  h = h.replace(/(<meta\s+(?:name="description"|property="og:description"|name="twitter:description")\s+content=")[^"]*(")/g, (m, a, b) => a + esc(desc) + b);
  if (old) h = h.split(JSON.stringify(old)).join(JSON.stringify(desc)); // JSON-LD descriptions that mirror it
  fs.writeFileSync(p, h);
  console.log(`desc ${desc.length} (${worst.length} in Sept) ${file}`);
}

for (const [file, fn] of Object.entries(TITLES)) {
  const worst = longest(fn);
  if (worst.length > 60) throw new Error(`${file}: title is ${worst.length} chars in September: ${worst}`);
  const title = fn(MY);
  const p = path.join(ROOT, file);
  let h = fs.readFileSync(p, 'utf8');
  const old = unesc((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
  if (!old) throw new Error('no <title> in ' + file);
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  h = h.replace(/(<meta\s+(?:property="og:title"|name="twitter:title"|name="title")\s+content=")[^"]*(")/g, (m, a, b) => a + esc(title) + b);
  // JSON-LD WebPage names that mirror the old title
  h = h.split(JSON.stringify(old)).join(JSON.stringify(title));
  fs.writeFileSync(p, h);
  console.log(`${String(title.length).padStart(2)} (${String(worst.length).padStart(2)} in Sept) ${file}: ${title}`);
}
