
import { Account, CompanyInfo, Partner, Product, Transaction, TransactionType, LegalDocument, BankAccount, Project, Currency, Unit, VoucherType, Warehouse, ExpenseItem, Job } from './types';

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
  { code: '2411', name: 'Mua sắm TSCĐ', category: 'ASSET' },
  { code: '2412', name: 'Xây dựng cơ bản', category: 'ASSET' },
  { code: '2413', name: 'Sửa chữa lớn TSCĐ', category: 'ASSET' },
  { code: '2414', name: 'Nâng cấp TSCĐ', category: 'ASSET' },
  { code: '242', name: 'Chi phí chờ phân bổ', category: 'ASSET' },
  { code: '243', name: 'Tài sản thuế thu nhập hoãn lại', category: 'ASSET' },
  { code: '244', name: 'Ký quỹ, ký cược', category: 'ASSET' },

  // NỢ PHẢI TRẢ (ĐẦU 3)
  { code: '331', name: 'Phải trả cho người bán', category: 'LIABILITY' },
  { code: '332', name: 'Phải trả cổ tức, lợi nhuận', category: 'LIABILITY' },
  { code: '333', name: 'Thuế và các khoản phải nộp Nhà nước', category: 'LIABILITY' },
  { code: '3331', name: 'Thuế giá trị gia tăng phải nộp', category: 'LIABILITY' },
  { code: '33311', name: 'Thuế GTGT đầu ra', category: 'LIABILITY' },
  { code: '33312', name: 'Thuế GTGT hàng nhập khẩu', category: 'LIABILITY' },
  { code: '3332', name: 'Thuế tiêu thụ đặc biệt', category: 'LIABILITY' },
  { code: '3333', name: 'Thuế xuất, nhập khẩu', category: 'LIABILITY' },
  { code: '3334', name: 'Thuế thu nhập doanh nghiệp', category: 'LIABILITY' },
  { code: '3335', name: 'Thuế thu nhập cá nhân', category: 'LIABILITY' },
  { code: '3336', name: 'Thuế tài nguyên', category: 'LIABILITY' },
  { code: '3337', name: 'Thuế nhà đất, tiền thuê đất', category: 'LIABILITY' },
  { code: '3338', name: 'Thuế bảo vệ môi trường và các loại thuế khác', category: 'LIABILITY' },
  { code: '3339', name: 'Phí, lệ phí và các khoản phải nộp khác', category: 'LIABILITY' },
  { code: '334', name: 'Phải trả người lao động', category: 'LIABILITY' },
  { code: '335', name: 'Chi phí phải trả', category: 'LIABILITY' },
  { code: '336', name: 'Phải trả nội bộ', category: 'LIABILITY' },
  { code: '337', name: 'Thanh toán theo tiến độ hợp đồng xây dựng', category: 'LIABILITY' },
  { code: '338', name: 'Phải trả, phải nộp khác', category: 'LIABILITY' },
  { code: '3381', name: 'Tài sản thừa chờ giải quyết', category: 'LIABILITY' },
  { code: '3382', name: 'Kinh phí công đoàn', category: 'LIABILITY' },
  { code: '3383', name: 'Bảo hiểm xã hội', category: 'LIABILITY' },
  { code: '3384', name: 'Bảo hiểm y tế', category: 'LIABILITY' },
  { code: '3386', name: 'Bảo hiểm thất nghiệp', category: 'LIABILITY' },
  { code: '3387', name: 'Doanh thu chưa thực hiện', category: 'LIABILITY' },
  { code: '3388', name: 'Phải trả, phải nộp khác', category: 'LIABILITY' },
  { code: '341', name: 'Vay và nợ thuê tài chính', category: 'LIABILITY' },
  { code: '3411', name: 'Các khoản đi vay', category: 'LIABILITY' },
  { code: '3412', name: 'Nợ thuê tài chính', category: 'LIABILITY' },
  { code: '343', name: 'Trái phiếu phát hành', category: 'LIABILITY' },
  { code: '344', name: 'Nhận ký quỹ, ký cược', category: 'LIABILITY' },
  { code: '347', name: 'Thuế thu nhập hoãn lại phải trả', category: 'LIABILITY' },
  { code: '352', name: 'Dự phòng phải trả', category: 'LIABILITY' },
  { code: '353', name: 'Quỹ khen thưởng, phúc lợi', category: 'LIABILITY' },
  { code: '356', name: 'Quỹ phát triển khoa học và công nghệ', category: 'LIABILITY' },
  { code: '357', name: 'Quỹ bình ổn giá', category: 'LIABILITY' },

  // VỐN CHỦ SỞ HỮU (ĐẦU 4)
  { code: '411', name: 'Vốn đầu tư của chủ sở hữu', category: 'EQUITY' },
  { code: '4111', name: 'Vốn góp của chủ sở hữu', category: 'EQUITY' },
  { code: '4112', name: 'Thặng dư vốn', category: 'EQUITY' },
  { code: '4113', name: 'Quyền chọn chuyển đổi trái phiếu', category: 'EQUITY' },
  { code: '4118', name: 'Vốn khác', category: 'EQUITY' },
  { code: '412', name: 'Chênh lệch đánh giá lại tài sản', category: 'EQUITY' },
  { code: '413', name: 'Chênh lệch tỷ giá hối đoái', category: 'EQUITY' },
  { code: '414', name: 'Quỹ đầu tư phát triển', category: 'EQUITY' },
  { code: '418', name: 'Các quỹ khác thuộc vốn chủ sở hữu', category: 'EQUITY' },
  { code: '419', name: 'Cổ phiếu mua lại của chính mình', category: 'EQUITY' },
  { code: '421', name: 'Lợi nhuận sau thuế chưa phân phối', category: 'EQUITY' },
  { code: '4211', name: 'Lợi nhuận sau thuế chưa phân phối năm trước', category: 'EQUITY' },
  { code: '4212', name: 'Lợi nhuận sau thuế chưa phân phối năm nay', category: 'EQUITY' },

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
  { code: '6271', name: 'Chi phí nhân viên phân xưởng', category: 'EXPENSE' },
  { code: '6272', name: 'Chi phí vật liệu', category: 'EXPENSE' },
  { code: '6273', name: 'Chi phí dụng cụ sản xuất', category: 'EXPENSE' },
  { code: '6274', name: 'Chi phí khấu hao TSCĐ', category: 'EXPENSE' },
  { code: '6277', name: 'Chi phí dịch vụ mua ngoài', category: 'EXPENSE' },
  { code: '6278', name: 'Chi phí bằng tiền khác', category: 'EXPENSE' },
  { code: '632', name: 'Giá vốn hàng bán', category: 'EXPENSE' },
  { code: '635', name: 'Chi phí tài chính', category: 'EXPENSE' },
  { code: '641', name: 'Chi phí bán hàng', category: 'EXPENSE' },
  { code: '642', name: 'Chi phí quản lý doanh nghiệp', category: 'EXPENSE' },
  { code: '6421', name: 'Chi phí nhân viên quản lý', category: 'EXPENSE' },
  { code: '6422', name: 'Chi phí vật liệu quản lý', category: 'EXPENSE' },
  { code: '6423', name: 'Chi phí đồ dùng văn phòng', category: 'EXPENSE' },
  { code: '6424', name: 'Chi phí khấu hao TSCĐ', category: 'EXPENSE' },
  { code: '6425', name: 'Thuế, phí và lệ phí', category: 'EXPENSE' },
  { code: '6427', name: 'Chi phí dịch vụ mua ngoài', category: 'EXPENSE' },
  { code: '6428', name: 'Chi phí bằng tiền khác', category: 'EXPENSE' },
  { code: '811', name: 'Chi phí khác', category: 'EXPENSE' },
  { code: '821', name: 'Chi phí thuế thu nhập doanh nghiệp', category: 'EXPENSE' },

  // XÁC ĐỊNH KẾT QUẢ
  { code: '911', name: 'Xác định kết quả kinh doanh', category: 'EQUITY' },
];

