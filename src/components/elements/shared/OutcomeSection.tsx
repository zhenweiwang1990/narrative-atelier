
import React from 'react';
import { Scene, GlobalValue } from '@/utils/types';
import SceneSelectSection from './SceneSelectSection';
import TransitionTextsSection from './TransitionTextsSection';
import ValueChangesCollapsible from './ValueChangesCollapsible';

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
  showFailureOnly = false
}) => {
  // For showing just one column when in the success/failure specific layouts
  const showSingleColumn = showSuccessOnly || showFailureOnly;
  
  // When showing success only
  if (showSuccessOnly) {
    return (
      <div className="space-y-2">
        <SceneSelectSection
          successSceneId={successSceneId}
          failureSceneId=""
          scenes={scenes}
          onUpdateSuccessScene={updateSuccessSceneId}
          onUpdateFailureScene={() => {}}
          showSingleColumn={true}
        />
        
        <TransitionTextsSection
          successTransition={successTransition}
          failureTransition=""
          onUpdateSuccess={updateSuccessTransition}
          onUpdateFailure={() => {}}
          showSingleColumn={true}
        />
        
        <ValueChangesCollapsible
          title="成功数值变化"
          isSuccess={true}
          valueChanges={successValueChanges}
          globalValues={globalValues}
          onAddValueChange={(isSuccess) => addValueChange(isSuccess, globalValues)}
          onUpdateValueChange={updateValueChange}
          onRemoveValueChange={removeValueChange}
        />
      </div>
    );
  }
  
  // When showing failure only
  if (showFailureOnly) {
    return (
      <div className="space-y-2">
        <SceneSelectSection
          successSceneId=""
          failureSceneId={failureSceneId}
          scenes={scenes}
          onUpdateSuccessScene={() => {}}
          onUpdateFailureScene={updateFailureSceneId}
          showSingleColumn={true}
        />
        
        <TransitionTextsSection
          successTransition=""
          failureTransition={failureTransition}
          onUpdateSuccess={() => {}}
          onUpdateFailure={updateFailureTransition}
          showSingleColumn={true}
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
        showSingleColumn={showSingleColumn}
      />
      
      <TransitionTextsSection
        successTransition={successTransition}
        failureTransition={failureTransition}
        onUpdateSuccess={updateSuccessTransition}
        onUpdateFailure={updateFailureTransition}
        showSingleColumn={showSingleColumn}
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
    </div>
  );
};

export default OutcomeSection;
