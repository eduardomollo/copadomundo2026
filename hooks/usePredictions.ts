import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Prediction = 'home' | 'draw' | 'away';

export type PredictionRecord = {
  matchId: number;
  pick: Prediction;
  result?: Prediction;
  points?: number;
  createdAt: number;
};

const STORAGE_KEY = 'wc2026_predictions';
const FREE_LIMIT = 5;
const CORRECT_POINTS = 10;
const WRONG_POINTS = 0;

export function usePredictions(isPremium: boolean) {
  const [predictions, setPredictions] = useState<Record<number, PredictionRecord>>({});
  const [totalPoints, setTotalPoints] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(raw => {
      if (raw) {
        const data = JSON.parse(raw);
        setPredictions(data);
        const pts = Object.values(data as Record<number, PredictionRecord>)
          .reduce((acc, p) => acc + (p.points ?? 0), 0);
        setTotalPoints(pts);
      }
    });
  }, []);

  const canPredict = (matchId: number): { allowed: boolean; reason?: string } => {
    if (isPremium) return { allowed: true };
    if (predictions[matchId]) return { allowed: true }; // already picked, allow change
    const count = Object.keys(predictions).length;
    if (count >= FREE_LIMIT) {
      return { allowed: false, reason: `Free plan allows ${FREE_LIMIT} picks. Upgrade to Premium for unlimited.` };
    }
    return { allowed: true };
  };

  const makePrediction = async (matchId: number, pick: Prediction) => {
    const check = canPredict(matchId);
    if (!check.allowed) return { success: false, reason: check.reason };

    const updated = {
      ...predictions,
      [matchId]: {
        matchId,
        pick,
        createdAt: Date.now(),
      },
    };

    setPredictions(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return { success: true };
  };

  const resolvePrediction = async (matchId: number, actualResult: Prediction) => {
    const pred = predictions[matchId];
    if (!pred || pred.result) return;

    const points = pred.pick === actualResult ? CORRECT_POINTS : WRONG_POINTS;
    const updated = {
      ...predictions,
      [matchId]: { ...pred, result: actualResult, points },
    };

    setPredictions(updated);
    setTotalPoints(prev => prev + points);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const predictionCount = Object.keys(predictions).length;
  const correctCount = Object.values(predictions).filter(p => p.points && p.points > 0).length;

  return {
    predictions,
    totalPoints,
    predictionCount,
    correctCount,
    freeLimit: FREE_LIMIT,
    makePrediction,
    resolvePrediction,
    canPredict,
  };
}
