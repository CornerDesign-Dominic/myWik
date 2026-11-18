# Logistik: Seitenabgleich Kapitel 4 – Rationalisierung

## Geprüfter Umfang und Arbeitsweise

Geprüft wurden die bereitgestellten OCR-Seiten `p093.txt` bis `p099.txt` und die entsprechenden Seiten des vollständigen PDFs **Logistik – Sicherung.pdf**. Die besonders fehlerhaften OCR-Bereiche wurden an gerenderten PDF-Seiten überprüft: Matrix und Strategien auf PDF 94–95, Wertstromabbildung auf PDF 96 sowie Exkurs und weitere Rationalisierungsaspekte auf PDF 97–98. Die Seitenzählung des PDFs ist nicht mit der gedruckten Seitennummer identisch: PDF 94–99 entsprechen hier den gedruckten Seiten 100–105.

Zusätzlich abgeglichen: Lösungshinweis zu Kapitel 4 auf PDF 111, gedruckte Seite 119; relevante Glossareinträge auf PDF 115, gedruckte Seite 123; Stichwortregister PDF 118–119 als Themencheck. Der Lösungshinweis bestätigt Ziel, Aufnahme des Informations-/Materialflusses und anschließende Verbesserung; er nennt dabei Value Stream Mapping, Value Stream Design und Value Stream Planning.

Die bestehende Einführungs-, Beispiel- und Fragenstruktur bleibt erhalten. Ergänzungen werden über `src/data/logistik-plus-rationalisierung.ts` zugespielt. Vorhandene Artikel- und Abschnitts-IDs werden nicht ersetzt. Neue Abschnitte besitzen eigene stabile IDs. Eigene Zahlenbeispiele sind als Annahmen erkennbar und keine Rekonstruktion fremder Aufgaben.

## Stoffliste und konkrete Ergänzungen

