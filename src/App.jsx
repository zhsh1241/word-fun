import { useState } from "react";
import { useProgress } from "./hooks/useProgress";
import { useBook } from "./hooks/useBook";
import Home from "./components/Home";
import MatchingGame from "./components/MatchingGame";
import SpellingGame from "./components/SpellingGame";
import ListeningGame from "./components/ListeningGame";
import WordLibrary from "./components/WordLibrary";
import BookSelector from "./components/BookSelector";

function App() {
  const [page, setPage] = useState("home");
  const [gameType, setGameType] = useState(null);
  const [theme, setTheme] = useState("animals");
  const [showBookSelector, setShowBookSelector] = useState(false);

  const { progress, addCoins, addStars } = useProgress();
  const { books, selectedBook, selectBook, getRandomWords } = useBook();

  const startGame = (type, t) => {
    setGameType(type);
    setTheme(t);
    setPage("game");
  };

  const endGame = (coins, stars) => {
    addCoins(coins);
    addStars(stars);
    setPage("home");
  };

  const renderGame = () => {
    const props = {
      theme,
      onComplete: endGame,
      onBack: () => setPage("home"),
      getRandomWords,
    };
    switch (gameType) {
      case "matching": return <MatchingGame {...props} />;
      case "spelling": return <SpellingGame {...props} />;
      case "listening": return <ListeningGame {...props} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400">
      <div className="max-w-4xl mx-auto pb-20">
        {page === "home" && (
          <Home
            progress={progress}
            onStartGame={startGame}
            onNavigate={setPage}
            selectedBook={selectedBook}
            onOpenBookSelector={() => setShowBookSelector(true)}
          />
        )}
        {page === "game" && renderGame()}
        {page === "library" && (
          <WordLibrary
            onBack={() => setPage("home")}
            selectedBook={selectedBook}
          />
        )}
      </div>

      {/* 底部导航 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t-4 border-purple-400 p-3">
        <div className="max-w-4xl mx-auto flex justify-around">
          {[
            { id: "home", emoji: "🏠", label: "首页" },
            { id: "library", emoji: "📚", label: "词库" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={
                "flex flex-col items-center " +
                (page === item.id ? "text-purple-600" : "text-gray-500")
              }
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* 词书选择器弹窗 */}
      {showBookSelector && (
        <BookSelector
          books={books}
          selectedBook={selectedBook}
          onSelectBook={selectBook}
          onClose={() => setShowBookSelector(false)}
        />
      )}
    </div>
  );
}

export default App;
