// Writes the answer blocks on hand-written pages (home, menu, nutrition, recipe) between
// <!-- answer:NAME --> and <!-- /answer:NAME --> markers. Every figure is computed from tools/data
// (or, for the recipe, from that page's own recipe card), so an answer can never contradict the
// table it sits above. Run as part of `npm run build:data`.
const fs = require('fs');
const path = require('path');
const { items, byName: B, categories, money, updated } = require('./menu-data');

const ROOT = path.join(__dirname, '..');
const longDate = (iso) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
const fmt = (n) => n.toLocaleString('en-US');
const priced = items.filter((i) => i.price != null).sort((a, b) => a.price - b.price);
const low = priced[0], high = priced[priced.length - 1];
const food = items.filter((i) => i.category !== 'cat-beverages').sort((a, b) => a.cal - b.cal);
const PRICE_BASIS = `Typical prices compiled by Waffle Guide on ${longDate(updated)}. Prices vary by location.`;
const NUTRITION_BASIS = `Nutrition figures compiled by Waffle Guide on ${longDate(updated)}, for each item as normally served.`;

function fill(file, name, html) {
  const p = path.join(ROOT, file);
  let h = fs.readFileSync(p, 'utf8');
  const nl = h.includes('\r\n') ? '\r\n' : '\n';
  html = html.replace(/\r?\n/g, nl);
  const re = new RegExp(`(<!-- answer:${name} -->)[\\s\\S]*?(<!-- /answer:${name} -->)`);
  if (!re.test(h)) throw new Error(`no answer:${name} marker in ${file}`);
  h = h.replace(re, (m, a, b) => a + html + b);
  fs.writeFileSync(p, h);
}

// "Toast (White)" -> "white toast"
const plainName = (n) => n.replace(/^(.+) \((.+)\)$/, '$2 $1').toLowerCase();

const twoEgg = B['Two Egg Breakfast'], allStar = B['All-Star Special with Bacon'], waffle = B['Classic Waffle'];

fill('index.html', 'home', `
      <div id="quick-answer" class="max-w-[740px] mx-auto mb-6 px-2 font-sans">
        <p class="text-[15px] sm:text-base md:text-lg text-[#1C1410] leading-relaxed">A ${twoEgg.name} typically costs <strong>${money(twoEgg.price)}</strong> at Waffle House, a ${waffle.name.toLowerCase()} <strong>${money(waffle.price)}</strong> and the All-Star Special <strong>${money(allStar.price)}</strong>. Across the <a class="font-bold text-[#1C1410] underline decoration-[#F59E0B] decoration-2 hover:text-amber-800" href="/menu">full menu</a>, prices run from ${money(low.price)} to ${money(high.price)} for the ${high.name}.</p>
        <p class="text-xs sm:text-sm text-gray-600 mt-2">${PRICE_BASIS}</p>
      </div>
      `);

fill('index.html', 'home-cats', String(categories.length));
fill('index.html', 'home-items', String(items.length));

fill('menu.html', 'menu', `
        <div id="quick-answer" class="max-w-3xl mx-auto mb-10 font-sans">
          <p class="text-base sm:text-lg md:text-xl text-[#1C1410] leading-relaxed">Waffle House menu prices run from <strong>${money(low.price)}</strong> for ${plainName(low.name)} to <strong>${money(high.price)}</strong> for the ${high.name}. The All-Star Special typically costs ${money(allStar.price)}. Below are all ${items.length} items across ${categories.length} categories with calories, ${priced.length} of them with a typical price.</p>
          <p class="text-sm text-gray-600 mt-3">${PRICE_BASIS}</p>
        </div>
        `);

fill('menu.html', 'menu-count', `${items.length} menu items across ${categories.length} categories, from the All-Star Special and hashbrown bowls to Texas melts, omelets, dinners, pies and drinks. ${priced.length} of them carry a typical price.`);

fill('nutrition.html', 'nutrition', `
        <div id="quick-answer" class="max-w-3xl mx-auto mb-8 font-sans">
          <p class="text-base md:text-lg text-[#1C1410] leading-relaxed font-medium">Waffle House food runs from <strong>${food[0].cal} calories</strong> for ${plainName(food[0].name)} to <strong>${fmt(food[food.length - 1].cal)} calories</strong> for the ${food[food.length - 1].name}. A ${waffle.name.toLowerCase()} has ${waffle.cal} calories and the All-Star Special with bacon about ${fmt(allStar.cal)}.</p>
          <p class="text-sm text-gray-600 mt-3">${NUTRITION_BASIS}</p>
        </div>
        `);

