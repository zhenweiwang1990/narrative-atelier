
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { QteElement as QteElementType, Scene, GlobalValue, ValueChange, ElementOutcome } from '@/utils/types';
import SceneSelectSection from './shared/SceneSelectSection';
import TransitionTextsSection from './shared/TransitionTextsSection';
import ValueChangesCollapsible from './shared/ValueChangesCollapsible';
import SuccessFailureLayout from './shared/SuccessFailureLayout';

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
  // Initialize success and failure if they don't exist (for backward compatibility)
  const ensureStructure = (element: QteElementType): QteElementType => {
    const updated = { ...element };
    
    if (!updated.success) {
      updated.success = {
        sceneId: updated.successSceneId || '',
        transition: updated.successTransition || '',
        valueChanges: updated.successValueChanges || []
      };
    }
    
    if (!updated.failure) {
      updated.failure = {
        sceneId: updated.failureSceneId || '',
        transition: updated.failureTransition || '',
        valueChanges: updated.failureValueChanges || []
      };
    }
    
    return updated;
  };
  
  const safeElement = ensureStructure(element);
  
  // Update functions for the new structure
  const updateSuccessSceneId = (sceneId: string) => {
    onUpdate(element.id, {
      success: {
        ...safeElement.success,
        sceneId
      }
    });
  };
  
  const updateFailureSceneId = (sceneId: string) => {
    onUpdate(element.id, {
      failure: {
        ...safeElement.failure,
        sceneId
      }
    });
  };
  
  const updateSuccessTransition = (transition: string) => {
    onUpdate(element.id, {
      success: {
        ...safeElement.success,
        transition
      }
    });
  };
  
  const updateFailureTransition = (transition: string) => {
    onUpdate(element.id, {
      failure: {
        ...safeElement.failure,
        transition
      }
    });
  };
  
  const addValueChange = (isSuccess: boolean) => {
    const currentChanges = isSuccess 
      ? safeElement.success.valueChanges || []
      : safeElement.failure.valueChanges || [];
      
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
        success: {
          ...safeElement.success,
          valueChanges: [...currentChanges, newValueChange]
        }
      });
    } else {
      onUpdate(element.id, {
        failure: {
          ...safeElement.failure,
          valueChanges: [...currentChanges, newValueChange]
        }
      });
    }
  };
  
  const updateValueChange = (isSuccess: boolean, valueId: string, change: number) => {
    const currentChanges = isSuccess 
      ? safeElement.success.valueChanges || []
      : safeElement.failure.valueChanges || [];
      
    const updatedChanges = currentChanges.map(vc => 
      vc.valueId === valueId ? { ...vc, change } : vc
    );
    
    if (isSuccess) {
      onUpdate(element.id, {
        success: {
          ...safeElement.success,
          valueChanges: updatedChanges
        }
      });
    } else {
      onUpdate(element.id, {
        failure: {
          ...safeElement.failure,
          valueChanges: updatedChanges
        }
      });
    }
  };
  
  const removeValueChange = (isSuccess: boolean, valueId: string) => {
    const currentChanges = isSuccess 
      ? safeElement.success.valueChanges || []
      : safeElement.failure.valueChanges || [];
      
    const updatedChanges = currentChanges.filter(vc => vc.valueId !== valueId);
    
    if (isSuccess) {
      onUpdate(element.id, {
        success: {
          ...safeElement.success,
          valueChanges: updatedChanges
        }
      });
    } else {
      onUpdate(element.id, {
        failure: {
          ...safeElement.failure,
          valueChanges: updatedChanges
        }
      });
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
      
      {globalValues.length > 0 && (
        <SuccessFailureLayout
          successTitle="成功结果"
          failureTitle="失败结果"
          successChildren={
            <div className="space-y-2">
              <SceneSelectSection
                successSceneId={safeElement.success.sceneId}
                failureSceneId=""
                scenes={scenes}
                onUpdateSuccessScene={updateSuccessSceneId}
                onUpdateFailureScene={() => {}}
                showSingleColumn={true}
              />
              
              <TransitionTextsSection
                successTransition={safeElement.success.transition}
                failureTransition=""
                onUpdateSuccess={updateSuccessTransition}
                onUpdateFailure={() => {}}
                showSingleColumn={true}
              />
              
              <ValueChangesCollapsible
                title="成功数值变化"
                isSuccess={true}
                valueChanges={safeElement.success.valueChanges}
                globalValues={globalValues}
                onAddValueChange={addValueChange}
                onUpdateValueChange={updateValueChange}
                onRemoveValueChange={removeValueChange}
              />
            </div>
          }
          failureChildren={
            <div className="space-y-2">
              <SceneSelectSection
                successSceneId=""
                failureSceneId={safeElement.failure.sceneId}
                scenes={scenes}
                onUpdateSuccessScene={() => {}}
                onUpdateFailureScene={updateFailureSceneId}
                showSingleColumn={true}
              />
              
              <TransitionTextsSection
                successTransition=""
                failureTransition={safeElement.failure.transition}
                onUpdateSuccess={() => {}}
                onUpdateFailure={updateFailureTransition}
                showSingleColumn={true}
              />
              
              <ValueChangesCollapsible
                title="失败数值变化"
                isSuccess={false}
                valueChanges={safeElement.failure.valueChanges}
                globalValues={globalValues}
                onAddValueChange={addValueChange}
                onUpdateValueChange={updateValueChange}
                onRemoveValueChange={removeValueChange}
              />
            </div>
          }
        />
      )}
    </div>
  );
};
