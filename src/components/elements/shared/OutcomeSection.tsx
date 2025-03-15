
import React from 'react';
import { Scene, GlobalValue } from '@/utils/types';
import { useOutcomeHandling } from '@/hooks/useOutcomeHandling';
import SingleOutcomeSection from './SingleOutcomeSection';
import OutcomeAiDialog from './OutcomeAiDialog';

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

  // Render success-only section
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

        <OutcomeAiDialog
          isOpen={aiDialogOpen}
          onClose={() => setAiDialogOpen(false)}
          aiDialogType={aiDialogType}
          isSuccess={isSuccess}
          scenes={scenes}
          elementId={elementId}
        />
      </div>
    );
  }
  
  // Render failure-only section
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

        <OutcomeAiDialog
          isOpen={aiDialogOpen}
          onClose={() => setAiDialogOpen(false)}
          aiDialogType={aiDialogType}
          isSuccess={isSuccess}
          scenes={scenes}
          elementId={elementId}
        />
      </div>
    );
  }
  
  // Render the dual column layout with both success and failure
  return <DualOutcomeSection 
    scenes={scenes}
    globalValues={globalValues}
    successSceneId={successSceneId}
    failureSceneId={failureSceneId}
    successTransition={successTransition}
    failureTransition={failureTransition}
    successValueChanges={successValueChanges}
    failureValueChanges={failureValueChanges}
    updateSuccessSceneId={updateSuccessSceneId}
    updateFailureSceneId={updateFailureSceneId}
    updateSuccessTransition={updateSuccessTransition}
    updateFailureTransition={updateFailureTransition}
    addValueChange={addValueChange}
    updateValueChange={updateValueChange}
    removeValueChange={removeValueChange}
    handleOpenAiDialog={handleOpenAiDialog}
    getAiButtonsVisibility={getAiButtonsVisibility}
    aiDialogOpen={aiDialogOpen}
    setAiDialogOpen={setAiDialogOpen}
    aiDialogType={aiDialogType}
    isSuccess={isSuccess}
    elementId={elementId}
  />;
};

export default OutcomeSection;
