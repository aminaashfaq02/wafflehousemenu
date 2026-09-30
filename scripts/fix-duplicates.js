const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix 1: Featured card - Classic Sweet Cream Waffle (line ~386)
// The featured section uses classic-sweet-cream-waffle.jpg — change it to featured-sweet-cream-waffle.jpg
// We need to find ONLY the one in the Featured section (first occurrence)
// Strategy: replace from comment <!-- Card: Classic Sweet Cream Waffle --> in featured section

// Find all occurrences of the src patterns and track which section they're in
let fixCount = 0;

// Fix 1: Featured Classic Sweet Cream Waffle -> featured-sweet-cream-waffle.jpg
// First occurrence of classic-sweet-cream-waffle.jpg (in featured section)
const old1 = '<!-- Card: Classic Sweet Cream Waffle -->\n            <a class="block h-full group" href="/menu">\n              <div class="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col h-full shadow-xs hover:shadow-lg transition-all duration-300">\n                <div class="relative h-[160px] sm:h-[175px] w-full bg-gray-100 flex items-center justify-center overflow-hidden">\n                  <img width="600" height="400" decoding="async" \r\n                    alt="Classic Sweet Cream Waffle" \r\n                    title="Classic Sweet Cream Waffle" \r\n                    loading="lazy" \r\n                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" \r\n                    src="/assets/menu/classic-sweet-cream-waffle.jpg"';

// Since the file has \r\n, let's do a simpler targeted replace using index approach
// Find index of first occurrence of classic-sweet-cream-waffle.jpg
const idx1 = html.indexOf('/assets/menu/classic-sweet-cream-waffle.jpg');
if (idx1 >= 0) {
  html = html.substring(0, idx1) + '/assets/menu/featured-sweet-cream-waffle.jpg' + html.substring(idx1 + '/assets/menu/classic-sweet-cream-waffle.jpg'.length);
  fixCount++;
  console.log('Fix 1 done: Featured Classic Sweet Cream Waffle -> featured-sweet-cream-waffle.jpg at index', idx1);
} else {
  console.log('Fix 1 SKIPPED: classic-sweet-cream-waffle.jpg not found');
}

// Fix 2: Featured Texas Bacon Cheesesteak Melt -> unique different Unsplash photo
// Find first occurrence of photo-1528735602780 (Texas Bacon Cheesesteak Melt featured card)
const oldURL2 = 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80';
const newURL2 = 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=600&q=80';
const idx2 = html.indexOf(oldURL2);
if (idx2 >= 0) {
  html = html.substring(0, idx2) + newURL2 + html.substring(idx2 + oldURL2.length);
  fixCount++;
  console.log('Fix 2 done: Featured Texas Bacon Cheesesteak Melt -> new Unsplash photo');
  
  // Now fix the second occurrence (Melts section card 17) - it still has the original URL
  // But we replaced index2, so second occurrence (melts section) still has old URL
  // Actually wait - we need to check if there's a second occurrence still with old URL
  if (html.indexOf(oldURL2) >= 0) {
    console.log('Fix 2b: Melts section Texas Bacon Cheesesteak Melt still has its original correct URL - OK');
  } else {
    console.log('Fix 2b: No more occurrences of old URL2 (both were same, melts section now needs its own)');
  }
} else {
  // Try to find it with HTML entity
  const oldURL2b = 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&amp;fit=crop&amp;w=600&amp;q=80';
  const idx2b = html.indexOf(oldURL2b);
  if (idx2b >= 0) {
    html = html.substring(0, idx2b) + 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&amp;fit=crop&amp;w=600&amp;q=80' + html.substring(idx2b + oldURL2b.length);
    fixCount++;
    console.log('Fix 2 done (entity-encoded): Featured Texas Bacon Cheesesteak Melt -> new Unsplash photo at', idx2b);
  } else {
    console.log('Fix 2 SKIPPED: photo-1528735602780 not found in either format');
  }
}

// Fix 3: Featured Sausage Egg & Cheese Bowl -> unique different Unsplash photo
// Find first occurrence of sausage-egg-and-cheese-bowl.jpg (featured card)
const old3 = '/assets/menu/sausage-egg-and-cheese-bowl.jpg';
const new3 = 'https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?auto=format&amp;fit=crop&amp;w=600&amp;q=80';
const idx3 = html.indexOf(old3);
if (idx3 >= 0) {
  html = html.substring(0, idx3) + new3 + html.substring(idx3 + old3.length);
  fixCount++;
  console.log('Fix 3 done: Featured Sausage Egg & Cheese Bowl -> Unsplash photo at index', idx3);
} else {
  console.log('Fix 3 SKIPPED: sausage-egg-and-cheese-bowl.jpg not found');
}

fs.writeFileSync('index.html', html);
console.log('Total fixes applied:', fixCount);
console.log('Done! index.html saved.');
