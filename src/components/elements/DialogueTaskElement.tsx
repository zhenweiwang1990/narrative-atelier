
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { DialogueTaskElement as DialogueTaskElementType, Character, Scene } from '@/utils/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface DialogueTaskElementProps {
  element: DialogueTaskElementType;
  characters: Character[];
  scenes: Scene[];
  onUpdate: (id: string, updates: Partial<DialogueTaskElementType>) => void;
}

export const DialogueTaskElement: React.FC<DialogueTaskElementProps> = ({ 
  element, 
  characters, 
  scenes, 
  onUpdate 
}) => {
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
    </div>
  );
};
