// src/components/SwapCard.jsx
export default function SwapCard({ quote }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(34,211,238,0.25)",
      borderRadius: 16, padding: "20px 24px",
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8, fontWeight: 500 }}>
        Jupiter Swap Quote · 0.1 SOL → USDC
      </div>
      {quote ? (
        <>
          <div style={{ fontSize: 32, fontWeight: 900, color: "#22D3EE", marginBottom: 4 }}>
            {quote.outAmountFormatted} USDC
          </div>
          <div style={{ fontSize: 12, color: "#9CA3AF" }}>
            Route: {quote.route}
          </div>
        </>
      ) : (
        <div style={{ fontSize: 18, color: "#6B7280" }}>Loading...</div>
      )}
    </div>
  );
}
