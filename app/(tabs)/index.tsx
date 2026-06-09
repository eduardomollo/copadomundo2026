import React, { useMemo } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius } from '../../constants/theme';
import { TOURNAMENT_FAVORITES } from '../../constants/data';
import { MatchCard } from '../../components/MatchCard';
import { useMatches } from '../../hooks/useMatches';

const TOURNAMENT_START = new Date('2026-06-11T17:00:00-06:00');

function useCountdown() {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const diff = Math.max(0, TOURNAMENT_START.getTime() - now.getTime());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const mins = Math.floor((diff % 3_600_000) / 60_000);
  const secs = Math.floor((diff % 60_000) / 1000);
  return { days, hours, mins, secs, started: diff === 0 };
}

export default function HomeScreen() {
  const { matches, liveMatches, upcomingMatches, loading, refresh, lastUpdated } = useMatches();
  const countdown = useCountdown();

  const featuredMatches = useMemo(() => {
    if (liveMatches.length > 0) return liveMatches.slice(0, 3);
    return upcomingMatches.slice(0, 3);
  }, [liveMatches, upcomingMatches]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={Colors.blue} />}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>⚽</Text>
          <Text style={styles.heroTitle}>World Cup 2026</Text>
          <Text style={styles.heroSub}>USA  ·  Canada  ·  Mexico</Text>

          {countdown.started ? (
            <View style={styles.liveNow}>
              <Text style={styles.liveNowText}>⚡ Tournament is LIVE</Text>
            </View>
          ) : (
            <View style={styles.countdownRow}>
              {[
                { val: countdown.days, label: 'days' },
                { val: countdown.hours, label: 'hrs' },
                { val: countdown.mins, label: 'min' },
                { val: countdown.secs, label: 'sec' },
              ].map(({ val, label }) => (
                <View key={label} style={styles.countdownUnit}>
                  <Text style={styles.countdownNum}>{String(val).padStart(2, '0')}</Text>
                  <Text style={styles.countdownLabel}>{label}</Text>
                </View>
              ))}
            </View>
          )}

          <Text style={styles.heroKickoff}>Kickoff Jun 11 · Mexico 🇲🇽 vs 🇿🇦 South Africa</Text>
        </View>

        {/* Quick stats */}
        <View style={styles.statsRow}>
          {[
            { n: '48', label: 'Teams' },
            { n: '104', label: 'Matches' },
            { n: '16', label: 'Venues' },
          ].map(({ n, label }) => (
            <View key={label} style={styles.statCard}>
              <Text style={styles.statNum}>{n}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Live / upcoming matches */}
        <Text style={styles.sectionTitle}>
          {liveMatches.length > 0 ? '⚡ Live Now' : '📅 Opening Matches'}
        </Text>
        {featuredMatches.map(m => <MatchCard key={m.id} match={m} />)}

        {lastUpdated && (
          <Text style={styles.updatedText}>
            Updated {lastUpdated.toLocaleTimeString()}
          </Text>
        )}

        {/* Favorites */}
        <Text style={styles.sectionTitle}>Tournament Favorites</Text>
        <View style={styles.favCard}>
          {TOURNAMENT_FAVORITES.map((fav, i) => (
            <View key={fav.team} style={[styles.favRow, i > 0 && styles.favBorder]}>
              <Text style={styles.favRank}>#{i + 1}</Text>
              <Text style={styles.favFlag}>{fav.flag}</Text>
              <Text style={styles.favTeam}>{fav.team}</Text>
              <Text style={styles.favGroup}>Grp {fav.group}</Text>
              <View style={styles.oddsBadge}>
                <Text style={styles.oddsText}>{fav.odds}</Text>
              </View>
            </View>
          ))}
          <Text style={styles.oddsDisclaimer}>Odds for entertainment only</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { padding: 12, paddingBottom: 24 },

  hero: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: 24,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderBlue,
  },
  heroEmoji: { fontSize: 48, marginBottom: 8 },
  heroTitle: { fontSize: 22, fontWeight: '800', color: '#fff', letterSpacing: -0.5 },
  heroSub: { fontSize: 13, color: Colors.textSecondary, marginTop: 4, marginBottom: 16 },

  countdownRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  countdownUnit: {
    alignItems: 'center',
    backgroundColor: Colors.blueDim,
    borderRadius: Radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 8,
    minWidth: 56,
  },
  countdownNum: { fontSize: 26, fontWeight: '800', color: Colors.blueLight },
  countdownLabel: { fontSize: 10, color: Colors.textMuted, marginTop: 2 },

  liveNow: {
    backgroundColor: Colors.red,
    borderRadius: Radius.full,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginBottom: 12,
  },
  liveNowText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  heroKickoff: { fontSize: 12, color: Colors.textMuted, textAlign: 'center' },

  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statNum: { fontSize: 22, fontWeight: '800', color: Colors.blueLight },
  statLabel: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
    marginTop: 4,
  },

  updatedText: {
    fontSize: 10,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: 12,
  },

  favCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  favRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  favBorder: { borderTopWidth: 1, borderTopColor: Colors.border },
  favRank: { color: Colors.textMuted, fontSize: 12, width: 20 },
  favFlag: { fontSize: 20 },
  favTeam: { flex: 1, color: Colors.text, fontSize: 14, fontWeight: '500' },
  favGroup: { color: Colors.textMuted, fontSize: 11 },
  oddsBadge: {
    backgroundColor: Colors.greenDim,
    borderRadius: Radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  oddsText: { color: Colors.green, fontSize: 13, fontWeight: '700' },
  oddsDisclaimer: {
    fontSize: 10,
    color: Colors.textMuted,
    textAlign: 'center',
    padding: 8,
  },
});
