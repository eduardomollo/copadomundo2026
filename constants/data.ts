// ── WORLD CUP 2026 DATA ─────────────────────────────────────────────────────

export type Team = {
  name: string;
  flag: string;
  group: string;
};

export type GroupStanding = {
  team: string;
  flag: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
};

export type Match = {
  id: number;
  group: string;
  date: string;
  time: string;
  home: string;
  homeflag: string;
  away: string;
  awayflag: string;
  venue: string;
  city: string;
  status: 'upcoming' | 'live' | 'finished';
  homeScore?: number;
  awayScore?: number;
  minute?: number;
  apiFixtureId?: number; // maps to API-Football fixture ID
};

export const FLAGS: Record<string, string> = {
  Mexico: '🇲🇽', 'South Africa': '🇿🇦', 'South Korea': '🇰🇷', Czechia: '🇨🇿',
  Canada: '🇨🇦', 'Bosnia-Herzegovina': '🇧🇦', Qatar: '🇶🇦', Switzerland: '🇨🇭',
  Brazil: '🇧🇷', Morocco: '🇲🇦', Haiti: '🇭🇹', Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'United States': '🇺🇸', Paraguay: '🇵🇾', Australia: '🇦🇺', Türkiye: '🇹🇷',
  Germany: '🇩🇪', 'Curaçao': '🇨🇼', 'Ivory Coast': '🇨🇮', Ecuador: '🇪🇨',
  Netherlands: '🇳🇱', Japan: '🇯🇵', Sweden: '🇸🇪', Tunisia: '🇹🇳',
  Belgium: '🇧🇪', Egypt: '🇪🇬', Iran: '🇮🇷', 'New Zealand': '🇳🇿',
  Spain: '🇪🇸', 'Cape Verde': '🇨🇻', 'Saudi Arabia': '🇸🇦', Uruguay: '🇺🇾',
  France: '🇫🇷', Senegal: '🇸🇳', Iraq: '🇮🇶', Norway: '🇳🇴',
  Argentina: '🇦🇷', Algeria: '🇩🇿', Austria: '🇦🇹', Jordan: '🇯🇴',
  Portugal: '🇵🇹', 'Congo DR': '🇨🇩', Uzbekistan: '🇺🇿', Colombia: '🇨🇴',
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', Croatia: '🇭🇷', Ghana: '🇬🇭', Panama: '🇵🇦',
};

export const GROUPS: Record<string, string[]> = {
  A: ['Mexico', 'South Africa', 'South Korea', 'Czechia'],
  B: ['Canada', 'Bosnia-Herzegovina', 'Qatar', 'Switzerland'],
  C: ['Brazil', 'Morocco', 'Haiti', 'Scotland'],
  D: ['United States', 'Paraguay', 'Australia', 'Türkiye'],
  E: ['Germany', 'Curaçao', 'Ivory Coast', 'Ecuador'],
  F: ['Netherlands', 'Japan', 'Sweden', 'Tunisia'],
  G: ['Belgium', 'Egypt', 'Iran', 'New Zealand'],
  H: ['Spain', 'Cape Verde', 'Saudi Arabia', 'Uruguay'],
  I: ['France', 'Senegal', 'Iraq', 'Norway'],
  J: ['Argentina', 'Algeria', 'Austria', 'Jordan'],
  K: ['Portugal', 'Congo DR', 'Uzbekistan', 'Colombia'],
  L: ['England', 'Croatia', 'Ghana', 'Panama'],
};

