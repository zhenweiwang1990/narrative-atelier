
import React from 'react';
import { Scene, GlobalValue, QteElement } from '@/utils/types';
import OutcomeSection from '../shared/OutcomeSection';
import QteOutcomeButtons from './QteOutcomeButtons';

interface QteSuccessOutcomeProps {
  element: QteElement;
  scenes: Scene[];
  globalValues: GlobalValue[];
  updateSuccessSceneId: (sceneId: string) => void;
  updateSuccessTransition: (transition: string) => void;
  addValueChange: (isSuccess: boolean, globalValues: GlobalValue[]) => void;
  updateValueChange: (isSuccess: boolean, valueId: string, change: number) => void;
  removeValueChange: (isSuccess: boolean, valueId: string) => void;
  onOpenAiDialog: (type: 'branch' | 'ending', outcomeType: 'success' | 'failure') => void;
}

const QteSuccessOutcome: React.FC<QteSuccessOutcomeProps> = ({
  element,
  scenes,
  globalValues,
  updateSuccessSceneId,
  updateSuccessTransition,
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
        successSceneId={element.success.sceneId || ""}
        failureSceneId=""
        successTransition={element.success.transition || ""}
        successValueChanges={element.success.valueChanges || []}
        updateSuccessSceneId={updateSuccessSceneId}
        updateFailureSceneId={() => {}}
        updateSuccessTransition={updateSuccessTransition}
        updateFailureTransition={() => {}}
        addValueChange={addValueChange}
        updateValueChange={updateValueChange}
        removeValueChange={removeValueChange}
        showSuccessOnly={true}
        elementId={element.id}
      />
      <QteOutcomeButtons 
        onOpenAiDialog={onOpenAiDialog} 
        outcomeType="success" 
        sceneId={element.success.sceneId}
      />
    </>
  );
};

export default QteSuccessOutcome;
