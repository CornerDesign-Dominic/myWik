# Validierungsstand

## Lokal geprüft

- TypeScript-Prüfung der App.
- 24 Tests für Katalogintegrität, Offline-Konflikte, Nutzerdatenformen, Chat-Aufbewahrung und Gesprächskontext, Lernzeit, Erinnerungsintervalle und Sommerzeitwechsel.
- Sechs echte Firestore-Emulatortests im isolierten Projekt `demo-mywik`: Nutzertrennung, Katalog-/Verbrauchsschutz, Löschmarkierungen und Schema-Prüfung. Keine produktiven Datenzugriffe.
- Drei Backendtests für Eingabeprüfung, Verbrauchslimits und vertrauenswürdige Artikel.
- Web-Bundle sowie Android-/iOS-JavaScript-/Hermes-Bundles erzeugt.
- Serverseitiges TypeScript-Build inklusive Übernahme des Beispielkatalogs.
- Zwei erfolgreiche mobile Chromium-Browserdurchläufe in GitHub Actions: Artikel/Glossar, Notizen/Status, Offline-Kartenerstellung und -bearbeitung, Persistenz nach Neuladen, Tastatureingaben sowie Hell-/Dunkelkontrast ≥ 7:1.
- Tatsächliche Android-ARM64-Test-APK mit eingebettetem JavaScript und getrennter Preview-Kennung erfolgreich in GitHub Actions gebaut (Run 43961565620).

## Noch nicht verifiziert

- Live-Anmeldung, Zwei-Geräte-Synchronisation und produktive Firestore-Regeln: erst nach Freischaltung/Deployment am eigenen Firebase-Projekt.
- Echte OpenAI-Antworten, Kostenmessung und KI-Qualität: erst nach Secret, Konto-Freigabe und Functions-Deployment.
- Android-Installation, Benachrichtigungen, Offline-Kaltstart und reale Darstellung auf dem Handy; iOS-Gerätetest ebenfalls offen.
- Signierter Store-Build und Store-Veröffentlichung.

## Erster Gerätedurchlauf

1. Gast starten, beide Beispielartikel lesen und Glossar öffnen.
2. Notizen auf Artikel/Abschnitt/Absatz speichern; Status und Stern ändern.
3. Karte erstellen, Vorder-/Rückseite bearbeiten, Antwort aufdecken und bewerten.
4. App ohne Netz kalt starten. Inhalte, Notizen, Status und Karten müssen vorhanden bleiben; MeiWik meldet offline.
5. Mit einem Konto anmelden, Daten ändern; zweites Gerät mit demselben Konto anmelden und Abgleich prüfen.
6. Ohne Netz Änderungen vornehmen, wieder verbinden, Abgleich prüfen. Gastdaten und fremde Konten dürfen sich nicht vermischen.
7. Artikel/Karten öffnen, Hintergrund und Inaktivität prüfen; keine doppelte Zeitzählung. Monatswechsel und Schwellen prüfen.
8. Drei Erinnerungsarten mit getrennten Uhrzeiten/Intervallen testen; Berechtigung verweigern und erneut freigeben.
9. Nach KI-Freischaltung Frage plus Nachfrage testen; Chat minimieren, zurückkehren, 72-Stunden-Ablauf und gespeicherten Für-später-Eintrag prüfen.
