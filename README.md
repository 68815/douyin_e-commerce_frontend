# 抖音电商前端项目

## 项目结构

```
src/
├── assets/
│   ├── base.css
│   └── main.css
├── views/
│   ├── Header.vue
│   ├── HomePage.vue
│   ├── LoginRegisterAuthModal.vue
│   ├── Settings.vue
│   └── ...
├── styles.css
├── App.vue
└── main.js
```

## CSS架构说明

为了保持项目的一致性和可维护性，我们采用了以下CSS组织方式：

### 全局样式

1. **styles.css** - 包含所有全局样式
   - 重置样式
   - 头部导航栏样式
   - 主要内容区域样式
   - 英雄区域样式
   - 特色商品展示样式
   - 模态框样式
   - 响应式设计
   - 主题样式

### 组件样式

1. **Scoped样式** - 每个Vue组件使用scoped样式来定义仅适用于该组件的特定样式
   - 不会与全局样式冲突
   - 仅包含组件特有的样式规则

### 样式去重策略

为了避免样式重复，我们遵循以下原则：
1. 全局通用样式放在`styles.css`中
2. 组件特有样式放在组件的scoped样式中
3. 定期审查和清理重复的样式规则

## 主题系统

项目支持多种主题：
- 深色主题
- 淡灰色主题
- 白色主题
- 跟随系统主题

主题切换通过JavaScript操作DOM类名实现，具体实现在`Settings.vue`组件中。