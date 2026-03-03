import { useState, useEffect } from "react";

function MatchingGame({ theme, onComplete, onBack, getRandomWords }) {
  const [words, setWords] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);

  useEffect(() => {
    if (getRandomWords) {
      setWords(getRandomWords(6, theme));
    }
  }, [theme, getRandomWords]);

  const handleWord = (w) => {
    if (matched.includes(w.word)) return;
    setSelectedWord(w);
    if (selectedEmoji?.word === w.word) {
      setMatched([...matched, w.word]);
      setCombo(combo + 1);
      setScore(score + 10 + Math.floor(combo / 3) * 5);
      setSelectedWord(null);
      setSelectedEmoji(null);
      if (matched.length + 1 === words.length) {
        setTimeout(() => onComplete(score + 10, Math.floor(score / 20)), 500);
      }
    }
  };

  const handleEmoji = (w) => {
    if (matched.includes(w.word)) return;
    setSelectedEmoji(w);
    if (selectedWord?.word === w.word) {
      setMatched([...matched, w.word]);
      setCombo(combo + 1);
      setScore(score + 10 + Math.floor(combo / 3) * 5);
      setSelectedWord(null);
      setSelectedEmoji(null);
      if (matched.length + 1 === words.length) {
        setTimeout(() => onComplete(score + 10, Math.floor(score / 20)), 500);
      }
    }
  };

  if (!words.length) return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">🔄</div>
      <div className="text-white text-2xl font-bold mb-2">正在加载...</div>
      <div className="text-white/70">马上就开始！</div>
    </div>
  );

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
        <div className="flex items-center gap-4">
          <div className="text-white font-bold text-xl">
            <span className="text-yellow-300">💰</span> {score} 分
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-bold">
            进度: {matched.length}/{words.length}
          </div>
        </div>
        {combo > 1 && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-xl font-bold animate-pulse text-xl">
            🔥 {combo} 连击!
          </div>
        )}
      </div>

      {/* 游戏标题区域 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-3">🎯 单词消消乐</h1>
        <p className="text-white/90 text-lg">
          先点击一个单词，然后点击对应的图片来消除它们！
        </p>
        {matched.length === 0 && (
          <div className="mt-4 bg-blue-400/30 text-blue-100 px-4 py-2 rounded-xl inline-block text-sm">
            💡 提示：先记住单词和图片，然后开始配对！
          </div>
        )}
      </div>

      {/* 单词选择区 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border-2 border-white/20 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-purple-500 text-white px-4 py-2 rounded-xl font-bold text-lg">
            步骤1
          </div>
          <h3 className="text-xl font-bold text-white">点击选择一个单词</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {words.map((w) => (
            <button 
              key={"w-"+w.word} 
              onClick={() => handleWord(w)} 
              disabled={matched.includes(w.word)}
              className={`p-5 rounded-2xl font-bold text-lg transition-all duration-300 ${
                matched.includes(w.word)
                  ? "bg-gray-300/50 text-gray-400 line-through cursor-not-allowed"
                  : selectedWord?.word === w.word 
                    ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white scale-105 shadow-2xl"
                    : "bg-gradient-to-br from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 text-purple-800 hover:scale-105 shadow-lg"
              }`}
            >
              {w.word}
            </button>
          ))}
        </div>
      </div>

      {/* 图片选择区 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border-2 border-white/20 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-yellow-500 text-white px-4 py-2 rounded-xl font-bold text-lg">
            步骤2
          </div>
          <h3 className="text-xl font-bold text-white">点击对应的图片</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...words].sort(() => Math.random() - 0.5).map((w) => (
            <button 
              key={"e-"+w.word} 
              onClick={() => handleEmoji(w)} 
              disabled={matched.includes(w.word)}
              className={`p-5 rounded-2xl text-5xl transition-all duration-300 ${
                matched.includes(w.word)
                  ? "bg-gray-300/50 opacity-40 cursor-not-allowed"
                  : selectedEmoji?.word === w.word
                    ? "bg-gradient-to-br from-yellow-400 to-orange-400 scale-105 shadow-2xl"
                    : "bg-gradient-to-br from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 hover:scale-105 shadow-lg"
              }`}
            >
              {w.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* 完成提示 */}
      {matched.length === words.length && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center py-6 rounded-3xl text-2xl font-bold animate-bounce">
          🎉 太棒了！你完成了！
        </div>
      )}
    </div>
  );
}

export default MatchingGame;
