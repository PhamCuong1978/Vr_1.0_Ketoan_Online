
import React, { useState, useEffect } from 'react';
import { Save, Building, UserCog, Shield } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const System: React.FC = () => {
  const { companyInfo, updateCompanyInfo } = useData();
  const [formState, setFormState] = useState(companyInfo);
  const [activeTab, setActiveTab] = useState<'company' | 'users' | 'options'>('company');

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Hệ thống</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('company')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${activeTab === 'company' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Building size={18}/> Thông tin Doanh nghiệp
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${activeTab === 'users' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <UserCog size={18}/> Người dùng & Phân quyền
            </button>
            <button
              onClick={() => setActiveTab('options')}
              className={`px-6 py-4 text-sm font-medium flex items-center gap-2 ${activeTab === 'options' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Shield size={18}/> Tùy chọn
            </button>
        </div>

        <div className="p-6">
          {activeTab === 'company' && (
            <div className="max-w-3xl space-y-6">
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
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  <Save size={18} /> Lưu thông tin
                </button>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
             <div className="text-center py-12 text-gray-500">
                <UserCog size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Tính năng quản lý người dùng đang được phát triển.</p>
             </div>
          )}

          {activeTab === 'options' && (
             <div className="space-y-4 max-w-2xl">
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
