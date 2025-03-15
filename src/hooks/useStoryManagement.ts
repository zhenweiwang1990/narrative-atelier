
import { useState, useEffect } from 'react';
import { Story } from '@/utils/types';
import { createBlankStory } from '@/utils/storage';
import { toast } from 'sonner';
import { 
  loadDefaultRedDressStory, 
  saveAllStories,
  getStoriesFromStorage,
  getCurrentStoryId
} from '@/utils/storyLoading';
import {
  createNewStoryUtil,
  deleteStoryUtil,
  updateStoryInList
} from '@/utils/storyOperations';
import { readStoryFile, exportStoryAsFile } from '@/utils/fileOperations';

export function useStoryManagement() {
  const [story, setStory] = useState<Story | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load stories on component mount
  useEffect(() => {
    loadStories();
  }, []);

  const loadStories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Load list of stories
      let loadedStories = getStoriesFromStorage();
      
      // If no stories exist, create default examples
      if (loadedStories.length === 0) {
        // Create a blank story
        const blankStory = createBlankStory();
        blankStory.title = "空白剧情";
        
        try {
          // Load the Red Dress story from public directory
          const redDressStory = await loadDefaultRedDressStory();
          
          if (redDressStory) {
            loadedStories = [blankStory, redDressStory];
            toast.success('已加载默认示例剧情');
          } else {
            loadedStories = [blankStory];
            console.warn('无法加载示例剧情，仅加载空白剧情');
          }
        } catch (demoError) {
          console.error('Failed to load demo story:', demoError);
          loadedStories = [blankStory];
          toast.warning('无法加载示例剧情，仅加载空白剧情');
        }
        
        // Save the default stories
        try {
          saveAllStories(loadedStories, loadedStories[0].id);
        } catch (saveError) {
          console.error('Failed to save default stories:', saveError);
          setError('保存默认剧情失败');
          toast.error('保存默认剧情失败');
        }
      }
      
      // Load current story ID
      const currentStoryId = getCurrentStoryId();
      
      // Find current story or use the first one
      const currentStory = currentStoryId 
        ? loadedStories.find(s => s.id === currentStoryId) 
        : loadedStories[0];
      
      setStories(loadedStories);
      setStory(currentStory || loadedStories[0]);
    } catch (error) {
      console.error('Failed to load stories:', error);
      setError('加载剧情数据失败: ' + (error instanceof Error ? error.message : String(error)));
      toast.error('加载剧情数据失败');
    } finally {
      setLoading(false);
    }
  };

  // Handle story import
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    readStoryFile(
      file,
      stories,
      (importedStory, updatedStories) => {
        try {
          setStories(updatedStories);
          setStory(importedStory);
          saveAllStories(updatedStories, importedStory.id);
        } catch (saveError) {
          console.error('Failed to save imported story:', saveError);
          setError('保存导入的剧情失败');
          toast.error('保存导入的剧情失败');
        }
      },
      (errorMessage) => {
        setError(errorMessage);
      }
    );
    
    // Reset input value to allow importing the same file again
    e.target.value = '';
  };

  // Create a new story
  const createNewStory = (title: string) => {
    setError(null);
    try {
      const { newStory, updatedStories } = createNewStoryUtil(title, stories);
      
      setStories(updatedStories);
      setStory(newStory);
      saveAllStories(updatedStories, newStory.id);
      toast.success('创建剧情成功');
    } catch (error) {
      console.error('Failed to create new story:', error);
      setError('创建剧情失败');
      toast.error('创建剧情失败');
    }
  };

  // Delete a story
  const deleteStory = (storyId: string) => {
    setError(null);
    
    const { updatedStories, newCurrentStory } = deleteStoryUtil(storyId, stories);
    
    // If operation was cancelled (e.g., trying to delete the last story)
    if (!newCurrentStory) return;
    
    try {
      setStories(updatedStories);
      setStory(newCurrentStory);
      saveAllStories(updatedStories, newCurrentStory.id);
      toast.success('删除剧情成功');
    } catch (error) {
      console.error('Failed to delete story:', error);
      setError('删除剧情失败');
      toast.error('删除剧情失败');
    }
  };

  // Handle story save
  const handleSave = async (): Promise<boolean> => {
    setError(null);
    
    if (story) {
      try {
        // Update the story in the stories array
        const updatedStories = updateStoryInList(story, stories);
        
        setStories(updatedStories);
        saveAllStories(updatedStories, story.id);
        toast.success('保存剧情成功');
        return true;
      } catch (error) {
        console.error('Failed to save story:', error);
        setError('保存剧情失败');
        toast.error('保存剧情失败');
        return false;
      }
    }
    return false;
  };

  // Handle story export
  const handleExport = () => {
    if (!story) {
      toast.error('没有可导出的剧情');
      return;
    }
    
    exportStoryAsFile(story);
  };

  // Update current story when story changes
  useEffect(() => {
    if (story) {
      try {
        localStorage.setItem("interactive-story-editor-current-id", story.id);
      } catch (error) {
        console.error('Failed to save current story ID:', error);
        // Don't show toast for this minor error to avoid too many notifications
      }
    }
  }, [story]);

  return {
    story,
    setStory,
    stories,
    setStories,
    loading,
    error,
    handleSave,
    handleImport,
    handleExport,
    createNewStory,
    deleteStory
  };
}
