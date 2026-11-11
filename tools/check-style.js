// Style guard for page copy (handover note, section 2). Fails on:
//   - em dashes
//   - semicolons in visible text
//   - the banned words: can, may, just, that, very, really, literally, actually, certainly,
//     probably, basically, delve, embark, enlightening
// Checks the visible text of <body> (scripts, styles, comments and code removed), the <title> and the
// meta description of every tracked HTML page. "May" followed by a day or year (the month) is allowed.
// Usage: node tools/check-style.js [--list]   (exit 1 on any violation)
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT = path.join(__dirname, '..');
const BANNED = ['can', 'may', 'just', 'that', 'very', 'really', 'literally', 'actually', 'certainly', 'probably', 'basically', 'delve', 'embark', 'enlightening'];
const WORD = new RegExp(`\\b(${BANNED.join('|')})\\b`, 'gi');
const LIST = process.argv.includes('--list');

// git is an improvement, not a requirement (a build without .git falls back to walking the tree)
function pages() {
  try {
    return cp.execSync('git ls-files "*.html"', { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim().split('\n');
  } catch {
    const out = [];
    const walk = (d) => fs.readdirSync(path.join(ROOT, d), { withFileTypes: true }).forEach((e) => {
      const r = path.posix.join(d, e.name);
      if (e.isDirectory()) { if (!/^(node_modules|\.git|tools|scripts|assets)$/.test(e.name)) walk(r); } else if (e.name.endsWith('.html')) out.push(r);
    });
    walk('.');
    return out.map((f) => f.replace(/^\.\//, ''));
  }
}

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', mdash: '—', ndash: '–', rsquo: '’', lsquo: '‘', ldquo: '“', rdquo: '”', hellip: '…', bull: '•', middot: '·', rarr: '→', larr: '←', darr: '↓', uarr: '↑', rsaquo: '›', times: '×', minus: '−', copy: '©', reg: '®', trade: '™', ntilde: 'ñ', eacute: 'é', starf: '★', deg: '°' };
const decode = (s) => s.replace(/&#x([0-9a-f]+);/gi, (m, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(+d)).replace(/&([a-z]+);/gi, (m, n) => ENT[n.toLowerCase()] ?? ' ');

function texts(html) {
  const out = [];
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
  if (title) out.push(['title', decode(title)]);
  const desc = (html.match(/<meta\s+name="description"\s+content="([^"]*)"/) || [])[1];
  if (desc) out.push(['meta description', decode(desc)]);
  const body = (html.match(/<body\b[\s\S]*<\/body>/) || [''])[0]
    .replace(/<!--[\s\S]*?-->/g, ' ').replace(/<(script|style|code|pre|svg|noscript)\b[\s\S]*?<\/\1>/gi, ' ');
  // split on block-level tags so a violation is reported with its own sentence
  for (const chunk of body.split(/<\/?(?:p|li|h[1-6]|td|th|div|span|a|button|label|figcaption|summary|section|article|nav|header|footer|strong|em|b)\b[^>]*>/i)) {
    const t = decode(chunk.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
    if (t) out.push(['body', t]);
  }
  // alt and title attributes are page copy too
  for (const m of body.matchAll(/\s(?:alt|title|aria-label|placeholder)="([^"]*)"/g)) out.push(['attribute', decode(m[1])]);
  return out;
}

const problems = [];
for (const f of pages()) {
  if (!f) continue;
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const seen = new Set();
  for (const [where, t] of texts(html)) {
    const hits = [];
    if (t.includes('—')) hits.push('em dash');
    if (t.includes(';')) hits.push('semicolon');
    for (const m of t.matchAll(WORD)) {
      if (/^may$/i.test(m[1]) && /^May\s+(\d|20\d\d)/.test(t.slice(m.index))) continue; // the month
      hits.push(`"${m[1].toLowerCase()}"`);
    }
    if (!hits.length) continue;
    const key = where + t;
    if (seen.has(key)) continue;
    seen.add(key);
    problems.push({ f, where, hits, t });
  }
}

const byFile = {};
for (const p of problems) byFile[p.f] = (byFile[p.f] || 0) + p.hits.length;
if (LIST) for (const p of problems) console.log(`${p.f} [${p.where}] ${p.hits.join(', ')}: ${p.t.slice(0, 220)}`);
const total = Object.values(byFile).reduce((a, b) => a + b, 0);
if (total) {
  console.error(`check-style: ${total} violation(s) in ${Object.keys(byFile).length} file(s)`);
  for (const [f, n] of Object.entries(byFile).sort((a, b) => b[1] - a[1])) console.error(`  ${String(n).padStart(4)}  ${f}`);
  if (!LIST) console.error('Run node tools/check-style.js --list for each sentence.');
  process.exit(1);
}
console.log('check-style: 0 violations');
