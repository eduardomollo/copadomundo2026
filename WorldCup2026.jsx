import { useState } from "react";

// ── DATA ────────────────────────────────────────────────────────────────────

const GROUPS = {
  A: { teams: ["Mexico", "South Africa", "South Korea", "Czechia"] },
  B: { teams: ["Canada", "Bosnia-Herzegovina", "Qatar", "Switzerland"] },
  C: { teams: ["Brazil", "Morocco", "Haiti", "Scotland"] },
  D: { teams: ["United States", "Paraguay", "Australia", "Türkiye"] },
  E: { teams: ["Germany", "Curaçao", "Ivory Coast", "Ecuador"] },
  F: { teams: ["Netherlands", "Japan", "Sweden", "Tunisia"] },
  G: { teams: ["Belgium", "Egypt", "Iran", "New Zealand"] },
  H: { teams: ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"] },
  I: { teams: ["France", "Senegal", "Iraq", "Norway"] },
  J: { teams: ["Argentina", "Algeria", "Austria", "Jordan"] },
  K: { teams: ["Portugal", "Congo DR", "Uzbekistan", "Colombia"] },
  L: { teams: ["England", "Croatia", "Ghana", "Panama"] },
};

const FLAGS = {
  Mexico: "🇲🇽", "South Africa": "🇿🇦", "South Korea": "🇰🇷", Czechia: "🇨🇿",
  Canada: "🇨🇦", "Bosnia-Herzegovina": "🇧🇦", Qatar: "🇶🇦", Switzerland: "🇨🇭",
  Brazil: "🇧🇷", Morocco: "🇲🇦", Haiti: "🇭🇹", Scotland: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "United States": "🇺🇸", Paraguay: "🇵🇾", Australia: "🇦🇺", Türkiye: "🇹🇷",
  Germany: "🇩🇪", Curaçao: "🇨🇼", "Ivory Coast": "🇨🇮", Ecuador: "🇪🇨",
  Netherlands: "🇳🇱", Japan: "🇯🇵", Sweden: "🇸🇪", Tunisia: "🇹🇳",
  Belgium: "🇧🇪", Egypt: "🇪🇬", Iran: "🇮🇷", "New Zealand": "🇳🇿",
  Spain: "🇪🇸", "Cape Verde": "🇨🇻", "Saudi Arabia": "🇸🇦", Uruguay: "🇺🇾",
  France: "🇫🇷", Senegal: "🇸🇳", Iraq: "🇮🇶", Norway: "🇳🇴",
  Argentina: "🇦🇷", Algeria: "🇩🇿", Austria: "🇦🇹", Jordan: "🇯🇴",
  Portugal: "🇵🇹", "Congo DR": "🇨🇩", Uzbekistan: "🇺🇿", Colombia: "🇨🇴",
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", Croatia: "🇭🇷", Ghana: "🇬🇭", Panama: "🇵🇦",
};

const MATCHES = [
  // Group A
  { id: 1, group: "A", date: "Jun 11", time: "5:00 PM", home: "Mexico", away: "South Africa", venue: "Azteca, Mexico City", status: "upcoming" },
  { id: 2, group: "A", date: "Jun 12", time: "3:00 PM", home: "South Korea", away: "Czechia", venue: "SoFi Stadium, LA", status: "upcoming" },
  { id: 3, group: "A", date: "Jun 16", time: "6:00 PM", home: "Mexico", away: "Czechia", venue: "Azteca, Mexico City", status: "upcoming" },
  { id: 4, group: "A", date: "Jun 16", time: "9:00 PM", home: "South Africa", away: "South Korea", venue: "MetLife, NY", status: "upcoming" },
  { id: 5, group: "A", date: "Jun 21", time: "6:00 PM", home: "Mexico", away: "South Korea", venue: "AT&T Stadium, Dallas", status: "upcoming" },
  { id: 6, group: "A", date: "Jun 21", time: "6:00 PM", home: "Czechia", away: "South Africa", venue: "Levi's Stadium, SF", status: "upcoming" },
  // Group B
  { id: 7, group: "B", date: "Jun 12", time: "6:00 PM", home: "Canada", away: "Bosnia-Herzegovina", venue: "BC Place, Vancouver", status: "upcoming" },
  { id: 8, group: "B", date: "Jun 12", time: "9:00 PM", home: "Switzerland", away: "Qatar", venue: "Rose Bowl, LA", status: "upcoming" },
  { id: 9, group: "B", date: "Jun 17", time: "3:00 PM", home: "Canada", away: "Qatar", venue: "BC Place, Vancouver", status: "upcoming" },
  { id: 10, group: "B", date: "Jun 17", time: "6:00 PM", home: "Bosnia-Herzegovina", away: "Switzerland", venue: "MetLife, NY", status: "upcoming" },
  // Group C
  { id: 11, group: "C", date: "Jun 13", time: "6:00 PM", home: "Brazil", away: "Morocco", venue: "MetLife, NY", status: "upcoming" },
  { id: 12, group: "C", date: "Jun 13", time: "9:00 PM", home: "Scotland", away: "Haiti", venue: "Rose Bowl, LA", status: "upcoming" },
  // Group D
  { id: 13, group: "D", date: "Jun 12", time: "6:00 PM", home: "United States", away: "Paraguay", venue: "SoFi Stadium, LA", status: "upcoming" },
  { id: 14, group: "D", date: "Jun 13", time: "3:00 PM", home: "Australia", away: "Türkiye", venue: "AT&T Stadium, Dallas", status: "upcoming" },
  // Group E
  { id: 15, group: "E", date: "Jun 14", time: "3:00 PM", home: "Germany", away: "Curaçao", venue: "Gillette Stadium, Boston", status: "upcoming" },
  { id: 16, group: "E", date: "Jun 14", time: "6:00 PM", home: "Ecuador", away: "Ivory Coast", venue: "Levi's Stadium, SF", status: "upcoming" },
  // Group F
  { id: 17, group: "F", date: "Jun 14", time: "9:00 PM", home: "Netherlands", away: "Tunisia", venue: "Hard Rock, Miami", status: "upcoming" },
  { id: 18, group: "F", date: "Jun 15", time: "3:00 PM", home: "Japan", away: "Sweden", venue: "Rose Bowl, LA", status: "upcoming" },
  // Group G
  { id: 19, group: "G", date: "Jun 15", time: "6:00 PM", home: "Belgium", away: "Egypt", venue: "MetLife, NY", status: "upcoming" },
  { id: 20, group: "G", date: "Jun 15", time: "9:00 PM", home: "Iran", away: "New Zealand", venue: "SoFi Stadium, LA", status: "upcoming" },
  // Group H
  { id: 21, group: "H", date: "Jun 15", time: "3:00 PM", home: "Spain", away: "Cape Verde", venue: "AT&T Stadium, Dallas", status: "upcoming" },
  { id: 22, group: "H", date: "Jun 16", time: "12:00 PM", home: "Uruguay", away: "Saudi Arabia", venue: "Hard Rock, Miami", status: "upcoming" },
  // Group I
  { id: 23, group: "I", date: "Jun 16", time: "3:00 PM", home: "France", away: "Iraq", venue: "MetLife, NY", status: "upcoming" },
  { id: 24, group: "I", date: "Jun 16", time: "6:00 PM", home: "Norway", away: "Senegal", venue: "Gillette Stadium, Boston", status: "upcoming" },
  // Group J
  { id: 25, group: "J", date: "Jun 17", time: "9:00 PM", home: "Argentina", away: "Algeria", venue: "Rose Bowl, LA", status: "upcoming" },
  { id: 26, group: "J", date: "Jun 18", time: "3:00 PM", home: "Austria", away: "Jordan", venue: "Hard Rock, Miami", status: "upcoming" },
  // Group K
  { id: 27, group: "K", date: "Jun 18", time: "6:00 PM", home: "Portugal", away: "Uzbekistan", venue: "Levi's Stadium, SF", status: "upcoming" },
  { id: 28, group: "K", date: "Jun 18", time: "9:00 PM", home: "Colombia", away: "Congo DR", venue: "SoFi Stadium, LA", status: "upcoming" },
  // Group L
  { id: 29, group: "L", date: "Jun 19", time: "6:00 PM", home: "England", away: "Panama", venue: "MetLife, NY", status: "upcoming" },
  { id: 30, group: "L", date: "Jun 19", time: "9:00 PM", home: "Croatia", away: "Ghana", venue: "AT&T Stadium, Dallas", status: "upcoming" },
];

const FAVORITES = ["Brazil", "France", "Argentina", "Spain", "England", "Germany", "Portugal"];

const ODDS = {
  Brazil: "5/1", France: "6/1", Argentina: "7/1", Spain: "7/1",
  England: "8/1", Germany: "9/1", Portugal: "10/1", Netherlands: "14/1",
  "United States": "20/1", Mexico: "25/1",
};

// ── STYLES ──────────────────────────────────────────────────────────────────

const S = {
  app: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    background: "#0a0e1a",
    minHeight: "100vh",
    color: "#fff",
    maxWidth: 430,
    margin: "0 auto",
    position: "relative",
  },
  header: {
    background: "linear-gradient(135deg, #1a3a6b 0%, #0d1f3c 100%)",
    padding: "20px 16px 16px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  headerTitle: { fontSize: 20, fontWeight: 700, letterSpacing: -0.5 },
  headerSub: { fontSize: 12, color: "#8a9cc0", marginTop: 2 },
  nav: {
    display: "flex",
    background: "#0d1527",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  navBtn: (active) => ({
    flex: "0 0 auto",
    padding: "12px 16px",
    fontSize: 13,
    fontWeight: active ? 600 : 400,
    color: active ? "#fff" : "#5a6a8a",
    background: "none",
    border: "none",
    borderBottom: active ? "2px solid #3b82f6" : "2px solid transparent",
    cursor: "pointer",
    whiteSpace: "nowrap",
  }),
  page: { padding: "16px 12px 80px" },
  card: {
    background: "#141c2e",
    borderRadius: 12,
    padding: "14px 16px",
    marginBottom: 10,
    border: "1px solid rgba(255,255,255,0.06)",
  },
  matchCard: {
    background: "#141c2e",
    borderRadius: 12,
    padding: "14px 16px",
    marginBottom: 8,
    border: "1px solid rgba(255,255,255,0.06)",
  },
  groupTag: {
    display: "inline-block",
    background: "rgba(59,130,246,0.15)",
    color: "#60a5fa",
    fontSize: 11,
    fontWeight: 600,
    padding: "2px 8px",
    borderRadius: 6,
    marginBottom: 10,
  },
  matchRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  teamName: { fontSize: 14, fontWeight: 600, flex: 1 },
  teamNameRight: { fontSize: 14, fontWeight: 600, flex: 1, textAlign: "right" },
  score: {
    fontSize: 20,
    fontWeight: 800,
    color: "#fff",
    background: "#0a0e1a",
    padding: "4px 14px",
    borderRadius: 8,
    letterSpacing: 2,
    minWidth: 70,
    textAlign: "center",
  },
  matchMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  metaText: { fontSize: 11, color: "#5a6a8a" },
  liveBadge: {
    background: "#ef4444",
    color: "#fff",
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 10,
    animation: "pulse 1.5s infinite",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12,
    marginTop: 4,
    color: "#e2e8f0",
  },
  groupHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  groupTitle: { fontSize: 14, fontWeight: 700, color: "#60a5fa" },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 28px 28px 28px 28px 28px",
    gap: 4,
    padding: "6px 0",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    marginBottom: 4,
  },
  tableHeaderText: { fontSize: 10, color: "#5a6a8a", textAlign: "center", fontWeight: 600 },
  tableRow: (i) => ({
    display: "grid",
    gridTemplateColumns: "1fr 28px 28px 28px 28px 28px",
    gap: 4,
    padding: "8px 0",
    borderBottom: i < 3 ? "none" : "none",
    alignItems: "center",
  }),
  tableCell: { fontSize: 12, textAlign: "center", color: "#cbd5e1" },
  teamCell: { fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 },
  qualBadge: (pos) => ({
    width: 4,
    height: 24,
    borderRadius: 2,
    background: pos < 2 ? "#22c55e" : pos === 2 ? "#f59e0b" : "#374151",
    marginRight: 4,
    flexShrink: 0,
  }),
  predictionCard: {
    background: "#141c2e",
    borderRadius: 12,
    padding: "16px",
    marginBottom: 10,
    border: "1px solid rgba(59,130,246,0.2)",
  },
  predictionTitle: { fontSize: 13, fontWeight: 700, marginBottom: 12, color: "#94a3b8" },
  predPickRow: {
    display: "flex",
    gap: 8,
    marginTop: 10,
  },
  pickBtn: (selected, type) => ({
    flex: 1,
    padding: "10px 8px",
    borderRadius: 8,
    border: selected ? "2px solid " + (type === "home" ? "#3b82f6" : type === "draw" ? "#f59e0b" : "#ef4444") : "1px solid rgba(255,255,255,0.1)",
    background: selected
      ? type === "home" ? "rgba(59,130,246,0.15)" : type === "draw" ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)"
      : "transparent",
    color: selected ? "#fff" : "#5a6a8a",
    fontSize: 12,
    fontWeight: selected ? 600 : 400,
    cursor: "pointer",
    textAlign: "center",
  }),
  pointsBadge: {
    background: "linear-gradient(135deg, #f59e0b, #d97706)",
    color: "#000",
    fontWeight: 700,
    fontSize: 12,
    padding: "4px 12px",
    borderRadius: 20,
  },
  monoCard: {
    background: "linear-gradient(135deg, #1e3a5f 0%, #0f2340 100%)",
    borderRadius: 14,
    padding: "20px",
    marginBottom: 12,
    border: "1px solid rgba(59,130,246,0.3)",
  },
  monoTitle: { fontSize: 16, fontWeight: 700, marginBottom: 6 },
  monoDesc: { fontSize: 13, color: "#8a9cc0", lineHeight: 1.5, marginBottom: 14 },
  monoBtn: (color) => ({
    background: color || "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "12px 20px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    width: "100%",
  }),
  oddsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },
  oddsTeam: { fontSize: 14, fontWeight: 500 },
  oddsValue: {
    background: "rgba(34,197,94,0.15)",
    color: "#22c55e",
    fontSize: 13,
    fontWeight: 700,
    padding: "4px 12px",
    borderRadius: 8,
  },
  filterRow: {
    display: "flex",
    gap: 8,
    marginBottom: 14,
    overflowX: "auto",
    scrollbarWidth: "none",
  },
  filterBtn: (active) => ({
    padding: "6px 14px",
    borderRadius: 20,
    border: active ? "1px solid #3b82f6" : "1px solid rgba(255,255,255,0.1)",
    background: active ? "rgba(59,130,246,0.15)" : "transparent",
    color: active ? "#60a5fa" : "#5a6a8a",
    fontSize: 12,
    fontWeight: active ? 600 : 400,
    cursor: "pointer",
    whiteSpace: "nowrap",
  }),
  leaderCard: {
    background: "#141c2e",
    borderRadius: 12,
    padding: "12px 16px",
    marginBottom: 6,
    display: "flex",
    alignItems: "center",
    gap: 12,
    border: "1px solid rgba(255,255,255,0.06)",
  },
  rank: (n) => ({
    width: 28,
    height: 28,
    borderRadius: "50%",
    background: n === 1 ? "#f59e0b" : n === 2 ? "#94a3b8" : n === 3 ? "#cd7f32" : "#1e293b",
    color: n <= 3 ? "#000" : "#94a3b8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    flexShrink: 0,
  }),
};

