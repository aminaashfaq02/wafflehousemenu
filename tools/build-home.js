// Regenerate the menu sections (cards + price/calorie tables) of index.html from the menu data.
// Usage: node tools/build-home.js
const fs = require('fs');
const path = require('path');
const { byName, money } = require('./menu-data');

const FILE = path.join(__dirname, '..', 'index.html');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const get = (n) => { const it = byName[n]; if (!it) throw new Error('No menu item ' + n); return it; };

const SECTIONS = [
  { id: 'featured', title: 'Featured - Prices &amp; Calories', sub: 'The orders most people come for, from the All-Star Special to a hashbrown bowl', link: '/menu#cat-all-star-specials', linkText: 'Full menu',
    cards: ['All-Star Special with Bacon', 'Classic Waffle', 'Texas Bacon Cheesesteak Melt', 'Sausage Egg & Cheese Hashbrown Bowl'],
    rows: ['All-Star Special with Bacon', 'All-Star Special with Sausage', 'All-Star Special with City Ham', 'Classic Waffle', 'Texas Bacon Cheesesteak Melt', 'Sausage Egg & Cheese Hashbrown Bowl'] },
  { id: 'breakfast', title: 'Breakfast Classics - Prices &amp; Calories', sub: 'Egg breakfasts with toast and a side of hashbrowns, grits or sliced tomatoes', link: '/menu#cat-classic-egg-breakfasts', linkText: 'All egg breakfasts',
    cards: ['Two Egg Breakfast', "Cheese 'N Eggs", 'T-Bone & Eggs', 'Country Ham & Eggs'],
    rows: ['Two Egg Breakfast', 'Two Egg Breakfast with Bacon', "Cheese 'N Eggs", 'T-Bone & Eggs', 'Sirloin & Eggs', 'Country Ham & Eggs', 'Chicken & Eggs', 'Pork Chops & Eggs'] },
  { id: 'hashbrown-bowls', title: 'Hashbrown Bowls - Prices &amp; Calories', sub: 'Large hashbrowns with cheese, eggs and meat, plus the lunch melt bowls', link: '/menu#cat-hashbrown-bowls', linkText: 'All bowls',
    cards: ['Sausage Egg & Cheese Hashbrown Bowl', 'Bacon Egg & Cheese Hashbrown Bowl', 'Chicken Fiesta Protein Bowl', 'Cheesesteak Melt Hashbrown Bowl'],
    rows: ['Sausage Egg & Cheese Hashbrown Bowl', 'Bacon Egg & Cheese Hashbrown Bowl', 'Ham Egg & Cheese Hashbrown Bowl', 'Chicken Fiesta Protein Bowl', 'Cheesesteak Melt Hashbrown Bowl', 'Chicken Melt Hashbrown Bowl'] },
  { id: 'waffles', title: 'Sweet Cream Waffles - Prices &amp; Calories', sub: 'The classic waffle and its pecan, chocolate chip and peanut butter chip versions', link: '/menu#cat-signature-waffles', linkText: 'All waffles',
    cards: ['Classic Waffle', 'Pecan Waffle', 'Chocolate Chip Waffle', 'Peanut Butter Chip Waffle'],
    rows: ['Classic Waffle', 'Pecan Waffle', 'Chocolate Chip Waffle', 'Peanut Butter Chip Waffle', 'Waffle with Bacon'] },
  { id: 'melts', title: 'Texas Melts - Prices &amp; Calories', sub: 'Grilled Texas toast, two slices of cheese and grilled onions', link: '/menu#cat-texas-melts', linkText: 'All melts',
    cards: ['Texas Cheesesteak Melt', 'Texas Angus Patty Melt', 'Texas Grilled Chicken Melt', 'Texas Bacon Cheesesteak Melt'],
    rows: ['Texas Cheesesteak Melt', 'Texas Bacon Cheesesteak Melt', 'Texas Angus Patty Melt', 'Texas Grilled Chicken Melt', 'Texas Sausage Melt'] },
  { id: 'sides-desserts', title: 'Sides &amp; Desserts - Prices &amp; Calories', sub: 'Hashbrowns, grits, breakfast meats and the two pies', link: '/menu#cat-breakfast-sides', linkText: 'All sides',
    cards: ['Hashbrowns (Regular)', 'Grits', 'Southern Pecan Pie', 'Triple Chocolate Pie'],
    rows: ['Hashbrowns (Regular)', 'Large Hashbrowns', 'Hashbrowns Scattered, Smothered & Covered', 'Grits', 'Bacon (3 Slices)', 'Sausage (2 Patties)', 'City Ham', 'Grilled Biscuit', 'Southern Pecan Pie', 'Triple Chocolate Pie'] },
  { id: 'beverages', title: 'Beverages - Prices &amp; Calories', sub: 'Coffee, Alice’s Iced Tea, sodas, juice and milk', link: '/menu#cat-beverages', linkText: 'All drinks',
    cards: ['Coffee', "Alice's Iced Tea (Sweet)", 'Orange Juice (9-oz)', 'Milk (9-oz)'],
    rows: ['Coffee', 'Coca-Cola', 'Diet Coke', "Alice's Iced Tea (Sweet)", "Alice's Iced Tea (Unsweet)", 'Orange Juice (9-oz)', 'Milk (9-oz)', 'Chocolate Milk (9-oz)'] },
];

