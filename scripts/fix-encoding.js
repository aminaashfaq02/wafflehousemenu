const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Fix the &amp; encoding in the Unsplash URL for card 4 (Sausage Egg & Cheese Bowl featured)
const badURL = 'https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?auto=format&amp;fit=crop&amp;w=600&amp;q=80';
const goodURL = 'https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?auto=format&fit=crop&w=600&q=80';

if (html.includes(badURL)) {
  html = html.replace(badURL, goodURL);
  fs.writeFileSync('index.html', html);
  console.log('Fixed &amp; encoding in Card 4 URL - OK');
} else if (html.includes(goodURL)) {
  console.log('Card 4 URL already correct - no fix needed');
} else {
  console.log('Card 4 URL not found in either form!');
}
