import type { Article, ArticleSection, Chapter, GlossaryTerm, RichText } from '../types';

const subjectId = 'recht';
const stamp = Date.UTC(2026, 10, 18);
const bgb = 'https://www.gesetze-im-internet.de/bgb/';
const hgb = 'https://www.gesetze-im-internet.de/hgb/';
const inso = 'https://www.gesetze-im-internet.de/inso/';

const statutes: Record<string, string[]> = {
  zahlungsverzug: [`BGB §§ 187–193, 271, 271a, 286, 320, 614 und 641 · ${bgb}`],
  verzugszinsen: [`BGB §§ 247, 280, 286 und 288 · ${bgb}`, 'Basiszinssatz · https://www.bundesbank.de/de/bundesbank/organisation/agb-und-regelungen/basiszinssatz-607820'],
  unmoeglichkeit: [`BGB §§ 91, 243, 275, 280, 283–285, 311a und 326 · ${bgb}`],
  'schadensersatz-vertrag-delikt': [`BGB §§ 241, 249, 252, 276, 278, 280, 823 und 828–832 · ${bgb}`],
  'besitz-eigentum': [`BGB §§ 93–95, 854–868, 903, 929–931, 946–951, 959, 985 und 986 · ${bgb}`],
  eigentumsvorbehalt: [`BGB §§ 158, 185, 323, 346, 349, 398, 449, 929, 985 und 986 · ${bgb}`],
  'gutglaeubiger-erwerb': [`BGB §§ 929–935, 985 und 986 · ${bgb}`],
  grundstueckskauf: [`BGB §§ 117, 125, 311b, 873 und 925 · ${bgb}`, 'BGH vom 15. März 2024, V ZR 115/22'],
  kreditsicherheiten: [`BGB §§ 398, 449, 868, 929–931, 1113, 1191, 1204 und 1205 · ${bgb}`],
  buergschaft: [`BGB §§ 765–773 · ${bgb}`, `HGB § 350 · ${hgb}`],
  'vorvertragliches-schuldverhaeltnis': [`BGB §§ 241, 280, 311 und 823 · ${bgb}`],
  insolvenzgruende: [`InsO §§ 1, 15a, 17, 18 und 19 · ${inso}`],
  insolvenzverfahren: [`InsO §§ 2, 3, 13, 14, 21, 26–27, 35, 38, 39, 53–55, 87–89, 94–96, 174–178 und 187 ff. · ${inso}`],
  'aus-absonderung': [`InsO §§ 47–52, 103, 107 und 165 ff. · ${inso}`, `BGB §§ 598, 604, 985 und 986 · ${bgb}`],
  'handelsgeschaeft-einstieg': [`HGB §§ 343, 344, 353 und 377 · ${hgb}`],
  'maengelruege-kurzfall': [`HGB § 377 · ${hgb}`, `BGB §§ 437 ff. · ${bgb}`],
};
const term = (text: string, id: string): RichText => ({ text, termId: `recht-${id}` });
const link = (text: string, id: string): RichText => ({ text, articleId: `recht-${id}` });
const p = (...parts: (string | RichText)[]): RichText[] =>
  parts.map((part) => typeof part === 'string' ? { text: part } : part);

function section(id: string, title: string, ...paragraphs: (string | RichText[])[]): ArticleSection {
  return { id, title, paragraphs: paragraphs.map((paragraph) => typeof paragraph === 'string' ? p(paragraph) : paragraph) };
}

function practice(id: string, title: string, scenario: string, solution: string): ArticleSection {
  return {
    ...section(id, title, scenario),
    hint: { label: 'Selbstkontrolle', title: 'Musterantwort', content: solution },
  };
}

export const chapters: Chapter[] = [];
export const articles: Article[] = [];
export const glossary: GlossaryTerm[] = [];

function article(
  key: string, number: string, title: string, intro: string, sections: ArticleSection[],
  terms: [key: string, term: string, definition: string, example?: string][] = [],
) {
  const id = `recht-${key}`;
  const parentNumber = number.slice(0, number.lastIndexOf('.'));
  const parent = chapters.find((chapter) => chapter.number === parentNumber);
  chapters.push({ id, subjectId, parentId: parent?.id, number, title, articleId: id });
  const sources = statutes[key];
  const articleSections = sources
    ? [...sections, section('rechtsgrundlagen', 'Rechtsgrundlagen', 'Stand 18. November 2026', ...sources)]
    : sections;
  articles.push({ id, subjectId, chapterId: id, number, title, intro, sections: articleSections, updatedAt: stamp, version: 1 });
  glossary.push(...terms.map(([termKey, termName, definition, example]) =>
    ({ id: `recht-${termKey}`, subjectId, term: termName, definition, example, articleId: id })));
}

article('schuld-sachen-insolvenz', '4', 'Leistungsstörungen, Sachenrecht und Insolvenz',
  'Was ein Vertragspartner verlangen kann, wem eine Sache gehört und wer im Insolvenzverfahren auf sie zugreifen darf, sind drei eigene Prüfungsschritte.',
  [
    section('wegweiser', 'Vom Anspruch zur Sicherung', p('Prüfe zuerst ', link('Fälligkeit und Zahlungsverzug', 'zahlungsverzug'), '. Bei Leistungshindernissen prüfst du ', link('Unmöglichkeit', 'unmoeglichkeit'), ' und anschließend den ', link('Schadensersatz', 'schadensersatz-vertrag-delikt'), '.'),
      p('Bei einem Gegenstand klärst du ', link('Eigentum und Besitz', 'besitz-eigentum'), ', die Art des ', link('Sicherungsrechts', 'kreditsicherheiten'), ' und im Insolvenzfall die ', link('Aus- oder Absonderung', 'aus-absonderung'), '.')),
    section('pruefungssystematik', 'Prüfungsaufgaben bearbeiten', 'Benenne die Parteien und die geforderte Rechtsfolge. Prüfe dann die Voraussetzungen der einschlägigen Vorschrift, ordne den konkreten Sachverhalt zu und formuliere das Ergebnis. Halte getrennt fest, wer zahlen muss, wer Eigentümer ist und ob jemand ein Recht zum Besitz hat.'),
    practice('lagerfall', 'Offene Rechnung beim insolventen Kunden',
      'Ein Zulieferer liefert eine eindeutig gekennzeichnete Maschine unter wirksamem einfachem Eigentumsvorbehalt. Die Abnehmerin hat den fälligen Kaufpreis nicht gezahlt und über ihr Vermögen wird das Insolvenzverfahren eröffnet. Welche drei Fragen sollte der Zulieferer getrennt prüfen?',
      'Erstens den Kaufpreisanspruch und die Fälligkeit. Zweitens die Eigentumslage: Bei wirksamem einfachem Eigentumsvorbehalt bleibt der Zulieferer grundsätzlich Eigentümer. Drittens den Anspruch auf Herausgabe: Er prüft insbesondere das Besitzrecht und die Regeln zur Vertragserfüllung und Aussonderung nach §§ 47, 103 und 107 InsO.'),
  ]);

