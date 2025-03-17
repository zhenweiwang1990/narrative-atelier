
import { Story, Scene, Location, GlobalValue } from "../types";
import { generateId } from "./storage";
import { migrateStoryElementsToNewFormat } from './storyLoading';

// Function to read and parse a story file
export const readStoryFile = (
  file: File,
  existingStories: Story[],
  onSuccess: (importedStory: Story, updatedStories: Story[]) => void,
  onError: (message: string) => void
): void => {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      const data = JSON.parse(content);
      
      // Validate the imported data
      if (!data || !data.title || !Array.isArray(data.scenes)) {
        onError('导入的文件格式不正确');
        return;
      }
      
      // Migrate legacy elements to new format
      const migratedStory = migrateStoryElementsToNewFormat(data);
      
      // Ensure a unique ID
      if (!migratedStory.id) {
        migratedStory.id = generateId("story");
      }
      
      // Check if a story with this ID already exists
      const existingIndex = existingStories.findIndex(s => s.id === migratedStory.id);
      let updatedStories: Story[];
      
      if (existingIndex >= 0) {
        // Replace existing story
        updatedStories = [...existingStories];
        updatedStories[existingIndex] = migratedStory;
      } else {
        // Add as new story
        updatedStories = [...existingStories, migratedStory];
      }
      
      onSuccess(migratedStory, updatedStories);
      
    } catch (error) {
      console.error('导入剧情时发生错误:', error);
      onError('导入剧情时发生错误: ' + (error instanceof Error ? error.message : String(error)));
    }
  };
  
  reader.onerror = () => {
    onError('读取文件时发生错误');
  };
  
  reader.readAsText(file);
};

// Optimize story data for export
const optimizeStoryForExport = (story: Story): any => {
  // Deep clone the story to avoid modifying the original
  const optimizedStory = JSON.parse(JSON.stringify(story));
  
  // 1. Remove position data from scenes
  if (optimizedStory.scenes && optimizedStory.scenes.length > 0) {
    optimizedStory.scenes = optimizedStory.scenes.map((scene: Scene) => {
      const { position, ...sceneWithoutPosition } = scene;
      return sceneWithoutPosition;
    });
  }
  
  // 2. Remove scenes arrays from locations
  if (optimizedStory.locations && optimizedStory.locations.length > 0) {
    optimizedStory.locations = optimizedStory.locations.map((location: Location) => {
      const { scenes, ...locationWithoutScenes } = location;
      return locationWithoutScenes;
    });
  }
  
  // 3. Remove type from global values
  if (optimizedStory.globalValues && optimizedStory.globalValues.length > 0) {
    optimizedStory.globalValues = optimizedStory.globalValues.map((value: any) => {
      const { type, ...valueWithoutType } = value;
      return valueWithoutType;
    });
  }
  
  return optimizedStory;
};

// Export story as JSON file
export const exportStoryAsFile = (story: Story): void => {
  try {
    // Use the migrated story to ensure it's in the latest format
    const updatedStory = migrateStoryElementsToNewFormat(story);
    
    // Optimize story for export
    const optimizedStory = optimizeStoryForExport(updatedStory);
    
    const storyJson = JSON.stringify(optimizedStory, null, 2);
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
