# XiaoP Liquid Glass v3.0

**终极液态玻璃设计系统 - 融合所有最佳实践**

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![No Dependencies](https://img.shields.io/badge/dependencies-zero-green.svg)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue.svg)]()
[![Version](https://img.shields.io/badge/version-3.0.0-brightgreen.svg)](CHANGELOG.md)

完全重构的模块化液态玻璃系统。核心技术：Canvas SDF 位移贴图 + SVG feDisplacementMap 边缘折射 + 4层渲染架构 + 8种SDF模式 + 20+交互效果 + 50+组件。零依赖、TypeScript支持、Tree-shaking友好。

[🌐 在线演示](https://xiaop-coder.github.io/xiaop-liquid-glass/) · [📖 完整文档](docs/index.html) · [📚 API文档](docs/API.md) · [🎯 快速开始](#-快速开始)

---

## 🌟 核心特性

### 🎨 技术融合

深度融合5个优秀开源项目的核心技术：

| 项目 | 融合技术 |
|------|---------|
| **shuding/liquid-glass** | Canvas SDF 位移贴图生成算法 |
| **lucasromerodb/liquid-glass-effect-macos** | 多层 backdrop-filter 架构 |
| **rdev/liquid-glass-react** | 色差效果和弹性鼠标跟随 |
| **wxperia/liquid-glass-vue** | 着色器效果和主题切换 |
| **liquid-glass.pro** | 设计系统方法论 |

### 🔮 8种SDF折射模式

```javascript
const modes = [
  'standard',   // 标准圆角矩形折射
  'polar',      // 极坐标圆形折射
  'prominent',  // 强化边缘折射
  'frosted',    // 无折射纯模糊
  'diamond',    // 菱形折射
  'hexagon',    // 六边形折射
  'wave',       // 波浪形折射
  'custom'      // 自定义SDF函数
];
```

### 🎭 20+交互效果

#### 鼠标交互
- ✅ 弹性鼠标跟随（方向性缩放）
- ✅ 3D倾斜跟随
- ✅ 鼠标光晕追踪
- ✅ 磁吸效果
- ✅ 涟漪扩散

#### 视觉效果
- ✅ RGB色差分离
- ✅ 旋转高光
- ✅ 渐变遮罩模糊
- ✅ 粒子系统
- ✅ 流体动画

#### 动画效果
- ✅ IntersectionObserver入场
- ✅ 滚动视差
- ✅ 页面转场
- ✅ 弹性缩放
- ✅ 呼吸发光

### 📦 模块化架构

```
src/
├── core/
│   ├── shader.js          # SDF位移贴图生成引擎
│   ├── filter.js       # SVG滤镜构建器
│   └── liquid-glass.js    # 4层液态玻璃核心类
├── effects/
│   ├── mouse.js           # 鼠标交互效果管理器
│   └── animations.js      # 动画效果系统
├── components/        # 组件库（50+组件）
├── utils/         # 工具函数
└── index.js              # 主入口
```

### 🚀 性能优化

- **LRU缓存系统** - 位移贴图智能缓存，避免重复计算
- **RAF节流** - 所有动画使用requestAnimationFrame
- **智能缓存策略** - 最多缓存50个位移贴图
- **可选WebGL加速** - 支持GPU加速渲染
- **Worker线程计算** - 异步生成位移贴图

### 🛠 开发体验

- ✅ **TypeScript完整支持** - 100%类型覆盖
- ✅ **ESM/CJS/UMD** - 三种模块格式
- ✅ **Tree-shaking友好** - 按需引入
- ✅ **零依赖** - 纯原生实现
- ✅ **完整文档** - API文档 + 交互式示例

---

## 🚀 快速开始

### 安装

```bash
npm install xiaop-liquid-glass
```

### 使用

```javascript
import LiquidGlass from 'xiaop-liquid-glass';
import 'xiaop-liquid-glass/dist/liquid-glass.css';

// 一键初始化
LiquidGlass.init({
  effects: true,
  animations: true,
  mouseEffects: {
    elasticFollow: true,
    tilt3D: true,
    glow: true,
    ripple: true
  }
});
```

### HTML

```html
<div class="liquid-glass" data-mode="standard">
  <h2>Hello Liquid Glass 3.0!</h2>
  <p>终极液态玻璃效果</p>
</div>
```

### TypeScript

```typescript
import LiquidGlass, { LiquidGlassOptions } from 'xiaop-liquid-glass';

const element = document.querySelector('.my-glass') as HTMLElement;

const options: LiquidGlassOptions = {
  mode: 'standard',
  scale: 20,
  radius: 16,
  blur: 40
};

const glass = new LiquidGlass(element, options);

// 更新配置
glass.update({ mode: 'polar', scale: 30 });

// 销毁
glass.destroy();
```

---
## 📊 技术指标

| 指标 | 数值 |
|------|------|
| SDF模式 | 8种 |
| 交互效果 | 20+ |
| 组件数量 | 50+ |
| 依赖数量 | 0 |
| 构建大小 | 16KB (UMD) |
| TypeScript | 100%覆盖 |
| 浏览器支持 | Chrome 90+, Firefox 88+, Safari 14+ |
---

## 📖 文档

- [完整文档](docs/index.html)
- [API参考](docs/API.md)
- [更新日志](CHANGELOG.md)
- [贡献指南](CONTRIBUTING.md)
- [发布说明](V3.0-RELEASE-NOTES.md)

---

## 🎮 在线演示

| 演示 | 说明 |
|------|------|
| [v3.0完整展示](demos/v3-showcase.html) | 展示所有8种SDF模式和交互效果 |
| [快速测试](test-v3.html) | 快速测试各种SDF模式切换 |
| [玻璃效果对比](demos/glass-styles.html) | 4种玻璃效果对比展示 |
| [登录页](demos/login.html) | 液态玻璃登录表单 |
| [导航页](demos/navigation.html) | 导航栏、侧边栏、标签栏 |
| [全部组件](demos/components.html) | 按钮、输入框、卡片等组件 |

---

## 🙏 致谢

感谢以下开源项目的启发和技术支持：

- [shuding/liquid-glass](https://github.com/shuding/liquid-glass) - Canvas SDF核心算法
- [lucasromerodb/liquid-glass-effect-macos](https://github.com/lucasromerodb/liquid-glass-effect-macos) - 多层架构设计
- [rdev/liquid-glass-react](https://github.com/rdev/liquid-glass-react) - 高级交互效果
- [wxperia/liquid-glass-vue](https://github.com/wxperia/liquid-glass-vue) - 着色器系统
- [liquid-glass.pro](https://www.liquid-glass.pro/) - 设计系统方法论

---

## 📄 许可证

MIT © 2026 XiaoP

---

**立即体验：** [GitHub仓库](https://github.com/xiaop-coder/xiaop-liquid-glass) | [在线演示](https://xiaop-coder.github.io/xiaop-liquid-glass/)
