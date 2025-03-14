
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChoiceElement as ChoiceElementType, ChoiceOption, Scene } from '@/utils/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

interface ChoiceElementProps {
  element: ChoiceElementType;
  scenes: Scene[];
  onUpdate: (id: string, updates: Partial<ChoiceElementType>) => void;
  onAddOption: (elementId: string) => void;
  onDeleteOption: (elementId: string, optionId: string) => void;
  onUpdateOption: (elementId: string, optionId: string, updates: Partial<ChoiceOption>) => void;
}

export const ChoiceElement: React.FC<ChoiceElementProps> = ({ 
  element, 
  scenes, 
  onUpdate, 
  onAddOption, 
  onDeleteOption, 
  onUpdateOption 
}) => {
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
