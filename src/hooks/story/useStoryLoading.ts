
import { useState, useEffect } from 'react';
import { Story } from '@/utils/types';
import { toast } from 'sonner';
import { 
  loadDefaultRedDressStory, 
  saveAllStories,
  getStoriesFromStorage,
  getCurrentStoryId
} from '@/utils/storyLoading';
import { createBlankStory } from '@/utils/storage';

export function useStoryLoading() {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
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
      const currentStoryObj = currentStoryId 
        ? loadedStories.find(s => s.id === currentStoryId) 
        : loadedStories[0];
      
      setStories(loadedStories);
      setCurrentStory(currentStoryObj || loadedStories[0]);
    } catch (error) {
      console.error('Failed to load stories:', error);
      setError('加载剧情数据失败: ' + (error instanceof Error ? error.message : String(error)));
      toast.error('加载剧情数据失败');
    } finally {
      setLoading(false);
    }
  };

  return {
    stories,
    setStories,
    currentStory,
    setCurrentStory,
    loading,
    error,
    setError,
    loadStories
  };
}
