

import { Account, CompanyInfo, Partner, Product, Transaction, TransactionType, LegalDocument, BankAccount, Project, Currency, Unit, VoucherType, Warehouse, ExpenseItem } from './types';

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

export const MOCK_BANK_ACCOUNTS: BankAccount[] = [
    { id: '1', accountNumber: '1903456789', bankName: 'Techcombank', branch: 'Hội Sở', currency: 'VND', accountHolder: 'CÔNG TY TƯƠNG LAI' },
    { id: '2', accountNumber: '001100223344', bankName: 'Vietcombank', branch: 'Hoàn Kiếm', currency: 'USD', accountHolder: 'CÔNG TY TƯƠNG LAI' }
];

export const MOCK_PROJECTS: Project[] = [
    { id: '1', code: 'CT001', name: 'Xây dựng nhà máy Bắc Ninh', value: 5000000000, status: 'ACTIVE', startDate: '2023-01-01' },
    { id: '2', code: 'CT002', name: 'Cải tạo văn phòng Hà Nội', value: 200000000, status: 'COMPLETED', startDate: '2023-05-01' }
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

export const MOCK_LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    id: 'doc-99-2025',
    number: '99/2025/TT-BTC',
    name: 'Hướng dẫn Chế độ kế toán doanh nghiệp',
    type: 'Thông tư',
    issueDate: '2025-10-27',
    effectiveDate: '2026-01-01',
    issuingAuthority: 'Bộ Tài chính',
    status: 'ACTIVE',
    fileName: '99_2025_TT_BTC.pdf',
    content: `BỘ TÀI CHÍNH
CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc

Số: 99/2025/TT-BTC
Hà Nội, ngày 27 tháng 10 năm 2025

THÔNG TƯ
Hướng dẫn Chế độ kế toán doanh nghiệp

Chương I
QUY ĐỊNH CHUNG

Điều 1. Phạm vi điều chỉnh
Thông tư này hướng dẫn về chứng từ kế toán, tài khoản kế toán, ghi sổ kế toán, lập và trình bày Báo cáo tài chính của doanh nghiệp. Việc xác định nghĩa vụ thuế của doanh nghiệp đối với Ngân sách nhà nước được thực hiện theo quy định của pháp luật về thuế.

Điều 2. Đối tượng áp dụng
1. Thông tư này hướng dẫn kế toán áp dụng cho các doanh nghiệp thuộc mọi lĩnh vực, mọi thành phần kinh tế.
2. Các tổ chức tín dụng, chi nhánh ngân hàng nước ngoài thực hiện chế độ kế toán hoặc văn bản quy phạm pháp luật về kế toán theo hướng dẫn của Ngân hàng Nhà nước Việt Nam.

Điều 3. Công tác quản trị và kiểm soát nội bộ
1. Việc tạo lập, thực hiện, quản lý và kiểm soát các giao dịch kinh tế phát sinh của doanh nghiệp phải tuân thủ quy định của pháp luật, cơ chế chính sách có liên quan.
2. Doanh nghiệp có trách nhiệm tự xây dựng quy chế quản trị nội bộ (hoặc các tài liệu tương đương) và tổ chức kiểm soát nội bộ nhằm phân định rõ quyền, nghĩa vụ và trách nhiệm của các bộ phận và cá nhân có liên quan đến việc tạo lập, thực hiện, quản lý và kiểm soát các giao dịch kinh tế phát sinh tại doanh nghiệp, đảm bảo tuân thủ các quy định của pháp luật doanh nghiệp và pháp luật có liên quan.

Điều 4. Đơn vị tiền tệ trong kế toán
1. “Đơn vị tiền tệ trong kế toán” là Đồng Việt Nam (ký hiệu quốc gia là “đ”; ký hiệu quốc tế là “VND”) được dùng để ghi sổ kế toán, lập và trình bày Báo cáo tài chính của doanh nghiệp. Trường hợp doanh nghiệp chủ yếu thu, chi bằng ngoại tệ, đáp ứng được các yếu tố quy định tại khoản 2, 3, 4 Điều này thì được chọn một loại ngoại tệ làm đơn vị tiền tệ trong kế toán để ghi sổ kế toán và chịu trách nhiệm về lựa chọn đó trước pháp luật.
2. Doanh nghiệp căn cứ vào các yếu tố sau đây để xác định đơn vị tiền tệ trong kế toán:
a) Đơn vị tiền tệ mà ảnh hưởng chính đến giá bán hàng hoá, dịch vụ và thường là đơn vị tiền tệ dùng để niêm yết giá bán hàng hóa, dịch vụ và thanh toán;
b) Đơn vị tiền tệ mà ảnh hưởng chính đến chi phí nhân công, chi phí nguyên vật liệu, chi phí sản xuất, kinh doanh khác và thường là đơn vị tiền tệ dùng để thanh toán cho các chi phí đó.

Điều 5. Thay đổi đơn vị tiền tệ trong kế toán
1. Nguyên tắc khi thay đổi đơn vị tiền tệ trong kế toán
Khi có sự thay đổi lớn về hoạt động quản lý và kinh doanh dẫn đến đơn vị tiền tệ trong kế toán mà doanh nghiệp sử dụng không còn thoả mãn các yếu tố nêu tại khoản 2, 3, 4 Điều 4 Thông tư này thì doanh nghiệp được thay đổi đơn vị tiền tệ trong kế toán và việc thay đổi này chỉ được thực hiện tại thời điểm bắt đầu niên độ kế toán mới.

Điều 6. Công tác kế toán khi doanh nghiệp lựa chọn đơn vị tiền tệ trong kế toán không phải là Đồng Việt Nam
1. Báo cáo tài chính mang tính pháp lý để doanh nghiệp công bố ra công chúng và nộp cho các cơ quan có thẩm quyền tại Việt Nam là Báo cáo tài chính được trình bày bằng Đồng Việt Nam.

Chương II
CHỨNG TỪ KẾ TOÁN

Điều 8. Quy định chung về chứng từ kế toán
Chứng từ kế toán của doanh nghiệp phải được thực hiện theo đúng quy định của Luật Kế toán, các văn bản hướng dẫn Luật Kế toán và các văn bản sửa đổi, bổ sung hoặc thay thế.

Điều 9. Hệ thống biểu mẫu chứng từ kế toán
1. Doanh nghiệp tham khảo để áp dụng biểu mẫu hệ thống chứng từ kế toán tại Phụ lục I ban hành kèm theo Thông tư này.
2. Trường hợp để phù hợp với đặc điểm hoạt động sản xuất kinh doanh và yêu cầu quản lý, doanh nghiệp được thiết kế thêm hoặc sửa đổi, bổ sung biểu mẫu chứng từ kế toán so với biểu mẫu hướng dẫn.

Chương III
TÀI KHOẢN KẾ TOÁN

Điều 11. Hệ thống tài khoản kế toán
1. Doanh nghiệp áp dụng hệ thống tài khoản kế toán tại Phụ lục II ban hành kèm theo Thông tư này để phục vụ việc ghi sổ kế toán các giao dịch kinh tế phát sinh tại doanh nghiệp.
2. Trường hợp để phù hợp với đặc điểm hoạt động sản xuất, kinh doanh và yêu cầu quản lý của đơn vị, doanh nghiệp được sửa đổi, bổ sung về tên, số hiệu, kết cấu và nội dung phản ánh của các tài khoản kế toán.

Chương IV
SỔ KẾ TOÁN

Điều 12. Sổ kế toán
1. Sổ kế toán của doanh nghiệp phải được thực hiện theo đúng quy định của Luật Kế toán, các văn bản hướng dẫn Luật Kế toán.
2. Doanh nghiệp tham khảo để áp dụng biểu mẫu sổ kế toán tại Phụ lục III ban hành kèm theo Thông tư này.

Điều 13. Mở sổ, ghi sổ và khóa sổ kế toán
1. Mở sổ: Sổ kế toán phải được mở vào đầu kỳ kế toán năm. Đối với doanh nghiệp mới thành lập, sổ kế toán phải được mở từ ngày thành lập.
2. Ghi sổ: Doanh nghiệp phải căn cứ vào chứng từ kế toán để ghi sổ kế toán theo quy định.

Chương V
BÁO CÁO TÀI CHÍNH

Điều 14. Mục đích của Báo cáo tài chính
1. Báo cáo tài chính dùng để cung cấp thông tin về tình hình tài chính, kết quả kinh doanh và các luồng tiền của doanh nghiệp, đáp ứng yêu cầu quản lý của chủ sở hữu doanh nghiệp, cơ quan có thẩm quyền và nhu cầu của người sử dụng.

Điều 17. Hệ thống Báo cáo tài chính của doanh nghiệp
1. Hệ thống Báo cáo tài chính gồm:
- Báo cáo tình hình tài chính;
- Báo cáo kết quả hoạt động kinh doanh;
- Báo cáo lưu chuyển tiền tệ;
- Bản thuyết minh Báo cáo tài chính;

2. Báo cáo tài chính năm:
- Mẫu số B 01 - DN
- Mẫu số B 02 - DN
- Mẫu số B 03 - DN
- Mẫu số B 09 - DN

Chương VI
TỔ CHỨC THỰC HIỆN

Điều 28. Quy định về sử dụng phần mềm kế toán
1. Doanh nghiệp có thể sử dụng các phần mềm kế toán để thực hiện công tác kế toán theo quy định.

Điều 31. Điều khoản thi hành
1. Thông tư này có hiệu lực thi hành kể từ ngày 01/01/2026 và áp dụng cho năm tài chính bắt đầu từ hoặc sau ngày 01/01/2026. Thông tư này thay thế cho các Thông tư số 200/2014/TT-BTC ngày 22/12/2014, Thông tư số 53/2016/TT-BTC...

Ký bởi: BỘ TÀI CHÍNH
`
  }
];

