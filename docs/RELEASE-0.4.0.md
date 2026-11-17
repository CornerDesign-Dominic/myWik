# myWik 0.4.0 – Android-Testupdate

Diese Version bündelt die seit 0.3.0 lokal gesammelten Verbesserungen.

- Chat: formatierte Antworten, angepasster Tastaturbereich und serverseitige Prüfung des Lernbezugs.
- Karteikarten: Erstellung zu Artikeln und Abschnitten, mehrere KI-Vorschläge, Duplikatprüfung, jederzeit bearbeitbare Fragen/Antworten, flüchtiger Übungschat und ausschließlich eigene Bewertung „gewusst/nicht gewusst“.
- Wiederholung: Erfolgsserie, passende Abstände und sichtbare eigene Zähler.
- Speicherung: geordnete Schreibvorgänge, Wiederholung nach Speicherfehlern, strikte Trennung zwischen Gast und Konten, Konfliktkopien und Schutz vor dem Wiederbeleben gelöschter Daten.
- Lernzeit und Fortschritt: zuverlässigere Inaktivitäts-/Hintergrundpausen, Tageswechsel und Monatsauswertung.
- Artikel und Glossar: erhaltene Leseposition, erweiterte Suche, bessere Zurück-Navigation, scrollbarere Begriffsdefinitionen und weiterhin erreichbare Notizen aus entfernten Abschnitten.

## Installation

Die Android-Test-APK verwendet dieselbe Kennung `de.mywik.app.preview` und dieselbe Expo-Testsignierung wie 0.3.0, nun mit Versionscode 4. Die APK über die vorhandene Test-App installieren. Nicht vorher deinstallieren: Lokale Gastdaten und Artikelchats werden durch Deinstallation entfernt. Die Installation auf einem echten Gerät und das Verhalten mit dessen Tastatur sind separat zu prüfen.

Dies ist die bisherige ARM64-Testversion, keine Store-Veröffentlichung. iOS-Code und JavaScript-Exporte sind geprüft; ein signierter iOS-Gerätebuild gehört nicht zu diesem Android-Update. Für die neuen KI-Aufgaben und Synchronisierung gehören die aktualisierte Firebase-Funktion `meiwik` und Firestore-Regeln zum Update.

## Verifikation vor Bereitstellung

59 App-Logiktests, jeweils 25 Browserabläufe unter Chromium und WebKit, App-Typprüfung und Web-/Android-/iOS-JavaScript-Exporte sind bestanden. Zusätzlich werden Backendtests, Backendbuild, Firestore-Regeltests und Mehrgeräte-Synchronisierung im lokalen Emulator vor Bereitstellung erneut geprüft. GitHub Actions prüft den gepushten Stand und erzeugt die installierbare APK.
