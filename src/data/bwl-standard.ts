import type { ArticleSection } from '../types';
import { section } from './rw-standard';

export interface BwlTopic {
  id: string; number: string; title: string; parentId?: string;
  intro: string; sections: ArticleSection[];
}
export const source = (...references: string[]) => section('quellen', 'Quellen und Stand',
  'Fachlicher Quellenabgleich und Rechtsstand: 19. November 2026. Zahlenbeispiele sind vereinfachte Modellfälle. Für Prüfungsaufgaben gilt der vorgegebene Rechtsstand.', ...references);
export const functionsSource = () => source(
  'bpb, Betriebswirtschaftslehre (Funktionsgliederung): https://www.bpb.de/kurz-knapp/lexika/lexikon-der-wirtschaft/18887/betriebswirtschaftslehre/',
  'Vertiefungen und Rechenmethoden: die im Text verlinkten myWik-Fachartikel.');
