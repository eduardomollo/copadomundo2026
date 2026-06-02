import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert,
  StyleSheet, RefreshControl, TextInput, Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius } from '../../constants/theme';
import { MatchCard } from '../../components/MatchCard';
import { useMatches } from '../../hooks/useMatches';
import { checkPremiumStatus, purchasePremium, restorePurchases } from '../../services/purchases';
import { ensureSignedIn, getDisplayName, setDisplayName } from '../../services/auth';
import {
  savePrediction, getUserPredictions, subscribeLeaderboard,
  Prediction, LeaderboardEntry,
} from '../../services/predictionsDb';
import { isConfigured } from '../../services/firebase';

const FREE_LIMIT = 5;

export default function PredictScreen() {
  const { upcomingMatches, loading, refresh } = useMatches();

  const [userId, setUserId]             = useState<string | null>(null);
  const [displayName, setName]          = useState('');
  const [isPremium, setIsPremium]       = useState(false);
  const [purchasing, setPurchasing]     = useState(false);
  const [predictions, setPredictions]   = useState<Record<number, Prediction>>({});
  const [leaderboard, setLeaderboard]   = useState<LeaderboardEntry[]>([]);
  const [totalPoints, setTotalPoints]   = useState(0);
  const [showNameModal, setShowNameModal] = useState(false);
  const [nameInput, setNameInput]       = useState('');
  const unsubRef = useRef<() => void>(() => {});

  // ── Init ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const user = await ensureSignedIn();
      const uid  = user?.uid ?? 'local_user';
      setUserId(uid);

      const name = await getDisplayName();
      setName(name);

      const premium = await checkPremiumStatus();
      setIsPremium(premium);

      // Load existing predictions
      const preds = await getUserPredictions(uid);
      const map: Record<number, Prediction> = {};
      let pts = 0;
      for (const p of preds) {
        map[p.matchId] = p;
        pts += p.points ?? 0;
      }
      setPredictions(map);
      setTotalPoints(pts);

      // Subscribe to leaderboard
      unsubRef.current = subscribeLeaderboard((entries) => {
        setLeaderboard(entries);
      }, uid);
    })();
    return () => unsubRef.current?.();
  }, []);

  // ── Prediction count ─────────────────────────────────────────────────────
  const predictionCount = Object.keys(predictions).length;
  const correctCount    = Object.values(predictions).filter(p => p.points > 0).length;

  // ── Make pick ────────────────────────────────────────────────────────────
  const handlePredict = useCallback(async (matchId: number, pick: 'home' | 'draw' | 'away') => {
    if (!userId) return;

    if (!isPremium && !predictions[matchId] && predictionCount >= FREE_LIMIT) {
      Alert.alert(
        '🏆 Upgrade to Premium',
        `Free plan allows ${FREE_LIMIT} predictions. Upgrade for unlimited picks + leaderboard prizes.`,
        [
          { text: 'Not now', style: 'cancel' },
          { text: 'Upgrade $4.99/mo', onPress: handlePurchase },
        ],
      );
      return;
    }

    try {
      await savePrediction(userId, displayName, matchId, pick);
      setPredictions(prev => ({
        ...prev,
        [matchId]: { userId, matchId, pick, points: 0 },
      }));
    } catch (e) {
      Alert.alert('Error', 'Could not save prediction. Please try again.');
    }
  }, [userId, displayName, isPremium, predictions, predictionCount]);

  // ── Purchase ─────────────────────────────────────────────────────────────
  const handlePurchase = async () => {
    setPurchasing(true);
    try {
      const success = await purchasePremium();
      if (success) {
        setIsPremium(true);
        Alert.alert('🏆 Welcome to Premium!', 'Unlimited predictions unlocked.');
      }
    } catch (e: any) {
      Alert.alert('Purchase failed', e.message ?? 'Please try again.');
    } finally {
      setPurchasing(false);
    }
  };

  const handleRestore = async () => {
    const restored = await restorePurchases();
    if (restored) {
      setIsPremium(true);
      Alert.alert('Restored!', 'Your Premium subscription is active.');
    } else {
      Alert.alert('Nothing to restore', 'No active subscription found.');
    }
  };

  const handleSetName = async () => {
    if (!nameInput.trim()) return;
    await setDisplayName(nameInput.trim());
    setName(nameInput.trim());
    setShowNameModal(false);
  };

  // ── Sort leaderboard with current user always visible ────────────────────
  const sortedBoard = [...leaderboard].sort((a, b) => b.totalPoints - a.totalPoints);
  const myEntry = sortedBoard.find(e => e.isCurrentUser);
  const myRank  = sortedBoard.findIndex(e => e.isCurrentUser) + 1;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={Colors.blue} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Points banner */}
        <View style={styles.pointsBanner}>
          <View>
            <Text style={styles.pointsLabel}>Your Points</Text>
            <Text style={styles.pointsNum}>{totalPoints}</Text>
          </View>
          <View style={styles.statsRight}>
            <View style={styles.statPill}>
              <Text style={styles.statPillNum}>{predictionCount}</Text>
              <Text style={styles.statPillLabel}>picks</Text>
            </View>
            <View style={styles.statPill}>
              <Text style={styles.statPillNum}>{correctCount}</Text>
              <Text style={styles.statPillLabel}>correct</Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end', gap: 6 }}>
            {isPremium && (
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumBadgeText}>⭐ Premium</Text>
              </View>
            )}
            <TouchableOpacity onPress={() => { setNameInput(displayName); setShowNameModal(true); }}>
              <Text style={styles.nameBtn}>✏️ {displayName || 'Set name'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Free limit bar */}
        {!isPremium && (
          <View style={styles.freeBar}>
            <View style={styles.freeBarRow}>
              <Text style={styles.freeBarText}>Free picks: {predictionCount}/{FREE_LIMIT}</Text>
              <Text style={styles.freeBarText}>{Math.max(0, FREE_LIMIT - predictionCount)} left</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${Math.min(100, (predictionCount / FREE_LIMIT) * 100)}%` }]} />
            </View>
          </View>
        )}

        {/* Premium upsell */}
        {!isPremium && (
          <View style={styles.upsellCard}>
            <Text style={styles.upsellEmoji}>🏆</Text>
            <Text style={styles.upsellTitle}>Go Premium</Text>
            <Text style={styles.upsellDesc}>
              Unlimited predictions · Expert pre-match tips · Real leaderboard prizes up to $500
            </Text>
            <View style={styles.prizeRow}>
              {['🥇 $500', '🥈 $200', '🥉 $100'].map(p => (
                <View key={p} style={styles.prizePill}>
                  <Text style={styles.prizePillText}>{p}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.upgradeBtn} onPress={handlePurchase} disabled={purchasing}>
              <Text style={styles.upgradeBtnText}>
                {purchasing ? 'Processing…' : 'Upgrade — $4.99/month'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRestore}>
              <Text style={styles.restoreText}>Restore purchase</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Leaderboard */}
        <Text style={styles.sectionTitle}>
          🌍 Global Leaderboard {!isConfigured && '(preview)'}
        </Text>
        <View style={styles.leaderboard}>
          {sortedBoard.slice(0, 10).map((player, i) => (
            <View
              key={player.userId}
              style={[styles.leaderRow, player.isCurrentUser && styles.leaderRowMe, i > 0 && styles.leaderBorder]}
            >
              <View style={[styles.rankBadge, i < 3 && styles.rankTop]}>
                <Text style={[styles.rankText, i < 3 && styles.rankTopText]}>{i + 1}</Text>
              </View>
              <Text style={styles.leaderName} numberOfLines={1}>
                {player.displayName}{player.isCurrentUser ? ' 👤' : ''}
              </Text>
              <Text style={styles.leaderPicks}>{player.predictionCount} picks</Text>
              <View style={styles.ptsBadge}>
                <Text style={styles.ptsBadgeText}>{player.totalPoints} pts</Text>
              </View>
            </View>
          ))}
          {/* Show current user if outside top 10 */}
          {myEntry && myRank > 10 && (
            <View style={[styles.leaderRow, styles.leaderRowMe, styles.leaderBorder]}>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>{myRank}</Text>
              </View>
              <Text style={styles.leaderName}>{myEntry.displayName} 👤</Text>
              <Text style={styles.leaderPicks}>{myEntry.predictionCount} picks</Text>
              <View style={styles.ptsBadge}>
                <Text style={styles.ptsBadgeText}>{myEntry.totalPoints} pts</Text>
              </View>
            </View>
          )}
        </View>

        {/* Match picks */}
        <Text style={styles.sectionTitle}>Make Your Picks</Text>
        {upcomingMatches.slice(0, 20).map(m => (
          <MatchCard
            key={m.id}
            match={m}
            prediction={predictions[m.id]?.pick}
            onPredict={handlePredict}
            showPredictControls
          />
        ))}
      </ScrollView>

      {/* Display name modal */}
      <Modal visible={showNameModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Your leaderboard name</Text>
            <TextInput
              style={styles.nameInput}
              value={nameInput}
              onChangeText={setNameInput}
              placeholder="Enter your name"
              placeholderTextColor={Colors.textMuted}
              maxLength={20}
              autoFocus
            />
            <TouchableOpacity style={styles.modalBtn} onPress={handleSetName}>
              <Text style={styles.modalBtnText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowNameModal(false)}>
              <Text style={styles.restoreText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { padding: 12, paddingBottom: 24 },

  pointsBanner: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md, padding: 16,
    flexDirection: 'row', alignItems: 'center',
    marginBottom: 10, borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.25)',
  },
  pointsLabel: { color: Colors.textSecondary, fontSize: 12 },
  pointsNum:   { color: Colors.gold, fontSize: 36, fontWeight: '800' },
  statsRight:  { flex: 1, flexDirection: 'row', justifyContent: 'center', gap: 10 },
  statPill: {
    backgroundColor: Colors.background, borderRadius: Radius.sm,
    padding: 8, alignItems: 'center', minWidth: 48,
  },
  statPillNum:   { color: '#fff', fontSize: 18, fontWeight: '800' },
  statPillLabel: { color: Colors.textMuted, fontSize: 10 },
  premiumBadge: {
    backgroundColor: Colors.goldDim, borderRadius: Radius.full,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  premiumBadgeText: { color: Colors.gold, fontSize: 11, fontWeight: '700' },
  nameBtn: { color: Colors.blueLight, fontSize: 12 },

  freeBar: {
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    padding: 12, marginBottom: 10,
    borderWidth: 1, borderColor: Colors.border,
  },
  freeBarRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  freeBarText: { color: Colors.textSecondary, fontSize: 12 },
  progressTrack: {
    height: 4, backgroundColor: Colors.border,
    borderRadius: 2, overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: Colors.blue, borderRadius: 2 },

  upsellCard: {
    backgroundColor: Colors.surfaceAlt, borderRadius: Radius.md,
    padding: 20, marginBottom: 16, alignItems: 'center',
    borderWidth: 1, borderColor: Colors.borderBlue,
  },
  upsellEmoji: { fontSize: 32, marginBottom: 6 },
  upsellTitle: { fontSize: 18, fontWeight: '800', color: '#fff', marginBottom: 6 },
  upsellDesc: {
    color: Colors.textSecondary, fontSize: 13,
    textAlign: 'center', lineHeight: 20, marginBottom: 14,
  },
  prizeRow:   { flexDirection: 'row', gap: 8, marginBottom: 16 },
  prizePill:  {
    flex: 1, backgroundColor: Colors.background,
    borderRadius: Radius.sm, padding: 8, alignItems: 'center',
  },
  prizePillText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  upgradeBtn: {
    backgroundColor: Colors.gold, borderRadius: Radius.md,
    paddingVertical: 14, paddingHorizontal: 24,
    width: '100%', alignItems: 'center', marginBottom: 8,
  },
  upgradeBtnText: { color: '#000', fontWeight: '700', fontSize: 15 },
  restoreText:    { color: Colors.textMuted, fontSize: 12, marginTop: 4 },

  sectionTitle: {
    fontSize: 16, fontWeight: '700',
    color: Colors.text, marginBottom: 10, marginTop: 4,
  },
  leaderboard: {
    backgroundColor: Colors.surface, borderRadius: Radius.md,
    marginBottom: 16, borderWidth: 1, borderColor: Colors.border,
    overflow: 'hidden',
  },
  leaderRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 12, gap: 10,
  },
  leaderBorder: { borderTopWidth: 1, borderTopColor: Colors.border },
  leaderRowMe:  { backgroundColor: Colors.goldDim },
  rankBadge: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: Colors.background,
    alignItems: 'center', justifyContent: 'center',
  },
  rankTop:     { backgroundColor: Colors.gold },
  rankText:    { color: Colors.textMuted, fontSize: 12, fontWeight: '700' },
  rankTopText: { color: '#000' },
  leaderName:  { flex: 1, color: Colors.text, fontSize: 13, fontWeight: '500' },
  leaderPicks: { color: Colors.textMuted, fontSize: 11 },
  ptsBadge: {
    backgroundColor: Colors.goldDim, borderRadius: Radius.full,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  ptsBadgeText: { color: Colors.gold, fontSize: 12, fontWeight: '700' },

  // Name modal
  modalOverlay: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center', justifyContent: 'center',
  },
  modalCard: {
    backgroundColor: Colors.surface, borderRadius: Radius.lg,
    padding: 24, width: '80%', alignItems: 'center',
    borderWidth: 1, borderColor: Colors.border,
  },
  modalTitle: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 16 },
  nameInput: {
    backgroundColor: Colors.background, color: '#fff',
    borderRadius: Radius.sm, padding: 12, width: '100%',
    fontSize: 16, marginBottom: 16,
    borderWidth: 1, borderColor: Colors.border,
  },
  modalBtn: {
    backgroundColor: Colors.blue, borderRadius: Radius.md,
    paddingVertical: 12, paddingHorizontal: 32,
    marginBottom: 12,
  },
  modalBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
