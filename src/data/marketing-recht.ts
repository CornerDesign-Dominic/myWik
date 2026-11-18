import type { Article, ArticleSection, Chapter, GlossaryTerm, RichText } from '../types';

const subjectId = 'marketing';
const updatedAt = Date.UTC(2026, 10, 18);
const uwg = 'https://www.gesetze-im-internet.de/uwg_2004/BJNR141400004.html';
const gwb = 'https://www.gesetze-im-internet.de/gwb/BJNR252110998.html';
const vertikalGvo = 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32022R0720';
const markenG = 'https://www.gesetze-im-internet.de/markeng/BJNR308210994.html';
const bgb = 'https://www.gesetze-im-internet.de/bgb/BJNR001950896.html';
const dpma = 'https://www.dpma.de/recherchieren/schutzrechte-recherchieren/marken-recherchieren';
const pangv = 'https://www.gesetze-im-internet.de/pangv_2022/BJNR492110021.html';
const widerrufsfunktion = 'https://www.gesetze-im-internet.de/bgb/__356a.html';

type Paragraph = string | RichText[];
type Topic = {
  id: string;
  number: string;
  title: string;
  parentId?: string;
  intro: string;
  sections: ArticleSection[];
};

const text = (value: string): RichText => ({ text: value });
const term = (value: string, id: string): RichText => ({ text: value, termId: 'marketing-recht-begriff-' + id });
const link = (value: string, articleId: string): RichText => ({ text: value, articleId });
const sharedTerm = (value: string, termId: string): RichText => ({ text: value, termId });

function section(id: string, title: string, ...paragraphs: Paragraph[]): ArticleSection {
  return { id, title, paragraphs: paragraphs.map(p => typeof p === 'string' ? [text(p)] : p) };
}

function question(id: string, title: string, prompt: string, content: string): ArticleSection {
  return { ...section(id, title, prompt), hint: { title: 'Musterantwort', content } };
}

function sources(pages: string, ...references: string[]): ArticleSection {
  return section('quellen', 'Rechtsstand und Quellen',
    'Deutsches Recht und einschlägiges EU-Recht, Prüfstand 18. November 2026. Buchabgleich: DIHK-Textband Marketing und Vertrieb, PDF-Seiten ' + pages + '.',
    ...references);
}