| Quellenstelle | Fachlicher Gehalt / Lernziel | Zielartikel (Lesson.id) | Vorheriger Stand | Ergänzung / Stand nach Integration |
| --- | --- | --- | --- | --- |
| PDF 93–94, Kapitelauftakt und gedruckte S. 100 | Rationalisierung definieren; technische, gesetzliche, kunden-, mitarbeiter-, produktmix- und wettbewerbsbezogene Anlässe erklären | **neu:** `rationalisierung-grundlagen`, 4.0 | Kein eigenständiger Grundlagenartikel; Gedanken auf Einzelmethoden verteilt | Gesamtprozess, Daten-/Zahlungs-/Bestandsübergaben einer Rückgabe, Anlässe, Zielkonflikte und messbare Bewertung; eigenes Produktivitätsbeispiel und Transfer |
| PDF 94, gedruckte S. 100, Abb. 4.1 | Zwei Achsen und vier Felder der Beschaffungsmatrix lesen; ABC und Risiko getrennt beurteilen | `beschaffungsportfolio` | Vier Felder und grobe Strategien vorhanden, Vorgehen und Risikokatalog knapp | Reihenfolge der Bewertung, A-/C-Darstellung des Buchs mit begründeter Einordnung anderer Klassen, alle genannten Risikoarten, vier konkrete Strategien, eigener Vergleich und veränderte Marktlage |
| PDF 94–95, gedruckte S. 100–101 | Hebel-, Schlüssel-, Engpass- und unkritische Produkte unterschiedlich behandeln | `beschaffungsportfolio` | Maßnahmen meist stichwortartig | Mengenbündelung/Wettbewerb/mittelfristige Bindung; langfristige Zusammenarbeit und Make-or-Buy-Prüfung; Verfügbarkeitsabsicherung/Puffer; Prozessautomatisierung und Nachschubübertragung mit Grenzen |
| PDF 95, gedruckte S. 101, 4.2 | Global Sourcing entlang der gesamten Wertschöpfungskette beurteilen | `weltweiter-einkauf` | Grundlegender Kostenvergleich vorhanden | Chancen nach Beschaffungsstufe, internationale Übergaben, systematischer TCO-Vergleich ohne Doppelzählung, eigene Jahresrechnung mit Sensitivität, Risiko- und Nachhaltigkeitsabwägung |
| PDF 95–96, gedruckte S. 101–102, 4.3 / Tab. 4.1 | Kundenwert, Fehlervermeidung und sieben Muda-Arten erklären und Fälle zuordnen | `muda` | Sieben Arten in einem Absatz genannt | Jede Art mit eigener Erklärung und Beispiel; Transport/Bewegung abgrenzen; notwendige nicht wertschöpfende Schritte erkennen; Checkliste in Ursachenprüfung und überprüfbare Maßnahmen übersetzt |
| PDF 96, gedruckte S. 102, 4.3.2 / Abb. 4.2 | Material-/Informationsfluss, Datenboxen und Zeitlinie lesen; Ist und Soll unterscheiden | `wertstromanalyse` | Kurzer Ist-/Soll-Text und ein Rechenbeispiel vorhanden | Systematisches Vorgehen, Erklärung aller wesentlichen Bildbestandteile und der lesbaren Zeitwerte, Einheiten-/Bezugsgrößenprüfung, eigenes serielles Rechenbeispiel mit Alternativen und Grenzen |
| PDF 97, gedruckte S. 103, Exkurs | Lean, TQM, KVP/Kaizen, Six Sigma und gemeinsame Verbesserungsgrundsätze einordnen | **neu:** `prozessverbesserung`, 4.3.6 | Kein eigener Artikel; bloße Nennung wäre keine Erklärung | Eigenständige Abgrenzung, Prozessorientierung, kleine Schritte, Daten/Messung, neues Denken, angemessener Perfektionismus, Team/Qualitätszirkel, Ideenmanagement, Stabilität und Fortsetzung; PDCA/DMAIC als gekennzeichnete fachliche Vertiefung |
| PDF 97, gedruckte S. 103 | E-Business mit Prozessintegration und Anwendungsbeispielen erklären | `vmi-milk-run` | Elektronische Nachrichten beiläufig vorhanden | Eigener Abschnitt mit Begriff, Shop/Auktion/Portal/Tracking, Stammdaten und durchgängiger Rückgabeverarbeitung |
| PDF 97, gedruckte S. 103 | VMI-Verantwortung, Daten und Mindest-/Höchstgrenzen erklären | `vmi-milk-run` | Kurze Definition vorhanden | Vereinbarungen, Qualitätsanforderungen an Daten, Ausnahmebehandlung sowie Abgrenzung zu Konsignation und Eigentum |
| PDF 97, gedruckte S. 103; Glossar PDF 115 / S. 123 | Pull/Push und dezentralen Nachschub erklären; Quelle und Senke benennen | `kanban` | Grunddefinition und einfaches Signalbeispiel vorhanden | Signal gegen Materialflussrichtung, Umlaufbegrenzung, Voraussetzungen und Störungsregeln; Glossarbegriffe Push/Pull sowie ausdrücklich logistische Quelle/Senke |
| PDF 98, gedruckte S. 104 | Milk Run inner-/überbetrieblich, Routenzug und Leergutkreislauf erklären | `vmi-milk-run` | Überbetriebliche Abholung knapp vorhanden | Feste Routen/Zeitfenster, innerbetriebliche Montageversorgung, Behälterkreislauf, Bündelung, Leerfahrten und Grenzen der Auslastungsoptimierung |
| PDF 98, gedruckte S. 104; Glossar PDF 115 / S. 123 | RFID-System und Unterschied zur optischen Erfassung erklären und Einsatz bewerten | `rfid` | Grundlegender Vergleich vorhanden | Tag/Reader/Datenverarbeitung, aktiv/passiv als Vertiefung, realistische Pulkerfassung, Fehl-/Mehrfachlesungen, Pilotversuch, tatsächliche Kosten/Nutzen |
| PDF 98, gedruckte S. 104 | Logistikgerechte Konstruktion, Materialstandardisierung, Typung, Normung und Wertanalyse anwenden | `produktportfolio` | Varianten/Gleichteile/späte Differenzierung knapp vorhanden | Frühzeitige Konstruktion/Einkauf/Logistik, getrennte Begriffe, sämtliche Instrumente des Buchs, Folgekosten, eigene Teilevielfaltsrechnung und Grenzen |
| PDF 99, gedruckte S. 105; Lösung PDF 111 / S. 119 | Ziel und Vorgehen der Wertstromanalyse in einem Handout auf einen Betrieb übertragen | `fall-rationalisierung` und `wertstromanalyse` | Eigenständiger Versandfall mit Zeiten und Muda vorhanden | Zusätzlicher Handout-Auftrag samt eigenständigem Musteraufbau; Ist/Soll/Umsetzungsplan, messbare Zielwirkung und Kontrolle. Die ursprüngliche Prüfungssituation wird nicht abgeschrieben. |

