# myWik lokal entwickeln und auf dem Handy testen

Die App verwendet Expo und React Native mit TypeScript. Android, iOS und eine Web-Vorschau teilen sich den App-Code. Die erste Version enthält lokale Speicherung für die Offline-Nutzung; Cloud-Synchronisierung und KI erfordern die unten beschriebene Firebase-Einrichtung.

## Voraussetzungen

- Node.js 24 LTS und npm.
- Ein Firebase-Projekt (`meiwik` ist bereits in der Konfiguration eingetragen).
- Für installierbare Builds ein Expo-Konto; für spätere Veröffentlichung die jeweiligen Store-Konten.

## Projekt starten

```bash
git clone https://github.com/CornerDesign-Dominic/myWik.git
cd myWik
npm ci
npm start
```

Eine Browser-Vorschau startet mit `npm run web`. Für eine native Entwicklungsumgebung kann Expo Go verwendet werden, sofern dessen SDK-Version zur installierten Expo-Version passt. Native Berechtigungen und Benachrichtigungen müssen zusätzlich auf einem echten Gerät und in einem eigenen Build geprüft werden. Remote-Push funktioniert nicht in Expo Go auf Android.

## Prüfungen

```bash
npm run typecheck
npm test
npm run export:web
npm run export:native
```

`npm run check` kombiniert Typprüfung, Tests und Web-Export. Ein JavaScript-Bundle-Export ist kein signierter APK-/Store-Build und ersetzt keine Gerätetests.

## Firebase aktivieren

1. In Firebase Authentication den Anbieter **E-Mail/Passwort** aktivieren.
2. Die Firestore-Datenbank erstellen, wenn noch nicht vorhanden. Für echte Daten nicht mit offenen Testregeln arbeiten.
3. Die enthaltenen Firestore-Regeln und Indizes bereitstellen. Der Firebase-CLI-Login erfolgt auf deinem eigenen Rechner:

```bash
npx firebase-tools login
npx firebase-tools use meiwik
npx firebase-tools deploy --only firestore
```

4. Die Konfiguration für die Firebase-Web-App ist eine öffentliche Client-Konfiguration. Der Zugriffsschutz entsteht durch Authentication und Firestore-Regeln. Private Server-Schlüssel und OpenAI-Schlüssel gehören nicht in App-Code oder Git.
5. Benutzer melden sich in der App mit derselben E-Mail-Adresse an, um ihren Stand auf weiteren Geräten zu synchronisieren. Ohne Anmeldung bleibt die Nutzung lokal.

Die Cloud-Datenbank enthält Nutzerdaten; ein `git pull` sichert nur Dateien im Repository. Datenbank-Backups und Wiederherstellung werden im Firebase-/Google-Cloud-Projekt verwaltet.

## MeiWik einrichten

Der Chat benötigt die Firebase-Funktionen und einen serverseitigen OpenAI-Schlüssel. Die Konfiguration und Schutzmechanismen stehen in [MEIWIK.md](./MEIWIK.md). Ohne bereitgestelltes Backend zeigt die App einen Einrichtungsfehler; sie simuliert keine KI-Antworten.

## Installierbare Android-Testversion

Die App-Kennung ist `de.mywik.app`. Vor einer Veröffentlichung muss diese Kennung endgültig festgelegt werden.

### Test-APK über GitHub Actions ohne Expo-Konto

Im Repository unter **Actions → Android test APK → Run workflow** kann ein Android-Testbuild manuell gestartet werden. Der Workflow installiert die Werkzeuge, erzeugt das native Android-Projekt und baut eine APK mit eingebettetem JavaScript. Der fertige Build benötigt weder Expo Go noch einen laufenden Metro-Server. Ein Expo-/EAS-Konto und private Signierungsschlüssel sind für diesen Testweg nicht erforderlich.

Nach einem erfolgreichen Lauf unter **Artifacts → mywik-android-test-apk** die ZIP-Datei herunterladen, entpacken und `app-release.apk` auf dem Handy installieren. Der Build ist für ARM64-Android-Geräte bestimmt. Android kann eine ausdrückliche Erlaubnis zur Installation aus dieser Quelle verlangen.

Die App heißt **myWik Preview** und verwendet nur im Workflow die Kennung `de.mywik.app.preview`. Sie ist mit dem öffentlichen Testschlüssel aus der Expo-Vorlage signiert und darf **nicht** als Store-/Produktionsbuild veröffentlicht werden. Sie kann neben einer späteren Produktionsapp installiert werden. Lokale Daten der Preview bleiben eine separate Installation; Cloud-Daten werden nach Anmeldung über dasselbe Firebase-Konto synchronisiert.

