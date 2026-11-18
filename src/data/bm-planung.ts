import { glossaryTerm, lesson, term, topic, type ManagementLesson } from './bm-artikel';

export const planningLessons: ManagementLesson[] = [
  {
    slug: 'planung', number: '1', title: 'Betriebliche Planungsprozesse',
    intro: 'Betriebliche Planung legt fest, welche Ergebnisse das Unternehmen erreichen will, mit welchen Maßnahmen und Ressourcen es darauf hinarbeitet und wann es Abweichungen überprüft.',
    sections: [
      topic('kreislauf', 'Vom Ziel zur Rückkopplung',
        ['Ein ', term('planungsregelkreis', 'Planungsregelkreis'), ' verbindet Ausgangsanalyse, Zielsetzung, Prognose, Alternativenbildung, Entscheidung, Durchführung und Kontrolle. Die Kontrolle liefert Informationen für Nachsteuerung oder Neuplanung. Die Schritte können sich überlappen.'],
        'Ein Plan enthält Zielwerte, Annahmen, Termine, Verantwortliche und Mittel. Eine Prognose schätzt den erwarteten Verlauf unter Annahmen. Das Budget setzt einen finanziellen Rahmen. Die operative Entscheidung legt fest, welche Maßnahme daraus tatsächlich folgt.'),
      topic('fall', 'Eine Planung für verspätete Statusmeldungen',
        'Ein Transportbetrieb erfasst, wie viele Abholungen innerhalb von 30 Minuten gemeldet werden. Die Quote soll von 74 % auf mindestens 90 % steigen. Die Betriebsleitung vergleicht automatische Erinnerungen und an Subunternehmer delegierte Meldungen. Sie legt Kosten, Datenqualität und technische Abdeckung als Kriterien fest, startet einen Pilotversuch und überprüft wöchentlich die Quote.',
        'Ein Einzelhändler plant für eine Saison dagegen mit Absatzmengen und Lieferzeiten. Er nutzt denselben Kreislauf. Saisonale Nachfrage und Wiederbeschaffungszeiten bestimmen hier, welche Daten und Maßnahmen wichtig sind.'),
      topic('weiterlernen', 'Die Planung vertiefen',
        [lesson('zielsystem', 'Zielsystem'), ' · ', lesson('planungsebenen', 'Planungsebenen'), ' · ', lesson('betriebsstatistik', 'Planungsdaten'), ' · ', lesson('entscheidungsprozess', 'Entscheidungsprozess')]),
    ],
    checks: [
      ['Welche Funktion hat die Kontrolle im Planungsregelkreis?', 'Sie vergleicht Ergebnisse mit den Zielen, prüft Ursachen und liefert die Grundlage für Korrekturen oder eine Überarbeitung der Planung.'],
      ['Die Meldequote steigt nach dem Pilotversuch von 74 % auf 85 %. Welche zwei Fragen entscheidest du vor der Ausweitung?', 'Prüfe, ob Zielgruppe und Ausgangsdaten vergleichbar sind und welche Partner oder Situationen die verbleibenden Lücken verursachen. Schätze anschließend, ob eine gezielte Maßnahme die fehlenden fünf Prozentpunkte bei vertretbaren Kosten schließen kann.'],
    ],
  },
  {
    slug: 'zielsystem', number: '1.1', title: 'Betriebliches Zielsystem',
    intro: 'Ein betriebliches Zielsystem ordnet Einzelziele, macht ihre Beziehungen sichtbar und hilft, widersprüchliche Anforderungen von Eigentümern, Belegschaft, Kunden und weiteren Anspruchsgruppen zu entscheiden.',
    sections: [
      topic('arten', 'Zielarten und Hierarchie',
        ['Das ', term('zielsystem', 'Zielsystem'), ' verbindet Unternehmenszweck und Leitbild mit Ober-, Zwischen- und Unterzielen. Formalziele betreffen beispielsweise Liquidität und Rentabilität. Sachziele beschreiben konkrete Leistungen und Mengen. Wirtschaftliche, soziale und ökologische Ziele können auf jeder Ebene angelegt sein.'],
        'Oberziel: verlässlicher Expressdienst. Zwischenziel: bessere Termintreue. Unterziel: bis zum 30. Juni mindestens 95 % der fälligen Sendungen je Kalendermonat innerhalb des vereinbarten Lieferfensters zustellen. Zähler sind pünktliche Sendungen, Nenner sind alle fälligen Sendungen nach derselben Statusdefinition.'),
      topic('beziehungen', 'Zielbeziehungen und Prioritäten',
        ['Komplementäre Ziele fördern sich, konkurrierende Ziele behindern sich und indifferente Ziele beeinflussen sich im betrachteten Entscheidungsrahmen kaum. Ein ', { termId: 'logistik-zielkonflikt', text: 'Zielkonflikt' }, ' entsteht etwa zwischen höherer Auslastung und kurzfristig verfügbarer Reservekapazität. Eine Entscheidung kann Liquidität und gesetzliche Anforderungen als Mindestbedingungen setzen und danach die Termintreue verbessern.'],
        'Eine zweite Art der Priorisierung gewichtet abwägbare Kriterien. Die Gewichtung gehört in die Entscheidungsvorlage. Zielbeziehungen hängen von der Maßnahme ab. Bessere Tourenplanung kann Kosten und Emissionen zugleich senken, zusätzliche Reservefahrten können beide erhöhen.'),
      topic('messung', 'Ziele messbar machen',
        'Definiere Inhalt, Ausmaß, Zeitbezug, Zuständigkeit, Datenquelle und Messintervall. SMART dient als Prüfhilfe für eine spezifische, messbare, erreichbare, relevante und terminierte Formulierung. Eine Kennzahl braucht eine nachvollziehbare Bezugsgröße und gegebenenfalls eine Gegenkennzahl, etwa Reklamationen neben Geschwindigkeit.'),
    ],
    checks: [
      ['Was ist der Unterschied zwischen Sach- und Formalzielen?', 'Sachziele beziehen sich auf Art, Menge oder Qualität betrieblicher Leistungen. Formalziele beziehen sich auf wirtschaftliche Erfolgskriterien wie Gewinn, Rentabilität oder Liquidität.'],
      ['Der Einkauf soll Bestände um 20 % abbauen, der Vertrieb fordert höhere Lieferfähigkeit. Wie machst du den Konflikt entscheidbar?', 'Definiere Warengruppen und Messgrößen. Setze einen Mindestwert für Lieferfähigkeit, vergleiche Optionen wie kürzere Beschaffungszeiten oder differenzierte Sicherheitsbestände und halte fest, welche Service- und Kostengrenzen für die Entscheidung gelten.'],
    ],
  },
  {
    slug: 'ziele-und-planung', number: '1.2', title: 'Bedeutung des Zielsystems für den Planungsprozess',
    intro: 'Das Zielsystem gibt der Planung Kriterien für Alternativen, Budgets und Kontrolle. Eine Zielkaskade übersetzt eine gemeinsame Richtung in überprüfbare Beiträge einzelner Bereiche.',
    sections: [
      topic('kaskade', 'Ergebnis, Treiber und Maßnahmen ableiten',
        ['Eine ', term('zielkaskade', 'Zielkaskade'), ' beginnt beim Oberziel und verteilt Beiträge auf Bereiche und Teams. Eine Ergebniskennzahl zeigt den erreichten Zustand, etwa die Liefertermintreue. Eine Frühkennzahl beobachtet einen plausiblen Treiber, etwa den Anteil rechtzeitig bestätigter Abholzeiten. Eine Maßnahme legt fest, wie dieser Treiber beeinflusst werden soll.'],
        'Definiere zunächst Ausgangswert und Zielwert. Ordne dann Verantwortliche, Ressourcen und Termine zu. Prüfe, ob die Beiträge zusammen das Gesamtziel plausibel tragen und ob Aktivitäten auf gemeinsamen Engpässen beruhen.'),
      topic('scorecard', 'Balanced Scorecard und Rückmeldung',
        'Eine Balanced Scorecard verbindet Ziele, Kennzahlen, Zielwerte und Maßnahmen aus finanzieller Sicht, Kundensicht, internen Prozessen sowie Lernen und Entwicklung. Beispiel: Schulung für Schichtübergaben soll vollständigere Meldungen ermöglichen, die wiederum Termintreue und Kundenbindung stützen. Diese Kette ist eine überprüfbare Wirkungsannahme.',
        'Erreicht eine Hotline zwar die Bearbeitungszeit, aber die Nachbearbeitung steigt, prüfe die Qualität der Erstlösung. Bei einem Produktionsbetrieb kann dagegen Ausschuss die Grenzen einer mengenorientierten Kennzahl zeigen. Überprüfe Wechselwirkungen, bevor du Zielerreichung bewertest.'),
    ],
    checks: [
      ['Worin unterscheiden sich eine Frühkennzahl und eine Ergebniskennzahl?', 'Die Frühkennzahl misst einen vermuteten Vorläufer eines Ergebnisses, der früher beeinflussbar ist. Die Ergebniskennzahl erfasst, was bereits eingetreten ist. Die Wirkungsannahme muss geprüft werden.'],
      ['Ein Standort erreicht 100 % Schulungsteilnahme, doch der Fehleranteil bleibt bei 8 %. Welche Reaktion passt zur Zielkaskade?', 'Prüfe die Wirkungsannahme: Können Beschäftigte das Vorgehen demonstrieren, wenden sie es an und lassen Prozess oder System die Anwendung zu? Bewerte die Schulungsteilnahme als Aktivität und den Fehleranteil als Ergebnis.'],
    ],
  },
  {
    slug: 'planungsebenen', number: '1.3', title: 'Strategische und operative Planung',
    intro: 'Strategische Planung entscheidet über die längerfristige Ausrichtung und benötigte Fähigkeiten. Operative Planung übersetzt die Ausrichtung in konkrete Leistungen, Kapazitäten und Budgets. Taktische Planung kann dazwischen Programme und Ressourcenschritte koordinieren.',
    sections: [
      topic('verknuepfung', 'Von der Marktentscheidung zum Monatsplan',
        [term('strategische-planung', 'Strategische Planung'), ' prüft Umwelt, Wettbewerb und eigene Ressourcen und entscheidet etwa, ob ein Logistiker einen temperaturgeführten Service aufbaut. ', term('operative-planung', 'Operative Planung'), ' legt Monatsmengen, Personal, Partnerkapazitäten, Kosten und Qualitätskennzahlen fest. Die Zeithorizonte hängen von Branche und Entscheidungsart ab.'],
        'Eine taktische Ebene legt in diesem Fall Pilotrouten, Qualifizierung und Systemintegration fest. Die operative Planung bestimmt unter anderem Schichten, Freigaben, Eskalationen und die tägliche Kontrolle der Temperaturdaten.'),
      topic('koordination', 'Pläne abstimmen und fortschreiben',
        'Top-down gibt Ziele und Ressourcenrahmen vor. Bottom-up liefert Kapazitäten, Probleme und lokale Prognosen. Das Gegenstromverfahren gleicht beides iterativ ab. Bei rollierender Planung wird der Planungshorizont regelmäßig um eine weitere Periode ergänzt. Die ursprüngliche Sollbasis bleibt für die Kontrolle nachvollziehbar.',
        'Bei einer Filialeröffnung kann eine strategische Wachstumsabsicht an lokaler Personalverfügbarkeit scheitern. Ein schlechter Pilotwert kann eine operative Korrektur oder eine strategische Neubewertung auslösen. Entscheidend ist, ob die Maßnahme oder die zugrunde liegende Annahme scheitert.'),
    ],
    checks: [
      ['Wie wirkt operative Planung auf die strategische Ebene zurück?', 'Kapazitätsgrenzen, Kosten und Ergebnisse liefern Hinweise, ob Annahmen der Strategie halten. Die Führung kann Umsetzung, Zeitplan oder Strategie entsprechend überarbeiten.'],
      ['Ein Händler will in ein neues Land expandieren, doch der Pilot findet kaum geeignete Servicepartner. Welche Alternativen betreffen welche Planungsebene?', 'Schichtpläne oder der Wechsel eines Partners sind operativ. Ein befristeter zweiter Pilot oder eine zusätzliche Schulungsphase ist taktisch. Ein anderer Markteintritt, ein anderes Land oder der Verzicht sind strategische Optionen.'],
    ],
  },
  {
    slug: 'planungsgrundlagen', number: '1.4', title: 'Betriebsstatistik, Vergleichsrechnung und Planungsrechnung',
    intro: 'Betriebsstatistik verdichtet Beobachtungen. Vergleichsrechnung prüft Unterschiede. Planungsrechnung rechnet Annahmen in Mengen, Werte und Ressourcen um. Zusammen liefern sie eine prüfbare Grundlage für Entscheidungen.',
    sections: [
      topic('datenkette', 'Daten richtig weiterverwenden',
        'Bei der Planung einer neuen Schicht analysiert ein Betrieb zunächst Auftragsmengen und Bearbeitungszeit. Dann vergleicht er die Schichten mit gleicher Auftragsabgrenzung und gleicher Periode. Anschließend berechnet er Personalbedarf, Ergebnis und Liquidität für mehrere Mengenannahmen.',
        'Ein Mittelwert aus kurzen und komplexen Aufträgen kann eine andere Auftragsstruktur verdecken. Vergleiche passende Gruppen und überprüfe fehlende Werte, bevor du Vorperiodenwerte in die Planung übernimmst.'),
      topic('methoden', 'Zur passenden Rechnung',
        [lesson('betriebsstatistik', 'Betriebsstatistik: Verteilung und Streuung'), ' · ', lesson('vergleichsrechnung', 'Vergleichsrechnung: Basis und Ursachen'), ' · ', lesson('planungsrechnung', 'Planungsrechnung: Mengen, Kosten und Liquidität')]),
    ],
    checks: [
      ['Welche Frage beantwortet jede der drei Methoden?', 'Statistik: Was zeigen die Daten? Vergleichsrechnung: Wie und gegenüber welcher Basis unterscheiden sich die Werte? Planungsrechnung: Welche rechnerischen Folgen haben unsere Zukunftsannahmen?'],
      ['In einem Werk steigt die mittlere Rüstzeit von 15 auf 20 Minuten. Darf die nächste Planung automatisch 20 Minuten je Rüstung ansetzen?', 'Prüfe zuerst Datenerfassung, Verteilung und Produktmix. Trenne vergleichbare Rüstvorgänge und kalkuliere bei geändertem Mix getrennte Annahmen. Verwende eine Sensitivität, falls der neue Mix noch unsicher ist.'],
    ],
  },
  {
    slug: 'betriebsstatistik', number: '1.4.1', title: 'Betriebsstatistik und Zeitreihen',
    intro: 'Betriebsstatistik erhebt und verdichtet betriebliche Daten. Aussagekräftige Kennzahlen brauchen eine definierte Grundgesamtheit, einen festen Zeitraum und eine dokumentierte Behandlung fehlender oder auffälliger Werte.',
    sections: [
      topic('erhebung', 'Messdesign und Kennzahlen',
        ['Vollerhebungen betrachten alle Fälle einer definierten Grundgesamtheit. Stichproben sparen Aufwand und bringen Stichprobenunsicherheit mit sich. Prüfe systematische Ausfälle, etwa fehlende digitale Meldungen bestimmter Partner. Bei Kategorien nutzt du Häufigkeiten und Anteile. Bei metrischen Daten sind Lage, Streuung und Extremwerte sinnvoll. Der ', term('median', 'Median'), ' teilt geordnete Werte in zwei Hälften. Die Standardabweichung beschreibt Streuung um den Mittelwert in der ursprünglichen Einheit.'],
        'Fünf Wartezeiten von 10, 12, 14, 14 und 30 Minuten ergeben den Mittelwert 80 ÷ 5 = 16 Minuten, den Median 14 Minuten und die Spannweite 30 − 10 = 20 Minuten. Für diese fünf vollständig betrachteten Fälle beträgt die Standardabweichung √[(36 + 16 + 4 + 4 + 196) ÷ 5] ≈ 7,16 Minuten. Bei einer Stichprobe zur Schätzung der Populationsvarianz wird üblicherweise durch n − 1 geteilt.'),
      {
        ...topic('zeitreihe', 'Trend, Saison und Rest unterscheiden',
          'Die Auftragsmengen von Januar bis Mai betragen 90, 120, 105, 135 und 150. Der nachlaufende gleitende Dreimonatsdurchschnitt beträgt im März (90 + 120 + 105) ÷ 3 = 105, im April 120 und im Mai 130 Aufträge. Glättung macht den Verlauf ruhiger, reagiert aber verzögert. Für wiederkehrende Saisonmuster braucht man vergleichbare Zeitabschnitte aus mehreren Zyklen.',
          'Wenn mehr Beschwerden zugleich mit mehr Aufträgen auftreten, ist ein Zusammenhang plausibel. Vergleiche Beschwerden je Auftragsmenge und prüfe Einflussfaktoren wie Auslastung, Schicht und Produktmix, bevor du eine Ursache ableitest.'),
        lineChart: {
          xLabel: 'Monat (Januar = 1)', yLabel: 'Aufträge', points: [[1, 90], [2, 120], [3, 105], [4, 135], [5, 150]],
          xTicks: [1, 2, 3, 4, 5], yTicks: [80, 100, 120, 140, 160],
          description: 'Die Monatswerte schwanken zunächst und steigen bis Mai. Für die Glättung werden jeweils drei aufeinanderfolgende Monatswerte gemittelt.',
        },
      },
    ],
    checks: [
      ['Warum sollte bei stark schiefen Wartezeiten neben dem Mittelwert auch der Median angegeben werden?', 'Der Mittelwert reagiert auf extreme Wartezeiten. Der Median zeigt die mittlere Position der sortierten Fälle. Zusammen mit Streuung und hohen Quantilen lässt sich die Verteilung besser beurteilen.'],
      ['Zwei Niederlassungen melden 92 % und 80 % Termintreue bei 100 bzw. 400 Sendungen. Wie hoch ist die gemeinsame Quote?', '(92 + 320) ÷ (100 + 400) = 82,4 %. Gewichte nach Fallzahl. Der ungewichtete Mittelwert von 86 % behandelt ungleich große Standorte als gleich groß.'],
    ],
  },
  {
    slug: 'vergleichsrechnung', number: '1.4.2', title: 'Vergleichsrechnung und Abweichungsanalyse',
    intro: 'Vergleichsrechnung setzt Istwerte zu Planwerten, früheren Perioden, anderen Betrieben oder einer Basisperiode in Beziehung. Belastbare Vergleiche richten Zeitraum, Einheit und Leistungsabgrenzung aufeinander aus.',
    sections: [
      topic('vergleiche', 'Die passende Vergleichsbasis wählen',
        ['Beim ', { termId: 'logistik-soll-ist-vergleich', text: 'Soll-Ist-Vergleich' }, ' wird die Ist-Leistung dem vereinbarten Soll gegenübergestellt. Beim Zeitvergleich kontrollierst du Saisoneffekte. Beim Betriebsvergleich prüfst du Leistungsmix und Bilanzierung. Beim Benchmarking untersuchst du zusätzlich Prozesse und Voraussetzungen hinter einem Referenzwert.'],
        'Steigen Kosten von 40.000 € auf 46.200 €, beträgt die absolute Abweichung +6.200 € und die relative +15,5 % bezogen auf 40.000 €. Der Index ist 115,5 bei Basis 100. Steigt eine Servicequote von 80 % auf 88 %, bedeutet das +8 Prozentpunkte oder +10 % relativ.'),
      topic('zerlegung', 'Mengen- und Preiswirkung getrennt auswerten',
        'Geplant waren 1.000 Aufträge zu 40 € variablen Kosten, tatsächlich waren es 1.100 zu 42 €. Die Mengenwirkung zum Plansatz ist (1.100 − 1.000) × 40 € = +4.000 €. Die Preiswirkung zur Istmenge ist 1.100 × (42 − 40) € = +2.200 €. Summe +6.200 €. Bei dieser Reihenfolge steckt der gemeinsame Effekt in der Preiswirkung.',
        'Bei höherer Nachfrage ist die Mengenwirkung häufig erklärbar. Prüfe den höheren Kostensatz etwa nach Zusatzleistungen, Einkaufspreisen und Leerkilometern. Eine rechnerische Zerlegung liefert noch keinen Kausalnachweis. Bei null als Basis ist eine relative Abweichung nicht sinnvoll definiert.'),
    ],
    checks: [
      ['Was unterscheidet Prozent von Prozentpunkten bei Quoten?', 'Prozentpunkte sind die Differenz zweier Quoten. Die relative Änderung in Prozent teilt die Differenz durch die Ausgangsquote.'],
      ['Plan: 200 Vorgänge zu 8 €. Ist: 180 Vorgänge zu 9 €. Welche Mengen- und Preiswirkung ergeben sich?', 'Menge: (180 − 200) × 8 € = −160 €. Preis: 180 × (9 − 8) € = +180 €. Gesamtabweichung: +20 € (1.620 € Ist minus 1.600 € Plan).'],
    ],
  },
  {
    slug: 'planungsrechnung', number: '1.4.3', title: 'Planungsrechnung und Szenarien',
    intro: 'Die Planungsrechnung übersetzt erwartete Mengen und Entscheidungen in Ressourcen, Ergebnis und Zahlungsmittel. Absatz-, Personal-, Beschaffungs-, Ergebnis- und Liquiditätsplanung beeinflussen einander.',
    sections: [
      topic('teilplaene', 'Teilpläne aufeinander abstimmen',
        ['Vom Absatzplan leitest du Kapazitäten, Personal und Beschaffung ab. Der ', { termId: 'deckungsbeitrag', text: 'geplante Deckungsbeitrag' }, ' ergibt sich aus Erlösen minus variablen Kosten. Fixkosten werden für das geplante Betriebsergebnis abgezogen. Die Liquiditätsplanung ordnet Ein- und Auszahlungen ihren tatsächlichen Perioden zu.'],
        'Ein Zusatzservice plant 800 Aufträge zu 45 € und 30 € variablen Kosten je Auftrag. 800 × (45 − 30) € = 12.000 € Deckungsbeitrag. Abzüglich 9.000 € Fixkosten bleiben 3.000 € Ergebnis. Die Gewinnschwelle liegt bei 9.000 € ÷ 15 €/Auftrag = 600 Aufträgen. Ist nur Platz für 550 Aufträge, reicht die Kapazität für das geplante Modell nicht.'),
      topic('liquiditaet', 'Zahlungszeitpunkt und Unsicherheit einrechnen',
        'Werden alle 36.000 € Erlöse erst im Folgemonat bezahlt und die 33.000 € Kosten vollständig im Leistungsmonat, fehlen vor Finanzierung bis zu 33.000 € bei anfänglich 0 € verfügbarer Liquidität. Der Plan behandelt Umsatz, Kosten und Zahlungen getrennt. Vereinfachend bleiben in diesem Beispiel Steuern und Investitionen außen vor.',
        'In einer Sensitivität änderst du isoliert eine Annahme. Bei nur 560 Aufträgen lautet das Ergebnis 560 × 15 € − 9.000 € = −600 €. Ein Szenario ändert mehrere konsistente Annahmen, etwa Nachfrage, Einkaufspreis und Zahlungsfrist. Prüfe, welche Annahme die Entscheidung kippen lässt und welcher Plan trotz Abweichungen tragfähig bleibt.'),
      topic('vertiefung', 'Rechenweg vertiefen', [{ text: 'Deckungsbeitrag im Rechnungswesen', articleId: 'deckungsbeitrag' }]),
    ],
    checks: [
      ['Warum kann ein Monat Gewinn ausweisen und dennoch eine Finanzierungslücke haben?', 'Ergebnis erfasst periodengerechte Erlöse und Kosten. Liquidität richtet sich nach Zahlungen. Ein später Kundeneingang bei früher Auszahlung kann trotz Gewinn Zahlungsmittel binden.'],
      ['Der variable Satz steigt auf 35 € je Auftrag, der Preis bleibt 45 €, die Fixkosten bleiben 9.000 €. Wie verändert sich die Gewinnschwelle?', 'Der Stückdeckungsbeitrag ist 10 €, daher beträgt die neue Schwelle 9.000 € ÷ 10 €/Auftrag = 900 Aufträge. Die ursprünglich geplanten 800 Aufträge ergeben einen Verlust von 1.000 €.'],
    ],
  },
  {
    slug: 'entscheidungsprozess', number: '1.5', title: 'Entscheidungsprozesse in der betrieblichen Planung',
    intro: 'Eine Planungsentscheidung wählt eine Handlungsalternative für eine konkrete Zielsetzung. Gute Entscheidungen benennen Entscheidungsbefugnis, verfügbare Evidenz, Bedingungen für die Umsetzung und einen Überprüfungstermin.',
    sections: [
      topic('entscheidungsfolge', 'Problem und Alternativen prüfbar formulieren',
        ['Definiere Ergebnis, Rahmen und Entscheidungstermin. Sammle praktikable Optionen einschließlich Status quo. Trenne Muss-Vorgaben von gewichtbaren Kriterien, prüfe Daten, schätze Folgen und dokumentiere die Auswahl. Bei ', term('entscheidung-risiko', 'Risiko'), ' sind Wahrscheinlichkeiten bekannt oder schätzbar. Bei Ungewissheit fehlen belastbare Wahrscheinlichkeiten.'],
        'Für eine Softwareumstellung können Muss-Kriterien Datenexport und ein definierter maximaler Ausfall sein. Bewerte danach Kosten, Bedienbarkeit und Support. Wenn wichtige Daten fehlen, kann ein befristeter Pilot den Informationswert erhöhen. Seine Kosten und der Zeitverlust gehören in den Vergleich.'),
      topic('kontrolle', 'Entscheidungsfehler begrenzen',
        'Ankereffekte machen die erste Kostenschätzung übermäßig wirksam. Bestätigungsfehler bevorzugen passende Informationen. Versunkene Kosten können ein Festhalten an einem schlechten Projekt begünstigen. Lege Kriterien vor der Bewertung fest, hole unabhängige Einschätzungen ein und bewerte nur zukünftige Unterschiede.',
        'Ein Werk erkennt, dass der bisherige Prüfprozess wiederholt fehlerhafte Ware freigibt. Ein Freigabestopp kann aufgrund einer Muss-Grenze erforderlich sein, obwohl eine neue Technik noch unklar ist. Beschluss, Eskalationsschwelle, Verantwortliche und Termin für einen neuen Entscheid gehören zusammen.'),
      topic('methoden', 'Methodenauswahl vertiefen', [lesson('entscheidungstechniken', 'Nutzwert, Entscheidungsregeln und Entscheidungsbaum')]),
    ],
    checks: [
      ['Warum werden Muss-Kriterien vor der Bewertung geprüft?', 'Eine nicht erfüllte Mindestanforderung darf durch hohe Werte anderer Kriterien nicht kompensiert werden. Eine zulässige Alternative wird erst danach weiter bewertet.'],
      ['Eine Software hat schon 60.000 € gekostet. Ab heute kostet ihre Fertigstellung 40.000 €, eine gleichwertige Alternative kostet nach Wechselkosten 30.000 €. Welche Beträge gehören in die Wahl?', 'Vergleiche die ab heute unterschiedlichen Kosten von 40.000 € und 30.000 € sowie Unterschiede bei Nutzen, Zeit und Risiko. Die bereits irreversibel ausgegebenen 60.000 € sind bei beiden Varianten vergangen.'],
    ],
  },
];

