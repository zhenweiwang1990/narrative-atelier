import { Story } from "./types";

const STORY_STORAGE_KEY = "interactive-story-editor";

// Load story from localStorage
export const loadStory = (): Story | null => {
  try {
    const storyData = localStorage.getItem(STORY_STORAGE_KEY);
    if (!storyData) return null;

    return JSON.parse(storyData);
  } catch (error) {
    console.error("Failed to load story from localStorage:", error);
    return null;
  }
};

// Save story to localStorage
export const saveStory = (story: Story): void => {
  try {
    localStorage.setItem(STORY_STORAGE_KEY, JSON.stringify(story));
  } catch (error) {
    console.error("Failed to save story to localStorage:", error);
  }
};

// Export story as JSON file
export const exportStory = (story: Story): void => {
  try {
    const storyJson = JSON.stringify(story, null, 2);
    const blob = new Blob([storyJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${story.title.replace(/\s+/g, "_")}_story.json`;
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to export story:", error);
  }
};

// Create blank story template
export const createBlankStory = (): Story => {
  const storyId = `story_${Date.now()}`;
  const startSceneId = `scene_${Date.now()}`;
  const protagonistId = `character_${Date.now()}`;
  const locationId = `location_${Date.now()}`;

  return {
    id: storyId,
    title: "新剧情",
    author: "Anonymous",
    description: "一个新剧情",
    type: "interactive", // Add the required type property
    characters: [
      {
        id: protagonistId,
        name: "主角",
        gender: "other",
        role: "protagonist",
        bio: "剧情的主角",
      },
    ],
    locations: [
      {
        id: locationId,
        name: "起始地点",
        description: "剧情开始的地方.",
        scenes: [startSceneId],
      },
    ],
    scenes: [
      {
        id: startSceneId,
        title: "开始",
        type: "start",
        locationId: locationId,
        position: { x: 100, y: 100 }, // This is already correct
        elements: [
          {
            id: `element_${Date.now()}`,
            type: "narration",
            text: "剧情从这里开始...",
          },
        ],
      },
    ],
    globalValues: [],
  };
};

// Generate unique ID
export const generateId = (prefix: string): string => {
  return `${prefix}_${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 9)}`;
};
