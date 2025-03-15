
import { useEffect } from 'react';
import { Story } from '@/utils/types';

export function useStoryPersistence(story: Story | null) {
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
}
