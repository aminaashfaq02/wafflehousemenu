// Local static server that mirrors the production (Vercel) behaviour defined in vercel.json:
// cleanUrls, redirects and headers are read from that file, so there is one source of truth.
// Production does NOT run this file. Usage: npm start  (PORT env var optional)
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = process.env.PORT || 3000;
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

// Only these top-level entries are public. Everything else (server scripts, configs, .git, node_modules) is never served.
const PUBLIC_DIRS = new Set(['assets']);
const PUBLIC_FILES = /^[^/]+\.(html|xml|txt|ico|pdf)$/i;
const NON_PAGE_DIRS = new Set(['scripts', 'tools', 'node_modules']);

const redirects = new Map((config.redirects || []).map((r) => [r.source, r]));

function headersFor(urlPath) {
  const out = {};
  for (const rule of config.headers || []) {
    const re = new RegExp('^' + rule.source.replace(/\(\.\*\)/g, '.*') + '$');
    if (re.test(urlPath)) for (const h of rule.headers) out[h.key] = h.value;
  }
  return out;
}

function send(res, status, urlPath, extra, body) {
  const headers = Object.assign({}, headersFor(urlPath), extra);
  if (body !== undefined) headers['Content-Length'] = Buffer.byteLength(body);
  res.writeHead(status, headers);
  res.end(body);
}

function isPublic(rel) {
  const parts = rel.split('/').filter(Boolean);
  if (parts.some((p) => p.startsWith('.'))) return false;
  if (parts.length === 1) return PUBLIC_FILES.test(parts[0]);
  if (PUBLIC_DIRS.has(parts[0])) return true;
  return parts.length === 2 && parts[1] === 'index.html' && !NON_PAGE_DIRS.has(parts[0]); // page directories: /blog/index.html
}

function fileFor(rel) {
  const abs = path.resolve(ROOT, rel);
  if (abs !== ROOT && !abs.startsWith(ROOT + path.sep)) return null; // containment check
  if (!isPublic(rel)) return null;
  try {
    return fs.statSync(abs).isFile() ? abs : null;
  } catch (e) {
    return null;
  }
}

function serveFile(res, abs, urlPath) {
  const buf = fs.readFileSync(abs);
  send(res, 200, urlPath, { 'Content-Type': mimeTypes[path.extname(abs).toLowerCase()] || 'application/octet-stream' }, buf);
}

function notFound(res, urlPath) {
  const page = fileFor('404.html');
  const type = { 'Content-Type': 'text/html; charset=utf-8' };
  if (page) return send(res, 404, urlPath, type, fs.readFileSync(page));
  send(res, 404, urlPath, type, '<h1>404 Not Found</h1>');
}

function handler(req, res) {
  const [rawPath, rawQuery] = (req.url || '/').split('?');
  const query = rawQuery ? '?' + rawQuery : '';
  let urlPath;
  try {
    urlPath = decodeURIComponent(rawPath);
  } catch (e) {
    return send(res, 400, '/', { 'Content-Type': 'text/plain; charset=utf-8' }, 'Bad Request');
  }
  if (urlPath.includes('\0') || urlPath.includes('\\') || !urlPath.startsWith('/')) {
    return send(res, 400, '/', { 'Content-Type': 'text/plain; charset=utf-8' }, 'Bad Request');
  }

  // 1. Explicit redirects from vercel.json
  const rule = redirects.get(urlPath);
  if (rule) return send(res, rule.permanent ? 308 : 307, urlPath, { Location: rule.destination + query });

  const rel = urlPath.replace(/^\/+/, '');

  // 2. cleanUrls: /page.html -> /page, /dir/index.html -> /dir/
  if (config.cleanUrls && /\.html$/i.test(rel)) {
    const clean = rel.replace(/(^|\/)index\.html$/i, '$1').replace(/\.html$/i, '');
    return send(res, 308, urlPath, { Location: '/' + clean + query });
  }

  // 3. Exact file, /page -> page.html, /dir or /dir/ -> dir/index.html
  const trimmed = rel.replace(/\/+$/, '');
  const abs =
    (rel && !rel.endsWith('/') && fileFor(rel)) ||
    (trimmed && fileFor(trimmed + '.html')) ||
    fileFor(path.posix.join(trimmed, 'index.html'));
  if (abs) return serveFile(res, abs, urlPath);

  // 4. Real 404 (never fall back to the homepage)
  notFound(res, urlPath);
}

const server = http.createServer((req, res) => {
  try {
    handler(req, res);
  } catch (e) {
    console.error(e);
    if (!res.headersSent) send(res, 500, '/', { 'Content-Type': 'text/plain; charset=utf-8' }, 'Internal Server Error');
  }
});

module.exports = handler;

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Dev server running at http://localhost:${PORT}/`);
  });
}