article('zahlungsverzug', '4.1', 'Fälligkeit und Zahlungsverzug',
  'Die Fälligkeit bestimmt, wann der Gläubiger die Leistung verlangen kann. Der Eintritt des Verzugs setzt zusätzliche Voraussetzungen voraus.',
  [
    section('faelligkeit', 'Fälligkeit und Zahlungsfrist',
      p('Ohne abweichende Vereinbarung oder Umstände ist die Leistung grundsätzlich sofort fällig (§ 271 Abs. 1 BGB). ', { text: 'Fälligkeit', termId: 'logistik-faelligkeit' }, ' kann sich auch aus Sonderregeln ergeben: Dienstvergütung typischerweise nach Leistung (§ 614), Werklohn regelmäßig mit Abnahme (§ 641). Beim gegenseitigen Vertrag kann dem Schuldner bis zur Gegenleistung ein Leistungsverweigerungsrecht zustehen (§ 320 BGB).'),
      'Lies Zahlungsbedingungen im Vertrag. Ein einseitiger Rechnungstext setzt im Regelfall allein keinen vertraglichen Zahlungstermin und bringt den Empfänger nicht automatisch in Verzug. Bei ereignisabhängigen Tagesfristen zählt der Tag des auslösenden Ereignisses grundsätzlich nicht mit (§§ 187, 188 BGB). Fällt der letzte Tag auf einen Samstag, Sonntag oder gesetzlichen Feiertag am Leistungsort, prüfe § 193 BGB.'),
    section('zahlungsziele', 'Grenzen langer Zahlungsziele',
      'Bei Entgeltforderungen sind Zahlungsziele von mehr als 60 Tagen nach Empfang der Gegenleistung beziehungsweise in den gesetzlichen Konstellationen nach Rechnungszugang nur wirksam, wenn die Parteien sie ausdrücklich vereinbart haben und sie für den Gläubiger nicht grob unbillig sind (§ 271a Abs. 1 BGB). Bei öffentlichen Auftraggebern als Schuldnern erfordern mehr als 30 Tage eine ausdrückliche und sachlich gerechtfertigte Vereinbarung. Mehr als 60 Tage sind dort unwirksam (§ 271a Abs. 2).',
      'Für vereinbarte Überprüfungs- oder Abnahmefristen von mehr als 30 Tagen gelten ebenfalls die Anforderungen ausdrücklicher Vereinbarung und fehlender grober Unbilligkeit (§ 271a Abs. 3). Der § 271a enthält unter anderem Ausnahmen für Abschlags- und sonstige Ratenzahlungen sowie für Verbraucher als Schuldner. In AGB können strengere Vorgaben gelten.'),
    section('verzug', 'Beginn des Verzugs',
      p('Der Grundfall des ', term('Schuldnerverzugs', 'begriff-verzug'), ' entsteht bei fälliger und durchsetzbarer Forderung, ausgebliebener Leistung und Zugang einer bestimmten ', term('Mahnung', 'begriff-mahnung'), ' nach Eintritt der Fälligkeit (§ 286 Abs. 1 BGB). Beispiele für eine entbehrliche Mahnung sind ein verbindlicher Kalendertag, eine vom vereinbarten Ereignis an kalendermäßig berechenbare Frist, endgültige Erfüllungsverweigerung oder besondere Gründe nach Interessenabwägung (§ 286 Abs. 2). Eine eindeutige eigene Leistungsankündigung kann in besonderen Fällen eine solche Selbstmahnung sein.'),
      'Bei Entgeltforderungen tritt Verzug außerdem spätestens 30 Tage nach Fälligkeit und Rechnungszugang ein. Verbraucher müssen auf diese Folge in der Rechnung oder gleichwertigen Zahlungsaufstellung besonders hingewiesen werden. Ist der Rechnungszugang unsicher, gilt für Nichtverbraucher zusätzlich die gesetzliche Ersatzregel mit Fälligkeit und Empfang der Gegenleistung (§ 286 Abs. 3). Leistungsausbleiben ohne Vertretenmüssen löst gemäß Abs. 4 keinen Verzug aus.'),
    practice('uebung', 'Vertrag und Rechnung unterscheiden',
      'Eine Druckerei liefert wie vereinbart. Der Vertrag lässt die Zahlungsfrist offen. Die erste Rechnung nennt „zahlbar bis 15. Juni“. Muss das Kundenunternehmen ab dem 16. Juni in Verzug sein? Was ändert eine vertragliche Vereinbarung „Zahlung spätestens 15. Juni“?',
      'Erste Variante: Zuerst Fälligkeit prüfen. Ein nur auf der Rechnung einseitig genannter Kalendertag erfüllt § 286 Abs. 2 Nr. 1 nicht automatisch. Zugang einer Mahnung oder Ablauf der 30-Tage-Regel kann Verzug auslösen. Zweite Variante: Ist der Kalendertag wirksam vereinbart, entfällt die Mahnung. Bei fälliger, durchsetzbarer Forderung und zu vertretender Nichtleistung ist der Schuldner ab dem 16. Juni im Verzug.'),
  ], [
    ['begriff-verzug', 'Schuldnerverzug', 'Zu vertretendes Ausbleiben einer fälligen und durchsetzbaren Leistung nach Mahnung oder einem gesetzlichen Ersatztatbestand.'],
    ['begriff-mahnung', 'Mahnung', 'Eindeutige Aufforderung an den Schuldner, eine fällige Leistung zu erbringen.'],
  ]);

article('verzugszinsen', '4.1.1', 'Verzugszinsen, Pauschale und weiterer Schaden',
  'Während des Verzugs werden Geldschulden verzinst. Zinssatz, Pauschale und weiterer Schaden haben unterschiedliche Voraussetzungen.',
  [
    section('zinssatz', 'Basiszinssatz und Zuschlag',
      p('Gesetzliche ', term('Verzugszinsen', 'begriff-verzugszins'), ' betragen grundsätzlich 5 Prozentpunkte über dem ', term('Basiszinssatz', 'begriff-basiszins'), ' (§ 288 Abs. 1 BGB). Bei Entgeltforderungen aus Rechtsgeschäften ohne Beteiligung eines Verbrauchers sind es 9 Prozentpunkte (§ 288 Abs. 2). Der nach § 247 BGB veröffentlichte Basiszinssatz kann sich am 1. Januar und 1. Juli ändern. Bei einer Änderung innerhalb des Verzugszeitraums rechne die Zeitabschnitte getrennt.'),
      'Bei Entgeltforderungen gegen einen Schuldner, der kein Verbraucher ist, kann zusätzlich die Verzugspauschale von 40 € anfallen (§ 288 Abs. 5 BGB). Sie wird auf ersatzfähige Rechtsverfolgungskosten angerechnet, soweit diese Schäden geltend gemacht werden. Weitere nachgewiesene und ersatzfähige Schäden bleiben grundsätzlich möglich (§§ 280 Abs. 1 und 2, 286, 288 Abs. 4 BGB). Eine erstmalige Mahnung, die den Verzug überhaupt erst auslöst, verursacht regelmäßig noch keinen Verzögerungsschaden.'),
    practice('rechenbeispiel', 'Zins und Pauschale berechnen',
      'Zwei Unternehmen haben eine Entgeltforderung von 10.000 €. Im Juli 2026 fallen 30 Zinstage an. Der Basiszinssatz beträgt in diesem Zeitraum 1,52 %. Berechne mit 365 Tagen und unterstelle die Voraussetzungen der Pauschale.',
      '1,52 % + 9 Prozentpunkte = 10,52 % Jahreszins. 10.000 € × 0,1052 × 30 / 365 = 86,47 €. Mit Pauschale beträgt die Summe 126,47 €. Ändert sich der Basiszinssatz innerhalb des Zeitraums, wird jeder Abschnitt mit seinem Zinssatz separat berechnet.'),
  ], [
    ['begriff-verzugszins', 'Verzugszinsen', 'Zinsen, die auf eine Geldschuld während des Schuldnerverzugs anfallen können.'],
    ['begriff-basiszins', 'Basiszinssatz', 'Bezugsgröße nach § 247 BGB, die die Deutsche Bundesbank zum 1. Januar und 1. Juli bekannt macht.'],
  ]);

