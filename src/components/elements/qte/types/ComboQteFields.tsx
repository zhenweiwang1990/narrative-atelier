
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { QteElement } from '@/utils/types';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface ComboQteFieldsProps {
  element: QteElement;
  onUpdate: (id: string, updates: Partial<QteElement>) => void;
  validateTimeLimit: (value: number) => number;
}

const ComboQteFields: React.FC<ComboQteFieldsProps> = ({
  element,
  onUpdate,
  validateTimeLimit
}) => {
  const [directionSequence, setDirectionSequence] = useState(element.directionSequence || '');
  const [isValidSequence, setIsValidSequence] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');

  // Direction options for the combo type
  const directionOptions = [
    { value: 'U', label: '上', icon: <ArrowUp className="w-4 h-4" /> },
    { value: 'D', label: '下', icon: <ArrowDown className="w-4 h-4" /> },
    { value: 'L', label: '左', icon: <ArrowLeft className="w-4 h-4" /> },
    { value: 'R', label: '右', icon: <ArrowRight className="w-4 h-4" /> },
  ];

  // Validate direction sequence
  useEffect(() => {
    if (!directionSequence) return;

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
  }, [directionSequence, element.id, element.directionSequence, onUpdate]);

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
  );
};

export default ComboQteFields;
