import { useState, useEffect, useRef } from "react";

// Load Inter from Google Fonts
const _fontLink = document.createElement("link");
_fontLink.rel = "stylesheet";
_fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap";
document.head.appendChild(_fontLink);

const PAYOUTS = { 1: 6, 2: 12, 3: 24, 4: 48, 5: 96, 6: 120 };
const OWNERS = ["Aaron", "Adam", "Andy", "Brent", "Craig", "Matt"];
const REGIONS = ["South", "West", "East", "Midwest"];

const OWNER_COLORS = {
  Aaron: "#f97316", Adam: "#a78bfa", Andy: "#34d399",
  Brent: "#60a5fa", Craig: "#f43f5e", Matt: "#facc15",
};

// ── 2025 Teams ────────────────────────────────────────────────────────────────
const TEAMS_2025 = [
  { id: 1,  region: "South",   seed: 1,  name: "Auburn",          owner: "", price: 0, wins: 4 },
  { id: 2,  region: "South",   seed: 2,  name: "Michigan State",  owner: "", price: 0, wins: 3 },
  { id: 3,  region: "South",   seed: 3,  name: "Iowa State",      owner: "", price: 0, wins: 1 },
  { id: 4,  region: "South",   seed: 4,  name: "Texas A&M",       owner: "", price: 0, wins: 1 },
  { id: 5,  region: "South",   seed: 5,  name: "Michigan",        owner: "", price: 0, wins: 2 },
  { id: 6,  region: "South",   seed: 6,  name: "North Carolina",  owner: "", price: 0, wins: 0 },
  { id: 7,  region: "South",   seed: 7,  name: "Marquette",       owner: "", price: 0, wins: 0 },
  { id: 8,  region: "South",   seed: 8,  name: "Louisville",      owner: "", price: 0, wins: 0 },
  { id: 9,  region: "South",   seed: 9,  name: "Creighton",       owner: "", price: 0, wins: 1 },
  { id: 10, region: "South",   seed: 10, name: "New Mexico",      owner: "", price: 0, wins: 1 },
  { id: 11, region: "South",   seed: 11, name: "Ole Miss",        owner: "", price: 0, wins: 2 },
  { id: 12, region: "South",   seed: 12, name: "UC San Diego",    owner: "", price: 0, wins: 0 },
  { id: 13, region: "South",   seed: 13, name: "Yale",            owner: "", price: 0, wins: 0 },
  { id: 14, region: "South",   seed: 14, name: "Lipscomb",        owner: "", price: 0, wins: 0 },
  { id: 15, region: "South",   seed: 15, name: "Bryant",          owner: "", price: 0, wins: 0 },
  { id: 16, region: "South",   seed: 16, name: "Alabama State",   owner: "", price: 0, wins: 0 },
  { id: 17, region: "West",    seed: 1,  name: "Florida",         owner: "", price: 0, wins: 6 },
  { id: 18, region: "West",    seed: 2,  name: "St. John's",      owner: "", price: 0, wins: 1 },
  { id: 19, region: "West",    seed: 3,  name: "Texas Tech",      owner: "", price: 0, wins: 3 },
  { id: 20, region: "West",    seed: 4,  name: "Maryland",        owner: "", price: 0, wins: 2 },
  { id: 21, region: "West",    seed: 5,  name: "Memphis",         owner: "", price: 0, wins: 0 },
  { id: 22, region: "West",    seed: 6,  name: "Missouri",        owner: "", price: 0, wins: 0 },
  { id: 23, region: "West",    seed: 7,  name: "Kansas",          owner: "", price: 0, wins: 0 },
  { id: 24, region: "West",    seed: 8,  name: "UConn",           owner: "", price: 0, wins: 1 },
  { id: 25, region: "West",    seed: 9,  name: "Oklahoma",        owner: "", price: 0, wins: 0 },
  { id: 26, region: "West",    seed: 10, name: "Arkansas",        owner: "", price: 0, wins: 2 },
  { id: 27, region: "West",    seed: 11, name: "Drake",           owner: "", price: 0, wins: 1 },
  { id: 28, region: "West",    seed: 12, name: "Colorado State",  owner: "", price: 0, wins: 1 },
  { id: 29, region: "West",    seed: 13, name: "Grand Canyon",    owner: "", price: 0, wins: 0 },
  { id: 30, region: "West",    seed: 14, name: "UNC Wilmington",  owner: "", price: 0, wins: 0 },
  { id: 31, region: "West",    seed: 15, name: "Omaha",           owner: "", price: 0, wins: 0 },
  { id: 32, region: "West",    seed: 16, name: "Norfolk State",   owner: "", price: 0, wins: 0 },
  { id: 33, region: "East",    seed: 1,  name: "Duke",            owner: "", price: 0, wins: 4 },
  { id: 34, region: "East",    seed: 2,  name: "Alabama",         owner: "", price: 0, wins: 3 },
  { id: 35, region: "East",    seed: 3,  name: "Wisconsin",       owner: "", price: 0, wins: 1 },
  { id: 36, region: "East",    seed: 4,  name: "Arizona",         owner: "", price: 0, wins: 2 },
  { id: 37, region: "East",    seed: 5,  name: "Oregon",          owner: "", price: 0, wins: 1 },
  { id: 38, region: "East",    seed: 6,  name: "BYU",             owner: "", price: 0, wins: 2 },
  { id: 39, region: "East",    seed: 7,  name: "Saint Mary's",    owner: "", price: 0, wins: 1 },
  { id: 40, region: "East",    seed: 8,  name: "Baylor",          owner: "", price: 0, wins: 1 },
  { id: 41, region: "East",    seed: 9,  name: "Mississippi St.", owner: "", price: 0, wins: 0 },
  { id: 42, region: "East",    seed: 10, name: "Vanderbilt",      owner: "", price: 0, wins: 0 },
  { id: 43, region: "East",    seed: 11, name: "VCU",             owner: "", price: 0, wins: 0 },
  { id: 44, region: "East",    seed: 12, name: "Liberty",         owner: "", price: 0, wins: 0 },
  { id: 45, region: "East",    seed: 13, name: "Akron",           owner: "", price: 0, wins: 0 },
  { id: 46, region: "East",    seed: 14, name: "Montana",         owner: "", price: 0, wins: 0 },
  { id: 47, region: "East",    seed: 15, name: "Robert Morris",   owner: "", price: 0, wins: 0 },
  { id: 48, region: "East",    seed: 16, name: "Mt. St. Mary's",  owner: "", price: 0, wins: 0 },
  { id: 49, region: "Midwest", seed: 1,  name: "Houston",         owner: "", price: 0, wins: 5 },
  { id: 50, region: "Midwest", seed: 2,  name: "Tennessee",       owner: "", price: 0, wins: 3 },
  { id: 51, region: "Midwest", seed: 3,  name: "Kentucky",        owner: "", price: 0, wins: 2 },
  { id: 52, region: "Midwest", seed: 4,  name: "Purdue",          owner: "", price: 0, wins: 2 },
  { id: 53, region: "Midwest", seed: 5,  name: "Clemson",         owner: "", price: 0, wins: 0 },
  { id: 54, region: "Midwest", seed: 6,  name: "Xavier",          owner: "", price: 0, wins: 0 },
  { id: 55, region: "Midwest", seed: 7,  name: "UCLA",            owner: "", price: 0, wins: 1 },
  { id: 56, region: "Midwest", seed: 8,  name: "Georgia",         owner: "", price: 0, wins: 0 },
  { id: 57, region: "Midwest", seed: 9,  name: "Gonzaga",         owner: "", price: 0, wins: 1 },
  { id: 58, region: "Midwest", seed: 10, name: "Utah State",      owner: "", price: 0, wins: 0 },
  { id: 59, region: "Midwest", seed: 11, name: "Illinois",        owner: "", price: 0, wins: 1 },
  { id: 60, region: "Midwest", seed: 12, name: "McNeese",         owner: "", price: 0, wins: 1 },
  { id: 61, region: "Midwest", seed: 13, name: "High Point",      owner: "", price: 0, wins: 0 },
  { id: 62, region: "Midwest", seed: 14, name: "Troy",            owner: "", price: 0, wins: 0 },
  { id: 63, region: "Midwest", seed: 15, name: "Wofford",         owner: "", price: 0, wins: 0 },
  { id: 64, region: "Midwest", seed: 16, name: "SIUE",            owner: "", price: 0, wins: 0 },
];

