

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

export interface BankAccount {
  id: string;
  accountNumber: string;
  bankName: string;
  branch: string;
  currency: string;
  accountHolder?: string;
}

export interface Project {
  id: string;
  code: string;
  name: string;
  value: number;
  startDate?: string;
  status: 'ACTIVE' | 'COMPLETED' | 'PENDING';
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

// --- New Categories Types ---
export interface Currency {
  id: string;
  code: string; // USD, VND
  name: string; // Đô la Mỹ
  exchangeRate: number; // Tỷ giá
  isDefault: boolean;
}

export interface Unit {
  id: string;
  code: string; // CAI, KG
  name: string; // Cái, Kilogam
}

export interface VoucherType {
  id: string;
  code: string; // PT, PC
  name: string; // Phiếu thu, Phiếu chi
  template: string; // Mẫu in
}

export interface Warehouse {
  id: string;
  code: string;
  name: string;
  address: string;
}

export interface ExpenseItem {
  id: string;
  code: string;
  name: string;
  group: 'SELLING' | 'ADMIN' | 'MANUFACTURING' | 'OTHER'; // Chi phí bán hàng, quản lý...
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

  bankAccounts: BankAccount[];
  addBankAccount: (bank: Omit<BankAccount, 'id'>) => string;
  updateBankAccount: (id: string, bank: Partial<BankAccount>) => void;
  deleteBankAccount: (id: string) => void;

  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => string;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  legalDocuments: LegalDocument[];
  addLegalDocument: (doc: Omit<LegalDocument, 'id'>) => string;
  updateLegalDocument: (id: string, doc: Partial<LegalDocument>) => void;
  deleteLegalDocument: (id: string) => void;

  // New Categories CRUD
  currencies: Currency[];
  addCurrency: (item: Omit<Currency, 'id'>) => string;
  updateCurrency: (id: string, item: Partial<Currency>) => void;
  deleteCurrency: (id: string) => void;

  units: Unit[];
  addUnit: (item: Omit<Unit, 'id'>) => string;
  updateUnit: (id: string, item: Partial<Unit>) => void;
  deleteUnit: (id: string) => void;

  voucherTypes: VoucherType[];
  addVoucherType: (item: Omit<VoucherType, 'id'>) => string;
  updateVoucherType: (id: string, item: Partial<VoucherType>) => void;
  deleteVoucherType: (id: string) => void;

  warehouses: Warehouse[];
  addWarehouse: (item: Omit<Warehouse, 'id'>) => string;
  updateWarehouse: (id: string, item: Partial<Warehouse>) => void;
  deleteWarehouse: (id: string) => void;

  expenseItems: ExpenseItem[];
  addExpenseItem: (item: Omit<ExpenseItem, 'id'>) => string;
  updateExpenseItem: (id: string, item: Partial<ExpenseItem>) => void;
  deleteExpenseItem: (id: string) => void;

  importData: (data: any) => void;
}