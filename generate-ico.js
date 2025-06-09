const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");

async function generateICO() {
  try {
    // Read the centered SVG content
    const svgContent = fs.readFileSync("./assets/images/favicon.svg", "utf8");

    // Create a data URL from the SVG
    const svgDataUrl = `data:image/svg+xml;base64,${Buffer.from(
      svgContent
    ).toString("base64")}`;

    // Create canvas for ICO generation
    const canvas = createCanvas(32, 32);
    const ctx = canvas.getContext("2d");

    // Load and draw the SVG
    const img = await loadImage(svgDataUrl);
    ctx.drawImage(img, 0, 0, 32, 32);

    // Generate PNG buffer
    const pngBuffer = canvas.toBuffer("image/png");

    // Simple ICO header generation (basic implementation)
    const icoHeader = Buffer.alloc(6);
    icoHeader.writeUInt16LE(0, 0); // Reserved
    icoHeader.writeUInt16LE(1, 2); // Type (1 = ICO)
    icoHeader.writeUInt16LE(1, 4); // Number of images

    // ICO directory entry
    const icoEntry = Buffer.alloc(16);
    icoEntry.writeUInt8(32, 0); // Width
    icoEntry.writeUInt8(32, 1); // Height
    icoEntry.writeUInt8(0, 2); // Color palette
    icoEntry.writeUInt8(0, 3); // Reserved
    icoEntry.writeUInt16LE(1, 4); // Color planes
    icoEntry.writeUInt16LE(32, 6); // Bits per pixel
    icoEntry.writeUInt32LE(pngBuffer.length, 8); // Image size
    icoEntry.writeUInt32LE(22, 12); // Image offset

    // Combine header, entry, and PNG data
    const icoBuffer = Buffer.concat([icoHeader, icoEntry, pngBuffer]);

    // Write ICO file
    fs.writeFileSync("./favicon.ico", icoBuffer);
    console.log("✅ Successfully generated favicon.ico with centered P!");
  } catch (error) {
    console.error("❌ Error generating ICO:", error.message);
    console.log("Please use the HTML tool in ico-regenerator.html instead.");
  }
}

generateICO();
