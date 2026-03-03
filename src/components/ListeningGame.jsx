import { useState, useEffect } from "react";

function ListeningGame({ theme, onComplete, onBack, getRandomWords }) {
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (getRandomWords) {
      setWords(getRandomWords(10, theme));
    }
  }, [theme, getRandomWords]);

  useEffect(() => {
    if (words.length > 0 && words[index]) {
      const correct = words[index];
      const others = words.filter((w) => w.word !== correct.word);
      const wrongOptions = others.sort(() => Math.random() - 0.5).slice(0, 3);
      setOptions([...wrongOptions, correct].sort(() => Math.random() - 0.5));
    }
  }, [words, index]);

  const playWord = () => {
    if (words[index]) {
      const utterance = new SpeechSynthesisUtterance(words[index].word);
      utterance.lang = "en-US";
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (words[index]) playWord();
  }, [words, index]);

  const handleSelect = (option) => {
    setSelected(option);
    if (option.word === words[index].word) {
      setResult("correct");
      setScore(score + 15);
      setTimeout(() => {
        setResult(null);
        setSelected(null);
        if (index + 1 < words.length) setIndex(index + 1);
        else onComplete(score + 15, Math.floor(score / 20));
      }, 1000);
    } else {
      setResult("wrong");
      setTimeout(() => {
        setResult(null);
        setSelected(null);
      }, 1000);
    }
  };

  if (!words[index]) return (
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
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-xl font-bold">
            {index + 1}/{words.length}
          </div>
        </div>
      </div>

      {/* 游戏标题区域 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-3">👂 听音选词</h1>
        <p className="text-white/90 text-lg">
          仔细听发音，然后选择正确的单词！
        </p>
        {index === 0 && (
          <div className="mt-4 bg-blue-400/30 text-blue-100 px-4 py-2 rounded-xl inline-block text-sm">
            💡 提示：点击播放按钮听发音，然后从下方选择正确的单词
          </div>
        )}
      </div>

      {/* 听音按钮区域 */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-center shadow-xl border-2 border-white/20">
        <div className="text-sm text-white/70 mb-3">点击播放发音</div>
        <button 
          onClick={playWord} 
          className="bg-white text-purple-600 text-8xl w-40 h-40 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center"
        >
          🔊
        </button>
        <div className="mt-4 text-white/90 text-lg font-medium">
          再点一次重新播放
        </div>
      </div>

      {/* 结果提示 */}
      {result === "correct" && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center py-4 rounded-2xl text-2xl font-bold animate-bounce">
          🎉 正确！真棒！
        </div>
      )}
      {result === "wrong" && (
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-center py-4 rounded-2xl text-2xl font-bold">
          ❌ 不对，再听一次！
        </div>
      )}

      {/* 选项区域 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border-2 border-white/20 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-orange-500 text-white px-4 py-2 rounded-xl font-bold text-lg">
            选择
          </div>
          <h3 className="text-xl font-bold text-white">选择正确的单词</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              disabled={selected !== null}
              className={`p-6 rounded-2xl font-bold text-xl transition-all duration-300 ${
                selected?.word === option.word
                  ? result === "correct"
                    ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white scale-105 shadow-xl"
                    : result === "wrong"
                    ? "bg-gradient-to-br from-red-500 to-pink-500 text-white scale-105 shadow-xl"
                    : "bg-purple-300 text-white"
                  : "bg-white hover:bg-gray-100 text-purple-800 hover:scale-105 shadow-lg"
              }`}
            >
              <div className="text-2xl mb-2">{option.emoji}</div>
              <div>{option.word}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 提示区域 */}
      <div className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-2xl p-4 border-2 border-yellow-300/30">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💡</span>
          <p className="text-white/90">
            如果没有听到声音，可以点击播放按钮多次；确保设备的音量已打开
          </p>
        </div>
      </div>
    </div>
  );
}

export default ListeningGame;
