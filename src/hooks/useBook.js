import { useState, useEffect } from "react";
import { books, defaultBook } from "../data/books";

const STORAGE_KEY = "word-fun-selected-book";

export function useBook() {
  // 获取用户选择的词书ID
  const [selectedBookId, setSelectedBookId] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved || defaultBook.id;
  });

  // 获取当前选中的词书对象
  const selectedBook = books.find((b) => b.id === selectedBookId) || defaultBook;

  // 保存选择到 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, selectedBookId);
  }, [selectedBookId]);

  // 选择词书
  const selectBook = (bookId) => {
    const book = books.find((b) => b.id === bookId);
    if (book) {
      setSelectedBookId(bookId);
    }
  };

  // 获取当前词书的主题数据（兼容旧的 wordThemes 格式）
  const getWordThemes = () => {
    const themes = {};
    selectedBook.themes.forEach((themeKey) => {
      const themeData = selectedBook.getThemeData(themeKey);
      if (themeData) {
        themes[themeKey] = themeData;
      }
    });
    return themes;
  };

  // 获取指定主题的随机单词
  const getRandomWords = (count, theme) => {
    const themeData = selectedBook.getThemeData(theme);
    if (!themeData || !themeData.words) return [];
    return [...themeData.words].sort(() => Math.random() - 0.5).slice(0, count);
  };

  // 获取词书的总单词数
  const getWordCount = () => {
    let count = 0;
    selectedBook.themes.forEach((theme) => {
      const themeData = selectedBook.getThemeData(theme);
      if (themeData && themeData.words) {
        count += themeData.words.length;
      }
    });
    return count;
  };

  return {
    books,              // 所有可用词书
    selectedBook,       // 当前选中的词书
    selectBook,         // 选择词书
    getWordThemes,      // 获取主题数据
    getRandomWords,     // 获取随机单词
    getWordCount,       // 获取单词总数
  };
}
