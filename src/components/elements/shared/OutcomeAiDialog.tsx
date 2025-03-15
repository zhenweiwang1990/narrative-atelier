
import React from 'react';
import { Scene } from '@/utils/types';
import AiStoryDialog from './AiStoryDialog';
import { toast } from 'sonner';

interface OutcomeAiDialogProps {
  isOpen: boolean;
  onClose: () => void;
  aiDialogType: 'branch' | 'ending';
  isSuccess: boolean;
  scenes: Scene[];
  elementId?: string;
}

const OutcomeAiDialog: React.FC<OutcomeAiDialogProps> = ({
  isOpen,
  onClose,
  aiDialogType,
  isSuccess,
  scenes,
  elementId = ''
}) => {
  const handleAiStorySubmit = (prompt: string, convergenceSceneId?: string, endingType?: 'normal' | 'bad') => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)), 
      {
        loading: aiDialogType === 'branch' ? '正在生成支线...' : '正在生成结局...',
        success: aiDialogType === 'branch' ? 'AI 支线生成成功！' : 'AI 结局生成成功！',
        error: '生成失败，请重试。',
      }
    );

    console.log('AI Story Request for Element Outcome:', {
      type: aiDialogType,
      isSuccess,
      elementId,
      prompt,
      convergenceSceneId,
      endingType,
      outcomeType: isSuccess ? 'success' : 'failure'
    });
  };

  return (
    <AiStoryDialog 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAiStorySubmit}
      type={aiDialogType}
      scenes={scenes}
      showConvergenceSelector={aiDialogType === 'branch'}
    />
  );
};

export default OutcomeAiDialog;
