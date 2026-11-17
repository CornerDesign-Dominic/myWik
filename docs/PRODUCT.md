# Vereinbartes Produkt – myWik

Stand: 17. November 2026. Ziel: HQ Frühjahr 2027, danach mündliche Prüfung; langfristig vollständiger Wirtschaftsfachwirt und erweiterbare Themen.

## Inhalt und Navigation

- Fächer ohne sichtbare Nummern. Darunter logische Kapitel mit beliebiger Tiefe, zum Beispiel 1.2.3.4. Fachliche IDs bleiben bei Umbenennung/Verschieben stabil.
- Start-Cards: Fächer, Karteikarten, Deine Erfolge, Für später, MeiWik Empfehlungen.
- Fachliste → eingerücktes/aufklappbares Kapitelverzeichnis → Artikel.
- Fachsprache bleibt erhalten. Definitionen und Kurzerklärungen im Glossar; antippbare Begriffe zeigen eine Karte mit Definition, Beispiel und Weiterleitung.
- Artikel: Definition/Kurzerklärung, ausführliche Abschnitte, TOC mit Sprungfunktion, kontextabhängige Reiter (Beispiel/Praxis/Lösung/Formel/Rechenweg), sparsame aufklappbare Hinweise.
- Notizen pro Artikel/Abschnitt: persönlich oder Verbesserungshinweis, pro Nutzer editierbar.
- Status offen/unklar/weiterarbeiten/abgeschlossen plus unabhängiger Stern. Aktive Symbole im Kapitelverzeichnis. Statushistorie für Wiederholungen.

### Vereinbarte Fächer

Die oberste Ebene enthält diese 13 Fächer in der folgenden Reihenfolge. Fachnamen tragen keine sichtbaren Nummern; die Kapitelnummerierung beginnt innerhalb jedes Fachs neu.

| Fach | Dauerhafte interne ID |
| --- | --- |
| BWL | `bwl` |
| VWL | `vwl` |
| Rechnungswesen | `rechnungswesen` |
| Recht | `recht` |
| Steuern | `steuern` |
| Unternehmensführung | `unternehmensfuehrung` |
| Betriebliches Management | `betriebliches-management` |
| Investition und Finanzierung | `investition-finanzierung` |
| Controlling | `controlling` |
| Logistik | `logistik` |
| Marketing und Vertrieb | `marketing` |
| Führung und Zusammenarbeit | `fuehrung-zusammenarbeit` |
| Personal und Ausbildung | `personal` |

- Unternehmensführung behandelt Strategie und Organisation; Führung und Zusammenarbeit behandelt Führungsverhalten, Kommunikation und Konflikte. Personal und Ausbildung bündelt Personalplanung, Personalentwicklung und Ausbildungsmethoden.
- Investition und Finanzierung sowie Controlling sind eigenständige Fächer. Die Deckungsbeitragsrechnung bleibt als vorhandener Grundlagenartikel im Rechnungswesen; passende Verknüpfungen können später ergänzt werden.
- Die bisherige ID `personal` wird für Personal und Ausbildung weiterverwendet, damit die Leittextmethode sowie bestehende Karteikarten und Fachzeiten unter derselben ID erhalten bleiben. Artikel-, Kapitel-, Abschnitts- und Glossar-IDs werden nicht geändert. Status und Notizen behalten dadurch ihre Zuordnung.
- Ergänzte Kapitel sind zunächst reine Gliederungseinträge ohne vorgetäuschte Artikel. Die beiden vorhandenen Artikel bleiben inhaltlich unverändert.
- Der gebündelte Katalog hat Version 2. Ältere heruntergeladene Kataloge dürfen diese Gliederung beim Start nicht überschreiben. Eine Veröffentlichung in Firebase oder als App erfolgt erst nach ausdrücklichem Auftrag.

## Lernen

- Der Nutzer wählt selbst. Empfehlungen freiwillig, verschiebbar und verwerfbar.
- Karteikarten aus Begriffen/Abschnitten per Vorschlag erstellen; Vorder-/Rückseite frei bearbeiten, Ablage nach Fach. Keine automatische Quellenbindung oder Änderungsprüfung.
- Situationsaufgaben ausdrücklich nicht Teil der ersten Version.
- Aktive Artikelzeit inklusive artikelbezogener MeiWik-Unterhaltung; Kartenzeit separat. Keine Doppelzählung. Hintergrund/gesperrter Bildschirm pausiert; längere Inaktivität pausiert ebenfalls.
- Tagesstufen kumulativ: App besucht, 5/15/30/60 Minuten Gesamtlernzeit; Stern bei allen fünf Bedingungen. Kalender mit tatsächlichen Monatstagen, horizontal scrollbar, Monat vor/zurück. Gesamtzahlen pro Schwelle, Sterne, erledigte Empfehlungen und Fachzeiten getrennt nach Artikel/Karten.