article('unmoeglichkeit', '4.2', 'Unmöglichkeit und Folgen für den Vertrag',
  'Wenn eine Leistung ausfällt, prüfst du erst die Beschaffungspflicht, dann die Möglichkeit der Leistung und schließlich Gegenleistung und Ersatzansprüche.',
  [
    section('leistungsgegenstand', 'Stückschuld, Gattungsschuld und Konkretisierung',
      p('Eine ', term('Stückschuld', 'begriff-stueckschuld'), ' betrifft eine bestimmte Sache. Bei einer ', term('Gattungsschuld', 'begriff-gattungsschuld'), ' schuldet der Schuldner ein Stück aus einer vereinbarten Gattung von mittlerer Art und Güte (§ 243 Abs. 1 BGB). Austauschbare bewegliche Sachen, die im Verkehr nach Zahl, Maß oder Gewicht bestimmt werden, heißen vertretbare Sachen (§ 91). Ob ein bestimmtes Stück oder Ware aus einer Gattung geschuldet ist, ergibt sich aus dem Vertrag.'),
      p('Hat der Schuldner das seinerseits Erforderliche getan, beschränkt sich die Pflicht auf die ausgewählte Sache (§ 243 Abs. 2 BGB, ', term('Konkretisierung', 'begriff-konkretisierung'), '). Bei Holschuld kommt es typischerweise auf Aussonderung und Benachrichtigung an, bei Schickschuld auf ordnungsgemäße Übergabe an die Transportperson und bei Bringschuld auf das Angebot am vereinbarten Ort. Prüfe die konkreten Abreden, etwa bei Vorratsschulden.')),
    section('leistungshindernis', 'Ausschluss und Leistungsverweigerung',
      p(term('Unmöglichkeit', 'begriff-unmoeglichkeit'), ' schließt den Leistungsanspruch aus, soweit die Leistung für den Schuldner oder jedermann unmöglich ist (§ 275 Abs. 1 BGB). Bei grobem Missverhältnis zwischen Aufwand und Leistungsinteresse kann der Schuldner die Leistung verweigern (§ 275 Abs. 2). Bei persönlich geschuldeter Leistung kommt auch Unzumutbarkeit nach Interessenabwägung in Betracht (§ 275 Abs. 3). Wirtschaftliche Schwierigkeiten allein erfüllen diese Voraussetzungen nicht.'),
      'Eine bereits bei Vertragsschluss bestehende Unmöglichkeit macht den Vertrag für sich genommen nicht unwirksam (§ 311a Abs. 1). Ersatz statt Leistung oder Aufwendungsersatz kommt nach Abs. 2 in Betracht, wenn der Schuldner das Hindernis kannte oder seine Unkenntnis zu vertreten hatte. Entsteht das Hindernis später, prüfe §§ 280 Abs. 1 und 3, 283 BGB. Statt Schadensersatzes statt der Leistung lässt sich bei entsprechenden Voraussetzungen Aufwendungsersatz nach § 284 verlangen.'),
    section('gegenleistung', 'Preis, Ersatz und Rücktritt',
      'Die Gegenleistung entfällt grundsätzlich (§ 326 Abs. 1 BGB). Ausnahmen sind insbesondere überwiegende Verantwortlichkeit des Gläubigers oder Annahmeverzug unter den Voraussetzungen des Abs. 2. Erlangt der Schuldner einen Ersatz oder Ersatzanspruch für die ausgefallene Leistung, kann der Gläubiger diesen unter § 285 BGB verlangen. In diesem Fall bleibt die Gegenleistung grundsätzlich geschuldet, gegebenenfalls vermindert (§ 326 Abs. 3). Bereits gezahlte, nicht geschuldete Gegenleistungen können zurückverlangt werden (§ 326 Abs. 4). Ein Rücktritt nach Abs. 5 benötigt keine Fristsetzung.'),
    practice('ersatzbeschaffung', 'Ab Lager oder nach Gattung?',
      'Eine Fabrik kauft einmal eine ausdrücklich über die Seriennummer bezeichnete historische Maschine und einmal 20 Standardlager aus frei beschaffbarer Ware. Ein Brand zerstört beide Waren im Verkäuferlager vor Konkretisierung. Welche Leistung kann die Fabrik weiter verlangen?',
      'Die bestimmte historische Maschine kann nicht mehr geliefert werden (§ 275 Abs. 1 BGB). Prüfe anschließend Kaufpreis und Ersatzansprüche. Die Standardlager sind vor Konkretisierung bei frei beschaffbarer Gattung durch andere Stücke ersetzbar. Die Lieferpflicht bleibt grundsätzlich bestehen. Prüfe vertragliche Begrenzungen und Verschulden als eigene Schritte.'),
  ], [
    ['begriff-stueckschuld', 'Stückschuld', 'Leistungspflicht, die sich auf einen individuell bestimmten Gegenstand bezieht.'],
    ['begriff-gattungsschuld', 'Gattungsschuld', 'Leistungspflicht, die sich zunächst auf eine Sache aus einer bezeichneten Gattung bezieht.'],
    ['begriff-konkretisierung', 'Konkretisierung', 'Beschränkung der Gattungsschuld auf ausgewählte Gegenstände, nachdem der Schuldner das erforderliche Leistungsprogramm erfüllt hat.'],
    ['begriff-unmoeglichkeit', 'Unmöglichkeit', 'Leistungshindernis, das unter § 275 BGB den Leistungsanspruch ausschließt oder dem Schuldner ein Leistungsverweigerungsrecht gibt.'],
  ]);

article('schadensersatz-vertrag-delikt', '4.2.1', 'Schadensersatz aus Vertrag und Delikt',
  'Bei einem Schadensfall kannst du vertragliche und deliktische Anspruchsgrundlagen parallel prüfen.',
  [
    section('vertrag', 'Vertragliche Pflichtverletzung',
      'Bei § 280 Abs. 1 BGB prüfe Schuldverhältnis, Pflichtverletzung, Vertretenmüssen und ursächlichen Schaden. Hauptleistungspflichten stehen in § 241 Abs. 1. Rücksichtnahmepflichten schützen nach § 241 Abs. 2 auch Rechte, Rechtsgüter und Interessen des anderen Teils. Der Schuldner muss sich bei § 280 Abs. 1 entlasten. Vorsatz und Fahrlässigkeit richten sich grundsätzlich nach § 276. Für Erfüllungsgehilfen kommt eine Zurechnung nach § 278 in Betracht.',
      'Für Schadensersatz wegen Verzögerung sind zusätzlich § 286 und für Schadensersatz statt der Leistung §§ 281 bis 283 BGB heranzuziehen. Zur Schadensbemessung prüfe Wiederherstellung beziehungsweise Geldersatz unter § 249 und gegebenenfalls entgangenen Gewinn unter § 252.'),
    section('delikt', 'Unerlaubte Handlung und Verantwortlichkeit',
      p('Bei einer ', term('unerlaubten Handlung', 'begriff-delikt'), ' nach § 823 Abs. 1 BGB prüfe Verletzung eines geschützten Rechts oder Rechtsguts (z. B. Körper, Gesundheit oder Eigentum), Handlung, Ursächlichkeit, Rechtswidrigkeit, Verschulden und Schaden. Reiner Vermögensschaden reicht für § 823 Abs. 1 für sich genommen nicht, andere Anspruchsgrundlagen können aber greifen.'),
      'Kinder unter sieben Jahren sind deliktsrechtlich nicht verantwortlich (§ 828 Abs. 1). Bei Sieben- bis unter Zehnjährigen gilt die besondere Haftungsausnahme für Unfälle mit Kraftfahrzeug, Schienenbahn oder Schwebebahn, außer bei vorsätzlicher Verletzung (Abs. 2). Im Übrigen kommt es bei Minderjährigen auf die erforderliche Einsicht an (Abs. 3). Aufsichtspflichtige können unter § 832 haften, wenn ihnen die Entlastung nicht gelingt. § 829 regelt einen engen Ausnahmefall der Billigkeitshaftung.'),
    practice('praxisschaden', 'Montageteam beschädigt Inventar',
      'Eine Firma beauftragt einen Dienstleister mit der Montage von Schließfächern. Dessen Monteur beschädigt aus Unachtsamkeit ein Terminal im Eigentum der Auftraggeberin. Ordne die beiden möglichen Anspruchswege zu.',
      'Gegen den Dienstleister kommt § 280 Abs. 1 i. V. m. § 241 Abs. 2 BGB in Betracht. Das Verhalten des eingesetzten Monteurs kann ihm nach § 278 zugerechnet werden. Gegen den fahrlässig handelnden Monteur ist § 823 Abs. 1 wegen Eigentumsverletzung zu prüfen. Die Auftraggeberin kann denselben Schaden nur einmal ersetzt verlangen.'),
  ], [
    ['begriff-delikt', 'Unerlaubte Handlung', 'Gesetzlicher Haftungstatbestand außerhalb eines Vertrags, etwa eine rechtswidrige, schuldhafte Eigentumsverletzung nach § 823 Abs. 1 BGB.'],
  ]);

