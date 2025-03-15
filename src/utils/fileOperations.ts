import { Story } from "./types";
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

// Export story as JSON file
export const exportStoryAsFile = (story: Story): void => {
  try {
    // Use the migrated story to ensure it's in the latest format
    const updatedStory = migrateStoryElementsToNewFormat(story);
    
    const storyJson = JSON.stringify(updatedStory, null, 2);
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
