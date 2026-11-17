import type { Article, Chapter, GlossaryTerm, InventoryChart } from '../types';
import { logisticsDeepening } from './logistik-vertiefung';
import { logisticsBook } from './logistik-buch';
import { logisticsPractice } from './logistik-praxis';

export interface Lesson {
  id: string;
  chapterId?: string;
  parent: string;
  number: string;
  title: string;
  intro: string;
  sections: [title: string, ...paragraphs: string[]][];
  example: string;
  calculation?: string;
  question: string;
  answer: string;
  glossary?: [term: string, definition: string];
  practiceCase?: true;
  inventoryChart?: InventoryChart;
}

const introductoryLessons: Lesson[] = [
  {
    id: 'teilbereiche', parent: 'grundlagen', number: '1.1.2', title: 'Teilbereiche der Logistik',
    intro: 'Ein Maschinenbauer liefert ein Ersatzteil bis 10 Uhr. Damit das gelingt, müssen mehrere Teilbereiche ineinandergreifen – vom Nachschub bis zur Rücknahme.',
    sections: [
      ['Vom Lieferanten in die Fertigung', 'Die Beschaffungslogistik organisiert den Zufluss von Material vom Lieferanten bis zur Annahme im Betrieb. Die Produktionslogistik versorgt damit die Arbeitsplätze und steuert innerbetriebliche Wege, Zwischenbestände und Übergaben.'],
      ['Vom Betrieb zum Kunden und zurück', 'Die Distributionslogistik bringt fertige Ware vom Betrieb zum Kunden. Dazu gehören etwa Kommissionieren, Verpacken und Versand. Die Entsorgungslogistik organisiert die Sammlung und Weiterleitung von Reststoffen und Abfällen. Rückführungslogistik umfasst auch gebrauchsfähige Rücksendungen oder Mehrwegbehälter.'],
    ],
    example: 'Ein Lieferant bringt Dichtungen zum Maschinenbauer. Das interne Lager gibt sie an die Montagestation aus. Der Versand bringt die fertige Baugruppe zum Kunden. Das verschlissene Altteil geht nach der Rücknahme zur Aufbereitung oder Verwertung.',
    question: 'Welchem Teilbereich ordnest du in diesem Fall Anlieferung, Bereitstellung am Montageplatz, Kundenzustellung und Weiterleitung des Altteils zur Verwertung zu?',
    answer: 'Anlieferung: Beschaffungslogistik. Bereitstellung am Montageplatz: Produktionslogistik. Kundenzustellung: Distributionslogistik. Weiterleitung zur Verwertung: Entsorgungslogistik.',
    glossary: ['Distributionslogistik', 'Planung und Abwicklung des Waren- und Informationsflusses vom Anbieter bis zum Kunden.'],
  },
  {
    id: 'zielkonflikte', parent: 'grundlagen', number: '1.1.3', title: 'Ziele und Zielkonflikte',
    intro: 'Für kritische Ersatzteile will der Maschinenbauer kurze Lieferzeiten erreichen. Ein großes Lager hilft dabei, bindet aber Geld. Welche Lösung wirtschaftlich ist, hängt von den Folgen eines Fehlbestands ab.',
    sections: [
      ['Lieferfähigkeit und Wirtschaftlichkeit', 'Die Logistik soll zuverlässig liefern und ihre Gesamtkosten im Blick behalten. Zur Wirtschaftlichkeit gehören neben Transportkosten auch Lagerkosten, Kapitalbindung und die Kosten von Fehlbeständen. Lieferbereitschaft und Termintreue sind verschiedene Größen: Eine Ware kann sofort verfügbar und trotzdem verspätet zugestellt sein.'],
      ['Ziele gemeinsam bewerten', 'Mehr Sicherheitsbestand federt Schwankungen ab, beansprucht aber Platz und Kapital. Gebündelte Transporte senken häufig die Kosten je Sendung, können dafür aber Wartezeit erzeugen. Lege deshalb erst fest, welches Serviceniveau benötigt wird, und vergleiche dann die Gesamtkosten geeigneter Lösungen.'],
    ],
    example: 'Bei häufig benötigten Dichtungen kann ein kleiner Puffer teure Expressfahrten vermeiden. Teure Spezialmotoren, die selten ausfallen, hält der Betrieb nur gezielt vor oder vereinbart für sie einen schnellen Abruf beim Lieferanten.',
    question: 'Warum kann es sinnvoll sein, für die Dichtungen einen Sicherheitsbestand zu halten und für die Spezialmotoren einen schnellen Abruf zu vereinbaren?',
    answer: 'Bei häufig benötigten Dichtungen schützt der Bestand vor Fehlmengen und dringenden Nachlieferungen. Bei teuren, selten benötigten Motoren spart der Abruf Kapitalbindung, sofern der Lieferant den erforderlichen Termin zuverlässig einhalten kann.',
    glossary: ['Kapitalbindung', 'Geld, das in Vermögenswerten wie Vorräten steckt und bis zu ihrer Verwertung für andere Ausgaben fehlt.'],
  },
  {
    id: 'ablauf-beschaffung', parent: 'beschaffung', number: '1.2.1', title: 'Ablauf der Beschaffung',
    intro: 'Eine Bestellung ist ein Schritt in der Beschaffung. Der Ablauf beginnt mit einem Bedarf und endet mit dem Abgleich von Bestellung, Lieferung und Rechnung.',
    sections: [
      ['Bedarf bis Bestellung', 'Die anfordernde Stelle klärt Artikel, Menge, Qualität und Termin. Der Einkauf recherchiert Bezugsquellen, fordert bei Bedarf Angebote an und bewertet Preis, Leistung und Risiken. Nach Freigabe bestellt er zu den vereinbarten Bedingungen.'],
      ['Lieferung bis Abschluss', 'Der Einkauf verfolgt Termin und Auftragsbestätigung. Der Wareneingang prüft und bucht die Ware, hält Abweichungen fest und meldet sie an die zuständige Stelle. Bei der Rechnungsprüfung werden Bestellung, Wareneingang und Rechnung abgeglichen.'],
    ],
    example: 'Die Montage meldet 50 benötigte Dichtungen für Freitag. Der Einkauf klärt die Spezifikation, vergleicht zwei Angebote und bestellt. Am Freitag kommen 45 Stück. Der Wareneingang bucht die tatsächlich gelieferte Menge und meldet die Differenz.',
    question: 'Welche Schritte liegen zwischen Bedarfsmeldung und Rechnungsfreigabe, und wo fällt die Minderlieferung auf?',
    answer: 'Bedarf konkretisieren, Angebote bewerten, freigeben und bestellen, Termin verfolgen, Lieferung prüfen und buchen, dann Rechnung abgleichen. Die Minderlieferung fällt beim Mengenabgleich im Wareneingang auf und muss in der Rechnungsprüfung berücksichtigt werden.',
    glossary: ['Beschaffungsprozess', 'Ablauf zur Deckung eines betrieblichen Bedarfs von seiner Meldung bis zur Abwicklung und Kontrolle der Lieferung.'],
  },
  {
    id: 'sourcing', parent: 'beschaffung', number: '1.2.2', title: 'Sourcing-Konzepte',
    intro: 'Beim Sourcing entscheidet der Einkauf, wie viele Lieferquellen er nutzt, in welcher Region er einkauft und wie viel Leistung der Lieferant übernimmt.',
    sections: [
      ['Wie viele Bezugsquellen?', 'Single Sourcing konzentriert den Bedarf auf einen Lieferanten. Das kann Bündelungsvorteile bringen und die Zusammenarbeit erleichtern. Dual Sourcing verteilt den Bedarf auf zwei Lieferanten. Multiple Sourcing nutzt mehrere und verringert Abhängigkeiten, sofern die Lieferquellen tatsächlich unterschiedliche Ausfallrisiken haben. Sole Sourcing beschreibt eine Situation mit nur einer verfügbaren Bezugsquelle.'],
      ['Wo und in welcher Form?', 'Local und Global Sourcing beschreiben die räumliche Reichweite der Beschaffung. Beim Modular Sourcing liefert ein Partner eine ganze Baugruppe, beim Teilebezug beschafft der Betrieb einzelne Komponenten. Die Entscheidungen lassen sich kombinieren.'],
    ],
    example: 'Ein Maschinenbauer bezieht eine Standarddichtung bei zwei regionalen Lieferanten. Ein Steuerungsmodul kauft er als komplette Baugruppe von einem spezialisierten Anbieter.',
    question: 'Wie ordnest du den Bezug der Dichtungen ein und welches Risiko kann trotz zweier Lieferanten bleiben?',
    answer: 'Das ist regionales Dual Sourcing. Beide Bezugsquellen können gleichzeitig ausfallen, wenn sie etwa denselben Vorlieferanten nutzen.',
    glossary: ['Dual Sourcing', 'Aufteilung des Bezugs eines Beschaffungsobjekts auf zwei Lieferanten.'],
  },
  {
    id: 'lieferantenmanagement', parent: 'beschaffung', number: '1.2.3', title: 'Lieferantenmanagement und Nutzwertanalyse',
    intro: 'Der niedrigste Angebotspreis führt bei kritischen Teilen nur dann zur besten Wahl, wenn auch Lieferfähigkeit, Qualität und weitere Anforderungen passen.',
    sections: [
      ['Lieferanten auswählen und entwickeln', 'Prüfe zuerst Mindestanforderungen wie technische Freigaben oder Kapazität. Bewerte danach die geeigneten Anbieter anhand gewichteter Kriterien. Nach der Auswahl verfolgt der Einkauf die tatsächliche Leistung und vereinbart bei Bedarf Verbesserungen.'],
      ['Nutzwerte vergleichbar machen', 'Die Gewichte ergeben zusammen 100 %. Vergib auf derselben Skala Punkte und multipliziere die Punkte je Kriterium mit seinem Gewicht. Die Summe ergibt den Nutzwert. Lege Gewichte vor der Bewertung fest und prüfe bei knappem Ergebnis, wie empfindlich die Rangfolge auf Änderungen reagiert.'],
    ],
    example: 'Ein Betrieb gewichtet Liefertreue mit 60 % und Preis mit 40 %. Auf einer Skala von 1 bis 5 erhält A bei diesen Kriterien 5 und 3 Punkte, B erhält 3 und 5 Punkte.',
    calculation: 'A: 5 × 0,60 + 3 × 0,40 = 4,2 Punkte. B: 3 × 0,60 + 5 × 0,40 = 3,8 Punkte. Unter diesen Annahmen liegt A vorn.',
    question: 'Warum gewinnt A, obwohl B beim Preis besser bewertet wird?',
    answer: 'A hat zwei Punkte Vorsprung bei der höher gewichteten Liefertreue. B hat zwei Punkte Vorsprung beim Preis, dessen Gewicht geringer ist. Deshalb erreicht A insgesamt 4,2 statt 3,8 Punkte.',
    glossary: ['Nutzwertanalyse', 'Vergleich von Alternativen durch Kriterien, Gewichte und auf einer gemeinsamen Skala vergebene Punkte.'],
  },
  {
    id: 'angebotsvergleich', parent: 'beschaffung', number: '1.2.4', title: 'Angebotsvergleich und Bezugspreis',
    intro: 'Zwei Anbieter nennen unterschiedliche Listenpreise. Erst nach Abzug von Preisnachlässen und Addition der Bezugskosten ist ihr Preis vergleichbar.',
    sections: [
      ['Bezugskalkulation', 'Vom Listeneinkaufspreis ziehst du den Liefererrabatt ab und erhältst den Zieleinkaufspreis. Skonto berechnest du auf dieser Basis. Nach Abzug des nutzbaren Skontos erhältst du den Bareinkaufspreis. Hinzu kommen die Bezugskosten, etwa für Fracht. Vergleiche Angebote auf gleicher Mengen- und Steuerbasis.'],
      ['Vergleich auswerten', 'Prüfe Zahlungsbedingungen, Lieferzeit, Qualität und Mindestabnahme. Wenn ein Anbieter teurer ist, kann seine kürzere oder zuverlässigere Belieferung Fehlmengenkosten vermeiden.'],
    ],
    example: 'Für 100 Stück nennt Anbieter A netto 1.000 €, 10 % Rabatt, 2 % nutzbares Skonto und 40 € Fracht. Anbieter B nennt für dieselbe Menge 935 € netto frei Lieferort ohne Nachlässe.',
    calculation: 'A: 1.000 € − 100 € Rabatt = 900 €. Skonto = 900 € × 2 % = 18 €. Bezugspreis = 900 € − 18 € + 40 € = 922 €. B: 935 €. A ist 13 € günstiger.',
    question: 'Welches Angebot hat den niedrigeren Bezugspreis, wenn der Betrieb das Skonto nutzen kann?',
    answer: 'A mit 922 € gegenüber 935 € bei B. Das Skonto berechnet sich aus 900 € nach Rabatt. Nach dem Skonto kommen 40 € Fracht hinzu.',
    glossary: ['Bezugspreis', 'Bareinkaufspreis zuzüglich der vom Käufer getragenen Bezugskosten.'],
  },
  {
    id: 'abc-analyse', parent: 'analysetechniken', number: '1.2.5.1', title: 'ABC-Analyse',
    intro: 'Die ABC-Analyse zeigt, auf welche Artikel sich ein großer Teil des betrachteten Werts konzentriert. In der Beschaffung wird häufig der Jahresverbrauchswert verwendet.',
    sections: [
      ['Werte ermitteln und sortieren', 'Multipliziere für jeden Artikel den Jahresverbrauch mit dem Stückpreis. Sortiere die Artikel nach Jahresverbrauchswert absteigend. Berechne den Anteil am Gesamtwert und addiere die Anteile von oben nach unten.'],
      ['Klassen und Maßnahmen', 'Teile die sortierten Artikel anhand der vorgegebenen Klassengrenzen ein. A-Artikel verdienen bei wertbezogener Betrachtung besonders viel Aufmerksamkeit. Sicherheitskritische Teile können auch bei geringem Wert eine enge Überwachung benötigen.'],
    ],
    example: 'Ventile: 100 Stück zu 80 €. Gehäuse: 50 Stück zu 30 €. Dichtungen: 500 Stück zu 1 €.',
    calculation: 'Jahreswerte: 8.000 €, 1.500 € und 500 €, zusammen 10.000 €. Sortierte Wertanteile: 80 %, 15 %, 5 %. Kumuliert: 80 %, 95 %, 100 %. Bei Grenzen bis 80 % und bis 95 % ergeben sich hier die Klassen A, B und C in dieser Reihenfolge.',
    question: 'Warum stehen die Dichtungen hier trotz größter Stückzahl in Klasse C?',
    answer: 'Die Einteilung richtet sich nach dem Jahresverbrauchswert. 500 Dichtungen zu 1 € ergeben nur 500 €, also 5 % des Gesamtwerts. Die Ventile haben mit 8.000 € den größten Wertanteil.',
    glossary: ['Jahresverbrauchswert', 'Verbrauchsmenge eines Artikels pro Jahr multipliziert mit seinem Stückpreis.'],
  },
  {
    id: 'xyz-analyse', parent: 'analysetechniken', number: '1.2.5.2', title: 'XYZ-Analyse und ABC-XYZ-Matrix',
    intro: 'Die XYZ-Analyse unterscheidet Artikel danach, wie regelmäßig ihr Verbrauch ist und wie gut er sich vorhersagen lässt.',
    sections: [
      ['X, Y und Z', 'X-Artikel haben einen eher gleichmäßigen Verbrauch. Bei Y-Artikeln schwankt er, etwa saisonal oder aufgrund eines Trends. Z-Artikel werden unregelmäßig und schwer planbar verbraucht. Nutze vergleichbare Zeiträume und prüfe, ob ein Muster durch einzelne Großaufträge oder fehlende Bestände verzerrt ist.'],
      ['Wert und Prognose kombinieren', 'In der ABC-XYZ-Matrix verbindet der Betrieb den Wertanteil mit der Vorhersagbarkeit. AX spricht bei zuverlässiger Versorgung für eng geplante Abrufe. Bei AZ verdienen Beschaffungszeit, Ausfallfolgen und Alternativen eine genauere Prüfung.'],
    ],
    example: 'Ein teures Ventil wird jeden Monat etwa gleich oft verbaut. Ein ebenfalls teurer Spezialmotor wird fast nur bei ungeplanten Ausfällen benötigt.',
    question: 'Welche Kombination passt zu Ventil und Motor, wenn beide aufgrund ihres Verbrauchswerts A-Artikel sind?',
    answer: 'Das regelmäßig benötigte Ventil ist AX. Der unregelmäßig benötigte Spezialmotor ist AZ. Der Wert ist in beiden Fällen hoch, aber die Planbarkeit unterscheidet sich.',
    glossary: ['XYZ-Analyse', 'Klassifizierung von Artikeln nach der Regelmäßigkeit und Prognostizierbarkeit ihres Verbrauchs.'],
  },
  {
    id: 'beschaffungsstrategien', parent: 'beschaffungsplanung', number: '1.3.1', title: 'Vorrats-, Einzel- und fertigungssynchrone Beschaffung',
    intro: 'Die Beschaffungsstrategie entscheidet, ob ein Betrieb Material auf Lager hält, erst nach einem konkreten Bedarf bestellt oder zeitgenau zur Fertigung liefern lässt.',
    sections: [
      ['Vorrat und Einzelbeschaffung', 'Vorratsbeschaffung sichert die Verfügbarkeit durch Bestände und eignet sich etwa für häufig verbrauchte Standardteile. Einzelbeschaffung startet nach einem konkreten Bedarf und spart Lagerbestand, wenn der Kunde oder die Produktion die Beschaffungszeit einplanen kann.'],
      ['Fertigungssynchrone Beschaffung', 'Bei Just-in-Time trifft Material passend zum Produktionsbedarf ein. Just-in-Sequence verlangt zusätzlich die passende Reihenfolge für die Montage. Beide Verfahren brauchen verlässliche Lieferanten, definierte Zeitfenster und schnellen Informationsaustausch. Störungen können direkt auf die Fertigung durchschlagen.'],
    ],
    example: 'Häufig benötigte Schrauben liegen auf Vorrat. Ein kundenindividuelles Gehäuse wird erst nach Auftrag beschafft. Unterschiedliche Module für laufende Montageaufträge kommen in der Reihenfolge des Produktionsplans.',
    question: 'Welche Strategie passt jeweils zu Schrauben, Gehäuse und Montageteilen, und warum?',
    answer: 'Schrauben: Vorratsbeschaffung wegen des laufenden Verbrauchs. Gehäuse: Einzelbeschaffung, weil es einem konkreten Auftrag zugeordnet ist. Montageteile: Just-in-Sequence, weil Zeitpunkt und Reihenfolge stimmen müssen.',
    glossary: ['Just-in-Sequence', 'Fertigungssynchrone Belieferung in der für die Montage erforderlichen Reihenfolge.'],
  },
  {
    id: 'bedarfsarten', parent: 'bedarfsrechnung', number: '1.3.2.1', title: 'Bedarfsarten und Bedarfsermittlung',
    intro: 'Aus dem geplanten Verkauf eines Produkts lässt sich ableiten, welche Teile die Fertigung braucht. Für andere Materialien ist der bisherige Verbrauch die bessere Grundlage.',
    sections: [
      ['Primär-, Sekundär- und Tertiärbedarf', 'Primärbedarf sind die benötigten Enderzeugnisse und gegebenenfalls direkt verkaufte Ersatzteile. Sekundärbedarf umfasst die Teile und Baugruppen, die zur Fertigung des Primärbedarfs nötig sind. Zum Tertiärbedarf zählen Hilfs- und Betriebsstoffe wie Schmierstoffe.'],
      ['Stückliste oder Verbrauch?', 'Die programmorientierte Ermittlung leitet den Teilebedarf aus Produktionsprogramm und Stückliste ab. Die verbrauchsorientierte Ermittlung prognostiziert künftigen Bedarf aus Vergangenheitsdaten. Bei wenig belastbaren Daten kann der Betrieb den Bedarf begründet schätzen.'],
    ],
    example: 'Der Betrieb plant 40 Baugruppen mit je zwei Dichtungen und drei Schrauben. Reinigungsmittel wird nach dem bisherigen Verbrauch disponiert.',
    calculation: 'Dichtungen: 40 × 2 = 80 Stück. Schrauben: 40 × 3 = 120 Stück. Diese Mengen sind Sekundärbedarf vor dem Abgleich mit Beständen.',
    question: 'Wie viel Sekundärbedarf entsteht für die Dichtungen, und warum nutzt du dafür die Stückliste?',
    answer: '80 Dichtungen. Die Stückliste gibt zwei Dichtungen je Baugruppe vor, und aus dem Produktionsprogramm kommen 40 Baugruppen.',
    glossary: ['Sekundärbedarf', 'Bedarf an Rohstoffen, Teilen und Baugruppen, der zur Deckung des Primärbedarfs entsteht.'],
  },
  {
    id: 'nettobedarf', parent: 'bedarfsrechnung', number: '1.3.2.2', title: 'Brutto- und Nettobedarf',
    intro: 'Der Bruttobedarf gibt an, wie viel insgesamt benötigt wird. Der Nettobedarf zeigt, welche Menge nach Abgleich mit nutzbaren Beständen und Zugängen noch zu beschaffen ist.',
    sections: [
      ['Vom Brutto- zum Nettobedarf', 'Zum Teilebedarf kann ein Zusatzbedarf kommen, etwa für Ausschuss. Ziehe zur Deckung nutzbare Bestände und bis zum Bedarfstermin sichere Zugänge ab. Bereits für andere Aufträge reservierte Mengen und ein einzuhaltender Sicherheitsbestand stehen dafür nicht zur Verfügung.'],
      ['Mit Stichtag rechnen', 'Arbeite durchgängig mit derselben Bezugsbasis. Ist in der Aufgabe bereits ein verfügbarer Bestand angegeben, ziehe enthaltene Reservierungen nicht nochmals ab. Ergibt sich ein Überschuss, liegt für diesen Stichtag kein zusätzlicher Bedarf vor.'],
    ],
    example: 'Für Mittwoch lautet der Teilebedarf 100 Stück, hinzu kommen 5 Stück Zusatzbedarf. Von 40 Stück Bestand sind 10 anderweitig reserviert. 20 Stück treffen am Dienstag ein. Ein zusätzlicher Sicherheitsbestand ist im Beispiel nicht vorgesehen.',
    calculation: 'Bruttobedarf: 100 + 5 = 105 Stück. Verfügbar: 40 − 10 + 20 = 50 Stück. Nettobedarf: 105 − 50 = 55 Stück.',
    question: 'Wie ändert sich der Nettobedarf, wenn die 20 Stück erst am Donnerstag eintreffen?',
    answer: 'Er steigt auf 75 Stück. Am Mittwoch sind nur 30 Stück des vorhandenen Bestands verfügbar. 105 − 30 = 75 Stück.',
    glossary: ['Nettobedarf', 'Menge, die zum Bedarfstermin nach Verrechnung mit tatsächlich nutzbaren Beständen und Zugängen noch fehlt.'],
  },
  {
    id: 'stuecklisten', parent: 'bedarfsrechnung', number: '1.3.2.3', title: 'Stückliste und Teileverwendungsnachweis',
    intro: 'Eine Stückliste zeigt, welche Teile ein Produkt braucht. Ein Teileverwendungsnachweis geht den umgekehrten Weg und zeigt, wo ein Teil eingesetzt wird.',
    sections: [
      ['Stückliste auflösen', 'Rechne vom geplanten Endprodukt zu seinen Baugruppen und Einzelteilen. Bei mehreren Ebenen multiplizierst du die Mengen entlang des jeweiligen Pfads. Wird das gleiche Teil an mehreren Stellen benötigt, addierst du die Teilmengen.'],
      ['Betroffene Produkte finden', 'Bei Lieferengpässen oder technischen Änderungen hilft der Teileverwendungsnachweis. Er zeigt, welche Baugruppen und Endprodukte ein Teil enthalten. Mit den Produktionsaufträgen kannst du daraus ableiten, welche Termine betroffen sind.'],
    ],
    example: 'Ein Gerät enthält zwei Baugruppen A mit je drei Dichtungen. Im Grundgehäuse des Geräts steckt eine weitere Dichtung desselben Typs. Geplant sind 20 Geräte.',
    calculation: 'Je Gerät: 2 × 3 + 1 = 7 Dichtungen. Für 20 Geräte: 20 × 7 = 140 Dichtungen vor Bestandsabgleich.',
    question: 'Wie viele Dichtungen werden benötigt, und welches Hilfsmittel zeigt bei einer Sperre der Dichtung alle betroffenen Produkte?',
    answer: '140 Dichtungen. Der Teileverwendungsnachweis zeigt, wo dieser Dichtungstyp eingesetzt wird und welche Produkte damit von der Sperre betroffen sein können.',
  },
  {
    id: 'verbrauchsprognose', parent: 'bedarfsrechnung', number: '1.3.2.4', title: 'Verbrauchsprognose mit gleitendem Mittelwert',
    intro: 'Ein gleitender Mittelwert schätzt den nächsten Verbrauch aus einer begrenzten Zahl jüngerer Perioden. Mit jeder neuen Beobachtung rückt das Fenster weiter.',
    sections: [
      ['Fenster und Gewichtung', 'Beim einfachen gleitenden Mittelwert gehen die letzten Perioden mit gleichem Gewicht ein. Beim gewichteten Verfahren werden die Verbrauchswerte mit Gewichten multipliziert, die zusammen 1 ergeben. So können neuere Perioden stärker berücksichtigt werden.'],
      ['Stabilität und Reaktionszeit', 'Ein kurzes Fenster reagiert schneller auf Veränderungen, springt aber stärker bei einzelnen Ausreißern. Ein längeres Fenster glättet Schwankungen stärker. Prüfe vor der Anwendung, ob Saison, Trend oder einmalige Ereignisse das Ergebnis verzerren.'],
    ],
    example: 'In den letzten drei Monaten wurden 80, 100 und 120 Stück verbraucht, vom ältesten zum jüngsten Monat. Für den gewichteten Mittelwert zählen die Monate mit 20 %, 30 % und 50 %.',
    calculation: 'Einfach: (80 + 100 + 120) ÷ 3 = 100 Stück. Gewichtet: 80 × 0,20 + 100 × 0,30 + 120 × 0,50 = 106 Stück.',
    question: 'Warum ist die gewichtete Prognose hier höher als der einfache Mittelwert?',
    answer: 'Die höheren jüngeren Werte erhalten mehr Gewicht. Besonders der letzte Verbrauch von 120 Stück beeinflusst die Prognose mit 50 % stärker als beim einfachen Mittelwert.',
  },
  {
    id: 'exponentielle-glaettung', parent: 'bedarfsrechnung', number: '1.3.2.5', title: 'Exponentielle Glättung',
    intro: 'Die exponentielle Glättung verbessert eine laufende Verbrauchsprognose anhand des letzten Prognosefehlers. Der Glättungsfaktor bestimmt, wie stark die Prognose reagiert.',
    sections: [
      ['Neue Prognose berechnen', 'Neue Prognose = alte Prognose + α × (letzter Istverbrauch − alte Prognose). Die alte Prognose muss sich dabei auf dieselbe Periode beziehen wie der letzte Istverbrauch. α ist der Glättungsfaktor zwischen 0 und 1.'],
      ['Faktor einordnen', 'Ein hoher Faktor reagiert stärker auf neue Verbrauchswerte und damit auch auf Ausreißer. Ein niedriger Faktor stabilisiert die Prognose, reagiert aber langsamer auf echte Änderungen. Die einfache Glättung modelliert einen ausgeprägten Trend oder Saisonverlauf nicht ausdrücklich.'],
    ],
    example: 'Die bisherige Prognose für Juni lautet 100 Stück. Tatsächlich werden im Juni 130 Stück verbraucht. Der Betrieb setzt α = 0,3 an.',
    calculation: 'Prognose für Juli = 100 + 0,3 × (130 − 100) = 109 Stück.',
    question: 'Was passiert mit der Prognose für Juli, wenn α auf 0,6 erhöht wird?',
    answer: 'Sie steigt auf 118 Stück. Mit α = 0,6 übernimmt die Rechnung 60 % statt 30 % der Abweichung von 30 Stück.',
  },
  {
    id: 'optimale-bestellmenge', parent: 'beschaffungsplanung', number: '1.3.3', title: 'Optimale Bestellmenge',
    intro: 'Große Bestellungen bedeuten weniger Bestellvorgänge und einen höheren durchschnittlichen Bestand. Die optimale Bestellmenge gleicht Bestellkosten und Lagerhaltungskosten im vereinfachten Modell ab.',
    sections: [
      ['Formel und Einheiten', 'Optimale Bestellmenge = √(2 × Jahresbedarf × Bestellkosten je Bestellung ÷ Lagerhaltungskosten je Stück und Jahr). Wenn nur der Lagerhaltungskostensatz angegeben ist, multipliziere ihn als Dezimalzahl mit dem Einstandspreis je Stück.'],
      ['Modellgrenzen', 'Das Grundmodell arbeitet mit konstantem Bedarf, konstanten Bestellkosten und gleichbleibendem Preis. Mengenrabatte, Mindestmengen, Verpackungseinheiten oder Platzgrenzen erfordern einen Vergleich tatsächlich möglicher Bestellmengen.'],
    ],
    example: 'Der Jahresbedarf liegt bei 10.000 Stück. Eine Bestellung kostet 50 €. Der Einstandspreis beträgt 20 € pro Stück, der jährliche Lagerhaltungskostensatz 20 %.',
    calculation: 'Lagerhaltungskosten: 20 € × 0,20 = 4 € pro Stück und Jahr. Bestellmenge: √(2 × 10.000 × 50 ÷ 4) = √250.000 = 500 Stück. Das sind 20 Bestellungen pro Jahr.',
    question: 'Warum steigt die optimale Bestellmenge im Modell, wenn eine Bestellung teurer wird?',
    answer: 'Mit größeren Mengen fallen pro Jahr weniger Bestellungen an. Höhere Bestellkosten machen diese Einsparung wertvoller. Die Formel zeigt das durch die Bestellkosten im Zähler.',
    glossary: ['Optimale Bestellmenge', 'Bestellmenge, bei der im Grundmodell die Summe aus jährlichen Bestell- und Lagerhaltungskosten am kleinsten ist.'],
  },
  {
    id: 'bestellzeitpunkt', parent: 'beschaffungsplanung', number: '1.3.4', title: 'Bestellpunkt, Meldebestand und Bestellrhythmus',
    intro: 'Beim Bestellpunktverfahren löst ein Bestandsniveau die Bestellung aus. Beim Bestellrhythmusverfahren wird an festen Terminen geprüft und aufgefüllt.',
    sections: [
      ['Bestellpunktverfahren', 'Im Grundmodell lautet die Formel: Meldebestand = erwarteter Verbrauch während der Wiederbeschaffungszeit + Sicherheitsbestand. Wird dieser Bestand erreicht, wird nachbestellt. In der Praxis ist zu berücksichtigen, was bereits bestellt oder reserviert ist.'],
      ['Bestellrhythmusverfahren', 'Der Betrieb prüft beispielsweise jeden Montag, welche Menge er bis zum Sollbestand bestellen muss. Die Zeit bis zur nächsten Prüfung und die anschließende Lieferzeit bestimmen, wie lange der vorhandene und eingeplante Bestand reichen soll.'],
    ],
    example: 'Ein Betrieb verbraucht im Schnitt 12 Stück je Arbeitstag. Die Lieferzeit beträgt fünf Arbeitstage, der Sicherheitsbestand 20 Stück.',
    calculation: 'Meldebestand = 12 × 5 + 20 = 80 Stück. Im Grundmodell überbrücken 60 Stück den erwarteten Verbrauch bis zur Lieferung, 20 bleiben als Puffer.',
    inventoryChart: {
      description: 'Am Tag 0 wird beim Meldebestand von 80 Stück bestellt. Bis Tag 5 sinkt der Bestand auf 20 Stück. Die Lieferung von 100 Stück erhöht ihn auf 120 Stück. Am Tag 8 sind noch 84 Stück vorhanden.',
      points: [[0, 80], [5, 20], [5, 120], [8, 84]], days: [0, 5, 8], levels: [20, 80, 120],
    },
    question: 'Wann wird bei den gegebenen Zahlen im Bestellpunktverfahren bestellt, und wie unterscheidet sich das vom Rhythmusverfahren?',
    answer: 'Bei Erreichen von 80 Stück. Im Rhythmusverfahren prüft der Betrieb zu einem festen Termin und bestimmt dann die Auffüllmenge.',
    glossary: ['Meldebestand', 'Bestandsschwelle, bei deren Erreichen im Bestellpunktverfahren der Nachschub ausgelöst wird.'],
  },
  {
    id: 'feinabruf', parent: 'beschaffungsplanung', number: '1.3.5', title: 'Lieferabruf und Feinabruf',
    intro: 'Ein Rahmenvertrag schafft die Basis für wiederkehrende Lieferungen. Abrufe machen daraus konkrete Anweisungen für Mengen, Termine und Anlieferorte.',
    sections: [
      ['Planung und kurzfristige Steuerung', 'Eine längerfristige Vorschau hilft dem Lieferanten bei der Kapazitätsplanung. Der Feinabruf präzisiert kurzfristig, was zu welchem Zeitfenster und gegebenenfalls in welcher Reihenfolge geliefert werden soll. Welche Daten verbindlich sind, hängt von der Vereinbarung ab.'],
      ['Änderungen sichtbar machen', 'Bei schwankender Produktion müssen Änderungen eindeutig versioniert und bestätigt werden. Beide Seiten brauchen einen abgestimmten Prozess für Abweichungen, damit ein veralteter Abruf keine falsche Ware auslöst.'],
    ],
    example: 'Der Lieferant sieht in der Wochenvorschau einen Bedarf von ungefähr 600 Modulen. Der Feinabruf für Dienstag konkretisiert die ersten 40 Module, das Zeitfenster 06:45 bis 07:00 und die Anlieferstelle.',
    question: 'Welche Aufgabe hat der Feinabruf, wenn die Wochenvorschau bereits bekannt ist?',
    answer: 'Er präzisiert kurzfristig die tatsächliche Anlieferung, zum Beispiel Menge, Zeitfenster, Anlieferstelle und Reihenfolge. Die Wochenvorschau dient hauptsächlich der Planung.',
    glossary: ['Feinabruf', 'Kurzfristige Konkretisierung eines Lieferbedarfs mit genauer Menge, Termin und gegebenenfalls Reihenfolge.'],
  },
  {
    id: 'wareneingang', parent: 'materialwirtschaft', number: '2.1.1', title: 'Wareneingang und Qualitätsprüfung',
    intro: 'Der Wareneingang verbindet die Lieferung mit Bestand, Qualitätssicherung und Rechnungsprüfung. Ein sauberer Eintrag macht Abweichungen sichtbar.',
    sections: [
      ['Annahme und Prüfung', 'Gleiche Lieferung und Bestellung ab. Prüfe Identität, Menge und äußerlich erkennbare Schäden. Je nach Material folgen weitere Qualitätsprüfungen, etwa eine Maßprüfung. Dokumentiere Abweichungen und leite sie an die zuständige Stelle weiter.'],
      ['Buchung und Freigabe', 'Buche die tatsächlich erfasste Menge und den passenden Bestandsstatus. Gesperrte Ware bleibt bis zur Entscheidung separat. Nach Freigabe wird die Ware eingelagert oder direkt bereitgestellt.'],
    ],
    example: 'Von 100 bestellten Ventilen fehlen fünf, drei weitere müssen wegen sichtbarer Schäden untersucht werden. Der Betrieb verbucht 95 eingegangene Stück und hält drei davon bis zur Entscheidung gesperrt.',
    question: 'Warum unterscheidet der Betrieb im Beispiel zwischen eingegangener und verfügbarer Menge?',
    answer: '95 Stück sind eingegangen, aber nur 92 stehen zur Nutzung zur Verfügung, wenn die übrigen Stücke freigegeben sind. Drei bleiben gesperrt und fünf wurden gar nicht geliefert.',
  },
  {
    id: 'beschaffungscontrolling', parent: 'materialwirtschaft', number: '2.1.2', title: 'Beschaffungscontrolling und Lieferkennzahlen',
    intro: 'Beschaffungscontrolling zeigt, ob Lieferanten und eigene Prozesse die vereinbarten Ziele erreichen. Kennzahlen brauchen eine klare Definition.',
    sections: [
      ['Termine, Qualität und Kosten', 'Eine mögliche Kennzahl für Termintreue ist der Anteil pünktlicher Lieferungen. Daneben helfen Reklamationsquote, Lieferzeit und Bezugskosten. Definiere je Kennzahl Bezugsgröße, Zeitraum und Toleranz. Bei der Termintreue kann bereits die Wahl zwischen Wunsch- und bestätigtem Termin das Ergebnis verändern.'],
      ['Abweichung untersuchen', 'Vergleiche Ist und Soll und prüfe auffällige Fälle. Eine verspätete Lieferung kann beispielsweise durch den Lieferanten, eine späte Bestellung oder fehlende Annahmekapazität verursacht worden sein. Leite eine Maßnahme aus der Ursache ab.'],
    ],
    example: 'Von 50 Lieferungen kamen 45 innerhalb des vereinbarten Zeitfensters. Das Ziel liegt bei 96 %. Bei drei der fünf verspäteten Anlieferungen hatte der Betrieb selbst zu spät bestellt.',
    calculation: 'Termintreue: 45 ÷ 50 × 100 = 90 %. Abweichung vom Ziel: 6 Prozentpunkte.',
    question: 'Was ergibt die Termintreue, und weshalb wäre es falsch, alle fünf Fälle allein dem Lieferanten anzulasten?',
    answer: 'Die Termintreue beträgt 90 %. Bei drei Fällen wurde intern zu spät bestellt. Die Kennzahl misst das Ergebnis, für eine Maßnahme muss der Betrieb die Ursachen getrennt prüfen.',
    glossary: ['Termintreue', 'Anteil der Aufträge oder Lieferungen, die innerhalb des definierten Lieferzeitfensters erledigt werden.'],
  },
  {
    id: 'lagerarten', parent: 'lagerung', number: '2.2.1.1', title: 'Lagerfunktionen und Lagerarten',
    intro: 'Lager überbrücken Unterschiede zwischen Zulauf und Verbrauch. Je nach Aufgabe stehen Verfügbarkeit, Umschlag oder eine günstige Verteilung im Vordergrund.',
    sections: [
      ['Warum lagern Unternehmen?', 'Ein Lager puffert Schwankungen in Bedarf und Belieferung, versorgt die Produktion und macht Ware für den Versand verfügbar. Ein Umschlaglager hat dagegen vor allem die Aufgabe, Sendungen rasch für die Weiterfahrt neu zu bündeln.'],
      ['Zentral oder dezentral?', 'Ein Zentrallager bündelt Bestände und kann eine effizientere Bestandsführung ermöglichen. Dezentrale Lager liegen näher an Kunden oder Produktion und können kürzere Lieferzeiten bieten. Sie können zusätzliche Bestände und Standorte erfordern.'],
    ],
    example: 'Ein Maschinenbauer hält Standardteile zentral vor und lagert wenige kritische Ersatzteile zusätzlich in zwei Serviceregionen, damit Kunden dort schneller versorgt werden.',
    question: 'Welchen Zielkonflikt muss der Betrieb bei der Wahl regionaler Ersatzteillager abwägen?',
    answer: 'Kürzere Wege und schnellere Versorgung stehen zusätzlichen Beständen, höherer Kapitalbindung und Standortkosten gegenüber.',
  },
  {
    id: 'lagerplatzvergabe', parent: 'lagerung', number: '2.2.1.2', title: 'Lagerplatzvergabe und Entnahmereihenfolge',
    intro: 'Wo die Ware liegt und welche Einheit zuerst entnommen wird, sind zwei getrennte Entscheidungen.',
    sections: [
      ['Feste und flexible Plätze', 'Bei fester Lagerplatzvergabe hat ein Artikel einen zugeordneten Platz. Bei flexibler oder chaotischer Lagerung weist das System unter den geeigneten freien Plätzen einen Platz zu. Damit Mitarbeitende die Ware finden, müssen Ein- und Umlagerungen korrekt erfasst werden.'],
      ['FIFO und FEFO', 'FIFO bedeutet, dass zuerst eingelagerte Ware zuerst entnommen wird. Bei FEFO entscheidet das früheste Ablaufdatum. Beide Reihenfolgen können auseinanderfallen, wenn eine später eingegangene Charge früher abläuft.'],
    ],
    example: 'Charge A kommt am Montag und ist bis Oktober haltbar. Charge B kommt am Mittwoch und läuft im September ab. Beide liegen auf zugewiesenen freien Plätzen.',
    question: 'Welche Charge wird nach FEFO entnommen und welche nach FIFO?',
    answer: 'Nach FEFO Charge B wegen des früheren Ablaufdatums. Nach FIFO Charge A wegen des früheren Wareneingangs.',
    glossary: ['FEFO', 'First Expired, First Out: Entnahme der Ware mit dem frühesten Ablaufdatum.'],
  },
  {
    id: 'lagerkennzahlen', parent: 'lagerung', number: '2.2.1.3', title: 'Lagerbestand, Umschlag und Lagerdauer',
    intro: 'Lagerkennzahlen zeigen, wie viel Bestand ein Betrieb vorhält und wie stark er im Verhältnis zum Verbrauch genutzt wird.',
    sections: [
      ['Durchschnittlicher Bestand und Umschlag', 'Nutze die in der Aufgabe vorgegebenen Stichtage. Eine einfache Näherung ist (Anfangsbestand + Endbestand) ÷ 2. Bei Monatsendbeständen kann der Durchschnitt aus Anfangsbestand plus zwölf Monatsendbeständen, geteilt durch 13, berechnet werden. Lagerumschlag = Jahresverbrauch ÷ durchschnittlicher Lagerbestand. Zähler und Nenner brauchen dieselbe Mengen- oder Wertbasis.'],
      ['Durchschnittliche Lagerdauer', 'Teile die vorgesehenen Tage pro Jahr durch den Umschlag. In vielen kaufmännischen Aufgaben werden 360 Tage verwendet, sofern die Aufgabe keine andere Basis nennt. Ein höherer Umschlag kann Bestände entlasten, muss aber zur gewünschten Lieferbereitschaft passen.'],
    ],
    example: 'Der Bestand eines Artikels liegt zu Jahresbeginn bei 450 und am Jahresende bei 550 Stück. Der Betrieb verbraucht 3.000 Stück pro Jahr. Die Aufgabe verwendet 360 Tage.',
    calculation: 'Durchschnitt = (450 + 550) ÷ 2 = 500 Stück. Umschlag = 3.000 ÷ 500 = 6 pro Jahr. Durchschnittliche Lagerdauer = 360 ÷ 6 = 60 Tage.',
    question: 'Was bedeutet ein Lagerumschlag von 6 in diesem Beispiel, und wie kommst du zur Lagerdauer?',
    answer: 'Der Jahresverbrauch entspricht dem Sechsfachen des durchschnittlichen Bestands. Auf der vorgegebenen 360-Tage-Basis beträgt die durchschnittliche Lagerdauer 360 ÷ 6 = 60 Tage.',
    glossary: ['Lagerumschlag', 'Verhältnis des Verbrauchs oder Wareneinsatzes zum durchschnittlichen Bestand im gleichen Zeitraum.'],
  },
  {
    id: 'kommissionierung', parent: 'kommissionierverfahren', number: '2.2.2.1', title: 'Kommissionierung und Bereitstellung',
    intro: 'Bei der Kommissionierung stellt das Lager Artikel und Mengen nach einem Auftrag zusammen.',
    sections: [
      ['Mensch zur Ware oder Ware zum Menschen', 'Bei Mensch-zur-Ware geht die kommissionierende Person zu den Lagerplätzen. Bei Ware-zum-Menschen befördert etwa ein automatisches Lagersystem die Behälter zur Station. Die Wahl hängt von Auftragsmenge, Sortiment, Wegen und Investitionskosten ab.'],
      ['Einzelaufträge und Sammelentnahme', 'Aufträge können einzeln abgearbeitet oder für gemeinsame Wege gebündelt werden. Bei Sammelentnahme muss die Ware anschließend den richtigen Aufträgen zugeordnet werden. Scans helfen, Identität und Menge zu kontrollieren.'],
    ],
    example: 'Acht Kundenaufträge enthalten verschiedene Mengen derselben Dichtung. Die Person entnimmt die benötigte Gesamtmenge in einem Gang und verteilt sie anhand der Auftragsdaten auf acht Behälter.',
    question: 'Welchen Vorteil hat die Sammelentnahme hier und welches zusätzliche Fehlerrisiko entsteht?',
    answer: 'Der Lagerplatz muss nur einmal angelaufen werden. Beim Sortieren entsteht das Risiko, Stückzahlen oder Artikel dem falschen Auftrag zuzuordnen.',
    glossary: ['Kommissionierung', 'Auftragsbezogenes Zusammenstellen von Artikeln in den jeweils geforderten Mengen.'],
  },
  {
    id: 'fertigungsprinzipien', parent: 'fertigungsarten', number: '3.1.0', title: 'Werkstattfertigung, Fertigungsinseln und Fließfertigung',
    intro: 'Die Anordnung von Arbeitsplätzen beeinflusst Wege, Durchlaufzeiten und Flexibilität in der Produktion.',
    sections: [
      ['Werkstatt und Fließfertigung', 'Bei der Werkstattfertigung stehen gleichartige Arbeitsplätze zusammen. Aufträge nehmen je nach Bearbeitung einen anderen Weg. Das hilft bei Varianten, kann aber Wege und Wartezeiten erhöhen. In der Fließfertigung folgen Arbeitsplätze der Bearbeitungsfolge. Das begünstigt wiederholte Abläufe, macht die Linie aber empfindlicher für Störungen an einzelnen Stationen.'],
      ['Fertigungsinseln', 'Eine Fertigungsinsel bündelt unterschiedliche Arbeitsschritte für eine Produktfamilie. Sie kann Wege gegenüber getrennten Werkstätten verkürzen und Varianten innerhalb der Produktfamilie ermöglichen. Dafür müssen Personal und Betriebsmittel passend organisiert sein.'],
    ],
    example: 'Ein Betrieb bearbeitet kundenspezifische Einzelteile auf verschiedenen Maschinen, montiert ähnliche Baugruppen in einer Insel und fertigt ein Standardprodukt in großer Menge auf einer Linie.',
    question: 'Warum passt die Fertigungsinsel zu ähnlichen Baugruppen mit Varianten?',
    answer: 'Die benötigten Arbeitsschritte liegen eng beieinander, und die Insel kann verschiedene Ausführungen derselben Produktfamilie bearbeiten.',
  },
  {
    id: 'interne-transportsysteme', parent: 'transportsysteme', number: '3.2.1', title: 'Interne Transportsysteme',
    intro: 'Innerbetriebliche Transporte verbinden Wareneingang, Lager, Fertigung und Versand. Fördermittel sollten zu Gütern, Wegen und Durchsatz passen.',
    sections: [
      ['Stetig- und Unstetigförderer', 'Rollenbahnen und Förderbänder transportieren Güter auf einem festen Weg mit kontinuierlicher Fördermöglichkeit. Stapler, Krane und fahrerlose Transportfahrzeuge bewegen Güter in einzelnen Transportvorgängen. Sie decken je nach System flexible Ziele oder besondere Lasten ab.'],
      ['Auswahlkriterien', 'Vergleiche Art und Abmessung der Güter, Wegführung, Durchsatz, Spitzenlast, Platz und Investitionskosten. Berücksichtige die Übergaben: Die schnellste interne Strecke hilft wenig, wenn sich die Ware an der nächsten Station staut.'],
    ],
    example: 'Standardsendungen laufen wiederholt vom Packplatz zur gleichen Sortierung. Große Sonderpaletten werden nur gelegentlich zu wechselnden Toren gebracht.',
    question: 'Welches System passt zu Standardsendungen und welches zu Sonderpaletten?',
    answer: 'Eine feste Förderstrecke passt zum regelmäßigen, einheitlichen Weg der Standardsendungen. Für die Sonderpaletten passt ein geeignetes flexibles Fördermittel, etwa ein Stapler.',
  },
  {
    id: 'externe-transportsysteme', parent: 'transportsysteme', number: '3.2.2', title: 'Externe Transportsysteme und Verkehrsträger',
    intro: 'Der geeignete Verkehrsträger ergibt sich aus dem Auftrag. Liefertermin, Menge, Entfernung und Umschläge wirken zusammen.',
    sections: [
      ['Welche Stärken haben die Verkehrsträger?', 'Straßentransport eignet sich für flexible Verbindungen von Tür zu Tür. Schiene und Schiff können auf geeigneten Relationen große Mengen bündeln. Luftfracht kann bei langen Strecken und hohem Zeitdruck Transitzeit sparen. Vergleiche den gesamten Weg einschließlich Vorlauf, Nachlauf und Übergaben.'],
      ['Direkt oder gebündelt?', 'Eine Direktfahrt reduziert Übergaben und Wartezeiten, kann aber bei kleiner Sendung hohe Kosten verursachen. Eine Sammelgutlösung verteilt Kosten auf mehrere Sendungen und benötigt meist zusätzliche Umschläge.'],
    ],
    example: 'Das Ersatzteil für den Produktionsstillstand muss am selben Vormittag in ein 180 km entferntes Werk. Standardteile für den regulären Bedarf liefert der Betrieb in wiederkehrenden gebündelten Sendungen.',
    question: 'Warum können für denselben Kunden Direktfahrt und Sammelgut sinnvoll sein?',
    answer: 'Bei drohendem Stillstand zählt die kurze, verlässliche Laufzeit der Direktfahrt. Regelmäßige Sendungen mit mehr Vorlauf können gebündelt werden und verursachen häufig weniger Kosten je Sendung.',
  },
  {
    id: 'verpackung', parent: 'verpackungen', number: '3.3.1', title: 'Funktionen der Verpackung',
    intro: 'Eine Verpackung schützt die Ware, erleichtert ihre Handhabung und vermittelt Informationen für Lager und Transport.',
    sections: [
      ['Schutz, Handhabung und Information', 'Je nach Produkt muss die Verpackung etwa Stöße, Feuchtigkeit oder Verschmutzung abhalten. Sie bildet eine handhabbare Einheit und trägt Angaben zur Identifikation oder Behandlung der Ware. Wähle die Verpackung anhand der Belastungen entlang der gesamten Transportkette.'],
      ['Einweg oder Mehrweg?', 'Mehrweg lohnt sich eher, wenn Behälter häufig umlaufen und Rückführung, Reinigung sowie Kontrolle zuverlässig funktionieren. Einweg kann bei verstreuten Zielen einfacher sein. Beurteile Materialeinsatz, Rückwege und gesamte Kosten je Umlauf.'],
    ],
    example: 'Empfindliche Steuerungsmodule fahren regelmäßig zwischen zwei Werken. Ein wiederverwendbarer Behälter hält die Module getrennt und wandert mit der nächsten Rückfahrt wieder zum Lieferanten.',
    question: 'Welche drei Funktionen erfüllt der Behälter, wenn er zusätzlich eine scanbare Kennzeichnung trägt?',
    answer: 'Er schützt die Module, erleichtert das Handhaben als Einheit und liefert über den Code Informationen zur Identifikation und Verfolgung.',
  },
  {
    id: 'warenausgang', parent: 'distribution', number: '3.4.1', title: 'Warenausgang und Distribution',
    intro: 'Der Warenausgang macht aus einem fertigen Auftrag eine übergabefähige Sendung. Die Distribution plant, wie die Sendung ihren Empfänger erreicht.',
    sections: [
      ['Versandbereit machen', 'Prüfe Artikel und Menge, verpacke die Ware, kennzeichne die Packstücke und stelle Unterlagen bereit. Gleiche Packstücke, Lieferadresse, Zeitfenster und Transportauftrag ab, bevor die Sendung übergeben und der Warenausgang gebucht wird.'],
      ['Ankunft und Rückmeldung', 'Bei der Distributionsplanung werden Sendungen gebündelt, Touren geplant und Dienstleister ausgewählt. Eine Statusmeldung oder ein Ablieferbeleg zeigt, ob und wann die Sendung am vorgesehenen Ort angekommen ist.'],
    ],
    example: 'Der Fahrer erhält den Auftragsbezug, die Anzahl der Packstücke, das zuständige Werk und das Zeitfenster. Bei einer Verzögerung kann die Disposition den Kunden anhand dieser Informationen gezielt informieren.',
    question: 'Welche zwei Informationen sind besonders wichtig, wenn ein Kunde mehrere Werke und feste Annahmezeiten hat?',
    answer: 'Die genaue Lieferstelle einschließlich des richtigen Werks und das verbindlich vereinbarte Zeitfenster. Beide Angaben müssen mit dem Transportauftrag übereinstimmen.',
  },
  {
    id: 'ladehilfsmittel', parent: 'verladung', number: '3.5.1', title: 'Ladehilfsmittel und Ladeeinheiten',
    intro: 'Paletten, Gitterboxen und andere Ladungsträger fassen Ware zu Einheiten zusammen. Das erleichtert Umschlag, Lagerung und Transport.',
    sections: [
      ['Passendes Ladehilfsmittel wählen', 'Berücksichtige Form, Gewicht und Empfindlichkeit der Ware sowie die vorgesehenen Fördermittel und Lagerplätze. Eine Gitterbox kann lose robuste Teile bündeln. Eine Palette ermöglicht die Unterfahrbarkeit, setzt aber eine geeignete Sicherung der Ware auf der Palette voraus.'],
      ['Ladungsträger im Umlauf', 'Bei Mehrwegträgern müssen Übergabe, Zustand und Rückführung nachvollziehbar sein. Wenn Tausch vereinbart ist, sollten Art, Menge und nicht getauschte Träger dokumentiert werden.'],
    ],
    example: 'Für eine Lieferung gehen zehn tauschfähige Paletten zum Kunden. Der Fahrer erhält sechs gleichartige Paletten zurück. Die übrigen vier bleiben laut Vereinbarung als offene Rückgabe erfasst.',
    question: 'Was muss die Übergabe in diesem Fall festhalten, damit der offene Bestand nachvollziehbar bleibt?',
    answer: 'Zehn übergebene und sechs zurückerhaltene Paletten sowie vier offene Träger. Ladungsträgerart, Zustand und der Bezug zur konkreten Lieferung gehören ebenfalls zur Dokumentation.',
  },
  {
    id: 'ladungssicherung', parent: 'verladung', number: '3.5.2', title: 'Ladungssicherung und sichere Verladung',
    intro: 'Sichere Verladung schützt vor Bewegungen der Ware und hält das Fahrzeug verkehrssicher. Beides gehört vor der Abfahrt zusammen.',
    sections: [
      ['Beförderungs- und Betriebssicherheit', 'Beförderungssicherheit betrifft das ordnungsgemäße Laden, Stauen und Befestigen des Guts. Betriebssicherheit betrifft das Fahrzeug mit seiner Ladung, etwa Lastverteilung und Verkehrssicherheit. § 412 HGB ordnet grundsätzlich dem Absender die beförderungssichere und dem Frachtführer die betriebssichere Verladung zu. Abweichungen können sich aus den Umständen oder der Verkehrssitte ergeben.'],
      ['Anforderungen zusammen prüfen', '§ 22 StVO verlangt eine Sicherung, die auch bei Vollbremsung oder plötzlichem Ausweichen wirkt. In der Planung sind Eignung von Fahrzeug, Ladeeinheit und Sicherungsmitteln zusammen zu betrachten. Die konkrete Ausführung richtet sich nach Fahrzeug, Ware und den anerkannten Regeln der Technik.'],
    ],
    example: 'Eine schwere Anlage ist als Ladeeinheit gesichert, aber auf dem Fahrzeug zu weit hinten eingeplant. Die Verladung muss auch auf eine zulässige Lastverteilung geprüft und bei Bedarf geändert werden.',
    question: 'Warum genügt es im Beispiel nicht, dass die Anlage auf ihrem Ladungsträger fest sitzt?',
    answer: 'Die stabile Ladeeinheit beantwortet nur einen Teil der Sicherungsfrage. Auch auf dem Fahrzeug müssen insbesondere Lastverteilung und Sicherung gegen Bewegungen für die Fahrt stimmen.',
  },
  {
    id: 'entsorgungslogistik', parent: 'entsorgung', number: '3.6.0', title: 'Entsorgungslogistik und Abfallhierarchie',
    intro: 'Entsorgungslogistik organisiert den Umgang mit Reststoffen und Abfällen. Getrennte Stoffströme halten geeignete Verwertungswege offen.',
    sections: [
      ['Fünf Stufen', 'Die Abfallhierarchie nach § 6 KrWG beginnt mit Vermeidung. Darauf folgen Vorbereitung zur Wiederverwendung, Recycling, sonstige Verwertung und schließlich Beseitigung. Vermeidung setzt an, bevor Abfall entsteht. Bei der Vorbereitung zur Wiederverwendung werden bereits zu Abfall gewordene Produkte etwa geprüft oder repariert.'],
      ['Vom Betrieb zum passenden Weg', 'Erfasse, wo welche Reststoffe entstehen und welche davon getrennt gesammelt werden müssen. Organisiere Lagerung, Abholung und Übergabe passend zum Stoffstrom. Die Rangfolge bildet den Ausgangspunkt. Die tatsächliche Wahl berücksichtigt unter anderem Lebenszyklus und Umweltschutz.'],
    ],
    example: 'Ein Betrieb vermeidet Kartonabfall durch Mehrwegbehälter. Bereits angefallene saubere Kartonagen sammelt er getrennt, damit sie stofflich verwertet werden können.',
    question: 'Welche Stufe betrifft der Wechsel zu Mehrweg und welche das stoffliche Verwerten des Altkartons?',
    answer: 'Wenn durch Mehrweg gar kein Kartonabfall entsteht, ist das Vermeidung. Wird bereits angefallener Altkarton zu neuem Material verarbeitet, ist es Recycling.',
    glossary: ['Abfallhierarchie', 'Gesetzliche Rangfolge der Abfallvermeidung und Abfallbewirtschaftung nach § 6 KrWG.'],
  },
  {
    id: 'produktportfolio', parent: 'portfolio', number: '4.1.2', title: 'Produktportfolio und logistische Komplexität',
    intro: 'Jede zusätzliche Variante kann einen eigenen Bestand, eigene Stammdaten und zusätzliche Umrüstungen verursachen. Der Betrieb kann Varianten vereinfachen, ohne jeden Kundenwunsch aufzugeben.',
    sections: [
      ['Varianten und Aufwand betrachten', 'Vergleiche Absatz, Deckungsbeitrag und strategische Bedeutung mit dem Aufwand für Einkauf, Lager und Fertigung. Berücksichtige Auslaufteile, Ersatzteilbedarf und bestehende Kundenzusagen. Ein niedriger Absatz allein sagt wenig darüber aus, ob eine Variante sinnvoll ist.'],
      ['Gleichteile und späte Differenzierung', 'Gleichteile senken die Zahl unterschiedlicher Komponenten. Wird eine Variante erst spät im Prozess fertiggestellt, kann der Betrieb gemeinsame Grundprodukte auf Vorrat halten und sie nach Auftrag anpassen.'],
    ],
    example: 'Vier Varianten eines Geräts erhalten dasselbe Grundgehäuse. Farbe und Anschlussmodul werden erst nach Auftrag ergänzt. Dadurch kann der Betrieb den Grundbestand für alle Varianten nutzen.',
    question: 'Wie verringert die späte Differenzierung hier den Druck auf die Lagerbestände?',
    answer: 'Der Betrieb muss weniger fertige Varianten separat auf Vorrat halten. Das gemeinsame Grundprodukt deckt mehrere Varianten ab, solange die Endmontage rechtzeitig erfolgen kann.',
  },
  {
    id: 'weltweiter-einkauf', parent: 'rationalisierung', number: '4.2', title: 'Weltweiter Einkauf und Gesamtkosten',
    intro: 'Ein ausländisches Angebot kann beim Stückpreis günstiger sein. Der Vergleich muss zeigen, welche Kosten und Risiken bis zur tatsächlichen Nutzung entstehen.',
    sections: [
      ['Gesamtkosten erfassen', 'Berücksichtige neben dem Warenpreis etwa Transport, Zoll, Qualitätsprüfungen, Bestände und interne Abwicklung. Verwende je Alternative dieselbe Menge und denselben Zeitraum. Wechselkurs und Mindestabnahme können den Vergleich verändern.'],
      ['Versorgungsrisiko bewerten', 'Längere Lieferzeiten können zusätzlichen Bestand erfordern. Prüfe außerdem, wie der Betrieb bei Ausfällen reagieren kann und ob kritische Komponenten aus einer alternativen Quelle verfügbar sind.'],
    ],
    example: 'Ein Fernangebot liegt 8.000 € unter dem regionalen Einkaufspreis. Für die Vergleichsmenge fallen dort zusätzlich 3.000 € für Transport und Zoll, 2.000 € für Qualitätsprüfung und 4.000 € für zusätzliche Lagerhaltung an.',
    calculation: 'Zusatzkosten = 3.000 € + 2.000 € + 4.000 € = 9.000 €. Nach Verrechnung des Preisvorteils ist das Fernangebot in diesem Beispiel insgesamt 1.000 € teurer.',
    question: 'Warum fällt der Gesamtkostenvergleich anders aus als der reine Preisvergleich?',
    answer: 'Transport, Zoll, Qualitätsprüfung und Lagerhaltung verursachen 9.000 € Zusatzkosten. Das übersteigt den Warenpreisvorteil von 8.000 €.',
    glossary: ['Total Cost of Ownership', 'Betrachtung der relevanten Gesamtkosten einer Beschaffungsalternative über den betrachteten Zeitraum.'],
  },
  {
    id: 'muda', parent: 'verschwendung', number: '4.3.1', title: 'Muda und Verschwendung erkennen',
    intro: 'Muda bezeichnet Verschwendung im Ablauf. Wer beobachten kann, wo Arbeit liegen bleibt oder erneut ausgeführt werden muss, findet konkrete Ansatzpunkte zur Verbesserung.',
    sections: [
      ['Typische Verschwendungsarten', 'Dazu gehören Überproduktion, Warten, unnötige Transporte, unnötige Bewegungen, zu hohe Bestände, überflüssige Bearbeitung und Fehler mit Nacharbeit. Manche Modelle ergänzen ungenutzte Fähigkeiten der Mitarbeitenden.'],
      ['Ursache statt Symptom beheben', 'Beobachte den Vorgang am Arbeitsplatz. Manche Schritte sind für Sicherheit, Qualität oder verbindliche Vorgaben erforderlich. Bei wiederholter Nacharbeit lohnt es sich dagegen, die Fehlerquelle im vorgelagerten Prozess zu beseitigen.'],
    ],
    example: 'Die Disposition erfasst eine Lieferadresse im Auftrag. Der Versand tippt sie nochmals in ein zweites System ein und korrigiert regelmäßig Übertragungsfehler.',
    question: 'Welche Verschwendungsarten erkennst du, und welche Änderung setzt an der Ursache an?',
    answer: 'Die doppelte Eingabe ist überflüssige Bearbeitung. Falsche Übertragungen verursachen Fehler und Nacharbeit. Eine gemeinsame Datenquelle oder zuverlässige Übernahme der geprüften Adresse kann beide Ursachen reduzieren.',
  },
  {
    id: 'wertstromanalyse', parent: 'verschwendung', number: '4.3.2', title: 'Wertstromanalyse',
    intro: 'Die Wertstromanalyse zeigt für eine Produktfamilie, wie Material und Informationen fließen und wo zwischen den Arbeitsschritten Zeit verloren geht.',
    sections: [
      ['Ist-Zustand erfassen', 'Gehe den Prozess vom Auftrag bis zur Lieferung durch. Erfasse Bearbeitung, Bestände, Wartezeiten und Informationssignale. Zeichne die tatsächlichen Übergaben und unterscheide Bearbeitungszeit von der gesamten Durchlaufzeit.'],
      ['Soll-Zustand entwickeln', 'Suche den größten sinnvollen Ansatzpunkt und entwirf einen besseren Ablauf. Miss danach erneut, ob sich Durchlaufzeit, Bestand oder Service wie erwartet verändert haben. Lokale Beschleunigung kann wirkungslos bleiben, wenn sich die Warteschlange nur verschiebt.'],
    ],
    example: 'Ein Auftrag braucht 10 Minuten zum Zusammenstellen und 5 Minuten zum Verpacken. Dazwischen wartet er 60 Minuten auf eine Sammelfreigabe. Weitere Zeiten werden im Beispiel ausgeblendet.',
    calculation: 'Bearbeitungszeit: 10 + 5 = 15 Minuten. Durchlaufzeit: 15 + 60 = 75 Minuten. Die Wartezeit macht 60 ÷ 75 = 80 % der Durchlaufzeit aus.',
    question: 'Wo würdest du zuerst ansetzen, wenn der Betrieb die Durchlaufzeit verkürzen will?',
    answer: 'Bei der 60-minütigen Wartezeit auf die Sammelfreigabe. Sie macht den größten Teil der Durchlaufzeit aus. Prüfe, wozu die Freigabe dient und ob sie früher oder häufiger erfolgen kann.',
    glossary: ['Wertstromanalyse', 'Methode zur Darstellung und Untersuchung von Material- und Informationsflüssen über mehrere Prozessschritte.'],
  },
  {
    id: 'kaufvertraege', parent: 'vertragsgrundlagen', number: '5.1.1', title: 'Einkaufs- und Verkaufsverträge',
    intro: 'Ein Kaufvertrag legt fest, was Verkäufer und Käufer voneinander verlangen können. Im logistischen Ablauf müssen seine Anforderungen in prüfbare Daten übersetzt werden.',
    sections: [
      ['Pflichten und Vertragsinhalt', 'Nach § 433 BGB muss der Verkäufer die Sache übergeben, Eigentum verschaffen und sie frei von Sach- und Rechtsmängeln liefern. Der Käufer muss sie abnehmen und den vereinbarten Preis zahlen. Für die Abwicklung sollten unter anderem Artikel, Menge, Beschaffenheit, Termin, Ort und Preis eindeutig feststehen.'],
      ['Abweichungen rechtzeitig melden', 'Ist der Kauf für beide Seiten ein Handelsgeschäft, sieht § 377 HGB grundsätzlich eine unverzügliche Untersuchung nach Ablieferung im betrieblich zumutbaren Umfang und eine unverzügliche Mängelanzeige vor. Zeigt sich ein zunächst nicht erkennbarer Mangel erst später, ist er unverzüglich nach Entdeckung anzuzeigen.'],
    ],
    example: 'Ein Betrieb bestellt 40 spezifizierte Ventile. Im Wareneingang fällt auf, dass fünf die falsche Anschlussgröße haben. Der Betrieb dokumentiert die Abweichung und meldet sie umgehend an den Verkäufer.',
    question: 'Warum gehört die falsche Anschlussgröße sowohl in den Wareneingang als auch sofort an den Einkauf oder die zuständige Stelle?',
    answer: 'Die Anschlussgröße betrifft die vereinbarte Beschaffenheit. Die Dokumentation sperrt die betroffenen Stücke für die Nutzung und ermöglicht bei einem beiderseitigen Handelsgeschäft die unverzügliche Mängelanzeige an den Verkäufer.',
  },
  {
    id: 'incoterms', parent: 'vertragsgrundlagen', number: '5.1.2', title: 'Incoterms und Lieferbedingungen',
    intro: 'Incoterms sind von der Internationalen Handelskammer veröffentlichte Lieferklauseln. Die Parteien können damit Aufgaben, Kosten und Gefahr für die Lieferung aufteilen.',
    sections: [
      ['Ort, Klausel und Fassung', 'Eine Vereinbarung nennt die Klausel, den möglichst genauen Ort und die Fassung, etwa „DAP Werk 2, Tor 4, Wuppertal, Incoterms® 2020“. Geschäftspunkte wie Zahlung und Eigentumsübergang gehören gesondert in den Vertrag.'],
      ['Kosten und Gefahr unterscheiden', 'Die Klausel bestimmt, welche Partei welche Transport- oder Abfertigungsaufgaben übernimmt und wann die Gefahr übergeht. Kosten- und Gefahrübergang können je nach Klausel an unterschiedlichen Punkten liegen. Bei DAP stellt der Verkäufer die Ware am benannten Ort auf dem ankommenden Beförderungsmittel entladebereit zur Verfügung.'],
    ],
    example: 'Ein Lieferant liefert unter DAP zum benannten Tor des Käufers. Der Lkw steht dort mit der entladebereiten Ware, die der Käufer anschließend entlädt.',
    question: 'Warum sollte in „DAP Wuppertal“ der genaue Lieferort ergänzt werden?',
    answer: 'Der benannte Ort bestimmt, wo der Verkäufer die Ware entladebereit bereitstellen muss und wo die Gefahr bei DAP übergeht. Ein Werk und Tor lassen sich eindeutig zuordnen.',
    glossary: ['Incoterms', 'Standardisierte Lieferklauseln der ICC zur Aufteilung bestimmter Pflichten, Kosten und Risiken zwischen Verkäufer und Käufer.'],
  },
  {
    id: 'zollunion', parent: 'zollrecht', number: '5.2.1', title: 'EU-Zollunion und Unionswaren',
    intro: 'Ob ein Vorgang zollrechtlich eine Einfuhr oder Ausfuhr ist, hängt unter anderem vom Zollgebiet und vom Status der Ware ab.',
    sections: [
      ['Binnenverkehr und Außengrenze', 'Die EU-Zollunion erhebt unter ihren Mitgliedstaaten keine Binnenzölle und nutzt gegenüber Drittländern einen gemeinsamen Zolltarif. Für die Beurteilung einer konkreten Route ist das Zollgebiet der Union maßgeblich. Besondere Gebiete und Waren können eigene Vorgaben haben.'],
      ['Status und Ursprung unterscheiden', 'Ware aus einem Drittland kann nach Überlassung zum zollrechtlich freien Verkehr den Status einer Unionsware erhalten. Ihr Warenursprung ändert sich durch die Abfertigung allein nicht.'],
    ],
    example: 'Ventile aus Japan werden in Rotterdam zum freien Verkehr überlassen und anschließend nach Deutschland geliefert. Der Weitertransport erfolgt innerhalb des EU-Zollgebiets.',
    question: 'Warum können die Ventile Unionswaren sein und trotzdem ihren japanischen Ursprung behalten?',
    answer: 'Der Status beschreibt ihre Stellung im Zollgebiet nach der Überlassung. Der Ursprung beschreibt nach den jeweiligen Regeln die Herkunft aufgrund von Gewinnung oder Herstellung. Abfertigung allein ändert den Ursprung nicht.',
  },
  {
    id: 'direkter-indirekter-aussenhandel', parent: 'zollrecht', number: '5.2.2', title: 'Direkter und indirekter Import und Export',
    intro: 'Im Außenhandel können Betriebe direkt mit einem Geschäftspartner im Ausland handeln oder ein Handelsunternehmen zwischenschalten.',
    sections: [
      ['Direkte und indirekte Geschäftsbeziehung', 'Beim direkten Export verkauft der Betrieb an den ausländischen Abnehmer. Beim indirekten Export verkauft er beispielsweise an einen inländischen Exporthändler, der die Ware auf eigene Rechnung im Ausland weiterverkauft. Für den Import gilt die umgekehrte Richtung.'],
      ['Vertrag und operative Abwicklung', 'Bei direktem Geschäft behält der Betrieb eher Einfluss auf Kundenkontakt und Bedingungen, übernimmt aber mehr Koordinationsaufwand. Ein Transportdienstleister, der nur die Beförderung organisiert, ist kein Zwischenhändler. Zollrechtliche Rollen und eine mögliche Vertretung sind gesondert zu klären.'],
    ],
    example: 'Ein Maschinenbauer verkauft einmal direkt an einen Kunden im Drittland. Einen anderen Auftrag wickelt er durch Verkauf an einen Exporthändler ab, der selbst an den ausländischen Kunden verkauft.',
    question: 'Wird der erste Auftrag allein dadurch zum indirekten Export, dass ein Spediteur den Transport organisiert?',
    answer: 'Nein. Der Kaufvertrag besteht weiter direkt mit dem ausländischen Kunden. Indirekter Export liegt im zweiten Fall vor, weil ein Handelsunternehmen die Ware übernimmt und weiterverkauft.',
  },
  {
    id: 'einfuhr', parent: 'zollrecht', number: '5.2.3', title: 'Einfuhr und Überlassung zum freien Verkehr',
    intro: 'Bei einer Einfuhr aus einem Drittland muss der Betrieb klären, wie die Ware zollrechtlich behandelt werden soll. Für Ware, die dauerhaft in den EU-Markt gelangt, ist der freie Verkehr ein typischer Fall.',
    sections: [
      ['Angaben zur Ware', 'Für die Abfertigung werden Angaben wie Warenbeschreibung, Warennummer, Zollwert und Ursprung benötigt. Aus diesen Angaben und den einschlägigen Regeln ergeben sich mögliche Abgaben oder Beschränkungen. Zoll und Einfuhrumsatzsteuer sind unterschiedliche Abgaben.'],
      ['Anmeldung und Überlassung', 'Mit der Zollanmeldung wird die Ware zum gewählten Verfahren angemeldet. Die Zollstelle kann Unterlagen oder Ware prüfen. Den Status im freien Verkehr erhält die Ware durch die Überlassung, wenn die Voraussetzungen erfüllt sind.'],
    ],
    example: 'Ein Betrieb bestellt Bauteile aus einem Drittland. Rechnung, Warenbeschreibung und Unterlagen zum Ursprung werden vor der Ankunft auf Vollständigkeit geprüft, damit die Zollanmeldung vorbereitet werden kann.',
    question: 'Welche drei Angaben beeinflussen typischerweise die zollrechtliche Beurteilung der eingeführten Bauteile?',
    answer: 'Warennummer, Zollwert und Ursprung. Die Warennummer ordnet die Ware tariflich ein, der Zollwert kann Berechnungsgrundlage sein und der Ursprung kann zum Beispiel für eine Präferenz relevant sein.',
  },
  {
    id: 'ausfuhr', parent: 'zollrecht', number: '5.2.4', title: 'Ausfuhrverfahren und Ausgang der Ware',
    intro: 'Eine Ausfuhrfreigabe und der bestätigte Ausgang bezeichnen zwei unterschiedliche Zeitpunkte. Der Unterschied hilft, offene Ausfuhrvorgänge zu erkennen.',
    sections: [
      ['Ausfuhrzollstelle', 'Im Regelverfahren wird die Ware zur Ausfuhr angemeldet. Die Ausfuhrzollstelle prüft die Angaben und gibt die Ware nach den vorgesehenen Formalitäten zur Ausfuhr frei. Sie leitet die Anmeldedaten an die Ausgangszollstelle weiter.'],
      ['Ausgangszollstelle', 'Die Ausgangszollstelle überwacht den tatsächlichen Ausgang und meldet ihn an die Ausfuhrzollstelle zurück, wenn es sich um verschiedene Stellen handelt. Die Bestätigung dokumentiert den Ausgang. Je nach Vorgang gelten besondere Regeln oder Ausnahmen.'],
    ],
    example: 'Eine Maschine wird im Inland zur Ausfuhr freigegeben und fährt zum Hafen. Der Ausgang wird im Verfahren nach der tatsächlichen Ausfuhr erfasst.',
    question: 'Warum belegt die Freigabe im Inland noch nicht, dass die Maschine das EU-Zollgebiet verlassen hat?',
    answer: 'Die Freigabe erlaubt zunächst die Ausfuhr. Erst die Rückmeldung zum tatsächlichen Ausgang bestätigt, dass die Ware das Zollgebiet verlassen hat.',
  },
  {
    id: 'warenursprung', parent: 'zollrecht', number: '5.2.5', title: 'Warenursprung und Präferenzen',
    intro: 'Versandland, nichtpräferenzieller Ursprung und Präferenzursprung beantworten unterschiedliche Fragen. Das wird wichtig, wenn ein Einführer einen ermäßigten Zollsatz beanspruchen möchte.',
    sections: [
      ['Nichtpräferenzieller Ursprung', 'Der nichtpräferenzielle Ursprung wird nach den dafür geltenden Ursprungsregeln bestimmt. Bei einer Herstellung in mehreren Ländern ist je nach Warenregel die letzte wesentliche Be- oder Verarbeitung ein entscheidender Anknüpfungspunkt. Die bloße Absendung aus einem Lager begründet für sich keinen neuen Ursprung.'],
      ['Präferenzursprung', 'Eine Zollvergünstigung setzt voraus, dass eine einschlägige Präferenzregelung anwendbar ist und die Ware deren Ursprungsregeln erfüllt. Außerdem muss der Anspruch nach den Vorgaben der jeweiligen Regelung belegt werden. Welche Nachweise zulässig sind, hängt von der Regelung ab.'],
    ],
    example: 'Ein Händler verschickt in Deutschland gelagerte Ware aus einem Drittland unverändert weiter. Der Empfänger möchte eine Zollvergünstigung für Ware mit EU-Präferenzursprung beanspruchen.',
    question: 'Reicht der Versand aus Deutschland dafür aus? Was muss geprüft werden?',
    answer: 'Der Versandort reicht dafür nicht aus. Zu prüfen sind die einschlägige Präferenzregelung, ihre Ursprungsregeln für diese Ware und die Anforderungen an den Nachweis.',
    glossary: ['Präferenzursprung', 'Ursprungseigenschaft einer Ware nach einer bestimmten Präferenzregelung, die unter den dortigen Voraussetzungen eine Zollvergünstigung ermöglichen kann.'],
  },
  {
    id: 'veredelung', parent: 'zollrecht', number: '5.2.6', title: 'Aktive und passive Veredelung',
    intro: 'Zollrechtliche Veredelung kommt für grenzüberschreitende Bearbeitung oder Reparatur in Betracht. Die Richtung der Warenbewegung hilft bei der Unterscheidung.',
    sections: [
      ['Aktive Veredelung', 'Nicht-Unionswaren gelangen zur Bearbeitung in das EU-Zollgebiet. Im Verfahren können Einfuhrabgaben unter den vorgesehenen Voraussetzungen ausgesetzt bleiben. Anschließend werden die Waren oder Erzeugnisse nach den Verfahrensregeln etwa wiederausgeführt oder in ein anderes Verfahren übergeführt.'],
      ['Passive Veredelung', 'Unionswaren verlassen das EU-Zollgebiet vorübergehend zur Bearbeitung. Bei der Wiedereinfuhr kann unter den jeweiligen Voraussetzungen eine vollständige oder teilweise Befreiung vom Einfuhrzoll in Betracht kommen. Die Verfahrensbedingungen sind vorab zu prüfen.'],
    ],
    example: 'Ein deutscher Betrieb schickt ein eigenes Maschinenteil zur Reparatur in ein Drittland und will es danach wieder einführen.',
    question: 'Welche Veredelungsrichtung passt zu diesem Fall, und warum?',
    answer: 'Passive Veredelung kommt in Betracht. Die Unionsware geht zur Bearbeitung vorübergehend aus dem EU-Zollgebiet hinaus und soll danach wieder eingeführt werden.',
  },
  {
    id: 'abfallwirtschaft', parent: 'rechtsaspekte', number: '5.3', title: 'Abfallwirtschaft im Betrieb',
    intro: 'Für die Logistik beginnt der Umgang mit Abfällen am Entstehungsort. Der Betrieb muss wissen, welche Stoffströme anfallen und welches Vorgehen dafür vorgesehen ist.',
    sections: [
      ['Abfälle erfassen und einordnen', 'Ordne anfallende Abfälle nach Art und Eigenschaften ein. Die Unterscheidung zwischen gefährlichen und nicht gefährlichen Abfällen kann Anforderungen an Sammlung, Lagerung, Übergabe und Nachweise verändern. Die Abfallhierarchie steht in § 6 KrWG.'],
      ['Übergabe organisatorisch absichern', 'Kläre Zuständigkeiten, geeignete Sammelstellen und den Entsorgungsweg. Halte die Übergaben und die im jeweiligen Fall erforderlichen Nachweise fest. Beurteile wiederkehrende Abfälle auch danach, wie sie bereits im Einkauf oder in der Fertigung vermieden werden können.'],
    ],
    example: 'In der Instandhaltung fallen saubere Kartonagen und gebrauchte Betriebsstoffe an. Der Betrieb ordnet die Stoffströme getrennt ein und prüft für die Betriebsstoffe die besonderen Anforderungen.',
    question: 'Warum prüft der Betrieb die gebrauchten Betriebsstoffe getrennt von den Kartonagen?',
    answer: 'Sie können andere Eigenschaften und rechtliche Anforderungen haben. Eine getrennte Prüfung ermöglicht geeignete Sammlung, sicheren Umgang und die passenden Nachweise für den jeweiligen Stoffstrom.',
  },
];

