
import React from 'react';
import { QteElement as QteElementType, Scene, GlobalValue, Story } from '@/utils/types';
import SuccessFailureLayout from '../shared/SuccessFailureLayout';
import AiStoryDialog from '../shared/AiStoryDialog';
import { useQteElementContainerState } from '@/hooks/qte/useQteElementContainerState';
import QteBasicFields from './QteBasicFields';
import QteSuccessOutcome from './QteSuccessOutcome';
import QteFailureOutcome from './QteFailureOutcome';

interface QteElementContainerProps {
  element: QteElementType;
  scenes: Scene[];
  globalValues: GlobalValue[];
  story: Story | null;
  onUpdate: (id: string, updates: Partial<QteElementType>) => void;
  validateTimeLimit: (value: number) => number;
  validateKeySequence: (value: string) => string;
}

const QteElementContainer: React.FC<QteElementContainerProps> = ({ 
  element, 
  scenes, 
  globalValues,
  story,
  onUpdate, 
  validateTimeLimit, 
  validateKeySequence 
}) => {
  const { aiDialogState, outcomeState } = useQteElementContainerState(element, onUpdate, story);
  
  // If no global values, don't show outcomes section
  if (globalValues.length === 0) {
    return (
      <div className="space-y-2">
        <QteBasicFields 
          element={element}
          onUpdate={onUpdate}
          validateTimeLimit={validateTimeLimit}
          validateKeySequence={validateKeySequence}
        />
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      <QteBasicFields 
        element={element}
        onUpdate={onUpdate}
        validateTimeLimit={validateTimeLimit}
        validateKeySequence={validateKeySequence}
      />
      
      <SuccessFailureLayout
        successTitle="成功结果"
        failureTitle="失败结果"
        successChildren={
          <QteSuccessOutcome
            element={outcomeState.safeElement}
            scenes={scenes}
            globalValues={globalValues}
            updateSuccessSceneId={outcomeState.updateSuccessSceneId}
            updateSuccessTransition={outcomeState.updateSuccessTransition}
            addValueChange={outcomeState.addValueChange}
            updateValueChange={outcomeState.updateValueChange}
            removeValueChange={outcomeState.removeValueChange}
            onOpenAiDialog={aiDialogState.handleOpenAiDialog}
          />
        }
        failureChildren={
          <QteFailureOutcome
            element={outcomeState.safeElement}
            scenes={scenes}
            globalValues={globalValues}
            updateFailureSceneId={outcomeState.updateFailureSceneId}
            updateFailureTransition={outcomeState.updateFailureTransition}
            addValueChange={outcomeState.addValueChange}
            updateValueChange={outcomeState.updateValueChange}
            removeValueChange={outcomeState.removeValueChange}
            onOpenAiDialog={aiDialogState.handleOpenAiDialog}
          />
        }
      />

      <AiStoryDialog 
        isOpen={aiDialogState.aiDialogOpen}
        onClose={() => aiDialogState.setAiDialogOpen(false)}
        onSubmit={aiDialogState.handleAiStorySubmit}
        type={aiDialogState.aiDialogType}
        scenes={scenes}
        showConvergenceSelector={aiDialogState.aiDialogType === 'branch'}
      />
    </div>
  );
};

export default QteElementContainer;
