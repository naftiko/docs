const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'images');
const outputFile = path.join(__dirname, '..', 'README.md');

const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

function getImages(dir, relativeTo) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getImages(fullPath, relativeTo));
    } else if (imageExtensions.includes(path.extname(entry.name).toLowerCase())) {
      const relPath = path.relative(relativeTo, fullPath);
      results.push(relPath);
    }
  }

  return results;
}

const projectRoot = path.join(__dirname, '..');
const images = getImages(imagesDir, projectRoot).sort();

let markdown = '# Docs\n';
markdown += 'Repo for managing documents, images, and other objects for reuse across Naftiko.\n\n';
markdown += '## Images\n\n';

images.forEach(relPath => {
  const fileName = path.basename(relPath);
  const urlPath = relPath.split(path.sep).join('/');
  markdown += `- [${fileName}](https://naftiko.github.io/docs/${urlPath})\n`;
});

fs.writeFileSync(outputFile, markdown);
console.log(`README.md generated with ${images.length} image(s).`);