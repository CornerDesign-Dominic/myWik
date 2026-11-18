# Stoffabgleich Logistik: Grundlagen und Einkaufsprozess

Stand: 18.11.2026. Grundlage: bereitgestellter Scan **Logistik – Sicherung.pdf**. Die folgenden PDF-Seiten sind physische Dateiseiten, nicht die gedruckte Buchzählung. In diesem Bereich gilt **PDF-Seite + 6 = gedruckte Seite**.

## Umfang und Arbeitsweise

- Direkt gelesen: PDF-Seiten **3–31** sowie der zum Thema Wertanalyse gehörende Anfang von **PDF-Seite 32**, also gedruckte Seiten 9–38. Der auf PDF-Seite 32 beginnende Abschnitt 1.3 gehört zur Bearbeitung des Beschaffungsprozesses durch ein anderes Arbeitspaket.
- Zusätzlich als Begriffsliste abgeglichen: Glossar und Stichwortverzeichnis auf **PDF-Seiten 113–119** (gedruckte Seiten 121–127). Dabei wurden nur die für Grundlagen und Einkaufsprozess relevanten Begriffe ausgewertet.
- Zusätzlich visuell am gerenderten Scan geprüft: **PDF-Seite 19** (Make-or-Buy-Tabelle), **PDF-Seite 28** (ABC-Tabelle) und **PDF-Seite 29** (ABC-Grafiken). Andere Abbildungen sind inhaltlich über Text und erkennbare Beschriftungen abgeglichen, nicht als pixelgenaue Bildreproduktion.
- Vorhandene Artikeltexte, Artikel-/Kapitel-IDs und bestehende Abschnitts-IDs bleiben erhalten. Das Paket `src/data/logistik-plus-einkauf.ts` ergänzt **23 bestehende Artikel** um eigene Abschnitte, Begriffsdefinitionen und jeweils eine Transferfrage mit Musterantwort.
- Keine neuen eigenständigen Artikel: Eine zusätzliche ABC-XYZ-Anwendung würde den bereits kombinierten XYZ-Artikel weitgehend doppeln. Stattdessen sind darin nun **alle neun Matrixfelder** mit unterschiedlichen Entscheidungsfolgen erklärt.
- Alle Erklärungen und Zusatzbeispiele sind eigenständig formuliert. Buchaufgaben, Zahlenkolonnen und Seitenbilder werden nicht als Artikelinhalt übernommen.

## Stoffliste gegen den konkreten Buchtext

