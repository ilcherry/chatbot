import React from "react";
import type { MessageProps } from "./types";

/**
 * 单条消息组件
 * 职责：显示单条消息内容、头像、时间戳和快速操作按钮
 */
const Message: React.FC<MessageProps> = ({ message, onQuickAction }) => {
  const { type, content, timestamp } = message;

  return (
    <div className={`message ${type}`}>
      {type === "bot" && (
        <div className="message-avatar">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
            <circle cx="16" cy="12" r="4" />
            <path d="M10 22c0-3.3 2.7-6 6-6s6 2.7 6 6v2H10v-2z" />
          </svg>
        </div>
      )}
      <div className="message-content">
        <div className="message-bubble">{content}</div>
        {type === "bot" && content !== "欢迎使用SaleSmarty" && onQuickAction && (
          <button
            className="quick-action-btn"
            onClick={() => onQuickAction(content)}
          >
            {content}
          </button>
        )}
        <div className="message-timestamp">{timestamp}</div>
      </div>
    </div>
  );
};

export default Message;

