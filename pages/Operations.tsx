
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { TransactionType } from '../types';

// A simplified mapping to show different UI based on URL param
const TYPE_MAP: Record<string, { title: string, type: TransactionType | 'ALL', color: string }> = {
  'cash': { title: 'Quỹ Tiền mặt', type: TransactionType.RECEIPT, color: 'blue' },
  'bank': { title: 'Ngân hàng', type: TransactionType.PAYMENT, color: 'purple' },
  'business': { title: 'Mua hàng / Bán hàng / Kho', type: 'ALL', color: 'green' },
  'assets': { title: 'Tài sản & CCDC', type: TransactionType.DEPRECIATION, color: 'orange' },
  'hr': { title: 'Nhân sự & Tiền lương', type: TransactionType.SALARY, color: 'pink' },
  'general': { title: 'Tổng hợp', type: TransactionType.OTHER, color: 'gray' },
};

const Operations: React.FC = () => {
  const { module } = useParams<{ module: string }>();
  const currentConfig = TYPE_MAP[module || 'cash'] || TYPE_MAP['cash'];
  const { transactions, addTransaction, partners, accounts } = useData();

  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    documentNo: '',
    description: '',
    totalAmount: 0,
    partnerId: ''
  });

  const handleSave = () => {
      addTransaction({
          date: formData.date,
          type: currentConfig.type === 'ALL' ? TransactionType.SALES : currentConfig.type,
          documentNo: formData.documentNo || `AUTO-${Math.floor(Math.random()*1000)}`,
          description: formData.description,
          totalAmount: Number(formData.totalAmount),
          partnerId: formData.partnerId,
          details: []
      });
      setShowForm(false);
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(t => {
      if (currentConfig.type === 'ALL') return true;
      // Very basic filtering mapping for demo
      if (currentConfig.type === TransactionType.RECEIPT) return t.type === TransactionType.RECEIPT;
      if (currentConfig.type === TransactionType.PAYMENT) return t.type === TransactionType.PAYMENT;
      return true; 
  });

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">{currentConfig.title}</h1>
            <p className="text-gray-500 text-sm">Quản lý các nghiệp vụ phát sinh</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className={`flex items-center gap-2 px-4 py-2 bg-${currentConfig.color}-600 text-white rounded-lg hover:bg-${currentConfig.color}-700 font-medium shadow-sm transition-colors`}
        >
          <Plus size={18} /> Thêm mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 flex gap-4 items-center">
         <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Tìm kiếm theo số chứng từ, diễn giải..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
         </div>
         <div className="flex gap-2">
            <input type="date" className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none" />
            <span className="self-center text-gray-400">-</span>
            <input type="date" className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none" />
         </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-6 py-3">Ngày CT</th>
                <th className="px-6 py-3">Số CT</th>
                <th className="px-6 py-3">Diễn giải</th>
                <th className="px-6 py-3">Đối tượng</th>
                <th className="px-6 py-3 text-right">Số tiền</th>
                <th className="px-6 py-3 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                  <td className="px-6 py-4">{t.date}</td>
                  <td className="px-6 py-4 font-medium text-blue-600">{t.documentNo}</td>
                  <td className="px-6 py-4">{t.description}</td>
                  <td className="px-6 py-4">
                    {partners.find(p => p.id === t.partnerId)?.name || '-'}
                  </td>
                  <td className="px-6 py-4 text-right font-bold">
                    {t.totalAmount.toLocaleString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Đã ghi sổ</span>
                  </td>
                </tr>
              ))}
              {/* Empty State Placeholder */}
              {filteredTransactions.length === 0 && (
                 <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">Chưa có dữ liệu</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-right text-sm text-gray-500">
           Hiển thị {filteredTransactions.length} bản ghi
        </div>
      </div>

      {/* Modal Form for New Transaction */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Thêm mới chứng từ</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>

            <div className="p-6 space-y-6">
               {/* Header Info */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Loại chứng từ</label>
                     <select className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500">
                        <option value="PT">Phiếu Thu</option>
                        <option value="PC">Phiếu Chi</option>
                        <option value="BH">Bán Hàng</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Số chứng từ</label>
                     <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500" 
                        placeholder="Tự động sinh..." 
                        value={formData.documentNo}
                        onChange={e => setFormData({...formData, documentNo: e.target.value})}
                    />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hạch toán</label>
                     <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500" />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Đối tượng</label>
                     <select 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                        value={formData.partnerId}
                        onChange={e => setFormData({...formData, partnerId: e.target.value})}
                    >
                        <option value="">-- Chọn đối tượng --</option>
                        {partners.map(p => <option key={p.id} value={p.id}>{p.code} - {p.name}</option>)}
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Diễn giải</label>
                     <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500" 
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                     />
                  </div>
               </div>
               
               <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Tổng tiền</label>
                   <input 
                        type="number" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 font-bold" 
                        value={formData.totalAmount}
                        onChange={e => setFormData({...formData, totalAmount: Number(e.target.value)})}
                     />
               </div>

               {/* Detail Grid - Simplified for demo */}
               <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-2 border-b pb-1">Chi tiết hạch toán</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                     <table className="w-full text-sm">
                        <thead className="bg-gray-50">
                           <tr>
                              <th className="px-4 py-2 text-left w-1/3">Diễn giải</th>
                              <th className="px-4 py-2 text-left">TK Nợ/Có</th>
                              <th className="px-4 py-2 text-right">Số tiền</th>
                              <th className="px-4 py-2 w-10"></th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr>
                              <td className="p-2"><input type="text" className="w-full border-gray-300 border rounded px-2 py-1" placeholder="Chi tiết..." /></td>
                              <td className="p-2">
                                 <select className="w-full border-gray-300 border rounded px-2 py-1">
                                     {accounts.map(a => <option key={a.code} value={a.code}>{a.code}</option>)}
                                 </select>
                              </td>
                              <td className="p-2"><input type="number" className="w-full border-gray-300 border rounded px-2 py-1 text-right" defaultValue={formData.totalAmount} /></td>
                              <td className="p-2 text-center"><button className="text-red-500 hover:text-red-700">&times;</button></td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
               <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100">Hủy bỏ</button>
               <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm">Lưu & Ghi sổ</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Operations;
