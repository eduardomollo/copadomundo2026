/**
 * Local user identity — no Firebase Auth needed.
 * Each user gets a UUID on first launch, stored in AsyncStorage.
 * This avoids native Firebase Auth crashes entirely.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_ID_KEY    = 'wc2026_user_id';
const DISPLAY_NAME_KEY = 'wc2026_display_name';

function generateId(): string {
  return 'user_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function randomName(): string {
  const adj  = ['Swift','Bold','Sharp','Cool','Epic','Pro','Top','Fast'];
  const noun = ['Striker','Keeper','Winger','Coach','Fan','Scout','Hawk'];
  return adj[Math.floor(Math.random() * adj.length)] +
    noun[Math.floor(Math.random() * noun.length)] +
    Math.floor(Math.random() * 99 + 1);
}

export async function ensureSignedIn(): Promise<{ uid: string } | null> {
  try {
    let uid = await AsyncStorage.getItem(USER_ID_KEY);
    if (!uid) {
      uid = generateId();
      await AsyncStorage.setItem(USER_ID_KEY, uid);
    }
    return { uid };
  } catch {
    return null;
  }
}

export async function getUserId(): Promise<string> {
  try {
    let uid = await AsyncStorage.getItem(USER_ID_KEY);
    if (!uid) {
      uid = generateId();
      await AsyncStorage.setItem(USER_ID_KEY, uid);
    }
    return uid;
  } catch {
    return 'local_' + Math.random().toString(36).slice(2);
  }
}

export async function getDisplayName(): Promise<string> {
  try {
    const stored = await AsyncStorage.getItem(DISPLAY_NAME_KEY);
    if (stored) return stored;
    const name = randomName();
    await AsyncStorage.setItem(DISPLAY_NAME_KEY, name);
    return name;
  } catch {
    return randomName();
  }
}

export async function setDisplayName(name: string): Promise<void> {
  await AsyncStorage.setItem(DISPLAY_NAME_KEY, name);
}
