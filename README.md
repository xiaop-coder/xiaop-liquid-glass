# 🌊 XiaoP Liquid Glass v3.0

**终极液态玻璃设计系统 - 融合所有最佳实践**

> ⚠️ **声明：** 这是一个个人使用AI辅助开发的娱乐项目，仅供学习和交流使用。项目灵感来源于多个优秀的开源液态玻璃效果实现，通过AI工具整合和优化而成。

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![No Dependencies](https://img.shields.io/badge/dependencies-zero-green.svg)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue.svg)]()
[![Version](https://img.shields.io/badge/version-3.0.0-brightgreen.svg)](https://github.com/xiaop-coder/xiaop-liquid-glass)

完全重构的模块化液态玻璃系统。核心技术：Canvas SDF 位移贴图 + SVG feDisplacementMap 边缘折射 + 4层渲染架构 + 8种SDF模式 + 20+交互效果 + 50+组件。零依赖、TypeScript支持、Tree-shaking友好。

[🌐 在线演示](https://xiaop-coder.github.io/xiaop-liquid-glass/) · [📖 完整文档](docs/index.html) · [🎯 快速开始](#-快速开始)

---

## ✨ 特性亮点

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
│   ├── filter.js          # SVG滤镜构建器
│   └── liquid-glass.js    # 4层液态玻璃核心类
├── effects/
│   ├── mouse.js           # 鼠标交互效果管理器
│   └── animations.js      # 动画效果系统
├── components/            # 组件库（50+组件）
├── utils/                 # 工具函数
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

### 引入文件

```html
<link rel="stylesheet" href="dist/liquid-glass.css">
<script src="dist/liquid-glass.js"></script>
```

### 基础使用

```javascript
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

### JavaScript API

```javascript
const element = document.querySelector('.my-glass');

const options = {
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

## 📖 API 文档

### LiquidGlass 类

主要的液态玻璃类，负责创建和管理液态玻璃效果。

#### 构造函数

```javascript
new LiquidGlass(element, options)
```

**参数:**
- `element` (HTMLElement) - 目标DOM元素
- `options` (Object) - 配置选项
  - `mode` (string) - SDF模式: 'standard' | 'polar' | 'prominent' | 'frosted' | 'diamond' | 'hexagon' | 'wave' | 'custom'
  - `scale` (number) - 位移强度，默认 20
  - `radius` (number) - 圆角半径，默认 16
  - `blur` (number) - 模糊程度，默认 40
  - `customSDF` (Function) - 自定义SDF函数
  - `enableEffects` (boolean) - 是否启用效果，默认 true

#### 方法

##### `update(options)`

更新液态玻璃配置。

```javascript
glass.update({
  mode: 'polar',
  scale: 30
});
```

##### `destroy()`

销毁液态玻璃实例，清理资源。

```javascript
glass.destroy();
```

### Shader 类

SDF位移贴图生成器。

#### 方法

##### `generateDisplacementMap(width, height, radius, mode, scale, customSDF)`

生成位移贴图。

**参数:**
- `width` (number) - 宽度
- `height` (number) - 高度
- `radius` (number) - 圆角半径
- `mode` (string) - SDF模式
- `scale` (number) - 位移强度
- `customSDF` (Function) - 自定义SDF函数

**返回:** Data URL字符串

**示例:**

```javascript
const shader = new Shader();
const mapURL = shader.generateDisplacementMap(300, 200, 16, 'standard', 20);
```

##### SDF 函数

- `roundedRectSDF(x, y, width, height, radius)` - 圆角矩形SDF
- `polarCircleSDF(x, y, radius)` - 极坐标圆形SDF
- `diamondSDF(x, y, size)` - 菱形SDF
- `hexagonSDF(x, y, radius)` - 六边形SDF
- `waveSDF(x, y, width, height, radius, frequency, amplitude)` - 波浪形SDF

##### `clearCache()`

清除位移贴图缓存。

### Filter 类

SVG滤镜构建器。

#### 方法

##### `createSVGFilter(displacementMapURL, scale)`

创建SVG位移滤镜。

**参数:**
- `displacementMapURL` (string) - 位移贴图URL
- `scale` (number) - 位移强度

**返回:** 滤镜URL字符串 `url(#liquid-glass-filter)`

##### `createChromaticFilter(offset)`

创建色差滤镜。

**参数:**
- `offset` (number) - 色差偏移量，默认 2

**返回:** 滤镜URL字符串

---

## 📊 技术指标

| 指标 | 数值 |
|------|------|
| SDF模式 | 8种 |
| 交互效果 | 20+ |
| 组件数量 | 50+ |
| 依赖数量 | 0 |
| 构建大小 | 16KB (UMD) / 13KB (ESM) |
| TypeScript | 100%覆盖 |
| 浏览器支持 | Chrome 90+, Firefox 88+, Safari 14+ |

---

## 🎮 在线演示

| 演示 | 说明 |
|------|------|
| [首页](index.html) | 项目首页和快速开始 |
| [v3.0完整展示](demos/v3-showcase.html) | 展示所有8种SDF模式和交互效果 |
| [玻璃效果对比](demos/glass-styles.html) | 液态玻璃、毛玻璃、半透明等效果对比 |
| [组件库](demos/components.html) | 按钮、徽章、表单、进度条等组件 |
| [登录页](demos/login.html) | 液态玻璃登录表单 |
| [注册页](demos/register.html) | 液态玻璃注册表单 |
| [导航页](demos/navigation.html) | 导航栏、侧边栏、标签栏 |
| [下拉选择](demos/select.html) | 自动转换的液态玻璃下拉框 |
| [交互式生成器](demos/generator.html) | 实时调整参数并生成代码 |

---

## 📦 构建产物

```
dist/
├── liquid-glass.js         # UMD格式（16KB）
├── liquid-glass.esm.js     # ESM格式（13KB）
├── liquid-glass.cjs.js     # CommonJS格式（13KB）
├── liquid-glass.css        # 样式文件（3.7KB）
├── liquid-glass.d.ts       # TypeScript类型定义
└── ...                     # 其他构建文件
```

---

## 🏗️ 项目结构

```
xiaop-liquid-glass/
├── src/                    # 源代码
│   ├── core/              # 核心功能
│   ├── effects/           # 交互效果
│   ├── components/        # 组件库
│   └── utils/             # 工具函数
├── dist/                  # 构建产物
├── demos/                 # 演示页面
├── docs/                  # 文档
├── index.html             # 项目首页
├── package.json           # 项目配置
├── rollup.config.js       # 构建配置
└── README.md              # 本文档
```

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

## 🔗 链接

- **GitHub仓库**: [https://github.com/xiaop-coder/xiaop-liquid-glass](https://github.com/xiaop-coder/xiaop-liquid-glass)
- **在线演示**: [https://xiaop-coder.github.io/xiaop-liquid-glass/](https://xiaop-coder.github.io/xiaop-liquid-glass/)

---

**立即体验液态玻璃的魅力！** 🌊✨
