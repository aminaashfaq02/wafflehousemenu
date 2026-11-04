// Regenerate the main content, title/meta and JSON-LD of /diet/low-calorie/ and /diet/high-protein/ from the menu data.
// Usage: node tools/build-diet.js
const fs = require('fs');
const path = require('path');
const { categories, items, byName, components, money } = require('./menu-data');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://www.wafflehouse-menu.com';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plain = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&rsquo;/g, '’').replace(/&ldquo;|&rdquo;/g, '"').replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&middot;/g, '·');
const avg = (arr, k) => Math.round(arr.reduce((s, i) => s + i[k], 0) / arr.length);
const fmt = (n) => n.toLocaleString('en-US');
const catNav = Object.fromEntries(categories.map((c) => [c.id, c.nav]));
const C = components;

function sum(ids) { // nutrition of an ad-hoc plate built from component ids
  return ids.reduce((t, id) => ({ cal: t.cal + C[id].cal, protein: t.protein + C[id].protein, sodium: t.sodium + C[id].sodium }), { cal: 0, protein: 0, sodium: 0 });
}

// ---------- shared blocks
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

function hero({ eyebrow, h1, updated, intro, stats }) {
  return `
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
}

const card = (title, body) => `
          <div class="bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8 shadow-xs">
            <h2 class="text-xl sm:text-2xl font-black text-[#1C1410] font-heading mb-4">${title}</h2>
            ${body}
          </div>`;

const list = (rows) => `<ul class="space-y-2.5 text-sm sm:text-base text-gray-700">${rows.map((r) => `
              <li class="flex items-start justify-between gap-4 border-b border-gray-100 pb-2 last:border-0"><span>${r[0]}</span><span class="font-bold text-[#1C1410] whitespace-nowrap">${r[1]}</span></li>`).join('')}
            </ul>`;

function filterBar(rowsItems) {
  const cats = [...new Set(rowsItems.map((i) => i.category))];
  return `
        <div class="flex flex-wrap items-center gap-2 mb-6" id="filter-pills">
          <button type="button" class="filter-btn active px-4 py-2 rounded-full text-xs font-bold font-heading uppercase bg-[#F59E0B] text-[#1C1410] border-2 border-[#F59E0B] transition-all cursor-pointer shadow-2xs" data-category="all">All dishes (${rowsItems.length})</button>${cats.map((c) => `
          <button type="button" class="filter-btn px-4 py-2 rounded-full text-xs font-bold font-heading uppercase bg-white text-gray-700 border-2 border-gray-200 hover:border-[#F59E0B] transition-all cursor-pointer" data-category="${esc(catNav[c])}">${esc(catNav[c])} (${rowsItems.filter((i) => i.category === c).length})</button>`).join('')}
        </div>`;
}

function listSection({ id, eyebrow, h2, rowsItems, sortNote, cols }) {
  const head = cols.map((c, i) => `<th class="py-3.5 ${i ? 'px-3 text-center' : 'px-4 sm:px-6'}">${c[0]}</th>`).join('');
  const body = rowsItems.map((it) => `
              <tr class="dish-row border-b border-gray-100 hover:bg-amber-50/40" data-name="${esc(it.name.toLowerCase())}" data-category="${esc(catNav[it.category])}">
                <td class="py-3 px-4 sm:px-6"><a href="/menu#${it.category}" class="font-bold text-[#1C1410] text-sm sm:text-base hover:text-amber-800">${esc(it.name)}</a><div class="text-xs text-gray-600 mt-0.5">${esc(catNav[it.category])}</div></td>${cols.slice(1).map((c) => `
                <td class="py-3 px-3 text-center ${c[2] || 'text-gray-700'}">${c[1](it)}</td>`).join('')}
              </tr>`).join('');
  return `
    <section class="py-14 md:py-16 px-4 bg-white border-b border-gray-200" id="${id}">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span class="text-xs font-black uppercase tracking-widest text-gray-600 font-heading block mb-1">${eyebrow}</span>
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-[#1C1410] font-heading tracking-tight">${h2}</h2>
            <p class="text-gray-600 text-sm mt-1">Showing <span id="visible-count" class="font-bold text-black">${rowsItems.length}</span> of ${rowsItems.length} dishes &bull; ${sortNote}</p>
          </div>
          <div class="w-full md:w-72">
            <label for="search-input" class="sr-only">Search dish name</label>
            <input type="text" id="search-input" placeholder="Search dish name..." class="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-[#F59E0B] focus:outline-none text-sm font-medium bg-[#FBFBFC]">
          </div>
        </div>${filterBar(rowsItems)}
        <div class="overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-xs bg-white">
          <table class="w-full text-left text-xs sm:text-sm font-sans min-w-[640px]" id="dishes-table">
            <thead class="bg-gray-100 text-[#1C1410] font-heading font-black uppercase text-[11px] sm:text-xs tracking-wider border-b-2 border-gray-200">
              <tr>${head}</tr>
            </thead>
            <tbody>${body}
            </tbody>
          </table>
        </div>
        <p class="text-xs text-gray-600 mt-4">Totals are estimates for each dish as it is normally served. Prices are typical and vary by location; &ldquo;Varies&rdquo; means no reliable typical price was found.</p>
      </div>
    </section>`;
}

const hub = (current) => {
  const links = [
    ['/diet/low-calorie/', 'Low-calorie menu', 'Every dish under 600 calories'],
    ['/diet/high-protein/', 'High-protein menu', 'Every dish with 20g of protein or more'],
    ['/nutrition', 'Nutrition facts', 'Calories, fat, carbs, protein and sodium by category'],
    ['/waffle-house-calories-allergies/', 'Calories &amp; allergens', 'Allergens and cross-contact on a shared grill'],
    ['/blog/healthiest-breakfast-for-weight-loss/', 'Lighter breakfast orders', 'Ordering ideas for weight loss'],
    ['/menu', 'Full menu with prices', 'All menu items and typical prices'],
  ].filter((l) => l[0] !== current);
  return `
    <section class="py-14 md:py-16 px-4 bg-[#FAF7F0] border-b border-gray-200">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-black text-[#1C1410] font-heading tracking-tight mb-6">More nutrition guides</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${links.map(([href, t, d]) => `
          <a href="${href}" class="block bg-white rounded-2xl border-2 border-gray-200 hover:border-[#F59E0B] p-5 transition-colors">
            <span class="block font-heading font-black text-[#1C1410]">${t} &rarr;</span>
            <span class="block text-sm text-gray-600 mt-1">${d}</span>
          </a>`).join('')}
        </div>
      </div>
    </section>`;
};

function faqSection(faqs, heading) {
  return `
    <section class="py-14 md:py-16 px-4 bg-white" id="faq">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-black text-[#1C1410] font-heading tracking-tight mb-6">${heading}</h2>
        <div class="space-y-3">${faqs.map(([q, a]) => `
          <div class="faq-item bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
            <button type="button" class="faq-btn w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-[#1C1410] flex items-center justify-between gap-4 cursor-pointer" aria-expanded="false">
              <span>${q}</span>
              <span class="faq-icon text-[#1C1410] font-black text-base shrink-0">&darr;</span>
            </button>
            <div class="faq-content hidden px-5 pb-5 text-gray-700 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-3">${a}</div>
          </div>`).join('')}
        </div>
      </div>
    </section>`;
}

function headUpdate(h, { url, title, desc, crumb, faqs }) {
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  h = h.replace(/(<meta\s+(?:property="og:title"|name="twitter:title")\s+content=")[^"]*(")/g, (m, a, b) => a + esc(title) + b);
  h = h.replace(/(<meta\s+(?:name="description"|property="og:description"|name="twitter:description")\s+content=")[^"]*(")/g, (m, a, b) => a + esc(desc) + b);
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': SITE + url, url: SITE + url, name: title, description: desc, isPartOf: { '@type': 'WebSite', name: 'Waffle Guide', url: SITE + '/' }, publisher: { '@type': 'Organization', name: 'Waffle Guide', url: SITE + '/' }, breadcrumb: { '@id': SITE + url + '#breadcrumb' } },
      { '@type': 'BreadcrumbList', '@id': SITE + url + '#breadcrumb', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
        { '@type': 'ListItem', position: 2, name: 'Diet & Nutrition', item: SITE + '/nutrition' },
        { '@type': 'ListItem', position: 3, name: crumb, item: SITE + url } ] },
      { '@type': 'FAQPage', '@id': SITE + url + '#faq', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } })) },
    ],
  };
  const s = h.indexOf('<script type="application/ld+json">');
  const e = h.indexOf('</script>', s) + 9;
  if (s < 0) throw new Error('no JSON-LD block');
  return h.slice(0, s) + '<script type="application/ld+json">\n' + JSON.stringify(ld, null, 2) + '\n  </script>' + h.slice(e);
}

