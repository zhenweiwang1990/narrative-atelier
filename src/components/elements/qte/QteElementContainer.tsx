
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { QteElement as QteElementType, Scene, GlobalValue, Story } from '@/utils/types';
import SuccessFailureLayout from '../shared/SuccessFailureLayout';
import QteFields from './QteFields';
import OutcomeSection from '../shared/OutcomeSection';
import AiStoryDialog from '../shared/AiStoryDialog';
import QteOutcomeButtons from './QteOutcomeButtons';
import { useQteAiDialog } from './useQteAiDialog';
import { useElementOutcomes } from '@/hooks/useElementOutcomes';

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
  const {
    aiDialogOpen,
    setAiDialogOpen,
    aiDialogType,
    aiDialogFor,
    handleOpenAiDialog,
    handleAiStorySubmit
  } = useQteAiDialog(element.id, story);
  
  const {
    safeElement,
    updateSuccessSceneId,
    updateFailureSceneId,
    updateSuccessTransition,
    updateFailureTransition,
    addValueChange,
    updateValueChange,
    removeValueChange
  } = useElementOutcomes(element, onUpdate);
  
  // If no global values, don't show outcomes section
  if (globalValues.length === 0) {
    return (
      <div className="space-y-2">
        <QteFields 
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
      <QteFields 
        element={element}
        onUpdate={onUpdate}
        validateTimeLimit={validateTimeLimit}
        validateKeySequence={validateKeySequence}
      />
      
      <Separator className="my-3" />
      
      <SuccessFailureLayout
        successTitle="成功结果"
        failureTitle="失败结果"
        successChildren={
          <>
            <OutcomeSection
              scenes={scenes}
              globalValues={globalValues}
              successSceneId={safeElement.success.sceneId}
              failureSceneId=""
              successTransition={safeElement.success.transition}
              successValueChanges={safeElement.success.valueChanges}
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
              onOpenAiDialog={handleOpenAiDialog} 
              outcomeType="success" 
            />
          </>
        }
        failureChildren={
          <>
            <OutcomeSection
              scenes={scenes}
              globalValues={globalValues}
              successSceneId=""
              failureSceneId={safeElement.failure.sceneId}
              failureTransition={safeElement.failure.transition}
              failureValueChanges={safeElement.failure.valueChanges}
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
              onOpenAiDialog={handleOpenAiDialog} 
              outcomeType="failure" 
            />
          </>
        }
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
};

export default QteElementContainer;
