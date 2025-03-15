
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { DialogueTaskElement as DialogueTaskElementType, Character, Scene, GlobalValue } from '@/utils/types';
import DialogueTaskFields from './dialogueTask/DialogueTaskFields';
import SuccessFailureLayout from './shared/SuccessFailureLayout';
import OutcomeSection from './shared/OutcomeSection';
import { useElementOutcomes } from '@/hooks/useElementOutcomes';

interface DialogueTaskElementProps {
  element: DialogueTaskElementType;
  characters: Character[];
  scenes: Scene[];
  globalValues: GlobalValue[];
  onUpdate: (id: string, updates: Partial<DialogueTaskElementType>) => void;
}

export const DialogueTaskElement: React.FC<DialogueTaskElementProps> = ({ 
  element, 
  characters, 
  scenes, 
  globalValues,
  onUpdate 
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
        <DialogueTaskFields
          element={element}
          characters={characters}
          onUpdate={onUpdate}
        />
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      <DialogueTaskFields
        element={element}
        characters={characters}
        onUpdate={onUpdate}
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
