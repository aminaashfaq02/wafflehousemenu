import { promises as fs } from 'fs';
import { join } from 'path';

async function countData() {
  const jsonFiles = [
    'all-star-special.json',
    'waffles.json',
    'breakfast.json', // egg breakfasts
    'omelets.json',
    'hashbrown-bowls.json',
    'breakfast-sandwiches.json',
    'biscuits.json',
    'burgers.json',
    'sandwiches.json',
    'classic-dinners.json',
    'hashbrowns.json',
    'sides.json',
    'beverages.json'
  ];

  let totalItems = 0;
  console.log('Counting items across 13 category JSON files:');
  for (const f of jsonFiles) {
    try {
      const content = await fs.readFile(join('./src/data', f), 'utf8');
      const data = JSON.parse(content);
      const count = data.items ? data.items.length : 0;
      totalItems += count;
      console.log(`- ${f}: ${count} items`);
    } catch (e) {
      console.log(`- ${f}: ERROR reading (${e.message})`);
    }
  }

  console.log(`\nTotal Categories: ${jsonFiles.length}`);
  console.log(`Total Menu Items: ${totalItems}`);
}

countData();
