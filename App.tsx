import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Operations from './pages/Operations';
import Categories from './pages/Categories';
import Reports from './pages/Reports';
import System from './pages/System';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  // Mặc định mở sidebar trên màn hình lớn
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-gray-100">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative transition-all duration-300">
          {/* Top Header for Navigation Toggle */}
          <header className="bg-white h-16 shadow-sm z-10 flex items-center px-4 sticky top-0">
            <button 
              onClick={toggleSidebar} 
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Ẩn/Hiện Menu"
            >
              <Menu size={24} />
            </button>
            {/* Placeholder for breadcrumbs or page title if needed later */}
            <div className="ml-4 font-medium text-gray-500 hidden sm:block">
              Hệ thống Kế toán Online
            </div>
          </header>

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