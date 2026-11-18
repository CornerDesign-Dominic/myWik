import type { Article, ArticleSection, Chapter, GlossaryTerm, RichText } from '../types';

const subjectId = 'recht';
const updatedAt = Date.UTC(2026, 10, 18);
const prefix = (id: string) => 'recht-' + id;
const root = 'handelsvollmachten-publizitaet';
const term = (id: string, text: string): RichText => ({ text, termId: prefix('vollmacht-begriff-' + id) });
const link = (id: string, text: string): RichText => ({ text, articleId: prefix(id) });

function section(id: string, title: string, ...paragraphs: (string | (RichText | string)[])[]): ArticleSection {
  return {
    id,
    title,
    paragraphs: paragraphs.map(paragraph => typeof paragraph === 'string' ? [{ text: paragraph }]
      : paragraph.map(part => typeof part === 'string' ? { text: part } : part)),
  };
}

const check = (question: string, answer: string): ArticleSection => ({
  ...section('transfer', 'Selbstkontrolle und Transfer', question),
  hint: { label: 'SELBSTKONTROLLE', title: 'Musterantwort', content: answer },
});
const sources = (...urls: string[]) => section('rechtsstand', 'Amtliche Rechtsgrundlagen',
  'Rechtsstand: 18. November 2026.', ...urls);
const hgb = (n: number) => `§ ${n} HGB · https://www.gesetze-im-internet.de/hgb/__${n}.html`;
const bgb = (n: number) => `§ ${n} BGB · https://www.gesetze-im-internet.de/bgb/__${n}.html`;

