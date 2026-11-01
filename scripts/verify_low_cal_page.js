const fs = require('fs');

const p = 'diet/low-calorie/index.html';
if (!fs.existsSync(p)) {
  console.error('File does not exist:', p);
  process.exit(1);
}

const c = fs.readFileSync(p, 'utf8');
console.log('Size:', c.length);
console.log('1. Has H1 Dishes under 600 calories:', c.includes('Dishes Under 600 Calories'));
console.log('2. Has 4 Stat Cards:', c.includes('Qualifying dishes') && c.includes('Avg. calories') && c.includes('Avg. protein') && c.includes('Avg. sodium'));
console.log('3. Has What to watch for:', c.includes('What to watch for on the low-calorie menu'));
console.log('4. Has How this list is built:', c.includes('How this list is built'));
console.log('5. Has At a glance:', c.includes('At a glance'));
console.log('6. Has Filter pills:', c.includes('filter-pills') && c.includes('Breakfast &amp; Eggs'));
console.log('7. Has Live search input:', c.includes('id="search-input"'));
console.log('8. Has Table rows:', c.includes('dish-row') && c.includes('Waffle House Royal Blend Coffee'));
console.log('9. Has Dietary & Reference Hub:', c.includes('Dietary &amp; Reference Hub') && c.includes('All Dietary Guides'));
console.log('10. Has Homepage FAQ styling:', c.includes('bg-[#FAF7F0]') && c.includes('border-[#FFC72C]'));
console.log('11. Has Homepage footer:', c.includes('id="footer-section"') && c.includes('wafflehouse-menu.com'));
console.log('12. Has Schema Markup:', c.includes('"@type": "FAQPage"') && c.includes('"@type": "WebPage"'));
