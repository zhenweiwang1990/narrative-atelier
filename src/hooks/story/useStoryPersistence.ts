
import { useEffect } from 'react';
import { Story } from '@/utils/types';

export function useStoryPersistence(story: Story | null) {
  // Save the current story ID to localStorage whenever it changes
  useEffect(() => {
    if (story) {
      localStorage.setItem('currentStoryId', story.id);
    }
  }, [story?.id]);
}
