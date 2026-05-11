# Contributing to XiaoP Liquid Glass

感谢你对 XiaoP Liquid Glass 的贡献兴趣！

## 开发环境设置

1. Fork 并克隆仓库：
```bash
git clone https://github.com/your-username/xiaop-liquid-glass.git
cd xiaop-liquid-glass
```

2. 安装依赖：
```bash
npm install
```

3. 启动开发服务器：
```bash
npm run dev
```

## 项目结构

```
xiaop-liquid-glass/
├── src/                    # 源代码
│   ├── core/              # 核心功能
│   │   ├── shader.js      # SDF 和位移贴图
│   │   ├── filter.js      # SVG 滤镜构建
│   │   └── liquid-glass.js # 4层结构初始化
│   ├── components/        # 组件
│   │   └── select.js      # 下拉框组件
│   ├── effects/           # 交互效果
│   │   ├── mouse.js       # 鼠标交互
│   │   └── animations.js  # 动画效果
│   ├── utils/             # 工具函数
│   │   └── helpers.js     # 辅助函数
│   └── index.js           # 主入口
├── dist/                  # 构建输出
├── demos/                 # 演示页面
└── docs/                  # 文档站点
```

## 开发流程

1. 创建新分支：
```bash
git checkout -b feature/your-feature-name
```

2. 进行修改并测试

3. 运行代码检查：
```bash
npm run lint
npm run format
```

4. 构建项目：
```bash
npm run build
```

5. 提交更改：
```bash
git add .
git commit -m "feat: add your feature description"
```

6. 推送并创建 Pull Request

## 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式（不影响功能）
- `refactor:` 重构
- `perf:` 性能优化
- `test:` 测试相关
- `chore:` 构建/工具相关

## 代码规范

- 使用 ESLint 和 Prettier
- 遵循项目现有代码风格
- 添加必要的注释（JSDoc）
- 保持函数简洁，单一职责

## 测试

- 在多个浏览器中测试（Chrome、Firefox、Safari、Edge）
- 测试响应式布局
- 测试深色/浅色模式
- 确保无控制台错误

## Pull Request 检查清单

- [ ] 代码通过 lint 检查
- [ ] 构建成功
- [ ] 在浏览器中测试通过
- [ ] 更新了相关文档
- [ ] 提交信息符合规范

## 问题反馈

如果发现 bug 或有功能建议，请在 [GitHub Issues](https://github.com/xiaop-coder/xiaop-liquid-glass/issues) 中提交。

## 许可证

通过贡献代码，你同意你的贡献将在 MIT 许可证下发布。
