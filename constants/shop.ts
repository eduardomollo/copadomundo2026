/**
 * SHOP AFFILIATE LINKS
 *
 * HOW TO GET AFFILIATE LINKS (do this before launch):
 *
 * 1. FANATICS (jerseys, fan gear) — 8–12% commission
 *    Apply: https://www.fanatics.com/affiliate
 *    Once approved, replace FANATICS_BASE with your tracking link
 *
 * 2. ADIDAS (official balls, boots) — 7–10% commission
 *    Apply via Impact: https://www.adidas.com/us/affiliate-program
 *    Once approved, replace ADIDAS_BASE with your tracking link
 *
 * 3. FIFA STORE via Awin — 5–8% commission
 *    Apply: https://www.awin.com → search "FIFA"
 *    Once approved, replace FIFA_BASE with your tracking link
 *
 * 4. STUBHUB / SEATGEEK (tickets) — $5–15 per referral
 *    StubHub affiliate: https://www.stubhub.com/affiliates
 *    SeatGeek affiliate: https://seatgeek.com/publishers
 *
 * ESTIMATED MONTHLY REVENUE (100 daily active users):
 *   Jerseys ($89 avg, 2% CVR):  100 users × 2% × $89 × 10% = ~$18/day = ~$540/mo
 *   Tickets ($299 avg, 1% CVR): 100 users × 1% × $299 × 7% = ~$21/day = ~$630/mo
 */

// ── AFFILIATE BASE URLS ─────────────────────────────────────────────────────
// Replace these with your actual affiliate tracking links once approved.
// Until then, they point to the regular store pages.

const FANATICS_BASE = 'https://www.fanatics.com/soccer/world-cup';
// → Replace with: 'https://fanatics.93n6tx.net/YOUR_TRACKING_ID'

const ADIDAS_BASE   = 'https://www.adidas.com/us/soccer';
// → Replace with: 'https://adidas.pxf.io/YOUR_TRACKING_ID'

const FIFA_BASE     = 'https://store.fifa.com/en/';
// → Replace with your Awin deeplink

const STUBHUB_BASE  = 'https://www.stubhub.com/world-cup-2026-tickets';
// → Replace with: 'https://www.stubhub.com/?YOURAFFID=...'

// UTM params help track even before you have official affiliate links
const utmFanatics = '?utm_source=copamundo2026&utm_medium=app&utm_campaign=worldcup';
const utmAdidas   = '?utm_source=copamundo2026&utm_medium=app&utm_campaign=worldcup';

// ── CATEGORIES ───────────────────────────────────────────────────────────────

export type ShopCategory = 'All' | 'Jerseys' | 'Tickets' | 'Balls' | 'Accessories' | 'Gifts';

export type ShopItem = {
  id: string;
  category: ShopCategory;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  emoji: string;
  badge?: string;   // e.g. "NEW", "SALE", "HOT"
  url: string;
  store: string;
  commission: string;
};

