# Abgleich Kapitel 3 – Wertschöpfungskette

Stand: 18.11.2026. Ergänzungsdatei: `src/data/logistik-plus-wertschoepfung.ts`.

## Umfang und Vorgehen

Abgeglichen wurden die bereitgestellten OCR-Seiten `p069.txt` bis `p092.txt` des Lernbuchs und die 37 bereits vorhandenen Lessons mit Nummer `3.*`. Die PDF-Seite ist jeweils um sechs niedriger als die aufgedruckte Buchseite: PDF 69 entspricht Buchseite 75; PDF 92 entspricht Buchseite 98. Sämtliche 37 Artikel erhalten ergänzende Erklärungen und eine eigenständige Transferfrage mit Musterantwort. Es werden keine vorhandenen Artikel, Abschnitte oder IDs entfernt. Es sind keine neuen Lessons oder Umnummerierungen nötig.

Die Ergänzung verwendet das gemeinsame `LogisticsSupplement`-Schema. `intro` wird bei der Integration vor den bisherigen Einstieg gesetzt; `plus-*`-Abschnitte werden ergänzt. Quellen und Glossarbegriffe sind strukturiert hinterlegt. Die fachlichen Inhalte werden eigenständig erläutert; Buchbeispiele und Prüfungsaufgaben wurden nicht abgeschrieben.

Die vollständige PDF wurde zusätzlich verfügbar. Abbildungen 3.1 und 3.2 sowie die sicherheits- und abfallbezogenen Seiten wurden gerendert. Sichtprüfung: PDF 73/74 (Buch 79/80), PDF 87–91 (Buch 93–97); insbesondere Abb. 3.1, Abb. 3.2, Abb. 3.6 und die tatsächlich gedruckten Verkürzungen bei Einheiten und Abfallbegriffen. Eine OCR-Störung wird nicht als offene Fachfrage ausgegeben, wenn sie anhand der Seite geklärt werden kann.

## Seitengenauer Stoffabgleich