| Buchstelle | Lernziel / fachlicher Gehalt | Zielartikel, ID ohne `logistik-` | Befund und Ergänzung |
| --- | --- | --- | --- |
| PDF 3 / Buch 9 | Einkaufsergebnis nicht auf einzelnen niedrigen Preis reduzieren; Daten aus ERP verbinden Bedarf und Abwicklung | `einkaufsorganisation`, `digitale-schnittstellen`, `abc-analyse` | Vorher nur punktuell. Ergebnishebel mit eigenem Zahlenbeispiel, Datenhoheit und wertbezogene Priorisierung ergänzt. |
| PDF 4 / Buch 10 | Logistik planen, durchführen, koordinieren und kontrollieren; Vernetzung, Ressourcen, Cyber- und geopolitische Risiken | `teilbereiche`, `lieferkettenstoerung` | Grunddefinition und systematischer Risikoblick ergänzt. Die sechs R und der allgemeine Überblick werden im vorhandenen Übersichtsartikel durch das Integrationspaket behandelt. Die im Buch genannte Retourenquote wird nicht als zeitloser Branchenwert übernommen. |
| PDF 5 / Buch 11 | Logistik als Querschnittsfunktion, Gesamtprozess, Process Owner; Beschaffungs- und Produktionslogistik | `teilbereiche`, `informationslogistik` | Übergaben, Verantwortung und Abgrenzung Einkauf/Beschaffung/Beschaffungslogistik konkretisiert. Eine Abteilung ist nicht mit einer logistischen Funktion gleichzusetzen. |
| PDF 6 / Buch 12 | Produktion versorgen; Distribution einschließlich Laufzeit; Entsorgung und Rückführung; Informationsfluss | `teilbereiche`, `lieferservice`, `informationslogistik` | Funktionsgrenzen, Lieferbereitschaft gegenüber Termintreue und die Bedeutung des gesamten Lieferwegs ergänzt. Informationsfluss nicht ausschließlich entgegen der Warenrichtung dargestellt. |
| PDF 7 / Buch 13 | Wertschöpfungskette und unternehmensübergreifende Abstimmung; Verstärkung von Bestellschwankungen; Abverkaufsdaten | `supply-chain-management` | Ursachen, Datenbedarf, Maßnahmen und Grenzen des Peitscheneffekts sowie Transferfall mit vorübergehendem Pufferaufbau ergänzt. |
| PDF 8 / Buch 14 | Umfang der Kontraktlogistik, ergänzende Leistungen, Integrationsstufen, Vorteile und Risiken | `kontraktlogistik` | VAS, Integrationsverantwortung, Wechselrisiken und tatsächlich vermeidbare Kosten erklärt. Abweichende 1PL-Einordnungen ausdrücklich kenntlich gemacht; keine vermeintlich universelle Stufentabelle. |
| PDF 9 / Buch 15 | Unterschiedliche Vertragselemente; Zielkonflikte zwischen Einkauf, Produktion, Lager und Vertrieb | `kontraktlogistik`, `zielkonflikte` | Vertragstypen an Leistung angeknüpft; korrekte Ausgangsnormen § 453 und § 467 HGB. Bereichsinteressen und eigenes Gesamtkostenbeispiel erläutert. |
| PDF 10 / Buch 16 | Organisation der Querschnittsfunktion; Lieferservicegrafik mit sechs Aspekten; Materialkostensenkung als Ergebnishebel | `lieferservice`, `einkaufsorganisation` | Sechs Serviceaspekte getrennt, Kennzahlenbasis und Organisationsverantwortung erklärt. Ergebnisverbesserung als bedingter Zusammenhang statt pauschaler Hebelfaktor. |
| PDF 11 / Buch 17 | Zentraler/dezentraler Einkauf, Mischform, Lead Buyer, innere und äußere Organisation | `einkaufsorganisation` | Lead Buyer, Trennung von Lagerstandort und Einkaufsentscheidung, Funktions-/Objektprinzip sowie Freigabe- und Eskalationsregeln ergänzt. |
| PDF 12 / Buch 18 | Strategisch/operativ; Bedarf aus Disposition, Lager, Produktion, Entwicklung, Instandhaltung, Verwaltung | `einkaufsorganisation`, `ablauf-beschaffung` | Aufgabenteilung mit Anwendungsfall und beschaffbarer Bedarfsanforderung konkretisiert. |
| PDF 13 / Buch 19 | Lieferantenquellen, präzise Anfrage; Bezugskalkulation einschließlich Mindermengenzuschlag | `ablauf-beschaffung`, `angebotsvergleich`, `angebotspruefung` | Anfragebestandteile, vergleichbare Preis-/Mengeneinheiten und eigene Kalkulation mit Zuschlag, Skontobasis und Fracht ergänzt. |
| PDF 14 / Buch 20 | Formelle/materielle Prüfung; sechs Nutzwertschritte; Kriterien und K.-o.-Anforderungen | `angebotspruefung`, `lieferantenmanagement` | Eignung vor Punktwertung, zwei Begriffsabgrenzungen offen erklärt; Skalenvergleich, Kriterienanker und Gewichtung erläutert. |
| PDF 15 / Buch 21 | Gewichtete Teilnutzwerte, Ausschluss trotz hoher Summe, abweichende Gewichtsskalen, Verhandlung und beiderseitiger Nutzen | `lieferantenmanagement` | K.-o.-Logik, Skalierung, Sensitivitätsrechnung und Vorbereitung/Nachbereitung einer Verhandlung ergänzt. Buchzahlentabelle nicht kopiert. |
| PDF 16 / Buch 22 | Organisatorische, inhaltliche und persönliche Verhandlungsvorbereitung; Bestellung und Bestellverfolgung | `lieferantenmanagement`, `ablauf-beschaffung` | Rollen, Ziel/Rückfallposition, Protokoll, Auftragsbestätigungsabgleich und Klärung von Abweichungen erklärt. Vertragszustandekommen gehört zusätzlich in die Rechtsartikel. |
| PDF 17 / Buch 23 | Pflichtinformationen einer betrieblichen Bestellung, Wareneingang, sachliche/rechnerische Rechnungsprüfung, Kontrolltrennung; Sourcing-Einstieg | `ablauf-beschaffung`, `sourcing` | Bestellung auf Spezifikation, Menge/Einheit, Preis/Währung, Ort/Termin/Konditionen konkretisiert. Drei-Belege-Abgleich mit Minderlieferungsfall erklärt; elektronische Rechnung nicht als automatisch fehlerfrei unterstellt. |
| PDF 18 / Buch 24 | Make-or-Buy, Fertigungstiefe, weiterlaufende Fixkosten, kritische Menge mit Investition | `make-or-buy` | Allgemeine Kostenfunktionen mit Fixkosten beider Alternativen, Rechenweg, Zeitraum/Einheiten, Kapazität und Opportunitätskosten ergänzt. |
| PDF 19 / Buch 25 | Tabelle Vorzüge make/buy; Single, Dual und Multiple Sourcing | `make-or-buy`, `sourcing` | Tabelle zusätzlich visuell geprüft. Qualitätskontrolle, Kompetenz, Geheimhaltung, interne Abstimmung, Spezialwissen und Flexibilität als bedingte Vorteile erklärt. Lieferantenzahl je Beschaffungsobjekt und echte Alternativfähigkeit abgegrenzt. |
| PDF 20 / Buch 26 | Multiple Sourcing, Global/Domestic Sourcing, Lieferkettenthema | `sourcing`, `beschaffungsmarkt`, `einkaufskooperation-lieferkette` | Nutzen/Risiken sowie Standort und gemeinsame Abhängigkeiten erklärt. Keine veralteten Beschäftigtenschwellen oder Fristen aus dem Buch übernommen. |
| PDF 21 / Buch 27 | Local Sourcing; Unit/Modular, niedrigere Fertigungstiefe, technische und wirtschaftliche Abhängigkeit | `beschaffungsmarkt`, `sourcing-baukasten` | Räumliche Beschaffung nach Gesamtkosten statt allein Lohn-/Stückpreis; Integration, Verantwortung und Wechselkosten erläutert. |
| PDF 22 / Buch 28 | Grafischer Wechsel von Teilelieferanten zum Modulpartner; Individual/Collective Sourcing und Organisationsformen | `sourcing-baukasten` | Veränderung direkter Schnittstellen und Koordinationsleistung beschrieben; gemeinsame Beschaffung nicht mit operativ zentralem Abruf verwechselt. |
| PDF 23 / Buch 29 | Vor-/Nachteile der Kooperation, Kartellrecht, Lieferantenaufbau, Marktanalyse/-beobachtung/-prognose | `einkaufskooperation-lieferkette`, `lieferantenmanagement`, `beschaffungsmarktforschung` | Trittbrettfahrer- und Standardisierungsprobleme, bedingte Freistellung nach § 2 GWB und die drei Forschungsaufgaben erklärt. |
| PDF 24 / Buch 30 | Forschungscheckliste, Primär/Sekundär, Informationen für mehrere Bereiche, Datenmanagement | `beschaffungsmarktforschung`, `digitale-schnittstellen` | Marktobjekte/-strukturen, konkurrierende Nachfrage, Entwicklung/Risiken sowie Quellenqualität ergänzt. Erhebungszweck statt bloß „Messe/Internet“ entscheidet über Primär/Sekundär. Data Warehouse von operativer Datenhaltung abgegrenzt. |
| PDF 25 / Buch 31 | Käufer-/Verkäufermarkt, Polypol/Oligopol/Monopol, Lieferantenbewertung | `beschaffungsmarkt`, `lieferantenmanagement` | Marktmacht von bloßer Anbieterzahl unterschieden. Relevanter Markt, geeignete Alternativen und laufende tatsächliche Leistung erklärt. Keine starre Vertragsstrategie je Marktform behauptet. |
| PDF 26 / Buch 32 | Haupt-/Unterkriterien, ERP-Daten, Serviceeinschätzungen, Gewichtung, Lieferantenklassen und Maßnahmen | `lieferantenmanagement` | Rohdaten zuerst in definierte vergleichbare Punkte umrechnen; eigener vollständiger 0-bis-100-Beispielfall, Mehrpersonenbeurteilung und Rückmeldung/Maßnahmen ergänzt. Klassengrenzen als betriebliche Vorgaben kenntlich. |
| PDF 27 / Buch 33 | Wiederholte/anlassbezogene Bewertung, Audit, Lieferantenaufbau/-pflege/-erziehung/-entwicklung; Analysetechniken | `lieferantenaudit`, `lieferantenmanagement`, `abc-analyse` | Ergebniskennzahl von Prozess-/Systemnachweis getrennt. Auditarten fachlich präzisiert; Maßnahmen bis zur Wirksamkeitsprüfung und Managementstrategien erläutert. |
| PDF 28 / Buch 34 | ABC, Pareto-Idee, Jahresverbrauchswert, Anteile, Kumulierung und Klassentabelle | `abc-analyse` | Allgemeine Methode vor Einkaufsfall erklärt; vollständige Schritte, Null-Gesamtwert, Rundung und Grenzartikel. Tabellen-Sortierfehler visuell bestätigt, nicht reproduziert. |
| PDF 29 / Buch 35 | Anzahl- gegenüber Wertanteil, ABC-Kurve und Klassen, Rechenschritte | `abc-analyse` | Grafik-Lesehilfe und Unterschied zu aufsteigend sortierter Lorenzdarstellung ergänzt. Root integriert Balken und kumulierte Linie zu den bereits vorhandenen eigenen Beispieldaten 80/15/5. |
| PDF 30 / Buch 36 | Differenzierte A/B/C-Maßnahmen; XYZ und RSU | `abc-analyse`, `xyz-analyse` | Keine blinde A-kleiner-/C-großer-Sicherheitsbestand-Regel. X/Y/Z, Datenfehler und Zyklusbezug erklärt; relative Streuung mit vollständiger Rechnung als zusätzliche Methode. |
| PDF 31 / Buch 37 | Neun-Felder-Matrix mit Strategien; Wertanalyse, Funktionsklassen und Funktionsarten | `xyz-analyse`, `wertanalyse` | Alle neun Felder mit jeweils eigenem Fall/Handlungsansatz; Voraussetzungen statt Automatismus. Haupt/Neben/unerwünscht sowie Gebrauch/Geltung unterschieden, Funktion vor bisherige Bauform gestellt. |
| PDF 32 / Buch 38, nur Wertanalyse-Teil | Arbeitsplan 0–9; immaterielle Anwendungen; Wertplanung/Wertgestaltung; Value Management | `wertanalyse` | Zehn Aufgaben in eigenständiger Formulierung und getrennte ergänzende Wirksamkeitskontrolle. Dienstleistungsbeispiel, Entwicklung/Überarbeitung und Managementprinzipien einschließlich Unsicherheit/Nachhaltigkeit ergänzt. |

