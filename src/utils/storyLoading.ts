
import { Story } from '@/utils/types';
import { generateId } from '@/utils/storage';
import { toast } from 'sonner';

const STORIES_STORAGE_KEY = "interactive-story-editor-stories";
const CURRENT_STORY_ID_KEY = "interactive-story-editor-current-id";

/**
 * Loads the default Red Dress story from the public directory
 */
export const loadDefaultRedDressStory = async (): Promise<Story | null> => {
  try {
    const response = await fetch('/红衣如故.json');
    if (!response.ok) {
      console.error('Failed to load Red Dress story:', response.statusText);
      return null;
    }
    
    const redDressStory = await response.json();
    
    // Generate a new ID to avoid conflicts
    redDressStory.id = generateId("story");
    return redDressStory;
  } catch (error) {
    console.error('Error loading Red Dress story:', error);
    return null;
  }
};

/**
 * Saves all stories and the current story ID to localStorage
 */
export const saveAllStories = (storiesToSave: Story[], currentId: string): void => {
  try {
    localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(storiesToSave));
    localStorage.setItem(CURRENT_STORY_ID_KEY, currentId);
  } catch (error) {
    console.error('Failed to save stories:', error);
    toast.error('保存剧情失败');
    throw error; // Rethrow to allow caller to handle
  }
};

/**
 * Retrieves all stories from localStorage
 */
export const getStoriesFromStorage = (): Story[] => {
  const storiesData = localStorage.getItem(STORIES_STORAGE_KEY);
  if (storiesData) {
    try {
      return JSON.parse(storiesData);
    } catch (parseError) {
      console.error('Failed to parse stories data:', parseError);
      // Return empty array rather than failing completely
      return [];
    }
  }
  return [];
};

/**
 * Gets the current story ID from localStorage
 */
export const getCurrentStoryId = (): string | null => {
  return localStorage.getItem(CURRENT_STORY_ID_KEY);
};
