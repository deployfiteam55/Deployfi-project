import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const NAV_LINKS = [
  { label: "Home",      path: "/" },
  { label: "Launch",    path: "/launch" },
  { label: "DeFi",      path: "/defi" },
  { label: "Dashboard", path: "/dashboard" },
];

const WALLET_ICONS = {
  Phantom: "P", Solflare: "S", Backpack: "B",
  "Magic Eden": "M", Exodus: "E", Coinbase: "C",
  Brave: "Br", Glow: "G", Torus: "T",
  MathWallet: "MW", Coin98: "98", Clover: "CL",
};

export default function Navbar() {
  const { connected, publicKey, disconnect, wallet } = useWallet();
  const { connection } = useConnection();
  const { setVisible } = useWalletModal();

  const [solBalance, setSolBalance]     = useState("0");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen]         = useState(false);
  const [copied, setCopied]             = useState(false);

  const location    = useLocation();
  const currentPath = location.pathname;

  const walletName  = wallet?.adapter?.name || "";
  const walletIcon  = WALLET_ICONS[walletName] || "W";
  const walletShort = publicKey
    ? publicKey.toBase58().slice(0, 4) + "..." + publicKey.toBase58().slice(-4)
    : "";

  useEffect(() => {
    if (!publicKey) return;
    connection
      .getBalance(publicKey)
      .then((bal) => setSolBalance((bal / LAMPORTS_PER_SOL).toFixed(2)))
      .catch(() => setSolBalance("0"));
  }, [publicKey, connection]);

  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest("#wallet-dd")) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
    setDropdownOpen(false);
  };

  const viewOnExplorer = () => {
    if (publicKey)
      window.open(
        `https://explorer.solana.com/address/${publicKey.toBase58()}?cluster=devnet`,
        "_blank"
      );
    setDropdownOpen(false);
  };

  const handleChangeWallet = () => {
    setDropdownOpen(false);
    setVisible(true);
  };

  const handleDisconnect = () => {
    disconnect();
    setDropdownOpen(false);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        .nav-root {
          position:fixed; top:0; left:0; right:0; z-index:50;
          height:64px;
          background:rgba(10,6,20,0.90);
          backdrop-filter:blur(24px);
          border-bottom:1px solid rgba(124,58,237,0.18);
          font-family:'Space Grotesk',sans-serif;
        }
        .nav-inner {
          max-width:1280px; margin:0 auto; height:100%;
          display:grid; grid-template-columns:1fr auto 1fr;
          align-items:center; padding:0 24px; gap:16px;
        }
        .nav-logo {
          display:flex; align-items:center; gap:9px;
          text-decoration:none; justify-self:start;
        }
        .nav-logo-icon {
          width:34px; height:34px; border-radius:9px; flex-shrink:0;
          background:linear-gradient(135deg,#7C3AED,#22D3EE);
          display:flex; align-items:center; justify-content:center;
          font-size:17px; color:white; font-weight:700;
        }
        .nav-logo-text {
          color:#fff; font-weight:700; font-size:18px;
          letter-spacing:-0.4px; white-space:nowrap;
        }
        .nav-links { display:flex; align-items:center; gap:2px; justify-self:center; }
        .nav-link {
          position:relative; padding:6px 14px; border-radius:8px;
          font-size:14px; font-weight:500; color:#9CA3AF;
          text-decoration:none; transition:color .15s,background .15s; white-space:nowrap;
        }
        .nav-link:hover { color:#E5E7EB; background:rgba(255,255,255,0.06); }
        .nav-link.active { color:#A78BFA; }
        .nav-link-bar {
          position:absolute; bottom:2px; left:14px; right:14px;
          height:2px; border-radius:99px;
          background:linear-gradient(90deg,#7C3AED,#22D3EE);
        }
        .nav-wallet { justify-self:end; display:flex; align-items:center; gap:8px; }
        .btn-connect {
          color:#fff; font-size:13.5px; font-weight:600;
          font-family:'Space Grotesk',sans-serif;
          border:none; border-radius:10px; padding:7px 18px; cursor:pointer;
          background:linear-gradient(135deg,#7C3AED,#6D28D9);
          box-shadow:0 0 18px rgba(124,58,237,0.35);
          transition:opacity .15s; white-space:nowrap;
        }
        .btn-connect:hover { opacity:.88; }
        .balance-chip {
          display:flex; align-items:center; gap:5px;
          padding:6px 11px; border-radius:8px;
          font-size:13px; font-weight:600; color:#22D3EE;
          background:rgba(34,211,238,0.07); border:1px solid rgba(34,211,238,0.2);
          white-space:nowrap;
        }
        .wallet-btn {
          display:flex; align-items:center; gap:7px;
          padding:6px 11px; border-radius:8px;
          font-size:13px; font-weight:500;
          font-family:'Space Grotesk',sans-serif; color:#D1D5DB;
          background:rgba(255,255,255,0.05); border:1px solid rgba(124,58,237,0.22);
          cursor:pointer; transition:background .15s; white-space:nowrap;
        }
        .wallet-btn:hover { background:rgba(124,58,237,0.10); border-color:rgba(124,58,237,0.45); }
        .wallet-dot {
          width:7px; height:7px; border-radius:50%; flex-shrink:0;
          background:#22C55E; box-shadow:0 0 6px #22C55E;
        }
        .wallet-badge {
          font-size:11px; font-weight:600; color:#A78BFA;
          background:rgba(124,58,237,0.14); padding:1px 6px;
          border-radius:4px;
        }
        .chevron { transition:transform .15s; color:#6B7280; }
        .chevron.open { transform:rotate(180deg); }
        .dropdown {
          position:absolute; top:calc(100% + 8px); right:0; width:215px;
          background:#110A22; border:1px solid rgba(124,58,237,0.28);
          border-radius:12px; overflow:hidden;
          box-shadow:0 12px 40px rgba(0,0,0,0.5); z-index:100;
        }
        .dd-header {
          padding:11px 14px 9px;
          border-bottom:1px solid rgba(124,58,237,0.12);
        }
        .dd-header-row {
          display:flex; align-items:center;
          justify-content:space-between; margin-bottom:4px;
        }
        .dd-label {
          font-size:10px; font-weight:600;
          letter-spacing:.8px; text-transform:uppercase; color:#6B7280;
        }
        .dd-wallet-name { font-size:12px; font-weight:600; color:#A78BFA; }
        .dd-addr { font-size:12px; font-weight:600; color:#E5E7EB; font-family:monospace; }
        .dd-item {
          width:100%; display:flex; align-items:center; gap:10px;
          padding:10px 14px; font-size:13px;
          font-family:'Space Grotesk',sans-serif; font-weight:500;
          text-align:left; cursor:pointer; border:none; background:transparent;
          transition:background .1s;
        }
        .dd-item:hover { background:rgba(124,58,237,0.13); }
        .dd-item.danger { color:#F87171; }
        .dd-item:not(.danger) { color:#D1D5DB; }
        .dd-icon {
          width:28px; height:28px; border-radius:7px;
          display:flex; align-items:center; justify-content:center;
          font-size:13px; background:rgba(255,255,255,0.06); flex-shrink:0;
        }
        .hamburger {
          display:none; flex-direction:column; gap:5px;
          padding:6px; background:transparent; border:none; cursor:pointer;
        }
        .ham-bar {
          width:20px; height:2px; background:#9CA3AF;
          border-radius:99px; transition:transform .2s,opacity .2s; display:block;
        }
        .mobile-menu {
          position:fixed; top:64px; left:0; right:0; z-index:49;
          background:rgba(10,6,20,0.98); backdrop-filter:blur(20px);
          border-bottom:1px solid rgba(124,58,237,0.18); padding:8px 0 16px;
        }
        .mobile-link {
          display:block; padding:11px 24px; font-size:14px; font-weight:500;
          color:#9CA3AF; text-decoration:none; transition:color .15s,background .15s;
        }
        .mobile-link:hover,.mobile-link.active { color:#A78BFA; background:rgba(124,58,237,0.07); }
        .mobile-wallet-area {
          padding:12px 24px 4px;
          border-top:1px solid rgba(124,58,237,0.10); margin-top:6px;
        }
        .mobile-btn {
          width:100%; padding:8px 14px; border-radius:10px;
          font-size:13px; font-weight:600;
          font-family:'Space Grotesk',sans-serif; cursor:pointer; border:none;
        }
        @media (max-width:768px) {
          .nav-links    { display:none; }
          .hamburger    { display:flex; }
          .balance-chip { display:none; }
          .wallet-badge { display:none; }
          .nav-inner    { grid-template-columns:1fr auto; }
        }
      `}</style>

      <nav className="nav-root">
        <div className="nav-inner">

          <Link to="/" className="nav-logo">
            <div className="nav-logo-icon">D</div>
            <span className="nav-logo-text">DeployFi</span>
          </Link>

          <div className="nav-links">
            {NAV_LINKS.map(({ label, path }) => {
              const isActive = currentPath === path;
              return (
                <Link key={path} to={path} className={`nav-link${isActive ? " active" : ""}`}>
                  {label}
                  {isActive && <span className="nav-link-bar" />}
                </Link>
              );
            })}
          </div>

          <div className="nav-wallet">
            {!connected ? (
              <button className="btn-connect" onClick={() => setVisible(true)}>
                Connect Wallet
              </button>
            ) : (
              <>
                <div className="balance-chip">{solBalance} SOL</div>
                <div id="wallet-dd" style={{ position:"relative" }}>
                  <button className="wallet-btn" onClick={() => setDropdownOpen((v) => !v)}>
                    <span className="wallet-dot" />
                    <span className="wallet-badge">{walletIcon} {walletName}</span>
                    {walletShort}
                    <svg className={`chevron${dropdownOpen ? " open" : ""}`}
                      width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor"
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <div className="dropdown">
                      <div className="dd-header">
                        <div className="dd-header-row">
                          <span className="dd-label">Connected via</span>
                          <span className="dd-wallet-name">{walletName}</span>
                        </div>
                        <div className="dd-addr">{walletShort}</div>
                      </div>
                      {[
                        { icon: copied ? "OK" : "CP", label: copied ? "Copied!" : "Copy Address", fn: copyAddress,        danger: false },
                        { icon: "EX",                  label: "View on Explorer",                  fn: viewOnExplorer,     danger: false },
                        { icon: "SW",                  label: "Change Wallet",                     fn: handleChangeWallet, danger: false },
                        { icon: "DC",                  label: "Disconnect",                        fn: handleDisconnect,   danger: true  },
                      ].map(({ icon, label, fn, danger }) => (
                        <button key={label} className={`dd-item${danger ? " danger" : ""}`} onClick={fn}>
                          <span className="dd-icon">{icon}</span>
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            <button className="hamburger" onClick={() => setMenuOpen((v) => !v)} aria-label="menu">
              <span className="ham-bar" style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
              <span className="ham-bar" style={{ opacity: menuOpen ? 0 : 1 }} />
              <span className="ham-bar" style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
            </button>
          </div>

        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map(({ label, path }) => (
            <Link key={path} to={path}
              className={`mobile-link${currentPath === path ? " active" : ""}`}
              onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
          <div className="mobile-wallet-area">
            {!connected ? (
              <button className="btn-connect mobile-btn"
                onClick={() => { setVisible(true); setMenuOpen(false); }}>
                Connect Wallet
              </button>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                <div style={{ fontSize:13, color:"#9CA3AF" }}>
                  {walletName} - {walletShort}
                </div>
                <div className="balance-chip" style={{ display:"flex" }}>
                  {solBalance} SOL
                </div>
                <button className="mobile-btn"
                  style={{ background:"rgba(124,58,237,0.1)", color:"#A78BFA",
                    border:"1px solid rgba(124,58,237,0.28)" }}
                  onClick={() => { handleChangeWallet(); setMenuOpen(false); }}>
                  Change Wallet
                </button>
                <button className="mobile-btn"
                  style={{ background:"rgba(239,68,68,0.1)", color:"#F87171",
                    border:"1px solid rgba(239,68,68,0.28)" }}
                  onClick={() => { handleDisconnect(); setMenuOpen(false); }}>
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}