import { promises as fs } from 'fs';
import { join } from 'path';

const categories = [
  { name: 'Waffles', file: 'menu.waffles.index.tsx' },
  { name: 'Egg Breakfasts (Breakfast)', file: 'menu.breakfast.index.tsx' },
  { name: 'Egg Breakfasts', file: 'menu.egg-breakfasts.index.tsx' },
  { name: 'Biscuits', file: 'menu.biscuits.index.tsx' },
  { name: 'Toddle House® Omelets', file: 'menu.omelets.index.tsx' },
  { name: 'Hashbrown Bowls', file: 'menu.hashbrown-bowls.index.tsx' },
  { name: 'Burgers', file: 'menu.burgers.index.tsx' },
  { name: 'Classic Dinners', file: 'menu.classic-dinners.index.tsx' },
  { name: 'Texas Melts', file: 'menu.texas-melts.index.tsx' },
  { name: 'Sandwiches', file: 'menu.sandwiches.index.tsx' },
  { name: 'Sides (Mapped)', tsFile: 'sides-mapped.ts', jsonFile: 'sides.json' },
  { name: 'Beverages (Mapped)', tsFile: 'beverages-mapped.ts', jsonFile: 'beverages.json' },
  { name: 'All-Star Special (Mapped)', tsFile: 'all-star-special-mapped.ts', jsonFile: 'all-star-special.json' },
  { name: 'Breakfast Sandwiches (Mapped)', tsFile: 'breakfast-sandwiches-mapped.ts', jsonFile: 'breakfast-sandwiches.json' },
  { name: 'Hashbrowns (Mapped)', tsFile: 'hashbrowns-mapped.ts', jsonFile: 'hashbrowns.json' }
];

