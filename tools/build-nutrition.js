// Regenerate the highlight cards, the per-category nutrition tables and the hashbrown bowl calculator values on
// nutrition.html from tools/data/menu.json (via tools/menu-data.js).
// Usage: node tools/build-nutrition.js
const fs = require('fs');
const path = require('path');
const { categories, byName, components, money } = require('./menu-data');

const FILE = path.join(__dirname, '..', 'nutrition.html');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---- highlight cards
const HIGHLIGHTS = [
  ['Classic Waffle', '/assets/nutrition/classic-waffle.jpg', 'Classic sweet cream waffle on a white plate with butter'],
  ['Hashbrowns (Regular)', '/assets/nutrition/hashbrowns.jpg', 'Golden shredded hashbrowns on a white diner plate'],
  ['Two Egg Breakfast with Bacon', '/assets/nutrition/bacon-eggs.jpg', 'Two eggs and bacon strips on a breakfast plate'],
  ['All-Star Special with Bacon', '/assets/nutrition/all-star-special.jpg', 'All-Star Special platter with waffle, eggs, bacon and hashbrowns'],
  ['Sausage Egg & Cheese Hashbrown Bowl', '/assets/nutrition/sausage-egg-cheese-hashbrown-bowl.jpg', 'Hashbrown bowl topped with eggs, sausage and melted cheese'],
  ['Texas Bacon Cheesesteak Melt', '/assets/nutrition/texas-bacon-cheesesteak-melt.jpg', 'Texas cheesesteak melt with bacon on grilled Texas toast'],
  ['Pecan Waffle', '/assets/nutrition/pecan-waffle.jpg', 'Pecan waffle with butter on a diner plate'],
  ['Grits', '/assets/nutrition/southern-grits.jpg', 'Bowl of grits with a pat of butter'],
  ['Chicken & Eggs', '/assets/nutrition/grilled-chicken-breast.jpg', 'Grilled chicken breast with scrambled eggs, toast and tomatoes'],
];
const macro = (v, label, first) => `
                <div class="${first ? 'bg-[#FFF8E1] border border-[#F59E0B]/40' : 'bg-gray-50 border border-gray-200'} rounded-xl text-center py-2 px-1">
                  <div class="text-base font-black text-[#1C1410] font-heading leading-none">${v}</div>
                  <div class="text-[11px] text-gray-600 font-semibold mt-0.5">${label}</div>
                </div>`;
const highlightCards = HIGHLIGHTS.map(([name, img, alt]) => {
  const it = byName[name];
  if (!it) throw new Error('No menu item ' + name);
  return `
          <article class="bg-white rounded-3xl border-2 border-[#F59E0B] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col">
            <div class="relative overflow-hidden h-52">
              <img src="${img}" alt="${esc(alt)}" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" width="600" height="400">
              <span class="absolute top-3 right-3 bg-[#F59E0B] text-[#1C1410] text-xs font-black px-3 py-1 rounded-full shadow-sm">${money(it.price)}</span>
            </div>
            <div class="p-5 flex flex-col flex-1">
              <h3 class="text-lg font-extrabold text-[#1C1410] font-heading mb-1 leading-snug">${esc(it.name)}</h3>
              <p class="text-gray-600 text-sm leading-relaxed mb-4 flex-1 font-sans">${esc(it.desc)} Sodium: ${it.sodium.toLocaleString('en-US')}mg.</p>
              <div class="grid grid-cols-4 gap-1.5 mb-4">${macro(it.cal, 'Cal', true)}${macro(it.protein + 'g', 'Protein')}${macro(it.carbs + 'g', 'Carbs')}${macro(it.fat + 'g', 'Fat')}
              </div>
              <div class="flex flex-wrap gap-1.5">${(it.allergens.length ? it.allergens : ['No major allergens listed']).map((a) => `
                <span class="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800">${a}</span>`).join('')}
              </div>
            </div>
          </article>`;
}).join('');
const highlights = `      <!-- ================= FEATURED MENU CARDS (3-COL GRID) ================= -->
      <section class="mb-16" id="menu-cards">
        <div class="mb-8 text-center">
          <p class="text-gray-600 text-[11px] font-bold tracking-[0.2em] uppercase mb-2 font-sans">Common Orders</p>
          <h2 class="text-3xl font-extrabold text-[#1C1410] font-heading">Menu Nutrition Highlights</h2>
          <p class="text-gray-600 text-sm mt-2 max-w-xl mx-auto font-sans">Nine common orders, with what comes on the plate, the macros, sodium and the allergens listed for each.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${highlightCards}
        </div>
      </section>
      `;