function writePage(rel, head, mainHtml) {
  const file = path.join(ROOT, rel);
  let h = fs.readFileSync(file, 'utf8');
  const nl = h.includes('\r\n') ? '\r\n' : '\n';
  h = h.replace(/\r\n/g, '\n');
  const s = h.search(/<main\b[^>]*>/);
  const s2 = h.indexOf('>', s) + 1;
  const e = h.indexOf('</main>');
  if (s < 0 || e < 0) throw new Error('no <main> in ' + rel);
  h = h.slice(0, s) + '<main id="main-content" tabindex="-1" class="flex-1">' + mainHtml + '\n  ' + h.slice(e);
  h = headUpdate(h, head);
  fs.writeFileSync(file, h.replace(/\n/g, nl));
}

// ================= LOW-CALORIE =================
{
  const LIMIT = 600;
  const rowsItems = items.filter((i) => i.cal < LIMIT).sort((a, b) => a.cal - b.cal || a.name.localeCompare(b.name));
  const nCat = new Set(rowsItems.map((i) => i.category)).size;
  const priced = rowsItems.filter((i) => i.price != null);
  const zero = rowsItems.filter((i) => i.cal === 0).map((i) => i.name);
  const topP = [...rowsItems].sort((a, b) => b.protein - a.protein)[0];
  const food = rowsItems.filter((i) => i.category !== 'cat-beverages');
  const swaps = [
    ['Grits instead of regular hashbrowns', `&minus;${C.HASH.cal - C.GRITS.cal} cal`],
    ['Sliced tomatoes instead of regular hashbrowns', `&minus;${C.HASH.cal - C.TOMATOINSTEAD.cal} cal`],
    ['Wheat toast instead of white toast', `&minus;${C.WHITE.cal - C.WHEAT.cal} cal`],
    ['Raisin toast instead of white toast', `+${C.RAISIN.cal - C.WHITE.cal} cal`],
    ['Leave off the toast', `&minus;${C.WHITE.cal} cal`],
    ['Bacon instead of sausage', `&minus;${C.SAUSAGE.cal - C.BACON.cal} cal`],
    ['City ham instead of sausage', `&minus;${C.SAUSAGE.cal - C.HAM.cal} cal`],
    ['Each slice of American cheese', `+${C.COVERED.cal} cal`],
  ];
  const plates = [
    ['Two scrambled eggs, sliced tomatoes, wheat toast and black coffee', ['EGG_TWO', 'TOMATOINSTEAD', 'WHEAT', 'COFFEE']],
    ['Grilled chicken, two scrambled eggs and sliced tomatoes', ['CHICKEN', 'EGG_TWO', 'TOMATOINSTEAD']],
    ['Classic waffle with a side of city ham', ['WAFFLE', 'HAM']],
  ].map(([t, ids]) => { const n = sum(ids); return [t, `${n.cal} cal &middot; ${n.protein}g protein`]; });
  const hiSodium = rowsItems.filter((i) => i.sodium >= 1500).sort((a, b) => b.sodium - a.sodium);
  const faqs = [
    ['What is the lowest-calorie meal at Waffle House?', `Two scrambled eggs (${C.EGG_TWO.cal} calories) with sliced tomatoes (${C.TOMATOINSTEAD.cal}) and black coffee (${C.COFFEE.cal}) comes to about ${C.EGG_TWO.cal + C.TOMATOINSTEAD.cal + C.COFFEE.cal} calories. A bowl of grits is ${C.GRITS.cal} calories, and a regular order of hashbrowns is ${C.HASH.cal}.`],
    ['What is the highest-protein dish under 600 calories?', `The ${topP.name} has about ${topP.protein}g of protein for ${topP.cal} calories. A side of grilled chicken adds ${C.CHICKEN.protein}g of protein for ${C.CHICKEN.cal} calories to any plate.`],
    ['How many calories are in Waffle House hashbrowns?', `A regular order is about ${C.HASH.cal} calories, a large order ${C.LGHASH.cal} and a triple order ${C.TRIPHASH.cal}. Toppings add from ${C.DICED.cal} calories (diced tomatoes) to ${C.COUNTRY.cal} (sausage gravy), so scattered, smothered and covered comes to about ${byName['Hashbrowns Scattered, Smothered & Covered'].cal}.`],
    ['Which breakfast meat has the fewest calories?', `City ham has about ${C.HAM.cal} calories, bacon (three slices) ${C.BACON.cal}, country ham ${C.COHAM.cal} and two sausage patties ${C.SAUSAGE.cal}. Country ham is also the saltiest at about ${fmt(C.COHAM.sodium)}mg of sodium.`],
    ['How many calories does toast add to a Waffle House breakfast?', `White toast adds about ${C.WHITE.cal} calories, wheat toast ${C.WHEAT.cal} and raisin toast ${C.RAISIN.cal}. Asking for sliced tomatoes instead of toast saves the most.`],
  ];
  const main = `${breadcrumb('Low-Calorie')}
${hero({
    eyebrow: 'Lighter orders, ranked by calories',
    h1: `Waffle House Dishes Under ${LIMIT} Calories`,
    updated: 'October 30, 2026',
    intro: `All ${rowsItems.length} regular menu items under ${LIMIT} calories, ranked from lightest to heaviest. Each total counts the dish the way it is normally served, so a plate that comes with toast and hashbrowns is counted with them.`,
    stats: [['Dishes', rowsItems.length], ['Avg. calories', avg(rowsItems, 'cal')], ['Avg. protein', avg(rowsItems, 'protein') + 'g'], ['Avg. sodium', fmt(avg(rowsItems, 'sodium')) + 'mg']],
  })}
    <section class="py-12 md:py-14 px-4 bg-[#FBFBFC] border-b border-gray-200">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">${card('Easy swaps that save calories', list(swaps))}${card('Three lighter full plates', list(plates) + `
            <p class="text-xs text-gray-600 mt-4">Estimates for each plate as listed. Jelly, butter and syrup are not included.</p>`)}${card('Watch the sodium', `<p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">A low calorie count does not mean low sodium. These dishes on the list have ${fmt(1500)}mg of sodium or more:</p>` + list(hiSodium.map((i) => [esc(i.name), fmt(i.sodium) + 'mg'])))}${card('At a glance', list([
    ['Dishes on the list', `${rowsItems.length} across ${nCat} menu sections`],
    ['Lightest food item', `${food[0].name} (${food[0].cal} cal)`],
    ['Zero-calorie drinks', zero.join(', ')],
    ['Most protein on the list', `${topP.name} (${topP.protein}g)`],
    ['Typical price range', `${money(Math.min(...priced.map((i) => i.price)))} &ndash; ${money(Math.max(...priced.map((i) => i.price)))}`],
  ]))}
      </div>
    </section>