article('besitz-eigentum', '4.3', 'Besitz, Eigentum und Herausgabe',
  'Besitz ist die tatsächliche Herrschaft über eine Sache. Eigentum ordnet die Sache rechtlich zu. Beide Rollen können auseinanderfallen.',
  [
    section('zuordnung', 'Wer hat die Sache? Wem gehört sie?',
      p(term('Besitz', 'begriff-besitz'), ' erwirbt, wer tatsächliche Gewalt über die Sache erlangt (§ 854 BGB). Unmittelbarer Besitz liegt etwa beim Mieter eines Werkzeugs. Hat er es aufgrund eines Besitzmittlungsverhältnisses für den Vermieter, ist dieser mittelbarer Besitzer (§ 868). Ein Besitzdiener, etwa ein weisungsgebundener Lagerarbeiter, übt Sachherrschaft für den Geschäftsherrn aus (§ 855).'),
      p(term('Eigentum', 'begriff-eigentum'), ' ist die rechtliche Sachherrschaft (§ 903 BGB). Beim Einkauf bleibt der Ladeninhaber vor dem Eigentumsübergang Eigentümer. Die Besitzfrage richtet sich nach den Umständen der tatsächlichen Sachherrschaft. Hält der Kunde die Waren im Einkaufswagen unter eigener unmittelbarer Kontrolle, kann er bereits Besitzer sein.'),
      'Bei einem Herausgabeanspruch aus § 985 BGB prüfe Eigentümer, Besitzer und das mögliche Recht zum Besitz (§ 986). Eigentum geht durch bloßes Liegenlassen grundsätzlich nicht verloren. Für die Aufgabe beweglichen Eigentums braucht es einen Verzichtswillen und die Aufgabe des Besitzes (§ 959).'),
    section('uebertragung', 'Bewegliche Sachen rechtsgeschäftlich übertragen',
      p('Nach § 929 Satz 1 BGB sind dingliche Einigung, Übergabe und Berechtigung erforderlich. Ist der Erwerber bereits Besitzer, genügt die Einigung (§ 929 Satz 2). Ein Kaufvertrag verpflichtet zu Übereignung und Zahlung. Die Übereignung ist ein eigenes Geschäft. Lies dazu ', link('Trennungs- und Abstraktionsprinzip', 'trennung-abstraktion'), '.'),
      p('Ein ', term('Besitzkonstitut', 'begriff-besitzkonstitut'), ' nach § 930 ersetzt die Übergabe durch ein Rechtsverhältnis, das dem Erwerber mittelbaren Besitz verschafft. Hält ein Dritter die Sache, kann die Übergabe nach § 931 durch Abtretung des Herausgabeanspruchs an den Erwerber ersetzt werden.')),
    practice('lieferung', 'Eigentum bei Lieferung auf Rechnung',
      'Ein Unternehmen bestellt 50 Standardfilter am 3. Mai. Die Ware wird am 6. Mai mit Einigung über die Übereignung übergeben. Die Rechnung wird am 20. Mai gezahlt. Ein Eigentumsvorbehalt wurde nicht vereinbart. Wann geht das Eigentum über?',
      'Mit Einigung und Übergabe am 6. Mai (§ 929 Satz 1 BGB), wenn der Lieferant verfügungsberechtigt ist. Weder die Bestellung noch die spätere Zahlung bestimmen hier den Erwerbszeitpunkt.'),
    section('gesetz', 'Eigentumswechsel kraft Gesetzes',
      'Dauerhaft eingepflanzte Pflanzen werden wesentliche Grundstücksbestandteile (§ 94 Abs. 1 BGB). Das Grundstückseigentum erstreckt sich auf sie (§ 946). Bei nur vorübergehender Verbindung kann § 95 greifen. Bei beweglichen Sachen prüft man Verbindung (§ 947), Vermischung oder Vermengung (§ 948) und bei Herstellung einer neuen Sache Verarbeitung (§ 950). Ein Rechtsverlust kann unter § 951 einen Geldausgleich auslösen, der gesondert zu prüfen ist.'),
    practice('gala', 'Hecke und Werkzeug nach der Baustelle',
      'Ein Gartenbetrieb pflanzt Sträucher dauerhaft in ein Kundengrundstück. Der Kunde nimmt eine auf dem Hof vergessene Arbeitsschaufel in seine Garage. Gib Eigentümer und Besitzer an und prüfe, ob der Betrieb die Schaufel zurückverlangen kann.',
      'Die dauerhaft eingepflanzten Sträucher werden nach §§ 94, 946 BGB Teil des Grundstückseigentums. In der Garage besitzt der Kunde die Schaufel, Eigentümer bleibt mangels Übereignung oder Aufgabe der Gartenbetrieb. Ohne Recht zum Besitz kann der Betrieb Herausgabe nach § 985 verlangen.'),
  ], [
    ['begriff-besitz', 'Besitz', 'Tatsächliche Sachherrschaft, die unmittelbar oder über einen Besitzmittler ausgeübt werden kann.'],
    ['begriff-eigentum', 'Eigentum', 'Rechtliche Zuordnung einer Sache mit den Befugnissen aus § 903 BGB.'],
    ['begriff-besitzkonstitut', 'Besitzkonstitut', 'Besitzmittlungsverhältnis zur Ersetzung der Übergabe bei der Übereignung beweglicher Sachen nach § 930 BGB.'],
  ]);

article('eigentumsvorbehalt', '4.3.1', 'Eigentumsvorbehalt und Rückabwicklung',
  'Der Eigentumsvorbehalt sichert den Verkäufer bei Lieferung vor vollständiger Zahlung.',
  [
    section('einfach', 'Einfacher Eigentumsvorbehalt',
      p('Beim einfachen ', { text: 'Eigentumsvorbehalt', termId: 'logistik-eigentumsvorbehalt' }, ' erhält der Käufer den Besitz, das Eigentum geht erst mit vollständiger Zahlung über (§§ 449 Abs. 1, 929, 158 Abs. 1 BGB). Bei Teilzahlung besteht die gesicherte Rechtsposition des Käufers grundsätzlich fort.'),
      'Der Verkäufer kann die Sache aufgrund des Eigentumsvorbehalts erst nach Rücktritt herausverlangen (§ 449 Abs. 2 BGB). Prüfe § 323, insbesondere eine angemessene Leistungsfrist oder deren Entbehrlichkeit, und die Rücktrittserklärung (§ 349). Eine bloße Mahnung ist nur dann zugleich Fristsetzung, wenn ihre Aussage die entsprechenden Anforderungen erfüllt. § 346 Abs. 1 regelt Rückgewähr, bei verbrauchter Ware kommt Wertersatz nach Abs. 2 Satz 1 Nr. 2 in Betracht. Prüfe Ausnahmen des Abs. 3. § 985 ist nach Wegfall des Besitzrechts ebenfalls prüfbar.'),
    section('varianten', 'Verlängerter und erweiterter Vorbehalt',
      'Beim verlängerten Eigentumsvorbehalt ist die Weiterveräußerung im üblichen Geschäftsgang regelmäßig gestattet (§ 185 BGB). Der Käufer tritt seine künftigen Ansprüche aus dem Weiterverkauf im Voraus ab (§ 398). Vertragsklauseln können zusätzlich Verarbeitung oder Umlaufvermögen regeln. Der erweiterte Vorbehalt sichert weitere Forderungen desselben Verkäufers, etwa den Saldo einer Geschäftsverbindung. Die Abhängigkeit von der Befriedigung fremder Forderungen ist gemäß § 449 Abs. 3 unwirksam. AGB-Kontrolle und Übersicherung sind gesondert zu prüfen.'),
    practice('verbrauch', 'Teil des Materials bereits verbraucht',
      'Ein Zulieferer liefert unter einfachem Eigentumsvorbehalt 120 Rollen Schutzfolie zu je 14 €. Die Abnehmerin verbraucht 30 Rollen und bezahlt nicht. Eine wirksam gesetzte Nachfrist ist erfolglos abgelaufen. Was kann der Verkäufer nach wirksam erklärtem Rücktritt verlangen? Unterstelle, dass keine Ausnahme vom Wertersatz gilt.',
      'Der Verkäufer kann 90 Rollen zurückverlangen. Für die 30 verbrauchten Rollen kommt Wertersatz von 420 € nach § 346 Abs. 2 Satz 1 Nr. 2 BGB in Betracht. § 449 Abs. 2 und §§ 323, 349 erklären, weshalb der Rücktritt dem Herausgabeverlangen vorausgeht.'),
  ]);

