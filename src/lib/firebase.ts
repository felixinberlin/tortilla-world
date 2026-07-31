/**
 * FILE: src/lib/firebase.ts
 *
 * PURPOSE:
 * Firebase initialization and exported Firestore and Auth references.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, signInAnonymously, type Auth } from 'firebase/auth';
import config from '../../firebase-applet-config.json';

const isConfigValid = Boolean(
  config && typeof config.apiKey === 'string' && config.apiKey.trim().length > 0
);

let app: ReturnType<typeof initializeApp> | null = null;
let dbRef: Firestore | null = null;
let authRef: Auth | null = null;

if (isConfigValid) {
  try {
    app = getApps().length === 0 ? initializeApp(config) : getApp();
    dbRef = config.firestoreDatabaseId && config.firestoreDatabaseId !== '(default)'
      ? getFirestore(app, config.firestoreDatabaseId)
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
export const isFirebaseConfigured = isConfigValid && !!dbRef;

