import { useState } from 'react';
import type { Message, TabType, MessageContent } from './types';

/**
 * 生成时间戳
 */
const generateTimestamp = (): string => {
  const now = new Date();
  return `${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes()
  ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
};

/**
 * 获取机器人回复内容
 */
const getBotReply = (action: string): string => {
  if (action === '使用常见问题') {
    return '以下是一些常见问题：\n1. 如何注册账号？\n2. 如何联系客服？\n3. 支持哪些支付方式？';
  } else if (action === 'salesmartly使用指南') {
    return 'SaleSmarty使用指南：\n1. 点击开始聊天\n2. 输入您的问题\n3. 我们的团队会及时回复';
  } else {
    return '感谢您的咨询，有什么可以帮助您的吗？';
  }
};

/**
 * 初始消息列表（包含系统消息示例）
 */
const initialMessages: Message[] = [
  {
    id: 1,
    type: 'bot',
    content: '欢迎使用SaleSmarty',
    timestamp: '11-10 16:27:52',
  },
  {
    id: 2,
    type: 'system',
    content: '🟢 客服已上线',
    timestamp: '11-10 16:27:53',
  },
  {
    id: 3,
    type: 'bot',
    content: 'salesmartly使用指南',
    timestamp: '11-10 16:27:54',
  },
  {
    id: 4,
    type: 'bot',
    content: '使用常见问题',
    timestamp: '11-10 16:27:54',
  },
];

/**
 * ChatBot 业务逻辑Hook
 * 职责：管理消息状态、标签页状态和业务逻辑
 */
export const useChatBot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('message');
  const [unreadCount, setUnreadCount] = useState(2);

  /**
   * 切换标签页
   */
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    // 切换到消息标签时，清零未读消息数
    if (tab === 'message') {
      setUnreadCount(0);
    }
  };

  /**
   * 发送消息
   */
  const handleSend = () => {
    if (!inputValue.trim()) return;

    const timestamp = generateTimestamp();
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // 添加系统消息：消息已接收
    setTimeout(() => {
      const systemMessage: Message = {
        id: messages.length + 2,
        type: 'system',
        content: '💾 消息已保存',
        timestamp: '',
      };
      setMessages(prev => [...prev, systemMessage]);
    }, 500);

    // 模拟机器人回复
    setTimeout(() => {
      const botReply: Message = {
        id: messages.length + 3,
        type: 'bot',
        content: '感谢您的消息！我们会尽快回复您。',
        timestamp,
      };
      setMessages(prev => [...prev, botReply]);
      // 如果不在消息标签页，增加未读计数
      setUnreadCount(prev => (activeTab !== 'message' ? prev + 1 : prev));
    }, 1500);
  };

  /**
   * 快速操作
   */
  const handleQuickAction = (action: string) => {
    const timestamp = generateTimestamp();
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: action,
      timestamp,
    };

    setMessages(prev => [...prev, userMessage]);

    // 添加系统消息：正在处理
    setTimeout(() => {
      const systemMessage: Message = {
        id: messages.length + 2,
        type: 'system',
        content: '⚡ 正在为您查询...',
        timestamp: '',
      };
      setMessages(prev => [...prev, systemMessage]);
    }, 300);

    // 模拟机器人回复
    setTimeout(() => {
      const reply = getBotReply(action);
      const botReply: Message = {
        id: messages.length + 3,
        type: 'bot',
        content: reply,
        timestamp,
      };
      setMessages(prev => [...prev, botReply]);
      // 如果不在消息标签页，增加未读计数
      setUnreadCount(prev => (activeTab !== 'message' ? prev + 1 : prev));
    }, 1200);
  };

  /**
   * 将文件转换为Base64 URL
   */
  const fileToDataURL = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  /**
   * 处理图片上传
   */
  const handleImageUpload = async (file: File) => {
    try {
      const timestamp = generateTimestamp();
      const url = await fileToDataURL(file);

      const content: MessageContent[] = [
        {
          type: 'image',
          url,
          fileName: file.name,
          fileSize: file.size,
        },
      ];

      const userMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        content,
        timestamp,
      };

      setMessages(prev => [...prev, userMessage]);

      // 模拟机器人回复
      setTimeout(() => {
        const botReply: Message = {
          id: messages.length + 2,
          type: 'bot',
          content: '收到您的图片！',
          timestamp,
        };
        setMessages(prev => [...prev, botReply]);
        // 如果不在消息标签页，增加未读计数
        setUnreadCount(prev => (activeTab !== 'message' ? prev + 1 : prev));
      }, 1000);
    } catch (error) {
      console.error('图片上传失败:', error);
      alert('图片上传失败，请重试');
    }
  };

  /**
   * 处理视频上传
   */
  const handleVideoUpload = async (file: File) => {
    try {
      const timestamp = generateTimestamp();
      const url = await fileToDataURL(file);

      const content: MessageContent[] = [
        {
          type: 'video',
          url,
          fileName: file.name,
          fileSize: file.size,
        },
      ];

      const userMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        content,
        timestamp,
      };

      setMessages(prev => [...prev, userMessage]);

      // 模拟机器人回复
      setTimeout(() => {
        const botReply: Message = {
          id: messages.length + 2,
          type: 'bot',
          content: '收到您的视频！',
          timestamp,
        };
        setMessages(prev => [...prev, botReply]);
        // 如果不在消息标签页，增加未读计数
        setUnreadCount(prev => (activeTab !== 'message' ? prev + 1 : prev));
      }, 1000);
    } catch (error) {
      console.error('视频上传失败:', error);
      alert('视频上传失败，请重试');
    }
  };

  /**
   * 处理附件上传
   */
  const handleFileUpload = async (file: File) => {
    try {
      const timestamp = generateTimestamp();
      const url = await fileToDataURL(file);

      const content: MessageContent[] = [
        {
          type: 'file',
          url,
          fileName: file.name,
          fileSize: file.size,
        },
      ];

      const userMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        content,
        timestamp,
      };

      setMessages(prev => [...prev, userMessage]);

      // 模拟机器人回复
      setTimeout(() => {
        const botReply: Message = {
          id: messages.length + 2,
          type: 'bot',
          content: `收到您的文件：${file.name}`,
          timestamp,
        };
        setMessages(prev => [...prev, botReply]);
        // 如果不在消息标签页，增加未读计数
        setUnreadCount(prev => (activeTab !== 'message' ? prev + 1 : prev));
      }, 1000);
    } catch (error) {
      console.error('文件上传失败:', error);
      alert('文件上传失败，请重试');
    }
  };

  return {
    messages,
    inputValue,
    activeTab,
    unreadCount,
    setInputValue,
    setActiveTab: handleTabChange,
    handleSend,
    handleQuickAction,
    handleImageUpload,
    handleVideoUpload,
    handleFileUpload,
  };
};