| PDF | Buch | Inhalt / Lernziel | Zielartikel (Lesson.id) | Ergebnis / besondere Behandlung |
| --- | --- | --- | --- | --- |
| 69 | 75 | Wertschöpfungskette als Verbindung von Produktion, Transport, Verpackung, Verladung und Entsorgung; Sicherheit und Schnittstellen | `fertigungsprinzipien`, `ladungssicherung`, `fall-wertschoepfung` | Zusammenhang erklärt; keine unbelegte Unfallquote oder pauschale strafrechtliche Folge übernommen. |
| 70 | 76 | Transformationsprozess, Produktionsfaktoren, Kernkompetenzen, Fremdvergabe; Auswahl des Fertigungsprinzips | `fertigungsprinzipien` | Eigenleistung/Fremdleistung mit Gesamtkosten und Abhängigkeit; Auswahl nach Vielfalt, Menge, Kapital, Zeit und Flexibilität. |
| 70 | 76 | Werkstattfertigung, Verrichtungsprinzip, Universalmaschinen; Tabelle 3.1 | `werkstattfertigung` | Arbeitsfolge, Qualifikation, Flexibilität, Wege, Zwischenbestände, Planung und Verbesserungen erklärt. |
| 70–71 | 76–77 | Fertigungsinseln; Gruppenautonomie und Qualifikation; Tabelle 3.2 | `fertigungsinseln` | Räumliche Gruppierung und Selbstorganisation getrennt; Materialfluss, Kosten, Auslastung, Fixkosten und Gruppenkonflikte erläutert. Pauschale Vor-/Nachteile werden als bedingte Wirkungen erklärt. |
| 71–72 | 77–78 | Fließfertigung, Reihenfertigung, Fließbandfertigung, Humanisierung der Arbeit | `reihen-fliesbandfertigung`, `fertigungsprinzipien` | Fester Takt versus nicht taktgebundene Folge, Puffer und Störungsfortpflanzung; Rotation, Enlargement und Enrichment mit unterscheidbaren Beispielen. Eigenständige Taktrechnungen ergänzt. |
| 72 | 78 | Fördergut, Förderintensität, Förderstrecke, Fertigungsform; Stetig/Unstetig | `interne-transportsysteme` | Auswahlraster und vollständiges Transportspiel erläutert; Förderleistung mit Aufnahme, Abgabe und Rückfahrt gerechnet. |
| 73 | 79 | Abb. 3.1, flurgebunden/flurfrei, Nutzungsgrad, Servicegrad, Flexibilität | `interne-transportsysteme` | Diagramm visuell geprüft. Zwei voneinander unabhängige Einteilungen erklärt; Beispiele und Zielkonflikte im Text. Keine blanket Aussage, dass jeder Kran oder jede Hängebahn stets demselben Bewegungsprinzip folgt. |
| 73–74 | 79–80 | Verkehrsträger und Auswahlcheckliste; Kosten, Laufzeit, Pünktlichkeit, Sicherheit, Standort, Recht, Umwelt | `externe-transportsysteme`, `transportkosten-co2` | Musskriterien vor Vergleich; kompletter Vor-/Haupt-/Nachlauf; fiktiver vollständiger Kostenvergleich statt nur Hauptlaufpreis. |
| 74 | 80 | Abb. 3.2, Beförderungsmenge versus -leistung | `externe-transportsysteme` | Abbildung visuell geprüft; Tonnen und Tonnenkilometer mit Vergleichsrechnung erklärt. Historische Prozentwerte von 2021 nicht als heutige Marktwerte wiederverwendet. |
| 74–75 | 80–81 | Werkverkehr, gewerblicher Güterkraftverkehr, Zugang, Erlaubnisse, Ausnahmen | `werkverkehr-rohrleitungen` | Warenbezug, Zweck, Personal und Hilfstätigkeit; Anmeldung, Berechtigung, Ausnahmen, Zuverlässigkeit, finanzielle/fachliche Eignung. Änderung des GüKG 2026 und Fortgeltung alter Erlaubnisse berücksichtigt. |
| 75 | 81 | Straßenverkehr: Stärken und Einschränkungen | `externe-transportsysteme`, `werkverkehr-rohrleitungen` | Tür-zu-Tür und Flächenbedienung versus Stau, Kapazität und Verkehrsregeln; keine allgemeine Zusage geringer Wartezeiten oder stets billigster Preise. |
| 75–76 | 81–82 | Schiene, Netzzugang, Bündelung, Fahrplan, besondere Güter | `externe-transportsysteme`, `kombinierter-verkehr` | Eignung für gebündelte Mengen, Zugang und Umschlag erklärt. Umwelt- und Wirtschaftlichkeitsvorteile nicht absolut gesetzt. |
| 76–77 | 82–83 | Binnen- und Seeschifffahrt, Linie/Tramp, Container, Witterung; Luftfracht; Pipelines | `externe-transportsysteme`, `werkverkehr-rohrleitungen`, `verkehrsorganisation` | Verkehrsträger einzeln beschrieben, Fahrplan versus Auftragsfahrt und Vor-/Nachlauf erläutert; historische Rekorde, Hafen-Ranglisten und Flugzeugkapazitäten nicht als aktuelles Faktenwissen übernommen. |
| 77 | 83 | Kombinierter Verkehr, Vorlauf/Hauptlauf/Nachlauf; Begriffsverweis | `kombinierter-verkehr`, `verkehrsorganisation` | Multimodal, intermodal und kombiniert getrennt; Schnittstellenlaufzeit gerechnet. Container- und Netzwerkbegriffe zusätzlich eigenständig vertieft. |
| 78–79 | 84–85 | Tabelle 3.3 Verpackungsfunktionen; Belastungskette | `verpackung` | Schutz, Lager/Transport, Identifikation/Information, Verkauf und Verwendung vollständig als Funktionsgruppen erläutert. Mehrwegkosten mit Umlaufzahl und Grenzen gerechnet. |
| 79 | 85 | Tabelle 3.4: Packgut, Packmittel, Packhilfsmittel, Packstoff, Verpackung, Packung, Packstück, Füll-/Verschließ-/Kennzeichnungsmittel | `verpackung`, `verpackungsarten` | Fachbegriffe erklärt und soweit zentral mit Glossareinträgen verknüpfbar. Durchgängiges Beispiel unterscheidet Artikel-, Packungs- und Packstückzahl. |
| 78–80 | 84–86 | Verkaufs-, Um-, Transportverpackung; damaliges VerpackG, Registrierung, Beteiligung, Rücknahme | `verpackungsarten` | Funktionsabgrenzung erläutert; Rechtsstand EU-PPWR/VerpackDG geprüft. Keine pauschale Übernahme alter §15-VerpackG-Pflichten für sämtliche Verpackungen. Aktuelle konkrete Pflichten bleiben rollen- und fallbezogen. |
| 80–81 | 86–87 | Distributionsnetz, ein-/mehrstufig, Werks-/Zentral-/Regional-/Auslieferungslager; Abb. 3.3 | `warenausgang`, `distributionsstufen` | Lagerrollen, Auswahlkriterien, Kosten-/Servicekonflikt und differenzierte Sortimentsverteilung erklärt. Physische Lagerstufen von Händlerstufen unterschieden. |
| 81–82 | 87–88 | HGB/CMR/ADSp; Frachtbrief und Angaben Art.6 CMR | `transportvertraege`, `frachtbrief`, `adsp-verkehrsvertrag` | Vertragsrolle, Rechtsregime, wesentliche Datenfelder und zusätzliche fallbezogene Angaben erklärt. CMR-Frachtbrief nicht als konstitutive Vertragsvoraussetzung dargestellt. |
| 83 | 89 | Abb. 3.4: CMR-Muster mit Beteiligten, Sendungsdaten, Unterschriften und Zusatzfeldern | `frachtbrief`, `transportdokumente-glossar` | Lernrelevante Datenlogik durch Art.6-CMR-Text und Erläuterung abgedeckt. Formularbild nicht reproduziert; das OCR des Formulars ist nur bruchstückhaft lesbar. Keine Behauptung, alle visuellen Formularnummern aus OCR geprüft zu haben. |
| 82,84 | 88,90 | HGB-Pflichten: Vertrag, Verpackung, Ladung, Urkunden, Absenderhaftung, Weisungen, Lieferfrist | `adsp-verkehrsvertrag`, `transportvertraege`, `ladungssicherung` | Prüfungsebenen, Weisungen und Standgeld differenziert erläutert; Absenderrolle nicht allein am physischen Ladeort festgemacht. |
| 84 | 90 | Tabelle 3.5: Güterschaden, Lieferfrist, Nachnahme, sonstige Vermögensschäden, Ausschluss | `frachtfuehrerhaftung`, `sonderziehungsrechte` | Schadensarten und unterschiedliche Bezugsgrößen; SZR in beiden Kursrichtungen; kein automatischer Haftungsausschluss bei Stau. Haftung und Versicherung getrennt. |
| 84 | 90 | Schadensanzeige und Verjährung | `cmr-vorbehalte` | Sichtbar/verdeckt/Verspätung, HGB/CMR-Form und Frist, Beweisvermutung versus Erlöschen, Verjährung und interne Dokumentation getrennt. |
| 84–85 | 90–91 | Rollenbeispiel, falsche Ablieferadresse, KEP | `transportvertraege`, `frachtbrief`, `warenausgang`, `fall-wertschoepfung` | Vertragsrollen und tatsächliche Lieferstellen; widersprüchliche Dokumente vor Abfahrt klären. KEP-Leistungsmerkmale statt pauschaler Produktgarantien. |
| 85–86 | 91–92 | Ladehilfsmittel, Mehrweg/Tausch, Gleichheit der Einheiten; Abb.3.5 | `ladehilfsmittel` | Trägertypen, Systemkompatibilität und Umlaufbestand; durchgängige Einheit als Rationalisierungsziel statt zwingende Identität. Illustrative historische Abmessungen nicht als Produktfreigabe übernommen. |
| 86–87 | 92–93 | Ladungssicherung, Verantwortlichkeiten, technische Regeln, Betriebs-/Beförderungssicherheit | `ladungssicherung`, `ladungssicherung-rollen`, `fall-verladung` | Zwei Sicherungsebenen, Freigabe und Rollen; gesetzliche Grundverteilung mit Vorbehalt und öffentlich-rechtliche Pflichten. Keine unbelegte Unfallquote. |
| 88 | 94 | Gewichtskraft, Massenkraft, Reibung, Sicherungskraft; Abb.3.6; Form-/Kraftschluss/kombiniert | `sicherungsprinzipien`, `ladungssicherung-rollen` | Abbildung visuell geprüft. Wirkungen von Nieder- und Direktzurren erklärt; Masse/Kraft korrekt getrennt; Kräftebeispiel mit ausdrücklich fiktiven Rechenannahmen. |
| 89 | 95 | Kippen, Schwerpunkt, Lastverteilung, Rechtsfolgen | `ladungssicherung`, `ladungssicherung-rollen` | Kipp- und Fahrzeugprüfung; keine universelle halbe-Breite-Regel oder ungeprüfte Kippbeiwerte übernommen. Konkrete Auslegung gehört in Fachregel und Sicherungskonzept. |
| 89–90 | 95–96 | Entsorgungsobjekte, Tabelle 3.6, KrWG-Hierarchie | `entsorgungslogistik`, `entsorgungsobjekte` | Herkunft, Ausschuss, Überbestand, Verpackung, Nutzungsende; Behandlung und Gefährlichkeit getrennt. Nebenproduktstatus nicht allein aus Verkaufspreis abgeleitet. |
| 90 | 96 | Tabelle3.7 R-Strategien: Recall, Recycle, Repair, Resell, Return, Reuse | `abfallvermeidung`, `rueckfuehrung` | Begriffe und tatsächliche Stufe unterschieden. Recycling ist nicht Abfallvermeidung, Rückruf/Rückgabe zunächst keine Aussage zur anschließenden Behandlung. |
| 91 | 97 | Vorbereitung Wiederverwendung, Recycling, sonstige Verwertung, Beseitigung | `wiederverwendung-vorbereitung`, `recycling`, `sonstige-verwertung`, `abfallbeseitigung` | Seite visuell geprüft; Status vor Maßnahme und tatsächlicher Hauptzweck erläutert. Stofflich versus energetisch, Nebenprodukt §4, keine pauschale Zuordnung Kompostierung/Schrottplatz zu Beseitigung. |
| 92 | 98 | Berufstypische Aufgabe: fehlende Sicherung, fehlende Mittel, pauschaler Fahrerhinweis, Formschluss | `fall-verladung`, `ladungssicherung`, `sicherungsprinzipien` | Eigenständiger Fall plus Begründungssystematik und Transfer. Buchaufgabe nicht reproduziert. |

