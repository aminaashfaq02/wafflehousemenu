const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

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

// Clean route table: maps clean URLs directly to HTML filenames
const routeTable = {
  '/': 'index.html',
  '/index': 'index.html',
  '/home': 'index.html',
  '/menu': 'menu.html',
  '/waffle-house-menu': 'menu.html',
  '/catering': 'catering.html',
  '/nutrition': 'nutrition.html',
  '/waffle-house-nutrition': 'nutrition.html',
  '/nutrition-guide-2026': 'nutrition-guide-2026.html',
  '/locations': 'locations.html',
  '/blog': 'blog.html',
  '/coupons': 'coupons.html',
  '/contact': 'contact.html',
  '/about': 'about.html',
  '/prices-by-state': 'prices-by-state.html',
  '/privacy-policy': 'privacy-policy.html',
  '/terms-and-conditions': 'terms-and-conditions.html',
  '/disclaimer': 'disclaimer.html',
  '/cookies-policy': 'cookies-policy.html',
  '/waffle-house-catering': 'waffle-house-catering.html',
  '/waffle-house-catering/': 'waffle-house-catering.html',
  '/waffle-house-dietary-guide': 'waffle-house-dietary-guide.html',
  '/waffle-house-dietary-guide/': 'waffle-house-dietary-guide.html',
  '/waffle-house-wedding-catering': 'waffle-house-wedding-catering.html',
  '/waffle-house-wedding-catering/': 'waffle-house-wedding-catering.html',
  '/waffle-house-birthday-party': 'waffle-house-birthday-party.html',
  '/waffle-house-birthday-party/': 'waffle-house-birthday-party.html',
  '/waffle-house-corporate-catering': 'waffle-house-corporate-catering.html',
  '/waffle-house-corporate-catering/': 'waffle-house-corporate-catering.html',
  '/waffle-house-school-event-catering': 'waffle-house-school-event-catering.html',
  '/waffle-house-school-event-catering/': 'waffle-house-school-event-catering.html',
  '/waffle-house-food-truck': 'waffle-house-food-truck.html',
  '/waffle-house-food-truck/': 'waffle-house-food-truck.html',
  '/waffle-house-calories-allergies': 'waffle-house-calories-allergies.html',
  '/waffle-house-calories-allergies/': 'waffle-house-calories-allergies.html',
  '/robots.txt': 'robots.txt',
  '/sitemap.xml': 'sitemap.xml',
  '/favicon.ico': 'favicon.ico'
};

// 301 Redirect map for legacy .html requests so the browser displays clean URLs
const legacyHtmlRedirects = {
  '/index.html': '/',
  '/menu.html': '/menu',
  '/catering.html': '/catering',
  '/nutrition.html': '/nutrition',
  '/about.html': '/about',
  '/contact.html': '/contact',
  '/locations.html': '/locations',
  '/blog.html': '/blog',
  '/coupons.html': '/coupons',
  '/prices-by-state.html': '/prices-by-state',
  '/privacy-policy.html': '/privacy-policy',
  '/terms-and-conditions.html': '/terms-and-conditions',
  '/disclaimer.html': '/disclaimer',
  '/cookies-policy.html': '/cookies-policy',
  '/nutrition-guide-2026.html': '/nutrition-guide-2026',
  '/waffle-house-catering.html': '/waffle-house-catering/',
  '/waffle-house-dietary-guide.html': '/waffle-house-dietary-guide/',
  '/waffle-house-wedding-catering.html': '/waffle-house-wedding-catering/',
  '/waffle-house-birthday-party.html': '/waffle-house-birthday-party/',
  '/waffle-house-corporate-catering.html': '/waffle-house-corporate-catering/',
  '/waffle-house-school-event-catering.html': '/waffle-house-school-event-catering/',
  '/waffle-house-food-truck.html': '/waffle-house-food-truck/',
  '/waffle-house-calories-allergies.html': '/waffle-house-calories-allergies/'
};

