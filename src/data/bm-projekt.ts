import { glossaryTerm, lesson, related, term, topic, type ManagementLesson } from './bm-artikel';

export const projectLessons: ManagementLesson[] = [
  {
    slug: 'projekt', number: '4.3', title: 'Projektmanagement',
    intro: 'Projektmanagement plant, organisiert, steuert und dokumentiert ein abgegrenztes, zeitlich begrenztes Vorhaben. Ein Projekt liefert ein vereinbartes Ergebnis, das üblicherweise mehrere Beteiligte und begrenzte Ressourcen erfordert.',
    sections: [
      topic('lebenszyklus', 'Projekt und Betrieb unterscheiden',
        ['Ein ', term('projektauftrag', 'Projektauftrag'), ' beschreibt Anlass, Ziele, Ergebnisgrenzen, Ressourcenrahmen, Befugnisse und Abnahme. Projektinitiierung klärt und beauftragt das Vorhaben, Planung konkretisiert es, Umsetzung und Steuerung liefern Ergebnisse, der Abschluss sichert Abnahme und Übergabe in den Betrieb.'],
        'Ein Dispositionssystem einzuführen, ist ein Projekt. Den täglichen Betrieb nach der Übergabe verantwortet die Linie. Der Projektplan schließt die Einführung, Schulung, Abnahme und Übergabe ein. Eine dauerhafte Supportaufgabe gehört in ein Betriebsmodell.'),
      topic('vorgehensmodell', 'Planorientiertes, agiles und hybrides Vorgehen wählen',
        'Planorientiertes Vorgehen setzt früh einen Plan und klare Freigabepunkte. Iteratives Vorgehen wiederholt Entwicklung und Rückmeldung. Inkrementelles Vorgehen liefert nutzbare Teile schrittweise. Agile Methoden kombinieren kurze Lernzyklen häufig mit priorisierten Anforderungen und regelmäßiger Nutzerbeteiligung.',
        'Eine behördlich fest terminierte Umstellung kann feste Meilensteine und kontrollierte Freigaben brauchen. Die Bedienoberfläche kann gleichzeitig iterativ erprobt werden. Begründe die Methode anhand Unsicherheit, Abhängigkeiten, Regulierung und verfügbarer Rückmeldung.'),
      topic('teilthemen', 'Projektaufgaben vertiefen', [lesson('projektorganisation', 'Organisation'), ' · ', lesson('projektplanung', 'Planung'), ' · ', lesson('projektsteuerung', 'Steuerung'), ' · ', lesson('projektdokumentation', 'Dokumentation')]),
    ],
    checks: [
      ['Welche typischen Abgrenzungen gehören in einen Projektauftrag?', 'Ziele und Lieferergebnisse, ausgeschlossene Aufgaben, Rahmen für Termine und Kosten, Verantwortliche und Abnahmekriterien.'],
      ['Ein Lager will einen befristeten Scan-Pilot starten und danach die Geräte täglich betreuen. Wie legst du die Grenze fest?', 'Der Pilot umfasst Auswahl, Einführung, Tests, Bewertung und Übergabe. Dauerhafte Betreuung, Betrieb und Wartung erhalten nach der Abnahme eigene Zuständigkeiten in der Linie.'],
    ],
  },
  {
    slug: 'projektorganisation', number: '4.3.1', title: 'Projektorganisation',
    intro: 'Projektorganisation regelt, wer Entscheidungen trifft, Aufgaben übernimmt und Ressourcen bereitstellt. Sie balanciert Projektpriorität und Verantwortung der Fachbereiche.',
    sections: [
      topic('formen', 'Weisungs- und Ressourcenbefugnisse zuordnen',
        'In der Stabs- oder Einflussprojektorganisation koordiniert die Projektleitung, während Weisung und Ressourcen bei der Linie liegen. In der Matrix teilen sich Projekt und Linie Kompetenzen. In der reinen Projektorganisation sind Mitarbeitende und Arbeitsmittel weitgehend der Projektstruktur zugeordnet. Projektgröße, Priorität und Linienabhängigkeit bestimmen die Eignung.',
        'Auftraggebende sichern Mittel und entscheiden über wesentliche Änderungen. Die Projektleitung verantwortet Planung und Steuerung. Das Team liefert Arbeitspakete. Ein Lenkungskreis kann Konflikte über Bereichsgrenzen entscheiden. Linie oder Fachverantwortliche übernehmen Nutzung und Betrieb.'),
      topic('anwendung', 'Verantwortung an Schnittstellen klären',
        ['Eine ', term('raci', 'RACI-Matrix'), ' ordnet je Aufgabe die Ausführung (Responsible), Ergebnisverantwortung (Accountable), Beratung (Consulted) und Information (Informed) zu. Lege möglichst eine Stelle mit Ergebnisverantwortung fest und halte bei geteilten Befugnissen den Eskalationsweg fest.'],
        'Für einen TMS-Pilot führt IT den Datenimport aus, die Fachleitung verantwortet die Freigabe, Disposition und Datenschutzfunktion werden bedarfsgerecht einbezogen und der Lenkungskreis wird informiert. Fehlt IT-Kapazität, entscheidet gemäß Auftrag die dafür zuständige Instanz.',
        'Bei einem kleinen Umbau kann koordinierende Projektleitung ausreichen. Wenn mehrere Standorte und eine kurzfristige Frist auf dieselbe Ressource zugreifen, helfen verbindliche Kapazitätszusagen und ein klarer Eskalationszeitpunkt.'),
    ],
    checks: [
      ['Welche Konfliktquelle ist für die Matrixorganisation typisch?', 'Linie und Projekt beanspruchen dieselben Personen oder treffen widersprüchliche Prioritätsentscheidungen. Zuständigkeiten, Kapazität und Eskalation müssen vereinbart werden.'],
      ['Die Projektleitung gleicht täglich Termine ab, darf aber keine Fachressourcen anweisen. Welche Form liegt nahe, und was sollte im Auftrag geregelt sein?', 'Die Einfluss- oder Stabsorganisation liegt nahe. Der Auftrag sollte Ressourcenzusagen aus der Linie, Entscheidungsfristen und den Eskalationsweg verbindlich festhalten.'],
    ],
  },
  {
    slug: 'projektplanung', number: '4.3.2', title: 'Projektplanung und Arbeitspakete',
    intro: 'Projektplanung übersetzt den Auftrag in Liefergegenstände, Arbeitspakete, Abläufe und Ressourcen. Der vereinbarte Ausgangsplan dient später zur Steuerung.',
    sections: [
      topic('struktur', 'Ergebnisse in prüfbare Pakete gliedern',
        ['Ein ', term('projektstrukturplan', 'Projektstrukturplan'), ' zerlegt den Projektumfang vollständig in strukturierte Teilbereiche und handhabbare Arbeitspakete. Ein Paket erhält Ergebnis, zuständige Rolle, Abnahmekriterium, Aufwand und Schnittstellen. Ein Meilenstein markiert ein Ereignis wie eine Freigabe und hat üblicherweise keine Dauer.'],
        'Für eine Systemeinführung lauten Teilbereiche Daten, Integration, Schulung und Einführung. Das Paket „Testmigration“ ist abgenommen, wenn definierte Beispieldaten vollständig übernommen und geprüfte Abweichungen protokolliert sind. Der Meilenstein „Pilot freigegeben“ setzt mehrere Paketergebnisse voraus.'),
      topic('plaene', 'Zeit, Ressourcen, Kosten und Risiken abstimmen',
        'Ordne Vorgänge nach Abhängigkeit und Dauer, prüfe benötigte Kapazitäten und zeige Termine im Balkenplan. Der Netzplan macht Abhängigkeiten und Puffer sichtbar. Aufwand und Dauer sind getrennte Größen: Acht Personenstunden entsprechen bei vier nutzbaren Stunden pro Tag zwei Arbeitstagen, sofern keine Wartezeit anfällt.',
        'Plane Kosten, Qualität, Beschaffung, Kommunikation und Übergabe gemeinsam. Ein Risikoregister dokumentiert Ereignis, geschätzte Wahrscheinlichkeit, Auswirkung, Maßnahmen, Verantwortliche und Auslöser. Beim Import kundenspezifischer Daten kann ein früh angesetzter Test das Risiko senken, während ein Ersatzverfahren die Folgen begrenzt.'),
      topic('netzplan', 'Terminrechnung vertiefen', [lesson('netzplan', 'Kritischer Pfad und Puffer im Netzplan')]),
    ],
    checks: [
      ['Wie unterscheiden sich Arbeitspaket und Meilenstein?', 'Das Arbeitspaket fasst konkrete Arbeit und ihr prüfbares Ergebnis zusammen. Ein Meilenstein markiert einen definierten Zustand oder eine Entscheidung ohne eigene Dauer.'],
      ['Zwei Pakete benötigen dieselbe Fachkraft zur selben Zeit, obwohl keine technische Abhängigkeit besteht. Wie reagierst du?', 'Prüfe Kapazität und Puffer. Verschiebe ein Paket innerhalb seines Puffers, stelle gleichwertige Ressourcen bereit oder passe Termine und Umfang über eine genehmigte Planänderung an.'],
    ],
  },
  {
    slug: 'netzplan', number: '4.3.2.1', title: 'Netzplan, kritischer Pfad und Pufferzeit',
    intro: 'Ein Vorgangsknotennetzplan berechnet früheste und späteste Termine unter gegebenen Abhängigkeiten. Er zeigt, welche Verzögerungen den Endtermin gefährden.',
    sections: [
      topic('annahmen', 'Das Beispiel als Abhängigkeiten lesen',
        ['Im Beispiel gibt es Ende-Anfang-Beziehungen ohne Zeitabstand, Start am Zeitpunkt 0 und verfügbare Ressourcen. Der ', term('kritischer-pfad', 'kritische Pfad'), ' ist hier der längste Abhängigkeitspfad mit Gesamtpuffer null. Es sind mehrere kritische Pfade möglich.'],
        'A dauert 2 Tage und beginnt zuerst. Danach folgen B mit 5 Tagen und C mit 3 Tagen parallel. D dauert 2 Tage und wartet auf B und C. Damit verlaufen die Pfade A → B → D und A → C → D.'),
      topic('vorwaerts', 'Vorwärtsrechnung liefert frühe Termine',
        'Berechne den frühesten Anfang als Maximum der frühesten Enden aller Vorgänger. Frühestes Ende = frühester Anfang + Dauer. A läuft von 0 bis 2. B läuft von 2 bis 7 und C von 2 bis 5. D startet bei max(7, 5) = 7 und endet bei 9. Die kürzeste rechnerische Projektdauer beträgt 9 Tage.'),
      topic('rueckwaerts', 'Rückwärtsrechnung und Puffer',
        ['Setze das späteste Projektende auf 9. Spätestes Ende eines Vorgangs ist das Minimum der spätesten Anfänge seiner Nachfolger. Spätester Anfang = spätestes Ende − Dauer. D läuft spätestens 7–9, B 2–7, C 4–7 und A 0–2. A, B und D haben keinen Gesamtpuffer. C hat 4 − 2 = 2 Tage ', term('gesamtpuffer', 'Gesamtpuffer'), '.'],
        'Freier Puffer = frühester Anfang des frühesten Nachfolgers minus eigenes frühestes Ende. C hat 7 − 5 = 2 Tage freien Puffer. Gesamtpuffer schützt den Endtermin unter den Annahmen, freier Puffer die frühen Termine der direkten Nachfolger. Gemeinsame Puffer dürfen in einer Kette nicht mehrfach verplant werden.',
        'Sind B und C derselben Person zugeteilt, kann die Terminrechnung parallele Arbeit unterstellen, die praktisch unmöglich ist. Plane Ressourcen gesondert. Rechne nach Änderungen neu, da der kritische Pfad wechseln kann.'),
    ],
    checks: [
      ['Wie berechnest du bei Ende-Anfang-Beziehungen ohne Zeitabstand den frühesten Anfang eines Vorgangs mit mehreren Vorgängern?', 'Er entspricht dem größten frühesten Ende der direkten Vorgänger. Erst danach sind alle Vorgänger abgeschlossen.'],
      ['C dauert nun 6 statt 3 Tage, alle übrigen Werte bleiben. Wie verändern sich Projektende und kritischer Pfad?', 'C endet bei 2 + 6 = 8. D kann erst bei 8 beginnen und endet bei 10. Der Pfad A → C → D wird kritisch. B endet bei 7 und hat nun einen Tag Puffer.'],
    ],
  },
  {
    slug: 'projektsteuerung', number: '4.3.3', title: 'Projektsteuerung und Earned Value',
    intro: 'Projektsteuerung vergleicht die aktuelle Lage mit einer genehmigten Planbasis und entscheidet über Korrekturen. Dazu gehören Fortschritt, Termine, Kosten, Qualität, Risiken und Änderungen.',
    sections: [
      topic('regelkreis', 'Status bewerten und Änderungen steuern',
        ['Eine ', term('projektbaseline', 'Projektbaseline'), ' ist der genehmigte Ausgangsstand für den Sollvergleich. Definiere Statusstichtage, Fortschrittsnachweise und Eskalationsschwellen. Prüfe Ursachen und aktualisiere Prognosen. Ein Änderungsantrag dokumentiert Anforderung und Folgen in Umfang, Termin, Kosten, Qualität und Risiko. Genehmigte Änderungen werden versioniert.'],
        'Wenn ein Lieferant zwei Tage später liefert, prüfe Nachfolger, Ressourcen und Puffer. Entscheide etwa über Umplanung, Ersatzbeschaffung oder eine neue Abnahmefrist. Die aktualisierte Vorhersage und die genehmigte Basis sind als unterschiedliche Werte sichtbar.'),
      topic('earned-value', 'Termin- und Kostensicht mit Earned Value verknüpfen',
        ['Beim ', term('earned-value', 'Earned-Value-Management'), ' ist Planned Value (PV) der budgetierte Wert der bis zum Stichtag geplanten Arbeit. Earned Value (EV) ist der budgetierte Wert nachweisbar erledigter Arbeit. Actual Cost (AC) sind die tatsächlich entstandenen Kosten. Alle drei nutzen denselben Umfang und Stichtag.'],
        'Beispiel: PV = 40.000 €, EV = 32.000 € und AC = 36.000 €. Terminabweichung in Budgetwerten SV = EV − PV = −8.000 €, Kostenabweichung CV = EV − AC = −4.000 €. Terminindex SPI = 32.000 ÷ 40.000 = 0,80. Kostenindex CPI = 32.000 ÷ 36.000 ≈ 0,89. Werte unter 1 zeigen Rückstand bzw. ungünstige Kosteneffizienz.'),
      topic('prognose', 'Prognose und Grenzen erläutern',
        'Bei einem Gesamtbudget von 90.000 € und unveränderter Kosteneffizienz ergibt sich eine Schätzung EAC = 90.000 € ÷ (32.000 ÷ 36.000) = 101.250 €. Ist die Abweichung einmalig, kann eine neue Schätzung der Restkosten aussagekräftiger sein. Der SPI gibt keine Verspätung in Tagen an. Dafür wird der Terminplan geprüft.',
        'Bei iterativen Projekten können abgenommene Ergebnisse und die Restmenge gesteuert werden. Prozentwerte auf Basis vager Schätzungen täuschen Präzision vor. Nutze überprüfbare Fertigstellungs- und Qualitätskriterien.'),
    ],
    checks: [
      ['Warum genügen geplante und tatsächliche Kosten nicht zur Projektsteuerung?', 'Ohne Wert der erledigten Arbeit ist unklar, ob geringere Ausgaben Einsparungen oder nur unerledigte Arbeit bedeuten.'],
      ['PV = 60.000 €, EV = 54.000 € und AC = 50.000 €. Wie beurteilst du den Stichtag?', 'SV = −6.000 €, SPI = 0,90. Es ist weniger Arbeit fertig als vorgesehen. CV = +4.000 €, CPI = 1,08. Fertige Arbeit war günstiger als budgetiert. Der Netzplan zeigt, ob der Endtermin gefährdet ist.'],
    ],
  },
  {
    slug: 'projektdokumentation', number: '4.3.4', title: 'Projektdokumentation, Abnahme und Übergabe',
    intro: 'Projektdokumentation macht Auftrag, Fortschritt, Entscheidungen, Ergebnisse und Übergabe nachvollziehbar. Art und Umfang richten sich nach Nutzung, Vertrag und Risiko.',
    sections: [
      topic('unterlagen', 'Steuerungs- und Ergebnisdokumente unterscheiden',
        'Zum Steuerungsstand gehören Projektauftrag, Baseline, Risikoregister, Statusberichte, Entscheidungsprotokoll und Änderungsverlauf. Ergebnisdokumente enthalten Tests, Nachweise, Abnahme, Anleitungen und Übergabeprotokoll. Halte Version, Datum, Eigentümer, Freigabestatus und Zugriff nachvollziehbar.',
        'Im Pilot werden Abweichungen mit Auswirkung, Maßnahme und Entscheidung dokumentiert. Das Logbuch zeigt, warum eine Schnittstelle vereinfacht wurde. Die Bedienungsanleitung zeigt der Linie den verbindlichen Ablauf.'),
      topic('abschluss', 'Abnahme und Nutzung sichern',
        ['Bei der ', term('projektabnahme', 'Projektabnahme'), ' prüft die zuständige Stelle Liefergegenstände an vereinbarten Kriterien und dokumentiert Ergebnis, Restpunkte und Fristen. Übergebe Betrieb, Ansprechpartner, Zuständigkeit, Zugriffe und offene Risiken. Die Nutzung und der Nutzen können später überprüft werden.'],
        ['Ein Migrationsprojekt übergibt geprüfte Daten, Rückfallverfahren, Supportwege und Schulungsmaterial. Ein Abschlussbericht vergleicht Soll und Ist und hält übertragbare Erfahrungen fest. In einem Bauprojekt steht zusätzlich die nachvollziehbare technische Bestandsdokumentation im Vordergrund. Vertiefung: ', related('fz-projektabschluss', 'Projektabschluss durch die Projektleitung'), '.']),
    ],
    checks: [
      ['Wozu dient ein Entscheidungsprotokoll?', 'Es hält Entscheidung, Gründe, Verantwortliche, Zeitpunkt und Folgen fest, sodass Änderungen und Zusagen später nachvollziehbar sind.'],
      ['Ein Pilot wurde fachlich freigegeben, der Support hat aber keine Anleitung für Störfälle. Was fehlt?', 'Die Übergabe in den Betrieb ist unvollständig. Benenne Betriebsverantwortung und Support, übergebe ein nutzbares Störfallverfahren und dokumentiere offene Punkte mit Frist und Verantwortlichem.'],
    ],
  },
];

