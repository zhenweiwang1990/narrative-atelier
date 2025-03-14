
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChoiceElement as ChoiceElementType, ChoiceOption, Scene, GlobalValue, ValueChange } from '@/utils/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ChoiceElementProps {
  element: ChoiceElementType;
  scenes: Scene[];
  globalValues: GlobalValue[];
  onUpdate: (id: string, updates: Partial<ChoiceElementType>) => void;
  onAddOption: (elementId: string) => void;
  onDeleteOption: (elementId: string, optionId: string) => void;
  onUpdateOption: (elementId: string, optionId: string, updates: Partial<ChoiceOption>) => void;
}

export const ChoiceElement: React.FC<ChoiceElementProps> = ({ 
  element, 
  scenes, 
  globalValues,
  onUpdate, 
  onAddOption, 
  onDeleteOption, 
  onUpdateOption 
}) => {
  const addValueChange = (optionId: string) => {
    const option = element.options.find(o => o.id === optionId);
    if (!option) return;
    
    const currentChanges = option.valueChanges || [];
    const unusedValues = globalValues.filter(
      value => !currentChanges.some(change => change.valueId === value.id)
    );
    
    if (unusedValues.length === 0) return;
    
    const newValueChange: ValueChange = {
      valueId: unusedValues[0].id,
      change: 1
    };
    
    onUpdateOption(element.id, optionId, {
      valueChanges: [...currentChanges, newValueChange]
    });
  };
  
  const updateValueChange = (optionId: string, valueId: string, change: number) => {
    const option = element.options.find(o => o.id === optionId);
    if (!option || !option.valueChanges) return;
    
    const updatedChanges = option.valueChanges.map(vc => 
      vc.valueId === valueId ? { ...vc, change } : vc
    );
    
    onUpdateOption(element.id, optionId, {
      valueChanges: updatedChanges
    });
  };
  
  const removeValueChange = (optionId: string, valueId: string) => {
    const option = element.options.find(o => o.id === optionId);
    if (!option || !option.valueChanges) return;
    
    const updatedChanges = option.valueChanges.filter(vc => vc.valueId !== valueId);
    
    onUpdateOption(element.id, optionId, {
      valueChanges: updatedChanges
    });
  };
  
  return (
    <div className="space-y-2">
      <div>
        <Label className="text-xs">Description</Label>
        <Textarea
          value={element.text}
          onChange={(e) => onUpdate(element.id, { text: e.target.value })}
          className="mt-1 text-sm"
          rows={2}
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-1">
          <Label className="text-xs">Options</Label>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onAddOption(element.id)}
            disabled={element.options.length >= 3}
            className="h-6 text-xs"
          >
            <Plus className="h-3 w-3 mr-1" /> Add
          </Button>
        </div>
        
        <div className="space-y-2">
          {element.options.map((option, optIdx) => (
            <div key={option.id} className="p-2 border rounded-md bg-muted/20">
              <div className="flex justify-between items-start mb-1">
                <Label className="text-xs">Option {optIdx + 1}</Label>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-5 w-5 text-destructive"
                  onClick={() => onDeleteOption(element.id, option.id)}
                  disabled={element.options.length <= 1}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              
              <Input
                value={option.text}
                onChange={(e) => onUpdateOption(element.id, option.id, { text: e.target.value })}
                className="mb-1 h-7 text-xs"
                placeholder="Option text"
              />
              
              <div>
                <Label className="text-xs">Next Scene</Label>
                <Select 
                  value={option.nextSceneId}
                  onValueChange={(value) => onUpdateOption(element.id, option.id, { nextSceneId: value })}
                >
                  <SelectTrigger className="mt-1 h-7 text-xs">
                    <SelectValue placeholder="Select next scene" />
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
              
              {globalValues.length > 0 && (
                <Collapsible className="mt-2">
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-xs py-1">
                    <span className="font-medium">Value Changes</span>
                    <ChevronDown className="h-3 w-3" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-2">
                    {option.valueChanges && option.valueChanges.length > 0 ? (
                      <div className="space-y-2">
                        {option.valueChanges.map(valueChange => {
                          const value = globalValues.find(v => v.id === valueChange.valueId);
                          return (
                            <div key={valueChange.valueId} className="flex items-center gap-2">
                              <div className="flex-1">
                                <Select
                                  value={valueChange.valueId}
                                  onValueChange={(newValueId) => {
                                    removeValueChange(option.id, valueChange.valueId);
                                    updateValueChange(option.id, newValueId, valueChange.change);
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
                                    option.id, 
                                    valueChange.valueId, 
                                    parseInt(e.target.value) || 0
                                  )}
                                  className="h-7 text-xs"
                                />
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeValueChange(option.id, valueChange.valueId)}
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
                      onClick={() => addValueChange(option.id)}
                      className="mt-2 h-7 text-xs w-full"
                      disabled={
                        !option.valueChanges ? false :
                        option.valueChanges.length >= globalValues.length
                      }
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add Value Change
                    </Button>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
