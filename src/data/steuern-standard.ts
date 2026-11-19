import { section } from './rw-standard';
export { section, check, type AccountingTopic as TaxTopic } from './rw-standard';

export const taxSources = (law: string, norms: string[], ...other: string[]) => section(
  'quellen', 'Quellen und Rechtsstand',
  'Amtlicher Quellenabgleich: 19. November 2026. Zahlenbeispiele gelten für 2026, soweit nicht anders bezeichnet. Für eine Prüfungsaufgabe ist deren vorgegebener Rechtsstand maßgeblich.',
  ...norms.map(n => `Amtlicher Gesetzestext: https://www.gesetze-im-internet.de/${law}/${n.startsWith('art_') ? n : '__' + n}.html`),
  ...other,
);
