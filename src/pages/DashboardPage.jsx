// ============================================================
//  DeployFi — Dashboard Page
//  File: src/pages/DashboardPage.jsx
//  Stack: React + Chart.js + Inline Styles
// ============================================================
//
//  HOW TO ADD THIS PAGE:
//  1. Install Chart.js:
//       npm install chart.js react-chartjs-2
//  2. Save this file at: src/pages/DashboardPage.jsx
//  3. In App.jsx — DELETE the old placeholder:
//       function DashboardPage() { return <div>...</div> }
//  4. ADD the import at the top of App.jsx:
//       import DashboardPage from './pages/DashboardPage';
//  5. The route is already set:
//       <Route path="/dashboard" element={<DashboardPage />} />
//  6. Save and done!
//
// ============================================================

import { useEffect, useRef } from "react";
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
} from "chart.js";

// Register only what we need (tree-shaking friendly)
Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Filler, Tooltip);

// ── MOCK DATA ────────────────────────────────────────────────
// 🔁 REAL DATA: Replace all mock data below with API/wallet calls

const PORTFOLIO_STATS = [
  { label: "Total Portfolio", value: "$4,821",  change: "↑ +$284 today",    changeColor: "#10B981" },
  { label: "SOL Balance",     value: "31.6 SOL", change: "↑ +2.4%",          changeColor: "#10B981" },
  { label: "DeFi Earnings",   value: "+1.84",   change: "↑ SOL this month",  changeColor: "#10B981" },
  { label: "Tokens Launched", value: "3",        change: "Active launches",   changeColor: "#9CA3AF" },
];

const SOL_PRICE_DATA = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  prices: [145, 148, 143, 150, 149, 151, 152],
};

const MY_TOKENS = [
  { emoji: "🎮", bg: "rgba(124,58,237,0.18)", name: "GameToken", symbol: "GMT",  value: "$1,240", change: "↑ +12.4%", up: true  },
  { emoji: "🌙", bg: "rgba(34,211,238,0.12)", name: "MoonFi",   symbol: "MNFI", value: "$870",   change: "↓ -3.1%",  up: false },
  { emoji: "🚀", bg: "rgba(16,185,129,0.12)", name: "LaunchPad", symbol: "LPD",  value: "$430",   change: "↑ +5.7%",  up: true  },
];

const TRANSACTIONS = [
  { emoji: "💰", bg: "rgba(16,185,129,0.12)",  desc: "Deposited to Kamino",   time: "2 hours ago",  amount: "-5.0 SOL",  up: false },
  { emoji: "🚀", bg: "rgba(124,58,237,0.15)",  desc: "Launched GMT Token",    time: "1 day ago",    amount: "-2.0 SOL",  up: false },
  { emoji: "🔄", bg: "rgba(34,211,238,0.1)",   desc: "Swapped SOL → USDC",    time: "2 days ago",   amount: "-3.5 SOL",  up: false },
  { emoji: "📥", bg: "rgba(16,185,129,0.12)",  desc: "Yield Claimed",         time: "3 days ago",   amount: "+0.42 SOL", up: true  },
  { emoji: "🌊", bg: "rgba(245,158,11,0.1)",   desc: "Added Liquidity (Orca)", time: "4 days ago",  amount: "-5.2 SOL",  up: false },
];

// ── SOL PRICE CHART ──────────────────────────────────────────
function SolChart() {
  const canvasRef = useRef(null);
  const chartRef  = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy previous instance to avoid canvas reuse warning
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: "line",
      data: {
        labels: SOL_PRICE_DATA.labels,
        datasets: [{
          label: "SOL Price",
          data: SOL_PRICE_DATA.prices,
          borderColor: "#7C3AED",
          backgroundColor: "rgba(124,58,237,0.08)",
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: "#7C3AED",
          fill: true,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            grid: { color: "rgba(255,255,255,0.05)" },
            ticks: { color: "#9CA3AF", font: { size: 11, family: "'Space Grotesk', sans-serif" } },
          },
          y: {
            grid: { color: "rgba(255,255,255,0.05)" },
            ticks: {
              color: "#9CA3AF",
              font: { size: 11, family: "'Space Grotesk', sans-serif" },
              callback: (v) => "$" + v,
            },
          },
        },
      },
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: 160 }}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="SOL price over the last 7 days, ranging from $143 to $152"
      >
        SOL prices: Mon $145, Tue $148, Wed $143, Thu $150, Fri $149, Sat $151, Sun $152.
      </canvas>
    </div>
  );
}

// ── STAT CARD ────────────────────────────────────────────────
function StatCard({ label, value, change, changeColor }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(124,58,237,0.2)",
      borderRadius: 14,
      padding: 16,
    }}>
      <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>{value}</div>
      <div style={{ fontSize: 11, color: changeColor, marginTop: 4 }}>{change}</div>
    </div>
  );
}

// ── TOKEN ROW ────────────────────────────────────────────────
function TokenRow({ token, isLast }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: isLast ? "none" : "1px solid rgba(124,58,237,0.1)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: token.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14, flexShrink: 0,
        }}>
          {token.emoji}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{token.name}</div>
          <div style={{ fontSize: 11, color: "#9CA3AF" }}>{token.symbol}</div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{token.value}</div>
        <div style={{ fontSize: 11, color: token.up ? "#10B981" : "#EF4444", marginTop: 2 }}>
          {token.change}
        </div>
      </div>
    </div>
  );
}

