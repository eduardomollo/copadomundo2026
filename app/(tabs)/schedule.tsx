import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Radius } from '../../constants/theme';
import { MatchCard } from '../../components/MatchCard';
import { useMatches } from '../../hooks/useMatches';

const STATUS_FILTERS = ['All', 'Live', 'Upcoming', 'Finished'] as const;
const GROUP_FILTERS = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

export default function ScheduleScreen() {
  const { matches, liveMatches, loading, refresh } = useMatches();
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [groupFilter, setGroupFilter] = useState<string>('All');

  const filtered = matches.filter(m => {
    const statusOk =
      statusFilter === 'All' ||
      (statusFilter === 'Live' && m.status === 'live') ||
      (statusFilter === 'Upcoming' && m.status === 'upcoming') ||
      (statusFilter === 'Finished' && m.status === 'finished');
    const groupOk = groupFilter === 'All' || m.group === groupFilter;
    return statusOk && groupOk;
  });

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Match Schedule</Text>
        {liveMatches.length > 0 && (
          <View style={styles.livePill}>
            <Text style={styles.livePillText}>⚡ {liveMatches.length} Live</Text>
          </View>
        )}
      </View>

      {/* Status filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterBar}
      >
        {STATUS_FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, statusFilter === f && styles.filterBtnActive]}
            onPress={() => setStatusFilter(f)}
          >
            <Text style={[styles.filterText, statusFilter === f && styles.filterTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Group filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterBar}
      >
        {GROUP_FILTERS.map(g => (
          <TouchableOpacity
            key={g}
            style={[styles.filterBtn, groupFilter === g && styles.filterBtnActive]}
            onPress={() => setGroupFilter(g)}
          >
            <Text style={[styles.filterText, groupFilter === g && styles.filterTextActive]}>
              {g === 'All' ? 'All Groups' : `Grp ${g}`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Matches */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={Colors.blue} />}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <Text style={styles.empty}>No matches found</Text>
        ) : (
          filtered.map(m => <MatchCard key={m.id} match={m} />)
        )}
        <Text style={styles.count}>{filtered.length} matches</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#fff' },
  livePill: {
    backgroundColor: Colors.red,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  livePillText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  filterBar: { paddingHorizontal: 12, paddingVertical: 8, gap: 6 },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterBtnActive: {
    borderColor: Colors.blue,
    backgroundColor: Colors.blueDim,
  },
  filterText: { fontSize: 12, color: Colors.textMuted },
  filterTextActive: { color: Colors.blueLight, fontWeight: '600' },
  scroll: { flex: 1 },
  content: { padding: 12, paddingBottom: 24 },
  empty: { color: Colors.textMuted, textAlign: 'center', marginTop: 40 },
  count: { color: Colors.textMuted, fontSize: 11, textAlign: 'center', marginTop: 8 },
});
