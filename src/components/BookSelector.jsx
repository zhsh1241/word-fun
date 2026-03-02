import { getBookWordCount } from "../data/books";

function BookSelector({ books, selectedBook, onSelectBook, onClose }) {
  const levelColors = [
    "from-green-400 to-emerald-400",  // Level 1 - 入门
    "from-blue-400 to-cyan-400",      // Level 2 - 初级
    "from-purple-400 to-violet-400",  // Level 3 - 中级
    "from-orange-400 to-red-400",     // Level 4 - 高级
    "from-red-400 to-rose-400",       // Level 5 - 专家
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">📚 选择词书</h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-3xl font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-white/80 mt-2">选择适合你的词汇书，开始学习之旅！</p>
        </div>

        {/* 词书列表 */}
        <div className="p-6 space-y-4">
          {books.map((book) => {
            const wordCount = getBookWordCount(book);
            const isSelected = selectedBook.id === book.id;

            return (
              <button
                key={book.id}
                onClick={() => {
                  onSelectBook(book.id);
                  onClose();
                }}
                className={
                  "w-full p-4 rounded-2xl border-4 transition-all transform hover:scale-[1.02] " +
                  (isSelected
                    ? "border-purple-500 bg-purple-50 shadow-lg"
                    : "border-gray-200 hover:border-purple-300 bg-white")
                }
              >
                <div className="flex items-center gap-4">
                  {/* 图标 */}
                  <div
                    className={
                      "w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-gradient-to-br " +
                      levelColors[book.level - 1]
                    }
                  >
                    {book.emoji}
                  </div>

                  {/* 信息 */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-gray-800">{book.name}</h3>
                      {isSelected && (
                        <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                          当前
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm mt-1">{book.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        📖 {wordCount} 个单词
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        📁 {book.themes.length} 个主题
                      </span>
                      <span
                        className={
                          "text-xs px-2 py-1 rounded-full bg-gradient-to-r " +
                          levelColors[book.level - 1] +
                          " text-white"
                        }
                      >
                        {book.levelName}
                      </span>
                    </div>
                  </div>

                  {/* 箭头 */}
                  <div className="text-gray-400 text-2xl">→</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 底部提示 */}
        <div className="bg-gray-50 p-4 rounded-b-3xl text-center">
          <p className="text-gray-500 text-sm">
            💡 提示：选择不同词书可以学习不同难度的单词哦！
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookSelector;
