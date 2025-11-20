import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Operations from './pages/Operations';
import Categories from './pages/Categories';
import Reports from './pages/Reports';
import System from './pages/System';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/system" element={<System />} />
              
              {/* Operations Routes */}
              <Route path="/operations/:module" element={<Operations />} />
              
              {/* Categories Routes */}
              <Route path="/categories/:type" element={<Categories />} />

              {/* Reports Routes */}
              <Route path="/reports/:type" element={<Reports />} />

              {/* Default Redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;