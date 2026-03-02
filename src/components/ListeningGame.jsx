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

  if (!words[index]) return <div className="text-white text-center text-2xl">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="bg-white/20 text-white px-4 py-2 rounded-xl">Back</button>
        <div className="text-white font-bold text-xl">Score: {score}</div>
        <div className="text-white/80">Word {index + 1}/{words.length}</div>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Listening Game</h1>
        <p className="text-white/80">Listen and select the correct word</p>
      </div>

      <div className="card text-center py-8">
        <button onClick={playWord} className="text-6xl animate-pulse hover:scale-110 transition-transform">
          🔊
        </button>
        <p className="text-gray-500 mt-4">Click to play pronunciation</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {options.map((option, i) => (
          <button
            key={i}
            onClick={() => handleSelect(option)}
            disabled={selected !== null}
            className={
              "card p-6 text-center font-bold text-xl transition-all " +
              (selected?.word === option.word
                ? result === "correct"
                  ? "bg-green-400 text-white"
                  : result === "wrong"
                  ? "bg-red-400 text-white"
                  : "bg-purple-200"
                : "hover:bg-purple-100")
            }
          >
            {option.word}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ListeningGame;
