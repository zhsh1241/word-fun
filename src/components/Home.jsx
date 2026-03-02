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
    { id: "matching", name: "单词消消乐", emoji: "🎯", desc: "配对单词和图片" },
    { id: "spelling", name: "拼写挑战", emoji: "✨", desc: "拼出正确的单词" },
    { id: "listening", name: "听音选词", emoji: "👂", desc: "听发音选单词" },
  ];

  const wordCount = getBookWordCount(selectedBook);

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-5xl font-bold text-white mb-2 animate-bounce">🌟 有趣记单词 🌟</h1>
        <p className="text-white/80 text-xl">让学习变得有趣！</p>
      </div>

      {/* 进度卡片 */}
      <div className="card flex justify-around items-center py-6">
        {[
          { emoji: "💰", value: progress.coins, label: "金币" },
          { emoji: "⭐", value: progress.stars, label: "星星" },
          { emoji: "🎮", value: progress.totalGamesPlayed, label: "游戏" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div className="text-4xl">{item.emoji}</div>
            <div className="text-2xl font-bold text-purple-600">{item.value}</div>
            <div className="text-gray-500 text-sm">{item.label}</div>
          </div>
        ))}
      </div>

      {/* 当前词书 */}
      <button
        onClick={onOpenBookSelector}
        className="card w-full p-4 bg-gradient-to-r from-indigo-400 to-purple-400 flex items-center gap-4 hover:scale-[1.02] transition-all"
      >
        <div className="text-4xl">{selectedBook.emoji}</div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-lg">{selectedBook.name}</span>
            <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
              {selectedBook.levelName}
            </span>
          </div>
          <div className="text-white/80 text-sm">
            📖 {wordCount} 个单词 · {selectedBook.themes.length} 个主题
          </div>
        </div>
        <div className="text-white text-lg font-bold">更换 ▶</div>
      </button>

      {/* 选择游戏 */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">🎮 选择游戏</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {games.map((game) => (
            <button
              key={game.id}
              onClick={() => onStartGame(game.id, selectedBook.themes[0])}
              className="card bg-gradient-to-br from-purple-400 to-pink-400 p-6 text-center transform hover:scale-105 transition-all"
            >
              <div className="text-5xl mb-2">{game.emoji}</div>
              <div className="font-bold text-white text-xl">{game.name}</div>
              <div className="text-white/80">{game.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 选择主题 */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">📖 选择主题</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(wordThemes).map(([key, theme]) => (
            <button
              key={key}
              onClick={() => onStartGame("matching", key)}
              className={"card bg-gradient-to-br " + theme.color + " p-6 text-center transform hover:scale-105 transition-all"}
            >
              <div className="text-5xl mb-2">{theme.emoji}</div>
              <div className="font-bold text-white text-xl">{theme.name}</div>
              <div className="text-white/80">{theme.words.length} 个单词</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
