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

    // Let's identify what variables are defined in this block
    // We want to find: const items: ... =
    // and const elevenOfficial... / tenOfficial... =
    const constRegex = /^const\s+(\w+)\s*(?::[\s\S]*?)?=/gm;
    let match;
    const vars = [];
    while ((match = constRegex.exec(block)) !== null) {
      vars.push(match[1]);
    }
    console.log(`  Found variables: ${vars.join(', ')}`);

    // Let's identify the official list variable if it exists
    const officialVar = vars.find(v => v.toLowerCase().includes('official'));
    
    // We will generate the lazy functions
    let replacement = '';
    
    // 1. Declare memoized variables at the module scope
    replacement += `let memoizedItems: MasterItem[];\n`;
    if (officialVar) {
      replacement += `let memoizedOfficial: MasterItem[];\n`;
    }

    // 2. Write getItems() function
    // We will extract the definition of items from the block
    // The definition starts with `const items` and ends before the officialVar (or the end of the block)
    let itemsDef = '';
    let itemsStartIndex = block.indexOf('const items');
    let itemsEndIndex = block.length;
    if (officialVar) {
      itemsEndIndex = block.indexOf(`const ${officialVar}`);
    }
    itemsDef = block.slice(itemsStartIndex, itemsEndIndex).trim();
    // Convert const items : ... = to items =
    itemsDef = itemsDef.replace(/^const\s+items\s*(?::[\s\S]*?)?=/, 'items =');

    // Get rawItems definition
    let rawItemsDef = block.slice(0, itemsStartIndex).trim();
    rawItemsDef = rawItemsDef.replace(/^const\s+rawItems\s*(?::[\s\S]*?)?=/, 'const rawItems =');

    replacement += `
function getItems() {
  if (!memoizedItems) {
    ${rawItemsDef}
    ${itemsDef.replace(/\n/g, '\n    ')}
    memoizedItems = items;
  }
  return memoizedItems;
}
`;

    // 3. Write getOfficial() function if officialVar exists
    if (officialVar) {
      let officialDef = block.slice(itemsEndIndex).trim();
      officialDef = officialDef.replace(new RegExp(`^const\\s+${officialVar}\\s*(?::[\\s\\S]*?)?=`), `${officialVar} =`);
      replacement += `
function getOfficial() {
  if (!memoizedOfficial) {
    const items = getItems();
    let ${officialVar}: MasterItem[];
    ${officialDef.replace(/\n/g, '\n    ')}
    memoizedOfficial = ${officialVar};
  }
  return memoizedOfficial;
}
`;
    }

    // Replace the block with our lazy functions
    let newContent = content.slice(0, rawItemsStart) + replacement + content.slice(routeStart);

    // Now update Route's head and component
    // We will inject the local const definitions:
    // const items = getItems();
    // const officialVar = getOfficial();
    let injects = `const items = getItems();\n`;
    if (officialVar) {
      injects += `    const ${officialVar} = getOfficial();\n`;
    }

    // Inject at head:
    newContent = newContent.replace('head: () => {', `head: () => {\n    ${injects.trim()}`);

    // Inject at component (handling both `component: () => (` and `component: () => {`)
    if (newContent.includes('component: () => (')) {
      newContent = newContent.replace('component: () => (', `component: () => {\n    ${injects.trim()}\n    return (`);
      newContent = newContent.replace(/\n\s*\),\s*\n\}\);\s*$/, '\n    );\n  },\n});');
    } else if (newContent.includes('component: () => {')) {
      newContent = newContent.replace('component: () => {', `component: () => {\n    ${injects.trim()}`);
    }

    await fs.writeFile(filePath, newContent, 'utf8');
    console.log(`  Successfully refactored ${file}`);
  }
}

refactorAll().catch(console.error);
