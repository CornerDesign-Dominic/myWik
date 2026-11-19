import { outline, define } from './uf-standard';
import { ufOrganisation } from './uf-betriebsorganisation';
import { ufPersonal } from './uf-personal';
import { ufDevelopment } from './uf-entwicklung';

export const { chapters: ufChapters, articles: ufArticles } = outline([...ufOrganisation, ...ufPersonal, ...ufDevelopment]);
export const ufGlossary = [
  define('philosophie', 'Unternehmensphilosophie', 'Grundlegende Überzeugungen über Zweck, Werte und verantwortliches Wirtschaften eines Unternehmens.', 'leitbild'),
  define('leitbild', 'Unternehmensleitbild', 'Formulierte Orientierung zu Auftrag, angestrebter Zukunft und Werten eines Unternehmens als Maßstab für Entscheidungen und Verhalten.', 'leitbild'),
  define('kultur', 'Unternehmenskultur', 'Tatsächlich geteilte Werte, Normen und Gewohnheiten, die das Verhalten in einem Unternehmen prägen.', 'leitbild'),
  define('ci', 'Corporate Identity', 'Abgestimmte Identität und Selbstdarstellung eines Unternehmens durch Verhalten, Kommunikation und Gestaltung.', 'leitbild'),
  define('ims', 'Integriertes Managementsystem', 'Gemeinsame Steuerung von Anforderungen mehrerer Managementbereiche über abgestimmte Prozesse, Ziele und Verantwortungen.', 'ims'),
  define('aufgabenanalyse', 'Aufgabenanalyse', 'Systematische Zerlegung einer Gesamtaufgabe in Teilaufgaben, etwa nach Verrichtung, Objekt, Phase, Rang oder Zweckbezug.', 'aufbau'),
  define('aufbauorganisation', 'Aufbauorganisation', 'Formale Gliederung eines Unternehmens in Stellen und Einheiten mit Aufgaben, Befugnissen, Verantwortung und Unterstellungsbeziehungen.', 'aufbau'),
  define('aufgabensynthese', 'Aufgabensynthese', 'Zusammenfassung von Teilaufgaben zu organisatorischen Aufgabeneinheiten wie Stellen und Abteilungen.', 'aufbau'),
  define('stelle', 'Stelle', 'Personenunabhängig definierte kleinste organisatorische Einheit mit einem abgegrenzten Aufgabenbereich und zugeordneten Befugnissen.', 'aufbau'),
  define('organigramm', 'Organigramm', 'Darstellung formaler Organisationseinheiten und ihrer Unterstellungs- beziehungsweise Weisungsbeziehungen.', 'aufbau'),
  define('ablauforganisation', 'Ablauforganisation', 'Sachliche, zeitliche, räumliche und personelle Ordnung von Arbeitsschritten und Übergaben zur Leistungserstellung.', 'ablauf'),
  define('kundenzufriedenheit', 'Kundenzufriedenheit', 'Bewertung einer erlebten Leistung im Verhältnis zu den Erwartungen einer Kundin oder eines Kunden.', 'kundenzufriedenheit'),
  define('nps', 'Net Promoter Score', 'Anteil der Promotoren (Bewertung 9–10) minus Anteil der Kritiker (0–6) unter allen gültigen Antworten auf die Weiterempfehlungsfrage von 0 bis 10. Ergebnis in Punkten zwischen −100 und +100.', 'kundenzufriedenheit'),
  define('fuehrungsleitbild', 'Führungsleitbild', 'Grundsätze für erwartetes Führungsverhalten, abgeleitet aus Unternehmenswerten und Zielen.', 'personalpolitik'),
  define('personalpolitik', 'Personalpolitik', 'Längerfristige Grundsätze für Entscheidungen über Gewinnung, Einsatz, Entwicklung, Vergütung und Trennung von Personal.', 'personalpolitik'),
  define('vza', 'Vollzeitäquivalent', 'Einheit der Arbeitskapazität im Verhältnis zum vereinbarten Arbeitsumfang einer betrieblichen Vollzeitstelle; nicht mit Personenzahl gleichzusetzen.', 'personalplanung'),
  define('personalplanung', 'Personalplanung', 'Vorausschauende Ermittlung und Abstimmung von Personalbedarf und Personalbestand nach Anzahl, Qualifikation, Zeitpunkt und Einsatzort.', 'personalplanung'),
  define('personalbeschaffung', 'Personalbeschaffung', 'Gewinnung und Auswahl geeigneter Personen über interne oder externe Wege zur Deckung eines festgestellten Personalbedarfs.', 'beschaffung'),
  define('personalanpassung', 'Personalanpassung', 'Abstimmung von Personalbestand, Arbeitszeit, Einsatz und Qualifikation auf einen veränderten Personalbedarf.', 'anpassung'),
  define('bruttobedarf', 'Bruttopersonalbedarf', 'Gesamter personeller Sollbestand für eine definierte Aufgabe und Periode unter ausgewiesenen Zeit- und Kapazitätsannahmen.', 'personalplanung'),
  define('nettobedarf', 'Nettopersonalbedarf', 'Differenz aus künftigem Bruttopersonalbedarf und fortgeschriebenem Personalbestand. Ein positiver Wert zeigt eine Deckungslücke, ein negativer einen rechnerischen Überhang.', 'personalplanung'),
  define('anforderungsprofil', 'Anforderungsprofil', 'Beschreibung der für eine bestimmte Aufgabe benötigten Kenntnisse, Fertigkeiten, Erfahrungen und weiteren Kompetenzen mit überprüfbaren Kriterien.', 'personalplanung'),
  define('zeitentgelt', 'Zeitentgelt', 'Vergütung, deren Bemessung an vereinbarte oder geleistete Arbeitszeit statt direkt an die erzeugte Menge anknüpft.', 'entgelt'),
  define('akkord', 'Akkordentgelt', 'Leistungsentgelt, das unmittelbar anhand einer anerkannten Arbeitsmenge und eines Stücksatzes oder einer Vorgabezeit berechnet wird.', 'entgelt'),
  define('praemie', 'Prämienentgelt', 'Vergütung aus Grundentgelt und einer zusätzlichen Komponente für vorab definierte Leistungs- oder Ergebniskriterien.', 'entgelt'),
];