const subjectId = 'logistik';
const updatedAt = Date.UTC(2026, 10, 17);
const deepeningUpdatedAt = Date.UTC(2026, 10, 18);
const chapterId = (id: string) => `${subjectId}-${id}`;
const lessons = [...introductoryLessons, ...logisticsDeepening, ...logisticsBook, ...logisticsPractice];

const groups = [
  ['analysetechniken', 'beschaffung', '1.2.5', 'Analysetechniken'],
  ['bedarfsrechnung', 'beschaffungsplanung', '1.3.2', 'Bedarfsrechnung'],
  ['materialwirtschaft', 'lager', '2.1', 'Materialwirtschaft'],
  ['lagerhaltung', 'lager', '2.2', 'Lagerhaltung'],
  ['lagerung', 'lagerhaltung', '2.2.1', 'Lagerung'],
  ['kommissionierverfahren', 'lagerhaltung', '2.2.2', 'Kommissionierung'],
  ['fertigungsarten', 'wertschoepfung', '3.1', 'Fertigungsprinzipien'],
  ['transportsysteme', 'wertschoepfung', '3.2', 'Transportsysteme'],
  ['verpackungen', 'wertschoepfung', '3.3', 'Verpackung'],
  ['distribution', 'wertschoepfung', '3.4', 'Warenausgang und Distribution'],
  ['verladung', 'wertschoepfung', '3.5', 'Verladung'],
  ['entsorgung', 'wertschoepfung', '3.6', 'Entsorgungslogistik'],
  ['portfolio', 'rationalisierung', '4.1', 'Portfolio und Standardisierung'],
  ['verschwendung', 'rationalisierung', '4.3', 'Prozesse auf Verschwendung prüfen'],
  ['vertragsgrundlagen', 'rechtsaspekte', '5.1', 'Einkaufs- und Verkaufsverträge'],
  ['zollrecht', 'rechtsaspekte', '5.2', 'Zollrecht bei Import und Export'],
];