## Alle bestehenden Artikel erfasst

Zusätzlich zu den im Buch direkt benannten Teilthemen werden bestehende fachliche Ergänzungen ausdrücklich als solche erhalten und vertieft:

- `transportkosten-co2`: vergleichbare Systemgrenzen, Musskriterien, Kosten- und Emissionsrechnung mit fiktiven Werten.
- `verkehrsorganisation`: Hub-and-Spoke, Direktnetz, FCL/LCL, TEU, RoRo/LoLo und Schnittstellen.
- `gefahrgut-verkehrstraeger`: Abgrenzung Gefahrstoff/Gefahrgut und allgemeiner fachkundiger Prüfprozess. Keine operative Versandfreigabe, Mengenfreistellung oder Verpackungsanweisung.
- `cross-docking`: ein-/zweistufige Organisation, Anforderungen und Störungsfolgen.
- `transportdokumente-glossar`: Dokumentzwecke, GTIN/SSCC, Tracking/Tracing und Reaktionslogik.
- `rueckfuehrung`: Rückläuferprüfung, Sperrbestand und Ursachenkategorien.
- `fall-wertschoepfung`: Musskriterien, richtige Lieferstelle, Fehlmenge und vollständige Begründung.

Die Ergänzung enthält exakt alle 37 vorhandenen Lesson-IDs mit Nummer `3.*`; es gibt keine verwaisten Supplement-Schlüssel und keine neue Nummerierung.

