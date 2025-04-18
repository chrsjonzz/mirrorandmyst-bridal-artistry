const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/gallary');
const files = fs.readdirSync(inputDir).filter(f => /\.(jpe?g|png)$/i.test(f));

(async () => {
  if (files.length === 0) {
    console.log('No new JPG or PNG images found.');
    return;
  }
  await imagemin(
    files.map(f => path.join(inputDir, f)),
    {
      destination: inputDir,
      plugins: [imageminWebp({ quality: 90 })],
    }
  );
  console.log('Converted all new images to WebP!');
})();
