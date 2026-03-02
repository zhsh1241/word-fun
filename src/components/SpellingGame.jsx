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
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="bg-white/20 text-white px-4 py-2 rounded-xl">Back</button>
        <div className="text-white font-bold text-xl">Score: {score}</div>
        <div className="text-white/80">Word {index + 1}/{words.length}</div>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Spelling Challenge</h1>
      </div>

      <div className="card text-center">
        <div className="text-6xl mb-4">{current.emoji}</div>
        <div className="text-2xl font-bold text-gray-800">{current.chinese}</div>
        <div className="text-gray-500 italic">"{current.example}"</div>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold mb-3 text-center">Your Answer:</h3>
        <div className="flex justify-center gap-2 min-h-[50px] flex-wrap">
          {answer.map((l, i) => (
            <button key={i} onClick={() => removeLetter(i)}
              className="w-12 h-12 bg-blue-400 text-white rounded-xl font-bold text-xl shadow-lg hover:bg-blue-500">
              {l}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-bold mb-3 text-center">Click Letters:</h3>
        <div className="flex justify-center gap-2 flex-wrap">
          {letters.map((l, i) => (
            <button key={i} onClick={() => addLetter(l, i)}
              className="w-12 h-12 bg-purple-400 text-white rounded-xl font-bold text-xl shadow-lg hover:bg-purple-500 hover:scale-110">
              {l}
            </button>
          ))}
        </div>
      </div>

      {answer.length === current.word.length && (
        <button onClick={check} className="w-full py-4 bg-yellow-400 text-gray-800 font-bold text-xl rounded-2xl shadow-lg hover:bg-yellow-500">
          Check Answer
        </button>
      )}
    </div>
  );
}

export default SpellingGame;
