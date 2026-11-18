# Stoffabgleich Beschaffungsprozess (§1.3)

Stand: 18.11.2026. Bearbeitung: additive Ergänzungen in `src/data/logistik-plus-beschaffung.ts`. Vorhandene Artikel, Beispiele, Kurzfragen und Abschnitts-IDs werden weder gelöscht noch ersetzt. Es entstehen keine zusätzlichen Lektionen; eigenständige bereits vorhandene Vertiefungen werden ausgebaut.

## Geprüfte Quellen und Umfang der Aussage

Grundlage sind die bereitgestellte Datei `Logistik - Sicherung.pdf` und deren seitenweise OCR-Texte. Fachlicher Textabgleich: PDF-Seiten 32–39 und 41–50, entsprechend den gedruckten Seiten 38–55. Die unmittelbar anschließende Feinabruf-Abbildung und berufstypische Aufgabe auf PDF-Seite 50 wurden einbezogen. PDF-Seite 32 enthält außerdem den Abschluss der Wertanalyse; dieser gehört in den benachbarten Audit zum Einkaufsprozess und wird hier nicht als eigene Abdeckung beansprucht.

Die Seitenbilder 35, 40 und 48 wurden zusätzlich mit Poppler gerendert und visuell geprüft. Dadurch konnten eine tatsächliche falsche Formelbeschriftung, eine tatsächlich doppelt eingefügte Seite und ein bloßer OCR-Zahlenfehler unterschieden werden. Die übrigen grafischen Details wurden am OCR und anhand ihres fachlichen Zusammenhangs geprüft; eine pixelgenaue Übernahme von Buchgrafiken ist weder erfolgt noch behauptet.

Alle Ergänzungen sind eigenständig formuliert. Beispiele verwenden überwiegend andere Produkte und Zahlen. Ein Zielartikel zählt nur dann als abgedeckt, wenn das Verfahren im Haupttext erklärt wird und nicht nur im Titel oder Glossar vorkommt.

## Stoffliste und Ergebnis

