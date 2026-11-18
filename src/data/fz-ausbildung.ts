import type { Article, ArticleSection, Chapter, GlossaryTerm, RichText } from '../types';

const subjectId = 'fuehrung-zusammenarbeit';
const updatedAt = Date.UTC(2026, 10, 18);
const bbig = 'https://www.gesetze-im-internet.de/bbig_2005/';
const aevo = 'https://www.gesetze-im-internet.de/ausbeignv_2009/';
const jarbschg = 'https://www.gesetze-im-internet.de/jarbschg/';
const sgb3 = 'https://www.gesetze-im-internet.de/sgb_3/';
const betrvg = 'https://www.gesetze-im-internet.de/betrvg/';
const indkfl = 'https://www.gesetze-im-internet.de/indkflausbv/anlage.html';

type Paragraph = string | RichText[];
type Unit = {
  id: string;
  number: string;
  title: string;
  intro: string;
  sections: ArticleSection[];
  transfer: [prompt: string, answer: string];
  parent?: string;
};

const text = (value: string): RichText => ({ text: value });
const link = (value: string, articleId: string): RichText => ({ text: value, articleId });
const term = (value: string, id: string): RichText => ({ text: value, termId: 'fz-ausb-begriff-' + id });
const shared = (value: string, termId: string): RichText => ({ text: value, termId });

function section(id: string, title: string, ...body: Paragraph[]): ArticleSection {
  return { id, title, paragraphs: body.map(p => typeof p === 'string' ? [text(p)] : p) };
}

function source(pages: string, ...links: string[]): ArticleSection {
  return section('quellen', 'Quellen und Rechtsstand', 'DIHK-Textband Führung und Zusammenarbeit, Druckseiten ' + pages + '. Rechts- und Quellenabgleich 18. November 2026.', ...links);
}

