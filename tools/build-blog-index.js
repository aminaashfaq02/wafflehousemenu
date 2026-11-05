// Regenerate the category bar, article cards and counts on /blog/ from the article pages listed in
// tools/data/articles.json (title = <h1>, excerpt = meta description, image = og:image, date = datePublished).
// Usage: node tools/build-blog-index.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const FILE = path.join(ROOT, 'blog', 'index.html');
const SITE = 'https://www.wafflehouse-menu.com';
const { articles } = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'articles.json'), 'utf8'));
const esc = (s) => String(s).replace(/&(?![a-z]+;|#\d+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Cards show at about 600px wide, so use the 768w WebP when an article has one.
const small = (img) => {
  const s = img.replace(/\.webp$/, '-768.webp');
  return s !== img && fs.existsSync(path.join(ROOT, s)) ? s : img;
};
const text = (s) => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const posts = articles.map((a) => {
  const h = fs.readFileSync(path.join(ROOT, a.file), 'utf8');
  const url = '/' + a.file.replace(/index\.html$/, '');
  const title = text((h.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '');
  const excerpt = (h.match(/<meta\s+name="description"\s+content="([^"]*)"/) || [])[1] || '';
  const image = ((h.match(/<meta\s+property="og:image"\s+content="([^"]*)"/) || [])[1] || '').replace(SITE, '');
  const alt = (h.match(/<meta\s+property="og:image:alt"\s+content="([^"]*)"/) || [])[1] || title;
  const ld = JSON.parse((h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/) || [])[1] || '{}');
  const nodes = ld['@graph'] || [ld];
  const date = ((nodes.find((n) => n.datePublished) || {}).datePublished || '').slice(0, 10);
  const main = h.slice(h.indexOf('<main'), h.indexOf('</main>'));
  const words = text(main.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ')).split(' ').length;
  if (!title || !date || !image) throw new Error('Missing title/date/image in ' + a.file);
  return { ...a, url, title, excerpt, image, alt, date, read: Math.max(3, Math.round(words / 230)) };
}).sort((x, y) => y.date.localeCompare(x.date));

const cats = [...new Set(posts.map((p) => p.category))];
const short = (iso) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const btn = (cat, n, active) => `
          <button type="button" data-category="${esc(cat)}" class="cat-btn inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${active ? 'bg-[#1C1410] text-white shadow-xs active' : 'bg-white border border-gray-200 hover:border-gray-300 text-gray-700 hover:bg-gray-50'} cursor-pointer">
            <span>${esc(cat)}</span>
            <span class="cat-badge px-1.5 py-0.5 rounded-md text-[11px] ${active ? 'font-black bg-[#F59E0B] text-[#1C1410]' : 'font-bold bg-gray-100 text-gray-600'}">${n}</span>
          </button>`;
const bar = btn('All Guides', posts.length, true) + cats.map((c) => btn(c, posts.filter((p) => p.category === c).length, false)).join('');
const cards = posts.map((p) => `
        <article class="article-card group bg-white rounded-3xl border-2 border-[#F59E0B] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col" data-category="${esc(p.category)}">
          <div class="relative overflow-hidden aspect-video bg-gray-100 border-b border-gray-100">
            <a href="${p.url}" class="block overflow-hidden w-full h-full" tabindex="-1" aria-hidden="true">
              <img src="${small(p.image)}" alt="${esc(p.alt)}" width="600" height="338" loading="lazy" decoding="async" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </a>
            <div class="absolute bottom-3 left-3"><span class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#F59E0B] text-[#1C1410] shadow-md ring-1 ring-black/10">${esc(p.category)}</span></div>
          </div>
          <div class="p-6 sm:p-7 flex-1 flex flex-col">
            <div class="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-3"><time datetime="${p.date}">${short(p.date)}</time><span class="text-gray-300">&bull;</span><span>${p.read} min read</span></div>
            <h2 class="font-heading font-black text-xl sm:text-2xl text-[#1C1410] leading-snug tracking-tight mb-3"><a href="${p.url}" class="hover:underline decoration-[#F59E0B] decoration-2 underline-offset-4">${esc(p.title)}</a></h2>
            <p class="text-sm sm:text-base text-gray-700 leading-relaxed mb-6 flex-1 line-clamp-3">${esc(p.excerpt)}</p>
            <div class="pt-4 border-t border-gray-100 mt-auto"><a href="${p.url}" class="inline-flex items-center gap-1.5 font-heading font-bold text-sm text-[#1C1410]"><span>Read the guide</span><span class="font-black text-base">&rarr;</span></a></div>
          </div>
        </article>`).join('\n');

let h = fs.readFileSync(FILE, 'utf8');
const nl = h.includes('\r\n') ? '\r\n' : '\n';
h = h.replace(/\r\n/g, '\n');
const barStart = h.indexOf('id="category-bar">') + 'id="category-bar">'.length;
const barEnd = h.indexOf('\n        </div>', barStart);
h = h.slice(0, barStart) + bar + h.slice(barEnd);
const gridStart = h.indexOf('id="articles-grid">') + 'id="articles-grid">'.length;
const gridEnd = h.indexOf('\n      <!-- Empty State', gridStart);
if (barStart < 20 || gridStart < 20 || gridEnd < 0) throw new Error('blog index markers not found');
h = h.slice(0, gridStart) + cards + '\n\n</div>\n' + h.slice(gridEnd);
h = h.replace(/(id="article-count-display"[^>]*>)[^<]*/, `$1${posts.length} Articles Published`);
h = h.replace(/Expert guides, secret menu hacks &amp; money-saving tips/, 'Menu guides, ordering tips and money-saving ideas');
fs.writeFileSync(FILE, h.replace(/\n/g, nl));
console.log('blog index:', posts.length, 'articles in', cats.length, 'categories');
