import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FLAGS, GROUPS } from '../constants/data';
import { GroupTeamStat } from '../services/api';
import { Colors, Radius, Font } from '../constants/theme';

type Props = {
  letter: string;
  liveStats?: GroupTeamStat[];
};

const QUAL_COLOR = (pos: number) =>
  pos < 2 ? Colors.green : pos === 2 ? Colors.gold : Colors.textMuted + '40';

export function GroupTable({ letter, liveStats }: Props) {
  const teamNames = GROUPS[letter] ?? [];

  const rows = liveStats?.length
    ? liveStats
    : teamNames.map(name => ({
        team: name,
        played: 0, won: 0, drawn: 0, lost: 0,
        gf: 0, ga: 0, gd: 0, points: 0,
      }));

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Group {letter}</Text>

      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, { flex: 1, textAlign: 'left' }]}>Team</Text>
        {['P', 'W', 'D', 'L', 'GD', 'Pts'].map(h => (
          <Text key={h} style={styles.headerCell}>{h}</Text>
        ))}
      </View>

      {/* Rows */}
      {rows.map((row, i) => (
        <View key={row.team} style={styles.row}>
          <View style={styles.teamCell}>
            <View style={[styles.qualBar, { backgroundColor: QUAL_COLOR(i) }]} />
            <Text style={styles.flag}>{FLAGS[row.team] ?? '🏳'}</Text>
            <Text style={styles.teamName} numberOfLines={1}>{row.team}</Text>
          </View>
          <Text style={styles.cell}>{row.played}</Text>
          <Text style={styles.cell}>{row.won}</Text>
          <Text style={styles.cell}>{row.drawn}</Text>
          <Text style={styles.cell}>{row.lost}</Text>
          <Text style={styles.cell}>{row.gd > 0 ? `+${row.gd}` : row.gd}</Text>
          <Text style={[styles.cell, styles.pts]}>{row.points}</Text>
        </View>
      ))}

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.green }]} />
          <Text style={styles.legendText}>Advance to R32</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: Colors.gold }]} />
          <Text style={styles.legendText}>Best 3rd place</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    color: Colors.blueLight,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 4,
  },
  headerCell: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    width: 28,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border + '50',
  },
  teamCell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  qualBar: {
    width: 3,
    height: 20,
    borderRadius: 2,
  },
  flag: {
    fontSize: 16,
  },
  teamName: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  cell: {
    color: Colors.textSecondary,
    fontSize: 12,
    width: 28,
    textAlign: 'center',
  },
  pts: {
    color: '#fff',
    fontWeight: '700',
  },
  legend: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  legendText: {
    color: Colors.textMuted,
    fontSize: 10,
  },
});
