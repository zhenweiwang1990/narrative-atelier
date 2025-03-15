
import { useState } from 'react';

export type DialogType = 'branch' | 'ending';
export type OutcomeType = 'success' | 'failure';

/**
 * Hook to manage AI dialog state
 * Provides state management for AI dialog components
 */
export const useAiDialogState = () => {
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiDialogType, setAiDialogType] = useState<DialogType>('branch');
  const [aiDialogFor, setAiDialogFor] = useState<OutcomeType>('success');

  const handleOpenAiDialog = (type: DialogType, outcomeType: OutcomeType) => {
    setAiDialogType(type);
    setAiDialogFor(outcomeType);
    setAiDialogOpen(true);
  };

  return {
    aiDialogOpen,
    setAiDialogOpen,
    aiDialogType,
    aiDialogFor,
    handleOpenAiDialog
  };
};
