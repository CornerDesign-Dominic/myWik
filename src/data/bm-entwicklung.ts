import { glossaryTerm, lesson, related, term, topic, type ManagementLesson } from './bm-artikel';

export const developmentLessons: ManagementLesson[] = [
  {
    slug: 'entwicklung', number: '2', title: 'Organisations- und Personalentwicklung',
    intro: 'Organisationsentwicklung verändert das Zusammenspiel von Aufgaben, Strukturen und Kultur. Personalentwicklung baut die dafür benötigten Kompetenzen auf. Beide setzen betriebliche Pläne in veränderte Handlungsmöglichkeiten um.',
    sections: [
      topic('zusammenspiel', 'Organisation und Qualifikation zusammen planen',
        'Wenn ein Betrieb einen zentralen Kundenservice einführt, braucht er Zuständigkeiten, Eskalationswege und Datenzugriff. Beschäftigte brauchen zugleich Fähigkeiten für Fallklärung, Systembedienung und schwierige Gespräche. Schulen ohne klare Zuständigkeit verpufft. Definierte Rollen ohne Befähigung bleiben auf dem Papier.',
        'Analysiere zuerst die erwartete Leistung und ihre Voraussetzungen. Ordne Abweichungen System, Ressourcen oder Kompetenzen zu. Plane mögliche Beiträge beider Entwicklungsfelder und beurteile Veränderungen gemeinsam anhand von Prozess- und Lernindikatoren.'),
      topic('weiterlernen', 'Entwicklungsschwerpunkte', [lesson('planung-entwicklung', 'Planungsfolgen'), ' · ', lesson('oe', 'Organisationsentwicklung'), ' · ', lesson('pe', 'Personalentwicklung')]),
    ],
    checks: [
      ['Was sind typische Ansatzpunkte von Organisations- und Personalentwicklung?', 'Organisationsentwicklung gestaltet Rollen, Abläufe und Zusammenarbeit. Personalentwicklung gestaltet Lernen, Einsatz und Kompetenzentwicklung. Beide wirken häufig im selben Vorhaben zusammen.'],
      ['Ein neues Reklamationssystem wird kaum verwendet. Wie klärst du die Entwicklungsaufgabe?', 'Prüfe Zugriffe, Schnittstellen und Freigaben als organisatorische Ursachen. Beobachte danach, welche Arbeitsschritte Beschäftigte beherrschen. Plane strukturelle Korrekturen und gezieltes Üben an den jeweils belegten Ursachen.'],
    ],
  },
  {
    slug: 'planung-entwicklung', number: '2.1', title: 'Auswirkungen betrieblicher Planung auf Organisation und Personal',
    intro: 'Investitionen, Wachstum, Prozessänderungen und neue Geschäftsmodelle ändern, welche Kapazitäten, Rollen und Kompetenzen ein Betrieb benötigt.',
    sections: [
      topic('gap', 'Geschäftsplan in Entwicklungsbedarf übersetzen',
        ['Eine ', term('kompetenzluecke', 'Kompetenzlücke'), ' ist eine Differenz zwischen gefordertem und beobachtetem Können. Beginne mit dem geplanten Leistungsvolumen und den künftigen Aufgaben. Leite Soll-Rollen und Soll-Kompetenzen ab. Vergleiche sie mit verfügbaren Kapazitäten und nachgewiesenen Fähigkeiten. Prüfe danach, welche Lücken durch Lernen, neue Abläufe, Einsatzwechsel oder Einstellung geschlossen werden können.'],
        'Eine Nacht-Disposition rechnet mit 120 Vorgängen je Woche à zehn Minuten, also 1.200 Minuten oder 20 produktiven Stunden. Bei 80 % produktiv nutzbarer Zeit sind rechnerisch 20 ÷ 0,8 = 25 Einsatzstunden nötig. Mindestbesetzung, Spitzen und Vertretung können den realen Bedarf erhöhen. Zusätzlich muss mindestens eine Person je Schicht Ausnahmefreigaben beherrschen.'),
      topic('folgen', 'Nebenwirkungen und Rückmeldungen einplanen',
        'Entwicklungszeit belegt Kapazität. Bei einer neuen Rechnungsprüfsoftware kann ein Pilot vor flächendeckender Schulung zeigen, ob Automatisierung, Kalibrierung oder Datenqualität zuerst verbessert werden müssen. Zuständigkeiten, Lernzeiten und Weisungsbefugnisse gehören in den Plan.',
        'Wenn zwei Standorte fusionieren, kann die Lösung bei gleicher Kopfzahl andere Aufgabenverteilung, Übergangsrollen und Qualifizierung erfordern. Bewerte technische Machbarkeit, Arbeitsbelastung und Lernfortschritt als getrennte Größen.'),
    ],
    checks: [
      ['Wie unterscheidest du eine Kapazitätslücke von einer Kompetenzlücke?', 'Die Kapazitätslücke betrifft fehlende verfügbare Leistung oder Zeit. Die Kompetenzlücke betrifft fehlendes Können für eine Aufgabe. Beide können gleichzeitig bestehen.'],
      ['Für einen neuen Prozess fehlen 15 produktive Stunden wöchentlich, bei 75 % Nutzungsgrad. Wie viel Einsatzzeit planst du mindestens ein?', '15 ÷ 0,75 = 20 Stunden. Prüfe zusätzlich Schichtabdeckung, Vertretung und ob die eingeplanten Beschäftigten die geforderten Aufgaben beherrschen.'],
    ],
  },
  {
    slug: 'oe', number: '2.2', title: 'Organisationsentwicklung',
    intro: 'Organisationsentwicklung ist die geplante, längerfristige Weiterentwicklung einer Organisation und ihres Arbeitsgefüges. Betroffene bringen Wissen über Probleme und Umsetzbarkeit ein.',
    sections: [
      topic('ansatz', 'Aufgaben, Technik und soziale Beziehungen betrachten',
        ['Die ', term('oe', 'Organisationsentwicklung'), ' untersucht Wechselwirkungen zwischen formellen Strukturen, Prozessen, Technik und gelebten Normen. Ein neues Organigramm kann Weisungswege klären. Kooperationsprobleme an Schnittstellen brauchen gegebenenfalls zusätzlich abgestimmte Ziele und Routinen.'],
        'Veränderungsmanagement organisiert die Einführung eines Wandels. Organisationsentwicklung legt besonderes Gewicht auf Beteiligung, Diagnose, Lernschleifen und eine tragfähige Arbeitsweise. Eine IT-Einführung kann deshalb Teil eines breiteren Entwicklungsprozesses sein.'),
      topic('praxis', 'Die Diagnose vor die Lösung stellen',
        'Ein Standort mit hoher Fehlerquote beobachtet Übergaben, führt Interviews und vergleicht Fehler nach Schicht. Erst dann werden Maßnahmen ausgewählt. Ein unvollständiges Übergabeprotokoll lässt sich als Prozessproblem bearbeiten. Gegensätzliche Prioritäten verlangen zusätzlich abgestimmte Führungsziele.',
        'Startet ein Unternehmen wegen derselben Fehler sofort ein Kommunikationstraining, kann der eigentliche Zielkonflikt weiterbestehen. Prüfe die Wirkung anhand der erwarteten Veränderung und halte fest, welche Annahmen noch offen sind.'),
    ],
    checks: [
      ['Warum gehören Betroffene in die Diagnose?', 'Sie kennen Abweichungen zwischen Soll- und gelebtem Prozess, können Voraussetzungen benennen und helfen, die Umsetzbarkeit zu prüfen.'],
      ['Eine neue Struktur verkürzt Freigaben, doch Kunden erhalten widersprüchliche Antworten. Wo setzt du an?', 'Untersuche Übergaben, Informationsversionen und Entscheidungskompetenzen. Entwickle mit den Beteiligten eine gemeinsame Auskunftsgrundlage und prüfe zusätzlich zur Freigabedauer die Antwortqualität.'],
    ],
  },
  {
    slug: 'oe-ziele', number: '2.2.1', title: 'Ziele der Organisationsentwicklung',
    intro: 'Organisationsentwicklung soll Leistungsfähigkeit, Anpassungsfähigkeit und Qualität der Zusammenarbeit verbessern. Die Ziele werden als beobachtbare Veränderungen im System formuliert.',
    sections: [
      topic('dimensionen', 'Wirkungen und Zielkonflikte messen',
        'Wirtschaftliche Ziele betreffen Qualität, Durchlaufzeit oder Auslastung. Soziale Ziele können Einfluss, Belastung, Vertrauen und Arbeitszufriedenheit betreffen. Entwicklungsziele umfassen Lernfähigkeit und schnellere Reaktion auf Änderungen. Ordne jedem Ziel eine Ausgangsmessung, eine Zielgröße und einen Beobachtungszeitraum zu.',
        'Ein Reklamationsprozess soll von fünf auf drei Arbeitstage sinken. Als Gegenkennzahlen beobachtet das Team Wiedereröffnungen und Überstunden. Stimmen Fallarten und Messintervalle überein, lässt sich der Effekt aussagekräftiger beurteilen.'),
      topic('bewertung', 'Zielerreichung im Zusammenhang beurteilen',
        'Durchschnittswerte können einen belasteten Standort verdecken. Verteile Ergebnisse nach Teams und Fällen, bespreche Nebenwirkungen und prüfe, ob ein neuer Prozess auch bei hoher Auslastung hält. Bei Einführung in Wellen kann eine ähnliche Pilotgruppe mit einem später umstellenden Bereich verglichen werden. Unterschiede im Ausgangsniveau bleiben zu berücksichtigen.',
        'In einem Krankenhaus ist bei beschleunigter Entlassung etwa die Rückkehrquote eine mögliche Gegenkennzahl. In einem Lager können Schäden, Überstunden und Sicherheit die reine Mengenleistung ergänzen.'),
    ],
    checks: [
      ['Warum kann eine einzige Produktivitätskennzahl die Wirkung einer Organisationsentwicklung verzerrt abbilden?', 'Sie kann Qualitätseinbußen, Belastung und eine Verschiebung von Arbeit in andere Bereiche verdecken. Gegenkennzahlen machen solche Folgen sichtbar.'],
      ['Nach Zentralisierung sinken die Kosten um 10 %, aber Eskalationen verdoppeln sich. Wie beurteilst du die Zielerreichung?', 'Prüfe Fallmengen, Ursachen, Schwere und Kosten der Eskalationen. Vergleiche sie mit definierten Qualitätsgrenzen. Beurteile anschließend die Gesamtwirkung und prüfe, ob lokale Entscheidungsspielräume helfen.'],
    ],
  },
  {
    slug: 'oe-konzept', number: '2.2.2', title: 'Konzept und Umsetzung der Organisationsentwicklung',
    intro: 'Ein Organisationsentwicklungskonzept verbindet Diagnose, Ziele, Beteiligung, Interventionen und Evaluation. Zwischen den Phasen werden Annahmen geprüft und Maßnahmen angepasst.',
    sections: [
      topic('phasen', 'Von der Auftragsklärung zur Verstetigung',
        ['Bei der ', term('aktionsforschung', 'Aktionsforschung'), ' gehen Datenerhebung, gemeinsames Lernen und Intervention in Schleifen ineinander über. Kläre Auftrag und Entscheidungsspielraum. Erhebe Ist-Daten, gib Befunde an Beteiligte zurück, entwirf einen Soll-Prozess, erprobe die Änderung und prüfe Ergebnisse. Verankere bewährte Regeln in Routinen und Zuständigkeiten.'],
        'Lewins Drei-Phasen-Modell unterscheidet das Öffnen bisheriger Routinen, die Veränderung und deren Stabilisierung. Das Modell hilft, Vorbedingungen und Verstetigung mitzudenken. In laufender Veränderung sind Phasen oft gleichzeitig sichtbar und Stabilisierung bleibt überprüfbar.'),
      topic('widerstand', 'Beteiligung und Widerstand auswerten',
        'Beim Pilot einer zentralen Leitstelle meldet eine Nachtschicht, dass Freigaben zu lange warten. Unterscheide Interesse, konkrete Beobachtung und Ursache. Eine berechtigte Reaktion kann ein hinterlegter Freigaberahmen für die Nacht sein. Gib Rückmeldung, was geändert wurde und welche Grenzen weiterhin gelten.',
        'Wenn ein Team eine neue Freigaberegel grundsätzlich unterstützt, aber keine Zeit zur Erprobung hat, ist Überlastung eine alternative Erklärung für geringe Nutzung. Plane eine kleine Intervention und beobachte, ob der erwartete Effekt eintritt.'),
    ],
    checks: [
      ['Warum gehört die Verstetigung in ein OE-Konzept?', 'Sie integriert bewährte Änderungen in Aufgaben, Routinen, Verantwortlichkeiten und Kennzahlen, damit der Effekt nach dem Pilot bestehen bleibt.'],
      ['Eine Abteilung führt neue Tagesbesprechungen ein, aber Probleme bleiben unverändert. Wie überprüfst du die Intervention?', 'Prüfe, ob die Besprechungen Ursachen sichtbar machen und Entscheidungen auslösen. Erfasse beispielsweise entschiedene Hindernisse und deren Erledigung. Passe Teilnehmende, Entscheidungsbefugnis oder Takt an, wenn die erwartete Wirkung ausbleibt.'],
    ],
  },
  {
    slug: 'lernende-organisation', number: '2.2.3', title: 'Lernende Organisation',
    intro: 'Eine lernende Organisation wertet Erfahrungen systematisch aus und verändert dauerhaft, wie sie arbeitet und entscheidet. Individuelles Lernen wird organisatorisch wirksam, wenn das Wissen in gemeinsame Routinen, Entscheidungen oder Systeme eingeht.',
    sections: [
      topic('lernschleifen', 'Fehler korrigieren und Regeln überprüfen',
        ['Beim ', term('single-loop', 'Single-Loop-Lernen'), ' wird eine Abweichung innerhalb bestehender Regeln korrigiert. Beim ', term('double-loop', 'Double-Loop-Lernen'), ' werden Ziele, Regeln oder Annahmen selbst überprüft. Ein verspäteter Transport kann durch schnelleres Eskalieren aufgeholt werden. Wiederholte Fälle können zeigen, dass der Eskalationsschwellenwert systematisch zu spät greift.'],
        'Systemdenken verbindet Ursache, Rückkopplung und Verzögerung. Psychologische Sicherheit erleichtert es, Zweifel, Fehler und Hinweise anzusprechen. Verbindliche Rückmeldungen und Zuständigkeiten verhindern, dass Reflexion beim Austausch stehen bleibt.'),
      topic('routinen', 'Ein Lernformat in den Arbeitsablauf integrieren',
        'Eine After-Action-Review klärt erwartetes Ergebnis, tatsächlichen Verlauf, Ursachen und nächste Änderungen. Eine Person übernimmt die Änderung, eine zweite überprüft später die Wirkung. Bei geänderter Routine werden alte Vorlagen ersetzt und neue Beschäftigte anhand desselben Falls eingearbeitet.',
        'Tritt derselbe Qualitätsfehler in drei Filialen auf, vergleiche deren Verfahren und prüfe eine gemeinsame Regel in einem begrenzten Versuch. Verhindere, dass eine einzelne Erfahrung sofort verallgemeinert wird.'),
    ],
    checks: [
      ['Woran erkennst du organisatorisches Lernen?', 'Erkenntnisse ändern dauerhaft eine gemeinsam genutzte Vorgehensweise, Entscheidung oder Regel und werden später überprüft.'],
      ['Wiederholte Retouren entstehen trotz korrekt ausgeführter Endkontrolle. Welche Frage führt zum Double-Loop-Lernen?', 'Prüfe, ob Zeitpunkt und Kriterien der Endkontrolle überhaupt die relevanten Fehler aufdecken. Gegebenenfalls wird der Prüfstandard verändert oder die Prüfung in einen früheren Prozessschritt verlegt.'],
    ],
  },
  {
    slug: 'pe', number: '2.3', title: 'Personalentwicklung',
    intro: 'Personalentwicklung umfasst systematische Maßnahmen, mit denen Betriebe und Beschäftigte berufliche Handlungskompetenz aufbauen, erhalten und für künftige Aufgaben einsetzen.',
    sections: [
      topic('abgrenzung', 'Kompetenz über beobachtbares Handeln erfassen',
        ['Die ', { termId: 'fz-personalentwicklung-begriff', text: 'Personalentwicklung' }, ' verbindet Qualifizierung, Förderung und Laufbahnentwicklung. Handlungskompetenz umfasst Fachwissen, anwendbare Methoden, Zusammenarbeit und Selbststeuerung. Ein Zertifikat ist ein Nachweis über ein Format oder einen Abschluss. Ob die Person eine Aufgabe beherrscht, zeigt eine geeignete Handlungssituation.'],
        'Eine Disponentin kann eine Freigaberegel erklären und trotzdem bei gleichzeitigem Kundendruck unsicher handeln. Ein Falltraining mit Rückmeldung übt die Situation. Eine Beobachtung in der Folgewoche zeigt, ob die Handlung in den Arbeitsalltag übergeht.'),
      topic('weiterlernen', 'Von Bedarf bis Anwendung', [
        lesson('pe-ziele', 'Ziele'), ' · ', lesson('pe-verantwortung', 'Verantwortung'), ' · ',
        lesson('pe-instrumente', 'Instrumente'), ' · ', lesson('pe-einsatzfelder', 'Einsatzfelder'), ' · ', lesson('pe-umsetzung', 'Transfer und Evaluation'),
      ]),
    ],
    checks: [
      ['Was unterscheidet Kompetenz von einer Teilnahmebescheinigung?', 'Kompetenz zeigt sich im situationsgerechten Handeln. Eine Teilnahmebescheinigung dokumentiert vor allem die Teilnahme und kann eine Arbeitsprobe nicht ersetzen.'],
      ['Eine künftige Teamleitung kennt Methoden, setzt Rückmeldungen aber unklar um. Welcher Entwicklungsansatz passt?', 'Lege beobachtbare Gesprächskriterien fest, übe ein Feedbackgespräch im Rollenspiel und lasse eine spätere reale Anwendung mit vereinbarter Begleitung reflektieren.'],
    ],
  },
  {
    slug: 'pe-ziele', number: '2.3.1', title: 'Ziele der Personalentwicklung',
    intro: 'Personalentwicklung verbindet betriebliche Bedarfe wie Qualität, Nachfolge und Veränderungsfähigkeit mit individuellen Zielen wie beruflicher Entwicklung und Beschäftigungsfähigkeit.',
    sections: [
      topic('zielableitung', 'Aus einem Prozessziel ein Lernziel ableiten',
        'Ein Betrieb will Fehlfreigaben von 6 % auf unter 2 % senken. Ein passendes Lernziel lautet: Beschäftigte können bis Ende Juni in vier von fünf unbekannten Übungsfällen Freigaberisiken richtig einordnen und ihre Entscheidung anhand zweier Kriterien begründen. Der reale Fehleranteil dient später als betriebliche Wirkungsmessung.',
        'Weitere Ziele können Aufbau von Vertretung, Einarbeitung, Bindung, Wissenserhalt oder Führungskräftenachfolge sein. Erfrage Entwicklungsinteressen und prüfe, ob Maßnahmen im Arbeitsablauf echte Anwendung ermöglichen.'),
      topic('zielkonflikt', 'Kurzfristigen Aufwand und Nutzen abwägen',
        'Ein Team investiert zwölf Stunden in eine zweite Vertretung. Die Ausbildung belastet kurzfristig den Dienstplan und reduziert langfristig Ausfallrisiken. Beurteile die Maßnahme anhand sicher abgedeckter Prozesse und vertretbarer Lernlast.',
        'Wähle Lernindikatoren für das Können und Ergebnisindikatoren für die betriebliche Wirkung. Eine Verbesserung kann auch auf veränderte Technik oder günstigeren Auftragsmix zurückgehen.'),
    ],
    checks: [
      ['Was enthält ein prüfbares Lernziel?', 'Es nennt eine beobachtbare Handlung, ihre Bedingungen, ein Leistungsmaß und einen Zeitpunkt.'],
      ['„Alle besuchen einen Excel-Kurs“ ist vorgegeben. Formuliere ein Lernziel zur Planungsrechnung.', 'Bis Ende des Monats erstellen Beschäftigte aus vorgegebenen Mengen, Preisen und Kosten eine korrekte Szenariorechnung, prüfen die Summen und erläutern die Annahme mit dem größten Ergebniseffekt.'],
    ],
  },
  {
    slug: 'pe-verantwortung', number: '2.3.2', title: 'Verantwortung für Personalentwicklung',
    intro: 'Personalentwicklung gelingt, wenn strategische Verantwortung, praktische Lernbegleitung und Verantwortung der Lernenden ausdrücklich vereinbart sind.',
    sections: [
      topic('rollen', 'Rollen und Entscheidungsspielräume klären',
        'Geschäftsleitung setzt Entwicklungsziele und Mittel. Personalbereich stellt Verfahren und Qualitätsstandards bereit. Führungskräfte klären Bedarf, sorgen für Lernzeit und begleiten den Transfer. Beschäftigte bringen Lernziele ein, üben und melden Hindernisse. Mentorinnen, interne Fachleute und externe Anbieter ergänzen die fachliche Begleitung.',
        'Besteht ein zuständiger Betriebsrat, können bei Berufsbildung die unterschiedlichen Beteiligungsrechte nach §§ 96–98 BetrVG greifen. § 96 betrifft die Förderung und unter anderem die Ermittlung des Bedarfs auf Verlangen des Betriebsrats, § 97 Beratung und unter bestimmten Voraussetzungen die Einführung von Maßnahmen, § 98 die Durchführung betrieblicher Bildungsmaßnahmen. Rechtsstand dieser Lerneinheit: 18. November 2026.'),
      topic('praxis', 'Verantwortung für den Transfer zuordnen',
        'Für eine Schulung zur Reklamationsprüfung stellt HR das Format bereit. Die Fachführung wählt passende Fälle und plant Übungszeit. Ein Mentor beobachtet drei reale Entscheidungen. Die lernende Person dokumentiert offene Fragen. Die Leitung prüft nach vier Wochen, ob die Abläufe Anwendung ermöglichen.',
        'Bei einer Nachfolgeplanung entscheidet das Management über Rollenbesetzung. Die Personalentwicklung liefert beobachtbare Kriterien und Entwicklungsoptionen. Vertraulichkeit und Zugriffsgrenzen gehören in beide Prozesse.'),
    ],
    checks: [
      ['Welche Verantwortung bleibt nach einem externen Training bei der Führungskraft?', 'Anwendungsmöglichkeiten bereitstellen, Rückmeldung geben, Hindernisse auflösen und die Entwicklung im Arbeitsprozess überprüfen.'],
      ['Eine neue Maschine macht bisherige Tätigkeiten teilweise entbehrlich. Wer muss bei der Qualifizierungsplanung einbezogen werden?', 'Führung und Personalbereich klären Aufgaben, Bedarf und Lernzeit mit Betroffenen und Fachleuten. Bei einem zuständigen Betriebsrat sind insbesondere die Voraussetzungen der Beteiligung nach §§ 96–98 BetrVG zu prüfen.'],
    ],
  },
  {
    slug: 'pe-instrumente', number: '2.3.3', title: 'Instrumente der Personalentwicklung',
    intro: 'Ein Entwicklungsinstrument passt, wenn es die relevante Handlung übt, eine sinnvolle Rückmeldung ermöglicht und mit Risiko und Aufwand der Aufgabe vereinbar ist.',
    sections: [
      topic('instrumente', 'Lernort und Lernform auswählen',
        'Into the job umfasst Maßnahmen beim Einstieg, etwa strukturierte Einarbeitung. On the job findet Lernen im realen Arbeitsablauf statt, etwa Unterweisung, Job Rotation oder begleitetes Üben. Near the job nutzt arbeitsnahe Formate wie Lernwerkstätten und Qualitätszirkel. Off the job erfolgt Lernen außerhalb des unmittelbaren Arbeitsplatzes, etwa im Seminar. Out of the job kann Übergänge aus einer Rolle und Wissenstransfer begleiten.',
        'Job Rotation wechselt Einsatzbereiche, Job Enlargement erweitert Aufgaben auf vergleichbarem Niveau, Job Enrichment erhöht Verantwortung oder Entscheidungsspielraum. Coaching unterstützt Reflexion und Entwicklung, Mentoring nutzt Erfahrung und Orientierung. E-Learning eignet sich für wiederholbares Grundlagenwissen, Simulation für seltene oder riskante Situationen.'),
      topic('kombination', 'Passende Kombination für einen kritischen Prozess',
        'Für Ausnahmesendungen werden Grundlagen per Lernmodul, Entscheidungen anhand einer Simulation und Übertragung durch begleitetes Handeln geübt. Definiere Freigabekriterien und begrenze Risiken durch einen zweiten prüfenden Kollegen.',
        ['Eine neue Sachbearbeiterin lernt normale Standardfälle durch begleitete Praxis. Bei vertraulichen Personalgesprächen schafft ein Rollenspiel zunächst einen geschützten Lernraum. Weitere Methoden stehen unter ', related('fz-entwicklungsinstrumente', 'Instrumente für die Personalentwicklung'), '.']),
    ],
    checks: [
      ['Worin unterscheiden sich Job Enlargement und Job Enrichment?', 'Enlargement erweitert das Aufgabenspektrum auf ähnlichem Anspruchsniveau. Enrichment gibt der Rolle zusätzliche Verantwortung oder Entscheidungskompetenz.'],
      ['Ein selten auftretender Störfall birgt hohe Schäden. Welche Lernfolge passt?', 'Vermittle Grundlagen, übe mehrere Varianten in einer Simulation, gib Feedback anhand eines Bewertungsrasters und erprobe reale Aufgaben nur mit klarer Freigabe und Begleitung.'],
    ],
  },
  {
    slug: 'pe-einsatzfelder', number: '2.3.4', title: 'Einsatzfelder der Personalentwicklung',
    intro: 'Personalentwicklung begleitet Einstieg, laufende Anpassung, beruflichen Aufstieg, Rollenwechsel und Wissensübergabe. Das Entwicklungsfeld richtet sich nach dem Grund für die Kompetenzlücke.',
    sections: [
      topic('lebenszyklus', 'Maßnahmen entlang beruflicher Übergänge wählen',
        'Onboarding sichert Orientierung und frühe Handlungsfähigkeit. Anpassungsqualifizierung hält Kompetenzen bei Technik- oder Prozesswechsel aktuell. Aufstiegsentwicklung bereitet komplexere Fach- oder Führungsaufgaben vor. Nachfolgeplanung schützt kritische Rollen. Regelmäßige Weiterbildung unterstützt auch Beschäftigte ohne Rollenwechsel.',
        'Eine Kompetenzmatrix verbindet Rollen, erforderliche Stufen, beobachteten Ist-Stand und Vertretung. Sie zeigt die Abhängigkeit von Einzelpersonen. Die Bewertung braucht nachvollziehbare Kriterien und sollte als Entwicklungsgrundlage behandelt werden.'),
      topic('auswahl', 'Kritische Rollen und Entwicklungspfade',
        'Rechnungsfreigaben hängen an einer Fachkraft. Ein Entwicklungsplan benennt zwei mögliche Vertretungen, lässt sie typische Fälle bearbeiten und legt die Bedingungen für eine formale Freigabe fest. Eine Fachlaufbahn erlaubt zusätzliche Verantwortung auch ohne Personalführung.',
        'Bei einem Lagerwechsel kann Job Rotation den Wissenstransfer unterstützen. Geht eine langjährige Fachkraft in den Ruhestand, helfen gemeinsame Fallbearbeitung und dokumentierte Ausnahmeentscheidungen. Wähle den Lernweg nach Rolle und zeitlichem Vorlauf.'),
    ],
    checks: [
      ['Wann ist Nachfolgeplanung besonders dringlich?', 'Bei geschäftskritischen Rollen, kurzer Vertretungskette, langer Einarbeitungszeit oder hohem drohendem Wissensverlust.'],
      ['Eine erfahrene Beschäftigte möchte wachsen, aber keine Personalverantwortung. Welche Perspektive passt?', 'Eine Fachlaufbahn, beispielsweise als Prozessverantwortliche oder fachliche Mentorin, kann Kompetenz und Verantwortung erweitern. Vereinbare passende Tätigkeiten, Kriterien und Unterstützung.'],
    ],
  },
  {
    slug: 'pe-umsetzung', number: '2.3.5', title: 'Personalentwicklung umsetzen und evaluieren',
    intro: 'Personalentwicklung ist ein Zyklus vom Bedarf über Lernziel und Maßnahme zum Transfer und zur Wirkung. Betriebskennzahlen liefern Hinweise auf Wirkung, wenn alternative Ursachen berücksichtigt werden.',
    sections: [
      topic('prozess', 'Durchführung und Transfer planen',
        ['Vergleiche Soll- und Ist-Kompetenz durch Beobachtung, Arbeitsprobe und Gespräch. Vereinbare Ziel, Lernform und Kriterien. Plane Übungsgelegenheiten, Unterstützung und einen Termin zur Beobachtung im Alltag. ', term('lerntransfer', 'Lerntransfer'), ' liegt vor, wenn Gelerntes in passenden Arbeitssituationen genutzt und stabilisiert wird.'],
        'Vier Ebenen einer Evaluation sind Reaktion, Lernen, Verhalten und Ergebnisse. Eine gute Bewertung im Seminar misst Reaktion. Eine Fallaufgabe misst Lernen. Beobachtete Anwendung misst Verhalten. Die Fehlerquote misst ein Ergebnis, das auch andere Ursachen haben kann.'),
      topic('bewertung', 'Nutzen und Aussagekraft prüfen',
        'Nach einem Training fallen Fehler vergleichbarer Fälle von 40 auf 28 pro Monat. Bei 25 € vermiedenen Kosten je Fehler entspricht die Differenz 300 € pro Monat. Über sechs Monate ergeben sich unter gleichbleibenden Bedingungen 1.800 €. Bei 1.200 € Lern- und Ausfallkosten läge der rechnerische Nettoeffekt bei 600 € bzw. 50 % der Kosten. Der Wert ist nur dann dem Training zurechenbar, wenn Alternativerklärungen ausreichend geprüft sind.',
        'Eine im gleichen Zeitraum eingeführte Systemprüfung kann den Fehleranteil ebenso beeinflussen. Wo zweckmäßig, vergleiche ähnliche Gruppen oder Umstellungszeitpunkte. Bei geringer Fallzahl ergänze Kennzahlen um Beobachtung und Gespräch.'),
    ],
    checks: [
      ['Woran erkennst du die Ebene „Verhalten“?', 'Die Beschäftigten zeigen das gelernte Vorgehen in realistischen Arbeitssituationen. Eine Prüfung unmittelbar im Seminar gehört zunächst zur Ebene Lernen.'],
      ['Das Wissensquiz ist gut, aber die Fehlerquote bleibt gleich. Was prüfst du zuerst?', 'Beobachte, ob das Wissen tatsächlich angewendet wird. Prüfe Zeit, Werkzeuge, Rückmeldungen, andere Fehlerursachen und die Vergleichbarkeit der Fälle. Passe bei Transferhindernissen die Arbeitsbedingungen an.'],
    ],
  },
];

