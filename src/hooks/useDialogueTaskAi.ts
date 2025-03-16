
import { useState } from 'react';
import { toast } from 'sonner';

export const useDialogueTaskAi = (elementId: string) => {
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiDialogType, setAiDialogType] = useState<'branch' | 'ending'>('branch');
  const [aiDialogFor, setAiDialogFor] = useState<'success' | 'failure'>('success');

  const handleOpenAiDialog = (type: 'branch' | 'ending', outcomeType: 'success' | 'failure') => {
    setAiDialogType(type);
    setAiDialogFor(outcomeType);
    setAiDialogOpen(true);
  };

  const handleCloseAiDialog = () => {
    setAiDialogOpen(false);
  };

  const handleAiStorySubmit = (prompt: string, convergenceSceneId?: string, endingType?: 'normal' | 'bad') => {
    // TODO: Implement API call to generate AI story content
    toast.promise(
      // This would be replaced with the actual API call
      new Promise((resolve) => setTimeout(resolve, 1500)), 
      {
        loading: aiDialogType === 'branch' ? '正在生成支线...' : '正在生成结局...',
        success: aiDialogType === 'branch' ? 'AI 支线生成成功！' : 'AI 结局生成成功！',
        error: '生成失败，请重试。',
      }
    );

    console.log('AI Story Request:', {
      type: aiDialogType,
      for: aiDialogFor,
      prompt,
      convergenceSceneId,
      endingType,
      elementId
    });
  };

  return {
    aiDialogOpen,
    aiDialogType,
    aiDialogFor,
    handleOpenAiDialog,
    handleCloseAiDialog,
    handleAiStorySubmit
  };
};

export default useDialogueTaskAi;
