import { collection, doc, getDocs, onSnapshot, runTransaction } from 'firebase/firestore';
import { db } from './firebase';
import { entityKey, isSyncEntity, winner, type SyncEntity } from './syncModel';

export async function fetchRemoteEntities(uid: string): Promise<SyncEntity[]> {
  const result = await getDocs(collection(db,'users',uid,'entities'));
  return result.docs.flatMap(d => { const entity = d.data(); return isSyncEntity(entity) && entityKey(entity.kind,entity.entityId) === d.id ? [entity] : []; });
}
export async function pushEntity(uid: string, local: SyncEntity): Promise<SyncEntity> {
  const ref = doc(db,'users',uid,'entities',entityKey(local.kind,local.entityId));
  return runTransaction(db, async transaction => {
    const snapshot = await transaction.get(ref);
    const candidate = snapshot.data();
    const remote = isSyncEntity(candidate) ? candidate : undefined;
    const chosen = winner(remote,local);
    if (!remote || chosen.revision !== remote.revision) transaction.set(ref,chosen);
    return chosen;
  });
}

/** Firestore streams changed documents after the initial snapshot, avoiding full polling. */
export function watchRemoteEntities(uid: string, receive: (entities: SyncEntity[]) => void, onError: (error: unknown) => void): () => void {
  return onSnapshot(collection(db,'users',uid,'entities'), snapshot => {
    receive(snapshot.docChanges().flatMap(change => { const entity = change.doc.data(); return isSyncEntity(entity) && entityKey(entity.kind,entity.entityId) === change.doc.id ? [entity] : []; }));
  },onError);
}
