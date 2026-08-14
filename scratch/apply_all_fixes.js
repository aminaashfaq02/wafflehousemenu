import { promises as fs } from 'fs';
import { join } from 'path';

const lazyFiles = [
  'menu.biscuits.index.tsx',
  'menu.breakfast.index.tsx',
  'menu.burgers.index.tsx',
  'menu.classic-dinners.index.tsx',
  'menu.egg-breakfasts.index.tsx',
  'menu.hashbrown-bowls.index.tsx',
  'menu.omelets.index.tsx',
  'menu.sandwiches.index.tsx',
  'menu.texas-melts.index.tsx',
  'menu.waffles.index.tsx'
];

async function applyFixes() {
  const dir = './src/routes';

  // 1. Update index and page files for the 5 mapped categories
  const mappedConfig = [
    {
      category: 'all-star-special',
      mappedModule: '@/data/all-star-special-mapped',
      jsonImport: 'import allStarData from "@/data/all-star-special.json";',
      indexVars: ['allStarMasterItems', 'allStarFaqs'],
      faqVar: 'allStarFaqs'
    },
    {
      category: 'beverages',
      mappedModule: '@/data/beverages-mapped',
      jsonImport: 'import beveragesData from "@/data/beverages.json";',
      indexVars: ['beverageMasterItems', 'beverageFaqs'],
      faqVar: 'beverageFaqs'
    },
    {
      category: 'sides',
      mappedModule: '@/data/sides-mapped',
      jsonImport: 'import sidesData from "@/data/sides.json";',
      indexVars: ['sideMasterItems', 'sideFaqs'],
      faqVar: 'sideFaqs'
    },
    {
      category: 'breakfast-sandwiches',
      mappedModule: '@/data/breakfast-sandwiches-mapped',
      jsonImport: 'import sandwichesData from "@/data/breakfast-sandwiches.json";',
      indexVars: ['sandwichMasterItems', 'sandwichFaqs'],
      faqVar: 'sandwichFaqs'
    },
    {
      category: 'hashbrowns',
      mappedModule: '@/data/hashbrowns-mapped',
      jsonImport: 'import hashbrownsData from "@/data/hashbrowns.json";',
      indexVars: ['hashbrownMasterItems', 'hashbrownFaqs'],
      faqVar: 'hashbrownFaqs'
    }
  ];

  for (const item of mappedConfig) {
    const indexPath = join(dir, `menu.${item.category}.index.tsx`);
    const pagePath = join(dir, `menu.${item.category}.page.$page.tsx`);

    console.log(`Decoupling ${item.category}...`);

    // Update index file
    if (await fileExists(indexPath)) {
      let indexContent = await fs.readFile(indexPath, 'utf8');
      
      // Remove JSON import
      indexContent = indexContent.replace(item.jsonImport, '');

      // Find the start of the data mapping / interfaces
      let startIdx = indexContent.indexOf('interface ');
      if (startIdx === -1 || startIdx > indexContent.indexOf('const rawItems')) {
        startIdx = indexContent.indexOf('const rawItems');
      }

      // Find the end of the faqs array
      const faqStartIdx = indexContent.indexOf(item.faqVar);
      if (startIdx !== -1 && faqStartIdx !== -1) {
        const endIdx = indexContent.indexOf('];', faqStartIdx) + 2;
        
        // Replace from startIdx to endIdx with the new import
        indexContent = indexContent.slice(0, startIdx) + 
                       `import { ${item.indexVars.join(', ')} } from "${item.mappedModule}";\n` + 
                       indexContent.slice(endIdx);
        
        await fs.writeFile(indexPath, indexContent, 'utf8');
        console.log(`  Updated ${indexPath}`);
      } else {
        console.log(`  Warning: Could not find data/faq indices in ${indexPath}`);
      }
    }

    // Update page file
    if (await fileExists(pagePath)) {
      let pageContent = await fs.readFile(pagePath, 'utf8');
      // Replace the import from the local index to the mapped module
      // Use [^}]*? to prevent greedy matching across other imports
      const pageImportRegex = new RegExp(`import\\s*\\{([^}]*?)\\}\\s*from\\s*['"]\\./menu\\.${item.category}\\.index['"]`, 'g');
      pageContent = pageContent.replace(pageImportRegex, `import { ${item.indexVars.join(', ')} } from "${item.mappedModule}"`);
      await fs.writeFile(pagePath, pageContent, 'utf8');
      console.log(`  Updated ${pagePath}`);
    }
  }

  // 2. Run lazy evaluation refactoring on the 10 other categories
  for (const file of lazyFiles) {
    const filePath = join(dir, file);
    console.log(`Lazy-refactoring ${file}...`);
    let content = await fs.readFile(filePath, 'utf8');

    const rawItemsStart = content.indexOf('const rawItems');
    if (rawItemsStart === -1) {
      console.log(`  rawItems not found in ${file}`);
      continue;
    }

    const routeStart = content.indexOf('export const Route');
    if (routeStart === -1) {
      console.log(`  Route not found in ${file}`);
      continue;
    }

    let block = content.slice(rawItemsStart, routeStart);

    const splitMatch = block.match(/(const\s+SITE\s*=)|(const\s+\w+Faqs\s*=)/);
    let dataBlock = block;
    let staticBlock = '';
    
    if (splitMatch && splitMatch.index !== undefined) {
      dataBlock = block.slice(0, splitMatch.index);
      staticBlock = block.slice(splitMatch.index);
    }

    const constRegex = /^const\s+(\w+)\s*(?::[\s\S]*?)?=/gm;
    let match;
    const vars = [];
    while ((match = constRegex.exec(dataBlock)) !== null) {
      vars.push(match[1]);
    }
    console.log(`  Found variables to lazy initialize: ${vars.join(', ')}`);

    let declarations = '';
    vars.forEach(name => {
      if (name === 'rawItems') {
        declarations += `let rawItems: any[];\n`;
      } else {
        declarations += `let ${name}: MasterItem[];\n`;
      }
    });

    let initDataBody = dataBlock;
    vars.forEach(name => {
      const replaceRegex = new RegExp(`^const\\s+${name}\\s*(?::[\\s\\S]*?)?=`, 'm');
      initDataBody = initDataBody.replace(replaceRegex, `${name} =`);
    });

    let lazyBlock = `
${declarations}
function initData() {
  if (items) return;
  ${initDataBody.trim().replace(/\n/g, '\n  ')}
}
`;

    let newContent = content.slice(0, rawItemsStart) + lazyBlock + staticBlock + content.slice(routeStart);

    newContent = newContent.replace('head: () => {', 'head: () => {\n    initData();');

    if (newContent.includes('component: () => (')) {
      newContent = newContent.replace('component: () => (', 'component: () => {\n    initData();\n    return (');
      newContent = newContent.replace(/\n\s*\),\s*\n\}\);\s*$/, '\n    );\n  },\n});');
    } else if (newContent.includes('component: () => {')) {
      newContent = newContent.replace('component: () => {', 'component: () => {\n    initData();');
    }

    await fs.writeFile(filePath, newContent, 'utf8');
    console.log(`  Successfully lazy-refactored ${file}`);
  }
}

async function fileExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

applyFixes().catch(console.error);
