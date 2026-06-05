import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  StyleSheet, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import { Colors, Radius } from '../../constants/theme';
import { SHOP_ITEMS, SHOP_CATEGORIES, ShopCategory, ShopItem } from '../../constants/shop';

async function openLink(url: string) {
  try {
    await WebBrowser.openBrowserAsync(url, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
      toolbarColor: '#0D1B3E',
    });
  } catch {
    Alert.alert('Could not open link');
  }
}

const BADGE_COLORS: Record<string, string> = {
  HOT:      '#ef4444',
  NEW:      '#3b82f6',
  SALE:     '#22c55e',
  OFFICIAL: '#f59e0b',
  RARE:     '#a855f7',
};

function ShopCard({ item }: { item: ShopItem }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => openLink(item.url)} activeOpacity={0.75}>
      {item.badge && (
        <View style={[styles.badge, { backgroundColor: BADGE_COLORS[item.badge] ?? Colors.blue }]}>
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      )}
      <Text style={styles.cardEmoji}>{item.emoji}</Text>
      <Text style={styles.cardName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardPrice}>{item.price}</Text>
          {item.originalPrice && (
            <Text style={styles.cardOriginal}>{item.originalPrice}</Text>
          )}
        </View>
        <View style={styles.shopBtn}>
          <Text style={styles.shopBtnText}>Shop →</Text>
        </View>
      </View>
      <Text style={styles.storeName}>{item.store}</Text>
    </TouchableOpacity>
  );
}

export default function ShopScreen() {
  const [category, setCategory] = useState<ShopCategory>('All');

  const filtered = category === 'All'
    ? SHOP_ITEMS
    : SHOP_ITEMS.filter(i => i.category === category);

  // Feature the first HOT or NEW item for the banner
  const featured = SHOP_ITEMS.find(i => i.badge === 'HOT') ?? SHOP_ITEMS[0];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.header}>Shop</Text>

        {/* Featured item banner */}
        <TouchableOpacity style={styles.featured} onPress={() => openLink(featured.url)} activeOpacity={0.85}>
          <View style={styles.featuredLeft}>
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredBadgeText}>⭐ FEATURED</Text>
            </View>
            <Text style={styles.featuredName}>{featured.name}</Text>
            <Text style={styles.featuredDesc} numberOfLines={2}>{featured.description}</Text>
            <View style={styles.featuredCta}>
              <Text style={styles.featuredPrice}>{featured.price}</Text>
              <View style={styles.featuredBtn}>
                <Text style={styles.featuredBtnText}>Shop Now</Text>
              </View>
            </View>
          </View>
          <Text style={styles.featuredEmoji}>{featured.emoji}</Text>
        </TouchableOpacity>

        {/* Category filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.catBar}
        >
          {SHOP_CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.catBtn, category === cat && styles.catBtnActive]}
              onPress={() => setCategory(cat)}
            >
              <Text style={[styles.catText, category === cat && styles.catTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Count */}
        <Text style={styles.countText}>{filtered.length} items</Text>

        {/* Product grid */}
        <View style={styles.grid}>
          {filtered.map(item => <ShopCard key={item.id} item={item} />)}
        </View>

        {/* Affiliate programs CTA */}
        <View style={styles.affiliateCard}>
          <Text style={styles.affiliateTitle}>💰 Earn with every sale</Text>
          <Text style={styles.affiliateDesc}>
            We partner with Fanatics, Adidas, FIFA Store and StubHub.
            Every purchase through this app earns us a small commission
            at no extra cost to you.
          </Text>
        </View>

        <Text style={styles.disclaimer}>
          Prices are approximate and may vary. Affiliate links may earn commission.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:    { flex: 1, backgroundColor: Colors.background },
  scroll:  { flex: 1 },
  content: { padding: 12, paddingBottom: 32 },
  header:  { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 12 },

  // Featured banner
  featured: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.lg,
    padding: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderBlue,
  },
  featuredLeft:      { flex: 1, gap: 6 },
  featuredBadge:     { alignSelf: 'flex-start', backgroundColor: Colors.goldDim, borderRadius: Radius.full, paddingHorizontal: 10, paddingVertical: 3 },
  featuredBadgeText: { color: Colors.gold, fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  featuredName:      { color: '#fff', fontSize: 16, fontWeight: '800' },
  featuredDesc:      { color: Colors.textSecondary, fontSize: 12, lineHeight: 17 },
  featuredCta:       { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 4 },
  featuredPrice:     { color: Colors.green, fontSize: 15, fontWeight: '800' },
  featuredBtn:       { backgroundColor: Colors.blue, borderRadius: Radius.sm, paddingHorizontal: 14, paddingVertical: 7 },
  featuredBtnText:   { color: '#fff', fontWeight: '700', fontSize: 13 },
  featuredEmoji:     { fontSize: 56, marginLeft: 10 },

  // Category bar
  catBar: { paddingVertical: 6, gap: 6, alignItems: 'center', flexDirection: 'row' },
  catBtn: {
    height: 32, paddingHorizontal: 16,
    borderRadius: Radius.full,
    borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  catBtnActive: { borderColor: Colors.blue, backgroundColor: Colors.blueDim },
  catText:      { fontSize: 13, color: Colors.textMuted },
  catTextActive: { color: Colors.blueLight, fontWeight: '600' },

  countText: { fontSize: 11, color: Colors.textMuted, marginTop: 8, marginBottom: 10 },

  // Grid
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  card: {
    width: '48.5%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  badge: {
    position: 'absolute', top: 10, right: 10,
    borderRadius: Radius.full,
    paddingHorizontal: 7, paddingVertical: 2,
  },
  badgeText:    { color: '#fff', fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
  cardEmoji:    { fontSize: 34, marginBottom: 8 },
  cardName:     { color: Colors.text, fontSize: 13, fontWeight: '700', marginBottom: 4, paddingRight: 36 },
  cardDesc:     { color: Colors.textSecondary, fontSize: 11, lineHeight: 16, marginBottom: 10 },
  cardFooter:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 6 },
  cardPrice:    { color: Colors.green, fontSize: 14, fontWeight: '800' },
  cardOriginal: { color: Colors.textMuted, fontSize: 11, textDecorationLine: 'line-through' },
  shopBtn:      { backgroundColor: Colors.blueDim, borderRadius: Radius.sm, paddingHorizontal: 10, paddingVertical: 5 },
  shopBtnText:  { color: Colors.blueLight, fontSize: 12, fontWeight: '600' },
  storeName:    { fontSize: 10, color: Colors.textMuted },

  // Affiliate info
  affiliateCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  affiliateTitle: { color: Colors.text, fontSize: 14, fontWeight: '700', marginBottom: 6 },
  affiliateDesc:  { color: Colors.textSecondary, fontSize: 12, lineHeight: 18 },

  disclaimer: { color: Colors.textMuted, fontSize: 10, textAlign: 'center', marginTop: 12, lineHeight: 16 },
});
