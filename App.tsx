
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Operations from './pages/Operations';
import Categories from './pages/Categories';
import Reports from './pages/Reports';
import System from './pages/System';
import LegalDocViewer from './pages/LegalDocViewer';
import AIAssistant from './components/AIAssistant';
import { DataProvider } from './contexts/DataContext';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  // Mặc định đóng sidebar để không che nội dung (vì giờ là overlay)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <DataProvider>
      <Router>
        <div className="flex h-screen overflow-hidden bg-gray-100 font-inter">
          {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden relative transition-all duration-300">
            {/* Top Header for Navigation Toggle */}
            <header className="bg-white h-16 shadow-sm z-10 flex items-center px-4 sticky top-0 justify-between">
              <div className="flex items-center">
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
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-xs text-gray-600">Hệ thống hoạt động bình thường</span>
                </div>
              </div>
            </header>

            <main className="flex-1 overflow-y-auto bg-gray-50/50">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/system" element={<System />} />
                
                {/* Operations Routes */}
                <Route path="/operations/:module" element={<Operations />} />
                
                {/* Categories Routes */}
                <Route path="/categories/:type" element={<Categories />} />

                {/* Reports Routes */}
                <Route path="/reports/:type" element={<Reports />} />

                {/* Document Viewer Route */}
                <Route path="/legal-doc/:id" element={<LegalDocViewer />} />

                {/* Default Redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            
            {/* Advanced AI Assistant */}
            <AIAssistant />
          </div>
        </div>
      </Router>
    </DataProvider>
  );
};

export default App;
