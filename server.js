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

// Route Table: Maps all clean URLs to their physical HTML file
const routeTable = {
  '/': 'index.html',
  '/index': 'index.html',
  '/home': 'index.html',
  '/about': 'about.html',
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

// 301 Redirect map for legacy .html paths -> clean URLs (No .html!)
const legacyHtmlRedirects = {
  '/index.html': '/',
  '/menu.html': '/menu',
  '/catering.html': '/waffle-house-catering/',
  '/catering': '/waffle-house-catering/',
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
  '/waffle-house-wedding-catering.html': '/waffle-house-catering/#wedding-catering',
  '/waffle-house-wedding-catering': '/waffle-house-catering/#wedding-catering',
  '/waffle-house-wedding-catering/': '/waffle-house-catering/#wedding-catering',
  '/waffle-house-birthday-party.html': '/waffle-house-catering/#birthday-catering',
  '/waffle-house-birthday-party': '/waffle-house-catering/#birthday-catering',
  '/waffle-house-birthday-party/': '/waffle-house-catering/#birthday-catering',
  '/waffle-house-corporate-catering.html': '/waffle-house-catering/#corporate-catering',
  '/waffle-house-corporate-catering': '/waffle-house-catering/#corporate-catering',
  '/waffle-house-corporate-catering/': '/waffle-house-catering/#corporate-catering',
  '/waffle-house-school-event-catering.html': '/waffle-house-catering/#school-events',
  '/waffle-house-school-event-catering': '/waffle-house-catering/#school-events',
  '/waffle-house-school-event-catering/': '/waffle-house-catering/#school-events',
  '/waffle-house-food-truck.html': '/waffle-house-catering/#food-truck',
  '/waffle-house-food-truck': '/waffle-house-catering/#food-truck',
  '/waffle-house-food-truck/': '/waffle-house-catering/#food-truck',
  '/waffle-house-calories-allergies.html': '/waffle-house-calories-allergies/'
};

// IN-MEMORY FILE CACHE FOR LIGHTNING-FAST RESPONSES (<5ms)
const memCache = {};

function getFileContent(filename) {
  if (memCache[filename]) return memCache[filename];
  
  const candidates = [
    path.join(__dirname, filename),
    path.join(process.cwd(), filename),
    path.join(__dirname, 'assets', path.basename(filename)),
    path.join(process.cwd(), 'assets', path.basename(filename)),
    path.join(__dirname, path.basename(filename)),
    path.join(process.cwd(), path.basename(filename))
  ];

  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) {
      const buf = fs.readFileSync(c);
      memCache[filename] = buf;
      return buf;
    }
  }
  return null;
}

// Pre-warm cache at boot time
for (const fn of Object.values(routeTable)) {
  getFileContent(fn);
}

function handler(req, res) {
  const [rawPath, rawQuery] = (req.url || '/').split('?');
  const urlPath = decodeURIComponent(rawPath);

  // 1. Favicon Handler
  if (urlPath === '/favicon.ico' || urlPath.endsWith('/favicon.ico')) {
    const favBuf = getFileContent('favicon.ico');
    if (favBuf) {
      res.writeHead(200, {
        'Content-Type': 'image/x-icon',
        'Content-Length': favBuf.length,
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable'
      });
      return res.end(favBuf);
    }
  }

  // 2. PDF Handler
  if (urlPath.toLowerCase().endsWith('.pdf')) {
    const base = path.basename(urlPath);
    const pdfBuf = getFileContent(base) || getFileContent('waffle-house-nutrition-allergen-guide-2026.pdf') || getFileContent('waffle-house-nutrition-2026.pdf');
    if (pdfBuf) {
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': pdfBuf.length,
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable'
      });
      return res.end(pdfBuf);
    }
  }

  // 3. 301 Permanent Redirect for legacy .html paths -> clean URLs (No .html!)
  if (legacyHtmlRedirects[urlPath]) {
    const targetUrl = legacyHtmlRedirects[urlPath] + (rawQuery ? '?' + rawQuery : '');
    res.writeHead(301, { 'Location': targetUrl });
    return res.end();
  }

  // Catch nested .html requests
  if (urlPath.includes('/') && urlPath.lastIndexOf('/') > 0 && urlPath.endsWith('.html')) {
    const baseName = path.basename(urlPath);
    const cleanTarget = legacyHtmlRedirects['/' + baseName] || ('/' + baseName.replace(/\.html$/, ''));
    res.writeHead(301, { 'Location': cleanTarget + (rawQuery ? '?' + rawQuery : '') });
    return res.end();
  }

  // 4. Exact Route Table Match
  const targetFile = routeTable[urlPath] || (urlPath.endsWith('/') && urlPath.length > 1 ? routeTable[urlPath.slice(0, -1)] : null);
  if (targetFile) {
    const buf = getFileContent(targetFile);
    if (buf) {
      const ext = path.extname(targetFile).toLowerCase();
      res.writeHead(200, {
        'Content-Type': mimeTypes[ext] || 'text/html; charset=utf-8',
        'Content-Length': buf.length,
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400'
      });
      return res.end(buf);
    }
  }

  // 5. Direct Static File Resolution
  const cleanRel = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath;
  const staticBuf = getFileContent(cleanRel) || getFileContent(cleanRel + '.html') || getFileContent(path.join(cleanRel, 'index.html'));

  if (staticBuf) {
    const ext = path.extname(cleanRel).toLowerCase() || '.html';
    res.writeHead(200, {
      'Content-Type': mimeTypes[ext] || 'application/octet-stream',
      'Content-Length': staticBuf.length,
      'Cache-Control': 'public, max-age=86400, s-maxage=604800'
    });
    return res.end(staticBuf);
  }

  // 6. Not Found Fallback
  const notFoundHtml = '<!DOCTYPE html><html><head><title>404 Not Found</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;"><h1>404 Not Found</h1><p>The requested page was not found.</p><a href="/" style="display:inline-block;margin-top:20px;padding:10px 20px;background:#FFD700;color:#000;text-decoration:none;font-weight:bold;border-radius:6px;">Return to Home</a></body></html>';
  const notFoundBuf = Buffer.from(notFoundHtml, 'utf8');
  res.writeHead(404, {
    'Content-Type': 'text/html; charset=utf-8',
    'Content-Length': notFoundBuf.length
  });
  res.end(notFoundBuf);
}

const server = http.createServer(handler);

module.exports = handler;

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Lightning fast server running at http://localhost:${PORT}/`);
  });
}
