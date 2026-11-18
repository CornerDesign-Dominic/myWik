import type { Chapter } from '../types';
import { buildLearningArticles, type LearningArticle } from './rechnungswesen-controlling-standard';

const subjectId = 'rechnungswesen';
export const operatingAccountingChapters: Chapter[] = [
  { id: 'rw-db-stufen', subjectId, parentId: 'rw-teilkosten', number: '3.5.6', title: 'Mehrstufige Deckungsbeitragsrechnung', articleId: 'rw-fixkostendeckung' },
  { id: 'rw-eigen-fremd', subjectId, parentId: 'rw-teilkosten', number: '3.5.7', title: 'Eigenfertigung oder Fremdbezug', articleId: 'rw-make-or-buy' },
  { id: 'rw-normal', subjectId, parentId: 'rw-klr', number: '3.6', title: 'Normalkostenrechnung' },
  { id: 'rw-normal-starr', subjectId, parentId: 'rw-normal', number: '3.6.1', title: 'Starre Normalkostenrechnung', articleId: 'rw-normalverrechnung' },
  { id: 'rw-normal-flexibel', subjectId, parentId: 'rw-normal', number: '3.6.2', title: 'Flexible Normalkostenrechnung', articleId: 'rw-normalbeschaeftigung' },
  { id: 'rw-plan', subjectId, parentId: 'rw-klr', number: '3.7', title: 'Plankostenrechnung' },
  { id: 'rw-plan-starr', subjectId, parentId: 'rw-plan', number: '3.7.1', title: 'Starre Plankostenrechnung', articleId: 'rw-planverrechnung' },
  { id: 'rw-plan-flexibel', subjectId, parentId: 'rw-plan', number: '3.7.2', title: 'Flexible Plankostenrechnung und Grenzplankosten', articleId: 'rw-sollkosten' },
  { id: 'rw-plan-abweichung', subjectId, parentId: 'rw-plan', number: '3.7.3', title: 'Preis-, Mengen- und Verbrauchsabweichungen', articleId: 'rw-abweichungszerlegung' },
  { id: 'rw-verfahren', subjectId, parentId: 'rw-klr', number: '3.8', title: 'Neuere Kostenrechnungsverfahren' },
  { id: 'rw-zielkosten', subjectId, parentId: 'rw-verfahren', number: '3.8.1', title: 'Target Costing und Zielkostenindex', articleId: 'rw-target-costing' },
  { id: 'rw-prozesskosten', subjectId, parentId: 'rw-verfahren', number: '3.8.2', title: 'Prozesskostenrechnung', articleId: 'rw-kostentreiber' },
  { id: 'rw-klr-praxis', subjectId, parentId: 'rw-klr', number: '3.9', title: 'Berufstypische Fälle zur Kostenrechnung', articleId: 'rw-praxisfall' },
];

