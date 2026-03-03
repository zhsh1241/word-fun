import { useState, useMemo } from "react";

function WordLibrary({ onBack, selectedBook }) {
  const [theme, setTheme] = useState(selectedBook.themes[0]);

  // 使用 useMemo 缓存主题数据
  const themes = useMemo(() => {
    const themeMap = {};
    selectedBook.themes.forEach((themeKey) => {
      themeMap[themeKey] = selectedBook.getThemeData(themeKey);
    });
    return themeMap;
  }, [selectedBook]);

  const currentTheme = themes[theme];

  const speak = (text) => {
    try {
      if ("speechSynthesis" in window) {
        // 取消之前的语音
        speechSynthesis.cancel();

        // 创建新的语音
        const u = new SpeechSynthesisUtterance(text);
        u.lang = "en-US";
        u.rate = 0.8;
        u.pitch = 1.0;
        u.volume = 1.0;

        // 添加错误处理
        u.onerror = (event) => {
          console.error("Speech synthesis error:", event.error);
        };

        // 播放语音
        speechSynthesis.speak(u);
      } else {
        alert("您的浏览器不支持语音功能");
      }
    } catch (error) {
      console.error("Speech synthesis failed:", error);
      alert("语音播放失败，请检查浏览器设置");
    }
  };

  return (
    <div className="space-y-6">
      {/* 顶部信息栏 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 flex justify-between items-center border-2 border-white/20">
        <button
          onClick={onBack}
          className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
        >
          ◀ 返回首页
        </button>
        <h1 className="text-2xl font-bold text-white">📚 单词词库</h1>
        <div className="w-20"></div>
      </div>

      {/* 页面说明 */}
      <div className="text-center">
        <p className="text-white/90 text-lg">
          浏览所有单词，点击播放按钮听发音
        </p>
      </div>

      {/* 主题选择标签 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border-2 border-white/20">
        <div className="flex items-center gap-2 mb-3">
          <div className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
            选择主题
          </div>
          <span className="text-white/70 text-sm">点击切换不同主题</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {Object.entries(themes).map(([key, t]) => (
            <button
              key={key}
              onClick={() => setTheme(key)}
              className={`px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
                theme === key
                  ? `bg-gradient-to-r ${t.color} text-white shadow-xl scale-105`
                  : "bg-white/80 text-gray-700 hover:bg-white hover:scale-105"
              }`}
            >
              <span className="text-xl">{t.emoji}</span>
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* 当前主题信息 */}
      {currentTheme && (
        <div className={`bg-gradient-to-r ${currentTheme.color} rounded-2xl p-4 text-white border-2 border-white/20`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold mb-1">
                {currentTheme.emoji} {currentTheme.name}
              </div>
              <div className="text-white/90">
                共 {currentTheme.words.length} 个单词
              </div>
            </div>
            <div className="text-5xl">{currentTheme.emoji}</div>
          </div>
        </div>
      )}

      {/* 单词列表 */}
      {currentTheme && (
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border-2 border-white/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-medium">
              单词列表
            </div>
            <span className="text-white/70 text-sm">点击单词听发音</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentTheme.words.map((w, i) => (
              <div
                key={i}
                onClick={() => speak(w.word)}
                className="bg-white rounded-2xl p-5 flex items-center gap-4 hover:scale-[1.02] transition-all cursor-pointer shadow-lg border-2 border-transparent hover:border-purple-300"
              >
                <div className="text-5xl">{w.emoji}</div>
                <div className="flex-1">
                  <div className="font-bold text-xl text-purple-800 mb-1">{w.word}</div>
                  <div className="text-gray-600 text-lg mb-1">{w.chinese}</div>
                  <div className="text-gray-400 text-sm italic">"{w.example}"</div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speak(w.word);
                  }}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 flex items-center justify-center text-2xl shadow-lg transition-all hover:scale-110"
                  title="播放发音"
                >
                  🔊
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 学习提示 */}
      <div className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-2xl p-4 border-2 border-cyan-300/30">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          💡 学习提示
        </h3>
        <ul className="text-white/90 space-y-2 text-sm">
          <li>• 点击单词卡片可以听发音</li>
          <li>• 点击右侧的播放按钮重复播放</li>
          <li>• 切换主题查看不同类别的单词</li>
          <li>• 记住例句有助于理解单词用法</li>
        </ul>
      </div>
    </div>
  );
}

export default WordLibrary;