article('gutglaeubiger-erwerb', '4.3.2', 'Gutgläubiger Erwerb beweglicher Sachen',
  'Ein Erwerber kann trotz fehlenden Eigentums seines Vertragspartners Eigentum erlangen. Dafür kommt es auf Erwerbsart, guten Glauben und den früheren Besitzverlust an.',
  [
    section('pruefung', 'Guter Glaube und Abhandenkommen',
      p('Bei Übergabe ermöglicht § 932 BGB unter seinen Voraussetzungen den ', term('gutgläubigen Erwerb', 'begriff-gutglaeubig'), ' vom Nichtberechtigten. Wer weiß oder infolge grober Fahrlässigkeit nicht weiß, dass die Sache dem Veräußerer nicht gehört, ist hier nicht gutgläubig. Bei Übergabeersatz gelten §§ 933, 934 mit eigenen Erwerbszeitpunkten.'),
      p('Ist die Sache gestohlen, verloren gegangen oder sonst ', term('abhandengekommen', 'begriff-abhandenkommen'), ', sperrt § 935 Abs. 1 grundsätzlich den gutgläubigen Erwerb. Bei mittelbarem Eigentümerbesitz kommt es auf das Abhandenkommen beim unmittelbaren Besitzer an. Ausnahmen sind insbesondere Geld, Inhaberpapiere und bestimmte öffentliche Versteigerungen (§ 935 Abs. 2).')),
    practice('verlust', 'Geliehen oder gestohlen?',
      'Ein Prüflabor stellt einem Kollegen mit Einwilligung ein tragbares Messgerät zur Verfügung. Er verkauft und übergibt es ohne Zustimmung an einen gutgläubigen Käufer. Wie ändert sich das Ergebnis, wenn der Verkäufer das Gerät zuvor aus dem verschlossenen Lager gestohlen hat?',
      'Bei freiwilligem Besitzübergang an den Kollegen kann der Käufer nach §§ 929, 932 BGB erwerben, wenn die übrigen Voraussetzungen vorliegen. Beim Diebstahl sperrt § 935 in diesem Fall den Erwerb. Das Labor bleibt Eigentümer und kann nach §§ 985, 986 Herausgabe des Geräts vom Besitzer prüfen.'),
  ], [
    ['begriff-gutglaeubig', 'Gutgläubiger Erwerb', 'Gesetzlich zugelassener Eigentumserwerb vom Nichtberechtigten, wenn insbesondere guter Glaube und Erwerbstatbestand erfüllt sind.'],
    ['begriff-abhandenkommen', 'Abhandenkommen', 'Unfreiwilliger Verlust des unmittelbaren Besitzes, etwa durch Diebstahl oder Verlust.'],
  ]);

article('grundstueckskauf', '4.3.3', 'Grundstückskauf, Auflassung und Eintragung',
  'Beim Grundstückserwerb erfüllen Kaufvertrag, Auflassung und Grundbucheintragung verschiedene Funktionen.',
  [
    section('form', 'Vom Kaufvertrag zur Eigentumsumschreibung',
      p('Die Verpflichtung zur Übertragung oder zum Erwerb eines Grundstücks ist grundsätzlich notariell zu beurkunden (§ 311b Abs. 1 Satz 1 BGB). Die dingliche Einigung über den Eigentumsübergang heißt ', term('Auflassung', 'begriff-auflassung'), ' (§ 925). Eigentum wird grundsätzlich mit Auflassung und Eintragung im Grundbuch erworben (§ 873 Abs. 1). Übergabe eines Schlüssels oder vollständige Zahlung bewirken für sich genommen keinen Eigentumswechsel.'),
      p('Ein ', term('Scheingeschäft', 'begriff-scheingeschaeft'), ' ist nach § 117 Abs. 1 BGB nichtig. Für das verdeckte, wirklich gewollte Geschäft gelten dessen Vorschriften (Abs. 2). Fehlt dem verdeckten Grundstückskauf die notarielle Form, ist er zunächst nach § 125 Satz 1 nichtig. Auflassung und Eintragung können den Formmangel nach § 311b Abs. 1 Satz 2 heilen.')),
    section('grenzen', 'Formmangel und weitere Unwirksamkeitsgründe',
      'Prüfe andere Nichtigkeitsgründe eigenständig. Für einen falsch beurkundeten Kaufpreis zur Steuerverkürzung unterscheidet der BGH danach, ob der Erwerb tatsächlich gewollt und die Steuerverkürzung weder alleiniger noch hauptsächlicher Vertragszweck ist (BGH, 15. März 2024, V ZR 115/22). Die zivilrechtliche Formheilung ändert nichts an steuerlichen Pflichten.'),
    practice('preis', 'Formmangel durch Vollzug',
      'Zwei Unternehmen vereinbaren den Verkauf eines unbebauten Gewerbegrundstücks mündlich. Wie ist der Kaufvertrag zunächst einzuordnen? Was ändert sich, wenn später eine wirksame Auflassung erklärt und der Käufer tatsächlich eingetragen wird?',
      'Der schuldrechtliche Vertrag ist zunächst formnichtig (§§ 311b Abs. 1 Satz 1, 125 Satz 1 BGB). Auflassung und tatsächliche Eintragung machen ihn nach § 311b Abs. 1 Satz 2 seinem ganzen Inhalt nach gültig, wenn keine selbstständigen Unwirksamkeitsgründe vorliegen. Eigentum wird auf der dinglichen Ebene nach §§ 873, 925 übertragen.'),
  ], [
    ['begriff-auflassung', 'Auflassung', 'Dingliche Einigung über die Übertragung des Grundstückseigentums in der Form des § 925 BGB.'],
    ['begriff-scheingeschaeft', 'Scheingeschäft', 'Einvernehmlich nur zum Schein erklärte Willenserklärung nach § 117 Abs. 1 BGB.'],
  ]);

article('kreditsicherheiten', '4.4', 'Kreditsicherheiten auswählen',
  'Vergleiche Sicherheiten danach, welches Recht der Gläubiger erhält, was der Schuldner weiter nutzen kann und welcher Wert im Ausfall realisierbar ist.',
  [
    section('arten', 'Personalsicherheit und Sachsicherheit',
      p('Bei einer ', term('Personalsicherheit', 'begriff-personalsicherheit'), ' erhält ein Gläubiger einen Anspruch gegen eine weitere Person, etwa gegen einen Bürgen. ', term('Realsicherheiten', 'begriff-realsicherheit'), ' geben Zugriff auf einen bestimmten Vermögenswert oder eine Forderung. Beispiele sind Pfandrecht, Grundpfandrecht, Sicherungsübereignung und Sicherungsabtretung. Beim Warenkauf dient außerdem der Eigentumsvorbehalt als Sicherung.'),
      'Prüfe Wert und Wertstabilität, vorhandene Rechte Dritter, Verwertungskosten, Rang, Nachweisbarkeit und Bedeutung für den Betrieb. Bei personellen Sicherheiten kommt es wesentlich auf Zahlungsfähigkeit und Durchsetzbarkeit an. Eine Forderung zur Sicherheit tritt man nach § 398 BGB ab. Die Abtretung eines Herausgabeanspruchs nach § 931 hat dagegen die Funktion eines Übergabeersatzes bei der Übereignung.'),
    section('flotte', 'Pfandrecht und Sicherungsübereignung',
      p('Beim ', term('Pfandrecht', 'begriff-pfandrecht'), ' an einer beweglichen Sache benötigt der Pfandgläubiger regelmäßig Einigung und Übergabe (§§ 1204, 1205 BGB). Eine fortgesetzte alleinige Sachherrschaft des Schuldners genügt dafür nicht. Die ', term('Sicherungsübereignung', 'begriff-sicherungsuebereignung'), ' überträgt das Eigentum regelmäßig über §§ 929, 930 und 868 BGB. Die Sicherungsvereinbarung legt unter anderem Nutzung, Freigabe und Verwertung fest.')),
    section('grundbesitz', 'Hypothek und Grundschuld',
      p('Die ', term('Hypothek', 'begriff-hypothek'), ' sichert eine konkrete Forderung und ist rechtlich an sie gebunden (§ 1113 BGB). Eine ', term('Grundschuld', 'begriff-grundschuld'), ' setzt für ihren Bestand keine Forderung voraus (§ 1191). Die Sicherungsabrede knüpft die Verwertungsbefugnis im Innenverhältnis an den Sicherungszweck. Eine Tilgung führt nicht von selbst zur Löschung im Grundbuch. Kläre Freigabe oder Rückgewähr und beachte den Rang.')),
    practice('flottenkredit', 'Was sichert die Bank, was kann der Betrieb nutzen?',
      'Ein Holzbaubetrieb finanziert neue Hubgeräte. Die Inhaberin braucht sie täglich. Vergleiche Pfand und Sicherungsübereignung. Nenne zwei weitere Auswahlkriterien für die Bank.',
      'Ein klassisches Pfand nach § 1205 verlangt grundsätzlich Übergabe und blockiert regelmäßig die Nutzung. Bei Sicherungsübereignung kann der Betrieb aufgrund des Besitzkonstituts unmittelbarer Besitzer bleiben. Die Bank prüft beispielsweise wirtschaftliche Restwerte, bereits bestehende Rechte, den Identitätsnachweis und die Verwertungskosten. Eine Sicherheit verliert an Wert, wenn ihre Verwertbarkeit gerade im wirtschaftlichen Ausfall des Schuldners sinkt.'),
  ], [
    ['begriff-personalsicherheit', 'Personalsicherheit', 'Sicherheit, bei der eine weitere Person dem Gläubiger für eine Forderung haftet.'],
    ['begriff-realsicherheit', 'Realsicherheit', 'Sicherheit, die dem Gläubiger Zugriff auf einen bestimmten Vermögenswert verschafft.'],
    ['begriff-pfandrecht', 'Pfandrecht', 'Recht zur Verwertung des Pfandgegenstands zur Befriedigung einer gesicherten Forderung.'],
    ['begriff-sicherungsuebereignung', 'Sicherungsübereignung', 'Übertragung des Eigentums zur Kreditsicherung, häufig unter Belassung des unmittelbaren Besitzes beim Sicherungsgeber.'],
    ['begriff-hypothek', 'Hypothek', 'Grundpfandrecht, das den Bestand einer bestimmten Forderung voraussetzt.'],
    ['begriff-grundschuld', 'Grundschuld', 'Grundpfandrecht, das nicht den Bestand einer Forderung voraussetzt.'],
  ]);

