
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { QteElement as QteElementType, Scene, GlobalValue } from '@/utils/types';
import SuccessFailureLayout from './shared/SuccessFailureLayout';
import QteFields from './qte/QteFields';
import OutcomeSection from './shared/OutcomeSection';
import { useElementOutcomes } from '@/hooks/useElementOutcomes';

interface QteElementProps {
  element: QteElementType;
  scenes: Scene[];
  globalValues: GlobalValue[];
  onUpdate: (id: string, updates: Partial<QteElementType>) => void;
  validateTimeLimit: (value: number) => number;
  validateKeySequence: (value: string) => string;
}

export const QteElement: React.FC<QteElementProps> = ({ 
  element, 
  scenes, 
  globalValues,
  onUpdate, 
  validateTimeLimit, 
  validateKeySequence 
}) => {
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
          />
        }
        failureChildren={
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
          />
        }
      />
    </div>
  );
};