// Recipe: read yield, total time and calories from the page's own recipe card.
{
  const file = 'recipes/waffle-house-sweet-cream-waffle-copycat/index.html';
  const h = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const total = (h.match(/>Total Time<\/span>\s*<span[^>]*>(\d+) Mins<\/span>/) || [])[1];
  const cal = (h.match(/>Calories<\/span>(\d+) kcal/) || [])[1];
  const yieldN = (h.match(/Yields (\d+) large round diner waffles/) || [])[1];
  if (!total || !cal || !yieldN) throw new Error('recipe card values not found');
  fill(file, 'recipe-time', total);
  fill(file, 'recipe', `
      <div id="quick-answer" class="mb-6 rounded-3xl bg-white border-2 border-[#F59E0B] p-5 sm:p-6 shadow-sm not-prose">
        <p class="text-lg sm:text-xl text-[#1C1410] font-medium leading-relaxed">This copycat recipe makes <strong>${yieldN} sweet cream waffles in about ${total} minutes</strong>. Each one has about ${cal} calories. Half-and-half, buttermilk, malted milk powder and whipped egg whites give a thin, crisp crust and a tender center.</p>
        <p class="text-sm text-gray-600 mt-3">Calories are an estimate for one plain waffle, before butter and syrup.</p>
      </div>
      `);
}
// Coupons: no codes, then the cheapest full plate and the All-Star saving (same plate list as build-coupons.js).
{
  const PLATE_CATS = ['cat-classic-egg-breakfasts', 'cat-all-star-specials', 'cat-hashbrown-bowls', 'cat-lunch-dinner-bowls', 'cat-dinners'];
  const plate = items.filter((i) => i.price != null && PLATE_CATS.includes(i.category)).sort((a, b) => a.price - b.price)[0];
  const eggBacon = B['Two Egg Breakfast with Bacon'];
  const saving = eggBacon.price + waffle.price - allStar.price;
  fill('coupons.html', 'coupons', `
          <div id="quick-answer" class="max-w-3xl mx-auto font-sans">
            <p class="text-base sm:text-lg text-[#1C1410] leading-relaxed font-medium">None of the Waffle House promo codes found online could be confirmed as working, so this page lists none. The cheapest full plate is the ${plate.name} at about <strong>${money(plate.price)}</strong>, and the All-Star Special at ${money(allStar.price)} costs about <strong>${money(saving)} less</strong> than a ${eggBacon.name.toLowerCase()} and a waffle ordered separately.</p>
            <p class="text-sm text-gray-600 mt-3">${PRICE_BASIS} Offers change over time.</p>
          </div>
          `);
}

// Menu PDF: what exists, then the printable menu's range.
fill('menu/pdf/index.html', 'pdf', `
          <div id="quick-answer" class="mb-6">
            <p class="text-[#1C1410] text-base sm:text-lg leading-relaxed font-medium">Waffle House posts a nutrition PDF on its website but no menu PDF with prices. The printable menu below lists all ${items.length} items with calories, ${priced.length} of them with a typical price, from <strong>${money(low.price)}</strong> for ${plainName(low.name)} to <strong>${money(high.price)}</strong> for the ${high.name}.</p>
            <p class="text-sm text-gray-600 mt-3">${PRICE_BASIS} This site does not host Waffle House&rsquo;s own files.</p>
          </div>
          `);

// llms.txt key figures (ChatGPT and Perplexity read it; Google does not). Same data as the pages.
{
  const p = path.join(ROOT, 'llms.txt');
  let t = fs.readFileSync(p, 'utf8');
  const nl = t.includes('\r\n') ? '\r\n' : '\n';
  const block = [
    `## Key figures (typical prices compiled ${longDate(updated)}, they vary by location)`,
    '',
    `- All-Star Special: ${money(allStar.price)}${allStar.range ? ` (${money(allStar.range[0])} to ${money(allStar.range[1])} seen)` : ''}, about ${fmt(allStar.cal)} calories with bacon.`,
    `- Two Egg Breakfast: ${money(twoEgg.price)}. Classic waffle: ${money(waffle.price)}, ${waffle.cal} calories. Coffee: ${money(B.Coffee.price)}.`,
    `- Menu: ${items.length} items in ${categories.length} categories, ${priced.length} with a typical price, from ${money(low.price)} (${plainName(low.name)}) to ${money(high.price)} (${high.name}).`,
    `- Calories: ${food[0].cal} (${plainName(food[0].name)}) to ${fmt(food[food.length - 1].cal)} (${food[food.length - 1].name}).`,
  ].join(nl);
  const re = /<!-- key-figures -->[\s\S]*?<!-- \/key-figures -->/;
  const wrapped = `<!-- key-figures -->${nl}${block}${nl}<!-- /key-figures -->`;
  if (re.test(t)) t = t.replace(re, wrapped);
  else t = t.replace(/(\r?\n## )/, `${nl}${nl}${wrapped}$1`);
  fs.writeFileSync(p, t);
}

console.log(`answers: home, menu, nutrition, recipe, coupons, pdf, llms.txt (prices ${money(low.price)}-${money(high.price)}, ${items.length} items)`);