## Grafiken und OCR-Befunde

### Abbildung 4.1: Portfoliomatrix

An der PDF-Seite 94 visuell verifiziert:

- Senkrechte Achse: **ABC-Einteilung**, oben A-Artikel, unten C-Artikel.
- Waagerechte Achse: **Versorgungsrisiko**, links niedrig, rechts hoch.
- Oben links Hebelprodukte, oben rechts Schlüsselprodukte, unten links unkritische Produkte, unten rechts Engpassprodukte.

Die Ergänzung gibt die fachliche Einordnung wieder und erklärt die notwendige Beurteilung beider Dimensionen. Die Abbildung wird nicht als Marketing-BCG-Matrix interpretiert. Die Buchgrafik zeigt keine B-Klasse und keine allgemeingültigen numerischen Grenzwerte; beides wird deshalb nicht erfunden.

### Abbildung 4.2: Wertstromanalyse

An der PDF-Seite 96 visuell verifiziert:

- Materialfluss vom Lieferanten über **Prozess X, Y und Z** zum Kunden.
- Planungsstelle **MRP** mit Informationspfeilen zu den drei Prozessen und dargestellten elektronischen Informationsverbindungen.
- **Datenboxen** an den drei Prozessen.
- Zeitlinie: **7 Tage – 10 Sekunden – 15 Tage – 20 Sekunden – 22 Tage – 45 Sekunden – 5 Tage**.
- Die Sekundenanteile ergeben **75 Sekunden**, die Tagesanteile **49 Tage**.
- Rechts stehen die Beschriftungen **Wertsteigerung: 75 Sek.** und **Durchlaufzeit: 49 Tage**.

Der OCR-Auszug allein enthielt diese Zusammenhänge nicht. Der anfängliche Unsicherheitsvermerk ist durch die PDF-Prüfung erledigt. Die Ergänzung erklärt die Gegenüberstellung und weist auf die schematische Darstellung in unterschiedlichen Einheiten hin. Für eine exakte Addition wären es bei entsprechender gleicher Bezugsgröße 49 Tage plus 75 Sekunden; für einen exakten Prozentvergleich müssten Kalender-/Arbeitszeit und Bezugsobjekt festgelegt werden. Eine konkrete 24-Stunden- oder Schichtannahme wird nicht in die Buchgrafik hineingelesen. Ebenso wird nicht behauptet, jede Bearbeitungssekunde sei automatisch wertschöpfend.

### Weitere OCR-Korrekturen

- PDF 97 nennt **Six Sigma**; die OCR gibt den Begriff nur verstümmelt wieder. Visuell geklärt.
- PDF 98 beschreibt **Milkrunprinzip/Routenzug** und **Materialstandardisierung**; die stark beschädigten Anfangszeilen wurden am PDF geprüft.
- Der gedruckte Lösungshinweis auf PDF 111 benennt Mapping, Design und Planning. Die Erklärung erhält die Aufgabe mit zwei grundlegenden Schritten und erläutert die drei englischen Fachbegriffe, ohne daraus eine widersprüchliche andere Aufgabenforderung zu machen.
- Beim RFID-Text werden historische beziehungsweise vereinfachende Aussagen nicht ungeprüft verallgemeinert: Pulkerfassung ist von technischen Randbedingungen abhängig; Kosten werden für den konkreten Einsatz geprüft. Es gibt keine pauschale Aussage über heutige weltweite Verbreitung oder Tagpreise.

## Eigenständige Ergänzungen und Fachquellen

