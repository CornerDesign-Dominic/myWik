import type { Article, ArticleSection, Chapter, GlossaryTerm, RichText } from '../types';

interface Lesson {
  id: string;
  parent?: string;
  number: string;
  title: string;
  intro: string;
  parts: [id: string, title: string, ...paragraphs: string[]][];
  terms: [id: string, term: string, definition: string][];
  question: string;
  answer: string;
}

const lessons: Lesson[] = [
  {
    id: 'kommunikation', number: '2', title: 'Mitarbeitergespräche',
    intro: 'Ein Mitarbeitergespräch ist der vorbereitete Austausch zwischen Führungskraft und Mitarbeitenden zu einem bestimmten Anlass. Es schafft einen gemeinsamen Arbeitsstand und mündet in ein greifbares Ergebnis.',
    parts: [
      ['anlass', 'Gesprächsform und Zweck passend wählen', 'Anerkennung würdigt konkrete Leistungen. Ein Kritikgespräch klärt beobachtete Abweichungen früh. Ein Beurteilungsgespräch bilanziert Leistung und Verhalten anhand bekannter Maßstäbe über eine Periode. Ein Entwicklungsgespräch betrachtet den künftigen Bedarf und mögliche Förderung. Auch Konflikt- und Trennungsgespräche brauchen einen geeigneten Anlass und Rahmen.', 'Teilnehmende können [[selbstbild-fremdbild|Selbstbild und Fremdbild]] abgleichen. Ein Mitarbeitender hält häufige Rückfragen für Zeichen eigener Unsicherheit. Seine Führungskraft beobachtet, dass die Rückfragen Fehler bei der Übergabe vermeiden. Beide prüfen, wann Rückfragen helfen und welche Informationen künftig im Auftrag stehen sollten.'],
      ['phasen', 'Vorbereiten, durchführen und nachbereiten', 'Vereinbare rechtzeitig einen Termin und informiere über Thema, Ziel und voraussichtliche Dauer. Bereite Belege und Fragen vor, ermögliche der anderen Person dieselbe Vorbereitung und reserviere einen störungsfreien Rahmen.', 'Eröffne freundlich, lege Anlass und gewünschten Ablauf offen und kläre Ausgangslage sowie Sichtweisen. Vereinbare Maßnahmen mit Verantwortung und Termin. Halte das Ergebnis und gegebenenfalls offene Punkte fest, vereinbare eine Rückschau und schließe das Gespräch eindeutig ab.', 'Sende die vereinbarte Dokumentation, prüfe, was erreicht wurde, und begleite die Umsetzung. Kläre beim Folgetermin auch, ob die Rahmenbedingungen angepasst werden müssen. Gesundheits- oder Konfliktdetails gehören nur in einen angemessen geschützten Rahmen.'],
      ['weiter', 'Gespräche nach Anlass vertiefen', 'Die [[>anerkennung-kritik|Anerkennungs- und Kritikgespräche]] wirken zeitnah. Das [[>beurteilungsgespraech|Beurteilungsgespräch]] unterscheidet sich durch Bewertungszeitraum und Kriterien. [[>fall-mitarbeiterbeurteilung|Im Übungsfall]] richtest du ein nachvollziehbares Verfahren ein.'],
    ],
    terms: [['selbstbild-fremdbild', 'Selbstbild und Fremdbild', 'Selbstbild bezeichnet die eigene Wahrnehmung von Fähigkeiten und Verhalten. Fremdbild ist die Sicht anderer. Beide lassen sich anhand konkreter Beobachtungen vergleichen.']],
    question: 'Eine Führungskraft möchte eine nachweisbare Verbesserung anerkennen und das nächste Projekt besprechen. Wie verbindet sie beides sinnvoll?',
    answer: 'Sie würdigt zuerst die konkrete Verbesserung, ohne das Lob als Verhandlungsmittel einzusetzen. Den Projektauftrag kündigt sie als getrennten Gesprächspunkt an und vereinbart dazu Zuständigkeit und Termin. Die Anerkennung bleibt eine eigenständige Botschaft.',
  },
  {
    id: 'anerkennung-kritik', parent: 'kommunikation', number: '2.1', title: 'Anerkennungs- und Kritikgespräche',
    intro: 'Anerkennung macht wirksames Verhalten sichtbar. Konstruktive Kritik klärt eine Abweichung, ihre Ursachen und die nächsten Schritte. Beide Formen beziehen sich auf einen konkreten Anlass.',
    parts: [
      ['anerkennung', 'Anerkennung konkret und zeitnah äußern', 'Ein [[anerkennung|Anerkennungsgespräch]] benennt eine tatsächliche Leistung und deren Wirkung. Sage beispielsweise nach einer Übergabe: „Du hast die offenen Störungen nach Dringlichkeit sortiert und die Ansprechpersonen genannt. So konnte die Folgeschicht direkt starten.“ Dadurch erfährt die Person, was sie wiederholen kann.', 'Wähle einen passenden Rahmen. Manche möchten Anerkennung im Team, andere lieber persönlich. Vergleiche Leistungen nach denselben Kriterien und sprich das Ergebnis ohne Übertreibung aus. Wenn du anschließend ein anderes Thema besprechen musst, kündige es getrennt an, damit die Anerkennung ihre klare Aussage behält.'],
      ['kritik', 'Kritik vertraulich und lösungsorientiert besprechen', 'Ein [[konstruktive-kritik|konstruktives Kritikgespräch]] beginnt mit einem sachlich beschreibbaren Verhalten, der Wirkung oder einem vereinbarten Soll und der Bitte um die andere Sicht. [[ich-botschaft|Ich-Botschaften]] kennzeichnen die eigene Beobachtung oder Wirkung. „Ich habe gestern bei zwei Vorgängen keine Freigabe im System gesehen. Dadurch konnte ich den Versand nicht auslösen. Was ist aus deiner Sicht passiert?“', 'Waren Rechte im System gesperrt, prüfe zuerst Technik und Ersatzprozess. Wenn ein vereinbarter Schritt ausgelassen wurde, verständigt euch auf die konkrete Zukunftserwartung. Beispiel. Bis Freitag wird vor der Übergabe die Freigabe geprüft. Bei einer Störung meldet die Person den Vorgang an die Schichtleitung. Ein Folgetermin prüft Beobachtungen und Wirkung der Maßnahme.'],
      ['dokumentieren', 'Befund, Interpretation und Vereinbarung trennen', 'Halte je nach Anlass Datum, Situation, beobachtbares Verhalten und Auswirkung fest. Eine Aussage wie „Nachlässigkeit“ ist eine Deutung. „In drei von zwölf Konfektionen fehlte das Prüfsiegel“ lässt sich prüfen. Gute Vorbereitung erleichtert es auch, widersprechende Belege und nicht beeinflussbare Ursachen zu berücksichtigen.', 'Bei verspäteten Teammeetings oder fehlerhaften Rechnungen gelten dieselben Schritte. Besprich die Abweichung zeitnah und unter vier Augen, lasse die Person ihre Sicht ausreichend darstellen und entscheide gemeinsam über einen überprüfbaren nächsten Schritt.'],
    ],
    terms: [
      ['anerkennung', 'Anerkennungsgespräch', 'Zeitnahe Würdigung einer konkreten Leistung oder eines konkreten Verhaltens durch verständliche, glaubwürdige Rückmeldung.'],
      ['konstruktive-kritik', 'Konstruktives Kritikgespräch', 'Vertrauliche Rückmeldung zu einer konkreten Abweichung mit Klärung der Sichtweisen, des Solls und möglicher Maßnahmen.'],
      ['ich-botschaft', 'Ich-Botschaft', 'Formulierung aus der eigenen Perspektive, die eine Beobachtung, Wirkung oder Erwartung verständlich macht.'],
    ],
    question: 'Eine Mitarbeiterin hat zwei vereinbarte Kundenrückrufe versäumt. Was ist ein angemessener Einstieg und wie endet das Gespräch?',
    answer: 'Vertraulich einsteigen, Datum und konkrete Rückrufaufträge nennen, Auswirkung beschreiben und nach ihrem Ablauf fragen. Gegebenenfalls das Terminsystem unterstützen und eine klare Vereinbarung treffen, wer Rückrufe bis wann erledigt und wie Ausnahmen gemeldet werden. Die Wirksamkeit wird zu einem vereinbarten Termin geprüft.',
  },
  {
    id: 'beurteilungsgespraech', parent: 'kommunikation', number: '2.2', title: 'Beurteilungsgespräche einordnen',
    intro: 'Das Beurteilungsgespräch macht eine vorbereitete Mitarbeitendenbeurteilung nachvollziehbar. Beschäftigte erhalten Rückmeldung und können die eigenen Erfahrungen sowie beruflichen Perspektiven einbringen.',
    parts: [
      ['zweck', 'Wofür eine Beurteilung dient', 'Eine [[personalbeurteilung|Personalbeurteilung]] stützt Feedback, Personaleinsatz und gezielte Entwicklung. Ihre Ergebnisse können je nach betrieblichem Verfahren auch in Entscheidungen zu Versetzungen, Beförderungen oder leistungsbezogenen Vergütungsanteilen einfließen. Ein nachvollziehbares Verfahren braucht tätigkeitsbezogene Kriterien und ausreichend vielfältige Beobachtungen.', 'Eine Mitarbeiterin bewältigt die Kundenannahme zuverlässig und möchte komplexere Fälle übernehmen. Die Führungskraft bespricht erreichte Ergebnisse anhand belegter Kriterien, klärt weitere Voraussetzungen und kann eine begleitete Erprobung anbieten. Die gezeigte Leistung und die Annahme über künftiges Potenzial werden unterschiedlich begründet.'],
      ['abgrenzung', 'Gesprächszwecke transparent machen', 'Ein Zielvereinbarungsgespräch schaut auf künftige Ergebnisse. Ein Entwicklungsgespräch plant Lern- oder Einsatzmöglichkeiten. Ein Gehaltsgespräch hat eigene Interessen und Entscheidungen. Werden mehrere Zwecke im Jahresgespräch kombiniert, benenne sie vorab, gliedere die Abschnitte und halte die Ergebnisse getrennt fest. Nach einem belastenden Gesprächspunkt kann ein zweiter Termin für Entwicklung sinnvoll sein.', 'Beim Austritt können dokumentierte Beobachtungen zu einer sachlichen Rückschau beitragen und als Material für Aussagen zu Leistung und Verhalten im qualifizierten Arbeitszeugnis dienen. § 109 GewO erlaubt Beschäftigten, ein solches Zeugnis zu verlangen. Amtliche Fassung unter https://www.gesetze-im-internet.de/gewo/__109.html. Ein eigenständiges Austrittsgespräch richtet sich vor allem auf Gründe und mögliche organisatorische Schwächen. Kläre Zweck und Umgang mit Rückmeldungen im Voraus.'],
      ['recht', 'Erörterungsrecht kennen', 'Nach § 82 Abs. 2 BetrVG können Beschäftigte unter anderem verlangen, dass die Beurteilung ihrer Leistungen und Möglichkeiten der beruflichen Entwicklung erörtert werden. Die Vorschrift sieht die Möglichkeit vor, ein Betriebsratsmitglied hinzuzuziehen. Amtliche Fassung unter https://www.gesetze-im-internet.de/betrvg/__82.html.'],
      ['weiter', 'Beurteilung systematisch aufbauen', 'Vertiefe [[>beurteilung-ziele|Grundsätze, Ziele und Anlässe]], [[>beurteilungssysteme|Kriterien und Systeme]], [[>beurteilung-gespraechsablauf|Gesprächsablauf]] und [[>beurteilungsfehler|Beurteilungsfehler]].'],
    ],
    terms: [['personalbeurteilung', 'Personalbeurteilung', 'Regelgeleitete Einschätzung insbesondere von beobachteter Arbeitsleistung, beruflichem Verhalten oder künftigem Entwicklungspotenzial.']],
    question: 'Eine Führungskraft möchte Feedback, Gehaltsverhandlung und Förderung im Jahresgespräch behandeln. Wie verhindert sie, dass die Themen sich gegenseitig verzerren?',
    answer: 'Sie benennt Ziele, Kriterien und Phasen vorab. Rückmeldung und Stellungnahme erhalten einen eigenen Abschnitt. Geldfragen und Entwicklung werden anschließend klar getrennt oder in separate Termine verlegt. Bei kritischem Feedback schafft ein Aufschub Raum für Reflexion und konkrete Entwicklungsvorschläge.',
  },
  {
    id: 'beurteilung-ziele', parent: 'beurteilungsgespraech', number: '2.2.1', title: 'Beurteilungsgrundsätze, Ziele und Anlässe',
    intro: 'Beurteilungsgrundsätze geben vor, wie Leistung oder Verhalten beobachtet und bewertet werden. Sie schaffen einen gemeinsamen, überprüfbaren Rahmen.',
    parts: [
      ['grundsaetze', 'Grundsätze und Anlässe festlegen', '[[beurteilungsgrundsaetze|Beurteilungsgrundsätze]] definieren Verfahren, anforderungsbezogene Kriterien und Ausprägungen. Gib den Maßstab rechtzeitig bekannt. Verwende bei vergleichbaren Tätigkeiten gleiche Regeln und berücksichtige unterschiedliche Aufgaben und Ausstattung. Regelmäßige Beurteilungen, Probezeitende, Versetzung, Beförderung oder Austritt können Anlässe sein.', 'Ziele sind begründete Anerkennung, Rückmeldung zu Stärken und Schwächen und eine sinnvolle Förderung. Eine Entwicklungsvereinbarung kann etwa begleitetes Arbeiten im Kundenservice vorsehen. Die Wirkung wird später an zuvor abgestimmten Prozess- und Qualitätsmerkmalen überprüft.'],
      ['fuenf-phasen', 'Fünf Schritte über die Beurteilungsperiode', '1. Beobachte typische Arbeit über den Zeitraum. 2. Beschreibe konkrete Ereignisse und Bedingungen. 3. Bewerte sie anhand vorab geklärter Kriterien. 4. Besprich Bewertung und Gegensicht im [[>beurteilung-gespraechsablauf|Beurteilungsgespräch]]. 5. Werte offene Punkte und vereinbarte Maßnahmen aus.', 'Beispiel. In einer Servicestelle sammelt die Leitung über drei Monate vergleichbare Fälle. Die Beschreibung nennt Frist, Art des Falls und rechtzeitige Eskalation. Erst die Bewertung ordnet die Fälle dem Standard zu. Unklare Störungen und Vertretungen werden als Kontext festgehalten.'],
      ['mitbestimmung', 'Allgemeine Beurteilungsgrundsätze mitbestimmen', 'Die Aufstellung allgemeiner Beurteilungsgrundsätze unterliegt § 94 Abs. 2 BetrVG. Abs. 2 verweist auf das Zustimmungs- und Einigungsstellenverfahren aus Abs. 1. Der Betrieb bezieht den Betriebsrat deshalb früh bei der Gestaltung ein, wo diese Mitbestimmung greift. Amtliche Fassung unter https://www.gesetze-im-internet.de/betrvg/__94.html.'],
    ],
    terms: [['beurteilungsgrundsaetze', 'Beurteilungsgrundsätze', 'Allgemeine Regeln, Kriterien und Maßstäbe, mit denen Mitarbeitendenbeurteilungen nach einem gemeinsamen Verfahren vorgenommen werden.']],
    question: 'Zwei Vorgesetzte vergeben unterschiedliche Bewertungen für vergleichbare Übergaben. Welche zwei Schritte sollte der Betrieb vor der nächsten Runde konkret ändern?',
    answer: 'Definiere zuerst gemeinsam, welche beobachtbaren Angaben zu einer vollständigen Übergabe gehören und wie Sonderfälle behandelt werden. Anschließend bewerten beide einige identische, neutral beschriebene Fälle anhand derselben Anker und klären Abweichungen. Ein einheitlicher Bogen allein reicht ohne gemeinsame Auslegung nicht.',
  },
  {
    id: 'beurteilungssysteme', parent: 'beurteilungsgespraech', number: '2.2.2', title: 'Beurteilungskriterien und Beurteilungssysteme',
    intro: 'Beurteilungskriterien benennen, was bewertet wird. Der Beurteilungsmaßstab bestimmt, wie Beobachtungen vergleichbar eingeordnet werden.',
    parts: [
      ['kriterien', 'Arbeitsanforderungen in Merkmale übersetzen', 'Leite Leistungs- und Verhaltensmerkmale aus der tatsächlichen Aufgabe oder Stellenbeschreibung ab. Arbeitsleistung kann anhand von Termintreue, Sorgfalt oder Qualität beurteilt werden. Arbeitsbezogenes Verhalten betrifft beispielsweise Abstimmung im Team, nachvollziehbare Konfliktklärung oder Kommunikation mit Kundschaft und Lieferanten.', 'Die [[leistungsbeurteilung|Leistungsbeurteilung]] schaut auf Ergebnisse und Verhalten im vergangenen Zeitraum. Eine [[potenzialbeurteilung-gespraech|Potenzialbeurteilung]] fragt, welche weitergehenden Aufgaben jemand künftig bewältigen könnte. Bisherige Beobachtungen sind Anhaltspunkte. Ergänze sie bei Bedarf um eine begleitete Erprobung oder Aufgabe, die Anforderungen der Zielrolle sichtbar macht. Gute Fachleistung allein belegt beispielsweise keine Teamleitungskompetenz.'],
      ['verfahren', 'Freie und gebundene Beurteilung vergleichen', 'Eine [[freie-beurteilung|freie Beurteilung]] lässt Raum für individuelle Texte und Besonderheiten. Verschiedene Schreibstile und Maßstäbe erschweren den Vergleich. Die [[gebundene-beurteilung|gebundene Beurteilung]] verwendet vorgegebene Kriterien und Stufen, etwa Noten oder Symbole. Sie erleichtert Vergleich und Soll-Ist-Abgleich, wenn die Stufen verständlich definiert und einheitlich angewandt werden.', 'Mischformen kombinieren Skalen und begründende Freitexte. Eine Zahl oder ein Symbol braucht eine Legende. Für verschiedene Rollen dürfen sich tätigkeitsbezogene Kriterien unterscheiden. Bei ähnlichen Tätigkeiten sollten die Regeln gleich sein. Sonderfälle, wechselnde Aufgaben und fehlende Beobachtungsgelegenheiten brauchen eine eigene Kennzeichnung.'],
      ['leitfaden', 'Maßstab und Leitfaden am Beispiel nutzen', 'Der Buchbogen trennt fachliche Tiefe (Können im eigenen Gebiet), fachliche Breite (Verständnis benachbarter Funktionen) und strategisches Denken (mehrere Sichtweisen und begründete Folgerungen). Die zugehörige Skala reicht von deutlich über erfüllten Erwartungen bis nicht erfüllt. Ein Leitfaden erläutert für jedes Kriterium, was tatsächlich beurteilt wird.', 'In einer Werkstatt bezeichnet fachliche Tiefe beispielsweise die sichere Diagnose häufiger Fehler. Fachliche Breite zeigt sich daran, dass Diagnose, Materialfluss und Kundenübergabe sinnvoll verbunden werden. Strategisches Denken kann die begründete Entscheidung zwischen zwei Wartungsplänen zeigen. Die Leitung dokumentiert Beispiele je Kriterium und bewertet sie getrennt.'],
      ['anker', 'Eigene Anker für ein Tätigkeitsmerkmal', 'Für „Übergabequalität“ ließe sich eine dreistufige Skala so konkretisieren. Unter Soll bedeutet, dass regelmäßig mindestens ein erforderlicher Eintrag fehlt. Soll bedeutet, dass alle regulären Pflichtangaben verlässlich vorliegen. Über Soll setzt zusätzlich nachweisbare Klarheit in ungeplanten Sonderfällen voraus. Die Stufen sind ein Beispiel, kein allgemeingültiger Standard.', 'Ergänze bei quantitativen Kriterien stets Bezugsgröße und Ausnahmen. 18 rechtzeitige von 20 vergleichbaren Übergaben entsprechen 90 %. War eine vereinbarte Freigabe extern blockiert, muss das Verfahren klären, ob und wie dieser Fall berücksichtigt wird. Aus einer Kennzahl folgt keine Gesamtbewertung einer Person.'],
    ],
    terms: [
      ['leistungsbeurteilung', 'Leistungsbeurteilung', 'Bewertung der beobachteten Ergebnisse und tätigkeitsbezogenen Leistung in einem bereits vergangenen Zeitraum.'],
      ['potenzialbeurteilung-gespraech', 'Potenzialbeurteilung im Beurteilungsgespräch', 'Auf künftige Aufgaben gerichtete, anhand bisher beobachteter Anhaltspunkte begründete Einschätzung.'],
      ['freie-beurteilung', 'Freie Beurteilung', 'Qualitative Einschätzung, die weitgehend frei formuliert wird und persönliche Maßstäbe stärker zulässt.'],
      ['gebundene-beurteilung', 'Gebundene Beurteilung', 'Einschätzung anhand vorab definierter tätigkeitsbezogener Kriterien und einer einheitlichen Bewertungsskala.'],
    ],
    question: 'Ein neues Teammitglied erfüllt Liefertermine durchgehend, in der Zusammenarbeit fehlen aber Informationen. Wie nutzt du eine gebundene Beurteilung mit Freitext?',
    answer: 'Bewerte Termintreue und Informationsweitergabe getrennt nach den bekannten Kriterien. Ergänze im Freitext beobachtbare Beispiele, Rahmenbedingungen und die Sicht der Person. Vereinbare für die Informationsweitergabe einen konkreten nächsten Schritt, ohne dafür die belegte Termintreue abzuwerten.',
  },
  {
    id: 'beurteilung-gespraechsablauf', parent: 'beurteilungsgespraech', number: '2.2.3', title: 'Ablauf eines Beurteilungsgesprächs',
    intro: 'Das Gespräch ist eine Phase innerhalb des gesamten Beurteilungsverfahrens. Es übersetzt die zuvor vorbereitete Bewertung in einen Dialog und konkrete weitere Schritte.',
    parts: [
      ['vorbereiten', 'Termin und Unterlagen vorbereiten', 'Die Führungskraft schließt Beobachtung, Beschreibung und vorläufige Bewertung ab und benennt das Gesprächsziel. Lade so früh ein, dass beide Seiten konkrete Beispiele sammeln und sich mit Kriterien und möglichen Entwicklungsschritten auseinandersetzen können. Plane ausreichend Zeit und einen ungestörten Raum ein. Dauer und Vorlauf richten sich nach Anlass, Themen und betrieblichen Vereinbarungen.'],
      ['durchfuehren', 'Sechs Phasen im Gespräch', '1. Begrüße die Person und erkläre Ziel, Ablauf und Zeitrahmen. 2. Würdige positive Leistungen und Veränderungen anhand aktueller, relevanter Beispiele. 3. Beschreibe Abweichungen anhand belegbarer Beobachtungen und des bekannten Maßstabs. 4. Bitte um Stellungnahme, höre aktiv zu und kläre offene Tatsachen. Gib der Person genügend eigenen Redeanteil und Raum für Notizen.', '5. Erörtere mit der Person Lern- und Entwicklungsmöglichkeiten und vereinbare Maßnahmen, Verantwortung und Frist. 6. Fasse Verständigungen und bleibende Differenzen zusammen und bedanke dich. Halte die Punkte nachvollziehbar in einem [[gespraechsprotokoll|Gesprächsprotokoll]] fest. Kläre bei einer vorgesehenen Unterschrift, ob sie Empfang oder inhaltliche Zustimmung bedeutet.'],
      ['beispiel', 'Von der Rückmeldung zur Entwicklung', 'Bei einem Disponenten sind frühe Störungsmeldungen positiv belegt. Rückmeldungen zu erledigten Störungen fehlen häufiger. Die Führungskraft nennt Beispiele, der Mitarbeitende berichtet von einem unklaren Eingabefeld. Beide vereinbaren eine eindeutige Kennzeichnung und prüfen nach vier Wochen anhand gemeinsam einsehbarer Fälle, ob der Rückmeldeprozess besser funktioniert.', 'Im Kundenservice zeigt sich dieselbe Logik, wenn ein Teammitglied sorgfältig recherchiert, aber Übergaben verschleppt. Anerkennung und die konkrete Abweichung werden getrennt angesprochen. Eine gemeinsame Testphase mit Standardübergabe und klarer Vertretung liefert Belege zur Auswertung.'],
      ['dokumentieren', 'Vereinbarungen und Widerspruch nachvollziehbar festhalten', 'Unterscheide Bemerkungen der Führungskraft, Stellungnahme und gemeinsame Zusagen. Betriebliche Regeln bestimmen, wie ein Protokoll abgelegt und wem es zugänglich gemacht wird. Ist ein Protokoll Teil der Personalakte, regelt § 83 BetrVG die Einsicht und das Beifügen einer eigenen Erklärung auf Verlangen. Amtliche Fassung unter https://www.gesetze-im-internet.de/betrvg/__83.html.'],
    ],
    terms: [['gespraechsprotokoll', 'Gesprächsprotokoll', 'Dokumentation von Anlass, wesentlichen Ergebnissen, offenen Punkten und Maßnahmen eines Gesprächs.']],
    question: 'Die Mitarbeiterin widerspricht einer Bewertung, ist aber mit der vereinbarten Unterstützung einverstanden. Wie hältst du das Ergebnis fest?',
    answer: 'Halte Bewertung und begründete Gegensicht getrennt fest. Dokumentiere die gemeinsame Unterstützungsmaßnahme mit Termin und Verantwortung. Eine Dokumentation verlangt keine Behauptung vollständiger Einigkeit. Prüfe beim späteren Termin die Maßnahme und gegebenenfalls neu verfügbare Belege.',
  },
  {
    id: 'beurteilungsfehler', parent: 'beurteilungsgespraech', number: '2.2.4', title: 'Beurteilungsfehler erkennen und vermeiden',
    intro: 'Beurteilungen können bereits bei der Beobachtung verzerrt werden. Hinzu kommen Fehler bei der Anwendung von Kriterien und ihren Bewertungsstufen.',
    parts: [
      ['unterschied', 'Wahrnehmung und Maßstab unterscheiden', 'Wahrnehmungsfehler verändern, welche Ereignisse beachtet, erinnert oder interpretiert werden. Maßstabsprobleme entstehen zum Beispiel, wenn jemand eine Skala dauerhaft zu streng, zu mild oder ohne Differenzierung verwendet. Ein standardisierter Bogen behebt Wahrnehmungsfehler allein nicht. Prüfe zu jeder Einstufung, aus welchen Situationen die Belege stammen und welche konkrete Regel du angewandt hast.', 'Eine Führungskraft beachtet fast nur die Zusammenarbeit in Präsentationen (Wahrnehmung), und eine zweite bewertet dieselbe Leistung unter einem überzogenen Anspruch (Maßstab). Die erste braucht vollständigere Beobachtungen. Die zweite benötigt eine Kalibrierung anhand vereinbarter Anforderungen.'],
      ['massnahmen', 'Beobachtungen prüfbar machen', 'Trenne Beobachtungsnotiz und Bewertung, dokumentiere repräsentative Beispiele aus dem gesamten Zeitraum und ziehe mehrere arbeitsbezogene Anhaltspunkte heran. Frage nach eigenen Erwartungen und spontanen Vergleichen. Bewertungen zu identischen Referenzfällen können verschiedene Auslegungen sichtbar machen. Zusätzliche Beurteilende helfen nur, wenn jede Person geeignete Belege liefert und die Einschätzung unabhängig begründet.', 'Prüfe mit der betroffenen Person Rahmenbedingungen und Gegenbelege. Die geteilte Nachvollziehbarkeit erhöht die [[intersubjektivitaet|Intersubjektivität]]. Auch eine gut begründete Einstufung bleibt auf die beobachteten Aufgaben und den Zeitraum begrenzt.'],
      ['weiter', 'Fehlerarten weiter unterscheiden', 'Vertiefe [[>beurteilung-wahrnehmungsfehler|typische Wahrnehmungsfehler]], [[>beurteilung-massstab|Kontrast und Tendenzfehler]] sowie [[>beurteilung-erwartung|Erwartungs- und Beobachtungseffekte]]. Im [[>fall-mitarbeiterbeurteilung|Fall]] verbindest du Diagnose und Gegenmaßnahmen.'],
    ],
    terms: [['intersubjektivitaet', 'Intersubjektive Nachvollziehbarkeit', 'Andere Personen können eine Einschätzung anhand des Kriteriums und der ausgewiesenen Beobachtungen nachvollziehen und prüfen.']],
    question: 'Ein Bogen erlaubt nur vorgegebene Stufen. Weshalb bleiben verzerrte Bewertungen trotzdem möglich?',
    answer: 'Die Auswahlliste vereinheitlicht die Darstellung, entscheidet aber nicht, welche Beobachtungen erfasst werden, ob sie repräsentativ sind oder wie die Stufen interpretiert werden. Beobachtungsbelege, klare Anker, Kalibrierung und ein Gespräch zur Gegensicht sind zusätzliche Maßnahmen.',
  },
  {
    id: 'beurteilung-wahrnehmungsfehler', parent: 'beurteilungsfehler', number: '2.2.4.1', title: 'Halo, Vorurteil, Primacy, Recency und Klebereffekt',
    intro: 'Diese Wahrnehmungsfehler geben einzelnen Eindrücken unverdient viel Gewicht. Entscheidend ist, welcher Eindruck die Beurteilung verzerrt.',
    parts: [
      ['halo-vorurteil', 'Ein Merkmal oder eine Gruppenzuschreibung strahlt aus', 'Beim [[halo-effekt|Halo-Effekt]] färbt ein auffälliges Merkmal auf die Bewertung anderer, davon unabhängiger Kriterien ab. Eine sehr anschauliche Kundenpräsentation wird etwa vorschnell als Beweis für hohe Termintreue behandelt. Ein [[vorurteil-beurteilung|Vorurteil]] setzt Verallgemeinerungen an die Stelle arbeitsbezogener Beobachtungen, etwa wenn fehlende Führungserfahrung pauschal aus einem vermeintlich typischen Gruppenmerkmal abgeleitet wird.', 'Dokumentiere für jedes Kriterium eigene Verhaltensbelege. Prüfe, ob ein Gesamteindruck den Zielmaßstab verdrängt hat und ob du bei einer anderen Person dieselben Befunde gleich beurteilen würdest.'],
      ['zeitliche-fehler', 'Frühe und späte Eindrücke zu stark gewichten', 'Beim [[primacy-effekt|Primacy-Effekt]] prägt eine frühe Beobachtung das Urteil. Eine Person war beim ersten Kundentermin nervös, führte spätere Gespräche aber souverän. Beim [[recency-effekt|Recency-Effekt]] stechen die jüngsten Ereignisse heraus, etwa ein sehr guter Auftrag unmittelbar vor dem Jahresgespräch. In beiden Fällen fehlt die angemessene Betrachtung des gesamten Zeitraums.', 'Beim [[klebeeffekt|Klebereffekt]] bleibt eine alte Einstufung oder Rolle am Bild der Person haften. Eine langjährige Mitarbeiterin gilt weiter als durchschnittlich, obwohl sich ihre aktuelle Leistung nachweislich verändert hat. Sorge für eine neue Bewertung mit heutigen Beobachtungen und prüfe auch Stabilität guter Leistungen.'],
      ['abgrenzung', 'Die dominierende Quelle der Verzerrung bestimmen', 'Beim ersten Eindruck zählt zu stark, was am Anfang geschah. Beim Nikolaus-Effekt zählt zu stark, was zuletzt geschah. Beim Klebereffekt wird ein früheres Urteil oder Rollenbild fortgeschrieben. Halo bedeutet, dass ein Eindruck ein anderes Kriterium überstrahlt. Ein konkreter Fall kann mehrere Effekte zugleich enthalten. Begründe den jeweils hervorgehobenen Mechanismus.'],
    ],
    terms: [
      ['halo-effekt', 'Halo-Effekt (Überstrahlungseffekt)', 'Ein auffälliges Merkmal oder ein Gesamteindruck verzerrt die Bewertung anderer Merkmale.'],
      ['vorurteil-beurteilung', 'Vorurteil in der Beurteilung', 'Vorgefasste positive oder negative Einschätzung, bei der pauschale Zuschreibungen überprüfbare individuelle Beobachtungen verdrängen.'],
      ['primacy-effekt', 'Primacy-Effekt', 'Ein früher Eindruck erhält bei der späteren Beurteilung übermäßiges Gewicht.'],
      ['recency-effekt', 'Recency-Effekt (Nikolaus-Effekt)', 'Sehr aktuelle Beobachtungen werden gegenüber älteren Befunden unverhältnismäßig stark gewichtet.'],
      ['klebeeffekt', 'Klebereffekt', 'Ein früheres Urteil oder festes Rollenbild bleibt trotz neuer Belege bestehen.'],
    ],
    question: 'Eine Person meldete anfangs Störungen zu spät, erhöhte die Zuverlässigkeit danach dauerhaft. Ihre Führungskraft begründet die aktuelle Einstufung mit den ersten zwei Meldungen. Was liegt vor und wie korrigierst du es?',
    answer: 'Das ist ein Primacy-Effekt, weil der Anfang der Beurteilungsperiode übergewichtet wird. Sammle über den gesamten Zeitraum vergleichbare Meldungen, erfasse unterschiedliche Situationen und bewerte sie anhand derselben Kriterien. Wird zusätzlich nur die alte Stufe aus der Vorjahresbeurteilung übernommen, kommt ein Klebereffekt in Betracht.',
  },
  {
    id: 'beurteilung-massstab', parent: 'beurteilungsfehler', number: '2.2.4.2', title: 'Kontrastfehler und Tendenzfehler',
    intro: 'Ein Urteil kann durch ungeeignete Vergleichspersonen oder einen verzerrt angewandten Beurteilungsmaßstab verfälscht werden.',
    parts: [
      ['kontrast', 'Die falsche Referenz erkennen', 'Ein [[kontrastfehler|Kontrastfehler]] entsteht, wenn sich die Einstufung am eigenen Arbeitsstil, einer sehr starken Vergleichsperson oder einem anderen unpassenden Bezugspunkt orientiert. Die Leistung einer Vertriebsmitarbeiterin kann etwa als schwach erscheinen, weil unmittelbar zuvor eine außergewöhnlich erfolgreiche Person beurteilt wurde. Entscheidend bleibt, welche Anforderungen zur jeweiligen Rolle und dem bewerteten Zeitraum gehören.', 'Eine Führungskraft bevorzugt ihre eigene kleinteilige Arbeitsplanung. Ein Mitarbeitender nutzt wirksam einen anderen Ablauf. Beurteile belegte Sorgfalt und Zielerreichung anhand der Stellenanforderung. Wo ein konkreter Ablauf verbindlich ist, prüfe seine Einhaltung getrennt von eigener Gewohnheit.'],
      ['tendenzen', 'Milde, Strenge und Mitte unterscheiden', 'Bei der [[tendenz-milde|Tendenz zur Milde]] werden Stufen zu günstig vergeben, etwa aus Sympathie oder zur Konfliktvermeidung. Bei der [[tendenz-strenge|Tendenz zur Strenge]] liegen die faktisch angewandten Anforderungen systematisch über dem gültigen Maßstab. Bei der [[tendenz-mitte|Tendenz zur Mitte]] wird unabhängig von den Befunden bevorzugt die mittlere Stufe gewählt, etwa aus Bequemlichkeit, Unsicherheit oder mangels Daten.', 'Fehlende Beobachtung sollte als unzureichende Grundlage erfasst werden. Verständliche Skalenanker und gemeinsame Bewertung von Referenzfällen kalibrieren Maßstäbe. Auffällige Verteilungen liefern einen Prüfanlass. Sie rechtfertigen keine Zwangsquote, weil die tatsächlichen Leistungen unterschiedlich verteilt sein können.'],
    ],
    terms: [
      ['kontrastfehler', 'Kontrastfehler', 'Verzerrung, weil eine Beobachtung an einem ungeeigneten Bezugspunkt wie der eigenen Arbeitsweise oder einer anderen Person gemessen wird.'],
      ['tendenz-milde', 'Tendenz zur Milde', 'Systematisch zu positive Bewertung im Verhältnis zu den vorgegebenen Kriterien.'],
      ['tendenz-strenge', 'Tendenz zur Strenge', 'Systematisch zu negative Bewertung im Verhältnis zu den vorgegebenen Kriterien.'],
      ['tendenz-mitte', 'Tendenz zur Mitte', 'Übermäßige Nutzung mittlerer Skalenstufen unabhängig von belegten Leistungsunterschieden.'],
    ],
    question: 'Eine Führungskraft setzt bei nahezu allen Kriterien „entspricht“, obwohl die Belege beim selben Team von deutlich zu hoch bis deutlich zu niedrig reichen. Wie verbesserst du die Einstufung?',
    answer: 'Die Angaben deuten auf eine Tendenz zur Mitte. Lass Referenzfälle mit konkret beschriebenen Ankern bewerten und verlange Belege je Kriterium. Bei tatsächlich unzureichenden Informationen ergänze Beobachtungen oder kennzeichne die fehlende Grundlage. Eine feste Verteilung nach Schulnoten ist dafür ungeeignet.',
  },
  {
    id: 'beurteilung-erwartung', parent: 'beurteilungsfehler', number: '2.2.4.3', title: 'Erwartungs- und Beobachtungseffekte',
    intro: 'Erwartungen und die Beobachtungssituation können beeinflussen, welches Verhalten überhaupt sichtbar wird und wie Beobachtungen interpretiert werden.',
    parts: [
      ['rosenthal', 'Erwartungen können Gelegenheiten verändern', 'Der [[rosenthal-effekt|Rosenthal-Effekt]] bezeichnet den Einfluss von Erwartungen auf Verhalten oder Ergebnisse. Eine Führungskraft hält zwei Personen für besonders geeignet, gibt ihnen häufiger schwierige Aufgaben und hilfreiches Feedback. Die so geförderte Entwicklung scheint später die ursprüngliche Einschätzung zu bestätigen. Dieses Muster kann eine sich selbst erfüllende Prophezeiung sein. Es ist von einem bloßen voreiligen Urteil ohne Verhaltenswirkung zu unterscheiden.', 'Lege reale Entwicklungschancen und Beobachtungsmöglichkeiten nach gleichen Anforderungen fest. Prüfe, welche Unterstützung und Gelegenheit vorlagen, bevor du Unterschiede der Person zuschreibst.'],
      ['hawthorne', 'Die Beobachtungssituation mitdenken', 'Mit [[hawthorne-effekt|Hawthorne-Effekt]] ist in diesem Zusammenhang gemeint, dass die Teilnahme an einer Beobachtung oder gesteigerte Aufmerksamkeit Verhalten verändern kann. Ein Team prüft die Checkliste besonders sorgfältig, solange die Leitung danebensteht. Ein Einzeltermin kann daher den Alltag verzerrt abbilden. Beobachte mehrere normale und nicht nur angekündigte Arbeitssituationen im vereinbarten Rahmen und nutze geeignete Prozessbelege.'],
      ['assimilation', 'Angleichung statt Kontrast unterscheiden', 'Bei einem [[assimilationseffekt|Assimilationseffekt]] können Bewertungen an einen Bezugsrahmen oder vorhandenen Eindruck angeglichen werden. Nach einem sehr positiven Teamurteil erscheinen mittlere Einzelleistungen ebenfalls besser. Ein Kontrastfehler würde die mittlere Einzelleistung gerade wegen des starken Umfelds schlechter erscheinen lassen. Prüfe die Ergebnisse daher anhand festgelegter Anker und Fallbelege, bevor du Kontexturteile einbeziehst.'],
    ],
    terms: [
      ['rosenthal-effekt', 'Rosenthal-Effekt (Pygmalion-Effekt)', 'Erwartung einer Person beeinflusst Umgang, bereitgestellte Gelegenheiten oder Rückmeldung und kann dadurch das Verhalten oder Ergebnis einer anderen Person beeinflussen.'],
      ['hawthorne-effekt', 'Hawthorne-Effekt', 'Bezeichnung für mögliche Verhaltensänderungen aufgrund besonderer Aufmerksamkeit oder der Teilnahme an einer Beobachtung.'],
      ['assimilationseffekt', 'Assimilationseffekt in der Beurteilung', 'Eine Einstufung wird in Richtung eines umgebenden Eindrucks, einer Erwartung oder eines Bezugsrahmens verschoben.'],
    ],
    question: 'Ein Team hält neue Mitarbeitende für besonders lernfähig und gibt ihnen häufiger anspruchsvolle Fälle. Geprüfte Abläufe funktionieren vor allem dann, wenn die Führungskraft zuschaut. Welche zwei Effekte kommen in Betracht?',
    answer: 'Die Verteilung von Lerngelegenheiten nach Erwartung kann einen Rosenthal-Effekt begünstigen. Wenn besondere Aufmerksamkeit oder Beobachtung die Ausführung unmittelbar verändert, kommt ein Hawthorne-Effekt in Betracht. Sorge für vergleichbare Lerngelegenheiten und gewinne passende Belege aus mehreren normalen Arbeitssituationen.',
  },
  {
    id: 'fall-mitarbeiterbeurteilung', parent: 'kommunikation', number: '2.3', title: 'Übungsfall zur Mitarbeitendenbeurteilung',
    intro: 'Ein regionaler Servicedienstleister will Mitarbeitende auf zusätzliche fachliche Verantwortung vorbereiten. Zwei Führungskräfte beurteilen bisher ähnliche Leistungen unterschiedlich und Beschäftigte bezweifeln die Aussagekraft einzelner Beobachtungen.',
    parts: [
      ['lage', 'Vier Beobachtungen aus der Vorbereitung', 'Lea gilt wegen einer überzeugenden Kundendemo automatisch als zuverlässig bei allen Zusagen. Bei Kemal prägt vor allem ein gelungener Auftrag zwei Tage vor dem Jahresgespräch die gesamte Bewertung. Eine Führungskraft wertet Noor ab, weil ihre Aufgabenplanung anders organisiert ist als die eigene, obwohl die Vereinbarungen eingehalten werden. Anton erhält regelmäßig herausfordernde Einsätze und intensives Coaching, weil seine Leitung ihn schon vorab für besonders geeignet hielt.'],
      ['auftrag', 'Diagnostiziere und entwickle eine Maßnahme', 'Ordne allen vier Szenen einen Beobachtungsfehler oder -effekt zu und begründe jede Zuordnung. Entwickle eine konkrete Maßnahme für das künftige Verfahren. Beschreibe wer sie anwendet, welche Belege entstehen und wie zwei Beurteilende widersprüchliche Urteile prüfen.'],
      ['hilfe', 'Die belegbare Leistung im Blick behalten', 'Der Betrieb sollte [[>beurteilung-ziele|gemeinsame Grundsätze]] vor Beginn bekannt machen und [[>beurteilungssysteme|Leistungs- und Potenzialmessung]] trennen. Selbstreflexion hilft, eigene Vergleichspersonen, Erwartungen und spontane Eindrücke zu bemerken. Betroffene Mitarbeitende erhalten Gelegenheit, die Sachlage aus ihrer Sicht zu erläutern.'],
    ],
    terms: [],
    question: 'Welche vier Effekte passen zu den Szenen und wie machst du die Einschätzungen nachvollziehbar?',
    answer: 'Lea: Halo-Effekt, weil die Präsentationsstärke auf ein anderes Kriterium übertragen wird. Kemal: Recency-Effekt, weil der jüngste Erfolg die ganze Periode überlagert. Noor: Kontrastfehler, weil das eigene Vorgehen einer Leitung als unpassender Maßstab dient. Anton: Rosenthal-Effekt, weil die Erwartung zu zusätzlichen Entwicklungsgelegenheiten führt.\n\nEine konkrete Maßnahme ist die regelmäßige kriterienbezogene Beobachtung mit anschließender Kalibrierung. Beide Leitungen dokumentieren bei vergleichbaren Fallarten Datum, beobachtetes Verhalten und Arbeitsbedingungen getrennt von der Einstufung. Vor dem Gespräch stufen sie neutrale Referenzfälle unabhängig mit denselben Stufenankern ein und klären Abweichungen. Die Belege über die gesamte Periode machen die Bewertung prüfbar, ohne die verbleibende Urteilskomponente zu verschweigen.',
  },
];

