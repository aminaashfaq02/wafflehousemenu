const fs = require('fs');
const path = require('path');

const dir = 'src/assets/iloveimg-compressed (8)';
const files = fs.readdirSync(dir);

const mapping = {
  'Diner_dining_area_with_booths_202608152129.jpeg': 'loc-1-diner-booths.jpeg',
  'Empty_diner_dining_area_2K_202608152126.jpeg': 'loc-2-empty-diner.jpeg',
  'Empty_diner_dining_area_2K_202608152217.jpeg': 'loc-3-dining-area.jpeg',
  'Waffle_House_diner_exterior_2K_202608152048.jpeg': 'loc-4-exterior.jpeg',
  'Waffle_House_signboard_against_sky_202608152155.jpeg': 'loc-7-signboard-sky.jpeg'
};

// Handle files with ellipsis
files.forEach(f => {
  let newName = mapping[f];
  if (!newName) {
    if (f.startsWith('Waffle_House_diner_exterior_twil')) {
      newName = 'loc-5-exterior-twilight.jpeg';
    } else if (f.startsWith('Waffle_House_restaurant_along_hi')) {
      newName = 'loc-6-highway.jpeg';
    } else if (f.startsWith('Yellow_Waffle_House_signboard_ag')) {
      newName = 'loc-8-yellow-signboard.jpeg';
    }
  }
  if (newName) {
    fs.renameSync(path.join(dir, f), path.join(dir, newName));
    console.log(`Renamed: "${f}" -> "${newName}"`);
  }
});

console.log('Done renaming location images to clean ASCII filenames.');
