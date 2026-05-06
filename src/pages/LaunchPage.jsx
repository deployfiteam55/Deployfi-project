// ============================================================
//  DeployFi — Launch Token Page (matching screenshot)
//  File: src/pages/LaunchPage.jsx
// ============================================================

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

const RECENT_LAUNCHES = [
  { emoji: "🧠", bg: "rgba(124,58,237,0.2)", name: "Neural Net",     symbol: "NNET", price: "0.042 SOL", mcap: "$1.2M",  status: "ACTIVE" },
  { emoji: "🌀", bg: "rgba(239,68,68,0.15)", name: "Void Protocol",  symbol: "VOID", price: "0.008 SOL", mcap: "$450K", status: "ACTIVE" },
];

function CheckItem({ done, dimmed, label }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "14px 16px",
      background: "rgba(255,255,255,0.02)",
      border: "1px solid rgba(255,255,255,0.06)",
      borderRadius: 10,
      opacity: dimmed ? 0.4 : 1,
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: "50%",
        border: `2px solid ${done ? "#7C3AED" : "rgba(255,255,255,0.2)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        {done && <span style={{ color: "#7C3AED", fontSize: 12 }}>✓</span>}
      </div>
      <span style={{ fontSize: 13, color: done ? "#fff" : "#9CA3AF", fontWeight: done ? 600 : 400 }}>
        {label}
      </span>
    </div>
  );
}

export default function LaunchPage() {
  const { connected } = useWallet();

  const [form, setForm] = useState({
    name: "", symbol: "", supply: "1,000,000",
    price: "0.001", description: "", image: null,
  });
  const [launching, setLaunching] = useState(false);
  const [launched,  setLaunched]  = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const metadataValid = form.name.trim().length > 0 && form.symbol.trim().length > 0;

  const handleLaunch = async () => {
    if (!metadataValid) return alert("Please fill in Token Name and Symbol.");
    if (!connected)     return alert("Please connect your wallet first.");
    setLaunching(true);
    await new Promise((r) => setTimeout(r, 2000));
    setLaunching(false);
    setLaunched(true);
  };

  const inp = {
    width: "100%", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8,
    padding: "11px 14px", color: "#fff",
    fontFamily: "'Space Grotesk', sans-serif", fontSize: 13,
    outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: "#080612", minHeight: "100vh", color: "#fff", padding: "40px 32px 60px" }}>

      {/* PAGE TITLE */}
      <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 900, color: "#fff", marginBottom: 10, letterSpacing: "-1px" }}>
        Launch Your Token
      </h1>
      <p style={{ fontSize: 14, color: "#9CA3AF", marginBottom: 40, maxWidth: 480 }}>
        Deploy a high-performance token on Solana in seconds. Institutional-grade security with cyberpunk precision.
      </p>

      {launched && (
        <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 12, padding: "14px 20px", marginBottom: 28, color: "#10B981", fontWeight: 600, fontSize: 14 }}>
          ✅ Token launched successfully on Solana Devnet!
        </div>
      )}

      {/* MAIN GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>

        {/* LEFT: FORM */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 28 }}>

          {/* Form header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#7C3AED" }}>Token Metadata</span>
            <span style={{ fontSize: 22 }}>🚀</span>
          </div>

          {/* Name + Symbol */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={{ fontSize: 11, color: "#9CA3AF", display: "block", marginBottom: 6 }}>Token Name</label>
              <input style={inp} placeholder="e.g. Cyber Credits" value={form.name} onChange={set("name")} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#9CA3AF", display: "block", marginBottom: 6 }}>Token Symbol</label>
              <input style={inp} placeholder="E.G. CYBER" value={form.symbol} onChange={set("symbol")} maxLength={6} />
            </div>
          </div>

          {/* Supply + Price */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <label style={{ fontSize: 11, color: "#9CA3AF", display: "block", marginBottom: 6 }}>Total Supply</label>
              <input style={inp} placeholder="1,000,000" value={form.supply} onChange={set("supply")} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: "#9CA3AF", display: "block", marginBottom: 6 }}>Initial Price (SOL)</label>
              <input style={inp} placeholder="0.001" value={form.price} onChange={set("price")} />
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, color: "#9CA3AF", display: "block", marginBottom: 6 }}>Description</label>
            <textarea
              style={{ ...inp, resize: "none", height: 90, lineHeight: 1.6 }}
              placeholder="Tell the world about your vision..."
              value={form.description}
              onChange={set("description")}
            />
          </div>

          {/* Image Upload */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 11, color: "#9CA3AF", display: "block", marginBottom: 6 }}>Image Upload</label>
            <div style={{
              border: "1px dashed rgba(124,58,237,0.35)",
              borderRadius: 10, padding: "28px 16px",
              textAlign: "center", cursor: "pointer",
              background: "rgba(124,58,237,0.04)",
            }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>📁</div>
              <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 4 }}>Drag and drop or click to upload token logo</div>
              <div style={{ fontSize: 10, color: "#4B5563" }}>PNG, JPG, SVG (Max 5MB)</div>
            </div>
          </div>

          {/* Launch Button */}
          <button
            onClick={handleLaunch}
            disabled={launching || launched}
            style={{
              width: "100%", padding: "14px 0",
              background: launched ? "rgba(16,185,129,0.2)" : "rgba(124,58,237,0.15)",
              border: `1px solid ${launched ? "rgba(16,185,129,0.4)" : "rgba(124,58,237,0.5)"}`,
              borderRadius: 10,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 15, fontWeight: 700,
              color: launched ? "#10B981" : "#A78BFA",
              cursor: launching || launched ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.15s",
              opacity: launching ? 0.7 : 1,
            }}
          >
            <span>⚡</span>
            {launched ? "Launched!" : launching ? "Launching..." : "Launch Now"}
          </button>
        </div>

        {/* RIGHT: PREVIEW + NETWORK STATUS */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Token Preview */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 24, flex: 1 }}>

            {/* Top row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: "rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                🪙
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "3px 8px", letterSpacing: "0.1em" }}>
                DRAFT MODE
              </span>
            </div>

            {/* Token name */}
            <div style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 4, letterSpacing: "-0.5px" }}>
              {form.name || "Token Name"}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#7C3AED", marginBottom: 20, letterSpacing: "0.05em" }}>
              {form.symbol.toUpperCase() || "SYMBOL"}
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 16 }} />

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 4 }}>Total Supply</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{form.supply || "1,000,000"}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 4 }}>Launch Price</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{form.price ? `${form.price} SOL` : "0.00 SOL"}</div>
              </div>
            </div>

            {/* Description preview */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 6 }}>Description Preview</div>
              <div style={{ fontSize: 12, color: "#6B7280", fontStyle: "italic", lineHeight: 1.6 }}>
                "{form.description || 'The decentralized future awaits your metadata... Start typing to see your token come to life in this high-fidelity preview.'}"
              </div>
            </div>

            {/* Simulation badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
              <span style={{ fontSize: 10, color: "#10B981", fontWeight: 600, letterSpacing: "0.05em" }}>SIMULATION READY</span>
            </div>
          </div>

          {/* Network Status */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Network Status</div>
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 999, height: 6, marginBottom: 10, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "45%", borderRadius: 999, background: "linear-gradient(90deg, #7C3AED, #22D3EE)" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontSize: 10, color: "#4B5563", fontWeight: 600, letterSpacing: "0.06em" }}>
              <span>IPFS STORAGE</span>
              <span style={{ textAlign: "center" }}>ON-CHAIN DEPLOY</span>
              <span style={{ textAlign: "right" }}>VERIFICATION</span>
            </div>
          </div>
        </div>
      </div>

      {/* LAUNCH CHECKLIST */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 24, marginBottom: 48, maxWidth: "calc(50% - 10px)" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#7C3AED", marginBottom: 16 }}>Launch Checklist</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <CheckItem done={metadataValid}  dimmed={false} label="Metadata valid" />
          <CheckItem done={connected}      dimmed={false} label="Wallet connected" />
          <CheckItem done={false}          dimmed={true}  label="Sufficient balance (0.5 SOL)" />
        </div>
      </div>

      {/* RECENT LAUNCHES */}
      <div style={{ marginBottom: 60 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>Recent Launches</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>Live activity from the DeployFi ecosystem</div>
          </div>
          <span style={{ fontSize: 13, color: "#7C3AED", cursor: "pointer", fontWeight: 600 }}>View All →</span>
        </div>

        {/* Table */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, overflow: "hidden" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "12px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)", fontSize: 11, color: "#6B7280", fontWeight: 600, letterSpacing: "0.05em" }}>
            <span>Token</span><span>Price</span><span>Market Cap</span><span>Status</span><span>Action</span>
          </div>
          {/* Rows */}
          {RECENT_LAUNCHES.map((t, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", padding: "16px 20px", alignItems: "center", borderBottom: i < RECENT_LAUNCHES.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{t.emoji}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: "#6B7280" }}>{t.symbol}</div>
                </div>
              </div>
              <span style={{ fontSize: 13, color: "#22D3EE", fontWeight: 600 }}>{t.price}</span>
              <span style={{ fontSize: 13, color: "#D1D5DB" }}>{t.mcap}</span>
              <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, color: "#10B981", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 4, padding: "3px 8px", letterSpacing: "0.05em" }}>{t.status}</span>
              <span style={{ fontSize: 16, color: "#9CA3AF", cursor: "pointer" }}>↗</span>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 28, borderTop: "1px solid rgba(255,255,255,0.06)", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 24, height: 24, background: "linear-gradient(135deg, #7C3AED, #22D3EE)", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>🚀</div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>DeployFi</span>
          </div>
          <div style={{ fontSize: 11, color: "#4B5563" }}>© 2024 DeployFi. Built on Solana Devnet.</div>
        </div>
        <div style={{ display: "flex", gap: 28 }}>
          {["Documentation", "Analytics", "Twitter", "Governance"].map((l, i) => (
            <span key={i} style={{ fontSize: 13, color: "#6B7280", cursor: "pointer" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
            >{l}</span>
          ))}
        </div>
      </footer>

    </div>
  );
}