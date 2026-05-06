// ============================================================
//  DeployFi — DeFi Page
//  File: src/pages/DeFiPage.jsx
//  Stack: React + Inline Styles (no extra installs needed)
// ============================================================
//
//  HOW TO ADD THIS PAGE:
//  1. Save this file at: src/pages/DeFiPage.jsx
//  2. In App.jsx — DELETE the old placeholder:
//       function DeFiPage() { return <div>...</div> }
//  3. ADD the import at the top of App.jsx:
//       import DeFiPage from './pages/DeFiPage';
//  4. The route is already set:
//       <Route path="/defi" element={<DeFiPage />} />
//  5. Save and done!
//
// ============================================================

import { useState } from "react";

// ── GOAL DEFINITIONS ─────────────────────────────────────────
// 🔁 REAL DATA: Connect each goal to its real protocol SDK
const GOALS = [
  {
    id: "yield",
    emoji: "💰",
    name: "Earn Yield",
    desc: "Deposit SOL or stablecoins and earn passive yield via lending protocols.",
    apy: 14.2,
    apyLabel: "Up to 14.2% APY",
    risk: "low",
    riskLabel: "Low Risk",
    protocol: "Kamino Finance",
    btnLabel: "Deposit to Kamino →",
  },
  {
    id: "swap",
    emoji: "🔄",
    name: "Swap Tokens",
    desc: "Swap any Solana token at best rates via Jupiter aggregator routing.",
    apy: null,
    apyLabel: "Best Price Routes",
    risk: "med",
    riskLabel: "Medium Risk",
    protocol: "Jupiter Aggregator",
    btnLabel: "Swap via Jupiter →",
  },
  {
    id: "liquidity",
    emoji: "🌊",
    name: "Provide Liquidity",
    desc: "Add liquidity to pools on Orca or Raydium and earn trading fees + rewards.",
    apy: 38.5,
    apyLabel: "Up to 38.5% APY",
    risk: "high",
    riskLabel: "High Risk",
    protocol: "Orca Whirlpool",
    btnLabel: "Add Liquidity →",
  },
];

// ── MOCK POSITIONS ───────────────────────────────────────────
// 🔁 REAL DATA: Fetch from your Solana program / protocol APIs
const MOCK_POSITIONS = [
  { emoji: "💧", bg: "rgba(34,211,238,0.12)",  name: "SOL Lending",  protocol: "Kamino Finance",  amount: "10.5 SOL", apy: "14.2%" },
  { emoji: "🌊", bg: "rgba(124,58,237,0.12)", name: "SOL-USDC LP",  protocol: "Orca Whirlpool",  amount: "5.2 SOL",  apy: "38.5%" },
  { emoji: "🏦", bg: "rgba(16,185,129,0.12)", name: "mSOL Stake",   protocol: "Marinade Finance", amount: "8.0 SOL",  apy: "7.1%"  },
];

// ── RISK BADGE COLORS ────────────────────────────────────────
const riskColors = {
  low:  { bg: "rgba(16,185,129,0.12)",  color: "#10B981" },
  med:  { bg: "rgba(245,158,11,0.12)",  color: "#F59E0B" },
  high: { bg: "rgba(239,68,68,0.12)",   color: "#EF4444" },
};

// ── GOAL CARD ────────────────────────────────────────────────
function GoalCard({ goal, isActive, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const risk = riskColors[goal.risk];

  return (
    <div
      onClick={() => onSelect(goal)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isActive
          ? "rgba(124,58,237,0.13)"
          : hovered ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.04)",
        border: isActive
          ? "2px solid #7C3AED"
          : "1px solid rgba(124,58,237,0.2)",
        borderRadius: 16,
        padding: 18,
        cursor: "pointer",
        transition: "all 0.15s",
      }}
    >
      <div style={{ fontSize: 22, marginBottom: 10 }}>{goal.emoji}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{goal.name}</div>
      <div style={{ fontSize: 11, color: "#9CA3AF", lineHeight: 1.5, marginBottom: 10 }}>{goal.desc}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#10B981" }}>{goal.apyLabel}</div>
      <div style={{
        display: "inline-block",
        fontSize: 11,
        padding: "3px 8px",
        borderRadius: 20,
        marginTop: 6,
        background: risk.bg,
        color: risk.color,
      }}>
        {goal.riskLabel}
      </div>
    </div>
  );
}

