
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { DataContextType, TransactionType } from "../types";

// System Instruction defining the persona and behavior
const SYSTEM_INSTRUCTION = `
Bạn là Trợ lý Kế toán Ảo chuyên nghiệp của Anh Cường.
Nhiệm vụ: Hỗ trợ quản lý tài chính, nhập liệu, phân tích số liệu và quản lý danh mục.

QUYỀN TRUY CẬP DỮ LIỆU & HỌC TẬP:
*   Bạn có quyền truy cập TOÀN BỘ dữ liệu trong hệ thống thông qua công cụ \`get_database_data\`, bao gồm:
    1.  **Giao dịch (transactions)**: Lịch sử thu chi, mua bán.
    2.  **Đối tác (partners)**: Khách hàng, Nhà cung cấp, Nhân viên.
    3.  **Hàng hóa (products)**: Danh sách vật tư, tồn kho, giá cả.
    4.  **Tài khoản (accounts)**: Hệ thống tài khoản kế toán.
    5.  **Văn bản pháp luật (legal_documents)**: Các thông tư, nghị định đã được lưu để tham chiếu.
    6.  **Thông tin công ty (company_info)**: Tên, địa chỉ, MST, giám đốc.
*   Khi người dùng hỏi về bất kỳ thông tin nào (ví dụ: "Quy định về hóa đơn hiện tại thế nào?", "Tình hình kinh doanh tháng này ra sao?"), hãy CHỦ ĐỘNG gọi tool \`get_database_data\` để lấy dữ liệu mới nhất, đọc hiểu và trả lời.

QUY TRÌNH LÀM VIỆC (TUÂN THỦ TUYỆT ĐỐI):
1.  **Tiếp nhận & Kiểm tra**:
    *   Luôn kiểm tra dữ liệu hiện có trước khi thực hiện hành động (Thêm/Sửa/Xóa).
    *   Ví dụ: Muốn xóa khách hàng, phải tìm ID của họ trước.
2.  **Tuân thủ Pháp luật**:
    *   Khi tư vấn nghiệp vụ, hãy lấy dữ liệu \`legal_documents\` để đối chiếu.
3.  **Thực thi**:
    *   Chỉ gọi các tool thay đổi dữ liệu (\`create_transaction\`, \`manage_partner\`...) khi người dùng đã xác nhận.

CÁC CÔNG CỤ (TOOLS):
*   \`get_database_data\`: Cổng truy xuất dữ liệu vạn năng.
*   \`create_transaction\`, \`delete_transaction\`, \`manage_partner\`, \`manage_product\`, \`manage_account\`, \`update_company_info\`: Các công cụ tác nghiệp.

Lưu ý giao tiếp:
- Luôn xưng "Em", gọi "Anh Cường".
- Trả lời dựa trên dữ liệu thực tế (Fact-based).
`;

