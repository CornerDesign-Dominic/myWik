import type { Article, ArticleSection, Chapter, GlossaryTerm, RichText } from '../types';

const subjectId = 'marketing';
const updatedAt = Date.UTC(2026, 10, 18);

interface Lesson {
  id: string;
  parent?: string;
  number: string;
  title: string;
  intro: string;
  sections: ArticleSection[];
}

function section(id: string, title: string, ...paragraphs: (string | RichText[])[]): ArticleSection {
  return { id, title, paragraphs: paragraphs.map(paragraph => typeof paragraph === 'string' ? [{ text: paragraph }] : paragraph) };
}

const term = (text: string, termId: string): RichText => ({ text, termId });
const link = (text: string, articleId: string): RichText => ({ text, articleId });
const plain = (text: string): RichText => ({ text });

function question(prompt: string, solution: string): ArticleSection {
  return {
    ...section('transfer', 'Transferfrage', prompt),
    hint: { label: 'SELBSTKONTROLLE', title: 'Musterantwort', content: solution },
  };
}

const lessons: Lesson[] = [
  {
    id: 'marketing-international',
    number: '4',
    title: 'Internationale Geschäftsbeziehungen',
    intro: 'Ein Unternehmen kann außerhalb seines Heimatmarktes neue Kunden, Lieferquellen und Partner gewinnen. Ob sich das lohnt, hängt davon ab, wie gut das Angebot zum Zielmarkt passt und wie sich Kosten, Kontrolle und Risiken mit der gewählten Form des Markteintritts verteilen.',
    sections: [
      section('entscheidungen', 'Vom Zielmarkt zur ersten Entscheidung',
        'Beginne mit einem konkreten Ziel, etwa einem tragfähigen Absatzkanal für ein Ersatzteilsortiment. Prüfe Nachfrage, Wettbewerb, Zahlungsgewohnheiten, Zugangsbedingungen und die Anforderungen an Lieferung und Service. Gleiche diese Faktoren mit Kapital, Fachwissen und freien Kapazitäten des eigenen Betriebs ab.',
        [plain('Beim '), term('Markteintritt', 'marketing-markteintritt-begriff'), plain(' entscheidest du anschließend, welche Aufgaben das Unternehmen selbst übernimmt und welche ein Partner übernimmt. Eine lokale Kooperation kann beispielsweise den Service erleichtern. Die Wahl des Partners und die Anpassung des Angebots sind zwei getrennte Entscheidungen.')]),
      section('arbeitsfelder', 'Was vor der ersten Bestellung geklärt sein muss',
        'Vertrieb und Einkauf prüfen Geschäftspartner und Akquisitionswege. Das Rechnungswesen kalkuliert auch Währungsrisiken, Zahlungsziele und Finanzierungskosten. Logistik und Vertragsverantwortliche klären Lieferklausel, Dokumente, Transport, Zoll, Haftung und Reklamationen. Der Kundendienst plant Ersatzteile, Sprache und Reaktionszeiten.',
        'Ein Hersteller von Dosieranlagen kann mit einem Vertriebspartner zunächst drei Pilotaufträge abwickeln. Er misst Lieferzeit, Zahlungseingang und Serviceaufwand. Ein Schulungsanbieter kann eine übersetzte Pilotveranstaltung anbieten und prüfen, ob spätere Nachfrage eine dauerhafte lokale Organisation trägt.'),
      section('vertiefung', 'Vertiefende Artikel',
        [link('Handelspolitik und Außenhandel', 'marketing-aussenhandel'), plain(' · '), link('Kooperationen und Markteintrittsformen', 'marketing-aussenkooperation'), plain(' · '), link('Interkulturelle Kommunikation', 'marketing-interkultur')]),
      question('Der Vertrieb schlägt eine Auslandstochter vor, weil der neue Markt groß ist. Welche drei weiteren Informationen brauchst du vor der Entscheidung?',
        'Prüfe erreichbare Kundengruppen und belastbare Absatzchancen, den Bedarf an eigener Kontrolle und lokalem Service sowie Investitionsbedarf und Risiken. Vergleiche die Tochter mit einem Pilotexport oder einer Kooperation unter denselben Zielbedingungen.'),
    ],
  },
  {
    id: 'marketing-aussenhandel',
    parent: 'marketing-international',
    number: '4.1',
    title: 'Handelspolitik und Außenhandel',
    intro: 'Außenhandel im engeren Sinn umfasst den grenzüberschreitenden Bezug und Absatz wirtschaftlicher Leistungen und den Transithandel. Für die Wahl eines Marktes zählt der Rahmen, den Staaten und internationale Organisationen für diese Geschäfte schaffen.',
    sections: [
      section('leitbilder', 'Freihandel und Protektionismus',
        [term('Freihandel', 'marketing-freihandel-begriff'), plain(' zielt darauf, den grenzüberschreitenden Handel durch den Abbau von Hürden zu erleichtern. '), term('Protektionismus', 'marketing-protektionismus-begriff'), plain(' setzt Eingriffe zum Schutz heimischer Anbieter ein. In der Praxis verbinden Staaten Marktöffnung mit Regeln für bestimmte Waren oder Zwecke.')],
        [plain('Ein Wertzoll verteuert die Einfuhr proportional zum Zollwert. Ein '), term('Kontingent', 'marketing-kontingent-begriff'), plain(' begrenzt eine Menge oder gewährt für eine bestimmte Menge günstigere Zollbedingungen. Ein Verbot schließt Geschäfte im erfassten Bereich aus. Eine Subvention kann heimische Anbieter begünstigen. '), term('Dumping', 'marketing-dumping-begriff'), plain(' beschreibt im Antidumpingrecht Ausfuhren unter ihrem maßgeblichen Normalwert und ist von Subventionen zu unterscheiden.')],
        'Unterscheide nationale Maßnahmen von bilateralen Verträgen zwischen zwei Parteien und multilateralen Abkommen mehrerer Beteiligter, etwa WTO-Abkommen. Die EU kann als Zollunion gemeinsame Tarifregeln und Handelsabkommen gestalten. Prüfe deshalb die zuständige Ebene, statt aus einem nationalen Regelungswunsch bereits eine wirksame Maßnahme abzuleiten.'),
      section('institutionen', 'Welche internationale Institution wofür zuständig ist',
        'Der Internationale Währungsfonds (IWF) hilft Mitgliedern unter anderem bei Zahlungsbilanzproblemen. Die Weltbank unterstützt Entwicklungs- und Investitionsvorhaben. Die Welthandelsorganisation (WTO), die seit 1995 besteht, verwaltet Handelsabkommen, bietet einen Verhandlungsrahmen, überprüft die Handelspolitik und stellt Verfahren für Streitigkeiten zwischen WTO-Mitgliedern bereit.',
        [plain('Das '), term('GATT', 'marketing-gatt-begriff'), plain(' betrifft den Warenhandel und unter anderem Regeln zu Zöllen. Das '), term('GATS', 'marketing-gats-begriff'), plain(' betrifft den Dienstleistungshandel. '), term('TRIPS', 'marketing-trips-begriff'), plain(' enthält Mindeststandards für handelsbezogene Rechte des geistigen Eigentums. '), term('TRIMs', 'marketing-trims-begriff'), plain(' betrifft handelsbezogene Investitionsmaßnahmen im Warenhandel, beispielsweise mit GATT-Regeln unvereinbare Vorgaben zur Verwendung heimischer Vorleistungen.')]),
      section('eu', 'Zollunion, Binnenmarkt und Währungsunion auseinanderhalten',
        [plain('Die '), term('Zollunion', 'logistik-zollunion'), plain(' verbindet den Wegfall von Binnenzöllen mit einem gemeinsamen Außenzoll. Im Binnenmarkt stehen vier Freiheiten im Mittelpunkt: Waren, Personen, Dienstleistungen und Kapital. Die Währungsunion mit dem Euro betrifft die teilnehmenden Staaten. Gemeinsame Zollregeln und eine gemeinsame Währung sind unterschiedliche Integrationsschritte.')],
        'Der Vertrag von Maastricht trat 1993 in Kraft. Der Vertrag von Lissabon trat 2009 in Kraft und beendete die frühere Säulenstruktur. Für eine konkrete Transaktion ist zu prüfen, in welchem Waren- und Rechtsraum sie tatsächlich stattfindet.',
        '§ 1 AWG geht vom grundsätzlich freien Außenwirtschaftsverkehr aus. Einschränkungen können sich aus Gesetz, Rechtsverordnung und weiteren anwendbaren Regeln ergeben. Bei einem Geschäft sind deshalb unter anderem Warenart, Partner, Zielland und Endverwendung zu prüfen.',
        [link('EU-Zollunion und Warenstatus', 'logistik-zollunion'), plain(' · '), link('Ausfuhrbeschränkungen und Exportkontrolle', 'logistik-ausfuhrbeschraenkungen')]),
      section('anwendung', 'Einfuhrkosten einordnen',
        'Übungsannahme: Der Zollwert eines Werkzeugsatzes beträgt 20.000 €. Ein hypothetischer Wertzoll steigt von 3 % auf 8 %. Der Zoll steigt von 20.000 € × 0,03 = 600 € auf 20.000 € × 0,08 = 1.600 €, also um 1.000 €. Die Kalkulation enthält hier nur den Zoll. Für die Bezugsentscheidung gehören beispielsweise Transport, Abfertigung, Währungsrisiko und die steuerliche Behandlung hinzu. Ein Beratungsunternehmen würde dagegen zuerst die für seine Dienstleistung relevanten Zugangsvoraussetzungen prüfen.'),
      question('Ein Freihandelsabkommen sieht für ein Produkt eine Zollpräferenz vor. Warum kannst du noch keinen Zollvorteil in den verbindlichen Angebotspreis einrechnen?',
        'Prüfe den Zolltarif, die anwendbaren Präferenzregeln und insbesondere den Ursprung der konkreten Ware sowie den erforderlichen Nachweis. Berücksichtige außerdem, wer nach Vertrag und Zollrecht die Einfuhr organisiert und welche sonstigen Kosten und Anforderungen bestehen.'),
    ],
  },
  {
    id: 'marketing-export-import',
    parent: 'marketing-aussenhandel',
    number: '4.1.1',
    title: 'Export, Import und Handelsmittler',
    intro: 'Beim Export verkauft ein Betrieb Waren oder Dienstleistungen ins Ausland. Beim Import bezieht er sie aus dem Ausland. Für die kaufmännische Einordnung des Weges ist besonders wichtig, wer das Geschäft mit dem ausländischen Partner schließt und ob ein inländisches Außenhandelsunternehmen zwischengeschaltet ist.',
    sections: [
      section('wege', 'Direkt und indirekt einordnen',
        [term('Direkter Export', 'logistik-direkter-export'), plain(' heißt: Der Betrieb verkauft selbst an den ausländischen Abnehmer. Er kann eigene Mitarbeitende, eine Niederlassung oder eine ausländische Vertretung einsetzen. Beim indirekten Export übernimmt ein selbstständiges inländisches Exporthandelsunternehmen die Auslandsabwicklung und kauft die Ware zur Weiterveräußerung ein.')],
        [plain('Analog schließt beim direkten Import der inländische Betrieb seinen Kaufvertrag mit dem ausländischen Lieferanten. Beim '), term('indirekten Import', 'marketing-indirekter-import-begriff'), plain(' kauft er die Importware von einem inländischen Außenhändler. Ein Spediteur oder Vermittler ist kein Wiederverkäufer allein aufgrund seiner Mitwirkung. Zollvertretung und Vertriebskanal sind getrennt zu bestimmen.')],
        'Physische Waren bilden den sichtbaren Güterhandel. Grenzüberschreitende Leistungen wie Fernwartung oder Beratung sind Dienstleistungshandel. Auch dafür sind Leistungsumfang, Zahlung und die anwendbaren Voraussetzungen zu klären.'),
      section('mittler', 'Handelsmittler anhand ihrer Rolle unterscheiden',
        [plain('Ein '), term('Auslandsagent', 'marketing-auslandsagent-begriff'), plain(' ist typischerweise eine selbstständige Vertretung vor Ort. Er kann Geschäfte vermitteln oder bei entsprechender Befugnis im Namen des Auftraggebers schließen. Häufig liefert er Marktinformationen oder koordiniert Kundendienst und Auslieferung. Ein '), term('Handelsmakler', 'marketing-handelsmakler-begriff'), plain(' bahnt einzelne Geschäfte an. Prüfe eine etwaige Abschlussvollmacht gesondert.')],
        [plain('Ein '), term('Import- oder Exportkommissionär', 'marketing-kommissionaer-begriff'), plain(' kauft oder verkauft im eigenen Namen für fremde Rechnung. Er erhält für seine Tätigkeit eine Vergütung. Wer im eigenen Namen und auf eigene Rechnung kauft und wiederverkauft, trägt dagegen als Händler das wirtschaftliche Ergebnis dieses Geschäfts.')],
        [plain('Die im Buch als CIF-Agent bezeichnete Spezialisierung wickelt für den Exporteur Geschäfte mit der Lieferklausel '), term('CIF', 'marketing-cif-begriff'), plain(' ab. Unter CIF organisiert und bezahlt der Verkäufer Fracht und vereinbarte Mindestversicherung bis zum benannten Bestimmungshafen. Gefahrübergang ist grundsätzlich bereits an Bord im Verschiffungshafen. CIF ist eine Klausel für See- und Binnenschiffstransporte, keine eigene Rechtsform des Agenten.')]),
      section('wahl', 'Den Weg passend zum Fall wählen',
        'Ein Anlagenbauer mit erklärungsbedürftigem Produkt und wiederkehrenden Aufträgen gewinnt durch direkten Export Kundenwissen und Kontrolle über Preise und Service. Er muss Marktkenntnis, Ersatzteilversorgung, Reklamationsbearbeitung sowie Zahlungs- und Transportrisiken organisieren. Ein Obstverarbeiter mit gelegentlichem Bedarf an kleinen Chargen aus wechselnden Ländern kann einen inländischen Importeur nutzen. Der bündelt Mengen und Vorprüfungen, verlangt dafür eine Marge und hält den Endkunden auf Abstand zum ursprünglichen Lieferanten.',
        'Bewerte Produkt und Servicebedarf, eigene Ressourcen und Marktbedingungen gemeinsam. Ein Direktgeschäft setzt kein eigenes Lager im Zielstaat voraus, wenn Lieferzeit und Verfügbarkeit anderweitig verlässlich abgesichert sind.'),
      section('logistik', 'Zoll und Liefervertrag vertiefen',
        [link('Direkter und indirekter Außenhandel aus Logistiksicht', 'logistik-direkter-indirekter-aussenhandel'), plain(' · '), link('Ausfuhrverfahren', 'logistik-ausfuhr'), plain(' · '), link('Einfuhrverfahren', 'logistik-einfuhr'), plain(' · '), link('Incoterms und Lieferbedingungen', 'logistik-incoterms')]),
      question('Ein Betrieb verkauft Geräte an einen dänischen Händler. Eine dänische Vertreterin vermittelt den Vertrag und ein deutscher Spediteur transportiert die Ware. Wie ordnest du das ein? Was ändert ein deutscher Exporthändler, der die Geräte selbst einkauft und in Dänemark weiterverkauft?',
        'Der erste Fall ist direkter Export im betriebswirtschaftlichen Sinn, weil der Betrieb an den dänischen Händler verkauft. Die Vermittlung und der Transport sind Leistungen neben dem Kaufvertrag. Im zweiten Fall verkauft der Hersteller an den inländischen Exporthändler und erreicht den Auslandsmarkt indirekt.'),
    ],
  },
  {
    id: 'marketing-transithandel',
    parent: 'marketing-aussenhandel',
    number: '4.1.2',
    title: 'Transithandel und weitere Außenhandelsformen',
    intro: 'Beim Transithandel kauft und verkauft ein Unternehmen aus einem dritten Land Ware zwischen einem Exporteur und einem Importeur. Die Ware wird in diesem Geschäft unverändert weiterverkauft. Die Strecke der Ware und die Reihenfolge der Kaufverträge können auseinanderfallen.',
    sections: [
      section('dreieck', 'Kaufverträge und Warenweg verfolgen',
        [plain('Beim '), term('Transithandel', 'marketing-transithandel-begriff'), plain(' erwirbt der Transithändler Ware vom Exporteur und verkauft sie an den Importeur. In einem Streckengeschäft fährt die Ware vom Herstellerland direkt ins Abnehmerland. Bei einem Lagergeschäft kann sie über einen Lagerstandort des Händlers geführt werden. Für die Einordnung als Dreiecksgeschäft zählt die Handelsrolle.')],
        'Beispiel: Ein Handelsunternehmen in Hamburg kauft Kupferbleche in Chile und verkauft sie an einen Abnehmer in Südkorea. Kaufverträge bestehen Chile–Deutschland und Deutschland–Südkorea. In der Direktlieferung läuft der Warentransport Chile–Südkorea. In Bezug auf das betrachtete deutsche Wirtschaftsgebiet ist das aktiver Transithandel, weil der Händler dort ansässig ist.',
        'Bei passivem Transithandel sitzt der Transithändler aus Sicht des betrachteten Wirtschaftsgebiets im Ausland. Wird ein deutscher Abnehmer durch einen in Singapur sitzenden Händler aus Japan beliefert, liegt aus deutscher Sicht ein passiver Fall vor. Typisch sind standardisierte Waren, Rohstoffe und zentral organisierte Konzernbeschaffung. Hafenstandorte können als Lager- und Umschlagpunkte dienen.',
        'Der Transithandel beschreibt ein Handelsmodell. Ein zollrechtliches Versandverfahren beschreibt dagegen die kontrollierte Beförderung von Waren unter einem bestimmten Zollstatus. Rückschlüsse auf Zollpflichten, Warenursprung und Umsatzsteuer erfordern die tatsächlichen Verträge, Transportwege und anwendbaren Regeln.'),
      section('sonderformen', 'Wann ein anderes Modell vorliegt',
        [plain('Bei der Veredelung kommt eine Bearbeitung hinzu, etwa das Beschichten eines Bauteils im Ausland. Ein Kompensationsgeschäft verknüpft Handel mit einer Gegenlieferung oder einem Gegenkauf. Eine Auslandsprojektgesellschaft kann ein zeitlich oder sachlich abgegrenztes Vorhaben organisieren. Rechteüberlassung, Systempartnerschaft und Kapitalbeteiligung werden in den Artikeln zu '), link('Kooperationen und Markteintritt', 'marketing-aussenkooperation'), plain(' eingeordnet.')],
        [link('Aktive und passive Veredelung', 'logistik-veredelung'), plain(' · '), link('Warenursprung', 'logistik-warenursprung')]),
      question('Ein Schweizer Händler kauft italienische Normteile und liefert sie unverändert direkt zu einem Abnehmer in Norwegen. Welche Verbindungen zeichnest du in ein Schaubild ein? Was würdest du für die zollrechtliche Einordnung zusätzlich erfragen?',
        'Zwei Kaufverträge verbinden Italien mit dem Schweizer Händler und diesen mit Norwegen. Ein Warenweg verbindet Italien mit Norwegen. Für Zollfragen fragst du nach Warenstatus, Ursprung, Verfahren, Beteiligten und Lieferklausel. Die Handelsrolle allein entscheidet diese Fragen nicht.'),
    ],
  },
  {
    id: 'marketing-aussenkooperation',
    parent: 'marketing-international',
    number: '4.2',
    title: 'Kooperationen und internationaler Markteintritt',
    intro: 'Kooperation ist die Zusammenarbeit selbstständiger Unternehmen für ein gemeinsames Ziel. Im Ausland können Partner zum Beispiel Kundenzugänge, örtliche Kenntnisse, Produktionskapazität oder Kapital beitragen.',
    sections: [
      section('richtungen', 'Vier Kooperationsrichtungen unterscheiden',
        [plain('Bei einer '), term('horizontalen Kooperation', 'marketing-horizontale-kooperation-begriff'), plain(' arbeiten Unternehmen derselben Wertschöpfungsstufe zusammen, etwa zwei gleichartige Hersteller in der Forschung. Vertikal arbeiten aufeinanderfolgende Wertschöpfungsstufen zusammen, etwa Hersteller und Händler bei der Nachversorgung.')],
        'Komplementär ist eine Kooperation, wenn sich die Angebote ergänzen, etwa ein Büroeinrichter und ein Anbieter von Raumakustik im gemeinsamen Projektvertrieb. Eine heterogene Kooperation verbindet unterschiedliche Branchen durch ein gemeinsames Vorhaben, etwa einen Verkehrsverbund, einen Veranstalter und eine Softwarefirma für einen internationalen Messeverkehr.',
        'Export- oder Importgemeinschaften können Ressourcen für Marktrecherche, Promotion oder Beschaffung bündeln. Strategische Allianzen verfolgen längerfristige gemeinsame Ziele. Das Buch nennt auch historische Export- und Importkartelle. Gemeinsame Marktaktivitäten müssen jeweils wettbewerbsrechtlich geprüft werden. Die Bezeichnung als Kooperation schafft keine Erlaubnis für Absprachen unter Wettbewerbern.'),
      section('vergleich', 'Fünf Eintrittsformen wirtschaftlich vergleichen',
        'Export verlagert meist wenig eigenes Kapital ins Ausland. Beim indirekten Export überlässt das Unternehmen mehr Vertriebskontrolle einem Händler als beim direkten Export. Eine Lizenz überträgt bestimmte Nutzungsrechte und verlangt klare Vertragsgrenzen. Franchising liefert ein umfassenderes System, verlangt Schulung und laufende Qualitätssicherung.',
        'Ein Joint Venture teilt Einsatz, Einfluss und Ergebnis mit einem Partner. Eine kontrollierte eigene Tochter erlaubt weitreichende Steuerung, bindet aber meist besonders viel Kapital und Personal. Die Abstufung ist eine Orientierung. Ortsgebundenes Kapital, Risiko, Kooperationsgrad und Kontrolle sind für jeden Fall getrennt zu beurteilen. Ein unsicherer Großexport auf Rechnung kann beispielsweise riskanter sein als eine kleine lokale Beteiligung.',
        'Prüfe intern Finanzkraft, Know-how, Servicekapazität und Marketingkonzept. Prüfe extern Zielkunden, Konkurrenz, Kaufgewohnheiten, Infrastruktur und staatliche Anforderungen. Wäge anschließend je Option ab, wo Personal, Warenbestand und Anlagen stehen, wer entscheidet, wie Risiken geteilt werden und welche Alternativen bei einem Fehlschlag bleiben.'),
      section('pilot', 'Eine Entscheidung mit einem Pilotversuch absichern',
        'Ein Anbieter von Pflegeprodukten erwägt für einen neuen Markt Export oder lokale Lizenzproduktion. Für den Export sprechen geringe irreversible Investitionen und zentral geprüfte Qualität. Die Lizenz kann Lieferzeit und Transportaufwand senken, verlangt aber ein geeignetes Produktionsunternehmen und Schutz des Verfahrenswissens. Für einen Pilotvertrag lassen sich Abnahme, Ausschussquote und Reklamationen messen, bevor der Betrieb sich langfristig bindet.'),
      question('Zwei Hersteller bieten konkurrierende Geräte an und wollen gemeinsam ein Wartungslager im Ausland führen. Wie ordnest du die Richtung ein und welche Trennung ist bei der Planung wichtig?',
        'Weil beide auf derselben Wertschöpfungsstufe tätig sind, handelt es sich um horizontale Kooperation. Der mögliche Vorteil liegt in gepooltem Lagerbestand und kürzeren Servicezeiten. Preise und Mengen, Kundenteilung sowie der Austausch sensibler Informationen erfordern eine eigene wettbewerbsrechtliche Prüfung.'),
    ],
  },
  {
    id: 'marketing-lizenz-franchise',
    parent: 'marketing-aussenkooperation',
    number: '4.2.1',
    title: 'Internationale Lizenzen und Franchising',
    intro: 'Eine Lizenz erlaubt die Nutzung eines abgegrenzten Rechts. Beim Franchising erhält ein rechtlich selbstständiger Betrieb Zugang zu einem ganzen Geschäftssystem und hält dessen vereinbarte Standards ein.',
    sections: [
      section('lizenz', 'Rechte und Vergütung festlegen',
        [plain('Eine '), term('internationale Lizenz', 'marketing-internationale-lizenz-begriff'), plain(' verbindet Lizenzgeber und Lizenznehmer in verschiedenen Ländern. Verfahrens- und Produktionslizenzen können technisches Wissen oder patentierte Methoden betreffen. Produktlizenzen gestatten etwa Herstellung und Vermarktung eines bestimmten Produkts. Markenlizenzen betreffen die Kennzeichnung, Vertriebslizenzen konkret eingeräumtes Vertriebs- und Marketingwissen oder entsprechende Rechte.')],
        'Vertraglich klären die Parteien Nutzungsgebiet, Laufzeit, Produkte, Exklusivität, Qualitätsanforderungen und zulässige Weitergabe. Die Vergütung kann fest, umsatzabhängig oder kombiniert sein. Eine Gegenlizenz oder eine vereinbarte Beteiligung kann wirtschaftlich als Gegenleistung dienen. Inhalt und Schutzgrundlage einer Lizenz müssen zur tatsächlichen Nutzung passen.',
        'Marken, eingetragene Designs, Patente und Gebrauchsmuster sind unterschiedliche Schutzrechte. Urheberrecht folgt eigenen Regeln. Für deutsche Marken ist das DPMA zuständig, für Unionsmarken und eingetragene EU-Designs das EUIPO und für europäische Patente das Europäische Patentamt. Das Madrider System der WIPO ermöglicht internationalen Markenschutz in benannten Vertragsgebieten nach deren Schutzvoraussetzungen.'),
      section('franchise', 'Franchising als ganzes Betriebssystem',
        [plain('Internationales '), term('Franchising', 'marketing-internationales-franchising-begriff'), plain(' bündelt typischerweise Marke, Konzept, Verfahren, Schulung, Marketingunterstützung und Standards. Der Franchisegeber kann vertraglich kontrollieren, ob der Partner die Standards umsetzt. Der Franchisenehmer betreibt sein Unternehmen selbstständig und trägt unter anderem lokale Betriebsrisiken.')],
        'Der Systemgeber erschließt Märkte mit begrenztem eigenen Kapitaleinsatz und nutzt lokale Marktkenntnis. Sinnvoll können Gebietsschutz, abgestimmte Qualität und Risikoteilung sein. Die Partnerauswahl, Qualität aus der Ferne, unterschiedliche Rechtsordnungen und der mögliche Abfluss von Know-how bleiben wichtige Aufgaben. Lokale Produktion kann einzelne Einfuhrkosten vermeiden. Importierte Waren unterliegen weiterhin den anwendbaren Anforderungen.',
        'Der Systemnehmer erhält eine erprobte Marke, Schulung und Unterstützung. Er zahlt Gebühren, bindet sich an Standards und muss die wirtschaftliche Tragfähigkeit seines Standorts prüfen. Ein Bäckereisystem sollte beispielsweise Regeln für Rezeptur, Allergenprozesse und Ladenbetrieb vorgeben, die Filiale aber Tagesmengen an die tatsächliche Nachfrage anpassen lassen.'),
      section('rechnung', 'Lizenzgebühr mit einer Mindestzahlung abrechnen',
        'Ein Sportartikelhersteller vereinbart 5 % des definierten Nettoumsatzes, mindestens 8.000 € je Jahr. Bei 160.000 € Nettoumsatz ergeben 160.000 € × 0,05 = 8.000 €. Bei 100.000 € ergeben sich rechnerisch 5.000 €, durch die Mindestklausel bleiben 8.000 € fällig. Prüfe, welche Umsätze, Rabatte und Währungsregeln der Vertrag für die Bemessungsgrundlage nennt.'),
      question('Eine Hotelkette erlaubt einem Partner nur die Nutzung eines Buchungssystems. Ein zweiter Partner übernimmt zusätzlich Marke, Servicehandbuch, Schulung und regelmäßige Audits. Welche Form liegt jeweils näher?',
        'Der erste Vertrag ist eher eine Lizenz für ein bestimmtes Nutzungsrecht. Der zweite ist aufgrund des gesamten Systems, der Unterstützung und der laufenden Kontrolle eher ein Franchisevertrag. Für die rechtliche Einordnung kommt es auf den vollständigen Vertragsinhalt an.'),
    ],
  },
  {
    id: 'marketing-joint-venture',
    parent: 'marketing-aussenkooperation',
    number: '4.2.2',
    title: 'Joint Venture und Direktinvestition',
    intro: 'Ein Gemeinschaftsunternehmen verbindet Ressourcen mehrerer Partner. Eine Direktinvestition soll dauerhaften Einfluss auf eine wirtschaftliche Tätigkeit im Ausland ermöglichen. Ein kapitalbasiertes Joint Venture kann gleichzeitig eine Direktinvestition seiner Partner sein.',
    sections: [
      section('gestaltung', 'Ein Gemeinschaftsunternehmen gestalten',
        [plain('Ein '), term('Joint Venture', 'marketing-joint-venture-begriff'), plain(' kann als eigene Gesellschaft mit gemeinsamer Steuerung organisiert sein. Diese kapitalbasierte Variante steht im Lernband im Mittelpunkt. Die Beteiligten vereinbaren Beiträge wie Kapital, Verfahren, Kundenzugang und Personal sowie Regeln für Entscheidungen, Gewinne und Verluste.')],
        'Beschreibe die Herkunft der Partner (zwei oder mehr Länder), die Zahl der beteiligten Unternehmen, die Kapitalanteile (Mehrheit, Parität oder Minderheit aus jeweiliger Sicht) und die Kooperationsrichtung (horizontal, vertikal, komplementär oder heterogen). Kläre den Schwerpunkt wie Produktion, Vertrieb, Entwicklung oder mehrere Funktionen. Vergleiche projektbezogene und dauerhafte Formen. Bestimme, ob Einfluss geteilt ist oder ein Partner dominiert, und ob die Beteiligung freiwillig ist oder mit einer Vorgabe des Zielmarkts zusammenhängt.',
        'Der Nutzen liegt oft in lokalen Kontakten, geteiltem Kapitalbedarf, verteiltem Risiko und kombiniertem Know-how. Konflikte können bei Gewinnverwendung, Marktauswahl, Personal, Planung oder Schutz von Wissen entstehen. Kläre Entscheidungsrechte, gemeinsame Ziele, Berichtspflichten und einen Exit. Parität beim Kapital hilft wenig, wenn bei einer Pattsituation kein Verfahren greift.'),
      section('investition', 'Organisch wachsen oder einen Betrieb erwerben',
        [plain('Eine '), term('Direktinvestition', 'marketing-direktinvestition-begriff'), plain(' kann über eine Neugründung, eine Auslandstochter, einen dauerhaften Betriebsstandort, eine Beteiligung, Übernahme oder Fusion erfolgen. Neugründung ist organisches Wachstum. Der Erwerb eines bestehenden Unternehmens ist externes Wachstum. Auch Anlagegüter können Teil der Ausstattung einer Auslandsaktivität sein. Eine bloße Lieferung von Maschinen schafft für sich genommen keinen dauerhaften Einfluss.')],
        'Beim eigenen Standort kann der Betrieb Abläufe gezielt gestalten. Aufbauzeit, Fixkosten, Personalgewinnung und Marktrisiko liegen stärker beim Investor. Beim Erwerb kann vorhandenes Personal, lokales Vertriebswissen und Kundenzugang den Einstieg beschleunigen. Kaufpreis, Altlasten und Integration können das Ergebnis belasten.'),
      section('beispiel', 'Anteile und Entscheidungsrechte getrennt betrachten',
        'Ein Werkzeughersteller bringt 600.000 €, ein lokaler Servicebetrieb 400.000 € ein. Bei insgesamt 1.000.000 € beträgt der Kapitalanteil des Herstellers 60 %. Im Vertrag kann trotzdem für Investitionen ab einer festgelegten Schwelle die Zustimmung beider verlangt werden. Der größere Kapitalanteil beantwortet also noch nicht jede Frage der Kontrolle. Ein Pilotvertrag mit dem Partner würde zunächst weniger Kapital binden und die Arbeitsbeziehung erproben.'),
      question('Ein lokaler Partner besitzt 50 % des Gemeinschaftsunternehmens und liefert seine Serviceleistungen gegen Vergütung. Der andere Partner will die Gewinne im Unternehmen belassen. Welche zwei Regeln sollten den Konflikt früh klären?',
        'Definiere Kontrollen für Verträge mit Beteiligten, etwa marktübliche Preise und Zustimmung ohne Interessenkonflikt. Vereinbare außerdem die Grundsätze der Gewinnverwendung und einen Eskalationsweg bei Patt, gegebenenfalls mit Vermittlung und klar geregeltem Ausstieg.'),
    ],
  },
  {
    id: 'marketing-interkultur',
    parent: 'marketing-international',
    number: '4.3',
    title: 'Interkulturelle Kommunikation und Kompetenz',
    intro: 'Interkulturelle Kommunikation entsteht, wenn Beteiligte mit unterschiedlichen Kommunikationsgewohnheiten oder Wertvorstellungen zusammenarbeiten. Interkulturelle Kompetenz hilft, Erwartungen zu klären und die Zusammenarbeit an die konkrete Situation anzupassen.',
    sections: [
      section('verstehen', 'Beobachtung und Deutung trennen',
        [plain('Zur '), term('interkulturellen Kompetenz', 'marketing-interkulturelle-kompetenz-begriff'), plain(' gehören Wissen, Reflexion, Anpassungsfähigkeit und konstruktive Zusammenarbeit. Fremdsprachenkenntnisse erleichtern die Kommunikation. Ebenso wichtig sind Erwartungen an direkte Kritik, verbindliche Zusagen, Entscheidungsspielräume, Gesprächsform und Rückmeldungen.')],
        'Im internationalen Team können ein kurzer Satz, Schweigen oder ein Nicken verschieden verstanden werden. Frage nach, ob ein Vorschlag geprüft, intern freigegeben oder bereits verbindlich beschlossen ist. Dokumentiere Zuständigkeit, Termin und offene Bedingungen in einer kurzen Zusammenfassung. Mobilität, internationale Partnerschaften und digitale Zusammenarbeit vergrößern die Zahl solcher Situationen.'),
      section('kompetenzen', 'Vier Fähigkeiten konkret anwenden',
        'Sachkompetenz bedeutet, Marktregeln, Fachsprache und Unterschiede in Geschäftsgewohnheiten zu kennen. Handlungskompetenz bedeutet, eine tragfähige Vorgehensweise zu wählen, etwa eine mehrsprachige Zusammenfassung und eine Rückfrage zur Freigabe. Selbstkompetenz hilft, eigene Erwartungen und spontane Urteile zu prüfen. Sozialkompetenz zeigt sich durch aktives Zuhören, Perspektivwechsel und respektvolle Konfliktklärung.',
        'Eine internationale Projektleitung erhält nach einem Videoanruf keine Einwände. Sie fragt die Beteiligten einzeln nach technischen Risiken und lässt das Protokoll bestätigen. Ebenso kann eine Einkaufsgesellschaft das kritische Qualitätsfeedback in einem privaten Gespräch klären und einen öffentlichen Projektstatus auf bestätigte Fakten beschränken.'),
      section('marketingmix', 'Erkenntnisse in den Marketingmix übertragen',
        'Teste Produktvarianten, Bedienung, Verpackungsinformationen und Serviceanforderungen mit der tatsächlichen Zielgruppe. Prüfe, ob Ton, Bildsprache und Aussagen der Kommunikation richtig verstanden werden. Leite passende Absatzkanäle aus dem beobachteten Kaufverhalten und den Erwartungen an Beratung, Lieferung und Rückgabe ab. Standardisiere, was funktioniert, und passe an, wo die Daten oder verbindliche Anforderungen es begründen.'),
      question('Ein Projektpartner nickt bei einer Lieferfrist, schickt aber keine Freigabe. Wie gehst du mit der Situation um?',
        'Das Nicken kann Zuhören oder Zustimmung ausdrücken. Frage offen nach dem aktuellen Stand und nach Zuständigkeit oder Vorbehalten. Fasse den Termin, die Bedingungen und den Freigabeschritt schriftlich zusammen. Entscheide erst anhand der bestätigten Zusage über die nächste Bestellung.'),
    ],
  },
  {
    id: 'marketing-kulturdimensionen',
    parent: 'marketing-interkultur',
    number: '4.3.1',
    title: 'Kulturdimensionen nach Hofstede und Trompenaars',
    intro: 'Kulturdimensionen sind Vergleichsachsen für Muster, die in Gruppen oder Organisationen beobachtet werden können. Sie liefern Fragen für eine Vorbereitung. Die konkrete Person und ihr Arbeitskontext müssen im Gespräch verstanden werden.',
    sections: [
      section('hofstede', 'Hofstedes Dimensionen als Diagnosefragen',
        [plain('Die '), term('Machtdistanz', 'marketing-machtdistanz-begriff'), plain(' beschreibt, inwieweit ungleiche Autorität als normal oder legitim gilt. Für eine Verhandlung frage, wer entscheiden darf und wer eingeladen werden sollte. Individualismus und Kollektivismus richten den Blick auf die Bedeutung individueller Verantwortung oder Gruppenbindung. Frage, wer intern an der Bewertung beteiligt sein soll.')],
        'Die historischen Modellbegriffe Maskulinität und Feminität stehen in dieser Gegenüberstellung für Schwerpunkte wie Wettbewerb und Leistung gegenüber Zusammenarbeit und Lebensqualität. Sie erlauben keine Zuordnung von Fähigkeiten nach Geschlecht. Frage beispielsweise, ob in einem Angebot der messbare Leistungsvorsprung oder die gemeinsame Projektarbeit stärker belegt werden muss.',
        [plain('Die '), term('Unsicherheitsvermeidung', 'marketing-unsicherheitsvermeidung-begriff'), plain(' beschreibt den Umgang mit Mehrdeutigkeit und offenen Situationen. Sie ist von individueller Risikobereitschaft zu unterscheiden. Die langfristige Orientierung fragt nach Planungshorizont sowie Anpassung und Ausdauer bei langfristigen Zielen. In der Praxis helfen zum Beispiel ein Testplan für offene Qualitätsfragen und ein vereinbarter Zeithorizont für Serviceinvestitionen.')]),
      section('trompenaars', 'Fünf im Buch genannte Achsen nach Trompenaars und Hampden-Turner',
        [term('Universalismus und Partikularismus', 'marketing-universalismus-partikularismus-begriff'), plain(' betreffen allgemeine Regeln und die Bedeutung begründeter Ausnahmen im konkreten Verhältnis. Spezifisch und diffus beschreiben, wie eng berufliche und weitere Beziehungsbereiche getrennt werden. Neutral oder affektiv betrifft, wie sichtbar Gefühle und Körpersprache in einer Situation eingesetzt werden.')],
        [plain('Leistungsorientierung und '), term('Zuschreibung (Askription)', 'marketing-askription-begriff'), plain(' fragen, ob Anerkennung eher aus nachgewiesener Leistung oder aus Rolle, Alter, Titel oder gesellschaftlichem Status entsteht. Die Zeitdimension fragt nach Bezug zu Vergangenheit, Gegenwart und Zukunft. In der Praxis klärt ein Projektteam, welche Rolle Erfahrungen früherer Projekte, aktuelle Zwänge und längerfristige Verpflichtungen in der Entscheidung spielen.')]),
      section('vorsicht', 'Hypothesen prüfen und Alternativen offenhalten',
        'Wenn die Technikabteilung erst nach Freigabe durch den Einkauf antwortet, könnte das an der formalen Rollenverteilung liegen. Eine Präferenz für Hierarchie ist nur eine mögliche Erklärung. Wenn ein Zeitplan wiederholt offenbleibt, kommen fehlende Ressourcen, Sprache, unklare Daten oder konkurrierende Aufträge als Gründe infrage. Erfrage den Entscheidungsprozess und beobachte, welche Vereinbarungen eingehalten werden.'),
      question('Eine Projektleiterin erwartet schriftliche Abnahmekriterien. Der Partner möchte Ausnahmen bei Sonderfällen gemeinsam aushandeln. Welche Dimensionen helfen als Gesprächseinstieg, und was vereinbarst du konkret?',
        'Unsicherheitsvermeidung kann ein Ansatz für die Nachfrage nach klaren Kriterien sein. Universalismus und Partikularismus helfen, allgemeine Regeln und Fallausnahmen zu besprechen. Lege Mindeststandards fest und vereinbare, wer Ausnahmen mit welcher Begründung genehmigt. Aus dem Verhalten allein folgt keine pauschale Aussage über eine Herkunft oder Kultur.'),
    ],
  },
  {
    id: 'marketing-fall-markteintritt',
    parent: 'marketing-international',
    number: '4.4',
    title: 'Übungsfall: Markteintritt und Zusammenarbeit',
    intro: 'Ein deutscher Hersteller modularer Schallschutzsysteme für Büros erwägt die Expansion in zwei benachbarte Länder. Das Produkt muss vermessen, montiert und später gewartet werden. Die Fertigung bleibt zunächst in Deutschland.',
    sections: [
      section('lage', 'Ausgangslage',
        'Ein Händler mit Montageteam bietet eine befristete Vertriebspartnerschaft an. Das Unternehmen erwägt alternativ eine eigene Niederlassung. Nach einem Online-Gespräch gibt es Unklarheit über die Preiskalkulation, die Installationsfreigabe und darüber, wer konstruktive Kritik an den Zeichnungen vor der endgültigen Freigabe sammeln soll.'),
      {
        ...section('aufgaben', 'Aufgaben',
          '1. Erläutere den Zusammenhang zwischen interkultureller Kommunikation und interkultureller Kompetenz für diesen Markteintritt. Gib zwei konkrete Maßnahmen an.',
          '2. Erkläre an drei beobachtbaren Situationen je eine Kulturdimension. Formuliere jeweils eine Rückfrage, mit der du deine Deutung überprüfen kannst.',
          '3. Empfiehl eine Eintrittsform für die ersten zwölf Monate. Begründe die Wahl mit Kapitalbedarf, Qualitätskontrolle und Zugang zur Kundschaft. Benenne ein Kriterium für eine spätere Neubewertung.'),
        hint: {
          label: 'SELBSTKONTROLLE',
          title: 'Musterlösung',
          content: '1. Zusammenarbeit bringt unterschiedliche Erwartungen an Freigabe, Feedback und Verantwortung zusammen. Interkulturelle Kompetenz hilft, diese Erwartungen zu erkennen und eine verlässliche Arbeitsweise herzustellen. Fasse Entscheidungen mit Zuständigkeit und Termin in einem gemeinsamen Protokoll zusammen und biete einen direkten Kanal für Änderungen und Kritik an.\n\n2. Machtdistanz: Für die Freigabe wird wiederholt eine höhere Ebene einbezogen. Frage: Wer ist für die technische Freigabe vorgesehen? Unsicherheitsvermeidung: Der Partner wünscht detaillierte Prüfkriterien. Frage: Welche Toleranzen müssen vor der Montage geklärt sein? Neutralität und Affektivität: Kritik wird in einer Diskussion sehr sichtbar vorgetragen. Frage: Sollen technische Abweichungen bilateral, im Termin oder schriftlich besprochen werden? Behandle alle drei Beobachtungen als prüfbare Hypothesen.\n\n3. Eine befristete Partnerschaft mit Montage- und Servicevorgaben bindet zunächst weniger Kapital und nutzt den lokalen Kundenzugang. Ausgewählte Pilotprojekte erlauben die Qualitätskontrolle über Abnahmen, Vor-Ort-Feedback und Reklamationsdaten. Prüfe nach zwölf Monaten unter anderem Deckungsbeitrag, Montagequalität und erreichbare Folgeaufträge. Eine eigene Niederlassung kann sinnvoll sein, wenn das Volumen und der Bedarf an direkter Steuerung dauerhaft ausreichend hoch sind.',
        },
      },
      question('Übertrage die Lösung auf einen Online-Schulungsbetrieb. Welche Eintrittsentscheidung kann sich ändern?',
        'Lokale Montage entfällt. Der Pilot kann daher zunächst direkt aus dem Heimatmarkt angeboten werden. Sprache, Zeitfenster, Zahlungsmöglichkeiten und anwendbare Vorgaben bleiben zu klären. Eine lokale Lizenz oder Partnerschaft kann interessant werden, wenn Anpassung oder Kundengewinnung vor Ort mit stärkerem Engagement messbar besser gelingt.'),
    ],
  },
];

