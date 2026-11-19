const homeShell = document.querySelector('#home-shell');
const chooseButton = document.querySelector('#choose-game');
const libraryImportButton = document.querySelector('#library-import-open');
const fileInput = document.querySelector('#rom-file');
const libraryInput = document.querySelector('#library-import');
const libraryList = document.querySelector('#library-list');
const emptyLibrary = document.querySelector('#empty-library');
const noResults = document.querySelector('#no-results');
const playerView = document.querySelector('#player-view');
const playerScreen = document.querySelector('#player-screen');
const playerLoader = document.querySelector('#player-loader');
const playerStatus = document.querySelector('#player-status');
const playerName = document.querySelector('#player-game-name');
const mount = document.querySelector('#emulator-mount');
const virtualKeyboard = document.querySelector('#player-keyboard');
const virtualKeyboardRows = document.querySelector('#virtual-keyboard-rows');
const virtualKeyboardToggle = document.querySelector('#player-keyboard-toggle');
const controlHint = document.querySelector('#control-hint');
const toast = document.querySelector('#toast');
const settingsDialog = document.querySelector('#settings-dialog');
const settingsForm = document.querySelector('#settings-form');
const volumeInput = document.querySelector('#setting-volume');
const volumeValue = document.querySelector('#volume-value');
const fullscreenButton = document.querySelector('#fullscreen-toggle');
const systemSelect = document.querySelector('#system-select');
const systemPicker = document.querySelector('#system-picker-dialog');
const PS2_PLAYER_URL = 'https://tabstationtoo.github.io/TabStationToo/';
const PSVITA_PLAYER_URL = 'https://vita3k.org/download.html';
const APP_BASE_URL = new URL('.', document.baseURI);
const SYSTEMS = {
  megadrive: { name: 'Sega Mega Drive', core: 'segaMD', control: 'segaMD', extensions: ['md','gen','bin','smd','rom'] },
  segacd: { name: 'Sega CD', core: 'segaCD', control: 'segaCD', extensions: ['iso','chd','cue','m3u','bin','zip'] },
  '32x': { name: 'Sega 32X', core: 'sega32x', control: 'sega32x', extensions: ['32x','zip'] },
  saturn: { name: 'Sega Saturn', core: 'segaSaturn', control: 'segaSaturn', extensions: ['iso','chd','cue','ccd','m3u','img','sub','bin','zip'] },
  mastersystem: { name: 'Sega Master System', core: 'segaMS', control: 'segaMS', biosKey: 'mastersystem', extensions: ['sms','bin','zip'] },
  gamegear: { name: 'Sega Game Gear', core: 'segaGG', control: 'segaGG', biosKey: 'gamegear', extensions: ['gg','bin','zip'] },
  gb: { name: 'Game Boy', core: 'gb', control: 'gb', biosKey: 'gb', extensions: ['gb','bin','zip'] },
  gbc: { name: 'Game Boy Color', core: 'gb', control: 'gb', biosKey: 'gbc', extensions: ['gbc','gb','bin','zip'] },
  gba: { name: 'Game Boy Advance', core: 'gba', control: 'gba', biosKey: 'gba', extensions: ['gba','bin','zip'] },
  n64: { name: 'Nintendo 64', core: 'n64', control: 'n64', extensions: ['z64','n64','v64','zip'] },
  ps1: { name: 'PlayStation (PS1)', core: 'psx', biosKey: 'ps1', extensions: ['bin','cue','ccd','toc','m3u','chd','iso','img','sub','pbp','zip'] },
  ps2: { name: 'PlayStation 2', kind: 'external', externalUrl: PS2_PLAYER_URL, extensions: ['iso','chd','cso','zso','bin','img','zip'] },
  psvita: { name: 'PlayStation Vita', kind: 'external', externalUrl: PSVITA_PLAYER_URL, extensions: [] },
  psp: { name: 'PlayStation Portable (PSP)', core: 'psp', threaded: true, extensions: ['iso','cso','pbp','zip'] },
  dreamcast: { name: 'Sega Dreamcast', core: 'flycast', customCore: true, biosKeys: ['dreamcast-boot','dreamcast-flash'], extensions: ['cdi','gdi','chd','cue','m3u','iso','elf','bin','zip'] },
  nes: { name: 'Nintendo NES / Famicom', core: 'nes', control: 'nes', extensions: ['nes','unf','unif','fds','zip'] },
  snes: { name: 'Super Nintendo / SNES', core: 'snes', control: 'snes', extensions: ['sfc','smc','fig','swc','zip'] },
  nds: { name: 'Nintendo DS', core: 'nds', control: 'nds', biosKeys: ['nds-bios7','nds-bios9','nds-firmware'], extensions: ['nds','dsi','zip'] },
  atari2600: { name: 'Atari 2600', core: 'atari2600', control: 'atari2600', extensions: ['a26','bin','rom','zip'] },
  atari5200: { name: 'Atari 5200', core: 'atari5200', extensions: ['a52','bin','rom','zip'] },
  atari7800: { name: 'Atari 7800', core: 'atari7800', control: 'atari7800', biosKey: 'atari7800', extensions: ['a78','bin','rom','zip'] },
  lynx: { name: 'Atari Lynx', core: 'lynx', control: 'lynx', biosKey: 'lynx', extensions: ['lnx','lyx','zip'] },
  vb: { name: 'Virtual Boy', core: 'vb', control: 'vb', extensions: ['vb','vboy','zip'] },
  '3do': { name: '3DO', core: '3do', control: '3do', biosKey: '3do', extensions: ['iso','cue','chd','bin','zip'] },
  coleco: { name: 'ColecoVision', core: 'coleco', biosKey: 'coleco', extensions: ['col','cv','rom','bin','zip'] },
  pce: { name: 'PC Engine / TurboGrafx-16', core: 'pce', extensions: ['pce','sgx','cue','zip'] },
  ngp: { name: 'Neo Geo Pocket', core: 'ngp', extensions: ['ngp','ngc','zip'] },
  ws: { name: 'WonderSwan', core: 'ws', extensions: ['ws','wsc','zip'] },
  arcade: { name: 'Arcade (FBNeo)', core: 'arcade', control: 'arcade', extensions: ['zip','7z'] },
  mame2003: { name: 'Arcade (MAME 2003)', core: 'mame', control: 'mame', extensions: ['zip','7z'] },
  jaguar: { name: 'Atari Jaguar', core: 'jaguar', control: 'jaguar', extensions: ['j64','jag','rom','zip'] },
  dos: { name: 'PC MS-DOS', core: 'dos', threaded: true, keyboard: true, extensions: ['zip','7z'] },
  c64: { name: 'Commodore 64', core: 'c64', keyboard: true, extensions: ['d64','t64','tap','crt','prg','p00','zip'] },
  c128: { name: 'Commodore 128', core: 'c128', keyboard: true, extensions: ['d64','d71','d81','tap','crt','prg','zip'] },
  pet: { name: 'Commodore PET', core: 'pet', keyboard: true, extensions: ['prg','p00','crt','zip'] },
  plus4: { name: 'Commodore Plus/4', core: 'plus4', keyboard: true, extensions: ['prg','p00','tap','d64','zip'] },
  vic20: { name: 'Commodore VIC-20', core: 'vic20', keyboard: true, extensions: ['prg','p00','crt','tap','zip'] },
  amiga: { name: 'Commodore Amiga', core: 'amiga', keyboard: true, biosKey: 'amiga', extensions: ['adf','adz','dms','ipf','lha','zip'] },
  pcfx: { name: 'NEC PC-FX', core: 'pcfx', biosKey: 'pcfx', extensions: ['cue','chd','iso','zip'] },
  sg1000: { name: 'Sega SG-1000', core: 'segaMD', control: 'segaMS', extensions: ['sg','bin','rom','zip','7z'] },
  segapico: { name: 'Sega Pico', core: 'segaMD', experimental: true, extensions: ['68k','sgd','bin','zip','7z'] },
  supergrafx: { name: 'NEC SuperGrafx', core: 'pce', extensions: ['sgx','pce','cue','chd','zip'] },
  pcenginecd: { name: 'PC Engine CD / TurboGrafx-CD', core: 'pce', biosKey: 'pcecd', extensions: ['cue','m3u','chd','iso','bin','zip'] },
  neogeo: { name: 'Neo Geo AES / MVS', core: 'arcade', control: 'arcade', extensions: ['zip','7z'] },
  atari8: { name: 'Atari 8-bit (400/800/XL/XE)', core: '81', keyboard: true, extensions: ['atr','atx','xex','xfd','dcm','cas','rom','zip','7z'] },
  zxspectrum: { name: 'Sinclair ZX Spectrum', core: 'fuse', keyboard: true, extensions: ['z80','sna','tap','tzx','pzx','dsk','udi','trd','zip','7z'] },
  amstradcpc: { name: 'Amstrad CPC', core: 'cap32', keyboard: true, extensions: ['dsk','sna','cdt','cpr','voc','zip','7z'] },
  doom: { name: 'Doom (PrBoom)', core: 'prboom', keyboard: true, extensions: ['wad','zip','7z'] },
};
const CURRENT_VERSION = '5.2.0';
const SYSTEM_KEY = 'sixteenbit-system-v1';

const DB_NAME = 'sixbit-local-library';
const DB_VERSION = 2;
const SETTINGS_KEY = 'sixteenbit-settings-v3';
const SUPPORTED_EXTENSIONS = [...new Set(Object.values(SYSTEMS).flatMap((system) => system.extensions))];
const ROM_FILE_ACCEPT = SUPPORTED_EXTENSIONS.map((extension) => `.${extension}`).join(',');
fileInput.accept = ROM_FILE_ACCEPT;
libraryInput.accept = ROM_FILE_ACCEPT;
const DEFAULT_SETTINGS = {
  theme: 'lime',
  aspect: 'classic',
  filter: 'off',
  touchControls: true,
  layout: 'three',
  padStyle: 'dpad',
  padOpacity: 78,
  padScale: 100,
  volume: 80,
  haptics: true,
  keepAwake: true,
  startupSound: true,
  performance: 'balanced',
  reducedMotion: false,
  devMode: false,
};
const COVER_BACKGROUNDS = [
  'linear-gradient(135deg,#54294c,#24203c 60%,#d06261)',
  'linear-gradient(135deg,#24575a,#192d45 60%,#6bc4a3)',
  'linear-gradient(135deg,#5d4727,#28213d 58%,#dc8954)',
  'linear-gradient(135deg,#323f73,#201c3c 58%,#a05fa5)',
  'linear-gradient(135deg,#4a3040,#1d293c 62%,#d06b8a)',
  'linear-gradient(135deg,#345743,#1b2c3b 58%,#9cb550)',
];

const SYSTEM_GROUPS = {
  Sega: ['megadrive','segacd','32x','saturn','mastersystem','gamegear','dreamcast','sg1000','segapico'],
  Nintendo: ['nes','snes','gb','gbc','gba','nds','n64'],
  PlayStation: ['ps1','ps2','psp','psvita'],
  Atari: ['atari2600','atari5200','atari7800','jaguar','lynx','vb'],
  Computadores: ['c64','c128','pet','plus4','vic20','amiga','dos','atari8','zxspectrum','amstradcpc'],
  Arcade: ['arcade','mame2003'],
  'PC clássico': ['doom'],
  Outros: ['3do','coleco','pce','supergrafx','pcenginecd','ngp','ws','pcfx','neogeo'],
};
const SYSTEM_FAMILIES = Object.fromEntries(Object.entries(SYSTEM_GROUPS).flatMap(([family, ids]) => ids.map((id) => [id, family])));
const FAMILY_SKINS = {
  Sega: { accent: '#78c8ff', rgb: '120,200,255', deep: '#153754' },
  Nintendo: { accent: '#ff6879', rgb: '255,104,121', deep: '#4b202c' },
  PlayStation: { accent: '#82aaff', rgb: '130,170,255', deep: '#222f58' },
  Atari: { accent: '#ffb45c', rgb: '255,180,92', deep: '#49321b' },
  Computadores: { accent: '#79dec5', rgb: '121,222,197', deep: '#1d433c' },
  Arcade: { accent: '#ef7cdb', rgb: '239,124,219', deep: '#462342' },
  'PC clássico': { accent: '#ff706a', rgb: '255,112,106', deep: '#4b2523' },
  Outros: { accent: '#c39aff', rgb: '195,154,255', deep: '#37234e' },
};
const SYSTEM_MARKS = {
  megadrive: 'GENESIS', segacd: 'MEGA-CD', '32x': '32X', saturn: 'SATURN', mastersystem: 'MASTER SYSTEM', gamegear: 'GAME GEAR',
  dreamcast: 'DREAMCAST', sg1000: 'SG-1000', segapico: 'PICO', nes: 'FAMICOM', snes: 'SUPER FAMICOM', gb: 'GAME BOY', gbc: 'GAME BOY COLOR',
  gba: 'GAME BOY ADVANCE', nds: 'NINTENDO DS', n64: 'NINTENDO 64', ps1: 'PLAYSTATION', psp: 'PSP', atari2600: 'ATARI 2600',
  atari5200: 'ATARI 5200', atari7800: 'ATARI 7800', jaguar: 'JAGUAR', lynx: 'LYNX', vb: 'VIRTUAL BOY', arcade: 'ARCADE',
  mame2003: 'MAME 2003', c64: 'COMMODORE 64', amiga: 'AMIGA', dos: 'MS-DOS', doom: 'DOOM', pce: 'PC ENGINE',
};
const SYSTEM_SUMMARIES = {
  c64:'Computador doméstico · VICE', c128:'Computador doméstico · VICE', pet:'Computador clássico · VICE',
  plus4:'Computador doméstico · VICE', vic20:'Computador doméstico · VICE', amiga:'Computador 16-bit · PUAE · Kickstart',
  pcfx:'Console NEC · Mednafen', dos:'Jogos clássicos de PC', arcade:'Arcade · FinalBurn Neo', mame2003:'Arcade · MAME 2003 Plus / 2003',
  sg1000:'Console Sega 8-bit · Genesis Plus GX', segapico:'Console educativo · Genesis Plus GX · toque',
  supergrafx:'Console NEC · núcleo Mednafen PCE', pcenginecd:'Console de CD · Mednafen PCE · BIOS', neogeo:'Arcade/console SNK · FinalBurn Neo',
  atari8:'Computador 8-bit · Atari 400/800', zxspectrum:'Computador doméstico · Fuse',
  amstradcpc:'Computador doméstico · Caprice32', doom:'FPS clássico · PrBoom · WAD',
};
const SYSTEM_DESCRIPTIONS = {
  megadrive:'Console de 16 bits da Sega, conhecido como Genesis na América do Norte. A biblioteca aceita cartuchos em formatos como .md e .gen.',
  segacd:'Acessório de CD do Mega Drive, lançado como Mega-CD em algumas regiões. Jogos costumam vir em imagens de disco e podem exigir BIOS.',
  '32x':'Acessório que amplia o Mega Drive com hardware de 32 bits. Use arquivos próprios de jogos 32X; a compatibilidade depende do título.',
  saturn:'Console de CD da Sega com arquitetura complexa e jogos 2D e 3D. Alguns títulos precisam da BIOS do Saturn.',
  mastersystem:'Console doméstico de 8 bits da Sega. Aceita jogos em formatos como .sms; a BIOS pode ser opcional.',
  gamegear:'Console portátil colorido da Sega, com jogos relacionados ao Master System. Alguns títulos podem usar BIOS opcional.',
  dreamcast:'Console de 128 bits da Sega, com mídia GD-ROM. Os arquivos de jogo podem ser grandes e o núcleo requer isolamento do navegador.',
  nes:'Nintendo Entertainment System e Famicom, consoles de 8 bits com cartuchos. Arquivos .nes e alguns formatos de disco são compatíveis.',
  snes:'Super Nintendo, console de 16 bits da Nintendo. Compatível com arquivos .sfc e .smc.',
  gb:'Game Boy original, portátil monocromático da Nintendo. BIOS é opcional para a maioria dos jogos.',
  gbc:'Game Boy Color, versão colorida e retrocompatível da linha Game Boy. Aceita jogos .gbc e também cartuchos originais .gb.',
  gba:'Game Boy Advance, portátil de 32 bits da Nintendo. Jogos normalmente usam arquivos .gba; BIOS pode ser opcional.',
  nds:'Nintendo DS, portátil com duas telas e toque. O núcleo configurado pode exigir três arquivos de sistema nas Configurações.',
  n64:'Nintendo 64, console de cartuchos com gráficos 3D. O desempenho varia bastante entre jogos e aparelhos.',
  ps1:'PlayStation original, console de CD da Sony. Uma BIOS compatível é necessária para iniciar jogos neste núcleo.',
  ps2:'PlayStation 2. Este catálogo oferece um atalho para um player externo; o núcleo não está integrado ao APK.',
  psp:'PlayStation Portable, portátil da Sony com jogos em UMD e downloads. Jogos em disco podem exigir bastante memória e processamento.',
  psvita:'PlayStation Vita. O atalho abre a página do Vita3K, um aplicativo externo e independente deste emulador.',
  atari2600:'Atari 2600, console doméstico pioneiro de cartuchos. Os jogos são pequenos e usam formatos como .a26.',
  atari5200:'Atari 5200, console doméstico de cartuchos da Atari. Alguns jogos precisam de configurações de controle específicas.',
  atari7800:'Atari 7800, console retrocompatível com parte da biblioteca do 2600. BIOS pode melhorar a compatibilidade.',
  jaguar:'Atari Jaguar, console de cartuchos e CD da Atari. Compatibilidade e desempenho podem variar entre jogos.',
  lynx:'Atari Lynx, portátil colorido da Atari. Alguns títulos podem exigir o arquivo de sistema lynxboot.img.',
  vb:'Virtual Boy, portátil 3D estereoscópico da Nintendo. A apresentação original usa tons de vermelho e preto.',
  '3do':'3DO Interactive Multiplayer, console de CD lançado por diferentes fabricantes. Precisa de BIOS compatível.',
  coleco:'ColecoVision, console doméstico de cartuchos dos anos 1980. Requer BIOS do sistema para carregar jogos.',
  pce:'PC Engine, também vendido como TurboGrafx-16. Console de cartuchos da NEC e Hudson; alguns jogos usam CD.',
  ngp:'Neo Geo Pocket, portátil da SNK. O catálogo inclui jogos de luta e ação feitos para a tela monocromática ou colorida.',
  ws:'WonderSwan, portátil da Bandai lançado principalmente no Japão. WonderSwan Color também é compatível com o núcleo.',
  arcade:'Arcade via FinalBurn Neo. Cada jogo normalmente é um pacote próprio e deve corresponder à versão compatível do núcleo.',
  mame2003:'Arcade via MAME 2003. Use pacotes de jogos compatíveis com esta versão do MAME; arquivos de outras versões podem falhar.',
  dos:'PC MS-DOS pelo DOSBox Pure. Jogos costumam vir em pacotes .zip ou .7z e podem precisar do teclado virtual.',
  c64:'Commodore 64, computador doméstico de 8 bits muito popular. O núcleo VICE aceita imagens de disco, fita, cartucho e programas; use o teclado virtual para digitar.',
  c128:'Commodore 128, computador doméstico compatível com o C64 e com modos próprios. O núcleo VICE suporta mídia em vários formatos e oferece teclado virtual.',
  pet:'Commodore PET, uma família de computadores pessoais e educacionais. O teclado virtual ajuda a usar programas e jogos de texto.',
  plus4:'Commodore Plus/4, computador doméstico da família 264. A biblioteca usa programas, fitas e imagens de disco compatíveis com teclado virtual.',
  vic20:'Commodore VIC-20, computador doméstico de 8 bits anterior ao C64. O núcleo VICE suporta programas e mídia do sistema; há teclado virtual.',
  amiga:'Commodore Amiga, família de computadores de 16/32 bits conhecida por jogos, música e gráficos. Jogos em disco podem exigir Kickstart; há teclado virtual.',
  pcfx:'PC-FX, console de CD da NEC lançado no Japão. O núcleo Mednafen pode exigir um arquivo BIOS compatível.',
  sg1000:'Console doméstico Sega de 8 bits. Usa o núcleo Genesis Plus GX, que reconhece cartuchos SG-1000 em formatos como .sg.',
  segapico:'Console educativo da Sega com livros interativos e entrada por apontamento. Usa emulação experimental do Genesis Plus GX; alguns jogos precisam de toque ou mouse.',
  supergrafx:'Console NEC retrocompatível com a PC Engine. O núcleo Mednafen PCE reconhece jogos SuperGrafx; os arquivos costumam usar .sgx.',
  pcenginecd:'Sistema de CD da PC Engine e TurboGrafx-16. Use imagens CUE/CHD compatíveis e uma BIOS de CD própria nas configurações.',
  neogeo:'Neo Geo AES/MVS pelo núcleo arcade FinalBurn Neo. O pacote do jogo precisa corresponder ao núcleo; alguns jogos dependem do conjunto de BIOS Neo Geo.',
  atari8:'Família de computadores Atari 400, 800, XL e XE. Aceita imagens de disco e fita e executáveis desses computadores.',
  zxspectrum:'Computador doméstico da Sinclair, famoso por jogos em fita. Os jogos podem exigir teclado; use o teclado virtual nesta tela.',
  amstradcpc:'Computador doméstico da Amstrad, com jogos em fita, disco e cartucho. O teclado virtual ajuda em comandos e jogos de texto.',
  doom:'Núcleo PrBoom para jogos compatíveis com Doom. O pacote do jogo (WAD) deve ser fornecido por você; nenhum conteúdo comercial acompanha o app.',
};