// ---- category tables
const thc = 'py-4 px-6 font-black text-xs tracking-widest uppercase text-center';
const tables = categories.map((cat) => `
        <section class="mb-16" id="nutrition-${cat.id.replace(/^cat-/, '')}">
          <div class="mb-6">
            <h2 class="text-2xl font-extrabold text-[#1C1410] flex items-center gap-3 font-heading">${esc(cat.title)} Nutrition</h2>
          </div>
          <div class="w-full overflow-x-auto shadow-xs rounded-xl border border-gray-200 bg-white font-sans">
            <table class="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr class="bg-[#F59E0B] text-[#1C1410]">
                  <th class="py-4 px-6 font-black text-xs tracking-widest uppercase w-1/3">Menu item</th>
                  <th class="${thc}">Calories</th><th class="${thc}">Total fat</th><th class="${thc}">Carbs</th><th class="${thc}">Protein</th><th class="${thc}">Sodium</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">${cat.items.map((it, i) => `
              <tr class="${i % 2 ? 'bg-[#F9FAFB]' : 'bg-white'} hover:bg-gray-50/70 transition-colors">
                <td class="py-4 px-6 font-bold text-[#1C1410]"><a class="hover:text-amber-700 transition-colors" href="/menu#${cat.id}">${esc(it.name)}</a></td>
                <td class="py-4 px-6 text-center font-black text-[#1C1410]">${it.cal}</td>
                <td class="py-4 px-6 text-center text-gray-600 font-medium">${it.fat}g</td>
                <td class="py-4 px-6 text-center text-gray-600 font-medium">${it.carbs}g</td>
                <td class="py-4 px-6 text-center text-gray-600 font-medium">${it.protein}g</td>
                <td class="py-4 px-6 text-center text-gray-600 font-medium">${it.sodium.toLocaleString('en-US')}mg</td>
              </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </section>
`).join('');

let h = fs.readFileSync(FILE, 'utf8');
const nl = h.includes('\r\n') ? '\r\n' : '\n';
h = h.replace(/\r\n/g, '\n');
const cut = (startRe, endStr, replacement) => {
  const s = h.search(startRe), e = h.indexOf(endStr, s + 1);
  if (s < 0 || e < 0) throw new Error('markers not found: ' + startRe);
  h = h.slice(0, s) + replacement + h.slice(e);
};
cut(/      <!-- =+ FEATURED MENU CARDS \(3-COL GRID\)/, '<!-- ================= END FEATURED MENU CARDS', highlights);
cut(/      <!-- =+ (?:13 SEPARATE )?CATEGORY NUTRITION TABLES/, '      <!-- ================= ALLERGEN QUICK REFERENCE',
  `      <!-- ================= CATEGORY NUTRITION TABLES (generated by tools/build-nutrition.js) ================= -->\n${tables}\n`);

// ---- allergen quick reference + FAQ, from the component and menu data
{
  const { items } = require('./menu-data');
  const C = components;
  const ALLERGENS = [['Milk', 'Milk'], ['Egg', 'Egg'], ['Wheat', 'Wheat'], ['Soy', 'Soy'], ['Tree Nuts', 'Tree nuts'], ['Peanut', 'Peanuts']];
  const examples = (a) => {
    const names = Object.values(C).filter((c) => c.allergens.includes(a)).map((c) => c.name.replace(/^Regular (Slice )?|^Large /, ''));
    return [...new Set(names)].slice(0, 9).join(', ');
  };
  const count = (a) => items.filter((i) => i.allergens.includes(a)).length;
  const ref = `      <!-- ================= ALLERGEN QUICK REFERENCE (generated by tools/build-nutrition.js) ================= -->
      <section class="mb-16 bg-[#F9FAFB] border border-gray-200 rounded-2xl p-6 sm:p-8">
        <div class="mb-6">
          <h2 class="text-2xl font-extrabold text-[#1C1410] flex items-center gap-3 font-heading">Allergen Quick Reference</h2>
          <p class="text-gray-600 text-sm sm:text-base mt-2 font-sans">Which components list each major allergen, and how many of the ${items.length} menu items include it. The full item-by-item chart is in the <a class="font-bold underline text-[#1C1410]" href="/waffle-house-calories-allergies/#allergen-chart">allergen chart</a>.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">${ALLERGENS.map(([a, label]) => `
          <div class="bg-white border border-gray-200 rounded-xl p-4">
            <h3 class="font-heading font-black text-[#1C1410]">${label} <span class="text-sm font-bold text-gray-600">&middot; ${count(a)} items</span></h3>
            <p class="text-sm text-gray-700 mt-1">Listed for: ${esc(examples(a))}.</p>
          </div>`).join('')}
        </div>
        <p class="text-sm text-amber-950 bg-[#FFFBEB] border border-amber-200 rounded-xl p-4 mt-6 font-sans"><strong>Shared kitchen:</strong> Waffle House cooks on shared grills and waffle irons, so any item can come into contact with any allergen. The plain waffle lists tree nuts as well as the pecan waffle. With a severe allergy, confirm with the restaurant before ordering.</p>
      </section>

`;
  const faqs = [
    ['How are the nutrition figures compiled?', 'Each dish is added up from its usual components, such as the waffle, eggs, toast, hashbrowns and meat, using per-component nutrition values compiled by our editorial team. Sides default to hashbrowns and white toast; changing them changes the totals.'],
    ['Does Waffle House have low-carb and keto options?', `Waffle House does not label items keto, but two scrambled eggs with bacon and sliced tomatoes come to about ${C.EGG_TWO.carbs + C.BACON.carbs + C.TOMATOINSTEAD.carbs}g of carbs. Steaks, pork chops, sausage and bacon have little or no carbohydrate; toast, waffles, biscuits, hashbrowns and grits carry most of it.`],
    ['What is the lowest-calorie meal at Waffle House?', `Two scrambled eggs (${C.EGG_TWO.cal} calories) with sliced tomatoes (${C.TOMATOINSTEAD.cal}) and black coffee (${C.COFFEE.cal}) come to about ${C.EGG_TWO.cal + C.TOMATOINSTEAD.cal + C.COFFEE.cal} calories and ${C.EGG_TWO.protein + C.TOMATOINSTEAD.protein}g of protein.`],
    ['How many calories are in a Waffle House waffle?', `A classic waffle has about ${C.WAFFLE.cal} calories, ${C.WAFFLE.fat}g of fat, ${C.WAFFLE.carbs}g of carbohydrates and ${C.WAFFLE.protein}g of protein, before butter and syrup. Pecans add ${C.PECAN.cal} calories, peanut butter chips ${C.PBCHIP.cal} and chocolate chips ${C.CHOCCHIP.cal}.`],
    ['Which hashbrown toppings add the least sodium?', `Grilled onions and diced tomatoes add no measurable sodium. Cheese adds about ${C.COVERED.sodium}mg, mushrooms ${C.MUSHROOM.sodium}mg, chili ${C.TOPPED.sodium}mg, jalapeños ${C.PEPPERED.sodium}mg, ham ${C.CHUNKED.sodium}mg and sausage gravy ${C.COUNTRY.sodium}mg. A regular order of plain hashbrowns has about ${C.HASH.sodium}mg.`],
  ];
  const faq = `      <!-- ================= FREQUENTLY ASKED QUESTIONS ================= -->
      <section class="mb-16" id="faq">
        <div class="text-center max-w-2xl mx-auto mb-10">
          <h2 class="text-3xl sm:text-4xl font-extrabold font-heading text-[#1C1410] tracking-tight">Frequently Asked Questions About Nutrition</h2>
        </div>
        <div class="border-2 border-[#F59E0B] rounded-3xl p-5 sm:p-7 bg-[#FAF7F0] shadow-sm my-6">
          <div class="space-y-3 font-sans" id="nutrition-faq-list">${faqs.map(([q, a]) => `
            <div class="faq-item bg-white border-2 border-[#F59E0B] rounded-2xl overflow-hidden shadow-2xs">
              <button type="button" class="faq-btn w-full p-4 sm:p-5 text-left font-bold text-base sm:text-lg text-[#1C1410] flex items-center justify-between gap-4 cursor-pointer" aria-expanded="false"><span>${esc(q)}</span><span class="faq-icon text-[#1C1410] font-black text-base shrink-0">&darr;</span></button>
              <div class="faq-content hidden px-5 pb-5 text-gray-700 text-sm sm:text-base leading-relaxed border-t border-amber-100 pt-3">${esc(a)}</div>
            </div>`).join('')}
          </div>
        </div>
      </section>
    </div>
`;
  const a = h.search(/      <!-- =+ ALLERGEN QUICK REFERENCE/);
  const b = h.indexOf('  </main>');
  if (a < 0 || b < 0) throw new Error('allergen/faq markers not found');
  h = h.slice(0, a) + ref + faq + h.slice(b);
}

