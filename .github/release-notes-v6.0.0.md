# 16-Bit Arcade 6.0.0 — Grande Atualização Multiplataforma

Esta versão prepara os mesmos recursos do catálogo local para Android, iOS, Windows, Linux e macOS.

- Android: workflow gera APK assinado para sideload, com chave persistente para permitir atualizar versões futuras por cima.
- Windows x64: instalador `.exe`.
- Linux x64: `.AppImage` e `.deb`.
- macOS Apple silicon e Intel: `.dmg` e `.zip` sem assinatura Apple/notarização.
- iOS: compilação de simulador para validar o projeto. Instalação em iPhone e App Store ainda exigem assinatura Apple no Xcode.
- RetroArch Web Player: atalho ao player oficial no navegador. É complementar e externo; o catálogo local continua usando núcleos EmulatorJS.

O APK Android é para sideload e não configura publicação na Play Store. O app não inclui ROMs, BIOS, firmware ou imagens comerciais.