function readSettings() {
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

let settings = readSettings();
let selectedSystem = localStorage.getItem(SYSTEM_KEY) in SYSTEMS ? localStorage.getItem(SYSTEM_KEY) : 'megadrive';
let currentBiosUrls = [];
let currentSidecarUrls = [];
let dbPromise;
let currentObjectUrl = null;
let currentRecordId = null;
let currentLaunch = 0;
let lastLaunchRequest = null;
let toastTimer = null;
let wakeLock = null;
let nativeImmersive = false;
let libraryFilter = 'all';
let gameRunning = false;
let dragDepth = 0;
let chromeTimer = null;
let startupAudioContext = null;
let keyboardOpen = false;
const heldVirtualKeys = new Set();
const recentAppErrors = [];

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3800);
}

function rememberAppError(message) {
  const text = String(message || 'Erro sem descrição').replace(/\s+/g, ' ').slice(0, 220);
  recentAppErrors.push(`${new Date().toLocaleTimeString('pt-BR')} · ${text}`);
  if (recentAppErrors.length > 12) recentAppErrors.shift();
}
window.addEventListener('error', (event) => rememberAppError(event.message));
window.addEventListener('unhandledrejection', (event) => rememberAppError(event.reason?.message || event.reason));

function fileExtension(file) { return file.name.split('.').pop().toLowerCase(); }
function supportsGame(file) { return SUPPORTED_EXTENSIONS.includes(fileExtension(file)); }
function supportsSystemGame(file, systemId) {
  const ext = fileExtension(file);
  return Boolean(SYSTEMS[systemId] && (SYSTEMS[systemId].extensions.includes(ext) || ext === 'zip'));
}
function systemForFile(file, preferred = selectedSystem) {
  const ext = fileExtension(file);
  if (ext === 'sg') return 'sg1000';
  if (['68k','sgd'].includes(ext)) return 'segapico';
  if (ext === 'sgx') return 'supergrafx';
  if (['md','gen','smd'].includes(ext)) return 'megadrive';
  if (ext === '32x') return '32x';
  if (['cdi','gdi'].includes(ext)) return 'dreamcast';
  if (ext === 'sms') return 'mastersystem';
  if (ext === 'gg') return 'gamegear';
  if (ext === 'gbc') return 'gbc';
  if (ext === 'gb') return 'gb';
  if (ext === 'gba') return 'gba';
  if (['nes','unf','unif','fds'].includes(ext)) return 'nes';
  if (['sfc','smc','fig','swc'].includes(ext)) return 'snes';
  if (['nds','dsi'].includes(ext)) return 'nds';
  if (['a26'].includes(ext)) return 'atari2600';
  if (['a52'].includes(ext)) return 'atari5200';
  if (['a78'].includes(ext)) return 'atari7800';
  if (['lnx','lyx'].includes(ext)) return 'lynx';
  if (['vb','vboy'].includes(ext)) return 'vb';
  if (['col','cv'].includes(ext)) return 'coleco';
  if (['pce','sgx'].includes(ext)) return 'pce';
  if (['ngp','ngc'].includes(ext)) return 'ngp';
  if (['ws','wsc'].includes(ext)) return 'ws';
  if (['j64','jag'].includes(ext)) return 'jaguar';
  if (['z64','n64','v64'].includes(ext)) return 'n64';
  if (['adf','adz','dms','ipf','lha'].includes(ext)) return 'amiga';
  if (['atr','atx','xex','xfd','dcm','cas'].includes(ext)) return 'atari8';
  if (ext === 'sna' && SYSTEMS[preferred]?.core === 'cap32') return 'amstradcpc';
  if (['z80','tzx','pzx','udi','trd'].includes(ext)) return 'zxspectrum';
  if (['cdt','cpr','voc'].includes(ext)) return 'amstradcpc';
  if (ext === 'wad') return 'doom';
  if (ext === 'dsk' && SYSTEMS[preferred]?.core === 'cap32') return 'amstradcpc';
  if (ext === 'dsk' && SYSTEMS[preferred]?.core === 'fuse') return 'zxspectrum';
  if (['zip','7z'].includes(ext) && SYSTEMS[preferred]) return preferred;
  if (['bin','rom','iso','chd','cue'].includes(ext) && SYSTEMS[preferred]) return preferred;
  if (SYSTEMS[preferred]?.extensions.includes(ext)) return preferred;
  const matchingSystem = Object.entries(SYSTEMS).find(([, system]) => system.extensions.includes(ext));
  if (matchingSystem) return matchingSystem[0];
  return SYSTEMS[preferred] ? preferred : 'megadrive';
}

function selectSystem(systemId) {
  if (!SYSTEMS[systemId]) return;
  selectedSystem = systemId;
  try { localStorage.setItem(SYSTEM_KEY, systemId); } catch { /* Selection still applies for this session. */ }
  systemSelect.value = systemId;
  updateSystemActions();
}

function playStartupSound() {
  if (!settings.startupSound) return;
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    startupAudioContext ||= new AudioContextClass();
    const context = startupAudioContext;
    context.resume().catch(() => {});
    const now = context.currentTime + .025;
    const oscillator = context.createOscillator();
    const envelope = context.createGain();
    const lowPass = context.createBiquadFilter();
    lowPass.type = 'lowpass';
    lowPass.frequency.setValueAtTime(1800, now);
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(440, now);
    oscillator.frequency.setValueAtTime(587.33, now + .105);
    oscillator.frequency.setValueAtTime(783.99, now + .21);
    const peak = .09 * (settings.volume / 100);
    envelope.gain.setValueAtTime(.0001, now);
    envelope.gain.linearRampToValueAtTime(peak, now + .015);
    envelope.gain.setValueAtTime(peak, now + .21);
    envelope.gain.exponentialRampToValueAtTime(.0001, now + .34);
    oscillator.connect(lowPass).connect(envelope).connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + .35);
    oscillator.addEventListener('ended', () => { oscillator.disconnect(); lowPass.disconnect(); envelope.disconnect(); }, { once: true });
  } catch { /* Audio is optional; game loading continues when Web Audio is unavailable. */ }
}
function gameId(file, systemId = systemForFile(file), sidecars = []) {
  const extra = sidecars.map(({ file: item, virtualName }) => `${virtualName.toLocaleLowerCase()}|${item.size}|${item.lastModified || 0}`).sort().join(';');
  return `${systemId}|${file.name.trim().toLocaleLowerCase()}|${file.size}|${file.lastModified || 0}|${extra}`;
}

function emulatorGameId(file, systemId = systemForFile(file)) {
  const source = gameId(file, systemId);
  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) hash = Math.imul(hash ^ source.charCodeAt(index), 16777619);
  return ((hash >>> 0) & 0x7fffffff) || 1;
}

function openDatabase() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('O armazenamento local não está disponível neste navegador.'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains('games')) database.createObjectStore('games', { keyPath: 'id' });
      if (!database.objectStoreNames.contains('bios')) database.createObjectStore('bios');
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Não foi possível abrir a biblioteca.'));
  });
  return dbPromise;
}

async function dbRequest(mode, method, ...args) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction('games', mode);
    const request = transaction.objectStore('games')[method](...args);
    let result;
    request.onsuccess = () => { result = request.result; };
    request.onerror = () => reject(request.error || new Error('Não foi possível acessar a biblioteca.'));
    transaction.oncomplete = () => resolve(result);
    transaction.onerror = () => reject(transaction.error || new Error('Não foi possível salvar a biblioteca.'));
    transaction.onabort = () => reject(transaction.error || new Error('O armazenamento foi interrompido.'));
  });
}

function selectPrimaryRom(files) {
  const items = Array.from(files || []).filter(supportsGame);
  if (!items.length) return null;
  const priority = { m3u: 0, cue: 1, gdi: 2, ccd: 3, chd: 4, cdi: 5, iso: 6, zip: 7, '7z': 8 };
  return items.sort((a, b) => (priority[fileExtension(a)] ?? 20) - (priority[fileExtension(b)] ?? 20))[0];
}

function safeDiscPath(value) {
  const path = String(value || '').trim().replace(/^['"]|['"]$/g, '').replace(/\\/g, '/');
  const parts = path.split('/').filter((part) => part && part !== '.');
  if (!parts.length || parts.includes('..') || parts.some((part) => /[\0\r\n]/.test(part))) return '';
  return parts.join('/');
}

async function discAssetReferences(file, depth = 0) {
  if (depth > 5) return [];
  const ext = fileExtension(file);
  if (ext === 'cue') {
    const text = await file.text();
    return [...text.matchAll(/^\s*FILE\s+(?:"([^"]+)"|'([^']+)'|([^\s]+))/gim)]
      .map((match) => safeDiscPath(match[1] || match[2] || match[3])).filter(Boolean);
  }
  if (ext === 'gdi') {
    const lines = (await file.text()).split(/\r?\n/).slice(1);
    return lines.map((line) => {
      const match = line.match(/^\s*\d+\s+\d+\s+\d+\s+\d+\s+(?:"([^"]+)"|(.+?))\s+\d+\s*$/);
      return safeDiscPath(match?.[1] || match?.[2]);
    }).filter(Boolean);
  }
  if (ext === 'm3u') {
    const text = await file.text();
    return text.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith('#')).map(safeDiscPath).filter(Boolean);
  }
  if (ext === 'ccd') {
    const stem = file.name.replace(/\.ccd$/i, '');
    return [`${stem}.img`, `${stem}.sub`];
  }
  return [];
}

async function resolveDiscBundle(primary, files, visited = new Set()) {
  const selected = Array.from(files || []);
  const sidecars = [];
  const missing = [];
  const visit = async (descriptor, isPrimary = false, depth = 0) => {
    if (depth > 5) return;
    const refs = await discAssetReferences(descriptor, depth);
    for (const virtualName of refs) {
      const key = virtualName.toLocaleLowerCase();
      if (visited.has(key)) continue;
      visited.add(key);
      const actualName = virtualName.split('/').pop().toLocaleLowerCase();
      const match = selected.find((candidate) => candidate !== primary && candidate.name.toLocaleLowerCase() === actualName)
        || selected.find((candidate) => candidate !== primary && candidate.name.toLocaleLowerCase() === virtualName.toLocaleLowerCase());
      if (!match) {
        if (!(fileExtension(descriptor) === 'ccd' && virtualName.toLocaleLowerCase().endsWith('.sub'))) missing.push(virtualName);
        continue;
      }
      if (fileExtension(match) === 'cue' || fileExtension(match) === 'gdi' || fileExtension(match) === 'm3u' || fileExtension(match) === 'ccd') {
        sidecars.push({ file: match, virtualName });
        await visit(match, false, depth + 1);
      } else sidecars.push({ file: match, virtualName });
    }
  };
  if (['cue','gdi','m3u','ccd'].includes(fileExtension(primary))) await visit(primary, true);
  return { sidecars, missing };
}

async function saveGameFile(file, systemId = systemForFile(file), sidecars = []) {
  const id = gameId(file, systemId, sidecars);
  const existing = await dbRequest('readonly', 'get', id);
  const record = {
    id,
    name: file.name,
    size: file.size + sidecars.reduce((total, sidecar) => total + sidecar.file.size, 0),
    lastModified: file.lastModified || Date.now(),
    format: file.name.split('.').pop().toUpperCase(),
    rom: file,
    sidecars: sidecars.map(({ file: item, virtualName }) => ({ name: item.name, virtualName, rom: item, type: item.type, lastModified: item.lastModified || 0, size: item.size })),
    systemId,
    favorite: Boolean(existing?.favorite),
    addedAt: existing?.addedAt || Date.now(),
    lastPlayed: existing?.lastPlayed || 0,
    playCount: existing?.playCount || 0,
  };
  await dbRequest('readwrite', 'put', record);
  navigator.storage?.persist?.().catch?.(() => {});
  return record;
}

async function biosRequest(mode, method, ...args) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const tx = database.transaction('bios', mode);
    const request = tx.objectStore('bios')[method](...args);
    let result; request.onsuccess = () => { result = request.result; };
    request.onerror = () => reject(request.error || new Error('BIOS storage failed'));
    tx.oncomplete = () => resolve(result); tx.onerror = () => reject(tx.error);
  });
}

