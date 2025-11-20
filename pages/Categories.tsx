import React from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { MOCK_ACCOUNTS, MOCK_PARTNERS, MOCK_PRODUCTS } from '../constants';

const Categories: React.FC = () => {
  const { type } = useParams<{ type: string }>();

  let title = 'Danh mục';
  let columns: string[] = [];
  let data: any[] = [];

  // Config based on type
  switch (type) {
    case 'accounts':
      title = 'Hệ thống Tài khoản';
      columns = ['Số TK', 'Tên tài khoản', 'Tính chất'];
      data = MOCK_ACCOUNTS;
      break;
    case 'partners':
      title = 'Khách hàng & Nhà cung cấp';
      columns = ['Mã', 'Tên đối tượng', 'Mã số thuế', 'Loại'];
      data = MOCK_PARTNERS;
      break;
    case 'products':
      title = 'Vật tư hàng hóa';
      columns = ['Mã', 'Tên hàng', 'ĐVT', 'Đơn giá', 'Tồn kho'];
      data = MOCK_PRODUCTS;
      break;
    default:
      title = 'Danh mục chung';
      data = [];
  }

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm">
          <Plus size={18} /> Thêm mới
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
        <div className="relative max-w-md">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
           <input type="text" placeholder="Tìm kiếm..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                {columns.map((col, idx) => <th key={idx} className="px-6 py-3">{col}</th>)}
                <th className="px-6 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item: any, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  {type === 'accounts' && (
                    <>
                      <td className="px-6 py-4 font-medium">{item.code}</td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-100 rounded text-xs">{item.category}</span></td>
                    </>
                  )}
                  {type === 'partners' && (
                    <>
                      <td className="px-6 py-4 font-medium">{item.code}</td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.taxCode || '-'}</td>
                      <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs ${item.type === 'CUSTOMER' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>{item.type}</span></td>
                    </>
                  )}
                  {type === 'products' && (
                    <>
                      <td className="px-6 py-4 font-medium">{item.code}</td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.unit}</td>
                      <td className="px-6 py-4 font-mono">{item.price.toLocaleString('vi-VN')}</td>
                      <td className="px-6 py-4">{item.stock}</td>
                    </>
                  )}

                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit size={16} /></button>
                    <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;