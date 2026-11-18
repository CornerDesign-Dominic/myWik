import { db } from './firebase';
import { createEntitySync } from './syncTransport';
const transport = createEntitySync(db);
export const pushEntity = transport.push;
export const watchRemoteEntities = transport.watch;
