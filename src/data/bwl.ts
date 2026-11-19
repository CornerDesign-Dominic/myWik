import { connectionTopics, connectionTerms } from './bwl-verbindungen';
import { startupTopics, startupTerms } from './bwl-gruendung';
import { legalFormTopics, legalFormTerms } from './bwl-rechtsformvergleich';
import { functionCases } from './bwl-funktionsfall';
import type { Article, Chapter, GlossaryTerm } from '../types';
import { section, check } from './rw-standard';

import { source, functionsSource, type BwlTopic } from './bwl-standard';
import { functionTopics, functionTerms } from './bwl-funktionen';

const topics: BwlTopic[] = [
  ...functionTopics,
  ...functionCases,
  ...startupTopics,
  ...legalFormTopics,
  ...connectionTopics,
  {
    id: 'bwl-grundlagen', number: '1', title: 'Betriebliche Grundfunktionen und ihr Zusammenwirken',
    intro: 'Betriebliche Grundfunktionen sind wiederkehrende Aufgabenbereiche, durch die ein Unternehmen Leistungen erstellt, verkauft und seinen Fortbestand sichert. Ihre gemeinsame Betrachtung verhindert, dass eine gute Einzelentscheidung das Gesamtergebnis verschlechtert.',
    sections: [
      section('prinzip', 'Vom Kundenbedarf zur Leistung',
        'Eine [[t:bwl-grundfunktion|Grundfunktion]] ist eine Aufgabe, keine zwingend eigene Abteilung. In einem kleinen Betrieb übernimmt eine Person mehrere Funktionen. In einem Konzern können mehrere Abteilungen dieselbe Funktion erfüllen. Auch ein Dienstleister produziert: Er erstellt etwa eine Reparatur oder Beratung.',
        'Zum Leistungsprozess gehören Beschaffung und Logistik, Produktion und Absatz. Marketing klärt Kundenbedürfnisse und gestaltet das Angebot. Finanzierung und Investition sichern Mittel und deren Einsatz. Rechnungswesen liefert dokumentierte Werte, Controlling koordiniert Planung und Auswertung, Personal stellt geeignete Arbeitsleistung bereit. In unserer Gliederung ist Beschaffung bei Logistik eingeordnet.'),
      section('beispiel', 'Ein Betrieb für das gesamte Kapitel',
        'Die fiktive Nordlicht GmbH baut Schreibtischleuchten. Marketing erkennt Nachfrage nach reparierbaren Leuchten. Produktion entwickelt einen montierbaren Aufbau; Logistik beschafft austauschbare Module. Personal qualifiziert Montagekräfte, Finanzierung sichert die Vorfinanzierung. Rechnungswesen erfasst Kosten und Erlöse; Controlling vergleicht den Erfolg mit dem Plan.',
        'Ware fließt vom Lieferanten über den Betrieb zum Kunden. Informationen wie Bestellung, Kapazitätsmeldung oder Reklamation laufen in mehrere Richtungen. Zahlungen folgen eigenen Terminen. Deshalb kann eine verkaufte Leuchte bereits Umsatz erzeugen, obwohl der Kunde noch nicht bezahlt hat.'),
      section('lernweg', 'Die Lernfolge und ihre Grenzen',
        'Beginne mit [[a:bwl-funktionsziele|Zielen und Aufgaben]]. Die sieben Funktionsartikel erklären einzelne Entscheidungen. [[a:bwl-zusammenwirken|Zusammenwirken]] führt sie am Auftrag zusammen; der [[a:bwl-fall-funktionen|Übungsfall]] verlangt eine eigene Entscheidung.',
        'Typischer Fehler: Funktionen als unabhängige Abteilungen aufzählen. Erkläre immer, welche Eingabe eine Funktion benötigt und welche Wirkung ihre Entscheidung für andere hat. Ein Organigramm erklärt diese Abläufe noch nicht.'),
      functionsSource(),
      ...check('Warum gibt es auch im Einpersonenunternehmen mehrere betriebliche Funktionen?', 'Funktionen bezeichnen Aufgaben. Dieselbe Person kann Kundengewinnung, Leistungserstellung, Buchführung und Finanzierung übernehmen.',
        'Eine Reparaturwerkstatt kauft kein fertiges Produkt für den Weiterverkauf. Hat sie eine Produktionsfunktion?', 'Ja. Die Reparatur ist ihre erstellte Dienstleistung. Ersatzteilversorgung, Termine, Personal und Zahlungseingänge müssen zusammenpassen.'),
    ],
  },
  {
    id: 'bwl-funktionsziele', parentId: 'bwl-grundlagen', number: '1.1', title: 'Ziele und Aufgaben der betrieblichen Funktionen',
    intro: 'Funktionsziele übersetzen Unternehmensziele in konkrete Anforderungen einzelner Aufgabenbereiche. Sie helfen bei Entscheidungen, wenn sie überprüfbar sind und ihre Wechselwirkungen berücksichtigt werden.',
    sections: [
      section('prinzip', 'Gesamtziel, Teilziel und Kennzahl',
        'Ein [[t:logistik-zielkonflikt|Zielkonflikt]] entsteht, wenn die Verbesserung eines Ziels ein anderes erschwert. Wirtschaftlichkeit, Zahlungsfähigkeit, Qualität, Nachhaltigkeit und gute Arbeitsbedingungen können gleichzeitig relevant sein. Die Leitung legt Prioritäten und verbindliche Mindestanforderungen fest.',
        'Produktion verfolgt Qualität, Durchlaufzeit und wirtschaftliche Auslastung. Logistik sichert Verfügbarkeit bei vertretbaren Beständen. Marketing gewinnt Kunden und erzielt tragfähigen Absatz. Rechnungswesen liefert richtige und rechtzeitige Daten. Finanzierung sichert Zahlungsfähigkeit, Investition geeignete Vermögenswerte. Controlling koordiniert Ziele und Pläne. Personal sichert Menge, Qualifikation und Motivation der Beschäftigten.'),
      section('anwendung', 'Aus einem Wunsch eine Vorgabe machen',
        'Nordlicht will im nächsten Quartal 95 % der bestätigten Aufträge termingerecht liefern und Reklamationen unter 2 % halten. Das sind Beispielziele, keine Branchenmaßstäbe. Produktion meldet verfügbare Stunden, Logistik bestätigt Materialtermine und Marketing verspricht darauf abgestimmte Liefertermine.',
        'Großer Vorrat verbessert möglicherweise die Lieferfähigkeit, bindet aber Geld. Lange Serien senken Rüstkosten, erhöhen jedoch Bestand und Reaktionszeit. Kostensenkung kann bei schlechter Qualität Reklamationen und Kundenverluste auslösen. Prüfe Kosten, Service und Risiken gemeinsam.'),
      section('auswertung', 'Entscheiden und nachhalten',
        'Lege zuerst Musskriterien fest, etwa Produktsicherheit und Zahlungsfähigkeit. Vergleiche geeignete Alternativen anhand gleicher Zeiträume und Daten. Benenne bei nicht messbaren Folgen die Unsicherheit. Der billigste Einzelpreis ist kein Beleg für niedrige Gesamtkosten.',
        'Vermeide Kennzahlen ohne Bezugsgröße und Termin. „Materialbestand zum Quartalsende um 10 % senken, bei unverändertem Serviceziel“ macht den Konflikt überprüfbar. Vertiefung: [[a:co-kennzahlen|Kennzahlen bilden und beurteilen]].'),
      functionsSource(),
      ...check('Warum kann maximale Maschinenauslastung das Unternehmensziel verfehlen?', 'Sie kann Überproduktion, Kapitalbindung und lange Wartezeiten erzeugen. Entscheidend ist die wirtschaftliche Erfüllung tatsächlicher Nachfrage unter den Gesamtzielen.',
        'Ein Krankenhaus spart Personalstunden, die Wartezeit steigt. Wie bewertest du die Einsparung?', 'Prüfe Versorgungsqualität, Sicherheit, Überlastung und Gesamtkosten. Die Stundeneinsparung allein belegt keine bessere Gesamtleistung.'),
    ],
  },
  {
    id: 'bwl-produktion', parentId: 'bwl-funktionsziele', number: '1.1.1', title: 'Produktion: Leistung, Verfahren und Kapazität',
    intro: 'Produktion verbindet Arbeitsleistung, Betriebsmittel und Werkstoffe zu Gütern oder Dienstleistungen. Sie entscheidet, was in welcher Qualität, Menge und Zeit wirtschaftlich hergestellt werden kann.',
    sections: [
      section('faktoren', 'Faktoren und Entscheidungen',
        'Die [[t:bwl-produktion-begriff|Produktion]] kombiniert betriebliche Faktoren zur Leistungserstellung. Arbeit führt Tätigkeiten aus, Betriebsmittel wie Anlagen ermöglichen sie, Werkstoffe gehen in das Produkt ein oder werden verbraucht. Planung und Leitung koordinieren die Faktoren. [[t:bwl-kapazitaet|Kapazität]] ist das Leistungsvermögen in einer Periode unter benannten Bedingungen. Der wirksame Engpass begrenzt den Output der Kette.',
        'Entscheidungen betreffen Produktprogramm, Eigenfertigung oder Fremdbezug, Verfahren, Losgrößen, Reihenfolge, Qualität und Instandhaltung. [[t:logistik-produktivitaet|Produktivität]] misst Output im Verhältnis zum Faktoreinsatz. Mehr Stück je Stunde belegen keine bessere Wirtschaftlichkeit, wenn Ausschuss und Kosten steigen.'),
      section('verfahren', 'Mengenart und Anordnung unterscheiden',
        'Einzelfertigung erstellt individuelle Stücke wie Sondermaschinen. Serienfertigung wiederholt eine begrenzte Menge gleicher Produkte und wechselt danach die Serie. Massenfertigung erzeugt gleichartige Produkte über längere Zeit in sehr großer Menge. Sortenfertigung variiert verwandte Produkte auf ähnlicher Grundlage, etwa Papierqualitäten. Bei Kuppelproduktion entstehen technisch zwangsläufig mehrere Erzeugnisse, etwa Strom und Wärme.',
        'Werkstattfertigung ordnet gleichartige Maschinen zusammen: flexibel, aber mit Transport- und Warteaufwand. Reihenfertigung folgt der Bearbeitungsfolge ohne zwingend festen Takt. Fließfertigung koppelt Stationen zeitlich eng: kurze Wege, aber störungsempfindlich. Gruppen- oder Inselfertigung bündelt Schritte für Produktfamilien. Bei Baustellenfertigung kommen Ressourcen zum ortsfesten Produkt. Mengenart und räumliche Organisation sind verschiedene Einteilungen.'),
      section('anwendung', 'Nordlicht plant eine Serie',
        'Je Leuchte sind 0,5 Montagestunden nötig. Monatlich stehen nach berücksichtigten Ausfällen und Pausen 600 nutzbare Stunden bereit. Kapazität = 600 h ÷ 0,5 h/Stück = 1.200 Stück/Monat. Für 1.000 Leuchten: Auslastung = 500 h ÷ 600 h × 100 = 83,3 %. Die freien 100 h sind nur nutzbar, wenn Material, Prüfung und qualifiziertes Personal verfügbar sind.',
        'Für wiederkehrende Modellserien kann eine Montageinsel bei häufigen Variantenwechseln passen. Eine starre Fließlinie verlangt ausreichendes stabiles Volumen. Für einen individuellen Prototyp ist die flexible Werkstatt eher geeignet. Verfahren folgen der Aufgabe.'),
      section('grenzen', 'Vom Ergebnis zur Maßnahme',
        'Liegt der Engpass an der Endprüfung, erhöht eine weitere Montagestation den verkaufsfähigen Output nicht automatisch. Prüfe zuerst Engpasszeit, Qualität, Rüstaufwand und Nachfrage. Fremdbezug entlastet Kapazität, schafft aber Abhängigkeit. Hohe Auslastung verringert Störungspuffer; Kapazität ist keine Absatzgarantie.'),
      source('Hochschule München, Einführung in die BWL, Produktionswirtschaft: https://heigl-eberl.userweb.mwn.de/EI_BWL1_2012_T.pdf',
        'bpb, Serienfertigung: https://www.bpb.de/kurz-knapp/lexika/lexikon-der-wirtschaft/20603/serienfertigung/'),
      ...check('Wie unterscheiden sich Serienfertigung und Werkstattfertigung?', 'Serienfertigung beschreibt die Wiederholung begrenzter Mengen gleicher Erzeugnisse. Werkstattfertigung beschreibt die Anordnung gleichartiger Betriebsmittel. Beides kann zusammen vorkommen.',
        'Eine Werkstatt hat 240 nutzbare Stunden; je Auftrag sind 3 Stunden nötig. Kann sie 90 Aufträge zusagen?', 'Kapazität = 240 ÷ 3 = 80 Aufträge. Für 90 fehlen 30 Stunden. Vor Zusage sind zusätzliche qualifizierte Kapazität, Fremdbezug oder spätere Termine zu klären; Material und andere Stationen müssen ebenfalls passen.'),
    ],
  },
];