article('buergschaft', '4.4.1', 'Bürgschaft und Ausfallrisiko',
  'Eine Bürgschaft erweitert den Kreis der Haftenden. Aus der Bürgschaftsart ergibt sich, wann der Gläubiger den Bürgen in Anspruch nehmen kann.',
  [
    section('vertrag', 'Vertrag, Form und Hauptforderung',
      p('Eine ', term('Bürgschaft', 'begriff-buergschaft'), ' ist ein Vertrag zwischen Gläubiger und Bürge, in dem der Bürge für die Verbindlichkeit eines Dritten einsteht (§ 765 BGB). Maß und Bestand hängen grundsätzlich von der Hauptverbindlichkeit ab (§ 767). Die Bürgschaftserklärung bedarf grundsätzlich der Schriftform. Die elektronische Form ist ausgeschlossen, Erfüllung durch den Bürgen heilt den Formmangel (§ 766). Bei einem Handelsgeschäft auf Seiten des Bürgen prüfe § 350 HGB. Eine Geschäftsführungsfunktion macht eine Person selbst noch nicht zum Kaufmann.')),
    section('varianten', 'Vorausklage, Selbstschuld und Ausfall',
      p('Bei der gewöhnlichen Bürgschaft kommt die ', term('Einrede der Vorausklage', 'begriff-vorausklage'), ' nach § 771 BGB in Betracht. Bei der selbstschuldnerischen Bürgschaft ist diese Einrede ausgeschlossen (§ 773 Abs. 1 Nr. 1). Der Gläubiger kann bei erfüllten Voraussetzungen den Bürgen direkt in Anspruch nehmen. Eine echte Ausfallbürgschaft macht die Haftung vertraglich vom tatsächlichen und nachgewiesenen Ausfall abhängig. Ihr Ausfalltatbestand ergibt sich aus dem Vertrag.')),
    practice('hausbank', 'Privat für den Firmenkredit bürgen',
      'Ein Geschäftsführer will sich persönlich für ein Darlehen seiner GmbH verbürgen. Die Bank verlangt eine selbstschuldnerische Bürgschaft. Wer schließt mit wem ab, und was bedeutet die Variante für das Risiko des Geschäftsführers?',
      'Bürge ist der Geschäftsführer persönlich, Gläubiger die Bank, Hauptschuldnerin die GmbH. Die Bürgschaftserklärung ist im Grundfall schriftlich abzugeben. Bei der selbstschuldnerischen Bürgschaft greift die Einrede der Vorausklage nicht. Die Bank muss die GmbH daher nicht zuerst erfolglos vollstrecken, wenn die übrigen Haftungsvoraussetzungen vorliegen.'),
  ], [
    ['begriff-buergschaft', 'Bürgschaft', 'Vertrag, durch den der Bürge dem Gläubiger für eine Verbindlichkeit eines Dritten einsteht.'],
    ['begriff-vorausklage', 'Einrede der Vorausklage', 'Einrede des Bürgen, die Leistung grundsätzlich bis zur erfolglosen Zwangsvollstreckung gegen den Hauptschuldner zu verweigern.'],
  ]);

article('vorvertragliches-schuldverhaeltnis', '4.5', 'Vorvertragliche Schuldverhältnisse',
  'Schutzpflichten können bereits entstehen, wenn ein Geschäft angebahnt wird.',
  [
    section('aufnahme', 'Verhandlungen, Anbahnung und ähnliche Kontakte',
      p('Ein ', term('vorvertragliches Schuldverhältnis', 'begriff-cic'), ' entsteht nach § 311 Abs. 2 BGB bei Vertragsverhandlungen, bei Anbahnung mit Möglichkeit der Einwirkung auf Rechte, Rechtsgüter oder Interessen sowie bei ähnlichen geschäftlichen Kontakten. Die Interessen des Gegenübers sind nach § 241 Abs. 2 zu berücksichtigen. Ein Dritter kann besonders nach § 311 Abs. 3 einbezogen sein, wenn er in besonderem Maße Vertrauen in Anspruch nimmt und die Verhandlungen oder den Abschluss erheblich beeinflusst.'),
      'Für Schadensersatz prüfe §§ 280 Abs. 1, 241 Abs. 2, 311 Abs. 2 oder 3 BGB und die Ursächlichkeit der Pflichtverletzung. Ohne Vertragsabschluss besteht keine Primärpflicht aus dem angepeilten Vertrag. Bei Verletzungen können deliktische Ansprüche daneben zu prüfen sein.'),
    practice('besichtigung', 'Gefahr bei der Besichtigung',
      'Eine Einkäuferin besucht nach Einladung ein Techniklager, um Verpackungsgeräte zu prüfen. Sie rutscht in einem ungesicherten, dem Anbieter bekannten Bereich aus und verletzt sich. Zu einem Vertrag kommt es nicht. Welche Anspruchsgrundlagen prüfst du?',
      'Prüfe zunächst ein vorvertragliches Schuldverhältnis nach § 311 Abs. 2, eine Sicherheits- oder Rücksichtspflicht nach § 241 Abs. 2 und deren zurechenbare Verletzung mit Schaden nach § 280 Abs. 1 BGB. Daneben kommt eine deliktische Haftung wegen Körper- oder Gesundheitsverletzung in Betracht.'),
  ], [
    ['begriff-cic', 'Vorvertragliches Schuldverhältnis', 'Schuldverhältnis mit Rücksichtnahmepflichten, das schon bei geschäftlichem Kontakt vor einem möglichen Vertragsschluss entstehen kann.'],
  ]);

