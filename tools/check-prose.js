// Report sentences outside tables where a menu item's calories or price disagree with tools/data/menu.json.
// Looks for an item name (or alias) followed within a short window by "NNN cal(ories)" or "$N.NN".
// Usage: node tools/check-prose.js [file ...]
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const { items, money } = require('./menu-data');

const ROOT = path.join(__dirname, '..');
const aliases = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'aliases.json'), 'utf8'));
const names = [];
for (const it of items) names.push([it.name, it]);
for (const [a, target] of Object.entries(aliases)) if (target && !target.startsWith('@')) names.push([a, items.find((i) => i.name === target)]);
names.sort((a, b) => b[0].length - a[0].length);
const reEsc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Generated pages (tools/build-*.js and tools/content articles) take every number from the data, so by default
// only hand-written pages are checked.
const GENERATED = new Set(['menu.html', 'index.html', 'nutrition.html', 'prices-by-state.html', 'coupons.html', 'menu/pdf/index.html', 'blog/index.html',
  'diet/low-calorie/index.html', 'diet/high-protein/index.html', 'waffle-house-calories-allergies/index.html', 'waffle-house-dietary-guide/index.html']);
for (const c of fs.readdirSync(path.join(__dirname, 'content'))) {
  const m = fs.readFileSync(path.join(__dirname, 'content', c), 'utf8').match(/file:\s*'([^']+)'/);
  if (m) GENERATED.add(m[1]);
}
const files = process.argv.slice(2).length ? process.argv.slice(2) : cp.execSync('git ls-files "*.html"', { cwd: ROOT }).toString().trim().split('\n').filter((f) => !GENERATED.has(f));
let issues = 0;
for (const f of files) {
  const raw = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const textOnly = raw
    .replace(/<table\b[\s\S]*?<\/table>/g, ' ')
    .replace(/<script(?![^>]*ld\+json)[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'").replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ');
  const found = new Set();
  for (const [name, it] of names) {
    const re = new RegExp(reEsc(name) + "[^.!?]{0,60}?(\\$\\d+\\.\\d\\d|\\b\\d[\\d,]{0,4}\\s*(?:cal\\b|calories\\b|Cal\\b))", 'gi');
    for (const m of textOnly.matchAll(re)) {
      const val = m[1];
      let bad = false;
      if (val.startsWith('$')) bad = it.price != null && val !== money(it.price);
      else bad = Number(val.replace(/[^\d]/g, '')) !== it.cal;
      const key = m.index + val;
      if (bad && !found.has(key)) {
        found.add(key);
        issues++;
        console.log(`${f}: "${m[0].slice(0, 110)}"  ->  ${val.startsWith('$') ? money(it.price) : it.cal + ' cal'} (${it.name})`);
      }
    }
  }
}
console.log(`\n${issues} possible mismatch(es).`);
