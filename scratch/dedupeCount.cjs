const fs = require('fs');
const files = fs.readdirSync('src/data').filter(f => f.endsWith('.json'));
const uniqueSlugs = new Set();
const uniqueNames = new Set();
let total = 0;

files.forEach(f => {
  const data = JSON.parse(fs.readFileSync('src/data/' + f, 'utf8'));
  if (data.items) {
    data.items.forEach(i => {
      uniqueSlugs.add(i.slug);
      uniqueNames.add(i.name);
      total++;
    });
  }
});

console.log('Total JSON items (raw count):', total);
console.log('Unique slugs count:', uniqueSlugs.size);
console.log('Unique names count:', uniqueNames.size);
console.log('Unique slugs list:', Array.from(uniqueSlugs));
