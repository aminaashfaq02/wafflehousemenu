import { promises as fs } from 'fs';
import { join } from 'path';

const files = [
  'menu.biscuits.index.tsx',
  'menu.breakfast-sandwiches.index.tsx',
  'menu.breakfast.index.tsx',
  'menu.burgers.index.tsx',
  'menu.classic-dinners.index.tsx',
  'menu.egg-breakfasts.index.tsx',
  'menu.hashbrown-bowls.index.tsx',
  'menu.hashbrowns.index.tsx',
  'menu.omelets.index.tsx',
  'menu.sandwiches.index.tsx',
  'menu.texas-melts.index.tsx',
  'menu.waffles.index.tsx'
];

async function refactorAll() {
  const dir = './src/routes';
  
  for (const file of files) {
    const filePath = join(dir, file);
    console.log(`Refactoring ${file}...`);
    let content = await fs.readFile(filePath, 'utf8');

    // Find the const rawItems line
    const rawItemsStart = content.indexOf('const rawItems');
    if (rawItemsStart === -1) {
      console.log(`  rawItems not found in ${file}`);
      continue;
    }

    // Find the export const Route line
    const routeStart = content.indexOf('export const Route');
    if (routeStart === -1) {
      console.log(`  Route not found in ${file}`);
      continue;
    }

    // Extract the block of code between rawItems and Route
    let block = content.slice(rawItemsStart, routeStart);

    // Let's split the block into data mapping and static configuration
    // The static config starts with const SITE or const xxxFaqs
    const splitMatch = block.match(/(const\s+SITE\s*=)|(const\s+\w+Faqs\s*=)/);
    let dataBlock = block;
    let staticBlock = '';
    
    if (splitMatch && splitMatch.index !== undefined) {
      dataBlock = block.slice(0, splitMatch.index);
      staticBlock = block.slice(splitMatch.index);
    }

    // Identify what variables are defined in the data block
    const constRegex = /^const\s+(\w+)\s*(?::[\s\S]*?)?=/gm;
    let match;
    const vars = [];
    while ((match = constRegex.exec(dataBlock)) !== null) {
      vars.push(match[1]);
    }
    console.log(`  Found variables to lazy initialize: ${vars.join(', ')}`);

    // Generate module level let declarations
    let declarations = '';
    vars.forEach(name => {
      if (name === 'rawItems') {
        declarations += `let rawItems: any[];\n`;
      } else {
        declarations += `let ${name}: MasterItem[];\n`;
      }
    });

    // Convert const declarations inside initData to assignments
    let initDataBody = dataBlock;
    vars.forEach(name => {
      const replaceRegex = new RegExp(`^const\\s+${name}\\s*(?::[\\s\\S]*?)?=`, 'm');
      initDataBody = initDataBody.replace(replaceRegex, `${name} =`);
    });

    // Write the lazy functions block
    let lazyBlock = `
${declarations}
function initData() {
  if (items) return;
  ${initDataBody.trim().replace(/\n/g, '\n  ')}
}
`;

    // Reconstruct the file content: pre-rawItems + lazyBlock + staticBlock + Route...
    let newContent = content.slice(0, rawItemsStart) + lazyBlock + staticBlock + content.slice(routeStart);

    // Now update Route's head and component
    // Inject initData() call
    newContent = newContent.replace('head: () => {', 'head: () => {\n    initData();');

    // Inject at component (handling both component: () => ( and component: () => {)
    if (newContent.includes('component: () => (')) {
      newContent = newContent.replace('component: () => (', 'component: () => {\n    initData();\n    return (');
      newContent = newContent.replace(/\n\s*\),\s*\n\}\);\s*$/, '\n    );\n  },\n});');
    } else if (newContent.includes('component: () => {')) {
      newContent = newContent.replace('component: () => {', 'component: () => {\n    initData();');
    }

    await fs.writeFile(filePath, newContent, 'utf8');
    console.log(`  Successfully refactored ${file}`);
  }
}

refactorAll().catch(console.error);
