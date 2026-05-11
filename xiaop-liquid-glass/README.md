# XiaoP Liquid Glass v3.0

**终极液态玻璃设计系统 - 融合所有最佳实践**

## 🌟 核心特性

### 技术融合
本项目深度融合了以下优秀开源项目的核心技术：

1. **shuding/liquid-glass** - Canvas SDF 位移贴图生成
2. **lucasromerodb/liquid-glass-effect-macos** - 多层 backdrop-filter 架构
3. **rdev/liquid-glass-react** - 色差效果和弹性鼠标跟随
4. **wxperia/liquid-glass-vue** - 6种着色器效果和主题切换
5. **liquid-glass.pro** - 设计系统方法论

### 🎨 6 种玻璃效果

| 效果 | 技术实现 | 特点 |
|------|----------|------|
| **Liquid Glass** | Canvas SDF + SVG feDisplacementMap + 4层渲染 | 真实边缘折射，动态变形 |
| **Frosted Glass** | backdrop-filter blur + saturate | macOS 磨砂质感 |
| **Translucent** | 极低模糊 + 高透明度 | 信息密集界面 |
| **3D Glass** | 多层阴影 + 伪元素高光 + 噪点纹理 | 拟物化深度感 |
| **Chromatic Glass** | RGB 通道分离 + 边缘色差 | 赛博朋克风格 |
| **Fluid Glass** | 实时流体模拟 + 粒子系统 | 动态液态效果 |

### 🔮 8 种 SDF 折射模式

- **standard** - 标准圆角矩形折射
- **polar** - 极坐标圆形折射
- **prominent** - 强化边缘折射
- **frosted** - 无折射纯模糊
- **diamond** - 菱形折射
- **hexagon** - 六边形折射
- **wave** - 波浪形折射
- **custom** - 自定义 SDF 函数

### 🎭 20+ 交互效果

#### 鼠标交互
- 弹性鼠标跟随（方向性缩放）
- 3D 倾斜跟随
- 鼠标光晕追踪
- 磁吸效果
- 涟漪扩散

#### 视觉效果
- RGB 色差分离
- 旋转高光
- 渐变遮罩模糊
- 粒子系统
- 流体动画

#### 动画效果
- IntersectionObserver 入场
- 滚动视差
- 页面转场
- 弹性缩放
- 呼吸发光

### 📦 50+ 组件

#### 基础组件
- Button (10种变体)
- Input / Textarea
- Select / Dropdown
- Checkbox / Radio / Switch
- Badge / Tag / Chip
- Avatar / Icon
- Progress / Spinner

#### 布局组件
- Card / Panel
- Modal / Dialog / Drawer
- Tabs / Accordion
- Navigation / Sidebar
- Header / Footer
- Grid / Flex

#### 高级组件
- DatePicker / TimePicker
- Slider / Range
- Upload / FileInput
- Table / DataGrid
- Chart (集成)
- Toast / Notification

### 🚀 性能优化

- **WebGL 加速渲染** - 可选 GPU 加速
- **Worker 线程计算** - 位移贴图异步生成
- **智能缓存系统** - LRU 缓存策略
- **RAF 节流** - 所有动画使用 requestAnimationFrame
- **虚拟滚动** - 大列表性能优化
- **懒加载** - IntersectionObserver 按需加载

### 🛠 开发体验

- **TypeScript 完整支持** - 100% 类型覆盖
- **模块化架构** - ESM/CJS/UMD 三种格式
- **Tree-shaking 友好** - 按需引入
- **零依赖** - 纯原生实现
- **完整文档** - API 文档 + 交互式示例
- **主题系统** - CSS 变量 + 深色模式

### 📊 技术栈

- **渲染引擎**: Canvas 2D + SVG Filters + (可选) WebGL
- **动画系统**: Web Animations API + CSS Transitions
- **状态管理**: 响应式 Proxy
- **构建工具**: Rollup + Babel + Terser
- **测试框架**: Jest + Playwright
- **文档工具**: VitePress

## 🎯 快速开始

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
      webgl: true,
      performance: 'high'
    });
  </script>
</body>
</html>
```

## 📖 文档

- [完整文档](./docs/index.html)
- [API 参考](./docs/api.md)
- [组件库](./docs/components.md)
- [交互效果](./docs/effects.md)
- [性能优化](./docs/performance.md)

## 🙏 致谢

本项目深度学习并融合了以下优秀项目：

- [shuding/liquid-glass](https://github.com/shuding/liquid-glass) - Canvas SDF 核心算法
- [lucasromerodb/liquid-glass-effect-macos](https://github.com/lucasromerodb/liquid-glass-effect-macos) - 多层架构设计
- [rdev/liquid-glass-react](https://github.com/rdev/liquid-glass-react) - 高级交互效果
- [wxperia/liquid-glass-vue](https://github.com/wxperia/liquid-glass-vue) - 着色器系统
- [liquid-glass.pro](https://www.liquid-glass.pro/) - 设计系统方法论

## 📄 License

MIT © 2026 XiaoP
