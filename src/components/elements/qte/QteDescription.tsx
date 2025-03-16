
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { QteElement } from '@/utils/types';

interface QteDescriptionProps {
  element: QteElement;
  onUpdate: (id: string, updates: Partial<QteElement>) => void;
}

const QteDescription: React.FC<QteDescriptionProps> = ({ element, onUpdate }) => {
  return (
    <div className="space-y-2">
      <div>
        <Label className="text-xs">描述</Label>
        <Textarea
          value={element.description}
          onChange={(e) => onUpdate(element.id, { description: e.target.value })}
          className="mt-1 text-sm"
          rows={2}
        />
      </div>
      
      <div>
        <Label className="text-xs">介绍文本</Label>
        <Input
          value={element.introText || ''}
          onChange={(e) => onUpdate(element.id, { introText: e.target.value })}
          className="mt-1 h-7 text-xs"
          placeholder="快速反应开始前显示的文本"
        />
      </div>
    </div>
  );
};

export default QteDescription;
