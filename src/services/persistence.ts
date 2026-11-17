import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSnapshotStorage } from './snapshotStorage';
const storage = createSnapshotStorage(AsyncStorage);
export const loadSnapshot = storage.load;
export const persistSnapshot = storage.persist;
export const flushSnapshots = storage.flush;
