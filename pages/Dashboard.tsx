import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { INITIAL_COMPANY_INFO, MOCK_TRANSACTIONS } from '../constants';
import { analyzeFinancials } from '../services/geminiService';
import { Brain, TrendingUp, TrendingDown, DollarSign, AlertCircle, Landmark } from 'lucide-react';
import { TransactionType } from '../types';

const Dashboard: React.FC = () => {
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  // Mock calculations for dashboard
  const totalRevenue = MOCK_TRANSACTIONS.filter(t => t.type === TransactionType.SALES).reduce((acc, cur) => acc + cur.totalAmount, 0);
  const totalExpense = MOCK_TRANSACTIONS.filter(t => t.type === TransactionType.PAYMENT).reduce((acc, cur) => acc + cur.totalAmount, 0); // Simplified
  const cashBalance = 150000000; // Mock balance
  const bankBalance = 850000000; // Mock balance

  const chartData = [
    { name: 'T1', thu: 400, chi: 240 },
    { name: 'T2', thu: 300, chi: 139 },
    { name: 'T3', thu: 200, chi: 980 },
    { name: 'T4', thu: 278, chi: 390 },
    { name: 'T5', thu: 189, chi: 480 },
    { name: 'T6', thu: 239, chi: 380 },
    { name: 'T7', thu: 349, chi: 430 },
  ];

  const pieData = [
    { name: 'Doanh thu BH', value: 70 },
    { name: 'Doanh thu TC', value: 20 },
    { name: 'Thu nhập khác', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const handleAnalyze = async () => {
    setLoadingAi(true);
    const summary = JSON.stringify({
      company: INITIAL_COMPANY_INFO.name,
      revenue: totalRevenue,
      expense: totalExpense,
      cash: cashBalance,
      bank: bankBalance,
      recentTransactionsCount: MOCK_TRANSACTIONS.length,
    });
    const result = await analyzeFinancials(summary);
    setAiAnalysis(result);
    setLoadingAi(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tổng quan tài chính</h1>
          <p className="text-gray-500">Chào mừng trở lại, {INITIAL_COMPANY_INFO.director}</p>
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
          <span className="text-xs text-gray-400 font-medium mt-2 inline-block">Cập nhật 5 phút trước</span>
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

      {/* AI Assistant Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
            <Brain size={32} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Trợ lý Kế toán trưởng AI</h3>
            <p className="text-indigo-100 mb-4 text-sm">Sử dụng trí tuệ nhân tạo để phân tích dữ liệu tài chính, phát hiện rủi ro và đề xuất tối ưu hóa dòng tiền cho doanh nghiệp của bạn.</p>

            {!aiAnalysis ? (
              <button
                onClick={handleAnalyze}
                disabled={loadingAi}
                className="px-5 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-50 transition-colors disabled:opacity-70 flex items-center gap-2"
              >
                {loadingAi ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang phân tích...
                  </>
                ) : (
                  "Bắt đầu phân tích"
                )}
              </button>
            ) : (
               <div className="bg-white/10 rounded-lg p-4 mt-2 backdrop-blur-sm border border-white/20 prose prose-invert max-w-none text-sm">
                  <div dangerouslySetInnerHTML={{ __html: aiAnalysis.replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  <button onClick={() => setAiAnalysis('')} className="mt-4 text-xs text-indigo-200 hover:text-white underline">Phân tích lại</button>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;