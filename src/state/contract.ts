import type { Article, ArticleStatus, Flashcard, LaterItem, Note, Recommendation, UserData, UserSettings } from '../types';
export interface StoreContract {
 ready: boolean; online: boolean; user: { uid: string; email: string | null } | null;
 data: UserData; syncState: 'local' | 'syncing' | 'synced' | 'error'; error: string | null;
 signIn(email: string, password: string): Promise<void>; register(email: string, password: string): Promise<void>; signOut(): Promise<void>;
 setProgress(articleId: string, patch: { status?: ArticleStatus; starred?: boolean }): void;
 saveNote(note: Omit<Note, 'id' | 'updatedAt'> & { id?: string }): void; deleteNote(id: string): void;
 saveCard(card: Pick<Flashcard, 'subjectId' | 'front' | 'back'> & { id?: string }): void; deleteCard(id: string): void; reviewCard(id: string, known: boolean): void;
 addLearningTime(subjectId: string, kind: 'article' | 'cards', seconds: number, articleId?: string): void;
 saveLater(item: Omit<LaterItem, 'id' | 'updatedAt' | 'status'>): void; updateLater(id: string, status: LaterItem['status']): void;
 updateRecommendation(id: string, state: Recommendation['state']): void;
 updateSettings(patch: Partial<UserSettings>): void; syncNow(): Promise<void>;
}
export type ArticleScreenProps = { article: Article; onGlossary: (termId: string) => void; onChat: (sectionId?: string) => void; onActivity?: () => void };
