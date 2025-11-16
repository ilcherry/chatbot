# 系统消息使用指南

## 概述

系统消息是一种特殊的消息类型，用于在聊天对话中显示系统通知、状态更新和其他非用户/机器人的信息。系统消息会以居中的样式显示在消息列表中，与普通的用户消息和机器人消息有明显的视觉区分。

## 功能特性

- ✅ **居中显示**：系统消息显示在消息列表的中间位置
- ✅ **视觉区分**：使用灰色背景和较小字体，与对话消息区分
- ✅ **时间戳支持**：可选择显示或隐藏时间戳
- ✅ **灵活内容**：支持文本和 emoji，适合各种通知场景

## 消息类型定义

```typescript
interface Message {
  id: number;
  type: "bot" | "user" | "system"; // 新增 "system" 类型
  content: string | MessageContent[];
  timestamp: string;
}
```

## 使用方法

### 基本用法

创建一个系统消息：

```typescript
const systemMessage: Message = {
  id: 1,
  type: "system",
  content: "客服已上线",
  timestamp: "09:00",
};
```

### 不显示时间戳

如果不需要显示时间戳，可以将 `timestamp` 设置为空字符串：

```typescript
const systemMessage: Message = {
  id: 1,
  type: "system",
  content: "会话已保存",
  timestamp: "",
};
```

### 使用 Emoji 增强视觉效果

```typescript
const systemMessages = [
  {
    id: 1,
    type: "system",
    content: "🟢 客服已上线",
    timestamp: "09:00",
  },
  {
    id: 2,
    type: "system",
    content: "💾 会话已自动保存",
    timestamp: "09:01",
  },
  {
    id: 3,
    type: "system",
    content: "🔄 正在为您转接人工客服...",
    timestamp: "09:02",
  },
  {
    id: 4,
    type: "system",
    content: "⚡ 客服响应时间: 2秒",
    timestamp: "",
  },
];
```

## 典型使用场景

### 1. 客服状态通知

```typescript
// 客服上线
{
  type: "system",
  content: "🟢 客服已上线",
  timestamp: getCurrentTime()
}

// 客服离线
{
  type: "system",
  content: "🔴 客服已离线，留言将在工作时间回复",
  timestamp: getCurrentTime()
}
```

### 2. 会话状态更新

```typescript
// 会话保存
{
  type: "system",
  content: "💾 会话已自动保存",
  timestamp: ""
}

// 会话超时
{
  type: "system",
  content: "⏰ 会话已超时，请重新开始",
  timestamp: getCurrentTime()
}
```

### 3. 转接和路由

```typescript
// 转接人工客服
{
  type: "system",
  content: "🔄 正在为您转接人工客服...",
  timestamp: getCurrentTime()
}

// 转接成功
{
  type: "system",
  content: "✅ 已转接至人工客服",
  timestamp: getCurrentTime()
}
```

### 4. 系统通知

```typescript
// 性能指标
{
  type: "system",
  content: "⚡ 平均响应时间: 2秒",
  timestamp: ""
}

// 系统维护
{
  type: "system",
  content: "🔧 系统将在 5 分钟后进行维护",
  timestamp: getCurrentTime()
}
```

## 样式说明

系统消息的样式定义在 `ChatBot.css` 中：

```css
/* 系统消息容器 - 居中对齐 */
.message.system {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0;
}

/* 系统消息内容包装器 */
.system-message-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  max-width: 80%;
}

/* 系统消息文本 */
.system-message-text {
  background: rgba(0, 0, 0, 0.05);
  color: #666;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 12px;
  line-height: 1.4;
  text-align: center;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* 系统消息时间戳 */
.system-message-timestamp {
  font-size: 10px;
  color: #999;
  text-align: center;
}
```

## 自定义样式

如果需要自定义系统消息的外观，可以覆盖以下 CSS 类：

```css
/* 修改背景色 */
.system-message-text {
  background: #e3f2fd; /* 浅蓝色背景 */
  color: #1976d2; /* 深蓝色文字 */
}

/* 修改字体大小 */
.system-message-text {
  font-size: 13px;
}

/* 添加图标样式 */
.system-message-text::before {
  content: "ℹ️ ";
  margin-right: 4px;
}
```

## 完整示例

```typescript
import { useState } from "react";
import type { Message } from "./types";

function ChatExample() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      content: "你好！我是智能客服助手",
      timestamp: "09:00",
    },
    {
      id: 2,
      type: "system",
      content: "🟢 客服已上线",
      timestamp: "09:01",
    },
    {
      id: 3,
      type: "user",
      content: "你好，我想咨询问题",
      timestamp: "09:02",
    },
  ]);

  const addSystemMessage = (content: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      type: "system",
      content,
      timestamp: new Date().toLocaleTimeString("zh-CN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div>
      <MessageList messages={messages} />
      <button onClick={() => addSystemMessage("💾 会话已保存")}>
        保存会话
      </button>
    </div>
  );
}
```

## 最佳实践

1. **简洁明了**：系统消息应该简短、清晰，快速传达信息
2. **使用图标**：适当使用 emoji 可以增强视觉识别度
3. **控制频率**：避免过于频繁的系统消息打扰用户对话
4. **时间戳选择**：重要通知显示时间戳，一般提示可省略
5. **语气友好**：即使是系统消息，也应该保持友好的语气

## 注意事项

- 系统消息不支持快速操作按钮
- 系统消息不显示头像
- 系统消息的内容建议控制在一行以内，最多两行
- 过长的文本会自动换行，但建议拆分为多条消息

## 测试

运行测试页面查看系统消息效果：

```bash
# 启动开发服务器
pnpm run dev

# 打开浏览器访问
open test-system-message.html
```

## 更新日志

- **v1.0.0** (2024-11-15)
  - ✨ 新增系统消息类型支持
  - 🎨 实现居中显示样式
  - 📝 添加完整文档和示例
