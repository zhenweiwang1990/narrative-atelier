
import React from "react";
import { Button } from "@/components/ui/button";
import { ChoiceElement, ValueChange, GlobalValue, UnlockCondition } from "@/utils/types";
import { List, Lock, Gem } from "lucide-react";

interface ChoicePreviewProps {
  element: ChoiceElement;
  handleChoiceSelect: (nextSceneId: string, valueChanges?: ValueChange[]) => void;
  globalValues?: GlobalValue[]; // 为了检查条件解锁
}

// 用于检查选项是否满足全局变量解锁条件
const checkConditionsMet = (conditions: UnlockCondition[] | undefined, globalValues: GlobalValue[]): boolean => {
  if (!conditions || conditions.length === 0) return false;
  
  return conditions.every(condition => {
    const value = globalValues.find(v => v.id === condition.valueId);
    if (!value) return false;
    
    const currentValue = value.currentValue !== undefined ? value.currentValue : value.initialValue;
    
    switch (condition.operator) {
      case 'gt': return currentValue > condition.targetValue;
      case 'lt': return currentValue < condition.targetValue;
      case 'eq': return currentValue === condition.targetValue;
      case 'gte': return currentValue >= condition.targetValue;
      case 'lte': return currentValue <= condition.targetValue;
      default: return false;
    }
  });
};

const ChoicePreview: React.FC<ChoicePreviewProps> = ({ 
  element, 
  handleChoiceSelect,
  globalValues = []
}) => {
  return (
    <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-md border border-amber-200 dark:border-amber-800 my-2 animate-fade-in">
      <div className="flex items-center mb-3">
        <List className="h-4 w-4 text-amber-600 mr-2" />
        <p className="text-xs font-medium text-amber-600 dark:text-amber-400">选择</p>
      </div>
      <p className="text-sm mb-3 bg-white dark:bg-amber-950/60 p-2 rounded-md border border-amber-100 dark:border-amber-900">{element.text}</p>
      <div className="space-y-2 mt-3">
        {element.options.map((option) => {
          const isLocked = !!option.locked;
          const hasUnlockPrice = isLocked && option.unlockPrice !== undefined && option.unlockPrice > 0;
          // 检查是否满足条件解锁
          const conditionsMet = isLocked && option.unlockConditions && 
                                globalValues.length > 0 && 
                                checkConditionsMet(option.unlockConditions, globalValues);
          
          return (
            <Button
              key={option.id}
              variant="outline"
              size="sm"
              disabled={isLocked && !conditionsMet && !hasUnlockPrice}
              className={`w-full justify-start text-left h-auto py-2 text-sm bg-white dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors ${
                isLocked && !conditionsMet && !hasUnlockPrice ? 'opacity-70' : ''
              }`}
              onClick={() =>
                handleChoiceSelect(option.nextSceneId || '', option.valueChanges)
              }
            >
              {isLocked && (
                <div className="flex items-center mr-2">
                  {hasUnlockPrice ? (
                    <div className="flex items-center text-amber-600 bg-amber-100 dark:bg-amber-900/60 px-1 py-0.5 rounded mr-1">
                      <Gem className="h-3 w-3 mr-1" />
                      <span className="text-xs">{option.unlockPrice}</span>
                    </div>
                  ) : !conditionsMet ? (
                    <Lock className="h-3 w-3 text-muted-foreground mr-1" />
                  ) : null}
                </div>
              )}
              {option.text}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ChoicePreview;
