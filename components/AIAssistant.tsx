
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Mic, Send, X, Image as ImageIcon, Paperclip, Loader2, Sparkles } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { AIController } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  
  const dataContext = useData();
  const aiControllerRef = useRef<AIController | null>(null);

  // Initialize AI Controller on mount
  useEffect(() => {
    aiControllerRef.current = new AIController(dataContext);
    // Add initial greeting
    setMessages([{
        id: 'init',
        role: 'model',
        text: "Em là trợ lý kế toán ảo của Anh Cường. Em giúp gì được anh (chị) ạ!",
        timestamp: new Date()
    }]);
  }, []); // Empty dependency array ensures this runs once on mount

  // Sync DataContext to AIController whenever data changes
  useEffect(() => {
    if (aiControllerRef.current) {
        aiControllerRef.current.updateContext(dataContext);
    }
  }, [dataContext]);

  // Handle click outside to close chat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        chatContainerRef.current &&
        !chatContainerRef.current.contains(event.target as Node) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !isRecording) return;
    if (!aiControllerRef.current) return;

    const userMsgId = Date.now().toString();
    const userText = inputValue;
    
    setMessages(prev => [...prev, {
        id: userMsgId,
        role: 'user',
        text: userText,
        timestamp: new Date()
    }]);
    setInputValue('');
    setIsProcessing(true);

    try {
        // Pass undefined for image args if no image
        const responseText = await aiControllerRef.current.sendMessage(userText);
        setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: responseText || "Em chưa hiểu ý anh, anh nói lại được không ạ?",
            timestamp: new Date()
        }]);
    } catch (error) {
        console.error(error);
        setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: "Có lỗi xảy ra khi xử lý yêu cầu. Vui lòng thử lại.",
            timestamp: new Date(),
            isError: true
        }]);
    } finally {
        setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Image Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !aiControllerRef.current) return;

    // Validate mime type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    if (!validTypes.includes(file.type)) {
        alert("Định dạng file không được hỗ trợ. Vui lòng tải ảnh (JPG, PNG, WEBP).");
        return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1];
        const mimeType = file.type; // Capture correct mime type
        
        const userMsgId = Date.now().toString();
        setMessages(prev => [...prev, {
            id: userMsgId,
            role: 'user',
            text: `[Đã gửi ảnh: ${file.name}]`,
            timestamp: new Date(),
            attachments: [{ type: 'image', url: URL.createObjectURL(file), data: base64String }]
        }]);
        
        setIsProcessing(true);
        try {
            // Ensure ref is not null inside the callback
            const controller = aiControllerRef.current;
            if (controller) {
                const responseText = await controller.sendMessage("Hãy phân tích hình ảnh này và trích xuất thông tin quan trọng.", base64String, mimeType);
                setMessages(prev => [...prev, {
                    id: (Date.now() + 1).toString(),
                    role: 'model',
                    text: responseText || "Đã nhận ảnh.",
                    timestamp: new Date()
                }]);
            }
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: "Không thể xử lý hình ảnh này. Lỗi: " + (error as any).message,
                timestamp: new Date(),
                isError: true
            }]);
        } finally {
            setIsProcessing(false);
            // Reset input
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };
    reader.readAsDataURL(file);
  };

  // Voice Recording Handler
  const toggleRecording = () => {
    if (isRecording) {
        setIsRecording(false);
        return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
        alert("Trình duyệt không hỗ trợ nhận dạng giọng nói.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsRecording(true);
    
    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(prev => prev + (prev ? ' ' : '') + transcript);
    };

    recognition.onerror = (event: any) => {
        console.error("Speech error", event.error);
        setIsRecording(false);
    };

    recognition.onend = () => setIsRecording(false);

    recognition.start();
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        ref={toggleButtonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center ${isOpen ? 'bg-red-500 rotate-90' : 'bg-blue-600 animate-bounce-slow'}`}
        style={{ width: '60px', height: '60px' }}
      >
        {isOpen ? <X className="text-white" size={28} /> : <MessageSquare className="text-white" size={28} />}
        
        {!isOpen && (
           <span className="absolute -top-2 -right-2 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
           </span>
        )}
      </button>

      {/* Chat Window */}
      <div 
        ref={chatContainerRef}
        className={`fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-2xl border border-gray-200 transition-all duration-300 origin-bottom-right flex flex-col overflow-hidden ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'}`}
        style={{ height: '600px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                    <Sparkles className="text-yellow-300" size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-white text-lg">Trợ lý Kế toán</h3>
                    <p className="text-blue-100 text-xs flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-400"></span> Online • Gemini 2.5
                    </p>
                </div>
            </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                        className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            msg.role === 'user' 
                                ? 'bg-blue-600 text-white rounded-tr-none' 
                                : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none ' + (msg.isError ? 'border-red-300 bg-red-50' : '')
                        }`}
                    >
                        {/* Attachments */}
                        {msg.attachments?.map((att, idx) => (
                            <div key={idx} className="mb-2 rounded-lg overflow-hidden">
                                <img src={att.url} alt="uploaded" className="max-w-full h-auto" />
                            </div>
                        ))}
                        {/* Text Content */}
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                        <div className={`text-[10px] mt-1 opacity-70 text-right ${msg.role === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
                            {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                    </div>
                </div>
            ))}
            
            {/* Loading Indicator */}
            {isProcessing && (
                <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                        <Loader2 className="animate-spin text-blue-600" size={16} />
                        <span className="text-gray-500 text-xs">Đang phân tích & suy luận...</span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-gray-100 shrink-0">
            <div className="flex items-end gap-2 bg-gray-100 rounded-xl p-2 border border-gray-200 focus-within:border-blue-400 focus-within:bg-white transition-colors">
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-full hover:bg-blue-50"
                    title="Gửi ảnh/tài liệu"
                >
                    <Paperclip size={20} />
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleFileUpload}
                    />
                </button>
                
                <textarea 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Nhập câu hỏi hoặc yêu cầu..."
                    className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 py-2 text-sm text-gray-800 placeholder-gray-400"
                    rows={1}
                    style={{ minHeight: '40px' }}
                />

                {inputValue.trim() ? (
                    <button 
                        onClick={handleSendMessage}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all active:scale-95"
                    >
                        <Send size={18} />
                    </button>
                ) : (
                    <button 
                        onClick={toggleRecording}
                        className={`p-2 rounded-lg transition-all shadow-md ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
                    >
                        <Mic size={18} />
                    </button>
                )}
            </div>
            {isRecording && (
                <p className="text-xs text-red-500 text-center mt-2 font-medium animate-pulse">Đang nghe...</p>
            )}
        </div>
      </div>
    </>
  );
};

export default AIAssistant;