| Quelle im PDF / Druck | Fachlicher Inhalt und Lernziel | Zielartikel ohne `logistik-` | Ausgangslage | Additive Ausarbeitung / Stand |
| --- | --- | --- | --- | --- |
| 32 / 38, Beginn §1.3 | Zeitpunkt, Menge, Preis-/Bestellkosten und Lieferantenentscheidung gemeinsam planen; Rückmeldungen aus nachgelagerten Stellen berücksichtigen | `ablauf-beschaffung` | Prozess vorhanden, die vier Entscheidungsdimensionen und ihr Regelkreis zu knapp | Ergänzt: Bedarf–Bestand–Bestellrechnung, Zielkonflikte und Rückmeldung; mit Entscheidungs-Transferfrage erklärt |
| 33–34 / 39–40 | Einzel-, Vorrats- und fertigungssynchrone Beschaffung mit Vor-/Nachteilen, Voraussetzungen und Störungsrisiken auswählen; JIT und JIS unterscheiden | `beschaffungsstrategien` | Grundabgrenzung vorhanden, Wirkungen und Voraussetzungen sehr knapp | Ergänzt: Kosten je Stück, Kapital-/Überalterungsrisiken, Qualitäts-/Informationsanforderungen, Reihenfolgefehler, Gesamtkettenbestand und Notfallwege |
| 34–35 / 40–41 | Primär-, Sekundär-, Tertiärbedarf sowie deterministische, stochastische und heuristische Ermittlung auseinanderhalten | `bedarfsarten` | Grundbegriffe vorhanden, Zuordnung und Stufen der Rechnung knapp | Ergänzt: zwei unterschiedliche Begriffsachsen, Endprodukt-/Teileeinheiten, Ersatzteilrolle, Datenlage und Übergang zur Bestands-/Bestellrechnung |
| 35–37 / 41–43 | Erzeugnisstruktur und mehrstufige Stücklisten auflösen; gleiche Teile aus mehreren Pfaden addieren | `stuecklisten` | Ein Mengenbeispiel vorhanden | Ergänzt: Vorgehen, Voraussetzungen, Einheiten und wichtiger Fall bereits vorhandener Baugruppen; zweiter Rechenkontext mit Bestand |
| 36–37 / 42–43 | Mengenübersicht, Struktur, Baukasten und Varianten anhand des Informationsbedarfs auswählen; Mengenbezug unterscheiden | `stuecklistenarten` | Alle Arten genannt, Anwendung nur knapp | Ergänzt: Auswahlfragen, doppelte Hochrechnung vermeiden, Variantenmengen konkret rechnen, Änderungsstand erklären |
| 37 / 43 | Nettobedarf einschließlich Zusatz-, Bestell-, Werkstatt-, Reservierungs- und Sicherheitsbestand berechnen | `nettobedarf` | Bisheriges Beispiel enthält nur Lager, Reservierung und Zugang | Vollständiges Schema im Haupttext ergänzt, Werkstattbestand konditional erklärt, vollständig gerechnetes Beispiel mit allen Bestandsarten, Doppelzählungsgefahren und Rundung bei Ausschussbasis |
| 37–39 / 43–45 | Terminbezug, Vorlaufverschiebung, Beschaffungsvorbereitung, Lieferzeit und Nachlauf erläutern | `dispositionsstufen` | Nur einfache Rückwärtsrechnung vorhanden | Ergänzt: drei Zeitbestandteile, vollständige Rückwärtsrechnung und mehrstufiges Beispiel mit Arbeitskalenderannahme |
| 38–39 / 44–45 | Analytische und synthetische Betrachtung sowie Fertigungs-/Dispositionsstufen auseinanderhalten | `stuecklisten`, `dispositionsstufen` | Begriffe teils indirekt erklärt | Ergänzt: Richtung Produkt→Teil versus Teil→Verwendung, tiefste Dispositionsstufe, keine Änderung realer Einbauorte, kein doppelter Bestandsabzug |
| 39, 41 / 45–46 | Verbrauchsorientierung auswählen; konstante, stark schwankende, sporadische, trendförmige und saisonale Verläufe deuten | `verbrauchsprognose` | Grenzen erwähnt, fünf Verläufe nicht zusammenhängend erklärt | Alle fünf Muster fachlich erklärt und jeweils zur Verfahrenseignung in Beziehung gesetzt; Fehlbestände als verzerrte Verbrauchsdaten angesprochen |
| 42 / 47 | Arithmetischen, gleitenden und gewogenen gleitenden Mittelwert berechnen und unterscheiden | `verbrauchsprognose` | Dreiwertbeispiel vorhanden, Fortschreibung fehlt | Ergänzt: Gesamtmittel gegen Fenster, tatsächlich weiterrückendes Fenster, Prozent- versus Dezimalgewichte, Prognosefehlerkontrolle |
| 42–43 / 47–48 | Exponentielle Glättung 1. Ordnung, α und Fortschreibung erklären; 2. Ordnung abgrenzen | `exponentielle-glaettung` | Eine Aktualisierung vorhanden | Ergänzt: gleichwertige Formel, Startwert, zwei aufeinanderfolgende Perioden, Faktorwirkung und Trend-/Saisonabgrenzung |
| 43 / 48 | Regression als statistische Prognosemethode einordnen | `regressionsanalyse` | Bereits ausführlicher als das Buch | Ergänzt: andere Einflussgröße als Zeit, Interpretation der Koeffizienten, Saison nur mit erweitertem Modell, Vergleich an späteren Beobachtungen |
| 34, 43 / 40, 48 | Analog- und Intuitivschätzung bei fehlenden Daten anwenden und absichern | `heuristische-bedarfsplanung` | Definitionen vorhanden, kein Zahlenbeispiel | Ergänzt: skalierte Analogschätzung, Szenarien und Annahmen, Überprüfung mit Istwerten; kein pauschales Verbot für A-Artikel |
| 43–44 / 48–49 | Unter-/Überbeschaffung und bestellfixe versus Lagerhaltungskosten beurteilen | `optimale-bestellmenge`, `lieferbereitschaft` | Modell nur kurz erklärt | Ergänzt: Kostenfunktionen mit D/q und q/2+S, Kapitalbindung und laufende Lagerkosten, Versorgungsrisiko und entgehender Ergebnisbeitrag |
| 45–46 / 50–51 | Andler-Formel, Zinssatz in Prozent/Dezimalform, Bestellhäufigkeit und Modellgrenzen anwenden | `optimale-bestellmenge`, `bestellhaeufigkeit` | Formel und ein Rechenschritt vorhanden | Ergänzt: vollständiger Kostenvergleich dreier Losgrößen, Sensitivität, diskrete zulässige Lose, Sicherheitsbestand als konstanter Kostenteil, Periodenbasis |
| 46–48 / 51–53 | Bestellpunkt und periodische Verfahren rechnen und Bestandsverläufe lesen | `bestellzeitpunkt`, `bestellrhythmus-rechnen` | Grundmodell und eine eigene Bestandsgrafik vorhanden | Ergänzt: Bestelltag versus Wareneingang, Tage bis Bestellung, bereits unterschrittene Schwelle, offene Zugänge, Schutzzeit L+R, Schwellen- gegen Auffüllpolitik |
| 49 / 54 | Sicherheitsbestand, Unsicherheitsarten, Sicherheitszeit und Fehlmengenkosten bestimmen; Servicegrad richtig interpretieren | `lieferbereitschaft`, `sicherheitszeit` | Sicherheitsbestand/Servicequoten vorhanden, Gründe und wirtschaftliche Auswertung zu knapp | Ergänzt: Bedarf/Lieferung/Bestand als drei Unsicherheiten, Synonyme, Zeit-/Mengenpuffer, Definition des Sofortbezugs und differenzierte Serviceentscheidung |
| 49–50 / 54–55 | Rahmenvertrag, Vorschau, Grob-/Feinavis und kurzfristigen Abruf als zusammenhängende Liefersteuerung erklären | `feinabruf` | Wochenvorschau/Feinabruf vorhanden | Ergänzt: Ablauf über Planungsstufen, konkrete Datenelemente, Freigabezonen, Reihenfolge, Versionierung und Ersatzkommunikation |
| 50 / 55, berufstypische Aufgabe | Durchschnittsbestand, jährliche Bestellkosten, optimale Häufigkeit, Wirkung sinkenden Lagerhaltungssatzes und nächsten Bestelltag bestimmen | `fall-nachbestellrechnung`, `optimale-bestellmenge`, `bestellhaeufigkeit`, `bestellzeitpunkt` | Eigener vorhandener Übungsfall 2.4 deckt Rechenmethoden bereits ab; Parameterwirkung knapp | Parameterwirkung vollständig in EOQ erklärt, vorhandenen Originalfall als direkte weitere Übung zugeordnet; keine Kopie des Prüfungsfalls und kein redundanter neuer Artikel |
| Eigene zusätzliche Übung | Bedarf, Bestandsdeckung, realistischen Liefertermin und Bezugspreis in einer Entscheidung verbinden | `fall-beschaffung` | Originalfall mit Musterlösung vorhanden | Ergänzt: Entscheidungsschritte, relativer Aufpreis, nachträglich verspäteter Zugang mit 60 statt 40 Stück Nettobedarf, spätere Überbestandsfolge und Weiterübung |