Die folgenden Vertiefungen gehen über die knappe Buchdarstellung hinaus: Trennung notwendiger nicht wertschöpfender Schritte von sofort vermeidbarer Verschwendung; Risikokorrelation bei mehreren Lieferanten; echte Gesamtkosten/Sensitivität; Abgrenzung der Verbesserungsansätze und PDCA/DMAIC; aktiv/passiv bei RFID und Regeln gegen Fehlbuchungen. Die originären Buchthemen bleiben dadurch erkennbar und werden nicht ersetzt.

- Lean Enterprise Institute: [Seven Wastes](https://www.lean.org/lexicon-terms/seven-wastes/), [Value Stream Mapping](https://www.lean.org/lexicon-terms/value-stream-mapping/).
- NIST: [Value Stream Mapping](https://www.nist.gov/mep/value-stream-mapping).
- US EPA: [E3 Value Stream Mapping How-to Guide](https://www.epa.gov/e3/e3-value-stream-mapping-how-guide).
- ASQ: [Continuous Improvement](https://asq.org/quality-resources/continuous-improvement/), [DMAIC](https://asq.org/quality-resources/dmaic), [Six Sigma](https://asq.org/quality-resources/six-sigma).
- ETH Zürich, OPESS: [Total Cost of Ownership in a Global Supply Chain](https://opess.ethz.ch/course/section-2-1/2-1-3-total-cost-of-ownership-in-a-global-supply-chain/).
- GS1: [RFID-System](https://support.gs1.org/support/solutions/articles/43000734380-how-does-an-rfid-system-work-), [aktive/passive Tags](https://support.gs1.org/support/solutions/articles/43000733398-what-is-the-difference-between-passive-and-active-tags-), [RFID-Grundlagen](https://www.gs1uk.org/knowledge-hub/standards/what-is-rfid).

Stand der direkten Quellenprüfung: 18. November 2026. Es werden keine konkreten Prüfungswahrscheinlichkeiten behauptet.

## Rechenprüfung und Integrationshinweise

- Neue Grundlagenaufgabe: 240 / 6 = 40 Aufträge/h; 240 / 5 = 48 Aufträge/h; Produktivitätsplus 20 %, Zeitminus rund 16,7 %. Transfer: 300 / 10 = 30; 300 / 8 = 37,5 Aufträge/h; Plus 25 %, Zeitminus 20 %.
- Standardisierung: acht Ausführungen werden zu einem Normteil plus zwei nötigen Sonderteilen = drei Ausführungen; Verringerung um fünf beziehungsweise 62,5 %.
- Globalbezug: regional 125.000 €/Jahr, Fernbezug 124.000 €/Jahr; 3 % auf 108.000 € ergeben 3.240 €, somit Fernbezug 127.240 € und 2.240 € Mehrkosten. Reine Übungsannahmen, keine Marktpreise oder Abgabensätze.
- Wertstrombeispiel: Bearbeitung 20 Minuten, Warten 120 Minuten, Durchlauf 140 Minuten, Warteanteil rund 85,7 %; Alternativen 137 beziehungsweise 80 Minuten. Transfer: 120 Minuten Gesamtzeit, davon rund 83,3 % Warten.
- Bestehender Übungsfall: 65 Minuten, davon 20 Bearbeitung und 45 Warten; Freigabeoption 40 Minuten / rund 38,5 % weniger; Packoption 62 Minuten / rund 4,6 % weniger. Die alten Zahlen und Lösungsabschnitte bleiben erhalten.

Neu zur Integration freigegeben sind `rationalisierung-grundlagen` mit Nummer 4.0 und `prozessverbesserung` mit Nummer 4.3.6; beide Nummern sind im geprüften Ausgangsbestand frei. Supplement-Schlüssel beziehen sich auf vorhandene beziehungsweise diese ausdrücklich ergänzten `Lesson.id`, nicht auf den Präfix `logistik-`. Die Typreferenzen auf `Lesson` und `LogisticsSupplement` sind reine TypeScript-Imports.

Es wurden keine vorhandenen Artikel gelöscht, keine APK erstellt und keine Veröffentlichung ausgelöst. Die technische Gesamtintegration, Glossarverlinkung in der Lernansicht und mobile Darstellung prüft der integrierende Hauptagent. Der direkte Inhaltsabgleich gilt für die oben genannten Kapitel-4-Seiten und relevanten Ergänzungsstellen, nicht pauschal für die übrigen Buchkapitel.