export const bwlChapters: Chapter[] = [...topics].sort((a, b) => a.number.localeCompare(b.number, 'de', { numeric: true })).map(t => ({ id: t.id, subjectId: 'bwl', parentId: t.parentId, number: t.number, title: t.title, articleId: t.id }));
export const bwlArticles: Article[] = topics.map(t => ({ id: t.id, chapterId: t.id, subjectId: 'bwl', number: t.number, title: t.title, intro: t.intro, sections: t.sections, updatedAt: Date.UTC(2026, 10, 19), version: 1 }));
const terms: [string, string, string, string][] = [
  ...functionTerms,
  ...startupTerms,
  ...legalFormTerms,
  ...connectionTerms,
  ['produktion-begriff', 'Produktion', 'Kombination betrieblicher Faktoren zur Erstellung von Gütern oder Dienstleistungen.', 'produktion'],
  ['grundfunktion', 'Betriebliche Grundfunktion', 'Wiederkehrender betrieblicher Aufgabenbereich wie Produktion, Marketing oder Finanzierung; nicht zwingend eine eigene Abteilung.', 'grundlagen'],
  ['kapazitaet', 'Kapazität', 'Mögliches Leistungsvermögen in einem Zeitraum unter festgelegten technischen, personellen und organisatorischen Bedingungen.', 'produktion'],
];
export const bwlGlossary: GlossaryTerm[] = terms.map(([key, term, definition, article]) => ({ id: `bwl-${key}`, term, definition, subjectId: 'bwl', articleId: `bwl-${article}` }));
