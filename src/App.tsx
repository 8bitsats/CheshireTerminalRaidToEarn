import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './providers/WalletProvider';
import GrinRaidDashboard from './components/GrinRaidDashboard';
import RaidRegistration from './components/RaidRegistration';
import CheshireExplainer from './components/CheshireExplainer';
import RaidVerification from './components/RaidVerification';

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Routes>
            <Route path="/" element={<CheshireExplainer />} />
            <Route path="/dashboard" element={<GrinRaidDashboard />} />
            <Route path="/register" element={<RaidRegistration />} />
            <Route path="/verify" element={<RaidVerification />} />
          </Routes>
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;