Die native Projektgenerierung und die vorhandene Testsignierung wurden lokal geprüft. Ein vollständiger Gradle-/APK-Build wurde hier noch nicht ausgeführt; erst ein erfolgreicher Workflow-Lauf bestätigt, dass die APK tatsächlich gebaut wurde. GitHub Actions muss für das Repository aktiviert sein. Der erste Build kann wegen der Downloads und nativen Kompilierung länger dauern.

### EAS-Build mit eigener Signierung

```bash
npx eas-cli login
npx eas-cli init
npx eas-cli build --platform android --profile preview
```

`eas init` verknüpft das lokale Projekt mit deinem Expo-Konto und trägt die reale EAS-Projekt-ID ein. Es wurde absichtlich keine erfundene Projekt-ID hinterlegt. Das Profil `preview` erzeugt eine installierbare APK. `development` erzeugt einen Entwicklungsbuild; anschließend wird der lokalen Server mit `npx expo start --dev-client` gestartet.

EAS fragt nach den Android-Signierungsdaten und kann sie für dich erzeugen und verwalten. Zugangsdaten und Keystores nicht ins Repository einchecken. Nach erfolgreichem Build den APK-Link auf dem Android-Handy öffnen und die Installation erlauben.

## iOS und Stores

```bash
npx eas-cli build --platform ios --profile preview
npx eas-cli build --platform android --profile production
npx eas-cli build --platform ios --profile production
```

iOS-Gerätebuilds benötigen passende Apple-Signierung und in der Regel eine Apple-Developer-Mitgliedschaft. Das Android-Produktionsprofil erzeugt ein AAB für Google Play. Store-Einträge, Datenschutzangaben, Bildschirmfotos, App-Icon und endgültige MeiWik-Figur folgen vor der Veröffentlichung. Abos und öffentliche KI-Nutzungslimits sind noch nicht Teil der ersten Version.

## Benachrichtigungen und Offline-Test

- Die drei Erinnerungsarten sind unabhängig voneinander konfigurierbar.
- Lokale Erinnerungen benötigen eine Geräteberechtigung und können ohne Server ausgelöst werden.
- Echte serverseitige Push-Mitteilungen benötigen zusätzlich eine EAS-Projektverknüpfung und Android-FCM-/Apple-APNs-Zugangsdaten. Ein Client-Firebase-Web-Konfigurationsobjekt ersetzt diese Push-Zugangsdaten nicht.
- Einen echten Offline-Test im Flugmodus durchführen: Artikel öffnen, Notiz und Status ändern, App schließen und erneut öffnen. Nach Wiederherstellung der Verbindung Synchronisierung und Gerätewechsel prüfen.
- Das Bereitstellen eines neuen Programmbuilds lädt nicht automatisch zukünftige Artikel herunter; Inhaltsaktualisierung und lokale Verfügbarkeit werden separat verwaltet.

## Noch extern auszuführen

Die folgenden Schritte erfordern dein Konto beziehungsweise ein echtes Gerät und werden nicht durch das Einchecken des Codes erledigt: Firebase-Anbieter aktivieren, Regeln/Funktionen bereitstellen, OpenAI-Secret setzen, einen tatsächlichen APK-Build ausführen, Berechtigungen und Benachrichtigungen auf Android testen und später Store-Veröffentlichung vorbereiten. Eine EAS-Projektverknüpfung und eigene Signierung sind für den EAS-/Produktionsweg nötig; die oben beschriebene GitHub-Test-APK verwendet stattdessen eine getrennte Preview-Kennung mit öffentlicher Testsignierung.

## Validierungsumfang

Die GitHub-Prüfung führt nach einem sauberen `npm ci` die App-Typprüfung, die Logiktests sowie Web-, Android- und iOS-JavaScript-Bundle-Exporte aus. Separat werden die Funktionen installiert, getestet und kompiliert. Ein erfolgreicher CI-Lauf bestätigt diese Prüfungen für den jeweiligen Commit; er bestätigt keine bereitgestellten Firebase-Regeln, keinen Live-OpenAI-Aufruf und keinen signierten Gerätebuild.

Für die Native-Installation müssen daher zusätzlich ein echter APK-Build und Tests auf deinem Android-Handy abgeschlossen werden. Beim EAS-Weg kommen Projektverknüpfung und Signierung hinzu. Die Web-Vorschau und Bundle-Exporte ersetzen insbesondere keine Prüfung von Benachrichtigungsberechtigungen, Hintergrundverhalten oder nativer Offline-Speicherung.
