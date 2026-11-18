# v86 runtime

The bundled browser runtime is `v86` version `0.5.473`, published from the
official `copy/v86` project and distributed under the Simplified BSD License.
The runtime files copied into the app are `libv86.mjs`, `v86.wasm`, and
`v86-fallback.wasm` from the pinned npm package.

The bundled `seabios.bin` and `vgabios.bin` firmware files come from the
official v86 repository at commit `315b2b0`. Their corresponding firmware
source is SeaBIOS release `rel-1.16.2` and the v86 build configuration and
script at the pinned commit. The GPL-3.0 and LGPL-3.0 license texts are in
`bios/COPYING` and `bios/COPYING.LESSER`.

Source: https://github.com/copy/v86
Package: https://www.npmjs.com/package/v86
SeaBIOS source: https://github.com/coreboot/seabios/tree/rel-1.16.2
Pinned v86 BIOS build script: https://github.com/copy/v86/blob/315b2b0/bios/fetch-and-build-seabios.sh