const lessons = [
  {
    id: root, number: '5.9', title: 'Handelsvollmachten und Registerpublizität',
    intro: 'Wer für ein Unternehmen einen Vertrag abschließt, braucht dafür Vertretungsmacht. Welchen Umfang sie hat und was ein Geschäftspartner entgegengehalten bekommt, hängt vom Vollmachtstyp und gegebenenfalls vom Handelsregister ab.',
    sections: [
      section('pruefweg', 'So prüfst du ein Geschäft mit Vertreter',
        'Beginne beim Anspruch, etwa Zahlung oder Übergabe aus § 433 BGB. Prüfe den Vertrag, dann für jede Vertretererklärung § 164 Abs. 1 BGB. Die Person muss eine eigene Willenserklärung im fremden Namen innerhalb ihrer Vertretungsmacht abgeben.',
        ['Bestimme danach den Typ. Die ', link('prokura-umfang', 'Prokura'), ' hat einen weitgehend gesetzlichen Außenumfang. Die ', link('handlungsvollmacht', 'Handlungsvollmacht'), ' ist auf gewöhnliche Geschäfte des erteilten Bereichs zugeschnitten. Bei Geschäften im Laden oder offenen Warenlager kommt die ', link('zeichnung-laden', 'Ladenvollmacht'), ' in Betracht. Fehlt die Vertretungsmacht, prüfe Genehmigung und gesetzlichen Rechtsschein.'],
        ['Die ', term('aussenumfang', 'Vertretungsmacht im Außenverhältnis'), ' und die betriebliche Anweisung im Innenverhältnis sind getrennt zu bewerten. Durch diese Trennung kann ein Geschäft extern wirksam sein, obwohl der Beschäftigte gegen eine interne Freigabe verstößt.']),
      sources(bgb(164), bgb(177), hgb(49), hgb(50), hgb(54), hgb(56)),
      check('Eine Einkaufsangestellte unterschreibt für ihre GmbH. Welchen Zweck erfüllt die Prüfung von Vertragsinhalt, Vertretungsmacht und interner Freigabe jeweils?',
        'Der Vertragsinhalt zeigt, welche Erklärungen aufeinanderpassen und welche Pflicht folgt. Die Vertretungsmacht beantwortet, ob die GmbH an die Erklärung gebunden ist. Die Freigabe regelt das betriebliche Dürfen und kann je nach Vollmacht im Außenverhältnis eine andere Wirkung haben.'),
    ],
  },
  {
    id: 'handlungsvollmacht', number: '5.9.1', title: 'Handlungsvollmacht nach § 54 HGB',
    intro: 'Eine Handlungsvollmacht deckt die gewöhnlichen Geschäfte ab, die zu dem erteilten Aufgabenbereich eines Handelsgewerbes gehören.',
    sections: [
      section('arten', 'General-, Art- und Einzelvollmacht',
        ['Eine ', term('handlungsvollmacht', 'Handlungsvollmacht'), ' kann ausdrücklich oder durch schlüssiges Verhalten erteilt werden. Erteilen kann sie der Geschäftsinhaber oder ein Vertreter mit passender Befugnis, etwa ein zur Organisation des Einkaufs befugter Prokurist. Erteilung und Erlöschen werden nicht ins Handelsregister eingetragen.'],
        ['Die Generalhandlungsvollmacht betrifft die gewöhnlichen Geschäfte des laufenden Handelsgewerbes, die ', term('artvollmacht', 'Artvollmacht'), ' eine Geschäftskategorie, etwa Beschaffung von Rohstoffen. Einzelvollmacht deckt einen konkreten Auftrag. Entscheidend ist die tatsächlich erteilte Befugnis und der in diesem Bereich übliche Umfang.'],
        'Arbeitsverträge oder übliche Bankgeschäfte können zum Rahmen einer passenden Handlungsvollmacht gehören. Neue Filialen sind nur erfasst, wenn die konkrete Entscheidung zum gewöhnlichen Betrieb und zur erteilten Befugnis gehört. Ein Materialeinkäufer darf bei entsprechender Artvollmacht Verbrauchsmaterial im Namen seines Arbeitgebers bestellen. Der Absatz eines gebrauchten Gabelstaplers fällt regelmäßig nicht schon deshalb in diesen Bereich, weil der Stapler im eigenen Lager steht.'),
      section('grenzen', 'Sonderbefugnis, Kenntnis und Genehmigung',
        'Für Grundstücksveräußerung oder -belastung, Wechselverbindlichkeiten, Darlehensaufnahme und Prozessführung verlangt § 54 Abs. 2 HGB eine besondere Befugnis. Weitere interne Begrenzungen eines an sich erteilten Bereichs muss ein Dritter nach § 54 Abs. 3 HGB gegen sich gelten lassen, wenn er sie kannte oder kennen musste.',
        'Eine engere Art der erteilten Vollmacht und ein zusätzliches Wertlimit sind verschiedene Fragen. Jemandem mit reiner Einkaufsbefugnis fehlt für Verkaufsgeschäfte bereits die entsprechende Artvollmacht. Bei einer bloßen Vorgabe, unter einer bestimmten Summe zu bestellen, prüfst du die Kenntnis oder das Kennenmüssen der Gegenpartei.'),
      sources(hgb(54), hgb(57), hgb(58), bgb(167), bgb(177)),
      check('Eine Einkaufsleiterin mit Artvollmacht für Verpackungsmaterial unterschreibt für das Unternehmen einen Kredit zur Finanzierung neuer Regale. Kann die Lieferantin auf ihre Stellung allein vertrauen?',
        'Aus der Funktion und der Einkaufsvollmacht folgt keine besondere Darlehensbefugnis nach § 54 Abs. 2 HGB. Ohne eine andere tragfähige Vollmacht oder einschlägigen Rechtsschein ist das Kreditgeschäft bei Vertragsschluss nach § 177 BGB von der Genehmigung abhängig.'),
    ],
  },
  {
    id: 'prokura-umfang', number: '5.9.2', title: 'Prokura erteilen und ihren Umfang prüfen',
    intro: 'Prokura ist eine handelsrechtliche Vollmacht mit weitgehend gesetzlich festgelegtem Umfang. Sie umfasst auch außergewöhnliche Geschäfte, soweit der Betrieb eines Handelsgewerbes sie mit sich bringt.',
    sections: [
      section('erteilung', 'Erklärung, Register und Widerruf',
        ['Die ', term('prokura', 'Prokura'), ' erteilt der Inhaber des Handelsgeschäfts oder sein gesetzlicher Vertreter ausdrücklich (§ 48 HGB). Ein bereits ernannter Prokurist kann sie nicht allein kraft eigener Prokura weitergeben oder für andere erteilen.'],
        ['Die Anmeldung ist vorgeschrieben. Die Eintragung wirkt ', term('deklaratorisch', 'deklaratorisch'), '. Die wirksam erteilte Prokura kann bereits vor Eintragung ausgeübt werden. Sie ist jederzeit widerruflich, nicht übertragbar und erlischt nicht allein mit dem Tod des Geschäftsinhabers. Auch ihr Erlöschen ist anzumelden. Im Umgang mit Dritten kann die Registerpublizität hinzukommen.']),
      section('umfang', 'Betriebsgeschäft und Grundlagengeschäft',
        'Ratenkauf eines Firmenfahrzeugs, seine Finanzierung über ein Darlehen und die Entgegennahme einer Zahlung können zum Umfang gehören. Bei einer Kündigung vervollständigen das Arbeitsrecht und gegebenenfalls § 174 BGB die Prüfung. Prokura allein erlaubt nach § 49 Abs. 2 HGB keine Grundstücksveräußerung oder -belastung. Der Erwerb eines Grundstücks ist von der Ausnahme nicht erfasst.',
        'Geschäfte über die Grundlagen des Unternehmens, etwa Betriebseinstellung, Verkauf des gesamten Unternehmens oder Änderungen des Gesellschafterbestands, gehören nicht zur Prokura. Auch die Pflicht zur Unterzeichnung des Jahresabschlusses nach § 245 HGB übernimmt der Prokurist nicht. Für eine Insolvenzanmeldung sind Antragsrecht bzw. Antragspflicht und Vertretungsgrundlage eigenständig zu prüfen. Ein Insichgeschäft unterliegt außerdem § 181 BGB.',
        'Ein internes Limit von 80.000 € bindet grundsätzlich nur intern. Bei kollusivem Zusammenwirken zum Nachteil des Unternehmens oder objektiv evidentem Missbrauch kann dessen Einwand greifen. Ein bloßes Überschreiten eines Limits beweist keinen solchen Ausnahmefall.'),
      sources(hgb(48), hgb(49), hgb(50), hgb(52), hgb(53), hgb(245), bgb(174), bgb(181),
        'BGH, Urteil vom 14. Juni 2016, XI ZR 483/14, Rn. 22–24 · https://juris.bundesgerichtshof.de/cgi-bin/rechtsprechung/document.py?Gericht=bgh&nr=75337'),
      check('Eine neu ernannte Prokuristin bestellt ein Fahrzeug für 95.000 € bei internem Limit von 70.000 €. Sie ist noch nicht eingetragen. Was ändert sich, wenn sie zur Finanzierung das Firmengrundstück mit einer Grundschuld belastet?',
        'Eine ausdrücklich erteilte Prokura kann die Fahrzeugbestellung trotz fehlender Eintragung tragen. Das Wertlimit wirkt regelmäßig nur intern. Die Belastung des Grundstücks verlangt dagegen eine besondere Befugnis nach § 49 Abs. 2 HGB. Ohne sie reicht die Prokura dafür nicht aus.'),
    ],
  },
  {
    id: 'prokura-arten', number: '5.9.3', title: 'Einzel-, Gesamt- und Filialprokura',
    intro: 'Je nach Gestaltung handelt die beauftragte Person allein, gemeinsam mit weiteren Berechtigten oder für eine entsprechend gekennzeichnete Niederlassung.',
    sections: [
      section('kombinationen', 'Wer wirksam mitzeichnen muss',
        ['Einzelprokura erlaubt Alleinvertretung. Bei echter ', term('gesamtprokura', 'Gesamtprokura'), ' handeln die nach der Erteilung erforderlichen Prokuristen gemeinsam. Bei halbseitiger Gesamtprokura kann eine Person allein handeln, während eine andere auf die Mitwirkung der dafür bestimmten Person angewiesen ist.'],
        'Bei gemischter oder unechter Gesamtvertretung tritt ein Prokurist zusammen mit einem Organvertreter, etwa einem Geschäftsführer, auf. Prüfe die konkrete Vertretungsregel und die Eintragung. Die Mitwirkung eines beliebigen Mitarbeitenden erfüllt keine solche Regel.'),
      section('niederlassung', 'Filialprokura und Arbeitsort trennen',
        ['Eine ', term('filialprokura', 'Filialprokura'), ' kann gegenüber Dritten nur wirksam auf eine Niederlassung beschränkt werden, wenn die Firmen unterscheidbar sind. Ein die Zweigniederlassung kennzeichnender Firmenzusatz kann genügen (§ 50 Abs. 3 HGB). Der bloße interne Einsatz an einem Standort reicht dafür nicht.'],
        'Eine Mitarbeiterin arbeitet dauerhaft in der Filiale Nord. Entscheidend für die Außenwirkung sind die erteilte Prokura und die firmenrechtliche Kennzeichnung. Interner Arbeitsort und Außenvertretung sind unterschiedliche Fragen.'),
      sources(hgb(48), hgb(50), hgb(53)),
      check('B hat Gesamtprokura zusammen mit A. A verfügt zusätzlich über Einzelprokura. Darf B allein unterschreiben, wenn A im Urlaub ist?',
        'B ist an die gemeinschaftliche Vertretung gebunden und darf bei dieser Regelung nicht allein handeln. A kann aufgrund der eigenen Einzelprokura selbst wirksam handeln. Die Abwesenheit von A ändert die Art der Erteilung nicht.'),
    ],
  },
  {
    id: 'zeichnung-laden', number: '5.9.4', title: 'Zeichnung, Ladenvollmacht und betriebliche Hilfspersonen',
    intro: 'Ein Namenszusatz kann die Funktion des Unterzeichnenden offenlegen. Ob das Unternehmen gebunden wird, ergibt sich aus der Vertretungsmacht und der Rolle im konkreten Geschäft.',
    sections: [
      section('zeichnung', 'Die Zusätze ppa., i. V. und i. A. einordnen',
        'Nach § 51 HGB zeichnet der Prokurist mit Firma, eigenem Namen und erkennbarem Prokurazusatz wie ppa. Ein Handlungsbevollmächtigter verwendet nach § 57 HGB einen Hinweis auf seine Vollmacht und keinen Prokurazusatz. i. V. kann auf Vertretung hindeuten. i. A. kann je nach Zusammenhang bloße Übermittlung oder eigenes Auftreten mit Vollmacht anzeigen. Ein Kürzel ersetzt keine Erteilung.',
        'Wenn jemand eine fertige Erklärung der Leitung nur überbringt, kann er als Bote handeln. Entscheidet er selbst im eingeräumten Rahmen über den Abschluss, kommt eine Vertretererklärung in Betracht. Prüfe Auftreten, Entscheidungsspielraum und Vollmachtsgrundlage zusammen.'),
      section('laden', 'Verkaufen und entgegennehmen im Laden',
        ['Die ', term('ladenvollmacht', 'Ladenvollmacht'), ' nach § 56 HGB erfasst gewöhnliche Verkäufe und Empfangnahmen durch im Laden oder offenen Warenlager angestellte Personen. Welche Geschäfte gewöhnlich sind, hängt vom Betriebstyp ab. Ein ausschließlich internes Betriebslager, eine Fabrik oder ein Büro ohne Verkaufsbereich reichen nicht. Die Person muss mit Wissen und Willen des Geschäftsinhabers im Verkauf eingesetzt sein. Eine bloß anwesende Aushilfe zum Regaleinräumen genügt nicht. Prüfe auch den örtlichen Bezug des Geschäfts zur Verkaufsstelle.'],
        'Angestellte im Werkzeuggeschäft können beim üblichen Verkauf Ware und Kaufpreis austauschen. Aus ihrer Ladenfunktion folgt keine Befugnis, den privaten Gebrauchtwagen des Inhabers oder betriebliches Anlagevermögen zu verkaufen. Auch die Stellung als kaufmännischer Angestellter begründet für sich keine allgemeine Abschlussvollmacht.'),
      sources(hgb(51), hgb(56), hgb(57), hgb(59), bgb(164)),
      check('Ein Verkäufer unterschreibt in einem Baumarkt i. A. verkauft Werkzeug und nimmt den Kaufpreis für das Geschäft entgegen. Welche Rolle spielt das Kürzel?',
        'Die Bezeichnung ist nur ein Indiz. Beim üblichen Verkauf und der Empfangnahme im Laden kommt § 56 HGB in Betracht. Für ein atypisches Geschäft müsste eine andere Grundlage geprüft werden.'),
    ],
  },
  {
    id: 'handelsregister-publizitaet', number: '5.9.5', title: 'Handelsregisterpublizität nach § 15 HGB',
    intro: 'Die Registerpublizität schützt unter bestimmten Voraussetzungen den Geschäftsverkehr, wenn eintragungspflichtige Tatsachen fehlen, ordnungsgemäß veröffentlicht wurden oder unrichtig eingetragen sind.',
    sections: [
      section('drei-faelle', 'Fehlend, richtig oder unrichtig eingetragen',
        ['Die ', term('registerpublizitaet', 'Handelsregisterpublizität'), ' behandelt drei Ausgangslagen. Bei einer eintragungspflichtigen und noch nicht eingetragenen und bekannt gemachten Tatsache greift § 15 Abs. 1 HGB. Sie kann einem Dritten regelmäßig nicht entgegengehalten werden, solange er sie nicht kennt.'],
        'Bei richtiger Eintragung und Bekanntmachung muss ein Dritter die Tatsache grundsätzlich gegen sich gelten lassen (§ 15 Abs. 2 HGB). Für Rechtshandlungen innerhalb der ersten 15 Tage kann er sich entlasten, wenn er beweist, dass er sie weder kannte noch kennen musste. Die Vorschrift ist keine allgemeine Schonfrist.',
        'Bei einer unrichtig eingetragenen und bekannt gemachten Tatsache kann sich der Dritte unter den Voraussetzungen des § 15 Abs. 3 HGB auf den Registerinhalt berufen. Das gilt nicht bei Kenntnis der Unrichtigkeit. Prüfe jeweils Eintragungspflicht, die konkrete Tatsache, den maßgeblichen Zeitpunkt und die Kenntnislage.'),
      section('zeitachse', 'Widerruf, Abrufbarkeit und Vertrag trennen',
        'Beispiel. Am Montag wird die Prokura widerrufen. Die Bekanntmachung erfolgt am Freitag. Am Mittwoch bestellt die frühere Prokuristin im Namen des Unternehmens Bürogeräte bei einem Lieferanten, der den Widerruf nicht kennt. Die Vollmacht ist tatsächlich erloschen. Das Unternehmen kann dem Lieferanten das Erlöschen nach § 15 Abs. 1 HGB im Regelfall noch nicht entgegenhalten.',
        'Heute erfolgt die Bekanntmachung grundsätzlich durch die erstmalige elektronische Abrufbarkeit nach § 10 HGB. Für die Prüfung muss der zeitliche Ablauf klar sein. Entscheidend für die Bindung an die Erklärung ist hier der Abschluss, nicht erst der Zeitpunkt der Lieferung.'),
      sources(hgb(10), hgb(15), hgb(52), hgb(53)),
      check('Was ändert sich im Beispiel, wenn der Lieferant am Dienstag eine nachweislich gelesene Nachricht über den Widerruf erhält?',
        'Die tatsächliche Kenntnis schließt den Schutz nach § 15 Abs. 1 HGB aus. Die am Mittwoch handelnde Person hatte keine Prokura mehr. Ohne eine andere Vollmacht, einen anderen tragfähigen Rechtsschein oder Genehmigung kann das Unternehmen daraus nicht wirksam gebunden werden.'),
    ],
  },
  {
    id: 'fall-handelsvollmachten', number: '5.9.6', title: 'Übungsfall: Handelsvollmacht, Prokura und Widerruf',
    intro: 'Ein technischer Großhändler lässt die Liefer- und Zahlungsverpflichtung für drei getrennte Geschäfte prüfen. Für jedes Geschäft ist die Befugnis zum Zeitpunkt des Vertragsschlusses entscheidend.',
    sections: [
      section('einkauf', 'Fall A. Einkaufsvollmacht und Baumaschinenverkauf',
        'Eine Person mit Artvollmacht für Kabelbeschaffung verkauft im Namen des Unternehmens eine ausrangierte Maschine. Die Geschäftsleitung erfährt erst am Abholtag davon und genehmigt den Vertrag nicht.',
        'Leite die mögliche Lieferpflicht aus § 433 Abs. 1 BGB ab. Prüfe die Vertretererklärung nach § 164 BGB und die Artvollmacht nach § 54 HGB. Die Art der Geschäfte deckt den Verkauf nicht. Der Vertrag ist zunächst von der Genehmigung abhängig und bindet nach Verweigerung das Unternehmen nicht (§ 177 BGB). Eine Vertreterhaftung gemäß § 179 BGB ist eine weitere, gesondert zu prüfende Frage.'),
      section('bestellung', 'Fall B. Wirksam erteilt, noch nicht eingetragen',
        'Eine Prokuristin bestellt Lagereinrichtung für 120.000 €. Sie wurde ausdrücklich ernannt und ist noch nicht im Register eingetragen. Die innerbetriebliche Grenze beträgt 75.000 €. Hinweise auf Missbrauch liegen im Fall nicht vor.',
        'Für die Bestellung reicht die Prokura. Die Eintragung ist deklaratorisch, und die interne Summe beschränkt den Außenumfang grundsätzlich nicht. Bei wirksamem Kaufvertrag und unterstellter Fälligkeit ist der Kaufpreis nach § 433 Abs. 2 BGB geschuldet.'),
      section('widerruf', 'Fall C. Widerrufen, noch nicht bekannt gemacht',
        'Die Prokura einer anderen Person wird widerrufen. Vor Eintragung und Bekanntmachung bestellt sie Waren. Der Lieferant kennt den Widerruf nicht. Er kann sich regelmäßig auf § 15 Abs. 1 HGB stützen. Der Testzeitpunkt ist die Bestellung. Die spätere Eintragung beseitigt diesen Schutz nicht rückwirkend.'),
      sources(bgb(164), bgb(177), bgb(179), bgb(433), hgb(15), hgb(48), hgb(49), hgb(50), hgb(53), hgb(54)),
      check('Wie unterscheidet sich die Begründung, warum das Unternehmen in Fall B und C gebunden ist?',
        'In B hatte die Vertreterin tatsächlich Prokura. Die noch ausstehende Eintragung und eine interne Preisgrenze nehmen ihr beim gewöhnlichen Abschluss die Außenbefugnis nicht. In C war die Prokura erloschen. Der gutgläubige Lieferant wird geschützt, weil das Unternehmen ihm die noch nicht veröffentlichte eintragungspflichtige Tatsache nach § 15 Abs. 1 HGB nicht entgegenhalten kann.'),
    ],
  },
];