export const MOCK_PARTNERS: Partner[] = [
  { id: '1', code: 'KH001', name: 'Công ty TNHH ABC', type: 'CUSTOMER', taxCode: '030111222', address: 'Số 1 Đại Cồ Việt, Hà Nội', phone: '0901222333', contactPerson: 'Chị Lan - Kế toán' },
  { id: '2', code: 'NCC001', name: 'Công ty Máy tính XYZ', type: 'SUPPLIER', taxCode: '030333444', address: '45 Lê Duẩn, Đà Nẵng', phone: '0909888777', contactPerson: 'Anh Hùng - Sales' },
  { id: '3', code: 'NV001', name: 'Trần Thị B', type: 'EMPLOYEE', address: '123 Nguyễn Trãi, TP.HCM', phone: '0912345678', contactPerson: 'Người thân: Nguyễn Văn C (0987...)' },
];

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', code: 'LAP01', name: 'Laptop Dell XPS 13', unit: 'Cái', price: 25000000, stock: 10 },
  { id: '2', code: 'MAC01', name: 'MacBook Pro M1', unit: 'Cái', price: 30000000, stock: 5 },
  { id: '3', code: 'MOUSE01', name: 'Chuột Logitech MX', unit: 'Cái', price: 1500000, stock: 50 },
];

