import { Story, Scene, Character, Location } from '@/types';
import { generateId } from './storage';

// Function to load the default "Red Dress" story from a JSON file in the public directory
export const loadDefaultRedDressStory = async (): Promise<Story | null> => {
  try {
    const response = await fetch('/red-dress-story.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as Story;
  } catch (error) {
    console.error("Could not load default story:", error);
    return null;
  }
};

// Function to save all stories to localStorage
export const saveAllStories = (stories: Story[], currentStoryId: string) => {
  localStorage.setItem('stories', JSON.stringify(stories));
  localStorage.setItem('currentStoryId', currentStoryId);
};

// Function to get stories from localStorage
export const getStoriesFromStorage = (): Story[] => {
  const storedStories = localStorage.getItem('stories');
  return storedStories ? JSON.parse(storedStories) : [];
};

// Function to get the current story ID from localStorage
export const getCurrentStoryId = (): string | null => {
  return localStorage.getItem('currentStoryId');
};