## Zuordnung der 23 bearbeiteten Artikel

| Bestehende ID | Neue vertiefende Abschnitte | Neue Selbstkontrolle / Transfer |
| --- | --- | --- |
| `teilbereiche` | Funktionsabgrenzung, Querschnittsfunktion, Process Owner, anderer Branchenkontext | Versorgung und Rückführung einer Werkstatt zuordnen |
| `zielkonflikte` | Bereichsinteressen, Gesamtkostenrechnung, Entscheidungsbegründung | Rabatt gegen Lager-, Kapital- und Verderbskosten rechnen |
| `informationslogistik` | Zeitbezug, Richtungen, Datenqualität und Verantwortlichkeit | Avis und Zustellbestätigung einordnen |
| `supply-chain-management` | Reichweite, Ursachen des Bullwhip-Effekts, Kooperationsregeln | Bestandsaufbau von dauerhafter Nachfrage trennen |
| `kontraktlogistik` | VAS, PL-Einteilungen, echte Einsparungen, Schnittstellen und Vertragselemente | Weiterlaufende Miete im Outsourcing bewerten |
| `lieferservice` | Sechs Dimensionen, Messbasis, gesamte Lieferzeit, Organisation | Lieferzeit von Termintreue trennen |
| `digitale-schnittstellen` | Datenhoheit, wiederholte Meldungen, Data Warehouse, Zugriff und ECR | Doppelte Versandmeldung ohne doppelten Vorgang verarbeiten |
| `ablauf-beschaffung` | BANF, Anfrage/Bestellung, Bestellverfolgung, Rechnungsabgleich | Falschen Werkstoff vor Bestellung klären |
| `sourcing` | Kombinierbare Dimensionen, echte Quellen, Aufteilungen und Wechselhürden | Mehrere Sourcing-Entscheidungen am selben Fall erkennen |
| `lieferantenmanagement` | Vollständiges Bewertungsverfahren, K.-o., Skalen, Sensitivität, Verhandlung, Ist-Leistung | Gewichtungsabhängige Rangfolge berechnen und beurteilen |
| `angebotsvergleich` | Bezugsgrößen, Zuschläge, Preisstaffeln, Skontierbarkeit, Bezugskosten | Vollständigen Bezugspreis mit anderen Zahlen rechnen |
| `abc-analyse` | Allgemeines Verfahren, Grenzen, anderer Kontext, Maßnahmen, Kurven-Lesehilfe | Fehlerkosten priorisieren statt nur Einkaufsartikel |
| `xyz-analyse` | RSU, Datenbasis, Variationskoeffizient, Vorhersagegrenzen, alle neun Matrixfelder | AY nach ausdrücklich vorgegebenen Schwellen begründen |
| `einkaufsorganisation` | Ergebnishebel, Lead Buyer, Organisationsdimensionen und Regeln | Absolute und relative Gewinnänderung unterscheiden |
| `make-or-buy` | Allgemeines Kostenmodell, Schnittmenge, Kapazität, Opportunität und qualitative Vorteile | Kritische Menge und Alternativkosten mit anderen Zahlen |
| `beschaffungsmarktforschung` | Drei Aufgaben, Erhebungszweck, Quellenkritik und Datennutzung | Bericht und gezielte Befragung unterscheiden |
| `lieferantenaudit` | Auditgegenstände, Beleg/Maßnahme/Wirkung, vier Managementstrategien | Gute Fehlerquote gegen fehlende Rückverfolgbarkeit abgrenzen |
| `wertanalyse` | Funktionsorientierung, Funktionssystematik, Arbeitsplan, Umlaufkosten, Dienstleistungen und Value Management | Kosten je Umlauf und tatsächliche Funktion prüfen |
| `sourcing-baukasten` | Integrationsverantwortung, Kooperationsformen/-regeln und Kombinierbarkeit | Gemeinsame Einzelteile gegenüber eigenem Modulbezug einordnen |
| `angebotspruefung` | Prüfgrenzen, Vergleichsbasis, Klärung und Ausschluss | Preis je hundert Stück gegenüber Stückpreis bereinigen |
| `beschaffungsmarkt` | Marktform/Marktlage, Verhalten, räumliche Gesamtkosten | Nur einen kurzfristig zugelassenen Anbieter erkennen |
| `einkaufskooperation-lieferkette` | Nutzen/Gegenkosten, rechtliche Grenzen, risikobasierter Sorgfaltsprozess | Einkaufsgemeinschaft von Verkaufspreisabsprachen trennen |
| `lieferkettenstoerung` | Gemeinsame Vorstufen, Reichweite/Alternative, Notfallauslöser | Zeit- und Mengenlücke bis zum Ersatzbezug berechnen |