const units: Unit[] = [
  {
    id: 'ausbildung', number: '5', title: 'Ausbildung planen und durchführen',
    intro: 'Berufsausbildung baut die Fähigkeit auf, berufliche Aufgaben selbstständig, fachgerecht und verantwortungsvoll zu bewältigen. Betriebe gewinnen dadurch qualifizierten Nachwuchs und die Auszubildenden einen überbetrieblich nutzbaren Berufsabschluss.',
    sections: [
      section('lernorte', 'Das duale System',
        [text('Zur '), term('dualen Ausbildung', 'dual'), text(' gehören Betrieb und Berufsschule. Der Betrieb vermittelt berufliche Handlungsfähigkeit an Arbeits- und Geschäftsprozessen. Die Schule vermittelt berufliche sowie allgemeinbildende Kompetenzen. Unterrichtstage oder Blockunterricht werden in der Einsatzplanung berücksichtigt. Weitere Lernorte können fehlende betriebliche Inhalte ergänzen.')],
        'Anerkannte Ausbildungsberufe haben bundesweit geregelte Mindestinhalte und Prüfungsanforderungen. Das BIBB-Verzeichnis 2026 weist 324 anerkannte Berufe nach BBiG oder HwO aus. Der Lernort Berufsschule unterliegt dem Landesrecht. Das Zusammenspiel von beruflicher Praxis, Schule und Kammer ist kennzeichnend, auch wenn andere Länder abweichende Ausbildungsmodelle nutzen.'),
      section('entwicklung', 'Vom Lehrling zum geregelten Ausbildungsverhältnis',
        'Historisch gestalteten Zünfte und Innungen die Lehre. Heute bestimmen Ausbildungsordnung, Vertrag und Schutzvorschriften das Ausbildungsverhältnis. Technische, gesellschaftliche und organisatorische Veränderungen werden über modernisierte Ordnungen und betriebliche Lernaufgaben berücksichtigt.',
        'Die im Buch verglichenen Jugenderwerbslosenquoten von 2008 und 2023 veranschaulichen Unterschiede zwischen Ländern. Aus dem Vergleich lässt sich keine isolierte Wirkung des dualen Systems ableiten. Konjunktur, Demografie, Bildungssystem und Erhebungsmethode beeinflussen die Quoten. Das beim BIBB angesiedelte GOVET unterstützt internationale Berufsbildungskooperationen.'),
      section('orientierung', 'Vom Bedarf bis zur Abschlussprüfung',
        [link('Rechtsgrundlagen und Ausbildungspläne', 'fz-ausbildung-rechtsrahmen'), text(' · '), link('AEVO', 'fz-ausbildung-aevo'), text(' · '), link('Verantwortliche und Eignung', 'fz-ausbildung-eignung')],
        [link('Unterweisung und Methoden', 'fz-ausbildung-unterweisung'), text(' · '), link('Prüfungen', 'fz-ausbildung-pruefung'), text(' · '), link('Übungsfall zur Angebotsbearbeitung', 'fz-ausbildung-fall')]),
      source('63–67', 'BBiG §§ 1–5 und 90: ' + bbig, 'BIBB-Verzeichnis 2026: https://www.bibb.de/dienst/publikationen/de/21008',
        'GOVET: https://www.govet.international/'),
    ],
    transfer: ['Im Betrieb lernen Auszubildende vor allem die Bedienung einer internen Software. Wie prüfst du, ob die Berufsausbildung ausreichend geplant ist?',
      'Prüfe die Ausbildungsordnung und gleiche alle vorgeschriebenen Kompetenzen mit geeigneten betrieblichen Aufgaben und Einsatzorten ab. Stimme die Entwicklung mit der Berufsschule ab und organisiere bei Lücken ergänzende Lernorte. Die Bedienung eines einzelnen Produkts ersetzt die berufliche Handlungsfähigkeit nicht.'],
  },
  {
    id: 'ausbildung-rechtsrahmen', number: '5.1', title: 'Rechtsgrundlagen und Ausbildungsplanung',
    intro: 'Das BBiG regelt die betriebliche Berufsausbildung, die Ausbildungsordnung konkretisiert den Beruf und der betriebliche Ausbildungsplan setzt diese Vorgaben im Unternehmen um. Daneben gelten besondere Arbeits-, Schutz-, Mitbestimmungs- und Schulvorschriften.',
    sections: [
      section('planebenen', 'Vom Berufsbild zum individuellen Einsatzplan',
        [text('Die '), term('Ausbildungsordnung', 'ordnung'), text(' benennt mindestens Ausbildungsberuf, Dauer, Ausbildungsberufsbild, Ausbildungsrahmenplan und Prüfungsanforderungen. Das Berufsbild nennt, was erworben werden soll. Der '), term('Ausbildungsrahmenplan', 'rahmenplan'), text(' gliedert die Vermittlung sachlich und zeitlich. Der Rahmenlehrplan beschreibt dagegen die schulischen Lernfelder.')],
        'Der betriebliche Ausbildungsplan überträgt die bundesrechtlichen Vorgaben auf konkrete Aufgaben, Abteilungen, Zeitfenster und Zuständigkeiten. Aktualisiere den individuellen Plan bei einem geänderten Einsatz und kontrolliere, dass Pflichtinhalte weiter erreichbar sind. Die sachliche und zeitliche Gliederung gehört zur Vertragsabfassung nach § 11 BBiG.',
        'Praxis: Die Auswahl von Lieferanten wird in einem Einkaufsprojekt geübt. Dazu ordnet der Ausbildungsplan eine zuständige Fachkraft, einen Zeitraum, Beobachtungskriterien und eine Auswertung zu. Ein zweiter Azubi bearbeitet dieselbe Kompetenz im Servicebetrieb anhand eines Vergleichs von Ersatzteilanbietern. Lernziel und Maßstab sind vergleichbar, die betrieblichen Fälle verschieden.'),
      section('rechtskarte', 'Welches Regelwerk beantwortet welche Frage?',
        'BBiG, gegebenenfalls HwO und die jeweilige Verordnung bestimmen Berufsstruktur, Vertragsverhältnis und Prüfungen. Die AEVO regelt den pädagogischen Nachweis. JArbSchG schützt Minderjährige, ArbZG und BUrlG bilden wichtige Grundlagen für volljährige Auszubildende. Berufsschulpflicht ergibt sich aus dem Schulrecht des jeweiligen Landes.',
        'BetrVG regelt Beteiligungsrechte und JAV. AGG gilt unter anderem bei Auswahl und Einstellung. MuSchG und BEEG betreffen Mutterschutz und Elternzeit. SGB IX enthält Regelungen zu Rehabilitation und Teilhabe. Art. 12 GG schützt die Freiheit der Berufswahl. TVG und anwendbare Tarifverträge bestimmen tarifliche Rechte und das Günstigkeitsprinzip. Bei Kündigungen ist das Sonderrecht des § 22 BBiG Ausgangspunkt. Weitere Schutzgesetze sind im konkreten Fall zu prüfen.'),
      section('vertiefungen', 'Vertrag, Vergütung und Schutz',
        [link('Ausbildungsvertrag und Beendigung', 'fz-ausbildungsvertrag'), text(' · '), link('Ausbildungsvergütung und Tarif', 'fz-ausbildungsverguetung'), text(' · '), link('Arbeitszeit, Berufsschule und Jugendschutz', 'fz-ausbildung-jugendschutz')]),
      source('64–67', 'BBiG §§ 3–5, 10–26: ' + bbig, 'BIBB-Verzeichnis: https://www.bibb.de/de/65925.php',
        'BetrVG: ' + betrvg, 'ArbZG: https://www.gesetze-im-internet.de/arbzg/', 'JArbSchG: ' + jarbschg),
    ],
    transfer: ['Ein Ausbildungsleiter übernimmt die Wochenzahlen aus dem Ausbildungsrahmenplan unverändert als Dienstplan. Was fehlt?',
      'Der Rahmenplan gibt eine Vermittlungsgliederung vor. Erst der betriebliche Plan ordnet die Kompetenzen konkreten Geschäftsprozessen, geeigneten Abteilungen, Zeitfenstern, Lernaufträgen und verantwortlichen Personen zu. Berufsschule und externe Ausbildungsstationen müssen mitgeplant werden.'],
  },
  {
    id: 'ausbildungsvertrag', number: '5.1.1', title: 'Ausbildungsvertrag, Pflichten und Beendigung', parent: 'ausbildung-rechtsrahmen',
    intro: 'Der Berufsausbildungsvertrag verpflichtet den Betrieb zur planmäßigen Ausbildung und die Auszubildenden zur aktiven Mitwirkung. Vertragsabfassung, tägliche Pflichten und Beendigung folgen unterschiedlichen Regeln.',
    sections: [
      section('vertrag', 'Ausbildungsvertrag und Textform',
        [text('Der wesentliche Inhalt des '), term('Berufsausbildungsvertrags', 'vertrag'), text(' ist nach § 11 BBiG unverzüglich nach Abschluss, spätestens vor Ausbildungsbeginn in Textform abzufassen. Elektronische Übermittlung ist zulässig, wenn die Abfassung gespeichert und ausgedruckt werden kann und der Empfangsnachweis eingeholt wird. Bei Minderjährigen sind die gesetzlichen Vertreter zu beteiligen. Die Eintragung bei der zuständigen Stelle ist zu veranlassen.')],
        'Die Abfassung enthält insbesondere Beteiligte, Beruf und Ziel, sachliche und zeitliche Gliederung, Beginn, Dauer, Ausbildungsstätte und externe Maßnahmen, regelmäßige tägliche Ausbildungszeit, Probezeit, Vergütung, Überstundenausgleich, Urlaub, Kündigungsvoraussetzungen, Hinweis auf anwendbare Kollektivregelungen und die Form des Ausbildungsnachweises.'),
      section('pflichten', 'Was Betrieb und Auszubildende leisten',
        [text('Ausbildende vermitteln die berufliche Handlungsfähigkeit planmäßig, bestellen geeignetes Personal, stellen notwendige Ausbildungsmittel kostenlos bereit, fördern und schützen die Auszubildenden, halten sie zur Berufsschule an und übertragen nur ausbildungsbezogene, den körperlichen Kräften angemessene Aufgaben. Der schriftliche oder elektronische '), term('Ausbildungsnachweis', 'nachweis'), text(' wird regelmäßig durchgesehen und soll am Arbeitsplatz geführt werden können.')],
        'Auszubildende bemühen sich um das Ausbildungsziel, erledigen Lernaufgaben sorgfältig, nehmen an freigestellten Maßnahmen teil, befolgen ausbildungsbezogene Weisungen, beachten betriebliche Ordnung, behandeln Arbeitsmittel pfleglich, wahren Betriebsgeheimnisse und führen den Nachweis. Ein dauerhaftes Aushelfen als reine Ersatzarbeitskraft führt am Zweck der Ausbildung vorbei.'),
      section('ende', 'Probezeit, Kündigung und Abschluss',
        'Die Probezeit dauert mindestens einen und höchstens vier Monate. In dieser Zeit kann ohne Kündigungsfrist gekündigt werden. Danach ist eine Kündigung aus wichtigem Grund fristlos möglich. Auszubildende können außerdem mit vier Wochen Frist kündigen, wenn sie die Berufsausbildung aufgeben oder sich für eine andere Berufstätigkeit ausbilden lassen wollen. Die Kündigung bedarf der Schriftform und nach der Probezeit der Gründe. Die elektronische Form ist ausgeschlossen. Für wichtige Gründe gilt grundsätzlich die Zweiwochenfrist ab Kenntnis, mit der gesetzlichen Hemmung bei einem vorgesehenen Güteverfahren.',
        'Das Verhältnis endet grundsätzlich mit Ablauf der Dauer oder bei vorher bestandenem Abschluss mit Bekanntgabe des Prüfungsergebnisses durch den Prüfungsausschuss. Nach Nichtbestehen verlängert es sich auf Verlangen bis zur nächstmöglichen Wiederholungsprüfung, insgesamt höchstens um ein Jahr. Bei Weiterbeschäftigung ohne ausdrückliche Vereinbarung kann ein unbefristetes Arbeitsverhältnis entstehen (§ 24 BBiG).'),
      source('64–66, 73', 'BBiG §§ 10–16, 20–25, 34–36: ' + bbig),
    ],
    transfer: ['Ein Betrieb verschickt die Vertragsabfassung als speicherbare PDF mit Empfangsnachweis. Später will er nach Ende der Probezeit per E-Mail kündigen. Welche Formregeln gelten?',
      'Textform mit den gesetzlich geforderten Übermittlungsbedingungen kann für die Vertragsabfassung genügen. Bei Kündigung ist die Schriftform erforderlich und die elektronische Form ausgeschlossen. Nach der Probezeit braucht der Betrieb außerdem einen wichtigen Grund und muss diesen in der Kündigung angeben.'],
  },
  {
    id: 'ausbildungsverguetung', number: '5.1.2', title: 'Ausbildungsvergütung und Mindestbeträge', parent: 'ausbildung-rechtsrahmen',
    intro: 'Der Betrieb zahlt eine angemessene Vergütung, die mit dem Ausbildungsfortschritt mindestens jährlich steigt. Die gesetzliche Mindestvergütung ist an das Kalenderjahr des Ausbildungsbeginns gebunden.',
    sections: [
      section('systematik', 'Basisjahr und Aufschläge',
        [text('Die '), term('Mindestausbildungsvergütung', 'mindestverguetung'), text(' wird jährlich für neu beginnende Ausbildungen bekannt gemacht. Bezogen auf den Mindestbetrag des ersten Jahres der jeweiligen Startkohorte betragen die Aufschläge ab dem zweiten Jahr 18 %, im dritten Jahr 35 % und im vierten Jahr 40 %. Der im Buch für das dritte Jahr genannte Satz von 30 % ist zu korrigieren.')],
        'Bei Ausbildungsbeginn 2026 lauten die veröffentlichten Monatsbeträge 724 €, 854 €, 977 € und 1.014 €. Für 2027 beginnende Ausbildungen lauten sie 764 €, 902 €, 1.031 € und 1.070 €. Ein Ausbildungsjahr in einem späteren Kalenderjahr wechselt nicht allein deshalb zur dortigen Startkohorte.'),
      section('beispiel', 'Rechenbeispiel und Tarifprüfung',
        'Start im September 2026. Drittes Ausbildungsjahr: 724 € × 1,35 = 977,40 €. Entsprechend der gesetzlichen Rundung ergibt das 977 € Mindestvergütung im Monat. Bei einem Betrieb ohne Tarifbindung, auf den der Geltungsbereich eines einschlägigen Tarifvertrags mit 1.300 € zutrifft, sind außerdem 80 % × 1.300 € = 1.040 € als Richtgrenze der Angemessenheit zu berücksichtigen. Eine Vergütung von 990 € übersteigt zwar 977 €, liegt hier jedoch mehr als 20 % unter 1.300 €.',
        'Ein tatsächlich geltender Tarifvertrag kann nach § 17 Abs. 3 BBiG unter der gesetzlichen Mindestvergütung liegen. Bei Teilzeit darf die prozentuale Kürzung der Vergütung die Kürzung der Ausbildungszeit nicht überschreiten. Beschäftigung über die vereinbarte regelmäßige tägliche Ausbildungszeit wird besonders vergütet oder durch entsprechende Freizeit ausgeglichen.'),
      source('66', 'BBiG §§ 17–19: ' + bbig, 'BIBB, Beträge 2026: https://www.bibb.de/de/pressemitteilung_212952.php', 'BIBB, Fortschreibung 2027: https://www.bibb.de/de/199658.php'),
    ],
    transfer: ['Die Ausbildung begann 2027. Wie ermittelst du den gesetzlichen Mindestbetrag im zweiten Ausbildungsjahr unter den Standardvoraussetzungen?',
      'Der Grundbetrag 764 € bleibt als Basis der Startkohorte bestehen. 764 € × 1,18 ergeben 901,52 €, gerundet monatlich 902 €. Anwendbare Tarifbedingungen und Teilzeit sind gegebenenfalls zusätzlich zu prüfen.'],
  },
  {
    id: 'ausbildung-jugendschutz', number: '5.1.3', title: 'Jugendschutz, Ausbildungszeit und Berufsschule', parent: 'ausbildung-rechtsrahmen',
    intro: 'Die Einsatzplanung schützt junge Menschen und berücksichtigt Berufsschule, Prüfungen sowie Urlaub. Entscheidend sind Alter, Ausbildungsort, Tagesablauf und anwendbare Ausnahmen.',
    sections: [
      section('zeit', 'Minderjährige und Volljährige',
        'Für Jugendliche gelten nach § 8 JArbSchG grundsätzlich höchstens acht Stunden täglich und 40 Stunden wöchentlich, mit einzelnen gesetzlichen Ausnahmen. Die Fünftagewoche, grundsätzlich zwölf Stunden tägliche Freizeit und die Nachtruhe sind getrennt zu prüfen. Ab mehr als viereinhalb bis sechs Stunden Arbeitszeit sind mindestens 30 Minuten Pause, bei mehr als sechs Stunden mindestens 60 Minuten vorzusehen. Ein Pausenabschnitt dauert mindestens 15 Minuten.',
        'Der Mindesturlaub nach § 19 JArbSchG richtet sich nach dem Alter zu Beginn des Kalenderjahrs: unter 16 Jahren 30 Werktage, unter 17 Jahren 27 und unter 18 Jahren 25. Die Werktage beziehen sich auf die Sechstagewoche. Bei anderer Arbeitswoche wird die Urlaubsdauer entsprechend umgerechnet. Volljährige fallen insbesondere unter ArbZG und BUrlG sowie gegebenenfalls Tarifvertrag oder günstigere Vereinbarungen.'),
      section('freistellung', 'Berufsschule, Prüfungen und Wege anrechnen',
        [text('Für die '), term('Freistellung', 'freistellung'), text(' in der Ausbildung gilt bei Volljährigen § 15 BBiG, bei unter 18-Jährigen vor allem §§ 9–10 JArbSchG. Vor einem vor 9 Uhr beginnenden Berufsschulunterricht ist Beschäftigung untersagt. Ein Unterrichtstag mit mehr als fünf Stunden von mindestens 45 Minuten wird einmal pro Woche mit der durchschnittlichen täglichen Ausbildungszeit angerechnet. Ein planmäßiger Block mit mindestens 25 Stunden an mindestens fünf Tagen wird mit der durchschnittlichen wöchentlichen Ausbildungszeit angerechnet. In der Blockwoche sind bis zu zwei Stunden zusätzliche betriebliche Ausbildungsveranstaltungen zulässig.')],
        'Die übrige Unterrichtszeit zählt mit Pausen und notwendigen Wegen zwischen Schule und Ausbildungsstätte. Freistellung gilt auch für einschlägige Prüfungen und Pflichtmaßnahmen außerhalb der Ausbildungsstätte und für den Arbeitstag unmittelbar vor der schriftlichen Abschlussprüfung. Der Schulweg von zuhause ist nicht mit einem Wechselweg zwischen Schule und Betrieb gleichzusetzen.'),
      section('weitere-grenzen', 'Einsatz und Gesundheitsschutz',
        'Vor der erstmaligen Beschäftigung Minderjähriger sind die gesetzlichen Anforderungen an die ärztliche Erstuntersuchung und später die Nachuntersuchung zu prüfen. Gefährliche Tätigkeiten sind grundsätzlich beschränkt. Soweit § 22 JArbSchG für das Erreichen des Ausbildungsziels eine Ausnahme zulässt, müssen unter anderem geeignete fachkundige Aufsicht und sichere Bedingungen gewährleistet sein.'),
      source('64–65, 73–74', 'BBiG § 15: ' + bbig, 'JArbSchG §§ 8–19, 22 und 32–33: ' + jarbschg, 'ArbZG: https://www.gesetze-im-internet.de/arbzg/', 'BUrlG: https://www.gesetze-im-internet.de/burlg/'),
    ],
    transfer: ['Ein 17-jähriger Azubi hat an einem Dienstag sechs Unterrichtsstunden à 45 Minuten und sonst keinen weiteren langen Schultag in der Woche. Bei einer regelmäßigen Fünftagewoche mit 40 Stunden möchte der Betrieb ihn anschließend drei Stunden einsetzen. Wie ist der Dienstag anzurechnen?',
      'Der lange Berufsschultag zählt einmal pro Woche mit der durchschnittlichen täglichen Arbeitszeit. 40 Stunden geteilt durch fünf sind acht Stunden. Eine zusätzliche betriebliche Beschäftigung am Dienstag ist in dieser Konstellation nicht vorgesehen.'],
  },
  {
    id: 'ausbildung-aevo', number: '5.2', title: 'AEVO: Handlungsfelder und Eignungsprüfung',
    intro: 'Die Ausbilder-Eignungsverordnung (AEVO) konkretisiert den Nachweis berufs- und arbeitspädagogischer Eignung. Ihre vier Handlungsfelder begleiten die Ausbildung vom Prüfen der Voraussetzungen bis zum Abschluss.',
    sections: [
      section('handlungsfelder', 'Vier Handlungsfelder in der Praxis',
        [term('AEVO', 'aevo'), text(' – 1. Voraussetzungen prüfen und planen. Begründe Nutzen und Bedarf, ordne Berufsbildungssystem und geltende Rahmenbedingungen ein, wähle einen Ausbildungsberuf, prüfe die Eignung des Betriebs sowie ergänzende Lernorte und vorbereitende Angebote. Kläre die Aufgaben und Qualifikationen der Mitwirkenden.')],
        '2. Ausbildung vorbereiten und Einstellung begleiten. Erstelle den betrieblichen Ausbildungsplan aus typischen Arbeitsprozessen, beteilige betriebliche Interessenvertretungen, koordiniere dich mit der Berufsschule, wähle Auszubildende nach geeigneten und diskriminierungsfreien Kriterien aus und veranlasse Vertrag und Registrierung. Prüfe gegebenenfalls geeignete Auslandsabschnitte.',
        '3. Ausbildung durchführen. Gestalte Probezeit und Lernkultur, entwickle Arbeitsaufträge, wähle Medien und Methoden, gib Rückmeldung und bewerte Leistungen. Erkenne Lernschwierigkeiten und Konflikte, nutze Hilfen und Verlängerung oder biete Zusatzqualifikation, Verkürzung oder vorzeitige Zulassung an. Fördere soziale, persönliche und interkulturelle Entwicklung.',
        '4. Ausbildung abschließen. Plane Vorbereitung und Anmeldung zur Abschluss- bzw. Gesellenprüfung, melde durchführungsrelevante Besonderheiten, unterstütze die Zeugniserstellung und berate zu betrieblichen Entwicklungswegen und Weiterbildung.'),
      section('pruefung', 'Schriftlicher und praktischer Nachweis',
        'Der schriftliche Teil umfasst fallbezogene Aufgaben aus allen vier Handlungsfeldern und soll drei Stunden dauern. Der praktische Teil dauert insgesamt höchstens 30 Minuten. Eine berufstypische Ausbildungssituation wird präsentiert oder praktisch durchgeführt und im Fachgespräch begründet. Die Präsentation soll 15 Minuten nicht überschreiten. In Landwirtschaft und Hauswirtschaft gelten besondere Vorgaben.',
        'Die AEVO gilt grundsätzlich für Ausbildende in anerkannten Berufen nach BBiG und sieht Ausnahmen sowie weitere Nachweismöglichkeiten vor. Ein AEVO-Nachweis ersetzt die sonstigen Anforderungen an Ausbildungsstätte und verantwortliche Person nicht. Wer beim Geprüften Wirtschaftsfachwirt die handlungsspezifischen Qualifikationen bestanden hat, ist nach § 11 Abs. 2 WFachwPrV vom schriftlichen Teil der AEVO-Prüfung befreit. Für den praktischen Nachweis gilt weiterhin das vorgesehene Verfahren.'),
      section('praxis', 'Praxis: Einen ungeeigneten Einsatz umplanen',
        'Ein Betrieb möchte ausbilden, verfügt aber über keinen für einen Pflichtinhalt geeigneten Arbeitsplatz. Die Eignungsprüfung und Suche nach einem Verbundpartner gehören zu Handlungsfeld 1. Die Einbindung des externen Abschnitts in den Ausbildungsplan gehört zu Handlungsfeld 2. Die Auswahl einer Lernmethode vor Ort ist Teil von Handlungsfeld 3.'),
      source('67–69', 'AEVO §§ 1–6: ' + aevo, 'BBiG §§ 27–30: ' + bbig, 'WFachwPrV § 11: https://www.gesetze-im-internet.de/wfachwprv/__11.html'),
    ],
    transfer: ['Die Berufsschule meldet Schwierigkeiten bei Kalkulationen. Zugleich steht der Prüfungstermin noch nicht fest. Welche Handlungsfelder greifst du auf?',
      'Handlungsfeld 3: Lernstand klären, passende Aufgaben und Rückmeldungen organisieren. Handlungsfeld 4: Prüfungstermine und Anmeldung klären, passende Prüfungsvorbereitung koordinieren und auf durchführungsrelevante Besonderheiten hinweisen.'],
  },
  {
    id: 'ausbildung-eignung', number: '5.3', title: 'Eignung von Betrieb, Ausbildenden und Ausbildungspersonal',
    intro: 'Ob ein Betrieb ausbilden kann, richtet sich nach der Ausbildungsstätte und der persönlichen und fachlichen Eignung der zuständigen Personen. Vertragspartner, verantwortliche Ausbilder und mitwirkende Fachkräfte haben unterschiedliche Rollen.',
    sections: [
      section('eignung', 'Die drei Eignungsebenen',
        [text('Die '), term('Ausbildungsstätte', 'ausbildungsstaette'), text(' muss nach Art und Einrichtung geeignet sein. Die Zahl der Auszubildenden soll in angemessenem Verhältnis zu Ausbildungsplätzen bzw. Fachkräften stehen. Prüfe, welche Pflichtinhalte, Arbeitsmittel und Betreuung verfügbar sind. Können einzelne Inhalte mit geeigneten externen Maßnahmen vermittelt werden, kann die Ausbildungsstätte nach § 27 Abs. 2 BBiG dennoch geeignet sein.')],
        'Einstellen darf nur, wer persönlich geeignet ist. Wer etwa Kinder und Jugendliche nicht beschäftigen darf oder wiederholt bzw. schwer gegen einschlägige Ausbildungsvorschriften verstoßen hat, ist nach § 29 BBiG persönlich ungeeignet. Ausbilden darf, wer persönlich und fachlich geeignet ist. Wer als Ausbildender nicht selbst ausbildet oder fachlich nicht geeignet ist, bestellt eine geeignete verantwortliche Person.',
        'Die fachliche Eignung verbindet berufliches Können mit berufs- und arbeitspädagogischem Können. § 30 BBiG enthält verschiedene Nachweiswege, etwa einschlägigen Berufsabschluss, vollständige Vergleichbarkeit im Feststellungsverfahren, bestimmte schulische oder staatlich anerkannte Prüfungen, einschlägigen deutschen Hochschulabschluss oder anerkannte Gleichwertigkeit eines ausländischen Abschlusses. Berufspraxis ist bei den gesetzlichen Nachweiswegen mit zu berücksichtigen. Der pädagogische Teil ist nach AEVO oder einschlägigen Sonderregeln zu belegen.'),
      section('rollen', 'Verantwortung und Mitwirkung',
        [text('Eine geeignete '), term('ausbildende Person', 'ausbildender'), text(' ist Vertragspartner und sorgt für Organisation und Mittel. Die verantwortliche Ausbilderin vermittelt nach § 28 BBiG unmittelbar, verantwortlich und in wesentlichem Umfang. '), term('Ausbildungsbeauftragte', 'ausbildungsbeauftragte'), text(' können unter dieser Verantwortung einzelne Inhalte vermitteln, wenn sie persönlich geeignet sind und die erforderlichen beruflichen Fertigkeiten, Kenntnisse und Fähigkeiten besitzen.')],
        'Praxis: Ein neuer Logistikstandort hat eine erfahrene Warenannahmefachkraft ohne AEVO-Nachweis. Sie kann unter der Verantwortung der zuständigen Ausbilderin die Wareneingangskontrolle unterweisen. Die planmäßige Abdeckung, Beurteilung und Abstimmung mit der zuständigen Stelle bleiben in der verantwortlichen Rolle.'),
      source('69–70', 'BBiG §§ 27–33: ' + bbig, 'AEVO: ' + aevo),
    ],
    transfer: ['Ein IT-Betrieb will erstmals ausbilden. Die Geschäftsführung ist persönlich geeignet, ein Pflichtgebiet fehlt und eine Fachkraft hat praktische Erfahrung ohne AEVO. Wie gehst du vor?',
      'Prüfe zunächst Eignung und Kapazität der Ausbildungsstätte sowie geeignete externe Vermittlung des fehlenden Pflichtgebiets. Der Betrieb bestellt eine fachlich und persönlich geeignete verantwortliche Person. Die Fachkraft kann unter deren Verantwortung bei geeigneten Aufgaben mitwirken.'],
  },
  {
    id: 'ausbildung-beteiligte', number: '5.4', title: 'Beteiligte, Kammern und Einstiegsqualifizierung',
    intro: 'Ausbildung ist eine gemeinsame Aufgabe. Klare Ansprechpersonen helfen, Lernlücken, Absprachen zur Berufsschule und organisatorische Probleme früh zu bearbeiten.',
    sections: [
      section('akteure', 'Wer übernimmt welche Aufgabe?',
        'Auszubildende und gegebenenfalls gesetzliche Vertreter sind bei Vertragsschluss beteiligt. Der Betrieb plant Lerngelegenheiten, verantwortliche Ausbilder begleiten sie, Ausbildungsbeauftragte vermitteln einzelne Inhalte. Berufsschule und Betrieb stimmen Lernfelder, Projekte und Unterstützungsbedarf ab. Allgemeinbildende Schulen, Eltern und Berufsberatung können beim Übergang unterstützen.',
        [text('Die '), term('zuständige Stelle', 'zustaendige-stelle'), text(' ist je nach Beruf etwa IHK oder HWK. Sie führt das Verzeichnis der Ausbildungsverhältnisse, berät und überwacht die Durchführung und organisiert Prüfungen oder beauftragt zuständige Gremien. Ausbildungsberater helfen auch bei Problemen im laufenden Vertrag. Die Berufsberatung der Bundesagentur für Arbeit unterstützt kostenfrei bei Berufswahl und Ausbildungsplatzsuche.')],
        [text('Der Betriebsrat hat Beteiligungsrechte bei der betrieblichen Berufsbildung (§§ 96–98 BetrVG). Die '), term('Jugend- und Auszubildendenvertretung', 'jav'), text(' vertritt die besonderen Belange der jugendlichen Beschäftigten und Auszubildenden im Zusammenspiel mit dem Betriebsrat. § 60 BetrVG knüpft die Errichtung unter anderem an mindestens fünf einschlägige Beschäftigte. Sie ersetzt weder die Ausbildungsleitung noch die zuständige Stelle.')]),
      section('eq', 'Einstiegsqualifizierung als Vorbereitung',
        [text('Die '), term('Einstiegsqualifizierung', 'eq'), text(' vermittelt betriebliche Grundlagen und soll in reguläre Ausbildung führen. Nach aktuellem § 54a SGB III kann sie vier bis zwölf Monate gefördert werden. Der Vertrag und die Voraussetzungen werden mit der Arbeitsagentur oder dem Jobcenter geklärt; ein Betrieb kann einen Zuschuss zur vereinbarten Vergütung erhalten.')],
        'Organisiere betriebliche Lerninhalte, regelmäßiges Feedback und die Abschlussbescheinigung. Ein betriebliches Zeugnis und gegebenenfalls ein Zertifikat der zuständigen Stelle dokumentieren die erworbenen Grundlagen. Ein Übergang in ein reguläres Berufsausbildungsverhältnis ist das Ziel. Anrechnung oder Verkürzung erfolgt nach den einschlägigen Voraussetzungen und Verfahren. Sie ist keine automatische Folge der Teilnahme.'),
      source('70–71', 'BBiG §§ 7–8, 26, 34–36, 71 und 76: ' + bbig, 'BetrVG §§ 60, 70 und 96–98: ' + betrvg, 'SGB III § 54a: ' + sgb3),
    ],
    transfer: ['Ein junger Mensch findet trotz Bewerbungen zunächst keinen Ausbildungsplatz. Der Betrieb möchte ihn vier Monate vorbereiten und später gegebenenfalls übernehmen. Wie ordnest du das ein?',
      'Eine Einstiegsqualifizierung kommt unter den gesetzlichen Voraussetzungen in Betracht. Abstimmen mit Arbeitsagentur und zuständiger Stelle, Lernziele und Vertrag festlegen, erworbene Grundlagen dokumentieren. Ein möglicher späterer Ausbildungsvertrag und eine etwaige Anrechnung werden gesondert geprüft.'],
  },
  {
    id: 'ausbildung-bildungsmassnahmen', number: '5.5', title: 'Individuelle Bildungsmaßnahmen und Ausbildung in Teilzeit',
    intro: 'Ein betrieblicher Ausbildungsplan lässt sich an Lernstand und Lebenssituation anpassen. Wähle eine Fördermaßnahme nach dem tatsächlichen Hindernis und vereinbare, woran die Wirkung erkennbar ist.',
    sections: [
      section('lernangebote', 'Gezielt fördern und fordern',
        'Bei einer fachlichen Lücke helfen interne Schulungen, etwa zu Warenkenntnissen oder Zollvorgaben. Bei spezialisierten IT-, Sprach- oder Fachkenntnissen können externe Kurse sinnvoll sein. Eine Übungsfirma macht Geschäftsprozesse als Lernaufgaben erfahrbar. Lernende übernehmen beispielsweise Einkauf, Öffentlichkeitsarbeit und Abrechnung eines Übungsprojekts und erhalten Feedback zur Gesamtleistung.',
        'Nutze Lernberatung, kurze Übungsschleifen und überprüfbare Teilziele bei Schwierigkeiten. Bei schnellerem Lernfortschritt kommen Zusatzqualifikationen, eine mögliche Verkürzung der vertraglichen Dauer oder vorzeitige Prüfungszulassung in Betracht. Verlängerung nach § 8 und vorzeitige Zulassung nach § 45 BBiG folgen unterschiedlichen Voraussetzungen.'),
      section('ausland', 'Ausbildungsabschnitt im Ausland',
        'Ein Auslandsabschnitt muss dem Ausbildungsziel dienen. Seine Gesamtdauer soll ein Viertel der Dauer in der Ausbildungsordnung nicht überschreiten. Bei mehr als acht Wochen ist mit der zuständigen Stelle ein Plan abzustimmen. Stimme Berufsschule und Beurlaubung nach Landesrecht ab, lege Tätigkeit und Betreuung fest und führe den Ausbildungsnachweis weiter. Der Europass Mobilität kann Lernergebnisse dokumentieren.',
        'Beispiel: Bei 36 Monaten Regeldauer entsprechen neun Monate einem Viertel. Das ist die BBiG-Sollgrenze für den gesamten Auslandsanteil. Die Beurlaubung vom Schulunterricht ist zusätzlich nach den konkreten Schulvorschriften zu prüfen.'),
      section('asa', 'Assistierte Ausbildung und BaE',
        [text('Die '), term('Assistierte Ausbildung', 'asa'), text(' unterstützt förderungsberechtigte Lernende und Betriebe nach §§ 74–75a SGB III. Je nach Bedarf helfen Vorphase und begleitende Phase etwa bei der Suche nach einem Platz, mit Förderunterricht, Sprachförderung, Konfliktklärung oder Organisation beim Betrieb. Die reguläre Ausbildung oder Einstiegsqualifizierung kann mit Hilfe fortgeführt werden.')],
        [text('Wenn eine betriebliche Ausbildung trotz Hilfen nicht zustande kommt oder besondere Voraussetzungen vorliegen, kann eine geförderte '), link('außerbetriebliche Ausbildung (BaE)', 'fz-ausbildung-extern'), text(' in Betracht kommen. Ein Bildungsträger trägt die Ausbildungsverantwortung und organisiert in angemessenem Umfang betriebliche Ausbildungsphasen.')]),
      section('teilzeit', 'Dauer und Stunden bei Teilzeit',
        [text('Bei '), term('Teilzeitberufsausbildung', 'teilzeit'), text(' vereinbaren Person und Betrieb die geringere tägliche oder wöchentliche Ausbildungszeit. Die Reduktion darf höchstens 50 % betragen. Ein besonderer persönlicher Grund ist nicht Voraussetzung. Die Laufzeit verlängert sich entsprechend, höchstens bis auf das Eineinhalbfache der Vollzeitdauer, und wird auf ganze Monate abgerundet. Auf Verlangen kann sie über diese Grenze bis zur nächsten möglichen Abschlussprüfung verlängert werden.')],
        'Rechenbeispiel: Sind 40 Stunden pro Woche und 36 Monate in Vollzeit vorgesehen und werden durchgehend 32 Stunden vereinbart, beträgt der Zeitanteil 80 %. 36 Monate ÷ 0,8 ergibt 45 Monate und liegt unter der Höchstgrenze von 54 Monaten. Die zuständige Stelle prüft die Vertragsplanung und gegebenenfalls eine zusätzlich beantragte Verkürzung. Der Stundenplan der Berufsschule wird gesondert abgestimmt.'),
      source('71–72', 'BBiG §§ 2, 7a, 8, 45 und 76: ' + bbig, 'SGB III §§ 74–76: ' + sgb3, 'BA, Assistierte Ausbildung: https://www.arbeitsagentur.de/bildung/ausbildung/assistierte-ausbildung-machen'),
    ],
    transfer: ['Eine Auszubildende hat Sprachschwierigkeiten und braucht wegen der Betreuung eines Angehörigen kürzere Tage. Ihr Betrieb möchte die Ausbildung fortführen. Welche Instrumente passen?',
      'Individuelle Sprachförderung und gegebenenfalls Assistierte Ausbildung stützen die fachliche Entwicklung. Teilzeit wird bei Einigung vertraglich vereinbart und mit Kammer und Berufsschule organisiert. Begründe die Maßnahmen getrennt, weil Sprachförderung keine Änderung der Arbeitszeit bewirkt und Teilzeit allein keine Sprachlücke schließt.'],
  },
  {
    id: 'ausbildung-pruefung', number: '5.6', title: 'Prüfungsdurchführung und Ausbildungsabschluss',
    intro: 'Die zuständige Stelle prüft berufliche Handlungsfähigkeit. Die Ausbildungsordnung bestimmt Prüfungsbereiche, Termine beziehungsweise Zeitpunkte, Gewichtung und Bestehensregeln. Eine gestreckte Abschlussprüfung bewertet zwei Teile einer einzigen Prüfung.',
    sections: [
      section('konzepte', 'Zwischenprüfung und gestreckte Abschlussprüfung',
        [text('Bei einer Zwischenprüfung steht die Lernstandsdiagnose im Vordergrund. Soweit sie vorgeschrieben ist, gehört ihre Teilnahme regelmäßig zu den Zulassungsvoraussetzungen. Bei der '), term('gestreckten Abschlussprüfung', 'gestreckte'), text(' entfällt die Zwischenprüfung. Teil 1 und Teil 2 sind Teile der Abschlussprüfung und gehen nach der jeweiligen Ausbildungsordnung in das Gesamtergebnis ein. Teil 1 ist nicht allein wiederholbar.')],
        'Beispiel für eine fiktive Ausbildungsordnung: Teil 1 zählt 25 %, Teil 2 zählt 75 %. Bei 72 und 84 Punkten ergibt die Rechnung 0,25 × 72 + 0,75 × 84 = 81 Punkte. Das Ergebnis allein beweist noch kein Bestehen. Es können Mindestleistungen in einzelnen Bereichen vorgeschrieben sein.'),
      section('zustaendigkeit', 'Zulassung, Vorbereitung und Ausschuss',
        'Kontrolliere die Ausbildungsdauer und die Eintragung des Vertrags, die vorgeschriebenen Prüfungsteilnahmen und den Ausbildungsnachweis. Bei gestreckter Prüfung gelten besondere Zulassungsregeln für beide Teile. Vorzeitige Zulassung ist bei entsprechendem Leistungsstand nach Anhörung der Ausbildenden und der Berufsschule möglich. Abweichende Voraussetzungen gelten für externe Prüflinge.',
        'Praxis: Meldefrist, Ausbildungsnachweis und gegebenenfalls zulässige Hilfsmittel oder Nachteilsausgleich früh klären. Trainiere beobachtete Kompetenzlücken mit Aufgaben in einem anderen Kontext. § 40 BBiG sieht grundsätzlich mindestens drei sachkundige, geeignete Ausschussmitglieder vor. Arbeitgeber- und Arbeitnehmerseite sind gleich stark und stellen zusammen mindestens zwei Drittel. Die Berufsschule ist mit mindestens einer Lehrkraft vertreten.'),
      section('abschluss', 'Ergebnis, Zeugnisse und Wiederholung',
        'Die zuständige Stelle stellt das Prüfungszeugnis aus. Auf Antrag werden unter Voraussetzungen Schulnoten ausgewiesen und Übersetzungen beigefügt. Davon getrennt erstellt der Betrieb ein Zeugnis zu Art, Dauer, Ziel und erworbenen Kompetenzen. Auf Verlangen kommen Verhalten und Leistung hinzu. Mit Einwilligung der Auszubildenden kann das betriebliche Zeugnis elektronisch erteilt werden.',
        'Die nicht bestandene Abschlussprüfung kann zweimal wiederholt werden. Die Verlängerung des Ausbildungsverhältnisses bis zur nächstmöglichen Wiederholungsprüfung erfolgt auf Verlangen der Auszubildenden und ist auf ein Jahr begrenzt. Eine Wiederholungsmöglichkeit und die weitere Vertragsdauer sind zwei getrennte Fragen.'),
      source('73', 'BBiG §§ 16, 21, 37, 40, 43–45, 47–48 und 65: ' + bbig),
    ],
    transfer: ['Ein Auszubildender hat bei einer gestreckten Prüfung in Teil 1 weniger Punkte als erwartet. Er möchte nur Teil 1 sofort wiederholen. Welche Information ist maßgeblich?',
      'Teil 1 ist als Bestandteil der Abschlussprüfung nicht eigenständig wiederholbar. Die Ausbildungsordnung bestimmt die Gewichtung, Mindestleistungen und Bestehensbedingungen. Nutze das Ergebnis für gezielte Vorbereitung auf Teil 2 und prüfe bei Nichtbestehen die Wiederholungsregeln.'],
  },
  {
    id: 'ausbildung-ergonomie', number: '5.7', title: 'Ergonomie und Arbeitsschutz in der Ausbildung',
    intro: 'Ergonomie passt Arbeit, Mittel und Umgebung an Menschen und Tätigkeiten an. Der Betrieb ermittelt Gefährdungen und leitet daraus geeignete Schutzmaßnahmen sowie verständliche Unterweisungen ab.',
    sections: [
      section('gefaehrdung', 'Belastungen beurteilen und Maßnahmen planen',
        [text('Bei der '), term('Gefährdungsbeurteilung', 'gefaehrdung'), text(' betrachtet der Betrieb Aufgabe, Arbeitsmittel, Organisation und Umgebung sowie körperliche und psychische Belastungen. Bei Jugendlichen berücksichtigt er zusätzlich Erfahrung, Sicherheitsbewusstsein und Entwicklungsstand. Schutzmaßnahmen werden geplant, umgesetzt und auf Wirksamkeit geprüft.')],
        'Beginne bei technischen und organisatorischen Verbesserungen, bevor du dich allein auf individuelles Verhalten verlässt. Ein lärmarmer Lernplatz oder ein sicherer Bildschirmarbeitsplatz hilft mehreren Lernenden. Ein Warnhinweis allein beseitigt die Belastungsquelle nicht.'),
      section('bildschirm', 'Bildschirmarbeitsplatz praktisch einrichten',
        'Stelle Sitz- und Arbeitsflächen so ein, dass eine entspannte Haltung möglich ist, und sorge für Bein- und Bewegungsraum. Platziere einen ausreichend großen, blend- und flimmerarmen Bildschirm mit sinnvoller Blickrichtung, einstellbarer Darstellung und erforderlicher Anpassbarkeit. Verwende geeignete Tastatur und Maus, vermeide Blendung durch Fenster oder Leuchten und ermögliche Tätigkeitswechsel oder Erholungszeiten. Prüfe die konkrete Ausstattung nach ArbStättV und ASR A6, statt pauschal einen elektrisch höhenverstellbaren Tisch vorauszusetzen.',
        'Praxis: Zwei Azubis teilen sich einen festen Tisch. Prüfe, ob Stuhl und gegebenenfalls Fußstütze eine passende Sitzposition erlauben, ob der Monitor individuell eingestellt werden kann und ob genügend Bewegungsfläche bleibt. Sind die Anforderungen mit dieser Kombination nicht erreichbar, passe den Arbeitsplatz oder die Ausstattung an.'),
      section('sicherheit', 'Sicherheitsunterweisung und Wiederholung',
        'Unterweise zu konkreten Gefährdungen vor Tätigkeitsbeginn und bei relevanten Änderungen. Bei Jugendlichen ist nach § 29 JArbSchG mindestens halbjährlich zu wiederholen und vor erstmaligem Einsatz an gefährlichen Arbeitsstellen oder Maschinen besonders zu unterweisen. Die ArbStättV verlangt für ihre Unterweisung mindestens jährliche Wiederholung. Wird ein strengerer Abstand vorgeschrieben, plane nach dieser Vorgabe.',
        'Die Unterweisung soll verständlich, tätigkeitsbezogen und überprüfbar sein. Lass die Lernenden zum Beispiel den Meldeweg und einen sicheren Ablauf erklären. Dokumentiere Anlass, Inhalte, Termin und Beteiligte.'),
      source('73–74', 'ArbSchG §§ 5 und 12: https://www.gesetze-im-internet.de/arbschg/', 'ArbStättV § 6 und Anhang Nr. 6: https://www.gesetze-im-internet.de/arbst_ttv_2004/',
        'BAuA, ASR A6: https://www.baua.de/DE/Angebote/Regelwerk/ASR/ASR-A6', 'JArbSchG §§ 28–29: ' + jarbschg),
    ],
    transfer: ['Ein 17-jähriger Auszubildender wechselt nach drei Monaten in eine Abteilung mit anderen Gefährdungen. Die nächste turnusmäßige Unterweisung ist in drei Monaten geplant. Was tust du?',
      'Vor Aufnahme der Tätigkeit beziehungsweise der wesentlichen Änderung die neuen Gefährdungen beurteilen und tätigkeitsbezogen unterweisen. Die turnusmäßige Mindestwiederholung ist kein Grund, die Unterweisung im neuen Bereich aufzuschieben.'],
  },
  {
    id: 'ausbildung-unterweisung', number: '5.8', title: 'Ausbildungsunterweisung planen und auswerten',
    intro: 'Eine Unterweisung verbindet ein beobachtbares Lernziel mit geeigneten Aufgaben, Methoden und einer Erfolgskontrolle. Entscheidend ist, was die lernende Person danach selbstständig zeigen kann.',
    sections: [
      section('lernziel', 'Vom Grobziel zum überprüfbaren Feinziel',
        [text('Leite ein '), term('Feinziel', 'feinziel'), text(' aus dem Lernziel des Ausbildungsplans und einem konkreten Geschäftsprozess ab. Benenne beobachtbares Verhalten, Hilfsmittel und Rahmenbedingungen sowie messbare Qualität oder Zeit. Der Ausbildungsrahmenplan liefert den Bezug. Für die betriebliche Aufgabe musst du den Maßstab konkretisieren.')],
        'Beispiel: Nach der Einheit erfasst die auszubildende Person innerhalb von 15 Minuten einen Test-Wareneingang mit fünf Positionen in der Übungsumgebung. Mengen, Lieferant und Belegnummer müssen mit der Vorlage übereinstimmen. Sie markiert eine Abweichung im vorgesehenen Feld. „Wareneingang verstanden“ wäre schwerer überprüfbar.',
        'Die drei Lernbereiche betrachten Wissen und Denken (kognitiv), Haltungen und Verantwortungsübernahme (affektiv) sowie das Ausführen eingeübter Fertigkeiten (psychomotorisch). Für den Wareneingang formuliert die lernende Person die Gründe des Mengenabgleichs, behandelt Abweichungen nachvollziehbar und führt die Eingaben sicher aus. Haltungen überprüfst du über begründete Entscheidungen und Verhalten, nicht über eine Behauptung innerer Zustimmung.'),
      section('planung', 'Vorkenntnisse, Medien, Übung und Transfer',
        'Kläre Vorkenntnisse, Lernbedarf, Rahmenbedingungen und beruflichen Nutzen. Wähle die Methode entsprechend Lernziel und Risiko. Bereite Daten, Arbeitsmittel, Zeit, Arbeitsschutz und Rückmeldung vor. Plane eine aktive Aufgabe und eine Übungswiederholung. Berücksichtige Fach-, Methoden-, Sozial- und Selbstkompetenz entsprechend der Situation.',
        'Prüfe zunächst das Ergebnis mit Soll-Kriterien oder einem Kontrollbogen. Beobachte zusätzlich das Vorgehen und lass Entscheidungen erläutern. Nutze anschließend einen veränderten Fall, um Transfer zu erkennen. Eine gute Leistung an der bekannten Vorlage allein zeigt noch nicht, ob der Prozess ohne Hilfe auf eine neue Aufgabe übertragen wird.',
        [link('Lehrmethoden im Vergleich', 'fz-ausbildung-methoden'), text(' · '), link('Übungsfall zur Angebotsbearbeitung', 'fz-ausbildung-fall')]),
      source('74–78, 80–81', 'AEVO § 3 Abs. 3: ' + aevo),
    ],
    transfer: ['Formuliere für die Prüfung eines Kundenbelegs ein Feinziel mit Handlung, Bedingung und Qualitätsmaßstab.',
      'Die auszubildende Person prüft nach der Lerneinheit anhand einer freigegebenen Checkliste in zehn Minuten einen Testbeleg und erkennt alle drei eingebauten Abweichungen. Sie dokumentiert diese nachvollziehbar und leitet den Beleg an die benannte Stelle weiter. Handlung, Ausgangsbedingungen und Erfolgsmaßstab sind beobachtbar.'],
  },
  {
    id: 'ausbildung-methoden', number: '5.8.1', title: 'Ausbildungsmethoden passend zum Lernziel auswählen', parent: 'ausbildung-unterweisung',
    intro: 'Die geeignete Methode richtet sich nach Lernziel, Vorkenntnissen, Risiko und Aufwand. Kombiniere kurzerklärende Phasen mit aktiver Bearbeitung, Rückmeldung und Wiederholung.',
    sections: [
      section('methodenwahl', 'Erklären, erschließen und ausprobieren',
        'Vortrag oder Referat vermittelt Informationen an mehrere Personen, etwa eine Einführung ins Warensortiment. Prüfe Verständnis anschließend durch Fragen oder eine kurze Anwendung. Im fragend-entwickelnden Lehrgespräch erschließen Lernende eine fachliche Regel aus Erfahrungen und Beispielen. Starte mit vorhandenen Vorkenntnissen, nutze offene Fragen und fasse Erkenntnisse gemeinsam zusammen.',
        'Die Fallmethode lässt anhand eines betrieblichen Sachverhalts mehrere begründbare Lösungswege bearbeiten. Im Rollenspiel üben Lernende Verhalten in einer Gesprächssituation, beispielsweise eine Reklamation. Beobachtende verwenden Kriterien und geben Rückmeldung zu erkennbaren Handlungen. Im Planspiel erleben Teilnehmende die Folgen aufeinander aufbauender Entscheidungen in einer Simulation. Regeln und fehlende reale Konsequenzen begrenzen die Übertragbarkeit.'),
      section('vier-stufen', 'Vier-Stufen-Methode',
        [text('Die '), term('Vier-Stufen-Methode', 'vier-stufen'), text(' eignet sich besonders zum Aufbau eines klaren, manuellen oder standardisierten Arbeitsablaufs. 1. Vorbereiten: Lernziel, Sinn, Vorkenntnisse und Mittel klären. 2. Vormachen und erklären: Was passiert, wie und warum? 3. Nachmachen und erklären lassen: Beobachten und gezielt korrigieren. 4. Selbstständig üben: Handlung wiederholen und Ergebnis kontrollieren.')],
        'Praxis: Eine Fachkraft zeigt, wie Versandetikett und Belegdaten sicher abgeglichen werden. Der Azubi führt den Ablauf an einem Muster durch und erläutert Prüfpunkte. Anschließend bearbeitet er mehrere neue Muster. Die Methode passt bei einer festgelegten Routine; für eine offene Prozessverbesserung ist mehr Entscheidungsspielraum nötig.'),
      section('vollstaendig', 'Vollständige Handlung und Leittext',
        [text('Die '), shared('vollständige Handlung', 'vollstaendige-handlung'), text(' umfasst Informieren → Planen → Entscheiden → Ausführen → Kontrollieren → Bewerten. Die Auszubildenden bearbeiten den Gesamtauftrag, sorgen für eine Ergebniskontrolle und leiten Verbesserungen ab. Ausbilder stellen geeignete Rahmenbedingungen, beantworten Fragen und greifen bei Risiken ein.')],
        [text('Die '), shared('Leittextmethode', 'leittextmethode'), text(' strukturiert diesen selbstständigen Ablauf. In der im Buch gezeigten Fassung dienen Leitfragen, Arbeitsplan, Kontrollbogen und Leitsatz als Hilfen. Lernende recherchieren, planen die Schritte, sprechen die Entscheidung bei Bedarf ab, führen aus, kontrollieren gegen Kriterien und reflektieren. Näheres im Artikel zur '), link('Leittextmethode', 'leittextmethode'), text('.')]),
      section('lernauftrag', 'Lernauftrag, Projekt und digitale Medien',
        'Ein Lernauftrag macht aus einer realen Aufgabe ein Lernangebot mit Kriterien, Auswertung und Unterstützung. Lernende brauchen geeignete Grundkenntnisse und mehr Entscheidungsspielraum als beim reinen Nachmachen. In der Projektmethode koordinieren sie im Team zusätzlich Rollen, Arbeitspakete und Termine für ein gemeinsames berufstypisches Ergebnis, zum Beispiel einen internen Aktionstag.',
        'E-Learning ermöglicht bei geeigneter Ausstattung und Betreuung flexibles Lernen, etwa mit kurzen Übungseinheiten und Rückmeldung. Digitale Medienkompetenz, Zugänglichkeit, Datenschutz und Lernerfolg sind zu prüfen. Digitales mobiles Ausbilden in angemessenem Umfang erfordert nach § 28 Abs. 2 BBiG geeignete Inhalte, Orte, Technik und gleichwertige Vermittlungsqualität. Planbare Erreichbarkeit, Begleitung und Lernerfolgskontrolle sichern die Lernbetreuung. Erforderliche zusätzliche Hard- und Software stellt der Betrieb kostenlos bereit.'),
      source('75–78', 'AEVO § 3 Abs. 3: ' + aevo, 'BBiG §§ 14 und 28: ' + bbig),
    ],
    transfer: ['Zwei Auszubildende kennen die Grundlagen eines Einkaufsvorgangs. Sie sollen zwischen mehreren Angeboten abwägen, selbst entscheiden und ihre Wahl begründen. Was passt besser als bloßes Vormachen?',
      'Eine Fallmethode oder ein Leittext bietet Raum zum Vergleichen und Entscheiden. Mit Leitfragen beschaffen sie Informationen, planen Kriterien, entscheiden, prüfen und reflektieren. Vormachen kann vorher einzelne technische Schritte erklären, würde als alleinige Methode aber die eigenständige Entscheidung kaum trainieren.'],
  },
  {
    id: 'ausbildung-extern', number: '5.9', title: 'Außerbetriebliche, überbetriebliche und Verbundausbildung',
    intro: 'Externe Lernorte können eine betriebliche Ausbildung ergänzen. Bei einer außerbetrieblichen Ausbildung übernimmt dagegen ein Träger die Ausbildungsverantwortung, auch wenn praktische Lernphasen in Partnerbetrieben stattfinden.',
    sections: [
      section('ausserbetrieblich', 'Außerbetriebliche Berufsausbildung (BaE)',
        [text('Die '), term('außerbetriebliche Berufsausbildung', 'bae'), text(' nach § 76 SGB III ermöglicht förderungsberechtigten jungen Menschen eine Berufsausbildung bei einem Bildungsträger. Der Träger organisiert Berufsschule, betriebliche Praxisphasen, gegebenenfalls Stützunterricht und sozialpädagogische Begleitung. Die Arbeitsagentur prüft die Förderfähigkeit. Der Wechsel in betriebliche Ausbildung wird aktiv unterstützt.')],
        'Im integrativen Modell übernimmt der Träger wesentliche theoretische und praktische Ausbildungsleistungen. Betriebliche Phasen ergänzen sie. Im kooperativen Modell liegt ein wesentlicher Teil der Fachpraxis bei Kooperationsbetrieben. Der Träger verantwortet und begleitet die Ausbildung. Eine betriebliche Phase allein verändert das Ausbildungsverhältnis nicht.'),
      section('ueberbetrieblich', 'Überbetriebliche Unterweisung',
        [text('Die '), term('überbetriebliche Ausbildung', 'ueberbetrieblich'), text(' ergänzt die betriebliche Ausbildung mit Lehrgängen in geeigneten Einrichtungen, etwa einer Lehrwerkstatt der Kammer. Dort können Lernende Maschinen, Verfahren oder Technologien kennenlernen, die ihrem Betrieb fehlen. Betrieb und Berufsschule behalten ihre Aufgaben. Prüfe, ob die Ausbildungsordnung solche Lehrgänge vorsieht und wie Lernziele, Zeiten und Dokumentation abgestimmt sind.')],
        'Praxis: Eine Handwerksfirma kann ein spezielles Messverfahren mangels Einrichtung nicht vermitteln. Ein geeigneter Lehrgang deckt das Verfahren ab. Die Auszubildende übt anschließend, wie sie dessen Ergebnisse im Betrieb verwendet.'),
      section('verbund', 'Verbundformen und Verantwortung',
        [text('Bei der '), term('Verbundausbildung', 'verbund'), text(' wirken mehrere geeignete Vertragspartner oder Betriebe zusammen. Sichergestellt werden muss, wer einzelne Abschnitte verantwortet und wer den Gesamtverlauf im Blick behält. Ein Kooperationsplan hält Lernziele, Dauer, Betreuung, Nachweise und Abstimmung fest.')],
        'Typische Organisationsformen: Bei der Auftragsausbildung vermittelt ein beauftragter Partner Inhalte. Ein Leitbetrieb koordiniert den Vertrag und bindet Partnerbetriebe ein. Im Konsortium organisieren sich mehrere Betriebe gemeinsam, wobei die jeweilige Vertragsverantwortung festzulegen ist. Ein Ausbildungsverein kann Koordination und gegebenenfalls Vertragsträgerschaft übernehmen. Die gewählte Bezeichnung entscheidet nicht über die rechtliche Verantwortung.'),
      source('72, 78–79', 'BBiG §§ 5 Abs. 2, 10 Abs. 5 und 27 Abs. 2: ' + bbig, 'SGB III § 76: ' + sgb3),
    ],
    transfer: ['Ein kleiner Betrieb kann die meisten Inhalte abdecken, aber ihm fehlt eine ganze Abteilung. Muss er zwingend eine außerbetriebliche Ausbildung wählen?',
      'Ein Verbund mit einem geeigneten Partner oder eine überbetriebliche Vermittlung kann die fehlenden Pflichtinhalte ergänzen. Entscheidend sind die Eignung und gesicherte Zuständigkeiten. Bei BaE wäre der Bildungsträger im Förderfall der Träger der Ausbildung.'],
  },
  {
    id: 'ausbildung-personalentwicklung', number: '5.10', title: 'Ausbildung, Fortbildung und Umschulung',
    intro: 'Berufsbildung umfasst verschiedene Bildungswege. Ausbildung vermittelt berufliche Handlungsfähigkeit für einen Ausbildungsberuf. Fortbildung erhält, erweitert oder vertieft sie. Umschulung befähigt für eine andere berufliche Tätigkeit.',
    sections: [
      section('abgrenzung', 'Das Bildungsziel entscheidet',
        'Berufsvorbereitung schafft Grundlagen für eine spätere Ausbildung. Berufsausbildung baut berufliche Fertigkeiten, Kenntnisse und Fähigkeiten systematisch auf und vermittelt Berufserfahrung. Anpassungsfortbildung aktualisiert vorhandene berufliche Kompetenzen, etwa für neue Geräte oder digitale Verfahren. Höherqualifizierende Berufsbildung bereitet auf erweiterte fachliche oder leitende Aufgaben vor.',
        [text('Eine '), term('Umschulung', 'umschulung'), text(' führt zu einer anderen beruflichen Tätigkeit. Anlass kann ein Strukturwandel sein oder der Bedarf, die bisherige Tätigkeit wegen gesundheitlicher Belastung zu wechseln. Vergleiche Umschulung, Zweitausbildung oder geeignete Fortbildung anhand des Zielberufs und der anzuerkennenden Kompetenzen. Fördermöglichkeiten hängen vom Einzelfall ab.')]),
      section('abschlussstufen', 'Stufen höherqualifizierender Berufsbildung',
        'Das BBiG sieht drei Stufen vor: Geprüfter Berufsspezialist bzw. Geprüfte Berufsspezialistin, Bachelor Professional und Master Professional. Die maßgebliche Fortbildungsordnung entscheidet über Titel, Voraussetzungen und Prüfung. Die Bezeichnungen verdeutlichen Qualifikationsniveaus der beruflichen Bildung. Sie verleihen keinen akademischen Hochschulabschluss und werden bei älteren Bezeichnungen nicht eigenmächtig ergänzt.',
        'Praxis: Eine Sachbearbeiterin lernt ein neues ERP-Modul im Rahmen einer Anpassungsfortbildung. Sie kann für komplexere Koordinationsaufgaben eine höhere Fortbildung prüfen. Will sie künftig in einem anderen Ausbildungsberuf arbeiten, ist bei passenden Voraussetzungen eine Umschulung sinnvoller als ein ERP-Kurs.'),
      source('79–80', 'BBiG § 1 und §§ 53a–53d: ' + bbig),
    ],
    transfer: ['Eine Beschäftigte soll im bisherigen Beruf neue Digitalwerkzeuge sicher beherrschen. Ein Kollege benötigt einen anerkannten Abschluss für einen anderen Beruf. Welche Wege prüfst du?',
      'Für die Beschäftigte passt eine Anpassungsfortbildung mit praxisbezogenem Nachweis. Für den Kollegen prüfst du Umschulung oder Zweitausbildung und die Anforderungen des Zielberufs. Der Bedarf und das Abschlussziel bestimmen den Weg.'],
  },
  {
    id: 'ausbildung-fall', number: '5.11', title: 'Übungsfall: Unterweisung zur Angebotserstellung',
    intro: 'Ein Anbieter für Gebäudesensorik bindet mehr Ausbildungsbeauftragte ein. Im Workshop soll eine Einheit entstehen, in der Auszubildende aus einer Kundenanfrage ein prüfbares Angebot erstellen und ihre Entscheidung zur Freigabe begründen.',
    sections: [
      section('aufgaben', 'Ausgangssituation und Prüfungsaufgaben',
        'Die auszubildende Person kennt die ERP-Grundfunktionen und hat ein Musterangebot gelesen. Zur Verfügung stehen eine fiktive Anfrage über 15 Sensoren, eine freigegebene Preisliste, Liefer- und Zahlungsbedingungen sowie eine simulierte Bonitätsinformation. Es wird nur in einer Übungsumgebung gearbeitet.',
        'Formuliere ein beobachtbares Feinziel und je ein kognitives, psychomotorisches und affektives Lernziel. Erläutere und begründe eine geeignete Methode mit drei Argumenten. Beschreibe zwei Möglichkeiten zur Erfolgskontrolle.',
        'Die Buchaufgabe benutzt den älteren Ausbildungsrahmenplan der Industriekaufleute. Der aktuelle Bezugspunkt ist der Ausbildungsrahmenplan der IndKflAusbV 2024, Abschnitt A Nr. 5 Buchst. a zu Kalkulation und Angebotserstellung. Die im Fall gesetzte Bonitätsprüfung ist eine betriebliche Entscheidungsvorgabe.'),
      {
        ...section('loesung-lernziel', 'Aufgabe 1 – Lernziele', 'Formuliere die Ziele, bevor du die Musterantwort öffnest.'),
        hint: {
          title: 'Musterantwort',
          content: 'Feinziel: Die auszubildende Person erstellt nach der Einheit innerhalb von 20 Minuten eigenständig einen vollständigen Angebotsentwurf im Testsystem. Sie berechnet den Preis anhand der Liste korrekt, trägt Mengen, Termine und Bedingungen vollständig ein und vermerkt die Freigabeentscheidung. Kognitiv: Sie erklärt die Pflichtfelder und die Voraussetzungen der internen Freigabe. Psychomotorisch: Sie erfasst und prüft die Daten im ERP ohne Korrekturhilfe. Affektiv: Sie behandelt die Angebote als potenziell verbindliche Erklärungen, arbeitet sorgfältig und eskaliert bei einem unklaren Ergebnis, statt ungeprüft zu versenden.',
        },
      },
      {
        ...section('loesung-methode', 'Aufgabe 2 – Methode begründen',
          [text('Nutze die '), link('Leittextmethode', 'leittextmethode'), text(' oder wähle eine andere passende Methode und begründe die Entscheidung.')]),
        hint: {
          title: 'Musterantwort',
          content: 'Leitfragen führen zu Anfrageprüfung, Kalkulation, Bedingungen und Freigabe. Die auszubildende Person informiert sich, plant, entscheidet, erstellt den Entwurf, kontrolliert mit einer Kriterienliste und bewertet das Vorgehen gemeinsam mit der Fachkraft. Drei Gründe: (1) Sie benötigt Auswahlentscheidungen und bearbeitet den vollständigen Auftragsausschnitt eigenständig, (2) sie kann vorhandene ERP-Grundkenntnisse bei eigener Informationsrecherche anwenden, (3) sie übernimmt Verantwortung für Datenqualität und Freigabe, ohne einen echten Vertrag auszulösen. Bei fehlenden ERP-Grundkenntnissen kann eine kurze Demonstration vorgeschaltet werden.',
        },
      },
      {
        ...section('loesung-erfolg', 'Aufgabe 3 – Lernerfolg prüfen', 'Wähle ein Maß für das Arbeitsergebnis und eines für die Anwendung im veränderten Fall.'),
        hint: {
          title: 'Musterantwort',
          content: 'Erstens kontrolliert die Fachkraft den Entwurf anhand von Preis, Menge, Terminen, Vertragsbedingungen, Freigabeentscheidung und Bearbeitungszeit. Die lernende Person führt vorher eine Selbstkontrolle anhand eines Musterangebots oder Kontrollbogens durch und erklärt Abweichungen. Zweitens erhält sie eine neue Anfrage mit abweichender Stückzahl und unklarer Bonität. Beobachtet wird, ob sie korrekt neu kalkuliert, die Freigabe aussetzt und den Fall begründet weiterleitet.',
        },
      },
      source('80–81, 114–115', 'IndKflAusbV 2024, Ausbildungsrahmenplan: ' + indkfl, 'AEVO § 3: ' + aevo),
    ],
    transfer: ['Die Auszubildende erzielt in der Testaufgabe volle Punkte, kopiert im nächsten Fall aber alte Zahlungsbedingungen. Welche Schlussfolgerung ziehst du?',
      'Die Ausführung im ersten Fall war korrekt. Der Transfer auf neue Kundenbedingungen ist noch nicht gesichert. Lasse sie den Unterschied zwischen den Fällen erläutern, die relevante Datenquelle selbst finden und einen weiteren Fall mit Feedback bearbeiten.'],
  },
];

