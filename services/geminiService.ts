import { GoogleGenAI } from "@google/genai";

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.warn("API_KEY is not set in environment variables.");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

export const analyzeFinancials = async (summaryData: string): Promise<string> => {
    const client = getClient();
    if (!client) return "Vui lòng cấu hình API KEY để sử dụng tính năng AI.";

    try {
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Bạn là một chuyên gia kế toán trưởng và phân tích tài chính (Chief Accountant/CFO).
            Dưới đây là dữ liệu tổng hợp của công ty (JSON format):
            ${summaryData}

            Hãy phân tích dữ liệu trên và đưa ra:
            1. 3 điểm nổi bật về tình hình tài chính hiện tại.
            2. Các rủi ro tiềm ẩn (nếu có).
            3. Đề xuất ngắn gọn để tối ưu dòng tiền hoặc lợi nhuận.

            Trả lời bằng tiếng Việt, định dạng Markdown, giọng văn chuyên nghiệp nhưng dễ hiểu.`,
        });
        return response.text || "Không thể phân tích dữ liệu lúc này.";
    } catch (error) {
        console.error("Gemini analysis error:", error);
        return "Đã có lỗi xảy ra khi kết nối với trợ lý ảo AI.";
    }
};

export const askAccountingQuestion = async (question: string): Promise<string> => {
  const client = getClient();
  if (!client) return "Vui lòng cấu hình API KEY.";

  try {
      const response = await client.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: `Bạn là chuyên gia hỗ trợ phần mềm kế toán Ketoan_Online.
          Người dùng hỏi: "${question}"
          Hãy trả lời ngắn gọn, chính xác về nghiệp vụ kế toán Việt Nam hoặc cách hạch toán.`,
      });
      return response.text || "Không có phản hồi.";
  } catch (error) {
      return "Lỗi kết nối.";
  }
};