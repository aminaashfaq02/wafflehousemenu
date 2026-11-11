// Regenerate the main content, title/meta and JSON-LD of /waffle-house-calories-allergies/ (allergen chart) and
// /waffle-house-dietary-guide/ (orders by dietary need) from the menu data.
// Usage: node tools/build-guides.js
const fs = require('fs');
const path = require('path');
const { categories, items, byName, components: C } = require('./menu-data');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://www.wafflehouse-menu.com';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plain = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&ndash;/g, '–').replace(/&rsquo;/g, '’').replace(/&ldquo;|&rdquo;/g, '"');
const fmt = (n) => n.toLocaleString('en-US');
const ALLERGENS = ['Milk', 'Egg', 'Wheat', 'Soy', 'Peanut', 'Tree Nuts'];
const food = items.filter((i) => i.category !== 'cat-beverages');
const has = (i, a) => i.allergens.includes(a);
const MEAT = new Set(['BACON', 'SAUSAGE', 'HAM', 'COHAM', 'CHUNKED', 'CHICKEN', 'CHSTKOTS', 'TBONE', 'STEAK', 'CHOP', 'ADDBACON', 'ADDSAUSAGE', 'LGBACON', 'BERTS', 'TOPPED', 'COUNTRY', 'GRVYBISC', 'SECBISC', 'BEBISC', 'HAMBISC', 'COHAMBISC', 'SECGRITS', 'BECGRITS', 'HAMGRITS', 'HASHATW', 'TXCSMLT', 'TXPATTY', 'TXCHIXMLT', 'BURGERDLX', 'PATTY', 'ORIGINAL', 'HAMBURGER']);
const meatFree = food.filter((i) => !i.recipe.some(([id]) => MEAT.has(id)));

// ---------- shared blocks (same look as the diet pages)
const breadcrumb = (label) => `
    <nav aria-label="breadcrumb" class="bg-[#FBFBFC] py-3 px-4 border-b border-gray-200">
      <div class="max-w-6xl mx-auto">
        <ol class="flex flex-wrap items-center gap-2 text-sm font-sans">
          <li class="flex items-center gap-2"><a class="text-[#1C1410] hover:text-amber-700 font-bold" href="/">Home</a><span class="text-gray-400" aria-hidden="true">&rsaquo;</span></li>
          <li class="flex items-center gap-2"><a class="text-[#1C1410] hover:text-amber-700 font-bold" href="/nutrition">Diet &amp; Nutrition</a><span class="text-gray-400" aria-hidden="true">&rsaquo;</span></li>
          <li><span class="text-amber-800 font-bold" aria-current="page">${label}</span></li>
        </ol>
      </div>
    </nav>`;
const stat = (label, value, hl) => `
          <div class="${hl ? 'border-[#F59E0B] bg-[#FFFDF7]' : 'border-gray-200 bg-[#FAF7F0]'} border-2 rounded-2xl p-4 sm:p-5 text-center shadow-2xs">
            <span class="block text-[11px] font-extrabold uppercase tracking-widest text-gray-600 font-heading">${label}</span>
            <span class="text-3xl sm:text-4xl font-black text-[#1C1410] font-heading mt-1 block">${value}</span>
          </div>`;
const hero = ({ eyebrow, h1, updated, intro, stats }) => `
    <section class="bg-white py-12 md:py-16 px-4 border-b border-gray-200">
      <div class="max-w-6xl mx-auto">
        <span class="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-800 font-heading block mb-2">${eyebrow}</span>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-[#1C1410] font-heading tracking-tight leading-tight mb-4">${h1}</h1>
        <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-6 font-medium flex-wrap">
          <span>By <a href="/about" class="text-amber-800 font-bold hover:underline">Editorial Team</a></span><span>&bull;</span><span>Last updated ${updated}</span>
        </div>
        <p class="text-gray-700 text-base sm:text-lg leading-relaxed max-w-4xl mb-8">${intro}</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">${stats.map((s, i) => stat(s[0], s[1], i === 3)).join('')}
        </div>
      </div>
    </section>`;
