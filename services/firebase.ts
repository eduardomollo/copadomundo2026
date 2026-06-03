import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            'AIzaSyCmjwFtru94JFC64b-tdxdUtJNcyZW3QsE',
  authDomain:        'copamundo2026-58a04.firebaseapp.com',
  projectId:         'copamundo2026-58a04',
  storageBucket:     'copamundo2026-58a04.firebasestorage.app',
  messagingSenderId: '165489609859',
  appId:             '1:165489609859:web:7e935322c76428f4031fb6',
};

let db: ReturnType<typeof getFirestore> | null = null;

try {
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  db = getFirestore(app);
} catch (e) {
  console.warn('Firebase init failed:', e);
}

export { db };
export const isConfigured = true;
