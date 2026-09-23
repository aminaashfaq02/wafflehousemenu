// Builds one minified Tailwind stylesheet per page group into assets/css/.
// Replaces the runtime Tailwind Play CDN script. Run after editing any page's classes: npm run build:css
const { execFileSync } = require('child_process');
const path = require('path');
const groups = require('./groups.json');

const root = path.resolve(__dirname, '..');
const bin = path.join(root, 'node_modules', 'tailwindcss', 'lib', 'cli.js');

for (const name of Object.keys(groups)) {
  execFileSync(
    process.execPath,
    [bin, '-c', `tools/tailwind/${name}.config.js`, '-i', 'tools/tailwind/input.css', '-o', `assets/css/${name}.css`, '--minify'],
    { cwd: root, stdio: 'inherit' }
  );
}
