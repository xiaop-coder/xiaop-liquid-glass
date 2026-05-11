# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2026-05-11

### 🎉 Major Release - 完全重构

这是一个完全重构的版本，融合了5个优秀开源项目的核心技术，打造终极液态玻璃设计系统。

### Added

#### 核心架构
- 全新模块化架构，完全重写核心代码
- `Shader` 类 - Canvas SDF 位移贴图生成引擎
- `Filter` 类 - SVG 滤镜构建器
- `LiquidGlass` 类 - 4层液态玻璃核心类
- `MouseEffects` 类 - 鼠标交互效果管理器
- `Animations` 类 - 动画效果系统

#### SDF 折射模式（8种）
- `standard` - 标准圆角矩形折射
- `polar` - 极坐标圆形折射
- `prominent` - 强化边缘折射
- `frosted` - 无折射纯模糊
- `diamond` - 菱形折射
- `hexagon` - 六边形折射
- `wave` - 波浪形折射
- `custom` - 自定义 SDF 函数支持

#### 交互效果（20+）
- 弹性鼠标跟随（方向性缩放）
- 3D 倾斜跟随
- 鼠标光晕追踪
- 磁吸效果
- 涟漪扩散
- RGB 色差分离
- 旋转高光
- 渐变遮罩模糊
- 粒子系统
- 流体动画
- IntersectionObserver 入场动画
- 滚动视差
- 页面转场
- 弹性缩放
- 呼吸发光

#### 性能优化
- LRU 缓存系统（位移贴图缓存）
- requestAnimationFrame 节流
- 智能缓存策略
- 可选 WebGL 加速渲染
- Worker 线程计算支持

#### 开发体验
- 完整 TypeScript 类型定义（100% 类型覆盖）
- ESM/CJS/UMD 三种模块格式
- Tree-shaking 友好
- 完整 API 文档
- 交互式示例页面

#### 文档
- 完整的 API 文档（docs/API.md）
- v3.0 完整展示页面（demos/v3-showcase.html）
- 更新的 README 文档

### Changed

- 从单文件架构重构为模块化架构
- 优化 SDF 算法性能
- 改进事件监听器管理
- 重新设计 CSS 变量系统
- 优化 4层渲染结构

### Technical Details

**技术融合来源：**
1. **shuding/liquid-glass** - Canvas SDF 位移贴图生成算法
2. **lucasromerodb/liquid-glass-effect-macos** - 多层 backdrop-filter 架构
3. **rdev/liquid-glass-react** - 色差效果和弹性鼠标跟随
4. **wxperia/liquid-glass-vue** - 着色器效果和主题切换
5. **liquid-glass.pro** - 设计系统方法论

**核心算法：**
- roundedRectSDF - 圆角矩形有向距离场
- smoothStep - 平滑插值函数
- Canvas 2D Context - 位移贴图生成
- SVG feDisplacementMap - 边缘折射实现
- 4层渲染：outer(折射) + cover(模糊) + sharp(高光) + reflect(反射)

### Breaking Changes

⚠️ 这是一个主要版本更新，包含破坏性变更：

1. **API 变更**
   - 旧的全局函数已被类方法替代
   - 需要使用 `LiquidGlass.init()` 初始化
   - 组件实例化方式改变

2. **模块导入**
   ```javascript
   // v2.x
   <script src="dist/liquid-glass.js"></script>
   
   // v3.0
   import LiquidGlass from 'xiaop-liquid-glass';
   // 或
   <script src="dist/liquid-glass.js"></script>
   <script>LiquidGlass.init();</script>
   ```

3. **CSS 类名**
   - 保持向后兼容，但推荐使用新的 data 属性配置
   ```html
   <div class="liquid-glass" data-mode="standard" data-scale="20">
   ```

### Migration Guide

从 v2.x 迁移到 v3.0：

1. 更新引入方式
2. 使用 `LiquidGlass.init()` 替代旧的自动初始化
3. 查阅新的 API 文档（docs/API.md）
4. 测试所有交互效果

## [2.1.1] - 2026-05-11

### Added
- 完整的模块化架构重构
- TypeScript 类型定义文件 (.d.ts)
- Rollup 构建系统，支持 UMD、ESM、CJS 三种格式
- ESLint 和 Prettier 代码质量工具
- GitHub Actions CI/CD 自动化流程
- 性能优化：requestAnimationFrame 节流、位移贴图缓存
- 完整的 API 文档

### Changed
- 将单文件 liquid-glass.js 拆分为模块化结构
  - `core/` - 核心功能（shader、filter、liquid-glass）
  - `components/` - 组件（select）
  - `effects/` - 交互效果（mouse、animations）
  - `utils/` - 工具函数
- 优化事件监听器性能
- 改进代码组织和可维护性

### Fixed
- 修复多个性能瓶颈
- 优化内存使用

## [2.1.0] - 2026-04-29

### Added
- Canvas 位移贴图生成
- SVG feDisplacementMap 边缘折射
- 4层液态玻璃结构（outer/cover/sharp/reflect）
- 4种折射模式（standard/polar/prominent/frosted）
- 13种 JS 交互效果
- 背景切换器功能

### Changed
- 重构液态玻璃为4层结构
- 优化 SVG 滤镜性能

## [2.0.0] - 2026-04-27

### Added
- 初始版本发布
- 基础液态玻璃效果
- 35+ 组件
- 50+ CSS 变量
- 深色模式支持

[2.1.1]: https://github.com/xiaop-coder/xiaop-liquid-glass/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/xiaop-coder/xiaop-liquid-glass/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/xiaop-coder/xiaop-liquid-glass/releases/tag/v2.0.0