const card = (title, body, id) => `
          <div class="bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8 shadow-xs"${id ? ` id="${id}"` : ''}>
            <h2 class="text-xl sm:text-2xl font-black text-[#1C1410] font-heading mb-4">${title}</h2>
            ${body}
          </div>`;
const list = (rows) => `<ul class="space-y-2.5 text-sm sm:text-base text-gray-700">${rows.map((r) => `
              <li class="flex items-start justify-between gap-4 border-b border-gray-100 pb-2 last:border-0"><span>${r[0]}</span><span class="font-bold text-[#1C1410] whitespace-nowrap">${r[1]}</span></li>`).join('')}
            </ul>`;
const p = (t) => `<p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">${t}</p>`;
const note = (t) => `<p class="text-xs text-gray-600 mt-4">${t}</p>`;
const warning = (t) => `
    <section class="px-4 py-8 bg-[#FFFBEB] border-b border-amber-200">
      <div class="max-w-6xl mx-auto flex gap-3 items-start">
        <span class="w-8 h-8 shrink-0 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center font-black" aria-hidden="true">!</span>
        <p class="text-amber-950 text-sm sm:text-base leading-relaxed">${t}</p>
      </div>
    </section>`;
const hub = (current) => `
    <section class="py-14 md:py-16 px-4 bg-[#FAF7F0] border-b border-gray-200">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-black text-[#1C1410] font-heading tracking-tight mb-6">More nutrition guides</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${[
  ['/waffle-house-calories-allergies/', 'Calories &amp; allergens', 'Allergen chart for every menu item'],
  ['/waffle-house-dietary-guide/', 'Dietary guide', 'Low-carb, low-sodium and allergy-friendly orders'],
  ['/diet/low-calorie/', 'Low-calorie menu', 'Every dish under 600 calories'],
  ['/diet/high-protein/', 'High-protein menu', 'Every dish with 20g of protein or more'],
  ['/nutrition', 'Nutrition facts', 'Calories, fat, carbs, protein and sodium by category'],
  ['/menu', 'Full menu with prices', 'All menu items and typical prices'],
].filter((l) => l[0] !== current).map(([href, t, d]) => `
          <a href="${href}" class="block bg-white rounded-2xl border-2 border-gray-200 hover:border-[#F59E0B] p-5 transition-colors"><span class="block font-heading font-black text-[#1C1410]">${t} &rarr;</span><span class="block text-sm text-gray-600 mt-1">${d}</span></a>`).join('')}
        </div>
      </div>
    </section>`;
const faqSection = (faqs, heading) => `
    <section class="py-14 md:py-16 px-4 bg-white" id="faq">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-black text-[#1C1410] font-heading tracking-tight mb-6">${heading}</h2>
        <div class="space-y-3">${faqs.map(([q, a]) => `
          <div class="faq-item bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
            <button type="button" class="faq-btn w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-[#1C1410] flex items-center justify-between gap-4 cursor-pointer" aria-expanded="false"><span>${q}</span><span class="faq-icon text-[#1C1410] font-black text-base shrink-0">&darr;</span></button>
            <div class="faq-content hidden px-5 pb-5 text-gray-700 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-3">${a}</div>
          </div>`).join('')}
        </div>
      </div>
    </section>`;