${listSection({
    id: 'leaderboard', eyebrow: 'The complete list', h2: `All ${rowsItems.length} Dishes Under ${LIMIT} Calories`, rowsItems, sortNote: 'Ranked lightest first',
    cols: [['Dish'], ['Calories', (i) => `<span class="inline-block px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-black font-heading bg-emerald-100 text-emerald-900 border border-emerald-300">${i.cal} cal</span>`], ['Protein', (i) => i.protein + 'g', 'font-bold text-gray-900'], ['Sodium', (i) => fmt(i.sodium) + 'mg'], ['Typical price', (i) => money(i.price), 'font-black font-heading text-gray-900']],
  })}
${hub('/diet/low-calorie/')}
${faqSection(faqs, 'Low-Calorie Menu FAQ')}`;
  writePage('diet/low-calorie/index.html', {
    url: '/diet/low-calorie/', crumb: 'Low-Calorie',
    title: `Waffle House Low-Calorie Menu: ${rowsItems.length} Dishes Under ${LIMIT} Calories`,
    desc: `All ${rowsItems.length} Waffle House menu items under ${LIMIT} calories, ranked lightest first, with protein, sodium, typical prices and easy swaps for a lighter plate.`,
    faqs,
  }, main);
  console.log(`low-calorie: ${rowsItems.length} dishes`);
}

// ================= HIGH-PROTEIN =================
{
  const MIN = 20;
  const rowsItems = items.filter((i) => i.protein >= MIN).sort((a, b) => b.protein - a.protein || a.cal - b.cal);
  const lo = rowsItems[rowsItems.length - 1].protein, hi = rowsItems[0].protein;
  const leaders = rowsItems.slice(0, 8);
  const density = [...rowsItems].sort((a, b) => b.protein / b.cal - a.protein / a.cal).slice(0, 6);
  const under600 = rowsItems.filter((i) => i.cal < 600).sort((a, b) => b.protein - a.protein).slice(0, 5);
  const salty = rowsItems.filter((i) => i.sodium >= 2000).sort((a, b) => b.sodium - a.sodium);
  const heavy = [...items].sort((a, b) => b.cal - a.cal).slice(0, 6);
  const meats = [['COHAM', 'Country ham'], ['CHOP', 'Pork chops (two)'], ['TBONE', 'T-bone steak'], ['CHICKEN', 'Grilled chicken'], ['STEAK', 'Sirloin steak'], ['HAM', 'City ham'], ['SAUSAGE', 'Sausage (two patties)'], ['BACON', 'Bacon (three slices)']];
  const faqs = [
    ['Which Waffle House order has the most protein?', `${hi === rowsItems[0].protein ? rowsItems[0].name : ''} has the most, at about ${hi}g of protein and ${rowsItems[0].cal} calories. ${rowsItems[1].name} (${rowsItems[1].protein}g) and ${rowsItems[2].name} (${rowsItems[2].protein}g) are close behind.`],
    ['What is the highest-protein dish under 600 calories?', `The ${under600[0].name} has about ${under600[0].protein}g of protein for ${under600[0].cal} calories, the most protein of any dish under 600 calories.`],
    ['How much protein is in the All-Star Special?', `About ${byName['All-Star Special with Bacon'].protein}g with bacon, ${byName['All-Star Special with Sausage'].protein}g with sausage and ${byName['All-Star Special with City Ham'].protein}g with city ham, with hashbrowns and white toast.`],
    ['Which meat has the most protein?', `Pork chops (two) have about ${C.CHOP.protein}g, a T-bone ${C.TBONE.protein}g, country ham ${C.COHAM.protein}g and grilled chicken ${C.CHICKEN.protein}g. Grilled chicken gives the most protein per calorie, at ${C.CHICKEN.cal} calories.`],
    ['How can I add protein to a Waffle House order?', `Each extra scrambled egg adds about ${C.EGG.protein}g of protein (${C.EGG.cal} calories), a slice of cheese ${C.COVERED.protein}g (${C.COVERED.cal} calories), and a side of grilled chicken ${C.CHICKEN.protein}g (${C.CHICKEN.cal} calories).`],
  ];
  const leaderCards = leaders.map((it, n) => `
          <a href="/menu#${it.category}" class="block bg-white rounded-2xl border-2 ${n < 3 ? 'border-[#F59E0B]' : 'border-gray-200'} hover:border-[#F59E0B] p-5 transition-colors">
            <span class="text-xs font-extrabold text-gray-600">${n + 1} &middot; ${esc(catNav[it.category])}</span>
            <span class="block font-heading font-black text-[#1C1410] text-base mt-1">${esc(it.name)}</span>
            <span class="flex flex-wrap gap-2 mt-3 text-xs font-bold"><span class="px-2 py-1 rounded-md bg-emerald-100 text-emerald-900">${it.protein}g protein</span><span class="px-2 py-1 rounded-md bg-gray-100 text-gray-800">${it.cal} cal</span><span class="px-2 py-1 rounded-md bg-gray-100 text-gray-800">${fmt(it.sodium)}mg sodium</span></span>
          </a>`).join('');
  const main = `${breadcrumb('High-Protein')}
