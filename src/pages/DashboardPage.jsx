// src/pages/DashboardPage.jsx
// Connects: useDashboardData → defiService → pyth + kamino + jupiter

import { useWallet } from "@solana/wallet-adapter-react";
import { useDashboardData } from "../hooks/useDashboardData";
import PriceCard from "../components/PriceCard";
import SwapCard  from "../components/SwapCard";
import PoolCard  from "../components/PoolCard";

export default function DashboardPage() {
  const { publicKey } = useWallet();
  const { price, pools, quote, loading, error, refresh } = useDashboardData();

  const walletAddress = publicKey
    ? publicKey.toBase58().slice(0, 4) + "..." + publicKey.toBase58().slice(-4)
    : "Not connected";

  return (
    <div style={{
      fontFamily: "'Space Grotesk', sans-serif",
      background: "#080612", minHeight: "100vh",
      padding: "40px 32px", color: "#fff",
    }}>

      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 6, letterSpacing: "-1px" }}>
            👋 Dashboard
          </h1>
          <div style={{ fontSize: 13, color: "#9CA3AF" }}>
            Wallet: <span style={{ color: "#22D3EE", fontWeight: 600 }}>{walletAddress}</span>
          </div>
        </div>
        <button
          onClick={refresh}
          style={{
            padding: "9px 18px", border: "1px solid rgba(124,58,237,0.4)",
            borderRadius: 10, background: "transparent", color: "#A78BFA",
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 13,
            fontWeight: 600, cursor: "pointer",
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 12, padding: "12px 18px", marginBottom: 24, color: "#EF4444", fontSize: 13 }}>
          ⚠️ {error}
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "#9CA3AF", fontSize: 14 }}>
          ⏳ Loading live data from Pyth, Kamino & Jupiter...
        </div>
      )}

      {!loading && (
        <>
          {/* TOP: Price + Swap */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
            <PriceCard price={price} />
            <SwapCard  quote={quote} />
          </div>

          {/* POOLS */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 18, padding: 24, marginBottom: 24,
          }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 16 }}>
              💰 Best Yield Pools · Kamino Finance
            </div>
            {pools.length === 0 ? (
              <div style={{ color: "#6B7280", fontSize: 13 }}>No pools found.</div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {pools.map((pool, i) => <PoolCard key={i} pool={pool} />)}
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
}