## Übernommene Lernziele, korrigierte Buchverkürzungen

| Buchaussage / Risiko | Behandlung in myWik |
| --- | --- |
| Kilogramm wird mit Dekanewton gleichgesetzt (Buch S.94). | Masse und Kraft getrennt; 1 daN = 10 N; Gewichtskraft exakt mit g und gerundete Praxisannahme kenntlich. |
| Stau erscheint als Beispiel für nicht ersatzpflichtigen Schaden (S.90). | Keine pauschale Haftungsfreiheit. §426 HGB verlangt strengere Unvermeidbarkeits- und Abwendbarkeitsprüfung. |
| CMR-Frachtbrief wird als zwingende Grundlage des Vertrags dargestellt (S.87–88). | Dokumentationsregeln erklären, aber Art.4 CMR erhält Vertragsbestand trotz Fehlen/Mangel. |
| Frachtbrief wird sinngemäß immer zum allein bindenden Dokument bei widersprüchlicher Adresse erklärt (S.91). | Widersprüche vor Fahrt klären; tatsächliche Haftung hängt von Vertrag, Angaben, Weisungen und Erkennbarkeit ab. |
| Nationale Erlaubnis und Gemeinschaftslizenz werden ohne aktuellen Übergang beschrieben (S.80–81). | Aktueller §3 GüKG und Übergang §24 berücksichtigt; Gewichts-/Verkehrsgebietsausnahmen separat. |
| Personaleinsatz im Werkverkehr wird ausschließlich auf eigenes Personal verkürzt (S.80). | Zulässige Personalstellung nach aktuellem §1 GüKG berücksichtigen; keine bloße Eigentumsprüfung. |
| VerpackG wird als geltender alleiniger Rahmen verwendet (S.84–86). | Lernbegriffe beibehalten; EU-PPWR und VerpackDG mit aktuellem Stand und Übergangsprüfung. |
| Nebenprodukt wird nur anhand fehlender besonderer Vorbehandlung abgeleitet (S.97). | Alle Voraussetzungen nach §4 KrWG nötig. Positiver Wert allein genügt nicht. |
| Recycling steht in einer Tabelle unter Vermeidungsstrategien (S.96). | Praktische R-Strategien von gesetzlichen Hierarchiestufen unterscheiden. |
| Kompostierung/Vergärung und Schrottplatzsortierung werden allgemein unter Beseitigung genannt (S.97). | Keine pauschale Einordnung. Tatsächliches Verfahren und stoffliche Nutzung entscheiden mit. |
| Alle Risiken und alle Verantwortung sollen allein dem Fahrer per Begleitpapier zugeschoben werden (Aufgabe S.98). | Keine automatische Entlastung anderer Beteiligter; HGB-Grundverteilung, tatsächliche Handlungen und Straßenverkehrspflichten gesondert. |

