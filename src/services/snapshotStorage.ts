import {emptySnapshot,isLocalSnapshot,repairSnapshot,type LocalSnapshot} from './syncModel';

export interface StorageAdapter {getItem(key:string):Promise<string|null>;setItem(key:string,value:string):Promise<unknown>}
export const snapshotKey = (uid:string|null) => `mywik.user.v1.${uid ?? 'guest'}`;
/** Per-account queues retain failed writes for retry; a read must never revive stale disk state. */
export function createSnapshotStorage(storage: StorageAdapter) {
  const tails=new Map<string,Promise<void>>();
  const dirty=new Map<string,{snapshot:LocalSnapshot;payload:string}>();
  const persist=(uid:string|null,snapshot:LocalSnapshot):Promise<void>=>{
    if(!isLocalSnapshot(snapshot))return Promise.reject(new Error('Ungültiger lokaler Datenstand. Die vorhandenen Daten bleiben erhalten.'));
    const key=snapshotKey(uid), job={snapshot,payload:JSON.stringify(snapshot)};
    dirty.set(key,job);
    const next=(tails.get(key)??Promise.resolve()).catch(()=>{}).then(async()=>{
      await storage.setItem(key,job.payload);
      if(dirty.get(key)===job)dirty.delete(key);
    });
    tails.set(key,next);return next;
  };
  const flush=async(uid:string|null)=>{
    const key=snapshotKey(uid);
    await tails.get(key)?.catch(()=>{});
    const job=dirty.get(key);
    if(job)await persist(uid,job.snapshot);
    // Include mutations queued while the earlier write was being awaited.
    if(dirty.has(key))await flush(uid);
  };
  const load=async(uid:string|null):Promise<LocalSnapshot>=>{
    await flush(uid);
    const raw=await storage.getItem(snapshotKey(uid));
    if(!raw)return emptySnapshot();
    let value:unknown;
    try{value=JSON.parse(raw)}catch{throw new Error('Die lokalen Lerndaten konnten nicht gelesen werden. Sie wurden nicht überschrieben.')}
    if(!isLocalSnapshot(value,false))throw new Error('Das lokale Datenformat wird nicht unterstützt. Die gespeicherten Daten bleiben erhalten.');
    const repaired=repairSnapshot(value);
    if(JSON.stringify(repaired)!==JSON.stringify(value))await persist(uid,repaired);
    return repaired;
  };
  return {persist,flush,load};
}
