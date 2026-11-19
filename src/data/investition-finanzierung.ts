import type { Article, Chapter, GlossaryTerm } from '../types';
import { investmentTopics } from './if-investition';
import { financePlanningTopics } from './if-finanzplanung';
import { financingTopics } from './if-finanzierungsarten';
import { check, section as s } from './rw-standard';
import { source, sources, type FinanceTopic } from './if-standard';
import { linkGlossary } from './logistik-standard';

const subjectId = 'investition-finanzierung';
const topics: FinanceTopic[] = [...investmentTopics, ...financePlanningTopics, ...financingTopics, {
  id: 'if-fall', parentId: 'if-liquiditaet', number: '3.4', title: 'Übungsfall: Investition auswählen und Finanzierung absichern',
  intro: 'Eine wirtschaftlich vorteilhafte Maschine muss auch im Stressfall finanzierbar sein. Dieser Fall verbindet Verfahrenswahl, Kapitalbedarf, Schuldendienst und eine begründete Freigabe.',
  sections: [
    s('auftrag', 'Ausgangsdaten und Arbeitsauftrag',
      'Nordlicht vergleicht A (100.000 € sofort, vier jährliche operative Rückflüsse 35.000 €) und B (120.000 €, viermal 45.000 €). Restwerte null, Kalkulationszins 8 % p. a., Jahresendzahlungen, keine Steuern/Inflation/Gebühren. Kapitalbedarf B: 120.000 € Maschine, 20.000 € zusätzliches dauerhaftes Betriebskapital, 10.000 € Reserve. Finanzierung: 50.000 € EK, 80.000 € Bankdarlehen zu 6 % mit 20.000 € jährlicher Tilgung, 20.000 € Nachrang zu 10 % ohne laufende Tilgung, fällig Ende Jahr 4. Bankzins auf Anfangsrestschuld, Nachrangzins jährlich auf 20.000 €. Kein weiteres Kapitalwachstum; Rückflüsse sind vor Finanzierung. Betriebskapital wird erst nach Ende des Horizonts frei und steht daher nicht für die Schlusszahlung zur Verfügung.',
      '1. Vergleiche Kapitalwerte und statische Amortisation. 2. Prüfe Deckung und Jahr-1-Schuldendienst. 3. Rechne einen dauerhaften Rückgang der B-Rückflüsse um 20 %. 4. Prüfe die Schlussfälligkeit in Jahr 4. 5. Formuliere Bedingungen einer Investitionsfreigabe. Runde erst die Ergebnisse auf Cent.'),
    { ...s('loesung', 'Musterlösung zum Gesamtfall', 'Bearbeite die Aufgaben vor dem Öffnen der Lösung.'), hint: { label: 'ÜBUNGSFALL', title: 'Musterlösung aufklappen', content: '1. RBF(8 %,4) = 3,31212684. C₀,A = −100.000 + 35.000 × RBF = 15.924,44 €; C₀,B = −120.000 + 45.000 × RBF = 29.045,71 €. B ist im reinen Anlagenvergleich besser. Amortisation statisch A 100.000/35.000 = 2,86 Jahre, B 120.000/45.000 = 2,67 Jahre. Bei ausschließlich Jahresendzahlungen erfolgt tatsächliche nominale Deckung jeweils erst am dritten Jahresende. 2. Bedarf und Mittel jeweils 150.000 €. Jahr 1 Bankzins 4.800 €, Nachrangzins 2.000 €, Tilgung 20.000 €: Schuldendienst 26.800 €, Rest aus 45.000 € Rückfluss 18.200 €. 3. Stressrückfluss B = 45.000 × 0,8 = 36.000 €. Anlagenkapitalwert = −120.000 + 36.000 × RBF = −763,43 €. Jahr 1 verbleiben trotzdem 9.200 € nach Schuldendienst. Zahlungsüberschuss beweist also keine Investitionsvorteilhaftigkeit. 4. Jahr 4 Bankrest Anfang 20.000 €, Zins 1.200 €, Tilgung 20.000 €, Nachrangzins 2.000 € und Nachrangtilgung 20.000 €: 43.200 € Schuldendienst. Basisszenario lässt 1.800 € Jahresrest, Stressfall zeigt 7.200 € Jahresunterdeckung. Die Vorjahresüberschüsse beziehungsweise Reserve müssen verfügbar gehalten und die konkreten Termine geprüft werden. 5. Freigabe nur bei plausibler Absatz- und Rückflussprognose, geeigneter Leistung, verbindlich verfügbarer Finanzierung, passendem Sicherheitenvertrag und einer aktualisierten Liquiditätsplanung mit Stressreserve. Gesamtprojekt einschließlich 20.000 € Betriebskapital und seiner späteren Freisetzung über einen passenden Horizont gesondert bewerten: Die hier berechneten Anlagenkapitalwerte sind dafür noch keine vollständigen Projektkapitalwerte.' } },
    s('weiterlernen', 'Anlagenentscheidung und Gesamtprojekt auseinanderhalten',
      'Der [[a:if-kapitalwert|Anlagenvergleich]] zeigt die Investitionsalternative. [[a:if-kapitalbedarf|Kapitalbedarf]] berücksichtigt außerdem die Finanzierung von Betriebskapital und Reserve. Wenn zusätzliche Forderungen und Vorräte erst durch B entstehen, müssen auch deren Zahlungen und spätere Freisetzung in den Gesamtprojektkapitalwert eingehen. Eine Reserve ist zunächst gehaltenes Geld und nicht automatisch ein endgültiger Aufwand.',
      'Die [[a:rw-fall-planung|integrierte Planungsaufgabe im Rechnungswesen]] verbindet zusätzlich Ergebnis und Planbilanz. Der zweite Anwendungskontext Fahrzeugersatz nutzt dieselbe Trennung: Fahrzeugrückflüsse, zusätzliches Betriebskapital und Kreditraten haben unterschiedliche Rollen.'),
    source(sources.methods, sources.planning),
    ...check('Warum kann ein Projekt im Stressfall liquide bleiben und trotzdem einen negativen Kapitalwert haben?', 'Liquidität fragt nach fälligen Zahlungen und verfügbaren Beständen. Der Kapitalwert prüft zusätzlich, ob die Rückflüsse die geforderte Verzinsung des gesamten eingesetzten Investitionskapitals erreichen.',
      'B erzielt dauerhaft nur 40.000 € jährlich. Berechne Anlagenkapitalwert und Jahr-1-Rest nach Finanzierung.', 'C₀ = −120.000 + 40.000 × 3,31212684 = 12.485,07 €. Jahr-1-Rest = 40.000 − 26.800 = 13.200 €. B bleibt als Anlage absolut vorteilhaft, liegt aber unter A mit 15.924,44 €. Die zusätzlichen Kapitalbindungen sind weiterhin gesondert zu berücksichtigen.'),
  ],
}];

