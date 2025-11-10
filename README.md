# SaleSmarty ChatBot Widget

一个现代化的、可嵌入任何网站的聊天机器人小部件，基于 React + TypeScript + Vite 构建。

## ✨ 功能特性

- 💬 **实时聊天** - 支持实时消息发送和接收
- 🎨 **现代设计** - 美观的渐变色和流畅的动画效果
- 📱 **响应式布局** - 完美适配各种设备屏幕尺寸
- ⚡ **轻量高效** - 单一JS文件加载，无需额外依赖
- 🔧 **易于集成** - 只需几行代码即可集成到任何网站
- 🌐 **多社交渠道** - 集成微信、WhatsApp、Telegram等社交平台

## 📦 构建

```bash
# 安装依赖
pnpm install

# 构建项目
pnpm build
```

构建完成后，会在 `dist/` 目录下生成以下文件：
- `chatbot-widget.iife.js` - 主bundle文件（包含所有功能，207KB）
- `chatbot-widget.css` - 样式文件（自动注入到iframe中）

## 🚀 使用方法

### 方法1：在HTML页面中使用

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>我的网站</title>
</head>
<body>
  <!-- 你的网页内容 -->
  
  <!-- 引入ChatBot Widget（一个文件包含所有功能） -->
  <script src="./dist/chatbot-widget.iife.js"></script>
  
  <!-- 初始化ChatBot -->
  <script>
    const chatbot = new ChatBotWidget({
      position: 'bottom-right', // 可选: 'bottom-right', 'bottom-left', 'top-right', 'top-left'
      autoOpen: false // 是否自动打开
    });
    chatbot.init();
  </script>
</body>
</html>
```

### 方法2：通过CDN使用

如果你将文件部署到CDN，可以这样使用：

```html
<!-- 只需引入一个JS文件 -->
<script src="https://your-cdn.com/chatbot-widget.iife.js"></script>
<script>
  const chatbot = new ChatBotWidget({
    position: 'bottom-right',
    autoOpen: false
  });
  chatbot.init();
</script>
```

## 🎮 API方法

```javascript
// 打开聊天窗口
chatbot.open();

// 关闭聊天窗口
chatbot.close();

// 切换聊天窗口状态
chatbot.toggle();

// 销毁聊天组件（移除DOM元素）
chatbot.destroy();
```

## 🧪 测试

项目包含两个测试页面：

- `test.html` - 完整的功能演示页面
- `test-simple.html` - 简单的测试页面，用于验证错误修复

### 运行测试页面

```bash
# 方法1: 使用Python的HTTP服务器
python3 -m http.server 8080

# 方法2: 使用Node.js的http-server
npx http-server -p 8080

# 方法3: 使用PHP内置服务器
php -S localhost:8080
```

然后在浏览器中打开：
- `http://localhost:8080/test.html` - 完整演示
- `http://localhost:8080/test-simple.html` - 简单测试

## ⚙️ 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `position` | `string` | `'bottom-right'` | 聊天按钮位置，可选值：`'bottom-right'`, `'bottom-left'`, `'top-right'`, `'top-left'` |
| `autoOpen` | `boolean` | `false` | 是否在页面加载时自动打开聊天窗口 |

## 📁 项目结构

```
chatbot/
├── src/
│   ├── ChatBot.tsx        # 聊天机器人主组件
│   ├── ChatBot.css        # 聊天机器人样式
│   ├── widget.tsx         # Widget包装器和初始化逻辑
│   ├── main.tsx          # 开发模式入口
│   └── index.css         # 全局样式
├── dist/                  # 构建输出目录
│   ├── chatbot-widget.iife.js
│   └── chatbot-widget.css
├── test.html             # 测试页面
├── vite.config.ts        # Vite配置
└── package.json          # 项目依赖

```

## 🛠️ 技术栈

- **React 19** - UI框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **CSS3** - 样式和动画

## 🐛 已修复的问题

### process is not defined 错误

在构建为 IIFE 格式时，React 代码可能会引用 `process.env`，但浏览器环境中不存在这个对象。

**解决方案**：在 `vite.config.ts` 中添加了以下配置：

```typescript
define: {
  'process.env': {},
  'process.env.NODE_ENV': JSON.stringify('production')
}
```

这样 Vite 会在构建时替换所有的 `process.env` 引用，避免运行时错误。

## 📝 开发

```bash
# 启动开发服务器
pnpm dev

# 代码检查
pnpm lint

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

## 🎨 自定义样式

你可以通过修改 `src/ChatBot.css` 来自定义聊天机器人的样式。主要的颜色变量：

```css
/* 主题色 */
background: linear-gradient(135deg, #5b6fd8 0%, #4a5fc7 100%);

/* 悬停效果 */
box-shadow: 0 4px 12px rgba(91, 111, 216, 0.4);
```

## 📄 许可证

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题或建议，请联系开发团队。
