
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ThoughtElement as ThoughtElementType, Character } from '@/utils/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ThoughtElementProps {
  element: ThoughtElementType;
  characters: Character[];
  onUpdate: (id: string, updates: Partial<ThoughtElementType>) => void;
}

export const ThoughtElement: React.FC<ThoughtElementProps> = ({ element, characters, onUpdate }) => {
  return (
    <div className="space-y-2">
      <div>
        <Label className="text-xs">角色</Label>
        <Select 
          value={element.characterId}
          onValueChange={(value) => onUpdate(element.id, { characterId: value })}
        >
          <SelectTrigger className="mt-1 h-8 text-xs">
            <SelectValue placeholder="选择角色" />
          </SelectTrigger>
          <SelectContent position="popper" className="z-[100]">
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
        <Label className="text-xs">想法</Label>
        <Textarea
          value={element.text}
          onChange={(e) => onUpdate(element.id, { text: e.target.value })}
          className="mt-1 text-sm"
          rows={2}
        />
      </div>
    </div>
  );
};