export const MOCK_BANK_ACCOUNTS: BankAccount[] = [
    { id: '1', accountNumber: '1903456789', bankName: 'Techcombank', branch: 'Hội Sở', address: '191 Bà Triệu, Hai Bà Trưng, Hà Nội', currency: 'VND', accountHolder: 'CÔNG TY TƯƠNG LAI', phoneNumber: '1800588822', contactPerson: 'GDV Nguyễn Thị A' },
    { id: '2', accountNumber: '001100223344', bankName: 'Vietcombank', branch: 'Hoàn Kiếm', address: '198 Trần Quang Khải, Hoàn Kiếm, Hà Nội', currency: 'USD', accountHolder: 'CÔNG TY TƯƠNG LAI', phoneNumber: '1900545413', contactPerson: 'GDV Trần Văn B' }
];

export const MOCK_PROJECTS: Project[] = [
    { id: '1', code: 'CT001', name: 'Xây dựng nhà máy Bắc Ninh', value: 5000000000, status: 'ACTIVE', startDate: '2023-01-01' },
    { id: '2', code: 'CT002', name: 'Cải tạo văn phòng Hà Nội', value: 200000000, status: 'COMPLETED', startDate: '2023-05-01' }
];

export const MOCK_JOBS: Job[] = [
    { id: '1', code: 'VV001', name: 'Quyết toán thuế 2023', status: 'ACTIVE' },
    { id: '2', code: 'VV002', name: 'Kiểm kê kho cuối năm', status: 'PENDING' }
];

export const MOCK_TRANSACTIONS: Transaction[] = [];

