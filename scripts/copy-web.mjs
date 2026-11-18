import { cp, mkdir, rm } from 'node:fs/promises';

const files = [
  'index.html',
  'styles.css',
  'app.js',
  'manifest.webmanifest',
  'sw.js',
  'icon.svg',
  'icon-192.png',
  'icon-512.png',
];

await rm('www', { recursive: true, force: true });
await mkdir('www', { recursive: true });
for (const file of files) await cp(file, `www/${file}`);
await cp('ejs-data', 'www/ejs-data', { recursive: true });
await mkdir('www/v86/build', { recursive: true });
for (const file of ['libv86.mjs', 'v86.wasm', 'v86-fallback.wasm']) {
  await cp(`node_modules/v86/build/${file}`, `www/v86/build/${file}`);
}
await cp('third_party/v86-0.5.473/bios', 'www/v86/bios', { recursive: true });
await cp('third_party/v86-0.5.473/NOTICE.md', 'www/v86/NOTICE.md');
await cp('third_party/v86-0.5.473/LICENSE', 'www/v86/LICENSE');
await cp('third_party/v86-0.5.473/bios/COPYING.LESSER', 'www/v86/bios/COPYING.LESSER');
await cp('third_party/v86-0.5.473/bios/COPYING', 'www/v86/bios/COPYING');
