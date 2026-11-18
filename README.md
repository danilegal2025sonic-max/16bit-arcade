# 16-Bit Arcade

Emulador retrô para navegador, computador e Android. A versão 3.0.0 inclui o runtime EmulatorJS e núcleos locais para iniciar sem baixar esses arquivos na primeira execução. ROMs, BIOS e firmware continuam sendo escolhidos pelo usuário e não vêm no app.

## Publicar no GitHub Pages

O projeto funciona tanto na raiz de um domínio quanto no endereço de projeto do GitHub Pages (`usuario.github.io/16bit-arcade/`). Para publicar:

1. Crie um repositório **público** chamado `16bit-arcade` no GitHub e envie o conteúdo deste projeto para a branch `main`.
2. No repositório, abra **Settings → Pages → Build and deployment** e selecione **GitHub Actions** como origem.
3. O workflow em `.github/workflows/pages.yml` compila o site e publica a pasta `www`. O endereço aparece em **Settings → Pages** após a primeira publicação.

O APK, `node_modules` e arquivos temporários de build ficam fora do repositório. Os núcleos incluídos em `ejs-data/cores/` são publicados com o site; o app não inclui ROMs, BIOS nem firmware.

## Versões

- **1.0.0** — Mega Drive, biblioteca local e controles virtuais.
- **1.1.0** — Sega CD, Sega 32X e Saturn.
- **1.2.0** — PS1, PSP experimental, Dreamcast experimental e acesso externo experimental a PS2.
- **1.3.0** — Master System, Game Gear, Game Boy, Game Boy Color, GBA e N64; acesso externo ao Vita3K.
- **1.4.0** — NES, SNES e Nintendo DS; runtime e núcleos locais.
- **2.0.0** — Atari 2600/5200/7800, Lynx, Virtual Boy, 3DO, ColecoVision, PC Engine, Neo Geo Pocket, WonderSwan, Arcade FBNeo e MAME 2003, Atari Jaguar e PC MS-DOS; exportação de ROM pela biblioteca; campos de BIOS ampliados; pacote local expandido.
- **2.1.0** — sete sistemas Commodore e PC-FX; seletor redesenhado com busca, categorias e indicadores de suporte; campos para BIOS Amiga e PC-FX.
- **2.2.0** — animação de abertura, som configurável ao iniciar ROM, guia com descrições dos sistemas e menu de desenvolvedor com diagnóstico e logs; correções no direcionamento e validação de arquivos. A BIOS funciona como firmware junto de um jogo; o núcleo não oferece inicialização sem ROM.
- **2.2.1** — preserva a extensão original da ROM ao enviá-la ao núcleo.
- **2.2.2** — carrega o runtime incluído diretamente do app, sem depender do service worker para encontrar o arquivo inicial; adiciona suporte a publicação no GitHub Pages.
- **3.0.0** — adiciona Atari 8-bit, ZX Spectrum, Amstrad CPC e Doom; inclui núcleos alternativos para NES, Nintendo DS, Nintendo 64, PlayStation e arcade; acrescenta teclado virtual para computadores retrô e fixa as versões dos pacotes dos núcleos.

## Sistemas integrados

- **Sega:** Mega Drive/Genesis, Sega CD, 32X, Saturn, Master System, Game Gear e Dreamcast.
- **Nintendo:** NES/Famicom, SNES, Game Boy, Game Boy Color, Game Boy Advance, Nintendo DS e Nintendo 64.
- **PlayStation:** PS1 e PSP. PS2 e PS Vita são atalhos para soluções externas; não são núcleos integrados.
- **Computadores:** Commodore 64, 128, PET, Plus/4, VIC-20 e Amiga; PC MS-DOS.
- **Atari e retrô:** Atari 2600, 5200, 7800, 8-bit (400/800/XL/XE), Lynx e Jaguar; Virtual Boy; 3DO; ColecoVision; PC Engine/TurboGrafx-16; Neo Geo Pocket; WonderSwan e NEC PC-FX.
- **Computadores adicionais:** Sinclair ZX Spectrum e Amstrad CPC. **PC MS-DOS** usa DOSBox Pure e abre pacotes de jogos `.zip` ou `.7z`.
- **Arcade e Doom:** FBNeo e MAME 2003/2003 Plus; PrBoom para arquivos de jogo Doom `.wad`. Use versões de ROM compatíveis com o núcleo selecionado.

O catálogo usa os sistemas e núcleos oferecidos pelo [EmulatorJS](https://emulatorjs.org/docs4devs/cores/). O app inclui os núcleos selecionados em `ejs-data/cores/`; o service worker procura os recursos locais primeiro e mantém um fallback para o CDN oficial. As versões e hashes dos novos pacotes estão em `ejs-data/cores/core-packages-lock.json`. Durante uma partida, o menu do EmulatorJS permite selecionar núcleos alternativos quando o sistema oferece essa opção.

### Formatos e BIOS

Use o seletor de sistema antes de abrir formatos compartilhados, como `.bin`, `.iso`, `.cue`, `.tap`, `.sna` ou `.zip`. A extensão de uma ROM compactada não identifica sozinha o console. Os sistemas de computador mostram um botão de teclado virtual no player; mantenha uma tecla pressionada na tela para sustentar a entrada.

PS1, Sega CD e Saturn podem exigir BIOS. Nintendo DS com melonDS exige `bios7.bin`, `bios9.bin` e `firmware.bin`. 3DO e ColecoVision exigem BIOS. Atari 7800 e Lynx podem usar arquivos de sistema para compatibilidade. Dreamcast funciona melhor com `dc_boot.bin` e `dc_flash.bin`; Amiga pode precisar de Kickstart; PC-FX pode precisar de BIOS. Os campos ficam em Configurações; os arquivos permanecem neste aparelho.

Arcade, DOSBox, 3DO, Saturn, N64, PSP e Dreamcast podem exigir bastante desempenho e espaço. A compatibilidade varia conforme o jogo e o aparelho. Doom precisa de um arquivo WAD compatível, fornecido pelo usuário. O app não fornece jogos, ROMs, BIOS ou firmware.

## Recursos

- Biblioteca local com busca, favoritos, histórico e ordenação.
- Exportação do arquivo de jogo individual a partir do cartão na biblioteca.
- Controles por toque, teclado ou controle Bluetooth.
- Tela cheia imersiva, efeitos CRT, ajuste de tela, volume, vibração e tela sempre ligada.
- Núcleos e runtime localizados no APK; os recursos ausentes continuam podendo ser obtidos pelo CDN.
- BIOS armazenadas localmente no aparelho.

## Rodar localmente

Com Python 3, a partir desta pasta:

```bash
python3 -m http.server 8000
```

Depois abra <http://localhost:8000>.

## APK Android

```bash
npm install
npm run android:apk
```

O APK de depuração aparece em `android/app/build/outputs/apk/debug/app-debug.apk`.

## Avisos de terceiros

Atribuições, metadados de licença e repositórios dos núcleos estão em [ejs-data/THIRD_PARTY_NOTICES.md](ejs-data/THIRD_PARTY_NOTICES.md) e `ejs-data/cores/licenses/`. O app não distribui jogos comerciais, ROMs, BIOS ou firmware.
