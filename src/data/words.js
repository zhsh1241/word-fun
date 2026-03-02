export const wordThemes = {
  animals: {
    name: "动物世界",
    emoji: "🦁",
    color: "from-orange-400 to-yellow-400",
    words: [
      { word: "cat", chinese: "猫", emoji: "🐱", example: "I have a cute cat." },
      { word: "dog", chinese: "狗", emoji: "🐶", example: "The dog is running." },
      { word: "bird", chinese: "鸟", emoji: "🐦", example: "A bird can fly." },
      { word: "fish", chinese: "鱼", emoji: "🐟", example: "Fish live in water." },
      { word: "lion", chinese: "狮子", emoji: "🦁", example: "The lion is the king." },
      { word: "tiger", chinese: "老虎", emoji: "🐯", example: "Tigers have stripes." },
      { word: "bear", chinese: "熊", emoji: "🐻", example: "The bear loves honey." },
      { word: "monkey", chinese: "猴子", emoji: "🐵", example: "Monkeys climb trees." },
      { word: "elephant", chinese: "大象", emoji: "🐘", example: "Elephants are big." },
      { word: "rabbit", chinese: "兔子", emoji: "🐰", example: "The rabbit hops." },
    ],
  },
  fruits: {
    name: "水果乐园",
    emoji: "🍎",
    color: "from-red-400 to-pink-400",
    words: [
      { word: "apple", chinese: "苹果", emoji: "🍎", example: "An apple a day." },
      { word: "banana", chinese: "香蕉", emoji: "🍌", example: "Monkeys love bananas." },
      { word: "orange", chinese: "橙子", emoji: "🍊", example: "Oranges are juicy." },
      { word: "grape", chinese: "葡萄", emoji: "🍇", example: "Grapes grow on vines." },
      { word: "strawberry", chinese: "草莓", emoji: "🍓", example: "Strawberries are red." },
      { word: "watermelon", chinese: "西瓜", emoji: "🍉", example: "Watermelons are big." },
      { word: "peach", chinese: "桃子", emoji: "🍑", example: "Peaches are sweet." },
      { word: "pear", chinese: "梨", emoji: "🍐", example: "Pears are yummy." },
      { word: "cherry", chinese: "樱桃", emoji: "🍒", example: "Cherries are small." },
      { word: "lemon", chinese: "柠檬", emoji: "🍋", example: "Lemons are sour." },
    ],
  },
  colors: {
    name: "缤纷色彩",
    emoji: "🌈",
    color: "from-blue-400 to-purple-400",
    words: [
      { word: "red", chinese: "红色", emoji: "🔴", example: "Apples are red." },
      { word: "blue", chinese: "蓝色", emoji: "🔵", example: "The sky is blue." },
      { word: "green", chinese: "绿色", emoji: "🟢", example: "Grass is green." },
      { word: "yellow", chinese: "黄色", emoji: "🟡", example: "The sun is yellow." },
      { word: "orange", chinese: "橙色", emoji: "🟠", example: "Oranges are orange." },
      { word: "purple", chinese: "紫色", emoji: "🟣", example: "Grapes are purple." },
      { word: "pink", chinese: "粉色", emoji: "💗", example: "Flowers are pink." },
      { word: "black", chinese: "黑色", emoji: "⚫", example: "Pandas have black." },
      { word: "white", chinese: "白色", emoji: "⚪", example: "Snow is white." },
      { word: "brown", chinese: "棕色", emoji: "🟤", example: "Bears are brown." },
    ],
  },
};

export function getRandomWords(count, theme) {
  const words = wordThemes[theme]?.words || [];
  return [...words].sort(() => Math.random() - 0.5).slice(0, count);
}