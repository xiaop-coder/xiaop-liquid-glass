# XiaoP Liquid Glass - AI记忆文件

> 此文件供AI助手快速了解项目全貌，避免重复询问基础信息。最后更新：2026-04-29

---

## 1. 项目基本信息

| 项目 | 内容 |
| --- | --- |
| 项目名称 | XiaoP Liquid Glass（小P液态玻璃） |
| GitHub地址 | `https://github.com/xiaop-coder/xiaop-liquid-glass` |
| 本地路径 | `d:\Users\Administrator\Desktop\xiaopdanbao\液态玻璃风格` |
| 技术栈 | 纯 CSS + 原生 JavaScript（零依赖、零框架） |
| 设计灵感 | Apple WWDC 2025 iOS 26 Liquid Glass 效果 |
| 许可证 | MIT License © 2026 XiaoP |
| npm包名 | `xiaop-liquid-glass` |

## 2. GitHub 账号信息

| 项目 | 内容 |
| --- | --- |
| GitHub用户名 | `xiaop-coder` |
| GitHub邮箱 | `xiaoppsc@gmail.com` |
| Personal Access Token | 需要小P提供（GitHub push protection不允许将token提交到仓库） |
| Token权限 | 全部权限已开放 |
| 仓库可见性 | Public |

> ⚠️ **重要**：Token不能写入此文件（GitHub会自动拦截）。请小P单独提供给接手的AI。

## 3. Git 配置

| 项目 | 内容 |
| --- | --- |
| 本地git用户名 | XiaoP |
| 本地git邮箱 | xiaoppsc@gmail.com |
| remote origin | `https://github.com/xiaop-coder/xiaop-liquid-glass.git` |
| 默认分支 | `main` |
| 推送方式 | git push（需token认证，密码认证已被GitHub禁用） |

推送命令示例：
```bash
cd "d:\Users\Administrator\Desktop\xiaopdanbao\液态玻璃风格"
git add -A
git commit -m "描述信息"
git push origin main
```

如果推送时认证失败，需要设置credential或使用token：
```bash
git remote set-url origin https://xiaop-coder:YOUR_TOKEN@github.com/xiaop-coder/xiaop-liquid-glass.git
git push origin main
# 推送后记得清除token：
git remote set-url origin https://github.com/xiaop-coder/xiaop-liquid-glass.git
```

## 4. 目录结构

```
液态玻璃风格/
├── .gitignore
├── LICENSE                    # MIT © XiaoP
├── README.md                  # 五语言README（中文在前，然后英日韩俄）
├── package.json               # npm: xiaop-liquid-glass
├── index.html                 # 项目演示首页（Demo入口）
├── dist/                      # 核心分发文件
│   ├── liquid-glass.css       # CSS设计系统（30+变量、25+组件、深浅色主题）
│   └── liquid-glass.js        # JS交互效果（5种自动初始化效果）
├── demos/                     # 演示页面
│   ├── login.html             # 登录页Demo
│   ├── register.html          # 注册页Demo
│   ├── navigation.html        # 导航页Demo（固定导航栏、侧边栏、标签栏）
│   ├── select.html            # 下拉选择Demo（含动态添加演示）
│   └── components.html        # 全组件展示Demo
└── docs/                      # 开源文档官网
    ├── index.html             # 文档站首页（侧边栏导航、组件文档、API文档）
    ├── css/liquid-glass.css   # 文档站CSS副本
    └── js/liquid-glass.js     # 文档站JS副本
```

## 5. 核心文件说明

### 5.1 dist/liquid-glass.css

完整的CSS设计系统，包含：

