# Flycast WASM v1.0 bundled core

This app bundles the Dreamcast libretro WebAssembly core from `nasomers/flycast-wasm` release v1.0, which is based on Flycast by flyinghead and licensed GPL-2.0. The release provides its corresponding source, build instructions, and notices at https://github.com/nasomers/flycast-wasm/tree/v1.0. The upstream Flycast source is pinned in that repository's README.

Binary assets: `flycast_libretro.js` and `flycast_libretro.wasm`. They are repacked without code changes into EmulatorJS's `.data` ZIP container alongside the upstream `core.json`; this app supplies the EmulatorJS report file.

The app does not include or distribute Dreamcast BIOS files or game images.
