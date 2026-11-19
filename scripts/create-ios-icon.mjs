import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PNG } from 'pngjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = PNG.sync.read(await readFile(path.join(projectRoot, 'icon-512.png')));
const size = 1024;
const output = new PNG({ width: size, height: size });
const background = [16, 17, 14];

for (let y = 0; y < size; y += 1) {
  const sourceY = Math.min(source.height - 1, Math.floor(y * source.height / size));
  for (let x = 0; x < size; x += 1) {
    const sourceX = Math.min(source.width - 1, Math.floor(x * source.width / size));
    const sourceIndex = (sourceY * source.width + sourceX) * 4;
    const targetIndex = (y * size + x) * 4;
    const alpha = source.data[sourceIndex + 3] / 255;
    for (let channel = 0; channel < 3; channel += 1) {
      output.data[targetIndex + channel] = Math.round(source.data[sourceIndex + channel] * alpha + background[channel] * (1 - alpha));
    }
    output.data[targetIndex + 3] = 255;
  }
}

const iconPath = path.join(projectRoot, 'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png');
await writeFile(iconPath, PNG.sync.write(output));

const splashSize = 2732;
const splash = new PNG({ width: splashSize, height: splashSize });
for (let index = 0; index < splash.data.length; index += 4) {
  splash.data[index] = background[0];
  splash.data[index + 1] = background[1];
  splash.data[index + 2] = background[2];
  splash.data[index + 3] = 255;
}

const scale = splashSize / 128;
const bars = [[26, 43, 17, 33], [56, 25, 17, 69], [86, 35, 17, 49]];
for (const [x, y, width, height] of bars) {
  const left = Math.round(x * scale);
  const top = Math.round((y + 5) * scale);
  const right = Math.round((x + width) * scale);
  const bottom = Math.round((y + height + 5) * scale);
  for (let row = top; row < bottom; row += 1) {
    for (let column = left; column < right; column += 1) {
      const index = (row * splashSize + column) * 4;
      splash.data[index] = 208;
      splash.data[index + 1] = 242;
      splash.data[index + 2] = 92;
    }
  }
}

const splashBytes = PNG.sync.write(splash);
const splashDirectory = path.join(projectRoot, 'ios/App/App/Assets.xcassets/Splash.imageset');
for (const name of ['splash-2732x2732.png', 'splash-2732x2732-1.png', 'splash-2732x2732-2.png']) {
  await writeFile(path.join(splashDirectory, name), splashBytes);
}
process.stdout.write('iOS icon and launch screen branding generated.\n');