export const STATIC_MATCHES: Match[] = [
  // Group A
  { id: 1, group: 'A', date: 'Jun 11', time: '5:00 PM', home: 'Mexico', homeflag: '🇲🇽', away: 'South Africa', awayflag: '🇿🇦', venue: 'Estadio Azteca', city: 'Mexico City', status: 'upcoming' },
  { id: 2, group: 'A', date: 'Jun 12', time: '3:00 PM', home: 'South Korea', homeflag: '🇰🇷', away: 'Czechia', awayflag: '🇨🇿', venue: 'SoFi Stadium', city: 'Los Angeles', status: 'upcoming' },
  { id: 3, group: 'A', date: 'Jun 16', time: '6:00 PM', home: 'Mexico', homeflag: '🇲🇽', away: 'Czechia', awayflag: '🇨🇿', venue: 'Estadio Azteca', city: 'Mexico City', status: 'upcoming' },
  { id: 4, group: 'A', date: 'Jun 16', time: '9:00 PM', home: 'South Africa', homeflag: '🇿🇦', away: 'South Korea', awayflag: '🇰🇷', venue: 'MetLife Stadium', city: 'New York', status: 'upcoming' },
  { id: 5, group: 'A', date: 'Jun 21', time: '6:00 PM', home: 'Mexico', homeflag: '🇲🇽', away: 'South Korea', awayflag: '🇰🇷', venue: 'AT&T Stadium', city: 'Dallas', status: 'upcoming' },
  { id: 6, group: 'A', date: 'Jun 21', time: '6:00 PM', home: 'Czechia', homeflag: '🇨🇿', away: 'South Africa', awayflag: '🇿🇦', venue: "Levi's Stadium", city: 'San Francisco', status: 'upcoming' },
  // Group B
  { id: 7, group: 'B', date: 'Jun 12', time: '6:00 PM', home: 'Canada', homeflag: '🇨🇦', away: 'Bosnia-Herzegovina', awayflag: '🇧🇦', venue: 'BC Place', city: 'Vancouver', status: 'upcoming' },
  { id: 8, group: 'B', date: 'Jun 12', time: '9:00 PM', home: 'Switzerland', homeflag: '🇨🇭', away: 'Qatar', awayflag: '🇶🇦', venue: 'Rose Bowl', city: 'Los Angeles', status: 'upcoming' },
  { id: 9, group: 'B', date: 'Jun 17', time: '3:00 PM', home: 'Canada', homeflag: '🇨🇦', away: 'Qatar', awayflag: '🇶🇦', venue: 'BC Place', city: 'Vancouver', status: 'upcoming' },
  { id: 10, group: 'B', date: 'Jun 17', time: '6:00 PM', home: 'Bosnia-Herzegovina', homeflag: '🇧🇦', away: 'Switzerland', awayflag: '🇨🇭', venue: 'MetLife Stadium', city: 'New York', status: 'upcoming' },
  { id: 11, group: 'B', date: 'Jun 22', time: '6:00 PM', home: 'Canada', homeflag: '🇨🇦', away: 'Switzerland', awayflag: '🇨🇭', venue: 'BC Place', city: 'Vancouver', status: 'upcoming' },
  { id: 12, group: 'B', date: 'Jun 22', time: '6:00 PM', home: 'Bosnia-Herzegovina', homeflag: '🇧🇦', away: 'Qatar', awayflag: '🇶🇦', venue: 'Rose Bowl', city: 'Los Angeles', status: 'upcoming' },
  // Group C
  { id: 13, group: 'C', date: 'Jun 13', time: '6:00 PM', home: 'Brazil', homeflag: '🇧🇷', away: 'Morocco', awayflag: '🇲🇦', venue: 'MetLife Stadium', city: 'New York', status: 'upcoming' },
  { id: 14, group: 'C', date: 'Jun 13', time: '9:00 PM', home: 'Scotland', homeflag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', away: 'Haiti', awayflag: '🇭🇹', venue: 'Rose Bowl', city: 'Los Angeles', status: 'upcoming' },
  { id: 15, group: 'C', date: 'Jun 18', time: '3:00 PM', home: 'Brazil', homeflag: '🇧🇷', away: 'Haiti', awayflag: '🇭🇹', venue: 'AT&T Stadium', city: 'Dallas', status: 'upcoming' },
  { id: 16, group: 'C', date: 'Jun 18', time: '6:00 PM', home: 'Morocco', homeflag: '🇲🇦', away: 'Scotland', awayflag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', venue: "Levi's Stadium", city: 'San Francisco', status: 'upcoming' },
  { id: 17, group: 'C', date: 'Jun 23', time: '6:00 PM', home: 'Brazil', homeflag: '🇧🇷', away: 'Scotland', awayflag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', venue: 'MetLife Stadium', city: 'New York', status: 'upcoming' },
  { id: 18, group: 'C', date: 'Jun 23', time: '6:00 PM', home: 'Morocco', homeflag: '🇲🇦', away: 'Haiti', awayflag: '🇭🇹', venue: 'Hard Rock Stadium', city: 'Miami', status: 'upcoming' },
  // Group D
  { id: 19, group: 'D', date: 'Jun 12', time: '6:00 PM', home: 'United States', homeflag: '🇺🇸', away: 'Paraguay', awayflag: '🇵🇾', venue: 'SoFi Stadium', city: 'Los Angeles', status: 'upcoming' },
  { id: 20, group: 'D', date: 'Jun 13', time: '3:00 PM', home: 'Australia', homeflag: '🇦🇺', away: 'Türkiye', awayflag: '🇹🇷', venue: 'AT&T Stadium', city: 'Dallas', status: 'upcoming' },
  { id: 21, group: 'D', date: 'Jun 17', time: '9:00 PM', home: 'United States', homeflag: '🇺🇸', away: 'Australia', awayflag: '🇦🇺', venue: 'SoFi Stadium', city: 'Los Angeles', status: 'upcoming' },
  { id: 22, group: 'D', date: 'Jun 18', time: '9:00 PM', home: 'Paraguay', homeflag: '🇵🇾', away: 'Türkiye', awayflag: '🇹🇷', venue: 'MetLife Stadium', city: 'New York', status: 'upcoming' },
  { id: 23, group: 'D', date: 'Jun 22', time: '9:00 PM', home: 'United States', homeflag: '🇺🇸', away: 'Türkiye', awayflag: '🇹🇷', venue: 'Gillette Stadium', city: 'Boston', status: 'upcoming' },
  { id: 24, group: 'D', date: 'Jun 22', time: '9:00 PM', home: 'Australia', homeflag: '🇦🇺', away: 'Paraguay', awayflag: '🇵🇾', venue: 'Hard Rock Stadium', city: 'Miami', status: 'upcoming' },
  // Group E
  { id: 25, group: 'E', date: 'Jun 14', time: '3:00 PM', home: 'Germany', homeflag: '🇩🇪', away: 'Curaçao', awayflag: '🇨🇼', venue: 'Gillette Stadium', city: 'Boston', status: 'upcoming' },
  { id: 26, group: 'E', date: 'Jun 14', time: '6:00 PM', home: 'Ecuador', homeflag: '🇪🇨', away: 'Ivory Coast', awayflag: '🇨🇮', venue: "Levi's Stadium", city: 'San Francisco', status: 'upcoming' },
  // Group F
  { id: 27, group: 'F', date: 'Jun 14', time: '9:00 PM', home: 'Netherlands', homeflag: '🇳🇱', away: 'Tunisia', awayflag: '🇹🇳', venue: 'Hard Rock Stadium', city: 'Miami', status: 'upcoming' },
  { id: 28, group: 'F', date: 'Jun 15', time: '3:00 PM', home: 'Japan', homeflag: '🇯🇵', away: 'Sweden', awayflag: '🇸🇪', venue: 'Rose Bowl', city: 'Los Angeles', status: 'upcoming' },
  // Group G
  { id: 29, group: 'G', date: 'Jun 15', time: '6:00 PM', home: 'Belgium', homeflag: '🇧🇪', away: 'Egypt', awayflag: '🇪🇬', venue: 'MetLife Stadium', city: 'New York', status: 'upcoming' },
  { id: 30, group: 'G', date: 'Jun 15', time: '9:00 PM', home: 'Iran', homeflag: '🇮🇷', away: 'New Zealand', awayflag: '🇳🇿', venue: 'SoFi Stadium', city: 'Los Angeles', status: 'upcoming' },
  // Group H
  { id: 31, group: 'H', date: 'Jun 15', time: '3:00 PM', home: 'Spain', homeflag: '🇪🇸', away: 'Cape Verde', awayflag: '🇨🇻', venue: 'AT&T Stadium', city: 'Dallas', status: 'upcoming' },
  { id: 32, group: 'H', date: 'Jun 16', time: '12:00 PM', home: 'Uruguay', homeflag: '🇺🇾', away: 'Saudi Arabia', awayflag: '🇸🇦', venue: 'Hard Rock Stadium', city: 'Miami', status: 'upcoming' },
  // Group I
  { id: 33, group: 'I', date: 'Jun 16', time: '3:00 PM', home: 'France', homeflag: '🇫🇷', away: 'Iraq', awayflag: '🇮🇶', venue: 'MetLife Stadium', city: 'New York', status: 'upcoming' },
  { id: 34, group: 'I', date: 'Jun 16', time: '6:00 PM', home: 'Norway', homeflag: '🇳🇴', away: 'Senegal', awayflag: '🇸🇳', venue: 'Gillette Stadium', city: 'Boston', status: 'upcoming' },
  // Group J
  { id: 35, group: 'J', date: 'Jun 17', time: '9:00 PM', home: 'Argentina', homeflag: '🇦🇷', away: 'Algeria', awayflag: '🇩🇿', venue: 'Rose Bowl', city: 'Los Angeles', status: 'upcoming' },
  { id: 36, group: 'J', date: 'Jun 18', time: '3:00 PM', home: 'Austria', homeflag: '🇦🇹', away: 'Jordan', awayflag: '🇯🇴', venue: 'Hard Rock Stadium', city: 'Miami', status: 'upcoming' },
  // Group K
  { id: 37, group: 'K', date: 'Jun 18', time: '6:00 PM', home: 'Portugal', homeflag: '🇵🇹', away: 'Uzbekistan', awayflag: '🇺🇿', venue: "Levi's Stadium", city: 'San Francisco', status: 'upcoming' },
  { id: 38, group: 'K', date: 'Jun 18', time: '9:00 PM', home: 'Colombia', homeflag: '🇨🇴', away: 'Congo DR', awayflag: '🇨🇩', venue: 'SoFi Stadium', city: 'Los Angeles', status: 'upcoming' },
  // Group L
  { id: 39, group: 'L', date: 'Jun 19', time: '6:00 PM', home: 'England', homeflag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', away: 'Panama', awayflag: '🇵🇦', venue: 'MetLife Stadium', city: 'New York', status: 'upcoming' },
  { id: 40, group: 'L', date: 'Jun 19', time: '9:00 PM', home: 'Croatia', homeflag: '🇭🇷', away: 'Ghana', awayflag: '🇬🇭', venue: 'AT&T Stadium', city: 'Dallas', status: 'upcoming' },
];

export const TOURNAMENT_FAVORITES = [
  { team: 'Brazil', flag: '🇧🇷', odds: '5/1', group: 'C' },
  { team: 'France', flag: '🇫🇷', odds: '6/1', group: 'I' },
  { team: 'Argentina', flag: '🇦🇷', odds: '7/1', group: 'J' },
  { team: 'Spain', flag: '🇪🇸', odds: '7/1', group: 'H' },
  { team: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', odds: '8/1', group: 'L' },
  { team: 'Germany', flag: '🇩🇪', odds: '9/1', group: 'E' },
  { team: 'Portugal', flag: '🇵🇹', odds: '10/1', group: 'K' },
];

// ── AFFILIATE LINKS ──────────────────────────────────────────────────────────
// Replace these URLs with your personal affiliate tracking links once approved:
//   Fanatics: https://www.fanatics.com/affiliate  (8-12% commission)
//   FIFA Store via Awin: https://www.awin.com → search "FIFA" (5-8%)
// The UTM params below help track traffic even before you have affiliate links.

export const MERCHANDISE = [
  {
    id: 'ball',
    name: 'Official Match Ball',
    price: '$149',
    emoji: '⚽',
    description: 'Adidas official 2026 World Cup match ball',
    url: 'https://www.adidas.com/us/soccer-world-cup?utm_source=copamundo2026&utm_medium=app',
    commission: '8%',
  },
  {
    id: 'jersey',
    name: 'Team Jerseys',
    price: 'From $89',
    emoji: '👕',
    description: 'Official national team jerseys — all 48 teams',
    url: 'https://www.fanatics.com/soccer/national-teams?utm_source=copamundo2026&utm_medium=app',
    commission: '10%',
  },
  {
    id: 'tickets',
    name: 'Match Tickets',
    price: 'From $299',
    emoji: '🎟️',
    description: 'Group stage to final — all 16 venues',
    url: 'https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/tickets?utm_source=copamundo2026',
    commission: '5%',
  },
  {
    id: 'bundle',
    name: 'Fan Bundle',
    price: '$59',
    emoji: '🎁',
    description: 'Scarf + flag + cap — official 2026 gear',
    url: 'https://www.fanatics.com/soccer/world-cup?utm_source=copamundo2026&utm_medium=app',
    commission: '12%',
  },
];