function prettySize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(bytes >= 10 * 1024 * 1024 ? 0 : 1)} MB`;
}

function prettyDate(timestamp) {
  if (!timestamp) return 'AINDA NÃO JOGADO';
  const today = new Date();
  const date = new Date(timestamp);
  if (date.toDateString() === today.toDateString()) return 'JOGADO HOJE';
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '').toUpperCase();
}

const ZIP_CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let index = 0; index < table.length; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) value = (value & 1) ? (0xedb88320 ^ (value >>> 1)) : (value >>> 1);
    table[index] = value >>> 0;
  }
  return table;
})();

async function crc32Blob(blob) {
  let crc = 0xffffffff;
  const consume = (bytes) => {
    for (const byte of bytes) crc = ZIP_CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  };
  if (blob.stream) {
    const reader = blob.stream().getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      consume(value);
    }
  } else consume(new Uint8Array(await blob.arrayBuffer()));
  return (crc ^ 0xffffffff) >>> 0;
}

function zipRecordHeader(signature, fixedLength, filenameBytes, configure) {
  const header = new Uint8Array(fixedLength + filenameBytes.length);
  const view = new DataView(header.buffer);
  view.setUint32(0, signature, true);
  view.setUint16(6, 0x0800, true);
  view.setUint16(8, 0, true);
  view.setUint16(10, 0, true);
  view.setUint16(12, 0x21, true);
  configure(view, filenameBytes.length);
  header.set(filenameBytes, fixedLength);
  return header;
}

function zipDirectoryHeader(filenameBytes, crc, size, localOffset) {
  const header = new Uint8Array(46 + filenameBytes.length);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x02014b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(6, 20, true);
  view.setUint16(8, 0x0800, true);
  view.setUint16(10, 0, true);
  view.setUint16(12, 0, true);
  view.setUint16(14, 0x21, true);
  view.setUint32(16, crc, true);
  view.setUint32(20, size, true);
  view.setUint32(24, size, true);
  view.setUint16(28, filenameBytes.length, true);
  view.setUint16(30, 0, true);
  view.setUint16(32, 0, true);
  view.setUint16(34, 0, true);
  view.setUint16(36, 0, true);
  view.setUint32(38, 0, true);
  view.setUint32(42, localOffset, true);
  header.set(filenameBytes, 46);
  return header;
}

async function buildStoredZip(entries) {
  const output = [];
  const directory = [];
  let localOffset = 0;
  for (const entry of entries) {
    const name = safeDiscPath(entry.name);
    const blob = entry.blob;
    if (!name || !(blob instanceof Blob) || blob.size > 0xffffffff) throw new Error('Arquivo inválido ou maior que 4 GB.');
    const filenameBytes = new TextEncoder().encode(name);
    if (filenameBytes.length > 0xffff || directory.length >= 0xffff) throw new Error('O pacote tem arquivos demais para ZIP clássico.');
    const crc = await crc32Blob(blob);
    const localHeader = zipRecordHeader(0x04034b50, 30, filenameBytes, (view, nameLength) => {
      view.setUint16(4, 20, true);
      view.setUint32(14, crc, true);
      view.setUint32(18, blob.size, true);
      view.setUint32(22, blob.size, true);
      view.setUint16(26, nameLength, true);
      view.setUint16(28, 0, true);
    });
    const directoryHeader = zipDirectoryHeader(filenameBytes, crc, blob.size, localOffset);
    output.push(localHeader, blob);
    directory.push(directoryHeader);
    localOffset += localHeader.length + blob.size;
    if (localOffset > 0xffffffff) throw new Error('O pacote ultrapassa o limite do formato ZIP clássico.');
  }
  const directoryOffset = localOffset;
  const directorySize = directory.reduce((size, header) => size + header.length, 0);
  for (const header of directory) output.push(header);
  const end = new Uint8Array(22);
  const endView = new DataView(end.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(8, directory.length, true);
  endView.setUint16(10, directory.length, true);
  endView.setUint32(12, directorySize, true);
  endView.setUint32(16, directoryOffset, true);
  output.push(end);
  return new Blob(output, { type: 'application/zip' });
}

function displayTitle(name) {
  return name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim() || name;
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

async function renderLibrary() {
  let games;
  try {
    games = await dbRequest('readonly', 'getAll');
  } catch {
    games = [];
    showToast('A biblioteca local não está disponível. Você ainda pode abrir uma ROM diretamente.');
  }
  games.sort((a, b) => (b.lastPlayed || b.addedAt) - (a.lastPlayed || a.addedAt));

  const query = document.querySelector('#library-search').value.trim().toLocaleLowerCase();
  const requestedSystemFilter = document.querySelector('#library-system-filter').value;
  const favorites = games.filter((game) => game.favorite).length;
  document.querySelector('#library-count').textContent = String(games.length);
  document.querySelector('#favorite-count').textContent = String(favorites);
  document.querySelector('#all-count').textContent = String(games.length);
  document.querySelector('#filter-favorite-count').textContent = String(favorites);
  const systemFilterElement = document.querySelector('#library-system-filter');
  const knownSystems = [...new Set(games.map((game) => game.systemId || 'megadrive'))]
    .filter((id) => SYSTEMS[id]).sort((a, b) => SYSTEMS[a].name.localeCompare(SYSTEMS[b].name, 'pt-BR'));
  const previousFilter = systemFilterElement.value;
  systemFilterElement.replaceChildren(new Option('Todos os sistemas', 'all'));
  for (const id of knownSystems) systemFilterElement.append(new Option(SYSTEMS[id].name, id));
  systemFilterElement.value = knownSystems.includes(previousFilter) ? previousFilter : 'all';
  const systemFilter = knownSystems.includes(requestedSystemFilter) ? requestedSystemFilter : 'all';
  const mostRecent = games.find((game) => game.lastPlayed);
  document.querySelector('#recent-game-label').textContent = mostRecent ? displayTitle(mostRecent.name) : '—';

  let shown = games.filter((game) => {
    const matchesFilter = (libraryFilter !== 'favorites' || game.favorite)
      && (systemFilter === 'all' || (game.systemId || 'megadrive') === systemFilter);
    const matchesQuery = displayTitle(game.name).toLocaleLowerCase().includes(query)
      || game.format.toLocaleLowerCase().includes(query);
    return matchesFilter && matchesQuery;
  });
  const sort = document.querySelector('#library-sort').value;
  if (sort === 'name') shown.sort((a, b) => displayTitle(a.name).localeCompare(displayTitle(b.name), 'pt-BR'));
  else if (sort === 'played') shown.sort((a, b) => (b.playCount || 0) - (a.playCount || 0) || (b.lastPlayed || 0) - (a.lastPlayed || 0));
  else shown.sort((a, b) => (b.lastPlayed || b.addedAt) - (a.lastPlayed || a.addedAt));

  libraryList.replaceChildren();
  for (const game of shown) libraryList.append(makeGameCard(game));
  const noGames = games.length === 0;
  emptyLibrary.hidden = !noGames;
  libraryList.hidden = noGames || shown.length === 0;
  noResults.hidden = noGames || shown.length > 0;
}

function makeGameCard(game) {
  let hash = 0;
  for (const char of game.name) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  const card = makeElement('article', 'game-card');
  const cover = makeElement('div', 'game-cover');
  cover.style.setProperty('--cover-bg', COVER_BACKGROUNDS[Math.abs(hash) % COVER_BACKGROUNDS.length]);
  const mark = makeElement('div', 'cover-mark', '▶');
  const gameSystem = SYSTEMS[game.systemId || 'megadrive'] || SYSTEMS.megadrive;
  mark.append(makeElement('span', '', `${gameSystem.name.toUpperCase()} / ${CURRENT_VERSION}`));
  cover.append(mark);
  const favorite = makeElement('button', `game-favorite${game.favorite ? ' is-favorite' : ''}`, game.favorite ? '♥' : '♡');
  favorite.type = 'button';
  favorite.setAttribute('aria-label', game.favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
  favorite.addEventListener('click', async () => {
    game.favorite = !game.favorite;
    await dbRequest('readwrite', 'put', game);
    await renderLibrary();
  });
  cover.append(favorite, makeElement('span', 'game-format', game.format));

  const info = makeElement('div', 'game-info');
  info.append(makeElement('h3', 'game-name', displayTitle(game.name)));
  const meta = makeElement('div', 'game-meta');
  meta.append(makeElement('span', '', gameSystem.name), makeElement('span', '', prettySize(game.size)), makeElement('span', '', game.playCount ? `${game.playCount} PARTIDAS` : prettyDate(game.lastPlayed)));
  const actions = makeElement('div', 'game-actions');
  const play = makeElement('button', 'game-play', '▶  JOGAR');
  play.type = 'button';
  play.addEventListener('click', () => {
    if (gameSystem.kind !== 'external') playStartupSound();
    playFromLibrary(game.id, gameSystem.kind !== 'external');
  });
  const remove = makeElement('button', 'game-remove', '×');
  remove.type = 'button';
  remove.title = 'Remover da biblioteca';
  remove.setAttribute('aria-label', `Remover ${displayTitle(game.name)} da biblioteca`);
  remove.addEventListener('click', async () => {
    if (!window.confirm(`Remover “${displayTitle(game.name)}” da biblioteca?`)) return;
    await dbRequest('readwrite', 'delete', game.id);
    await renderLibrary();
    showToast('Jogo removido da biblioteca.');
  });
  const exportRom = makeElement('button', 'game-export', '↓');
  exportRom.type = 'button';
  exportRom.title = 'Exportar arquivo do jogo';
  exportRom.setAttribute('aria-label', `Exportar ${displayTitle(game.name)}`);
  exportRom.addEventListener('click', async () => {
    if (!(game.rom instanceof Blob)) { showToast('O arquivo deste jogo não está disponível para exportação.'); return; }
    const sidecars = game.sidecars || [];
    let exportBlob = game.rom;
    let downloadName = game.name.replace(/[\\/:*?"<>|]/g, '_');
    if (sidecars.length) {
      showToast('Montando um ZIP com o disco e seus arquivos de faixa…');
      try {
        exportBlob = await buildStoredZip([
          { name: game.name, blob: game.rom },
          ...sidecars.map((item) => ({ name: item.virtualName || item.name, blob: item.rom })),
        ]);
        downloadName = `${displayTitle(game.name).replace(/[\\/:*?"<>|]/g, '_')}.zip`;
      } catch (error) {
        showToast(`Não foi possível montar o ZIP: ${error.message}`);
        return;
      }
    }
    const url = URL.createObjectURL(exportBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = downloadName;
    link.hidden = true;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
  });
  actions.append(play, exportRom, remove);
  info.append(meta, actions);
  card.append(cover, info);
  return card;
}

function applyLiveSettings() {
  document.documentElement.dataset.theme = settings.theme;
  document.documentElement.dataset.performance = settings.performance;
  document.documentElement.classList.toggle('reduce-motion', settings.reducedMotion);
  playerScreen.classList.toggle('is-wide', settings.aspect === 'wide');
  playerScreen.classList.toggle('has-crt', settings.filter === 'crt');
}

function populateSettingsForm() {
  document.querySelector('#setting-theme').value = settings.theme;
  document.querySelector('#setting-aspect').value = settings.aspect;
  document.querySelector('#setting-filter').value = settings.filter;
  document.querySelector('#setting-performance').value = settings.performance;
  document.querySelector('#setting-reduced-motion').checked = settings.reducedMotion;
  document.querySelector('#setting-controls').checked = settings.touchControls;
  document.querySelector('#setting-layout').value = settings.layout;
  document.querySelector('#setting-pad-style').value = settings.padStyle;
  document.querySelector('#setting-pad-opacity').value = settings.padOpacity;
  document.querySelector('#setting-pad-scale').value = settings.padScale;
  document.querySelector('#pad-opacity-value').textContent = `${settings.padOpacity}%`;
  document.querySelector('#pad-scale-value').textContent = `${settings.padScale}%`;
  document.querySelector('#setting-haptics').checked = settings.haptics;
  document.querySelector('#setting-wake').checked = settings.keepAwake;
  document.querySelector('#setting-startup-sound').checked = settings.startupSound;
  volumeInput.value = settings.volume;
  volumeValue.value = `${settings.volume}%`;
  volumeValue.textContent = `${settings.volume}%`;
}

function getSettingsFromForm() {
  return {
    theme: document.querySelector('#setting-theme').value,
    aspect: document.querySelector('#setting-aspect').value,
    filter: document.querySelector('#setting-filter').value,
    performance: document.querySelector('#setting-performance').value,
    reducedMotion: document.querySelector('#setting-reduced-motion').checked,
    touchControls: document.querySelector('#setting-controls').checked,
    layout: document.querySelector('#setting-layout').value,
    padStyle: document.querySelector('#setting-pad-style').value,
    padOpacity: Math.min(100, Math.max(35, Number(document.querySelector('#setting-pad-opacity').value))),
    padScale: Math.min(130, Math.max(75, Number(document.querySelector('#setting-pad-scale').value))),
    volume: Number(volumeInput.value),
    haptics: document.querySelector('#setting-haptics').checked,
    keepAwake: document.querySelector('#setting-wake').checked,
    startupSound: document.querySelector('#setting-startup-sound').checked,
    devMode: Boolean(settings.devMode),
  };
}

function virtualGamepadSettings(systemId = selectedSystem) {
  if (!settings.touchControls) return [];
  if (systemId === 'segapico') return [];
  const sega = ['megadrive','segacd','32x'].includes(systemId);
  const faceProfiles = {
    nes: [['B',0],['A',8]], gb: [['B',0],['A',8]], gbc: [['B',0],['A',8]],
    mastersystem: [['1',0],['2',8]], gamegear: [['1',0],['2',8]], sg1000: [['1',0],['2',8]],
    atari2600: [['B',0],['A',8]], atari5200: [['B',0],['A',8]], atari7800: [['B',0],['A',8]],
    lynx: [['B',0],['A',8]], coleco: [['1',0],['2',8]],
    snes: [['B',0],['A',8],['Y',1],['X',9],['L',10],['R',11]],
    gba: [['B',0],['A',8],['Y',1],['X',9],['L',10],['R',11]],
    nds: [['B',0],['A',8],['Y',1],['X',9],['L',10],['R',11]],
    ps1: [['○',0],['×',8],['△',1],['□',9],['L1',10],['R1',11]],
    psp: [['○',0],['×',8],['△',1],['□',9],['L',10],['R',11]],
    saturn: [['B',0],['A',8],['Y',1],['X',9],['L',10],['R',11]],
    dreamcast: [['B',0],['A',8],['Y',1],['X',9],['L',10],['R',11]],
    n64: [['A',8],['B',0],['C↑',1],['C←',9],['L',10],['R',11]],
    arcade: [['A',8],['B',0],['C',10],['D',9],['E',1],['F',11]],
    mame2003: [['A',8],['B',0],['C',10],['D',9],['E',1],['F',11]],
    neogeo: [['A',8],['B',0],['C',10],['D',9],['E',1],['F',11]],
  };
  const extendedProfiles = {
    snes: [['Y',1],['X',9],['L',10],['B',0],['A',8],['R',11]],
    gba: [['Y',1],['X',9],['L',10],['B',0],['A',8],['R',11]],
    nds: [['Y',1],['X',9],['L',10],['B',0],['A',8],['R',11]],
    ps1: [['L1',10],['△',1],['R1',11],['□',9],['×',8],['○',0]],
    psp: [['L',10],['△',1],['R',11],['□',9],['×',8],['○',0]],
    saturn: [['L',10],['Y',1],['X',9],['B',0],['A',8],['R',11]],
    dreamcast: [['L',10],['Y',1],['X',9],['B',0],['A',8],['R',11]],
    n64: [['L',10],['C↑',1],['R',11],['B',0],['A',8],['C←',9]],
  };
  const segaFaces = settings.layout === 'six'
    ? [['X',9],['Y',1],['Z',11],['A',8],['B',0],['C',10]]
    : [['A',8],['B',0],['C',10]];
  let faces = sega ? segaFaces : settings.layout === 'six'
    ? (extendedProfiles[systemId] || faceProfiles[systemId] || [['Y',1],['X',9],['B',0],['A',8],['L',10],['R',11]])
    : (faceProfiles[systemId] || [['B',0],['A',8]]).slice(0, 2);
  if (settings.layout !== 'six' && ['arcade','mame2003','neogeo'].includes(systemId)) faces = faceProfiles[systemId].slice(0, 4);
  if (systemId === 'segapico') faces = [];
  const controls = [settings.padStyle === 'analog'
    ? { type: 'zone', location: 'left', left: '50%', right: '50%', joystickInput: true, inputValues: [19,18,17,16], color: 'red' }
    : { type: 'dpad', location: 'left', left: '50%', right: '50%', joystickInput: false, inputValues: [4,5,6,7] }];
  const positions = faces.length <= 2
    ? [[24,25],[74,25]]
    : faces.length === 4
      ? [[0,0],[48,0],[0,49],[48,49]]
    : faces.length === 3
      ? [[0,24],[48,0],[96,24]]
      : [[0,0],[48,0],[96,0],[0,49],[48,49],[96,49]];
  faces.forEach(([label, inputValue], index) => {
    const [left, top] = positions[index];
    controls.push({ type: 'button', text: label, id: `sixbit-face-${index}`, location: 'right', left, top, bold: true, input_value: inputValue });
  });
  if (systemId !== 'segapico') controls.push(
    { type: 'button', text: sega ? 'MODE' : 'SELECT', id: 'sixbit-select', location: 'center', left: -39, fontSize: 10, block: true, input_value: 2 },
    { type: 'button', text: 'START', id: 'sixbit-start', location: 'center', left: 32, fontSize: 10, block: true, input_value: 3 },
  );
  return controls;
}

