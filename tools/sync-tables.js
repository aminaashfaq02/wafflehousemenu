// Bring every price/nutrition table on the site in line with tools/data/menu.json.
// For each table, columns are recognised by their header (price, calories, protein, carbs, fat, sodium); each row's
// first cell is matched to a menu item by name (tools/data/aliases.json covers alternative names). Matched rows get
// the canonical numbers; unmatched rows are reported so they can be renamed, aliased or removed.
// Usage: node tools/sync-tables.js [--write] [file ...]
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const { byName, components, money, toppingPrice } = require('./menu-data');
const menuJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'menu.json'), 'utf8'));
const TOPPING_IDS = new Set(menuJson.categories.flatMap((c) => (c.toppings || []).map((t) => t.id)));

const ROOT = path.join(__dirname, '..');
const WRITE = process.argv.includes('--write');
const only = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const aliases = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'aliases.json'), 'utf8'));

const text = (s) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&rsquo;/g, "'").replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
const norm = (s) => s.toLowerCase().replace(/[®™*]/g, '').replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, ' ').trim();
const canon = Object.fromEntries(Object.keys(byName).map((n) => [norm(n), n]));
const aliasN = Object.fromEntries(Object.entries(aliases).map(([k, v]) => [norm(k), v]));

function match(name) {
  const k = norm(name);
  if (k in aliasN) return aliasN[k]; // may be null = deliberately not a menu item
  if (k in canon) return canon[k];
  return undefined;
}

const ROLE = [
  ['price', /price|cost/i], ['cal', /calor|^cal\b|kcal/i], ['protein', /protein/i], ['carbs', /carb/i], ['fat', /^fat\b|total fat|\bfat\b/i], ['sodium', /sodium/i],
];
function roles(headers) {
  return headers.map((h) => { const r = ROLE.find(([, re]) => re.test(h)); return r ? r[0] : null; });
}
// Replace the number inside a cell's text, keeping its markup and unit.
function setCell(cellHtml, role, item) {
  const v = item[role];
  if (role === 'price') return item.price === undefined ? cellHtml : cellHtml.replace(/\$\d+(?:\.\d\d)?|Varies/, money(item.price));
  if (v == null) return cellHtml;
  const fmt = role === 'sodium' ? v.toLocaleString('en-US') : String(v);
  return cellHtml.replace(/~?\d[\d,]*(?:\.\d+)?/, fmt);
}

// Pages whose tables are written by the build-*.js generators are skipped unless named explicitly.
const GENERATED = new Set(['menu.html', 'index.html', 'nutrition.html', 'prices-by-state.html', 'coupons.html', 'menu/pdf/index.html',
  'diet/low-calorie/index.html', 'diet/high-protein/index.html', 'waffle-house-calories-allergies/index.html', 'waffle-house-dietary-guide/index.html']);
// Articles built by tools/build-article.js from tools/content/*.js are generated too.
for (const f of fs.readdirSync(path.join(__dirname, 'content'))) {
  const src = fs.readFileSync(path.join(__dirname, 'content', f), 'utf8');
  const m = src.match(/file:\s*'([^']+)'/);
  if (m) GENERATED.add(m[1]);
}
const files = only.length ? only : cp.execSync('git ls-files "*.html"', { cwd: ROOT }).toString().trim().split('\n').filter((f) => !GENERATED.has(f));
const unmatched = {};
let changedRows = 0;
for (const f of files) {
  const file = path.join(ROOT, f);
  let h = fs.readFileSync(file, 'utf8');
  let fileChanged = 0;
  h = h.replace(/<table\b[\s\S]*?<\/table>/g, (tbl) => {
    const heads = [...tbl.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/g)].map((m) => text(m[1]));
    const rl = roles(heads);
    if (!rl.some((r) => r && r !== 'price') && !rl.includes('price')) return tbl;
    // The item name is in the first column whose header names an item/dish/example, else the first column.
    let ni = heads.findIndex((x) => /example|item|dish/i.test(x) && !rl[heads.indexOf(x)]);
    if (ni < 0) ni = 0;
    return tbl.replace(/<tr\b[^>]*>[\s\S]*?<\/tr>/g, (tr) => {
      const cells = [...tr.matchAll(/<td\b[^>]*>[\s\S]*?<\/td>/g)];
      if (cells.length < 2 || !cells[ni]) return tr;
      const name = text(cells[ni][0]);
      const m = match(name);
      if (m === null) return tr; // known non-menu row (e.g. a total or a custom order), leave it
      if (m === undefined) { (unmatched[f] = unmatched[f] || []).push(name); return tr; }
      // "@ID" aliases point at a single component (an add-on or a plain side) rather than a menu item.
      const item = m.startsWith('@')
        ? { ...components[m.slice(1)], price: TOPPING_IDS.has(m.slice(1)) ? toppingPrice : undefined }
        : byName[m];
      if (!item || item.cal === undefined) throw new Error('Bad alias target ' + m);
      let out = tr, changed = false;
      cells.forEach((c, i) => {
        const role = rl[i];
        if (!role || i === ni) return;
        const before = c[0];
        if (!/\d|Varies/.test(text(before))) return;
        const after = before.replace(/(<td\b[^>]*>)([\s\S]*?)(<\/td>)/, (all, a, inner, b) => a + setCell(inner, role, item) + b);
        if (after !== before) { out = out.replace(before, after); changed = true; }
      });
      if (changed) { changedRows++; fileChanged++; }
      return out;
    });
  });
  if (fileChanged && WRITE) fs.writeFileSync(file, h);
  if (fileChanged) console.log(`${WRITE ? 'updated' : 'would update'} ${fileChanged} row(s) in ${f}`);
}
console.log(`\n${changedRows} row(s) ${WRITE ? 'updated' : 'to update'}.`);
for (const [f, names] of Object.entries(unmatched)) console.log(`\nUNMATCHED in ${f}:\n  ` + [...new Set(names)].join('\n  '));
