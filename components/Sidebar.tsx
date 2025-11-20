import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Settings,
  Calculator,
  FileText,
  Database,
  ChevronDown,
  ChevronRight,
  Menu,
  CreditCard,
  Briefcase,
  Users,
  Package,
  Landmark,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['operations', 'reports', 'categories']);

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const menuGroups = [
    {
      id: 'dashboard',
      label: 'Tổng quan',
      icon: LayoutDashboard,
      path: '/',
    },
    {
      id: 'system',
      label: 'Hệ thống',
      icon: Settings,
      path: '/system',
    },
    {
      id: 'operations',
      label: 'Nghiệp vụ',
      icon: Calculator,
      path: '#',
      subItems: [
        { id: 'op-cash', label: 'Quỹ (Tiền mặt)', icon: CreditCard, path: '/operations/cash' },
        { id: 'op-bank', label: 'Ngân hàng', icon: Landmark, path: '/operations/bank' },
        { id: 'op-business', label: 'Mua / Bán / Kho', icon: Briefcase, path: '/operations/business' },
        { id: 'op-assets', label: 'TSCĐ & CCDC', icon: Package, path: '/operations/assets' },
        { id: 'op-hr', label: 'Nhân sự & Lương', icon: Users, path: '/operations/hr' },
        { id: 'op-general', label: 'Tổng hợp', icon: BookOpen, path: '/operations/general' },
      ]
    },
    {
      id: 'reports',
      label: 'Báo cáo',
      icon: FileText,
      path: '#',
      subItems: [
        { id: 'rpt-financial', label: 'Báo cáo Tài chính', icon: FileText, path: '/reports/financial' },
        { id: 'rpt-cash', label: 'Báo cáo Quỹ/NH', icon: FileText, path: '/reports/cash' },
        { id: 'rpt-sales', label: 'Báo cáo Kinh doanh', icon: FileText, path: '/reports/sales' },
      ]
    },
    {
      id: 'categories',
      label: 'Danh mục',
      icon: Database,
      path: '#',
      subItems: [
        { id: 'cat-account', label: 'Hệ thống TK', icon: Database, path: '/categories/accounts' },
        { id: 'cat-partner', label: 'Khách hàng/NCC', icon: Users, path: '/categories/partners' },
        { id: 'cat-product', label: 'Vật tư hàng hóa', icon: Package, path: '/categories/products' },
        { id: 'cat-other', label: 'Danh mục khác', icon: Database, path: '/categories/others' },
      ]
    },
  ];

  const isActive = (path: string) => {
     if (path === '#' || path === '/') return location.pathname === path;
     return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-slate-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">K</div>
            <span className="text-lg font-semibold">Ketoan_Online</span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-white">
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuGroups.map((item) => (
              <li key={item.id}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleMenu(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${expandedMenus.includes(item.id) ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                      <div className="flex items-center">
                        <item.icon size={18} className="mr-3" />
                        {item.label}
                      </div>
                      {expandedMenus.includes(item.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    {expandedMenus.includes(item.id) && (
                      <ul className="mt-1 ml-4 space-y-1 border-l border-slate-700 pl-2">
                        {item.subItems.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              to={sub.path}
                              className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${isActive(sub.path) ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                            >
                              {/* <sub.icon size={16} className="mr-2 opacity-70" /> */}
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${isActive(item.path) ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                  >
                    <item.icon size={18} className="mr-3" />
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer User Profile */}
        <div className="p-4 border-t border-slate-700 bg-slate-800">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">AD</div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-xs text-slate-400">Kế toán trưởng</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;