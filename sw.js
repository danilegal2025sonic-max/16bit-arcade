const BASE_URL = new URL(self.registration.scope);
const CACHE_SCOPE_KEY = BASE_URL.pathname.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'root';
const CACHE_NAME = `16bit-shell-${CACHE_SCOPE_KEY}-v15`;
const EJS_PREFIXES = [new URL('ejs-data/', BASE_URL).pathname, new URL('EJSData/', BASE_URL).pathname];
const EJS_CDN = 'https://cdn.emulatorjs.org/4.2.3/data/';
const APP_SHELL = ['', 'index.html', 'styles.css', 'app.js', 'manifest.webmanifest', 'icon.svg', 'icon-192.png', 'icon-512.png', 'ejs-data/loader.js', 'ejs-data/emulator.min.js', 'ejs-data/emulator.min.css']
  .map((path) => new URL(path, BASE_URL).href);

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith(`16bit-shell-${CACHE_SCOPE_KEY}-`) && key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

function withIsolationHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  headers.set('Cross-Origin-Embedder-Policy', 'require-corp');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

async function proxyEjsAsset(request, requestUrl) {
  let assetPath;
  try {
    const prefix = EJS_PREFIXES.find((candidate) => requestUrl.pathname.startsWith(candidate));
    if (!prefix) return new Response('Invalid EmulatorJS asset path', { status: 400 });
    assetPath = decodeURIComponent(requestUrl.pathname.slice(prefix.length));
  } catch {
    return new Response('Invalid EJS asset path', { status: 400 });
  }
  if (!assetPath || assetPath.startsWith('/') || assetPath.split('/').includes('..') || !/^[\w./-]+$/.test(assetPath)) {
    return new Response('Invalid EJS asset path', { status: 400 });
  }

  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const localUrl = new URL(`ejs-data/${assetPath}`, BASE_URL);
    const localRequest = new Request(localUrl, { headers: { 'X-16Bit-Asset-Direct': '1' } });
    const bundled = await fetch(localRequest);
    if (bundled.ok) {
      const headers = new Headers(bundled.headers);
      headers.set('Cross-Origin-Resource-Policy', 'same-origin');
      const response = new Response(bundled.body, { status: bundled.status, statusText: bundled.statusText, headers });
      cache.put(request, response.clone()).catch(() => {});
      return response;
    }
  } catch {
    // Continue with the pinned official CDN if a bundled file is missing or unreadable.
  }

  let upstream;
  {
    const upstreamUrl = new URL(assetPath, EJS_CDN);
    upstreamUrl.search = requestUrl.search;
    try {
      upstream = await fetch(upstreamUrl, { credentials: 'omit', mode: 'cors', redirect: 'follow' });
    } catch {
      return new Response('Could not download the EmulatorJS asset', { status: 502 });
    }
  }

  if (!upstream.ok) return upstream;
  const headers = new Headers(upstream.headers);
  headers.delete('content-length');
  headers.delete('content-encoding');
  headers.delete('set-cookie');
  headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  const response = new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers,
  });
  cache.put(request, response.clone()).catch(() => {});
  return response;
}

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  if (event.request.method !== 'GET' || requestUrl.origin !== self.location.origin || event.request.headers.get('X-16Bit-Asset-Direct') === '1') return;

  if (EJS_PREFIXES.some((prefix) => requestUrl.pathname.startsWith(prefix))) {
    event.respondWith(proxyEjsAsset(event.request, requestUrl));
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(event.request);
    const response = cached || await fetch(event.request);
    if (!cached && response.ok) cache.put(event.request, response.clone()).catch(() => {});
    return event.request.mode === 'navigate' ? withIsolationHeaders(response) : response;
  })());
});
