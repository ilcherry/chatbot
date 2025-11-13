# Cloudflare Pages 部署指南

## 步骤1：准备部署

1. 登录 [Cloudflare](https://dash.cloudflare.com/)
2. 进入 Pages 部分
3. 点击 "Create a project"

## 步骤2：连接 GitHub 仓库

1. 授权 Cloudflare 访问你的 GitHub
2. 选择你的 chatbot 仓库
3. 配置构建设置：

```yaml
Build command: pnpm build
Build output directory: dist
Root directory: /
```

## 步骤3：环境变量（如果需要）

```
NODE_VERSION=20
```

## 步骤4：部署

点击 "Save and Deploy"，几分钟后你会得到一个类似这样的URL：
```
https://chatbot.pages.dev/chatbot-widget.iife.js
```

## 步骤5：使用自定义域名（可选）

在 Cloudflare Pages 设置中添加自定义域名：
```
https://cdn.yourdomain.com/chatbot-widget.iife.js
```

## 在网站中使用

```html
<script src="https://chatbot.pages.dev/chatbot-widget.iife.js"></script>
<script>
  const chatbot = new ChatBotWidget({
    position: 'bottom-right',
    autoOpen: false
  });
  chatbot.init();
</script>
```

