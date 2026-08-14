import { promises as fs } from 'fs';

async function refactorFile(filePath) {
  console.log('Refactoring:', filePath);
  let content = await fs.readFile(filePath, 'utf8');

  // Find start of rawItems
  const rawItemsIndex = content.indexOf('const rawItems');
  if (rawItemsIndex === -1) {
    console.log('  rawItems not found!');
    return;
  }

  // Find export const Route
  const routeIndex = content.indexOf('export const Route');
  if (routeIndex === -1) {
    console.log('  Route not found!');
    return;
  }

  // Extract the data block
  let dataBlock = content.slice(rawItemsIndex, routeIndex);

  // We want to declare the variables at module level with let
  // Find all top-level const definitions in the data block
  // e.g. const rawItems, const items, const elevenOfficialBurgers
  const constRegex = /^const\s+(\w+)\s*(?::[\s\S]*?)?=/gm;
  let match;
  const varNames = [];
  while ((match = constRegex.exec(dataBlock)) !== null) {
    varNames.push(match[1]);
  }

  console.log('  Found variables:', varNames);

  // Rename top-level const to let in the module scope declarations
  const declarations = varNames.map(name => `let ${name}: any;`).join('\n');

  // Convert the const declarations inside initData to assignments
  let initDataBody = dataBlock;
  varNames.forEach(name => {
    // Replace "const name =" or "const name : Type =" with "name ="
    // Be careful with word boundaries
    const replaceRegex = new RegExp(`^const\\s+${name}\\s*(?::[\\s\\S]*?)?=`, 'm');
    initDataBody = initDataBody.replace(replaceRegex, `${name} =`);
  });

  const initDataFunction = `
${declarations}

function initData() {
  if (items) return;
  ${initDataBody.trim().replace(/\n/g, '\n  ')}
}
`;

  // Replace dataBlock in original content with initDataFunction
  let newContent = content.slice(0, rawItemsIndex) + initDataFunction + content.slice(routeIndex);

  // Now insert initData() at the beginning of head and component callbacks
  // Find "head: () => {"
  newContent = newContent.replace('head: () => {', 'head: () => {\n    initData();');
  // Find "component: () => ("
  newContent = newContent.replace('component: () => (', 'component: () => {\n    initData();\n    return (');
  // Find the closing bracket of component:
  // Since component ends with "),", we can find the last ");" or ")," of the route
  // But wait, it's safer to just replace ") => (" with "() => { initData(); return (" and closing ")" with "}"
  // Wait, let's look at Route definition in waffles.index.tsx:
  // component: () => (
  //   <CategoryMasterView ... />
  // ),
  // So we can replace:
  // component: () => (
  //   <CategoryMasterView
  // with:
  // component: () => {
  //   initData();
  //   return (
  //     <CategoryMasterView
  // And the trailing "), \n })" needs to end with "}"
  // Wait, the file ends with:
  //   ),
  // });
  // We can replace the last "), \n })" or "  ),\n});" with "  };\n});"
  // Let's do that precisely
  newContent = newContent.replace(/\n\s*\),\s*\n\}\);\s*$/, '\n    };\n  },\n});');

  console.log('--- REFACTORED WAFFLES ---');
  console.log(newContent.slice(newContent.indexOf('let rawItems'), newContent.indexOf('let rawItems') + 800));
  console.log('--- END WAFFLES ---');
  
  await fs.writeFile(filePath + '.test.tsx', newContent, 'utf8');
  console.log('Test file written.');
}

refactorFile('./src/routes/menu.waffles.index.tsx').catch(console.error);
