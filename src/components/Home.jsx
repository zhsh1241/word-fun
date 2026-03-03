import { getBookWordCount } from "../data/books";

function Home({ progress, onStartGame, onNavigate, selectedBook, onOpenBookSelector }) {
  // 从选中的词书获取主题数据
  const wordThemes = {};
  selectedBook.themes.forEach((themeKey) => {
    const themeData = selectedBook.getThemeData(themeKey);
    if (themeData) {
      wordThemes[themeKey] = themeData;
    }
  });

  const games = [
    { 
      id: "matching", 
      name: "单词消消乐", 
      emoji: "🎯", 
      desc: "点击单词和匹配的图片来消除它们，考验你的记忆力！",
      color: "from-blue-400 to-cyan-400"
    },
    { 
      id: "spelling", 
      name: "拼写挑战", 
      emoji: "✨", 
      desc: "将打乱的字母拖拽到正确位置，拼出完整的单词！",
      color: "from-green-400 to-emerald-400"
    },
    { 
      id: "listening", 
      name: "听音选词", 
      emoji: "👂", 
      desc: "仔细听发音，选择正确的单词图片，锻炼听力！",
      color: "from-orange-400 to-red-400"
    },
  ];

  const wordCount = getBookWordCount(selectedBook);

  return (
    <div className="space-y-8">
      {/* 欢迎区域 */}
      <div className="text-center py-6">
        <h1 className="text-5xl font-bold text-white mb-4 animate-bounce drop-shadow-lg">
          🌟 有趣记单词 🌟
        </h1>
        <p className="text-white/90 text-xl mb-2">让学习变得有趣！</p>
        <p className="text-white/70 text-lg">每天玩一点，轻松记住更多单词</p>
      </div>

      {/* 进度卡片 - 增加更多视觉吸引力 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border-2 border-white/20 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">🏆 我的成就</h3>
        <div className="flex justify-around items-center">
          {[
            { emoji: "💰", value: progress.coins, label: "金币", desc: "用于解锁新功能" },
            { emoji: "⭐", value: progress.stars, label: "星星", desc: "获得的学习星星" },
            { emoji: "🎮", value: progress.totalGamesPlayed, label: "游戏", desc: "已完成的游戏次数" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-5xl mb-2">{item.emoji}</div>
              <div className="text-3xl font-bold text-yellow-300 mb-1">{item.value}</div>
              <div className="text-white text-sm font-medium">{item.label}</div>
              <div className="text-white/60 text-xs mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 当前词书 - 更丰富的展示 */}
      <button
        onClick={onOpenBookSelector}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-5 flex items-center gap-4 hover:scale-[1.02] transition-all duration-300 shadow-xl border-2 border-white/20"
      >
        <div className="text-5xl">{selectedBook.emoji}</div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-bold text-white text-xl">{selectedBook.name}</span>
            <span className="bg-yellow-400 text-purple-800 text-sm px-3 py-1 rounded-full font-medium">
              {selectedBook.levelName}
            </span>
          </div>
          <div className="text-white/90 text-base mb-2">
            📚 包含 {wordCount} 个单词 · {selectedBook.themes.length} 个主题
          </div>
          <div className="text-white/70 text-sm">
            点击更换其他词书
          </div>
        </div>
        <div className="text-white text-xl font-bold flex items-center gap-2">
          更换 ▶
        </div>
      </button>

      {/* 游戏选择区域 */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-2xl font-bold text-white">🎮 选择游戏模式</h2>
          <div className="bg-yellow-400 text-purple-800 text-sm px-3 py-1 rounded-full">
            3种游戏等你来挑战！
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => onStartGame(game.id, selectedBook.themes[0])}
              className={`bg-gradient-to-br ${game.color} rounded-3xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-xl border-2 border-white/20`}
            >
              <div className="text-6xl mb-3">{game.emoji}</div>
              <div className="font-bold text-white text-xl mb-2">{game.name}</div>
              <div className="text-white/90 text-sm leading-relaxed">{game.desc}</div>
              <div className="mt-3 bg-white/20 text-white text-xs px-3 py-1 rounded-full inline-block">
                点击开始游戏
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 主题选择区域 */}
      {Object.keys(wordThemes).length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-2xl font-bold text-white">📖 选择学习主题</h2>
            <div className="bg-green-400 text-white text-sm px-3 py-1 rounded-full">
              选择任意主题开始
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {Object.entries(wordThemes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => onStartGame("matching", key)}
                className={`bg-gradient-to-br ${theme.color} rounded-3xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-xl border-2 border-white/20`}
              >
                <div className="text-6xl mb-3">{theme.emoji}</div>
                <div className="font-bold text-white text-xl mb-2">{theme.name}</div>
                <div className="text-white/90 text-sm mb-3">{theme.words.length} 个单词</div>
                <div className="bg-white/20 text-white text-xs px-3 py-1 rounded-full inline-block">
                  开始学习
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 学习提示 */}
      <div className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-3xl p-6 border-2 border-cyan-300/30">
        <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
          💡 学习小贴士
        </h3>
        <ul className="text-white/90 space-y-2 text-sm">
          <li>• 每天游戏15分钟，效果最佳</li>
          <li>• 连续答对可以获得连击奖励</li>
          <li>• 可以重复练习，巩固记忆</li>
          <li>• 听力游戏可以提升发音准确度</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