- **CSS变量体系（--lg-\*）**：30+变量，支持 `prefers-color-scheme` 自动切换深浅色
  - `--lg-bg-gradient-1/2/3/4`：渐变背景色
  - `--lg-card-bg` / `--lg-card-border` / `--lg-card-shadow`：卡片样式
  - `--lg-glass-bg` / `--lg-glass-border`：玻璃表面
  - `--lg-text-primary/secondary/tertiary`：文字颜色
  - `--lg-primary` / `--lg-secondary`：主色调（蓝 #007aff / 紫 #8b5cf6）
  - `--lg-input-bg` / `--lg-input-border` / `--lg-input-focus-border`：输入框
  - `--lg-btn-primary-*` / `--lg-btn-ghost-*`：按钮
  - `--lg-header-bg` / `--lg-header-border`：导航栏
  - `--lg-list-bg` / `--lg-item-hover` / `--lg-item-active-bg`：列表
  - `--lg-badge-*-bg` / `--lg-badge-*-color`：徽章
  - `--lg-radius-sm/md/lg/xl`：圆角
  - `--lg-transition` / `--lg-transition-fast`：过渡
  - `--lg-glass-inner-highlight` / `--lg-glass-shadow` / `--lg-glass-hover`：玻璃效果
  - `--lg-divider`：分割线
  - `--lg-arrow-color` / `--lg-indicator-color` / `--lg-indicator-glow`：下拉框指示器
  - `--lg-sidebar-bg` / `--lg-sidebar-border`：侧边栏

- **组件样式**：
  - `.glass3d`：3D深度玻璃卡片
  - `.glass-card`：标准玻璃卡片
  - `.glass-modal` / `.glass-overlay`：弹窗
  - `.glass-button`：按钮
  - `.glass-input`：输入框
  - `.glass-nav`：导航栏
  - `.glass-badge-*` / `.glass-alert-*`：徽章/警告框
  - `.glass-section`：区块
  - `.glass-tab-bar` / `.glass-tab-item`：标签栏
  - `.glass-search-box` / `.glass-result-*`：搜索
  - `.glass-form-box`：表单
  - `.glass-footer`：页脚
  - `.glass-divider`：分割线
  - `.liquid-glass-dropdown`：液态玻璃下拉框（自动转换select）
  - `.form-select` / `.form-control`：表单控件
  - `.settings-section`：设置区块

- **效果类**：
  - `.glass-light-track`：鼠标追光
  - `.glass-rotating-highlight`：旋转高光（conic-gradient 8s循环）
  - `.glass-variable-blur`：渐变模糊
  - `.glass-entrance` / `.glass-visible`：入场动画
  - `.glass-entrance-delay-1~5`：入场延迟
  - `.glass-page-transition`：页面切换
  - `.glass-float`：浮动动画
  - `.glass-pulse-glow`：脉冲发光
  - `.glass-ripple-container` / `.glass-ripple`：涟漪效果
  - `.glass-fade-enter` / `.glass-fade-leave`：淡入淡出

- **动画**：
  - `lgGradientShift`：渐变背景动画
  - `lgDropdownIn`：下拉框弹入
  - `glassFloat`：浮动
  - `glassPulseGlow`：脉冲发光
  - `glassPageIn`：页面入场

### 5.2 dist/liquid-glass.js

交互JS，包含5种自动初始化效果：

| 函数 | 作用 |
| --- | --- |
| `initAllSelects()` | 自动转换所有 `<select class="form-select">` 为液态玻璃下拉组件（排除 `.no-liquid-glass`） |
| `initMouseTracking()` | 鼠标追光（mousemove → CSS变量 --mouse-x/y） |
| `initScrollBlur()` | 滚动模糊（scroll → 动态 --nav-blur） |
| `initRippleEffect()` | 点击涟漪（btn/hero-btn/nav-btn → .glass-ripple） |
| `initEntranceAnimations()` | 入场动画（IntersectionObserver → .glass-visible） |

**重要API**：
- `window.initLiquidGlassSelects()`：动态添加select后需手动调用此函数重新初始化
- 排除转换：给 `<select>` 添加 `class="no-liquid-glass"`

**下拉框实现细节**：
- 使用 inline 模式（`wrapper.appendChild(list)`），非 Portal 模式
- z-index 管理：`.settings-section.dropdown-open { z-index: 100 !important }`
- 原始 `<select>` 被隐藏（`display: none`），自定义DOM替换显示
- 选择值同步回原始select，确保表单提交正常

## 6. 演示页面说明