const topics: Topic[] = [
  {
    id: 'marketing-recht', number: '5', title: 'Spezielle Rechtsaspekte im Marketing',
    intro: 'Marketingmaßnahmen betreffen unterschiedliche Rechtsgebiete. Prüfe die Außendarstellung, die Regeln des Wettbewerbs, die verwendeten Kennzeichen und die Vertragsabwicklung getrennt. Eine einzige Kampagne kann alle vier Prüfungen auslösen.',
    sections: [
      section('pruefpfade', 'Vier Prüfpfade für Marketingentscheidungen',
        [text('1. Ansprache und Darstellung. Erweckt eine Preisanzeige einen falschen Eindruck, erzeugt ein Banner Druck oder wird jemand ohne Einwilligung kontaktiert? Ausgangspunkt ist das '), link('UWG', 'marketing-recht-uwg'), text('.')],
        [text('2. Marktverhalten. Koordinieren Unternehmen Preise, Gebiete oder Vertriebsvorgaben, missbraucht ein Unternehmen Marktmacht oder steht ein Zusammenschluss bevor? Hier setzt das '), link('Kartellrecht', 'marketing-recht-gwb'), text(' an.')],
        [text('3. Kennzeichen und Schutzrechte. Wer darf das Logo, die Herkunftsbezeichnung oder den Produktnamen verwenden? Das '), link('Markenrecht', 'marketing-recht-marken'), text(' behandelt Kennzeichen. Für technische Erfindungen und Gestaltung kommen andere gewerbliche Schutzrechte in Betracht.')],
        [text('4. Geschäft mit Privatpersonen. Für Warenkauf, Widerruf, Preisangaben und AGB gelten zusätzliche Regeln. Einstieg ist der '), link('Verbraucherschutz', 'marketing-recht-verbraucherschutz'), text('.')]),
      section('produktstart', 'Praxis: Eine Kaffeemaschine kommt auf den Markt',
        'Ein Hersteller klärt, ob eine technische Neuerung für Patentschutz infrage kommt, und prüft den neuen Produktnamen auf ältere Kennzeichen. Anschließend sichtet er Werbevergleiche, Vertriebsvorgaben im Händlervertrag und die Verbraucherverträge im Webshop.',
        'Dokumentiere je Maßnahme Verantwortliche, Prüffrage, Tatsachengrundlage und Freigabe. Ein eingetragener Name ersetzt weder den Werbenachweis noch die kartellrechtliche Vertragsprüfung.'),
      sources('123–133', 'UWG: ' + uwg, 'GWB: ' + gwb, 'MarkenG: ' + markenG, 'BGB: ' + bgb),
      question('transfer', 'Selbstkontrolle', 'Ein Möbelhersteller möchte eine neue Marke für seinen Onlineshop einführen. Er will Händler auf Mindestpreise verpflichten und mit einem veralteten Vergleichspreis werben. Ordne die Fragen zu.',
        'Die neue Marke löst eine Kennzeichenrecherche aus. Mindestpreise für selbstständige Händler sind ein kartellrechtlicher Prüfpunkt. Der Vergleichspreis betrifft Irreführung und bei angekündigter Ermäßigung die Preisangabenverordnung. Der Onlineabschluss löst Verbraucherinformations- und gegebenenfalls Widerrufspflichten aus.'),
    ],
  },
  {
    id: 'marketing-recht-wettbewerb', number: '5.1', title: 'Wettbewerbsrecht: UWG und GWB',
    parentId: 'marketing-recht',
    intro: 'Das Lauterkeitsrecht beurteilt konkrete geschäftliche Praktiken. Das Kartellrecht schützt die Funktionsfähigkeit des Marktes vor wettbewerbsbeschränkenden Vereinbarungen, Missbrauch von Marktmacht und problematischen Zusammenschlüssen.',
    sections: [
      section('schutzziele', 'Schutzziele und Prüffragen',
        [text('Das '), term('UWG', 'uwg'), text(' schützt Mitbewerber, Verbraucher, sonstige Marktteilnehmer und das Allgemeininteresse an unverfälschtem Wettbewerb. Prüfe die konkrete Handlung, ihren Adressaten und die Wirkung auf geschäftliche Entscheidungen. Das '), term('GWB', 'gwb'), text(' untersucht in diesem Kapitel Absprachen, Marktstellung und Marktstruktur. Bei möglicher Beeinträchtigung des Handels zwischen EU-Mitgliedstaaten kommen außerdem insbesondere Art. 101 und 102 AEUV in Betracht.')],
        [text('Wenn ein Händler zwei Maßnahmen kombiniert, prüfe beide selbstständig. Aus einer irreführenden Anzeige folgt keine Preisabsprache. Eine Maßnahme kann aber beide Prüfpfade berühren, etwa eine koordinierte Scheinrabattkampagne mehrerer Wettbewerber. Weiter zu '), link('unlauteren geschäftlichen Handlungen', 'marketing-recht-uwg'), text(' und zum '), link('Kartellrecht', 'marketing-recht-gwb'), text('.')]),
      section('praxis', 'Praxis: Die gleiche Branche, zwei Sachverhalte',
        'Ein Autohaus erhöht eigenständig einen Preis. Das allein ist keine Absprache. Wenn es Käufer anschließend mit einem erfundenen früheren Preis zum Kauf bewegen will, ist die Werbung gesondert zu beurteilen. Stimmen sich dagegen mehrere Autohäuser vorher über gemeinsame Mindestpreise ab, ist die Koordinierung kartellrechtlich relevant, auch bei transparenten Preisschildern.'),
      sources('124–127', '§ 1 UWG: ' + uwg, 'GWB Teil 1: ' + gwb,
        'Art. 101 und 102 AEUV: https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:12016E/TXT'),
      question('transfer', 'Selbstkontrolle', 'Eine Werkstatt versendet ungefragte Werbe-E-Mails und vereinbart mit anderen Werkstätten eine Aufteilung der Innenstadt. Welches Gesetz ist jeweils der Ausgangspunkt?',
        'Für die Ansprache ist § 7 UWG einschlägig. Die Gebietsaufteilung der selbstständigen Wettbewerber ist eine horizontale Vereinbarung und nach § 1 GWB zu prüfen. Dass beide Maßnahmen dem Absatz dienen, ändert die rechtliche Zuordnung nicht.'),
    ],
  },
  {
    id: 'marketing-recht-uwg', number: '5.1.1', title: 'UWG: Lautere Werbung und Direktansprache',
    parentId: 'marketing-recht-wettbewerb',
    intro: 'Eine geschäftliche Handlung kann unlauter sein, wenn sie etwa irreführt, unzulässigen Druck erzeugt oder Marktteilnehmer unzumutbar belästigt. Prüfe Botschaft, Gestaltung, Angebotsdaten und Kanal gemeinsam.',
    sections: [
      section('grundlagen', 'Prüfmaßstab und besondere Schutzfälle',
        [text('Das '), term('UWG', 'uwg'), text(' erfasst unternehmensbezogenes Verhalten bei Absatz oder Bezug von Waren und Dienstleistungen vor, bei oder nach dem Geschäftsabschluss. Im Verbraucherverkehr ist § 3 UWG Ausgangspunkt. Maßgeblich ist grundsätzlich der durchschnittliche Adressat. Bei erkennbar besonders schutzbedürftigen Gruppen gilt gegebenenfalls der entsprechende Gruppenmaßstab.')],
        [text('Treffen die Voraussetzungen eines Eintrags der '), term('Schwarzen Liste', 'schwarze-liste'), text(' im UWG-Anhang zu, ist die Handlung gegenüber Verbrauchern stets unzulässig. Beispiele sind ein unberechtigt verwendetes Gütezeichen oder falsche extreme Knappheit. § 4a erfasst aggressive Praktiken durch Belästigung, Nötigung oder unzulässige Beeinflussung, etwa das gezielte Ausnutzen einer akuten Notlage zum Abschluss.')],
        '§ 4 schützt Mitbewerber gegen Herabsetzung, rufschädigende Tatsachenbehauptungen unter den dort genannten Voraussetzungen, unlautere Nachahmung und gezielte Behinderung. Für den ergänzenden Leistungsschutz genügt bloße Ähnlichkeit nicht: Relevant können vermeidbare Herkunftstäuschung, unangemessene Ausnutzung oder Beeinträchtigung der Wertschätzung oder unredlich erlangte Unterlagen sein.'),
      section('irrefuehrung', 'Aussage, Weglassen und Preiswerbung',
        [text('Bei '), term('Irreführung', 'irrefuehrung'), text(' unterscheide falsche oder täuschungsgeeignete Angaben (§ 5) von vorenthaltenen wesentlichen Informationen (§§ 5a und 5b). Ein objektiv zutreffendes Detail kann im Gesamtbild täuschen. Preis, Lieferbarkeit, Testsiegel, Herkunft, Eigenschaften und Nebenkosten gehören zu den typischen Prüfpunkten. Ein nicht sofort erkennbarer kommerzieller Zweck kann offenzulegen sein.')],
        'Lockwerbung nach Nr. 5 des UWG-Anhangs betrifft ein Angebot zum bestimmten Preis, wenn absehbare Lieferengpässe für eine angemessene Menge und Dauer verschwiegen werden. Reicht die Bevorratung weniger als zwei Tage, trägt das Unternehmen die Beweislast für deren Angemessenheit. Das ist keine starre Pflicht, jedes Angebot genau zwei Tage vorzuhalten. Wer gezielt auf einen anderen Artikel umlenkt, prüft zusätzlich Nr. 6 des Anhangs.',
        'Bei öffentlich angekündigter Preisermäßigung für Waren ist gegenüber Verbrauchern nach § 11 PAngV grundsätzlich der niedrigste in den 30 Tagen vor der Ermäßigung angewendete Gesamtpreis anzugeben. Für stufenweise ansteigende Ermäßigungen oder bestimmte individuelle beziehungsweise verderbbedingte Rabatte sieht die Vorschrift Sonderregeln vor. Wer einen höheren, tatsächlich nur zum Schein verlangten Ausgangspreis als Rabattbasis nutzt, riskiert Irreführung.',
        'Beispiel: Der Shoppreis betrug in den letzten 30 Tagen 100 €, 80 € und 100 €. Der aktuelle Aktionspreis von 72 € ist 8 € niedriger als der maßgebliche Vorpreis. 8 € geteilt durch 80 € ergibt 10 % Rabatt. Bewirbt der Shop stattdessen 28 % auf Basis der 100 €, passen Bezugspunkt und Ersparnis nicht zusammen.'),
      section('vergleich', 'Vergleichende Werbung prüfen',
        [text('Bei '), term('vergleichender Werbung', 'vergleichswerbung'), text(' ist ein Wettbewerber oder dessen Angebot direkt oder indirekt erkennbar. Vergleiche Angebote für denselben Bedarf oder dieselbe Zweckbestimmung sachlich anhand wesentlicher, relevanter, nachprüfbarer und typischer Merkmale oder des Preises. Vermeide Verwechslung, Rufausbeutung, Rufschädigung, Herabsetzung und die Darstellung als Imitation eines geschützten Angebots.')],
        'Ein Anbieter kann die Akkulaufzeit zweier Geräte vergleichen, wenn Nutzungsszenario, Testbedingungen, Modellstand und Merkmal vergleichbar und belegbar sind. Eine pauschale Behauptung, das Konkurrenzgerät sei „Schrott“, liefert keine überprüfbare sachliche Vergleichsgrundlage.'),
      section('direkt', 'Einwilligung und Kanal',
        [term('Opt-in', 'opt-in'), text(' bedeutet eine vorherige ausdrückliche Einwilligung. Sie ist bei Werbeanrufen an Verbraucher zu dokumentieren. Nach § 7a UWG ist der Nachweis ab Erteilung und nach jeder Verwendung jeweils fünf Jahre aufzubewahren. Bei Werbeanrufen an andere Marktteilnehmer genügt nach UWG mindestens eine mutmaßliche Einwilligung, die sich aus konkreten Umständen ergeben muss. Eine öffentliche Telefonnummer allein reicht dafür nicht. Werbeanrufer dürfen die Anzeige ihrer Nummer nicht unterdrücken (§ 120 Abs. 3 TKG).')],
        'Für Fax, elektronische Post und automatische Anrufmaschinen gilt grundsätzlich eine vorherige ausdrückliche Einwilligung auch gegenüber Unternehmen. Die Ausnahme für elektronische Bestandskundenwerbung setzt gleichzeitig vier Punkte voraus: Adresse aus einem Verkauf, eigene ähnliche Angebote, kein Widerspruch, klarer Widerspruchshinweis bei Erhebung und jeder Nutzung ohne Mehrkosten jenseits der Basistarife. Werbeabsender und Abmeldemöglichkeit müssen identifizierbar sein. Die Anfrage nach einem Angebot allein ist kein Programm für künftige Serienmails.'),
      section('umwelt-folgen', 'Umweltwerbung und Rechtsfolgen',
        'Bei Umweltwerbung passen Nachweis und Reichweite der Aussage zusammen. Ein Recyclinganteil im Karton rechtfertigt keine Aussage über eine insgesamt umweltfreundliche Produktlinie. Das UWG enthält für Verbraucherwerbung seit 2026 zusätzliche Regeln für Nachhaltigkeitssiegel, allgemeine Umweltaussagen, Aussagen über das Gesamtprodukt bei bloßen Teilerfolgen und auf Kompensation gestützte Aussagen zur Klimawirkung. Prüfe insbesondere § 5, § 5b und den UWG-Anhang.',
        'Anspruchsberechtigte Mitbewerber sowie die in § 8 Abs. 3 UWG genannten Stellen können Beseitigung oder Unterlassung verlangen. § 9 regelt bei Verschulden unter Voraussetzungen Schadensersatz, auch für Verbraucher in bestimmten Fallgruppen. Gewinnabschöpfung nach § 10 hat eigene Voraussetzungen und ist kein Auszahlungsanspruch des einzelnen Kunden. § 11 regelt die Verjährung.'),
      sources('124–125, 132–133, 138–139', 'UWG §§ 1–11, 15b, Anhang: ' + uwg, 'PAngV §§ 3–4, 6, 11: ' + pangv,
        'TKG § 120: https://www.gesetze-im-internet.de/tkg_2021/__120.html'),
      question('transfer', 'Transferfrage', 'Ein Kaffeeröster verwendet ohne Erlaubnis ein Zertifikatssiegel. Er schickt Werbemails an alle Personen, die kostenlos eine Broschüre bestellt haben. Welche zwei Punkte muss er getrennt prüfen?',
        'Das unberechtigte Güte- oder Kennzeichen kann unter die Schwarze Liste fallen. Mailwerbung erfordert grundsätzlich vorherige ausdrückliche Einwilligung. Die Broschürenanfrage erfüllt den für die Bestandskundenausnahme vorausgesetzten Verkauf nicht. Der Röster entfernt das Siegel und klärt die Zulässigkeit der Mailkampagne separat.'),
    ],
  },
  {
    id: 'marketing-recht-gwb', number: '5.1.2', title: 'GWB: Kartellverbot, Vertrieb und Marktmacht',
    parentId: 'marketing-recht-wettbewerb',
    intro: 'Das Kartellrecht sichert eigenständige Entscheidungen am Markt. Unterscheide Absprachen, einseitigen Missbrauch und Zusammenschlüsse. Für jeden Prüfpfad gelten eigene Voraussetzungen.',
    sections: [
      section('absprachen', 'Horizontale und vertikale Vereinbarungen',
        [text('Ein '), term('Kartell', 'kartell'), text(' ist hier eine wettbewerbsbeschränkende Koordinierung zwischen Unternehmen. § 1 GWB umfasst Vereinbarungen, Verbandsbeschlüsse und abgestimmtes Verhalten, wenn diese Wettbewerb beschränken sollen oder beschränken. Unter Wettbewerbern sind Preis-, Mengen-, Konditionen-, Kunden- und Gebietsabsprachen typische Beispiele. Auch abgestimmtes Verhalten ohne schriftlichen Vertrag kann erfasst sein. Eigenständiges Marktverhalten ist davon zu unterscheiden.')],
        [text('Zwischen Hersteller und selbstständigem Händler ist die '), term('Preisbindung der zweiten Hand', 'preisbindung'), text(' ein vertikaler Fall. Mindest- und Festpreise für den Wiederverkauf sind regelmäßig Kernbeschränkungen. Eine '), term('unverbindliche Preisempfehlung', 'uvp'), text(' oder ein Höchstpreis kann im Rahmen der EU-Vertikalregeln möglich sein, sofern Druck oder Anreize daraus keinen Fest- oder Mindestpreis machen. Für Printmedien und Arzneimittel sind jeweils die anwendbaren Sondervorschriften getrennt zu prüfen.')]),
      section('freistellung', 'Freistellung und Vertriebsformen',
        [text('Die '), term('Freistellung', 'freistellung'), text(' nach § 2 GWB setzt Effizienzvorteile und eine angemessene Verbraucherbeteiligung voraus. Beschränkungen müssen unerlässlich sein, und für einen wesentlichen Teil der Waren oder Dienstleistungen darf der Wettbewerb nicht ausgeschaltet werden. § 3 behandelt unter Voraussetzungen Mittelstandskooperationen. Bezeichnungen wie Krisen-, Normierungs- oder Rationalisierungskartell ersetzen die Prüfung nicht.')],
        'Die EU-Vertikal-GVO gibt für bestimmte Verträge einen Freistellungsrahmen vor, etwa bei Marktanteilen von jeweils höchstens 30 % und ohne Kernbeschränkungen. Außerhalb dessen ist anhand der Umstände zu prüfen. Gebietsschutz, aktiver versus passiver Verkauf, selektiver Vertrieb und wirksame Nutzung des Internets haben konkrete Regeln. Auch Bezugsbindungen, Wettbewerbsverbote und Bestpreisklauseln sind nach Reichweite, Art und Dauer zu unterscheiden. Bei echten Handelsvertretern kommt es für die Einordnung darauf an, wer wesentliche geschäftliche und finanzielle Risiken trägt.',
        'Praxis: Ein Hersteller kann Qualitätskriterien für autorisierte Händler aufstellen. Ob er Händler im Internet oder bei spontanen Bestellungen von Kunden aus einem anderen Gebiet beschränken darf, hängt unter anderem von der Vertriebsform und Art des Verkaufs ab. Ein pauschales Gebietsverbot ist daher kein Freigabekriterium.'),
      section('marktstruktur', 'Missbrauch, Boykott und Zusammenschlüsse',
        [text('Eine '), term('marktbeherrschende Stellung', 'marktbeherrschung'), text(' wird nach § 18 GWB im relevanten Markt beurteilt. Die Marktstellung ist von ihrem Missbrauch zu unterscheiden. § 19 erfasst unter Voraussetzungen Ausbeutung, etwa überhöhte Preise, und Behinderung, etwa Verdrängung durch bestimmte Rabattsysteme, ungerechtfertigte Ungleichbehandlung, unangemessene Konditionen und Lieferverweigerung. § 20 erweitert Teile des Schutzes bei relativer oder überlegener Marktmacht. Einstandspreisangebote, Auslistungen und Rabatte erfordern die Prüfung ihrer Voraussetzungen und etwaiger Rechtfertigung.')],
        '§ 21 GWB enthält unter anderem das Boykottverbot, etwa wenn Unternehmen andere zu Liefer- oder Bezugssperren mit dem Ziel unbilliger Beeinträchtigung auffordern. Ob eine vertragliche Exklusivbindung wettbewerbswidrig ist, muss getrennt nach den jeweils einschlägigen Regeln beurteilt werden.',
        'Bei Unternehmenszusammenschlüssen nach §§ 35 ff. GWB sind Aufgreifkriterien, Anmeldung, Zuständigkeit und mögliche erhebliche Behinderung wirksamen Wettbewerbs zu prüfen. Eine Verschmelzung ist nicht automatisch eine verbotene Absprache. Welche Behörde die Prüfung übernimmt, hängt auch von der EU-Fusionskontrolle ab.'),
      section('praxis', 'Praxis: Hersteller und Händlerverkaufspreis',
        'Ein Fahrradhersteller empfiehlt 1.250 €. Die Händler setzen eigenständig unterschiedliche Preise. Droht der Hersteller einem Händler, der 1.099 € verlangt, mit schlechteren Lieferkonditionen, muss die Durchsetzung eines Mindestpreises geprüft werden. Sprechen sich die Händler unabhängig davon auf denselben Mindestpreis ab, kommt zusätzlich eine horizontale Abstimmung in Betracht.'),
      sources('125–127, 132–133, 138–139', 'GWB §§ 1–3, 18–21, 30, 33, 35–41, 81 ff.: ' + gwb,
        'Verordnung (EU) 2022/720, insbesondere Art. 3–5: ' + vertikalGvo,
        'Vertikalleitlinien der EU-Kommission: https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:52022XC0630(01)'),
      question('transfer', 'Transferfrage', 'Ein Hersteller zahlte bisher Werbekostenzuschüsse. Nun erhalten nur Händler den Zuschuss, die seinen empfohlenen Endpreis nicht unterbieten. Was ändert sich?',
        'Der Zuschuss kann aus der Empfehlung einen faktischen Mindestpreis machen. Bei einem selbstständig handelnden Händler ist das eine mögliche Preisbindung der zweiten Hand und regelmäßig eine Kernbeschränkung. Das Unternehmen muss die Kondition stoppen und den Vertriebsvertrag fachlich prüfen.'),
    ],
  },
  {
    id: 'marketing-recht-marken', number: '5.2', title: 'Markenrecht in der Produktpolitik',
    parentId: 'marketing-recht',
    intro: 'Markenschutz hilft, Waren oder Dienstleistungen einer betrieblichen Herkunft zuzuordnen. Kläre früh, welches Zeichen du schützen willst, für welches Angebot und in welchem Gebiet.',
    sections: [
      section('uebersicht', 'Kennzeichen, Gestaltung und Technik',
        [text('Die '), sharedTerm('Marke', 'marketing-t-marke'), text(' kennzeichnet Waren und Dienstleistungen. Geschäftliche Bezeichnungen können ein Unternehmen oder ein Werk kennzeichnen. Geografische Herkunftsangaben weisen auf eine Herkunft aus einem Ort, Gebiet oder Land hin. Für Technik und Produktgestaltung kommen andere Schutzrechte infrage.')],
        'Ein neues Haushaltsgerät kann verschiedene Schutzgegenstände haben: den Produktnamen als Marke, die äußere Gestaltung als Design und eine patentfähige technische Lösung als Patent. Bei technischen Erfindungen kann außerdem ein Gebrauchsmuster infrage kommen. Die jeweiligen Voraussetzungen müssen unabhängig voneinander geprüft werden.',
        [text('Die '), link('Schutzgegenstände', 'marketing-recht-kennzeichen'), text(' und das '), link('Anmeldeverfahren', 'marketing-recht-markenschutz'), text(' beschreiben die nächsten Schritte. Beginne die Recherche vor Verpackungsdruck, Domainkampagne und Händleransprache.')]),
      sources('123, 127–129', 'MarkenG §§ 1, 3–5, 14–15, 126: ' + markenG, 'DesignG: https://www.gesetze-im-internet.de/designg/',
        'PatG: https://www.gesetze-im-internet.de/patg/', 'GebrMG: https://www.gesetze-im-internet.de/gebrmg/'),
      question('transfer', 'Selbstkontrolle', 'Welche Schutzgegenstände kommen bei einem neuen Schloss mit ungewöhnlichem Gehäuse, neuem Mechanismus und Fantasienamen infrage?',
        'Für die äußere Erscheinung kommt Designschutz infrage, für den Mechanismus ein technisches Schutzrecht, für den Namen Markenschutz. Für jedes Recht prüfen wir Schutzvoraussetzungen, Schutzgebiet und ältere Rechte gesondert.'),
    ],
  },
  {
    id: 'marketing-recht-kennzeichen', number: '5.2.1', title: 'Marken, Geschäftsbezeichnungen und Herkunftsangaben',
    parentId: 'marketing-recht-marken',
    intro: 'Ob eine Angabe als Marke, Geschäftsbezeichnung oder geografische Herkunftsangabe einzuordnen ist, hängt davon ab, was sie kennzeichnet und welche Schutzvoraussetzungen vorliegen.',
    sections: [
      section('schutzgegenstaende', 'Was das Markengesetz schützt',
        [text('Eine '), sharedTerm('Marke', 'marketing-t-marke'), text(' kann aus Wörtern, Buchstaben, Zahlen, Bildern, Kombinationen, Klängen, dreidimensionalen Formen oder Farben bestehen. Das Zeichen muss grundsätzlich zur Unterscheidung der Angebote eines Unternehmens geeignet und im Register hinreichend eindeutig darstellbar sein. Ein Wortzeichen und eine konkrete Wort-Bild-Gestaltung können unterschiedliche Schutzbereiche haben.')],
        [text('Eine '), term('geschäftliche Bezeichnung', 'geschaeftliche-bezeichnung'), text(' ist nach § 5 MarkenG ein Unternehmenskennzeichen oder Werktitel. Der Name des Unternehmens oder der Titel einer Zeitschrift kann deshalb auf einer anderen Grundlage geschützt sein als das Zeichen auf einem bestimmten Produkt. Bei Namenswahl auch außerhalb von Markenregistern suchen.')],
        [text('Eine '), term('geografische Herkunftsangabe', 'herkunftsangabe'), text(' benennt die geografische Herkunft. Prüfe § 126 ff. MarkenG und bei spezialgesetzlich geschützten Bezeichnungen die EU-Regeln für den jeweiligen Produktbereich. Ein beliebter Ortsname darf nicht einfach so verwendet werden, als stamme das Angebot von dort.')]),
      section('piraterie', 'Produkt- und Markenpiraterie einordnen',
        'Fälschungen können Umsätze und Vertrauen schädigen. Entscheidend ist, welches Recht betroffen ist: ein verfälschtes Herkunftskennzeichen, ein übernommenes Design oder eine geschützte technische Erfindung. Parallel können mehrere Schutzrechte und das Lauterkeitsrecht relevant sein.',
        'Praxis: Ein Zubehörhändler übernimmt ein fremdes Logo auf Verpackung und Bestellung. Sichere Fotos, Angebot, Händlerangaben und Musterware. Prüfe Kennzeichennutzung, Warenähnlichkeit und Reichweite der Rechte. Bei kompatiblem Zubehör kann eine sachlich erforderliche Benennung im Rahmen des § 23 MarkenG zulässig sein. Mit einer großflächigen Logonutzung kann zusätzlich der unzutreffende Eindruck einer wirtschaftlichen Verbindung entstehen.'),
      sources('127–128', 'MarkenG §§ 1, 3, 5, 8, 14–15, 23, 126–129: ' + markenG,
        'DPMA zur Markenrecherche: ' + dpma),
      question('transfer', 'Transferfrage', 'Ein Unternehmen benutzt den Firmenkurznamen auf Geschäftspapieren und später denselben Namen als Herkunftszeichen auf einem Produkt. Welche Rechte prüfst du?',
        'Für die Firmierung kommt Schutz als Unternehmenskennzeichen in Betracht. Die Verwendung zur betrieblichen Unterscheidung auf der Ware kann Markennutzung sein. Prüfe jeweils Kennzeichnungsfunktion, ältere Rechte und Voraussetzungen der Entstehung. Eine Unternehmensbezeichnung verschafft nicht automatisch eine Registermarke für alle Produktklassen.'),
    ],
  },
  {
    id: 'marketing-recht-markenschutz', number: '5.2.2', title: 'Markenschutz: Entstehung, Anmeldung und Dauer',
    parentId: 'marketing-recht-marken',
    intro: 'Markenschutz kann nach § 4 MarkenG durch Eintragung, durch Benutzung mit Verkehrsgeltung oder aufgrund notorischer Bekanntheit entstehen. Für eine Einführung mit planbaren Schutzgebieten ist die Registeranmeldung meist der praktikable Weg.',
    sections: [
      section('entstehung', 'Drei Wege zum Schutz',
        [term('Registermarke', 'registermarke'), text('. Ein schutzfähiges Zeichen wird für konkret benannte Waren oder Dienstleistungen eingetragen. Auch natürliche Personen können Markeninhaber sein. Für den Zeitrang ist regelmäßig der Anmeldetag oder eine anerkannte Priorität maßgeblich.')],
        [term('Verkehrsgeltung', 'verkehrsgeltung'), text('. Bei einer Benutzungsmarke erkennen beteiligte Verkehrskreise das benutzte Zeichen in ausreichendem Maß als betrieblichen Herkunftshinweis. Werbung und bloße Benutzung allein belegen das nicht. Je nach Nachweis kann die Reichweite regional begrenzt sein. Das Gesetz setzt dafür keinen festen Prozentsatz.')],
        'Notorische Bekanntheit nach der Pariser Verbandsübereinkunft bildet einen eigenen Schutzweg. Sie setzt eine andere Grundlage voraus als die bloße Bekanntheit bei einzelnen Stammkunden. Wer eine neue Marke plant, sollte nicht darauf bauen, einen solchen Bekanntheitsgrad ohne Nachweis geltend machen zu können.'),
      section('anmeldung', 'Recherche und Anmeldung vorbereiten',
        [text('1. Lege Zeichenform, Waren und Dienstleistungen und Zielgebiete fest. Die '), term('Nizza-Klassifikation', 'nizza'), text(' ordnet die Waren und Dienstleistungen in Klassen. Das konkrete Verzeichnis bestimmt den beantragten Schutzumfang.')],
        [text('2. Prüfe '), term('absolute Schutzhindernisse', 'absolute-hindernisse'), text(' wie fehlende Unterscheidungskraft, beschreibende oder übliche Angaben, Täuschungsgefahr, Verstöße gegen öffentliche Ordnung oder Sitten und geschützte Hoheitszeichen. Das Zeichen muss klar und eindeutig darstellbar sein. Eine grafische Darstellung ist heute keine allgemeine Pflicht.')],
        [text('3. Recherchiere '), term('relative Schutzhindernisse', 'relative-hindernisse'), text('. Prüfe ältere Marken, relevante Firmennamen und Werktitel. Ähnlichkeit beurteilt sich unter anderem nach Zeichen, betroffenen Waren und Dienstleistungen sowie Kennzeichnungskraft. Das DPMA prüft ältere Rechte Dritter im Anmeldeverfahren nicht von Amts wegen. Berechtigte Inhaber älterer Rechte können zum Beispiel innerhalb von drei Monaten ab Veröffentlichung der Eintragung Widerspruch einlegen.')],
        '4. Wähle das Gebiet. Das DPMA bearbeitet deutsche Anmeldungen, das EUIPO Unionsmarken. Eine internationale Registrierung über die WIPO nach dem Madrider System erstreckt sich auf benannte Vertragsparteien und unterliegt dortigen Prüfungen. Plane Verzögerungen für Rückfragen oder Verfahren ein. Die Laufzeit des Verfahrens ist kein fester gesetzlicher Zeitwert.'),
      section('erhalt', 'Schutz erhalten und durchsetzen',
        'Bei aktuellen deutschen Anmeldungen beträgt die Schutzdauer zehn Jahre ab Anmeldetag und ist jeweils um weitere zehn Jahre verlängerbar. Die Eintragung wird bei ausbleibender Verlängerung gelöscht. Fehlende ernsthafte Benutzung kann nach den Regeln der §§ 26 und 49 MarkenG zur Nichtdurchsetzbarkeit oder zu einem Verfallsverfahren führen. Prüfe außerdem, ob eine Bezeichnung durch Verhalten oder Untätigkeit des Inhabers gebräuchlich geworden ist oder irreführend verwendet wird.',
        'Sichere Benutzungsbelege für die relevanten Waren, überwache den Markt und neue Eintragungen. Bei einem möglichen Verstoß dokumentierst du Zeitpunkt, Auftritt und Belege. Schutzumfang und Verwechslungsgefahr sind vor der Rechtsdurchsetzung zu prüfen. Mögliche Ansprüche betreffen Unterlassung und bei Verschulden Schadensersatz, daneben unter Voraussetzungen Auskunft, Vernichtung oder Rückruf.'),
      section('praxis', 'Praxis: Kennzeichen vor der Expansion sichern',
        'Ein Getränkeanbieter plant eine Einführung zuerst in Deutschland und später in drei EU-Staaten. Er recherchiert gleich klingende und ähnlich geschriebene Zeichen für Getränke sowie verwandte Waren. Er entscheidet zwischen deutscher Marke und Unionsmarke anhand seines Vertriebsplans und möglicher Konflikte. Er sichert die Nachweise der tatsächlichen Benutzung und hinterlegt die Verlängerungsfrist.'),
      sources('128–129, 133, 138', 'MarkenG §§ 4, 6–9, 14, 19 ff., 26, 42, 47, 49: ' + markenG,
        'DPMA zur Recherche: ' + dpma, 'DPMA zu Schutzdauer und Verlängerung: https://www.dpma.de/schuetzen/marken/markenschutz/neues-seit-mamog/schutzdauer-und-verlaengerung',
        'Unionsmarkenverordnung: https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:32017R1001',
        'WIPO, Madrid-System: https://www.wipo.int/madrid/en/'),
      question('transfer', 'Transferfrage', 'Ein Unternehmen nutzt seit drei Monaten ein Fantasiewort in einer Stadt und plant eine EU-weite Offensive. Was klärt es vor dem Verpackungsdruck?',
        'Zuerst eindeutige Darstellbarkeit, Kennzeichnungskraft, relevante ältere Rechte und Warenverzeichnis prüfen. Drei Monate örtliche Nutzung belegen für sich keine Verkehrsgeltung und keinen EU-weiten Schutz. Für das geplante Gebiet die sinnvolle Anmeldung wählen und die Möglichkeit von Prüfungs- oder Widerspruchsverfahren berücksichtigen.'),
    ],
  },
  {
    id: 'marketing-recht-verbraucherschutz', number: '5.3', title: 'Verbraucherschutz im Marketing',
    parentId: 'marketing-recht',
    intro: 'Verbraucherschutz stärkt informierte Entscheidungen, wirtschaftliche Interessen sowie Gesundheit und Sicherheit. Für den Vertrieb bedeutet das, Preise, Produktangaben, Vertragsbedingungen und die Abwicklung nach dem Kauf gemeinsam zu prüfen.',
    sections: [
      section('rollen', 'Verbraucher und Unternehmer unterscheiden',
        [text('Ein '), term('Verbraucher', 'verbraucher'), text(' ist eine natürliche Person, die überwiegend zu privaten Zwecken handelt. Ein Unternehmer handelt bei Vertragsschluss in Ausübung seiner gewerblichen oder selbstständigen beruflichen Tätigkeit. Dieselbe Person kann privat einen Kühlschrank und beruflich einen Bürorechner kaufen. Entscheidend ist die konkrete Zweckrichtung.')],
        'Verbraucherpolitik verbindet Information, Beratung und Bildung mit Marktaufsicht, Verbraucherorganisationen und verbindlichen Anforderungen. Sie betrifft einerseits den Umgang mit risikobehafteten Produkten, andererseits das Verhalten der Anbieter. Verbraucherzentralen beraten, unabhängige Testorganisationen liefern Vergleichsinformationen. Freiwillige Werbeselbstkontrolle oder technische Normen können Orientierung bieten. Zwingende gesetzliche Anforderungen sind separat zu prüfen.'),
      section('anwendung', 'Rechte nach Situation einordnen',
        [text('Bei einem Sachmangel prüfst du den '), link('Verbrauchsgüterkauf', 'marketing-recht-verbrauchsgueterkauf'), text('. Will ein Kunde sich von einem fehlerfreien Onlinekauf lösen, prüfst du das '), link('Widerrufsrecht', 'marketing-recht-widerruf'), text('. Bei einer vorformulierten Haftungsklausel prüfst du die '), link('AGB', 'marketing-recht-agb'), text('.')],
        'Für das Marketing heißt das: prüfbare Produktinformationen, Gesamt- und gegebenenfalls Grundpreise angeben, Pflichtinformationen vor Vertragsschluss bereitstellen und Kundendienste auf Widerruf, Mangel oder freiwillige Rücknahme schulen. Die im Buch genannte historische Bezeichnung Fernabsatzgesetz verweist heute auf die entsprechenden Vorschriften im BGB und EGBGB.'),
      sources('129–132', 'BGB §§ 13–14, 305–310, 312 ff. und 474 ff.: ' + bgb, 'EGBGB Art. 246a: https://www.gesetze-im-internet.de/bgbeg/', 'PAngV: ' + pangv),
      question('transfer', 'Selbstkontrolle', 'Ein privat online gekaufter Wasserkocher funktioniert, hat aber die falsche Farbe geliefert bekommen. Welche Prüfpfade kommen infrage?',
        'Die Abweichung von der vereinbarten Farbe kann ein Sachmangel sein. Daneben kann beim Fernabsatz ein Widerrufsrecht bestehen. Voraussetzungen, Fristen und Rechtsfolgen werden getrennt geprüft.'),
    ],
  },
  {
    id: 'marketing-recht-verbrauchsgueterkauf', number: '5.3.1', title: 'Verbrauchsgüterkauf: Mängelrechte und Garantie',
    parentId: 'marketing-recht-verbraucherschutz',
    intro: 'Ein Verbrauchsgüterkauf liegt nach § 474 BGB vor, wenn ein Verbraucher von einem Unternehmer eine Ware kauft. Ein Vertrag, der neben dem Verkauf der Ware auch eine Dienstleistung umfasst, kann dazugehören. Reine Dienstleistungen sind davon zu unterscheiden.',
    sections: [
      section('mangel', 'Ansprüche bei Mängeln',
        [text('Beginne bei den Kaufpflichten und den Anforderungen an die Ware (§§ 433–434 BGB). Ein Sachmangel kann vorliegen, wenn zugesicherte oder objektiv erwartbare Eigenschaften fehlen, die Sache für ihren Zweck ungeeignet ist oder fehlerhaft montiert wurde. Zu Beginn steht regelmäßig die '), term('Nacherfüllung', 'nacherfuellung'), text(' durch Reparatur oder Ersatzlieferung. Der Käufer hat grundsätzlich ein Wahlrecht, vorbehaltlich insbesondere der gesetzlichen Verweigerungsrechte bei unverhältnismäßigen Kosten.')],
        'Bei Ausbleiben, Verweigerung, Fehlschlagen oder besonders schwerwiegendem Mangel prüfst du je nach Fall Rücktritt, Minderung oder Schadensersatz. § 475d nennt Fälle, in denen beim Verbrauchsgüterkauf keine gesonderte Fristsetzung erforderlich ist. Bei Waren mit digitalen Elementen sind insbesondere Bereitstellung, vereinbarte Funktionen und erforderliche Aktualisierungen nach §§ 475b und 475c mitzudenken.'),
      section('fristen', 'Verjährung, Vermutung und Garantie getrennt prüfen',
        [text('Für bewegliche Sachen gilt für Mängelansprüche regelmäßig eine zweijährige Verjährungsfrist ab Ablieferung (§ 438 BGB). Bei gebrauchten Waren kann sie nur unter den Anforderungen des § 476 Abs. 2 auf mindestens ein Jahr verkürzt werden. Dazu gehören eine eigene Vorabinformation und eine ausdrückliche gesonderte Vereinbarung. § 475e regelt besondere Ablaufgrenzen, etwa nach Sichtbarwerden eines Mangels kurz vor Fristende und nach Rückgabe nach einer Nacherfüllung.')],
        [text('Die '), term('Beweislastumkehr', 'beweislastumkehr'), text(' nach § 477 BGB ist eine widerlegbare Vermutung. Zeigt sich innerhalb eines Jahres ab Gefahrübergang ein abweichender Zustand, wird ein anfänglicher Mangel vermutet, soweit die Vermutung mit Ware und Zustand vereinbar ist. Bei lebenden Tieren sind es sechs Monate. Für dauerhaft bereitgestellte digitale Elemente gilt eine Sonderregel. Eine Garantie entsteht aus dieser Vermutung nicht.')],
        [text('Eine '), sharedTerm('Garantie', 'marketing-t-garantie'), text(' beruht auf einem zusätzlichen Versprechen des Garantiegebers. Die gesetzlichen Mängelrechte bleiben bestehen. § 479 BGB verlangt unter anderem eine verständliche Erklärung, Angaben zu Garantiegeber, Verfahren, Ware, Dauer und räumlicher Reichweite sowie den Hinweis auf die gesetzlichen Rechte. Die Erklärung ist spätestens bei Lieferung auf einem dauerhaften Datenträger bereitzustellen.')]),
      section('versand', 'Versandrisiko und Rückgriff',
        'Beim typischen Versand durch den Händler trägt er das Risiko gegenüber dem Verbraucher grundsätzlich bis zur Übergabe der Ware. § 475 Abs. 2 BGB enthält eine Ausnahme, wenn der Verbraucher eigenständig einen vom Unternehmer nicht zuvor benannten Transporteur beauftragt. Interne Ersatzfragen mit dem Paketdienst ändern die Pflichten gegenüber dem Kunden nicht.',
        'Hat ein Händler bei einer neu hergestellten Sache Nacherfüllungsaufwand getragen, kommt Lieferantenrückgriff in Betracht, etwa für Transport, Arbeitszeit und Material. Prüfe §§ 445a, 445b und 478 BGB, den Zustand bei Übergabe in der Lieferkette sowie bei digitalen Elementen die Aktualisierungspflichten.'),
      section('praxis', 'Praxis: Gerät fällt nach neun Monaten aus',
        'Ein neuer Luftreiniger, privat beim Händler gekauft, fällt nach neun Monaten beim bestimmungsgemäßen Gebrauch aus. Ein gesetzlicher Mangelanspruch richtet sich grundsätzlich gegen den Verkäufer. Der Zeitpunkt spricht für die Vermutung des § 477, sofern sie mit Art der Ware und Zustand vereinbar ist. Der Händler prüft die Ursache und den Nacherfüllungsweg. Eine abgelaufene freiwillige Zusatzgarantie beendet diesen gesetzlichen Prüfpfad nicht.'),
      sources('130', 'BGB §§ 433–439, 443, 445a–445b und 474–479: ' + bgb),
      question('transfer', 'Transferfrage', 'Eine gebrauchte Waschmaschine wird privat bei einem Händler gekauft. Im elften Monat tritt ein Fehler auf. Eine Verkürzung auf ein Jahr steht nur im üblichen AGB-Text. Welche zwei Fragen sind zu trennen?',
        'Erstens prüfen, ob die Verjährungsverkürzung nach § 476 Abs. 2 mit eigener Vorabinformation und ausdrücklicher, gesonderter Vereinbarung wirksam zustande kam. Zweitens die Vermutung des § 477 prüfen, weil sich der abweichende Zustand noch im ersten Jahr seit Gefahrübergang zeigt. Die Vermutungsdauer ist von der Verjährungsfrist zu unterscheiden.'),
    ],
  },
  {
    id: 'marketing-recht-widerruf', number: '5.3.2', title: 'Widerrufsrecht bei Verbraucherverträgen',
    parentId: 'marketing-recht-verbraucherschutz',
    intro: 'Das gesetzliche Widerrufsrecht ermöglicht unter bestimmten Umständen, sich ohne Begründung vom Vertrag zu lösen. Prüfe in der Reihenfolge Vertragstyp, Ausnahmen, Information, Frist, Erklärung und Rückabwicklung.',
    sections: [
      section('anspruch', 'Wann ein gesetzliches Widerrufsrecht besteht',
        [text('Bei '), term('Fernabsatzverträgen', 'fernabsatz'), text(' und außerhalb von Geschäftsräumen geschlossenen Verträgen gewährt § 312g BGB grundsätzlich ein '), term('Widerrufsrecht', 'widerruf'), text('. Ein normaler Ladenkauf eröffnet allein keinen gesetzlichen Widerruf. Ein Händler kann freiwillig Umtausch oder Rücknahme anbieten. Prüfe die Ausnahmen des § 312g Abs. 2, etwa eindeutig personalisierte Waren, schnell verderbliche Waren oder bestimmte versiegelte Hygieneartikel nach Entfernung der Versiegelung.')],
        'Der Fristbeginn hängt vom Vertragstyp ab. Im typischen Fernabsatz-Warenkauf zählt der Erhalt durch den Verbraucher oder benannten Dritten, der nicht Beförderer ist. Bei einer einheitlichen Bestellung mehrerer getrennt gelieferter Waren zählt regelmäßig die letzte Ware. Bei einer Dienstleistung ist im Grundsatz der Vertragsschluss maßgeblich. Ein vorzeitiges Erlöschen bei Dienstleistungen oder digitalen Inhalten setzt nach § 356 Abs. 5–6 weitere Bedingungen voraus.'),
      section('erklaerung', 'Belehrung, Frist und Erklärung',
        'Die regelmäßige Frist beträgt 14 Tage. Sie beginnt nicht vor ordnungsgemäßer Widerrufsinformation. Die besondere Höchstfrist des § 356 Abs. 4 beträgt im Regelfall zwölf Monate und 14 Tage ab dem jeweils einschlägigen Ausgangsereignis, bei Waren also gegebenenfalls ab Erhalt. Finanzdienstleistungen haben Sonderregeln, auch zur Belehrung und Rückabwicklung.',
        'Der Widerruf ist eine eindeutige Erklärung gegenüber dem Unternehmer. Das Musterformular ist freiwillig und ein Grund ist nicht erforderlich. Die rechtzeitige Absendung genügt. Eine kommentarlos zurückgeschickte Ware allein ist keine verlässliche Widerrufserklärung.'),
      section('online', 'Elektronische Widerrufsfunktion seit Juni 2026',
        'Für über eine Online-Benutzeroberfläche geschlossene Fernabsatzverträge muss der Unternehmer im Anwendungsbereich des § 356a BGB während der Widerrufsfrist eine leicht zugängliche, hervorgehobene und ständig verfügbare Widerrufsfunktion anbieten. Sie muss eindeutig beschriftet sein, etwa mit „Vertrag widerrufen“.',
        'Der Verbraucher muss Name, Vertragsbezug und einen elektronischen Kontakt für die Bestätigung angeben oder bestätigen können. Ein zweiter, eindeutig beschrifteter Schritt versendet die Erklärung. Der Anbieter bestätigt den Eingang unverzüglich auf einem dauerhaften Datenträger mit Inhalt, Datum und Uhrzeit. Die Funktion ist vom Kündigungsbutton für bestimmte Dauerschuldverhältnisse nach § 312k BGB zu unterscheiden.'),
      section('rueckabwicklung', 'Rücksendung und Rückzahlung',
        'Bei gewöhnlichen Fernabsatz-Warenkäufen werden die Leistungen grundsätzlich spätestens nach 14 Tagen zurückgewährt. Für die Rückzahlung zählt der Zugang der Erklärung beim Unternehmer, für die Rückgabe deren Abgabe. Der Unternehmer erstattet auch die Kosten seiner günstigsten Standardlieferung. Den Aufpreis einer gewählten Expresszustellung muss er nicht erstatten. Bis zum Wareneingang oder zum Nachweis der Absendung kann er die Zahlung regelmäßig zurückhalten, außer er hat Abholung angeboten.',
        'Unmittelbare Rücksendekosten trägt der Verbraucher, wenn der Unternehmer ihn ordnungsgemäß darüber informiert hat und sie nicht freiwillig übernimmt. Wertersatz kommt unter Voraussetzungen bei einer Nutzung in Betracht, die über die Prüfung von Eigenschaften und Funktion hinausgeht. Bei nicht postalisch rücksendbarer Ware, die bei einem Außergeschäftsraumvertrag bereits zum Vertragsschluss nach Hause gebracht wurde, kann eine Abholpflicht auf Kosten des Unternehmers greifen.'),
      section('rechnung', 'Praxis: Frist und Rückzahlung berechnen',
        'Eine Kundin erhält am Montag, dem 2. November 2026, einen online bestellten Kopfhörer. Die ordnungsgemäße Belehrung liegt vor. Der Ereignistag zählt nicht mit. Tag 1 ist Dienstag, der 3. November. Tag 14 ist Montag, der 16. November. Sie nutzt am 16. November die elektronische Widerrufsfunktion. Die Frist ist eingehalten.',
        'Die Ware kostet 100 €. Der Standardversand kostet 4 €, die gewählte Expresslieferung 12 €. Der Händler erstattet im Beispiel 100 € plus 4 €, also 104 €. Den Expressaufschlag von 8 € erstattet er nicht. Davon getrennt prüfst du, wer die Rücksendekosten trägt.'),
      sources('131', 'BGB §§ 187–193, 312b–312g, 312k, 355–357a: ' + bgb,
        'Elektronische Widerrufsfunktion: ' + widerrufsfunktion,
        'BGBl. I 2026 Nr. 28: https://eur-lex.europa.eu/legal-content/DE/TXT/PDF/?uri=CELEX:72024L0825DEU_202602019'),
      question('transfer', 'Transferfrage', 'Ein Laptop und ein Ladekabel aus einer einheitlichen Onlinebestellung treffen am Dienstag und am folgenden Donnerstag getrennt ein. Der Laptop ist unbeschädigt. Wann setzt du bei ordnungsgemäßer Belehrung die Frist an?',
        'Bei einer einheitlichen Bestellung mehrerer getrennt gelieferter Waren zählt grundsätzlich der Erhalt der letzten Ware am Donnerstag. Im Regelfall beginnt die 14-Tage-Berechnung am Freitag. Ein Defekt ist für den Widerruf nicht erforderlich. Die Erklärung muss eindeutig und fristgerecht abgesandt sein.'),
    ],
  },
  {
    id: 'marketing-recht-agb', number: '5.3.3', title: 'AGB: Einbeziehung und Inhaltskontrolle',
    parentId: 'marketing-recht-verbraucherschutz',
    intro: 'Vorformulierte Vertragsbedingungen können Standardabläufe regeln. Ob sie gelten und ob eine bestimmte Klausel wirksam ist, sind zwei getrennte Fragen.',
    sections: [
      section('definition', 'AGB und Individualvereinbarung unterscheiden',
        [text('Allgemeine Geschäftsbedingungen ('), term('AGB', 'agb'), text(') sind für eine Vielzahl von Verträgen vorformulierte Vertragsbedingungen, die eine Partei der anderen bei Vertragsschluss stellt. Die Platzierung im Vertrag ändert daran nichts. Wirklich im Einzelnen ausgehandelte Bedingungen fallen nicht darunter. Eine Individualabrede hat nach § 305b BGB Vorrang. Bei Verbraucherverträgen kann § 310 Abs. 3 die Kontrolle auf vorformulierte Einmalbedingungen erstrecken.')],
        'Typische Regelungsbereiche sind Lieferung, Zahlung und Haftung. Prüfe, ob eine Bestimmung tatsächlich individuell ausgehandelt wurde. Die Unterschrift unter einem Standardformular allein genügt dafür nicht.'),
      section('einbeziehung', 'Einbeziehung in den Vertrag',
        [text('Für die '), term('Einbeziehung', 'einbeziehung'), text(' im Verbrauchergeschäft sind grundsätzlich ein rechtzeitiger Hinweis, eine zumutbare Möglichkeit der Kenntnisnahme und das Einverständnis der Gegenseite erforderlich. In besonderen Konstellationen kann ein deutlich sichtbarer Aushang genügen. Im Onlinekauf müssen die Bedingungen vor der Bestellung tatsächlich erreichbar sein. Ein erstmaliger Hinweis auf der Rechnung ist für den bereits geschlossenen Vertrag zu spät.')],
        'Überraschende Klauseln werden nach § 305c Abs. 1 nicht Vertragsbestandteil. Auslegungszweifel gehen zulasten des Verwenders. Bei Verträgen zwischen Unternehmen gelten Besonderheiten nach § 310 BGB. Die verbraucherspezifischen Regeln lassen sich nicht unverändert übertragen.'),
      section('kontrolle', 'Wirksamkeit der Klausel',
        [text('Die '), term('Inhaltskontrolle', 'inhaltskontrolle'), text(' beurteilt, ob eine einbezogene Regelung die Gegenseite etwa durch Intransparenz oder eine Abweichung von wesentlichen gesetzlichen Grundgedanken unangemessen benachteiligt (§ 307 BGB). § 308 erfasst Verbote mit Wertungsmöglichkeit, § 309 Verbote ohne Wertungsmöglichkeit im jeweiligen Anwendungsbereich. Zwingende Sonderregeln wie § 476 BGB sind zusätzlich zu beachten.')],
        'Eine unwirksame oder nicht einbezogene Klausel fällt grundsätzlich weg. Der übrige Vertrag bleibt regelmäßig bestehen und an der Stelle der Klausel gilt das Gesetz (§ 306 BGB). Die Klausel wird nicht einfach in die mildeste noch zulässige Form umgeschrieben.'),
      section('praxis', 'Praxis: Die Lieferklausel im Shop',
        'Ein Onlinehändler verweist vor der Bestellung gut sichtbar auf die AGB. Die Kundin kann sie lesen und stimmt zu. Damit ist die allgemeine Einbeziehung plausibel. Die Klausel „Bei Neuware sind Mängelansprüche vollständig ausgeschlossen“ ist getrennt zu prüfen und scheitert im Verbrauchsgüterkauf an zwingenden Regeln. Die Kundin kann sich auf die gesetzlichen Vorschriften stützen.'),
      sources('131–132', 'BGB §§ 305–310, 474–479: ' + bgb),
      question('transfer', 'Transferfrage', 'Im Webshop erscheint der AGB-Link erstmals in der Bestellbestätigung nach Vertragsschluss. Eine Klausel verlagert außerdem das Versandrisiko auf den privaten Käufer. Wie prüfst du?',
        'Zunächst fehlt im Fall die rechtzeitige Einbeziehung. Die Verlagerung des Versandrisikos wäre selbst bei rechtzeitiger Einbeziehung am zwingenden Recht des Verbrauchsgüterkaufs zu messen. Beim üblichen Versand durch einen vom Händler eingesetzten Transporteur trägt der Händler das Risiko bis zur Übergabe.'),
    ],
  },
  {
    id: 'marketing-recht-fall', number: '5.4', title: 'Übungsfall: Marke, Werbung und Händlervertrag',
    parentId: 'marketing-recht',
    intro: 'Ein Hersteller von Outdoor-Trinkflaschen führt eine neue Serie ein. Die Serie soll zuerst regional und danach über selbstständige Händler bundesweit verkauft werden. Zusätzlich betreibt das Unternehmen einen Shop für Privatkunden.',
    sections: [
      section('ausgangslage', 'Ausgangslage und Auftrag',
        'Die Marketingabteilung plant einen Fantasienamen mit eigenem Logo. Eine Pilotserie wurde bisher nur auf zwei lokalen Veranstaltungen verkauft. Der Vertrieb möchte Händlern Mindestpreise vorgeben und mit einem regionalen Konkurrenten Gebiete aufteilen. Im Shop sind ein unbelegtes Prüfsiegel und ein erfundener Countdown geplant. Die AGB sollen erstmals auf der bezahlten Rechnung erscheinen. Der Verbrauchershop soll keine elektronische Widerrufsfunktion anbieten.',
        'Begründe praktisch, welche Maßnahmen du stoppst, welche du anhand weiterer Tatsachen prüfst und wie du sie rechtmäßig gestalten kannst. Gehe je Punkt von Rechtsgebiet, Anforderung, Sachverhalt und Ergebnis aus.'),
      question('markenaufgabe', 'Aufgabe 1 – Schutz der Marke', 'Erkläre den Nutzen des Markenschutzes und beurteile Eintragung und Verkehrsgeltung für diesen Start.',
        'Die Marke schafft einen wiedererkennbaren Herkunftshinweis und schützt die Investition in den Namen und das Logo im jeweiligen Schutzumfang. Das Unternehmen sollte Zeichenähnlichkeit, Warenverzeichnis, absolute Schutzhindernisse und Schutzgebiet prüfen und eine Registeranmeldung erwägen. Die beiden Veranstaltungen allein belegen keine Verkehrsgeltung. Ohne Eintragung müsste das Unternehmen belegen, dass beteiligte Verkehrskreise das Zeichen als Herkunftshinweis erkennen. Reichweite und Nachweis wären gesondert zu prüfen.'),
      question('wettbewerbsaufgabe', 'Aufgabe 2 – UWG und GWB', 'Ordne je zwei Maßnahmen UWG und GWB zu und begründe die Einordnung.',
        'UWG: Das ungenehmigte Prüfsiegel und der falsche Zeitdruck können im Verbrauchergeschäft Einträge der Schwarzen Liste erfüllen. GWB: Die horizontale Gebietsteilung mit einem Konkurrenten beschränkt unabhängigen Wettbewerb. Verbindliche Mindestpreise im Verhältnis zu selbstständigen Händlern sind eine vertikale Preisbindung und regelmäßig eine Kernbeschränkung. Ein tatsächlich unverbindlicher Richtpreis und eigenständig geplante Vertriebsgebiete wären gesondert zu beurteilen.'),
      question('shopaufgabe', 'Aufgabe 3 – Shop und Vertragsabwicklung', 'Was ändert das Unternehmen im Shop vor der Freigabe?',
        'Die AGB sind vor Vertragsschluss zugänglich zu machen, mit erkennbarem Hinweis und wirksamer Einbeziehung. Jede Klausel ist gesondert zu prüfen. Bei widerrufsfähigen Fernabsatzverträgen muss der Shop ordnungsgemäß über den Widerruf informieren und die zweistufige elektronische Widerrufsfunktion bereitstellen. Der Betrieb muss Eingang und Rückabwicklung organisatorisch absichern.'),
      section('weiterlernen', 'Die Regeln zum Nachschlagen',
        [link('Kennzeichenanmeldung', 'marketing-recht-markenschutz'), text(' · '), link('UWG', 'marketing-recht-uwg'), text(' · '), link('GWB', 'marketing-recht-gwb'), text(' · '),
          link('Widerruf', 'marketing-recht-widerruf'), text(' · '), link('AGB', 'marketing-recht-agb')]),
      sources('132–133, 138–139', 'MarkenG: ' + markenG, 'UWG: ' + uwg, 'GWB: ' + gwb,
        'Vertikal-GVO: ' + vertikalGvo, 'BGB: ' + bgb),
      question('transfer', 'Transferfrage', 'Ein Anbieter will die gleichen Flaschen nur national an Unternehmen verkaufen. Welche Prüfungen bleiben und welche Käuferrolle entfällt im reinen B2B-Fall?',
        'Marken- und Kartellrecht bleiben einschlägig. Das UWG schützt auch Mitbewerber und andere Marktteilnehmer, auch wenn bestimmte Tatbestände speziell Verbraucher schützen. Die typischen B2C-Regeln zum Verbrauchsgüterkauf und Widerruf greifen bei reinen Unternehmerkäufen nicht. AGB-Regeln bleiben mit Besonderheiten nach § 310 BGB relevant.'),
    ],
  },
];