${hero({
    eyebrow: 'Ranked by grams of protein',
    h1: `Waffle House Dishes With ${MIN}g+ Protein`,
    updated: 'October 29, 2026',
    intro: `All ${rowsItems.length} regular menu items with ${MIN}g of protein or more, from ${lo}g to ${hi}g. Each total counts the dish the way it is normally served, including its eggs, toast and sides.`,
    stats: [['Dishes', rowsItems.length], ['Avg. protein', avg(rowsItems, 'protein') + 'g'], ['Avg. calories', fmt(avg(rowsItems, 'cal'))], ['Avg. sodium', fmt(avg(rowsItems, 'sodium')) + 'mg']],
  })}
    <section class="py-12 md:py-14 px-4 bg-[#FBFBFC] border-b border-gray-200">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-black text-[#1C1410] font-heading tracking-tight mb-6">Protein leaders</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">${leaderCards}
        </div>
      </div>
    </section>
    <section class="py-12 md:py-14 px-4 bg-white border-b border-gray-200">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">${card('Most protein per calorie', list(density.map((i) => [esc(i.name), `${(100 * i.protein / i.cal).toFixed(1)}g per 100 cal`])))}${card('Protein by meat', list(meats.map(([id, n]) => [n, `${C[id].protein}g &middot; ${C[id].cal} cal`])))}${card(`High protein, under 600 calories`, list(under600.map((i) => [esc(i.name), `${i.protein}g &middot; ${i.cal} cal`])))}${card('Watch the sodium', `<p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">Cured and grilled meats bring a lot of salt. These dishes on the list have ${fmt(2000)}mg of sodium or more:</p>` + list(salty.map((i) => [esc(i.name), fmt(i.sodium) + 'mg'])))}
      </div>
    </section>
${listSection({
    id: 'leaderboard', eyebrow: 'The complete list', h2: `All ${rowsItems.length} Dishes With ${MIN}g+ Protein`, rowsItems, sortNote: 'Ranked by protein',
    cols: [['Dish'], ['Protein', (i) => `<span class="inline-block px-2.5 py-1 text-xs font-black rounded-md bg-emerald-100 text-emerald-900">${i.protein}g</span>`], ['Calories', (i) => fmt(i.cal), 'font-bold text-gray-900'], ['Sodium', (i) => fmt(i.sodium) + 'mg'], ['Typical price', (i) => money(i.price), 'font-black font-heading text-gray-900']],
  })}
    <section class="py-12 md:py-14 px-4 bg-[#FBFBFC] border-b border-gray-200">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-black text-[#1C1410] font-heading tracking-tight mb-2">Looking for more calories?</h2>
        <p class="text-gray-700 text-sm sm:text-base mb-6 max-w-3xl">For bulking or a long day, these are the highest-calorie dishes on the menu.</p>
        <div class="bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8">${list(heavy.map((i) => [esc(i.name), `${fmt(i.cal)} cal &middot; ${i.protein}g protein`]))}
        </div>
      </div>
    </section>
${hub('/diet/high-protein/')}
${faqSection(faqs, 'High-Protein Menu FAQ')}`;
  writePage('diet/high-protein/index.html', {
    url: '/diet/high-protein/', crumb: 'High-Protein',
    title: `Waffle House High-Protein Menu: ${rowsItems.length} Dishes Ranked (2026)`,
    desc: `All ${rowsItems.length} Waffle House menu items with ${MIN}g of protein or more, ranked by protein, with calories, sodium, typical prices and protein per calorie.`,
    faqs,
  }, main);
  console.log(`high-protein: ${rowsItems.length} dishes (${lo}-${hi}g)`);
}