export const developmentGlossary = [
  glossaryTerm('kompetenzluecke', 'Kompetenzlücke', 'Abstand zwischen nachgewiesenem Können und dem Können, das eine Aufgabe erfordert.', 'planung-entwicklung'),
  glossaryTerm('oe', 'Organisationsentwicklung', 'Geplante und beteiligungsorientierte Weiterentwicklung von Strukturen, Prozessen und Zusammenarbeit einer Organisation.', 'oe'),
  glossaryTerm('aktionsforschung', 'Aktionsforschung', 'Zyklischer Ansatz aus Auftragsklärung, Datenerhebung, gemeinsamer Reflexion, Intervention und Auswertung.', 'oe-konzept'),
  glossaryTerm('single-loop', 'Single-Loop-Lernen', 'Korrektur eines Fehlers oder einer Abweichung innerhalb bestehender Ziele und Regeln.', 'lernende-organisation'),
  glossaryTerm('double-loop', 'Double-Loop-Lernen', 'Lernprozess, bei dem Ziele, Regeln oder grundlegende Annahmen überprüft und gegebenenfalls geändert werden.', 'lernende-organisation'),
  glossaryTerm('lerntransfer', 'Lerntransfer', 'Anwendung und Stabilisierung erworbener Kenntnisse und Fähigkeiten in der Arbeitspraxis.', 'pe-umsetzung'),
];