// ── COMPONENTS ──────────────────────────────────────────────────────────────

function GroupTable({ letter, group }) {
  const standing = group.teams.map((t, i) => ({
    name: t,
    p: 0, w: 0, d: 0, l: 0, gd: 0, pts: 0,
  }));

  return (
    <div style={S.card}>
      <div style={S.groupHeader}>
        <span style={S.groupTitle}>Group {letter}</span>
      </div>
      <div style={S.tableHeader}>
        <div style={{ ...S.tableHeaderText, textAlign: "left" }}>Team</div>
        <div style={S.tableHeaderText}>P</div>
        <div style={S.tableHeaderText}>W</div>
        <div style={S.tableHeaderText}>D</div>
        <div style={S.tableHeaderText}>L</div>
        <div style={S.tableHeaderText}>Pts</div>
      </div>
      {standing.map((team, i) => (
        <div key={team.name} style={S.tableRow(i)}>
          <div style={S.teamCell}>
            <div style={S.qualBadge(i)} />
            <span>{FLAGS[team.name] || "🏳"}</span>
            <span style={{ fontSize: 12 }}>{team.name}</span>
          </div>
          <div style={S.tableCell}>{team.p}</div>
          <div style={S.tableCell}>{team.w}</div>
          <div style={S.tableCell}>{team.d}</div>
          <div style={S.tableCell}>{team.l}</div>
          <div style={{ ...S.tableCell, fontWeight: 700, color: "#fff" }}>{team.pts}</div>
        </div>
      ))}
      <div style={{ fontSize: 10, color: "#374151", marginTop: 8, display: "flex", gap: 12 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: "#22c55e", display: "inline-block" }} />
          Advance
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: "#f59e0b", display: "inline-block" }} />
          Best 3rd
        </span>
      </div>
    </div>
  );
}