const entries: LearningArticle[] = [
  {
    chapter: 'rw-db-stufen', id: 'rw-fixkostendeckung', title: 'Mehrstufige Deckungsbeitragsrechnung',
    intro: 'Die mehrstufige Deckungsbeitragsrechnung zieht Fixkosten auf der Hierarchieebene ab, der sie sich direkt zurechnen lassen.',
    principle: [
      'Vom Nettoerlös werden zuerst die variablen Kosten abgezogen. Der verbleibende DB I deckt produktfixe Kosten, etwa eine exklusiv genutzte Form. Die folgenden Stufen ziehen produktgruppenfixe, abteilungsfixe und bereichsfixe Kosten ab. Zum Schluss werden Unternehmensfixkosten abgezogen. Namen und Zahl der Stufen richten sich nach der Organisation.',
      'Für eine Sortimentsentscheidung zählt die Veränderung des Ergebnisbeitrags. Zurechenbarkeit und Vermeidbarkeit sind zwei getrennte Fragen. Ein Produkt kann produktfixe Kosten verursachen, die trotz Einstellung bis zum Ende eines Vertrags bestehen bleiben. Umgekehrt kann sich eine ganze Kostenstufe erst beim Wegfall einer Produktgruppe abbauen lassen.',
      'Erfasse Erlösschmälerungen und variable Vertriebskosten auf derselben Ebene. Gemeinsame Kosten werden erst auf der Ebene abgezogen, die sie verursacht. Querwirkungen durch Ersatzkäufe, Bündel oder verlorene Nachfrage gehören in die Szenariorechnung.',
    ],
    example: [
      'Produkt A erzielt 72.000 € Erlös und 42.000 € variable Kosten, Produkt B 48.000 € und 34.000 €. Die DB I betragen 30.000 € und 14.000 €. Nach produktfixen Kosten von 10.000 € für A und 16.000 € für B verbleiben 20.000 € und −2.000 €.',
      'Nach 6.000 € Gruppenfixkosten verbleiben 12.000 €. Nach 3.000 € Abteilungsfixkosten, 2.000 € Bereichsfixkosten und 4.000 € Unternehmensfixkosten beträgt das Periodenbetriebsergebnis 3.000 €.',
    ],
    interpretation: [
      'Entfallen bei B sofort nur 7.000 € produktfixe Kosten, verliert der Betrieb 14.000 € DB I und spart 7.000 €. Das Ergebnis sinkt um 7.000 €, obwohl der ausgewiesene DB nach Produktfixkosten negativ war. Werden alle 16.000 € vermeidbar, verbessert sich das Ergebnis um 2.000 €, sofern keine Verbundeffekte eintreten.',
      'Auf Dienstleistungen übertragen können Fixkosten einer eigenen Spezialroute, einem ganzen Zustellgebiet und schließlich der Zentralverwaltung zugeordnet werden. Die Ebene richtet sich nach der tatsächlichen Beanspruchung und Kündigbarkeit.',
    ],
    check: ['Warum werden zentrale Fixkosten nicht auf Produkte geschlüsselt, wenn das Ziel eine mehrstufige Entscheidungsvorlage ist?', 'Die Stufen sollen Beiträge zu eindeutig zurechenbaren Kosten zeigen. Ein beliebiger Schlüssel kann Produkte scheinbar unprofitabel machen, obwohl die zentralen Kosten bei Wegfall weiterlaufen.'],
    transfer: ['Eine Produktgruppe liefert 40.000 € DB I. Produktfixkosten von insgesamt 24.000 € sind zu 75 % vermeidbar, Gruppenfixkosten von 10.000 € vollständig. Welche Ergebniswirkung hätte die Einstellung?', 'Der Deckungsbeitrag sinkt um 40.000 €. Die vermeidbaren Fixkosten betragen 18.000 € + 10.000 € = 28.000 €. Das Ergebnis sinkt um 12.000 €, sofern es keine anderweitige Nutzung gibt.'],
    terms: [['Produktfixkosten', 'Fixkosten, die einem einzelnen Produkt direkt zurechenbar sind.'], ['Unternehmensfixkosten', 'Fixkosten, die nur auf Ebene des Gesamtunternehmens zurechenbar sind.']],
    related: [['deckungsbeitrag', 'Einstufige Deckungsbeitragsrechnung'], ['rw-preisuntergrenzen', 'Sortiments- und Programmentscheidung']],
  },
  {
    chapter: 'rw-eigen-fremd', id: 'rw-make-or-buy', title: 'Eigenfertigung oder Fremdbezug',
    intro: 'Eine Make-or-Buy-Entscheidung vergleicht die relevanten Gesamtkosten von Eigenfertigung und Fremdbezug bei identischer Leistung und Menge.',
    principle: [
      'Eigenfertigung: relevante Fixkosten plus variable Eigenfertigungskosten je Stück mal Menge plus Opportunitätskosten der gebundenen Kapazität. Fremdbezug: relevante Bezugsfixkosten plus Einstandskosten je Stück mal Menge. Der Einstandspreis umfasst je nach Fall Nettoangebot, Rabatte, Transport, Zoll und weitere direkt zurechenbare Kosten. Qualitätssicherung, Ausschuss und Ausfallrisiko können den Vergleich verändern.',
      'Bei linearen Kosten und ohne Engpass liegt die kritische Menge bei (fixe Eigenkosten − fixe Bezugskosten) ÷ (variable Bezugskosten je Stück − variable Eigenkosten je Stück). Die Richtung ober- und unterhalb des Schnittpunkts folgt aus den Steigungen. Bei gleichen Steigungen entscheidet die Fixkostendifferenz. Ein Schnittpunkt außerhalb der realisierbaren Mengen ist praktisch ohne Bedeutung.',
      'Bereits angefallene Investitionen sind versunkene Kosten. Vermeidbare Miete, ein kündbarer Vertrag oder ein realisierbarer Verkaufserlös zählen hingegen. Für langfristige Optionen vergleiche Zahlungsströme über dieselbe Nutzungsdauer einschließlich Investition, Ersatz, Restwert und Kapitalkosten.',
    ],
    example: [
      'Eigenfertigung kostet 36.000 € relevante Fixkosten und 12 €/Stück. Ein Lieferant verlangt keine separate Fixpauschale und 18 €/Stück einschließlich Fracht und Eingangskontrolle. Kritische Menge: 36.000 € ÷ 6 €/Stück = 6.000 Stück.',
      'Bei 8.000 Stück kostet Eigenfertigung 132.000 €, Fremdbezug 144.000 €. Verdrängt die Eigenfertigung jedoch Aufträge mit 20.000 € Deckungsbeitrag, steigt ihr relevanter Wertverbrauch auf 152.000 €. Der Bezug ist dann um 8.000 € günstiger.',
    ],
    interpretation: [
      'Prüfe Mindestabnahmen, Preissprünge, Losgrößen, Lieferzeit, Know-how-Abfluss, Qualitätsfähigkeit und die Kosten eines Rückwechsels. Ein kombinierter Bezug kann bei unsicherem Bedarf oder knapper Kapazität sinnvoll sein.',
      'Für eine Spedition lässt sich dieselbe Rechnung auf eigene Fahrzeuge und zugekaufte Touren anwenden. Wenn das Fahrzeug bereits ausgelastet ist, kann ein aufgegebener profitabler Einsatz wichtiger sein als der Unterschied im Kilometerpreis.',
    ],
    check: ['Was gehört in die Eigenkosten, wenn die benötigte Anlage schon bezahlt ist?', 'Die künftig veränderlichen Kosten und mögliche Opportunitätskosten. Die bereits geleistete, nicht mehr beeinflussbare Anschaffungsauszahlung ist versunken.'],
    transfer: ['Interne Fixkosten betragen 24.000 €, interne variable Kosten 9 €/Stück. Der Lieferant verlangt 4.000 € Grundgebühr plus 14 €/Stück. Welche Alternative ist bei 5.000 Stück günstiger?', 'Schnittpunkt (24.000 € − 4.000 €) ÷ (14 € − 9 €) = 4.000 Stück. Bei 5.000 Stück kostet Eigenfertigung 69.000 €, Fremdbezug 74.000 €. Der Vorteil der Eigenfertigung beträgt 5.000 €.'],
    terms: [['Make or Buy', 'Entscheidung zwischen Leistungserstellung im eigenen Betrieb und externem Bezug.', ['Eigenfertigung oder Fremdbezug']], ['Kritische Menge', 'Menge, bei der zwei verglichene Kostenfunktionen denselben Gesamtwert haben.']],
    related: [['rw-preisuntergrenzen', 'Relevante Kosten und Opportunitätskosten']],
  },
  {
    chapter: 'rw-normal-starr', id: 'rw-normalverrechnung', title: 'Starre Normalkostenrechnung',
    intro: 'Die starre Normalkostenrechnung kalkuliert mit historischen Durchschnittssätzen, damit vorübergehende Kostenschwankungen die Auftragskalkulation weniger verzerren.',
    principle: [
      'Wähle vergleichbare historische Perioden und bereinige dokumentierte Sondereffekte. Für einen mengenbezogenen Satz teilst du die Summe bereinigter Istgemeinkosten durch die Summe der Bezugsgrößen. Bei einem prozentualen Zuschlag dient eine geeignete Wertbasis als Nenner. Die Summenrechnung gewichtet Monate nach ihrer Basis.',
      'In der Vorkalkulation multiplizierst du den normalen Satz mit der erwarteten Basis, in der Nachkalkulation mit der tatsächlich beanspruchten Basis. Häufig werden Einzelkosten direkt erfasst und Gemeinkosten normal verrechnet. Das Abrechnungssystem muss die Istwerte trotzdem getrennt ermitteln.',
      'Die verrechneten Normalkosten sind normaler Satz mal Istbezugsgröße. Überdeckung = verrechnete Kosten − Istkosten, falls das Ergebnis positiv ist. Bei negativem Wert liegt eine Unterdeckung in Höhe des Betrags vor. Ein starrer Satz unterscheidet fixe und variable Kosten bei der Verrechnung nicht.',
    ],
    example: [
      'In zwei vergleichbaren Perioden entstanden 18.000 € bei 900 Stunden und 25.200 € bei 1.200 Stunden. Normalsatz = 43.200 € ÷ 2.100 h = 20,5714 €/h. Ein Auftrag mit 80 Stunden erhält rund 1.646 € normal verrechnete Gemeinkosten.',
      'Für 1.050 Iststunden werden 21.600 € verrechnet. Bei 22.300 € Istkosten beträgt die Unterdeckung 700 €. Im Abschluss wird diese Differenz je nach System im Betriebsergebnis ausgewiesen oder auf die betroffenen Kostenträger nachverrechnet.',
    ],
    interpretation: [
      'Stabile Sätze helfen etwa beim Angebotsvergleich zwischen zwei Monaten. Sie verlieren an Aussagekraft, wenn sich Energiepreise, Automatisierung oder Produktmix strukturell verändern. Eine Unterdeckung kann aus Preisen, Verbrauch, Auslastung oder einer ungeeigneten Basis folgen.',
      'Für die Ursachenanalyse sind Mengen und Preise getrennt auszuwerten. Bei Einzelmaterial gilt beispielsweise: Istmenge × (Istpreis − Normalpreis) misst den Preiseffekt. Normalpreis × (Istmenge − Normalmenge für die Istleistung) misst den Mengeneffekt. Die flexible Normalkostenrechnung ergänzt den Beschäftigungsvergleich.',
    ],
    check: ['Warum werden auch bei Normalkostenrechnung Istkosten erfasst?', 'Sie werden für die Nachkalkulation und zur Prüfung benötigt, ob die mit Normalsätzen verrechneten Beträge die entstandenen Kosten decken.'],
    transfer: ['Ein Satz von 25 €/h wird auf 800 Iststunden angewandt. Tatsächlich entstehen 19.200 €. Welche Deckung liegt vor?', 'Verrechnet wurden 20.000 €. Die Überdeckung beträgt 800 €. Ohne Informationen zu Verbrauch, Preis und Auslastung ist die Ursache offen.'],
    terms: [['Normalkostenrechnung', 'Vergangenheitsorientierte Kostenrechnung mit geglätteten Kostensätzen.', ['Normalkosten']], ['Kostenüberdeckung', 'Die verrechneten Kosten übersteigen die Istkosten.'], ['Kostenunterdeckung', 'Die Istkosten übersteigen die verrechneten Kosten.']],
    related: [['rw-normalbeschaeftigung', 'Flexible Normalkostenrechnung'], ['rw-planverrechnung', 'Starre Plankostenrechnung']],
  },
  {
    chapter: 'rw-normal-flexibel', id: 'rw-normalbeschaeftigung', title: 'Flexible Normalkostenrechnung',
    intro: 'Die flexible Normalkostenrechnung trennt fixe und variable historische Normalkosten. Damit beurteilst du die Kosten bei abweichender Herstellungsmenge.',
    principle: [
      'Leite fixe Normalkosten F und variable Normalkosten je Einheit v aus vergleichbaren Istperioden ab. Bei linearer Näherung erhältst du für die Istbeschäftigung x die beschäftigungsangepassten Normalkosten F + v × x. Fixkosten bleiben innerhalb des relevanten Bereichs unverändert. Bezugsgrößen können Stunden, Stück oder bei heterogener Produktion Standardzeiten sein.',
      'Bei Vollkostenverrechnung erhält der Kostenträger weiterhin den Satz der Normalbeschäftigung xN, also v + F ÷ xN. Multipliziere ihn mit der Istbeschäftigung. Der Unterschied zwischen angepassten und verrechneten Normalkosten zeigt die Beschäftigungswirkung der Fixkostenverteilung. Die Differenz zwischen Istkosten und angepassten Normalkosten ist die übrige Kostenabweichung.',
      'Für die Kostenspaltung helfen sachliche Analysen der Verträge, Prozessdaten und statistische Schätzungen. Ein Tarif mit Grundgebühr und Verbrauchspreis lässt sich direkt trennen. Ein gemessener Zusammenhang über historische Monate kann dagegen auch Saison- oder Preisänderungen enthalten.',
    ],
    example: [
      'Normalbeschäftigung: 1.000 Maschinenstunden. Fixe Normalkosten 8.000 €, variable 10 €/h, voller Normalsatz 18 €/h. Bei 800 Iststunden sind 14.400 € verrechnet. Beschäftigungsangepasste Kosten sind 8.000 € + 800 × 10 € = 16.000 €. Die tatsächlichen Kosten betragen 16.500 €.',
      'Die Unterdeckung beträgt 2.100 €. Davon entfallen 1.600 € auf die Beschäftigungsabweichung (16.000 € − 14.400 €) und 500 € auf den verbleibenden Unterschied (16.500 € − 16.000 €). Diese 500 € können auch Preis- oder Strukturänderungen enthalten.',
    ],
    interpretation: [
      'Die Beschäftigungsabweichung zeigt den Fixkostenanteil, den der Satz bei Unterbeschäftigung zu wenig verrechnet. Sie ist keine zusätzliche Auszahlung. Die flexiblen Vergleichswerte bleiben historisch geprägt. Eine neue Schichtregel oder andere Maschinen brauchen entsprechend neue Werte.',
      'In einer Werkstatt kannst du fixe Hallenkosten von stundenabhängigem Materialverbrauch trennen. Bei gemischten Reparaturarten bildet eine Standardstunde die Leistung oft besser ab als eine bloße Auftragszahl.',
    ],
    check: ['Welche Kosten werden bei höherer Istbeschäftigung im linearen Modell angepasst?', 'Die variablen Normalkosten steigen proportional innerhalb des modellierten Bereichs. Der fixe Normalkostenblock bleibt konstant.'],
    transfer: ['F = 5.000 €, v = 6 €/h und Normalbeschäftigung 1.000 h. Wie hoch sind angepasste und verrechnete Kosten bei 1.200 h?', 'Angepasst: 5.000 € + 1.200 × 6 € = 12.200 €. Verrechnet: 1.200 × 11 € = 13.200 €. Die Beschäftigungsabweichung beträgt −1.000 € in der Konvention angepasst minus verrechnet.'],
    related: [['rw-normalverrechnung', 'Starre Normalkostenrechnung'], ['rw-sollkosten', 'Flexible Plankostenrechnung']],
  },
  {
    chapter: 'rw-plan-starr', id: 'rw-planverrechnung', title: 'Starre Plankostenrechnung',
    intro: 'Die starre Plankostenrechnung bildet vor Beginn der Periode einen Kostenplan für eine festgelegte Beschäftigung und leitet daraus einen Kalkulationssatz ab.',
    principle: [
      'Plankosten beruhen auf erwarteten Faktormengen, Faktorpreisen, Verfahren und einer Planbeschäftigung. Wähle je Kostenstelle eine verursachungsnahe Bezugsgröße. Plankostenverrechnungssatz = geplante Gesamtkosten ÷ Planbeschäftigung. Verrechnete Plankosten = Satz × Istbeschäftigung.',
      'Der starre Plan bleibt als Budget unverändert. Für die Kostenträger werden die Planwerte mit dem festen Satz auf die Istleistung verrechnet. Der Vergleich Istkosten minus Planbudget zeigt den Abstand zur ursprünglichen Budgetfreigabe. Istkosten minus verrechnete Kosten zeigt den Gesamtunterschied zur Kostenträgerverrechnung.',
      'Ohne Trennung nach Beschäftigungsverhalten sind Preis-, Verbrauchs- und Beschäftigungseffekte nicht sauber isolierbar. Bei gleicher Beschäftigung entfällt zwar der Beschäftigungseffekt, aber für die Trennung von Preis- und Verbrauchseinflüssen brauchst du weiter Mengen- und Preisdaten.',
    ],
    example: [
      'Für 1.000 Stunden werden 28.000 € geplant, also 28 €/h. Die Kostenstelle leistet 800 Stunden und erfasst 25.000 € Istkosten. Gegen das starre Budget liegen die Kosten um 3.000 € niedriger. Auf Kostenträger werden jedoch nur 800 × 28 € = 22.400 € verrechnet. Die Differenz zur Verrechnung beträgt +2.600 €.',
      'In einem Servicebereich lässt sich derselbe Ansatz für Monatsbudgets verwenden. Fallen deutlich weniger Dienste an, folgt aus einem eingehaltenen Gesamtbudget noch kein wirtschaftlicher Umgang mit Personal. Die flexible Rechnung bildet einen passenden Vergleichswert.',
    ],
    interpretation: [
      'Nenne immer die Referenzgröße. Die beiden Differenzen beantworten unterschiedliche Fragen. Positiv bedeutet hier, dass Istkosten über dem jeweiligen Kostenvergleich liegen. Bei Erlösabweichungen ist die wirtschaftliche Bewertung oft umgekehrt.',
      'Starre Planung ist nachvollziehbar und für stabile Beschäftigung einfach anwendbar. Bei schwankender Leistung oder hohem Fixkostenanteil ist ihre Eignung zur Ursachenanalyse begrenzt.',
    ],
    check: ['Wie berechnest du den Plankostenverrechnungssatz?', 'Gesamte Plankosten der Kostenstelle durch die Planbeschäftigung dividieren. Die Einheit kann zum Beispiel €/Maschinenstunde sein.'],
    transfer: ['Geplant sind 30.000 € bei 1.500 Stunden. Ist: 1.350 Stunden und 28.400 €. Welche Abweichungen ergeben sich?', 'Satz 20 €/h, verrechnet 27.000 €. Ist minus Budget = −1.600 €. Ist minus verrechnet = +1.400 €.'],
    terms: [['Plankosten', 'Vorab festgelegte Kosten der geplanten Leistung bei definierten Mengen und Preisen.'], ['Plankostenverrechnungssatz', 'Plankosten der Kostenstelle je Einheit der Planbeschäftigung.']],
    related: [['rw-sollkosten', 'Flexible Plankostenrechnung']],
  },
  {
    chapter: 'rw-plan-flexibel', id: 'rw-sollkosten', title: 'Flexible Plankostenrechnung und Grenzplankostenrechnung',
    intro: 'Die flexible Plankostenrechnung passt die Kostenplanung an die tatsächlich erreichte Leistung an. Dadurch lässt sich der Kostenverbrauch besser beurteilen.',
    principle: [
      'Im linearen Modell gilt Sollkosten = fixe Plankosten + variable Plankosten je Einheit × Istbeschäftigung. Verrechnete Vollplankosten = voller Plankostenverrechnungssatz × Istbeschäftigung. Sollkosten beschreiben den Ressourcenbedarf bei Istleistung nach Planbedingungen. Verrechnete Kosten zeigen, welcher Betrag auf Kostenträger gelangt.',
      'In der hier einheitlichen Konvention gilt Gesamt-/Verrechnungsabweichung = Istkosten − verrechnete Plankosten. Sie zerfällt in Istkosten − Sollkosten und Beschäftigungsabweichung = Sollkosten − verrechnete Plankosten. Der erste Teil enthält bei Istpreisen noch Preiswirkungen. Bewertest du Istmengen zu Planpreisen, erhältst du den Verbrauchseffekt im engeren Sinn und kannst Preiswirkungen separat ausweisen.',
      'Bei flexibler Vollplankostenrechnung ist die Beschäftigungsabweichung gleich fixe Plankosten × (1 − Istbeschäftigung ÷ Planbeschäftigung). Bei Unterbeschäftigung entstehen Leerkosten. In der Grenzplankostenrechnung werden Kostenträger mit proportionalen Plankosten belastet. Fixkosten bleiben als Periodenblock. Eine Beschäftigungsabweichung aus Fixkostenverrechnung entfällt dort.',
    ],
    example: [
      'Plan: 1.000 Maschinenstunden, 12.000 € fixe und 16.000 € variable Plankosten, also 16 €/h variabel und 28 €/h voll. Ist: 800 Stunden und 25.600 € Kosten. Sollkosten = 12.000 € + 16 €/h × 800 h = 24.800 €. Verrechnete Vollplankosten = 28 €/h × 800 h = 22.400 €.',
      'Gesamtabweichung = 25.600 € − 22.400 € = 3.200 €. Der Kostenstellenvergleich ergibt 800 €, die Beschäftigungsabweichung 2.400 €. Grenzplanverrechnung: 800 × 16 € = 12.800 € auf Kostenträger. Die geplanten 12.000 € Fixkosten verbleiben in der Kostenstelle bzw. im Periodenergebnis.',
    ],
    interpretation: [
      'Eine positive Beschäftigungsabweichung weist auf unterverrechnete Fixkosten hin. Sie belegt keinen ineffizienten Ressourceneinsatz. Kläre, ob der Auslastungsrückgang aus Nachfrage, Störungen oder bewusst vorgehaltener Reserve stammt.',
      'Bei fixen Sprüngen, variabler Produktmischung oder nicht proportionalen variablen Kosten braucht es getrennte Kostenfunktionen oder mehrere Treiber. Für eine variantenreiche Kommissionierung können geplante Minuten je Auftragsart eine bessere Bezugsgröße sein als die Summe der Aufträge.',
    ],
    check: ['Was unterscheidet Sollkosten und verrechnete Vollplankosten bei Unterbeschäftigung?', 'Die Sollkosten enthalten alle fixen Plankosten. Der volle Verrechnungssatz gibt bei Unterbeschäftigung nur einen Teil davon an die Kostenträger weiter.'],
    transfer: ['Plan: 1.000 Stunden, 10.000 € Fixkosten und 8 €/h variabel. Ist: 1.200 Stunden und 20.100 €. Wie zerfällt die Gesamtabweichung?', 'Soll 19.600 €, verrechnet 21.600 €. Ist minus Soll: +500 €. Soll minus verrechnet: −2.000 €. Gesamt: −1.500 €. Die gesamte günstige Verrechnungsabweichung verdeckt 500 € Mehrkosten gegenüber dem Soll.'],
    terms: [['Sollkosten', 'Plankosten für den tatsächlich erreichten Beschäftigungsgrad.'], ['Beschäftigungsabweichung', 'Differenz zwischen Sollkosten und verrechneten Vollplankosten.'], ['Grenzplankostenrechnung', 'Flexible Plankostenrechnung auf Teilkostenbasis mit Verrechnung proportionaler Kosten auf Kostenträger.']],
    related: [['rw-abweichungszerlegung', 'Preis und Verbrauch getrennt untersuchen'], ['co-planung-budget', 'Planung, Budgetierung und Forecast']],
  },
  {
    chapter: 'rw-plan-abweichung', id: 'rw-abweichungszerlegung', title: 'Preis-, Mengen- und Verbrauchsabweichungen',
    intro: 'Abweichungen werden handlungsrelevant, wenn du Beschäftigung, Faktorverbrauch und Faktorpreis getrennt untersuchst.',
    principle: [
      'Für die Istleistung bestimmst du die Sollmenge qS nach geplantem Verbrauch je Leistungseinheit. Istmenge qI und Istpreis pI ergeben die Istfaktorkosten. Kontrollfähige Istkosten zum Planpreis pP sind qI × pP. Der Begriff bezieht sich hier auf die Bewertung zu Planpreisen. Welche Person einen Effekt beeinflussen kann, hängt von der Ursache ab.',
      'Mit der Konvention Ist minus Soll gilt Preisabweichung = qI × (pI − pP) und Mengen- bzw. Verbrauchsabweichung = (qI − qS) × pP. Die Summe ist qI × pI − qS × pP. Bewertest du den Preiseffekt stattdessen mit der Sollmenge, musst du den Interaktionseffekt separat ausweisen oder dem Mengeneffekt zuordnen.',
      'In einer Vollplankostenrechnung kommt die Beschäftigungsabweichung hinzu, wenn fixe Kosten über einen vollen Satz verteilt werden. Fixe Budgetüberschreitungen werden im Kostenstellenvergleich separat geprüft. Bei mehreren Materialien kann eine Mischungseffektanalyse Rezepturänderungen vom Mehrverbrauch unterscheiden.',
    ],
    example: [
      'Für die tatsächlichen 500 Geräte sind 2 kg Material je Gerät zu 4 €/kg vorgesehen. Sollmenge 1.000 kg, Sollkosten 4.000 €. Tatsächlich werden 1.100 kg zu 4,30 €/kg verbraucht. Istkosten: 4.730 €, kontrollfähige Istkosten: 4.400 €.',
      'Preisabweichung: 1.100 kg × 0,30 €/kg = 330 €. Mengenabweichung: (1.100 − 1.000) kg × 4 €/kg = 400 €. Zusammen 730 €. Mit der alternativen Preiseffektbasis von 1.000 kg wären es 300 € Preis-, 400 € reiner Mengeneffekt und 30 € Interaktion.',
    ],
    interpretation: [
      'Ein günstiger Einkaufspreis kann mit mehr Ausschuss einhergehen. Analysiere Chargenqualität, Lieferantenwechsel, Prozessstörungen und Mix. Vermeide pauschale Schuldzuweisungen an Einkauf oder Fertigung. Prüfe auch Periodenzuordnung, Preisbasis und Messfehler.',
      'Bei Fahrpersonal trennst du auf dieselbe Weise ungeplante Stunden durch Wartezeit und höhere Stundensätze durch Zuschläge. Ein Rückgang der gefahrenen Aufträge ist gesondert zu behandeln.',
    ],
    check: ['Warum wird der Sollverbrauch aus der Istleistung abgeleitet?', 'So erfasst die Differenz Verbrauch je gegebener Leistung. Produktionsmengenänderungen würden sich sonst mit dem Verbrauchseffekt vermischen.'],
    transfer: ['Soll: 200 Stunden zu 24 €/h. Ist: 190 Stunden zu 27 €/h. Wie groß sind Preis- und Verbrauchsabweichung?', 'Preis: 190 × 3 € = +570 €. Verbrauch: −10 × 24 € = −240 €. Summe +330 €, entsprechend 5.130 € Ist minus 4.800 € Soll.'],
    terms: [['Preisabweichung', 'Kosteneffekt abweichender Faktorpreise bei definierter Mengenbasis.'], ['Verbrauchsabweichung', 'Kosteneffekt des Mehr- oder Minderverbrauchs gegenüber dem für die Istleistung geplanten Verbrauch.', ['Mengenabweichung']]],
    related: [['rw-sollkosten', 'Beschäftigungseffekt in der Plankostenrechnung'], ['co-planung-abweichung', 'Abweichungen in Maßnahmen übersetzen']],
  },
  {
    chapter: 'rw-zielkosten', id: 'rw-target-costing', title: 'Target Costing und Zielkostenindex',
    intro: 'Target Costing leitet zulässige Produktkosten aus einem realistischen Marktpreis und einer angestrebten Marge ab. Es eignet sich besonders für Entscheidungen früh in der Produktentwicklung.',
    principle: [
      'Vom erwarteten Nettomarktpreis wird der Zielgewinn je Einheit abgezogen. Daraus ergeben sich Allowable Costs. Vergleiche sie mit den bei der bestehenden Konstruktion erwarteten Drifting Costs. Interne Zielkosten können stufenweise vereinbart werden, wenn die marktseitig erlaubte Grenze kurzfristig unerreichbar ist. Der Zielkostenpreis im Marktansatz ist der erzielbare Nettoverkaufspreis, von dem aus rückwärts gerechnet wird.',
      'Gewichte Kundenfunktionen nach ihrer Bedeutung und verteile den Beitrag zu jeder Funktion prozentual auf Komponenten. Der Nutzenanteil einer Komponente ist die Summe ihrer gewichteten Funktionsbeiträge. Die Nutzenanteile verteilen den Zielkostenrahmen. Kostenanteile stammen aus der betrachteten Kostenbasis, etwa den aktuell geschätzten Komponentenkosten.',
      'Zielkostenindex = Nutzenanteil ÷ Kostenanteil. Werte unter 1 weisen auf einen relativ hohen Kostenanteil, Werte über 1 auf einen relativ niedrigen Kostenanteil hin. Verwende für beide Anteile denselben Komponenten- und Produktumfang. Bei einem Kostenanteil von null ist ein Index nicht definiert.',
    ],
    example: [
      'Ein Gerät erzielt erwartete 200 € netto. Zielgewinn 20 % vom Umsatz = 40 €. Erlaubt sind 160 €/Stück, aktuell kalkuliert sind 180 €, also 20 € Lücke. Kunden bewerten Präzision mit 60 % und Bedienbarkeit mit 40 %. Modul A trägt 80 % zur Präzision und 25 % zur Bedienbarkeit bei.',
      'Nutzenanteil A = 0,60 × 0,80 + 0,40 × 0,25 = 58 %. B erhält 42 %. A kostet 120 € von 180 €, also 66,67 %. Index A ≈ 0,87. B kostet 60 €, Index ≈ 1,26. Verteilte Zielkosten: 92,80 € für A und 67,20 € für B. A liegt 27,20 € darüber, B 7,20 € darunter.',
    ],
    interpretation: [
      'Prüfe bei A Standardisierung, Konstruktion und Lieferantenalternativen. Der Index von B allein rechtfertigt keine Aufwertung. Funktionssicherheit, regulatorische Mindestanforderungen, technische Wechselwirkungen und Lebenszykluskosten können Vorrang haben.',
      'Für eine Transportdienstleistung lassen sich Funktionen wie Zustellzeit, Schadenvermeidung und Statusinformation auf Disposition, Umschlag und IT beziehen. Vermeide Scheingenauigkeit bei kleinen oder verzerrten Kundenstichproben. Teste Preis und Nutzengewichte in Szenarien.',
    ],
    check: ['Was zeigt ein Zielkostenindex von 0,8?', 'Der Kostenanteil der Komponente liegt über ihrem geschätzten Nutzenanteil. Das signalisiert Prüfbedarf bei Kosten oder Nutzen, ohne die technische Lösung vorzugeben.'],
    transfer: ['Ein Produkt erzielt 150 €. Der Zielgewinn soll 25 % vom Umsatz betragen. Eine Komponente hat 40 % Nutzenanteil und kostet 60 € von geschätzten 120 €. Wie lauten Zielkosten und Index?', 'Erlaubte Gesamtzielkosten 112,50 €. Komponentenziel 45 €. Kostenanteil 50 %, Index 0,80. Ihre geschätzten Kosten liegen 15 € über dem verteilten Ziel.'],
    terms: [['Zielkostenindex', 'Quotient aus dem Nutzenanteil und dem Kostenanteil einer Komponente.']],
    related: [['rw-kostentreiber', 'Prozesskostenrechnung'], ['co-produktlebenszyklus', 'Produktlebenszyklusanalyse']],
  },
  {
    chapter: 'rw-prozesskosten', id: 'rw-kostentreiber', title: 'Prozesskostenrechnung und Kostentreiber',
    intro: 'Die Prozesskostenrechnung verrechnet Gemeinkosten über die Aktivitäten, die Aufträge, Produkte oder Kunden tatsächlich beanspruchen.',
    principle: [
      'Die Prozessanalyse erfasst wiederkehrende Tätigkeiten in indirekten Bereichen und bündelt sie zu Teilprozessen. Zusammengehörige Teilprozesse mehrerer Kostenstellen können zu Hauptprozessen verbunden werden. Wähle messbare Kostentreiber mit plausibler Ursache-Wirkung, etwa Bestellpositionen, Qualitätsprüfungen oder Retouren.',
      'Leistungsmengeninduzierte (lmi) Prozesse verändern ihren Ressourcenbedarf mit der Prozessmenge. Leistungsmengenneutrale (lmn) Tätigkeiten, etwa allgemeine Bereichsleitung, folgen der gewählten Mengengröße nicht direkt. Der lmi-Prozesskostensatz ist lmi-Prozesskosten ÷ geplante Prozessmenge. Lmn-Kosten können separat ausgewiesen oder für eine Vollkostenkalkulation nach dokumentiertem Schlüssel zugeschlagen werden.',
      'Rechne Auftragseinheiten mal jeweiligem Prozesskostensatz und addiere die Prozesskosten je Kostenträger. Kosten können auf Stück-, Los-, Produkt- oder Betriebsebene anfallen. Ein standardisierter Treiber passt nur, wenn die Vorgänge ausreichend homogen sind. Bei unterschiedlichen Zeiten kann Time-Driven ABC mit Kapazitätskostensatz und Zeitgleichung geeigneter sein.',
    ],
    example: [
      'Der Einkauf veranschlagt 60.000 € für 3.000 Bestellungen und 36.000 € für 1.200 Prüfungen. Das ergibt 20 €/Bestellung und 30 €/Prüfung. Ein Auftrag mit zwei Bestellungen und drei Prüfungen beansprucht 2 × 20 € + 3 × 30 € = 130 € lmi-Prozesskosten.',
      '12.000 € lmn-Bereichskosten werden für die Vollkostenkalkulation proportional zu 96.000 € lmi-Kosten umgelegt. Zuschlag 12,5 %, auf den Beispielauftrag also 16,25 €. Er erhält 146,25 € Prozessvollkosten. Für eine Zusatzentscheidung prüfst du separat, welche Kosten tatsächlich zusätzlich entstehen.',
    ],
    interpretation: [
      'Viele kleine Lose beanspruchen oft mehr Bestellungen und Prüfungen je Stück als eine große Serie. Ein Zuschlag auf Materialwert verdeckt diese Komplexität. Prozesskosten zeigen Ansatzpunkte wie gebündelte Bestellungen und weniger Fehler, führen aber erst mit realer Kapazitäts- oder Ressourcenänderung zu Einsparungen.',
      'Bei 1.200 verfügbaren Praxisstunden und 60.000 € Kapazitätskosten ergibt Time-Driven ABC 50 €/h. Werden nur 1.000 Stunden genutzt, bleiben 10.000 € ungenutzte Kapazitätskosten sichtbar. Eine Kalkulation mit der tatsächlichen statt der praktischen Kapazität würde diese Kosten vollständig in die Leistungssätze einrechnen.',
    ],
    check: ['Was macht einen guten Kostentreiber aus?', 'Er ist messbar, erklärt den Ressourcenverbrauch plausibel und funktioniert für vergleichbare Vorgänge.'],
    transfer: ['Retourenprüfung kostet 27.000 € für 900 Vorgänge. Ein Kunde löst 12 Vorgänge aus. Wie hoch ist die Verrechnung? Welcher Schluss über Einsparung ist zulässig?', 'Satz 30 €/Vorgang, Verrechnung 360 €. Dieser Betrag ist kalkulatorisch zugerechnet. Eine Kostenersparnis entsteht nur insoweit, wie Ressourcen oder Kosten tatsächlich entfallen.'],
    terms: [['Prozesskostenrechnung', 'Gemeinkostenverrechnung anhand beanspruchter Aktivitäten und ihrer Prozessmengen.'], ['Kostentreiber', 'Messbare Größe, die den Ressourcenverbrauch eines Prozesses erklärt.'], ['Prozesskostensatz', 'Kosten je Einheit eines Prozesskostentreibers.']],
    related: [['rw-target-costing', 'Zielkostenrechnung'], ['co-benchmark', 'Prozesse und Kennzahlen für Benchmarking vergleichen']],
  },
  {
    chapter: 'rw-klr-praxis', id: 'rw-praxisfall', title: 'Berufstypische Fälle zur Kosten- und Leistungsrechnung',
    intro: 'Zwei Fälle verbinden Ergebnisrechnung, Kapazitätsentscheidung und Ursachenanalyse. Formuliere jeweils eine Empfehlung und benenne die entscheidende Annahme.',
    principle: [
      'Trenne zuerst die Entscheidung vor dem Auftrag von der Auswertung nach der Periode. Die Entscheidungsrechnung vergleicht Ergebnisänderungen. Die Abweichungsanalyse prüft, wie sich die Istleistung und ihr Ressourcenverbrauch gegenüber definierten Vorgaben entwickelt haben.',
      'Halte Menge, Bezugsgröße, Zeitraum und Preisbasis fest. Bei Engpass oder Fixkostensprung ändert sich der relevante Vergleich. Bei Soll-Ist-Vergleichen darf eine bessere Auslastung nicht automatisch als geringerer Verbrauch je Stück ausgelegt werden.',
    ],
    example: [
      'Fall A: Ein Spediteur soll 20 Zusatzsendungen zu 95 € übernehmen. Je Sendung fallen 60 € variable Kosten an, dazu insgesamt 250 € Projektpauschale. Fünf reguläre Sendungen mit je 70 € Deckungsbeitrag müssten entfallen. Berechne vor dem Lesen der Lösung Preisuntergrenze und Ergebnisänderung.',
      'Lösung A: 20 × 60 € + 250 € + 5 × 70 € = 1.800 € relevante Kosten einschließlich Verdrängung. Untergrenze 90 €/Sendung. 20 × 95 € − 1.800 € = 100 € Vorteil. Ohne Verdrängung wären es 450 €. Der Vertrag sollte Kapazität und Terminzusage eindeutig festlegen.',
      'Fall B: Die Werkstatt plant 1.000 Stunden, 10.000 € Fixkosten und 14 €/h variable Kosten. Istwerte: 900 Stunden und 23.200 €. Berechne Sollkosten, verrechnete Plankosten sowie Beschäftigungs- und verbleibende Kostenabweichung.',
      'Lösung B: Soll 10.000 € + 900 × 14 € = 22.600 €. Verrechnet 900 × 24 € = 21.600 €. Beschäftigung +1.000 €, Ist minus Soll +600 €, gesamt +1.600 €. Für die 600 € werden Faktorpreise und Verbrauchsmengen nachgefordert.',
    ],
    interpretation: [
      'Fall A hängt stark an der Verdrängung und den Kosten der Terminsicherung. Fall B verlangt getrennte Maßnahmen für Auslastung und für Mehrverbrauch oder höhere Preise. Definiere Verantwortliche, Datenquelle und Termin für die erneute Prüfung.',
    ],
    check: ['Warum kann ein positiver Zusatzdeckungsbeitrag allein für eine Auftragsannahme zu kurz greifen?', 'Auftragsspezifische Fixkosten, verdrängte Alternativen und Auswirkungen auf bestehende Verpflichtungen können die Ergebniswirkung verändern.'],
    transfer: ['Im Zusatzauftrag aus Fall A steigen die variablen Kosten auf 67 €/Sendung. Ist der Auftrag bei unveränderter Verdrängung wirtschaftlich?', 'Zusätzliche 20 × 7 € = 140 € drehen den Vorteil von 100 € in −40 €. Der neue Mindestpreis beträgt 97 €/Sendung.'],
    related: [['rw-preisuntergrenzen', 'Preisuntergrenzen und Auftragsannahme'], ['rw-sollkosten', 'Flexible Plankostenrechnung']],
  },
];

export const { articles: operatingAccountingArticles, glossary: operatingAccountingGlossary } = buildLearningArticles(operatingAccountingChapters, entries);
