
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { QteElement } from '@/utils/types';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';

interface ActionQteFieldsProps {
  element: QteElement;
  onUpdate: (id: string, updates: Partial<QteElement>) => void;
  validateTimeLimit: (value: number) => number;
  validateKeySequence: (value: string) => string;
}

const ActionQteFields: React.FC<ActionQteFieldsProps> = ({
  element,
  onUpdate,
  validateTimeLimit,
  validateKeySequence
}) => {
  const [keySequence, setKeySequence] = useState(element.keySequence || '');
  const [isValidSequence, setIsValidSequence] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');
  const isDoubleChar = element.isDoubleChar || false;

  // Validate key sequence
  useEffect(() => {
    if (!keySequence) return;

    const timer = setTimeout(() => {
      const minLength = isDoubleChar ? 2 : 3;
      const maxLength = isDoubleChar ? 3 : 6;
      
      if (keySequence.length > 0 && (keySequence.length < minLength || keySequence.length > maxLength)) {
        setIsValidSequence(false);
        setValidationMessage(
          keySequence.length < minLength 
            ? `按键序列至少需要${minLength}个字符` 
            : `按键序列最多${maxLength}个字符`
        );
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
  }, [keySequence, element.id, element.keySequence, onUpdate, isDoubleChar]);

  // Handle double character mode toggle
  const handleDoubleCharToggle = (checked: boolean) => {
    // Update the element with the new double character setting
    onUpdate(element.id, { isDoubleChar: checked });
    
    // If we're switching modes, we might need to adjust the key sequence
    if (keySequence) {
      // Reset the key sequence if it might be invalid in the new mode
      setKeySequence('');
    }
  };

  return (
    <div className="space-y-3">
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
      
      <div className="flex items-center space-x-2">
        <Switch
          id="double-char-mode"
          checked={isDoubleChar}
          onCheckedChange={handleDoubleCharToggle}
        />
        <Label htmlFor="double-char-mode" className="text-xs cursor-pointer">
          双字符按键模式
        </Label>
      </div>
      
      <div>
        <Label className="text-xs">
          {isDoubleChar 
            ? '按键序列（2-3个双字符按键）' 
            : '按键序列（3-6个单字符按键）'}
        </Label>
        <div className="relative">
          <Input
            value={keySequence}
            onChange={(e) => setKeySequence(e.target.value)}
            className={cn(
              "mt-1 h-7 text-xs",
              !isValidSequence && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder={isDoubleChar ? "QW ER" : "ABC"}
          />
          {!isValidSequence && (
            <p className="text-xs text-red-500 mt-1">{validationMessage}</p>
          )}
          {isDoubleChar && keySequence && (
            <div className="mt-1 flex gap-1">
              {keySequence.split(' ').map((key, index) => (
                key && (
                  <div key={index} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs">
                    {key}
                  </div>
                )
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActionQteFields;
