
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { DialogueTaskElement as DialogueTaskElementType, Character, Scene, GlobalValue, ValueChange } from '@/utils/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ValueChangesSection from './shared/ValueChangesSection';
import SuccessFailureLayout from './shared/SuccessFailureLayout';

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
  
  const handleSceneSelection = (isSuccess: boolean, sceneId: string) => {
    if (sceneId === "none") {
      onUpdate(element.id, isSuccess ? { successSceneId: "" } : { failureSceneId: "" });
    } else {
      onUpdate(element.id, isSuccess ? { successSceneId: sceneId } : { failureSceneId: sceneId });
    }
  };

  const renderSceneSelect = (isSuccess: boolean) => (
    <div>
      <Label className="text-xs">{isSuccess ? "成功场景" : "失败场景"}</Label>
      <Select 
        value={(isSuccess ? element.successSceneId : element.failureSceneId) || "none"} 
        onValueChange={(value) => handleSceneSelection(isSuccess, value)}
      >
        <SelectTrigger className="mt-1 h-8 text-xs">
          <SelectValue placeholder="选择场景" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="none">不指定</SelectItem>
            {scenes.map((scene) => (
              <SelectItem key={scene.id} value={scene.id}>
                {scene.title} (
                {scene.type === "start"
                  ? "开始"
                  : scene.type === "ending"
                  ? "结局"
                  : scene.type === "bad-ending"
                  ? "异常结局"
                  : "普通"}
                )
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );

  const renderTransitionText = (isSuccess: boolean) => (
    <div>
      <Label className="text-xs">{isSuccess ? "成功转场文本" : "失败转场文本"}</Label>
      <Textarea
        value={isSuccess ? (element.successTransition || '') : (element.failureTransition || '')}
        onChange={(e) => onUpdate(element.id, isSuccess 
          ? { successTransition: e.target.value } 
          : { failureTransition: e.target.value }
        )}
        className="mt-1 text-sm"
        rows={2}
        placeholder={isSuccess ? "成功后的叙述" : "失败后的叙述"}
      />
    </div>
  );

  const renderValueChanges = (isSuccess: boolean) => (
    <div>
      <Label className="text-xs">{isSuccess ? "成功数值变化" : "失败数值变化"}</Label>
      <ValueChangesSection
        isSuccess={isSuccess}
        valueChanges={isSuccess ? element.successValueChanges : element.failureValueChanges}
        globalValues={globalValues}
        onAddValueChange={addValueChange}
        onUpdateValueChange={updateValueChange}
        onRemoveValueChange={removeValueChange}
      />
    </div>
  );
  
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
      
      {globalValues.length > 0 && (
        <SuccessFailureLayout
          successTitle="成功结果"
          failureTitle="失败结果"
          successChildren={
            <div className="space-y-2">
              {renderSceneSelect(true)}
              {renderTransitionText(true)}
              {renderValueChanges(true)}
            </div>
          }
          failureChildren={
            <div className="space-y-2">
              {renderSceneSelect(false)}
              {renderTransitionText(false)}
              {renderValueChanges(false)}
            </div>
          }
        />
      )}
    </div>
  );
};
