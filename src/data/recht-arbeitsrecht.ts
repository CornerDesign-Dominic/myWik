import type { Article, ArticleSection, Chapter, GlossaryTerm, RichText } from '../types';

const subjectId = 'recht';
const updatedAt = Date.UTC(2026, 10, 18);
const revisionDate = Date.UTC(2026, 10, 19);
const revised = new Set(['arbeitsvertrag', 'besonderer-kuendigungsschutz', 'betriebsrat']);
const bgb = 'https://www.gesetze-im-internet.de/bgb/';
const gewo = 'https://www.gesetze-im-internet.de/gewo/';
const kschg = 'https://www.gesetze-im-internet.de/kschg/';
const betrvg = 'https://www.gesetze-im-internet.de/betrvg/';
const tvg = 'https://www.gesetze-im-internet.de/tvg/';
const tzbfg = 'https://www.gesetze-im-internet.de/tzbfg/';
const arbzg = 'https://www.gesetze-im-internet.de/arbzg/';
const burlg = 'https://www.gesetze-im-internet.de/burlg/';
const jarbschg = 'https://www.gesetze-im-internet.de/jarbschg/';
const muschg = 'https://www.gesetze-im-internet.de/muschg_2018/';
const efzg = 'https://www.gesetze-im-internet.de/entgfg/';
const hgb = 'https://www.gesetze-im-internet.de/hgb/';

type Paragraph = string | RichText[];
type Unit = {
  id: string;
  number: string;
  title: string;
  parent?: string;
  added?: boolean;
  intro: string;
  sections: ArticleSection[];
  transfer: [question: string, answer: string];
};

const text = (value: string): RichText => ({ text: value });
const term = (value: string, id: string): RichText => ({ text: value, termId: 'recht-arb-begriff-' + id });
const link = (value: string, articleId: string): RichText => ({ text: value, articleId });

function section(id: string, title: string, ...paragraphs: Paragraph[]): ArticleSection {
  return { id, title, paragraphs: paragraphs.map(p => typeof p === 'string' ? [text(p)] : p) };
}

function question(id: string, title: string, prompt: string, content: string): ArticleSection {
  return { ...section(id, title, prompt), hint: { label: 'SELBSTKONTROLLE', title: 'Musterantwort', content } };
}

function source(pages: string, ...references: string[]): ArticleSection {
  return section('quellen', 'Rechtsstand und Quellen',
    'Recht für WiFaWi 2025, PDF-Seiten ' + pages + '. Prüfung anhand amtlicher Quellen am 18. November 2026.', ...references);
}

function currentSource(...references: string[]): ArticleSection {
  return section('quellen', 'Rechtsstand und Quellen', 'Rechtsabgleich am 19. November 2026.', ...references);
}

