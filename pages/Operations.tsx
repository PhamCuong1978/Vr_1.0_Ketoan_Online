
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Search, Trash2 } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { TransactionType, TransactionDetail, Transaction } from '../types';

// A simplified mapping to show different UI based on URL param
const TYPE_MAP: Record<string, { title: string, type: TransactionType | 'ALL', color: string }> = {
  'cash': { title: 'Quỹ', type: TransactionType.RECEIPT, color: 'blue' },
  'bank': { title: 'Ngân hàng', type: TransactionType.PAYMENT, color: 'purple' },
  'business': { title: 'Mua hàng / Bán hàng / Kho', type: 'ALL', color: 'green' },
  'assets': { title: 'Tài sản & CCDC', type: TransactionType.DEPRECIATION, color: 'orange' },
  'hr': { title: 'Nhân sự & Tiền lương', type: TransactionType.SALARY, color: 'pink' },
  'general': { title: 'Tổng hợp', type: TransactionType.OTHER, color: 'gray' },
};

const Operations: React.FC = () => {
  const { module } = useParams<{ module: string }>();
  const currentConfig = TYPE_MAP[module || 'cash'] || TYPE_MAP['cash'];
  const { transactions, addTransaction, partners, accounts, voucherTypes, projects, expenseItems, jobs } = useData();

  const [showForm, setShowForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Transaction>>({
    accountingDate: new Date().toISOString().split('T')[0],
    date: new Date().toISOString().split('T')[0],
    documentNo: '',
    voucherType: 'PT',
    description: '',
    totalAmount: 0,
    partnerId: '',
    details: []
  });

  const [details, setDetails] = useState<Partial<TransactionDetail>[]>([
    { description: '', debitAccount: '', creditAccount: '', amount: 0, jobId: '' }
  ]);

  // --- Logic sinh số chứng từ tự động ---
  const generateDocumentNo = (vType: string) => {
    if (!vType) return '';
    
    // 1. Lọc các chứng từ cùng loại
    const sameTypeTrans = transactions.filter(t => t.voucherType === vType);
    
    let maxNum = 0;
    // Regex để tách phần số: Bắt đầu bằng vType, theo sau là các chữ số
    // Ví dụ vType='PT', regex sẽ match 'PT001', 'PT123'
    const regex = new RegExp(`^${vType}(\\d+)$`); 

    sameTypeTrans.forEach(t => {
        const match = t.documentNo.match(regex);
        if (match) {
            const num = parseInt(match[1], 10);
            if (!isNaN(num) && num > maxNum) {
                maxNum = num;
            }
        }
    });

    // 2. Cộng thêm 1 đơn vị và format (ví dụ 3 chữ số: 001, 010, 100)
    const nextNum = maxNum + 1;
    return `${vType}${String(nextNum).padStart(3, '0')}`;
  };

  const handleAddDetail = () => {
    setDetails([...details, { description: '', debitAccount: '', creditAccount: '', amount: 0, jobId: '' }]);
  };

  const handleRemoveDetail = (index: number) => {
    if (details.length > 1) {
      setDetails(details.filter((_, i) => i !== index));
    }
  };

  const handleDetailChange = (index: number, field: keyof TransactionDetail, value: any) => {
    const newDetails = [...details];
    newDetails[index] = { ...newDetails[index], [field]: value };
    setDetails(newDetails);

    // Auto calculate total amount
    if (field === 'amount') {
        const total = newDetails.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
        setFormData(prev => ({ ...prev, totalAmount: total }));
    }
  };

  const handleSave = () => {
      addTransaction({
          accountingDate: formData.accountingDate || new Date().toISOString().split('T')[0],
          date: formData.date || new Date().toISOString().split('T')[0],
          type: currentConfig.type === 'ALL' ? TransactionType.SALES : currentConfig.type,
          voucherType: formData.voucherType || 'PT',
          // Sử dụng số chứng từ từ form hoặc sinh mới nếu rỗng
          documentNo: formData.documentNo || generateDocumentNo(formData.voucherType || 'PT'),
          description: formData.description || '',
          totalAmount: Number(formData.totalAmount),
          partnerId: formData.partnerId,
          status: 'RECORDED',
          details: details as TransactionDetail[]
      });
      setShowForm(false);
      
      // Reset form
      setFormData({
        accountingDate: new Date().toISOString().split('T')[0],
        date: new Date().toISOString().split('T')[0],
        documentNo: '',
        description: '',
        totalAmount: 0,
        partnerId: '',
        voucherType: 'PT'
      });
      setDetails([{ description: '', debitAccount: '', creditAccount: '', amount: 0, jobId: '' }]);
  };

  // Hàm mở form và reset dữ liệu
  const handleOpenForm = () => {
    // Xác định loại chứng từ mặc định dựa trên module hiện tại
    let defaultVoucherType = 'PT';
    if (currentConfig.type === TransactionType.PAYMENT) defaultVoucherType = 'PC';
    else if (currentConfig.type === TransactionType.SALES) defaultVoucherType = 'BH';
    else if (currentConfig.type === TransactionType.PURCHASE) defaultVoucherType = 'MH';
    else if (currentConfig.type === TransactionType.OTHER) defaultVoucherType = 'PK';

    // Sinh số chứng từ mới
    const newDocNo = generateDocumentNo(defaultVoucherType);

    setFormData({
        accountingDate: new Date().toISOString().split('T')[0],
        date: new Date().toISOString().split('T')[0],
        documentNo: newDocNo,
        voucherType: defaultVoucherType,
        description: '',
        totalAmount: 0,
        partnerId: '',
        details: []
    });
    setDetails([{ description: '', debitAccount: '', creditAccount: '', amount: 0, jobId: '' }]);
    setShowForm(true);
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(t => {
      if (currentConfig.type === 'ALL') return true;
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
          onClick={handleOpenForm}
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
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-center">Ngày HT</th>
                <th className="px-4 py-3 text-center">Ngày CT</th>
                <th className="px-4 py-3 text-center">Mã CT</th>
                <th className="px-4 py-3">Số CT</th>
                <th className="px-4 py-3">Diễn giải</th>
                <th className="px-4 py-3">Đối tượng</th>
                <th className="px-4 py-3 text-center">TK Nợ</th>
                <th className="px-4 py-3 text-center">TK Có</th>
                <th className="px-4 py-3 text-right">Số tiền</th>
                <th className="px-4 py-3">Khoản mục CP</th>
                <th className="px-4 py-3">Mã CT (Dự án)</th>
                <th className="px-4 py-3">Mã VV</th>
                <th className="px-4 py-3 text-center">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTransactions.map((t) => {
                 // Flatten details for display. If multiple details, show info from first line or indicate multiple
                 const firstDetail: Partial<TransactionDetail> = t.details[0] || {};
                 const partnerName = partners.find(p => p.id === t.partnerId)?.name || '-';
                 const projectCode = projects.find(p => p.id === firstDetail.projectId)?.code || '';
                 const jobCode = jobs.find(j => j.id === firstDetail.jobId || j.code === firstDetail.jobId)?.code || firstDetail.jobId || '';
                 const expenseName = expenseItems.find(e => e.id === firstDetail.expenseItemId)?.name || '';

                 return (
                    <tr key={t.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                      <td className="px-4 py-3 text-center">{t.accountingDate}</td>
                      <td className="px-4 py-3 text-center">{t.date}</td>
                      <td className="px-4 py-3 text-center">{t.voucherType}</td>
                      <td className="px-4 py-3 font-medium text-blue-600">{t.documentNo}</td>
                      <td className="px-4 py-3 max-w-xs truncate" title={t.description}>{t.description}</td>
                      <td className="px-4 py-3 max-w-xs truncate" title={partnerName}>{partnerName}</td>
                      <td className="px-4 py-3 text-center">{firstDetail.debitAccount || '-'}</td>
                      <td className="px-4 py-3 text-center">{firstDetail.creditAccount || '-'}</td>
                      <td className="px-4 py-3 text-right font-bold">
                        {t.totalAmount.toLocaleString('vi-VN')}
                      </td>
                      <td className="px-4 py-3 truncate">{expenseName}</td>
                      <td className="px-4 py-3">{projectCode}</td>
                      <td className="px-4 py-3">{jobCode}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${t.status === 'RECORDED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {t.status === 'RECORDED' ? 'Đã ghi sổ' : 'Chưa ghi sổ'}
                        </span>
                      </td>
                    </tr>
                 );
              })}
              {/* Empty State Placeholder */}
              {filteredTransactions.length === 0 && (
                 <tr>
                    <td colSpan={13} className="px-6 py-12 text-center text-gray-400">Chưa có dữ liệu</td>
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
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
              <h2 className="text-xl font-bold text-gray-800">Thêm mới chứng từ</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            </div>

            <div className="p-6 space-y-6 flex-1 overflow-y-auto">
               {/* Header Info */}
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Mã chứng từ</label>
                     <select 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500"
                        value={formData.voucherType}
                        onChange={e => {
                            const newType = e.target.value;
                            const newDocNo = generateDocumentNo(newType);
                            setFormData({...formData, voucherType: newType, documentNo: newDocNo});
                        }}
                     >
                        {voucherTypes.map(v => <option key={v.id} value={v.code}>{v.name} ({v.code})</option>)}
                        <option value="PT">Phiếu Thu (PT)</option>
                        <option value="PC">Phiếu Chi (PC)</option>
                        <option value="BN">Báo Nợ (BN)</option>
                        <option value="BC">Báo Có (BC)</option>
                        <option value="PK">Phiếu Kế toán (PK)</option>
                        <option value="BH">Bán hàng (BH)</option>
                        <option value="MH">Mua hàng (MH)</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Số chứng từ</label>
                     <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 bg-gray-50" 
                        placeholder="Tự động sinh..." 
                        value={formData.documentNo}
                        readOnly
                        title="Số chứng từ được sinh tự động"
                        onChange={e => setFormData({...formData, documentNo: e.target.value})}
                    />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hạch toán</label>
                     <input type="date" value={formData.accountingDate} onChange={(e) => setFormData({...formData, accountingDate: e.target.value})} className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500" />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Ngày chứng từ</label>
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
                     <label className="block text-sm font-medium text-gray-700 mb-1">Diễn giải chung</label>
                     <input 
                        type="text" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500" 
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                     />
                  </div>
               </div>

               {/* Detail Grid */}
               <div>
                  <div className="flex justify-between items-center mb-2 border-b pb-2">
                      <h3 className="text-sm font-bold text-gray-700">Chi tiết hạch toán</h3>
                      <button onClick={handleAddDetail} className="text-blue-600 text-xs flex items-center gap-1 hover:underline"><Plus size={14}/> Thêm dòng</button>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                     <table className="w-full text-xs">
                        <thead className="bg-gray-50">
                           <tr>
                              <th className="px-2 py-2 text-left">Diễn giải</th>
                              <th className="px-2 py-2 text-left w-20">TK Nợ</th>
                              <th className="px-2 py-2 text-left w-20">TK Có</th>
                              <th className="px-2 py-2 text-right w-32">Số tiền</th>
                              <th className="px-2 py-2 text-left w-32">Khoản mục CP</th>
                              <th className="px-2 py-2 text-left w-24">Mã CT</th>
                              <th className="px-2 py-2 text-left w-20">Mã VV</th>
                              <th className="px-2 py-2 w-8"></th>
                           </tr>
                        </thead>
                        <tbody>
                           {details.map((detail, idx) => (
                               <tr key={idx} className="border-t border-gray-100">
                                  <td className="p-1">
                                      <input 
                                        type="text" 
                                        className="w-full border-gray-300 border rounded px-2 py-1" 
                                        placeholder="Chi tiết..." 
                                        value={detail.description}
                                        onChange={e => handleDetailChange(idx, 'description', e.target.value)}
                                      />
                                  </td>
                                  <td className="p-1">
                                     <input 
                                        list="accounts" 
                                        className="w-full border-gray-300 border rounded px-2 py-1"
                                        value={detail.debitAccount}
                                        onChange={e => handleDetailChange(idx, 'debitAccount', e.target.value)}
                                     />
                                  </td>
                                  <td className="p-1">
                                     <input 
                                        list="accounts"
                                        className="w-full border-gray-300 border rounded px-2 py-1"
                                        value={detail.creditAccount}
                                        onChange={e => handleDetailChange(idx, 'creditAccount', e.target.value)}
                                     />
                                  </td>
                                  <td className="p-1">
                                      <input 
                                        type="number" 
                                        className="w-full border-gray-300 border rounded px-2 py-1 text-right font-medium" 
                                        value={detail.amount}
                                        onChange={e => handleDetailChange(idx, 'amount', e.target.value)}
                                      />
                                  </td>
                                  <td className="p-1">
                                      <select 
                                        className="w-full border-gray-300 border rounded px-2 py-1"
                                        value={detail.expenseItemId}
                                        onChange={e => handleDetailChange(idx, 'expenseItemId', e.target.value)}
                                      >
                                          <option value=""></option>
                                          {expenseItems.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                                      </select>
                                  </td>
                                  <td className="p-1">
                                      <select 
                                        className="w-full border-gray-300 border rounded px-2 py-1"
                                        value={detail.projectId}
                                        onChange={e => handleDetailChange(idx, 'projectId', e.target.value)}
                                      >
                                          <option value=""></option>
                                          {projects.map(p => <option key={p.id} value={p.id}>{p.code}</option>)}
                                      </select>
                                  </td>
                                  <td className="p-1">
                                      <input 
                                        list="jobs"
                                        className="w-full border-gray-300 border rounded px-2 py-1"
                                        value={detail.jobId}
                                        onChange={e => handleDetailChange(idx, 'jobId', e.target.value)}
                                      />
                                  </td>
                                  <td className="p-1 text-center">
                                      <button onClick={() => handleRemoveDetail(idx)} className="text-red-500 hover:text-red-700">
                                          <Trash2 size={14} />
                                      </button>
                                  </td>
                               </tr>
                           ))}
                        </tbody>
                        <tfoot>
                            <tr className="bg-gray-50 font-bold">
                                <td colSpan={3} className="px-2 py-2 text-right">Tổng cộng:</td>
                                <td className="px-2 py-2 text-right">{formData.totalAmount?.toLocaleString('vi-VN')}</td>
                                <td colSpan={4}></td>
                            </tr>
                        </tfoot>
                     </table>
                     
                     {/* Datalist for Accounts Autocomplete */}
                     <datalist id="accounts">
                        {accounts.map(a => <option key={a.code} value={a.code}>{a.name}</option>)}
                     </datalist>

                     {/* Datalist for Jobs Autocomplete */}
                     <datalist id="jobs">
                        {jobs.map(j => <option key={j.code} value={j.code}>{j.name}</option>)}
                     </datalist>
                  </div>
               </div>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl shrink-0">
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
