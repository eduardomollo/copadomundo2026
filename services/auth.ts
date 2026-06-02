/**
 * Anonymous Auth — users get a persistent ID on first launch, no sign-up needed.
 * They can optionally set a display name for the leaderboard.
 */

import { signInAnonymously, onAuthStateChanged, User, updateProfile } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, isConfigured } from './firebase';

const DISPLAY_NAME_KEY = 'user_display_name';

export async function ensureSignedIn(): Promise<User | null> {
  if (!isConfigured) return null;

  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      unsub();
      if (user) {
        resolve(user);
      } else {
        try {
          const cred = await signInAnonymously(auth);
          resolve(cred.user);
        } catch (e) {
          console.warn('Anonymous sign-in failed:', e);
          resolve(null);
        }
      }
    });
  });
}

export function getCurrentUser(): User | null {
  if (!isConfigured) return null;
  return auth.currentUser;
}

export async function setDisplayName(name: string): Promise<void> {
  await AsyncStorage.setItem(DISPLAY_NAME_KEY, name);
  const user = auth.currentUser;
  if (user) {
    await updateProfile(user, { displayName: name });
  }
}

export async function getDisplayName(): Promise<string> {
  const stored = await AsyncStorage.getItem(DISPLAY_NAME_KEY);
  if (stored) return stored;
  const user = auth.currentUser;
  if (user?.displayName) return user.displayName;
  // Generate a fun default name
  const adjectives = ['Swift', 'Bold', 'Sharp', 'Cool', 'Epic', 'Pro', 'Top'];
  const nouns = ['Striker', 'Keeper', 'Winger', 'Coach', 'Fan', 'Scout'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 99) + 1;
  return `${adj}${noun}${num}`;
}