## Visuell geklärte Auffälligkeiten

1. **PDF-Seite 35 / gedruckt 41:** Das Bild beschriftet die Multiplikation von Endproduktbedarf und Komponentenanzahl tatsächlich mit „Primärbedarf“. Die erläuternden Absätze derselben Seite unterscheiden Primär- und daraus abgeleiteten Sekundärbedarf. Im Artikel wird die Multiplikation fachlich konsistent als Sekundärbedarfsableitung erklärt. Das ist kein bloßer OCR-Fehler.
2. **PDF-Seite 40 / gedruckt 10:** Im PDF liegt hier tatsächlich eine erneut eingefügte Seite aus §1.1. Es handelt sich nicht nur um einen fehlerhaften OCR-Text. Die gedruckten Seiten 45 (PDF 39) und 46 (PDF 41) folgen fachlich aufeinander; im geprüften §1.3 fehlt durch diese zusätzliche Seite keine nachweisbare gedruckte Seite.
3. **PDF-Seite 48 / gedruckt 53:** Das Seitenbild nennt **110 Stück/Tag**, **25 Tage** Wiederbeschaffungszeit, **15 Tage** Prüfintervall und **1.000 Stück** Sicherheitsbestand. Daraus folgen korrekt **110 × (25 + 15) + 1.000 = 5.400 Stück**. Das OCR hatte die Eingangsgrößen entstellt. Ein behaupteter Buchrechenfehler wäre hier falsch.
4. **PDF-Seite 36 / gedruckt 42:** Mengen in der Strukturstückliste können sich auf die direkte übergeordnete Einheit oder auf das Enderzeugnis beziehen. Der Artikel übernimmt diese fachliche Unterscheidung. Die im Buch damit verbundene Normnummer wurde nicht anhand der Norm selbst geprüft und wird deshalb nicht als aktuelle Normvorgabe weitergegeben.
5. **PDF-Seite 49 / gedruckt 54:** Die pauschale Aussage eines überproportionalen Sicherheitsbestandsanstiegs „ab 85 %“ wird nicht als allgemeingültiger Grenzwert übernommen. Der qualitative Zielkonflikt ist enthalten; die tatsächliche Kosten-/Servicebeziehung hängt vom Verteilungsmodell, der Lieferzeit und den Fehlmengenfolgen ab.

