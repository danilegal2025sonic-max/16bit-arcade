## 16-Bit Arcade 5.3.0 — Primeiro Port

- App desktop para Windows x64 (`.exe`) e Linux x64 (`.AppImage` e `.deb`).
- Electron serve os arquivos do app pelo protocolo local seguro `arcade://app/`, sem abrir servidor localhost.
- Projeto iOS nativo criado com Capacitor e Swift Package Manager; o workflow macOS valida a compilação para simulador.
- Mantém os núcleos, saves e importação local de ROMs do app existente.

O port iOS ainda precisa ser assinado no Xcode com uma conta Apple para instalação em iPhone ou envio à App Store. A versão PWA pode ser adicionada à Tela de Início pelo Safari.
