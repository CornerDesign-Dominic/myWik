# MeiWik: Gespräch, Kontext und geschützte KI-Anbindung

## Bereits implementiert

- Firebase-Callable `meiwik` in `europe-west1` mit serverseitigem OpenAI-Responses-Aufruf.
- Keine KI-Schlüssel im App-Bundle. Der API-Schlüssel wird ausschließlich als Cloud-Functions-Secret gelesen.
- Firebase-Anmeldung ist erforderlich. Standardmäßig sind nur ausdrücklich freigegebene Firebase-UIDs erlaubt; eine neue Registrierung allein gewährt keinen KI-Zugriff.
- Der Server lädt den Artikel aus dem nur administrativ beschreibbaren Dokument `catalog/current` oder aus dem beim Build erzeugten Artikelkatalog. Ein vom Client veränderter Artikeltext wird nicht als freigegebener Inhalt übernommen.
- Aufgaben: Artikelgespräch, Zusammenfassen älterer Gesprächsschritte und Karteikartenvorschlag.
- Antworten und Verbesserungsideen sind strukturierte JSON-Ausgaben; Vorschläge werden nicht automatisch in Artikel geschrieben.
- OpenAI-Aufrufe verwenden `store: false`; dies ist keine Zusicherung über sämtliche gesetzlichen/providerseitigen Sicherheitsaufbewahrungen. Im Firestore werden keine Chattexte gespeichert.

## 72 Stunden Aufbewahrung

Jeder Artikel hat pro lokalem Nutzer einen eigenen Chat. Nach einer erfolgreichen Gesprächsrunde wird die Frist auf **72 Stunden seit dieser letzten Runde** gesetzt. Der Verlauf liegt ausschließlich im Gerätespeicher (AsyncStorage), getrennt nach Nutzer-ID und Artikel-ID.

Ab Ablauf wird kein alter Verlauf mehr angezeigt oder als KI-Kontext verwendet. Der physische lokale Datensatz wird beim nächsten Öffnen/Aufräumen entfernt; eine ausgeschaltete App kann keine Hintergrundlöschung zu einer garantierten Sekunde ausführen. Ein Neustart des Chats löscht den lokalen Verlauf sofort. „Für später“-Einträge sind eigenständige Nutzerdaten und bleiben erhalten.

Chats werden nicht geräteübergreifend synchronisiert. Bei Neuinstallation oder Geräteverlust gibt es keine Chatwiederherstellung. Die App zeigt offline keinen Chat an. Artikel, Notizen, Karteikarten, Status und Lernzeit funktionieren trotzdem offline.

## Kontext bleibt erhalten

Die letzten 16 Nachrichten werden wortgetreu mitgegeben, einschließlich Assistentenantworten. Eine Nachfrage wie „Warum?“ bezieht sich dadurch auf die unmittelbar vorherige Antwort. Bei längeren Gesprächen fasst der Server die älteren Nachrichten zusammen, bevor sie aus dem lokal gehaltenen Arbeitsverlauf entfernt werden. Die letzten zwölf Nachrichten bleiben nach dieser Verdichtung unverändert erhalten.

Erst wenn Zusammenfassung **und neue Antwort** erfolgreich zurückkommen, speichert `appendChatTurn` die verdichtete Fassung. Bei Fehlern bleibt der bisherige Verlauf unverändert. Offene Fragen, Beispiele und Korrekturen sollen in der Zusammenfassung enthalten sein. Eine Zusammenfassung kann Details verlieren; sie ersetzt kein fachliches Quellenarchiv.

## Einrichtung auf dem eigenen PC

1. Firebase Authentication öffnen und E-Mail/Passwort aktivieren. In der App ein Konto anlegen und dessen UID in der Firebase-Konsole nachsehen.
2. Firebase CLI anmelden und `npm --prefix functions ci` ausführen. Cloud Functions benötigt einen Firebase-Tarif, der die Bereitstellung dieser Funktionen unterstützt.
3. `functions/.env.example` nach `functions/.env.meiwik` kopieren und `MEIWIK_ALLOWED_UIDS` auf die eigene UID setzen. Private Datei nicht committen.
4. Das Secret interaktiv auf dem eigenen PC setzen:

   ```sh
   firebase functions:secrets:set OPENAI_API_KEY --project meiwik
   ```

   Den Schlüssel nur in der verdeckten CLI-Eingabe eingeben, nicht in Chat, Quellcode oder `.env.example`.
