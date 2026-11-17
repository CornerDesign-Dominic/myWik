import type { Article, Chapter, GlossaryTerm, Subject } from '../types';

export const subjects: Subject[] = [
  { id: 'bwl', title: 'BWL', subtitle: 'Betriebliche Entscheidungen verstehen', icon: 'building' },
  { id: 'vwl', title: 'VWL', subtitle: 'Wirtschaftliche Zusammenhänge erkennen', icon: 'globe' },
  { id: 'rechnungswesen', title: 'Rechnungswesen', subtitle: 'Buchführung, Kosten und Ergebnisse einordnen', icon: 'calculator' },
  { id: 'recht', title: 'Recht', subtitle: 'Rechtsgrundlagen im Unternehmen', icon: 'scale' },
  { id: 'steuern', title: 'Steuern', subtitle: 'Steuerarten und betriebliche Auswirkungen', icon: 'receipt' },
  { id: 'unternehmensfuehrung', title: 'Unternehmensführung', subtitle: 'Strategie und Organisation gestalten', icon: 'compass' },
  { id: 'betriebliches-management', title: 'Betriebliches Management', subtitle: 'Planen, organisieren und Projekte steuern', icon: 'workflow' },
  { id: 'investition-finanzierung', title: 'Investition und Finanzierung', subtitle: 'Investitionen bewerten und Kapital beschaffen', icon: 'calculator' },
  { id: 'controlling', title: 'Controlling', subtitle: 'Planung, Kennzahlen und Abweichungen auswerten', icon: 'target' },
  { id: 'logistik', title: 'Logistik', subtitle: 'Material- und Informationsflüsse gestalten', icon: 'truck' },
  { id: 'marketing', title: 'Marketing und Vertrieb', subtitle: 'Märkte verstehen und Kunden gewinnen', icon: 'target' },
  { id: 'fuehrung-zusammenarbeit', title: 'Führung und Zusammenarbeit', subtitle: 'Menschen führen, kommunizieren und Konflikte lösen', icon: 'users' },
  // Keep this ID: existing training articles, cards and learning sessions use it.
  { id: 'personal', title: 'Personal und Ausbildung', subtitle: 'Personal gewinnen, entwickeln und ausbilden', icon: 'users' },
];