// ── Historical Data ───────────────────────────────────────────────────────────
const HISTORY = {
  2024: {
    champion: "UConn",
    finalFour: ["UConn", "Purdue", "NC State", "Alabama"],
    champOwner: "Craig",
    teams: [
      { region:"West",   seed:1,  name:"North Carolina", owner:"Andy",  price:18.0, wins:2 },
      { region:"West",   seed:2,  name:"Arizona",        owner:"Craig", price:27.0, wins:2 },
      { region:"West",   seed:3,  name:"Baylor",         owner:"Brent", price:15.5, wins:1 },
      { region:"West",   seed:4,  name:"Alabama",        owner:"Brent", price:17.0, wins:4 },
      { region:"West",   seed:5,  name:"Saint Mary's",   owner:"Adam",  price:12.0, wins:0 },
      { region:"West",   seed:6,  name:"Clemson",        owner:"Andy",  price:6.5,  wins:3 },
      { region:"West",   seed:7,  name:"Dayton",         owner:"Matt",  price:10.0, wins:1 },
      { region:"West",   seed:8,  name:"Mississippi St.",owner:"Craig", price:5.5,  wins:0 },
      { region:"West",   seed:9,  name:"Michigan State", owner:"Adam",  price:4.5,  wins:1 },
      { region:"West",   seed:10, name:"Nevada",         owner:"Adam",  price:5.0,  wins:0 },
      { region:"West",   seed:11, name:"New Mexico",     owner:"Brent", price:6.5,  wins:0 },
      { region:"West",   seed:12, name:"Grand Canyon",   owner:"Aaron", price:4.0,  wins:1 },
      { region:"West",   seed:13, name:"Charleston",     owner:"Craig", price:3.0,  wins:0 },
      { region:"West",   seed:14, name:"Colgate",        owner:"Matt",  price:1.0,  wins:0 },
      { region:"West",   seed:15, name:"Long Beach St.", owner:"Craig", price:2.5,  wins:0 },
      { region:"West",   seed:16, name:"Wagner",         owner:"Brent", price:0.5,  wins:0 },
      { region:"East",   seed:1,  name:"UConn",          owner:"Craig", price:48.5, wins:6 },
      { region:"East",   seed:2,  name:"Iowa State",     owner:"Matt",  price:23.5, wins:2 },
      { region:"East",   seed:3,  name:"Illinois",       owner:"Aaron", price:20.0, wins:3 },
      { region:"East",   seed:4,  name:"Auburn",         owner:"Adam",  price:20.0, wins:0 },
      { region:"East",   seed:5,  name:"San Diego St.",  owner:"Aaron", price:7.0,  wins:2 },
      { region:"East",   seed:6,  name:"BYU",            owner:"Brent", price:9.5,  wins:0 },
      { region:"East",   seed:7,  name:"Washington St.", owner:"Matt",  price:6.5,  wins:1 },
      { region:"East",   seed:8,  name:"FAU",            owner:"Andy",  price:22.5, wins:0 },
      { region:"East",   seed:9,  name:"Northwestern",   owner:"Craig", price:4.5,  wins:1 },
      { region:"East",   seed:10, name:"Drake",          owner:"Aaron", price:4.0,  wins:0 },
      { region:"East",   seed:11, name:"Duquesne",       owner:"Brent", price:1.5,  wins:1 },
      { region:"East",   seed:12, name:"UAB",            owner:"Aaron", price:2.0,  wins:0 },
      { region:"East",   seed:13, name:"Yale",           owner:"Aaron", price:2.0,  wins:1 },
      { region:"East",   seed:14, name:"Morehead State", owner:"Aaron", price:6.5,  wins:0 },
      { region:"East",   seed:15, name:"S. Dakota St.",  owner:"Aaron", price:1.0,  wins:0 },
      { region:"East",   seed:16, name:"Stetson",        owner:"Andy",  price:0.5,  wins:0 },
      { region:"South",  seed:1,  name:"Houston",        owner:"Brent", price:38.5, wins:2 },
      { region:"South",  seed:2,  name:"Marquette",      owner:"Andy",  price:21.0, wins:2 },
      { region:"South",  seed:3,  name:"Kentucky",       owner:"Aaron", price:17.0, wins:0 },
      { region:"South",  seed:4,  name:"Duke",           owner:"Andy",  price:16.0, wins:3 },
      { region:"South",  seed:5,  name:"Wisconsin",      owner:"Craig", price:7.0,  wins:0 },
      { region:"South",  seed:6,  name:"Texas Tech",     owner:"Aaron", price:8.0,  wins:0 },
      { region:"South",  seed:7,  name:"Florida",        owner:"Matt",  price:8.0,  wins:0 },
      { region:"South",  seed:8,  name:"Nebraska",       owner:"Aaron", price:6.0,  wins:0 },
      { region:"South",  seed:9,  name:"Texas A&M",      owner:"Brent", price:4.0,  wins:1 },
      { region:"South",  seed:10, name:"Colorado",       owner:"Adam",  price:5.5,  wins:1 },
      { region:"South",  seed:11, name:"NC State",       owner:"Aaron", price:5.0,  wins:4 },
      { region:"South",  seed:12, name:"James Madison",  owner:"Matt",  price:4.0,  wins:1 },
      { region:"South",  seed:13, name:"Vermont",        owner:"Adam",  price:4.0,  wins:0 },
      { region:"South",  seed:14, name:"Oakland",        owner:"Craig", price:2.0,  wins:1 },
      { region:"South",  seed:15, name:"W. Kentucky",    owner:"Brent", price:1.0,  wins:0 },
      { region:"South",  seed:16, name:"Longwood",       owner:"Andy",  price:0.5,  wins:0 },
      { region:"Midwest",seed:1,  name:"Purdue",         owner:"Matt",  price:23.5, wins:5 },
      { region:"Midwest",seed:2,  name:"Tennessee",      owner:"Adam",  price:15.5, wins:3 },
      { region:"Midwest",seed:3,  name:"Creighton",      owner:"Adam",  price:18.0, wins:2 },
      { region:"Midwest",seed:4,  name:"Kansas",         owner:"Andy",  price:7.0,  wins:1 },
      { region:"Midwest",seed:5,  name:"Gonzaga",        owner:"Adam",  price:10.0, wins:2 },
      { region:"Midwest",seed:6,  name:"South Carolina", owner:"Andy",  price:7.5,  wins:0 },
      { region:"Midwest",seed:7,  name:"Texas",          owner:"Aaron", price:8.0,  wins:1 },
      { region:"Midwest",seed:8,  name:"Utah State",     owner:"Aaron", price:9.0,  wins:1 },
      { region:"Midwest",seed:9,  name:"TCU",            owner:"Brent", price:5.0,  wins:0 },
      { region:"Midwest",seed:10, name:"Colorado State", owner:"Adam",  price:5.5,  wins:0 },
      { region:"Midwest",seed:11, name:"Oregon",         owner:"Matt",  price:17.5, wins:1 },
      { region:"Midwest",seed:12, name:"McNeese",        owner:"Matt",  price:2.0,  wins:0 },
      { region:"Midwest",seed:13, name:"Samford",        owner:"Matt",  price:4.0,  wins:0 },
      { region:"Midwest",seed:14, name:"Akron",          owner:"Brent", price:1.0,  wins:0 },
      { region:"Midwest",seed:15, name:"Saint Peter's",  owner:"Aaron", price:0.5,  wins:0 },
      { region:"Midwest",seed:16, name:"Grambling State",owner:"Andy",  price:0.5,  wins:0 },
    ],
  },
};

function calcOwnerStats(teams) {
  return OWNERS.map(owner => {
    const myTeams = teams.filter(t => t.owner === owner);
    const spent = myTeams.reduce((s, t) => s + t.price, 0);
    const earned = myTeams.reduce((s, t) => s + (PAYOUTS[t.wins] || 0), 0);
    const wins = myTeams.reduce((s, t) => s + t.wins, 0);
    const roi = spent > 0 ? ((earned - spent) / spent) * 100 : 0;
    const alive = myTeams.filter(t => t.alive !== false).length;
    return { owner, spent, earned, wins, roi, net: earned - spent, alive, teams: myTeams };
  }).sort((a, b) => b.earned - a.earned);
}

function Badge({ children, color }) {
  return (
    <span style={{
      background: color + "22", color, border: `1px solid ${color}55`,
      borderRadius: 4, padding: "2px 7px", fontSize: 11, fontWeight: 700,
      letterSpacing: "0.05em", textTransform: "uppercase",
    }}>{children}</span>
  );
}

