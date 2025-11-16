# 阿里云 OSS + CDN 部署指南

适合国内用户，访问速度快。

## 步骤1：创建 OSS Bucket

1. 登录 [阿里云控制台](https://oss.console.aliyun.com/)
2. 创建 Bucket
   - 名称：如 `chatbot-cdn`
   - 区域：选择离你用户最近的
   - 读写权限：公共读

## 步骤2：配置跨域（CORS）

在 Bucket 设置中添加 CORS 规则：

```xml
<CORSRule>
  <AllowedOrigin>*</AllowedOrigin>
  <AllowedMethod>GET</AllowedMethod>
  <AllowedMethod>HEAD</AllowedMethod>
  <AllowedHeader>*</AllowedHeader>
</CORSRule>
```

## 步骤3：上传文件

### 方法1：通过控制台上传

直接在 OSS 控制台上传 `dist` 目录下的文件

### 方法2：使用 OSS CLI 工具

```bash
# 安装 ossutil
wget http://gosspublic.alicdn.com/ossutil/1.7.0/ossutil64
chmod 755 ossutil64

# 配置
./ossutil64 config

# 上传文件
./ossutil64 cp -r dist/ oss://chatbot-cdn/
```

### 方法3：使用 Node.js 脚本

创建 `deploy-oss.js`：

```javascript
const OSS = require('ali-oss');
const fs = require('fs');
const path = require('path');

const client = new OSS({
  region: 'oss-cn-hangzhou',
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  accessKeySecret: 'YOUR_ACCESS_KEY_SECRET',
  bucket: 'chatbot-cdn'
});

async function uploadFile(localPath, remotePath) {
  try {
    const result = await client.put(remotePath, localPath);
    console.log(`上传成功: ${result.url}`);
  } catch (e) {
    console.error(`上传失败: ${e}`);
  }
}

// 上传文件
uploadFile(
  './dist/chatbot-widget.iife.js',
  'chatbot-widget.iife.js'
);
```

## 步骤4：配置 CDN 加速（可选）

1. 在阿里云 CDN 控制台添加加速域名
2. 配置源站为你的 OSS Bucket
3. 配置 CNAME 解析

## 步骤5：使用

```html
<!-- 直接使用 OSS 地址 -->
<script src="https://chatbot-cdn.oss-cn-hangzhou.aliyuncs.com/chatbot-widget.iife.js"></script>

<!-- 或使用 CDN 加速域名 -->
<script src="https://cdn.yourdomain.com/chatbot-widget.iife.js"></script>

<script>
  const chatbot = new ChatBotWidget({
    position: 'bottom-right',
    autoOpen: false
  });
  chatbot.init();
</script>
```

## 设置缓存策略

在 OSS 或 CDN 控制台设置 HTTP 头：

```
Cache-Control: max-age=31536000
Access-Control-Allow-Origin: *
```

## 费用

- OSS 存储：约 0.12 元/GB/月
- CDN 流量：约 0.24 元/GB（国内）
- 小型项目基本可以忽略不计