// Tool Definitions
const tools: FunctionDeclaration[] = [
  {
    name: "create_transaction",
    description: "Tạo mới một giao dịch tài chính hoặc chứng từ kế toán.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        type: { type: Type.STRING, description: "Loại: RECEIPT(Thu), PAYMENT(Chi), SALES(Bán), PURCHASE(Mua), SALARY(Lương)" },
        date: { type: Type.STRING, description: "Ngày YYYY-MM-DD" },
        amount: { type: Type.NUMBER, description: "Tổng số tiền VNĐ" },
        description: { type: Type.STRING, description: "Nội dung diễn giải chi tiết" },
        partnerName: { type: Type.STRING, description: "Tên đối tượng (KH, NCC, NV) liên quan" }
      },
      required: ["type", "amount", "description"]
    }
  },
  {
    name: "delete_transaction",
    description: "Xóa một giao dịch/chứng từ khỏi hệ thống.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.STRING, description: "ID của giao dịch cần xóa" }
      },
      required: ["id"]
    }
  },
  {
    name: "manage_partner",
    description: "Quản lý (Thêm/Sửa/Xóa) danh mục Đối tác (Khách hàng/NCC/Nhân viên).",
    parameters: {
      type: Type.OBJECT,
      properties: {
        action: { type: Type.STRING, description: "'create', 'update', hoặc 'delete'" },
        id: { type: Type.STRING, description: "ID đối tác (bắt buộc nếu update/delete)" },
        name: { type: Type.STRING, description: "Tên đối tác" },
        type: { type: Type.STRING, description: "Loại: CUSTOMER, SUPPLIER, EMPLOYEE" },
        phone: { type: Type.STRING, description: "SĐT" },
        address: { type: Type.STRING, description: "Địa chỉ" },
        taxCode: { type: Type.STRING, description: "Mã số thuế" }
      },
      required: ["action"]
    }
  },
  {
    name: "manage_product",
    description: "Quản lý (Thêm/Sửa/Xóa) danh mục Vật tư hàng hóa.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        action: { type: Type.STRING, description: "'create', 'update', hoặc 'delete'" },
        id: { type: Type.STRING, description: "ID sản phẩm (bắt buộc nếu update/delete)" },
        code: { type: Type.STRING, description: "Mã sản phẩm" },
        name: { type: Type.STRING, description: "Tên sản phẩm" },
        unit: { type: Type.STRING, description: "Đơn vị tính" },
        price: { type: Type.NUMBER, description: "Đơn giá" },
        stock: { type: Type.NUMBER, description: "Số lượng tồn đầu" }
      },
      required: ["action"]
    }
  },
  {
    name: "manage_account",
    description: "Quản lý (Thêm/Sửa/Xóa) hệ thống Tài khoản kế toán.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        action: { type: Type.STRING, description: "'create', 'update', hoặc 'delete'" },
        code: { type: Type.STRING, description: "Số Tài khoản (VD: 111, 131). Nếu xóa, dùng mã này để xác định." },
        name: { type: Type.STRING, description: "Tên tài khoản" },
        category: { type: Type.STRING, description: "Tính chất: ASSET, LIABILITY, EQUITY, REVENUE, EXPENSE" }
      },
      required: ["action", "code"]
    }
  },
  {
    name: "update_company_info",
    description: "Cập nhật thông tin của doanh nghiệp.",
    parameters: {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING, description: "Tên công ty" },
        director: { type: Type.STRING, description: "Tên giám đốc" },
        address: { type: Type.STRING, description: "Địa chỉ" },
        phone: { type: Type.STRING, description: "Số điện thoại liên hệ" },
        taxCode: { type: Type.STRING, description: "Mã số thuế" }
      }
    }
  },
  {
      name: "get_database_data",
      description: "Lấy dữ liệu từ hệ thống để học hỏi, tra cứu hoặc báo cáo. Truy cập được TẤT CẢ các bảng.",
      parameters: {
          type: Type.OBJECT,
          properties: {
            entity: { 
              type: Type.STRING, 
              description: "Loại dữ liệu cần lấy: 'transactions', 'partners', 'products', 'accounts', 'legal_documents', 'company_info'" 
            }
          },
          required: ["entity"]
      }
  }
];

/**
 * Extracts text from a document (PDF/DOC) using Gemini's multimodal capabilities.
 * This is a standalone helper for the Document Upload feature.
 */
export const extractTextFromDocument = async (base64Data: string, mimeType: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY || '';
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          { inlineData: { mimeType: mimeType, data: base64Data } },
          { text: "Hãy đóng vai một công cụ OCR chuyên nghiệp. Nhiệm vụ của bạn là trích xuất TOÀN BỘ nội dung văn bản từ tài liệu đính kèm này. Hãy giữ nguyên định dạng, câu chữ. Chỉ trả về nội dung văn bản, không được thêm bất kỳ lời dẫn hay nhận xét nào." }
        ]
      }
    });

    return response.text || "";
  } catch (error) {
    console.error("Error extracting text from document:", error);
    throw new Error("Không thể đọc tài liệu. Vui lòng kiểm tra lại file hoặc nhập thủ công.");
  }
};

export class AIController {
  private ai: GoogleGenAI;
  private chatSession: any;
  public dataContext: DataContextType;

