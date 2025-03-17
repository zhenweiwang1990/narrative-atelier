
import { useEffect } from 'react';
import { Story } from '@/utils/types';

export function useStoryPersistence(story: Story | null) {
  // 当故事ID变更时，将当前故事ID保存到localStorage
  useEffect(() => {
    if (story) {
      localStorage.setItem('currentStoryId', story.id);
    }
  }, [story?.id]);
}
