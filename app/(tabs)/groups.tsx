import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/theme';
import { GroupTable } from '../../components/GroupTable';
import { fetchStandings, GroupTeamStat } from '../../services/api';
import { GROUPS } from '../../constants/data';

export default function GroupsScreen() {
  const [standings, setStandings] = useState<Record<string, GroupTeamStat[]>>({});
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    setRefreshing(true);
    const data = await fetchStandings();
    setStandings(data);
    setRefreshing(false);
  };

  useEffect(() => { load(); }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={load} tintColor={Colors.blue} />}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Group Stage</Text>
        <Text style={styles.sub}>Top 2 from each group + best 8 third-place teams advance</Text>

        {Object.keys(GROUPS).map(letter => (
          <GroupTable
            key={letter}
            letter={letter}
            liveStats={standings[letter]}
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
  header: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 4 },
  sub: { fontSize: 12, color: Colors.textSecondary, marginBottom: 14 },
});
