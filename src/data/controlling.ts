import type { Chapter } from '../types';
import { buildLearningArticles, type LearningArticle } from './rechnungswesen-controlling-standard';

const subjectId = 'controlling';
export const controllingChapters: Chapter[] = [
  { id: 'controlling-grundlagen', subjectId, number: '1', title: 'Aufgaben und Instrumente des Controllings' },
  { id: 'co-steuerung-grundlagen', subjectId, parentId: 'controlling-grundlagen', number: '1.1', title: 'Begriff, Notwendigkeit und Aufgaben', articleId: 'co-steuerung' },
  { id: 'co-organisation', subjectId, parentId: 'controlling-grundlagen', number: '1.2', title: 'Organisatorische Eingliederung', articleId: 'co-organisationsformen' },
  { id: 'co-strategie', subjectId, parentId: 'controlling-grundlagen', number: '1.3', title: 'Strategische Controllinginstrumente' },
  { id: 'co-strategie-gap', subjectId, parentId: 'co-strategie', number: '1.3.1', title: 'GAP-Analyse', articleId: 'co-zielluecke' },
  { id: 'co-strategie-lebenszyklus', subjectId, parentId: 'co-strategie', number: '1.3.2', title: 'Produktlebenszyklusanalyse', articleId: 'co-produktlebenszyklus' },
  { id: 'co-strategie-potenzial', subjectId, parentId: 'co-strategie', number: '1.3.3', title: 'Potenzialanalyse und SWOT', articleId: 'co-potenzial-swot' },
  { id: 'co-strategie-benchmark', subjectId, parentId: 'co-strategie', number: '1.3.4', title: 'Benchmarking', articleId: 'co-benchmark' },
  { id: 'co-strategie-portfolio', subjectId, parentId: 'co-strategie', number: '1.3.5', title: 'Vier-Felder-Portfolioanalyse', articleId: 'co-bcg-portfolio' },
  { id: 'co-strategie-scorecard', subjectId, parentId: 'co-strategie', number: '1.3.6', title: 'Balanced Scorecard', articleId: 'co-balanced-scorecard' },
  { id: 'controlling-planung', subjectId, number: '2', title: 'Planung, Budgetierung und Kontrolle' },
  { id: 'co-budget-forecast', subjectId, parentId: 'controlling-planung', number: '2.1', title: 'Planung, Budgetierung und Forecast', articleId: 'co-planung-budget' },
  { id: 'co-ursachenanalyse', subjectId, parentId: 'controlling-planung', number: '2.2', title: 'Operativer Soll-Ist-Vergleich und Maßnahmen', articleId: 'co-planung-abweichung' },
  { id: 'controlling-kennzahlen', subjectId, number: '3', title: 'Kennzahlen und Berichtswesen' },
  { id: 'co-kennzahlen-grundlagen', subjectId, parentId: 'controlling-kennzahlen', number: '3.1', title: 'Kennzahlen bilden und beurteilen', articleId: 'co-kennzahlen' },
  { id: 'co-rentabilitaet', subjectId, parentId: 'controlling-kennzahlen', number: '3.2', title: 'ROI und DuPont-System', articleId: 'co-dupont' },
  { id: 'co-berichtsprozess', subjectId, parentId: 'controlling-kennzahlen', number: '3.3', title: 'Reporting und Informationsmanagement', articleId: 'co-reporting' },
  { id: 'co-controlling-faelle', subjectId, number: '4', title: 'Berufstypische Fälle zum Controlling', articleId: 'co-praxisfaelle' },
];

