/** Serialize storage operations per key without blocking other accounts or records. */
export function createKeyedQueue() {
 const tails=new Map<string,Promise<unknown>>();
 return function run<T>(key:string,operation:()=>Promise<T>):Promise<T> {
  const next=(tails.get(key)??Promise.resolve()).catch(()=>{}).then(operation);
  tails.set(key,next);
  void next.then(()=>{if(tails.get(key)===next)tails.delete(key)},()=>{if(tails.get(key)===next)tails.delete(key)});
  return next;
 };
}
