
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { UnlockCondition, GlobalValue } from '@/utils/types';

interface UnlockConditionsEditorProps {
  unlockConditions: UnlockCondition[] | undefined;
  globalValues: GlobalValue[];
  onAddCondition: () => void;
  onUpdateCondition: (index: number, updates: Partial<UnlockCondition>) => void;
  onRemoveCondition: (index: number) => void;
}

const operatorLabels = {
  'gt': '大于',
  'lt': '小于',
  'eq': '等于',
  'gte': '大于等于',
  'lte': '小于等于'
};

const UnlockConditionsEditor: React.FC<UnlockConditionsEditorProps> = ({
  unlockConditions = [],
  globalValues,
  onAddCondition,
  onUpdateCondition,
  onRemoveCondition
}) => {
  if (globalValues.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 mt-2">
      <div className="flex justify-between items-center">
        <Label className="text-xs">解锁条件</Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={onAddCondition}
          className="h-6 text-xs"
        >
          <Plus className="h-3 w-3 mr-1" /> 添加条件
        </Button>
      </div>
      
      {unlockConditions.length === 0 && (
        <p className="text-xs text-muted-foreground">未设置条件，将使用钻石解锁或始终显示</p>
      )}
      
      {unlockConditions.map((condition, index) => (
        <div key={index} className="flex items-center gap-2 border p-2 rounded-md bg-muted/30">
          <Select
            value={condition.valueId}
            onValueChange={(value) => onUpdateCondition(index, { valueId: value })}
          >
            <SelectTrigger className="h-7 text-xs flex-1">
              <SelectValue placeholder="选择变量" />
            </SelectTrigger>
            <SelectContent>
              {globalValues.map((value) => (
                <SelectItem key={value.id} value={value.id}>
                  {value.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select
            value={condition.operator}
            onValueChange={(value) => onUpdateCondition(index, { 
              operator: value as 'gt' | 'lt' | 'eq' | 'gte' | 'lte' 
            })}
          >
            <SelectTrigger className="h-7 text-xs w-[80px]">
              <SelectValue placeholder="逻辑" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(operatorLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input
            type="number"
            value={condition.targetValue}
            onChange={(e) => onUpdateCondition(index, { 
              targetValue: Number(e.target.value) 
            })}
            className="h-7 text-xs w-[80px]"
          />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveCondition(index)}
            className="h-7 w-7 text-destructive"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default UnlockConditionsEditor;
