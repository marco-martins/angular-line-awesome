const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
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

// Convert icons to typescript (svg to ts)
exec(
  `npx svg-to-ts -c files -s './${destinationFolder}/**/*.svg' -o './projects/angular-line-awesome/icons' -i 'LineAwesomeIcon' -t 'lineAwesomeIcon' --modelFileName 'line-awesome-icon.model' -p '' -d 'KEBAB'`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`[error] ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`[stderr] ${stderr}`);
      return;
    }
    console.log(`[stdout] ${stdout}`);
  }
);