const arrow = '<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-7-7l7 7-7 7"></path></svg>';
const card = (it, href) => `
            <a class="block h-full group" href="${href}">
              <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col h-full shadow-xs hover:shadow-lg transition-all duration-300">
                <div class="relative h-[160px] sm:h-[175px] w-full bg-gray-100 overflow-hidden">
                  <img width="600" height="400" decoding="async" loading="lazy" alt="${esc(it.name)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" src="/${esc(it.img)}" />
                </div>
                <div class="p-4 sm:p-5 flex flex-col flex-1">
                  <h3 class="font-extrabold text-[15px] sm:text-[16px] mb-1.5 tracking-tight text-gray-900 line-clamp-1">${esc(it.name)}</h3>
                  <p class="text-gray-600 text-[13px] leading-snug mb-4 flex-1 line-clamp-2">${esc(it.desc)}</p>
                  <div class="flex items-center justify-between border-t border-gray-100 pt-3">
                    <div class="flex flex-col">
                      <span class="text-[11px] font-bold text-gray-600 tracking-widest uppercase mb-0.5">Typical price</span>
                      <span class="font-black text-[20px] sm:text-[22px] tracking-tight leading-none text-[#1C1410]">${money(it.price)}</span>
                    </div>
                    <span class="text-gray-700 text-[12px] font-medium bg-gray-100 px-2 py-0.5 rounded-md">${it.cal} cal</span>
                  </div>
                </div>
              </div>
            </a>`;
const row = (it, href) => `
                <tr class="border-b border-gray-100 last:border-0 hover:bg-gray-50/70 transition-colors">
                  <td class="py-4 px-6 align-top"><a class="font-extrabold text-gray-900 hover:text-amber-700 transition-colors text-[14px]" href="${href}">${esc(it.name)}</a></td>
                  <td class="py-4 px-6 align-top font-black text-gray-900 text-[15px] whitespace-nowrap">${money(it.price)}</td>
                  <td class="py-4 px-6 align-top text-gray-700 font-medium text-[14px] text-center whitespace-nowrap">${it.cal} cal</td>
                  <td class="py-4 px-6 align-top text-gray-700 font-medium text-[14px] text-center whitespace-nowrap">${it.protein}g</td>
                  <td class="py-4 px-6 align-top text-gray-700 text-[13px] sm:text-[14px] leading-relaxed">${esc(it.desc)}</td>
                </tr>`;

const html = SECTIONS.map((s, i) => `
    <!-- ================= SECTION: ${s.id.toUpperCase()} (generated by tools/build-home.js) ================= -->
    <section class="py-16 md:py-20 ${i % 2 ? 'bg-[#F9FAFB]' : 'bg-white'}" id="${s.id}">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-gray-200/80 pb-4">
          <div>
            <h2 class="text-[28px] sm:text-[34px] md:text-[38px] font-extrabold text-[#1C1410] tracking-tight leading-tight font-heading">${s.title}</h2>
            <p class="text-gray-600 text-base sm:text-lg mt-1 font-sans">${esc(s.sub)}</p>
          </div>
          <a class="inline-flex items-center text-[#1C1410] font-bold hover:text-amber-700 transition-colors whitespace-nowrap text-sm sm:text-base gap-1.5 font-sans" href="${s.link}"><span>${s.linkText}</span>${arrow}</a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 font-sans">${s.cards.map((n) => card(get(n), s.link)).join('')}
        </div>
        <div class="w-full overflow-x-auto shadow-xs rounded-2xl border border-gray-200 bg-white font-sans">
          <table class="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr class="bg-[#1C1410] text-white">
                <th class="py-4 px-6 font-black text-xs tracking-widest uppercase w-1/4">Menu item</th>
                <th class="py-4 px-6 font-black text-xs tracking-widest uppercase">Typical price</th>
                <th class="py-4 px-6 font-black text-xs tracking-widest uppercase text-center">Calories</th>
                <th class="py-4 px-6 font-black text-xs tracking-widest uppercase text-center">Protein</th>
                <th class="py-4 px-6 font-black text-xs tracking-widest uppercase w-5/12">What comes with it</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">${s.rows.map((n) => row(get(n), s.link)).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </section>
`).join('');

let h = fs.readFileSync(FILE, 'utf8');
const nl = h.includes('\r\n') ? '\r\n' : '\n';
h = h.replace(/\r\n/g, '\n');
const s = h.search(/    <!-- =+ SECTION: FEATURED/);
const e = h.indexOf('    <!-- ================= REGULARS CLUB');
if (s < 0 || e < 0) throw new Error('home markers not found');
h = h.slice(0, s) + html.replace(/^\n/, '') + '\n' + h.slice(e);
fs.writeFileSync(FILE, h.replace(/\n/g, nl));
console.log('index.html: ' + SECTIONS.length + ' menu sections regenerated');
