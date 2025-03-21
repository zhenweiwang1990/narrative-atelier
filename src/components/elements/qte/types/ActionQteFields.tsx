
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { QteElement } from '@/utils/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

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
  // 如果仍然是旧格式，将字符串转换为数组
  const initialKeySequence = element.keySequence 
    ? (typeof element.keySequence === 'string' ? element.keySequence.split(' ').filter(key => key.trim() !== '') : element.keySequence)
    : [];
  
  const [keyArray, setKeyArray] = useState<string[]>(initialKeySequence);
  const [currentKey, setCurrentKey] = useState('');
  const [isValidInput, setIsValidInput] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');

  // 当keyArray改变时更新元素
  useEffect(() => {
    // 验证按键数组长度
    if (keyArray.length >= 3 && keyArray.length <= 6) {
      onUpdate(element.id, { keySequence: keyArray });
    }
  }, [keyArray, element.id, onUpdate]);

  // 处理向序列添加新按键
  const handleAddKey = () => {
    if (!currentKey.trim()) return;
    
    // 验证当前输入
    if (currentKey.length > 2) {
      setIsValidInput(false);
      setValidationMessage('每个按键最多2个字符');
      return;
    }
    
    // 检查添加是否会超过最大长度
    if (keyArray.length >= 6) {
      setIsValidInput(false);
      setValidationMessage('按键序列最多6个按键');
      return;
    }
    
    setKeyArray([...keyArray, currentKey.trim()]);
    setCurrentKey('');
    setIsValidInput(true);
    setValidationMessage('');
  };

  // 处理从序列中删除按键
  const handleRemoveKey = (index: number) => {
    const newKeyArray = [...keyArray];
    newKeyArray.splice(index, 1);
    setKeyArray(newKeyArray);
  };

  // 处理添加按键的按键按下事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddKey();
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
      
      <div>
        <Label className="text-xs">按键序列（3-6个按键，每个按键1-2字符）</Label>
        <div className="flex items-center gap-2 mt-1">
          <Input
            value={currentKey}
            onChange={(e) => {
              setCurrentKey(e.target.value);
              setIsValidInput(true);
              setValidationMessage('');
            }}
            onKeyPress={handleKeyPress}
            className={cn(
              "h-7 text-xs",
              !isValidInput && "border-red-500 focus-visible:ring-red-500"
            )}
            placeholder="输入1-2个字符"
            maxLength={2}
          />
          <Button
            type="button"
            size="sm"
            onClick={handleAddKey}
            className="h-7 px-2"
          >
            添加
          </Button>
        </div>
        
        {!isValidInput && (
          <p className="text-xs text-red-500 mt-1">{validationMessage}</p>
        )}
        
        {keyArray.length < 3 && (
          <p className="text-xs text-amber-500 mt-1">请添加至少3个按键</p>
        )}
        
        {keyArray.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {keyArray.map((key, index) => (
              <div 
                key={index} 
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm flex items-center gap-1 group"
              >
                {key}
                <button
                  type="button"
                  onClick={() => handleRemoveKey(index)}
                  className="opacity-50 hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActionQteFields;
