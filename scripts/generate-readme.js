const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'images');
const outputFile = path.join(__dirname, '..', 'README.md');

const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

const files = fs.readdirSync(imagesDir).filter(file => {
  return imageExtensions.includes(path.extname(file).toLowerCase());
});

let markdown = '# Docs\n';
markdown += 'Repo for managing documents, images, and other objects for reuse across Naftiko.\n\n';
markdown += '## Images\n\n';

files.forEach(file => {
  markdown += `- [${file}](https://naftiko.github.io/docs/images/${file})\n`;
});

fs.writeFileSync(outputFile, markdown);
console.log(`README.md generated with ${files.length} image(s).`);