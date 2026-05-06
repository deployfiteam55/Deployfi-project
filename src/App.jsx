// ============================================================
//  DeployFi — App.jsx
//  File: src/App.jsx
// ============================================================

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LaunchPage from './pages/LaunchPage';
import DeFiPage from './pages/DeFiPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ background: '#0D0818', minHeight: '100vh', paddingTop: 64 }}>
        <Navbar />
        <Routes>
          <Route path="/"          element={<HomePage />} />
          <Route path="/launch"    element={<LaunchPage />} />
          <Route path="/defi"      element={<DeFiPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}