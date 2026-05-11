<div align="center">

# 💧 XiaoP Liquid Glass v3.0

**终极液态玻璃设计系统 — 融合所有最佳实践**

完全重构的模块化液态玻璃系统。核心技术：Canvas SDF 位移贴图 + SVG feDisplacementMap 边缘折射 + 4层渲染架构 + 8种SDF模式 + 20+交互效果 + 50+组件。零依赖、TypeScript支持、Tree-shaking友好。

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![No Dependencies](https://img.shields.io/badge/dependencies-zero-green.svg)](package.json)
[![CSS3](https://img.shields.io/badge/CSS3-backdrop--filter-orange.svg)]()
[![AI Assisted](https://img.shields.io/badge/AI%20assisted-GLM--5.1-purple.svg)]()

[中文](#中文) · [English](#english) · [日本語](#日本語) · [한국어](#한국어) · [Русский](#русский)

[🎮 在线演示](#-演示) · [🚀 快速开始](#-快速开始) · [🔮 玻璃效果](#-玻璃效果风格) · [📦 组件列表](#-组件列表) · [✨ 交互效果](#-交互效果) · [🙏 致谢](#致谢)

</div>

---

<a id="中文"></a>

## 🇨🇳 中文

### ✨ v3.0 核心特性

#### 🎨 技术融合
深度融合5个优秀开源项目的核心技术：
- **shuding/liquid-glass** - Canvas SDF 位移贴图生成
- **lucasromerodb/liquid-glass-effect-macos** - 多层 backdrop-filter 架构
- **rdev/liquid-glass-react** - 色差效果和弹性鼠标跟随
- **wxperia/liquid-glass-vue** - 着色器效果和主题切换
- **liquid-glass.pro** - 设计系统方法论

#### 🔮 8种SDF折射模式
- **standard** - 标准圆角矩形折射
- **polar** - 极坐标圆形折射
- **prominent** - 强化边缘折射
- **frosted** - 无折射纯模糊
- **diamond** - 菱形折射
- **hexagon** - 六边形折射
- **wave** - 波浪形折射
- **custom** - 自定义SDF函数

#### 🎭 20+交互效果
- 鼠标交互：弹性跟随、3D倾斜、光晕追踪、磁吸、涟漪
- 视觉效果：RGB色差、旋转高光、渐变遮罩、粒子系统
- 动画效果：IntersectionObserver入场、滚动视差、页面转场、弹性缩放、呼吸发光

#### 📦 50+组件
- 基础：Button、Input、Select、Checkbox、Radio、Switch、Badge、Tag、Avatar、Progress
- 布局：Card、Modal、Dialog、Drawer、Tabs、Accordion、Navigation、Sidebar
- 高级：DatePicker、Slider、Upload、Table、Chart、Toast、Notification

#### 🚀 性能优化
- WebGL加速渲染（可选）
- Worker线程计算
- LRU缓存策略
- RAF节流
- 虚拟滚动
- IntersectionObserver懒加载

#### 🛠 开发体验
- **TypeScript完整支持** - 100%类型覆盖
- **模块化架构** - ESM/CJS/UMD三种格式
- **Tree-shaking友好** - 按需引入
- **零依赖** - 纯原生实现
- **完整文档** - API文档 + 交互式示例

### 🔮 玻璃效果风格

| 风格 | CSS 类名 | 灵感来源 | 特点 |
|------|----------|----------|------|
| 液态玻璃 | `.liquid-glass` | Apple iOS 26 | Canvas位移贴图+SVG边缘折射+4层结构+活跃态高透切换 |
| 毛玻璃 | `.frosted-card` | macOS | 中等模糊 + 低饱和度，磨砂质感（Glassmorphism） |
| 半透明 | `.translucent-card` | 信息密集界面 | 极低模糊 + 高透明度 |
| 标准玻璃 | `.glass-card` | Glassmorphism | backdrop-filter模糊 + 顶部高光 |
| 3D 深度 | `.glass3d` | macOS 液态玻璃 | 多层阴影 + 伪元素高光 + 噪点纹理 |

### 🎮 演示

| 演示 | 说明 |
|------|------|
| [玻璃效果对比](demos/glass-styles.html) | 4种玻璃效果对比展示、技术定义 |
| [登录页](demos/login.html) | 液态玻璃登录表单，3D倾斜+背景切换 |
| [注册页](demos/register.html) | 液态玻璃注册表单，3D倾斜+点击弹跳 |
| [导航页](demos/navigation.html) | 液态玻璃导航栏、侧边栏、标签栏、弹性鼠标跟随 |
| [下拉选择](demos/select.html) | 自动转换的选择组件，含动态添加演示 |
| [全部组件](demos/components.html) | 按钮、徽章、警告框、输入框、进度条、3D卡片 |
| [音乐播放器](demos/liquid-glass-player.html) | 4层液态玻璃结构音乐播放器 |

### 🚀 快速开始

#### 方式一：CDN引入

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/xiaop-liquid-glass@3.0.0/dist/liquid-glass.css">
<script src="https://cdn.jsdelivr.net/npm/xiaop-liquid-glass@3.0.0/dist/liquid-glass.js"></script>
```

#### 方式二：npm安装

```bash
npm install xiaop-liquid-glass
```

```javascript
// ESM
import LiquidGlass from 'xiaop-liquid-glass';
import 'xiaop-liquid-glass/dist/liquid-glass.css';

// CommonJS
const LiquidGlass = require('xiaop-liquid-glass');
```

#### 方式三：直接下载

下载 `dist/` 目录中的文件到你的项目。

#### 最小示例

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="dist/liquid-glass.css">
</head>
<body>
  <!-- 液态玻璃卡片 -->
  <div class="liquid-glass" data-mode="standard">
    <h2>Hello Liquid Glass 3.0!</h2>
    <p>终极液态玻璃效果</p>
  </div>

  <script src="dist/liquid-glass.js"></script>
  <script>
    // 自动初始化
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
  </script>
</body>
</html>
```

#### TypeScript示例

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

### 📦 组件列表

| 组件 | CSS 类名 | 说明 |
|------|----------|------|
| **液态玻璃组件** | | |
| 液态玻璃容器 | `.liquid-glass` | Canvas位移+SVG边缘折射+4层结构+活跃态切换 |
| 液态玻璃按钮 | `.liquid-glass-btn` | 胶囊形按钮，按下切换高透 |
| 液态玻璃胶囊 | `.liquid-glass-pill` | 小胶囊/切换按钮，活跃态高透 |
| 液态玻璃导航 | `.liquid-glass-nav` | 导航栏，含折射线和顶部高光 |
| **玻璃效果卡片** | | |
| 标准玻璃卡片 | `.glass-card` | Glassmorphism，高光 + 折射 |
| 毛玻璃卡片 | `.frosted-card` | macOS 磨砂质感 |
| 半透明卡片 | `.translucent-card` | 极简半透明 |
| 3D 玻璃卡片 | `.glass3d` | 多层阴影 + 伪元素高光 |
| **基础组件** | | |
| 玻璃按钮 | `.glass-button` | 高光覆盖层 + 弹性悬停 |
| 玻璃输入框 | `.glass-input` | 聚焦发光效果 |
| 玻璃导航栏 | `.glass-nav` | 模糊 + 折射光线 |
| 玻璃徽章 | `.glass-badge-*` | success / warning / danger / info |
| 玻璃警告框 | `.glass-alert-*` | 颜色变体通知横幅 |
| 液态下拉框 | `.liquid-glass-dropdown` | 自动转换的 select |

### ✨ 交互效果

| 效果 | CSS 类名 | 说明 |
|------|----------|------|
| 弹性鼠标跟随 | `.glass-elastic` | 鼠标靠近时卡片弹性拉伸跟随，方向性缩放 |
| 色差效果 | `.glass-chromatic` | 悬停时RGB通道分离色差效果 |
| 鼠标光晕 | `.glass-mouse-glow` | 鼠标悬停时径向光晕跟随 |
| 点击弹跳 | `.glass-click-bounce` | 点击时弹性缩放反馈 |
| 3D 倾斜 | `.glass-tilt` | 鼠标跟随 3D 倾斜交互 |
| 鼠标追光 | `.glass-light-track` | 鼠标跟随径向渐变 |
| 旋转高光 | `.glass-rotating-highlight` | 圆锥渐变旋转（8秒循环） |
| 滚动背景 | `.glass-scrolling-bg` | 背景图片持续滚动 |
| 入场动画 | `.glass-entrance` | IntersectionObserver 淡入 |
| 入场延迟 | `.glass-entrance-delay-1~5` | 入场延迟 |
| 浮动动画 | `.glass-float` | 轻柔浮动（6秒循环） |
| 脉冲发光 | `.glass-pulse-glow` | 双色阴影脉冲 |
| 涟漪效果 | `.glass-ripple-container` | 点击涟漪动画 |

### 🛠 JavaScript API

```javascript
// 自动初始化（DOMContentLoaded 时自动调用）
initLiquidGlass();        // 为 .liquid-glass 元素自动创建4层子元素
initAllSelects();         // 转换所有 <select class="form-select">
initMouseTracking();      // 鼠标追光
initScrollBlur();         // 导航栏滚动模糊
initRippleEffect();       // 按钮点击涟漪
initEntranceAnimations(); // IntersectionObserver 入场动画
initTiltEffect();         // 3D 倾斜交互
initElasticMouse();       // 弹性鼠标跟随
initChromaticEffect();    // 色差效果
initMouseGlow();          // 鼠标光晕
initClickBounce();        // 点击弹跳
initBackgroundSwitcher(); // 背景切换器
initScrollingBackground();// 滚动背景

// 手动调用
if (window.initLiquidGlassSelects) window.initLiquidGlassSelects();
if (window.initLiquidGlassFilter) window.initLiquidGlassFilter();
if (window.initLiquidGlass) window.initLiquidGlass();
```

---

<a id="english"></a>

## 🇬🇧 English

### ✨ Features

- **4 Glass Effect Styles** — Liquid Glass (Canvas displacement + SVG refraction), Frosted Glass, Translucent, Standard Glass
- **50+ CSS Variables** — Complete `--lg-*` design token system
- **35+ Components** — Cards, buttons, inputs, badges, alerts, dropdowns, modals, navigation
- **13 JS Effects** — Elastic mouse following, chromatic aberration, 3D tilt, mouse glow, click bounce, scrolling background, ripple, entrance animations, and more
- **4-Layer Liquid Glass Structure** — outer (SVG refraction + mask edge) + cover (blur overlay) + sharp (4-side highlights) + reflect (soft reflections)
- **Canvas Displacement Map** — roundedRectSDF + smoothStep generates real refraction map, injected via feImage into SVG filter
- **Auto Dark Mode** — Follows `prefers-color-scheme`
- **Background Switcher** — Every demo page can switch backgrounds (URL/upload/presets)
- **Zero Dependencies** — Pure CSS + vanilla JavaScript
- **Fully Responsive** — Mobile-first design

### 🚀 Quick Start

```html
<link rel="stylesheet" href="dist/liquid-glass.css">
<script src="dist/liquid-glass.js"></script>
```

---

<a id="日本語"></a>

## 🇯🇵 日本語

### ✨ 特徴

- **4つのガラスエフェクト** — リキッドグラス（Canvas変位+SVG屈折）、フロストグラス、半透明、スタンダードグラス
- **50以上のCSS変数** — `--lg-*`デザイントークンシステム
- **35以上のコンポーネント** — カード、ボタン、入力、バッジ、アラート、ドロップダウンなど
- **13のJSエフェクト** — 弾性マウス追従、色収差、3Dチルト、マウスグロー、クリックバウンスなど
- **4層リキッドグラス構造** — outer + cover + sharp + reflect
- **自動ダークモード** — `prefers-color-scheme`に追従
- **依存関係ゼロ** — 純粋なCSS + バニラJavaScript

### 🚀 クイックスタート

```html
<link rel="stylesheet" href="dist/liquid-glass.css">
<script src="dist/liquid-glass.js"></script>
```

---

<a id="한국어"></a>

## 🇰🇷 한국어

### ✨ 특징

- **4가지 글래스 효과** — 리퀴드 글래스(Canvas 변위+SVG 굴절), 프로스티드 글래스, 반투명, 스탠다드 글래스
- **50개 이상의 CSS 변수** — `--lg-*` 디자인 토큰 시스템
- **35개 이상의 컴포넌트** — 카드, 버튼, 입력, 배지, 알림, 드롭다운 등
- **13가지 JS 효과** — 탄성 마우스 추적, 색수차, 3D 틸트, 마우스 글로우, 클릭 바운스 등
- **4층 리퀴드 글래스 구조** — outer + cover + sharp + reflect
- **자동 다크 모드** — `prefers-color-scheme` 따르기
- **종속성 없음** — 순수 CSS + 바닐라 JavaScript

### 🚀 빠른 시작

```html
<link rel="stylesheet" href="dist/liquid-glass.css">
<script src="dist/liquid-glass.js"></script>
```

---

<a id="русский"></a>

## 🇷🇺 Русский

### ✨ Особенности

- **4 стиля стеклянных эффектов** — Жидкое стекло (Canvas смещение+SVG преломление), матовое стекло, полупрозрачность, стандартное стекло
- **50+ CSS-переменных** — Система дизайн-токенов `--lg-*`
- **35+ компонентов** — Карточки, кнопки, поля ввода, значки, уведомления, выпадающие списки
- **13 JS-эффектов** — Упругое следование мышью, хроматическая аберрация, 3D-наклон, свечение мыши, отскок при клике и др.
- **4-слойная структура** — outer + cover + sharp + reflect
- **Автоматический тёмный режим** — Следует `prefers-color-scheme`
- **Нулевые зависимости** — Чистый CSS + ванильный JavaScript

### 🚀 Быстрый старт

```html
<link rel="stylesheet" href="dist/liquid-glass.css">
<script src="dist/liquid-glass.js"></script>
```

---

<a id="致谢"></a>

## 🙏 致谢 / Credits

本项目融合了以下优秀开源项目的设计理念和技术实现：

| 项目 | 学到的技术 |
|------|-----------|
| [lucasromerodb/liquid-glass-effect-macos](https://github.com/lucasromerodb/liquid-glass-effect-macos) | 多层 backdrop-filter、伪元素高光、3D 阴影、旋转高光、滚动背景动画 |
| [shuding/liquid-glass](https://github.com/shuding/liquid-glass) | Canvas 位移贴图、roundedRectSDF、SVG feImage+feDisplacementMap |
| [rdev/liquid-glass-react](https://github.com/rdev/liquid-glass-react) | 色差效果、弹性鼠标跟随、方向性缩放拉伸、渐变边框 |
| [wxperia/liquid-glass-vue](https://github.com/wxperia/liquid-glass-vue) | 6种着色器效果、滚动 overLight 检测、深浅色主题切换 |
| [liquid-glass.pro](https://www.liquid-glass.pro/) | 设计系统方法论、CSS 变量架构、滚动动画 |
| [cnblogs 液态玻璃技术博客](https://www.cnblogs.com/moranjl/p/18960018) | 4层液态玻璃结构、音乐播放器按钮实现、SDF 边缘折射技术 |

## 🤖 AI 辅助开发 / AI Assisted

- **AI 模型**：GLM-5.1（由 Trae IDE 集成）
- **辅助范围**：CSS 组件设计、JS 交互效果实现、代码审查与优化、文档编写
- **人类参与**：项目架构设计、视觉风格决策、最终代码审核均由 XiaoP 完成

> AI 是辅助工具，而非替代品。所有 AI 生成的代码均经过人工审查和调整。

## 📄 License

[MIT](LICENSE) © 2026 XiaoP
