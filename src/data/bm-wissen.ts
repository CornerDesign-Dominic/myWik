import { glossaryTerm, lesson, term, topic, type ManagementLesson } from './bm-artikel';

export const knowledgeLessons: ManagementLesson[] = [
  {
    slug: 'wissen-it', number: '3', title: 'Wissensmanagement und Informationstechnologie',
    intro: 'Wissensmanagement macht Erfahrungen und Fähigkeiten für andere nutzbar. Informationstechnologie erfasst, verarbeitet und verteilt Daten und unterstützt damit den Wissensprozess.',
    sections: [
      topic('zusammenhang', 'Wissen, Arbeit und Technik verbinden',
        'Ein Betrieb kann eine Suche über alle Arbeitsanweisungen einrichten. Die Technik beschleunigt das Auffinden. Ob die Treffer im Arbeitsalltag helfen, hängt davon ab, ob Inhalte aktuell, geprüft, verständlich und am richtigen Entscheidungspunkt verfügbar sind.',
        'Gehe vom betrieblichen Problem aus. Bestimme die benötigte Information, das benötigte Erfahrungswissen und die betroffenen Rollen. Wähle dann Transferformate und passende Systeme. Prüfe am realen Prozess, ob Entscheidungen schneller oder zuverlässiger werden.'),
      topic('weiterlernen', 'Teilgebiete', [lesson('wissensmanagement', 'Wissensmanagement'), ' · ', lesson('it', 'Informationstechnologie')]),
    ],
    checks: [
      ['Was trägt IT zum Wissensmanagement bei?', 'Sie unterstützt Erfassung, Strukturierung, Suche, Austausch und Auswertung. Fachliche Prüfung, Anwendung und kontinuierliche Pflege brauchen verantwortliche Menschen und Prozesse.'],
      ['Ein Wiki enthält 800 Seiten, doch Rückfragen nehmen zu. Welche Diagnose eignet sich?', 'Prüfe anhand konkreter Aufgaben, was auffindbar und aktuell ist, welche Entscheidungen Erfahrungswissen verlangen und ob Verantwortliche und Gültigkeitsbereiche klar sind.'],
    ],
  },
  {
    slug: 'wissensmanagement', number: '3.1', title: 'Wissensmanagement als betrieblicher Prozess',
    intro: 'Wissensmanagement identifiziert geschäftskritisches Wissen, entwickelt oder beschafft es, macht es verfügbar und überprüft seinen Nutzen.',
    sections: [
      topic('kreislauf', 'Daten, Information und Wissen unterscheiden',
        ['Daten sind erfasste Zeichen oder Messwerte. Information entsteht durch Kontext und Bedeutung. Wissen verbindet Information mit Erfahrung und erlaubt begründetes Handeln. ', term('wissensmanagement', 'Wissensmanagement'), ' ordnet Wissen den Aufgaben zu, für die es gebraucht wird, und regelt seinen Lebenszyklus.'],
        'Die Zahl 35 ist ein Datum. „35 Minuten Verzögerung bei der Abholung“ ist Information. Aus Strecke, Verkehr, Kundenfenster und Eskalationsregel zu entscheiden, ob eine Ersatzbeförderung nötig ist, erfordert Wissen.'),
      topic('prozess', 'Kritische Bestände priorisieren',
        'Identifiziere Wissenslücken und Wissensrisiken, beschaffe oder entwickle Inhalte, verteile und nutze sie, sichere Bewahrung und bewerte Wirkung. Gute Prioritätsmerkmale sind Schadensfolge, Häufigkeit, Abhängigkeit von Einzelpersonen und Wiederbeschaffbarkeit.',
        'In einer Werkstatt ist ein seltenes, aber sicherheitsrelevantes Prüfverfahren höher zu priorisieren als häufige Routineauskünfte. Verantwortliche prüfen die Anweisung nach Verfahrensänderungen und testen, ob eine Vertretung den Fall korrekt bearbeiten kann.'),
    ],
    checks: [
      ['Was unterscheidet Wissen von einer bloßen Information?', 'Wissen ordnet Informationen mit Erfahrung, Regeln oder Verständnis so ein, dass damit eine Aufgabe gelöst oder eine Entscheidung begründet werden kann.'],
      ['Ein Team möchte alle seine Dokumente migrieren. Mit welchem Bestand beginnst du?', 'Beginne mit Wissen, dessen Verlust oder Fehlanwendung hohe Auswirkungen hat und das schwer zu ersetzen ist. Kläre Gültigkeit und Verantwortliche und teste die praktische Nutzbarkeit.'],
    ],
  },
  {
    slug: 'wissenstransfer', number: '3.1.1', title: 'Bedeutung für den Wissenstransfer',
    intro: 'Wissenstransfer gelingt, wenn Empfänger Informationen und Erfahrungen verstehen und in ihrem eigenen Arbeitskontext anwenden können.',
    sections: [
      topic('transfer', 'Quelle, Empfänger und Kontext verbinden',
        ['Beim ', term('wissenstransfer', 'Wissenstransfer'), ' übermittelt eine Person oder Gruppe Wissen, die andere Seite erschließt dessen Bedeutung und erprobt die Anwendung. Transferhindernisse sind fehlendes Vorwissen, Zeitdruck, unterschiedliche Sprache, unklare Verantwortlichkeit und geringe Bereitschaft zum Teilen.'],
        'Standardwissen lässt sich für viele Empfänger dokumentieren. Erfahrungswissen wird oft in gemeinsamen Fällen, Beobachtung und Rückfragen erlernt. Kombiniere eine Checkliste mit Tandemarbeit, wenn eine Entscheidung gleichzeitig Regeln und Urteilsvermögen erfordert.'),
      topic('nachweis', 'Wirksamkeit in der Anwendung messen',
        'Ein Betrieb testet seine Übergabe für Grenzfälle. Die Vertretung bearbeitet drei Varianten, erläutert die Entscheidung und markiert Grenzen der Vorlage. Beurteile Treffer bei der Suche, korrekte Anwendung, Ausnahmen und Entscheidungsdauer. Aufrufzahlen allein zeigen Reichweite an.',
        'Bei einer Softwaremigration kann ein Walkthrough helfen, seltene Fehlerbilder zu erkennen. In beiden Fällen muss der Empfänger zeigen können, wie er eine neue Situation einschätzt und wo er Rückfragen adressiert.'),
    ],
    checks: [
      ['Woran erkennst du erfolgreichen Wissenstransfer?', 'Empfänger finden, verstehen und wenden das Wissen situationsgerecht an. Bei abweichenden Fällen erkennen sie Grenzen und wissen, wen sie einbeziehen müssen.'],
      ['Eine Übergabemappe wurde gelesen, aber Vertretungen entscheiden bei Ausnahmen falsch. Wie passt du den Transfer an?', 'Bearbeite Beispiele im Tandem, mache Entscheidungskriterien laut und ergänze kontraintuitive Fälle und Eskalationsgrenzen. Lass Vertretungen später einen unbekannten Fall begründen.'],
    ],
  },
  {
    slug: 'wissenstraeger', number: '3.1.2', title: 'Individuelles und strukturelles Wissen',
    intro: 'Individuelles Wissen ist an Personen gebunden. Strukturelles Wissen ist in der Organisation verankert, etwa in Routinen, gemeinsamen Standards, Entscheidungsregeln oder technischen Systemen.',
    sections: [
      topic('unterscheidung', 'Wissensträger und Ausfallrisiko bestimmen',
        [term('strukturelles-wissen', 'Strukturelles Wissen'), ' bleibt prinzipiell nutzbar, wenn einzelne Personen wechseln. Dazu müssen Routinen bekannt, Regeln gepflegt und Systeme zugänglich sein. Individuelles Wissen kann ausdrücklich formulierbar oder unausgesprochen sein. Die Unterscheidung nach Wissensträger ist eine andere Dimension als die nach ausdrücklicher Formulierbarkeit.'],
        'Eine Disponentin kann die Gründe für Sonderfreigaben erklären. Solange allein sie diese Gründe kennt, ist es individuelles Wissen. Eine gemeinsame Richtlinie und eingeübte Gegenprüfung machen einen Teil davon strukturell verfügbar. Eine Teamroutine kann dennoch von stillschweigenden Erwartungen geprägt sein.'),
      topic('umsetzung', 'Abhängigkeit von Einzelpersonen abbauen',
        'Erstelle eine Wissenslandkarte mit Aufgabe, Wissensträger, Vertretung und Dokumentation. Sichere kritische Aufgaben über Tandems, Rollen und Prüfzyklen. Bei einem Einkauf kann ein Lieferantennetz als Kontaktverzeichnis dokumentiert werden. Vertrauen und Erfahrung im Verhandeln brauchen zusätzliche gemeinsame Arbeit.',
        'Teste Vertretungsfähigkeit bei Urlaub oder im geschützten Probelauf. Prüfe, ob eine Person mit plausiblen Vorkenntnissen die Arbeitsunterlagen findet, versteht und einen Grenzfall richtig eskaliert.'),
    ],
    checks: [
      ['Kann individuelles Wissen explizit sein?', 'Ja. Eine Person kann eine Regel aussprechen oder niederschreiben, obwohl sie bislang allein darüber verfügt. „Individuell“ beschreibt den Träger, „explizit“ die Form.'],
      ['Eine Software enthält automatisierte Entscheidungen, die niemand mehr erklären kann. Welches Wissensrisiko besteht?', 'Entscheidungsregeln sind technisch verankert, ihre fachlichen Annahmen und Ausnahmen sind aber schlecht zugänglich. Dokumentiere Gründe, Verantwortliche und Testfälle und überprüfe die Regeln gemeinsam.'],
    ],
  },
  {
    slug: 'wissensformen', number: '3.1.3', title: 'Explizites und implizites Wissen',
    intro: 'Explizites Wissen lässt sich sprachlich, bildlich oder formal ausdrücken. Implizites Wissen zeigt sich im Handeln und ist nur teilweise oder mit Aufwand verbalisierbar.',
    sections: [
      topic('seci', 'Wissen durch vier Formen weiterentwickeln',
        ['Nonakas ', term('seci', 'SECI-Modell'), ' beschreibt Sozialisation von implizit zu implizit, Externalisierung von implizit zu explizit, Kombination von explizit zu explizit und Internalisierung von explizit zu implizit. Die Formen unterstützen einander. Das Modell hilft, Transferformate zu kombinieren.'],
        'Ein neuer Mitarbeiter beobachtet, wie eine Disponentin Warnzeichen erkennt. Sie benennt ihre Überlegungen, daraus entsteht eine Fallnotiz. Das Team verbindet mehrere Notizen zur Entscheidungsübersicht. Durch wiederholtes Anwenden entwickelt der Mitarbeiter eigenes Urteilsvermögen.'),
      topic('grenzen', 'Erfahrung dort üben, wo Kodifizierung endet',
        'Eine Regel kann objektive Prüfpunkte für einen Ultraschallbefund festhalten. Mustererkennung wird zusätzlich über Vergleichsbilder, Rückmeldung und betreute Praxis aufgebaut. Explizite Regeln entlasten Gedächtnis und verbessern Konsistenz, haben aber Grenzen bei neuartigen oder mehrdeutigen Fällen.',
        'Dokumentiere wichtige Abzweigungen, Grenzen und die zuständige Rolle. Ergänze Demonstrationen oder Übungsfälle, wenn die Ursache einer guten Entscheidung schwer allein textlich vermittelbar ist.'),
    ],
    checks: [
      ['Welcher SECI-Schritt liegt vor, wenn jemand seine bisher nur im Handeln erkennbare Prüfroutine formuliert?', 'Externalisierung. Implizite Anteile werden soweit möglich in eine ausdrückliche Darstellung überführt.'],
      ['Ein Team hat zehn geprüfte Fallnotizen und will daraus einen Standard entwickeln und anwenden. Welche Schritte folgen?', 'Die Verbindung der Fallnotizen zu einem gemeinsamen Standard ist Kombination. Das Einüben bis zur weitgehend selbstständigen Anwendung ist Internalisierung.'],
    ],
  },
  {
    slug: 'wissenserfassung', number: '3.1.4', title: 'Wissen erfassen, prüfen und pflegen',
    intro: 'Wissenserfassung macht relevantes Erfahrungs- und Prozesswissen sichtbar. Auswahl, Struktur, Verifikation und Pflege bestimmen den späteren Nutzen.',
    sections: [
      topic('erfassung', 'Die passende Erhebungsmethode wählen',
        'Nutze Interviews für Gründe und Erfahrungsberichte, Beobachtung und lautes Denken für Entscheidungen im Alltag, Prozessanalyse für Schnittstellen und Übergabeworkshops für gemeinsames Lernen. Dokumentiere häufige Fälle und begründe Ausnahmen. Kennzeichne Quellen, Gültigkeit und offene Annahmen.',
        'Beim Austritt einer erfahrenen Reklamationsbearbeiterin werden kritische Falltypen priorisiert. Kolleginnen beobachten reale Arbeit, prüfen Beispielakten und validieren Musterlösungen in einem Tandem. Artikel erhalten Titel, Prozessschritt, Autor, Prüfer, Versionsstand und Überprüfungstermin.'),
      topic('pflege', 'Qualität, Zugriff und Geltung absichern',
        'Wissenslandkarten zeigen, wo Wissen liegt. Taxonomien und Schlagwörter ordnen Inhalte. Ein fachlicher Verantwortlicher überprüft neue und geänderte Inhalte. Veraltete Anleitungen werden ersetzt oder mit erkennbarer Gültigkeit archiviert. Berechtigungen richten sich nach Aufgabe und Schutzbedarf.',
        'Wenn eine FAQ häufig gefunden wird, aber falsche Freigaben begünstigt, untersuche Suchbegriffe und Grenzfälle. Trenne eine verbindliche Regel von Beispielen und setze eine regelmäßige oder ereignisbezogene Prüfung an.'),
    ],
    checks: [
      ['Warum sollte ein Wissensartikel einen fachlichen Verantwortlichen haben?', 'Damit Änderungen, Fehlerhinweise, Gültigkeit und Überprüfung verbindlich bearbeitet werden.'],
      ['Ein Experte beschreibt den Standard, in der Praxis handelt er häufig anders. Welche ergänzende Methode passt?', 'Beobachte typische und abweichende Fälle mit geeigneter Zustimmung, frage Gründe und Warnzeichen ab und überprüfe gemeinsam, welche Ausnahmen als Regel, Beispiel oder Eskalation dokumentiert werden.'],
    ],
  },
  {
    slug: 'wissensnetzwerke', number: '3.1.5', title: 'Wissensnetzwerke bilden und nutzen',
    intro: 'Wissensnetzwerke verbinden Personen und Gruppen mit ergänzender Erfahrung. Sie verringern Suchkosten und unterstützen Lernen über organisatorische Grenzen hinweg.',
    sections: [
      topic('netzwerke', 'Fachgemeinschaft und andere Netzwerke unterscheiden',
        ['Eine ', term('community-of-practice', 'Community of Practice'), ' verbindet gemeinsames Fachgebiet, regelmäßige Gemeinschaft und geteilte Praxis. Ein Expertenverzeichnis hilft beim Finden einzelner Ansprechpartner. Projektübergreifende Lernrunden und externe Verbände können zusätzliche Perspektiven liefern.'],
        'Ein Unternehmen vernetzt Standortleitungen zum Thema Reklamation. Eine Moderation sammelt wiederkehrende Fälle. Die Gruppe tauscht Erfahrungen aus, legt einen geprüften Musterfall ab und benennt Verantwortliche für die Pflege. Teilnahme braucht Arbeitszeit und gegenseitigen Nutzen.'),
      topic('bewertung', 'Netzwerkqualität beurteilen',
        'Miss, ob neue Ansprechpartner gefunden werden, ob Antworten geprüft sind und ob erarbeitete Verfahren in der Praxis eingesetzt werden. Ein Netzwerk mit nur einem zentralen Knoten ist bei dessen Ausfall anfällig. Fördere Vertretung und Zugänge für neue Mitglieder.',
        'Externe Netzwerke liefern Vergleichsfälle, deren Rahmenbedingungen abweichen können. Prüfe Vertraulichkeit und fachlichen Nutzen, bevor reale Betriebsdaten geteilt oder Praktiken übernommen werden.'),
    ],
    checks: [
      ['Welche drei Elemente kennzeichnen eine Community of Practice?', 'Ein gemeinsames Fachgebiet, eine Gemeinschaft mit regelmäßiger Interaktion und eine gemeinsam entwickelte Praxis.'],
      ['Nach der Bildung eines Netzwerks laufen alle Anfragen weiterhin über eine Person. Was änderst du?', 'Mach Fachwissen und Vertretungen sichtbar, ermögliche direkte Kontakte und dokumentiere geprüfte Antworten. Prüfe danach, ob Anfragen breiter verteilt und schneller geklärt werden.'],
    ],
  },
  {
    slug: 'it', number: '3.2', title: 'Informationstechnologie im Betrieb',
    intro: 'Informationstechnologie umfasst Systeme und Infrastruktur zur Erfassung, Verarbeitung, Speicherung und Übertragung von Informationen. Im Betrieb verknüpft sie operative Prozesse und Managemententscheidungen.',
    sections: [
      topic('architektur', 'Systeme entlang des Informationsflusses zuordnen',
        'Ein operatives System erfasst Vorgänge wie Auftrag oder Wareneingang. Eine Schnittstelle übergibt Daten. Ein Analysesystem wertet sie aus. Ein Dokumenten- oder Wissenssystem stellt gültige Regeln bereit. Gemeinsame Identifikatoren und Definitionen machen Ergebnisse zwischen Systemen nachvollziehbar.',
        'In der Disposition entsteht ein Abholstatus in einem Transportmanagementsystem und wird im Bericht für den Kunden angezeigt. Vor der Automatisierung müssen Statuszeitpunkt, Quelle, Übertragungszeit, Fehlerbehandlung und fachliche Zuständigkeit geklärt sein.'),
      topic('weiterlernen', 'Auswahl und Informationsgrundlage',
        [lesson('it-einsatz', 'Ziele und Einsatzmöglichkeiten'), ' · ', lesson('it-quellen', 'Informationsquellen und Datenqualität')]),
    ],
    checks: [
      ['Warum sind gemeinsame Datenbegriffe für integrierte IT wichtig?', 'Wenn Systeme denselben Status, Zeitbezug und Identifikator unterschiedlich verstehen, entstehen widersprüchliche Berichte und falsche Entscheidungen.'],
      ['Zwei Systeme zeigen unterschiedliche Abholzeiten. Was prüfst du zuerst?', 'Kläre, ob geplant, tatsächlich oder übermittelt gemeint ist. Prüfe Quellsystem, Zeitstempel, Zeitzonen, Identifikatoren und Übertragungsverzögerung am selben Auftrag.'],
    ],
  },
  {
    slug: 'it-einsatz', number: '3.2.1', title: 'Ziele und Einsatzmöglichkeiten der Informationstechnologie',
    intro: 'IT kann Routinetätigkeiten automatisieren, Teams verbinden, Information sichern und Entscheidungen unterstützen. Die Auswahl beginnt mit Prozess, Risiken und benötigter Leistung.',
    sections: [
      topic('einsatz', 'Systemtyp aus der Aufgabe ableiten',
        ['Ein ', term('erp', 'ERP-System'), ' plant und verbindet Ressourcen und Geschäftsvorgänge. Ein CRM unterstützt Kundenbeziehungen. Ein DMS verwaltet Dokumente und Versionen. Workflow-Systeme steuern Aufgaben und Freigaben. ', term('business-intelligence', 'Business Intelligence'), ' führt Daten für Analyse und Berichte zusammen. Fachsysteme wie TMS und WMS lösen fachspezifische Aufgaben.'],
        'Für eine fehlende Statusmeldung kann ein Workflow zuständige Personen informieren. Ein BI-Bericht verdichtet Häufigkeiten und Ursachen. Ein DMS stellt die gültige Arbeitsanweisung bereit. Entscheide, welches System für welchen Datensatz die führende Quelle ist.'),
      topic('auswahl', 'Nutzen, Kosten und Schutzbedarf vergleichen',
        'Prüfe Prozessintegration, Datenqualität, Bedienbarkeit, Gesamtbetriebskosten, Exportfähigkeit und Anbieterabhängigkeit. Gesamtbetriebskosten umfassen beispielsweise Lizenz, Migration, Schulung, Betrieb und Wechsel. Bei Diensten mit kritischen Fristen müssen Verfügbarkeit, Ersatzprozess und Wiederherstellung erprobt werden.',
        'Informationssicherheit berücksichtigt Vertraulichkeit, Integrität und Verfügbarkeit. Zugriff nach Aufgabe, Protokollierung und gesicherte Wiederherstellung unterstützen diese Ziele. Bei KI-gestützter Suche sind Fundstellen, fachliche Prüfung, Zugriffsgrenzen und Umgang mit unzuverlässigen Antworten besonders wichtig.'),
    ],
    checks: [
      ['Wann kommt BI und wann ein Workflow-System zum Einsatz?', 'BI wertet Daten aus und stellt Entwicklungen dar. Ein Workflow-System weist Prozessschritte zu, überwacht Fristen und leitet Fälle über Regeln weiter.'],
      ['Ein neues Tool spart monatlich 30 Stunden. Welche zusätzlichen Fragen gehören in die Entscheidung?', 'Prüfe Eingabe- und Integrationsaufwand, Gesamtkosten, Mindestanforderungen an Verfügbarkeit und Informationsschutz, Ausnahmen, Akzeptanz und messbare Änderungen der Fehlerquote.'],
    ],
  },
  {
    slug: 'it-quellen', number: '3.2.2', title: 'Informationsquellen und Datenqualität',
    intro: 'Betriebe nutzen interne und externe Informationsquellen. Die Eignung richtet sich nach Relevanz, Herkunft, Erhebungsmethode, Aktualität, Vergleichbarkeit und rechtmäßigem Zugriff.',
    sections: [
      topic('quellen', 'Quellentyp und Messmethode unterscheiden',
        'Interne Quellen sind Stammdaten, Transaktionen, Berichte, Tickets, Dokumente und Erfahrungen von Fachleuten. Externe Quellen sind amtliche Statistik, Fachpublikationen, Verbände, Marktstudien oder Partnerdaten. Primärdaten werden für den konkreten Untersuchungszweck erhoben, Sekundärdaten liegen bereits für einen anderen oder früheren Zweck vor.',
        'Für regionale Nachfrage kann ein Betrieb amtliche Branchenzahlen mit eigenen Angebotsanfragen kombinieren. Eine Marktstudie mit anderer Regionsgrenze, anderer Bezugsgröße oder unklarer Erhebung taugt nur eingeschränkt zum direkten Vergleich.'),
      topic('qualitaet', 'Datenqualität und Schutzanforderungen überprüfen',
        ['Prüfe bei der ', term('datenqualitaet', 'Datenqualität'), ' Vollständigkeit, Richtigkeit, Aktualität, Konsistenz und Eindeutigkeit. Dokumentiere Herkunft und Verarbeitung. Analysiere Stichproben gegen Originalvorgänge, kennzeichne fehlende Werte und hinterfrage Ausreißer vor einer Korrektur.'],
        'Bei personenbezogenen Daten sind nach Art. 5 DSGVO unter anderem Zweckbindung, Datenminimierung, Richtigkeit und Speicherbegrenzung zu beachten. Prüfe zusätzlich die Rechtsgrundlage nach Art. 6 DSGVO. Für eine monatliche Servicequote können aggregierte Werte ausreichen. Rechtsstand dieser Lerneinheit: 18. November 2026.'),
    ],
    checks: [
      ['Wann handelt es sich um Primärdaten?', 'Wenn die Daten für die konkrete Untersuchung neu erhoben werden, etwa eine eigene Befragung zu einer geplanten Leistung. „Primär“ bedeutet nicht automatisch höhere Qualität.'],
      ['In 15 % der Aufträge fehlt der Zeitstempel. Wie behandelst du sie in der Termintreuemessung?', 'Melde den Anteil und die Ausschluss- oder Zuordnungsregel transparent. Prüfe Häufungen nach Partner oder Auftragstyp und rechne bei Bedarf obere und untere Grenzen. Fehlende Werte dürfen nicht ungeprüft als pünktlich gelten.'],
    ],
  },
];

