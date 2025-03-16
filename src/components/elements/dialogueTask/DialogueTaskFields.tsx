
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { DialogueTaskElement, Character } from '@/utils/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

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
  // Handle adding a new dialogue topic
  const addDialogueTopic = () => {
    const currentTopics = element.dialogueTopics || [];
    if (currentTopics.length < 5) { // Limit to 5 topics
      onUpdate(element.id, { 
        dialogueTopics: [...currentTopics, ''] 
      });
    }
  };

  // Handle removing a dialogue topic
  const removeDialogueTopic = (index: number) => {
    const currentTopics = element.dialogueTopics || [];
    const updatedTopics = currentTopics.filter((_, i) => i !== index);
    onUpdate(element.id, { dialogueTopics: updatedTopics });
  };

  // Handle updating a dialogue topic
  const updateDialogueTopic = (index: number, value: string) => {
    const currentTopics = element.dialogueTopics || [];
    const updatedTopics = [...currentTopics];
    updatedTopics[index] = value;
    onUpdate(element.id, { dialogueTopics: updatedTopics });
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
        <Input
          value={element.openingLine || ''}
          onChange={(e) => onUpdate(element.id, { openingLine: e.target.value })}
          className="mt-1 h-7 text-xs"
          placeholder="这个角色首先说什么？"
        />
      </div>
      
      <div>
        <Label className="text-xs">角色介绍 (约100字)</Label>
        <Textarea
          value={element.characterIntro || ''}
          onChange={(e) => onUpdate(element.id, { characterIntro: e.target.value })}
          className="mt-1 text-sm"
          rows={3}
          placeholder="描述这个角色的背景、性格、动机等信息..."
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
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-xs">对话话题 (最多5项，每项不超过30字)</Label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={addDialogueTopic}
            disabled={(element.dialogueTopics || []).length >= 5}
            className="h-6 text-xs px-2"
          >
            添加话题
          </Button>
        </div>
        
        {(element.dialogueTopics || []).map((topic, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Input
              value={topic}
              onChange={(e) => updateDialogueTopic(index, e.target.value)}
              className="h-7 text-xs"
              maxLength={30}
              placeholder={`话题 ${index + 1}`}
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              onClick={() => removeDialogueTopic(index)}
              className="h-7 w-7 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DialogueTaskFields;