export const chapters: Chapter[] = topics.map(({ id, number, title, parentId }) => ({
  id, subjectId, number, title, parentId, articleId: id,
}));

export const articles: Article[] = topics.map(({ id, number, title, intro, sections }) => ({
  id, subjectId, chapterId: id, number, title, intro, sections, updatedAt, version: 1,
}));

const definitions: [string, string, string, string][] = [
  ['uwg', 'UWG', 'Das Gesetz gegen den unlauteren Wettbewerb schützt vor unlauteren geschäftlichen Handlungen und sichert unverfälschten Wettbewerb.', 'wettbewerb'],
  ['gwb', 'GWB', 'Das Gesetz gegen Wettbewerbsbeschränkungen regelt unter anderem Kartellverbot, Missbrauchsaufsicht und Zusammenschlusskontrolle.', 'wettbewerb'],
  ['schwarze-liste', 'Schwarze Liste des UWG', 'Im Anhang des UWG aufgezählte geschäftliche Handlungen, die bei Vorliegen ihrer Voraussetzungen gegenüber Verbrauchern stets unzulässig sind.', 'uwg'],
  ['irrefuehrung', 'Irreführung', 'Täuschende geschäftliche Handlung durch falsche oder zur Täuschung geeignete Angaben oder durch Vorenthalten wesentlicher Informationen.', 'uwg'],
  ['vergleichswerbung', 'Vergleichende Werbung', 'Werbung, in der ein Mitbewerber oder dessen Angebot unmittelbar oder mittelbar erkennbar ist.', 'uwg'],
  ['opt-in', 'Opt-in', 'Vorherige ausdrückliche Zustimmung einer angesprochenen Person, etwa für Werbe-E-Mails.', 'uwg'],
  ['kartell', 'Kartell', 'Wettbewerbsbeschränkende Koordinierung zwischen Unternehmen, zum Beispiel über Preise, Mengen oder Absatzgebiete.', 'gwb'],
  ['preisbindung', 'Preisbindung der zweiten Hand', 'Vorgabe oder Durchsetzung eines festen oder Mindestverkaufspreises gegenüber einem selbstständigen Wiederverkäufer.', 'gwb'],
  ['uvp', 'Unverbindliche Preisempfehlung', 'Preisvorschlag für den Wiederverkauf, von dem Händler ohne Druck oder Sanktionsrisiko abweichen können.', 'gwb'],
  ['freistellung', 'Kartellrechtliche Freistellung', 'Ausnahme vom Verbot wettbewerbsbeschränkender Vereinbarungen unter bestimmten Voraussetzungen, etwa Effizienzvorteilen mit angemessener Verbraucherbeteiligung.', 'gwb'],
  ['marktbeherrschung', 'Marktbeherrschende Stellung', 'Eine Stellung in einem sachlich und räumlich relevanten Markt, die nach den Kriterien des § 18 GWB eine überragende Marktstellung oder fehlenden beziehungsweise unwesentlichen Wettbewerb begründet.', 'gwb'],
  ['geschaeftliche-bezeichnung', 'Geschäftliche Bezeichnung', 'Unternehmenskennzeichen oder Werktitel, der nach § 5 MarkenG geschützt sein kann.', 'kennzeichen'],
  ['herkunftsangabe', 'Geografische Herkunftsangabe', 'Angabe, die Waren oder Dienstleistungen als aus einer bestimmten geografischen Gegend stammend bezeichnet.', 'kennzeichen'],
  ['registermarke', 'Registermarke', 'Marke, deren Schutz durch Eintragung im zuständigen Markenregister entsteht.', 'markenschutz'],
  ['verkehrsgeltung', 'Verkehrsgeltung', 'Anerkennung eines benutzten Zeichens als betrieblicher Herkunftshinweis durch einen ausreichenden Teil der beteiligten Verkehrskreise.', 'markenschutz'],
  ['nizza', 'Nizza-Klassifikation', 'Internationales Klassifikationssystem für die Waren und Dienstleistungen, für die eine Marke angemeldet wird.', 'markenschutz'],
  ['absolute-hindernisse', 'Absolute Schutzhindernisse', 'Hindernisse der Eintragung aufgrund der Beschaffenheit des Zeichens, etwa fehlende Unterscheidungskraft oder rein beschreibende Angaben.', 'markenschutz'],
  ['relative-hindernisse', 'Relative Schutzhindernisse', 'Ältere Kennzeichenrechte, die der jüngeren Marke aufgrund eines rechtlichen Konflikts entgegenstehen können.', 'markenschutz'],
  ['verbraucher', 'Verbraucher', 'Natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbstständigen beruflichen Tätigkeit zuzurechnen sind.', 'verbraucherschutz'],
  ['nacherfuellung', 'Nacherfüllung', 'Behebung eines Mangels oder Ersatzlieferung als erste Stufe der kaufrechtlichen Mängelrechte.', 'verbrauchsgueterkauf'],
  ['beweislastumkehr', 'Beweislastumkehr beim Verbrauchsgüterkauf', 'Widerlegbare Vermutung eines bereits beim Gefahrübergang vorliegenden Mangels, wenn sich innerhalb der gesetzlichen Vermutungsdauer ein abweichender Zustand zeigt.', 'verbrauchsgueterkauf'],
  ['fernabsatz', 'Fernabsatzvertrag', 'Vertrag zwischen Unternehmer und Verbraucher, bei dem für Verhandlungen und Abschluss ausschließlich Fernkommunikationsmittel verwendet werden und der innerhalb eines dafür organisierten Systems geschlossen wird.', 'widerruf'],
  ['widerruf', 'Widerrufsrecht', 'Gesetzlich eingeräumte Möglichkeit, sich durch eine eindeutige fristgerechte Erklärung ohne Begründung von seiner Vertragserklärung zu lösen.', 'widerruf'],
  ['agb', 'Allgemeine Geschäftsbedingungen', 'Von einer Vertragspartei gestellte, für eine Vielzahl von Verträgen vorformulierte Vertragsbedingungen.', 'agb'],
  ['einbeziehung', 'Einbeziehung von AGB', 'Vorgang, durch den AGB unter den gesetzlichen Voraussetzungen zum Bestandteil eines bestimmten Vertrags werden.', 'agb'],
  ['inhaltskontrolle', 'Inhaltskontrolle von AGB', 'Prüfung, ob eine vorformulierte Klausel nach den gesetzlichen Maßstäben wirksam ist, insbesondere ob sie transparent und ohne unangemessene Benachteiligung ist.', 'agb'],
];

export const glossary: GlossaryTerm[] = definitions.map(([id, term, definition, article]) => ({
  id: 'marketing-recht-begriff-' + id,
  subjectId,
  term,
  definition,
  articleId: 'marketing-recht-' + article,
}));
