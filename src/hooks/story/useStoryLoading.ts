
import { useState, useEffect } from 'react';
import { Story } from '@/utils/types';
import { toast } from 'sonner';
import { 
  loadDefaultRedDressStory, 
  saveAllStories,
  getStoriesFromStorage,
  getCurrentStoryId
} from '@/utils/storyLoading';

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
        try {
          // Load the Red Dress story from public directory
          const redDressStory = await loadDefaultRedDressStory();
          
          if (redDressStory) {
            loadedStories = [redDressStory];
            toast.success('已加载示例剧情「红衣如故」');
          } else {
            console.warn('无法加载示例剧情');
            loadedStories = [];
          }
        } catch (demoError) {
          console.error('Failed to load demo story:', demoError);
          loadedStories = [];
          toast.warning('无法加载示例剧情');
        }
        
        // Save the default stories
        if (loadedStories.length > 0) {
          try {
            saveAllStories(loadedStories, loadedStories[0].id);
          } catch (saveError) {
            console.error('Failed to save default stories:', saveError);
            setError('保存示例剧情失败');
            toast.error('保存示例剧情失败');
          }
        }
      }
      
      // Load current story ID
      const currentStoryId = getCurrentStoryId();
      
      // Find current story or use the first one
      const currentStoryObj = currentStoryId 
        ? loadedStories.find(s => s.id === currentStoryId) 
        : loadedStories[0];
      
      setStories(loadedStories);
      setCurrentStory(currentStoryObj || null);
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
