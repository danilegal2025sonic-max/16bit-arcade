# 16-Bit Arcade

Emulador retrô para navegador, computador, Android e iOS. A **Grande Atualização 6.0.0** prepara builds de Windows, Linux, macOS Apple silicon e Intel, APK Android e projeto iOS via Capacitor. Também adiciona acesso opcional ao RetroArch Web Player oficial, além do catálogo local EmulatorJS. ROMs, BIOS, firmware e imagens do Windows continuam sendo escolhidos pelo usuário.

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
- **4.0.0** — integra Sega SG-1000, Sega Pico experimental, Neo Geo, SuperGrafx e PC Engine CD; inclui runtime EmulatorJS minificado local para reduzir falhas de download; redesenha controles virtuais por sistema com direcional digital ou analógico; importa e salva os arquivos associados a mídias CUE/GDI/M3U; separa os saves por jogo.
- **5.0.0 — Ultimate Update** — cria temas e arte contextual para cada família de sistemas; adiciona ajuste de tamanho e transparência aos controles de toque; combina temas dos botões e esquemas de controle por console; permite tentar novamente a inicialização após uma falha; corrige a interceptação dos caminhos locais do EmulatorJS e adiciona recuperação de arquivos pelo CDN oficial fixado na mesma versão.
- **5.1.0 — Developer PC** — integra o runtime v86 ao APK e ao PWA; adiciona um PC virtual x86 experimental acessível pelo modo de desenvolvedor, compatibilidade com disco RAW e CD opcional, memória configurável, teclas de toque e tela cheia; inclui os arquivos de runtime necessários para uso offline, mas não inclui Windows XP nem imagens de disco.
- **5.1.1 — Instalação de XP** — aceita uma ISO inicializável do usuário sem exigir arquivo `.img`; cria um disco virtual local de 2 GB e salva a sessão no aparelho ao parar, permitindo retomá-la com a mesma ISO e memória.
- **5.1.2 — Compatibilidade do Setup** — lê os arquivos de disco direto do objeto local, evitando a rota de URL temporária; adiciona a tecla F5 e a instrução para selecionar **Standard PC** durante a instalação do XP.
- **5.1.3 — Boot assistido do XP** — habilita o menu de boot da BIOS, adiciona F12 e setas aos controles rápidos, define 512 MB como memória inicial recomendada e mostra um aviso útil em vez de deixar a área de vídeo sem contexto; acrescenta monitoramento do sinal VGA, contadores de leitura/escrita do disco e cópia de diagnóstico sem nomes de arquivos.
- **5.2.0 — Arcade Boost** — permite arrastar ROMs para a biblioteca ou para iniciar uma partida, filtra a coleção por sistema, adiciona `Ctrl/Cmd+O`, `/` e `F11`, cria perfis de desempenho e oferece redução de animações para aparelhos mais lentos.
- **5.3.0 — Primeiro Port** — adiciona app Electron com esquema local seguro, instalador Windows x64 e pacotes Linux x64 AppImage/DEB; cria projeto iOS Capacitor com Swift Package Manager e workflow macOS para validar o app de simulador.
- **6.0.0 — Grande Atualização Multiplataforma** — atualiza a versão em Android, iOS, Windows e Linux; adiciona empacotamento macOS Intel e Apple silicon; gera APK Android no workflow de release; corrige a sincronização nativa do Capacitor com o pacote `tar` seguro; adiciona um atalho claro para o RetroArch Web Player oficial e documenta que esse catálogo externo é menor que todos os cores nativos do RetroArch.

## Windows e Linux

Os pacotes da versão atual são produzidos pelo workflow `.github/workflows/native-builds.yml` quando uma tag `v*` é enviada ao GitHub; no caso desta versão, `v6.0.0`. Windows recebe instalador x64 `.exe`; Linux recebe `.AppImage` e `.deb`; macOS recebe `.dmg` e `.zip` para Apple silicon e Intel. Os pacotes macOS são sem assinatura/notarização e podem exibir o aviso do Gatekeeper. A primeira execução pode levar algum tempo para desempacotar os núcleos locais. Também é possível executar `npm run desktop:dev`, `npm run desktop:windows`, `npm run desktop:linux`, `npm run desktop:mac:arm64` ou `npm run desktop:mac:x64` em um ambiente compatível.