export const chapters: Chapter[] = lessons.map(({ id, number, title }) => ({
  id: prefix(id), number, title, articleId: prefix(id), subjectId,
  parentId: prefix(id === root ? 'handelsrecht' : root),
}));
export const articles: Article[] = lessons.map(({ id, number, title, intro, sections }) => ({
  id: prefix(id), chapterId: prefix(id), number, title, intro, sections, updatedAt, version: 1, subjectId,
}));

const definitions: [string, string, string, string][] = [
  ['aussenumfang', 'Vertretungsmacht im Außenverhältnis', 'Befugnis, gegenüber Dritten eine Erklärung mit Wirkung für den Vertretenen abzugeben oder entgegenzunehmen.', root],
  ['handlungsvollmacht', 'Handlungsvollmacht', 'Handelsrechtliche Vollmacht für die gewöhnlichen Geschäfte des erteilten Tätigkeitsbereichs nach § 54 HGB.', 'handlungsvollmacht'],
  ['artvollmacht', 'Artvollmacht', 'Handlungsvollmacht für bestimmte Arten von Geschäften, etwa den Wareneinkauf.', 'handlungsvollmacht'],
  ['prokura', 'Prokura', 'Ausdrücklich erteilte, ihrem Außenumfang nach gesetzlich geregelte Vertretungsmacht für Geschäfte des Handelsgewerbes nach §§ 48 ff. HGB.', 'prokura-umfang'],
  ['deklaratorisch', 'Deklaratorische Registereintragung', 'Eintragung, die eine bereits wirksame Rechtslage dokumentiert, etwa die vorher wirksam erteilte Prokura.', 'prokura-umfang'],
  ['gesamtprokura', 'Gesamtprokura', 'Form der Prokura, die nach der Erteilung grundsätzlich gemeinschaftliches Handeln der bestimmten Berechtigten voraussetzt.', 'prokura-arten'],
  ['filialprokura', 'Filialprokura', 'Auf eine Niederlassung beschränkte Prokura, die bei Einhaltung der besonderen Voraussetzungen des § 50 Abs. 3 HGB auch Dritten gegenüber begrenzt ist.', 'prokura-arten'],
  ['ladenvollmacht', 'Ladenvollmacht', 'Gesetzlich geregelte Befugnis zum gewöhnlichen Verkauf und zur Empfangnahme durch Angestellte eines Ladens oder offenen Warenlagers (§ 56 HGB).', 'zeichnung-laden'],
  ['registerpublizitaet', 'Handelsregisterpublizität', 'Aussagewirkung des Handelsregisters für den Geschäftsverkehr. § 15 HGB regelt den Umgang mit fehlenden, ordnungsgemäßen und unrichtigen Registerangaben.', 'handelsregister-publizitaet'],
];
export const glossary: GlossaryTerm[] = definitions.map(([id, term, definition, articleId]) => ({
  id: prefix('vollmacht-begriff-' + id), term, definition, articleId: prefix(articleId), subjectId,
}));
