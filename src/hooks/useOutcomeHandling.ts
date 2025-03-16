
import { useState } from 'react';

export const useOutcomeHandling = (elementId: string) => {
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiDialogType, setAiDialogType] = useState<'branch' | 'ending'>('branch');
  const [isSuccess, setIsSuccess] = useState(true);
  
  // Open the AI dialog with the specified type and success/failure flag
  const handleOpenAiDialog = (type: 'branch' | 'ending', success: boolean) => {
    setAiDialogType(type);
    setIsSuccess(success);
    setAiDialogOpen(true);
  };
  
  // Determine if AI buttons should be shown based on scene ID
  const getAiButtonsVisibility = (sceneId?: string) => {
    // Show AI buttons if a valid element ID exists and either:
    // - No scene is selected (can create a new one)
    // - A scene is selected (can modify an existing one)
    return !!elementId;
  };
  
  return {
    aiDialogOpen,
    setAiDialogOpen,
    aiDialogType,
    isSuccess,
    handleOpenAiDialog,
    getAiButtonsVisibility
  };
};
