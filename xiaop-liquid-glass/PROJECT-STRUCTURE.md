# XiaoP Liquid Glass v3.0 - 项目结构

## 📁 目录结构

```
xiaop-liquid-glass/
├── .github/              # GitHub配置
│   └── workflows/        # CI/CD工作流
├── src/                # 源代码
│   ├── core/            # 核心功能
│   │   ├── shader.js    # SDF位移贴图生成引擎
│   │   ├── filter.js    # SVG滤镜构建器
│   │   └── liquid-glass.js  # 4层液态玻璃核心类
│   ├── effects/         # 交互效果
│   │   ├── mouse.js     # 鼠标交互效果管理器
│   │   └── animations.js    # 动画效果系统
│   ├── components/      # 组件库
│   │   └── select.js    # 下拉选择组件
│   ├── utils/           # 工具函数
│   │   └── helpers.js   # 辅助函数
│   ├── index.js         # 主入口
│   └── liquid-glass.css # 样式文件
├── dist/                # 构建产物
│   ├── liquid-glass.js      # UMD格式 (16KB)
│   ├── liquid-glass.esm.js  # ESM格式 (13KB)
│   ├── liquid-glass.cjs.js  # CommonJS格式 (13KB)
│   ├── liquid-glass.css     # 样式文件 (3.7KB)
│   ├── liquid-glass.d.ts    # TypeScript类型定义
│   └── *.map                # Source maps
├── demos/               # 演示页面
│   ├── v3-showcase.html     # v3.0完整展示
│   ├── glass-styles.html    # 玻璃效果对比
│   ├── login.html           # 登录页演示
│   ├── register.html        # 注册页演示
│   ├── navigation.html    # 导航页演示
│   ├── select.html          # 下拉选择演示
│   ├── components.html      # 组件库演示
│   ├── liquid-glass-player.html  # 音乐播放器
│   └── generator.html       # 在线生成器
├── docs/                # 文档
│   ├── index.html   # 文档主页
│   ├── API.md           # API文档
│   └── assets/          # 文档资源
├── index.html           # 项目主页
├── test-v3.html         # 快速测试页面
├── package.json         # npm配置
├── rollup.config.js     # Rollup构建配置
├── .eslintrc.js         # ESLint配置
├── .prettierrc        # Prettier配置
├── .editorconfig        # 编辑器配置
├── .gitignore       # Git忽略文件
├── README.md          # 项目说明
├── CHANGELOG.md      # 更新日志
├── CONTRIBUTING.md      # 贡献指南
├── LICENSE              # MIT许可证
├── V3.0-RELEASE-NOTES.md    # v3.0发布说明
└── PROJECT-SUMMARY.md   # 项目总结
```

## 📦 核心文件说明
### 源代码 (src/)

#### core/ - 核心功能
- **shader.js** (约400行)
  - Shader类：SDF位移贴图生成引擎
  - 8种SDF算法：roundedRectSDF, polarCircleSDF, diamondSDF, hexagonSDF, waveSDF等
  - LRU缓存系统
  - Canvas 2D位移贴图生成

- **filter.js** (约150行)
  - Filter类：SVG滤镜构建器
  - createSVGFilter：创建feDisplacementMap滤镜
  - createChromaticFilter：创建RGB色差滤镜
  - 动态SVG元素管理

- **liquid-glass.js** (约200行)
  - LiquidGlass类：4层液态玻璃核心
  - 4层结构：outer + cover + sharp + reflect
  - 自动初始化和配置管理
  - 实例生命周期管理

#### effects/ - 交互效果
- **mouse.js** (约150行)
  - MouseEffects类：鼠标交互管理器
  - 弹性跟随、3D倾斜、光晕、磁吸、涟漪
  - RAF优化的动画循环

- **animations.js** (约120行)
  - Animations类：动画效果系统
  - IntersectionObserver入场动画
  - 滚动视差、呼吸发光、旋转高光
  - 页面转场、弹性缩放

#### components/ - 组件库
- **select.js**
  - 自动转换的下拉选择组件

#### utils/ - 工具函数
- **helpers.js**
  - 辅助函数和工具方法

#### 主入口
- **index.js** (约50行)
  - 导出所有模块
  - 全局初始化函数
  - 版本信息

- **liquid-glass.css** (约200行)
  - CSS变量系统
  - 4层结构样式
  - 交互效果样式
  - 响应式设计

### 构建产物 (dist/)

- **liquid-glass.js** - UMD格式，浏览器直接使用
- **liquid-glass.esm.js** - ESM格式，现代打包工具
- **liquid-glass.cjs.js** - CommonJS格式，Node.js环境
- **liquid-glass.css** - 完整样式文件
- **liquid-glass.d.ts** - TypeScript类型定义

### 演示页面 (demos/)

9个完整的演示页面，展示各种使用场景和效果。

### 文档 (docs/)

- 完整的文档站点
- API参考文档
- 使用指南和示例

## 🔧 开发工作流

### 开发
```bash
npm run dev          # 启动开发服务器
npm run build:watch  # 监听模式构建
```

### 构建
```bash
npm run build        # 构建所有格式
```

### 代码质量
```bash
npm run lint       # ESLint检查
npm run lint:fix     # 自动修复
npm run format       # Prettier格式化
```

### 测试
```bash
npm test           # 运行测试
npm run test:watch   # 监听模式测试
npm run test:coverage # 测试覆盖率
```

## 📊 代码统计

- **总代码行数**: 1,012行JavaScript
- **核心模块**: 7个文件
- **SDF算法**: 8种
- **交互效果**: 20+
- **演示页面**: 9个
- **文档文件**: 5个Markdown

## 🎯 关键技术点

1. **SDF算法** - 8种有向距离场算法
2. **Canvas 2D** - 位移贴图生成
3. **SVG Filters** - feDisplacementMap边缘折射
4. **4层架构** - outer/cover/sharp/reflect
5. **LRU缓存** - 智能缓存策略
6. **RAF优化** - 所有动画使用requestAnimationFrame
7. **模块化** - ESM/CJS/UMD三种格式
8. **TypeScript** - 100%类型覆盖

## 📝 维护说明

### 添加新的SDF模式
1. 在 `src/core/shader.js` 中添加新的SDF函数
2. 在 `generateDisplacementMap` 方法中添加case分支
3. 更新文档和示例

### 添加新的交互效果
1. 在 `src/effects/` 中创建新的效果类
2. 在 `src/index.js` 中导出
3. 更新CSS样式
4. 添加演示页面

### 添加新组件
1. 在 `src/components/` 中创建组件文件
2. 实现组件逻辑
3. 添加样式到 `src/liquid-glass.css`
4. 更新文档

## 🚀 发布流程

1. 更新版本号 (`package.json`)
2. 更新 `CHANGELOG.md`
3. 运行 `npm run build`
4. 运行测试 `npm test`
5. 提交代码
6. 创建Git标签 `git tag v3.x.x`
7. 推送到GitHub `git push origin main --tags`
8. 发布到npm `npm publish`

---

**项目地址**: https://github.com/xiaop-coder/xiaop-liquid-glass
**版本**: v3.0.0
**更新日期**: 2026-05-11
