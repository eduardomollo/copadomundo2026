import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchMatches, fetchLiveFixture } from '../services/api';
import { Match, STATIC_MATCHES } from '../constants/data';

const LIVE_POLL_INTERVAL = 30_000; // 30 seconds

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>(STATIC_MATCHES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await fetchMatches();
      setMatches(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (e) {
      setError('Could not load live scores');
    } finally {
      setLoading(false);
    }
  }, []);

  // Poll live matches every 30s
  const startPolling = useCallback(() => {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(async () => {
      const liveMatches = matches.filter(m => m.status === 'live');
      if (liveMatches.length === 0) return;

      const updates = await Promise.all(
        liveMatches.map(async m => {
          if (!m.apiFixtureId) return null;
          const update = await fetchLiveFixture(m.apiFixtureId);
          return update ? { id: m.id, ...update } : null;
        })
      );

      setMatches(prev =>
        prev.map(m => {
          const update = updates.find(u => u?.id === m.id);
          if (!update) return m;
          return { ...m, ...update };
        })
      );
      setLastUpdated(new Date());
    }, LIVE_POLL_INTERVAL);
  }, [matches]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const hasLive = matches.some(m => m.status === 'live');
    if (hasLive) {
      startPolling();
    } else {
      if (pollRef.current) clearInterval(pollRef.current);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [matches, startPolling]);

  const liveMatches = matches.filter(m => m.status === 'live');
  const upcomingMatches = matches.filter(m => m.status === 'upcoming');
  const finishedMatches = matches.filter(m => m.status === 'finished');

  return {
    matches,
    liveMatches,
    upcomingMatches,
    finishedMatches,
    loading,
    error,
    lastUpdated,
    refresh: load,
  };
}

export function useGroupMatches(group: string) {
  const { matches, loading, refresh } = useMatches();
  return {
    matches: matches.filter(m => m.group === group),
    loading,
    refresh,
  };
}