// The existing five catalogue IDs and their numbers are retained. The photo's
// different chapter order is mapped explicitly in the accompanying Stoffliste.
export const financeChapters: Chapter[] = topics.map(t => ({
  id: t.id, subjectId, parentId: t.parentId, number: t.number, title: t.title, articleId: t.id,
})).sort((a,b) => a.number.localeCompare(b.number, 'de', { numeric: true }));
export const financeGlossary: GlossaryTerm[] = topics.flatMap(t => (t.terms ?? []).map(([id, term, definition]) => ({ id, term, definition, subjectId, articleId: t.id })));
const aliases = [
  ...financeGlossary.map(t => ({ text: t.term, termId: t.id })),
  ...[
    ['Investition','bwl-investition'], ['Finanzierung','bwl-finanzierung'], ['Liquidität','bwl-liquiditaet'],
    ['Liquiditätsplan','rw-liquiditaetsplan'], ['Leasing','recht-vt-begriff-leasing'],
    ['Lieferantenkredit','logistik-lieferantenkredit'], ['Factoring','marketing-t-factoring'],
    ['Eigenkapitalrentabilität','rw-ekr'], ['Gesamtkapitalrentabilität','rw-gkr'],
  ].map(([text,termId]) => ({ text, termId })),
];
export const financeArticles: Article[] = topics.map(t => ({
  id: t.id, subjectId, chapterId: t.id, number: t.number, title: t.title, intro: t.intro,
  sections: linkGlossary(t.sections, aliases), updatedAt: Date.UTC(2026,10,19), version: 1,
}));
