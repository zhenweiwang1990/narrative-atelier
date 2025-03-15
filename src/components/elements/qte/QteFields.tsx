
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { QteElement } from '@/utils/types';
import { cn } from '@/lib/utils';

interface QteFieldsProps {
  element: QteElement;
  onUpdate: (id: string, updates: Partial<QteElement>) => void;
  validateTimeLimit: (value: number) => number;
  validateKeySequence: (value: string) => string;
}

const QteFields: React.FC<QteFieldsProps> = ({
  element,
  onUpdate,
  validateTimeLimit,
  validateKeySequence
}) => {
  const [keySequence, setKeySequence] = useState(element.keySequence || '');
  const [isValidSequence, setIsValidSequence] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');

  // Validate key sequence with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (keySequence.length > 0 && (keySequence.length < 3 || keySequence.length > 6)) {
        setIsValidSequence(false);
        setValidationMessage(keySequence.length < 3 
          ? '按键序列至少需要3个字符' 
          : '按键序列最多6个字符');
      } else {
        setIsValidSequence(true);
        setValidationMessage('');
        
        // Only update the element when validation passes
        if (keySequence !== element.keySequence) {
          onUpdate(element.id, { keySequence });
        }
      }
    }, 3000); // 3 second debounce
    
    return () => clearTimeout(timer);
  }, [keySequence, element.id, element.keySequence, onUpdate]);

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
      
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs">时间限制（3-6秒）</Label>
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
          <Label className="text-xs">按键序列（3-6个字符）</Label>
          <div className="relative">
            <Input
              value={keySequence}
              onChange={(e) => setKeySequence(e.target.value)}
              className={cn(
                "mt-1 h-7 text-xs",
                !isValidSequence && "border-red-500 focus-visible:ring-red-500"
              )}
              placeholder="ABC"
            />
            {!isValidSequence && (
              <p className="text-xs text-red-500 mt-1">{validationMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QteFields;
