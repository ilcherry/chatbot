import React, { useRef, useEffect } from 'react';
import Message from './Message';
import type { MessageListProps } from './types';

/**
 * 消息列表组件
 * 职责：管理消息列表的显示和自动滚动到底部
 */
const MessageList: React.FC<MessageListProps> = ({
  messages,
  onQuickAction,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chatbot-messages">
      {messages.map(message => (
        <Message
          key={message.id}
          message={message}
          onQuickAction={onQuickAction}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