export const logisticsChapters: Chapter[] = [
  ...groups.map(([id, parent, number, title]) => ({
    id: chapterId(id), parentId: chapterId(parent), subjectId, number, title,
  })),
  ...lessons.map(lesson => ({
    id: chapterId(lesson.id), parentId: chapterId(lesson.parent), subjectId,
    number: lesson.number, title: lesson.title, articleId: chapterId(lesson.id),
  })),
].sort((a, b) => a.number.localeCompare(b.number, 'de', { numeric: true }));

export const logisticsArticles: Article[] = lessons.map(lesson => ({
  id: chapterId(lesson.id), chapterId: chapterId(lesson.id), subjectId,
  title: lesson.title, number: lesson.number, intro: lesson.intro,
  updatedAt: introductoryLessons.includes(lesson) ? updatedAt : deepeningUpdatedAt, version: 1,
  sections: [
    ...lesson.sections.map(([title, ...paragraphs], index) => ({
      id: `abschnitt-${index + 1}`, title, paragraphs: paragraphs.map(text => [{ text }]),
    })),
    {
      id: 'praxisbeispiel', title: lesson.practiceCase ? 'Bearbeitungshinweis' : 'Praxisbeispiel', paragraphs: [[{ text: lesson.example }]],
      tabs: lesson.calculation ? [{ title: 'Rechenweg', content: lesson.calculation }] : undefined,
      inventoryChart: lesson.inventoryChart,
    },
    {
      id: 'kurzfrage', title: lesson.practiceCase ? 'Aufgaben' : 'Kurzfrage zum Schluss',
      paragraphs: lesson.question.split('\n').map(text => [{ text }]),
      hint: { label: 'SELBSTKONTROLLE', title: lesson.practiceCase ? 'Musterlösung' : 'Musterantwort', content: lesson.answer },
    },
  ],
}));

export const logisticsGlossary: GlossaryTerm[] = lessons.flatMap(lesson => {
  if (!lesson.glossary) return [];
  const [term, definition] = lesson.glossary;
  return [{ id: `${chapterId(lesson.id)}-begriff`, subjectId, term, definition, articleId: chapterId(lesson.id) }];
});
