// ============================================================
//  DeployFi — Full Landing Page
//  File: src/pages/HomePage.jsx
//  Replaces your existing HomePage.jsx completely
// ============================================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const STATS = [
  { label: "Total Value Locked", value: "$14,208,392.12" },
  { label: "Tokens Launched",    value: "1,402" },
  { label: "Active Users",       value: "24.5k" },
  { label: "SOL Network TPS",    value: "2,840" },
];

const FEATURES = [
  { icon: "⚡", title: "Instant Launch",      desc: "Deploy SPL tokens on Solana instantly. No coding required. Automatic liquidity pair creation and listing on our internal DEX." },
  { icon: "💎", title: "Advanced DeFi",       desc: "High-yield pools, concentrated liquidity, and one-click execution engines designed for professional traders." },
  { icon: "🛡️", title: "Verified Contracts", desc: "All tokens launched through DeployFi use audited templates. Built-in mint/freeze authority management for security." },
  { icon: "📊", title: "Deep Analytics",      desc: "Monitor holder distribution, market sentiment, and trading volume in real-time with our custom dashboard." },
];

const STEPS = [
  { num: 1, title: "Configure", desc: "Define your tokenomics, supply, and metadata." },
  { num: 2, title: "Launch",    desc: "One-click deployment to the Solana network." },
  { num: 3, title: "Scale",     desc: "Provide liquidity and start trading on DeployFi." },
];

const PARTNERS = ["SOLANA FOUNDATION", "RUST CORE", "METAPLEX", "PYTH NETWORK", "SERUM DEX"];
const FOOTER_LINKS = ["Documentation", "Analytics", "Twitter", "Discord"];

function FeatureCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(124,58,237,0.08)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 16, padding: "32px 28px",
        cursor: "default", transition: "all 0.2s ease",
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{title}</div>
      <div style={{ fontSize: 13, color: "#9CA3AF", lineHeight: 1.7 }}>{desc}</div>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: "#080612", minHeight: "100vh", color: "#fff" }}>

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "80px 32px 60px", maxWidth: 760, margin: "0 auto" }}>
        <h1 style={{ fontSize: "clamp(40px, 6vw, 68px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 20, letterSpacing: "-1.5px" }}>
          Launch. Swap. Earn.
        </h1>
        <p style={{ fontSize: 16, color: "#9CA3AF", lineHeight: 1.7, maxWidth: 540, margin: "0 auto 36px" }}>
          The ultimate decentralized launchpad and DeFi suite. Create custom tokens on Solana Devnet in seconds and manage your liquidity with institutional-grade tools.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/launch")}
            style={{ padding: "14px 32px", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer", background: "transparent", color: "#fff", transition: "all 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >Start Launching</button>
          <button
            onClick={() => navigate("/defi")}
            style={{ padding: "14px 32px", border: "1px solid rgba(124,58,237,0.6)", borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, cursor: "pointer", background: "transparent", color: "#22D3EE", transition: "all 0.15s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(34,211,238,0.07)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >Explore DeFi</button>
        </div>
      </div>

      {/* STATS BAR */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "0 32px 80px", padding: "24px 36px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, flexWrap: "wrap", gap: 24 }}>
        {STATS.map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <div style={{ padding: "60px 32px 80px", textAlign: "center" }}>
  <div style={{ fontSize: 32, fontWeight: 700, color: "#fff", marginBottom: 60, letterSpacing: "-0.5px" }}>How It Works</div>
  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", maxWidth: 700, margin: "0 auto", flexWrap: "wrap" }}>
    {STEPS.map((step, i) => (
      <React.Fragment key={step.num}>
        <div style={{ textAlign: "center", width: 160 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 600, color: "#fff", margin: "0 auto 16px" }}>
            {step.num}
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 6 }}>
            {step.title}
          </div>
          <div style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.5 }}>
            {step.desc}
          </div>
        </div>
        {i < STEPS.length - 1 && (
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.15)", minWidth: 60, maxWidth: 100, margin: "0 8px", marginBottom: 40 }} />
        )}
      </React.Fragment>
    ))}
  </div>
</div>

      {/* PARTNERS */}
      <div style={{ padding: "40px 32px 80px", display: "flex", justifyContent: "center", alignItems: "center", gap: 48, flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        {PARTNERS.map((p, i) => (
          <span key={i} style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em" }}>{p}</span>
        ))}
      </div>

      {/* FOOTER */}
      <footer style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "28px 32px", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, background: "linear-gradient(135deg, #7C3AED, #22D3EE)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🚀</div>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>DeployFi</span>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {FOOTER_LINKS.map((link, i) => (
            <span key={i} style={{ fontSize: 13, color: "#6B7280", cursor: "pointer", transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >{link}</span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: "#4B5563" }}>© 2024 DeployFi. Built on Solana Devnet.</div>
      </footer>

    </div>
  );
}