function writePage(rel, { url, title, desc, crumb, faqs, removeScript }, mainHtml) {
  const file = path.join(ROOT, rel);
  let h = fs.readFileSync(file, 'utf8');
  const nl = h.includes('\r\n') ? '\r\n' : '\n';
  h = h.replace(/\r\n/g, '\n');
  const s = h.search(/<main\b[^>]*>/), e = h.indexOf('</main>');
  h = h.slice(0, s) + '<main id="main-content" tabindex="-1">' + mainHtml + '\n  ' + h.slice(e);
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  h = h.replace(/(<meta\s+(?:property="og:title"|name="twitter:title"|name="title")\s+content=")[^"]*(")/g, (m, a, b) => a + esc(title) + b);
  h = h.replace(/(<meta\s+(?:name="description"|property="og:description"|name="twitter:description")\s+content=")[^"]*(")/g, (m, a, b) => a + esc(desc) + b);
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebPage', '@id': SITE + url + '#webpage', url: SITE + url, name: title, description: desc, isPartOf: { '@type': 'WebSite', name: 'Waffle Guide', url: SITE + '/' }, publisher: { '@type': 'Organization', name: 'Waffle Guide', url: SITE + '/' } },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
      { '@type': 'ListItem', position: 2, name: 'Diet & Nutrition', item: SITE + '/nutrition' },
      { '@type': 'ListItem', position: 3, name: crumb, item: SITE + url } ] },
    { '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } })) },
  ] };
  const a = h.indexOf('<script type="application/ld+json">'), b = h.indexOf('</script>', a) + 9;
  h = h.slice(0, a) + '<script type="application/ld+json">\n' + JSON.stringify(ld, null, 2) + '\n  </script>' + h.slice(b);
  if (removeScript) h = h.replace(removeScript, '');
  fs.writeFileSync(file, h.replace(/\n/g, nl));
}

// ================= CALORIES & ALLERGENS =================
{
  const count = Object.fromEntries(ALLERGENS.map((a) => [a, items.filter((i) => has(i, a)).length]));
  const none = items.filter((i) => !i.allergens.length);
  const tick = (on) => (on ? '<span class="inline-block w-6 h-6 rounded-full bg-amber-500 text-[#1C1410] font-black leading-6" aria-label="Yes">&#10003;</span>' : '<span class="text-gray-400" aria-label="No">&ndash;</span>');
  const chart = categories.map((cat) => `
              <tr class="bg-[#1C1410]"><th colspan="${ALLERGENS.length + 2}" class="py-2.5 px-4 sm:px-6 text-left text-[#F59E0B] font-heading font-black uppercase text-[11px] tracking-wider">${esc(cat.title)}</th></tr>${cat.items.map((it, n) => `
              <tr class="${n % 2 ? 'bg-gray-50/60' : 'bg-white'}">
                <td class="py-2.5 px-4 sm:px-6 font-bold text-[#1C1410]">${esc(it.name)}</td>
                <td class="py-2.5 px-3 text-center text-gray-700">${it.cal}</td>${ALLERGENS.map((a) => `
                <td class="py-2.5 px-2 text-center">${tick(has(it, a))}</td>`).join('')}
              </tr>`).join('')}`).join('');
  const ranges = categories.filter((c) => c.items.length > 1 && c.id !== 'cat-beverages').map((c) => {
    const s = [...c.items].sort((a, b) => a.cal - b.cal);
    return [esc(c.title), `${fmt(s[0].cal)}&ndash;${fmt(s[s.length - 1].cal)} cal`];
  });
  const faqs = [
    ['Does Waffle House have gluten-free options?', `Waffle House does not offer certified gluten-free food. Some items list no wheat ingredients, including regular hashbrowns, scrambled eggs, bacon, sausage, city ham, country ham and sliced tomatoes, but everything is cooked on a shared grill, so cross-contact with wheat is possible. Grits, toast, biscuits and waffles all list wheat.`],
    ['Are Waffle House hashbrowns dairy-free?', `Regular hashbrowns list soy as their only major allergen, with no milk ingredients. Ordering them &ldquo;covered&rdquo; adds American cheese (milk), and they are cooked on the same grill as cheese and butter, so cross-contact is possible.`],
    ['Do Waffle House waffles contain nuts?', `Tree nuts are listed for the plain waffle as well as the pecan waffle, and the peanut butter chip waffle also lists peanuts. Anyone with a nut allergy should treat every waffle as containing nuts.`],
    ['What allergens are in the All-Star Special?', `With hashbrowns and white toast, the All-Star Special lists ${byName['All-Star Special with Bacon'].allergens.join(', ').replace(/, ([^,]*)$/, ' and $1').toLowerCase()}. The waffle brings tree nuts, the toast brings wheat and milk, and the eggs bring egg and soy.`],
    ['How many calories are in a Waffle House meal?', `It depends on the order: a two egg breakfast with toast and hashbrowns is about ${byName['Two Egg Breakfast'].cal} calories, a Texas melt ${byName['Texas Cheesesteak Melt'].cal}&ndash;${byName['Texas Angus Patty Melt'].cal}, and the All-Star Special ${fmt(byName['All-Star Special with City Ham'].cal)}&ndash;${fmt(byName['All-Star Special with Sausage'].cal)}. A regular order of hashbrowns adds ${C.HASH.cal} calories and toast about ${C.WHITE.cal}.`],
  ];
  const main = `${breadcrumb('Calories &amp; Allergens')}
${hero({
    eyebrow: 'Allergen chart for every menu item',
    h1: 'Waffle House Calories &amp; Allergens',
    updated: 'October 29, 2026',
    intro: `Which of the six major allergens (milk, egg, wheat, soy, peanut and tree nuts) are listed for each of the ${items.length} menu items, with calories alongside. Each item counts its usual components, so a plate served with toast includes the toast&rsquo;s allergens.`,
    stats: [['Items charted', items.length], ['List milk', count.Milk], ['List wheat', count.Wheat], ['No major allergens', none.length]],
  })}
${warning('<strong>Cross-contact warning:</strong> Waffle House cooks on shared grills and waffle irons, so any item might come into contact with any allergen. This chart shows allergens in the ingredients only. If you have a serious food allergy, confirm with the restaurant before you order.')}
    <section class="py-12 md:py-14 px-4 bg-[#FBFBFC] border-b border-gray-200">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">${card('How many items list each allergen', list(ALLERGENS.map((a) => [a, `${count[a]} of ${items.length}`])))}${card('Surprises in the chart', `<ul class="list-disc pl-5 space-y-2 text-sm sm:text-base text-gray-700">
              <li>The <strong>plain waffle</strong> lists tree nuts too, as well as the pecan waffle.</li>
              <li><strong>Grits</strong> list milk, egg, wheat and soy.</li>
              <li><strong>Regular hashbrowns</strong> list soy only.</li>
              <li><strong>Bacon, sausage, city ham and country ham</strong> list no major allergens.</li>
              <li>Every <strong>toast and biscuit</strong> lists wheat and milk.</li>
            </ul>`)}${card('Calorie range by section', list(ranges))}${card('Items with no major allergens listed', p('These list none of the six allergens in their ingredients (cross-contact is still possible):') + `<p class="text-sm sm:text-base text-gray-700 leading-relaxed">${none.map((i) => esc(i.name)).join(', ')}.</p>`)}
      </div>
    </section>

    <section class="py-14 md:py-16 px-4 bg-white border-b border-gray-200" id="allergen-chart">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-[#1C1410] font-heading tracking-tight mb-2">Allergen Chart</h2>
        <p class="text-gray-600 text-sm sm:text-base mb-6 max-w-3xl">A check means the allergen is listed in the item&rsquo;s ingredients. Calories are for the item as normally served.</p>
        <div class="w-full overflow-x-auto rounded-2xl border-2 border-gray-200 bg-white shadow-xs">
          <table class="w-full text-left border-collapse min-w-[720px] text-xs sm:text-sm">
            <thead>
              <tr class="bg-gray-100 text-[#1C1410] font-heading font-black uppercase text-[11px] tracking-wider">
                <th class="py-3 px-4 sm:px-6 w-1/3">Menu item</th><th class="py-3 px-3 text-center">Calories</th>${ALLERGENS.map((a) => `<th class="py-3 px-2 text-center">${a}</th>`).join('')}
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">${chart}
            </tbody>
          </table>
        </div>
        ${note('Allergen information changes over time. For the current list, check <a class="underline font-bold" href="https://www.wafflehouse.com/nutrition/" target="_blank" rel="noopener noreferrer">Waffle House&rsquo;s nutrition and allergen information</a> or ask at the restaurant.')}
      </div>
    </section>
${hub('/waffle-house-calories-allergies/')}
${faqSection(faqs, 'Calories &amp; Allergens FAQ')}`;
  writePage('waffle-house-calories-allergies/index.html', {
    url: '/waffle-house-calories-allergies/', crumb: 'Calories & Allergens',
    title: 'Waffle House Allergen Chart & Calories for Every Menu Item',
    desc: `Allergen chart for all ${items.length} Waffle House menu items (milk, egg, wheat, soy, peanut, tree nuts) with calories, cross-contact notes and gluten and nut answers.`,
    faqs, removeScript: /\n[ \t]*<script>\s*\/\/ 4\. Meal Builder Interactive Logic[\s\S]*?<\/script>/,
  }, main);
  console.log('calories-allergies: chart of', items.length, 'items');
}

// ================= DIETARY GUIDE =================
{
  const lowCarb = food.filter((i) => i.carbs <= 15).sort((a, b) => a.carbs - b.carbs || b.protein - a.protein);
  const lowSodium = food.filter((i) => i.cal >= 300).sort((a, b) => a.sodium - b.sodium).slice(0, 8);
  const noMilk = food.filter((i) => !has(i, 'Milk') && i.cal >= 100).sort((a, b) => b.cal - a.cal);
  const noEgg = food.filter((i) => !has(i, 'Egg') && i.cal >= 100).sort((a, b) => b.cal - a.cal);
  const noWheat = food.filter((i) => !has(i, 'Wheat')).sort((a, b) => b.cal - a.cal);
  const vegMain = meatFree.filter((i) => i.cal >= 200).sort((a, b) => b.protein - a.protein);
  const carbBases = [['WAFFLE', 'Waffle'], ['TXSAND', 'Texas toast (two slices)'], ['BISC', 'Grilled biscuit'], ['HASH', 'Hashbrowns (regular)'], ['WHITE', 'White toast'], ['WHEAT', 'Wheat toast'], ['GRITS', 'Grits'], ['OJREG', 'Orange juice (9-oz)'], ['TEA', 'Sweet tea'], ['TOMATOINSTEAD', 'Sliced tomatoes']];
  const lowCarbPlate = ['EGG_TWO', 'BACON', 'TOMATOINSTEAD'].reduce((t, id) => ({ cal: t.cal + C[id].cal, carbs: t.carbs + C[id].carbs, protein: t.protein + C[id].protein }), { cal: 0, carbs: 0, protein: 0 });
  const names = (arr) => arr.map((i) => esc(i.name)).join(', ');
  const faqs = [
    ['Is there a keto or low-carb option at Waffle House?', `Waffle House does not label items keto, but it is easy to build a low-carb plate: two scrambled eggs with bacon and sliced tomatoes is about ${lowCarbPlate.carbs}g of carbs, ${lowCarbPlate.protein}g of protein and ${lowCarbPlate.cal} calories. Skip the toast, waffle, biscuit, hashbrowns and grits, which carry most of the carbs.`],
    ['What do vegetarians eat at Waffle House?', `Orders without meat include eggs, cheese and Toddle House omelets without meat, waffles, regular hashbrowns (smothered, covered, diced, peppered or capped), grits, toast, biscuits and the grilled cheese sandwich. Waffle House does not publish whether cooking fats are animal-based, and everything shares one grill.`],
    ['What is the lowest-sodium meal at Waffle House?', `Among full plates, the ${lowSodium[0].name} is the lowest in sodium at about ${fmt(lowSodium[0].sodium)}mg. Country ham (${fmt(C.COHAM.sodium)}mg a slice) and grilled chicken (${fmt(C.CHICKEN.sodium)}mg) are the saltiest meats.`],
    ['Which Waffle House items have no milk ingredients?', `Regular hashbrowns, scrambled eggs, bacon, sausage, both hams, grilled chicken, steaks and pork chops list no milk. Toast, biscuits, waffles, grits and cheese all list milk, and everything is cooked on a shared grill.`],
    ['How many carbs are in a Waffle House waffle?', `A plain waffle has about ${C.WAFFLE.carbs}g of carbohydrates before syrup. Chocolate chips add ${C.CHOCCHIP.carbs}g, peanut butter chips ${C.PBCHIP.carbs}g and pecans ${C.PECAN.carbs}g.`],
  ];
  const main = `${breadcrumb('Dietary Guide')}
${hero({
    eyebrow: 'Low-carb, low-sodium and allergy-friendly orders',
    h1: 'Waffle House Dietary Guide',
    updated: 'October 28, 2026',
    intro: 'What to order at Waffle House for a low-carb, low-sodium, meat-free or allergy-aware meal, with the numbers for each choice. Waffle House does not certify items for any diet, so use these lists to plan and confirm details at the restaurant.',
    stats: [['Low-carb dishes', lowCarb.length], ['Meat-free dishes', meatFree.length], ['No wheat listed', noWheat.length], ['No milk listed', noMilk.length]],
  })}
${warning('<strong>Shared kitchen:</strong> every item is cooked on shared grills and waffle irons. &ldquo;No wheat&rdquo;, &ldquo;no milk&rdquo; and &ldquo;no egg&rdquo; below mean those allergens are not listed in the ingredients. Cross-contact is still possible. With a serious allergy or medical diet, check with the restaurant and your doctor or dietitian.')}
    <section class="py-12 md:py-14 px-4 bg-[#FBFBFC] border-b border-gray-200">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">${card('Low-carb orders (15g carbs or less)', list(lowCarb.map((i) => [esc(i.name), `${i.carbs}g carbs &middot; ${i.protein}g protein`])) + note('For a fuller low-carb plate, add eggs to a meat side and swap toast for sliced tomatoes.'), 'low-carb')}${card('Where the carbs come from', p('Carbohydrates in common bases and sides:') + list(carbBases.map(([id, n]) => [n, `${C[id].carbs}g`])), 'carbs')}${card('Lower-sodium full plates', p('The full plates (300 calories or more) with the least sodium:') + list(lowSodium.map((i) => [esc(i.name), `${fmt(i.sodium)}mg`])), 'low-sodium')}${card('Meat-free orders', p('Dishes with no meat in their usual components, most protein first:') + list(vegMain.map((i) => [esc(i.name), `${i.protein}g protein &middot; ${i.cal} cal`])) + note('Waffle House does not say whether its cooking fats are animal-based.'), 'meat-free')}${card('No wheat ingredients listed', `<p class="text-sm sm:text-base text-gray-700 leading-relaxed">${names(noWheat)}.</p>` + note('Not gluten-free: cooked on shared grills.'), 'no-wheat')}${card('No milk ingredients listed', `<p class="text-sm sm:text-base text-gray-700 leading-relaxed">${names(noMilk)}.</p>`, 'no-milk')}${card('No egg ingredients listed', `<p class="text-sm sm:text-base text-gray-700 leading-relaxed">${names(noEgg)}.</p>` + note('Waffles, biscuits and grits all list egg. Toast does not.'), 'no-egg')}${card('Need more protein?', p(`See the <a class="font-bold underline text-[#1C1410]" href="/diet/high-protein/">high-protein menu</a> for every dish with 20g of protein or more. A side of grilled chicken adds ${C.CHICKEN.protein}g of protein for ${C.CHICKEN.cal} calories, and each extra egg about ${C.EGG.protein}g.`))}
      </div>
    </section>
${hub('/waffle-house-dietary-guide/')}
${faqSection(faqs, 'Dietary Guide FAQ')}`;
  writePage('waffle-house-dietary-guide/index.html', {
    url: '/waffle-house-dietary-guide/', crumb: 'Dietary Guide',
    title: 'Waffle House Dietary Guide: Low-Carb, Vegetarian & Allergens',
    desc: 'What to order at Waffle House for low-carb, low-sodium, vegetarian or allergy-aware meals, with carbs, sodium and allergens for each choice.',
    faqs, removeScript: /\n[ \t]*<script>\s*\/\/ 4\. Interactive Priority Selector Data & Logic[\s\S]*?<\/script>/,
  }, main);
  console.log(`dietary-guide: ${lowCarb.length} low-carb, ${meatFree.length} meat-free, ${noWheat.length} no-wheat`);
}