export const MOCK_CURRENCIES: Currency[] = [
  { id: '1', code: 'VND', name: 'Việt Nam Đồng', exchangeRate: 1, isDefault: true },
  { id: '2', code: 'USD', name: 'Đô la Mỹ', exchangeRate: 24500, isDefault: false },
];

export const MOCK_UNITS: Unit[] = [
  { id: '1', code: 'CAI', name: 'Cái' },
  { id: '2', code: 'KG', name: 'Kilogam' },
  { id: '3', code: 'M', name: 'Mét' },
  { id: '4', code: 'BO', name: 'Bộ' },
];

export const MOCK_VOUCHER_TYPES: VoucherType[] = [
  { id: '1', code: 'PT', name: 'Phiếu thu', template: 'Mẫu 01-TT' },
  { id: '2', code: 'PC', name: 'Phiếu chi', template: 'Mẫu 02-TT' },
  { id: '3', code: 'PN', name: 'Phiếu nhập kho', template: 'Mẫu 01-VT' },
  { id: '4', code: 'PX', name: 'Phiếu xuất kho', template: 'Mẫu 02-VT' },
];

export const MOCK_WAREHOUSES: Warehouse[] = [
  { id: '1', code: 'KHO01', name: 'Kho chính', address: 'Tầng 1, Tòa nhà Innovation' },
  { id: '2', code: 'KHO02', name: 'Kho phụ', address: 'Bình Dương' },
];

export const MOCK_EXPENSE_ITEMS: ExpenseItem[] = [
  { id: '1', code: 'CP-BH', name: 'Chi phí bán hàng', group: 'SELLING' },
  { id: '2', code: 'CP-QL', name: 'Chi phí quản lý doanh nghiệp', group: 'ADMIN' },
  { id: '3', code: 'CP-SX', name: 'Chi phí sản xuất', group: 'MANUFACTURING' },
];