## MeiWik

- Schwebender Button, artikelbezogener Chat, minimierbar ohne Kontextverlust. Eigenes Gespräch pro Artikel.
- Laufender Kontext enthält tatsächliche vorherige Fragen und Antworten. Lange Historien werden serverseitig zusammengefasst, nicht kommentarlos abgeschnitten.
- Chat lokal, 72 Stunden nach letzter Nachricht verwerfen; keine Offline-KI, kein Anspruch auf Chatsynchronisation zwischen Geräten. Für später gespeicherte Erkenntnisse unabhängig aufbewahren.
- Für später: Artikel/Abschnitt und Textstand, Frage, Antwort, vermutete Wissenslücke, Verbesserungsidee, Art (Wording/Struktur/Beispiel/fehlendes Wissen/Vertiefung), Bearbeitungsstand. Nachfrage ist keine sichere Wissenslücke; vorhandenen Text ebenfalls prüfen. Keine ungeprüfte automatische Artikeländerung.
- Empfehlungen zunächst regelbasiert: unklar → abgeschlossen → nach 7 Tagen Wiederholung anbieten. Erledigte Empfehlungen zählen.
- OpenAI serverseitig, authentifiziert, Größen-/Raten-/Verbrauchsgrenzen. Kostenmodell für öffentliche Nutzer später entscheiden.

## Daten, Plattform, Design

- Android zuerst; iOS von Beginn an vorbereitet. Mittelfristig Play Store. Firebase-Projekt `meiwik` mit JS-SDK/Webregistrierung.
- Artikel lokal vollständig verfügbar (anfänglicher gebündelter Inhalt plus optionaler Katalogdownload). Status, Notizen, Karten, Lernzeiten und Einstellungen pro Nutzer in Firestore. Lokale Änderungen offline möglich, später synchronisieren. Gastdaten nicht automatisch fremden Konten zuordnen.
- Drei unabhängige Benachrichtigungskategorien: Lernerinnerung, MeiWik Empfehlungen, Neues in der App. Je Kategorie aktiv/inaktiv, Uhrzeit und Tageintervall. Native lokale Erinnerungen; tatsächliche neue Inhalte nur melden, wenn sie bekannt sind.
- Datenbanksicherung vom Eigentümer in Firebase. Git sichert eingecheckten Code/Inhalte, nicht Firestore-Nutzerdaten.
- Ruhiges, ernstes Design mit gedämpftem Petrol, warmem Hellmodus, tatsächlich dunklem Dunkelmodus und gedämpfter heller Schrift. Erfolge dezent golden.
- MeiWik: kluger, süßer, hilfsbereiter kleiner Fabelwesen-Begleiter mit großen Augen und Brille. Kein Besserwisser. Vorschläge werden vor endgültiger Integration ausgewählt.

## Bewusst später

Vollständiger Lehrplan und regelmäßige KI-Inhaltsaudits, redaktioneller Pflegeprozess, Situationsaufgaben, Abonnements/öffentliche KI-Kontingente und endgültige Mascot-Gestaltung. Die erste Implementierung bietet eine breite funktionale Grundlage mit Beispielinhalten, kein fertiges vollständiges Fachwirt-Lehrbuch.

## Oberfläche nach dem ersten Handytest

- Seitliche Inhaltsränder halbiert: 11 statt 22 Punkte. Auch Karten, Dialoge und vertikale Abstände kompakter, ohne kleinere Touch-Ziele oder verkleinerte Leseschrift.
- Begriffsglossar als eigene Start-Card. Anmeldung und Registrierung ausschließlich in den Einstellungen.
- Fachübersicht nur mit Titel „Themen“, Kapitelansicht nur mit Fachüberschrift und Verzeichnis. Keine Platzhalter-, Test-/MVP- oder Entwicklungserklärungen in den Lernansichten.
- Technische Informationen, Versionsstände und Bedienungstipps stehen in den Einstellungen. Fachliche Hinweise bleiben beim Inhalt.
- Beispielbereiche erhalten dezente Flächen mit Rahmen. Persönliche Notizen erscheinen zurückhaltend und kursiv, mit klarer Kennzeichnung.
- Abschnittsaktionen einzeilig: Notiz, Karte, MeiWik. Notizlöschung erfordert eine Bestätigung; Abbrechen verändert nichts.
