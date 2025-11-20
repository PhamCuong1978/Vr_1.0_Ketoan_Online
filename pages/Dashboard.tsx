
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Brain, TrendingUp, TrendingDown, DollarSign, Landmark } from 'lucide-react';
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
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tổng quan tài chính</h1>
          <p className="text-gray-500">Chào mừng trở lại, {companyInfo.director}</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">Làm mới</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm">Báo cáo nhanh</button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Biểu đồ Doanh thu - Chi phí</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f3f4f6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}} />
                <Legend iconType="circle" />
                <Bar dataKey="thu" name="Thu" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="chi" name="Chi" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Cơ cấu Doanh thu</h3>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
              {pieData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                   <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{backgroundColor: COLORS[idx % COLORS.length]}}></div>
                      <span className="text-gray-600">{item.name}</span>
                   </div>
                   <span className="font-medium">{item.value}%</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* AI Promotion Banner (Static, actual AI is in the floating button now) */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 -skew-x-12"></div>
        <div className="flex items-start gap-4 relative z-10">
          <div className="p-3 bg-blue-500/20 rounded-lg backdrop-blur-sm border border-blue-500/30">
            <Brain size={32} className="text-blue-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Trợ lý Kế toán AI đã sẵn sàng</h3>
            <p className="text-slate-300 text-sm max-w-xl">
                Sử dụng nút chat ở góc phải màn hình để tương tác với trợ lý ảo. Hỗ trợ nhập liệu bằng giọng nói, phân tích báo cáo và tự động hóa quy trình kế toán.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
