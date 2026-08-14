import { promises as fs } from 'fs';
import { join } from 'path';

async function searchDir(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await searchDir(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      const content = await fs.readFile(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.includes('import') && (line.includes('menu.') || line.includes('index') || line.includes('page'))) {
          if (line.includes('./') || line.includes('../')) {
            console.log(`Cross import in ${fullPath} at L${index + 1}: ${line.trim()}`);
          }
        }
      });
    }
  }
}

searchDir('./src/routes').catch(console.error);
