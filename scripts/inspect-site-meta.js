const fs = require('fs');

const files = [
  '404.html', 'about.html', 'contact.html', 'cookies-policy.html', 'coupons.html',
  'disclaimer.html', 'index.html', 'locations.html', 'menu.html', 'nutrition-guide-2026.html',
  'nutrition.html', 'prices-by-state.html', 'privacy-policy.html', 'terms-and-conditions.html',
  'blog/index.html', 'blog/waffle-house-all-star-special/index.html', 'blog/waffle-house-thanksgiving-hours/index.html',
  'waffle-house-calories-allergies/index.html', 'waffle-house-catering/index.html', 'waffle-house-dietary-guide/index.html'
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f, 'utf8');
    const hasLogoIcon = content.includes('logo-icon.svg');
    const hasFavicon = content.includes('favicon.ico');
    const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    console.log(`[${f}]`);
    console.log(`  Title: ${titleMatch ? titleMatch[1] : 'N/A'}`);
    console.log(`  Desc:  ${descMatch ? descMatch[1] : 'N/A'}`);
    console.log(`  LogoIcon: ${hasLogoIcon}, Favicon: ${hasFavicon}`);
  }
});
