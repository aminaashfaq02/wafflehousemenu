import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesDir = path.join(__dirname, '../src/routes');
const files = fs.readdirSync(routesDir).filter(f => f.startsWith('menu.') && f.endsWith('.index.tsx') && f !== 'menu.index.tsx' && !f.includes('$'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(routesDir, file), 'utf8');
  console.log('=== ' + file + ' ===');
  
  // Find CategoryMasterView call
  const masterViewIdx = content.indexOf('CategoryMasterView');
  if (masterViewIdx !== -1) {
    const snippet = content.substring(masterViewIdx, masterViewIdx + 1200);
    console.log(snippet);
  } else {
    console.log('No CategoryMasterView');
  }
});
