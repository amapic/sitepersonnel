const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [300, 600, 900, 1200, 1800];
const images = ['unclick', 'groupeleonie', 'sitePersoAutomatique', 'sunflower', 'uconsulting'];

async function generateSrcset() {
  for (const image of images) {
    for (const size of sizes) {
        console.log(`public/images/${image}.webp`)
      await sharp(`public/images/${image}.webp`)
        .resize(size, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(`public/images/${image}-${size}.webp`);
    }
  }
}

generateSrcset();