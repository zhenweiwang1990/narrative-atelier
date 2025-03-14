
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { NarrationElement as NarrationElementType } from '@/utils/types';

interface NarrationElementProps {
  element: NarrationElementType;
  onUpdate: (id: string, updates: Partial<NarrationElementType>) => void;
}

export const NarrationElement: React.FC<NarrationElementProps> = ({ element, onUpdate }) => {
  return (
    <div className="space-y-2">
      <div>
        <Label className="text-xs">文本</Label>
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
