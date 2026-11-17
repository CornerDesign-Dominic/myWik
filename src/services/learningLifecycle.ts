const flushers=new Set<()=>void>();
export function registerLearningFlush(flush:()=>void){flushers.add(flush);return()=>{flushers.delete(flush)};}
/** Finish the outgoing owner's interval before account guards are disabled. */
export function flushLearningClocks(){for(const flush of flushers)flush();}
