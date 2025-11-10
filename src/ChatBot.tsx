import { useState, useRef, useEffect } from "react";
import "./ChatBot.css";

interface Message {
  id: number;
  type: "bot" | "user";
  content: string;
  timestamp: string;
}

interface ChatBotProps {
  onClose?: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content: "欢迎使用SaleSmarty",
      timestamp: "11-10 16:27:52",
    },
    {
      id: 2,
      type: "bot",
      content: "salesmartly使用指南",
      timestamp: "11-10 16:27:52",
    },
    {
      id: 3,
      type: "bot",
      content: "使用常见问题",
      timestamp: "11-10 16:27:52",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [activeTab, setActiveTab] = useState<"message" | "help">("message");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputValue.trim()) {
      const now = new Date();
      const timestamp = `${String(now.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(now.getDate()).padStart(2, "0")} ${String(
        now.getHours()
      ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
        now.getSeconds()
      ).padStart(2, "0")}`;

      const newMessage: Message = {
        id: messages.length + 1,
        type: "user",
        content: inputValue,
        timestamp,
      };
      setMessages([...messages, newMessage]);
      setInputValue("");

      // 模拟机器人回复
      setTimeout(() => {
        const botReply: Message = {
          id: messages.length + 2,
          type: "bot",
          content: "感谢您的消息！我们会尽快回复您。",
          timestamp,
        };
        setMessages((prev) => [...prev, botReply]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickAction = (action: string) => {
    const now = new Date();
    const timestamp = `${String(now.getMonth() + 1).padStart(2, "0")}-${String(
      now.getDate()
    ).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;

    const newMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: action,
      timestamp,
    };
    setMessages([...messages, newMessage]);

    // 模拟机器人回复
    setTimeout(() => {
      let reply = "";
      if (action === "使用常见问题") {
        reply =
          "以下是一些常见问题：\n1. 如何注册账号？\n2. 如何联系客服？\n3. 支持哪些支付方式？";
      } else if (action === "salesmartly使用指南") {
        reply =
          "SaleSmarty使用指南：\n1. 点击开始聊天\n2. 输入您的问题\n3. 我们的团队会及时回复";
      } else {
        reply = "感谢您的咨询，有什么可以帮助您的吗？";
      }

      const botReply: Message = {
        id: messages.length + 2,
        type: "bot",
        content: reply,
        timestamp,
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="header-top">
          <div className="header-tabs">
            <button
              className={`tab ${activeTab === "message" ? "active" : ""}`}
              onClick={() => setActiveTab("message")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4.5l-2.5 2V3z" />
              </svg>
              消息
            </button>
            <button
              className={`tab ${activeTab === "help" ? "active" : ""}`}
              onClick={() => setActiveTab("help")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
                <path d="M8 5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 8 5z" />
              </svg>
              帮助
            </button>
          </div>
          <button className="close-btn" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>

        <div className="header-info">
          <div className="bot-avatar">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="white">
              <circle cx="20" cy="15" r="5" />
              <path d="M12 28c0-4.4 3.6-8 8-8s8 3.6 8 8v2H12v-2z" />
              <rect x="15" y="8" width="2" height="4" />
              <rect x="23" y="8" width="2" height="4" />
            </svg>
          </div>
          <div className="bot-info">
            <h3>SaleSmarty</h3>
            <p className="service-time">人工服务时间：10:00-23:00 UTC(+8)</p>
          </div>
        </div>

        <div className="social-links">
          <a href="#" className="social-icon wechat" title="微信">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.5 9.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
          </a>
          <a href="#" className="social-icon whatsapp" title="WhatsApp">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.38 5.08L2 22l4.92-1.38C8.42 21.5 10.15 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
          </a>
          <a href="#" className="social-icon telegram" title="Telegram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8-1.6 7.52c-.12.54-.44.67-.89.42l-2.46-1.82-1.19 1.14c-.13.13-.24.24-.49.24l.17-2.44 4.47-4.04c.19-.17-.04-.27-.3-.1L9.39 13.3l-2.44-.77c-.53-.17-.54-.53.11-.78l9.57-3.69c.44-.17.83.1.68.78z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="chatbot-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.type}`}>
            {message.type === "bot" && (
              <div className="message-avatar">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
                  <circle cx="16" cy="12" r="4" />
                  <path d="M10 22c0-3.3 2.7-6 6-6s6 2.7 6 6v2H10v-2z" />
                </svg>
              </div>
            )}
            <div className="message-content">
              <div className="message-bubble">{message.content}</div>
              {message.type === "bot" &&
                message.content !== "欢迎使用SaleSmarty" && (
                  <button
                    className="quick-action-btn"
                    onClick={() => handleQuickAction(message.content)}
                  >
                    {message.content}
                  </button>
                )}
              <div className="message-timestamp">{message.timestamp}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <button className="input-btn emoji-btn" title="表情">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="9" cy="10" r="1.5" />
            <circle cx="15" cy="10" r="1.5" />
            <path
              d="M8 14s1.5 2 4 2 4-2 4-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button className="input-btn image-btn" title="图片">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path
              d="M21 15l-5-5L5 21"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button className="input-btn video-btn" title="视频">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <rect
              x="2"
              y="6"
              width="14"
              height="12"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M16 11l6-4v10l-6-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="input-btn attach-btn" title="附件">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <input
          type="text"
          className="message-input"
          placeholder="输入信息..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="send-btn" onClick={handleSend}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
