import { glossaryTerm, lesson, related, term, topic, type ManagementLesson } from './bm-artikel';

export const methodsLessons: ManagementLesson[] = [
  {
    slug: 'techniken', number: '4', title: 'Managementtechniken',
    intro: 'Managementtechniken strukturieren Planung, Entscheidungen und Zusammenarbeit. Die passende Technik richtet sich nach Problemtyp, Informationslage und Entscheidungsspielraum.',
    sections: [
      topic('auswahl', 'Technik nach Arbeitsschritt auswählen',
        'Zeitmanagement schützt Kapazität. Diagnose trennt Ursachen von Symptomen. Kreativität erschließt Optionen. Entscheidungstechniken bewerten Optionen. Projektmanagement organisiert die Umsetzung. Gesprächs- und Kooperationstechniken erleichtern die Abstimmung.',
        'Ein wiederkehrender Fehlabholer braucht zuerst eine Diagnose und danach einen Entscheid über Gegenmaßnahmen. Ein einmaliger Systemwechsel braucht zusätzlich Projektorganisation und Terminplanung. Bei Konflikten um Zuständigkeiten ist die gemeinsame Klärung Teil der Umsetzung.'),
      topic('teilthemen', 'Teilgebiete', [lesson('zeitmanagement', 'Zeit- und Selbstmanagement'), ' · ', lesson('kreativitaet-entscheidung', 'Kreativität und Entscheidung'), ' · ', lesson('projekt', 'Projektmanagement'), ' · ', lesson('gespraech-kooperation', 'Gespräch und Kooperation')]),
    ],
    checks: [
      ['Warum beginnt die Methodenwahl mit dem Problemtyp?', 'Eine Methode beantwortet eine bestimmte Frage. Diagnose klärt Ursachen, Ideenmethoden erweitern Optionen und Bewertungstechniken vergleichen geeignete Optionen.'],
      ['Ein Betrieb diskutiert seit Wochen über eine Software, obwohl die Fehlerursache unklar ist. Was ist der nächste sinnvolle Schritt?', 'Beschreibe Fehler und Sollzustand, sammle Daten und prüfe Ursachenhypothesen. Erst nach geklärtem Handlungsbedarf werden Software und andere Lösungen verglichen.'],
    ],
  },
  {
    slug: 'zeitmanagement', number: '4.1', title: 'Zeit- und Selbstmanagement',
    intro: 'Zeitmanagement ordnet Aufgaben einer begrenzten Kapazität zu. Selbstmanagement umfasst zusätzlich Aufmerksamkeit, Arbeitsgewohnheiten, Delegation und die regelmäßige Anpassung von Prioritäten.',
    sections: [
      {
        ...topic('priorisierung', 'Wichtigkeit und Dringlichkeit unterscheiden',
          ['Die ', term('eisenhower-matrix', 'Eisenhower-Matrix'), ' trennt den Beitrag zum Ziel (Wichtigkeit) vom Zeitdruck (Dringlichkeit). Dringend und wichtig: bearbeiten. Wichtig und wenig dringend: terminieren. Dringend und wenig wichtig: möglichst delegieren. Wenig wichtig und wenig dringend: streichen, bündeln oder bewusst nachrangig behandeln.'],
          'Die ABC-Priorisierung ordnet Aufgaben nach Zielbeitrag. Die Pareto-Idee lenkt Aufmerksamkeit auf wenige häufig besonders wirksame Aufgaben. Ein bestimmtes 80:20-Verhältnis wird im Einzelfall geprüft. Delegation braucht Auftrag, Befugnisse, Ressourcen und einen Rückmeldetermin.'),
        matrix: {
          columns: ['Dringend', 'Wenig dringend'], rows: ['Wichtig', 'Wenig wichtig'],
          cells: [['Bearbeiten', 'Terminieren'], ['Delegation prüfen', 'Streichen oder bündeln']],
          description: 'Wichtigkeit bestimmt den Zielbeitrag. Dringlichkeit beschreibt den Zeitdruck. Hohe Wichtigkeit ohne akute Frist bekommt einen Termin.',
        },
      },
      topic('tagesplan', 'Aufgaben und Puffer realistisch planen',
        'ALPEN steht für Aufgaben notieren, Länge schätzen, Puffer einplanen, Entscheidungen treffen und Nachkontrolle. Bei 360 disponiblen Minuten und 30 % Puffer bleiben 252 Minuten für planbare Arbeit. Ein dringender Schadenfall wird zuerst geklärt, die Quartalsplanung erhält einen geschützten Block und eine Routineanfrage wird mit Rückmeldefrist delegiert.',
        'Zeitblöcke, Begrenzung paralleler Arbeit und gebündelte Antworten schützen Konzentration. In einer Leitstelle mit häufigen Störungen kann eine feste Notfallrotation ruhige Arbeitsblöcke für andere sichern. Wenn der Puffer regelmäßig aufgebraucht ist, prüfe Aufkommen, Aufgabenverteilung und Schätzwerte.'),
    ],
    checks: [
      ['Was unterscheidet Wichtigkeit und Dringlichkeit?', 'Wichtigkeit beschreibt den Beitrag zu einem Ziel oder die Folgen des Unterlassens. Dringlichkeit beschreibt Zeitdruck und Folgen eines Aufschubs.'],
      ['Nach Besprechungen bleiben 300 Minuten. Du planst 20 % Puffer. Drei Aufgaben brauchen 70, 80 und 110 Minuten. Wie entscheidest du?', 'Es bleiben 240 planbare Minuten. Die Aufgaben summieren sich auf 260 Minuten. Verschiebe, kürze oder delegiere mindestens 20 Minuten nach Zielbeitrag und Fristen. Halte den Puffer für ungeplante Arbeit frei.'],
    ],
  },
  {
    slug: 'kreativitaet-entscheidung', number: '4.2', title: 'Kreativitäts- und Entscheidungstechniken kombinieren',
    intro: 'Problemdiagnose prüft die Situation, divergente Kreativität erzeugt Optionen und konvergente Bewertung führt zu einer begründeten Auswahl.',
    sections: [
      topic('phasen', 'Diagnose, Ideensuche und Auswahl trennen',
        'Ein Betrieb erkennt doppelte Eingaben in der Auftragsanlage. In der Diagnose ermittelt er, welche Daten und Schnittstellen betroffen sind. In der Ideensuche sammelt er Prozess-, Daten- und Softwareoptionen. In der Bewertung prüft er Muss-Kriterien und Aufwand.',
        'Lege vor der Ideensuche den Entscheidungsspielraum fest. Sammle zunächst breit und bündele später ähnliche Vorschläge. Wenn keine Option zulässig ist, überarbeite die Lösungsideen oder prüfe ausdrücklich, wer Rahmenbedingungen ändern darf.'),
      topic('methoden', 'Das Werkzeug je Phase wählen', [lesson('problemdiagnose', 'Problemdiagnose'), ' · ', lesson('kreativitaetstechniken', 'Kreativitätstechniken'), ' · ', lesson('entscheidungstechniken', 'Entscheidungstechniken')]),
    ],
    checks: [
      ['Was bedeuten divergent und konvergent in der Ideenarbeit?', 'Divergent erweitert die Menge und Vielfalt möglicher Ideen. Konvergent bündelt, prüft und reduziert diese Optionen auf geeignete Handlungsalternativen.'],
      ['Ein Team bewertet jede Idee unmittelbar nach dem ersten Vorschlag. Wie gestaltest du den nächsten Workshop?', 'Vereinbare Problem und Grenzen, sammle schriftlich ohne Einzelbewertung, gruppiere Ideen und prüfe sie erst in einer getrennten Phase nach zuvor vereinbarten Kriterien.'],
    ],
  },
  {
    slug: 'problemdiagnose', number: '4.2.1', title: 'Problemdiagnosetechniken',
    intro: 'Problemdiagnose beschreibt die Abweichung, bildet Ursachenhypothesen und prüft sie mit Daten. Sofortmaßnahmen können Schäden begrenzen, während Ursachen noch untersucht werden.',
    sections: [
      topic('abgrenzen', 'Problem und Auftreten beschreiben',
        ['Eine Ist/Ist-nicht-Analyse vergleicht, was, wo, wann und in welchem Umfang ein Problem auftritt oder ausbleibt. Mit einem ', term('ishikawa', 'Ishikawa-Diagramm'), ' sammelst du Ursachenhypothesen, beispielsweise nach Mensch, Maschine, Material, Methode, Messung und Mitwelt. Wähle Kategorien passend zum Prozess.'],
        'Bei 100 Fehlmeldungen verteilen sich 55 auf Schnittstellenfehler, 30 auf Erfassung und 15 auf Sonstiges. Die beiden häufigsten Kategorien ergeben 85 Fälle bzw. 85 %. Eine Pareto-Auswertung priorisiert Untersuchungsaufwand. Ein seltener Fehler mit hohem Schaden kann dennoch zuerst behandelt werden.'),
      topic('pruefen', 'Hypothesen bis zur wirksamen Ursache verfolgen',
        'Mit wiederholtem Warum-Fragen (5 Why) verfolgst du eine belegte Ereigniskette. Bei Schnittstellenfehlern kann ein Test ergeben, dass ein bestimmtes Feld beim Datenimport fehlt. Prüfe Version und Gültigkeitsregel und reproduziere den Befund kontrolliert anhand passender Testdaten. Erhebe nach der Korrektur erneut Fehler und Gegenkennzahlen.',
        'In einem Lager können Fehlmengen durch falsches Zählen oder falsch etikettierte Einheiten entstehen. Vergleiche betroffene und unbetroffene Warengruppen. Eine im Workshop plausible Ursache bleibt eine Hypothese, bis Befunde sie stützen.'),
    ],
    checks: [
      ['Welche Aussage liefert ein Ishikawa-Diagramm?', 'Es strukturiert mögliche Ursachen und hilft, Prüfungen zu planen. Beobachtung, Messung oder gezielte Tests müssen die Hypothesen bestätigen oder entkräften.'],
      ['Ein Fehler entsteht nur bei Nachtschichten und erst seit einem Update. Wie grenzt du die vermutete Ursache ein?', 'Vergleiche die Abläufe vor und nach dem Update sowie Tag- und Nachtschichten mit gleichem Auftragstyp. Prüfe Unterschiede bei Berechtigungen, Schnittstellen und tatsächlicher Nutzung und teste die plausibelsten Hypothesen.'],
    ],
  },
  {
    slug: 'kreativitaetstechniken', number: '4.2.2', title: 'Kreativitätstechniken',
    intro: 'Kreativitätstechniken erzeugen Varianten, wenn Aufgaben mehrere mögliche Lösungen zulassen. Die Wahl hängt davon ab, ob freie Ideen, strukturierte Kombinationen oder neue Perspektiven gefragt sind.',
    sections: [
      topic('offen', 'Freie und schriftliche Ideenfindung einsetzen',
        ['Beim Brainstorming werden Ideen zunächst gesammelt, kombiniert und weiterentwickelt. Beim Brainwriting schreiben Personen Ideen parallel auf. 6-3-5 ist eine schriftliche Variante mit sechs Personen, drei Ideen pro Runde und fünf Minuten je Runde. Schriftlichkeit kann Dominanz und Wartezeiten reduzieren. Konkrete Schritte zeigt ', related('fz-brainwriting', 'Brainstorming, Brainwriting und 6-3-5'), '.'],
        'Mindmaps veranschaulichen Zusammenhänge. Eine Umkehrfrage wie „Wie würden wir die Bearbeitung zuverlässig verzögern?“ hilft, unbemerkte Hindernisse offenzulegen. Übersetze die Antworten anschließend in bearbeitbare Ideen.'),
      topic('systematisch', 'Varianten mit dem morphologischen Kasten bilden',
        ['Ein ', { termId: 'fz-begriff-morphologischer-kasten', text: 'morphologischer Kasten' }, ' ordnet unabhängige Gestaltungsmerkmale und ihre Ausprägungen. Für Statusmeldungen stehen drei Eingabekanäle, zwei Auslösezeitpunkte und zwei Eskalationswege zur Auswahl. Bei freien Kombinationen entstehen 3 × 2 × 2 = 12 theoretische Varianten.'],
        'Markiere unvereinbare Kombinationen, etwa einen rein manuellen Kanal bei verpflichtender Echtzeitmeldung. Im Verpackungsdesign können Material, Verschluss und Rückführung Merkmale sein. Schlecht getrennte Merkmale oder unrealistische Ausprägungen erzeugen viele Varianten ohne Mehrwert.'),
    ],
    checks: [
      ['Wann ist ein morphologischer Kasten besonders geeignet?', 'Wenn eine Lösung aus mehreren sinnvoll trennbaren Merkmalen besteht, etwa Kanal, Zeitpunkt und Eskalationsweg. Verschiedene Ausprägungen lassen sich systematisch kombinieren.'],
      ['Drei Merkmale haben 2, 3 und 4 mögliche Ausprägungen. Eine Ausprägung des zweiten Merkmals ist bei beiden Werten des ersten und allen Werten des dritten unmöglich. Wie viele Varianten bleiben?', 'Es gibt 2 × 3 × 4 = 24 theoretische Varianten. Die ausgeschlossene Ausprägung beseitigt 2 × 1 × 4 = 8. Es bleiben 16, sofern keine weiteren Einschränkungen gelten.'],
    ],
  },
  {
    slug: 'entscheidungstechniken', number: '4.2.3', title: 'Nutzwertanalyse und Entscheidungen bei Unsicherheit',
    intro: 'Entscheidungstechniken machen Kriterien, Annahmen und Unsicherheit sichtbar. Die geeignete Methode hängt davon ab, ob Folgen, Wahrscheinlichkeiten und Zielgewichte belastbar bestimmbar sind.',
    sections: [
      topic('nutzwert', 'Alternativen mit mehreren Kriterien bewerten',
        ['Bei einer ', { termId: 'logistik-lieferantenmanagement-begriff', text: 'Nutzwertanalyse' }, ' filterst du Muss-Vorgaben, definierst überschneidungsarme Kriterien und eine klare Punkteskala, gewichtest und addierst gewichtete Bewertungen. Auf einer Skala von 1 bis 5 erhalten A für Qualität und Kosten 5 und 2 Punkte, B 4 und 4. Bei Gewichten 60 % und 40 % hat A 0,6 × 5 + 0,4 × 2 = 3,8 Punkte, B 4,0.'],
        'Die Rangfolge kippt bei einem Qualitätsgewicht über zwei Dritteln, weil dann 2 + 3 × Gewicht größer als 4 wird. Dokumentiere Quellen der Punkte und teste plausible Gewichte. Gewichte ersetzen fehlende Daten oder Muss-Vorgaben nicht.'),
      topic('risiko', 'Erwartungswert und Entscheidungsbaum verwenden',
        ['Bei Risiko kann ein ', term('entscheidungsbaum', 'Entscheidungsbaum'), ' Folgen mehrstufig abbilden. Rechne von den Endpunkten zurück. Am Zufallsknoten multiplizierst du jede Auszahlung mit ihrer bedingten Wahrscheinlichkeit und summierst. Am Entscheidungsknoten wählst du nach dem festgelegten Kriterium.'],
        'Eine Variante liefert mit 60 % Wahrscheinlichkeit +30.000 € und sonst −10.000 €. Der Erwartungswert beträgt 0,60 × 30.000 € − 0,40 × 10.000 € = +14.000 €. Die Alternative liefert sicher +12.000 €. Obwohl der Erwartungswert höher liegt, kann ein nicht tragbarer Verlust die erste Variante ausschließen.'),
      topic('ungewissheit', 'Entscheiden, wenn Wahrscheinlichkeiten fehlen',
        'Maximin wählt bei Nutzen oder Gewinn das größte Minimum. Maximax wählt das größte Maximum. Minimax-Regret minimiert den höchsten entgangenen Nutzen im Vergleich zur besten Alternative im jeweiligen Szenario. Wenn A in zwei Szenarien 8 und 2 und B 5 und 4 liefert, wählt Maximin B (4 statt 2). Bei Regret sind die Höchstwerte A = 2 und B = 3, also gewinnt A.',
        'Laplace behandelt alle betrachteten Zustände rechnerisch gleich, sodass A im Beispiel im Mittel 5 und B 4,5 erzielt. Die Hurwicz-Regel gewichtet das beste und schlechteste Ergebnis. Bei einem Optimismusgewicht von 0,25 ergibt sich A = 0,25 × 8 + 0,75 × 2 = 3,5 und B = 0,25 × 5 + 0,75 × 4 = 4,25. Gleichgewichtung und Optimismusgewicht sind Modellannahmen. Ein Pilot oder eine gestufte Investition können die Informationslage verbessern.'),
    ],
    checks: [
      ['Warum ist eine Sensitivitätsanalyse nach einer Nutzwertanalyse sinnvoll?', 'Sie zeigt, ob plausible Änderungen von Gewichten oder Punkten die Rangfolge umkehren. Eine fragile Entscheidung braucht zusätzliche Information oder eine ausdrückliche Priorität.'],
      ['Eine Option bringt mit 25 % Wahrscheinlichkeit 40.000 € und sonst −4.000 €. Eine zweite bringt sicher 6.000 €. Was ergibt die Rechnung, und wann würdest du anders entscheiden?', 'Option eins: 0,25 × 40.000 € − 0,75 × 4.000 € = 7.000 €. Bei ausreichend tragbarem Verlust und Erwartungswert als Ziel liegt sie vorn. Unter einem bindenden Verbot von Verlusten bleibt die sichere Option.'],
    ],
  },
];

export const methodsGlossary = [
  glossaryTerm('eisenhower-matrix', 'Eisenhower-Matrix', 'Vierfeldermatrix zur Priorisierung von Aufgaben nach Wichtigkeit und Dringlichkeit.', 'zeitmanagement'),
  glossaryTerm('ishikawa', 'Ishikawa-Diagramm', 'Fischgrätendiagramm zum strukturierten Sammeln möglicher Ursachen eines Problems.', 'problemdiagnose'),
  glossaryTerm('entscheidungsbaum', 'Entscheidungsbaum', 'Grafische Darstellung aufeinanderfolgender Entscheidungen, möglicher Umweltzustände und Folgen.', 'entscheidungstechniken'),
];
