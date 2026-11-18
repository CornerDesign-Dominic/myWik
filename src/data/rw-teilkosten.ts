import { check, section, type AccountingTopic } from './rw-standard';

export const accountingDecisions: AccountingTopic[] = [
  {
    id: 'rw-vollkosten-teilkosten', number: '3.5.1', title: 'Vollkosten- und Teilkostenrechnung vergleichen',
    intro: 'Vollkosten verteilen fixe und variable Kosten auf Leistungen. Die Teilkostenrechnung weist für Entscheidungen einen ausgewählten Kostenanteil je Leistung aus. In der Deckungsbeitragsrechnung sind das typischerweise die variablen Kosten.',
    terms: [
      ['rw-vollkosten', 'Vollkosten', 'Summe der einem Bezugsobjekt direkt und indirekt zugerechneten fixen und variablen Kosten.'],
      ['rw-teilkosten-begriff', 'Teilkostenrechnung', 'Rechnung, die nur ausgewählte Kosten, typischerweise variable Kosten, den Kostenträgern zurechnet und übrige Kosten getrennt behandelt.'],
    ],
    sections: [
      section('vergleich', 'Kosten je Einheit richtig interpretieren',
        'Ein Betrieb hat 10.000 € Fixkosten im Monat und variable Kosten von 20 €/Stück. Bei 1.000 Stück betragen die [[t:rw-vollkosten|Vollkosten]] 30 €/Stück. Bei 500 Stück steigen sie auf 40 €/Stück, obwohl jeder zusätzliche Artikel weiterhin 20 € variable Kosten verursacht. Das Absinken der Auslastung erklärt die Erhöhung der zugerechneten Fixkosten je Stück.',
        'Die [[t:rw-teilkosten-begriff|Teilkostenrechnung]] setzt Erlöse und variable Kosten ins Verhältnis und zeigt, welchen Betrag ein Auftrag zur Fixkostendeckung beisteuert. Für langfristige Preise sind zusätzlich Kapazitätskosten und ein realistisches Absatzprogramm zu prüfen. Vollkostensätze helfen bei der Kalkulation, reagieren aber auf Beschäftigung und Verteilungsschlüssel.'),
      section('ergebnis', 'Bestandsänderungen und mehrstufige Fixkosten',
        'Werden Bestände in einer internen Vollkostenrechnung auch mit fixen Produktionskosten bewertet, verbleibt bei Lageraufbau ein Teil der Fixkosten im Bestand. In der variablen Teilkostenrechnung werden diese Fixkosten der Periode belastet. 200 zusätzliche Stück mit je 5 € fixen Herstellkosten können das Vollkostenergebnis unter sonst gleichen Annahmen um 1.000 € höher ausweisen.',
        'Die [[a:deckungsbeitrag|einstufige Deckungsbeitragsrechnung]] zieht gemeinsame Fixkosten als Block ab. Eine mehrstufige Rechnung zieht zuerst direkt zurechenbare Produktfixkosten ab, dann etwa Produktgruppen- und Unternehmensfixkosten auf der passenden Ebene. Nach dem Ausweis ist gesondert zu prüfen, wann Fixkosten entfallen können. Eine gruppenbezogene Miete bleibt bei Einstellung eines einzelnen Produkts häufig bestehen.'),
      ...check('Warum begründet ein negativer Vollkostengewinn je Produkt noch keine Einstellung?', 'Zugerechnete Fixkosten können bei Einstellung bestehen bleiben. Entscheidend sind entfallende Erlöse, tatsächlich eingesparte Kosten und die alternative Kapazitätsnutzung.',
        'Ein Produkt liefert 8.000 € Deckungsbeitrag und erhält 10.000 € gemeinsame Fixkosten zugerechnet. Was passiert bei Einstellung, wenn sich sonst nichts ändert?', 'Das Betriebsergebnis sinkt um 8.000 €. Die gemeinsamen Fixkosten fallen unverändert an.'),
    ],
  },
  {
    id: 'rw-break-even', number: '3.5.3', title: 'Break-even-Analyse und Sicherheitsabstand',
    intro: 'An der Gewinnschwelle decken Erlöse die Gesamtkosten. Das Modell zeigt, wie Absatzmenge, Preise und Kosten das Ergebnis innerhalb eines betrachteten Bereichs verändern.',
    terms: [['rw-gewinnschwelle', 'Gewinnschwelle', 'Absatzmenge oder Umsatz, bei der Erlöse und Gesamtkosten gleich hoch sind und das Betriebsergebnis null beträgt.']],
    sections: [
      section('modell', 'Gewinnschwelle berechnen',
        'Bei konstantem Nettoverkaufspreis p und variablen Kosten kv je Stück gilt E = p × x und K = Kf + kv × x. Die [[t:rw-gewinnschwelle|Gewinnschwelle]] folgt aus E = K. Damit gilt x = Kf ÷ (p − kv), wenn der Stückdeckungsbeitrag positiv ist. Die erste mindestens kostendeckende ganze Stückzahl wird aufgerundet. Bei einem nicht positiven Stückdeckungsbeitrag und positiven Fixkosten erreicht das Modell keine Gewinnschwelle.',
        'Beispiel: Fixkosten 6.000 €, Preis 80 €/Stück, variable Stückkosten 40 €/Stück. Deckungsbeitrag 40 €/Stück. Gewinnschwelle = 6.000 € ÷ 40 €/Stück = 150 Stück. Schwellenumsatz = 150 × 80 € = 12.000 €. Bei erwartetem Absatz 200 Stück liegt der Sicherheitsabstand bei 50 Stück oder 25 % des erwarteten Absatzes. Das erwartete Ergebnis beträgt 2.000 €.'),
      {
        ...section('grafik', 'Erlöse und Kosten im Verlauf',
          'Die Erlöslinie startet bei 0 €. Die Gesamtkosten starten bei 6.000 €. Oberhalb der Schnittmenge bei 150 Stück steigen die Erlöse schneller als die Gesamtkosten.'),
        lineChart: {
          xLabel: 'Absatz (Stück)', yLabel: 'Euro',
          points: [[0, 0], [150, 12000], [200, 16000]],
          reference: [[0, 6000], [200, 14000]],
          xTicks: [0, 50, 100, 150, 200], yTicks: [0, 4000, 8000, 12000, 16000],
          description: 'Durchgezogen: Erlöse. Gestrichelt: Gesamtkosten. Der Schnittpunkt liegt bei 150 Stück und 12.000 €.',
        },
      },
      section('grenzen', 'Zielgewinn und Sortimentsmix berücksichtigen',
        'Für einen Zielgewinn addierst du ihn im Zähler zu den Fixkosten. Bei mehreren Produkten kannst du bei stabilem Absatzmix mit einem Modellwarenkorb oder einer gewichteten Deckungsbeitragsquote rechnen. Beträgt die Quote über das Sortiment 30 % der Erlöse, sind bei 6.000 € Fixkosten 6.000 € ÷ 0,30 = 20.000 € Umsatz nötig. Ein anderer Mix verändert die Gewinnschwelle. Für einen Dienstleister mit Schichtgrenzen müssen sprungfixe Kosten im jeweils gültigen Mengenbereich geprüft werden.'),
      ...check('Wie ändert sich die Schwelle, wenn der Stückdeckungsbeitrag steigt?', 'Bei gleichen Fixkosten sinkt die erforderliche Absatzmenge, solange das lineare Modell gilt.',
        'Fixkosten 9.000 €, Preis 55 €, variable Stückkosten 30 €, Zielgewinn 1.500 €. Wie viele Stück sind nötig?', '(9.000 € + 1.500 €) ÷ 25 €/Stück = 420 Stück.'),
    ],
  },
  {
    id: 'rw-preisuntergrenzen', number: '3.5.4', title: 'Preisuntergrenzen und relativer Deckungsbeitrag',
    intro: 'Eine Preisuntergrenze hängt von der verfügbaren Kapazität, vom Zeithorizont und von der besten Alternative ab. Bei einem Engpass zählt der Beitrag je knapper Einheit.',
    terms: [
      ['rw-opportunitaetskosten', 'Opportunitätskosten', 'Entgangener wirtschaftlicher Vorteil der besten verfügbaren Alternative.'],
      ['rw-relativer-db', 'Relativer Deckungsbeitrag', 'Deckungsbeitrag je beanspruchter Einheit eines Engpasses, zum Beispiel je Maschinenminute.'],
    ],
    sections: [
      section('untergrenze', 'Zusatzauftrag bei freier oder knapper Kapazität',
        'Kurzfristig deckt der Mindestpreis bei freier Kapazität die durch den Auftrag zusätzlich verursachten Kosten. Bei 30 Stück mit je 70 € variablen Kosten und 300 € einmaligen Rüstkosten beträgt die Preisuntergrenze (2.100 € + 300 €) ÷ 30 = 80 €/Stück. Gemeinsame Fixkosten, die in beiden Alternativen unverändert anfallen, ändern diese Rechnung nicht.',
        'Verdrängt der Auftrag einen Beitrag aus der besten Alternative, addiere diese [[t:rw-opportunitaetskosten|Opportunitätskosten]]. Beträgt der entgangene Deckungsbeitrag 600 €, steigt die kurzfristige Untergrenze auf 100 €/Stück. Auf längere Sicht muss das gesamte Leistungsprogramm die erforderlichen Kosten und Kapazitäten decken. Eine aus Vollkosten abgeleitete langfristige Preisuntergrenze hängt daher auch von Absatz und Zurechnung ab.'),
      section('engpass', 'Deckungsbeiträge pro Engpasseinheit vergleichen',
        'Produkt A liefert 40 €/Stück und braucht 20 Maschinenminuten. Produkt B liefert 30 €/Stück und braucht 10 Minuten. Der [[t:rw-relativer-db|relative Deckungsbeitrag]] beträgt für A 2 €/min und für B 3 €/min. Bei einem einzigen Engpass wird B im linearen Modell bis zur Absatzgrenze bevorzugt. Berücksichtige ganzzahlige Stücke, Restkapazitäten, Mindestmengen und Lieferzusagen. Mehrere Engpässe können eine Optimierung des gesamten Programms erfordern.',
        'Eine Disposition kann statt Maschinenminuten begrenzte Ladezeiten oder verfügbare Tourenkapazität verwenden. Beim Fremdbezug vergleicht der Betrieb den Bezugspreis einschließlich relevanter Nebenkosten mit vermeidbaren Eigenfertigungskosten und frei werdender nutzbarer Kapazität. Qualitäts- und Lieferfolgen bleiben Teil der Entscheidung.'),
      ...check('Wodurch unterscheidet sich der absolute vom relativen Stückdeckungsbeitrag?', 'Der absolute Wert gilt je Stück. Der relative Wert teilt ihn durch den Einsatz des knappen Faktors.',
        'Ein Auftrag bringt 900 € netto und verursacht 700 € zusätzliche Kosten. Er verdrängt eine Tour mit 250 € Deckungsbeitrag. Wie entscheidest du rein rechnerisch?', 'Der zusätzliche Beitrag von 200 € liegt 50 € unter dem entgangenen Beitrag. Der wirtschaftliche Mindestpreis liegt bei 950 €.'),
    ],
  },
  {
    id: 'rw-fall-teilkosten', number: '3.5.5', title: 'Übungsfall: Leistungsprogramm bei Kapazitätsengpass',
    intro: 'Zwei Auftragstypen teilen sich dieselbe Kapazität. Der Fall verbindet einstufigen Deckungsbeitrag mit Engpassentscheidung und Zusatzauftrag.',
    sections: [
      section('fall', 'Ausgangslage und Auftrag',
        'A: Preis 210 €, variable Kosten 130 €, benötigt 2 h je Auftrag, höchstens 30 Aufträge. B: Preis 150 €, variable Kosten 100 €, benötigt 1 h, höchstens 40 Aufträge. Es stehen 80 h zur Verfügung. Gemeinsame Fixkosten: 2.400 €. Ermittle optimales Programm und Betriebsergebnis. Ein Zusatzauftrag braucht 4 h und kostet 270 € zusätzlich. Zu welchem Mindestpreis kann er in das volle Programm aufgenommen werden?'),
      section('loesung', 'Deckungsbeitrag maximieren und Verdrängung bewerten',
        'A liefert 80 €/Auftrag oder 40 €/h, B liefert 50 €/Auftrag oder 50 €/h. Zuerst 40 B mit 40 h, danach 20 A mit 40 h. Gesamtdeckungsbeitrag = 40 × 50 € + 20 × 80 € = 3.600 €. Betriebsergebnis = 3.600 € − 2.400 € = 1.200 €.',
        'Für den Zusatzauftrag entfallen zwei Aufträge A mit zusammen 160 € Deckungsbeitrag. Mindestpreis = 270 € + 160 € = 430 €. Bei 430 € bleibt das Ergebnis gleich. Der verbleibende Kapazitätsmix muss im konkreten Fall umsetzbar sein.'),
      ...check('Warum belegt B im Fall zuerst Kapazität?', 'B liefert je knapper Stunde 50 €, A liefert 40 €. B wird bis zur Absatzgrenze bevorzugt.',
        'Die Kapazität steigt dauerhaft auf 100 h, ohne zusätzliche Fixkosten. Welches Ergebnis folgt bei gleichem Absatzlimit?', '40 B und 30 A benötigen 100 h. Gesamtdeckungsbeitrag = 2.000 € + 2.400 € = 4.400 €. Betriebsergebnis = 2.000 €.'),
    ],
  },
];
