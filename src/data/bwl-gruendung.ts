import { section, check } from './rw-standard';
import { source, type BwlTopic } from './bwl-standard';

const planSource = () => source(
  'IHK Lüneburg-Wolfsburg, Businessplan-Anleitung: https://www.ihk.de/ihklw/produkte/beratung-und-service/gruendung-foerderung/businessplan/businessplan-870282',
  'IHK Dresden, Businessplan erstellen: https://www.ihk.de/dresden/hauptnavigation/existenzgruendung-startup/businessplan-erstellen-6015452',
  'IHK Berlin, Checkliste für die Gründung: https://www.ihk.de/blueprint/servlet/bihk24/service-und-beratung/existenzgruendung/checkliste-zur-gruendung-3170924');
export const formSource = () => source(
  'Existenzgründungsportal, Rechtsformübersicht: https://www.existenzgruendungsportal.de/Navigation/DE/Gruendungswissen/Rechtsformen/rechtsformen',
  'BGB §§ 705, 715, 720, 721: https://www.gesetze-im-internet.de/bgb/ ; HGB §§ 105–107, 116, 124, 126, 161, 164, 170–172, 230: https://www.gesetze-im-internet.de/hgb/',
  'GmbHG §§ 5, 5a, 7, 11, 13, 35, 37, 46: https://www.gesetze-im-internet.de/gmbhg/ ; AktG §§ 1, 7, 76, 78, 111, 119: https://www.gesetze-im-internet.de/aktg/');