| 页面 | 文件 | 展示内容 |
| --- | --- | --- |
| 项目首页 | `index.html` | Hero区、特性卡片、Demo入口链接、致谢 |
| 登录页 | `demos/login.html` | 液态玻璃登录卡片、图标输入框、弹性按钮、旋转高光 |
| 注册页 | `demos/register.html` | 注册表单、液态玻璃下拉框、网格布局、协议勾选 |
| 导航页 | `demos/navigation.html` | 固定导航栏、侧边栏、标签栏 |
| 下拉选择 | `demos/select.html` | 基础select、预选值、排除转换、动态添加、尺寸变体 |
| 全组件 | `demos/components.html` | 按钮、徽章、警告框、输入框、进度条、3D卡片、旋转高光 |
| 文档站 | `docs/index.html` | 侧边栏导航、组件文档、CSS变量表、JS API文档、致谢 |

所有Demo页面引用Bootstrap Icons CDN和本地 `dist/liquid-glass.css` / `dist/liquid-glass.js`。

## 7. 引用的开源项目

| 项目 | 借鉴内容 |
| --- | --- |
| [lucasromerodb/liquid-glass-effect-macos](https://github.com/lucasromerodb/liquid-glass-effect-macos) | 多层backdrop-filter、伪元素高光、3D阴影、旋转高光 |
| [shuding/liquid-glass](https://github.com/shuding/liquid-glass) | SVG滤镜折射、鼠标位置追踪 |
| [rdev/liquid-glass-react](https://github.com/rdev/liquid-glass-react) | 组件化设计、渐变高光、弹性缓动、色差效果 |
| [wxperia/liquid-glass-vue](https://github.com/wxperia/liquid-glass-vue) | 鼠标追光、暗色模式、变量模糊、涟漪效果 |
| [liquid-glass.pro](https://www.liquid-glass.pro/) | 设计系统方法论、CSS变量体系、滚动动画 |
| [掘金 - CSS3液态水+毛玻璃实战](https://juejin.cn/post/7552755071567675419) | 液态变形、border-radius动画、毛玻璃模式 |

## 8. 与主站项目的关系

此开源项目是从主站项目 `d:\Users\Administrator\Desktop\xiaopdanbao` 中提取出来的设计系统：

- 主站的 `public/css/liquid-glass.css` → 开源项目的 `dist/liquid-glass.css`
- 主站的 `public/js/liquid-glass.js` → 开源项目的 `dist/liquid-glass.js`
- 主站的 `public/css/glass.css` 是前台样式，`@import url('liquid-glass.css')` 引入核心CSS

**主站项目信息**：
- 项目名称：小P担保记录系统
- 线上地址：`https://zuche.z52k.com/`
- 技术栈：PHP 7.4+ / MySQL 5.7+ / 原生MVC（无框架）
- AI记忆文件：`d:\Users\Administrator\Desktop\xiaopdanbao\AI_MEMORY.md`

## 9. 待完善/可优化功能

- [ ] 发布到npm（需注册npm账号并发布）
- [ ] 添加GitHub Pages部署（docs目录可直接部署为文档站）
- [ ] 添加GitHub Actions CI/CD（自动测试、自动发布）
- [ ] 添加更多Demo页面（Dashboard、表单、数据表格等）
- [ ] 添加SVG滤镜折射效果（参考shuding/liquid-glass）
- [ ] 添加手动深色模式切换开关（目前仅跟随系统）
- [ ] 添加Web Components版本
- [ ] 添加React/Vue组件封装
- [ ] 添加TypeScript类型声明文件
- [ ] 文档站添加i18n多语言切换（目前只有按钮，没有实际切换逻辑）
- [ ] 液态玻璃CSS生成器（类似liquid-glass.pro的Generator功能）

## 10. 注意事项

1. **CSS/JS文件来源**：`dist/` 目录的文件是从主站项目直接复制的，修改时需同步更新
2. **docs目录**：`docs/css/` 和 `docs/js/` 是文档站的独立副本，需与 `dist/` 保持同步
3. **编码**：确保文件以UTF-8无BOM保存
4. **BOM字符**：glass.css曾出现BOM字符问题，需注意
5. **Cloudflare缓存**：主站线上环境使用Cloudflare CDN，修改CSS/JS后需清缓存
6. **GitHub Pages**：可在仓库Settings中开启，选择 `docs/` 目录作为源，即可部署文档站
