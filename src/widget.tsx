import React from "react";
import ReactDOM from "react-dom/client";
import ChatBot from "./ChatBot";
import "./ChatBot.css";
import "./index.css";

interface ChatBotWidgetConfig {
  container?: string | HTMLElement;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  autoOpen?: boolean;
}

class ChatBotWidget {
  private root: ReactDOM.Root | null = null;
  private container: HTMLElement | null = null;
  private isOpen: boolean = false;
  private config: ChatBotWidgetConfig;

  constructor(config: ChatBotWidgetConfig = {}) {
    this.config = {
      position: "bottom-right",
      autoOpen: false,
      ...config,
    };
  }

  init() {
    // 创建容器
    this.container = document.createElement("div");
    this.container.id = "chatbot-widget-root";
    this.container.style.cssText = this.getContainerStyles();
    document.body.appendChild(this.container);

    // 创建打开按钮
    const button = document.createElement("div");
    button.id = "chatbot-widget-button";
    button.style.cssText = this.getButtonStyles();
    button.innerHTML = this.getButtonHTML();
    button.onclick = () => this.toggle();
    document.body.appendChild(button);

    // 如果设置了自动打开
    if (this.config.autoOpen) {
      this.open();
    }
  }

  private getContainerStyles(): string {
    const position = this.config.position || "bottom-right";
    const baseStyles = `
      position: fixed;
      z-index: 999999;
      display: none;
      animation: slideIn 0.3s ease;
    `;

    const positions = {
      "bottom-right": "bottom: 100px; right: 20px;",
      "bottom-left": "bottom: 100px; left: 20px;",
      "top-right": "top: 20px; right: 20px;",
      "top-left": "top: 20px; left: 20px;",
    };

    return baseStyles + positions[position];
  }

  private getButtonStyles(): string {
    const position = this.config.position || "bottom-right";
    const baseStyles = `
      position: fixed;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #5b6fd8 0%, #4a5fc7 100%);
      box-shadow: 0 4px 12px rgba(91, 111, 216, 0.4);
      cursor: pointer;
      z-index: 999998;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    `;

    const positions = {
      "bottom-right": "bottom: 20px; right: 20px;",
      "bottom-left": "bottom: 20px; left: 20px;",
      "top-right": "top: 20px; right: 20px;",
      "top-left": "top: 20px; left: 20px;",
    };

    return baseStyles + positions[position];
  }

  private getButtonHTML(): string {
    return `
      <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
        <path d="M16 3C8.82 3 3 8.37 3 15c0 2.97 1.16 5.69 3.08 7.82L4.5 28l5.82-2.42C12.11 26.5 13.98 27 16 27c7.18 0 13-5.37 13-12S23.18 3 16 3zm0 21.5c-1.79 0-3.47-.45-4.95-1.23l-.35-.18-3.64 1.51 1.55-3.52-.21-.37C6.66 18.85 6 16.99 6 15c0-5.24 4.48-9.5 10-9.5s10 4.26 10 9.5-4.48 9.5-10 9.5z"/>
        <circle cx="11" cy="14" r="1.5"/>
        <circle cx="16" cy="14" r="1.5"/>
        <circle cx="21" cy="14" r="1.5"/>
      </svg>
    `;
  }

  open() {
    if (!this.container) return;

    this.isOpen = true;
    this.container.style.display = "block";

    // 创建React根节点（如果还没有创建）
    if (!this.root) {
      this.root = ReactDOM.createRoot(this.container);
      this.root.render(
        <React.StrictMode>
          <ChatBot onClose={() => this.close()} />
        </React.StrictMode>
      );
    }

    // 隐藏按钮
    const button = document.getElementById("chatbot-widget-button");
    if (button) {
      button.style.display = "none";
    }
  }

  close() {
    if (!this.container) return;

    this.isOpen = false;
    this.container.style.display = "none";

    // 显示按钮
    const button = document.getElementById("chatbot-widget-button");
    if (button) {
      button.style.display = "flex";
    }
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  destroy() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
    if (this.container) {
      document.body.removeChild(this.container);
      this.container = null;
    }
    const button = document.getElementById("chatbot-widget-button");
    if (button) {
      document.body.removeChild(button);
    }
  }
}

// 添加样式动画
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  #chatbot-widget-button:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(91, 111, 216, 0.5);
  }

  #chatbot-widget-button:active {
    transform: scale(0.95);
  }
`;
document.head.appendChild(style);

// 导出到全局
declare global {
  interface Window {
    ChatBotWidget: typeof ChatBotWidget;
  }
}

window.ChatBotWidget = ChatBotWidget;

// 默认导出
export default ChatBotWidget;
