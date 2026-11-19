import { topic, ref, word, sources, peopleSource, type UfLesson } from './uf-standard';

export const ufDevelopment: UfLesson[] = [
  {
    id: 'personalentwicklung', number: '3', title: 'Personalentwicklung',
    intro: 'Personalentwicklung erhält und erweitert berufliche Fähigkeiten für heutige und künftige Aufgaben. Sie verbindet den Bedarf des Unternehmens mit den Entwicklungsmöglichkeiten und Interessen der Beschäftigten und überprüft die Anwendung im Arbeitsalltag.',
    sections: [
      topic('regelkreis', 'Vom Unternehmensziel zum Transfer',
        ['Systematische ', { termId: 'fz-personalentwicklung-begriff', text: 'Personalentwicklung' }, ' beginnt mit dem Soll-Ist-Vergleich der Kompetenzen. Danach folgen Lernziel, Maßnahme, Durchführung, Anwendung und Wirkungskontrolle. ', ref('fz-personalentwicklung', 'Personalentwicklung und berufliche Bildung'), ' erklärt die Grundbegriffe; ', ref('bm-artikel-pe-verantwortung', 'Verantwortung für Personalentwicklung'), ' verteilt Aufgaben zwischen Leitung, Personalstelle und Lernenden.'],
        'Nordlicht braucht für höhere Erstlösungsquoten bessere Fehlerdiagnosen. Das Lernziel lautet: Techniker können bei drei typischen Störungen einen sicheren Diagnoseweg begründen und ausführen. Eine Schulung vermittelt Grundlagen, begleitete Einsätze sichern die Anwendung. Die Führung plant Lernzeit und qualifizierte Begleitung. Erst danach kann sie mehr selbstständige Freigaben übertragen.',
        'Nicht jede Leistungslücke ist eine Bildungslücke. Fehlende Teile, unklare Zuständigkeit oder ungeeignete Software müssen organisatorisch bearbeitet werden. Entwicklung ohne anschließende Einsatzmöglichkeit kann Frustration auslösen.'),
      topic('lernweg', 'Maßnahme, Eignung und Nutzen zusammenführen',
        [ref('uf-artikel-entwicklungsarten', 'Arten der Personalentwicklung'), ' → ', ref('uf-artikel-potenzial', 'Potenzialanalyse'), ' → ', ref('uf-artikel-pe-nutzen', 'Kosten- und Nutzenanalyse')]),
      sources(peopleSource, 'Fachliche Vertiefungen und Methoden: bestehende Artikel zu Personalentwicklung in Führung und Zusammenarbeit sowie Betrieblichem Management.'),
    ],
    checks: [
      ['Woran unterscheidest du eine Entwicklungsmaßnahme von einer bloßen Seminarbuchung?', 'Eine Entwicklungsmaßnahme hat einen belegten Bedarf, ein konkretes Lernziel, eine passende Lernform und Zeit für Anwendung und Wirkungskontrolle. Eine Buchung allein sichert diesen Zusammenhang nicht.'],
      ['Ein Serviceteam besteht das Quiz, darf die neue Diagnose aber im Alltag nicht einsetzen. Was folgt?', 'Befugnisse, sichere Einsatzfälle und begleitete Anwendung schaffen. Die Führung muss den Transfer ermöglichen, statt nur ein weiteres Wissensseminar anzusetzen.'],
    ],
  },
  {
    id: 'entwicklungsarten', number: '3.1', title: 'Ausbildung, Fortbildung und innerbetriebliche Förderung',
    intro: 'Arten der Personalentwicklung unterscheiden sich nach Ziel, beruflicher Ausgangslage und Lernort. Ausbildung schafft berufliche Handlungsfähigkeit, Fortbildung erhält oder erweitert sie und innerbetriebliche Förderung entwickelt Menschen durch Aufgaben, Begleitung und Perspektiven.',
    sections: [
      topic('ausbildung', '3.1.1 Ausbildung',
        ['Berufsausbildung vermittelt die für eine qualifizierte berufliche Tätigkeit nötigen Fertigkeiten, Kenntnisse und Fähigkeiten in einem geordneten Ausbildungsgang. ', ref('fz-ausbildung-rechtsrahmen', 'Rechtsgrundlagen und Ausbildungsplanung'), ' sowie ', ref('fz-ausbildung-eignung', 'Eignung von Betrieb und Ausbildungspersonal'), ' erklären Voraussetzungen und Planung. ', ref('fz-ausbildung-methoden', 'Ausbildungsmethoden'), ' hilft bei der Wahl zwischen Unterweisung und selbstständiger Bearbeitung.'],
        'Nordlicht bildet Nachwuchs für einen anerkannten Ausbildungsberuf aus, wenn geeignete Fachkräfte, Lernaufgaben, Zeit und vorgeschriebene Ausbildungsinhalte gesichert sind. Auszubildende dürfen nicht als sofort voll einsetzbare Ersatzkapazität gerechnet werden. Für eine sichere Auftragsvorbereitung kann die ausbildende Person erst vormachen und üben lassen, später einen passenden Auftrag mit Leitfragen selbstständig planen lassen. Lernstand und Risiken bestimmen die Methode.'),
      topic('fortbildung', '3.1.2 Fortbildung',
        'Anpassungsfortbildung hält berufliches Können aktuell, etwa für neue Diagnosegeräte. Höherqualifizierende Fortbildung erweitert die Handlungsfähigkeit und kann beruflichen Aufstieg ermöglichen, etwa zum Wirtschaftsfachwirt. Umschulung qualifiziert für eine andere berufliche Tätigkeit und ist deshalb abzugrenzen. § 1 BBiG beschreibt diese Berufsbildungsziele.',
        [ref('fz-ausbildung-personalentwicklung', 'Ausbildung, Fortbildung und Umschulung'), ' vertieft die Abgrenzung. Bei Nordlicht wird die Einführung eines neuen Messsystems als Anpassungsfortbildung geplant: Eingangstest, Praxisübung, begleiteter Einsatz, beobachtete Freigabe. Ein Aufstiegsabschluss ersetzt nicht automatisch die produktspezifische Einweisung.']),
      topic('foerderung', '3.1.3 Innerbetriebliche Förderung',
        [{ text: 'Mentoring', termId: 'fz-begriff-mentoring' }, ' unterstützt längerfristige berufliche Orientierung durch eine erfahrene Begleitperson. Es ergänzt die fachliche Anleitung und ersetzt keine verbindliche Freigabe für neue Aufgaben.'],
        ['Förderung verbindet Entwicklungsaufgaben und Begleitung. ', ref('fz-entwicklungsinstrumente', 'Instrumente der Personalentwicklung'), ' erklärt Jobrotation, Jobenlargement, Jobenrichment sowie into, on, near, off und along the job. ', ref('fz-mitarbeiterfoerderung', 'Mitarbeiterförderung'), ' erschließt Laufbahn- und Nachfolgeplanung.'],
        'Nordlicht vereinbart mit einer interessierten Technikerin eine Rotation in die Disposition, damit sie Schnittstellen versteht. Eine Mentorin begleitet ihre berufliche Orientierung längerfristig; Coaching kann an einer konkreten beruflichen Herausforderung und Reflexion ansetzen. In einem Lernprojekt analysiert sie wiederkehrende Zusagefehler. Das Unternehmen plant Vertretung, Lernziele und Rückmeldung, statt einfach zusätzliche Arbeit aufzutragen.',
        'Gleich schwierige Zusatzaufgaben erweitern den Umfang (Jobenlargement); selbstständige Planung und Entscheidung werten die Aufgabe qualitativ auf (Jobenrichment). Ein geplanter Wechsel zwischen Aufgaben ist Rotation. Keine Maßnahme ist automatisch eine Beförderung. In einer Buchhaltung kann eine begleitete Monatsabschlussvertretung eine Nachfolge vorbereiten, wenn Befugnisse und Kontrolle schrittweise passen.'),
      sources('§ 1 BBiG, Berufsbildungsziele, geprüft 19.11.2026: https://www.gesetze-im-internet.de/bbig_2005/__1.html', 'Methodenbasis: verlinkte vorhandene Artikel zu Ausbildung, Entwicklungsinstrumenten und Förderung.'),
    ],
    checks: [
      ['Wie unterscheidet sich Anpassungsfortbildung von Umschulung?', 'Anpassungsfortbildung hält berufliche Handlungsfähigkeit im bisherigen beruflichen Zusammenhang aktuell oder passt sie an. Umschulung soll zu einer anderen beruflichen Tätigkeit befähigen. Das Ziel der Maßnahme ist entscheidend.'],
      ['Eine Lagerfachkraft soll künftig Bestandsursachen analysieren und Freigaben entscheiden. Reicht eine bloße Rotation?', 'Rotation kann Prozesskenntnis vermitteln. Analyse- und Entscheidungsaufgaben verlangen zusätzlich Qualifizierung, passende Befugnisse, begleitete Praxis und Kontrolle. Die qualitative Aufwertung ist Jobenrichment.'],
    ],
  },
  {
    id: 'potenzial', number: '3.2', title: 'Potenzialanalyse für künftige Aufgaben nutzen',
    intro: 'Potenzialanalyse schätzt, welche künftigen Aufgaben eine Person mit geeigneter Entwicklung bewältigen könnte. Sie ergänzt die Beurteilung bisheriger Leistung um Hinweise auf Lern- und Entwicklungsmöglichkeiten. Ihre Aussage bleibt auf Anforderungen und Beobachtungen bezogen.',
    sections: [
      topic('vorgehen', 'Zielrolle vor der Person bewerten',
        ['Die ', { termId: 'fz-potenzialanalyse-begriff', text: 'Potenzialanalyse' }, ' wird in ', ref('fz-potenzialanalyse', 'Potenzialanalyse und Eignungsprofil'), ' sowie ', ref('fz-staerken-schwaechen-profil', 'Stärken-Schwächen-Profil'), ' methodisch erklärt. ', ref('fz-foerderung-transferfall', 'Arbeitsproben im Übungsfall'), ' zeigt die Anwendung. Für Unternehmensführung beginnt sie bei der künftig benötigten Rolle und endet in einem überprüfbaren Entwicklungsplan.'],
        'Nordlicht sucht eine künftige Einsatzleitung. Erforderlich sind Priorisierung, sichere Entscheidungen, Abstimmung und Rückmeldung. Kandidaten bearbeiten dieselbe simulierte Störung mit zwei konkurrierenden Eilaufträgen. Geschulte Beobachtende protokollieren konkrete Handlungen und bewerten zunächst unabhängig nach vorher festgelegten Kriterien. Ein Gespräch ergänzt Interessen und Selbstreflexion. Ein Assessment-Center kann mehrere Übungen und Beobachtende kombinieren; ein einzelner Eindruck ist dafür kein Ersatz.'),
      topic('entscheidung', 'Aus Hinweisen eine Entwicklungsentscheidung ableiten',
        'Eine Kandidatin erkennt Zielkonflikte gut, dokumentiert ihre Priorität aber unklar. Vereinbart werden ein begleitetes Einsatzplanungsprojekt, Rückmeldung zu drei Übergaben und eine erneute Arbeitsprobe nach acht Wochen. Gute bisherige Reparaturleistung allein hätte diese künftige Führungsanforderung nicht nachgewiesen.',
        'Ergebnisse werden vertraulich, anforderungsbezogen und mit der Person besprochen. Mehrere passende Beobachtungen, einheitliche Maßstäbe und unterschiedliche Methoden begrenzen Halo- und Ähnlichkeitsfehler. Tests müssen für den Zweck geeignet sein; Potenzial ist keine unveränderliche Eigenschaft oder sichere Beförderungsprognose. Allgemeine Beurteilungsgrundsätze und Personalfragebögen berühren bei vorhandenem Betriebsrat § 94 BetrVG.',
        'In einem Vertriebsunternehmen könnte die Zielrolle komplexe Kundenberatung sein. Die Arbeitsprobe müsste dann Beratungs- und Analyseverhalten zeigen; eine Einsatzplanungsübung wäre für diese Aussage nur begrenzt passend.'),
      sources('Methodenbasis: verlinkte vorhandene Artikel zur Potenzialanalyse und Personaleinschätzung.', '§ 94 BetrVG, amtliche Norm: https://www.gesetze-im-internet.de/betrvg/__94.html'),
    ],
    checks: [
      ['Warum belegt sehr gute Fachleistung nicht automatisch Führungspotenzial?', 'Die künftige Führungsrolle verlangt zusätzliche Kompetenzen, etwa Priorisierung und Abstimmung. Diese müssen an passenden Anforderungen und Situationen beobachtet werden.'],
      ['Eine gute Kundenberaterin soll künftig ein Projekt leiten. Welche Beobachtung wäre aussagekräftiger als ihre Umsatzrangliste?', 'Eine passende Projektarbeitsprobe mit Zielkonflikt, Planung und Abstimmung, ergänzt durch strukturierte Beobachtung und Gespräch. Die Umsatzrangliste misst bisherige Vertriebsergebnisse und nur einen Teil möglicher Voraussetzungen.'],
    ],
  },
  {
    id: 'pe-nutzen', number: '3.3', title: 'Kosten- und Nutzenanalyse der Personalentwicklung',
    intro: 'Kosten- und Nutzenanalyse vergleicht den gesamten Aufwand einer Entwicklungsmaßnahme mit ihren erwarteten oder beobachteten Wirkungen. Sie unterstützt die Auswahl und spätere Bewertung, ohne schwer messbare Vorteile oder andere Einflussfaktoren auszublenden.',
    sections: [
      topic('basis', 'Kosten vollständig erfassen, Nutzen zurechnen',
        [ref('bm-artikel-pe-umsetzung', 'Personalentwicklung umsetzen und evaluieren'), ' erklärt Reaktion, Lernen, Verhalten und Ergebnis sowie eine Kosten-Nutzen-Rechnung. Unternehmensführung braucht zusätzlich eine Entscheidung über Alternativen, verfügbare Mittel und die Unsicherheit des erwarteten Nutzens.'],
        'Direkte Kosten sind beispielsweise Kurs, Trainer und Material. Hinzu kommen Reise, interne Vorbereitung, vergütete Lernzeit und gegebenenfalls Vertretung. Entgangener Deckungsbeitrag kann bei verdrängter Leistung relevant sein, darf aber nicht dieselbe Belastung ein zweites Mal zählen. Nutzen kann aus weniger Nacharbeit, höherer Leistung, sicherer Vertretung oder Bindung entstehen. Letztere Vorteile sind oft nur eingeschränkt monetär belastbar.'),
      topic('rechnung', 'Nordlichts Diagnosetraining rechnen',
        'Eigene Modellannahmen: Kurs und Material 1.800 €, Lernzeit der Teilnehmenden 40 Stunden × 30 €/Stunde = 1.200 €, Vorbereitung und Begleitung 20 Stunden × 40 €/Stunde = 800 €, Reisekosten 200 €. Gesamtkosten = 1.800 + 1.200 + 800 + 200 = 4.000 €. Die Lernzeit erfolgt in verfügbarer Kapazität; ein zusätzlicher entgangener Deckungsbeitrag wird im Modell nicht angesetzt.',
        'Vergleichbare Fälle zeigen nach der Maßnahme 10 vermeidbare Zweitfahrten weniger pro Monat. Nach Abgleich anderer Änderungen werden im Modell 8 Fahrten/Monat vorsichtig dem Training zugerechnet. Vermiedene entscheidungsrelevante Kosten = 50 €/Fahrt. Nutzen = 8 Fahrten/Monat × 50 €/Fahrt = 400 €/Monat. Für 12 Monate: 4.800 €. Nettoeffekt = 4.800 − 4.000 = 800 €. ROI = Nettoeffekt ÷ Kosten × 100 = 800 ÷ 4.000 × 100 = 20 %. Statische Rückflussdauer = 4.000 € ÷ 400 €/Monat = 10 Monate bei sofortigem konstantem Nutzen.',
        'Die 50 € sind ausdrücklich tatsächlich vermiedene oder wirtschaftlich nutzbare Ressourcen. Ist ein Teil nur nicht nutzbare freie Arbeitszeit, fällt der monetäre Nutzen geringer aus. Zins, Steuern und zeitliche Anlaufverzögerung sind in der einfachen Modellrechnung nicht enthalten. Die statische Rückflussdauer zeigt keine dauerhafte Rentabilität.'),
      topic('entscheidung', 'Empfindlichkeit und nicht monetäre Wirkung prüfen',
        'Bei nur 5 zurechenbar vermiedenen Fahrten pro Monat beträgt der Jahresnutzen 5 × 50 × 12 = 3.000 €, Nettoeffekt −1.000 € und ROI −25 %. Die Nutzenschwelle liegt bei 4.000 € ÷ (50 €/Fahrt × 12 Monate) = 6,67 Fahrten/Monat. Die Leitung muss deshalb prüfen, ob mindestens etwa 7 tatsächlich vermeidbare Fahrten monatlich plausibel sind und ob sie auf Dauer vermieden werden.',
        'Seminarzufriedenheit beweist weder Lernen noch betrieblichen Nutzen. Vergleiche Fallmix, Mengen, Zeiträume und parallele Prozessänderungen; nutze, soweit sinnvoll, Vergleichsgruppen und Praxisbeobachtung. Nicht monetäre Effekte wie sichere Diagnose, Vertretbarkeit und Kundenvertrauen werden mit eigenen Kriterien dokumentiert. Verbindlich nötige Qualifizierung entfällt nicht allein wegen eines negativen kurzfristigen ROI.',
        'Nordlicht startet im Modell einen begrenzten Pilot, prüft nach drei Monaten Lerntransfer und Kosten und entscheidet dann über die Ausweitung. In einer Buchhaltung wäre statt Zweitfahrten etwa vermiedene Nachbearbeitung zu bewerten. Bei gleicher Systematik ändern sich Nutzenmaß, Zurechnung und Kostenbasis.'),
      sources('Methodenbasis und Abgrenzung der Wirkungsebenen: bestehender Artikel „Personalentwicklung umsetzen und evaluieren“.', 'Eigene, vollständig ausgewiesene Modellrechnung; keine pauschale Nutzenzusage aus einer Schulung.'),
    ],
    checks: [
      ['Warum dürfen alle sinkenden Fehlerkosten nicht automatisch dem Training zugerechnet werden?', 'Andere Änderungen, Mengen und Fallmix können dieselbe Wirkung verursachen. Vergleich, Beobachtung und vorsichtige Zurechnung sind nötig, bevor ein Nutzen als Trainingswirkung ausgewiesen wird.'],
      ['Eine Qualifizierung kostet 6.000 € und vermeidet zurechenbar 15 Fehler/Monat zu je 40 €. Berechne Jahresnutzen, Nettoeffekt, ROI und statische Rückflussdauer.', 'Monatsnutzen = 15 × 40 = 600 €. Jahresnutzen = 7.200 €, Nettoeffekt = 1.200 €, ROI = 1.200 ÷ 6.000 × 100 = 20 %. Rückflussdauer = 6.000 ÷ 600 = 10 Monate bei sofortigem konstantem Nutzen. Die vermiedenen Kosten und Zurechnung müssen belastbar sein.'],
    ],
  },
];