function applySystemSkin() {
  const system = SYSTEMS[selectedSystem] || SYSTEMS.megadrive;
  const family = SYSTEM_FAMILIES[selectedSystem] || 'Outros';
  const skin = FAMILY_SKINS[family] || FAMILY_SKINS.Outros;
  const heroArt = document.querySelector('#hero-art');
  document.body.dataset.system = selectedSystem;
  document.body.dataset.systemFamily = family.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  heroArt.style.setProperty('--console-accent', skin.accent);
  heroArt.style.setProperty('--console-accent-rgb', skin.rgb);
  heroArt.style.setProperty('--console-deep', skin.deep);
  playerView.style.setProperty('--console-accent', skin.accent);
  playerView.style.setProperty('--console-accent-rgb', skin.rgb);
  document.querySelector('#hero-art-family').textContent = family.toUpperCase();
  document.querySelector('#hero-art-system').textContent = SYSTEM_MARKS[selectedSystem] || system.name.toUpperCase();
  document.querySelector('#hero-art-core').textContent = system.kind === 'external' ? 'PLAYER EXTERNO' : `NÚCLEO ${system.core.toUpperCase()}`;
  document.querySelector('#hero-art-caption').textContent = SYSTEM_SUMMARIES[selectedSystem] || (system.keyboard ? 'TECLADO VIRTUAL DISPONÍVEL' : 'CONTROLES ADAPTADOS');
}

const VIRTUAL_KEY_ROWS = [
  [...'1234567890'].map((key) => [key, key, `Digit${key}`, key === '0' ? 48 : key.charCodeAt(0)]),
  [...'qwertyuiop'].map((key) => [key, key, `Key${key.toUpperCase()}`, key.toUpperCase().charCodeAt(0)]),
  [...'asdfghjkl'].map((key) => [key, key, `Key${key.toUpperCase()}`, key.toUpperCase().charCodeAt(0)]),
  [['SHIFT','Shift','ShiftLeft',16,'wide'], ...[...'zxcvbnm'].map((key) => [key, key, `Key${key.toUpperCase()}`, key.toUpperCase().charCodeAt(0)]), ['⌫','Backspace','Backspace',8,'wide']],
  [
    ['CTRL','Control','ControlLeft',17,'wide'], ['ALT','Alt','AltLeft',18,'wide'],
    ['ESC','Escape','Escape',27,'wide'], ['↑','ArrowUp','ArrowUp',38], ['↓','ArrowDown','ArrowDown',40],
    ['←','ArrowLeft','ArrowLeft',37], ['→','ArrowRight','ArrowRight',39], ['ESPAÇO',' ','Space',32,'space'],
    ['ENTER','Enter','Enter',13,'wide'],
  ],
];

function renderVirtualKeyboard() {
  virtualKeyboardRows.replaceChildren(...VIRTUAL_KEY_ROWS.map((row) => {
    const rowElement = document.createElement('div');
    rowElement.className = 'virtual-keyboard-row';
    for (const [label, key, code, keyCode, width = ''] of row) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `virtual-key${width ? ` is-${width}` : ''}`;
      button.textContent = label;
      button.dataset.key = key;
      button.dataset.code = code;
      button.dataset.keyCode = String(keyCode);
      button.setAttribute('aria-label', label === '⌫' ? 'Backspace' : label);
      rowElement.append(button);
    }
    return rowElement;
  }));
}

function dispatchVirtualKey(button, type) {
  const code = button.dataset.code;
  if (type === 'keydown') heldVirtualKeys.add(code);
  else heldVirtualKeys.delete(code);
  const frameWindow = mount.querySelector('iframe')?.contentWindow;
  const target = frameWindow?.document;
  if (!frameWindow || !target) return;
  const event = new frameWindow.KeyboardEvent(type, {
    key: button.dataset.key,
    code,
    keyCode: Number(button.dataset.keyCode),
    which: Number(button.dataset.keyCode),
    bubbles: true,
    cancelable: true,
    shiftKey: heldVirtualKeys.has('ShiftLeft') || heldVirtualKeys.has('ShiftRight'),
    ctrlKey: heldVirtualKeys.has('ControlLeft') || heldVirtualKeys.has('ControlRight'),
    altKey: heldVirtualKeys.has('AltLeft') || heldVirtualKeys.has('AltRight'),
  });
  target.dispatchEvent(event);
}

function releaseVirtualKey(button) {
  if (button.dataset.pressed !== 'true') return;
  button.dataset.pressed = 'false';
  button.classList.remove('is-down');
  dispatchVirtualKey(button, 'keyup');
}

function setVirtualKeyboardOpen(open) {
  keyboardOpen = Boolean(open && SYSTEMS[selectedSystem]?.keyboard);
  virtualKeyboard.hidden = !keyboardOpen;
  playerView.classList.toggle('keyboard-open', keyboardOpen);
  virtualKeyboardToggle.setAttribute('aria-pressed', String(keyboardOpen));
  virtualKeyboardToggle.setAttribute('aria-label', keyboardOpen ? 'Fechar teclado virtual' : 'Abrir teclado virtual');
  if (!keyboardOpen) {
    for (const button of virtualKeyboardRows.querySelectorAll('[data-pressed="true"]')) releaseVirtualKey(button);
  } else showPlayerChrome(true);
}

renderVirtualKeyboard();
virtualKeyboardRows.addEventListener('pointerdown', (event) => {
  const button = event.target.closest('.virtual-key');
  if (!button) return;
  event.preventDefault();
  button.setPointerCapture?.(event.pointerId);
  button.dataset.pressed = 'true';
  button.classList.add('is-down');
  dispatchVirtualKey(button, 'keydown');
});
for (const type of ['pointerup','pointercancel','lostpointercapture']) {
  virtualKeyboardRows.addEventListener(type, (event) => {
    const button = event.target.closest?.('.virtual-key');
    if (button) releaseVirtualKey(button);
  });
}

function openExternalPlayer(url) {
  const nativeBrowser = window.Capacitor?.Plugins?.ExternalBrowser;
  if (nativeBrowser?.open) {
    nativeBrowser.open({ url }).catch(() => showToast('Não consegui abrir o link externo neste aparelho.'));
    return;
  }
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.setAttribute('aria-hidden', 'true');
  link.style.cssText = 'position:fixed;left:-10000px;top:0;width:1px;height:1px;';
  document.body.append(link);
  link.click();
  link.remove();
}

function openSelectedExternalSystem() {
  const system = SYSTEMS[selectedSystem];
  if (system?.kind !== 'external') return;
  openExternalPlayer(system.externalUrl);
  showToast(selectedSystem === 'psvita'
    ? 'Vita3K é um app externo. O site oficial tem a versão para Android e computador.'
    : 'O player de PS2 abre em outra página; selecione o jogo e a BIOS por lá.');
}

async function launchGame(file, record = null, soundAlreadyPlayed = false, selectedSidecars = []) {
  const systemId = record?.systemId || systemForFile(file);
  const system = SYSTEMS[systemId] || SYSTEMS.megadrive;
  if (!supportsSystemGame(file, systemId)) {
    showToast('Formato não reconhecido para o sistema selecionado.');
    return;
  }
  if (system.kind === 'external') {
    openExternalPlayer(system.externalUrl);
    showToast(systemId === 'psvita'
      ? 'Vita3K é um app externo. O site oficial tem a versão para Android e computador.'
      : 'O player de PS2 abre em outra página; selecione o jogo e a BIOS por lá.');
    return;
  }
  if ((system.threaded || system.requiresIsolation) && !window.crossOriginIsolated) {
    showToast(`${system.name} precisa de isolamento entre origens. Atualize a página depois que o app terminar de configurar o núcleo.`);
    return;
  }
  lastLaunchRequest = { file, record, selectedSidecars };
  document.querySelector('#player-retry').hidden = true;
  selectSystem(systemId);
  setVirtualKeyboardOpen(false);
  if (!soundAlreadyPlayed) playStartupSound();
  for (const url of currentBiosUrls) URL.revokeObjectURL(url);
  currentBiosUrls = [];
  for (const url of currentSidecarUrls) URL.revokeObjectURL(url);
  currentSidecarUrls = [];
  const biosKeys = system.biosKeys || (system.biosKey ? [system.biosKey] : (['segacd','saturn'].includes(systemId) ? [systemId] : []));
  const biosFiles = {};
  for (const key of biosKeys) {
    biosFiles[key] = await biosRequest('readonly', 'get', key).catch(() => null);
  }
  if (['ps1','segacd','saturn'].includes(systemId) && !biosFiles[biosKeys[0]]) {
    showToast(systemId === 'ps1'
      ? 'O PS1 precisa de uma BIOS compatível. Selecione-a nas configurações.'
      : `Para ${system.name}, selecione a BIOS nas configurações.`);
  }
  if (systemId === 'dreamcast' && (!biosFiles['dreamcast-boot'] || !biosFiles['dreamcast-flash'])) {
    showToast('Dreamcast funciona melhor com dc_boot.bin e dc_flash.bin salvos nas configurações.');
  }
  if (systemId === 'nds' && biosKeys.some((key) => !biosFiles[key])) {
    showToast('Nintendo DS com melonDS precisa de bios7.bin, bios9.bin e firmware.bin nas configurações.');
  }
  if (['3do','coleco'].includes(systemId) && !biosFiles[biosKeys[0]]) {
    showToast(`${system.name} precisa de sua BIOS para iniciar. Selecione-a nas configurações.`);
  }
  if (systemId === 'lynx' && !biosFiles.lynx) {
    showToast('Atari Lynx pode precisar do arquivo lynxboot.img para alguns jogos.');
  }
  const biosUrls = {};
  for (const [key, bios] of Object.entries(biosFiles)) {
    if (!bios) continue;
    biosUrls[key] = URL.createObjectURL(bios);
    currentBiosUrls.push(biosUrls[key]);
  }
  gameRunning = false;
  wakeLock?.release?.();
  wakeLock = null;
  const launchId = ++currentLaunch;
  currentRecordId = record?.id || null;
  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
  currentObjectUrl = URL.createObjectURL(file);
  const safeRomUrl = JSON.stringify(currentObjectUrl).replace(/</g, '\\u003c');
  // Keep the extension: EmulatorJS uses gameName for its virtual ROM filename
  // when gameUrl is a blob URL, and the core needs that extension to identify
  // the content format (for example .md, .gen, .bin, or .smd).
  const safeGameName = JSON.stringify(file.name).replace(/</g, '\\u003c');
  const safeCore = JSON.stringify(system.core);
  const safeControl = JSON.stringify(system.control);
  const safeBiosUrl = JSON.stringify(biosUrls[system.biosKey || systemId] || '');
  const externalFiles = {};
  const discSidecars = (record?.sidecars || selectedSidecars).filter((entry) => entry?.rom && entry?.virtualName);
  for (const entry of discSidecars) {
    const safePath = safeDiscPath(entry.virtualName);
    if (!safePath) continue;
    const sidecarUrl = URL.createObjectURL(entry.rom);
    currentSidecarUrls.push(sidecarUrl);
    externalFiles[`/${safePath}`] = sidecarUrl;
  }
  if (biosUrls['dreamcast-boot']) externalFiles['/system/dc/dc_boot.bin'] = biosUrls['dreamcast-boot'];
  if (biosUrls['dreamcast-flash']) externalFiles['/system/dc/dc_flash.bin'] = biosUrls['dreamcast-flash'];
  if (biosUrls['nds-bios7']) externalFiles['/system/ds/bios7.bin'] = biosUrls['nds-bios7'];
  if (biosUrls['nds-bios9']) externalFiles['/system/ds/bios9.bin'] = biosUrls['nds-bios9'];
  if (biosUrls['nds-firmware']) externalFiles['/system/ds/firmware.bin'] = biosUrls['nds-firmware'];
  const safeExternalFiles = JSON.stringify(externalFiles).replace(/</g, '\\u003c');
  // Load the bundled runtime directly. The EJSData service-worker alias may
  // not be active yet on a first launch, while these files ship with the app.
  const safeDataPath = JSON.stringify(new URL('ejs-data/', APP_BASE_URL).href);
  const safeLoaderUrl = JSON.stringify(new URL('ejs-data/loader.js', APP_BASE_URL).href);
  const virtualPad = JSON.stringify(virtualGamepadSettings(systemId));
  const volume = Math.min(100, Math.max(0, settings.volume)) / 100;
  const skin = FAMILY_SKINS[SYSTEM_FAMILIES[systemId] || 'Outros'] || FAMILY_SKINS.Outros;
  const padOpacity = Math.min(100, Math.max(35, Number(settings.padOpacity) || 78)) / 100;
  const padScale = Math.min(130, Math.max(75, Number(settings.padScale) || 100)) / 100;
  const touchControlsCss = settings.touchControls ? '' : '.ejs_virtualGamepad_parent,.ejs_virtualGamepad_open{display:none!important}';
  const performanceCss = settings.performance === 'quality'
    ? '#game canvas{image-rendering:auto!important}'
    : settings.performance === 'battery'
      ? '#game canvas{image-rendering:pixelated!important;filter:saturate(.9)}'
      : '#game canvas{image-rendering:auto!important}';

  playerView.hidden = false;
  document.body.classList.add('is-playing');
  playerName.textContent = displayTitle(file.name);
  playerStatus.textContent = `PREPARANDO ${system.name.toUpperCase()}`;
  playerLoader.hidden = false;
  playerLoader.querySelector('.loader-ring').hidden = false;
  playerLoader.querySelector('strong').textContent = 'Preparando o jogo';
  playerLoader.querySelector('span').textContent = `Conectando ao núcleo ${system.name}`;
  document.querySelector('#player-system-label').textContent = system.name.toUpperCase();
  mount.replaceChildren();
  mount.hidden = false;
  controlHint.textContent = 'CARREGANDO JOGO';

  const iframe = document.createElement('iframe');
  iframe.className = 'emulator-frame';
  iframe.title = `Emulador — ${file.name}`;
  iframe.allow = 'autoplay; fullscreen; gamepad; pointer-lock';
  iframe.setAttribute('allowfullscreen', '');
  iframe.srcdoc = `<!doctype html>
    <html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
    <style>
      html,body,#game{width:100%;height:100%;margin:0;background:#000;overflow:hidden}
      body{touch-action:none}
      .ejs_virtualGamepad_button{opacity:${padOpacity}!important;transform:scale(${padScale})!important;transform-origin:center!important;background:radial-gradient(circle at 35% 25%,${skin.accent},${skin.deep})!important;border:2px solid ${skin.deep}!important;color:#fff!important;box-shadow:inset 0 1px 2px #fff7,0 2px 5px #0009!important}
      .ejs_virtualGamepad_left,.ejs_virtualGamepad_top{opacity:${padOpacity}!important;zoom:${padScale}!important}
      .ejs_virtualGamepad_right{opacity:${padOpacity}!important}
      .ejs_dpad_main{opacity:1!important}
      ${performanceCss}
      [id^="sixbit-select"],[id^="sixbit-start"]{background:linear-gradient(#e7e9ef,#777b88)!important;border:1px solid #2a2c35!important;border-radius:8px!important;color:#171811!important}
      ${touchControlsCss}
    </style></head>
    <body><div id="game"></div><script>
      window.EJS_player = '#game';
      window.EJS_core = ${safeCore};
      window.EJS_gameID = ${emulatorGameId(file, systemId)};
      window.EJS_gameUrl = ${safeRomUrl};
      window.EJS_gameName = ${safeGameName};
      window.EJS_pathtodata = ${safeDataPath};
      window.EJS_color = '${skin.accent}';
      window.EJS_backgroundColor = '#000000';
      if (${safeControl}) window.EJS_controlScheme = ${safeControl};
      if (${safeBiosUrl}) window.EJS_biosUrl = ${safeBiosUrl};
      if (${Object.keys(externalFiles).length > 0}) window.EJS_externalFiles = ${safeExternalFiles};
      if (${Boolean(system.threaded)}) window.EJS_threads = true;
      if (${virtualPad} !== null) window.EJS_VirtualGamepadSettings = ${virtualPad};
      window.EJS_volume = ${volume};
      window.EJS_language = 'pt-BR';
      window.EJS_DEBUG_XX = ${Boolean(settings.devMode)};
      window.EJS_startOnLoaded = false;
      window.EJS_ready = function () { parent.postMessage({ type: 'sixteenbit-emulator-ready', id: ${launchId} }, '*'); };
      window.EJS_onGameStart = function () { parent.postMessage({ type: 'sixteenbit-game-started', id: ${launchId} }, '*'); };
      window.addEventListener('error', function (event) { parent.postMessage({ type: 'sixteenbit-runtime-error', id: ${launchId}, message: event.message || 'Erro no núcleo' }, '*'); });
      window.addEventListener('unhandledrejection', function (event) { parent.postMessage({ type: 'sixteenbit-runtime-error', id: ${launchId}, message: event.reason && event.reason.message || 'Falha assíncrona no núcleo' }, '*'); });
      window.addEventListener('pointerdown', function () { parent.postMessage({ type: 'sixteenbit-player-activity', id: ${launchId} }, '*'); if (${settings.haptics}) { try { navigator.vibrate && navigator.vibrate(8); } catch (_) {} } });
      window.addEventListener('keydown', function () { parent.postMessage({ type: 'sixteenbit-player-activity', id: ${launchId} }, '*'); });
    <\/script><script src=${safeLoaderUrl} onerror="parent.postMessage({type:'sixteenbit-load-error',id:${launchId}}, '*')"><\/script></body></html>`;
  iframe.addEventListener('error', () => showPlayerError('Não foi possível abrir o emulador. Confira sua conexão e tente novamente.'));
  mount.append(iframe);

  window.setTimeout(() => {
    if (currentLaunch === launchId && playerStatus.textContent.startsWith('PREPARANDO ')) {
      showPlayerError('O emulador demorou para iniciar. Confira o arquivo e sua conexão.');
    }
  }, 60000);
}

