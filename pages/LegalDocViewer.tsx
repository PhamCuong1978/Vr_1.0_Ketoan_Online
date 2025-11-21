
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { FileText, Calendar, Building2, AlertCircle, ArrowLeft } from 'lucide-react';

const LegalDocViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { legalDocuments } = useData();
  
  const doc = legalDocuments.find(d => d.id === id);

  if (!doc) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-500">
        <AlertCircle size={48} className="mb-4 text-red-400" />
        <h2 className="text-xl font-bold text-gray-700">Không tìm thấy văn bản</h2>
        <p>Văn bản này không tồn tại hoặc đã bị xóa.</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Quay lại danh sách
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:p-0">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-4 print:hidden">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-blue-600 transition-colors font-medium"
        >
          <ArrowLeft size={20} className="mr-2"/> Quay lại danh sách
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden print:shadow-none">
        {/* Header */}
        <div className="bg-blue-50 border-b border-blue-100 p-8 text-center">
          <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">
            {doc.issuingAuthority}
          </h3>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {doc.number}
          </h1>
          <h2 className="text-xl text-gray-800 font-medium leading-relaxed">
            {doc.name}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-600">
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              <FileText size={16} className="text-blue-500" />
              <span>Loại: <strong>{doc.type}</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              <Calendar size={16} className="text-green-500" />
              <span>Ban hành: <strong>{doc.issueDate || 'N/A'}</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              <Calendar size={16} className="text-orange-500" />
              <span>Hiệu lực: <strong>{doc.effectiveDate || 'N/A'}</strong></span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full border shadow-sm ${doc.status === 'ACTIVE' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
              <span className="w-2 h-2 rounded-full bg-current"></span>
              <span>{doc.status === 'ACTIVE' ? 'Đang hiệu lực' : 'Hết hiệu lực'}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-8 sm:p-12">
          {doc.content ? (
            <article className="prose prose-slate max-w-none font-serif text-gray-800 leading-loose whitespace-pre-wrap">
               {doc.content}
            </article>
          ) : (
            <div className="text-center py-12 text-gray-400 italic bg-gray-50 rounded-lg border border-dashed border-gray-300">
              Nội dung chi tiết chưa được cập nhật cho văn bản này.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 print:hidden">
          <span>Hệ thống Kế toán Online</span>
          <button 
            onClick={() => window.print()} 
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 hover:underline"
          >
            <FileText size={14} />
            In văn bản
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalDocViewer;
