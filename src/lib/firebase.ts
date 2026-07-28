/**
 * FILE: src/lib/firebase.ts
 *
 * PURPOSE:
 * Firebase initialization and exported Firestore and Auth references.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import config from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(config) : getApp();

export const db =
  config.firestoreDatabaseId && config.firestoreDatabaseId !== '(default)'
    ? getFirestore(app, config.firestoreDatabaseId)
    : getFirestore(app);

export const auth = getAuth(app);

// Anonymous auth initialization for testing session identity
signInAnonymously(auth).catch((err) => {
  console.warn('Firebase anonymous auth status:', err?.message || err);
});
