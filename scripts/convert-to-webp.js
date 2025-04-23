const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imageDir = path.join(__dirname, '../public/images/unsplash');

async function convertImages() {
  console.log(`Starting conversion in directory: ${imageDir}`);
  try {
    const files = fs.readdirSync(imageDir);
    const imageFiles = files.filter(file => !file.endsWith('.webp') && !file.includes('.')); // Target files without extensions

    if (imageFiles.length === 0) {
      console.log("No images found to convert (or all already converted).");
      return;
    }

    console.log(`Found ${imageFiles.length} images to convert.`);

    for (const file of imageFiles) {
      const inputPath = path.join(imageDir, file);
      const outputPath = path.join(imageDir, `${file}.webp`);

      try {
        console.log(`Converting ${file} to WebP...`);
        await sharp(inputPath)
          .resize({ width: 1920 }) // Resize to 1920px width, maintain aspect ratio
          .webp({ quality: 75 }) // Adjust quality as needed (0-100)
          .toFile(outputPath);
        console.log(`Successfully converted ${file} to ${file}.webp`);

        // Delete original file after successful conversion
        fs.unlinkSync(inputPath);
        console.log(`Deleted original file: ${file}`);

      } catch (convertError) {
        console.error(`Error converting file ${file}:`, convertError);
        // Decide if you want to stop or continue on error
      }
    }
    console.log("Image conversion process finished.");
  } catch (readDirError) {
    console.error(`Error reading directory ${imageDir}:`, readDirError);
  }
}

convertImages(); 