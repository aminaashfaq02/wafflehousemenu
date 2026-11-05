// Regenerate /prices-by-state from the menu data: typical prices, observed price ranges, why prices differ, FAQ.
// Usage: node tools/build-prices.js
const fs = require('fs');
const path = require('path');
const { categories, byName, money, toppingPrice } = require('./menu-data');

const FILE = path.join(__dirname, '..', 'prices-by-state.html');
const SITE = 'https://www.wafflehouse-menu.com';
const URL = '/prices-by-state';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plain = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&ndash;/g, '–').replace(/&rsquo;/g, '’');
const range = (r) => (r ? `${money(r[0])} &ndash; ${money(r[1])}` : '&mdash;');
const STATES = ['Alabama', 'Arizona', 'Arkansas', 'Colorado', 'Delaware', 'Florida', 'Georgia', 'Illinois', 'Indiana', 'Kansas', 'Kentucky', 'Louisiana', 'Maryland', 'Mississippi', 'Missouri', 'New Mexico', 'North Carolina', 'Ohio', 'Oklahoma', 'Pennsylvania', 'South Carolina', 'Tennessee', 'Texas', 'Virginia', 'West Virginia'];

const as = byName['All-Star Special with Bacon'];
const priced = categories.flatMap((c) => c.items).filter((i) => i.price != null);
const withRange = priced.filter((i) => i.range);
const spread = [...withRange].sort((a, b) => (b.range[1] - b.range[0]) - (a.range[1] - a.range[0])).slice(0, 5);
const cheapest = [...priced].filter((i) => i.cal > 0 || i.name === 'Coffee').sort((a, b) => a.price - b.price).slice(0, 5);

const faqs = [
  ['How much is the All-Star Special at Waffle House?', `The All-Star Special typically costs about ${money(as.price)}, and published price lists show it from ${money(as.range[0])} to ${money(as.range[1])} depending on the restaurant. The price is the same whether you choose bacon, sausage or city ham.`],
  ['Why are Waffle House prices different in each state?', 'Waffle House does not use one national price list, so prices are set restaurant by restaurant. Reasons commonly given for the differences are local wages and rent, and locations near highways, airports or tourist areas. Sales tax is added at the register and also differs by state and city.'],
  ['What is the cheapest thing at Waffle House?', `A side of toast (about ${money(byName['Toast (White)'].price)}), a grilled biscuit (about ${money(byName['Grilled Biscuit'].price)}) and a sausage egg and cheese biscuit (about ${money(byName['Sausage Egg & Cheese Biscuit'].price)}) are among the lowest-priced items. A cup of coffee is about ${money(byName.Coffee.price)}.`],
  ['How much is a waffle at Waffle House?', `A classic waffle typically costs about ${money(byName['Classic Waffle'].price)} (${range(byName['Classic Waffle'].range)} on published price lists). Pecan, chocolate chip and peanut butter chip waffles are about ${money(byName['Pecan Waffle'].price)}.`],
  ['How much are hashbrowns at Waffle House?', `A regular order of hashbrowns is typically about ${money(byName['Hashbrowns (Regular)'].price)} and a large order about ${money(byName['Large Hashbrowns'].price)}. Each topping, such as onions or cheese, usually adds about ${money(toppingPrice)}.`],
].map(([q, a]) => [q, a.replace(/&ndash;/g, '–')]);

