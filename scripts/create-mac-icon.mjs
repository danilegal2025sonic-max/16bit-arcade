import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pngPath = path.join(projectRoot, 'icon-512.png');
const outputPath = path.join(projectRoot, 'build', 'icon.icns');
const png = await readFile(pngPath);

if (png.toString('hex', 0, 8) !== '89504e470d0a1a0a') {
  throw new Error('O ícone do macOS precisa ser um PNG válido.');
}

const width = png.readUInt32BE(16);
const height = png.readUInt32BE(20);
if (width !== 512 || height !== 512) {
  throw new Error(`O ícone do macOS precisa medir 512×512; recebido ${width}×${height}.`);
}

const chunk = Buffer.allocUnsafe(8 + png.length);
chunk.write('ic09', 0, 4, 'ascii');
chunk.writeUInt32BE(chunk.length, 4);
png.copy(chunk, 8);

const icon = Buffer.allocUnsafe(8 + chunk.length);
icon.write('icns', 0, 4, 'ascii');
icon.writeUInt32BE(icon.length, 4);
chunk.copy(icon, 8);

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, icon);
console.log(`Ícone ICNS criado: ${path.relative(projectRoot, outputPath)}`);