export const chapters: Chapter[] = [
  { id: 'rw-klr', subjectId: 'rechnungswesen', number: '1', title: 'Kosten- und Leistungsrechnung' },
  { id: 'rw-grundlagen', subjectId: 'rechnungswesen', parentId: 'rw-klr', number: '1.1', title: 'Grundlagen der Kostenrechnung' },
  { id: 'rw-teilkosten', subjectId: 'rechnungswesen', parentId: 'rw-klr', number: '1.2', title: 'Teilkostenrechnung' },
  { id: 'rw-db', subjectId: 'rechnungswesen', parentId: 'rw-teilkosten', number: '1.2.1', title: 'Deckungsbeitrag', articleId: 'deckungsbeitrag' },
  { id: 'rw-break-even', subjectId: 'rechnungswesen', parentId: 'rw-teilkosten', number: '1.2.2', title: 'Break-even-Analyse' },
  { id: 'rw-preisuntergrenzen', subjectId: 'rechnungswesen', parentId: 'rw-teilkosten', number: '1.2.3', title: 'Preisuntergrenzen' },
  { id: 'rw-jahresabschluss', subjectId: 'rechnungswesen', number: '2', title: 'Buchführung und Jahresabschluss' },
  { id: 'personal-ausbildung', subjectId: 'personal', number: '1', title: 'Ausbildung' },
  { id: 'personal-methoden', subjectId: 'personal', parentId: 'personal-ausbildung', number: '1.1', title: 'Ausbildungsmethoden' },
  { id: 'personal-leittext', subjectId: 'personal', parentId: 'personal-methoden', number: '1.1.1', title: 'Leittextmethode', articleId: 'leittextmethode' },
  { id: 'personal-planung', subjectId: 'personal', number: '2', title: 'Personalplanung und Personalbeschaffung' },
  { id: 'personal-entwicklung', subjectId: 'personal', number: '3', title: 'Personalbetreuung und Personalentwicklung' },
  { id: 'marketing-planung', subjectId: 'marketing', number: '1', title: 'Marketingplanung' },
  { id: 'marketing-analyse', subjectId: 'marketing', parentId: 'marketing-planung', number: '1.1', title: 'Analyse der Ausgangssituation' },
  { id: 'marketing-ziele', subjectId: 'marketing', parentId: 'marketing-planung', number: '1.2', title: 'Marketingziele und Strategien' },
  { id: 'marketing-mix', subjectId: 'marketing', number: '2', title: 'Marketinginstrumente' },
  { id: 'marketing-vertrieb', subjectId: 'marketing', number: '3', title: 'Vertrieb und Kundenmanagement' },
  { id: 'logistik-grundlagen', subjectId: 'logistik', number: '1', title: 'Grundlagen und Ziele der Logistik' },
  { id: 'logistik-beschaffung', subjectId: 'logistik', number: '2', title: 'Beschaffungslogistik' },
  { id: 'logistik-lager', subjectId: 'logistik', number: '3', title: 'Lager- und Distributionslogistik' },
  { id: 'bwl-grundlagen', subjectId: 'bwl', number: '1', title: 'Betriebliche Grundfunktionen' },
  { id: 'bwl-rechtsformen', subjectId: 'bwl', number: '2', title: 'Rechtsformen und Unternehmensverbindungen' },
  { id: 'vwl-maerkte', subjectId: 'vwl', number: '1', title: 'Märkte und Preisbildung' },
  { id: 'vwl-politik', subjectId: 'vwl', number: '2', title: 'Wirtschaftspolitik und Konjunktur' },
  { id: 'recht-vertraege', subjectId: 'recht', number: '1', title: 'Rechtsgeschäfte und Verträge' },
  { id: 'steuern-arten', subjectId: 'steuern', number: '1', title: 'Steuerarten und Besteuerungsverfahren' },
  { id: 'uf-strategie', subjectId: 'unternehmensfuehrung', number: '1', title: 'Strategische Unternehmensführung' },
  { id: 'uf-organisation', subjectId: 'unternehmensfuehrung', number: '2', title: 'Organisation und Veränderung' },
  { id: 'bm-planung', subjectId: 'betriebliches-management', number: '1', title: 'Betriebliche Planung und Steuerung' },
  { id: 'bm-projekt', subjectId: 'betriebliches-management', number: '2', title: 'Projektmanagement' },
  { id: 'if-investition', subjectId: 'investition-finanzierung', number: '1', title: 'Investitionsplanung und Investitionsrechnung' },
  { id: 'if-statisch', subjectId: 'investition-finanzierung', parentId: 'if-investition', number: '1.1', title: 'Statische Verfahren der Investitionsrechnung' },
  { id: 'if-dynamisch', subjectId: 'investition-finanzierung', parentId: 'if-investition', number: '1.2', title: 'Dynamische Verfahren der Investitionsrechnung' },
  { id: 'if-finanzierungsarten', subjectId: 'investition-finanzierung', number: '2', title: 'Finanzierungsarten' },
  { id: 'if-liquiditaet', subjectId: 'investition-finanzierung', number: '3', title: 'Finanzplanung und Liquidität' },
  { id: 'controlling-grundlagen', subjectId: 'controlling', number: '1', title: 'Aufgaben und Instrumente des Controllings' },
  { id: 'controlling-planung', subjectId: 'controlling', number: '2', title: 'Planung, Budgetierung und Kontrolle' },
  { id: 'controlling-kennzahlen', subjectId: 'controlling', number: '3', title: 'Kennzahlen und Berichtswesen' },
  { id: 'fz-fuehrung', subjectId: 'fuehrung-zusammenarbeit', number: '1', title: 'Führungsverhalten und Führungsinstrumente' },
  { id: 'fz-kommunikation', subjectId: 'fuehrung-zusammenarbeit', number: '2', title: 'Kommunikation und Zusammenarbeit' },
  { id: 'fz-konflikte', subjectId: 'fuehrung-zusammenarbeit', number: '3', title: 'Konfliktmanagement und Moderation' },
];