export const startupTopics: BwlTopic[] = [
  {
    id: 'bwl-rechtsformen', number: '2', title: 'Existenzgründung und Unternehmensrechtsformen',
    intro: 'Existenzgründung baut eine selbstständige wirtschaftliche Tätigkeit auf. Die Rechtsform organisiert deren rechtlichen Rahmen. Beides muss zusammenpassen: Eine passende Rechtsform ersetzt kein tragfähiges Geschäftsmodell.',
    sections: [
      section('prinzip', 'Drei Fragen vor dem Start',
        'Erstens: Welchen Kundennutzen bietet die Leistung, und zahlt die Zielgruppe einen kostendeckenden Preis? Zweitens: Kann das Team sie mit verfügbaren Mitteln tatsächlich liefern? Drittens: Welche [[t:bwl-rechtsform|Rechtsform]] passt zu Haftungsrisiko, Kapital, Leitung und Beteiligung?',
        'Neugründung baut Strukturen selbst auf; Übernahme nutzt bestehende Kunden und Prozesse, verlangt aber Prüfung von Wert, Altlasten und Übergang. Franchise nutzt ein fremdes Geschäftskonzept gegen Gebühren und Bindungen. Haupt- und Nebenerwerb unterscheiden den Umfang der Tätigkeit, nicht die Rechtsform. Auch ein Nebenerwerb braucht eine tragfähige Planung und passende Anmeldung.'),
      section('beispiel', 'Vom Leuchtenkonzept zum Unternehmen',
        'Mira und Leon wollen Nordlicht gründen. Ihr Nutzenversprechen lautet: reparierbare Leuchten für Büroausstatter. Vor dem Mietvertrag testen sie Muster und Zahlungsbereitschaft. Sie planen Material, Endprüfung, Absatz und Liquidität. Wegen Produkthaftungsrisiken und gemeinsamer Leitung vergleichen sie GmbH, GbR und KG; die Entscheidung folgt aus Anforderungen statt aus dem Namen.'),
      section('lernweg', 'Vorbereitung, Formwahl und Entscheidung',
        'Die [[a:bwl-gruendungsphasen|Gründungsphasen]] strukturieren das Vorgehen. [[a:bwl-gruendungsvoraussetzungen|Voraussetzungen]] prüfen die Umsetzbarkeit. [[a:bwl-rechtsformwahl|Rechtsformwahl]], [[a:bwl-rechtsformkombinationen|Formen und Kombinationen]] sowie [[a:bwl-haftung-leitung-vertretung|Haftung und Leitung]] führen zur Entscheidung. Der [[a:bwl-fall-gruendung|Übungsfall]] kombiniert sie.',
        'Typische Fehler sind eine Gründung mit Gewerbeanmeldung gleichzusetzen und Finanzierung oder Kundennachweis erst nach unwiderruflichen Ausgaben zu klären. Eine erfolgreiche Eintragung belegt keine wirtschaftliche Tragfähigkeit.'),
      planSource(),
      ...check('Warum sind Geschäftsmodell und Rechtsform zwei verschiedene Entscheidungen?', 'Das Geschäftsmodell erklärt Kundennutzen und wirtschaftliche Leistungserbringung. Die Rechtsform regelt unter anderem Haftung, Leitung und Beteiligung. Beide müssen passen.',
        'Eine Gründerin übernimmt einen Onlineshop. Entfällt dadurch die Planungsphase?', 'Nein. Sie muss Kundentreue, Ertrag, Kaufpreis, Altlasten und Übergang prüfen. Bestehende Umsätze sind keine Garantie für den Erfolg unter neuer Leitung.'),
    ],
  },
  {
    id: 'bwl-gruendungsphasen', parentId: 'bwl-rechtsformen', number: '2.1', title: 'Gründungsphasen: von der Idee zur Festigung',
    intro: 'Gründungsphasen gliedern den Aufbau in überprüfbare Schritte. Sie helfen, Unsicherheit früh zu verringern und Kapital erst dann fest zu binden, wenn wichtige Voraussetzungen geklärt sind.',
    sections: [
      section('phasen', 'Vier Phasen mit Entscheidungspunkten',
        '1. Orientierung: persönliche Ziele und Eignung prüfen, Problem und Zielgruppe benennen, mögliche Gründungswege vergleichen. Ergebnis ist eine überprüfbare Geschäftsidee. Entscheidung: weiter testen, ändern oder verwerfen?',
        '2. Konzeption: Markt, Wettbewerb, Angebot, Standort, Prozesse, Team und Rechtsform planen. Ein [[t:bwl-businessplan|Businessplan]] verbindet die Erklärung des Vorhabens mit Rentabilitäts-, Kapitalbedarfs- und Liquiditätsplanung. Finanzierung, Genehmigungen und Risiken sind vor größeren Bindungen zu klären.',
        '3. Umsetzung: Finanzierung verbindlich sichern, Gesellschaft errichten und erforderliche Register, Anzeigen und Erlaubnisse klären, geeignete Verträge schließen, Ressourcen beschaffen und den Betrieb starten. Die Reihenfolge hängt vom Vorhaben ab; manche Förderungen setzen einen Antrag vor Vorhabenbeginn voraus und müssen konkret geprüft werden.',
        '4. Anlauf und Festigung: tatsächlichen Absatz, Zahlungseingang, Qualität und Kosten mit dem Plan vergleichen, Reserven überwachen und anpassen. Diese Viererfolge ist ein didaktisches Modell; andere Quellen teilen die Schritte feiner ein. Es gibt keine für jede Gründung identischen Fristen.'),
      section('anwendung', 'Nordlicht arbeitet mit Freigaben',
        'In der Orientierung führen Mira und Leon Interviews mit Büroausstattern. In der Konzeption testen sie Muster und erhalten konkrete Angebotsanfragen. Ihr Plan enthält nicht nur Maschinen, sondern auch Vorräte und die Zeit bis zur ersten Kundenzahlung. Sie geben den langfristigen Hallenvertrag erst frei, nachdem Finanzierung und Nutzbarkeit des Standorts geklärt sind.',
        'Nach dem Start vergleichen sie wöchentlich Aufträge und Zahlungseingänge. Fallen Bestellungen geringer aus, wird die nächste Ausbaustufe verschoben. Das ist Rückkopplung, kein Scheitern des Phasenmodells. Der Businessplan wird an neue Daten angepasst.'),
      section('grenzen', 'Pläne als Annahmen behandeln',
        'Ein Plan kann Nachfrage nicht beweisen. Dokumentiere deshalb Datenquelle, Annahme, Verantwortliche und Prüftermin. Typische Fehler: einen optimistischen Umsatzplan für eine Bestellung halten, Meilensteine nur nach Datum statt nach Nachweisen setzen und nach dem Start nicht mehr kontrollieren.'),
      planSource(),
      ...check('Welche Entscheidung gehört zwischen Konzeption und Umsetzung?', 'Ob Markt- und Ressourcenannahmen ausreichend belegt sind, Finanzierung und nötige Voraussetzungen gesichert sind und das Risiko tragbar ist. Erst dann werden größere Bindungen freigegeben.',
        'Ein Caterer erhält viele positive Rückmeldungen, aber keine Buchungen. Soll er sofort eine große Küche mieten?', 'Er sollte Zahlungsbereitschaft und verbindliche Nachfrage weiter testen, Genehmigungen und Finanzierung klären und eine kleinere Startvariante prüfen. Lob ersetzt keine zahlenden Aufträge.'),
    ],
  },
  {
    id: 'bwl-gruendungsvoraussetzungen', parentId: 'bwl-rechtsformen', number: '2.2', title: 'Voraussetzungen der Existenzgründung',
    intro: 'Gründungsvoraussetzungen sind persönliche, fachliche, wirtschaftliche, sachliche und rechtliche Bedingungen eines tragfähigen Starts. Eine systematische Prüfung macht Lücken vor dem ersten bindenden Vertrag sichtbar.',
    sections: [
      section('prueffelder', 'Fünf Prüffelder mit Nachweisen',
        'Persönlich: Motivation, Belastbarkeit, Risikotragfähigkeit, Zeit und private Absicherung. Fachlich und kaufmännisch: Branchenwissen, Kalkulation, Vertrieb, Buchführung und gegebenenfalls vorgeschriebene Qualifikationen. Fehlendes Wissen kann teilweise durch Team, Beratung oder Schulung ergänzt werden.',
        'Wirtschaftlich: ausreichend erreichbare Kunden, unterscheidbarer Nutzen, realistische Preise und Kosten sowie Mittel für Anlaufverluste und Lebensunterhalt. Sachlich: geeigneter Standort, Anlagen, Lieferanten, Datenverarbeitung und Personal. Rechtlich: zulässige Tätigkeit, erforderliche Erlaubnisse, gegebenenfalls berufsrechtliche Anforderungen, Register, steuerliche Erfassung und betriebliche Schutzpflichten.'),
      section('beispiel', 'Eine Lücke darf nicht im Umsatzplan verschwinden',
        'Mira beherrscht Produktentwicklung, Leon Vertrieb. Kaufmännische Planung lernen sie mit Beratung. Für Nordlicht liegen Musterrückmeldungen vor, aber noch keine verbindlichen Bestellungen. Sie planen deshalb ein vorsichtiges Absatzszenario. Die Endprüfung ist personell abzusichern; eine gemietete Halle muss für die geplante Nutzung geeignet sein.',
        'Beispiel: Monatliche Fixkosten 6.000 €, Preis 100 € netto, variable Kosten 60 €/Stück. Gewinnschwelle = 6.000 € ÷ (100 − 60) €/Stück = 150 Stück/Monat. Bei 120 Stück fehlen 1.200 € zur Fixkostendeckung. Private Entnahmen, Steuern und Zahlungsverschiebungen müssen zusätzlich in den passenden Plänen berücksichtigt werden; die Schwelle allein beweist keine Liquidität.'),
      section('recht', 'Anzeigen und Erlaubnisse getrennt prüfen',
        'Eine Gewerbeanzeige ersetzt keine spezielle Erlaubnis. Nicht jede selbstständige Tätigkeit ist ein Gewerbe; freie Berufe haben andere Anforderungen. Für Nordlicht sind Tätigkeit, Standort und Produkte konkret zu prüfen. Die juristischen Einzelheiten erläutern [[a:recht-gewerbeanzeige|Gewerbeanzeige und Gründung]] und [[a:recht-gewerbeerlaubnis-ueberwachung|Erlaubnispflicht und Überwachung]].',
        'Typische Fehler: nur Ausstattung finanzieren, privates Mindestbudget vergessen oder fachliche Erfahrung mit unternehmerischer Eignung gleichsetzen. Ergebnis der Prüfung ist ein Maßnahmenplan: Welche Lücke ist von wem bis wann zu schließen, welche verhindert den Start?'),
      source('IHK Ulm, persönliche Voraussetzungen: https://www.ihk.de/ulm/hauptnavigation/existenzgruendung/erste-schritte-orientierung/persoenliche-voraussetzungen-fuer-eine-gruendung--6694780',
        'IHK Ostwürttemberg, Gründungskonzept: https://www.ihk.de/ostwuerttemberg/produktmarken/gruendung-und-unternehmensservice/existenzgruendung/gruendungskonzept-arbeitshilfe-7188534',
        'Gewerbeordnung §§ 1, 14 und jeweils tätigkeitsspezifische Vorschriften: https://www.gesetze-im-internet.de/gewo/'),
      ...check('Warum genügt eine Gewerbeanzeige nicht als Nachweis aller Voraussetzungen?', 'Sie zeigt den Beginn einer gewerblichen Tätigkeit an. Besondere Erlaubnisse, Qualifikationen, Standortanforderungen und wirtschaftliche Tragfähigkeit sind getrennt zu prüfen.',
        'Eine Gründerin hat 20.000 € für Anlagen, aber keine Reserve bis zum ersten Kundeneingang. Was fehlt?', 'Ein vollständiger Kapitalbedarfs- und terminierter Liquiditätsplan einschließlich Vorlaufkosten, laufender Auszahlungen und privater Absicherung. Finanzierung oder ein kleinerer Start müssen vor Bindung geklärt werden.'),
    ],
  },
  {
    id: 'bwl-rechtsformwahl', parentId: 'bwl-rechtsformen', number: '2.3', title: 'Rechtsformen betriebswirtschaftlich auswählen',
    intro: 'Rechtsformwahl ist die begründete Entscheidung für einen rechtlichen Organisationsrahmen. Sie soll Risiken, Kapitalbedarf, Leitungswünsche und Entwicklungsmöglichkeiten des konkreten Unternehmens zusammenbringen.',
    sections: [
      section('methode', 'Von Anforderungen zu geeigneten Alternativen',
        '1. Beteiligte und Geschäftsmodell bestimmen. 2. Musskriterien festhalten: etwa keine persönliche Regelhaftung, aktive gemeinsame Leitung oder Zugang zu bestimmten Kapitalgebern. 3. Geeignete Formen nach Haftung, Kapital, Leitung, Vertretung, Gründungs- und Folgeaufwand, Übertragbarkeit und Kontinuität vergleichen. 4. Vorteile und Nachteile gewichten, Entscheidung mit Falltatsachen begründen. 5. Bei veränderten Anforderungen neu prüfen.',
        'Steuern, Publizität, Mitbestimmung und Nachfolge können wichtig sein, erlauben aber keine allgemeine Rangfolge. Eine belastbare Steuerbeurteilung braucht unter anderem erwartete Gewinne, Ausschüttung und persönliche Verhältnisse. Die [[a:bwl-rechtsformkombinationen|Formen und Kombinationen]] und der [[a:bwl-haftung-leitung-vertretung|Vergleich von Haftung, Leitung und Vertretung]] liefern die Grundlagen.'),
      section('anwendung', 'Nordlicht gewichtet statt abzuzählen',
        'Mira und Leon wollen beide aktiv leiten, rechnen mit Produktrisiken und können zusammen 40.000 € Eigenmittel einbringen. Eine GmbH passt wegen grundsätzlich auf Gesellschaftsvermögen begrenzter Gläubigerhaftung und gestaltbarer gemeinsamer Leitung. Sie erfordert dafür notarielle Gründung, Register und laufenden Rechnungslegungsaufwand. Eine GbR ist einfacher, scheitert aber hier am gewünschten Ausschluss persönlicher Regelhaftung.',
        'Eine bloße Punkteliste dürfte die GbR nicht durch viele kleine Komfortvorteile über ein zwingendes Haftungskriterium heben. Die GmbH-Wahl garantiert keine persönliche Risikofreiheit: Bürgschaften, ausstehende Einlagen und Pflichtverletzungen sind gesondert zu prüfen. Auch 25.000 € Stammkapital ersetzen keine ausreichende Betriebsfinanzierung.'),
      section('grenzen', 'Andere Anforderungen ändern die Wahl',
        'Bei einer einzelnen Person, überschaubarem Risiko und sehr kleinem beratendem Start kann ein Einzelunternehmen wirtschaftlich passen. Bei passivem Kapitalgeber und aktiver Leitung kann eine KG-Struktur interessant sein; die unbeschränkte Haftung des Komplementärs bleibt zu bewerten. Viele wechselnde Beteiligte und standardisierte Anteilsübertragung können für eine AG sprechen, wenn deren Aufwand tragbar ist.',
        'Typische Fehler: Haftungsbegrenzung mit Verlustfreiheit gleichsetzen, Stammkapital mit gesamten Gründungskosten verwechseln oder eine steuerlich pauschal „beste“ Form behaupten.'),
      formSource(),
      ...check('Warum werden Musskriterien vor einer Nutzwertabwägung geprüft?', 'Eine Form, die eine unverzichtbare Anforderung verfehlt, darf nicht durch viele weniger wichtige Vorteile gewinnen. Erst geeignete Formen werden gewichtet.',
        'Nordlicht erhält einen passiven Kapitalgeber, der keinen Einfluss auf das Tagesgeschäft möchte. Muss die GmbH aufgegeben werden?', 'Nein. Auch eine GmbH kann aktive Geschäftsführung und passive Beteiligung trennen. Daneben sind KG oder GmbH & Co. KG zu prüfen. Kapitalbedarf, Mitspracherechte, Haftung und Folgeaufwand entscheiden; ein einzelnes neues Merkmal erzwingt keine Form.'),
    ],
  },
];

export const startupTerms: [string, string, string, string][] = [
  ['rechtsform', 'Rechtsform', 'Gesetzlicher Organisationsrahmen eines Unternehmens, insbesondere für Haftung, Leitung, Vertretung und Beteiligung.', 'rechtsformwahl'],
  ['businessplan', 'Businessplan', 'Zusammenhängender Geschäftsplan, der Kundennutzen, Markt, Umsetzung, Team, Risiken und die finanzielle Tragfähigkeit eines Vorhabens erklärt.', 'gruendungsphasen'],
];