article('insolvenzgruende', '4.6', 'Insolvenzgründe und Antragspflicht',
  'Der gesetzliche Eröffnungsgrund beantwortet, ob ein Insolvenzverfahren in Betracht kommt. Die Pflicht zum Antrag ist eine eigene Frage.',
  [
    section('zweck', 'Ziel des Verfahrens',
      'Die Insolvenzordnung bezweckt die gemeinschaftliche Befriedigung der Gläubiger durch Verwertung und Verteilung oder durch Regelungen eines Insolvenzplans, der auch den Unternehmenserhalt ermöglichen kann. Redlichen Schuldnern eröffnet sie nach Maßgabe des Gesetzes die Restschuldbefreiung (§ 1 InsO).'),
    section('gruende', 'Drei Tatbestände auseinanderhalten',
      p(term('Zahlungsunfähigkeit', 'begriff-zahlungsunfaehigkeit'), ' liegt vor, wenn der Schuldner fällige Zahlungspflichten nicht erfüllen kann (§ 17 InsO). Zahlungseinstellung ist ein gesetzliches Indiz. Unternehmensverluste allein beantworten die Liquiditätsfrage nicht. Prüfe Fälligkeiten, verfügbare Mittel und die kurzfristige Finanzlage.'),
      p('Bei ', term('drohender Zahlungsunfähigkeit', 'begriff-drohende-zahlungsunfaehigkeit'), ' ist die Erfüllung bestehender Zahlungspflichten bei künftiger Fälligkeit voraussichtlich nicht möglich (§ 18 InsO). Der Prognosezeitraum beträgt in der Regel 24 Monate. Dieser Eröffnungsgrund steht nur dem Schuldner für seinen eigenen Antrag offen.'),
      p(term('Überschuldung', 'begriff-ueberschuldung'), ' betrifft nach § 19 InsO juristische Personen und bestimmte rechtsfähige Personengesellschaften. Sie liegt vor, wenn das Vermögen die bestehenden Verbindlichkeiten nicht deckt, sofern die Unternehmensfortführung in den nächsten zwölf Monaten nicht überwiegend wahrscheinlich ist. Bilanzielles negatives Eigenkapital und insolvenzrechtliche Überschuldung sind getrennt zu ermitteln.')),
    section('pflicht', 'Verantwortung der Vertretungsorgane',
      p('Bei Zahlungsunfähigkeit oder Überschuldung müssen insbesondere die Vertretungsorgane juristischer Personen bzw. die Verpflichteten der von § 15a InsO erfassten Gesellschaften ohne persönlich haftende natürliche Person die ', term('Insolvenzantragspflicht', 'begriff-insolvenzantragspflicht'), ' prüfen. Maßgeblich ist die konkrete Haftungs- und Vertretungsstruktur. Drohende Zahlungsunfähigkeit allein und die bloße Rechtsform OHG oder KG begründen für sich keine Pflicht nach § 15a.'),
      'Der Antrag ist ohne schuldhaftes Zögern zu stellen, spätestens drei Wochen nach Eintritt der Zahlungsunfähigkeit und sechs Wochen nach Eintritt der Überschuldung. Die Höchstfristen sind keine allgemein ausschöpfbaren Wartefristen. Pflichtverletzungen können insbesondere straf- und haftungsrechtliche Folgen haben.'),
    practice('liquiditaet', 'Zukunftsprognose bei einem Maschinenbauer',
      'Eine GmbH kann aktuell alle fälligen Zahlungen leisten. Eine belastbare Planung zeigt, dass sie in vier Monaten bestehende Verpflichtungen bei Fälligkeit nicht mehr bedienen kann. Überschuldung liegt laut Sachverhalt nicht vor. Darf oder muss ihre Geschäftsführung nach diesen Angaben einen Antrag stellen?',
      'Die negative Liquiditätsprognose spricht für drohende Zahlungsunfähigkeit nach § 18 InsO. Die GmbH darf einen Eigenantrag darauf stützen. Eine Pflicht nach § 15a besteht auf dieser Grundlage allein nicht. Sobald Zahlungsunfähigkeit oder Überschuldung eintritt, ist die Antragspflicht neu zu beurteilen.'),
  ], [
    ['begriff-zahlungsunfaehigkeit', 'Zahlungsunfähigkeit', 'Unfähigkeit des Schuldners, seine fälligen Zahlungspflichten zu erfüllen (§ 17 InsO).'],
    ['begriff-drohende-zahlungsunfaehigkeit', 'Drohende Zahlungsunfähigkeit', 'Voraussichtliche Unfähigkeit, bestehende Zahlungspflichten bei künftiger Fälligkeit zu erfüllen (§ 18 InsO).'],
    ['begriff-ueberschuldung', 'Überschuldung', 'Insolvenzgrund nach § 19 InsO mit Vermögensunterdeckung und fehlender überwiegend wahrscheinlicher Fortführung im gesetzlichen Prognosezeitraum.'],
    ['begriff-insolvenzantragspflicht', 'Insolvenzantragspflicht', 'Pflicht der gesetzlich Verantwortlichen bestimmter Rechtsträger, bei Zahlungsunfähigkeit oder Überschuldung ohne schuldhaftes Zögern den Insolvenzantrag zu stellen.'],
  ]);

article('insolvenzverfahren', '4.6.1', 'Insolvenzverfahren, Forderungsanmeldung und Quote',
  'Vom schriftlichen Antrag bis zur Auszahlung liegen mehrere Verfahrensschritte. Welche Gläubiger mit welcher Forderung teilnehmen, bestimmt die Verteilung.',
  [
    section('antrag', 'Antrag, Gericht und Eröffnungsentscheidung',
      'Ein Insolvenzverfahren wird nur auf schriftlichen Antrag eröffnet (§ 13 InsO). Schuldner und Gläubiger sind antragsberechtigt. Gläubiger müssen ein rechtliches Interesse an der Verfahrenseröffnung haben und Forderung sowie Eröffnungsgrund glaubhaft machen (§ 14). Drohende Zahlungsunfähigkeit kann nur einen Eigenantrag tragen. Sachlich zuständig ist das Insolvenzgericht beim Amtsgericht (§ 2). Örtlich zählt grundsätzlich der allgemeine Gerichtsstand, bei abweichendem Mittelpunkt einer selbstständigen wirtschaftlichen Tätigkeit der dortige Gerichtsbezirk (§ 3). Beachte landesrechtliche Konzentrationsregelungen.'),
    section('eroeffnung', 'Masse, Tabelle und Verteilung',
      p('Das Gericht kann vorläufige Sicherungsmaßnahmen treffen (§ 21 InsO). Bei Eröffnung trifft es die Entscheidungen nach § 27. Reicht das Vermögen voraussichtlich nicht für die Kosten aus, weist es den Antrag grundsätzlich mangels Masse ab (§ 26). Ausnahmen bestehen etwa bei Kostenvorschuss oder bewilligter Stundung. Die ', term('Insolvenzmasse', 'begriff-insolvenzmasse'), ' erfasst grundsätzlich das dem Schuldner bei Eröffnung gehörende und während des Verfahrens hinzukommende Vermögen (§ 35).'),
      p('Insolvenzgläubiger nach § 38 haben einen bei Eröffnung bereits begründeten persönlichen Vermögensanspruch und melden Forderung, Betrag und Grund beim Insolvenzverwalter an (§ 174). Belege helfen bei der Prüfung. §§ 176–178 regeln Prüfung, Widerspruch und Feststellung zur Tabelle. Insolvenzgläubiger verfolgen ihre Ansprüche nach § 87 nur nach dem Verfahrensrecht, § 89 beschränkt die Einzelvollstreckung. Massekosten und sonstige Masseverbindlichkeiten sind aus der Masse vorweg zu berichtigen (§§ 53–55). Nachrangige Insolvenzforderungen (§ 39), gesicherte Forderungen und Aufrechnungsrechte (§§ 94–96) folgen eigenen Regeln.')),
    section('rechnung', 'Insolvenzquote berechnen',
      p('Für eine vereinfachte einheitliche Verteilung unter gleichrangigen Forderungen gilt: ', term('Insolvenzquote', 'begriff-insolvenzquote'), ' = für diese Gruppe verfügbarer Verteilungsbetrag ÷ Summe der teilnehmenden Forderungen × 100. Die Auszahlung für einen Gläubiger ist seine berücksichtigte Forderung mal Quote als Dezimalzahl. Verwende den tatsächlich verfügbaren Betrag nach den vorrangigen Positionen.')),
    practice('rechnung-uebung', 'Auszahlung für eine Zulieferin',
      'Im eröffneten Verfahren stehen 36.000 € endgültig für die gleichrangigen Insolvenzforderungen zur Verfügung. Die berücksichtigten Forderungen betragen insgesamt 240.000 €. Eine Zulieferin hat eine festgestellte Forderung von 9.000 €. Berechne Quote und Auszahlung und benenne die Rechtsgrundlage der Forderungsanmeldung.',
      '36.000 € ÷ 240.000 € = 15 %. 9.000 € × 0,15 = 1.350 € Auszahlung. Die Forderung wird gemäß § 174 InsO beim Insolvenzverwalter angemeldet. Die Quote beschreibt diese Verteilung nach dem Sachverhalt.'),
  ], [
    ['begriff-insolvenzmasse', 'Insolvenzmasse', 'Das vom Insolvenzverfahren erfasste Vermögen des Schuldners (§ 35 InsO).'],
    ['begriff-insolvenzquote', 'Insolvenzquote', 'Prozentualer Anteil der berücksichtigten Forderung, der aus dem für die jeweilige Gläubigergruppe verfügbaren Betrag befriedigt wird.'],
  ]);

