
import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { DialogueTaskElement as DialogueTaskElementType, Character, Scene, GlobalValue } from '@/utils/types';
import DialogueTaskFields from './dialogueTask/DialogueTaskFields';
import SuccessFailureLayout from './shared/SuccessFailureLayout';
import OutcomeSection from './shared/OutcomeSection';
import { useElementOutcomes } from '@/hooks/useElementOutcomes';
import AiStoryDialog from './shared/AiStoryDialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiDialogType, setAiDialogType] = useState<'branch' | 'ending'>('branch');
  const [aiDialogFor, setAiDialogFor] = useState<'success' | 'failure'>('success');

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
  
  const handleOpenAiDialog = (type: 'branch' | 'ending', outcomeType: 'success' | 'failure') => {
    setAiDialogType(type);
    setAiDialogFor(outcomeType);
    setAiDialogOpen(true);
  };

  const handleAiStorySubmit = (prompt: string, convergenceSceneId?: string, endingType?: 'normal' | 'bad') => {
    // TODO: Implement API call to generate AI story content
    // The API should be called with the following parameters:
    // - prompt: User's input prompt for story generation
    // - type: Either 'branch' or 'ending'
    // - elementId: element.id
    // - outcomeType: Either 'success' or 'failure'
    // - convergenceSceneId: Optional ID of scene where branch should converge
    // - endingType: Optional type of ending ('normal' or 'bad')
    
    toast.promise(
      // This would be replaced with the actual API call
      new Promise((resolve) => setTimeout(resolve, 1500)), 
      {
        loading: aiDialogType === 'branch' ? '正在生成支线...' : '正在生成结局...',
        success: aiDialogType === 'branch' ? 'AI 支线生成成功！' : 'AI 结局生成成功！',
        error: '生成失败，请重试。',
      }
    );

    console.log('AI Story Request:', {
      type: aiDialogType,
      for: aiDialogFor,
      prompt,
      convergenceSceneId,
      endingType,
      elementId: element.id
    });
  };
  
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
          <>
            <OutcomeSection
              scenes={scenes}
              globalValues={globalValues}
              successSceneId={safeElement.success.sceneId}
              failureSceneId=""
              successTransition={safeElement.success.transition || ""}
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
            <div className="flex gap-2 mt-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs"
                onClick={() => handleOpenAiDialog('branch', 'success')}
              >
                AI 写支线
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs"
                onClick={() => handleOpenAiDialog('ending', 'success')}
              >
                AI 写结局
              </Button>
            </div>
          </>
        }
        failureChildren={
          <>
            <OutcomeSection
              scenes={scenes}
              globalValues={globalValues}
              successSceneId=""
              failureSceneId={safeElement.failure.sceneId}
              failureTransition={safeElement.failure.transition || ""}
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
            <div className="flex gap-2 mt-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs"
                onClick={() => handleOpenAiDialog('branch', 'failure')}
              >
                AI 写支线
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full text-xs"
                onClick={() => handleOpenAiDialog('ending', 'failure')}
              >
                AI 写结局
              </Button>
            </div>
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
