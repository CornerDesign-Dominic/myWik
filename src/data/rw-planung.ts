import { check, section, type AccountingTopic } from './rw-standard';

export const accountingPlanning: AccountingTopic[] = [
  {
    id: 'rw-planungsinhalt', number: '5.1', title: 'Integrierte Planungsrechnung und Teilpläne',
    intro: 'Die Planungsrechnung übersetzt Ziele und Annahmen in erwartete Mengen, Ergebnisse, Zahlungen und Bestände. Abgestimmte Teilpläne zeigen, ob eine Maßnahme wirtschaftlich und finanzierbar ist.',
    terms: [
      ['rw-teilplan', 'Teilplan', 'Abgestimmter Ausschnitt der Unternehmensplanung, etwa für Absatz, Beschaffung, Personal oder Investitionen.'],
      ['rw-liquiditaetsplan', 'Liquiditätsplan', 'Zeitlich gegliederte Vorschau der erwarteten Ein- und Auszahlungen sowie der daraus folgenden verfügbaren Zahlungsmittel.'],
    ],
    sections: [
      section('treiber', 'Absatz, Leistung und Ressourcen verknüpfen',
        'Ein [[t:rw-teilplan|Teilplan]] liefert Eingaben für weitere Pläne. Absatzmenge × erzielbarer Nettopreis ergibt Planumsatz. Produktion = Absatz + gewünschter Endbestand − Anfangsbestand. Produktion und Stücklisten bestimmen Bedarf, Beschaffung berücksichtigt Lagerziele. Personal, Kapazität und Investitionen werden mit Mengen, Sätzen und Zeitbezug geplant. Bei knappem Personal oder Material muss der Absatzplan auf Machbarkeit zurückgeprüft werden.',
        'Ein Betrieb plant 1.000 Stück Absatz, 100 Stück Anfangsbestand und 180 Stück Zielbestand. Geplante Produktion = 1.080 Stück. Bei 2 kg je Stück ergibt sich ein Bedarf von 2.160 kg vor Bestandsänderungen im Materiallager. Werden nur 1.030 Stück Kapazität erreicht, fehlen 50 Stück für den gewünschten Endbestand. Dann werden Menge, Beschaffung oder Schichtmodell abgestimmt.'),
      section('integration', 'Plan-GuV, Finanzplan und Planbilanz abstimmen',
        'Die Plan-GuV stellt erwartete Erträge und Aufwendungen gegenüber. Der [[t:rw-liquiditaetsplan|Liquiditätsplan]] bildet Zahlungen mit konkreten Terminen ab. Die Planbilanz schreibt Bestände fort. Bei Absatz auf Ziel erzeugt der Umsatz zunächst eine Forderung, bei Kauf einer Maschine entsteht ein Anlageposten und später Abschreibungsaufwand. Tilgung mindert Zahlungsmittel und Schuld. Sie ist kein Aufwand.',
        'Ein Betrieb plant 40.000 € Umsatz, davon 25.000 € Zahlung im Monat und 15.000 € Forderungen am Monatsende. Laufende zahlungswirksame Kosten betragen 22.000 €, Abschreibung 3.000 €. Zusätzlich wird eine Anlage für 10.000 € bar erworben. Planerfolg = 15.000 € Gewinn. Zahlungssaldo = 25.000 € − 22.000 € − 10.000 € = −7.000 €. Weitere Effekte bleiben im Modell außen vor. Prüfe daher Gewinnziel und Zahlungsfähigkeit gemeinsam.'),
      section('kontrolle', 'Soll-Ist-Abweichungen nach Treibern erklären',
        'Bei 100 geplanten Aufträgen zu 150 € und 110 tatsächlichen zu 140 € wächst der Umsatz von 15.000 € auf 15.400 €. Mengeneffekt bei Planpreis = (110 − 100) × 150 € = +1.500 €. Preiseffekt bei Istmenge = 110 × (140 € − 150 €) = −1.100 €. Die Summe erklärt +400 €. Andere Reihenfolgen verteilen den Interaktionseffekt anders, daher Methode angeben.',
        'Ein flexibles Budget rechnet variable Sollkosten auf die Istbeschäftigung um. Bei 3.000 € fixen Sollkosten und 40 € je Auftrag ergeben 100 Planaufträge 7.000 € Plankosten. Bei 110 Istaufträgen ergibt sich ein flexibles Soll von 7.400 €. Mit 7.700 € Istkosten entfallen 400 € der Gesamtabweichung auf die Beschäftigung und 300 € auf die Abweichung vom flexiblen Soll. So lässt sich der Mengeneffekt vom Mehrverbrauch oder Preisauftrieb trennen. Bei Prognosen mit unsicheren Treibern helfen Basisszenario, ungünstiges Szenario und Sensitivitäten, etwa längere Zahlungsziele, geringerer Absatz und steigende Fremdfrachtpreise.'),
      ...check('Warum kann ein Planüberschuss mit einem Zahlungsmittelrückgang einhergehen?', 'Aufwände und Erträge folgen der Leistung und Periodenabgrenzung. Zahlungen können später oder früher erfolgen. Investitionszahlungen können den Bestand sofort belasten und den Erfolg nur über Abschreibungen beeinflussen.',
        'Der geplante Eingang von 12.000 € für bereits fakturierte Leistungen verschiebt sich um einen Monat. Was ändert sich im aktuellen Monat?', 'Endbestand liquider Mittel sinkt gegenüber dem Plan um 12.000 €, Forderungen steigen um 12.000 €. Die Plan-GuV bleibt bei unveränderter Leistung und Werthaltigkeit gleich.'),
    ],
  },
  {
    id: 'rw-planungshorizonte', number: '5.2', title: 'Planungshorizonte, Budget und rollierende Prognose',
    intro: 'Planungshorizont und Detaillierung richten sich nach Bindungsdauer und Steuerungsbedarf. Je näher ein Zeitraum rückt, desto genauer lassen sich Mengen, Schichten und Zahlungen planen.',
    terms: [
      ['rw-budget', 'Budget', 'Verbindlicher Ziel- und Ressourcenrahmen für eine Organisationseinheit und einen festgelegten Zeitraum.'],
      ['rw-forecast', 'Rollierender Forecast', 'Regelmäßig aktualisierte Prognose, bei der der betrachtete Zukunftshorizont durch Hinzufügen neuer Perioden fortgeschrieben wird.'],
    ],
    sections: [
      section('horizonte', 'Langfristige Entscheidungen in kurze Maßnahmen übersetzen',
        'Strategische Planung betrachtet langfristige Ausrichtung, Standorte und Geschäftsmodelle. Taktische Planung konkretisiert meist mittelfristige Kapazitäten, Investitionen oder Verträge. Operative Planung übersetzt dies in saisonale Budgets, Monatsmengen, Schichtpläne oder wöchentliche Liquidität. Einheitliche Jahresgrenzen gibt es für diese Kategorien nicht. Die Bindungsdauer entscheidet.',
        'Eine Spedition prüft über mehrere Jahre einen zweiten Standort, plant mittelfristig Lager- und Unternehmerverträge und erstellt kurzfristig einen Wochenplan für Auszahlungen. Die Investition muss mit langfristiger Nachfrage und Finanzierung vereinbar sein. Ein Engpass in zwei Wochen erfordert eine Rechnung nach Fälligkeiten.'),
      section('prozesse', 'Budget, Prognose und Maßnahmen auf denselben Stand beziehen',
        'Das [[t:rw-budget|Budget]] hält den vereinbarten Ziel- und Ressourcenrahmen fest. Ein [[t:rw-forecast|rollierender Forecast]] aktualisiert die erwartete Entwicklung und verlängert regelmäßig den Ausblick. Bei einem Horizont von zwölf Monaten wird nach Ablauf des Januar beispielsweise erneut für Februar bis Januar geplant. Sollwerte bleiben für Abweichungsanalysen verfügbar.',
        'Top-down setzt Ziele und Grenzen, Bottom-up meldet Mengen und Kapazitäten aus den Bereichen. Das Gegenstromverfahren stimmt beide Richtungen ab. Jede wesentliche Planannahme erhält einen Verantwortlichen, eine Datenquelle und einen Aktualisierungsanlass. Für volatile Wochen eignet sich eine kürzere Aktualisierung als für gebundene Mietzahlungen.',
        'Ein Händler budgetiert 1,2 Mio. € Umsatz. Nach sechs Monaten und geänderten Absatzannahmen prognostiziert er 1,05 Mio. € für dasselbe Geschäftsjahr. Die Differenz von 150.000 € beschreibt eine erwartete Zielabweichung. Eine Entscheidung über Maßnahmen folgt aus Preis, Menge, Saison und Liquiditätslage.'),
      ...check('Wofür dient ein Forecast zusätzlich zum Budget?', 'Er zeigt unter aktuellen Annahmen das voraussichtliche Ergebnis und unterstützt Gegenmaßnahmen. Das Budget liefert den vereinbarten Vergleichsmaßstab.',
        'Ein Lieferant verlangt künftig zwei Wochen früher Zahlung. Welche Planung aktualisierst du zuerst?', 'Die kurzfristige Liquiditätsplanung nach konkreten Fälligkeiten. Danach prüfe ich Folgen für Finanzierung, Einkaufskonditionen und integrierten Forecast.'),
    ],
  },
  {
    id: 'rw-fall-planung', number: '5.3', title: 'Übungsfall: Ergebnis, Liquidität und Szenario planen',
    intro: 'Eine Spedition plant zwei Monate. Verzögerte Kundenzahlungen belasten die Liquidität, obwohl das Geschäft profitabel ist.',
    sections: [
      section('fall', 'Ausgangslage und Auftrag',
        'Bank Anfang Januar 12.000 €, Forderungen und Verbindlichkeiten zu Beginn jeweils null. Das Anfangseigenkapital beträgt 12.000 €, andere Bestände liegen nicht vor. Umsatz Januar 30.000 €, Februar 36.000 €. Kunden zahlen 60 % im Leistungsmonat, den Rest im Folgemonat. Fremdleistungen Januar 18.000 €, Februar 22.000 €, jeweils vollständig im Folgemonat zahlbar. Laufende fixe Ausgaben und Aufwendungen 9.000 € je Monat. Im Januar wird eine Anlage für 8.000 € bezahlt. Die Abschreibung beträgt in beiden Monaten je 500 €. Umsatzsteuer, Zinsen und weitere Vorgänge bleiben außen vor.',
        'Berechne Planerfolg und Bank am Monatsende und erstelle daraus eine vereinfachte Planbilanz für Ende Februar. Prüfe dann den Fall, in dem von den Februarumsätzen nur 30 % sofort eingehen.'),
      section('loesung', 'Erfolg und Zahlungen getrennt rechnen und abstimmen',
        'Januarerfolg = 30.000 € − 18.000 € − 9.000 € − 500 € = 2.500 €. Bank = 12.000 € + 18.000 € − 9.000 € − 8.000 € = 13.000 €. Februarerfolg = 36.000 € − 22.000 € − 9.000 € − 500 € = 4.500 €. Einzahlungen Februar = 12.000 € + 21.600 € = 33.600 €. Auszahlungen = 18.000 € + 9.000 € = 27.000 €. Bank Ende Februar = 19.600 €.',
        'Forderungen Ende Februar = 14.400 €. Anlagebuchwert = 8.000 € − 2 × 500 € = 7.000 €. Aktiva = 19.600 € Bank + 14.400 € Forderungen + 7.000 € Anlage = 41.000 €. Auf der Passivseite stehen 22.000 € Fremdleistungsverbindlichkeiten und 19.000 € Eigenkapital aus 12.000 € Anfangswert + 2.500 € + 4.500 € Ergebnissen. Die Bilanz ist ausgeglichen. Sinkt die sofortige Zahlungsquote für Februar auf 30 %, verschieben sich 10.800 € in den März. Bank Ende Februar = 8.800 €, Forderungen = 25.200 €. Der Februarerfolg bleibt im Modell 4.500 €. Liegt die Mindestreserve bei 10.000 €, fehlen 1.200 €. Für untermonatliche Spitzen sind die tatsächlichen Fälligkeiten zu prüfen.'),
      ...check('Warum werden die Januar-Fremdleistungen in beiden Monaten berücksichtigt?', 'Sie sind im Januar Aufwand und im Februar Auszahlung. Die Verbindlichkeit überbrückt die Zeit zwischen Leistung und Zahlung.',
        'Die Anlage wird bei gleicher Abschreibung erst im Februar bezahlt. Wie ändern sich die Bankendbestände im Basisszenario?', 'Ende Januar steigt Bank kalkulatorisch von 13.000 € auf 21.000 €. Ende Februar beträgt Bank nach der Zahlung weiterhin 19.600 €.'),
    ],
  },
];
