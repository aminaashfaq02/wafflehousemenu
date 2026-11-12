// Writes each page's last-changed date from tools/data/pages.json everywhere it appears, so the page, its
// structured data and the sitemap never disagree:
//   - visible "Updated", "Last updated" and "Last Updated:" labels (and "Effective" on the legal pages)
//   - JSON-LD "dateModified" and the article:modified_time meta (date part only, the time format is kept)
//   - <lastmod> in sitemap.xml for the page's canonical URL
// Data dates ("prices compiled ...") are separate and are not touched. Run in npm run build:data.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const { pages } = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'pages.json'), 'utf8'));
const LEGAL = new Set(['privacy-policy.html', 'cookies-policy.html', 'terms-and-conditions.html', 'disclaimer.html']);
const long = (iso) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
const DATE = '[A-Z][a-z]+ \\d{1,2}, 20\\d\\d';

let sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
let changed = 0;
for (const [file, iso] of Object.entries(pages)) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) throw new Error(`${file}: bad date ${iso}`);
  const p = path.join(ROOT, file);
  const before = fs.readFileSync(p, 'utf8');
  let h = before;
  const labels = LEGAL.has(file) ? '(?:Last [Uu]pdated:?|[Uu]pdated:?|Effective(?: Date)?:?)' : '(?:Last [Uu]pdated:?|[Uu]pdated:?)';
  // label, then optional tags/whitespace, then the date. Only inside <body>.
  const b = h.indexOf('<body');
  const body = h.slice(b).replace(new RegExp(`(\\b${labels}\\s*(?:<[^>]+>\\s*)*)(${DATE})`, 'g'), (m, a) => a + long(iso));
  h = h.slice(0, b) + body;
  h = h.replace(/("dateModified":\s*")\d{4}-\d{2}-\d{2}/g, `$1${iso}`);
  h = h.replace(/(<meta\s+property="article:modified_time"\s+content=")\d{4}-\d{2}-\d{2}/g, `$1${iso}`);
  if (h !== before) { fs.writeFileSync(p, h); changed++; }
  const canonical = (h.match(/<link\s+rel="canonical"\s+href="([^"]+)"/) || [])[1];
  if (canonical) {
    const re = new RegExp(`(<loc>${canonical.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>\\s*<lastmod>)[^<]*(</lastmod>)`);
    if (!re.test(sitemap)) throw new Error(`${file}: ${canonical} has no <lastmod> in sitemap.xml`);
    sitemap = sitemap.replace(re, `$1${iso}$2`);
  }
}
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);
console.log(`build-dates: ${Object.keys(pages).length} pages, ${changed} updated, sitemap lastmod synced`);
