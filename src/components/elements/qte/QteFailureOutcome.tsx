
import React from 'react';
import { Scene, GlobalValue, QteElement } from '@/utils/types';
import OutcomeSection from '../shared/OutcomeSection';
import QteOutcomeButtons from './QteOutcomeButtons';

interface QteFailureOutcomeProps {
  element: QteElement;
  scenes: Scene[];
  globalValues: GlobalValue[];
  updateFailureSceneId: (sceneId: string) => void;
  updateFailureTransition: (transition: string) => void;
  addValueChange: (isSuccess: boolean, globalValues: GlobalValue[]) => void;
  updateValueChange: (isSuccess: boolean, valueId: string, change: number) => void;
  removeValueChange: (isSuccess: boolean, valueId: string) => void;
  onOpenAiDialog: (type: 'branch' | 'ending', outcomeType: 'success' | 'failure') => void;
}

const QteFailureOutcome: React.FC<QteFailureOutcomeProps> = ({
  element,
  scenes,
  globalValues,
  updateFailureSceneId,
  updateFailureTransition,
  addValueChange,
  updateValueChange,
  removeValueChange,
  onOpenAiDialog,
}) => {
  return (
    <>
      <OutcomeSection
        scenes={scenes}
        globalValues={globalValues}
        successSceneId=""
        failureSceneId={element.failure?.sceneId || ""}
        failureTransition={element.failure?.transition || ""}
        failureValueChanges={element.failure?.valueChanges || []}
        updateSuccessSceneId={() => {}}
        updateFailureSceneId={updateFailureSceneId}
        updateSuccessTransition={() => {}}
        updateFailureTransition={updateFailureTransition}
        addValueChange={addValueChange}
        updateValueChange={updateValueChange}
        removeValueChange={removeValueChange}
        showFailureOnly={true}
        elementId={element.id}
      />
      <QteOutcomeButtons 
        onOpenAiDialog={onOpenAiDialog} 
        outcomeType="failure" 
        sceneId={element.failure?.sceneId || ""}
      />
    </>
  );
};

export default QteFailureOutcome;
