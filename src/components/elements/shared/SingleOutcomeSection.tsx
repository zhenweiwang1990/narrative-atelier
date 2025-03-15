
import React from 'react';
import { Scene, GlobalValue } from '@/utils/types';
import SceneSelectSection from './SceneSelectSection';
import TransitionTextsSection from './TransitionTextsSection';
import ValueChangesCollapsible from './ValueChangesCollapsible';
import { Button } from '@/components/ui/button';
import { GitBranch, BookText } from 'lucide-react';

interface SingleOutcomeSectionProps {
  isSuccess: boolean;
  sceneId: string;
  transition?: string;
  valueChanges?: any[];
  scenes: Scene[];
  globalValues: GlobalValue[];
  updateSceneId: (sceneId: string) => void;
  updateTransition: (transition: string) => void;
  addValueChange: (isSuccess: boolean, globalValues: GlobalValue[]) => void;
  updateValueChange: (isSuccess: boolean, valueId: string, change: number) => void;
  removeValueChange: (isSuccess: boolean, valueId: string) => void;
  onOpenAiDialog: (type: 'branch' | 'ending', isSuccess: boolean) => void;
  showAiButtons?: boolean;
}

const SingleOutcomeSection: React.FC<SingleOutcomeSectionProps> = ({
  isSuccess,
  sceneId,
  transition = '',
  valueChanges = [],
  scenes,
  globalValues,
  updateSceneId,
  updateTransition,
  addValueChange,
  updateValueChange,
  removeValueChange,
  onOpenAiDialog,
  showAiButtons = true
}) => {
  return (
    <div className="space-y-2">
      <SceneSelectSection
        successSceneId={isSuccess ? sceneId : ''}
        failureSceneId={isSuccess ? '' : sceneId}
        scenes={scenes}
        onUpdateSuccessScene={isSuccess ? updateSceneId : () => {}}
        onUpdateFailureScene={isSuccess ? () => {} : updateSceneId}
        showSingleColumn={true}
        onOpenAiDialog={onOpenAiDialog}
        showSuccessAiButtons={isSuccess ? showAiButtons : false}
        showFailureAiButtons={isSuccess ? false : showAiButtons}
      />
      
      <TransitionTextsSection
        successTransition={isSuccess ? transition : ''}
        failureTransition={isSuccess ? '' : transition}
        onUpdateSuccess={isSuccess ? updateTransition : () => {}}
        onUpdateFailure={isSuccess ? () => {} : updateTransition}
        showSingleColumn={true}
      />
      
      <ValueChangesCollapsible
        title={isSuccess ? "成功数值变化" : "失败数值变化"}
        isSuccess={isSuccess}
        valueChanges={valueChanges}
        globalValues={globalValues}
        onAddValueChange={addValueChange}
        onUpdateValueChange={updateValueChange}
        onRemoveValueChange={removeValueChange}
      />

      {showAiButtons && (
        <div className="flex gap-2 mt-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs flex items-center gap-1"
            onClick={() => onOpenAiDialog('branch', isSuccess)}
          >
            <GitBranch className="h-3.5 w-3.5" />
            AI 写支线
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs flex items-center gap-1"
            onClick={() => onOpenAiDialog('ending', isSuccess)}
          >
            <BookText className="h-3.5 w-3.5" />
            AI 写结局
          </Button>
        </div>
      )}
    </div>
  );
};

export default SingleOutcomeSection;
