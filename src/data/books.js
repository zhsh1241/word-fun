// 词书配置文件
// 每个词书包含多个主题

export const books = [
  {
    id: "preschool",
    name: "幼儿园启蒙",
    description: "适合3-6岁，基础词汇学习",
    emoji: "🎈",
    level: 1,
    levelName: "入门",
    themes: ["animals", "fruits", "colors"],
    getThemeData: (theme) => {
      const themes = {
        animals: {
          name: "可爱动物",
          emoji: "🐾",
          color: "from-orange-400 to-yellow-400",
          words: [
            { word: "cat", chinese: "猫", emoji: "🐱", example: "I have a cute cat." },
            { word: "dog", chinese: "狗", emoji: "🐶", example: "The dog is running." },
            { word: "bird", chinese: "鸟", emoji: "🐦", example: "A bird can fly." },
            { word: "fish", chinese: "鱼", emoji: "🐟", example: "Fish live in water." },
            { word: "duck", chinese: "鸭子", emoji: "🦆", example: "The duck quacks." },
          ],
        },
        fruits: {
          name: "美味水果",
          emoji: "🍎",
          color: "from-red-400 to-pink-400",
          words: [
            { word: "apple", chinese: "苹果", emoji: "🍎", example: "An apple a day." },
            { word: "banana", chinese: "香蕉", emoji: "🍌", example: "Monkeys love bananas." },
            { word: "orange", chinese: "橙子", emoji: "🍊", example: "Oranges are juicy." },
            { word: "grape", chinese: "葡萄", emoji: "🍇", example: "Grapes grow on vines." },
            { word: "pear", chinese: "梨", emoji: "🍐", example: "Pears are yummy." },
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
            { word: "pink", chinese: "粉色", emoji: "💗", example: "Flowers are pink." },
          ],
        },
      };
      return themes[theme];
    },
  },
  {
    id: "primary",
    name: "小学英语",
    description: "适合6-12岁，小学常用词汇",
    emoji: "📚",
    level: 2,
    levelName: "初级",
    themes: ["animals", "fruits", "colors", "food", "family"],
    getThemeData: (theme) => {
      const themes = {
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
        food: {
          name: "美食天地",
          emoji: "🍕",
          color: "from-amber-400 to-orange-400",
          words: [
            { word: "bread", chinese: "面包", emoji: "🍞", example: "I eat bread for breakfast." },
            { word: "rice", chinese: "米饭", emoji: "🍚", example: "Rice is a staple food." },
            { word: "egg", chinese: "鸡蛋", emoji: "🥚", example: "Eggs are nutritious." },
            { word: "milk", chinese: "牛奶", emoji: "🥛", example: "Milk is good for bones." },
            { word: "cake", chinese: "蛋糕", emoji: "🎂", example: "I like birthday cake." },
            { word: "pizza", chinese: "披萨", emoji: "🍕", example: "Pizza is delicious." },
            { word: "ice cream", chinese: "冰淇淋", emoji: "🍦", example: "Ice cream is cold." },
            { word: "hamburger", chinese: "汉堡", emoji: "🍔", example: "Hamburgers are fast food." },
          ],
        },
        family: {
          name: "我的家庭",
          emoji: "👨‍👩‍👧",
          color: "from-pink-400 to-rose-400",
          words: [
            { word: "mom", chinese: "妈妈", emoji: "👩", example: "Mom loves me." },
            { word: "dad", chinese: "爸爸", emoji: "👨", example: "Dad is tall." },
            { word: "brother", chinese: "兄弟", emoji: "👦", example: "My brother plays soccer." },
            { word: "sister", chinese: "姐妹", emoji: "👧", example: "My sister reads books." },
            { word: "grandma", chinese: "奶奶", emoji: "👵", example: "Grandma cooks well." },
            { word: "grandpa", chinese: "爷爷", emoji: "👴", example: "Grandpa tells stories." },
            { word: "baby", chinese: "宝宝", emoji: "👶", example: "The baby is cute." },
            { word: "family", chinese: "家庭", emoji: "👨‍👩‍👧‍👦", example: "I love my family." },
          ],
        },
      };
      return themes[theme];
    },
  },
  {
    id: "junior",
    name: "初中英语",
    description: "适合12-15岁，初中核心词汇",
    emoji: "🎓",
    level: 3,
    levelName: "中级",
    themes: ["school", "weather", "body", "sports", "travel"],
    getThemeData: (theme) => {
      const themes = {
        school: {
          name: "校园生活",
          emoji: "🏫",
          color: "from-indigo-400 to-blue-400",
          words: [
            { word: "teacher", chinese: "老师", emoji: "👩‍🏫", example: "The teacher is kind." },
            { word: "student", chinese: "学生", emoji: "👨‍🎓", example: "I am a student." },
            { word: "book", chinese: "书", emoji: "📖", example: "This book is interesting." },
            { word: "pen", chinese: "钢笔", emoji: "🖊️", example: "I write with a pen." },
            { word: "desk", chinese: "课桌", emoji: "🪑", example: "My desk is clean." },
            { word: "homework", chinese: "作业", emoji: "📝", example: "I finished my homework." },
            { word: "exam", chinese: "考试", emoji: "📋", example: "The exam was hard." },
            { word: "classroom", chinese: "教室", emoji: "🚪", example: "Our classroom is big." },
          ],
        },
        weather: {
          name: "天气气候",
          emoji: "🌤️",
          color: "from-cyan-400 to-sky-400",
          words: [
            { word: "sunny", chinese: "晴朗的", emoji: "☀️", example: "It is sunny today." },
            { word: "rainy", chinese: "下雨的", emoji: "🌧️", example: "It is a rainy day." },
            { word: "cloudy", chinese: "多云的", emoji: "☁️", example: "The sky is cloudy." },
            { word: "windy", chinese: "有风的", emoji: "💨", example: "It is windy outside." },
            { word: "snowy", chinese: "下雪的", emoji: "❄️", example: "Winter is snowy." },
            { word: "hot", chinese: "热的", emoji: "🌡️", example: "Summer is hot." },
            { word: "cold", chinese: "冷的", emoji: "🥶", example: "It is cold in winter." },
            { word: "warm", chinese: "温暖的", emoji: "🌡️", example: "Spring is warm." },
          ],
        },
        body: {
          name: "身体部位",
          emoji: "🧍",
          color: "from-rose-400 to-pink-400",
          words: [
            { word: "head", chinese: "头", emoji: "🗣️", example: "My head hurts." },
            { word: "eye", chinese: "眼睛", emoji: "👁️", example: "I have two eyes." },
            { word: "ear", chinese: "耳朵", emoji: "👂", example: "I hear with my ears." },
            { word: "nose", chinese: "鼻子", emoji: "👃", example: "My nose is small." },
            { word: "mouth", chinese: "嘴巴", emoji: "👄", example: "I eat with my mouth." },
            { word: "hand", chinese: "手", emoji: "✋", example: "I write with my hand." },
            { word: "foot", chinese: "脚", emoji: "🦶", example: "I walk with my feet." },
            { word: "arm", chinese: "手臂", emoji: "💪", example: "My arm is strong." },
          ],
        },
        sports: {
          name: "体育运动",
          emoji: "⚽",
          color: "from-green-400 to-emerald-400",
          words: [
            { word: "soccer", chinese: "足球", emoji: "⚽", example: "I play soccer." },
            { word: "basketball", chinese: "篮球", emoji: "🏀", example: "Basketball is fun." },
            { word: "tennis", chinese: "网球", emoji: "🎾", example: "She plays tennis." },
            { word: "swimming", chinese: "游泳", emoji: "🏊", example: "Swimming is healthy." },
            { word: "running", chinese: "跑步", emoji: "🏃", example: "Running is good exercise." },
            { word: "cycling", chinese: "骑车", emoji: "🚴", example: "I like cycling." },
            { word: "baseball", chinese: "棒球", emoji: "⚾", example: "Baseball is popular." },
            { word: "volleyball", chinese: "排球", emoji: "🏐", example: "We play volleyball." },
          ],
        },
        travel: {
          name: "旅游出行",
          emoji: "✈️",
          color: "from-violet-400 to-purple-400",
          words: [
            { word: "airplane", chinese: "飞机", emoji: "✈️", example: "We take an airplane." },
            { word: "train", chinese: "火车", emoji: "🚂", example: "The train is fast." },
            { word: "bus", chinese: "公交车", emoji: "🚌", example: "I take the bus to school." },
            { word: "car", chinese: "汽车", emoji: "🚗", example: "My dad drives a car." },
            { word: "bicycle", chinese: "自行车", emoji: "🚲", example: "I ride a bicycle." },
            { word: "ship", chinese: "船", emoji: "🚢", example: "The ship sails on the sea." },
            { word: "hotel", chinese: "酒店", emoji: "🏨", example: "We stay at a hotel." },
            { word: "airport", chinese: "机场", emoji: "🛫", example: "The airport is busy." },
          ],
        },
      };
      return themes[theme];
    },
  },
];

// 获取词书的总单词数
export function getBookWordCount(book) {
  let count = 0;
  book.themes.forEach((theme) => {
    const themeData = book.getThemeData(theme);
    if (themeData && themeData.words) {
      count += themeData.words.length;
    }
  });
  return count;
}

// 获取词书的所有主题数据
export function getBookThemes(book) {
  return book.themes.map((theme) => book.getThemeData(theme)).filter(Boolean);
}

// 默认词书
export const defaultBook = books[0];