const tables = categories.filter((c) => c.items.some((i) => i.price != null)).map((cat) => `
        <div class="mb-12" id="prices-${cat.id.replace(/^cat-/, '')}">
          <h3 class="text-xl sm:text-2xl font-black text-[#1C1410] font-heading mb-4">${esc(cat.title)}</h3>
          <div class="w-full overflow-x-auto rounded-2xl border-2 border-gray-200 bg-white shadow-xs">
            <table class="w-full text-left border-collapse min-w-[600px] text-sm">
              <thead>
                <tr class="bg-[#1C1410] text-[#F59E0B] uppercase font-heading font-black text-[11px] tracking-wider">
                  <th class="py-3.5 px-4 sm:px-6 w-2/5">Menu item</th><th class="py-3.5 px-3 text-center">Typical price</th><th class="py-3.5 px-3 text-center">Price range seen</th><th class="py-3.5 px-3 text-center">Calories</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">${cat.items.map((it, i) => `
                <tr class="${i % 2 ? 'bg-gray-50/60' : 'bg-white'}">
                  <td class="py-3 px-4 sm:px-6 font-bold text-[#1C1410]"><a class="hover:text-amber-800" href="/menu#${cat.id}">${esc(it.name)}</a></td>
                  <td class="py-3 px-3 text-center font-black font-heading text-[#1C1410]">${money(it.price)}</td>
                  <td class="py-3 px-3 text-center text-gray-700 whitespace-nowrap">${range(it.range)}</td>
                  <td class="py-3 px-3 text-center text-gray-700">${it.cal}</td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>`).join('');

const box = (title, body) => `
          <div class="bg-white rounded-3xl border-2 border-gray-200 p-6 sm:p-8 shadow-xs">
            <h2 class="text-lg sm:text-xl font-black text-[#1C1410] font-heading mb-3">${title}</h2>
            ${body}
          </div>`;
const ul = (rows) => `<ul class="space-y-2 text-sm sm:text-base text-gray-700">${rows.map((r) => `
              <li class="flex justify-between gap-4 border-b border-gray-100 pb-2 last:border-0"><span>${r[0]}</span><span class="font-bold text-[#1C1410] whitespace-nowrap">${r[1]}</span></li>`).join('')}
            </ul>`;

const main = `
    <nav aria-label="breadcrumb" class="bg-[#FBFBFC] py-3 px-4 border-b border-gray-200">
      <div class="max-w-6xl mx-auto">
        <ol class="flex flex-wrap items-center gap-2 text-sm font-sans">
          <li class="flex items-center gap-2"><a class="text-[#1C1410] hover:text-amber-700 font-bold" href="/">Home</a><span class="text-gray-400" aria-hidden="true">&rsaquo;</span></li>
          <li class="flex items-center gap-2"><a class="text-[#1C1410] hover:text-amber-700 font-bold" href="/menu">Menu &amp; Prices</a><span class="text-gray-400" aria-hidden="true">&rsaquo;</span></li>
          <li><span class="text-amber-800 font-bold" aria-current="page">Prices by State</span></li>
        </ol>
      </div>
    </nav>

    <section class="bg-white py-12 md:py-16 px-4 border-b border-gray-200">
      <div class="max-w-6xl mx-auto">
        <span class="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-800 font-heading block mb-2">State-by-State Price Guide &bull; Updated November 2, 2026</span>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-black text-[#1C1410] font-heading tracking-tight leading-tight mb-4">Waffle House Prices by State</h1>
        <p class="text-gray-700 text-base sm:text-lg leading-relaxed max-w-4xl mb-8">Waffle House does not publish one national price list, so the same order can cost different amounts from one town or state to the next. This guide gives the typical price of each menu item and the range of prices seen across published restaurant price lists, so you know roughly what to expect before you order.</p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="border-2 border-gray-200 bg-[#FAF7F0] rounded-2xl p-4 text-center"><span class="block text-[11px] font-extrabold uppercase tracking-widest text-gray-600 font-heading">Items priced</span><span class="text-3xl font-black font-heading text-[#1C1410]">${priced.length}</span></div>
          <div class="border-2 border-gray-200 bg-[#FAF7F0] rounded-2xl p-4 text-center"><span class="block text-[11px] font-extrabold uppercase tracking-widest text-gray-600 font-heading">States</span><span class="text-3xl font-black font-heading text-[#1C1410]">25</span></div>
          <div class="border-2 border-gray-200 bg-[#FAF7F0] rounded-2xl p-4 text-center"><span class="block text-[11px] font-extrabold uppercase tracking-widest text-gray-600 font-heading">Typical All-Star</span><span class="text-3xl font-black font-heading text-[#1C1410]">${money(as.price)}</span></div>
          <div class="border-2 border-[#F59E0B] bg-[#FFFDF7] rounded-2xl p-4 text-center"><span class="block text-[11px] font-extrabold uppercase tracking-widest text-gray-600 font-heading">All-Star range seen</span><span class="text-2xl sm:text-3xl font-black font-heading text-[#1C1410]">${money(as.range[0])}&ndash;${money(as.range[1])}</span></div>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-14 px-4 bg-[#FBFBFC] border-b border-gray-200">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">${box('Why the price changes from place to place', `<p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">Prices are set restaurant by restaurant rather than nationally. The reasons most often given for the differences are:</p>
            <ul class="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-gray-700">
              <li>local wages and rent, which are higher in some cities and states;</li>
              <li>restaurants beside highways, near airports or in tourist areas;</li>
              <li>sales tax, which is added at the register and differs by state and city.</li>
            </ul>`)}${box('Where prices vary the most', `<p class="text-gray-700 text-sm sm:text-base leading-relaxed mb-3">Lowest and highest prices seen for the same item:</p>${ul(spread.map((i) => [esc(i.name), range(i.range)]))}`)}${box('Lowest-priced items', ul(cheapest.map((i) => [esc(i.name), money(i.price)])))}${box('How to check your local price', `<p class="text-gray-700 text-sm sm:text-base leading-relaxed">Find your restaurant on the <a class="font-bold underline text-[#1C1410]" href="https://locations.wafflehouse.com/" target="_blank" rel="noopener noreferrer">official Waffle House locator</a> and call ahead, or check the menu board when you arrive. Use the typical prices below to plan, and expect your bill to land inside or close to the range shown.</p>`)}
      </div>
    </section>

    <section class="py-14 md:py-16 px-4 bg-white border-b border-gray-200" id="price-tables">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-black text-[#1C1410] font-heading tracking-tight mb-2">Typical Prices and Price Ranges</h2>
        <p class="text-gray-600 text-sm sm:text-base mb-8 max-w-3xl">Typical price is the middle of the prices seen; &ldquo;Varies&rdquo; means no reliable price was found. Hashbrown toppings usually add about ${money(toppingPrice)} each.</p>${tables}
      </div>
    </section>

    <section class="py-14 md:py-16 px-4 bg-[#FAF7F0] border-b border-gray-200">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-black text-[#1C1410] font-heading tracking-tight mb-2">The 25 States With a Waffle House</h2>
        <p class="text-gray-700 text-sm sm:text-base mb-6 max-w-3xl">Waffle House operates in these 25 states, mostly across the South. See <a class="font-bold underline text-[#1C1410]" href="/locations">Waffle House locations</a> to find the restaurants in each state.</p>
        <ul class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-sm font-bold text-[#1C1410]">${STATES.map((s) => `
          <li class="bg-white border border-gray-200 rounded-xl px-3 py-2">${s}</li>`).join('')}
        </ul>
      </div>
    </section>

    <section class="py-14 md:py-16 px-4 bg-white border-b border-gray-200">
      <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">${[
  ['/menu', 'Full menu with prices', 'Every item with prices and nutrition'],
  ['/coupons', 'Ways to save', 'Regulars Club and money-saving orders'],
  ['/blog/waffle-house-all-star-special/', 'All-Star Special price', 'What the combo costs and saves'],
  ['/nutrition', 'Nutrition facts', 'Calories, protein and sodium'],
].map(([h, t, d]) => `
        <a href="${h}" class="block bg-white rounded-2xl border-2 border-gray-200 hover:border-[#F59E0B] p-5 transition-colors"><span class="block font-heading font-black text-[#1C1410]">${t} &rarr;</span><span class="block text-sm text-gray-600 mt-1">${d}</span></a>`).join('')}
      </div>
    </section>

    <section class="py-14 md:py-16 px-4 bg-[#F9FAFB]" id="faq">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-2xl sm:text-3xl font-black text-[#1C1410] font-heading tracking-tight mb-6">Frequently Asked Questions</h2>
        <div class="space-y-3">${faqs.map(([q, a]) => `
          <div class="faq-item bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
            <button type="button" class="faq-btn w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-[#1C1410] flex items-center justify-between gap-4 cursor-pointer" aria-expanded="false"><span>${esc(q)}</span><span class="faq-icon text-[#1C1410] font-black text-base shrink-0">&darr;</span></button>
            <div class="faq-content hidden px-5 pb-5 text-gray-700 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-3">${esc(a)}</div>
          </div>`).join('')}
        </div>
      </div>
    </section>
`;

let h = fs.readFileSync(FILE, 'utf8');
const nl = h.includes('\r\n') ? '\r\n' : '\n';
h = h.replace(/\r\n/g, '\n');
const s = h.search(/<main\b[^>]*>/), e = h.indexOf('</main>');
h = h.slice(0, s) + '<main id="main-content" tabindex="-1" class="flex-1 font-sans">' + main + '  ' + h.slice(e);

// head: title, descriptions, JSON-LD
const title = 'Waffle House Prices by State (2026): Typical Prices & Ranges';
const desc = `Typical Waffle House prices for ${priced.length} menu items, the range of prices seen at different restaurants, and why prices vary across the 25 states.`;
h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
h = h.replace(/(<meta\s+(?:property="og:title"|name="twitter:title"|name="title")\s+content=")[^"]*(")/g, (m, a, b) => a + esc(title) + b);
h = h.replace(/(<meta\s+(?:name="description"|property="og:description"|name="twitter:description")\s+content=")[^"]*(")/g, (m, a, b) => a + esc(desc) + b);
const ld = { '@context': 'https://schema.org', '@graph': [
  { '@type': 'WebPage', '@id': SITE + URL, url: SITE + URL, name: title, description: desc, publisher: { '@type': 'Organization', name: 'Waffle Guide', url: SITE + '/' } },
  { '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE + '/' },
    { '@type': 'ListItem', position: 2, name: 'Menu & Prices', item: SITE + '/menu' },
    { '@type': 'ListItem', position: 3, name: 'Prices by State', item: SITE + URL } ] },
  { '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: plain(a) } })) },
] };
const ldTag = `  <script type="application/ld+json">\n${JSON.stringify(ld, null, 2)}\n  </script>\n`;
if (h.includes('<script type="application/ld+json">')) {
  const a = h.indexOf('  <script type="application/ld+json">'), b = h.indexOf('</script>', a) + 10;
  h = h.slice(0, a) + ldTag + h.slice(b);
} else {
  h = h.replace('  <script src="/assets/js/site.js" defer></script>', ldTag + '  <script src="/assets/js/site.js" defer></script>');
}
// The old page script (price-factor modal, search, pills, FAQ) is no longer needed: site.js handles FAQ and the drawer.
h = h.replace(/\n[ \t]*<!-- =+ JAVASCRIPT: INTERACTIVE COMPARATOR & MODAL =+ -->\s*<script>[\s\S]*?<\/script>\n/, '\n');
fs.writeFileSync(FILE, h.replace(/\n/g, nl));
console.log(`prices-by-state: ${priced.length} priced items, ${withRange.length} with ranges`);
