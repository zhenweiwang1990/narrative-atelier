
import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GlobalValue, TitleCondition } from '@/utils/types';
import { generateId } from '@/utils/storage';

interface TitleConditionsEditorProps {
  titleId: string;
  conditions: TitleCondition[];
  globalValues: GlobalValue[];
  onChange: (conditions: TitleCondition[]) => void;
}

const operators = [
  { value: 'gt', label: '大于 (>)' },
  { value: 'lt', label: '小于 (<)' },
  { value: 'eq', label: '等于 (=)' },
  { value: 'gte', label: '大于等于 (>=)' },
  { value: 'lte', label: '小于等于 (<=)' },
];

const TitleConditionsEditor: React.FC<TitleConditionsEditorProps> = ({ 
  titleId, 
  conditions, 
  globalValues,
  onChange 
}) => {
  const addCondition = () => {
    // Default to first global value if available
    const defaultValueId = globalValues.length > 0 ? globalValues[0].id : '';
    
    const newCondition: TitleCondition = {
      valueId: defaultValueId,
      operator: 'gt',
      targetValue: 0
    };
    
    onChange([...conditions, newCondition]);
  };

  const updateCondition = (index: number, updates: Partial<TitleCondition>) => {
    const updatedConditions = [...conditions];
    updatedConditions[index] = { ...updatedConditions[index], ...updates };
    onChange(updatedConditions);
  };

  const removeCondition = (index: number) => {
    const updatedConditions = [...conditions];
    updatedConditions.splice(index, 1);
    onChange(updatedConditions);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Label className="text-xs">解锁条件</Label>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={addCondition}
          className="h-7 text-xs"
          disabled={globalValues.length === 0}
        >
          <Plus className="h-3 w-3 mr-1" /> 添加条件
        </Button>
      </div>

      {conditions.length === 0 ? (
        <div className="text-center py-2 text-xs text-muted-foreground bg-muted/20 rounded-md">
          没有条件意味着所有玩家都将获得此称号。添加条件来控制谁可以解锁此称号。
        </div>
      ) : (
        <div className="space-y-2">
          {conditions.map((condition, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Select
                value={condition.valueId}
                onValueChange={(value) => updateCondition(index, { valueId: value })}
              >
                <SelectTrigger className="h-8 text-xs flex-1">
                  <SelectValue placeholder="选择变量" />
                </SelectTrigger>
                <SelectContent>
                  {globalValues.map(value => (
                    <SelectItem key={value.id} value={value.id} className="text-xs">
                      {value.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={condition.operator}
                onValueChange={(value) => updateCondition(index, { operator: value as any })}
              >
                <SelectTrigger className="h-8 text-xs w-24">
                  <SelectValue placeholder="运算符" />
                </SelectTrigger>
                <SelectContent>
                  {operators.map(op => (
                    <SelectItem key={op.value} value={op.value} className="text-xs">
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="number"
                value={condition.targetValue}
                onChange={(e) => updateCondition(index, { targetValue: Number(e.target.value) })}
                className="h-8 text-xs w-20"
              />

              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCondition(index)}
                className="h-7 w-7 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TitleConditionsEditor;