article('aus-absonderung', '4.6.2', 'Aussonderung und Absonderung',
  'Ein Recht auf Herausgabe eines fremden Gegenstands hat eine andere Wirkung als ein abgesicherter Zugriff auf dessen Verwertungserlös.',
  [
    section('aus', 'Aussonderung eines massefremden Gegenstands',
      p('Bei der ', term('Aussonderung', 'begriff-aussonderung'), ' kann eine Person nach § 47 InsO aufgrund eines dinglichen oder persönlichen Rechts geltend machen, dass ein Gegenstand nicht zur Insolvenzmasse gehört. Der Herausgabeanspruch richtet sich nach dem sonst anwendbaren Recht, beispielsweise §§ 985, 986 BGB. Der Eigentümer einer verliehenen Sache prüft Leihdauer und Rückgabefälligkeit, etwa nach § 604 BGB.'),
      'Bei unter einfachem Eigentumsvorbehalt gelieferten Waren prüfe Identifizierbarkeit, fortbestehendes Eigentum, Besitzrecht und die Regeln der §§ 103, 107 InsO zur Vertragserfüllung. Will der Insolvenzverwalter den Vertrag erfüllen, bleibt die wirtschaftliche Frage, wie mit offener Gegenleistung umzugehen ist. Eine eigenmächtige Abholung ist keine Ausübung des Aussonderungsrechts.'),
    section('ab', 'Vorrangige Befriedigung aus einem Verwertungserlös',
      p('Die ', term('Absonderung', 'begriff-absonderung'), ' soll einen gesicherten Gläubiger aus dem Erlös eines belasteten Vermögenswerts vorrangig befriedigen. Beispiele sind Grundpfandrechte (§ 49 InsO), Pfandrechte (§ 50), Sicherungsübereignung und Sicherungsabtretung (§ 51). Je nach Sicherheit und Zuständigkeit greifen eigene Verwertungsregeln, Kostenabzüge und Rangfolgen. Überschüsse können der Masse zustehen. Ein Ausfall kann bei persönlicher Haftung des Schuldners nach § 52 als Insolvenzforderung berücksichtigt werden.')),
    practice('kuehltechnik', 'Fremde Anlage und gesicherte Forderung',
      'Bei einem insolventen Veranstalter steht eine ausgeliehene, nach Ende der Leihzeit zurückzugebende Lichtanlage. Zudem hält seine Bank ein wirksames Pfandrecht an einem anderen, eigenen Gerät des Veranstalters. Ordne beide Rechte zu.',
      'Die Verleiherin bleibt Eigentümerin und kann nach § 47 InsO i. V. m. §§ 604 bzw. 985, 986 BGB die fällige Herausgabe der Lichtanlage geltend machen. Die Bank erhält für das Pfandrecht grundsätzlich Absonderung nach § 50 InsO. Ihre Befriedigung richtet sich nach Verwertung, Kosten und Rang.'),
  ], [
    ['begriff-aussonderung', 'Aussonderung', 'Geltendmachung, dass ein vorhandener Gegenstand aufgrund eines dinglichen oder persönlichen Rechts nicht zur Insolvenzmasse gehört (§ 47 InsO).'],
    ['begriff-absonderung', 'Absonderung', 'Vorrangige Befriedigung eines gesicherten Gläubigers aus der Verwertung des belasteten Vermögenswerts (§§ 49–52 InsO).'],
  ]);

article('handelsgeschaeft-einstieg', '4.7', 'Handelsgeschäfte bei Einkauf und Verkauf',
  'Ob ein Geschäft dem HGB unterfällt, prüfst du für jede beteiligte Seite. Das HGB ergänzt das BGB um Sonderregeln des Handelsverkehrs.',
  [
    section('zuordnung', 'Kaufmann und Betriebsbezug',
      p('Ein ', { text: 'Handelsgeschäft', termId: 'recht-hw-handelsgeschaeft' }, ' ist nach § 343 HGB ein Geschäft eines Kaufmanns, das zum Betrieb seines Handelsgewerbes gehört. Dazu kann der Einkauf von Büro- und Verbrauchsmaterial als Hilfsgeschäft zählen. § 344 HGB vermutet im Zweifel den Betriebsbezug der von einem Kaufmann vorgenommenen Rechtsgeschäfte. Prüfe zunächst die ', link('Kaufmannseigenschaft', 'kaufmannseigenschaft'), ' der Beteiligten und danach den Betriebsbezug.'),
      p('Manche Vorschriften knüpfen an ein für eine Seite kaufmännisches Geschäft an, andere an ein beiderseitiges. Die ', link('Untersuchungs- und Rügeobliegenheit', 'handelskauf-ruege'), ' bei Waren setzt einen für beide Seiten kaufmännischen Kauf voraus. Kaufleute können untereinander für Forderungen aus beiderseitigen Handelsgeschäften gemäß § 353 HGB ab Fälligkeit Zinsen verlangen. Die Verzugszinsen nach § 288 BGB sind gesondert zu prüfen.')),
    practice('hilfsgeschaeft', 'Eigener Bedarf und Betriebseinkauf',
      'Eine eingetragene Einzelkauffrau kauft privat Ausrüstung für ihren Hobbygarten und für ihren Betrieb Ersatzpatronen. Ordne den Betriebsbezug der Geschäfte auf Käuferseite ein.',
      'Der private Einkauf gehört nach dem Sachverhalt nicht zum Betrieb. Die Patronen dienen als Hilfsgeschäft dem Betrieb, auch wenn sie nicht selbst weiterverkauft werden. Ob ein beiderseitiges Handelsgeschäft vorliegt, setzt zusätzlich die Prüfung der Verkäuferseite voraus.'),
  ]);

article('maengelruege-kurzfall', '4.7.1', 'Mängelrüge bei offenem oder verdecktem Mangel',
  'Nach einer mangelhaften Warenlieferung hängt die Durchsetzbarkeit von Käuferrechten im beiderseitigen Handelskauf auch von Untersuchung und Anzeige ab.',
  [
    section('obliegenheit', 'Ablieferung, Untersuchung und Anzeige',
      p('Ein beiderseitiger Handelskauf löst die ', { text: 'Untersuchungs- und Rügeobliegenheit', termId: 'recht-vt-begriff-untersuchungs-ruegeobliegenheit' }, ' nach § 377 HGB aus. Der Käufer untersucht unverzüglich nach Ablieferung, soweit es im ordnungsgemäßen Geschäftsgang möglich ist, und zeigt erkennbare Mängel unverzüglich an. Bei verborgenem Mangel entsteht die Anzeigepflicht mit der Entdeckung. Rechtzeitige Absendung genügt (§ 377 Abs. 4).'),
      p('Bei versäumter Anzeige gilt die Ware hinsichtlich des betroffenen Mangels als genehmigt (§ 377 Abs. 2 und 3). Arglistiges Verschweigen schließt die Berufung des Verkäufers auf die Vorschrift aus (§ 377 Abs. 5). Sind die Käuferrechte wegen des Mangels erhalten, prüfe ', link('Nacherfüllung', 'kauf-nacherfuellung'), ' und ', link('weitere Mängelrechte', 'kauf-sekundaerrechte'), ' nach § 437 BGB.')),
    practice('wareneingang', 'Verdeckter Funktionsfehler in einer Serie',
      'Ein Elektronikgroßhändler liefert einer gewerblich betriebenen Messebaufirma 40 Netzteile. Der Kauf ist für beide Seiten ein Handelsgeschäft. Eine zumutbare Eingangsprüfung konnte einen erst unter Last auftretenden Serienfehler nicht erkennen. Welche Schritte sind nach Entdeckung nötig, und wie wirkt sich bewusstes arglistiges Verschweigen aus?',
      'Nach Entdeckung unverzüglich den Fehler gegenüber dem Verkäufer anzeigen und die Sendung dokumentieren (§ 377 Abs. 3 und 4 HGB). Bei versäumter Anzeige gilt die Ware in Bezug auf den Fehler als genehmigt. Hat der Verkäufer den Mangel arglistig verschwiegen, kann er sich gemäß Abs. 5 darauf nicht berufen. In diesem Fall bleiben die Voraussetzungen der Mängelrechte nach § 437 BGB gesondert zu prüfen.'),
  ]);
