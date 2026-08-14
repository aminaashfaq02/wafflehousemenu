import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesDir = path.join(__dirname, '../src/routes');
const files = fs.readdirSync(routesDir).filter(f => f.startsWith('menu.') && f.endsWith('.index.tsx'));

console.log('Category index route files count:', files.length);

files.forEach(file => {
  const content = fs.readFileSync(path.join(routesDir, file), 'utf8');
  console.log('--- File:', file);
  
  // Look for items array or tenOfficial array
  const popularMatch = content.match(/popular:\s*\{[\s\S]*?items:\s*(\w+)/);
  const lighterMatch = content.match(/lighter:\s*\{[\s\S]*?items:\s*(\w+)/);
  const allMatch = content.match(/allRecipes:\s*\{[\s\S]*?items:\s*(\w+)/);
  
  console.log('  popular.items variable:', popularMatch ? popularMatch[1] : 'unknown');
  console.log('  lighter.items variable:', lighterMatch ? lighterMatch[1] : 'unknown');
  console.log('  allRecipes.items variable:', allMatch ? allMatch[1] : 'unknown');
});