## Glossar- und Stichwortabgleich

Aus PDF 113–119 werden im eigenen Umfang insbesondere **Avis, ECR, Kontraktlogistik, Quelle/Senke, ABC-/XYZ-Analyse, Beschaffungslogistik, Produktionslogistik, Distributionslogistik, Entsorgungslogistik, Beschaffungsmarktforschung, Einkaufsorganisation, Lieferantenaudit/-bewertung/-management, Nutzwertanalyse, Pareto-/Peitscheneffekt, Single/Dual/Multiple, Local/Domestic/Global, Unit/Modular/Individual/Collective Sourcing, Querschnittsfunktion, strategischer/operativer Einkauf, Bestellung, Bestellverfolgung, Rechnungsprüfung, Wertanalyse und Wertschöpfungskette** als Erklärung oder Glossarbegriff aufgegriffen.

Die zu anderen Buchkapiteln gehörenden Glossarbegriffe zu Zoll, Gefahrgut, Frachtpapieren, Verkehrsträgern, Bestandsverfahren oder Entsorgungspflichten werden hier nicht als vollständig geprüft behauptet. Sie gehören zu den jeweils zuständigen Arbeitspaketen. Der Überblick zu den sechs R ist ebenfalls separat zugeordnet.

## Bewusste fachliche Präzisierungen gegenüber Quelle oder Alttext

