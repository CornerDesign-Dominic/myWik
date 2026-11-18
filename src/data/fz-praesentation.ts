import type { Article, ArticleSection, Chapter, GlossaryTerm, RichText } from '../types';

const subjectId = 'fuehrung-zusammenarbeit';
const updatedAt = Date.UTC(2026, 10, 18);
const id = (slug: string) => `fz-${slug}`;
const text = (value: string): RichText => ({ text: value });
const term = (slug: string, label: string): RichText => ({ text: label, termId: id(`term-${slug}`) });
const link = (slug: string, label: string): RichText => ({ text: label, articleId: id(slug) });
type Paragraph = string | RichText[];
const section = (id: string, title: string, ...paragraphs: Paragraph[]): ArticleSection => ({
  id, title, paragraphs: paragraphs.map(p => typeof p === 'string' ? [text(p)] : p),
});
const check = (id: string, title: string, question: string, answer: string): ArticleSection => ({
  ...section(id, title, question),
  hint: { label: 'Selbstkontrolle', title: 'Musterantwort', content: answer },
});

interface Unit {
  slug: string;
  parent?: string;
  number: string;
  title: string;
  intro: string;
  sections: ArticleSection[];
}

const units: Unit[] = [
  {
    slug: 'praesentation', number: '7', title: 'Präsentationstechniken',
    intro: 'Eine Präsentation bereitet ausgewählte Inhalte so auf, dass eine bestimmte Zielgruppe etwas versteht, abwägt oder umsetzt. Geplant werden die Wirkung, der passende Ablauf und die Art der Überprüfung.',
    sections: [
      section('arbeitsablauf', 'Von der Absicht zur Ergebnisprüfung',
        [text('Zu einer '), term('praesentation', 'Präsentation'), text(' gehören vier Entscheidungen. Zuerst bestimmst du die beabsichtigte Wirkung. Dann klärst du Publikum und Inhalt. Anschließend führst du mit passenden Medien und Sprechmitteln durch den Vortrag. Am Ende überprüfst du die Ergebnisse und sicherst die nächsten Schritte.')],
        [link('praesentation-ziel', 'Ziel und Gegenstand'), text(' → '), link('praesentation-verstaendlichkeit', 'Voraussetzungen'), text(' → '), link('praesentation-vorbereitung', 'Vorbereitung'), text(' → '), link('praesentation-umsetzung', 'Durchführung und Nachbereitung'), text('. Im '), link('praesentation-fall', 'Übungsfall zur Einführung eines Angebots'), text(' verbindest du die Schritte.')]),
      section('beispiele', 'Zwei unterschiedliche Präsentationsaufgaben',
        'Ein Standort meldet die wöchentliche Zahl verspäteter Aufträge auf einem Infobildschirm. Bei einer solchen Informationspräsentation helfen Vergleichszeitraum, Erläuterung und Aktualisierungsdatum. Geht es um die Freigabe eines Gegenmaßnahmen-Piloten, braucht die Zielgruppe zusätzlich Alternativen, eine Empfehlung und einen konkreten Entscheidungspunkt.',
        'Eine Sicherheitsunterweisung stellt Schutzmaßnahmen vor und kann sie sichtbar demonstrieren. Ob Mitarbeitende die Maßnahme beherrschen, zeigt erst eine Anwendung oder Rückfrage. Die Form der Ergebniskontrolle ergibt sich aus dem Ziel.'),
      check('transferfrage', 'Transferfrage', 'Ein Team will eine bessere Schichtübergabe einführen. Wie unterscheiden sich Präsentationsziel, Mittel und Kontrolle?', 'Das Ziel benennt die Wirkung, etwa dass die Gruppe den neuen Ablauf erklären und den Test starten kann. Ein kurzes Schaubild und ein konkretes Übergabebeispiel sind Mittel. Ein Durchspielen einer Übergabe und die Zusage für einen Testtermin liefern unterschiedliche Nachweise.'),
    ],
  },
  {
    slug: 'praesentation-ziel', parent: 'praesentation', number: '7.1', title: 'Ziel und Gegenstand einer Präsentation',
    intro: 'Der Gegenstand ist das Thema, etwa eine Kennzahl, eine Idee, ein Produkt oder eine neue Arbeitsweise. Das Ziel beschreibt die Veränderung, die bei den adressierten Personen eintreten soll.',
    sections: [
      section('zielarten', 'Informieren, überzeugen, motivieren',
        [text('Ein '), term('praesentationsziel', 'Präsentationsziel'), text(' formuliert die erwartete Wirkung. Information vermittelt Wissen und Zusammenhänge. Überzeugung macht eine Beurteilung oder Zustimmung plausibel. Motivation stärkt die Bereitschaft, etwas beizutragen oder umzusetzen. Ziele lassen sich verbinden und sollten getrennt überprüfbar bleiben.')],
        'Interne Zielgruppen sind beispielsweise Mitarbeitende und Führungskräfte. Externe Zielgruppen können Kundschaft oder Öffentlichkeit sein. Zu einem Bauvorhaben benötigt die Öffentlichkeit etwa Erläuterungen zu Auswirkungen und Zeitrahmen; ein Leitungskreis braucht zusätzlich entscheidungsrelevante Risiken und Ressourcenbedarf.'),
      section('ergebnis', 'Wirkung konkret formulieren',
        'Thema: ein neues Retourenportal. Informationsziel: Die Teamleitungen können den neuen Weg einer Reklamation anhand eines Beispiels erklären. Überzeugungsziel: Sie beurteilen die erwartete kürzere Bearbeitungszeit anhand belastbarer Daten. Handlungsziel: Zwei Bereiche benennen einen Testtermin und ihre verantwortliche Person.',
        [text('Definiere die gewünschte Wirkung, bevor du Folien sammelst. In der '), link('praesentation-thema', 'Vorbereitung von Thema und Ziel'), text(' machst du sie zum Auswahlkriterium für jeden Vortragsteil.')]),
      check('transferfrage', 'Transferfrage', 'Die Werkleitung soll neue Schichtpläne beurteilen. Formuliere ein Wissensziel und ein Entscheidungsziel.', 'Wissensziel: Die Werkleitung kann die Folgen beider Pläne für Personalbedarf und Übergaben erklären. Entscheidungsziel: Sie wählt anhand vorher genannter Kriterien einen Plan für einen sechswöchigen Test oder benennt die noch fehlende Entscheidungsvoraussetzung.'),
    ],
  },
  {
    slug: 'praesentation-verstaendlichkeit', parent: 'praesentation', number: '7.2', title: 'Voraussetzungen für eine verständliche Präsentation',
    intro: 'Eine verständliche Präsentation verbindet zugängliche Sprache, nachvollziehbaren Aufbau, angemessenen Umfang und passende Beispiele. Wer den Stoff kennt, sollte zusätzlich prüfen, ob ein Publikum ohne dasselbe Vorwissen folgen kann.',
    sections: [
      section('vier-merkmale', 'Vier Merkmale der Verständlichkeit',
        [text('Das '), term('hamburger-verstaendlichkeitsmodell', 'Hamburger Verständlichkeitsmodell'), text(' hilft beim Überarbeiten. Einfachheit nutzt bekannte Wörter, erklärt notwendige Fachbegriffe und hält Sätze überschaubar. Gliederung und Ordnung zeigen durch Übersichten, Übergänge und Hervorhebung, wie die Aussagen zusammenhängen.')],
        'Kürze und Prägnanz konzentrieren auf das, was das Publikum zum Verständnis braucht. Zusätzliche Anregung macht die Aussage durch Beispiele aus der Praxis, Bilder oder eine passende Frage zugänglich. Beim Vortrag können auch eine Visualisierung oder angemessener Humor unterstützen.'),
      section('probe', 'An einer Kernaussage überprüfen',
        'In einer Einweisung zur Bestandserfassung steht zuerst der Nutzen, dann ein Ablauf in drei Schritten und dann ein falsch eingescannter Artikel als Beispiel. Eine Testperson erklärt anschließend den Ablauf zurück. Fehlt ein entscheidender Schritt, sollte er ergänzt werden, selbst wenn der Vortrag dadurch etwas länger wird.',
        'Für einen Bericht an Fachleute kann die Methode kurz vorausgesetzt werden. Ein interdisziplinäres Publikum braucht dieselbe Kennzahl mit Definition und Bezugsgröße. Eine Folie, die nur den Vortragstext wiederholt, erschwert die Orientierung.'),
      section('barrierefreiheit', 'Digitale Barrierefreiheit und verständliche Gestaltung',
        [text('Einfache, zielgruppengerechte Sprache unterstützt die Verständlichkeit. '), term('leichte-sprache', 'Leichte Sprache'), text(' hat einen eigenen Regelrahmen. Für die von der BITV 2.0 erfassten digitalen Angebote öffentlicher Stellen gelten Barrierefreiheitsanforderungen. § 4 nennt bestimmte Erläuterungen auf der Startseite einer Website, die in Leichter Sprache und Deutscher Gebärdensprache bereitzustellen sind.')],
        'Quelle, geprüft am 18.11.2026: BITV 2.0 §§ 3 und 4, https://www.gesetze-im-internet.de/bitv_2_0/__3.html und https://www.gesetze-im-internet.de/bitv_2_0/__4.html.',
        [text('Für den Vortrag vertiefen '), link('praesentation-rhetorik', 'Rhetorik und Körpersprache'), text(' und '), link('praesentation-medien', 'Mediengestaltung'), text(' die praktische Umsetzung.')]),
      check('transferfrage', 'Transferfrage', 'Bei einer Folie verstehen neue Mitarbeitende die Bezeichnung „Backlog“ nicht und finden die Kernaussage in acht Stichpunkten nicht. Welche Merkmale helfen?', 'Einfachheit: Backlog als offenen Arbeitsvorrat erläutern. Ordnung: mit der Kernaussage beginnen. Kürze: nur die für das Handeln nötigen Punkte zeigen. Zusätzliche Anregung: einen typischen offenen Auftrag im Ablauf sichtbar machen.'),
    ],
  },
  {
    slug: 'praesentation-rhetorik', parent: 'praesentation-verstaendlichkeit', number: '7.2.1', title: 'Rhetorik, Stimme und Körpersprache',
    intro: 'Ein Auftritt wirkt durch Inhalt, Stimmführung und sichtbare Signale. Entscheidend ist, dass diese Mittel die Botschaft verständlich und glaubwürdig unterstützen.',
    sections: [
      section('kongruenz', 'Wortwahl, Stimme und Verhalten aufeinander abstimmen',
        [text('Wortinhalt ist verbal, Klang und Tempo der Stimme sind paraverbal, Haltung, Gestik, Mimik und Blick sind nonverbal. '), term('kongruente-kommunikation', 'Kongruente Kommunikation'), text(' liegt vor, wenn sich diese Ebenen in der Situation stützen. Auch Schweigen oder ein Abwenden kann vom Gegenüber als Signal aufgenommen werden. Die Bedeutung bleibt abhängig von Person und Situation.')],
        'Wer zu Rückfragen einlädt, kann sich dem Publikum zuwenden, warten und Platz für die Antwort lassen. Hastiges Weiterklicken nach der Einladung kann widersprüchlich wirken. Bei irritierenden Signalen hilft eine offene Rückfrage stärker als eine Vermutung über die Absicht.'),
      section('haltung', 'Stand, Blick, Mimik und Gestik bewusst einsetzen',
        'Ein sicherer Stand oder Sitz und natürliche Gesten helfen beim ruhigen Sprechen. Wer stehend vorträgt, kann die Füße stabil aufstellen, die Knie entspannt halten und das Gewicht gelegentlich verlagern. Hände bleiben frei und unterstützen wichtige Aussagen. Achte auf zum Anlass passende Mimik und vermeide ablenkende Wiederholungen mit Stift oder Fernbedienung.',
        'Verteile Blickkontakt im Raum oder nutze bei einem Online-Vortrag abwechselnd Kamera und Gesprächsansicht. Reaktionen können auf Missverständnisse hinweisen. Prüfe mit einer kurzen Frage, ob tatsächlich Klärungsbedarf besteht.'),
      section('sprache-stimme', 'Deutlich sprechen und Beteiligung gezielt wählen',
        [text('Kurze Sätze, erklärte Fachbegriffe und konkrete Beispiele erleichtern das Folgen. Setze Lautstärke und Tempo so ein, dass alle zuhören können. Atme ruhig zwischen Sinnabschnitten und setze Pausen bei Schlüsselaussagen. Eine Probe mit Stoppuhr oder Rückmeldung hilft gegen zu hohes Tempo. Eine '), term('rhetorische-frage', 'rhetorische Frage'), text(' regt zum Denken an. Eine echte Frage braucht Zeit und Raum für eine Antwort.')],
        'Im Kundentermin kannst du nach der Erläuterung eines Problems eine sichtbare Pause für die Rückmeldung lassen. In einer Sicherheitsunterweisung lässt du das Team nach einer Kontrollfrage selbst erklären, welche Handlung im Störfall nötig ist.'),
      check('transferfrage', 'Transferfrage', 'Du bemerkst im Probelauf ein dauerhaft hohes Tempo und kaum Blickkontakt. Welche zwei Änderungen probierst du, und woran erkennst du ihre Wirkung?', 'Markiere Pausen nach Kernbotschaften und nutze Stichwörter, damit du häufiger aufblicken kannst. Bitte eine Testperson, die zentralen Aussagen zu wiederholen und zu markieren, wo sie sich gedanklich abgehängt fühlte. Eine gut verständliche Wiederholung ist ein konkreter Anhaltspunkt.'),
    ],
  },
  {
    slug: 'praesentation-medien', parent: 'praesentation-verstaendlichkeit', number: '7.2.2', title: 'Präsentationsmedien, Folien und Diagramme',
    intro: 'Medien helfen, Aussagen zu zeigen, Beiträge zu sammeln oder Lösungen sichtbar zu entwickeln. Die Wahl richtet sich nach Inhalt, Raum, Publikum und dem gewünschten Grad der Beteiligung.',
    sections: [
      section('medienvergleich', 'Medium nach Aufgabe und Sichtweite auswählen',
        'Beamer mit Rechner oder großer Bildschirm eignet sich für eine größere Gruppe und vorbereitete Kennzahlen, Bilder oder Diagramme. Dateien lassen sich wiederverwenden und als Handout aufbereiten. Teste die Lesbarkeit aus der hinteren Reihe.',
        'Flipchart eignet sich für vorbereitete Seiten und Ergänzungen im Gespräch. Eine Pinnwand nimmt Karten, Grafiken und gruppierte Beiträge auf. Für beide sind im Buch Gruppen bis ungefähr 20 Personen eine Orientierung. Eine Tafel oder ein Whiteboard ermöglicht schnelles Aufschreiben und Korrigieren; bei guter Sichtweite kann es auch eine mittelgroße Gruppe von etwa 30 Personen erreichen. Größe, Sitzordnung und Akustik entscheiden im Einzelfall.'),
      section('grafikentscheidung', 'Die Aussage bestimmt den Diagrammtyp',
        [text('Ein '), term('kreisdiagramm', 'Kreisdiagramm'), text(' zeigt wenige Teilwerte eines nachvollziehbaren Ganzen. Ein '), term('saeulendiagramm', 'Säulendiagramm'), text(' vergleicht Beträge zwischen Kategorien oder Zeitpunkten. Ein '), term('liniendiagramm', 'Liniendiagramm'), text(' macht Verläufe und Wendepunkte über die Zeit sichtbar. Beschrifte Achsen, Einheiten, Zeitraum und Bezugsgröße. Verwende passende Skalierungen, die Vergleiche verständlich lassen.')],
        'Für verspätete Lieferungen je Woche zeigt eine Linie die Entwicklung. Die Gegenüberstellung von drei Standorten in derselben Woche gelingt mit Säulen. Wenn die Gründe der Verspätungen eine exklusive und vollständige Aufteilung bilden, kann ein Kreisschaubild die Anteile zeigen. Beim Vergleich ähnlich großer Anteile sind Säulen oft besser zu lesen.'),
      section('gestaltung', 'Folien und analoge Medien lesbar gestalten',
        'Folien unterstützen jeweils eine Kernaussage. Wenige Zeilen, lesbare Schrift, ausreichend Kontrast und eine erkennbare Gliederung helfen. Die Orientierung des Lernbands von höchstens etwa zehn Zeilen sowie rund 40 pt für Titel und 20 pt für Gliederungspunkte dient als Startwert. Prüfe die Wirkung unter tatsächlichen Projektionsbedingungen, weil Farben und Schriftgrößen je nach Raum anders wirken.',
        'Auf dem Flipchart schreibst du groß und in Druckschrift. Dicke Stifte und wenige gut unterscheidbare Farben setzen Schwerpunkte. Markiere Bedeutung zusätzlich mit Text oder Zeichen. Bei einer Präsentation mit zwei Medien dient etwa die Folie als Überblick und das Flipchart als sichtbare Sammlung der Rückfragen.'),
      check('transferfrage', 'Transferfrage', 'Vor 35 Personen zeigst du zwölf Monatswerte und willst am Ende Vorschläge für die nächste Saison sammeln. Welche Medien und Darstellungen wählst du?', 'Projiziere ein klar beschriftetes Liniendiagramm für den Monatsverlauf. Sammle wenige Beiträge am gut sichtbaren Whiteboard oder digital und gib der Gruppe eine kurze Rückmeldung, welche Vorschläge weiterbearbeitet werden. Teste Lesbarkeit und Ausweichmöglichkeiten vorher.'),
    ],
  },
  {
    slug: 'praesentation-vorbereitung', parent: 'praesentation', number: '7.3', title: 'Eine Präsentation vorbereiten',
    intro: 'Vorbereitung bringt Ziel, Publikum, Material, Ablauf und Organisation zusammen. Der Aufbau wird aus den geplanten Ergebnissen abgeleitet und im verfügbaren Zeitfenster erprobt.',
    sections: [
      section('vorbereitungsfolge', 'In vier Schritten vorgehen',
        [link('praesentation-thema', 'Thema und Ziel'), text(' festlegen. '), link('praesentation-zielgruppe', 'Zielgruppe'), text(' analysieren. '), link('praesentation-inhalt', 'Inhalte auswählen und gliedern'), text('. '), link('praesentation-organisation', 'Organisation und Ersatzlösungen'), text(' sichern.')],
        'Kläre früh, wie viel Zeit für Vortrag, Fragen und eine mögliche Entscheidung vorgesehen ist. Entwickle den roten Faden vor dem Foliendesign, plane Übergänge und einen klaren Abschluss. Eine Probe unter möglichst ähnlichen Bedingungen zeigt, ob Inhalt, Dauer und Dramaturgie zusammenpassen.'),
      section('praxis-vorbereitung', 'Vom Termin zur Probe',
        'Eine Teamleitung hat zwölf Minuten, um zwei Schichtmodelle gegenüberzustellen. Sie klärt die Kriterien mit der Entscheidergruppe, bereitet eine Vergleichsgrafik und einen begründeten Vorschlag vor und probt den Vortrag mit einer konkreten Rückfrage.',
        'Ein Servicebetrieb plant einen Informationsabend für neue Kundinnen und Kunden. Die Probe zeigt, dass viele Begriffe erklärungsbedürftig sind. Das Team ersetzt drei Detailfolien durch einen typischen Vorgang und stellt Detailfragen für den Anschluss zurück.'),
      check('transferfrage', 'Transferfrage', 'Die Folien für einen Vorstandstermin sind fertig. Die Dauer wurde kurzfristig halbiert. Wie passt du deine Vorbereitung an?', 'Kläre, welche Entscheidung und welche Mindestinformationen gebraucht werden. Kürze untergeordnete Beispiele und vertage Details in Unterlagen. Plane den Vortrag neu mit kurzem Einstieg, Entscheidungsargumenten und Rückfragen. Probiere den verkürzten Ablauf im realen Zeitrahmen.'),
    ],
  },
  {
    slug: 'praesentation-thema', parent: 'praesentation-vorbereitung', number: '7.3.1', title: 'Thema abgrenzen und Präsentationsziele formulieren',
    intro: 'Ein Thema liefert den Gegenstand. Ein überprüfbares Ziel benennt, was das Publikum danach wissen, beurteilen, können oder tun soll.',
    sections: [
      section('zielfragen', 'Drei Fragen zur Planung',
        'Was muss gezeigt werden? Welche Kenntnisse oder Fähigkeiten sollen die Teilnehmenden anschließend haben? Welches Verhalten oder welche Entscheidung wird erwartet? Formuliere möglichst konkret, woran sich die angestrebte Wirkung erkennen lässt.',
        [text('Beispiel: Thema ist die digitale Wartungsdokumentation. Als '), term('praesentationsziel', 'Ziel'), text(' sollen Teamleitungen nach dem Termin einen typischen Wartungsauftrag korrekt zuordnen und einen Bereich für den Praxistest benennen. Eine allgemein gehaltene Absicht wie „das Thema erklären“ hilft bei der Materialauswahl weniger.')]),
      section('stofftiefe', 'Kernwissen und Vertiefung staffeln',
        'Trenne unverzichtbare Informationen, ergänzende Einordnung, aktivierende Beispiele und Material für die Diskussion. Jede Kernaussage soll einen Beitrag zum Wirkungsziel leisten. In einem Freigabetermin gehören Entscheidungskriterien in den Hauptteil. Technische Detailvarianten können für Nachfragen bereitliegen.',
        'Für das Verkaufsteam kann derselbe Gegenstand Angebotsargumente und typische Kundeneinwände erfordern. Für die IT stehen Ablauf, Schnittstellen und Aufwand im Vordergrund. Beides folgt aus dem jeweiligen Ziel.'),
      check('transferfrage', 'Transferfrage', 'Ein Vertriebsteam soll einen neuen Service aktiv anbieten. Nenne ein messbares Ziel für den Termin und eine sinnvolle Kontrolle.', 'Am Ende kann jede Person den Nutzen des Services anhand eines typischen Kundenanlasses in einem Satz erklären. Eine kurze Anwendungsfrage zeigt, ob die Aussage verstanden wurde. Nach der Einführung kann die Zahl passender Angebote zeigen, ob der Transfer in den Alltag stattfindet.'),
    ],
  },
  {
    slug: 'praesentation-zielgruppe', parent: 'praesentation-vorbereitung', number: '7.3.2', title: 'Zielgruppe mit der SIE-Formel analysieren',
    intro: 'SIE ordnet die Informationen über ein Publikum nach Situation, Interesse und Eigenschaften. Die Analyse hilft, Beispiele, Sprache, Medien und Beteiligung passend zu wählen.',
    sections: [
      section('sie', 'Situation, Interesse und Eigenschaften erfassen',
        [term('sie-formel', 'SIE-Formel'), text(': S steht für Situation, etwa Zahl der Teilnehmenden und relevante Zusammensetzung, Präsenz oder online. I steht für Interesse, also Anlass, Erwartungen, Haltungen und offene Fragen. E steht für Eigenschaften wie beruflicher Hintergrund, Vorwissen und Fachkenntnisse.')],
        'Frage ähnliche Erfahrung und die konkreten Informationsbedürfnisse ab. Altersstruktur, Sprachen und weitere Merkmale sind für die Gestaltung dann relevant, wenn daraus ein tatsächlicher Bedarf folgt. Vermeide Rückschlüsse von einem einzelnen Merkmal auf Fähigkeiten oder Haltung.'),
      section('sie-anwendung', 'Aus der Analyse eine konkrete Gestaltung ableiten',
        'Acht erfahrene Servicetechniker wollen wissen, ob ein Diagnosegerät draußen zuverlässig arbeitet. Verwende einen realen Test, Messwerte und Raum für Rückfragen. Ein gemischtes Publikum aus Einkauf und Nachwuchskräften braucht zusätzlich einen Überblick, erklärte Fachbegriffe und einen Kosten-Nutzen-Vergleich.',
        'In einer großen Gruppe darf das aktive Medium für Rückfragen etwas anderes sein als die Hauptvisualisierung. Eine gut lesbare Projektion mit anschließend geordneten Fragen bewältigt einen anderen Bedarf als das Flipchart einer kleinen Arbeitsgruppe.'),
      check('transferfrage', 'Transferfrage', 'Zwölf Personen aus Produktion und Controlling besuchen einen Vortrag zu Ausschuss. Welche drei Informationen erhebst du mit SIE, und was änderst du?', 'Situation: kleine gemischte Gruppe. Interesse: Produktion will Ursachen und Handeln, Controlling die Ergebniswirkung. Eigenschaften: unterschiedliches Vorwissen zur Fertigung bzw. Kostenrechnung. Zeige zuerst einen gemeinsamen Musterfall und erläutere daran sowohl die Fehlerursache als auch ihre Kostenwirkung.'),
    ],
  },
  {
    slug: 'praesentation-inhalt', parent: 'praesentation-vorbereitung', number: '7.3.3', title: 'Inhalte mit SAGE auswählen und gliedern',
    intro: 'SAGE führt von einer Materialsammlung zu einem überschaubaren Aufbau. Die Methode hilft, die häufige Lücke zwischen viel verfügbarem Stoff und begrenzter Vortragszeit zu schließen.',
    sections: [
      section('sage', 'Sammeln, auswählen, gewichten, einteilen',
        [term('sage-formel', 'SAGE-Formel'), text(': Sammeln verschafft einen Material- und Quellenüberblick. Auswählen ordnet und verdichtet relevante Aussagen. Gewichten bestimmt ihre Bedeutung und Reihenfolge. Einteilen macht daraus Schwerpunkte und eine nachvollziehbare Gliederung.')],
        [text('Ein '), term('stichwortmanuskript', 'Stichwortmanuskript'), text(' enthält Kernaussagen, Zahlen, Übergänge und Zeitmarken. Nummerierte Karten können bei freier Rede helfen. Ergänze sparsam Beispiele, Zitate oder Erinnerungen für die Dramaturgie. Lege danach die Visualisierung fest und erprobe ihre Verständlichkeit.')]),
      section('sage-beispiel', 'Material an der Leitfrage prüfen',
        'Eine Erhebung zeigt sechs Gründe für Maschinenstillstand. Sammle die Messwerte, wähle für eine Pilotentscheidung die häufigsten und die kostenintensivsten Gründe, gewichte danach erwartete Wirkung und Umsetzbarkeit und teile den Vortrag in Problem, Pilot, Risiken und Entscheidung. Die übrigen Daten bleiben für Nachfragen verfügbar.',
        'Bei einer Ergebnispräsentation für ein Vereinsprojekt bestehen die Quellen eher aus Teilnahmezahlen und Rückmeldungen. Das Verfahren bleibt gleich. Die Leitfrage entscheidet, ob Reichweite, Lernerfolg oder Aufwand im Vordergrund steht.'),
      check('transferfrage', 'Transferfrage', 'Du hast 20 Folien für einen zehnminütigen Bericht. Wie nutzt du SAGE für die nächste Fassung?', 'Sammle und prüfe zuerst die Aussagen hinter den Folien. Wähle die für das Berichtsziel nötigen Informationen, gewichte sie nach Aussagekraft und gliedere sie in Kernbotschaft, Belege und Folgen. Mache aus Detailfolien Reservefolien und probe die kürzere Fassung.'),
    ],
  },
  {
    slug: 'praesentation-organisation', parent: 'praesentation-vorbereitung', number: '7.3.4', title: 'Präsentation organisatorisch vorbereiten',
    intro: 'Die organisatorische Vorbereitung macht den Ablauf möglich. Dazu gehören Termin, Raum, Zeitplanung, Medien, Unterlagen und ein Plan für Störungen.',
    sections: [
      section('checkliste', 'Rahmen, Ausstattung und Zuständigkeiten sichern',
        'Lege Beginn, Ende, Pausen und Zeit für Rückfragen fest. Reserviere einen Raum mit ausreichender Sicht, Hörbarkeit und Zugangsmöglichkeiten. Kläre Sitzordnung, Unterlagen in benötigter Anzahl, gegebenenfalls Getränke und Verpflegung sowie Verantwortliche für Einlass, Technik und Übergaben.',
        [text('Teste Beamer, Ton, Adapter, Fernbedienung, benötigte Dateien und analoge Medien. Prüfe, ob ein '), term('handout', 'Handout'), text(' für den Anschluss sinnvoll ist und wie es ausgegeben wird. Halte eine lokal verfügbare Datei, kurze Unterlagen oder analoge Ersatzmittel bereit.')]),
      section('verfahren', 'Probe und Ersatzlösung am Ziel ausrichten',
        'Bei einem hybriden Standorttermin testet eine Person die Sicht und Tonübertragung im Raum, eine zweite prüft die Teilnahme von außen. Fehlt Bild oder Audio, steht für die Kernaussagen sofort ein verständliches Kurzblatt zur Verfügung. Für Budgets mit sensiblen Angaben wird der vorgesehenen Gruppe ein passender und freigegebener Zugriff gegeben.',
        [text('Ein Teamtermin mit sechs Personen braucht eventuell nur Flipchart und Stifte. Auch hier lohnt es sich, die geplante Zeit und eine Ersatzoption für Unterlagen zu prüfen. Beim Ereignis selbst hilft der '), link('praesentation-stoerungen', 'Umgang mit Störungen'), text('.')]),
      check('transferfrage', 'Transferfrage', 'Du sollst zwölf Filialleitungen eine neue Kennzahl erklären. Im Raum ist die Technik unbekannt. Welche drei Dinge organisierst du zuerst?', 'Kläre Zeit, Raum und Sichtbedingungen. Teste Projektion, Datei und Ton mit einer zuständigen Person. Sichere ein einseitiges Ersatzblatt mit Kennzahl, Berechnungslogik und Praxisbeispiel, damit die Lernwirkung auch bei technischem Ausfall erreichbar bleibt.'),
    ],
  },
  {
    slug: 'praesentation-umsetzung', parent: 'praesentation', number: '7.4', title: 'Eine Präsentation durchführen und nachbereiten',
    intro: 'Bei der Durchführung setzt du den vorbereiteten Ablauf um und reagierst auf die tatsächliche Situation. Kläre, was bei Störungen Vorrang hat und wie die erzielten Ergebnisse anschließend gesichert werden.',
    sections: [
      section('persoenliche-vorbereitung', 'Für einen sicheren Auftritt vorbereiten',
        'Passe das äußere Erscheinungsbild an Aufgabe, Anlass und Arbeitsumgebung an. Eine Einweisung neuer Auszubildender und ein Bericht vor der Unternehmensleitung können unterschiedliche Anforderungen haben. Probiere Einstieg, Übergänge und Schluss laut. Eine sichere erste Aussage, ruhige Atmung und ein Ersatzplan können Unsicherheit reduzieren.',
        'Bei Teamvorträgen werden Rollen, Sprecherwechsel, Medienübergabe und Umgang mit Fragen vorher abgesprochen. Erarbeite bei Einzelvorträgen eine Kurzfassung für den Fall, dass weniger Zeit bleibt.'),
      section('vortrag-und-ergebnis', 'Ablauf, Reaktion und Ergebnis verbinden',
        [text('Der '), link('praesentation-aufbau', 'Aufbau aus Einstieg, Hauptteil und Abschluss'), text(' hält die Ziele im Blick. Beim '), link('praesentation-stoerungen', 'Umgang mit Störungen'), text(' passt du den Weg an die Lage an. In der '), link('praesentation-nachbereitung', 'Nachbereitung'), text(' prüfst du Zielerreichung, erledigst Zusagen und sicherst Lernerfahrungen.')],
        'Wenn einem Betriebsrat kurz vor dem Termin neue Zahlen vorliegen, erläutere die Aktualisierung und welche Schlussfolgerung sich dadurch ändert. Halte weiterhin an der Leitfrage fest. Abweichungen, die eine tragfähige Entscheidung verhindern, gehören in die Ergebnisdokumentation.'),
      check('transferfrage', 'Transferfrage', 'Es gibt kurz vor dem Termin eine neue Zahl, die deinen Vorschlag schwächt. Wie gehst du damit um?', 'Prüfe Bezugszeitraum und Verlässlichkeit, erläutere die Abweichung offen und passe die Empfehlung oder nächste Prüfung daran an. Halte die neue Entscheidungsgrundlage und offene Punkte fest.'),
    ],
  },
  {
    slug: 'praesentation-aufbau', parent: 'praesentation-umsetzung', number: '7.4.1', title: 'Einstieg, Hauptteil, Abschluss und Redeformeln',
    intro: 'Der Einstieg schafft Orientierung, der Hauptteil entwickelt die Aussagen und der Abschluss sichert den Kern und die nächsten Schritte. Redeformeln helfen, den Hauptteil passend zum Ziel zu strukturieren.',
    sections: [
      {
        ...section('zeitstruktur', 'Zeit zwischen den drei Teilen aufteilen',
          'Die Grafik im Lernband zeigt als Orientierung ein Sechstel für den Einstieg, zwei Drittel für den Hauptteil und ein Sechstel für den Schluss. Beispiel für 18 Minuten reine Vortragszeit: 18 ÷ 6 = 3 Minuten Einstieg, 18 × 2 ÷ 3 = 12 Minuten Hauptteil, 18 ÷ 6 = 3 Minuten Schluss. Wenn eine feste Fragenzeit im Gesamtfenster liegt, ziehst du sie vor dieser Einteilung ab.'),
        tabs: [
          { title: 'Einstieg · 3 Min.', content: 'Begrüßen, bei Bedarf vorstellen, Thema, Nutzen, Ablauf und Dauer nennen. Eine geeignete Frage oder überraschende Beobachtung weckt Interesse und führt ins Thema.' },
          { title: 'Hauptteil · 12 Min.', content: 'Ausgangslage, Folgen und Ziel erklären. Möglichkeiten anhand nachvollziehbarer Kriterien abwägen, Empfehlung und nächste Schritte erläutern. Relevante Bilder und echte Fragen strukturieren die Aufmerksamkeit.' },
          { title: 'Schluss · 3 Min.', content: 'Kernaussagen bündeln, zum Handeln einladen, Rückfragen oder Feedback einordnen, Ausblick geben und danken. Inhalte aus dem Hauptteil werden verdichtet.' },
        ],
      },
      section('hauptteil', 'Gliederung nach der Art des Themas wählen',
        'Für Maßnahmen: Ziel, Planung, Durchführung, Kontrolle. Für eine Abweichung: Ist, Soll, Analyse, Verbesserung. Für eine Störung: Problem, Ursachen, Lösungsoptionen. Für eine Entwicklung: gestern, heute, morgen. Für eine strittige Frage: Gründe für beide Seiten, Abgleich und Ergebnis.',
        'Ein Medienwechsel kann die Argumentation stützen. Bei einem Pilotvorschlag zeigt die Projektion beispielsweise Messdaten, während ein Flipchart die Entscheidungskriterien oder Rückfragen sichtbar hält. Führe nach einer Frage wieder zur Leitfrage zurück.'),
      section('redeformeln', 'Drei Redeformeln anwenden',
        [text('Die '), term('fuenf-punkte-formel', 'Fünf-Punkte-Formel'), text(' eignet sich für kurze oder spontane Beiträge: Interesse wecken, Thema nennen, Aussage begründen und illustrieren, Fazit ziehen, zum Handeln auffordern.')],
        [text('Die '), term('problemloesungsformel', 'Problemlösungsformel'), text(' führt bei mehreren möglichen Lösungen über Anlass und Problem zum Ziel, bewertet Optionen, präsentiert eine Entscheidung und benennt die Handlung.')],
        [text('Die '), term('pro-kontra-formel', 'Pro-und-Kontra-Formel'), text(' beginnt mit der strittigen Frage, stellt Argumente beider Seiten dar, gleicht sie anhand von Kriterien ab und endet mit einem begründeten Ergebnis.')]),
      section('beispiel', 'Zwei Anwendungsfälle',
        'Eine Produktionsleitung will über zwei Wartungsmodelle entscheiden. Die Problemlösungsformel führt von den Stillständen über das Ziel einer höheren Verfügbarkeit zu zwei bewerteten Varianten und einer Pilotempfehlung. In einem spontanen Kurzbericht zu einer erfolgreichen Umstellung reicht die Fünf-Punkte-Formel mit einem Beleg und einer Bitte zur Übernahme.',
        'Für eine Prüfung trainierst du zusätzlich aufmerksames Zuhören und klärende Antworten im Fachgespräch. Verbindliche Vorgaben zum Ablauf und zu erlaubten Medien stehen in den Unterlagen der zuständigen IHK.'),
      check('transferfrage', 'Transferfrage', 'Du hast insgesamt 15 Minuten, davon drei Minuten für Fragen. Zwei Angebote stehen zur Auswahl. Welche Zeitaufteilung und Redeformel passen?', 'Für den Vortrag bleiben zwölf Minuten. Orientierung: zwei Minuten Einstieg, acht Minuten Hauptteil, zwei Minuten Schluss, danach drei Minuten Fragen. Die Problemlösungsformel passt, wenn du von einem Problem und Ziel zu mehreren Optionen und einer Empfehlung führst. Bei einer klar strittigen Ja-Nein-Frage kann die Pro-und-Kontra-Formel passen.'),
    ],
  },
  {
    slug: 'praesentation-stoerungen', parent: 'praesentation-umsetzung', number: '7.4.2', title: 'Technische Störungen und Zwischenfragen handhaben',
    intro: 'Unvorhergesehenes betrifft sowohl die Technik als auch die Reaktion der Zuhörenden. Vorbereitung und ein ruhiger Umgang halten das Präsentationsziel erreichbar.',
    sections: [
      section('technik', 'Bei Technikproblemen zur Ersatzlösung wechseln',
        'Halte Zuständige für Raum und Technik bereit. Vereinbare eine kleine Zeitgrenze für die Fehlerbehebung. Wenn die Projektion ausfällt, erkläre die Lage in einem Satz und arbeite mit dem Handout, Flipchart oder einer geprobten mündlichen Fassung weiter. Führe nur dann eine verkürzte Variante durch, wenn die Teilnehmenden die notwendige Information zuverlässig erhalten.',
        'Bei einer Produktdemo kann ein vorbereitetes, freigegebenes Bild den Funktionsablauf illustrieren. Wenn die eigentliche Live-Prüfung entscheidungsrelevant ist, halte die fehlende Prüfung und einen Ersatztermin fest.'),
      section('fragen', 'Kurze Klärung, schwierige Frage oder Störung unterscheiden',
        [text('Eine kurze Verständnisfrage kannst du unmittelbar beantworten. Umfangreiche oder thematisch spätere Fragen kommen in einen '), term('themenspeicher', 'Themenspeicher'), text('. Halte die Frage für alle sichtbar fest, nenne den Klärzeitpunkt und greife sie dort wieder auf. Ein Zwischenruf lässt sich ruhig aufnehmen, gegebenenfalls in eine konkrete Frage übersetzen und zeitlich begrenzen.')],
        'Bei wenig Aufmerksamkeit kann eine konkrete Rückfrage zeigen, ob ein Bezug oder ein Beispiel fehlt. Ist eine Zahl unbekannt, halte fest, wer sie bis wann nachliefert. Bei andauernder Störung erinnere respektvoll an die vereinbarte Gesprächsregel und führe zur Leitfrage zurück.'),
      check('transferfrage', 'Transferfrage', 'Während einer Kennzahlenpräsentation fällt die Projektion aus. Zugleich kommt eine komplexe Frage zur Datenerhebung. Wie reagierst du?', 'Wechsle nach kurzer Ankündigung auf Ersatzmaterial, sofern es die nötigen Daten verständlich zeigt. Prüfe, ob die Datenfrage für die bevorstehende Entscheidung wesentlich ist. Wenn ja, kläre den Kern sofort. Andernfalls halte die Frage sichtbar fest und kläre sie am Ende oder mit vereinbartem Nachliefertermin.'),
    ],
  },
  {
    slug: 'praesentation-nachbereitung', parent: 'praesentation-umsetzung', number: '7.4.3', title: 'Zielerreichung und Nachbereitung prüfen',
    intro: 'Nachbereitung prüft die Wirkung des Vortrags, erledigt zugesagte Folgeaufgaben und verbessert künftige Auftritte. Ein Handout verbreitet Inhalte. Ein Ergebnisprotokoll macht Entscheidungen und Zuständigkeiten nachvollziehbar.',
    sections: [
      section('nachweise', 'Ziel und passenden Nachweis zusammenführen',
        [text('Bei einer '), term('zielerreichungskontrolle', 'Zielerreichungskontrolle'), text(' vergleichst du beabsichtigte und überprüfbare Wirkung. Wissen kannst du mit einer offenen Anwendungsfrage prüfen, Zustimmung etwa mit einem begründeten Votum, Umsetzung mit nachvollziehbaren Schritten nach dem Termin. Applaus, höfliches Nicken oder wenige Einzelfragen sind ergänzende Signale.')],
        'Halte Entscheidung, Verantwortliche, Termin und offene Punkte in einem Protokoll fest. Gib je nach Zweck ein Handout mit Kerninformationen und vertiefenden Unterlagen aus. Beantworte die Punkte aus dem Themenspeicher oder vereinbare eine nachgelagerte Klärung.'),
      section('auswertung', 'Ablauf, Organisation und Medien auswerten',
        'Prüfe anschließend, ob Ziel und Zeitplan gepasst haben, welche kritischen Situationen entstanden sind und ob die Störfalllösung funktioniert hat. Untersuche Organisation und Medieneinsatz getrennt. Leite eine konkrete Änderung mit Verantwortung und Termin ab.',
        'Beispiel: Vier von acht Teamleitungen erklären eine Freigaberegel korrekt. Eine zu kleine Tabelle und eine unbekannte Abkürzung haben die Erklärung erschwert. Für den Folgetermin ersetzt die Präsentatorin die Tabelle durch einen lesbaren Musterfall und wiederholt die Kontrollfrage.'),
      check('transferfrage', 'Transferfrage', 'Alle Teilnehmenden bewerten einen Vortrag positiv. Eine Woche später hat keines der Teams den angekündigten Test gestartet. Wie wertest du das?', 'Die Rückmeldung zeigt Zufriedenheit mit dem Termin. Das Handlungsziel ist anhand fehlender Teststarts noch nicht erreicht. Prüfe Fristen, Verantwortlichkeiten, Ressourcen und offene Bedenken, vereinbare einen konkreten nächsten Schritt und kontrolliere dessen Umsetzung.'),
    ],
  },
  {
    slug: 'praesentation-fall', parent: 'praesentation', number: '7.5', title: 'Übungsfall: Ein neues Serviceangebot vorstellen',
    intro: 'Ein Unternehmen für Gebäudetechnik möchte ein modulares Energie-Monitoring für kleine Filialbetriebe einführen. Acht regionale Leitungen sollen die Chancen verstehen, das Vorhaben begründet beurteilen und ihre regionalen Erkenntnisse einbringen. Du bereitest den zentralen Termin vor.',
    sections: [
      section('ausgangssituation', 'Die betriebliche Ausgangslage',
        'Die Kundschaft der Niederlassungen reicht von kleinen Filialgruppen mit wenig Technikpersonal bis zu größeren Betrieben mit eigener Energiedatenerfassung. Das neue Angebot soll Verbrauchsdaten übersichtlich anzeigen und mit regionalen Serviceleistungen kombinieren. Marktchancen und Aufwand unterscheiden sich nach Region.',
        'Der Hauptsitz erwägt einen zeitlich begrenzten Pilot. Die regionalen Leitungen kennen Beschaffungswege und Einwände der Kundschaft. Für Vortrag und Rückfragen sind 18 Minuten vorgesehen. Ein verbindlicher Produktstart steht erst nach Auswertung der Rückmeldungen an.'),
      check('aufgabe-1', 'Aufgabe 1 · Wissen vermitteln und prüfen',
        'Entwickle ein fachliches Wissensziel, begründe es aus dem Fall und beschreibe eine Kontrolle.',
        'Ziel: Die Leitungen können den Unterschied zwischen dem neuen Modul und dem bisherigen Angebot an einem Filialbeispiel erklären und eine passende Kundengruppe nennen. Begründung: Passende Beratung setzt ein gemeinsames Verständnis von Nutzen und Anwendungsbereich voraus. Kontrolle: In einer offenen, sanktionsfreien Praxisfrage ordnet jede Leitung einen kurzen Fall zu. Prüfe die Antworten auf die fachlichen Kernpunkte und kläre erkennbare Lücken.'),
      check('aufgabe-2', 'Aufgabe 2 · Begründete Zustimmung erkennen',
        'Entwickle ein Überzeugungsziel für diese Präsentation, begründe es und schlage eine Kontrolle vor.',
        'Ziel: Die regionalen Leitungen können einen Pilot anhand von Chancen, Voraussetzungen und Aufwand beurteilen. Begründung: Ihre Unterstützung beeinflusst, ob geeignete Kunden angesprochen und Rückmeldungen verlässlich erfasst werden. Kontrolle: Bitte am Ende um ein kurzes begründetes Votum je Region, inklusive einer Bedingung oder eines Einwands. Sichtbare Reaktionen können Anlass für Nachfragen geben. Das begründete Votum liefert aussagekräftigere Hinweise als Körpersprache allein.'),
      check('aufgabe-3', 'Aufgabe 3 · Regionales Wissen sichtbar einbinden',
        'Entwickle ein Beteiligungsziel, begründe es und kontrolliere es innerhalb der Präsentation.',
        'Ziel: Die Leitungen ergänzen regionale Kundenanforderungen und Einwände an einem vorbereiteten Übersichtsschaubild. Begründung: Der Hauptsitz kann regionale Nachfrage und Beratungsaufwand nur mit Erkenntnissen aus den Niederlassungen realistisch einschätzen. Kontrolle: Ordne Beiträge sichtbar in einer vorbereiteten Mindmap unter Nachfrage, Einwände und Voraussetzungen zu. Prüfe, ob die eingebrachten regionalen Hinweise erfasst sind und wer offene Punkte weiter prüft. Die kurze Abfrage und Zuordnung bleiben Teil des Vortrags.'),
      check('aufgabe-4', 'Zusatzaufgabe · Ablauf und Ausweichlösung',
        'Plane den Zeitrahmen und gib eine Ausweichlösung an, falls keine Projektion möglich ist.',
        'Reserviere beispielsweise drei Minuten für Fragen. Für die übrigen 15 Minuten sind etwa 2,5 Minuten Einstieg, zehn Minuten Hauptteil und 2,5 Minuten Schluss eine Orientierung. Bereite ein Blatt mit Angebot, Beispiel und Pilotkriterien vor. Trage die Kernpunkte damit vor, sammle regionale Hinweise am Flipchart und sichere sie im Ergebnisprotokoll.'),
      section('weiterlernen', 'Vorbereitung und Umsetzung vertiefen',
        [link('praesentation-thema', 'Ziel formulieren'), text(' · '), link('praesentation-zielgruppe', 'Zielgruppe analysieren'), text(' · '), link('praesentation-aufbau', 'Vortragsaufbau'), text(' · '), link('praesentation-nachbereitung', 'Erfolg kontrollieren')]),
    ],
  },
];

