# myWik

Persönliche Lern-App für den Wirtschaftsfachwirt: Wissen gemeinsam erarbeiten, offline nachschlagen, Karteikarten wiederholen und Fortschritt nachvollziehen. Native Android-/iOS-App auf Expo/React Native mit zusätzlicher Browser-Vorschau.

## Start

```sh
npm ci
npm start
```

Browser-Vorschau: `npm run web`. Prüfungen: `npm run typecheck`, `npm test`, `npm run export:web`. Anleitung zur APK, Firebase und KI: [docs/SETUP.md](docs/SETUP.md). Vereinbarter Umfang: [docs/PRODUCT.md](docs/PRODUCT.md).

## Was bereits ohne Backend funktioniert

Die mitgelieferten Beispielartikel, Glossar, Inhaltsverzeichnisse, Notizen, Artikelstatus, editierbare Karteikarten, aktive Lernzeit und Monatsstatistik funktionieren lokal. Daten eines Gasts bleiben getrennt von angemeldeten Konten. Anmeldung, geräteübergreifender Abgleich und MeiWik erfordern die in der Einrichtung beschriebenen Firebase-Freischaltungen bzw. das Deployment.

Die Firebase-Webkonfiguration identifiziert das Projekt und ist kein Admin-Zugang. Der OpenAI-Schlüssel gehört ausschließlich in den serverseitigen Secret Store. Firestore-Regeln müssen vor der Nutzung veröffentlicht werden.

## Noch keine Store-Veröffentlichung

EAS-Buildprofile sind vorbereitet. Android-Signierung, EAS-Projekt, Firebase-Deployment und Store-Konten werden vom Eigentümer eingerichtet; es werden keine Zugangsdaten, veröffentlichten Builds oder aktiven KI-Antworten vorgetäuscht. Die Figur MeiWik wird separat ausgewählt.
