import { buildManagementOutline } from './bm-artikel';
import { planningGlossary, planningLessons } from './bm-planung';
import { developmentGlossary, developmentLessons } from './bm-entwicklung';
import { knowledgeGlossary, knowledgeLessons } from './bm-wissen';
import { methodsGlossary, methodsLessons } from './bm-methoden';
import { projectGlossary, projectLessons } from './bm-projekt';
import { communicationGlossary, communicationLessons } from './bm-gespraeche';
import { managementTransferCase } from './bm-transferfall';

export const { chapters: managementChapters, articles: managementArticles } = buildManagementOutline([
  ...planningLessons,
  ...developmentLessons,
  ...knowledgeLessons,
  ...methodsLessons,
  ...projectLessons,
  ...communicationLessons,
  managementTransferCase,
]);

export const managementGlossary = [
  ...planningGlossary,
  ...developmentGlossary,
  ...knowledgeGlossary,
  ...methodsGlossary,
  ...projectGlossary,
  ...communicationGlossary,
];
