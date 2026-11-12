// Static SEO audit of every tracked page. Report only (exit 0), so it can run any time.
// Checks: title and meta description length, one h1, heading order, canonical and og:url match the
// sitemap URL, og/twitter image present and on disk, images with alt and size, answer figure before the
// first h2, "Updated" dates against sitemap lastmod and JSON-LD dateModified, and pages missing from
// the sitemap.  Usage: node tools/audit-seo.js
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://www.wafflehouse-menu.com';
const files = cp.execSync('git ls-files "*.html"', { cwd: ROOT }).toString().trim().split('\n').filter((f) => f !== '404.html');
const sitemap = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const sm = Object.fromEntries([...sitemap.matchAll(/<loc>([^<]+)<\/loc>\s*(?:<lastmod>([^<]+)<\/lastmod>)?/g)].map((m) => [m[1], m[2] || '']));
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&rsquo;/g, '’').replace(/&quot;/g, '"').replace(/&[a-z]+;/g, ' ');
const text = (s) => decode(s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const iso = (s) => { const d = new Date(s + ' UTC'); return isNaN(d) ? null : d.toISOString().slice(0, 10); };

const rows = [];
for (const f of files) {
  const h = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const issues = [];
  const title = decode((h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
  const desc = decode((h.match(/<meta\s+name="description"\s+content="([^"]*)"/) || [])[1] || '');
  const canonical = (h.match(/<link\s+rel="canonical"\s+href="([^"]*)"/) || [])[1];
  const ogUrl = (h.match(/<meta\s+property="og:url"\s+content="([^"]*)"/) || [])[1];
  const ogImg = (h.match(/<meta\s+property="og:image"\s+content="([^"]*)"/) || [])[1];
  const robots = (h.match(/<meta\s+name="robots"\s+content="([^"]*)"/) || [])[1] || '';
  if (!title) issues.push('no title'); else if (title.length > 60) issues.push(`title ${title.length} chars`); else if (title.length < 30) issues.push(`title short (${title.length})`);
  if (!desc) issues.push('no meta description'); else if (desc.length > 160) issues.push(`description ${desc.length} chars`); else if (desc.length < 110) issues.push(`description short (${desc.length})`);
  if (!canonical) issues.push('no canonical');
  else {
    if (ogUrl && ogUrl !== canonical) issues.push(`og:url ${ogUrl} != canonical`);
    if (!(canonical in sm) && !/noindex/.test(robots)) issues.push('canonical not in sitemap');
  }
  if (!ogImg) issues.push('no og:image');
  else if (ogImg.startsWith(SITE) && !fs.existsSync(path.join(ROOT, ogImg.replace(SITE, '')))) issues.push('og:image missing on disk');
  if (!/name="twitter:card"/.test(h)) issues.push('no twitter:card');
  const main = h.slice(Math.max(0, h.search(/<main\b/)), h.lastIndexOf('</main>') > 0 ? h.lastIndexOf('</main>') : h.length);
  const h1s = (h.match(/<h1\b/g) || []).length;
  if (h1s !== 1) issues.push(`${h1s} h1`);
  // heading order inside main
  let last = 1;
  for (const m of main.matchAll(/<h([1-6])\b/g)) { const l = +m[1]; if (l > last + 1) { issues.push(`heading jump h${last}->h${l}`); break; } last = l; }
  // images
  for (const m of h.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    if (!/\salt="[^"]+"/.test(tag)) issues.push('img without alt: ' + (tag.match(/src="([^"]+)"/) || [])[1]);
    if (!/\swidth="\d+"/.test(tag) || !/\sheight="\d+"/.test(tag)) issues.push('img without width/height: ' + (tag.match(/src="([^"]+)"/) || [])[1]);
    const src = (tag.match(/src="(\/[^"]+)"/) || [])[1];
    if (src && !fs.existsSync(path.join(ROOT, decodeURIComponent(src.split('?')[0])))) issues.push('img missing: ' + src);
  }
  // answer zone: text between h1 and first h2 carries a number
  const a = h.search(/<\/h1>/), z = h.indexOf('<h2', a);
  const lead = a > 0 ? text(h.slice(a, z > a ? z : a + 3000)) : '';
  const answer = /\$\d|\d+\s*(calories|cal\b|g\b|items|dishes|states|restaurants|minutes)/i.test(lead);
  // dates
  const visibleUpdated = (text(main).match(/(?:Updated|Last updated)\s+([A-Z][a-z]+ \d{1,2}, \d{4})/) || [])[1];
  const ldMod = ((h.match(/"dateModified":\s*"([^"]+)"/) || [])[1] || '').slice(0, 10);
  const lastmod = canonical ? (sm[canonical] || '').slice(0, 10) : '';
  if (visibleUpdated && lastmod && iso(visibleUpdated) !== lastmod) issues.push(`visible updated ${iso(visibleUpdated)} != sitemap ${lastmod}`);
  if (ldMod && lastmod && ldMod !== lastmod) issues.push(`dateModified ${ldMod} != sitemap ${lastmod}`);
  rows.push({ f, title, tl: title.length, dl: desc.length, answer, issues });
}
for (const loc of Object.keys(sm)) {
  const p = loc.replace(SITE, '').replace(/^\//, '');
  const cands = [p || 'index.html', p + '.html', p.replace(/\/$/, '') + '/index.html'];
  if (!cands.some((c) => fs.existsSync(path.join(ROOT, c)) && fs.statSync(path.join(ROOT, c)).isFile())) console.log('sitemap URL without a page: ' + loc);
}
let n = 0;
for (const r of rows) {
  if (r.issues.length) { n += r.issues.length; console.log(`\n${r.f}  [title ${r.tl}, desc ${r.dl}${r.answer ? '' : ', no figure before first h2'}]\n  - ${r.issues.join('\n  - ')}`); }
}
console.log(`\n${rows.length} pages, ${n} issue(s), ${rows.filter((r) => !r.answer).length} without a figure before the first h2: ${rows.filter((r) => !r.answer).map((r) => r.f).join(', ')}`);