function showPlayerError(message) {
  rememberAppError(message);
  playerStatus.textContent = 'NÃO FOI POSSÍVEL CARREGAR';
  playerLoader.hidden = false;
  playerLoader.querySelector('.loader-ring').hidden = true;
  playerLoader.querySelector('strong').textContent = 'Não foi possível iniciar';
  playerLoader.querySelector('span').textContent = message;
  document.querySelector('#player-retry').hidden = !lastLaunchRequest;
  controlHint.textContent = 'FALHA AO INICIAR';
  showToast(message);
}

async function openGameFile(file, selectedFiles = [file]) {
  if (SYSTEMS[selectedSystem]?.kind === 'external') {
    openSelectedExternalSystem();
    return;
  }
  if (!file || !supportsGame(file)) {
    showToast('Selecione um arquivo aceito pelo sistema escolhido (.md, .32x, .iso, .chd, .cue ou .zip).');
    return;
  }
  const systemId = systemForFile(file);
  if (!supportsSystemGame(file, systemId)) {
    showToast(`O formato .${fileExtension(file)} não é compatível com ${SYSTEMS[systemId]?.name || 'o sistema selecionado'}.`);
    return;
  }
  const bundle = await resolveDiscBundle(file, selectedFiles);
  if (bundle.missing.length) {
    showToast(`Faltam arquivos do disco: ${bundle.missing.slice(0, 2).join(', ')}. Selecione junto com a CUE ou importe um ZIP.`);
    return;
  }
  const requestedSystem = SYSTEMS[systemId];
  if ((requestedSystem.threaded || requestedSystem.requiresIsolation) && !window.crossOriginIsolated) {
    showToast(`${requestedSystem.name} precisa de isolamento entre origens. Atualize a página depois que o app terminar de configurar o núcleo.`);
    return;
  }
  playStartupSound();
  let record = null;
  try {
    record = await saveGameFile(file, systemId, bundle.sidecars);
    await renderLibrary();
  } catch {
    showToast('A ROM vai abrir, mas não foi possível guardá-la na biblioteca. Confira o espaço disponível.');
  }
  await launchGame(file, record, true, bundle.sidecars);
}

async function playFromLibrary(id, soundAlreadyPlayed = false) {
  try {
    const record = await dbRequest('readonly', 'get', id);
    if (SYSTEMS[record?.systemId]?.kind === 'external') {
      selectSystem(record.systemId);
      openSelectedExternalSystem();
      return;
    }
    if (!record?.rom) throw new Error('Arquivo ausente.');
    const file = new File([record.rom], record.name, { type: record.rom.type || 'application/octet-stream', lastModified: record.lastModified });
    await launchGame(file, record, soundAlreadyPlayed);
  } catch {
    showToast('Não consegui abrir este arquivo. Remova o jogo e adicione a ROM novamente.');
    await renderLibrary();
  }
}

async function importFiles(files) {
  if (SYSTEMS[selectedSystem]?.kind === 'external') {
    openSelectedExternalSystem();
    return;
  }
  const selected = Array.from(files || []);
  const supported = selected.filter(supportsGame).sort((a, b) => {
    const discPriority = (file) => ['m3u','cue','gdi','ccd'].indexOf(fileExtension(file));
    const left = discPriority(a); const right = discPriority(b);
    return (left < 0 ? 10 : left) - (right < 0 ? 10 : right);
  });
  const ignored = selected.length - supported.length;
  if (!supported.length) {
    showToast('Não encontrei ROMs compatíveis nos arquivos selecionados.');
    return;
  }
  let saved = 0;
  let failed = 0;
  const incompleteDiscs = [];
  const importedNames = new Set();
  for (const file of supported) {
    if (importedNames.has(file.name.toLocaleLowerCase())) continue;
    const bundle = await resolveDiscBundle(file, selected);
    if (bundle.missing.length) {
      importedNames.add(file.name.toLocaleLowerCase());
      incompleteDiscs.push(`${file.name}: ${bundle.missing.slice(0, 2).join(', ')}`);
      continue;
    }
    try {
      await saveGameFile(file, systemForFile(file), bundle.sidecars);
      saved += 1;
      for (const sidecar of bundle.sidecars) importedNames.add(sidecar.file.name.toLocaleLowerCase());
    } catch { failed += 1; /* Continue importing the remaining ROMs. */ }
  }
  await renderLibrary();
  if (incompleteDiscs.length) showToast(`Mídia incompleta: ${incompleteDiscs[0]}. Selecione também os arquivos de faixa ou use um ZIP.`);
  else if (failed) showToast(`${saved} jogos adicionados; ${failed} não puderam ser salvos. Confira o espaço do aparelho.`);
  else showToast(`${saved} ${saved === 1 ? 'jogo adicionado' : 'jogos adicionados'} à biblioteca${ignored ? ` · ${ignored} ignorado(s)` : ''}.`);
}

async function closePlayer() {
  if (document.fullscreenElement && document.exitFullscreen) {
    try { await document.exitFullscreen(); } catch { /* Restore the native system bars below regardless. */ }
  }
  await setNativeImmersive(false);
  setVirtualKeyboardOpen(false);
  playerView.classList.remove('chrome-hidden');
  screen.orientation?.unlock?.();
  gameRunning = false;
  wakeLock?.release?.();
  wakeLock = null;
  playerView.hidden = true;
  document.body.classList.remove('is-playing');
  mount.replaceChildren();
  mount.hidden = true;
  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
  currentObjectUrl = null;
  for (const url of currentSidecarUrls) URL.revokeObjectURL(url);
  currentSidecarUrls = [];
  for (const url of currentBiosUrls) URL.revokeObjectURL(url);
  currentBiosUrls = [];
  currentRecordId = null;
  await renderLibrary();
}

async function setNativeImmersive(enabled) {
  let applied = false;
  try {
    const plugin = window.Capacitor?.Plugins?.ImmersiveMode;
    if (plugin?.setEnabled) {
      await plugin.setEnabled({ enabled });
      applied = enabled;
    }
  } catch {
    // Browser fullscreen remains available if the native bridge is absent.
  }
  nativeImmersive = applied;
  syncImmersiveChrome();
  updateFullscreenButton();
  return applied;
}

function syncImmersiveChrome() {
  const immersive = Boolean(document.fullscreenElement || nativeImmersive);
  playerView.classList.toggle('is-immersive', immersive);
  if (immersive) showPlayerChrome();
  else {
    window.clearTimeout(chromeTimer);
    playerView.classList.remove('chrome-hidden');
  }
}

function showPlayerChrome(force = false) {
  if (!playerView.classList.contains('is-immersive')) return;
  const wasHidden = playerView.classList.contains('chrome-hidden');
  if (!force && !wasHidden && chromeTimer) return;
  playerView.classList.remove('chrome-hidden');
  window.clearTimeout(chromeTimer);
  chromeTimer = window.setTimeout(() => {
    if (!keyboardOpen && !settingsDialog.open && !document.querySelector('#developer-dialog').open && !document.querySelector('#system-descriptions-dialog').open && playerView.classList.contains('is-immersive')) playerView.classList.add('chrome-hidden');
  }, 2600);
}

async function toggleFullscreen() {
  const isFullscreen = Boolean(document.fullscreenElement || nativeImmersive);
  if (isFullscreen) {
    if (document.fullscreenElement && document.exitFullscreen) {
      try { await document.exitFullscreen(); } catch { /* Also ask Android to restore its bars. */ }
    }
    await setNativeImmersive(false);
    screen.orientation?.unlock?.();
    return;
  }
  let browserFullscreen = false;
  try {
    const enter = document.documentElement.requestFullscreen || document.documentElement.webkitRequestFullscreen;
    if (enter) {
      await enter.call(document.documentElement);
      browserFullscreen = true;
    }
  } catch { /* Continue with Android immersive mode when browser fullscreen is unavailable. */ }
  await setNativeImmersive(true);
  try { await screen.orientation?.lock?.('landscape'); } catch { /* Rotation can be locked by the system. */ }
  syncImmersiveChrome();
  if (!browserFullscreen && !nativeImmersive) showToast('Não foi possível ativar a tela cheia.');
}

function updateFullscreenButton() {
  const fullscreen = Boolean(document.fullscreenElement || nativeImmersive);
  fullscreenButton.setAttribute('aria-label', fullscreen ? 'Sair da tela cheia' : 'Expandir jogo para tela cheia');
  fullscreenButton.title = fullscreen ? 'Sair da tela cheia' : 'Tela cheia total';
  fullscreenButton.innerHTML = fullscreen
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h4V4M20 8h-4V4M16 20v-4h4M8 20v-4H4"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4H4v4M16 4h4v4M20 16v4h-4M4 16v4h4"/></svg>';
}

function openSettings() {
  populateSettingsForm();
  settingsDialog.showModal();
}

function renderSystemDescriptions() {
  const query = document.querySelector('#descriptions-search').value.trim().toLocaleLowerCase('pt-BR');
  const groups = Object.entries(SYSTEM_GROUPS).map(([group, ids]) => {
    const cards = ids.filter((id) => SYSTEMS[id] && `${SYSTEMS[id].name} ${SYSTEM_DESCRIPTIONS[id] || ''} ${group}`.toLocaleLowerCase('pt-BR').includes(query));
    if (!cards.length) return '';
    return `<section class="description-group"><h3>${group}</h3><div class="description-cards">${cards.map((id) => {
      const system = SYSTEMS[id];
      const mode = system.kind === 'external' ? 'Player externo' : (system.keyboard ? 'Núcleo integrado · teclado virtual' : `Núcleo integrado · ${system.core}`);
      return `<article class="description-card"><div><h4>${system.name}</h4><span>${mode}</span></div><p>${SYSTEM_DESCRIPTIONS[id] || 'Sistema retrô disponível no catálogo.'}</p></article>`;
    }).join('')}</div></section>`;
  }).join('');
  document.querySelector('#descriptions-count').textContent = `${Object.keys(SYSTEMS).filter((id) => `${SYSTEMS[id].name} ${SYSTEM_DESCRIPTIONS[id] || ''}`.toLocaleLowerCase('pt-BR').includes(query)).length} descrições`;
  document.querySelector('#descriptions-list').innerHTML = groups || '<p class="picker-empty">Nenhuma descrição encontrada.</p>';
}

async function refreshDeveloperPanel() {
  let graphics = 'Não detectado';
  try {
    const canvas = document.createElement('canvas');
    graphics = canvas.getContext('webgl2') ? 'WebGL 2' : (canvas.getContext('webgl') ? 'WebGL 1' : 'Indisponível');
  } catch { graphics = 'Indisponível'; }
  let storage = 'Indisponível';
  try {
    const estimate = await navigator.storage?.estimate?.();
    if (estimate) storage = `${prettySize(estimate.usage || 0)} usado · ${estimate.quota ? prettySize(estimate.quota) : 'cota desconhecida'}`;
  } catch { /* Storage estimates are optional and may be blocked by the browser. */ }
  const diagnostics = [
    ['Versão do app', CURRENT_VERSION], ['Sistema selecionado', SYSTEMS[selectedSystem]?.name || selectedSystem],
    ['Núcleo atual', SYSTEMS[selectedSystem]?.core || 'player externo'],
    ['Runtime EmulatorJS', '4.2.3 · arquivos locais'],
    ['Núcleos integrados', `${Object.values(SYSTEMS).filter((system) => system.kind !== 'external').length}`],
    ['WebAssembly', typeof WebAssembly === 'object' ? 'Disponível' : 'Indisponível'], ['Gráficos', graphics],
    ['API de controle', typeof navigator.getGamepads === 'function' ? 'Gamepad disponível' : 'Gamepad indisponível'],
    ['Threads isoladas', window.crossOriginIsolated ? 'Disponíveis' : 'Indisponíveis nesta origem'],
    ['Armazenamento do app', storage], ['Service worker', 'serviceWorker' in navigator ? 'Disponível' : 'Indisponível'],
    ['Memória do aparelho', navigator.deviceMemory ? `aprox. ${navigator.deviceMemory} GB` : 'Não informada'],
  ];
  const grid = document.querySelector('#developer-grid');
  grid.replaceChildren(...diagnostics.map(([label, value]) => {
    const item = document.createElement('div'); item.className = 'developer-metric';
    const heading = document.createElement('small'); heading.textContent = label;
    const result = document.createElement('strong'); result.textContent = value;
    item.append(heading, result); return item;
  }));
  document.querySelector('#setting-dev-debug').checked = Boolean(settings.devMode);
  document.querySelector('#developer-vm-card').hidden = !settings.devMode;
  document.querySelector('#developer-log').textContent = recentAppErrors.length ? recentAppErrors.join('\n') : 'Nenhum erro registrado nesta sessão.';
  return Object.fromEntries(diagnostics);
}

