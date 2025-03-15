
import { Story } from '@/utils/types';
import { createBlankStory, generateId } from '@/utils/storage';
import { saveAllStories } from './storyLoading';
import { toast } from 'sonner';

/**
 * Creates a new story with the given title
 */
export const createNewStoryUtil = (
  title: string, 
  existingStories: Story[]
): { newStory: Story; updatedStories: Story[] } => {
  const newStory = createBlankStory();
  newStory.title = title;
  
  const updatedStories = [...existingStories, newStory];
  return { newStory, updatedStories };
};

/**
 * Deletes a story by ID
 */
export const deleteStoryUtil = (
  storyId: string, 
  allStories: Story[]
): { updatedStories: Story[]; newCurrentStory: Story | null } => {
  // Prevent deleting the last story
  if (allStories.length <= 1) {
    toast.error('无法删除最后一个剧情');
    return { updatedStories: allStories, newCurrentStory: null };
  }
  
  const updatedStories = allStories.filter(s => s.id !== storyId);
  const newCurrentStory = updatedStories[0];
  
  return { updatedStories, newCurrentStory };
};

/**
 * Updates a story in the stories array
 */
export const updateStoryInList = (
  storyToUpdate: Story, 
  allStories: Story[]
): Story[] => {
  return allStories.map(s => s.id === storyToUpdate.id ? storyToUpdate : s);
};

/**
 * Handles importing a story from a JSON file
 */
export const processImportedStory = (
  data: any, 
  existingStories: Story[]
): { importedStory: Story; updatedStories: Story[] } | null => {
  try {
    // Basic validation
    if (!data || !data.title || !Array.isArray(data.scenes)) {
      throw new Error('Invalid story format');
    }
    
    const importedStory = data as Story;
    
    // Generate a new ID to avoid conflicts
    if (!importedStory.id) {
      importedStory.id = generateId("story");
    }
    
    // Check if a story with this ID already exists
    const existingIndex = existingStories.findIndex(s => s.id === importedStory.id);
    let updatedStories: Story[];
    
    if (existingIndex >= 0) {
      // Replace existing story
      updatedStories = [...existingStories];
      updatedStories[existingIndex] = importedStory;
    } else {
      // Add as new story
      updatedStories = [...existingStories, importedStory];
    }
    
    return { importedStory, updatedStories };
  } catch (error) {
    console.error('Failed to process imported story:', error);
    return null;
  }
};