export const MOCK_LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    id: 'doc-99-2025-full',
    number: '99/2025/TT-BTC',
    name: 'Thông tư Hướng dẫn Chế độ kế toán doanh nghiệp',
    type: 'Thông tư',
    issueDate: '2025-10-27',
    effectiveDate: '2026-01-01',
    issuingAuthority: 'Bộ Tài chính',
    status: 'ACTIVE',
    fileName: 'Thong_tu_99_2025_TT_BTC.pdf',
    content: `
BỘ TÀI CHÍNH
Số: 99/2025/TT-BTC
CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc
Hà Nội, ngày 27 tháng 10 năm 2025

THÔNG TƯ
Hướng dẫn Chế độ kế toán doanh nghiệp

Căn cứ Luật Kế toán ngày 20 tháng 11 năm 2015;
Căn cứ Luật sửa đổi, bổ sung một số điều của Luật Chứng khoán, Luật Kế toán, Luật Kiểm toán độc lập, Luật Ngân sách nhà nước, Luật Quản lý, sử dụng tài sản công, Luật Quản lý thuế, Luật Thuế thu nhập cá nhân, Luật Dự trữ quốc gia, Luật Xử lý vi phạm hành chính ngày 29 tháng 11 năm 2024;
Căn cứ Nghị định số 29/2025/NĐ-CP ngày 24 tháng 02 năm 2025 của Chính phủ quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Bộ Tài chính;
Căn cứ Nghị định số 166/2025/NĐ-CP ngày 30 tháng 06 năm 2025 của Chính phủ về sửa đổi, bổ sung một số điều của Nghị định số 29/2025/NĐ-CP ngày 24 tháng 02 năm 2025 của Chính phủ quy định chức năng, nhiệm vụ, quyền hạn và cơ cấu tổ chức của Bộ Tài chính;
Theo đề nghị của Cục trưởng Cục Quản lý, giám sát kế toán, kiểm toán;
Bộ trưởng Bộ Tài chính ban hành Thông tư hướng dẫn Chế độ kế toán doanh nghiệp.

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
3. Trường hợp căn cứ vào các yếu tố tại khoản 2 Điều này mà doanh nghiệp chưa xác định được đơn vị tiền tệ trong kế toán thì các yếu tố sau đây cũng được xem xét để làm căn cứ xác định đơn vị tiền tệ trong kế toán của doanh nghiệp:
a) Đơn vị tiền tệ sử dụng để huy động các nguồn lực tài chính (đơn vị tiền tệ sử dụng khi phát hành công cụ nợ, công cụ vốn,...);
b) Đơn vị tiền tệ thường xuyên thu được từ các hoạt động kinh doanh và được sử dụng để tích trữ.
4. Đơn vị tiền tệ trong kế toán phản ánh các giao dịch, sự kiện, điều kiện liên quan đến hoạt động của doanh nghiệp. Sau khi xác định được đơn vị tiền tệ trong kế toán thì doanh nghiệp không được thay đổi, trừ khi có sự thay đổi lớn về hoạt động quản lý và kinh doanh dẫn đến thay đổi trọng yếu trong các giao dịch, sự kiện và điều kiện đó.

Điều 5. Thay đổi đơn vị tiền tệ trong kế toán
1. Nguyên tắc khi thay đổi đơn vị tiền tệ trong kế toán
Khi có sự thay đổi lớn về hoạt động quản lý và kinh doanh dẫn đến đơn vị tiền tệ trong kế toán mà doanh nghiệp sử dụng không còn thoả mãn các yếu tố nêu tại khoản 2, 3, 4 Điều 4 Thông tư này thì doanh nghiệp được thay đổi đơn vị tiền tệ trong kế toán và việc thay đổi này chỉ được thực hiện tại thời điểm bắt đầu niên độ kế toán mới.
2. Nguyên tắc lập Báo cáo tài chính khi thay đổi đơn vị tiền tệ trong kế toán
a) Tại kỳ kế toán đầu tiên kể từ khi thay đổi, doanh nghiệp thực hiện chuyển đổi số dư các khoản mục trên sổ kế toán và Báo cáo tình hình tài chính sang đơn vị tiền tệ trong kế toán mới theo tỷ giá mua bán chuyển khoản trung bình (là trung bình cộng giữa tỷ giá mua chuyển khoản và tỷ giá bán chuyển khoản) của ngân hàng thương mại nơi doanh nghiệp thường xuyên có giao dịch (là ngân hàng thương mại mà doanh nghiệp có tần suất hoặc giá trị giao dịch nhiều hơn so với bên khác) tại ngày thay đổi đơn vị tiền tệ trong kế toán.
b) Đối với thông tin so sánh (cột kỳ trước) trên Báo cáo kết quả hoạt động kinh doanh và Báo cáo lưu chuyển tiền tệ, doanh nghiệp áp dụng tỷ giá mua bán chuyển khoản trung bình của ngân hàng thương mại nơi doanh nghiệp thường xuyên có giao dịch của kỳ trước liền kề với kỳ thay đổi.
c) Doanh nghiệp phải trình bày trên Bản thuyết minh Báo cáo tài chính lý do thay đổi đơn vị tiền tệ trong kế toán và khi có những ảnh hưởng đối với Báo cáo tài chính do việc thay đổi đơn vị tiền tệ trong kế toán.

Điều 31. Hiệu lực thi hành
1. Thông tư này có hiệu lực thi hành kể từ ngày 01/01/2026 và áp dụng cho năm tài chính bắt đầu từ hoặc sau ngày 01/01/2026.
...

Phụ lục II
HỆ THỐNG TÀI KHOẢN KẾ TOÁN DOANH NGHIỆP 
(Kèm theo Thông tư số 99/2025/TT-BTC ngày 27 tháng 10 năm 2025 của Bộ trưởng Bộ Tài chính) 

A - DANH MỤC TÀI KHOẢN KẾ TOÁN
LOẠI TÀI KHOẢN TÀI SẢN: 111, 112, 113, 121, 128, 131, 133, 136, 138, 141, 151, 152, 153, 154, 155, 156, 157, 158, 171, 211, 212, 213, 214, 215, 217, 221, 222, 228, 229, 241, 242, 243, 244.
LOẠI TÀI KHOẢN NỢ PHẢI TRẢ: 331, 332, 333, 334, 335, 336, 337, 338, 341, 343, 344, 347, 352, 353, 356, 357.
LOẠI TÀI KHOẢN VỐN CHỦ SỞ HỮU: 411, 412, 413, 414, 418, 419, 421.
LOẠI TÀI KHOẢN DOANH THU: 511, 515, 521.
LOẠI TÀI KHOẢN CHI PHÍ SẢN XUẤT, KINH DOANH: 621, 622, 623, 627, 632, 635, 641, 642.
LOẠI TÀI KHOẢN THU NHẬP KHÁC: 711.
LOẠI TÀI KHOẢN CHI PHÍ KHÁC: 811, 821.
TÀI KHOẢN XÁC ĐỊNH KẾT QUẢ KINH DOANH: 911.
`
  }
];