O workflow compila um APK Android assinado para sideload usando uma chave persistente guardada nos segredos privados do GitHub Actions; isso permite instalar as versões futuras por cima desta sem trocar a chave. Se os segredos não estiverem configurados (por exemplo, em um fork), o workflow produz um APK de depuração. A assinatura de sideload não configura uma publicação da Play Store. O workflow também valida o app iOS no simulador; um IPA para iPhone continua exigindo assinatura da Apple.

O app desktop carrega os arquivos locais por `arcade://app/`, sem iniciar um servidor `localhost`. Ele usa um processo Electron isolado, mantém a biblioteca no perfil do usuário e abre links externos aprovados no navegador padrão.

## iOS

O projeto Xcode está em `ios/App/App.xcodeproj` e usa Swift Package Manager. Em um Mac com Xcode, rode `npm ci`, `npm run ios:sync` e `npm run ios:open`; para instalar em um iPhone, selecione seu time de desenvolvimento no Xcode e assine o app. A sincronização gera o ícone 1024×1024 com a marca 16-Bit Arcade. O workflow do GitHub compila a variante de simulador para validar o port. Um IPA assinado para aparelho/App Store exige credenciais Apple, que não são armazenadas neste repositório. Até assinar a versão nativa, também é possível instalar a versão web no iPhone pelo Safari usando Compartilhar → Adicionar à Tela de Início. A WebView nativa do iOS não ativa isolamento cross-origin como o app desktop; por isso, núcleos que exigem `SharedArrayBuffer` e threads (como PSP e o PC virtual) podem não iniciar nessa versão.

## Sistemas integrados

- **Sega:** Mega Drive/Genesis, Sega CD, 32X, Saturn, Master System, Game Gear, Dreamcast, SG-1000 e Sega Pico experimental.
- **Nintendo:** NES/Famicom, SNES, Game Boy, Game Boy Color, Game Boy Advance, Nintendo DS e Nintendo 64.
- **PlayStation:** PS1 e PSP. PS2 e PS Vita são atalhos para soluções externas; não são núcleos integrados.
- **Computadores:** Commodore 64, 128, PET, Plus/4, VIC-20 e Amiga; PC MS-DOS.
- **Atari e retrô:** Atari 2600, 5200, 7800, 8-bit (400/800/XL/XE), Lynx e Jaguar; Virtual Boy; 3DO; ColecoVision; PC Engine/TurboGrafx-16, PC Engine CD e SuperGrafx; Neo Geo AES/MVS via FBNeo; Neo Geo Pocket; WonderSwan e NEC PC-FX.
- **Computadores adicionais:** Sinclair ZX Spectrum e Amstrad CPC. **PC MS-DOS** usa DOSBox Pure e abre pacotes de jogos `.zip` ou `.7z`.
- **Arcade e Doom:** FBNeo e MAME 2003/2003 Plus; PrBoom para arquivos de jogo Doom `.wad`. Use versões de ROM compatíveis com o núcleo selecionado.

