
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { DialogueTaskElement as DialogueTaskElementType, Character, Scene, GlobalValue, ValueChange } from '@/utils/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SceneSelectSection from './shared/SceneSelectSection';
import TransitionTextsSection from './shared/TransitionTextsSection';
import ValueChangesCollapsible from './shared/ValueChangesCollapsible';

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
  
  return (
    <div className="space-y-2">
      <div>
        <Label className="text-xs">目标</Label>
        <Input
          value={element.goal}
          onChange={(e) => onUpdate(element.id, { goal: e.target.value })}
          className="mt-1 h-7 text-xs"
        />
      </div>
      
      <div>
        <Label className="text-xs">目标角色</Label>
        <Select 
          value={element.targetCharacterId}
          onValueChange={(value) => onUpdate(element.id, { targetCharacterId: value })}
        >
          <SelectTrigger className="mt-1 h-8 text-xs">
            <SelectValue placeholder="选择角色" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {characters.map(character => (
                <SelectItem key={character.id} value={character.id}>
                  {character.name} {character.role === 'protagonist' ? '(主角)' : ''}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs">开场白</Label>
        <Textarea
          value={element.openingLine || ''}
          onChange={(e) => onUpdate(element.id, { openingLine: e.target.value })}
          className="mt-1 text-sm"
          rows={2}
          placeholder="这个角色首先说什么？"
        />
      </div>
      
      <div>
        <Label className="text-xs">背景</Label>
        <Textarea
          value={element.background}
          onChange={(e) => onUpdate(element.id, { background: e.target.value })}
          className="mt-1 text-sm"
          rows={2}
        />
      </div>
      
      <SceneSelectSection
        successSceneId={element.successSceneId}
        failureSceneId={element.failureSceneId}
        scenes={scenes}
        onUpdateSuccessScene={(value) => onUpdate(element.id, { successSceneId: value })}
        onUpdateFailureScene={(value) => onUpdate(element.id, { failureSceneId: value })}
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
