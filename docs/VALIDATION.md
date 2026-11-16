# Validierungsstand

## Lokal geprüft

- TypeScript-Prüfung der App.
- 24 Tests für Katalogintegrität, Offline-Konflikte, Nutzerdatenformen, Chat-Aufbewahrung und Gesprächskontext, Lernzeit, Erinnerungsintervalle und Sommerzeitwechsel.
- Drei Backendtests für Eingabeprüfung, Verbrauchslimits und vertrauenswürdige Artikel.
- Web-Bundle sowie Android-/iOS-JavaScript-/Hermes-Bundles erzeugt.
- Serverseitiges TypeScript-Build inklusive Übernahme des Beispielkatalogs.

## Noch nicht verifiziert

- Browser-/Screenshot-Durchlauf: Chromium ließ sich in dieser Arbeitsumgebung wegen gesperrter Prozess-Sockets nicht starten. Der Web-Export ist erfolgreich, ersetzt jedoch keinen visuellen Laufzeittest.
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
