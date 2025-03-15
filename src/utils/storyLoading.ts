
import { Story, Scene, SceneElement } from './types';
import { generateId } from './storage';

// Load the default "Red Dress" story from the public directory
export const loadDefaultRedDressStory = async (): Promise<Story | null> => {
  try {
    // Fetch the JSON file directly from the public directory
    const response = await fetch('/红衣如故.json');
    if (!response.ok) {
      throw new Error('Failed to fetch red dress story');
    }
    
    const storyData = await response.json() as Story;
    
    // Add a unique ID to the story
    storyData.id = generateId("story");
    
    // Make sure the story is migrated to the latest format
    return migrateStoryElementsToNewFormat(storyData);
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

// Add a migration function for the new ElementOutcome structure and to remove order field
export const migrateStoryElementsToNewFormat = (story: Story): Story => {
  // Create a deep copy to avoid mutating the original
  const updatedStory = JSON.parse(JSON.stringify(story));
  
  // Update all scenes' elements
  updatedStory.scenes.forEach((scene: Scene) => {
    // Sort elements by order field before removing it
    if (scene.elements && scene.elements.length > 0 && 'order' in scene.elements[0]) {
      scene.elements.sort((a: any, b: any) => a.order - b.order);
    }
    
    // Then remove the order field from each element
    scene.elements = scene.elements.map((element: any) => {
      // Create a new element without the order field
      const { order, ...elementWithoutOrder } = element;
      
      // Process QTE elements for outcome structure
      if (element.type === 'qte') {
        const qteElement = elementWithoutOrder;
        
        // Migrate success outcome
        if (element.successSceneId !== undefined || element.successTransition !== undefined || element.successValueChanges !== undefined) {
          qteElement.success = {
            sceneId: element.successSceneId || '',
            transition: element.successTransition || '',
            valueChanges: element.successValueChanges || []
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
        if (element.failureSceneId !== undefined || element.failureTransition !== undefined || element.failureValueChanges !== undefined) {
          qteElement.failure = {
            sceneId: element.failureSceneId || '',
            transition: element.failureTransition || '',
            valueChanges: element.failureValueChanges || []
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
      
      // Process DialogueTask elements for outcome structure
      if (element.type === 'dialogueTask') {
        const dialogueElement = elementWithoutOrder;
        
        // Migrate success outcome
        if (element.successSceneId !== undefined || element.successTransition !== undefined || element.successValueChanges !== undefined) {
          dialogueElement.success = {
            sceneId: element.successSceneId || '',
            transition: element.successTransition || '',
            valueChanges: element.successValueChanges || []
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
        if (element.failureSceneId !== undefined || element.failureTransition !== undefined || element.failureValueChanges !== undefined) {
          dialogueElement.failure = {
            sceneId: element.failureSceneId || '',
            transition: element.failureTransition || '',
            valueChanges: element.failureValueChanges || []
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
      
      return elementWithoutOrder;
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
