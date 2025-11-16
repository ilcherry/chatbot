# Vercel 部署指南

## 方法1：通过 Vercel CLI

1. 安装 Vercel CLI
```bash
npm i -g vercel
```

2. 在项目根目录运行
```bash
vercel
```

3. 按照提示完成部署

## 方法2：通过 Vercel 网站

1. 访问 [Vercel](https://vercel.com/)
2. 点击 "Import Project"
3. 连接你的 GitHub 仓库
4. 配置构建设置：

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "installCommand": "pnpm install"
}
```

## 创建 vercel.json 配置文件

在项目根目录创建 `vercel.json`：

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 部署后使用

```html
<script src="https://your-project.vercel.app/chatbot-widget.iife.js"></script>
<script>
  const chatbot = new ChatBotWidget({
    position: 'bottom-right',
    autoOpen: false
  });
  chatbot.init();
</script>
```

## 自定义域名

在 Vercel 项目设置中添加自定义域名：
```
https://cdn.yourdomain.com
```

