# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
