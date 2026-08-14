import { promises as fs } from 'fs';
import { join } from 'path';

async function test() {
  const filePath = join(process.cwd(), '.vercel', 'output', 'functions', '__server.func', '_ssr', 'router-C5EAEkv8.mjs');
  const content = await fs.readFile(filePath, 'utf-8');
  const lines = content.split('\n');
  console.log('Lines 3750 to 3760:');
  for (let i = 3749; i < 3760; i++) {
    console.log(`L${i+1}: ${lines[i]}`);
  }
}

test().catch(console.error);
