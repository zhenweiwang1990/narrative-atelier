
import { useState } from 'react';
import { Scene, GlobalValue } from '@/utils/types';

export const useOutcomeHandling = (
  elementId = '' // Optional element ID for AI story tracking
) => {
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiDialogType, setAiDialogType] = useState<'branch' | 'ending'>('branch');
  const [isSuccess, setIsSuccess] = useState(true);

  const handleOpenAiDialog = (type: 'branch' | 'ending', success: boolean) => {
    setAiDialogType(type);
    setIsSuccess(success);
    setAiDialogOpen(true);
  };

  const getAiButtonsVisibility = (sceneId: string) => {
    // Only show AI buttons when no scene is selected
    return !sceneId || sceneId === 'none';
  };
  
  return {
    aiDialogOpen,
    setAiDialogOpen,
    aiDialogType,
    isSuccess,
    handleOpenAiDialog,
    getAiButtonsVisibility,
    elementId
  };
};
