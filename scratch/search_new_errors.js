import { promises as fs } from 'fs';
import { join } from 'path';

async function search() {
  const filePath = join(process.cwd(), '.vercel', 'output', 'functions', '__server.func', '_ssr', 'router-C5EAEkv8.mjs');
  const content = await fs.readFile(filePath, 'utf-8');
  
  const lines = content.split('\n');
  console.log('Searching for top-level property access on imported variables in router-C5EAEkv8.mjs:');
  lines.forEach((line, index) => {
    if (line.includes('_default.items') && !line.includes('function') && !line.includes('=>') && line.includes('var ')) {
      console.log(`  L${index + 1}: ${line.trim()}`);
    }
    if (line.includes('_default$') && line.includes('.items') && !line.includes('function') && !line.includes('=>') && line.includes('var ')) {
      console.log(`  L${index + 1}: ${line.trim()}`);
    }
  });
}

search().catch(console.error);
