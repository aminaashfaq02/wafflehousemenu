import { promises as fs } from 'fs';
import { join } from 'path';

async function searchPdf(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await searchPdf(full);
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      const content = await fs.readFile(full, 'utf8');
      if (content.toLowerCase().includes('pdf')) {
        console.log(`Found PDF reference in: ${full}`);
      }
    }
  }
}

searchPdf('./src/routes').catch(console.error);
