// Regenerate the category sections, category tab bar and hero counts of menu.html from tools/data/menu.json.
// Usage: node tools/build-menu.js
const fs = require('fs');
const path = require('path');
const { categories, items, money } = require('./menu-data');

const FILE = path.join(__dirname, '..', 'menu.html');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pill = (a) => `<span class="inline-block bg-amber-100 text-amber-900 text-[11px] font-bold px-1.5 py-0.5 rounded mx-0.5 mb-0.5">${a}</span>`;

function card(it, label) {
  return `
          <article class="bg-white rounded-3xl border-2 border-[#F59E0B] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group">
            <div class="relative overflow-hidden h-52 bg-gray-100">
              <img src="${esc(it.img)}" alt="${esc(it.name)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width="600" height="400" decoding="async" />
              <span class="absolute top-3 left-3 bg-[#F59E0B] text-[#1C1410] text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">${esc(label)}</span>
            </div>
            <div class="p-5 flex flex-col flex-1">
              <div class="flex items-start justify-between gap-2 mb-2">
                <h3 class="text-base sm:text-lg font-extrabold text-[#1C1410] font-heading leading-snug group-hover:text-amber-700 transition-colors">${esc(it.name)}</h3>
                <span class="bg-[#F59E0B] text-[#1C1410] text-sm font-black px-2.5 py-1 rounded-xl shadow-2xs shrink-0 font-heading">${money(it.price)}</span>
              </div>
              <p class="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4 flex-1 font-sans">${esc(it.desc)}</p>
              <p class="text-xs font-bold text-gray-700 font-sans">${it.cal} cal &middot; ${it.protein}g protein &middot; ${it.carbs}g carbs</p>
            </div>
          </article>`;
}

function row(it, i) {
  return `
                <tr class="${i % 2 ? 'bg-gray-50/60' : 'bg-white'} hover:bg-amber-50/30 transition-colors">
                  <td class="py-3.5 px-4 sm:px-6 font-bold text-[#1C1410]">${esc(it.name)}</td>
                  <td class="py-3.5 px-3 text-center font-black text-[#1C1410] font-heading">${money(it.price)}</td>
                  <td class="py-3.5 px-3 text-center font-bold text-gray-900">${it.cal}</td>
                  <td class="py-3.5 px-3 text-center text-gray-600 font-medium">${it.protein}g</td>
                  <td class="py-3.5 px-3 text-center text-gray-600 font-medium">${it.carbs}g</td>
                  <td class="py-3.5 px-3 text-center text-gray-600 font-medium">${it.fat}g</td>
                  <td class="py-3.5 px-3 text-center text-gray-600 font-medium">${it.sodium.toLocaleString('en-US')}mg</td>
                  <td class="py-3.5 px-4 text-center">${it.allergens.length ? it.allergens.map(pill).join('') : '<span class="text-gray-500 text-xs">None listed</span>'}</td>
                </tr>`;
}

const th = (t, cls = 'py-3.5 px-3 text-center') => `<th class="${cls}">${t}</th>`;
function table(n, cat) {
  return `
        <div class="mt-10">
          <div class="mb-4">
            <h3 class="text-xl font-extrabold text-[#1C1410] font-heading flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-[#F59E0B] inline-block"></span>
              ${n}. ${esc(cat.title)}: Prices &amp; Nutrition
            </h3>
            <p class="text-xs text-gray-500 font-sans mt-0.5">Typical prices and nutrition estimates for each item as described above. Prices vary by location.</p>
          </div>
          <div class="w-full overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-xs bg-white">
            <table class="w-full text-left border-collapse min-w-[760px] font-sans text-xs sm:text-sm">
              <thead>
                <tr class="bg-[#1C1410] text-[#F59E0B] uppercase font-heading font-black text-[11px] tracking-wider">
                  ${th('Menu item', 'py-3.5 px-4 sm:px-6 w-1/3')}${th('Typical price')}${th('Calories')}${th('Protein')}${th('Carbs')}${th('Fat')}${th('Sodium')}${th('Allergens', 'py-3.5 px-4 text-center')}
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">${cat.items.map(row).join('')}
              </tbody>
            </table>
          </div>
        </div>`;
}

