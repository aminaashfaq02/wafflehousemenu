const fs = require('fs');
const path = require('path');

// 1. Update sitemap.xml
let sitemap = fs.readFileSync('sitemap.xml', 'utf8');
const highProteinUrl = 'https://www.wafflehouse-menu.com/diet/high-protein/';
if (!sitemap.includes(highProteinUrl)) {
  const insertMarker = '</urlset>';
  const entry = `  <url>
    <loc>https://www.wafflehouse-menu.com/diet/high-protein/</loc>
    <lastmod>2026-11-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
`;
  sitemap = sitemap.replace(insertMarker, entry + insertMarker);
  fs.writeFileSync('sitemap.xml', sitemap, 'utf8');
  console.log('Added /diet/high-protein/ to sitemap.xml');
} else {
  console.log('/diet/high-protein/ already in sitemap.xml');
}

// 2. Find all HTML files
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

const highProteinDropdown = `
                <a href="/diet/high-protein/" class="flex items-center justify-between px-4 py-2 text-sm font-bold text-gray-900 bg-amber-50 hover:bg-[#FFC72C]/20 hover:text-black transition-colors">
                  <span>High-Protein Menu</span>
                  <span class="bg-[#FFC72C] text-[#0B0B0E] text-[10px] font-black px-1.5 py-0.5 rounded uppercase">20g–76g</span>
                </a>`;

let updatedCount = 0;
allHtml.forEach(file => {
  // Avoid self modifying if already has it
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('/diet/high-protein/')) {
    return;
  }
  
  if (content.includes('/diet/low-calorie/')) {
    // Insert high-protein right after low-calorie in the dropdown
    const lowCalSearch = /(href="\/diet\/low-calorie\/"[^>]*>[\s\S]*?<\/a>)/i;
    if (lowCalSearch.test(content)) {
      content = content.replace(lowCalSearch, `$1${highProteinDropdown}`);
      fs.writeFileSync(file, content, 'utf8');
      updatedCount++;
    }
  }
});

console.log(`Updated navigation dropdown in ${updatedCount} files.`);