let windowsVm = null;
let windowsVmReady = false;
let windowsVmSessionKey = '';
let windowsVmSessionMeta = null;
let windowsVmStopPromise = null;
const WINDOWS_VM_DISK_SIZE = 2 * 1024 * 1024 * 1024;
const WINDOWS_VM_DB_NAME = '16bit-arcade-windows-xp';
const WINDOWS_VM_DB_STORE = 'sessions';
const WINDOWS_VM_SESSION_PREFIX = 'xp-v1:';
const windowsVmDialog = document.querySelector('#developer-vm-dialog');
const windowsVmScreen = document.querySelector('#windows-vm-screen');
const windowsVmStatus = document.querySelector('#windows-vm-status');
const windowsVmStartButton = document.querySelector('#windows-vm-start');
const windowsVmRestartButton = document.querySelector('#windows-vm-restart');
const windowsVmStopButton = document.querySelector('#windows-vm-stop');
const windowsVmFullscreenButton = document.querySelector('#windows-vm-fullscreen');
const windowsVmCopyReportButton = document.querySelector('#windows-vm-copy-report');
const windowsVmResetDiskButton = document.querySelector('#windows-vm-reset-disk');
const windowsVmTelemetry = document.querySelector('#windows-vm-telemetry');
const windowsVmScreenHint = document.querySelector('#windows-vm-screen-hint');
const windowsVmScreenHintTitle = document.querySelector('#windows-vm-screen-hint-title');
const windowsVmScreenHintCopy = document.querySelector('#windows-vm-screen-hint-copy');
let windowsVmVideoReady = false;
let windowsVmScreenMode = '';
let windowsVmBootStartedAt = 0;
let windowsVmLastBootElapsedSeconds = 0;
let windowsVmBootTimeout = 0;
let windowsVmLoadTimeout = 0;
let windowsVmVideoProbeTimer = 0;
let windowsVmDiskReadSectors = 0;
let windowsVmDiskWriteSectors = 0;
let windowsVmLastError = '';

function setWindowsVmStatus(message) {
  windowsVmStatus.textContent = message;
}

function setWindowsVmScreenHint(title, message, visible = true) {
  windowsVmScreenHintTitle.textContent = title;
  windowsVmScreenHintCopy.textContent = message;
  windowsVmScreenHint.hidden = !visible;
}

function resetWindowsVmDiagnostics() {
  clearTimeout(windowsVmBootTimeout);
  clearTimeout(windowsVmLoadTimeout);
  clearTimeout(windowsVmVideoProbeTimer);
  windowsVmBootTimeout = 0;
  windowsVmLoadTimeout = 0;
  windowsVmVideoProbeTimer = 0;
  windowsVmVideoReady = false;
  windowsVmScreenMode = '';
  windowsVmBootStartedAt = 0;
  windowsVmLastBootElapsedSeconds = 0;
  windowsVmDiskReadSectors = 0;
  windowsVmDiskWriteSectors = 0;
  windowsVmLastError = '';
  windowsVmTelemetry.textContent = 'Preparando PC virtual · vídeo ainda não detectado';
  setWindowsVmScreenHint('Inicializando o PC virtual', 'O app está preparando o firmware, a memória e as mídias selecionadas.');
}

function markWindowsVmScreenSignal(mode) {
  windowsVmScreenMode = mode;
  if (windowsVmVideoReady) return;
  windowsVmVideoReady = true;
  clearTimeout(windowsVmBootTimeout);
  clearTimeout(windowsVmVideoProbeTimer);
  windowsVmBootTimeout = 0;
  windowsVmVideoProbeTimer = 0;
  setWindowsVmScreenHint('', '', false);
  windowsVmTelemetry.textContent = `Sinal de vídeo detectado · ${mode}`;
  if (/sem imagem|aguardando imagem|não mostrou imagem/i.test(windowsVmStatus.textContent)) {
    setWindowsVmStatus(`O vídeo do PC virtual iniciou (${mode}). Aguarde o Windows ou o Setup.`);
  }
}

function probeWindowsVmCanvas(vm) {
  if (windowsVm !== vm || windowsVmVideoReady) return;
  const canvas = windowsVmScreen.querySelector('.vm-screen-canvas');
  if (canvas?.width && canvas?.height && canvas.style.display !== 'none') {
    try {
      const pixels = canvas.getContext('2d', { willReadFrequently: true }).getImageData(0, 0, canvas.width, canvas.height).data;
      for (let offset = 0; offset < pixels.length; offset += 16) {
        if (pixels[offset] > 24 || pixels[offset + 1] > 24 || pixels[offset + 2] > 24) {
          markWindowsVmScreenSignal(`VGA ${canvas.width}×${canvas.height}`);
          return;
        }
      }
    } catch { /* Keep the boot hint visible if this WebView does not allow canvas inspection. */ }
  }
  if (Date.now() - windowsVmBootStartedAt < 90_000) {
    windowsVmVideoProbeTimer = window.setTimeout(() => probeWindowsVmCanvas(vm), 1000);
  }
}

function monitorWindowsVmBoot(vm) {
  windowsVmBootStartedAt = Date.now();
  windowsVmLastBootElapsedSeconds = 0;
  if (windowsVmVideoReady) return;
  setWindowsVmScreenHint('BIOS iniciada · aguardando imagem', 'O primeiro boot pode demorar. Se continuar preto após 90 segundos, tente Reiniciar ou pressione F12 para abrir o menu de boot.');
  windowsVmTelemetry.textContent = 'PC ligado · aguardando sinal de vídeo';
  windowsVmVideoProbeTimer = window.setTimeout(() => probeWindowsVmCanvas(vm), 500);
  windowsVmBootTimeout = window.setTimeout(() => {
    if (windowsVm !== vm || windowsVmVideoReady) return;
    setWindowsVmScreenHint('Ainda sem sinal de vídeo', 'Aguarde até 90 segundos. Se continuar preto, tente Reiniciar; pressione F12 e escolha o CD, ou confira se a ISO inicializa em um PC virtual.');
    windowsVmTelemetry.textContent = 'Sem imagem de vídeo após 45 s · confira a ISO ou o disco selecionado';
    setWindowsVmStatus('A máquina está ligada, mas ainda não mostrou imagem após 45 segundos. Aguarde até 90 segundos; depois tente Reiniciar ou F12 para selecionar a mídia de boot.');
  }, 45_000);
}

function getWindowsVmReport() {
  const disk = document.querySelector('#windows-vm-disk').files?.[0];
  const cd = document.querySelector('#windows-vm-cd').files?.[0];
  return {
    appVersion: CURRENT_VERSION,
    vm: {
      state: windowsVm ? (windowsVmReady ? 'running' : 'loading') : 'stopped',
      memoryMb: Number(document.querySelector('#windows-vm-memory').value),
      diskMode: disk ? 'selected-raw-image' : (windowsVmSessionMeta ? 'local-virtual-disk' : 'not-started'),
      cdAttached: Boolean(cd),
      cdSizeBytes: cd?.size || 0,
      videoSignal: windowsVmVideoReady,
      videoMode: windowsVmScreenMode || 'none',
      bootElapsedSeconds: windowsVmBootStartedAt ? Math.floor((Date.now() - windowsVmBootStartedAt) / 1000) : windowsVmLastBootElapsedSeconds,
      diskReadSectors: windowsVmDiskReadSectors,
      diskWriteSectors: windowsVmDiskWriteSectors,
      lastErrorType: windowsVmLastError || 'none',
      userAgent: navigator.userAgent,
    },
  };
}

function updateWindowsVmButtons(state) {
  windowsVmStartButton.disabled = state === 'loading' || state === 'running';
  windowsVmRestartButton.disabled = state !== 'running';
  windowsVmStopButton.disabled = state === 'stopped';
  windowsVmFullscreenButton.disabled = state !== 'running';
  windowsVmResetDiskButton.disabled = state !== 'stopped';
}

function openWindowsVmDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(WINDOWS_VM_DB_NAME, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(WINDOWS_VM_DB_STORE)) request.result.createObjectStore(WINDOWS_VM_DB_STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Não foi possível abrir o armazenamento da sessão.'));
  });
}

async function loadWindowsVmSession(key) {
  const database = await openWindowsVmDatabase();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(WINDOWS_VM_DB_STORE, 'readonly');
      const request = transaction.objectStore(WINDOWS_VM_DB_STORE).get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error || new Error('Não foi possível ler a sessão salva.'));
    });
  } finally {
    database.close();
  }
}

async function saveWindowsVmSession(key, record) {
  const database = await openWindowsVmDatabase();
  try {
    await new Promise((resolve, reject) => {
      const transaction = database.transaction(WINDOWS_VM_DB_STORE, 'readwrite');
      transaction.objectStore(WINDOWS_VM_DB_STORE).put(record, key);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error || new Error('Não foi possível gravar a sessão.'));
      transaction.onabort = () => reject(transaction.error || new Error('O armazenamento recusou a sessão.'));
    });
  } finally {
    database.close();
  }
}

async function deleteWindowsVmSession(key) {
  const database = await openWindowsVmDatabase();
  try {
    await new Promise((resolve, reject) => {
      const transaction = database.transaction(WINDOWS_VM_DB_STORE, 'readwrite');
      transaction.objectStore(WINDOWS_VM_DB_STORE).delete(key);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error || new Error('Não foi possível remover a sessão incompatível.'));
      transaction.onabort = () => reject(transaction.error || new Error('Não foi possível remover a sessão incompatível.'));
    });
  } finally {
    database.close();
  }
}

async function clearWindowsVmSessions() {
  const database = await openWindowsVmDatabase();
  try {
    await new Promise((resolve, reject) => {
      const transaction = database.transaction(WINDOWS_VM_DB_STORE, 'readwrite');
      transaction.objectStore(WINDOWS_VM_DB_STORE).clear();
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error || new Error('Não foi possível apagar as sessões salvas.'));
      transaction.onabort = () => reject(transaction.error || new Error('Não foi possível apagar as sessões salvas.'));
    });
  } finally {
    database.close();
  }
}

async function getWindowsVmVirtualDisk() {
  if (!navigator.storage?.getDirectory) throw new Error('Este navegador não oferece armazenamento local para criar o disco virtual. Atualize o Android System WebView e tente novamente.');
  const root = await navigator.storage.getDirectory();
  const directory = await root.getDirectoryHandle('16bit-arcade-vm', { create: true });
  const handle = await directory.getFileHandle('windows-xp-2gb.raw', { create: true });
  let file = await handle.getFile();
  if (file.size !== WINDOWS_VM_DISK_SIZE) {
    const writable = await handle.createWritable({ keepExistingData: false });
    await writable.truncate(WINDOWS_VM_DISK_SIZE);
    await writable.close();
    file = await handle.getFile();
  }
  return file;
}

function windowsVmIsoSessionKey(iso) {
  return `${WINDOWS_VM_SESSION_PREFIX}${encodeURIComponent(iso.name)}:${iso.size}:${iso.lastModified}`;
}

function windowsVmSessionUsesIso(record, iso) {
  return record?.meta?.isoName === iso.name
    && record.meta.isoSize === iso.size
    && record.meta.isoLastModified === iso.lastModified
    && record.state instanceof ArrayBuffer;
}

function windowsVmSessionMatches(record, iso, memorySize) {
  return windowsVmSessionUsesIso(record, iso)
    && record.meta.memorySize === memorySize
    && record.meta.diskSize === WINDOWS_VM_DISK_SIZE
}

function explainWindowsVmError(error, saving = false) {
  if (error?.name === 'QuotaExceededError' || /quota|storage|space|espaço/i.test(error?.message || '')) {
    return saving
      ? 'Sem espaço livre suficiente para salvar a sessão. Libere armazenamento e pare a máquina novamente.'
      : 'Sem espaço livre suficiente no armazenamento do app para criar o disco virtual.';
  }
  return error?.message || 'Erro desconhecido.';
}

async function stopWindowsVm() {
  if (windowsVmStopPromise) return windowsVmStopPromise;
  windowsVmStopPromise = (async () => {
  const vm = windowsVm;
  const wasReady = windowsVmReady;
  if (windowsVmBootStartedAt) windowsVmLastBootElapsedSeconds = Math.floor((Date.now() - windowsVmBootStartedAt) / 1000);
  windowsVmBootStartedAt = 0;
  clearTimeout(windowsVmBootTimeout);
  clearTimeout(windowsVmLoadTimeout);
  clearTimeout(windowsVmVideoProbeTimer);
  windowsVmBootTimeout = 0;
  windowsVmLoadTimeout = 0;
  windowsVmVideoProbeTimer = 0;
  windowsVm = null;
  windowsVmReady = false;
  let saved = false;
  let saveError = null;
  const autoSession = Boolean(windowsVmSessionKey && windowsVmSessionMeta);
  if (vm) {
    try { await vm.stop(); } catch { /* A VM may stop itself after a guest shutdown. */ }
    if (wasReady && windowsVmSessionKey && windowsVmSessionMeta) {
      try {
        setWindowsVmStatus('Salvando a sessão local…');
        const state = await vm.save_state();
        await saveWindowsVmSession(windowsVmSessionKey, { meta: windowsVmSessionMeta, state });
        saved = true;
      } catch (error) {
        saveError = error;
        recentAppErrors.push(`Windows XP save: ${error?.message || error}`);
      }
    }
    try { await vm.destroy(); } catch { /* Cleanup continues for the selected file handles. */ }
  }
  windowsVmSessionKey = '';
  windowsVmSessionMeta = null;
  updateWindowsVmButtons('stopped');
  windowsVmTelemetry.textContent = `PC virtual parado · último sinal VGA: ${windowsVmScreenMode || 'nenhum'}`;
  setWindowsVmScreenHint('PC virtual parado', 'Selecione a ISO do XP ou um disco RAW e toque em Iniciar / instalar.');
  return { hadVm: Boolean(vm), autoSession, saved, saveError };
  })();
  try { return await windowsVmStopPromise; }
  finally { windowsVmStopPromise = null; }
}

