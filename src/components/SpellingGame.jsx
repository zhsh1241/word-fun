import { useState, useEffect } from "react";

function SpellingGame({ theme, onComplete, onBack, getRandomWords }) {
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [letters, setLetters] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (getRandomWords) {
      setWords(getRandomWords(10, theme));
    }
  }, [theme, getRandomWords]);

  useEffect(() => {
    if (words[index]) {
      setLetters(words[index].word.split("").sort(() => Math.random() - 0.5));
      setAnswer([]);
    }
  }, [words, index]);

  const current = words[index];
  if (!current) return <div className="text-white text-center text-2xl">Loading...</div>;

  const addLetter = (letter, i) => {
    setAnswer([...answer, letter]);
    setLetters(letters.filter((_, idx) => idx !== i));
  };

  const removeLetter = (i) => {
    setLetters([...letters, answer[i]]);
    setAnswer(answer.filter((_, idx) => idx !== i));
  };

  const check = () => {
    if (answer.join("") === current.word) {
      setResult("correct");
      setScore(score + 15);
      setTimeout(() => {
        setResult(null);
        if (index + 1 < words.length) setIndex(index + 1);
        else onComplete(score + 15, Math.floor(score / 20));
      }, 1000);
    } else {
      setResult("wrong");
      setTimeout(() => {
        setResult(null);
        setLetters(current.word.split("").sort(() => Math.random() - 0.5));
        setAnswer([]);
      }, 1000);
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
        <div className="flex items-center gap-4">
          <div className="text-white font-bold text-xl">
            <span className="text-yellow-300">💰</span> {score} 分
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-bold">
            {index + 1}/{words.length}
          </div>
        </div>
      </div>

      {/* 游戏标题区域 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-3">✨ 拼写挑战</h1>
        <p className="text-white/90 text-lg">
          将打乱的字母拖拽到正确位置，拼出完整的单词！
        </p>
        {index === 0 && (
          <div className="mt-4 bg-green-400/30 text-green-100 px-4 py-2 rounded-xl inline-block text-sm">
            💡 提示：点击字母，然后点击下方的字母来重新排列
          </div>
        )}
      </div>

      {/* 单词提示区域 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border-2 border-white/20 shadow-xl text-center">
        <div className="text-8xl mb-4">{current.emoji}</div>
        <div className="text-3xl font-bold text-gray-800 mb-3">{current.chinese}</div>
        <div className="text-gray-500 text-lg italic mb-4">"{current.example}</div>
        <div className="flex justify-center gap-2">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-xl text-sm font-medium">
            单词长度: {current.word.length} 个字母
          </div>
          <button 
            onClick={() => {
              const utterance = new SpeechSynthesisUtterance(current.word);
              utterance.lang = "en-US";
              utterance.rate = 0.8;
              speechSynthesis.speak(utterance);
            }}
            className="bg-purple-100 text-purple-800 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2"
          >
            🔊 听发音
          </button>
        </div>
      </div>

      {/* 答案区域 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border-2 border-white/20 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-blue-500 text-white px-4 py-2 rounded-xl font-bold text-lg">
            步骤1
          </div>
          <h3 className="text-xl font-bold text-white">点击下方字母拼出单词</h3>
        </div>
        <div className="flex justify-center gap-3 min-h-[60px] flex-wrap">
          {answer.map((l, i) => (
            <button 
              key={i} 
              onClick={() => removeLetter(i)}
              className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl font-bold text-xl shadow-lg hover:from-blue-600 hover:to-blue-700 hover:scale-110 transition-all"
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* 字母选择区域 */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border-2 border-white/20 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-purple-500 text-white px-4 py-2 rounded-xl font-bold text-lg">
            步骤2
          </div>
          <h3 className="text-xl font-bold text-white">点击这些字母</h3>
        </div>
        <div className="flex justify-center gap-3 flex-wrap">
          {letters.map((l, i) => (
            <button 
              key={i} 
              onClick={() => addLetter(l, i)}
              className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-400 text-white rounded-2xl font-bold text-xl shadow-lg hover:from-purple-500 hover:to-pink-500 hover:scale-110 transition-all"
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* 结果提示 */}
      {result === "correct" && (
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center py-4 rounded-2xl text-2xl font-bold animate-bounce">
          🎉 正确！太棒了！
        </div>
      )}
      {result === "wrong" && (
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-center py-4 rounded-2xl text-2xl font-bold">
          ❌ 不对，再试试！
        </div>
      )}

      {/* 检查答案按钮 */}
      {answer.length === current.word.length && !result && (
        <button 
          onClick={check} 
          className="w-full py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-800 font-bold text-xl rounded-2xl shadow-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300"
        >
          ✅ 检查答案
        </button>
      )}
    </div>
  );
}

export default SpellingGame;