export const SHOP_ITEMS: ShopItem[] = [
  // ── JERSEYS ───────────────────────────────────────────────────────────────
  {
    id: 'jersey_usa',
    category: 'Jerseys',
    name: 'USA Home Jersey',
    description: 'Official Nike USA 2026 home kit',
    price: '$89',
    emoji: '🇺🇸',
    badge: 'HOT',
    url: `${FANATICS_BASE}/national-teams/usa${utmFanatics}`,
    store: 'Fanatics',
    commission: '10%',
  },
  {
    id: 'jersey_brazil',
    category: 'Jerseys',
    name: 'Brazil Home Jersey',
    description: 'Official Nike Seleção 2026 home kit',
    price: '$89',
    emoji: '🇧🇷',
    badge: 'HOT',
    url: `${FANATICS_BASE}/national-teams/brazil${utmFanatics}`,
    store: 'Fanatics',
    commission: '10%',
  },
  {
    id: 'jersey_argentina',
    category: 'Jerseys',
    name: 'Argentina Home Jersey',
    description: 'Official Adidas Argentina 2026 — defending champions',
    price: '$94',
    emoji: '🇦🇷',
    url: `${ADIDAS_BASE}/argentina${utmAdidas}`,
    store: 'Adidas',
    commission: '8%',
  },
  {
    id: 'jersey_england',
    category: 'Jerseys',
    name: 'England Home Jersey',
    description: 'Official Nike England 2026 — Three Lions',
    price: '$89',
    emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    url: `${FANATICS_BASE}/national-teams/england${utmFanatics}`,
    store: 'Fanatics',
    commission: '10%',
  },
  {
    id: 'jersey_mexico',
    category: 'Jerseys',
    name: 'Mexico Home Jersey',
    description: 'Official Adidas El Tri 2026 — host nation',
    price: '$89',
    emoji: '🇲🇽',
    url: `${ADIDAS_BASE}/mexico${utmAdidas}`,
    store: 'Adidas',
    commission: '8%',
  },
  {
    id: 'jersey_france',
    category: 'Jerseys',
    name: 'France Home Jersey',
    description: 'Official Nike Les Bleus 2026 tournament jersey',
    price: '$94',
    emoji: '🇫🇷',
    url: `${FANATICS_BASE}/national-teams/france${utmFanatics}`,
    store: 'Fanatics',
    commission: '10%',
  },

  // ── TICKETS ───────────────────────────────────────────────────────────────
  {
    id: 'tickets_group',
    category: 'Tickets',
    name: 'Group Stage Tickets',
    description: 'Any group stage match — all 16 venues across USA, Canada & Mexico',
    price: 'From $120',
    emoji: '🎟️',
    badge: 'NEW',
    url: STUBHUB_BASE,
    store: 'StubHub',
    commission: '$10 referral',
  },
  {
    id: 'tickets_final',
    category: 'Tickets',
    name: 'Final — MetLife Stadium',
    description: 'FIFA World Cup 2026 Final · July 19 · East Rutherford, NJ',
    price: 'From $1,200',
    emoji: '🏆',
    badge: 'RARE',
    url: STUBHUB_BASE,
    store: 'StubHub',
    commission: '$15 referral',
  },
  {
    id: 'tickets_sf',
    category: 'Tickets',
    name: 'Semifinal Tickets',
    description: 'July 14–15 · AT&T Stadium (Dallas) or MetLife (NY)',
    price: 'From $400',
    emoji: '⭐',
    url: STUBHUB_BASE,
    store: 'StubHub',
    commission: '$15 referral',
  },

  // ── BALLS ─────────────────────────────────────────────────────────────────
  {
    id: 'ball_match',
    category: 'Balls',
    name: 'Official Match Ball',
    description: 'Adidas 2026 World Cup Pro match ball — same ball used in games',
    price: '$165',
    emoji: '⚽',
    badge: 'OFFICIAL',
    url: `${ADIDAS_BASE}/world-cup-ball${utmAdidas}`,
    store: 'Adidas',
    commission: '8%',
  },
  {
    id: 'ball_replica',
    category: 'Balls',
    name: 'Replica Ball',
    description: 'Adidas 2026 World Cup replica — official design, training weight',
    price: '$40',
    originalPrice: '$55',
    emoji: '⚽',
    badge: 'SALE',
    url: `${ADIDAS_BASE}/world-cup-ball${utmAdidas}`,
    store: 'Adidas',
    commission: '8%',
  },

  // ── ACCESSORIES ───────────────────────────────────────────────────────────
  {
    id: 'scarf',
    category: 'Accessories',
    name: 'World Cup Scarf',
    description: 'Official 2026 FIFA World Cup woven jacquard scarf',
    price: '$28',
    emoji: '🧣',
    url: `${FIFA_BASE}scarves`,
    store: 'FIFA Store',
    commission: '6%',
  },
  {
    id: 'cap',
    category: 'Accessories',
    name: 'Tournament Cap',
    description: 'Adjustable snapback — official 2026 emblem',
    price: '$32',
    emoji: '🧢',
    url: `${FIFA_BASE}hats`,
    store: 'FIFA Store',
    commission: '6%',
  },
  {
    id: 'bag',
    category: 'Accessories',
    name: 'Sports Backpack',
    description: 'Adidas tiro backpack with 2026 branding — 30L',
    price: '$45',
    emoji: '🎒',
    url: `${ADIDAS_BASE}/bags${utmAdidas}`,
    store: 'Adidas',
    commission: '8%',
  },

  // ── GIFTS ─────────────────────────────────────────────────────────────────
  {
    id: 'bundle_fan',
    category: 'Gifts',
    name: 'Fan Bundle',
    description: 'Scarf + cap + pennant + wristband — ready to gift',
    price: '$65',
    originalPrice: '$85',
    emoji: '🎁',
    badge: 'SALE',
    url: `${FIFA_BASE}gift-sets`,
    store: 'FIFA Store',
    commission: '6%',
  },
  {
    id: 'poster',
    category: 'Gifts',
    name: 'Official Poster',
    description: 'Limited edition 2026 World Cup tournament poster — 24×36"',
    price: '$22',
    emoji: '🖼️',
    url: `${FIFA_BASE}posters`,
    store: 'FIFA Store',
    commission: '6%',
  },
];

export const SHOP_CATEGORIES: ShopCategory[] = ['All', 'Jerseys', 'Tickets', 'Balls', 'Accessories', 'Gifts'];
