
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { DialogueTaskElement as DialogueTaskElementType, Character, Scene, GlobalValue, ValueChange } from '@/utils/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
        <Label className="text-xs">Goal</Label>
        <Input
          value={element.goal}
          onChange={(e) => onUpdate(element.id, { goal: e.target.value })}
          className="mt-1 h-7 text-xs"
        />
      </div>
      
      <div>
        <Label className="text-xs">Target Character</Label>
        <Select 
          value={element.targetCharacterId}
          onValueChange={(value) => onUpdate(element.id, { targetCharacterId: value })}
        >
          <SelectTrigger className="mt-1 h-8 text-xs">
            <SelectValue placeholder="Select character" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {characters.map(character => (
                <SelectItem key={character.id} value={character.id}>
                  {character.name} {character.role === 'protagonist' ? '(Protagonist)' : ''}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-xs">Opening Line</Label>
        <Textarea
          value={element.openingLine || ''}
          onChange={(e) => onUpdate(element.id, { openingLine: e.target.value })}
          className="mt-1 text-sm"
          rows={2}
          placeholder="What does this character say first?"
        />
      </div>
      
      <div>
        <Label className="text-xs">Background</Label>
        <Textarea
          value={element.background}
          onChange={(e) => onUpdate(element.id, { background: e.target.value })}
          className="mt-1 text-sm"
          rows={2}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <Label className="text-xs">Success Scene</Label>
          <Select 
            value={element.successSceneId}
            onValueChange={(value) => onUpdate(element.id, { successSceneId: value })}
          >
            <SelectTrigger className="mt-1 h-8 text-xs">
              <SelectValue placeholder="Select scene" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {scenes.map(scene => (
                  <SelectItem key={scene.id} value={scene.id}>
                    {scene.title} ({scene.type})
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label className="text-xs">Failure Scene</Label>
          <Select 
            value={element.failureSceneId}
            onValueChange={(value) => onUpdate(element.id, { failureSceneId: value })}
          >
            <SelectTrigger className="mt-1 h-8 text-xs">
              <SelectValue placeholder="Select scene" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {scenes.map(scene => (
                  <SelectItem key={scene.id} value={scene.id}>
                    {scene.title} ({scene.type})
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Collapsible className="border rounded-md p-2 bg-muted/20">
        <CollapsibleTrigger className="flex items-center justify-between w-full text-xs font-medium">
          Transition Texts <ChevronDown className="h-3 w-3" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 space-y-2">
          <div>
            <Label className="text-xs">Success Transition</Label>
            <Textarea
              value={element.successTransition || ''}
              onChange={(e) => onUpdate(element.id, { successTransition: e.target.value })}
              className="mt-1 text-sm"
              rows={2}
              placeholder="Narration after success"
            />
          </div>
          <div>
            <Label className="text-xs">Failure Transition</Label>
            <Textarea
              value={element.failureTransition || ''}
              onChange={(e) => onUpdate(element.id, { failureTransition: e.target.value })}
              className="mt-1 text-sm"
              rows={2}
              placeholder="Narration after failure"
            />
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {globalValues.length > 0 && (
        <>
          <Collapsible className="border rounded-md p-2 bg-muted/20">
            <CollapsibleTrigger className="flex items-center justify-between w-full text-xs font-medium">
              Success Value Changes <ChevronDown className="h-3 w-3" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              {element.successValueChanges && element.successValueChanges.length > 0 ? (
                <div className="space-y-2">
                  {element.successValueChanges.map(valueChange => {
                    const value = globalValues.find(v => v.id === valueChange.valueId);
                    return (
                      <div key={valueChange.valueId} className="flex items-center gap-2">
                        <div className="flex-1">
                          <Select
                            value={valueChange.valueId}
                            onValueChange={(newValueId) => {
                              removeValueChange(true, valueChange.valueId);
                              updateValueChange(true, newValueId, valueChange.change);
                            }}
                          >
                            <SelectTrigger className="h-7 text-xs">
                              <SelectValue placeholder="Select value" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {globalValues.map(v => (
                                  <SelectItem key={v.id} value={v.id}>
                                    {v.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-20">
                          <Input
                            type="number"
                            value={valueChange.change}
                            onChange={(e) => updateValueChange(
                              true,
                              valueChange.valueId, 
                              parseInt(e.target.value) || 0
                            )}
                            className="h-7 text-xs"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeValueChange(true, valueChange.valueId)}
                          className="h-7 w-7 text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">No value changes defined.</p>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => addValueChange(true)}
                className="mt-2 h-7 text-xs w-full"
                disabled={
                  !element.successValueChanges ? false :
                  element.successValueChanges.length >= globalValues.length
                }
              >
                <Plus className="h-3 w-3 mr-1" /> Add Value Change
              </Button>
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible className="border rounded-md p-2 bg-muted/20">
            <CollapsibleTrigger className="flex items-center justify-between w-full text-xs font-medium">
              Failure Value Changes <ChevronDown className="h-3 w-3" />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              {element.failureValueChanges && element.failureValueChanges.length > 0 ? (
                <div className="space-y-2">
                  {element.failureValueChanges.map(valueChange => {
                    const value = globalValues.find(v => v.id === valueChange.valueId);
                    return (
                      <div key={valueChange.valueId} className="flex items-center gap-2">
                        <div className="flex-1">
                          <Select
                            value={valueChange.valueId}
                            onValueChange={(newValueId) => {
                              removeValueChange(false, valueChange.valueId);
                              updateValueChange(false, newValueId, valueChange.change);
                            }}
                          >
                            <SelectTrigger className="h-7 text-xs">
                              <SelectValue placeholder="Select value" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {globalValues.map(v => (
                                  <SelectItem key={v.id} value={v.id}>
                                    {v.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-20">
                          <Input
                            type="number"
                            value={valueChange.change}
                            onChange={(e) => updateValueChange(
                              false,
                              valueChange.valueId, 
                              parseInt(e.target.value) || 0
                            )}
                            className="h-7 text-xs"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeValueChange(false, valueChange.valueId)}
                          className="h-7 w-7 text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">No value changes defined.</p>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => addValueChange(false)}
                className="mt-2 h-7 text-xs w-full"
                disabled={
                  !element.failureValueChanges ? false :
                  element.failureValueChanges.length >= globalValues.length
                }
              >
                <Plus className="h-3 w-3 mr-1" /> Add Value Change
              </Button>
            </CollapsibleContent>
          </Collapsible>
        </>
      )}
    </div>
  );
};
