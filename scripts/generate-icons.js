#!/usr/bin/env node
/**
 * Generates branded PNG icons for the .pkpass files.
 * Creates a teal background with white "E" - matching Emporium branding.
 *
 * Outputs base64-encoded PNGs that can be pasted into passGenerator.js.
 * Uses raw PNG construction (no external image libraries needed).
 */
const zlib = require('zlib');

function createPNG(width, height, bgR, bgG, bgB) {
  // Create raw RGBA pixel data
  const rawData = Buffer.alloc(height * (1 + width * 4)); // filter byte + RGBA per pixel
  for (let y = 0; y < height; y++) {
    const rowOffset = y * (1 + width * 4);
    rawData[rowOffset] = 0; // filter: none
    for (let x = 0; x < width; x++) {
      const px = rowOffset + 1 + x * 4;
      // Simple "E" letter pattern in center
      const cx = x / width;
      const cy = y / height;
      const inBorder = cx < 0.15 || cx > 0.85 || cy < 0.15 || cy > 0.85;
      const inE = (
        (cx >= 0.3 && cx <= 0.4 && cy >= 0.25 && cy <= 0.75) || // vertical bar
        (cx >= 0.3 && cx <= 0.7 && cy >= 0.25 && cy <= 0.35) || // top bar
        (cx >= 0.3 && cx <= 0.65 && cy >= 0.45 && cy <= 0.55) || // middle bar
        (cx >= 0.3 && cx <= 0.7 && cy >= 0.65 && cy <= 0.75)    // bottom bar
      );

      if (inE) {
        // White E
        rawData[px] = 255;
        rawData[px + 1] = 255;
        rawData[px + 2] = 255;
        rawData[px + 3] = 255;
      } else {
        // Teal background
        rawData[px] = bgR;
        rawData[px + 1] = bgG;
        rawData[px + 2] = bgB;
        rawData[px + 3] = 255;
      }
    }
  }

  // Compress
  const compressed = zlib.deflateSync(rawData);

  // Build PNG file
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  function chunk(type, data) {
    const len = Buffer.alloc(4);
    len.writeUInt32BE(data.length, 0);
    const typeAndData = Buffer.concat([Buffer.from(type), data]);
    const crc32 = crc(typeAndData);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc32, 0);
    return Buffer.concat([len, typeAndData, crcBuf]);
  }

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = chunk('IHDR', ihdr);
  const idatChunk = chunk('IDAT', compressed);
  const iendChunk = chunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// CRC32 implementation
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[n] = c;
}

function crc(buf) {
  let c = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xFF] ^ (c >>> 8);
  }
  return (c ^ 0xFFFFFFFF) >>> 0;
}

// Generate icons: teal (#00BFA6) = rgb(0, 191, 166)
const icon29 = createPNG(29, 29, 0, 191, 166);
const icon58 = createPNG(58, 58, 0, 191, 166);

console.log('// 29x29 icon.png');
console.log(`const ICON_PNG_BASE64 = '${icon29.toString('base64')}';`);
console.log();
console.log('// 58x58 icon@2x.png');
console.log(`const ICON_2X_PNG_BASE64 = '${icon58.toString('base64')}';`);
