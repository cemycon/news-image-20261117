import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// Check the bundled poster's PNG signature, then write an exact copy.
const poster = new URL('./poster.png', import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const pngSignature = Buffer.from('89504e470d0a1a0a', 'hex');

if (!existsSync(poster)) {
  console.error('Error: poster.png is missing; expected it next to main.ts.');
  process.exit(1);
}

const image = readFileSync(poster);
if (!image.subarray(0, pngSignature.length).equals(pngSignature)) {
  console.error('Error: poster.png does not have a valid PNG signature.');
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'entry.png'), image);
