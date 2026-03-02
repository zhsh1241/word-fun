import { useState } from "react";
import { wordThemes } from "../data/words";

function WordLibrary({ onBack }) {
  const [theme, setTheme] = useState("animals");
  const themes = Object.entries(wordThemes);

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US";
      u.rate = 0.8;
      speechSynthesis.speak(u);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="bg-white/20 text-white px-4 py-2 rounded-xl">← 返回</button>
        <h1 className="text-2xl font-bold text-white">📚 词库</h1>
        <div className="w-20"></div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {themes.map(([key, t]) => (
          <button key={key} onClick={() => setTheme(key)}
            className={"px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all " +
              (theme === key ? "bg-gradient-to-r " + t.color + " text-white shadow-lg" : "bg-white/80 text-gray-700")}>
            {t.emoji} {t.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {wordThemes[theme].words.map((w, i) => (
          <div key={i} onClick={() => speak(w.word)}
            className="card flex items-center gap-4 hover:scale-102 transition-all cursor-pointer">
            <div className="text-4xl">{w.emoji}</div>
            <div className="flex-1">
              <div className="font-bold text-lg text-purple-800">{w.word}</div>
              <div className="text-gray-600">{w.chinese}</div>
              <div className="text-gray-400 text-sm italic">"{w.example}"</div>
            </div>
            <button onClick={(e) => { e.stopPropagation(); speak(w.word); }}
              className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center text-xl">
              🔊
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WordLibrary;