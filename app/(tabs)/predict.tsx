import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius } from '../../constants/theme';
import { MatchCard } from '../../components/MatchCard';
import { useMatches } from '../../hooks/useMatches';
import { usePredictions, Prediction } from '../../hooks/usePredictions';
import { checkPremiumStatus, purchasePremium, restorePurchases } from '../../services/purchases';

const MOCK_LEADERBOARD = [
  { name: 'CarlosGOAT', pts: 340, flag: '🇲🇽' },
  { name: 'SoccerKing99', pts: 290, flag: '🇧🇷' },
  { name: 'MatchMaster', pts: 275, flag: '🇦🇷' },
  { name: 'FutbolFan', pts: 210, flag: '🇪🇸' },
  { name: 'GoalHunter', pts: 180, flag: '🇩🇪' },
];

export default function PredictScreen() {
  const { upcomingMatches, loading, refresh } = useMatches();
  const [isPremium, setIsPremium] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const { predictions, totalPoints, predictionCount, correctCount, freeLimit, makePrediction, canPredict } =
    usePredictions(isPremium);

  useEffect(() => {
    checkPremiumStatus().then(setIsPremium);
  }, []);

  const handlePredict = async (matchId: number, pick: Prediction) => {
    const result = await makePrediction(matchId, pick);
    if (!result.success && result.reason) {
      Alert.alert('Upgrade to Premium', result.reason, [
        { text: 'Not now', style: 'cancel' },
        { text: 'Upgrade $4.99/mo', onPress: handlePurchase },
      ]);
    }
  };

  const handlePurchase = async () => {
    setPurchasing(true);
    try {
      const success = await purchasePremium();
      if (success) {
        setIsPremium(true);
        Alert.alert('🏆 Welcome to Premium!', 'Unlimited predictions unlocked.');
      }
    } catch (e: any) {
      Alert.alert('Purchase failed', e.message);
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

  const leaderboard = [
    { name: 'You', pts: totalPoints, flag: '⭐', isUser: true },
    ...MOCK_LEADERBOARD,
  ].sort((a, b) => b.pts - a.pts);

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
          {isPremium && (
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumBadgeText}>⭐ Premium</Text>
            </View>
          )}
        </View>

        {/* Free tier progress */}
        {!isPremium && (
          <View style={styles.freeProgress}>
            <View style={styles.freeProgressRow}>
              <Text style={styles.freeProgressText}>Free picks used: {predictionCount}/{freeLimit}</Text>
              <Text style={styles.freeProgressText}>{freeLimit - predictionCount} remaining</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${(predictionCount / freeLimit) * 100}%` }]} />
            </View>
          </View>
        )}

        {/* Premium upsell */}
        {!isPremium && (
          <View style={styles.upsellCard}>
            <Text style={styles.upsellEmoji}>🏆</Text>
            <Text style={styles.upsellTitle}>Go Premium</Text>
            <Text style={styles.upsellDesc}>
              Unlimited predictions · Expert tips before every match · Leaderboard prizes up to $500
            </Text>
            <View style={styles.prizeRow}>
              {['🥇 $500', '🥈 $200', '🥉 $100'].map(p => (
                <View key={p} style={styles.prizePill}>
                  <Text style={styles.prizePillText}>{p}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity
              style={styles.upgradeBtn}
              onPress={handlePurchase}
              disabled={purchasing}
            >
              <Text style={styles.upgradeBtnText}>
                {purchasing ? 'Processing...' : 'Upgrade — $4.99/month'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRestore}>
              <Text style={styles.restoreText}>Restore purchase</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Leaderboard */}
        <Text style={styles.sectionTitle}>Leaderboard</Text>
        <View style={styles.leaderboard}>
          {leaderboard.map((player, i) => (
            <View
              key={player.name}
              style={[styles.leaderRow, player.isUser && styles.leaderRowUser, i > 0 && styles.leaderBorder]}
            >
              <View style={[styles.rankBadge, i < 3 && styles.rankTop]}>
                <Text style={[styles.rankText, i < 3 && styles.rankTopText]}>{i + 1}</Text>
              </View>
              <Text style={styles.leaderFlag}>{player.flag}</Text>
              <Text style={[styles.leaderName, player.isUser && { fontWeight: '700' }]}>
                {player.name}
              </Text>
              <View style={styles.ptsBadge}>
                <Text style={styles.ptsBadgeText}>{player.pts} pts</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Picks */}
        <Text style={styles.sectionTitle}>Make Your Picks</Text>
        {upcomingMatches.slice(0, 15).map(m => (
          <MatchCard
            key={m.id}
            match={m}
            prediction={predictions[m.id]?.pick}
            onPredict={handlePredict}
            showPredictControls
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { padding: 12, paddingBottom: 24 },

  pointsBanner: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.25)',
  },
  pointsLabel: { color: Colors.textSecondary, fontSize: 12 },
  pointsNum: { color: Colors.gold, fontSize: 36, fontWeight: '800' },
  statsRight: { flex: 1, flexDirection: 'row', justifyContent: 'center', gap: 10 },
  statPill: {
    backgroundColor: Colors.background,
    borderRadius: Radius.sm,
    padding: 8,
    alignItems: 'center',
    minWidth: 48,
  },
  statPillNum: { color: '#fff', fontSize: 18, fontWeight: '800' },
  statPillLabel: { color: Colors.textMuted, fontSize: 10 },
  premiumBadge: {
    backgroundColor: Colors.goldDim,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  premiumBadgeText: { color: Colors.gold, fontSize: 11, fontWeight: '700' },

  freeProgress: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  freeProgressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  freeProgressText: { color: Colors.textSecondary, fontSize: 12 },
  progressBar: {
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.blue,
    borderRadius: 2,
  },

  upsellCard: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.md,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderBlue,
  },
  upsellEmoji: { fontSize: 32, marginBottom: 6 },
  upsellTitle: { fontSize: 18, fontWeight: '800', color: '#fff', marginBottom: 6 },
  upsellDesc: {
    color: Colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 14,
  },
  prizeRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  prizePill: {
    backgroundColor: Colors.background,
    borderRadius: Radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  prizePillText: { color: '#fff', fontSize: 12, fontWeight: '600' },
  upgradeBtn: {
    backgroundColor: Colors.gold,
    borderRadius: Radius.md,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  upgradeBtnText: { color: '#000', fontWeight: '700', fontSize: 15 },
  restoreText: { color: Colors.textMuted, fontSize: 12, marginTop: 4 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
    marginTop: 4,
  },

  leaderboard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  leaderBorder: { borderTopWidth: 1, borderTopColor: Colors.border },
  leaderRowUser: { backgroundColor: Colors.goldDim },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankTop: { backgroundColor: Colors.gold },
  rankText: { color: Colors.textMuted, fontSize: 12, fontWeight: '700' },
  rankTopText: { color: '#000' },
  leaderFlag: { fontSize: 20 },
  leaderName: { flex: 1, color: Colors.text, fontSize: 13 },
  ptsBadge: {
    backgroundColor: Colors.goldDim,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  ptsBadgeText: { color: Colors.gold, fontSize: 12, fontWeight: '700' },
});
