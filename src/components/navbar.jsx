// ============================================================
//  DeployFi — Navbar Component
//  Stack: React + TailwindCSS
//  From: DeployFi UI/UX Design Guide (Solana Hackathon 2025)
// ============================================================

import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // npm install react-router-dom

// ── STEP-BY-STEP SETUP GUIDE ─────────────────────────────────
//
//  STEP 1 — Install dependencies
//  ┌─────────────────────────────────────────────────────────┐
//  │  npm install react-router-dom                           │
//  │  npm install @solana/wallet-adapter-react               │
//  │  npm install @solana/wallet-adapter-wallets             │
//  │  npm install @solana/web3.js                            │
//  └─────────────────────────────────────────────────────────┘
//
//  STEP 2 — Add Google Font to your index.html <head>
//  ┌─────────────────────────────────────────────────────────┐
//  │  <link rel="preconnect" href="https://fonts.googleapis.com">             │
//  │  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet"> │
//  └─────────────────────────────────────────────────────────┘
//
//  STEP 3 — Add these custom colors in tailwind.config.js
//  ┌─────────────────────────────────────────────────────────┐
//  │  module.exports = {                                     │
//  │    theme: {                                             │
//  │      extend: {                                          │
//  │        colors: {                                        │
//  │          'df-bg':      '#0D0818',                       │
//  │          'df-purple':  '#7C3AED',                       │
//  │          'df-cyan':    '#22D3EE',                       │
//  │          'df-purple2': '#6D28D9',                       │
//  │        },                                               │
//  │        fontFamily: {                                    │
//  │          grotesk: ['Space Grotesk', 'sans-serif'],      │
//  │        },                                               │
//  │      },                                                 │
//  │    },                                                   │
//  │  }                                                      │
//  └─────────────────────────────────────────────────────────┘
//
//  STEP 4 — Wrap your App with BrowserRouter + WalletProvider
//           (see bottom of this file for App.jsx example)
//
//  STEP 5 — Import and place <Navbar /> in your App layout
//  ┌─────────────────────────────────────────────────────────┐
//  │  import Navbar from './components/Navbar';              │
//  │  <Navbar />                                             │
//  └─────────────────────────────────────────────────────────┘
//
// ─────────────────────────────────────────────────────────────

// Nav links config — edit to add/remove pages
const NAV_LINKS = [
  { label: "Home",      path: "/" },
  { label: "Launch",    path: "/launch" },
  { label: "DeFi",      path: "/defi" },
  { label: "Dashboard", path: "/dashboard" },
];

