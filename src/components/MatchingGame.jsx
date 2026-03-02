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

  if (!words.length) return <div className="text-white text-center text-2xl">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="bg-white/20 text-white px-4 py-2 rounded-xl">Back</button>
        <div className="text-white font-bold text-xl">Score: {score}</div>
        {combo > 1 && <div className="text-yellow-300 font-bold animate-pulse">Combo {combo}x</div>}
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Matching Game</h1>
        <p className="text-white/80">Match words with images ({matched.length}/{words.length})</p>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold mb-3 text-center">Click Words</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {words.map((w) => (
            <button key={"w-"+w.word} onClick={() => handleWord(w)} disabled={matched.includes(w.word)}
              className={"p-4 rounded-xl font-bold text-lg transition-all " + (matched.includes(w.word)
                ? "bg-gray-200 text-gray-400 line-through"
                : selectedWord?.word === w.word ? "bg-purple-400 text-white scale-105"
                : "bg-purple-100 hover:bg-purple-200 text-purple-800")}>
              {w.word}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold mb-3 text-center">Click Images</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[...words].sort(() => Math.random() - 0.5).map((w) => (
            <button key={"e-"+w.word} onClick={() => handleEmoji(w)} disabled={matched.includes(w.word)}
              className={"p-4 rounded-xl text-4xl transition-all " + (matched.includes(w.word)
                ? "bg-gray-200 opacity-50" : selectedEmoji?.word === w.word
                ? "bg-yellow-200 scale-105" : "bg-yellow-50 hover:bg-yellow-100")}>
              {w.emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MatchingGame;
