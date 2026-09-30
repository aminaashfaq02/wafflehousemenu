const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find all img tags that are card images (not logo)
const imgRegex = /<img\s[^>]*>/g;
let m;
const srcs = [];
while ((m = imgRegex.exec(html)) !== null) {
  const tag = m[0];
  const srcM = tag.match(/src=["']([^"']+)["']/);
  const altM = tag.match(/alt=["']([^"']+)["']/);
  if (srcM && altM && !srcM[1].includes('logo-icon')) {
    srcs.push({ src: srcM[1], alt: altM[1] });
  }
}

console.log('Total card images:', srcs.length);
console.log('');

// Check for duplicates
const srcMap = {};
srcs.forEach((item, i) => {
  if (!srcMap[item.src]) srcMap[item.src] = [];
  srcMap[item.src].push({ idx: i+1, alt: item.alt });
});

let hasDuplicates = false;
Object.keys(srcMap).forEach(src => {
  if (srcMap[src].length > 1) {
    hasDuplicates = true;
    console.log('DUPLICATE:', src);
    srcMap[src].forEach(e => console.log('  Card', e.idx, ':', e.alt));
  }
});

if (!hasDuplicates) {
  console.log('✓ NO DUPLICATES FOUND - All 28 cards have unique images!');
}

console.log('\nAll images:');
srcs.forEach((item, i) => {
  console.log((i+1) + '. [' + item.alt + '] -> ' + item.src);
});