function toppingsTable(cat) {
  if (!cat.toppings.length) return '';
  const rows = cat.toppings.map((t, i) => `
                <tr class="${i % 2 ? 'bg-gray-50/60' : 'bg-white'}">
                  <td class="py-3 px-4 sm:px-6 font-bold text-[#1C1410]">${esc(t.call)}</td>
                  <td class="py-3 px-3 text-gray-700">${esc(t.what)}</td>
                  <td class="py-3 px-3 text-center font-bold text-gray-900">+${t.cal}</td>
                  <td class="py-3 px-3 text-center text-gray-600">+${t.protein}g</td>
                  <td class="py-3 px-3 text-center text-gray-600">+${t.sodium}mg</td>
                </tr>`).join('');
  return `
        <div class="mt-10">
          <div class="mb-4">
            <h3 class="text-xl font-extrabold text-[#1C1410] font-heading flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-[#F59E0B] inline-block"></span>
              Hashbrown Toppings: What Each Word Adds
            </h3>
            <p class="text-xs text-gray-500 font-sans mt-0.5">Each topping usually costs about ${money(cat.toppings[0].price)} extra. Values are per topping on a regular order.</p>
          </div>
          <div class="w-full overflow-x-auto rounded-2xl border-2 border-gray-200 shadow-xs bg-white">
            <table class="w-full text-left border-collapse min-w-[560px] font-sans text-xs sm:text-sm">
              <thead>
                <tr class="bg-[#1C1410] text-[#F59E0B] uppercase font-heading font-black text-[11px] tracking-wider">
                  ${th('Say', 'py-3 px-4 sm:px-6')}${th('Topping', 'py-3 px-3')}${th('Calories', 'py-3 px-3 text-center')}${th('Protein', 'py-3 px-3 text-center')}${th('Sodium', 'py-3 px-3 text-center')}
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">${rows}
              </tbody>
            </table>
          </div>
        </div>`;
}

const sections = categories.map((cat, i) => {
  const cards = cat.items.filter((it) => !it.noCard && it.img);
  return `
    <section id="${cat.id}" class="py-12 sm:py-16 ${i % 2 ? 'bg-[#F9FAFB]' : 'bg-white'} border-b border-gray-200 scroll-mt-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-10 text-center max-w-3xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-black font-heading text-[#1C1410] tracking-tight">${esc(cat.title)}</h2>
          <p class="mt-3 text-base sm:text-lg text-gray-600 font-sans leading-relaxed">${esc(cat.intro)}</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">${cards.map((it) => card(it, cat.label)).join('')}
        </div>${table(i + 1, cat)}${toppingsTable(cat)}
      </div>
    </section>
`;
}).join('');

let h = fs.readFileSync(FILE, 'utf8');
const nl = h.includes('\r\n') ? '\r\n' : '\n';
h = h.replace(/\r\n/g, '\n');
const START = /    <!-- =+ (?:COMPREHENSIVE )?MENU CATEGORIES/;
const END = '<!-- ================= FAQ ACCORDION SECTION';
const s = h.search(START), e = h.indexOf(END);
if (s < 0 || e < s) throw new Error('menu section markers not found');
h = h.slice(0, s) + `    <!-- ================= MENU CATEGORIES (generated by tools/build-menu.js from tools/data/menu.json) ================= -->\n${sections}\n` + h.slice(e);

// category tab bar
const navLinks = categories.map((c) => `\n            <a href="#${c.id}" class="px-3 py-1.5 text-xs font-bold font-heading text-gray-700 bg-gray-100 hover:bg-[#F59E0B] hover:text-[#1C1410] rounded-full transition-colors">${esc(c.nav)}</a>`).join('');
h = h.replace(/(<nav aria-label="Waffle House Menu Categories"[^>]*>)[\s\S]*?(\n\s*<\/nav>)/, (m, a, b) => a + navLinks + b);
h = h.replace(/<!-- =+ \d+ CATEGORY STICKY TAB BAR =+ -->/, '<!-- ================= CATEGORY STICKY TAB BAR ================= -->');

// hero counts
const n = items.length, c = categories.length;
const minPrice = Math.min(...items.filter((i) => i.price != null && i.cal > 0).map((i) => i.price));
h = h.replace(/<!-- Stat 1: \d+ Menu Items -->/, `<!-- Stat 1: ${n} Menu Items -->`);
h = h.replace(/(mr-1 inline-block">)\d+(<\/span>\s*<span class="text-xs sm:text-sm font-bold text-gray-800">Menu Items)/, `$1${n}$2`);
h = h.replace(/<!-- Stat 2: \d+ Categories -->/, `<!-- Stat 2: ${c} Categories -->`);
h = h.replace(/(mr-1 inline-block">)\d+(<\/span>\s*<span class="text-xs sm:text-sm font-bold text-gray-800">Categories)/, `$1${c}$2`);
h = h.replace(/<!-- Stat 3: Prices from \$[\d.]+ -->/, `<!-- Stat 3: Prices from ${money(minPrice)} -->`);
h = h.replace(/(Prices from<\/span>\s*<span class="font-heading font-black text-xl text-\[#F59E0B\] bg-\[#1C1410\] px-2 py-0.5 rounded-lg inline-block">)\$[\d.]+/, `$1${money(minPrice)}`);
h = h.replace(/every item across \d+ categories with typical prices and calorie counts/, `${n} items across ${c} categories with typical prices and nutrition estimates`);

fs.writeFileSync(FILE, h.replace(/\n/g, nl));
console.log(`menu.html: ${c} categories, ${n} items, prices from ${money(minPrice)}`);
