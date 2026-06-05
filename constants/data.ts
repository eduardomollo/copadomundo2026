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
  date: string;       // display fallback e.g. "Jun 11"
  time: string;       // display fallback e.g. "1:00 PM"
  utcDate?: string;   // ISO UTC string — used for user-local time display
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
  apiFixtureId?: number;
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

// utcDate is the source of truth for timezone-correct display.
// date/time are venue-local fallbacks only.
export const STATIC_MATCHES: Match[] = [
  // ── GROUP STAGE ─────────────────────────────────────────────────────────────
  // GROUP A
  { id: 1,  utcDate: '2026-06-11T19:00:00Z',  group: 'A', date: 'Jun 11', time: '1:00 PM',  home: 'Mexico',       homeflag: '🇲🇽', away: 'South Africa', awayflag: '🇿🇦', venue: 'Estadio Azteca',           city: 'Mexico City',    status: 'upcoming' },
  { id: 2,  utcDate: '2026-06-12T02:00:00Z',  group: 'A', date: 'Jun 11', time: '8:00 PM',  home: 'South Korea',  homeflag: '🇰🇷', away: 'Czechia',      awayflag: '🇨🇿', venue: 'Estadio Akron',            city: 'Guadalajara',    status: 'upcoming' },
  { id: 25,  utcDate: '2026-06-18T16:00:00Z', group: 'A', date: 'Jun 18', time: '12:00 PM', home: 'Czechia',      homeflag: '🇨🇿', away: 'South Africa', awayflag: '🇿🇦', venue: 'Mercedes-Benz Stadium',    city: 'Atlanta',        status: 'upcoming' },
  { id: 28,  utcDate: '2026-06-19T01:00:00Z', group: 'A', date: 'Jun 18', time: '7:00 PM',  home: 'Mexico',       homeflag: '🇲🇽', away: 'South Korea',  awayflag: '🇰🇷', venue: 'Estadio Akron',            city: 'Guadalajara',    status: 'upcoming' },
  { id: 53,  utcDate: '2026-06-25T01:00:00Z', group: 'A', date: 'Jun 24', time: '7:00 PM',  home: 'Czechia',      homeflag: '🇨🇿', away: 'Mexico',       awayflag: '🇲🇽', venue: 'Estadio Azteca',           city: 'Mexico City',    status: 'upcoming' },
  { id: 54,  utcDate: '2026-06-25T01:00:00Z', group: 'A', date: 'Jun 24', time: '7:00 PM',  home: 'South Africa', homeflag: '🇿🇦', away: 'South Korea',  awayflag: '🇰🇷', venue: 'Estadio BBVA',             city: 'Monterrey',      status: 'upcoming' },
  // GROUP B
  { id: 3,  utcDate: '2026-06-12T19:00:00Z',  group: 'B', date: 'Jun 12', time: '3:00 PM',  home: 'Canada',            homeflag: '🇨🇦', away: 'Bosnia-Herzegovina', awayflag: '🇧🇦', venue: 'BMO Field',          city: 'Toronto',        status: 'upcoming' },
  { id: 8,  utcDate: '2026-06-13T19:00:00Z',  group: 'B', date: 'Jun 13', time: '12:00 PM', home: 'Qatar',             homeflag: '🇶🇦', away: 'Switzerland',        awayflag: '🇨🇭', venue: "Levi's Stadium",     city: 'San Francisco',  status: 'upcoming' },
  { id: 26,  utcDate: '2026-06-18T19:00:00Z', group: 'B', date: 'Jun 18', time: '12:00 PM', home: 'Switzerland',       homeflag: '🇨🇭', away: 'Bosnia-Herzegovina', awayflag: '🇧🇦', venue: 'SoFi Stadium',       city: 'Los Angeles',    status: 'upcoming' },
  { id: 27,  utcDate: '2026-06-18T22:00:00Z', group: 'B', date: 'Jun 18', time: '3:00 PM',  home: 'Canada',            homeflag: '🇨🇦', away: 'Qatar',              awayflag: '🇶🇦', venue: 'BC Place',           city: 'Vancouver',      status: 'upcoming' },
  { id: 51,  utcDate: '2026-06-24T19:00:00Z', group: 'B', date: 'Jun 24', time: '12:00 PM', home: 'Switzerland',       homeflag: '🇨🇭', away: 'Canada',             awayflag: '🇨🇦', venue: 'BC Place',           city: 'Vancouver',      status: 'upcoming' },
  { id: 52,  utcDate: '2026-06-24T19:00:00Z', group: 'B', date: 'Jun 24', time: '12:00 PM', home: 'Bosnia-Herzegovina',homeflag: '🇧🇦', away: 'Qatar',              awayflag: '🇶🇦', venue: 'Lumen Field',        city: 'Seattle',        status: 'upcoming' },
  // GROUP C
  { id: 7,  utcDate: '2026-06-13T22:00:00Z',  group: 'C', date: 'Jun 13', time: '6:00 PM',  home: 'Brazil',   homeflag: '🇧🇷', away: 'Morocco',  awayflag: '🇲🇦', venue: 'MetLife Stadium',          city: 'New York',       status: 'upcoming' },
  { id: 5,  utcDate: '2026-06-14T01:00:00Z',  group: 'C', date: 'Jun 13', time: '9:00 PM',  home: 'Haiti',    homeflag: '🇭🇹', away: 'Scotland', awayflag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', venue: 'Gillette Stadium',         city: 'Boston',         status: 'upcoming' },
  { id: 29,  utcDate: '2026-06-20T01:00:00Z', group: 'C', date: 'Jun 19', time: '9:00 PM',  home: 'Brazil',   homeflag: '🇧🇷', away: 'Haiti',    awayflag: '🇭🇹', venue: 'Lincoln Financial Field',  city: 'Philadelphia',   status: 'upcoming' },
  { id: 30,  utcDate: '2026-06-19T22:00:00Z', group: 'C', date: 'Jun 19', time: '6:00 PM',  home: 'Scotland', homeflag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', away: 'Morocco',  awayflag: '🇲🇦', venue: 'Gillette Stadium',         city: 'Boston',         status: 'upcoming' },
  { id: 49,  utcDate: '2026-06-24T22:00:00Z', group: 'C', date: 'Jun 24', time: '6:00 PM',  home: 'Scotland', homeflag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', away: 'Brazil',   awayflag: '🇧🇷', venue: 'Hard Rock Stadium',        city: 'Miami',          status: 'upcoming' },
  { id: 50,  utcDate: '2026-06-24T22:00:00Z', group: 'C', date: 'Jun 24', time: '6:00 PM',  home: 'Morocco',  homeflag: '🇲🇦', away: 'Haiti',    awayflag: '🇭🇹', venue: 'Mercedes-Benz Stadium',    city: 'Atlanta',        status: 'upcoming' },
  // GROUP D
  { id: 4,  utcDate: '2026-06-13T01:00:00Z',  group: 'D', date: 'Jun 12', time: '6:00 PM',  home: 'United States', homeflag: '🇺🇸', away: 'Paraguay', awayflag: '🇵🇾', venue: 'SoFi Stadium',       city: 'Los Angeles',    status: 'upcoming' },
  { id: 6,  utcDate: '2026-06-14T04:00:00Z',  group: 'D', date: 'Jun 13', time: '9:00 PM',  home: 'Australia',     homeflag: '🇦🇺', away: 'Türkiye',  awayflag: '🇹🇷', venue: 'BC Place',           city: 'Vancouver',      status: 'upcoming' },
  { id: 31,  utcDate: '2026-06-19T19:00:00Z', group: 'D', date: 'Jun 19', time: '12:00 PM', home: 'United States', homeflag: '🇺🇸', away: 'Australia',awayflag: '🇦🇺', venue: 'Lumen Field',        city: 'Seattle',        status: 'upcoming' },
  { id: 32,  utcDate: '2026-06-20T03:00:00Z', group: 'D', date: 'Jun 19', time: '8:00 PM',  home: 'Türkiye',       homeflag: '🇹🇷', away: 'Paraguay', awayflag: '🇵🇾', venue: "Levi's Stadium",     city: 'San Francisco',  status: 'upcoming' },
  { id: 59,  utcDate: '2026-06-26T02:00:00Z', group: 'D', date: 'Jun 25', time: '7:00 PM',  home: 'Türkiye',       homeflag: '🇹🇷', away: 'United States',awayflag:'🇺🇸',venue: 'SoFi Stadium',      city: 'Los Angeles',    status: 'upcoming' },
  { id: 60,  utcDate: '2026-06-26T02:00:00Z', group: 'D', date: 'Jun 25', time: '7:00 PM',  home: 'Paraguay',      homeflag: '🇵🇾', away: 'Australia', awayflag: '🇦🇺', venue: "Levi's Stadium",    city: 'San Francisco',  status: 'upcoming' },
  // GROUP E
  { id: 10,  utcDate: '2026-06-14T17:00:00Z', group: 'E', date: 'Jun 14', time: '12:00 PM', home: 'Germany',      homeflag: '🇩🇪', away: 'Curaçao',     awayflag: '🇨🇼', venue: 'NRG Stadium',              city: 'Houston',        status: 'upcoming' },
  { id: 9,  utcDate: '2026-06-14T23:00:00Z',  group: 'E', date: 'Jun 14', time: '7:00 PM',  home: 'Ivory Coast',  homeflag: '🇨🇮', away: 'Ecuador',     awayflag: '🇪🇨', venue: 'Lincoln Financial Field',  city: 'Philadelphia',   status: 'upcoming' },
  { id: 33,  utcDate: '2026-06-20T20:00:00Z', group: 'E', date: 'Jun 20', time: '4:00 PM',  home: 'Germany',      homeflag: '🇩🇪', away: 'Ivory Coast', awayflag: '🇨🇮', venue: 'BMO Field',                city: 'Toronto',        status: 'upcoming' },
  { id: 34,  utcDate: '2026-06-21T00:00:00Z', group: 'E', date: 'Jun 20', time: '7:00 PM',  home: 'Ecuador',      homeflag: '🇪🇨', away: 'Curaçao',     awayflag: '🇨🇼', venue: 'Arrowhead Stadium',        city: 'Kansas City',    status: 'upcoming' },
  { id: 55,  utcDate: '2026-06-25T20:00:00Z', group: 'E', date: 'Jun 25', time: '4:00 PM',  home: 'Curaçao',      homeflag: '🇨🇼', away: 'Ivory Coast', awayflag: '🇨🇮', venue: 'Lincoln Financial Field',  city: 'Philadelphia',   status: 'upcoming' },
  { id: 56,  utcDate: '2026-06-25T20:00:00Z', group: 'E', date: 'Jun 25', time: '4:00 PM',  home: 'Ecuador',      homeflag: '🇪🇨', away: 'Germany',     awayflag: '🇩🇪', venue: 'MetLife Stadium',          city: 'New York',       status: 'upcoming' },
  // GROUP F
  { id: 11,  utcDate: '2026-06-14T20:00:00Z', group: 'F', date: 'Jun 14', time: '3:00 PM',  home: 'Netherlands', homeflag: '🇳🇱', away: 'Japan',   awayflag: '🇯🇵', venue: 'AT&T Stadium',   city: 'Dallas',       status: 'upcoming' },
  { id: 12,  utcDate: '2026-06-15T02:00:00Z', group: 'F', date: 'Jun 14', time: '8:00 PM',  home: 'Sweden',      homeflag: '🇸🇪', away: 'Tunisia', awayflag: '🇹🇳', venue: 'Estadio BBVA',   city: 'Monterrey',    status: 'upcoming' },
  { id: 35,  utcDate: '2026-06-20T17:00:00Z', group: 'F', date: 'Jun 20', time: '12:00 PM', home: 'Netherlands', homeflag: '🇳🇱', away: 'Sweden',  awayflag: '🇸🇪', venue: 'NRG Stadium',     city: 'Houston',      status: 'upcoming' },
  { id: 36,  utcDate: '2026-06-21T04:00:00Z', group: 'F', date: 'Jun 20', time: '10:00 PM', home: 'Tunisia',     homeflag: '🇹🇳', away: 'Japan',   awayflag: '🇯🇵', venue: 'Estadio BBVA',   city: 'Monterrey',    status: 'upcoming' },
  { id: 57,  utcDate: '2026-06-25T23:00:00Z', group: 'F', date: 'Jun 25', time: '6:00 PM',  home: 'Japan',       homeflag: '🇯🇵', away: 'Sweden',  awayflag: '🇸🇪', venue: 'AT&T Stadium',   city: 'Dallas',       status: 'upcoming' },
  { id: 58,  utcDate: '2026-06-25T23:00:00Z', group: 'F', date: 'Jun 25', time: '6:00 PM',  home: 'Tunisia',     homeflag: '🇹🇳', away: 'Netherlands',awayflag:'🇳🇱',venue: 'Arrowhead Stadium',city: 'Kansas City', status: 'upcoming' },
  // GROUP G
  { id: 16,  utcDate: '2026-06-15T19:00:00Z', group: 'G', date: 'Jun 15', time: '12:00 PM', home: 'Belgium',     homeflag: '🇧🇪', away: 'Egypt',       awayflag: '🇪🇬', venue: 'Lumen Field',      city: 'Seattle',      status: 'upcoming' },
  { id: 15,  utcDate: '2026-06-16T01:00:00Z', group: 'G', date: 'Jun 15', time: '6:00 PM',  home: 'Iran',        homeflag: '🇮🇷', away: 'New Zealand', awayflag: '🇳🇿', venue: 'SoFi Stadium',     city: 'Los Angeles',  status: 'upcoming' },
  { id: 39,  utcDate: '2026-06-21T19:00:00Z', group: 'G', date: 'Jun 21', time: '12:00 PM', home: 'Belgium',     homeflag: '🇧🇪', away: 'Iran',        awayflag: '🇮🇷', venue: 'SoFi Stadium',     city: 'Los Angeles',  status: 'upcoming' },
  { id: 40,  utcDate: '2026-06-22T01:00:00Z', group: 'G', date: 'Jun 21', time: '6:00 PM',  home: 'New Zealand', homeflag: '🇳🇿', away: 'Egypt',       awayflag: '🇪🇬', venue: 'BC Place',         city: 'Vancouver',    status: 'upcoming' },
  { id: 63,  utcDate: '2026-06-27T03:00:00Z', group: 'G', date: 'Jun 26', time: '8:00 PM',  home: 'Egypt',       homeflag: '🇪🇬', away: 'Iran',        awayflag: '🇮🇷', venue: 'Lumen Field',      city: 'Seattle',      status: 'upcoming' },
  { id: 64,  utcDate: '2026-06-27T03:00:00Z', group: 'G', date: 'Jun 26', time: '8:00 PM',  home: 'New Zealand', homeflag: '🇳🇿', away: 'Belgium',     awayflag: '🇧🇪', venue: 'BC Place',         city: 'Vancouver',    status: 'upcoming' },
  // GROUP H
  { id: 14,  utcDate: '2026-06-15T16:00:00Z', group: 'H', date: 'Jun 15', time: '12:00 PM', home: 'Spain',        homeflag: '🇪🇸', away: 'Cape Verde',   awayflag: '🇨🇻', venue: 'Mercedes-Benz Stadium', city: 'Atlanta',      status: 'upcoming' },
  { id: 13,  utcDate: '2026-06-15T22:00:00Z', group: 'H', date: 'Jun 15', time: '6:00 PM',  home: 'Saudi Arabia', homeflag: '🇸🇦', away: 'Uruguay',      awayflag: '🇺🇾', venue: 'Hard Rock Stadium',     city: 'Miami',        status: 'upcoming' },
  { id: 38,  utcDate: '2026-06-21T16:00:00Z', group: 'H', date: 'Jun 21', time: '12:00 PM', home: 'Spain',        homeflag: '🇪🇸', away: 'Saudi Arabia', awayflag: '🇸🇦', venue: 'Mercedes-Benz Stadium', city: 'Atlanta',      status: 'upcoming' },
  { id: 37,  utcDate: '2026-06-21T22:00:00Z', group: 'H', date: 'Jun 21', time: '6:00 PM',  home: 'Uruguay',      homeflag: '🇺🇾', away: 'Cape Verde',   awayflag: '🇨🇻', venue: 'Hard Rock Stadium',     city: 'Miami',        status: 'upcoming' },
  { id: 66,  utcDate: '2026-06-27T00:00:00Z', group: 'H', date: 'Jun 26', time: '6:00 PM',  home: 'Uruguay',      homeflag: '🇺🇾', away: 'Spain',        awayflag: '🇪🇸', venue: 'Estadio Akron',         city: 'Guadalajara',  status: 'upcoming' },
  { id: 65,  utcDate: '2026-06-27T00:00:00Z', group: 'H', date: 'Jun 26', time: '7:00 PM',  home: 'Cape Verde',   homeflag: '🇨🇻', away: 'Saudi Arabia', awayflag: '🇸🇦', venue: 'NRG Stadium',           city: 'Houston',      status: 'upcoming' },
  // GROUP I
  { id: 17,  utcDate: '2026-06-16T19:00:00Z', group: 'I', date: 'Jun 16', time: '3:00 PM',  home: 'France',   homeflag: '🇫🇷', away: 'Senegal', awayflag: '🇸🇳', venue: 'MetLife Stadium',   city: 'New York',     status: 'upcoming' },
  { id: 18,  utcDate: '2026-06-16T22:00:00Z', group: 'I', date: 'Jun 16', time: '6:00 PM',  home: 'Iraq',     homeflag: '🇮🇶', away: 'Norway',  awayflag: '🇳🇴', venue: 'Gillette Stadium',  city: 'Boston',       status: 'upcoming' },
  { id: 42,  utcDate: '2026-06-22T21:00:00Z', group: 'I', date: 'Jun 22', time: '5:00 PM',  home: 'France',   homeflag: '🇫🇷', away: 'Iraq',    awayflag: '🇮🇶', venue: 'Lincoln Financial', city: 'Philadelphia', status: 'upcoming' },
  { id: 41,  utcDate: '2026-06-23T00:00:00Z', group: 'I', date: 'Jun 22', time: '8:00 PM',  home: 'Norway',   homeflag: '🇳🇴', away: 'Senegal', awayflag: '🇸🇳', venue: 'MetLife Stadium',   city: 'New York',     status: 'upcoming' },
  { id: 61,  utcDate: '2026-06-26T19:00:00Z', group: 'I', date: 'Jun 26', time: '3:00 PM',  home: 'Norway',   homeflag: '🇳🇴', away: 'France',  awayflag: '🇫🇷', venue: 'Gillette Stadium',  city: 'Boston',       status: 'upcoming' },
  { id: 62,  utcDate: '2026-06-26T19:00:00Z', group: 'I', date: 'Jun 26', time: '3:00 PM',  home: 'Senegal',  homeflag: '🇸🇳', away: 'Iraq',    awayflag: '🇮🇶', venue: 'BMO Field',         city: 'Toronto',      status: 'upcoming' },
  // GROUP J
  { id: 19,  utcDate: '2026-06-17T01:00:00Z', group: 'J', date: 'Jun 16', time: '8:00 PM',  home: 'Argentina', homeflag: '🇦🇷', away: 'Algeria', awayflag: '🇩🇿', venue: 'Arrowhead Stadium', city: 'Kansas City',  status: 'upcoming' },
  { id: 20,  utcDate: '2026-06-17T04:00:00Z', group: 'J', date: 'Jun 16', time: '9:00 PM',  home: 'Austria',   homeflag: '🇦🇹', away: 'Jordan',  awayflag: '🇯🇴', venue: "Levi's Stadium",   city: 'San Francisco',status: 'upcoming' },
  { id: 43,  utcDate: '2026-06-22T17:00:00Z', group: 'J', date: 'Jun 22', time: '12:00 PM', home: 'Argentina', homeflag: '🇦🇷', away: 'Austria', awayflag: '🇦🇹', venue: 'AT&T Stadium',     city: 'Dallas',       status: 'upcoming' },
  { id: 44,  utcDate: '2026-06-23T03:00:00Z', group: 'J', date: 'Jun 22', time: '8:00 PM',  home: 'Jordan',    homeflag: '🇯🇴', away: 'Algeria', awayflag: '🇩🇿', venue: "Levi's Stadium",   city: 'San Francisco',status: 'upcoming' },
  { id: 70,  utcDate: '2026-06-28T02:00:00Z', group: 'J', date: 'Jun 27', time: '9:00 PM',  home: 'Jordan',    homeflag: '🇯🇴', away: 'Argentina',awayflag: '🇦🇷', venue: 'AT&T Stadium',    city: 'Dallas',       status: 'upcoming' },
  { id: 69,  utcDate: '2026-06-28T02:00:00Z', group: 'J', date: 'Jun 27', time: '9:00 PM',  home: 'Algeria',   homeflag: '🇩🇿', away: 'Austria', awayflag: '🇦🇹', venue: 'Arrowhead Stadium',city: 'Kansas City',  status: 'upcoming' },
  // GROUP K
  { id: 23,  utcDate: '2026-06-17T17:00:00Z', group: 'K', date: 'Jun 17', time: '12:00 PM', home: 'Portugal',    homeflag: '🇵🇹', away: 'DR Congo',   awayflag: '🇨🇩', venue: 'NRG Stadium',           city: 'Houston',      status: 'upcoming' },
  { id: 24,  utcDate: '2026-06-18T02:00:00Z', group: 'K', date: 'Jun 17', time: '8:00 PM',  home: 'Uzbekistan',  homeflag: '🇺🇿', away: 'Colombia',   awayflag: '🇨🇴', venue: 'Estadio Azteca',        city: 'Mexico City',  status: 'upcoming' },
  { id: 47,  utcDate: '2026-06-23T17:00:00Z', group: 'K', date: 'Jun 23', time: '12:00 PM', home: 'Portugal',    homeflag: '🇵🇹', away: 'Uzbekistan', awayflag: '🇺🇿', venue: 'NRG Stadium',           city: 'Houston',      status: 'upcoming' },
  { id: 48,  utcDate: '2026-06-24T02:00:00Z', group: 'K', date: 'Jun 23', time: '8:00 PM',  home: 'Colombia',    homeflag: '🇨🇴', away: 'DR Congo',   awayflag: '🇨🇩', venue: 'Estadio Akron',         city: 'Guadalajara',  status: 'upcoming' },
  { id: 71,  utcDate: '2026-06-27T23:30:00Z', group: 'K', date: 'Jun 27', time: '7:30 PM',  home: 'Colombia',    homeflag: '🇨🇴', away: 'Portugal',   awayflag: '🇵🇹', venue: 'Hard Rock Stadium',     city: 'Miami',        status: 'upcoming' },
  { id: 72,  utcDate: '2026-06-27T23:30:00Z', group: 'K', date: 'Jun 27', time: '7:30 PM',  home: 'DR Congo',    homeflag: '🇨🇩', away: 'Uzbekistan', awayflag: '🇺🇿', venue: 'Mercedes-Benz Stadium', city: 'Atlanta',      status: 'upcoming' },
  // GROUP L
  { id: 22,  utcDate: '2026-06-17T20:00:00Z', group: 'L', date: 'Jun 17', time: '3:00 PM',  home: 'England', homeflag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', away: 'Croatia', awayflag: '🇭🇷', venue: 'AT&T Stadium',   city: 'Dallas',       status: 'upcoming' },
  { id: 21,  utcDate: '2026-06-17T23:00:00Z', group: 'L', date: 'Jun 17', time: '7:00 PM',  home: 'Ghana',   homeflag: '🇬🇭', away: 'Panama',  awayflag: '🇵🇦', venue: 'BMO Field',       city: 'Toronto',      status: 'upcoming' },
  { id: 45,  utcDate: '2026-06-23T20:00:00Z', group: 'L', date: 'Jun 23', time: '4:00 PM',  home: 'England', homeflag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', away: 'Ghana',   awayflag: '🇬🇭', venue: 'Gillette Stadium', city: 'Boston',       status: 'upcoming' },
  { id: 46,  utcDate: '2026-06-23T23:00:00Z', group: 'L', date: 'Jun 23', time: '7:00 PM',  home: 'Panama',  homeflag: '🇵🇦', away: 'Croatia', awayflag: '🇭🇷', venue: 'BMO Field',       city: 'Toronto',      status: 'upcoming' },
  { id: 67,  utcDate: '2026-06-27T21:00:00Z', group: 'L', date: 'Jun 27', time: '5:00 PM',  home: 'Panama',  homeflag: '🇵🇦', away: 'England', awayflag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', venue: 'MetLife Stadium', city: 'New York',     status: 'upcoming' },
  { id: 68,  utcDate: '2026-06-27T21:00:00Z', group: 'L', date: 'Jun 27', time: '5:00 PM',  home: 'Croatia', homeflag: '🇭🇷', away: 'Ghana',   awayflag: '🇬🇭', venue: 'Lincoln Financial',city: 'Philadelphia', status: 'upcoming' },
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
