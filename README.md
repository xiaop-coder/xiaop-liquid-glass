<div align="center">

# 💧 XiaoP Liquid Glass

**小P玻璃设计系统 — iOS 26 Liquid Glass + macOS Frosted Glass + Microsoft Acrylic**

纯 CSS + JS 实现多种玻璃效果的设计系统。零依赖、跨框架、完全响应式，自带深色模式。

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![No Dependencies](https://img.shields.io/badge/dependencies-zero-green.svg)](package.json)
[![CSS3](https://img.shields.io/badge/CSS3-backdrop--filter-orange.svg)]()
[![AI Assisted](https://img.shields.io/badge/AI%20assisted-GLM--5.1-purple.svg)]()

[中文](#中文) · [English](#english) · [日本語](#日本語) · [한국어](#한국어) · [Русский](#русский)

[🎮 在线演示](#-演示) · [🚀 快速开始](#-快速开始) · [🔮 玻璃效果](#-玻璃效果风格) · [📦 组件列表](#-组件列表) · [🎨 CSS变量](#-css变量) · [🙏 致谢](#致谢)

</div>

---

<a id="中文"></a>

## 🇨🇳 中文

### ✨ 特性

- **5 种玻璃效果风格** — 液态玻璃、毛玻璃、亚克力、水晶玻璃、半透明
- **50+ CSS 变量** — 完整的 `--lg-*` 设计令牌系统，每种效果独立变量
- **35+ 组件** — 卡片、按钮、输入框、徽章、警告框、下拉框、弹窗、导航等
- **6 种 JS 交互效果** — 鼠标追光、滚动模糊、点击涟漪、入场动画、页面切换、3D 倾斜
- **自动深色模式** — 跟随 `prefers-color-scheme`，支持变量覆盖
- **自动转换下拉框** — 所有 `<select class="form-select">` 自动转为液态玻璃下拉组件
- **零依赖** — 纯 CSS + 原生 JavaScript，无需任何框架
- **完全响应式** — 移动端优先设计

### 🔮 玻璃效果风格

| 风格 | CSS 类名 | 灵感来源 | 特点 |
|------|----------|----------|------|
| 液态玻璃 | `.glass-card` | Apple iOS 26 | 高饱和模糊 + 顶部高光 + 折射光线 |
| 毛玻璃 | `.frosted-card` | macOS | 中等模糊 + 低饱和度，磨砂质感 |
| 亚克力 | `.acrylic-card` | Microsoft Fluent Design | 高模糊 + 噪点纹理 + 色调叠加 |
| 水晶玻璃 | `.crystal-card` | 高端展示场景 | 高透明 + 强高光 + 棱镜折射线 |
| 半透明 | `.translucent-card` | 信息密集界面 | 极低模糊 + 高透明度 |
| 3D 深度 | `.glass3d` | macOS 液态玻璃 | 多层阴影 + 伪元素高光 + 噪点纹理 |

### 🎮 演示

| 演示 | 说明 |
|------|------|
| [玻璃效果对比](demos/glass-styles.html) | 5 种玻璃效果对比展示、参数对比表、3D 倾斜交互 |
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
  <!-- 液态玻璃卡片 -->
  <div class="glass-card" style="padding: 24px; max-width: 400px; margin: 100px auto;">
    <h2>你好，液态玻璃！</h2>
    <p>这张卡片拥有 iOS 26 液态玻璃效果。</p>
  </div>

  <!-- 毛玻璃卡片 -->
  <div class="frosted-card" style="padding: 24px; max-width: 400px; margin: 20px auto;">
    <h2>毛玻璃效果</h2>
    <p>macOS 风格的磨砂玻璃质感。</p>
  </div>

  <!-- 亚克力卡片 -->
  <div class="acrylic-card" style="padding: 24px; max-width: 400px; margin: 20px auto;">
    <h2>亚克力效果</h2>
    <p>Microsoft Fluent Design 风格，带噪点纹理。</p>
  </div>

  <script src="dist/liquid-glass.js"></script>
</body>
</html>
```

### 📦 组件列表

| 组件 | CSS 类名 | 说明 |
|------|----------|------|
| **玻璃效果卡片** | | |
| 液态玻璃卡片 | `.glass-card` | iOS 26 液态玻璃，高光 + 折射 |
| 毛玻璃卡片 | `.frosted-card` | macOS 磨砂质感 |
| 亚克力卡片 | `.acrylic-card` | Fluent Design，噪点 + 色调 |
| 水晶玻璃卡片 | `.crystal-card` | 高透明 + 棱镜折射线 |
| 半透明卡片 | `.translucent-card` | 极简半透明 |
| 3D 玻璃卡片 | `.glass3d` | 多层阴影 + 伪元素高光 |
| **基础组件** | | |
| 玻璃按钮 | `.glass-button` | 高光覆盖层 + 弹性悬停 |
| 玻璃输入框 | `.glass-input` | 聚焦发光效果 |
| 玻璃导航栏 | `.glass-nav` | 模糊 + 折射光线 |
| 玻璃徽章 | `.glass-badge-*` | success / warning / danger / info |
| 玻璃警告框 | `.glass-alert-*` | 颜色变体通知横幅 |
| 玻璃区块 | `.glass-section` | 可配置玻璃区块 |
| 玻璃标签栏 | `.glass-tab-bar` / `.glass-tab-item` | 分段标签控件 |
| 玻璃搜索框 | `.glass-search-box` | 搜索容器 |
| 玻璃表单框 | `.glass-form-box` | 表单容器 |
| 玻璃页脚 | `.glass-footer` | 页脚 |
| 玻璃遮罩 | `.glass-overlay` | 弹窗遮罩 |
| 玻璃弹窗 | `.glass-modal` | 深度模糊弹窗 |
| 玻璃分割线 | `.glass-divider` | 渐变分割线 |
| 液态下拉框 | `.liquid-glass-dropdown` | 自动转换的 select |
| **效果类** | | |
| 鼠标追光 | `.glass-light-track` | 鼠标跟随径向渐变 |
| 旋转高光 | `.glass-rotating-highlight` | 圆锥渐变旋转（8秒循环） |
| 渐变模糊 | `.glass-variable-blur` | 渐变遮罩模糊 |
| 入场动画 | `.glass-entrance` | IntersectionObserver 淡入 |
| 入场延迟 | `.glass-entrance-delay-1~5` | 入场延迟 |
| 页面切换 | `.glass-page-transition` | 缩放 + 模糊切换动画 |
| 浮动动画 | `.glass-float` | 轻柔浮动（6秒循环） |
| 脉冲发光 | `.glass-pulse-glow` | 双色阴影脉冲 |
| 涟漪效果 | `.glass-ripple-container` | 点击涟漪动画 |
| 淡入淡出 | `.glass-fade-enter` / `.glass-fade-leave` | 淡入淡出 |
| 3D 倾斜 | `.glass-tilt` | 鼠标跟随 3D 倾斜交互 |

### 🎨 CSS变量

所有变量使用 `--lg-*` 前缀，自动支持深色/浅色模式切换：

```css
:root {
  /* 液态玻璃 */
  --lg-glass-bg: rgba(255, 255, 255, 0.65);
  --lg-glass-border: rgba(255, 255, 255, 0.8);

  /* 毛玻璃 */
  --lg-frosted-bg: rgba(255, 255, 255, 0.45);
  --lg-frosted-blur: 20px;

  /* 亚克力 */
  --lg-acrylic-bg: rgba(255, 255, 255, 0.55);
  --lg-acrylic-blur: 30px;
  --lg-acrylic-noise-opacity: 0.03;
  --lg-acrylic-tint: rgba(0, 122, 255, 0.05);

  /* 水晶玻璃 */
  --lg-crystal-bg: rgba(255, 255, 255, 0.75);
  --lg-crystal-border: rgba(255, 255, 255, 0.9);

  /* 半透明 */
  --lg-translucent-bg: rgba(255, 255, 255, 0.2);
  --lg-translucent-blur: 8px;

  /* 主题色 */
  --lg-primary: #007aff;
  --lg-secondary: #8b5cf6;
  /* ... 50+ more variables */
}

@media (prefers-color-scheme: dark) {
  :root {
    --lg-glass-bg: rgba(255, 255, 255, 0.1);
    --lg-frosted-bg: rgba(255, 255, 255, 0.08);
    --lg-acrylic-bg: rgba(255, 255, 255, 0.1);
    --lg-primary: #4cd964;
    /* ... all variables auto-switch */
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
initTiltEffect();         // 3D 倾斜交互（.glass-tilt）

// 动态添加内容后重新初始化：
if (window.initLiquidGlassSelects) window.initLiquidGlassSelects();

// 排除特定 select 不被转换：添加 class "no-liquid-glass"
```

---

<a id="english"></a>

## 🇬🇧 English

### ✨ Features

- **5 Glass Effect Styles** — Liquid Glass, Frosted Glass, Acrylic, Crystal Glass, Translucent
- **50+ CSS Variables** — Complete `--lg-*` design token system with per-style variables
- **35+ Components** — Cards, buttons, inputs, badges, alerts, dropdowns, modals, navigation, and more
- **6 JS Effects** — Mouse tracking, scroll blur, ripple, entrance animations, page transitions, 3D tilt
- **Auto Dark Mode** — Follows `prefers-color-scheme` with full variable override support
- **Auto Select Transform** — All `<select class="form-select">` elements are automatically converted
- **Zero Dependencies** — Pure CSS + vanilla JavaScript, no framework required
- **Fully Responsive** — Mobile-first design with adaptive layouts

### 🔮 Glass Effect Styles

| Style | CSS Class | Inspired By | Key Feature |
|-------|-----------|-------------|-------------|
| Liquid Glass | `.glass-card` | Apple iOS 26 | High saturation blur + highlight + refraction |
| Frosted Glass | `.frosted-card` | macOS | Medium blur + low saturation, matte finish |
| Acrylic | `.acrylic-card` | Microsoft Fluent Design | High blur + noise texture + color tint |
| Crystal Glass | `.crystal-card` | Premium showcases | High transparency + strong highlight + prism line |
| Translucent | `.translucent-card` | Info-dense UIs | Minimal blur + high transparency |
| 3D Depth | `.glass3d` | macOS Liquid Glass | Multi-layer shadows + pseudo-element highlights |

### 🎮 Demos

| Demo | Description |
|------|-------------|
| [Glass Styles](demos/glass-styles.html) | 5 glass effects comparison, parameter table, 3D tilt interaction |
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

### 🛠 JavaScript API

```javascript
initAllSelects();         // Transform all <select class="form-select">
initMouseTracking();      // Mouse light tracking
initScrollBlur();         // Navigation scroll blur
initRippleEffect();       // Click ripple on buttons
initEntranceAnimations(); // IntersectionObserver entrance
initTiltEffect();         // 3D tilt interaction (.glass-tilt)

// After adding dynamic content:
if (window.initLiquidGlassSelects) window.initLiquidGlassSelects();

// Exclude select: add class "no-liquid-glass"
```

---

<a id="日本語"></a>

## 🇯🇵 日本語

### ✨ 特徴

- **5つのガラスエフェクト** — リキッドグラス、フロストグラス、アクリル、クリスタルグラス、半透明
- **50以上のCSS変数** — `--lg-*`プレフィックスによる完全なデザイントークンシステム
- **35以上のコンポーネント** — カード、ボタン、入力、バッジ、アラート、ドロップダウンなど
- **6つのJSエフェクト** — マウストラッキング、スクロールブラー、リップル、エントランスアニメーション、ページ遷移、3Dチルト
- **自動ダークモード** — `prefers-color-scheme`に追従
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

- **5가지 글래스 효과** — 리퀴드 글래스, 프로스티드 글래스, 아크릴, 크리스탈 글래스, 반투명
- **50개 이상의 CSS 변수** — `--lg-*` 접두사를 사용한 완전한 디자인 토큰 시스템
- **35개 이상의 컴포넌트** — 카드, 버튼, 입력, 배지, 알림, 드롭다운 등
- **6가지 JS 효과** — 마우스 추적, 스크롤 블러, 리플, 입장 애니메이션, 페이지 전환, 3D 틸트
- **자동 다크 모드** — `prefers-color-scheme` 따르기
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

- **5 стилей стеклянных эффектов** — Жидкое стекло, матовое стекло, акрил, хрусталь, полупрозрачность
- **50+ CSS-переменных** — Полная система дизайн-токенов с префиксом `--lg-*`
- **35+ компонентов** — Карточки, кнопки, поля ввода, значки, уведомления, выпадающие списки и др.
- **6 JS-эффектов** — Отслеживание мыши, размытие при прокрутке, волна, анимация появления, переходы страниц, 3D-наклон
- **Автоматический тёмный режим** — Следует `prefers-color-scheme`
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

本项目融合了以下优秀开源项目和资源的设计理念：

| 项目 | 贡献 |
|------|------|
| [lucasromerodb/liquid-glass-effect-macos](https://github.com/lucasromerodb/liquid-glass-effect-macos) | 多层 backdrop-filter、伪元素高光、3D 阴影、旋转高光 |
| [shuding/liquid-glass](https://github.com/shuding/liquid-glass) | SVG 滤镜折射、实时鼠标位置追踪 |
| [rdev/liquid-glass-react](https://github.com/rdev/liquid-glass-react) | 组件化设计、渐变高光、弹性缓动、色差效果 |
| [wxperia/liquid-glass-vue](https://github.com/wxperia/liquid-glass-vue) | 鼠标追光、暗色模式、变量模糊、涟漪效果 |
| [liquid-glass.pro](https://www.liquid-glass.pro/) | 设计系统方法论、CSS 变量体系、滚动动画 |
| [JUNGHERZ/GlassKit](https://github.com/JUNGHERZ/GlassKit) | 纯 CSS 组件库、Design Tokens、深浅色模式 |
| [crenspire/glass-ui](https://github.com/crenspire/glass-ui) | Glassmorphic 组件库、发光/微光/涟漪动画 |
| [掘金 - CSS3液态水+毛玻璃实战](https://juejin.cn/post/7552755071567675419) | 液态变形、border-radius 动画、毛玻璃模式 |
| [知乎 - 墨迹：液态玻璃登录卡片](https://zhuanlan.zhihu.com/p/1953594596757071482) | 多层叠加、SVG 滤镜、3D 灵动倾斜交互 |
| [Josh W Comeau - Next-level frosted glass](https://www.joshwcomeau.com/css/backdrop-filter/) | 渐变遮罩模糊、backdrop-filter 深度解析 |

## 🤖 AI 辅助开发 / AI Assisted

本项目在开发过程中使用了 AI 辅助工具：

- **AI 模型**：GLM-5.1（由 Trae IDE 集成）
- **辅助范围**：CSS 组件设计、JS 交互效果实现、代码审查与优化、文档编写
- **人类参与**：项目架构设计、视觉风格决策、最终代码审核均由 XiaoP 完成

> AI 是辅助工具，而非替代品。所有 AI 生成的代码均经过人工审查和调整。

## 📄 License

[MIT](LICENSE) © 2026 XiaoP
