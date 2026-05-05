import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

function HomePage()      { return <div style={{color:'white', padding:40}}>Home Page</div> }
function LaunchPage()    { return <div style={{color:'white', padding:40}}>Launch Page</div> }
function DeFiPage()      { return <div style={{color:'white', padding:40}}>DeFi Page</div> }
function DashboardPage() { return <div style={{color:'white', padding:40}}>Dashboard Page</div> }

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