export const MOCK_CURRENCIES: Currency[] = [
  { id: '1', code: 'VND', name: 'Việt Nam Đồng', exchangeRate: 1, isDefault: true },
  { id: '2', code: 'USD', name: 'Đô la Mỹ', exchangeRate: 24500, isDefault: false }
];

export const MOCK_UNITS: Unit[] = [
  { id: '1', code: 'CAI', name: 'Cái' },
  { id: '2', code: 'KG', name: 'Kilogam' },
  { id: '3', code: 'M', name: 'Mét' }
];

export const MOCK_VOUCHER_TYPES: VoucherType[] = [
  { id: '1', code: 'PT', name: 'Phiếu Thu', template: 'Mau-01-TT' },
  { id: '2', code: 'PC', name: 'Phiếu Chi', template: 'Mau-02-TT' },
  { id: '3', code: 'BN', name: 'Báo Nợ', template: 'Mau-03-TT' },
  { id: '4', code: 'BC', name: 'Báo Có', template: 'Mau-04-TT' },
  { id: '5', code: 'PK', name: 'Phiếu Kế toán', template: 'Mau-05-TT' }
];

export const MOCK_WAREHOUSES: Warehouse[] = [
  { id: '1', code: 'KHO1', name: 'Kho Nguyên liệu', address: 'Khu CN Tân Bình' },
  { id: '2', code: 'KHO2', name: 'Kho Thành phẩm', address: 'Khu CN Tân Bình' }
];

export const MOCK_EXPENSE_ITEMS: ExpenseItem[] = [
  { id: '1', code: 'CP01', name: 'Chi phí lương', group: 'ADMIN' },
  { id: '2', code: 'CP02', name: 'Chi phí điện nước', group: 'MANUFACTURING' },
  { id: '3', code: 'CP03', name: 'Chi phí tiếp khách', group: 'SELLING' }
];
