
import { useState, useEffect } from 'react';
import { Story } from '@/utils/types';
import { loadStory, saveStory, createBlankStory, generateId } from '@/utils/storage';
import { toast } from 'sonner';

const STORIES_STORAGE_KEY = "interactive-story-editor-stories";
const CURRENT_STORY_ID_KEY = "interactive-story-editor-current-id";

export function useStoryManagement() {
  const [story, setStory] = useState<Story | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  // Load stories on component mount
  useEffect(() => {
    loadStories();
  }, []);

  const loadDefaultRedDressStory = async (): Promise<Story | null> => {
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

  const loadStories = async () => {
    try {
      // Load list of stories
      const storiesData = localStorage.getItem(STORIES_STORAGE_KEY);
      let loadedStories: Story[] = [];
      
      if (storiesData) {
        loadedStories = JSON.parse(storiesData);
      }
      
      // If no stories exist, create default examples
      if (loadedStories.length === 0) {
        // Create a blank story
        const blankStory = createBlankStory();
        blankStory.title = "空白剧情";
        
        // Load the Red Dress story from public directory
        const redDressStory = await loadDefaultRedDressStory();
        
        if (redDressStory) {
          loadedStories = [blankStory, redDressStory];
          toast.success('已加载默认示例剧情');
        } else {
          loadedStories = [blankStory];
        }
        
        // Save the default stories
        saveAllStories(loadedStories, loadedStories[0].id);
      }
      
      // Load current story ID
      const currentStoryId = localStorage.getItem(CURRENT_STORY_ID_KEY);
      
      // Find current story or use the first one
      const currentStory = currentStoryId 
        ? loadedStories.find(s => s.id === currentStoryId) 
        : loadedStories[0];
      
      setStories(loadedStories);
      setStory(currentStory || loadedStories[0]);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load stories:', error);
      setLoading(false);
    }
  };

  // Save all stories and current story ID
  const saveAllStories = (storiesToSave: Story[], currentId: string) => {
    try {
      localStorage.setItem(STORIES_STORAGE_KEY, JSON.stringify(storiesToSave));
      localStorage.setItem(CURRENT_STORY_ID_KEY, currentId);
    } catch (error) {
      console.error('Failed to save stories:', error);
      toast.error('保存剧情失败');
    }
  };

  // Handle story import
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedStory = JSON.parse(event.target?.result as string) as Story;
        
        // Generate a new ID to avoid conflicts
        if (!importedStory.id) {
          importedStory.id = generateId("story");
        }
        
        // Check if a story with this ID already exists
        const existingIndex = stories.findIndex(s => s.id === importedStory.id);
        let updatedStories: Story[];
        
        if (existingIndex >= 0) {
          // Replace existing story
          updatedStories = [...stories];
          updatedStories[existingIndex] = importedStory;
        } else {
          // Add as new story
          updatedStories = [...stories, importedStory];
        }
        
        setStories(updatedStories);
        setStory(importedStory);
        saveAllStories(updatedStories, importedStory.id);
        toast.success('导入剧情成功');
      } catch (error) {
        console.error('Failed to parse imported story:', error);
        toast.error('导入剧情失败');
      }
    };
    reader.readAsText(file);
    
    // Reset input value to allow importing the same file again
    e.target.value = '';
  };

  // Create a new story
  const createNewStory = (title: string) => {
    const newStory = createBlankStory();
    newStory.title = title;
    
    const updatedStories = [...stories, newStory];
    setStories(updatedStories);
    setStory(newStory);
    saveAllStories(updatedStories, newStory.id);
    toast.success('创建剧情成功');
  };

  // Delete a story
  const deleteStory = (storyId: string) => {
    // Prevent deleting the last story
    if (stories.length <= 1) {
      toast.error('无法删除最后一个剧情');
      return;
    }
    
    const updatedStories = stories.filter(s => s.id !== storyId);
    const newCurrentStory = updatedStories[0];
    
    setStories(updatedStories);
    setStory(newCurrentStory);
    saveAllStories(updatedStories, newCurrentStory.id);
    toast.success('删除剧情成功');
  };

  // Handle story save
  const handleSave = () => {
    if (story) {
      // Update the story in the stories array
      const updatedStories = stories.map(s => 
        s.id === story.id ? story : s
      );
      
      setStories(updatedStories);
      saveAllStories(updatedStories, story.id);
      toast.success('保存剧情成功');
    }
  };

  // Update current story when story changes
  useEffect(() => {
    if (story) {
      localStorage.setItem(CURRENT_STORY_ID_KEY, story.id);
    }
  }, [story]);

  return {
    story,
    setStory,
    stories,
    setStories,
    loading,
    handleSave,
    handleImport,
    createNewStory,
    deleteStory
  };
}