export const knowledgeGlossary = [
  glossaryTerm('wissensmanagement', 'Wissensmanagement', 'Systematische Identifikation, Entwicklung, Verteilung, Nutzung, Bewahrung und Bewertung von Wissen zur Unterstützung betrieblicher Aufgaben.', 'wissensmanagement'),
  glossaryTerm('wissenstransfer', 'Wissenstransfer', 'Weitergabe und Aneignung von Wissen, sodass Empfänger es im eigenen Handlungskontext einsetzen können.', 'wissenstransfer'),
  glossaryTerm('strukturelles-wissen', 'Strukturelles Wissen', 'In Routinen, Regeln, Dokumenten oder Systemen verankertes Wissen einer Organisation.', 'wissenstraeger'),
  glossaryTerm('seci', 'SECI-Modell', 'Nonakas Modell der Wissensentwicklung durch Sozialisation, Externalisierung, Kombination und Internalisierung.', 'wissensformen'),
  glossaryTerm('community-of-practice', 'Community of Practice', 'Fachgemeinschaft, die durch regelmäßigen Austausch eine gemeinsame Praxis entwickelt und weitergibt.', 'wissensnetzwerke'),
  glossaryTerm('erp', 'ERP-System', 'Integriertes Informationssystem zur Planung und Verarbeitung betrieblicher Ressourcen und Geschäftsvorgänge.', 'it-einsatz'),
  glossaryTerm('business-intelligence', 'Business Intelligence', 'Verfahren und Systeme zum Zusammenführen, Auswerten und Bereitstellen von Daten für betriebliche Entscheidungen.', 'it-einsatz'),
  glossaryTerm('datenqualitaet', 'Datenqualität', 'Eignung von Daten für ihren Zweck, beurteilt etwa nach Vollständigkeit, Richtigkeit, Aktualität, Konsistenz und Eindeutigkeit.', 'it-quellen'),
];
