
import { useState } from 'react';
import { toast } from 'sonner';
import { handleAiStoryGeneration } from '@/services/aiStoryServiceClient';
import { Story } from '@/utils/types';

// Extend the options type to include outcomeType
interface AiStoryGenerationOptions {
  prompt: string;
  type: 'branch' | 'ending';
  elementId?: string;
  outcomeType?: 'success' | 'failure';
  convergenceSceneId?: string;
  story: Story;
  onSuccess?: () => void;
}

export const useQteAiDialog = (
  elementId: string,
  story: Story | null
) => {
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiDialogType, setAiDialogType] = useState<'branch' | 'ending'>('branch');
  const [aiDialogFor, setAiDialogFor] = useState<'success' | 'failure'>('success');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleOpenAiDialog = (type: 'branch' | 'ending', outcomeType: 'success' | 'failure') => {
    setAiDialogType(type);
    setAiDialogFor(outcomeType);
    setAiDialogOpen(true);
  };

  const handleAiStorySubmit = async (prompt: string, convergenceSceneId?: string) => {
    if (!story) {
      toast.error('Story data not available');
      return;
    }

    setIsGenerating(true);

    try {
      const result = await handleAiStoryGeneration({
        prompt,
        type: aiDialogType,
        elementId,
        outcomeType: aiDialogFor,
        convergenceSceneId,
        story,
        onSuccess: () => {
          // Close dialog on success
          setAiDialogOpen(false);
        }
      } as AiStoryGenerationOptions);

      setIsGenerating(false);
      return result;
    } catch (error) {
      setIsGenerating(false);
      toast.error('Failed to generate AI content');
      console.error('AI story generation error:', error);
    }
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