  constructor(dataContext: DataContextType) {
    this.dataContext = dataContext;
    const apiKey = process.env.API_KEY || '';
    this.ai = new GoogleGenAI({ apiKey });
    
    this.chatSession = this.ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ functionDeclarations: tools }],
      }
    });
  }

  // Update context to access latest data
  public updateContext(newContext: DataContextType) {
    this.dataContext = newContext;
  }

  async sendMessage(message: string, imageBase64?: string, imageMimeType?: string, audioBase64?: string) {
    try {
      const parts: any[] = [];
      
      if (audioBase64) {
         parts.push({ inlineData: { mimeType: 'audio/wav', data: audioBase64 } });
      }
      
      // Handle image with correct mimeType
      if (imageBase64) {
         parts.push({ inlineData: { mimeType: imageMimeType || 'image/jpeg', data: imageBase64 } });
      }
      
      // Add text part. Important: Do not add role here.
      parts.push({ text: message || " " });

      let response = await this.chatSession.sendMessage({
        message: parts
      });

      // Handle Function Calls Loop
      while (response.functionCalls && response.functionCalls.length > 0) {
        const functionResponses = await Promise.all(
          response.functionCalls.map(async (call: any) => {
            const result = await this.executeFunction(call);
            // Gemini 2.5 requires 'id' to map response to call
            return {
              id: call.id,
              name: call.name,
              response: { result: result }
            };
          })
        );
        
        // Send tool results back to model
        const responseParts = functionResponses.map(resp => ({
            functionResponse: resp
        }));

        response = await this.chatSession.sendMessage({
          message: responseParts
        });
      }

      return response.text;
    } catch (error) {
      console.error("AI Processing Error:", error);
      return `Xin lỗi, em gặp lỗi kỹ thuật: ${JSON.stringify(error)}. Anh thử lại giúp em nhé!`;
    }
  }

  private async executeFunction(call: any): Promise<any> {
    const { name, args } = call;
    console.log(`Executing tool: ${name}`, args);

    try {
      switch (name) {
        case "get_database_data": {
          if (args.entity === 'transactions') return JSON.stringify(this.dataContext.transactions);
          if (args.entity === 'partners') return JSON.stringify(this.dataContext.partners);
          if (args.entity === 'products') return JSON.stringify(this.dataContext.products);
          if (args.entity === 'accounts') return JSON.stringify(this.dataContext.accounts);
          if (args.entity === 'legal_documents') return JSON.stringify(this.dataContext.legalDocuments);
          if (args.entity === 'company_info') return JSON.stringify(this.dataContext.companyInfo);
          return "Entity not found or not supported";
        }

        case "create_transaction": {
          const typeMap: Record<string, TransactionType> = {
              'RECEIPT': TransactionType.RECEIPT,
              'PAYMENT': TransactionType.PAYMENT,
              'SALES': TransactionType.SALES,
              'PURCHASE': TransactionType.PURCHASE,
              'SALARY': TransactionType.SALARY
          };
          
          let pId = undefined;
          if (args.partnerName) {
             const p = this.dataContext.partners.find(p => p.name.toLowerCase().includes(args.partnerName.toLowerCase()));
             if (p) pId = p.id;
          }

          const newTrans = {
              date: args.date || new Date().toISOString().split('T')[0],
              type: typeMap[args.type] || TransactionType.OTHER,
              documentNo: `AUTO-${Math.floor(Math.random()*10000)}`,
              description: args.description,
              totalAmount: Number(args.amount),
              details: [], 
              partnerId: pId
          };
          const tId = this.dataContext.addTransaction(newTrans);
          return `Thành công. ID: ${tId}`;
        }

        case "delete_transaction": {
          this.dataContext.deleteTransaction(args.id);
          return "Đã xóa chứng từ thành công.";
        }

        case "manage_partner": {
          if (args.action === 'create') {
             const id = this.dataContext.addPartner({
               code: `KH${Math.floor(Math.random()*1000)}`,
               name: args.name,
               type: args.type || 'OTHER',
               address: args.address,
               phone: args.phone,
               taxCode: args.taxCode
             });
             return `Đã thêm đối tác. ID: ${id}`;
          } else if (args.action === 'update' && args.id) {
             this.dataContext.updatePartner(args.id, args);
             return "Đã cập nhật thông tin đối tác.";
          } else if (args.action === 'delete' && args.id) {
             this.dataContext.deletePartner(args.id);
             return "Đã xóa đối tác.";
          }
          return "Thiếu ID hoặc hành động không hợp lệ.";
        }

        case "manage_product": {
          if (args.action === 'create') {
             const id = this.dataContext.addProduct({
               code: args.code || `SP${Math.floor(Math.random()*1000)}`,
               name: args.name,
               unit: args.unit || 'Cái',
               price: Number(args.price) || 0,
               stock: Number(args.stock) || 0
             });
             return `Đã thêm sản phẩm. ID: ${id}`;
          } else if (args.action === 'update' && args.id) {
             this.dataContext.updateProduct(args.id, args);
             return "Đã cập nhật sản phẩm.";
          } else if (args.action === 'delete' && args.id) {
             this.dataContext.deleteProduct(args.id);
             return "Đã xóa sản phẩm.";
          }
          return "Thiếu ID hoặc hành động không hợp lệ.";
        }

        case "manage_account": {
          if (args.action === 'create') {
              this.dataContext.addAccount({
                  code: args.code,
                  name: args.name,
                  category: args.category || 'ASSET'
              });
              return "Đã thêm tài khoản.";
          } else if (args.action === 'update' && args.code) {
              this.dataContext.updateAccount(args.code, args);
              return "Đã cập nhật tài khoản.";
          } else if (args.action === 'delete' && args.code) {
              this.dataContext.deleteAccount(args.code);
              return "Đã xóa tài khoản.";
          }
          return "Thiếu Mã TK hoặc hành động không hợp lệ.";
        }

        case "update_company_info": {
          this.dataContext.updateCompanyInfo(args);
          return "Đã cập nhật thông tin doanh nghiệp.";
        }

        default:
          return "Chức năng chưa được hỗ trợ.";
      }
    } catch (e) {
      console.error("Tool execution error:", e);
      return "Có lỗi xảy ra khi thực hiện hành động.";
    }
  }
}