1. **Zeitbezug eines Avis:** Der bestehende Artikel nennt ein Versandavis im Absatz zu „begleitend“. Ein vor Ankunft übermitteltes Avis ist für die Annahme vorauslaufend. Der neue Abschnitt erklärt ausdrücklich die Einordnung nach dem tatsächlichen Zeitpunkt. Die alte Abschnitts-ID wird nicht entfernt.
2. **Nutzwert-Gewichte:** Der Alttext formuliert 100 % als feste Summe. Das ist die übliche normierte Darstellung; das Buch weist auf andere gemeinsame Skalierungen hin. Der Zusatz zeigt, warum 60/40 und 6/4 dieselbe Rangfolge erzeugen.
3. **PL-Stufen:** Buch PDF 8 ordnet die unteren Stufen anders ein als die häufig verwendete Einteilung, nach der 1PL Eigenlogistik bezeichnet. Der Zusatz nennt die Abweichung und verlangt begründete Zuordnung anhand der im Fall vorgegebenen Definition. Die Bezeichnung allein legt keinen Vertragstyp fest.
4. **Vertragsnormen:** Buch PDF 9 nennt bei Speditions- und Lagervertrag nicht die gesetzlichen Ausgangsnormen. Für den Speditionsvertrag ist § 453 HGB, für den Lagervertrag § 467 HGB maßgeblich; die Ergänzung übernimmt nicht die falsche Zuordnung.
5. **Ergebnishebel:** Die konkrete Beispielrelation „1 % Materialkostensenkung = 10 % Gewinnsteigerung“ ist keine allgemeine Regel. Eine gleichwertige Umsatzsteigerung kann außerdem nur mit Annahmen zum zusätzlichen Deckungsbeitrag berechnet werden.
6. **ABC-Tabelle:** Auf PDF 28 steht Material 837509 mit 31.449,80 € vor 833747 mit 35.960,00 €. Das verletzt die verlangte streng absteigende Sortierung. Die Buchdaten werden deshalb nicht als ungeprüftes Musterdatenset übernommen; die eigene Grafik verwendet die konsistenten vorhandenen 80/15/5-Daten.
7. **ABC-Grenzen:** Die Buchbeispiele nennen unterschiedliche Näherungsbereiche. Eine Faustregel erzwingt weder einen exakten Anteil noch eine fixe Artikelzahl; Grenzartikel brauchen eine definierte Behandlung.
8. **ABC-Maßnahmen:** C bedeutet geringer Beitrag zur gewählten Wertgröße, nicht automatisch geringe Kritikalität oder einfache Beschaffung. Pauschale Sicherheitsbestandsregeln werden nicht als allgemeingültig vermittelt. B kann eine begründete mittlere Strategie erhalten.
9. **XYZ:** Hohe rohe Streuung beweist keine schlechte Prognostizierbarkeit bei bekanntem Saisonmuster. Die eigene Variationskoeffizienten-Rechnung wird als ergänzendes Verfahren mit eigenen Grenzannahmen kenntlich gemacht.
10. **Auditarten:** Die Prüfung eines Auftragsdurchlaufs ist nicht allein deshalb ein Produktaudit. Produkt, Prozess und Managementsystem sind verschiedene Prüfgegenstände. Die im Buch verkürzte Einteilung wird präzisiert.
11. **Primär/Sekundär:** Nicht der Kanal allein entscheidet. Auf einer Messe können vorhandene Daten gelesen oder neue zielgerichtete Informationen erhoben werden. Auch „Internet“ bedeutet nicht ausnahmslos Sekundärforschung.
12. **Data Warehouse:** Ein auswertungsorientierter gemeinsamer Datenbestand ist nicht mit dem operativen ERP-/Lagerbuchungssystem gleichzusetzen. Der Zusatz trennt Nutzung und Datenverantwortung.

