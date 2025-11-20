import React from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Printer, Download } from 'lucide-react';

const Reports: React.FC = () => {
  const { type } = useParams<{ type: string }>();

  return (
    <div className="p-6 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">
                {type === 'financial' ? 'Báo cáo Tài chính' :
                 type === 'cash' ? 'Sổ Quỹ & Tiền gửi' :
                 type === 'sales' ? 'Báo cáo Doanh thu' : 'Báo cáo'}
            </h1>
            <p className="text-gray-500 text-sm">Kỳ báo cáo: Tháng 10/2023</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
             <Printer size={16} /> In báo cáo
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium shadow-sm">
             <Download size={16} /> Xuất Excel
           </button>
        </div>
      </div>

      {/* Report Content Preview */}
      <div className="bg-white shadow-lg rounded-none border border-gray-300 min-h-[600px] p-10 max-w-5xl mx-auto">
         {/* Report Header */}
         <div className="text-center mb-8">
            <h2 className="text-xl font-bold uppercase mb-2">
                {type === 'financial' ? 'BẢNG CÂN ĐỐI KẾ TOÁN' :
                 type === 'cash' ? 'SỔ QUỸ TIỀN MẶT' :
                 'BÁO CÁO KẾT QUẢ HOẠT ĐỘNG KINH DOANH'}
            </h2>
            <p className="italic text-gray-600">Tại ngày 31 tháng 10 năm 2023</p>
            <p className="text-sm text-gray-500 mt-1">(Đơn vị tính: Việt Nam Đồng)</p>
         </div>

         {/* Mock Report Table */}
         <div className="overflow-hidden border border-gray-300">
            <table className="w-full text-sm">
                <thead className="bg-gray-100 font-bold text-gray-800">
                    <tr>
                        <th className="border px-4 py-2 text-left w-16">STT</th>
                        <th className="border px-4 py-2 text-left">Chỉ tiêu</th>
                        <th className="border px-4 py-2 text-left w-24">Mã số</th>
                        <th className="border px-4 py-2 text-right w-40">Số cuối kỳ</th>
                        <th className="border px-4 py-2 text-right w-40">Số đầu năm</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="font-bold bg-gray-50">
                        <td className="border px-4 py-1">I</td>
                        <td className="border px-4 py-1">TÀI SẢN NGẮN HẠN</td>
                        <td className="border px-4 py-1 text-center">100</td>
                        <td className="border px-4 py-1 text-right">1.500.000.000</td>
                        <td className="border px-4 py-1 text-right">1.200.000.000</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-1">1</td>
                        <td className="border px-4 py-1 pl-8">Tiền và các khoản tương đương tiền</td>
                        <td className="border px-4 py-1 text-center">110</td>
                        <td className="border px-4 py-1 text-right">500.000.000</td>
                        <td className="border px-4 py-1 text-right">400.000.000</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-1">2</td>
                        <td className="border px-4 py-1 pl-8">Phải thu ngắn hạn khách hàng</td>
                        <td className="border px-4 py-1 text-center">130</td>
                        <td className="border px-4 py-1 text-right">300.000.000</td>
                        <td className="border px-4 py-1 text-right">250.000.000</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-1">3</td>
                        <td className="border px-4 py-1 pl-8">Hàng tồn kho</td>
                        <td className="border px-4 py-1 text-center">140</td>
                        <td className="border px-4 py-1 text-right">700.000.000</td>
                        <td className="border px-4 py-1 text-right">550.000.000</td>
                    </tr>

                    <tr className="font-bold bg-gray-50">
                        <td className="border px-4 py-1">II</td>
                        <td className="border px-4 py-1">TÀI SẢN DÀI HẠN</td>
                        <td className="border px-4 py-1 text-center">200</td>
                        <td className="border px-4 py-1 text-right">2.000.000.000</td>
                        <td className="border px-4 py-1 text-right">2.100.000.000</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-1">1</td>
                        <td className="border px-4 py-1 pl-8">Tài sản cố định</td>
                        <td className="border px-4 py-1 text-center">210</td>
                        <td className="border px-4 py-1 text-right">1.800.000.000</td>
                        <td className="border px-4 py-1 text-right">1.900.000.000</td>
                    </tr>
                     <tr>
                        <td className="border px-4 py-1">2</td>
                        <td className="border px-4 py-1 pl-8">Tài sản dở dang dài hạn</td>
                        <td className="border px-4 py-1 text-center">240</td>
                        <td className="border px-4 py-1 text-right">200.000.000</td>
                        <td className="border px-4 py-1 text-right">200.000.000</td>
                    </tr>
                    <tr className="font-bold text-blue-700 bg-blue-50">
                        <td className="border px-4 py-2"></td>
                        <td className="border px-4 py-2 uppercase">TỔNG CỘNG TÀI SẢN</td>
                        <td className="border px-4 py-2 text-center">270</td>
                        <td className="border px-4 py-2 text-right">3.500.000.000</td>
                        <td className="border px-4 py-2 text-right">3.300.000.000</td>
                    </tr>
                </tbody>
            </table>
         </div>
         
         <div className="mt-12 flex justify-around text-center">
            <div>
                <p className="font-bold">Người lập biểu</p>
                <p className="italic text-sm mb-16">(Ký, họ tên)</p>
                <p className="font-bold">Nguyễn Văn B</p>
            </div>
            <div>
                <p className="font-bold">Kế toán trưởng</p>
                <p className="italic text-sm mb-16">(Ký, họ tên)</p>
                <p className="font-bold">Admin</p>
            </div>
            <div>
                <p className="font-bold">Giám đốc</p>
                <p className="italic text-sm mb-16">(Ký, họ tên, đóng dấu)</p>
                <p className="font-bold">Nguyễn Văn A</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Reports;