// ── POSITION ROW ─────────────────────────────────────────────
function PositionRow({ pos, isLast }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 0",
      borderBottom: isLast ? "none" : "1px solid rgba(124,58,237,0.12)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: pos.bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14,
        }}>
          {pos.emoji}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{pos.name}</div>
          <div style={{ fontSize: 11, color: "#9CA3AF" }}>{pos.protocol}</div>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>{pos.amount}</div>
        <div style={{ fontSize: 11, color: "#10B981" }}>{pos.apy} APY</div>
      </div>
    </div>
  );
}

// ── INFO ROW ─────────────────────────────────────────────────
function InfoRow({ label, value, valueColor = "#D1D5DB" }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 8 }}>
      <span style={{ color: "#9CA3AF" }}>{label}</span>
      <span style={{ color: valueColor, fontWeight: 500 }}>{value}</span>
    </div>
  );
}

// ── MAIN DEFI PAGE ───────────────────────────────────────────
export default function DeFiPage() {
  const [activeGoal, setActiveGoal] = useState(GOALS[0]);
  const [activeTab, setActiveTab]   = useState("deposit");
  const [amount, setAmount]         = useState("");

  // Live yield calculator
  const amt = parseFloat(amount) || 0;
  const apy = activeGoal.apy;

  const dailyYield   = apy && amt ? (amt * (apy / 100) / 365).toFixed(4)  + " SOL" : "— SOL";
  const monthlyYield = apy && amt ? (amt * (apy / 100) / 12).toFixed(4)   + " SOL" : "— SOL";
  const yearlyYield  = apy && amt ? (amt * (apy / 100)).toFixed(4)         + " SOL" : "— SOL";

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(124,58,237,0.25)",
    borderRadius: 10,
    padding: "10px 44px 10px 14px",
    color: "#fff",
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  };

  const panelStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(124,58,237,0.22)",
    borderRadius: 16,
    padding: 22,
  };

  const divider = { height: 1, background: "rgba(124,58,237,0.15)", margin: "12px 0" };

  // 🔁 REAL DATA: Replace with actual protocol call
  // For Kamino: import { KaminoMarket } from '@kamino-finance/klend-sdk'
  // For Jupiter: import { Jupiter } from '@jup-ag/core'
  // For Orca:   import { buildWhirlpoolClient } from '@orca-so/whirlpools-sdk'
  const handleAction = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter an amount first!");
      return;
    }
    alert(`${activeTab === "deposit" ? "Depositing" : "Withdrawing"} ${amount} SOL via ${activeGoal.protocol} — connect your wallet logic here!`);
  };

  return (
    <div style={{
      fontFamily: "'Space Grotesk', sans-serif",
      background: "#0D0818",
      minHeight: "100vh",
      padding: "36px 32px",
      boxSizing: "border-box",
    }}>

      {/* ── PAGE HEADER ──────────────────────────────── */}
      <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
        💎 DeFi Hub
      </div>
      <div style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 24 }}>
        Pick a goal — we'll find the best Solana protocol for you
      </div>

      {/* ── GOAL PICKER GRID ─────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 14,
        marginBottom: 28,
      }}>
        {GOALS.map((goal) => (
          <GoalCard
            key={goal.id}
            goal={goal}
            isActive={activeGoal.id === goal.id}
            onSelect={setActiveGoal}
          />
        ))}
      </div>

      {/* ── BOTTOM GRID: Action + Positions ──────────── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>

        {/* Action Panel */}
        <div style={panelStyle}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 18 }}>
            ⚡ {activeGoal.name} — Action Panel
          </div>

          {/* Deposit / Withdraw tabs */}
          <div style={{
            display: "flex", gap: 4, marginBottom: 18,
            background: "rgba(255,255,255,0.04)",
            borderRadius: 10, padding: 4,
          }}>
            {["deposit", "withdraw"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1, padding: 8,
                  border: "none", borderRadius: 8,
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 12, fontWeight: 600,
                  cursor: "pointer",
                  background: activeTab === tab ? "rgba(124,58,237,0.25)" : "transparent",
                  color: activeTab === tab ? "#A78BFA" : "#9CA3AF",
                  transition: "all 0.15s",
                  textTransform: "capitalize",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Amount input */}
          <div style={{ position: "relative", marginBottom: 14 }}>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              style={inputStyle}
            />
            <span style={{
              position: "absolute", right: 12, top: "50%",
              transform: "translateY(-50%)",
              fontSize: 12, color: "#9CA3AF", fontWeight: 600,
            }}>
              SOL
            </span>
          </div>

          <InfoRow label="Protocol"          value={activeGoal.protocol} valueColor="#22D3EE" />
          <InfoRow label="Current APY"       value={apy ? `${apy}%` : "Best route"} valueColor="#10B981" />
          <InfoRow label="Est. Daily Yield"  value={dailyYield}   valueColor="#10B981" />
          <InfoRow label="Est. Monthly Yield" value={monthlyYield} valueColor="#10B981" />
          <div style={divider} />
          <InfoRow label="Est. Yearly Yield" value={yearlyYield}  valueColor="#10B981" />

          <button
            onClick={handleAction}
            style={{
              width: "100%", padding: 12, border: "none", borderRadius: 12,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14, fontWeight: 700, cursor: "pointer",
              background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
              color: "#fff", marginTop: 4,
            }}
          >
            {activeGoal.btnLabel}
          </button>
        </div>

        {/* Positions Panel */}
        <div style={panelStyle}>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 18 }}>
            📊 Your Positions
          </div>

          {MOCK_POSITIONS.map((pos, i) => (
            <PositionRow
              key={i}
              pos={pos}
              isLast={i === MOCK_POSITIONS.length - 1}
            />
          ))}

          <div style={divider} />
          <InfoRow label="Total Deposited" value="23.7 SOL" valueColor="#fff" />
          <InfoRow label="Total Earned"    value="+1.84 SOL" valueColor="#10B981" />
        </div>

      </div>
    </div>
  );
}