function MatchCard({ match, prediction, onPredict }) {
  return (
    <div style={S.matchCard}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={S.groupTag}>Group {match.group}</span>
        {match.status === "live" && <span style={S.liveBadge}>● LIVE</span>}
      </div>
      <div style={S.matchRow}>
        <div style={{ textAlign: "left", flex: 1 }}>
          <div style={{ fontSize: 22 }}>{FLAGS[match.home] || "🏳"}</div>
          <div style={S.teamName}>{match.home}</div>
        </div>
        <div style={S.score}>
          {match.status === "live" || match.status === "finished"
            ? `${match.homeScore ?? 0} – ${match.awayScore ?? 0}`
            : "vs"}
        </div>
        <div style={{ textAlign: "right", flex: 1 }}>
          <div style={{ fontSize: 22 }}>{FLAGS[match.away] || "🏳"}</div>
          <div style={S.teamNameRight}>{match.away}</div>
        </div>
      </div>
      <div style={S.matchMeta}>
        <span style={S.metaText}>📅 {match.date} · {match.time}</span>
        <span style={S.metaText}>📍 {match.venue.split(",")[0]}</span>
      </div>
      {match.status === "upcoming" && onPredict && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 11, color: "#5a6a8a", marginBottom: 6 }}>Your prediction:</div>
          <div style={S.predPickRow}>
            <button style={S.pickBtn(prediction === "home", "home")} onClick={() => onPredict(match.id, "home")}>
              {FLAGS[match.home]} {match.home.split(" ")[0]}
            </button>
            <button style={S.pickBtn(prediction === "draw", "draw")} onClick={() => onPredict(match.id, "draw")}>
              Draw
            </button>
            <button style={S.pickBtn(prediction === "away", "away")} onClick={() => onPredict(match.id, "away")}>
              {FLAGS[match.away]} {match.away.split(" ")[0]}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── PAGES ────────────────────────────────────────────────────────────────────

function HomePage() {
  const daysLeft = 11;
  return (
    <div style={S.page}>
      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #1e3a5f 0%, #0a0e1a 100%)",
        borderRadius: 16,
        padding: "24px 20px",
        marginBottom: 16,
        textAlign: "center",
        border: "1px solid rgba(59,130,246,0.2)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>⚽</div>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>FIFA World Cup 2026</div>
        <div style={{ fontSize: 14, color: "#8a9cc0", marginTop: 4 }}>USA · Canada · Mexico</div>
        <div style={{
          marginTop: 16,
          background: "rgba(59,130,246,0.1)",
          borderRadius: 10,
          padding: "10px 16px",
          display: "inline-block",
        }}>
          <span style={{ fontSize: 28, fontWeight: 800, color: "#60a5fa" }}>{daysLeft}</span>
          <span style={{ fontSize: 13, color: "#8a9cc0", marginLeft: 6 }}>days until kickoff</span>
        </div>
        <div style={{ fontSize: 12, color: "#5a6a8a", marginTop: 8 }}>
          Starts June 11 · Mexico vs South Africa
        </div>
      </div>

      {/* Quick Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
        {[
          { label: "Teams", value: "48" },
          { label: "Matches", value: "104" },
          { label: "Groups", value: "12" },
        ].map(stat => (
          <div key={stat.label} style={{
            background: "#141c2e",
            borderRadius: 10,
            padding: "12px 8px",
            textAlign: "center",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#60a5fa" }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: "#5a6a8a", marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Favorites */}
      <div style={S.sectionTitle}>Tournament Favorites</div>
      {FAVORITES.slice(0, 5).map(team => (
        <div key={team} style={S.oddsRow}>
          <span style={{ fontSize: 20 }}>{FLAGS[team]}</span>
          <span style={S.oddsTeam}>{team}</span>
          <span style={S.oddsValue}>{ODDS[team] || "N/A"}</span>
        </div>
      ))}
      <div style={{ fontSize: 11, color: "#374151", marginTop: 8 }}>
        Odds for entertainment purposes only
      </div>

      {/* Opening matches */}
      <div style={{ ...S.sectionTitle, marginTop: 20 }}>Opening Matches</div>
      <MatchCard match={MATCHES[0]} />
      <MatchCard match={MATCHES[12]} />
    </div>
  );
}

function GroupsPage() {
  return (
    <div style={S.page}>
      <div style={{ ...S.sectionTitle, marginBottom: 4 }}>Group Stage Standings</div>
      <div style={{ fontSize: 12, color: "#5a6a8a", marginBottom: 14 }}>
        Top 2 from each group + 8 best 3rd-place teams advance
      </div>
      {Object.entries(GROUPS).map(([letter, group]) => (
        <GroupTable key={letter} letter={letter} group={group} />
      ))}
    </div>
  );
}

function SchedulePage() {
  const [filter, setFilter] = useState("All");
  const groupLetters = ["All", ...Object.keys(GROUPS)];
  const filtered = filter === "All" ? MATCHES : MATCHES.filter(m => m.group === filter);

  return (
    <div style={S.page}>
      <div style={S.sectionTitle}>Match Schedule</div>
      <div style={S.filterRow}>
        {groupLetters.map(g => (
          <button key={g} style={S.filterBtn(filter === g)} onClick={() => setFilter(g)}>
            {g === "All" ? "All Matches" : `Group ${g}`}
          </button>
        ))}
      </div>
      {filtered.map(match => (
        <MatchCard key={match.id} match={match} />
      ))}
      {filtered.length === 0 && (
        <div style={{ color: "#5a6a8a", textAlign: "center", marginTop: 40 }}>
          No matches found
        </div>
      )}
    </div>
  );
}

function PredictPage() {
  const [predictions, setPredictions] = useState({});
  const [points, setPoints] = useState(0);
  const [isPremium, setIsPremium] = useState(false);

  const freeLimit = 5;
  const predCount = Object.keys(predictions).length;

  const handlePredict = (matchId, pick) => {
    if (!isPremium && predCount >= freeLimit && !predictions[matchId]) {
      alert("Free limit reached! Upgrade to Premium for unlimited predictions.");
      return;
    }
    setPredictions(prev => {
      const updated = { ...prev, [matchId]: pick };
      const pts = Object.keys(updated).length * 10;
      setPoints(pts);
      return updated;
    });
  };

  const leaderboard = [
    { name: "CarlosGOAT", pts: 340, flag: "🇲🇽" },
    { name: "SoccerKing99", pts: 290, flag: "🇧🇷" },
    { name: "MatchMaster", pts: 275, flag: "🇦🇷" },
    { name: "You", pts: points, flag: "⭐", isUser: true },
    { name: "FutbolFan", pts: 210, flag: "🇪🇸" },
  ].sort((a, b) => b.pts - a.pts);

  return (
    <div style={S.page}>
      {/* Points banner */}
      <div style={{
        background: "linear-gradient(135deg, #1e3a5f, #0f2340)",
        borderRadius: 12,
        padding: "16px",
        marginBottom: 16,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid rgba(245,158,11,0.3)",
      }}>
        <div>
          <div style={{ fontSize: 12, color: "#8a9cc0" }}>Your Points</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#f59e0b" }}>{points}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 12, color: "#8a9cc0" }}>Picks Made</div>
          <div style={{ fontSize: 28, fontWeight: 800 }}>{predCount}/{isPremium ? "∞" : freeLimit}</div>
        </div>
      </div>

      {/* Premium upsell */}
      {!isPremium && (
        <div style={S.monoCard}>
          <div style={S.monoTitle}>🏆 Go Premium</div>
          <div style={S.monoDesc}>
            Unlimited predictions · Live leaderboard prizes · Expert tips before every match
          </div>
          <button style={S.monoBtn("linear-gradient(135deg, #f59e0b, #d97706)")} onClick={() => setIsPremium(true)}>
            Unlock Premium — $4.99/month
          </button>
          <div style={{ fontSize: 11, color: "#5a6a8a", textAlign: "center", marginTop: 8 }}>
            Cancel anytime
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div style={S.sectionTitle}>Leaderboard</div>
      {leaderboard.slice(0, 5).map((player, i) => (
        <div key={player.name} style={{
          ...S.leaderCard,
          border: player.isUser ? "1px solid rgba(245,158,11,0.4)" : "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={S.rank(i + 1)}>{i + 1}</div>
          <span style={{ fontSize: 20 }}>{player.flag}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: player.isUser ? 700 : 500 }}>
              {player.name} {player.isUser && "👤"}
            </div>
          </div>
          <div style={S.pointsBadge}>{player.pts} pts</div>
        </div>
      ))}

      {/* Predictions */}
      <div style={{ ...S.sectionTitle, marginTop: 16 }}>Make Your Picks</div>
      {MATCHES.slice(0, 10).map(match => (
        <MatchCard
          key={match.id}
          match={match}
          prediction={predictions[match.id]}
          onPredict={handlePredict}
        />
      ))}
    </div>
  );
}

function MoneyPage() {
  return (
    <div style={S.page}>
      <div style={S.sectionTitle}>Earn & Win</div>

      {/* Predictions Premium */}
      <div style={S.monoCard}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>🏆</div>
        <div style={S.monoTitle}>Prediction Prizes</div>
        <div style={S.monoDesc}>
          Top predictors win cash prizes each round. Entry is free — premium members get bonus multipliers and expert tips.
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {["🥇 $500", "🥈 $200", "🥉 $100"].map(p => (
            <div key={p} style={{
              flex: 1,
              background: "rgba(255,255,255,0.05)",
              borderRadius: 8,
              padding: "8px 4px",
              textAlign: "center",
              fontSize: 12,
              fontWeight: 600,
            }}>{p}</div>
          ))}
        </div>
        <button style={S.monoBtn("#3b82f6")}>Join for Free</button>
      </div>

      {/* Betting partners */}
      <div style={{ ...S.sectionTitle, marginTop: 4 }}>Best Odds — Betting Partners</div>
      <div style={{ fontSize: 12, color: "#5a6a8a", marginBottom: 12 }}>
        Compare odds across top sportsbooks. 18+ · Gamble responsibly.
      </div>

      {[
        { name: "DraftKings", bonus: "Bet $5, Get $200", color: "#00d632", logo: "DK" },
        { name: "FanDuel", bonus: "No Sweat First Bet $1K", color: "#1493ff", logo: "FD" },
        { name: "BetMGM", bonus: "First Bet up to $1,500", color: "#c9a227", logo: "MGM" },
      ].map(book => (
        <div key={book.name} style={{
          background: "#141c2e",
          borderRadius: 12,
          padding: "14px 16px",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 12,
          border: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10,
            background: book.color, display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#000",
            flexShrink: 0,
          }}>{book.logo}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{book.name}</div>
            <div style={{ fontSize: 12, color: "#22c55e", marginTop: 2 }}>{book.bonus}</div>
          </div>
          <button style={{
            background: "rgba(255,255,255,0.06)",
            border: "none",
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
            padding: "8px 12px",
            borderRadius: 8,
            cursor: "pointer",
          }}>Bet →</button>
        </div>
      ))}

      {/* Merchandise */}
      <div style={{ ...S.sectionTitle, marginTop: 8 }}>Official Merchandise</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[
          { name: "Official Ball", price: "$149", emoji: "⚽" },
          { name: "Tournament Jersey", price: "$89", emoji: "👕" },
          { name: "VIP Tickets", price: "From $299", emoji: "🎟" },
          { name: "Fan Pack Bundle", price: "$59", emoji: "🎁" },
        ].map(item => (
          <div key={item.name} style={{
            background: "#141c2e",
            borderRadius: 12,
            padding: "16px 12px",
            border: "1px solid rgba(255,255,255,0.06)",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>{item.emoji}</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{item.name}</div>
            <div style={{ fontSize: 12, color: "#22c55e", fontWeight: 700 }}>{item.price}</div>
            <button style={{
              marginTop: 10, width: "100%", padding: "8px",
              background: "rgba(59,130,246,0.15)",
              border: "1px solid rgba(59,130,246,0.3)",
              color: "#60a5fa", borderRadius: 8,
              fontSize: 12, fontWeight: 600, cursor: "pointer",
            }}>Shop</button>
          </div>
        ))}
      </div>

      {/* Ads disclaimer */}
      <div style={{ fontSize: 10, color: "#374151", marginTop: 16, textAlign: "center", lineHeight: 1.6 }}>
        Affiliate links may earn commission. Betting ads subject to local laws.
        Must be 18+ and in eligible jurisdiction to place bets.
      </div>
    </div>
  );
}

// ── ROOT ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "home", label: "🏠 Home" },
  { id: "groups", label: "📊 Groups" },
  { id: "schedule", label: "📅 Schedule" },
  { id: "predict", label: "🎯 Predict" },
  { id: "earn", label: "💰 Earn" },
];

export default function App() {
  const [tab, setTab] = useState("home");

  return (
    <div style={S.app}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { display: none; }
        @keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.5 } }
      `}</style>

      {/* Header */}
      <div style={S.header}>
        <div style={{ fontSize: 32 }}>⚽</div>
        <div>
          <div style={S.headerTitle}>World Cup 2026</div>
          <div style={S.headerSub}>USA · Canada · Mexico · Jun 11 – Jul 19</div>
        </div>
      </div>

      {/* Nav */}
      <div style={S.nav}>
        {TABS.map(t => (
          <button key={t.id} style={S.navBtn(tab === t.id)} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "home" && <HomePage />}
      {tab === "groups" && <GroupsPage />}
      {tab === "schedule" && <SchedulePage />}
      {tab === "predict" && <PredictPage />}
      {tab === "earn" && <MoneyPage />}
    </div>
  );
}
