
import React from 'react';
import { Scene, GlobalValue } from '@/utils/types';
import SceneSelectSection from './SceneSelectSection';
import TransitionTextsSection from './TransitionTextsSection';
import ValueChangesCollapsible from './ValueChangesCollapsible';
import OutcomeAiDialog from './OutcomeAiDialog';

interface DualOutcomeSectionProps {
  scenes: Scene[];
  globalValues: GlobalValue[];
  successSceneId: string;
  failureSceneId: string;
  successTransition: string;
  failureTransition: string;
  successValueChanges: any[];
  failureValueChanges: any[];
  updateSuccessSceneId: (sceneId: string) => void;
  updateFailureSceneId: (sceneId: string) => void;
  updateSuccessTransition: (transition: string) => void;
  updateFailureTransition: (transition: string) => void;
  addValueChange: (isSuccess: boolean, globalValues: GlobalValue[]) => void;
  updateValueChange: (isSuccess: boolean, valueId: string, change: number) => void;
  removeValueChange: (isSuccess: boolean, valueId: string) => void;
  handleOpenAiDialog: (type: 'branch' | 'ending', success: boolean) => void;
  getAiButtonsVisibility: (sceneId: string) => boolean;
  aiDialogOpen: boolean;
  setAiDialogOpen: (open: boolean) => void;
  aiDialogType: 'branch' | 'ending';
  isSuccess: boolean;
  elementId?: string;
}

const DualOutcomeSection: React.FC<DualOutcomeSectionProps> = ({
  scenes,
  globalValues,
  successSceneId,
  failureSceneId,
  successTransition,
  failureTransition,
  successValueChanges,
  failureValueChanges,
  updateSuccessSceneId,
  updateFailureSceneId,
  updateSuccessTransition,
  updateFailureTransition,
  addValueChange,
  updateValueChange,
  removeValueChange,
  handleOpenAiDialog,
  getAiButtonsVisibility,
  aiDialogOpen,
  setAiDialogOpen,
  aiDialogType,
  isSuccess,
  elementId = ''
}) => {
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
};

export default DualOutcomeSection;
