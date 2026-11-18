import * as grundlagen from './fz-grundlagen';
import * as gespraeche from './fz-mitarbeitergespraeche';
import * as konflikteFoerderung from './fz-konflikte-foerderung';
import * as ausbildung from './fz-ausbildung';
import * as moderation from './fz-moderation';
import * as praesentation from './fz-praesentation';

const chaptersInOrder = [grundlagen, gespraeche, konflikteFoerderung, ausbildung, moderation, praesentation];
const byChapterNumber = (a: { number: string }, b: { number: string }) =>
  a.number.localeCompare(b.number, 'de', { numeric: true });

export const leadershipChapters = chaptersInOrder.flatMap(part => part.chapters).sort(byChapterNumber);
export const leadershipArticles = chaptersInOrder.flatMap(part => part.articles).sort(byChapterNumber);
export const leadershipGlossary = chaptersInOrder.flatMap(part => part.glossary);
