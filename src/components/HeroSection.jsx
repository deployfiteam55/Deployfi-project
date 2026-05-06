// ============================================================
//  DeployFi — Hero Section Component
//  File: src/components/HeroSection.jsx
// ============================================================
//
//  HOW TO ADD:
//  1. Save this file at: src/components/HeroSection.jsx
//  2. Open src/pages/HomePage.jsx
//  3. Add import at the top:
//       import HeroSection from '../components/HeroSection';
//  4. Add <HeroSection /> as the FIRST thing inside the return:
//
//       return (
//         <div style={styles.page}>
//           <HeroSection />          ← ADD THIS LINE
//           <div style={styles.statsRow}>   ← existing content below
//             ...
//
//  That's it! Hero appears above your stats and token grid.
//
// ============================================================

import { useNavigate } from "react-router-dom";

// ── FEATURE CARD ─────────────────────────────────────────────
function FeatureCard({ emoji, bg, title, desc, tag, tagBg, tagColor }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(124,58,237,0.2)",
        borderRadius: 16,
        padding: 22,
        transition: "border-color 0.2s, background 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)";
        e.currentTarget.style.background  = "rgba(124,58,237,0.07)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(124,58,237,0.2)";
        e.currentTarget.style.background  = "rgba(255,255,255,0.04)";
      }}
    >
      {/* Icon */}
      <div style={{
        width: 40, height: 40, borderRadius: 10,
        background: bg,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, marginBottom: 14,
      }}>
        {emoji}
      </div>

      {/* Title */}
      <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
        {title}
      </div>

      {/* Description */}
      <div style={{ fontSize: 12, color: "#9CA3AF", lineHeight: 1.6 }}>
        {desc}
      </div>

      {/* Tag */}
      <span style={{
        display: "inline-block",
        fontSize: 11, fontWeight: 600,
        padding: "3px 8px", borderRadius: 20,
        marginTop: 10,
        background: tagBg,
        color: tagColor,
      }}>
        {tag}
      </span>
    </div>
  );
}

// ── MAIN HERO SECTION ────────────────────────────────────────
export default function HeroSection() {
  const navigate = useNavigate();

  const features = [
    {
      emoji: "🚀",
      bg: "rgba(124,58,237,0.18)",
      title: "Token Launch",
      desc: "Launch your own Solana token in minutes with our no-code launchpad. Set supply, price, and go live instantly.",
      tag: "2 SOL flat fee",
      tagBg: "rgba(124,58,237,0.15)",
      tagColor: "#A78BFA",
    },
    {
      emoji: "💎",
      bg: "rgba(34,211,238,0.12)",
      title: "DeFi Hub",
      desc: "Earn up to 38.5% APY by lending, swapping, or providing liquidity via Kamino, Orca, and Jupiter.",
      tag: "Up to 38.5% APY",
      tagBg: "rgba(34,211,238,0.1)",
      tagColor: "#22D3EE",
    },
    {
      emoji: "📊",
      bg: "rgba(16,185,129,0.12)",
      title: "Portfolio Dashboard",
      desc: "Track all your tokens, DeFi positions, and transaction history in one clean real-time dashboard.",
      tag: "Real-time data",
      tagBg: "rgba(16,185,129,0.1)",
      tagColor: "#10B981",
    },
  ];

  return (
    <div style={{
      fontFamily: "'Space Grotesk', sans-serif",
      padding: "60px 0 48px",
      boxSizing: "border-box",
    }}>

      {/* ── LIVE BADGE ───────────────────────────────── */}
      <div style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 12,
        fontWeight: 600,
        padding: "6px 14px",
        borderRadius: 20,
        background: "rgba(124,58,237,0.12)",
        color: "#A78BFA",
        border: "1px solid rgba(124,58,237,0.3)",
        marginBottom: 24,
      }}>
        {/* Pulsing dot */}
        <span style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "#A78BFA",
          display: "inline-block",
          animation: "dfPulse 1.5s infinite",
        }} />
        Live on Solana Mainnet
      </div>

      {/* ── HEADLINE ─────────────────────────────────── */}
      <h1 style={{
        fontSize: "clamp(32px, 5vw, 52px)",
        fontWeight: 900,
        color: "#fff",
        lineHeight: 1.1,
        marginBottom: 16,
        letterSpacing: "-1px",
      }}>
        Launch, Swap &{" "}
        <span style={{
          background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}>
          Deploy on Solana
        </span>
      </h1>

      {/* ── SUBTITLE ─────────────────────────────────── */}
      <p style={{
        fontSize: 16,
        color: "#9CA3AF",
        lineHeight: 1.7,
        maxWidth: 540,
        marginBottom: 36,
      }}>
        The all-in-one DeFi platform to launch your token, earn yield, and manage
        your Solana portfolio — all in one place. No code required.
      </p>

      {/* ── CTA BUTTONS ──────────────────────────────── */}
      <div style={{ display: "flex", gap: 12, marginBottom: 48, flexWrap: "wrap" }}>
        {/* Primary */}
        <button
          onClick={() => navigate("/launch")}
          style={{
            padding: "13px 28px",
            border: "none",
            borderRadius: 12,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
            color: "#fff",
            transition: "opacity 0.15s, transform 0.12s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          🚀 Launch Your Token
        </button>

        {/* Secondary */}
        <button
          onClick={() => navigate("/defi")}
          style={{
            padding: "13px 28px",
            border: "1px solid rgba(124,58,237,0.4)",
            borderRadius: 12,
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            background: "transparent",
            color: "#fff",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(124,58,237,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Explore DeFi →
        </button>
      </div>

      {/* ── TRUST ROW ────────────────────────────────── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 52,
      }}>
        {/* Avatar stack */}
        <div style={{ display: "flex" }}>
          {["AK", "MR", "JS", "PL", "+"].map((initials, i) => (
            <div key={i} style={{
              width: 28, height: 28,
              borderRadius: "50%",
              border: "2px solid #0D0818",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700,
              marginLeft: i === 0 ? 0 : -8,
              background: "rgba(124,58,237,0.3)",
              color: "#A78BFA",
              zIndex: 5 - i,
              position: "relative",
            }}>
              {initials}
            </div>
          ))}
        </div>

        <div style={{ fontSize: 13, color: "#9CA3AF" }}>
          Trusted by{" "}
          <span style={{ color: "#fff", fontWeight: 600 }}>8,200+</span>
          {" "}users ·{" "}
          <span style={{ color: "#fff", fontWeight: 600 }}>$2.4M+</span>
          {" "}in volume
        </div>
      </div>

      {/* ── FEATURE CARDS ────────────────────────────── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 14,
      }}>
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>

      {/* ── PULSE ANIMATION ──────────────────────────── */}
      <style>{`
        @keyframes dfPulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
      `}</style>

    </div>
  );
}
