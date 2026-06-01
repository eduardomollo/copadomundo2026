/**
 * Live Scores Service — API-Football (RapidAPI)
 *
 * HOW TO GET YOUR API KEY:
 * 1. Go to https://rapidapi.com/api-sports/api/api-football
 * 2. Sign up for a free account
 * 3. Subscribe to the API-Football plan (free tier: 100 requests/day)
 * 4. Copy your X-RapidAPI-Key from the dashboard
 * 5. Replace YOUR_RAPIDAPI_KEY below
 *
 * FREE TIER LIMITS:
 * - 100 requests/day
 * - Live match data refreshes every 15 seconds
 *
 * WORLD CUP 2026:
 * - League ID: 1 (FIFA World Cup)
 * - Season: 2026
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Match, STATIC_MATCHES } from '../constants/data';

const RAPIDAPI_KEY = '946836b315msh84f41ceada207a5p1a8548jsn34ecb817007c'; // ← Replace this
const BASE_URL = 'https://api-football-v1.p.rapidapi.com/v3';
const WC_LEAGUE_ID = 1;
const WC_SEASON = 2026;

const CACHE_TTL_LIVE = 30 * 1000;       // 30s for live matches
const CACHE_TTL_UPCOMING = 5 * 60 * 1000; // 5min for upcoming
const CACHE_TTL_STANDINGS = 10 * 60 * 1000; // 10min for standings

const headers = {
  'X-RapidAPI-Key': RAPIDAPI_KEY,
  'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
};

// ── CACHE ────────────────────────────────────────────────────────────────────

async function getCached<T>(key: string, ttl: number): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > ttl) return null;
    return data as T;
  } catch {
    return null;
  }
}

async function setCache(key: string, data: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch {}
}

// ── API HELPERS ───────────────────────────────────────────────────────────────

async function apiFetch(endpoint: string, params: Record<string, string | number>) {
  const url = new URL(`${BASE_URL}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// ── STATUS MAP ────────────────────────────────────────────────────────────────

function mapStatus(short: string): 'upcoming' | 'live' | 'finished' {
  if (['1H', '2H', 'HT', 'ET', 'BT', 'P', 'SUSP', 'INT', 'LIVE'].includes(short)) return 'live';
  if (['FT', 'AET', 'PEN'].includes(short)) return 'finished';
  return 'upcoming';
}

// ── PUBLIC API ────────────────────────────────────────────────────────────────

/**
 * Fetch all World Cup 2026 fixtures.
 * Falls back to static data if the API key is not set or the request fails.
 */
export async function fetchMatches(): Promise<Match[]> {
  if (RAPIDAPI_KEY === 'YOUR_RAPIDAPI_KEY') {
    // No key yet — return static schedule
    return STATIC_MATCHES;
  }

  const cacheKey = 'wc2026_fixtures';
  const hasLive = await hasLiveMatch();
  const ttl = hasLive ? CACHE_TTL_LIVE : CACHE_TTL_UPCOMING;

  const cached = await getCached<Match[]>(cacheKey, ttl);
  if (cached) return cached;

  try {
    const json = await apiFetch('fixtures', {
      league: WC_LEAGUE_ID,
      season: WC_SEASON,
    });

    const matches: Match[] = (json.response ?? []).map((item: any) => {
      const f = item.fixture;
      const teams = item.teams;
      const goals = item.goals;
      const statusShort = f.status.short;

      return {
        id: f.id,
        apiFixtureId: f.id,
        group: item.league.round?.replace('Group Stage - ', '') ?? '?',
        date: new Date(f.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        time: new Date(f.date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        home: teams.home.name,
        homeflag: '',
        away: teams.away.name,
        awayflag: '',
        venue: f.venue.name ?? '',
        city: f.venue.city ?? '',
        status: mapStatus(statusShort),
        homeScore: goals.home ?? undefined,
        awayScore: goals.away ?? undefined,
        minute: f.status.elapsed ?? undefined,
      } satisfies Match;
    });

    await setCache(cacheKey, matches);
    return matches;
  } catch (err) {
    console.warn('API fetch failed, using static data:', err);
    return STATIC_MATCHES;
  }
}

/**
 * Fetch live match detail for a single fixture (used for live score polling).
 */
export async function fetchLiveFixture(fixtureId: number): Promise<Partial<Match> | null> {
  if (RAPIDAPI_KEY === 'YOUR_RAPIDAPI_KEY') return null;

  try {
    const json = await apiFetch('fixtures', { id: fixtureId, live: 'all' });
    const item = json.response?.[0];
    if (!item) return null;

    return {
      homeScore: item.goals.home ?? undefined,
      awayScore: item.goals.away ?? undefined,
      minute: item.fixture.status.elapsed ?? undefined,
      status: mapStatus(item.fixture.status.short),
    };
  } catch {
    return null;
  }
}

/**
 * Fetch group standings.
 */
export async function fetchStandings(): Promise<Record<string, GroupTeamStat[]>> {
  if (RAPIDAPI_KEY === 'YOUR_RAPIDAPI_KEY') return {};

  const cacheKey = 'wc2026_standings';
  const cached = await getCached<Record<string, GroupTeamStat[]>>(cacheKey, CACHE_TTL_STANDINGS);
  if (cached) return cached;

  try {
    const json = await apiFetch('standings', {
      league: WC_LEAGUE_ID,
      season: WC_SEASON,
    });

    const result: Record<string, GroupTeamStat[]> = {};
    const groups: any[][] = json.response?.[0]?.league?.standings ?? [];

    groups.forEach((group: any[]) => {
      if (!group.length) return;
      const letter = group[0].group?.replace('Group ', '') ?? '?';
      result[letter] = group.map((t: any) => ({
        team: t.team.name,
        played: t.all.played,
        won: t.all.win,
        drawn: t.all.draw,
        lost: t.all.lose,
        gf: t.all.goals.for,
        ga: t.all.goals.against,
        gd: t.goalsDiff,
        points: t.points,
      }));
    });

    await setCache(cacheKey, result);
    return result;
  } catch {
    return {};
  }
}

// ── HELPERS ───────────────────────────────────────────────────────────────────

async function hasLiveMatch(): Promise<boolean> {
  try {
    const json = await apiFetch('fixtures', {
      league: WC_LEAGUE_ID,
      season: WC_SEASON,
      live: 'all',
    });
    return (json.response?.length ?? 0) > 0;
  } catch {
    return false;
  }
}

export type GroupTeamStat = {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
};
