import test from 'node:test';
import assert from 'node:assert/strict';
import { articles, chapters, contentVersion, glossary, subjects } from '../src/data/content';
import { isCatalogue } from '../src/services/catalogueModel';
import serverArticles from '../functions/src/catalogue.json';

const bookCoverage: Record<string, string[]> = {
  '1.1': ['6-r', 'teilbereiche', 'zielkonflikte', 'informationslogistik', 'supply-chain-management', 'kontraktlogistik', 'lieferservice'],
  '1.2': ['ablauf-beschaffung', 'einkaufsorganisation', 'angebotspruefung', 'angebotsvergleich', 'sourcing', 'sourcing-baukasten', 'beschaffungsmarkt', 'einkaufskooperation-lieferkette', 'make-or-buy', 'beschaffungsmarktforschung', 'lieferantenmanagement', 'lieferantenaudit', 'abc-analyse', 'xyz-analyse', 'wertanalyse'],
  '1.3': ['beschaffungsstrategien', 'bedarfsarten', 'nettobedarf', 'stuecklisten', 'stuecklistenarten', 'dispositionsstufen', 'heuristische-bedarfsplanung', 'verbrauchsprognose', 'exponentielle-glaettung', 'regressionsanalyse', 'optimale-bestellmenge', 'bestellhaeufigkeit', 'bestellzeitpunkt', 'bestellrhythmus-rechnen', 'sicherheitszeit', 'lieferbereitschaft', 'feinabruf'],
  '2.1': ['wareneingang', 'pruefplan-stichprobe', 'beschaffungscontrolling', 'beschaffungskennzahlen'],
  '2.2': ['lagerarten', 'lagerplatzvergabe', 'lagerplanung', 'lagerfunktionen-vertieft', 'lagerkennzahlen', 'lagerreichweite', 'lagerzinsen', 'lagerverwaltung', 'eigen-fremd-konsignationslager', 'kommissionierung', 'kommissionierzeit', 'kommissionierorganisation'],
  '3.1': ['fertigungsprinzipien', 'werkstattfertigung', 'fertigungsinseln', 'reihen-fliesbandfertigung'],
  '3.2': ['interne-transportsysteme', 'externe-transportsysteme', 'kombinierter-verkehr', 'werkverkehr-rohrleitungen', 'verkehrsorganisation', 'gefahrgut-verkehrstraeger'],
  '3.3': ['verpackung', 'verpackungsarten'],
  '3.4': ['warenausgang', 'distributionsstufen', 'transportvertraege', 'frachtbrief', 'frachtfuehrerhaftung', 'cmr-vorbehalte', 'adsp-verkehrsvertrag', 'sonderziehungsrechte', 'transportdokumente-glossar'],
  '3.5': ['ladehilfsmittel', 'ladungssicherung', 'sicherungsprinzipien', 'ladungssicherung-rollen'],
  '3.6': ['entsorgungslogistik', 'entsorgungsobjekte', 'abfallvermeidung', 'wiederverwendung-vorbereitung', 'recycling', 'sonstige-verwertung', 'abfallbeseitigung', 'rueckfuehrung'],
  '4.1': ['beschaffungsportfolio', 'produktportfolio'],
  '4.2': ['weltweiter-einkauf'],
  '4.3': ['muda', 'wertstromanalyse', 'kanban', 'vmi-milk-run', 'rfid'],
  '5.1': ['kaufvertraege', 'kauf-werk-werklieferung', 'vertragssonderformen', 'zahlung-skonto', 'preisgleitklauseln', 'akkreditiv-streckengeschaeft', 'eigentum-zahlung-gefahr', 'incoterms', 'lieferklauseln-vergleich'],
  '5.2': ['zollunion', 'direkter-indirekter-aussenhandel', 'einfuhr', 'ausfuhr', 'warenursprung', 'veredelung', 'zollwert-versand', 'taric-atlas', 'ursprungsnachweise', 'ausfuhrbeschraenkungen', 'zoll-und-aussenhandel-glossar'],
  '5.3': ['abfallwirtschaft', 'gewerbeabfall', 'abfallschluessel-nachweise'],
};

const logisticsChapters = chapters.filter(chapter => chapter.subjectId === 'logistik');
const logisticsArticles = articles.filter(article => article.subjectId === 'logistik');
const articleFor = (id: string) => logisticsArticles.find(article => article.chapterId === `logistik-${id}`);

test('every audited textbook block has reachable offline lessons', () => {
  const numbers = new Set(logisticsChapters.map(chapter => chapter.number));
  assert.equal(numbers.size, logisticsChapters.length, 'Chapter numbers are unique');
  for (const [block, topics] of Object.entries(bookCoverage)) {
    for (const topic of topics) {
      const article = articleFor(topic);
      assert.ok(article, `Missing ${block}: ${topic}`);
      assert.ok(article.number.startsWith(block === '5.3' ? '5.' : `${block}.`) || article.number === block, `Wrong block for ${topic}`);
    }
  }
  for (const id of ['digitale-schnittstellen', 'lieferkettenstoerung', 'otif', 'cross-docking', 'transportkosten-co2']) {
    assert.ok(articleFor(id), `Missing approved extension: ${id}`);
  }
  for (const article of logisticsArticles) {
    const selfCheck = article.sections.at(-1);
    assert.equal(selfCheck?.id, 'kurzfrage', article.title);
    assert.ok(selfCheck.hint?.content.trim(), article.title);
  }
});

test('each major chapter has an original case and combined calculation, loading and customs cases are present', () => {
  for (const id of ['fall-beschaffung', 'fall-lager', 'fall-wertschoepfung', 'fall-rationalisierung', 'fall-rechtsaspekte', 'fall-nachbestellrechnung', 'fall-verladung', 'fall-zoll-veredelung']) {
    const tasks = articleFor(id)?.sections.at(-1);
    assert.equal(tasks?.paragraphs.length, 3, id);
    assert.equal(tasks.hint?.title, 'Musterlösung', id);
    assert.equal(tasks.hint.content.split('\n').length, 3, id);
  }
});

test('embedded inventory diagrams match the offline and server catalogue schema', () => {
  const catalogue = { version: contentVersion, subjects, chapters, articles, glossary };
  const wire = JSON.parse(JSON.stringify(catalogue));
  assert.ok(isCatalogue(wire));
  assert.deepEqual(wire.articles, serverArticles);
  for (const id of ['bestellzeitpunkt', 'bestellrhythmus-rechnen']) {
    const chart = articleFor(id)?.sections.find(section => section.inventoryChart)?.inventoryChart;
    assert.ok(chart, id);
    assert.equal(chart.points[0][0], 0);
    assert.ok(chart.points.some(([day, stock], index) => chart.points[index - 1]?.[0] === day && chart.points[index - 1][1] < stock));
  }
  const corrupted = wire.articles.find((article: { id: string }) => article.id === 'logistik-bestellzeitpunkt');
  const points = corrupted?.sections.find(section => section.inventoryChart)?.inventoryChart?.points;
  assert.ok(points);
  Reflect.set(points, 0, [0, 'unbekannt']);
  assert.equal(isCatalogue(wire), false);
});
