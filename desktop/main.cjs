const { app, BrowserWindow, Menu, net, protocol, session, shell } = require('electron');
const fs = require('node:fs/promises');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const APP_SCHEME = 'arcade';
const APP_HOST = 'app';
const ALLOWED_EXTERNAL_HOSTS = new Set(['tabstationtoo.github.io', 'vita3k.org', 'web.libretro.com']);

protocol.registerSchemesAsPrivileged([{
  scheme: APP_SCHEME,
  privileges: {
    standard: true,
    secure: true,
    supportFetchAPI: true,
    corsEnabled: true,
    stream: true,
    allowServiceWorkers: true,
  },
}]);

function contentTypeFor(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return new Map([
    ['.html', 'text/html; charset=utf-8'],
    ['.css', 'text/css; charset=utf-8'],
    ['.js', 'text/javascript; charset=utf-8'],
    ['.mjs', 'text/javascript; charset=utf-8'],
    ['.json', 'application/json; charset=utf-8'],
    ['.wasm', 'application/wasm'],
    ['.svg', 'image/svg+xml'],
    ['.png', 'image/png'],
    ['.jpg', 'image/jpeg'],
    ['.jpeg', 'image/jpeg'],
    ['.webmanifest', 'application/manifest+json'],
  ]).get(extension);
}

function webDirectory() {
  return app.isPackaged
    ? path.join(process.resourcesPath, 'www')
    : path.resolve(__dirname, '..', 'www');
}

async function serveAppFile(request) {
  const requestUrl = new URL(request.url);
  if (requestUrl.hostname !== APP_HOST) return new Response('Not found', { status: 404 });

  let relativePath;
  try {
    relativePath = decodeURIComponent(requestUrl.pathname).replace(/^\/+/, '');
  } catch {
    return new Response('Invalid path', { status: 400 });
  }
  if (relativePath.includes('\\') || relativePath.split('/').some((part) => part === '..' || part.includes('\0'))) {
    return new Response('Invalid path', { status: 400 });
  }

  const root = webDirectory();
  let filePath = path.resolve(root, relativePath || 'index.html');
  if (filePath !== root && !filePath.startsWith(`${root}${path.sep}`)) {
    return new Response('Invalid path', { status: 400 });
  }
  try {
    if ((await fs.stat(filePath)).isDirectory()) filePath = path.join(filePath, 'index.html');
    const response = await net.fetch(pathToFileURL(filePath).toString());
    const headers = new Headers(response.headers);
    headers.set('Cross-Origin-Opener-Policy', 'same-origin');
    headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
    headers.set('Cross-Origin-Resource-Policy', 'same-origin');
    const contentType = contentTypeFor(filePath);
    if (contentType) headers.set('Content-Type', contentType);
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}

function openExternalUrl(value) {
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && ALLOWED_EXTERNAL_HOSTS.has(url.hostname)) void shell.openExternal(url.toString());
  } catch {
    // Invalid external links are ignored.
  }
}

function installNavigationGuards(window) {
  const { webContents } = window;
  webContents.setWindowOpenHandler(({ url }) => {
    openExternalUrl(url);
    return { action: 'deny' };
  });
  webContents.on('will-navigate', (event, url) => {
    if (url.startsWith(`${APP_SCHEME}://${APP_HOST}/`)) return;
    event.preventDefault();
    openExternalUrl(url);
  });
  webContents.on('will-redirect', (event, url) => {
    if (!url.startsWith(`${APP_SCHEME}://${APP_HOST}/`)) event.preventDefault();
  });
  webContents.on('will-attach-webview', (event) => event.preventDefault());
}

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1366,
    height: 900,
    minWidth: 760,
    minHeight: 620,
    show: false,
    backgroundColor: '#0b0c11',
    title: '16-Bit Arcade',
    icon: path.join(webDirectory(), 'icon-512.png'),
    autoHideMenuBar: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
  });

  installNavigationGuards(window);
  const menu = Menu.buildFromTemplate([
    {
      label: 'Arquivo',
      submenu: [
        {
          label: 'Abrir ROM…',
          accelerator: 'CmdOrCtrl+O',
          click: () => window.webContents.executeJavaScript("document.querySelector('#choose-game')?.click()"),
        },
        { type: 'separator' },
        { role: 'quit', label: 'Sair' },
      ],
    },
    {
      label: 'Exibir',
      submenu: [
        {
          label: 'Tela cheia',
          accelerator: 'F11',
          click: () => window.webContents.executeJavaScript("document.querySelector('#fullscreen-toggle')?.click()"),
        },
        { role: 'reload', label: 'Recarregar' },
        { role: 'toggleDevTools', label: 'Ferramentas de desenvolvedor' },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);

  window.once('ready-to-show', () => window.show());
  window.loadURL(`${APP_SCHEME}://${APP_HOST}/index.html`);
  return window;
}

app.whenReady().then(() => {
  if (process.platform === 'win32') app.setAppUserModelId('com.codex.sixteenbit');
  app.setName('16-Bit Arcade');
  protocol.handle(APP_SCHEME, serveAppFile);
  const defaultSession = session.defaultSession;
  defaultSession.setPermissionRequestHandler((_contents, permission, callback) => {
    callback(permission === 'clipboard-sanitized-write');
  });
  defaultSession.setPermissionCheckHandler((_contents, permission) => permission === 'clipboard-sanitized-write');
  createMainWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
