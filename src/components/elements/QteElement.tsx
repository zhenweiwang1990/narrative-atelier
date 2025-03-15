import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { QteElement as QteElementType, Scene, GlobalValue, ValueChange } from '@/utils/types';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SceneSelectSection from './shared/SceneSelectSection';
import TransitionTextsSection from './shared/TransitionTextsSection';
import ValueChangesCollapsible from './shared/ValueChangesCollapsible';

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
  const addValueChange = (isSuccess: boolean) => {
    const currentChanges = isSuccess 
      ? element.successValueChanges || []
      : element.failureValueChanges || [];
      
    const unusedValues = globalValues.filter(
      value => !currentChanges.some(change => change.valueId === value.id)
    );
    
    if (unusedValues.length === 0) return;
    
    const newValueChange: ValueChange = {
      valueId: unusedValues[0].id,
      change: isSuccess ? 1 : -1
    };
    
    if (isSuccess) {
      onUpdate(element.id, {
        successValueChanges: [...currentChanges, newValueChange]
      });
    } else {
      onUpdate(element.id, {
        failureValueChanges: [...currentChanges, newValueChange]
      });
    }
  };
  
  const updateValueChange = (isSuccess: boolean, valueId: string, change: number) => {
    const currentChanges = isSuccess 
      ? element.successValueChanges || []
      : element.failureValueChanges || [];
      
    const updatedChanges = currentChanges.map(vc => 
      vc.valueId === valueId ? { ...vc, change } : vc
    );
    
    if (isSuccess) {
      onUpdate(element.id, { successValueChanges: updatedChanges });
    } else {
      onUpdate(element.id, { failureValueChanges: updatedChanges });
    }
  };
  
  const removeValueChange = (isSuccess: boolean, valueId: string) => {
    const currentChanges = isSuccess 
      ? element.successValueChanges || []
      : element.failureValueChanges || [];
      
    const updatedChanges = currentChanges.filter(vc => vc.valueId !== valueId);
    
    if (isSuccess) {
      onUpdate(element.id, { successValueChanges: updatedChanges });
    } else {
      onUpdate(element.id, { failureValueChanges: updatedChanges });
    }
  };
  
  const handleSceneSelection = (isSuccess: boolean, sceneId: string) => {
    if (sceneId === "none") {
      onUpdate(element.id, isSuccess ? { successSceneId: "" } : { failureSceneId: "" });
    } else {
      onUpdate(element.id, isSuccess ? { successSceneId: sceneId } : { failureSceneId: sceneId });
    }
  };
  
  return (
    <div className="space-y-2">
      <div>
        <Label className="text-xs">描述</Label>
        <Textarea
          value={element.description}
          onChange={(e) => onUpdate(element.id, { description: e.target.value })}
          className="mt-1 text-sm"
          rows={2}
        />
      </div>
      
      <div>
        <Label className="text-xs">介绍文本</Label>
        <Input
          value={element.introText || ''}
          onChange={(e) => onUpdate(element.id, { introText: e.target.value })}
          className="mt-1 h-7 text-xs"
          placeholder="快速反应开始前显示的文本"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs">时间限制（3-6秒）</Label>
          <Input
            type="number"
            min={3}
            max={6}
            value={element.timeLimit || 3}
            onChange={(e) => onUpdate(element.id, { 
              timeLimit: validateTimeLimit(parseInt(e.target.value, 10)) 
            })}
            className="mt-1 h-7 text-xs"
          />
        </div>
        
        <div>
          <Label className="text-xs">按键序列（3-6个字符）</Label>
          <Input
            value={element.keySequence || ''}
            onChange={(e) => onUpdate(element.id, { 
              keySequence: validateKeySequence(e.target.value) 
            })}
            className="mt-1 h-7 text-xs"
            maxLength={6}
            placeholder="ABC"
          />
        </div>
      </div>
      
      <SceneSelectSection
        successSceneId={element.successSceneId}
        failureSceneId={element.failureSceneId}
        scenes={scenes}
        onUpdateSuccessScene={(value) => handleSceneSelection(true, value)}
        onUpdateFailureScene={(value) => handleSceneSelection(false, value)}
      />
      
      <Collapsible className="border rounded-md p-2 bg-muted/20">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-xs font-medium">
          转场文本 <ChevronDown className="h-3 w-3" />
        </CollapsibleTrigger>
        <CollapsibleContent>
          <TransitionTextsSection
            successTransition={element.successTransition}
            failureTransition={element.failureTransition}
            onUpdateSuccess={(value) => onUpdate(element.id, { successTransition: value })}
            onUpdateFailure={(value) => onUpdate(element.id, { failureTransition: value })}
          />
        </CollapsibleContent>
      </Collapsible>
      
      {globalValues.length > 0 && (
        <>
          <ValueChangesCollapsible
            title="成功数值变化"
            isSuccess={true}
            valueChanges={element.successValueChanges}
            globalValues={globalValues}
            onAddValueChange={addValueChange}
            onUpdateValueChange={updateValueChange}
            onRemoveValueChange={removeValueChange}
          />
          
          <ValueChangesCollapsible
            title="失败数值变化"
            isSuccess={false}
            valueChanges={element.failureValueChanges}
            globalValues={globalValues}
            onAddValueChange={addValueChange}
            onUpdateValueChange={updateValueChange}
            onRemoveValueChange={removeValueChange}
          />
        </>
      )}
    </div>
  );
};
