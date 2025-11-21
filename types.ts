
export enum TransactionType {
  RECEIPT = 'PT', // Thu
  PAYMENT = 'PC', // Chi
  IMPORT = 'PN', // Nhập kho
  EXPORT = 'PX', // Xuất kho
  SALES = 'BH', // Bán hàng
  PURCHASE = 'MH', // Mua hàng
  ALLOCATION = 'PBCC', // Phân bổ CCDC
  DEPRECIATION = 'KH', // Khấu hao
  SALARY = 'LUONG', // Lương
  OTHER = 'PK', // Phiếu khác
}

export interface CompanyInfo {
  name: string;
  address: string;
  taxCode: string;
  director: string;
  phone: string;
}

export interface Account {
  code: string;
  name: string;
  category: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
}

export interface Partner {
  id: string;
  code: string;
  name: string;
  taxCode?: string;
  address?: string;
  phone?: string;
  type: 'CUSTOMER' | 'SUPPLIER' | 'EMPLOYEE' | 'OTHER';
}

export interface Product {
  id: string;
  code: string;
  name: string;
  unit: string;
  price: number;
  stock: number;
}

export interface LegalDocument {
  id: string;
  number: string; // Số hiệu văn bản (VD: 200/2014/TT-BTC)
  name: string; // Tên văn bản (VD: Thông tư hướng dẫn chế độ kế toán...)
  type: string; // Thông tư, Nghị định, Luật...
  issueDate: string; // Ngày ban hành
  effectiveDate: string; // Ngày hiệu lực
  issuingAuthority: string; // Cơ quan ban hành
  content: string; // Nội dung tóm tắt hoặc chi tiết (để AI đọc)
  status: 'ACTIVE' | 'EXPIRED' | 'REPLACED';
  fileName?: string; // Tên file đã upload
}

export interface TransactionDetail {
  itemId?: string;
  description: string;
  accountCode: string; // TK Nợ/Có đối ứng
  quantity: number;
  price: number;
  amount: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  documentNo: string; // Số chứng từ
  description: string;
  partnerId?: string; // Khách hàng/NCC/NV
  totalAmount: number;
  details: TransactionDetail[];
}

export interface MenuItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  subItems?: MenuItem[];
}

// AI Chat Types
export type MessageRole = 'user' | 'model' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
  attachments?: { type: 'image' | 'audio'; url: string; data: string }[];
  isError?: boolean;
}

export interface DataContextType {
  companyInfo: CompanyInfo;
  updateCompanyInfo: (info: Partial<CompanyInfo>) => void;
  
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => string;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  
  partners: Partner[];
  addPartner: (partner: Omit<Partner, 'id'>) => string;
  updatePartner: (id: string, partner: Partial<Partner>) => void;
  deletePartner: (id: string) => void;

  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => string;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  accounts: Account[];
  addAccount: (account: Account) => void;
  updateAccount: (code: string, account: Partial<Account>) => void;
  deleteAccount: (code: string) => void;

  legalDocuments: LegalDocument[];
  addLegalDocument: (doc: Omit<LegalDocument, 'id'>) => string;
  updateLegalDocument: (id: string, doc: Partial<LegalDocument>) => void;
  deleteLegalDocument: (id: string) => void;

  importData: (data: any) => void;
}