Es wurde im geprüften bisherigen Apptext kein unmittelbar widersprechender Satz zu diesen Korrekturen festgestellt. Die bestehenden Darstellungen waren überwiegend bereits vorsichtig, aber vielfach zu knapp. Daher sind die Korrekturen als vertiefende Erläuterungen eingefügt, ohne vorhandene Absätze zu löschen.

## Quellenbasis und Grenzen

Rechts- und Sicherheitsdetails wurden gegen amtliche Gesetzestexte und Primärinformationen geprüft, insbesondere HGB §§408–414, 418, 422, 425–426, 431, 433, 435, 438–439; GüKG §§1–3, 7a, 9, 15a, 24; KrWG §§3–4, 6, 15 und 22; CMR Art.4–6 und30; §22 StVO sowie BGHM/BG-RCI-Hinweise zur Ladungssicherung. Aktuelle Verpackungsinformationen stammen von Umweltbundesamt und Bundesumweltministerium. Konkrete URLs stehen in den betroffenen Supplement-Einträgen.

Der Grundstoff von Kapitel3 ist am vollständigen OCR-Text erfasst und durch die vorhandenen Artikel plus Ergänzungen fachlich ausgearbeitet. Dies ist keine Behauptung einer operativen Rechts- oder Verladefreigabe. Bewusst nicht als unveränderliches Lernwissen übernommen wurden historische Marktanteile, aktuelle Rekordkapazitäten, exakte Produktmaße aus Beispieldarstellungen, unbelegte Unfallquoten und vereinfachte technische Kippbeiwerte. Der fachliche Gehalt dieser Stellen wird durch Mengen-/Leistungsunterscheidung, Eignungskriterien, Datenblattprüfung und sichere Wirkungsmodelle ersetzt.

