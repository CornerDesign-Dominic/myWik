import {collection,doc,getDocsFromServer,onSnapshot,runTransaction,type Firestore} from 'firebase/firestore';
import {entityKey,isSyncEntity,winner,type SyncEntity} from './syncModel';

/** Inject a database for emulator tests; production binding lives in sync.ts. */
export function createEntitySync(db:Firestore) {
 const fetch=async(uid:string):Promise<SyncEntity[]>=>{
  const result=await getDocsFromServer(collection(db,'users',uid,'entities'));
  return result.docs.flatMap(d=>{const e=d.data();return isSyncEntity(e)&&entityKey(e.kind,e.entityId)===d.id?[e]:[]});
 };
 const push=async(uid:string,local:SyncEntity,baseRevision?:string):Promise<{accepted:SyncEntity;conflict?:SyncEntity}>=>{
  if(!isSyncEntity(local))throw new Error('Ungültige Synchronisierungsdaten.');
  const ref=doc(db,'users',uid,'entities',entityKey(local.kind,local.entityId));
  return runTransaction(db,async tx=>{
   const snapshot=await tx.get(ref),candidate=snapshot.data();
   const remote=isSyncEntity(candidate)?candidate:undefined;
   const chosen=winner(remote,local);
   if(!remote||chosen.revision!==remote.revision)tx.set(ref,chosen);
   const loser=remote&&chosen.revision===remote.revision?local:remote;
   const conflict=remote&&remote.revision!==local.revision&&remote.revision!==baseRevision&&JSON.stringify(remote.value)!==JSON.stringify(local.value)&&loser&&!loser.deleted&&['note','card'].includes(loser.kind)?loser:undefined;
   return {accepted:chosen,...(conflict?{conflict}:{})};
  });
 };
 const watch=(uid:string,receive:(entities:SyncEntity[])=>void,onError:(error:unknown)=>void)=>{
  let firstServer=true;
  return onSnapshot(collection(db,'users',uid,'entities'),{includeMetadataChanges:true},snapshot=>{
   if(snapshot.metadata.fromCache||snapshot.metadata.hasPendingWrites)return;
   const docs=firstServer?snapshot.docs:snapshot.docChanges().map(c=>c.doc);firstServer=false;
   receive(docs.flatMap(d=>{const e=d.data();return isSyncEntity(e)&&entityKey(e.kind,e.entityId)===d.id?[e]:[]}));
  },onError);
 };
 return {fetch,push,watch};
}