// ── TRANSACTION ROW ──────────────────────────────────────────
function TxRow({ tx, isLast }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: isLast ? "none" : "1px solid rgba(124,58,237,0.1)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: tx.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, flexShrink: 0,
        }}>
          {tx.emoji}
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{tx.desc}</div>
          <div style={{ fontSize: 11, color: "#9CA3AF" }}>{tx.time}</div>
        </div>
      </div>
      <div style={{
        fontSize: 12, fontWeight: 600,
        color: tx.up ? "#10B981" : "#EF4444",
        textAlign: "right",
      }}>
        {tx.amount}
      </div>
    </div>
  );
}

// ── MAIN DASHBOARD PAGE ──────────────────────────────────────
export default function DashboardPage() {

  // 🔁 REAL DATA: Get wallet address from Solana adapter
  // const { publicKey } = useWallet();
  // const shortAddr = publicKey
  //   ? publicKey.toBase58().slice(0,4) + '...' + publicKey.toBase58().slice(-4)
  //   : 'Not connected';
  const shortAddr = "7xKp...3mNq"; // mock

  const panelStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(124,58,237,0.22)",
    borderRadius: 16,
    padding: 20,
  };

  const panelTitleStyle = {
    fontSize: 14,
    fontWeight: 700,
    color: "#fff",
    marginBottom: 16,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div style={{
      fontFamily: "'Space Grotesk', sans-serif",
      background: "#0D0818",
      minHeight: "100vh",
      padding: "36px 32px",
      boxSizing: "border-box",
    }}>

      {/* ── HEADER ───────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>👋 Welcome back!</div>
          <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>
            Here's your DeployFi portfolio overview
          </div>
        </div>
        <div style={{
          fontSize: 12, fontWeight: 600, color: "#22D3EE",
          background: "rgba(34,211,238,0.1)",
          border: "1px solid rgba(34,211,238,0.25)",
          borderRadius: 20,
          padding: "6px 14px",
        }}>
          {shortAddr}
        </div>
      </div>

      {/* ── STATS ROW ─────────────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 12,
        marginBottom: 20,
      }}>
        {PORTFOLIO_STATS.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* ── MID ROW: Chart + Tokens ───────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>

        {/* SOL Price Chart */}
        <div style={panelStyle}>
          <div style={panelTitleStyle}>
            📈 SOL Price — 7 Days
            <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 400 }}>via Pyth</span>
          </div>
          <SolChart />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontSize: 11, color: "#9CA3AF" }}>
            <span>7d low: <span style={{ color: "#EF4444" }}>$143</span></span>
            <span>Current: <span style={{ color: "#10B981" }}>$152.40</span></span>
            <span>7d high: <span style={{ color: "#10B981" }}>$153</span></span>
          </div>
        </div>

        {/* My Tokens */}
        <div style={panelStyle}>
          <div style={panelTitleStyle}>🪙 My Tokens</div>
          {MY_TOKENS.map((token, i) => (
            <TokenRow key={i} token={token} isLast={i === MY_TOKENS.length - 1} />
          ))}
        </div>

      </div>

      {/* ── TRANSACTIONS ──────────────────────────────── */}
      <div style={panelStyle}>
        <div style={panelTitleStyle}>
          🕒 Recent Transactions
          <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 400 }}>Last 5 txns</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 24px" }}>
          {/* Left column: first 3 */}
          <div>
            {TRANSACTIONS.slice(0, 3).map((tx, i) => (
              <TxRow key={i} tx={tx} isLast={i === 2} />
            ))}
          </div>
          {/* Right column: last 2 */}
          <div>
            {TRANSACTIONS.slice(3).map((tx, i) => (
              <TxRow key={i} tx={tx} isLast={i === 1} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

// ============================================================
//  HOW TO CONNECT REAL WALLET DATA
// ============================================================
//
//  1. SOL BALANCE:
//     import { useConnection, useWallet } from '@solana/wallet-adapter-react';
//     const { connection } = useConnection();
//     const { publicKey } = useWallet();
//     useEffect(() => {
//       if (!publicKey) return;
//       connection.getBalance(publicKey).then(bal => {
//         setSolBalance((bal / LAMPORTS_PER_SOL).toFixed(2));
//       });
//     }, [publicKey]);
//
//  2. TOKEN BALANCES:
//     import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
//     const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
//       publicKey, { programId: TOKEN_PROGRAM_ID }
//     );
//     const tokens = tokenAccounts.value.map(acc => ({
//       mint: acc.account.data.parsed.info.mint,
//       amount: acc.account.data.parsed.info.tokenAmount.uiAmount,
//     }));
//
//  3. TRANSACTION HISTORY:
//     const signatures = await connection.getSignaturesForAddress(publicKey, { limit: 10 });
//     const txns = await connection.getParsedTransactions(
//       signatures.map(s => s.signature)
//     );
//
//  4. SOL PRICE CHART (real 7-day data from CoinGecko):
//     fetch('https://api.coingecko.com/api/v3/coins/solana/market_chart?vs_currency=usd&days=7')
//       .then(r => r.json())
//       .then(data => {
//         const prices = data.prices.map(p => p[1].toFixed(2));
//         setPriceData(prices);
//       });
//
//  5. USD VALUE of portfolio:
//     const solPrice = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd')
//       .then(r => r.json()).then(d => d.solana.usd);
//     const totalUsd = (solBalance * solPrice).toFixed(2);
//
// ============================================================