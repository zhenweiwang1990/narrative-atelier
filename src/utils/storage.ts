
import { Story } from './types';

const STORY_STORAGE_KEY = 'interactive-story-editor';

// Load story from localStorage
export const loadStory = (): Story | null => {
  try {
    const storyData = localStorage.getItem(STORY_STORAGE_KEY);
    if (!storyData) return null;
    
    return JSON.parse(storyData);
  } catch (error) {
    console.error('Failed to load story from localStorage:', error);
    return null;
  }
};

// Save story to localStorage
export const saveStory = (story: Story): void => {
  try {
    localStorage.setItem(STORY_STORAGE_KEY, JSON.stringify(story));
  } catch (error) {
    console.error('Failed to save story to localStorage:', error);
  }
};

// Export story as JSON file
export const exportStory = (story: Story): void => {
  try {
    const storyJson = JSON.stringify(story, null, 2);
    const blob = new Blob([storyJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${story.title.replace(/\s+/g, '_')}_story.json`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Failed to export story:', error);
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
    title: 'Untitled Story',
    author: 'Anonymous',
    description: 'An interactive story.',
    characters: [
      {
        id: protagonistId,
        name: 'Protagonist',
        gender: 'other',
        role: 'protagonist',
        bio: 'The main character of the story.'
      }
    ],
    locations: [
      {
        id: locationId,
        name: 'Starting Location',
        description: 'The place where the story begins.',
        scenes: [startSceneId]
      }
    ],
    scenes: [
      {
        id: startSceneId,
        title: 'Beginning',
        type: 'start',
        locationId: locationId,
        elements: [
          {
            id: `element_${Date.now()}`,
            type: 'narration',
            order: 0,
            text: 'The story begins here...'
          }
        ]
      }
    ],
    globalValues: [] // Added empty global values array
  };
};

// Generate unique ID
export const generateId = (prefix: string): string => {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};
