import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const cliTemplate = path.resolve('node_modules/@capacitor/cli/dist/util/template.js');
const source = await readFile(cliTemplate, 'utf8');
const incompatibleImport = 'const tar_1 = tslib_1.__importDefault(require("tar"));';
const partialImport = 'const tar_1 = require("tar");';
const compatibleImport = 'const tar_1 = { default: require("tar") };';

if (source.includes(compatibleImport)) {
  process.exit(0);
}
if (source.includes(partialImport)) {
  await writeFile(cliTemplate, source.replace(partialImport, compatibleImport));
  console.log('Patched Capacitor CLI to use tar@7 named exports during native project sync.');
  process.exit(0);
}
if (!source.includes(incompatibleImport)) {
  throw new Error('Capacitor CLI template changed; review its tar import before building native apps.');
}

await writeFile(cliTemplate, source.replace(incompatibleImport, compatibleImport));
console.log('Patched Capacitor CLI to use tar@7 named exports during native project sync.');
