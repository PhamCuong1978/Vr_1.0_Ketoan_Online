
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Landmark } from 'lucide-react';
import { TransactionType } from '../types';
import { useData } from '../contexts/DataContext';

const Dashboard: React.FC = () => {
  // Access real-time data from Context
  const { transactions, companyInfo } = useData();

  // Calculate real-time metrics
  const totalRevenue = transactions
    .filter(t => t.type === TransactionType.SALES || t.type === TransactionType.RECEIPT)
    .reduce((acc, cur) => acc + cur.totalAmount, 0);

  const totalExpense = transactions
    .filter(t => t.type === TransactionType.PAYMENT || t.type === TransactionType.PURCHASE)
    .reduce((acc, cur) => acc + cur.totalAmount, 0);
  
  // Mock Balances (In a real app, these would be calculated from opening balance + transactions)
  const cashBalance = 150000000 + (totalRevenue * 0.3) - (totalExpense * 0.4);
  const bankBalance = 850000000 + (totalRevenue * 0.7) - (totalExpense * 0.6);

  const chartData = [
    { name: 'T1', thu: 40000000, chi: 24000000 },
    { name: 'T2', thu: 30000000, chi: 13900000 },
    { name: 'T3', thu: 20000000, chi: 98000000 },
    { name: 'T4', thu: 27800000, chi: 39000000 },
    { name: 'HT', thu: totalRevenue, chi: totalExpense }, // Current Month
  ];

  const pieData = [
    { name: 'Doanh thu BH', value: 70 },
    { name: 'Doanh thu TC', value: 20 },
    { name: 'Thu nhập khác', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6 h-full flex flex-col gap-6 overflow-y-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tổng quan tài chính</h1>
          <p className="text-gray-500">Chào mừng trở lại, {companyInfo.director}</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">Làm mới</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors">Báo cáo nhanh</button>
        </div>
      </div>

      {/* Stat Cards Section - shrink-0 to maintain size */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Tổng Doanh thu</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalRevenue.toLocaleString('vi-VN')} ₫</h3>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-full">
              <TrendingUp size={24} />
            </div>
          </div>
          <span className="text-xs text-green-600 font-medium mt-2 inline-block">+12.5% so với tháng trước</span>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Tổng Chi phí</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{totalExpense.toLocaleString('vi-VN')} ₫</h3>
            </div>
            <div className="p-3 bg-red-50 text-red-600 rounded-full">
              <TrendingDown size={24} />
            </div>
          </div>
          <span className="text-xs text-red-600 font-medium mt-2 inline-block">-2.4% so với tháng trước</span>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Tồn quỹ Tiền mặt</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{cashBalance.toLocaleString('vi-VN')} ₫</h3>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
              <DollarSign size={24} />
            </div>
          </div>
          <span className="text-xs text-gray-400 font-medium mt-2 inline-block">Cập nhật vừa xong</span>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Tiền gửi Ngân hàng</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">{bankBalance.toLocaleString('vi-VN')} ₫</h3>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
              <Landmark size={24} />
            </div>
          </div>
          <span className="text-xs text-gray-400 font-medium mt-2 inline-block">ACB, VCB, Techcombank</span>
        </div>
      </div>

      {/* Charts Section - flex-1 to fill remaining space */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[350px]">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
          <h3 className="text-lg font-bold text-gray-800 mb-4 shrink-0">Biểu đồ Doanh thu - Chi phí</h3>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280'}} />
                <Tooltip 
                  cursor={{fill: '#f9fafb'}} 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} 
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Bar dataKey="thu" name="Thu" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
                <Bar dataKey="chi" name="Chi" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full">
          <h3 className="text-lg font-bold text-gray-800 mb-4 shrink-0">Cơ cấu Doanh thu</h3>
          <div className="flex-1 w-full min-h-0 relative">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="85%"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
             {/* Center Text Overlay */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    <span className="block text-2xl font-bold text-gray-800">100%</span>
                    <span className="text-xs text-gray-500">Tổng</span>
                </div>
             </div>
          </div>
          
          {/* Custom Legend Section */}
          <div className="mt-6 space-y-4 shrink-0">
              {pieData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm group">
                   <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-3 transition-transform group-hover:scale-125" style={{backgroundColor: COLORS[idx % COLORS.length]}}></div>
                      <span className="text-gray-600">{item.name}</span>
                   </div>
                   <span className="font-bold text-gray-800">{item.value}%</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
