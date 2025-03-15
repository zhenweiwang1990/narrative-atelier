
import { useState } from 'react';
import { toast } from 'sonner';
import { handleAiStoryGeneration } from '@/services/aiStoryServiceClient';
import { Story } from '@/utils/types';
import { DialogType, OutcomeType } from './useAiDialogState';

/**
 * Hook to handle AI story generation
 * Manages the actual API calls and generation process
 */
export const useAiStoryGeneration = (elementId: string, story: Story | null) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAiStory = async (
    prompt: string, 
    dialogType: DialogType, 
    outcomeType: OutcomeType, 
    convergenceSceneId?: string
  ) => {
    if (!story) {
      toast.error('Story data not available');
      return;
    }

    setIsGenerating(true);

    try {
      const result = await handleAiStoryGeneration({
        prompt,
        type: dialogType,
        elementId,
        outcomeType,
        convergenceSceneId,
        story,
        onSuccess: () => {
          // Success callback
        }
      });

      setIsGenerating(false);
      return result;
    } catch (error) {
      setIsGenerating(false);
      toast.error('Failed to generate AI content');
      console.error('AI story generation error:', error);
    }
  };

  return {
    isGenerating,
    generateAiStory
  };
};