export const chapters: Chapter[] = lessons.map(({ id, parent, number, title }) => ({
  id, subjectId, parentId: parent, articleId: id, number, title,
}));

export const articles: Article[] = lessons.map(({ id, number, title, intro, sections }) => ({
  id, subjectId, chapterId: id, number, title, intro, sections, updatedAt, version: 1,
}));

type Definition = [id: string, articleId: string, term: string, definition: string];
const definitions: Definition[] = [
  ['markteintritt', 'international', 'Markteintritt', 'Aufnahme eigener Geschäftstätigkeit in einem Zielmarkt unter Wahl eines Absatz-, Kooperations- oder Investitionswegs.'],
  ['freihandel', 'aussenhandel', 'Freihandel', 'Handelspolitisches Leitbild, das grenzüberschreitenden Austausch durch den Abbau von Handelshemmnissen erleichtert.'],
  ['protektionismus', 'aussenhandel', 'Protektionismus', 'Staatliche Maßnahmen, die heimische Anbieter beispielsweise durch Importhemmnisse vor ausländischem Wettbewerb schützen.'],
  ['kontingent', 'aussenhandel', 'Kontingent', 'Mengenbegrenzung im Außenhandel oder Menge, für die im Fall eines Zollkontingents eine abweichende Zollbehandlung gilt.'],
  ['dumping', 'aussenhandel', 'Dumping', 'Ausfuhr zu einem Preis unter dem maßgeblichen Normalwert aus Sicht des Antidumpingrechts.'],
  ['gatt', 'aussenhandel', 'GATT', 'Das Allgemeine Zoll- und Handelsabkommen enthält multilaterale Regeln für den Handel mit Waren.'],
  ['gats', 'aussenhandel', 'GATS', 'Das Allgemeine Abkommen über den Handel mit Dienstleistungen enthält multilaterale Regeln für den Dienstleistungshandel.'],
  ['trips', 'aussenhandel', 'TRIPS', 'WTO-Abkommen zu handelsbezogenen Aspekten geistigen Eigentums und Mindeststandards für dessen Schutz.'],
  ['trims', 'aussenhandel', 'TRIMs', 'WTO-Abkommen zu bestimmten Investitionsmaßnahmen mit Bezug zum Warenhandel.'],
  ['indirekter-import', 'export-import', 'Indirekter Import', 'Beschaffung ausländischer Ware bei einem inländischen Außenhändler, der sie in eigener Handelsfunktion importiert.'],
  ['auslandsagent', 'export-import', 'Auslandsagent', 'Selbstständiger Vermittler im Auslandsmarkt, der den Auftraggeber je nach Mandat bei Marktansprache, Geschäftsabschluss oder Service unterstützt.'],
  ['handelsmakler', 'export-import', 'Handelsmakler', 'Selbstständiger Vermittler, der für andere einzelne Geschäfte anbahnt.'],
  ['kommissionaer', 'export-import', 'Kommissionär', 'Unternehmer, der Waren oder Wertpapiere im eigenen Namen für Rechnung eines anderen kauft oder verkauft.'],
  ['cif', 'export-import', 'CIF', 'Incoterms-Klausel für See- und Binnenschiffstransport. Der Verkäufer zahlt Fracht und Versicherung bis zum benannten Bestimmungshafen. Die Gefahr geht grundsätzlich im Verschiffungshafen an Bord über.'],
  ['transithandel', 'transithandel', 'Transithandel', 'Dreiecksgeschäft, bei dem ein Händler in einem dritten Land Ware vom Exporteur erwirbt und unverändert an den Importeur weiterverkauft.'],
  ['horizontale-kooperation', 'aussenkooperation', 'Horizontale Kooperation', 'Zusammenarbeit von Unternehmen auf derselben Wertschöpfungsstufe, etwa in Entwicklung oder Logistik.'],
  ['internationale-lizenz', 'lizenz-franchise', 'Internationale Lizenz', 'Vertraglich begrenztes Nutzungsrecht, das ein Lizenzgeber einem Lizenznehmer in einem anderen Land einräumt.'],
  ['internationales-franchising', 'lizenz-franchise', 'Internationales Franchising', 'Grenzüberschreitende Überlassung eines Geschäftssystems an rechtlich selbstständige Partner, verbunden mit vertraglichen Standards, Unterstützung und Gebühren.'],
  ['joint-venture', 'joint-venture', 'Joint Venture', 'Gemeinsam gesteuertes unternehmerisches Vorhaben mehrerer Partner, bei der kapitalbasierten Ausprägung mit einem Gemeinschaftsunternehmen.'],
  ['direktinvestition', 'joint-venture', 'Direktinvestition', 'Investition in eine Auslandsaktivität, die auf eine dauerhafte wirtschaftliche Beziehung und Einfluss auf deren Leitung zielt.'],
  ['interkulturelle-kompetenz', 'interkultur', 'Interkulturelle Kompetenz', 'Fähigkeit, in unterschiedlichen kulturellen und organisatorischen Zusammenhängen respektvoll, verständlich und wirksam zu handeln.'],
  ['machtdistanz', 'kulturdimensionen', 'Machtdistanz', 'Kulturdimension zur Frage, in welchem Ausmaß ungleiche Autorität in einem sozialen Umfeld als üblich oder legitim gilt.'],
  ['universalismus-partikularismus', 'kulturdimensionen', 'Universalismus und Partikularismus', 'Gegenüberstellung der Orientierung an allgemeinen Regeln und der Berücksichtigung von Umständen und Beziehungen im Einzelfall.'],
  ['askription', 'kulturdimensionen', 'Askription', 'Zuschreibung von Status oder Anerkennung aufgrund einer Rolle, Herkunft, eines Titels oder anderer zugeschriebener Merkmale.'],
  ['unsicherheitsvermeidung', 'kulturdimensionen', 'Unsicherheitsvermeidung', 'Kulturdimension zur Frage, wie stark Mehrdeutigkeit und offene Situationen als belastend erlebt und durch Regeln oder Planung eingegrenzt werden.'],
];

export const glossary: GlossaryTerm[] = definitions.map(([id, articleId, term, definition]) => ({
  id: `marketing-${id}-begriff`, subjectId, articleId: `marketing-${articleId}`, term, definition,
}));