const subjectId = 'fuehrung-zusammenarbeit';
const idFor = (id: string) => `fz-${id}`;

function richText(value: string): RichText[] {
  return value.split(/(\[\[[^\]]+\]\])/).filter(Boolean).map(span => {
    const match = /^\[\[(>?)([^|]+)\|([^\]]+)\]\]$/.exec(span);
    if (!match) return { text: span };
    const [, article, id, text] = match;
    return article ? { text, articleId: idFor(id) } : { text, termId: idFor(id) };
  });
}

export const chapters: Chapter[] = lessons.map(lesson => ({
  id: idFor(lesson.id),
  subjectId,
  ...(lesson.parent ? { parentId: idFor(lesson.parent) } : {}),
  number: lesson.number,
  title: lesson.title,
  articleId: idFor(lesson.id),
}));

export const articles: Article[] = lessons.map(lesson => {
  const sections: ArticleSection[] = lesson.parts.map(([id, title, ...paragraphs]) => ({
    id,
    title,
    paragraphs: paragraphs.map(richText),
  }));
  sections.push({
    id: 'transferfrage',
    title: 'Selbstkontrolle',
    paragraphs: [[{ text: lesson.question }]],
    hint: { title: 'Musterantwort', content: lesson.answer },
  });
  return {
    id: idFor(lesson.id),
    chapterId: idFor(lesson.id),
    subjectId,
    number: lesson.number,
    title: lesson.title,
    intro: lesson.intro,
    sections,
    updatedAt: Date.UTC(2026, 10, 18),
    version: 1,
  };
});

export const glossary: GlossaryTerm[] = lessons.flatMap(lesson => lesson.terms.map(([id, term, definition]) => ({
  id: idFor(id),
  articleId: idFor(lesson.id),
  subjectId,
  term,
  definition,
})));