const entries: LearningArticle[] = [
  {
    chapter: 'co-steuerung-grundlagen', id: 'co-steuerung', title: 'Begriff, Notwendigkeit und Aufgaben des Controllings',
    intro: 'Controlling unterstützt die Unternehmensführung mit Planung, entscheidungsrelevanten Informationen, Abweichungsanalysen und der Nachverfolgung von Maßnahmen.',
    principle: [
      'Unternehmensbereiche arbeiten mit unterschiedlichen Zielen und Daten. Vertrieb will Lieferzusagen ermöglichen, die Produktion braucht stabile Abläufe und Finance muss Liquidität sichern. Controlling koordiniert Teilpläne, macht Zielkonflikte und Annahmen sichtbar und verbindet Entscheidungen mit überprüfbaren Zielen.',
      'Ein Steuerungskreislauf führt vom Ziel über Planung und Umsetzung zur Ist-Erfassung, zum Soll-Ist-Vergleich, zur Ursachenanalyse und zur Anpassung. Controlling unterstützt Methodik, Datenqualität, Planung, Reporting, Wirtschaftlichkeitsrechnung und die Bewertung von Alternativen. Die Unternehmensführung entscheidet und verantwortet Ziele sowie Maßnahmen.',
      'Strategisches Controlling prüft langfristige Erfolgspotenziale, etwa Marktposition, Kompetenzen und Risiken. Operatives Controlling steuert laufende Ergebnisse, Ressourcen und Liquidität mit Budgets, Deckungsbeiträgen, Kennzahlen und Berichten. Die Instrumente greifen ineinander. Eine Balanced Scorecard übersetzt beispielsweise strategische Ziele in überprüfbare operative Treiber.',
    ],
    example: [
      'Eine Spedition beschließt, terminkritische Ersatzteillogistik als Geschäftsfeld aufzubauen. Strategisch prüft das Controlling Marktpotenzial, erforderliche Partnerabdeckung und Investitionsbedarf. Operativ plant es Sendungsvolumen, Einkaufspreise, Deckungsbeiträge und Servicelevel.',
      'Nach zwei Monaten liegen Pünktlichkeit und Ergebnis unter Plan. Das Controlling trennt fehlende Kapazität, verspätete Abholungen und teure Ersatzfahrten. Die Bereichsleitung entscheidet über feste Kapazitätszusagen. Im Folgemonat werden Kosten und Pünktlichkeit gemeinsam ausgewertet.',
    ],
    interpretation: [
      'Steuerung setzt messbare Ziele, belastbare Ist-Daten und Möglichkeiten zum Eingreifen voraus. Monatsberichte kommen bei zeitkritischen Prozessen oft zu spät. Verwende Frühindikatoren wie ausstehende Ladebestätigungen neben Ergebniskennzahlen wie dem Monatsdeckungsbeitrag.',
      'Historische Istwerte zeigen Folgen vergangener Entscheidungen. Forecasts und Szenarien helfen, erwartete Konsequenzen vor einer Entscheidung zu prüfen. Vermeide eine Überfülle von Kennzahlen ohne Entscheidungsbezug.',
    ],
    check: ['Wer trägt die Verantwortung für eine Maßnahme, die das Controlling vorbereitet?', 'Die zuständige Führungskraft entscheidet und verantwortet die Umsetzung. Das Controlling unterstützt Analyse und Nachverfolgung.'],
    transfer: ['Zustellungen bleiben pünktlich, aber immer mehr Touren benötigen teure Ersatzfahrten. Welchen zusätzlichen Indikator und welche Entscheidung würdest du vorbereiten?', 'Verfolge den Anteil und die Kosten ungeplanter Ersatzfahrten nach Relation und Ursache. Prüfe dann beispielsweise verbindliche Partnerkapazität gegen die erwarteten Ersatzkosten und die Servicewirkung.'],
    terms: [['Controlling', 'Führungsunterstützung durch Koordination von Planung, Analyse, Information und Maßnahmenkontrolle.'], ['Soll-Ist-Vergleich', 'Gegenüberstellung eines festgelegten Vergleichswerts und eines tatsächlich beobachteten Werts.']],
    related: [['co-organisationsformen', 'Organisatorische Eingliederung'], ['co-planung-budget', 'Planung, Budgetierung und Forecast']],
  },
  {
    chapter: 'co-organisation', id: 'co-organisationsformen', title: 'Organisatorische Eingliederung des Controllings',
    intro: 'Die Eingliederung legt fest, wer Standards setzt, wie Controller an Entscheidungen beteiligt sind und welche Weisungsrechte bestehen.',
    principle: [
      'Eine Stabsstelle berät die Leitung und bereitet Entscheidungen vor. Sie hat aus dieser Rolle kein allgemeines Weisungsrecht gegenüber operativen Bereichen. Eine Linienstelle gehört zur Weisungshierarchie. Leitungskompetenzen ergeben sich hier aus ausdrücklich übertragenen Befugnissen, etwa für einen Planungsprozess oder das eigene Team.',
      'Zentrales Controlling erleichtert einheitliche Methoden, konsolidierte Zahlen und unabhängige Berichte. Dezentrales Controlling sitzt näher an Vorgängen, Daten und Bereichsentscheidungen. Risiken sind unterschiedliche Standards und zu starke Bindung an Bereichsinteressen. Kleine Unternehmen können Aufgaben bei Geschäftsführung oder Finance bündeln.',
      'Beim Dotted-Line-Prinzip kennzeichnet die gestrichelte Linie eine zweite, häufig fachliche Berichtslinie. Ein verbreitetes Modell ist die disziplinarische Zuordnung zur Sparte und die fachliche Bindung an das zentrale Controlling. Die konkrete Zuordnung kann umgekehrt organisiert sein. Weisungsumfang, Datenzugang und Eskalation gehören schriftlich geklärt.',
    ],
    example: [
      'Ein Verbund mit drei Niederlassungen verwendet unterschiedliche Definitionen für termingerechte Zustellung. Das zentrale Controlling bestimmt Messpunkt, Datenquelle und Berichtskalender. Dezentrale Controller prüfen Fälle, erklären Abweichungen und unterstützen die jeweiligen Niederlassungsleitungen.',
      'Will eine Niederlassung verspätete Sendungen mit fehlendem Scan aus ihrer Quote ausschließen, muss sie die Abweichung vom Standard offenlegen. Die fachliche Berichtslinie klärt die Kennzahl. Die Niederlassungsleitung verantwortet die Korrektur des Scanprozesses.',
    ],
    interpretation: [
      'Mehrere Berichtslinien ermöglichen Nähe und Vergleichbarkeit, können aber widersprüchliche Aufträge erzeugen. Lege fest, wer Kennzahlen freigibt, wer Prioritäten bei Ressourcenkonflikten setzt und wer bei methodischem Dissens entscheidet.',
      'Auch in einem einzelnen Werk kann die Stabslösung sinnvoll sein, wenn der Controller Daten aus allen Bereichen benötigt. Ein explizites Informationsrecht und regelmäßige Abstimmung erhöhen den Einfluss, ohne operative Verantwortung zu verschieben.',
    ],
    check: ['Welche Rolle besitzt typischerweise kein allgemeines Linienweisungsrecht?', 'Die Stabsstelle. Einzelne Informations- oder Prozessrechte können ihr ausdrücklich übertragen werden.'],
    transfer: ['Zwei Tochtergesellschaften rechnen mit verschiedenen Deckungsbeitragsdefinitionen. Welche Aufgaben würdest du zentral und dezentral ansiedeln?', 'Zentral gehören Definition, Konsolidierung und Prüfung der Vergleichbarkeit. Dezentral gehören Erfassung, Ursachenanalyse und Maßnahmenbegleitung. Lokale Besonderheiten können separat dokumentiert werden.'],
    terms: [['Stabscontrolling', 'Beratende Controllingfunktion, die einer Leitung zugeordnet ist.', ['Stabsstelle']], ['Liniencontrolling', 'Controllingfunktion innerhalb der formalen Weisungshierarchie.', ['Linienstelle']], ['Dotted-Line-Prinzip', 'Organisationsmodell mit zusätzlicher, meist fachlicher Berichtslinie neben der primären Zuordnung.']],
    related: [['co-steuerung', 'Aufgaben des Controllings'], ['co-reporting', 'Reporting und Informationsmanagement']],
  },
  {
    chapter: 'co-strategie-gap', id: 'co-zielluecke', title: 'GAP-Analyse und strategische Ziellücke',
    intro: 'Die GAP-Analyse vergleicht eine gewünschte Zielentwicklung mit einer plausiblen Prognose und macht den verbleibenden Handlungsbedarf sichtbar.',
    principle: [
      'Lege Kennzahl, Zieljahr und Zielpfad fest. Erstelle danach eine Basisprognose für unveränderte Strategie. Eine zweite Prognose kann Verbesserungen des bestehenden Geschäfts enthalten. In dieser Darstellung ist die operative Lücke der Abstand zwischen Basis und verbessertem Bestandsgeschäft, die strategische Lücke der Abstand zwischen verbessertem Bestandsgeschäft und Ziel.',
      'Rechne Maßnahmen nach erwarteter Wirkung, Anlaufzeit, Risiken und Kapazitätsbedarf. Überlappende Maßnahmen dürfen nicht doppelt gezählt werden. Dokumentiere Prognoseannahmen und prüfe eine alternative Entwicklung von Nachfrage, Preisen oder Marktanteilen.',
      'Umsatz-, Ergebnis- und Cashflowlücken können unterschiedliche Maßnahmen verlangen. Ein Umsatzwachstum mit zu niedrigem Deckungsbeitrag vergrößert möglicherweise die Ergebnislücke.',
    ],
    example: [
      'Ziel für Jahr 3: 15 Mio. € Umsatz. Basisprognose: 11 Mio. €. Bessere Bindung von Bestandskunden und selektive Kapazitätserweiterung erhöhen die Prognose auf 12,5 Mio. €. Die Gesamtlücke beträgt 4 Mio. €, davon 1,5 Mio. € operatives Potenzial und 2,5 Mio. € strategisch verbleibende Lücke.',
      'Ein neues Segment könnte 3 Mio. € Umsatz liefern, davon verdrängen 0,6 Mio. € bestehenden Umsatz. Mit 2,4 Mio. € Nettozuwachs bleiben 0,1 Mio. € offen. Prüfe zusätzlich, ob Marge und Anlaufkosten das Ergebnisziel erfüllen.',
    ],
    interpretation: [
      'Die Lücke ist ein Ergebnis der Modellannahmen. Verwende mehrere Szenarien, etwa Preisrückgang und unterschiedliche Nachfrage, bevor du weitreichende Investitionen ableitest.',
      'Bei einem Qualitätsziel, etwa einer Schadenquote, ist eine kleinere Zahl besser. Definiere die Richtung des Abstands vorab und achte darauf, dass eine Differenz von 0,8 % zu 0,5 % genau 0,3 Prozentpunkte beträgt.',
    ],
    check: ['Welche beiden Prognosen helfen, eine Ziellücke aufzuteilen?', 'Eine Basisprognose ohne neue Maßnahmen und eine Prognose mit Verbesserungen des bestehenden Geschäfts.'],
    transfer: ['Ziel sind 2 Mio. € Ergebnis, Basis 1,2 Mio. €, nach Verbesserungen 1,7 Mio. €. Wie groß sind operative, strategische und gesamte Lücke?', 'Operativ 0,5 Mio. €, strategisch 0,3 Mio. €, gesamt 0,8 Mio. €.'],
    terms: [['GAP-Analyse', 'Gegenüberstellung von Zielpfad und Prognose zur Ermittlung einer Ziellücke.', ['Ziellücke']]],
    related: [['co-potenzial-swot', 'Strategische Optionen mit SWOT ableiten'], ['co-planung-budget', 'Forecast und Szenarioplanung']],
  },
  {
    chapter: 'co-strategie-lebenszyklus', id: 'co-produktlebenszyklus', title: 'Produktlebenszyklusanalyse',
    intro: 'Der Produktlebenszyklus hilft, typische Veränderungen von Absatz, Ergebnis und Investitionsbedarf über die Marktzeit eines Produkts einzuordnen.',
    principle: [
      'In der Entwicklungsperiode entstehen Ausgaben vor dem Marktumsatz. Die Einführung ist häufig von niedrigem Absatz und hohen Markteinführungskosten geprägt. Im Wachstum steigt der Absatz schneller und Kapazität wird ausgebaut. In der Reife verlangsamt sich der Zuwachs, Preisdruck und Effizienz gewinnen an Bedeutung.',
      'In der Sättigung stagniert der Absatz zunehmend. Im Umsatzrückgang sinkt der Umsatz längerfristig, etwa durch Substitution oder veränderte Präferenzen. Unternehmen können abschöpfen, Varianten streichen, auf Nischen setzen, aussteigen oder einen Relaunch versuchen. Die Phasen sind ein Modell und haben keine festen Dauern.',
      'Betrachte Absatz, Umsatz, Ergebnis, Cashflow und Wettbewerbsdaten zusammen. Absatz und Umsatz können sich wegen Preisänderungen auseinanderentwickeln. Life Cycle Costing erfasst ergänzend Entwicklungs-, Herstellungs-, Nutzungs- und End-of-Life-Kosten je nach gewählter Hersteller- oder Kundensicht.',
    ],
    example: [
      'Ein Gerät verkauft in vier aufeinanderfolgenden Jahren 2.000, 8.000, 12.000 und 12.100 Stück. Sein Durchschnittspreis fällt im letzten Jahr von 100 € auf 92 €. Damit sinkt der Umsatz von 1,20 Mio. € auf 1.113.200 €, obwohl die Menge leicht steigt.',
      'Absatzwachstum von nur noch etwa 0,8 % und Preisdruck sprechen für Reife oder Sättigung. Prüfe Konkurrenzangebote, Nachfrage und Bestandsentwicklung. Ein Relaunch lohnt sich nur, wenn zusätzlicher Ergebnis- oder Zahlungsbeitrag einschließlich Kannibalisierung die Kosten und Risiken rechtfertigt.',
    ],
    interpretation: [
      'Ein einzelner schwacher Monat reicht zur Phaseneinordnung nicht aus. Saison, Lieferschwierigkeiten oder Preiseffekte können dieselbe Kurve erzeugen. Definiere, ob du eine Einzelvariante, Produktfamilie oder den ganzen Markt beobachtest.',
      'Bei einer Logistiklinie kann eine auslaufende Ausschreibung einen scheinbaren Lebenszyklusknick auslösen. Kundenkonzentration und Laufzeit der Verträge sind hier ebenso wichtig wie die reine Umsatzkurve.',
    ],
    check: ['Woran lässt sich erkennen, dass ein Umsatzrückgang allein keine Absatzsättigung beweist?', 'Umsatz hängt von Menge und Preis ab. Ein einmaliger Preis- oder Mixeffekt kann den Umsatz trotz steigender Mengen senken.'],
    transfer: ['Die Menge fällt in einem Quartal um 12 %, die Region war jedoch zwei Wochen nicht lieferfähig. Welche Daten helfen bei der Phaseneinordnung?', 'Vergleiche verfügbare Kapazität, Auftragsbestand, unerfüllte Nachfrage und Vergleichsregionen. Prüfe danach, ob Nachfrage und Wiederkaufrate nach Wiederherstellung der Lieferfähigkeit zurückkehren.'],
    terms: [['Produktlebenszyklusanalyse', 'Einordnung der Entwicklung eines Produkts von Entwicklung und Markteintritt bis zur Reife und zum möglichen Rückgang.'], ['Relaunch', 'Erneute Marktbearbeitung eines weiterentwickelten oder neu positionierten Produkts.']],
    related: [['co-bcg-portfolio', 'Portfolioanalyse'], ['rw-target-costing', 'Zielkosten früh in der Entwicklung bestimmen']],
  },
  {
    chapter: 'co-strategie-potenzial', id: 'co-potenzial-swot', title: 'Potenzialanalyse, Stärken-Schwächen-Profil und SWOT',
    intro: 'Die Potenzialanalyse bewertet Fähigkeiten, die ein Unternehmen zur Umsetzung einer Strategie braucht. SWOT verbindet das interne Profil mit Chancen und Risiken der Umwelt.',
    principle: [
      'Definiere erfolgskritische Kriterien wie Qualität, Datenabdeckung, Kosten oder Lieferfähigkeit. Lege Gewichtung, Vergleichsmaßstab und Skala vor der Bewertung fest. Ein Erfüllungsgrad misst den beobachteten Stand gegenüber einem Ziel oder einer definierten Punkteskala. Das gewichtete Profil zeigt, welche Stärken und Schwächen für die Strategie besonders relevant sind.',
      'SWOT unterscheidet interne Stärken und Schwächen von externen Chancen und Risiken. Beispiele sind qualifizierte Disposition als Stärke, Datenlücken als Schwäche, wachsende Nachfrage als Chance und neue Konkurrenz als Risiko. Eine Eigenschaft wird erst relativ zu Strategie und Vergleichsmaßstab zur Stärke.',
      'Leite Maßnahmen aus Kombinationen ab: Stärken zur Nutzung von Chancen (SO), Stärken zur Abwehr von Risiken (ST), Schwächen mit Chancen abbauen (WO), Schwächen und Risiken begrenzen (WT). Priorisiere nach Wirkung, Aufwand und Umsetzbarkeit. Führe für strittige Bewertungen Sensitivitätsrechnungen durch.',
    ],
    example: [
      'Eine Spedition bewertet Pünktlichkeit (Gewicht 50 %), Datenabdeckung (30 %) und Kosteneffizienz (20 %) auf einer Skala von 0 bis 5. Sie erzielt 4, 2 und 3 Punkte. Gewichtet: 0,5 × 4 + 0,3 × 2 + 0,2 × 3 = 3,2 von 5 oder 64 % des Skalenmaximums.',
      'Ein wachsendes Segment verlangt digitale Statusmeldungen. Gute Pünktlichkeit unterstützt den Markteintritt. Die geringe Datenabdeckung begrenzt das Angebot. Eine WO-Maßnahme ist die Anbindung wichtiger Partner mit messbarem Ziel, etwa 95 % vollständige Meilensteine im Pilotgebiet.',
    ],
    interpretation: [
      'Ein Gesamtwert kann kritische Mindestanforderungen verschleiern. Bei zwingenden Nachweisen prüfst du Ausschlussgrenzen separat. Unterschiedliche Skalen und uneinheitlich bewertete Daten machen Profile schwer vergleichbar.',
      'In einem Produktionsbetrieb können externe Energiepreise ein Risiko sein. Der intern gemessene Energieverbrauch je Stück ist eine Fähigkeit oder Schwäche des Prozesses. Trenne beide, damit Maßnahmen an der beeinflussbaren Ursache ansetzen.',
    ],
    check: ['Was unterscheidet eine externe Chance von einer internen Stärke?', 'Die Chance entsteht im Umfeld. Die Stärke ist eine vorteilhafte Fähigkeit oder Ressource des Betriebs relativ zum Ziel und Maßstab.'],
    transfer: ['Ein Wettbewerber bietet lückenlose Statusdaten. Dein Betrieb hat gut geschulte Disponenten, aber wenig Partnerdaten. Formuliere eine machbare ST- oder WT-Maßnahme.', 'ST: Disponenten nutzen die Fachkompetenz, um bei kritischen Sendungen sofort verifizierte Statusauskünfte anzubieten. WT: Partner ohne zuverlässige Statusdaten vorerst von Premiumleistungen ausschließen und die Datenqualität im Pilot verbessern.'],
    terms: [['Potenzialanalyse', 'Bewertung erfolgskritischer Fähigkeiten anhand definierter Kriterien und Maßstäbe.'], ['Erfüllungsgrad', 'Verhältnis zwischen gemessener Leistung und einer festgelegten Zielgröße oder Bezugsbasis.']],
    related: [['co-benchmark', 'Externe Vergleichswerte ermitteln'], ['co-balanced-scorecard', 'Strategische Maßnahmen messbar machen']],
  },
  {
    chapter: 'co-strategie-benchmark', id: 'co-benchmark', title: 'Benchmarking und Leistungslücken',
    intro: 'Benchmarking vergleicht Leistungen und Prozesse systematisch mit geeigneten Referenzen, um Ursachen von Unterschieden und übertragbare Praktiken zu finden.',
    principle: [
      'Internes Benchmarking vergleicht eigene Standorte oder Teams. Wettbewerbsbezogenes Benchmarking nutzt Vergleichswerte direkter Mitbewerber. Funktionales oder branchenübergreifendes Benchmarking vergleicht ähnliche Prozesse auch in anderen Industrien. Wähle Partner nach Prozessähnlichkeit und Datenverfügbarkeit.',
      'Lege Prozessgrenze, Kennzahldefinition, Zeitraum, Qualitätsniveau und Einflussgrößen fest. Ermittle zuerst die relative Lücke und vergleiche dann Abläufe und Rahmenbedingungen. Plane Pilot, Ziel, Verantwortlichkeit und Erfolgsmessung. Bei direkten Wettbewerbern eignen sich öffentliche oder neutral aggregierte Daten.',
      'Beurteile neben Mittelwerten auch Streuung, Saison und Fallmix. Ein besserer Median hilft wenig, wenn seltene Extremfälle hohen Schaden verursachen. Untersuche deshalb bei Durchlaufzeiten etwa auch das 90. Perzentil.',
    ],
    example: [
      'Standort A braucht im Mittel 14 Minuten je Wareneingang, Standort B 10 Minuten. Die Lücke beträgt 4 Minuten bzw. 40 % bezogen auf B. Bei gleicher Auftragsart und gleichem Umfang zeigt sich, dass B Stammdaten vorab prüft und für Standardlieferungen feste Zeitfenster nutzt.',
      'A pilotiert den Ablauf und erreicht 11,5 Minuten bei gleichbleibender Fehlerquote. Damit schließt A (14 − 11,5) ÷ (14 − 10) = 62,5 % der ursprünglichen Zeitlücke. Prüfe zusätzlich Aufwand und Verteilung der Wartezeiten.',
    ],
    interpretation: [
      'Der Vergleichswert zeigt Handlungsbedarf, aber erst die Ursachenanalyse erklärt, welche Praxis übertragbar ist. Ein schneller Standort kann von kleineren Aufträgen, höherer Automatisierung oder großzügiger Fläche profitieren.',
      'Im Beschaffungsprozess kann statt Bearbeitungszeit die Anzahl manueller Schritte je Bestellposition sinnvoll sein. Halte Ergebnisqualität und Datenrisiken neben Zeit und Kosten sichtbar.',
    ],
    check: ['Warum genügt es nicht, die besten Kennzahlen eines anderen Betriebs zu übernehmen?', 'Kennzahlen können unterschiedliche Prozesse und Fallmixe abbilden. Benchmarking soll die Ursachen und übertragbaren Vorgehensweisen identifizieren.'],
    transfer: ['Die Schadenquote beträgt 1,2 % gegenüber 0,8 % beim Vergleichspartner. Wie groß ist die Lücke und was prüfst du zuerst?', '0,4 Prozentpunkte oder 50 % relativ zur Referenz. Prüfe Schadendefinition, Zeitraum und Gütermix, bevor du Maßnahmen oder ein Ziel ableitest.'],
    related: [['co-potenzial-swot', 'Potenzialanalyse'], ['co-kennzahlen', 'Kennzahlen mit konsistenter Datenbasis'], ['marketing-vertriebsbenchmarking', 'Benchmarking im Vertrieb']],
  },
  {
    chapter: 'co-strategie-portfolio', id: 'co-bcg-portfolio', title: 'Vier-Felder-Portfolioanalyse nach BCG',
    intro: 'Die BCG-Matrix vergleicht Geschäftsfelder anhand von Marktwachstum und relativem Marktanteil. Sie hilft bei der Diskussion über knappe Investitionsmittel.',
    principle: [
      'Marktwachstum = (aktuelles Marktvolumen ÷ Vorjahresmarktvolumen − 1) × 100 %. Relativer Marktanteil = eigener Marktanteil ÷ Marktanteil des stärksten Wettbewerbers. Verwende dasselbe Segment, dieselbe Region und denselben Zeitraum. Ein Wert von 1 bedeutet Gleichstand. Die Grenze für hohes Wachstum richtet sich nach Kontext und Referenz.',
      'Die vier Felder sind Stars (hohes Wachstum, hoher relativer Anteil), Question Marks (hohes Wachstum, niedriger Anteil), Cashcows (niedriges Wachstum, hoher Anteil) und Poor Dogs (niedriges Wachstum, niedriger Anteil). Eine Option ist Finanzierung attraktiver Wachstumsfelder aus Überschüssen etablierter Geschäftsfelder.',
      'Typische Optionen sind Investieren und Halten bei Stars, selektiver Ausbau oder Ausstieg bei Question Marks, Ergebnis- und Liquiditätssicherung bei Cashcows sowie Nischenstrategie, Abschöpfen oder Ausstieg bei Poor Dogs. Geschäftsfelder mit geringer Marktposition können durch Nischenmargen oder Verbundeffekte trotzdem wertvoll sein.',
    ],
    example: [
      'Ein Markt wächst von 50 auf 56 Mio. €, also um 12 %. Der eigene Marktanteil liegt bei 18 %, der stärkste Wettbewerber hat 24 %. Der relative Marktanteil beträgt 0,75. Bei vorab definierten Schwellen von 8 % Wachstum und 1,0 relativem Anteil ist das Geschäftsfeld ein Question Mark.',
      'Eine zweite Sparte hat 3 % Wachstum und einen relativen Anteil von 1,4. Sie ist unter denselben Schwellen eine Cashcow. Prüfe, wie viel freier Cashflow tatsächlich verfügbar ist, bevor du Mittel für die erste Sparte bindest.',
    ],
    interpretation: [
      'Marktanteile und Wachstum sind grobe Stellvertreter für Wettbewerbsvorteile und Marktattraktivität. Kapitalbedarf, Margen, Cashflows, Risiken und gegenseitige Abhängigkeiten müssen in die Entscheidung einfließen. Eine andere Marktabgrenzung kann die Einordnung umkehren.',
      'Bei einem regionalen Transportnetz kann die Dichte auf wichtigen Relationen wichtiger sein als der bundesweite Anteil. Definiere den relevanten Markt aus Sicht der Kunden und verfügbaren Alternativen.',
    ],
    diagram: {
      matrix: {
        columns: ['Relativer Anteil niedrig', 'Relativer Anteil hoch'],
        rows: ['Wachstum hoch', 'Wachstum niedrig'],
        cells: [['Question Mark', 'Star'], ['Poor Dog', 'Cashcow']],
        description: 'Das Beispiel mit 12 % Marktwachstum und einem relativen Marktanteil von 0,75 liegt oben links. Die Cashcow mit 3 % und 1,4 liegt unten rechts.',
      },
    },
    check: ['Wie unterscheidet sich der relative vom absoluten Marktanteil?', 'Der absolute Anteil bezieht sich auf den Gesamtmarkt. Der relative Anteil setzt den eigenen Anteil ins Verhältnis zum stärksten Wettbewerber.'],
    transfer: ['Marktvolumen wächst von 80 auf 82 Mio. €. Eigener Anteil 30 %, stärkster Wettbewerber 20 %. Schwellen: 6 % und 1,0. Wie ordnest du das Feld ein?', '2,5 % Wachstum und relativer Anteil 1,5 ergeben Cashcow. Prüfe freie Cashflows und die nötigen Erhaltungsinvestitionen, bevor du Überschüsse abziehst.'],
    related: [['co-produktlebenszyklus', 'Produktlebenszyklusanalyse'], ['co-zielluecke', 'GAP-Analyse'], ['marketing-bcg', 'BCG-Portfolioanalyse in der Marketingplanung']],
  },
  {
    chapter: 'co-strategie-scorecard', id: 'co-balanced-scorecard', title: 'Balanced Scorecard',
    intro: 'Die Balanced Scorecard übersetzt eine Strategie in zusammenhängende Ziele, Kennzahlen, Zielwerte und Maßnahmen.',
    principle: [
      'Die klassischen Perspektiven sind Finanzen, Kunden, interne Prozesse sowie Lernen und Entwicklung. Beginne mit der Strategie und leite pro Perspektive wenige Ziele ab. Zu jedem Ziel gehören Kennzahl, Bezug, Zielwert, Termin, Maßnahme und Verantwortung.',
      'Ergebniskennzahlen erfassen bereits eingetretene Folgen, Leistungs- oder Frühindikatoren erfassen vermutete Treiber der Zielerreichung. Eine Strategiekarte stellt Ursache-Wirkungs-Hypothesen dar. Prüfe in der Anwendung, ob frühere Treiberänderungen tatsächlich zu erwarteten Ergebnissen beitragen.',
      'Nutze eine Scorecard für Gespräche über Prioritäten und Zielkonflikte. Mehrere Kennzahlen schützen vor einseitiger Optimierung. Ergänze beispielsweise eine Qualitätsgrenze, wenn ein Ziel schnellere Bearbeitung oder niedrigere Kosten verlangt.',
    ],
    example: [
      'Für ein Premium-Transportangebot setzt die Leitung bis Juni vier Ziele: 95 % der Partner in der Statusmeldung schulen (Lernen), 97 % vollständige Meilensteine erreichen (Prozesse), 98 % Pünktlichkeit erzielen (Kunden) und 12 % Deckungsbeitragsquote erreichen (Finanzen).',
      'Die Disposition pilotiert automatische Warnungen bei fehlender Ladebestätigung. Nach zwei Monaten prüft das Team, ob die Meldungen früher eintreffen, ob die Warnungen tatsächlich zu rechtzeitigen Ersatzlösungen führen und welchen Kostenbeitrag diese Änderungen haben.',
    ],
    interpretation: [
      'Eine Ansammlung von Kennzahlen ohne erkennbare Strategie erfüllt den Zweck nicht. Schulungsquote misst Teilnahme. Sie belegt allein keine wirksame Verhaltensänderung. Wenn Datenabdeckung steigt, aber Pünktlichkeit sinkt, prüfe Ursachen wie Partnerwechsel, Saisoneffekte oder eine strengere Messung.',
      'Im Einzelhandel kann eine bessere Mitarbeiterschulung Retouren senken. Dieselbe Logik lässt sich mit Bearbeitungskompetenz, Fehlerquote und Marge abbilden. Die Perspektiven und Kennzahlen müssen zur Strategie passen.',
    ],
    check: ['Was gehört zu einem messbaren strategischen Ziel in einer Balanced Scorecard?', 'Eine klar definierte Kennzahl, ein Zielwert mit Termin sowie eine Maßnahme und Verantwortung.'],
    transfer: ['Die Durchlaufzeit sinkt, aber Reklamationen steigen. Wie würdest du die Scorecard ergänzen?', 'Setze neben der Durchlaufzeit eine Qualitätskennzahl wie First-Pass-Quote oder Reklamationen je 1.000 Fälle mit Mindest- bzw. Höchstwert. Prüfe Prozessdaten und korrigiere Maßnahmen, wenn die schnellere Bearbeitung Fehler erzeugt.'],
    terms: [['Frühindikator', 'Kennzahl eines vermuteten Treibers, dessen Entwicklung ein späteres Ergebnis ankündigen kann.']],
    related: [['co-kennzahlen', 'Kennzahlen definieren'], ['co-reporting', 'Strategie und operative Maßnahmen berichten'], ['marketing-vertriebs-scorecard', 'Balanced Scorecard im Vertrieb']],
  },
  {
    chapter: 'co-budget-forecast', id: 'co-planung-budget', title: 'Planung, Budgetierung und Forecast',
    intro: 'Planung macht Annahmen über das künftige Geschäft sichtbar. Budgets legen Ressourcenrahmen fest. Forecasts zeigen die aktuell erwartete Entwicklung.',
    principle: [
      'Ein Absatzplan speist Umsatz-, Leistungs- und Kapazitätsplanung. Daraus folgen Beschaffung, Personal, Investitionen sowie Ergebnis- und Liquiditätsplanung. Top-down gibt Zielgrößen vor, Bottom-up liefert Detailwissen. Das Gegenstromverfahren stimmt beides wiederholt ab.',
      'Budgets setzen verbindliche Ziele und Freigabegrenzen für eine Periode. Ein Forecast schätzt anhand aktueller Istwerte und Annahmen den erwarteten Ausgang. Ein rollierender Forecast verschiebt den Horizont jeweils um eine neue Periode. Dokumentiere Budget, Forecast und Ist als getrennte Versionen.',
      'Treiberbasierte Planung verknüpft Mengen, Preise und Kapazitäten. Sensitivitätsanalysen verändern einen Treiber, Szenarien kombinieren stimmige Änderungen. Flexible Budgets passen variable Vorgaben an die Istbeschäftigung an und erleichtern die Wirtschaftlichkeitskontrolle.',
    ],
    example: [
      'Eine Spedition plant 1.000 Sendungen zu 120 € Nettoerlös und 85 € variablen Kosten je Sendung, bei 25.000 € Fixkosten. Budgetergebnis: 1.000 × 35 € − 25.000 € = 10.000 €. Der aktualisierte Forecast erwartet 900 Sendungen und 89 € variable Kosten bei unverändertem Erlöspreis.',
      'Forecast: 900 × 31 € − 25.000 € = 2.900 €. Ergebnisrückgang −7.100 €. Davon stammen −3.500 € aus der Menge (−100 × 35 €) und −3.600 € aus dem Kostensatz (−4 € × 900). Ein Liquiditätsforecast berücksichtigt zusätzlich die Zahlungszeitpunkte.',
    ],
    interpretation: [
      'Ein realistischer Forecast darf unter dem Budget liegen. Die Lücke zeigt den Bedarf für eine Entscheidung, etwa über Kapazität, Einkaufspreise oder realistische Vertriebskanäle. Änderungen am Budget benötigen eine ausdrücklich dokumentierte Freigabe.',
      'Wenn Erreichbarkeit und Boni an Budgets hängen, können pessimistische Annahmen und unnötige Jahresendausgaben entstehen. Transparente Treiberannahmen und getrennte Forecasts begrenzen diese Anreize.',
    ],
    check: ['Welche Frage beantwortet ein Forecast im Unterschied zum Budget?', 'Der Forecast schätzt, wo der Betrieb unter aktuellen Annahmen voraussichtlich landet. Das Budget hält den vereinbarten Ressourcenrahmen und die Sollgrößen fest.'],
    transfer: ['Plan: 500 Aufträge mit 40 € Deckungsbeitrag, Fixkosten 12.000 €. Forecast: 450 mit 36 €. Welche Ergebnislücke entsteht?', 'Budgetergebnis 8.000 €, Forecast 4.200 €. Lücke 3.800 €, davon 2.000 € Mengenwirkung und 1.800 € niedrigere Beiträge je Ist- bzw. Forecast-Auftrag.'],
    terms: [['Gegenstromverfahren', 'Wiederholte Abstimmung zwischen zentralen Planvorgaben und dezentralen Planentwürfen.']],
    related: [['co-planung-abweichung', 'Operativer Soll-Ist-Vergleich'], ['rw-sollkosten', 'Flexibles Budget der Kostenstelle'], ['rw-planungsinhalt', 'Teilpläne mit Plan-GuV, Finanzplan und Planbilanz verbinden']],
  },
  {
    chapter: 'co-ursachenanalyse', id: 'co-planung-abweichung', title: 'Operativer Soll-Ist-Vergleich und Maßnahmen',
    intro: 'Der operative Soll-Ist-Vergleich zeigt Abweichungen von vereinbarten Größen. Ziel ist, relevante Ursachen zu erkennen und wirksame Maßnahmen abzuleiten.',
    principle: [
      'Stelle zuerst Zeitraum, Datenstand, Kostenumfang und Leistungsbasis gleich. Wähle je nach Frage Budget, flexibles Soll, Vorjahr oder Forecast als Referenz. Markiere absolute und relative Abweichungen und die wirtschaftliche Richtung. Bei Sollwert null ist eine relative Abweichung nicht definiert.',
      'Zerlege die Abweichung nach geeigneten Treibern, etwa Absatz, Preis, Mix, Auslastung, Verbrauch oder Einmaleffekt. Frage nach Datenfehlern, echter Prozessänderung und Beeinflussbarkeit. Wesentlichkeit kann aus absolutem Betrag, relativer Größe, Trend oder Risiko folgen.',
      'Maßnahmen erhalten Verantwortliche, Frist, erwartete Wirkung und einen Messpunkt zur Nachprüfung. Entscheide über Sofortmaßnahmen, strukturelle Änderungen und Prognoseanpassungen getrennt. Eine Kostenabweichung kann sich aus einer bewussten Serviceentscheidung ergeben.',
    ],
    example: [
      'Ein Betrieb plant 400 Touren zu 150 € variablen Kosten und 18.000 € Fixkosten. Das Budget beträgt 78.000 €. Tatsächlich fährt er 360 Touren und erfasst 75.600 € Gesamtkosten. Der starre Vergleich sieht mit −2.400 € günstig aus.',
      'Für 360 Touren beträgt das flexible Soll 72.000 €. Dagegen liegen die Istkosten um 3.600 € höher. Externe Ersatzfahrten verursachen davon 2.400 €, zusätzlicher Warteaufwand 1.200 €. Maßnahme: Partnerreserve testen, Warteanlässe je Ladeort messen und die Soll-Ist-Rechnung nach vier Wochen wiederholen.',
    ],
    interpretation: [
      'Stelle die Kostenwirkung zusammen mit Lieferqualität und realisierbaren Alternativen dar. Eine Einsparung durch Verzicht auf Ersatzfahrten kann Vertrags- oder Folgekosten auslösen. Bei einer kleinen Abweichung in sicherheits- oder terminkritischen Prozessen kann sofortiges Handeln erforderlich sein.',
      'Bei der Absatzanalyse können Umsätze durch einen höherpreisigen Mix steigen, obwohl jede Produktgruppe weniger verkauft. Eine Aggregatzahl ersetzt die Ursachenanalyse auf sinnvoller Ebene nicht.',
    ],
    check: ['Warum soll die Bezugsgröße vor der Bewertung feststehen?', 'Eine abweichende Menge kann die Gesamtkosten verändern, ohne dass sich die Kosten je erbrachter Leistung verschlechtert haben.'],
    transfer: ['Plan: 1.000 Pakete zu 4 € variablen Kosten und 1.000 € fix. Ist: 1.200 Pakete und 5.650 €. Wie bewertest du das Ergebnis?', 'Starr liegen Kosten 650 € über 5.000 €. Flexibles Soll ist 5.800 €. Gegen die erbrachte Leistung liegen Istkosten 150 € günstiger. Prüfe Preis, Verbrauch, Mix und Qualität, bevor du den Effekt als Effizienzgewinn bewertest.'],
    terms: [['Abweichungsanalyse', 'Zerlegung einer Differenz in wirtschaftlich erklärbare Einflussgrößen.']],
    related: [['rw-abweichungszerlegung', 'Preis- und Mengenabweichungen berechnen'], ['co-reporting', 'Maßnahmen dokumentieren und verfolgen']],
  },
  {
    chapter: 'co-kennzahlen-grundlagen', id: 'co-kennzahlen', title: 'Kennzahlen bilden und beurteilen',
    intro: 'Kennzahlen verdichten Daten für Entscheidungen. Ihr Aussagewert hängt von Bezugsgröße, Datenqualität und Zielsetzung ab.',
    principle: [
      'Absolute Kennzahlen sind Einzelwerte, Summen, Differenzen oder Mittelwerte. Eine Gliederungszahl setzt einen Teil zur zugehörigen Gesamtheit ins Verhältnis, zum Beispiel Eigenkapital ÷ Gesamtkapital. Eine Beziehungszahl verknüpft sachlich abhängige, verschiedene Größen, etwa Umsatz ÷ Beschäftigte. Eine Indexzahl setzt dieselbe Größe in verschiedenen Perioden oder gegenüber einer Basis ins Verhältnis.',
      'Eigenkapitalquote = Eigenkapital ÷ Gesamtkapital × 100 %. Sie beschreibt die Kapitalstruktur zu einem Stichtag. Sie zeigt keine unmittelbare Zahlungsfähigkeit. Für Liquidität brauchst du Fälligkeiten und verfügbare Zahlungsmittel. Vergleiche die Eigenkapitalquote mit Struktur, Branche und Risiko.',
      'Dokumentiere Formel, Zahlenquelle, Einheit, Zeitraum, Aktualisierung, Zielrichtung und Verantwortlichkeit. Unterscheide Prozent und Prozentpunkte sowie Bestands- und Stromgrößen. Verwende für eine Periodenkennzahl mit einem Kapitalbestand bei starken Schwankungen einen passenden Durchschnitt.',
    ],
    example: [
      'Ein Betrieb hat 300.000 € Eigenkapital und 1,2 Mio. € Gesamtkapital. Die Gliederungszahl Eigenkapitalquote beträgt 25 %. Der Vorjahreswert war 20 %. Der Anstieg beträgt fünf Prozentpunkte oder 25 % relativ zum Vorjahr.',
      'Bei 2,4 Mio. € Jahresumsatz und 20 Vollzeitäquivalenten ergibt die Beziehungszahl 120.000 € je Vollzeitäquivalent. Aktueller Umsatz 2,4 Mio. € bei einer Umsatzbasis von 2 Mio. € ergibt den Umsatzindex 120 bei Basis 100.',
    ],
    interpretation: [
      'Eine höhere Umsatzproduktivität kann aus Fremdvergabe entstehen, weil Leistungen im Umsatz bleiben, Personal aber aus der Bezugsgröße entfällt. Stelle dazu Ergebnis, Fremdleistung und Servicequalität dar. Ein Zahlenvergleich braucht eine konsistente Abgrenzung.',
      'Aggregiere Quoten aus den addierten Zählern und Nennern. 90 von 100 und 9 von 10 ergeben beide 90 %. Bei 95 von 100 und 5 von 10 beträgt die Gesamtquote dagegen 100 ÷ 110 ≈ 90,9 %, nicht der einfache Mittelwert 72,5 %.',
    ],
    check: ['Welche Art von Verhältniszahl ist die Eigenkapitalquote?', 'Eine Gliederungszahl, weil das Eigenkapital Teil des Gesamtkapitals ist.'],
    transfer: ['Eine Quote steigt von 8 % auf 10 %. Zugleich sinkt die Basis von 500 auf 300 Fälle. Was ist passiert?', 'Anstieg um zwei Prozentpunkte bzw. relativ um 25 %. Die Fallzahl im Zähler sinkt dennoch von 40 auf 30. Die Kennzahlen beantworten unterschiedliche Fragen.'],
    terms: [['Gliederungszahl', 'Verhältnis eines Teils zur zugehörigen Gesamtgröße.'], ['Beziehungszahl', 'Verhältnis zweier verschiedener, fachlich zusammenhängender Größen.'], ['Indexzahl', 'Verhältnis einer Größe zu einem definierten Wert derselben Größe, häufig mit Basis 100.'], ['Eigenkapitalquote', 'Eigenkapital in Prozent des Gesamtkapitals.']],
    related: [['co-dupont', 'ROI und DuPont-System'], ['co-reporting', 'Kennzahlen im Berichtsprozess']],
  },
  {
    chapter: 'co-rentabilitaet', id: 'co-dupont', title: 'Return on Investment und DuPont-System',
    intro: 'Das DuPont-System zerlegt die Kapitalrendite in Umsatzrendite und Kapitalumschlag. So lassen sich die wirtschaftlichen Treiber einer Veränderung erkennen.',
    principle: [
      'In der operativen Variante gilt ROI = Betriebsergebnis ÷ durchschnittlich gebundenes betriebsnotwendiges Kapital. Umsatzrendite = Betriebsergebnis ÷ Nettoumsatz. Kapitalumschlag = Nettoumsatz ÷ durchschnittliches Kapital. Das Produkt aus beiden ergibt den ROI, wenn Ergebnis, Umsatz und Kapital denselben Bereich und Zeitraum betreffen.',
      'Der Kennzahlenbaum zerlegt die Rendite weiter in Erlöse, Kosten und die Bestandteile des Kapitals. Geringere Retouren können die Umsatzrendite verbessern, schnellerer Forderungseinzug den Kapitalumschlag. Definitionen von ROI und Gewinn unterscheiden sich je nach Anwendung. Lege Ergebnisgröße, Kapitalumfang und Mittelung offen.',
      'Bei Investitionsentscheidungen sind projektbezogen Kapitalwert, Risiko, Grenzertrag und Kapitalkosten relevant. Ein Bereichsleiter, der allein am prozentualen ROI gemessen wird, kann ein rentables Projekt ablehnen, wenn es seine bisherige hohe Quote rechnerisch senkt.',
    ],
    example: [
      'Ein Bereich erzielt 4 Mio. € Umsatz mit 320.000 € Betriebsergebnis und 2 Mio. € durchschnittlichem Kapital. Umsatzrendite = 8 %, Kapitalumschlag = 2 je Jahr, ROI = 16 %. Sinkt das gebundene Kapital bei gleichem Umsatz und Ergebnis auf 1,6 Mio. €, steigt der Umschlag auf 2,5 und der ROI auf 20 %.',
      'Eine Preissenkung senkt die Rendite auf 7 %, erhöht aber den Umschlag auf 2,6. Der ROI wäre 18,2 %. Vergleiche die Variante außerdem nach absolutem Ergebnis, zusätzlichen Risiken und verfügbarer Kapazität.',
    ],
    interpretation: [
      'Leasing, hoher Anlagenverschleiß oder unterschiedliche Bestandsbewertung können ROI-Vergleiche verzerren. Passe Ergebnis und Kapital konsistent an die Fragestellung an. Bei nicht positivem Eigen- oder relevantem Kapital kann eine Renditekennzahl wirtschaftlich schwer interpretierbar sein.',
      'Im Logistikbetrieb kann ein geringerer Forderungsbestand den Kapitalumschlag verbessern. Bei sehr kapitalarmen Leistungen können dennoch Deckungsbeitrag je Auftrag, Cashflow und Ausfallrisiko mehr zur laufenden Steuerung beitragen.',
    ],
    check: ['Welche zwei Kennzahlen ergeben im DuPont-System multipliziert den ROI?', 'Umsatzrendite und Kapitalumschlag, mit konsistenten Bezugsgrößen.'],
    transfer: ['A erreicht 5 % Marge und Umschlag 3. B erreicht 10 % und 1,4. Wer hat den höheren ROI und was bleibt offen?', 'A erreicht 15 %, B 14 %. Offen bleiben unter anderem absolutes Ergebnis, Risiko und benötigtes Kapital.'],
    terms: [['Return on Investment', 'In der operativen DuPont-Variante Verhältnis aus Betriebsergebnis und durchschnittlich gebundenem betriebsnotwendigem Kapital.', ['ROI']], ['DuPont-System', 'Kennzahlensystem zur Zerlegung des ROI in Umsatzrendite und Kapitalumschlag.']],
    related: [['co-kennzahlen', 'Verhältniszahlen und Eigenkapitalquote'], ['co-balanced-scorecard', 'Finanzielle und nichtfinanzielle Kennzahlen verbinden'], ['rw-gesamtkapitalrentabilitaet', 'Gesamtkapitalrentabilität im Rechnungswesen']],
  },
  {
    chapter: 'co-berichtsprozess', id: 'co-reporting', title: 'Berichtswesen, Reporting und Informationsmanagement',
    intro: 'Berichtswesen bringt entscheidungsrelevante Informationen zum passenden Zeitpunkt und mit einer nachvollziehbaren Grundlage zu den zuständigen Personen.',
    principle: [
      'Informationsmanagement klärt Bedarf, Datenherkunft, Aufbereitung, Berechtigungen, Qualität und Verteilung. Ein Bericht beantwortet eine Entscheidungssituation. Regelberichte dokumentieren den Rhythmus, Ausnahmeberichte melden Schwellenüberschreitungen und Ad-hoc-Berichte klären Einzelprobleme.',
      'Ein Controllingbericht enthält Zeitraum, Datenstand, Ist, Vergleich, Abweichung und Verlauf. Ergänze wesentliche Ursachen, Prognosewirkung, Handlungsvorschlag, Verantwortliche und Termin. Übersichtsseite und Detailansicht sollten dieselben Kennzahlendefinitionen verwenden.',
      'Unterscheide vollständig erfasste Fälle, fehlende Ereignisse und verspätete Nachmeldungen. Prüfe Plausibilität, Dubletten, Abstimmung mit der Buchhaltung und Rechte. Ein vorläufiger Bericht sollte Datenlücken und dadurch betroffene Kennzahlen kenntlich machen.',
    ],
    example: [
      'Ein Monatsbericht weist 92 % Pünktlichkeit gegenüber 97 % Ziel aus. In 20 von 500 Fällen fehlt ein Zustellzeitpunkt. Unter den 480 auswertbaren Fällen waren 442 pünktlich, also 92,1 %. Über alle 500 Fälle liegt die mögliche Pünktlichkeitsquote zwischen 88,4 % und 92,4 %.',
      'Die Leitung erhält den Auswertungsstand und die separat ausgewiesene Datenlücke. Die Disposition prüft fehlende Zustellmeldungen binnen zwei Arbeitstagen, und das Controlling verfolgt den Anteil verspäteter Meldungen im Wochenbericht.',
    ],
    interpretation: [
      'Ein farbiger Status macht Handlungsbedarf schnell sichtbar. Die Schwelle muss aber zum Entscheidungsspielraum passen und erklärt weder Ursache noch Folge. Schreibe bei Abweichungen, welche Entscheidung ansteht und welche Angaben noch vorläufig sind.',
      'Ein Werk kann denselben Aufbau für Stillstände verwenden. Ein Wochenbericht dient der Maßnahmenkontrolle, eine Störung mit hohem Ausfallrisiko braucht einen Ausnahmebericht in kürzerer Frist.',
    ],
    check: ['Welche Informationen machen eine Kennzahlenabweichung handlungsfähig?', 'Definition und Datenstand, Vergleichswert, sachliche Ursache oder offene Prüffrage sowie eine Maßnahme mit Verantwortung und Termin.'],
    transfer: ['Ein Team meldet 98 % Termintreue, doch bei 30 % der Aufträge fehlt der Zeitstempel. Wie berichtest du?', 'Bewerte 98 % ausdrücklich als Quote der erfassten Fälle. Zeige die Datenabdeckung mit 70 % und die mögliche Gesamtquote von 68,6 % bis 98,6 %. Weise jemanden zu, der die fehlenden Meldungen klärt.'],
    terms: [['Reporting', 'Strukturierte Bereitstellung von Entscheidungsinformationen mit definierten Empfängern, Zeitpunkten und Grundlagen.', ['Berichtswesen', 'Controllingbericht']], ['Ausnahmebericht', 'Anlassbezogener Bericht bei einer definierten Abweichung oder einem besonderen Ereignis.']],
    related: [['co-kennzahlen', 'Kennzahlenqualität'], ['co-planung-abweichung', 'Operative Ursachenanalyse']],
  },
  {
    chapter: 'co-controlling-faelle', id: 'co-praxisfaelle', title: 'Berufstypische Fälle zum Controlling',
    intro: 'Zwei Fälle verbinden Instrumentenwahl, Rechnung und Handlungsempfehlung. Begründe jeweils, welche Daten du zur Nachkontrolle brauchst.',
    principle: [
      'Strategische Fälle prüfen, welches Geschäft in Zukunft zum Ziel beitragen kann. Operative Fälle prüfen, warum eine laufende Leistung vom Soll abweicht. In beiden Fällen gehören Vergleichsbasis, Unsicherheit und Entscheidung in die Antwort.',
      'Wähle das Instrument nach der Fragestellung. Eine GAP-Analyse quantifiziert eine Ziellücke. Ein flexibler Soll-Ist-Vergleich trennt die Wirkung einer abweichenden Leistungsmenge. Eine Scorecard verbindet die Maßnahmen anschließend mit Früh- und Ergebnisindikatoren.',
    ],
    example: [
      'Fall A: Ein Betrieb strebt in drei Jahren 900.000 € Betriebsergebnis an. Die Basisprognose beträgt 540.000 €. Prozessverbesserungen versprechen weitere 210.000 €. Eine neue Dienstleistung liefert erwartete 180.000 €, verdrängt aber 50.000 € Ergebnis aus Bestandsleistungen. Ermittle die Lücken und bewerte die vorgeschlagene Strategie.',
      'Lösung A: Gesamtlücke 360.000 €, operativer Hebel 210.000 €, strategische Lücke 150.000 €. Das neue Angebot trägt netto 130.000 € bei. Die verbleibende Lücke beträgt 20.000 €. Prüfe Anlaufleistung, Verdrängung und Ergebnis im pessimistischeren Szenario.',
      'Fall B: Plan 800 Vorgänge, 20 €/Vorgang variable Kosten und 9.000 € fix. Ist 700 Vorgänge und 24.000 € Kosten. Berechne und bewerte die Abweichung gegen starres und flexibles Soll.',
      'Lösung B: Budget 25.000 €, Ist minus Budget −1.000 €. Flexibles Soll 23.000 €, Ist minus Soll +1.000 €. Berichte die geringere Menge und den Mehrkostenbefund getrennt. Prüfe Prozesszeiten, Fallmix und Einkaufspreise.',
    ],
    interpretation: [
      'Für Fall A braucht die Leitung eine Entscheidung über Pilot und Kapazität. Für Fall B braucht die Prozessleitung eine Ursachenanalyse und priorisierte Korrektur. Ein zukünftiger Bericht soll zeigen, ob die Maßnahmen wirken und ob sich der Forecast ändert.',
    ],
    check: ['Welches Instrument passt bei einer langfristigen Lücke zwischen Ziel und Prognose?', 'Die GAP-Analyse quantifiziert die Lücke und kann vorhandene Verbesserungsmöglichkeiten von strategisch verbleibendem Handlungsbedarf unterscheiden.'],
    transfer: ['Fall A verliert wegen höherer Anlaufkosten weitere 40.000 € erwartetes Ergebnis. Was ändert sich?', 'Der Nettoeffekt des neuen Angebots sinkt von 130.000 € auf 90.000 €. Die verbleibende Ziellücke steigt von 20.000 € auf 60.000 €.'],
    related: [['co-zielluecke', 'GAP-Analyse'], ['co-planung-abweichung', 'Operativer Soll-Ist-Vergleich']],
  },
];

export const { articles: controllingArticles, glossary: controllingGlossary } = buildLearningArticles(controllingChapters, entries);