// ---- calculator: values for each ingredient button from the component data
const CALC = {
  'Regular Hashbrowns': 'HASH', 'Large Hashbrowns': 'LGHASH', 'Southern Grits': 'GRITS', '2 Farm Eggs': 'EGG_TWO',
  'Crumbled Sausage': 'SAUSAGE', 'Bacon (3 Strips)': 'BACON', 'Hickory City Ham': 'HAM', 'Thin Cheesesteak': 'CHSTKOTS',
  'Grilled Chicken': 'CHICKEN', 'Covered (Cheese)': 'COVERED', 'Smothered (Onions)': 'SMOTHERED', 'Chunked (Ham)': 'CHUNKED',
  'Capped (Mushrooms)': 'MUSHROOM', 'Peppered (Jalapeños)': 'PEPPERED', 'Topped (Bert\'s Chili)': 'TOPPED',
  'Country Sausage Gravy': 'COUNTRY', 'Diced (Tomatoes)': 'DICED',
};
const RENAME = { 'Southern Grits': 'Grits', '2 Farm Eggs': '2 Scrambled Eggs', 'Crumbled Sausage': 'Sausage (2 Patties)', 'Hickory City Ham': 'City Ham', 'Thin Cheesesteak': 'Cheesesteak', 'Country Sausage Gravy': 'Country (Sausage Gravy)' };
// After the first run the buttons carry the new names, so accept those too (keeps the script safe to re-run).
for (const [oldName, newName] of Object.entries(RENAME)) CALC[newName] = CALC[oldName];
const btnRe = /\n?[ \t]*<button type="button" class="calc-btn[^"]*"[^>]*data-name="([^"]+)"[^>]*>[\s\S]*?<\/button>\n?/g;
let removed = [];
h = h.replace(btnRe, (btn, name) => {
  const id = CALC[name];
  if (!id) { removed.push(name); return '\n'; }
  const c = components[id];
  const label = RENAME[name] || name;
  return btn
    .replace(/data-cal="[^"]*"/, `data-cal="${c.cal}"`).replace(/data-fat="[^"]*"/, `data-fat="${c.fat}"`)
    .replace(/data-carbs="[^"]*"/, `data-carbs="${c.carbs}"`).replace(/data-protein="[^"]*"/, `data-protein="${c.protein}"`)
    .replace(/data-name="[^"]*"/, `data-name="${esc(label)}"`)
    .replace(/(<\/div>\s*)[^<]+(\s*<\/span>)/, `$1${esc(label)}$2`)
    .replace(/>\d+ cal</, `>${c.cal} cal<`);
});
// Diced tomatoes join the last column in place of the removed extras.
if (!/data-name="Diced \(Tomatoes\)"/.test(h)) {
  const tpl = h.match(/<button type="button" class="calc-btn[^"]*"[^>]*data-name="Country \(Sausage Gravy\)"[^>]*>[\s\S]*?<\/button>/)[0];
  const d = components.DICED;
  const diced = tpl.replace(/data-cal="[^"]*"/, `data-cal="${d.cal}"`).replace(/data-fat="[^"]*"/, `data-fat="${d.fat}"`).replace(/data-carbs="[^"]*"/, `data-carbs="${d.carbs}"`).replace(/data-protein="[^"]*"/, `data-protein="${d.protein}"`)
    .replace(/data-name="[^"]*"/, 'data-name="Diced (Tomatoes)"').replace(/Country \(Sausage Gravy\)(\s*<\/span>)/, 'Diced (Tomatoes)$1').replace(/>\d+ cal</, `>${d.cal} cal<`);
  h = h.replace(tpl, tpl + '\n\n                ' + diced);
}
h = h.replace('Dressing &amp; Extras', 'Gravy &amp; Tomatoes');

fs.writeFileSync(FILE, h.replace(/\n/g, nl));
console.log('nutrition.html regenerated; calculator buttons removed:', removed.join(', ') || 'none');
