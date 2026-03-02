import { useState, useEffect } from "react";
import { wordThemes, getRandomWords } from "../data/words";

function ListeningGame({ theme, onComplete, onBack }) {
  const [words, setWords] = useState([]);
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setWords(getRandomWords(10, theme));
  }, [theme]);

  useEffect(() => {
    if (words[index]) {
      const allWords = wordThemes[theme].words;
      const wrong = allWords.filter(w => w.word !== words[index].word).sort(() => Math.random() - 0.5).slice(0, 3);
      setOptions([...wrong, words[index]].sort(() => Math.random() - 0.5));
      speak(words[index].word);
    }
  }, [words, index]);

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 0.8;
      speechSynthesis.speak(u);
    }
  };

  const current = words[index];
  if (!current) return <div className="text-white text-center text-2xl">加载中...</div>;

  const handleAnswer = (opt) => {
    if (opt.word === current.word) {
      setResult("correct");
      setScore(score + 15);
      setTimeout(() => {
        setResult(null);
        if (index + 1 < words.length) setIndex(index + 1);
        else onComplete(score + 15, Math.floor(score / 20));
      }, 1000);
    } else {
      setResult("wrong");
      setTimeout(() => setResult(null), 1000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="bg-white/20 text-white px-4 py-2 rounded-xl">← 返回</button>
        <div className="text-white font-bold text-xl">👂 {score} 分</div>
        <div className="text-white/80">第 {index + 1}/{words.length} 题</div>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">👂 听音选词</h1>
      </div>

      <div className="card text-center">
        <button onClick={() => speak(current.word)}
          className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white text-6xl shadow-xl hover:scale-110 transition-all animate-pulse mx-auto">
          🔊
        </button>
        <p className="text-gray-500 mt-4">点击播放发音</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(opt)} disabled={result !== null}
            className={"card p-6 text-center hover:scale-105 transition-all " +
              (result === "correct" && opt.word === current.word ? "bg-green-400 text-white" :
               result === "wrong" && opt.word === current.word ? "bg-green-400 text-white" :
               "bg-white")}>
            <div className="text-4xl mb-2">{opt.emoji}</div>
            <div className="font-bold text-lg">{opt.word}</div>
            <div className="text-gray-500 text-sm">{opt.chinese}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ListeningGame;