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