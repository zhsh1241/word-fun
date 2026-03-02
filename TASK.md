# 开发有趣记单词 App

请帮我开发一个帮助小朋友趣味记单词的 Web 应用。

## 技术栈
- React 18 + Vite
- Tailwind CSS
- localStorage
- Web Speech API

## 步骤

### 1. 初始化项目
```bash
npm create vite@latest . -- --template react
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2. 配置 Tailwind
tailwind.config.js:
```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

src/index.css:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3. 创建词库 src/data/words.js
3 个主题（动物、水果、颜色），每主题 20 个单词
每个单词: word, chinese, emoji, example

### 4. 实现核心组件
- src/App.jsx: 路由 + 状态管理
- src/components/Home.jsx: 首页，选择游戏模式
- src/components/MatchingGame.jsx: 消消乐（6 单词 + 6 emoji 配对）
- src/components/SpellingGame.jsx: 拼写（字母打乱，拖拽排序）
- src/components/ListeningGame.jsx: 听音选词
- src/components/WordLibrary.jsx: 词库浏览
- src/hooks/useProgress.js: 进度管理

### 5. 趣味元素
- 答对: 星星动画 🌟 + 金币 +10
- Combo 连击加成
- localStorage 存储进度

### 6. 界面
- 卡通风格，大按钮
- 鲜艳颜色
- 响应式

请完整实现所有文件，确保 npm run dev 能运行！
