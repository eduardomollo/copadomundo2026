import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Match } from '../constants/data';
import { Colors, Radius, Font } from '../constants/theme';
import { Prediction } from '../hooks/usePredictions';

type Props = {
  match: Match;
  prediction?: Prediction;
  onPredict?: (matchId: number, pick: Prediction) => void;
  showPredictControls?: boolean;
};

function localDateTime(match: Match): { date: string; time: string } {
  if (match.utcDate) {
    const d = new Date(match.utcDate);
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };
  }
  return { date: match.date, time: match.time };
}

export function MatchCard({ match, prediction, onPredict, showPredictControls }: Props) {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';
  const showScore = isLive || isFinished;
  const { date: localDate, time: localTime } = localDateTime(match);

  return (
    <View style={styles.card}>
      {/* Header row */}
      <View style={styles.headerRow}>
        <View style={styles.groupBadge}>
          <Text style={styles.groupText}>Group {match.group}</Text>
        </View>
        {isLive && (
          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>⚡ LIVE {match.minute ? `${match.minute}'` : ''}</Text>
          </View>
        )}
        {isFinished && (
          <Text style={styles.finishedText}>FT</Text>
        )}
      </View>

      {/* Teams row */}
      <View style={styles.teamsRow}>
        {/* Home */}
        <View style={styles.teamSide}>
          <Text style={styles.flagLarge}>{match.homeflag}</Text>
          <Text style={styles.teamName} numberOfLines={1}>{match.home}</Text>
        </View>

        {/* Score / VS */}
        <View style={styles.scoreBox}>
          {showScore ? (
            <Text style={styles.scoreText}>
              {match.homeScore ?? 0} – {match.awayScore ?? 0}
            </Text>
          ) : (
            <Text style={styles.vsText}>vs</Text>
          )}
        </View>

        {/* Away */}
        <View style={[styles.teamSide, styles.teamRight]}>
          <Text style={styles.flagLarge}>{match.awayflag}</Text>
          <Text style={[styles.teamName, { textAlign: 'right' }]} numberOfLines={1}>{match.away}</Text>
        </View>
      </View>

      {/* Meta */}
      <View style={styles.meta}>
        <Text style={styles.metaText}>📅 {localDate}  ·  {localTime}</Text>
        <Text style={styles.metaText}>📍 {match.venue}</Text>
      </View>

      {/* Prediction controls */}
      {showPredictControls && match.status === 'upcoming' && onPredict && (
        <View style={styles.predictSection}>
          <Text style={styles.predictLabel}>Your pick:</Text>
          <View style={styles.pickRow}>
            <PickButton
              label={`${match.homeflag} ${match.home.split(' ')[0]}`}
              selected={prediction === 'home'}
              color={Colors.blue}
              onPress={() => onPredict(match.id, 'home')}
            />
            <PickButton
              label="Draw"
              selected={prediction === 'draw'}
              color={Colors.gold}
              onPress={() => onPredict(match.id, 'draw')}
            />
            <PickButton
              label={`${match.awayflag} ${match.away.split(' ')[0]}`}
              selected={prediction === 'away'}
              color={Colors.red}
              onPress={() => onPredict(match.id, 'away')}
            />
          </View>
        </View>
      )}
    </View>
  );
}

type PickButtonProps = {
  label: string;
  selected: boolean;
  color: string;
  onPress: () => void;
};

function PickButton({ label, selected, color, onPress }: PickButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.pickBtn,
        selected && { borderColor: color, backgroundColor: color + '25' },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.pickBtnText, selected && { color: '#fff', fontWeight: '600' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  groupBadge: {
    backgroundColor: Colors.blueDim,
    borderRadius: Radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  groupText: {
    color: Colors.blueLight,
    fontSize: 11,
    fontWeight: '600',
  },
  liveBadge: {
    backgroundColor: Colors.red,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  liveText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  finishedText: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  teamsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teamSide: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 4,
  },
  teamRight: {
    alignItems: 'flex-end',
  },
  flagLarge: {
    fontSize: 28,
  },
  teamName: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: '600',
  },
  scoreBox: {
    backgroundColor: Colors.background,
    borderRadius: Radius.sm,
    paddingHorizontal: 14,
    paddingVertical: 6,
    minWidth: 72,
    alignItems: 'center',
  },
  scoreText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
  },
  vsText: {
    color: Colors.textMuted,
    fontSize: 16,
    fontWeight: '600',
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  metaText: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  predictSection: {
    marginTop: 12,
  },
  predictLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginBottom: 8,
  },
  pickRow: {
    flexDirection: 'row',
    gap: 6,
  },
  pickBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  pickBtnText: {
    color: Colors.textMuted,
    fontSize: 12,
  },
});
