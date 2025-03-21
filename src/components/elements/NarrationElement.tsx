
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { NarrationElement as NarrationElementType } from '@/utils/types';
import { Volume2 } from 'lucide-react';
import SoundEffectSelector from './shared/SoundEffectSelector';

interface NarrationElementProps {
  element: NarrationElementType;
  onUpdate: (id: string, updates: Partial<NarrationElementType>) => void;
}

export const NarrationElement: React.FC<NarrationElementProps> = ({ element, onUpdate }) => {
  // Handle sound effect update
  const handleSoundEffectUpdate = (effect: { category: string; name: string; url: string } | undefined) => {
    onUpdate(element.id, { soundEffect: effect });
  };

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
      
      <div className="text-xs text-muted-foreground flex items-center mt-1 mb-3">
        <Volume2 className="h-3 w-3 mr-1 text-muted-foreground" />
        <span>旁白可添加音效增强场景沉浸感</span>
      </div>

      <div className="mt-4 pt-2 border-t">
        <SoundEffectSelector
          selectedEffect={element.soundEffect}
          onSelect={handleSoundEffectUpdate}
        />
      </div>
    </div>
  );
};