async function startWindowsVm() {
  if (!settings.devMode) {
    showToast('Ative o modo de desenvolvedor para abrir o PC virtual.');
    return;
  }
  const selectedDisk = document.querySelector('#windows-vm-disk').files?.[0];
  const cd = document.querySelector('#windows-vm-cd').files?.[0];
  if (!selectedDisk && !cd) {
    setWindowsVmStatus('Escolha uma ISO de instalação do XP ou um disco RAW com XP instalado.');
    return;
  }
  const maxImageSize = 3 * 1024 * 1024 * 1024;
  if ((selectedDisk && (selectedDisk.size < 512 * 1024 || selectedDisk.size > maxImageSize)) || (cd && cd.size > maxImageSize)) {
    setWindowsVmStatus('Imagem inválida ou maior que o limite experimental de 3 GB por arquivo.');
    return;
  }

  await stopWindowsVm();
  if (!windowsVmDialog.open) return;
  resetWindowsVmDiagnostics();
  const memorySize = Number(document.querySelector('#windows-vm-memory').value) * 1024 * 1024;
  let disk = selectedDisk;
  let sessionRecord = null;
  windowsVmSessionKey = '';
  windowsVmSessionMeta = null;
  if (!disk && cd) {
    setWindowsVmStatus('Criando disco virtual local de 2 GB…');
    try {
      disk = await getWindowsVmVirtualDisk();
    } catch (error) {
      windowsVmLastError = error?.name || 'Error';
      setWindowsVmScreenHint('Não foi possível criar o disco virtual', explainWindowsVmError(error));
      setWindowsVmStatus(explainWindowsVmError(error));
      return;
    }
    if (!windowsVmDialog.open) return;
    windowsVmSessionKey = windowsVmIsoSessionKey(cd);
    windowsVmSessionMeta = {
      memorySize,
      diskSize: WINDOWS_VM_DISK_SIZE,
      isoName: cd.name,
      isoSize: cd.size,
      isoLastModified: cd.lastModified,
    };
    try { sessionRecord = await loadWindowsVmSession(windowsVmSessionKey); }
    catch (error) { recentAppErrors.push(`Windows XP storage: ${error?.message || error}`); }
    if (windowsVmSessionUsesIso(sessionRecord, cd) && sessionRecord.meta.memorySize !== memorySize) {
      const savedMemoryMb = Math.round(sessionRecord.meta.memorySize / (1024 * 1024));
      setWindowsVmStatus(`Esta ISO tem uma sessão salva com ${savedMemoryMb} MB. Selecione essa memória para retomá-la.`);
      windowsVmSessionKey = '';
      windowsVmSessionMeta = null;
      return;
    }
  }
  const screenText = windowsVmScreen.querySelector('.vm-screen-text');
  const screenCanvas = windowsVmScreen.querySelector('.vm-screen-canvas');
  screenText.textContent = '';
  screenCanvas.width = 0;
  screenCanvas.height = 0;
  screenCanvas.style.display = 'none';
  updateWindowsVmButtons('loading');
  const canResumeSession = !selectedDisk && cd && windowsVmSessionMatches(sessionRecord, cd, memorySize);
  setWindowsVmStatus(canResumeSession ? 'Carregando a sessão salva do XP…' : 'Carregando runtime local e arquivos selecionados…');

  try {
    const { V86 } = await import(new URL('v86/build/libv86.mjs', APP_BASE_URL).href);
    if (!windowsVmDialog.open) {
      windowsVmSessionKey = '';
      windowsVmSessionMeta = null;
      updateWindowsVmButtons('stopped');
      return;
    }
    const options = {
      wasm_path: new URL('v86/build/v86.wasm', APP_BASE_URL).href,
      memory_size: memorySize,
      vga_memory_size: 8 * 1024 * 1024,
      screen_container: windowsVmScreen,
      bios: { url: new URL('v86/bios/seabios.bin', APP_BASE_URL).href },
      vga_bios: { url: new URL('v86/bios/vgabios.bin', APP_BASE_URL).href },
      hda: { buffer: disk, async: true },
      boot_order: 0x213,
      acpi: false,
      cpuid_level: 2,
      bootmenu: true,
      autostart: false,
    };
    if (cd) options.cdrom = { buffer: cd, async: true };
    const vm = new V86(options);
    windowsVm = vm;
    windowsVmLoadTimeout = window.setTimeout(() => {
      if (windowsVm !== vm || windowsVmReady) return;
      windowsVmLastError = 'InitializationTimeout';
      setWindowsVmScreenHint('O runtime ainda não ficou pronto', 'Verifique se o app está atualizado e toque em Parar e salvar; depois tente iniciar novamente.');
      windowsVmTelemetry.textContent = 'Runtime v86 sem confirmação de pronto após 60 s';
      setWindowsVmStatus('O runtime do PC virtual não ficou pronto após 60 segundos. Pare a máquina e tente novamente.');
    }, 60_000);
    vm.add_listener('download-progress', (event) => {
      if (event.lengthComputable && event.total > 0) {
        const percent = Math.min(100, Math.round(event.loaded / event.total * 100));
        setWindowsVmStatus(`Carregando ${event.file_name || 'imagem'} · ${percent}%`);
      }
    });
    vm.add_listener('download-error', (event) => {
      windowsVmLastError = 'MediaReadError';
      setWindowsVmStatus(`Falha ao ler ${event.file_name || 'a imagem de disco'}. Tente uma imagem RAW local.`);
    });
    vm.add_listener('screen-set-size', (screenSize) => {
      const [width, height, bpp] = screenSize;
      const mode = bpp ? `${width}×${height} · ${bpp} bpp` : `${width}×${height} · texto VGA`;
      windowsVmScreenMode = mode;
      if (!windowsVmVideoReady) windowsVmTelemetry.textContent = `Modo de vídeo iniciado · ${mode} · aguardando pixels`;
    });
    vm.add_listener('screen-put-char', (screenChar) => {
      const [, , character] = screenChar;
      if (character > 32) markWindowsVmScreenSignal('texto VGA');
    });
    vm.add_listener('ide-read-end', (read) => {
      if (Array.isArray(read)) windowsVmDiskReadSectors += Number(read[2]) || 0;
    });
    vm.add_listener('ide-write-end', (write) => {
      if (Array.isArray(write)) windowsVmDiskWriteSectors += Number(write[2]) || 0;
    });
    vm.add_listener('emulator-ready', async () => {
      try {
        if (windowsVm !== vm) return;
        clearTimeout(windowsVmLoadTimeout);
        windowsVmLoadTimeout = 0;
        let sessionRestored = false;
        if (canResumeSession && windowsVmSessionKey) {
          try {
            await vm.restore_state(sessionRecord.state);
            sessionRestored = true;
          } catch (error) {
            windowsVmLastError = error?.name || 'RestoreError';
            recentAppErrors.push(`Windows XP restore: ${error?.message || error}`);
            try { await deleteWindowsVmSession(windowsVmSessionKey); }
            catch (deleteError) { recentAppErrors.push(`Windows XP session cleanup: ${deleteError?.message || deleteError}`); }
            setWindowsVmStatus('A sessão salva era incompatível e foi descartada. Iniciando a instalação do zero…');
          }
        }
        if (windowsVm !== vm) return;
        windowsVmReady = true;
        monitorWindowsVmBoot(vm);
        await vm.run();
        updateWindowsVmButtons('running');
        if (sessionRestored) setWindowsVmStatus('Sessão do XP retomada. Use Parar para salvar antes de sair.');
        else if (!selectedDisk && cd) setWindowsVmStatus('Setup pela ISO: na primeira tela azul, toque F5 e escolha Standard PC. A tecla F5 está abaixo.');
        else setWindowsVmStatus('PC virtual ligado. Toque na tela ou use as teclas rápidas abaixo.');
      } catch (error) {
        recentAppErrors.push(`Windows XP VM: ${error?.message || error}`);
        windowsVmSessionKey = '';
        windowsVmSessionMeta = null;
        await stopWindowsVm();
        windowsVmLastError = error?.name || 'Error';
        windowsVmTelemetry.textContent = `Falha ao iniciar · ${windowsVmLastError}`;
        setWindowsVmScreenHint('Falha ao iniciar o PC virtual', 'Copie o diagnóstico para registrar o tipo de erro e as etapas de boot.');
        setWindowsVmStatus('Não foi possível iniciar a máquina virtual neste aparelho.');
      }
    });
    vm.add_listener('emulator-started', () => {
      if (windowsVm !== vm) return;
      updateWindowsVmButtons('running');
      if (!windowsVmVideoReady) setWindowsVmStatus('PC virtual ligado · aguardando a primeira imagem de vídeo…');
    });
    vm.add_listener('emulator-stopped', () => {
      if (windowsVm) setWindowsVmStatus('Máquina pausada. Use Reiniciar para voltar ao boot.');
    });
  } catch (error) {
    recentAppErrors.push(`Windows XP VM: ${error?.message || error}`);
    await stopWindowsVm();
    windowsVmLastError = error?.name || 'Error';
    windowsVmTelemetry.textContent = `Falha ao carregar o runtime · ${windowsVmLastError}`;
    setWindowsVmScreenHint('Falha ao carregar o runtime', 'Copie o diagnóstico para registrar o tipo de erro e as etapas de boot.');
    setWindowsVmStatus(`Falha ao carregar o runtime x86: ${explainWindowsVmError(error)}`);
  }
}

function showBiosOnlyExplanation() {
  showToast('Neste núcleo, a BIOS é firmware: o EmulatorJS precisa de uma ROM de jogo para iniciar. Salve a BIOS aqui e abra um jogo do mesmo sistema.');
}

async function requestWakeLock() {
  if (!settings.keepAwake || !('wakeLock' in navigator) || document.visibilityState !== 'visible' || wakeLock) return;
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    wakeLock.addEventListener('release', () => { wakeLock = null; });
  } catch { /* The game keeps running if the system does not grant a wake lock. */ }
}

chooseButton.addEventListener('click', () => SYSTEMS[selectedSystem]?.kind === 'external' ? openSelectedExternalSystem() : fileInput.click());
fileInput.addEventListener('change', async (event) => {
  const files = Array.from(event.target.files || []);
  event.target.value = '';
  const file = selectPrimaryRom(files);
  if (file) await openGameFile(file, files);
});
libraryImportButton.addEventListener('click', () => SYSTEMS[selectedSystem]?.kind === 'external' ? openSelectedExternalSystem() : libraryInput.click());
document.querySelector('#empty-import').addEventListener('click', () => SYSTEMS[selectedSystem]?.kind === 'external' ? openSelectedExternalSystem() : libraryInput.click());
libraryInput.addEventListener('change', async (event) => {
  const files = event.target.files;
  event.target.value = '';
  await importFiles(files);
});
document.querySelector('#player-back').addEventListener('click', closePlayer);
virtualKeyboardToggle.addEventListener('click', () => setVirtualKeyboardOpen(!keyboardOpen));
document.querySelector('#player-keyboard-close').addEventListener('click', () => setVirtualKeyboardOpen(false));
document.querySelector('#settings-open').addEventListener('click', openSettings);
document.querySelector('#player-settings-open').addEventListener('click', openSettings);
const systemDescriptionsDialog = document.querySelector('#system-descriptions-dialog');
const developerDialog = document.querySelector('#developer-dialog');
document.querySelector('#system-descriptions-open').addEventListener('click', () => { renderSystemDescriptions(); systemDescriptionsDialog.showModal(); });
document.querySelector('#descriptions-search').addEventListener('input', renderSystemDescriptions);
document.querySelector('#developer-menu-open').addEventListener('click', async () => { developerDialog.showModal(); await refreshDeveloperPanel(); });
document.querySelector('#developer-refresh').addEventListener('click', refreshDeveloperPanel);
document.querySelector('#developer-copy').addEventListener('click', async () => {
  const diagnostics = await refreshDeveloperPanel();
  const report = JSON.stringify({ appVersion: CURRENT_VERSION, diagnostics, recentErrors: recentAppErrors }, null, 2);
  try { await navigator.clipboard.writeText(report); showToast('Relatório técnico copiado.'); }
  catch { showToast('A cópia não está disponível neste navegador. Tente novamente em uma origem segura.'); }
});
document.querySelector('#windows-vm-open').addEventListener('click', () => {
  if (!settings.devMode) return showToast('Ative o modo de desenvolvedor primeiro.');
  windowsVmDialog.showModal();
});
windowsVmStartButton.addEventListener('click', startWindowsVm);
windowsVmRestartButton.addEventListener('click', () => {
  if (!windowsVm) return;
  resetWindowsVmDiagnostics();
  monitorWindowsVmBoot(windowsVm);
  windowsVm.restart();
  setWindowsVmStatus('Reiniciando o PC virtual…');
});
windowsVmCopyReportButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(getWindowsVmReport(), null, 2));
    showToast('Diagnóstico do PC virtual copiado, sem nomes de arquivos.');
  } catch {
    showToast('A cópia não está disponível neste navegador.');
  }
});
windowsVmResetDiskButton.addEventListener('click', async () => {
  if (windowsVm) {
    setWindowsVmStatus('Pare o PC virtual antes de apagar o disco local.');
    return;
  }
  if (!window.confirm('Apagar o disco virtual local de 2 GB e todas as sessões salvas do Windows XP neste aparelho? Isso remove a instalação local e não pode ser desfeito. Imagens RAW escolhidas por você não serão alteradas.')) return;
  windowsVmStartButton.disabled = true;
  windowsVmResetDiskButton.disabled = true;
  setWindowsVmStatus('Apagando as sessões e recriando o disco virtual local…');
  try {
    await clearWindowsVmSessions();
    const root = await navigator.storage.getDirectory();
    const directory = await root.getDirectoryHandle('16bit-arcade-vm', { create: true });
    try { await directory.removeEntry('windows-xp-2gb.raw'); }
    catch (error) { if (error?.name !== 'NotFoundError') throw error; }
    await getWindowsVmVirtualDisk();
    windowsVmSessionKey = '';
    windowsVmSessionMeta = null;
    resetWindowsVmDiagnostics();
    windowsVmTelemetry.textContent = 'Disco virtual vazio · sessão XP removida';
    setWindowsVmScreenHint('Disco virtual zerado', 'Escolha a ISO do XP e toque em Iniciar / instalar para começar do zero.');
    setWindowsVmStatus('O disco virtual foi recriado vazio e as sessões salvas foram apagadas.');
  } catch (error) {
    windowsVmLastError = error?.name || 'Error';
    windowsVmTelemetry.textContent = `Falha ao recriar o disco · ${windowsVmLastError}`;
    setWindowsVmScreenHint('Não foi possível recriar o disco', explainWindowsVmError(error));
    setWindowsVmStatus(`Falha ao apagar ou recriar o disco virtual: ${explainWindowsVmError(error)}`);
  } finally {
    updateWindowsVmButtons('stopped');
  }
});
windowsVmStopButton.addEventListener('click', async () => {
  const result = await stopWindowsVm();
  if (result.saved) setWindowsVmStatus('Sessão salva neste aparelho. Para continuar, escolha a mesma ISO e memória.');
  else if (result.saveError) setWindowsVmStatus(`Máquina parada; não foi possível salvar: ${explainWindowsVmError(result.saveError, true)}`);
  else if (result.autoSession) setWindowsVmStatus('Máquina parada. A sessão não foi salva; se estava carregando, tente novamente.');
  else setWindowsVmStatus('Máquina parada. A imagem RAW original não foi alterada; as alterações desta sessão não foram gravadas.');
});
windowsVmFullscreenButton.addEventListener('click', async () => {
  try { await windowsVmScreen.requestFullscreen(); }
  catch { showToast('A tela cheia não está disponível nesta janela.'); }
});
document.querySelectorAll('[data-vm-scancodes]').forEach((button) => button.addEventListener('click', () => {
  if (!windowsVm) return;
  const codes = button.dataset.vmScancodes.split(',').map((code) => Number(code));
  windowsVm.keyboard_set_enabled(true);
  windowsVm.keyboard_send_scancodes(codes);
}));
document.querySelector('#windows-vm-text-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const input = document.querySelector('#windows-vm-text');
  if (!windowsVm || !input.value) return;
  windowsVm.keyboard_set_enabled(true);
  windowsVm.keyboard_send_text(input.value);
  input.value = '';
  windowsVmScreen.focus();
});
document.querySelector('#setting-dev-debug').addEventListener('change', (event) => {
  settings.devMode = event.target.checked;
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch { /* Debug preference still applies for this session. */ }
  document.querySelector('#developer-vm-card').hidden = !settings.devMode;
  if (!settings.devMode && windowsVmDialog.open) {
    void stopWindowsVm();
    windowsVmDialog.close();
  }
  showToast(settings.devMode ? 'Modo de desenvolvedor ativo.' : 'Modo de desenvolvedor desativado.');
});
document.querySelectorAll('[data-dialog-close]').forEach((button) => button.addEventListener('click', () => document.querySelector(`#${button.dataset.dialogClose}`).close()));
for (const dialog of [systemDescriptionsDialog, developerDialog, windowsVmDialog]) {
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => showPlayerChrome(true));
}
windowsVmDialog.addEventListener('close', () => {
  void (async () => {
    const result = await stopWindowsVm();
    if (result.saved) setWindowsVmStatus('Sessão salva neste aparelho. Para continuar, escolha a mesma ISO e memória.');
    else if (result.saveError) setWindowsVmStatus(`Não foi possível salvar a sessão: ${explainWindowsVmError(result.saveError, true)}`);
    else setWindowsVmStatus('Aguardando uma ISO de instalação do XP ou um disco RAW instalado.');
  })();
});
window.addEventListener('pagehide', () => { void stopWindowsVm(); });
document.querySelector('#bios-only-help').addEventListener('click', showBiosOnlyExplanation);
fullscreenButton.addEventListener('click', toggleFullscreen);
document.querySelector('#library-search').addEventListener('input', renderLibrary);
document.querySelector('#library-system-filter').addEventListener('change', renderLibrary);
document.querySelector('#library-sort').addEventListener('change', renderLibrary);
document.querySelectorAll('[data-library-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    libraryFilter = button.dataset.libraryFilter;
    document.querySelectorAll('[data-library-filter]').forEach((item) => item.classList.toggle('is-active', item === button));
    renderLibrary();
  });
});
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach((item) => item.classList.toggle('is-current', item === link));
  });
});

settingsForm.addEventListener('submit', (event) => {
  if (event.submitter?.value !== 'save') return;
  event.preventDefault();
  const previous = settings;
  settings = getSettingsFromForm();
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch { /* Preferences still work until this app session ends. */ }
  applyLiveSettings();
  settingsDialog.close('save');
  const restartNeeded = settings.touchControls !== previous.touchControls
    || settings.layout !== previous.layout
    || settings.padStyle !== previous.padStyle
    || settings.padOpacity !== previous.padOpacity
    || settings.padScale !== previous.padScale
    || settings.performance !== previous.performance
    || settings.volume !== previous.volume
    || settings.devMode !== previous.devMode;
  showToast(restartNeeded
    ? 'Preferências salvas. Controles e modo de desenvolvedor atualizados.'
    : 'Preferências salvas neste aparelho.');
  if (!settings.keepAwake) {
    wakeLock?.release?.();
    wakeLock = null;
  } else if (gameRunning) requestWakeLock();
});

