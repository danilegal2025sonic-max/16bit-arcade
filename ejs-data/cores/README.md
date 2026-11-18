# EmulatorJS Cores

This package contains the stable cores for EmulatorJS.

Learn more about EmulatorJS at https://emulatorjs.org

This app bundles core packages at the pinned version listed in `package.json`.
The 3.0.0 additions and their archive checksums are recorded in
`core-packages-lock.json`. The newly integrated systems are Atari 8-bit (81),
Sinclair ZX Spectrum (Fuse), Amstrad CPC (Caprice32), and Doom (PrBoom).
Alternate cores are included for NES, Nintendo DS, Nintendo 64, PlayStation,
and arcade systems. No game files, BIOS, or firmware are included.

Cores are build using this repository:
https://github.com/EmulatorJS/build

## How to install

To install all cores, run the following command:

```bash
npm install @emulatorjs/cores
```
To install a specific core, run the following command:

```bash
npm install @emulatorjs/core-<core-name>
```
