
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search, X, Save, AlertCircle, FileText, UploadCloud, Calendar, Building2, Loader2, CheckCircle, Paperclip, ExternalLink } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Account, Partner, Product, LegalDocument } from '../types';
import { extractTextFromDocument } from '../services/geminiService';

const Categories: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const { 
    accounts, addAccount, updateAccount, deleteAccount,
    partners, addPartner, updatePartner, deletePartner,
    products, addProduct, updateProduct, deleteProduct,
    legalDocuments, addLegalDocument, updateLegalDocument, deleteLegalDocument
  } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [isReadingFile, setIsReadingFile] = useState(false);

  // Reset state when route changes
  useEffect(() => {
    setSearchTerm('');
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
    setIsReadingFile(false);
  }, [type]);

  let title = 'Danh mục';
  let data: any[] = [];
  let columns: string[] = [];

  // Config based on type
  switch (type) {
    case 'accounts':
      title = 'Hệ thống Tài khoản';
      columns = ['Số TT', 'Số TK', 'Tên tài khoản', 'Tính chất']; // Columns handled manually for accounts
      data = accounts.sort((a, b) => a.code.localeCompare(b.code));
      break;
    case 'partners':
      title = 'Khách hàng & Nhà cung cấp';
      columns = ['Mã', 'Tên đối tượng', 'Mã số thuế', 'Loại'];
      data = partners;
      break;
    case 'products':
      title = 'Vật tư hàng hóa';
      columns = ['Mã', 'Tên hàng', 'ĐVT', 'Đơn giá', 'Tồn kho'];
      data = products;
      break;
    case 'legal-docs':
      title = 'Văn bản Pháp luật';
      columns = ['Số hiệu', 'Tên văn bản', 'Cơ quan BH', 'Ngày hiệu lực', 'Trạng thái'];
      data = legalDocuments;
      break;
    default:
      title = 'Danh mục chung';
      data = [];
  }

  // Filtering
  const filteredData = data.filter((item: any) => {
     const searchLower = searchTerm.toLowerCase();
     if (type === 'accounts') return item.code.toLowerCase().includes(searchLower) || item.name.toLowerCase().includes(searchLower);
     if (type === 'partners') return (item.code?.toLowerCase().includes(searchLower) || item.name.toLowerCase().includes(searchLower));
     if (type === 'products') return (item.code?.toLowerCase().includes(searchLower) || item.name.toLowerCase().includes(searchLower));
     if (type === 'legal-docs') return (item.number?.toLowerCase().includes(searchLower) || item.name.toLowerCase().includes(searchLower));
     return false;
  });

  // Helper for Accounts Category Grouping
  let lastCategory = '';
  let sttCounter = 0;
  const getCategoryLabel = (cat: string) => {
      switch(cat) {
          case 'ASSET': return 'LOẠI TÀI KHOẢN TÀI SẢN';
          case 'LIABILITY': return 'LOẠI TÀI KHOẢN NỢ PHẢI TRẢ';
          case 'EQUITY': return 'LOẠI TÀI KHOẢN VỐN CHỦ SỞ HỮU';
          case 'REVENUE': return 'LOẠI TÀI KHOẢN DOANH THU';
          case 'EXPENSE': return 'LOẠI TÀI KHOẢN CHI PHÍ';
          default: return 'KHÁC';
      }
  };

  // Actions
  const handleAddNew = () => {
    setEditingItem(null);
    if (type === 'accounts') setFormData({ code: '', name: '', category: 'ASSET' });
    else if (type === 'partners') setFormData({ code: '', name: '', type: 'CUSTOMER', taxCode: '', address: '', phone: '' });
    else if (type === 'products') setFormData({ code: '', name: '', unit: 'Cái', price: 0, stock: 0 });
    else if (type === 'legal-docs') setFormData({ number: '', name: '', type: 'Thông tư', issueDate: '', effectiveDate: '', issuingAuthority: '', content: '', status: 'ACTIVE', fileName: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = (item: any) => {
    if (!window.confirm(`Bạn có chắc muốn xóa "${item.name}" không?`)) return;

    switch (type) {
      case 'accounts':
        deleteAccount(item.code);
        break;
      case 'partners':
        deletePartner(item.id);
        break;
      case 'products':
        deleteProduct(item.id);
        break;
      case 'legal-docs':
        deleteLegalDocument(item.id);
        break;
    }
  };

  const handleSave = () => {
    // Validation simple
    if (!formData.name) return alert("Vui lòng nhập tên!");
    if (type === 'accounts' && !formData.code) return alert("Vui lòng nhập số tài khoản!");
    if (type === 'legal-docs') {
        if (!formData.number) return alert("Vui lòng nhập số hiệu văn bản!");
        if (!formData.issuingAuthority) return alert("Vui lòng nhập cơ quan ban hành!");
    }

    if (type === 'accounts') {
      if (editingItem) updateAccount(editingItem.code, formData);
      else {
        // Check duplicate
        if (accounts.find(a => a.code === formData.code)) return alert("Số tài khoản đã tồn tại!");
        addAccount(formData);
      }
    } else if (type === 'partners') {
      if (editingItem) updatePartner(editingItem.id, formData);
      else addPartner(formData);
    } else if (type === 'products') {
      if (editingItem) updateProduct(editingItem.id, formData);
      else addProduct(formData);
    } else if (type === 'legal-docs') {
      if (editingItem) updateLegalDocument(editingItem.id, formData);
      else addLegalDocument(formData);
    }

    setIsModalOpen(false);
  };

  // Enhanced File Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Save file name & Auto-fill name if empty
      setFormData((prev: any) => ({
        ...prev,
        name: prev.name || file.name,
        fileName: file.name // Persist file name
      }));

      if (file.type === "text/plain") {
          const reader = new FileReader();
          reader.onload = (event) => {
              setFormData((prev: any) => ({
                  ...prev,
                  content: event.target?.result as string
              }));
          };
          reader.readAsText(file);
      } else {
          // Handle PDF and DOC/DOCX via Gemini AI Extraction
          setIsReadingFile(true);
          try {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = async () => {
                  const base64Data = (reader.result as string).split(',')[1];
                  try {
                      const extractedText = await extractTextFromDocument(base64Data, file.type);
                      setFormData((prev: any) => ({
                          ...prev,
                          content: extractedText
                      }));
                  } catch (error) {
                      alert("Không thể đọc nội dung file. Vui lòng thử lại hoặc copy dán thủ công.");
                      console.error(error);
                  } finally {
                      setIsReadingFile(false);
                  }
              };
          } catch (err) {
              console.error(err);
              setIsReadingFile(false);
          }
      }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <button 
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm transition-colors"
        >
          <Plus size={18} /> Thêm mới
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4 shrink-0">
        <div className="relative max-w-md">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
           <input 
             type="text" 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             placeholder="Tìm kiếm..." 
             className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
           />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden flex flex-col">
        <div className="overflow-auto flex-1 relative custom-scrollbar">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 font-bold sticky top-0 z-10 shadow-sm">
                {type === 'accounts' ? (
                    <>
                        <tr>
                            <th rowSpan={2} className="px-3 py-2 border border-gray-300 text-center w-16">Số TT</th>
                            <th colSpan={2} className="px-3 py-2 border border-gray-300 text-center">SỐ HIỆU TK</th>
                            <th rowSpan={2} className="px-3 py-2 border border-gray-300 text-center">TÊN TÀI KHOẢN</th>
                            <th rowSpan={2} className="px-3 py-2 border border-gray-300 text-center w-24">Thao tác</th>
                        </tr>
                        <tr>
                            <th className="px-3 py-2 border border-gray-300 text-center w-24">Cấp 1</th>
                            <th className="px-3 py-2 border border-gray-300 text-center w-24">Cấp 2</th>
                        </tr>
                    </>
                ) : (
                    <tr>
                        {columns.map((col, idx) => <th key={idx} className="px-6 py-3 border border-gray-200 bg-gray-50">{col}</th>)}
                        <th className="px-6 py-3 border border-gray-200 bg-gray-50 text-right">Thao tác</th>
                    </tr>
                )}
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((item: any, idx: number) => {
                  // Logic for Accounts Grouping Header
                  let groupHeader = null;
                  if (type === 'accounts' && item.category !== lastCategory) {
                      lastCategory = item.category;
                      groupHeader = (
                          <tr key={`cat-${idx}`} className="bg-gray-50">
                              <td className="border border-gray-300"></td>
                              <td className="border border-gray-300"></td>
                              <td className="border border-gray-300"></td>
                              <td className="px-4 py-2 border border-gray-300 font-bold uppercase text-gray-800">
                                  {getCategoryLabel(item.category)}
                              </td>
                              <td className="border border-gray-300"></td>
                          </tr>
                      );
                  }

                  // Logic for STT (Only for Level 1 accounts)
                  let sttDisplay = '';
                  if (type === 'accounts' && item.code.length === 3) {
                      sttCounter++;
                      sttDisplay = sttCounter.toString().padStart(2, '0');
                  }
                  
                  // Use stable key if possible
                  const rowKey = item.id || item.code || idx;

                  return (
                    <React.Fragment key={rowKey}>
                        {groupHeader}
                        <tr className={`hover:bg-blue-50 transition-colors group ${type === 'accounts' ? '' : 'border-b border-gray-200'}`}>
                            {type === 'accounts' && (
                            <>
                                <td className="px-3 py-2 border border-gray-300 text-center font-medium text-gray-600">
                                    {sttDisplay}
                                </td>
                                <td className="px-3 py-2 border border-gray-300 text-center font-bold text-gray-800">
                                    {item.code.length === 3 ? item.code : ''}
                                </td>
                                <td className="px-3 py-2 border border-gray-300 text-center font-medium text-gray-600">
                                    {item.code.length > 3 ? item.code : ''}
                                </td>
                                <td className={`px-3 py-2 border border-gray-300 font-medium text-gray-800 ${item.code.length === 3 ? 'font-bold' : ''}`}>
                                    {item.name}
                                </td>
                            </>
                            )}
                            
                            {type === 'partners' && (
                            <>
                                <td className="px-6 py-3 font-medium border border-gray-200">{item.code || 'AUTO'}</td>
                                <td className="px-6 py-3 font-medium text-gray-800 border border-gray-200">{item.name}</td>
                                <td className="px-6 py-3 text-gray-500 border border-gray-200">{item.taxCode || '-'}</td>
                                <td className="px-6 py-3 border border-gray-200">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    item.type === 'CUSTOMER' ? 'bg-blue-100 text-blue-700' : 
                                    item.type === 'SUPPLIER' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                    {item.type}
                                </span>
                                </td>
                            </>
                            )}

                            {type === 'products' && (
                            <>
                                <td className="px-6 py-3 font-medium border border-gray-200">{item.code}</td>
                                <td className="px-6 py-3 font-medium text-gray-800 border border-gray-200">{item.name}</td>
                                <td className="px-6 py-3 border border-gray-200">{item.unit}</td>
                                <td className="px-6 py-3 font-mono text-gray-700 border border-gray-200">{item.price?.toLocaleString('vi-VN')}</td>
                                <td className="px-6 py-3 font-medium text-blue-600 border border-gray-200">{item.stock}</td>
                            </>
                            )}

                            {type === 'legal-docs' && (
                            <>
                                <td className="px-6 py-3 font-medium text-blue-600 border border-gray-200">
                                   <Link 
                                     to={`/legal-doc/${item.id}`} 
                                     className="flex items-center gap-2 hover:text-blue-800 hover:underline group/link"
                                     title="Mở văn bản"
                                   >
                                      <FileText size={16} className="text-gray-400 group-hover/link:text-blue-600"/>
                                      {item.number}
                                   </Link>
                                </td>
                                <td className="px-6 py-3 font-medium text-gray-800 border border-gray-200">
                                    <div>{item.name}</div>
                                    {item.fileName && (
                                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                                            <Paperclip size={10} />
                                            <span>{item.fileName}</span>
                                        </div>
                                    )}
                                </td>
                                <td className="px-6 py-3 text-gray-600 border border-gray-200">{item.issuingAuthority}</td>
                                <td className="px-6 py-3 text-gray-600 border border-gray-200">{item.effectiveDate || item.issueDate}</td>
                                <td className="px-6 py-3 border border-gray-200">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {item.status === 'ACTIVE' ? 'Hiệu lực' : 'Hết hiệu lực'}
                                    </span>
                                </td>
                            </>
                            )}

                            <td className={`px-4 py-2 text-right ${type === 'accounts' ? 'border border-gray-300' : 'border border-gray-200'}`}>
                            <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(item)} className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-md transition-colors" title="Sửa">
                                <Edit size={16} />
                                </button>
                                <button onClick={() => handleDelete(item)} className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition-colors" title="Xóa">
                                <Trash2 size={16} />
                                </button>
                            </div>
                            </td>
                        </tr>
                    </React.Fragment>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={type === 'accounts' ? 5 : columns.length + 1} className="px-6 py-12 text-center text-gray-400 border border-gray-200">
                    <div className="flex flex-col items-center">
                      <AlertCircle size={48} className="mb-2 text-gray-300" />
                      <p>Không tìm thấy dữ liệu nào.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-3 border-t border-gray-200 bg-gray-50 text-right text-xs text-gray-500">
           Tổng số: {filteredData.length} bản ghi
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">
                {editingItem ? 'Cập nhật' : 'Thêm mới'} {
                  type === 'accounts' ? 'Tài khoản' : 
                  type === 'partners' ? 'Đối tác' : 
                  type === 'products' ? 'Sản phẩm' : 'Văn bản'
                }
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {type === 'accounts' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Số Tài khoản <span className="text-red-500">*</span></label>
                    <input 
                      disabled={!!editingItem}
                      value={formData.code || ''}
                      onChange={e => setFormData({...formData, code: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
                      placeholder="VD: 111"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên Tài khoản <span className="text-red-500">*</span></label>
                    <input 
                      value={formData.name || ''}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="VD: Tiền mặt"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tính chất</label>
                    <select 
                      value={formData.category || 'ASSET'}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="ASSET">Tài sản (Đầu 1, 2)</option>
                      <option value="LIABILITY">Nợ phải trả (Đầu 3)</option>
                      <option value="EQUITY">Vốn chủ sở hữu (Đầu 4)</option>
                      <option value="REVENUE">Doanh thu (Đầu 5, 7)</option>
                      <option value="EXPENSE">Chi phí (Đầu 6, 8)</option>
                    </select>
                  </div>
                </>
              )}

              {type === 'partners' && (
                <>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mã đối tác</label>
                        <input 
                          value={formData.code || ''}
                          onChange={e => setFormData({...formData, code: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Tự động nếu để trống"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Loại</label>
                        <select 
                          value={formData.type || 'CUSTOMER'}
                          onChange={e => setFormData({...formData, type: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          <option value="CUSTOMER">Khách hàng</option>
                          <option value="SUPPLIER">Nhà cung cấp</option>
                          <option value="EMPLOYEE">Nhân viên</option>
                          <option value="OTHER">Khác</option>
                        </select>
                      </div>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tên đối tác <span className="text-red-500">*</span></label>
                      <input 
                        value={formData.name || ''}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mã số thuế</label>
                      <input 
                        value={formData.taxCode || ''}
                        onChange={e => setFormData({...formData, taxCode: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Điện thoại</label>
                      <input 
                        value={formData.phone || ''}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                      <input 
                        value={formData.address || ''}
                        onChange={e => setFormData({...formData, address: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                   </div>
                </>
              )}

              {type === 'products' && (
                <>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mã hàng</label>
                        <input 
                          value={formData.code || ''}
                          onChange={e => setFormData({...formData, code: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="Tự động nếu để trống"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Đơn vị tính</label>
                        <input 
                          value={formData.unit || ''}
                          onChange={e => setFormData({...formData, unit: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tên hàng hóa <span className="text-red-500">*</span></label>
                      <input 
                        value={formData.name || ''}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Đơn giá bán</label>
                        <input 
                          type="number"
                          value={formData.price || 0}
                          onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tồn đầu kỳ</label>
                        <input 
                          type="number"
                          value={formData.stock || 0}
                          onChange={e => setFormData({...formData, stock: Number(e.target.value)})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                   </div>
                </>
              )}

              {type === 'legal-docs' && (
                <>
                   <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Số hiệu <span className="text-red-500">*</span></label>
                        <input 
                          value={formData.number || ''}
                          onChange={e => setFormData({...formData, number: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="VD: 200/2014/TT-BTC"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Loại văn bản</label>
                         <select 
                          value={formData.type || 'Thông tư'}
                          onChange={e => setFormData({...formData, type: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          <option value="Thông tư">Thông tư</option>
                          <option value="Nghị định">Nghị định</option>
                          <option value="Luật">Luật</option>
                          <option value="Quyết định">Quyết định</option>
                          <option value="Công văn">Công văn</option>
                        </select>
                      </div>
                      <div className="col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cơ quan BH <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input 
                                value={formData.issuingAuthority || ''}
                                onChange={e => setFormData({...formData, issuingAuthority: e.target.value})}
                                className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                placeholder="VD: Bộ Tài chính"
                            />
                            <Building2 size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                   </div>
                   <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tên/Trích yếu văn bản <span className="text-red-500">*</span></label>
                      <textarea
                        value={formData.name || ''}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        rows={2}
                        placeholder="Nhập tên hoặc trích yếu nội dung văn bản..."
                      />
                   </div>
                   <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ngày ban hành</label>
                        <div className="relative">
                            <input 
                            type="date"
                            value={formData.issueDate || ''}
                            onChange={e => setFormData({...formData, issueDate: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg pl-8 pr-2 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <Calendar size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hiệu lực</label>
                        <div className="relative">
                            <input 
                            type="date"
                            value={formData.effectiveDate || ''}
                            onChange={e => setFormData({...formData, effectiveDate: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg pl-8 pr-2 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                             <Calendar size={16} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
                        <select 
                          value={formData.status || 'ACTIVE'}
                          onChange={e => setFormData({...formData, status: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                          <option value="ACTIVE">Còn hiệu lực</option>
                          <option value="EXPIRED">Hết hiệu lực</option>
                          <option value="REPLACED">Đã bị thay thế</option>
                        </select>
                      </div>
                   </div>
                   
                   <div className="border-t pt-4 mt-2">
                        <div className="flex items-center justify-between mb-2">
                           <div className="flex flex-col">
                               <label className="block text-sm font-bold text-gray-800">Nội dung văn bản (QUAN TRỌNG)</label>
                               <p className="text-xs text-gray-500">AI sẽ tự động đọc và điền khi bạn tải file lên</p>
                           </div>
                           
                           {isReadingFile && (
                             <span className="flex items-center text-xs text-blue-600 animate-pulse">
                               <Loader2 size={12} className="mr-1 animate-spin" />
                               Đang đọc tài liệu bằng AI...
                             </span>
                           )}
                           {!isReadingFile && formData.content && formData.content.length > 100 && (
                               <span className="flex items-center text-xs text-green-600">
                                   <CheckCircle size={12} className="mr-1" />
                                   Đã trích xuất nội dung
                               </span>
                           )}
                        </div>
                        
                        <div className="flex flex-col gap-2 mb-3">
                            <div className="flex items-center gap-3">
                                <label className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-colors border border-blue-200 ${isReadingFile ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-50 hover:bg-blue-100 text-blue-700'}`}>
                                    {isReadingFile ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
                                    <span>Tải lên file (PDF, Doc, Docx)</span>
                                    <input 
                                    type="file" 
                                    className="hidden" 
                                    onChange={handleFileUpload} 
                                    accept=".pdf,.doc,.docx,.txt"
                                    disabled={isReadingFile}
                                    />
                                </label>
                                {formData.fileName && (
                                    <div className="flex items-center gap-2 text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-lg">
                                        <Paperclip size={14} />
                                        <span className="max-w-[150px] truncate" title={formData.fileName}>{formData.fileName}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <textarea
                            value={formData.content || ''}
                            onChange={e => setFormData({...formData, content: e.target.value})}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-sm bg-gray-50 font-mono"
                            rows={10}
                            disabled={isReadingFile}
                            placeholder="Dán nội dung chi tiết của văn bản vào đây. Ví dụ: Điều 1. Phạm vi điều chỉnh..."
                        />
                   </div>
                </>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors">Hủy bỏ</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm flex items-center gap-2 transition-colors">
                <Save size={18} /> Lưu & Dạy AI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