export const planningGlossary = [
  glossaryTerm('planungsregelkreis', 'Planungsregelkreis', 'Folge aus Analyse, Zielsetzung, Planung, Entscheidung, Durchführung und Kontrolle mit Rückmeldung für die nächste Planung.', 'planung'),
  glossaryTerm('zielsystem', 'Betriebliches Zielsystem', 'Geordnete Gesamtheit betrieblicher Ziele, ihrer Hierarchie, Beziehungen und Prioritäten.', 'zielsystem'),
  glossaryTerm('zielkaskade', 'Zielkaskade', 'Ableitung konkreter und koordinierter Beiträge untergeordneter Bereiche aus einem übergeordneten Ziel.', 'ziele-und-planung'),
  glossaryTerm('strategische-planung', 'Strategische Planung', 'Planung der längerfristigen Ausrichtung und der dafür benötigten Wettbewerbsvorteile und Fähigkeiten.', 'planungsebenen'),
  glossaryTerm('operative-planung', 'Operative Planung', 'Übersetzung übergeordneter Ziele in konkrete Zeiträume, Maßnahmen, Ressourcen und Sollgrößen.', 'planungsebenen'),
  glossaryTerm('median', 'Median', 'Mittlerer Wert einer geordneten Verteilung. Bei gerader Anzahl metrischer Werte wird gewöhnlich aus den beiden mittleren Werten gemittelt.', 'betriebsstatistik'),
  glossaryTerm('entscheidung-risiko', 'Entscheidung unter Risiko', 'Entscheidung, bei der möglichen Umweltzuständen bekannte oder begründet geschätzte Eintrittswahrscheinlichkeiten zugeordnet werden.', 'entscheidungsprozess'),
];
