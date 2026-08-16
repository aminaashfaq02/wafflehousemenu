const fs = require('fs');

let content = fs.readFileSync('src/data/menu.ts', 'utf8');

// Find all image imports and create mock variables for them
const assetImports = content.match(/import\s+(\w+)\s+from\s+["']@\/assets\/[^"']+["'];/g) || [];
let mocks = '';
assetImports.forEach(imp => {
  const match = imp.match(/import\s+(\w+)\s+/);
  if (match) {
    mocks += `const ${match[1]} = "mock-image-path";\n`;
  }
});

// Remove all imports from the content
content = content.replace(/import\s+[^;]+;/g, '');

// Prepend mocks
const executableContent = mocks + '\n' + content;

const sandbox = { today: '2026-08-15' };
try {
  const fn = new Function('exports', 'require', 'module', executableContent);
  const mockModule = { exports: {} };
  fn(mockModule.exports, () => ({}), mockModule);
  
  const menu = mockModule.exports.menu;
  console.log('Runtime menu length:', menu ? menu.length : 'undefined');
} catch (e) {
  console.error('Error evaluating:', e);
}