O catálogo local usa sistemas e núcleos do [EmulatorJS](https://emulatorjs.org/docs4devs/cores/) e alguns sistemas adicionais reconhecidos pelos mesmos núcleos. Runtime minificado, dados dos núcleos e relatórios usados pelo app são incluídos em `ejs-data/`; o service worker prioriza esses arquivos locais, armazena os recursos acessados e usa o CDN oficial fixado na versão 4.2.3 como recuperação se um arquivo não estiver disponível. As versões e hashes dos novos pacotes estão em `ejs-data/cores/core-packages-lock.json`. Durante uma partida, o menu do EmulatorJS permite selecionar núcleos alternativos quando o sistema oferece essa opção.

**RetroArch Web Player** aparece como uma opção externa no seletor. Ele abre `web.libretro.com`, onde o usuário escolhe um dos cores disponíveis naquele player e carrega a própria ROM. Esse subconjunto oficial para navegador não é o catálogo completo de cores do RetroArch para Android, iOS, Windows, Linux e macOS; esses cores nativos não são binários compatíveis com o runtime web deste app. A disponibilidade do player exige Internet e pode variar.

### Formatos e BIOS

Use o seletor de sistema antes de abrir formatos compartilhados, como `.bin`, `.iso`, `.cue`, `.tap`, `.sna` ou `.zip`. Para mídias `.cue`, `.gdi` ou `.m3u`, selecione junto os arquivos de faixa referenciados; eles ficam guardados como parte do jogo. A extensão de uma ROM compactada não identifica sozinha o console. Os sistemas de computador mostram um botão de teclado virtual no player; mantenha uma tecla pressionada na tela para sustentar a entrada.

PS1, Sega CD e Saturn podem exigir BIOS. Nintendo DS com melonDS exige `bios7.bin`, `bios9.bin` e `firmware.bin`. 3DO e ColecoVision exigem BIOS. Atari 7800 e Lynx podem usar arquivos de sistema para compatibilidade. Dreamcast funciona melhor com `dc_boot.bin` e `dc_flash.bin`; Amiga pode precisar de Kickstart; PC-FX pode precisar de BIOS; jogos de CD da PC Engine podem exigir BIOS de CD. Os campos ficam em Configurações; os arquivos permanecem neste aparelho.

### PC virtual Windows XP experimental

Ative **Configurações → Menu de desenvolvedor → Modo de desenvolvedor → Abrir PC virtual**. Escolha uma ISO inicializável sua do Windows XP para instalar sem precisar procurar um `.img`; o app cria um disco virtual local de 2 GB. Quando aparecer a primeira tela azul do Setup, pressione **F5** e escolha **Standard PC**. Também é possível escolher um disco RAW já instalado (`.img`, `.hdd` ou `.bin`). Toque em **Parar e salvar** para guardar a sessão neste aparelho; para retomá-la, selecione a mesma ISO e a mesma memória. É necessário espaço local para o disco virtual e para o estado salvo (que inclui memória e alterações do disco). O app não fornece Windows nem licença. Algumas imagens não inicializam; veja os requisitos do v86. No Galaxy A15, comece com 256 MB de memória virtual; desempenho e compatibilidade do XP são experimentais.

PS2 e PS Vita ainda dependem das soluções externas exibidas no catálogo. Xbox e Xbox 360 continuam sem núcleo integrado neste app. O menu de desenvolvedor mostra esses estados para não confundir atalho com emulação local.

Arcade, DOSBox, 3DO, Saturn, N64, PSP e Dreamcast podem exigir bastante desempenho e espaço. A compatibilidade varia conforme o jogo e o aparelho. Doom precisa de um arquivo WAD compatível, fornecido pelo usuário. O app não fornece jogos, ROMs, BIOS ou firmware.

## Recursos

- Biblioteca local com busca, favoritos, histórico e ordenação.
- Exportação da ROM; discos com faixas associadas saem em um ZIP completo.
- Controles por toque adaptados ao sistema, cruz digital ou analógico, layout compacto ou expandido, tamanho e transparência ajustáveis, teclado virtual e controles Bluetooth com remapeamento no menu do EmulatorJS.
- Tela cheia imersiva, efeitos CRT, ajuste de tela, volume, vibração e tela sempre ligada.
- Runtime e núcleos locais no APK, sem download na primeira execução; cache local no navegador para os arquivos usados.
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

O runtime v86 é distribuído sob BSD-2-Clause. O SeaBIOS e o VGA BIOS incluídos usam as licenças GPL-3.0/LGPL-3.0; avisos, textos de licença e referências ao código-fonte acompanham o app em `v86/` e também estão em `third_party/v86-0.5.473/`. Atribuições, metadados de licença e repositórios dos núcleos estão em [ejs-data/THIRD_PARTY_NOTICES.md](ejs-data/THIRD_PARTY_NOTICES.md) e `ejs-data/cores/licenses/`. O app não distribui jogos comerciais, ROMs ou imagens do Windows.