export const chapters: Chapter[] = units.map(unit => ({
  id: id(unit.slug), subjectId, parentId: unit.parent ? id(unit.parent) : undefined,
  number: unit.number, title: unit.title, articleId: id(unit.slug),
}));

export const articles: Article[] = units.map(unit => ({
  id: id(unit.slug), chapterId: id(unit.slug), subjectId, number: unit.number, title: unit.title,
  intro: unit.intro, updatedAt, version: 1, sections: unit.sections,
}));

type GlossaryEntry = [slug: string, label: string, definition: string, articleSlug: string];
const terms: GlossaryEntry[] = [
  ['praesentation', 'Präsentation', 'Aufbereitete Vermittlung ausgewählter Informationen an ein Publikum mit einer vorher bestimmten Wirkung.', 'praesentation'],
  ['praesentationsziel', 'Präsentationsziel', 'Beabsichtigte Wirkung einer Präsentation, etwa neues Wissen, eine begründete Beurteilung oder eine anschließende Handlung.', 'praesentation-ziel'],
  ['hamburger-verstaendlichkeitsmodell', 'Hamburger Verständlichkeitsmodell', 'Modell zur Beurteilung verständlicher Darstellung anhand von Einfachheit, Gliederung und Ordnung, Kürze und Prägnanz sowie zusätzlicher Anregung.', 'praesentation-verstaendlichkeit'],
  ['leichte-sprache', 'Leichte Sprache', 'Besonders verständliche Sprachform mit definierten Regeln, die insbesondere Menschen mit Lernschwierigkeiten den Zugang zu Informationen erleichtern soll.', 'praesentation-verstaendlichkeit'],
  ['kongruente-kommunikation', 'Kongruente Kommunikation', 'Kommunikation, bei der Wortinhalt, Stimme und sichtbares Verhalten einander stützen.', 'praesentation-rhetorik'],
  ['rhetorische-frage', 'Rhetorische Frage', 'Stilmittel in Frageform, das eine Aussage unterstreicht oder zum Nachdenken anregt und keine gesprochene Antwort erwartet.', 'praesentation-rhetorik'],
  ['kreisdiagramm', 'Kreisdiagramm', 'Diagramm, das nachvollziehbare Teile eines Ganzen als Kreissektoren darstellt.', 'praesentation-medien'],
  ['saeulendiagramm', 'Säulendiagramm', 'Diagramm, das Werte mithilfe senkrechter Säulen zwischen Kategorien oder Zeitpunkten vergleicht.', 'praesentation-medien'],
  ['liniendiagramm', 'Liniendiagramm', 'Diagramm, das geordnete Werte mit Linien verbindet und damit etwa Veränderungen über die Zeit sichtbar macht.', 'praesentation-medien'],
  ['sie-formel', 'SIE-Formel', 'Raster zur Zielgruppenanalyse anhand von Situation, Interesse und Eigenschaften der Teilnehmenden.', 'praesentation-zielgruppe'],
  ['sage-formel', 'SAGE-Formel', 'Methode zur inhaltlichen Vorbereitung anhand der Schritte Sammeln, Auswählen, Gewichten und Einteilen.', 'praesentation-inhalt'],
  ['stichwortmanuskript', 'Stichwortmanuskript', 'Kurze Redestütze mit Kernaussagen, Belegen und Übergängen für einen frei gehaltenen Vortrag.', 'praesentation-inhalt'],
  ['handout', 'Handout', 'Unterlage für das Publikum, die zentrale Informationen oder weiterführende Unterlagen zu einer Präsentation verfügbar macht.', 'praesentation-organisation'],
  ['fuenf-punkte-formel', 'Fünf-Punkte-Formel', 'Redeformel aus Interesse wecken, Thema benennen, begründen und illustrieren, Fazit ziehen und Handlung anregen.', 'praesentation-aufbau'],
  ['problemloesungsformel', 'Problemlösungsformel', 'Redeformel, die von Anlass, Problem und Ziel über einen Variantenvergleich zur begründeten Entscheidung und zu nächsten Schritten führt.', 'praesentation-aufbau'],
  ['pro-kontra-formel', 'Pro-und-Kontra-Formel', 'Redeformel, die eine strittige Frage durch Argumente beider Seiten, deren Abgleich und ein begründetes Ergebnis bearbeitet.', 'praesentation-aufbau'],
  ['themenspeicher', 'Themenspeicher', 'Sichtbare Sammlung für Fragen oder Themen, deren Bearbeitung für einen späteren Zeitpunkt vereinbart ist.', 'praesentation-stoerungen'],
  ['zielerreichungskontrolle', 'Zielerreichungskontrolle', 'Abgleich der angestrebten Wirkung mit vorher festgelegten und beobachtbaren Nachweisen.', 'praesentation-nachbereitung'],
];

export const glossary: GlossaryTerm[] = terms.map(([slug, label, definition, articleSlug]) => ({
  id: id(`term-${slug}`), subjectId, term: label, definition, articleId: id(articleSlug),
}));