function resolveFilePath(target) {
  const candidates = [
    path.join(__dirname, target),
    path.join(process.cwd(), target),
    path.join(__dirname, 'assets', path.basename(target)),
    path.join(process.cwd(), 'assets', path.basename(target))
  ];
  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) {
      return c;
    }
  }
  return null;
}

function handler(req, res) {
  let [rawPath, rawQuery] = (req.url || '/').split('?');
  let urlPath = decodeURIComponent(rawPath);

  // 1. Favicon Handler
  if (urlPath === '/favicon.ico' || urlPath.endsWith('/favicon.ico')) {
    const fPath = resolveFilePath('favicon.ico');
    if (fPath) {
      res.writeHead(200, { 'Content-Type': 'image/x-icon', 'Cache-Control': 'public, max-age=86400' });
      return fs.createReadStream(fPath).pipe(res);
    }
  }

  // 2. PDF Handler
  if (urlPath.toLowerCase().endsWith('.pdf')) {
    const base = path.basename(urlPath);
    let pPath = resolveFilePath(base) || resolveFilePath('waffle-house-nutrition-allergen-guide-2026.pdf') || resolveFilePath(path.join('assets', 'waffle-house-nutrition-2026.pdf'));
    if (pPath) {
      res.writeHead(200, { 'Content-Type': 'application/pdf', 'Cache-Control': 'public, max-age=86400' });
      return fs.createReadStream(pPath).pipe(res);
    }
  }

  // 3. 301 Permanent Redirect for legacy .html paths -> clean URLs (No .html!)
  if (legacyHtmlRedirects[urlPath]) {
    const targetUrl = legacyHtmlRedirects[urlPath] + (rawQuery ? '?' + rawQuery : '');
    res.writeHead(301, { 'Location': targetUrl });
    return res.end();
  }

  // Also catch any nested legacy .html
  if (urlPath.includes('/') && urlPath.lastIndexOf('/') > 0 && urlPath.endsWith('.html')) {
    const baseName = path.basename(urlPath);
    const cleanTarget = legacyHtmlRedirects['/' + baseName] || ('/' + baseName.replace(/\.html$/, ''));
    res.writeHead(301, { 'Location': cleanTarget + (rawQuery ? '?' + rawQuery : '') });
    return res.end();
  }

  // 4. Exact Route Table Match
  if (routeTable[urlPath]) {
    const filename = routeTable[urlPath];
    const resolved = resolveFilePath(filename);
    if (resolved) {
      const ext = path.extname(resolved).toLowerCase();
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      });
      return fs.createReadStream(resolved).pipe(res);
    }
  }

  // 5. Try without trailing slash if routeTable has it
  const trimmedPath = urlPath.endsWith('/') && urlPath.length > 1 ? urlPath.slice(0, -1) : urlPath;
  if (routeTable[trimmedPath]) {
    const filename = routeTable[trimmedPath];
    const resolved = resolveFilePath(filename);
    if (resolved) {
      const ext = path.extname(resolved).toLowerCase();
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600'
      });
      return fs.createReadStream(resolved).pipe(res);
    }
  }

  // 6. Direct Static File Resolution
  const relativeTarget = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath;
  const staticResolved = resolveFilePath(relativeTarget) || resolveFilePath(relativeTarget + '.html') || resolveFilePath(path.join(relativeTarget, 'index.html'));

  if (staticResolved) {
    const ext = path.extname(staticResolved).toLowerCase();
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=86400'
    });
    return fs.createReadStream(staticResolved).pipe(res);
  }

  // 7. Not Found
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<!DOCTYPE html><html><head><title>404 Not Found</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;"><h1>404 Not Found</h1><p>The requested page was not found.</p><a href="/" style="display:inline-block;margin-top:20px;padding:10px 20px;background:#FFD700;color:#000;text-decoration:none;font-weight:bold;border-radius:6px;">Return to Home</a></body></html>');
}

const server = http.createServer(handler);

module.exports = handler;

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
}