const chapterId = (id: string) => 'fz-' + id;

export const chapters: Chapter[] = units.map(({ id, number, title, parent }) => ({
  id: chapterId(id),
  subjectId,
  number,
  title,
  ...(id === 'ausbildung' ? {} : { parentId: chapterId(parent ?? 'ausbildung') }),
  articleId: chapterId(id),
}));

export const articles: Article[] = units.map(({ id, number, title, intro, sections, transfer }) => ({
  id: chapterId(id),
  subjectId,
  chapterId: chapterId(id),
  number,
  title,
  intro,
  sections: [
    ...sections,
    {
      ...section('transfer', 'Selbstkontrolle und Transfer', transfer[0]),
      hint: { label: 'SELBSTKONTROLLE', title: 'Musterantwort', content: transfer[1] },
    },
  ],
  updatedAt,
  version: 1,
}));

const definitions: [string, string, string, string][] = [
  ['dual', 'Duale Ausbildung', 'Berufsausbildung mit miteinander verzahnten Lernorten Betrieb und Berufsschule, gegebenenfalls ergänzt um weitere Lernorte.', 'ausbildung'],
  ['ordnung', 'Ausbildungsordnung', 'Bundesrechtliche Verordnung für einen anerkannten Ausbildungsberuf mit unter anderem Ausbildungsdauer, Berufsbild, Rahmenplan und Prüfungsanforderungen.', 'ausbildung-rechtsrahmen'],
  ['rahmenplan', 'Ausbildungsrahmenplan', 'Bestandteil der Ausbildungsordnung, der die sachliche und zeitliche Gliederung der betrieblichen Vermittlung festlegt.', 'ausbildung-rechtsrahmen'],
  ['vertrag', 'Berufsausbildungsvertrag', 'Vereinbarung zwischen Ausbildenden und Auszubildenden über die planmäßige Durchführung der Berufsausbildung.', 'ausbildungsvertrag'],
  ['nachweis', 'Ausbildungsnachweis', 'Schriftliche oder elektronische Dokumentation der Ausbildung, die von Auszubildenden geführt und von Ausbildenden durchgesehen wird.', 'ausbildungsvertrag'],
  ['mindestverguetung', 'Mindestausbildungsvergütung', 'Monatlicher Mindestbetrag für gesetzlich erfasste Ausbildungsvergütungen, dessen reguläre Höhe nach Beginn und Fortschritt der Ausbildung bestimmt wird.', 'ausbildungsverguetung'],
  ['freistellung', 'Freistellung von der betrieblichen Ausbildung', 'Befreiung von der betrieblichen Beschäftigung etwa für Berufsschule oder Prüfung mit Anrechnung nach den anwendbaren gesetzlichen Regeln.', 'ausbildung-jugendschutz'],
  ['aevo', 'Ausbilder-Eignungsverordnung (AEVO)', 'Verordnung zum Nachweis der berufs- und arbeitspädagogischen Eignung in anerkannten Ausbildungsberufen ihres Geltungsbereichs.', 'ausbildung-aevo'],
  ['ausbildungsstaette', 'Ausbildungsstätte', 'Ort der praktischen Ausbildung, der für die Vermittlung der vorgesehenen Fertigkeiten, Kenntnisse und Fähigkeiten geeignet sein muss.', 'ausbildung-eignung'],
  ['ausbildender', 'Ausbildender', 'Vertragspartner der auszubildenden Person, der die erforderliche Organisation, Ausstattung und Vermittlung der Ausbildung sicherstellt.', 'ausbildung-eignung'],
  ['ausbildungsbeauftragte', 'Ausbildungsbeauftragte', 'Persönlich geeignete Personen, die unter Verantwortung einer Ausbilderin oder eines Ausbilders bestimmte Ausbildungsinhalte vermitteln.', 'ausbildung-eignung'],
  ['zustaendige-stelle', 'Zuständige Stelle in der Berufsbildung', 'Gesetzlich zugeordnete Stelle, etwa IHK oder HWK, die Ausbildungsverhältnisse registriert, die Ausbildung berät und überwacht sowie Prüfungen organisiert.', 'ausbildung-beteiligte'],
  ['jav', 'Jugend- und Auszubildendenvertretung (JAV)', 'Betriebliche Vertretung, die nach dem BetrVG die besonderen Belange jugendlicher Beschäftigter und Auszubildender wahrnimmt.', 'ausbildung-beteiligte'],
  ['eq', 'Einstiegsqualifizierung (EQ)', 'Betriebliche Vorbereitung auf Berufsausbildung zum Erwerb beruflicher Grundlagen, die unter Voraussetzungen nach dem SGB III gefördert wird.', 'ausbildung-beteiligte'],
  ['asa', 'Assistierte Ausbildung (AsA)', 'Förderangebot zur Vorbereitung oder Begleitung von Berufsausbildung beziehungsweise Einstiegsqualifizierung für förderungsberechtigte junge Menschen und Betriebe.', 'ausbildung-bildungsmassnahmen'],
  ['teilzeit', 'Teilzeitberufsausbildung', 'Vertraglich vereinbarte Verkürzung der täglichen oder wöchentlichen Ausbildungszeit innerhalb der Grenzen des BBiG.', 'ausbildung-bildungsmassnahmen'],
  ['gestreckte', 'Gestreckte Abschlussprüfung', 'Abschlussprüfung mit zwei zeitlich getrennten, nach Ausbildungsordnung gewichteten Teilen.', 'ausbildung-pruefung'],
  ['gefaehrdung', 'Gefährdungsbeurteilung', 'Systematisches Ermitteln und Bewerten arbeitsbezogener Gefährdungen als Grundlage geeigneter Schutzmaßnahmen.', 'ausbildung-ergonomie'],
  ['feinziel', 'Feinziel einer Unterweisung', 'Überprüfbares Lernziel für eine konkrete Einheit, das Handlung, Bedingungen und Maßstab beschreibt.', 'ausbildung-unterweisung'],
  ['vier-stufen', 'Vier-Stufen-Methode', 'Unterweisungsmethode mit Vorbereitung, Vormachen und Erklären, Nachmachen und Erklärenlassen sowie selbstständigem Üben.', 'ausbildung-methoden'],
  ['bae', 'Außerbetriebliche Berufsausbildung (BaE)', 'Geförderte Berufsausbildung in Verantwortung eines Bildungsträgers mit angemessenen betrieblichen Ausbildungsphasen.', 'ausbildung-extern'],
  ['ueberbetrieblich', 'Überbetriebliche Ausbildung', 'Lehrgänge oder Ausbildungsphasen an einem geeigneten zusätzlichen Lernort zur Ergänzung der betrieblichen Ausbildung.', 'ausbildung-extern'],
  ['verbund', 'Verbundausbildung', 'Zusammenarbeit mehrerer Betriebe oder Träger zur Abdeckung der Ausbildungsinhalte bei gesicherter Verantwortung für Abschnitte und Gesamtverlauf.', 'ausbildung-extern'],
  ['umschulung', 'Berufliche Umschulung', 'Berufsbildungsmaßnahme, die zur Ausübung einer anderen beruflichen Tätigkeit befähigen soll.', 'ausbildung-personalentwicklung'],
];

export const glossary: GlossaryTerm[] = definitions.map(([id, term, definition, article]) => ({
  id: 'fz-ausb-begriff-' + id,
  subjectId,
  term,
  definition,
  articleId: chapterId(article),
}));
