import { Story, Scene, SceneElement } from './types';
import redDress from '@/public/stories/red-dress.json';
import { generateId } from './storage';

// Load the default "Red Dress" story from the public directory
export const loadDefaultRedDressStory = async (): Promise<Story | null> => {
  try {
    // The redDress object is already the parsed JSON
    const storyData = redDress as Story;
    
    // Add a unique ID to the story
    storyData.id = generateId("story");
    
    return storyData;
  } catch (error) {
    console.error("Failed to load default story:", error);
    return null;
  }
};

// Save all stories to localStorage
export const saveAllStories = (stories: Story[], currentStoryId: string): void => {
  try {
    localStorage.setItem('interactive-story-editor-all', JSON.stringify(stories));
    localStorage.setItem('interactive-story-editor-current-id', currentStoryId);
  } catch (error) {
    console.error('Failed to save stories to localStorage:', error);
  }
};

// Get the current story ID from localStorage
export const getCurrentStoryId = (): string | null => {
  try {
    return localStorage.getItem('interactive-story-editor-current-id');
  } catch (error) {
    console.error('Failed to get current story ID from localStorage:', error);
    return null;
  }
};

// Add a migration function for the new ElementOutcome structure
export const migrateStoryElementsToNewFormat = (story: Story): Story => {
  // Create a deep copy to avoid mutating the original
  const updatedStory = JSON.parse(JSON.stringify(story));
  
  // Update all scenes' elements
  updatedStory.scenes.forEach((scene: Scene) => {
    scene.elements.forEach((element: SceneElement) => {
      if (element.type === 'qte') {
        const qteElement = element as any; // Use any to access legacy properties
        
        // Migrate success outcome
        if (qteElement.successSceneId !== undefined || qteElement.successTransition !== undefined || qteElement.successValueChanges !== undefined) {
          qteElement.success = {
            sceneId: qteElement.successSceneId || '',
            transition: qteElement.successTransition || '',
            valueChanges: qteElement.successValueChanges || []
          };
          
          // Clean up legacy properties
          delete qteElement.successSceneId;
          delete qteElement.successTransition;
          delete qteElement.successValueChanges;
        }
        
        // Ensure success property exists
        if (!qteElement.success) {
          qteElement.success = { sceneId: '' };
        }
        
        // Migrate failure outcome
        if (qteElement.failureSceneId !== undefined || qteElement.failureTransition !== undefined || qteElement.failureValueChanges !== undefined) {
          qteElement.failure = {
            sceneId: qteElement.failureSceneId || '',
            transition: qteElement.failureTransition || '',
            valueChanges: qteElement.failureValueChanges || []
          };
          
          // Clean up legacy properties
          delete qteElement.failureSceneId;
          delete qteElement.failureTransition;
          delete qteElement.failureValueChanges;
        }
        
        // Ensure failure property exists
        if (!qteElement.failure) {
          qteElement.failure = { sceneId: '' };
        }
      }
      
      if (element.type === 'dialogueTask') {
        const dialogueElement = element as any; // Use any to access legacy properties
        
        // Migrate success outcome
        if (dialogueElement.successSceneId !== undefined || dialogueElement.successTransition !== undefined || dialogueElement.successValueChanges !== undefined) {
          dialogueElement.success = {
            sceneId: dialogueElement.successSceneId || '',
            transition: dialogueElement.successTransition || '',
            valueChanges: dialogueElement.successValueChanges || []
          };
          
          // Clean up legacy properties
          delete dialogueElement.successSceneId;
          delete dialogueElement.successTransition;
          delete dialogueElement.successValueChanges;
        }
        
        // Ensure success property exists
        if (!dialogueElement.success) {
          dialogueElement.success = { sceneId: '' };
        }
        
        // Migrate failure outcome
        if (dialogueElement.failureSceneId !== undefined || dialogueElement.failureTransition !== undefined || dialogueElement.failureValueChanges !== undefined) {
          dialogueElement.failure = {
            sceneId: dialogueElement.failureSceneId || '',
            transition: dialogueElement.failureTransition || '',
            valueChanges: dialogueElement.failureValueChanges || []
          };
          
          // Clean up legacy properties
          delete dialogueElement.failureSceneId;
          delete dialogueElement.failureTransition;
          delete dialogueElement.failureValueChanges;
        }
        
        // Ensure failure property exists
        if (!dialogueElement.failure) {
          dialogueElement.failure = { sceneId: '' };
        }
      }
    });
  });
  
  return updatedStory;
};

// Modify the getStoriesFromStorage function to migrate stories
export const getStoriesFromStorage = (): Story[] => {
  try {
    const allStoriesData = localStorage.getItem('interactive-story-editor-all');
    
    if (!allStoriesData) {
      return [];
    }
    
    const parsedStories: Story[] = JSON.parse(allStoriesData);
    
    // Apply migration to each story
    return parsedStories.map(story => migrateStoryElementsToNewFormat(story));
  } catch (error) {
    console.error('Failed to load stories from localStorage:', error);
    return [];
  }
};