### Verbleibende Prüfgrenzen

- Das CMR-Musterformular auf PDF83/Buch89 ist im OCR stark beschädigt. Seine fachliche Datenlogik wurde über Art.6 CMR und den umliegenden Text erfasst; eine fehlerfreie Nachbildung aller visuellen Formularfelder wird nicht behauptet und ist für den Lernartikel nicht nötig.
- Die Abbildungsinhalte sind in eigenständige Erklärungen übertragen, nicht als Buchgrafiken reproduziert. Ein app-eigener Vergleich der Fertigungsformen oder eine Fördermittelmatrix wäre eine sinnvolle spätere Darstellungsergänzung, ist für die vorhandenen textlichen Lernziele aber keine offene Fachlücke.
- Technische Normen werden nicht als frei zugänglich vollständig geprüft ausgegeben. Konkrete Zurrmittel-, Kipp- und Lastberechnungen verlangen die anwendbaren Regeln und Fahrzeug-/Ladungsdaten.
- Spezielle GüKG-Ausnahmen, Kabotagegrenzen, Gefahrgut-Freistellungen und Verpackungspflichten werden im tatsächlichen Anwendungsfall weiter geprüft. Die Artikel liefern die Abgrenzung und den Prüfweg, keine erfundene allgemeine Freigabe.

## Eigenprüfung der Ergänzungsdatei

- 37 vorhandene 3.x-Lessons gegen 37 Supplement-Schlüssel abgeglichen, keine fehlenden/zusätzlichen Schlüssel.
- Jede Ergänzung enthält eine Transferfrage und eine dazu passende Musterantwort; bestehende Selbstkontrollen bleiben bestehen.
- Zahlenbeispiele nachgerechnet: Durchlaufzeit180 min; 24 Behälter/h je Fördermittel; 770 € Gesamttransport; 1.000/2.000 tkm; 24h Laufzeitkette; 3€/5€ Mehrweg; 2,80€ Transfer; 14 offene Träger; 981daN exakte Gewichtskraft; didaktische 500daN Restkraft; 25% Intensitätsminderung; 30% Verschnittminderung; 85% Materialausbeute; SZR-Kursrichtungen und Schadensminimum geprüft.
- Kein Projektbuild und kein Push durch diesen Teilauftrag; Integration, Darstellung und übergreifende Glossarprüfung erfolgen durch den Hauptagenten.
