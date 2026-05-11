# XiaoP Liquid Glass v3.0 - API 文档

## 核心类

### LiquidGlass

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

**示例:**

```javascript
const element = document.querySelector('.my-glass');
const glass = new LiquidGlass(element, {
  mode: 'standard',
  scale: 20,
  radius: 16,
  blur: 40
});
```

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

---

### Shader

SDF位移贴图生成器。

#### 构造函数

```javascript
new Shader(options)
```

**参数:**
- `options.maxCacheSize` (number) - 最大缓存数量，默认 50

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

##### `roundedRectSDF(x, y, width, height, radius)`

圆角矩形SDF函数。

##### `polarCircleSDF(x, y, radius)`

极坐标圆形SDF函数。

##### `diamondSDF(x, y, size)`

菱形SDF函数。

##### `hexagonSDF(x, y, radius)`

六边形SDF函数。

##### `waveSDF(x, y, width, height, radius, frequency, amplitude)`

波浪形SDF函数。

##### `clearCache()`

清除位移贴图缓存。

---

### Filter

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

##### `removeFilter()`

移除滤镜。

---

### MouseEffects

鼠标交互效果管理器。

#### 构造函数

```javascript
new MouseEffects(element, options)
```

**参数:**
- `element` (HTMLElement) - 目标元素
- `options` (Object) - 配置选项
  - `elasticFollow` (boolean) - 弹性跟随，默认 true
  - `tilt3D` (boolean) - 3D倾斜，默认 true
  - `glow` (boolean) - 光晕效果，默认 true
  - `magnetic` (boolean) - 磁吸效果，默认 false
  - `ripple` (boolean) - 涟漪效果，默认 false

**示例:**

```javascript
const effects = new MouseEffects(element, {
  elasticFollow: true,
  tilt3D: true,
  glow: true,
  ripple: true
});
```

#### 方法

##### `destroy()`

销毁鼠标效果，移除事件监听器。

---

### Animations

动画效果系统。

#### 方法

##### `initIntersectionObserver(elements, options)`

初始化交叉观察器，用于入场动画。

**参数:**
- `elements` (NodeList) - 元素列表
- `options` (Object)
  - `threshold` (number) - 触发阈值，默认 0.1
  - `rootMargin` (string) - 根边距，默认 '0px'
  - `once` (boolean) - 是否只触发一次，默认 false

##### `addScrollParallax(element, speed)`

添加滚动视差效果。

**参数:**
- `element` (HTMLElement) - 目标元素
- `speed` (number) - 视差速度，默认 0.5

##### `addBreathingGlow(element, duration)`

添加呼吸发光效果。

**参数:**
- `element` (HTMLElement) - 目标元素
- `duration` (number) - 动画周期(ms)，默认 3000

##### `addRotatingHighlight(element, duration)`

添加旋转高光效果。

**参数:**
- `element` (HTMLElement) - 目标元素
- `duration` (number) - 旋转周期(ms)，默认 5000

##### `addElasticScale(element, options)`

添加弹性缩放效果。

**参数:**
- `element` (HTMLElement) - 目标元素
- `options` (Object)
  - `scale` (number) - 缩放比例，默认 1.05
  - `duration` (number) - 动画时长(ms)，默认 300

##### `addChromaticAberration(element, offset)`

添加色差效果。

**参数:**
- `element` (HTMLElement) - 目标元素
- `offset` (number) - 色差偏移量，默认 2

##### `destroy()`

销毁动画系统。

---

## 工具函数

### `initAll(options)`

自动初始化所有 `.liquid-glass` 元素。

**参数:**
- `options` (Object) - 全局配置选项

**返回:** LiquidGlass实例数组

**示例:**

```javascript
import { initAll } from './liquid-glass.js';

const instances = initAll({
  mode: 'standard',
  scale: 20,
  radius: 16
});
```

### `initAnimations(selector, options)`

初始化动画系统。

**参数:**
- `selector` (string) - CSS选择器，默认 '.liquid-glass-animate'
- `options` (Object) - 配置选项

**返回:** Animations实例

---

## 全局API

### `LiquidGlass.init(options)`

一键初始化整个系统。

**参数:**
- `options` (Object)
  - `effects` (boolean) - 是否启用鼠标效果，默认 true
  - `animations` (boolean) - 是否启用动画，默认 true
  - `mouseEffects` (Object) - 鼠标效果配置
  - `animationOptions` (Object) - 动画配置

**示例:**

```javascript
LiquidGlass.init({
  effects: true,
  animations: true,
  mouseEffects: {
    elasticFollow: true,
    tilt3D: true,
    glow: true,
    ripple: true
  },
  animationOptions: {
    threshold: 0.1,
    once: true
  }
});
```

---

## CSS 变量

可通过CSS变量自定义样式：

```css
:root {
  --lg-blur: 40px;              /* 主模糊程度 */
  --lg-blur-cover: 3px;         /* 覆盖层模糊 */
  --lg-radius: 16px;            /* 圆角半径 */
  --lg-bg: rgba(255, 255, 255, 0.1);  /* 背景色 */
  --lg-border: rgba(255, 255, 255, 0.2);  /* 边框色 */
  --lg-shadow: rgba(0, 0, 0, 0.1);  /* 阴影色 */
  --lg-highlight: rgba(255, 255, 255, 0.6);  /* 高光色 */
  --lg-saturate: 180%;          /* 饱和度 */
  --lg-transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);  /* 过渡 */
}
```

---

## HTML 数据属性

通过 `data-*` 属性配置：

```html
<div class="liquid-glass" 
     data-mode="standard"
     data-scale="20"
     data-radius="16"
     data-blur="40">
  内容
</div>
```

---

## 自定义 SDF 函数

创建自定义形状：

```javascript
function customHeartSDF(x, y, w, h, radius) {
  // 自定义心形SDF算法
  const px = x / w;
  const py = y / h;
  const a = px * px + py * py - 1;
  const b = px * px * py * py * py;
  return (a * a * a - b) * 100;
}

const glass = new LiquidGlass(element, {
  mode: 'custom',
  customSDF: customHeartSDF
});
```

---

## TypeScript 支持

完整的TypeScript类型定义：

```typescript
import LiquidGlass, { 
  LiquidGlassOptions, 
  SDFMode,
  MouseEffectsOptions,
  AnimationOptions 
} from 'xiaop-liquid-glass';

const options: LiquidGlassOptions = {
  mode: 'standard',
  scale: 20,
  radius: 16,
  blur: 40
};

const glass = new LiquidGlass(element, options);
```
