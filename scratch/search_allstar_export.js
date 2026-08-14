import { promises as fs } from 'fs';
import { join } from 'path';

async function searchDir(dir, pattern) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== '.output' && entry.name !== '.vercel') {
        await searchDir(fullPath, pattern);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      const content = await fs.readFile(fullPath, 'utf8');
      if (content.includes(pattern) && !fullPath.includes('menu.all-star-special.index.tsx')) {
        console.log(`Found pattern in ${fullPath}`);
        const lines = content.split('\n');
        lines.forEach((line, index) => {
          if (line.includes(pattern)) {
            console.log(`  L${index + 1}: ${line.trim()}`);
          }
        });
      }
    }
  }
}

searchDir('./src', 'allStarMasterItems').catch(console.error);