export const projectGlossary = [
  glossaryTerm('projektauftrag', 'Projektauftrag', 'Formalisierung des Projekts mit Anlass, Zielen, Umfang, Befugnissen, Ressourcenrahmen und Kriterien für die Abnahme.', 'projekt'),
  glossaryTerm('raci', 'RACI-Matrix', 'Verantwortungsmatrix für Ausführung, Ergebnisverantwortung, Beratung und Information je Aufgabe.', 'projektorganisation'),
  glossaryTerm('projektstrukturplan', 'Projektstrukturplan', 'Hierarchische Zerlegung des gesamten Projektumfangs in Teilbereiche und handhabbare Arbeitspakete.', 'projektplanung'),
  glossaryTerm('kritischer-pfad', 'Kritischer Pfad', 'Terminbestimmende Folge abhängiger Vorgänge. Im Standardnetzplan mit spätestem Ende gleich frühestem Projektende haben ihre Vorgänge keinen Gesamtpuffer.', 'netzplan'),
  glossaryTerm('gesamtpuffer', 'Gesamtpuffer', 'Zeitspanne, um die sich ein Vorgang unter den gegebenen Planannahmen verschieben kann, ohne das geplante Ende zu verschieben.', 'netzplan'),
  glossaryTerm('projektbaseline', 'Projektbaseline', 'Genehmigter Referenzstand für Termin, Umfang oder Kosten, an dem die Projektleistung gemessen wird.', 'projektsteuerung'),
  glossaryTerm('earned-value', 'Earned-Value-Management', 'Methode zur Projektbewertung durch Vergleich von geplantem Wert, Wert erledigter Arbeit und tatsächlichen Kosten.', 'projektsteuerung'),
  glossaryTerm('projektabnahme', 'Projektabnahme', 'Dokumentierte Beurteilung der Lieferergebnisse an vereinbarten Anforderungen durch eine zuständige Stelle.', 'projektdokumentation'),
];