document.addEventListener('keydown', (event) => {
  const target = event.target;
  const editing = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'o' && !editing) {
    event.preventDefault();
    if (!playerView.hidden) return;
    chooseButton.click();
  } else if (event.key === '/' && !editing && playerView.hidden) {
    event.preventDefault();
    document.querySelector('#library-search').focus();
  } else if (event.key === 'F11') {
    event.preventDefault();
    toggleFullscreen();
  }
});
settingsDialog.addEventListener('close', () => showPlayerChrome(true));
volumeInput.addEventListener('input', () => {
  volumeValue.value = `${volumeInput.value}%`;
  volumeValue.textContent = `${volumeInput.value}%`;
});
document.querySelector('#setting-pad-opacity').addEventListener('input', (event) => {
  document.querySelector('#pad-opacity-value').textContent = `${event.target.value}%`;
});
document.querySelector('#setting-pad-scale').addEventListener('input', (event) => {
  document.querySelector('#pad-scale-value').textContent = `${event.target.value}%`;
});
document.querySelector('#player-retry').addEventListener('click', () => {
  if (!lastLaunchRequest) return;
  const { file, record, selectedSidecars } = lastLaunchRequest;
  launchGame(file, record, true, selectedSidecars).catch((error) => showPlayerError(`Falha ao tentar novamente: ${error.message}`));
});

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    setNativeImmersive(false);
    screen.orientation?.unlock?.();
  } else setNativeImmersive(true);
  syncImmersiveChrome();
  updateFullscreenButton();
});
document.addEventListener('webkitfullscreenchange', updateFullscreenButton);

window.addEventListener('message', async (event) => {
  const frame = mount.querySelector('iframe');
  if (!frame || event.source !== frame.contentWindow || event.data?.id !== currentLaunch) return;
  if (event.data?.type === 'sixteenbit-player-activity') {
    showPlayerChrome();
  } else if (event.data?.type === 'sixteenbit-emulator-ready') {
    playerStatus.textContent = 'JOGO PRONTO · TOQUE EM PLAY';
    controlHint.textContent = 'TOQUE EM PLAY PARA COMEÇAR';
    playerLoader.hidden = true;
  } else if (event.data?.type === 'sixteenbit-game-started') {
    const firstStart = !gameRunning;
    gameRunning = true;
    playerStatus.textContent = 'EM EXECUÇÃO';
    controlHint.textContent = 'TOQUE · TECLADO · CONTROLE BLUETOOTH';
    await requestWakeLock();
    if (firstStart && currentRecordId) {
      try {
        const game = await dbRequest('readonly', 'get', currentRecordId);
        if (game) {
          game.lastPlayed = Date.now();
          game.playCount = (game.playCount || 0) + 1;
          await dbRequest('readwrite', 'put', game);
          await renderLibrary();
        }
      } catch { /* A running game does not depend on the library stats. */ }
    }
  } else if (event.data?.type === 'sixteenbit-runtime-error') {
    const message = `EmulatorJS · ${String(event.data.message || 'falha no núcleo').slice(0, 160)}`;
    rememberAppError(message);
    if (playerStatus.textContent.startsWith('PREPARANDO ')) showPlayerError(`Falha ao carregar o núcleo: ${String(event.data.message || 'erro desconhecido').slice(0, 140)}`);
  }
  else if (event.data?.type === 'sixteenbit-load-error') showPlayerError('Não foi possível abrir ejs-data/loader.js, que acompanha o app. Feche e reabra o emulador.');
});

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible' && gameRunning) requestWakeLock();
});
document.addEventListener('pointerdown', (event) => {
  if (settings.haptics && event.pointerType === 'touch' && navigator.vibrate) navigator.vibrate(8);
}, { passive: true });
playerView.addEventListener('pointerdown', showPlayerChrome, { passive: true });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.fullscreenElement) {
    setNativeImmersive(false);
    screen.orientation?.unlock?.();
  }
});
document.addEventListener('backbutton', (event) => {
  event.preventDefault?.();
  if (developerDialog.open) developerDialog.close();
  else if (systemDescriptionsDialog.open) systemDescriptionsDialog.close();
  else if (settingsDialog.open) settingsDialog.close();
  else if (document.fullscreenElement || nativeImmersive) toggleFullscreen();
  else if (!playerView.hidden) closePlayer();
  else window.history.back();
});

document.addEventListener('dragenter', (event) => {
  if (!event.dataTransfer?.types.includes('Files')) return;
  event.preventDefault();
  dragDepth += 1;
  document.body.classList.add('is-dragging');
});
document.addEventListener('dragover', (event) => {
  if (event.dataTransfer?.types.includes('Files')) event.preventDefault();
});
document.addEventListener('dragleave', (event) => {
  if (!event.dataTransfer?.types.includes('Files')) return;
  dragDepth = Math.max(0, dragDepth - 1);
  if (!dragDepth) document.body.classList.remove('is-dragging');
});
document.addEventListener('drop', async (event) => {
  if (!event.dataTransfer?.files.length) return;
  event.preventDefault();
  dragDepth = 0;
  document.body.classList.remove('is-dragging');
  const files = Array.from(event.dataTransfer.files);
  const primary = selectPrimaryRom(files);
  await importFiles(files);
  if (SYSTEMS[selectedSystem]?.kind !== 'external' && primary) {
    const bundle = await resolveDiscBundle(primary, files);
    if (!bundle.missing.length) await playFromLibrary(gameId(primary, systemForFile(primary), bundle.sidecars));
  }
});

window.addEventListener('pagehide', () => {
  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
  for (const url of currentSidecarUrls) URL.revokeObjectURL(url);
  for (const url of currentBiosUrls) URL.revokeObjectURL(url);
  wakeLock?.release?.();
});

for (const [id, system] of Object.entries(SYSTEMS)) {
  const option = document.createElement('option'); option.value = id; option.textContent = system.name; systemSelect.append(option);
}
systemSelect.value = selectedSystem;
const pickerSearch = document.querySelector('#system-picker-search');
const pickerResults = document.querySelector('#system-picker-results');
const pickerCategories = document.querySelector('#system-picker-categories');
let activeSystemGroup = 'Todos';
function renderSystemPicker() {
  const query = pickerSearch.value.trim().toLocaleLowerCase('pt-BR');
  const groups = ['Todos', ...Object.keys(SYSTEM_GROUPS)];
  pickerCategories.innerHTML = groups.map((group) => `<button type="button" class="picker-category${activeSystemGroup === group ? ' is-active' : ''}" data-picker-group="${group}">${group}</button>`).join('');
  const entries = Object.entries(SYSTEMS).filter(([id, system]) => {
    const group = Object.entries(SYSTEM_GROUPS).find(([, ids]) => ids.includes(id))?.[0] || 'Outros';
    return (activeSystemGroup === 'Todos' || activeSystemGroup === group) && `${system.name} ${SYSTEM_SUMMARIES[id] || ''} ${group}`.toLocaleLowerCase('pt-BR').includes(query);
  });
  document.querySelector('#system-picker-count').textContent = `${entries.length} sistemas · ${Object.values(SYSTEMS).filter((system) => system.kind !== 'external').length} integrados`;
  pickerResults.innerHTML = entries.map(([id, system]) => {
    const external = system.kind === 'external';
  const badge = external ? 'EXTERNO' : (system.experimental ? 'EXPERIMENTAL' : (system.keyboard ? 'TECLADO' : (system.threaded ? 'DESEMPENHO' : (system.biosKey || system.biosKeys ? 'BIOS' : 'INTEGRADO'))));
    return `<button type="button" class="picker-system${selectedSystem === id ? ' is-selected' : ''}" data-picker-system="${id}" aria-pressed="${selectedSystem === id}"><span class="picker-system-top"><span class="picker-system-icon" aria-hidden="true">${external ? '↗' : (system.core ? '▣' : '◈')}</span><span class="picker-badge${external ? ' is-external' : ''}">${badge}</span></span><strong>${system.name}</strong><small>${SYSTEM_SUMMARIES[id] || (external ? 'Abre uma solução externa' : 'Núcleo EmulatorJS')}</small></button>`;
  }).join('') || '<p class="picker-empty">Nenhum sistema encontrado. Tente outro nome.</p>';
}
document.querySelector('#system-picker-open').addEventListener('click', () => { renderSystemPicker(); systemPicker.showModal(); pickerSearch.focus(); });
document.querySelector('#system-picker-close').addEventListener('click', () => systemPicker.close());
pickerSearch.addEventListener('input', renderSystemPicker);
pickerCategories.addEventListener('click', (event) => { const button = event.target.closest('[data-picker-group]'); if (!button) return; activeSystemGroup = button.dataset.pickerGroup; renderSystemPicker(); });
pickerResults.addEventListener('click', (event) => {
  const card = event.target.closest('[data-picker-system]'); if (!card) return;
  systemSelect.value = card.dataset.pickerSystem;
  systemSelect.dispatchEvent(new Event('change', { bubbles: true }));
  systemPicker.close();
});
systemPicker.addEventListener('click', (event) => { if (event.target === systemPicker) systemPicker.close(); });
function updateSystemActions() {
  const externalSystem = SYSTEMS[selectedSystem]?.kind === 'external';
  virtualKeyboardToggle.hidden = !SYSTEMS[selectedSystem]?.keyboard;
  if (!SYSTEMS[selectedSystem]?.keyboard && keyboardOpen) setVirtualKeyboardOpen(false);
  const actionName = selectedSystem === 'psvita' ? 'Obter Vita3K' : 'Abrir player de PS2';
  chooseButton.innerHTML = externalSystem ? `<span aria-hidden="true">↗</span> ${actionName}` : '<span aria-hidden="true">▶</span> Abrir uma ROM';
  libraryImportButton.disabled = externalSystem;
  libraryImportButton.title = externalSystem ? 'Este sistema abre em outro app ou página' : '';
  document.querySelector('#system-picker-current').textContent = SYSTEMS[selectedSystem]?.name || 'Escolher sistema';
  applySystemSkin();
}
updateSystemActions();
systemSelect.addEventListener('change', () => {
  selectSystem(systemSelect.value);
});
document.querySelectorAll('[data-external-system-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    openExternalPlayer(link.href);
  });
});
for (const [inputId, key, statusId] of [
  ['setting-ps1-bios','ps1','ps1-bios-status'],
  ['setting-segacd-bios','segacd','segacd-bios-status'],
  ['setting-saturn-bios','saturn','saturn-bios-status'],
  ['setting-mastersystem-bios','mastersystem','mastersystem-bios-status'],
  ['setting-gamegear-bios','gamegear','gamegear-bios-status'],
  ['setting-gb-bios','gb','gb-bios-status'],
  ['setting-gbc-bios','gbc','gbc-bios-status'],
  ['setting-gba-bios','gba','gba-bios-status'],
  ['setting-nds-bios7','nds-bios7','nds-bios7-status'],
  ['setting-nds-bios9','nds-bios9','nds-bios9-status'],
  ['setting-nds-firmware','nds-firmware','nds-firmware-status'],
  ['setting-3do-bios','3do','bios-3do-status'],
  ['setting-coleco-bios','coleco','coleco-bios-status'],
  ['setting-lynx-bios','lynx','lynx-bios-status'],
  ['setting-atari7800-bios','atari7800','atari7800-bios-status'],
  ['setting-dc-boot-bios','dreamcast-boot','dc-boot-bios-status'],
  ['setting-dc-flash-bios','dreamcast-flash','dc-flash-bios-status'],
  ['setting-amiga-bios','amiga','amiga-bios-status'],
  ['setting-pcfx-bios','pcfx','pcfx-bios-status'],
  ['setting-pcecd-bios','pcecd','pcecd-bios-status'],
]) {
  const input = document.querySelector(`#${inputId}`);
  input.addEventListener('change', async () => {
    const file = input.files?.[0]; if (!file) return;
    if (key.startsWith('dreamcast-') && fileExtension(file) !== 'bin') {
      showToast('O arquivo de BIOS do Dreamcast precisa terminar em .bin.');
      input.value = '';
      return;
    }
    if (key === 'ps1' && !['bin','bios'].includes(fileExtension(file))) {
      showToast('A BIOS do PS1 precisa ser um arquivo .bin ou .bios.');
      input.value = '';
      return;
    }
    try { await biosRequest('readwrite','put',file,key); document.getElementById(statusId).textContent = `BIOS salva: ${file.name}`; showToast('BIOS salva somente neste aparelho.'); }
    catch { showToast('Não foi possível salvar a BIOS; confira o espaço disponível.'); }
    input.value = '';
  });
}
Promise.all([
  biosRequest('readonly','get','ps1'),
  biosRequest('readonly','get','segacd'),
  biosRequest('readonly','get','saturn'),
  biosRequest('readonly','get','mastersystem'),
  biosRequest('readonly','get','gamegear'),
  biosRequest('readonly','get','gb'),
  biosRequest('readonly','get','gbc'),
  biosRequest('readonly','get','gba'),
  biosRequest('readonly','get','nds-bios7'),
  biosRequest('readonly','get','nds-bios9'),
  biosRequest('readonly','get','nds-firmware'),
  biosRequest('readonly','get','3do'),
  biosRequest('readonly','get','coleco'),
  biosRequest('readonly','get','lynx'),
  biosRequest('readonly','get','atari7800'),
  biosRequest('readonly','get','dreamcast-boot'),
  biosRequest('readonly','get','dreamcast-flash'),
  biosRequest('readonly','get','amiga'),
  biosRequest('readonly','get','pcfx'),
  biosRequest('readonly','get','pcecd'),
]).then(([ps1,cd,saturn,master,gear,gb,gbc,gba,ndsBios7,ndsBios9,ndsFirmware,bios3do,biosColeco,biosLynx,biosAtari7800,dcBoot,dcFlash,amiga,pcfx,pcecd]) => {
  if (ps1) document.querySelector('#ps1-bios-status').textContent = 'BIOS do PS1 salva neste aparelho';
  if (cd) document.querySelector('#segacd-bios-status').textContent = 'BIOS do Sega CD salva neste aparelho';
  if (saturn) document.querySelector('#saturn-bios-status').textContent = 'BIOS do Saturn salva neste aparelho';
  if (master) document.querySelector('#mastersystem-bios-status').textContent = 'BIOS do Master System salva neste aparelho';
  if (gear) document.querySelector('#gamegear-bios-status').textContent = 'BIOS do Game Gear salva neste aparelho';
  if (gb) document.querySelector('#gb-bios-status').textContent = 'BIOS do Game Boy salva neste aparelho';
  if (gbc) document.querySelector('#gbc-bios-status').textContent = 'BIOS do Game Boy Color salva neste aparelho';
  if (gba) document.querySelector('#gba-bios-status').textContent = 'BIOS do Game Boy Advance salva neste aparelho';
  if (ndsBios7) document.querySelector('#nds-bios7-status').textContent = 'bios7.bin salvo neste aparelho';
  if (ndsBios9) document.querySelector('#nds-bios9-status').textContent = 'bios9.bin salvo neste aparelho';
  if (ndsFirmware) document.querySelector('#nds-firmware-status').textContent = 'firmware.bin salvo neste aparelho';
  if (bios3do) document.getElementById('bios-3do-status').textContent = 'BIOS do 3DO salva neste aparelho';
  if (biosColeco) document.querySelector('#coleco-bios-status').textContent = 'BIOS da ColecoVision salva neste aparelho';
  if (biosLynx) document.querySelector('#lynx-bios-status').textContent = 'lynxboot.img salvo neste aparelho';
  if (biosAtari7800) document.querySelector('#atari7800-bios-status').textContent = 'BIOS do Atari 7800 salva neste aparelho';
  if (dcBoot) document.querySelector('#dc-boot-bios-status').textContent = 'dc_boot.bin salvo neste aparelho';
  if (dcFlash) document.querySelector('#dc-flash-bios-status').textContent = 'dc_flash.bin salvo neste aparelho';
  if (amiga) document.querySelector('#amiga-bios-status').textContent = 'Kickstart salvo neste aparelho';
  if (pcfx) document.querySelector('#pcfx-bios-status').textContent = 'BIOS do PC-FX salva neste aparelho';
  if (pcecd) document.querySelector('#pcecd-bios-status').textContent = 'BIOS de CD da PC Engine salva neste aparelho';
}).catch(() => {});
applyLiveSettings();
populateSettingsForm();
updateFullscreenButton();
renderLibrary();

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      const reloadKey = 'sixteenbit-coi-reload-v1';
      if (sessionStorage.getItem(reloadKey) === 'done') return;
      sessionStorage.setItem(reloadKey, 'done');
      location.reload();
    });
    navigator.serviceWorker.register(new URL('sw.js', APP_BASE_URL).href).catch(() => {});
  });
}