## Rechnungskontrolle

Eigene Rechnungen wurden separat nachgerechnet, insbesondere:

- Vollständiger Nettobedarf: 504 − 180 − 90 − 40 + 60 + 50 = **304 Stück**; ohne rechtzeitigen 90er-Zugang **394 Stück**.
- Gutmenge bei 5 % Ausschuss des Einsatzes: 200 ÷ 0,95 = 210,526… ⇒ **211 Einsatzstücke**, nicht pauschal 210.
- Baugruppenbestand: 20 × 2 = 40 benötigte Module, davon fünf vorhanden; 35 × 3 + 20 = **125 Griffe**.
- Gleitender Mittelwert: (100 + 120 + 130) ÷ 3 = **116,666… Stück**.
- Glättung: 100 + 0,3 × (130 − 100) = **109**; danach 109 + 0,3 × (90 − 109) = **103,3**.
- EOQ-Beispiel: √(2 × 9.600 × 54 ÷ 2,88) = **600 Stück**; K(300)=2.160, K(600)=1.728, K(1.200)=2.160 €/Jahr.
- Verpackungseinheiten: K(500)=**1.756,80**, K(750)=**1.771,20** €/Jahr; unter diesen Annahmen 500 günstiger.
- Periodisches Auffüllen: 12 × (5 + 3) + 24 = 120 Sollniveau; 55 + 20 − 5 = 70 Bestandsposition; Auffüllung **50 Stück**.
- Vergleichskontrolle der Buchaufgabe PDF 50: Durchschnitt **155 Stück**, jährliche Bestellkosten **180 €**, optimale Losgröße **150 Stück**, optimale Häufigkeit **10/Jahr**, Meldebestand **55 Stück**, Bestellung nach **27 Tagen** bei der ausdrücklich angegebenen Tagesbasis. Diese Werte dienen dem internen Abgleich und wurden nicht als neuer kopierter Prüfungsfall veröffentlicht.

## Grenzen und Restarbeit

- Der direkte Textabgleich gilt für den oben benannten §1.3-Umfang, nicht für das gesamte Buch.
- Die Erzeugnisstruktur und Stufenabbildungen werden durch selbstständige, vollständig gerechnete Beispiele erklärt. Ihre originalen Produktknoten, Positionen und Kurvenkoordinaten werden nicht reproduziert. Fachlich sind wiederverwendete Teile, Mengenpfade, Mengenbasis, Terminabhängigkeit und tiefste Dispositionsstufe berücksichtigt.
- Bereits vorhandene eigene Bestandsgrafiken bleiben erhalten. Ihre mobile Darstellung und die Integration der zusätzlichen Begriffspopups sowie Querverweise werden bei der gemeinsamen Endkontrolle geprüft.
- Die Ergänzungen sind Haupttext und Transferfragen, keine versteckten bloßen Stichwortlisten. Glossareinträge ergänzen die Erklärung, ersetzen sie aber nicht.
- Quellenbasis dieses Auftrags ist das bereitgestellte Buch. Externe Normfassungen oder aktuelle Rechtsstände werden für diesen überwiegend methodischen Abschnitt nicht behauptet.
