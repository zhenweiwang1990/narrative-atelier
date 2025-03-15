
import { Story } from '@/utils/types';
import { useAiDialogState } from './useAiDialogState';
import { useAiStoryGeneration } from './useAiStoryGeneration';

/**
 * Combined hook for QTE AI dialog functionality
 * Composes the dialog state and story generation hooks
 */
export const useQteAiDialog = (
  elementId: string,
  story: Story | null
) => {
  const {
    aiDialogOpen,
    setAiDialogOpen,
    aiDialogType,
    aiDialogFor,
    handleOpenAiDialog
  } = useAiDialogState();
  
  const { isGenerating, generateAiStory } = useAiStoryGeneration(elementId, story);

  const handleAiStorySubmit = async (prompt: string, convergenceSceneId?: string) => {
    const result = await generateAiStory(prompt, aiDialogType, aiDialogFor, convergenceSceneId);
    
    if (result) {
      // Close dialog on success
      setAiDialogOpen(false);
    }
    
    return result;
  };

  return {
    aiDialogOpen,
    setAiDialogOpen,
    aiDialogType,
    aiDialogFor,
    isGenerating,
    handleOpenAiDialog,
    handleAiStorySubmit
  };
};