const units: Unit[] = [
  {
    id: 'arbeitsrecht', number: '6', title: 'Arbeitsrecht und Sozialschutz',
    intro: 'Das Arbeitsrecht regelt das Arbeitsverhältnis und die kollektive Beteiligung. Prüfe zuerst, welche Rechtsbeziehung und welcher Sachverhalt vorliegen. Dieselbe Personalmaßnahme kann arbeitsvertragliche, kollektivrechtliche und arbeitsschutzrechtliche Anforderungen auslösen.',
    sections: [
      section('pruefwege', 'Vertrag, Beteiligung und Schutz',
        [text('Individualarbeitsrecht regelt etwa den '), link('Arbeitsvertrag', 'recht-arbeitsvertrag'), text(', Arbeitszeit, Vergütung, Urlaub und '), link('Kündigung', 'recht-kuendigung'), text('. Kollektivarbeitsrecht erfasst unter anderem '), link('Tarifverträge', 'recht-tarifvertrag'), text(' und die '), link('Beteiligung des Betriebsrats', 'recht-betriebsrat'), text('. Öffentlicher Arbeitsschutz ergänzt diese Regeln, etwa bei Gefährdungen oder Beschäftigung Jugendlicher.')],
        'Arbeite im Fall mit einer kurzen Normprüfung: Wer beansprucht was gegen wen? Welche Rechtsgrundlage und welche Ausnahme sind einschlägig? Welche konkreten Tatsachen, Fristen und Rechtsfolgen ergeben sich? Trenne etwa Befugnis zur arbeitsvertraglichen Weisung und die vorausgehende Beteiligung des Betriebsrats.'),
      section('ausgangspunkt', 'Weisungen und betriebliche Arbeitsteilung',
        'Spezialisierung teilt Aufgaben nach Kenntnissen und Rollen auf. Das Ordnungsprinzip koordiniert Zuständigkeiten und Zusammenarbeit. Das Direktionsrecht dient der Koordination der arbeitsteiligen Leistung und der betrieblichen Ordnung. Es wirkt innerhalb des rechtlichen Rahmens und erfordert billiges Ermessen. Wer Dauer und Ort der Arbeit schon vertraglich fest vereinbart hat, bindet die Weisungsbefugnis an diese Regelung.',
        [link('Versetzung und Direktionsrecht', 'recht-versetzung'), text(' · '), link('Arbeitsschutz', 'recht-arbeitsschutz'), text(' · '), link('Entgeltfortzahlung', 'recht-entgeltfortzahlung')]),
      section('rechtsquellen', 'Rechtsquellen und Anwendungsvorrang',
        'Im Lernschema reichen die Regeln vom anwendbaren Unionsrecht, Grundgesetz und staatlichem Recht über Tarifvertrag und Betriebsvereinbarung bis zum Arbeitsvertrag und zur konkreten Weisung. Der Rang erklärt, warum eine Weisung eine verbindliche Vertragsregel nicht überschreiben kann. Gesondert zu prüfen sind die Günstigkeit im unmittelbar geltenden Tarifrecht, tarifliche Öffnungsklauseln, der Tarifvorrang bei Mitbestimmung und die Tarifsperre für Betriebsvereinbarungen. Gesetzesvorrang und Spezialität helfen ebenfalls bei der Normauswahl: Prüfe, ob eine speziellere Regel denselben Sachverhalt gerade für diese Personengruppe oder Situation regelt.'),
      source('399–465', 'BGB § 611a: ' + bgb, 'GewO §§ 105–106: ' + gewo, 'TVG: ' + tvg, 'BetrVG: ' + betrvg),
    ],
    transfer: ['Ein Betrieb setzt eine erwachsene Angestellte für zwei Monate in einem anderen Arbeitsbereich ein und plant dabei eine neue Schichteinteilung. Welche Fragen sind zu trennen?',
      'Ist die Zuweisung vom Vertrag und vom billigen Ermessen gedeckt? Liegt eine betriebsverfassungsrechtliche Versetzung vor und greift § 99 BetrVG? Sind Schichteinteilung und vorübergehende Arbeitszeitänderung mitbestimmungspflichtig? Werden Arbeitszeit- und Schutzvorschriften eingehalten?'],
  },
  {
    id: 'arbeitsvertrag', number: '6.1', title: 'Arbeitsvertrag, Nachweis und Weisungsrecht',
    intro: 'Ein Arbeitsvertrag verpflichtet zu persönlich abhängiger Arbeit und zur vereinbarten Vergütung. Abschluss, gesetzliche Nachweispflichten und eine etwaige Befristung haben getrennte Voraussetzungen.',
    sections: [
      section('abschluss', 'Woran erkennst du ein Arbeitsverhältnis?',
        [text('Beim '), term('Arbeitsvertrag', 'arbeitsvertrag'), text(' nach § 611a BGB leistet eine Person weisungsgebundene, fremdbestimmte Arbeit in persönlicher Abhängigkeit. Gesichtspunkte sind Inhalt, Durchführung, Zeit, Dauer und Ort der Tätigkeit sowie Eingliederung. Entscheidend ist die Gesamtwürdigung der tatsächlichen Durchführung. Eine Vertragsüberschrift wie „freie Mitarbeit“ bindet die Einordnung nicht.')],
        'Ein unbefristeter Arbeitsvertrag kann grundsätzlich mündlich oder durch übereinstimmendes schlüssiges Verhalten zustande kommen, soweit keine besondere Formpflicht greift. Prüfe, ob Tätigkeit und Vergütung vereinbart oder bestimmbar sind. Bei einer Befristung kommt es zusätzlich auf die formgerechte Befristungsabrede an.'),
      section('nachweis', 'Wesentliche Arbeitsbedingungen nachweisen',
        [text('Der '), term('Nachweis', 'nachweis'), text(' nach § 2 NachwG dokumentiert unter anderem Beteiligte, Beginn, Ort, Tätigkeit, Vergütung, Arbeitszeit, Urlaub, einschlägige Kollektivregeln und Kündigungsverfahren. Name und Anschrift, Entgelt und Arbeitszeit sind spätestens am ersten Arbeitstag, weitere Angaben spätestens am siebten Kalendertag beziehungsweise nach einem Monat zu dokumentieren. Maßgeblich ist die gesetzliche Zuweisung der einzelnen Angaben.')],
        'Seit 2025 ist für den Nachweis grundsätzlich auch Textform mit elektronischer Übermittlung zulässig, wenn das Dokument zugänglich, speicher- und ausdruckbar ist und der Arbeitgeber einen Empfangsnachweis anfordert. Auf Verlangen ist eine schriftliche Niederschrift auszuhändigen. Für Tätigkeiten in Wirtschaftsbereichen nach § 2a Abs. 1 SchwarzArbG gilt diese Erleichterung nicht, etwa im Gebäudereinigungsgewerbe. Bei einer Kündigung oder Befristung gelten eigene Formregeln.',
        'Praxis: Eine Reinigungskraft vereinbart einen unbefristeten Vertrag mündlich mit einem Reinigungsunternehmen. Der Arbeitsvertrag kann wirksam sein. Der gesonderte Nachweis im Gebäudereinigungsgewerbe ist in der gesetzlich vorgeschriebenen Form zu erteilen.'),
      section('weisung', 'Weisung und Folgen unwirksamer Klauseln',
        [text('Das '), term('Direktionsrecht', 'weisung'), text(' nach § 106 GewO konkretisiert Inhalt, Ort und Zeit der Arbeitsleistung sowie die Ordnung des Betriebs. Es endet an zwingendem Recht, Tarifvertrag, Betriebsvereinbarung und Arbeitsvertrag. Bei seiner Ausübung sind die Interessen beider Seiten, darunter gegebenenfalls Behinderungen, im billigen Ermessen abzuwägen.')],
        'Eine unzulässige Arbeitszeitklausel macht einen im Übrigen wirksamen Vertrag nicht ohne Weiteres insgesamt unwirksam. Prüfe bei Formularbedingungen § 306 BGB, bei Individualvereinbarungen Verbotszweck, § 134 BGB und die Grundsätze zur Teilnichtigkeit. Die Vereinbarung kann Schutzvorschriften nicht ausschalten. Ersetze eine unwirksame Berechnung nicht pauschal durch das höchste gesetzlich erlaubte Stundenmaß.'),
      section('vertiefung', 'Vertragsart und Pflichten im Betrieb',
        [link('Arbeitsvertragsarten und Arbeit auf Abruf', 'recht-arbeitsvertragsarten'), text(' · '), link('Pflichten beider Vertragsparteien', 'recht-arbeitsvertrag-pflichten')]),
      currentSource('Kursunterlage Recht für WiFaWi 2025, PDF-Seiten 399 und 403–409.', 'BGB §§ 134, 139, 306 und 611a: ' + bgb, 'GewO §§ 105–106: ' + gewo,
        'NachwG § 2: https://www.gesetze-im-internet.de/nachwg/__2.html', 'SchwarzArbG § 2a: https://www.gesetze-im-internet.de/schwarzarbg_2004/__2a.html'),
    ],
    transfer: ['Die Beschäftigte stimmt einer mündlichen Einstellung zu, erhält aber kein Dokument. Der Betrieb hält deshalb den Arbeitsvertrag für unwirksam. Wie prüfst du?',
      'Vertragsschluss und Nachweis sind zu trennen. Im Grundsatz ist eine mündliche unbefristete Einigung möglich. Das Fehlen des Nachweises betrifft die Pflichten des Arbeitgebers. Bei Befristung ist gesondert zu prüfen, ob die Befristungsabrede formwirksam vereinbart wurde.'],
  },
  {
    id: 'tarifvertrag', number: '6.2', title: 'Tarifvertrag, Tarifbindung und Günstigkeitsprinzip',
    intro: 'Tarifverträge setzen kollektive Regeln zum Arbeitsverhältnis. Für den Einzelfall prüfst du Tarifparteien, Schriftform, Geltungsbereich und Bindungsgrund. Danach vergleichst du wirksam geltende Regelungen mit dem Arbeitsvertrag.',
    sections: [
      section('parteien', 'Tarifparteien und Inhalte',
        [text('Beim '), term('Tarifvertrag', 'tarifvertrag'), text(' schließen Gewerkschaft und einzelner Arbeitgeber oder Arbeitgebervereinigung eine Vereinbarung. Spitzenorganisationen können unter den Voraussetzungen des § 2 TVG im eigenen Namen oder kraft Vollmacht handeln. Der Tarifvertrag bedarf der Schriftform. Er regelt Rechte und Pflichten der Tarifparteien sowie Rechtsnormen für Arbeitsverhältnisse und betriebliche Fragen.')],
        'Beispiele sind Entgeltstufen, Arbeitszeiten, Urlaub, Urlaubsentgelt, Überstundenzuschläge, Sonderzahlungen, Kündigungs- und Ausschlussfristen, Krankmeldeverfahren und gemeinsame Einrichtungen, etwa zur überbetrieblichen Weiterbildung. Ein Haustarifvertrag und ein Verbandstarifvertrag unterscheiden sich nach der Arbeitgeberseite.'),
      section('bindung', 'Welche Regel gilt konkret?',
        [text('Rechtsnormen wirken bei '), term('Tarifbindung', 'tarifbindung'), text(' nach §§ 3–4 TVG grundsätzlich unmittelbar und zwingend, wenn beide Seiten gebunden sind und das Arbeitsverhältnis in den Geltungsbereich fällt. Weitere Zugänge können Allgemeinverbindlichkeit oder vertragliche Bezugnahme sein. Eine fehlende Tarifbindung beantwortet daher noch nicht jede Frage zur Anwendung. Nachwirkung nach § 4 Abs. 5 und fortdauernde Bindung bis zum Tarifende sind zu unterscheiden.')],
        [text('Das '), term('Günstigkeitsprinzip', 'guenstigkeit'), text(' lässt nach § 4 Abs. 3 TVG günstigere Abweichungen zu. Eine tarifliche Öffnungsklausel kann weitere Abweichungen gestatten. Vergleiche objektiv zusammenhängende Regelungskomplexe und mische nicht beliebig einzelne Vorteile innerhalb eines Komplexes.')],
        'Rechenbeispiel: Der verbindliche Tarifvertrag sieht 26 Tage Urlaub und 300 € Sonderzahlung vor. Der Arbeitsvertrag sieht 29 Tage und 250 € vor. Sind Urlaub und Sonderzahlung im Fall sachlich getrennt, gelten 29 Urlaubstage und 300 € Sonderzahlung. Bei sachlich verknüpften Vorteilen ist die Gruppe zusammen zu vergleichen.'),
      source('400–402', 'TVG §§ 1–5: ' + tvg),
    ],
    transfer: ['Der Tarifvertrag schreibt 38 Stunden pro Woche und eine Jahressonderzahlung von 400 € vor. Ein Arbeitsvertrag verspricht 450 € Sonderzahlung. Darf der Betrieb ohne weitere Prüfung 400 € abrechnen?',
      'Bei unmittelbarer Tarifgeltung und einer eigenständig günstigeren einzelvertraglichen Sonderzahlung gilt grundsätzlich der günstigere Vertrag. Prüfe Anwendungsbereich, Zusammenhang der Leistungen und etwaige Öffnungsregeln. Die tarifliche Regelung erlaubt nicht, einen eigenständigen besseren Vertragsanspruch allein aufgrund des niedrigeren Tarifs zu streichen.'],
  },
  {
    id: 'arbeitszeit', number: '6.3', title: 'Arbeitszeit, Pausen und Nachtarbeit',
    intro: 'Das Arbeitszeitgesetz setzt Grenzen für die Beschäftigung. Rechne Nettoarbeitszeit, Ausgleichszeitraum und Pausen getrennt. Vertrags-, Tarif- und Betriebsvereinbarungsregeln können kürzere Zeiten oder weitere Ansprüche vorsehen.',
    sections: [
      section('grenzen', 'Tägliche Höchstzeit und Ausgleich',
        'Arbeitszeit zählt grundsätzlich ohne Ruhepausen und über mehrere Arbeitgeber zusammengerechnet. § 3 ArbZG setzt werktäglich acht Stunden an. Bis zu zehn Stunden sind möglich, wenn der werktägliche Durchschnitt binnen sechs Kalendermonaten oder 24 Wochen acht Stunden nicht überschreitet. Werktage sind in der Systematik regelmäßig Montag bis Samstag. Plane Abweichungen und Ausgleich statt dauerhaft verlängerte Zeiten anzunehmen.',
        'Beispiel: Fünf Arbeitstage mit je zehn Nettoarbeitsstunden ergeben 50 Stunden. Selbst auf sechs Werktage verteilt sind das 50 ÷ 6 ≈ 8,33 Stunden werktäglich. Ohne Ausgleich im maßgeblichen Zeitraum oder tragfähige Sonderregel passt eine dauerhaft so geplante Woche nicht zur gesetzlichen Grundregel.',
        'Bei mehr als sechs bis zu neun Stunden sind mindestens 30 Minuten Pause nötig, bei mehr als neun Stunden 45 Minuten. Die vorab feststehenden Abschnitte dauern mindestens je 15 Minuten. Mehr als sechs Stunden am Stück ohne Pause sind unzulässig. Nach Arbeitsende ist grundsätzlich eine ununterbrochene Ruhezeit von elf Stunden einzuhalten. Sonn- und Feiertagsarbeit ist nur unter den gesetzlichen Ausnahmen und mit den vorgesehenen Ersatzruhetagen zulässig.'),
      section('nachtarbeit', 'Nachtzeit, Nachtarbeit und Ausgleich trennen',
        [text('Die Nachtzeit reicht grundsätzlich von 23 bis 6 Uhr, in Bäckereien und Konditoreien von 22 bis 5 Uhr. '), term('Nachtarbeit', 'nachtarbeit'), text(' liegt erst bei mehr als zwei Stunden in diesem Zeitraum vor. Von Nachtarbeitnehmern spricht das Gesetz bei regelmäßiger Nachtarbeit in Wechselschicht oder mindestens 48 Nachtarbeitstagen im Kalenderjahr. § 6 ArbZG regelt dafür insbesondere einen kürzeren Ausgleichszeitraum und bei fehlender tariflicher Ausgleichsregelung angemessene freie Tage oder Zuschläge für die in der Nachtzeit geleistete Arbeit.')],
        'Beispiel: Eine Schicht in einer Industriehalle von 4 bis 12 Uhr umfasst höchstens zwei Stunden der Nachtzeit. Das reicht für den Begriff der Nachtarbeit nach § 2 Abs. 4 ArbZG nicht. Ein tariflicher Zuschlag kann dennoch anders ausgestaltet sein. Die Beschäftigte darf eine im Arbeitsvertrag festgelegte Schicht nicht allein wegen eines behaupteten Zuschlagsanspruchs eigenständig verschieben.'),
      source('403–409', 'ArbZG §§ 2–6, 9–11: ' + arbzg, 'GewO § 106: ' + gewo),
    ],
    transfer: ['Eine Schicht läuft von 3 bis 11 Uhr, Pause von 6:15 bis 6:45 Uhr. Ist das Nachtarbeit? Folgt ein bestimmter Zuschlag automatisch?',
      'In einer gewöhnlichen Betriebsstätte fallen drei Arbeitsstunden in die Nachtzeit. Das ist Nachtarbeit. Danach prüfst du, ob die Person Nachtarbeitnehmer im gesetzlichen Sinn ist und ob ein Tarifvertrag oder § 6 Abs. 5 ArbZG einen Ausgleich regelt. Eine feste Prozentzahl ergibt sich allein aus der Einstufung der Schicht nicht.'],
  },
  {
    id: 'erholungsurlaub', number: '6.4', title: 'Erholungsurlaub, Umrechnung und Fehlzeiten',
    intro: 'Gesetzlicher Urlaub ist bezahlte Freistellung zur Erholung. Die Zahl der Urlaubstage richtet sich nach den regelmäßigen Arbeitstagen. Unentschuldigtes Fehlen wird gesondert arbeitsrechtlich behandelt.',
    sections: [
      section('anspruch', 'Vier Wochen Mindesturlaub',
        [text('Der '), term('Erholungsurlaub', 'urlaub'), text(' beträgt nach § 3 BUrlG 24 Werktage bei einer Sechstagewoche. Bei fünf Arbeitstagen sind es 24 × 5 ÷ 6 = 20 Arbeitstage, bei drei Arbeitstagen 12. Unterscheide Arbeitstage und Stunden. Teilzeittätigkeit an fünf Tagen führt beim gesetzlichen Mindesturlaub zu derselben Zahl an Urlaubstagen wie Vollzeit an fünf Tagen.')],
        'Der volle Anspruch entsteht grundsätzlich nach sechs Monaten. Teilurlaub, Übertragung, Urlaubsabgeltung, Erwerbstätigkeit während des Urlaubs und Krankheit im Urlaub haben eigene Voraussetzungen. Ärztlich nachgewiesene Arbeitsunfähigkeit während des Urlaubs wird nicht auf die Urlaubstage angerechnet. Vertrag, Tarifvertrag oder besondere Gesetze können Zusatzurlaub vorsehen.'),
      section('fehlzeiten', 'Urlaub gewähren und Fehlzeiten behandeln',
        'Der Arbeitgeber berücksichtigt Urlaubswünsche, sofern dringende betriebliche Belange oder sozial vorrangige Urlaubswünsche anderer nicht entgegenstehen. Urlaub setzt Freistellung zur Erholung voraus. Unentschuldigte Abwesenheit ist weder ein hinreichender Urlaubsantrag noch rückwirkend gewährter Urlaub. Die Tage werden nicht einfach vom Mindesturlaub abgezogen.',
        'Für tatsächlich ausgefallene unentschuldigte Arbeitszeit besteht grundsätzlich kein Entgeltanspruch; prüfen muss man gesetzliche oder vertragliche Anspruchsgründe für bezahlte Abwesenheit. Bei einer konkreten schuldhaften Pflichtverletzung kommt eine Abmahnung in Betracht. Beurteile Entgelt, Urlaubsanspruch und Maßnahmen jeweils getrennt.'),
      source('403–405, 417–419', 'BUrlG §§ 1–5, 7–9 und 13: ' + burlg, 'BGB §§ 611a, 614 und 616: ' + bgb),
    ],
    transfer: ['Ein Beschäftigter arbeitet regelmäßig an vier Tagen pro Woche. Er bleibt einmal ohne Entschuldigung fern. Wie groß ist der gesetzliche Mindesturlaub und darf der Fehltag abgezogen werden?',
      'Vier Wochen × vier Arbeitstage ergeben 16 Urlaubstage. Der Tag des unentschuldigten Fehlens ist kein gewährter Urlaub. Entgeltausfall und eine mögliche arbeitsrechtliche Reaktion sind getrennt zu prüfen.'],
  },
  {
    id: 'kuendigung', number: '6.5', title: 'Kündigung und Beendigung des Arbeitsverhältnisses',
    intro: 'Eine Kündigung ist eine einseitige Erklärung zur Beendigung des Arbeitsverhältnisses. Prüfe Art, Form, Zugang, Frist, Schutzvorschriften und Beteiligung des Betriebsrats in dieser Reihenfolge.',
    sections: [
      section('arten', 'Ordentlich, außerordentlich oder einvernehmlich',
        [text('Die '), term('ordentliche Kündigung', 'ordentlich'), text(' beendet nach einer Frist. Die außerordentliche Kündigung aus wichtigem Grund kann nach § 626 BGB fristlos wirken. Bei einem Aufhebungsvertrag einigen sich beide Seiten. Die kalendermäßige Befristung endet grundsätzlich ohne Kündigung. Sonderregeln für Auszubildende stehen im '), link('Ausbildungsartikel zum Vertragsende', 'fz-ausbildungsvertrag'), text('.')],
        'Kündigung und Auflösungsvertrag brauchen nach § 623 BGB die Schriftform. Die elektronische Form ist ausgeschlossen. Für die Frist kommt es grundsätzlich auf den Zugang an. Bei ordentlicher Kündigung gilt als gesetzliche Grundfrist vier Wochen zum 15. oder Monatsende. Während einer vereinbarten Probezeit von höchstens sechs Monaten gilt grundsätzlich eine Zweiwochenfrist. Für Arbeitgeber verlängert § 622 Abs. 2 BGB die Frist nach Betriebszugehörigkeit. Tarifliche und gesetzlich zulässige vertragliche Abweichungen sind gesondert zu prüfen.'),
      section('fristbeispiel', 'Fristbeispiel und Rechtsschutz',
        'Gesetzliche Arbeitgeberfrist nach fünf Jahren Betriebszugehörigkeit: zwei Monate zum Monatsende. Geht die Erklärung im Beispielsfall am 17. März zu, kann sie unter den angenommenen Regeln frühestens zum 31. Mai wirken. Prüfe bei jeder Datumsrechnung erst Kündigungsfrist, dann zulässigen Beendigungstermin.',
        [text('Eine '), term('Kündigungsschutzklage', 'kuendigungsschutzklage'), text(' ist grundsätzlich innerhalb von drei Wochen nach Zugang der schriftlichen Kündigung beim Arbeitsgericht zu erheben, auch bei einer außerordentlichen Kündigung. Wird kein rechtzeitiger Rechtsschutz gesucht, greift grundsätzlich die Wirksamkeitsfiktion des § 7 KSchG. Für Sonderkonstellationen gelten unter anderem § 4 Satz 4 und § 5 KSchG.')],
        [link('Abmahnung und fristlose Kündigung', 'recht-abmahnung'), text(' · '), link('Allgemeiner Kündigungsschutz', 'recht-kuendigungsschutz'), text(' · '), link('Besonderer Kündigungsschutz', 'recht-besonderer-kuendigungsschutz'), text(' · '), link('Anhörung des Betriebsrats', 'recht-betriebsrat-kuendigung')]),
      source('408–416, 440–446', 'BGB §§ 130, 622–623 und 626: ' + bgb, 'KSchG §§ 4–7 und 13: ' + kschg, 'BetrVG § 102: ' + betrvg),
    ],
    transfer: ['Eine Person erhält per E-Mail eine Kündigung mit zwei Wochen Vorlauf. Bei welchem Schritt beginnst du?',
      'Beginne mit Art und Form. Bei einer Kündigung nach § 623 BGB reicht E-Mail nicht aus. Danach prüfe Zugang eines formwirksamen Originals, einschlägige Kündigungsfrist, Beteiligung und Schutzvorschriften. Eine kurze Kündigungsfrist heilt keinen Formmangel.'],
  },
  {
    id: 'abmahnung', number: '6.5.1', title: 'Abmahnung und außerordentliche Kündigung', parent: 'kuendigung',
    intro: 'Eine Abmahnung beanstandet eine konkrete Pflichtverletzung und warnt vor Folgen im Wiederholungsfall. Eine außerordentliche Kündigung setzt zusätzlich voraus, dass die Fortsetzung bis zur regulären Beendigung unzumutbar ist.',
    sections: [
      section('abmahnung', 'Dokumentieren, rügen und warnen',
        [text('Eine '), term('Abmahnung', 'abmahnung'), text(' benennt das konkrete Verhalten nachvollziehbar, rügt es als Vertragsverstoß, fordert künftige Vertragstreue und warnt vor arbeitsrechtlichen Folgen bis hin zur Kündigung. Ein pauschaler Vorwurf oder bloße Kritik genügt dafür nicht. Belege Zeitpunkt, Pflicht, Ereignis und gegebenenfalls vorherige Klärung.')],
        'Praxis: Eine Beschäftigte verschiebt ihre im Vertrag festgelegte Schicht wiederholt eigenmächtig. Die Abmahnung nennt die jeweiligen Daten, Soll- und tatsächliche Zeiten, erwartet künftig die vereinbarte Anwesenheit und macht die mögliche Kündigungsfolge bei Wiederholung klar. Eine berechtigte Verhinderung oder eine geänderte Vereinbarung ist vorher auszuschließen.'),
      section('626', 'Wichtigen Grund in zwei Stufen prüfen',
        'Prüfe zuerst, ob der tatsächliche Vorfall seiner Art nach als wichtiger Grund taugt. Danach entscheide durch Interessenabwägung, ob Fortsetzung bis zum Ablauf der Kündigungsfrist oder zum vereinbarten Ende unzumutbar ist. Maßgeblich sind unter anderem Gewicht des Verstoßes, Folgen, Verschulden, Beschäftigungsdauer, bisheriger Verlauf und mildere Mittel. Eine Abmahnung ist regelmäßig zu prüfen, kann aber etwa bei besonders schwerer Pflichtverletzung oder offensichtlich ausbleibender Verhaltensänderung entbehrlich sein.',
        'Ein nachgewiesener vorsätzlicher Zugriff auf Betriebseigentum kann ein wichtiger Grund sein. Es gibt keine automatische Regel, dass jede Straftat stets fristlose Kündigung rechtfertigt. Ziehe die Besonderheiten des konkreten Falls heran, vor allem die Schwere und die Möglichkeit, das Vertrauen wiederherzustellen.',
        '§ 626 Abs. 2 BGB setzt grundsätzlich zwei Wochen ab Kenntnis der maßgeblichen Tatsachen durch die kündigungsberechtigte Person. Notwendige zügige Aufklärung kann für den Beginn bedeutsam sein. Kündigung muss innerhalb der Frist zugehen. Bei vorhandener Interessenvertretung ist die Anhörung rechtzeitig einzuleiten. Auf Verlangen ist der Kündigungsgrund unverzüglich schriftlich mitzuteilen.'),
      source('408–412, 437–438', 'BGB § 626: ' + bgb, 'BetrVG § 102: ' + betrvg, 'KSchG §§ 4 und 13: ' + kschg),
    ],
    transfer: ['Ein Arbeitnehmer meldet sich zum ersten Mal deutlich verspätet zur Schicht und nennt keine Entschuldigung. Der Betrieb plant ohne weitere Prüfung die fristlose Kündigung. Was fehlt?',
      'Klärung des konkreten Vorfalls und eine Verhältnismäßigkeitsprüfung. Eine Abmahnung ist als milderes Mittel zu prüfen. Erst wenn ein wichtiger Grund vorliegt und Fortsetzung unzumutbar ist, kommt § 626 BGB in Betracht. Eine automatische fristlose Kündigung folgt aus der Verspätung nicht.'],
  },
  {
    id: 'kuendigungsschutz', number: '6.5.2', title: 'Allgemeiner Kündigungsschutz und Sozialauswahl', parent: 'kuendigung',
    intro: 'Der allgemeine Kündigungsschutz prüft, ob eine ordentliche Arbeitgeberkündigung sozial gerechtfertigt ist. Bei betrieblichen Gründen geht es zusätzlich um Weiterbeschäftigung und den Vergleich der betroffenen Beschäftigten.',
    sections: [
      section('geltung', 'Wartezeit und Betriebsgröße',
        [text('Der '), term('allgemeine Kündigungsschutz', 'allgemeiner-schutz'), text(' setzt nach § 1 Abs. 1 KSchG in der Regel eine Beschäftigungsdauer von mehr als sechs Monaten und den betrieblichen Geltungsbereich nach § 23 KSchG voraus. Für die heutige Regel gilt grundsätzlich ein Betrieb mit regelmäßig mehr als zehn Arbeitnehmern, ohne die zur Berufsbildung Beschäftigten. Bis einschließlich 20 Wochenstunden zählen Beschäftigte mit 0,5 und bis einschließlich 30 mit 0,75. Für vor 2004 begonnene Arbeitsverhältnisse kann die Übergangsregel eine eigene Prüfung verlangen.')],
        'Fallrechnung: Ein Betrieb hat neun Vollzeitkräfte und drei Beschäftigte mit je 18 Wochenstunden, außerdem zwei Azubis. Der Wert beträgt 9 + 3 × 0,5 = 10,5. Die Größenanforderung der heutigen Regel ist erfüllt. Ob der einzelne Arbeitnehmer die Wartezeit erfüllt oder besonderen Schutz genießt, ist eine andere Frage.'),
      section('gruende', 'Personen-, verhaltens- und betriebsbedingte Gründe',
        'Personenbedingte Gründe liegen in fehlender Eignung oder dauerhaft beziehungsweise prognostisch erheblicher Leistungshinderung. Verhaltensbedingte Gründe betreffen steuerbare Pflichtverletzungen. Betriebsbedingte Gründe setzen dringende betriebliche Erfordernisse voraus, die der Weiterbeschäftigung entgegenstehen. Verhältnismäßigkeit, Weiterbeschäftigung auf geeigneten freien Stellen und Interessenabwägung sind zu prüfen.'),
      section('sozialauswahl', 'Vergleichsgruppe und Auswahlkriterien',
        [text('Die '), term('Sozialauswahl', 'sozialauswahl'), text(' nach § 1 Abs. 3 KSchG vergleicht die für die Auswahl austauschbaren Beschäftigten. Die gesetzlichen Kriterien sind Dauer der Betriebszugehörigkeit, Lebensalter, Unterhaltspflichten und Schwerbehinderung. Unter den gesetzlichen Voraussetzungen können berechtigte betriebliche Interessen die Herausnahme einzelner Personen rechtfertigen. Dokumentiere die Vergleichsgruppe und nachvollziehbare Gewichtung.')],
        'Ein Auftragsrückgang ist Ausgangspunkt, kein fertiges Ergebnis. Zeige, welche Stellen tatsächlich wegfallen, ob eine freie geeignete Stelle existiert und weshalb die Auswahl gerade die betroffene Person trifft. Vier Kündigungen sind nicht automatisch eine Massenentlassung. Die Voraussetzungen des § 17 KSchG sind anhand Betriebsgröße, Gesamtzahl und Zeitraum gesondert zu prüfen.'),
      source('440–446', 'KSchG §§ 1, 4, 17 und 23: ' + kschg, 'BetrVG § 102: ' + betrvg),
    ],
    transfer: ['Ein Arbeitgeber kündigt wegen wegfallender Aufträge der jüngsten Person eines Teams. Die Stelle könnte auch durch eine ältere Person auf einem anderen, austauschbaren Arbeitsplatz entfallen. Genügt das Alter?',
      'Nein. Zuerst geeignete Weiterbeschäftigung und vergleichbare Arbeitnehmer prüfen. Danach alle vier gesetzlichen Kriterien berücksichtigen und gegebenenfalls berechtigte betriebliche Interessen begründen. Eine Auswahl allein anhand des Alters reicht nicht.'],
  },
  {
    id: 'besonderer-kuendigungsschutz', number: '6.5.3', title: 'Besonderer Kündigungsschutz und Mutterschutz', parent: 'kuendigung',
    intro: 'Besonderer Kündigungsschutz gilt in gesetzlich geregelten Situationen zusätzlich. Prüfe den konkreten persönlichen Schutzgrund, Beginn und Dauer sowie die für das Verfahren zuständige Stelle.',
    sections: [
      section('schutzgruppen', 'Schutzgruppen und Rechtsfolgen',
        [text('Je nach Tatbestand kann '), term('besonderer Kündigungsschutz', 'besonderer-schutz'), text(' eine Einwilligung oder Zustimmung einer Stelle verlangen oder ordentliche Kündigungen einschränken. Beispiele sind Schwerbehinderung und Gleichstellung (SGB IX §§ 168 ff. einschließlich Ausnahmen), Schwangerschaft und Mutterschaft (§ 17 MuSchG), beantragte oder laufende Elternzeit (§ 18 BEEG) und Pflegezeit (§ 5 PflegeZG).')],
        'Für Betriebsratsmitglieder, weitere Mandatsträger und besonders erfasste Personen rund um die Wahl gelten § 15 KSchG sowie für die außerordentliche Kündigung spezieller Mandatsträger § 103 BetrVG. Für Auszubildende greift § 22 BBiG. Gesetzlich erfasste Datenschutzbeauftragte können nach §§ 6 und 38 BDSG besonders geschützt sein. § 9 ASiG enthält für Betriebsärzte und Fachkräfte für Arbeitssicherheit Beteiligungsregeln zur Bestellung oder Abberufung. Daraus folgt kein genereller Sonderkündigungsschutz des Arbeitsvertrags für jede Fachkraft.'),
      section('muschg', 'Mutterschutz: Beschäftigung und Kündigung getrennt prüfen',
        'Der Arbeitgeber prüft Gefährdungen und setzt vorrangig Umgestaltung, dann gegebenenfalls einen geeigneten anderen Einsatz und als letztes Mittel ein betriebliches Beschäftigungsverbot um. Nachtarbeit von 20 bis 6 Uhr ist grundsätzlich untersagt. Für den Zeitraum bis 22 Uhr kommen unter engen Voraussetzungen Ausnahmen in Betracht. Der reguläre Dienstbeginn um 4 Uhr ist damit nicht gedeckt.',
        'Grundsätzlich gilt eine Schutzfrist von sechs Wochen vor und acht Wochen nach der Entbindung. Vor der Entbindung kann die Frau sich ausdrücklich zur Arbeit bereit erklären und diese Erklärung widerrufen. Nach der Entbindung bestehen grundsätzlich Beschäftigungsverbot und mögliche Verlängerung auf zwölf Wochen, etwa bei Früh- oder Mehrlingsgeburt und unter den gesetzlichen Bedingungen bei einer festgestellten Behinderung des Kindes. Für Fehlgeburten gelten seit 2025 gestaffelte Schutzfristen nach § 3 Abs. 5 MuSchG.',
        'Die Kündigung ist nach § 17 MuSchG bei bekannten Schutzumständen oder rechtzeitiger Mitteilung grundsätzlich unzulässig. Ist der Schutzumstand beim Ausspruch unbekannt, beträgt die Mitteilungsfrist regelmäßig zwei Wochen ab Zugang. Eine unverschuldete Fristüberschreitung ist bei unverzüglich nachgeholter Mitteilung unschädlich. Der Schutz gilt auch in der Probezeit. Er erfasst Schwangerschaft, bis zu vier Monate nach einer Fehlgeburt nach der zwölften Schwangerschaftswoche sowie bis zum Ende der Schutzfrist nach der Entbindung, mindestens bis vier Monate nach der Entbindung. Eine behördlich zugelassene Ausnahme verlangt einen besonderen, nicht im Zusammenhang mit dem geschützten Zustand stehenden Fall.'),
      section('teilhabe', 'Weitere Schutzrechte im Arbeitsverhältnis',
        [link('Schwerbehindertenschutz im Arbeitsverhältnis', 'recht-schwerbehindertenschutz'), text(' behandelt neben der Kündigung auch Einstellung, Beteiligung und Zusatzurlaub.')]),
      currentSource('Kursunterlage Recht für WiFaWi 2025, PDF-Seiten 413–416.', 'MuSchG §§ 3, 5, 10, 13, 17 und 28: ' + muschg, 'SGB IX §§ 168–175: https://www.gesetze-im-internet.de/sgb_9_2018/',
        'BEEG § 18: https://www.gesetze-im-internet.de/beeg/__18.html', 'PflegeZG § 5: https://www.gesetze-im-internet.de/pflegezg/__5.html',
        'KSchG § 15: ' + kschg, 'BetrVG § 103: ' + betrvg, 'BDSG §§ 6, 38: https://www.gesetze-im-internet.de/bdsg_2018/', 'ASiG § 9: https://www.gesetze-im-internet.de/asig/__9.html'),
    ],
    transfer: ['Eine schwangere Beschäftigte informiert ihren Arbeitgeber im zweiten Monat der Probezeit. Ihr Dienst beginnt um 4:30 Uhr. Der Arbeitgeber möchte ihr wegen der Schwangerschaft kündigen. Welche Regeln sind zu prüfen?',
      'Die frühe Arbeitszeit verstößt im Regelfall gegen das Nachtarbeitsverbot. Der Arbeitgeber prüft Umgestaltung oder andere geeignete Arbeitszeit. Die Probezeit beseitigt den besonderen Kündigungsschutz nicht. Eine Kündigung wegen Schwangerschaft ist in dieser Konstellation unzulässig.'],
  },
  {
    id: 'befristung', number: '6.6', title: 'Befristete Arbeitsverträge richtig prüfen',
    intro: 'Befristung begrenzt das Arbeitsverhältnis durch Zeit oder Zweck. Prüfe zuerst Form, dann Sachgrund oder gesetzlichen Sonderpfad, danach Laufzeit, Verlängerungen, Ende und Klagefrist.',
    sections: [
      section('form', 'Form der Befristungsabrede',
        [text('Die '), term('Befristung', 'befristung'), text(' bedarf nach § 14 Abs. 4 TzBfG grundsätzlich der Schriftform. Eine zulässige qualifizierte elektronische Signatur kann die gesetzliche Schriftform ersetzen. Eine E-Mail, ein Scan oder bloße Textform genügt dafür grundsätzlich nicht. Schließe die Befristungsabrede formgerecht vor Aufnahme der Arbeit. Sonderregeln, etwa für eine Altersgrenzenvereinbarung nach § 41 SGB VI, sind getrennt zu prüfen.')],
        'Ist die Befristung unwirksam, gilt der Arbeitsvertrag nach § 16 TzBfG grundsätzlich als auf unbestimmte Zeit geschlossen. Die Befristungskontrollklage ist nach § 17 TzBfG grundsätzlich binnen drei Wochen nach dem vereinbarten Ende zu erheben. Endet die Zweckbefristung, kommt es unter anderem auf die schriftliche Unterrichtung über die Zweckerreichung und die gesetzliche Zweiwochenfrist an.'),
      section('grund', 'Sachgrund und sachgrundlose Befristung',
        '§ 14 Abs. 1 TzBfG nennt Sachgründe wie vorübergehenden Bedarf, Vertretung, Erprobung, Übergang nach Ausbildung oder Studium, Eigenart der Arbeitsleistung, Gründe in der Person, zweckgebundene Haushaltsmittel oder gerichtlichen Vergleich. Ein früheres Arbeitsverhältnis schließt eine sachlich begründete Befristung nicht allein aus. Der Sachgrund muss im Fall tatsächlich tragen.',
        'Sachgrundlos sind kalendermäßig grundsätzlich bis zu zwei Jahre, darin höchstens drei Verlängerungen, zulässig. Eine Vorbeschäftigung bei demselben Arbeitgeber steht grundsätzlich entgegen. Tarifliche Abweichungen sowie gesetzliche Sondertatbestände sind zu prüfen. Im Gründungsfall kann die Rechtsfolge etwa an die ersten vier Jahre der Unternehmensgründung anknüpfen. Ab vollendetem 52. Lebensjahr kommen bis zu fünf Jahre infrage, wenn unmittelbar vorher unter anderem mindestens vier Monate Beschäftigungslosigkeit oder eine der gesetzlich gleichgestellten Voraussetzungen vorliegt.'),
      section('rechenfall', 'Drei Varianten prüfen',
        'Vertretung für eine länger erkrankte Mitarbeiterin: Die Vertretung kann Sachgrund sein, wenn der konkrete betriebliche Bedarf tatsächlich auf der Abwesenheit beruht. Die Vorbeschäftigung sperrt diesen Sachgrund nicht. Wenn der Bedarf in Wahrheit dauerhaft besteht, ist die Begründung neu zu bewerten.',
        'Ein Erstvertrag über fünf Monate und drei Verlängerungen um jeweils fünf Monate ergeben 20 Monate. Eine vierte Verlängerung um vier Monate läge zwar innerhalb von 24 Monaten, überschritte aber die Grenze von drei Verlängerungen. Ohne Abweichungsregel oder Sachgrund scheitert die geplante Befristung daran.',
        'Eine 54-jährige Person war vor dem Vertragsbeginn durchgehend sechs Monate beschäftigungslos. Die Schwelle des § 14 Abs. 3 TzBfG kann erfüllt sein. Prüfe Nachweise, unmittelbaren Zeitraum, Form und Gesamtdauer. Das Alter allein genügt nicht.'),
      source('420–425', 'TzBfG §§ 14–17: ' + tzbfg, 'BGB §§ 126 und 126a: ' + bgb, 'SGB VI § 41: https://www.gesetze-im-internet.de/sgb_6/__41.html'),
    ],
    transfer: ['Eine Person beginnt am Montag mit der Arbeit. Erst am Mittwoch unterschreiben beide Seiten die bereits zuvor mündlich vereinbarte Befristung. Was ist der zentrale Prüfpunkt?',
      'Ob die Befristung vor Arbeitsaufnahme formwirksam vereinbart wurde. Eine spätere bloße schriftliche Wiederholung der bereits mündlich vereinbarten Befristung heilt den Formmangel grundsätzlich nicht. Folge kann ein unbefristetes Arbeitsverhältnis sein. Eine neue eigenständige Abrede wäre gesondert zu prüfen.'],
  },
  {
    id: 'handelsvertreter-status', number: '6.7', title: 'Handelsvertreter und angestellter Vertrieb',
    intro: 'Der Handelsvertreter vermittelt als selbstständiger Gewerbetreibender dauerhaft Geschäfte für ein anderes Unternehmen oder schließt sie in dessen Namen ab. Die Abgrenzung zum angestellten Außendienst hängt an der tatsächlichen Tätigkeit.',
    sections: [
      section('einordnung', 'Drei Tatbestandsmerkmale',
        [text('Ein '), term('Handelsvertreter', 'handelsvertreter'), text(' nach § 84 HGB ist selbstständiger Gewerbetreibender, dauernd betraut und vermittelt Geschäfte oder schließt sie im Namen des Auftraggebers ab. Selbstständig ist, wer Tätigkeit und Arbeitszeit im Wesentlichen frei gestalten kann. Die vertragliche Bezeichnung, Provision und ein Fixum sind Indizien, entscheiden aber nicht allein.')],
        'Praxis: Eine Vertriebsagentur betreut dauerhaft das Geschäft mehrerer Hersteller, bestimmt ihre Besuchsplanung selbst und vermittelt für einen Auftraggeber. Das spricht für Selbstständigkeit und ständige Betrauung. Muss sie tatsächlich jede Schicht, Route und Fachweisung befolgen und ist sie wie Personal eingegliedert, ist die Einordnung erneut zu prüfen.',
        [text('Der '), link('Marketingartikel zum indirekten Absatz', 'marketing-indirekt'), text(' ordnet Handelsvertreter, Kommissionäre und Wiederverkäufer als Vertriebsrollen ein. Im Arbeitsrecht kommt es zusätzlich auf persönliche Abhängigkeit und tatsächliche Durchführung an.')]),
      section('pflichten', 'Interessen, Meldung und Handelsregister',
        'Der Handelsvertreter bemüht sich um Geschäfte, wahrt die Interessen des anderen Unternehmers, meldet Vermittlungen und Abschlüsse unverzüglich und beachtet unter den gesetzlichen Voraussetzungen Geschäfts- und Betriebsgeheimnisse auch nach Ende des Vertrags. Kaufmännische Sorgfalt gilt für die Erfüllung.',
        'Die Vorschriften zum Handelsvertreter können auch ohne kaufmännisch eingerichteten Geschäftsbetrieb gelten. Führt ein selbstständiger Vertreter ein Kleingewerbe, kann er Kaufmann nach § 2 HGB durch Eintragung seiner Firma ins Handelsregister werden. Eine Eintragung ist keine Voraussetzung dafür, dass ein laufender Vertrag nach § 84 HGB ein Handelsvertretervertrag ist.'),
      source('426–429', 'HGB §§ 2, 84, 86 und 90: ' + hgb, 'BGB § 611a: ' + bgb),
    ],
    transfer: ['Ein Hersteller zahlt einer Person eine Provision pro Verkauf. Sie arbeitet ausschließlich in seinem Vertriebsteam und muss seine täglichen Weisungen zu Ort, Route und Zeiten befolgen. Reicht die Provision für die Einordnung als Handelsvertreter?',
      'Nein. Provision ist auch im Angestelltenverhältnis möglich. Prüfe tatsächliche Freiheit und Eingliederung, dauerhafte Betrauung sowie Vermittlung oder Abschluss für den Unternehmer. Persönliche Abhängigkeit kann für ein Arbeitsverhältnis sprechen.'],
  },
  {
    id: 'betriebsrat', number: '6.8', title: 'Betriebsrat: Wahl und Beteiligungsrechte',
    intro: 'Der Betriebsrat vertritt die Beschäftigten innerhalb der gesetzlichen Betriebsverfassung. Je nach Maßnahme hat er Informations-, Beratungs-, Anhörungs-, Zustimmungs- oder erzwingbare Mitbestimmungsrechte. Die Wirkung ergibt sich aus dem konkreten Verfahren.',
    sections: [
      section('wahl', 'Wahl, Mitgliederzahl und Freistellung',
        [text('Ein '), term('Betriebsrat', 'betriebsrat'), text(' kann nach § 1 BetrVG in Betrieben mit regelmäßig mindestens fünf ständigen wahlberechtigten Arbeitnehmern gewählt werden, von denen mindestens drei wählbar sind. Wahlberechtigung und Wählbarkeit folgen §§ 7–8 BetrVG und unterscheiden sich, etwa hinsichtlich Alter und Betriebszugehörigkeit. Tarifbindung ist keine Voraussetzung.')],
        'Maßgeblich ist der Betrieb als Organisationseinheit, nicht stets das gesamte Unternehmen oder jede Filiale für sich. Ein Betrieb mit 150 in der Regel beschäftigten Arbeitnehmern hat unter den angenommenen Wahlvoraussetzungen einen siebenköpfigen Betriebsrat (§ 9). Die gesetzliche Mindestfreistellung nach § 38 beginnt grundsätzlich bei 200 Arbeitnehmern. Erforderliche Arbeitsbefreiung für konkrete Betriebsratsaufgaben nach § 37 bleibt auch darunter möglich.'),
      section('aufgaben', 'Allgemeine Aufgaben des Betriebsrats nach § 80',
        'Der Betriebsrat überwacht die Durchführung der zugunsten der Beschäftigten geltenden Regeln und kann Maßnahmen zugunsten von Betrieb und Belegschaft beantragen. Zu seinen Aufgaben gehören unter anderem Gleichstellung, Vereinbarkeit von Familie und Beruf, Beschäftigungssicherung, Eingliederung schwerbehinderter Menschen und Förderung des Arbeitsschutzes. Er nimmt Anregungen von Beschäftigten und der Jugend- und Auszubildendenvertretung auf und verfolgt berechtigte Anliegen gegenüber dem Arbeitgeber.',
        'Für seine gesetzlichen Aufgaben muss er nach § 80 Abs. 2 rechtzeitig und umfassend unterrichtet werden. Allgemeine Aufgaben und die dafür nötigen Informationen sind vom Mitbestimmungsrecht bei einer konkreten Maßnahme zu unterscheiden. Welche Beteiligungswirkung eintritt, bestimmt die jeweilige Spezialregel.'),
      section('stufen', 'Beteiligung nach Wirkung unterscheiden',
        'Information und Beratung: Personalplanung (§ 92) und die Planung etwa von Arbeitsplätzen oder Arbeitsabläufen (§ 90) erfordern Unterrichtung und Beratung. Das ersetzt nicht eine gegebenenfalls zusätzlich nötige Zustimmung zu späteren Einzelmaßnahmen. Die Planung fünf neuer Stellen ist anders zu beurteilen als die Einstellung von fünf Personen.',
        [text('Anhörung und Widerspruch: Vor Kündigungen gilt § 102 BetrVG. Bei Einstellung, Eingruppierung, Umgruppierung und '), link('Versetzung', 'recht-versetzung'), text(' verlangt § 99 in seinem Geltungsbereich eine andere Form der Beteiligung mit Zustimmungsrecht. Bei § 102 ist ein ordnungsgemäßer Widerspruch im Regelfall kein Veto gegen die Kündigung.')],
        [text('Erzwingbare '), term('Mitbestimmung', 'mitbestimmung'), text(' nach § 87 betrifft soziale Angelegenheiten, etwa Beginn und Ende der Arbeitszeit, Urlaubsgrundsätze, technische Überwachung und Gestaltung von Sozialeinrichtungen, soweit keine gesetzliche oder tarifliche Regelung besteht. Scheitert eine Einigung, entscheidet die Einigungsstelle, deren Spruch die Einigung ersetzt.')]),
      section('beispiel', 'Praxis: Kinderbetreuung im Betrieb',
        'Der Betrieb will die Nutzungsgebühr einer auf den Betrieb beschränkten Betreuungseinrichtung ändern. Das betrifft unter den angenommenen Voraussetzungen die Ausgestaltung einer Sozialeinrichtung nach § 87 Abs. 1 Nr. 8 BetrVG. Kommt keine Einigung zustande, kommt die Einigungsstelle nach §§ 76, 87 Abs. 2 zum Zug. Die bloße Personalplanung verlangt dagegen grundsätzlich Information und Beratung statt einer solchen Entscheidung.'),
      currentSource('Kursunterlage Recht für WiFaWi 2025, PDF-Seiten 430–439.', 'BetrVG §§ 1, 7–9, 37–38, 76, 80, 87, 90, 92 und 99–102: ' + betrvg),
    ],
    transfer: ['Der Arbeitgeber plant fünf neue Stellen, will eine Person einstellen und möchte allein die Gleitzeitordnung ändern. Beschäftigte melden zugleich Verstöße gegen die bisherige Gleitzeitordnung. Welche Vorschriften helfen bei der Zuordnung?',
      'Personalplanung: § 92, Information und Beratung. Einstellung in einem Unternehmen mit regelmäßig mehr als 20 wahlberechtigten Arbeitnehmern: § 99, Zustimmung einholen. Gleitzeit: regelmäßig § 87 Abs. 1 Nr. 2, erzwingbare Mitbestimmung im gesetzlichen Anwendungsbereich. Allgemeine Aufgaben nach § 80 helfen beispielsweise, wenn Beschäftigte auf Verstöße gegen eine bestehende Arbeitszeitregelung hinweisen. Die Überwachung der geltenden Regel ist von der Zustimmung zur Änderung zu unterscheiden.'],
  },
  {
    id: 'betriebsrat-kuendigung', number: '6.8.1', title: 'Anhörung des Betriebsrats vor Kündigungen', parent: 'betriebsrat',
    intro: 'Besteht ein Betriebsrat, muss er vor jeder Kündigung angehört werden. Die Pflicht zur Anhörung, ein Widerspruch und ein möglicher Weiterbeschäftigungsanspruch haben verschiedene Wirkungen.',
    sections: [
      section('anhoerung', 'Vorausgehende Anhörung und Fristen',
        [text('Der Arbeitgeber muss bei der '), term('Betriebsratsanhörung', 'anhoerung'), text(' die Gründe für die geplante Kündigung mitteilen. Eine Kündigung ohne ordnungsgemäße vorherige Anhörung ist unwirksam. Der Betriebsrat kann bei ordentlicher Kündigung binnen einer Woche Bedenken mitteilen und aus gesetzlichen Gründen widersprechen. Bei außerordentlicher Kündigung hat er Bedenken unverzüglich, spätestens binnen drei Tagen, mitzuteilen. Ein inhaltlich abschließendes Votum kann den Vorgang vorzeitig beenden.')],
        'Eine Zustimmung ist bei der gewöhnlichen Anhörung nach § 102 nicht Voraussetzung. Bei besonderen Mandatsträgern verlangt § 103 BetrVG für die außerordentliche Kündigung eine andere Beteiligung. § 102 Abs. 6 lässt weitergehende Vereinbarungen über Zustimmung zu.'),
      section('widerspruch', 'Widerspruch und Weiterbeschäftigung',
        '§ 102 Abs. 3 nennt Widerspruchsgründe für ordentliche Kündigungen. Dazu gehören etwa unzureichende Sozialauswahl, Verstoß gegen Auswahlrichtlinien oder eine geeignete Weiterbeschäftigung unter den dort genannten Voraussetzungen. Ein form- und fristgerechter Widerspruch setzt die Kündigung nicht allein außer Kraft. Bei Kündigung trotz Widerspruch erhält die Person grundsätzlich eine Abschrift der Stellungnahme.',
        'Hat der Betriebsrat ordnungsgemäß widersprochen und erhebt die Person Kündigungsschutzklage, kann sie nach § 102 Abs. 5 die Weiterbeschäftigung zu unveränderten Bedingungen nach Ablauf der Kündigungsfrist bis zum rechtskräftigen Abschluss verlangen. Das Gericht kann den Arbeitgeber in den gesetzlichen Fällen vorläufig von dieser Pflicht entbinden.'),
      source('437–438, 440–446', 'BetrVG §§ 102–103: ' + betrvg, 'KSchG §§ 4 und 13: ' + kschg),
    ],
    transfer: ['Der Betriebsrat widerspricht einer ordentlichen betriebsbedingten Kündigung fristgerecht und begründet. Die Person geht gegen die Kündigung vor und will bis zum Verfahrensabschluss arbeiten. Was prüfst du?',
      'Der Widerspruch verhindert die Kündigung nicht automatisch. Prüfe gesetzlichen Widerspruchsgrund, Form und Frist, eine rechtzeitige Kündigungsschutzklage und das Verlangen nach Weiterbeschäftigung. Sind die Voraussetzungen erfüllt, ist § 102 Abs. 5 BetrVG die Anspruchsgrundlage.'],
  },
  {
    id: 'versetzung', number: '6.8.2', title: 'Versetzung und andere personelle Einzelmaßnahmen', parent: 'betriebsrat',
    intro: 'Eine Versetzung kann arbeitsvertraglich angeordnet, vereinbart oder unter den Voraussetzungen einer Änderungskündigung angeboten werden. Die Beteiligung des Betriebsrats ist gesondert zu prüfen.',
    sections: [
      section('begriff', 'Was als Versetzung gilt',
        [text('Eine '), term('Versetzung', 'versetzung'), text(' nach § 95 Abs. 3 BetrVG ist die Zuweisung eines anderen Arbeitsbereichs, die voraussichtlich länger als einen Monat dauert oder die Arbeitsumstände erheblich verändert. Auch ein kürzerer Einsatz kann bei erheblicher Änderung erfasst sein. Der gesetzliche Sonderfall wechselnder Arbeitsplätze ist getrennt zu beachten.')],
        'Sachliche Anlässe sind etwa Umorganisation oder Automatisierung, ein vorübergehender Ersatz bei Abwesenheit, veränderte Kapazitätsplanung oder Entwicklung in eine neue Rolle. Beispiele sind Vertretung bei längerem Ausfall, Sabbatical oder Unfall, Reorganisation nach Austritt, Aufstieg oder Ende einer Ausbildung und Veränderungen im Team oder in der Führung. Der Anlass ersetzt weder die Interessenabwägung noch die Prüfung, ob die Aufgabe vertraglich geschuldet ist.'),
      section('wege', 'Individualrechtlicher und kollektiver Prüfpfad',
        'Deckt der Vertrag die geplante Änderung ab und entspricht die Auswahl billigem Ermessen, kann die Weisung ausreichen. Bei Überschreitung der vereinbarten Vertragsgrenze kommen einvernehmliche Änderung oder, unter den besonderen Voraussetzungen, Änderungskündigung mit Fortsetzungsangebot in Betracht. Bei Änderungskündigung Schutz, Fristen und mögliche Annahme unter Vorbehalt prüfen.',
        'In Unternehmen mit regelmäßig mehr als 20 wahlberechtigten Arbeitnehmern muss der Arbeitgeber vor der personellen Einzelmaßnahme unterrichten, Unterlagen beifügen und die Zustimmung des Betriebsrats einholen (§ 99). Die Zustimmungsverweigerung muss binnen einer Woche nach vollständiger Unterrichtung schriftlich begründet werden. Ohne fristgerechte Verweigerung gilt die Zustimmung als erteilt. Verweigert der Betriebsrat sie aus einem gesetzlichen Grund, kommt gerichtliche Ersetzung in Betracht. Bei sachlicher Dringlichkeit ist vorläufige Durchführung unter § 100 möglich. Arbeitgeber klären die betroffene Person über die Sach- und Rechtslage auf und unterrichten den Betriebsrat unverzüglich. Bestreitet der Betriebsrat die Dringlichkeit unverzüglich, muss der Arbeitgeber binnen drei Tagen die gerichtliche Ersetzung der Zustimmung und Feststellung der sachlichen Dringlichkeit beantragen, um die vorläufige Maßnahme aufrechtzuerhalten. Ohne erforderliche Beteiligung kann der Betriebsrat die Aufhebung nach § 101 beantragen.'),
      section('praxis', 'Praxis: Acht Wochen neuer Aufgabenbereich',
        'Ein Unternehmen will einen Außendienstmitarbeiter für acht Wochen in eine weit entfernte Niederlassung versetzen. Prüfe die vertragliche Ortsbindung, Zumutbarkeit und den tatsächlichen Zuschnitt des Arbeitsbereichs. Besteht ein zuständiger Betriebsrat und greift § 99, ist seine Beteiligung zusätzlich erforderlich. Seine Zustimmung erweitert den Individualvertrag nicht.'),
      source('435–436, 447–449', 'GewO § 106: ' + gewo, 'BetrVG §§ 95 und 99–101: ' + betrvg, 'KSchG §§ 2 und 4: ' + kschg),
    ],
    transfer: ['Eine Beschäftigte soll für drei Wochen von der Tagschicht im Innendienst in einen anderen Arbeitsbereich mit Nachtarbeit wechseln. Der Betrieb verweist auf die Dauer unter einem Monat. Ist die Beteiligungsfrage damit geklärt?',
      'Nein. Bei einem anderen Arbeitsbereich kann schon eine erhebliche Änderung der Arbeitsumstände für § 95 Abs. 3 BetrVG ausreichen. Vertrag, billiges Ermessen, Arbeitszeitgrenzen und Beteiligung nach § 99 sowie gegebenenfalls § 87 sind getrennt zu prüfen.'],
  },
  {
    id: 'arbeitsschutz', number: '6.9', title: 'Arbeitsschutz und Unfallverhütung organisieren',
    intro: 'Arbeitsschutz vermeidet physische und psychische Gefährdungen und vermindert verbleibende Risiken. Der Arbeitgeber organisiert Schutz, beurteilt Arbeitsbedingungen, dokumentiert Maßnahmen und überprüft deren Wirkung.',
    sections: [
      section('system', 'Staatliches Recht und Unfallverhütung',
        'Staatliche Arbeitsschutzvorschriften und Unfallverhütungsvorschriften der gesetzlichen Unfallversicherung ergänzen sich. Das ArbSchG gibt allgemeine Pflichten vor. Die für einen Betrieb geltenden DGUV-Vorschriften sind beim zuständigen Unfallversicherungsträger zu prüfen. DGUV Vorschrift 1 betrifft Präventionsgrundsätze, Vorschrift 2 betriebsärztliche und sicherheitstechnische Betreuung und Vorschrift 3 elektrische Anlagen und Betriebsmittel in ihrem Geltungsbereich.',
        'Ordne nach Gefährdung zu: ArbStättV für Arbeitsstätten, BaustellV für Baustellen, BetrSichV für Arbeitsmittel und Anlagen, BioStoffV für biologische Arbeitsstoffe, GefStoffV für gefährliche Stoffe. Je nach Aufgabe greifen auch Regeln zu Lärm und Vibrationen, künstlicher optischer Strahlung, Lastenhandhabung, persönlicher Schutzausrüstung und arbeitsmedizinischer Vorsorge. Die Gewerbeordnung enthält unter anderem Regeln zu Arbeitsverhältnis und Betrieb.'),
      section('systematik', 'Gefahren an der Quelle bekämpfen',
        [text('Die '), { text: 'Gefährdungsbeurteilung', termId: 'fz-ausb-begriff-gefaehrdung' }, text(' erfasst zum Beispiel Umgebung, Stoffe, Mittel, Organisation, Qualifikation und psychische Belastungen. Nutze gesicherte Erkenntnisse aus Technik, Arbeitsmedizin und Arbeitswissenschaft und berücksichtige besonders gefährdete Gruppen. Dokumentiere Ergebnisse, beschlossene Maßnahmen und ihre Kontrolle.')],
        'Prüfe zunächst, ob die Gefahrenquelle beseitigt oder ersetzt werden kann. Technische und organisatorische Maßnahmen haben Vorrang vor individuellen Schutzmaßnahmen. Gib geeignete Anweisungen und unterweise tätigkeitsbezogen während der Arbeitszeit. Geschlechtsspezifisch wirkende Schutzregeln prüfst du anhand des strengen gesetzlichen Maßstabs des § 4 Nr. 8 ArbSchG. Bei betrieblichen Regelungen zum Gesundheitsschutz kann der Betriebsrat mitbestimmen.',
        'Praxis: Im Lager kreuzen sich Fußwege und Fahrzeugwege. Trenne diese Wege soweit möglich baulich, lege Betriebsregeln für verbleibende Schnittstellen fest und überprüfe deren Einhaltung. Sichtbare Kleidung kann zusätzlich zur Risikominderung beitragen, ersetzt aber eine wirksame Trennung nicht.',
        [link('Ergonomische Arbeitsumgebung und Unterweisung für Azubis', 'fz-ausbildung-ergonomie'), text(' · '), link('Beschäftigung Minderjähriger', 'recht-jugendarbeitsschutz')]),
      source('450–453', 'ArbSchG §§ 3–6, 12 und 15–17: https://www.gesetze-im-internet.de/arbschg/',
        'ArbStättV: https://www.gesetze-im-internet.de/arbst_ttv_2004/', 'BetrVG § 87 Abs. 1 Nr. 7: ' + betrvg,
        'DGUV Vorschriften: https://publikationen.dguv.de/regelwerk/dguv-vorschriften/'),
    ],
    transfer: ['In der Verpackung müssen schwere Kartons wiederholt manuell umgesetzt werden. Der Betrieb will ausschließlich rückenschonendes Heben unterweisen. Was prüfst du zuerst?',
      'Lasten, Takt, Höhen, Wege und Belastungen beurteilen. Lasten vermeiden, teilen oder mit geeigneten technischen Hilfen bewegen, danach Arbeitsablauf und Zuständigkeiten organisieren. Passende Unterweisung ergänzt die Maßnahmen. Prüfe die Wirkung in der tatsächlichen Produktion.'],
  },
  {
    id: 'jugendarbeitsschutz', number: '6.9.1', title: 'Jugendarbeitsschutz: zulässige Dienste planen', parent: 'arbeitsschutz',
    intro: 'Für Kinder und Jugendliche gelten strengere Beschäftigungsgrenzen. Prüfe Alter, Vollzeitschulpflicht, Tätigkeit, Zeit, Pausen, freie Tage und zulässige Branchen- oder Einzelfallausnahmen.',
    sections: [
      section('arbeitszeit', 'Beschäftigung, Arbeitszeit und Ruhe',
        'Kinderbeschäftigung ist grundsätzlich verboten, mit engen gesetzlichen Ausnahmen. Jugendliche sind nach JArbSchG Personen ab 15 und unter 18 Jahren. Vollzeitschulpflichtige Jugendliche werden grundsätzlich wie Kinder behandelt. Für die jugendliche Beschäftigung gelten regelmäßig höchstens acht Stunden täglich und 40 Stunden wöchentlich. Bis zu achteinhalb Stunden sind in bestimmten Ausgleichskonstellationen möglich, etwa bei kürzerer Beschäftigung an anderen Werktagen derselben Woche. Beim Brückentagsausgleich sind Dauer und Durchschnittsvorgaben zu prüfen.',
        'Bei mehr als viereinhalb bis zu sechs Stunden Arbeitszeit sind mindestens 30 Minuten Pause erforderlich. Bei mehr als sechs Stunden sind es 60 Minuten, jeweils in Abschnitten von mindestens 15 Minuten. Pausen liegen frühestens eine Stunde nach Beginn und spätestens eine Stunde vor Ende. Jugendliche dürfen höchstens viereinhalb Stunden am Stück ohne Ruhepause beschäftigt werden. Die tägliche Freizeit beträgt mindestens zwölf ununterbrochene Stunden. Die zulässige Schichtzeit einschließlich Pausen folgt § 12 JArbSchG.'),
      section('schutzzeiten', 'Nacht, Wochenende und Feiertage',
        'Grundsätzlich ist Arbeit nur zwischen 6 und 20 Uhr zulässig. § 14 enthält eng begrenzte Ausnahmen, die unter anderem von Alter, Branche, Schichtsystem und Schulbeginn abhängen. Plane grundsätzlich fünf Arbeitstage pro Woche. Bei zulässigem Einsatz am Samstag oder Sonntag muss ein anderer berufsschulfreier Arbeitstag derselben Woche als Ausgleich berücksichtigt werden.',
        'Samstags sollen mindestens zwei Samstage pro Monat frei bleiben. Sonntags soll jeder zweite frei sein und müssen mindestens zwei pro Monat frei bleiben. Prüfe die unterschiedlichen Branchenlisten der §§ 16 und 17. Am 24. und 31. Dezember gilt ein Einsatzverbot nach 14 Uhr. Feiertagsausnahmen greifen unter § 18. Der 25. Dezember, 1. Januar, Ostersonntag und 1. Mai sind von diesen Ausnahmen ausgeschlossen.'),
      section('quereinstieg', 'Berufsschule, Urlaub und Unterweisung',
        [text('Für die Anrechnung der Berufsschule, Prüfungsfreistellung, Altersstaffel beim Urlaub und Erstuntersuchung siehe '), link('Jugendschutz in der Ausbildung', 'fz-ausbildung-jugendschutz'), text('. Beachte zudem tätigkeitsbezogene Gefährdungen und die mindestens halbjährliche Wiederholung der Unterweisung nach § 29 JArbSchG.')],
        'Praxis: Das Gastgewerbe darf unter Voraussetzungen einen 17-jährigen Azubi an einem Sonntag beschäftigen. Dienstplanung erfordert unter anderem rechtmäßige Arbeitszeit, gesetzliche Pausen, mindestens zwölf Stunden tägliche Freizeit und einen berufsschulfreien Ausgleichstag derselben Woche. Die Ausnahme erlaubt keine unbegrenzte Sonntagsarbeit.'),
      source('454–458', 'JArbSchG §§ 1–2, 5, 8–19 und 29: ' + jarbschg),
    ],
    transfer: ['Ein 17-jähriger Azubi hat an einem gewöhnlichen Arbeitstag sieben Nettoarbeitsstunden. Seine einzige Pause soll 30 Minuten dauern. Was ist zu ändern?',
      'Bei mehr als sechs Stunden sind mindestens 60 Minuten zu gewähren, etwa zwei Pausen von je 30 Minuten. Lage der Pausen so wählen, dass niemand länger als viereinhalb Stunden am Stück arbeitet und die gesetzlichen Mindestabstände zu Schichtbeginn und -ende eingehalten werden.'],
  },
  {
    id: 'entgeltfortzahlung', number: '6.10', title: 'Entgeltfortzahlung bei Krankheit und Feiertagen',
    intro: 'Entgeltfortzahlung schützt Arbeitsentgelt, das bei Arbeitsunfähigkeit oder gesetzlichen Feiertagen sonst ausfallen würde. Unterscheide Anspruchsvoraussetzungen, Dauer, Anzeige, ärztlichen Nachweis und Rechtsfolgen.',
    sections: [
      section('anspruch', 'Anspruch bei Arbeitsunfähigkeit',
        [text('Die '), term('Entgeltfortzahlung', 'efz'), text(' nach § 3 EFZG setzt krankheitsbedingte Arbeitsunfähigkeit ohne anspruchsausschließendes Verschulden voraus. Der Anspruch entsteht nach vierwöchiger ununterbrochener Dauer des Arbeitsverhältnisses und besteht grundsätzlich bis zu sechs Wochen. Eine Erkrankung allein ist ohne Auswirkung auf die geschuldete Arbeit nicht zwingend Arbeitsunfähigkeit.')],
        'Das Verschulden erfordert einen erheblichen Verstoß gegen das Verhalten, das ein verständiger Mensch im eigenen Interesse beachtet. Dass eine Person beim Sport oder bei der Arbeit verletzt wird, genügt allein nicht. Prüfe Ursache und Umstände; stell keine Vermutung allein aufgrund der Art der Freizeitbeschäftigung an.',
        'Praxis: Eine Person wird in der zweiten Beschäftigungswoche für zwei Wochen arbeitsunfähig. Der Betrieb schuldet für die vollständig in der Wartezeit liegende Dauer grundsätzlich keine Entgeltfortzahlung nach § 3 EFZG. Bei andauernder Erkrankung nach Ende der Wartezeit und hinsichtlich etwaiger Leistungen der Krankenkasse gelten eigene Voraussetzungen.'),
      section('mehrere-krankheiten', 'Wiederkehrende und neue Krankheiten',
        [text('Bei '), term('Fortsetzungserkrankung', 'fortsetzung'), text(' aufgrund derselben Krankheit entsteht ein neuer voller Zeitraum, wenn die Person vor der erneuten Arbeitsunfähigkeit mindestens sechs Monate wegen dieser Krankheit nicht arbeitsunfähig war oder seit Beginn der ersten Arbeitsunfähigkeit wegen derselben Krankheit zwölf Monate abgelaufen sind. Sonst werden die maßgeblichen Zeiten grundsätzlich zusammengerechnet.')],
        'Eine andere Krankheit kann einen neuen Anspruch auslösen, wenn die frühere Arbeitsunfähigkeit beendet war. Tritt die neue Erkrankung während einer bestehenden Arbeitsunfähigkeit hinzu, läuft im Grundsatz nur der eine Sechswochenzeitraum. Bei eng aneinander anschließenden Bescheinigungen kann die Abgrenzung Aufklärung erfordern.',
        'Beispiel: Drei Wochen Knieverletzung, danach tatsächliche Arbeitsfähigkeit und später drei Wochen Arbeitsunfähigkeit durch eine eigenständige Infektion. Jede tritt in einem eigenen Verhinderungsfall auf. Dauert die Knie-Arbeitsunfähigkeit dagegen fort und tritt die Infektion währenddessen hinzu, beginnt mit der Infektion nicht automatisch eine neue Sechswochenfrist.'),
      section('anzeige', 'Krankmeldung, Nachweis und eAU',
        'Die Person meldet Arbeitsunfähigkeit und voraussichtliche Dauer unverzüglich. Bei mehr als drei Kalendertagen gilt grundsätzlich der nachfolgende Arbeitstag als Nachweiszeitpunkt, sofern der Arbeitgeber den Nachweis nicht früher verlangt. Eine fortdauernde Arbeitsunfähigkeit muss erneut festgestellt beziehungsweise nachgewiesen werden.',
        [text('Im regulären '), term('eAU-Verfahren', 'eau'), text(' lassen gesetzlich Versicherte die Arbeitsunfähigkeit fristgerecht ärztlich feststellen und sich die ärztliche Bescheinigung aushändigen. Der Arbeitgeber ruft die Meldedaten ab. Die eigene Mitteilungspflicht bleibt. Bei Privatversicherten, Feststellung durch nicht an der vertragsärztlichen Versorgung teilnehmende Ärzte und weiteren Ausnahmefällen, etwa bestimmten Auslandsfällen oder Minijobs in Privathaushalten, gelten weiterhin eigene Nachweispflichten.')],
        '§ 7 EFZG erlaubt ein vorläufiges Leistungsverweigerungsrecht, soweit eine geschuldete Bescheinigung nicht vorgelegt oder die Auslandsmitteilung nicht erfüllt wird und die Person den Pflichtverstoß zu vertreten hat. Prüfe im eAU-Fall zunächst, wie festgestellt und abgerufen wurde. Eine fehlende Papierbescheinigung allein genügt im normalen eAU-Verfahren nicht zum Einbehalt.'),
      section('entgelthoehe', 'Höhe und Feiertage',
        'Ausgangspunkt ist das Arbeitsentgelt für die maßgebende regelmäßige Arbeitszeit; zusätzlich für Überstunden gezahltes Entgelt zählt grundsätzlich nicht. Bei einem gesetzlichen Feiertag ist die ausgefallene regelmäßige Arbeitszeit nach § 2 EFZG zu bezahlen. Das Gesetz regelt eine Ausnahme bei unentschuldigtem Fernbleiben am letzten Arbeitstag vor oder ersten Arbeitstag nach dem Feiertag. Prüfe den ursächlichen Arbeitsausfall und anwendbare kollektivrechtliche Regeln.'),
      source('459–465', 'EFZG §§ 2–8: ' + efzg, 'SGB IV § 109: https://www.gesetze-im-internet.de/sgb_4/__109.html',
        'BAG, Einheit des Verhinderungsfalls: https://www.bundesarbeitsgericht.de/entscheidung/5-azr-505-18/'),
    ],
    transfer: ['Eine Person war sechs Wochen wegen derselben Grunderkrankung arbeitsunfähig und arbeitet danach sieben Monate ohne Arbeitsunfähigkeit aus dieser Ursache. Danach fällt sie erneut deswegen aus. Läuft der bisherige Zeitraum weiter?',
      'Ist die Person mindestens sechs Monate vor der erneuten Arbeitsunfähigkeit nicht an derselben Krankheit arbeitsunfähig gewesen, kann nach § 3 Abs. 1 Satz 2 EFZG grundsätzlich ein neuer Anspruch bis zu sechs Wochen entstehen. Vertragsdauer, Ursache und gegebenenfalls andere Anspruchsvoraussetzungen sind mitzubeurteilen.'],
  },
  {
    id: 'arbeitsrecht-personalfall', number: '6.11', title: 'Prüfungsfall: Personal in einer Werkstatt',
    intro: 'In einem Betrieb mit 150 regelmäßig Beschäftigten und Betriebsrat vereinbaren die Werkstattleitung und eine Fachkraft mündlich einen unbefristeten Arbeitsvertrag. Beide sind tarifgebunden. Bearbeite Einstellung, Dienstplan und den späteren Stellenabbau getrennt.',
    sections: [
      question('einstellung', 'Einstellung und Vertragsnachweis',
        'Die Werkstatt will die Fachkraft sofort mit fünf Tagen zu je zehn Stunden einsetzen. Die Arbeitszeit soll auf Dauer so bleiben. Der Tarifvertrag gewährt 28 Urlaubstage bei einer Fünftagewoche, die mündliche Abrede 25. Die Werkstatt will die Vertragsbedingungen erst nach drei Monaten dokumentieren. Prüfe die drei Entscheidungen.',
        'Der unbefristete Vertrag kann grundsätzlich mündlich geschlossen werden. Der Nachweis wesentlicher Bedingungen bleibt geschuldet. Allein für Entgelt und Arbeitszeit läuft die Frist bereits am ersten Arbeitstag ab. Auch bei Einrechnung des arbeitsfreien Samstags übersteigt eine dauerhaft 50-stündige Woche regelmäßig den erlaubten Werktagsdurchschnitt von acht Stunden. Der Tarifurlaub von 28 Tagen bleibt bei beiderseitiger Tarifbindung und einschlägigem Tarifvertrag maßgeblich. Der gesetzliche Mindesturlaub wäre bei fünf Tagen zwar mit 20 Tagen eingehalten. Die Einstellung löst zusätzlich die Prüfung nach § 99 BetrVG aus.'),
      question('stellenabbau', 'Kündigung und Beteiligung',
        'Anderthalb Jahre später soll eine von mehreren vergleichbaren Stellen entfallen. Der Leiter erklärt, er nehme einfach die zuletzt eingestellte Person und informiere den Betriebsrat anschließend. Wie muss er vorgehen?',
        'Zunächst ist zu prüfen, ob ein dringendes betriebliches Erfordernis vorliegt und eine Weiterbeschäftigung auf einem freien Arbeitsplatz möglich ist. Bei den vergleichbaren Beschäftigten berücksichtigt der Betrieb Dauer der Betriebszugehörigkeit, Lebensalter, Unterhaltspflichten und Schwerbehinderung. Ein berechtigtes betriebliches Interesse kann die Herausnahme Einzelner rechtfertigen. Prüfe Sonderkündigungsschutz und höre den Betriebsrat vor Ausspruch ordnungsgemäß an. Bei einer ordentlichen Kündigung gilt für Bedenken eine Woche. Die Kündigung selbst erfordert Schriftform. Für eine Kündigungsschutzklage laufen grundsätzlich drei Wochen ab Zugang der schriftlichen Kündigung.'),
      source('399–407, 430–446', 'NachwG § 2: https://www.gesetze-im-internet.de/nachwg/__2.html',
        'ArbZG § 3: ' + arbzg, 'TVG §§ 3–4: ' + tvg, 'KSchG §§ 1, 4, 23: ' + kschg, 'BetrVG §§ 99, 102: ' + betrvg),
    ],
    transfer: ['Der Betriebsrat widerspricht ordnungsgemäß und fristgerecht. Welchen zusätzlichen Anspruch prüft die Fachkraft?',
      'Wer Kündigungsschutzklage erhebt, kann bei einem ordnungsgemäßen Widerspruch unter den Voraussetzungen von § 102 Abs. 5 BetrVG Weiterbeschäftigung nach Ablauf der Kündigungsfrist bis zum rechtskräftigen Abschluss des Rechtsstreits verlangen. Die gesetzlichen gerichtlichen Ausnahmen bleiben zu prüfen.'],
  },
  {
    id: 'arbeitsrecht-entgeltfall', number: '6.12', title: 'Prüfungsfall: Krankmeldung und Entgeltfortzahlung',
    intro: 'Die Personalstelle eines Metallbetriebs beurteilt mehrere Ausfälle. Entscheidend sind der bisherige Verlauf, die krankheitsbedingte Arbeitsunfähigkeit und die Frage, ob eine Pflichtverletzung zu vertreten ist.',
    sections: [
      question('wartezeit', 'Wartezeit und eigenes Verhalten',
        'Eine Aushilfe ist ab dem zehnten Tag des Arbeitsverhältnisses für eine Woche arbeitsunfähig. Ein langjährig beschäftigter Kollege fällt gleichzeitig nach einem normalen Freizeitsportunfall aus. Wie unterscheiden sich die beiden Fälle?',
        'Der erste Ausfall liegt vollständig innerhalb der vierwöchigen Wartezeit. Daher entsteht dafür kein Anspruch gegen den Arbeitgeber nach § 3 EFZG. Beim Kollegen steht Freizeitsport für sich genommen der Entgeltfortzahlung nicht entgegen. Erst ein erheblicher, vorwerfbarer Verstoß gegen vernünftiges Verhalten zum eigenen Schutz kann den Anspruch ausschließen.'),
      question('krankheiten', 'Hinzutretende Erkrankung und eAU',
        'Eine gesetzlich versicherte Mitarbeiterin ist wegen einer Handverletzung fünf Wochen durchgehend arbeitsunfähig. In der fünften Woche kommt eine für sich arbeitsunfähig machende Infektion hinzu. Ohne Papierbescheinigung möchte die Personalstelle die Zahlung sofort einstellen. Wie prüfst du?',
        'Da die weitere Krankheit während bestehender Arbeitsunfähigkeit hinzugetreten ist, entsteht im Grundsatz ein einheitlicher Verhinderungsfall mit insgesamt bis zu sechs Wochen Entgeltfortzahlung. Die Mitarbeiterin muss den Betrieb unverzüglich informieren und die Arbeitsunfähigkeit fristgerecht ärztlich feststellen lassen. Im regulären eAU-Verfahren ruft der Arbeitgeber die Daten ab. Eine fehlende Papierbescheinigung allein lässt den Anspruch dort nicht entfallen.'),
      source('459–465', 'EFZG §§ 3, 5 und 7: ' + efzg,
        'BAG 5 AZR 505/18: https://www.bundesarbeitsgericht.de/entscheidung/5-azr-505-18/'),
    ],
    transfer: ['Was ändert sich, wenn die Handverletzung ausgeheilt ist, die Mitarbeiterin tatsächlich wieder arbeitet und erst später durch die Infektion arbeitsunfähig wird?',
      'Mit dem Ende der ursprünglichen Arbeitsunfähigkeit und einer danach unabhängig eintretenden anderen Erkrankung kann ein neuer Verhinderungsfall mit einem neuen Anspruch bis zu sechs Wochen vorliegen.'],
  },
  {
    id: 'arbeitsvertragsarten', parent: 'arbeitsvertrag', number: '6.1.1', title: 'Arbeitsvertragsarten und Arbeit auf Abruf',
    added: true,
    intro: 'Ein Arbeitsverhältnis lässt sich nach Dauer, Arbeitszeit und Einsatzmodell einordnen. Diese Merkmale können zusammenfallen. Eine befristete Teilzeitstelle kann beispielsweise zugleich als Arbeit auf Abruf gestaltet sein.',
    sections: [
      section('achsen', 'Dauer, Arbeitszeit und Einsatzmodell einordnen',
        [text('Unbefristete Verträge haben keinen vereinbarten Endzeitpunkt. Bei befristeten Verträgen sind Zeit- und Zweckbefristung zu unterscheiden. Eine Probezeit kann auch in einem unbefristeten Vertrag vereinbart sein. Vertiefe Form, Sachgrund und Verlängerung in '), link('Befristete Arbeitsverträge', 'recht-befristung'), text('.')],
        'Teilzeit betrifft die im Vergleich zu einem vergleichbaren Vollzeitbeschäftigten kürzere regelmäßige Arbeitszeit (§ 2 TzBfG). Prüfe das Benachteiligungsverbot des § 4 und gegebenenfalls die Voraussetzungen für eine Verringerung der Arbeitszeit nach § 8. Ein Minijob ist eine sozialversicherungsrechtliche Beschäftigungskategorie. Aus ihr folgt kein allgemeiner Wegfall von Urlaub, Mindestlohn oder Entgeltfortzahlung. Auch bei Arbeitnehmerüberlassung ist zu unterscheiden, mit wem der Arbeitsvertrag besteht und wer die tägliche Arbeit im Einsatzbetrieb organisiert.',
        'Berufsausbildung hat den Erwerb beruflicher Handlungsfähigkeit als Kern und richtet sich im Ausgangspunkt nach dem BBiG. Bei vermeintlich freien Dienstverhältnissen prüfe die tatsächliche persönliche Abhängigkeit nach § 611a BGB.'),
      section('abruf', 'Abrufarbeit und planbare Einsatzgrenzen',
        [text('Bei '), term('Arbeit auf Abruf', 'abrufarbeit'), text(' richtet sich die Arbeitsleistung nach dem Arbeitsanfall (§ 12 TzBfG). Die Vereinbarung muss eine bestimmte Dauer der wöchentlichen und täglichen Arbeitszeit festlegen. Fehlt die Wochenarbeitszeit, gelten 20 Stunden als vereinbart. Ohne bestimmte tägliche Dauer sind pro Einsatz mindestens drei aufeinanderfolgende Stunden abzurufen.')],
        'Ist eine wöchentliche Mindestarbeitszeit vereinbart, darf grundsätzlich höchstens ein Viertel zusätzlich abgerufen werden. Ist eine Höchstarbeitszeit vereinbart, darf grundsätzlich höchstens ein Fünftel weniger abgerufen werden. Zu prüfen sind zudem der gesetzliche Referenzrahmen, die im Regelfall viertägige Ankündigung und zulässige tarifliche Abweichungen.'),
      currentSource('TzBfG §§ 2, 4, 8, 12 und 14: ' + tzbfg, 'BGB §§ 611a und 622: ' + bgb, 'SGB IV § 8: https://www.gesetze-im-internet.de/sgb_4/__8.html', 'BBiG §§ 1 und 10: https://www.gesetze-im-internet.de/bbig_2005/', 'AÜG § 1: https://www.gesetze-im-internet.de/a_g/__1.html'),
    ],
    transfer: ['Eine Aushilfe soll je nach Auftrag arbeiten. Die Vereinbarung legt weder Wochen- noch Tagesarbeitszeit fest. Der Betrieb verlangt per Nachricht am Vorabend einen zweistündigen Einsatz. Ordne die gesetzlichen Vorgaben ein.',
      'Bei vereinbarter Abrufarbeit gelten ohne festgelegte Wochenarbeitszeit grundsätzlich 20 Wochenstunden. Ohne festgelegte Tagesdauer muss ein Abruf grundsätzlich drei zusammenhängende Stunden umfassen. Die Nachricht am Vorabend unterschreitet die gesetzliche Vorankündigung. Prüfe den Referenzrahmen und ob eine gesetzlich zulässige Tarifabweichung eingreift.'],
  },
  {
    id: 'arbeitsvertrag-pflichten', parent: 'arbeitsvertrag', number: '6.1.2', title: 'Pflichten von Arbeitnehmer und Arbeitgeber',
    added: true,
    intro: 'Arbeitsleistung und Vergütung sind die Hauptpflichten. Daneben schützen Rücksichtnahme-, Fürsorge- und Schutzpflichten die Interessen beider Seiten. Das Ergebnis hängt davon ab, wer welche Pflicht verletzt hat und welche Rechtsfolge geprüft wird.',
    sections: [
      section('arbeitnehmer', 'Arbeitsleistung und Sorgfalt einordnen',
        'Der Arbeitnehmer erbringt grundsätzlich persönlich die vereinbarte Arbeitsleistung (§§ 611a und 613 BGB). Wirksame Weisungen konkretisieren die Leistung innerhalb der gesetzlichen und vertraglichen Grenzen. Aus § 241 Abs. 2 folgen betriebliche Rücksichtnahmepflichten, etwa sorgfältiger Umgang mit Arbeitsmitteln und der Schutz rechtlich geschützter Geschäftsgeheimnisse.',
        [text('Bei Krankheit ist die Arbeitsunfähigkeit mit ihrer voraussichtlichen Dauer unverzüglich mitzuteilen. Welche Nachweise erforderlich sind und wie das eAU-Verfahren funktioniert, behandelt '), link('Entgeltfortzahlung bei Krankheit', 'recht-entgeltfortzahlung'), text('. Beim Schaden eines betrieblich veranlassten Einsatzes hängt die Arbeitnehmerhaftung unter anderem vom Verschuldensgrad ab. Eine Pflichtverletzung führt deshalb nicht automatisch zum Ersatz des gesamten Schadens.')]),
      section('arbeitgeber', 'Vergütung, Beschäftigung und Schutz prüfen',
        'Der Arbeitgeber schuldet die vereinbarte oder sonst maßgebliche Vergütung unter Beachtung zwingender Mindeststandards und einschlägiger Tarifnormen. § 615 BGB kann den Vergütungsanspruch bei Annahmeverzug erhalten, wenn der Arbeitgeber angebotene, vertragsgemäße Arbeit nicht annimmt und die übrigen Voraussetzungen erfüllt sind. Prüfe Leistungsfähigkeit und Leistungswillen, notwendiges Angebot sowie mögliche Anrechnung.',
        [text('Zur Fürsorge zählen insbesondere Schutz von Gesundheit und Persönlichkeit sowie sichere Arbeitsbedingungen (§§ 241 Abs. 2 und 618 BGB, ArbSchG). Daneben kommen Ansprüche auf vertragsgemäße Beschäftigung, '), link('Urlaub', 'recht-erholungsurlaub'), text(', '), link('Nachweis der Arbeitsbedingungen', 'recht-arbeitsvertrag'), text(' und bei Beendigung ein Zeugnis nach § 109 GewO in Betracht. Welche Pflicht und welche Rechtsfolge greifen, hängt vom Sachverhalt ab.')]),
      currentSource('BGB §§ 241, 293–297, 611a, 613, 615 und 618: ' + bgb, 'GewO §§ 106 und 109: ' + gewo, 'EFZG § 5: ' + efzg, 'ArbSchG §§ 3–5: https://www.gesetze-im-internet.de/arbschg/', 'MiLoG § 1: https://www.gesetze-im-internet.de/milog/__1.html'),
    ],
    transfer: ['Ein disponierter Mitarbeiter erscheint pünktlich, ist arbeitsfähig und bietet seine Arbeit an. Die Leitung schickt ihn wegen eines kurzfristig verlorenen Kundenauftrags nach Hause. Im selben Lager ist eine bekannte Stolperstelle ungesichert. Welche Pflichten sind getrennt zu prüfen?',
      'Das ordnungsgemäße Arbeitsangebot und die Ablehnung sprechen für Annahmeverzug. Prüfe Vergütung nach § 615, gegebenenfalls Anrechnung und die Verteilung des Betriebsrisikos. Davon unabhängig besteht die Pflicht, Gefährdungen zu beurteilen und geeignete Schutzmaßnahmen zu treffen. Ein Auftragsausfall erledigt die Arbeitsschutzpflicht nicht.'],
  },
  {
    id: 'schwerbehindertenschutz', parent: 'besonderer-kuendigungsschutz', number: '6.5.3.1', title: 'Schwerbehindertenschutz im Arbeitsverhältnis',
    added: true,
    intro: 'Der arbeitsrechtliche Schwerbehindertenschutz betrifft Einstellung, Arbeitsplatzgestaltung, Beteiligung, Urlaub und Kündigung. Welche Regel greift, hängt unter anderem von Schwerbehinderung oder Gleichstellung und der betroffenen Maßnahme ab.',
    sections: [
      section('status-einstellung', 'Status, Einstellung und Gestaltung prüfen',
        'Eine Schwerbehinderung setzt nach § 2 Abs. 2 SGB IX grundsätzlich einen Grad der Behinderung von wenigstens 50 und den gesetzlich geforderten Bezug zum Inland voraus. Bei einem Grad von 30 oder 40 kommt unter den Voraussetzungen des Abs. 3 eine Gleichstellung durch die Bundesagentur für Arbeit infrage, wenn ohne sie ein geeigneter Arbeitsplatz nicht erlangt oder behalten werden kann.',
        [text('Bei einer freien Stelle prüfst du die Pflichten des Arbeitgebers nach § 164. Berücksichtige die Beteiligung der zuständigen Vertretungen und bei der Beschäftigung eine behinderungsgerechte Organisation. Beschäftigungsquote und praxisnahe Gestaltung erklärt '), link('Behinderung und Teilhabe im Betrieb', 'fz-behinderung-teilhabe'), text('. Bei öffentlichen Arbeitgebern können unter § 165 besondere Pflichten hinzukommen.')]),
      section('beteiligung-urlaub', 'Vertretung, Zusatzurlaub und Kündigung unterscheiden',
        'Die Schwerbehindertenvertretung hat Beteiligungsrechte nach § 178 SGB IX. Sie ist in Angelegenheiten, die schwerbehinderte Beschäftigte einzeln oder als Gruppe berühren, grundsätzlich unverzüglich und umfassend zu unterrichten und vor einer Entscheidung anzuhören. Bei einer Kündigung kann eine unterbliebene Beteiligung nach § 178 Abs. 2 zur Unwirksamkeit führen.',
        'Schwerbehinderte Menschen erhalten nach § 208 grundsätzlich fünf bezahlte zusätzliche Arbeitstage bei einer Fünftagewoche. Bei einer anderen Wochenverteilung ist die Zahl anzupassen. Eine Gleichstellung vermittelt diesen Zusatzurlaub nicht (§ 151 Abs. 3).',
        'Eine Arbeitgeberkündigung erfordert im gesetzlichen Anwendungsbereich grundsätzlich vorherige Zustimmung des Integrationsamts (§ 168). Prüfe die Ausnahmen, etwa das noch nicht länger als sechs Monate bestehende Arbeitsverhältnis nach § 173. Die Zustimmungsprüfung ersetzt weder die Beteiligung der Schwerbehindertenvertretung noch eine gegebenenfalls erforderliche Betriebsratsanhörung. Jeder Verfahrensschritt hat seine eigenen Voraussetzungen.'),
      currentSource('SGB IX §§ 2, 151, 154, 164–165, 168, 173, 177–178 und 208: https://www.gesetze-im-internet.de/sgb_9_2018/', 'BetrVG § 102: ' + betrvg),
    ],
    transfer: ['Ein Betrieb will einen seit zwei Jahren beschäftigten und gleichgestellten Mitarbeiter kündigen. Ein Betriebsrat und eine Schwerbehindertenvertretung bestehen. Der Mitarbeiter arbeitet regelmäßig an fünf Tagen. Welche Schritte und welchen Zusatzurlaub prüfst du?',
      'Sofern keine gesetzliche Ausnahme greift, muss der Betrieb vor einer Kündigung die Zustimmung des Integrationsamts einholen, die Schwerbehindertenvertretung beteiligen und den Betriebsrat anhören. Die Gleichstellung allein begründet keinen Zusatzurlaub nach § 208. Bei festgestellter Schwerbehinderung stünden im ganzjährigen Regelfall bei fünf Arbeitstagen pro Woche fünf zusätzliche Arbeitstage zu.'],
  },
];

