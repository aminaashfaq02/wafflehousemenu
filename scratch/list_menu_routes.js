import { promises as fs } from 'fs';
import { join } from 'path';

async function listFiles() {
  const dir = './src/routes';
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile() && entry.name.startsWith('menu.') && entry.name.endsWith('.index.tsx')) {
      const fullPath = join(dir, entry.name);
      const content = await fs.readFile(fullPath, 'utf8');
      if (content.includes('.items')) {
        console.log(`File: ${entry.name}`);
        // Find where Route is defined
        const lines = content.split('\n');
        let rawItemsLine = -1;
        let routeLine = -1;
        lines.forEach((line, index) => {
          if (line.includes('const rawItems') || line.includes('const items')) {
            if (rawItemsLine === -1) rawItemsLine = index + 1;
          }
          if (line.includes('createFileRoute')) {
            routeLine = index + 1;
          }
        });
        console.log(`  rawItems/items line: ${rawItemsLine}, Route line: ${routeLine}`);
      }
    }
  }
}

listFiles().catch(console.error);
