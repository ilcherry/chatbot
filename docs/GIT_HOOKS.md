# Git Hooks 配置说明

本项目已配置 Husky、Commitlint 和 EditorConfig，用于规范代码提交和编辑器配置。

## 📦 已安装的工具

### 1. Husky
Git hooks 管理工具，用于在 git 操作时自动执行脚本。

### 2. Commitlint
用于检查 commit message 是否符合规范。

### 3. EditorConfig
统一不同编辑器的代码格式配置。

## ⚙️ 配置文件

### commitlint.config.js
定义了 commit message 的规范规则，遵循 [Conventional Commits](https://www.conventionalcommits.org/) 标准。

### .husky/
存放 Git hooks 脚本：
- `pre-commit`: 在提交前运行 lint 检查
- `commit-msg`: 在提交时检查 commit message 格式

### .editorconfig
统一代码编辑器的配置：
- 使用 UTF-8 编码
- 使用 LF 换行符
- 使用 2 个空格缩进
- 文件末尾插入空行
- 删除行尾空格

## 📝 Commit Message 规范

提交信息必须遵循以下格式：

```
<type>(<scope>): <subject>
```

### Type 类型

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档变更
- `style`: 代码格式（不影响代码运行的变动）
- `refactor`: 重构（既不是新增功能，也不是修改bug的代码变动）
- `perf`: 性能优化
- `test`: 增加测试
- `chore`: 构建过程或辅助工具的变动
- `revert`: 回滚
- `build`: 构建系统或外部依赖项的更改

### 示例

✅ 正确的 commit message：
```bash
feat: 添加用户登录功能
fix: 修复聊天框滚动问题
docs: 更新 README 文档
style: 格式化代码
refactor: 重构消息组件
perf: 优化图片加载性能
chore: 更新依赖包
```

❌ 错误的 commit message：
```bash
添加登录功能
update
fix bug
WIP
```

## 🚀 使用方式

### 安装依赖后自动激活
```bash
pnpm install
# prepare script 会自动运行，激活 husky
```

### 提交代码
```bash
git add .
git commit -m "feat: 添加新功能"
```

提交时会自动：
1. 运行 `pnpm run lint` 检查代码质量（pre-commit hook）
2. 检查 commit message 格式（commit-msg hook）

如果检查不通过，提交会被阻止，需要修复问题后重新提交。

### 跳过 hooks（不推荐）
在特殊情况下，如果需要跳过 hooks：
```bash
git commit -m "message" --no-verify
```

## 🔧 编辑器支持

### VS Code
推荐安装 EditorConfig 插件：
```
ext install EditorConfig.EditorConfig
```

### WebStorm / IntelliJ IDEA
内置支持 EditorConfig，无需额外配置。

### Vim
安装 editorconfig-vim 插件。

## 📚 参考资料

- [Husky 文档](https://typicode.github.io/husky/)
- [Commitlint 文档](https://commitlint.js.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [EditorConfig 文档](https://editorconfig.org/)

