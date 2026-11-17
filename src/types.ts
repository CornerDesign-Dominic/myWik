export type ThemeMode = 'system' | 'light' | 'dark';
export type ArticleStatus = 'open' | 'unclear' | 'working' | 'done';
export interface Subject { id: string; title: string; subtitle: string; icon: string }
export interface Chapter { id: string; subjectId: string; parentId?: string; number: string; title: string; articleId?: string }
export interface RichText { text: string; termId?: string }
export interface ExampleTab { title: string; content: string }
export interface InventoryChart {
  description: string;
  points: [day: number, stock: number][];
  days: number[];
  levels: number[];
}
export interface ArticleSection { id: string; title: string; paragraphs: RichText[][]; tabs?: ExampleTab[]; hint?: { title: string; content: string; label?: string }; inventoryChart?: InventoryChart }
export interface Article { id: string; subjectId: string; chapterId: string; title: string; number: string; intro: string; sections: ArticleSection[]; updatedAt: number; version: number }
export interface GlossaryTerm { id: string; subjectId: string; term: string; definition: string; example?: string; articleId?: string }
export interface ArticleProgress { articleId: string; status: ArticleStatus; starred: boolean; updatedAt: number; history: { status: ArticleStatus; at: number }[] }
export interface Note { id: string; articleId: string; sectionId?: string; text: string; kind: 'personal' | 'improvement'; updatedAt: number }
export interface Flashcard { id: string; subjectId: string; front: string; back: string; updatedAt: number; nextReviewAt: number; reviews: number; knownCount?: number; unknownCount?: number; successStreak?: number; articleId?: string; sectionId?: string; articleVersion?: number; deleted?: boolean }
export interface LearningSession { id: string; subjectId: string; articleId?: string; kind: 'article' | 'cards'; seconds: number; day: string; startedAt: number }
export interface LaterItem { id: string; subjectId: string; articleId?: string; sectionId?: string; sourceText: string; question: string; answer: string; suspectedGap: string; suggestion: string; kind: 'missing' | 'wording' | 'example' | 'structure' | 'depth'; status: 'open' | 'done'; updatedAt: number }
export interface Recommendation { id: string; articleId: string; subjectId: string; title: string; reason: string; state: 'open' | 'done' | 'dismissed' | 'snoozed'; dueAt: number; updatedAt: number }
export type ReminderCategory = 'learning' | 'recommendations' | 'news';
export interface ReminderSetting { enabled: boolean; hour: number; minute: number; everyDays: number }
export interface UserSettings { theme: ThemeMode; reminders: Record<ReminderCategory, ReminderSetting> }
export interface ChatMessage { id: string; role: 'user' | 'assistant'; content: string; createdAt: number }
export interface ArticleChat { articleId: string; messages: ChatMessage[]; summary: string; updatedAt: number; expiresAt: number }
export interface UserData { progress: Record<string, ArticleProgress>; notes: Note[]; cards: Flashcard[]; sessions: LearningSession[]; visits: string[]; later: LaterItem[]; recommendations: Recommendation[]; settings: UserSettings }
export type Route = { name: 'home' | 'subjects' | 'cards' | 'success' | 'later' | 'recommendations' | 'settings' } | { name:'glossary';termId?:string;context?:{query:string;expanded:string|null;y:number} } | { name: 'chapters'; subjectId: string; collapsed?:Record<string,boolean> } | { name: 'article'; articleId: string };
