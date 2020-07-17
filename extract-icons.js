const path = require('path');
const fs = require('fs');
const solidIcons = require('./utils/solid-icons');
const regularIcons = require('./utils/regular-icons');
const brandIcons = require('./utils/brand-icons');
const sourceFolder = './node_modules/line-awesome/svg';
const destinationFolder = 'iconsTemp';

const iconsSets = [
  { icons: solidIcons, folder: 'solid', prefix: 'las' },
  { icons: regularIcons, folder: 'regular', prefix: 'lar' },
  { icons: brandIcons, folder: 'brand', prefix: 'lab' }
];

// Prepare icons to convert
iconsSets.forEach(set => {
  const tempDir = path.join(__dirname, destinationFolder, set.folder);

  if (fs.existsSync(tempDir)) {
    fs.rmdirSync(tempDir, { recursive: true });
  }
  fs.mkdirSync(tempDir, { recursive: true });

  set.icons.forEach(file => {
    const originalFileName = `${file}.svg`;
    const sourceFileName = file.endsWith('-solid')
      ? originalFileName.replace('-solid', '')
      : originalFileName;

    fs.copyFileSync(
      path.join(__dirname, sourceFolder, originalFileName),
      path.join(__dirname, destinationFolder, set.folder, `${set.prefix}-${sourceFileName}`),
      err => {
        if (err) throw err;
      }
    );
  });
});
