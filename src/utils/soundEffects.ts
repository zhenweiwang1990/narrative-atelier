
// Define mock sound effects library with two-level categorization
export interface SoundEffect {
  id: string;
  name: string;
  url: string;
}

export interface SoundEffectCategory {
  id: string;
  name: string;
  subcategories: SoundEffectSubcategory[];
}

export interface SoundEffectSubcategory {
  id: string;
  name: string;
  effects: SoundEffect[];
}

// Mock sound effects library
export const soundEffectsLibrary: SoundEffectCategory[] = [
  {
    id: "nature",
    name: "自然",
    subcategories: [
      {
        id: "weather",
        name: "天气",
        effects: [
          { id: "rain", name: "雨声", url: "https://example.com/sounds/rain.mp3" },
          { id: "thunder", name: "雷声", url: "https://example.com/sounds/thunder.mp3" },
          { id: "wind", name: "风声", url: "https://example.com/sounds/wind.mp3" },
          { id: "storm", name: "暴风雨", url: "https://example.com/sounds/storm.mp3" }
        ]
      },
      {
        id: "animals",
        name: "动物",
        effects: [
          { id: "birds", name: "鸟叫", url: "https://example.com/sounds/birds.mp3" },
          { id: "wolves", name: "狼嚎", url: "https://example.com/sounds/wolves.mp3" },
          { id: "insects", name: "虫鸣", url: "https://example.com/sounds/insects.mp3" },
          { id: "forest", name: "森林氛围", url: "https://example.com/sounds/forest.mp3" }
        ]
      }
    ]
  },
  {
    id: "ambient",
    name: "环境",
    subcategories: [
      {
        id: "urban",
        name: "城市",
        effects: [
          { id: "crowd", name: "人群喧嚣", url: "https://example.com/sounds/crowd.mp3" },
          { id: "traffic", name: "交通", url: "https://example.com/sounds/traffic.mp3" },
          { id: "construction", name: "建筑工地", url: "https://example.com/sounds/construction.mp3" },
          { id: "market", name: "市场", url: "https://example.com/sounds/market.mp3" }
        ]
      },
      {
        id: "indoor",
        name: "室内",
        effects: [
          { id: "fireplace", name: "壁炉", url: "https://example.com/sounds/fireplace.mp3" },
          { id: "kitchen", name: "厨房", url: "https://example.com/sounds/kitchen.mp3" },
          { id: "creaking", name: "木板吱嘎声", url: "https://example.com/sounds/creaking.mp3" },
          { id: "clock", name: "时钟", url: "https://example.com/sounds/clock.mp3" }
        ]
      }
    ]
  },
  {
    id: "emotional",
    name: "情绪",
    subcategories: [
      {
        id: "suspense",
        name: "悬疑",
        effects: [
          { id: "heartbeat", name: "心跳声", url: "https://example.com/sounds/heartbeat.mp3" },
          { id: "suspense_build", name: "紧张渐强", url: "https://example.com/sounds/suspense_build.mp3" },
          { id: "mysterious", name: "神秘音效", url: "https://example.com/sounds/mysterious.mp3" },
          { id: "eerie", name: "怪异氛围", url: "https://example.com/sounds/eerie.mp3" }
        ]
      },
      {
        id: "dramatic",
        name: "戏剧性",
        effects: [
          { id: "revelation", name: "真相揭示", url: "https://example.com/sounds/revelation.mp3" },
          { id: "dramatic_sting", name: "戏剧性转折", url: "https://example.com/sounds/dramatic_sting.mp3" },
          { id: "success", name: "成功音效", url: "https://example.com/sounds/success.mp3" },
          { id: "failure", name: "失败音效", url: "https://example.com/sounds/failure.mp3" }
        ]
      }
    ]
  },
  {
    id: "objects",
    name: "物品",
    subcategories: [
      {
        id: "weapons",
        name: "武器",
        effects: [
          { id: "sword", name: "剑击", url: "https://example.com/sounds/sword.mp3" },
          { id: "gunshot", name: "枪声", url: "https://example.com/sounds/gunshot.mp3" },
          { id: "arrow", name: "弓箭", url: "https://example.com/sounds/arrow.mp3" },
          { id: "explosion", name: "爆炸", url: "https://example.com/sounds/explosion.mp3" }
        ]
      },
      {
        id: "everyday",
        name: "日常物品",
        effects: [
          { id: "door", name: "门开关", url: "https://example.com/sounds/door.mp3" },
          { id: "glass_break", name: "玻璃破碎", url: "https://example.com/sounds/glass_break.mp3" },
          { id: "footsteps", name: "脚步声", url: "https://example.com/sounds/footsteps.mp3" },
          { id: "paper", name: "纸张翻动", url: "https://example.com/sounds/paper.mp3" }
        ]
      }
    ]
  }
];

// Mock function for uploading music
export const uploadMusic = async (file: File): Promise<{ url: string; name: string }> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Create a fake URL for the uploaded file
      const url = URL.createObjectURL(file);
      resolve({
        url,
        name: file.name
      });
    }, 1500);
  });
};
