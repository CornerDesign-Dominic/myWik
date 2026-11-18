import { glossaryTerm, lesson, related, term, topic, type ManagementLesson } from './bm-artikel';

export const communicationLessons: ManagementLesson[] = [
  {
    slug: 'gespraech-kooperation', number: '4.4', title: 'Gesprächs- und Kooperationstechniken',
    intro: 'Gesprächstechniken helfen, Informationen, Interessen und Entscheidungen zu klären. Kooperation verbindet Gesprächsergebnisse mit gemeinsamer Verantwortung und verbindlichen nächsten Schritten.',
    sections: [
      topic('format', 'Das Format am Ziel ausrichten',
        'Für eine kurze Übergabe reicht ein standardisierter Informationsaustausch. Eine Präsentation erläutert einen Sachverhalt oder eine Empfehlung. Moderation strukturiert Gruppenarbeit. Ein Auswahlinterview erhebt vergleichbare Nachweise. Bei einem verhärteten Streit kann eine freiwillige Mediation geeignet sein.',
        'Vor einem standortübergreifenden Pilot informiert die Projektleitung über den Rahmen und moderiert anschließend die Gestaltung offener Abläufe. Bei Uneinigkeit über Zuständigkeiten klärt sie Interessen und Entscheidungskompetenz. Nach dem Termin werden Aufgaben, Fristen und Ergebnisse schriftlich bestätigt.'),
      topic('weiterlernen', 'Das passende Gespräch vertiefen', [
        lesson('kommunikationsgrundlagen', 'Kommunikationsgrundlagen'), ' · ', lesson('vortrag', 'Präsentation'), ' · ',
        lesson('moderation', 'Moderation'), ' · ', lesson('konflikt', 'Konfliktmanagement'), ' · ',
        lesson('mediation', 'Mediation'), ' · ', lesson('interview', 'Bewerbungsinterview'), ' · ',
        lesson('mitarbeitergespraeche', 'Mitarbeitergespräch'), ' · ', lesson('verkaufsgespraech', 'Verkaufsgespräch'),
      ]),
    ],
    checks: [
      ['Wodurch wird aus einem Gespräch eine belastbare Vereinbarung?', 'Ein klares Ergebnis, benannte Verantwortliche, Termine, Kriterien und eine gemeinsame Bestätigung der nächsten Schritte.'],
      ['Ein Team muss erst Fakten austauschen und danach einen neuen Ablauf beschließen. Wie trennst du beides?', 'Sichere zuerst einen gemeinsamen Informationsstand. Kläre danach Alternativen, Entscheidungsregel und Befugnis. Halte Beschluss und Umsetzung eindeutig fest.'],
    ],
  },
  {
    slug: 'kommunikationsgrundlagen', number: '4.4.1', title: 'Grundlagen der Kommunikation',
    intro: 'Kommunikation überträgt und interpretiert Botschaften. Verständigung wird wahrscheinlicher, wenn Ziel, Kontext, Kanal und Rückmeldung zur Aufgabe passen.',
    sections: [
      topic('modelle', 'Übermittlung und Beziehung verstehen',
        ['Im Sender-Empfänger-Modell wird eine Botschaft kodiert, über einen Kanal übertragen und interpretiert. Störungen können durch Technik, Fachsprache, Erwartungen und Zeitdruck entstehen. Das ', term('kommunikationsquadrat', 'Kommunikationsquadrat'), ' nach Schulz von Thun unterscheidet Sachinformation, Selbstkundgabe, Beziehungshinweis und Appell. Es hilft, mögliche Lesarten zu erkunden.'],
        '„Der Status fehlt seit einer Stunde“ enthält einen Sachhinweis und kann als Bitte um Nachfassen oder als Vorwurf verstanden werden. Kläre: „Soll ich den Fahrer anrufen, oder wartest du noch auf eine Rückmeldung?“ Verbale Inhalte, Tonfall und Körpersprache wirken zusammen. Blickkontakt oder Tonfall allein belegen keine Absicht.'),
      topic('techniken', 'Fragen, Zuhören und Rückmeldung einsetzen',
        [term('aktives-zuhoeren', 'Aktives Zuhören'), ' umfasst Aufmerksamkeit, Paraphrasieren, behutsames Spiegeln und Nachfragen. Offene Fragen erkunden Gründe, geschlossene Fragen sichern Fakten und Rückfragen prüfen Verständnis. Beobachtung, Wirkung und Bitte lassen sich in einer konkreten Ich-Botschaft verbinden.'],
        'Für eine zeitkritische Freigabe ist ein Anruf mit Wiederholung der Daten sinnvoll. Eine schriftliche Bestätigung hält Ort, Zeit und Verantwortliche fest. Bei einem heiklen Feedback ist ein geschütztes Gespräch oft geeigneter als ein Gruppenchat, weil Rückfragen und Beziehungssignale Gewicht haben.'),
    ],
    checks: [
      ['Welche vier Seiten unterscheidet das Kommunikationsquadrat?', 'Sachinformation, Selbstkundgabe, Beziehungshinweis und Appell. Empfänger können dieselbe Äußerung unterschiedlich gewichten.'],
      ['„Das klappt schon“ wird als Zusage gemeint und als Abwiegeln verstanden. Wie klärst du die Sache?', 'Frage neutral nach dem konkreten nächsten Schritt und der Frist, fasse die Antwort zusammen und bestätige, wer bei einer Abweichung informiert wird.'],
    ],
  },
  {
    slug: 'vortrag', number: '4.4.2', title: 'Vortrag und Präsentation',
    intro: 'Ein Vortrag vermittelt einen zusammenhängenden Sachverhalt. Eine Präsentation kann ergänzende Medien nutzen und auf Information, Einordnung, Zustimmung oder eine konkrete Entscheidung zielen.',
    sections: [
      topic('aufbau', 'Zielgruppe, Kernaussage und Belege planen',
        'Formuliere die gewünschte Reaktion. Kläre Vorwissen, Interessen und verfügbare Zeit der Zielgruppe. Ein Einstieg benennt Anlass und Relevanz. Der Hauptteil führt vom Problem über Evidenz und Optionen zur Empfehlung. Der Abschluss formuliert Entscheidung, nächste Schritte oder Fragen.',
        'Eine Entscheidungsvorlage für die Geschäftsleitung zeigt Serviceproblem, Ausgangswert, Kosten der Varianten und die beantragte Pilotfreigabe. Eine Präsentation für die Schichtteams zeigt Auswirkungen auf betriebliche Abläufe, Zuständigkeiten und einen konkreten Übungsfall.'),
      topic('darstellung', 'Medien und Durchführung prüfen',
        'Diagramme brauchen Einheiten, Vergleichsbasis und einen verständlichen Titel. Eine Tabelle eignet sich für genaue Zahlen. Zeige zentrale Informationen lesbar, erläutere Annahmen und bereite Antworten auf naheliegende Einwände vor. Plane Zeit für Fragen und prüfe Technik und eine Ersatzmöglichkeit.',
        ['Für ausführliche Vorbereitung und Durchführung siehe ', related('fz-praesentation', 'Präsentationstechniken'), '. Prüfe nach dem Termin, ob die Zielgruppe die Empfehlung verstanden hat und welche Entscheidung oder Folgeaufgabe dokumentiert ist.']),
    ],
    checks: [
      ['Welche Aufgabe hat der Schluss einer Entscheidungspräsentation?', 'Er verdichtet die Empfehlung, macht die gewünschte Entscheidung klar und nennt die nächsten Schritte oder offenen Fragen.'],
      ['Du hast sieben Minuten und zwölf Folien mit Detaildaten. Wie passt du die Präsentation an?', 'Konzentriere die Hauptfolien auf Situation, wesentliche Evidenz, Vergleich und Entscheidung. Lege Detailrechnungen für Rückfragen bereit und übe mit realistischem Zeitrahmen.'],
    ],
  },
  {
    slug: 'moderation', number: '4.4.3', title: 'Moderation betrieblicher Gruppen',
    intro: 'Moderation gestaltet den Prozess einer Gruppe. Sie macht Perspektiven sichtbar und führt von der Auftragsklärung zu überprüfbaren Ergebnissen.',
    sections: [
      topic('ablauf', 'Vom Auftrag zum Maßnahmenplan führen',
        ['Die ', { termId: 'fz-begriff-moderation', text: 'Moderation' }, ' klärt Ziel, Rollen, Zeit und Spielraum. Ein typischer Zyklus umfasst Einstieg, Sammeln, Auswählen, Bearbeiten, Maßnahmenplanung und Abschluss. Wer inhaltlich entscheidet, wird vor der Sitzung vereinbart.'],
        'Bei einer Auswertung der Schichtübergaben sammeln alle schriftlich Beispiele. Beiträge werden gemeinsam gruppiert. Eine Punktabfrage zeigt Prioritäten und ersetzt die vereinbarte Entscheidungsregel nur, wenn die Gruppe dies ausdrücklich beschlossen hat. Der Abschluss hält Aufgabe, Verantwortliche, Frist und Prüfkriterium fest.'),
      topic('schwierigkeiten', 'Beteiligung und Umgang mit Dissens sichern',
        'Bei dominanten Beiträgen helfen Redezeit, schriftliche Sammlung und gezielte Einbindung ruhiger Stimmen. Bei vermischten Sach- und Beziehungsthemen fasst die Moderation belegbare Punkte zusammen und klärt, welche Frage die Gruppe bearbeiten kann.',
        ['Bei hohem Eigeninteresse der Projektleitung kann eine andere Person moderieren. In einem digitalen Workshop helfen sichtbare Agenda und ein gemeinsames Protokoll. Vertiefung: ', related('fz-moderationszyklus', 'Moderationszyklus in sechs Schritten'), '.']),
    ],
    checks: [
      ['Welche Verantwortung trägt die Moderation?', 'Sie verantwortet Struktur, Beteiligung, Zeit und Ergebnissicherung des Prozesses. Inhaltliche Entscheidungen liegen bei der vorher vereinbarten Stelle.'],
      ['Eine Bereichsleitung will einen Workshop nutzen, um eine bereits feststehende Änderung zu erläutern. Wie setzt du den Auftrag auf?', 'Kommuniziere die Entscheidung und ihre Gründe transparent. Moderiere die offenen Punkte, etwa Umsetzung und Risiken, und kläre, welche Vorschläge tatsächlich entschieden werden können.'],
    ],
  },
  {
    slug: 'konflikt', number: '4.4.4', title: 'Konfliktmanagement',
    intro: 'Ein Konflikt liegt vor, wenn Beteiligte Ziele, Interessen, Rollen oder Beziehungen als unvereinbar erleben. Konfliktmanagement klärt Ursachen, Eskalation, Eingriff und Nachverfolgung.',
    sections: [
      topic('diagnose', 'Konfliktart und Eskalation einordnen',
        'Sachkonflikte betreffen Fakten und Lösungen, Zielkonflikte Prioritäten, Verteilungskonflikte knappe Mittel, Rollenkonflikte Erwartungen und Befugnisse, Beziehungskonflikte den Umgang miteinander. Mehrere Typen können gleichzeitig wirken. Beschreibe konkrete Beobachtungen und höre die Perspektiven getrennt oder gemeinsam.',
        'Glasl ordnet neun typische Eskalationsstufen: Verhärtung, Debatte und Polemik, Taten statt Worte, Images und Koalitionen, Gesichtsverlust, Drohstrategien, begrenzte Vernichtungsschläge, Zersplitterung und gemeinsam in den Abgrund. Die ersten drei Stufen lassen eher gemeinsame Gewinne zu, die mittleren fördern einseitige Durchsetzung, die letzten nehmen wechselseitige Verluste in Kauf. Nutze die Stufen als Orientierung. Koalitionen, Demütigung und Drohungen können zeigen, dass ein informelles Gespräch allein zu wenig Schutz bietet.'),
      topic('klaerung', 'Interessen und Lösungen bearbeiten',
        'Trenne Positionen und Interessen. „Nachts entscheidet die Disposition“ ist eine Position. Dahinter können Zeitdruck, Haftungsangst oder fehlende Erreichbarkeit stehen. Kläre Entscheidungsschwellen und vergleiche Optionen wie Bereitschaft, klare Wertgrenzen und automatisierte Information.',
        ['Vereinbare Verhalten, Fristen und Überprüfung. Für gewöhnliche Sachkonflikte kann ein moderiertes Gespräch ausreichen. Bei Einschüchterung oder einem erheblichen Machtgefälle sichere eine geeignete Anlaufstelle und Schutz, bevor du ein gemeinsames Gespräch in Betracht ziehst. Vertiefung: ', related('fz-konflikte', 'Konfliktmanagement in Führung und Zusammenarbeit'), '.']),
    ],
    checks: [
      ['Wie unterscheiden sich Position und Interesse?', 'Die Position ist die geforderte Lösung. Das Interesse beschreibt den Bedarf oder die Befürchtung, die hinter der Forderung steht.'],
      ['Zwei Teams verlangen jeweils denselben freien Mitarbeiter. Wie gehst du vor?', 'Kläre Aufträge, Fristen, Mindestbedarf und gemeinsame Ziele. Prüfe Vertretung, Staffelung und Prioritäten. Lass die zuständige Instanz bei ungelöster Ressourcenkonkurrenz entscheiden und halte den Plan fest.'],
    ],
  },
  {
    slug: 'mediation', number: '4.4.5', title: 'Mediation',
    intro: 'Mediation ist ein vertrauliches und strukturiertes Verfahren, in dem Streitparteien freiwillig und eigenverantwortlich eine Einigung anstreben. Eine unabhängige, neutrale Person leitet den Prozess ohne Entscheidungsbefugnis.',
    sections: [
      topic('rahmen', 'Eignung, Rolle und Freiwilligkeit klären',
        ['Bei der ', term('mediation', 'Mediation'), ' klären Beteiligte vor Beginn Auftrag, Rolle, Ablauf, Vertraulichkeit und mögliche Grenzen. Die Parteien wählen die mediierende Person und können das Verfahren beenden. Die Mediationsperson ist allen Parteien gleichermaßen verpflichtet. §§ 1–2 MediationsG regeln Begriff und Verfahren. § 4 regelt die Verschwiegenheit der mediierenden und in die Durchführung eingebundenen Personen samt Ausnahmen. Rechtsstand: 18. November 2026.'],
        'Bei Schutzbedarf, akuter Gefährdung, fehlender Freiwilligkeit oder einem nicht hinreichend ausgleichbaren Machtgefälle können andere Verfahren erforderlich sein. Die Auswahl hängt auch davon ab, ob die Parteien über die Streitpunkte wirksam verfügen können.'),
      topic('verfahren', 'Von Streitpunkten zu eigenverantwortlichen Vereinbarungen',
        'Kläre Rahmen und Themen, sammle Perspektiven, erforsche Interessen, entwickle Optionen und prüfe Vereinbarungen auf Durchführbarkeit. In einer freiwilligen Mediation zwischen Betriebsbereichen kann eine befristete Regel zur Schichtübergabe mit Ansprechperson, Messgröße und Überprüfungstermin vereinbart werden.',
        'Bei einem Streit unter Geschäftspartnern können Zahlungsplan und künftige Abläufe gemeinsam betrachtet werden. Falls rechtliche Folgen unklar sind, können Beteiligte die geplante Vereinbarung extern prüfen lassen. Ein Schiedsverfahren kann eine verbindliche Entscheidung enthalten, während die Parteien die Lösung in der Mediation selbst entwickeln.'),
    ],
    checks: [
      ['Wer entscheidet den Streit in einer Mediation?', 'Die Streitparteien treffen ihre Vereinbarung selbst. Die mediierende Person strukturiert und unterstützt das Verfahren ohne Entscheidungsbefugnis.'],
      ['Die Leitung verlangt Teilnahme und möchte jede Gesprächsaussage schriftlich erhalten. Wie prüfst du den Auftrag?', 'Kläre Freiwilligkeit, Rolle und Vertraulichkeit vor Beginn. Vereinbare, ob und in welcher Form ein gemeinsames Ergebnis weitergegeben wird. Kann der Rahmen nicht gewahrt werden, prüfe ein anderes Verfahren.'],
    ],
  },
  {
    slug: 'interview', number: '4.4.6', title: 'Interviewtechnik und Bewerbungsgespräch',
    intro: 'Ein strukturiertes Bewerbungsinterview erhebt berufsbezogene Nachweise anhand vergleichbarer Fragen, Kriterien und Bewertungsanker. Die Gesprächsführung verbindet Vergleichbarkeit mit Platz für Rückfragen.',
    sections: [
      topic('design', 'Fragen und Bewertungsanker aus der Aufgabe ableiten',
        ['Ein ', term('strukturiertes-interview', 'strukturiertes Interview'), ' beginnt mit einer Anforderungsanalyse. Verhaltensfragen erkunden konkrete frühere Erfahrungen. Situative Fragen beschreiben einen künftigen Fall. Beide brauchen berufsbezogene Kriterien und neutrale Nachfragen. Mit STAR werden Situation, Aufgabe, Handlung und Ergebnis erfragt.'],
        'Für eine Dispositionsstelle lautet eine situative Frage: „Zwei Fixtermine sind gefährdet, nur ein Ersatzfahrzeug ist verfügbar. Welche Informationen holst du ein und wie entscheidest du?“ Eine niedrige Bewertung nennt höchstens ein Kriterium ohne Begründung. Eine hohe Bewertung klärt Fristen, Alternativen, Auswirkungen und Eskalation und begründet die Auswahl.'),
      topic('ablauf', 'Vergleichbarkeit, Fairness und Grenzen sichern',
        'Kläre Ablauf und Rolle, führe die vergleichbaren Kernfragen durch, erläutere Aufgabe und Bedingungen, gib Raum für Bewerberfragen und nenne nächste Schritte. Bewertende notieren Belege und urteilen möglichst zunächst unabhängig. Das reduziert Halo-Effekt, Ähnlichkeitsneigung und frühe Anker. Eine Arbeitsprobe kann das Interview ergänzen.',
        'Das AGG verbietet Benachteiligungen wegen der in § 1 genannten Gründe im gesetzlichen Anwendungsbereich und verlangt nach § 11 diskriminierungsfreie Ausschreibungen. Berufliche Anforderungen und Ausnahmen brauchen eine sachliche Prüfung, etwa nach § 8 AGG. Frage arbeitsbezogen, dokumentiere notwendige Angaben und beachte Datenschutz. Rechtsstand: 18. November 2026.'),
    ],
    checks: [
      ['Was unterscheidet eine verhaltensbezogene von einer situativen Frage?', 'Die verhaltensbezogene Frage bittet um Belege aus einer tatsächlich erlebten Situation. Die situative Frage erkundet erwartetes Vorgehen in einem hypothetischen Arbeitsfall.'],
      ['Eine Bewerberin wirkt sehr sympathisch, liefert aber wenig Belege zu einem Muss-Kriterium. Wie bewertest du?', 'Bewerte das Kriterium anhand der definierten Anker. Frage standardisiert nach oder erhebe eine passende Arbeitsprobe. Trenne den persönlichen Eindruck von beobachtbaren Nachweisen.'],
    ],
  },
  {
    slug: 'mitarbeitergespraeche', number: '4.4.7', title: 'Mitarbeitergespräche führen',
    intro: 'Mitarbeitergespräche klären Leistung, Entwicklung, Ziele, Zusammenarbeit oder konkrete Probleme. Anlass, Ablauf und Verwendung der Gesprächsergebnisse beeinflussen ihre Wirkung.',
    sections: [
      topic('vorbereitung', 'Anlass und Informationen trennen',
        'Ein Feedbackgespräch bespricht beobachtbares Verhalten. Ein Beurteilungsgespräch bewertet Leistung über einen Zeitraum anhand vorher bekannter Kriterien. Ein Entwicklungsgespräch richtet sich auf Lernziele. Ein Zielgespräch vereinbart messbare Ergebnisse und Beiträge. Definiere Anlass, Zeit, Rahmen und erforderliche Unterlagen.',
        'Statt „du bist unzuverlässig“ nenne konkrete Beobachtungen: „Am Dienstag und Donnerstag fehlte die Statusmeldung bis Schichtende. Die Nachtschicht musste nachfassen.“ Bitte um die Sicht der Person. Ursachen können etwa fehlender Zugriff, Verständnisprobleme oder widersprüchliche Prioritäten sein.'),
      topic('vereinbarung', 'Hilfe, Erwartungen und Folgetermin vereinbaren',
        'Kläre erwartete Handlung, realistische Unterstützung, Verantwortliche und Termin. Dokumentiere das Erforderliche vertraulich. Bei einem Entwicklungsgespräch kann eine begleitete Freigabe pro Woche das Lernziel stützen. Bei wiederholter Abweichung prüfe vergleichbare Fälle und zuvor vereinbarte Unterstützung.',
        ['Feedback sollte klar und zeitnah sein. Bei starker Abweichung zwischen Selbstbild und Fremdbild helfen konkrete Beispiele und eine vereinbarte Nachbeobachtung. Vertiefung: ', related('fz-kommunikation', 'Mitarbeitergespräche in Führung und Zusammenarbeit'), '.']),
    ],
    checks: [
      ['Worin unterscheiden sich Feedback und Beurteilung?', 'Feedback gibt Rückmeldung zu konkretem Verhalten und Wirkung. Beurteilung bewertet Leistung über einen definierten Zeitraum anhand festgelegter Kriterien.'],
      ['Seit einer Prozessänderung meldet ein Mitarbeiter verspätet. Welche Vereinbarung schließt das Gespräch sinnvoll ab?', 'Kläre zuerst Prozess- und Kompetenzursachen. Vereinbare etwa Zugriff bis Montag, begleitetes Üben, eine messbare Frist für Meldungen und ein Auswertungsgespräch nach zwei Schichten.'],
    ],
  },
  {
    slug: 'verkaufsgespraech', number: '4.4.8', title: 'Verkaufsgespräche und Einwandbehandlung',
    intro: 'Ein Verkaufsgespräch klärt den Bedarf und prüft, ob eine Leistung dem Kunden einen belegbaren Nutzen bietet. Es endet mit einer belastbaren Vereinbarung oder einem geklärten nächsten Schritt.',
    sections: [
      topic('phasen', 'Vom Bedarf zur begründeten Empfehlung',
        'Bereite Informationen, Gesprächsziel und Verhandlungsspielraum vor. Eröffne mit einer Agenda. Frage nach Situation, Problem, Folgen, Erfolgskriterien und Entscheidungsweg. Fasse den Bedarf zur Bestätigung zusammen. Übersetze Merkmale in kundenbezogene Vorteile und erkläre den Nachweis.',
        'Bei einem Werkskunden kann eine verbindliche Meldung innerhalb von 30 Minuten einen Planungsnutzen haben. Zahlen aus vergleichbaren Piloten und eine klare Messdefinition sind aussagekräftiger als ein allgemeines Zuverlässigkeitsversprechen. Im Einzelhandel können dagegen Zeit, Passform und einfache Rückgabe die Entscheidung bestimmen.'),
      topic('einwaende', 'Einwände präzisieren und den nächsten Schritt sichern',
        ['Bei einem ', term('verkaufseinwand', 'Einwand'), ' frage zuerst, worauf er sich bezieht. „Zu teuer“ kann Budget, Vergleichbarkeit, Zahlungswirkung oder unklaren Nutzen meinen. Spiegle den Einwand, beantworte ihn mit belegbaren Angaben oder gestalte ein Alternativangebot. Rabatte können von nachvollziehbaren Gegenleistungen wie Mengenbindung abhängen.'],
        ['Vereinbare bei Zustimmung Leistung, Preis, Bedingungen, Entscheidungstermin und Verantwortliche. Wenn Informationen fehlen, vereinbare einen Folgetermin mit Auftrag. In einer Verhandlung hilft die BATNA, die beste Handlungsalternative ohne Einigung, den eigenen Spielraum zu bestimmen. Vertiefung im ', related('marketing-verkaufsgespraech', 'Marketing und Vertrieb'), '.']),
    ],
    checks: [
      ['Warum geht die Bedarfsanalyse dem Angebot voraus?', 'Sie klärt Anforderungen, Nutzen, Entscheidungskriterien und Grenzen. Erst dadurch lässt sich beurteilen, ob und unter welchen Bedingungen eine Leistung passt.'],
      ['Der Einkauf nennt ein günstigeres Angebot, erwähnt aber unterschiedliche Zeitfenster. Wie reagierst du?', 'Kläre, ob die Leistungen vergleichbar sind. Frage nach dem betrieblichen Bedarf und den Folgen eines weiteren Zeitfensters. Biete eine geeignete Variante mit transparenten Bedingungen an und halte den nächsten Schritt fest.'],
    ],
  },
];

export const communicationGlossary = [
  glossaryTerm('kommunikationsquadrat', 'Kommunikationsquadrat', 'Modell mit vier gleichzeitig möglichen Seiten einer Nachricht: Sache, Selbstkundgabe, Beziehung und Appell.', 'kommunikationsgrundlagen'),
  glossaryTerm('aktives-zuhoeren', 'Aktives Zuhören', 'Verstehen durch aufmerksames Zuhören, Zusammenfassen, Spiegeln und gezieltes Nachfragen überprüfen.', 'kommunikationsgrundlagen'),
  glossaryTerm('mediation', 'Mediation', 'Freiwilliges, vertrauliches und strukturiertes Verfahren der eigenverantwortlichen Konfliktlösung mit neutraler Prozessbegleitung.', 'mediation'),
  glossaryTerm('strukturiertes-interview', 'Strukturiertes Interview', 'Gespräch mit vorbereiteten vergleichbaren Fragen und transparenten Bewertungsankern zu definierten Anforderungen.', 'interview'),
  glossaryTerm('verkaufseinwand', 'Verkaufseinwand', 'Konkreter Zweifel oder Vorbehalt zu einem Angebot, der vor einer Entscheidung geklärt werden kann.', 'verkaufsgespraech'),
];
