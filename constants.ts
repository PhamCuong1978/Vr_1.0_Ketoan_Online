
import { Account, CompanyInfo, Partner, Product, Transaction, TransactionType, LegalDocument } from './types';

export const INITIAL_COMPANY_INFO: CompanyInfo = {
  name: "CÔNG TY CỔ PHẦN CÔNG NGHỆ TƯƠNG LAI",
  address: "Tầng 12, Tòa nhà Innovation, Quận 1, TP.HCM",
  taxCode: "0101234567",
  director: "Nguyễn Văn A",
  phone: "0909123456"
};

// Danh mục tài khoản theo Thông tư 200
export const MOCK_ACCOUNTS: Account[] = [
  // TÀI SẢN (ĐẦU 1, 2)
  { code: '111', name: 'Tiền mặt', category: 'ASSET' },
  { code: '112', name: 'Tiền gửi không kỳ hạn', category: 'ASSET' },
  { code: '113', name: 'Tiền đang chuyển', category: 'ASSET' },
  { code: '121', name: 'Chứng khoán kinh doanh', category: 'ASSET' },
  { code: '128', name: 'Đầu tư nắm giữ đến ngày đáo hạn', category: 'ASSET' },
  { code: '1281', name: 'Tiền gửi có kỳ hạn', category: 'ASSET' },
  { code: '1282', name: 'Trái phiếu', category: 'ASSET' },
  { code: '1283', name: 'Cho vay', category: 'ASSET' },
  { code: '1288', name: 'Các khoản đầu tư khác nắm giữ đến ngày đáo hạn', category: 'ASSET' },
  { code: '131', name: 'Phải thu của khách hàng', category: 'ASSET' },
  { code: '133', name: 'Thuế GTGT được khấu trừ', category: 'ASSET' },
  { code: '1331', name: 'Thuế GTGT được khấu trừ của hàng hóa, dịch vụ', category: 'ASSET' },
  { code: '1332', name: 'Thuế GTGT được khấu trừ của TSCĐ', category: 'ASSET' },
  { code: '136', name: 'Phải thu nội bộ', category: 'ASSET' },
  { code: '1361', name: 'Vốn kinh doanh ở đơn vị trực thuộc', category: 'ASSET' },
  { code: '1362', name: 'Phải thu nội bộ về chênh lệch tỷ giá', category: 'ASSET' },
  { code: '1363', name: 'Phải thu nội bộ về chi phí đi vay đủ điều kiện được vốn hoá', category: 'ASSET' },
  { code: '1368', name: 'Phải thu nội bộ khác', category: 'ASSET' },
  { code: '138', name: 'Phải thu khác', category: 'ASSET' },
  { code: '1381', name: 'Tài sản thiếu chờ xử lý', category: 'ASSET' },
  { code: '1383', name: 'Thuế TTĐB của hàng nhập khẩu', category: 'ASSET' },
  { code: '1388', name: 'Phải thu khác', category: 'ASSET' },
  { code: '141', name: 'Tạm ứng', category: 'ASSET' },
  { code: '151', name: 'Hàng mua đang đi đường', category: 'ASSET' },
  { code: '152', name: 'Nguyên liệu, vật liệu', category: 'ASSET' },
  { code: '153', name: 'Công cụ, dụng cụ', category: 'ASSET' },
  { code: '154', name: 'Chi phí sản xuất, kinh doanh dở dang', category: 'ASSET' },
  { code: '155', name: 'Sản phẩm', category: 'ASSET' },
  { code: '156', name: 'Hàng hóa', category: 'ASSET' },
  { code: '157', name: 'Hàng gửi đi bán', category: 'ASSET' },
  { code: '158', name: 'Nguyên liệu, vật tư tại kho bảo thuế', category: 'ASSET' },
  { code: '171', name: 'Giao dịch mua, bán lại trái phiếu chính phủ', category: 'ASSET' },
  { code: '211', name: 'Tài sản cố định hữu hình', category: 'ASSET' },
  { code: '212', name: 'Tài sản cố định thuê tài chính', category: 'ASSET' },
  { code: '213', name: 'Tài sản cố định vô hình', category: 'ASSET' },
  { code: '214', name: 'Hao mòn tài sản cố định', category: 'ASSET' },
  { code: '2141', name: 'Hao mòn TSCĐ hữu hình', category: 'ASSET' },
  { code: '2142', name: 'Hao mòn TSCĐ thuê tài chính', category: 'ASSET' },
  { code: '2143', name: 'Hao mòn TSCĐ vô hình', category: 'ASSET' },
  { code: '2147', name: 'Hao mòn BĐSĐT', category: 'ASSET' },
  { code: '215', name: 'Tài sản sinh học', category: 'ASSET' },
  { code: '217', name: 'Bất động sản đầu tư', category: 'ASSET' },
  { code: '221', name: 'Đầu tư vào công ty con', category: 'ASSET' },
  { code: '222', name: 'Đầu tư vào công ty liên doanh, liên kết', category: 'ASSET' },
  { code: '228', name: 'Đầu tư khác', category: 'ASSET' },
  { code: '229', name: 'Dự phòng tổn thất tài sản', category: 'ASSET' },
  { code: '241', name: 'Xây dựng cơ bản dở dang', category: 'ASSET' },
  { code: '242', name: 'Chi phí chờ phân bổ', category: 'ASSET' },
  { code: '243', name: 'Tài sản thuế thu nhập hoãn lại', category: 'ASSET' },
  { code: '244', name: 'Ký quỹ, ký cược', category: 'ASSET' },

  // NỢ PHẢI TRẢ (ĐẦU 3)
  { code: '331', name: 'Phải trả cho người bán', category: 'LIABILITY' },
  { code: '332', name: 'Phải trả cổ tức, lợi nhuận', category: 'LIABILITY' },
  { code: '333', name: 'Thuế và các khoản phải nộp Nhà nước', category: 'LIABILITY' },
  { code: '3331', name: 'Thuế giá trị gia tăng phải nộp', category: 'LIABILITY' },
  { code: '334', name: 'Phải trả người lao động', category: 'LIABILITY' },
  { code: '335', name: 'Chi phí phải trả', category: 'LIABILITY' },
  { code: '336', name: 'Phải trả nội bộ', category: 'LIABILITY' },
  { code: '337', name: 'Thanh toán theo tiến độ hợp đồng xây dựng', category: 'LIABILITY' },
  { code: '338', name: 'Phải trả, phải nộp khác', category: 'LIABILITY' },
  { code: '341', name: 'Vay và nợ thuê tài chính', category: 'LIABILITY' },
  { code: '343', name: 'Trái phiếu phát hành', category: 'LIABILITY' },
  { code: '344', name: 'Nhận ký quỹ, ký cược', category: 'LIABILITY' },
  { code: '347', name: 'Thuế thu nhập hoãn lại phải trả', category: 'LIABILITY' },
  { code: '352', name: 'Dự phòng phải trả', category: 'LIABILITY' },
  { code: '353', name: 'Quỹ khen thưởng, phúc lợi', category: 'LIABILITY' },
  { code: '356', name: 'Quỹ phát triển khoa học và công nghệ', category: 'LIABILITY' },
  { code: '357', name: 'Quỹ bình ổn giá', category: 'LIABILITY' },

  // VỐN CHỦ SỞ HỮU (ĐẦU 4)
  { code: '411', name: 'Vốn đầu tư của chủ sở hữu', category: 'EQUITY' },
  { code: '412', name: 'Chênh lệch đánh giá lại tài sản', category: 'EQUITY' },
  { code: '413', name: 'Chênh lệch tỷ giá hối đoái', category: 'EQUITY' },
  { code: '414', name: 'Quỹ đầu tư phát triển', category: 'EQUITY' },
  { code: '418', name: 'Các quỹ khác thuộc vốn chủ sở hữu', category: 'EQUITY' },
  { code: '419', name: 'Cổ phiếu mua lại của chính mình', category: 'EQUITY' },
  { code: '421', name: 'Lợi nhuận sau thuế chưa phân phối', category: 'EQUITY' },

  // DOANH THU (ĐẦU 5, 7)
  { code: '511', name: 'Doanh thu bán hàng và cung cấp dịch vụ', category: 'REVENUE' },
  { code: '515', name: 'Doanh thu hoạt động tài chính', category: 'REVENUE' },
  { code: '521', name: 'Các khoản giảm trừ doanh thu', category: 'REVENUE' },
  { code: '711', name: 'Thu nhập khác', category: 'REVENUE' },

  // CHI PHÍ (ĐẦU 6, 8)
  { code: '621', name: 'Chi phí nguyên liệu, vật liệu trực tiếp', category: 'EXPENSE' },
  { code: '622', name: 'Chi phí nhân công trực tiếp', category: 'EXPENSE' },
  { code: '623', name: 'Chi phí sử dụng máy thi công', category: 'EXPENSE' },
  { code: '627', name: 'Chi phí sản xuất chung', category: 'EXPENSE' },
  { code: '632', name: 'Giá vốn hàng bán', category: 'EXPENSE' },
  { code: '635', name: 'Chi phí tài chính', category: 'EXPENSE' },
  { code: '641', name: 'Chi phí bán hàng', category: 'EXPENSE' },
  { code: '642', name: 'Chi phí quản lý doanh nghiệp', category: 'EXPENSE' },
  { code: '811', name: 'Chi phí khác', category: 'EXPENSE' },
  { code: '821', name: 'Chi phí thuế thu nhập doanh nghiệp', category: 'EXPENSE' },

  // XÁC ĐỊNH KẾT QUẢ
  { code: '911', name: 'Xác định kết quả kinh doanh', category: 'EQUITY' },
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

export const MOCK_LEGAL_DOCUMENTS: LegalDocument[] = [];