function OwnerAvatar({ owner, size = 32 }) {
  if (!owner || !OWNER_COLORS[owner]) return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "#30363d", border: "2px solid #d0d0ca",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.38, fontWeight: 800, color: "#8b949e", flexShrink: 0,
    }}>?</div>
  );
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: OWNER_COLORS[owner] + "22", border: `2px solid ${OWNER_COLORS[owner]}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.38, fontWeight: 800, color: OWNER_COLORS[owner], flexShrink: 0,
    }}>{owner[0]}</div>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{ background: "#161b22", borderRadius: 12, padding: "16px 20px", flex: 1, minWidth: 100, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
      <div style={{ fontSize: 10, color: "#8b949e", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 900, color: accent || "#e6edf3", lineHeight: 1, fontFamily: "'Inter', system-ui, sans-serif" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

// ── LEADERBOARD ───────────────────────────────────────────────────────────────
function Leaderboard({ teams }) {
  const stats = calcOwnerStats(teams);
  const [expanded, setExpanded] = useState(null);
  const totalPot = teams.reduce((s, t) => s + t.price, 0);
  const totalPaid = teams.reduce((s, t) => s + (PAYOUTS[t.wins] || 0), 0);
  const champ = teams.find(t => t.wins === 6);

  return (
    <div style={{ paddingBottom: 40 }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 10, color: "#8b949e", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>Season Overview</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <StatCard label="Total Pot" value={`$${totalPot.toFixed(0)}`} sub="Auction spend" accent="#f59e0b" />
          <StatCard label="Paid Out" value={`$${totalPaid}`} sub="Winnings" accent="#10b981" />
          <StatCard label="Teams" value={teams.length} sub="In pool" accent="#e6edf3" />
          {champ
            ? <StatCard label="Champion" value={champ.name} sub={champ.owner ? `owned by ${champ.owner}` : "—"} accent="#f59e0b" />
            : <StatCard label="Champion" value="TBD" sub="Season ongoing" accent="#888" />
          }
        </div>
      </div>

      {stats.map((s, i) => (
        <div key={s.owner} style={{
          background: "#161b22",
          border: `1px solid ${expanded === s.owner ? OWNER_COLORS[s.owner] + "88" : "#30363d"}`,
          borderRadius: 14, marginBottom: 8, overflow: "hidden",
          boxShadow: expanded === s.owner ? `0 4px 20px ${OWNER_COLORS[s.owner]}22` : "0 1px 4px rgba(0,0,0,0.06)",
          transition: "all 0.2s",
        }}>
          <div onClick={() => setExpanded(expanded === s.owner ? null : s.owner)}
            style={{ padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: "#484f58", minWidth: 24, textAlign: "center", fontFamily: "'Inter', system-ui, sans-serif" }}>{i + 1}</div>
            <OwnerAvatar owner={s.owner} size={40} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 16, fontWeight: 800, color: "#e6edf3", fontFamily: "'Inter', system-ui, sans-serif" }}>{s.owner}</span>
                {s.alive > 0 && <Badge color="#10b981">🔥 {s.alive} alive</Badge>}
              </div>
              <div style={{ fontSize: 12, color: "#8b949e", marginTop: 2 }}>{s.wins} wins · {s.teams.length} teams</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: s.net >= 0 ? "#10b981" : "#ef4444", fontFamily: "'Inter', system-ui, sans-serif" }}>
                {s.net >= 0 ? "+" : ""}${s.net.toFixed(0)}
              </div>
              <div style={{ fontSize: 11, color: "#8b949e" }}>{s.roi >= 0 ? "+" : ""}{s.roi.toFixed(0)}% ROI</div>
            </div>
            <div style={{ color: "#484f58", fontSize: 14, marginLeft: 4 }}>{expanded === s.owner ? "▲" : "▼"}</div>
          </div>

          {expanded === s.owner && (
            <div style={{ borderTop: "1px solid #21262d", padding: "14px 18px", background: "#0d1117" }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                <StatCard label="Spent" value={`$${s.spent.toFixed(0)}`} accent="#e6edf3" />
                <StatCard label="Earned" value={`$${s.earned}`} accent="#10b981" />
                <StatCard label="Net" value={`${s.net >= 0 ? "+" : ""}$${s.net.toFixed(0)}`} accent={s.net >= 0 ? "#10b981" : "#ef4444"} />
                <StatCard label="ROI" value={`${s.roi.toFixed(0)}%`} accent={s.roi >= 0 ? "#10b981" : "#ef4444"} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
                {[...s.teams].sort((a, b) => b.wins - a.wins).map((t, idx) => {
                  const net = (PAYOUTS[t.wins] || 0) - t.price;
                  const isElim = t.alive === false;
                  return (
                    <div key={idx} style={{
                      background: "#161b22", borderRadius: 10, padding: "10px 12px",
                      border: `1px solid ${t.wins > 0 && !isElim ? OWNER_COLORS[s.owner] + "44" : "#30363d"}`,
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      opacity: isElim ? 0.5 : 1,
                    }}>
                      <div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <span style={{ fontSize: 10, color: "#484f58", fontWeight: 700 }}>#{t.seed}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: isElim ? "#484f58" : "#e6edf3", textDecoration: isElim ? "line-through" : "none" }}>{t.name}</span>
                        </div>
                        <div style={{ fontSize: 11, color: "#8b949e", marginTop: 2 }}>Paid ${t.price.toFixed(2)} · {t.wins}W</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: net >= 0 ? "#10b981" : "#ef4444" }}>
                          {net >= 0 ? "+" : ""}${net.toFixed(2)}
                        </div>
                        {t.wins > 0 && <div style={{ fontSize: 10, color: "#f59e0b" }}>{"★".repeat(Math.min(t.wins, 6))}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── TOURNAMENT BRACKET ────────────────────────────────────────────────────────
// Standard seed matchups per region, in display order (top to bottom)
const SEED_PAIRS = [[1,16],[8,9],[5,12],[4,13],[6,11],[3,14],[7,10],[2,15]];
const ROUND_NAMES = ["Round of 64","Round of 32","Sweet 16","Elite 8","Final Four","Championship","Champion"];

function TeamSlot({ team, round, isWinner, isElim }) {
  if (!team) return (
    <div style={{
      height: 44, borderRadius: 6, background: "#161b22",
      border: "1px dashed #30363d", display: "flex", alignItems: "center",
      paddingLeft: 10, color: "#484f58", fontSize: 12,
    }}>TBD</div>
  );
  const color = team.owner ? OWNER_COLORS[team.owner] : "#ccc";
  const eliminated = isElim || (team.alive === false);
  return (
    <div style={{
      height: 44, borderRadius: 6,
      background: isWinner ? "#fff" : eliminated ? "#f9f9f8" : "#fff",
      border: `1px solid ${isWinner ? color : "#30363d"}`,
      borderLeft: `3px solid ${isWinner ? color : eliminated ? "#30363d" : "#30363d"}`,
      display: "flex", alignItems: "center", gap: 8, padding: "0 10px",
      opacity: eliminated && !isWinner ? 0.45 : 1,
      boxShadow: isWinner ? `0 1px 6px ${color}33` : "none",
      transition: "all 0.15s",
    }}>
      <span style={{
        fontSize: 10, fontWeight: 700, color: "#484f58",
        minWidth: 16, textAlign: "center",
      }}>{team.seed}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 12, fontWeight: isWinner ? 800 : 600,
          color: eliminated && !isWinner ? "#484f58" : "#e6edf3",
          textDecoration: eliminated && !isWinner ? "line-through" : "none",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{team.name}</div>
        {team.owner && (
          <div style={{ fontSize: 10, color, fontWeight: 700, marginTop: 1 }}>{team.owner}</div>
        )}
      </div>
      {isWinner && <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0 }} />}
    </div>
  );
}

function Matchup({ top, bottom, round }) {
  // Determine winner based on wins count
  const topWins = top?.wins || 0;
  const bottomWins = bottom?.wins || 0;
  const topAdvanced = topWins >= round;
  const bottomAdvanced = bottomWins >= round;
  // If both have enough wins it's ambiguous — highlight the one with more
  const topWinner = topAdvanced && !bottomAdvanced;
  const bottomWinner = bottomAdvanced && !topAdvanced;

  return (
    <div style={{ marginBottom: 4 }}>
      <TeamSlot team={top} round={round} isWinner={topWinner} isElim={top && topWins < round - 1} />
      <div style={{ height: 3 }} />
      <TeamSlot team={bottom} round={round} isWinner={bottomWinner} isElim={bottom && bottomWins < round - 1} />
    </div>
  );
}

function RegionBracket({ region, teams }) {
  const bySeeds = {};
  teams.forEach(t => { bySeeds[t.seed] = t; });

  // Build rounds: each round halves the field
  // Round 1: 8 matchups from seed pairs
  // Round 2: winners of (1v16 vs 8v9), (5v12 vs 4v13), (6v11 vs 3v14), (7v10 vs 2v15)
  // etc.

  // For display, derive "who appears in each slot" from wins
  // A team appears in round R if wins >= R-1
  const inRound = (team, r) => (team?.wins || 0) >= r - 1;

  // Round 1 matchups — fixed seed pairs
  const r1 = SEED_PAIRS.map(([s1, s2]) => ({ top: bySeeds[s1], bottom: bySeeds[s2] }));

  // Round 2: group r1 matchups into pairs, winner of each advances
  const r2 = [
    { top: r1[0].top?.wins >= 1 ? r1[0].top : r1[0].bottom?.wins >= 1 ? r1[0].bottom : null,
      bottom: r1[1].top?.wins >= 1 ? r1[1].top : r1[1].bottom?.wins >= 1 ? r1[1].bottom : null },
    { top: r1[2].top?.wins >= 1 ? r1[2].top : r1[2].bottom?.wins >= 1 ? r1[2].bottom : null,
      bottom: r1[3].top?.wins >= 1 ? r1[3].top : r1[3].bottom?.wins >= 1 ? r1[3].bottom : null },
    { top: r1[4].top?.wins >= 1 ? r1[4].top : r1[4].bottom?.wins >= 1 ? r1[4].bottom : null,
      bottom: r1[5].top?.wins >= 1 ? r1[5].top : r1[5].bottom?.wins >= 1 ? r1[5].bottom : null },
    { top: r1[6].top?.wins >= 1 ? r1[6].top : r1[6].bottom?.wins >= 1 ? r1[6].bottom : null,
      bottom: r1[7].top?.wins >= 1 ? r1[7].top : r1[7].bottom?.wins >= 1 ? r1[7].bottom : null },
  ];

  // Round 3 (Sweet 16)
  const winner = (m, minWins) => {
    if (m.top?.wins >= minWins) return m.top;
    if (m.bottom?.wins >= minWins) return m.bottom;
    return null;
  };
  const r3 = [
    { top: winner(r2[0], 2), bottom: winner(r2[1], 2) },
    { top: winner(r2[2], 2), bottom: winner(r2[3], 2) },
  ];

  // Round 4 (Elite 8)
  const r4 = [{ top: winner(r3[0], 3), bottom: winner(r3[1], 3) }];

  // Regional champ (4 wins)
  const champ = winner(r4[0], 4);

  const rounds = [
    { name: "R64", matchups: r1, round: 1 },
    { name: "R32", matchups: r2, round: 2 },
    { name: "S16", matchups: r3, round: 3 },
    { name: "E8",  matchups: r4, round: 4 },
  ];

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#8b949e", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>
        {region} Region
      </div>
      <div style={{ overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 12, minWidth: 640 }}>
          {rounds.map(({ name, matchups, round }) => (
            <div key={name} style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#484f58", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, textAlign: "center" }}>{name}</div>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", height: "100%" }}>
                {matchups.map((m, i) => (
                  <div key={i} style={{ marginBottom: round === 1 ? 8 : round === 2 ? 24 : round === 3 ? 56 : 0 }}>
                    <Matchup top={m.top} bottom={m.bottom} round={round} />
                  </div>
                ))}
              </div>
            </div>
          ))}
          {/* Regional champ column */}
          <div style={{ width: 160, flexShrink: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#484f58", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, textAlign: "center" }}>Champ</div>
            <div style={{ marginTop: 140 }}>
              <TeamSlot team={champ} round={4} isWinner={champ?.wins >= 4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TournamentBracket({ teams }) {
  // Final Four: teams with 4+ wins
  const ff = teams.filter(t => t.wins >= 4).sort((a, b) => b.wins - a.wins);
  // Championship game: teams with 5+ wins
  const finalists = teams.filter(t => t.wins >= 5);
  const champion = teams.find(t => t.wins >= 6);

  // Map regions to Final Four slots (South vs West, East vs Midwest is standard)
  const ffSouth  = ff.find(t => t.region === "South");
  const ffWest   = ff.find(t => t.region === "West");
  const ffEast   = ff.find(t => t.region === "East");
  const ffMidwest= ff.find(t => t.region === "Midwest");

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Regional brackets */}
      {REGIONS.map(region => (
        <RegionBracket
          key={region}
          region={region}
          teams={teams.filter(t => t.region === region)}
        />
      ))}

      {/* Final Four + Championship */}
      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#8b949e", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>
          Final Four & Championship
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {/* Semifinal 1: South vs West */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontSize: 10, color: "#484f58", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Semifinal 1</div>
            <Matchup top={ffSouth} bottom={ffWest} round={5} />
          </div>
          {/* Semifinal 2: East vs Midwest */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <div style={{ fontSize: 10, color: "#484f58", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Semifinal 2</div>
            <Matchup top={ffEast} bottom={ffMidwest} round={5} />
          </div>
        </div>

        {/* Championship */}
        <div style={{ marginTop: 20, maxWidth: 320 }}>
          <div style={{ fontSize: 10, color: "#484f58", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Championship</div>
          <Matchup top={finalists[0] || null} bottom={finalists[1] || null} round={6} />
        </div>

        {/* Champion */}
        {champion && (
          <div style={{ marginTop: 20, maxWidth: 320 }}>
            <div style={{ fontSize: 10, color: "#f59e0b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Champion</div>
            <TeamSlot team={champion} round={6} isWinner={true} />
          </div>
        )}
      </div>
    </div>
  );
}

// ── BRACKET VIEW ──────────────────────────────────────────────────────────────
function BracketView({ teams }) {
  const [filterOwner, setFilterOwner] = useState("All");
  return (
    <div style={{ paddingBottom: 40 }}>
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {["All", ...OWNERS].map(o => (
          <button key={o} onClick={() => setFilterOwner(o)} style={{
            padding: "6px 16px", borderRadius: 20,
            border: filterOwner === o ? "none" : "1px solid #30363d",
            cursor: "pointer",
            background: filterOwner === o ? (OWNER_COLORS[o] || "#e6edf3") : "#21262d",
            color: filterOwner === o ? "#000" : "#8b949e",
            fontWeight: 700, fontSize: 13, transition: "all 0.15s",
            boxShadow: filterOwner === o ? `0 2px 8px ${(OWNER_COLORS[o] || "#000")}44` : "none",
          }}>{o}</button>
        ))}
      </div>
      {REGIONS.map(region => {
        const regionTeams = teams.filter(t => t.region === region && (filterOwner === "All" || t.owner === filterOwner)).sort((a, b) => a.seed - b.seed);
        if (regionTeams.length === 0) return null;
        return (
          <div key={region} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 10, color: "#8b949e", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>{region} Region</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
              {regionTeams.map((t, idx) => {
                const payout = PAYOUTS[t.wins] || 0;
                const net = payout - t.price;
                const isElim = t.alive === false;
                return (
                  <div key={idx} style={{
                    background: "#161b22",
                    border: `1px solid ${isElim ? "#eee" : t.wins > 0 ? (OWNER_COLORS[t.owner] || "#f59e0b") + "55" : "#30363d"}`,
                    borderLeft: `3px solid ${isElim ? "#30363d" : t.wins > 0 ? (OWNER_COLORS[t.owner] || "#f59e0b") : "#30363d"}`,
                    borderRadius: 8, padding: "10px 14px",
                    opacity: isElim ? 0.45 : filterOwner !== "All" && t.owner !== filterOwner ? 0.3 : 1,
                    transition: "opacity 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3 }}>
                          <span style={{ fontSize: 11, background: "#0d1117", color: "#8b949e", borderRadius: 4, padding: "1px 5px", fontWeight: 700 }}>{t.seed}</span>
                          <span style={{ fontSize: 14, fontWeight: 800, color: isElim ? "#484f58" : "#e6edf3", textDecoration: isElim ? "line-through" : "none" }}>{t.name}</span>
                          {isElim && <span style={{ fontSize: 10, background: "#2d1111", color: "#ef4444", border: "1px solid #fecaca", borderRadius: 4, padding: "1px 5px", fontWeight: 700 }}>ELIM</span>}
                        </div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <OwnerAvatar owner={t.owner} size={18} />
                          <span style={{ fontSize: 12, color: t.owner ? OWNER_COLORS[t.owner] : "#bbb", fontWeight: 700 }}>{t.owner || "Unassigned"}</span>
                          {t.price > 0 && <span style={{ fontSize: 11, color: "#484f58" }}>${t.price.toFixed(2)}</span>}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        {t.price > 0 && (
                          <div style={{ fontSize: 15, fontWeight: 900, color: net >= 0 ? "#10b981" : "#ef4444" }}>
                            {net >= 0 ? "+" : ""}${net.toFixed(2)}
                          </div>
                        )}
                        <div style={{ fontSize: 11, color: "#484f58" }}>{t.wins}W · ${payout}</div>
                      </div>
                    </div>
                    {t.wins > 0 && (
                      <div style={{ marginTop: 8, display: "flex", gap: 3 }}>
                        {[1,2,3,4,5,6].map(r => (
                          <div key={r} style={{ flex: 1, height: 3, borderRadius: 2, background: r <= t.wins ? (OWNER_COLORS[t.owner] || "#f59e0b") : "#0d1117" }} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── AUCTION ROOM ──────────────────────────────────────────────────────────────
function AuctionRoom({ teams, setTeams, isAdmin }) {
  const [pickedTeam, setPickedTeam] = useState(null);
  const [bids, setBids] = useState({});
  const [log, setLog] = useState([]);
  const [phase, setPhase] = useState("idle");
  const [rollIndex, setRollIndex] = useState(0);
  const [raises, setRaises] = useState({});
  const [goingStage, setGoingStage] = useState(0);
  const rollTimer = useRef(null);
  const logRef = useRef(null);
  const isSyncing = useRef(false);

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [log]);

  const totalSpent = (owner) => teams.filter(t => t.owner === owner).reduce((s, t) => s + t.price, 0);
  const unsoldTeams = teams.filter(t => !t.owner);

  // ── Load + subscribe to auction state ─────────────────────────────────────
  useEffect(() => {
    sb.get("auction_state", { id: 1 }).then(rows => {
      if (rows && rows[0]) applyRemoteState(rows[0]);
    }).catch(() => {});
    const unsub = sb.subscribeAny("auction_state", (row) => {
      if (!isSyncing.current) applyRemoteState(row);
    });
    return unsub;
  }, []);

  const applyRemoteState = (row) => {
    setPhase(row.phase || "idle");
    setBids(row.bids || {});
    setGoingStage(row.going_stage || 0);
    setLog(row.log || []);
    if (row.team_id) {
      const t = teams.find(t => t.id === row.team_id);
      setPickedTeam(t || null);
    } else {
      setPickedTeam(null);
    }
  };

  const pushState = async (updates) => {
    isSyncing.current = true;
    try {
      await sb.upsert("auction_state", { id: 1, updated_at: new Date().toISOString(), ...updates });
    } catch (e) { console.error("auction sync error", e); }
    setTimeout(() => { isSyncing.current = false; }, 300);
  };

  // ── Pick a random team with slot-machine animation ─────────────────────────
  const pickRandom = () => {
    if (unsoldTeams.length === 0) return;
    setPhase("rolling");
    const winner = unsoldTeams[Math.floor(Math.random() * unsoldTeams.length)];
    let count = 0;
    const totalTicks = 22;
    const tick = () => {
      const progress = count / totalTicks;
      const delay = 60 + Math.pow(progress, 2) * 540;
      setRollIndex(Math.floor(Math.random() * unsoldTeams.length));
      count++;
      if (count < totalTicks) {
        rollTimer.current = setTimeout(tick, delay);
      } else {
        setPickedTeam(winner);
        setRollIndex(unsoldTeams.indexOf(winner));
        setPhase("reveal");
        pushState({ phase: "reveal", team_id: winner.id, bids: {}, going_stage: 0 });
      }
    };
    tick();
  };

  // ── Open bidding ───────────────────────────────────────────────────────────
  const startBidding = () => {
    const freshBids = Object.fromEntries(OWNERS.map(o => [o, 0]));
    setBids(freshBids);
    setRaises(Object.fromEntries(OWNERS.map(o => [o, ""])));
    setGoingStage(0);
    setPhase("bidding");
    pushState({ phase: "bidding", bids: freshBids, going_stage: 0 });
  };

  // ── Submit a raise ─────────────────────────────────────────────────────────
  const submitRaise = (owner) => {
    const val = parseFloat(raises[owner]);
    const currentHigh = Math.max(...Object.values(bids));
    if (isNaN(val) || val <= 0) return;
    if (val <= currentHigh && currentHigh > 0) {
      alert(`Must beat current high of $${currentHigh.toFixed(2)}`);
      return;
    }
    const newBids = { ...bids, [owner]: val };
    setBids(newBids);
    setRaises(prev => ({ ...prev, [owner]: "" }));
    setGoingStage(0);
    pushState({ bids: newBids, going_stage: 0 });
  };

  const advanceGoingStage = (stage) => {
    setGoingStage(stage);
    pushState({ going_stage: stage });
  };

  const sortedBidders = Object.entries(bids).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
  const currentLeader = sortedBidders[0];

  // ── Award to highest bidder ────────────────────────────────────────────────
  const soldTeam = () => {
    if (!currentLeader) { alert("No bids yet!"); return; }
    const [winnerOwner, winnerBid] = currentLeader;
    const allBids = sortedBidders.map(([owner, bid]) => ({ owner, bid }));
    const newLog = [...log, {
      team: pickedTeam.name, seed: pickedTeam.seed, region: pickedTeam.region,
      winner: winnerOwner, price: winnerBid, allBids,
      time: new Date().toLocaleTimeString(),
    }];
    setTeams(prev => prev.map(t =>
      t.id === pickedTeam.id ? { ...t, owner: winnerOwner, price: winnerBid } : t
    ));
    setLog(newLog);
    setPhase("sold");
    setPickedTeam(null);
    pushState({ phase: "sold", team_id: null, bids: {}, going_stage: 0, log: newLog });
  };

  const resetToIdle = () => {
    setPhase("idle");
    pushState({ phase: "idle", team_id: null, bids: {}, going_stage: 0 });
  };

  const displayTeam = phase === "rolling" ? unsoldTeams[rollIndex % unsoldTeams.length] : pickedTeam;

  return (
    <div style={{ paddingBottom: 40 }}>

      {/* Budget tracker */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10, marginBottom: 24 }}>
        {OWNERS.map(o => {
          const s = totalSpent(o);
          const remaining = 100 - s;
          return (
            <div key={o} style={{ background: "#161b22", borderRadius: 12, padding: "12px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <OwnerAvatar owner={o} size={26} />
                  <span style={{ fontWeight: 800, color: "#e6edf3", fontSize: 13 }}>{o}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: remaining > 20 ? "#10b981" : remaining > 5 ? "#f59e0b" : "#ef4444" }}>${remaining.toFixed(2)}</span>
              </div>
              <div style={{ background: "#2a2a26", borderRadius: 4, height: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.min((s / 100) * 100, 100)}%`, background: OWNER_COLORS[o], borderRadius: 4, transition: "width 0.4s" }} />
              </div>
              <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>{teams.filter(t => t.owner === o).length} teams · ${s.toFixed(2)} spent</div>
            </div>
          );
        })}
      </div>

      {/* ── IDLE: big Pick button (admin) or waiting message (viewer) ── */}
      {phase === "idle" && (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          {unsoldTeams.length === 0 ? (
            <div style={{ color: "#10b981", fontSize: 20, fontWeight: 800, fontFamily: "'Inter', system-ui, sans-serif" }}>🏆 All {teams.length} teams have been auctioned!</div>
          ) : isAdmin ? (
            <>
              <div style={{ fontSize: 11, color: "#8b949e", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20 }}>
                {unsoldTeams.length} teams remaining
              </div>
              <button onClick={pickRandom} style={{
                background: "#161b22", color: "#fff", border: "none",
                borderRadius: 50, padding: "18px 48px",
                fontSize: 18, fontWeight: 800, cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
              }}>
                🎲 Pick Next Team
              </button>
            </>
          ) : (
            <div style={{ color: "#8b949e", fontSize: 15, fontWeight: 600 }}>
              ⏳ Waiting for next team to be drawn…
              <div style={{ fontSize: 13, marginTop: 8, color: "#484f58" }}>{unsoldTeams.length} teams remaining</div>
            </div>
          )}
        </div>
      )}

      {/* ── ROLLING / REVEAL: slot machine display ── */}
      {(phase === "rolling" || phase === "reveal") && displayTeam && (
        <div style={{
          background: "#161b22",
          border: `2px solid ${phase === "reveal" ? "#f59e0b" : "#2a2a26"}`,
          borderRadius: 16, padding: "28px 24px", marginBottom: 20, textAlign: "center",
          transition: "border-color 0.3s",
          boxShadow: phase === "reveal" ? "0 8px 40px rgba(245,158,11,0.2)" : "0 4px 20px rgba(0,0,0,0.15)",
        }}>
          <div style={{ fontSize: 10, color: "#666", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>
            {phase === "rolling" ? "🎰 Drawing..." : "⭐ Up for Auction"}
          </div>
          <div style={{
            display: "inline-block", background: "#2a2a26",
            borderRadius: 8, padding: "4px 14px", fontSize: 13, fontWeight: 700,
            color: "#8b949e", marginBottom: 12,
          }}>
            #{displayTeam.seed} · {displayTeam.region}
          </div>
          <div style={{
            fontSize: 34, fontWeight: 900, color: "#e6edf3", marginBottom: 6,
            fontFamily: "'Inter', system-ui, sans-serif",
            filter: phase === "rolling" ? "blur(3px)" : "none",
            transition: "filter 0.2s", minHeight: 44,
          }}>
            {displayTeam.name}
          </div>
          {phase === "reveal" && isAdmin && (
            <button onClick={startBidding} style={{
              marginTop: 20, background: "#161b22", color: "#e6edf3", border: "none",
              borderRadius: 50, padding: "14px 36px", fontSize: 16, fontWeight: 800, cursor: "pointer",
              boxShadow: "0 2px 12px rgba(255,255,255,0.1)",
            }}>
              🔨 Open Bidding
            </button>
          )}
          {phase === "reveal" && !isAdmin && (
            <div style={{ marginTop: 16, color: "#666", fontSize: 14, fontWeight: 600 }}>⏳ Waiting for bidding to open…</div>
          )}
        </div>
      )}

      {/* ── BIDDING ── */}
      {phase === "bidding" && pickedTeam && (
        <div style={{ background: "#161b22", borderRadius: 16, padding: 20, marginBottom: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ background: "#f5f5f022", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 800, color: "#e6edf3", textTransform: "uppercase", border: "1px solid #f5f5f033" }}>Live Bidding</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#e6edf3", fontFamily: "'Inter', system-ui, sans-serif" }}>
              #{pickedTeam.seed} {pickedTeam.name}
              <span style={{ color: "#666", fontWeight: 500, fontSize: 14 }}> · {pickedTeam.region}</span>
            </div>
          </div>

          {currentLeader ? (
            <div style={{
              background: `${OWNER_COLORS[currentLeader[0]]}18`,
              border: `1px solid ${OWNER_COLORS[currentLeader[0]]}55`,
              borderRadius: 10, padding: "12px 18px", marginBottom: 18,
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <OwnerAvatar owner={currentLeader[0]} size={32} />
              <div>
                <div style={{ fontSize: 10, color: "#8b949e", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Current High Bid</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: OWNER_COLORS[currentLeader[0]], fontFamily: "'Inter', system-ui, sans-serif" }}>
                  {currentLeader[0]} — <span style={{ color: "#f59e0b" }}>${currentLeader[1].toFixed(2)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background: "#2a2a26", borderRadius: 10, padding: "12px 18px", marginBottom: 18, color: "#666", fontWeight: 600, fontSize: 14 }}>
              No bids yet — enter opening bids below
            </div>
          )}

          {/* Per-owner raise inputs — admin only */}
          {isAdmin && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 20 }}>
              {OWNERS.map(o => {
                const standing = bids[o] || 0;
                const isLeading = currentLeader && currentLeader[0] === o;
                const highBid = currentLeader ? currentLeader[1] : 0;
                return (
                  <div key={o} style={{
                    background: "#222220", borderRadius: 10, padding: "12px 14px",
                    border: `2px solid ${isLeading ? OWNER_COLORS[o] : standing > 0 ? OWNER_COLORS[o] + "44" : "#333"}`,
                  }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                      <OwnerAvatar owner={o} size={22} />
                      <span style={{ fontWeight: 800, color: "#e6edf3", fontSize: 13, flex: 1 }}>{o}</span>
                      {isLeading && <span style={{ fontSize: 10, background: OWNER_COLORS[o], color: "#000", borderRadius: 4, padding: "2px 6px", fontWeight: 900 }}>LEADING</span>}
                    </div>
                    <div style={{ fontSize: 12, color: standing > 0 ? OWNER_COLORS[o] : "#666", fontWeight: 700, marginBottom: 8 }}>
                      {standing > 0 ? `Standing: $${standing.toFixed(2)}` : "No bid"}
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <div style={{ position: "relative", flex: 1 }}>
                        <span style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#666", fontWeight: 700, fontSize: 13 }}>$</span>
                        <input
                          type="number" min={highBid + 0.5} step="0.5"
                          value={raises[o]}
                          onChange={e => setRaises(prev => ({ ...prev, [o]: e.target.value }))}
                          onKeyDown={e => e.key === "Enter" && submitRaise(o)}
                          placeholder={standing > 0 ? "Raise..." : "Open bid..."}
                          style={{
                            width: "100%", background: "#161b22",
                            border: `1px solid ${raises[o] ? OWNER_COLORS[o] : "#333"}`,
                            borderRadius: 6, padding: "7px 8px 7px 20px",
                            color: "#e6edf3", fontSize: 14, fontWeight: 700,
                            outline: "none", boxSizing: "border-box",
                          }}
                        />
                      </div>
                      <button onClick={() => submitRaise(o)} disabled={!raises[o]} style={{
                        background: raises[o] ? OWNER_COLORS[o] : "#333",
                        color: raises[o] ? "#000" : "#666",
                        border: "none", borderRadius: 6, padding: "0 12px",
                        fontWeight: 900, cursor: raises[o] ? "pointer" : "default",
                        fontSize: 14, transition: "all 0.15s",
                      }}>✓</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Read-only bid display for viewers */}
          {!isAdmin && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10, marginBottom: 20 }}>
              {OWNERS.map(o => {
                const standing = bids[o] || 0;
                const isLeading = currentLeader && currentLeader[0] === o;
                return (
                  <div key={o} style={{
                    background: "#222220", borderRadius: 10, padding: "12px 14px",
                    border: `2px solid ${isLeading ? OWNER_COLORS[o] : standing > 0 ? OWNER_COLORS[o] + "44" : "#333"}`,
                  }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                      <OwnerAvatar owner={o} size={22} />
                      <span style={{ fontWeight: 800, color: "#e6edf3", fontSize: 13, flex: 1 }}>{o}</span>
                      {isLeading && <span style={{ fontSize: 10, background: OWNER_COLORS[o], color: "#000", borderRadius: 4, padding: "2px 6px", fontWeight: 900 }}>LEADING</span>}
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: standing > 0 ? OWNER_COLORS[o] : "#555", fontFamily: "'Inter', system-ui, sans-serif" }}>
                      {standing > 0 ? `$${standing.toFixed(2)}` : "—"}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Going once / twice / SOLD */}
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {isAdmin ? (
            <>
              {goingStage === 0 && (
                <button onClick={() => advanceGoingStage(1)} disabled={!currentLeader} style={{
                  background: currentLeader ? "#e6edf3" : "#2a2a26",
                  color: currentLeader ? "#0d1117" : "#555",
                  border: "none", borderRadius: 50, padding: "12px 24px",
                  fontSize: 14, fontWeight: 800, cursor: currentLeader ? "pointer" : "default",
                }}>Going Once…</button>
              )}
              {goingStage === 1 && (
                <>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#f59e0b" }}>Going once…</div>
                  <button onClick={() => advanceGoingStage(2)} style={{ background: "#f59e0b", color: "#000", border: "none", borderRadius: 50, padding: "12px 24px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>Going Twice…</button>
                  <button onClick={() => advanceGoingStage(0)} style={{ background: "#2a2a26", color: "#8b949e", border: "none", borderRadius: 50, padding: "12px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>New bid came in</button>
                </>
              )}
              {goingStage === 2 && (
                <>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#f59e0b" }}>Going twice…</div>
                  <button onClick={soldTeam} style={{ background: "#10b981", color: "#000", border: "none", borderRadius: 50, padding: "12px 28px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>🏆 SOLD</button>
                  <button onClick={() => advanceGoingStage(0)} style={{ background: "#2a2a26", color: "#8b949e", border: "none", borderRadius: 50, padding: "12px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>New bid came in</button>
                </>
              )}
            </>
          ) : (
            <div style={{ color: "#8b949e", fontSize: 14, fontWeight: 600 }}>
              {goingStage === 1 && "⏳ Going once…"}
              {goingStage === 2 && "⏳ Going twice…"}
            </div>
          )}
          </div>
        </div>
      )}

      {/* ── SOLD ── */}
      {phase === "sold" && log.length > 0 && (() => {
        const last = log[log.length - 1];
        return (
          <div style={{
            background: "#161b22",
            border: `2px solid ${OWNER_COLORS[last.winner]}44`,
            borderRadius: 16, padding: 28, marginBottom: 20, textAlign: "center",
            boxShadow: `0 8px 40px ${OWNER_COLORS[last.winner]}22`,
          }}>
            <div style={{ fontSize: 10, color: "#666", marginBottom: 8, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.12em" }}>Sold</div>
            <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>#{last.seed} · {last.region}</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#e6edf3", marginBottom: 6, fontFamily: "'Inter', system-ui, sans-serif" }}>{last.team}</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: OWNER_COLORS[last.winner], marginBottom: 20, fontFamily: "'Inter', system-ui, sans-serif" }}>
              {last.winner} <span style={{ color: "#f59e0b" }}>${last.price.toFixed(2)}</span>
            </div>
            {unsoldTeams.length > 0 ? (
              isAdmin ? (
                <button onClick={resetToIdle} style={{
                  background: "#161b22", color: "#e6edf3", border: "none",
                  borderRadius: 50, padding: "14px 36px", fontSize: 16, fontWeight: 800, cursor: "pointer",
                }}>
                  🎲 Pick Next Team ({unsoldTeams.length} left)
                </button>
              ) : (
                <div style={{ color: "#666", fontSize: 14, fontWeight: 600 }}>⏳ Waiting for next pick… ({unsoldTeams.length} remaining)</div>
              )
            ) : (
              <div style={{ color: "#10b981", fontSize: 18, fontWeight: 800, fontFamily: "'Inter', system-ui, sans-serif" }}>🏆 Auction complete!</div>
            )}
          </div>
        );
      })()}

      {/* ── Auction Log ── */}
      {log.length > 0 && (
        <div style={{ background: "#161b22", border: "1px solid #30363d", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #21262d", fontSize: 11, color: "#8b949e", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Auction Log · {log.length} sold
          </div>
          <div ref={logRef} style={{ maxHeight: 300, overflowY: "auto" }}>
            {[...log].reverse().map((entry, i) => (
              <div key={i} style={{ padding: "12px 18px", borderBottom: "1px solid #f5f5f2", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: 11, color: "#484f58", marginRight: 8 }}>#{entry.seed} · {entry.region}</span>
                  <span style={{ fontWeight: 700, color: "#e6edf3" }}>{entry.team}</span>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ color: OWNER_COLORS[entry.winner], fontWeight: 800 }}>{entry.winner}</span>
                  <span style={{ color: "#f59e0b", fontWeight: 800 }}>${entry.price.toFixed(2)}</span>
                  <span style={{ fontSize: 11, color: "#484f58" }}>{entry.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── ADMIN PANEL ───────────────────────────────────────────────────────────────
function AdminPanel({ teams, setTeams, onReset }) {
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editWins, setEditWins] = useState(0);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const filtered = teams.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    (t.owner && t.owner.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Reset block */}
      <div style={{ background: "#161b22", border: "1px solid #fecaca", borderRadius: 12, padding: 20, marginBottom: 24, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>⚠ Reset Season</div>
        <div style={{ fontSize: 13, color: "#8b949e", marginBottom: 14 }}>
          Clears all owner assignments, prices, and win totals so you can run a fresh auction for a new year. Cannot be undone.
        </div>
        {!showResetConfirm ? (
          <button onClick={() => setShowResetConfirm(true)}
            style={{ background: "#161b22", color: "#ef4444", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 20px", fontWeight: 800, cursor: "pointer", fontSize: 13 }}>
            Reset for New Season
          </button>
        ) : (
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "#666" }}>Are you sure? This cannot be undone.</span>
            <button onClick={() => { onReset(); setShowResetConfirm(false); }}
              style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 800, cursor: "pointer" }}>
              Yes, Reset Everything
            </button>
            <button onClick={() => setShowResetConfirm(false)}
              style={{ background: "#161b22", color: "#8b949e", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 800, cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Win + eliminated editor */}
      <div style={{ fontSize: 10, color: "#8b949e", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 10 }}>Update Teams</div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search teams or owners..."
        style={{ width: "100%", background: "#161b22", border: "1px solid #30363d", borderRadius: 10, padding: "12px 16px", color: "#e6edf3", fontSize: 14, outline: "none", marginBottom: 12, boxSizing: "border-box", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }} />
      {[...filtered].sort((a, b) => b.wins - a.wins).map(t => {
        const isElim = t.alive === false;
        return (
        <div key={t.id} style={{
          background: "#161b22", border: `1px solid ${isElim ? "#161b22" : "#30363d"}`, borderRadius: 10,
          padding: "12px 16px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12,
          opacity: isElim ? 0.6 : 1, boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 11, background: "#0d1117", color: "#8b949e", borderRadius: 4, padding: "1px 5px", fontWeight: 700 }}>{t.seed}</span>
              <span style={{ fontWeight: 700, color: isElim ? "#484f58" : "#e6edf3", textDecoration: isElim ? "line-through" : "none" }}>{t.name}</span>
              <span style={{ fontSize: 11, color: "#484f58" }}>{t.region}</span>
              {isElim && <span style={{ fontSize: 10, background: "#2d1111", color: "#ef4444", border: "1px solid #fecaca", borderRadius: 4, padding: "1px 5px", fontWeight: 700 }}>ELIM</span>}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
              <OwnerAvatar owner={t.owner} size={16} />
              <span style={{ fontSize: 12, color: t.owner ? OWNER_COLORS[t.owner] : "#bbb" }}>{t.owner || "Unassigned"}</span>
              {t.price > 0 && <span style={{ fontSize: 12, color: "#484f58" }}>${t.price.toFixed(2)}</span>}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {editId === t.id ? (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input type="number" min={0} max={6} value={editWins} onChange={e => setEditWins(parseInt(e.target.value) || 0)}
                  style={{ width: 60, background: "#161b22", border: "1px solid #30363d", borderRadius: 6, padding: "6px 10px", color: "#e6edf3", fontWeight: 700, fontSize: 15, outline: "none", textAlign: "center" }} />
                <button onClick={() => { setTeams(prev => prev.map(t2 => t2.id === t.id ? { ...t2, wins: editWins } : t2)); setEditId(null); }}
                  style={{ background: "#10b981", color: "#fff", border: "none", borderRadius: 6, padding: "6px 12px", fontWeight: 800, cursor: "pointer" }}>✓</button>
                <button onClick={() => setEditId(null)}
                  style={{ background: "#161b22", color: "#8b949e", border: "none", borderRadius: 6, padding: "6px 12px", fontWeight: 800, cursor: "pointer" }}>✕</button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#f59e0b", fontFamily: "'Inter', system-ui, sans-serif" }}>{t.wins}W</div>
                  <div style={{ fontSize: 11, color: "#484f58" }}>${PAYOUTS[t.wins] || 0} out</div>
                </div>
                <button onClick={() => { setEditId(t.id); setEditWins(t.wins); }}
                  style={{ background: "#161b22", color: "#8b949e", border: "1px solid #30363d", borderRadius: 6, padding: "6px 12px", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>
                  Wins
                </button>
                <button
                  onClick={() => setTeams(prev => prev.map(t2 => t2.id === t.id ? { ...t2, alive: isElim } : t2))}
                  style={{
                    background: isElim ? "#f0fdf4" : "#fff",
                    color: isElim ? "#10b981" : "#ef4444",
                    border: `1px solid ${isElim ? "#bbf7d0" : "#fecaca"}`,
                    borderRadius: 6, padding: "6px 10px", fontWeight: 700, cursor: "pointer", fontSize: 12,
                  }}>
                  {isElim ? "Restore" : "Elim"}
                </button>
              </div>
            )}
          </div>
        </div>
        );
      })}
    </div>
  );
}

// ── HISTORY TAB ───────────────────────────────────────────────────────────────
function HistoryTab() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const [expandedOwner, setExpandedOwner] = useState(null);
  const [view, setView] = useState("standings");
  const years = Object.keys(HISTORY).map(Number).sort((a, b) => b - a);
  const yearData = HISTORY[selectedYear];
  const stats = calcOwnerStats(yearData.teams).sort((a, b) => b.net - a.net);

  // All-time stats across every year in HISTORY
  const allTime = OWNERS.map(owner => {
    let totalNet = 0, totalWins = 0, yearsPlayed = 0, champCount = 0;
    Object.entries(HISTORY).forEach(([, data]) => {
      const myTeams = data.teams.filter(t => t.owner === owner);
      if (myTeams.length === 0) return;
      yearsPlayed++;
      const spent = myTeams.reduce((s, t) => s + t.price, 0);
      const earned = myTeams.reduce((s, t) => s + (PAYOUTS[t.wins] || 0), 0);
      totalNet += earned - spent;
      totalWins += myTeams.reduce((s, t) => s + t.wins, 0);
      if (data.champOwner === owner) champCount++;
    });
    return { owner, totalNet, totalWins, yearsPlayed, champCount };
  }).sort((a, b) => b.totalNet - a.totalNet);

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* All-time */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 11, color: "#8b949e", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>All-Time Standings</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
          {allTime.map((s, i) => (
            <div key={s.owner} style={{
              background: "#161b22",
              border: `1px solid ${i === 0 ? OWNER_COLORS[s.owner] + "77" : "#30363d"}`,
              borderRadius: 12, padding: "14px 16px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 900, color: "#30363d" }}>#{i+1}</span>
                <OwnerAvatar owner={s.owner} size={30} />
                <span style={{ fontWeight: 800, color: "#e6edf3", fontSize: 14 }}>{s.owner}</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: s.totalNet >= 0 ? "#10b981" : "#ef4444", marginBottom: 4 }}>
                {s.totalNet >= 0 ? "+" : ""}${s.totalNet.toFixed(0)}
              </div>
              <div style={{ fontSize: 11, color: "#8b949e" }}>{s.totalWins} wins · {s.yearsPlayed} yr{s.yearsPlayed !== 1 ? "s" : ""}</div>
              {s.champCount > 0 && (
                <div style={{ marginTop: 6 }}><Badge color="#f59e0b">🏆 {s.champCount}x champ</Badge></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Year picker */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ fontSize: 11, color: "#8b949e", fontWeight: 700, textTransform: "uppercase", marginRight: 4 }}>Year</div>
        {years.map(y => (
          <button key={y} onClick={() => { setSelectedYear(y); setExpandedOwner(null); }} style={{
            padding: "6px 16px", borderRadius: 8, border: "none", cursor: "pointer",
            background: selectedYear === y ? "#30363d" : "#21262d",
            color: selectedYear === y ? "#0d1117" : "#999",
            fontWeight: 800, fontSize: 14,
          }}>{y}</button>
        ))}
      </div>

      {/* Year hero */}
      <div style={{ background: "linear-gradient(135deg, #1a1a18, #2a2a26)", border: "1px solid #30363d", borderRadius: 14, padding: 20, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#e6edf3" }}>{selectedYear}</div>
            <div style={{ fontSize: 14, color: "#8b949e", marginTop: 4 }}>
              🏆 <span style={{ color: "#f59e0b", fontWeight: 700 }}>{yearData.champion}</span>
              {yearData.champOwner && <span> · owned by <span style={{ color: OWNER_COLORS[yearData.champOwner], fontWeight: 700 }}>{yearData.champOwner}</span></span>}
            </div>
            <div style={{ fontSize: 12, color: "#8b949e", marginTop: 4 }}>Final Four: {yearData.finalFour.join(" · ")}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["standings", "teams"].map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                background: view === v ? "#30363d" : "#21262d",
                color: view === v ? "#0d1117" : "#999", fontWeight: 700, fontSize: 12,
                textTransform: "capitalize",
              }}>{v}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Standings view */}
      {view === "standings" && stats.map((s, i) => (
        <div key={s.owner} style={{
          background: "#161b22", border: `1px solid ${expandedOwner === s.owner ? OWNER_COLORS[s.owner] + "66" : "#30363d"}`,
          borderRadius: 12, marginBottom: 10, overflow: "hidden",
        }}>
          <div onClick={() => setExpandedOwner(expandedOwner === s.owner ? null : s.owner)}
            style={{ padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#30363d", minWidth: 28, textAlign: "center" }}>{i + 1}</div>
            <OwnerAvatar owner={s.owner} size={38} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#e6edf3" }}>{s.owner}</div>
              <div style={{ fontSize: 12, color: "#8b949e" }}>{s.wins} wins · {s.teams.length} teams · ${s.spent.toFixed(0)} spent</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: s.net >= 0 ? "#10b981" : "#ef4444" }}>
                {s.net >= 0 ? "+" : ""}${s.net.toFixed(0)}
              </div>
              <div style={{ fontSize: 11, color: "#8b949e" }}>{s.roi >= 0 ? "+" : ""}{s.roi.toFixed(0)}% ROI</div>
            </div>
            <div style={{ color: "#8b949e", fontSize: 18, marginLeft: 4 }}>{expandedOwner === s.owner ? "▲" : "▼"}</div>
          </div>
          {expandedOwner === s.owner && (
            <div style={{ borderTop: "1px solid #21262d", padding: "12px 18px", background: "#0d1117" }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                <StatCard label="Spent" value={`$${s.spent.toFixed(0)}`} />
                <StatCard label="Earned" value={`$${s.earned}`} accent="#10b981" />
                <StatCard label="Net" value={`${s.net >= 0 ? "+" : ""}$${s.net.toFixed(0)}`} accent={s.net >= 0 ? "#10b981" : "#ef4444"} />
                <StatCard label="ROI" value={`${s.roi.toFixed(0)}%`} accent={s.roi >= 0 ? "#10b981" : "#ef4444"} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
                {[...s.teams].sort((a, b) => b.wins - a.wins).map((t, idx) => {
                  const net = (PAYOUTS[t.wins] || 0) - t.price;
                  return (
                    <div key={idx} style={{
                      background: "#161b22", borderRadius: 8, padding: "10px 12px",
                      border: `1px solid ${t.wins > 0 ? OWNER_COLORS[s.owner] + "44" : "#30363d"}`,
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                      <div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <span style={{ fontSize: 10, color: "#8b949e", fontWeight: 700 }}>#{t.seed}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: "#e6edf3" }}>{t.name}</span>
                        </div>
                        <div style={{ fontSize: 11, color: "#8b949e", marginTop: 2 }}>${t.price.toFixed(2)} · {t.wins}W</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: net >= 0 ? "#10b981" : "#ef4444" }}>
                          {net >= 0 ? "+" : ""}${net.toFixed(2)}
                        </div>
                        {t.wins > 0 && <div style={{ fontSize: 10, color: "#f59e0b" }}>{"★".repeat(Math.min(t.wins, 6))}</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Teams view */}
      {view === "teams" && REGIONS.map(region => {
        const regionTeams = yearData.teams.filter(t => t.region === region).sort((a, b) => a.seed - b.seed);
        return (
          <div key={region} style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 11, color: "#8b949e", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{region}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 8 }}>
              {regionTeams.map((t, idx) => {
                const net = (PAYOUTS[t.wins] || 0) - t.price;
                return (
                  <div key={idx} style={{
                    background: "#161b22",
                    borderLeft: `3px solid ${t.wins > 0 ? OWNER_COLORS[t.owner] : "#30363d"}`,
                    border: `1px solid ${t.wins > 0 ? OWNER_COLORS[t.owner] + "44" : "#30363d"}`,
                    borderRadius: 8, padding: "10px 14px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3 }}>
                          <span style={{ fontSize: 11, background: "#30363d", color: "#8b949e", borderRadius: 4, padding: "1px 5px", fontWeight: 700 }}>{t.seed}</span>
                          <span style={{ fontSize: 13, fontWeight: 800, color: "#e6edf3" }}>{t.name}</span>
                        </div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <OwnerAvatar owner={t.owner} size={16} />
                          <span style={{ fontSize: 11, color: OWNER_COLORS[t.owner], fontWeight: 700 }}>{t.owner}</span>
                          <span style={{ fontSize: 11, color: "#8b949e" }}>${t.price.toFixed(2)}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 14, fontWeight: 900, color: net >= 0 ? "#10b981" : "#ef4444" }}>
                          {net >= 0 ? "+" : ""}${net.toFixed(2)}
                        </div>
                        <div style={{ fontSize: 11, color: "#8b949e" }}>{t.wins}W</div>
                      </div>
                    </div>
                    {t.wins > 0 && (
                      <div style={{ marginTop: 8, display: "flex", gap: 3 }}>
                        {[1,2,3,4,5,6].map(r => (
                          <div key={r} style={{ flex: 1, height: 4, borderRadius: 2, background: r <= t.wins ? OWNER_COLORS[t.owner] : "#30363d" }} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── LIVE SCORES ───────────────────────────────────────────────────────────────
const ESPN_URL = "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?groups=100&limit=50";
const REFRESH_MS = 30000;

// Fuzzy match ESPN team name → our team name
function matchTeam(espnName, teams) {
  if (!espnName) return null;
  const clean = s => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\b(st|state|university|univ|college)\b/g, "").trim();
  const ec = clean(espnName);
  let best = null, bestScore = 0;
  for (const t of teams) {
    const tc = clean(t.name);
    // exact
    if (ec === tc) return t;
    // one contains the other
    if (ec.includes(tc) || tc.includes(ec)) { if (tc.length > bestScore) { bestScore = tc.length; best = t; } }
    // first word match
    const ew = ec.split(" ")[0], tw = tc.split(" ")[0];
    if (ew === tw && ew.length > 2 && ew.length > bestScore) { bestScore = ew.length; best = t; }
  }
  return best;
}

function LiveScores({ teams }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [filter, setFilter] = useState("all"); // all | live | final | upcoming

  const fetchScores = async () => {
    try {
      const res = await fetch(ESPN_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const events = (data.events || []).map(ev => {
        const comp = ev.competitions?.[0];
        const home = comp?.competitors?.find(c => c.homeAway === "home");
        const away = comp?.competitors?.find(c => c.homeAway === "away");
        const status = comp?.status;
        const situation = comp?.situation;

        const homeTeam = matchTeam(home?.team?.displayName || home?.team?.name, teams);
        const awayTeam = matchTeam(away?.team?.displayName || away?.team?.name, teams);

        return {
          id: ev.id,
          name: ev.name,
          date: ev.date,
          status: status?.type?.name,           // STATUS_IN_PROGRESS | STATUS_FINAL | STATUS_SCHEDULED
          statusDisplay: status?.type?.shortDetail || status?.type?.description,
          period: status?.period,
          clock: status?.displayClock,
          homeName: home?.team?.displayName || home?.team?.name || "?",
          homeScore: home?.score || "0",
          homeWinner: home?.winner,
          awayName: away?.team?.displayName || away?.team?.name || "?",
          awayScore: away?.score || "0",
          awayWinner: away?.winner,
          homeTeam,   // matched to our pool team
          awayTeam,
          note: comp?.notes?.[0]?.headline || "",  // e.g. "East Regional - First Round"
          situation,
        };
      });
      setGames(events);
      setLastUpdated(new Date());
      setError(null);
    } catch (e) {
      setError("Could not load scores. ESPN API may be unavailable or tournament hasn't started yet.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
    const interval = setInterval(fetchScores, REFRESH_MS);
    return () => clearInterval(interval);
  }, []);

  const liveGames    = games.filter(g => g.status === "STATUS_IN_PROGRESS");
  const finalGames   = games.filter(g => g.status === "STATUS_FINAL");
  const upcomingGames = games.filter(g => g.status === "STATUS_SCHEDULED");

  const filtered = filter === "live"     ? liveGames
                 : filter === "final"    ? finalGames
                 : filter === "upcoming" ? upcomingGames
                 : games;

  // Calculate which owners are winning / losing right now based on live games
  const ownerImpact = {};
  for (const owner of OWNERS) {
    ownerImpact[owner] = { winning: [], losing: [], upcoming: [] };
  }
  for (const g of liveGames) {
    const check = (myTeam, theirScore, myScore) => {
      if (!myTeam?.owner) return;
      const owner = myTeam.owner;
      const winning = parseInt(myScore) > parseInt(theirScore);
      if (winning) ownerImpact[owner].winning.push(myTeam.name);
      else ownerImpact[owner].losing.push(myTeam.name);
    };
    if (g.homeTeam) check(g.homeTeam, g.awayScore, g.homeScore);
    if (g.awayTeam) check(g.awayTeam, g.homeScore, g.awayScore);
  }
  for (const g of upcomingGames) {
    if (g.homeTeam?.owner) ownerImpact[g.homeTeam.owner].upcoming.push(g.homeTeam.name);
    if (g.awayTeam?.owner) ownerImpact[g.awayTeam.owner].upcoming.push(g.awayTeam.name);
  }

  const hasImpact = OWNERS.some(o => ownerImpact[o].winning.length > 0 || ownerImpact[o].losing.length > 0);

  return (
    <div style={{ paddingBottom: 40 }}>

      {/* Owner impact bar — only shown when games are live */}
      {hasImpact && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: "#ef4444", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
            🔴 Live Impact
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
            {OWNERS.map(owner => {
              const imp = ownerImpact[owner];
              if (imp.winning.length === 0 && imp.losing.length === 0) return null;
              return (
                <div key={owner} style={{
                  background: "#161b22",
                  border: `1px solid ${imp.winning.length > imp.losing.length ? "#a7f3d0" : "#fecaca"}`,
                  borderRadius: 10, padding: "12px 14px",
                }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                    <OwnerAvatar owner={owner} size={24} />
                    <span style={{ fontWeight: 800, color: "#e6edf3", fontSize: 13 }}>{owner}</span>
                  </div>
                  {imp.winning.map(n => (
                    <div key={n} style={{ fontSize: 11, color: "#10b981", marginBottom: 2 }}>▲ {n}</div>
                  ))}
                  {imp.losing.map(n => (
                    <div key={n} style={{ fontSize: 11, color: "#ef4444", marginBottom: 2 }}>▼ {n}</div>
                  ))}
                </div>
              );
            }).filter(Boolean)}
          </div>
        </div>
      )}

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[
            { id: "all",      label: `All (${games.length})` },
            { id: "live",     label: `🔴 Live (${liveGames.length})` },
            { id: "final",    label: `Final (${finalGames.length})` },
            { id: "upcoming", label: `Soon (${upcomingGames.length})` },
          ].map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
              background: filter === f.id ? "#30363d" : "#21262d",
              color: filter === f.id ? "#0d1117" : "#999",
              fontWeight: 700, fontSize: 12,
            }}>{f.label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {lastUpdated && (
            <span style={{ fontSize: 11, color: "#8b949e" }}>
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button onClick={fetchScores} style={{
            background: "#30363d", color: "#8b949e", border: "none", borderRadius: 8,
            padding: "6px 12px", fontWeight: 700, cursor: "pointer", fontSize: 12,
          }}>↻ Refresh</button>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: 60, color: "#8b949e" }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🏀</div>
          <div style={{ fontWeight: 700 }}>Loading scores...</div>
        </div>
      )}

      {error && (
        <div style={{ background: "#2d1111", border: "1px solid #fecaca", borderRadius: 12, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 24, marginBottom: 10 }}>📡</div>
          <div style={{ color: "#ef4444", fontWeight: 700, marginBottom: 8 }}>Score feed unavailable</div>
          <div style={{ color: "#8b949e", fontSize: 13, marginBottom: 16 }}>{error}</div>
          <button onClick={fetchScores} style={{ background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 800, cursor: "pointer" }}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: 60, color: "#8b949e" }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🏀</div>
          <div style={{ fontWeight: 700 }}>No games in this category</div>
          <div style={{ fontSize: 13, marginTop: 8 }}>Check back when the tournament begins (March 20, 2025)</div>
        </div>
      )}

      {/* Game cards */}
      {!loading && !error && filtered.map(g => {
        const isLive = g.status === "STATUS_IN_PROGRESS";
        const isFinal = g.status === "STATUS_FINAL";
        const homeWin = g.homeWinner;
        const awayWin = g.awayWinner;
        const poolHome = g.homeTeam;
        const poolAway = g.awayTeam;

        // Payout delta if this game finishes from current state
        const pendingPayout = (team) => {
          if (!team || !team.owner) return null;
          const nextWins = team.wins + 1;
          const current = PAYOUTS[team.wins] || 0;
          const next = PAYOUTS[nextWins] || 0;
          return next - current;
        };

        return (
          <div key={g.id} style={{
            background: "#161b22",
            border: `1px solid ${isLive ? "#fca5a5" : "#30363d"}`,
            borderRadius: 12, marginBottom: 10, overflow: "hidden",
          }}>
            {/* Round label */}
            {g.note && (
              <div style={{ padding: "6px 16px", background: "#161b22", borderBottom: "1px solid #30363d" }}>
                <span style={{ fontSize: 10, color: "#8b949e", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{g.note}</span>
                {isLive && <span style={{ marginLeft: 10, fontSize: 10, color: "#ef4444", fontWeight: 800, letterSpacing: "0.08em" }}>● LIVE · {g.clock} · {g.period && `P${g.period}`}</span>}
                {isFinal && <span style={{ marginLeft: 10, fontSize: 10, color: "#10b981", fontWeight: 700 }}>✓ FINAL</span>}
                {!isLive && !isFinal && <span style={{ marginLeft: 10, fontSize: 10, color: "#8b949e", fontWeight: 700 }}>{g.statusDisplay}</span>}
              </div>
            )}

            <div style={{ padding: "14px 16px" }}>
              {/* Away team row */}
              {[
                { espnName: g.awayName, score: g.awayScore, winner: awayWin, poolTeam: poolAway },
                { espnName: g.homeName, score: g.homeScore, winner: homeWin, poolTeam: poolHome },
              ].map((side, idx) => {
                const payout = pendingPayout(side.poolTeam);
                const dimmed = isFinal && !side.winner;
                return (
                  <div key={idx} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "8px 0",
                    borderBottom: idx === 0 ? "1px solid #21262d" : "none",
                    opacity: dimmed ? 0.45 : 1,
                  }}>
                    {/* Owner avatar */}
                    <OwnerAvatar owner={side.poolTeam?.owner} size={28} />

                    {/* Team name + owner */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        {side.poolTeam?.seed && (
                          <span style={{ fontSize: 10, background: "#30363d", color: "#8b949e", borderRadius: 4, padding: "1px 5px", fontWeight: 700 }}>
                            {side.poolTeam.seed}
                          </span>
                        )}
                        <span style={{ fontWeight: side.winner ? 900 : 700, fontSize: 15, color: side.winner ? "#e6edf3" : "#484f58" }}>
                          {side.espnName}
                        </span>
                        {side.winner && <span style={{ fontSize: 11, color: "#10b981" }}>✓</span>}
                      </div>
                      {side.poolTeam?.owner && (
                        <div style={{ fontSize: 11, color: OWNER_COLORS[side.poolTeam.owner], fontWeight: 700, marginTop: 1 }}>
                          {side.poolTeam.owner}
                          {side.poolTeam.price > 0 && <span style={{ color: "#8b949e", fontWeight: 500 }}> · paid ${side.poolTeam.price.toFixed(2)}</span>}
                        </div>
                      )}
                    </div>

                    {/* Payout badge */}
                    {payout !== null && isLive && (
                      <div style={{
                        background: "#0d2818", border: "1px solid #a7f3d0",
                        borderRadius: 6, padding: "3px 8px", fontSize: 11, color: "#10b981", fontWeight: 800,
                      }}>+${payout}</div>
                    )}

                    {/* Score */}
                    <div style={{ fontSize: 22, fontWeight: 900, minWidth: 36, textAlign: "right", color: side.winner ? "#e6edf3" : "#484f58" }}>
                      {g.status === "STATUS_SCHEDULED" ? "—" : side.score}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Auto-refresh note */}
      {!loading && !error && games.length > 0 && (
        <div style={{ textAlign: "center", fontSize: 11, color: "#484f58", marginTop: 16 }}>
          Auto-refreshes every 30 seconds
        </div>
      )}
    </div>
  );
}

// ── SUPABASE SETUP ────────────────────────────────────────────────────────────
// Replace these two values with your own from supabase.com → Project Settings → API
// SUPABASE_URL  : looks like https://xxxxxxxxxxxx.supabase.co
// SUPABASE_KEY  : the "anon public" key (safe to expose in frontend code)
const SUPABASE_URL = "https://vbvaiiqeffngafbcwypl.supabase.co";
const SUPABASE_KEY = "sb_publishable_Ie0ckjix_6PojcHiS6qwTQ_zarlCVXa";
const NOT_CONFIGURED = SUPABASE_URL === "YOUR_SUPABASE_URL";

// Lightweight Supabase REST helpers — no SDK needed
const sb = {
  headers: {
    "Content-Type": "application/json",
    "apikey": SUPABASE_KEY,
    "Authorization": `Bearer ${SUPABASE_KEY}`,
    "Prefer": "return=representation",
  },
  async get(table, match = {}) {
    const params = Object.entries(match).map(([k, v]) => `${k}=eq.${encodeURIComponent(v)}`).join("&");
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, { headers: this.headers });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  async upsert(table, row) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: { ...this.headers, "Prefer": "resolution=merge-duplicates,return=representation" },
      body: JSON.stringify(row),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  // Subscribe to real-time changes via Supabase Realtime websocket
  subscribe(table, season, onUpdate) {
    const wsUrl = SUPABASE_URL.replace("https://", "wss://") + "/realtime/v1/websocket?apikey=" + SUPABASE_KEY + "&vsn=1.0.0";
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({ topic: `realtime:*:public:${table}`, event: "phx_join", payload: { config: { broadcast: { self: false }, presence: { key: "" }, postgres_changes: [{ event: "*", schema: "public", table }] } }, ref: "1" }));
    };
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.event === "postgres_changes" || msg.event === "INSERT" || msg.event === "UPDATE") {
          const row = msg.payload?.data?.record ?? msg.payload?.record;
          if (row?.season === season) onUpdate(row);
        }
      } catch {}
    };
    return () => ws.close();
  },
  // Subscribe without season filter (for auction_state)
  subscribeAny(table, onUpdate) {
    const wsUrl = SUPABASE_URL.replace("https://", "wss://") + "/realtime/v1/websocket?apikey=" + SUPABASE_KEY + "&vsn=1.0.0";
    const ws = new WebSocket(wsUrl);
    ws.onopen = () => {
      ws.send(JSON.stringify({ topic: `realtime:*:public:${table}`, event: "phx_join", payload: { config: { broadcast: { self: false }, presence: { key: "" }, postgres_changes: [{ event: "*", schema: "public", table }] } }, ref: "2" }));
    };
    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.event === "postgres_changes" || msg.event === "INSERT" || msg.event === "UPDATE") {
          const row = msg.payload?.data?.record ?? msg.payload?.record;
          if (row) onUpdate(row);
        }
      } catch {}
    };
    return () => ws.close();
  },
};

// ── SUPABASE SETUP GUIDE (shown when not yet configured) ─────────────────────
function SetupGuide() {
  const [copied, setCopied] = useState("");
  const copy = (text, key) => { navigator.clipboard.writeText(text); setCopied(key); setTimeout(() => setCopied(""), 2000); };

  const sqlSchema = `-- Run this in Supabase → SQL Editor
create table if not exists bracket_teams (
  id       int primary key,
  season   int not null,
  owner    text default '',
  price    numeric default 0,
  wins     int default 0,
  alive    boolean default true,
  updated_at timestamptz default now()
);

-- Enable Row Level Security but allow all reads/writes (public pool)
alter table bracket_teams enable row level security;
create policy "allow_all" on bracket_teams for all using (true) with check (true);

-- Enable Realtime
alter publication supabase_realtime add table bracket_teams;

-- Auction state (live sync for viewers)
create table if not exists auction_state (
  id         int primary key default 1,
  phase      text default 'idle',
  team_id    int,
  bids       jsonb default '{}',
  going_stage int default 0,
  log        jsonb default '[]',
  updated_at timestamptz default now()
);
alter table auction_state enable row level security;
create policy "allow_all" on auction_state for all using (true) with check (true);
alter publication supabase_realtime add table auction_state;

-- Seed the single auction_state row
insert into auction_state (id) values (1) on conflict do nothing;`;

  return (
    <div style={{ maxWidth: 620, margin: "40px auto", padding: "0 16px" }}>
      <div style={{ background: "#161b22", border: "1px solid #facc1544", borderRadius: 14, padding: 28 }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#e6edf3", marginBottom: 6 }}>⚡ One-time Setup</div>
        <div style={{ fontSize: 14, color: "#8b949e", marginBottom: 28 }}>
          Connect a free Supabase database so scores, auction results, and wins persist across all devices in real time.
        </div>

        {[
          {
            n: 1, title: "Create a free Supabase project",
            body: <span>Go to <a href="https://supabase.com" target="_blank" rel="noreferrer" style={{ color: "#60a5fa" }}>supabase.com</a>, sign up, and create a new project. Takes about 2 minutes.</span>
          },
          {
            n: 2, title: "Run this SQL to create the table",
            body: (
              <div>
                <div style={{ background: "#0d1117", borderRadius: 8, padding: "12px 14px", fontFamily: "monospace", fontSize: 12, color: "#8b949e", whiteSpace: "pre-wrap", marginBottom: 8, lineHeight: 1.6 }}>
                  {sqlSchema}
                </div>
                <button onClick={() => copy(sqlSchema, "sql")} style={{ background: "#30363d", color: copied === "sql" ? "#10b981" : "#999", border: "none", borderRadius: 6, padding: "6px 14px", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>
                  {copied === "sql" ? "✓ Copied!" : "Copy SQL"}
                </button>
              </div>
            )
          },
          {
            n: 3, title: "Grab your API credentials",
            body: <span>In Supabase → <strong style={{ color: "#e6edf3" }}>Project Settings → API</strong>, copy your <strong style={{ color: "#e6edf3" }}>Project URL</strong> and <strong style={{ color: "#e6edf3" }}>anon public key</strong>.</span>
          },
          {
            n: 4, title: "Paste them into the code",
            body: (
              <div>
                <div style={{ fontSize: 13, color: "#8b949e", marginBottom: 8 }}>Near the top of <code style={{ color: "#a78bfa" }}>bracket-app.jsx</code>, replace:</div>
                <div style={{ background: "#0d1117", borderRadius: 8, padding: "10px 14px", fontFamily: "monospace", fontSize: 12, color: "#8b949e", lineHeight: 1.8 }}>
                  <div><span style={{ color: "#8b949e" }}>const</span> SUPABASE_URL = <span style={{ color: "#10b981" }}>"YOUR_SUPABASE_URL"</span>;</div>
                  <div><span style={{ color: "#8b949e" }}>const</span> SUPABASE_KEY = <span style={{ color: "#10b981" }}>"YOUR_SUPABASE_ANON_KEY"</span>;</div>
                </div>
              </div>
            )
          },
          {
            n: 5, title: "Deploy & you're done",
            body: <span>Push to GitHub — Vercel redeploys automatically. All 6 owners will see the same live data, instantly.</span>
          },
        ].map(step => (
          <div key={step.n} style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%", background: "#facc1522", border: "2px solid #facc1566",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 900, color: "#f59e0b", flexShrink: 0, marginTop: 2,
            }}>{step.n}</div>
            <div>
              <div style={{ fontWeight: 800, color: "#e6edf3", fontSize: 15, marginBottom: 6 }}>{step.title}</div>
              <div style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.6 }}>{step.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
const SEASON = 2025;

export default function App() {
  const [teams, setTeamsState] = useState(TEAMS_2025.map(t => ({ ...t })));
  const [dbStatus, setDbStatus] = useState("loading"); // loading | ok | error
  const [syncMsg, setSyncMsg] = useState("");
  const [tab, setTab] = useState("leaderboard");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPw, setAdminPw] = useState("");
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [auctionKey, setAuctionKey] = useState(0); // increment to force AuctionRoom remount on reset
  const saveTimers = useRef({}); // per-team debounce timers keyed by team id

  // ── Merge DB rows into local team state ──────────────────────────────────
  const applyRows = (rows) => {
    setTeamsState(prev => prev.map(t => {
      const row = rows.find(r => r.id === t.id && r.season === SEASON);
      if (!row) return t;
      return { ...t, owner: row.owner ?? t.owner, price: row.price ?? t.price, wins: row.wins ?? t.wins, alive: row.alive ?? t.alive };
    }));
  };

  // ── Load from Supabase on mount ───────────────────────────────────────────
  useEffect(() => {
    if (NOT_CONFIGURED) { setDbStatus("unconfigured"); return; }
    sb.get("bracket_teams", { season: SEASON })
      .then(rows => {
        if (rows.length > 0) applyRows(rows);
        setDbStatus("ok");
      })
      .catch(() => setDbStatus("error"));

    // Real-time subscription — any update from any device applies instantly
    const unsub = sb.subscribe("bracket_teams", SEASON, (row) => {
      setTeamsState(prev => prev.map(t => t.id === row.id ? { ...t, owner: row.owner, price: row.price, wins: row.wins, alive: row.alive } : t));
    });
    return unsub;
  }, []);

  // ── Save a single team to Supabase (debounced 400ms per team) ───────────
  const saveTeam = (team) => {
    if (NOT_CONFIGURED || dbStatus !== "ok") return;
    clearTimeout(saveTimers.current[team.id]);
    saveTimers.current[team.id] = setTimeout(async () => {
      setSyncMsg("Saving…");
      try {
        await sb.upsert("bracket_teams", { id: team.id, season: SEASON, owner: team.owner, price: team.price, wins: team.wins, alive: team.alive !== false });
        setSyncMsg("✓ Saved");
        setTimeout(() => setSyncMsg(""), 2000);
      } catch {
        setSyncMsg("⚠ Save failed");
      }
    }, 400);
  };

  // ── Wrapper so every setTeams call also persists ──────────────────────────
  const setTeams = (updater) => {
    setTeamsState(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      // Find changed teams and persist each one
      next.forEach((t, i) => {
        const old = prev[i];
        if (old && (old.owner !== t.owner || old.price !== t.price || old.wins !== t.wins || old.alive !== t.alive)) {
          saveTeam(t);
        }
      });
      return next;
    });
  };

  // ── Reset: wipe DB rows + local state ────────────────────────────────────
  const handleReset = async () => {
    const fresh = TEAMS_2025.map(t => ({ ...t, owner: "", price: 0, wins: 0, alive: true }));
    setTeamsState(fresh);
    setAuctionKey(k => k + 1); // force AuctionRoom to remount and clear local state
    setTab("leaderboard");
    if (!NOT_CONFIGURED && dbStatus === "ok") {
      setSyncMsg("Resetting…");
      let errors = 0;
      // Reset teams in batches of 10 to avoid overwhelming Supabase
      const chunks = [];
      for (let i = 0; i < fresh.length; i += 10) chunks.push(fresh.slice(i, i + 10));
      for (const chunk of chunks) {
        try {
          await Promise.all(chunk.map(t =>
            sb.upsert("bracket_teams", { id: t.id, season: SEASON, owner: "", price: 0, wins: 0, alive: true })
          ));
        } catch { errors++; }
      }
      // Reset auction state
      try {
        await sb.upsert("auction_state", { id: 1, phase: "idle", team_id: null, bids: {}, going_stage: 0, log: [], updated_at: new Date().toISOString() });
      } catch { errors++; }
      setSyncMsg(errors === 0 ? "✓ Reset complete" : `⚠ Reset partial (${errors} errors)`);
      setTimeout(() => setSyncMsg(""), 4000);
    }
  };

  const TABS = [
    { id: "leaderboard", label: "Standings" },
    { id: "bracket",     label: "Teams"     },
    { id: "tournament",  label: "Bracket"   },
    { id: "live",        label: "Live"      },
    { id: "auction",     label: "Auction"   },
    { id: "history",     label: "History"   },
    ...(isAdmin ? [{ id: "admin", label: "Admin" }] : []),
  ];

  if (dbStatus === "unconfigured") return <SetupGuide />;

  return (
    <div style={{ minHeight: "100vh", background: "#0d1117", fontFamily: "'Inter', system-ui, sans-serif", color: "#e6edf3" }}>
      <div style={{
        background: "rgba(13,17,23,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid #30363d", padding: "14px 20px",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 10, color: "#8b949e", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>March Madness</div>
              <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.1, color: "#e6edf3" }}>
                Auction BracketTracker <span style={{ color: "#f59e0b" }}>2026</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {syncMsg && (
                <span style={{ fontSize: 11, color: syncMsg.startsWith("⚠") ? "#ef4444" : "#10b981", fontWeight: 700 }}>{syncMsg}</span>
              )}
              {dbStatus === "error" && (
                <span style={{ fontSize: 11, color: "#ef4444", fontWeight: 700 }}>⚠ DB offline</span>
              )}
              {dbStatus === "loading" && (
                <span style={{ fontSize: 11, color: "#484f58" }}>connecting…</span>
              )}
              <button onClick={() => isAdmin ? setIsAdmin(false) : setShowAdminLogin(!showAdminLogin)}
                style={{
                  background: isAdmin ? "#10b981" : "#21262d",
                  color: isAdmin ? "#000" : "#8b949e",
                  border: "1px solid #30363d",
                  borderRadius: 50, padding: "7px 16px", fontWeight: 700, cursor: "pointer", fontSize: 12,
                  boxShadow: isAdmin ? "0 2px 8px rgba(16,185,129,0.3)" : "none",
                }}>
                {isAdmin ? "✓ Admin" : "Admin"}
              </button>
            </div>
          </div>

          {showAdminLogin && !isAdmin && (
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <input type="password" value={adminPw} onChange={e => setAdminPw(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && adminPw === "madness25") { setIsAdmin(true); setShowAdminLogin(false); setAdminPw(""); } }}
                placeholder="Admin password..."
                style={{ flex: 1, background: "#161b22", border: "1px solid #30363d", borderRadius: 8, padding: "8px 12px", color: "#e6edf3", outline: "none", fontSize: 14 }} />
              <button onClick={() => { if (adminPw === "madness25") { setIsAdmin(true); setShowAdminLogin(false); setAdminPw(""); } else alert("Wrong password"); }}
                style={{ background: "#161b22", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 800, cursor: "pointer" }}>
                Enter
              </button>
            </div>
          )}

          <div style={{ display: "flex", gap: 2, marginTop: 12, overflowX: "auto", paddingBottom: 2 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                background: tab === t.id ? "#21262d" : "transparent",
                color: tab === t.id ? "#e6edf3" : "#8b949e",
                border: "none", borderRadius: 50, padding: "7px 16px",
                fontWeight: 700, cursor: "pointer", fontSize: 13,
                transition: "all 0.15s", fontFamily: "inherit", whiteSpace: "nowrap",
                boxShadow: tab === t.id ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px 16px" }}>
        {tab === "leaderboard" && <Leaderboard teams={teams} />}
        {tab === "bracket"     && <BracketView teams={teams} />}
        {tab === "tournament"  && <TournamentBracket teams={teams} />}
        {tab === "live"        && <LiveScores teams={teams} />}
        {tab === "auction"     && <AuctionRoom key={auctionKey} teams={teams} setTeams={setTeams} isAdmin={isAdmin} />}
        {tab === "history"     && <HistoryTab />}
        {tab === "admin"   && isAdmin && <AdminPanel teams={teams} setTeams={setTeams} onReset={handleReset} />}
      </div>
    </div>
  );
}
