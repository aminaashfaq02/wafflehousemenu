import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../src/data');
const jsonFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

jsonFiles.forEach(file => {
  const content = fs.readFileSync(path.join(dataDir, file), 'utf8');
  try {
    const json = JSON.parse(content);
    if (json.items && Array.isArray(json.items)) {
      console.log(`${file}: ${json.items.length} items`);
    } else {
      console.log(`${file}: no items array`);
    }
  } catch (e) {
    console.log(`${file}: parse error`);
  }
});
