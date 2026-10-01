const fs = require('fs');
const path = require('path');

// 1. Killer Meta Descriptions Map (140 - 160 characters, high CTR, strict fact policy compliant)
const metaDescriptions = {
  'index.html': 'Explore the full 2026 Waffle House menu with current prices, calorie counts, hashbrown toppings, All-Star Specials, and diner secrets across 25 states.',
  'menu.html': 'Browse the complete 2026 Waffle House menu with up-to-date pricing, calorie counts, waffle flavors, breakfast bowls, and Texas melts across all categories.',
  'locations.html': 'Find open Waffle House locations near you across 25 US states. Browse 24/7 diner hours, local phone numbers, driving directions, and FEMA disaster status.',
  'nutrition.html': 'Complete Waffle House nutrition facts: calories, protein, carbs, and fat across every menu category. Plus custom hashbrown bowl calculators and low-carb picks.',
  'prices-by-state.html': 'Compare 2026 Waffle House menu prices across 25 US states. See price variations for All-Star Specials, waffles, hashbrowns, and regional diner costs.',
  'waffle-house-catering/index.html': 'Everything you need to know about Waffle House catering: private food trucks, party platters, wedding late-night snacks, pricing factors, and booking tips.',
  'waffle-house-calories-allergies/index.html': 'Comprehensive Waffle House calories and allergen guide. Check gluten, egg, dairy, and nut alerts, calculate meal macros, and customize diet-friendly plates.',
  'waffle-house-dietary-guide/index.html': 'Diet-friendly Waffle House ordering guide: low-carb keto plates, diabetic-conscious breakfast options, high-protein picks, and sodium awareness tips.',
  'nutrition-guide-2026.html': 'Download or browse the 2026 Waffle House nutrition guide: detailed calorie counts, macronutrient breakdowns, sodium totals, and official allergen charts.',
  'coupons.html': 'Real Waffle House deals and money-saving hacks: Regulars Club freebies, birthday coupons, senior and military discounts, and diner meal savings.',
  'about.html': 'Learn about WaffleHouse-Menu.com: an independent, community-driven guide delivering accurate menu pricing, nutritional insights, and 24/7 diner tips.',
  'contact.html': 'Have a menu update, local price correction, or diner tip? Contact the WaffleHouse-Menu.com editorial desk to submit receipts and share feedback.',
  'blog/index.html': 'Insider Waffle House guides, ordering secrets, holiday hours, hashbrown hacks, and money-saving tips written by passionate diner regulars.',
  'blog/waffle-house-all-star-special/index.html': 'The ultimate guide to the Waffle House All-Star Special: see everything included, waffle choices, egg styles, hashbrown toppings, calories, and pricing.',
  'blog/waffle-house-thanksgiving-hours/index.html': 'Is Waffle House open on Thanksgiving Day? Discover 2026 holiday diner hours, 24/7 kitchen operations, peak morning rush times, and takeout tips.',
  'disclaimer.html': 'Legal disclaimers for WaffleHouse-Menu.com: unofficial independent status, price variation policies, food allergy advisories, and trademark notices.',
  'privacy-policy.html': 'Privacy policy for WaffleHouse-Menu.com: how we handle visitor information, browser caching, local storage, and your CCPA and GDPR data rights.',
  'terms-and-conditions.html': 'Terms and conditions for WaffleHouse-Menu.com: acceptable site use, intellectual property disclosures, nutrition disclaimers, and user guidelines.',
  'cookies-policy.html': 'Cookie policy for WaffleHouse-Menu.com: learn how essential cookies and browser storage power interactive meal calculators and site preferences.',
  '404.html': 'Page not found on Waffle House Menu Guide. Explore our complete 2026 diner menu, current prices, nutrition calculator, and restaurant locator instead.'
};

