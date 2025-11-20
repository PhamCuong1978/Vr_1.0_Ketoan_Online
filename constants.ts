import { Account, CompanyInfo, Partner, Product, Transaction, TransactionType } from './types';

export const INITIAL_COMPANY_INFO: CompanyInfo = {
  name: "CÔNG TY CỔ PHẦN CÔNG NGHỆ TƯƠNG LAI",
  address: "Tầng 12, Tòa nhà Innovation, Quận 1, TP.HCM",
  taxCode: "0101234567",
  director: "Nguyễn Văn A",
  phone: "0909123456"
};

export const MOCK_ACCOUNTS: Account[] = [
  { code: '111', name: 'Tiền mặt', category: 'ASSET' },
  { code: '112', name: 'Tiền gửi ngân hàng', category: 'ASSET' },
  { code: '131', name: 'Phải thu khách hàng', category: 'ASSET' },
  { code: '152', name: 'Nguyên liệu, vật liệu', category: 'ASSET' },
  { code: '156', name: 'Hàng hóa', category: 'ASSET' },
  { code: '211', name: 'Tài sản cố định hữu hình', category: 'ASSET' },
  { code: '331', name: 'Phải trả cho người bán', category: 'LIABILITY' },
  { code: '334', name: 'Phải trả người lao động', category: 'LIABILITY' },
  { code: '411', name: 'Vốn đầu tư của CSH', category: 'EQUITY' },
  { code: '511', name: 'Doanh thu bán hàng', category: 'REVENUE' },
  { code: '632', name: 'Giá vốn hàng bán', category: 'EXPENSE' },
  { code: '642', name: 'Chi phí quản lý doanh nghiệp', category: 'EXPENSE' },
];

export const MOCK_PARTNERS: Partner[] = [
  { id: '1', code: 'KH001', name: 'Công ty TNHH ABC', type: 'CUSTOMER', taxCode: '030111222', address: 'Hà Nội' },
  { id: '2', code: 'NCC001', name: 'Công ty Máy tính XYZ', type: 'SUPPLIER', taxCode: '030333444', address: 'Đà Nẵng' },
  { id: '3', code: 'NV001', name: 'Trần Thị B', type: 'EMPLOYEE', address: 'TP.HCM' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', code: 'LAP01', name: 'Laptop Dell XPS 13', unit: 'Cái', price: 25000000, stock: 10 },
  { id: '2', code: 'MAC01', name: 'MacBook Pro M1', unit: 'Cái', price: 30000000, stock: 5 },
  { id: '3', code: 'MOUSE01', name: 'Chuột Logitech MX', unit: 'Cái', price: 1500000, stock: 50 },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    date: '2023-10-01',
    type: TransactionType.RECEIPT,
    documentNo: 'PT001',
    description: 'Thu tiền bán hàng KH001',
    partnerId: '1',
    totalAmount: 50000000,
    details: [{ description: 'Thu tiền đợt 1', accountCode: '131', quantity: 1, price: 50000000, amount: 50000000 }]
  },
  {
    id: '2',
    date: '2023-10-02',
    type: TransactionType.PAYMENT,
    documentNo: 'PC001',
    description: 'Chi tiền điện nước tháng 9',
    partnerId: '2',
    totalAmount: 2000000,
    details: [{ description: 'Tiền điện', accountCode: '642', quantity: 1, price: 2000000, amount: 2000000 }]
  },
  {
    id: '3',
    date: '2023-10-05',
    type: TransactionType.SALES,
    documentNo: 'BH001',
    description: 'Xuất bán Laptop Dell',
    partnerId: '1',
    totalAmount: 25000000,
    details: [{ itemId: '1', description: 'Laptop Dell XPS 13', accountCode: '511', quantity: 1, price: 25000000, amount: 25000000 }]
  }
];