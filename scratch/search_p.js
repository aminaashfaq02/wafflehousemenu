import { promises as fs } from 'fs';
import { join } from 'path';

async function search() {
  const filePath = join(process.cwd(), '.vercel', 'output', 'functions', '__server.func', '_ssr', 'router-D-sWBsNQ.mjs');
  const content = await fs.readFile(filePath, 'utf-8');
  
  const lines = content.split('\n');
  console.log('Searching for export containing P:');
  lines.forEach((line, index) => {
    if (line.includes('export {') && line.includes(' P ')) {
      console.log(`  L${index + 1}: ${line.trim()}`);
    }
  });
}

search().catch(console.error);
