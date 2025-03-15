
import React from 'react';
import { Scene, GlobalValue } from '@/utils/types';
import SceneSelectSection from './SceneSelectSection';
import TransitionTextsSection from './TransitionTextsSection';
import ValueChangesCollapsible from './ValueChangesCollapsible';
import AiStoryDialog from './AiStoryDialog';
import { toast } from 'sonner';
import { useOutcomeHandling } from '@/hooks/useOutcomeHandling';
import SingleOutcomeSection from './SingleOutcomeSection';

interface OutcomeSectionProps {
  scenes: Scene[];
  globalValues: GlobalValue[];
  successSceneId: string;
  failureSceneId: string;
  successTransition?: string;
  failureTransition?: string;
  successValueChanges?: any[];
  failureValueChanges?: any[];
  updateSuccessSceneId: (sceneId: string) => void;
  updateFailureSceneId: (sceneId: string) => void;
  updateSuccessTransition: (transition: string) => void;
  updateFailureTransition: (transition: string) => void;
  addValueChange: (isSuccess: boolean, globalValues: GlobalValue[]) => void;
  updateValueChange: (isSuccess: boolean, valueId: string, change: number) => void;
  removeValueChange: (isSuccess: boolean, valueId: string) => void;
  showSuccessOnly?: boolean;
  showFailureOnly?: boolean;
  elementId?: string;
}

const OutcomeSection: React.FC<OutcomeSectionProps> = ({
  scenes,
  globalValues,
  successSceneId,
  failureSceneId,
  successTransition = '',
  failureTransition = '',
  successValueChanges = [],
  failureValueChanges = [],
  updateSuccessSceneId,
  updateFailureSceneId,
  updateSuccessTransition,
  updateFailureTransition,
  addValueChange,
  updateValueChange,
  removeValueChange,
  showSuccessOnly = false,
  showFailureOnly = false,
  elementId = ''
}) => {
  const {
    aiDialogOpen,
    setAiDialogOpen,
    aiDialogType,
    isSuccess,
    handleOpenAiDialog,
    getAiButtonsVisibility
  } = useOutcomeHandling(elementId);

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
  
  // Show single outcome section based on the mode
  if (showSuccessOnly) {
    return (
      <div className="space-y-2">
        <SingleOutcomeSection
          isSuccess={true}
          sceneId={successSceneId}
          transition={successTransition}
          valueChanges={successValueChanges}
          scenes={scenes}
          globalValues={globalValues}
          updateSceneId={updateSuccessSceneId}
          updateTransition={updateSuccessTransition}
          addValueChange={addValueChange}
          updateValueChange={updateValueChange}
          removeValueChange={removeValueChange}
          onOpenAiDialog={handleOpenAiDialog}
          showAiButtons={getAiButtonsVisibility(successSceneId)}
        />

        <AiStoryDialog 
          isOpen={aiDialogOpen}
          onClose={() => setAiDialogOpen(false)}
          onSubmit={handleAiStorySubmit}
          type={aiDialogType}
          scenes={scenes}
          showConvergenceSelector={aiDialogType === 'branch'}
        />
      </div>
    );
  }
  
  if (showFailureOnly) {
    return (
      <div className="space-y-2">
        <SingleOutcomeSection
          isSuccess={false}
          sceneId={failureSceneId}
          transition={failureTransition}
          valueChanges={failureValueChanges}
          scenes={scenes}
          globalValues={globalValues}
          updateSceneId={updateFailureSceneId}
          updateTransition={updateFailureTransition}
          addValueChange={addValueChange}
          updateValueChange={updateValueChange}
          removeValueChange={removeValueChange}
          onOpenAiDialog={handleOpenAiDialog}
          showAiButtons={getAiButtonsVisibility(failureSceneId)}
        />

        <AiStoryDialog 
          isOpen={aiDialogOpen}
          onClose={() => setAiDialogOpen(false)}
          onSubmit={handleAiStorySubmit}
          type={aiDialogType}
          scenes={scenes}
          showConvergenceSelector={aiDialogType === 'branch'}
        />
      </div>
    );
  }
  
  // Default view with both columns
  return (
    <div className="space-y-2">
      <SceneSelectSection
        successSceneId={successSceneId}
        failureSceneId={failureSceneId}
        scenes={scenes}
        onUpdateSuccessScene={updateSuccessSceneId}
        onUpdateFailureScene={updateFailureSceneId}
        showSingleColumn={false}
        onOpenAiDialog={handleOpenAiDialog}
        showSuccessAiButtons={getAiButtonsVisibility(successSceneId)}
        showFailureAiButtons={getAiButtonsVisibility(failureSceneId)}
      />
      
      <TransitionTextsSection
        successTransition={successTransition}
        failureTransition={failureTransition}
        onUpdateSuccess={updateSuccessTransition}
        onUpdateFailure={updateFailureTransition}
        showSingleColumn={false}
      />
      
      <div className="grid grid-cols-2 gap-2">
        <ValueChangesCollapsible
          title="成功数值变化"
          isSuccess={true}
          valueChanges={successValueChanges}
          globalValues={globalValues}
          onAddValueChange={(isSuccess) => addValueChange(isSuccess, globalValues)}
          onUpdateValueChange={updateValueChange}
          onRemoveValueChange={removeValueChange}
        />
        
        <ValueChangesCollapsible
          title="失败数值变化"
          isSuccess={false}
          valueChanges={failureValueChanges}
          globalValues={globalValues}
          onAddValueChange={(isSuccess) => addValueChange(isSuccess, globalValues)}
          onUpdateValueChange={updateValueChange}
          onRemoveValueChange={removeValueChange}
        />
      </div>

      <AiStoryDialog 
        isOpen={aiDialogOpen}
        onClose={() => setAiDialogOpen(false)}
        onSubmit={handleAiStorySubmit}
        type={aiDialogType}
        scenes={scenes}
        showConvergenceSelector={aiDialogType === 'branch'}
      />
    </div>
  );
};

export default OutcomeSection;