// ============================================================
//  HOW TO CONNECT REAL PROTOCOL DATA
// ============================================================
//
//  1. KAMINO FINANCE (Yield / Lending):
//     npm install @kamino-finance/klend-sdk
//     import { KaminoMarket } from '@kamino-finance/klend-sdk';
//     const market = await KaminoMarket.load(connection, KAMINO_MARKET_ADDRESS);
//     await market.depositAndMintCollateral(wallet, reserveAddress, amountLamports);
//
//  2. JUPITER AGGREGATOR (Swap):
//     npm install @jup-ag/api
//     import { createJupiterApiClient } from '@jup-ag/api';
//     const jupiterApi = createJupiterApiClient();
//     const quote = await jupiterApi.quoteGet({ inputMint, outputMint, amount });
//     const swapResult = await jupiterApi.swapPost({ swapRequest: { ... } });
//
//  3. ORCA WHIRLPOOLS (Liquidity):
//     npm install @orca-so/whirlpools-sdk
//     import { buildWhirlpoolClient } from '@orca-so/whirlpools-sdk';
//     const client = buildWhirlpoolClient(ctx);
//     const pool = await client.getPool(POOL_ADDRESS);
//     await pool.openPosition(lowerPrice, upperPrice, tokenAmount);
//
//  4. FETCH USER POSITIONS:
//     - Kamino: market.getUserObligations(publicKey)
//     - Orca: client.getUserPositions(publicKey)
//     - Marinade: fetch from https://api.marinade.finance/msol/apy
//
// ============================================================