# myWik 0.8.0 – schneller offline lernen

- myWik öffnet Artikel einzeln aus dem lokalen Katalog. Glossar und Kapitelverzeichnisse bauen beim Öffnen nur die benötigten Zeilen auf.
- Lange Artikel öffnen an der gespeicherten Lesestelle. Alle 137 mitgelieferten Artikel sind offline verfügbar.
- Neue Inhalte können fachweise geladen werden. Die Synchronisierung überträgt nur ausstehende lokale Änderungen und verarbeitet nach dem ersten Kontenabgleich neue Änderungen vom Server.
- Vorhandene Artikel- und Abschnitts-IDs sowie die Speicherplätze für Notizen, Karteikarten und ausstehende Änderungen bleiben erhalten. Die APK direkt über der installierten 0.7.0 installieren.

Die aktualisierte Firebase-Funktion `meiwik` ist in `europe-west1` aktiv und enthält denselben Katalog mit 137 Artikeln. Der [Android-Build](https://github.com/CornerDesign-Dominic/myWik/actions/runs/44309405945) prüft die in der APK enthaltene Offline-Datenbank. Im Android-Emulator blieben eine in 0.7.0 angelegte Notiz und Karteikarte nach dem Update im Flugmodus abrufbar.