async function analyze() {
  console.log('Starting image audit...\n');
  const results = {};

  for (const cat of categories) {
    let rawItems = [];
    let imageMap = {};
    let introImgName = '';

    if (cat.file) {
      // It's a standard index route file
      const content = await fs.readFile(join('./src/routes', cat.file), 'utf8');
      
      // Extract the JSON import filename
      const jsonImportMatch = content.match(/import\s+(\w+)\s+from\s+['"]@\/data\/([^'"]+)\.json['"]/);
      if (!jsonImportMatch) {
        console.log(`Could not find JSON import in ${cat.file}`);
        continue;
      }
      const jsonFileName = jsonImportMatch[2] + '.json';
      const jsonContent = await fs.readFile(join('./src/data', jsonFileName), 'utf8');
      const jsonData = JSON.parse(jsonContent);
      rawItems = jsonData.items || [];

      // Extract the introImg / default image name
      // Usually like `import introImg from "@/assets/..."` or similar
      const introImgMatch = content.match(/import\s+(\w+IntroImg|\w+intro|\w+Intro|introImg|circleIntroImg)\s+from\s+['"]@\/assets\/([^'"]+)['"]/);
      if (introImgMatch) {
        introImgName = introImgMatch[1];
      }

      // Extract imageMap
      const imageMapMatch = content.match(/const\s+imageMap\s*(?::[\s\S]*?)?=\s*\{([\s\S]*?)\};/);
      if (imageMapMatch) {
        const lines = imageMapMatch[1].split('\n');
        lines.forEach(line => {
          const m = line.match(/^\s*['"]?([^'"]+)['"]?\s*:\s*(\w+)/);
          if (m) {
            imageMap[m[1]] = m[2];
          }
        });
      }
    } else {
      // It's a decoupled mapped file
      const tsContent = await fs.readFile(join('./src/data', cat.tsFile), 'utf8');
      const jsonContent = await fs.readFile(join('./src/data', cat.jsonFile), 'utf8');
      const jsonData = JSON.parse(jsonContent);
      rawItems = jsonData.items || [];

      const introImgMatch = tsContent.match(/import\s+(\w+IntroImg|\w+intro|\w+Intro|introImg|circleIntroImg)\s+from\s+['"]@\/assets\/([^'"]+)['"]/);
      if (introImgMatch) {
        introImgName = introImgMatch[1];
      }

      // Extract imageMap
      const imageMapMatch = tsContent.match(/const\s+imageMap\s*(?::[\s\S]*?)?=\s*\{([\s\S]*?)\};/);
      if (imageMapMatch) {
        const lines = imageMapMatch[1].split('\n');
        lines.forEach(line => {
          const m = line.match(/^\s*['"]?([^'"]+)['"]?\s*:\s*(\w+)/);
          if (m) {
            imageMap[m[1]] = m[2];
          }
        });
      }
    }

    results[cat.name] = {
      items: [],
      introImg: introImgName
    };

    for (const item of rawItems) {
      const imgKey = item.image;
      const mappedVal = imageMap[imgKey] || null;
      let status = 'OK';
      
      if (!imgKey || imgKey.trim() === '') {
        status = 'MISSING_IN_JSON';
      } else if (!mappedVal) {
        status = 'UNMAPPED_IN_IMAGEMAP'; // fallback to intro
      } else if (mappedVal === introImgName || mappedVal.toLowerCase().includes('intro')) {
        status = 'USING_INTRO_FALLBACK';
      }

      results[cat.name].items.push({
        name: item.name,
        slug: item.slug,
        imageKey: imgKey,
        mappedVal: mappedVal,
        status: status
      });
    }
  }

  // Generate Report
  let report = '# Waffle House Menu Image Audit Report\n\n';
  let totalItems = 0;
  let totalMissing = 0;
  let totalFallback = 0;
  let totalOK = 0;
  const imageCounts = {};

  for (const [catName, data] of Object.entries(results)) {
    report += `## ${catName}\n\n`;
    report += `| Recipe Name | Slug | JSON Image Value | Mapped Asset | Status |\n`;
    report += `| --- | --- | --- | --- | --- |\n`;
    
    data.items.forEach(item => {
      totalItems++;
      if (item.status === 'OK') {
        totalOK++;
      } else if (item.status === 'USING_INTRO_FALLBACK' || item.status === 'UNMAPPED_IN_IMAGEMAP') {
        totalFallback++;
      } else {
        totalMissing++;
      }

      // Track asset reuse to find repeats
      if (item.mappedVal && item.status === 'OK') {
        imageCounts[item.mappedVal] = (imageCounts[item.mappedVal] || 0) + 1;
      }

      report += `| ${item.name} | \`${item.slug}\` | \`${item.imageKey || ''}\` | \`${item.mappedVal || 'None'}\` | **${item.status}** |\n`;
    });
    report += '\n';
  }

  report += `## Summary of Audited Items\n\n`;
  report += `- **Total Recipes Audited**: ${totalItems}\n`;
  report += `- **Recipes with Matching Custom Images**: ${totalOK}\n`;
  report += `- **Recipes Using Category Fallbacks**: ${totalFallback}\n`;
  report += `- **Recipes Missing Images entirely**: ${totalMissing}\n\n`;

  report += `## Duplicate/Repeated Image Asset Audit\n\n`;
  report += `The following image assets are reused across multiple different recipes:\n\n`;
  report += `| Image Asset Name | Reuse Count | Recipes Using It |\n`;
  report += `| --- | --- | --- |\n`;
  
  let repeatFound = false;
  for (const [asset, count] of Object.entries(imageCounts)) {
    if (count > 1) {
      repeatFound = true;
      const matchingRecipes = [];
      for (const [catName, data] of Object.entries(results)) {
        data.items.forEach(item => {
          if (item.mappedVal === asset) {
            matchingRecipes.push(`${item.name} (${catName})`);
          }
        });
      }
      report += `| \`${asset}\` | ${count} | ${matchingRecipes.join(', ')} |\n`;
    }
  }

  if (!repeatFound) {
    report += `| None | 0 | All recipe images are unique! |\n`;
  }

  await fs.writeFile(join('./', 'image_audit_report.md'), report, 'utf8');
  console.log('Audit completed! Report written to image_audit_report.md');
}

analyze().catch(console.error);
