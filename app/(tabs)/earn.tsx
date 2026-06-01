import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import { Colors, Radius } from '../../constants/theme';
import { MERCHANDISE } from '../../constants/data';

async function openLink(url: string, title: string) {
  try {
    await WebBrowser.openBrowserAsync(url, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
    });
  } catch {
    Alert.alert('Could not open link', `Please visit ${url} directly.`);
  }
}

export default function EarnScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Shop & Earn</Text>

        {/* Premium prediction prizes — recap */}
        <View style={styles.heroCard}>
          <Text style={styles.heroEmoji}>🏆</Text>
          <Text style={styles.heroTitle}>Prediction Prizes</Text>
          <Text style={styles.heroDesc}>
            Top predictors win real prizes every round. Upgrade to Premium for unlimited picks,
            expert tips, and bonus point multipliers.
          </Text>
          <View style={styles.prizeRow}>
            {[
              { rank: '🥇', label: '1st place', prize: '$500' },
              { rank: '🥈', label: '2nd place', prize: '$200' },
              { rank: '🥉', label: '3rd place', prize: '$100' },
            ].map(p => (
              <View key={p.rank} style={styles.prizeCard}>
                <Text style={styles.prizeRank}>{p.rank}</Text>
                <Text style={styles.prizeLabel}>{p.label}</Text>
                <Text style={styles.prizeAmount}>{p.prize}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={() => Alert.alert('Premium', 'Go to the Predict tab to upgrade!')}
          >
            <Text style={styles.ctaBtnText}>Join Predictions →</Text>
          </TouchableOpacity>
        </View>

        {/* Official Merchandise */}
        <Text style={styles.sectionTitle}>Official Merchandise</Text>
        <Text style={styles.sectionSub}>
          Authentic gear from FIFA Store & Fanatics. Free shipping on orders over $75.
        </Text>

        <View style={styles.grid}>
          {MERCHANDISE.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.merch}
              onPress={() => openLink(item.url, item.name)}
              activeOpacity={0.75}
            >
              <Text style={styles.merchEmoji}>{item.emoji}</Text>
              <Text style={styles.merchName}>{item.name}</Text>
              <Text style={styles.merchDesc} numberOfLines={2}>{item.description}</Text>
              <View style={styles.merchFooter}>
                <Text style={styles.merchPrice}>{item.price}</Text>
                <View style={styles.shopBtn}>
                  <Text style={styles.shopBtnText}>Shop →</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* FIFA Store banner */}
        <TouchableOpacity
          style={styles.storeBanner}
          onPress={() => openLink('https://www.fifa.com/store', 'FIFA Store')}
          activeOpacity={0.8}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.storeBannerTitle}>⚽ FIFA Official Store</Text>
            <Text style={styles.storeBannerSub}>Browse all 2026 World Cup gear</Text>
          </View>
          <Text style={styles.storeBannerArrow}>→</Text>
        </TouchableOpacity>

        {/* Fanatics banner */}
        <TouchableOpacity
          style={[styles.storeBanner, { borderColor: 'rgba(239,68,68,0.3)' }]}
          onPress={() => openLink('https://www.fanatics.com/soccer', 'Fanatics')}
          activeOpacity={0.8}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.storeBannerTitle}>👕 Fanatics</Text>
            <Text style={styles.storeBannerSub}>National team jerseys & fan gear</Text>
          </View>
          <Text style={styles.storeBannerArrow}>→</Text>
        </TouchableOpacity>

        {/* Disclaimer */}
        <Text style={styles.disclaimer}>
          This app may earn affiliate commission when you purchase through links above.
          Prices shown are approximate and may vary.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  scroll: { flex: 1 },
  content: { padding: 12, paddingBottom: 32 },
  header: { fontSize: 20, fontWeight: '800', color: '#fff', marginBottom: 14 },

  heroCard: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.lg,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderBlue,
  },
  heroEmoji: { fontSize: 36, marginBottom: 8 },
  heroTitle: { fontSize: 18, fontWeight: '800', color: '#fff', marginBottom: 8 },
  heroDesc: {
    color: Colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  prizeRow: { flexDirection: 'row', gap: 8, marginBottom: 16, width: '100%' },
  prizeCard: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: Radius.sm,
    padding: 10,
    alignItems: 'center',
    gap: 4,
  },
  prizeRank: { fontSize: 20 },
  prizeLabel: { color: Colors.textMuted, fontSize: 10 },
  prizeAmount: { color: Colors.gold, fontSize: 15, fontWeight: '800' },
  ctaBtn: {
    backgroundColor: Colors.blue,
    borderRadius: Radius.md,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  ctaBtnText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  sectionTitle: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  sectionSub: { fontSize: 12, color: Colors.textSecondary, marginBottom: 12 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  merch: {
    width: '48.5%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  merchEmoji: { fontSize: 32, marginBottom: 8 },
  merchName: { color: Colors.text, fontSize: 13, fontWeight: '700', marginBottom: 4 },
  merchDesc: { color: Colors.textSecondary, fontSize: 11, lineHeight: 16, marginBottom: 10, flex: 1 },
  merchFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  merchPrice: { color: Colors.green, fontSize: 13, fontWeight: '700' },
  shopBtn: {
    backgroundColor: Colors.blueDim,
    borderRadius: Radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  shopBtnText: { color: Colors.blueLight, fontSize: 12, fontWeight: '600' },

  storeBanner: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderBlue,
  },
  storeBannerTitle: { color: Colors.text, fontSize: 14, fontWeight: '700' },
  storeBannerSub: { color: Colors.textSecondary, fontSize: 12, marginTop: 2 },
  storeBannerArrow: { color: Colors.blueLight, fontSize: 20, fontWeight: '700' },

  disclaimer: {
    color: Colors.textMuted,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 16,
  },
});