// 2. Update site.webmanifest
const manifestPath = path.join(__dirname, '..', 'site.webmanifest');
const manifestContent = JSON.stringify({
  name: "Waffle House Menu Guide 2026",
  short_name: "WH Menu Guide",
  icons: [
    {
      src: "/assets/waffle-icon-48.png?v=2",
      sizes: "48x48",
      type: "image/png"
    },
    {
      src: "/assets/waffle-icon-192.png?v=2",
      sizes: "192x192",
      type: "image/png"
    },
    {
      src: "/assets/waffle-icon-512.png?v=2",
      sizes: "512x512",
      type: "image/png"
    },
    {
      src: "/assets/logo-icon.png?v=2",
      sizes: "256x256",
      type: "image/png"
    }
  ],
  theme_color: "#FFC72C",
  background_color: "#0B0B0E",
  display: "standalone"
}, null, 2);
fs.writeFileSync(manifestPath, manifestContent, 'utf8');
console.log('Updated site.webmanifest');

// 3. Update assets/logo-icon.svg and assets/favicon.svg to reference the new mascot logo
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width="512" height="512">
  <title>Waffle House Menu Guide Logo</title>
  <clipPath id="circleClip">
    <circle cx="256" cy="256" r="248"/>
  </clipPath>
  <g clip-path="url(#circleClip)">
    <image href="/assets/logo-icon.png" width="512" height="512" preserveAspectRatio="xMidYMid slice"/>
  </g>
</svg>`;
fs.writeFileSync(path.join(__dirname, '..', 'assets', 'logo-icon.svg'), svgContent, 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'assets', 'favicon.svg'), svgContent, 'utf8');
console.log('Updated assets/logo-icon.svg and assets/favicon.svg');

// 4. Process all HTML files
const baseDir = path.join(__dirname, '..');

Object.keys(metaDescriptions).forEach(relFile => {
  const filePath = path.join(baseDir, relFile);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }

  let html = fs.readFileSync(filePath, 'utf8');
  const newDesc = metaDescriptions[relFile];

  // A. Replace meta name="description"
  html = html.replace(
    /<meta\s+name=["']description["']\s+content=["'][^"']*["']/i,
    `<meta name="description" content="${newDesc}"`
  );

  // B. Replace og:description
  html = html.replace(
    /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']/i,
    `<meta property="og:description" content="${newDesc}"`
  );

  // C. Replace twitter:description
  html = html.replace(
    /<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']/i,
    `<meta name="twitter:description" content="${newDesc}"`
  );

  // D. Update Favicon block with ?v=2
  const standardFaviconBlock = `  <!-- Favicon & Brand Icons -->
  <link rel="icon" type="image/png" sizes="48x48" href="/assets/waffle-icon-48.png?v=2">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/waffle-icon-32.png?v=2">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/waffle-icon-16.png?v=2">
  <link rel="icon" type="image/png" sizes="192x192" href="/assets/waffle-icon-192.png?v=2">
  <link rel="icon" type="image/svg+xml" href="/assets/logo-icon.svg?v=2">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png?v=2">
  <link rel="shortcut icon" href="/favicon.ico?v=2">
  <link rel="manifest" href="/site.webmanifest">`;

  // Match existing favicon block
  const faviconRegex = /<!-- Favicon.*?-->[\s\S]*?<link rel="manifest"[^>]*>/i;
  if (faviconRegex.test(html)) {
    html = html.replace(faviconRegex, standardFaviconBlock);
  }

  // E. Replace header and footer logo-icon.svg references with logo-icon.png and proper alt
  html = html.replace(
    /src="\/assets\/logo-icon\.svg"/g,
    'src="/assets/logo-icon.png"'
  );

  // Replace alt="" on the logo image with descriptive alt text
  html = html.replace(
    /(<img\s+src="\/assets\/logo-icon\.png"[^>]*?)alt=""/g,
    '$1alt="Waffle House Menu Guide Logo"'
  );

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Updated ${relFile}`);
});

console.log('All files successfully updated!');
