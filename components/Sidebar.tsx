
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
  CreditCard,
  Briefcase,
  Users,
  Package,
  Landmark,
  BookOpen,
  Book,
  X,
  Building2,
  User,
  HardHat,
  Coins,
  Scale,
  Ticket,
  Warehouse,
  PieChart
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (id: string) => {
    // Accordion logic: 
    // Nếu menu đang mở -> đóng lại (set mảng rỗng)
    // Nếu menu đang đóng -> mở nó ra và đóng các menu khác (set mảng chỉ chứa id này)
    setExpandedMenus(prev => 
      prev.includes(id) ? [] : [id]
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
        { id: 'cat-bank', label: 'Ngân hàng', icon: Landmark, path: '/categories/banks' },
        { id: 'cat-customer', label: 'Khách hàng', icon: Users, path: '/categories/customers' },
        { id: 'cat-supplier', label: 'Nhà cung cấp', icon: Building2, path: '/categories/suppliers' },
        { id: 'cat-employee', label: 'Nhân viên', icon: User, path: '/categories/employees' },
        { id: 'cat-product', label: 'Vật tư hàng hóa', icon: Package, path: '/categories/products' },
        { id: 'cat-project', label: 'Công trình', icon: HardHat, path: '/categories/projects' },
        { id: 'cat-legal', label: 'Văn bản pháp luật', icon: Book, path: '/categories/legal-docs' },
        { id: 'cat-currency', label: 'Danh sách tiền tệ', icon: Coins, path: '/categories/currencies' },
        { id: 'cat-unit', label: 'Đơn vị tính', icon: Scale, path: '/categories/units' },
        { id: 'cat-voucher', label: 'Mã chứng từ', icon: Ticket, path: '/categories/voucher-types' },
        { id: 'cat-warehouse', label: 'Danh sách kho', icon: Warehouse, path: '/categories/warehouses' },
        { id: 'cat-expense', label: 'Khoản mục chi phí', icon: PieChart, path: '/categories/expense-items' },
      ]
    },
  ];

  const isActive = (path: string) => {
     if (path === '#' || path === '/') return location.pathname === path;
     return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay - Active on ALL devices now */}
      <div 
        className={`
          fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={toggleSidebar}
        aria-hidden="true"
      />

      {/* Sidebar Container - Fixed on ALL devices */}
      <div
        className={`
          fixed inset-y-0 left-0 z-50 bg-slate-900 text-slate-100 w-64 shadow-2xl
          transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Inner Wrapper */}
        <div className="w-full h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-4 bg-slate-800 border-b border-slate-700 shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold">K</div>
                <span className="text-lg font-semibold">Ketoan_Online</span>
              </div>
              {/* Close button visible on all devices now */}
              <button onClick={toggleSidebar} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 overflow-x-hidden custom-scrollbar">
              <ul className="space-y-1 px-2">
                {menuGroups.map((item) => (
                  <li key={item.id}>
                    {item.subItems ? (
                      <div>
                        <button
                          onClick={() => toggleMenu(item.id)}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${expandedMenus.includes(item.id) ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                        >
                          <div className="flex items-center whitespace-nowrap">
                            <item.icon size={18} className="mr-3 min-w-[18px]" />
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
                                  onClick={() => {
                                    // Optional: Close sidebar on navigation on mobile or always
                                    // toggleSidebar(); 
                                  }}
                                  className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors whitespace-nowrap ${isActive(sub.path) ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'}`}
                                >
                                  <sub.icon size={16} className="mr-2 opacity-70" />
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
                        onClick={() => {
                            // Optional: Close sidebar on navigation on mobile or always
                            // toggleSidebar(); 
                        }}
                        className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${isActive(item.path) ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                      >
                        <item.icon size={18} className="mr-3 min-w-[18px]" />
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Footer User Profile */}
            <div className="p-4 border-t border-slate-700 bg-slate-800 shrink-0">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">AD</div>
                <div className="ml-3 whitespace-nowrap">
                  <p className="text-sm font-medium text-white">Admin</p>
                  <p className="text-xs text-slate-400">Kế toán trưởng</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
