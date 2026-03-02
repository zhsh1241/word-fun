import { useState, useEffect } from "react";

const STORAGE_KEY = "word-fun-progress";

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      coins: 0,
      stars: 0,
      streak: 0,
      wordsLearned: [],
      totalGamesPlayed: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const addCoins = (amount) => {
    setProgress((prev) => ({ ...prev, coins: prev.coins + amount }));
  };

  const addStars = (amount) => {
    setProgress((prev) => ({ ...prev, stars: prev.stars + amount }));
  };

  const incrementGamesPlayed = () => {
    setProgress((prev) => ({ ...prev, totalGamesPlayed: prev.totalGamesPlayed + 1 }));
  };

  return { progress, addCoins, addStars, incrementGamesPlayed };
}