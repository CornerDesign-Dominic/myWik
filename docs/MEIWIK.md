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
