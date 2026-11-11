// Keeps FAQPage JSON-LD word-for-word with the visible FAQ on hand-written pages.
// Reads each visible question (.faq-btn > span) and answer (.faq-content), and rewrites the FAQPage
// mainEntity in the same order. Refuses to write when the counts differ, so a page never ends up with
// schema questions it does not show. Generated articles build their schema from the same source
// and are skipped.  Usage: node tools/sync-faq-schema.js [--check]
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CHECK = process.argv.includes('--check');
const PAGES = ['blog/index.html', 'menu/pdf/index.html', 'locations.html', 'waffle-house-catering/index.html', 'recipes/waffle-house-sweet-cream-waffle-copycat/index.html'];
const plain = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&rsquo;|&#39;/g, '’').replace(/&lsquo;/g, '‘')
  .replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”').replace(/&quot;/g, '"').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—')
  .replace(/&nbsp;/g, ' ').replace(/&deg;/g, '°').replace(/&rarr;/g, '→').replace(/\s+/g, ' ').trim();

let changed = 0;
for (const f of PAGES) {
  const file = path.join(ROOT, f);
  let h = fs.readFileSync(file, 'utf8');
  const visible = [...h.matchAll(/<button\b[^>]*class="faq-btn[^"]*"[^>]*>\s*<span>([\s\S]*?)<\/span>[\s\S]*?<div\b[^>]*class="faq-content[^"]*"[^>]*>([\s\S]*?)<\/div>/g)]
    .map((m) => [plain(m[1]), plain(m[2])]);
  // a page can carry several JSON-LD blocks; use the one holding the FAQPage
  const TAG = '<script type="application/ld+json">';
  let a = -1, b = -1, raw = '', ld = null, faq = null;
  for (let at = h.indexOf(TAG); at >= 0; at = h.indexOf(TAG, at + 1)) {
    const end = h.indexOf('</script>', at);
    const r = h.slice(at + TAG.length, end);
    const j = JSON.parse(r);
    const found = (j['@graph'] || [j]).find((n) => n['@type'] === 'FAQPage');
    if (found) { a = at; b = end; raw = r; ld = j; faq = found; break; }
  }
  if (!faq) continue;
  if (faq.mainEntity.length !== visible.length) throw new Error(`${f}: ${faq.mainEntity.length} schema questions but ${visible.length} visible`);
  let diff = 0;
  faq.mainEntity.forEach((q, i) => {
    const [vq, va] = visible[i];
    if (q.name !== vq || q.acceptedAnswer.text !== va) { diff++; q.name = vq; q.acceptedAnswer.text = va; }
  });
  if (!diff) continue;
  changed += diff;
  console.log(`${f}: ${diff} FAQ entr${diff === 1 ? 'y' : 'ies'} ${CHECK ? 'out of sync' : 'synced'}`);
  if (CHECK) continue;
  const indent = (raw.match(/\n([ \t]*)\S/) || [, '  '])[1];
  const json = JSON.stringify(ld, null, 2).split('\n').map((l) => indent + l).join('\n');
  h = h.slice(0, a) + '<script type="application/ld+json">\n' + json + '\n  ' + h.slice(b);
  fs.writeFileSync(file, h);
}
if (CHECK && changed) process.exit(1);
console.log(`sync-faq-schema: ${changed} entr${changed === 1 ? 'y' : 'ies'} ${CHECK ? 'out of sync' : 'updated'}`);
