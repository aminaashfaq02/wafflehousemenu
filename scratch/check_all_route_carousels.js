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
  
  const popularLines = content.split('\n').filter(l => l.includes('popular=') || l.includes('popular:') || l.includes('items:'));
  console.log(popularLines.slice(0, 6).join('\n'));
});
