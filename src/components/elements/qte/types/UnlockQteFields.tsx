
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { QteElement } from '@/utils/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { KeyRound } from 'lucide-react';

interface UnlockQteFieldsProps {
  element: QteElement;
  onUpdate: (id: string, updates: Partial<QteElement>) => void;
  validateTimeLimit: (value: number) => number;
}

const UnlockQteFields: React.FC<UnlockQteFieldsProps> = ({
  element,
  onUpdate,
  validateTimeLimit
}) => {
  // 处理解锁图案变更
  const handleUnlockPatternChange = (value: string) => {
    onUpdate(element.id, { 
      unlockPattern: value as 'C' | 'L' | 'M' | 'N' | 'O' | 'S' | 'U' | 'Z' 
    });
  };

  return (
    <div className="space-y-2">
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
        <Label className="text-xs mb-1 block">解锁图案</Label>
        <RadioGroup 
          value={element.unlockPattern || 'C'} 
          onValueChange={handleUnlockPatternChange}
          className="grid grid-cols-4 gap-2"
        >
          {['C', 'L', 'M', 'N', 'O', 'S', 'U', 'Z'].map(pattern => (
            <div key={pattern} className="flex items-center space-x-1">
              <RadioGroupItem value={pattern} id={`pattern-${pattern}`} />
              <Label htmlFor={`pattern-${pattern}`} className="flex items-center justify-center p-1">
                <div className="flex items-center justify-center w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded">
                  <KeyRound className="w-4 h-4 mr-1" />
                  {pattern}
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default UnlockQteFields;
