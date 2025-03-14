
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { QteElement as QteElementType, Scene } from '@/utils/types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface QteElementProps {
  element: QteElementType;
  scenes: Scene[];
  onUpdate: (id: string, updates: Partial<QteElementType>) => void;
  validateTimeLimit: (value: number) => number;
  validateKeySequence: (value: string) => string;
}

export const QteElement: React.FC<QteElementProps> = ({ 
  element, 
  scenes, 
  onUpdate, 
  validateTimeLimit, 
  validateKeySequence 
}) => {
  return (
    <div className="space-y-2">
      <div>
        <Label className="text-xs">Description</Label>
        <Textarea
          value={element.description}
          onChange={(e) => onUpdate(element.id, { description: e.target.value })}
          className="mt-1 text-sm"
          rows={2}
        />
      </div>
      
      <div>
        <Label className="text-xs">Intro Text</Label>
        <Input
          value={element.introText || ''}
          onChange={(e) => onUpdate(element.id, { introText: e.target.value })}
          className="mt-1 h-7 text-xs"
          placeholder="Text shown before QTE starts"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs">Time Limit (3-6 seconds)</Label>
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
          <Label className="text-xs">Key Sequence (3-6 chars)</Label>
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
