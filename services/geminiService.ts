
import { GoogleGenAI, FunctionDeclaration, Type } from "@google/genai";
import { DataContextType, TransactionType } from "../types";

// System Instruction defining the persona and behavior
const SYSTEM_INSTRUCTION = `
Bạn là Trợ lý Kế toán Ảo chuyên nghiệp của Anh Cường.
Nhiệm vụ: Hỗ trợ quản lý tài chính, nhập liệu, phân tích số liệu và quản lý danh mục (Khách hàng, Hàng hóa, Tài khoản).

QUY TRÌNH LÀM VIỆC (TUÂN THỦ TUYỆT ĐỐI):
1.  **Tiếp nhận yêu cầu**: Lắng nghe yêu cầu từ người dùng.
2.  **Phân tích & Kiểm tra**:
    *   Trước khi thực hiện bất kỳ hành động thay đổi dữ liệu nào (Thêm, Sửa, Xóa), BẮT BUỘC phải dùng công cụ \`get_database_data\` để kiểm tra dữ liệu hiện có.
    *   Ví dụ: Muốn xóa khách hàng A, phải tìm xem khách hàng A có ID là gì. Muốn thêm mã mới, kiểm tra xem mã đó đã trùng chưa.
3.  **Tuân thủ Pháp luật (QUAN TRỌNG)**:
    *   Bạn có quyền truy cập vào Hệ thống Văn bản Pháp luật (thông qua tool \`get_legal_documents\`).
    *   Khi người dùng hỏi về chế độ kế toán, định khoản nghiệp vụ phức tạp, hoặc các quy định thuế, BẮT BUỘC phải tham chiếu các văn bản pháp luật hiện hành có trong hệ thống để trả lời chính xác.
    *   Nếu có nghiệp vụ nào vi phạm văn bản pháp luật (ví dụ: chi tiền mặt vượt định mức, chứng từ không hợp lệ theo quy định), hãy cảnh báo người dùng.
4.  **Đề xuất & Xin xác nhận**:
    *   **QUAN TRỌNG**: Bạn KHÔNG ĐƯỢC PHÉP tự ý thay đổi dữ liệu khi chưa hỏi ý kiến.
    *   Hãy tóm tắt hành động: "Em tìm thấy khách hàng 'Công ty ABC' (Mã: KH001). Anh muốn xóa khách hàng này phải không ạ?" hoặc "Em sẽ tạo phiếu thu 50 triệu từ khách hàng ABC, anh đồng ý chứ?"
5.  **Thực thi**:
    *   Chỉ gọi các tool (\`create_transaction\`, \`manage_partner\`, \`delete_transaction\`, v.v.) KHI VÀ CHỈ KHI người dùng đã xác nhận rõ ràng (OK, Đồng ý, Duyệt, Làm đi...).

CÁC CÔNG CỤ (TOOLS):
*   \`create_transaction\`: Tạo phiếu thu, chi, nhập, xuất, bán hàng...
*   \`delete_transaction\`: Xóa chứng từ theo ID.
*   \`manage_partner\`: Thêm/Sửa/Xóa Khách hàng, Nhà cung cấp, Nhân viên.
*   \`manage_product\`: Thêm/Sửa/Xóa Vật tư hàng hóa.
*   \`manage_account\`: Thêm/Sửa/Xóa Tài khoản kế toán.
*   \`update_company_info\`: Cập nhật thông tin công ty.
*   \`get_database_data\`: Đọc dữ liệu để tra cứu ID hoặc làm báo cáo.
*   \`get_legal_documents\`: Tra cứu danh sách và nội dung các văn bản pháp luật trong hệ thống.

Lưu ý giao tiếp:
- Luôn xưng "Em", gọi "Anh Cường".
- Ngắn gọn, súc tích, chuyên nghiệp.
- Nếu người dùng gửi ảnh hóa đơn, hãy phân tích ảnh trước, trích xuất thông tin rồi mới hỏi xác nhận tạo phiếu.
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
      description: "Lấy toàn bộ dữ liệu từ một bảng cụ thể để tra cứu ID hoặc tổng hợp báo cáo.",
      parameters: {
          type: Type.OBJECT,
          properties: {
            entity: { type: Type.STRING, description: "'transactions', 'partners', 'products', 'accounts'" }
          },
          required: ["entity"]
      }
  },
  {
    name: "get_legal_documents",
    description: "Lấy danh sách và nội dung các văn bản pháp luật để tham chiếu quy định.",
    parameters: {
      type: Type.OBJECT,
      properties: {}, // No params needed, returns all active docs
    }
  }
];

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
      
      // Add text part. If empty (just sending image), provide a space to avoid "ContentUnion" error if strict
      parts.push({ text: message || " " });

      let response = await this.chatSession.sendMessage({
        message: { role: 'user', parts: parts }
      });

      // Handle Function Calls Loop
      while (response.functionCalls && response.functionCalls.length > 0) {
        const functionResponses = await Promise.all(
          response.functionCalls.map(async (call: any) => {
            const result = await this.executeFunction(call);
            return {
              id: call.id,
              name: call.name,
              response: { result: result }
            };
          })
        );
        
        // Send tool results back to model
        response = await this.chatSession.sendMessage({
          message: [{ functionResponse: { functionResponses } }]
        });
      }

      return response.text;
    } catch (error) {
      console.error("AI Processing Error:", error);
      return "Xin lỗi, em đang gặp chút sự cố kết nối hoặc xử lý dữ liệu. Anh thử lại giúp em nhé!";
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
          return "Entity not found";
        }

        case "get_legal_documents": {
           return JSON.stringify(this.dataContext.legalDocuments);
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
