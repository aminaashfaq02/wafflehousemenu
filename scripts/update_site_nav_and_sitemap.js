const fs = require('fs');
const path = require('path');

// 1. Update sitemap.xml
let sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const lowCalUrl = 'https://www.wafflehouse-menu.com/diet/low-calorie/';
if (!sitemap.includes(lowCalUrl)) {
  const insertMarker = '</urlset>';
  const entry = `  <url>
    <loc>https://www.wafflehouse-menu.com/diet/low-calorie/</loc>
    <lastmod>2026-05-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
`;
  sitemap = sitemap.replace(insertMarker, entry + insertMarker);
  fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
  console.log('Added /diet/low-calorie/ to sitemap.xml');
}

// 2. Find all html files to update dropdown
function findHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'scratch') {
        results = results.concat(findHtmlFiles(fullPath));
      }
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const allHtml = findHtmlFiles('.');
console.log('Total HTML files found:', allHtml.length);

const targetSearch = '<a href="/waffle-house-dietary-guide/"';
const newDropdownLink = `<a href="/diet/low-calorie/" class="flex items-center justify-between px-4 py-2 text-sm font-bold text-gray-900 bg-amber-50 hover:bg-[#FFC72C]/20 hover:text-black transition-colors">
                  <span>Low-Calorie Menu</span>
                  <span class="bg-[#FFC72C] text-[#0B0B0E] text-[10px] font-black px-1.5 py-0.5 rounded uppercase">Under 600</span>
                </a>
                <a href="/waffle-house-dietary-guide/"`;

let updatedCount = 0;
allHtml.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes(targetSearch) && !content.includes('/diet/low-calorie/')) {
    content = content.replace(targetSearch, newDropdownLink);
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log('Updated nav in:', file);
  }
});

console.log(`Updated navigation dropdown in ${updatedCount} files.`);