5. `npm --prefix functions run build` und `npm --prefix functions test` ausführen.
6. Firestore-Regeln und Funktionen bereitstellen:

   ```sh
   firebase deploy --only firestore:rules,firestore:indexes,functions:meiwik --project meiwik
   ```

7. In der App anmelden und einen Artikelchat testen. Funktionsbereitstellung, echte Authentifizierung, Quoten und OpenAI-Abrechnung müssen vor der persönlichen Nutzung am echten Gerät geprüft werden.

Die App enthält keine simulierten KI-Antworten, wenn der Server nicht verfügbar ist. Sie erklärt stattdessen, dass MeiWik noch eingerichtet oder freigeschaltet werden muss.

## Neue Lernartikel für MeiWik bereitstellen

Die APK und die Cloud Function werden getrennt ausgeliefert. Für neue Artikel im mitgelieferten Katalog die Function vom selben Quellstand wie die APK bereitstellen. Der Build erzeugt ihren Artikelkatalog neu. Ein Cloud-Eintrag hat für denselben Artikel Vorrang. Fehlt der Artikel dort, verwendet MeiWik den mitgelieferten Eintrag.

```sh
npm --prefix functions ci
firebase deploy --only functions:meiwik --project meiwik
```

Anschließend in der bereits installierten App bei einem neuen Logistikartikel „Neue Kartenvorschläge aus Quelle“ prüfen.

## Verbrauchsschutz

Vor jedem OpenAI-Aufruf reserviert eine Firestore-Transaktion ein konservatives Tokenbudget (UTF-8-Payloadbytes plus maximale Ausgabetokens). Diese bewusst großzügige Reservierung bleibt auch bei Timeout oder Anbieterfehler bestehen. Es gibt keine Annahme, dass ein API-Schlüssel allein ein hartes Geldlimit garantiert.

Standardwerte:

| Grenze | Wert |
|---|---:|
| Anfragen je Nutzer und UTC-Tag | 100 |
| Anfragen je Nutzer und Minute | 8 |
| Tokenreservierungen je Nutzer und UTC-Tag | 500.000 |
| Tokenreservierungen gesamt und UTC-Tag | 2.000.000 |
| Anfragen gesamt und Minute | 30 |
| Maximale Antworttokens | 2.200 |
| Maximale Fragenlänge | 4.000 Zeichen |

Eine Kontextverdichtung ist ein eigener Aufruf und zählt mit. Tokenreservierungen sind **kein tatsächlicher Tokenverbrauch** und kein Eurobetrag; sie begrenzen den möglichen Verbrauch konservativ. Modell und Tagesgrenzen können in der privaten Funktionskonfiguration geändert werden. `meiwikUsage` ist für Clients vollständig gesperrt.

Vor einer öffentlichen Veröffentlichung sind App Check, echte Tarif-/Nutzerbudgets, Missbrauchsschutz gegen Massenregistrierung, Kostenmonitoring und gegebenenfalls ein Abomodell erneut zu besprechen. `MEIWIK_ALLOW_ALL_AUTHENTICATED` bleibt bis dahin `false`. App Check ist als Deploy-Schalter vorbereitet, aber nicht als bereits eingerichtete Funktion dargestellt.

## Schnittstellen für die Oberfläche

```ts
getArticleChat(uid, articleId): Promise<ArticleChat>
saveArticleChat(uid, chat): Promise<void>
clearArticleChat(uid, articleId): Promise<void>
clearExpiredChats(): Promise<void>
appendChatTurn(chat, userText, reply, summary?): ArticleChat
sendArticleMessage(article, chat, userText, sectionId?): Promise<{
  reply: string;
  summary?: string;
  later?: { suspectedGap: string; suggestion: string; kind: LaterItem['kind'] } | null;
}>
generateFlashcard(article, selectedText?): Promise<{ front: string; back: string }>
```

