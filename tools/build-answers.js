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
const NUTRITION_BASIS = `Nutrition figures are estimates for each item as normally served. Updated ${longDate(updated)}.`;

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
console.log(`answers: home, menu, nutrition, recipe (prices ${money(low.price)}-${money(high.price)}, ${items.length} items)`);
