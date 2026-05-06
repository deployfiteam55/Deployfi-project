// ============================================================
//  DeployFi — Navbar Component (Real Phantom Wallet)
//  File: src/components/Navbar.jsx
// ============================================================

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";


// Nav links — edit to add/remove pages
const NAV_LINKS = [
  { label: "Home",      path: "/" },
  { label: "Launch",    path: "/launch" },
  { label: "DeFi",      path: "/defi" },
  { label: "Dashboard", path: "/dashboard" },
];

export default function Navbar() {
  // ── REAL WALLET HOOKS ──────────────────────────────────────
  const { connected, publicKey, disconnect } = useWallet();
  const { connection } = useConnection();
  const { setVisible } = useWalletModal();

  // ── STATE ──────────────────────────────────────────────────
  const [solBalance, setSolBalance] = useState("0");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Current route for active link highlight
  const location = useLocation();
  const currentPath = location.pathname;

  // Short wallet address: "7xKp...3mNq"
  const walletAddress = publicKey
    ? publicKey.toBase58().slice(0, 4) + "..." + publicKey.toBase58().slice(-4)
    : "";

  // ── FETCH REAL SOL BALANCE ─────────────────────────────────
  useEffect(() => {
    if (!publicKey) return;
    connection
      .getBalance(publicKey)
      .then((bal) => setSolBalance((bal / LAMPORTS_PER_SOL).toFixed(2)))
      .catch(() => setSolBalance("0"));
  }, [publicKey, connection]);

  // ── COPY ADDRESS TO CLIPBOARD ──────────────────────────────
  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      alert("Address copied!");
    }
    setDropdownOpen(false);
  };

  // ── VIEW ON EXPLORER ───────────────────────────────────────
  const viewOnExplorer = () => {
    if (publicKey) {
      window.open(
        `https://explorer.solana.com/address/${publicKey.toBase58()}?cluster=devnet`,
        "_blank"
      );
    }
    setDropdownOpen(false);
  };

  // ── DISCONNECT ─────────────────────────────────────────────
  const handleDisconnect = () => {
    disconnect();
    setDropdownOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8"
      style={{
        height: "64px",
        background: "rgba(13,8,24,0.85)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(124,58,237,0.2)",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* ── LEFT: Logo ──────────────────────────────────────── */}
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
  <div style={{
    width: 32,
    height: 32,
    background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 16,
  }}>
    🚀
  </div>
  <span style={{ color: "#fff", fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px" }}>
    DeployFi
  </span>
</Link>

      {/* ── CENTER: Nav Links (desktop only) ────────────────── */}
      <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
        {NAV_LINKS.map(({ label, path }) => {
          const isActive = currentPath === path;
          return (
            <Link
              key={path}
              to={path}
              className="relative px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 no-underline"
              style={{
                color: isActive ? "#7C3AED" : "#9CA3AF",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = "#9CA3AF";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {label}
              {isActive && (
                <span
                  className="absolute bottom-0 left-4 right-4 rounded-full"
                  style={{
                    height: 2,
                    background: "linear-gradient(90deg, #7C3AED, #22D3EE)",
                  }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* ── RIGHT: Wallet Area ──────────────────────────────── */}
      <div className="flex items-center gap-2">
        {!connected ? (
          // NOT CONNECTED → show Connect Wallet button
          <button
            onClick={() => setVisible(true)}
            className="text-white text-sm font-semibold rounded-xl px-4 py-2 transition-all duration-150"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #6D28D9)",
              boxShadow: "0 0 20px rgba(124,58,237,0.4)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Connect Wallet
          </button>
        ) : (
          // CONNECTED → show balance + address dropdown
          <div className="flex items-center gap-2">

            {/* SOL Balance */}
            <span
              className="text-sm font-semibold rounded-lg px-3 py-1.5"
              style={{
                color: "#22D3EE",
                background: "rgba(34,211,238,0.08)",
                border: "1px solid rgba(34,211,238,0.22)",
              }}
            >
              ◎ {solBalance} SOL
            </span>

            {/* Wallet address + dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex items-center gap-2 text-sm font-medium rounded-lg px-3 py-1.5 transition-all duration-150"
                style={{
                  color: "#D1D5DB",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(124,58,237,0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(124,58,237,0.12)";
                  e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(124,58,237,0.25)";
                }}
              >
                {walletAddress}
                <svg
                  width="10" height="10" viewBox="0 0 10 10" fill="none"
                  style={{
                    transition: "transform 0.15s",
                    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div
                  className="absolute right-0 mt-2 rounded-xl overflow-hidden z-50"
                  style={{
                    width: 180,
                    background: "#160D28",
                    border: "1px solid rgba(124,58,237,0.3)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  {[
                    { icon: "📋", label: "Copy Address",     action: copyAddress },
                    { icon: "🔗", label: "View on Explorer", action: viewOnExplorer },
                    { icon: "🔌", label: "Disconnect",       action: handleDisconnect },
                  ].map(({ icon, label, action }) => (
                    <button
                      key={label}
                      onClick={action}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors duration-100"
                      style={{ color: label === "Disconnect" ? "#EF4444" : "#D1D5DB" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(124,58,237,0.15)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <span style={{ fontSize: 14 }}>{icon}</span>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── MOBILE: Hamburger ─────────────────────────────── */}
        <button
          className="flex md:hidden flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block rounded-full transition-all duration-200"
              style={{
                width: 20, height: 2,
                background: "#9CA3AF",
                transformOrigin: "center",
                transform:
                  menuOpen && i === 0 ? "rotate(45deg) translateY(5px)"
                  : menuOpen && i === 1 ? "scaleX(0)"
                  : menuOpen && i === 2 ? "rotate(-45deg) translateY(-5px)"
                  : "none",
              }}
            />
          ))}
        </button>
      </div>

      {/* ── MOBILE MENU ─────────────────────────────────────── */}
      {menuOpen && (
        <div
          className="absolute top-16 left-0 right-0 flex flex-col md:hidden"
          style={{
            background: "rgba(13,8,24,0.97)",
            borderBottom: "1px solid rgba(124,58,237,0.2)",
            backdropFilter: "blur(20px)",
          }}
        >
          {NAV_LINKS.map(({ label, path }) => {
            const isActive = currentPath === path;
            return (
              <Link
                key={path}
                to={path}
                onClick={() => setMenuOpen(false)}
                className="px-6 py-4 text-sm font-medium no-underline border-b"
                style={{
                  color: isActive ? "#7C3AED" : "#9CA3AF",
                  borderColor: "rgba(124,58,237,0.12)",
                }}
              >
                {label}
              </Link>
            );
          })}

          {/* Mobile wallet button */}
          <div className="px-6 py-4">
            {!connected ? (
              <button
                onClick={() => { setVisible(true); setMenuOpen(false); }}
                className="w-full text-white text-sm font-semibold rounded-xl px-4 py-2"
                style={{ background: "linear-gradient(135deg, #7C3AED, #6D28D9)" }}
              >
                Connect Wallet
              </button>
            ) : (
              <button
                onClick={() => { handleDisconnect(); setMenuOpen(false); }}
                className="w-full text-sm font-semibold rounded-xl px-4 py-2"
                style={{
                  background: "rgba(239,68,68,0.1)",
                  color: "#EF4444",
                  border: "1px solid rgba(239,68,68,0.3)",
                }}
              >
                Disconnect ({walletAddress})
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}