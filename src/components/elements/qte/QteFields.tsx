
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { QteElement } from '@/utils/types';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, KeyRound } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';

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
  const [directionSequence, setDirectionSequence] = useState(element.directionSequence || '');
  const [isValidSequence, setIsValidSequence] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');
  const qteType = element.qteType || 'action'; // Default to 'action' for backwards compatibility
  const isDoubleChar = element.isDoubleChar || false;

  // Direction options for the combo type
  const directionOptions = [
    { value: 'U', label: '上', icon: <ArrowUp className="w-4 h-4" /> },
    { value: 'D', label: '下', icon: <ArrowDown className="w-4 h-4" /> },
    { value: 'L', label: '左', icon: <ArrowLeft className="w-4 h-4" /> },
    { value: 'R', label: '右', icon: <ArrowRight className="w-4 h-4" /> },
  ];

  // Validate key sequence for action type
  useEffect(() => {
    if (qteType !== 'action' || !keySequence) return;

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
  }, [keySequence, element.id, element.keySequence, onUpdate, qteType, isDoubleChar]);

  // Validate direction sequence for combo type
  useEffect(() => {
    if (qteType !== 'combo' || !directionSequence) return;

    const timer = setTimeout(() => {
      if (directionSequence.length > 0 && (directionSequence.length < 4 || directionSequence.length > 6)) {
        setIsValidSequence(false);
        setValidationMessage(
          directionSequence.length < 4 ? '方向序列至少需要4个方向' : '方向序列最多6个方向'
        );
      } else {
        setIsValidSequence(true);
        setValidationMessage('');
        
        // Only update the element when validation passes
        if (directionSequence !== element.directionSequence) {
          onUpdate(element.id, { directionSequence });
        }
      }
    }, 3000); // 3 second debounce
    
    return () => clearTimeout(timer);
  }, [directionSequence, element.id, element.directionSequence, onUpdate, qteType]);

  // Handle QTE type change
  const handleQteTypeChange = (value: string) => {
    const qteType = value as 'action' | 'combo' | 'unlock';
    onUpdate(element.id, { qteType });
  };

  // Handle unlock pattern change
  const handleUnlockPatternChange = (value: string) => {
    onUpdate(element.id, { 
      unlockPattern: value as 'C' | 'L' | 'M' | 'N' | 'O' | 'S' | 'U' | 'Z' 
    });
  };

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

  // Add direction to the sequence
  const addDirection = (direction: string) => {
    if (directionSequence.length >= 6) return;
    const newSequence = directionSequence + direction;
    setDirectionSequence(newSequence);
    onUpdate(element.id, { directionSequence: newSequence });
  };

  // Clear direction sequence
  const clearDirections = () => {
    setDirectionSequence('');
    onUpdate(element.id, { directionSequence: '' });
  };

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

      <div className="mb-2">
        <Label className="text-xs mb-1 block">QTE类型</Label>
        <Select 
          value={qteType} 
          onValueChange={handleQteTypeChange}
        >
          <SelectTrigger className="h-7 text-xs">
            <SelectValue placeholder="选择QTE类型" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="action">QTE动作</SelectItem>
            <SelectItem value="combo">QTE连击</SelectItem>
            <SelectItem value="unlock">QTE解锁</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {qteType === 'action' && (
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
      )}

      {qteType === 'combo' && (
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
            <Label className="text-xs">方向序列（4-6个方向）</Label>
            <div className="mt-1 p-2 border rounded-md bg-muted/20">
              <div className="flex space-x-2 mb-2">
                {directionOptions.map(dir => (
                  <button
                    key={dir.value}
                    type="button"
                    onClick={() => addDirection(dir.value)}
                    className="flex items-center justify-center w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                    disabled={directionSequence.length >= 6}
                  >
                    {dir.icon}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={clearDirections}
                  className="flex items-center justify-center w-8 h-8 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-800/30 transition-colors ml-auto"
                >
                  ×
                </button>
              </div>
              
              <div className="flex items-center bg-white dark:bg-gray-800 p-2 rounded-md min-h-8">
                {directionSequence ? (
                  <div className="flex space-x-1">
                    {directionSequence.split('').map((dir, idx) => {
                      const direction = directionOptions.find(d => d.value === dir);
                      return (
                        <div key={idx} className="flex items-center justify-center w-6 h-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                          {direction?.icon}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground">请添加方向序列</span>
                )}
              </div>
              
              {!isValidSequence && (
                <p className="text-xs text-red-500 mt-1">{validationMessage}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {qteType === 'unlock' && (
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
      )}
    </div>
  );
};

export default QteFields;
