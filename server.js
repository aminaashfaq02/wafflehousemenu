const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

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

const server = http.createServer((req, res) => {
  let safeUrl = decodeURIComponent(req.url.split('?')[0]);
  
  // Normalize trailing slash if not root
  if (safeUrl.length > 1 && safeUrl.endsWith('/')) {
    safeUrl = safeUrl.slice(0, -1);
  }

  // If request is for nested index.html (e.g. /waffle-house-dietary-guide/index.html), redirect to root /
  if (safeUrl !== '/index.html' && (safeUrl.endsWith('/index.html') || safeUrl.endsWith('/index'))) {
    res.writeHead(302, { 'Location': '/' });
    res.end();
    return;
  }

  // If request is nested HTML page that exists in root (e.g. /waffle-house-dietary-guide/menu.html), redirect to root page
  if (safeUrl.includes('/') && safeUrl.lastIndexOf('/') > 0) {
    const base = path.basename(safeUrl);
    const rootTarget = path.join(__dirname, base);
    if (fs.existsSync(rootTarget) && fs.statSync(rootTarget).isFile() && base.endsWith('.html')) {
      res.writeHead(302, { 'Location': '/' + base });
      res.end();
      return;
    }
  }

  // Home page root
  if (safeUrl === '/' || safeUrl === '' || safeUrl === '/index' || safeUrl === '/index.html' || safeUrl === '/home') {
    safeUrl = '/index.html';
  } else if (safeUrl === '/robots.txt') {
    safeUrl = '/robots.txt';
  } else if (safeUrl === '/sitemap.xml' || safeUrl === '/sitemap') {
    safeUrl = '/sitemap.xml';
  } else if (safeUrl === '/prices-by-state' || safeUrl === '/menu/prices-by-state' || safeUrl.endsWith('/prices-by-state.html')) {
    safeUrl = '/prices-by-state.html';
  } else if (safeUrl === '/privacy-policy' || safeUrl === '/privacy' || safeUrl.endsWith('/privacy-policy.html')) {
    safeUrl = '/privacy-policy.html';
  } else if (safeUrl === '/terms-and-conditions' || safeUrl === '/terms-conditions' || safeUrl === '/terms' || safeUrl.endsWith('/terms-and-conditions.html')) {
    safeUrl = '/terms-and-conditions.html';
  } else if (safeUrl === '/cookies-policy' || safeUrl === '/cookies' || safeUrl.endsWith('/cookies-policy.html')) {
    safeUrl = '/cookies-policy.html';
  } else if (safeUrl === '/disclaimer' || safeUrl.endsWith('/disclaimer.html')) {
    safeUrl = '/disclaimer.html';
  } else if (safeUrl === '/catering' || safeUrl === '/waffle-house-catering' || safeUrl === '/catering/guide' || safeUrl.endsWith('/catering.html') || safeUrl.endsWith('/waffle-house-catering.html')) {
    safeUrl = '/catering.html';
  } else if (safeUrl === '/waffle-house-birthday-party' || safeUrl === '/birthday-party-catering' || safeUrl.endsWith('/waffle-house-birthday-party.html')) {
    safeUrl = '/waffle-house-birthday-party.html';
  } else if (safeUrl === '/waffle-house-wedding-catering' || safeUrl === '/wedding-catering' || safeUrl.endsWith('/waffle-house-wedding-catering.html')) {
    safeUrl = '/waffle-house-wedding-catering.html';
  } else if (safeUrl === '/waffle-house-corporate-catering' || safeUrl === '/corporate-catering' || safeUrl.endsWith('/waffle-house-corporate-catering.html')) {
    safeUrl = '/waffle-house-corporate-catering.html';
  } else if (safeUrl === '/waffle-house-school-event-catering' || safeUrl === '/school-event-catering' || safeUrl === '/school-catering' || safeUrl.endsWith('/waffle-house-school-event-catering.html')) {
    safeUrl = '/waffle-house-school-event-catering.html';
  } else if (safeUrl === '/waffle-house-food-truck' || safeUrl === '/food-truck' || safeUrl === '/food-truck-catering' || safeUrl.endsWith('/waffle-house-food-truck.html')) {
    safeUrl = '/waffle-house-food-truck.html';
  } else if (safeUrl === '/waffle-house-calories-allergies' || safeUrl === '/calories-allergies' || safeUrl.endsWith('/waffle-house-calories-allergies.html')) {
    safeUrl = '/waffle-house-calories-allergies.html';
  } else if (safeUrl === '/waffle-house-dietary-guide' || safeUrl === '/dietary-guide' || safeUrl.endsWith('/waffle-house-dietary-guide.html')) {
    safeUrl = '/waffle-house-dietary-guide.html';
  } else if (safeUrl === '/nutrition' || safeUrl === '/waffle-house-nutrition' || safeUrl.endsWith('/nutrition.html')) {
    safeUrl = '/nutrition.html';
  } else if (safeUrl === '/menu' || safeUrl === '/waffle-house-menu' || safeUrl.endsWith('/menu.html')) {
    safeUrl = '/menu.html';
  } else if (safeUrl === '/blog' || safeUrl === '/waffle-house-blog' || safeUrl.endsWith('/blog.html')) {
    safeUrl = '/blog.html';
  } else if (safeUrl === '/locations' || safeUrl === '/hours' || safeUrl === '/store-hours' || safeUrl.endsWith('/locations.html')) {
    safeUrl = '/locations.html';
  } else if (safeUrl === '/coupons' || safeUrl === '/deals' || safeUrl === '/waffle-house-deals' || safeUrl === '/regulars-club' || safeUrl.endsWith('/coupons.html')) {
    safeUrl = '/coupons.html';
  } else if (safeUrl === '/about' || safeUrl.endsWith('/about.html')) {
    safeUrl = '/about.html';
  } else if (safeUrl === '/contact' || safeUrl.endsWith('/contact.html')) {
    safeUrl = '/contact.html';
  }

  let filePath = path.join(__dirname, safeUrl);

  // Check if direct file exists
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    // Try appending .html
    const htmlPath = filePath + '.html';
    if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
      filePath = htmlPath;
    } else {
      // Fallback: check if basename exists in root directory
      const baseName = path.basename(safeUrl);
      const rootFile = path.join(__dirname, baseName);
      const rootHtml = path.join(__dirname, baseName + '.html');

      if (fs.existsSync(rootFile) && fs.statSync(rootFile).isFile()) {
        filePath = rootFile;
      } else if (fs.existsSync(rootHtml) && fs.statSync(rootHtml).isFile()) {
        filePath = rootHtml;
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 Not Found</h1><p>The requested URL was not found on this server.</p>');
        return;
      }
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  res.writeHead(200, { 
    'Content-Type': contentType,
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
