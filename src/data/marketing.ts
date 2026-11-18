import type { ArticleSection } from '../types';
import * as planung from './marketing-planung';
import * as produktPreis from './marketing-produkt-preis';
import * as kanaele from './marketing-kanaele';
import * as vertrieb from './marketing-vertrieb';
import * as international from './marketing-international';
import * as recht from './marketing-recht';

const packages = [planung, produktPreis, kanaele, vertrieb, international, recht];
const diagrams: Record<string, { sectionId: string } & Pick<ArticleSection, 'matrix' | 'lineChart'>> = {
  'marketing-ansoff': {
    sectionId: 'matrix',
    matrix: {
      columns: ['Bestehender Markt', 'Neuer Markt'],
      rows: ['Bestehendes Produkt', 'Neues Produkt'],
      cells: [['Marktdurchdringung', 'Marktentwicklung'], ['Produktentwicklung', 'Diversifikation']],
      description: 'Wähle zuerst die Zeile für das Produkt und dann die Spalte für den Markt. Ein bestehendes Produkt auf einem neuen Markt gehört zur Marktentwicklung.',
    },
  },
  'marketing-bcg': {
    sectionId: 'matrix',
    matrix: {
      columns: ['Niedriger relativer Marktanteil', 'Hoher relativer Marktanteil'],
      rows: ['Hohes Marktwachstum', 'Niedriges Marktwachstum'],
      cells: [['Question Marks', 'Stars'], ['Poor Dogs', 'Cash Cows']],
      description: 'Lies das Marktwachstum links und den relativen Marktanteil oben ab. Hohes Wachstum bei niedrigem relativem Marktanteil ergibt ein Question Mark.',
    },
  },
  'marketing-preiselastizitaet': {
    sectionId: 'beispiel-elastizitaet',
    lineChart: {
      xLabel: 'Absatz (Stück)', yLabel: 'Preis (€/Stück)',
      points: [[850, 44], [925, 42], [1000, 40]],
      xTicks: [850, 925, 1000], yTicks: [40, 42, 44],
      description: 'Der Ausschnitt verbindet die beiden Beispielwerte. Steigt der Preis von 40 € auf 44 €, sinkt der Absatz von 1.000 auf 850 Stück. Der mittlere Punkt dient der Veranschaulichung.',
    },
  },
  'marketing-tkp': {
    sectionId: 'beispiel',
    matrix: {
      columns: ['Einfacher TKP', 'Gewichteter TKP'],
      rows: ['Medium A', 'Medium B'],
      cells: [['20 €', '50 €'], ['30 €', '40 €']],
      description: 'Je 1.000 Kontakte ist Medium A günstiger. Je 1.000 Kontakte in der Zielgruppe ist Medium B günstiger. Größe und Zusammensetzung des Publikums ändern die Rangfolge.',
    },
  },
  'marketing-kunden-abc': {
    sectionId: 'konzentrationskurve',
    lineChart: {
      xLabel: 'Kumulierter Kundenanteil (%)', yLabel: 'Kumulierter Umsatzanteil (%)',
      points: [[0, 0], [20, 60], [40, 75], [100, 100]],
      xTicks: [0, 20, 40, 60, 80, 100], yTicks: [0, 25, 50, 75, 100],
      reference: [[0, 0], [100, 100]],
      description: 'Die umsatzstärksten 20 % der Kunden erzielen 60 % des Umsatzes. Die ersten 40 % erzielen zusammen 75 %. Die gestrichelte Diagonale zeigt den Vergleich bei gleichmäßigem Umsatz pro Kunde.',
    },
  },
};

const byChapterNumber = (a: { number: string }, b: { number: string }) =>
  a.number.localeCompare(b.number, 'de', { numeric: true });

export const marketingChapters = packages.flatMap(pack => pack.chapters).sort(byChapterNumber);
export const marketingGlossary = packages.flatMap(pack => pack.glossary);
export const marketingArticles = packages.flatMap(pack => pack.articles).sort(byChapterNumber).map(article => {
  const diagram = diagrams[article.id];
  if (!diagram) return article;
  const { sectionId, ...content } = diagram;
  if (!article.sections.some(section => section.id === sectionId)) {
    throw new Error(`Abschnitt für Marketing-Grafik fehlt: ${article.id}/${sectionId}`);
  }
  return {
    ...article,
    sections: article.sections.map(section => section.id === sectionId ? { ...section, ...content } : section),
  };
});