const updatedAt = Date.UTC(2026, 10, 16);
export const articles: Article[] = [
  {
    id: 'deckungsbeitrag', subjectId: 'rechnungswesen', chapterId: 'rw-db', title: 'Der Deckungsbeitrag', number: '1.2.1', updatedAt, version: 1,
    intro: 'Was bleibt von einem Verkauf übrig, um Fixkosten zu decken und Gewinn zu erzielen? Der Deckungsbeitrag macht genau diesen Zusammenhang sichtbar.',
    sections: [
      {
        id: 'definition', title: 'Kurz erklärt und definiert',
        paragraphs: [
          [{ text: 'Der ' }, { text: 'Deckungsbeitrag', termId: 'deckungsbeitrag' }, { text: ' ist die Differenz zwischen den Erlösen und den ' }, { text: 'variablen Kosten', termId: 'variable-kosten' }, { text: '. Er steht zur Deckung der Fixkosten und – darüber hinaus – zur Gewinnerzielung zur Verfügung.' }],
          [{ text: 'In der einstufigen Deckungsbeitragsrechnung werden die variablen Kosten den Kostenträgern zugerechnet. Die ' }, { text: 'Fixkosten', termId: 'fixkosten' }, { text: ' werden als gemeinsamer Kostenblock vom gesamten Deckungsbeitrag abgezogen.' }],
        ],
        hint: { title: 'Deckungsbeitrag ist noch kein Gewinn', content: 'Ein positiver Deckungsbeitrag bedeutet: Ein Produkt trägt zur Deckung der Fixkosten bei. Gewinn entsteht erst dann, wenn der gesamte Deckungsbeitrag die gesamten Fixkosten übersteigt. Sind beide gleich hoch, liegt die Gewinnschwelle vor.' },
      },
      {
        id: 'berechnung', title: 'Stück- und Gesamtdeckungsbeitrag',
        paragraphs: [
          [{ text: 'Der Stückdeckungsbeitrag (db) zeigt den Beitrag einer verkauften Einheit. Der Gesamtdeckungsbeitrag (DB) berücksichtigt die Absatzmenge. Rechne immer mit vergleichbaren Bezugsgrößen: Stückwerte mit Stückwerten, Periodenwerte mit Periodenwerten.' }],
          [{ text: 'Im folgenden Beispiel werden Nettowerte verwendet. Verkaufspreis, variable Stückkosten und Fixkosten beziehen sich auf dieselbe betrachtete Periode und dieselben Annahmen.' }],
        ],
        tabs: [
          { title: 'Beispiel', content: 'Ein Betrieb verkauft Lampen für 80 € netto je Stück. Die variablen Kosten betragen 35 € je Lampe. In einem Monat verkauft er 200 Lampen. Die monatlichen Fixkosten betragen 6.000 €. Gesucht sind Stückdeckungsbeitrag, Gesamtdeckungsbeitrag und Betriebsergebnis.' },
          { title: 'Formeln', content: 'Stückdeckungsbeitrag: db = p − kv\nGesamtdeckungsbeitrag: DB = db × x = E − Kv\nBetriebsergebnis: BE = DB − Kf\n\np: Nettoverkaufspreis je Stück\nkv: variable Kosten je Stück\nx: Absatzmenge\nE: gesamte Erlöse\nKv: gesamte variable Kosten\nKf: gesamte Fixkosten' },
          { title: 'Rechenweg', content: '1. Stückdeckungsbeitrag:\n80 €/Stück − 35 €/Stück = 45 €/Stück\n\n2. Gesamtdeckungsbeitrag:\n45 €/Stück × 200 Stück = 9.000 €\n\n3. Betriebsergebnis:\n9.000 € − 6.000 € = 3.000 € Gewinn\n\nKontrolle: 16.000 € Erlöse − 7.000 € variable Kosten − 6.000 € Fixkosten = 3.000 €.' },
          { title: 'Einordnung', content: 'Von jeder verkauften Lampe bleiben 45 € zur Deckung der Fixkosten übrig. Bei 200 Lampen stehen dafür 9.000 € zur Verfügung. Nachdem die monatlichen Fixkosten von 6.000 € gedeckt sind, bleiben 3.000 € Gewinn.' },
        ],
      },
      {
        id: 'entscheidung', title: 'Wofür wird der Deckungsbeitrag genutzt?',
        paragraphs: [
          [{ text: 'Deckungsbeiträge unterstützen kurzfristige Entscheidungen: Welche Produkte tragen zur Kostendeckung bei? Ist ein Zusatzauftrag wirtschaftlich sinnvoll? Wie verändert eine Absatzänderung das Ergebnis? Für langfristige Entscheidungen müssen sämtliche relevanten Kosten und weitere Einflussfaktoren berücksichtigt werden.' }],
          [{ text: 'Ein positiver zusätzlicher Deckungsbeitrag kann für einen Zusatzauftrag sprechen, wenn freie Kapazitäten vorhanden sind und keine zusätzlichen relevanten Fixkosten, Verdrängungseffekte oder anderen Nachteile entstehen. Die Aussage „positiver Deckungsbeitrag = Auftrag immer annehmen“ wäre falsch.' }],
          [{ text: 'Bei einem Kapazitätsengpass ist der absolute Stückdeckungsbeitrag allein nicht ausreichend. Dann ist unter anderem der relative Deckungsbeitrag je Einheit des knappen Faktors entscheidungsrelevant.' }],
        ],
        tabs: [
          { title: 'Praxis', content: 'Eine Druckerei kann zusätzlich 100 Broschüren produzieren, ohne reguläre Aufträge zu verdrängen. Der Kunde zahlt 4 € je Stück; zusätzliche variable Kosten betragen 2,50 € je Stück. Ohne weitere relevante Kosten erhöht der Auftrag das Betriebsergebnis um 150 €: (4 € − 2,50 €) × 100.' },
          { title: 'Prüfen', content: 'Vor der Entscheidung prüfen: Gibt es tatsächlich freie Kapazität? Fallen Rüst-, Liefer- oder weitere Zusatzkosten an? Werden andere Aufträge verdrängt? Entstehen Preis- oder Kundenkonflikte? Alle entscheidungsrelevanten Änderungen gehören in die Rechnung.' },
        ],
      },
      {
        id: 'fehler', title: 'Typische Fehler vermeiden',
        paragraphs: [
          [{ text: 'Fixkosten schon beim Stückdeckungsbeitrag abziehen: Der Stückdeckungsbeitrag ist zunächst nur Preis minus variable Stückkosten. Der Fixkostenblock folgt bei der Berechnung des Betriebsergebnisses.' }],
          [{ text: 'Stück- und Gesamtwerte vermischen: 80 € je Stück minus 7.000 € pro Monat ist keine sinnvolle Berechnung. Zuerst dieselbe Bezugsebene herstellen.' }],
          [{ text: 'Negative Deckungsbeiträge übersehen: Wenn der Verkaufspreis unter den variablen Stückkosten liegt, verschlechtert jede zusätzliche Einheit bei unveränderten übrigen Bedingungen das Betriebsergebnis.' }],
        ],
        hint: { title: 'Verbindung zur Break-even-Analyse', content: 'Bei konstantem Preis und konstanten variablen Stückkosten gilt: Break-even-Menge = Fixkosten ÷ Stückdeckungsbeitrag, sofern der Stückdeckungsbeitrag positiv ist. Im Lampenbeispiel: 6.000 € ÷ 45 €/Stück = 133,33… Stück. Bei nur ganzen Lampen sind mindestens 134 Stück nötig, um keinen Verlust zu erzielen.' },
      },
    ],
  },
  {
    id: 'leittextmethode', subjectId: 'personal', chapterId: 'personal-leittext', title: 'Die Leittextmethode', number: '1.1.1', updatedAt, version: 1,
    intro: 'Die Leittextmethode unterstützt selbstständiges Lernen anhand eines Arbeitsauftrags. Lernende planen, bearbeiten und bewerten ihre Aufgabe; die ausbildende Person begleitet den Prozess.',
    sections: [
      { id: 'definition', title: 'Prinzip und Ziel', paragraphs: [
        [{ text: 'Die ' }, { text: 'Leittextmethode', termId: 'leittextmethode' }, { text: ' ist eine handlungsorientierte Ausbildungsmethode. Leitfragen, Informationen und Kontrollhilfen führen Lernende durch einen Arbeitsauftrag, ohne jeden einzelnen Arbeitsschritt vorzugeben.' }],
        [{ text: 'Ziel ist neben Fachkompetenz auch die Förderung von Methodenkompetenz, Selbstständigkeit und Verantwortungsübernahme. Sie orientiert sich am Modell der ' }, { text: 'vollständigen Handlung', termId: 'vollstaendige-handlung' }, { text: '.' }],
      ] },
      { id: 'ablauf', title: 'Die sechs Phasen der vollständigen Handlung', paragraphs: [
        [{ text: '1. Informieren: Arbeitsauftrag verstehen, erforderliche Informationen beschaffen und Leitfragen bearbeiten.' }],
        [{ text: '2. Planen: Vorgehen, Reihenfolge, Arbeitsmittel und Zeitbedarf bestimmen.' }],
        [{ text: '3. Entscheiden: Den Plan mit der ausbildenden Person besprechen, Alternativen bewerten und das Vorgehen festlegen.' }],
        [{ text: '4. Ausführen: Den Auftrag möglichst selbstständig umsetzen. Die ausbildende Person unterstützt bei Bedarf und achtet auf Sicherheit und Rahmenbedingungen.' }],
        [{ text: '5. Kontrollieren: Das Ergebnis anhand vorher festgelegter Kriterien prüfen und Abweichungen erkennen.' }],
        [{ text: '6. Bewerten: Vorgehen und Ergebnis gemeinsam reflektieren, Verbesserungen ableiten und Erkenntnisse auf weitere Aufgaben übertragen.' }],
      ], hint: { title: 'Kontrollieren und Bewerten unterscheiden', content: 'Beim Kontrollieren wird geprüft, ob das Ergebnis die Anforderungen erfüllt. Beim Bewerten wird darüber hinaus reflektiert, wie gut Vorgehen, Entscheidungen und Ergebnis waren und was beim nächsten Mal verbessert werden kann.' } },
      { id: 'praxis', title: 'Beispiel: Einen Wareneingang bearbeiten', paragraphs: [
        [{ text: 'Ein Auszubildender soll eine Lieferung prüfen und den Wareneingang dokumentieren. Der Leittext enthält den Auftrag, Leitfragen, verfügbare Unterlagen und Qualitätskriterien.' }],
      ], tabs: [
        { title: 'Leitfragen', content: 'Welche Unterlagen benötigst du? Wie prüfst du Identität, Menge und Zustand der Ware? Wie dokumentierst du Abweichungen? Wen informierst du bei Unklarheiten? Welche Sicherheitsregeln gelten?' },
        { title: 'Umsetzung', content: 'Der Auszubildende erarbeitet einen Prüfplan und bespricht ihn mit der ausbildenden Person. Anschließend prüft er die Lieferung, dokumentiert das Ergebnis und kontrolliert seine Arbeit anhand der Kriterien.' },
        { title: 'Reflexion', content: 'Welche Abweichungen wurden erkannt? War die Dokumentation vollständig? Was hat gut funktioniert? Wo waren zusätzliche Informationen nötig? Wie lässt sich der nächste Wareneingang sicherer oder effizienter bearbeiten?' },
      ] },
      { id: 'einsatz', title: 'Eignung, Vorteile und Grenzen', paragraphs: [
        [{ text: 'Die Methode eignet sich für sinnvoll abgrenzbare, praxisnahe Aufgaben, bei denen Lernende tatsächlich planen und entscheiden können. Das Vorwissen, der Schwierigkeitsgrad und die verfügbaren Hilfen müssen zusammenpassen.' }],
        [{ text: 'Vorteile sind aktives Lernen, selbstständige Informationsbeschaffung und die Verbindung von Theorie und Praxis. Grenzen sind der Vorbereitungsaufwand und eine mögliche Überforderung bei fehlenden Voraussetzungen.' }],
        [{ text: 'Die ausbildende Person bleibt Lernbegleiter und trägt weiterhin Verantwortung. Selbstständigkeit bedeutet nicht, Lernende bei gefährlichen oder unbekannten Tätigkeiten ohne Anleitung arbeiten zu lassen.' }],
      ] },
    ],
  },
];

