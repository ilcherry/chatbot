# ChatBot 组件架构文档

## 🏗️ 架构设计

本项目采用**高内聚、低耦合**的设计原则，将ChatBot拆分为多个职责明确的组件。

## 📁 目录结构

```
src/components/
├── ChatBot.tsx           # 主容器组件
├── ChatHeader.tsx        # 头部组件
├── Message.tsx           # 单条消息组件
├── MessageList.tsx       # 消息列表组件
├── ChatInput.tsx         # 输入框组件
├── useChatBot.ts         # 业务逻辑Hook
├── types.ts              # TypeScript类型定义
├── index.ts              # 统一导出
└── README.md             # 架构文档
```

## 🧩 组件职责

### 1. ChatBot.tsx - 主容器组件
**职责**：组合各个子组件，协调它们之间的交互

**特点**：
- 使用组合模式，不包含具体UI实现
- 通过props传递数据和回调函数
- 作为状态管理的中心

```tsx
<ChatBot onClose={handleClose} />
```

### 2. ChatHeader.tsx - 头部组件
**职责**：显示标签页、机器人信息、社交链接和关闭按钮

**特点**：
- 独立的UI组件
- 接收activeTab和onTabChange进行标签页管理
- 包含所有头部相关的视觉元素

**Props**：
```typescript
interface ChatHeaderProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onClose?: () => void;
}
```

### 3. Message.tsx - 单条消息组件
**职责**：显示单条消息的内容、头像、时间戳和快速操作按钮

**特点**：
- 纯展示组件
- 根据消息类型(bot/user)自动调整样式
- 支持快速操作按钮的回调

**Props**：
```typescript
interface MessageProps {
  message: Message;
  onQuickAction?: (action: string) => void;
}
```

### 4. MessageList.tsx - 消息列表组件
**职责**：管理消息列表的显示和自动滚动

**特点**：
- 包含滚动到底部的逻辑
- 使用useEffect监听消息变化自动滚动
- 渲染多个Message组件

**Props**：
```typescript
interface MessageListProps {
  messages: Message[];
  onQuickAction?: (action: string) => void;
}
```

### 5. ChatInput.tsx - 输入框组件
**职责**：处理用户输入、工具按钮和发送消息

**特点**：
- 受控组件模式
- 支持Enter键发送
- 包含多个工具按钮（表情、图片、视频、附件）

**Props**：
```typescript
interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}
```

### 6. useChatBot.ts - 业务逻辑Hook
**职责**：管理消息状态、标签页状态和业务逻辑

**特点**：
- 分离UI和业务逻辑
- 集中管理所有状态
- 提供统一的业务方法

**返回值**：
```typescript
{
  messages: Message[];
  inputValue: string;
  activeTab: TabType;
  setInputValue: (value: string) => void;
  setActiveTab: (tab: TabType) => void;
  handleSend: () => void;
  handleQuickAction: (action: string) => void;
}
```

### 7. types.ts - 类型定义
**职责**：集中管理所有TypeScript类型定义

**特点**：
- 避免类型重复定义
- 提供类型安全保障
- 便于维护和扩展

## 🎯 设计原则

### 高内聚 (High Cohesion)
每个组件只负责一项明确的功能：
- ✅ ChatHeader只处理头部相关的UI
- ✅ Message只显示单条消息
- ✅ MessageList只管理消息列表
- ✅ ChatInput只处理输入相关操作
- ✅ useChatBot只管理业务逻辑

### 低耦合 (Low Coupling)
组件之间通过props传递数据，无直接依赖：
- ✅ 使用接口定义props类型
- ✅ 通过回调函数进行通信
- ✅ 组件可独立测试和替换
- ✅ 业务逻辑与UI分离

### 单一职责 (Single Responsibility)
每个模块只有一个改变的理由：
- ✅ UI变化只影响对应的组件
- ✅ 业务逻辑变化只影响Hook
- ✅ 类型变化只影响types.ts

## 🔄 数据流

```
用户操作
   ↓
ChatInput → onChange/onSend
   ↓
ChatBot (通过useChatBot)
   ↓
更新messages状态
   ↓
MessageList → Message
   ↓
显示新消息
```

## 🧪 扩展性

### 添加新功能
1. 需要新UI组件？创建新的组件文件
2. 需要新业务逻辑？在useChatBot中添加
3. 需要新数据类型？在types.ts中定义

### 替换组件
由于低耦合设计，任何组件都可以独立替换：

```tsx
// 替换Header为自定义Header
<CustomHeader 
  activeTab={activeTab}
  onTabChange={setActiveTab}
  onClose={onClose}
/>
```

## 📊 优势

1. **可维护性** ⬆️ - 代码结构清晰，易于理解和修改
2. **可测试性** ⬆️ - 每个组件可独立测试
3. **可复用性** ⬆️ - 组件可在其他项目中复用
4. **可扩展性** ⬆️ - 添加新功能不影响现有代码
5. **团队协作** ⬆️ - 多人可并行开发不同组件

## 🎓 最佳实践

1. **保持组件纯净**：组件只负责渲染，不包含复杂业务逻辑
2. **使用TypeScript**：利用类型系统防止错误
3. **Props接口明确**：清晰定义组件的输入输出
4. **避免Props钻取**：如果层级过深，考虑使用Context
5. **逻辑分离**：UI逻辑和业务逻辑分开管理

