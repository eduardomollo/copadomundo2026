/**
 * Firebase Setup
 *
 * HOW TO CREATE YOUR FIREBASE PROJECT (5 minutes):
 * 1. Go to https://console.firebase.google.com
 * 2. Click "Add project" → name it "copamundo2026" → Continue
 * 3. Disable Google Analytics (not needed) → Create project
 * 4. Click "Web" (</>) to add a web app → name it "copa-app" → Register app
 * 5. Copy the firebaseConfig object shown and paste the values below
 * 6. In the left sidebar → Build → Firestore Database → Create database
 *    → Start in "test mode" → Choose a region (us-central) → Enable
 * 7. In the left sidebar → Build → Authentication → Get started
 *    → Sign-in method → Anonymous → Enable → Save
 *
 * FIRESTORE SECURITY RULES (paste in Firestore → Rules tab):
 *
 *   rules_version = '2';
 *   service cloud.firestore {
 *     match /databases/{database}/documents {
 *       match /users/{userId} {
 *         allow read: if true;
 *         allow write: if request.auth != null && request.auth.uid == userId;
 *       }
 *       match /predictions/{predId} {
 *         allow read: if true;
 *         allow write: if request.auth != null
 *           && request.auth.uid == resource.data.userId;
 *         allow create: if request.auth != null
 *           && request.auth.uid == request.resource.data.userId;
 *       }
 *     }
 *   }
 */

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// ← Replace these with your Firebase project config
const firebaseConfig = {
  apiKey:            'AIzaSyCmjwFtru94JFC64b-tdxdUtJNcyZW3QsE',
  authDomain:        'copamundo2026-58a04.firebaseapp.com',
  projectId:         'copamundo2026-58a04',
  storageBucket:     'copamundo2026-58a04.firebasestorage.app',
  messagingSenderId: '165489609859',
  appId:             '1:165489609859:web:7e935322c76428f4031fb6',
  measurementId:     'G-7T7XR72T3R',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db   = getFirestore(app);
export const auth = getAuth(app);
export const isConfigured = firebaseConfig.apiKey !== 'YOUR_API_KEY';
