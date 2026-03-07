import { useState, useEffect, useRef } from "react";

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
    const alive = myTeams.filter(t => t.wins > 0 && t.wins < 6).length;
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
      background: "#1a2636", border: "2px solid #2a3a4d",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.38, fontWeight: 800, color: "#4a6278", flexShrink: 0,
    }}>?</div>
  );
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: OWNER_COLORS[owner] + "33", border: `2px solid ${OWNER_COLORS[owner]}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.38, fontWeight: 800, color: OWNER_COLORS[owner], flexShrink: 0,
    }}>{owner[0]}</div>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div style={{ background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: 10, padding: "14px 18px", flex: 1, minWidth: 100 }}>
      <div style={{ fontSize: 11, color: "#4a6278", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 900, color: accent || "#e8f0fe", lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: "#4a6278", marginTop: 4 }}>{sub}</div>}
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
        <div style={{ fontSize: 11, color: "#4a6278", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>Season Overview</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <StatCard label="Total Pot" value={`$${totalPot.toFixed(0)}`} sub="Auction spend" accent="#facc15" />
          <StatCard label="Paid Out" value={`$${totalPaid}`} sub="Winnings" accent="#34d399" />
          <StatCard label="Teams" value={teams.length} sub="In pool" />
          {champ
            ? <StatCard label="Champion" value={champ.name} sub={champ.owner ? `owned by ${champ.owner}` : "—"} accent="#facc15" />
            : <StatCard label="Champion" value="TBD" sub="Season ongoing" accent="#4a6278" />
          }
        </div>
      </div>

      {stats.map((s, i) => (
        <div key={s.owner} style={{
          background: "#0c1520", border: `1px solid ${expanded === s.owner ? OWNER_COLORS[s.owner] + "66" : "#1a2636"}`,
          borderRadius: 12, marginBottom: 10, overflow: "hidden", transition: "border-color 0.2s",
        }}>
          <div onClick={() => setExpanded(expanded === s.owner ? null : s.owner)}
            style={{ padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#1e2d3d", minWidth: 28, textAlign: "center" }}>{i + 1}</div>
            <OwnerAvatar owner={s.owner} size={40} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 17, fontWeight: 800, color: "#e8f0fe" }}>{s.owner}</span>
                {s.alive > 0 && <Badge color="#34d399">🔥 {s.alive} alive</Badge>}
              </div>
              <div style={{ fontSize: 12, color: "#4a6278", marginTop: 2 }}>{s.wins} wins · {s.teams.length} teams</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: s.net >= 0 ? "#34d399" : "#f43f5e" }}>
                {s.net >= 0 ? "+" : ""}${s.net.toFixed(0)}
              </div>
              <div style={{ fontSize: 11, color: "#4a6278" }}>{s.roi >= 0 ? "+" : ""}{s.roi.toFixed(0)}% ROI</div>
            </div>
            <div style={{ color: "#4a6278", fontSize: 18, marginLeft: 4 }}>{expanded === s.owner ? "▲" : "▼"}</div>
          </div>

          {expanded === s.owner && (
            <div style={{ borderTop: "1px solid #1a2636", padding: "12px 18px" }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                <StatCard label="Spent" value={`$${s.spent.toFixed(0)}`} />
                <StatCard label="Earned" value={`$${s.earned}`} accent="#34d399" />
                <StatCard label="Net" value={`${s.net >= 0 ? "+" : ""}$${s.net.toFixed(0)}`} accent={s.net >= 0 ? "#34d399" : "#f43f5e"} />
                <StatCard label="ROI" value={`${s.roi.toFixed(0)}%`} accent={s.roi >= 0 ? "#34d399" : "#f43f5e"} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
                {[...s.teams].sort((a, b) => b.wins - a.wins).map((t, idx) => {
                  const net = (PAYOUTS[t.wins] || 0) - t.price;
                  return (
                    <div key={idx} style={{
                      background: "#0f1923", borderRadius: 8, padding: "10px 12px",
                      border: `1px solid ${t.wins > 0 ? OWNER_COLORS[s.owner] + "44" : "#1e2d3d"}`,
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                      <div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <span style={{ fontSize: 10, color: "#4a6278", fontWeight: 700 }}>#{t.seed}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: "#e8f0fe" }}>{t.name}</span>
                        </div>
                        <div style={{ fontSize: 11, color: "#4a6278", marginTop: 2 }}>Paid ${t.price.toFixed(1)} · {t.wins}W</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: net >= 0 ? "#34d399" : "#f43f5e" }}>
                          {net >= 0 ? "+" : ""}${net.toFixed(1)}
                        </div>
                        {t.wins > 0 && <div style={{ fontSize: 10, color: "#facc15" }}>{"★".repeat(Math.min(t.wins, 6))}</div>}
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

// ── BRACKET VIEW ──────────────────────────────────────────────────────────────
function BracketView({ teams }) {
  const [filterOwner, setFilterOwner] = useState("All");
  return (
    <div style={{ paddingBottom: 40 }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {["All", ...OWNERS].map(o => (
          <button key={o} onClick={() => setFilterOwner(o)} style={{
            padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
            background: filterOwner === o ? (OWNER_COLORS[o] || "#e8f0fe") : "#0f1923",
            color: filterOwner === o ? "#000" : "#4a6278",
            fontWeight: 700, fontSize: 13, transition: "all 0.15s",
          }}>{o}</button>
        ))}
      </div>
      {REGIONS.map(region => {
        const regionTeams = teams.filter(t => t.region === region && (filterOwner === "All" || t.owner === filterOwner)).sort((a, b) => a.seed - b.seed);
        if (regionTeams.length === 0) return null;
        return (
          <div key={region} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, color: "#4a6278", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{region} Region</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
              {regionTeams.map((t, idx) => {
                const payout = PAYOUTS[t.wins] || 0;
                const net = payout - t.price;
                return (
                  <div key={idx} style={{
                    background: "#0c1520",
                    border: `1px solid ${t.wins > 0 ? (OWNER_COLORS[t.owner] || "#facc15") + "55" : "#1a2636"}`,
                    borderLeft: `3px solid ${t.wins > 0 ? (OWNER_COLORS[t.owner] || "#facc15") : "#1a2636"}`,
                    borderRadius: 8, padding: "10px 14px",
                    opacity: filterOwner !== "All" && t.owner !== filterOwner ? 0.3 : 1,
                    transition: "opacity 0.2s",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3 }}>
                          <span style={{ fontSize: 11, background: "#1a2636", color: "#4a6278", borderRadius: 4, padding: "1px 5px", fontWeight: 700 }}>{t.seed}</span>
                          <span style={{ fontSize: 14, fontWeight: 800, color: "#e8f0fe" }}>{t.name}</span>
                        </div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <OwnerAvatar owner={t.owner} size={18} />
                          <span style={{ fontSize: 12, color: t.owner ? OWNER_COLORS[t.owner] : "#4a6278", fontWeight: 700 }}>{t.owner || "Unassigned"}</span>
                          {t.price > 0 && <span style={{ fontSize: 11, color: "#4a6278" }}>${t.price.toFixed(1)}</span>}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        {t.price > 0 && (
                          <div style={{ fontSize: 15, fontWeight: 900, color: net >= 0 ? "#34d399" : "#f43f5e" }}>
                            {net >= 0 ? "+" : ""}${net.toFixed(1)}
                          </div>
                        )}
                        <div style={{ fontSize: 11, color: "#4a6278" }}>{t.wins}W · ${payout}</div>
                      </div>
                    </div>
                    {t.wins > 0 && (
                      <div style={{ marginTop: 8, display: "flex", gap: 3 }}>
                        {[1,2,3,4,5,6].map(r => (
                          <div key={r} style={{ flex: 1, height: 4, borderRadius: 2, background: r <= t.wins ? (OWNER_COLORS[t.owner] || "#facc15") : "#1a2636" }} />
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
function AuctionRoom({ teams, setTeams }) {
  const [pickedTeam, setPickedTeam] = useState(null);   // the team object currently up for bid
  const [bids, setBids] = useState({});
  const [log, setLog] = useState([]);
  const [phase, setPhase] = useState("idle");           // idle | rolling | reveal | bidding | sold
  const [rollIndex, setRollIndex] = useState(0);        // which team shows during slot-machine spin
  const rollTimer = useRef(null);
  const logRef = useRef(null);

  useEffect(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight; }, [log]);

  const totalSpent = (owner) => teams.filter(t => t.owner === owner).reduce((s, t) => s + t.price, 0);

  // Unsold teams (no owner assigned yet)
  const unsoldTeams = teams.filter(t => !t.owner);

  // ── Pick a random team with slot-machine animation ─────────────────────────
  const pickRandom = () => {
    if (unsoldTeams.length === 0) return;
    setPhase("rolling");

    const winner = unsoldTeams[Math.floor(Math.random() * unsoldTeams.length)];
    let count = 0;
    const totalTicks = 22; // how many flips before landing
    // Start fast, slow down near the end
    const tick = () => {
      const progress = count / totalTicks;
      const delay = 60 + Math.pow(progress, 2) * 540; // 60ms → 600ms
      setRollIndex(Math.floor(Math.random() * unsoldTeams.length));
      count++;
      if (count < totalTicks) {
        rollTimer.current = setTimeout(tick, delay);
      } else {
        // Land on the winner
        setPickedTeam(winner);
        setRollIndex(unsoldTeams.indexOf(winner));
        setPhase("reveal");
      }
    };
    tick();
  };

  // bids = { Aaron: 12, Adam: 0, ... } — 0 means passed, positive = current standing bid
  // raises = { Aaron: "15", ... } — what they're typing right now
  const [raises, setRaises] = useState({});
  const [goingStage, setGoingStage] = useState(0); // 0=bidding, 1=going once, 2=going twice

  // ── Open bidding on current picked team ───────────────────────────────────
  const startBidding = () => {
    setBids(Object.fromEntries(OWNERS.map(o => [o, 0])));
    setRaises(Object.fromEntries(OWNERS.map(o => [o, ""])));
    setGoingStage(0);
    setPhase("bidding");
  };

  // Commit raise for one owner — validates it beats current high
  const submitRaise = (owner) => {
    const val = parseFloat(raises[owner]);
    const currentHigh = Math.max(...Object.values(bids));
    if (isNaN(val) || val <= 0) return;
    if (val <= currentHigh && currentHigh > 0) {
      alert(`Must beat current high of $${currentHigh.toFixed(1)}`);
      return;
    }
    setBids(prev => ({ ...prev, [owner]: val }));
    setRaises(prev => ({ ...prev, [owner]: "" }));
    setGoingStage(0); // reset going-once if someone raises
  };

  const sortedBidders = Object.entries(bids)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1]);
  const currentLeader = sortedBidders[0];

  // ── Award to highest bidder ───────────────────────────────────────────────
  const soldTeam = () => {
    if (!currentLeader) { alert("No bids yet!"); return; }
    const [winnerOwner, winnerBid] = currentLeader;
    const allBids = sortedBidders.map(([owner, bid]) => ({ owner, bid }));
    setTeams(prev => prev.map(t =>
      t.id === pickedTeam.id ? { ...t, owner: winnerOwner, price: winnerBid } : t
    ));
    setLog(prev => [...prev, {
      team: pickedTeam.name, seed: pickedTeam.seed, region: pickedTeam.region,
      winner: winnerOwner, price: winnerBid, allBids,
      time: new Date().toLocaleTimeString(),
    }]);
    setPhase("sold");
    setPickedTeam(null);
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
            <div key={o} style={{ background: "#0c1520", border: "1px solid #1a2636", borderRadius: 10, padding: "12px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <OwnerAvatar owner={o} size={26} />
                  <span style={{ fontWeight: 800, color: "#e8f0fe", fontSize: 13 }}>{o}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: remaining > 20 ? "#34d399" : remaining > 5 ? "#facc15" : "#f43f5e" }}>${remaining.toFixed(1)}</span>
              </div>
              <div style={{ background: "#1a2636", borderRadius: 4, height: 5, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${Math.min((s / 100) * 100, 100)}%`, background: OWNER_COLORS[o], borderRadius: 4, transition: "width 0.4s" }} />
              </div>
              <div style={{ fontSize: 11, color: "#4a6278", marginTop: 4 }}>{teams.filter(t => t.owner === o).length} teams · ${s.toFixed(1)} spent</div>
            </div>
          );
        })}
      </div>

      {/* ── IDLE: big Pick button ── */}
      {phase === "idle" && (
        <div style={{ textAlign: "center", padding: "32px 0" }}>
          {unsoldTeams.length === 0 ? (
            <div style={{ color: "#34d399", fontSize: 20, fontWeight: 800 }}>🏆 All {teams.length} teams have been auctioned!</div>
          ) : (
            <>
              <div style={{ fontSize: 13, color: "#4a6278", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>
                {unsoldTeams.length} teams remaining
              </div>
              <button onClick={pickRandom} style={{
                background: "linear-gradient(135deg, #f43f5e, #f97316)",
                color: "#fff", border: "none", borderRadius: 14, padding: "20px 48px",
                fontSize: 22, fontWeight: 900, cursor: "pointer", letterSpacing: "0.02em",
                boxShadow: "0 0 32px #f43f5e44",
              }}>
                🎲 Pick Next Team
              </button>
            </>
          )}
        </div>
      )}

      {/* ── ROLLING / REVEAL: slot machine display ── */}
      {(phase === "rolling" || phase === "reveal") && displayTeam && (
        <div style={{
          background: "#0c1520",
          border: `2px solid ${phase === "reveal" ? "#facc15" : "#1a2636"}`,
          borderRadius: 16, padding: "28px 24px", marginBottom: 20, textAlign: "center",
          transition: "border-color 0.3s",
          boxShadow: phase === "reveal" ? "0 0 40px #facc1533" : "none",
        }}>
          <div style={{ fontSize: 11, color: "#4a6278", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>
            {phase === "rolling" ? "🎰 Drawing..." : "🎯 Next Up"}
          </div>

          {/* Seed badge */}
          <div style={{
            display: "inline-block", background: "#1a2636", border: "1px solid #2a3a4a",
            borderRadius: 8, padding: "4px 14px", fontSize: 13, fontWeight: 800,
            color: "#94a3b8", marginBottom: 12,
          }}>
            #{displayTeam.seed} · {displayTeam.region}
          </div>

          {/* Team name — blurs while spinning */}
          <div style={{
            fontSize: 34, fontWeight: 900, color: "#e8f0fe", marginBottom: 6,
            filter: phase === "rolling" ? "blur(3px)" : "none",
            transition: "filter 0.2s",
            minHeight: 44,
          }}>
            {displayTeam.name}
          </div>

          {phase === "reveal" && (
            <button onClick={startBidding} style={{
              marginTop: 20, background: "#f43f5e", color: "#fff", border: "none",
              borderRadius: 10, padding: "14px 36px", fontSize: 17, fontWeight: 800, cursor: "pointer",
            }}>
              🔨 Open Bidding
            </button>
          )}
        </div>
      )}

      {/* ── BIDDING: live raise rounds ── */}
      {phase === "bidding" && pickedTeam && (
        <div style={{ background: "#0c1520", border: "2px solid #f43f5e55", borderRadius: 12, padding: 20, marginBottom: 20 }}>

          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ background: "#f43f5e", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 800, color: "#fff", textTransform: "uppercase" }}>Bidding</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#e8f0fe" }}>
              #{pickedTeam.seed} {pickedTeam.name}
              <span style={{ color: "#4a6278", fontWeight: 500, fontSize: 15 }}> · {pickedTeam.region}</span>
            </div>
          </div>

          {/* Current high bid banner */}
          {currentLeader ? (
            <div style={{
              background: `${OWNER_COLORS[currentLeader[0]]}18`,
              border: `1px solid ${OWNER_COLORS[currentLeader[0]]}55`,
              borderRadius: 10, padding: "12px 18px", marginBottom: 18,
              display: "flex", alignItems: "center", gap: 14,
            }}>
              <OwnerAvatar owner={currentLeader[0]} size={32} />
              <div>
                <div style={{ fontSize: 11, color: "#4a6278", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>Current High Bid</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: OWNER_COLORS[currentLeader[0]] }}>
                  {currentLeader[0]} — <span style={{ color: "#facc15" }}>${currentLeader[1].toFixed(1)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background: "#0f1923", borderRadius: 10, padding: "12px 18px", marginBottom: 18, color: "#4a6278", fontWeight: 700, fontSize: 14 }}>
              No bids yet — enter opening bids below
            </div>
          )}

          {/* Per-owner raise inputs */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 20 }}>
            {OWNERS.map(o => {
              const standing = bids[o] || 0;
              const isLeading = currentLeader && currentLeader[0] === o;
              const highBid = currentLeader ? currentLeader[1] : 0;
              return (
                <div key={o} style={{
                  background: "#0f1923", borderRadius: 10, padding: "12px 14px",
                  border: `2px solid ${isLeading ? OWNER_COLORS[o] : standing > 0 ? OWNER_COLORS[o] + "44" : "#1e2d3d"}`,
                }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                    <OwnerAvatar owner={o} size={22} />
                    <span style={{ fontWeight: 800, color: "#e8f0fe", fontSize: 13, flex: 1 }}>{o}</span>
                    {isLeading && <span style={{ fontSize: 10, background: OWNER_COLORS[o], color: "#000", borderRadius: 4, padding: "2px 6px", fontWeight: 900 }}>LEADING</span>}
                  </div>

                  {/* Standing bid */}
                  <div style={{ fontSize: 13, color: standing > 0 ? OWNER_COLORS[o] : "#4a6278", fontWeight: 700, marginBottom: 8 }}>
                    {standing > 0 ? `Standing: $${standing.toFixed(1)}` : "No bid"}
                  </div>

                  {/* Raise input */}
                  <div style={{ display: "flex", gap: 6 }}>
                    <div style={{ position: "relative", flex: 1 }}>
                      <span style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "#4a6278", fontWeight: 700, fontSize: 13 }}>$</span>
                      <input
                        type="number" min={highBid + 0.5} step="0.5"
                        value={raises[o]}
                        onChange={e => setRaises(prev => ({ ...prev, [o]: e.target.value }))}
                        onKeyDown={e => e.key === "Enter" && submitRaise(o)}
                        placeholder={standing > 0 ? "Raise..." : "Open bid..."}
                        style={{
                          width: "100%", background: "#0c1520",
                          border: `1px solid ${raises[o] ? OWNER_COLORS[o] : "#1e2d3d"}`,
                          borderRadius: 6, padding: "7px 8px 7px 20px",
                          color: "#e8f0fe", fontSize: 14, fontWeight: 700,
                          outline: "none", boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <button
                      onClick={() => submitRaise(o)}
                      disabled={!raises[o]}
                      style={{
                        background: raises[o] ? OWNER_COLORS[o] : "#1a2636",
                        color: raises[o] ? "#000" : "#4a6278",
                        border: "none", borderRadius: 6, padding: "0 12px",
                        fontWeight: 900, cursor: raises[o] ? "pointer" : "default",
                        fontSize: 14, transition: "all 0.15s",
                      }}
                    >✓</button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Going once / twice / SOLD controls */}
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            {goingStage === 0 && (
              <button
                onClick={() => setGoingStage(1)}
                disabled={!currentLeader}
                style={{
                  background: currentLeader ? "#facc15" : "#1a2636",
                  color: currentLeader ? "#000" : "#4a6278",
                  border: "none", borderRadius: 8, padding: "12px 24px",
                  fontSize: 15, fontWeight: 800, cursor: currentLeader ? "pointer" : "default",
                }}>
                Going Once…
              </button>
            )}
            {goingStage === 1 && (
              <>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#facc15" }}>Going once…</div>
                <button onClick={() => setGoingStage(2)} style={{ background: "#f97316", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
                  Going Twice…
                </button>
                <button onClick={() => setGoingStage(0)} style={{ background: "#1a2636", color: "#4a6278", border: "none", borderRadius: 8, padding: "12px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  New bid came in
                </button>
              </>
            )}
            {goingStage === 2 && (
              <>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#f97316" }}>Going twice…</div>
                <button onClick={soldTeam} style={{ background: "#34d399", color: "#000", border: "none", borderRadius: 8, padding: "12px 28px", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
                  🏆 SOLD
                </button>
                <button onClick={() => setGoingStage(0)} style={{ background: "#1a2636", color: "#4a6278", border: "none", borderRadius: 8, padding: "12px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  New bid came in
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── SOLD: winner announcement + pick next ── */}
      {phase === "sold" && log.length > 0 && (() => {
        const last = log[log.length - 1];
        return (
          <div style={{
            background: "#0c1520", border: `2px solid ${OWNER_COLORS[last.winner]}55`,
            borderRadius: 12, padding: 28, marginBottom: 20, textAlign: "center",
            boxShadow: `0 0 40px ${OWNER_COLORS[last.winner]}22`,
          }}>
            <div style={{ fontSize: 12, color: "#4a6278", marginBottom: 8, textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.1em" }}>SOLD!</div>
            <div style={{ fontSize: 11, color: "#4a6278", marginBottom: 4 }}>#{last.seed} · {last.region}</div>
            <div style={{ fontSize: 26, fontWeight: 900, color: "#e8f0fe", marginBottom: 6 }}>{last.team}</div>
            <div style={{ fontSize: 30, fontWeight: 900, color: OWNER_COLORS[last.winner], marginBottom: 20 }}>
              {last.winner} <span style={{ color: "#facc15" }}>${last.price.toFixed(1)}</span>
            </div>
            {unsoldTeams.length > 0 ? (
              <button onClick={() => { setPhase("idle"); }} style={{
                background: "linear-gradient(135deg, #f43f5e, #f97316)",
                color: "#fff", border: "none", borderRadius: 10,
                padding: "14px 36px", fontSize: 17, fontWeight: 800, cursor: "pointer",
              }}>
                🎲 Pick Next Team ({unsoldTeams.length} left)
              </button>
            ) : (
              <div style={{ color: "#34d399", fontSize: 18, fontWeight: 800 }}>🏆 Auction complete!</div>
            )}
          </div>
        );
      })()}

      {/* ── Auction Log ── */}
      {log.length > 0 && (
        <div style={{ background: "#0c1520", border: "1px solid #1a2636", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: "1px solid #1a2636", fontSize: 12, color: "#4a6278", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Auction Log · {log.length} sold
          </div>
          <div ref={logRef} style={{ maxHeight: 300, overflowY: "auto" }}>
            {[...log].reverse().map((entry, i) => (
              <div key={i} style={{ padding: "12px 18px", borderBottom: "1px solid #0f1923", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: 11, color: "#4a6278", marginRight: 8 }}>#{entry.seed} · {entry.region}</span>
                  <span style={{ fontWeight: 700, color: "#e8f0fe" }}>{entry.team}</span>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ color: OWNER_COLORS[entry.winner], fontWeight: 800 }}>{entry.winner}</span>
                  <span style={{ color: "#facc15", fontWeight: 800 }}>${entry.price.toFixed(1)}</span>
                  <span style={{ fontSize: 11, color: "#4a6278" }}>{entry.time}</span>
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
      <div style={{ background: "#0c1520", border: "1px solid #2a1a1a", borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: "#f43f5e", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>⚠ Reset Season</div>
        <div style={{ fontSize: 13, color: "#4a6278", marginBottom: 14 }}>
          Clears all owner assignments, prices, and win totals so you can run a fresh auction for a new year. Cannot be undone.
        </div>
        {!showResetConfirm ? (
          <button onClick={() => setShowResetConfirm(true)}
            style={{ background: "#2a1a1a", color: "#f43f5e", border: "1px solid #f43f5e44", borderRadius: 8, padding: "10px 20px", fontWeight: 800, cursor: "pointer", fontSize: 13 }}>
            Reset for New Season
          </button>
        ) : (
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, color: "#e8f0fe" }}>Are you sure? This cannot be undone.</span>
            <button onClick={() => { onReset(); setShowResetConfirm(false); }}
              style={{ background: "#f43f5e", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 800, cursor: "pointer" }}>
              Yes, Reset Everything
            </button>
            <button onClick={() => setShowResetConfirm(false)}
              style={{ background: "#1a2636", color: "#4a6278", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 800, cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Win editor */}
      <div style={{ fontSize: 11, color: "#4a6278", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Update Win Totals</div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search teams or owners..."
        style={{ width: "100%", background: "#0c1520", border: "1px solid #1e2d3d", borderRadius: 10, padding: "12px 16px", color: "#e8f0fe", fontSize: 14, outline: "none", marginBottom: 12, boxSizing: "border-box" }} />
      {[...filtered].sort((a, b) => b.wins - a.wins).map(t => (
        <div key={t.id} style={{
          background: "#0c1520", border: "1px solid #1a2636", borderRadius: 10,
          padding: "12px 16px", marginBottom: 8, display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 11, background: "#1a2636", color: "#4a6278", borderRadius: 4, padding: "1px 5px", fontWeight: 700 }}>{t.seed}</span>
              <span style={{ fontWeight: 700, color: "#e8f0fe" }}>{t.name}</span>
              <span style={{ fontSize: 11, color: "#4a6278" }}>{t.region}</span>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
              <OwnerAvatar owner={t.owner} size={16} />
              <span style={{ fontSize: 12, color: t.owner ? OWNER_COLORS[t.owner] : "#4a6278" }}>{t.owner || "Unassigned"}</span>
              {t.price > 0 && <span style={{ fontSize: 12, color: "#4a6278" }}>${t.price.toFixed(1)}</span>}
            </div>
          </div>
          {editId === t.id ? (
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <input type="number" min={0} max={6} value={editWins} onChange={e => setEditWins(parseInt(e.target.value) || 0)}
                style={{ width: 60, background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: 6, padding: "6px 10px", color: "#e8f0fe", fontWeight: 700, fontSize: 15, outline: "none", textAlign: "center" }} />
              <button onClick={() => { setTeams(prev => prev.map(t2 => t2.id === t.id ? { ...t2, wins: editWins } : t2)); setEditId(null); }}
                style={{ background: "#34d399", color: "#000", border: "none", borderRadius: 6, padding: "6px 12px", fontWeight: 800, cursor: "pointer" }}>✓</button>
              <button onClick={() => setEditId(null)}
                style={{ background: "#1a2636", color: "#4a6278", border: "none", borderRadius: 6, padding: "6px 12px", fontWeight: 800, cursor: "pointer" }}>✕</button>
            </div>
          ) : (
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#facc15" }}>{t.wins}W</div>
                <div style={{ fontSize: 11, color: "#4a6278" }}>${PAYOUTS[t.wins] || 0} out</div>
              </div>
              <button onClick={() => { setEditId(t.id); setEditWins(t.wins); }}
                style={{ background: "#1a2636", color: "#4a6278", border: "none", borderRadius: 6, padding: "6px 12px", fontWeight: 800, cursor: "pointer", fontSize: 13 }}>
                Edit
              </button>
            </div>
          )}
        </div>
      ))}
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
        <div style={{ fontSize: 11, color: "#4a6278", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>All-Time Standings</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
          {allTime.map((s, i) => (
            <div key={s.owner} style={{
              background: "#0c1520",
              border: `1px solid ${i === 0 ? OWNER_COLORS[s.owner] + "77" : "#1a2636"}`,
              borderRadius: 12, padding: "14px 16px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 15, fontWeight: 900, color: "#1e2d3d" }}>#{i+1}</span>
                <OwnerAvatar owner={s.owner} size={30} />
                <span style={{ fontWeight: 800, color: "#e8f0fe", fontSize: 14 }}>{s.owner}</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 900, color: s.totalNet >= 0 ? "#34d399" : "#f43f5e", marginBottom: 4 }}>
                {s.totalNet >= 0 ? "+" : ""}${s.totalNet.toFixed(0)}
              </div>
              <div style={{ fontSize: 11, color: "#4a6278" }}>{s.totalWins} wins · {s.yearsPlayed} yr{s.yearsPlayed !== 1 ? "s" : ""}</div>
              {s.champCount > 0 && (
                <div style={{ marginTop: 6 }}><Badge color="#facc15">🏆 {s.champCount}x champ</Badge></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Year picker */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ fontSize: 11, color: "#4a6278", fontWeight: 700, textTransform: "uppercase", marginRight: 4 }}>Year</div>
        {years.map(y => (
          <button key={y} onClick={() => { setSelectedYear(y); setExpandedOwner(null); }} style={{
            padding: "6px 16px", borderRadius: 8, border: "none", cursor: "pointer",
            background: selectedYear === y ? "#e8f0fe" : "#0f1923",
            color: selectedYear === y ? "#080e18" : "#4a6278",
            fontWeight: 800, fontSize: 14,
          }}>{y}</button>
        ))}
      </div>

      {/* Year hero */}
      <div style={{ background: "linear-gradient(135deg, #0c1520, #0f1f2e)", border: "1px solid #1a2636", borderRadius: 14, padding: 20, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 900, color: "#e8f0fe" }}>{selectedYear}</div>
            <div style={{ fontSize: 14, color: "#4a6278", marginTop: 4 }}>
              🏆 <span style={{ color: "#facc15", fontWeight: 700 }}>{yearData.champion}</span>
              {yearData.champOwner && <span> · owned by <span style={{ color: OWNER_COLORS[yearData.champOwner], fontWeight: 700 }}>{yearData.champOwner}</span></span>}
            </div>
            <div style={{ fontSize: 12, color: "#4a6278", marginTop: 4 }}>Final Four: {yearData.finalFour.join(" · ")}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["standings", "teams"].map(v => (
              <button key={v} onClick={() => setView(v)} style={{
                padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                background: view === v ? "#e8f0fe" : "#1a2636",
                color: view === v ? "#080e18" : "#4a6278", fontWeight: 700, fontSize: 12,
                textTransform: "capitalize",
              }}>{v}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Standings view */}
      {view === "standings" && stats.map((s, i) => (
        <div key={s.owner} style={{
          background: "#0c1520", border: `1px solid ${expandedOwner === s.owner ? OWNER_COLORS[s.owner] + "66" : "#1a2636"}`,
          borderRadius: 12, marginBottom: 10, overflow: "hidden",
        }}>
          <div onClick={() => setExpandedOwner(expandedOwner === s.owner ? null : s.owner)}
            style={{ padding: "14px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: "#1e2d3d", minWidth: 28, textAlign: "center" }}>{i + 1}</div>
            <OwnerAvatar owner={s.owner} size={38} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#e8f0fe" }}>{s.owner}</div>
              <div style={{ fontSize: 12, color: "#4a6278" }}>{s.wins} wins · {s.teams.length} teams · ${s.spent.toFixed(0)} spent</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 20, fontWeight: 900, color: s.net >= 0 ? "#34d399" : "#f43f5e" }}>
                {s.net >= 0 ? "+" : ""}${s.net.toFixed(0)}
              </div>
              <div style={{ fontSize: 11, color: "#4a6278" }}>{s.roi >= 0 ? "+" : ""}{s.roi.toFixed(0)}% ROI</div>
            </div>
            <div style={{ color: "#4a6278", fontSize: 18, marginLeft: 4 }}>{expandedOwner === s.owner ? "▲" : "▼"}</div>
          </div>
          {expandedOwner === s.owner && (
            <div style={{ borderTop: "1px solid #1a2636", padding: "12px 18px" }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                <StatCard label="Spent" value={`$${s.spent.toFixed(0)}`} />
                <StatCard label="Earned" value={`$${s.earned}`} accent="#34d399" />
                <StatCard label="Net" value={`${s.net >= 0 ? "+" : ""}$${s.net.toFixed(0)}`} accent={s.net >= 0 ? "#34d399" : "#f43f5e"} />
                <StatCard label="ROI" value={`${s.roi.toFixed(0)}%`} accent={s.roi >= 0 ? "#34d399" : "#f43f5e"} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 8 }}>
                {[...s.teams].sort((a, b) => b.wins - a.wins).map((t, idx) => {
                  const net = (PAYOUTS[t.wins] || 0) - t.price;
                  return (
                    <div key={idx} style={{
                      background: "#0f1923", borderRadius: 8, padding: "10px 12px",
                      border: `1px solid ${t.wins > 0 ? OWNER_COLORS[s.owner] + "44" : "#1e2d3d"}`,
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                    }}>
                      <div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <span style={{ fontSize: 10, color: "#4a6278", fontWeight: 700 }}>#{t.seed}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: "#e8f0fe" }}>{t.name}</span>
                        </div>
                        <div style={{ fontSize: 11, color: "#4a6278", marginTop: 2 }}>${t.price.toFixed(1)} · {t.wins}W</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 14, fontWeight: 800, color: net >= 0 ? "#34d399" : "#f43f5e" }}>
                          {net >= 0 ? "+" : ""}${net.toFixed(1)}
                        </div>
                        {t.wins > 0 && <div style={{ fontSize: 10, color: "#facc15" }}>{"★".repeat(Math.min(t.wins, 6))}</div>}
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
            <div style={{ fontSize: 11, color: "#4a6278", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>{region}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 8 }}>
              {regionTeams.map((t, idx) => {
                const net = (PAYOUTS[t.wins] || 0) - t.price;
                return (
                  <div key={idx} style={{
                    background: "#0c1520",
                    borderLeft: `3px solid ${t.wins > 0 ? OWNER_COLORS[t.owner] : "#1a2636"}`,
                    border: `1px solid ${t.wins > 0 ? OWNER_COLORS[t.owner] + "44" : "#1a2636"}`,
                    borderRadius: 8, padding: "10px 14px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3 }}>
                          <span style={{ fontSize: 11, background: "#1a2636", color: "#4a6278", borderRadius: 4, padding: "1px 5px", fontWeight: 700 }}>{t.seed}</span>
                          <span style={{ fontSize: 13, fontWeight: 800, color: "#e8f0fe" }}>{t.name}</span>
                        </div>
                        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                          <OwnerAvatar owner={t.owner} size={16} />
                          <span style={{ fontSize: 11, color: OWNER_COLORS[t.owner], fontWeight: 700 }}>{t.owner}</span>
                          <span style={{ fontSize: 11, color: "#4a6278" }}>${t.price.toFixed(1)}</span>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 14, fontWeight: 900, color: net >= 0 ? "#34d399" : "#f43f5e" }}>
                          {net >= 0 ? "+" : ""}${net.toFixed(1)}
                        </div>
                        <div style={{ fontSize: 11, color: "#4a6278" }}>{t.wins}W</div>
                      </div>
                    </div>
                    {t.wins > 0 && (
                      <div style={{ marginTop: 8, display: "flex", gap: 3 }}>
                        {[1,2,3,4,5,6].map(r => (
                          <div key={r} style={{ flex: 1, height: 4, borderRadius: 2, background: r <= t.wins ? OWNER_COLORS[t.owner] : "#1a2636" }} />
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
          <div style={{ fontSize: 11, color: "#f43f5e", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
            🔴 Live Impact
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 8 }}>
            {OWNERS.map(owner => {
              const imp = ownerImpact[owner];
              if (imp.winning.length === 0 && imp.losing.length === 0) return null;
              return (
                <div key={owner} style={{
                  background: "#0c1520",
                  border: `1px solid ${imp.winning.length > imp.losing.length ? "#34d39955" : "#f43f5e55"}`,
                  borderRadius: 10, padding: "12px 14px",
                }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
                    <OwnerAvatar owner={owner} size={24} />
                    <span style={{ fontWeight: 800, color: "#e8f0fe", fontSize: 13 }}>{owner}</span>
                  </div>
                  {imp.winning.map(n => (
                    <div key={n} style={{ fontSize: 11, color: "#34d399", marginBottom: 2 }}>▲ {n}</div>
                  ))}
                  {imp.losing.map(n => (
                    <div key={n} style={{ fontSize: 11, color: "#f43f5e", marginBottom: 2 }}>▼ {n}</div>
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
              background: filter === f.id ? "#e8f0fe" : "#0f1923",
              color: filter === f.id ? "#080e18" : "#4a6278",
              fontWeight: 700, fontSize: 12,
            }}>{f.label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {lastUpdated && (
            <span style={{ fontSize: 11, color: "#4a6278" }}>
              Updated {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <button onClick={fetchScores} style={{
            background: "#1a2636", color: "#4a6278", border: "none", borderRadius: 8,
            padding: "6px 12px", fontWeight: 700, cursor: "pointer", fontSize: 12,
          }}>↻ Refresh</button>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: 60, color: "#4a6278" }}>
          <div style={{ fontSize: 28, marginBottom: 12 }}>🏀</div>
          <div style={{ fontWeight: 700 }}>Loading scores...</div>
        </div>
      )}

      {error && (
        <div style={{ background: "#1a0c0c", border: "1px solid #f43f5e44", borderRadius: 12, padding: 24, textAlign: "center" }}>
          <div style={{ fontSize: 24, marginBottom: 10 }}>📡</div>
          <div style={{ color: "#f43f5e", fontWeight: 700, marginBottom: 8 }}>Score feed unavailable</div>
          <div style={{ color: "#4a6278", fontSize: 13, marginBottom: 16 }}>{error}</div>
          <button onClick={fetchScores} style={{ background: "#f43f5e", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 800, cursor: "pointer" }}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: 60, color: "#4a6278" }}>
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
            background: "#0c1520",
            border: `1px solid ${isLive ? "#f43f5e55" : "#1a2636"}`,
            borderRadius: 12, marginBottom: 10, overflow: "hidden",
          }}>
            {/* Round label */}
            {g.note && (
              <div style={{ padding: "6px 16px", background: "#0a1018", borderBottom: "1px solid #1a2636" }}>
                <span style={{ fontSize: 10, color: "#4a6278", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>{g.note}</span>
                {isLive && <span style={{ marginLeft: 10, fontSize: 10, color: "#f43f5e", fontWeight: 800, letterSpacing: "0.08em" }}>● LIVE · {g.clock} · {g.period && `P${g.period}`}</span>}
                {isFinal && <span style={{ marginLeft: 10, fontSize: 10, color: "#34d399", fontWeight: 700 }}>✓ FINAL</span>}
                {!isLive && !isFinal && <span style={{ marginLeft: 10, fontSize: 10, color: "#4a6278", fontWeight: 700 }}>{g.statusDisplay}</span>}
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
                    borderBottom: idx === 0 ? "1px solid #1a2636" : "none",
                    opacity: dimmed ? 0.45 : 1,
                  }}>
                    {/* Owner avatar */}
                    <OwnerAvatar owner={side.poolTeam?.owner} size={28} />

                    {/* Team name + owner */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                        {side.poolTeam?.seed && (
                          <span style={{ fontSize: 10, background: "#1a2636", color: "#4a6278", borderRadius: 4, padding: "1px 5px", fontWeight: 700 }}>
                            {side.poolTeam.seed}
                          </span>
                        )}
                        <span style={{ fontWeight: side.winner ? 900 : 700, fontSize: 15, color: side.winner ? "#e8f0fe" : "#8a9ab0" }}>
                          {side.espnName}
                        </span>
                        {side.winner && <span style={{ fontSize: 11, color: "#34d399" }}>✓</span>}
                      </div>
                      {side.poolTeam?.owner && (
                        <div style={{ fontSize: 11, color: OWNER_COLORS[side.poolTeam.owner], fontWeight: 700, marginTop: 1 }}>
                          {side.poolTeam.owner}
                          {side.poolTeam.price > 0 && <span style={{ color: "#4a6278", fontWeight: 500 }}> · paid ${side.poolTeam.price.toFixed(1)}</span>}
                        </div>
                      )}
                    </div>

                    {/* Payout badge */}
                    {payout !== null && isLive && (
                      <div style={{
                        background: "#34d39922", border: "1px solid #34d39944",
                        borderRadius: 6, padding: "3px 8px", fontSize: 11, color: "#34d399", fontWeight: 800,
                      }}>+${payout}</div>
                    )}

                    {/* Score */}
                    <div style={{ fontSize: 22, fontWeight: 900, minWidth: 36, textAlign: "right", color: side.winner ? "#e8f0fe" : "#4a6278" }}>
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
        <div style={{ textAlign: "center", fontSize: 11, color: "#2a3a4d", marginTop: 16 }}>
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
  updated_at timestamptz default now()
);

-- Enable Row Level Security but allow all reads/writes (public pool)
alter table bracket_teams enable row level security;
create policy "allow_all" on bracket_teams for all using (true) with check (true);

-- Enable Realtime
alter publication supabase_realtime add table bracket_teams;`;

  return (
    <div style={{ maxWidth: 620, margin: "40px auto", padding: "0 16px" }}>
      <div style={{ background: "#0c1520", border: "1px solid #facc1544", borderRadius: 14, padding: 28 }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#e8f0fe", marginBottom: 6 }}>⚡ One-time Setup</div>
        <div style={{ fontSize: 14, color: "#4a6278", marginBottom: 28 }}>
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
                <div style={{ background: "#080e18", borderRadius: 8, padding: "12px 14px", fontFamily: "monospace", fontSize: 12, color: "#94a3b8", whiteSpace: "pre-wrap", marginBottom: 8, lineHeight: 1.6 }}>
                  {sqlSchema}
                </div>
                <button onClick={() => copy(sqlSchema, "sql")} style={{ background: "#1a2636", color: copied === "sql" ? "#34d399" : "#4a6278", border: "none", borderRadius: 6, padding: "6px 14px", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>
                  {copied === "sql" ? "✓ Copied!" : "Copy SQL"}
                </button>
              </div>
            )
          },
          {
            n: 3, title: "Grab your API credentials",
            body: <span>In Supabase → <strong style={{ color: "#e8f0fe" }}>Project Settings → API</strong>, copy your <strong style={{ color: "#e8f0fe" }}>Project URL</strong> and <strong style={{ color: "#e8f0fe" }}>anon public key</strong>.</span>
          },
          {
            n: 4, title: "Paste them into the code",
            body: (
              <div>
                <div style={{ fontSize: 13, color: "#4a6278", marginBottom: 8 }}>Near the top of <code style={{ color: "#a78bfa" }}>bracket-app.jsx</code>, replace:</div>
                <div style={{ background: "#080e18", borderRadius: 8, padding: "10px 14px", fontFamily: "monospace", fontSize: 12, color: "#94a3b8", lineHeight: 1.8 }}>
                  <div><span style={{ color: "#4a6278" }}>const</span> SUPABASE_URL = <span style={{ color: "#34d399" }}>"YOUR_SUPABASE_URL"</span>;</div>
                  <div><span style={{ color: "#4a6278" }}>const</span> SUPABASE_KEY = <span style={{ color: "#34d399" }}>"YOUR_SUPABASE_ANON_KEY"</span>;</div>
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
              fontSize: 13, fontWeight: 900, color: "#facc15", flexShrink: 0, marginTop: 2,
            }}>{step.n}</div>
            <div>
              <div style={{ fontWeight: 800, color: "#e8f0fe", fontSize: 15, marginBottom: 6 }}>{step.title}</div>
              <div style={{ fontSize: 13, color: "#4a6278", lineHeight: 1.6 }}>{step.body}</div>
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
  const saveTimers = useRef({}); // per-team debounce timers keyed by team id

  // ── Merge DB rows into local team state ──────────────────────────────────
  const applyRows = (rows) => {
    setTeamsState(prev => prev.map(t => {
      const row = rows.find(r => r.id === t.id && r.season === SEASON);
      if (!row) return t;
      return { ...t, owner: row.owner ?? t.owner, price: row.price ?? t.price, wins: row.wins ?? t.wins };
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
      setTeamsState(prev => prev.map(t => t.id === row.id ? { ...t, owner: row.owner, price: row.price, wins: row.wins } : t));
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
        await sb.upsert("bracket_teams", { id: team.id, season: SEASON, owner: team.owner, price: team.price, wins: team.wins });
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
        if (old && (old.owner !== t.owner || old.price !== t.price || old.wins !== t.wins)) {
          saveTeam(t);
        }
      });
      return next;
    });
  };

  // ── Reset: wipe DB rows + local state ────────────────────────────────────
  const handleReset = async () => {
    const fresh = TEAMS_2025.map(t => ({ ...t, owner: "", price: 0, wins: 0 }));
    setTeamsState(fresh);
    setTab("leaderboard");
    if (!NOT_CONFIGURED && dbStatus === "ok") {
      setSyncMsg("Resetting…");
      try {
        await Promise.all(fresh.map(t =>
          sb.upsert("bracket_teams", { id: t.id, season: SEASON, owner: "", price: 0, wins: 0 })
        ));
        setSyncMsg("✓ Reset complete");
        setTimeout(() => setSyncMsg(""), 3000);
      } catch { setSyncMsg("⚠ Reset failed"); }
    }
  };

  const TABS = [
    { id: "leaderboard", label: "🏆 Standings" },
    { id: "bracket",     label: "🎯 Teams"     },
    { id: "live",        label: "🔴 Live"       },
    { id: "history",     label: "📜 History"   },
    ...(isAdmin ? [
      { id: "auction", label: "🔨 Auction" },
      { id: "admin",   label: "⚙️ Admin"   },
    ] : []),
  ];

  if (dbStatus === "unconfigured") return <SetupGuide />;

  return (
    <div style={{ minHeight: "100vh", background: "#080e18", fontFamily: "'Georgia', 'Times New Roman', serif", color: "#e8f0fe" }}>
      <div style={{
        background: "linear-gradient(135deg, #0c1520 0%, #0f1f30 100%)",
        borderBottom: "1px solid #1a2636", padding: "16px 20px",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, color: "#f43f5e", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>March Madness</div>
              <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
                 Bracket Buster <span style={{ color: "#facc15" }}>2026</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {syncMsg && (
                <span style={{ fontSize: 11, color: syncMsg.startsWith("⚠") ? "#f43f5e" : "#34d399", fontWeight: 700 }}>{syncMsg}</span>
              )}
              {dbStatus === "error" && (
                <span style={{ fontSize: 11, color: "#f43f5e", fontWeight: 700 }}>⚠ DB offline</span>
              )}
              {dbStatus === "loading" && (
                <span style={{ fontSize: 11, color: "#4a6278" }}>connecting…</span>
              )}
              <button onClick={() => isAdmin ? setIsAdmin(false) : setShowAdminLogin(!showAdminLogin)}
                style={{ background: isAdmin ? "#34d399" : "#1a2636", color: isAdmin ? "#000" : "#4a6278", border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 800, cursor: "pointer", fontSize: 12 }}>
                {isAdmin ? "✓ Admin" : "Admin"}
              </button>
            </div>
          </div>

          {showAdminLogin && !isAdmin && (
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <input type="password" value={adminPw} onChange={e => setAdminPw(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && adminPw === "madness25") { setIsAdmin(true); setShowAdminLogin(false); setAdminPw(""); } }}
                placeholder="Admin password..."
                style={{ flex: 1, background: "#0f1923", border: "1px solid #1e2d3d", borderRadius: 8, padding: "8px 12px", color: "#e8f0fe", outline: "none" }} />
              <button onClick={() => { if (adminPw === "madness25") { setIsAdmin(true); setShowAdminLogin(false); setAdminPw(""); } else alert("Wrong password"); }}
                style={{ background: "#f43f5e", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 800, cursor: "pointer" }}>
                Enter
              </button>
            </div>
          )}

          <div style={{ display: "flex", gap: 4, marginTop: 14, overflowX: "auto", paddingBottom: 2 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                background: tab === t.id ? "#e8f0fe" : "transparent",
                color: tab === t.id ? "#080e18" : "#4a6278",
                border: "none", borderRadius: 8, padding: "8px 14px",
                fontWeight: 800, cursor: "pointer", fontSize: 13,
                transition: "all 0.15s", fontFamily: "inherit", whiteSpace: "nowrap",
              }}>{t.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 16px" }}>
        {tab === "leaderboard" && <Leaderboard teams={teams} />}
        {tab === "bracket"     && <BracketView teams={teams} />}
        {tab === "live"        && <LiveScores teams={teams} />}
        {tab === "history"     && <HistoryTab />}
        {tab === "auction" && isAdmin && <AuctionRoom teams={teams} setTeams={setTeams} />}
        {tab === "admin"   && isAdmin && <AdminPanel teams={teams} setTeams={setTeams} onReset={handleReset} />}
      </div>
    </div>
  );
}
