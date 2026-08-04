/**
 * FILE: src/lib/firebase.ts
 *
 * PURPOSE:
 * Firebase initialization and exported Firestore and Auth references.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, signInAnonymously, type Auth } from 'firebase/auth';
import { isDevMode } from '../utils/devMode';

interface FirebaseConfig {
  apiKey?: string;
  authDomain?: string;
  projectId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  firestoreDatabaseId?: string;
  [key: string]: unknown;
}

const configModules = import.meta.glob('../../firebase-applet-config.json', {
  eager: true,
  import: 'default',
});
const configKeys = Object.keys(configModules);
const config = configKeys.length > 0 ? (configModules[configKeys[0]] as FirebaseConfig) : null;

const isConfigValid = Boolean(
  config && typeof config.apiKey === 'string' && config.apiKey.trim().length > 0
);

let app: ReturnType<typeof initializeApp> | null = null;
let dbRef: Firestore | null = null;
let authRef: Auth | null = null;

// Only initialize Firebase/Firestore when in developer mode. In release mode, database access is completely disabled.
if (isDevMode() && isConfigValid && config) {
  try {
    app = getApps().length === 0 ? initializeApp(config) : getApp();
    const databaseId = typeof config.firestoreDatabaseId === 'string' ? config.firestoreDatabaseId : undefined;
    dbRef = databaseId && databaseId !== '(default)'
      ? getFirestore(app, databaseId)
      : getFirestore(app);
    authRef = getAuth(app);

    signInAnonymously(authRef).catch((err) => {
      console.warn('Firebase anonymous auth status:', err?.message || err);
    });
  } catch (err) {
    console.warn('Firebase initialization error:', err);
  }
}

export { app };
export const db = dbRef as Firestore;
export const auth = authRef as Auth;
export const isFirebaseConfigured = isDevMode() && isConfigValid && !!dbRef;

