import type { ArticleSection } from '../types';
import { section } from './rw-standard';

export interface FinanceTopic {
  id: string; number: string; parentId?: string; title: string; intro: string;
  sections: ArticleSection[];
  terms?: [id: string, term: string, definition: string][];
}
export const sources = {
  investment: 'DLG, Merkblatt 446, Investitionsrechnung (2019), Zahlungsreihen und dynamische Bewertung: https://www.dlg.org/fileadmin/downloads/Merkblaetter/dlg-merkblatt_446.pdf',
  methods: 'TU Dresden, BWL interaktiv, Investitionsrechnung, Verfahren sowie Nutzungsdauer- und Ersatzentscheidungen: https://tu-dresden.de/bu/wirtschaft/forschung/projekte/bwl_interaktiv/ordner_ir',
  planning: 'IHK Region Stuttgart, Finanzierung des Kapitalbedarfs: https://www.ihk.de/stuttgart/gruendung/finanzierung/finanzplanung/kapitalbedarf/finanzierung-des-kapitalbedarfs-678268',
  liquidity: 'IHK Hannover, Liquiditätsplanung: https://www.ihk.de/hannover/hauptnavigation/gruendung-sicherung-nachfolge/unternehmenssicherung/liquiditaetsplanung-5281932',
  forms: 'IHK München, Finanzierung und Förderung für Unternehmen: https://www.ihk-muenchen.de/ratgeber/unternehmensfuehrung/finanzierung-und-foerderung/unternehmen/',
  alternatives: 'IHK Düsseldorf, Finanzierungsalternativen, insbesondere Aval, Factoring und Leasing: https://www.ihk.de/duesseldorf/existenzgruendung/foerderprogramme/finanzierungsalternativen-5410802',
  depreciation: 'bpb, Abschreibungsfinanzierung, Modell des Lohmann-Ruchti-Effekts: https://www.bpb.de/kurz-knapp/lexika/lexikon-der-wirtschaft/18534/abschreibungsfinanzierung/',
  basel: 'BIS, Geschichte des Baseler Ausschusses: https://www.bis.org/committees/bcbs/history',
  securitisation: 'Deutsche Bundesbank, Verbriefungen: https://www.bundesbank.de/de/aufgaben/finanzaufsicht/einzelaspekte/eigenmittelanforderungen/kreditrisiko/verbriefungen-598450',
  bonds: 'Volksbanken Raiffeisenbanken, Wandel- und Optionsanleihen: https://www.vr.de/privatkunden/produkte/geldanlage/anleihen/wandelanleihen.html',
};
export const source = (...references: string[]) => section('quellen', 'Quellen und Stand',
  'Geprüfter Stand: 19. November 2026. Eigenständige Lehrdarstellung und fiktive Modellfälle. IHK-Fotoabgleich: Inhaltsverzeichnis bis 3.4.4 und Register S. 85–86; unbekannte Buchseiten und Aufgaben sind nicht abgeglichen.', ...references);
export const model = 'Modellannahmen: Euro netto, keine Steuern, keine Inflation, sichere Zahlungen, keine zusätzlichen Gebühren. Anfangsauszahlung in t = 0; weitere Zahlungen jeweils am Jahresende. Zinssatz 8 % p. a. mit jährlichem Zinseszins. Intern ungerundet, Geldbeträge auf Cent, Prozentsätze auf zwei Stellen gerundet.';
export const machine = 'Nordlicht vergleicht zwei Maschinen für dieselbe Leistung und Qualität bei 10.000 Stück/Jahr und vier Jahren Nutzung. A kostet sofort 100.000 €, B 120.000 €. Restwerte jeweils 0 €. Jährlicher Erlös jeweils 100.000 €. Laufende zahlungswirksame Fixkosten: A 15.000 €, B 10.000 €. Variable Kosten: A 5 €/Stück, B 4,50 €/Stück. Damit betragen die jährlichen laufenden Auszahlungen A 65.000 €, B 55.000 € und die jährlichen Zahlungsüberschüsse A 35.000 €, B 45.000 €.';