// ── MAIN NAVBAR COMPONENT ────────────────────────────────────
export default function Navbar() {
  // 🔁 Replace with real Solana wallet adapter hooks:
  //    const { connected, publicKey, disconnect } = useWallet();
  //    const { select, wallets } = useWalletModal();
  const [connected, setConnected] = useState(false);         // mock state
  const [walletAddress] = useState("7xKp...3mNq");           // mock address
  const [solBalance]    = useState("10.5");                  // mock balance
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);

  // Get current route for active link highlight
  // If not using React Router, replace this with your own active-page logic
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    // Fixed navbar — always visible at top
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
      {/* ── LEFT: Logo ────────────────────────────────── */}
      <Link to="/" className="flex items-center gap-2 no-underline">
        {/* Rocket icon badge */}
        <div
          className="flex items-center justify-center rounded-lg text-base"
          style={{
            width: 32,
            height: 32,
            background: "linear-gradient(135deg, #7C3AED, #22D3EE)",
          }}
        >
          🚀
        </div>
        <span className="text-white font-bold text-lg tracking-tight">
          DeployFi
        </span>
      </Link>

      {/* ── CENTER: Nav Links (hidden on mobile) ──────── */}
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
              {/* Active underline — purple-to-cyan gradient */}
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

      {/* ── RIGHT: Wallet Area ────────────────────────── */}
      <div className="flex items-center gap-2">
        {!connected ? (
          // ── NOT CONNECTED: Show Connect Wallet button
          <button
            onClick={() => setConnected(true)}
            // 🔁 Replace onClick with: () => select(WalletName.Phantom)
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
          // ── CONNECTED: Show SOL balance + short address
          <div className="flex items-center gap-2">
            {/* SOL Balance badge */}
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

            {/* Wallet address with dropdown */}
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
                {/* Chevron arrow — rotates when open */}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  style={{
                    transition: "transform 0.15s",
                    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <path d="M2 3.5L5 6.5L8 3.5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Dropdown menu */}
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
                    { icon: "📋", label: "Copy Address" },
                    { icon: "🔗", label: "View on Explorer" },
                    { icon: "🔌", label: "Disconnect" },
                  ].map(({ icon, label }) => (
                    <button
                      key={label}
                      onClick={() => {
                        if (label === "Disconnect") setConnected(false);
                        setDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors duration-100"
                      style={{ color: "#D1D5DB" }}
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

        {/* ── MOBILE: Hamburger Icon ─────────────────── */}
        <button
          className="flex md:hidden flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block rounded-full transition-all duration-200"
              style={{
                width: 20,
                height: 2,
                background: "#9CA3AF",
                transformOrigin: "center",
                // Animate into X on open
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

      {/* ── MOBILE MENU (full-screen dropdown) ────────── */}
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
        </div>
      )}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
//  STEP 4 EXAMPLE — App.jsx with providers
// ─────────────────────────────────────────────────────────────
//
//  import { BrowserRouter, Routes, Route } from 'react-router-dom';
//  import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
//  import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
//  import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
//  import { clusterApiUrl } from '@solana/web3.js';
//  import Navbar from './components/Navbar';
//  import HomePage from './pages/HomePage';
//  import LaunchPage from './pages/LaunchPage';
//  import DeFiPage from './pages/DeFiPage';
//  import DashboardPage from './pages/DashboardPage';
//
//  const wallets = [new PhantomWalletAdapter()];
//
//  export default function App() {
//    return (
//      <ConnectionProvider endpoint={clusterApiUrl('mainnet-beta')}>
//        <WalletProvider wallets={wallets} autoConnect>
//          <WalletModalProvider>
//            <BrowserRouter>
//              {/* Spacer below fixed navbar */}
//              <div style={{ paddingTop: 64 }}>
//                <Navbar />
//                <Routes>
//                  <Route path="/"          element={<HomePage />} />
//                  <Route path="/launch"    element={<LaunchPage />} />
//                  <Route path="/defi"      element={<DeFiPage />} />
//                  <Route path="/dashboard" element={<DashboardPage />} />
//                </Routes>
//              </div>
//            </BrowserRouter>
//          </WalletModalProvider>
//        </WalletProvider>
//      </ConnectionProvider>
//    );
//  }
//
// ─────────────────────────────────────────────────────────────
//  REAL WALLET INTEGRATION (replace mock state in Navbar)
// ─────────────────────────────────────────────────────────────
//
//  1. Import at top of Navbar.jsx:
//     import { useWallet } from '@solana/wallet-adapter-react';
//     import { useWalletModal } from '@solana/wallet-adapter-react-ui';
//
//  2. Replace mock state lines with:
//     const { connected, publicKey, disconnect } = useWallet();
//     const { setVisible } = useWalletModal();
//
//  3. Replace mock address/balance:
//     const shortAddr = publicKey
//       ? publicKey.toBase58().slice(0,4) + '...' + publicKey.toBase58().slice(-4)
//       : '';
//     // Fetch balance with: connection.getBalance(publicKey)
//
//  4. Replace Connect button onClick:
//     onClick={() => setVisible(true)}
//
//  5. Replace Disconnect button onClick:
//     onClick={() => disconnect()}
//
// ─────────────────────────────────────────────────────────────