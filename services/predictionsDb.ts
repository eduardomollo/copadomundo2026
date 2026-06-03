/**
 * Predictions stored in Firestore.
 * Falls back to AsyncStorage when Firebase is not yet configured.
 *
 * Firestore schema:
 *
 *   users/{userId}
 *     displayName: string
 *     totalPoints: number
 *     predictionCount: number
 *     updatedAt: timestamp
 *
 *   predictions/{userId_matchId}
 *     userId: string
 *     matchId: number
 *     pick: 'home' | 'draw' | 'away'
 *     result?: 'home' | 'draw' | 'away'
 *     points: number
 *     createdAt: timestamp
 */

import {
  doc, setDoc, getDoc, getDocs, collection,
  query, orderBy, limit, serverTimestamp, onSnapshot,
  writeBatch,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from './firebase';

// db is null if Firebase failed to init — all functions fall back to local storage
const isConfigured = db !== null;

export type Prediction = {
  userId: string;
  matchId: number;
  pick: 'home' | 'draw' | 'away';
  result?: 'home' | 'draw' | 'away';
  points: number;
  createdAt?: any;
};

export type LeaderboardEntry = {
  userId: string;
  displayName: string;
  totalPoints: number;
  predictionCount: number;
  isCurrentUser?: boolean;
};

const LOCAL_KEY = 'wc2026_predictions_v2';

// ── LOCAL FALLBACK ────────────────────────────────────────────────────────────

async function getLocalPredictions(): Promise<Record<string, Prediction>> {
  const raw = await AsyncStorage.getItem(LOCAL_KEY);
  return raw ? JSON.parse(raw) : {};
}

async function saveLocalPrediction(pred: Prediction): Promise<void> {
  const all = await getLocalPredictions();
  all[`${pred.userId}_${pred.matchId}`] = pred;
  await AsyncStorage.setItem(LOCAL_KEY, JSON.stringify(all));
}

// ── FIRESTORE ─────────────────────────────────────────────────────────────────

export async function savePrediction(
  userId: string,
  displayName: string,
  matchId: number,
  pick: 'home' | 'draw' | 'away',
): Promise<void> {
  const pred: Prediction = { userId, matchId, pick, points: 0 };

  if (!isConfigured) {
    await saveLocalPrediction(pred);
    return;
  }

  const batch = writeBatch(db);

  // Save prediction
  const predRef = doc(db, 'predictions', `${userId}_${matchId}`);
  batch.set(predRef, {
    ...pred,
    createdAt: serverTimestamp(),
  }, { merge: true });

  // Upsert user profile (increment predictionCount)
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  const existing = userSnap.exists() ? userSnap.data() : { totalPoints: 0, predictionCount: 0 };
  const alreadyPicked = (await getDoc(predRef)).exists();

  batch.set(userRef, {
    displayName,
    totalPoints: existing.totalPoints ?? 0,
    predictionCount: alreadyPicked ? (existing.predictionCount ?? 0) : (existing.predictionCount ?? 0) + 1,
    updatedAt: serverTimestamp(),
  }, { merge: true });

  await batch.commit();
}

export async function getUserPredictions(userId: string): Promise<Prediction[]> {
  if (!isConfigured) {
    const all = await getLocalPredictions();
    return Object.values(all).filter(p => p.userId === userId);
  }

  const q = query(collection(db, 'predictions'));
  const snap = await getDocs(q);
  return snap.docs
    .map(d => d.data() as Prediction)
    .filter(p => p.userId === userId);
}

/**
 * Called when a match finishes. Resolves all predictions for that match
 * and adds 10 points to correct pickers.
 */
export async function resolveMatch(
  matchId: number,
  result: 'home' | 'draw' | 'away',
): Promise<void> {
  if (!isConfigured) return;

  const q = query(collection(db, 'predictions'));
  const snap = await getDocs(q);
  const relevant = snap.docs.filter(d => d.data().matchId === matchId && !d.data().result);

  const batch = writeBatch(db);

  for (const predDoc of relevant) {
    const pred = predDoc.data() as Prediction;
    const points = pred.pick === result ? 10 : 0;

    batch.update(predDoc.ref, { result, points });

    if (points > 0) {
      const userRef = doc(db, 'users', pred.userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        batch.update(userRef, {
          totalPoints: (userSnap.data().totalPoints ?? 0) + points,
        });
      }
    }
  }

  await batch.commit();
}

export function subscribeLeaderboard(
  callback: (entries: LeaderboardEntry[]) => void,
  currentUserId?: string,
): () => void {
  if (!isConfigured) {
    // Return mock leaderboard when not configured
    callback([
      { userId: '1', displayName: 'CarlosGOAT',   totalPoints: 340, predictionCount: 34 },
      { userId: '2', displayName: 'SoccerKing99',  totalPoints: 290, predictionCount: 29 },
      { userId: '3', displayName: 'MatchMaster',   totalPoints: 275, predictionCount: 28 },
      { userId: '4', displayName: 'FutbolFan',     totalPoints: 210, predictionCount: 21 },
      { userId: '5', displayName: 'GoalHunter',    totalPoints: 180, predictionCount: 18 },
    ].map(e => ({ ...e, isCurrentUser: e.userId === currentUserId })));
    return () => {};
  }

  const q = query(
    collection(db, 'users'),
    orderBy('totalPoints', 'desc'),
    limit(50),
  );

  return onSnapshot(q, (snap) => {
    const entries: LeaderboardEntry[] = snap.docs.map(d => ({
      userId: d.id,
      displayName: d.data().displayName ?? 'Anonymous',
      totalPoints: d.data().totalPoints ?? 0,
      predictionCount: d.data().predictionCount ?? 0,
      isCurrentUser: d.id === currentUserId,
    }));
    callback(entries);
  });
}
