const fs = require('fs');

let content = fs.readFileSync('src/data/menu.ts', 'utf8');

// Replace category ID in type
content = content.replace(/"dinners"/g, '"classic-dinners"');
content = content.replace(/"drinks"/g, '"beverages"');

// Replace category properties in items
content = content.replace(/category:\s*["']dinners["']/g, 'category: "classic-dinners"');
content = content.replace(/category:\s*["']drinks["']/g, 'category: "beverages"');

fs.writeFileSync('src/data/menu.ts', content, 'utf8');
console.log('Successfully aligned category IDs in menu.ts to match centralMenuData.ts');