export const glossary: GlossaryTerm[] = [
  { id: 'deckungsbeitrag', subjectId: 'rechnungswesen', term: 'Deckungsbeitrag', definition: 'Differenz zwischen Erlösen und variablen Kosten. Der Deckungsbeitrag dient der Deckung der Fixkosten und darüber hinaus der Gewinnerzielung.', example: '80 € Nettoverkaufspreis − 35 € variable Stückkosten = 45 € Stückdeckungsbeitrag.', articleId: 'deckungsbeitrag' },
  { id: 'variable-kosten', subjectId: 'rechnungswesen', term: 'Variable Kosten', definition: 'Kosten, deren Höhe sich mit der Beschäftigung beziehungsweise Ausbringungsmenge verändert. Der Verlauf kann proportional, progressiv oder degressiv sein.', example: 'Bei konstantem Materialverbrauch je Stück steigen die gesamten Materialkosten mit der produzierten Stückzahl.', articleId: 'deckungsbeitrag' },
  { id: 'fixkosten', subjectId: 'rechnungswesen', term: 'Fixkosten', definition: 'Kosten, die innerhalb eines bestimmten Beschäftigungsbereichs und einer betrachteten Zeitspanne unabhängig von der Beschäftigung anfallen.', example: 'Eine vereinbarte monatliche Hallenmiete bleibt innerhalb der bestehenden Kapazität gleich, auch wenn weniger produziert wird.', articleId: 'deckungsbeitrag' },
  { id: 'leittextmethode', subjectId: 'personal', term: 'Leittextmethode', definition: 'Handlungsorientierte Ausbildungsmethode, bei der Lernende einen Arbeitsauftrag mithilfe von Leitfragen, Informationen und Kontrollhilfen weitgehend selbstständig planen, ausführen und reflektieren.', articleId: 'leittextmethode' },
  { id: 'vollstaendige-handlung', subjectId: 'personal', term: 'Vollständige Handlung', definition: 'Modell einer selbstständig bewältigten beruflichen Handlung mit den Phasen Informieren, Planen, Entscheiden, Ausführen, Kontrollieren und Bewerten.', example: 'Eine Arbeitsaufgabe wird nicht nur ausgeführt: Lernende planen zuvor ihr Vorgehen und prüfen sowie reflektieren danach das Ergebnis.', articleId: 'leittextmethode' },
];

export const contentVersion = 2;