Der Aufrufer ergänzt bei „Für später“ Artikel-/Abschnittskennung, Textstelle, tatsächliche Frage und Antwort sowie Fachzuordnung. `later` ist nur ein Verbesserungsvorschlag, keine Diagnose des Nutzers.

## Quellen zur Implementierung

- [OpenAI Responses API](https://developers.openai.com/api/reference/resources/responses/methods/create)
- [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs)
- [GPT-4.1 mini](https://developers.openai.com/api/docs/models/gpt-4.1-mini) – austauschbarer Standard, Verfügbarkeit vor Deployment prüfen
- [Firebase Callable Functions](https://firebase.google.com/docs/functions/callable)
- [Firebase App Check](https://firebase.google.com/docs/app-check/cloud-functions)

## Verifikation

`npm --prefix functions run build` kompiliert den Backend-Code und kopiert den aktuellen Artikelkatalog. `npm --prefix functions test` prüft Anfragegrenzen, Rollenvalidierung, Budgetreservierung und vertrauenswürdige Artikelauswahl. `tests/chat.test.ts` prüft Frist, Folgerunden und verlustbegrenzte Kontextverdichtung.

`npm --prefix functions run test:rules` startet ausschließlich den lokalen Firestore-Emulator mit der isolierten Projekt-ID `demo-mywik` und führt sechs Sicherheitstests aus. Geprüft werden eigene/fremde Nutzer, nicht angemeldete Zugriffe, öffentliche schreibgeschützte Artikel, gesperrte Verbrauchsdaten, Löschmarkierungen statt physischer Löschung und ungültige Daten. Diese sechs Tests sind lokal bestanden. Der Test bricht ohne lokale Emulatoradresse ab und verwendet kein produktives Firebase-Projekt. Ein eigener CI-Workflow führt dieselbe Prüfung mit Java 21 durch.

Ein Live-OpenAI-Aufruf, produktive Bereitstellung und echte Firebase-Auth-Anmeldung wurden nicht ausgeführt und sind nicht als bestanden zu verstehen.


## Lokale Chat-Anpassungen (noch nicht bereitgestellt)

Assistentenantworten werden auf Android/iOS/Web über denselben nativen Markdown-Renderer dargestellt: Hervorhebungen, Überschriften, Listen, Zitate, Code und horizontal scrollbarere Tabellen. Nutzertexte bleiben Klartext. HTML bleibt Text; Links lösen keine Navigation aus und Bilder werden nicht nachgeladen. Bereits gespeicherte Antworten werden ebenfalls formatiert.

Vor jeder Antwort, Karteikarte und Kontextverdichtung prüft ein separater strukturierter Modellaufruf den Lernbezug anhand der 13 Fächer, des Artikels und des Gesprächskontexts. Fachfremde Aufgaben und gemischte Anfragen werden abgewiesen; kurze fachliche Rückfragen und betriebliche Beispiele bleiben erlaubt. Ungültige oder ausgefallene Prüfungen erlauben keine Antwortgenerierung. Die eigentliche Antwort erhält zusätzlich dieselbe Themenregel. Eine rein modellbasierte Prüfung ist keine absolute Garantie gegen Umgehungen oder Fehlentscheidungen.

Beide Aufrufe werden vorab im bestehenden Nutzer-/Gesamtbudget reserviert und teilen sich ein Zeitlimit. Die Prüfung kostet zusätzliche API-Tokens und etwas Antwortzeit; abgewiesene Anfragen zählen ebenfalls zum Verbrauchsschutz. Anmeldung, UID-Freigabe, vertrauenswürdiger Artikelkatalog und Limits bleiben erforderlich. App Check ist weiterhin nicht aktiviert und muss vor einer öffentlichen Öffnung eingerichtet werden.

Lokale Prüfungen: Markdown-Logik (inklusive escaped Sternchen, Formeln, unvollständiger Syntax und HTML), Browserregressionen für kleine Ansichten/Formatierung sowie Android-/iOS-Bundle-Exporte. Echte native Tastaturen und Geräte wurden damit nicht geprüft. Der explizite Live-Test `functions/scripts/evaluate-scope.ts` verwendet API-Guthaben, erwartet `OPENAI_API_KEY` nur in der Prozessumgebung und testet die Fälle aus `scope-cases.json`; er läuft nicht automatisch in CI.

Diese Änderungen benötigen später sowohl ein App-Update (Darstellung/Tastatur) als auch ein Functions-Deployment (Themengrenze). Ein Push allein aktiviert sie nicht.


## Vereinbarte Karteikarten (lokal umgesetzt, noch nicht veröffentlicht)

Karten entstehen aus einem Artikel, einem Abschnitt, einem Glossarbegriff oder eigener Eingabe. Der gemeinsame Editor bietet zwei getrennte KI-Wege: die aktuelle Karte unter Beachtung eigener Änderungen verbessern oder neue Vorschläge aus der Quelle erstellen. Abschnitte enthalten auch Beispiele und Hinweise. Neue Vorschläge haben höchstens fünf eigenständige Lernziele und werden einzeln bearbeitet/gespeichert. Frage und Antwort bleiben jederzeit bearbeitbar; Herkunftshinweise erscheinen nicht in der Oberfläche. Artikel-/Abschnitts-ID und Version dienen nur der internen Zuordnung.

Dubletten: Lokaler Vergleich aller eigenen Karten, auch fachübergreifend nach normalisierter Frage/Antwort und Wortähnlichkeit. Online folgt eine semantische Prüfung; der Server liest ausschließlich Karten des angemeldeten Nutzers, ergänzt lokale noch nicht synchronisierte Kandidaten und wählt bis zu 40 relevante Vergleichskarten. Damit ist dies keine Garantie, jede sinngleiche Karte zu finden. Warnungen zeigen vorhandene Karten, erlauben deren Bearbeitung und bewusstes zusätzliches Speichern. Noch nicht lokal synchronisierte Cloudkarten werden erst nach Synchronisierung bearbeitbar, um bestehende Daten nicht zu überschreiben. Ohne KI-Verbindung bleibt lokale Prüfung möglich; nach KI-Fehlern ist Speichern ohne KI-Prüfung ausdrücklich wählbar.

Lernen: klassisch selbst beantworten und umdrehen oder die eigene Antwort im Kartenchat mit MeiWik besprechen. Das Feedback verändert weder Zähler noch Wiederholungstermine. Erst nach dem Umdrehen wählt der Nutzer selbst „Wusste ich“/„Wusste ich nicht“, unabhängig vom KI-Feedback. Überspringen zählt nicht. Kartenchat und Eingaben werden ausschließlich im Komponenten-Arbeitsspeicher gehalten, bei Kartenwechsel, Bearbeiten, Nutzerwechsel oder Verlassen verworfen; späte Antworten auf verlassene Übungen werden ignoriert. API-Aufrufe verwenden weiterhin store:false; das ist keine Aussage über sämtliche providerseitigen Sicherheitsaufbewahrungen.

Wiederholungen: Erfolgsserie mit Abständen 1, 3, 7, 14, 30, 60, maximal 90 Tage. „Wusste ich nicht“ setzt die Serie zurück und die nächste Wiederholung auf zehn Minuten; danach beginnt Erfolg wieder bei einem Tag. Gesamtzähler für gewusst/nicht gewusst sind getrennt sichtbar. Alte Karten behalten ihre früheren Wiederholungen als unaufgeschlüsselten Altbestand; unbekannte frühere Ergebnisse werden nicht erfunden. Bearbeitung kann optional Abstand/Serie zurücksetzen, ohne Gesamtzähler zu löschen. Der klassische Lernweg funktioniert offline.

Prüfungen: Logiktests zu Wiederholungen, Altbeständen, Dubletten und vollständigem Abschnittskontext; Backendtests zu Eingabebegrenzungen und strukturierten Antworten; Firestore-Regeltests im isolierten Emulatorprojekt demo-mywik. Browserregressionen prüfen unter anderem explizite Selbstbewertung nach negativem Feedback, fehlende Chatpersistenz, späte Antworten, Offlinebetrieb, Dubletten und mehrere einzeln gespeicherte Vorschläge. Testanmeldungen und Funktionsantworten werden dabei lokal gemockt, alle anderen externen Verbindungen blockiert. Optionaler WebKit-Lauf: MYWIK_TEST_WEBKIT=1 npm run test:browser (nach playwright install webkit). Echte Modellproben: functions/scripts/evaluate-cards.ts, explizit mit API-Guthaben und Schlüssel nur in der Prozessumgebung. Bundle-Exporte und Browsertests ersetzen keine nativen Geräte-/Tastaturtests.

Für die spätere Aktivierung sind ein App-Update, das Functions-Deployment sowie die aktualisierten Firestore-Regeln erforderlich. Es wurde nichts automatisch bereitgestellt.


## Lokale Prüfung: Speicherung, Synchronisierung und Kontotrennung

Lokale Snapshot-Schreibvorgänge bleiben pro Konto geordnet; fehlgeschlagene letzte Schreibstände bleiben im Arbeitsspeicher für einen erneuten Versuch erhalten. Laden wartet auf ausstehende Schreibvorgänge und kann keinen älteren Datenträgerstand über neuere ungespeicherte Änderungen legen. Beschädigte/inkonsistente Snapshots werden nicht durch leere Daten überschrieben. Die Oberfläche bietet erneutes Laden; lokale Schreibfehler erscheinen global mit einer Schaltfläche zum erneuten Speichern. Bei einem echten Speicherfehler kann eine nicht gespeicherte Änderung einen Prozessabbruch weiterhin nicht überleben: Die App weist deshalb darauf hin, geöffnet zu bleiben.

Ein expliziter Kontowechsel pausiert Bearbeitungen und wartet auf das lokale Speichern. Er wird bei einem Speicherfehler abgebrochen. Jede öffentliche Mutationsfunktion ist an ihre Kontogeneration gebunden, sodass veraltete UI-/Async-Callbacks keine Daten in ein nachfolgend angemeldetes Konto schreiben. Navigation, Editorzustände und Übungschats werden beim Kontowechsel neu aufgebaut. Gastdaten werden weiterhin weder in Konten übernommen noch gelöscht.

Synchronisierung verlangt vor einer Erfolgsmeldung einen bestätigten Serverabruf sowie erfolgreiche lokale Speicherung. Cache-/unbestätigte Listenerdaten reichen nicht für „synchronisiert“. Initiale Serverdaten werden vollständig eingelesen, danach bestätigte Änderungen. Neuere Bearbeitungen während eines laufenden Uploads bleiben in der Outbox. Ein Transaktionskonflikt wird auch dann erkannt, wenn er erst zwischen Vorabruf und Upload entsteht.

Löschmarkierungen gewinnen unabhängig von der Geräteuhr gegen Bearbeitungen derselben ID; Firestore-Regeln verhindern ebenfalls das Wiederbeleben einer gelöschten ID. Eine bewusste Wiederherstellung verwendet eine neue ID. Bei erkannten Konflikten von Notizen/Karten werden verdrängte lebende Fassungen als kontogetrennte lokale Konfliktkopien gehalten. Unter Einstellungen können sie als neue Kopie wiederhergestellt oder ausdrücklich verworfen werden. Konfliktkopien sind lokal, keine zusätzliche Cloud-Sicherung. Es erfolgt keine automatische fachliche Zusammenführung gleichzeitig veränderter Textfelder oder Karteizähler; Last-write-wins bleibt die Auswahlregel für nicht gelöschte Fassungen.

Artikelspeicher: Laden, Speichern, Zurücksetzen und Ablaufbereinigung laufen je Artikel/Konto geordnet. Die Bereinigung prüft den aktuellen Datensatz innerhalb dieser Reihenfolge erneut. Ein alter Schreibvorgang kann einen zurückgesetzten Chat nicht nachträglich wiederherstellen. Auch Katalogaktualisierungen werden vor Veröffentlichung geordnet gespeichert.

Prüfungen: separate Adaptertests für Schreibfehler, verzögerte Schreibvorgänge, drei Konten und beschädigte Dateien; Konflikt-/Löschtests; Browserprüfungen mit Gast, zwei synthetischen Konten und simuliertem Speichermangel sowie verspäteten KI-Antworten; Firestore-Regeltests und vier Mehrgeräte-Integrationstests mit dem echten SDK/Transaktions-/Listenercode im lokalen Emulatorprojekt demo-mywik. Der neue Befehl `npm --prefix functions run test:sync` benötigt vorher `npm ci` im Hauptprojekt und functions sowie Java 21. Kein Test verwendet dabei produktive Nutzerdaten. Echte Geräte-Neustarts und reale Netzwechsel auf Android/iOS bleiben gesondert zu prüfen. Es wurde nichts gepusht oder bereitgestellt.


## Lokale Prüfung: Lernzeit und Fortschritt

Die Lernuhr verwendet performance.now() für die Dauer und die lokale Kalenderzeit nur für die Tageszuordnung. Eine neue Interaktion nach Ablauf der zweiminütigen Inaktivitätsfrist kann keine vorherige Pause nachträglich mitzählen. Regelmäßige Erfassung bleibt bei 15 Sekunden; Restzeit einschließlich Sekundenbruchteilen wird beim Verlassen oder Kontowechsel abgeschlossen. Tagesübergreifende Intervalle werden am lokalen Mitternachtswechsel aufgeteilt. Ein erfasster Lerntag erhält auch seinen Besucheintrag. Uhrzeitänderungen können die Dauer nicht künstlich vergrößern; die Tageszuordnung folgt weiterhin der eingestellten Gerätezeit.

AppState, Android-Fokusverlust, Browser-Sichtbarkeit und Browser-Fokus steuern die Pause. Artikel-/MeiWik-Zeit und Kartenzeit sind getrennte, gegenseitig ausgeschlossene Ansichten. Vor dem Kontowechsel werden aktive Uhren noch mit dem alten kontogebundenen Schreiber abgeschlossen. Beim abrupten Beenden ohne Lifecycle-Ereignis kann das zuletzt noch nicht geschriebene Intervall (normalerweise bis zu 15 Sekunden) weiterhin fehlen; die Uhr misst Beschäftigung und keine garantierte Aufmerksamkeit.

Die Erfolgsansicht filtert Kalender, Tagessterne, Minutenstufen, Fachzeiten und abgeschlossene Empfehlungen auf denselben ausgewählten Monat. Sie bietet „Aktueller Monat“ und folgt ohne manuelle Monatsauswahl dem laufenden Kalender. Tages-/Fälligkeitsanzeigen werden regelmäßig und bei Rückkehr aktualisiert. Historische Tageszuordnungen werden nicht nach einer späteren Zeitzonenänderung umgeschrieben.

Statusänderungen erhalten eindeutig aufsteigende Zeitpunkte; reines Merken verändert die Statushistorie nicht. Wiederholungsempfehlungen beziehen sich auf die aktuelle Unklar-/Abschlussphase statt auf beliebige frühere Unklar-Einträge. Beim erneuten Öffnen/Bearbeiten des Lernstatus werden überholte offene automatische Empfehlungen verworfen; erledigte Empfehlungen bleiben als Historie erhalten. Neue Empfehlungen benötigen einen noch verfügbaren Artikel. „Nach sieben Tagen“ und „Morgen“ verwenden lokale Kalendertage und behalten die Uhrzeit bei Sommerzeitwechseln.

Prüfungen umfassen die reine Zeit-/Fortschrittslogik sowie Browserabläufe mit kontrollierter Uhr: lange Inaktivität und Wiederaufnahme, Mitternacht, Sichtbarkeit, Wechsel zwischen Artikel und Karten, Monatsauswahl, Merken und überholte Empfehlungen. Native Appwechsel/Bildschirmsperren benötigen zusätzlich echte Android-/iOS-Gerätetests. Es wurde nichts bereitgestellt.


## Lokale Prüfung: Artikel, Glossar und Navigation

Lesepositionen bleiben je Konto und Artikel getrennt. Die Wiederherstellung wartet auf gespeicherte Daten, Ansichtsgröße, Inhaltshöhe und Abschnittspositionen; feste Zeitverzögerungen sind entfernt. Neue Positionen speichern zusätzlich zum Pixelwert den Abschnitt und den Abstand dazu. Dadurch bleibt der Bezug bei verschobenen Abschnitten erhalten; entfernte Abschnitte fallen auf den begrenzten Pixelwert zurück. Vorhandene reine Pixelwerte bleiben lesbar. Schreibvorgänge und folgende Lesevorgänge laufen je Schlüssel geordnet, auch beim schnellen Wechsel zwischen Artikel und Glossar. Eigene Interaktion beendet eine noch ausstehende Wiederherstellung. Lesepositionen sind weiterhin lokal und werden nicht zwischen Geräten synchronisiert.

Das Glossar sucht in Begriff, Definition und Beispiel, berücksichtigt mehrere Suchwörter unabhängig von deren Reihenfolge sowie deutsche Umlautschreibweisen. Der Einstieg über einen Artikelbegriff öffnet und zeigt den passenden Eintrag. Suche, aufgeklappter Begriff und Scrollposition bleiben innerhalb des Navigationsverlaufs erhalten. Lange Definitionen im Begriffsdialog sind scrollbar, sodass die Aktion zum vollständigen Glossar erreichbar bleibt.

Wiederholtes Antippen desselben Navigationsziels erzeugt keine zusätzlichen identischen Ansichten. Die Zurück-Navigation erhält Glossarkontext und eingeklappte Kapitelgruppen. Der Startseitenknopf leert den Verlauf. Der allgemeine MeiWik-Knopf öffnet wieder den Artikelkontext, statt versehentlich den zuletzt ausgewählten Abschnitt weiterzuverwenden. Fachübersichten unterscheiden verfügbare Artikel von geplanten Inhalten; nicht verfügbare Kapitel sind mit „Inhalt folgt“ gekennzeichnet.

Notizen zu inzwischen entfernten Abschnitten oder Absätzen bleiben am Artikel sichtbar und bearbeitbar. Beispiele können auch nach einer Verkürzung ihrer Registerliste dargestellt werden. Aufgeklappte Bereiche und gewählte Register melden ihren Zustand an Screenreader und Browser. Der Katalogvalidator verwirft ungültige Kennungen, unerreichbare Artikel, fehlerhafte Querverweise und falsch typisierte optionale Inhaltsfelder vollständig; der vorhandene Offlinekatalog bleibt bei einer solchen Aktualisierung erhalten.

Prüfung: Navigations-, Such-, Katalog- und Lesepositionslogik mit `npm test`; vollständige mobile Browserabläufe mit `npm run test:browser` unter Chromium und mit `MYWIK_TEST_WEBKIT=1` unter WebKit. Dazu gehören kleine Ansichten, Glossar-/Artikelwechsel, alte Lesepositionen, Inhaltsverzeichnis, Register, entfernte Notizanker und sehr lange Definitionen. `npm run typecheck`, `npm run export:web` und `npm run export:native` prüfen Typen und die Web-/Android-/iOS-Bündel. Browseremulation und native Bündelprüfung ersetzen keine echten Gerätetests für Android-Zurücktaste, Touch-Textauswahl, Screenreader und die Bildschirmtastatur. Es wurde nichts gepusht oder veröffentlicht.

Ergebnis dieser lokalen Prüfung: 59 Logiktests, jeweils 25 Browserabläufe unter Chromium und WebKit sowie Typprüfung und Web-/Android-/iOS-Exporte bestanden. `git diff --check` meldet keine Formatierungsfehler.