## Ergänzungen über das Buch hinaus

- Vollständige zusätzliche Transferrechnungen mit neuen Zahlen, Formeln, Einheiten und Ergebnisdeutung.
- ABC als allgemeine Priorisierungsmethode für Kundenumsatz und Fehlerkosten, nicht ausschließlich Materialverbrauch.
- Variationskoeffizient einschließlich Nullmittelwert, vollständigem beschreibendem Rechenweg und Einschränkungen bei Saison/Trend.
- Alle neun ABC-XYZ-Felder mit eigenem Handlungsansatz; Maßnahmen bleiben von Risiko und Lieferbedingungen abhängig.
- Allgemeiner Make-or-Buy-Vergleich mit Fixkosten beider Alternativen, Opportunitätskosten und nachvollziehbarem Vorzeichen-/Kapazitätsbezug.
- Datenhoheit, wiederholbare Schnittstellenmeldungen und klare Unterscheidung zwischen operativem System und Data Warehouse.
- Wertanalyse einer Dienstleistung sowie Wirtschaftlichkeit von Mehrweg unter tatsächlicher Umlaufzahl.

## Quellen und veränderliche Angaben

- **Nutzbarer direkter Buchabgleich:** der oben genannte Umfang. Keine Aussage über noch nicht bearbeitete Buchkapitel.
- **PL-Bezeichnungen:** Maersk als Primärquelle eines tätigen Anbieters: https://www.maersk.com/de-de/logistics-explained/supply-chain-management/2024/04/24/navigate-the-world-of-party-logistics-with-our-guide-to-1pl-2pl-3pl-4pl-models ; abgerufen am 18.11.2026. Die Quelle ist Orientierung für die tatsächlich unterschiedliche Verwendung, keine allgemeingültige Norm.
- **HGB-Vertragsarten:** https://www.gesetze-im-internet.de/hgb/__453.html und https://www.gesetze-im-internet.de/hgb/__467.html ; geprüft am 18.11.2026.
- **Einkaufskooperation:** https://www.gesetze-im-internet.de/gwb/__2.html ; geprüft am 18.11.2026. Keine pauschale Freistellung sämtlicher Kooperationen oder beliebigen Informationsaustauschs.
- **Statistischer Quotient:** NIST, https://www.itl.nist.gov/div898/software/dataplot/refman1/auxillar/coefvate.htm ; abgerufen am 18.11.2026. Die XYZ-Schwellen der eigenen Aufgabe sind frei gewählte, offengelegte Beispielannahmen.
- **Auditansätze:** VDA QMC, https://webshop.vda.de/qmc/en/band-6-teil-07 ; abgerufen am 18.11.2026. Kostenpflichtige Standards werden nicht reproduziert; der Artikel erläutert lediglich die Gegenstandsabgrenzung.
- **Sorgfaltsprozess:** BAFA-Handreichungen zur Risikoanalyse und zu Standards/Audits/Zertifizierungen; Abruf am 18.11.2026. Die Ergänzung vermittelt das fachliche risikobasierte Vorgehen. Beschäftigtenschwellen, Berichtspflichten, Fristen, aktuelle Novellen und sämtliche Anwendungsdetails des LkSG/CSDDD sind **in diesem Paket nicht abschließend rechtlich geprüft** und werden nicht als gesicherter aktueller Pflichtenkatalog ausgegeben.

## Noch zu prüfen vor Veröffentlichung

- Integration des Pakets und der zusätzlichen Glossarbegriffe ohne ID-Kollisionen.
- Anzeige und Anklickbarkeit der Begriffe in echten Artikeln, insbesondere Synonyme und Abkürzungen.
- Mobile Lesbarkeit der umfangreichen XYZ-/Wertanalyse-Vertiefungen und der von der Hauptintegration erstellten ABC-Grafik.
- Vollständige gemeinsame Querverweise zu Bestandsverfahren, Beschaffungsportfolio und den Rechtsartikeln.
- Keine Veröffentlichung oder App-Build durch dieses Arbeitspaket.
