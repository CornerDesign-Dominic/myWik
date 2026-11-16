import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import * as FirebaseAuth from 'firebase/auth';
import { getAuth, initializeAuth, type Persistence } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

// Firebase client configuration is public; authorization is enforced by Firestore rules.
export const firebaseConfig = {
  apiKey: 'AIzaSyCWe2ShM8uVzv33fUbeuXaEfjgc40lLqZo',
  authDomain: 'meiwik.firebaseapp.com',
  projectId: 'meiwik',
  storageBucket: 'meiwik.firebasestorage.app',
  messagingSenderId: '48650734266',
  appId: '1:48650734266:web:91d8510bd9c4fe3d979083',
};
export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
// Firebase's RN entry exports this helper, while its shared public declaration omits it.
// A namespace assertion keeps the browser bundle valid (the helper is never used on web).
const nativeAuth = FirebaseAuth as typeof FirebaseAuth & {
  getReactNativePersistence(storage: typeof AsyncStorage): Persistence;
};
function createAuth() {
  try {
    return Platform.OS === 'web' ? getAuth(firebaseApp) : initializeAuth(firebaseApp, {
      persistence: nativeAuth.getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    // Fast Refresh may initialize the module more than once.
    if ((error as {code?:string}).code === 'auth/already-initialized') return getAuth(firebaseApp);
    throw error;
  }
}
export const auth = createAuth();
export const db = initializeFirestore(firebaseApp, { ignoreUndefinedProperties: true });
export const app = firebaseApp;