const articleId = (id: string) => 'recht-' + id;
const rootId = articleId('arbeitsrecht');

export const chapters: Chapter[] = units.map(unit => ({
  id: articleId(unit.id),
  subjectId,
  number: unit.number,
  title: unit.title,
  articleId: articleId(unit.id),
  ...(unit.parent ? { parentId: articleId(unit.parent) } : unit.id === 'arbeitsrecht' ? {} : { parentId: rootId }),
}));

export const articles: Article[] = units.map(unit => ({
  id: articleId(unit.id),
  subjectId,
  chapterId: articleId(unit.id),
  title: unit.title,
  number: unit.number,
  intro: unit.intro,
  sections: [...unit.sections, question('transfer', 'Transfer und Selbstkontrolle', ...unit.transfer)],
  updatedAt: unit.added || revised.has(unit.id) ? revisionDate : updatedAt,
  version: revised.has(unit.id) ? 2 : 1,
}));

type Term = [id: string, label: string, definition: string, article: string];

const terms: Term[] = [
  ['abmahnung', 'Abmahnung', 'Beanstandung eines konkret bezeichneten Pflichtverstoßes mit Aufforderung zu vertragsgemäßem Verhalten und Warnung vor arbeitsrechtlichen Konsequenzen im Wiederholungsfall.', 'abmahnung'],
  ['allgemeiner-schutz', 'Allgemeiner Kündigungsschutz', 'Schutz nach dem Kündigungsschutzgesetz vor sozial ungerechtfertigten Kündigungen. Er greift für Beschäftigte im gesetzlichen Anwendungsbereich, insbesondere nach erfüllter Wartezeit und bei entsprechender Betriebsgröße.', 'kuendigungsschutz'],
  ['anhoerung', 'Betriebsratsanhörung', 'Gesetzlich geregelte Unterrichtung des Betriebsrats und Gelegenheit zur Stellungnahme. Bei Kündigungen ist sie vor deren Ausspruch erforderlich.', 'betriebsrat-kuendigung'],
  ['abrufarbeit', 'Arbeit auf Abruf', 'Arbeitszeitmodell, bei dem die Arbeitsleistung entsprechend dem Arbeitsanfall innerhalb der vereinbarten und gesetzlichen Grenzen abgerufen wird.', 'arbeitsvertragsarten'],
  ['arbeitsvertrag', 'Arbeitsvertrag', 'Vertrag über weisungsgebundene und fremdbestimmte Arbeit in persönlicher Abhängigkeit gegen Vergütung.', 'arbeitsvertrag'],
  ['befristung', 'Befristung', 'Vereinbarung, dass das Arbeitsverhältnis bei Erreichen eines Termins oder Zwecks unter den gesetzlichen Voraussetzungen endet.', 'befristung'],
  ['besonderer-schutz', 'Besonderer Kündigungsschutz', 'Zusätzliche gesetzliche Beschränkung der Kündigung für bestimmte Gruppen oder Situationen. Sie kann etwa in einem Kündigungsverbot oder einer vorher erforderlichen behördlichen Zustimmung bestehen.', 'besonderer-kuendigungsschutz'],
  ['betriebsrat', 'Betriebsrat', 'Von den Beschäftigten gewählte betriebliche Interessenvertretung mit gesetzlich bestimmten Informations-, Beteiligungs- und Mitbestimmungsrechten.', 'betriebsrat'],
  ['eau', 'Elektronische Arbeitsunfähigkeitsbescheinigung (eAU)', 'Verfahren zur elektronischen Übermittlung von Arbeitsunfähigkeitsdaten. Im Regelfall rufen Arbeitgeber die verfügbaren Daten bei der Krankenkasse ab. Erkrankte melden sich weiterhin unverzüglich beim Arbeitgeber.', 'entgeltfortzahlung'],
  ['efz', 'Entgeltfortzahlung', 'Gesetzlicher Anspruch auf Fortzahlung des Arbeitsentgelts bei bestimmten Arbeitsausfällen, insbesondere bei krankheitsbedingter Arbeitsunfähigkeit oder gesetzlichen Feiertagen.', 'entgeltfortzahlung'],
  ['fortsetzung', 'Fortsetzungserkrankung', 'Erneute Arbeitsunfähigkeit aufgrund derselben Grundkrankheit. Für einen neuen vollen Entgeltfortzahlungszeitraum gelten die besonderen Fristen des § 3 EFZG.', 'entgeltfortzahlung'],
  ['guenstigkeit', 'Günstigkeitsprinzip im Tarifrecht', 'Bei unmittelbar geltenden Tarifnormen sind abweichende einzelvertragliche Regelungen zulässig, wenn der Tarifvertrag sie gestattet oder sie für die beschäftigte Person günstiger sind. Sachlich zusammenhängende Regelungen werden gemeinsam verglichen.', 'tarifvertrag'],
  ['handelsvertreter', 'Handelsvertreter', 'Selbstständig Gewerbetreibender, der ständig damit betraut ist, für einen Unternehmer Geschäfte zu vermitteln oder in dessen Namen abzuschließen.', 'handelsvertreter-status'],
  ['kuendigungsschutzklage', 'Kündigungsschutzklage', 'Klage beim Arbeitsgericht auf Feststellung, dass ein Arbeitsverhältnis durch eine Kündigung nicht aufgelöst wurde. Sie ist regelmäßig binnen drei Wochen ab Zugang der schriftlichen Kündigung zu erheben.', 'kuendigung'],
  ['mitbestimmung', 'Mitbestimmung des Betriebsrats', 'Beteiligungsrecht, bei dem der Arbeitgeber in gesetzlich bestimmten Angelegenheiten die Entscheidung nur mit Einigung oder dem gesetzlich vorgesehenen Ersatz treffen kann.', 'betriebsrat'],
  ['nachweis', 'Nachweis der Arbeitsbedingungen', 'Dokumentation und Mitteilung der maßgeblichen Arbeitsbedingungen nach dem Nachweisgesetz. Für Inhalt, Form und Zeitpunkt gelten eigene Vorschriften.', 'arbeitsvertrag'],
  ['nachtarbeit', 'Nachtarbeit nach ArbZG', 'Arbeit, die mehr als zwei Stunden der gesetzlichen Nachtzeit umfasst. Die Nachtzeit reicht grundsätzlich von 23 bis 6 Uhr, in Bäckereien und Konditoreien von 22 bis 5 Uhr.', 'arbeitszeit'],
  ['ordentlich', 'Ordentliche Kündigung', 'Einseitige Erklärung zur Beendigung eines Arbeitsverhältnisses unter Einhaltung der geltenden Kündigungsfrist und der übrigen Wirksamkeitsvoraussetzungen.', 'kuendigung'],
  ['sozialauswahl', 'Sozialauswahl', 'Auswahl unter vergleichbaren Beschäftigten bei einer betriebsbedingten Kündigung anhand der Betriebszugehörigkeit, des Lebensalters, der Unterhaltspflichten und der Schwerbehinderung.', 'kuendigungsschutz'],
  ['tarifbindung', 'Tarifbindung', 'Rechtliche Bindung an einen Tarifvertrag, insbesondere kraft Mitgliedschaft bei einer Tarifvertragspartei oder als selbst tarifschließender Arbeitgeber. Die Geltung tariflicher Regelungen kann auch auf einer anderen Grundlage beruhen.', 'tarifvertrag'],
  ['tarifvertrag', 'Tarifvertrag', 'Schriftlicher Vertrag gesetzlich tariffähiger Parteien. Er regelt deren Rechte und Pflichten und kann Rechtsnormen über Arbeitsverhältnisse und betriebliche Fragen enthalten.', 'tarifvertrag'],
  ['urlaub', 'Erholungsurlaub', 'Bezahlte Freistellung von der Arbeit zur Erholung. Der gesetzliche Mindesturlaub entspricht bei regelmäßiger Verteilung vier Wochen jährlich.', 'erholungsurlaub'],
  ['versetzung', 'Versetzung nach BetrVG', 'Zuweisung eines anderen Arbeitsbereichs, die voraussichtlich länger als einen Monat dauert oder die Umstände der Arbeit erheblich verändert. Die gesetzliche Besonderheit für üblicherweise wechselnde Arbeitsplätze ist zu beachten.', 'versetzung'],
  ['weisung', 'Direktionsrecht', 'Befugnis des Arbeitgebers, Arbeit und betriebliche Ordnung nach billigem Ermessen im Rahmen verbindlicher Vorgaben näher zu bestimmen.', 'arbeitsvertrag'],
];

export const glossary: GlossaryTerm[] = terms.map(([id, label, definition, article]) => ({
  id: 'recht-arb-begriff-' + id,
  subjectId,
  term: label,
  definition,
  articleId: articleId(article),
}));
