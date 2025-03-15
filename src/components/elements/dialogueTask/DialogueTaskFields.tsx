
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { DialogueTaskElement, Character } from '@/utils/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DialogueTaskFieldsProps {
  element: DialogueTaskElement;
  characters: Character[];
  onUpdate: (id: string, updates: Partial<DialogueTaskElement>) => void;
}

const DialogueTaskFields: React.FC<DialogueTaskFieldsProps> = ({
  element,
  characters,
  onUpdate
}) => {
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
          value={element.background || ''}
          onChange={(e) => onUpdate(element.id, { background: e.target.value })}
          className="mt-1 text-sm"
          rows={2}
        />
      </div>
    </div>
  );
};

export default DialogueTaskFields;
