<div align="center">

# 💧 XiaoP Liquid Glass

**小P液态玻璃 — iOS 26 Liquid Glass 设计系统**

纯 CSS + JS 实现 Apple WWDC 2025 液态玻璃效果的设计系统。零依赖、跨框架、完全响应式，自带深色模式。

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![No Dependencies](https://img.shields.io/badge/dependencies-zero-green.svg)](package.json)
[![CSS3](https://img.shields.io/badge/CSS3-backdrop--filter-orange.svg)]()

[中文](#中文) · [English](#english) · [日本語](#日本語) · [한국어](#한국어) · [Русский](#русский)

[🎮 在线演示](#-演示) · [🚀 快速开始](#-快速开始) · [📦 组件列表](#-组件列表) · [🎨 CSS变量](#-css变量) · [🙏 致谢](#致谢)

</div>

---

<a id="中文"></a>

## 🇨🇳 中文

### ✨ 特性

- **30+ CSS 变量** — 完整的 `--lg-*` 设计令牌系统
- **25+ 组件** — 卡片、按钮、输入框、徽章、警告框、下拉框、弹窗、导航等
- **5 种 JS 交互效果** — 鼠标追光、滚动模糊、点击涟漪、入场动画、页面切换
- **自动深色模式** — 跟随 `prefers-color-scheme`，支持变量覆盖
- **自动转换下拉框** — 所有 `<select class="form-select">` 自动转为液态玻璃下拉组件
- **零依赖** — 纯 CSS + 原生 JavaScript，无需任何框架
- **完全响应式** — 移动端优先设计

### 🎮 演示

| 演示 | 说明 |
|------|------|
| [登录页](demos/login.html) | 液态玻璃登录表单，带图标输入框和弹性动画 |
| [注册页](demos/register.html) | 注册表单，带液态玻璃下拉框和网格布局 |
| [导航页](demos/navigation.html) | 固定导航栏、侧边栏、标签栏组件 |
| [下拉选择](demos/select.html) | 自动转换的选择组件，含动态添加演示 |
| [全部组件](demos/components.html) | 按钮、徽章、警告框、输入框、进度条、3D卡片 |

### 🚀 快速开始

#### 方式一：直接引入

```html
<link rel="stylesheet" href="dist/liquid-glass.css">
<script src="dist/liquid-glass.js"></script>
```

#### 方式二：npm 安装

```bash
npm install xiaop-liquid-glass
```

```html
<link rel="stylesheet" href="node_modules/xiaop-liquid-glass/dist/liquid-glass.css">
<script src="node_modules/xiaop-liquid-glass/dist/liquid-glass.js"></script>
```

#### 最小示例

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="dist/liquid-glass.css">
</head>
<body>
  <div class="glass-card" style="padding: 24px; max-width: 400px; margin: 100px auto;">
    <h2>你好，液态玻璃！</h2>
    <p>这张卡片拥有液态玻璃效果。</p>
    <button class="glass-button">点击我</button>
  </div>
  <script src="dist/liquid-glass.js"></script>
</body>
</html>
```

### 📦 组件列表

| 组件 | CSS 类名 | 说明 |
|------|----------|------|
| 3D 玻璃卡片 | `.glass3d` | 多层阴影 + 伪元素高光 + 噪点纹理 |
| 玻璃卡片 | `.glass-card` | 标准玻璃拟态卡片 |
| 玻璃弹窗 | `.glass-modal` | 深度模糊弹窗 |
| 玻璃按钮 | `.glass-button` | 高光覆盖层 + 弹性悬停 |
| 玻璃输入框 | `.glass-input` | 聚焦发光效果 |
| 玻璃导航栏 | `.glass-nav` | 模糊 + 折射光线 |
| 玻璃徽章 | `.glass-badge` / `.glass-badge-*` | success / warning / danger / info |
| 玻璃警告框 | `.glass-alert` / `.glass-alert-*` | 颜色变体通知横幅 |
| 玻璃区块 | `.glass-section` | 可配置玻璃区块，悬停效果 |
| 玻璃标签栏 | `.glass-tab-bar` / `.glass-tab-item` | 分段标签控件 |
| 玻璃搜索框 | `.glass-search-box` | 搜索容器 |
| 玻璃表单框 | `.glass-form-box` | 表单容器 |
| 玻璃页脚 | `.glass-footer` | 页脚 |
| 玻璃遮罩 | `.glass-overlay` | 弹窗遮罩 |
| 玻璃分割线 | `.glass-divider` | 渐变分割线 |
| 液态下拉框 | `.liquid-glass-dropdown` | 自动转换的 select |
| 鼠标追光 | `.glass-light-track` | 鼠标跟随径向渐变 |
| 旋转高光 | `.glass-rotating-highlight` | 圆锥渐变旋转（8秒循环） |
| 渐变模糊 | `.glass-variable-blur` | 渐变遮罩模糊 |
| 入场动画 | `.glass-entrance` | IntersectionObserver 淡入 |
| 页面切换 | `.glass-page-transition` | 缩放 + 模糊切换动画 |
| 浮动动画 | `.glass-float` | 轻柔浮动（6秒循环） |
| 脉冲发光 | `.glass-pulse-glow` | 双色阴影脉冲 |
| 涟漪效果 | `.glass-ripple-container` | 点击涟漪动画 |

### 🎨 CSS变量

所有变量使用 `--lg-*` 前缀，自动支持深色/浅色模式切换：

```css
:root {
  --lg-bg-gradient-1: #0c0c1d;
  --lg-bg-gradient-2: #1a1a3e;
  --lg-card-bg: rgba(255, 255, 255, 0.1);
  --lg-card-border: rgba(255, 255, 255, 0.18);
  --lg-glass-bg: rgba(255, 255, 255, 0.12);
  --lg-text-primary: #ffffff;
  --lg-primary: #007aff;
  --lg-secondary: #8b5cf6;
}

@media (prefers-color-scheme: light) {
  :root {
    --lg-bg-gradient-1: #e8eaf6;
    --lg-card-bg: rgba(255, 255, 255, 0.6);
    --lg-text-primary: #1a1a2e;
  }
}
```

### 🛠 JavaScript API

```javascript
initAllSelects();         // 转换所有 <select class="form-select">
initMouseTracking();      // 鼠标追光
initScrollBlur();         // 导航栏滚动模糊
initRippleEffect();       // 按钮点击涟漪
initEntranceAnimations(); // IntersectionObserver 入场动画

// 动态添加内容后重新初始化：
if (window.initLiquidGlassSelects) window.initLiquidGlassSelects();

// 排除特定 select 不被转换：添加 class "no-liquid-glass"
```

---

<a id="english"></a>

## 🇬🇧 English

### ✨ Features

- **30+ CSS Variables** — Complete `--lg-*` design token system
- **25+ Components** — Cards, buttons, inputs, badges, alerts, dropdowns, modals, navigation, and more
- **5 JS Effects** — Mouse tracking, scroll blur, ripple, entrance animations, page transitions
- **Auto Dark Mode** — Follows `prefers-color-scheme` with full variable override support
- **Auto Select Transform** — All `<select class="form-select">` elements are automatically converted to liquid glass dropdowns
- **Zero Dependencies** — Pure CSS + vanilla JavaScript, no framework required
- **Fully Responsive** — Mobile-first design with adaptive layouts

### 🎮 Demos

| Demo | Description |
|------|-------------|
| [Login Page](demos/login.html) | Glass morphism login form with icon inputs and elastic animations |
| [Register Page](demos/register.html) | Registration form with glass dropdowns and grid layout |
| [Navigation](demos/navigation.html) | Sticky header, sidebar navigation, and glass tab bar |
| [Select / Dropdown](demos/select.html) | Auto-transformed select components with dynamic add demo |
| [All Components](demos/components.html) | Buttons, badges, alerts, inputs, progress bars, 3D cards |

### 🚀 Quick Start

```html
<link rel="stylesheet" href="dist/liquid-glass.css">
<script src="dist/liquid-glass.js"></script>
```

### 📦 Components

| Component | CSS Class | Description |
|-----------|-----------|-------------|
| 3D Glass Card | `.glass3d` | Multi-layer shadows + pseudo-element highlights + noise texture |
| Glass Card | `.glass-card` | Standard glass morphism card |
| Glass Modal | `.glass-modal` | Modal dialog with deep blur |
| Glass Button | `.glass-button` | Button with highlight overlay and elastic hover |
| Glass Input | `.glass-input` | Text input with focus glow |
| Glass Nav | `.glass-nav` | Navigation bar with blur and refraction line |
| Glass Badge | `.glass-badge-*` | success / warning / danger / info |
| Glass Alert | `.glass-alert-*` | Notification banners with color variants |
| Glass Section | `.glass-section` | Configurable glass section with hover effect |
| Glass Tab Bar | `.glass-tab-bar` | Segmented tab control |
| Liquid Glass Dropdown | `.liquid-glass-dropdown` | Auto-transformed select |
| Mouse Light Track | `.glass-light-track` | Mouse-following radial gradient |
| Rotating Highlight | `.glass-rotating-highlight` | Conic-gradient rotation (8s cycle) |
| Entrance Animation | `.glass-entrance` | IntersectionObserver fade-in |
| Page Transition | `.glass-page-transition` | Scale + blur page switch |
| Float Animation | `.glass-float` | Gentle floating (6s cycle) |
| Pulse Glow | `.glass-pulse-glow` | Dual-color shadow pulse |
| Ripple Effect | `.glass-ripple-container` | Click ripple animation |

### 🎨 CSS Variables

```css
:root {
  --lg-bg-gradient-1: #0c0c1d;
  --lg-card-bg: rgba(255, 255, 255, 0.1);
  --lg-primary: #007aff;
  --lg-secondary: #8b5cf6;
  /* ... 30+ more variables */
}

@media (prefers-color-scheme: light) {
  :root {
    --lg-bg-gradient-1: #e8eaf6;
    --lg-card-bg: rgba(255, 255, 255, 0.6);
    --lg-text-primary: #1a1a2e;
  }
}
```

### 🛠 JavaScript API

```javascript
initAllSelects();         // Transform all <select class="form-select">
initMouseTracking();      // Mouse light tracking
initScrollBlur();         // Navigation scroll blur
initRippleEffect();       // Click ripple on buttons
initEntranceAnimations(); // IntersectionObserver entrance

// After adding dynamic content:
if (window.initLiquidGlassSelects) window.initLiquidGlassSelects();

// Exclude select: add class "no-liquid-glass"
```

---

<a id="日本語"></a>

## 🇯🇵 日本語

### ✨ 特徴

- **30以上のCSS変数** — `--lg-*`プレフィックスによる完全なデザイントークンシステム
- **25以上のコンポーネント** — カード、ボタン、入力、バッジ、アラート、ドロップダウンなど
- **5つのJSエフェクト** — マウストラッキング、スクロールブラー、リップル、エントランスアニメーション、ページ遷移
- **自動ダークモード** — `prefers-color-scheme`に追従
- **自動セレクト変換** — `<select class="form-select">`が自動的にリキッドグラスドロップダウンに変換
- **依存関係ゼロ** — 純粋なCSS + バニラJavaScript
- **完全レスポンシブ** — モバイルファーストデザイン

### 🚀 クイックスタート

```html
<link rel="stylesheet" href="dist/liquid-glass.css">
<script src="dist/liquid-glass.js"></script>
```

---

<a id="한국어"></a>

## 🇰🇷 한국어

### ✨ 특징

- **30개 이상의 CSS 변수** — `--lg-*` 접두사를 사용한 완전한 디자인 토큰 시스템
- **25개 이상의 컴포넌트** — 카드, 버튼, 입력, 배지, 알림, 드롭다운 등
- **5가지 JS 효과** — 마우스 추적, 스크롤 블러, 리플, 입장 애니메이션, 페이지 전환
- **자동 다크 모드** — `prefers-color-scheme` 따르기
- **자동 셀렉트 변환** — `<select class="form-select">`가 자동으로 리퀴드 글래스 드롭다운으로 변환
- **종속성 없음** — 순수 CSS + 바닐라 JavaScript
- **완전 반응형** — 모바일 우선 디자인

### 🚀 빠른 시작

```html
<link rel="stylesheet" href="dist/liquid-glass.css">
<script src="dist/liquid-glass.js"></script>
```

---

<a id="русский"></a>

## 🇷🇺 Русский

### ✨ Особенности

- **30+ CSS-переменных** — Полная система дизайн-токенов с префиксом `--lg-*`
- **25+ компонентов** — Карточки, кнопки, поля ввода, значки, уведомления, выпадающие списки и др.
- **5 JS-эффектов** — Отслеживание мыши, размытие при прокрутке, волна, анимация появления, переходы страниц
- **Автоматический тёмный режим** — Следует `prefers-color-scheme`
- **Автопреобразование select** — `<select class="form-select">` автоматически преобразуется
- **Нулевые зависимости** — Чистый CSS + ванильный JavaScript
- **Полная адаптивность** — Дизайн с приоритетом мобильных устройств

### 🚀 Быстрый старт

```html
<link rel="stylesheet" href="dist/liquid-glass.css">
<script src="dist/liquid-glass.js"></script>
```

---

<a id="致谢"></a>

## 🙏 致谢 / Credits

本项目融合了以下优秀开源项目的设计理念：

| 项目 | 贡献 |
|------|------|
| [lucasromerodb/liquid-glass-effect-macos](https://github.com/lucasromerodb/liquid-glass-effect-macos) | 多层 backdrop-filter、伪元素高光、3D 阴影、旋转高光 |
| [shuding/liquid-glass](https://github.com/shuding/liquid-glass) | SVG 滤镜折射、实时鼠标位置追踪 |
| [rdev/liquid-glass-react](https://github.com/rdev/liquid-glass-react) | 组件化设计、渐变高光、弹性缓动、色差效果 |
| [wxperia/liquid-glass-vue](https://github.com/wxperia/liquid-glass-vue) | 鼠标追光、暗色模式、变量模糊、涟漪效果 |
| [liquid-glass.pro](https://www.liquid-glass.pro/) | 设计系统方法论、CSS 变量体系、滚动动画 |
| [掘金 - CSS3液态水+毛玻璃实战](https://juejin.cn/post/7552755071567675419) | 液态变形、border-radius 动画、毛玻璃模式 |

## 📄 License

[MIT](LICENSE) © 2026 XiaoP
