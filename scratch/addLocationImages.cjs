const fs = require('fs');

let content = fs.readFileSync('src/data/locations.ts', 'utf8');

const mappings = [
  { name: 'Waffle House Downtown Atlanta', img: 'locImg1' },
  { name: 'Waffle House Midtown Atlanta', img: 'locImg2' },
  { name: 'Waffle House Savannah Historic District', img: 'locImg3' },
  { name: 'Waffle House Charlotte Uptown', img: 'locImg4' },
  { name: 'Waffle House Jacksonville Downtown', img: 'locImg5' },
  { name: 'Waffle House Birmingham Southside', img: 'locImg6' },
  { name: 'Waffle House Columbia Five Points', img: 'locImg7' },
  { name: 'Waffle House Houston Central', img: 'locImg8' }
];

mappings.forEach(m => {
  const regex = new RegExp(`name:\\s*["']${m.name}["'],`, 'g');
  content = content.replace(regex, `name: "${m.name}",\n            image: ${m.img},`);
});

fs.writeFileSync('src/data/locations.ts', content, 'utf8');
console.log('Successfully added image mappings to locations.ts');
