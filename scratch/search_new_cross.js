import { promises as fs } from 'fs';
import { join } from 'path';

async function search() {
  const dir = join(process.cwd(), '.vercel', 'output', 'functions', '__server.func', '_ssr');
  const file1 = join(dir, 'router-C5EAEkv8.mjs');
  const file2 = join(dir, 'router-C5EAEkv82.mjs');

  const content1 = await fs.readFile(file1, 'utf-8');
  const content2 = await fs.readFile(file2, 'utf-8');

  console.log('Imports in file1 (router-C5EAEkv8.mjs) from file2 (router-C5EAEkv82.mjs):');
  content1.split('\n').forEach((line) => {
    if (line.includes('router-C5EAEkv82.mjs') && line.includes('import')) {
      console.log(' ', line.trim());
    }
  });

  console.log('Imports in file2 (router-C5EAEkv82.mjs) from file1 (router-C5EAEkv8.mjs):');
  content2.split('\n').forEach((line) => {
    if (line.includes('router-C5EAEkv8.mjs') && line.includes('import')) {
      console.log(' ', line.trim());
    }
  });
}

search().catch(console.error);
