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
      
      // Let's use a regex to match import statements across newlines
      const importRegex = /import[\s\S]*?from\s*['"](\.\.?\/[^'"]+)['"]/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        console.log(`Cross import in ${fullPath}:`);
        console.log(`  Source: ${match[0].trim().replace(/\n/g, ' ')}`);
        console.log(`  Path: ${match[1]}`);
      }
    }
  }
}

searchDir('./src/routes').catch(console.error);
