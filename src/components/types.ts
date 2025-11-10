/**
 * 消息类型定义
 */
export interface Message {
  id: number;
  type: "bot" | "user";
  content: string;
  timestamp: string;
}

/**
 * 标签页类型
 */
export type TabType = "message" | "help";

/**
 * ChatBot 组件属性
 */
export interface ChatBotProps {
  onClose?: () => void;
}

/**
 * ChatHeader 组件属性
 */
export interface ChatHeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onClose?: () => void;
}

/**
 * Message 组件属性
 */
export interface MessageProps {
  message: Message;
  onQuickAction?: (action: string) => void;
}

/**
 * MessageList 组件属性
 */
export interface MessageListProps {
  messages: Message[];
  onQuickAction?: (action: string) => void;
}

/**
 * ChatInput 组件属性
 */
export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

