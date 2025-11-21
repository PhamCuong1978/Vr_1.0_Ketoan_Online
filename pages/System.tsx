
import React, { useState, useEffect, useRef } from 'react';
import { Save, Building, UserCog, Shield, Database, Download, Upload, Trash2, RefreshCw } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const System: React.FC = () => {
  const { 
    companyInfo, updateCompanyInfo, 
    transactions, partners, products, accounts, legalDocuments,
    importData 
  } = useData();

  const [formState, setFormState] = useState(companyInfo);
  const [activeTab, setActiveTab] = useState<'company' | 'users' | 'options' | 'backup'>('company');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
      setFormState(companyInfo);
  }, [companyInfo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
      updateCompanyInfo(formState);
      alert("Đã lưu thông tin thành công!");
  };

  const handleExport = () => {
      const data = {
          companyInfo,
          transactions,
          partners,
          products,
          accounts,
          legalDocuments,
          version: '1.0',
          exportDate: new Date().toISOString()
      };

      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Ketoan_Backup_${new Date().toISOString().slice(0,10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
      fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
          try {
              const json = JSON.parse(event.target?.result as string);
              if (window.confirm(`Bạn có chắc chắn muốn khôi phục dữ liệu từ file backup này?
Ngày sao lưu: ${json.exportDate || 'Không rõ'}
Hành động này sẽ thay thế toàn bộ dữ liệu hiện tại.`)) {
                  importData(json);
                  alert("Khôi phục dữ liệu thành công!");
              }
          } catch (err) {
              console.error(err);
              alert("File không hợp lệ hoặc bị lỗi!");
          } finally {
              if (fileInputRef.current) fileInputRef.current.value = '';
          }
      };
      reader.readAsText(file);
  };

  const handleResetData = () => {
      if (window.confirm("CẢNH BÁO: Bạn có chắc chắn muốn XÓA TOÀN BỘ dữ liệu không? Hành động này không thể hoàn tác!")) {
          if (window.confirm("Xác nhận lần 2: Tất cả dữ liệu sẽ biến mất. Bạn có chắc không?")) {
              localStorage.clear();
              window.location.reload();
          }
      }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Hệ thống</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab('company')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 whitespace-nowrap ${activeTab === 'company' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Building size={18}/> Thông tin Doanh nghiệp
            </button>
            <button
              onClick={() => setActiveTab('backup')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 whitespace-nowrap ${activeTab === 'backup' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Database size={18}/> Sao lưu & Dữ liệu
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 whitespace-nowrap ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <UserCog size={18}/> Người dùng & Phân quyền
            </button>
            <button
              onClick={() => setActiveTab('options')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 whitespace-nowrap ${activeTab === 'options' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Shield size={18}/> Tùy chọn
            </button>
        </div>

        <div className="p-6">
          {activeTab === 'company' && (
            <div className="max-w-3xl space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên Doanh nghiệp</label>
                  <input type="text" name="name" value={formState.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ trụ sở</label>
                  <input type="text" name="address" value={formState.address} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mã số thuế</label>
                  <input type="text" name="taxCode" value={formState.taxCode} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Điện thoại</label>
                  <input type="text" name="phone" value={formState.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giám đốc / Người đại diện</label>
                  <input type="text" name="director" value={formState.director} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors">
                  <Save size={18} /> Lưu thông tin
                </button>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="max-w-3xl space-y-8 animate-in fade-in duration-300">
                {/* Export Section */}
                <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                            <Download size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Sao lưu dữ liệu (Backup)</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Tải xuống toàn bộ dữ liệu kế toán hiện tại dưới dạng file .JSON. 
                                Bạn có thể dùng file này để lưu trữ hoặc chuyển dữ liệu sang máy tính khác.
                            </p>
                            <button 
                                onClick={handleExport}
                                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors"
                            >
                                <Download size={18} /> Tải về máy
                            </button>
                        </div>
                    </div>
                </div>

                {/* Import Section */}
                <div className="bg-green-50 border border-green-100 p-6 rounded-xl">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                            <Upload size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Khôi phục dữ liệu (Restore)</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Nạp dữ liệu từ file backup (.JSON) vào hệ thống. 
                                <br/>
                                <span className="font-bold text-red-500">Lưu ý:</span> Dữ liệu hiện tại sẽ bị thay thế hoàn toàn bằng dữ liệu trong file.
                            </p>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                className="hidden" 
                                accept=".json"
                            />
                            <button 
                                onClick={handleImportClick}
                                className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium shadow-sm transition-colors"
                            >
                                <Upload size={18} /> Chọn file backup
                            </button>
                        </div>
                    </div>
                </div>

                 {/* Reset Section */}
                 <div className="bg-red-50 border border-red-100 p-6 rounded-xl">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                            <Trash2 size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 mb-1">Xóa dữ liệu hệ thống</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                Xóa toàn bộ dữ liệu hiện có và đưa phần mềm về trạng thái mặc định ban đầu.
                            </p>
                            <button 
                                onClick={handleResetData}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium transition-colors"
                            >
                                <RefreshCw size={18} /> Xóa & Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
          )}

          {activeTab === 'users' && (
             <div className="text-center py-12 text-gray-500 animate-in fade-in duration-300">
                <UserCog size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Tính năng quản lý người dùng đang được phát triển.</p>
             </div>
          )}

          {activeTab === 'options' && (
             <div className="space-y-4 max-w-2xl animate-in fade-in duration-300">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                   <div>
                      <h4 className="font-medium text-gray-800">Chế độ ghi sổ</h4>
                      <p className="text-sm text-gray-500">Cho phép ghi sổ ngay khi lưu chứng từ</p>
                   </div>
                   <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                   <div>
                      <h4 className="font-medium text-gray-800">Kiểm soát tồn kho âm</h4>
                      <p className="text-sm text-gray-500">Cảnh báo khi xuất quá số lượng tồn</p>
                   </div>
                   <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" defaultChecked />
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default System;
