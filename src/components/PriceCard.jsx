// src/components/PriceCard.jsx
export default function PriceCard({ price }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(124,58,237,0.25)",
      borderRadius: 16, padding: "20px 24px",
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 8, fontWeight: 500 }}>
        SOL Price · Pyth Network
      </div>
      {price ? (
        <>
          <div style={{ fontSize: 32, fontWeight: 900, color: "#fff", marginBottom: 4 }}>
            ${price.price}
          </div>
          <div style={{ fontSize: 12, color: "#9CA3AF" }}>
            Confidence: ±{price.confidence}
          </div>
        </>
      ) : (
        <div style={{ fontSize: 18, color: "#6B7280" }}>Loading...</div>
      )}
    </div>
  );
}
