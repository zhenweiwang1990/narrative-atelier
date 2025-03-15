
import { Story } from '@/utils/types';
import { toast } from 'sonner';
import { saveAllStories } from '@/utils/storyLoading';
import { createNewStoryUtil, deleteStoryUtil } from '@/utils/storyOperations';

export function useStoryOperations(
  stories: Story[],
  setStories: React.Dispatch<React.SetStateAction<Story[]>>,
  setStory: React.Dispatch<React.SetStateAction<Story | null>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) {
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

  return {
    createNewStory,
    deleteStory
  };
}
