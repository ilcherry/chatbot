# NPM CDN 部署指南（unpkg / jsDelivr）

如果你想通过 npm 发布包，然后使用 unpkg 或 jsDelivr 的 CDN 服务。

## 步骤1：准备 package.json

修改你的 `package.json`：

```json
{
  "name": "@your-username/chatbot-widget",
  "version": "1.0.0",
  "private": false,  // 改为 false，允许发布
  "main": "dist/chatbot-widget.iife.js",
  "files": [
    "dist"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/chatbot.git"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

## 步骤2：发布到 npm

```bash
# 登录 npm
npm login

# 构建项目
pnpm build

# 发布到 npm
npm publish --access public
```

## 步骤3：使用 CDN

发布成功后，你可以通过以下CDN使用：

### unpkg

```html
<!-- 最新版本 -->
<script src="https://unpkg.com/@your-username/chatbot-widget"></script>

<!-- 指定版本 -->
<script src="https://unpkg.com/@your-username/chatbot-widget@1.0.0/dist/chatbot-widget.iife.js"></script>
```

### jsDelivr (npm)

```html
<!-- 最新版本 -->
<script src="https://cdn.jsdelivr.net/npm/@your-username/chatbot-widget"></script>

<!-- 指定版本 -->
<script src="https://cdn.jsdelivr.net/npm/@your-username/chatbot-widget@1.0.0/dist/chatbot-widget.iife.js"></script>
```

## 优点

- ✅ 版本管理清晰
- ✅ 全球CDN加速
- ✅ 自动缓存优化
- ✅ 支持版本锁定

## 注意事项

- 每次更新都需要发布新版本
- 需要 npm 账号
- 包名需要唯一（建议使用 @scope/package-name 格式）

