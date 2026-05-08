// src/components/PoolCard.jsx
export default function PoolCard({ pool }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(16,185,129,0.2)",
      borderRadius: 12, padding: "14px 16px",
      fontFamily: "'Space Grotesk', sans-serif",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 2 }}>
          {pool.name}
        </div>
        <div style={{ fontSize: 11, color: "#9CA3AF" }}>
          {pool.token} · TVL {pool.tvl || "N/A"}
        </div>
      </div>
      <div style={{
        fontSize: 16, fontWeight: 700, color: "#10B981",
        background: "rgba(16,185,129,0.1)",
        border: "1px solid rgba(16,185,129,0.25)",
        borderRadius: 8, padding: "6px 12px",
      }}>
        {typeof pool.apy === "number" ? pool.apy.toFixed(2) + "%" : pool.apy}
      </div>
    </div>
  );
}
